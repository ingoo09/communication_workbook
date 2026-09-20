import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createClient as createAdminClient } from '@supabase/supabase-js';

const LECTURE_FILES: Record<
  string,
  {
    storagePath: string;
    downloadName: string;
  }
> = {
  ch4: {
    storagePath: 'ch4/chapter4_fourier_transform_online_lecture.pdf',
    downloadName: 'Chapter4_Fourier_Transform_Lecture.pdf',
  },
};

export async function GET(
  _request: Request,
  context: { params: Promise<{ chapter: string }> },
) {
  const { chapter } = await context.params;

  const file = LECTURE_FILES[chapter];

  if (!file) {
    return NextResponse.json(
      { error: '등록된 강의자료가 없습니다.' },
      { status: 404 },
    );
  }

  // 현재 프로젝트의 src/lib/supabase/server.ts는 async createClient() 구조이므로
  // 반드시 await createClient()로 호출한다.
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.error('사용자 조회 실패:', userError);
  }

  if (!user) {
    return NextResponse.json(
      { error: '로그인이 필요합니다.' },
      { status: 401 },
    );
  }

  // 화면에서 버튼을 숨기는 것만으로는 보호되지 않으므로
  // 서버에서도 실제 Chapter 해금 여부를 다시 확인한다.
  const { data: access, error: accessError } = await supabase
    .from('chapter_access')
    .select('chapter_id')
    .eq('user_id', user.id)
    .eq('chapter_id', chapter)
    .maybeSingle();

  if (accessError) {
    console.error('Chapter access 확인 실패:', accessError);

    return NextResponse.json(
      { error: '강의자료 접근 권한을 확인하지 못했습니다.' },
      { status: 500 },
    );
  }

  if (!access) {
    return NextResponse.json(
      { error: '해금한 Chapter에서만 강의자료를 받을 수 있습니다.' },
      { status: 403 },
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error(
      'NEXT_PUBLIC_SUPABASE_URL 또는 SUPABASE_SERVICE_ROLE_KEY가 설정되지 않았습니다.',
    );

    return NextResponse.json(
      { error: '서버 Storage 설정이 완료되지 않았습니다.' },
      { status: 500 },
    );
  }

  // Private Storage 파일의 signed URL을 만들기 위한 서버 전용 client.
  // SUPABASE_SERVICE_ROLE_KEY에는 절대로 NEXT_PUBLIC_ 접두사를 붙이지 않는다.
  const admin = createAdminClient(
    supabaseUrl,
    serviceRoleKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );

  const { data, error } = await admin.storage
    .from('lecture-materials')
    .createSignedUrl(
      file.storagePath,
      60,
      {
        download: file.downloadName,
      },
    );

  if (error || !data?.signedUrl) {
    console.error('강의자료 signed URL 생성 실패:', error);

    return NextResponse.json(
      { error: '강의자료 다운로드 링크를 만들지 못했습니다.' },
      { status: 500 },
    );
  }

  return NextResponse.redirect(data.signedUrl, 302);
}
