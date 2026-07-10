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
            '아래 명령을 순서대로 실행하고 Console 결과를 확인하시오. 각 명령이 수행하는 동작과 출력 결과의 의미를 작성하고, 만약 오류 메시지가 출력되면 그 오류의 의미를 작성하시오.',
          setupCode: 'import numpy as np',
          items: [
            {
              id: 'command-1',
              command: 'A=12; A',
              referenceExplanation:
                '정수 12를 변수 A에 저장한다. 변수 A에 저장된 값을 조회하므로 12가 출력된다.',
            },
            {
              id: 'command-2',
              command: 'B',
              referenceExplanation:
                '변수 B에 저장된 값을 조회하지만, 변수 B에 저장된 값이 없으므로 오류가 발생한다.',
            },
            {
              id: 'command-3',
              command: 'B=A*3; B',
              validation: { mode: 'exact', expectedOutput: '18' },
              referenceExplanation:
                'A에 3을 곱한 값을 변수 B에 저장한다. 결과는 18이 출력된다.',
            },
            {
              id: 'command-4',
              command: 'B * 6',
              validation: { mode: 'exact', expectedOutput: '108' },
              referenceExplanation:
                '곱셈 연산으로 B에 6을 곱한다. 18에 6을 곱한 108이 출력되고, 변수 B에 별도로 저장되지는 않는다',
            },
            {
              id: 'command-5',
              command: 'B / 5',
              validation: { mode: 'numeric', expectedValue: 3.6, tolerance: 1e-12 },
              referenceExplanation:
                '일반 나눗셈 연산으로 B를 5로 나눈다. Python의 `/` 결과는 실수 3.6으로 출력된다.',
            },
            {
              id: 'command-6',
              command: 'B // 5',
              validation: { mode: 'exact', expectedOutput: '3' },
              referenceExplanation:
                '`//`는 몫을 구하는 바닥 나눗셈 연산자이다. 18을 5로 나눈 몫 3이 출력된다.',
            },
            {
              id: 'command-7',
              command: 'B % 5',
              validation: { mode: 'exact', expectedOutput: '3' },
              referenceExplanation:
                '`%`는 나머지 연산자이다. 18을 5로 나눈 나머지 3이 출력된다.',
            },
            {
              id: 'command-15',
              command: 'A = 12e6',
              validation: { mode: 'exact', expectedOutput: '12e6' },
              referenceExplanation:
                '',
            },
          ],
          referenceAnswer:
            '각 명령별 모범 설명은 Console 화면에서 작성한 답안과 비교할 수 있다. 핵심은 대입문과 표현식의 차이, 거듭제곱, 일반 나눗셈, 몫, 나머지 연산을 구분하는 것이다.',
        },
      ],
    },
  ],
} as const satisfies WorkbookChapter;
