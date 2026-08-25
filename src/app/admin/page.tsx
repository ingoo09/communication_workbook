"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type ProfileRow = {
  id: string;
  name: string | null;
  student_number: string | null;
  role: string | null;
  created_at: string;
};

type AnswerRow = {
  id: number | string;
  user_id: string;
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


function normalizeSimilarityText(value: string) {
  return formatStoredAnswer(value)
    .toLowerCase()
    .replace(/```[\s\S]*?```/g, (block) => block.replace(/\s+/g, ""))
    .replace(/\s+/g, "")
    .replace(/[.,!?;:'"`()[\]{}<>\\/_+=~|·•\-]/g, "")
    .trim();
}

function makeNgrams(text: string, n = 3) {
  const grams = new Set<string>();

  if (!text) return grams;

  if (text.length <= n) {
    grams.add(text);
    return grams;
  }

  for (let i = 0; i <= text.length - n; i += 1) {
    grams.add(text.slice(i, i + n));
  }

  return grams;
}

function calculateAnswerSimilarity(a: string, b: string) {
  const left = normalizeSimilarityText(a);
  const right = normalizeSimilarityText(b);

  // 너무 짧은 답안은 우연한 일치 가능성이 높아서 비교하지 않는다.
  if (left.length < 20 || right.length < 20) {
    return null;
  }

  const leftGrams = makeNgrams(left, 3);
  const rightGrams = makeNgrams(right, 3);

  if (leftGrams.size === 0 || rightGrams.size === 0) {
    return null;
  }

  let intersection = 0;

  for (const gram of leftGrams) {
    if (rightGrams.has(gram)) {
      intersection += 1;
    }
  }

  const union = leftGrams.size + rightGrams.size - intersection;
  if (union <= 0) return null;

  return Math.round((intersection / union) * 100);
}

function similarityLabel(score: number) {
  if (score >= 90) return "매우 높은 유사도";
  if (score >= 80) return "높은 유사도";
  if (score >= 60) return "유사 표현 존재";
  return "일반";
}

function similarityTone(score: number) {
  if (score >= 90) {
    return { background: "#fee2e2", color: "#991b1b", border: "#fecaca" };
  }
  if (score >= 80) {
    return { background: "#fef3c7", color: "#92400e", border: "#fde68a" };
  }
  if (score >= 60) {
    return { background: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" };
  }
  return { background: "#f3f4f6", color: "#4b5563", border: "#e5e7eb" };
}

export default function AdminPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profiles, setProfiles] = useState<ProfileRow[]>([]);
  const [answers, setAnswers] = useState<AnswerRow[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [studentSearch, setStudentSearch] = useState("");
  const [chapterFilter, setChapterFilter] = useState("all");
  const [gradingFilter, setGradingFilter] = useState<"all" | "graded" | "ungraded">("all");
  const [sortMode, setSortMode] = useState<"recent" | "oldest" | "score-desc" | "score-asc">("recent");

  useEffect(() => {
    let cancelled = false;

    async function loadAdminData() {
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

      // UI에서도 role을 확인하지만, 실제 데이터 보호는 Supabase RLS가 담당한다.
      const { data: myProfile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

      if (cancelled) return;

      if (profileError || myProfile?.role !== "developer") {
        router.replace("/");
        return;
      }

      const [profilesResult, answersResult] = await Promise.all([
        supabase
          .from("profiles")
          .select("id, name, student_number, role, created_at")
          .order("created_at", { ascending: true }),
        supabase
          .from("answers")
          .select(
            "id, user_id, chapter_id, problem_id, problem_title, answer, execution_output, score, feedback, created_at, updated_at",
          )
          .order("updated_at", { ascending: false }),
      ]);

      if (cancelled) return;

      if (profilesResult.error) {
        setError(`학생 프로필 조회 실패: ${profilesResult.error.message}`);
        setLoading(false);
        return;
      }

      if (answersResult.error) {
        setError(`답안 기록 조회 실패: ${answersResult.error.message}`);
        setLoading(false);
        return;
      }

      setProfiles(profilesResult.data ?? []);
      setAnswers(answersResult.data ?? []);

      const firstStudent = (profilesResult.data ?? []).find(
        (profile) => profile.role !== "developer",
      );

      setSelectedStudentId(firstStudent?.id ?? null);
      setLoading(false);
    }

    loadAdminData();

    return () => {
      cancelled = true;
    };
  }, [router]);

  const students = useMemo(
    () => profiles.filter((profile) => profile.role !== "developer"),
    [profiles],
  );

  const visibleStudents = useMemo(() => {
    const query = studentSearch.trim().toLowerCase();
    if (!query) return students;

    return students.filter((student) =>
      `${student.name ?? ""} ${student.student_number ?? ""}`
        .toLowerCase()
        .includes(query),
    );
  }, [students, studentSearch]);

  const answersByUser = useMemo(() => {
    const map = new Map<string, AnswerRow[]>();

    for (const answer of answers) {
      const rows = map.get(answer.user_id) ?? [];
      rows.push(answer);
      map.set(answer.user_id, rows);
    }

    return map;
  }, [answers]);

  const profileById = useMemo(() => {
    const map = new Map<string, ProfileRow>();

    for (const profile of profiles) {
      map.set(profile.id, profile);
    }

    return map;
  }, [profiles]);

  const similarityByAnswerId = useMemo(() => {
    const result = new Map<
      number | string,
      {
        score: number;
        otherAnswer: AnswerRow;
        otherStudent: ProfileRow | null;
      } | null
    >();

    for (const answer of answers) {
      let best:
        | {
            score: number;
            otherAnswer: AnswerRow;
            otherStudent: ProfileRow | null;
          }
        | null = null;

      for (const other of answers) {
        if (other.user_id === answer.user_id) continue;
        if (other.chapter_id !== answer.chapter_id) continue;
        if (other.problem_id !== answer.problem_id) continue;

        const score = calculateAnswerSimilarity(answer.answer, other.answer);
        if (score == null) continue;

        if (!best || score > best.score) {
          best = {
            score,
            otherAnswer: other,
            otherStudent: profileById.get(other.user_id) ?? null,
          };
        }
      }

      result.set(answer.id, best);
    }

    return result;
  }, [answers, profileById]);

  useEffect(() => {
    setChapterFilter("all");
    setGradingFilter("all");
    setSortMode("recent");
  }, [selectedStudentId]);

  const selectedStudent =
    students.find((student) => student.id === selectedStudentId) ?? null;

  const selectedAnswers = selectedStudentId
    ? answersByUser.get(selectedStudentId) ?? []
    : [];

  const chapterOptions = useMemo(
    () =>
      Array.from(new Set(selectedAnswers.map((answer) => answer.chapter_id))).sort(
        (a, b) => a.localeCompare(b, undefined, { numeric: true }),
      ),
    [selectedAnswers],
  );

  const visibleAnswers = useMemo(() => {
    const rows = selectedAnswers.filter((answer) => {
      if (chapterFilter !== "all" && answer.chapter_id !== chapterFilter) {
        return false;
      }
      if (gradingFilter === "graded" && typeof answer.score !== "number") {
        return false;
      }
      if (gradingFilter === "ungraded" && typeof answer.score === "number") {
        return false;
      }
      return true;
    });

    return [...rows].sort((a, b) => {
      if (sortMode === "oldest") {
        return new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
      }
      if (sortMode === "score-desc") {
        return (b.score ?? -1) - (a.score ?? -1);
      }
      if (sortMode === "score-asc") {
        const aScore = typeof a.score === "number" ? a.score : Number.POSITIVE_INFINITY;
        const bScore = typeof b.score === "number" ? b.score : Number.POSITIVE_INFINITY;
        return aScore - bScore;
      }
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });
  }, [selectedAnswers, chapterFilter, gradingFilter, sortMode]);

  const gradedAnswers = selectedAnswers.filter(
    (answer) => typeof answer.score === "number",
  );

  const averageScore =
    gradedAnswers.length > 0
      ? Math.round(
          gradedAnswers.reduce(
            (sum, answer) => sum + (answer.score ?? 0),
            0,
          ) / gradedAnswers.length,
        )
      : null;

  if (loading) {
    return (
      <main style={{ padding: 40 }}>
        관리자 페이지를 불러오는 중입니다...
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
          maxWidth: 1380,
          margin: "0 auto",
          padding: "36px 24px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 18,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                color: "#4f46e5",
                fontWeight: 900,
                marginBottom: 8,
              }}
            >
              Developer
            </div>
            <h1
              style={{
                margin: 0,
                fontSize: 38,
                fontWeight: 900,
              }}
            >
              학생 학습 현황
            </h1>
            <p
              style={{
                marginTop: 10,
                color: "#6b7280",
                lineHeight: 1.7,
              }}
            >
              학생별 저장 답안, 채점 결과와 최근 학습 기록을 확인합니다.
            </p>
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

        {!error && (
          <>
            <div
              style={{
                marginTop: 28,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
                gap: 14,
              }}
            >
              {[
                { label: "등록 학생", value: `${students.length}명` },
                { label: "전체 저장 답안", value: `${answers.length}개` },
                {
                  label: "답안 채점 완료",
                  value: `${answers.filter((a) => typeof a.score === "number").length}개`,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    padding: 22,
                    borderRadius: 18,
                    background: "#fff",
                    border: "1px solid #e5e7eb",
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

            <div
              style={{
                marginTop: 26,
                display: "grid",
                gridTemplateColumns: "minmax(260px, 0.32fr) minmax(0, 1fr)",
                gap: 20,
                alignItems: "start",
              }}
            >
              <aside
                style={{
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: 20,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "18px 20px",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  <div style={{ fontWeight: 900, fontSize: 18 }}>학생 목록</div>
                  <input
                    value={studentSearch}
                    onChange={(event) => setStudentSearch(event.target.value)}
                    placeholder="이름 또는 학번 검색"
                    style={{ ...filterControlStyle, marginTop: 12 }}
                  />
                </div>

                {visibleStudents.length === 0 ? (
                  <div
                    style={{
                      padding: 20,
                      color: "#6b7280",
                    }}
                  >
                    등록된 학생이 없습니다.
                  </div>
                ) : (
                  visibleStudents.map((student) => {
                    const studentAnswers = answersByUser.get(student.id) ?? [];
                    const active = selectedStudentId === student.id;

                    return (
                      <button
                        key={student.id}
                        type="button"
                        onClick={() => setSelectedStudentId(student.id)}
                        style={{
                          width: "100%",
                          padding: "15px 18px",
                          border: "none",
                          borderTop: "1px solid #f3f4f6",
                          background: active ? "#eef2ff" : "#fff",
                          textAlign: "left",
                          cursor: "pointer",
                          color: "#111827",
                        }}
                      >
                        <div
                          style={{
                            fontWeight: 900,
                            overflowWrap: "anywhere",
                          }}
                        >
                          {student.name?.trim() || "이름 없음"}
                        </div>
                        <div
                          style={{
                            marginTop: 5,
                            color: "#6b7280",
                            fontSize: 13,
                          }}
                        >
                          {student.student_number || "학번 없음"} · 저장{" "}
                          {studentAnswers.length}개
                        </div>
                      </button>
                    );
                  })
                )}
              </aside>

              <section
                style={{
                  minWidth: 0,
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: 20,
                  overflow: "hidden",
                }}
              >
                {!selectedStudent ? (
                  <div style={{ padding: 28, color: "#6b7280" }}>
                    왼쪽에서 학생을 선택하세요.
                  </div>
                ) : (
                  <>
                    <div
                      style={{
                        padding: 22,
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: 14,
                          flexWrap: "wrap",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: 24,
                              fontWeight: 900,
                            }}
                          >
                            {selectedStudent.name?.trim() || "이름 없음"}
                          </div>
                          <div
                            style={{
                              marginTop: 6,
                              color: "#6b7280",
                            }}
                          >
                            {selectedStudent.student_number || "학번 없음"}
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            gap: 10,
                            flexWrap: "wrap",
                          }}
                        >
                          <span
                            style={{
                              padding: "8px 12px",
                              borderRadius: 999,
                              background: "#f3f4f6",
                              fontWeight: 800,
                              fontSize: 13,
                            }}
                          >
                            저장 {selectedAnswers.length}개
                          </span>
                          <span
                            style={{
                              padding: "8px 12px",
                              borderRadius: 999,
                              background: "#eef2ff",
                              color: "#3730a3",
                              fontWeight: 800,
                              fontSize: 13,
                            }}
                          >
                            평균 {averageScore == null ? "-" : `${averageScore}점`}
                          </span>
                        </div>
                      </div>
                    </div>

                    {selectedAnswers.length > 0 && (
                      <div
                        style={{
                          padding: 16,
                          borderBottom: "1px solid #e5e7eb",
                          background: "#f9fafb",
                        }}
                      >
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                            gap: 9,
                          }}
                        >
                          <select
                            value={chapterFilter}
                            onChange={(event) => setChapterFilter(event.target.value)}
                            style={filterControlStyle}
                          >
                            <option value="all">전체 Chapter</option>
                            {chapterOptions.map((chapterId) => (
                              <option key={chapterId} value={chapterId}>
                                Chapter {chapterId.replace(/^ch/i, "")}
                              </option>
                            ))}
                          </select>
                          <select
                            value={gradingFilter}
                            onChange={(event) =>
                              setGradingFilter(event.target.value as "all" | "graded" | "ungraded")
                            }
                            style={filterControlStyle}
                          >
                            <option value="all">전체 답안</option>
                            <option value="graded">채점 완료</option>
                            <option value="ungraded">미채점</option>
                          </select>
                          <select
                            value={sortMode}
                            onChange={(event) =>
                              setSortMode(
                                event.target.value as
                                  | "recent"
                                  | "oldest"
                                  | "score-desc"
                                  | "score-asc",
                              )
                            }
                            style={filterControlStyle}
                          >
                            <option value="recent">최근 저장순</option>
                            <option value="oldest">오래된 저장순</option>
                            <option value="score-desc">점수 높은순</option>
                            <option value="score-asc">점수 낮은순</option>
                          </select>
                        </div>
                        <div style={{ marginTop: 9, color: "#6b7280", fontSize: 13 }}>
                          표시 중 {visibleAnswers.length}개
                        </div>
                      </div>
                    )}

                    {selectedAnswers.length > 0 && visibleAnswers.length === 0 && (
                      <div style={{ padding: 24, color: "#6b7280" }}>
                        선택한 조건에 맞는 답안이 없습니다.
                      </div>
                    )}

                    {selectedAnswers.length === 0 ? (
                      <div style={{ padding: 28, color: "#6b7280" }}>
                        아직 저장된 답안이 없습니다.
                      </div>
                    ) : (
                      visibleAnswers.map((answer, index) => {
                        const similarity = similarityByAnswerId.get(answer.id) ?? null;
                        const tone = similarity ? similarityTone(similarity.score) : null;

                        return (
                        <article
                          key={answer.id}
                          style={{
                            padding: 22,
                            borderTop:
                              index === 0 ? "none" : "1px solid #f3f4f6",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              gap: 14,
                              flexWrap: "wrap",
                              alignItems: "flex-start",
                            }}
                          >
                            <div>
                              <div
                                style={{
                                  color: "#6366f1",
                                  fontSize: 13,
                                  fontWeight: 800,
                                }}
                              >
                                {answer.chapter_id}
                              </div>
                              <div
                                style={{
                                  marginTop: 4,
                                  fontSize: 18,
                                  fontWeight: 900,
                                }}
                              >
                                {answer.problem_title || answer.problem_id}
                              </div>
                              <div
                                style={{
                                  marginTop: 6,
                                  color: "#9ca3af",
                                  fontSize: 13,
                                }}
                              >
                                최근 저장 {formatDate(answer.updated_at)}
                              </div>
                            </div>

                            {typeof answer.score === "number" && (
                              <div
                                style={{
                                  padding: "8px 12px",
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
                                }}
                              >
                                {answer.score}점
                              </div>
                            )}
                          </div>

                          {similarity && tone && (
                            <div
                              style={{
                                marginTop: 14,
                                padding: 14,
                                borderRadius: 12,
                                background: tone.background,
                                color: tone.color,
                                border: `1px solid ${tone.border}`,
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  gap: 10,
                                  flexWrap: "wrap",
                                  alignItems: "center",
                                }}
                              >
                                <div style={{ fontWeight: 900 }}>
                                  답안 유사도 {similarity.score}% · {similarityLabel(similarity.score)}
                                </div>
                                <div style={{ fontSize: 13, fontWeight: 800 }}>
                                  가장 유사한 답안: {similarity.otherStudent?.name?.trim() || "이름 없음"}
                                  {similarity.otherStudent?.student_number
                                    ? ` (${similarity.otherStudent.student_number})`
                                    : ""}
                                </div>
                              </div>

                              <details style={{ marginTop: 10 }}>
                                <summary style={{ cursor: "pointer", fontWeight: 800 }}>
                                  두 답안 비교 보기
                                </summary>

                                <div
                                  style={{
                                    marginTop: 10,
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                                    gap: 10,
                                  }}
                                >
                                  <div
                                    style={{
                                      padding: 12,
                                      borderRadius: 10,
                                      background: "#fff",
                                      border: "1px solid rgba(0,0,0,0.06)",
                                      color: "#111827",
                                    }}
                                  >
                                    <div style={{ fontWeight: 900, marginBottom: 7 }}>현재 학생</div>
                                    <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.65 }}>
                                      {formatStoredAnswer(answer.answer) || "(답안 없음)"}
                                    </div>
                                  </div>

                                  <div
                                    style={{
                                      padding: 12,
                                      borderRadius: 10,
                                      background: "#fff",
                                      border: "1px solid rgba(0,0,0,0.06)",
                                      color: "#111827",
                                    }}
                                  >
                                    <div style={{ fontWeight: 900, marginBottom: 7 }}>
                                      {similarity.otherStudent?.name?.trim() || "비교 학생"}
                                    </div>
                                    <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.65 }}>
                                      {formatStoredAnswer(similarity.otherAnswer.answer) || "(답안 없음)"}
                                    </div>
                                  </div>
                                </div>

                                <div
                                  style={{
                                    marginTop: 9,
                                    fontSize: 12,
                                    lineHeight: 1.6,
                                    color: "#6b7280",
                                  }}
                                >
                                  유사도는 동일 Chapter·동일 문제 ID의 다른 학생 답안을 3글자 단위로 비교한 참고 지표입니다.
                                  높은 유사도만으로 표절 여부를 확정하지 않습니다.
                                </div>
                              </details>
                            </div>
                          )}

                          <details style={{ marginTop: 15 }}>
                            <summary
                              style={{
                                cursor: "pointer",
                                fontWeight: 800,
                                color: "#4b5563",
                              }}
                            >
                              답안 및 채점 피드백 보기
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
                              {formatStoredAnswer(answer.answer) || "(답안 없음)"}
                            </div>

                            {answer.execution_output && (
                              <pre
                                style={{
                                  marginTop: 12,
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
                            )}

                            {answer.feedback && (
                              <div
                                style={{
                                  marginTop: 12,
                                  padding: 15,
                                  borderRadius: 12,
                                  background: "#eff6ff",
                                  whiteSpace: "pre-wrap",
                                  lineHeight: 1.7,
                                }}
                              >
                                <strong>채점 피드백</strong>
                                <div style={{ marginTop: 7 }}>
                                  {answer.feedback}
                                </div>
                              </div>
                            )}
                          </details>
                        </article>
                        );
                      })
                    )}
                  </>
                )}
              </section>
            </div>
          </>
        )}

        <style jsx>{`
          @media (max-width: 820px) {
            div[style*="grid-template-columns: minmax(260px"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </main>
  );
}


const filterControlStyle = {
  width: "100%",
  minHeight: 42,
  padding: "9px 10px",
  borderRadius: 10,
  border: "1px solid #d1d5db",
  background: "#fff",
  color: "#111827",
  fontSize: 14,
  boxSizing: "border-box" as const,
};
