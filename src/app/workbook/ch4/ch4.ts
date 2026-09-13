import type { WorkbookChapter } from '@/types/workbook';

export const chapter = {
  "id": "4-FT",
  "title": "Chapter 4. Fourier Transform",
  "sections": [
    { //문제 1
      "id": "4-1",
      "title": "1. 정현파 함수(Sinusoid function)의 스펙트럼 분석",
      "problems": [
        { //문제 1.A
          "id": "4-1A",
          "title": "1.A.",
          "prompt": `다음과 같이 주어지는 푸리에 변환(스펙트럼)의 시간 함수를 구하시오. 즉, 역 푸리에 변환을 하시오. (역 푸리에 변환 식 $f(t)=\\frac{1}{2\\pi} \\int_{-\\infty}^{\\infty}F(\\omega)e^{jt\\omega}\\,d\\omega$에 대입하여 계산과정을 보일 것)`
        },
        {
          "id": "4-1A1",
          "title": "1.A1.",
          "type": "proof",
          "prompt": `$F(\\omega)=2\\pi\\delta(\\omega-\\omega_0)$`
        },
        {
          "id": "4-1A2",
          "title": "1.A2.",
          "type": "proof",
          "prompt": `$F(\\omega)=\\pi\\left[\\delta(\\omega-\\omega_0)+\\delta(\\omega+\\omega_0)\\right]$`
        },
        {
          "id": "4-1A3",
          "title": "1.A3.",
          "type": "proof",
          "prompt": `$F(\\omega)=-j\\pi\\left[\\delta(\\omega-\\omega_0)-\\delta(\\omega+\\omega_0)\\right]$`
        },
        { //문제 1.B
          "id": "4-1B",
          "title": "1.B.",
          "prompt": `본 문제에서 [그림 4.1]과 같이 Python으로 3개의 신호를 생성하고, 이 온라인 워크북에서 제공하는 'spectrum_view()'를 이용하여 스펙트럼을 직접 확인하자.
[[image:/images/ch4/figure4_1.png|그림 4.1 정현파의 스펙트럼 관측을 위한 시스템|75]]
자신의 학번 끝자리를 $X$라 하고, $f_0=(20+X)\\times 10^3$[Hz]로 설정한다. 아래 py 스크립트는 3개의 신호 $x_1(t)=\\sin(2\\pi f_0t)$, $x_2(t)=\\cos(2\\pi f_0t)$, $x_3(t)=x_2(t)+jx_1(t)$를 생성한다.
\`\`\`python
import numpy as np

X = 8  # 학번 끝자리
f0 = (20 + X)*1e3

fs = 160e3
t = np.arange(0, 0.1, 1/fs)

x1 = np.sin(2*np.pi*f0*t)
x2 = np.cos(2*np.pi*f0*t)
x3 = x2 + 1j*x1
\`\`\`
`
        },
        {
          "id": "4-1B1",
          "title": "1.B1.",
          "type": "proof",
          "prompt": `오일러 공식을 이용하여, $x_3(t)=e^{j2\\pi f_0t}$임을 설명하시오.`,
        },
        {
          "id": "4-1B2",
          "title": "1.B2.",
          "type": "python",
          responseEnabled: true,
          starterCode: `import numpy as np

X = 8  # 학번 끝자리
f0 = (20 + X)*1e3

fs = 160e3
t = np.arange(0, 0.1, 1/fs)

x1 = np.sin(2*np.pi*f0*t)
x2 = np.cos(2*np.pi*f0*t)
x3 = x2 + 1j*x1

import matplotlib.pyplot as plt
spectrum_view(x1, fs, units="Watts", frequency_limit_hz=80e3)
`,
          "prompt": `위 py 스크립트에 다음 명령을 추가하여 실행하고, $x_1(t)$의 스펙트럼을 확인하시오.
\`\`\`python
#문제 1.B의 py 스크립트에 아래를 추가.
import matplotlib.pyplot as plt
spectrum_view(x1, fs, units="Watts", frequency_limit_hz=80e3)
\`\`\`
스펙트럼에서 다음을 확인하시오.
- 주요 spectral line은 몇 개인가?
- 각각 어느 주파수에 나타나는가?
- 문제 1.A3에서 구한 $\\sin(\\omega_0t)$의 푸리에 변환과 일치하는가?
          `,
        },
        {
          "id": "4-1B3",
          "title": "1.B3.",
          "type": "python",
          responseEnabled: true,
          starterCode: `import numpy as np

X = 8  # 학번 끝자리
f0 = (20 + X)*1e3

fs = 160e3
t = np.arange(0, 0.1, 1/fs)

x1 = np.sin(2*np.pi*f0*t)
x2 = np.cos(2*np.pi*f0*t)
x3 = x2 + 1j*x1

import matplotlib.pyplot as plt
spectrum_view(x2, fs, units="Watts", frequency_limit_hz=80e3)
`,
          "prompt": `위 py 스크립트에 다음 명령을 추가하여 실행하고, $x_2(t)$의 스펙트럼을 확인하시오.
\`\`\`python
#문제 1.B의 py 스크립트에 아래를 추가.
import matplotlib.pyplot as plt
spectrum_view(x2, fs, units="Watts", frequency_limit_hz=80e3)
\`\`\`
문제 1.B2에서 확인한 $x_1(t)$의 결과와 비교하시오.`
        },
        {
          "id": "4-1B4",
          "title": "1.B4.",
          "type": "python",
          responseEnabled: true,
          starterCode: `import numpy as np

X = 8  # 학번 끝자리
f0 = (20 + X)*1e3

fs = 160e3
t = np.arange(0, 0.1, 1/fs)

x1 = np.sin(2*np.pi*f0*t)
x2 = np.cos(2*np.pi*f0*t)
x3 = x2 + 1j*x1

import matplotlib.pyplot as plt
spectrum_view(x3, fs, units="Watts", frequency_limit_hz=80e3)
`,
          "prompt": `위 py 스크립트에 다음 명령을 추가하여 실행하고, $x_3(t)$의 스펙트럼을 확인하시오.
\`\`\`python
#문제 1.B의 py 스크립트에 아래를 추가.
import matplotlib.pyplot as plt
spectrum_view(x3, fs, units="Watts", frequency_limit_hz=80e3)
\`\`\`
문제 1.B2, 1.B3에서 확인한 $x_1(t), x_2(t)$의 결과와 비교하시오. $e^{j2\\pi f_0t}$의 스펙트럼에는 주요 spectral line이 몇 개 나타나는가? 그 위치를 쓰시오.`
        },
        {
          "id": "4-1B5",
          "title": "1.B5.",
          "type": "python",
          responseEnabled: true,
          starterCode: `import numpy as np

X = 8  # 학번 끝자리
f0 = (20 + X)*1e3

fs = 160e3
t = np.arange(0, 0.1, 1/fs)

x1 = np.sin(2*np.pi*f0*t)
x2 = np.cos(2*np.pi*f0*t)
x3 = x2 + 1j*x1

f1 = 3e3
x = np.sin(2*np.pi*f1*t)

import matplotlib.pyplot as plt
spectrum_view(x, fs, units="Watts", frequency_limit_hz=80e3)
`,
          "prompt": `주파수를 3kHz로 수정하기 위해, 위 py 스크립트에 다음을 추가하여 실행하시오.
\`\`\`python
#문제 1.B의 py 스크립트에 아래를 추가.
f1 = 3e3
x = np.sin(2*np.pi*f1*t)

import matplotlib.pyplot as plt
spectrum_view(x, fs, units="Watts", frequency_limit_hz=80e3)
\`\`\`
주요 spectral line의 위치를 쓰시오. 주파수를 변경하기 전의 결과와 비교하고, 문제 1.A의 푸리에 변환식과 일치하는지 설명하시오.`
        },
        {
          "id": "4-1B6",
          "title": "1.B6.",
          "type": "python",
          responseEnabled: true,
          starterCode: `import numpy as np

X = 8  # 학번 끝자리
f0 = (20 + X)*1e3

fs = 160e3
t = np.arange(0, 0.1, 1/fs)

x1 = np.sin(2*np.pi*f0*t)
x2 = np.cos(2*np.pi*f0*t)
x3 = x2 + 1j*x1

phi = np.pi/3
x_phase = np.sin(2*np.pi*f0*t + phi)

import matplotlib.pyplot as plt
spectrum_view(x_phase, fs, units="Watts", frequency_limit_hz=80e3)
`,
          "prompt": `위상 $\\phi$를 수정하기 위해, 위 py 스크립트에 다음을 추가하여 실행하시오.
\`\`\`python
#문제 1.B의 py 스크립트에 아래를 추가.
phi = np.pi/3
x_phase = np.sin(2*np.pi*f0*t + phi)

import matplotlib.pyplot as plt
spectrum_view(x_phase, fs, units="Watts", frequency_limit_hz=80e3)
\`\`\`
위상 $\\phi$를 변경했을 때 주요 spectral line의 위치가 변하는지 확인하시오. 그 이유를 설명하시오.`
        },
      ]
    },
    { //문제 2
      "id": "4-2",
      "title": "2. 주기함수의 스펙트럼",
      "problems": [
        { //문제 2.A
          "id": "4-2A",
          "title": "2.A.",
          "prompt": `주기함수의 스펙트럼(푸리에 변환)을 분석해보자. 주기가 $T$인 주기함수 $f_T(t)$의 푸리에 변환 $F[f_T(t)]$는 [[equation:4.1]]과 같이 주어진다.
$$
F[f_T(t)]=
\\sum_{n=-\\infty}^{\\infty}2\\pi F_n\\delta(\\omega-n\\omega_0)
\\qquad \\text{(식 4.1)}
$$
위에서 기본 주파수(Fundamental Frequency) $\\omega_0=\\dfrac{2\\pi}{T}$이고, $F_n$은 푸리에 급수의 계수로서 [[equation:4.2]]와 같이 구한다.
$$
F_n=\\frac{1}{T}\\int_{0}^{T} f_T(t)e^{-jn\\omega_0t}\\,dt
(\\text{또는 }\\int_{t_0}^{t_0+T} f_T(t)e^{-jn\\omega_0t}\\,dt, t_0\\text{는 임의의 실수로 설정하여도 무방함})
\\qquad \\text{(식 4.2)}
$$

다음 물음을 통해 [[equation:4.1]]을 증명하자.
`
        },
        {
          "id": "4-2A1",
          "title": "2.A1.",
          "type": "proof",
          "prompt": `$f_T(t)$를 푸리에 급수 형태로 쓰시오.
$$
f_T(t)=\\sum_{n=-\\infty}^{\\infty} ? \\times e^{jn\\omega_0t}
$$`
        },
        {
          "id": "4-2A2",
          "title": "2.A2.",
          "type": "proof",
          "prompt": `문제 2.A1의 결과를 푸리에 변환하면 $F[f_T(t)]=F\\left[\\sum_{n=-\\infty}^{\\infty} ? \\times e^{jn\\omega_0t} \\right]$과 같다. 우변에 푸리에 변환의 선형성과 복소지수함수의 푸리에 변환 식 $F[e^{jn\\omega_0t}]=2\\pi \\delta (\\omega-?)$(문제 1.A1 참고)을 이용하여 [[equation:4.1]]을 보이시오.`
        },
        { //문제 2.B
          "id": "4-2B",
          "title": "2.B.",
          "prompt": `$f_T(t)$가 [그림 4.2]와 같이 주어졌을 때 푸리에 변환 $F[f_T(t)]$를 구해보자.
[[image:/images/ch4/figure4_2.png|그림 4.2 주기 신호 $f_T(t)$]]`
        },
        {
          "id": "4-2B1",
          "title": "2.B1.",
          "type": "proof",
          "prompt": `[[equation:4.2]]에 [그림 4.2]의 $f_T(t)$를 대입하여 $F_n$을 구하시오. 아래 세 가지 수식 변형을 이용하여 sinc 함수가 들어간 형태로 유도하시오.
- $\\left[e^{jx}-1\\right]=e^{-j\\frac{x}{2}}\\left[e^{-j\\frac{x}{2}}-e^{j\\frac{x}{2}}\\right]$
- $\\sin(\\theta)=\\dfrac{e^{j\\theta}-e^{-j\\theta}}{2j}$
- $\\dfrac{\\sin \\pi \\theta}{\\pi \\theta}=\\operatorname{sinc}\\theta$`
        },
        {
          "id": "4-2B2",
          "title": "2.B2.",
          "type": "proof",
          "prompt": `[[equation:4.2]]에 $F_n$을 대입하여 쓰시오.`
        },
      ]
    },
    { //문제 3
      "id": "4-3",
      "title": "3. 주기함수의 스펙트럼 분석 및 실험",
      "problems": [
        { //문제 3.A
          "id": "4-3A",
          "title": "3.A.",
          "prompt": `주기적인 직사각 펄스열은 이산적인 line spectrum을 갖는다. 또한 line spectrum의 간격은 신호의 주기에 의해 결정되며, 전체 스펙트럼의 포락선(envelope)은 한 주기 안에 존재하는 펄스의 모양과 펄스폭에 의해 결정된다.

이번 문제에서는 [그림 4.3]과 같이 Python으로 서로 다른 주기와 펄스폭을 갖는 직사각 펄스열을 생성하고, 'spectrum_view()'를 이용하여 시간영역 파형과 주파수영역 스펙트럼의 관계를 확인한다.
[[image:/images/ch4/figure4_3.png|그림 4.3 주기 신호의 스펙트럼과 파형 관측을 위한 시스템|60]]
직사각 펄스열은 다음과 같이 생성할 수 있다.
\`\`\`python
x = ((t % T) < tau).astype(float)
\`\`\`
여기서 $T$는 신호의 주기이고, $\\tau$는 한 주기에서 펄스가 1인 구간의 길이, 즉 펄스폭이다.

다음 네 개의 주기 펄스 신호를 생성하자. (샘플링 주파수는 $f_s=320$[kHz])
[[table:
신호 | 주기 $T$ | 펄스폭 $\\tau$
$x_1(t)$ | $5\\times10^{-4}$[s] | $2.5\\times10^{-5}$[s]
$x_2(t)$ | $5\\times10^{-4}$[s] | $5\\times10^{-5}$[s]
$x_3(t)$ | $2.5\\times10^{-4}$[s] | $2.5\\times10^{-5}$[s]
$x_4(t)$ | $2.5\\times10^{-4}$[s] | $5\\times10^{-5}$[s]
]]`,
        },
        {
          "id": "4-3A1",
          "title": "3.A1.",
          "type": "python",
          starterCode: `import numpy as np
import matplotlib.pyplot as plt

fs = 320e3
t = np.arange(0, 2e-3, 1/fs)

T1 = 5e-4
tau1 = 2.5e-5

x1 = ((t % T1) < tau1).astype(float)`,
          "prompt": `아래 py 스크립트를 참고하여 나머지 $x_2(t), x_3(t), x_4(t)$도 같은 방법으로 생성하고, $0\\le t \\le2$[ms] 구간에서 subplot을 이용하여 한 Figure에 나타내시오.
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

fs = 320e3
t = np.arange(0, 2e-3, 1/fs)

T1 = 5e-4
tau1 = 2.5e-5

x1 = ((t % T1) < tau1).astype(float)
\`\`\``
        },
        {
          "id": "4-3A2",
          "title": "3.A2.",
          "type": "essay",
          "prompt": `주기 $T$와 기본 주파수 $f_0$ 사이의 관계를 고려하여, 문제 3.A1에서 생성한 네 신호에 대하여 각각의 기본 주파수와 펄스폭을 계산하여 쓰시오.`
        },
        {
          "id": "4-3A3",
          "title": "3.A3.",
          "type": "python",
          "prompt": `문제 3.A1에 작성한 py 스크립트에 아래를 추가하여, 'x1' 신호의 스펙트럼을 확인하시오.
\`\`\`python
#문제 3.A1의 py 스크립트에 아래를 추가.
spectrum_view(x1, fs, units="Watts", frequency_limit_hz=160e3)
\`\`\`
그리고, $x_2(t), x_3(t), x_4(t)$에 대해서도 동일하게 실행하시오.

각 결과에서 다음을 관찰한다.

- 스펙트럼이 연속적인가, line 형태인가?
- spectral line 사이의 간격은 얼마인가?
- line들의 크기를 연결했을 때 전체적인 포락선은 어떤 모양인가?`
        },
        { //문제 3.B
          "id": "4-3B",
          "title": "3.B.",
          "prompt": `주기함수의 스펙트럼 특징을 살펴보자.`
        },
        {
          "id": "4-3B1",
          "title": "3.B1.",
          "type": "essay",
          "prompt": `문제 3.A3에서 관찰한 네 신호의 스펙트럼이 line spectrum 형태로 나타나는 이유를 [[equation:4.1]]을 이용하여 설명하시오.`
        },
        {
          "id": "4-3B2",
          "title": "3.B2.",
          "type": "essay",
          "prompt": `문제 3.A3의 결과에서 네 신호의 spectral line 간격을 각각 측정하여 쓰시오. 그리고, 그 간격이 왜 그렇게 나타나는지 $f_0=\\dfrac{1}{T}$를 이용하여 설명하시오.`
        },
        { //문제 3.C
          "id": "4-3C",
          "title": "3.C.",
          "prompt": `스펙트럼의 포락선(envelope) 모양과 펄스폭과의 상관관계를 분석하자.`
        },
        {
          "id": "4-3C1",
          "title": "3.C1.",
          "type": "essay",
          "prompt": `문제 3.A3에서 얻은 line spectrum의 각 line 크기를 연결하여 보면 전체적으로 sinc 함수와 비슷한 모양의 포락선을 형성한다. 직사각 펄스의 Fourier Transform과 관련하여 왜 이러한 형태가 나타나는지 설명하시오.`
        },
        {
          "id": "4-3C2",
          "title": "3.C2.",
          "type": "essay",
          "prompt": `$x_1(t)$와 $x_3(t)$의 펄스폭은 $\\tau=2.5\\times10^{-5}$[s]로 같다. 이때 $\\dfrac{1}{\\tau}=40$[kHz]이다. 스펙트럼 관찰 결과에서 sinc 포락선의 첫 번째 null이 약 $±40$[kHz]에 나타나는지 확인하시오. 반면, $x_2(t), x_4(t)$의 펄스폭은 $\\tau=5\\times10^{-5}$[s]이므로, $\\dfrac{1}{\\tau}=20$[kHz]이다. 첫 번째 null이 약 $±20$[kHz]에 나타나는지 확인하시오.
          
그리고 다음에 답하시오.
(a) line spectrum의 간격을 결정하는 변수는 $T$와 $\\tau$ 중 무엇인가?
(b) sinc 포락선의 폭을 결정하는 변수는 무엇인가?
(c) 펄스폭이 두 배가 되면 스펙트럼의 sinc 포락선 폭은 어떻게 변하는가?`
        },
        {
          "id": "4-3C3",
          "title": "3.C3.",
          "type": "essay",
          "prompt": `[그림 4.4]와 같은 라인 스펙트럼을 갖는 주기 신호를 생성하고자 한다. 라인 스펙트럼의 간격은 10kHz이고, 스펙트럼의 포락선을 만드는 sinc 모양의 첫 번째 Null은 80kHz임을 알 수 있다.
[[image:/images/ch4/figure4_4.png|그림 4.4 주기 신호의 스펙트럼과 파형 관측을 위한 시스템|60]]
이 신호의
(a) 기본 주파수 $f_0$
(b) 주기 $T$
(c) 펄스폭 $\\tau$
를 각각 구하시오.`
        },
        {
          "id": "4-3C4",
          "title": "3.C4.",
          "type": "python",
          responseEnabled: true,
          "prompt": `문제 3.C3에서 계산한 $T$와 $\\tau$를 이용하여 새로운 주기 펄스 신호 $x(t)$를 생성하시오.
          
실행 결과에서
- line spacing이 10 kHz인지
- 첫 번째 sinc null이 약 80 kHz인지
확인하고 [그림 4.4]와 동일한지 결과를 설명하시오.`
        },
        { //문제 3.D
          "id": "4-3D",
          "title": "3.D.",
          "prompt": `6 kHz에 위치한 라인스펙트럼 성분만 제거된 신호를 만들어 보자. 즉 [그림 4.5]와 같은 스펙트럼을 갖는 신호를 생성해보자.
[[image:/images/ch4/figure4_5.png|그림 4.5 생성하고자 하는 라인 스펙트럼|60]]
          `
        },
        {
          "id": "4-3D1",
          "title": "3.D1.",
          "type": "proof",
          "prompt": `문제 3.A에서 사용한 $x_2(t)$를 $f_T(t)$라 하자. $f_T(t)$의 기본 주파수는 $f_0=2$[kHz]이므로, 6 kHz는 세 번째 고조파, $3f_0$에 해당한다.
          
푸리에 급수는 $f_T(t)=\\sum_{n=-\\infty}^{\\infty} F_n e^{jn\\omega_0t}$로 나타낼 수 있다. 이때, $g(t)=f_T(t)=F_3e^{j3\\omega_0 t}$로 정의하면 $g(t)$의 스펙트럼에서 +6 kHz 성분이 제거되는 이유를 설명하시오.`
        },
        {
          "id": "4-3D2",
          "title": "3.D2.",
          "type": "python",
          "prompt": `직사각 펄스열의 계수는 $F_n=\\dfrac{\\tau}{T}\\operatorname{sinc}\\left(n\\dfrac{\\tau}{T}\\right)e^{-j\\pi n\\tau /T}$로 계산할 수 있다. $T=5\\times 10^{-4}$[s], $\\tau=5\\times 10^{-5}$[s]일 때 $F_3$를 Python으로 계산하시오. 계산 결과가 대략 $F_3≈0.0505−0.0694j$가 되는지 확인하시오.`
        },
        {
          "id": "4-3D3",
          "title": "3.D3.",
          "type": "python",
          responseEnabled: true,
          starterCode: `import numpy as np
import matplotlib.pyplot as plt

fs = 320e3
T = 5e-4
tau = 5e-5
t = np.arange(0, 0.1, 1/fs)
fT = ((t % T) < tau).astype(float)
f0 = 1/T
n = 3
F3 = ((tau/T) * np.sinc(n*tau/T) * np.exp(-1j*np.pi*n*tau/T))
g = fT - F3*np.exp(1j*2*np.pi*n*f0*t)

spectrum_view(g, fs, units="Watts", frequency_limit_hz=80e3)`,
          "prompt": `[그림 4.6]과 같이 Python으로 문제 3.D1의 $g(t)$를 생성하여 스펙트럼을 관찰하자.
[[image:/images/ch4/figure4_6.png|그림 4.6 생성하고자 하는 라인 스펙트럼을 위한 시스템|60]]
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

fs = 320e3
T = 5e-4
tau = 5e-5
t = np.arange(0, 0.1, 1/fs)
fT = ((t % T) < tau).astype(float)
f0 = 1/T
n = 3
F3 = ((tau/T) * np.sinc(n*tau/T) * np.exp(-1j*np.pi*n*tau/T))
g = fT - F3*np.exp(1j*2*np.pi*n*f0*t)

spectrum_view(g, fs, units="Watts", frequency_limit_hz=80e3)
\`\`\`
위 py 스크립트를 실행하여 결과를 확인하고, 다음에 답하시오.
(a) +6 kHz에 존재하던 spectral line이 제거되었는가?
(b) -6 kHz의 line도 제거되었는가?
(c) 두 결과가 서로 다른 이유를 설명하시오.`
        },
        {
          "id": "4-3D4",
          "title": "3.D4.",
          "type": "python",
          responseEnabled: true,
          "prompt": `문제 3.D3의 py 스크립트를 적절히 수정하여, 이번에는 $f_T(t)$의 -2 kHz 성분만 제거하시오. $-2$[kHz]$=-f_0$이므로 사용할 $n$의 값을 결정하고 해당 푸리에 계수 $F_n$을 계산하시오. 그 후 $g_2(t)=f_T(t)-F_ne^{jn\\omega_0 t}$를 Python으로 구현하여 'spectrum_view()'로 결과를 확인하시오.`
        },
      ]
    },
    { //문제 4
      "id": "4-4",
      "title": "4. 일반 비주기 샘플 사운드의 스펙트럼 분석",
      "problems": [
        { //문제 4.A
          "id": "4-4A",
          "title": "4.A.",
          "type": "python",
          consoleEnabled: true,
          starterCode: `import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat

file_load("ch4/sampled_ft.mat"); mat = loadmat("sampled_ft.mat")
t_vector = mat['t_vector'][0]; ft_vector = mat['ft_vector'][0]`,
          "prompt": `아래는 이번 실습에 사용할 'ch4/sampled_ft.mat'을 불러오는 py 스크립트이다.
\`\`\`python          
import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat

file_load("ch4/sampled_ft.mat"); mat = loadmat("sampled_ft.mat")
t_vector = mat['t_vector'][0]; ft_vector = mat['ft_vector'][0]
\`\`\`
'ch4/sampled_ft.mat'에 저장된 변수 ‘ft_vector’는 시간 영역의 신호 $f(t)$를 0초부터 10초까지 1/8192초 간격으로 샘플링한 값을 가진 벡터이다. 그리고 변수 ‘t_vector’는 각 샘플이 샘플링된 시간이 저장된 벡터이다.

코드 실행 후, 샘플링 간격을 확인하기 위해 다음을 Console에서 실행해보자.
\`\`\`python          
>>> t_vector[1]-t_vector[0]
>>> plt.plot(t_vector, ft_vector)
\`\`\`          
샘플링 간격이 1/8192인지를 확인하고, 파형의 그래프를 관찰하여, ‘ft_vector’는 비주기 랜덤 신호라 할 수 있는지 쓰시오.`,
        },
        { //문제 4.B
          "id": "4-4B",
          "title": "4.B.",
          "prompt": `$f(t)$(Python 샘플 벡터=‘ft_vector’)의 푸리에 변환을 $F(\\omega)$라 할 때, 수치적분(Numerical integration, [[link:/workbook/ch2?p=2-1A|2장의 문제 1]] 참고)을 이용하여 $F(30), F(70), F(200)$을 구해보자.`
        },
        {
          "id": "4-4B1",
          "title": "4.B1.",
          "type": "proof",
          "prompt": `$f(t)$로부터 $F(\\omega)$를 구하는 푸리에 변환 공식을 쓰시오.
          
($0\\le t\\le 10$ 구간 밖에서는 $f(t)=0$이라고 가정한다. 따라서, 푸리에 변환 식의 적분 구간은 0에서 10까지로 설정할 것)`
        },
        {
          "id": "4-4B2",
          "title": "4.B2.",
          "type": "python",
          "prompt": `아래는 수치적분을 이용하여 $F(30), F(70), F(200)$을 구하는 py 스크립트이다.
\`\`\`python          
import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat

file_load("ch4/sampled_ft.mat"); mat = loadmat("sampled_ft.mat")
t_vector = mat['t_vector'][0]; ft_vector = mat['ft_vector'][0]

t_step=t_vector[1]-t_vector[0]

Fw30=np.sum(?*np.exp(-1j*30*t_vector))*t_step #완성해야 할 부분 (1)
#위 라인은 w=30에서 푸리에 변한 F(w) 즉, F(30)을 수치적분(2장의 문제 1 참고)으로 구현한 것

Fw70=? #완성해야 할 부분 (2)
Fw200=? #완성해야 할 부분 (3)
\`\`\`        
?를 채워 py 스크립트를 완성하고, 모든 라인에 대해 다음의 지침에 따라 주석(Comment)을 작성하시오.

(지침 1) '='이 있는 라인
  - '=' 왼쪽 변수의 목적(용도)을 설명하시오.
  - '=' 오른쪽 수식이 왜 해당 변수의 의미에 부합하는지 설명하시오.
(지침 2) '='이 없는 라인
  - 명령어의 기능을 설명하시오.
  - 왜 해당 명령을 수행하는지 설명하시오.`,
          starterCode: `import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat

file_load("ch4/sampled_ft.mat"); mat = loadmat("sampled_ft.mat")
t_vector = mat['t_vector'][0]; ft_vector = mat['ft_vector'][0]

t_step=t_vector[1]-t_vector[0]

Fw30=np.sum(?*np.exp(-1j*30*t_vector))*t_step #완성해야 할 부분 (1)
#위 라인은 w=30에서 푸리에 변한 F(w) 즉, F(30)을 수치적분(2장의 문제 1 참고)으로 구현한 것

Fw70=? #완성해야 할 부분 (2)
Fw200=? #완성해야 할 부분 (3)`
        },
        { //문제 4.C
          "id": "4-4C",
          "title": "4.C.",
          "prompt": `아래는 주파수 $\\omega$를 -25,000에서 50 간격으로 25,000까지 증가시켜가면서, 각각의 $\\omega$에서의 $F(\\omega)$를 계산하고, 이 값들을 순서대로 원소로 갖는 벡터 ‘Fw_vector’를 만들고, 진폭(Magnitude) 스펙트럼을 그리는 py 스크립트이다.
\`\`\`python          
import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat

file_load("ch4/sampled_ft.mat"); mat = loadmat("sampled_ft.mat")
t_vector = mat['t_vector'][0]; ft_vector = mat['ft_vector'][0]

t_step=t_vector[1]-t_vector[0]

Fw_vector=np.empty(0)
w_vector=np.empty(0)
for w in range(-25000, 25000, 50):
    
    Fw=np.sum(?*np.exp(-1j*w*t_vector))*t_step
    
    w_vector=np.append(w_vector,w)
    Fw_vector=np.append(Fw_vector,Fw)

plt.plot(w_vector,abs(Fw_vector))
plt.xlabel('Frequency [rad/sec]')
plt.grid()
\`\`\``
        },
        {
          "id": "4-4C1",
          "title": "4.C1.",
          "type": "python",
          "prompt": `?를 채워 py 스크립트를 완성하고, 모든 라인에 대해 다음의 지침에 따라 주석(Comment)을 작성하시오.

(지침 1) '='이 있는 라인
  - '=' 왼쪽 변수의 목적(용도)을 설명하시오.
  - '=' 오른쪽 수식이 왜 해당 변수의 의미에 부합하는지 설명하시오.
(지침 2) '='이 없는 라인
  - 명령어의 기능을 설명하시오.
  - 왜 해당 명령을 수행하는지 설명하시오.
  
이후, 완성한 py 스크립트를 수행하여 결과 그래프를 확인하시오.`,
          starterCode: `import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat

file_load("ch4/sampled_ft.mat"); mat = loadmat("sampled_ft.mat")
t_vector = mat['t_vector'][0]; ft_vector = mat['ft_vector'][0]

t_step=t_vector[1]-t_vector[0]

Fw_vector=np.empty(0)
w_vector=np.empty(0)
for w in range(-25000, 25000, 50):
    
    Fw=np.sum(?*np.exp(-1j*w*t_vector))*t_step
    
    w_vector=np.append(w_vector,w)
    Fw_vector=np.append(Fw_vector,Fw)

plt.plot(w_vector,abs(Fw_vector))
plt.xlabel('Frequency [rad/sec]')
plt.grid()`
        },
        {
          "id": "4-4C2",
          "title": "4.C2.",
          "type": "essay",
          "prompt": `위 py 스크립트에서 14번째 라인 ‘Fw=np.sum(?*np.exp(-1j*w*t_vector))*t_step’은 푸리에 변환을 수치적분으로 구현한 것이다. 이것을 for 문으로 반복해야 하는 이유를 쓰시오.`,
        },
        {
          "id": "4-4C3",
          "title": "4.C3.",
          "type": "essay",
          "prompt": `문제 4.C1에서 확인한 결과 그래프에서, $f(t)$의 주파수 성분은 주로 몇 kHz 이내에 있는지 쓰시오.
          
(주의. 그래프의 $x$축 단위는 rad/sec이므로 Hz 단위로 변환하여야 함)`,
        },
        {
          "id": "4-4C4",
          "title": "4.C4.",
          "type": "python",
          consoleEnabled: true,
          "prompt": `문제 4.C1에서 완성한 py 스크립트를 복사하여 붙여넣은 후, Console에서 아래를 수행하여 $f(t)$의 스펙트럼에서 최대로 큰 곳이 주파수가 얼마인지 쓰시오.
\`\`\`python          
>>> T=np.argmax(abs(Fw_vector)) #T는 가장 큰 원소의 인덱스임.
>>> abs(w_vector[T]) #주파수 벡터에서 해당 인덱스의 원소를 찾아냄. 진폭 스펙트럼은 원점을 기준으로 좌우 대칭이므로, 함수 ‘np.argmax()’는 음수 주파수 영역에서 ‘Fw_vector’의 최댓값을 찾아낸다. 양수 주파수 영역에서 진폭 스펙트럼이 최댓값을 가지는 주파수를 찾기 위해 함수 ‘abs()’를 사용한다.
\`\`\``,
        },
        {
          "id": "4-4C5",
          "title": "4.C5.",
          "type": "essay",
          "prompt": `가청 주파수의 범위를 쓰고, 문제 4.C3~4.C4의 답에 근거하여 $f(t)$가 가청 신호인지 판단하시오.`
        },
        { //문제 4.D
          "id": "4-4D",
          "title": "4.D.",
          "type": "python",
          starterCode: `import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat

file_load("ch4/sampled_ft.mat"); mat = loadmat("sampled_ft.mat")
t_vector = mat['t_vector'][0]; ft_vector = mat['ft_vector'][0]

signal_play(ft_vector,8192)`,
          "prompt": `PC 오디오 출력에 스피커나 이어폰을 연결하여 PC 사운드를 들을 수 있도록 준비하시오. 이후, 아래 py 스크립트를 실행하여 재생이 잘 되는지 확인하시오.
\`\`\`python          
import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat

file_load("ch4/sampled_ft.mat"); mat = loadmat("sampled_ft.mat")
t_vector = mat['t_vector'][0]; ft_vector = mat['ft_vector'][0]

signal_play(ft_vector,8192)
\`\`\``
        },
        { //문제 4.E
          "id": "4-4E",
          "title": "4.E.",
          "prompt": `가청 신호인 $f(t)$를 미분한 함수 즉, $\\dfrac{df(t)}{dt}$의 스펙트럼을 그려보고 소리를 청취함으로써, 미분의 물리적 의미를 파악하자.`
        },
        {
          "id": "4-4E1",
          "title": "4.E1.",
          "type": "proof",
          "prompt": `$F(\\omega)$와 $D(\\omega)$는 각각 $f(t)$와 $\\dfrac{df(t)}{dt}$의 푸리에 변환이라고 할 때, $\\left| D(\\omega) \\right| = \\left| \\omega \\right| \\times \\left| F(\\omega) \\right|$임을 증명하시오.`,
        },
        {
          "id": "4-4E2",
          "title": "4.E2.",
          "type": "proof",
          "prompt": `$\\left| D(\\omega) \\right| = \\left| \\omega \\right| \\times \\left| F(\\omega) \\right|$를 근거로, $\\left| D(\\omega) \\right|$와 $\\left| F(\\omega) \\right|$ 그래프 모양의 상대적인 차이점이 어떠한지 설명하시오.`,
        },
        {
          "id": "4-4E3",
          "title": "4.E3.",
          "type": "essay",
          "prompt": `벡터 ‘ft_vector’의 $n$번째 샘플에서의 미분값(기울기)은 ‘(ft_vector[n+1]-ft_vector[n])/샘플 간격’으로 근사화할 수 있음을 설명하시오.`
        },
        {
          "id": "4-4E4",
          "title": "4.E4.",
          "type": "python",
          starterCode: `import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat

file_load("ch4/sampled_ft.mat"); mat = loadmat("sampled_ft.mat")
t_vector = mat['t_vector'][0]; ft_vector = mat['ft_vector'][0]

t_step=t_vector[1]-t_vector[0]
L=len(ft_vector)
diff_out=(ft_vector[2:L]-ft_vector[1:(L-1)])/t_step
t_vector=t_vector[1:(L-1)] #‘diff_out’의 길이는 L이 아니라 L-1이므로 ‘t_vector’에 저장된 마지막 샘플링 시점을 제거함

Dw_vector=np.empty(0)
w_vector=np.empty(0)
for w in range(-25000, 25000, 50):
    w_vector=np.append(w_vector,w)
    Dw=np.sum(?*np.exp(-1j*?*?))*t_step #푸리에 변환 공식을 수치적분으로 구함.
    Dw_vector=np.append(Dw_vector,Dw)

plt.plot(w_vector,abs(Dw_vector))
plt.xlabel('Frequency [rad/sec]')
plt.grid()`,
          "prompt": `‘ft_vector’의 샘플 간격은 1/8192이므로, ‘ft_vector’의 길이를 ‘L’이라 할 때, ‘diff_out=(ft_vector[2:L]- ft_vector[1:(L-1)])/샘플 간격’으로 ‘diff_out’을 생성하면, ‘diff_out’은 $\\dfrac{df(t)}{dt}$에 대한 샘플 벡터로 근사화할 수 있다. 아래는 $\\dfrac{df(t)}{dt}$의 푸리에 변환을 Python 벡터로 생성하고 Magnitude 스펙트럼을 그리는 py 스크립트이다.
\`\`\`python          
import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat

file_load("ch4/sampled_ft.mat"); mat = loadmat("sampled_ft.mat")
t_vector = mat['t_vector'][0]; ft_vector = mat['ft_vector'][0]

t_step=t_vector[1]-t_vector[0]
L=len(ft_vector)
diff_out=(ft_vector[2:L]-ft_vector[1:(L-1)])/t_step
t_vector=t_vector[1:(L-1)] #‘diff_out’의 길이는 L이 아니라 L-1이므로 ‘t_vector’에 저장된 마지막 샘플링 시점을 제거함

Dw_vector=np.empty(0)
w_vector=np.empty(0)
for w in range(-25000, 25000, 50):
    w_vector=np.append(w_vector,w)
    Dw=np.sum(?*np.exp(-1j*?*?))*t_step #푸리에 변환 공식을 수치적분으로 구함.
    Dw_vector=np.append(Dw_vector,Dw)

plt.plot(w_vector,abs(Dw_vector))
plt.xlabel('Frequency [rad/sec]')
plt.grid()
\`\`\`
?를 채워 py 스크립트를 완성하고, 모든 라인에 대해 다음의 지침에 따라 주석(Comment)을 작성하시오.

(지침 1) '='이 있는 라인
  - '=' 왼쪽 변수의 목적(용도)을 설명하시오.
  - '=' 오른쪽 수식이 왜 해당 변수의 의미에 부합하는지 설명하시오.
(지침 2) '='이 없는 라인
  - 명령어의 기능을 설명하시오.
  - 왜 해당 명령을 수행하는지 설명하시오.
  
이후, 완성한 py 스크립트를 수행하여 $\\left| D(\\omega) \\right|$의 결과 그래프를 확인하시오.`,
        },
        {
          "id": "4-4E5",
          "title": "4.E5.",
          "type": "essay",
          "prompt": `문제 4.E4의 $\\left| D(\\omega) \\right|$의 그래프와 문제 4.C1의 $\\left| F(\\omega) \\right|$의 그래프의 관계가, 문제 4.E2의 답과 일치하는지 설명하시오. ($y$축의 절대적인 값보다는 스펙트럼의 전체적인 모양을 보고, 두 스펙트럼의 모양의 차이를 기반으로 설명할 것)`
        },
        {
          "id": "4-4E6",
          "title": "4.E6.",
          "type": "python",
          "prompt": `문제 4.E4의 py 스크립트를 복사하여 붙여넣은 후, 아래를 추가하시오.
\`\`\`python          
#문제 4.E4의 py 스크립트에 아래를 추가

signal_play(diff_out,8192)
\`\`\`
이후, py 스크립트를 실행한 후 $\\dfrac{df(t)}{dt}$를 재생하시오.
          `
        },
        {
          "id": "4-4E7",
          "title": "4.E7.",
          "type": "essay",
          "prompt": `문제 4.D에서 들은 $f(t)$는 합창 소리 뒷 배경으로 미약한 저음의 베이스 기타 소리가 있음을 확인할 수 있었을 것이다. $f(t)$와 문제 4.E6에서 들은 $\\dfrac{df(t)}{dt}$의 베이스 기타 소리의 크기를 비교하고, 문제 4.E5의 결과와 관련지어 베이스 기타 소리 크기 비교 결과에 대한 이유를 쓰시오.`
        },
        {
          "id": "4-4E8",
          "title": "4.E8.",
          "type": "essay",
          "prompt": `지금까지 실험 결과를 바탕으로, '미분기는 선형 시스템이다.'라고 말할 수 있는 이유를 설명하고, 문제 4.E5의 결과를 토대로 미분기가 고역 통과 필터(High Pass Filter, HPF)의 일종인 이유를 설명하시오.`
        },
      ],
    },
  ]
} as const;
