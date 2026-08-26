export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { randomUUID } from 'crypto';
import { createClient as createSupabaseAdmin } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getCreditProduct } from '@/lib/payments/creditProducts';

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
    const product = getCreditProduct(String(body?.productId ?? ''));

    if (!product) {
      return NextResponse.json(
        { success: false, error: '유효하지 않은 Credit 상품입니다.' },
        { status: 400 },
      );
    }

    const orderId = `credit-${randomUUID()}`;
    const idempotencyKey = randomUUID();

    const admin = getAdminClient();

    const { error: insertError } = await admin
      .from('credit_payments')
      .insert({
        order_id: orderId,
        user_id: user.id,
        product_id: product.id,
        credits: product.credits,
        amount: product.amount,
        status: 'pending',
        idempotency_key: idempotencyKey,
      });

    if (insertError) {
      console.error('Credit order insert failed:', insertError);
      return NextResponse.json(
        { success: false, error: '주문을 생성하지 못했습니다.' },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      orderId,
      productId: product.id,
      orderName: `${product.credits} Credits`,
      credits: product.credits,
      amount: product.amount,
    });
  } catch (error: any) {
    console.error('Credit create-order error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message ?? '주문 생성 중 오류가 발생했습니다.',
      },
      { status: 500 },
    );
  }
}
