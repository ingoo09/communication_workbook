'use client';

import Link from 'next/link';
import {
  BookOpen,
  Lock,
  PlayCircle,
  Sparkles,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';

const chapters = [
  {
    id: 1,
    title: 'Python Basics',
    description:
      'Python 기초 활용 방법을 학습합니다.',
    href: '/workbook/ch1-python-basics',
    free: true,
    progress: 100,
    level: 'Beginner',
    duration: '2h 30m',
  },

  {
    id: 2,
    title:
      'Numerical Integration & Orthogonal Expansion',
    description:
      '수치적분법과 직교 함수 전개를 통해 통신 신호 해석의 기초를 학습합니다.',
    href: '/workbook/ch2-orthogonality',
    free: true,
    progress: 65,
    level: 'Intermediate',
    duration: '4h 10m',
  },

  {
    id: 3,
    title:
      'Fourier Series & Frequency Transfer Function',
    description:
      '푸리에 급수와 선형 시스템의 주파수 전달 함수 개념을 학습합니다.',
    href: '/workbook/ch3',
    free: true,
    progress: 20,
    level: 'Intermediate',
    duration: '5h 00m',
  },

  // 앞으로 30장까지 확장 가능
  {
    id: 4,
    title: 'Fourier Transform',
    description:
      '주기함수의 스펙트럼을 파악하고, 샘플링된 데이터를 사용하여 푸리에 변환을 이해합니다.',
    href: '#',
    free: false,
    progress: 0,
    level: 'Advanced',
    duration: '6h',
  },

  {
    id: 5,
    title: 'Fourier Transform의 성질, Convolution',
    description:
      '수치적분을 이용하여 두 시간함수의 콘볼루션을 계산하고, 주파수 축에서 어떤 의미를 지니는지 학습합니다.',
    href: '#',
    free: false,
    progress: 0,
    level: 'Advanced',
    duration: '7h',
  },

];

export default function WorkbookHome() {
  return (
    <main className="min-h-screen bg-[#0b1020] text-white">

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10">

        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-cyan-500/10 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-6 py-20">

          <div className="max-w-3xl">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
              <Sparkles size={16} />
              AI Interactive Engineering Workbook
            </div>

            <h1 className="text-5xl font-black leading-tight tracking-tight md:text-6xl">
              통신시스템과
              <br />
              디지털통신
              <br />
              온라인 워크북
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              Python 실습 · 수학 시각화 · AI 채점 ·
              인터랙티브 학습이 결합된
              차세대 공학 교육 플랫폼
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                href="/workbook/ch1-python-basics"
                className="inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-6 py-4 font-semibold text-black transition hover:scale-[1.02]"
              >
                <PlayCircle size={20} />
                학습 시작하기
              </Link>

              <button className="rounded-2xl border border-white/15 bg-white/5 px-6 py-4 font-semibold text-white backdrop-blur hover:bg-white/10">
                커리큘럼 보기
              </button>

            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-white/10 bg-[#111827]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-8 md:grid-cols-4">

          <div>
            <div className="text-3xl font-black">30</div>
            <div className="mt-1 text-sm text-gray-400">
              Total Chapters
            </div>
          </div>

          <div>
            <div className="text-3xl font-black">AI</div>
            <div className="mt-1 text-sm text-gray-400">
              Auto Grading
            </div>
          </div>

          <div>
            <div className="text-3xl font-black">
              Python
            </div>
            <div className="mt-1 text-sm text-gray-400">
              Interactive Coding
            </div>
          </div>

          <div>
            <div className="text-3xl font-black">
              LaTeX
            </div>
            <div className="mt-1 text-sm text-gray-400">
              Engineering Math
            </div>
          </div>

        </div>
      </section>

      {/* Chapter List */}
      <section className="mx-auto max-w-7xl px-6 py-14">

        <div className="mb-10 flex items-end justify-between">

          <div>
            <h2 className="text-3xl font-black">
              Course Curriculum
            </h2>

            <p className="mt-2 text-gray-400">
              코세라 스타일의 모듈형 학습 구조
            </p>
          </div>

          <div className="hidden rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 md:block">
            현재 1~3장 무료 공개
          </div>

        </div>

        <div className="grid gap-6">

          {chapters.map((chapter) => (
            <div
              key={chapter.id}
              className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-cyan-400/30 hover:bg-white/[0.07]"
            >

              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                {/* Left */}
                <div className="flex gap-5">

                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 text-black shadow-lg shadow-cyan-500/20">
                    <BookOpen size={30} />
                  </div>

                  <div>

                    <div className="mb-2 flex flex-wrap items-center gap-2">

                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-gray-300">
                        CHAPTER {chapter.id}
                      </span>

                      <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                        {chapter.level}
                      </span>

                      {chapter.free ? (
                        <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                          FREE
                        </span>
                      ) : (
                        <span className="rounded-full bg-orange-400/10 px-3 py-1 text-xs font-semibold text-orange-300">
                          LOCKED
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-black leading-tight">
                      {chapter.title}
                    </h3>

                    <p className="mt-3 max-w-3xl leading-7 text-gray-400">
                      {chapter.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-6 text-sm text-gray-400">

                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={16} />
                        AI 채점 지원
                      </div>

                      <div>
                        예상 학습시간:
                        {' '}
                        {chapter.duration}
                      </div>

                    </div>

                    {/* Progress */}
                    <div className="mt-5 w-full max-w-xl">

                      <div className="mb-2 flex justify-between text-xs text-gray-400">
                        <span>학습 진행률</span>
                        <span>{chapter.progress}%</span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                          style={{
                            width: `${chapter.progress}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="flex flex-shrink-0 items-center">

                  {chapter.free ? (
                    <Link
                      href={chapter.href}
                      className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-4 font-semibold text-black transition hover:scale-[1.02]"
                    >
                      학습 시작
                      <ChevronRight size={18} />
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="inline-flex cursor-not-allowed items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-semibold text-gray-400"
                    >
                      <Lock size={18} />
                      준비 중
                    </button>
                  )}

                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-white/10 bg-[#111827]">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-20 text-center">

          <h2 className="text-4xl font-black">
            Interactive Engineering Learning
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-400">
            AI 기반 자동 채점, Python 실습,
            수학 시각화, 그래프 출력까지
            하나의 워크북에서 학습하세요.
          </p>

          <Link
            href="/workbook/ch1-python-basics"
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-8 py-4 text-lg font-bold text-black transition hover:scale-[1.03]"
          >
            무료 챕터 시작하기
            <ChevronRight size={20} />
          </Link>

        </div>
      </section>
    </main>
  );
}