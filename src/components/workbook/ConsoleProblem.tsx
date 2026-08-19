"use client";

import React, { useEffect, useMemo, useState } from "react";
import type { ConsoleProblem as ConsoleProblemData } from "@/types/workbook";

type ConsoleHistoryItem = {
  command: string;
  output: string;
  isError?: boolean;
};

type ConsoleAnswer = {
  kind: "console";
  answer: string;
  history: ConsoleHistoryItem[];
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

function makeEmptyAnswer(): ConsoleAnswer {
  return {
    kind: "console",
    answer: "",
    history: [],
  };
}

function parseAnswer(value: string): ConsoleAnswer {
  if (!value) return makeEmptyAnswer();

  try {
    const parsed = JSON.parse(value);

    if (
      parsed?.kind === "console" &&
      typeof parsed.answer === "string" &&
      Array.isArray(parsed.history)
    ) {
      return {
        kind: "console",
        answer: parsed.answer,
        history: parsed.history.map((item: any) => ({
          command: String(item?.command ?? ""),
          output: String(item?.output ?? ""),
          isError: Boolean(item?.isError),
        })),
      };
    }

    // 기존 명령별 Console 답안 형식을 새 형식으로 자동 변환한다.
    if (
      parsed?.kind === "console" &&
      parsed.items &&
      typeof parsed.items === "object"
    ) {
      const entries = Object.values(parsed.items) as any[];

      const answerLines = entries
        .map((item, index) => {
          const explanation = String(item?.explanation ?? "").trim();
          return explanation ? `${index + 1}. ${explanation}` : "";
        })
        .filter(Boolean);

      const history = entries
        .filter((item) => item?.executed && item?.command)
        .map((item) => ({
          command: String(item.command),
          output: String(item?.output ?? ""),
          isError: Boolean(item?.isError),
        }));

      return {
        kind: "console",
        answer: answerLines.join("\n"),
        history,
      };
    }
  } catch {
    return {
      kind: "console",
      answer: value,
      history: [],
    };
  }

  return makeEmptyAnswer();
}

function serializeAnswer(answer: ConsoleAnswer) {
  return JSON.stringify(answer);
}

export function consoleAnswerToText(value: string) {
  const answer = parseAnswer(value);

  const historyText =
    answer.history.length > 0
      ? answer.history
          .map((item) =>
            item.output
              ? `>>> ${item.command}\n${item.output}`
              : `>>> ${item.command}`,
          )
          .join("\n\n")
      : "(실행 기록 없음)";

  return [
    "[학생 답안]",
    answer.answer.trim() || "(작성하지 않음)",
    "",
    "[Console 실행 기록]",
    historyText,
  ].join("\n");
}

export default function ConsoleProblem({
  problem,
  value,
  onChange,
  pyodide,
  pyReady,
}: ConsoleProblemProps) {
  const [running, setRunning] = useState(false);
  const [typedCommand, setTypedCommand] = useState("");
  const [workspace, setWorkspace] = useState<WorkspaceItem[]>([]);
  const [figures, setFigures] = useState<string[]>([]);

  const answer = useMemo(() => parseAnswer(value), [value]);

  function updateAnswer(patch: Partial<ConsoleAnswer>) {
    onChange(
      serializeAnswer({
        ...answer,
        ...patch,
      }),
    );
  }

  async function resetNamespace() {
    if (!pyodide) return;

    const setup = problem.setupCode ?? "";

    // setupCode에 import가 있으면 필요한 패키지만 그때 로드한다.
    if (setup.trim()) {
      await pyodide.loadPackagesFromImports(setup);
    }

    await pyodide.runPythonAsync(`
import builtins

_workbook_console_ns = {
    "__builtins__": builtins.__dict__
}

exec(
    ${JSON.stringify(setup)},
    _workbook_console_ns,
    _workbook_console_ns
)
`);
  }

  useEffect(() => {
    setTypedCommand("");
    setWorkspace([]);
    setFigures([]);

    if (pyReady) {
      resetNamespace().catch(() => undefined);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problem.id, pyReady]);

  async function runTypedCommand() {
    if (!pyodide) return;

    const source = typedCommand.trim();
    if (!source) return;

    setRunning(true);

    try {
      // 사용자가 Console에서 새 패키지를 import하면 그 패키지만 필요 시점에 로드한다.
      await pyodide.loadPackagesFromImports(source);

      const result = await pyodide.runPythonAsync(`
import ast
import base64
import contextlib
import io
import json
import traceback
import types

_source = ${JSON.stringify(source)}
_stdout = io.StringIO()
_is_error = False

try:
    _tree = ast.parse(_source, mode="exec")

    with contextlib.redirect_stdout(_stdout):
        if len(_tree.body) == 1 and isinstance(_tree.body[0], ast.Expr):
            _value = eval(
                compile(
                    ast.Expression(_tree.body[0].value),
                    "<console>",
                    "eval",
                ),
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

# 현재 matplotlib Figure 수집
_figures = []

try:
    import sys

    if "matplotlib.pyplot" in sys.modules:
        import matplotlib.pyplot as plt

        for _number in plt.get_fignums():
            _figure = plt.figure(_number)
            _buffer = io.BytesIO()
            _figure.savefig(
                _buffer,
                format="png",
                bbox_inches="tight",
            )
            _buffer.seek(0)

            _figures.append(
                base64.b64encode(
                    _buffer.read()
                ).decode("ascii")
            )
except Exception:
    _figures = []

# Workspace용 주요 변수 수집
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

      updateAnswer({
        history: [
          ...answer.history,
          {
            command: source,
            output: String(parsed?.output ?? ""),
            isError: Boolean(parsed?.isError),
          },
        ],
      });

      setFigures(
        Array.isArray(parsed?.figures)
          ? parsed.figures.map((figure: unknown) => String(figure))
          : [],
      );

      setWorkspace(
        Array.isArray(parsed?.workspace)
          ? parsed.workspace.map((item: any) => ({
              name: String(item?.name ?? ""),
              type: String(item?.type ?? ""),
              preview: String(item?.preview ?? ""),
              shape: item?.shape ? String(item.shape) : undefined,
            }))
          : [],
      );

      setTypedCommand("");
    } catch (error: any) {
      updateAnswer({
        history: [
          ...answer.history,
          {
            command: source,
            output: String(error?.message ?? error),
            isError: true,
          },
        ],
      });

      setTypedCommand("");
    } finally {
      setRunning(false);
    }
  }

  async function resetConsole() {
    await resetNamespace();

    updateAnswer({
      history: [],
    });

    setTypedCommand("");
    setWorkspace([]);
    setFigures([]);
  }

  function clearOutputOnly() {
    updateAnswer({
      history: [],
    });
  }

  return (
    <div>
      <div
        style={{
          marginTop: 4,
          padding: 14,
          minHeight: 180,
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
            marginBottom: 10,
          }}
        >
          <div style={{ fontWeight: 800 }}>Python Console</div>

          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              justifyContent: "flex-end",
            }}
          >
            {answer.history.length > 0 && (
              <button
                type="button"
                onClick={clearOutputOnly}
                disabled={running}
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

            <button
              type="button"
              onClick={resetConsole}
              disabled={!pyReady || running}
              style={{
                padding: "5px 9px",
                borderRadius: 7,
                border: "1px solid #374151",
                background: "transparent",
                color: "#d1fae5",
                fontSize: 12,
                opacity: !pyReady || running ? 0.55 : 1,
              }}
            >
              Console 초기화
            </button>
          </div>
        </div>

        <pre
          style={{
            margin: 0,
            whiteSpace: "pre-wrap",
            lineHeight: 1.55,
            fontFamily:
              'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
          }}
        >
          {answer.history
            .map((item) =>
              item.output
                ? `>>> ${item.command}\n${item.output}`
                : `>>> ${item.command}`,
            )
            .join("\n\n")}
        </pre>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: answer.history.length ? 14 : 0,
            fontFamily:
              'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
          }}
        >
          <span style={{ flex: "0 0 auto", color: "#86efac" }}>
            &gt;&gt;&gt;
          </span>

          <input
            value={typedCommand}
            onChange={(event) => setTypedCommand(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                void runTypedCommand();
              }
            }}
            disabled={!pyReady || running}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="Python Console 명령 입력"
            placeholder={
              !pyReady
                ? "Python 준비 중..."
                : running
                  ? "실행 중..."
                  : "명령을 입력하고 Enter"
            }
            style={{
              flex: 1,
              minWidth: 0,
              border: "none",
              outline: "none",
              background: "transparent",
              color: "#d1fae5",
              caretColor: "#d1fae5",
              font: "inherit",
              padding: "4px 0",
            }}
          />

          <span
            style={{
              flex: "0 0 auto",
              fontSize: 11,
              color: "#6b7280",
            }}
          >
            Enter 실행
          </span>
        </div>
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
                  <tr
                    style={{
                      textAlign: "left",
                      background: "#f8fafc",
                    }}
                  >
                    <th
                      style={{
                        padding: 8,
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      변수
                    </th>
                    <th
                      style={{
                        padding: 8,
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      자료형
                    </th>
                    <th
                      style={{
                        padding: 8,
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
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
                        <code
                          style={{
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                          }}
                        >
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
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

      <div style={{ marginTop: 18 }}>
        <label
          style={{
            display: "block",
            fontWeight: 900,
            marginBottom: 8,
          }}
        >
          내 답안
        </label>

        <textarea
          value={answer.answer}
          onChange={(event) =>
            updateAnswer({
              answer: event.target.value,
            })
          }
          placeholder="여기에 답안을 작성하세요."
          style={{
            width: "97.5%",
            minHeight: 300,
            padding: 14,
            borderRadius: 12,
            border: "1px solid #d1d5db",
            fontSize: 14,
            lineHeight: 1.7,
            resize: "vertical",
          }}
        />
      </div>
    </div>
  );
}
