export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { randomBytes } from 'crypto';
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

function makeTemporaryPassword() {
  // 혼동하기 쉬운 0/O, 1/I/l 등을 제외한다.
  const alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  const bytes = randomBytes(12);

  let body = '';
  for (let i = 0; i < 12; i += 1) {
    body += alphabet[bytes[i] % alphabet.length];
  }

  // Supabase의 일반적인 비밀번호 정책을 넉넉히 만족하도록
  // 영문 대/소문자, 숫자, 특수문자를 포함한다.
  return `Wb!${body}7`;
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
    const studentId = String(body?.studentId ?? '').trim();

    if (!studentId) {
      return NextResponse.json(
        { success: false, error: '학생 ID가 필요합니다.' },
        { status: 400 },
      );
    }

    const admin = getAdminClient();

    // service role은 RLS를 우회하므로 권한 검사를 반드시 서버에서 직접 수행한다.
    const { data: requester, error: requesterError } = await admin
      .from('profiles')
      .select('id, role, organization_id')
      .eq('id', user.id)
      .maybeSingle();

    if (requesterError || !requester) {
      return NextResponse.json(
        { success: false, error: '요청자 프로필을 확인할 수 없습니다.' },
        { status: 403 },
      );
    }

    if (!['professor', 'developer', 'admin'].includes(requester.role ?? '')) {
      return NextResponse.json(
        { success: false, error: '비밀번호 초기화 권한이 없습니다.' },
        { status: 403 },
      );
    }

    const { data: student, error: studentError } = await admin
      .from('profiles')
      .select('id, role, organization_id, name, student_number')
      .eq('id', studentId)
      .maybeSingle();

    if (studentError || !student || student.role !== 'student') {
      return NextResponse.json(
        { success: false, error: '학생 계정을 찾을 수 없습니다.' },
        { status: 404 },
      );
    }

    if (requester.role === 'professor') {
      if (
        !requester.organization_id ||
        !student.organization_id ||
        requester.organization_id !== student.organization_id
      ) {
        return NextResponse.json(
          {
            success: false,
            error: '같은 소속의 학생 계정만 초기화할 수 있습니다.',
          },
          { status: 403 },
        );
      }
    }

    const temporaryPassword = makeTemporaryPassword();

    const { error: updateError } = await admin.auth.admin.updateUserById(
      student.id,
      {
        password: temporaryPassword,
      },
    );

    if (updateError) {
      console.error('Password reset failed:', updateError);
      return NextResponse.json(
        { success: false, error: '비밀번호를 변경하지 못했습니다.' },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      temporaryPassword,
    });
  } catch (error: any) {
    console.error('Professor password reset error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message ?? '비밀번호 초기화 중 오류가 발생했습니다.',
      },
      { status: 500 },
    );
  }
}
