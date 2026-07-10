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

type WorkspaceItem = {
  name: string;
  type: string;
  preview: string;
  shape?: string;
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
  const [figures, setFigures] = useState<string[]>([]);
  const [workspace, setWorkspace] = useState<WorkspaceItem[]>([]);

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
    setFigures([]);
    setWorkspace([]);
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
import base64
import contextlib
import io
import json
import traceback
import types

_source = ${JSON.stringify(currentItem.command)}
_stdout = io.StringIO()
_is_error = False

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
            exec(
                compile(_tree, "<console>", "exec"),
                _workbook_console_ns,
                _workbook_console_ns,
            )
except Exception:
    _is_error = True
    _stdout.write(traceback.format_exc().rstrip())

# 현재 matplotlib Figure를 PNG(Base64)로 변환한다.
_figures = []
try:
    import matplotlib
    matplotlib.use("AGG")
    import matplotlib.pyplot as plt

    for _number in plt.get_fignums():
        _figure = plt.figure(_number)
        _buffer = io.BytesIO()
        _figure.savefig(_buffer, format="png", bbox_inches="tight")
        _buffer.seek(0)
        _figures.append(base64.b64encode(_buffer.read()).decode("ascii"))
except Exception:
    # matplotlib을 사용하지 않은 명령에서는 Figure 목록을 비워 둔다.
    _figures = []

# 학생이 만든 주요 변수를 Workspace용으로 정리한다.
_workspace = []
for _name in sorted(_workbook_console_ns.keys()):
    if _name.startswith("_") or _name == "__builtins__":
        continue

    _object = _workbook_console_ns[_name]
    if isinstance(_object, types.ModuleType) or callable(_object):
        continue

    try:
        _preview = repr(_object)
    except Exception:
        _preview = "<표시할 수 없음>"

    if len(_preview) > 240:
        _preview = _preview[:237] + "..."

    _shape = ""
    try:
        if hasattr(_object, "shape"):
            _shape = str(_object.shape)
    except Exception:
        _shape = ""

    _workspace.append({
        "name": _name,
        "type": type(_object).__name__,
        "preview": _preview,
        "shape": _shape,
    })

_console_result = json.dumps({
    "output": _stdout.getvalue().rstrip(),
    "isError": _is_error,
    "figures": _figures,
    "workspace": _workspace,
})

_console_result
`);

      const parsed = JSON.parse(String(result));
      const output = String(parsed.output ?? "");
      const displayLine = output
        ? `>>> ${currentItem.command}\n${output}`
        : `>>> ${currentItem.command}`;

      setHistory((previous) => [...previous, displayLine]);
      setFigures(
        Array.isArray(parsed.figures)
          ? parsed.figures.map((figure: unknown) => String(figure))
          : [],
      );
      setWorkspace(
        Array.isArray(parsed.workspace)
          ? parsed.workspace.map((item: any) => ({
              name: String(item?.name ?? ""),
              type: String(item?.type ?? ""),
              preview: String(item?.preview ?? ""),
              shape: item?.shape ? String(item.shape) : undefined,
            }))
          : [],
      );

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
    setFigures([]);
    setWorkspace([]);
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 10,
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <div style={{ fontWeight: 800 }}>Console</div>
          {history.length > 0 && (
            <button
              type="button"
              onClick={() => setHistory([])}
              style={{
                padding: "5px 9px",
                borderRadius: 7,
                border: "1px solid #374151",
                background: "transparent",
                color: "#d1fae5",
                fontSize: 12,
              }}
            >
              출력만 지우기
            </button>
          )}
        </div>
        <pre style={{ margin: 0, whiteSpace: "pre-wrap", lineHeight: 1.55 }}>
          {history.length
            ? history.join("\n\n")
            : "명령을 실행하면 결과가 여기에 표시됩니다."}
        </pre>
      </div>

      <div
        style={{
          marginTop: 14,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 14,
        }}
      >
        <div
          style={{
            padding: 14,
            borderRadius: 12,
            background: "#fff",
            border: "1px solid #e5e7eb",
            minWidth: 0,
          }}
        >
          <div style={{ fontWeight: 800, marginBottom: 10 }}>Workspace</div>
          {workspace.length === 0 ? (
            <div style={{ opacity: 0.6, fontSize: 14 }}>
              생성된 변수가 없습니다.
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 13,
                }}
              >
                <thead>
                  <tr style={{ textAlign: "left", background: "#f8fafc" }}>
                    <th style={{ padding: 8, borderBottom: "1px solid #e5e7eb" }}>
                      변수
                    </th>
                    <th style={{ padding: 8, borderBottom: "1px solid #e5e7eb" }}>
                      자료형
                    </th>
                    <th style={{ padding: 8, borderBottom: "1px solid #e5e7eb" }}>
                      값
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {workspace.map((item) => (
                    <tr key={item.name}>
                      <td
                        style={{
                          padding: 8,
                          borderBottom: "1px solid #f1f5f9",
                          fontWeight: 700,
                          verticalAlign: "top",
                        }}
                      >
                        {item.name}
                      </td>
                      <td
                        style={{
                          padding: 8,
                          borderBottom: "1px solid #f1f5f9",
                          verticalAlign: "top",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.type}
                        {item.shape ? ` ${item.shape}` : ""}
                      </td>
                      <td
                        style={{
                          padding: 8,
                          borderBottom: "1px solid #f1f5f9",
                          verticalAlign: "top",
                        }}
                      >
                        <code style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                          {item.preview}
                        </code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div
          style={{
            padding: 14,
            borderRadius: 12,
            background: "#fff",
            border: "1px solid #e5e7eb",
            minWidth: 0,
          }}
        >
          <div style={{ fontWeight: 800, marginBottom: 10 }}>Figure</div>
          {figures.length === 0 ? (
            <div style={{ opacity: 0.6, fontSize: 14 }}>
              Matplotlib 그래프가 생성되면 여기에 표시됩니다.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {figures.map((figure, index) => (
                <img
                  key={`${figure.slice(0, 24)}-${index}`}
                  src={`data:image/png;base64,${figure}`}
                  alt={`Matplotlib Figure ${index + 1}`}
                  style={{
                    display: "block",
                    width: "100%",
                    maxHeight: 520,
                    objectFit: "contain",
                    borderRadius: 10,
                    border: "1px solid #e5e7eb",
                    background: "#fff",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: 14 }}>
        <label style={{ display: "block", fontWeight: 800, marginBottom: 8 }}>
          내 답안
        </label>
        <textarea
          value={currentAnswer.explanation}
          onChange={(event) =>
            updateCurrent({ explanation: event.target.value })
          }
          placeholder="여기에 답안을 입력하세요."
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
