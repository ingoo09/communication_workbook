import type { WorkbookChapter } from '@/types/workbook';

export const chapter = {
  id: '1-python-basics',
  title: 'Chapter 1. Python Basics',
  sections: [
    { //문제 1
      id: '1-1',
      title: '1. Python의 다양한 변수 연산 및 그래프 출력',
      problems: [
        { //문제 1.A
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
              validation: { mode: 'exact', expectedOutput: '12' },
              referenceExplanation:
                '정수 12를 변수 A에 저장한 뒤 print(A)로 값을 출력한다. 따라서 12가 출력된다.',
            },
            {
              id: 'command-2',
              command: 'B',
              referenceExplanation:
                '아직 변수 B를 정의하지 않았으므로 NameError가 발생한다. Python에서는 값을 사용하기 전에 변수를 먼저 정의해야 한다.',
            },
            {
              id: 'command-3',
              command: 'B=A*3; print(B)',
              validation: { mode: 'exact', expectedOutput: '36' },
              referenceExplanation:
                'A에 저장된 12에 3을 곱한 36을 변수 B에 저장하고 출력한다.',
            },
            {
              id: 'command-4',
              command: 'B * 6',
              validation: { mode: 'exact', expectedOutput: '216' },
              referenceExplanation:
                '표현식 B*6을 계산한다. B=36이므로 216이 출력되지만, 대입문이 아니므로 B의 값은 36으로 유지된다.',
            },
            {
              id: 'command-5',
              command: 'B / 5',
              validation: { mode: 'numeric', expectedValue: 7.2, tolerance: 1e-12 },
              referenceExplanation:
                '`/`는 일반 나눗셈 연산자이다. 36을 5로 나눈 실수 결과 7.2가 출력된다.',
            },
            {
              id: 'command-6',
              command: 'B // 5',
              validation: { mode: 'exact', expectedOutput: '7' },
              referenceExplanation:
                '`//`는 바닥 나눗셈 연산자이다. 36/5=7.2에서 내림한 몫 7이 출력된다.',
            },
            {
              id: 'command-7',
              command: 'B % 5',
              validation: { mode: 'exact', expectedOutput: '1' },
              referenceExplanation:
                '`%`는 나머지 연산자이다. 36을 5로 나눈 나머지 1이 출력된다.',
            },
            {
              id: 'command-8',
              command: 'C=2+3j; print(C)',
              referenceExplanation:
                '실수부가 2이고 허수부가 3인 복소수 2+3j를 변수 C에 저장하고 출력한다. Python에서는 허수 단위로 j를 사용한다.',
            },
            {
              id: 'command-9',
              command: 'C.real',
              validation: { mode: 'numeric', expectedValue: 2, tolerance: 1e-12 },
              referenceExplanation:
                '복소수 C의 실수부를 조회한다. C=2+3j이므로 2.0이 출력된다.',
            },
            {
              id: 'command-10',
              command: 'C.imag',
              validation: { mode: 'numeric', expectedValue: 3, tolerance: 1e-12 },
              referenceExplanation:
                '복소수 C의 허수부 계수를 조회한다. C=2+3j이므로 3.0이 출력된다.',
            },
            {
              id: 'command-11',
              command: 'abs(C)',
              referenceExplanation:
                '복소수 C의 크기를 계산한다. sqrt(2^2+3^2)=sqrt(13)이므로 약 3.6055가 출력된다.',
            },
            {
              id: 'command-12',
              command: 'np.angle(C)',
              referenceExplanation:
                '복소수 C의 위상각을 라디안 단위로 계산한다. arctan(3/2)에 해당하는 약 0.9828 rad가 출력된다.',
            },
            {
              id: 'command-13',
              command: 'np.conjugate(C)',
              referenceExplanation:
                '복소수 C의 켤레복소수를 계산한다. 허수부의 부호가 바뀌어 2-3j가 출력된다.',
            },
            {
              id: 'command-14',
              command: 'A = 12e6; print(A)',
              validation: { mode: 'numeric', expectedValue: 12000000.0, tolerance: 1e-12 },
              referenceExplanation:
                '과학적 표기법 12e6은 12×10^6을 뜻한다. 변수 A에 12000000.0을 저장하고 출력한다.',
            },
          ],
          referenceAnswer:
            '핵심은 대입문과 표현식의 차이, 산술 연산자(/, //, %), 복소수의 표현과 실수부·허수부·크기·위상·켤레복소수의 의미를 구분하는 것이다. 각 명령별 모범 설명은 Console 항목의 모범답안에 제시되어 있다.',
        },
        { //문제 1.B
          id: '1-1B',
          type: 'console',
          title: '1.B.',
          prompt:
            '벡터(1차원 Array) 변수 연산\n아래 명령을 순서대로 실행하고 Console 결과를 확인하시오. 각 명령이 수행하는 동작과 출력 결과의 의미를 작성하고, 만약 오류 메시지가 출력되면 그 오류의 의미를 작성하시오.',
          setupCode: 'import numpy as np',
          items: [
            {
              id: 'command-1',
              command: 'X=np.arange(-2,5); print(X)',
              referenceExplanation:
                'np.arange(-2,5)는 -2부터 5 직전인 4까지 1 간격의 정수 배열을 생성한다. 출력은 [-2 -1 0 1 2 3 4]이다.',
            },
            {
              id: 'command-2',
              command: 'X.shape',
              referenceExplanation:
                '배열 X의 형태를 확인한다. 원소가 7개인 1차원 배열이므로 (7,)이 출력된다.',
            },
            {
              id: 'command-3',
              command: 'X=np.arange(2,13,3); print(X)',
              referenceExplanation:
                '2부터 13 직전까지 3 간격으로 배열을 생성한다. 출력은 [2 5 8 11]이다.',
            },
            {
              id: 'command-4',
              command: 'Y=np.linspace(1,7,4); print(Y)',
              referenceExplanation:
                '1부터 7까지 양 끝점을 포함하여 동일한 간격의 원소 4개를 생성한다. 출력은 [1. 3. 5. 7.]이다.',
            },
            {
              id: 'command-5',
              command: 'Z=X+Y; print(Z)',
              referenceExplanation:
                '같은 크기의 두 배열 X와 Y를 원소별로 더한다. [2,5,8,11]+[1,3,5,7]이므로 [3. 8. 13. 18.]이 출력된다.',
            },
            {
              id: 'command-6',
              command: 'X*Y',
              referenceExplanation:
                '두 배열의 같은 위치에 있는 원소끼리 곱한다. 행렬곱이 아니라 원소별 곱셈이며 [2. 15. 40. 77.]이 출력된다.',
            },
            {
              id: 'command-7',
              command: 'np.dot(X,Y)',
              referenceExplanation:
                '두 벡터의 내적을 계산한다. 각 원소의 곱을 모두 더하므로 2×1+5×3+8×5+11×7=134가 출력된다.',
            },
            {
              id: 'command-8',
              command: 'X[0]',
              validation: { mode: 'exact', expectedOutput: '2' },
              referenceExplanation:
                'Python 배열 인덱스는 0부터 시작한다. X의 첫 번째 원소 2가 출력된다.',
            },
            {
              id: 'command-9',
              command: 'X[1:3]',
              referenceExplanation:
                '인덱스 1부터 3 직전까지 슬라이싱한다. X의 두 번째와 세 번째 원소인 [5 8]이 출력된다.',
            },
          ],
          referenceAnswer:
            'np.arange는 간격을 기준으로, np.linspace는 원소 개수를 기준으로 배열을 생성한다. 같은 크기의 배열에 대한 +와 *는 원소별 연산이며, np.dot은 벡터 내적을 수행한다. 인덱스는 0부터 시작하고 슬라이싱의 끝 인덱스는 포함하지 않는다.',
        },
        { //문제 1.C
          id: '1-1C',
          type: 'console',
          title: '1.C.',
          prompt:
            '행렬(다차원 Array) 변수 연산\n아래 명령을 순서대로 실행하고 Console 결과를 확인하시오. 각 명령이 수행하는 동작과 출력 결과의 의미를 작성하고, 만약 오류 메시지가 출력되면 그 오류의 의미를 작성하시오.',
          setupCode: 'import numpy as np',
          items: [
            {
              id: 'command-1',
              command: 'X=np.array([[3,6,-2],[0,5,2],[7,-1,4]]); print(X)',
              referenceExplanation:
                '중첩 리스트를 이용해 3행 3열 NumPy 배열 X를 생성한다. 각 내부 리스트가 행 하나를 구성한다.',
            },
            {
              id: 'command-2',
              command: 'X.ndim',
              validation: { mode: 'exact', expectedOutput: '2' },
              referenceExplanation:
                '배열 X의 차원 수를 확인한다. 행과 열을 갖는 2차원 배열이므로 2가 출력된다.',
            },
            {
              id: 'command-3',
              command: 'X.shape',
              referenceExplanation:
                '배열 X의 행과 열 개수를 확인한다. 3행 3열이므로 (3, 3)이 출력된다.',
            },
            {
              id: 'command-4',
              command: 'Z=X[2,1]; print(Z)',
              validation: { mode: 'exact', expectedOutput: '-1' },
              referenceExplanation:
                '인덱스 [2,1]은 세 번째 행, 두 번째 열을 뜻한다. 해당 원소 -1을 변수 Z에 저장하고 출력한다.',
            },
            {
              id: 'command-5',
              command: 'X[:,2]',
              referenceExplanation:
                '모든 행(:)에서 세 번째 열(인덱스 2)을 선택한다. [-2 2 4]가 출력된다.',
            },
            {
              id: 'command-6',
              command: 'X[1,:]',
              referenceExplanation:
                '두 번째 행(인덱스 1)의 모든 열을 선택한다. [0 5 2]가 출력된다.',
            },
            {
              id: 'command-7',
              command: 'X.T',
              referenceExplanation:
                '행과 열을 서로 바꾼 전치행렬을 반환한다.',
            },
            {
              id: 'command-8',
              command: 'X @ X.T',
              referenceExplanation:
                '`@` 연산자는 행렬곱을 수행한다. X와 X의 전치행렬을 곱한 3×3 행렬이 출력된다.',
            },
          ],
          referenceAnswer:
            '다차원 배열은 np.array와 중첩 리스트로 생성한다. shape는 각 축의 크기, ndim은 차원 수를 나타낸다. X[행, 열]로 원소를 선택하고, :는 해당 축의 모든 원소를 뜻한다. T는 전치, @는 행렬곱이다.',
        },
        { //문제 1.D
          id: '1-1D',
          type: 'console',
          title: '1.D.',
          prompt:
            '랜덤(Random) 변수 연산\n아래 명령을 순서대로 실행하고 Console 결과를 확인하시오. 각 명령이 수행하는 동작과 출력 결과의 의미를 작성하고, 만약 오류 메시지가 출력되면 그 오류의 의미를 작성하시오.',
          setupCode: 'import numpy as np',
          items: [
            {
              id: 'command-1',
              command: 'np.random.rand()',
              prompt: '이 명령어는 10회 이상 반복 실행하여 명령어의 의미를 유추하시오.',
              referenceExplanation:
                '0 이상 1 미만의 균등분포에서 난수 하나를 생성한다. 반복할 때마다 일반적으로 서로 다른 값이 출력된다.',
            },
            {
              id: 'command-2',
              command: '6*np.random.rand()',
              prompt: '이 명령어는 10회 이상 반복 실행하여 명령어의 의미를 유추하시오.',
              referenceExplanation:
                '0 이상 1 미만의 균등 난수에 6을 곱하므로 0 이상 6 미만의 균등 난수가 생성된다.',
            },
            {
              id: 'command-3',
              command: 'np.random.rand()+2',
              prompt: '이 명령어는 10회 이상 반복 실행하여 명령어의 의미를 유추하시오.',
              referenceExplanation:
                '0 이상 1 미만의 균등 난수에 2를 더하므로 2 이상 3 미만의 균등 난수가 생성된다.',
            },
            {
              id: 'command-4',
              command: 'np.random.rand(1,5)',
              prompt: '이 명령어는 10회 이상 반복 실행하여 명령어의 의미를 유추하시오.',
              referenceExplanation:
                '0 이상 1 미만의 균등 난수 5개로 이루어진 1행 5열 배열을 생성한다.',
            },
            {
              id: 'command-5',
              command: 'np.random.randint(1,7,10)',
              referenceExplanation:
                '1 이상 7 미만, 즉 1부터 6까지의 정수 난수 10개를 생성한다. 주사위를 10번 던지는 것과 같은 형태이다.',
            },
            {
              id: 'command-6',
              command: 'N=np.random.randn(10000); print(N)',
              referenceExplanation:
                '평균 0, 분산 1인 표준정규분포에서 난수 10000개를 생성해 N에 저장한다. 출력값은 실행할 때마다 달라진다.',
            },
            {
              id: 'command-7',
              command: 'np.mean(N)',
              prompt: '실행결과가 이론치에 근사하는지도 쓰시오.',
              referenceExplanation:
                'N의 표본평균을 계산한다. 표준정규분포의 이론적 평균은 0이므로 표본 수가 충분히 크면 결과는 0에 가까워진다.',
            },
            {
              id: 'command-8',
              command: 'np.var(N)',
              prompt: '실행결과가 이론치에 근사하는지도 쓰시오.',
              referenceExplanation:
                'N의 표본분산을 계산한다. 표준정규분포의 이론적 분산은 1이므로 표본 수가 충분히 크면 결과는 1에 가까워진다.',
            },
            {
              id: 'command-9',
              command: 'np.std(N)',
              prompt: '실행결과가 이론치에 근사하는지도 쓰시오.',
              referenceExplanation:
                'N의 표준편차를 계산한다. 표준정규분포의 이론적 표준편차는 1이므로 결과는 1에 가까워진다.',
            },
          ],
          referenceAnswer:
            'np.random.rand는 균등분포 난수, np.random.randn은 표준정규분포 난수를 생성한다. 유한한 표본에서는 이론값과 정확히 같지 않지만, 표본 수가 커질수록 평균은 0, 분산과 표준편차는 1에 가까워지는 경향이 있다.',
        },
        { //문제 1.E
          id: '1-1E',
          type: 'console',
          title: '1.E.',
          prompt:
            '기본적인 NumPy 수학 함수와 Matplotlib 그래프 그리기\n아래 명령을 순서대로 실행하고 Console 결과 및 그래프를 확인하시오. 각 명령이 수행하는 동작과 출력 결과 또는 그래프의 의미를 작성하시오.',
          setupCode: 'import numpy as np\nimport matplotlib.pyplot as plt',
          items: [
            {
              id: 'command-1',
              command: 'x=np.linspace(0,2*np.pi,1000); print(x.shape)',
              referenceExplanation:
                '0부터 2π까지 양 끝점을 포함한 1000개의 균일한 샘플을 생성한다. x는 원소 1000개의 1차원 배열이므로 (1000,)이 출력된다.',
            },
            {
              id: 'command-2',
              command: 'y=np.sin(x); print(y[:5])',
              referenceExplanation:
                '배열 x의 각 원소에 사인 함수를 원소별로 적용해 y를 만든다. 앞의 5개 샘플 값을 출력한다.',
            },
            {
              id: 'command-3',
              command: 'np.max(y)',
              referenceExplanation:
                '사인파 샘플 y의 최댓값을 계산한다. 충분히 조밀하게 샘플링했으므로 1에 매우 가까운 값이 출력된다.',
            },
            {
              id: 'command-4',
              command: 'np.min(y)',
              referenceExplanation:
                '사인파 샘플 y의 최솟값을 계산한다. -1에 매우 가까운 값이 출력된다.',
            },
            {
              id: 'command-5',
              command: "plt.figure(); plt.plot(x,y); plt.xlabel('x [rad]'); plt.ylabel('sin(x)'); plt.title('Sine wave'); plt.grid(True); plt.show()",
              referenceExplanation:
                '새 Figure를 만들고 x에 대한 sin(x)를 선 그래프로 그린다. 가로축과 세로축 이름, 제목, 격자를 추가한다. 0부터 2π까지 한 주기의 사인파가 표시된다.',
            },
            {
              id: 'command-6',
              command: "z=np.cos(x); plt.figure(); plt.plot(x,y,label='sin(x)'); plt.plot(x,z,label='cos(x)'); plt.xlabel('x [rad]'); plt.ylabel('amplitude'); plt.grid(True); plt.legend(); plt.show()",
              referenceExplanation:
                '같은 좌표축에 사인파와 코사인파를 함께 그린다. 두 파형은 같은 주기와 진폭을 가지며 π/2 rad의 위상 차이가 있음을 확인할 수 있다.',
            },
            {
              id: 'command-7',
              command: 'q=np.exp(-0.5*x); print(q[:5])',
              referenceExplanation:
                'x가 증가할수록 감소하는 지수함수 exp(-0.5x)를 원소별로 계산한다. 값은 1에서 시작해 점차 감소한다.',
            },
            {
              id: 'command-8',
              command: "plt.figure(); plt.plot(x,q); plt.xlabel('x'); plt.ylabel('exp(-0.5x)'); plt.title('Exponential decay'); plt.grid(True); plt.show()",
              referenceExplanation:
                '지수감쇠 함수 exp(-0.5x)를 그래프로 그린다. x가 커질수록 함수값이 0에 가까워지는 모습을 확인할 수 있다.',
            },
          ],
          referenceAnswer:
            'NumPy 수학 함수는 배열의 모든 원소에 동시에 적용된다. Matplotlib에서는 figure로 새 그림을 만들고 plot으로 데이터를 그린 뒤 xlabel, ylabel, title, grid, legend 등으로 그래프 정보를 추가한다. 사인파·코사인파의 위상 관계와 지수감쇠 함수의 감소 특성을 그래프로 확인하는 것이 핵심이다.',
        },
        { //문제 1.F
          id: '1-1F',
          type: 'console',
          title: '1.F.',
          prompt:
            '불(Bool) 연산과 그래프 그리기\n아래 명령을 순서대로 실행하고 Console 결과 및 그래프를 확인하시오. 각 명령이 수행하는 동작과 출력 결과 또는 그래프의 의미를 작성하시오.',
          setupCode: 'import numpy as np\nimport matplotlib.pyplot as plt',
          items: [
            {
              id: 'command-1',
              command: 'A=np.array([0,1,2,3,4]); print(A)',
              referenceExplanation:
                '정수 0부터 4까지를 원소로 갖는 1차원 배열 A를 생성하고 출력한다.',
            },
            {
              id: 'command-2',
              command: 'A<3',
              referenceExplanation:
                'A의 각 원소가 3보다 작은지 원소별로 비교한다. [True True True False False]가 출력된다.',
            },
            {
              id: 'command-3',
              command: 'mask=A<3; print(mask)',
              referenceExplanation:
                'A<3의 비교 결과로 만들어진 불 배열을 mask에 저장한다. 이 배열은 원하는 원소를 선택하는 불 인덱스로 사용할 수 있다.',
            },
            {
              id: 'command-4',
              command: 'A[mask]',
              referenceExplanation:
                'mask가 True인 위치의 A 원소만 선택한다. 3보다 작은 원소 [0 1 2]가 출력된다.',
            },
            {
              id: 'command-5',
              command: '(A>=1) & (A<=3)',
              referenceExplanation:
                '두 조건을 원소별 AND 연산으로 결합한다. 1 이상이며 동시에 3 이하인 위치만 True가 된다.',
            },
            {
              id: 'command-6',
              command: 'np.any(A==4)',
              referenceExplanation:
                'A에 4와 같은 원소가 하나라도 있는지 확인한다. 4가 있으므로 True가 출력된다.',
            },
            {
              id: 'command-7',
              command: 'np.all(A>=0)',
              referenceExplanation:
                'A의 모든 원소가 0 이상인지 확인한다. 모든 원소가 조건을 만족하므로 True가 출력된다.',
            },
            {
              id: 'command-8',
              command: 'x=np.linspace(-2*np.pi,2*np.pi,1000); y=np.sin(x); positive=y>=0',
              referenceExplanation:
                '−2π부터 2π까지 사인파를 만들고, 사인값이 0 이상인 위치를 나타내는 불 배열 positive를 생성한다.',
            },
            {
              id: 'command-9',
              command: "plt.figure(); plt.plot(x,y,label='sin(x)'); plt.scatter(x[positive],y[positive],s=8,label='y >= 0'); plt.axhline(0); plt.grid(True); plt.legend(); plt.show()",
              referenceExplanation:
                '사인파 전체를 선으로 그리고, 불 인덱싱을 이용해 y가 0 이상인 샘플만 점으로 강조한다. 조건식이 그래프 데이터 선택에 활용되는 모습을 확인할 수 있다.',
            },
            {
              id: 'command-10',
              command: "clipped=np.where(y>=0,y,0); plt.figure(); plt.plot(x,clipped); plt.title('Half-wave rectification'); plt.grid(True); plt.show()",
              referenceExplanation:
                'np.where를 사용해 y가 0 이상이면 원래 값을 유지하고 음수이면 0으로 바꾼다. 그래프는 사인파의 음의 부분을 제거한 반파정류 파형을 나타낸다.',
            },
          ],
          referenceAnswer:
            '비교 연산은 배열의 각 원소에 대해 True 또는 False를 반환한다. 불 배열은 조건을 만족하는 원소를 선택하는 인덱스로 사용할 수 있다. &, |, ~는 각각 원소별 AND, OR, NOT이며, np.any와 np.all은 조건의 일부 또는 전체 만족 여부를 검사한다. 불 마스크와 np.where를 이용하면 특정 구간을 강조하거나 신호를 조건에 따라 변형할 수 있다.',
        },
      ],
    },
    { //문제 2
      id: '1-2',
      title: '2. Python 스크립트 만들고 사용하기',
      problems: [
        { //문제 2.A1
          id: '1-2A1',
          type: 'python',
          title: '2.A1.',
          prompt: `아래는 \(a=0.1,\;0.25,\;0.3,\;0.4,\;0.5,\;0.6,\;0.7,\;0.8\)인 경우에 대하여, 함수 \(y=x\sin(ax)\;(0<x<20)\)를 하나의 그래프에 겹쳐 그리는 Python 스크립트이다. 아래 Python 스크립트의 모든 라인에 대해 주석(Comment)을 작성하시오.
(지침 1) '='이 있는 라인
  - '=' 왼쪽 변수의 목적(용도)을 설명하시오.
  - '=' 오른쪽 수식이 왜 해당 변수의 의미에 부합하는지 설명하시오.
(지침 2) '='이 없는 라인
  - 명령어의 기능을 설명하시오.
  - 왜 해당 명령을 수행하는지 설명하시오.`,
          starterCode: `import numpy as np
import matplotlib.pyplot as plt

x = np.arange(1,20,0.1)
y = np.zeros((len(x),8))

for n in range(1,9):
  a = n/10 #for 문 내부의 모든 문장은 for 문 라인보다 들여쓰기 및 정렬해야 함
  if (a==0.2):
    a=0.25 #if 문 내부의 모든 문장은 if 문 라인보다 들여쓰기 및 정렬해야 함
  y[:,n-1] = x*np.sin(a*x)
  
plt.plot(x,y)
plt.xlabel('x')
plt.ylabel('y=x sin(ax)')
plt.legend(['a=0.1','a=0.25','a=0.3','a=0.4','a=0.5','a=0.6','a=0.7','a=0.8'])
plt.grid()`,
          referenceAnswer: `
아래는 각 라인의 기능과 해당 명령을 수행하는 이유를 주석으로 작성한 예시이다.
\`\`\`python
# 수치 계산과 배열 연산에 필요한 NumPy 모듈을 np라는 이름으로 불러온다.
# x 좌표 생성, 0으로 초기화된 배열 생성, 사인 함수 계산을 위해 필요하다.
import numpy as np

# 그래프 출력에 필요한 matplotlib.pyplot 모듈을 plt라는 이름으로 불러온다.
# 계산된 8개의 함수값을 하나의 좌표평면에 겹쳐 그리기 위해 필요하다.
import matplotlib.pyplot as plt


# x는 함수값을 계산할 독립변수의 샘플 위치를 저장하는 1차원 배열이다.
# np.arange(1, 20, 0.1)은 1 이상 20 미만의 구간에서 0.1 간격의 값을 생성하므로,
# 0 < x < 20 구간에서 함수값을 계산하기 위한 x의 목적에 부합한다.
x = np.arange(1, 20, 0.1)


# y는 서로 다른 8개의 a 값에 대해 계산한 함수값을 열 단위로 저장하는 2차원 배열이다.
# len(x)는 x 샘플의 개수이고, 열의 개수 8은 a 값의 개수와 같으므로
# 크기가 (len(x), 8)인 배열이 각 함수의 샘플값을 저장하기에 적합하다.
y = np.zeros((len(x), 8))


# n을 1부터 8까지 변화시키며 동일한 계산을 8회 반복한다.
# 각 반복에서 서로 다른 a 값을 만들고, 그 a에 대응하는 함수값을 y의 각 열에 저장한다.
for n in range(1, 9):

    # a는 현재 반복에서 사용할 사인 함수의 계수를 저장하는 변수이다.
    # n이 1부터 8까지 변하므로 n/10은 기본적으로
    # 0.1, 0.2, 0.3, ..., 0.8의 값을 생성한다.
    a = n / 10

    # 문제에서 요구한 a 값에는 0.2 대신 0.25가 포함되므로,
    # 현재 a가 0.2인지 확인한다.
    if a == 0.2:

        # a의 목적은 문제에서 지정한 계수값을 저장하는 것이다.
        # 0.2를 0.25로 변경하면 최종적으로
        # 0.1, 0.25, 0.3, ..., 0.8의 계수 집합을 얻을 수 있다.
        a = 0.25

    # y의 n-1번째 열은 현재 a에 대한 함수 y=x*sin(ax)의 샘플값을 저장한다.
    # x*np.sin(a*x)는 x 배열의 각 원소에 대해 x sin(ax)를 계산하므로
    # 해당 열에 저장할 함수값이라는 y의 목적에 부합한다.
    # Python 배열 인덱스는 0부터 시작하므로 n번째 함수는 n-1번째 열에 저장한다.
    y[:, n - 1] = x * np.sin(a * x)


# x를 가로축으로 사용하고 y의 각 열을 세로축 데이터로 사용하여 그래프를 그린다.
# y에는 8개의 함수값이 열 단위로 저장되어 있으므로,
# 이 명령을 실행하면 8개의 곡선이 하나의 좌표평면에 겹쳐 표시된다.
plt.plot(x, y)


# 그래프 가로축의 이름을 x로 표시한다.
# 가로축이 독립변수 x임을 명확하게 나타내기 위해 수행한다.
plt.xlabel('x')


# 그래프 세로축의 이름을 y=x sin(ax)로 표시한다.
# 그래프에 표시된 함수의 형태를 독자가 알 수 있도록 하기 위해 수행한다.
plt.ylabel('y = x sin(ax)')


# 8개의 곡선이 각각 어떤 a 값에 해당하는지 범례를 표시한다.
# 범례 항목의 순서는 y 배열의 열 순서와 같으며,
# 각 그래프를 서로 구분하기 위해 수행한다.
plt.legend([
    'a=0.1',
    'a=0.25',
    'a=0.3',
    'a=0.4',
    'a=0.5',
    'a=0.6',
    'a=0.7',
    'a=0.8'
])


# 그래프에 격자선을 표시한다.
# 각 곡선의 x와 y 값을 읽고 여러 곡선을 비교하기 쉽게 하기 위해 수행한다.
plt.grid()


# 완성된 그래프를 화면에 표시한다.
# 일반적인 Python 스크립트 환경에서도 Figure가 확실히 출력되도록 수행한다.
plt.show()
\`\`\`
`,
        },
      ],
    },
  ],
} as const satisfies WorkbookChapter;
