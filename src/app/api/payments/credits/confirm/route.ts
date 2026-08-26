export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { createClient as createSupabaseAdmin } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error('Supabase server environment variables are missing.');
  }

  return createSupabaseAdmin(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export async function POST(req: Request) {
  try {
    const tossSecretKey = process.env.TOSS_SECRET_KEY;

    if (!tossSecretKey) {
      return NextResponse.json(
        { success: false, error: 'TOSS_SECRET_KEY가 설정되지 않았습니다.' },
        { status: 500 },
      );
    }

    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { success: false, error: '로그인이 필요합니다.' },
        { status: 401 },
      );
    }

    const body = await req.json();

    const paymentKey = String(body?.paymentKey ?? '').trim();
    const orderId = String(body?.orderId ?? '').trim();
    const clientAmount = Number(body?.amount);

    if (!paymentKey || !orderId || !Number.isInteger(clientAmount)) {
      return NextResponse.json(
        { success: false, error: '결제 승인 정보가 올바르지 않습니다.' },
        { status: 400 },
      );
    }

    const admin = getAdminClient();

    const { data: order, error: orderError } = await admin
      .from('credit_payments')
      .select(
        'order_id, user_id, product_id, credits, amount, status, payment_key, idempotency_key',
      )
      .eq('order_id', orderId)
      .maybeSingle();

    if (orderError || !order) {
      return NextResponse.json(
        { success: false, error: '주문 정보를 찾을 수 없습니다.' },
        { status: 404 },
      );
    }

    if (order.user_id !== user.id) {
      return NextResponse.json(
        { success: false, error: '본인의 주문만 승인할 수 있습니다.' },
        { status: 403 },
      );
    }

    if (clientAmount !== order.amount) {
      return NextResponse.json(
        { success: false, error: '결제 금액이 주문 금액과 일치하지 않습니다.' },
        { status: 400 },
      );
    }

    if (order.status === 'paid') {
      const { data: creditRow } = await admin
        .from('user_credits')
        .select('balance')
        .eq('user_id', user.id)
        .maybeSingle();

      return NextResponse.json({
        success: true,
        alreadyProcessed: true,
        creditsAdded: 0,
        balance:
          typeof creditRow?.balance === 'number' ? creditRow.balance : null,
      });
    }

    if (order.status !== 'pending') {
      return NextResponse.json(
        { success: false, error: '승인할 수 없는 주문 상태입니다.' },
        { status: 409 },
      );
    }

    const authorization = Buffer.from(`${tossSecretKey}:`).toString('base64');

    const tossResponse = await fetch(
      'https://api.tosspayments.com/v1/payments/confirm',
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${authorization}`,
          'Content-Type': 'application/json',
          'Idempotency-Key': String(order.idempotency_key),
        },
        body: JSON.stringify({
          paymentKey,
          orderId,
          amount: order.amount,
        }),
      },
    );

    const tossResult = await tossResponse.json();

    if (!tossResponse.ok) {
      console.error('Toss payment confirmation failed:', tossResult);

      return NextResponse.json(
        {
          success: false,
          error:
            tossResult?.message ??
            tossResult?.code ??
            '토스페이먼츠 결제 승인에 실패했습니다.',
        },
        { status: tossResponse.status },
      );
    }

    if (
      tossResult?.orderId !== orderId ||
      Number(tossResult?.totalAmount) !== order.amount
    ) {
      return NextResponse.json(
        {
          success: false,
          error: '승인된 결제 정보가 서버 주문 정보와 일치하지 않습니다.',
        },
        { status: 409 },
      );
    }

    if (tossResult?.status !== 'DONE') {
      return NextResponse.json(
        {
          success: false,
          error: `결제가 완료 상태가 아닙니다. (${String(
            tossResult?.status ?? 'UNKNOWN',
          )})`,
        },
        { status: 409 },
      );
    }

    const { data: completionData, error: completionError } = await admin.rpc(
      'complete_credit_payment',
      {
        p_order_id: orderId,
        p_payment_key: paymentKey,
      },
    );

    if (completionError) {
      console.error('Credit completion RPC failed:', completionError);

      return NextResponse.json(
        {
          success: false,
          error:
            '결제 승인은 완료되었지만 Credit 반영 중 오류가 발생했습니다. 관리자에게 문의해 주세요.',
        },
        { status: 500 },
      );
    }

    const completion = Array.isArray(completionData)
      ? completionData[0]
      : completionData;

    return NextResponse.json({
      success: true,
      alreadyProcessed: Boolean(completion?.already_processed),
      creditsAdded: Number(completion?.credits_added ?? 0),
      balance:
        typeof completion?.new_balance === 'number'
          ? completion.new_balance
          : null,
      payment: {
        orderId,
        paymentKey,
        status: tossResult.status,
        method: tossResult.method ?? null,
        totalAmount: tossResult.totalAmount,
      },
    });
  } catch (error: any) {
    console.error('Credit confirm error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message ?? '결제 승인 중 오류가 발생했습니다.',
      },
      { status: 500 },
    );
  }
}
