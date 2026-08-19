'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

type ChapterUnlockPanelProps = {
  chapterId: string;
  chapterNumber: number;
};

export default function ChapterUnlockPanel({
  chapterId,
  chapterNumber,
}: ChapterUnlockPanelProps) {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [creditCost, setCreditCost] = useState<number | null>(null);
  const [unlocking, setUnlocking] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadAccessInfo() {
      const { data: product, error: productError } = await supabase
        .from('chapter_products')
        .select('credit_cost')
        .eq('chapter_id', chapterId)
        .eq('is_active', true)
        .maybeSingle();

      if (cancelled) return;

      if (productError || typeof product?.credit_cost !== 'number') {
        setCreditCost(null);
        setIsError(true);
        setMessage('Chapter 가격 정보를 불러오지 못했습니다.');
        setChecking(false);
        return;
      }

      setCreditCost(product.credit_cost);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (cancelled) return;

      if (!user) {
        setIsLoggedIn(false);
        setChecking(false);
        return;
      }

      setIsLoggedIn(true);

      const { data } = await supabase
        .from('user_credits')
        .select('balance')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!cancelled) {
        setBalance(typeof data?.balance === 'number' ? data.balance : 0);
        setChecking(false);
      }
    }

    void loadAccessInfo();

    return () => {
      cancelled = true;
    };
  }, [chapterId, supabase]);

  async function unlock() {
    setUnlocking(true);
    setMessage('');
    setIsError(false);

    try {
      const { data, error } = await supabase.rpc('unlock_chapter', {
        p_chapter_id: chapterId,
      });

      if (error) throw error;

      const result = Array.isArray(data) ? data[0] : data;

      if (!result?.success) {
        setBalance(
          typeof result?.remaining_balance === 'number'
            ? result.remaining_balance
            : balance,
        );
        setIsError(true);
        setMessage(
          result?.message === 'Not enough credits'
            ? 'Credit이 부족합니다.'
            : result?.message ?? 'Chapter를 해금하지 못했습니다.',
        );
        return;
      }

      if (typeof result.remaining_balance === 'number') {
        setBalance(result.remaining_balance);
      }

      setMessage('Chapter가 해금되었습니다.');
      router.refresh();
    } catch (error: any) {
      setIsError(true);
      setMessage(error?.message ?? 'Chapter 해금 중 오류가 발생했습니다.');
    } finally {
      setUnlocking(false);
    }
  }

  if (checking) {
    return (
      <main
        style={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          background: '#081120',
          color: 'white',
        }}
      >
        Chapter 접근 권한을 확인하는 중입니다...
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: 24,
        background: 'linear-gradient(180deg, #081120 0%, #0f172a 100%)',
        color: 'white',
        fontFamily: 'Inter, Pretendard, Arial, sans-serif',
      }}
    >
      <section
        style={{
          width: '100%',
          maxWidth: 520,
          padding: 32,
          borderRadius: 24,
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.10)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.30)',
          textAlign: 'center',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ fontSize: 42 }}>🔒</div>
        <div style={{ marginTop: 14, color: '#fcd34d', fontWeight: 900, fontSize: 13 }}>
          PAID CHAPTER
        </div>

        <h1 style={{ margin: '8px 0 0', fontSize: 30 }}>
          Chapter {chapterNumber}는 잠겨 있습니다
        </h1>

        <p
          style={{
            margin: '16px auto 0',
            maxWidth: 420,
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.70)',
          }}
        >
          {creditCost == null
            ? 'Chapter 가격 정보를 확인하고 있습니다.'
            : `이 Chapter는 ${creditCost} Credit으로 한 번 해금하면 이후 계속 이용할 수 있습니다.`}
        </p>

        {isLoggedIn ? (
          <>
            <div
              style={{
                marginTop: 22,
                padding: 16,
                borderRadius: 14,
                background: 'rgba(245,158,11,0.10)',
                border: '1px solid rgba(245,158,11,0.20)',
              }}
            >
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.62)' }}>
                현재 보유 Credit
              </div>
              <div style={{ marginTop: 5, fontSize: 30, fontWeight: 900, color: '#fcd34d' }}>
                {balance ?? 0}
              </div>
            </div>

            <button
              type="button"
              onClick={unlock}
              disabled={
                unlocking ||
                creditCost == null ||
                (balance ?? 0) < creditCost
              }
              style={{
                width: '100%',
                minHeight: 50,
                marginTop: 18,
                border: 0,
                borderRadius: 13,
                cursor:
                  unlocking ||
                  creditCost == null ||
                  (balance ?? 0) < creditCost
                    ? 'not-allowed'
                    : 'pointer',
                color: 'white',
                background: 'linear-gradient(135deg,#4f46e5,#7c3aed)',
                fontWeight: 900,
                fontSize: 15,
                opacity:
                  unlocking ||
                  creditCost == null ||
                  (balance ?? 0) < creditCost
                    ? 0.55
                    : 1,
              }}
            >
              {unlocking
                ? '해금 중...'
                : creditCost == null
                  ? '가격 확인 중...'
                  : `${creditCost} Credit으로 Chapter 해금`}
            </button>
          </>
        ) : (
          <Link
            href="/login"
            style={{
              minHeight: 50,
              marginTop: 22,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 13,
              textDecoration: 'none',
              color: 'white',
              background: 'linear-gradient(135deg,#4f46e5,#7c3aed)',
              fontWeight: 900,
            }}
          >
            로그인 / 무료 회원가입
          </Link>
        )}

        {message && (
          <div
            style={{
              marginTop: 14,
              padding: 12,
              borderRadius: 12,
              background: isError
                ? 'rgba(239,68,68,0.12)'
                : 'rgba(16,185,129,0.12)',
              color: isError ? '#fecaca' : '#a7f3d0',
              border: isError
                ? '1px solid rgba(248,113,113,0.25)'
                : '1px solid rgba(52,211,153,0.25)',
              lineHeight: 1.55,
              fontSize: 14,
            }}
          >
            {message}
          </div>
        )}

        <Link
          href="/"
          style={{
            marginTop: 16,
            display: 'inline-block',
            color: 'rgba(255,255,255,0.65)',
            textDecoration: 'none',
            fontWeight: 800,
            fontSize: 14,
          }}
        >
          ← 홈으로
        </Link>
      </section>
    </main>
  );
}
