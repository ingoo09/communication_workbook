'use client';

import Link from 'next/link';

const chapters = [
  {
    id: 1,
    title: 'Python Basics',
    level: 'Beginner',
    free: true,
    href: '/workbook/ch1-python-basics',
    progress: 100,
    duration: '2h 30m',
    description:
      'Python과 Numpy의 기본 문법 및 배열 연산을 실습하며 학습합니다.',
  },

  {
    id: 2,
    title:
      'Numerical Integration & Orthogonal Expansion',
    level: 'Intermediate',
    free: true,
    href: '/workbook/ch2-orthogonality',
    progress: 65,
    duration: '4h 10m',
    description:
      '수치적분법과 직교 함수 전개를 통해 통신 신호 해석의 기초를 학습합니다.',
  },

  {
    id: 3,
    title:
      'Fourier Series & Frequency Transfer Function',
    level: 'Intermediate',
    free: true,
    href: '/workbook/ch3',
    progress: 20,
    duration: '5h 00m',
    description:
      '푸리에 급수와 선형 시스템의 주파수 전달 함수를 학습합니다.',
  },

  {
    id: 4,
    title: 'Fourier Transform',
    level: 'Advanced',
    free: false,
    href: '#',
    progress: 0,
    duration: '6h',
    description:
      '푸리에 변환과 스펙트럼 분석 개념을 학습합니다.',
  },

  {
    id: 5,
    title:
      'Fourier Transform의 성질 Convolution',
    level: 'Advanced',
    free: false,
    href: '#',
    progress: 0,
    duration: '5h 30m',
    description:
      '선형 시불변 시스템과 convolution 연산을 학습합니다.',
  },

  {
    id: 6,
    title: 'LPF and BPF Design',
    level: 'Advanced',
    free: false,
    href: '#',
    progress: 0,
    duration: '7h',
    description:
      'LPF, BPF를 설계하고, 주파수 특성과 임펄스 응답을 학습합니다.',
  },

];

export default function WorkbookHome() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(180deg, #081120 0%, #0f172a 100%)',
        color: 'white',
        fontFamily:
          'Inter, Pretendard, Arial, sans-serif',
      }}
    >
      {/* NAVBAR */}
      <header
        style={{
          width: '100%',
          borderBottom:
            '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background:
            'rgba(8,17,32,0.75)',
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: '0 auto',
            padding:
              '18px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent:
              'space-between',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 14,
                opacity: 0.7,
              }}
            >
              AI Interactive Engineering Workbook
            </div>

            <div
              style={{
                fontSize: 24,
                fontWeight: 800,
                marginTop: 4,
              }}
            >
              통신시스템과 디지털통신
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              gap: 12,
              alignItems: 'center',
            }}
          >
            <button
              style={{
                background:
                  'rgba(255,255,255,0.08)',
                color: 'white',
                border: 'none',
                padding:
                  '10px 18px',
                borderRadius: 12,
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              Dashboard
            </button>

            <button
              style={{
                background:
                  'linear-gradient(135deg,#4f46e5,#7c3aed)',
                color: 'white',
                border: 'none',
                padding:
                  '10px 18px',
                borderRadius: 12,
                cursor: 'pointer',
                fontWeight: 700,
                boxShadow:
                  '0 10px 30px rgba(99,102,241,0.35)',
              }}
            >
              Start Learning
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding:
            '80px 28px 50px',
          display: 'grid',
          gridTemplateColumns:
            '1.2fr 0.8fr',
          gap: 40,
          alignItems: 'center',
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding:
                '8px 14px',
              borderRadius: 999,
              background:
                'rgba(99,102,241,0.14)',
              color: '#c7d2fe',
              fontSize: 14,
              fontWeight: 700,
              marginBottom: 26,
            }}
          >
            AI + Python + Interactive Learning
          </div>

          <h1
            style={{
              fontSize: 64,
              lineHeight: 1.05,
              fontWeight: 900,
              margin: 0,
              letterSpacing: '-2px',
            }}
          >
            차세대
            <br />
            공학 교육 플랫폼
          </h1>

          <p
            style={{
              marginTop: 28,
              fontSize: 20,
              lineHeight: 1.8,
              color:
                'rgba(255,255,255,0.75)',
              maxWidth: 760,
            }}
          >
            Python 실습, AI 채점,
            수학 시각화,
            인터랙티브 문제 풀이를
            결합한
            디지털통신 학습 시스템
          </p>

          <div
            style={{
              marginTop: 36,
              display: 'flex',
              gap: 16,
              flexWrap: 'wrap',
            }}
          >
            <button
              style={{
                background:
                  'linear-gradient(135deg,#4f46e5,#7c3aed)',
                border: 'none',
                color: 'white',
                padding:
                  '16px 28px',
                borderRadius: 18,
                fontSize: 16,
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow:
                  '0 20px 40px rgba(79,70,229,0.35)',
              }}
            >
              학습 시작하기
            </button>

            <button
              style={{
                background:
                  'rgba(255,255,255,0.06)',
                border:
                  '1px solid rgba(255,255,255,0.08)',
                color: 'white',
                padding:
                  '16px 28px',
                borderRadius: 18,
                fontSize: 16,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              커리큘럼 보기
            </button>
          </div>
        </div>

        {/* RIGHT HERO CARD */}
        <div
          style={{
            background:
              'rgba(255,255,255,0.05)',
            border:
              '1px solid rgba(255,255,255,0.08)',
            borderRadius: 32,
            padding: 32,
            backdropFilter:
              'blur(16px)',
            boxShadow:
              '0 30px 80px rgba(0,0,0,0.35)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                '1fr 1fr',
              gap: 18,
            }}
          >
            {[
              {
                value: '30',
                label:
                  'Total Chapters',
              },
              {
                value: 'AI',
                label:
                  'Auto Grading',
              },
              {
                value: 'Python',
                label:
                  'Interactive Coding',
              },
              {
                value: 'LaTeX',
                label:
                  'Engineering Math',
              },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  padding:
                    '26px 20px',
                  borderRadius: 22,
                  background:
                    'rgba(255,255,255,0.04)',
                }}
              >
                <div
                  style={{
                    fontSize: 34,
                    fontWeight: 900,
                  }}
                >
                  {item.value}
                </div>

                <div
                  style={{
                    marginTop: 8,
                    opacity: 0.7,
                    fontSize: 14,
                  }}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSE SECTION */}
      <section
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding:
            '10px 28px 100px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent:
              'space-between',
            alignItems: 'center',
            marginBottom: 28,
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <div>
            <h2
              style={{
                fontSize: 40,
                fontWeight: 900,
                margin: 0,
              }}
            >
              Course Curriculum
            </h2>

            <p
              style={{
                marginTop: 12,
                color:
                  'rgba(255,255,255,0.65)',
                fontSize: 18,
              }}
            >
              코세라 스타일의
              인터랙티브 학습 구조
            </p>
          </div>

          <div
            style={{
              padding:
                '10px 18px',
              borderRadius: 999,
              background:
                'rgba(16,185,129,0.15)',
              color: '#6ee7b7',
              fontWeight: 700,
            }}
          >
            현재 1~3장 무료 공개
          </div>
        </div>

        {/* CHAPTER GRID */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit,minmax(340px,1fr))',
            gap: 28,
          }}
        >
          {chapters.map((chapter) => {
            const locked =
              !chapter.free;

            return (
              <div
                key={chapter.id}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 28,
                  padding: 28,
                  background:
                    'rgba(255,255,255,0.05)',
                  border:
                    '1px solid rgba(255,255,255,0.08)',
                  backdropFilter:
                    'blur(18px)',
                  transition:
                    '0.25s',
                  opacity: locked
                    ? 0.7
                    : 1,
                }}
              >
                {/* TOP */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent:
                      'space-between',
                    alignItems: 'center',
                    marginBottom: 20,
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 18,
                      background:
                        'linear-gradient(135deg,#4f46e5,#7c3aed)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent:
                        'center',
                      fontWeight: 900,
                      fontSize: 20,
                    }}
                  >
                    {chapter.id}
                  </div>

                  <div
                    style={{
                      padding:
                        '8px 12px',
                      borderRadius: 999,
                      fontSize: 12,
                      fontWeight: 800,
                      background:
                        chapter.free
                          ? 'rgba(16,185,129,0.15)'
                          : 'rgba(239,68,68,0.15)',
                      color:
                        chapter.free
                          ? '#6ee7b7'
                          : '#fca5a5',
                    }}
                  >
                    {chapter.free
                      ? 'FREE'
                      : 'LOCKED'}
                  </div>
                </div>

                {/* TITLE */}
                <div
                  style={{
                    fontSize: 14,
                    color:
                      'rgba(255,255,255,0.5)',
                    fontWeight: 700,
                    letterSpacing: 1,
                  }}
                >
                  CHAPTER {chapter.id}
                </div>

                <h3
                  style={{
                    marginTop: 10,
                    marginBottom: 14,
                    fontSize: 32,
                    lineHeight: 1.15,
                    fontWeight: 900,
                  }}
                >
                  {chapter.title}
                </h3>

                <p
                  style={{
                    color:
                      'rgba(255,255,255,0.72)',
                    lineHeight: 1.7,
                    minHeight: 72,
                  }}
                >
                  {chapter.description}
                </p>

                {/* META */}
                <div
                  style={{
                    marginTop: 22,
                    display: 'flex',
                    flexDirection:
                      'column',
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent:
                        'space-between',
                      fontSize: 14,
                    }}
                  >
                    <span
                      style={{
                        opacity: 0.65,
                      }}
                    >
                      예상 학습시간
                    </span>

                    <span
                      style={{
                        fontWeight: 700,
                      }}
                    >
                      {chapter.duration}
                    </span>
                  </div>

                  <div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent:
                          'space-between',
                        marginBottom: 8,
                        fontSize: 14,
                      }}
                    >
                      <span
                        style={{
                          opacity: 0.65,
                        }}
                      >
                        학습 진행률
                      </span>

                      <span
                        style={{
                          fontWeight: 700,
                        }}
                      >
                        {
                          chapter.progress
                        }
                        %
                      </span>
                    </div>

                    <div
                      style={{
                        height: 10,
                        borderRadius: 999,
                        background:
                          'rgba(255,255,255,0.08)',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: `${chapter.progress}%`,
                          height:
                            '100%',
                          borderRadius: 999,
                          background:
                            'linear-gradient(90deg,#4f46e5,#8b5cf6)',
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* BUTTON */}
                <div
                  style={{
                    marginTop: 28,
                  }}
                >
                  {chapter.free ? (
                    <Link
                      href={
                        chapter.href
                      }
                      style={{
                        display:
                          'inline-flex',
                        alignItems:
                          'center',
                        justifyContent:
                          'center',
                        width: '100%',
                        padding:
                          '16px 20px',
                        borderRadius: 18,
                        textDecoration:
                          'none',
                        background:
                          'linear-gradient(135deg,#4f46e5,#7c3aed)',
                        color: 'white',
                        fontWeight: 800,
                        fontSize: 16,
                        boxShadow:
                          '0 18px 40px rgba(99,102,241,0.3)',
                      }}
                    >
                      학습 시작 →
                    </Link>
                  ) : (
                    <button
                      disabled
                      style={{
                        width: '100%',
                        padding:
                          '16px 20px',
                        borderRadius: 18,
                        border: 'none',
                        background:
                          'rgba(255,255,255,0.06)',
                        color:
                          'rgba(255,255,255,0.5)',
                        fontWeight: 700,
                        cursor:
                          'not-allowed',
                      }}
                    >
                      곧 공개 예정
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}