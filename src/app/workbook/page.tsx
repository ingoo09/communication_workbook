'use client';

export default function WorkbookHome() {
  return (
    <main className="min-h-screen p-4">
      <div className="mx-auto w-full max-w-4xl space-y-4">
        <header>
          <h1 className="text-2xl font-bold mb-2">온라인 워크북 (테스트 버전)</h1>
          <p className="text-sm">
            학습하고 싶은 장(챕터)을 선택해보세요. 지금은 1장, 2장은 모두 테스트용으로 무료로 열려 있습니다.
          </p>
        </header>

        <section className="space-y-3 text-sm">
          <div>
            <h2 className="font-semibold">1장. 파이썬/Numpy 기본 명령 이해하기(무료 체험)</h2>
            <p>Google Colab에서 파이썬/Numpy 기본 명령을 실행해 보고, 결과를 해석하는 연습 장입니다.</p>
            <a
              href="/workbook/ch1-python-basics"
              className="inline-block mt-1 px-3 py-1 border rounded-md bg-gray-900 hover:bg-gray-800 text-xs"
            >
              1장 문제 풀러가기
            </a>
          </div>

          <div>
            <h2 className="font-semibold">2장. 직교성과 푸리어 급수(무료 체험)</h2>
            <p>직교성, 직교 기저, 푸리어 급수 개념을 문제 풀이와 함께 익히는 장입니다.</p>
            <a
              href="/workbook/ch2-orthogonality"
              className="inline-block mt-1 px-3 py-1 border rounded-md bg-gray-900 hover:bg-gray-800 text-xs"
            >
              2장 문제 풀러가기
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}