"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  CREDIT_PRODUCTS,
  type CreditProductId,
} from "@/lib/payments/creditProducts";

declare global {
  interface Window {
    TossPayments?: (clientKey: string) => any;
  }
}

export default function CreditsPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const widgetsRef = useRef<any>(null);
  const initializedRef = useRef(false);

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [balance, setBalance] = useState<number | null>(null);
  const [selectedProductId, setSelectedProductId] =
    useState<CreditProductId>("credit_50");
  const [sdkReady, setSdkReady] = useState(false);
  const [widgetReady, setWidgetReady] = useState(false);
  const [paying, setPaying] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const selectedProduct =
    CREDIT_PRODUCTS.find((product) => product.id === selectedProductId) ??
    CREDIT_PRODUCTS[1];

  useEffect(() => {
    let cancelled = false;

    async function initializeUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (cancelled) return;

      if (!user) {
        router.replace("/login");
        return;
      }

      const { data } = await supabase
        .from("user_credits")
        .select("balance")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!cancelled) {
        setBalance(typeof data?.balance === "number" ? data.balance : 0);
        setCheckingAuth(false);
      }
    }

    void initializeUser();

    return () => {
      cancelled = true;
    };
  }, [router, supabase]);

  useEffect(() => {
    if (!sdkReady || checkingAuth || initializedRef.current) return;
    if (!window.TossPayments) return;

    const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;

    if (!clientKey) {
      setIsError(true);
      setMessage("NEXT_PUBLIC_TOSS_CLIENT_KEY가 설정되지 않았습니다.");
      return;
    }

    // 이 시점 이후에는 반드시 string임을 별도 상수에 고정한다.
    // 비동기 함수/클로저 안에서도 TypeScript가 undefined 가능성을 다시 추론하지 않게 한다.
    const safeClientKey: string = clientKey;

    let cancelled = false;

    async function initializeWidget() {
      try {
        setMessage("");
        setIsError(false);

        const tossPayments = window.TossPayments!(safeClientKey);
        const customerKey = `customer-${crypto.randomUUID()}`;
        const widgets = tossPayments.widgets({ customerKey });

        await widgets.setAmount({
          currency: "KRW",
          value: selectedProduct.amount,
        });

        await widgets.renderPaymentMethods({
          selector: "#payment-method",
          variantKey: "DEFAULT",
        });

        await widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        });

        if (cancelled) return;

        widgetsRef.current = widgets;
        initializedRef.current = true;
        setWidgetReady(true);
      } catch (error: any) {
        if (!cancelled) {
          console.error(error);
          setIsError(true);
          setMessage(
            error?.message ?? "토스페이먼츠 결제 UI를 준비하지 못했습니다.",
          );
        }
      }
    }

    void initializeWidget();

    return () => {
      cancelled = true;
    };
  }, [sdkReady, checkingAuth, selectedProduct.amount]);

  useEffect(() => {
    if (!widgetReady || !widgetsRef.current) return;

    void widgetsRef.current
      .setAmount({
        currency: "KRW",
        value: selectedProduct.amount,
      })
      .catch((error: any) => {
        console.error("Toss amount update failed:", error);
        setIsError(true);
        setMessage("결제 금액을 변경하지 못했습니다.");
      });
  }, [selectedProduct.amount, widgetReady]);

  async function purchaseCredits() {
    if (!widgetsRef.current || !widgetReady) {
      setIsError(true);
      setMessage("결제 화면을 준비하는 중입니다.");
      return;
    }

    setPaying(true);
    setMessage("");
    setIsError(false);

    try {
      const response = await fetch("/api/payments/credits/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: selectedProduct.id,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result?.success) {
        throw new Error(result?.error ?? "주문을 생성하지 못했습니다.");
      }

      if (
        Number(result.amount) !== selectedProduct.amount ||
        Number(result.credits) !== selectedProduct.credits
      ) {
        throw new Error("서버의 Credit 상품 정보가 화면과 일치하지 않습니다.");
      }

      const origin = window.location.origin;

      await widgetsRef.current.requestPayment({
        orderId: result.orderId,
        orderName: result.orderName,
        successUrl: `${origin}/credits/success`,
        failUrl: `${origin}/credits/fail`,
      });
    } catch (error: any) {
      setIsError(true);
      setMessage(error?.message ?? "결제 요청 중 오류가 발생했습니다.");
      setPaying(false);
    }
  }

  if (checkingAuth) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#081120",
          color: "white",
        }}
      >
        Credit 정보를 확인하는 중입니다...
      </main>
    );
  }

  return (
    <>
      <Script
        src="https://js.tosspayments.com/v2/standard"
        strategy="afterInteractive"
        onReady={() => setSdkReady(true)}
        onError={() => {
          setIsError(true);
          setMessage("토스페이먼츠 SDK를 불러오지 못했습니다.");
        }}
      />

      <main
        style={{
          minHeight: "100vh",
          padding: "42px 22px 80px",
          background: "linear-gradient(180deg,#081120 0%,#0f172a 100%)",
          color: "white",
          fontFamily: "Inter, Pretendard, Arial, sans-serif",
          boxSizing: "border-box",
        }}
      >
        <div style={{ width: "100%", maxWidth: 820, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 14,
              flexWrap: "wrap",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 900,
                  color: "#fcd34d",
                  letterSpacing: 0.5,
                }}
              >
                CREDIT PURCHASE
              </div>
              <h1 style={{ margin: "8px 0 0", fontSize: 34 }}>
                Credit 충전
              </h1>
            </div>

            <Link
              href="/"
              style={{
                padding: "10px 14px",
                borderRadius: 12,
                color: "white",
                textDecoration: "none",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                fontWeight: 800,
              }}
            >
              홈으로
            </Link>
          </div>

          <div
            style={{
              marginTop: 24,
              padding: 20,
              borderRadius: 18,
              background: "rgba(245,158,11,0.10)",
              border: "1px solid rgba(245,158,11,0.22)",
            }}
          >
            <div style={{ fontSize: 13, opacity: 0.72 }}>
              현재 보유 Credit
            </div>
            <div
              style={{
                marginTop: 5,
                fontSize: 34,
                fontWeight: 900,
                color: "#fcd34d",
              }}
            >
              {balance ?? 0}
            </div>
          </div>

          <section style={{ marginTop: 28 }}>
            <h2 style={{ fontSize: 20, margin: 0 }}>충전할 Credit 선택</h2>

            <div
              style={{
                marginTop: 14,
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(min(100%,190px),1fr))",
                gap: 12,
              }}
            >
              {CREDIT_PRODUCTS.map((product) => {
                const selected = product.id === selectedProductId;

                return (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => setSelectedProductId(product.id)}
                    style={{
                      minHeight: 104,
                      padding: 18,
                      borderRadius: 18,
                      cursor: "pointer",
                      textAlign: "left",
                      color: "white",
                      background: selected
                        ? "linear-gradient(135deg,#4f46e5,#7c3aed)"
                        : "rgba(255,255,255,0.06)",
                      border: selected
                        ? "1px solid #818cf8"
                        : "1px solid rgba(255,255,255,0.10)",
                      boxShadow: selected
                        ? "0 16px 34px rgba(79,70,229,0.28)"
                        : "none",
                    }}
                  >
                    <div style={{ fontSize: 21, fontWeight: 900 }}>
                      {product.credits} Credits
                    </div>
                    <div style={{ marginTop: 8, opacity: 0.82 }}>
                      {product.amount.toLocaleString("ko-KR")}원
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          <section
            style={{
              marginTop: 28,
              padding: 22,
              borderRadius: 22,
              background: "#fff",
              color: "#111827",
            }}
          >
            <div
              style={{
                marginBottom: 16,
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <div>
                <div style={{ fontWeight: 900, fontSize: 22 }}>
                  {selectedProduct.credits} Credits
                </div>
              </div>
              <div style={{ fontWeight: 900, fontSize: 22 }}>
                {selectedProduct.amount.toLocaleString("ko-KR")}원
              </div>
            </div>

            <div id="payment-method" />
            <div id="agreement" />

            <button
              type="button"
              disabled={!widgetReady || paying}
              onClick={purchaseCredits}
              style={{
                width: "100%",
                minHeight: 52,
                marginTop: 18,
                border: 0,
                borderRadius: 14,
                cursor: !widgetReady || paying ? "not-allowed" : "pointer",
                color: "white",
                background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
                fontWeight: 900,
                fontSize: 16,
                opacity: !widgetReady || paying ? 0.6 : 1,
              }}
            >
              {paying
                ? "결제 요청 중..."
                : !widgetReady
                  ? "결제 화면 준비 중..."
                  : `${selectedProduct.amount.toLocaleString(
                      "ko-KR",
                    )}원 테스트 결제`}
            </button>

            {message && (
              <div
                style={{
                  marginTop: 14,
                  padding: 12,
                  borderRadius: 12,
                  background: isError ? "#fef2f2" : "#ecfdf5",
                  border: isError
                    ? "1px solid #fecaca"
                    : "1px solid #a7f3d0",
                  color: isError ? "#b91c1c" : "#047857",
                  lineHeight: 1.55,
                  fontSize: 14,
                }}
              >
                {message}
              </div>
            )}
          </section>

          <p
            style={{
              margin: "18px 4px 0",
              color: "rgba(255,255,255,0.58)",
              lineHeight: 1.65,
              fontSize: 13,
            }}
          >
            현재 페이지는 토스페이먼츠 테스트 키를 사용하는 개발용 결제
            화면입니다. 실제로 결제되지 않습니다.
          </p>
        </div>
      </main>
    </>
  );
}
