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
        ,
          referenceAnswer: `역 푸리에 변환식에 대입하면
$$
f(t)=\\frac{1}{2\\pi}\\int_{-\\infty}^{\\infty}
2\\pi\\delta(\\omega-\\omega_0)e^{j\\omega t}\\,d\\omega.
$$
델타 함수의 sifting 성질을 이용하면
$$
\\boxed{f(t)=e^{j\\omega_0t}}
$$
이다.`},
        {
          "id": "4-1A2",
          "title": "1.A2.",
          "type": "proof",
          "prompt": `$F(\\omega)=\\pi\\left[\\delta(\\omega-\\omega_0)+\\delta(\\omega+\\omega_0)\\right]$`
        ,
          referenceAnswer: `역 푸리에 변환식에 대입하면
$$
f(t)=\\frac{1}{2}
\\int_{-\\infty}^{\\infty}
\\left[\\delta(\\omega-\\omega_0)+\\delta(\\omega+\\omega_0)\\right]
e^{j\\omega t}\\,d\\omega.
$$
따라서
$$
f(t)=\\frac12
\\left(e^{j\\omega_0t}+e^{-j\\omega_0t}\\right)
=\\boxed{\\cos(\\omega_0t)}.
$$`},
        {
          "id": "4-1A3",
          "title": "1.A3.",
          "type": "proof",
          "prompt": `$F(\\omega)=-j\\pi\\left[\\delta(\\omega-\\omega_0)-\\delta(\\omega+\\omega_0)\\right]$`
        ,
          referenceAnswer: `역 푸리에 변환식에 대입하면
$$
f(t)=
-\\frac{j}{2}
\\left(
e^{j\\omega_0t}-e^{-j\\omega_0t}
\\right).
$$
오일러 공식에 의해
$$
\\sin(\\omega_0t)
=
\\frac{e^{j\\omega_0t}-e^{-j\\omega_0t}}{2j}
$$
이므로
$$
\\boxed{f(t)=\\sin(\\omega_0t)}
$$
이다.`},
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
        
          referenceAnswer: `오일러 공식
$$
e^{j\\theta}=\\cos\\theta+j\\sin\\theta
$$
에서 $\\theta=2\\pi f_0t$로 두면
$$
e^{j2\\pi f_0t}
=
\\cos(2\\pi f_0t)+j\\sin(2\\pi f_0t).
$$
문제에서
$$
x_2(t)=\\cos(2\\pi f_0t),\\qquad
x_1(t)=\\sin(2\\pi f_0t)
$$
이므로
$$
\\boxed{x_3(t)=x_2(t)+jx_1(t)=e^{j2\\pi f_0t}}
$$
이다.`},
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
        
          referenceAnswer: `$x_1(t)=\\sin(2\\pi f_0t)$의 주요 spectral line은 두 개이며
$$
\\boxed{f=-f_0,\\quad f=+f_0}
$$
에 나타난다.

예를 들어 학번 끝자리가 8이면
$$
f_0=(20+8)\\times10^3=28\\ \\mathrm{kHz}
$$
이므로 약 $-28$ kHz와 $+28$ kHz에 line이 나타난다.

이는
$$
\\sin(\\omega_0t)
\\longleftrightarrow
-j\\pi[\\delta(\\omega-\\omega_0)-\\delta(\\omega+\\omega_0)]
$$
와 일치한다.`},
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
        ,
          referenceAnswer: `$x_2(t)=\\cos(2\\pi f_0t)$도 주요 spectral line이 두 개이고
$$
\\boxed{f=-f_0,\\quad f=+f_0}
$$
에 나타난다.

따라서 크기 스펙트럼에서 $x_1(t)$와 $x_2(t)$의 주요 line 위치는 같다. 다만 sine과 cosine은 복소 푸리에 계수의 위상이 서로 다르다.`},
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
        ,
          referenceAnswer: `$x_3(t)=e^{j2\\pi f_0t}$의 스펙트럼은
$$
e^{j2\\pi f_0t}
\\longleftrightarrow
2\\pi\\delta(\\omega-2\\pi f_0)
$$
이므로 주요 spectral line은 한 개이며
$$
\\boxed{f=+f_0}
$$
에만 나타난다.

$x_1(t)$와 $x_2(t)$가 $\\pm f_0$에 두 개의 line을 갖는 것과 대비된다.`},
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
        ,
          referenceAnswer: `주파수를 $f_1=3$ kHz로 변경하면 주요 spectral line은
$$
\\boxed{f=-3\\ \\mathrm{kHz},\\quad f=+3\\ \\mathrm{kHz}}
$$
에 나타난다.

이는 정현파의 푸리에 변환이 입력 정현파의 주파수와 같은 $\\pm f_1$ 위치에 두 개의 delta 성분을 갖는다는 문제 1.A의 결과와 일치한다.`},
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
        ,
          referenceAnswer: `위상 $\\phi$를 변경해도 주요 spectral line의 위치는
$$
\\boxed{f=-f_0,\\quad f=+f_0}
$$
로 변하지 않는다.

위상 변화는 푸리에 변환 계수의 복소 위상을 바꾸지만 신호 자체의 주파수 $f_0$를 바꾸지 않기 때문이다. 따라서 magnitude spectrum의 주요 line 위치는 그대로 유지된다.`},
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
        ,
          referenceAnswer: `주기가 $T$인 주기함수의 푸리에 급수는
$$
\\boxed{
f_T(t)=
\\sum_{n=-\\infty}^{\\infty}
F_n e^{jn\\omega_0t}
}
$$
이다. 따라서 빈칸은 $F_n$이다.`},
        {
          "id": "4-2A2",
          "title": "2.A2.",
          "type": "proof",
          "prompt": `문제 2.A1의 결과를 푸리에 변환하면 $F[f_T(t)]=F\\left[\\sum_{n=-\\infty}^{\\infty} ? \\times e^{jn\\omega_0t} \\right]$과 같다. 우변에 푸리에 변환의 선형성과 복소지수함수의 푸리에 변환 식 $F[e^{jn\\omega_0t}]=2\\pi \\delta (\\omega-?)$(문제 1.A1 참고)을 이용하여 [[equation:4.1]]을 보이시오.`
        ,
          referenceAnswer: `문제 2.A1에서
$$
f_T(t)=\\sum_{n=-\\infty}^{\\infty}F_ne^{jn\\omega_0t}
$$
이다.

푸리에 변환의 선형성을 이용하면
$$
\\mathcal{F}[f_T(t)]
=
\\sum_{n=-\\infty}^{\\infty}
F_n\\mathcal{F}[e^{jn\\omega_0t}].
$$

또한
$$
\\mathcal{F}[e^{jn\\omega_0t}]
=
2\\pi\\delta(\\omega-n\\omega_0)
$$
이므로
$$
\\boxed{
\\mathcal{F}[f_T(t)]
=
\\sum_{n=-\\infty}^{\\infty}
2\\pi F_n\\delta(\\omega-n\\omega_0)
}
$$
가 된다.`},
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
        ,
          referenceAnswer: `[그림 4.2]의 한 주기에서 펄스의 높이를 1, 펄스폭을 $\\tau$, 주기를 $T$라 하면
$$
F_n
=
\\frac1T\\int_0^\\tau e^{-jn\\omega_0t}\\,dt.
$$

$n\\neq0$에서
$$
F_n
=
\\frac{1-e^{-jn\\omega_0\\tau}}{jn\\omega_0T}.
$$
$\\omega_0=2\\pi/T$와 지수함수의 변형을 이용하면
$$
\\boxed{
F_n=
\\frac{\\tau}{T}
\\operatorname{sinc}\\left(n\\frac{\\tau}{T}\\right)
e^{-j\\pi n\\tau/T}
}
$$
이다. 여기서
$$
\\operatorname{sinc}(x)=\\frac{\\sin(\\pi x)}{\\pi x}.
$$

또한 $n=0$에서는
$$
F_0=\\frac{\\tau}{T}
$$
이며 위 식의 극한값과 같다.

[그림 4.2]의 $T=5\\times10^{-4}$ s, $\\tau=5\\times10^{-5}$ s를 사용하면
$$
\\boxed{
F_n=0.1\\,\\operatorname{sinc}(0.1n)e^{-j0.1\\pi n}
}
$$
이다.`},
        {
          "id": "4-2B2",
          "title": "2.B2.",
          "type": "proof",
          "prompt": `[[equation:4.2]]에 $F_n$을 대입하여 쓰시오.`
        ,
          referenceAnswer: `문제 2.B1의 $F_n$을 주기함수의 푸리에 변환 식에 대입하면
$$
\\boxed{
\\mathcal{F}[f_T(t)]
=
\\sum_{n=-\\infty}^{\\infty}
2\\pi
\\frac{\\tau}{T}
\\operatorname{sinc}\\left(n\\frac{\\tau}{T}\\right)
e^{-j\\pi n\\tau/T}
\\delta(\\omega-n\\omega_0)
}
$$
이다.

[그림 4.2]의 $\\tau/T=0.1$을 사용하면
$$
\\mathcal{F}[f_T(t)]
=
\\sum_{n=-\\infty}^{\\infty}
0.2\\pi\\,
\\operatorname{sinc}(0.1n)e^{-j0.1\\pi n}
\\delta(\\omega-n\\omega_0)
$$
로 쓸 수 있다.`},
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
        ,
          referenceAnswer: `예시 코드는 다음과 같다.

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

fs = 320e3
t = np.arange(0, 2e-3, 1/fs)

T1, tau1 = 5e-4,   2.5e-5
T2, tau2 = 5e-4,   5e-5
T3, tau3 = 2.5e-4, 2.5e-5
T4, tau4 = 2.5e-4, 5e-5

x1 = ((t % T1) < tau1).astype(float)
x2 = ((t % T2) < tau2).astype(float)
x3 = ((t % T3) < tau3).astype(float)
x4 = ((t % T4) < tau4).astype(float)

signals = [x1, x2, x3, x4]

plt.figure(figsize=(10, 8))
for i, x in enumerate(signals):
    plt.subplot(4, 1, i+1)
    plt.plot(t*1e3, x)
    plt.ylabel(f"x{i+1}(t)")
    plt.grid()

plt.xlabel("Time (ms)")
plt.tight_layout()
\`\`\`

$x_1,x_2$는 2 kHz, $x_3,x_4$는 4 kHz의 기본주파수를 가지며, $\\tau$ 값에 따라 펄스폭이 달라진다.`},
        {
          "id": "4-3A2",
          "title": "3.A2.",
          "type": "essay",
          "prompt": `주기 $T$와 기본 주파수 $f_0$ 사이의 관계를 고려하여, 문제 3.A1에서 생성한 네 신호에 대하여 각각의 기본 주파수와 펄스폭을 계산하여 쓰시오.`
        ,
          referenceAnswer: `기본주파수는
$$
f_0=\\frac1T
$$
이므로

- $x_1(t)$: $f_0=2$ kHz, $\\tau=2.5\\times10^{-5}$ s
- $x_2(t)$: $f_0=2$ kHz, $\\tau=5\\times10^{-5}$ s
- $x_3(t)$: $f_0=4$ kHz, $\\tau=2.5\\times10^{-5}$ s
- $x_4(t)$: $f_0=4$ kHz, $\\tau=5\\times10^{-5}$ s

이다.`},
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
        ,
          referenceAnswer: `네 신호의 스펙트럼은 모두 연속 스펙트럼이 아니라 일정한 간격으로 나타나는 line spectrum이다.

- $x_1,x_2$: line spacing 약 2 kHz
- $x_3,x_4$: line spacing 약 4 kHz

각 spectral line의 크기를 연결한 포락선은 직사각 펄스의 푸리에 변환에 해당하는 sinc 형태를 이룬다.`},
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
        ,
          referenceAnswer: `식 (4.1)
$$
\\mathcal{F}[f_T(t)]
=
\\sum_{n=-\\infty}^{\\infty}
2\\pi F_n\\delta(\\omega-n\\omega_0)
$$
에서 스펙트럼은 모든 $\\omega$에 연속적으로 존재하는 것이 아니라
$$
\\omega=n\\omega_0
$$
에서만 delta 형태로 존재한다.

따라서 주기함수의 스펙트럼은 기본주파수의 정수배 위치에만 나타나는 line spectrum이 된다.`},
        {
          "id": "4-3B2",
          "title": "3.B2.",
          "type": "essay",
          "prompt": `문제 3.A3의 결과에서 네 신호의 spectral line 간격을 각각 측정하여 쓰시오. 그리고, 그 간격이 왜 그렇게 나타나는지 $f_0=\\dfrac{1}{T}$를 이용하여 설명하시오.`
        ,
          referenceAnswer: `측정되는 line spacing은

- $x_1(t)$: 2 kHz
- $x_2(t)$: 2 kHz
- $x_3(t)$: 4 kHz
- $x_4(t)$: 4 kHz

이다.

line spacing은 기본주파수
$$
f_0=\\frac1T
$$
에 의해 결정된다. 따라서 펄스폭이 달라도 주기가 같으면 line spacing은 동일하다.`},
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
        ,
          referenceAnswer: `한 주기의 직사각 펄스의 푸리에 변환 크기는 sinc 형태이다. 주기 펄스열의 푸리에 급수 계수 $F_n$도 이 직사각 펄스의 sinc 형태를 샘플링한 값으로 나타난다.

따라서 각 line의 크기를 연결하면
$$
\\left|
\\operatorname{sinc}\\left(n\\frac{\\tau}{T}\\right)
\\right|
$$
에 대응하는 sinc 형태의 포락선이 나타난다.`},
        {
          "id": "4-3C2",
          "title": "3.C2.",
          "type": "essay",
          "prompt": `$x_1(t)$와 $x_3(t)$의 펄스폭은 $\\tau=2.5\\times10^{-5}$[s]로 같다. 이때 $\\dfrac{1}{\\tau}=40$[kHz]이다. 스펙트럼 관찰 결과에서 sinc 포락선의 첫 번째 null이 약 $±40$[kHz]에 나타나는지 확인하시오. 반면, $x_2(t), x_4(t)$의 펄스폭은 $\\tau=5\\times10^{-5}$[s]이므로, $\\dfrac{1}{\\tau}=20$[kHz]이다. 첫 번째 null이 약 $±20$[kHz]에 나타나는지 확인하시오.
          
그리고 다음에 답하시오.
(a) line spectrum의 간격을 결정하는 변수는 $T$와 $\\tau$ 중 무엇인가?
(b) sinc 포락선의 폭을 결정하는 변수는 무엇인가?
(c) 펄스폭이 두 배가 되면 스펙트럼의 sinc 포락선 폭은 어떻게 변하는가?`
        ,
          referenceAnswer: `관찰 결과

- $\\tau=2.5\\times10^{-5}$ s인 $x_1,x_3$의 첫 null은 약 $\\pm40$ kHz
- $\\tau=5\\times10^{-5}$ s인 $x_2,x_4$의 첫 null은 약 $\\pm20$ kHz

에 나타난다.

(a) line spectrum의 간격을 결정하는 변수는 주기 $T$이다.

(b) sinc 포락선의 폭을 결정하는 변수는 펄스폭 $\\tau$이다.

(c) 첫 null은 대략 $1/\\tau$에 위치하므로 펄스폭이 두 배가 되면 포락선의 주파수축 폭은 절반으로 줄어든다.`},
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
        ,
          referenceAnswer: `line spacing이 10 kHz이므로
$$
\\boxed{f_0=10\\ \\mathrm{kHz}}
$$
이다.

따라서
$$
T=\\frac1{f_0}
=\\frac1{10^4}
=\\boxed{1.0\\times10^{-4}\\ \\mathrm{s}}
$$
이다.

첫 번째 sinc null이 80 kHz이므로
$$
\\frac1\\tau=80\\times10^3
$$
에서
$$
\\boxed{\\tau=1.25\\times10^{-5}\\ \\mathrm{s}}
$$
이다.`},
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
        ,
          referenceAnswer: `예시 코드는 다음과 같다.

\`\`\`python
import numpy as np

fs = 320e3
t = np.arange(0, 2e-3, 1/fs)

T = 1/10e3
tau = 1/80e3

x = ((t % T) < tau).astype(float)

spectrum_view(
    x,
    fs,
    units="Watts",
    frequency_limit_hz=160e3
)
\`\`\`

결과에서 spectral line은 약 10 kHz 간격으로 나타나고, sinc 포락선의 첫 번째 null은 약 $\\pm80$ kHz에 나타나므로 [그림 4.4]의 조건과 일치한다.`},
        { //문제 3.D
          "id": "4-3D",
          "title": "3.D.",
          "prompt": `$2n$ kHz($n$은 학번 끝자리)에 위치한 라인스펙트럼 성분만 제거된 신호를 만들어 보자. [그림 4.5]는 학번 끝자리가 3인 경우 생성하고자 하는 라인 스펙트럼이다.
[[image:/images/ch4/figure4_5.png|그림 4.5 학번 끝자리가 3인 경우 생성하고자 하는 라인 스펙트럼|60]]
          `
        },
        {
          "id": "4-3D1",
          "title": "3.D1.",
          "type": "proof",
          "prompt": `문제 3.A에서 사용한 $x_2(t)$를 $f_T(t)$라 하자. $f_T(t)$의 기본 주파수는 $f_0=2$[kHz]이므로, 6 kHz는 세 번째 고조파, $3f_0$에 해당한다.
          
푸리에 급수는 $f_T(t)=\\sum_{n=-\\infty}^{\\infty} F_n e^{jn\\omega_0t}$로 나타낼 수 있다. 이때, $g(t)=f_T(t)-F_3e^{j3\\omega_0 t}$로 정의하면, [그림 4.5]와 같이 $g(t)$의 스펙트럼에서 +6 kHz 성분이 제거되는 이유를 설명하시오.`
        ,
          referenceAnswer: `의도한 식은
$$
g(t)=f_T(t)-F_3e^{j3\\omega_0t}
$$
이다.

푸리에 급수
$$
f_T(t)=\\sum_{n=-\\infty}^{\\infty}F_ne^{jn\\omega_0t}
$$
에서 $n=3$ 항은
$$
F_3e^{j3\\omega_0t}
$$
이다.

$f_0=2$ kHz이므로 이 항의 주파수는
$$
3f_0=6\\ \\mathrm{kHz}
$$
이다. 따라서 위 항만 빼면 $+6$ kHz에 대응하는 $n=3$의 line 성분만 상쇄된다.`},
        {
          "id": "4-3D2",
          "title": "3.D2.",
          "type": "python",
          "prompt": `직사각 펄스열의 계수는 $F_n=\\dfrac{\\tau}{T}\\operatorname{sinc}\\left(n\\dfrac{\\tau}{T}\\right)e^{-j\\pi n\\tau /T}$로 계산할 수 있다. $T=5\\times 10^{-4}$[s], $\\tau=5\\times 10^{-5}$[s]일 때 $F_3$를 Python으로 계산하면 대략 $F_3≈0.0505−0.0694j$이다.
          
$F_n$($n$은 학번 끝자리)를 계산하시오.`
        ,
          
referenceAnswer: `자신의 학번 끝자리 $n$을 대입하여 푸리에 계수 $F_n$을 계산한다.

직사각 펄스열의 푸리에 급수 계수는
$$
F_n=
\\frac{\\tau}{T}
\\operatorname{sinc}\\left(n\\frac{\\tau}{T}\\right)
e^{-j\\pi n\\tau/T}
$$
이다.

주어진 $T=5\\times10^{-4}$ s,
$\\tau=5\\times10^{-5}$ s를 대입하면
$$
\\boxed{
F_n=0.1\\operatorname{sinc}(0.1n)e^{-j0.1\\pi n}
}
$$
이다.

Python 코드는 다음과 같다.

\`\`\`python
import numpy as np

T = 5e-4
tau = 5e-5
n = 3  # 자신의 학번 끝자리로 수정

Fn = (
    (tau/T)
    * np.sinc(n*tau/T)
    * np.exp(-1j*np.pi*n*tau/T)
)

print(Fn)
\`\`\`

예를 들어 학번 끝자리가 3이면
$$
\\boxed{F_3\\approx0.0505-0.0694j}
$$
이다.

학번 끝자리가 다르면 계산 결과도 달라진다.`},
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
n = X # 자신의 학번 끝자리를 대입
Fn = ((tau/T) * np.sinc(n*tau/T) * np.exp(-1j*np.pi*n*tau/T))
g = fT - Fn*np.exp(1j*2*np.pi*n*f0*t)

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
n = X # 자신의 학번 끝자리를 대입
Fn = ((tau/T) * np.sinc(n*tau/T) * np.exp(-1j*np.pi*n*tau/T))
g = fT - Fn*np.exp(1j*2*np.pi*n*f0*t)

spectrum_view(g, fs, units="Watts", frequency_limit_hz=80e3)
\`\`\`
위 py 스크립트를 실행하여 결과를 확인하고, 다음에 답하시오.
(a) $+2n$ kHz에 존재하던 spectral line이 제거되었는가?
(b) $-2n$ kHz의 line도 제거되었는가?
(c) 두 결과가 서로 다른 이유를 설명하시오.`
        ,
          
referenceAnswer: `(a) $n$이 1~9이고 제거하려는 spectral line이 원래 존재한다면, $+2n$ kHz에 해당하는 성분은 제거된다.

푸리에 급수
$$
f_T(t)=\\sum_{k=-\\infty}^{\\infty}
F_k e^{jk\\omega_0t}
$$
에서
$$
g(t)=f_T(t)-F_ne^{jn\\omega_0t}
$$
로 정의하면, $k=n$에 해당하는 항만 상쇄되기 때문이다.

(b) 일반적으로 $-2n$ kHz의 성분은 제거되지 않는다. 단, $n=0$이면 양의 주파수와 음의 주파수가 모두 DC 성분에 해당한다.

(c) 제거한 항은
$$
F_ne^{jn\\omega_0t}
$$
이므로 $+2n$ kHz에 해당하는 성분만 상쇄한다.

반면 $-2n$ kHz에 해당하는 성분은
$$
F_{-n}e^{-jn\\omega_0t}
$$
이므로 별도로 제거하지 않는 한 남아 있다.

예를 들어 학번 끝자리가 3이면
$$
g(t)=f_T(t)-F_3e^{j3\\omega_0t}
$$
이므로 $+6$ kHz 성분만 제거되고
$-6$ kHz 성분은 남는다.

단, $n=5$이면 주어진 직사각 펄스열의 $F_5=0$이므로 $+10$ kHz 성분은 이론적으로 처음부터 존재하지 않는다. $n=0$이면 DC 성분을 제거하는 문제가 된다.

실제 Python 실험에서는 연속시간 신호를 유한한 샘플로 근사하므로 이론적인 계수와 약간의 차이가 나타날 수 있다.`},
        {
          "id": "4-3D4",
          "title": "3.D4.",
          "type": "python",
          responseEnabled: true,
          "prompt": `문제 3.D3의 py 스크립트를 적절히 수정하여, 이번에는 $f_T(t)$의 -2 kHz 성분만 제거하시오. $-2$[kHz]$=-f_0$이므로 사용할 $n$의 값을 결정하고 해당 푸리에 계수 $F_n$을 계산하시오. 그 후 $g_2(t)=f_T(t)-F_ne^{jn\\omega_0 t}$를 Python으로 구현하여 'spectrum_view()'로 결과를 확인하시오.`
        ,
          referenceAnswer: `$-2$ kHz는
$$
-f_0
$$
이므로
$$
\\boxed{n=-1}
$$
을 사용한다.

예시 코드는 다음과 같다.

\`\`\`python
n = -1

Fn = (
    (tau/T)
    * np.sinc(n*tau/T)
    * np.exp(-1j*np.pi*n*tau/T)
)

g2 = fT - Fn*np.exp(
    1j*2*np.pi*n*f0*t
)

spectrum_view(
    g2,
    fs,
    units="Watts",
    frequency_limit_hz=80e3
)
\`\`\`

실행 결과에서 $-2$ kHz 위치의 line이 제거되고 $+2$ kHz 성분은 남는 것을 확인할 수 있다.`},
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
        
          referenceAnswer: `실행 결과
$$
t_{\\mathrm{vector}}[1]-t_{\\mathrm{vector}}[0]
=
\\frac1{8192}
\\approx1.2207\\times10^{-4}\\ \\mathrm{s}
$$
이므로 주어진 샘플링 간격과 일치한다.

시간파형을 관찰하면 일정한 주기가 반복되지 않으므로 \`ft_vector\`는 비주기 신호로 볼 수 있다.`},
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
        ,
          referenceAnswer: `푸리에 변환은
$$
F(\\omega)
=
\\int_{-\\infty}^{\\infty}
f(t)e^{-j\\omega t}\\,dt
$$
이다.

문제에서 $0\\le t\\le10$ 밖에서는 $f(t)=0$으로 가정하므로
$$
\\boxed{
F(\\omega)
=
\\int_0^{10}
f(t)e^{-j\\omega t}\\,dt
}
$$
이다.`},
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
        ,
          referenceAnswer: `빈칸은 다음과 같이 채운다.

\`\`\`python
t_step = t_vector[1] - t_vector[0]

Fw30 = np.sum(
    ft_vector*np.exp(-1j*30*t_vector)
) * t_step

Fw70 = np.sum(
    ft_vector*np.exp(-1j*70*t_vector)
) * t_step

Fw200 = np.sum(
    ft_vector*np.exp(-1j*200*t_vector)
) * t_step
\`\`\`

각 식은
$$
F(\\omega)\\approx
\\sum_k f(t_k)e^{-j\\omega t_k}\\Delta t
$$
형태의 수치적분으로 각각 $F(30)$, $F(70)$, $F(200)$을 계산한다.`},
        { //문제 4.C
          "id": "4-4C",
          "title": "4.C.",
          "prompt": `아래는 주파수 $\\omega$를 -25,000에서 (학번 끝자리 + 1)×10 간격으로 25,000까지 증가시켜가면서, 각각의 $\\omega$에서의 $F(\\omega)$를 계산하고, 이 값들을 순서대로 원소로 갖는 벡터 ‘Fw_vector’를 만들고, 진폭(Magnitude) 스펙트럼을 그리는 py 스크립트이다.
\`\`\`python          
import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat

file_load("ch4/sampled_ft.mat"); mat = loadmat("sampled_ft.mat")
t_vector = mat['t_vector'][0]; ft_vector = mat['ft_vector'][0]

t_step=t_vector[1]-t_vector[0]

Fw_vector=np.empty(0)
w_vector=np.empty(0)
for w in range(-25000, 25000, (X+1)+10): # X는 학번 끝자리
    
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
for w in range(-25000, 25000, (X+1)+10): # X는 학번 끝자리
    
    Fw=np.sum(?*np.exp(-1j*w*t_vector))*t_step
    
    w_vector=np.append(w_vector,w)
    Fw_vector=np.append(Fw_vector,Fw)

plt.plot(w_vector,abs(Fw_vector))
plt.xlabel('Frequency [rad/sec]')
plt.grid()`
        ,
          referenceAnswer: `빈칸은 \`ft_vector\`이다.

\`\`\`python
Fw_vector=np.empty(0)
w_vector=np.empty(0)

for w in range(-25000, 25000, 50):

    Fw = np.sum(
        ft_vector*np.exp(-1j*w*t_vector)
    ) * t_step

    w_vector=np.append(w_vector,w)
    Fw_vector=np.append(Fw_vector,Fw)

plt.plot(w_vector,abs(Fw_vector))
plt.xlabel('Frequency [rad/sec]')
plt.grid()
\`\`\`

각 $\\omega$마다 수치적분으로 $F(\\omega)$를 계산하여 \`Fw_vector\`에 저장한 뒤 magnitude spectrum을 그린다.`},
        {
          "id": "4-4C2",
          "title": "4.C2.",
          "type": "essay",
          "prompt": `위 py 스크립트에서 14번째 라인 ‘Fw=np.sum(?*np.exp(-1j*w*t_vector))*t_step’은 푸리에 변환을 수치적분으로 구현한 것이다. 이것을 for 문으로 반복해야 하는 이유를 쓰시오.`,
        
          referenceAnswer: `푸리에 변환 $F(\\omega)$는 주파수 $\\omega$의 함수이다. 전체 스펙트럼을 그리려면 하나의 $\\omega$에서만 계산하는 것이 아니라, 설정한 모든 $\\omega$ 값에 대하여
$$
F(\\omega)
=
\\int f(t)e^{-j\\omega t}dt
$$
를 각각 계산해야 한다.

따라서 \`w\`를 변화시키면서 같은 수치적분을 반복하기 위해 \`for\` 문을 사용한다.`},
        {
          "id": "4-4C3",
          "title": "4.C3.",
          "type": "essay",
          "prompt": `문제 4.C1에서 확인한 결과 그래프에서, $f(t)$의 주파수 성분은 주로 몇 kHz 이내에 있는지 쓰시오.
          
(주의. 그래프의 $x$축 단위는 rad/sec이므로 Hz 단위로 변환하여야 함)`,
        
          referenceAnswer: `결과 그래프를 보면 주요 주파수 성분은 대략
$$
|\\omega|\\lesssim600\\ \\mathrm{rad/s}
$$
부근에 집중되어 있다.

Hz로 환산하면
$$
f=\\frac{\\omega}{2\\pi}
\\approx\\frac{600}{2\\pi}
\\approx95.5\\ \\mathrm{Hz}
$$
이므로, 주된 성분은 대략
$$
\\boxed{0.10\\ \\mathrm{kHz}\\text{ 이내}}
$$
에 있다고 볼 수 있다.`},
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
        
          referenceAnswer: `제공된 데이터에서 magnitude spectrum의 최대점은 약
$$
|\\omega|\\approx550\\ \\mathrm{rad/s}
$$
부근이다.

Hz로 환산하면
$$
f=\\frac{550}{2\\pi}
\\approx\\boxed{87.5\\ \\mathrm{Hz}}
$$
이다.

수치적분의 주파수 간격이 50 rad/s이므로 결과에는 그 정도의 해상도 제한이 있다.`},
        {
          "id": "4-4C5",
          "title": "4.C5.",
          "type": "essay",
          "prompt": `가청 주파수의 범위를 쓰고, 문제 4.C3~4.C4의 답에 근거하여 $f(t)$가 가청 신호인지 판단하시오.`
        ,
          referenceAnswer: `사람의 일반적인 가청 주파수 범위는 약
$$
20\\ \\mathrm{Hz}\\sim20\\ \\mathrm{kHz}
$$
이다.

문제 4.C3~4.C4에서 확인한 주요 성분은 약 100 Hz 이하이고 최대 성분도 약 87.5 Hz이므로 가청 주파수 범위 안에 있다.

따라서
$$
\\boxed{f(t)\\text{는 가청 신호이다.}}
$$`},
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
        ,
          referenceAnswer: `\`signal_play(ft_vector,8192)\`를 실행하면 \`ft_vector\`가 8192 Hz의 샘플링 주파수로 재생된다.

제공된 샘플은 음악/합창 계열의 오디오이며, 보컬과 함께 저음의 베이스 기타 성분을 들을 수 있다.`},
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
        
          referenceAnswer: `푸리에 변환의 미분 성질에 의해
$$
\\mathcal{F}\\left[\\frac{df(t)}{dt}\\right]
=
j\\omega F(\\omega)
$$
이다.

따라서
$$
D(\\omega)=j\\omega F(\\omega)
$$
이고 절댓값을 취하면
$$
\\boxed{
|D(\\omega)|
=
|\\omega|\\,|F(\\omega)|
}
$$
이다.`},
        {
          "id": "4-4E2",
          "title": "4.E2.",
          "type": "proof",
          "prompt": `$\\left| D(\\omega) \\right| = \\left| \\omega \\right| \\times \\left| F(\\omega) \\right|$를 근거로, $\\left| D(\\omega) \\right|$와 $\\left| F(\\omega) \\right|$ 그래프 모양의 상대적인 차이점이 어떠한지 설명하시오.`,
        
          referenceAnswer: `관계식
$$
|D(\\omega)|=|\\omega||F(\\omega)|
$$
에서 주파수의 절댓값 $|\\omega|$가 가중치로 곱해진다.

따라서 낮은 주파수 성분은 상대적으로 작아지고, 높은 주파수 성분은 상대적으로 크게 강조된다. 즉 $|D(\\omega)|$는 $|F(\\omega)|$보다 고주파 쪽이 더 강조된 형태가 된다.`},
        {
          "id": "4-4E3",
          "title": "4.E3.",
          "type": "essay",
          "prompt": `벡터 ‘ft_vector’의 $n$번째 샘플에서의 미분값(기울기)은 ‘(ft_vector[n+1]-ft_vector[n])/샘플 간격’으로 근사화할 수 있음을 설명하시오.`
        ,
          referenceAnswer: `미분의 정의는
$$
\\frac{df(t)}{dt}
=
\\lim_{\\Delta t\\to0}
\\frac{f(t+\\Delta t)-f(t)}{\\Delta t}
$$
이다.

샘플 간격을 $\\Delta t$라 하면 $n$번째 샘플 부근의 미분은
$$
\\boxed{
\\frac{f[n+1]-f[n]}{\\Delta t}
}
$$
로 근사할 수 있다. 따라서 인접한 두 샘플의 차이를 샘플 간격으로 나눈 값이 기울기의 수치적 근사가 된다.`},
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
        
          referenceAnswer: `푸리에 변환 계산 부분의 빈칸은 \`diff_out\`, \`w\`, \`t_vector\`이다.

\`\`\`python
Dw_vector=np.empty(0)
w_vector=np.empty(0)

for w in range(-25000, 25000, 50):
    w_vector=np.append(w_vector,w)

    Dw = np.sum(
        diff_out*np.exp(-1j*w*t_vector)
    ) * t_step

    Dw_vector=np.append(Dw_vector,Dw)

plt.plot(w_vector,abs(Dw_vector))
plt.xlabel('Frequency [rad/sec]')
plt.grid()
\`\`\`

이 코드는 미분 신호 \`diff_out\`에 대해 각 $\\omega$에서
$$
D(\\omega)
\\approx
\\sum_k
\\frac{df}{dt}(t_k)e^{-j\\omega t_k}\\Delta t
$$
를 계산한다.`},
        {
          "id": "4-4E5",
          "title": "4.E5.",
          "type": "essay",
          "prompt": `문제 4.E4의 $\\left| D(\\omega) \\right|$의 그래프와 문제 4.C1의 $\\left| F(\\omega) \\right|$의 그래프의 관계가, 문제 4.E2의 답과 일치하는지 설명하시오. ($y$축의 절대적인 값보다는 스펙트럼의 전체적인 모양을 보고, 두 스펙트럼의 모양의 차이를 기반으로 설명할 것)`
        ,
          referenceAnswer: `실험 결과는
$$
|D(\\omega)|=|\\omega||F(\\omega)|
$$
의 관계와 일치한다.

원래 $|F(\\omega)|$에 비해 $|D(\\omega)|$에서는 원점 부근의 저주파 성분이 상대적으로 작아지고, 원점에서 멀어질수록 높은 주파수 성분이 상대적으로 강조된다.

따라서 절대적인 y축 크기보다 전체적인 형태를 보면 미분이 고주파 성분을 강조한다는 것을 확인할 수 있다.`},
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
        ,
          referenceAnswer: `문제 4.E4의 코드를 실행한 뒤

\`\`\`python
signal_play(diff_out, 8192)
\`\`\`

를 추가하여 미분 신호를 재생한다.

원 신호보다 고주파 성분이 강조되고 저음 성분이 상대적으로 약해진 소리로 들리는 것이 정상적인 관찰 결과이다.`},
        {
          "id": "4-4E7",
          "title": "4.E7.",
          "type": "essay",
          "prompt": `문제 4.D에서 들은 $f(t)$는 합창 소리 뒷 배경으로 미약한 저음의 베이스 기타 소리가 있음을 확인할 수 있었을 것이다. $f(t)$와 문제 4.E6에서 들은 $\\dfrac{df(t)}{dt}$의 베이스 기타 소리의 크기를 비교하고, 문제 4.E5의 결과와 관련지어 베이스 기타 소리 크기 비교 결과에 대한 이유를 쓰시오.`
        ,
          referenceAnswer: `$f(t)$에 비해 $df(t)/dt$에서는 저음의 베이스 기타 소리가 상대적으로 작게 들린다.

미분기의 주파수 응답 크기는
$$
|H(\\omega)|=|\\omega|
$$
이므로 낮은 주파수는 상대적으로 작게, 높은 주파수는 크게 강조된다. 베이스 기타는 저주파 성분의 비중이 크기 때문에 미분 후 상대적으로 약하게 들린다.`},
        {
          "id": "4-4E8",
          "title": "4.E8.",
          "type": "essay",
          "prompt": `지금까지 실험 결과를 바탕으로, 미분을 시스템(입출력 단자가 있는 사각 상자)라 생각하고 다음 물음에 답하시오.

(a) 입력이 $x(t)$일 때 출력(=입력의 미분 결과)과, 입력이 $ax(t)$일 때 출력을 각각 쓰고, 이것이 선형 시스템의 2가지 요건 중 어떤 것을 만족하는지(또는 만족하지 않는지)를 설명하시오.
(b) (a)과 유사한 방식으로, 나머지(두 번째) 선형 시스템의 요건을 만족하는지 따져 보시오.
(c) (a), (b)를 토대로, '미분기는 선형 시스템이다.'라고 말할 수 있는 이유를 설명하고, 문제 4.E5의 결과를 토대로 미분기가 고역 통과 필터(High Pass Filter, HPF)의 일종인 이유를 설명하시오.`
        ,
          
referenceAnswer: `(a) 미분 시스템의 입력이 $x(t)$일 때 출력은
$$
y(t)=\\frac{dx(t)}{dt}
$$
이다.

입력이 $ax(t)$로 바뀌면 출력은
$$
\\frac{d[ax(t)]}{dt}
=a\\frac{dx(t)}{dt}
=ay(t)
$$
이다.

따라서 입력에 상수 $a$를 곱하면 출력에도 동일한 상수가 곱해진다. 이는 선형 시스템의 첫 번째 조건인 **동차성(Homogeneity)**을 만족한다.

(b) 두 입력 $x_1(t)$, $x_2(t)$에 대한 출력을 각각
$$
y_1(t)=\\frac{dx_1(t)}{dt},
\\qquad
y_2(t)=\\frac{dx_2(t)}{dt}
$$
라고 하자.

두 입력을 더한 $x_1(t)+x_2(t)$를 미분 시스템에 입력하면
$$
\\begin{aligned}
y(t)
&=\\frac{d}{dt}[x_1(t)+x_2(t)]\\\\
&=\\frac{dx_1(t)}{dt}
+\\frac{dx_2(t)}{dt}\\\\
&=y_1(t)+y_2(t)
\\end{aligned}
$$
이다.

따라서 두 입력의 합에 대한 출력은 각 입력에 대한 출력의 합과 같다. 이는 선형 시스템의 두 번째 조건인 **가산성(Additivity)**을 만족한다.

(c) 미분 시스템은 (a)의 동차성과 (b)의 가산성을 모두 만족하므로 **선형 시스템**이다.

두 조건을 결합하면 임의의 상수 $a,b$와 신호 $x_1(t),x_2(t)$에 대하여
$$
\\boxed{
\\frac{d}{dt}[ax_1(t)+bx_2(t)]
=
a\\frac{dx_1(t)}{dt}
+
b\\frac{dx_2(t)}{dt}
}
$$
가 성립한다.

또한 푸리에 변환의 미분 성질에 의해
$$
Y(\\omega)=j\\omega X(\\omega)
$$
이므로 미분기의 주파수 전달함수는
$$
H(\\omega)=j\\omega
$$
이고, 그 크기는
$$
\\boxed{|H(\\omega)|=|\\omega|}
$$
이다.

문제 4.E5에서 확인한 것처럼 미분한 신호는 원래 신호보다 저주파 성분이 상대적으로 약해지고 고주파 성분이 강조된다.

즉, $\\omega=0$에서는 전달함수의 크기가 0이며, $|\\omega|$가 증가할수록 전달함수의 크기도 증가한다. 따라서 **미분기는 고역통과 특성을 갖는 시스템**이라고 할 수 있다.`},
      ],
    },
    { //문제 5
      "id": "4-5",
      "title": "5. Fourier Transform 응용: 반사파의 음향 효과",
      "problems": [
        { //문제 5.A
          "id": "4-5A",
          "title": "5.A.",
          "prompt": `실내에서 음악이나 음성이 재생될 때, 직접 전달되는 소리뿐만 아니라 벽이나 물체에서 반사되어 조금 늦게 도착하는 소리도 함께 들릴 수 있다.

원래 오디오 신호를 $x(t)$, 지연된 반사파가 함께 수신된 신호를 $y(t)$라 하면, [[equation:4.3]]과 같이 모델링할 수 있다.
$$
y(t)=x(t)+\\beta x(t-d)
\\qquad \\text{(식 4.3)}
$$
여기서 $\\beta$는 반사파의 상대적인 크기와 부호, $d$는 반사파가 직접파보다 늦게 도착하는 시간을 의미한다.

본 문제에서는 Python을 이용하여 반사파를 직접 생성하고, 실제 오디오를 들어 보면서 $\\beta$와 $d$가 음향 및 스펙트럼에 어떤 영향을 주는지 확인한다.`
        },
        {
          "id": "4-5A1",
          "title": "5.A1.",
          "type": "essay",
          "prompt": `[[equation:4.3]]의 반사파를 나타내는 $d$가 일반적인 상황에서 음수가 될 수 없는 이유를 설명하시오.`
        ,
          referenceAnswer: `$d$는 반사파가 직접파보다 추가 경로를 거쳐 늦게 도착하는 지연시간이다. 일반적인 반사 상황에서 반사파가 직접파보다 먼저 도착할 수 없으므로
$$
\\boxed{d\\ge0}
$$
이어야 한다.`},
        {
          "id": "4-5A2",
          "title": "5.A2.",
          "type": "python",
          starterCode: `from scipy.io import loadmat

file_load("ch4/song.mat"); mat = loadmat("song.mat"); data11025 = mat['data11025']
signal_play(data11025[1], 11025)`,
          "prompt": `아래는 이번 실습에 사용할 'ch4/song.mat'을 불러오는 py 스크립트이다.
\`\`\`python      
from scipy.io import loadmat

file_load("ch4/song.mat"); mat = loadmat("song.mat"); data11025 = mat['data11025']
signal_play(data11025[1], 11025)
\`\`\`
py 스크립트를 실행하고, 오디오를 재생하시오.
          `
        ,
          referenceAnswer: `코드를 정상적으로 실행하면 \`song.mat\`의 오디오가 11025 Hz의 샘플링 주파수로 재생된다. 제공된 신호는 보컬과 악기 반주가 포함된 음악 오디오 신호이다.`},
        {
          "id": "4-5A3",
          "title": "5.A3.",
          "type": "python",
          responseEnabled: true,
          starterCode: `from scipy.io import loadmat
file_load("ch4/song.mat"); mat = loadmat("song.mat"); data11025 = mat['data11025']

import numpy as np

x = data11025[1]
fs = 11025
beta = 0.3
d = 0.1

D = int(round(d * fs))

x_delay = np.zeros_like(x)

if D < len(x):
    x_delay[D:] = x[:-D]

y = x + beta*x_delay
signal_play(y, fs)`,
          "prompt": `연속시간의 $d$초 지연을 샘플 신호에서는 $D=\\mathrm{round}(df_s​)$개의 sample delay로 구현할 수 있다.
\`\`\`python          
from scipy.io import loadmat
file_load("ch4/song.mat"); mat = loadmat("song.mat"); data11025 = mat['data11025']

import numpy as np

x = data11025[1]
fs = 11025
beta = 0.3
d = 0.1

D = int(round(d * fs))

x_delay = np.zeros_like(x)

if D < len(x):
    x_delay[D:] = x[:-D]

y = x + beta*x_delay
signal_play(y, fs)          
\`\`\`
위 py 스크립트를 실행하여, 출력 $y(t)$를 들어보시오. 원 신호 $x(t)$와 반사파가 추가된 $y(t)$를 비교하여 들리는 차이를 쓰시오.
          `
        ,
          referenceAnswer: `$y(t)$에는 원 신호와 함께 $d$초 늦은 복사본이 $\\beta$배 되어 추가된다.

$\\beta=0.3$, $d=0.1$ s에서는 원 신호에 약 0.1초 늦은 반사음이 더해져 메아리 또는 잔향처럼 들릴 수 있다. 실제 체감 정도는 재생 장치와 청취 환경에 따라 달라질 수 있다.`},
        {
          "id": "4-5A4",
          "title": "5.A4.",
          "type": "python",
          responseEnabled: true,
          starterCode: `from scipy.io import loadmat
file_load("ch4/song.mat"); mat = loadmat("song.mat"); data11025 = mat['data11025']

import numpy as np

x = data11025[1]
fs = 11025
beta = 0.3
d = 0.1

D = int(round(d * fs))

x_delay = np.zeros_like(x)

if D < len(x):
    x_delay[D:] = x[:-D]

y = x + beta*x_delay
signal_play(y, fs)

import matplotlib.pyplot as plt

t = np.arange(len(x)) / fs

plt.figure()

plt.plot(t, x, label="x(t)")
plt.plot(t, y, label="y(t)")

plt.xlim(0, 0.5)
plt.xlabel("Time (s)")
plt.ylabel("Amplitude")
plt.legend()
plt.grid()`,
          "prompt": `문제 5.A3의 py 스크립트에 아래를 추가하여, 원 신호와 반사파가 포함된 신호의 일부분을 그려보자.
\`\`\`python          
#문제 5.A3의 py 스크립트에 아래를 추가.
import matplotlib.pyplot as plt

t = np.arange(len(x)) / fs

plt.figure()

plt.plot(t, x, label="x(t)")
plt.plot(t, y, label="y(t)")

plt.xlim(0, 0.5)
plt.xlabel("Time (s)")
plt.ylabel("Amplitude")
plt.legend()
plt.grid()         
\`\`\`
$y(t)$에는 $x(t)$에 없던 어떤 특징이 추가되었는지 쓰시오.
          `
        ,
          referenceAnswer: `시간영역에서 $y(t)$는 단순히 $x(t)$와 같지 않고
$$
y(t)=x(t)+0.3x(t-0.1)
$$
이므로 원 파형 위에 0.1초 지연된 파형이 겹쳐진 형태이다.

따라서 일부 구간에서 진폭이 커지거나 작아지고, 원 신호에는 없던 지연 성분의 흔적이 나타난다.`},
        { //문제 5.B
          "id": "4-5B",
          "title": "5.B.",
          "prompt": `오디오 신호를 청취하는 주변 환경(실내 구조)에 따라 [[equation:4.3]]의 $\\beta$와 $d$는 바뀌게 된다.`
        },
        {
          "id": "4-5B1",
          "title": "5.B1.",
          "type": "python",
          responseEnabled: true,
          starterCode: `from scipy.io import loadmat
file_load("ch4/song.mat"); mat = loadmat("song.mat"); data11025 = mat['data11025']

import numpy as np

x = data11025[1]
fs = 11025
beta = ?
d = ?

D = int(round(d * fs))

x_delay = np.zeros_like(x)

if D < len(x):
    x_delay[D:] = x[:-D]

y = x + beta*x_delay
signal_play(y, fs)`,
          "prompt": `아래 py 스크립트를 사용하여, $\\beta$와 $d$를 서로 다른 값으로 설정하여 최소 두 번 실험한다.
\`\`\`python
from scipy.io import loadmat
file_load("ch4/song.mat"); mat = loadmat("song.mat"); data11025 = mat['data11025']

import numpy as np

x = data11025[1]
fs = 11025
beta = ?
d = ?

D = int(round(d * fs))

x_delay = np.zeros_like(x)

if D < len(x):
    x_delay[D:] = x[:-D]

y = x + beta*x_delay
signal_play(y, fs)  
\`\`\` 
단, $d$에는 자신의 학번 끝 2자리를 반영한다. 예를 들어, 학번 끝 2자리가 43이고 약 $0.02$초의 지연을 실험하려면 'd = 0.02043'처럼 설정할 수 있다.

각 실험에 대하여 다음을 기록하시오.
\`\`\`
실험 1
β =
d =
어떻게 들렸는가 =

실험 2
β =
d =
어떻게 들렸는가 =
\`\`\`
`
        ,
          referenceAnswer: `설정값에 따라 청취 결과가 달라지는 실험 문항이므로 하나의 고정 정답은 없다.

예시:
\`\`\`text
실험 1
β = 0.5
d = 0.02043
→ 원 신호와 비슷하지만 약한 잔향이 추가되어 들림

실험 2
β = -1
d = 0.00343
→ 일부 주파수 성분이 상쇄되어 특정 음이 상대적으로 약해져 들림
\`\`\`

핵심은 본인이 사용한 $\\beta,d$를 정확히 기록하고 청취 차이를 구체적으로 설명하는 것이다.`},
        {
          "id": "4-5B2",
          "title": "5.B2.",
          "type": "python",
          responseEnabled: true,
          starterCode: `from scipy.io import loadmat
file_load("ch4/song.mat"); mat = loadmat("song.mat"); data11025 = mat['data11025']

import numpy as np

x = data11025[1]
fs = 11025
beta = ?
d = ?

D = int(round(d * fs))

x_delay = np.zeros_like(x)

if D < len(x):
    x_delay[D:] = x[:-D]

y = x + beta*x_delay
signal_play(y, fs)`,
          "prompt": `$\\beta$의 부호와 크기, $d$의 크기를 다양하게 바꾸어 출력 신호를 들어보시오.

특히 다음 경우를 포함하여 비교해 보시오.
$\\beta>0$          
$\\beta<0$
$d\\text{가 작은 경우}$
$d\\text{가 큰 경우}$

어떤 경우에는 단순한 메아리처럼 들리고, 어떤 경우에는 특정 음역이 약해지는 현상이 나타날 수 있다. 관찰한 현상을 설명하시오.`
        ,
          referenceAnswer: `일반적으로

- $\\beta>0$: 직접파와 반사파가 같은 부호로 더해져 일부 주파수에서는 강화된다.
- $\\beta<0$: 반사파가 반대 부호로 더해져 일부 주파수에서 상쇄가 일어날 수 있다.
- $d$가 작음: 독립적인 메아리보다는 음색 변화나 주파수 선택적 상쇄로 느껴지기 쉽다.
- $d$가 큼: 직접파와 반사파의 시간 차이가 커져 메아리처럼 들리기 쉽다.

실제 청취 결과는 선택한 값과 오디오 신호에 따라 달라질 수 있다.`},
        {
          "id": "4-5B3",
          "title": "5.B3.",
          "type": "essay",
          "prompt": `반사파를 원 신호에 더했을 때 특정 음은 약해지고 다른 음은 거의 그대로 남을 수 있다고 생각하는가?

아직 수식을 사용하지 말고 자신의 직관만으로 답하시오. 가능하다고 생각한다면 왜 그럴 것 같은지 설명하시오. 불가능하다고 생각한다면 그 이유를 설명하시오.`
        ,
          referenceAnswer: `가능하다.

원 신호와 지연된 반사파는 주파수에 따라 서로 같은 방향으로 더해질 수도 있고 반대 방향으로 겹쳐 상쇄될 수도 있다. 따라서 어떤 음의 주파수 성분은 크게 줄어드는 반면, 다른 주파수 성분은 남을 수 있다.

즉 보컬의 특정 음과 관련된 성분이 상쇄되는 반면 악기의 다른 주파수 성분이 남는 상황이 가능하다고 예상할 수 있다.`},
        { //문제 5.C
          "id": "4-5C",
          "title": "5.C.",
          "prompt": `이제 $\\beta=-1, d=\\dfrac{1}{293.6}$과 같이 설정한다.
\`\`\`python
from scipy.io import loadmat
file_load("ch4/song.mat"); mat = loadmat("song.mat"); data11025 = mat['data11025']

import numpy as np

x = data11025[1]
fs = 11025
beta = -1
d = 1 / 293.6

D = int(round(d * fs))

x_delay = np.zeros_like(x)

if D < len(x):
    x_delay[D:] = x[:-D]

y = x + beta*x_delay
signal_play(y, fs)  
\`\`\``
        },
        {
          "id": "4-5C1",
          "title": "5.C1.",
          "type": "python",
          responseEnabled: true,
          starterCode: `from scipy.io import loadmat
file_load("ch4/song.mat"); mat = loadmat("song.mat"); data11025 = mat['data11025']

import numpy as np

x = data11025[1]
fs = 11025
beta = -1
d = 1 / 293.6

D = int(round(d * fs))

x_delay = np.zeros_like(x)

if D < len(x):
    x_delay[D:] = x[:-D]

y = x + beta*x_delay
signal_play(y, fs) `,
          "prompt": `출력 신호를 생성하고 들어보시오. 원 신호와 번갈아 들어보시오.
[[table:
음절 번호 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24
가사 | Yes- | terday | all | my | trou- | bles | seemed | so | far | away | Now it | looks | as | though | they're | here | to stay | Oh | I | be- | lieve | in | Yes- | terday
]]
원 신호와 비교했을 때 위 가사 중 어떤 음절에서 소리가 들리지 않거나 소리가 작아졌는지 번호를 모두 고르시오.`
        ,
          referenceAnswer: `제공된 원본 실험의 기준 결과에서는
$$
\\boxed{6,\\ 9,\\ 10,\\ 11}
$$
번 음절이 특히 작게 들리거나 잘 들리지 않는 것으로 관찰되었다.

청취 장치와 지연의 샘플 단위 반올림 때문에 체감에는 약간의 차이가 있을 수 있다.`},
        {
          "id": "4-5C2",
          "title": "5.C2.",
          "type": "essay",
          "prompt": `문제 5.C1에서 특정 보컬 음이 약해지는 순간을 다시 들어보시오. 해당 순간에 배경 악기 소리도 완전히 같이 사라지는지 쓰시오.`
        ,
          referenceAnswer: `특정 보컬 음이 작아지는 순간에도 배경 악기 소리가 완전히 같이 사라지지는 않는다.

이는 시스템이 전체 신호를 제거하는 것이 아니라 특정 주파수 성분을 선택적으로 크게 감쇠시키기 때문이다. 악기의 다른 주파수 성분은 여전히 출력에 남는다.`},
          {
          "id": "4-5C3",
          "title": "5.C3.",
          "type": "essay",
          "prompt": `문제 5.B3에서 작성한 자신의 직관과 문제 5.C2에서 확인한 결과가 일치하는지 쓰시오.`,
          
referenceAnswer: `문제 5.B3에서 예상한 내용과 문제 5.C2에서 관찰한 결과를 비교한다.

**(1) 예상과 일치한 경우**

반사파가 추가되면 일부 주파수 성분은 상쇄되고 다른 주파수 성분은 남을 수 있다고 예상하였다.

실제로 문제 5.C2에서 특정 보컬 음이 약해지는 순간에도 배경 악기 소리는 완전히 사라지지 않았다.

따라서 반사파에 의해 특정 주파수 성분이 선택적으로 감쇠될 수 있다는 예상과 실제 청취 결과가 일치한다.

**(2) 예상과 일치하지 않은 경우**

처음에는 반사파가 추가되면 모든 소리가 비슷한 정도로 작아지거나 커질 것으로 예상하였다.

그러나 실제로는 특정 보컬 음이 약해지는 순간에도 배경 악기 소리는 남아 있었다.

따라서 처음 예상과 실제 청취 결과는 일치하지 않았으며, 반사파가 주파수에 따라 서로 다른 영향을 미칠 수 있음을 확인하였다.

본 문항은 학생이 문제 5.B3에서 작성한 자신의 예상과 실제 실험 결과를 비교하는 문제이므로, 일치 여부 자체보다는 관찰 결과를 근거로 일관성 있게 설명했는지를 중심으로 평가한다.`},
        { //문제 5.D
          "id": "4-5D",
          "title": "5.D.",
          "prompt": `이제 문제 5.C에서 관찰한 현상을 Fourier Transform으로 설명한다.`
        },
        {
          "id": "4-5D1",
          "title": "5.D1.",
          "type": "proof",
          "prompt": `입출력 관계 [[equation:4.3]]의 양변에 푸리에 변환을 취하고, $\\mathcal{F}[x(t-d)]=X(\\omega)e^{-j\\omega d}$를 이용하여 $H(\\omega)\\left(=\\dfrac{Y(\\omega)}{X(\\omega)}\\right)$를 구하시오. 다음 [[equation:4.4]]가 나오는 과정을 보이시오.
$$
H(\\omega)=1+\\beta e^{-j\\omega d}
\\qquad \\text{(식 4.4)}
$$`
        ,
          referenceAnswer: `식 (4.3)
$$
y(t)=x(t)+\\beta x(t-d)
$$
의 양변을 푸리에 변환하면
$$
Y(\\omega)
=
X(\\omega)
+
\\beta X(\\omega)e^{-j\\omega d}.
$$

따라서
$$
Y(\\omega)
=
X(\\omega)
\\left[
1+\\beta e^{-j\\omega d}
\\right].
$$

그러므로
$$
\\boxed{
H(\\omega)
=
\\frac{Y(\\omega)}{X(\\omega)}
=
1+\\beta e^{-j\\omega d}
}
$$
이다.`},
        {
          "id": "4-5D2",
          "title": "5.D2.",
          "type": "proof",
          "prompt": `오일러 공식을 이용하여 [[equation:4.4]]의 절댓값이 [[equation:4.5]]가 됨을 보이시오.   
$$
\\left|H(\\omega)\\right|=\\sqrt{(1+\\beta^2)+2\\beta\\cos(\\omega d)}
\\qquad \\text{(식 4.5)}
$$`
        ,
          referenceAnswer: `공액복소수를 이용하면
$$
|H(\\omega)|^2
=
\\left(1+\\beta e^{-j\\omega d}\\right)
\\left(1+\\beta e^{j\\omega d}\\right).
$$

전개하면
$$
|H(\\omega)|^2
=
1+\\beta^2
+
\\beta\\left(e^{j\\omega d}+e^{-j\\omega d}\\right).
$$

오일러 공식에서
$$
e^{jx}+e^{-jx}=2\\cos x
$$
이므로
$$
|H(\\omega)|^2
=
1+\\beta^2+2\\beta\\cos(\\omega d).
$$

따라서
$$
\\boxed{
|H(\\omega)|
=
\\sqrt{1+\\beta^2+2\\beta\\cos(\\omega d)}
}
$$
이다.`},
        {
          "id": "4-5D3",
          "title": "5.D3.",
          "type": "proof",
          "prompt": `문제 5.C와 같이 $\\beta=-1$이면, $H(\\omega)=1-e^{-j\\omega d}$이다. $\\left|H(\\omega)\\right|=0$이 되는 조건을 구하시오.`
        ,
          referenceAnswer: `$\\beta=-1$이면
$$
H(\\omega)=1-e^{-j\\omega d}.
$$

$|H(\\omega)|=0$이 되려면
$$
e^{-j\\omega d}=1
$$
이어야 하므로
$$
\\omega d=2\\pi k,\\qquad k\\in\\mathbb{Z}.
$$

따라서
$$
\\boxed{
f=\\frac{\\omega}{2\\pi}=\\frac{k}{d}
}
$$
이다.

$d=1/293.6$ s이면
$$
\\boxed{
f=k(293.6)\\ \\mathrm{Hz}
}
$$
이므로 양의 주파수에서
$$
293.6,\\ 587.2,\\ 880.8,\\ 1174.4,\\ldots\\ \\mathrm{Hz}
$$
에서 null이 나타난다. $f=0$도 수학적으로 null이다.`},
        {
          "id": "4-5D4",
          "title": "5.D4.",
          "type": "essay",
          "prompt": `문제 5.C에서 특정 보컬 음이 작아진 이유를 [[equation:4.4]], [[equation:4.5]]를 이용하여 설명하시오.`
        ,
          referenceAnswer: `주파수 영역에서
$$
Y(\\omega)=H(\\omega)X(\\omega)
$$
이다.

따라서 $|H(\\omega)|=0$인 주파수에서는 입력에 그 성분이 존재하더라도 출력은
$$
Y(\\omega)=0
$$
이 된다.

문제 5.C의 설정에서는 293.6 Hz와 그 정수배 부근이 강하게 감쇠된다. 보컬의 특정 음이 이러한 주파수 성분을 포함하면 그 음이 작게 들릴 수 있다. 반면 다른 주파수 성분의 악기 소리는 남을 수 있으므로 배경음 전체가 동시에 사라지는 것은 아니다.`},
        { //문제 5.E
          "id": "4-5E",
          "title": "5.E.",
          "prompt": `본 문제에서는 원 신호 $x(t)$와 출력 신호 $y(t)$의 Power Spectral Density(PSD)를 비교하여, 문제 5.D에서 구한 시스템의 주파수 전달함수의 특성이 실제 오디오 스펙트럼에 어떻게 나타나는지 확인해보자.`
        },
        {
          "id": "4-5E1",
          "title": "5.E1.",
          "type": "python",
          responseEnabled: true,
          starterCode: `from scipy.io import loadmat
file_load("ch4/song.mat"); mat = loadmat("song.mat"); data11025 = mat['data11025']

import numpy as np

x = data11025[1]
fs = 11025
beta = -1
d = 1 / 293.6

D = int(round(d * fs))

x_delay = np.zeros_like(x)

if D < len(x):
    x_delay[D:] = x[:-D]

y = x + beta*x_delay
signal_play(y, fs) 

import matplotlib.pyplot as plt

def welch_pyodide(x, fs, nperseg=4096, noverlap=2048, nfft=8192):
    x = np.asarray(x, dtype=float).squeeze()

    if x.ndim != 1:
        raise ValueError("입력 신호는 1차원이어야 합니다.")

    window = np.hamming(nperseg)
    window_power = np.sum(window**2)
    step = nperseg - noverlap
    Pxx_sum = np.zeros(nfft//2 + 1, dtype=float)
    count = 0

    for start in range(0, len(x) - nperseg + 1, step):
        frame = x[start:start+nperseg]
        X = np.fft.rfft(frame * window,  n=nfft)
        Pxx = (np.abs(X)**2 / (fs * window_power))

        # one-sided PSD 보정
        if nfft % 2 == 0:
            Pxx[1:-1] *= 2
        else:
            Pxx[1:] *= 2

        Pxx_sum += Pxx
        count += 1

    if count == 0:
        raise ValueError("신호가 nperseg보다 짧습니다.")

    Pxx_avg = Pxx_sum / count
    f = np.fft.rfftfreq(nfft, d=1/fs)

    return f, Pxx_avg

f_x, Pxx = welch_pyodide(x, fs)
f_y, Pyy = welch_pyodide(y, fs)
Pxx_dB = 10*np.log10(np.maximum(Pxx, 1e-20))
Pyy_dB = 10*np.log10(np.maximum(Pyy, 1e-20))

plt.figure(figsize=(8, 5))
plt.plot(f_x/1000, Pxx_dB)

plt.plot(f_y/1000, Pyy_dB, "r")
plt.xlim(0, 1)
plt.ylim(-100, -20)
plt.xlabel("Frequency (kHz)")
plt.ylabel("Power/frequency (dB/Hz)")
plt.title("Welch Power Spectral Density Estimate")

plt.grid()
plt.tight_layout()`,
          "prompt": `py 스크립트를 실행하여 결과를 확인한 후, 다음에 답하시오.
(a) $x(t)$와 $y(t)$의 스펙트럼에 해당하는 그래프의 색깔을 쓰시오.
(b) $x(t)$와 $y(t)$의 스펙트럼은 전체적으로 비슷한가?
(c) 두 그래프의 차이가 특히 크게 나타나는 주파수 구간이 있는가?
(d) $y(t)$의 스펙트럼에서 특정 주파수 성분이 매우 작아지는 부분을 관찰하여 쓰시오.
          `
        ,
          referenceAnswer: `(a) 코드에서 먼저 그린 $x(t)$의 PSD는 파란색, \`"r"\`로 지정한 $y(t)$의 PSD는 빨간색이다.

(b) 두 스펙트럼의 전체적인 분포는 비슷하지만 특정 주파수에서는 큰 차이가 나타난다.

(c), (d) 특히 약
$$
0.294,\\ 0.587,\\ 0.881\\ \\mathrm{kHz}
$$
부근에서 빨간색 $y(t)$의 PSD가 깊게 감소한다.

이는 원본 MATLAB 실험에서 약 290 Hz, 580 Hz, 870 Hz 부근에 나타났던 notch와 같은 현상이다.`},
        {
          "id": "4-5E2",
          "title": "5.E2.",
          "type": "essay",
          "prompt": `문제 5.E1 (c)에서 답한 것과 문제 5.D3에서 구한 $\\left|H(\\omega)\\right|=0$의 결과와 일치하는지 설명하시오.`
        ,
          referenceAnswer: `문제 5.D3에서 이론적으로 null은
$$
f=k(293.6)\\ \\mathrm{Hz}
$$
에 나타난다.

따라서
$$
293.6,\\ 587.2,\\ 880.8\\ \\mathrm{Hz}
$$
부근에서 출력 PSD가 작아져야 한다.

문제 5.E1에서 관찰되는 약 0.294, 0.587, 0.881 kHz 부근의 깊은 감소와 일치하므로 이론과 실험 결과가 부합한다.`},
        {
          "id": "4-5E3",
          "title": "5.E3.",
          "type": "essay",
          "prompt": `선형 시스템의 입력과 출력은 주파수 영역에서 $Y(\\omega)=H(\\omega)X(\\omega)$의 관계를 갖는다. 따라서 크기만 보면 $\\left|Y(\\omega)\\right|=\\left|H(\\omega)\\right|\\left|X(\\omega)\\right|$이다.
          
(a) $\\left|H(\\omega)\\right|=0$인 주파수에서 $Y(\\omega)$는 어떻게 되는가?
(b) $X(\\omega)$에 해당 주파수 성분이 존재하더라도 $Y(\\omega)$에서 매우 작게 나타나는 이유를 설명하시오.
(c) 이것이 문제 5.C에서 특정 보컬 음이 약하게 들렸던 현상과 어떤 관계가 있는지 설명하시오.`
        ,
          referenceAnswer: `(a) $|H(\\omega)|=0$이면
$$
|Y(\\omega)|
=
|H(\\omega)||X(\\omega)|=0
$$
이므로 해당 출력 주파수 성분은 제거된다.

(b) 입력 $X(\\omega)$에 해당 성분이 존재하더라도 시스템의 전달함수 크기가 0이면 출력에서 그 성분은 통과하지 못한다.

(c) 특정 보컬 음의 기본주파수 또는 주요 고조파가 시스템의 null과 겹치면 그 음의 에너지가 크게 줄어들어 작게 들리게 된다.`},
        {
          "id": "4-5E4",
          "title": "5.E4.",
          "type": "python",
          responseEnabled: true,
          starterCode: `from scipy.io import loadmat
file_load("ch4/song.mat"); mat = loadmat("song.mat"); data11025 = mat['data11025']

import numpy as np

x = data11025[1]
fs = 11025
beta = -1
d = 1 / 293.6

D = int(round(d * fs))

x_delay = np.zeros_like(x)

if D < len(x):
    x_delay[D:] = x[:-D]

y = x + beta*x_delay
          
def reflected_system(x, beta, d, fs):
    D = int(round(d * fs))

    x_delay = np.zeros_like(x)

    if D < len(x):
        x_delay[D:] = x[:-D]

    return x + beta*x_delay

y1 = reflected_system(x, beta, d, fs)
y2 = reflected_system(y1, beta, d, fs)
y3 = reflected_system(y2, beta, d, fs)`,
          "prompt": `동일한 시스템을 여러 번 통과시키자.

먼저 시스템을 함수로 아래와 같이 만들 수 있다.
\`\`\`python
def reflected_system(x, beta, d, fs):
    D = int(round(d * fs))

    x_delay = np.zeros_like(x)

    if D < len(x):
        x_delay[D:] = x[:-D]

    return x + beta*x_delay
\`\`\`
한 번 통과한 신호는
\`\`\`python
y1 = reflected_system(x, beta, d, fs)
\`\`\`
두 번 통과한 신호는
\`\`\`python
y2 = reflected_system(y1, beta, d, fs)
\`\`\`
세 번 통과한 신호는
\`\`\`python
y3 = reflected_system(y2, beta, d, fs)
\`\`\`
로 표현할 수 있다. 이후, 'signal_play(?, fs)'를 통해 각 신호를 들어본다.

동일한 시스템을 여러 번 통과할수록 문제 5.C에서 작게 들렸던 특정 음은 어떻게 변하는지 쓰시오.`
        ,
          referenceAnswer: `한 번, 두 번, 세 번 통과시킬수록 null 부근의 특정 음은 더 약하게 들린다.

예를 들어
\`\`\`python
signal_play(y1, fs)
signal_play(y2, fs)
signal_play(y3, fs)
\`\`\`
를 순서대로 비교하면 5.C에서 작아졌던 보컬 성분의 감쇠가 반복 통과에 따라 더 뚜렷해진다.

실제 체감 정도는 오디오 재생 환경에 따라 다를 수 있다.`},
        {
          "id": "4-5E5",
          "title": "5.E5.",
          "type": "essay",
          "prompt": `한 번 통과할 때 $Y_1(\\omega)=H(\\omega)X(\\omega)$, 두 번 통과하면 $Y_2(\\omega)=H^2(\\omega)X(\\omega)$, 세 번 통과하면 $Y_3(\\omega)=H^3(\\omega)X(\\omega)$이다. 따라서, 일반적으로 $M$회 통과하면 $Y_M(\\omega)=H^M(\\omega)X(\\omega)$가 된다.
          
$\\left|H(\\omega)\\right|<1$인 주파수 성분이 시스템을 여러 번 통과할수록 더 작아지는 이유를 설명하시오.`
        ,
          referenceAnswer: `$M$회 통과한 출력은
$$
Y_M(\\omega)=H^M(\\omega)X(\\omega)
$$
이므로 크기는
$$
|Y_M(\\omega)|
=
|H(\\omega)|^M|X(\\omega)|
$$
이다.

$0<|H(\\omega)|<1$이면 $M$이 증가할수록
$$
|H(\\omega)|^M
$$
은 0에 가까워진다. 따라서 해당 주파수 성분은 시스템을 반복 통과할수록 점점 더 작아진다.`},
        { //문제 5.F
          "id": "4-5F",
          "title": "5.F.",
          "prompt": `자신의 학번 뒤 2자리 수를 24로 나눈 나머지를 $X$라 하자. 문제 5.C1에 제공된 음절-음정 대응표에서 $(X+1)$번째 음절의 기본 주파수를 $f_c$라 하자. (단, 해당 음이 이미 실험한 $293.6$ Hz라면 다른 음을 선택한다.)
[[image:/images/ch4/악보.png]]
[[table:
계이름 | 레 | 파 | 솔 | 라 | 시♭ | 시 | 높은 도 | 높은 도# | 높은 레 | 높은 미 | 높은 파
주파수[Hz] | 146.8 | 174.6 | 196 | 220 | 233 | 246 | 261.6 | 277.2 | 293.6 | 329.6 | 349.2
]]`
        },
        {
          "id": "4-5F1",
          "title": "5.F1.",
          "type": "essay",
          "prompt": `목표 주파수 $f_c$에서 $\\left|H(2\\pi f_c)\\right|=0$이 되도록 $\\beta, d$를 구하시오.`
        ,
          referenceAnswer: `목표 주파수 $f_c$에서 완전한 상쇄를 만들기 위한 가장 간단한 설정은
$$
\\boxed{\\beta=-1}
$$
이다.

이때
$$
H(2\\pi f_c)
=
1-e^{-j2\\pi f_cd}
$$
이므로
$$
2\\pi f_cd=2\\pi k
$$
를 만족해야 한다.

가장 작은 양의 지연을 선택하면 $k=1$에서
$$
\\boxed{
d=\\frac1{f_c}
}
$$
이다.

따라서 학생이 선택한 음의 주파수 $f_c$에 대해
$$
\\boxed{\\beta=-1,\\qquad d=1/f_c}
$$
로 설정하면 된다.`},
        {
          "id": "4-5F2",
          "title": "5.F2.",
          "type": "python",
          responseEnabled: true,
          starterCode: `from scipy.io import loadmat
file_load("ch4/song.mat"); mat = loadmat("song.mat"); data11025 = mat['data11025']

import numpy as np

x = data11025[1]
fs = 11025
beta = ?
fc = ?
d = 1 / fc

D = int(round(d * fs))

x_delay = np.zeros_like(x)

if D < len(x):
    x_delay[D:] = x[:-D]

y_target = x + beta*x_delay
signal_play(y_target, fs)`,
          "prompt": `아래 py 스크립트를 사용하여, 계산한 $\\beta$와 $d$를 적용하여 실험하시오.
\`\`\`python
from scipy.io import loadmat
file_load("ch4/song.mat"); mat = loadmat("song.mat"); data11025 = mat['data11025']

import numpy as np

x = data11025[1]
fs = 11025
beta = ?
fc = ?
d = 1 / fc

D = int(round(d * fs))

x_delay = np.zeros_like(x)

if D < len(x):
    x_delay[D:] = x[:-D]

y_target = x + beta*x_delay
signal_play(y_target, fs)
\`\`\` 
목표로 한 음절 또는 음의 크기가 실제로 감소했는가?
`
        ,
          referenceAnswer: `학생이 선택한 목표 주파수 $f_c$에 따라 값이 달라진다.

예시:
\`\`\`python
beta = -1
fc = 174.6   # 예: '파'
d = 1/fc
\`\`\`

실행 후 목표 음절 또는 해당 음의 성분이 원 신호에 비해 감소하는 것이 정상적인 결과이다. 완전한 소거 정도는 샘플 단위 지연의 반올림, 보컬의 실제 주파수 변화, 주변 고조파 때문에 달라질 수 있다.`},
        {
          "id": "4-5F3",
          "title": "5.F3.",
          "type": "python",
          responseEnabled: true,
          starterCode: `from scipy.io import loadmat
file_load("ch4/song.mat"); mat = loadmat("song.mat"); data11025 = mat['data11025']

import numpy as np

x = data11025[1]
fs = 11025
beta = ?
fc = ?
d = 1 / fc

D = int(round(d * fs))

x_delay = np.zeros_like(x)

if D < len(x):
    x_delay[D:] = x[:-D]

y_target = x + beta*x_delay

import matplotlib.pyplot as plt

def welch_pyodide(x, fs, nperseg=4096, noverlap=2048, nfft=8192):
    x = np.asarray(x, dtype=float).squeeze()

    if x.ndim != 1:
        raise ValueError("입력 신호는 1차원이어야 합니다.")

    window = np.hamming(nperseg)
    window_power = np.sum(window**2)
    step = nperseg - noverlap
    Pxx_sum = np.zeros(nfft//2 + 1, dtype=float)
    count = 0

    for start in range(0, len(x) - nperseg + 1, step):
        frame = x[start:start+nperseg]
        X = np.fft.rfft(frame * window,  n=nfft)
        Pxx = (np.abs(X)**2 / (fs * window_power))

        # one-sided PSD 보정
        if nfft % 2 == 0:
            Pxx[1:-1] *= 2
        else:
            Pxx[1:] *= 2

        Pxx_sum += Pxx
        count += 1

    if count == 0:
        raise ValueError("신호가 nperseg보다 짧습니다.")

    Pxx_avg = Pxx_sum / count
    f = np.fft.rfftfreq(nfft, d=1/fs)

    return f, Pxx_avg

f_x, Pxx = welch_pyodide(x, fs)
f_y, Pyy = welch_pyodide(y_target, fs)
Pxx_dB = 10*np.log10(np.maximum(Pxx, 1e-20))
Pyy_dB = 10*np.log10(np.maximum(Pyy, 1e-20))

plt.figure(figsize=(8, 5))
plt.plot(f_x/1000, Pxx_dB)

plt.plot(f_y/1000, Pyy_dB, "r")
plt.xlim(0, 1)
plt.ylim(-100, -20)
plt.xlabel("Frequency (kHz)")
plt.ylabel("Power/frequency (dB/Hz)")
plt.title("Welch Power Spectral Density Estimate")

plt.grid()
plt.tight_layout()`,
          "prompt": `문제 5.E2에 설정한 $\\beta$와 $d$를 다시 py 스크립트에 채워넣고, 실행하여 목표 주파수 $f_c$ 부근이 실제로 감쇠되었는지 확인하시오. 청취 결과와 스펙트럼 결과가 서로 일치하는지 설명하시오.`
        ,
          referenceAnswer: `스펙트럼에서 목표 주파수 $f_c$ 및 그 조건에 의해 생기는 null 부근에서 빨간색 출력 PSD가 원 신호 PSD보다 크게 감소해야 한다.

따라서 청취에서 목표 음이 감소한 현상과 PSD에서 해당 주파수 성분이 감소한 현상이 서로 일치하면 설계가 제대로 동작한 것이다.`},
        {
          "id": "4-5F4",
          "title": "5.F4.",
          "type": "python",
          responseEnabled: true,
          "prompt": `문제 5.E4의 py 스크립트를 참고하여, 여러 번 통과시킨 결과를 비교하시오. 한 번 통과시킨 경우와 여러 번 통과시킨 경우 목표 음의 감소 정도를 비교하시오.`
        ,
          referenceAnswer: `동일한 시스템을 반복 통과시키면 목표 주파수 부근의 감쇠가 더 커진다.

한 번 통과한 경우보다 두 번, 세 번 통과한 경우에 목표 음이 더 작게 들리는 것이 정상적인 결과이다. 주파수 영역에서는
$$
Y_M(\\omega)=H^M(\\omega)X(\\omega)
$$
이므로 $|H(\\omega)|<1$인 성분이 반복 통과에 따라 계속 감소하기 때문이다.`},
      ]
    }
  ]
} as const;
