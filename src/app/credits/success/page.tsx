"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type ConfirmResult = {
  success?: boolean;
  error?: string;
  alreadyProcessed?: boolean;
  creditsAdded?: number;
  balance?: number | null;
};

export default function CreditPaymentSuccessPage() {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<ConfirmResult | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function confirmPayment() {
      try {
        const params = new URLSearchParams(window.location.search);

        const paymentKey = params.get("paymentKey");
        const orderId = params.get("orderId");
        const amount = Number(params.get("amount"));

        if (!paymentKey || !orderId || !Number.isInteger(amount)) {
          throw new Error("결제 승인 정보가 올바르지 않습니다.");
        }

        const response = await fetch("/api/payments/credits/confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ paymentKey, orderId, amount }),
        });

        const json = await response.json();
        if (cancelled) return;

        if (!response.ok || !json?.success) {
          setResult({
            success: false,
            error: json?.error ?? "결제 승인에 실패했습니다.",
          });
          return;
        }

        setResult(json);
      } catch (error: any) {
        if (!cancelled) {
          setResult({
            success: false,
            error: error?.message ?? "결제 처리 중 오류가 발생했습니다.",
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void confirmPayment();

    return () => {
      cancelled = true;
    };
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
        {loading ? (
          <>
            <div style={{ fontSize: 38 }}>⏳</div>
            <h1 style={{ marginTop: 14 }}>결제를 승인하는 중입니다</h1>
            <p style={{ opacity: 0.7, lineHeight: 1.7 }}>
              창을 닫거나 새로고침하지 말고 잠시 기다려 주세요.
            </p>
          </>
        ) : result?.success ? (
          <>
            <div style={{ fontSize: 46 }}>✅</div>
            <h1 style={{ margin: "14px 0 0" }}>Credit 충전 완료</h1>

            <div
              style={{
                marginTop: 22,
                padding: 18,
                borderRadius: 16,
                background: "rgba(16,185,129,0.12)",
                border: "1px solid rgba(52,211,153,0.22)",
              }}
            >
              {!result.alreadyProcessed && (
                <div style={{ fontSize: 15, color: "#a7f3d0" }}>
                  +{result.creditsAdded ?? 0} Credits
                </div>
              )}

              {typeof result.balance === "number" && (
                <div
                  style={{
                    marginTop: result.alreadyProcessed ? 0 : 8,
                    fontSize: 30,
                    fontWeight: 900,
                    color: "#fcd34d",
                  }}
                >
                  보유 Credit {result.balance}
                </div>
              )}
            </div>

            {result.alreadyProcessed && (
              <p style={{ marginTop: 16, opacity: 0.7, lineHeight: 1.6 }}>
                이미 처리된 결제입니다. Credit은 중복 지급되지 않았습니다.
              </p>
            )}
          </>
        ) : (
          <>
            <div style={{ fontSize: 46 }}>⚠️</div>
            <h1 style={{ margin: "14px 0 0" }}>결제 처리를 확인해 주세요</h1>
            <p style={{ marginTop: 14, color: "#fecaca", lineHeight: 1.7 }}>
              {result?.error ?? "결제 처리 중 오류가 발생했습니다."}
            </p>
          </>
        )}

        {!loading && (
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
              Credit 화면
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
