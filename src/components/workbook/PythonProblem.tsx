"use client";

import React from "react";
import Editor from "@monaco-editor/react";

type PythonProblemProps = {
  problem?: {
    responseEnabled?: boolean;
    responsePrompt?: string;
    responsePlaceholder?: string;
  };
  value: string;
  onChange: (value: string) => void;
  runningCode: boolean;
  codeOutput: string | null;
  plotImage: string | null;
  audioSource: string | null;
  onRunPython: () => void;
};

/**
 * Python 문제 답안은 기존 순수 코드 문자열도 그대로 지원하면서,
 * 서술 답안이 활성화된 문제에서는 JSON으로 코드와 서술을 함께 보관한다.
 */
type PythonAnswerData = {
  kind: "python";
  code: string;
  response?: string;
};

function parsePythonAnswer(value: string): PythonAnswerData {
  const raw = String(value ?? "");

  // 현재/이전 JSON 형식 복구
  try {
    const parsed = JSON.parse(raw);

    if (parsed?.kind === "python" && typeof parsed.code === "string") {
      return {
        kind: "python",
        code: parsed.code,
        response:
          typeof parsed.response === "string"
            ? parsed.response
            : typeof parsed.explanation === "string"
              ? parsed.explanation
              : "",
      };
    }
  } catch {
    // plain text
  }

  // 이전에 DB에 잘못 저장된 채점용 문자열 복구
  const marker = "[작성 코드]";
  const outputMarker = "[실행 결과]";
  const responseMarker = "[서술 답안]";

  if (raw.startsWith(marker)) {
    const codeStart = marker.length;
    const outputIndex = raw.indexOf(outputMarker, codeStart);
    const responseIndex = raw.indexOf(responseMarker, codeStart);

    const codeEndCandidates = [outputIndex, responseIndex].filter(
      (index) => index >= 0,
    );

    const codeEnd =
      codeEndCandidates.length > 0
        ? Math.min(...codeEndCandidates)
        : raw.length;

    let response = "";

    if (responseIndex >= 0) {
      response = raw.slice(responseIndex + responseMarker.length).trim();
    }

    return {
      kind: "python",
      code: raw.slice(codeStart, codeEnd).trim(),
      response,
    };
  }

  return {
    kind: "python",
    code: raw,
    response: "",
  };
}

export function pythonAnswerToCode(value: string) {
  return parsePythonAnswer(value).code;
}

export function pythonAnswerToResponse(value: string) {
  return parsePythonAnswer(value).response ?? "";
}

export function serializePythonAnswer(code: string, response: string) {
  return JSON.stringify({
    kind: "python",
    code,
    response,
  } satisfies PythonAnswerData);
}

export function pythonAnswerToText(
  value: string,
  latestExecutionOutput?: string | null,
  includeResponse = false,
) {
  const parsed = parsePythonAnswer(value);

  const sections = [
    "[작성 코드]",
    parsed.code || "(작성하지 않음)",
    "",
    "[실행 결과]",
    latestExecutionOutput || "(실행하지 않음)",
  ];

  if (includeResponse) {
    sections.push(
      "",
      "[서술 답안]",
      parsed.response || "(작성하지 않음)",
    );
  }

  return sections.join("\n");
}

export default function PythonProblem({
  problem,
  value,
  onChange,
  runningCode,
  codeOutput,
  plotImage,
  audioSource,
  onRunPython,
}: PythonProblemProps) {
  const code = pythonAnswerToCode(value);
  const response = pythonAnswerToResponse(value);
  const responseEnabled = problem?.responseEnabled === true;

  function updateCode(nextCode: string) {
    if (responseEnabled) {
      onChange(serializePythonAnswer(nextCode, response));
      return;
    }

    onChange(nextCode);
  }

  function updateResponse(nextResponse: string) {
    onChange(serializePythonAnswer(code, nextResponse));
  }

  return (
    <>
      <Editor
        height="320px"
        defaultLanguage="python"
        theme="vs-dark"
        value={code}
        onChange={(nextValue) => updateCode(nextValue || "")}
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
              저장 및 답안 채점에 자동 반영
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

          {audioSource && (
            <div style={{ marginTop: 16 }}>
              <audio
                controls
                src={audioSource}
                style={{
                  width: "100%",
                }}
              />
            </div>
          )}
        </div>
      )}

      {responseEnabled && (
        <div
          style={{
            marginTop: 16,
            padding: 14,
            borderRadius: 12,
            border: "1px solid #e5e7eb",
            background: "#fff",
          }}
        >
          <div
            style={{
              fontWeight: 900,
              marginBottom: 8,
              color: "#111827",
            }}
          >
            {problem?.responsePrompt?.trim() || "결과 해석 및 설명"}
          </div>

          <textarea
            value={response}
            onChange={(event) => updateResponse(event.target.value)}
            placeholder={
              problem?.responsePlaceholder?.trim() ||
              "실행 결과를 바탕으로 관찰한 내용이나 풀이를 작성하세요."
            }
            style={{
              width: "100%",
              minHeight: 140,
              padding: 12,
              borderRadius: 10,
              border: "1px solid #d1d5db",
              resize: "vertical",
              fontSize: 15,
              lineHeight: 1.65,
              fontFamily: "inherit",
              boxSizing: "border-box",
            }}
          />

          <div
            style={{
              marginTop: 7,
              color: "#6b7280",
              fontSize: 12,
              lineHeight: 1.5,
            }}
          >
            작성한 설명은 코드 및 실행 결과와 함께 저장·채점에 반영됩니다.
          </div>
        </div>
      )}

    </>
  );
}
