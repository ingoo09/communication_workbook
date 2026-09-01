import { createClient } from '@/lib/supabase/client';

export type SaveAnswerInput = {
  chapterId: string;
  problemId: string;
  problemTitle?: string;
  answer: string;
  executionOutput?: string | null;
  score?: number | null;
  feedback?: string | null;
};

export type SaveAnswerResult =
  | {
      success: true;
      id: number | string;
    }
  | {
      success: false;
      reason: 'not_authenticated' | 'deadline_passed' | 'database_error';
      message: string;
    };

/**
 * 현재 로그인 사용자의 문제 답안을 Supabase에 저장한다.
 *
 * 같은 사용자 + 같은 Chapter + 같은 문제 ID가 이미 있으면
 * 기존 행을 update(upsert)한다.
 */
export async function saveAnswer({
  chapterId,
  problemId,
  problemTitle,
  answer,
  executionOutput = null,
  score = null,
  feedback = null,
}: SaveAnswerInput): Promise<SaveAnswerResult> {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      success: false,
      reason: 'not_authenticated',
      message: '로그인 후 답안을 저장할 수 있습니다.',
    };
  }

  const { data, error } = await supabase
    .from('answers')
    .upsert(
      {
        user_id: user.id,
        chapter_id: chapterId,
        problem_id: problemId,
        problem_title: problemTitle ?? null,
        answer,
        execution_output: executionOutput,
        score,
        feedback,
      },
      {
        onConflict: 'user_id,chapter_id,problem_id',
      },
    )
    .select('id')
    .single();

  if (error) {
    console.error('Supabase answer save failed:', error);

    const rawError = [error.message, error.details, error.hint, error.code]
      .filter(Boolean)
      .join(' ');

    const deadlinePassed = rawError.includes('DEADLINE_PASSED');

    return {
      success: false,
      reason: deadlinePassed ? 'deadline_passed' : 'database_error',
      message: deadlinePassed
        ? '제출 기한이 종료되어 답안을 저장할 수 없습니다.'
        : error.message,
    };
  }

  return {
    success: true,
    id: data.id,
  };
}
