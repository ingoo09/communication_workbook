"use client";

import { useState } from "react";
import TutorialOverlay from "./TutorialOverlay";
import type { TutorialStep } from "./types";

type TutorialLauncherProps = {
  steps: TutorialStep[];
  storageKey: string;
  label?: string;
  autoStart?: boolean;
};

export default function TutorialLauncher({
  steps,
  storageKey,
  label = "튜토리얼",
  autoStart = false,
}: TutorialLauncherProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          minHeight: 42,
          padding: "10px 14px",
          borderRadius: 12,
          color: "#e0e7ff",
          background: "rgba(99,102,241,0.14)",
          border: "1px solid rgba(129,140,248,0.24)",
          fontWeight: 800,
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </button>

      <TutorialOverlay
        steps={steps}
        storageKey={storageKey}
        open={open}
        autoStart={autoStart}
        onClose={() => setOpen(false)}
        onComplete={() => setOpen(false)}
      />
    </>
  );
}
