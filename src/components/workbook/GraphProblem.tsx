"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import type { GraphProblem as GraphProblemType } from "@/types/workbook";

type GraphAnswerState = {
  kind: "graph";
  inputMethod: "draw" | "upload";
  imageDataUrl: string;
  explanation: string;
  sourceFileName?: string;
  updatedAt?: string;
};

type GraphProblemProps = {
  problem: GraphProblemType;
  value: string;
  onChange: (value: string) => void;
};

const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 700;

function parseGraphAnswer(
  value: string,
  fallbackMethod: "draw" | "upload",
): GraphAnswerState {
  try {
    const parsed = JSON.parse(String(value ?? ""));

    if (
      parsed?.kind === "graph" &&
      (parsed.inputMethod === "draw" || parsed.inputMethod === "upload")
    ) {
      return {
        kind: "graph",
        inputMethod: parsed.inputMethod,
        imageDataUrl:
          typeof parsed.imageDataUrl === "string" ? parsed.imageDataUrl : "",
        explanation:
          typeof parsed.explanation === "string" ? parsed.explanation : "",
        sourceFileName:
          typeof parsed.sourceFileName === "string"
            ? parsed.sourceFileName
            : undefined,
        updatedAt:
          typeof parsed.updatedAt === "string" ? parsed.updatedAt : undefined,
      };
    }
  } catch {
    // 이전 plain text 답안과의 호환
  }

  const raw = String(value ?? "").trim();

  return {
    kind: "graph",
    inputMethod: fallbackMethod,
    imageDataUrl: "",
    explanation: raw,
  };
}

function serializeGraphAnswer(answer: GraphAnswerState) {
  return JSON.stringify(answer);
}

export function graphAnswerToText(value: string) {
  const parsed = parseGraphAnswer(value, "draw");

  return [
    "[그래프 답안]",
    `입력 방식: ${parsed.inputMethod === "upload" ? "이미지 업로드" : "직접 그리기"}`,
    `그래프 이미지: ${parsed.imageDataUrl ? "제출됨" : "없음"}`,
    parsed.sourceFileName ? `업로드 파일: ${parsed.sourceFileName}` : "",
    "",
    "[학생 설명]",
    parsed.explanation.trim() || "(설명 없음)",
  ]
    .filter((line, index, arr) => {
      if (line !== "") return true;
      return index > 0 && arr[index - 1] !== "";
    })
    .join("\n");
}

function drawImageToCanvas(
  canvas: HTMLCanvasElement,
  dataUrl: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas를 준비하지 못했습니다."));
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scale = Math.min(
        canvas.width / image.naturalWidth,
        canvas.height / image.naturalHeight,
      );

      const width = image.naturalWidth * scale;
      const height = image.naturalHeight * scale;
      const x = (canvas.width - width) / 2;
      const y = (canvas.height - height) / 2;

      ctx.drawImage(image, x, y, width, height);
      resolve();
    };

    image.onerror = () => reject(new Error("그래프 이미지를 불러오지 못했습니다."));
    image.src = dataUrl;
  });
}

export default function GraphProblem({
  problem,
  value,
  onChange,
}: GraphProblemProps) {
  const allowedMode = problem.graphInputMode ?? "both";
  const initialMethod = allowedMode === "upload" ? "upload" : "draw";

  const parsed = useMemo(
    () => parseGraphAnswer(value, initialMethod),
    [value, initialMethod],
  );

  const [method, setMethod] = useState<"draw" | "upload">(parsed.inputMethod);
  const [explanation, setExplanation] = useState(parsed.explanation);
  const [sourceFileName, setSourceFileName] = useState(
    parsed.sourceFileName ?? "",
  );
  const [drawingTool, setDrawingTool] = useState<"pen" | "eraser">("pen");
  const [showGrid, setShowGrid] = useState(problem.graphShowGrid ?? true);
  const [notice, setNotice] = useState("");

  const backgroundCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const undoStackRef = useRef<string[]>([]);
  const restoringRef = useRef(false);

  const xMin = typeof problem.graphXMin === "number" && Number.isFinite(problem.graphXMin) ? problem.graphXMin : -5;
  const xMax = typeof problem.graphXMax === "number" && Number.isFinite(problem.graphXMax) ? problem.graphXMax : 5;
  const yMin = typeof problem.graphYMin === "number" && Number.isFinite(problem.graphYMin) ? problem.graphYMin : -5;
  const yMax = typeof problem.graphYMax === "number" && Number.isFinite(problem.graphYMax) ? problem.graphYMax : 5;
  const xLabel = problem.graphXAxisLabel ?? "x";
  const yLabel = problem.graphYAxisLabel ?? "y";

  function commit(next: Partial<GraphAnswerState>) {
    const canvas = drawingCanvasRef.current;
    const imageDataUrl =
      next.imageDataUrl ??
      (canvas ? canvas.toDataURL("image/webp", 0.82) : parsed.imageDataUrl);

    const answer: GraphAnswerState = {
      kind: "graph",
      inputMethod: next.inputMethod ?? method,
      imageDataUrl,
      explanation: next.explanation ?? explanation,
      sourceFileName:
        next.sourceFileName ?? (sourceFileName || undefined),
      updatedAt: next.updatedAt ?? new Date().toISOString(),
    };

    onChange(serializeGraphAnswer(answer));
  }

  function drawBackground() {
    const canvas = backgroundCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const xSpan = xMax - xMin;
    const ySpan = yMax - yMin;
    if (!(xSpan > 0) || !(ySpan > 0)) return;

    const toPixelX = (x: number) => ((x - xMin) / xSpan) * canvas.width;
    const toPixelY = (y: number) => canvas.height - ((y - yMin) / ySpan) * canvas.height;

    if (showGrid) {
      ctx.strokeStyle = "#e5e7eb";
      ctx.lineWidth = 1;

      const xStep = Math.max(1, Math.ceil(xSpan / 12));
      const yStep = Math.max(1, Math.ceil(ySpan / 8));

      for (let x = Math.ceil(xMin / xStep) * xStep; x <= xMax; x += xStep) {
        const px = toPixelX(x);
        ctx.beginPath();
        ctx.moveTo(px, 0);
        ctx.lineTo(px, canvas.height);
        ctx.stroke();
      }

      for (let y = Math.ceil(yMin / yStep) * yStep; y <= yMax; y += yStep) {
        const py = toPixelY(y);
        ctx.beginPath();
        ctx.moveTo(0, py);
        ctx.lineTo(canvas.width, py);
        ctx.stroke();
      }
    }

    ctx.strokeStyle = "#6b7280";
    ctx.lineWidth = 2;

    const axisX = xMin <= 0 && 0 <= xMax ? toPixelX(0) : 0;
    const axisY = yMin <= 0 && 0 <= yMax ? toPixelY(0) : canvas.height;

    ctx.beginPath();
    ctx.moveTo(0, axisY);
    ctx.lineTo(canvas.width, axisY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(axisX, 0);
    ctx.lineTo(axisX, canvas.height);
    ctx.stroke();

    ctx.fillStyle = "#374151";
    ctx.font = "24px Arial";
    ctx.fillText(xLabel, canvas.width - 34, Math.max(28, axisY - 12));
    ctx.fillText(yLabel, Math.min(canvas.width - 32, axisX + 12), 28);

    ctx.font = "18px Arial";
    ctx.fillStyle = "#6b7280";
    ctx.fillText(String(xMin), 10, Math.min(canvas.height - 10, axisY + 26));
    ctx.fillText(String(xMax), canvas.width - 58, Math.min(canvas.height - 10, axisY + 26));
    ctx.fillText(String(yMax), Math.min(canvas.width - 70, axisX + 10), 52);
    ctx.fillText(String(yMin), Math.min(canvas.width - 70, axisX + 10), canvas.height - 12);
  }

  useEffect(() => {
    drawBackground();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showGrid, xMin, xMax, yMin, yMax, xLabel, yLabel]);

  useEffect(() => {
    setExplanation(parsed.explanation);
    setSourceFileName(parsed.sourceFileName ?? "");

    if (allowedMode === "both" || parsed.inputMethod === allowedMode) {
      setMethod(parsed.inputMethod);
    }

    const canvas = drawingCanvasRef.current;
    if (!canvas) return;

    restoringRef.current = true;

    const restore = async () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (parsed.imageDataUrl) {
        try {
          await drawImageToCanvas(canvas, parsed.imageDataUrl);
        } catch {
          // 저장된 이미지 복원 실패 시 빈 Canvas 유지
        }
      }

      undoStackRef.current = [];
      restoringRef.current = false;
    };

    void restore();
  }, [
    allowedMode,
    parsed.explanation,
    parsed.imageDataUrl,
    parsed.inputMethod,
    parsed.sourceFileName,
  ]);

  function switchMethod(nextMethod: "draw" | "upload") {
    setMethod(nextMethod);
    setNotice("");
    commit({ inputMethod: nextMethod });
  }

  function getCanvasPoint(event: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = drawingCanvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    };
  }

  function pushSnapshot() {
    const canvas = drawingCanvasRef.current;
    if (!canvas) return;

    undoStackRef.current.push(canvas.toDataURL("image/png"));

    if (undoStackRef.current.length > 20) {
      undoStackRef.current.shift();
    }
  }

  function startDrawing(event: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = drawingCanvasRef.current;
    if (!canvas || restoringRef.current) return;

    canvas.setPointerCapture(event.pointerId);
    pushSnapshot();
    drawingRef.current = true;
    lastPointRef.current = getCanvasPoint(event);
  }

  function draw(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawingRef.current) return;

    const canvas = drawingCanvasRef.current;
    const point = getCanvasPoint(event);
    const previous = lastPointRef.current;
    if (!canvas || !point || !previous) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (drawingTool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = 34;
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = "#111827";
      ctx.lineWidth = 3;
    }

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(previous.x, previous.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    ctx.globalCompositeOperation = "source-over";

    lastPointRef.current = point;
  }

  function stopDrawing(event?: React.PointerEvent<HTMLCanvasElement>) {
    const wasDrawing = drawingRef.current;
    drawingRef.current = false;
    lastPointRef.current = null;

    if (event && drawingCanvasRef.current) {
      try {
        drawingCanvasRef.current.releasePointerCapture(event.pointerId);
      } catch {
        // ignore
      }
    }

    if (wasDrawing) {
      commit({ inputMethod: "draw" });
    }
  }

  async function undoCanvas() {
    const canvas = drawingCanvasRef.current;
    if (!canvas) return;

    const snapshot = undoStackRef.current.pop();
    if (!snapshot) {
      setNotice("되돌릴 이전 그래프 동작이 없습니다.");
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    await drawImageToCanvas(canvas, snapshot);
    commit({});
    setNotice("직전 그래프 동작을 되돌렸습니다.");
  }

  function clearCanvas() {
    const canvas = drawingCanvasRef.current;
    if (!canvas) return;

    pushSnapshot();
    canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
    commit({ imageDataUrl: "" });
    setNotice("그래프를 모두 지웠습니다.");
  }

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setNotice("JPG, PNG, WebP 등의 이미지 파일만 업로드할 수 있습니다.");
      return;
    }

    const maxSize = 8 * 1024 * 1024;
    if (file.size > maxSize) {
      setNotice("파일 크기는 8MB 이하로 업로드해 주세요.");
      return;
    }

    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result ?? ""));
      reader.onerror = () => reject(new Error("파일을 읽지 못했습니다."));
      reader.readAsDataURL(file);
    });

    const canvas = drawingCanvasRef.current;
    if (!canvas) return;

    pushSnapshot();

    try {
      await drawImageToCanvas(canvas, dataUrl);
      setSourceFileName(file.name);
      setMethod("upload");

      const compressed = canvas.toDataURL("image/webp", 0.82);
      commit({
        inputMethod: "upload",
        imageDataUrl: compressed,
        sourceFileName: file.name,
      });

      setNotice(`${file.name} 파일을 그래프 답안으로 불러왔습니다.`);
    } catch (error: any) {
      setNotice(`이미지를 불러오지 못했습니다: ${String(error?.message ?? error)}`);
    }
  }

  const showDraw = allowedMode === "draw" || allowedMode === "both";
  const showUpload = allowedMode === "upload" || allowedMode === "both";

  return (
    <div>
      {allowedMode === "both" && (
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 12,
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            onClick={() => switchMethod("draw")}
            style={{
              padding: "9px 13px",
              borderRadius: 9,
              border:
                method === "draw"
                  ? "1px solid #4f46e5"
                  : "1px solid #d1d5db",
              background: method === "draw" ? "#eef2ff" : "#fff",
              color: method === "draw" ? "#3730a3" : "#374151",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            직접 그리기
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
              background: method === "upload" ? "#eef2ff" : "#fff",
              color: method === "upload" ? "#3730a3" : "#374151",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            이미지 업로드
          </button>
        </div>
      )}

      <div
        style={{
          padding: "11px 13px",
          borderRadius: 10,
          background: "#eff6ff",
          border: "1px solid #bfdbfe",
          color: "#1e40af",
          fontSize: 13,
          lineHeight: 1.6,
          marginBottom: 10,
        }}
      >
        그래프를 직접 그리거나 종이에 작성한 그래프 이미지를 업로드할 수 있습니다.
        축 범위는 <b>{xMin} ≤ {xLabel} ≤ {xMax}</b>, <b>{yMin} ≤ {yLabel} ≤ {yMax}</b>입니다.
      </div>

      <div
        style={{
          position: "relative",
          width: "100%",
          height: 420,
          border: "2px solid #d1d5db",
          borderRadius: 12,
          overflow: "hidden",
          background: "#fff",
        }}
      >
        <canvas
          ref={backgroundCanvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            display: "block",
          }}
        />

        <canvas
          ref={drawingCanvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onPointerDown={showDraw && method === "draw" ? startDrawing : undefined}
          onPointerMove={showDraw && method === "draw" ? draw : undefined}
          onPointerUp={showDraw && method === "draw" ? stopDrawing : undefined}
          onPointerCancel={showDraw && method === "draw" ? stopDrawing : undefined}
          onPointerLeave={() => {
            if (drawingRef.current) {
              drawingRef.current = false;
              lastPointRef.current = null;
              commit({ inputMethod: "draw" });
            }
          }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            display: "block",
            touchAction: "none",
            cursor:
              method !== "draw"
                ? "default"
                : drawingTool === "eraser"
                  ? "cell"
                  : "crosshair",
          }}
        />
      </div>

      {showDraw && method === "draw" && (
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
            onClick={() => setDrawingTool("pen")}
            style={{
              padding: "9px 12px",
              borderRadius: 9,
              border:
                drawingTool === "pen"
                  ? "1px solid #4f46e5"
                  : "1px solid #d1d5db",
              background: drawingTool === "pen" ? "#eef2ff" : "#fff",
              color: drawingTool === "pen" ? "#3730a3" : "#374151",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            ✏️ 펜
          </button>

          <button
            type="button"
            onClick={() => setDrawingTool("eraser")}
            style={{
              padding: "9px 12px",
              borderRadius: 9,
              border:
                drawingTool === "eraser"
                  ? "1px solid #4f46e5"
                  : "1px solid #d1d5db",
              background: drawingTool === "eraser" ? "#eef2ff" : "#fff",
              color: drawingTool === "eraser" ? "#3730a3" : "#374151",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            🧽 부분 지우개
          </button>

          <button
            type="button"
            onClick={() => void undoCanvas()}
            style={{
              padding: "9px 12px",
              borderRadius: 9,
              border: "1px solid #d1d5db",
              background: "#fff",
              color: "#374151",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            ↶ 실행 취소
          </button>

          <button
            type="button"
            onClick={clearCanvas}
            style={{
              padding: "9px 12px",
              borderRadius: 9,
              border: "1px solid #d1d5db",
              background: "#fff",
              color: "#374151",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            모두 지우기
          </button>

          <button
            type="button"
            onClick={() => setShowGrid((previous) => !previous)}
            style={{
              padding: "9px 12px",
              borderRadius: 9,
              border: "1px solid #d1d5db",
              background: showGrid ? "#f3f4f6" : "#fff",
              color: "#374151",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            격자 {showGrid ? "끄기" : "켜기"}
          </button>
        </div>
      )}

      {showUpload && method === "upload" && (
        <label
          onDragOver={(event) => {
            event.preventDefault();
            event.dataTransfer.dropEffect = "copy";
          }}
          onDrop={(event) => {
            event.preventDefault();
            const file = event.dataTransfer.files?.[0];
            if (file) void handleFile(file);
          }}
          style={{
            display: "grid",
            placeItems: "center",
            minHeight: 120,
            marginTop: 12,
            padding: 18,
            border: "2px dashed #a5b4fc",
            borderRadius: 12,
            background: "#f8faff",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          <div>
            <div style={{ fontWeight: 900, color: "#3730a3" }}>
              그래프 이미지 업로드
            </div>
            <div
              style={{
                marginTop: 6,
                fontSize: 13,
                lineHeight: 1.6,
                color: "#6b7280",
              }}
            >
              JPG, PNG, WebP 파일을 끌어놓거나 클릭해서 선택하세요.
            </div>
            {sourceFileName && (
              <div style={{ marginTop: 6, fontSize: 12, color: "#4b5563" }}>
                현재 파일: {sourceFileName}
              </div>
            )}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(event) => {
                const file = event.currentTarget.files?.[0];
                if (file) void handleFile(file);
                event.currentTarget.value = "";
              }}
              style={{ display: "none" }}
            />
          </div>
        </label>
      )}

      {notice && (
        <div
          style={{
            marginTop: 10,
            padding: "9px 11px",
            borderRadius: 9,
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            color: "#166534",
            fontSize: 13,
            lineHeight: 1.6,
          }}
        >
          {notice}
        </div>
      )}

      <div
        style={{
          marginTop: 16,
          paddingTop: 16,
          borderTop: "1px solid #e5e7eb",
        }}
      >
        <div style={{ fontWeight: 900, marginBottom: 7 }}>그래프 설명</div>
        <div
          style={{
            marginBottom: 8,
            color: "#6b7280",
            fontSize: 13,
            lineHeight: 1.6,
          }}
        >
          그래프의 이동, 반전, 주요 위치나 특징 등을 간단히 설명하면 채점에 도움이 됩니다.
        </div>
        <textarea
          value={explanation}
          onChange={(event) => {
            const next = event.target.value;
            setExplanation(next);
            commit({ explanation: next });
          }}
          placeholder="예: 원래 파형을 시간 반전한 뒤 오른쪽으로 이동한 형태이다."
          style={{
            width: "97%",
            minHeight: 120,
            padding: 13,
            borderRadius: 10,
            border: "1px solid #d1d5db",
            resize: "vertical",
            fontSize: 15,
            lineHeight: 1.65,
          }}
        />
      </div>
    </div>
  );
}
