"use client";

import React, { useEffect, useMemo, useState } from "react";
import type { ConsoleProblem as ConsoleProblemData } from "@/types/workbook";

type ConsoleItemAnswer = {
  output: string;
  explanation: string;
  executed: boolean;
  isError?: boolean;
};

type ConsoleAnswer = {
  kind: "console";
  items: Record<string, ConsoleItemAnswer>;
};

type ConsoleProblemProps = {
  problem: ConsoleProblemData;
  value: string;
  onChange: (value: string) => void;
  pyodide: any;
  pyReady: boolean;
};

function parseAnswer(value: string): ConsoleAnswer {
  try {
    const parsed = JSON.parse(value);
    if (
      parsed?.kind === "console" &&
      parsed.items &&
      typeof parsed.items === "object"
    ) {
      return parsed;
    }
  } catch {
    // 기존 문자열 답안 또는 비어 있는 값은 새 콘솔 답안으로 시작한다.
  }
  return { kind: "console", items: {} };
}

function serializeAnswer(answer: ConsoleAnswer) {
  return JSON.stringify(answer);
}

export function consoleAnswerToText(
  problem: ConsoleProblemData,
  value: string,
) {
  const answer = parseAnswer(value);
  return problem.items
    .map((item, index) => {
      const saved = answer.items[item.id];
      return [
        `${index + 1}. 명령: ${item.command}`,
        `실행 결과: ${saved?.output || "(실행하지 않음)"}`,
        `동작의 의미: ${saved?.explanation || "(작성하지 않음)"}`,
      ].join("\n");
    })
    .join("\n\n");
}

export default function ConsoleProblem({
  problem,
  value,
  onChange,
  pyodide,
  pyReady,
}: ConsoleProblemProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const answer = useMemo(() => parseAnswer(value), [value]);
  const currentItem = problem.items[currentIndex];
  const currentAnswer = currentItem
    ? (answer.items[currentItem.id] ?? {
        output: "",
        explanation: "",
        executed: false,
      })
    : { output: "", explanation: "", executed: false };

  function updateCurrent(patch: Partial<ConsoleItemAnswer>) {
    if (!currentItem) return;
    const next: ConsoleAnswer = {
      kind: "console",
      items: {
        ...answer.items,
        [currentItem.id]: {
          ...currentAnswer,
          ...patch,
        },
      },
    };
    onChange(serializeAnswer(next));
  }

  async function resetNamespace() {
    if (!pyodide) return;
    const setup = problem.setupCode ?? "";
    await pyodide.runPythonAsync(`
import builtins
_workbook_console_ns = {"__builtins__": builtins.__dict__}
exec(${JSON.stringify(setup)}, _workbook_console_ns, _workbook_console_ns)
`);
  }

  useEffect(() => {
    setCurrentIndex(0);
    setHistory([]);
    if (pyReady) {
      resetNamespace().catch(() => undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problem.id, pyReady]);

  async function runCurrentCommand() {
    if (!pyodide || !currentItem) return;

    setRunning(true);
    try {
      const result = await pyodide.runPythonAsync(`
import ast
import contextlib
import io
import json
import traceback

_source = ${JSON.stringify(currentItem.command)}
_stdout = io.StringIO()

try:
    _tree = ast.parse(_source, mode="exec")
    with contextlib.redirect_stdout(_stdout):
        if len(_tree.body) == 1 and isinstance(_tree.body[0], ast.Expr):
            _value = eval(
                compile(ast.Expression(_tree.body[0].value), "<console>", "eval"),
                _workbook_console_ns,
                _workbook_console_ns,
            )
            if _value is not None:
                print(repr(_value))
        else:
            exec(compile(_tree, "<console>", "exec"), _workbook_console_ns, _workbook_console_ns)

    _console_result = json.dumps({
        "output": _stdout.getvalue().rstrip(),
        "isError": False,
    })
except Exception:
    _console_result = json.dumps({
        "output": traceback.format_exc().rstrip(),
        "isError": True,
    })

_console_result
`);

      const parsed = JSON.parse(String(result));
      const output = String(parsed.output ?? "");
      const displayLine = output
        ? `>>> ${currentItem.command}\n${output}`
        : `>>> ${currentItem.command}`;
      setHistory((previous) => [...previous, displayLine]);
      updateCurrent({
        output,
        executed: true,
        isError: Boolean(parsed.isError),
      });
    } catch (error: any) {
      const output = String(error?.message ?? error);
      setHistory((previous) => [
        ...previous,
        `>>> ${currentItem.command}\n${output}`,
      ]);
      updateCurrent({ output, executed: true, isError: true });
    } finally {
      setRunning(false);
    }
  }

  async function resetConsole() {
    await resetNamespace();
    setHistory([]);
    onChange(serializeAnswer({ kind: "console", items: {} }));
    setCurrentIndex(0);
  }

  if (!currentItem) {
    return <div>Console 명령이 없습니다.</div>;
  }

  const completedCount = problem.items.filter(
    (item) => answer.items[item.id]?.executed,
  ).length;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          marginBottom: 12,
          flexWrap: "wrap",
        }}
      >
        <div style={{ fontWeight: 800 }}>
          명령 {currentIndex + 1} / {problem.items.length}
          <span style={{ marginLeft: 10, fontWeight: 500, opacity: 0.65 }}>
            실행 완료 {completedCount}개
          </span>
        </div>
        <button
          type="button"
          onClick={resetConsole}
          disabled={!pyReady || running}
          style={{
            padding: "8px 12px",
            borderRadius: 9,
            border: "1px solid #ddd",
          }}
        >
          Console 전체 초기화
        </button>
      </div>

      <div
        style={{
          padding: 16,
          borderRadius: 14,
          background: "#f8fafc",
          border: "1px solid #e2e8f0",
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 8 }}>
          현재 명령
        </div>
        <pre
          style={{
            margin: 0,
            padding: 14,
            borderRadius: 10,
            background: "#111827",
            color: "#f9fafb",
            fontSize: 15,
            whiteSpace: "pre-wrap",
          }}
        >
          {currentItem.command}
        </pre>
        {currentItem.prompt && (
          <div style={{ marginTop: 10, lineHeight: 1.6 }}>
            {currentItem.prompt}
          </div>
        )}
        <button
          type="button"
          onClick={runCurrentCommand}
          disabled={!pyReady || running}
          style={{
            marginTop: 12,
            padding: "10px 15px",
            borderRadius: 10,
            border: "none",
            background: "#111827",
            color: "#fff",
            opacity: !pyReady || running ? 0.6 : 1,
          }}
        >
          {!pyReady
            ? "Python 준비 중..."
            : running
              ? "실행 중..."
              : "현재 명령 실행"}
        </button>
      </div>

      <div
        style={{
          marginTop: 14,
          padding: 14,
          minHeight: 150,
          borderRadius: 12,
          background: "#050816",
          color: "#d1fae5",
          border: "1px solid #1f2937",
        }}
      >
        <div style={{ fontWeight: 800, marginBottom: 8 }}>Console</div>
        <pre style={{ margin: 0, whiteSpace: "pre-wrap", lineHeight: 1.55 }}>
          {history.length
            ? history.join("\n\n")
            : "명령을 실행하면 결과가 여기에 표시됩니다."}
        </pre>
      </div>

      <div style={{ marginTop: 14 }}>
        <label style={{ display: "block", fontWeight: 800, marginBottom: 8 }}>
          이 명령의 동작과 결과의 의미
        </label>
        <textarea
          value={currentAnswer.explanation}
          onChange={(event) =>
            updateCurrent({ explanation: event.target.value })
          }
          placeholder="예: 정수 12를 변수 A에 저장한다. 대입문이므로 화면에는 별도의 값이 출력되지 않는다."
          style={{
            width: "100%",
            minHeight: 120,
            padding: 12,
            borderRadius: 12,
            border: "1px solid #ddd",
            fontSize: 14,
            lineHeight: 1.6,
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 10,
          marginTop: 14,
        }}
      >
        <button
          type="button"
          onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))}
          disabled={currentIndex === 0}
          style={{
            padding: "9px 13px",
            borderRadius: 9,
            border: "1px solid #ddd",
          }}
        >
          이전 명령
        </button>
        <button
          type="button"
          onClick={() =>
            setCurrentIndex((index) =>
              Math.min(problem.items.length - 1, index + 1),
            )
          }
          disabled={currentIndex === problem.items.length - 1}
          style={{
            padding: "9px 13px",
            borderRadius: 9,
            border: "1px solid #ddd",
          }}
        >
          다음 명령
        </button>
      </div>
    </div>
  );
}
