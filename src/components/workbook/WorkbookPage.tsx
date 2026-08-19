"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import ProblemRenderer from "./ProblemRenderer";
import { consoleAnswerToText } from "./ConsoleProblem";
import { pythonAnswerToCode, pythonAnswerToText } from "./PythonProblem";
import {
  createPythonConsoleInitialValue,
  isPythonConsoleProblem,
  pythonConsoleAnswerToText,
} from "./PythonConsoleProblem";
import { saveAnswer } from "@/lib/answers/saveAnswer";
import { loadAnswer } from "@/lib/answers/loadAnswer";
import { createClient } from "@/lib/supabase/client";

import type { WorkbookChapter, WorkbookProblem } from "@/types/workbook";
import { PROBLEM_TYPE_LABEL, resolveProblemType } from "@/types/workbook";

const ANSWER_UNLOCK_SCORE = 80; //AI 채점 오픈 기준

type WorkbookPageProps = {
  chapter: WorkbookChapter;
  chapterSlug: string;
  contentPath: string;
};

declare global {
  interface Window {
    renderMathInElement?: (elem: HTMLElement, opts?: any) => void;

    loadPyodide?: any;
  }
}

type FlatItem = {
  secId: string;
  secTitle: string;
  pb: WorkbookProblem;
  preface?: WorkbookProblem;
};

type SidebarGroup = {
  key: string;
  parent?: WorkbookProblem;
  children: WorkbookProblem[];
  standalone: WorkbookProblem[];
};

function sanitize(s?: string) {
  return String(s ?? "")
    .replace(/\u200b/g, "")
    .replace(/\ue000/g, "")
    .replace(/\u00A0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function parseTitle(title: string) {
  // "1.A.", "1.A1.", "2.B1." 등에서 groupKey="1.A", subIndex=1 추출
  const t = (title ?? "").trim();
  const m = t.match(/^(\d+)\.([A-Z])(\d+)?\.?$/);
  if (!m) return null;
  const groupKey = `${m[1]}.${m[2]}`; // "1.A"
  const subIndex = m[3] ? Number(m[3]) : null; // 1 for A1
  return { groupKey, subIndex };
}

function pickAnswer(pb: WorkbookProblem): string {
  // ✅ 사전 정답/풀이 키 이름이 무엇이든 최대한 잡아낸다
  const candidates = [
    pb.referenceAnswer,
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
  return "";
}

function buildDisplayPrompt(
  pb: WorkbookProblem,
  preface?: WorkbookProblem,
): string {
  const parts: string[] = [];

  if (preface) {
    const pt = sanitize(preface.prompt);
    const pc = sanitize(preface.code);
    if (pt) parts.push(`${pt}`);
    if (pc) parts.push(`\n\n\`\`\`python\n${pc}\n\`\`\``);
    parts.push("\n--------------------\n");
  }

  const t = sanitize(pb.prompt);
  if (t) parts.push(t);

  // starterCode는 답안 에디터의 초기값으로만 사용하고,
  // 문제 본문에는 pb.code가 명시된 경우에만 코드를 표시한다.
  const c = sanitize(pb.code);
  if (c) parts.push(`\n\n\`\`\`python\n${c}\n\`\`\``);

  return parts.join("").trim();
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
        <div
          key={`t-${k++}`}
          style={{ whiteSpace: "pre-wrap", lineHeight: 1.65 }}
        >
          {before}
        </div>,
      );
    }

    const lang = (m[1] || "").trim();
    const code = m[2] || "";
    nodes.push(
      <pre
        key={`c-${k++}`}
        style={{
          marginTop: 12,
          marginBottom: 12,
          padding: 14,
          background: "#0b1020",
          color: "#e6edf3",
          borderRadius: 12,
          overflowX: "auto",
        }}
      >
        <code className={lang ? `language-${lang}` : undefined}>{code}</code>
      </pre>,
    );

    last = m.index + m[0].length;
  }

  const tail = s.slice(last);
  if (tail.length) {
    nodes.push(
      <div
        key={`t-${k++}`}
        style={{ whiteSpace: "pre-wrap", lineHeight: 1.65 }}
      >
        {tail}
      </div>,
    );
  }

  return nodes;
}

export default function WorkbookPage({
  chapter,
  chapterSlug,
  contentPath,
}: WorkbookPageProps) {
  const data: WorkbookChapter = {
    title: chapter?.title ?? "",
    sections: Array.isArray(chapter?.sections) ? chapter.sections : [],
  };
  const storageKey = `workbook::${chapterSlug}`;
  const chapterPath = `/workbook/${chapterSlug}`;

  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [authPromptAction, setAuthPromptAction] = useState("");

  const [idx, setIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const [userAnswer, setUserAnswer] = useState("");
  const [saved, setSaved] = useState(false);
  const [saveNotice, setSaveNotice] = useState("");

  const [plotImage, setPlotImage] = useState<string | null>(null);

  // ✅ AI 채점 결과
  const [grading, setGrading] = useState(false);

  type GradeResult = {
    score?: number;
    feedback?: string;
    error?: string;
  };

  const [gradeResult, setGradeResult] = useState<GradeResult | null>(null);

  const [runningCode, setRunningCode] = useState(false);

  const [codeOutput, setCodeOutput] = useState<string | null>(null);

  const [pyReady, setPyReady] = useState(false);

  const pyodideRef = useRef<any>(null);

  const [pyodide, setPyodide] = useState<any>(null);

  const promptRef = useRef<HTMLDivElement | null>(null);

  const answerRef = useRef<HTMLDivElement | null>(null);

  const { flat, idToIndex } = useMemo(() => {
    const out: FlatItem[] = [];
    const map: Record<string, number> = {};

    for (const sec of data.sections ?? []) {
      const problems = sec.problems ?? [];
      const childGroups = new Set<string>();
      const commonProblems: Record<string, WorkbookProblem> = {};

      // 1.A1, 1.A2처럼 세부문항이 존재하는 그룹을 찾는다.
      for (const pb of problems) {
        const info = parseTitle(pb.title);
        if (info?.subIndex != null) {
          childGroups.add(info.groupKey);
        }
      }

      // 같은 그룹의 1.A 같은 상위 문항은 공통 문제로 보관한다.
      for (const pb of problems) {
        const info = parseTitle(pb.title);

        if (
          info &&
          info.subIndex === null &&
          childGroups.has(info.groupKey)
        ) {
          commonProblems[info.groupKey] = pb;
        }
      }

      // 공통 문제 자체는 학습 문항 목록에서 제외하고,
      // 같은 그룹의 모든 세부문항(A1, A2, ...)에 공통 문제를 붙인다.
      for (const pb of problems) {
        const info = parseTitle(pb.title);

        const isCommonProblem = Boolean(
          info &&
            info.subIndex === null &&
            childGroups.has(info.groupKey),
        );

        if (isCommonProblem) continue;

        const item: FlatItem = {
          secId: sec.id,
          secTitle: sec.title,
          pb,
        };

        if (info?.subIndex != null) {
          item.preface = commonProblems[info.groupKey];
        }

        map[pb.id] = out.length;
        out.push(item);
      }
    }

    return { flat: out, idToIndex: map };
  }, [data.sections]);

  const sidebarBySection = useMemo(() => {
    const result: Record<string, SidebarGroup[]> = {};

    for (const sec of data.sections ?? []) {
      const groups = new Map<string, SidebarGroup>();
      const order: string[] = [];

      for (const pb of sec.problems ?? []) {
        const info = parseTitle(pb.title);

        // 계층형 제목이 아닌 문제는 독립 항목으로 취급한다.
        if (!info) {
          const key = `standalone:${pb.id}`;
          groups.set(key, {
            key,
            children: [],
            standalone: [pb],
          });
          order.push(key);
          continue;
        }

        if (!groups.has(info.groupKey)) {
          groups.set(info.groupKey, {
            key: info.groupKey,
            children: [],
            standalone: [],
          });
          order.push(info.groupKey);
        }

        const group = groups.get(info.groupKey)!;

        if (info.subIndex == null) {
          group.parent = pb;
        } else {
          group.children.push(pb);
        }
      }

      result[sec.id] = order
        .map((key) => groups.get(key))
        .filter((group): group is SidebarGroup => Boolean(group));
    }

    return result;
  }, [data.sections]);

  // 로그인 상태와 역할 확인
  // 학생은 AI 점수가 기준 이상일 때 정답을 볼 수 있고,
  // 교수/developer/admin은 즉시 정답 확인이 가능하다.
  useEffect(() => {
    let mounted = true;

    async function syncAuthState() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!mounted) return;

      setIsAuthenticated(Boolean(user));

      if (!user) {
        setUserRole(null);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

      if (!mounted) return;
      setUserRole(profile?.role ?? null);
    }

    void syncAuthState();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;

      const user = session?.user ?? null;
      setIsAuthenticated(Boolean(user));

      if (!user) {
        setUserRole(null);
        return;
      }

      void supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle()
        .then(({ data: profile }) => {
          if (!mounted) return;
          setUserRole(profile?.role ?? null);
        });
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  function requestAuthenticatedAction(actionLabel: string, action: () => void) {
    if (isAuthenticated) {
      action();
      return;
    }

    setAuthPromptAction(actionLabel);
    setShowAuthPrompt(true);
  }

  // 외부 링크(/history 등)에서 ?p=문제ID로 들어온 경우 해당 문제로 이동
  // URL을 읽는 역할만 담당하고, URL 쓰기는 moveToProblem()에서 처리한다.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const problemId = params.get("p");

    if (!problemId) return;

    const targetIdx = idToIndex[problemId];

    if (targetIdx != null) {
      setIdx(targetIdx);
      setShowAnswer(false);
      setGradeResult(null);
      setCodeOutput(null);
      setPlotImage(null);
      setSaved(false);
    }
  }, [idToIndex]);

  const current = flat[idx];

  // 저장 답안 로드
  // 로그인 상태에서는 Supabase를 먼저 확인하고,
  // 저장된 DB 답안이 없으면 localStorage → starter code 순서로 fallback한다.
  useEffect(() => {
    if (!current) return;

    let cancelled = false;

    async function restoreAnswer() {
      const fallback = isPythonConsoleProblem(current.pb)
        ? createPythonConsoleInitialValue(current.pb)
        : resolveProblemType(current.pb) === "python"
          ? String(
              (current.pb.type === "python"
                ? current.pb.starterCode
                : undefined) ??
                current.pb.code ??
                "",
            )
          : "";

      try {
        const remote = await loadAnswer({
          chapterId: chapterSlug,
          problemId: current.pb.id,
        });

        if (cancelled) return;

        if (remote.success && remote.answer) {
          const restoredAnswer = isPythonConsoleProblem(current.pb)
            ? (remote.answer.answer || createPythonConsoleInitialValue(current.pb))
            : resolveProblemType(current.pb) === "python"
              ? pythonAnswerToCode(remote.answer.answer ?? "")
              : remote.answer.answer ?? "";

          setUserAnswer(restoredAnswer);
          setCodeOutput(remote.answer.execution_output ?? null);

          if (
            typeof remote.answer.score === "number" ||
            remote.answer.feedback
          ) {
            setGradeResult({
              score:
                typeof remote.answer.score === "number"
                  ? remote.answer.score
                  : undefined,
              feedback: remote.answer.feedback ?? undefined,
            });
          } else {
            setGradeResult(null);
          }

          setSaved(false);
          return;
        }
      } catch (error) {
        console.error("Supabase 답안 불러오기 실패:", error);
      }

      try {
        const raw = window.localStorage.getItem(storageKey);
        const j = raw ? JSON.parse(raw) : {};
        const savedValue = j[current.pb.id];
        const v = savedValue ?? fallback;

        if (!cancelled) {
          setUserAnswer(
            typeof v === "string" ? v : JSON.stringify(v ?? ""),
          );
          setGradeResult(null);
          setCodeOutput(null);
          setSaved(false);
        }
      } catch {
        if (!cancelled) {
          setUserAnswer(fallback);
          setGradeResult(null);
          setCodeOutput(null);
          setSaved(false);
        }
      }
    }

    restoreAnswer();

    return () => {
      cancelled = true;
    };
  }, [chapterSlug, current?.pb?.id]);


  // KaTeX 렌더
  function renderMath() {
    try {
      window.renderMathInElement?.(promptRef.current as any, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
          { left: "\\[", right: "\\]", display: true },
          { left: "\\(", right: "\\)", display: false },
        ],
        throwOnError: false,
      });
      window.renderMathInElement?.(answerRef.current as any, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
          { left: "\\[", right: "\\]", display: true },
          { left: "\\(", right: "\\)", display: false },
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
          콘텐츠 경로: <code>{contentPath}</code>
        </p>
      </div>
    );
  }

  const displayPrompt = buildDisplayPrompt(current.pb, current.preface);
  const preparedAnswer = pickAnswer(current.pb);
  const currentProblemType = resolveProblemType(current.pb);
  const currentScore =
    typeof gradeResult?.score === "number" ? gradeResult.score : null;

  const privilegedRole =
    userRole === "professor" ||
    userRole === "developer" ||
    userRole === "admin";

  const canViewPreparedAnswer =
    Boolean(isAuthenticated) &&
    (privilegedRole ||
      (userRole === "student" &&
        currentScore != null &&
        currentScore >= ANSWER_UNLOCK_SCORE));

  function handleAnswerToggle() {
    if (!isAuthenticated) {
      requestAuthenticatedAction("정답 및 풀이 보기", () => undefined);
      return;
    }

    if (!canViewPreparedAnswer) {
      return;
    }

    setShowAnswer((value) => !value);
  }

  async function moveToProblem(targetIdx: number) {
    const safeIdx = Math.max(0, Math.min(flat.length - 1, targetIdx));
    const target = flat[safeIdx];

    if (!target) return;

    setIdx(safeIdx);
    setShowAnswer(false);
    setGradeResult(null);
    setCodeOutput(null);
    setPlotImage(null);
    setSaved(false);
    setSaveNotice("");

    // 문제 이동과 URL 변경을 같은 함수에서 처리하여
    // ?p=문제ID deep link가 첫 문제로 덮어써지는 race condition을 방지한다.
    router.replace(
      `${chapterPath}?p=${encodeURIComponent(target.pb.id)}`,
    );

    if (pyodide) {
      try {
        await pyodide.runPythonAsync(`
import matplotlib.pyplot as plt
plt.close('all')
`);
      } catch {
        // ignore
      }
    }
  }

  function buildSubmissionText() {
    if (currentProblemType === "console" && current.pb.type === "console") {
      return consoleAnswerToText(userAnswer);
    }

    if (isPythonConsoleProblem(current.pb)) {
      return pythonConsoleAnswerToText(userAnswer);
    }

    if (currentProblemType === "python") {
      return pythonAnswerToText(userAnswer, codeOutput);
    }

    return userAnswer;
  }

  // DB에는 "다시 편집할 수 있는 원본 답안"을 저장한다.
  // AI 채점용으로 가공한 문자열(buildSubmissionText)은 DB answer 컬럼에 넣지 않는다.
  function buildStoredAnswerText() {
    // 결합형은 코드/Console 기록/서술 답안을 하나의 JSON으로 보존한다.
    if (isPythonConsoleProblem(current.pb)) {
      return userAnswer;
    }

    if (currentProblemType === "python") {
      return pythonAnswerToCode(userAnswer);
    }

    return userAnswer;
  }

  async function saveMyAnswer() {
    // localStorage는 비회원의 임시 저장소이자 회원의 보조 저장소로 사용한다.
    try {
      const raw = window.localStorage.getItem(storageKey);
      const j = raw ? JSON.parse(raw) : {};

      j[current.pb.id] = userAnswer;

      window.localStorage.setItem(storageKey, JSON.stringify(j));
    } catch {
      // localStorage 저장 실패 시 회원은 Supabase 저장을 계속 시도한다.
    }

    // 비회원은 현재 브라우저에만 임시 저장한다.
    if (!isAuthenticated) {
      setSaved(true);
      setSaveNotice(
        "이 브라우저에 임시 저장되었습니다. 로그인하면 학습 기록을 계정에 저장할 수 있습니다.",
      );
      window.setTimeout(() => setSaved(false), 1200);
      return;
    }

    const result = await saveAnswer({
      chapterId: chapterSlug,
      problemId: current.pb.id,
      problemTitle: current.pb.title,
      answer: buildStoredAnswerText(),
      executionOutput: codeOutput,
      score:
        typeof gradeResult?.score === "number" ? gradeResult.score : null,
      feedback: gradeResult?.feedback ?? null,
    });

    if (!result.success && result.reason === "database_error") {
      console.error("Supabase 답안 저장 실패:", result.message);
      setSaveNotice("답안을 저장하지 못했습니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    setSaved(true);
    setSaveNotice("계정에 저장되었습니다.");
    window.setTimeout(() => setSaved(false), 1200);
  }

  async function gradeWithAI() {
    setGrading(true);
    setGradeResult(null);
    try {
      // ✅ 교수님 프로젝트 기준 grade route 위치: src/app/api/grade/route.ts
      const res = await fetch("/api/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemId: current.pb.id,
          title: current.pb.title,
          prompt: sanitize(current.pb.prompt),
          referenceSolution: preparedAnswer,
          userAnswer: buildSubmissionText(),
        }),
      });

      const text = await res.text();

      let parsed: any = null;
      try {
        parsed = JSON.parse(text);
      } catch {
        // JSON이 아닌 응답도 오류 메시지로 표시한다.
      }

      if (!res.ok) {
        setGradeResult({
          error:
            parsed?.error ||
            parsed?.message ||
            `채점 API 오류 (${res.status})`,
          feedback: parsed ? undefined : text,
        });
        return;
      }

      const score = Number(parsed?.score);
      const feedback = String(parsed?.feedback ?? '').trim();

      if (!Number.isFinite(score) || !feedback) {
        setGradeResult({
          error: '채점 결과 형식이 올바르지 않습니다.',
          feedback: text,
        });
        return;
      }

      const normalizedScore = Math.max(0, Math.min(100, score));

      setGradeResult({
        score: normalizedScore,
        feedback,
      });

      const saveResult = await saveAnswer({
        chapterId: chapterSlug,
        problemId: current.pb.id,
        problemTitle: current.pb.title,
        answer: buildStoredAnswerText(),
        executionOutput: codeOutput,
        score: normalizedScore,
        feedback,
      });

      if (!saveResult.success && saveResult.reason === "database_error") {
        console.error("AI 채점 결과 DB 저장 실패:", saveResult.message);
      }
    } catch (e: any) {
      setGradeResult({
        error: '채점 요청 중 오류가 발생했습니다.',
        feedback: String(e?.message ?? e),
      });
    } finally {
      setGrading(false);
    }
  }

  async function initializePython() {
    try {
      console.log("Pyodide 초기화 시작");

      setCodeOutput("Python 로딩 중입니다...");

      console.log("window.loadPyodide:", (window as any).loadPyodide);

      if (!(window as any).loadPyodide) {
        setCodeOutput("loadPyodide가 없습니다.");
        return;
      }

      const pyodide = await (window as any).loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.27.2/full/",
      });

      console.log("Pyodide 로딩 완료");

      pyodideRef.current = pyodide;
      setPyodide(pyodide);

      // Pyodide 본체만 먼저 준비한다.
      // 실제 Python 패키지는 코드 실행 시 import 문을 기준으로 필요한 것만 로드한다.
      setPyReady(true);

      setCodeOutput("Python 실행 준비 완료!");
    } catch (e: any) {
      console.error(e);

      setCodeOutput(`Python 초기화 실패:\n${String(e?.message ?? e)}`);
    }
  }

  async function runPythonCode() {
    const pyodide = pyodideRef.current;

    if (!pyodide) {
      setCodeOutput("Python 엔진 초기화 중입니다. 잠시만 기다려주세요.");
      return;
    }

    setRunningCode(true);
    setCodeOutput(null);
    setPlotImage(null);

    try {
      // 학생 코드에 실제로 import된 Pyodide 패키지만 필요 시점에 내려받는다.
      const pythonCode = pythonAnswerToCode(userAnswer);

      setCodeOutput("필요한 Python 패키지를 확인하는 중입니다...");
      await pyodide.loadPackagesFromImports(pythonCode);

      // matplotlib이 이미 사용 중인 경우에만 이전 Figure를 정리한다.
      await pyodide.runPythonAsync(`
import sys

if "matplotlib.pyplot" in sys.modules:
    import matplotlib.pyplot as plt
    plt.close("all")
`);

      let output = "";

      pyodide.setStdout({
        batched: (s: string) => {
          output += s + "\n";
        },
      });

      // matplotlib figure 기본값 생성
      await pyodide.runPythonAsync(`
image_base64 = ""
has_figure = False
`);

      // Python 답안 데이터에서 실제 코드 부분만 실행한다.
      await pyodide.runPythonAsync(pythonCode);

      // figure 존재 여부 검사
      await pyodide.runPythonAsync(`
import sys
import io
import base64

has_figure = False

if "matplotlib.pyplot" in sys.modules:
    import matplotlib.pyplot as plt

    has_figure = len(plt.get_fignums()) > 0

    if has_figure:
        buf = io.BytesIO()

        plt.savefig(buf, format='png')

        buf.seek(0)

        image_base64 = base64.b64encode(
            buf.read()
        ).decode('utf-8')
`);

      const hasFigure = pyodide.globals.get("has_figure");

      if (hasFigure) {
        const imageBase64 = pyodide.globals.get("image_base64");

        if (imageBase64) {
          setPlotImage(`data:image/png;base64,${imageBase64}`);
        }
      }



      const imageBase64 = pyodide.globals.get("image_base64");

      if (imageBase64 && String(imageBase64).trim() !== "") {
        setPlotImage(`data:image/png;base64,${imageBase64}`);
      } else {
        setPlotImage(null);
      }

      setCodeOutput(
        output.trim() ? output : hasFigure ? "(Figure)" : "(출력 없음)",
      );
    } catch (e: any) {
      setCodeOutput(`에러 발생:\n\n${String(e?.message ?? e)}`);
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
        src="https://cdn.jsdelivr.net/pyodide/v0.27.2/full/pyodide.js"
        strategy="afterInteractive"
        onLoad={() => {
          initializePython();
        }}
      />

      <Script
        src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"
        strategy="afterInteractive"
        onLoad={() => renderMath()}
      />

      {/* 전체 레이아웃 */}
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          background: "#f5f7fb",
        }}
      >
        {/* 좌측 목차 */}
        <div
          style={{
            width: 280,
            background: "#fff",
            borderRight: "1px solid #e5e7eb",
            padding: 20,
            overflowY: "auto",
            position: "sticky",
            top: 0,
            height: "100vh",
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
            <div key={sec.id} style={{ marginBottom: 24 }}>
              <div
                style={{
                  fontWeight: 800,
                  marginBottom: 10,
                  color: "#111827",
                  fontSize: 15,
                }}
              >
                {sec.title}
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {(sidebarBySection[sec.id] ?? []).map((group) => {
                  // 제목 패턴에 맞지 않는 독립 문제
                  if (group.standalone.length > 0) {
                    return group.standalone.map((pb) => {
                      const targetIdx = idToIndex[pb.id];
                      if (targetIdx == null) return null;

                      const active = current.pb.id === pb.id;

                      return (
                        <button
                          key={pb.id}
                          onClick={() => moveToProblem(targetIdx)}
                          style={{
                            textAlign: "left",
                            padding: "9px 10px",
                            borderRadius: 9,
                            border: "none",
                            cursor: "pointer",
                            background: active ? "#111827" : "transparent",
                            color: active ? "#fff" : "#374151",
                            fontSize: 14,
                            transition: "0.15s",
                          }}
                        >
                          {pb.title}
                        </button>
                      );
                    });
                  }

                  const firstChild = group.children[0];
                  const firstChildIdx = firstChild
                    ? idToIndex[firstChild.id]
                    : undefined;

                  // 자식이 없는 1.A 형태는 일반 문제로 표시한다.
                  if (group.children.length === 0 && group.parent) {
                    const targetIdx = idToIndex[group.parent.id];
                    if (targetIdx == null) return null;

                    const active = current.pb.id === group.parent.id;

                    return (
                      <button
                        key={group.key}
                        onClick={() => moveToProblem(targetIdx)}
                        style={{
                          textAlign: "left",
                          padding: "9px 10px 9px 18px",
                          borderRadius: 9,
                          border: "none",
                          cursor: "pointer",
                          background: active ? "#111827" : "transparent",
                          color: active ? "#fff" : "#374151",
                          fontSize: 14,
                          transition: "0.15s",
                        }}
                      >
                        ↳ {group.parent.title}
                      </button>
                    );
                  }

                  return (
                    <div key={group.key}>
                      {group.parent && (
                        <button
                          onClick={() => {
                            if (firstChildIdx != null) {
                              moveToProblem(firstChildIdx);
                            }
                          }}
                          disabled={firstChildIdx == null}
                          title={
                            firstChild
                              ? `${firstChild.title}로 이동`
                              : undefined
                          }
                          style={{
                            width: "100%",
                            textAlign: "left",
                            padding: "8px 10px 8px 18px",
                            borderRadius: 9,
                            border: "none",
                            cursor:
                              firstChildIdx != null ? "pointer" : "default",
                            background: "transparent",
                            color: "#4b5563",
                            fontSize: 14,
                            fontWeight: 700,
                            transition: "0.15s",
                          }}
                        >
                          ↳ {group.parent.title}
                        </button>
                      )}

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 4,
                          marginTop: group.parent ? 2 : 0,
                        }}
                      >
                        {group.children.map((pb) => {
                          const targetIdx = idToIndex[pb.id];
                          if (targetIdx == null) return null;

                          const active = current.pb.id === pb.id;

                          return (
                            <button
                              key={pb.id}
                              onClick={() => moveToProblem(targetIdx)}
                              style={{
                                textAlign: "left",
                                padding: "8px 10px 8px 36px",
                                borderRadius: 9,
                                border: "none",
                                cursor: "pointer",
                                background: active
                                  ? "#111827"
                                  : "transparent",
                                color: active ? "#fff" : "#6b7280",
                                fontSize: 13.5,
                                transition: "0.15s",
                              }}
                            >
                              ↳ {pb.title}
                            </button>
                          );
                        })}
                      </div>
                    </div>
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
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
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
                  display: "flex",
                  gap: 12,
                  alignItems: "baseline",
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
                  <span
                    style={{
                      marginLeft: 10,
                      padding: "3px 8px",
                      borderRadius: 999,
                      background: "#eef2ff",
                      color: "#3730a3",
                      fontSize: 12,
                      fontWeight: 700,
                      verticalAlign: "middle",
                    }}
                  >
                    {PROBLEM_TYPE_LABEL[currentProblemType]}
                  </span>
                </h1>

                <span style={{ opacity: 0.7 }}>
                  {idx + 1} / {flat.length}
                </span>
              </div>
            </div>

          </div>

          <div
            style={{
              marginTop: 16,
              padding: 18,
              border: "1px solid #eee",
              borderRadius: 14,
              background: "#fff",
            }}
          >
            <div ref={promptRef}>
              {renderFencedText(displayPrompt || "(문제 본문이 비어 있습니다)")}
            </div>
          </div>


          <div
            style={{
              marginTop: 18,
              padding: 18,
              border: "1px solid #eee",
              borderRadius: 14,
              background: "#fff",
            }}
          >
            {currentProblemType !== "console" &&
              !isPythonConsoleProblem(current.pb) && (
              <div
                style={{
                  fontWeight: 900,
                  marginBottom: 8,
                }}
              >
                내 답안
              </div>
            )}

            <ProblemRenderer
              problem={current.pb}
              value={userAnswer}
              onChange={setUserAnswer}
              pyodide={pyodide}
              pyReady={pyReady}
              runningCode={runningCode}
              codeOutput={codeOutput}
              plotImage={plotImage}
              onRunPython={runPythonCode}
            />

            <div
              style={{
                marginTop: 10,
                display: "flex",
                gap: 10,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {/* 저장 버튼 */}
              <button
                onClick={saveMyAnswer}
                style={{
                  padding: "10px 14px",
                  borderRadius: 10,
                  border: "1px solid #ddd",
                }}
              >
                저장
              </button>

              <button
                type="button"
                onClick={() =>
                  requestAuthenticatedAction("내 답안 채점하기", gradeWithAI)
                }
                disabled={grading}
                style={{
                  padding: "10px 14px",
                  borderRadius: 10,
                  border: "1px solid #ddd",
                  background: "#4f46e5",
                  color: "#fff",
                  fontWeight: 800,
                  opacity: grading ? 0.6 : 1,
                  cursor: grading ? "not-allowed" : "pointer",
                }}
              >
                {grading ? "채점 중..." : "내 답안 채점하기"}
              </button>

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

              {saveNotice && (
                <div
                  style={{
                    width: '100%',
                    marginTop: 4,
                    padding: '10px 12px',
                    borderRadius: 10,
                    background: isAuthenticated ? '#eff6ff' : '#fffbeb',
                    border: isAuthenticated
                      ? '1px solid #dbeafe'
                      : '1px solid #fde68a',
                    color: isAuthenticated ? '#1e3a8a' : '#92400e',
                    fontSize: 13,
                    lineHeight: 1.55,
                  }}
                >
                  {saveNotice}
                </div>
              )}

              {/* AI 채점 결과 */}
              {gradeResult && (
                <div
                  style={{
                    width: '100%',
                    marginTop: 14,
                    padding: 18,
                    borderRadius: 16,
                    border: gradeResult.error
                      ? '1px solid #fecaca'
                      : '1px solid #dbeafe',
                    background: gradeResult.error ? '#fff7f7' : '#f8fbff',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 12,
                      marginBottom: 14,
                    }}
                  >
                    <div style={{ fontWeight: 900, fontSize: 17 }}>
                      AI 채점 결과
                    </div>

                    {typeof gradeResult.score === 'number' && (
                      <div
                        style={{
                          minWidth: 76,
                          padding: '8px 12px',
                          borderRadius: 999,
                          background:
                            gradeResult.score >= 80
                              ? '#dcfce7'
                              : gradeResult.score >= 60
                              ? '#fef3c7'
                              : '#fee2e2',
                          color:
                            gradeResult.score >= 80
                              ? '#166534'
                              : gradeResult.score >= 60
                              ? '#92400e'
                              : '#991b1b',
                          textAlign: 'center',
                          fontWeight: 900,
                        }}
                      >
                        {gradeResult.score}점
                      </div>
                    )}
                  </div>

                  {typeof gradeResult.score === 'number' && (
                    <div
                      style={{
                        height: 8,
                        borderRadius: 999,
                        background: '#e5e7eb',
                        overflow: 'hidden',
                        marginBottom: 16,
                      }}
                    >
                      <div
                        style={{
                          width: `${gradeResult.score}%`,
                          height: '100%',
                          borderRadius: 999,
                          background:
                            gradeResult.score >= 80
                              ? '#22c55e'
                              : gradeResult.score >= 60
                              ? '#f59e0b'
                              : '#ef4444',
                        }}
                      />
                    </div>
                  )}

                  {gradeResult.error && (
                    <div
                      style={{
                        marginBottom: gradeResult.feedback ? 12 : 0,
                        color: '#b91c1c',
                        fontWeight: 800,
                      }}
                    >
                      {gradeResult.error}
                    </div>
                  )}

                  {gradeResult.feedback && (
                    <div
                      style={{
                        whiteSpace: 'pre-wrap',
                        lineHeight: 1.75,
                        color: '#1f2937',
                      }}
                    >
                      {gradeResult.feedback}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div
            style={{
              marginTop: 16,
              padding: 16,
              borderRadius: 14,
              border: "1px solid #e5e7eb",
              background: "#fff",
            }}
          >
            <button
              type="button"
              onClick={handleAnswerToggle}
              disabled={
                Boolean(isAuthenticated) &&
                !canViewPreparedAnswer
              }
              style={{
                width: "100%",
                minHeight: 48,
                padding: "11px 14px",
                borderRadius: 11,
                border: canViewPreparedAnswer
                  ? "1px solid #c7d2fe"
                  : "1px solid #e5e7eb",
                background: canViewPreparedAnswer ? "#eef2ff" : "#f9fafb",
                color: canViewPreparedAnswer ? "#3730a3" : "#6b7280",
                fontWeight: 900,
                cursor:
                  Boolean(isAuthenticated) && !canViewPreparedAnswer
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              {!isAuthenticated
                ? "정답 및 풀이 보기"
                : canViewPreparedAnswer
                  ? showAnswer
                    ? "정답 및 풀이 숨기기"
                    : "정답 및 풀이 보기"
                  : `🔒 AI 채점 ${ANSWER_UNLOCK_SCORE}점 이상에서 공개`}
            </button>

            {isAuthenticated &&
              userRole === "student" &&
              !canViewPreparedAnswer && (
                <div
                  style={{
                    marginTop: 10,
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: "#6b7280",
                    textAlign: "center",
                  }}
                >
                  {currentScore == null
                    ? `먼저 답안을 작성하고 AI 채점을 받아보세요. ${ANSWER_UNLOCK_SCORE}점 이상이면 정답 및 풀이가 열립니다.`
                    : `현재 ${currentScore}점입니다. AI 피드백을 참고해 답안을 수정한 뒤 다시 채점해보세요.`}
                </div>
              )}
          </div>

          {showAnswer && canViewPreparedAnswer && (
            <div
              style={{
                marginTop: 14,
                padding: 18,
                border: "1px solid #ddd",
                borderRadius: 14,
                background: "#fafafa",
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
                  renderFencedText(preparedAnswer)
                ) : (
                  <div style={{ opacity: 0.7 }}>(사전 정답이 없습니다)</div>
                )}
              </div>
            </div>
          )}

          <div
            style={{
              marginTop: 18,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
          >
            <button
              type="button"
              onClick={() => moveToProblem(idx - 1)}
              disabled={idx <= 0}
              style={{
                minHeight: 48,
                borderRadius: 11,
                border: "1px solid #d1d5db",
                background: "#fff",
                fontWeight: 800,
                cursor: idx <= 0 ? "not-allowed" : "pointer",
                opacity: idx <= 0 ? 0.5 : 1,
              }}
            >
              ← 이전 문제
            </button>

            <button
              type="button"
              onClick={() => moveToProblem(idx + 1)}
              disabled={idx >= flat.length - 1}
              style={{
                minHeight: 48,
                borderRadius: 11,
                border: 0,
                background: "#111827",
                color: "#fff",
                fontWeight: 800,
                cursor: idx >= flat.length - 1 ? "not-allowed" : "pointer",
                opacity: idx >= flat.length - 1 ? 0.5 : 1,
              }}
            >
              다음 문제 →
            </button>
          </div>
        </div>
      </div>

      {showAuthPrompt && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setShowAuthPrompt(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "grid",
            placeItems: "center",
            padding: 20,
            background: "rgba(15,23,42,0.55)",
            backdropFilter: "blur(3px)",
          }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 430,
              padding: 26,
              borderRadius: 20,
              background: "#fff",
              boxShadow: "0 24px 70px rgba(15,23,42,0.28)",
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 900,
                color: "#4f46e5",
              }}
            >
              무료 회원 기능
            </div>

            <h2
              style={{
                margin: "8px 0 0",
                fontSize: 24,
                fontWeight: 900,
                color: "#111827",
              }}
            >
              로그인 또는 무료 회원가입이 필요합니다
            </h2>

            <p
              style={{
                margin: "12px 0 0",
                color: "#6b7280",
                lineHeight: 1.7,
              }}
            >
              {authPromptAction || "이 기능"}을 사용하려면 계정이 필요합니다.
              무료 회원가입 후 정답 및 풀이 확인, AI 채점, 학습 기록 저장 기능을 이용할 수 있습니다.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
                marginTop: 22,
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setShowAuthPrompt(false);
                  router.push("/login");
                }}
                style={{
                  minHeight: 46,
                  border: "1px solid #d1d5db",
                  borderRadius: 12,
                  cursor: "pointer",
                  background: "#fff",
                  color: "#111827",
                  fontWeight: 900,
                }}
              >
                로그인
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowAuthPrompt(false);
                  router.push("/login");
                }}
                style={{
                  minHeight: 46,
                  border: 0,
                  borderRadius: 12,
                  cursor: "pointer",
                  background: "#4f46e5",
                  color: "#fff",
                  fontWeight: 900,
                }}
              >
                무료 회원가입
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowAuthPrompt(false)}
              style={{
                width: "100%",
                marginTop: 12,
                padding: 8,
                border: 0,
                cursor: "pointer",
                background: "transparent",
                color: "#6b7280",
                fontWeight: 700,
              }}
            >
              계속 문제 풀기
            </button>
          </div>
        </div>
      )}
    </>
  );
}
