'use client';

export const dynamic = 'force-dynamic';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { chapter } from './ch2-orthogonality';
import Editor from '@monaco-editor/react';

type Problem = {
  id: string;
  title: string;
  prompt: string;
  code?: string;
  answerType?: 'textarea' | 'short' | 'code';

  // 사전 정답/풀이(프로젝트/버전별 키 이름 다양성 대응)
  answer?: string;
  answer_md?: string;
  solution?: string;
  solution_md?: string;
  solutionText?: string;
  solutionMarkdown?: string;
  explanation?: string;
  explanation_md?: string;
  rationale?: string;
};

type Section = { id: string; title: string; problems: Problem[] };
type Content = { title: string; sections: Section[] };

declare global {
  interface Window {
    renderMathInElement?: (elem: HTMLElement, opts?: any) => void;
  }
}

type FlatItem = {
  secId: string;
  secTitle: string;
  pb: Problem;
  preface?: Problem;
};

const STORAGE_KEY = 'workbook::ch2-orthogonality::answers';

function sanitize(s?: string) {
  return String(s ?? '')
    .replace(/\u200b/g, '')
    .replace(/\ue000/g, '')
    .replace(/\u00A0/g, ' ')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function parseTitle(title: string) {
  // "1.A.", "1.A1.", "2.B1." 등에서 groupKey="1.A", subIndex=1 추출
  const t = (title ?? '').trim();
  const m = t.match(/^(\d+)\.([A-Z])(\d+)?\.?$/);
  if (!m) return null;
  const groupKey = `${m[1]}.${m[2]}`; // "1.A"
  const subIndex = m[3] ? Number(m[3]) : null; // 1 for A1
  return { groupKey, subIndex };
}

function pickAnswer(pb: Problem): string {
  // ✅ 사전 정답/풀이 키 이름이 무엇이든 최대한 잡아낸다
  const candidates = [
    pb.answer,
    pb.answer_md,
    pb.solution_md,
    pb.solution,
    pb.solutionMarkdown,
    pb.solutionText,
    pb.explanation_md,
    pb.explanation,
    pb.rationale,
  ];
  for (const c of candidates) {
    const v = sanitize(c);
    if (v.length) return v;
  }
  return '';
}

function buildDisplayPrompt(pb: Problem, preface?: Problem): string {
  const parts: string[] = [];

  if (preface) {
    const pt = sanitize(preface.prompt);
    const pc = sanitize(preface.code);
    if (pt) parts.push(`**${preface.title} (사전 설명)**\n\n${pt}`);
    if (pc) parts.push(`\n\n\`\`\`python\n${pc}\n\`\`\``);
    parts.push('\n\n---\n');
  }

  const t = sanitize(pb.prompt);
  if (t) parts.push(t);

  const c = sanitize(pb.code);
  if (c) parts.push(`\n\n\`\`\`python\n${c}\n\`\`\``);

  return parts.join('').trim();
}

function renderFencedText(s: string) {
  const nodes: React.ReactNode[] = [];
  const re = /```(\w+)?\n([\s\S]*?)```/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;

  while ((m = re.exec(s)) !== null) {
    const before = s.slice(last, m.index);
    if (before.length) {
      nodes.push(
        <div key={`t-${k++}`} style={{ whiteSpace: 'pre-wrap', lineHeight: 1.65 }}>
          {before}
        </div>
      );
    }

    const lang = (m[1] || '').trim();
    const code = m[2] || '';
    nodes.push(
      <pre
        key={`c-${k++}`}
        style={{
          marginTop: 12,
          marginBottom: 12,
          padding: 14,
          background: '#0b1020',
          color: '#e6edf3',
          borderRadius: 12,
          overflowX: 'auto',
        }}
      >
        <code className={lang ? `language-${lang}` : undefined}>{code}</code>
      </pre>
    );

    last = m.index + m[0].length;
  }

  const tail = s.slice(last);
  if (tail.length) {
    nodes.push(
      <div key={`t-${k++}`} style={{ whiteSpace: 'pre-wrap', lineHeight: 1.65 }}>
        {tail}
      </div>
    );
  }

  return nodes;
}

export default function Ch2OrthogonalityPage() {
  const data: Content = {
  title: chapter?.title ?? '',
  sections: Array.isArray(chapter?.sections)
    ? chapter.sections
    : [],
};

  const router = useRouter();

  const [idx, setIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const [userAnswer, setUserAnswer] = useState('');
  const [saved, setSaved] = useState(false);

  // ✅ AI 채점 결과
  const [grading, setGrading] = useState(false);
  const [gradeResult, setGradeResult] = useState<string | null>(null);

  const [runningCode, setRunningCode] = useState(false);
  const [codeOutput, setCodeOutput] = useState<string | null>(null);

  const promptRef = useRef<HTMLDivElement | null>(null);
  const answerRef = useRef<HTMLDivElement | null>(null);

  const { flat, idToIndex } = useMemo(() => {
    const out: FlatItem[] = [];
    const map: Record<string, number> = {};

    for (const sec of data.sections ?? []) {
      const problems = sec.problems ?? [];

      // groupKey별로 세부문항 존재 여부
      const hasChild: Record<string, boolean> = {};
      for (const pb of problems) {
        const info = parseTitle(pb.title);
        if (info && info.subIndex !== null) hasChild[info.groupKey] = true;
      }

      // “진짜 서문” 맵 (자식이 있을 때만 서문)
      const prefaceLocal: Record<string, Problem> = {};
      for (const pb of problems) {
        const info = parseTitle(pb.title);
        if (!info) continue;
        if (info.subIndex === null && hasChild[info.groupKey]) {
          prefaceLocal[info.groupKey] = pb;
        }
      }

      // flatten: 서문은 제외, A1에만 서문 붙임
      for (const pb of problems) {
        const info = parseTitle(pb.title);
        const isRealPreface = !!(info && info.subIndex === null && hasChild[info.groupKey]);
        if (isRealPreface) continue;

        const item: FlatItem = { secId: sec.id, secTitle: sec.title, pb };

        if (info && info.subIndex === 1 && prefaceLocal[info.groupKey]) {
          item.preface = prefaceLocal[info.groupKey];
        }

        map[pb.id] = out.length;
        out.push(item);
      }
    }

    return { flat: out, idToIndex: map };
  }, [data.sections]);

  // URL 파라미터로 이동 (?p=ID)
  useEffect(() => {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);

  const p = params.get('p');

  if (!p) return;

  const i = idToIndex[p];

  if (i != null && i !== idx) {
    setIdx(i);
    setShowAnswer(false);
    setGradeResult(null);
    setSaved(false);
  }
}, [idToIndex]);

  const current = flat[idx];

  // 로컬 저장 답안 로드
  useEffect(() => {
    if (!current) return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const j = raw ? JSON.parse(raw) : {};
      const v = j[current.pb.id] ?? '';
      setUserAnswer(String(v));
      setSaved(false);
    } catch {
      setUserAnswer('');
      setSaved(false);
    }
  }, [idx, current?.pb?.id]);

const isFirst = useRef(true);
  // URL 동기화
  useEffect(() => {
  if (!current?.pb?.id) return;

  if (isFirst.current) {
    isFirst.current = false;
    return;
  }

  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);

  const now = params.get('p');

  if (now === current.pb.id) return;

  router.replace(
    `/workbook/ch2-orthogonality?p=${encodeURIComponent(current.pb.id)}`
  );
}, [idx, current?.pb?.id, router]);

  // KaTeX 렌더
  function renderMath() {
    try {
      window.renderMathInElement?.(promptRef.current as any, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\[', right: '\\]', display: true },
          { left: '\\(', right: '\\)', display: false },
        ],
        throwOnError: false,
      });
      window.renderMathInElement?.(answerRef.current as any, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\[', right: '\\]', display: true },
          { left: '\\(', right: '\\)', display: false },
        ],
        throwOnError: false,
      });
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    const t = window.setTimeout(() => renderMath(), 0);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, showAnswer]);

  if (!current) {
    return (
      <div style={{ padding: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800 }}>문항이 없습니다</h1>
        <p style={{ marginTop: 8 }}>
          JSON 경로: <code>src/app/workbook/ch2-orthogonality/ch2-orthogonality.ts</code>
        </p>
      </div>
    );
  }

  const displayPrompt = buildDisplayPrompt(current.pb, current.preface);
  const preparedAnswer = pickAnswer(current.pb);

  function saveMyAnswer() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const j = raw ? JSON.parse(raw) : {};
      j[current.pb.id] = userAnswer;
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(j));
      setSaved(true);
      window.setTimeout(() => setSaved(false), 1200);
    } catch {
      // ignore
    }
  }

  async function gradeWithAI() {
    setGrading(true);
    setGradeResult(null);
    try {
      // ✅ 교수님 프로젝트 기준 grade route 위치: src/app/api/grade/route.ts
      const res = await fetch('/api/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemId: current.pb.id,
          title: current.pb.title,
          prompt: sanitize(current.pb.prompt),
          referenceSolution: preparedAnswer,
          userAnswer: userAnswer,
        }),
      });

      const text = await res.text();
      if (!res.ok) {
        setGradeResult(`채점 API 오류: ${res.status}\n${text}`);
        return;
      }

      // JSON 응답일 수도, 그냥 텍스트일 수도 있어서 둘 다 처리
      try {
        const j = JSON.parse(text);
        setGradeResult(`점수: ${j.score}점\n\n${j.feedback}`);
      } catch {
        setGradeResult(text);
      }
    } catch (e: any) {
      setGradeResult(`채점 중 예외: ${String(e?.message ?? e)}`);
    } finally {
      setGrading(false);
    }
  }

  async function runPythonCode() {
    setRunningCode(true);
    setCodeOutput(null);

    try {
    const response = await fetch(
      '/api/python',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
  code: userAnswer,
}),
      }
    );

    const result = await response.json();

console.log(result);
alert(JSON.stringify(result, null, 2));

    const stdout =
  result?.run?.stdout ||
  result?.stdout ||
  result?.output ||
  '';

const stderr =
  result?.run?.stderr ||
  result?.stderr ||
  '';

if (stderr.trim()) {
  setCodeOutput(
    `에러 발생:\n\n${stderr}`
  );
} else {
  setCodeOutput(
    stdout.trim()
      ? stdout
      : '(출력 없음)'
  );
}
  } catch (e: any) {
    setCodeOutput(
      `실행 실패:\n${String(
        e?.message ?? e
      )}`
    );
  } finally {
    setRunningCode(false);
  }
}

  return (
  <>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"
    />

    <Script
      src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"
      strategy="afterInteractive"
    />

    <Script
      src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"
      strategy="afterInteractive"
      onLoad={() => renderMath()}
    />

    {/* 전체 레이아웃 */}
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#f5f7fb',
      }}
    >

      {/* 좌측 목차 */}
      <div
        style={{
          width: 280,
          background: '#fff',
          borderRight: '1px solid #e5e7eb',
          padding: 20,
          overflowY: 'auto',
          position: 'sticky',
          top: 0,
          height: '100vh',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 900,
            marginBottom: 24,
          }}
        >
          {data.title}
        </div>

        {(data.sections ?? []).map((sec) => (
          <div
            key={sec.id}
            style={{ marginBottom: 24 }}
          >
            <div
              style={{
                fontWeight: 800,
                marginBottom: 10,
                color: '#111827',
                fontSize: 15,
              }}
            >
              {sec.title}
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              {sec.problems.map((pb) => {
                const targetIdx = idToIndex[pb.id];

                // 서문 제외
                if (targetIdx == null) return null;

                const active =
                  current.pb.id === pb.id;

                return (
                  <button
                    key={pb.id}
                    onClick={() => {
                      setIdx(targetIdx);
                      setShowAnswer(false);
                      setGradeResult(null);
                    }}
                    style={{
                      textAlign: 'left',
                      padding: '10px 12px',
                      borderRadius: 10,
                      border: 'none',
                      cursor: 'pointer',
                      background: active
                        ? '#111827'
                        : 'transparent',
                      color: active
                        ? '#fff'
                        : '#374151',
                      fontSize: 14,
                      transition: '0.15s',
                    }}
                  >
                    {pb.title}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 우측 본문 */}
      <div
        style={{
          flex: 1,
          padding: 24,
          maxWidth: 1050,
          margin: '0 auto',
        }}
      >

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div>
            <div
              style={{
                opacity: 0.7,
                marginBottom: 6,
              }}
            >
              {current.secTitle}
            </div>

            <div
              style={{
                display: 'flex',
                gap: 12,
                alignItems: 'baseline',
              }}
            >
              <h1
                style={{
                  fontSize: 34,
                  fontWeight: 900,
                  margin: 0,
                }}
              >
                {current.pb.title}
              </h1>

              <span style={{ opacity: 0.7 }}>
                {idx + 1} / {flat.length}
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              gap: 10,
              flexWrap: 'wrap',
              justifyContent: 'flex-end',
            }}
          >
            <button
              onClick={() => {
                setIdx((v) =>
                  Math.max(0, v - 1)
                );
                setShowAnswer(false);
                setGradeResult(null);
              }}
              disabled={idx === 0}
              style={{
                padding: '10px 14px',
                borderRadius: 10,
                border: '1px solid #ddd',
                opacity: idx === 0 ? 0.5 : 1,
              }}
            >
              이전
            </button>

            <button
              onClick={() => {
                setIdx((v) =>
                  Math.min(
                    flat.length - 1,
                    v + 1
                  )
                );
                setShowAnswer(false);
                setGradeResult(null);
              }}
              disabled={
                idx === flat.length - 1
              }
              style={{
                padding: '10px 14px',
                borderRadius: 10,
                border: '1px solid #ddd',
                opacity:
                  idx === flat.length - 1
                    ? 0.5
                    : 1,
              }}
            >
              다음
            </button>

            <button
              onClick={() =>
                setShowAnswer((v) => !v)
              }
              style={{
                padding: '10px 14px',
                borderRadius: 10,
                border: '1px solid #ddd',
              }}
            >
              정답 및 풀이 보기
            </button>

            <button
              onClick={gradeWithAI}
              disabled={grading}
              style={{
                padding: '10px 14px',
                borderRadius: 10,
                border: '1px solid #ddd',
                opacity: grading ? 0.6 : 1,
              }}
            >
              {grading
                ? 'AI 채점 중...'
                : 'AI 채점'}
            </button>
          </div>
        </div>

        <div
          style={{
            marginTop: 16,
            padding: 18,
            border: '1px solid #eee',
            borderRadius: 14,
            background: '#fff',
          }}
        >
          <div ref={promptRef}>
            {renderFencedText(
              displayPrompt ||
                '(문제 본문이 비어 있습니다)'
            )}
          </div>
        </div>

        {showAnswer && (
          <div
            style={{
              marginTop: 14,
              padding: 18,
              border: '1px solid #ddd',
              borderRadius: 14,
              background: '#fafafa',
            }}
          >
            <div
              style={{
                fontWeight: 900,
                marginBottom: 10,
              }}
            >
              정답 및 풀이
            </div>

            <div ref={answerRef}>
              {preparedAnswer ? (
                renderFencedText(
                  preparedAnswer
                )
              ) : (
                <div
                  style={{ opacity: 0.7 }}
                >
                  (사전 정답이 없습니다)
                </div>
              )}
            </div>
          </div>
        )}

        <div
          style={{
            marginTop: 18,
            padding: 18,
            border: '1px solid #eee',
            borderRadius: 14,
            background: '#fff',
          }}
        >
          <div
            style={{
              fontWeight: 900,
              marginBottom: 8,
            }}
          >
            내 답안
          </div>

{current.pb.answerType === 'code' ? (
  <Editor
    height="320px"
    defaultLanguage="python"
    theme="vs-dark"
    value={userAnswer}
    onChange={(value) =>
      setUserAnswer(value || '')
    }
    options={{
      fontSize: 15,
      minimap: {
        enabled: false,
      },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      wordWrap: 'on',
    }}
  />
) : (
  <textarea
    value={userAnswer}
    onChange={(e) =>
      setUserAnswer(e.target.value)
    }
    placeholder="여기에 답안을 작성하세요."
    style={{
      width: '100%',
      minHeight: 140,
      padding: 12,
      borderRadius: 12,
      border: '1px solid #ddd',
      fontSize: 14,
    }}
  />
)}

<div
  style={{
    marginTop: 10,
    display: 'flex',
    gap: 10,
    alignItems: 'center',
    flexWrap: 'wrap',
  }}
>
  {/* 저장 버튼 */}
  <button
    onClick={saveMyAnswer}
    style={{
      padding: '10px 14px',
      borderRadius: 10,
      border: '1px solid #ddd',
    }}
  >
    저장
  </button>

  {/* 코드 실행 버튼 */}
  {current.pb.answerType === 'code' && (
    <button
      onClick={runPythonCode}
      disabled={runningCode}
      style={{
        padding: '10px 14px',
        borderRadius: 10,
        border: '1px solid #ddd',
        background: '#111827',
        color: '#fff',
        opacity: runningCode ? 0.7 : 1,
      }}
    >
      {runningCode
        ? '실행 중...'
        : '코드 실행'}
    </button>
  )}

  {/* 저장 표시 */}
  {saved && (
    <span
      style={{
        fontSize: 13,
        opacity: 0.75,
      }}
    >
      저장됨
    </span>
  )}

  {/* AI 채점 결과 */}
  {gradeResult && (
    <div
      style={{
        width: '100%',
        marginTop: 10,
        padding: 12,
        borderRadius: 12,
        border: '1px solid #ddd',
      }}
    >
      <div
        style={{
          fontWeight: 900,
          marginBottom: 6,
        }}
      >
        AI 채점 결과
      </div>

      <div
        style={{
          whiteSpace: 'pre-wrap',
          lineHeight: 1.6,
        }}
      >
        {gradeResult}
      </div>
    </div>
  )}

  {/* Python 실행 결과 */}
  {codeOutput && (
    <div
      style={{
        width: '100%',
        marginTop: 10,
        padding: 12,
        borderRadius: 12,
        border: '1px solid #ddd',
        background: '#0b1020',
        color: '#e6edf3',
      }}
    >
      <div
        style={{
          fontWeight: 900,
          marginBottom: 6,
        }}
      >
        Python 실행 결과
      </div>

      <pre
        style={{
          whiteSpace: 'pre-wrap',
          margin: 0,
          lineHeight: 1.5,
        }}
      >
        {codeOutput}
      </pre>
    </div>
  )}
</div>
        </div>

      </div>
    </div>
  </>
);
}