import { createClient } from "@/lib/supabase/client";

export type StoredAnswer = {
  id: number | string;
  chapter_id: string;
  problem_id: string;
  problem_title: string | null;
  answer: string;
  execution_output: string | null;
  score: number | null;
  feedback: string | null;
  created_at: string;
  updated_at: string;
};

export type LoadAnswerResult =
  | {
      success: true;
      answer: StoredAnswer | null;
    }
  | {
      success: false;
      reason: "not_authenticated" | "database_error";
      message: string;
    };

export async function loadAnswer({
  chapterId,
  problemId,
}: {
  chapterId: string;
  problemId: string;
}): Promise<LoadAnswerResult> {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      success: false,
      reason: "not_authenticated",
      message: "로그인되어 있지 않습니다.",
    };
  }

  const { data, error } = await supabase
    .from("answers")
    .select(
      "id, chapter_id, problem_id, problem_title, answer, execution_output, score, feedback, created_at, updated_at",
    )
    .eq("user_id", user.id)
    .eq("chapter_id", chapterId)
    .eq("problem_id", problemId)
    .maybeSingle();

  if (error) {
    return {
      success: false,
      reason: "database_error",
      message: error.message,
    };
  }

  return {
    success: true,
    answer: data,
  };
}
