import type { WorkbookChapter } from '@/types/workbook';

export const chapter = {
  "id": "3-FS-FTF",
  "title": "Chapter 3. Fourier Series & Frequency Transfer Function",
  "sections": [
    { //문제 1
      "id": "3-1",
      "title": "1. 확장된 푸리에 급수 시스템 설계",
      "problems": [
        { //문제 1.A
          "id": "3-1A",
          "title": "1.A.",
          "prompt": `주기가 $T$인 사각 주기함수는 다음과 같이 푸리에 급수로 나타낼 수 있다.
$$
f_T​(t)=\\frac{\\pi}{4}\\left​(\\cos\\omega_0​t−\\frac{1}{3}\\​cos3\\omega_0​t+\\frac{1}{5}\\​cos5\\omega_0​t-\\cdots\\right)
\\qquad \\text{where}
\\qquad \\omega_0=\\frac{2\\pi}{T}
\\qquad \\text{(식 3.1)}
$$
[[equation:3.1]]은 무한히 많은 홀수차 조화성분의 합으로 이루어져 있다. 실제 계산에서는 무한히 많은 항을 사용할 수 없으므로, 앞에서부터 유한한 개수의 항만을 더한 부분합(partial sum)을 이용하여 사각 주기함수를 근사할 수 있다.

본 문제에서는 Python을 이용하여 푸리에 급수의 항을 순차적으로 더하고, 사용하는 항의 수에 따라 파형이 어떻게 변화하는지 확인한다.
`,
        },
        {
          "id": "3-1A1",
          "title": "1.A1.",
          "type": "essay",
          "prompt": `$T$는 자신의 학번 끝 2자리로 설정하시오. 예를 들어, 학번이 20127123이라면 $T=23$으로 설정한다.`
        },
        {
          "id": "3-1A2",
          "title": "1.A2.",
          "type": "essay",
          "prompt": `자신이 설정한 $T$를 이용하여 기본 각주파수 $\\omega_0=\\dfrac{2\\pi}{T}$를 계산하시오.`
        },
        { //문제 1.B
          "id": "3-1B",
          "title": "1.B.",
          "prompt": `[그림 3.1]과 같이 푸리에 급수의 각 조화성분을 차례로 더하면 사각 주기함수에 대한 부분합을 만들 수 있다.
[[image:/images/ch3/figure3_1.png|그림 3.1 푸리에 급수의 조화성분을 이용한 부분합 구성|50]]`
        },
        {
          "id": "3-1B1",
          "title": "1.B1.",
          "type": "essay",
          "prompt": `[[equation:3.1]]의 처음 네 개 항은 다음과 같다.
$$
\\frac{4}{\\pi}\\cos(\\omega_0t)-\\frac{4}{3\\pi}\\cos(3\\omega_0t)+\\frac{4}{5\\pi}\\cos(5\\omega_0t)-\\frac{4}{7\\pi}\\cos(7\\omega_0t)
$$
각 항의 주파수가 기본 각주파수 $\\omega_0$의 몇 배인지 확인하고, 항의 차수가 증가할수록 진폭의 크기가 어떻게 변하는지 설명하시오.
          `
        },
        {
          "id": "3-1B2",
          "title": "1.B2.",
          "type": "python",
          starterCode: `import numpy as np
import matplotlib.pyplot as plt

T = 23  # 자신의 학번 끝 2자리
w0 = 2*np.pi/T
t = np.arange(0, 2*T, 0.01)
term_counts = [1, 2, 5, 8, 10]
plt.figure(figsize=(10, 10))

for i, N in enumerate(term_counts):
    f = np.zeros_like(t)
    for k in range(N):
        n = 2*k + 1
        f += (
            (4/np.pi)
            * ((-1)**k)
            / n
            * np.cos(n*w0*t)
        )
    plt.subplot(5, 1, i+1)
    plt.plot(t, f)
    plt.title(f"N = {N}")
    plt.grid()

plt.tight_layout()`,
          "prompt": `다음 관계를 이용하여 푸리에 급수의 부분합을 Python으로 구현해보자.
$$
n=2k+1, \\qquad
k=0,1,2,\\cdots
$$
각 항의 계수는 $\\dfrac{4}{\\pi}\\dfrac{(-1)^k}{2k+1}$이므로 $N$개의 항을 사용한 부분합은
$$
f_N(t)=\\frac{4}{\\pi}
\\sum_{k=0}^{N-1} \\frac{(-1)^k}{2k+1}\\cos\\left((2k+1)\\omega_0t\\right)
$$
로 나타낼 수 있다.

아래는 $N=1,2,5,8,10$인 경우의 부분합을 계산하고, $0\\le t \\le 2T$ 구간에서 파형을 확인하는 py 스크립트이다.
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

T = 23  # 자신의 학번 끝 2자리
w0 = 2*np.pi/T
t = np.arange(0, 2*T, 0.01)
term_counts = [1, 2, 5, 8, 10]
plt.figure(figsize=(10, 10))

for i, N in enumerate(term_counts):
    f = np.zeros_like(t)
    for k in range(N):
        n = 2*k + 1
        f += (
            (4/np.pi)
            * ((-1)**k)
            / n
            * np.cos(n*w0*t)
        )
    plt.subplot(5, 1, i+1)
    plt.plot(t, f)
    plt.title(f"N = {N}")
    plt.grid()

plt.tight_layout()
\`\`\`
py 스크립트를 실행하여, 결과 그래프를 확인하시오.
          `
        },
        {
          "id": "3-1B3",
          "title": "1.B3.",
          "type": "essay",
          "prompt": `자신이 설정한 $T$에 대해 7차 조화성분($-\\dfrac{4}{7\\pi}\\cos(7\\omega_0t)$)의 진폭과 각주파수를 각각 계산하시오.`
        },
        {
          "id": "3-1B4",
          "title": "1.B4.",
          "type": "essay",
          "prompt": `푸리에 급수에 포함하는 항의 수를 $1,2,5,8,10$으로 증가시킬 때 출력 파형이 어떻게 달라지는지 설명하시오.
          
다음 내용을 중심으로 관찰하시오.
- 항의 수가 증가할수록 전체적인 파형의 형태가 어떻게 변하는가?
- 평탄한 구간은 어떤 값에 가까워지는가?
- 불연속점 부근의 모양은 어떻게 변하는가?
- 항의 수를 증가시켜도 불연속점 근처에 남는 특징이 있는가?`
        },
      ]
    },
    { //문제 2
      "id": "3-2",
      "title": "2. 간단한 RC 회로와 미분 방정식",
      "problems": [
        { //문제 2.A
          "id": "3-2A",
          "title": "2.A.",
          "type": "proof",
          "prompt": `선형 시스템의 특성상 시스템에 주파수가 $\\omega$인 복소 정현파(Complex Sinusoid) 즉, $\\exp(j\\omega t)$를 입력하면 정상 상태(Steady State)의 출력은 역시 같은 주파수를 갖는 복소 정현파가 되며 크기와 위상은 입력 주파수와 시스템의 특성에 의해 정해진다. 즉, 출력은 $g(t)=H(\\omega)\\exp(j\\omega t)$로 나타낼 수 있으며, $H(\\omega)$는 $g(t)$의 진폭과 초기 위상을 결정하는 복소 변수로써 입력 주파수 $\\omega$의 함수가 된다. $H(\\omega)$를 이 시스템의 주파수 전달 함수(Frequency Transfer Function)라고 부른다.
          
[그림 3.2]에 나타나 있는 RC 회로의 입력 전압을 $f(t)$, 출력 전압을 $g(t)$라 할 때, 이 회로의 입출력 관계식은 [[equation:3.2]]와 같은 일차 미분 방정식임을 유도하시오.
$$
f(t)=RC\\frac{dg(t)}{dt}+g(t)
\\qquad \\text{(식 3.2)}
$$
[[image:/images/ch3/figure3_2.png|그림 3.2 RC 저역통과필터(LPF, Low Pass Filter)]]
`,
        },
        { //문제 2.B
          "id": "3-2B",
          "title": "2.B.",
          "type": "proof",
          "prompt": `$H(\\omega)$를 구하기 위해, 문제 2.A의 입출력 미분 방정식에 입력 $f(t)=\\exp(j\\omega t)$, 출력 $g(t)=H(\\omega)\\exp(j\\omega t)$를 대입한 후, 수식을 정리하시오. 정리하면 $H(\\omega)=\\dfrac{1}{1+j\\omega RC}$임을 보이시오.`,
        },
        { //문제 2.C
          "id": "3-2C",
          "title": "2.C.",
          "type": "essay",
          "prompt": `$R=0.5$㏀, $C=1000+\\text{학번 끝 3자리}$㎌라 하자. (예를 들어, 자신의 학번이 20123465인 경우 $C=1465$㎌) 입력 주파수 $\\omega$가 <표 3.1>의 첫 번째 열과 같을 때, 각 값에 대하여 $\\left| H(\\omega) \\right|$와 $\\angle H(\\omega)$를 계산하여 <표 3.1>을 채우시오.
[[table:
caption:표 3.1 [그림 3.2]에 나타낸 저역 통과 필터의 출력의 진폭과 초기 위상
입력 주파수 $\\omega$[rad/sec] | 출력의 진폭 $｜H(\\omega)｜$ | 출력의 초기 위상 $\\angle H(\\omega)$[rad/sec]
-120 | |
-40 | |
-10 | |
-5 | |
0 | |
5 | |
10 | |
40 | |
120 | |
]]
(참고. 출력의 초기 위상 $\\angle H(\\omega)=\\operatorname{arctan}\\left(\\dfrac{\\operatorname{Im}(H(\\omega))}{\\operatorname{Re}(H(\\omega))}\\right)$)
          `,
        },
        { //문제 2.D
          "id": "3-2D",
          "title": "2.D.",
          "type": "python",
          starterCode: `import numpy as np
import matplotlib.pyplot as plt

w=np.arange(-120,120,1/1e4)
R=0.5e3
C=1XXXe-6 # XXX=학번 끝 3자리
Hw=??
plt.plot(?,np.abs(?))`,
          "prompt": `다음의 과정 (Step 1)~(Step 3)에 따라, $x$축을 $\\omega$로 하고 $y$축을 $\\left| H(\\omega) \\right|$로 하여, $\\omega=[-120, 120]$ 범위에서 $\\left| H(\\omega) \\right|$를 그리는 py 스크립트를 완성하시오.

(Step 1) $x$축에 해당하는 를 벡터 ‘w’로 선언한다. (초깃값=-120, 마지막 값=120, 간격=1/1e4)
(Step 2) $\\omega$의 각 원소에 대하여 $\\left| H(\\omega) \\right|$(문제 2.B의 식)를 구하여 이들을 원소로 갖는 벡터를 계산. ‘for’ 문을 사용하지 말 것. 벡터 연산으로 원소들의 결과를 동시에 구할 수 있음.
(Step 3) ‘plt.plot()’를 사용하여 $\\left| H(\\omega) \\right|$를 $\\omega=[-120, 120]$ 범위에서 그린다.
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

w=np.arange(-120,120,1/1e4)
R=0.5e3
C=1XXXe-6 # XXX=학번 끝 3자리
Hw=??
plt.plot(?,np.abs(?))
\`\`\`
이후, 완성한 py 스크립트를 실행하여 결과 그래프를 확인하시오.`,
          referenceAnswer: `
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

w=np.arange(-120,120,1/1e4)
R=0.5e3
C=1158e-6 # XXX=학번 끝 3자리
Hw=1/(1+1j*w*R*C)
plt.plot(w,np.abs(Hw))
\`\`\``
        },
        { //문제 2.E
          "id": "3-2E",
          "title": "2.E.",
          "type": "python",
          "prompt": `문제 2.D의 과정을 참고하여 , $x$축을 $\\omega$로 하고 $y$축을 $\\angle H(\\omega)$로 하여, $\\omega=[-120, 120]$ 범위에서 $\\left| H(\\omega) \\right|$를 그리는 py 스크립트를 작성하시오. 이후, 완성한 py 스크립트를 실행하여 결과 그래프를 확인하시오.`,
          referenceAnswer: `
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

w=np.arange(-120,120,1/1e4)
R=0.5e3
C=1158e-6 # XXX=학번 끝 3자리
Hw=1/(1+1j*w*R*C)
plt.plot(w,np.angle(Hw))
\`\`\``
        },
        { //문제 2.F
          "id": "3-2F",
          "title": "2.F.",
          "type": "essay",
          "prompt": `문제 2.D~2.E의 수행 결과를 바탕으로 이 회로를 저역통과필터(Low Pass Filter)라 부르는 이유를 쓰시오.`,
        },
      ],
    },
    { //문제 3
      "id": "3-3",
      "title": "3. RC 저역통과필터의 시간영역 응답을 이용한 주파수 전달함수 검증",
      "problems": [
        { //문제 3.A
          "id": "3-3A",
          "title": "3.A.",
          "prompt": `문제 2에서는 RC 저역통과필터의 주파수 전달함수 $H(\\omega)=\\dfrac{1}{1+j\\omega RC}$를 구하고, 입력 주파수에 따른 출력의 진폭과 위상을 계산하였다. 본 문제에서는 RC 회로의 미분방정식 $f(t)=RC\\dfrac{dg(t)}{dt}+g(t)$을 Python으로 직접 수치적으로 계산하여, 문제 2에서 구한 주파수 전달함수의 결과와 비교해본다.
[[image:/images/ch3/figure3_3.png|그림 3.3 RC 저역통과필터의 주파수 전달함수 검증 과정|50]]
입출력 미분방정식을 다음과 같이 정리할 수 있다.
$$
\\frac{dg(t)}{dt}=
\\frac{f(t)-g(t)}{RC}
$$
여기서 입력을 $f(t)=\\cos(\\omega t)$로 두고, Python을 이용하여 $g(t)$를 계산한다. 자신의 학번 끝 3자리를 XXX라 할 때, $R=0.5$㏀, $C=(1000+XXX)$㎌이다.

아래는 [그림 3.3]과 같이 RC 저역통과필터의 주파수 전달함수를 검증하는 py 스크립트이다.
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt
from scipy.integrate import solve_ivp

XXX = 123  # 자신의 학번 끝 3자리
R = 0.5e3
C = (1000 + XXX)*1e-6
w = 120

def input_signal(t):
    return np.cos(w*t)

def rc_system(t, g):
    return (input_signal(t) - g[0])/(R*C)

t = np.arange(0, 10, 1e-3)
sol = solve_ivp(
    rc_system,
    [t[0], t[-1]],
    [0],
    t_eval=t
)
g = sol.y[0]

plt.figure()
plt.plot(t, input_signal(t), label="input f(t)")
plt.plot(t, g, label="output g(t)")
plt.xlabel("t [s]")
plt.ylabel("Amplitude")
plt.legend()
plt.grid()
\`\`\`
`,
        },
        {
          "id": "3-3A1",
          "title": "3.A1.",
          "type": "python",
          starterCode: `import numpy as np
import matplotlib.pyplot as plt
from scipy.integrate import solve_ivp

XXX = 123  # 자신의 학번 끝 3자리
R = 0.5e3
C = (1000 + XXX)*1e-6
w = 120

def input_signal(t):
    return np.cos(w*t)

def rc_system(t, g):
    return (input_signal(t) - g[0])/(R*C)

t = np.arange(0, 10, 1e-3)
sol = solve_ivp(
    rc_system,
    [t[0], t[-1]],
    [0],
    t_eval=t
)
g = sol.y[0]

plt.figure()
plt.plot(t, input_signal(t), label="input f(t)")
plt.plot(t, g, label="output g(t)")
plt.xlabel("t [s]")
plt.ylabel("Amplitude")
plt.legend()
plt.grid()`,
          "prompt": `위 py 스크립트를 실행하여, 입력 $f(t)$와 출력 $g(t)$를 한 그래프에 겹쳐 그린 결과 그래프를 확인하시오.

초기 구간에서는 출력에 과도응답(transient response)이 포함되지만 시간이 충분히 지난 후에는 정상상태(steady-state)에 도달함을 관찰하시오.`
        },
        {
          "id": "3-3A2",
          "title": "3.A2.",
          "type": "essay",
          "prompt": `$f(t), g(t)$ 중 각각 무엇이 RC 회로의 입력과 출력에 해당하는지 쓰고, py 스크립트에서 각각 어떤 변수 또는 함수에 해당하는지 쓰시오.`
        },
        { //문제 3.B
          "id": "3-3B",
          "title": "3.B.",
          "prompt": `입력 주파수에 따른 정상상태 응답 확인`
        },
        {
          "id": "3-3B1",
          "title": "3.B1.",
          "type": "python",
          "prompt": `문제 3.A의 py 스크립트를 복사하여 붙여넣으시오.

입력 주파수를 $\\omega=120$[rad/sec]로 설정하고 10초 동안의 출력 $g(t)$를 계산하시오. 입력과 출력 파형을 한 그래프에 겹쳐 그리시오.`
        },
        {
          "id": "3-3B2",
          "title": "3.B2.",
          "type": "essay",
          "prompt": `정상상태 출력 $g(t)$의 주파수를 확인하고 입력 주파수와 비교하시오.`
        },
        {
          "id": "3-3B3",
          "title": "3.B3.",
          "type": "essay",
          "prompt": `정상상태에 도달한 이후의 출력 $g(t)$의 진폭을 측정하시오. 그리고, 문제 2.C의 <표 3.1>에서 구한 $\\left|H(120)\\right|$과 비교하시오.`
        },
        { //문제 3.C
          "id": "3-3C",
          "title": "3.C.",
          "prompt": `여러 입력 주파수에 대한 시간영역 검증`
        },
        {
          "id": "3-3C1",
          "title": "3.C1.",
          "type": "python",
          "prompt": `문제 3.A의 py 스크립트를 복사하여 붙여넣으시오.

다음 입력 주파수에 대하여 문제 3.B를 반복하시오.
$$
\\omega=-120, 40, -10, -5, 0, 5, 10, 40, 120
$$
(결과를 문제 3.C2의 <표 3.2>에 정리할 것)
`
        },
        {
          "id": "3-3C2",
          "title": "3.C2.",
          "type": "essay",
          "prompt": `문제 3.C1의 결과를 토대로, 각 주파수에 대해 정상상태 출력의 주파수와 진폭을 구하여 <표 3.2>를 완성하시오.
[[table:
caption:표 3.2 문제 3.A에서 설계한 RC 저역 통과 필터의 출력의 주파수와 진폭
입력 각주파수 $\\omega$[rad/sec] | 출력 각주파수 [rad/sec] | 시뮬레이션 출력 진폭 | 이론값 $｜H(\\omega)｜$
-120 | |
-40 | |
-10 | |
-5 | |
0 | |
5 | |
10 | |
40 | |
120 | |
]]`
        },
        { //문제 3.D
          "id": "3-3D",
          "title": "3.D.",
          "type": "essay",
          "prompt": `<표 3.2>에서 각 주파수에 대하여 $\\left| H(\\omega) \\right|$와 시간영역 시뮬레이션에서 측정한 정상상태 진폭을 비교하시오.

그리고 다음을 설명하시오.
- 입력과 출력의 주파수 관계
- $\\left|\\omega\\right|$가 증가할 때 출력 진폭의 변화
- 문제 2에서 구한 전달함수와 시간영역 시뮬레이션 결과가 일치하는지
- 이 시스템을 저역통과필터라고 부르는 이유`
        },
      ]
    },
    { //문제 4
      "id": "3-4",
      "title": "4. 선형 시스템에서 주기함수의 정상 상태 응답",
      "problems": [
        { //문제 4.A
          "id": "3-4A",
          "title": "4.A.",
          "prompt": `본 문제에서는 주기함수 $f(t)$가 [그림 3.2]의 RC 회로에 입력되었을 때, 출력 $g(t)$를 수식과 실험으로 구해보자. $f(t)$는 [[equation:3.3]]에 주어진 주기가 $2$인 사각 주기함수를 예로 들어 가정하자.
$$
f(t)=
\\begin{cases}
1,
& 0 \\le t \\le 1 \\\\
-1,
& 1 \\le t \\le 2
\\end{cases}
\\qquad \\text{and}
\\qquad f(t)=f(t+2), \\forall t
\\qquad \\text{(식 3.3)}
$$
$f(t)$는 주기함수이므로 푸리에 급수 전개를 하면 [[equation:3.4]]와 같이 쓸 수 있다.
$$
f(t)=
\\sum_{n=-\\infty}^{\\infty} F_n e^{jn\\omega_0 t}
\\qquad \\text{where}
\\qquad \\omega_0=\\frac{2\\pi}{T}
\\qquad \\text{and} \\qquad
F_n=
\\begin{cases}
\\displaystyle \\frac{2}{j n\\pi}, & n=\\text{odd(홀수)} \\\\
0, & n=\\text{even(짝수)}
\\end{cases}
\\qquad \\text{(식 3.4)}
$$
[[equation:3.4]]에서 사각 파의 주기함수 $f(t)$가 복소 정현파($\\cdots, e^{j(n-1)\\omega_0 t}, e^{jn\\omega_0 t}, e^{j(n+1)\\omega_0 t}, \\cdots$)의 결합으로 주어짐을 알 수 있다. 선형 시스템의 선형성(Linearity)과 주파수 전달 함수의 개념을 이용하여, 선형 시스템의 출력 $g(t)$ 역시 복소 정현파의 결합으로 나타낼 수 있다.

시스템의 주파수 전달 함수를 $H(\\omega)$라 하자. 주파수 전달함수의 정의에 의하면 입력이 $e^{j\\omega t}$일 때 출력은 $H(\\omega)e^{j\\omega t}$가 된다.
`,
        },
        {
          "id": "3-4A1",
          "title": "4.A1.",
          "type": "proof",
          "prompt": `입력이 $e^{jn\\omega_0 t}$일 때 출력을 쓰시오. ($e^{jn\\omega_0 t}$의 주파수는 $n\\omega_0$)`,
        },
        {
          "id": "3-4A2",
          "title": "4.A2.",
          "type": "proof",
          "prompt": `입력이 $F_ne^{jn\\omega_0 t}$일 때 출력을 쓰시오. (선형성 이용)`,
        },
        {
          "id": "3-4A3",
          "title": "4.A3.",
          "type": "proof",
          "prompt": `입력이 $F_{-2}e^{-j2\\omega_0 t}+F_{-1}e^{-j\\omega_0 t}+F_0e^{j0\\omega_0 t}+F_1e^{j\\omega_0 t}+F_2e^{j2\\omega_0 t}$일 때 출력을 쓰시오. (선형성 이용)`,
        },
        {
          "id": "3-4A4",
          "title": "4.A4.",
          "type": "proof",
          "prompt": `입력 $f(t)$가 $\\sum_{n=-\\infty}^{\\infty} F_n e^{jn\\omega_0 t}$로 표현되는 주기함수일 때, 출력 $g(t)=\\sum_{n=-\\infty}^{\\infty} G_n e^{jn\\omega_0 t}$로 표현할 수 있으며 $G_n=H(n\\omega_0)F_n$임을 보이시오.`,
        },
        {
          "id": "3-4A5",
          "title": "4.A5.",
          "type": "essay",
          "prompt": `문제 4.A4의 결과를 바탕으로, 주기함수 $f(t)$에 대한 출력 $g(t)$ 역시 주기함수임을 설명하시오.`,
        },
        { //문제 4.B
          "id": "3-4B",
          "title": "4.B.",
          "prompt": `문제 4.A4에서 얻은 $G_n$ 공식을 이용하여, [그림 3.2]의 RC 회로에서 입력 $f(t)$가 [[equation:3.4]]와 같은 사각 주기함수의 푸리에 급수 전개일 때의 출력 $g(t)=\\sum_{n=-\\infty}^{\\infty} G_n e^{jn\\omega_0 t}$을 Python을 통해 그려보자. 정확히 그리기 위해서는 무한개의 항을 더하는 계산을 하여야 하므로 이는 불가능하다. 아래는 ‘n=-100’에서 ‘100’ 직전까지 유한개의 합에 대하여 파형을 그리는 py 스크립트이다.
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

R=0.5e3
C=1XXXe-6 # XXX=학번 끝 3자리
t=np.arange(0,20,(1/1000))
T=2
w0=(2*np.pi)/?
gt_approx=0
for n in np.arange(-100,100,1):
    if n%2==0:
        Fn=0 #(식 3.4)
    else:
        Fn=2/? #(식 3.4)
    w=n*w0
    Hw=1/(1+1j*R*C*w)
    Gn=Hw*? #문제 4.A4
    gt_approx+=Gn*np.exp(1j*n*w0*t)
plt.plot(t,gt_approx)
plt.grid()
\`\`\`
          `
        },
        {
          "id": "3-4B1",
          "title": "4.B1.",
          "type": "python",
          starterCode: `import numpy as np
import matplotlib.pyplot as plt

R=0.5e3
C=1XXXe-6 # XXX=학번 끝 3자리
t=np.arange(0,20,(1/1000))
T=2
w0=(2*np.pi)/?
gt_approx=0
for n in np.arange(-100,100,1):
    if n%2==0:
        Fn=0 #(식 3.4)
    else:
        Fn=2/? #(식 3.4)
    w=n*w0
    Hw=1/(1+1j*R*C*w)
    Gn=Hw*? #문제 4.A4
    gt_approx+=Gn*np.exp(1j*n*w0*t)
plt.plot(t,gt_approx)
plt.grid()`,
          "prompt": `위 py 스크립트에서 ?를 채워 완성하고, 모든 라인에 대해 다음의 지침에 따라 주석(Comment)을 작성하시오.

(지침 1) '='이 있는 라인
  - '=' 왼쪽 변수의 목적(용도)을 설명하시오.
  - '=' 오른쪽 수식이 왜 해당 변수의 의미에 부합하는지 설명하시오.
(지침 2) '='이 없는 라인
  - 명령어의 기능을 설명하시오.
  - 왜 해당 명령을 수행하는지 설명하시오.
  
이후, '코드 실행' 버튼을 눌러 py 스크립트를 실행하고, 결과 파형인 $g(t)=\\sum_{n=-\\infty}^{\\infty} G_n e^{jn\\omega_0 t}$ 확인하시오.`
        },
        {
          "id": "3-4B2",
          "title": "4.B2.",
          "type": "essay",
          "prompt": `문제 4.B1의 결과 그래프는, 문제 4.A1~4.A5 중 어떤 문제를 증명할 수 있는 것인지 쓰시오. 이를 바탕으로 알 수 있는, 선형 시스템에서 주기함수 $f(t)$의 정상 상태 응답 $g(t)$는 어떠한 성질을 가지는지 쓰시오.`
        },
      ]
    }
  ]
} as const;
