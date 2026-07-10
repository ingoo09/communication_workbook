import type { WorkbookChapter } from '@/types/workbook';

export const chapter = {
  id: '1-python-basics',
  title: 'Chapter 1. Python Basics',
  sections: [
    {
      id: '1-1',
      title: '1. Python의 다양한 변수 연산 및 그래프 출력',
      problems: [
        {
          id: '1-1A',
          type: 'console',
          title: '1.A.',
          prompt:
            '스칼라(실수, 복소수) 변수 연산\n아래 명령을 순서대로 실행하고 Console 결과를 확인하시오. 각 명령이 수행하는 동작과 출력 결과의 의미를 작성하고, 만약 오류 메시지가 출력되면 그 오류의 의미를 작성하시오.',
          setupCode: 'import numpy as np',
          items: [
            {
              id: 'command-1',
              command: 'A=12; print(A)',
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
              command: 'B=A*3; print(B)',
              validation: { mode: 'exact', expectedOutput: '36' },
              referenceExplanation:
                'A에 3을 곱한 값을 변수 B에 저장한다. 결과는 36이 출력된다.',
            },
            {
              id: 'command-4',
              command: 'B * 6',
              validation: { mode: 'exact', expectedOutput: '216' },
              referenceExplanation:
                '곱셈 연산으로 B에 6을 곱한다. 36에 6을 곱한 216이 출력되고, 변수 B에 별도로 저장되지는 않는다',
            },
            {
              id: 'command-5',
              command: 'B / 5',
              validation: { mode: 'numeric', expectedValue: 7.2, tolerance: 1e-12 },
              referenceExplanation:
                '일반 나눗셈 연산으로 B를 5로 나눈다. Python의 `/` 결과는 실수 7.2로 출력된다.',
            },
            {
              id: 'command-6',
              command: 'B // 5',
              validation: { mode: 'exact', expectedOutput: '7' },
              referenceExplanation:
                '`//`는 몫을 구하는 바닥 나눗셈 연산자이다. 36을 5로 나눈 몫 7이 출력된다.',
            },
            {
              id: 'command-7',
              command: 'B % 5',
              validation: { mode: 'exact', expectedOutput: '1' },
              referenceExplanation:
                '`%`는 나머지 연산자이다. 36을 5로 나눈 나머지 1이 출력된다.',
            },
            {
              id: 'command-15',
              command: 'A = 12e6; print(A)',
              validation: { mode: 'numeric', expectedValue: 12000000.0, tolerance: 1e-12 },
              referenceExplanation:
                '12에 10^6을 곱한 값을 변수 A에 저장한다. 변수 A에 저장된 값을 조회하므로 실수 12000000.0이 출력된다.',
            },
          ],
          referenceAnswer:
            '각 명령별 모범 설명은 Console 화면에서 작성한 답안과 비교할 수 있다. 핵심은 대입문과 표현식의 차이, 거듭제곱, 일반 나눗셈, 몫, 나머지 연산을 구분하는 것이다.',
        },
        {
          id: '1-1B',
          type: 'console',
          title: '1.B.',
          prompt:
            ' 벡터(1차원 Array) 변수 연산\n아래 명령을 순서대로 실행하고 Console 결과를 확인하시오. 각 명령이 수행하는 동작과 출력 결과의 의미를 작성하고, 만약 오류 메시지가 출력되면 그 오류의 의미를 작성하시오.',
          setupCode: 'import numpy as np',
          items: [
            {
              id: 'command-1',
              command: 'X=np.arange(-2,5); print(X)',
              referenceExplanation:
                '',
            },
            {
              id: 'command-3',
              command: 'X=np.arange(2,13,3); print(X)',
              referenceExplanation:
                '',
            },
            {
              id: 'command-4',
              command: 'Y=np.linspace(1,7,4); print(Y)',
              referenceExplanation:
                '',
            },
            {
              id: 'command-5',
              command: 'Z=X+Y; print(Z)',
              referenceExplanation:
                '',
            },
          ],
          referenceAnswer:
            '',
        },
        {
          id: '1-1C',
          type: 'console',
          title: '1.C.',
          prompt:
            ' 행렬(다차원 Array) 변수 연산\n아래 명령을 순서대로 실행하고 Console 결과를 확인하시오. 각 명령이 수행하는 동작과 출력 결과의 의미를 작성하고, 만약 오류 메시지가 출력되면 그 오류의 의미를 작성하시오.',
          setupCode: 'import numpy as np',
          items: [
            {
              id: 'command-1',
              command: 'X=np.arange([3,6,-2],[0,5,2],[7,-1,4]); print(X)',
              referenceExplanation:
                '',
            },
            {
              id: 'command-3',
              command: 'X.shape',
              referenceExplanation:
                '',
            },
            {
              id: 'command-4',
              command: 'Z=X[2,1]; print(Z)',
              referenceExplanation:
                '',
            },
            {
              id: 'command-5',
              command: 'X[:,2]',
              referenceExplanation:
                '',
            },
          ],
          referenceAnswer:
            '',
        },
        {
          id: '1-1D',
          type: 'console',
          title: '1.D.',
          prompt:
            ' 랜덤(Random) 변수 연산\n아래 명령을 순서대로 실행하고 Console 결과를 확인하시오. 각 명령이 수행하는 동작과 출력 결과의 의미를 작성하고, 만약 오류 메시지가 출력되면 그 오류의 의미를 작성하시오.',
          setupCode: 'import numpy as np',
          items: [
            {
              id: 'command-1',
              command: 'np.random.rand()',
              prompt: '이 명령어는 10회 이상 반복 실행하여 명령어의 의미를 유추하시오.',
              referenceExplanation:
                '',
            },
            {
              id: 'command-2',
              command: '6*np.random.rand()',
              prompt: '이 명령어는 10회 이상 반복 실행하여 명령어의 의미를 유추하시오.',
              referenceExplanation:
                '',
            },
            {
              id: 'command-3',
              command: 'np.random.rand()+2',
              prompt: '이 명령어는 10회 이상 반복 실행하여 명령어의 의미를 유추하시오.',
              referenceExplanation:
                '',
            },
            {
              id: 'command-4',
              command: 'np.random.rand(1,5)',
              prompt: '이 명령어는 10회 이상 반복 실행하여 명령어의 의미를 유추하시오.',
              referenceExplanation:
                '',
            },
            {
              id: 'command-9',
              command: 'N=np.random.randn(10000); print(N)',
              referenceExplanation:
                '',
            },
            {
              id: 'command-10',
              command: 'np.mean(N)',
              prompt: '실행결과가 이론치에 근사하는지도 쓰시오.',
              referenceExplanation:
                '',
            },
            {
              id: 'command-11',
              command: 'np.var(N)',
              prompt: '실행결과가 이론치에 근사하는지도 쓰시오.',
              referenceExplanation:
                '',
            },
          ],
          referenceAnswer:
            '',
        },
        {
          id: '1-1E',
          type: 'console',
          title: '1.E.',
          prompt:
            '기본적인 numpy 수학(Math) 함수와 matplotlib 그래프 그리기\n아래 명령을 순서대로 실행하고 Console 결과를 확인하시오. 각 명령이 수행하는 동작과 출력 결과의 의미를 작성하고, 만약 오류 메시지가 출력되면 그 오류의 의미를 작성하시오.',
          setupCode: 'import numpy as np',
          items: [

            
          ],
          referenceAnswer:
            '',
        },
        {
          id: '1-1F',
          type: 'console',
          title: '1.F.',
          prompt:
            '불(Bool) 연산과 그래프 그리기\n아래 명령을 순서대로 실행하고 Console 결과를 확인하시오. 각 명령이 수행하는 동작과 출력 결과의 의미를 작성하고, 만약 오류 메시지가 출력되면 그 오류의 의미를 작성하시오.',
          setupCode: 'import numpy as np',
          items: [
              {
                id: 'command-1',
                command: 'A=np.array([0,1,2,3,4])',
                referenceExplanation:
                  '',
              },
              {
                id: 'command-1',
                command: 'A<3',
                referenceExplanation:
                  '',
              },
          ],
          referenceAnswer:
            '',
        },
      ],
    },
    {
      id: '1-2',
      title: '2. Py 스크립트 사용하기',
      problems: [
        {
          id: '1-2A',
          type: 'python',
          title: '2.A.',
          prompt:
            '아래는 py 스크립트이다.' 
        }
      ],
    },
  ],
} as const satisfies WorkbookChapter;
