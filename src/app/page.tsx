'use client';

import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';

type PartId = 1 | 2 | 3 | 4;

type Chapter = {
  id: number;
  part: PartId;
  title: string;
  href?: string;
  available: boolean;
  progress: number;
  duration: string;
  description: string;
};

const PARTS: Array<{
  id: PartId;
  label: string;
  range: string;
  description: string;
}> = [
  { id: 1, label: 'Part 1', range: '1~8장', description: '신호와 시스템의 기초' },
  { id: 2, label: 'Part 2', range: '9~13장', description: '아날로그 및 디지털 변조' },
  { id: 3, label: 'Part 3', range: '14~24장', description: '확률 과정과 디지털 통신' },
  { id: 4, label: 'Part 4', range: '25~30장', description: '심화 통신 시스템' },
];

const knownChapters: Record<number, Pick<Chapter, 'title' | 'description' | 'duration'>> = {
  1: {
    title: 'Python Basics',
    duration: '2h 30m',
    description: 'Python과 NumPy의 기본 문법 및 배열 연산을 실습하며 학습합니다.',
  },
  2: {
    title: 'Numerical Integration & Orthogonal Expansion',
    duration: '4h 10m',
    description: '수치적분법과 직교 함수 전개를 통해 통신 신호 해석의 기초를 학습합니다.',
  },
  3: {
    title: 'Fourier Series & Frequency Transfer Function',
    duration: '5h 00m',
    description: '푸리에 급수와 선형 시스템의 주파수 전달 함수를 학습합니다.',
  },
  4: {
    title: 'Fourier Transform',
    duration: '6h',
    description: '푸리에 변환과 스펙트럼 분석 개념을 학습합니다.',
  },
  5: {
    title: 'Fourier Transform Properties & Convolution',
    duration: '5h 30m',
    description: '푸리에 변환의 성질과 convolution 연산을 학습합니다.',
  },
  6: {
    title: 'LPF and BPF Design',
    duration: '7h',
    description: 'LPF와 BPF의 주파수 특성 및 임펄스 응답을 학습합니다.',
  },
  7: {
    title: 'Sampling and Signal Reconstruction',
    duration: '7h',
    description: '샘플링에 의한 스펙트럼 변화와 신호 복원 원리를 학습합니다.',
  },
  8: {
    title: 'Correlation and Spectral Density',
    duration: '7h',
    description: '상관함수와 spectral density의 관계를 학습합니다.',
  },
};

function getPart(chapterId: number): PartId {
  if (chapterId <= 8) return 1;
  if (chapterId <= 13) return 2;
  if (chapterId <= 24) return 3;
  return 4;
}

const chapters: Chapter[] = Array.from({ length: 30 }, (_, index) => {
  const id = index + 1;
  const known = knownChapters[id];
  const available = id === 1 || id === 2;

  return {
    id,
    part: getPart(id),
    title: known?.title ?? `Chapter ${id}`,
    description:
      known?.description ?? '교재 원고와 실습 문제가 준비되는 대로 공개될 예정입니다.',
    duration: known?.duration ?? '준비 중',
    href: available ? `/workbook/ch${id}` : undefined,
    available,
    progress: id === 1 ? 100 : id === 2 ? 65 : 0,
  };
});

export default function WorkbookHome() {
  const [selectedPart, setSelectedPart] = useState<PartId>(1);
  const curriculumRef = useRef<HTMLElement | null>(null);

  const selectedPartInfo = PARTS.find((part) => part.id === selectedPart) ?? PARTS[0];
  const visibleChapters = useMemo(
    () => chapters.filter((chapter) => chapter.part === selectedPart),
    [selectedPart],
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
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 14, opacity: 0.7 }}>
              Communication System and Digital Communication Workbook
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, marginTop: 4 }}>
              통신시스템과 디지털통신
            </div>
          </div>

          <button
            type="button"
            onClick={() => moveToCurriculum(1)}
            style={{
              flex: '0 0 auto',
              minWidth: 124,
              maxWidth: '100%',
              boxSizing: 'border-box',
              whiteSpace: 'nowrap',
              background: 'linear-gradient(135deg,#4f46e5,#7c3aed)',
              color: 'white',
              border: 'none',
              padding: '11px 18px',
              borderRadius: 12,
              cursor: 'pointer',
              fontWeight: 800,
              boxShadow: '0 10px 30px rgba(99,102,241,0.35)',
            }}
          >
            학습 시작
          </button>
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
            Python 실습, AI 채점, 수학 시각화와 인터랙티브 문제 풀이를 결합한
            온라인 통신공학 교재입니다.
          </p>

          <div style={{ marginTop: 36, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button
              type="button"
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
              onClick={() => moveToCurriculum(selectedPart)}
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
              커리큘럼 보기
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
              { value: 'AI', label: 'Auto Grading' },
              { value: 'Python', label: 'Interactive Coding' },
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
            Part를 선택하면 해당 범위의 Chapter만 표시됩니다.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="교재 Part 선택"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
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
            현재 1~2장 학습 가능
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
                    background: chapter.available
                      ? 'rgba(16,185,129,0.15)'
                      : 'rgba(148,163,184,0.14)',
                    color: chapter.available ? '#6ee7b7' : '#cbd5e1',
                  }}
                >
                  {chapter.available ? 'AVAILABLE' : 'PREPARING'}
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
                  <span style={{ opacity: 0.65 }}>예상 학습시간</span>
                  <span style={{ fontWeight: 700 }}>{chapter.duration}</span>
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
                    <span style={{ opacity: 0.65 }}>학습 진행률</span>
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

                {chapter.available && chapter.href ? (
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

      <style jsx>{`
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
          .home-header-inner > button {
            width: 100% !important;
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
