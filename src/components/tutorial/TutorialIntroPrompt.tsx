"use client";

import { useEffect, useState } from "react";

type TutorialIntroPromptProps = {
  storageKey: string;
  onStart: () => void;
  title?: string;
  description?: string;
};

export default function TutorialIntroPrompt({
  storageKey,
  onStart,
  title = "온라인 워크북 사용법을 안내해드릴까요?",
  description = "처음 사용하는 기능을 약 1분 동안 간단히 안내합니다.",
}: TutorialIntroPromptProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const completed = localStorage.getItem(storageKey) === "true";
      const dismissed = sessionStorage.getItem(`${storageKey}:intro-dismissed`) === "true";
      setVisible(!completed && !dismissed);
    } catch {
      setVisible(true);
    }
  }, [storageKey]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        right: 20,
        bottom: 20,
        zIndex: 9000,
        width: "min(390px, calc(100vw - 32px))",
        padding: 18,
        borderRadius: 18,
        background: "#ffffff",
        color: "#111827",
        boxShadow: "0 20px 60px rgba(0,0,0,0.28)",
        border: "1px solid #e5e7eb",
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 900, color: "#4f46e5" }}>
        처음 오셨나요?
      </div>
      <h2 style={{ margin: "8px 0 0", fontSize: 20 }}>{title}</h2>
      <p style={{ margin: "9px 0 0", color: "#6b7280", lineHeight: 1.65 }}>
        {description}
      </p>

      <div
        style={{
          marginTop: 16,
          display: "flex",
          justifyContent: "flex-end",
          gap: 8,
        }}
      >
        <button
          type="button"
          onClick={() => {
            try {
              sessionStorage.setItem(`${storageKey}:intro-dismissed`, "true");
            } catch {}
            setVisible(false);
          }}
          style={{
            minHeight: 42,
            padding: "9px 13px",
            borderRadius: 10,
            border: "1px solid #d1d5db",
            background: "#ffffff",
            color: "#4b5563",
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          나중에
        </button>

        <button
          type="button"
          onClick={() => {
            setVisible(false);
            onStart();
          }}
          style={{
            minHeight: 42,
            padding: "9px 15px",
            borderRadius: 10,
            border: 0,
            background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
            color: "white",
            fontWeight: 900,
            cursor: "pointer",
          }}
        >
          튜토리얼 시작
        </button>
      </div>
    </div>
  );
}
