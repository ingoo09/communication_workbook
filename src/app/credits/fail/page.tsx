"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CreditPaymentFailPage() {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setCode(params.get("code") ?? "");
    setMessage(
      params.get("message") ?? "결제가 취소되었거나 인증에 실패했습니다.",
    );
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
        background: "linear-gradient(180deg,#081120 0%,#0f172a 100%)",
        color: "white",
        fontFamily: "Inter, Pretendard, Arial, sans-serif",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: 520,
          padding: 30,
          borderRadius: 24,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.10)",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        <div style={{ fontSize: 46 }}>❌</div>
        <h1 style={{ margin: "14px 0 0" }}>결제가 완료되지 않았습니다</h1>

        <p style={{ marginTop: 16, color: "#fecaca", lineHeight: 1.7 }}>
          {message}
        </p>

        {code && (
          <div
            style={{
              marginTop: 10,
              fontSize: 12,
              opacity: 0.58,
              overflowWrap: "anywhere",
            }}
          >
            {code}
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            marginTop: 24,
          }}
        >
          <Link
            href="/"
            style={{
              minHeight: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 12,
              textDecoration: "none",
              color: "white",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              fontWeight: 800,
            }}
          >
            홈으로
          </Link>

          <Link
            href="/credits"
            style={{
              minHeight: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 12,
              textDecoration: "none",
              color: "white",
              background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
              fontWeight: 900,
            }}
          >
            다시 시도
          </Link>
        </div>
      </section>
    </main>
  );
}
