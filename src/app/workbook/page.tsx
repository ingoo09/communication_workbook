'use client';

export default function WorkbookHome() {
  return (
    <main className="min-h-screen p-4">
      <div className="mx-auto w-full max-w-4xl space-y-4">
        <header>
          <h1 className="text-2xl font-bold mb-2">통신시스템과 디지털통신 온라인 워크북 (테스트 버전)</h1>
          <p className="text-sm">
            학습하고 싶은 장(챕터)을 선택하세요. 1~3장은 무료로 열려 있습니다.
          </p>
        </header>

        <section className="space-y-3 text-sm">
          <div>
            <h2 className="font-semibold">Chapter 1. Python Basics(Free)</h2>
            <p>Google Colab에서 파이썬/Numpy 기본 명령을 실행해 보고, 결과를 해석하는 연습 장입니다.</p>
            <a
              href="/workbook/ch1-python-basics"
              className="inline-block mt-1 px-3 py-1 border rounded-md bg-gray-900 hover:bg-gray-800 text-xs"
            >
              1장 문제 풀러가기
            </a>
          </div>

          <div>
            <h2 className="font-semibold">Chapter 2. Numerical Integration & Orthogonal expansion(Free)</h2>
            <p>임의의 함수에 대한 정적분을 수치적분법으로 구하고, 직교 함수들의 결합으로 나타냅니다.</p>
            <a
              href="/workbook/ch2-orthogonality"
              className="inline-block mt-1 px-3 py-1 border rounded-md bg-gray-900 hover:bg-gray-800 text-xs"
            >
              2장 문제 풀러가기
            </a>
          </div>

          <div>
            <h2 className="font-semibold">Chapter 3. Fourier Series and Frequency Transfer Function(Free)</h2>
            <p>푸리에 급수 정리를 확인하고, 선형 시스템에서 주파수 전달 함수의 개념을 익힙니다.</p>
            <a
              href="/workbook/ch3"
              className="inline-block mt-1 px-3 py-1 border rounded-md bg-gray-900 hover:bg-gray-800 text-xs"
            >
              3장 문제 풀러가기
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}