import type { WorkbookChapter } from '@/types/workbook';

export const chapter = {
  "id": "3-FS-FTF",
  "title": "Chapter 3. Fourier Series & Frequency Transfer Function",
  "sections": [
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
          "prompt": `$R=0.5$㏀, $C=1000+\\text{학번 끝 3자리}$㎌라 하자. (예를 들어, 자신의 학번이 20123465인 경우 $C=1465$㎌) 입력 주파수 $\\omega$가 <표 3.1>의 첫 번째 열과 같을 때, 각 값에 대하여 $H(\\omega)$와 $\\angle H(\\omega)$를 계산하여 <표 3.1>을 채우시오.
[[table:
caption:표 3.1 [그림 3.2]에 나타낸 저역 통과 필터의 출력의 진폭과 초기 위상
입력 주파수 $\\omega$[rad/sec] | 출력의 진폭 $H(\\omega)$ | 출력의 초기 위상 $\\angle H(\\omega)$[rad/sec]
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
