"use client";

import React from "react";
import Editor from "@monaco-editor/react";

type PythonProblemProps = {
  value: string;
  onChange: (value: string) => void;
  runningCode: boolean;
  codeOutput: string | null;
  plotImage: string | null;
  onRunPython: () => void;
};

/**
 * 과거 저장 형식도 복구할 수 있도록 Python 코드만 추출한다.
 *
 * 지원 형식:
 * 1) 현재 형식: 순수 Python 코드 문자열
 * 2) 이전 JSON 형식: {"kind":"python","code":"...", ...}
 * 3) 잘못 저장됐던 채점용 문자열:
 *    [작성 코드]
 *    ...
 *    [실행 결과]
 *    ...
 */
export function pythonAnswerToCode(value: string) {
  const raw = String(value ?? "");

  // 이전 JSON 형식 복구
  try {
    const parsed = JSON.parse(raw);
    if (parsed?.kind === "python" && typeof parsed.code === "string") {
      return parsed.code;
    }
  } catch {
    // plain text
  }

  // 이전에 DB에 잘못 저장된 채점용 문자열 복구
  const marker = "[작성 코드]";
  const outputMarker = "[실행 결과]";

  if (raw.startsWith(marker)) {
    const start = marker.length;
    const end = raw.indexOf(outputMarker, start);

    if (end >= 0) {
      return raw.slice(start, end).trim();
    }
  }

  return raw;
}

export function pythonAnswerToText(
  value: string,
  latestExecutionOutput?: string | null,
) {
  const code = pythonAnswerToCode(value);

  return [
    "[작성 코드]",
    code || "(작성하지 않음)",
    "",
    "[실행 결과]",
    latestExecutionOutput || "(실행하지 않음)",
  ].join("\n");
}

export default function PythonProblem({
  value,
  onChange,
  runningCode,
  codeOutput,
  plotImage,
  onRunPython,
}: PythonProblemProps) {
  const code = pythonAnswerToCode(value);

  return (
    <>
      <Editor
        height="320px"
        defaultLanguage="python"
        theme="vs-dark"
        value={code}
        onChange={(nextValue) => onChange(nextValue || "")}
        options={{
          fontSize: 15,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          wordWrap: "on",
        }}
      />

      <button
        type="button"
        onClick={onRunPython}
        disabled={runningCode}
        style={{
          marginTop: 12,
          padding: "10px 14px",
          borderRadius: 10,
          border: "1px solid #ddd",
          background: "#111827",
          color: "#fff",
          opacity: runningCode ? 0.7 : 1,
        }}
      >
        {runningCode ? "실행 중..." : "코드 실행"}
      </button>

      {codeOutput && (
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
            <span
              style={{
                marginLeft: 8,
                fontSize: 12,
                fontWeight: 700,
                color: "#a5b4fc",
              }}
            >
              저장 및 AI 채점에 자동 반영
            </span>
          </div>

          <pre style={{ whiteSpace: "pre-wrap", margin: 0, lineHeight: 1.5 }}>
            {codeOutput}
          </pre>

          {plotImage && (
            <img
              src={plotImage}
              alt="plot"
              style={{
                marginTop: 16,
                maxWidth: "100%",
                borderRadius: 12,
                background: "#fff",
                padding: 10,
              }}
            />
          )}
        </div>
      )}
    </>
  );
}
