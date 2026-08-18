"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type AnswerRow = {
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

type Profile = {
  name: string | null;
  student_number: string | null;
};

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  } catch {
    return value;
  }
}


function formatStoredAnswer(value: string) {
  if (!value) return "";

  try {
    const parsed = JSON.parse(value);

    if (
      (parsed?.kind === "console" || parsed?.kind === "python-console") &&
      typeof parsed.answer === "string"
    ) {
      return parsed.answer;
    }
  } catch {
    // 일반 essay/Python 답안은 JSON이 아니므로 그대로 표시한다.
  }

  return value;
}

export default function HistoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<AnswerRow[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadHistory() {
      const supabase = createClient();

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (cancelled) return;

      if (userError || !user) {
        router.replace("/login");
        return;
      }

      setEmail(user.email ?? "");

      const [profileResult, answerResult] = await Promise.all([
        supabase
          .from("profiles")
          .select("name, student_number")
          .eq("id", user.id)
          .maybeSingle(),
        supabase
          .from("answers")
          .select(
            "id, chapter_id, problem_id, problem_title, answer, execution_output, score, feedback, created_at, updated_at",
          )
          .eq("user_id", user.id)
          .order("updated_at", { ascending: false }),
      ]);

      if (cancelled) return;

      if (profileResult.data) {
        setProfile(profileResult.data);
      }

      if (answerResult.error) {
        setError(answerResult.error.message);
      } else {
        setAnswers(answerResult.data ?? []);
      }

      setLoading(false);
    }

    loadHistory();

    return () => {
      cancelled = true;
    };
  }, [router]);

  const chapterGroups = useMemo(() => {
    const groups = new Map<string, AnswerRow[]>();

    for (const answer of answers) {
      const list = groups.get(answer.chapter_id) ?? [];
      list.push(answer);
      groups.set(answer.chapter_id, list);
    }

    return Array.from(groups.entries()).sort(([a], [b]) =>
      a.localeCompare(b, undefined, { numeric: true }),
    );
  }, [answers]);

  const gradedCount = answers.filter(
    (answer) => typeof answer.score === "number",
  ).length;

  const averageScore =
    gradedCount > 0
      ? Math.round(
          answers.reduce(
            (sum, answer) =>
              sum +
              (typeof answer.score === "number" ? answer.score : 0),
            0,
          ) / gradedCount,
        )
      : null;

  if (loading) {
    return (
      <main style={{ padding: 40, fontFamily: "Inter, Pretendard, Arial, sans-serif" }}>
        학습 기록을 불러오는 중입니다...
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        color: "#111827",
        fontFamily: "Inter, Pretendard, Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 1150,
          margin: "0 auto",
          padding: "40px 24px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div style={{ color: "#6366f1", fontWeight: 800, marginBottom: 8 }}>
              My Workbook
            </div>
            <h1 style={{ margin: 0, fontSize: 38, fontWeight: 900 }}>
              내 학습 기록
            </h1>
            <div style={{ marginTop: 10, color: "#6b7280", lineHeight: 1.7 }}>
              {profile?.name ? `${profile.name}` : email}
              {profile?.student_number
                ? ` · ${profile.student_number}`
                : ""}
            </div>
          </div>

          <Link
            href="/"
            style={{
              padding: "11px 16px",
              borderRadius: 12,
              textDecoration: "none",
              color: "#111827",
              background: "#fff",
              border: "1px solid #e5e7eb",
              fontWeight: 800,
            }}
          >
            ← 홈으로
          </Link>
        </div>

        <div
          style={{
            marginTop: 30,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 14,
          }}
        >
          {[
            { label: "저장한 문제", value: `${answers.length}개` },
            { label: "AI 채점 완료", value: `${gradedCount}개` },
            {
              label: "평균 점수",
              value: averageScore == null ? "-" : `${averageScore}점`,
            },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: 18,
                padding: 22,
              }}
            >
              <div style={{ color: "#6b7280", fontSize: 14 }}>
                {item.label}
              </div>
              <div
                style={{
                  marginTop: 8,
                  fontSize: 30,
                  fontWeight: 900,
                }}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {error && (
          <div
            style={{
              marginTop: 24,
              padding: 16,
              borderRadius: 14,
              background: "#fff1f2",
              color: "#be123c",
              border: "1px solid #fecdd3",
            }}
          >
            {error}
          </div>
        )}

        {!error && answers.length === 0 && (
          <div
            style={{
              marginTop: 28,
              background: "#fff",
              padding: 28,
              borderRadius: 18,
              border: "1px solid #e5e7eb",
              color: "#6b7280",
            }}
          >
            아직 저장된 답안이 없습니다. 문제에서 답안을 저장하거나 AI 채점을
            완료하면 여기에 기록됩니다.
          </div>
        )}

        <div style={{ marginTop: 30 }}>
          {chapterGroups.map(([chapterId, rows]) => {
            const chapterNumber = chapterId.replace(/^ch/i, "");

            return (
              <section
                key={chapterId}
                style={{
                  marginBottom: 28,
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: 20,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "20px 22px",
                    borderBottom: "1px solid #e5e7eb",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 14,
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 900, fontSize: 22 }}>
                      Chapter {chapterNumber}
                    </div>
                    <div
                      style={{
                        marginTop: 5,
                        color: "#6b7280",
                        fontSize: 14,
                      }}
                    >
                      저장한 문제 {rows.length}개
                    </div>
                  </div>

                  <Link
                    href={`/workbook/${chapterId}`}
                    style={{
                      textDecoration: "none",
                      padding: "9px 13px",
                      borderRadius: 10,
                      background: "#eef2ff",
                      color: "#3730a3",
                      fontWeight: 800,
                      fontSize: 14,
                    }}
                  >
                    Chapter 열기
                  </Link>
                </div>

                <div>
                  {rows.map((answer, index) => (
                    <article
                      key={answer.id}
                      style={{
                        padding: 22,
                        borderTop:
                          index === 0 ? "none" : "1px solid #f0f1f3",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          gap: 14,
                          flexWrap: "wrap",
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 900, fontSize: 18 }}>
                            {answer.problem_title || answer.problem_id}
                          </div>
                          <div
                            style={{
                              color: "#9ca3af",
                              fontSize: 13,
                              marginTop: 5,
                            }}
                          >
                            최근 저장 {formatDate(answer.updated_at)}
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            gap: 9,
                            alignItems: "center",
                          }}
                        >
                          {typeof answer.score === "number" && (
                            <span
                              style={{
                                padding: "7px 11px",
                                borderRadius: 999,
                                background:
                                  answer.score >= 80
                                    ? "#dcfce7"
                                    : answer.score >= 60
                                      ? "#fef3c7"
                                      : "#fee2e2",
                                color:
                                  answer.score >= 80
                                    ? "#166534"
                                    : answer.score >= 60
                                      ? "#92400e"
                                      : "#991b1b",
                                fontWeight: 900,
                                fontSize: 13,
                              }}
                            >
                              {answer.score}점
                            </span>
                          )}

                          <Link
                            href={`/workbook/${chapterId}?p=${encodeURIComponent(
                              answer.problem_id,
                            )}`}
                            style={{
                              textDecoration: "none",
                              color: "#4f46e5",
                              fontWeight: 800,
                              fontSize: 14,
                            }}
                          >
                            이어서 풀기 →
                          </Link>
                        </div>
                      </div>

                      <details style={{ marginTop: 16 }}>
                        <summary
                          style={{
                            cursor: "pointer",
                            fontWeight: 800,
                            color: "#4b5563",
                          }}
                        >
                          저장된 답안 보기
                        </summary>

                        <div
                          style={{
                            marginTop: 12,
                            padding: 15,
                            borderRadius: 12,
                            background: "#f9fafb",
                            whiteSpace: "pre-wrap",
                            lineHeight: 1.7,
                            overflowWrap: "anywhere",
                          }}
                        >
                          {formatStoredAnswer(answer.answer) || "(저장된 답안 없음)"}
                        </div>

                        {answer.execution_output && (
                          <>
                            <div
                              style={{
                                marginTop: 14,
                                fontWeight: 800,
                                fontSize: 14,
                              }}
                            >
                              실행 결과
                            </div>
                            <pre
                              style={{
                                marginTop: 8,
                                padding: 14,
                                borderRadius: 12,
                                background: "#111827",
                                color: "#e5e7eb",
                                whiteSpace: "pre-wrap",
                                overflowX: "auto",
                              }}
                            >
                              {answer.execution_output}
                            </pre>
                          </>
                        )}

                        {answer.feedback && (
                          <>
                            <div
                              style={{
                                marginTop: 14,
                                fontWeight: 800,
                                fontSize: 14,
                              }}
                            >
                              AI 피드백
                            </div>
                            <div
                              style={{
                                marginTop: 8,
                                padding: 15,
                                borderRadius: 12,
                                background: "#eff6ff",
                                lineHeight: 1.7,
                                whiteSpace: "pre-wrap",
                              }}
                            >
                              {answer.feedback}
                            </div>
                          </>
                        )}
                      </details>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
