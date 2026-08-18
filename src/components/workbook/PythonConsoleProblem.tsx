"use client";

import React, { useEffect, useMemo, useState } from "react";
import Editor from "@monaco-editor/react";
import type { WorkbookProblem } from "@/types/workbook";

type ConsoleHistoryItem = {
  command: string;
  output: string;
  isError?: boolean;
};

type PythonConsoleAnswer = {
  kind: "python-console";
  code: string;
  answer: string;
  scriptOutput: string;
  history: ConsoleHistoryItem[];
};

type WorkspaceItem = {
  name: string;
  type: string;
  preview: string;
  shape?: string;
};

type PythonConsoleProblemProps = {
  problem: WorkbookProblem;
  value: string;
  onChange: (value: string) => void;
  pyodide: any;
  pyReady: boolean;
};

function starterCodeOf(problem: WorkbookProblem) {
  return String((problem as any).starterCode ?? (problem as any).code ?? "");
}

export function isPythonConsoleProblem(problem: WorkbookProblem) {
  return (
    (problem as any).type === "python" &&
    (problem as any).consoleEnabled === true
  );
}

export function createPythonConsoleInitialValue(problem: WorkbookProblem) {
  return JSON.stringify({
    kind: "python-console",
    code: starterCodeOf(problem),
    answer: "",
    scriptOutput: "",
    history: [],
  } satisfies PythonConsoleAnswer);
}

export function parsePythonConsoleAnswer(
  value: string,
  fallbackCode = "",
): PythonConsoleAnswer {
  if (!value) {
    return {
      kind: "python-console",
      code: fallbackCode,
      answer: "",
      scriptOutput: "",
      history: [],
    };
  }

  try {
    const parsed = JSON.parse(value);

    if (parsed?.kind === "python-console") {
      return {
        kind: "python-console",
        code:
          typeof parsed.code === "string"
            ? parsed.code
            : fallbackCode,
        answer:
          typeof parsed.answer === "string"
            ? parsed.answer
            : "",
        scriptOutput:
          typeof parsed.scriptOutput === "string"
            ? parsed.scriptOutput
            : "",
        history: Array.isArray(parsed.history)
          ? parsed.history.map((item: any) => ({
              command: String(item?.command ?? ""),
              output: String(item?.output ?? ""),
              isError: Boolean(item?.isError),
            }))
          : [],
      };
    }
  } catch {
    // 이전에 일반 Python 문제였던 경우 저장된 문자열을 코드로 간주한다.
    return {
      kind: "python-console",
      code: value || fallbackCode,
      answer: "",
      scriptOutput: "",
      history: [],
    };
  }

  return {
    kind: "python-console",
    code: fallbackCode,
    answer: "",
    scriptOutput: "",
    history: [],
  };
}

export function pythonConsoleAnswerToText(value: string) {
  const parsed = parsePythonConsoleAnswer(value);

  const historyText =
    parsed.history.length > 0
      ? parsed.history
          .map((item) =>
            item.output
              ? `>>> ${item.command}\n${item.output}`
              : `>>> ${item.command}`,
          )
          .join("\n\n")
      : "(실행 기록 없음)";

  return [
    "[작성 코드]",
    parsed.code.trim() || "(작성하지 않음)",
    "",
    "[Python 실행 결과]",
    parsed.scriptOutput.trim() || "(출력 없음)",
    "",
    "[Console 실행 기록]",
    historyText,
    "",
    "[학생 답안]",
    parsed.answer.trim() || "(작성하지 않음)",
  ].join("\n");
}

export function pythonConsoleAnswerForDisplay(value: string) {
  return parsePythonConsoleAnswer(value).answer;
}

export default function PythonConsoleProblem({
  problem,
  value,
  onChange,
  pyodide,
  pyReady,
}: PythonConsoleProblemProps) {
  const fallbackCode = starterCodeOf(problem);

  const parsed = useMemo(
    () => parsePythonConsoleAnswer(value, fallbackCode),
    [value, fallbackCode],
  );

  const [runningScript, setRunningScript] = useState(false);
  const [runningConsole, setRunningConsole] = useState(false);
  const [typedCommand, setTypedCommand] = useState("");
  const [workspace, setWorkspace] = useState<WorkspaceItem[]>([]);
  const [figures, setFigures] = useState<string[]>([]);

  function updateAnswer(patch: Partial<PythonConsoleAnswer>) {
    onChange(
      JSON.stringify({
        ...parsed,
        ...patch,
        kind: "python-console",
      }),
    );
  }

  async function ensureNamespace(reset = false) {
    if (!pyodide) return;

    await pyodide.runPythonAsync(`
import builtins

if ${reset ? "True" : "False"} or "_workbook_python_console_ns" not in globals():
    _workbook_python_console_ns = {
        "__builtins__": builtins.__dict__
    }
`);
  }

  async function collectState() {
    if (!pyodide) {
      return {
        figures: [] as string[],
        workspace: [] as WorkspaceItem[],
      };
    }

    const result = await pyodide.runPythonAsync(`
import base64
import io
import json
import types

_pc_figures = []

try:
    import matplotlib
    matplotlib.use("AGG")
    import matplotlib.pyplot as plt

    for _pc_number in plt.get_fignums():
        _pc_figure = plt.figure(_pc_number)
        _pc_buffer = io.BytesIO()
        _pc_figure.savefig(
            _pc_buffer,
            format="png",
            bbox_inches="tight",
        )
        _pc_buffer.seek(0)
        _pc_figures.append(
            base64.b64encode(
                _pc_buffer.read()
            ).decode("ascii")
        )
except Exception:
    _pc_figures = []

_pc_workspace = []

for _pc_name in sorted(_workbook_python_console_ns.keys()):
    if _pc_name.startswith("_") or _pc_name == "__builtins__":
        continue

    _pc_object = _workbook_python_console_ns[_pc_name]

    if isinstance(_pc_object, types.ModuleType) or callable(_pc_object):
        continue

    try:
        _pc_preview = repr(_pc_object)
    except Exception:
        _pc_preview = "<표시할 수 없음>"

    if len(_pc_preview) > 240:
        _pc_preview = _pc_preview[:237] + "..."

    _pc_shape = ""

    try:
        if hasattr(_pc_object, "shape"):
            _pc_shape = str(_pc_object.shape)
    except Exception:
        _pc_shape = ""

    _pc_workspace.append({
        "name": _pc_name,
        "type": type(_pc_object).__name__,
        "preview": _pc_preview,
        "shape": _pc_shape,
    })

json.dumps({
    "figures": _pc_figures,
    "workspace": _pc_workspace,
})
`);

    const state = JSON.parse(String(result));

    return {
      figures: Array.isArray(state?.figures)
        ? state.figures.map((item: unknown) => String(item))
        : [],
      workspace: Array.isArray(state?.workspace)
        ? state.workspace.map((item: any) => ({
            name: String(item?.name ?? ""),
            type: String(item?.type ?? ""),
            preview: String(item?.preview ?? ""),
            shape: item?.shape ? String(item.shape) : undefined,
          }))
        : [],
    };
  }

  useEffect(() => {
    setTypedCommand("");
    setWorkspace([]);
    setFigures([]);

    // 새 문제로 이동했을 때 이전 결합형 문제의 변수가 섞이지 않도록 한다.
    if (pyReady && pyodide) {
      ensureNamespace(true).catch(() => undefined);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problem.id, pyReady]);

  async function runScript() {
    if (!pyodide || !pyReady) return;

    setRunningScript(true);

    try {
      await pyodide.loadPackage(["numpy", "matplotlib"]);
      await ensureNamespace(true);

      // Script를 다시 실행할 때는 이전 Figure를 지운다.
await pyodide.runPythonAsync(`
import matplotlib
matplotlib.use("AGG")

import matplotlib.pyplot as plt
plt.close("all")
`);

      const result = await pyodide.runPythonAsync(`
import contextlib
import io
import json
import traceback

_pc_source = ${JSON.stringify(parsed.code)}
_pc_stdout = io.StringIO()
_pc_is_error = False

try:
    with contextlib.redirect_stdout(_pc_stdout):
        exec(
            compile(_pc_source, "<python-script>", "exec"),
            _workbook_python_console_ns,
            _workbook_python_console_ns,
        )
except Exception:
    _pc_is_error = True
    _pc_stdout.write(traceback.format_exc().rstrip())

json.dumps({
    "output": _pc_stdout.getvalue().rstrip(),
    "isError": _pc_is_error,
})
`);

      const execution = JSON.parse(String(result));
      const output = String(execution?.output ?? "");

      updateAnswer({
        scriptOutput: output,
        // Script를 다시 실행하면 그 뒤 Console 실습은 새로 시작한다.
        history: [],
      });

      const state = await collectState();
      setWorkspace(state.workspace);
      setFigures(state.figures);
      setTypedCommand("");
    } catch (error: any) {
      updateAnswer({
        scriptOutput: `에러 발생:\n${String(error?.message ?? error)}`,
        history: [],
      });
      setWorkspace([]);
      setFigures([]);
    } finally {
      setRunningScript(false);
    }
  }

  async function runConsoleCommand() {
    if (!pyodide || !pyReady) return;

    const source = typedCommand.trim();
    if (!source) return;

    setRunningConsole(true);

    try {
      await ensureNamespace(false);

      const result = await pyodide.runPythonAsync(`
import ast
import contextlib
import io
import json
import traceback

_pc_source = ${JSON.stringify(source)}
_pc_stdout = io.StringIO()
_pc_is_error = False

try:
    _pc_tree = ast.parse(_pc_source, mode="exec")

    with contextlib.redirect_stdout(_pc_stdout):
        if (
            len(_pc_tree.body) == 1
            and isinstance(_pc_tree.body[0], ast.Expr)
        ):
            _pc_value = eval(
                compile(
                    ast.Expression(_pc_tree.body[0].value),
                    "<python-console>",
                    "eval",
                ),
                _workbook_python_console_ns,
                _workbook_python_console_ns,
            )

            if _pc_value is not None:
                print(repr(_pc_value))
        else:
            exec(
                compile(
                    _pc_tree,
                    "<python-console>",
                    "exec",
                ),
                _workbook_python_console_ns,
                _workbook_python_console_ns,
            )

except Exception:
    _pc_is_error = True
    _pc_stdout.write(traceback.format_exc().rstrip())

json.dumps({
    "output": _pc_stdout.getvalue().rstrip(),
    "isError": _pc_is_error,
})
`);

      const execution = JSON.parse(String(result));

      updateAnswer({
        history: [
          ...parsed.history,
          {
            command: source,
            output: String(execution?.output ?? ""),
            isError: Boolean(execution?.isError),
          },
        ],
      });

      // Console에서는 Figure를 닫지 않는다.
      // 따라서 plt.plot()을 추가 실행하면 Script에서 만든 Figure 위에 겹쳐진다.
      const state = await collectState();
      setWorkspace(state.workspace);
      setFigures(state.figures);
      setTypedCommand("");
    } catch (error: any) {
      updateAnswer({
        history: [
          ...parsed.history,
          {
            command: source,
            output: String(error?.message ?? error),
            isError: true,
          },
        ],
      });
      setTypedCommand("");
    } finally {
      setRunningConsole(false);
    }
  }

  async function resetAll() {
    if (!pyodide) return;

    await ensureNamespace(true);

    try {
      await pyodide.runPythonAsync(`
import matplotlib.pyplot as plt
plt.close("all")
`);
    } catch {
      // ignore
    }

    updateAnswer({
      scriptOutput: "",
      history: [],
    });

    setTypedCommand("");
    setWorkspace([]);
    setFigures([]);
  }

  return (
    <div>
      <div style={{ fontWeight: 900, marginBottom: 8 }}>
        Python Script
      </div>

      <Editor
        height="340px"
        defaultLanguage="python"
        theme="vs-dark"
        value={parsed.code}
        onChange={(nextValue) =>
          updateAnswer({
            code: nextValue ?? "",
          })
        }
        options={{
          fontSize: 15,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          wordWrap: "on",
        }}
      />

      <div
        style={{
          marginTop: 12,
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <button
          type="button"
          onClick={runScript}
          disabled={!pyReady || runningScript || runningConsole}
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #ddd",
            background: "#111827",
            color: "#fff",
            opacity:
              !pyReady || runningScript || runningConsole
                ? 0.6
                : 1,
          }}
        >
          {runningScript
            ? "실행 중..."
            : !pyReady
              ? "Python 준비 중..."
              : "코드 실행"}
        </button>

        <button
          type="button"
          onClick={resetAll}
          disabled={!pyReady || runningScript || runningConsole}
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #ddd",
          }}
        >
          실행 환경 초기화
        </button>
      </div>

      {parsed.scriptOutput && (
        <div
          style={{
            marginTop: 12,
            padding: 12,
            borderRadius: 12,
            border: "1px solid #ddd",
            background: "#0b1020",
            color: "#e6edf3",
          }}
        >
          <div style={{ fontWeight: 900, marginBottom: 6 }}>
            Python 실행 결과
          </div>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            {parsed.scriptOutput}
          </pre>
        </div>
      )}

      <div
        style={{
          marginTop: 18,
          padding: 14,
          minHeight: 160,
          borderRadius: 12,
          background: "#050816",
          color: "#d1fae5",
          border: "1px solid #1f2937",
        }}
      >
        <div style={{ fontWeight: 800, marginBottom: 10 }}>
          Python Console
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
          {parsed.history
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
            marginTop: parsed.history.length ? 14 : 0,
            fontFamily:
              'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
          }}
        >
          <span style={{ color: "#86efac" }}>&gt;&gt;&gt;</span>

          <input
            value={typedCommand}
            onChange={(event) =>
              setTypedCommand(event.target.value)
            }
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                void runConsoleCommand();
              }
            }}
            disabled={!pyReady || runningScript || runningConsole}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            placeholder={
              !pyReady
                ? "Python 준비 중..."
                : runningConsole
                  ? "실행 중..."
                  : "추가 명령을 입력하고 Enter"
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
        </div>
      </div>

      <div
        style={{
          marginTop: 14,
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(280px, 1fr))",
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
          <div style={{ fontWeight: 800, marginBottom: 10 }}>
            Workspace
          </div>

          {workspace.length === 0 ? (
            <div style={{ opacity: 0.6, fontSize: 14 }}>
              Script를 실행하면 생성된 변수가 여기에 표시됩니다.
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
                    <th style={{ padding: 8 }}>변수</th>
                    <th style={{ padding: 8 }}>자료형</th>
                    <th style={{ padding: 8 }}>값</th>
                  </tr>
                </thead>
                <tbody>
                  {workspace.map((item) => (
                    <tr key={item.name}>
                      <td
                        style={{
                          padding: 8,
                          borderTop: "1px solid #f1f5f9",
                          fontWeight: 700,
                          verticalAlign: "top",
                        }}
                      >
                        {item.name}
                      </td>
                      <td
                        style={{
                          padding: 8,
                          borderTop: "1px solid #f1f5f9",
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
                          borderTop: "1px solid #f1f5f9",
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
          <div style={{ fontWeight: 800, marginBottom: 10 }}>
            Figure
          </div>

          {figures.length === 0 ? (
            <div style={{ opacity: 0.6, fontSize: 14 }}>
              그래프가 생성되면 여기에 표시됩니다.
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
          value={parsed.answer}
          onChange={(event) =>
            updateAnswer({
              answer: event.target.value,
            })
          }
          placeholder="여기에 답안을 작성하세요."
          style={{
            width: "97.5%",
            minHeight: 160,
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
