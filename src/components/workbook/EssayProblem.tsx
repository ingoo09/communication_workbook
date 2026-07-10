"use client";

import React from "react";

type EssayProblemProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function EssayProblem({ value, onChange }: EssayProblemProps) {
  return (
    <textarea
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="여기에 답안을 작성하세요."
      style={{
        width: "100%",
        minHeight: 160,
        padding: 12,
        borderRadius: 12,
        border: "1px solid #ddd",
        fontSize: 14,
        lineHeight: 1.6,
        resize: "vertical",
      }}
    />
  );
}
