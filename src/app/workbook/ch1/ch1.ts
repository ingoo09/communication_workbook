import type { WorkbookChapter } from '@/types/workbook';

export const chapter = {
  id: '1-python-basics',
  title: '1장. 파이썬 기초',
  sections: [
    {
      id: '1-1A',
      title: '1.A 스칼라 변수와 기본 연산',
      problems: [
        {
          id: '1-1A1',
          type: 'console',
          title: '1.A1.',
          prompt:
            '아래 명령을 순서대로 실행하고 Console 결과를 확인하시오. 각 명령이 수행하는 동작과 출력 결과의 의미를 자신의 말로 작성하시오.',
          setupCode: 'import numpy as np',
          items: [
            {
              id: 'command-1',
              command: 'A = 12',
              prompt: '대입문을 실행한 뒤 Console에 값이 출력되는지 확인하시오.',
              referenceExplanation:
                '정수 12를 변수 A에 저장한다. 대입문은 값을 저장하는 명령이므로 별도의 출력은 나타나지 않는다.',
            },
            {
              id: 'command-2',
              command: 'A',
              prompt: '변수 이름만 입력했을 때 표시되는 값을 확인하시오.',
              validation: { mode: 'exact', expectedOutput: '12' },
              referenceExplanation:
                '현재 변수 A에 저장된 값을 조회하므로 12가 출력된다.',
            },
            {
              id: 'command-3',
              command: 'B = A ** 3',
              prompt: '`**` 연산자의 의미와 변수 B에 저장되는 값을 설명하시오.',
              referenceExplanation:
                'A의 세제곱을 계산하여 B에 저장한다. A가 12이므로 B에는 1728이 저장되며 대입문 자체는 출력이 없다.',
            },
            {
              id: 'command-4',
              command: 'B * 6',
              validation: { mode: 'exact', expectedOutput: '10368' },
              referenceExplanation:
                'B에 저장된 1728에 6을 곱한다. 변수 B의 값은 바뀌지 않고 계산 결과 10368만 출력된다.',
            },
            {
              id: 'command-5',
              command: 'B / 5',
              validation: { mode: 'numeric', expectedValue: 345.6, tolerance: 1e-12 },
              referenceExplanation:
                '일반 나눗셈 연산으로 B를 5로 나눈다. Python의 `/` 결과는 실수 345.6으로 출력된다.',
            },
            {
              id: 'command-6',
              command: 'B // 5',
              validation: { mode: 'exact', expectedOutput: '345' },
              referenceExplanation:
                '`//`는 몫을 구하는 바닥 나눗셈 연산자이다. 1728을 5로 나눈 몫 345가 출력된다.',
            },
            {
              id: 'command-7',
              command: 'B % 5',
              validation: { mode: 'exact', expectedOutput: '3' },
              referenceExplanation:
                '`%`는 나머지 연산자이다. 1728을 5로 나눈 나머지 3이 출력된다.',
            },
          ],
          referenceAnswer:
            '각 명령별 모범 설명은 Console 화면에서 작성한 답안과 비교할 수 있다. 핵심은 대입문과 표현식의 차이, 거듭제곱, 일반 나눗셈, 몫, 나머지 연산을 구분하는 것이다.',
        },
      ],
    },
  ],
} as const satisfies WorkbookChapter;
