"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import ProblemRenderer from "./ProblemRenderer";
import { consoleAnswerToText } from "./ConsoleProblem";
import { pythonAnswerToCode, pythonAnswerToResponse, serializePythonAnswer, pythonAnswerToText } from "./PythonProblem";
import { graphAnswerToText } from "./GraphProblem";
import {
  createPythonConsoleInitialValue,
  isPythonConsoleProblem,
  pythonConsoleAnswerToText,
  parsePythonConsoleAnswer,
} from "./PythonConsoleProblem";
import { saveAnswer } from "@/lib/answers/saveAnswer";
import { loadAnswer } from "@/lib/answers/loadAnswer";
import { createClient } from "@/lib/supabase/client";
import TutorialOverlay from "@/components/tutorial/TutorialOverlay";
import TutorialIntroPrompt from "@/components/tutorial/TutorialIntroPrompt";
import { WORKBOOK_TUTORIAL_STEPS } from "@/components/tutorial/steps";

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
    katex?: {
      render?: (
        latex: string,
        element: HTMLElement,
        options?: {
          displayMode?: boolean;
          throwOnError?: boolean;
        },
      ) => void;
    };

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

type ChapterEquation = {
  id: string;
  latex: string;
  problemId: string;
  problemTitle: string;
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
        <span
          key={`t-${k++}`}
          style={{ whiteSpace: "pre-wrap", lineHeight: 1.65 }}
        >
          {before}
        </span>,
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
          padding: 16,
          background: "#1e1e1e",
          color: "#d4d4d4",
          borderRadius: 8,
          overflowX: "auto",
          fontSize: 15,
          lineHeight: 1.5,
          fontFamily:
            'Consolas, "Courier New", monospace',
          fontWeight: 400,
          tabSize: 4,
        }}
      >
        <code
          className={lang ? `language-${lang}` : undefined}
          style={{
            font: "inherit",
            color: "inherit",
          }}
        >
          {code}
        </code>
      </pre>,
    );

    last = m.index + m[0].length;
  }

  const tail = s.slice(last);
  if (tail.length) {
    nodes.push(
      <span
        key={`t-${k++}`}
        style={{ whiteSpace: "pre-wrap", lineHeight: 1.65 }}
      >
        {tail}
      </span>,
    );
  }

  return nodes;
}


function splitTableRow(line: string) {
  const cells: string[] = [];
  let current = "";
  let escaped = false;

  for (const ch of line) {
    if (escaped) {
      current += ch;
      escaped = false;
      continue;
    }

    if (ch === "\\") {
      current += ch;
      escaped = true;
      continue;
    }

    if (ch === "|") {
      cells.push(current.trim());
      current = "";
      continue;
    }

    current += ch;
  }

  cells.push(current.trim());
  return cells;
}

function renderWorkbookTable(raw: string, key: string) {
  const lines = raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    return (
      <div
        key={key}
        style={{
          margin: "18px 0",
          padding: 14,
          borderRadius: 10,
          background: "#fff7ed",
          border: "1px solid #fed7aa",
          color: "#9a3412",
        }}
      >
        표 형식이 올바르지 않습니다.
      </div>
    );
  }

  let caption = "";
  if (/^caption\s*:/i.test(lines[0])) {
    caption = lines.shift()!.replace(/^caption\s*:/i, "").trim();
  }

  const rows = lines.map(splitTableRow);
  const header = rows[0];
  const body = rows.slice(1);

  return (
    <figure
      key={key}
      style={{
        margin: "20px 0",
        maxWidth: "100%",
      }}
    >
      {caption && (
        <figcaption
          style={{
            marginBottom: 9,
            textAlign: "center",
            fontSize: 14,
            fontWeight: 800,
            color: "#374151",
            lineHeight: 1.6,
          }}
        >
          {caption}
        </figcaption>
      )}

      <div
        style={{
          width: "100%",
          overflowX: "auto",
          border: "1px solid #d1d5db",
          borderRadius: 10,
          background: "#fff",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: 520,
            fontSize: 14,
            lineHeight: 1.65,
          }}
        >
          <thead>
            <tr>
              {header.map((cell, index) => (
                <th
                  key={`h-${index}`}
                  style={{
                    padding: "10px 12px",
                    background: "#f3f4f6",
                    borderRight:
                      index < header.length - 1
                        ? "1px solid #d1d5db"
                        : "none",
                    borderBottom: "2px solid #9ca3af",
                    textAlign: "center",
                    fontWeight: 900,
                    color: "#111827",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {cell}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {body.map((row, rowIndex) => (
              <tr key={`r-${rowIndex}`}>
                {header.map((_, cellIndex) => (
                  <td
                    key={`c-${rowIndex}-${cellIndex}`}
                    style={{
                      padding: "10px 12px",
                      borderRight:
                        cellIndex < header.length - 1
                          ? "1px solid #e5e7eb"
                          : "none",
                      borderBottom:
                        rowIndex < body.length - 1
                          ? "1px solid #e5e7eb"
                          : "none",
                      textAlign: "center",
                      verticalAlign: "middle",
                      whiteSpace: "pre-wrap",
                      color: "#1f2937",
                    }}
                  >
                    {String(row[cellIndex] ?? "")
  .split("<br>")
  .map((part, i) => (
    <React.Fragment key={i}>
      {i > 0 && <br />}
      {part}
    </React.Fragment>
  ))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

function EquationMath({
  latex,
}: {
  latex: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    let attempts = 0;

    const renderEquation = () => {
      if (cancelled || !ref.current) return;

      const katexRender = window.katex?.render;

      if (typeof katexRender === "function") {
        katexRender(latex, ref.current, {
          displayMode: true,
          throwOnError: false,
        });
        return;
      }

      // KaTeX 스크립트가 아직 준비되지 않았다면 잠깐 재시도한다.
      attempts += 1;
      if (attempts <= 20) {
        window.setTimeout(renderEquation, 100);
      }
    };

    renderEquation();

    return () => {
      cancelled = true;
    };
  }, [latex]);

  return (
    <div
      ref={ref}
      style={{
        minHeight: 28,
        overflowX: "auto",
      }}
    >
      {latex}
    </div>
  );
}

function renderRichText(
  s: string,
  onWorkbookLinkClick?: (href: string) => void,
  onEquationClick?: (equationId: string) => void,
) {
  const nodes: React.ReactNode[] = [];

  // 지원 문법:
  // [[image:/images/ch16/figure16_1.png]]
  // [[image:/images/ch16/figure16_1.png|그림 16.1 설명]]
  // [[image:/images/ch16/figure16_1.png|그림 16.1 설명|70]]
  //   - 마지막 숫자는 이미지 너비(%). 예: 50, 70, 100
  //   - 480px처럼 px 단위도 사용할 수 있음.
  //
  // [[link:/workbook/ch2?p=2-1A1|수치적분(2장 문제 1.A1 참고)]]
  // [[equation:15.3]]
  //
  // [[table:
  // caption:표 2.1 문제 2.B4의 Python 스크립트 변수와 대응 수식
  // 변수 | 수식
  // ft | $f(t)$
  // snt | $s_5(t)=\sin(2\pi \times 5f_1t)$
  // ]]

  const tokenRegex =
    /\[\[table:\s*([\s\S]*?)\]\]|\[\[(image|link|equation):([^|\]]+?)(?:\|([^|\]]*))?(?:\|([^\]]+))?\]\]/g;

  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = tokenRegex.exec(s)) !== null) {
    const before = s.slice(last, match.index);

    if (before) {
      nodes.push(
        <React.Fragment key={`rich-text-${key++}`}>
          {renderFencedText(before)}
        </React.Fragment>,
      );
    }

    const tableRaw = match[1];

    if (tableRaw != null) {
      nodes.push(
        renderWorkbookTable(
          tableRaw,
          `rich-table-${key++}`,
        ),
      );

      last = match.index + match[0].length;
      continue;
    }

    const type = String(match[2] ?? "").trim();
    const target = String(match[3] ?? "").trim();
    const label = String(match[4] ?? "").trim();
    const option = String(match[5] ?? "").trim();

    if (type === "image") {
      let imageWidth: string | undefined;

      // [[image:path|caption|70]] -> 70%
      // [[image:path|caption|70%]] -> 70%
      // [[image:path|caption|480px]] -> 480px
      if (/^\d+(?:\.\d+)?$/.test(option)) {
        const percent = Math.max(1, Math.min(100, Number(option)));
        imageWidth = `${percent}%`;
      } else if (/^\d+(?:\.\d+)?%$/.test(option)) {
        const percent = Math.max(
          1,
          Math.min(100, Number(option.slice(0, -1))),
        );
        imageWidth = `${percent}%`;
      } else if (/^\d+(?:\.\d+)?px$/.test(option)) {
        imageWidth = option;
      }

      nodes.push(
        <figure
          key={`rich-image-${key++}`}
          style={{
            margin: "22px 0",
            textAlign: "center",
          }}
        >
          <img
            src={target}
            alt={label || "문제 그림"}
            style={{
              display: "block",
              width: imageWidth ?? "auto",
              maxWidth: "100%",
              height: "auto",
              margin: "0 auto",
              borderRadius: 6,
            }}
          />

          {label && (
            <figcaption
              style={{
                marginTop: 10,
                fontSize: 13,
                lineHeight: 1.5,
                color: "#6b7280",
              }}
            >
              {label}
            </figcaption>
          )}
        </figure>,
      );
    }

    if (type === "equation") {
      nodes.push(
        <button
          key={`rich-equation-${key++}`}
          type="button"
          onClick={() => onEquationClick?.(target)}
          style={{
            display: "inline",
            padding: 0,
            border: 0,
            background: "transparent",
            color: "#4f46e5",
            font: "inherit",
            fontWeight: 800,
            textDecoration: "underline",
            textUnderlineOffset: 3,
            cursor: onEquationClick ? "pointer" : "default",
          }}
          title={`${target} 수식 보기`}
        >
          {label || `(식 ${target})`}
        </button>,
      );
    }

    if (type === "link") {
      const isWorkbookInternalLink =
        target.startsWith("/workbook/") ||
        target.startsWith("?p=");

      nodes.push(
        <a
          key={`rich-link-${key++}`}
          href={target}
          onClick={
            isWorkbookInternalLink && onWorkbookLinkClick
              ? (event) => {
                  event.preventDefault();
                  onWorkbookLinkClick(target);
                }
              : undefined
          }
          style={{
            color: "#4f46e5",
            fontWeight: 700,
            textDecoration: "underline",
            textUnderlineOffset: 3,
            cursor: "pointer",
          }}
        >
          {label || target}
        </a>,
      );
    }

    last = match.index + match[0].length;
  }

  const tail = s.slice(last);

  if (tail) {
    nodes.push(
      <React.Fragment key={`rich-text-${key++}`}>
        {renderFencedText(tail)}
      </React.Fragment>,
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
  const draftStorageKey = `workbook-draft::${chapterSlug}`;
  const bookmarkStorageKey = `workbook-bookmarks::${chapterSlug}`;
  const chapterPath = `/workbook/${chapterSlug}`;
  const workbookReturnStorageKey = "workbook::return-target";

  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [studentClassId, setStudentClassId] = useState<string | null>(null);
  const [chapterDeadline, setChapterDeadline] = useState<string | null>(null);
  const [deadlineLoading, setDeadlineLoading] = useState(false);
  const [deadlineNow, setDeadlineNow] = useState(() => Date.now());
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [authPromptAction, setAuthPromptAction] = useState("");
  const [workbookTutorialOpen, setWorkbookTutorialOpen] = useState(false);
  // 전체화면 집중 학습은 로그인한 student 역할에만 적용한다.
  // 반드시 이를 참조하는 useEffect보다 먼저 선언해야 한다.
  const roleReady =
    isAuthenticated !== true ||
    userRole !== null;
  
  const isStudent =
    isAuthenticated === false && //전체화면 임시 해제
    userRole === "student";
    
  const [focusModeStarted, setFocusModeStarted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isBrowserFullscreen, setIsBrowserFullscreen] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const [windowBlurred, setWindowBlurred] = useState(false);
  const [fullscreenError, setFullscreenError] = useState("");

  const [idx, setIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [equationModalId, setEquationModalId] = useState<string | null>(null);
  const [showEquationLibrary, setShowEquationLibrary] = useState(false);

  // 참고 링크를 통해 다른 문제로 이동했을 때
  // 학생이 "원래 문제로 돌아가기" 버튼으로 쉽게 복귀할 수 있도록 한다.
  const [returnProblemId, setReturnProblemId] = useState<string | null>(null);
  const [returnProblemTitle, setReturnProblemTitle] = useState<string | null>(null);

  // 다른 Chapter의 참고 링크를 통해 들어온 경우,
  // sessionStorage에 저장된 출발 문제 정보를 읽어 복귀 버튼을 복원한다.
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const raw = window.sessionStorage.getItem(workbookReturnStorageKey);
      if (!raw) return;

      const parsed = JSON.parse(raw);
      const href =
        typeof parsed?.href === "string" ? parsed.href : "";
      const title =
        typeof parsed?.title === "string" ? parsed.title : "";

      if (!href) return;

      const currentHref =
        `${window.location.pathname}${window.location.search}`;

      // 이미 원래 문제로 돌아온 뒤라면 남아 있는 return target을 제거한다.
      if (currentHref === href) {
        window.sessionStorage.removeItem(workbookReturnStorageKey);
        setReturnProblemId(null);
        setReturnProblemTitle(null);
        return;
      }

      setReturnProblemId(href);
      setReturnProblemTitle(title || null);
    } catch {
      // 잘못된 sessionStorage 값은 무시한다.
    }
  }, [chapterSlug, workbookReturnStorageKey]);

  const [userAnswer, setUserAnswer] = useState("");
  const [importSourceId, setImportSourceId] = useState("");
  const [importNotice, setImportNotice] = useState("");
  const [importingAnswer, setImportingAnswer] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveNotice, setSaveNotice] = useState("");
  const [autoSaveNotice, setAutoSaveNotice] = useState("");
  type ProblemProgressStatus = "unattempted" | "saved" | "passed";

  const [problemProgressById, setProblemProgressById] = useState<
    Record<string, ProblemProgressStatus>
  >({});

  const [bookmarkedProblemIds, setBookmarkedProblemIds] = useState<
    Record<string, boolean>
  >({});

  // 현재 문제에서 마지막으로 저장/불러온 답안을 기준으로 변경 여부를 판단한다.
  const savedAnswerRef = useRef<{
    problemId: string | null;
    answer: string;
  }>({
    problemId: null,
    answer: "",
  });

  // 저장되지 않은 답안이 있는 상태에서 문제 이동을 요청한 경우 사용한다.
  const [pendingMoveIdx, setPendingMoveIdx] = useState<number | null>(null);
  const [savingBeforeMove, setSavingBeforeMove] = useState(false);

  const [plotImage, setPlotImage] = useState<string | null>(null);
  const [audioSource, setAudioSource] = useState<string | null>(null);

  // ✅ AI 채점 결과
  const [grading, setGrading] = useState(false);

  type GradeResult = {
    score?: number;
    feedback?: string;
    error?: string;
  };

  const [gradeResult, setGradeResult] = useState<GradeResult | null>(null);

  // 문제를 이동했다가 다시 돌아왔을 때 이미 확인한 채점 결과를 즉시 복원한다.
  // DB에서 다시 불러오기 전에도 같은 세션 안에서는 점수/피드백이 사라지지 않는다.
  const gradeResultByProblemRef = useRef<Record<string, GradeResult | null>>({});

  const [runningCode, setRunningCode] = useState(false);

  const [codeOutput, setCodeOutput] = useState<string | null>(null);

  const [pyReady, setPyReady] = useState(false);

  // 현재 Chapter의 WorkbookPage가 열려 있는 동안 Pyodide 작업공간에
  // 가져온 실습 파일 목록을 유지한다.
  // 문제 이동은 같은 WorkbookPage 인스턴스 안에서 처리되므로
  // 2.A4에서 가져온 파일을 2.A5, 2.B 등에서도 그대로 사용할 수 있다.
  const [workspaceFiles, setWorkspaceFiles] = useState<
    Array<{ name: string; size: number }>
  >([]);
  const [workspaceFileNotice, setWorkspaceFileNotice] = useState("");
  const [importingWorkspaceFile, setImportingWorkspaceFile] = useState(false);

  const pyodideRef = useRef<any>(null);

  // Pyodide 초기화가 중복 실행되지 않도록 Promise를 공유한다.
  // 초기화 실패 시 null로 되돌려 이후 재시도가 가능하도록 한다.
  const pyodideInitPromiseRef = useRef<Promise<any> | null>(null);

  // Sound/File/Spectrum helper도 최초 필요 시점에 한 번만 설치한다.
  const workbookHelpersPromiseRef = useRef<Promise<void> | null>(null);
  const workbookHelpersReadyRef = useRef(false);

  const [pyodide, setPyodide] = useState<any>(null);

  const promptRef = useRef<HTMLDivElement | null>(null);

  const answerRef = useRef<HTMLDivElement | null>(null);
  const equationModalRef = useRef<HTMLDivElement | null>(null);
  const equationLibraryRef = useRef<HTMLDivElement | null>(null);

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

  const chapterEquations = useMemo(() => {
    const equations: ChapterEquation[] = [];
    const seen = new Set<string>();

    for (const sec of data.sections ?? []) {
      for (const pb of sec.problems ?? []) {
        const prompt = String(pb.prompt ?? "");
        const mathBlocks = Array.from(
          prompt.matchAll(/\$\$([\s\S]*?)\$\$/g),
        );

        for (let blockIndex = 0; blockIndex < mathBlocks.length; blockIndex += 1) {
          const match = mathBlocks[blockIndex];
          const rawLatex = String(match[1] ?? "");
          const labelMatch = rawLatex.match(
            /\\text\{\(식\s+([0-9]+\.[0-9]+)\)\}/,
          );

          if (!labelMatch) continue;

          const equationId = labelMatch[1];
          if (seen.has(equationId)) continue;

          let latex = rawLatex
            .replace(
              /\\qquad\s*\\text\{\(식\s+[0-9]+\.[0-9]+\)\}/g,
              "",
            )
            .replace(
              /\\text\{\(식\s+[0-9]+\.[0-9]+\)\}/g,
              "",
            )
            .trim();

          // 식이 두 개의 연속된 display-math 블록으로 나뉘고,
          // 번호가 붙은 두 번째 블록이 "="로 시작하면 앞 블록도 함께 보여준다.
          if (
            /^=/.test(latex) &&
            blockIndex > 0
          ) {
            const previous = mathBlocks[blockIndex - 1];
            const previousEnd =
              (previous.index ?? 0) + previous[0].length;
            const currentStart = match.index ?? 0;
            const between = prompt.slice(previousEnd, currentStart);

            if (between.trim() === "") {
              const previousLatex = String(previous[1] ?? "").trim();
              if (previousLatex) {
                latex = `${previousLatex}\n${latex}`;
              }
            }
          }

          seen.add(equationId);
          equations.push({
            id: equationId,
            latex,
            problemId: pb.id,
            problemTitle: pb.title,
          });
        }
      }
    }

    return equations.sort((a, b) => {
      const [aChapter, aNumber] = a.id.split(".").map(Number);
      const [bChapter, bNumber] = b.id.split(".").map(Number);
      return aChapter - bChapter || aNumber - bNumber;
    });
  }, [data.sections]);

  const equationById = useMemo(
    () =>
      Object.fromEntries(
        chapterEquations.map((equation) => [equation.id, equation]),
      ) as Record<string, ChapterEquation>,
    [chapterEquations],
  );

  const activeEquation =
    equationModalId != null
      ? equationById[equationModalId] ?? null
      : null;

  function equationSourceIndex(equation: ChapterEquation) {
    const directIndex = idToIndex[equation.problemId];
    if (directIndex != null) return directIndex;

    const childIndex = flat.findIndex(
      (item) => item.preface?.id === equation.problemId,
    );

    return childIndex >= 0 ? childIndex : null;
  }

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(bookmarkStorageKey);
      const parsed = raw ? JSON.parse(raw) : {};

      if (parsed && typeof parsed === "object") {
        setBookmarkedProblemIds(parsed);
      } else {
        setBookmarkedProblemIds({});
      }
    } catch {
      setBookmarkedProblemIds({});
    }
  }, [bookmarkStorageKey]);

  function toggleBookmark(problemId: string) {
    setBookmarkedProblemIds((previous) => {
      const next = {
        ...previous,
        [problemId]: !previous[problemId],
      };

      if (!next[problemId]) {
        delete next[problemId];
      }

      try {
        window.localStorage.setItem(
          bookmarkStorageKey,
          JSON.stringify(next),
        );
      } catch {
        // localStorage 저장 실패 시 현재 세션의 UI 상태는 유지한다.
      }

      return next;
    });
  }

  // 워크북 내부 영역만 스크롤하고, 바깥 문서가 뒤로 밀려 나타나는 현상을 방지한다.
  // 다른 페이지로 이동하면 원래 문서 스크롤 설정을 복원한다.
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousHtmlOverscroll = html.style.overscrollBehavior;
    const previousBodyOverscroll = body.style.overscrollBehavior;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    body.style.overscrollBehavior = "none";

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      html.style.overscrollBehavior = previousHtmlOverscroll;
      body.style.overscrollBehavior = previousBodyOverscroll;
    };
  }, []);

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
        setUserName("");
        setStudentNumber("");
        setStudentClassId(null);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role, name, student_number, class_id")
        .eq("id", user.id)
        .maybeSingle();

      if (!mounted) return;
      setUserRole(profile?.role ?? null);
      setUserName(profile?.name ?? "");
      setStudentNumber(profile?.student_number ?? "");
      setStudentClassId(profile?.class_id ?? null);
    }

    void syncAuthState();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;

      const user = session?.user ?? null;
      setIsAuthenticated(Boolean(user));

      if (!user) {
        setUserRole(null);
        setUserName("");
        setStudentNumber("");
        setStudentClassId(null);
        return;
      }

      void supabase
        .from("profiles")
        .select("role, name, student_number, class_id")
        .eq("id", user.id)
        .maybeSingle()
        .then(({ data: profile }) => {
          if (!mounted) return;
          setUserRole(profile?.role ?? null);
          setUserName(profile?.name ?? "");
          setStudentNumber(profile?.student_number ?? "");
          setStudentClassId(profile?.class_id ?? null);
        });
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  // 학생에게 배정된 분반의 현재 Chapter 마감기한을 조회한다.
  // 실제 저장 차단은 Supabase DB trigger에서 한 번 더 검사한다.
  useEffect(() => {
    if (!isStudent || !studentClassId) {
      setChapterDeadline(null);
      setDeadlineLoading(false);
      return;
    }

    let cancelled = false;

    async function loadChapterDeadline() {
      setDeadlineLoading(true);
      const { data, error } = await supabase
        .from("assignment_deadlines")
        .select("deadline")
        .eq("chapter_id", chapterSlug)
        .eq("class_id", studentClassId)
        .maybeSingle();

      if (cancelled) return;

      if (error) {
        console.error("Chapter 마감기한 조회 실패:", error.message);
        setChapterDeadline(null);
      } else {
        setChapterDeadline(data?.deadline ?? null);
      }
      setDeadlineLoading(false);
    }

    void loadChapterDeadline();
    return () => { cancelled = true; };
  }, [chapterSlug, isStudent, studentClassId, supabase]);

  useEffect(() => {
    const timer = window.setInterval(() => setDeadlineNow(Date.now()), 30000);
    return () => window.clearInterval(timer);
  }, []);

  // 좌측 목차에 문제별 학습 상태를 표시하기 위해
  // 현재 Chapter의 저장/채점 기록을 한 번에 불러온다.
  //
  // ✓ 초록색: 채점 결과 80점 이상
  // △ 노란색: 저장했지만 미채점, 또는 채점 결과 80점 미만
  // ○ 회색: 저장/채점 기록 없음
  //
  // 비회원은 localStorage의 임시 저장 여부까지만 확인할 수 있으므로
  // 저장된 문제는 △ 상태로 표시한다.
  useEffect(() => {
    if (isAuthenticated === null) return;

    let cancelled = false;

    function getLocalProgress() {
      const progress: Record<string, ProblemProgressStatus> = {};

      try {
        const raw = window.localStorage.getItem(storageKey);
        const parsed = raw ? JSON.parse(raw) : {};

        if (parsed && typeof parsed === "object") {
          for (const problemId of Object.keys(parsed)) {
            progress[problemId] = "saved";
          }
        }
      } catch {
        // localStorage를 읽을 수 없어도 DB 기록 확인은 계속한다.
      }

      return progress;
    }

    async function syncProblemProgress() {
      const next = getLocalProgress();

      if (isAuthenticated) {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const { data: rows, error } = await supabase
            .from("answers")
            .select("problem_id, score")
            .eq("user_id", user.id)
            .eq("chapter_id", chapterSlug);

          if (!error) {
            for (const row of rows ?? []) {
              if (!row?.problem_id) continue;

              const problemId = String(row.problem_id);
              const score =
                typeof row.score === "number"
                  ? row.score
                  : null;

              next[problemId] =
                score != null && score >= ANSWER_UNLOCK_SCORE
                  ? "passed"
                  : "saved";
            }
          } else {
            console.error("목차 학습 상태 불러오기 실패:", error.message);
          }
        }
      }

      if (!cancelled) {
        setProblemProgressById(next);
      }
    }

    void syncProblemProgress();

    return () => {
      cancelled = true;
    };
  }, [chapterSlug, isAuthenticated, storageKey, supabase]);

  function setProblemProgress(
    problemId: string,
    status: ProblemProgressStatus,
  ) {
    setProblemProgressById((previous) => ({
      ...previous,
      [problemId]: status,
    }));
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.assign("/");
  }

  function requestAuthenticatedAction(actionLabel: string, action: () => void) {
    if (isAuthenticated) {
      action();
      return;
    }

    setAuthPromptAction(actionLabel);
    setShowAuthPrompt(true);
  }


  useEffect(() => {
    const syncFullscreen = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    const syncBrowserFullscreen = () => {
      // F11 브라우저 전체화면은 Fullscreen API에 잡히지 않기 때문에
      // viewport와 screen 크기가 거의 같은지 비교해 전체화면 상태를 추정한다.
      // 브라우저/OS별 1~수 px 차이를 고려해 12px 허용 오차를 둔다.
      const widthDiff = Math.abs(window.innerWidth - window.screen.width);
      const heightDiff = Math.abs(window.innerHeight - window.screen.height);

      setIsBrowserFullscreen(widthDiff <= 12 && heightDiff <= 12);
    };

    const syncVisibility = () => {
      setPageHidden(document.hidden);
    };

    const handleBlur = () => {
      setWindowBlurred(true);
    };

    const handleFocus = () => {
      setWindowBlurred(false);
      syncBrowserFullscreen();
    };

    syncFullscreen();
    syncBrowserFullscreen();
    syncVisibility();

    document.addEventListener("fullscreenchange", syncFullscreen);
    document.addEventListener("visibilitychange", syncVisibility);
    window.addEventListener("resize", syncBrowserFullscreen);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("fullscreenchange", syncFullscreen);
      document.removeEventListener("visibilitychange", syncVisibility);
      window.removeEventListener("resize", syncBrowserFullscreen);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  useEffect(() => {
    // 학생 계정에서 최초 가림막 상태로 F11을 눌러 전체화면에 진입하면
    // 집중 학습 모드를 시작한 것으로 처리한다.
    if (
      userRole === "student" &&
      !focusModeStarted &&
      isBrowserFullscreen
    ) {
      setFocusModeStarted(true);
      setWindowBlurred(false);
      setPageHidden(false);
      setFullscreenError("");
    }
  }, [userRole, focusModeStarted, isBrowserFullscreen]);

  useEffect(() => {
    // 학생 이외의 역할에서는 집중 학습 강제를 사용하지 않는다.
    if (roleReady && !isStudent && focusModeStarted) {
      setFocusModeStarted(false);
    }
  }, [roleReady, isStudent, focusModeStarted]);

  async function enterFocusMode() {
    setFullscreenError("");

    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }

      setFocusModeStarted(true);
      setWindowBlurred(false);
      setPageHidden(false);
    } catch (error: any) {
      setFullscreenError(
        error?.message ??
          "전체화면으로 전환하지 못했습니다. 브라우저 설정을 확인해 주세요.",
      );
    }
  }

  async function exitFocusMode() {
    setFocusModeStarted(false);
    setFullscreenError("");

    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch {
        // ignore
      }
    }
  }

  const fullscreenAccepted =
    isFullscreen || isBrowserFullscreen;

  const focusModeBlocked =
    isStudent &&
    focusModeStarted &&
    (!fullscreenAccepted || pageHidden || windowBlurred);

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
      setAudioSource(null);
      setSaved(false);

      const state =
        window.history.state && typeof window.history.state === "object"
          ? window.history.state
          : {};

      if (typeof state.workbookReturnProblemId === "string") {
        setReturnProblemId(
          `${chapterPath}?p=${encodeURIComponent(
            state.workbookReturnProblemId,
          )}`,
        );
        setReturnProblemTitle(
          typeof state.workbookReturnProblemTitle === "string"
            ? state.workbookReturnProblemTitle
            : null,
        );
      }
    }
  }, [idToIndex]);

  // 브라우저 뒤로가기/앞으로가기로 ?p=문제ID가 바뀌면
  // URL만 바꾸는 것이 아니라 Workbook의 현재 문제 상태(idx)도 함께 복원한다.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const problemId = params.get("p");

      if (!problemId) return;

      const targetIdx = idToIndex[problemId];
      if (targetIdx == null) return;

      const target = flat[targetIdx];
      if (!target) return;

      setIdx(targetIdx);
      resetProblemViewState(target.pb.id);

      const state =
        window.history.state && typeof window.history.state === "object"
          ? window.history.state
          : {};

      if (typeof state.workbookReturnProblemId === "string") {
        setReturnProblemId(
          `${chapterPath}?p=${encodeURIComponent(
            state.workbookReturnProblemId,
          )}`,
        );
        setReturnProblemTitle(
          typeof state.workbookReturnProblemTitle === "string"
            ? state.workbookReturnProblemTitle
            : null,
        );
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [idToIndex, flat]);

  const current = flat[idx];
  const earlierPythonProblems = flat.slice(0, idx).filter(
    (item) => resolveProblemType(item.pb) === "python",
  );
  const selectedImportId = earlierPythonProblems.some(
    (item) => item.pb.id === importSourceId,
  )
    ? importSourceId
    : (earlierPythonProblems[earlierPythonProblems.length - 1]?.pb.id ?? "");

  async function importEarlierPythonCode() {
    if (!current || !selectedImportId || importingAnswer) return;
    const source = earlierPythonProblems.find(
      (item) => item.pb.id === selectedImportId,
    );
    if (!source) return;
    if (!window.confirm(`${source.pb.title}의 저장된 코드를 현재 편집기로 가져올까요?\n현재 작성 중인 코드는 교체되며, 서술형 답안은 유지됩니다.`)) return;

    setImportingAnswer(true);
    setImportNotice("");
    try {
      let sourceAnswer = "";
      // 자동 저장된 미제출 초안이 있다면 그 코드를 가장 먼저 사용한다.
      const draft = readAutoSavedDraft(source.pb.id);
      if (draft?.answer) sourceAnswer = draft.answer;

      if (!sourceAnswer && isAuthenticated) {
        const remote = await loadAnswer({
          chapterId: chapterSlug,
          problemId: source.pb.id,
        });
        if (remote.success && remote.answer?.answer) {
          sourceAnswer = remote.answer.answer;
        }
      }

      if (!sourceAnswer) {
        const local = window.localStorage.getItem(storageKey);
        const saved = local ? JSON.parse(local) : {};
        sourceAnswer = typeof saved?.[source.pb.id] === "string"
          ? saved[source.pb.id] : "";
      }
      if (!sourceAnswer) {
        setImportNotice("선택한 문제에 저장된 코드가 없습니다.");
        return;
      }

      const importedCode = isPythonConsoleProblem(source.pb)
        ? parsePythonConsoleAnswer(sourceAnswer).code
        : pythonAnswerToCode(sourceAnswer);
      if (!importedCode.trim()) {
        setImportNotice("선택한 문제에 작성된 Python 코드가 없습니다.");
        return;
      }

      if (isPythonConsoleProblem(current.pb)) {
        const existing = parsePythonConsoleAnswer(userAnswer);
        setUserAnswer(JSON.stringify({ ...existing, code: importedCode }));
      } else if (current.pb.type === "python" && current.pb.responseEnabled) {
        setUserAnswer(serializePythonAnswer(
          importedCode, pythonAnswerToResponse(userAnswer),
        ));
      } else {
        setUserAnswer(importedCode);
      }
      setImportNotice(`${source.pb.title}의 Python 코드를 가져왔습니다. 저장하려면 저장 버튼을 누르세요.`);
    } catch (error) {
      console.error("이전 Python 코드 가져오기 실패:", error);
      setImportNotice("코드를 가져오지 못했습니다. 다시 시도해 주세요.");
    } finally {
      setImportingAnswer(false);
    }
  }


  function resetProblemViewState(targetProblemId: string) {
    setShowAnswer(false);
    setGradeResult(
      gradeResultByProblemRef.current[targetProblemId] ?? null,
    );
    setCodeOutput(null);
    setPlotImage(null);
    setAudioSource(null);
    setSaved(false);
    setSaveNotice("");
    setImportNotice("");

    // 새 문제 답안이 restore되기 전에는 이전 문제의 저장 기준을 사용하지 않는다.
    savedAnswerRef.current = {
      problemId: null,
      answer: "",
    };
  }

  function problemIndexFromHref(href: string) {
    if (typeof window === "undefined") return null;

    try {
      const url = new URL(href, window.location.href);

      // 같은 Workbook chapter 안의 deep link만 현재 페이지 상태로 처리한다.
      if (url.pathname !== chapterPath) {
        return null;
      }

      const problemId = url.searchParams.get("p");
      if (!problemId) return null;

      const targetIdx = idToIndex[problemId];
      return targetIdx != null ? targetIdx : null;
    } catch {
      return null;
    }
  }

  async function moveToWorkbookLink(href: string) {
    const targetIdx = problemIndexFromHref(href);

    if (targetIdx == null) {
      if (typeof window !== "undefined") {
        try {
          window.sessionStorage.setItem(
            workbookReturnStorageKey,
            JSON.stringify({
              href:
                `${chapterPath}?p=${encodeURIComponent(current.pb.id)}`,
              title: current.pb.title,
            }),
          );
        } catch {
          // sessionStorage를 사용할 수 없어도 링크 이동 자체는 계속한다.
        }
      }

      try {
        const targetUrl = new URL(href, window.location.href);
        router.push(`${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`);
      } catch {
        router.push(href);
      }
      return;
    }

    if (targetIdx === idx) return;

    if (hasUnsavedAnswer()) {
      // 현재 저장 경고 모달은 일반 문제 이동용이므로,
      // 내부 참고 링크 클릭도 동일하게 보호한다.
      setPendingMoveIdx(targetIdx);
      return;
    }

    const target = flat[targetIdx];
    if (!target) return;

    setIdx(targetIdx);
    resetProblemViewState(target.pb.id);

    if (typeof window !== "undefined") {
      const nextUrl =
        `${chapterPath}?p=${encodeURIComponent(target.pb.id)}`;

      const previousState =
        window.history.state && typeof window.history.state === "object"
          ? window.history.state
          : {};

      // 참고 링크 이동은 출발 문제 정보를 history state에 함께 기록한다.
      // 브라우저 뒤로가기뿐 아니라 화면의 "원래 문제로 돌아가기" 버튼에서도 사용한다.
      window.history.pushState(
        {
          ...previousState,
          workbookReturnProblemId: current.pb.id,
          workbookReturnProblemTitle: current.pb.title,
        },
        "",
        nextUrl,
      );

      setReturnProblemId(
        `${chapterPath}?p=${encodeURIComponent(current.pb.id)}`,
      );
      setReturnProblemTitle(current.pb.title);
    }

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

  function renderSidebarProblemLabel(
    pb: WorkbookProblem,
    active: boolean,
    prefix = "",
  ) {
    const status = problemProgressById[pb.id] ?? "unattempted";

    const marker =
      status === "passed"
        ? "✓"
        : status === "saved"
          ? "△"
          : "○";

    const label =
      status === "passed"
        ? `채점 결과 ${ANSWER_UNLOCK_SCORE}점 이상`
        : status === "saved"
          ? "저장됨 · 미채점 또는 80점 미만"
          : "미풀이";

    const markerColor = active
      ? "#ffffff"
      : status === "passed"
        ? "#16a34a"
        : status === "saved"
          ? "#d97706"
          : "#cbd5e1";

    return (
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          width: "100%",
        }}
      >
        <span>
          {prefix}
          {pb.title}
          {bookmarkedProblemIds[pb.id] && (
            <span
              aria-label="북마크됨"
              title="북마크됨"
              style={{
                marginLeft: 6,
                color: active ? "#ffffff" : "#f59e0b",
                fontWeight: 900,
              }}
            >
              ★
            </span>
          )}
        </span>
        <span
          aria-label={label}
          title={label}
          style={{
            flexShrink: 0,
            fontWeight: 900,
            color: markerColor,
          }}
        >
          {marker}
        </span>
      </span>
    );
  }

  function readAutoSavedDraft(problemId: string) {
    try {
      const raw = window.localStorage.getItem(draftStorageKey);
      const parsed = raw ? JSON.parse(raw) : {};
      const draft = parsed?.[problemId];

      if (draft && typeof draft.answer === "string") {
        return {
          answer: draft.answer,
          updatedAt:
            typeof draft.updatedAt === "string"
              ? draft.updatedAt
              : "",
        };
      }
    } catch {
      // 자동 저장 임시 답안을 읽지 못해도 일반 답안 복원은 계속한다.
    }

    return null;
  }

  function clearAutoSavedDraft(problemId: string) {
    try {
      const raw = window.localStorage.getItem(draftStorageKey);
      const parsed = raw ? JSON.parse(raw) : {};

      if (!parsed || typeof parsed !== "object") return;

      delete parsed[problemId];

      if (Object.keys(parsed).length === 0) {
        window.localStorage.removeItem(draftStorageKey);
      } else {
        window.localStorage.setItem(
          draftStorageKey,
          JSON.stringify(parsed),
        );
      }
    } catch {
      // 임시 답안 정리 실패는 실제 저장 성공 여부와 무관하므로 무시한다.
    }
  }

  // 저장 답안 로드
  // 로그인 상태에서는 Supabase를 먼저 확인하고,
  // 저장된 DB 답안이 없으면 localStorage → starter code 순서로 fallback한다.
  // 단, 이 브라우저에 자동 저장된 임시 답안이 있으면 그 내용을 우선 화면에 복원한다.
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
              ? (
                  current.pb.type === "python" &&
                  current.pb.responseEnabled === true
                    ? remote.answer.answer ?? ""
                    : pythonAnswerToCode(remote.answer.answer ?? "")
                )
              : remote.answer.answer ?? "";

          const draft = readAutoSavedDraft(current.pb.id);
          const visibleAnswer = draft?.answer ?? restoredAnswer;

          setUserAnswer(visibleAnswer);
          savedAnswerRef.current = {
            problemId: current.pb.id,
            answer: restoredAnswer,
          };
          setAutoSaveNotice(
            draft && draft.answer !== restoredAnswer
              ? "이 브라우저에 자동 저장된 임시 답안을 복원했습니다."
              : "",
          );
          setCodeOutput(remote.answer.execution_output ?? null);

          if (
            typeof remote.answer.score === "number" ||
            remote.answer.feedback
          ) {
            const restoredGradeResult: GradeResult = {
              score:
                typeof remote.answer.score === "number"
                  ? remote.answer.score
                  : undefined,
              feedback: remote.answer.feedback ?? undefined,
            };

            gradeResultByProblemRef.current[current.pb.id] =
              restoredGradeResult;
            setGradeResult(restoredGradeResult);
          } else {
            gradeResultByProblemRef.current[current.pb.id] = null;
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
          const restoredValue =
            typeof v === "string" ? v : JSON.stringify(v ?? "");

          const draft = readAutoSavedDraft(current.pb.id);
          const visibleAnswer = draft?.answer ?? restoredValue;

          setUserAnswer(visibleAnswer);
          savedAnswerRef.current = {
            problemId: current.pb.id,
            answer: restoredValue,
          };
          setAutoSaveNotice(
            draft && draft.answer !== restoredValue
              ? "이 브라우저에 자동 저장된 임시 답안을 복원했습니다."
              : "",
          );
          setGradeResult(
            gradeResultByProblemRef.current[current.pb.id] ?? null,
          );
          setCodeOutput(null);
          setSaved(false);
        }
      } catch {
        if (!cancelled) {
          const draft = readAutoSavedDraft(current.pb.id);
          const visibleAnswer = draft?.answer ?? fallback;

          setUserAnswer(visibleAnswer);
          savedAnswerRef.current = {
            problemId: current.pb.id,
            answer: fallback,
          };
          setAutoSaveNotice(
            draft && draft.answer !== fallback
              ? "이 브라우저에 자동 저장된 임시 답안을 복원했습니다."
              : "",
          );
          setGradeResult(
            gradeResultByProblemRef.current[current.pb.id] ?? null,
          );
          setCodeOutput(null);
          setSaved(false);
        }
      }
    }

    restoreAnswer();

    return () => {
      cancelled = true;
    };
  }, [chapterSlug, current?.pb?.id, isAuthenticated]);

  // 실제 저장본과 다른 답안이 2.5초 동안 더 수정되지 않으면
  // localStorage의 별도 "임시 답안" 영역에 자동 저장한다.
  // Supabase에는 자동 저장하지 않으므로 서버 요청은 발생하지 않는다.
  useEffect(() => {
    if (!current) return;

    const hasLoadedBaseline =
      savedAnswerRef.current.problemId === current.pb.id;

    if (!hasLoadedBaseline) return;

    const hasChanges =
      userAnswer !== savedAnswerRef.current.answer;

    if (!hasChanges) {
      setAutoSaveNotice("");
      return;
    }

    setAutoSaveNotice("자동 저장 대기 중...");

    const timer = window.setTimeout(() => {
      try {
        const raw = window.localStorage.getItem(draftStorageKey);
        const parsed = raw ? JSON.parse(raw) : {};
        const next =
          parsed && typeof parsed === "object"
            ? parsed
            : {};

        next[current.pb.id] = {
          answer: userAnswer,
          updatedAt: new Date().toISOString(),
        };

        window.localStorage.setItem(
          draftStorageKey,
          JSON.stringify(next),
        );

        setAutoSaveNotice("자동 저장됨");
      } catch {
        setAutoSaveNotice("자동 저장 실패");
      }
    }, 2500);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    current?.pb?.id,
    draftStorageKey,
    userAnswer,
  ]);


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
  }, [idx, showAnswer, equationModalId, showEquationLibrary]);

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

  const deadlineTimestamp = chapterDeadline != null ? new Date(chapterDeadline).getTime() : null;
  const isDeadlinePassed =
    isStudent &&
    deadlineTimestamp != null &&
    Number.isFinite(deadlineTimestamp) &&
    deadlineNow > deadlineTimestamp;

  const formattedChapterDeadline =
    chapterDeadline != null
      ? new Intl.DateTimeFormat("ko-KR", {
          year: "numeric", month: "2-digit", day: "2-digit",
          hour: "2-digit", minute: "2-digit",
        }).format(new Date(chapterDeadline))
      : null;


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

  function hasUnsavedAnswer() {
    return (
      savedAnswerRef.current.problemId === current.pb.id &&
      userAnswer !== savedAnswerRef.current.answer
    );
  }

  async function moveToProblemDirect(targetIdx: number) {
    const safeIdx = Math.max(0, Math.min(flat.length - 1, targetIdx));
    const target = flat[safeIdx];

    if (!target) return;

    setIdx(safeIdx);
    resetProblemViewState(target.pb.id);

    // 이전/다음/목차 이동은 일반 학습 이동이므로 참고 링크 복귀 상태를 해제한다.
    setReturnProblemId(null);
    setReturnProblemTitle(null);

    // 문제 이동은 현재 WorkbookPage 내부 상태(idx)로 처리한다.
    // ?p=문제ID는 deep link 용도이므로 Next.js router navigation을 발생시키지 않고
    // 브라우저 History API로 주소만 갱신한다.
    //
    // router.replace()를 사용하면 production(Render) 환경에서 search param 변경이
    // route transition / remount로 이어질 수 있고, 그 과정에서 gradeResult가 초기화된 뒤
    // DB 복원보다 늦게 null 상태가 다시 적용되는 race condition이 생길 수 있다.
    if (typeof window !== "undefined") {
      const nextUrl =
        `${chapterPath}?p=${encodeURIComponent(target.pb.id)}`;

      window.history.replaceState(
        window.history.state,
        "",
        nextUrl,
      );
    }

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

  async function moveToProblem(targetIdx: number) {
    const safeIdx = Math.max(0, Math.min(flat.length - 1, targetIdx));

    if (safeIdx === idx) return;

    if (hasUnsavedAnswer()) {
      setPendingMoveIdx(safeIdx);
      return;
    }

    await moveToProblemDirect(safeIdx);
  }

  function returnToOriginalProblem() {
    if (!returnProblemId) return;

    if (typeof window !== "undefined") {
      try {
        window.sessionStorage.removeItem(workbookReturnStorageKey);
      } catch {
        // ignore
      }
    }

    // 같은 Chapter 참고 이동이면 history.back()으로 즉시 복귀한다.
    if (returnProblemId.startsWith(chapterPath)) {
      window.history.back();
      return;
    }

    // 다른 Chapter에서 넘어온 경우에는 저장해둔 원래 문제 URL로 이동한다.
    router.push(returnProblemId);
  }

  function buildSubmissionText() {
    if (currentProblemType === "console" && current.pb.type === "console") {
      return consoleAnswerToText(userAnswer);
    }

    if (isPythonConsoleProblem(current.pb)) {
      return pythonConsoleAnswerToText(userAnswer);
    }

    if (currentProblemType === "python") {
      const includeResponse =
        current.pb.type === "python" &&
        current.pb.responseEnabled === true;

      return pythonAnswerToText(
        userAnswer,
        codeOutput,
        includeResponse,
      );
    }

    if (currentProblemType === "graph") {
      return graphAnswerToText(userAnswer);
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
      if (
        current.pb.type === "python" &&
        current.pb.responseEnabled === true
      ) {
        return userAnswer;
      }

      return pythonAnswerToCode(userAnswer);
    }

    return userAnswer;
  }

  async function saveMyAnswer(): Promise<boolean> {
    if (isDeadlinePassed) {
      setSaveNotice("제출 기한이 종료되어 답안을 저장할 수 없습니다.");
      return false;
    }

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
      savedAnswerRef.current = {
        problemId: current.pb.id,
        answer: userAnswer,
      };
      clearAutoSavedDraft(current.pb.id);
      setAutoSaveNotice("");

      setProblemProgress(current.pb.id, "saved");
      setSaved(true);
      setSaveNotice(
        "이 브라우저에 임시 저장되었습니다. 로그인하면 학습 기록을 계정에 저장할 수 있습니다.",
      );
      window.setTimeout(() => setSaved(false), 1200);
      return true;
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

    if (!result.success) {
      if (result.reason === "deadline_passed") {
        setSaveNotice(result.message);
        setDeadlineNow(Date.now());
        return false;
      }
      if (result.reason === "database_error") {
        console.error("Supabase 답안 저장 실패:", result.message);
        setSaveNotice("답안을 저장하지 못했습니다. 잠시 후 다시 시도해주세요.");
        return false;
      }
    }

    savedAnswerRef.current = {
      problemId: current.pb.id,
      answer: userAnswer,
    };
    clearAutoSavedDraft(current.pb.id);
    setAutoSaveNotice("");

    setProblemProgress(
      current.pb.id,
      typeof gradeResult?.score === "number" &&
        gradeResult.score >= ANSWER_UNLOCK_SCORE
        ? "passed"
        : "saved",
    );
    setSaved(true);
    setSaveNotice("계정에 저장되었습니다.");
    window.setTimeout(() => setSaved(false), 1200);
    return true;
  }

  async function gradeWithAI() {
    if (isDeadlinePassed) {
      setGradeResult({ error: "제출 기한이 종료되었습니다.", feedback: "마감 이후에는 답안 채점 및 채점 결과 저장을 할 수 없습니다." });
      return;
    }

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

          // graph 문제는 실제 학생 그래프 이미지를 함께 채점기에 전달한다.
          // 일반 문제에서는 이 필드를 보내지 않는다.
          graphAnswerRaw:
            currentProblemType === "graph"
              ? userAnswer
              : undefined,
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

      const nextGradeResult: GradeResult = {
        score: normalizedScore,
        feedback,
      };

      gradeResultByProblemRef.current[current.pb.id] = nextGradeResult;
      setGradeResult(nextGradeResult);

      const saveResult = await saveAnswer({
        chapterId: chapterSlug,
        problemId: current.pb.id,
        problemTitle: current.pb.title,
        answer: buildStoredAnswerText(),
        executionOutput: codeOutput,
        score: normalizedScore,
        feedback,
      });

      if (!saveResult.success) {
        if (saveResult.reason === "deadline_passed") {
          setGradeResult({ score: normalizedScore, feedback, error: saveResult.message });
          setDeadlineNow(Date.now());
          return;
        }
        if (saveResult.reason === "database_error") {
          console.error("채점 결과 DB 저장 실패:", saveResult.message);
        }
      } else {
        // 채점 시에도 현재 답안이 DB에 함께 저장되므로 변경 상태를 해제한다.
        savedAnswerRef.current = {
          problemId: current.pb.id,
          answer: userAnswer,
        };
        clearAutoSavedDraft(current.pb.id);
        setAutoSaveNotice("");
        setProblemProgress(
          current.pb.id,
          normalizedScore >= ANSWER_UNLOCK_SCORE
            ? "passed"
            : "saved",
        );
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


  async function installWorkbookSoundHelpers(pyodide: any) {
    // Workbook 공통 파일/Sound/Spectrum helper.
    // 학생 코드는 file_load(...), sound_load(...), sound_play(...), signal_play(...), spectrum_view(...), rcosdesign(...) 등을 사용하고
    // WAV/Base64 변환 등 내부 구현은 숨긴다.
    await pyodide.loadPackage(["numpy", "scipy"]);

    await pyodide.runPythonAsync(`
from pyodide.http import pyfetch
from scipy.io import loadmat, wavfile
from scipy.signal import windows

import io
import base64
import os
import numpy as np

async def _workbook_fetch_binary(url, local_path):
    response = await pyfetch(url)

    if not response.ok:
        raise FileNotFoundError(
            f"Sound resource를 불러오지 못했습니다: {url} "
            f"(HTTP {response.status})"
        )

    payload = await response.bytes()

    with open(local_path, "wb") as f:
        f.write(payload)

    return local_path


async def file_load(path):
    """
    public/static/data 아래의 파일을 Pyodide 작업 폴더(/home/pyodide)로 복사한다.

    사용 예:
        file_load("ch2/song.mat")
        data = loadmat("song.mat")

        filename = file_load("ch2/song.mat")
        data = loadmat(filename)

    반환값:
        Pyodide 내부에서 사용할 로컬 파일명(str)
    """
    path = str(path).strip()

    if not path:
        raise ValueError("파일 경로가 비어 있습니다.")

    normalized = path.lstrip("/")

    if normalized.startswith("static/data/"):
        normalized = normalized[len("static/data/"):]

    url = f"/static/data/{normalized}"

    filename = normalized.split("/")[-1]
    if not filename:
        raise ValueError("유효한 파일명이 없습니다.")

    local_path = f"/home/pyodide/{filename}"

    await _workbook_fetch_binary(url, local_path)

    print(f"File loaded: {normalized} -> {filename}")

    return filename


def _workbook_signal_to_audio_base64(signal, fs):
    global audio_base64, has_audio

    x = np.asarray(signal, dtype=np.float64).squeeze()

    if x.ndim != 1:
        raise ValueError("재생할 신호는 1차원 배열이어야 합니다.")

    if x.size == 0:
        raise ValueError("재생할 신호가 비어 있습니다.")

    fs = int(round(float(fs)))

    if fs <= 0:
        raise ValueError("Sampling frequency는 양수여야 합니다.")

    peak = np.max(np.abs(x))

    if np.isfinite(peak) and peak > 0:
        x = x / peak

    # NaN/Inf가 들어오더라도 WAV 변환에서 깨지지 않도록 정리한다.
    x = np.nan_to_num(x, nan=0.0, posinf=1.0, neginf=-1.0)
    x = np.clip(x, -1.0, 1.0)

    x_pcm = np.int16(x * 32767)

    buffer = io.BytesIO()
    wavfile.write(buffer, fs, x_pcm)
    buffer.seek(0)

    audio_base64 = base64.b64encode(
        buffer.read()
    ).decode("utf-8")

    has_audio = True

    print(
        f"Sound ready | "
        f"fs = {fs} Hz | "
        f"duration = {float(x.size / fs):.3f} s"
    )

    return {
        "samples": int(x.size),
        "fs": fs,
        "duration": float(x.size / fs),
    }


def signal_play(signal, fs):
    """
    메모리에 있는 1차원 signal을 재생한다.

    사용 예:
        signal_play(y, fs)
    """
    return _workbook_signal_to_audio_base64(signal, fs)


def rcosdesign(r, span, L, shape="normal"):
    """MATLAB rcosdesign에 대응하는 단위 에너지 RC/SRRC FIR 펄스.

    r: roll-off factor (0~1)
    span: 심볼 단위 필터 길이 (양의 정수)
    L: 심볼당 샘플 수 (양의 정수)
    shape: "normal"(Raised Cosine) 또는 "sqrt"(Root Raised Cosine)

    반환 길이: span * L + 1 (span * L은 짝수)
    """
    r = float(r)
    if not np.isfinite(r) or not 0 <= r <= 1:
        raise ValueError("r은 0 이상 1 이하의 유한한 값이어야 합니다.")
    if (isinstance(span, (bool, np.bool_)) or
            not isinstance(span, (int, np.integer)) or span <= 0):
        raise ValueError("span은 양의 정수여야 합니다.")
    if (isinstance(L, (bool, np.bool_)) or
            not isinstance(L, (int, np.integer)) or L <= 0):
        raise ValueError("L은 양의 정수여야 합니다.")
    if span * L % 2:
        raise ValueError("span * L은 짝수여야 합니다.")
    if shape not in ("normal", "sqrt"):
        raise ValueError('shape는 "normal" 또는 "sqrt"여야 합니다.')

    t = np.arange(-span * L // 2, span * L // 2 + 1,
                  dtype=np.float64) / L

    if r == 0:
        h = np.sinc(t)
    elif shape == "normal":
        # RC(t) = sinc(t) * cos(pi*r*t) / (1 - (2*r*t)^2)
        den = 1.0 - (2.0 * r * t)**2
        singular = np.isclose(den, 0.0, atol=1e-12, rtol=0.0)
        h = np.empty_like(t)
        h[~singular] = (np.sinc(t[~singular]) *
                        np.cos(np.pi * r * t[~singular]) /
                        den[~singular])
        # t = +/-1/(2*r)의 제거 가능한 특이점
        h[singular] = (r / 2.0) * np.sin(np.pi / (2.0 * r))
    else:
        # SRRC(t) = [sin(pi*t*(1-r)) + 4*r*t*cos(pi*t*(1+r))]
        #           / [pi*t*(1-(4*r*t)^2)]
        h = np.empty_like(t)
        at_zero = np.isclose(t, 0.0, atol=1e-12, rtol=0.0)
        at_edge = np.isclose(np.abs(4.0*r*t), 1.0,
                             atol=1e-12, rtol=0.0)
        regular = ~(at_zero | at_edge)
        tr = t[regular]
        h[regular] = (
            (np.sin(np.pi*tr*(1.0-r)) +
             4.0*r*tr*np.cos(np.pi*tr*(1.0+r))) /
            (np.pi*tr*(1.0-(4.0*r*tr)**2))
        )
        h[at_zero] = 1.0 + r*(4.0/np.pi - 1.0)
        h[at_edge] = (r/np.sqrt(2.0)) * (
            (1.0+2.0/np.pi)*np.sin(np.pi/(4.0*r)) +
            (1.0-2.0/np.pi)*np.cos(np.pi/(4.0*r))
        )

    # MATLAB rcosdesign과 마찬가지로 이산 FIR 계수의 에너지를 1로 정규화
    return h / np.sqrt(np.sum(h*h))


def spectrum_view(
    signal,
    fs,
    window_length=1024,
    averages=200,
    overlap_percent=6.25,
    ymin=None,
    ymax=None,
    reference_load=1.0,
    units="dBm",
    frequency_limit_hz=None,
):
    """
    MATLAB Spectrum Analyzer와 유사한 centered Power spectrum을 표시한다.

    기본 설정:
      - Buffer / Window length: 1024 samples
      - Spectral averages: 200
      - Frequency range: [-Fs/2, Fs/2]
      - Overlap: 6.25 %
      - Type: Power
      - Units: dBm
      - Reference load: 1 ohm
      - 실수/복소수 입력 모두 지원

    Chapter 4의 기존 MATLAB Spectrum Viewer와 유사하게 보이게 하려면:
        spectrum_view(
            x,
            fs,
            units="Watts",
            frequency_limit_hz=80e3,
        )

    fs=160e3일 때:
      - 표시 범위: -80 kHz ~ +80 kHz
      - RBW ≈ 234.375 Hz (1024-point periodic Hann 기준)

    사용 예:
        spectrum_view(x, fs)
    """
    import matplotlib.pyplot as plt

    raw = np.asarray(signal).squeeze()

    # 복소지수 신호 e^(jwt)의 허수부가 사라지지 않도록
    # 입력 자료형에 따라 실수/복소수를 구분하여 보존한다.
    if np.iscomplexobj(raw):
        x = np.asarray(raw, dtype=np.complex128)
    else:
        x = np.asarray(raw, dtype=np.float64)

    if x.ndim != 1:
        raise ValueError("Spectrum Viewer 입력 신호는 1차원 배열이어야 합니다.")

    if x.size == 0:
        raise ValueError("Spectrum Viewer 입력 신호가 비어 있습니다.")

    fs = float(fs)
    if not np.isfinite(fs) or fs <= 0:
        raise ValueError("Sampling frequency는 양수여야 합니다.")

    window_length = int(window_length)
    averages = int(averages)
    overlap_percent = float(overlap_percent)
    reference_load = float(reference_load)

    if window_length <= 1:
        raise ValueError("window_length는 2 이상이어야 합니다.")

    if averages <= 0:
        raise ValueError("averages는 1 이상이어야 합니다.")

    if not (0 <= overlap_percent < 100):
        raise ValueError("overlap_percent는 0 이상 100 미만이어야 합니다.")

    if reference_load <= 0:
        raise ValueError("reference_load는 양수여야 합니다.")

    units_normalized = str(units).strip().lower()

    if units_normalized not in ("dbm", "watts", "w"):
        raise ValueError('units는 "dBm" 또는 "Watts"를 사용하세요.')

    overlap_samples = int(round(window_length * overlap_percent / 100.0))
    hop = window_length - overlap_samples

    # MATLAB Spectrum Analyzer와 유사한 periodic Hann window 사용.
    win = windows.hann(window_length, sym=False)

    # 데이터가 한 window보다 짧으면 0-padding하여 한 프레임을 만든다.
    if x.size < window_length:
        padded = np.zeros(window_length, dtype=x.dtype)
        padded[:x.size] = x
        x_for_frames = padded
    else:
        x_for_frames = x

    starts = list(range(0, x_for_frames.size - window_length + 1, hop))

    if not starts:
        starts = [0]

    # 정적 Workbook 데이터에서는 앞에서부터 최대 averages개의 frame을 평균한다.
    starts = starts[:averages]

    psd_sum = np.zeros(window_length, dtype=np.float64)
    window_energy = float(np.sum(win ** 2))

    for start in starts:
        frame = x_for_frames[start:start + window_length]

        if frame.size < window_length:
            temp = np.zeros(window_length, dtype=x.dtype)
            temp[:frame.size] = frame
            frame = temp

        spectrum = np.fft.fft(frame * win, n=window_length)

        # Two-sided modified periodogram [signal^2 / Hz]
        psd = (np.abs(spectrum) ** 2) / (fs * window_energy)
        psd_sum += psd

    psd_avg = psd_sum / len(starts)

    # MATLAB Spectrum Analyzer의 Power 표시를 근사:
    # Power = PSD * RBW, Hann window의 equivalent noise bandwidth 사용.
    coherent_sum = float(np.sum(win))
    rbw = fs * window_energy / (coherent_sum ** 2)

    power_watts = (psd_avg * rbw) / reference_load
    power_dbm = 10.0 * np.log10(
        np.maximum(power_watts, np.finfo(np.float64).tiny) / 1e-3
    )

    freq = np.fft.fftfreq(window_length, d=1.0 / fs)
    freq = np.fft.fftshift(freq)
    power_watts = np.fft.fftshift(power_watts)
    power_dbm = np.fft.fftshift(power_dbm)

    # 표시 주파수 범위.
    # 지정하지 않으면 Nyquist 범위, Chapter 4에서는 80e3을 주어
    # 기존 MATLAB 화면의 -80 kHz ~ +80 kHz와 맞출 수 있다.
    if frequency_limit_hz is None:
        display_limit_hz = fs / 2.0
    else:
        display_limit_hz = abs(float(frequency_limit_hz))
        if not np.isfinite(display_limit_hz) or display_limit_hz <= 0:
            raise ValueError("frequency_limit_hz는 양수여야 합니다.")
        display_limit_hz = min(display_limit_hz, fs / 2.0)

    # MATLAB Spectrum Analyzer처럼 큰 주파수 범위에서는 kHz로 표시한다.
    if display_limit_hz >= 1000:
        freq_plot = freq / 1e3
        display_limit = display_limit_hz / 1e3
        xlabel = "Frequency (kHz)"
    else:
        freq_plot = freq
        display_limit = display_limit_hz
        xlabel = "Frequency (Hz)"

    if units_normalized in ("watts", "w"):
        y_values = power_watts
        ylabel = "Magnitude-squared (W)"

        # MATLAB의 Watts/Magnitude-squared 화면처럼 0부터 표시.
        y_bottom = 0.0 if ymin is None else float(ymin)
        y_top = None if ymax is None else float(ymax)
    else:
        y_values = power_dbm
        ylabel = "Power (dBm)"
        y_bottom = -40.0 if ymin is None else float(ymin)
        y_top = 25.0 if ymax is None else float(ymax)

    plt.figure(figsize=(9, 4.8))
    plt.plot(freq_plot, y_values)
    plt.xlim(-display_limit, display_limit)

    if y_top is None:
        plt.ylim(bottom=y_bottom)
    else:
        plt.ylim(y_bottom, y_top)

    plt.xlabel(xlabel)
    plt.ylabel(ylabel)
    plt.title("Spectrum Analyzer")
    plt.grid(True)
    plt.tight_layout()

    print(
        "Spectrum Viewer | "
        f"Fs = {fs:g} Hz | "
        f"range = {-display_limit_hz:g} ~ {display_limit_hz:g} Hz | "
        f"window = {window_length} | "
        f"overlap = {overlap_percent:g}% ({overlap_samples} samples) | "
        f"averages = {len(starts)}/{averages} | "
        f"RBW ≈ {rbw:.3f} Hz | "
        f"units = {'Watts' if units_normalized in ('watts', 'w') else 'dBm'}"
    )

    return {
        "frequency": freq,
        "power_watts": power_watts,
        "power_dbm": power_dbm,
        "rbw": rbw,
        "frames_averaged": len(starts),
        "frequency_limit_hz": display_limit_hz,
        "units": "Watts" if units_normalized in ("watts", "w") else "dBm",
    }


async def sound_load(path):
    """
    public/static/data 아래의 .mat Sound 자료를 불러와
    (signal, fs)를 반환한다.

    사용 예:
        x, fs = await sound_load("ch1/sound.mat")
    """
    path = str(path).strip()

    if not path:
        raise ValueError("Sound 파일 경로가 비어 있습니다.")

    normalized = path.lstrip("/")

    if normalized.startswith("static/data/"):
        normalized = normalized[len("static/data/"):]

    url = f"/static/data/{normalized}"

    safe_name = normalized.replace("/", "_").replace("\\\\", "_")
    local_path = f"/home/pyodide/_workbook_{safe_name}"

    await _workbook_fetch_binary(url, local_path)

    mat = loadmat(local_path)

    signal = None
    fs = None

    # 교수님 MATLAB 자료에서 사용 중인 data 구조 우선 지원
    if "data" in mat:
        data = np.asarray(mat["data"])

        if data.ndim == 2 and data.shape[0] == 2:
            t = np.asarray(data[0, :], dtype=np.float64).squeeze()
            signal = np.asarray(data[1, :], dtype=np.float64).squeeze()

            if t.size >= 2:
                dt = float(np.mean(np.diff(t)))
                if dt > 0:
                    fs = int(round(1.0 / dt))

        elif data.ndim == 2 and data.shape[1] == 2:
            t = np.asarray(data[:, 0], dtype=np.float64).squeeze()
            signal = np.asarray(data[:, 1], dtype=np.float64).squeeze()

            if t.size >= 2:
                dt = float(np.mean(np.diff(t)))
                if dt > 0:
                    fs = int(round(1.0 / dt))

        else:
            squeezed = np.asarray(data).squeeze()
            if squeezed.ndim == 1:
                signal = squeezed

    # 일반적인 변수명 지원
    if signal is None:
        for key in ("sound", "signal", "x", "y"):
            if key in mat:
                candidate = np.asarray(mat[key]).squeeze()
                if candidate.ndim == 1:
                    signal = candidate
                    break

    if fs is None:
        for key in ("fs", "Fs", "FS"):
            if key in mat:
                candidate = np.asarray(mat[key]).squeeze()
                if candidate.size == 1:
                    fs = int(round(float(candidate)))
                    break

    if signal is None:
        raise ValueError(
            "지원되는 음성 신호를 찾지 못했습니다. "
            "data, sound, signal, x, y 변수 중 하나를 확인하세요."
        )

    if fs is None:
        raise ValueError(
            "Sampling frequency를 결정하지 못했습니다. "
            "2xN time/signal data 또는 fs/Fs 변수가 필요합니다."
        )

    signal = np.asarray(signal, dtype=np.float64).squeeze()

    print(
        f"Sound data loaded: {normalized} | "
        f"fs = {fs} Hz | "
        f"samples = {signal.size}"
    )

    return signal, fs


async def sound_play(path):
    """
    .mat Sound 자료를 바로 재생한다.

    사용 예:
        await sound_play("ch1/sound.mat")
    """
    signal, fs = await sound_load(path)

    info = _workbook_signal_to_audio_base64(signal, fs)

    print(
        f"Sound ready | "
        f"fs = {info['fs']} Hz | "
        f"duration = {info['duration']:.3f} s"
    )

    return info


# 각 실행 전에 WorkbookPage.tsx가 이 두 값을 다시 초기화한다.
audio_base64 = ""
has_audio = False
`);
  }

  async function ensurePyodide() {
    if (pyodideRef.current) {
      return pyodideRef.current;
    }

    if (pyodideInitPromiseRef.current) {
      return pyodideInitPromiseRef.current;
    }

    pyodideInitPromiseRef.current = (async () => {
      console.log("Pyodide 초기화 시작");
      setCodeOutput("Python 엔진을 준비하는 중입니다...");

      if (!(window as any).loadPyodide) {
        throw new Error("loadPyodide가 아직 준비되지 않았습니다.");
      }

      const instance = await (window as any).loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.27.2/full/",
      });

      console.log("Pyodide 로딩 완료");

      pyodideRef.current = instance;
      setPyodide(instance);

      // NumPy/SciPy/Sound helper까지 기다리지 않고,
      // Pyodide 본체가 준비되는 즉시 Python 문제 실행을 허용한다.
      setPyReady(true);
      setCodeOutput("Python 실행 준비 완료!");

      return instance;
    })();

    try {
      return await pyodideInitPromiseRef.current;
    } catch (e) {
      // 다음 실행/재시도에서 초기화를 다시 시작할 수 있도록 한다.
      pyodideInitPromiseRef.current = null;
      pyodideRef.current = null;
      setPyodide(null);
      setPyReady(false);
      throw e;
    }
  }

  async function importFilesToPythonWorkspace(files: FileList | File[]) {
    const selectedFiles = Array.from(files ?? []);

    if (selectedFiles.length === 0) return;

    setImportingWorkspaceFile(true);
    setWorkspaceFileNotice("");

    try {
      const instance = await ensurePyodide();

      try {
        instance.FS.chdir("/home/pyodide");
      } catch {
        // 기본 작업 경로가 이미 /home/pyodide인 경우 그대로 진행한다.
      }

      const imported: Array<{ name: string; size: number }> = [];

      for (const file of selectedFiles) {
        const safeName =
          file.name
            .split(/[\\/]/)
            .pop()
            ?.trim() || "uploaded_file";

        const buffer = await file.arrayBuffer();
        const bytes = new Uint8Array(buffer);

        instance.FS.writeFile(
          `/home/pyodide/${safeName}`,
          bytes,
        );

        imported.push({
          name: safeName,
          size: file.size,
        });
      }

      setWorkspaceFiles((previous) => {
        const next = new Map(
          previous.map((file) => [file.name, file]),
        );

        for (const file of imported) {
          next.set(file.name, file);
        }

        return Array.from(next.values()).sort((a, b) =>
          a.name.localeCompare(b.name),
        );
      });

      setWorkspaceFileNotice(
        imported.length === 1
          ? `${imported[0].name} 파일을 Python 작업공간으로 가져왔습니다. 같은 Chapter의 다른 문제에서도 그대로 사용할 수 있습니다.`
          : `${imported.length}개 파일을 Python 작업공간으로 가져왔습니다. 같은 Chapter의 다른 문제에서도 그대로 사용할 수 있습니다.`,
      );
    } catch (error: any) {
      console.error("Python 작업공간 파일 가져오기 실패:", error);
      setWorkspaceFileNotice(
        `파일을 가져오지 못했습니다: ${String(
          error?.message ?? error,
        )}`,
      );
    } finally {
      setImportingWorkspaceFile(false);
    }
  }

  function codeUsesWorkbookHelpers(code: string) {
    return /\b(file_load|sound_load|sound_play|signal_play|spectrum_view|rcosdesign)\s*\(/.test(
      code,
    );
  }

  async function ensureWorkbookSoundHelpers(instance: any) {
    if (workbookHelpersReadyRef.current) {
      return;
    }

    if (!workbookHelpersPromiseRef.current) {
      workbookHelpersPromiseRef.current = (async () => {
        setCodeOutput("Workbook 파일/사운드 기능을 준비하는 중입니다...");
        await installWorkbookSoundHelpers(instance);
        workbookHelpersReadyRef.current = true;
      })();
    }

    try {
      await workbookHelpersPromiseRef.current;
    } catch (e) {
      // helper 설치 실패도 다음 실행에서 다시 시도 가능하게 한다.
      workbookHelpersPromiseRef.current = null;
      workbookHelpersReadyRef.current = false;
      throw e;
    }
  }

  async function initializePython() {
    try {
      await ensurePyodide();
    } catch (e: any) {
      console.error(e);
      setCodeOutput(`Python 초기화 실패:\n${String(e?.message ?? e)}\n\nPython 문제에서 다시 실행하면 재시도합니다.`);
    }
  }

  async function runPythonCode() {
    setRunningCode(true);
    setCodeOutput(null);
    setPlotImage(null);
    setAudioSource(null);

    try {
      // 초기화가 아직 끝나지 않았으면 여기서 기다리고,
      // 실패했던 경우에는 새로고침 없이 다시 초기화를 시도한다.
      const pyodide = await ensurePyodide();

      // 학생 코드에 실제로 import된 Pyodide 패키지만 필요 시점에 내려받는다.
      const rawPythonCode = pythonAnswerToCode(userAnswer);

      // 파일/Sound/Spectrum helper는 실제 사용하는 문제에서만 최초 1회 설치한다.
      // 따라서 일반 Python 문제의 최초 실행은 NumPy/SciPy helper 설치를 기다리지 않는다.
      if (codeUsesWorkbookHelpers(rawPythonCode)) {
        await ensureWorkbookSoundHelpers(pyodide);
      }

      // 학생에게는 file_load("..."), sound_play("..."), sound_load("...")처럼 간단한 호출만 보이게 한다.
      // Pyodide에서는 파일 fetch가 비동기이므로 실행 직전에 await를 자동으로 붙인다.
      const pythonCode = rawPythonCode
        .replace(
          /(^|\n)([ \t]*)sound_play\s*\(/g,
          '$1$2await sound_play(',
        )
        .replace(
          /(^|\n)([ \t]*)([^#\n]*?=\s*)sound_load\s*\(/g,
          '$1$2$3await sound_load(',
        )
        .replace(
          /(^|\n)([ \t]*)sound_load\s*\(/g,
          '$1$2await sound_load(',
        )
        .replace(
          /(^|\n)([ \t]*)([^#\n]*?=\s*)file_load\s*\(/g,
          '$1$2$3await file_load(',
        )
        .replace(
          /(^|\n)([ \t]*)file_load\s*\(/g,
          '$1$2await file_load(',
        );

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

audio_base64 = ""
has_audio = False
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

has_audio = False

try:
    if "audio_base64" in globals():
        if isinstance(audio_base64, str) and audio_base64.strip() != "":
            has_audio = True
except Exception:
    has_audio = False        
`);

      const hasFigure = pyodide.globals.get("has_figure");

      if (hasFigure) {
        const imageBase64 = pyodide.globals.get("image_base64");

        if (imageBase64) {
          setPlotImage(`data:image/png;base64,${imageBase64}`);
        }
      }

      const hasAudio = pyodide.globals.get("has_audio");

      if (hasAudio) {
        const audioBase64 = pyodide.globals.get("audio_base64");

        if (audioBase64 && String(audioBase64).trim() !== "") {
          setAudioSource(`data:audio/wav;base64,${audioBase64}`);
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
      <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />

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
        // onLoad는 스크립트가 최초 다운로드될 때만 호출될 수 있어,
        // Next.js 클라이언트 이동 후 WorkbookPage가 다시 마운트되면
        // 이미 캐시된 Pyodide 스크립트에서는 초기화가 시작되지 않는 경우가 있다.
        // onReady는 최초 로드뿐 아니라 컴포넌트가 다시 마운트될 때도 호출된다.
        onReady={() => {
          void initializePython();
        }}
        onError={(error) => {
          console.error("Pyodide script load 실패:", error);
          setPyReady(false);
          setCodeOutput(
            "Python 엔진 스크립트를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
          );
        }}
      />

      <Script
        src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"
        strategy="afterInteractive"
        onLoad={() => renderMath()}
      />

      {/* 전체 레이아웃: 브라우저 페이지 대신 워크북 내부만 스크롤 */}
      <div
        style={{
          display: "flex",
          position: "fixed",
          inset: 0,
          // 워크북 밖에 렌더링된 이미지/페이지 콘텐츠가 학습 화면 위에 겹치지 않게 한다.
          zIndex: 1000,
          isolation: "isolate",
          width: "100%",
          height: "100dvh",
          boxSizing: "border-box",
          overflow: "hidden",
          overscrollBehavior: "none",
          background: "#f5f7fb",
        }}
      >
        {/* 좌측 목차 */}
        <div
          data-tutorial="workbook-sidebar"
          style={{
            width: 280,
            background: "#fff",
            borderRight: "1px solid #e5e7eb",
            padding: 20,
            overflowY: "auto",
            position: "sticky",
            top: 0,
            height: "100%",
            boxSizing: "border-box",
            overscrollBehavior: "contain",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 900,
              marginBottom: 8,
            }}
          >
            {data.title}
          </div>

          <div
            style={{
              marginBottom: 20,
              fontSize: 12,
              color: "#6b7280",
              lineHeight: 1.7,
            }}
          >
            <span style={{ color: "#16a34a", fontWeight: 900 }}>✓</span>{" "}
            80점 이상
            <span style={{ margin: "0 7px", color: "#d1d5db" }}>·</span>
            <span style={{ color: "#d97706", fontWeight: 900 }}>△</span>{" "}
            저장/80점 미만
            <span style={{ margin: "0 7px", color: "#d1d5db" }}>·</span>
            <span style={{ color: "#cbd5e1", fontWeight: 900 }}>○</span>{" "}
            미풀이
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
                          {renderSidebarProblemLabel(pb, active)}
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
                        {renderSidebarProblemLabel(
                          group.parent,
                          active,
                          "↳ ",
                        )}
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
                              {renderSidebarProblemLabel(pb, active, "↳ ")}
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
            minWidth: 0,
            height: "100dvh",
            boxSizing: "border-box",
            padding: "14px 20px",
            maxWidth: 1050,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
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
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    flexWrap: "wrap",
                  }}
                >
                  <span>{current.pb.title}</span>

                  <button
                    type="button"
                    onClick={() => toggleBookmark(current.pb.id)}
                    aria-label={
                      bookmarkedProblemIds[current.pb.id]
                        ? "북마크 해제"
                        : "북마크 추가"
                    }
                    title={
                      bookmarkedProblemIds[current.pb.id]
                        ? "북마크 해제"
                        : "나중에 다시 보기"
                    }
                    style={{
                      border: 0,
                      background: "transparent",
                      padding: 0,
                      cursor: "pointer",
                      fontSize: 27,
                      lineHeight: 1,
                      color: bookmarkedProblemIds[current.pb.id]
                        ? "#f59e0b"
                        : "#cbd5e1",
                    }}
                  >
                    {bookmarkedProblemIds[current.pb.id] ? "★" : "☆"}
                  </button>

                  <span
                    style={{
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

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                flexWrap: "wrap",
                justifyContent: "flex-end",
              }}
            >
              {chapterEquations.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowEquationLibrary(true)}
                  style={{
                    minHeight: 38,
                    padding: "8px 12px",
                    borderRadius: 10,
                    border: "1px solid #bae6fd",
                    background: "#f0f9ff",
                    color: "#075985",
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  수식 모음 ({chapterEquations.length})
                </button>
              )}

              <button
                type="button"
                onClick={() => setWorkbookTutorialOpen(true)}
                style={{
                  minHeight: 38,
                  padding: "8px 12px",
                  borderRadius: 10,
                  border: "1px solid #c7d2fe",
                  background: "#eef2ff",
                  color: "#3730a3",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                사용법
              </button>

              {isStudent && (
                <button
                  type="button"
                  onClick={focusModeStarted ? exitFocusMode : enterFocusMode}
                  style={{
                    minHeight: 38,
                    padding: "8px 12px",
                    borderRadius: 10,
                    border: "1px solid #d1d5db",
                    background: focusModeStarted ? "#111827" : "#fff",
                    color: focusModeStarted ? "#fff" : "#111827",
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  {focusModeStarted ? "학습 종료" : "학습 모드"}
                </button>
              )}

              {isAuthenticated ? (
                <>
                  <div
                    style={{
                      padding: "8px 11px",
                      borderRadius: 10,
                      background: "#fff",
                      border: "1px solid #e5e7eb",
                      color: "#374151",
                      fontSize: 13,
                      lineHeight: 1.4,
                    }}
                  >
                    <div style={{ fontWeight: 900 }}>
                      {userName.trim() || "사용자"}
                      {studentNumber ? ` · ${studentNumber}` : ""}
                    </div>
                    {userRole && (
                      <div
                        style={{
                          marginTop: 2,
                          color: "#6b7280",
                          fontSize: 12,
                        }}
                      >
                        {userRole}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => window.location.assign("/")}
                    style={{
                      minHeight: 38,
                      padding: "8px 12px",
                      borderRadius: 10,
                      border: "1px solid #d1d5db",
                      background: "#fff",
                      color: "#111827",
                      fontWeight: 800,
                      cursor: "pointer",
                    }}
                  >
                    홈
                  </button>

                  <button
                    type="button"
                    onClick={handleLogout}
                    style={{
                      minHeight: 38,
                      padding: "8px 12px",
                      borderRadius: 10,
                      border: "1px solid #d1d5db",
                      background: "#fff",
                      color: "#111827",
                      fontWeight: 800,
                      cursor: "pointer",
                    }}
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => router.push("/login")}
                  style={{
                    minHeight: 38,
                    padding: "8px 12px",
                    borderRadius: 10,
                    border: "1px solid #d1d5db",
                    background: "#fff",
                    color: "#111827",
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  로그인
                </button>
              )}
            </div>

          </div>

          {isStudent && (
            <div style={{ marginTop: 16, padding: "13px 15px", borderRadius: 12, border: isDeadlinePassed ? "1px solid #fecaca" : "1px solid #c7d2fe", background: isDeadlinePassed ? "#fef2f2" : "#eef2ff", color: isDeadlinePassed ? "#991b1b" : "#3730a3", fontSize: 14, lineHeight: 1.6, fontWeight: 800 }}>
              {deadlineLoading
                ? "제출 기한을 확인하는 중입니다..."
                : formattedChapterDeadline
                  ? isDeadlinePassed
                    ? `제출이 마감되었습니다. 마감: ${formattedChapterDeadline}`
                    : `제출 기한: ${formattedChapterDeadline}`
                  : studentClassId
                    ? "이 Chapter에는 현재 설정된 제출 기한이 없습니다."
                    : "아직 분반이 배정되지 않았습니다. 담당 교수에게 문의하세요."}
            </div>
          )}

          {returnProblemId && (
            <div
              style={{
                marginTop: 16,
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <button
                type="button"
                onClick={returnToOriginalProblem}
                style={{
                  minHeight: 40,
                  padding: "9px 13px",
                  borderRadius: 10,
                  border: "1px solid #c7d2fe",
                  background: "#eef2ff",
                  color: "#3730a3",
                  fontWeight: 900,
                  cursor: "pointer",
                }}
              >
                ← 원래 문제로 돌아가기
                {returnProblemTitle ? ` (${returnProblemTitle})` : ""}
              </button>
            </div>
          )}

          <div
            style={{
              marginTop: 12,
              padding: 18,
              flex: "0 1 32%",
              minHeight: 100,
              overflowY: "auto",
              overscrollBehavior: "contain",
              border: "1px solid #eee",
              borderRadius: 14,
              background: "#fff",
              userSelect: "none",
              WebkitUserSelect: "none",
            }}
            onCopy={(event) => event.preventDefault()}
            onCut={(event) => event.preventDefault()}
            onContextMenu={(event) => event.preventDefault()}
          >
            <div ref={promptRef} data-tutorial="workbook-prompt">
              {renderRichText(
                displayPrompt || "(문제 본문이 비어 있습니다)",
                (href) => {
                  void moveToWorkbookLink(href);
                },
                (equationId) => {
                  if (equationById[equationId]) {
                    setEquationModalId(equationId);
                  }
                },
              )}
            </div>
          </div>


          <div style={{ flex: "1 1 0", minHeight: 0, overflowY: "auto", overscrollBehavior: "contain", marginTop: 12, paddingRight: 4 }}>
          <div
            style={{
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

            <div data-tutorial="workbook-answer">
              <div
                data-tutorial={
                  currentProblemType === "python"
                    ? "python-editor"
                    : undefined
                }
              >
                {current.pb.fileUploadEnabled && (
                  <div
                    onDragOver={(event) => {
                      event.preventDefault();
                      event.dataTransfer.dropEffect = "copy";
                    }}
                    onDrop={(event) => {
                      event.preventDefault();
                      void importFilesToPythonWorkspace(
                        event.dataTransfer.files,
                      );
                    }}
                    style={{
                      marginBottom: 14,
                      padding: 14,
                      border: "1px dashed #a5b4fc",
                      borderRadius: 12,
                      background: "#f8faff",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 900,
                        color: "#312e81",
                      }}
                    >
                      실습 파일 가져오기
                    </div>

                    <div
                      style={{
                        marginTop: 5,
                        color: "#6b7280",
                        fontSize: 13,
                        lineHeight: 1.6,
                      }}
                    >
                      파일을 선택하거나 이 영역으로 끌어놓으면 현재
                      Chapter의 Python 작업공간에 저장됩니다. 문제를
                      이동해도 같은 Chapter 안에서는 다시 업로드할 필요가
                      없습니다.
                    </div>

                    <label
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        marginTop: 10,
                        padding: "8px 12px",
                        borderRadius: 9,
                        border: "1px solid #c7d2fe",
                        background: "#fff",
                        color: "#3730a3",
                        fontWeight: 800,
                        cursor: importingWorkspaceFile
                          ? "wait"
                          : "pointer",
                      }}
                    >
                      {importingWorkspaceFile
                        ? "가져오는 중..."
                        : "파일 선택"}

                      <input
                        type="file"
                        multiple
                        disabled={importingWorkspaceFile}
                        onChange={(event) => {
                          const files = event.currentTarget.files;

                          if (files && files.length > 0) {
                            void importFilesToPythonWorkspace(files);
                          }

                          event.currentTarget.value = "";
                        }}
                        style={{ display: "none" }}
                      />
                    </label>

                    {workspaceFiles.length > 0 && (
                      <div
                        style={{
                          marginTop: 12,
                          padding: "10px 12px",
                          borderRadius: 9,
                          background: "#eef2ff",
                          color: "#3730a3",
                          fontSize: 13,
                          lineHeight: 1.7,
                        }}
                      >
                        <div style={{ fontWeight: 900 }}>
                          현재 Chapter 작업공간
                        </div>
                        {workspaceFiles.map((file) => (
                          <div key={file.name}>
                            ✓ {file.name}
                          </div>
                        ))}
                      </div>
                    )}

                    {workspaceFileNotice && (
                      <div
                        style={{
                          marginTop: 10,
                          fontSize: 13,
                          lineHeight: 1.6,
                          color: workspaceFileNotice.startsWith(
                            "파일을 가져오지 못했습니다",
                          )
                            ? "#b91c1c"
                            : "#166534",
                        }}
                      >
                        {workspaceFileNotice}
                      </div>
                    )}

                    <div
                      style={{
                        marginTop: 8,
                        color: "#6b7280",
                        fontSize: 12,
                        lineHeight: 1.5,
                      }}
                    >
                      ※ 파일은 Render/Supabase에 업로드되지 않고 현재
                      브라우저의 Python 작업공간에만 보관됩니다. 새로고침하거나
                      Chapter를 나가면 다시 가져와야 합니다.
                    </div>
                  </div>
                )}

                {currentProblemType === "python" && earlierPythonProblems.length > 0 && (
                  <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 12 }}>
                    <label htmlFor="python-import-source" style={{ fontSize: 13, fontWeight: 800 }}>이전 코드:</label>
                    <select
                      id="python-import-source"
                      value={selectedImportId}
                      onChange={(event) => setImportSourceId(event.target.value)}
                      style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid #d1d5db", background: "#fff" }}
                    >
                      {earlierPythonProblems.map((item) => (
                        <option key={item.pb.id} value={item.pb.id}>{item.pb.title}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => { void importEarlierPythonCode(); }}
                      disabled={importingAnswer}
                      style={{ padding: "9px 12px", borderRadius: 9, border: "1px solid #c7d2fe", color: "#3730a3", background: "#eef2ff", fontWeight: 800 }}
                    >
                      {importingAnswer ? "가져오는 중..." : "이전 코드 가져오기"}
                    </button>
                    {importNotice && <span role="status" style={{ fontSize: 12, color: "#475569" }}>{importNotice}</span>}
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
                  audioSource={audioSource}
                  onRunPython={runPythonCode}
                  onEnsureWorkbookHelpers={async () => {
                    const instance = await ensurePyodide();
                    await ensureWorkbookSoundHelpers(instance);
                  }}
                />
              </div>
            </div>

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
                data-tutorial="workbook-save"
                onClick={saveMyAnswer}
                disabled={isDeadlinePassed}
                style={{
                  padding: "10px 14px",
                  borderRadius: 10,
                  border: "1px solid #ddd",
                  cursor: isDeadlinePassed ? "not-allowed" : "pointer",
                  opacity: isDeadlinePassed ? 0.55 : 1,
                }}
              >
                {isDeadlinePassed ? "마감됨" : "저장"}
              </button>

              <button
                type="button"
                data-tutorial="workbook-grade"
                onClick={() =>
                  requestAuthenticatedAction("내 답안 채점하기", gradeWithAI)
                }
                disabled={grading || isDeadlinePassed}
                style={{
                  padding: "10px 14px",
                  borderRadius: 10,
                  border: "1px solid #ddd",
                  background: "#4f46e5",
                  color: "#fff",
                  fontWeight: 800,
                  opacity: grading || isDeadlinePassed ? 0.6 : 1,
                  cursor: grading || isDeadlinePassed ? "not-allowed" : "pointer",
                }}
              >
                {isDeadlinePassed ? "제출 마감" : grading ? "채점 중..." : "내 답안 채점하기"}
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

              {autoSaveNotice && (
                <span
                  style={{
                    fontSize: 12,
                    color:
                      autoSaveNotice === "자동 저장 실패"
                        ? "#b91c1c"
                        : "#6b7280",
                    fontWeight: 700,
                  }}
                >
                  {autoSaveNotice}
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
                      채점 결과
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
                  : `🔒 채점 결과 ${ANSWER_UNLOCK_SCORE}점 이상에서 정답 및 풀이 확인 가능`}
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
                    ? `먼저 답안을 작성하고 내 답안 채점을 받아보세요. ${ANSWER_UNLOCK_SCORE}점 이상이면 정답 및 풀이가 열립니다.`
                    : `현재 ${currentScore}점입니다. 피드백을 참고해 답안을 수정한 뒤 다시 채점해보세요.`}
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
                  renderRichText(
                    preparedAnswer,
                    (href) => {
                      void moveToWorkbookLink(href);
                    },
                    (equationId) => {
                      if (equationById[equationId]) {
                        setEquationModalId(equationId);
                      }
                    },
                  )
                ) : (
                  <div style={{ opacity: 0.7 }}>(사전 정답이 없습니다)</div>
                )}
              </div>
            </div>
          )}

          </div>{/* 답안 영역 독립 스크롤 끝 */}

          <div
            data-tutorial="workbook-navigation"
            style={{
              flexShrink: 0,
              paddingTop: 10,
              background: "#f5f7fb",
              marginTop: 0,
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

      {isAuthenticated === true && userRole === null && (
        <div
          aria-live="polite"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 12002,
            display: "grid",
            placeItems: "center",
            background: "#f5f7fb",
            color: "#374151",
          }}
        >
          <div
            style={{
              padding: "18px 22px",
              borderRadius: 14,
              background: "#fff",
              border: "1px solid #e5e7eb",
              boxShadow: "0 14px 36px rgba(15,23,42,0.10)",
              fontWeight: 800,
            }}
          >
            학습 환경을 확인하는 중입니다...
          </div>
        </div>
      )}

      {roleReady && isStudent && !focusModeStarted && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 12000,
            display: "grid",
            placeItems: "center",
            padding: 20,
            background: "rgba(15,23,42,0.92)",
            backdropFilter: "blur(6px)",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 520,
              padding: 30,
              borderRadius: 22,
              background: "#fff",
              color: "#111827",
              boxShadow: "0 28px 80px rgba(0,0,0,0.35)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 62,
                height: 62,
                margin: "0 auto",
                borderRadius: 18,
                display: "grid",
                placeItems: "center",
                background: "#eef2ff",
                color: "#4338ca",
                fontSize: 30,
                fontWeight: 900,
              }}
            >
              ⛶
            </div>

            <h2
              style={{
                margin: "18px 0 0",
                fontSize: 26,
                fontWeight: 900,
              }}
            >
              전체화면 학습 모드
            </h2>

            <p
              style={{
                margin: "12px 0 0",
                color: "#6b7280",
                lineHeight: 1.7,
              }}
            >
              문제를 풀기 전에 전체화면 학습 모드를 시작해 주세요.
              아래 버튼을 사용하거나 F11 전체화면을 사용할 수 있습니다.
              전체화면이 해제되거나 다른 탭·창으로 이동하면 문제 화면이 즉시 가려집니다.
            </p>

            <button
              type="button"
              onClick={enterFocusMode}
              style={{
                width: "100%",
                minHeight: 50,
                marginTop: 22,
                border: 0,
                borderRadius: 12,
                background: "#4f46e5",
                color: "#fff",
                fontWeight: 900,
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              전체화면으로 학습 시작
            </button>

            <button
              type="button"
              onClick={() => window.location.assign("/")}
              style={{
                width: "100%",
                minHeight: 44,
                marginTop: 10,
                border: "1px solid #d1d5db",
                borderRadius: 12,
                background: "#fff",
                color: "#374151",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              홈으로 돌아가기
            </button>

            {fullscreenError && (
              <div
                style={{
                  marginTop: 14,
                  padding: "10px 12px",
                  borderRadius: 10,
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                  color: "#b91c1c",
                  fontSize: 13,
                  lineHeight: 1.6,
                }}
              >
                {fullscreenError}
              </div>
            )}
          </div>
        </div>
      )}

      {focusModeBlocked && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 12001,
            display: "grid",
            placeItems: "center",
            padding: 20,
            background: "rgba(15,23,42,0.95)",
            backdropFilter: "blur(7px)",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 520,
              padding: 30,
              borderRadius: 22,
              background: "#fff",
              color: "#111827",
              boxShadow: "0 28px 80px rgba(0,0,0,0.35)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 62,
                height: 62,
                margin: "0 auto",
                borderRadius: 18,
                display: "grid",
                placeItems: "center",
                background: "#fff7ed",
                color: "#c2410c",
                fontSize: 28,
              }}
            >
              ⚠
            </div>

            <h2
              style={{
                margin: "18px 0 0",
                fontSize: 25,
                fontWeight: 900,
              }}
            >
              학습이 일시 중지되었습니다
            </h2>

            <p
              style={{
                margin: "12px 0 0",
                color: "#6b7280",
                lineHeight: 1.7,
              }}
            >
              전체화면이 해제되었거나 다른 탭·창으로 이동했습니다.
              계속 학습하려면 전체화면 학습 모드로 복귀해 주세요.
            </p>

            <button
              type="button"
              onClick={enterFocusMode}
              style={{
                width: "100%",
                minHeight: 50,
                marginTop: 22,
                border: 0,
                borderRadius: 12,
                background: "#4f46e5",
                color: "#fff",
                fontWeight: 900,
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              전체화면으로 복귀
            </button>

            <button
              type="button"
              onClick={exitFocusMode}
              style={{
                width: "100%",
                minHeight: 44,
                marginTop: 10,
                border: "1px solid #d1d5db",
                borderRadius: 12,
                background: "#fff",
                color: "#374151",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              학습 모드 종료
            </button>

            {fullscreenError && (
              <div
                style={{
                  marginTop: 14,
                  padding: "10px 12px",
                  borderRadius: 10,
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                  color: "#b91c1c",
                  fontSize: 13,
                  lineHeight: 1.6,
                }}
              >
                {fullscreenError}
              </div>
            )}
          </div>
        </div>
      )}

      {isAuthenticated !== null && (
        <>
          <TutorialIntroPrompt
            storageKey="workbook_tutorial_workbook_v1"
            title="문제 풀이 화면을 안내해드릴까요?"
            description="문제 이동, 답안 작성, 실행과 채점 방법을 간단히 안내합니다."
            onStart={() => setWorkbookTutorialOpen(true)}
          />

          <TutorialOverlay
            steps={WORKBOOK_TUTORIAL_STEPS}
            storageKey="workbook_tutorial_workbook_v1"
            open={workbookTutorialOpen}
            onClose={() => setWorkbookTutorialOpen(false)}
            onComplete={() => setWorkbookTutorialOpen(false)}
          />
        </>
      )}

      {showEquationLibrary && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setShowEquationLibrary(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 11000,
            display: "grid",
            placeItems: "center",
            padding: 20,
            background: "rgba(15,23,42,0.58)",
            backdropFilter: "blur(3px)",
          }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 760,
              maxHeight: "82vh",
              overflowY: "auto",
              padding: 24,
              borderRadius: 20,
              background: "#fff",
              boxShadow: "0 24px 70px rgba(15,23,42,0.30)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: 24,
                    fontWeight: 900,
                    color: "#111827",
                  }}
                >
                  {data.title} 수식 모음
                </h2>
                <div
                  style={{
                    marginTop: 5,
                    color: "#6b7280",
                    fontSize: 13,
                  }}
                >
                  번호를 누르면 해당 수식만 크게 볼 수 있습니다.
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowEquationLibrary(false)}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  border: "1px solid #d1d5db",
                  background: "#fff",
                  cursor: "pointer",
                  fontSize: 20,
                }}
              >
                ×
              </button>
            </div>

            <div
              ref={equationLibraryRef}
              style={{
                marginTop: 18,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {chapterEquations.map((equation) => (
                <div
                  key={equation.id}
                  style={{
                    padding: 16,
                    border: "1px solid #e5e7eb",
                    borderRadius: 14,
                    background: "#f9fafb",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setShowEquationLibrary(false);
                      setEquationModalId(equation.id);
                    }}
                    style={{
                      border: 0,
                      background: "transparent",
                      padding: 0,
                      color: "#4f46e5",
                      fontWeight: 900,
                      cursor: "pointer",
                      fontSize: 14,
                    }}
                  >
                    식 {equation.id}
                  </button>

                  <div
                    style={{
                      marginTop: 10,
                      overflowX: "auto",
                    }}
                  >
                    <EquationMath latex={equation.latex} />
                  </div>

                  <div
                    style={{
                      marginTop: 8,
                      color: "#6b7280",
                      fontSize: 12,
                    }}
                  >
                    출처: 문제 {equation.problemTitle}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeEquation && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setEquationModalId(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 11001,
            display: "grid",
            placeItems: "center",
            padding: 20,
            background: "rgba(15,23,42,0.58)",
            backdropFilter: "blur(3px)",
          }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 680,
              padding: 26,
              borderRadius: 20,
              background: "#fff",
              boxShadow: "0 24px 70px rgba(15,23,42,0.30)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 900,
                  color: "#111827",
                }}
              >
                식 {activeEquation.id}
              </div>

              <button
                type="button"
                onClick={() => setEquationModalId(null)}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  border: "1px solid #d1d5db",
                  background: "#fff",
                  cursor: "pointer",
                  fontSize: 20,
                }}
              >
                ×
              </button>
            </div>

            <div
              ref={equationModalRef}
              style={{
                marginTop: 18,
                padding: 18,
                borderRadius: 14,
                border: "1px solid #dbeafe",
                background: "#f8fbff",
                overflowX: "auto",
                fontSize: 17,
              }}
            >
              <EquationMath latex={activeEquation.latex} />
            </div>

            <div
              style={{
                marginTop: 10,
                color: "#6b7280",
                fontSize: 13,
              }}
            >
              출처: 문제 {activeEquation.problemTitle}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 10,
                marginTop: 18,
              }}
            >
              <button
                type="button"
                onClick={() => {
                  const targetIdx = equationSourceIndex(activeEquation);
                  setEquationModalId(null);

                  if (targetIdx != null) {
                    void moveToProblem(targetIdx);
                  }
                }}
                disabled={equationSourceIndex(activeEquation) == null}
                style={{
                  minHeight: 42,
                  padding: "9px 13px",
                  borderRadius: 10,
                  border: "1px solid #c7d2fe",
                  background: "#eef2ff",
                  color: "#3730a3",
                  fontWeight: 900,
                  cursor:
                    equationSourceIndex(activeEquation) == null
                      ? "not-allowed"
                      : "pointer",
                  opacity:
                    equationSourceIndex(activeEquation) == null
                      ? 0.55
                      : 1,
                }}
              >
                원문 문제로 이동
              </button>

              <button
                type="button"
                onClick={() => setEquationModalId(null)}
                style={{
                  minHeight: 42,
                  padding: "9px 13px",
                  borderRadius: 10,
                  border: "1px solid #d1d5db",
                  background: "#fff",
                  color: "#111827",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {pendingMoveIdx != null && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            display: "grid",
            placeItems: "center",
            padding: 20,
            background: "rgba(15,23,42,0.55)",
            backdropFilter: "blur(3px)",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 460,
              padding: 26,
              borderRadius: 20,
              background: "#fff",
              boxShadow: "0 24px 70px rgba(15,23,42,0.28)",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 900,
                color: "#111827",
              }}
            >
              변경된 답안이 있습니다
            </h2>

            <p
              style={{
                margin: "12px 0 0",
                color: "#6b7280",
                lineHeight: 1.7,
              }}
            >
              현재 답안을 저장하시겠습니까?
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
                disabled={savingBeforeMove}
                onClick={async () => {
                  const targetIdx = pendingMoveIdx;
                  if (targetIdx == null) return;

                  setSavingBeforeMove(true);

                  try {
                    const success = await saveMyAnswer();

                    if (!success) return;

                    setPendingMoveIdx(null);
                    await moveToProblemDirect(targetIdx);
                  } finally {
                    setSavingBeforeMove(false);
                  }
                }}
                style={{
                  minHeight: 46,
                  border: 0,
                  borderRadius: 12,
                  cursor: savingBeforeMove ? "not-allowed" : "pointer",
                  background: "#4f46e5",
                  color: "#fff",
                  fontWeight: 900,
                  opacity: savingBeforeMove ? 0.65 : 1,
                }}
              >
                {savingBeforeMove ? "저장 중..." : "저장하고 이동"}
              </button>

              <button
                type="button"
                disabled={savingBeforeMove}
                onClick={async () => {
                  const targetIdx = pendingMoveIdx;
                  if (targetIdx == null) return;

                  clearAutoSavedDraft(current.pb.id);
                  setAutoSaveNotice("");
                  setPendingMoveIdx(null);
                  await moveToProblemDirect(targetIdx);
                }}
                style={{
                  minHeight: 46,
                  border: "1px solid #d1d5db",
                  borderRadius: 12,
                  cursor: savingBeforeMove ? "not-allowed" : "pointer",
                  background: "#fff",
                  color: "#111827",
                  fontWeight: 900,
                }}
              >
                저장하지 않고 이동
              </button>
            </div>

            <button
              type="button"
              disabled={savingBeforeMove}
              onClick={() => setPendingMoveIdx(null)}
              style={{
                width: "100%",
                marginTop: 12,
                padding: 8,
                border: 0,
                cursor: savingBeforeMove ? "not-allowed" : "pointer",
                background: "transparent",
                color: "#6b7280",
                fontWeight: 700,
              }}
            >
              취소
            </button>
          </div>
        </div>
      )}

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
              {authPromptAction || "이 기능"}을(를) 이용하려면 계정이 필요합니다.
              무료 회원가입 후 정답 및 풀이 확인, 내 답안 채점, 학습 기록 저장 기능을 이용할 수 있습니다.
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
