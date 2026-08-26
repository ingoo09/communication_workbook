'use client';

import Link from 'next/link';
import AuthControls from '@/components/auth/AuthControls';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useMemo, useRef, useState } from 'react';
import TutorialOverlay from '@/components/tutorial/TutorialOverlay';
import TutorialIntroPrompt from '@/components/tutorial/TutorialIntroPrompt';
import { HOME_TUTORIAL_STEPS } from '@/components/tutorial/steps';

type PartId = 100 | 1 | 2 | 3 | 4;

type Chapter = {
  id: number;
  part: PartId;
  title: string;
  href?: string;
  available: boolean;
  access: 'sample' | 'locked' | 'unlocked' | 'preparing';
  progress: number;
  description: string;
};

const PARTS: Array<{
  id: PartId;
  label: string;
  range: string;
  description: string;
}> = [
  { id: 100, label: 'Basic', range: '1장', description: '파이썬 기초' },
  { id: 1, label: 'Part Ⅰ', range: '2~8장', description: '신호와 시스템' },
  { id: 2, label: 'Part Ⅱ', range: '9~13장', description: '통신시스템' },
  { id: 3, label: 'Part Ⅲ', range: '14~24장', description: '디지털통신' },
  { id: 4, label: 'Part Ⅳ', range: '25~30장', description: '고급 디지털통신' },
];

const knownChapters: Record<number, Pick<Chapter, 'title' | 'description'>> = {
  1: {
    title: 'Python Basics',
    description: '통신시스템과 디지털통신에 사용하는 파이썬의 기본 문법과 기능 기초를 학습합니다.',
  },
  2: {
    title: 'Numerical Integration & Orthogonal Expansion',
    description: '수치적분법과 직교확장을 통해 통신 신호 해석의 기초를 학습합니다.',
  },
  3: {
    title: 'Fourier Series & Frequency Transfer Function',
    description: '푸리에 급수와 선형 시스템의 주파수 전달 함수를 학습합니다.',
  },
  4: {
    title: 'Fourier Transform',
    description: '푸리에 변환과 스펙트럼 분석을 학습합니다.',
  },
  5: {
    title: 'Fourier Transform Properties & Convolution',
    description: '푸리에 변환의 성질과 합성곱(컨볼루션) 연산을 학습합니다.',
  },
  6: {
    title: 'LPF and BPF Design',
    description: '저주파 필터와 대역필터의 주파수 특성 및 임펄스 응답을 학습합니다.',
  },
  7: {
    title: 'Sampling and Signal Reconstruction',
    description: '샘플링에 의한 스펙트럼 변화와 신호 복원 원리를 학습합니다.',
  },
  8: {
    title: 'Correlation and Spectral Density',
    description: '상관함수와 주파수 밀도 함수의 관계를 학습합니다.',
  },
  9: {
    title: 'AM Modulation',
    description: 'DSB-SC 기반 진폭 변·복조 시스템 설계 방법을 학습합니다.',
  },
  10: {
    title: 'QM and FDM',
    description: '직교 다중화된 진폭 변·복조 시스템과 주파수 분할 다중화 시스템 설계 방법을 학습합니다.',
  },
  11: {
    title: 'Hilbert Transform and SSB',
    description: '힐버트 변환과 분석 신호을 이해하고, SSB 기반 진폭 변·복조 시스템 설계 방법을 학습합니다.',
  },
  12: {
    title: 'VCO and FM Modulation',
    description: 'VCO의 동작을 이해하고, 주파수 변·복조 시스템 설계 방법을 학습합니다.',
  },
  13: {
    title: 'PLL and Synchronization',
    description: '다양한 위상 및 주파수 오차 환경에서 동기화를 위해 사용하는 위상 고정 루프의 동작을 학습합니다.',
  },
  14: {
    title: 'Probability and Random Variables',
    description: '확률과 랜덤 변수의 기본 지식 및 이론을 학습합니다.',
  },
  15: {
    title: 'Random Signals',
    description: '랜덤 프로세스를 발생시키고, 자기상관함수 등 통계적인 분석을 학습합니다.',
  },
  16: {
    title: 'ML Detection for Binary Transmission',
    description: '이진 데이터 전송 시스템에서 최대 우도 측정 방식을 학습합니다.',
  },
  17: {
    title: 'Signal Vector Space and ML Detection Ⅰ',
    description: 'M진(M-ary) 심벌의 신호를 벡터 공간의 한 점으로 매핑하는 과정을 학습합니다.',
  },
  18: {
    title: 'Signal Vector Space and ML Detection Ⅱ',
    description: '가산성 화이트 가우시안 환경(AWGN)에서 최대 우도 측정 검출 방법을 학습합니다.',
  },
  19: {
    title: 'Correlator-based ML Detection',
    description: '상관기 기반의 최대 우도 측정 검출 기법을 학습합니다.',
  },
  20: {
    title: 'Pulse Shaping and Matched Filter',
    description: '펄스 성형 수행 과정과 정합 필터를 통과시켜 신호를 복원하는 방법을 학습합니다.',
  },
  21: {
    title: 'BPSK BER Simulation (Waveform Level)',
    description: '파형 수준에서 펄스 성형, 정합 필터를 수행하는 BPSK 시스템을 설계하고 BER을 실험하는 방법을 학습합니다.',
  },
  22: {
    title: 'QPSK and OQPSK',
    description: 'QPSK와 Offset QPSK 신호의 특성을 학습합니다.',
  },
  23: {
    title: 'QAM',
    description: 'QAM 송·수신기 설계 방법을 학습합니다.',
  },
  24: {
    title: 'Convolutional Coding',
    description: '컨볼루션 부호의 부호화와 복호화 과정을 학습합니다.',
  },
  25: {
    title: 'Fading, Diversity and Combining',
    description: '레일레이 페이딩 채널 환경에서의 BER, 다이버시티의 개념과 컴바이닝 기법을 학습합니다.',
  },
  26: {
    title: 'OFDM under AWGN Channel',
    description: '직교 주파수 분할 다중화 신호 생성과 복조 과정을 학습합니다.',
  },
  27: {
    title: 'OFDM under Multipath Fading Channel',
    description: '다중경로 채널 환경에서 CP가 추가된 OFDM 신호 생성과 복조 과정을 학습합니다.',
  },
  28: {
    title: 'MIMO System Ⅰ : Space Time Code',
    description: '시공간 부호 중 하나인 Alamouti Code의 성질을 학습합니다.',
  },
  29: {
    title: 'MIMO System Ⅱ : Spatial Multiplexing',
    description: 'SM MIMO 시스템 모델을 이해하고, 검출 기법을 학습합니다.',
  },
  30: {
    title: 'Near Ultrasonic Wireless OFDM Modem Design',
    description: '비가청 대역 무선 OFDM 모뎀을 이용한 이미지 전송 및 수신 방법을 학습합니다.',
  }
};

function getPart(chapterId: number): PartId {
  if (chapterId <= 1) return 100;
  if (chapterId <= 8) return 1;
  if (chapterId <= 13) return 2;
  if (chapterId <= 24) return 3;
  return 4;
}

const chapters: Chapter[] = Array.from({ length: 30 }, (_, index) => {
  const id = index + 1;
  const known = knownChapters[id];

  //const access: Chapter['access'] = id === 1 || id === 2 || id === 14 ? 'sample' : 'locked';
  const access: Chapter['access'] = id === 1 || id === 2 || id === 14 ? 'sample' : 'preparing';
    //id === 1 || id === 2 || id === 14 ? 'sample' :
    //id === 15 || id === 16 ? 'locked' : 'preparing';

  const available = access !== 'preparing';

  return {
    id,
    part: getPart(id),
    title: known?.title ?? `Chapter ${id}`,
    description:
      known?.description ?? '교재 원고와 실습 문제가 준비되는 대로 공개될 예정입니다.',
    href: available ? `/workbook/ch${id}` : undefined,
    available,
    access,
    progress: 0,
  };
});

export default function WorkbookHome() {
  const [selectedPart, setSelectedPart] = useState<PartId>(3);
  const curriculumRef = useRef<HTMLElement | null>(null);
  const [chapterProgress, setChapterProgress] = useState<Record<number, number>>({});
  const [totalProblemsByChapter, setTotalProblemsByChapter] = useState<Record<number, number>>({});
  const [creditBalance, setCreditBalance] = useState<number | null>(null);
  const [unlockedChapterIds, setUnlockedChapterIds] = useState<Set<number>>(new Set());
  const [chapterCosts, setChapterCosts] = useState<Record<number, number>>({});
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [showHistoryAuthPrompt, setShowHistoryAuthPrompt] = useState(false);
  const [homeTutorialOpen, setHomeTutorialOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadProgress() {
      const supabase = createClient();

      // Chapter 가격은 Supabase chapter_products를 단일 기준으로 사용한다.
      const { data: productData, error: productError } = await supabase
        .from('chapter_products')
        .select('chapter_id, credit_cost')
        .eq('is_active', true);

      if (!cancelled) {
        if (productError) {
          console.error('Chapter 가격 조회 실패:', productError);
          setChapterCosts({});
        } else {
          const nextCosts: Record<number, number> = {};

          for (const row of productData ?? []) {
            const match = String(row.chapter_id ?? '').match(/^ch(\d+)$/i);
            if (!match) continue;

            const chapterId = Number(match[1]);
            const cost = Number(row.credit_cost);

            if (Number.isFinite(chapterId) && Number.isFinite(cost)) {
              nextCosts[chapterId] = cost;
            }
          }

          setChapterCosts(nextCosts);
        }
      }

      // 서버에서 실제 Chapter 콘텐츠를 기준으로 전체 학습 문항 수를 계산한다.
      const problemCountResponse = await fetch('/api/workbook/problem-counts', {
        cache: 'no-store',
      });

      let problemCounts: Record<number, number> = {};

      if (problemCountResponse.ok) {
        const problemCountJson = await problemCountResponse.json();

        problemCounts = Object.fromEntries(
          Object.entries(problemCountJson.counts ?? {}).map(([key, value]) => [
            Number(key),
            Number(value),
          ]),
        );

        if (!cancelled) {
          setTotalProblemsByChapter(problemCounts);
        }
      } else {
        console.error('전체 문항 수 조회 실패');
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!cancelled) {
        setIsAuthenticated(Boolean(user));
      }

      if (cancelled || !user) {
        if (!cancelled) {
          setChapterProgress({});
          setCreditBalance(null);
          setUnlockedChapterIds(new Set());
        }
        return;
      }

      const [creditResult, accessResult] = await Promise.all([
        supabase
          .from('user_credits')
          .select('balance')
          .eq('user_id', user.id)
          .maybeSingle(),
        supabase
          .from('chapter_access')
          .select('chapter_id')
          .eq('user_id', user.id),
      ]);

      if (!cancelled) {
        setCreditBalance(
          typeof creditResult.data?.balance === 'number'
            ? creditResult.data.balance
            : 0,
        );

        const unlocked = new Set<number>();

        for (const row of accessResult.data ?? []) {
          const match = String(row.chapter_id ?? '').match(/^ch(\d+)$/i);
          if (match) unlocked.add(Number(match[1]));
        }

        setUnlockedChapterIds(unlocked);
      }

      const { data, error } = await supabase
        .from('answers')
        .select('chapter_id, problem_id')
        .eq('user_id', user.id);

      if (cancelled) return;

      if (error) {
        console.error('학습 진행률 조회 실패:', error);
        return;
      }

      const solvedByChapter = new Map<number, Set<string>>();

      for (const row of data ?? []) {
        const match = String(row.chapter_id ?? '').match(/^ch(\d+)$/i);
        if (!match) continue;

        const chapterId = Number(match[1]);
        const solved = solvedByChapter.get(chapterId) ?? new Set<string>();
        solved.add(String(row.problem_id));
        solvedByChapter.set(chapterId, solved);
      }

      const nextProgress: Record<number, number> = {};

      for (const [chapterIdText, total] of Object.entries(problemCounts)) {
        const chapterId = Number(chapterIdText);
        const solvedCount = solvedByChapter.get(chapterId)?.size ?? 0;

        nextProgress[chapterId] =
          total > 0
            ? Math.min(100, Math.round((solvedCount / total) * 100))
            : 0;
      }

      setChapterProgress(nextProgress);
    }

    loadProgress();

    return () => {
      cancelled = true;
    };
  }, []);

  const selectedPartInfo = PARTS.find((part) => part.id === selectedPart) ?? PARTS[0];
  const visibleChapters = useMemo(
    () =>
      chapters
        .filter((chapter) => chapter.part === selectedPart)
        .map((chapter) => ({
          ...chapter,
          access:
            chapter.access === 'locked' && unlockedChapterIds.has(chapter.id)
              ? ('unlocked' as const)
              : chapter.access,
          progress: chapterProgress[chapter.id] ?? 0,
        })),
    [selectedPart, chapterProgress, unlockedChapterIds],
  );

  function moveToCurriculum(part: PartId = selectedPart) {
    setSelectedPart(part);
    window.setTimeout(() => {
      curriculumRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #081120 0%, #0f172a 100%)',
        color: 'white',
        fontFamily: 'Inter, Pretendard, Arial, sans-serif',
        overflowX: 'hidden',
      }}
    >
      <header
        style={{
          width: '100%',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(8,17,32,0.86)',
          boxSizing: 'border-box',
        }}
      >
        <div
          className="home-header-inner"
          style={{
            width: '100%',
            maxWidth: 1400,
            margin: '0 auto',
            padding: '18px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 18,
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              minWidth: 0,
            }}
          >
            <img
              src="/favicon.ico"
              alt="Workbook icon"
              style={{
                width: 55,
                height: 55,
                borderRadius: 10,
                flexShrink: 0,
              }}
            />

            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 14, opacity: 0.7 }}>
                Interactive Workbook
              </div>

              <div style={{ fontSize: 24, fontWeight: 800, marginTop: 4 }}>
                온라인 워크북
              </div>
            </div>
          </div>

          <div
            className="home-header-actions"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 10,
              flexWrap: 'wrap',
            }}
          >
            {isAuthenticated ? (
              <Link
                data-tutorial="home-history"
                href="/history"
                style={{
                  flex: '0 0 auto',
                  padding: '11px 16px',
                  borderRadius: 12,
                  textDecoration: 'none',
                  color: '#e0e7ff',
                  background: 'rgba(99,102,241,0.14)',
                  border: '1px solid rgba(129,140,248,0.24)',
                  fontWeight: 800,
                  whiteSpace: 'nowrap',
                }}
              >
                내 학습 기록
              </Link>
            ) : (
              <button
                type="button"
                data-tutorial="home-history"
                onClick={() => setShowHistoryAuthPrompt(true)}
                style={{
                  flex: '0 0 auto',
                  padding: '11px 16px',
                  borderRadius: 12,
                  color: '#e0e7ff',
                  background: 'rgba(99,102,241,0.14)',
                  border: '1px solid rgba(129,140,248,0.24)',
                  fontWeight: 800,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                }}
              >
                내 학습 기록
              </button>
            )}
            {creditBalance !== null && (
              <Link
                data-tutorial="home-credit"
                href="/credits"
                title="Credit 충전"
                style={{
                  flex: '0 0 auto',
                  padding: '10px 13px',
                  borderRadius: 12,
                  color: '#fef3c7',
                  background: 'rgba(245,158,11,0.12)',
                  border: '1px solid rgba(245,158,11,0.24)',
                  fontSize: 13,
                  fontWeight: 900,
                  whiteSpace: 'nowrap',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
              >
                Credit {creditBalance}
              </Link>
            )}
            {isAuthenticated && (
              <Link
                href="/account"
                style={{
                  flex: '0 0 auto',
                  minHeight: 42,
                  padding: '10px 14px',
                  borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'white',
                  background: 'rgba(255,255,255,0.07)',
                  fontWeight: 700,
                  fontSize: 13,
                  boxSizing: 'border-box',
                  whiteSpace: 'nowrap',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                회원정보 수정
              </Link>
            )}
            <AuthControls />
          </div>
        </div>
      </header>

      <section
        className="hero-section"
        style={{
          width: '100%',
          maxWidth: 1400,
          margin: '0 auto',
          padding: '72px 28px 48px',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.2fr) minmax(280px, 0.8fr)',
          gap: 40,
          alignItems: 'center',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '8px 14px',
              borderRadius: 999,
              background: 'rgba(99,102,241,0.14)',
              color: '#c7d2fe',
              fontSize: 14,
              fontWeight: 700,
              marginBottom: 26,
              maxWidth: '100%',
              boxSizing: 'border-box',
            }}
          >
            Communication System and Digital Communication
          </div>

          <h1
            className="hero-title"
            style={{
              fontSize: 64,
              lineHeight: 1.05,
              fontWeight: 900,
              margin: 0,
              letterSpacing: '-2px',
            }}
          >
            통신시스템과
            <br />
            디지털통신
          </h1>

          <p
            style={{
              marginTop: 28,
              fontSize: 20,
              lineHeight: 1.8,
              color: 'rgba(255,255,255,0.75)',
              maxWidth: 760,
            }}
          >
            Python 기반 인터랙티브 문제 풀이와 즉시 채점 피드백
          </p>

          <div style={{ marginTop: 36, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button
              type="button"
              data-tutorial="home-start"
              onClick={() => moveToCurriculum(1)}
              style={{
                maxWidth: '100%',
                boxSizing: 'border-box',
                background: 'linear-gradient(135deg,#4f46e5,#7c3aed)',
                border: 'none',
                color: 'white',
                padding: '16px 28px',
                borderRadius: 18,
                fontSize: 16,
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 20px 40px rgba(79,70,229,0.35)',
                whiteSpace: 'nowrap',
              }}
            >
              학습 시작하기
            </button>

            <button
              type="button"
              onClick={() => setHomeTutorialOpen(true)}
              style={{
                maxWidth: '100%',
                boxSizing: 'border-box',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'white',
                padding: '16px 28px',
                borderRadius: 18,
                fontSize: 16,
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              튜토리얼
            </button>
          </div>
        </div>

        <div
          style={{
            minWidth: 0,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 32,
            padding: 32,
            boxSizing: 'border-box',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
          }}
        >
          <div
            className="hero-stat-grid"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}
          >
            {[
              { value: '30', label: 'Total Chapters' },
              { value: '4', label: 'Curriculum Parts' },
              { value: 'Python', label: 'Interactive Coding' },
              { value: 'Feedback', label: 'Instant Grading' },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  minWidth: 0,
                  padding: '26px 20px',
                  borderRadius: 22,
                  background: 'rgba(255,255,255,0.04)',
                  boxSizing: 'border-box',
                }}
              >
                <div style={{ fontSize: 32, fontWeight: 900, overflowWrap: 'anywhere' }}>
                  {item.value}
                </div>
                <div style={{ marginTop: 8, opacity: 0.7, fontSize: 14 }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={curriculumRef}
        style={{
          width: '100%',
          maxWidth: 1400,
          margin: '0 auto',
          padding: '18px 28px 100px',
          scrollMarginTop: 100,
          boxSizing: 'border-box',
        }}
      >
        <div style={{ marginBottom: 26 }}>
          <h2 style={{ fontSize: 40, fontWeight: 900, margin: 0 }}>Course Curriculum</h2>
          <p style={{ marginTop: 12, color: 'rgba(255,255,255,0.65)', fontSize: 18 }}>
            Part를 선택하면 해당 범위의 Chapter가 표시됩니다.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="교재 Part 선택"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
            gap: 12,
            marginBottom: 28,
          }}
          className="part-tabs"
        >
          {PARTS.map((part) => {
            const active = selectedPart === part.id;
            return (
              <button
                key={part.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedPart(part.id)}
                style={{
                  minWidth: 0,
                  textAlign: 'left',
                  padding: '16px 18px',
                  borderRadius: 18,
                  cursor: 'pointer',
                  color: 'white',
                  border: active
                    ? '1px solid rgba(129,140,248,0.95)'
                    : '1px solid rgba(255,255,255,0.08)',
                  background: active
                    ? 'linear-gradient(135deg,rgba(79,70,229,0.9),rgba(124,58,237,0.8))'
                    : 'rgba(255,255,255,0.05)',
                  boxShadow: active ? '0 16px 36px rgba(79,70,229,0.25)' : 'none',
                  boxSizing: 'border-box',
                }}
              >
                <div style={{ fontWeight: 900, fontSize: 17 }}>{part.label}</div>
                <div style={{ marginTop: 5, fontSize: 13, opacity: 0.85 }}>{part.range}</div>
                <div style={{ marginTop: 7, fontSize: 12, opacity: 0.68 }}>
                  {part.description}
                </div>
              </button>
            );
          })}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'end',
            gap: 16,
            flexWrap: 'wrap',
            marginBottom: 20,
          }}
        >
          <div>
            <div style={{ fontSize: 28, fontWeight: 900 }}>{selectedPartInfo.label}</div>
            <div style={{ marginTop: 7, color: 'rgba(255,255,255,0.65)' }}>
              {selectedPartInfo.range} · {selectedPartInfo.description}
            </div>
          </div>
          <div
            style={{
              padding: '9px 15px',
              borderRadius: 999,
              background: 'rgba(16,185,129,0.15)',
              color: '#6ee7b7',
              fontWeight: 800,
              fontSize: 13,
            }}
          >
            1, 2, 14장 무료
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 22,
          }}
        >
          {visibleChapters.map((chapter) => (
            <article
              key={chapter.id}
              data-tutorial="home-chapter-card"
              style={{
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 24,
                padding: 24,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                opacity: chapter.available ? 1 : 0.72,
                boxSizing: 'border-box',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 18,
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    flex: '0 0 52px',
                    borderRadius: 16,
                    background: 'linear-gradient(135deg,#4f46e5,#7c3aed)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                    fontSize: 19,
                  }}
                >
                  {chapter.id}
                </div>
                <div
                  style={{
                    padding: '7px 11px',
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 800,
                    background:
                      chapter.access === 'sample'
                        ? 'rgba(16,185,129,0.15)'
                        : chapter.access === 'unlocked'
                          ? 'rgba(59,130,246,0.15)'
                          : chapter.access === 'locked'
                            ? 'rgba(245,158,11,0.15)'
                            : 'rgba(148,163,184,0.14)',
                    color:
                      chapter.access === 'sample'
                        ? '#6ee7b7'
                        : chapter.access === 'unlocked'
                          ? '#93c5fd'
                          : chapter.access === 'locked'
                            ? '#fcd34d'
                            : '#cbd5e1',
                  }}
                >
                  {chapter.access === 'sample'
                    ? 'FREE'
                    : chapter.access === 'unlocked'
                      ? 'UNLOCKED'
                      : chapter.access === 'locked'
                        ? 'LOCKED'
                        : 'PREPARING'}
                </div>
              </div>

              <h3
                style={{
                  margin: 0,
                  fontSize: 25,
                  lineHeight: 1.25,
                  fontWeight: 900,
                  overflowWrap: 'anywhere',
                }}
              >
                {chapter.title}
              </h3>

              <p
                style={{
                  color: 'rgba(255,255,255,0.72)',
                  lineHeight: 1.7,
                  minHeight: 78,
                  marginBottom: 18,
                }}
              >
                {chapter.description}
              </p>

              <div style={{ marginTop: 'auto' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 12,
                    fontSize: 14,
                    marginBottom: 9,
                  }}
                >
                </div>

                <div style={{ marginBottom: 18 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: 14,
                      marginBottom: 8,
                    }}
                  >
                    <span style={{ opacity: 0.65 }}>
                      학습 진행률
                      {chapter.available && totalProblemsByChapter[chapter.id]
                        ? ` · 전체 ${totalProblemsByChapter[chapter.id]}문항`
                        : ''}
                    </span>
                    <span style={{ fontWeight: 700 }}>{chapter.progress}%</span>
                  </div>
                  <div
                    style={{
                      height: 9,
                      borderRadius: 999,
                      background: 'rgba(255,255,255,0.08)',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${chapter.progress}%`,
                        height: '100%',
                        borderRadius: 999,
                        background: 'linear-gradient(90deg,#4f46e5,#8b5cf6)',
                      }}
                    />
                  </div>
                </div>

                {chapter.access === 'sample' && chapter.href ? (
                  <Link
                    href={chapter.href}
                    style={{
                      display: 'flex',
                      width: '100%',
                      minHeight: 52,
                      padding: '13px 18px',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxSizing: 'border-box',
                      borderRadius: 16,
                      textDecoration: 'none',
                      background: 'linear-gradient(135deg,#4f46e5,#7c3aed)',
                      color: 'white',
                      fontWeight: 800,
                      fontSize: 16,
                      boxShadow: '0 16px 34px rgba(99,102,241,0.28)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    학습 시작 →
                  </Link>
                ) : chapter.access === 'unlocked' && chapter.href ? (
                  <Link
                    href={chapter.href}
                    style={{
                      display: 'flex',
                      width: '100%',
                      minHeight: 52,
                      padding: '13px 18px',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxSizing: 'border-box',
                      borderRadius: 16,
                      textDecoration: 'none',
                      background: 'linear-gradient(135deg,#2563eb,#4f46e5)',
                      color: 'white',
                      fontWeight: 800,
                      fontSize: 16,
                      boxShadow: '0 16px 34px rgba(37,99,235,0.22)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    학습 시작 →
                  </Link>
                ) : chapter.access === 'locked' && chapter.href ? (
                  <Link
                    href={chapter.href}
                    style={{
                      display: 'flex',
                      width: '100%',
                      minHeight: 52,
                      padding: '13px 18px',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxSizing: 'border-box',
                      borderRadius: 16,
                      textDecoration: 'none',
                      background: 'rgba(245,158,11,0.12)',
                      color: '#fcd34d',
                      border: '1px solid rgba(245,158,11,0.25)',
                      fontWeight: 800,
                      fontSize: 16,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    🔒 {chapterCosts[chapter.id] != null
                      ? `${chapterCosts[chapter.id]} Credit으로 해금`
                      : '가격 확인 중...'}
                  </Link>
                ) : (
                  <button
                    type="button"
                    disabled
                    style={{
                      display: 'block',
                      width: '100%',
                      minHeight: 52,
                      padding: '13px 18px',
                      boxSizing: 'border-box',
                      borderRadius: 16,
                      border: 'none',
                      background: 'rgba(255,255,255,0.06)',
                      color: 'rgba(255,255,255,0.52)',
                      fontWeight: 700,
                      cursor: 'not-allowed',
                    }}
                  >
                    준비 중
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {isAuthenticated !== null && (
        <>
          <TutorialIntroPrompt
            storageKey="workbook_tutorial_home_v1"
            onStart={() => setHomeTutorialOpen(true)}
          />

          <TutorialOverlay
            steps={HOME_TUTORIAL_STEPS}
            storageKey="workbook_tutorial_home_v1"
            open={homeTutorialOpen}
            onClose={() => setHomeTutorialOpen(false)}
            onComplete={() => setHomeTutorialOpen(false)}
          />
        </>
      )}

      {showHistoryAuthPrompt && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setShowHistoryAuthPrompt(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'grid',
            placeItems: 'center',
            padding: 20,
            background: 'rgba(15,23,42,0.58)',
            backdropFilter: 'blur(3px)',
          }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: 430,
              padding: 26,
              borderRadius: 20,
              background: '#fff',
              color: '#111827',
              boxShadow: '0 24px 70px rgba(15,23,42,0.30)',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 900, color: '#4f46e5' }}>
              무료 회원 기능
            </div>

            <h2 style={{ margin: '8px 0 0', fontSize: 24, fontWeight: 900 }}>
              학습 기록은 로그인 후 확인할 수 있습니다
            </h2>

            <p
              style={{
                margin: '12px 0 0',
                color: '#6b7280',
                lineHeight: 1.7,
              }}
            >
              로그인하면 저장한 답안, 학습 진행률, 내 답안 채점 결과를 계정에서 계속 확인할 수 있습니다.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 10,
                marginTop: 22,
              }}
            >
              <Link
                href="/login"
                style={{
                  minHeight: 46,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #d1d5db',
                  borderRadius: 12,
                  textDecoration: 'none',
                  background: '#fff',
                  color: '#111827',
                  fontWeight: 900,
                }}
              >
                로그인
              </Link>

              <Link
                href="/login"
                style={{
                  minHeight: 46,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 12,
                  textDecoration: 'none',
                  background: '#4f46e5',
                  color: '#fff',
                  fontWeight: 900,
                }}
              >
                무료 회원가입
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setShowHistoryAuthPrompt(false)}
              style={{
                width: '100%',
                marginTop: 12,
                padding: 8,
                border: 0,
                cursor: 'pointer',
                background: 'transparent',
                color: '#6b7280',
                fontWeight: 700,
              }}
            >
              닫기
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .home-header-actions > button,
        .home-header-actions > a {
          min-height: 42px !important;
          padding: 10px 14px !important;
          box-sizing: border-box !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          font-size: 13px !important;
          line-height: 1.2 !important;
        }

        @media (max-width: 900px) {
          .hero-section {
            grid-template-columns: 1fr !important;
            padding-top: 48px !important;
          }
          .hero-title {
            font-size: 48px !important;
          }
          .part-tabs {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 560px) {
          .home-header-inner {
            align-items: flex-start !important;
            flex-direction: column !important;
            padding: 14px 18px !important;
          }
          .home-header-actions {
            width: 100% !important;
            justify-content: stretch !important;
          }
          .home-header-actions > button,
          .home-header-actions > a {
            flex: 1 1 140px !important;
          }
          .hero-section {
            padding-left: 18px !important;
            padding-right: 18px !important;
          }
          .hero-title {
            font-size: 40px !important;
            letter-spacing: -1px !important;
          }
          .hero-stat-grid {
            grid-template-columns: 1fr !important;
          }
          .part-tabs {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
