"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import type { ProofProblem as ProofProblemType } from "@/types/workbook";

type ProofAnswerState = {
  kind: "proof";
  inputMethod: "handwriting" | "upload";
  recognizedText: string;
  sourceFileName?: string;
  recognizedAt?: string;
};

type ProofProblemProps = {
  problem: ProofProblemType;
  value: string;
  onChange: (value: string) => void;
};

function parseProofAnswer(
  value: string,
  fallbackMethod: "handwriting" | "upload",
): ProofAnswerState {
  try {
    const parsed = JSON.parse(String(value ?? ""));

    if (
      parsed?.kind === "proof" &&
      (parsed.inputMethod === "handwriting" ||
        parsed.inputMethod === "upload")
    ) {
      return {
        kind: "proof",
        inputMethod: parsed.inputMethod,
        recognizedText: String(parsed.recognizedText ?? ""),
        sourceFileName:
          typeof parsed.sourceFileName === "string"
            ? parsed.sourceFileName
            : undefined,
        recognizedAt:
          typeof parsed.recognizedAt === "string"
            ? parsed.recognizedAt
            : undefined,
      };
    }
  } catch {
    // 이전 plain text 답안과의 호환
  }

  const raw = String(value ?? "").trim();

  return {
    kind: "proof",
    inputMethod: fallbackMethod,
    recognizedText: raw,
  };
}

function serializeProofAnswer(answer: ProofAnswerState) {
  return JSON.stringify(answer);
}

export function proofAnswerToText(value: string) {
  const parsed = parseProofAnswer(value, "handwriting");

  return [
    "[증명 답안]",
    parsed.recognizedText || "(인식된 증명 내용 없음)",
  ].join("\n");
}

export default function ProofProblem({
  problem,
  value,
  onChange,
}: ProofProblemProps) {
  const allowedMode = problem.proofInputMode ?? "both";
  const initialMethod =
    allowedMode === "upload" ? "upload" : "handwriting";

  const parsed = useMemo(
    () => parseProofAnswer(value, initialMethod),
    [value, initialMethod],
  );

  const [method, setMethod] = useState<"handwriting" | "upload">(
    parsed.inputMethod,
  );
  const [recognizedText, setRecognizedText] = useState(
    parsed.recognizedText,
  );
  const [sourceFileName, setSourceFileName] = useState(
    parsed.sourceFileName ?? "",
  );
  const [recognizing, setRecognizing] = useState(false);
  const [recognitionNotice, setRecognitionNotice] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const uploadedDataUrlRef = useRef<string | null>(null);

  useEffect(() => {
    setRecognizedText(parsed.recognizedText);
    setSourceFileName(parsed.sourceFileName ?? "");

    if (
      allowedMode === "both" ||
      parsed.inputMethod === allowedMode
    ) {
      setMethod(parsed.inputMethod);
    }
  }, [
    allowedMode,
    parsed.inputMethod,
    parsed.recognizedText,
    parsed.sourceFileName,
  ]);

  function commit(next: Partial<ProofAnswerState>) {
    const answer: ProofAnswerState = {
      kind: "proof",
      inputMethod: next.inputMethod ?? method,
      recognizedText:
        next.recognizedText ?? recognizedText,
      sourceFileName:
        next.sourceFileName ??
        (sourceFileName || undefined),
      recognizedAt: next.recognizedAt,
    };

    onChange(serializeProofAnswer(answer));
  }

  function switchMethod(nextMethod: "handwriting" | "upload") {
    setMethod(nextMethod);
    setRecognitionNotice("");
    commit({ inputMethod: nextMethod });
  }

  function getCanvasPoint(
    event: React.PointerEvent<HTMLCanvasElement>,
  ) {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    };
  }

  function startDrawing(
    event: React.PointerEvent<HTMLCanvasElement>,
  ) {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.setPointerCapture(event.pointerId);
    drawingRef.current = true;
    lastPointRef.current = getCanvasPoint(event);
  }

  function draw(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawingRef.current) return;

    const canvas = canvasRef.current;
    const point = getCanvasPoint(event);
    const previous = lastPointRef.current;

    if (!canvas || !point || !previous) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = "#111827";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    ctx.moveTo(previous.x, previous.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();

    lastPointRef.current = point;
  }

  function stopDrawing(
    event?: React.PointerEvent<HTMLCanvasElement>,
  ) {
    drawingRef.current = false;
    lastPointRef.current = null;

    if (event && canvasRef.current) {
      try {
        canvasRef.current.releasePointerCapture(
          event.pointerId,
        );
      } catch {
        // ignore
      }
    }
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    setRecognitionNotice("필기 영역을 지웠습니다.");
  }

  async function recognizeImage(dataUrl: string) {
    setRecognizing(true);
    setRecognitionNotice("");

    try {
      const response = await fetch("/api/proof-recognize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageDataUrl: dataUrl,
          problemTitle: problem.title,
          problemPrompt: problem.prompt,
        }),
      });

      const text = await response.text();

      let parsedResponse: any = null;
      try {
        parsedResponse = JSON.parse(text);
      } catch {
        // non-json response
      }

      if (!response.ok) {
        throw new Error(
          parsedResponse?.error ||
            parsedResponse?.message ||
            text ||
            `인식 API 오류 (${response.status})`,
        );
      }

      const nextText = String(
        parsedResponse?.recognizedText ?? "",
      ).trim();

      if (!nextText) {
        throw new Error(
          "필기에서 인식된 증명 내용을 찾지 못했습니다.",
        );
      }

      setRecognizedText(nextText);
      commit({
        recognizedText: nextText,
        recognizedAt: new Date().toISOString(),
      });

      setRecognitionNotice(
        "인식이 완료되었습니다. 아래 결과를 확인하고 잘못 인식된 부분은 직접 수정한 뒤 저장/채점하세요.",
      );
    } catch (error: any) {
      setRecognitionNotice(
        `인식 실패: ${String(
          error?.message ?? error,
        )}`,
      );
    } finally {
      setRecognizing(false);
    }
  }

  async function recognizeHandwriting() {
    const canvas = canvasRef.current;

    if (!canvas) {
      setRecognitionNotice(
        "필기 영역을 준비하지 못했습니다.",
      );
      return;
    }

    const dataUrl = canvas.toDataURL("image/png");
    await recognizeImage(dataUrl);
  }

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setRecognitionNotice(
        "현재 버전에서는 JPG, JPEG, PNG, WebP 등의 이미지 파일만 인식할 수 있습니다.",
      );
      return;
    }

    const maxSize = 8 * 1024 * 1024;
    if (file.size > maxSize) {
      setRecognitionNotice(
        "파일 크기는 8MB 이하로 업로드해 주세요.",
      );
      return;
    }

    const dataUrl = await new Promise<string>(
      (resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () =>
          resolve(String(reader.result ?? ""));
        reader.onerror = () =>
          reject(
            new Error("파일을 읽지 못했습니다."),
          );
        reader.readAsDataURL(file);
      },
    );

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const nextPreview = URL.createObjectURL(file);

    uploadedDataUrlRef.current = dataUrl;
    setPreviewUrl(nextPreview);
    setSourceFileName(file.name);

    commit({
      inputMethod: "upload",
      sourceFileName: file.name,
    });

    setRecognitionNotice(
      `${file.name} 파일을 불러왔습니다. '파일 내용 인식'을 눌러 증명 내용을 변환하세요.`,
    );
  }

  useEffect(() => {
    if (method !== "handwriting") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [method]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const showHandwriting =
    allowedMode === "handwriting" ||
    allowedMode === "both";

  const showUpload =
    allowedMode === "upload" ||
    allowedMode === "both";

  return (
    <div>
      {allowedMode === "both" && (
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 14,
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            onClick={() =>
              switchMethod("handwriting")
            }
            style={{
              padding: "9px 13px",
              borderRadius: 9,
              border:
                method === "handwriting"
                  ? "1px solid #4f46e5"
                  : "1px solid #d1d5db",
              background:
                method === "handwriting"
                  ? "#eef2ff"
                  : "#fff",
              color:
                method === "handwriting"
                  ? "#3730a3"
                  : "#374151",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            직접 필기
          </button>

          <button
            type="button"
            onClick={() => switchMethod("upload")}
            style={{
              padding: "9px 13px",
              borderRadius: 9,
              border:
                method === "upload"
                  ? "1px solid #4f46e5"
                  : "1px solid #d1d5db",
              background:
                method === "upload"
                  ? "#eef2ff"
                  : "#fff",
              color:
                method === "upload"
                  ? "#3730a3"
                  : "#374151",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            파일 업로드
          </button>
        </div>
      )}

      {showHandwriting && method === "handwriting" && (
        <div>
          <div
            style={{
              padding: "11px 13px",
              borderRadius: 10,
              background: "#fffbeb",
              border: "1px solid #fde68a",
              color: "#92400e",
              fontSize: 13,
              lineHeight: 1.6,
              marginBottom: 10,
            }}
          >
            아래 영역에 증명 과정을 직접 작성한 뒤
            <b> 필기 인식</b>을 눌러주세요. 수식과
            글씨가 잘 보이도록 가능한 크게 작성하는 것이
            좋습니다.
          </div>

          <canvas
            ref={canvasRef}
            width={1200}
            height={700}
            onPointerDown={startDrawing}
            onPointerMove={draw}
            onPointerUp={stopDrawing}
            onPointerCancel={stopDrawing}
            onPointerLeave={() => {
              drawingRef.current = false;
              lastPointRef.current = null;
            }}
            style={{
              width: "100%",
              maxWidth: "100%",
              height: "420px",
              display: "block",
              border: "2px solid #d1d5db",
              borderRadius: 12,
              background: "#fff",
              touchAction: "none",
              cursor: "crosshair",
            }}
          />

          <div
            style={{
              display: "flex",
              gap: 8,
              marginTop: 10,
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={clearCanvas}
              disabled={recognizing}
              style={{
                padding: "9px 12px",
                borderRadius: 9,
                border: "1px solid #d1d5db",
                background: "#fff",
                fontWeight: 800,
                cursor: recognizing
                  ? "not-allowed"
                  : "pointer",
              }}
            >
              모두 지우기
            </button>

            <button
              type="button"
              onClick={recognizeHandwriting}
              disabled={recognizing}
              style={{
                padding: "9px 12px",
                borderRadius: 9,
                border: 0,
                background: "#4f46e5",
                color: "#fff",
                fontWeight: 900,
                cursor: recognizing
                  ? "not-allowed"
                  : "pointer",
                opacity: recognizing ? 0.65 : 1,
              }}
            >
              {recognizing
                ? "인식 중..."
                : "필기 인식"}
            </button>
          </div>
        </div>
      )}

      {showUpload && method === "upload" && (
        <div>
          <label
            onDragOver={(event) => {
              event.preventDefault();
              event.dataTransfer.dropEffect = "copy";
            }}
            onDrop={(event) => {
              event.preventDefault();
              const file =
                event.dataTransfer.files?.[0];

              if (file) {
                void handleFile(file);
              }
            }}
            style={{
              display: "grid",
              placeItems: "center",
              minHeight: 150,
              padding: 20,
              border: "2px dashed #a5b4fc",
              borderRadius: 12,
              background: "#f8faff",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <div>
              <div
                style={{
                  fontWeight: 900,
                  color: "#3730a3",
                }}
              >
                증명 이미지 업로드
              </div>

              <div
                style={{
                  marginTop: 6,
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: "#6b7280",
                }}
              >
                JPG, PNG, WebP 파일을 끌어놓거나
                클릭해서 선택하세요.
              </div>

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(event) => {
                  const file =
                    event.currentTarget.files?.[0];

                  if (file) {
                    void handleFile(file);
                  }

                  event.currentTarget.value = "";
                }}
                style={{ display: "none" }}
              />
            </div>
          </label>

          {previewUrl && (
            <div
              style={{
                marginTop: 12,
                padding: 12,
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                background: "#fff",
              }}
            >
              <div
                style={{
                  marginBottom: 8,
                  fontSize: 13,
                  fontWeight: 800,
                  color: "#374151",
                }}
              >
                {sourceFileName || "업로드 이미지"}
              </div>

              <img
                src={previewUrl}
                alt="업로드한 증명 답안"
                style={{
                  display: "block",
                  maxWidth: "100%",
                  maxHeight: 460,
                  margin: "0 auto",
                  borderRadius: 8,
                }}
              />

              <button
                type="button"
                onClick={() => {
                  const dataUrl =
                    uploadedDataUrlRef.current;

                  if (dataUrl) {
                    void recognizeImage(dataUrl);
                  }
                }}
                disabled={
                  recognizing ||
                  !uploadedDataUrlRef.current
                }
                style={{
                  marginTop: 10,
                  padding: "9px 12px",
                  borderRadius: 9,
                  border: 0,
                  background: "#4f46e5",
                  color: "#fff",
                  fontWeight: 900,
                  cursor:
                    recognizing ||
                    !uploadedDataUrlRef.current
                      ? "not-allowed"
                      : "pointer",
                  opacity:
                    recognizing ||
                    !uploadedDataUrlRef.current
                      ? 0.65
                      : 1,
                }}
              >
                {recognizing
                  ? "인식 중..."
                  : "파일 내용 인식"}
              </button>
            </div>
          )}
        </div>
      )}

      {recognitionNotice && (
        <div
          style={{
            marginTop: 12,
            padding: "10px 12px",
            borderRadius: 10,
            background:
              recognitionNotice.startsWith("인식 실패")
                ? "#fef2f2"
                : "#f0fdf4",
            border:
              recognitionNotice.startsWith("인식 실패")
                ? "1px solid #fecaca"
                : "1px solid #bbf7d0",
            color:
              recognitionNotice.startsWith("인식 실패")
                ? "#b91c1c"
                : "#166534",
            fontSize: 13,
            lineHeight: 1.6,
          }}
        >
          {recognitionNotice}
        </div>
      )}

      <div
        style={{
          marginTop: 16,
          paddingTop: 16,
          borderTop: "1px solid #e5e7eb",
        }}
      >
        <div
          style={{
            fontWeight: 900,
            marginBottom: 7,
          }}
        >
          인식된 내용
        </div>

        <div
          style={{
            marginBottom: 8,
            color: "#6b7280",
            fontSize: 13,
            lineHeight: 1.6,
          }}
        >
          인식 결과에 오류가 있으면 직접 수정한 뒤
          저장하거나 채점하세요. 이 내용이 실제 채점
          답안으로 사용됩니다.
        </div>

        <textarea
          value={recognizedText}
          onChange={(event) => {
            const next = event.target.value;
            setRecognizedText(next);
            commit({
              recognizedText: next,
              recognizedAt: undefined,
            });
          }}
          placeholder="필기 또는 업로드 이미지를 인식하면 증명 내용이 여기에 표시됩니다."
          style={{
            width: "97%",
            minHeight: 220,
            padding: 13,
            borderRadius: 10,
            border: "1px solid #d1d5db",
            resize: "vertical",
            fontFamily:
              'Consolas, "Courier New", monospace',
            fontSize: 15,
            lineHeight: 1.65,
          }}
        />
      </div>
    </div>
  );
}
