"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { TutorialStep } from "./types";

type Rect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

type TutorialOverlayProps = {
  steps: TutorialStep[];
  storageKey: string;
  open?: boolean;
  autoStart?: boolean;
  onClose?: () => void;
  onComplete?: () => void;
  zIndex?: number;
};

const GAP = 14;
const CARD_WIDTH = 340;

function getTargetRect(selector: string): Rect | null {
  const element = document.querySelector(selector) as HTMLElement | null;
  if (!element) return null;

  const rect = element.getBoundingClientRect();

  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
  };
}

function scrollTargetIntoView(selector: string) {
  const element = document.querySelector(selector) as HTMLElement | null;
  if (!element) return;

  const rect = element.getBoundingClientRect();
  const topSafe = 92;
  const bottomSafe = window.innerHeight - 120;

  if (rect.top < topSafe || rect.bottom > bottomSafe) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  }
}

export default function TutorialOverlay({
  steps,
  storageKey,
  open,
  autoStart = false,
  onClose,
  onComplete,
  zIndex = 9999,
}: TutorialOverlayProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<Rect | null>(null);

  const isControlled = typeof open === "boolean";
  const visible = isControlled ? Boolean(open) : internalOpen;

  const usableSteps = useMemo(() => steps.filter(Boolean), [steps]);
  const currentStep = usableSteps[stepIndex] ?? usableSteps[0];

  const closeTutorial = useCallback(
    (completed: boolean) => {
      if (completed) {
        try {
          window.localStorage.setItem(storageKey, "true");
        } catch {
          // localStorage 사용이 제한되어도 튜토리얼 자체는 정상 종료한다.
        }
        onComplete?.();
      } else {
        onClose?.();
      }

      if (!isControlled) {
        setInternalOpen(false);
      }
    },
    [isControlled, onClose, onComplete, storageKey],
  );

  useEffect(() => {
    if (isControlled || !autoStart) return;

    try {
      const completed = window.localStorage.getItem(storageKey) === "true";
      if (!completed) setInternalOpen(true);
    } catch {
      setInternalOpen(true);
    }
  }, [autoStart, isControlled, storageKey]);

  useEffect(() => {
    if (!visible || !currentStep) return;

    let cancelled = false;
    let timeoutId: number | undefined;

    const refresh = () => {
      if (cancelled) return;
      setTargetRect(getTargetRect(currentStep.target));
    };

    scrollTargetIntoView(currentStep.target);
    refresh();

    timeoutId = window.setTimeout(refresh, 360);

    window.addEventListener("resize", refresh);
    window.addEventListener("scroll", refresh, true);

    return () => {
      cancelled = true;
      if (timeoutId) window.clearTimeout(timeoutId);
      window.removeEventListener("resize", refresh);
      window.removeEventListener("scroll", refresh, true);
    };
  }, [currentStep, visible]);

  useEffect(() => {
    if (!visible) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeTutorial(false);
      }

      if (event.key === "ArrowRight" && stepIndex < usableSteps.length - 1) {
        setStepIndex((value) => value + 1);
      }

      if (event.key === "ArrowLeft" && stepIndex > 0) {
        setStepIndex((value) => value - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeTutorial, stepIndex, usableSteps.length, visible]);

  useEffect(() => {
    if (!visible || !currentStep) return;

    const element = document.querySelector(currentStep.target);
    if (element || !currentStep.optional) return;

    const nextIndex = usableSteps.findIndex(
      (step, index) =>
        index > stepIndex &&
        (!step.optional || document.querySelector(step.target)),
    );

    if (nextIndex >= 0) {
      setStepIndex(nextIndex);
      return;
    }

    const previousIndex = [...usableSteps]
      .map((step, index) => ({ step, index }))
      .reverse()
      .find(
        ({ step, index }) =>
          index < stepIndex &&
          (!step.optional || document.querySelector(step.target)),
      )?.index;

    if (typeof previousIndex === "number") {
      setStepIndex(previousIndex);
    }
  }, [currentStep, stepIndex, usableSteps, visible]);

  if (!visible || !currentStep) return null;

  const viewportWidth =
    typeof window !== "undefined" ? window.innerWidth : 1200;
  const viewportHeight =
    typeof window !== "undefined" ? window.innerHeight : 800;

  const effectiveRect = targetRect ?? {
    top: Math.max(80, viewportHeight * 0.32),
    left: Math.max(20, viewportWidth * 0.2),
    width: Math.max(120, viewportWidth * 0.6),
    height: 100,
  };

  const cardWidth = Math.min(CARD_WIDTH, viewportWidth - 32);
  const cardHeightEstimate = 235;

  let cardLeft = Math.max(
    16,
    Math.min(
      effectiveRect.left,
      viewportWidth - cardWidth - 16,
    ),
  );

  let cardTop = effectiveRect.top + effectiveRect.height + GAP;

  const preferred = currentStep.position ?? "auto";

  if (preferred === "top") {
    cardTop = effectiveRect.top - cardHeightEstimate - GAP;
  } else if (preferred === "right") {
    cardLeft = effectiveRect.left + effectiveRect.width + GAP;
    cardTop = effectiveRect.top;
  } else if (preferred === "left") {
    cardLeft = effectiveRect.left - cardWidth - GAP;
    cardTop = effectiveRect.top;
  } else if (preferred === "auto") {
    const roomBelow =
      viewportHeight - (effectiveRect.top + effectiveRect.height);
    const roomAbove = effectiveRect.top;

    cardTop =
      roomBelow >= cardHeightEstimate + GAP || roomBelow >= roomAbove
        ? effectiveRect.top + effectiveRect.height + GAP
        : effectiveRect.top - cardHeightEstimate - GAP;
  }

  if (cardLeft + cardWidth > viewportWidth - 16) {
    cardLeft = viewportWidth - cardWidth - 16;
  }
  if (cardLeft < 16) cardLeft = 16;

  if (cardTop + cardHeightEstimate > viewportHeight - 16) {
    cardTop = viewportHeight - cardHeightEstimate - 16;
  }
  if (cardTop < 16) cardTop = 16;

  const isFirst = stepIndex === 0;
  const isLast = stepIndex === usableSteps.length - 1;

  return (
    <div
      aria-label="온라인 워크북 튜토리얼"
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(2, 6, 23, 0.70)",
          pointerEvents: "auto",
        }}
        onClick={() => closeTutorial(false)}
      />

      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: Math.max(8, effectiveRect.top - 8),
          left: Math.max(8, effectiveRect.left - 8),
          width: Math.max(0, effectiveRect.width + 16),
          height: Math.max(0, effectiveRect.height + 16),
          borderRadius: 14,
          boxShadow:
            "0 0 0 9999px rgba(2,6,23,0.70), 0 0 0 3px #818cf8, 0 12px 42px rgba(0,0,0,0.28)",
          pointerEvents: "none",
          transition: "top 180ms ease, left 180ms ease, width 180ms ease, height 180ms ease",
        }}
      />

      <section
        style={{
          position: "fixed",
          top: cardTop,
          left: cardLeft,
          width: cardWidth,
          maxWidth: "calc(100vw - 32px)",
          padding: 18,
          borderRadius: 18,
          background: "#ffffff",
          color: "#111827",
          boxShadow: "0 24px 64px rgba(0,0,0,0.35)",
          pointerEvents: "auto",
          boxSizing: "border-box",
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
              fontSize: 12,
              fontWeight: 900,
              color: "#4f46e5",
              letterSpacing: 0.4,
            }}
          >
            {stepIndex + 1} / {usableSteps.length}
          </div>

          <button
            type="button"
            onClick={() => closeTutorial(false)}
            aria-label="튜토리얼 닫기"
            style={{
              border: 0,
              background: "transparent",
              color: "#6b7280",
              cursor: "pointer",
              fontSize: 22,
              lineHeight: 1,
              padding: 4,
            }}
          >
            ×
          </button>
        </div>

        <h2
          style={{
            margin: "10px 0 0",
            fontSize: 21,
            lineHeight: 1.35,
          }}
        >
          {currentStep.title}
        </h2>

        <p
          style={{
            margin: "10px 0 0",
            color: "#4b5563",
            fontSize: 14,
            lineHeight: 1.7,
          }}
        >
          {currentStep.description}
        </p>

        <div
          style={{
            height: 5,
            marginTop: 16,
            borderRadius: 999,
            overflow: "hidden",
            background: "#e5e7eb",
          }}
        >
          <div
            style={{
              width: `${((stepIndex + 1) / usableSteps.length) * 100}%`,
              height: "100%",
              background: "linear-gradient(90deg,#4f46e5,#7c3aed)",
              transition: "width 180ms ease",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 10,
            marginTop: 18,
          }}
        >
          <button
            type="button"
            disabled={isFirst}
            onClick={() => setStepIndex((value) => Math.max(0, value - 1))}
            style={{
              minHeight: 42,
              padding: "9px 14px",
              borderRadius: 10,
              border: "1px solid #d1d5db",
              background: "#ffffff",
              color: "#374151",
              fontWeight: 800,
              cursor: isFirst ? "not-allowed" : "pointer",
              opacity: isFirst ? 0.45 : 1,
            }}
          >
            이전
          </button>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              type="button"
              onClick={() => closeTutorial(false)}
              style={{
                minHeight: 42,
                padding: "9px 12px",
                borderRadius: 10,
                border: 0,
                background: "transparent",
                color: "#6b7280",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              건너뛰기
            </button>

            <button
              type="button"
              onClick={() => {
                if (isLast) {
                  closeTutorial(true);
                } else {
                  setStepIndex((value) =>
                    Math.min(usableSteps.length - 1, value + 1),
                  );
                }
              }}
              style={{
                minHeight: 42,
                padding: "9px 16px",
                borderRadius: 10,
                border: 0,
                color: "#ffffff",
                background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
                fontWeight: 900,
                cursor: "pointer",
              }}
            >
              {isLast ? "완료" : "다음"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
