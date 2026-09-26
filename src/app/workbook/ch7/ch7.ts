import type { WorkbookChapter } from '@/types/workbook';

export const chapter = {
  "id": "7-sampling-reconstruction",
  "title": "Chapter 7. Sampling and Signal Reconstruction",
  "sections": [
    { //문제 1
      "id": "7-1",
      "title": "1. Python을 이용한 LPF 설계 및 주파수 응답 분석",
      "problems": [
        { //문제 1.A
          "id": "7-1A",
          "title": "1.A.",
          "prompt": `Python의 scipy.signal 라이브러리를 이용하여 [그림 7.1]과 같이 Sine Wave 발생기와 Analog Filter Design 블록으로 구성된 시스템을 구현하자.
[[image:/images/ch7/figure7_1.png|그림 7.1 LPF 테스트 시스템|50]]
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt
from scipy import signal

# 시뮬레이션 설정
T = 0.05
tstep = 1 / 30000
t = np.arange(0, T + tstep / 2, tstep)

# 입력 신호
f = 900
x = np.sin(2 * np.pi * f * t)

# Chebyshev Type Ⅱ LPF 설계
sos = signal.cheby2(
    N=32,
    rs=40,
    Wn=2 * np.pi * 1000,
    btype="lowpass",
    analog=True,
    output="sos"
)

# 출력 신호 계산
y = x.copy()

for section in sos:
    b = section[:3]
    a = section[3:]
    _, y, _ = signal.lsim((b, a), U=y, T=t)

# 입출력 신호 관찰
plt.figure(figsize=(10, 5))
plt.plot(t, x, label="Input")
plt.plot(t, y, label="LPF Output")
plt.xlabel("Time (s)")
plt.ylabel("Amplitude")
plt.legend()
plt.grid(True)
plt.tight_layout()
plt.show()
\`\`\`          
위 py 스크립트에서 정현파와 LPF의 설정값은 다음과 같다.
[[table:
항목 | 설정값
Sampling interval |	1/30000 s
Filter design	| Chebyshev Type II
Filter type	| Lowpass
Filter order | 32
Stopband edge frequency |	2*np.pi*1000 rad/s
Stopband attenuation | 40 dB
]]
입력 주파수 f를 변경하면 해당 주파수의 정현파가 생성되며, LPF를 통과한 출력 신호를 입력 신호와 함께 그래프로 확인할 수 있다.`,
        },
        {
          "id": "7-1A1",
          "title": "1.A1.",
          "type": "essay",
          "prompt": `위와 같이 설계한 LPF의 저지대역 경계 주파수는 얼마인가? Hz 단위로 답하시오.`,
          
referenceAnswer: `설계한 LPF의 저지대역 경계 주파수는 다음과 같다.

$$
\\begin{aligned}
\\omega_s &= 2\\pi \\times 1000 \\text{ rad/s} \\\\
f_s &= \\frac{\\omega_s}{2\\pi} \\\\
&= \\frac{2\\pi \\times 1000}{2\\pi} \\\\
&= 1000 \\text{ Hz}
\\end{aligned}
$$

따라서 LPF의 저지대역 경계 주파수는 **1000 Hz(1 kHz)**이다.`

        },
        {
          "id": "7-1A2",
          "title": "1.A2.",
          "type": "python",
          responseEnabled: true,
          starterCode: `import numpy as np
import matplotlib.pyplot as plt
from scipy import signal

# 시뮬레이션 설정
T = 0.05
tstep = 1 / 30000
t = np.arange(0, T + tstep / 2, tstep)

# 입력 신호
f = 900
x = np.sin(2 * np.pi * f * t)

# Chebyshev Type Ⅱ LPF 설계
sos = signal.cheby2(
    N=32,
    rs=40,
    Wn=2 * np.pi * 1000,
    btype="lowpass",
    analog=True,
    output="sos"
)

# 출력 신호 계산
y = x.copy()

for section in sos:
    b = section[:3]
    a = section[3:]
    _, y, _ = signal.lsim((b, a), U=y, T=t)

# 입출력 신호 관찰
plt.figure(figsize=(10, 5))
plt.plot(t, x, label="Input")
plt.plot(t, y, label="LPF Output")
plt.xlabel("Time (s)")
plt.ylabel("Amplitude")
plt.legend()
plt.grid(True)
plt.tight_layout()
plt.show()`,
          "prompt": `시뮬레이션 시간 0.05초 동안 입력 신호의 주파수 f를 [표 7.1]에 나타낸 값으로 각각 변경하고 코드를 실행하시오.

각 주파수에 대하여 LPF의 입출력 신호를 그래프로 관찰하시오. 시간이 어느 정도 지난 후 출력 신호의 크기(Amplitude)를 측정하여 [표 7.1]을 완성하시오.
[[table:
caption:표 7.1 LPF의 입력과 출력 신호의 크기
입력 주파수 'f' (Hz) | 출력 신호의 크기 (Amplitude)
400 + 학번 끝 2자리 | ① 
900 | ②
950 | ③
1000 | ④
1050 | ⑤
1500 | ⑥
3000 | ⑦
]]`,
          
referenceAnswer: `입력 신호의 주파수를 각각 변경하면서 LPF의 입출력 파형을 관찰하고, 시간이 어느 정도 지난 후 출력 신호의 진폭을 측정하면 다음과 같다.

[[table:
caption:표 7.1 LPF의 입력과 출력 신호의 크기
입력 주파수 f (Hz) | 출력 신호의 크기 (Amplitude)
400 + 학번 끝 2자리 | 약 1
900 | 약 1
950 | 약 1
1000 | 약 0.1
1050 | 약 0.01
1500 | 약 0.005
3000 | 약 0.005
]]

※ 첫 번째 주파수는 학번 끝 두 자리에 따라 달라지므로, 해당 주파수에서 직접 측정한 값을 작성해야 한다. 위 표의 값은 참고용이며, 실제 출력 진폭은 관찰 구간과 과도응답의 영향에 따라 달라질 수 있다.

입력 주파수가 900 Hz와 950 Hz일 때는 출력 진폭이 약 1로 유지되지만, 1000 Hz 부근부터 급격히 감소한다. 1050 Hz 이상의 주파수에서는 출력 진폭이 매우 작아지는 것을 확인할 수 있다.`

        },
        {
          "id": "7-1A3",
          "title": "1.A3.",
          "type": "essay",
          "prompt": `실험 결과를 토대로 LPF가 제대로 설계되었다고 판단할 수 있는가? 그렇게 판단한 이유를 쓰시오.`,
          
referenceAnswer: `실험 결과를 통해 LPF가 설정한 주파수 특성에 따라 동작하고 있음을 확인할 수 있다.

설계한 LPF의 저지대역 경계 주파수는 1 kHz이다. 입력 신호의 주파수가 1 kHz보다 충분히 낮은 경우 출력 진폭이 입력 진폭인 1에 가깝게 유지되었다. 반면 입력 주파수가 1 kHz 부근에 도달하면 출력 진폭이 급격히 감소하였으며, 더 높은 주파수에서는 신호가 크게 감쇠되었다.

이는 LPF가 낮은 주파수 성분을 통과시키고 높은 주파수 성분을 감쇠시키는 특성과 일치한다.

특히 Chebyshev Type II 필터는 저지대역에서 리플을 허용하며, 설정한 저지대역 감쇠 조건에 따라 고주파 성분을 억제한다.

다만 0.05초의 유한한 시뮬레이션에서는 필터의 과도응답이 완전히 사라지지 않을 수 있다. 따라서 주파수 경계 부근의 측정 진폭과 정상상태의 이론적인 주파수 응답 사이에는 차이가 발생할 수 있다.

종합하면, 실험 결과에서 저주파 성분은 대부분 통과하고 고주파 성분은 크게 감쇠하므로 LPF가 의도한 주파수 선택 특성에 따라 동작한다고 판단할 수 있다.`

        },
      ]
    },
    { //문제 2
      id: "7-2",
      title: "2. 사운드(Sound) 데이터 저장 및 재생",
      problems: [
        {
      id: "7-2A",
      title: "2.A.",
      prompt: `다음 [그림 7.2]와 같이 사운드 데이터를 불러와 저장하고 재생하는 시스템을 Python으로 구현하자.
[[image:/images/ch7/figure7_2.png|그림 7.2 사운드 데이터 처리 시스템|50]]
[[link:/workbook/ch1?p=1-6A1|1장의 문제 6.A1]]에서는 온라인 워크북 실습에 제공하는 파일 로드를 위한 'file_load()' 모듈 활용법을 익혔다. 아래 py 스크립트는 본 챕터에서 사용할 'ch7/sound_CH7.mat'을 불러온다.
\`\`\`python
import numpy as np
from scipy.io import loadmat, savemat

file_load("ch7/sound_CH7.mat")
\`\`\`  
`
    },
    {
      id: "7-2A1",
      title: "2.A1.",
      type: "python",
      consoleEnabled: true,
      starterCode: `import numpy as np
from scipy.io import loadmat, savemat

file_load("ch7/sound_CH7.mat")`,
      prompt: `실습 자료 sound_CH7.mat을 불러오고, 파일에 저장된 data 변수를 추출하기 위해 아래 코드를 추가하시오.
\`\`\`python
#문제 2.A의 py 스크립트에 아래를 추가.
data = loadmat("sound_CH7.mat")["data"]
\`\`\`
py 스크립트 실행 후, Console에서 아래를 실행하여, 변수 'data'의 0행과 1행에 무엇이 저장되어 있는지 쓰시오.
\`\`\`python
>>> data
\`\`\`
      `,
      
referenceAnswer: `py 스크립트를 실행하고 Console에서 'data'를 확인하면, 0행에는 시간 데이터가 저장되어 있고, 1행에는 시간에 따른 사운드 신호의 진폭 데이터가 저장되어 있음을 확인할 수 있다.

- data[0]: 시간 데이터 (초)
- data[1]: 사운드 신호의 진폭 데이터`

    },
    {
      id: "7-2A2",
      title: "2.A2.",
      type: "python",
      consoleEnabled: true,
      starterCode: `import numpy as np
from scipy.io import loadmat, savemat

file_load("ch7/sound_CH7.mat")
data = loadmat("sound_CH7.mat")["data"]`,
      prompt: `시간 데이터를 이용하여 샘플링 주파수 fs를 계산하고 Hz 단위로 출력하기 위해 아래 코드를 추가하시오.
\`\`\`python
#문제 2.A1의 py 스크립트에 아래를 추가.
fs = round(1 / np.mean(np.diff(data[0])))
\`\`\`
py 스크립트 실행 후, Console에서 아래를 실행하여, 샘플링 주파수가 얼마인지 Hz 단위로 쓰시오.
\`\`\`python
>>> fs
\`\`\`
`,
      
referenceAnswer: `시간 데이터의 인접한 샘플 간격을 이용하여 샘플링 주파수를 계산한다.

\`\`\`python
fs = round(1 / np.mean(np.diff(data[0])))
print(fs)
\`\`\`

샘플링 주파수는 8192 Hz이다.`

    },
    {
      id: "7-2A3",
      title: "2.A3.",
      type: "python",
      consoleEnabled: true,
      starterCode: `import numpy as np
from scipy.io import loadmat, savemat

file_load("ch7/sound_CH7.mat")
data = loadmat("sound_CH7.mat")["data"]
fs = round(1 / np.mean(np.diff(data[0])))`,
      prompt: `사운드 데이터를 함수 'savemat()'을 이용하여 'signal.mat' 파일로 저장한 후, 저장된 파일을 함수 'loadmat()'으로 다시 불러와 'saved_data' 변수에 저장하기 위해 아래 코드를 추가하시오.
\`\`\`python
#문제 2.A2의 py 스크립트에 아래를 추가.
savemat("signal.mat", {"data": data})
saved_data = loadmat("signal.mat")["data"]
\`\`\`
py 스크립트 실행 후, Console에서 아래를 실행하여, 저장한 signal.mat 파일의 사운드 신호를 재생하자. 재생이 잘 되는지 확인하고, 어떤 사운드가 재생되는지 쓰시오.
\`\`\`python
>>> signal_play(saved_data[1], fs)
\`\`\``,
      
referenceAnswer: `함수 'savemat()'을 이용하여 사운드 데이터를 'signal.mat' 파일로 저장하고, 함수 'loadmat()'을 이용하여 저장된 파일을 다시 불러온다.

\`\`\`python
savemat("signal.mat", {"data": data})
saved_data = loadmat("signal.mat")["data"]
\`\`\`

Console에서 다음 명령을 실행한다.

\`\`\`python
signal_play(saved_data[1], fs)
\`\`\`

저장된 사운드 신호가 정상적으로 재생되며, 클래식 음악이 들린다.`
        },
      ]
    },
    { //문제 3
      "id": "7-3",
      "title": "3. 샘플링 및 신호 복원 시스템 설계",
      "problems": [
        { //문제 3.A
          "id": "7-3A",
          "title": "3.A.",
          "prompt": `[그림 7.3]은 샘플링 과정과 샘플링된 신호를 LPF로 복원하는 간단한 시스템을 보인 것이다.
[[image:/images/ch7/figure7_3.png|그림 7.3 샘플링 및 신호 복원 시스템|75]]
실습에서 샘플링할 $x(t)$는 대역폭 $B$가 4kHz인 사운드 신호이다. 일반적인 사운드 신호의 주파수 스펙트럼(푸리에 변환)은 간단한 모양은 아니지만, 수식 분석을 위해 $x(t)$의 스펙트럼(푸리에 변환) $X(\\omega)$는 [그림 7.4]와 같이 한쪽 폭이 4 kHz인 삼각형 모양으로 가정하자.
[[image:/images/ch7/figure7_4.png|그림 7.4 사운드 신호 $x(t)$의 스펙트럼|50]]`
        },
        {
          "id": "7-3A1",
          "title": "3.A1.",
          "type": "essay",
          "prompt": `$x(t)$를 샘플링한 후 왜곡 없이 다시 복원하려면, 샘플링 펄스 신호([그림 7.3]의 $p(t)$)의 샘플링 주파수 $F_s$는 최소 몇 이상이어야 하는가? 즉, Nyquist Rate는 얼마인가? 그 이유를 설명하시오.`,
          
referenceAnswer: `원래 사운드 신호 $x(t)$의 대역폭은 $B=4$ kHz이다. 샘플링한 신호를 왜곡 없이 복원하려면 샘플링 주파수 $F_s$는 원래 신호의 최고 주파수의 두 배 이상이어야 한다.

$$
F_s \\geq 2B = 2\\times 4 = 8\\ \\mathrm{kHz}
$$

따라서 Nyquist Rate는 **8 kHz**이다.

샘플링하면 원래 신호의 스펙트럼이 샘플링 주파수의 정수배를 중심으로 반복해서 나타난다. 샘플링 주파수가 8 kHz보다 작으면 원래 신호의 스펙트럼과 반복된 스펙트럼이 서로 겹쳐 앨리어싱(Aliasing)이 발생한다. 이 경우 LPF를 사용하더라도 겹친 스펙트럼을 분리할 수 없으므로 원래 신호를 왜곡 없이 복원할 수 없다.

따라서 스펙트럼이 서로 겹치지 않도록 샘플링 주파수를 최소 8 kHz 이상으로 설정해야 한다.`

        },
        {
          "id": "7-3A2",
          "title": "3.A2.",
          "type": "proof",
          "prompt": `샘플링 펄스 신호 $p(t)$가 [그림 7.5]와 같다고 가정하자. 즉, 샘플링 주파수 $F_s=2B=8$ kHz이고, 높이는 $1$, 펄스폭은 주기의 $\\dfrac{1}{10}$이다.
[[image:/images/ch7/figure7_5.png|그림 7.5 샘플링 신호 $p(t)$|50]]   
이때, 샘플링된 신호 $s(t)(=x(t)p(t))$의 주파수 스펙트럼(푸리에 변환) $S(\\omega)$를 $X(\\omega)$를 이용한 수식으로 [[equation:7.1]]과 같이 유도할 수 있다. 푸리에 급수의 계수를 $P_n$이라고 할 때, $p(t)$의 푸리에 변환 $P(\\omega)$는 $2\\pi P_n$을 크기로 갖는 라인 스펙트럼인 점([[link:/workbook/ch4?p=4-2A1|4장의 문제 2]] 참고), 그리고 두 함수의 시간 축에서의 곱은 주파수 축에서의 컨볼루션이라는 점을 이용하여, [[equation:7.1]]에서 두 군데 빈칸 ①, ②를 채우시오. 또한, 이를 주파수 축에서 그리고 $P_n$의 절댓값을 $n$에 대하여 sinc 함수로 정확히 유도하시오. (여기서, $F[s(t)]$는 $f(t)$의 푸리에 변환을 나타냄)
$$
S(\\omega)=F[s(t)]=
\\sum_{n=-\\infty}^{\\infty} \\boxed{\\phantom{\\Large A}\\, ① \\phantom{\\Large A}} \\times X(\\omega-n \\times \\boxed{\\phantom{\\Large A}\\, ② \\phantom{\\Large A}})
\\qquad \\text{(식 7.1)}
$$`,
          
referenceAnswer: `**①, ②의 정답**

- ①: $P_n$
- ②: $\\omega_s=2\\pi F_s=2\\pi\\times8000$ rad/s

따라서 (식 7.1)은 다음과 같다.

$$
S(\\omega)=
\\sum_{n=-\\infty}^{\\infty}
P_n X(\\omega-n\\omega_s)
\\qquad \\text{(식 7.1)}
$$

**1. 샘플링된 신호의 푸리에 변환**

샘플링 펄스 신호 $p(t)$는 주기 $T_s=1/F_s$를 가지는 주기 신호이므로 다음과 같이 푸리에 급수로 표현할 수 있다.

$$
p(t)=\\sum_{n=-\\infty}^{\\infty}P_n e^{jn\\omega_s t}
$$

여기서 $\\omega_s=2\\pi F_s$이다.

푸리에 변환하면 다음과 같다.

$$
P(\\omega)=2\\pi
\\sum_{n=-\\infty}^{\\infty}
P_n\\delta(\\omega-n\\omega_s)
$$

샘플링된 신호는 $s(t)=x(t)p(t)$이다. 시간 영역에서 두 신호의 곱은 주파수 영역에서 컨볼루션에 대응하므로,

$$
S(\\omega)=
\\frac{1}{2\\pi}X(\\omega)*P(\\omega)
$$

이다. 여기에 $P(\\omega)$를 대입하면,

$$
S(\\omega)=
\\sum_{n=-\\infty}^{\\infty}
P_n X(\\omega-n\\omega_s)
$$

를 얻는다.

따라서 원래 신호의 스펙트럼 $X(\\omega)$가 $\\omega_s$의 정수배를 중심으로 반복해서 나타난다.

**2. 푸리에 급수 계수 $P_n$ 유도**

샘플링 주파수는 $F_s=8$ kHz이고 펄스폭은 주기의 $1/10$이다.

$$
T_s=\\frac{1}{8000},\\qquad
\\tau=\\frac{T_s}{10}
$$

펄스의 높이는 1이므로, 각 주기의 시작점부터 $\\tau$까지 펄스가 존재한다고 하면 푸리에 급수 계수는 다음과 같다.

$$
P_n=
\\frac{1}{T_s}
\\int_0^\\tau
e^{-jn\\omega_s t}\\,dt
$$

$n\\neq0$인 경우 적분하면,

$$
P_n=
\\frac{1-e^{-jn\\omega_s\\tau}}
{jn\\omega_s T_s}
$$

이다. 이를 정리하면,

$$
P_n=
\\frac{\\tau}{T_s}
\\frac{\\sin(n\\omega_s\\tau/2)}
{n\\omega_s\\tau/2}
e^{-jn\\omega_s\\tau/2}
$$

이다.

$\\tau/T_s=1/10$이고 $\\omega_s=2\\pi/T_s$이므로,

$$
P_n=
\\frac{1}{10}
\\mathrm{sinc}\\left(\\frac{n}{10}\\right)
e^{-jn\\pi/10}
$$

이다. 여기서 정규화된 sinc 함수는 다음과 같이 정의한다.

$$
\\mathrm{sinc}(u)=
\\frac{\\sin(\\pi u)}{\\pi u}
$$

따라서 절댓값을 취하면,

$$
\\boxed{
|P_n|=
\\frac{1}{10}
\\left|
\\mathrm{sinc}\\left(\\frac{n}{10}\\right)
\\right|
}
$$

을 얻는다. $n=0$인 경우에도 극한값을 적용하면 $P_0=1/10$이다.

**3. 주파수 스펙트럼의 형태**

원래 신호의 스펙트럼 $X(\\omega)$는 0 Hz를 중심으로 양쪽으로 4 kHz까지 존재하는 삼각형 모양이다.

샘플링 후에는 다음 주파수를 중심으로 삼각형 스펙트럼이 반복해서 나타난다.

- $n=0$: 0 kHz
- $n=\\pm1$: ±8 kHz
- $n=\\pm2$: ±16 kHz
- $n=\\pm3$: ±24 kHz
- ...

각 반복 스펙트럼에는 $P_n$이 곱해지므로, 그 크기는 sinc 함수의 포락선을 따른다.

특히 $n=0$에서 크기가 최대이고, $n=\\pm10,\\pm20,\\ldots$에서는 $|P_n|=0$이 된다.

샘플링 주파수가 8 kHz이므로 sinc 포락선의 첫 번째 영점은 ±80 kHz이다.

따라서 $S(\\omega)$는 8 kHz 간격으로 반복되는 삼각형 스펙트럼들이 sinc 함수의 포락선을 따르는 형태이며, 중심이 0 Hz인 스펙트럼의 크기는 원래 $X(\\omega)$의 $1/10$이다.`

        },
        { //문제 3.B
          "id": "7-3B",
          "title": "3.B.",
          "prompt": `문제 2에서 사용한 사운드 신호 $x(t)$를 주기적인 펄스 신호 $p(t)$로 샘플링하여 $s(t)$를 생성하자. 샘플링된 신호는 다음과 같이 정의된다.
$$
s(t)=x(t)p(t)
$$
[그림 7.6]과 같이 원래 신호, 샘플링 펄스 신호 및 샘플링된 신호를 각각 관찰하고, 주파수 스펙트럼을 비교하도록 py 스크립트를 설계하자.
[[image:/images/ch7/figure7_6.png|그림 7.6 샘플링 시스템 설계|50]]
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat, savemat

# 사운드 데이터 불러오기
file_load("ch7/sound_CH7.mat")
data = loadmat("sound_CH7.mat")["data"]

# 실험 조건
T = 5e-4
dt = 1 / 160000
t = np.arange(0, T, dt)

# 원래 사운드 신호
x = np.interp(t, data[0], data[1])

# 샘플링 펄스 신호
Fs = 8000
pulse_width = 10
samples_per_period = round(1 / (Fs * dt))
samples_per_pulse = round(samples_per_period * pulse_width / 100)
n = np.arange(len(t))
p = ((n % samples_per_period) < samples_per_pulse).astype(float)

# 샘플링된 신호
s = x * p

# 시간 데이터와 샘플링된 신호를 sampled.mat으로 저장
sampled_data = np.vstack((t, s))
savemat("sampled.mat", {"data": sampled_data})
\`\`\`          
위 py 스크립트에서 실험 조건은 다음과 같다.
[[table:
항목 | 설정값
샘플링 주파수 $F_s$ | 8 kHz
펄스 주기 $T_s$ | $\\dfrac{1}{8000}$ 초
펄스 폭 | 주기의 10%
펄스 높이 | $1$
기본 계산 시간 간격 | $\\dfrac{1}{160000}$ 초
]]`
        },
        {
          "id": "7-3B1",
          "title": "3.B1.",
          "type": "python",
          starterCode: `import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat, savemat

# 사운드 데이터 불러오기
file_load("ch7/sound_CH7.mat")
data = loadmat("sound_CH7.mat")["data"]

# 실험 조건
T = 5e-4
dt = 1 / 160000
t = np.arange(0, T, dt)

# 원래 사운드 신호
x = np.interp(t, data[0], data[1])

# 샘플링 펄스 신호
Fs = 8000
pulse_width = 10
samples_per_period = round(1 / (Fs * dt))
samples_per_pulse = round(samples_per_period * pulse_width / 100)
n = np.arange(len(t))
p = ((n % samples_per_period) < samples_per_pulse).astype(float)

# 샘플링된 신호
s = x * p

# 시간 데이터와 샘플링된 신호를 sampled.mat으로 저장
sampled_data = np.vstack((t, s))
savemat("sampled.mat", {"data": sampled_data})

# Time-domain Viewer
fig, axes = plt.subplots(3, 1, figsize=(10, 7))

axes[0].plot(t, x)
axes[0].set_title("Original Signal x(t)")

axes[1].step(t, p, where="post")
axes[1].set_title("Sampling Pulse p(t)")

axes[2].plot(t, s)
axes[2].set_title("Sampled Signal s(t)")

for ax in axes:
    ax.set_xlabel("Time (s)")
    ax.set_ylabel("Amplitude")
    ax.grid(True)

plt.tight_layout()
plt.show()`,
          "prompt": `문제 3.B의 py 스크립트에 [그림 7.6]에 해당하는 Time-domain Viewer를 추가하기 위해 아래를 추가하자.
\`\`\`  
# 문제 3.B의 py 스크립트에 아래(Time-domain Viewer)를 추가.
fig, axes = plt.subplots(3, 1, figsize=(10, 7))

axes[0].plot(t, x)
axes[0].set_title("Original Signal x(t)")

axes[1].step(t, p, where="post")
axes[1].set_title("Sampling Pulse p(t)")

axes[2].plot(t, s)
axes[2].set_title("Sampled Signal s(t)")

for ax in axes:
    ax.set_xlabel("Time (s)")
    ax.set_ylabel("Amplitude")
    ax.grid(True)

plt.tight_layout()
plt.show()
\`\`\`
원래 사운드 신호 $x(t)$, 샘플링 펄스 신호 $p(t)$, 샘플링된 신호 $s(t)$ 3개의 신호를 Matplotlib으로 출력하고 결과 그래프를 확인하시오.        
          `,
          referenceAnswer: `주어진 Python 코드로 원래 신호 x(t), 샘플링 펄스 신호 p(t), 샘플링된 신호 s(t)를 생성하고 세 신호를 각각 그래프로 나타낸다.

첫 번째 그래프에서는 원래 사운드 신호 x(t), 두 번째 그래프에서는 주기적으로 생성되는 펄스 신호 p(t), 세 번째 그래프에서는 두 신호를 곱한 s(t)를 확인할 수 있다.

샘플링된 신호 s(t)는 펄스가 1인 구간에서 원래 신호와 같고, 펄스가 0인 구간에서는 0이 된다.`,
        },
        {
          "id": "7-3B2",
          "title": "3.B2.",
          "type": "python",
          responseEnabled: true,
          "prompt": `시뮬레이션 시간 'T = 5e-4'초로 설정하고 코드를 실행하시오. 생성된 $p(t)$의 파형을 관찰하여 주기와 펄스폭을 측정하시오. 측정 결과가 설정값과 일치하는지 쓰시오.`,
          referenceAnswer: `샘플링 펄스 신호 p(t)의 파형을 관찰하면 주기와 펄스폭은 다음과 같다.

- 펄스 주기: 1/8000초 = 0.000125초 = 125 μs
- 펄스폭: 125 μs × 0.1 = 12.5 μs

계산 시간 간격이 1/160000초이므로 한 주기는 20개 샘플, 펄스폭은 2개 샘플로 표현된다.

그래프에서 측정한 주기와 펄스폭은 설정값과 일치한다.`,
        },
        {
          "id": "7-3B3",
          "title": "3.B3.",
          "type": "python",
          "prompt": `시뮬레이션 시간 'T = 1e-2'초로 변경하고 코드를 실행하시오. $x(t)$와 $s(t)$를 동일한 시간축에서 관찰하고, 그래프의 시간 범위를 0.006~0.01초로 설정하여('axes[?].set_xlim(0.006, 0.01)' 이용) 두 파형을 비교하시오. 결과 그래프를 제시하시오.`,
          referenceAnswer: `시뮬레이션 시간을 0.01초로 설정하고, 그래프의 시간 범위를 0.006~0.01초로 확대한다.

첫 번째 그래프에서 원래 신호 x(t)를 확인할 수 있으며, 세 번째 그래프에서 샘플링된 신호 s(t)를 확인할 수 있다.

두 파형을 비교하면 s(t)는 펄스가 발생하는 짧은 구간에서만 x(t)와 동일한 값을 가지며, 나머지 구간에서는 0이 되는 것을 확인할 수 있다.`,
        },
        {
          "id": "7-3B4",
          "title": "3.B4.",
          "type": "essay",
          "prompt": `문제 3.B3의 결과로부터 샘플링된 신호 $s(t)$가 생성 수식 $s(t)=x(t)p(t)$에 맞게 생성되었는지 쓰시오.`,
          referenceAnswer: `샘플링된 신호 s(t)는 원래 신호 x(t)와 샘플링 펄스 신호 p(t)를 곱하여 생성된다.

펄스 신호 p(t)가 1인 구간에서는 s(t)=x(t)이고, p(t)가 0인 구간에서는 s(t)=0이다.

펄스폭이 주기의 10%이므로 매 주기의 10%에 해당하는 구간에서는 원래 신호와 동일한 값을 가지며, 나머지 90%에서는 0이 된다.`,
        },
        {
          "id": "7-3B5",
          "title": "3.B5.",
          "type": "python",
          consoleEnabled: true,
          "prompt": `시뮬레이션 시간 'T = 4'초로 설정하고 코드를 실행하시오. 실행 후, Console에서 아래를 실행하면, [그림 7.3]의 4가지 신호($x(t), p(t), s(t), r(t)$) 중 어떤 신호가 재생되는 것인지 쓰시오.
\`\`\`  
>>> signal = loadmat("sampled.mat")["data"]
>>> signal_play(signal[1], 160000)
\`\`\``,
          referenceAnswer: `sampled.mat 파일에는 샘플링된 신호 s(t)가 저장되어 있다.

따라서 signal_play()를 이용하여 sampled.mat 파일의 사운드 데이터를 재생하면, 네 가지 신호 x(t), p(t), s(t), r(t) 중 샘플링된 신호 s(t)가 재생된다.`,
        },
        {
          "id": "7-3B6",
          "title": "3.B6.",
          "type": "essay",
          "prompt": `문제 3.B5에서 어떠한 소리가 들리는지 쓰고, 원래 사운드와 다르게 들리는 이유를 설명하시오.`,
          referenceAnswer: `샘플링된 신호 s(t)를 재생하면 원래 사운드와 달리 잡음이나 지지직거리는 소리가 섞여 들릴 수 있다.

이는 원래 신호 x(t)에 펄스폭이 10%인 샘플링 펄스 신호 p(t)를 곱했기 때문이다.

샘플링된 신호 s(t)는 매 주기의 10% 구간에서만 원래 신호의 값을 가지며, 나머지 90% 구간에서는 0이 된다.

이러한 주기적인 신호 차단으로 인해 주파수 스펙트럼에도 샘플링 주파수의 정수배를 중심으로 추가적인 성분이 발생하므로, 원래 사운드와 다른 소리가 들릴 수 있다.`
        },
        {
          "id": "7-3B7",
          "title": "3.B7.",
          "type": "python",
          responseEnabled: true,
          starterCode: `import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat, savemat

# 사운드 데이터 불러오기
file_load("ch7/sound_CH7.mat")
data = loadmat("sound_CH7.mat")["data"]

# 실험 조건
T = 4
dt = 1 / 160000
t = np.arange(0, T, dt)

# 원래 사운드 신호
x = np.interp(t, data[0], data[1])

# 샘플링 펄스 신호
Fs = 8000
pulse_width = 10
samples_per_period = round(1 / (Fs * dt))
samples_per_pulse = round(samples_per_period * pulse_width / 100)
n = np.arange(len(t))
p = ((n % samples_per_period) < samples_per_pulse).astype(float)

# 샘플링된 신호
s = x * p

# 시간 데이터와 샘플링된 신호를 sampled.mat으로 저장
sampled_data = np.vstack((t, s))
savemat("sampled.mat", {"data": sampled_data})

# Spectrum Viewer
results = [
    spectrum_view(x, 160000),
    spectrum_view(p, 160000),
    spectrum_view(s, 160000)
]
plt.close("all")
fig, axes = plt.subplots(3, 1, figsize=(12, 8))
titles = [
    "Original Signal X(f)",
    "Sampling Pulse P(f)",
    "Sampled Signal S(f)"
]
for ax, result, title in zip(axes, results, titles):
    ax.plot(result["frequency"] / 1000, result["power_dbm"]    )
    ax.set_xlim(-80, 80)
    ax.set_ylim(-40, 25)
    ax.set_title(title)
    ax.set_ylabel("Power (dBm)")
    ax.grid(True)
axes[-1].set_xlabel("Frequency (kHz)")
plt.tight_layout()
plt.show()`,
          "prompt": `문제 3.B의 py 스크립트에 [그림 7.6]에 해당하는 Spectrum Viewer를 추가하기 위해 아래를 추가하자.
\`\`\`  
# 문제 3.B의 py 스크립트에 아래(Spectrum Viewer)를 추가.
results = [
    spectrum_view(x, 160000),
    spectrum_view(p, 160000),
    spectrum_view(s, 160000)
]
plt.close("all")
fig, axes = plt.subplots(3, 1, figsize=(12, 8))
titles = [
    "Original Signal X(f)",
    "Sampling Pulse P(f)",
    "Sampled Signal S(f)"
]
for ax, result, title in zip(axes, results, titles):
    ax.plot(result["frequency"] / 1000, result["power_dbm"]    )
    ax.set_xlim(-80, 80)
    ax.set_ylim(-40, 25)
    ax.set_title(title)
    ax.set_ylabel("Power (dBm)")
    ax.grid(True)
axes[-1].set_xlabel("Frequency (kHz)")
plt.tight_layout()
plt.show()
\`\`\`
원래 사운드 신호 $x(t)$, 샘플링 펄스 신호 $p(t)$, 샘플링된 신호 $s(t)$ 3개의 스펙트럼 $X(f), P(f), S(f)$을 출력하고 결과를 확인하시오. 이후, $p(t)$의 스펙트럼에서 일정한 간격으로 나타나는 라인 스펙트럼을 관찰하고 다음 물음에 답하시오.
(a) 라인 스펙트럼이 발생하는 이유를 쓰시오.
(b) 라인 스펙트럼의 주파수 간격은 얼마인지 쓰시오.
(c) 라인 스펙트럼의 간격은, 굳이 (b)에서 처럼 실제로 관찰하지 않고도, [그림 7.6]으로 설계한 py 스크립트의 어떤 변수의 변수값이 얼마로 설정되었는지 보면 알 수 있다. 
      (c-1) 해당 변수 이름과 설정값을 각각 쓰시오.
      (c-2) 해당 변수의 설정값대로 설정하면 왜 라인 스펙트럼의 간격이 (b)에서 관찰한 값과 같게 되는지 설명하시오. (주기함수의 스펙트럼 이론에 입각하여 쓸 것)
      (c-3) 위 (c-2)의 답은 'Nyquist 정리'와 전혀 무관한 이유를 쓰시오. 
          `,
          
referenceAnswer: `원래 신호 x(t), 샘플링 펄스 신호 p(t), 샘플링된 신호 s(t)의 주파수 스펙트럼을 각각 관찰하면 다음과 같다.

- X(f): 원래 사운드 신호의 스펙트럼으로, 주로 0 Hz 부근에 집중되어 있다.
- P(f): 8 kHz 간격으로 나타나는 라인 스펙트럼이다.
- S(f): 8 kHz의 정수배를 중심으로 원래 신호의 스펙트럼이 반복되어 나타난다.

(a) 라인 스펙트럼이 발생하는 이유

샘플링 펄스 신호 p(t)는 일정한 주기로 반복되는 주기 신호이다. 주기 신호는 푸리에 급수로 표현할 수 있으며, 푸리에 변환하면 기본 주파수의 정수배에 해당하는 주파수에서 라인 스펙트럼이 발생한다.

따라서 p(t)의 스펙트럼은 일정한 간격의 라인 스펙트럼으로 나타난다.

(b) 라인 스펙트럼의 주파수 간격

라인 스펙트럼의 주파수 간격은 8 kHz이다.

(c-1) 해당 변수 이름과 설정값

- 변수 이름: Fs
- 설정값: 8000

(c-2) 라인 스펙트럼의 간격이 8 kHz가 되는 이유

샘플링 펄스 신호 p(t)의 주기는 다음과 같다.

$$
T_s=\\frac{1}{F_s}=\\frac{1}{8000}\\;\\mathrm{s}
$$

주기 신호의 푸리에 변환에서는 기본 주파수의 정수배 위치에 라인 스펙트럼이 발생한다.

따라서 p(t)의 기본 주파수는 다음과 같다.

$$
f_0=\\frac{1}{T_s}=8000\\;\\mathrm{Hz}
$$

즉, 라인 스펙트럼은 0, ±8, ±16, ±24 kHz 등 8 kHz의 정수배에 해당하는 위치에서 발생하므로, 스펙트럼의 간격은 8 kHz이다.

(c-3) Nyquist 정리와 무관한 이유

라인 스펙트럼의 간격은 주기 신호 p(t)의 기본 주파수에 의해 결정된다.

반면 Nyquist 정리는 대역폭이 제한된 신호를 왜곡 없이 복원하기 위해 필요한 최소 샘플링 주파수에 관한 정리이다.

따라서 라인 스펙트럼의 간격이 8 kHz인 이유는 펄스 신호의 주기 때문이며, Nyquist 정리에 의해 결정되는 것이 아니다.`

        },
        {
          "id": "7-3B8",
          "title": "3.B8.",
          "type": "essay",
          "prompt": `문제 3.B7의 $S(f)$를 문제 3.A2에서 유도한 식과 비교하시오.
(a) 스펙트럼의 전체적인 포락선이 문제 3.A2에서 유도한 $|P_n|$의 sinc 함수와 부합하는지 쓰고, 그 이유를 설명하시오.
(b) 반복되는 스펙트럼 사이의 주파수 간격이 문제 3.A2의 결과와 일치하는지 쓰시오.`,
          
referenceAnswer: `(a) sinc 포락선과의 비교

문제 3.A2에서 유도한 샘플링 펄스 신호의 푸리에 급수 계수 P_n의 크기는 다음과 같다.

$$
|P_n|=0.1\\left|\\mathrm{sinc}(0.1n)\\right|
$$

여기서 sinc 함수는 다음과 같이 정의한다.

$$
\\mathrm{sinc}(u)=\\frac{\\sin(\\pi u)}{\\pi u}
$$

따라서 n=±10, ±20, ...에서 P_n의 크기가 0이 된다.

샘플링 주파수가 8 kHz이므로 첫 번째 영점은 ±80 kHz에 해당한다.

문제 3.B7에서 관찰한 S(f)의 스펙트럼도 0 kHz를 중심으로 멀어질수록 반복되는 스펙트럼의 크기가 대체로 감소하며, ±80 kHz 부근에서 포락선이 0에 가까워진다.

따라서 실험 결과의 전체적인 포락선은 문제 3.A2에서 유도한 sinc 함수의 특성과 부합한다.

(b) 스펙트럼 간격의 비교

S(f)에서는 원래 신호의 스펙트럼이 8 kHz 간격으로 반복되어 나타난다.

이는 문제 3.A2에서 유도한 스펙트럼의 반복 간격과 일치한다.`

        },
        {
          "id": "7-3B9",
          "title": "3.B9.",
          "type": "essay",
          "prompt": `샘플링 주파수 $F_s$를 기존 8 kHz에서 32 kHz로 변경하면 $s(t)$의 스펙트럼 간격이 어떻게 변할지 예상하여 쓰시오.`,
          referenceAnswer: `샘플링 주파수를 8 kHz에서 32 kHz로 변경하면 스펙트럼이 반복되는 간격도 8 kHz에서 32 kHz로 증가할 것이다.

따라서 샘플링된 신호 S(f)의 스펙트럼은 0, ±32, ±64 kHz 등 32 kHz의 정수배에 해당하는 주파수를 중심으로 반복되어 나타날 것으로 예상된다.`,
        },
        {
          "id": "7-3B10",
          "title": "3.B10.",
          "type": "python",
          responseEnabled: true,
          "prompt": `샘플링 주파수를 32 kHz로 설정하기 위해, 문제 3.B7의 py 스크립트를 복사하여 붙여넣은 후, 아래와 같이 수정하시오.
- 11번째 라인: 'dt = 1 / 320000'
- 18번째 라인: 'Fs = 32000'
- 34~36번째 라인 'spectrum_view()'의 두 번째 인수: 320000, 세 번째 인수로 'window_length=2048' 추가

$s(t)$의 주파수 스펙트럼을 관찰하고 결과 그래프를 제시하시오. 측정 결과가 문제 3.B9의 예상과 일치하는지 쓰시오.
          `,
          referenceAnswer: `샘플링 주파수를 32 kHz로 설정하고 시뮬레이션을 실행하면 S(f)의 스펙트럼이 0, ±32, ±64 kHz 등을 중심으로 반복되어 나타나는 것을 확인할 수 있다.

스펙트럼의 반복 간격은 32 kHz이므로, 샘플링 주파수가 8 kHz였을 때보다 네 배 넓어졌다.

따라서 문제 3.B9에서 예상한 결과와 일치한다.`
        },
        {
          "id": "7-3B11",
          "title": "3.B11.",
          "type": "essay",
          "prompt": `샘플링 주파수를 다시 8 kHz로 설정하고 펄스폭을 주기의 10%에서 1%로 변경하자. 이 경우 $s(t)$의 스펙트럼이 어떻게 달라질지 예상하여 쓰시오.

스펙트럼의 절대적인 크기보다는 주파수에 따른 상대적인 크기의 변화, 즉 포락선의 모양에 집중하고, 가능한 한 sinc 함수를 이용하여 그 이유를 설명하시오.`,
          referenceAnswer: `샘플링 주파수를 8 kHz로 유지하고 펄스폭을 주기의 10%에서 1%로 줄이더라도 스펙트럼의 반복 간격은 8 kHz로 동일하다.

그러나 펄스폭이 감소하면 주파수 영역에서 sinc 포락선이 넓어진다.

샘플링 펄스의 듀티비를 D라고 하면 푸리에 급수 계수의 크기는 다음과 같다.

$$
|P_n|=D|\\mathrm{sinc}(nD)|
$$

기존 펄스폭이 10%일 때는 D=0.1이므로,

$$
|P_n|=0.1|\\mathrm{sinc}(0.1n)|
$$

이고, 첫 번째 영점은 n=±10에 해당한다. 샘플링 주파수가 8 kHz이므로 첫 번째 영점은 ±80 kHz이다.

펄스폭을 1%로 줄이면 D=0.01이므로,

$$
|P_n|=0.01|\\mathrm{sinc}(0.01n)|
$$

이 되고, 첫 번째 영점은 n=±100에 해당한다. 따라서 첫 번째 영점은 ±800 kHz로 이동한다.

결과적으로 관찰 범위인 -80~80 kHz에서 반복되는 스펙트럼들의 상대적인 크기가 이전보다 균일하게 나타날 것으로 예상된다.`,
        },
        {
          "id": "7-3B12",
          "title": "3.B12.",
          "type": "python",
          responseEnabled: true,
          "prompt": `펄스폭을 1%로 변경하기 위해, 문제 3.B7의 py 스크립트를 복사하여 붙여넣은 후, 아래와 같이 수정하시오.
- 11번째 라인: 'dt = 1 / 800000'
- 19번째 라인: 'pulse_width = 1'
- 34~36번째 라인 'spectrum_view()'의 두 번째 인수: 800000, 세 번째 인수로 'window_length=5120' 추가

결과 그래프를 제시하시오. 측정 결과가 문제 3.B11의 예상과 일치하는지 쓰시오.
          `,
          referenceAnswer: `샘플링 주파수를 8 kHz로 유지하고 펄스폭을 1%로 설정하여 시뮬레이션을 실행한다.

샘플링된 신호 S(f)의 스펙트럼을 관찰하면 8 kHz 간격의 반복 구조는 유지되지만, 기존 펄스폭 10%의 결과보다 포락선이 넓어져 관찰 범위에서 반복되는 스펙트럼들의 상대적인 크기가 더 균일하게 나타난다.

펄스폭이 1%인 경우 sinc 포락선의 첫 번째 영점은 이론적으로 ±800 kHz에 해당하므로, -80~80 kHz 범위에서는 포락선이 거의 일정하게 나타난다.

따라서 실험 결과는 문제 3.B11에서 예상한 내용과 부합한다.`
        },
        { //문제 3.C
          "id": "7-3C",
          "title": "3.C.",
          "prompt": `[그림 7.7]과 같이 문제 3.B에서 생성한 샘플링 신호 $s(t)$에 LPF를 적용하여 원래 신호 $x(t)$를 복원하자. 복원된 신호를 $r(t)$라고 한다.
[[image:/images/ch7/figure7_7.png|그림 7.7 복원 시스템 설계|50]]`
        },
        {
          "id": "7-3C1",
          "title": "3.C1.",
          "type": "essay",
          "prompt": `원래 신호 $x(t)$를 저장하거나 전송하는 대신 샘플링 신호 $s(t)$에서 0이 아닌 부분만 처리하면, 처리해야 하는 신호의 양을 줄일 수 있다.

문제 3.B3에서 관찰한 시간 파형을 토대로, 샘플링 신호 $s(t)$를 이용하면 신호 처리량을 줄일 수 있는 이유를 쓰시오. 단, 실제 저장 용량은 데이터를 표현하고 저장하는 방식에 따라 달라질 수 있다.`,
          referenceAnswer: `샘플링 신호 $s(t)$는 매 샘플 주기의 10% 구간에서만 원래 신호 $x(t)$의 값을 가지고, 나머지 90% 구간에서는 0이다.

따라서 0이 아닌 구간의 신호값만 저장하거나 전송하고, 나머지 구간은 샘플링 주기와 펄스폭 정보를 이용하여 복원한다면 처리해야 하는 데이터의 양을 줄일 수 있다.

다만 실제 데이터의 저장 용량이나 전송량은 데이터를 표현하는 방식과 추가로 필요한 시간 정보 등에 따라 달라진다.`,
        },
        {
          "id": "7-3C2",
          "title": "3.C2.",
          "type": "essay",
          "prompt": `문제 3.B3에서 관찰한 신호 $s(t)$는 매 샘플 주기의 10% 구간에서만 원래 신호 $x(t)$와 동일하고, 나머지 90% 구간에서는 0이다.
          
이처럼 원래 신호 파형의 일부만 남아 있는 샘플링 신호 $s(t)$로부터 $x(t)$를 복원하는 것이 직관적으로 가능할지 예상하고, 그 이유를 설명하시오.`,
          referenceAnswer: `복원이 가능할 것으로 예상된다.

샘플링 신호 $s(t)$는 원래 신호 $x(t)$의 일부만 가지고 있지만, 원래 신호가 대역폭 4 kHz로 제한되어 있고 샘플링 주파수가 Nyquist Rate인 8 kHz 이상이라면 샘플링된 정보로부터 원래 신호를 이론적으로 복원할 수 있다.

시간 영역에서는 파형의 상당 부분이 제거된 것처럼 보이지만, 주파수 영역에서는 원래 신호의 스펙트럼이 샘플링 주파수의 정수배를 중심으로 반복되어 나타난다. 따라서 LPF를 이용하여 원래 신호에 해당하는 스펙트럼 성분을 추출하면 원래 신호의 파형을 복원할 수 있다.

단, 실제 복원 결과에는 LPF의 주파수 응답과 지연 등에 의한 오차가 발생할 수 있다.`,
        },
        {
          "id": "7-3C3",
          "title": "3.C3.",
          "type": "essay",
          "prompt": `문제 3.A2에서 유도한 $S(\\omega)$와 문제 3.B7에서 관찰한 샘플링 신호의 스펙트럼을 참고하시오.

샘플링 신호 $s(t)$에 대역폭이 4 kHz인 LPF를 적용하면 원래 신호의 스펙트럼 $X(\\omega)$를 추출할 수 있는 이유를 설명하시오.`,
          referenceAnswer: `문제 3.A2에서 유도한 샘플링 신호의 스펙트럼은 다음과 같다.

$$
S(\\omega)=
\\sum_{n=-\\infty}^{\\infty}
P_n X(\\omega-n\\omega_s)
$$

샘플링 주파수는 8 kHz이므로 원래 신호의 스펙트럼 $X(\\omega)$가 8 kHz의 정수배를 중심으로 반복되어 나타난다.

이때 $n=0$에 해당하는 성분은 다음과 같다.

$$
P_0X(\\omega)=\\frac{1}{10}X(\\omega)
$$

원래 신호의 대역폭은 4 kHz이므로 이상적인 LPF를 이용하여 -4~4 kHz 범위의 성분만 통과시키면, 다른 주파수에 반복되어 나타나는 스펙트럼을 제거하고 원래 신호의 스펙트럼에 비례하는 성분을 얻을 수 있다.

따라서 LPF의 출력은 이상적인 경우 다음과 같다.

$$
R(\\omega)=\\frac{1}{10}X(\\omega)
$$

즉, 원래 신호와 같은 형태의 스펙트럼을 추출할 수 있지만 펄스폭에 의해 그 크기는 원래 신호의 1/10이 된다. 실제 LPF에서는 전이대역 때문에 완전한 분리가 어려울 수 있다.`,
        },
        {
          "id": "7-3C4",
          "title": "3.C4.",
          "type": "essay",
          "prompt": `원래 사운드 신호 $x(t)$의 대역폭은 4 kHz이다.

샘플링된 신호 $s(t)$로부터 원래 신호를 복원하려면 LPF의 통과대역 경계 주파수를 얼마로 설정해야 하는가?`,
          referenceAnswer: `원래 사운드 신호 $x(t)$의 대역폭이 4 kHz이므로 LPF의 통과대역 경계 주파수는 **4 kHz**로 설정한다.

$$
f_c=4000\\ \\mathrm{Hz}
$$

각주파수로 나타내면 다음과 같다.

$$
\\omega_c=2\\pi f_c
=8000\\pi\\ \\mathrm{rad/s}
$$

따라서 문제 3.C5의 Python 코드에서 변수는 다음과 같이 설정한다.

\`fc = 4000\``
        },
        {
          "id": "7-3C5",
          "title": "3.C5.",
          "type": "python",
          starterCode: `import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat, savemat

# 사운드 데이터 불러오기
file_load("ch7/sound_CH7.mat")
data = loadmat("sound_CH7.mat")["data"]

# 실험 조건
T = 0.05
dt = 1 / 160000
t = np.arange(0, T, dt)

# 원래 사운드 신호
x = np.interp(t, data[0], data[1])

# 샘플링 펄스 신호
Fs = 8000
pulse_width = 10
samples_per_period = round(1 / (Fs * dt))
samples_per_pulse = round(samples_per_period * pulse_width / 100)
n = np.arange(len(t))
p = ((n % samples_per_period) < samples_per_pulse).astype(float)

# 샘플링된 신호
s = x * p

# 시간 데이터와 샘플링된 신호를 sampled.mat으로 저장
sampled_data = np.vstack((t, s))
savemat("sampled.mat", {"data": sampled_data})

# LPF 설계 및 신호 복원
from scipy import signal

fc = 4000
sos = signal.butter(
    N=8,
    Wn=fc,
    btype="lowpass",
    fs=1 / dt,
    output="sos"
)

r = signal.sosfilt(sos, s)

# 복원 신호를 원래 사운드의 샘플링 주파수로 변환, 실습과 상관없는 부분
from math import gcd

fs_audio = round(1 / np.mean(np.diff(data[0])))
fs_calc = round(1 / dt)
g = gcd(fs_audio, fs_calc)
r_audio = signal.resample_poly(r, fs_audio // g, fs_calc // g)

# 시간 데이터와 복원 신호 저장
t_audio = np.arange(len(r_audio)) / fs_audio
recovered_data = np.vstack((t_audio, r_audio))
savemat("recovered.mat", {"data": recovered_data})

# Time-domain Viewer
fig, axes = plt.subplots(4, 1, figsize=(10, 9))

axes[0].plot(t, x)
axes[0].set_title("Original Signal x(t)")

axes[1].step(t, p, where="post")
axes[1].set_title("Sampling Pulse p(t)")

axes[2].plot(t, s)
axes[2].set_title("Sampled Signal s(t)")

axes[3].plot(t, r)
axes[3].set_title("Recovered Signal r(t)")

for ax in axes:
    ax.set_xlabel("Time (s)")
    ax.set_ylabel("Amplitude")
    ax.grid(True)

plt.tight_layout()
plt.show()`,
          "prompt": `문제 3.B에서 작성한 py 스크립트에 아래를 추가하자. 즉, scipy.signal 라이브러리를 이용하여 LPF를 설계하고, 복원 신호 $r(t)$를 생성하자. LPF의 통과대역 경계 주파수(변수 'fc')는 문제 3.C4에서 구한 값으로 설정하고, 시뮬레이션 시간을 'T=0.05'초로 설정하시오.
\`\`\`  
# 문제 3.B의 py 스크립트에 아래를 추가.

# LPF 설계 및 신호 복원
from scipy import signal

fc = 4000
sos = signal.butter(
    N=8,
    Wn=fc,
    btype="lowpass",
    fs=1 / dt,
    output="sos"
)

r = signal.sosfilt(sos, s)

# 복원 신호를 원래 사운드의 샘플링 주파수로 변환, 실습과 상관없는 부분
from math import gcd

fs_audio = round(1 / np.mean(np.diff(data[0])))
fs_calc = round(1 / dt)
g = gcd(fs_audio, fs_calc)
r_audio = signal.resample_poly(r, fs_audio // g, fs_calc // g)

# 시간 데이터와 복원 신호 저장
t_audio = np.arange(len(r_audio)) / fs_audio
recovered_data = np.vstack((t_audio, r_audio))
savemat("recovered.mat", {"data": recovered_data})
\`\`\`     
이후, [그림 7.7]에 해당하는 Time-domain Viewer를 추가하기 위해 아래를 추가하자.
\`\`\`  
# 문제 3.C5의 py 스크립트에 아래(Time-domain Viewer)를 추가.
fig, axes = plt.subplots(4, 1, figsize=(10, 9))

axes[0].plot(t, x)
axes[0].set_title("Original Signal x(t)")

axes[1].step(t, p, where="post")
axes[1].set_title("Sampling Pulse p(t)")

axes[2].plot(t, s)
axes[2].set_title("Sampled Signal s(t)")

axes[3].plot(t, r)
axes[3].set_title("Recovered Signal r(t)")

for ax in axes:
    ax.set_xlabel("Time (s)")
    ax.set_ylabel("Amplitude")
    ax.grid(True)

plt.tight_layout()
plt.show()
\`\`\`
Time-domain Viewer를 추가하여, 다음 4개의 신호를 Matplotlib으로 출력하고 결과 그래프를 확인하시오.
- 원래 신호 $x(t)$
- 샘플링 펄스 신호 $p(t)$
- 샘플링된 신호 $s(t)$
- 복원된 신호 $r(t)$`,
          referenceAnswer: `주어진 Python 코드에서 8차 Butterworth LPF를 설계하고 샘플링 신호 $s(t)$에 적용하여 복원 신호 $r(t)$를 생성한다.

실험 조건은 다음과 같다.

- 시뮬레이션 시간: $T=0.05$초
- 샘플링 주파수: $F_s=8$ kHz
- 샘플링 펄스폭: 주기의 10%
- LPF 차단 주파수: $f_c=4$ kHz
- LPF 차수: 8차

실행 결과에서 다음 네 가지 시간 영역 파형을 확인할 수 있다.

1. $x(t)$: 원래 사운드 신호
2. $p(t)$: 일정한 간격으로 발생하는 샘플링 펄스 신호
3. $s(t)$: 원래 신호에 샘플링 펄스를 곱한 신호
4. $r(t)$: 샘플링된 신호를 LPF에 통과시켜 얻은 복원 신호

복원 신호 $r(t)$에서는 샘플링 펄스에 의한 급격한 변화가 완화되고, 원래 신호 $x(t)$와 유사한 연속적인 파형이 나타나는 것을 확인할 수 있다.

다만 복원 신호의 진폭은 원래 신호보다 작으며, LPF에 의한 시간 지연도 나타난다.`,

        },
        {
          "id": "7-3C6",
          "title": "3.C6.",
          "type": "essay",
          "prompt": `문제 3.C5의 실행 결과에서 원래 신호 $x(t)$와 복원된 신호 $r(t)$를 비교하고, 다음 물음에 답하시오.
          
(a) 복원된 신호 $r(t)$의 모양이 $x(t)$와 동일한지 확인하시오. (신호 파형의 절대적인 크기가 아니라, 전체적인 모양이 일치하는지 확인할 것)
(b) (a)의 답을 통해, 문제 3.C2에서 답한 자신의 판단이 맞았는지 쓰시오.`,
          
referenceAnswer: `(a) 복원된 신호 $r(t)$는 원래 신호 $x(t)$와 전체적으로 유사한 파형을 보인다.

샘플링된 신호 $s(t)$는 매 주기의 10% 구간에서만 원래 신호의 값을 가지지만, LPF를 통과하면 불필요한 고주파 성분이 제거되어 원래 신호와 유사한 파형으로 복원된다.

다만 실제 LPF의 주파수 응답과 위상 지연으로 인해 두 파형이 완전히 일치하지는 않을 수 있다. 또한 복원 신호의 진폭은 원래 신호보다 작지만, 절대적인 크기를 제외하면 전체적인 모양은 대체로 일치한다.

(b) 문제 3.C2에서 샘플링된 신호로부터 원래 신호를 복원할 수 있다고 예상했다면, 실험 결과를 통해 자신의 판단이 맞았음을 확인할 수 있다.

반대로 원래 신호의 대부분이 0이 되었으므로 복원이 불가능하다고 예상했다면, 이번 실험을 통해 자신의 예상과 달리 LPF를 이용하여 원래 신호와 유사한 파형을 복원할 수 있음을 확인할 수 있다.

이는 원래 신호가 대역 제한되어 있고 적절한 샘플링 주파수를 사용하면, 샘플링된 신호의 중심 스펙트럼을 LPF로 추출하여 원래 신호를 복원할 수 있기 때문이다.`
        },
        {
          "id": "7-3C7",
          "title": "3.C7.",
          "type": "proof",
          "prompt": `문제 3.C5의 실행 결과에서 복원 신호 $r(t)$의 진폭이 원래 신호 $x(t)$에 비해 약 $\\dfrac{1}{10}$로 감소하는지 확인하시오.
          
문제 3.A2에서 유도한 푸리에 급수 계수 $P_n$을 참고하여, 복원된 신호의 진폭이 감소하는 이유를 수식으로 설명하시오.`,
          referenceAnswer: `복원 신호 $r(t)$의 진폭은 원래 신호 $x(t)$에 비해 대략 1/10로 감소한다.

샘플링 신호의 스펙트럼은 문제 3.A2에서 유도한 다음 식으로 표현된다.

$$
S(\\omega)=
\\sum_{n=-\\infty}^{\\infty}
P_n X(\\omega-n\\omega_s)
$$

여기서 샘플링 펄스의 높이는 1이고 펄스폭은 주기의 10%이므로, 직류 성분에 해당하는 푸리에 급수 계수는 다음과 같다.

$$
P_0=\\frac{1}{T_s}
\\int_0^{T_s/10}1\\,dt
=\\frac{1}{10}
$$

이상적인 LPF를 이용하여 $n=0$에 해당하는 중심 스펙트럼만 추출하면 다음과 같다.

$$
R(\\omega)=P_0X(\\omega)
=\\frac{1}{10}X(\\omega)
$$

따라서 시간 영역의 복원 신호는 이상적인 경우 다음과 같다.

$$
\\boxed{r(t)=\\frac{1}{10}x(t)}
$$

즉, 복원 신호의 진폭이 원래 신호에 비해 1/10로 감소하는 이유는 샘플링 펄스의 듀티비가 10%이기 때문이다.

실제 실험에서는 Butterworth LPF의 주파수 응답과 시간 지연으로 인해 정확히 1/10이 되지는 않지만, 전체적인 진폭은 대략 1/10로 감소하는 것을 확인할 수 있다.`
        },
        {
          "id": "7-3C8",
          "title": "3.C8.",
          "type": "python",
          consoleEnabled: true,
          "prompt": `문제 3.C5의 py 스크립트에서 시뮬레이션 시간 'T = 4'초로 설정하고 코드를 실행하시오. 실행 후, Console에서 아래를 실행하면, [그림 7.3]의 4가지 신호($x(t), p(t), s(t), r(t)$) 중 어떤 신호가 재생되는 것인지 쓰시오.
\`\`\`  
>>> signal = loadmat("recovered.mat")["data"]
>>> signal_play(signal[1], fs_audio)
\`\`\``,
          referenceAnswer: `시뮬레이션 시간을 4초로 변경하여 실행하면, LPF를 통과한 복원 신호 $r(t)$가 생성되어 recovered.mat 파일에 저장된다.

Console에서 다음 명령을 실행한다.

\`\`\`python
>>> signal = loadmat("recovered.mat")["data"]
>>> signal_play(signal[1], fs_audio)
\`\`\`

recovered.mat에는 복원된 신호 $r(t)$를 원래 사운드의 샘플링 주파수에 맞게 변환한 데이터가 저장되어 있다.

따라서 네 가지 신호 $x(t)$, $p(t)$, $s(t)$, $r(t)$ 중 **복원된 신호 $r(t)$가 재생된다.**`,
        },
        {
          "id": "7-3C9",
          "title": "3.C9.",
          "type": "essay",
          "prompt": `문제 3.C8에서 재생한 복원 신호 $r(t)$와 문제 2.A3에서 재생한 원래 사운드 $x(t)$를 비교하시오.

두 사운드가 동일하게 들리는지 확인하고, 원래 사운드와 차이가 있다면 어떤 차이가 발생하는지 쓰시오.`,
          referenceAnswer: `LPF를 이용하여 복원한 사운드 $r(t)$를 재생하면 원래 사운드 $x(t)$와 유사한 소리를 들을 수 있다.

샘플링된 사운드 $s(t)$에 비해 주기적인 샘플링으로 발생한 불필요한 고주파 성분이 감소하므로, 원래 사운드에 더 가까운 소리로 복원된다.

그러나 실제 LPF의 주파수 응답과 원래 신호의 대역폭 경계에서 발생하는 왜곡으로 인해 원래 사운드와 완전히 동일하게 들리지는 않을 수 있다.

또한 복원 신호의 진폭은 원래 신호보다 작지만, 실습에서 사용하는 signal_play()는 재생 전에 신호의 최대 진폭을 기준으로 정규화하므로, 진폭 감소가 재생 음량에 그대로 반영되지는 않을 수 있다.

따라서 복원된 사운드의 내용은 원래 사운드와 대체로 유사하며, 음질이나 일부 주파수 성분에서는 차이가 발생할 수 있다.`
        },
        { //문제 3.D
          "id": "7-3D",
          "title": "3.D.",
          "prompt": `샘플링 펄스의 폭을 더욱 좁혀, 이상적인 임펄스 샘플링에 시간적으로 더 가까워지는 경우를 실험해 보자.`
        },
        {
          "id": "7-3D1",
          "title": "3.D1.",
          "type": "essay",
          "prompt": `문제 3.C5의 py 스크립트에서 19번째 라인 'pulse_width = 1'로 설정하면, $s(t)$는 $\\boxed{\\phantom{\\Large A}\\, ① \\phantom{\\Large A}}$% 시간 영역에서 $x(t)$와 같고, 나머지 $\\boxed{\\phantom{\\Large A}\\, ② \\phantom{\\Large A}}$% 시간 영역은 $0$이 된다. 빈칸에 들어갈 숫자를 채우시오.`,
          referenceAnswer: `① 1
② 99

샘플링 펄스폭을 주기의 1%로 설정하면, 샘플링 신호 $s(t)$는 전체 시간의 1% 구간에서 원래 신호 $x(t)$와 동일하고 나머지 99% 구간에서는 0이 된다.

이는 $s(t)=x(t)p(t)$이고, 펄스 신호 $p(t)$가 한 주기의 1% 구간에서 1, 나머지 99% 구간에서 0이기 때문이다.`,
        },
        {
          "id": "7-3D2",
          "title": "3.D2.",
          "type": "python",
          consoleEnabled: true,
          "prompt": `문제 3.C5의 py 스크립트를 복사하여 붙여넣은 후, 아래와 같이 수정하시오.
- 10번째 라인: 'T = 4'
- 11번째 라인: 'dt = 1 / 800000'
- 19번째 라인: 'pulse_width = 1'

이후 py 스크립트 실행 후, Console에서 아래를 실행하여 $r(t)$ 신호를 재생하고, 제대로 복원되었는지 쓰시오.
\`\`\`  
>>> signal = loadmat("recovered.mat")["data"]
>>> signal_play(signal[1], fs_audio)
\`\`\``,
          referenceAnswer: `문제 3.C5의 Python 스크립트에서 다음과 같이 실험 조건을 변경한다.

- 시뮬레이션 시간: $T=4$초
- 계산 시간 간격: $dt=1/800000$초
- 샘플링 주파수: $F_s=8$ kHz
- 샘플링 펄스폭: 주기의 1%

계산 주파수가 800 kHz이므로 한 샘플링 주기는 100개의 계산 샘플로 표현되며, 펄스폭 1%는 정확히 1개의 계산 샘플에 해당한다.

Python 스크립트를 실행한 후 Console에서 다음 명령으로 복원된 신호 $r(t)$를 재생한다.

\`\`\`python
>>> signal = loadmat("recovered.mat")["data"]
>>> signal_play(signal[1], fs_audio)
\`\`\`

펄스폭을 1%로 줄이더라도 샘플링 주파수는 8 kHz로 유지되므로, 원래 신호의 스펙트럼을 중심으로 반복되는 스펙트럼의 간격은 변하지 않는다.

다만 펄스폭이 10%에서 1%로 감소하면서 샘플링 펄스의 직류 성분 $P_0$는 0.1에서 0.01로 감소한다.

따라서 이상적인 LPF로 복원했을 때의 신호는 다음과 같다.

$$
r(t)=0.01x(t)
$$

즉, 복원 신호의 진폭은 원래 신호의 약 1/100이지만, 전체적인 파형과 사운드 내용은 원래 신호와 유사하게 복원될 것으로 예상된다.

실제 실험에서는 Butterworth LPF의 주파수 응답과 지연으로 인해 복원 오차가 발생할 수 있다. 또한 signal_play()는 재생 전에 최대 진폭을 기준으로 정규화하므로, 복원 신호의 진폭 감소가 재생 음량에 그대로 반영되지는 않는다.`
        },
        { // 문제 3.E
  "id": "7-3E",
  "title": "3.E.",
  "prompt": `샘플링 주파수와 신호 복원 여부의 관계를 알아보자.

문제 3.C에서 사용한 LPF 복원 시스템을 그대로 이용하되, 샘플링 주파수 $F_s$를 변경하여 샘플링된 신호 $s(t)$의 스펙트럼과 복원된 신호 $r(t)$의 변화를 관찰하자. 본 실험에서는 샘플링 주파수를 변경하더라도 펄스폭의 절대적인 길이는 $12.5$ μs로 일정하게 유지한다.`
},
{
  "id": "7-3E1",
  "title": "3.E1.",
  "type": "essay",
  "prompt": `샘플링된 신호에서 신호 처리량, 즉 $s(t)$에서 0이 아닌 부분이 차지하는 시간 영역의 비율을 줄이는 방법을 생각해 보자.

샘플링 펄스의 절대적인 길이가 일정하게 유지된다고 가정할 때, 신호 처리량을 줄이려면 샘플링 펄스의 주기 $T_s$를 증가시켜야 하는가, 감소시켜야 하는가? 그 이유를 설명하시오.`,
referenceAnswer: `샘플링된 신호에서 0이 아닌 부분이 차지하는 시간의 비율을 줄이려면 샘플링 펄스의 주기 $T_s$를 증가시켜야 한다.

펄스폭의 절대적인 길이를 $\\tau$라고 하면, 한 주기에서 펄스가 차지하는 비율은 다음과 같다.

$$
D=\\frac{\\tau}{T_s}=\\tau F_s
$$

따라서 펄스폭 $\\tau$를 일정하게 유지하면서 샘플링 주기 $T_s$를 증가시키면, 한 주기에서 펄스가 차지하는 비율이 감소한다.

예를 들어 펄스폭을 12.5 μs로 유지하면서 샘플링 주파수를 8 kHz에서 4 kHz로 줄이면, 펄스가 차지하는 비율은 10%에서 5%로 감소한다.

다만 샘플링 주파수를 지나치게 낮추면 앨리어싱이 발생하여 원래 신호를 왜곡 없이 복원하지 못할 수 있다.`,
},
{
  "id": "7-3E2",
  "title": "3.E2.",
  "type": "proof",
  "prompt": `문제 3.A2의 실험 조건에서 샘플링 주파수를 $F_s=4$ kHz로 변경하고, 펄스폭을 주기의 $5\\%$로 변경하자. 이는 펄스폭의 절대적인 길이를 유지하면서 샘플링 주파수를 기존 8 kHz의 절반으로 줄인 경우이다. 이 조건에서 샘플링된 신호 $s(t)=x(t)p(t)$의 주파수 스펙트럼 $S(\\omega)$를 문제 3.A2와 같은 방법으로 유도하시오.

다음 식의 빈칸 ①, ②를 채우고, 원래 신호의 스펙트럼 $X(\\omega)$가 주파수 영역에서 어떻게 반복되는지 설명하시오.
$$
S(\\omega)=
\\sum_{n=-\\infty}^{\\infty}
\\boxed{\\phantom{\\Large A}\\,①\\phantom{\\Large A}}
\\times X\\left(
\\omega-n\\times
\\boxed{\\phantom{\\Large A}\\,②\\phantom{\\Large A}}
\\right)
$$
단, 원래 신호 $x(t)$의 대역폭은 4 kHz이며, 스펙트럼 $X(\\omega)$는 [그림 7.4]의 삼각형 모양이라고 가정한다.

또한, 샘플링 펄스 신호의 푸리에 급수 계수 $P_n$의 절댓값을 sinc 함수로 유도하시오.`,
referenceAnswer: `**①, ②의 정답**

- ①: $P_n$
- ②: $\\omega_s=2\\pi F_s=8000\\pi$ rad/s

따라서 샘플링된 신호의 스펙트럼은 다음과 같다.

$$
S(\\omega)=
\\sum_{n=-\\infty}^{\\infty}
P_nX(\\omega-n\\omega_s)
$$

**1. 샘플링된 신호의 스펙트럼 유도**

샘플링 펄스 신호 $p(t)$는 주기 신호이므로 푸리에 급수로 표현할 수 있다.

$$
p(t)=\\sum_{n=-\\infty}^{\\infty}
P_ne^{jn\\omega_st}
$$

여기서,

$$
\\omega_s=2\\pi F_s
=2\\pi\\times4000
=8000\\pi\\;\\mathrm{rad/s}
$$

이다.

$p(t)$를 푸리에 변환하면,

$$
P(\\omega)=2\\pi
\\sum_{n=-\\infty}^{\\infty}
P_n\\delta(\\omega-n\\omega_s)
$$

이다.

시간 영역에서 $s(t)=x(t)p(t)$이므로, 주파수 영역에서는 컨볼루션 관계에 의해 다음과 같다.

$$
S(\\omega)=
\\frac{1}{2\\pi}
X(\\omega)*P(\\omega)
$$

여기에 $P(\\omega)$를 대입하면,

$$
\\boxed{
S(\\omega)=
\\sum_{n=-\\infty}^{\\infty}
P_nX(\\omega-n\\omega_s)
}
$$

을 얻는다.

**2. 푸리에 급수 계수 $P_n$ 유도**

샘플링 주파수가 4 kHz이므로 펄스 주기는 다음과 같다.

$$
T_s=\\frac{1}{4000}
=250\\;\\mu\\mathrm{s}
$$

펄스폭은 주기의 5%이므로,

$$
\\tau=0.05T_s
=12.5\\;\\mu\\mathrm{s}
$$

이다.

펄스의 높이가 1이고, 매 주기의 시작점부터 $\\tau$까지 펄스가 발생한다고 하면,

$$
P_n=
\\frac{1}{T_s}
\\int_0^\\tau
e^{-jn\\omega_st}\\,dt
$$

이다.

$n\\neq0$인 경우 적분하고 정리하면,

$$
P_n=
\\frac{\\tau}{T_s}
\\frac{\\sin(n\\omega_s\\tau/2)}
{n\\omega_s\\tau/2}
e^{-jn\\omega_s\\tau/2}
$$

이다.

$\\tau/T_s=0.05$를 대입하면,

$$
P_n=
0.05\\,
\\mathrm{sinc}(0.05n)
e^{-jn\\pi/20}
$$

이다.

여기서 정규화된 sinc 함수는 다음과 같이 정의한다.

$$
\\mathrm{sinc}(u)=
\\frac{\\sin(\\pi u)}{\\pi u}
$$

따라서 푸리에 급수 계수의 절댓값은,

$$
\\boxed{
|P_n|=
0.05\\left|
\\mathrm{sinc}(0.05n)
\\right|
}
$$

이다. $n=0$에서는 $P_0=0.05$이며, 첫 번째 영점은 $n=\\pm20$에서 발생한다. 따라서 sinc 포락선의 첫 번째 영점은 ±80 kHz에 해당한다.

**3. 주파수 영역의 스펙트럼**

원래 신호의 스펙트럼 $X(\\omega)$는 -4~4 kHz 범위에 존재한다.

샘플링 주파수가 4 kHz이므로 원래 신호의 삼각형 스펙트럼은 다음 위치를 중심으로 반복된다.

- $n=0$: 0 kHz
- $n=\\pm1$: ±4 kHz
- $n=\\pm2$: ±8 kHz
- $n=\\pm3$: ±12 kHz
- ...

각 반복 스펙트럼의 한쪽 폭은 4 kHz이므로 인접한 삼각형 스펙트럼들이 서로 겹친다.

스펙트럼을 그릴 때는 4 kHz 간격으로 삼각형을 반복하여 배치하고, 각 삼각형의 크기에 해당하는 $|P_n|$을 반영한다. 전체 스펙트럼은 각 반복 성분이 겹쳐 더해진 형태로 나타난다.

따라서 샘플링 주파수가 8 kHz였던 경우와 달리, 중심 스펙트럼과 인접한 반복 스펙트럼 사이에 앨리어싱이 발생한다.`
},
{
  "id": "7-3E3",
  "title": "3.E3.",
  "type": "python",
  consoleEnabled: true,
  starterCode: `import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat, savemat

# 사운드 데이터 불러오기
file_load("ch7/sound_CH7.mat")
data = loadmat("sound_CH7.mat")["data"]

# 실험 조건
T = 4
dt = 1 / 160000
t = np.arange(0, T, dt)

# 원래 사운드 신호
x = np.interp(t, data[0], data[1])

# 샘플링 펄스 신호
Fs = 4000
pulse_width = 5
samples_per_period = round(1 / (Fs * dt))
samples_per_pulse = round(samples_per_period * pulse_width / 100)
n = np.arange(len(t))
p = ((n % samples_per_period) < samples_per_pulse).astype(float)

# 샘플링된 신호
s = x * p

# 시간 데이터와 샘플링된 신호를 sampled.mat으로 저장
sampled_data = np.vstack((t, s))
savemat("sampled.mat", {"data": sampled_data})

# LPF 설계 및 신호 복원
from scipy import signal

fc = 4000
sos = signal.butter(
    N=8,
    Wn=fc,
    btype="lowpass",
    fs=1 / dt,
    output="sos"
)

r = signal.sosfilt(sos, s)

# 복원 신호를 원래 사운드의 샘플링 주파수로 변환, 실습과 상관없는 부분
from math import gcd

fs_audio = round(1 / np.mean(np.diff(data[0])))
fs_calc = round(1 / dt)
g = gcd(fs_audio, fs_calc)
r_audio = signal.resample_poly(r, fs_audio // g, fs_calc // g)

# 시간 데이터와 복원 신호 저장
t_audio = np.arange(len(r_audio)) / fs_audio
recovered_data = np.vstack((t_audio, r_audio))
savemat("recovered.mat", {"data": recovered_data})`,
  "prompt": `문제 3.C5의 py 스크립트를 복사하여 붙여넣은 후, 아래와 같이 수정하시오.
- 10번째 라인: 'T = 4'
- 18번째 라인: 'Fs = 4000'
- 19번째 라인: 'pulse_width = 5'

수정한 py 스크립트 실행 후, Console에서 'spectrum_view()'를 이용하여 샘플링된 신호 $s(t)$의 주파수 스펙트럼 $S(f)$를 출력하시오.
\`\`\`python
>>> spectrum_view(s, fs_calc, ymin=-40, ymax=25, frequency_limit_hz=80000)
\`\`\`
스펙트럼에서 반복되는 성분들의 주파수 간격과 전체적인 모양을 관찰하고, 결과 그래프를 제시하시오.`,
referenceAnswer: `샘플링 주파수를 4 kHz, 펄스폭을 주기의 5%로 설정하여 Python 스크립트를 실행한다.

실험 조건은 다음과 같다.

- 샘플링 주파수: 4 kHz
- 샘플링 펄스 주기: 250 μs
- 펄스폭: 12.5 μs
- 계산 시간 간격: 1/160000초

한 샘플링 주기는 계산 샘플 40개, 펄스폭은 2개에 해당하므로 펄스폭의 절대적인 길이는 기존과 동일하게 유지된다.

Console에서 spectrum_view()를 실행하면 원래 신호의 스펙트럼이 약 4 kHz 간격으로 반복되는 형태를 관찰할 수 있다.

각 반복 스펙트럼은 서로 겹치므로, 실제 사운드 신호의 스펙트럼에서는 삼각형이 명확하게 구분되지 않을 수 있다.`,
},
{
  "id": "7-3E4",
  "title": "3.E4.",
  "type": "essay",
  "prompt": `문제 3.E3에서 관찰한 $S(f)$의 스펙트럼이 문제 3.E2에서 유도한 수식과 그림에 부합하는지 쓰시오.

스펙트럼의 순간적인 크기보다는 반복되는 스펙트럼의 주파수 간격과 전체적인 모양에 집중하여 비교하시오.`,
referenceAnswer: `문제 3.E3에서 관찰한 스펙트럼은 문제 3.E2에서 유도한 수식과 전체적으로 부합한다.

문제 3.E2에서 유도한 식은 다음과 같다.

$$
S(\\omega)=
\\sum_{n=-\\infty}^{\\infty}
P_nX(\\omega-n\\omega_s)
$$

샘플링 주파수가 4 kHz이므로 원래 신호의 스펙트럼은 4 kHz의 정수배를 중심으로 반복된다.

원래 신호의 대역폭은 4 kHz이므로 반복되는 스펙트럼들이 서로 겹친다. 따라서 실험 결과에서도 반복되는 성분의 간격이 약 4 kHz이고, 여러 주파수 성분이 중첩된 형태를 관찰할 수 있다.

다만 문제 3.E2에서는 원래 신호의 스펙트럼을 이상적인 삼각형으로 가정했지만, 실험에서는 실제 사운드 데이터를 사용하므로 세부적인 스펙트럼의 모양에는 차이가 발생할 수 있다.`,
},
{
  "id": "7-3E5",
  "title": "3.E5.",
  "type": "essay",
  "prompt": `문제 3.E3에서 관찰한 $F_s=4$ kHz의 스펙트럼과 문제 3.B7에서 관찰한 $F_s=8$ kHz의 스펙트럼을 비교하시오.

(a) 두 스펙트럼에서 반복되는 성분들의 주파수 간격은 각각 얼마인가?
(b) 두 스펙트럼에서 나타나는 가장 두드러진 차이점을 쓰시오.
(c) (b)에서 관찰한 차이점을 바탕으로, $F_s=4$ kHz인 경우 샘플링된 신호 $s(t)$로부터 원래 신호 $x(t)$를 왜곡 없이 복원할 수 없는 이유를 설명하시오.

(참고. 샘플링 주파수가 충분히 높지 않아 반복된 스펙트럼이 서로 겹치는 현상을 앨리어싱(Aliasing)이라고 함)`,
referenceAnswer: `(a) 반복되는 스펙트럼의 주파수 간격

- $F_s=4$ kHz인 경우: 4 kHz
- $F_s=8$ kHz인 경우: 8 kHz

(b) 두 스펙트럼의 차이점

샘플링 주파수가 8 kHz인 경우 원래 신호의 대역폭이 4 kHz이므로, 이상적인 대역제한 신호에서는 중심 스펙트럼과 인접한 반복 스펙트럼이 경계에서만 만난다.

반면 샘플링 주파수가 4 kHz인 경우에는 반복 간격이 좁아져 인접한 스펙트럼들이 서로 겹친다.

따라서 4 kHz로 샘플링한 경우에는 앨리어싱이 발생한다.

(c) 원래 신호를 왜곡 없이 복원할 수 없는 이유

샘플링 주파수가 4 kHz이면 중심 스펙트럼은 -4~4 kHz에 존재하고, 인접한 반복 스펙트럼은 0~8 kHz와 -8~0 kHz에 존재한다.

따라서 중심 스펙트럼과 반복 스펙트럼이 서로 겹쳐 원래 신호에 없었던 주파수 성분이 중심 대역에 포함된다.

LPF는 주파수에 따라 성분을 통과시키거나 제거할 수 있지만, 동일한 주파수에 겹쳐 있는 원래 신호의 성분과 앨리어싱 성분을 구분하여 분리할 수는 없다.

따라서 $F_s=4$ kHz에서는 LPF만으로 원래 신호를 왜곡 없이 복원할 수 없다.`,
},
{
  "id": "7-3E6",
  "title": "3.E6.",
  "type": "python",
  consoleEnabled: true,
  "prompt": `문제 3.E3의 py 스크립트를 복사하여 붙여넣은 후, Console에서 아래 명령을 실행하여 복원된 신호를 재생하시오.
\`\`\`python
>>> signal = loadmat("recovered.mat")["data"]
>>> signal_play(signal[1], fs_audio)
\`\`\`
문제 3.C8에서 재생한 8 kHz 샘플링의 복원 신호와 비교하여 어떠한 차이가 들리는지 쓰고, 원래 사운드가 제대로 복원되었는지 설명하시오.`,
referenceAnswer: `문제 3.E3에서 샘플링 주파수를 4 kHz로 설정한 상태로 Python 스크립트를 실행하고, recovered.mat 파일에 저장된 복원 신호를 재생한다.

원래 신호의 대역폭이 4 kHz인 경우 4 kHz 샘플링은 Nyquist Rate인 8 kHz보다 낮으므로 앨리어싱이 발생한다.

따라서 8 kHz 샘플링으로 복원한 사운드와 비교하면 원래 사운드의 일부 주파수 성분이 다른 주파수로 겹쳐 나타나 음색 변화나 왜곡이 발생할 수 있다.

특히 고주파 성분이 상대적으로 많은 구간에서 두 사운드의 차이가 나타날 수 있다.

따라서 4 kHz 샘플링으로 복원된 사운드는 원래 사운드와 유사한 부분이 남아 있더라도, 원래 신호를 왜곡 없이 복원한 결과라고 볼 수 없다.

구체적인 청취 결과는 실제로 재생한 사운드에서 관찰한 차이를 바탕으로 작성한다.`
},
        {
          "id": "7-3E7",
          "title": "3.E7.",
          "type": "python",
          consoleEnabled: true,
          "prompt": `문제 3.E3의 py 스크립트를 이용하여 샘플링 주파수 $F_s$를 2 kHz, 5 kHz, 6.4 kHz, 10 kHz로 각각 변경하여 실험하시오.
모든 실험에서 펄스폭의 절대적인 길이는 $12.5$ μs로 일정하게 유지해야 하므로, 다음과 같이 설정하시오.
[[table:
샘플링 주파수 | Fs | pulse_width
2 kHz | 2000 | 2.5
5 kHz | 5000 | 6.25
6.4 kHz | 6400 | 8
10 kHz | 10000 | 12.5
]]
각 실험에서 다음 과정을 수행하시오.

(a) 샘플링된 신호 $s(t)$의 스펙트럼 $S(f)$를 관찰하고, 반복되는 스펙트럼의 간격과 겹침 여부를 확인하시오.
\`\`\`python
>>> spectrum_view(s, fs_calc, ymin=-40, ymax=25, frequency_limit_hz=80000)
\`\`\`
(b) 복원된 신호 $r(t)$를 'recovered.mat' 파일에 저장한 다음, Console에서 재생하시오.
\`\`\`python
>>> signal = loadmat("recovered.mat")["data"]
>>> signal_play(signal[1], fs_audio)
\`\`\`
(c) 각 샘플링 주파수에서 복원된 사운드가 어떻게 들리는지 쓰고, 원래 사운드와 비교하시오.

(주의. 실험 조건을 변경한 후에는 py 스크립트를 다시 실행해야 한다. 또한, 'recovered.mat' 파일은 실행할 때마다 새 결과로 교체되므로, 각 조건의 사운드를 차례로 재생하여 비교할 것)`,
          
referenceAnswer: `펄스폭의 절대적인 길이를 12.5 μs로 유지하고 샘플링 주파수를 2 kHz, 5 kHz, 6.4 kHz, 10 kHz로 변경하여 실험한다.

(a) 스펙트럼 비교

| 샘플링 주파수 | 반복 간격 | 이상적인 스펙트럼의 겹침 여부 |
|---|---|---|
| 2 kHz | 2 kHz | 겹침 발생 |
| 5 kHz | 5 kHz | 겹침 발생 |
| 6.4 kHz | 6.4 kHz | 겹침 발생 |
| 10 kHz | 10 kHz | 겹치지 않음 |

원래 신호의 대역폭은 4 kHz이므로 Nyquist Rate는 8 kHz이다. 따라서 8 kHz보다 낮은 2 kHz, 5 kHz, 6.4 kHz에서는 앨리어싱이 발생하며, 10 kHz에서는 이상적인 대역제한 신호를 가정할 때 앨리어싱이 발생하지 않는다.

(b), (c) 사운드 재생 및 비교

**2 kHz**

반복 스펙트럼의 간격이 매우 좁아져 여러 스펙트럼이 크게 겹친다. 따라서 원래 사운드와 비교했을 때 상당한 음색 변화나 왜곡이 발생할 수 있다.

**5 kHz**

반복 스펙트럼의 간격은 5 kHz로, 2 kHz일 때보다 넓지만 여전히 Nyquist Rate보다 낮아 앨리어싱이 발생한다. 따라서 복원된 사운드에 왜곡이 남을 수 있다.

**6.4 kHz**

반복 스펙트럼의 간격이 6.4 kHz로 증가하지만, 원래 신호의 대역폭인 4 kHz에 대한 Nyquist Rate보다 낮으므로 앨리어싱이 발생한다. 원래 사운드와 비교했을 때 일부 성분이 왜곡될 수 있다.

**10 kHz**

샘플링 주파수가 Nyquist Rate인 8 kHz보다 높으므로, 이상적인 대역제한 신호에서는 반복 스펙트럼들이 서로 겹치지 않는다.

따라서 LPF를 이용하여 중심 스펙트럼을 분리하고 원래 신호와 유사한 사운드를 복원할 수 있다.

다만 실제 실험에서는 원래 사운드의 대역 밖 성분과 Butterworth LPF의 비이상적인 특성 때문에 완전한 복원이 이루어지지 않을 수 있다.

각 조건에서 실제로 들리는 소리의 차이는 학생이 실행한 결과를 바탕으로 기록한다.`

        },
        {
          "id": "7-3E8",
          "title": "3.E8.",
          "type": "essay",
          "prompt": `지금까지 수행한 문제 3.B~3.E의 실험 결과를 종합하시오.

샘플링된 신호 $s(t)$로부터 원래 신호 $x(t)$를 왜곡 없이 복원하려면, 샘플링 주파수 $F_s$는 원래 신호의 대역폭 $B$에 대해 어떤 조건을 만족해야 하는가? 이 조건을 수식으로 나타내고, 본 실습에서 사용한 대역폭 $B=4$ kHz인 사운드 신호에 적용하시오.`,
          referenceAnswer: `샘플링된 신호로부터 원래 신호를 왜곡 없이 복원하려면 샘플링 주파수 $F_s$가 원래 신호의 대역폭 $B$의 두 배 이상이어야 한다.

$$
\\boxed{F_s\\geq 2B}
$$

이 조건을 Nyquist 조건이라고 하며, $2B$를 Nyquist Rate라고 한다.

본 실습에서 사용하는 사운드 신호의 대역폭은 4 kHz이므로,

$$
F_s\\geq 2\\times4
=8\\;\\mathrm{kHz}
$$

이다.

따라서 이론적인 최소 샘플링 주파수는 8 kHz이다.

실제 시스템에서는 신호의 대역 밖 성분과 복원 필터의 전이대역 등을 고려하여 8 kHz보다 높은 샘플링 주파수를 사용하는 것이 바람직하다.`,
        },
        {
  "id": "7-3E9",
  "title": "3.E9.",
  "type": "proof",
  "prompt": `문제 3.E8에서 제시한 샘플링 주파수의 조건이 필요한 이유를 주파수 영역에서 수식으로 설명하시오. 문제 3.A2에서 유도한 식을 이용하시오. 여기서 $\\omega_s=2\\pi F_s$이고, 원래 신호 $X(\\omega)$는 $-2\\pi B$에서 $2\\pi B$까지 존재한다고 가정한다.

(a) $n=0$인 중심 스펙트럼과 $n=1$인 인접 스펙트럼이 서로 겹치지 않기 위한 조건을 유도하시오.
(b) 유도한 조건을 샘플링 주파수 $F_s$와 대역폭 $B$를 이용하여 나타내시오.
(c) $B=4$ kHz이고 $F_s=4$ kHz인 경우, 중심 스펙트럼과 인접 스펙트럼이 서로 겹치는 주파수 범위를 구하고, 이 경우 LPF만으로 원래 신호를 왜곡 없이 복원할 수 없는 이유를 설명하시오.`,
          referenceAnswer: `(a) 중심 스펙트럼과 인접 스펙트럼이 겹치지 않기 위한 조건

샘플링 신호의 스펙트럼은 다음과 같다.

$$
S(\\omega)=
\\sum_{n=-\\infty}^{\\infty}
P_nX(\\omega-n\\omega_s)
$$

원래 신호의 스펙트럼 $X(\\omega)$는 다음 범위에 존재한다.

$$
-2\\pi B\\leq\\omega\\leq2\\pi B
$$

따라서 $n=0$인 중심 스펙트럼의 주파수 범위는 다음과 같다.

$$
[-2\\pi B,\\;2\\pi B]
$$

$n=1$인 인접 스펙트럼은 $\\omega_s$만큼 오른쪽으로 이동하므로 다음 범위에 존재한다.

$$
[\\omega_s-2\\pi B,\\;
\\omega_s+2\\pi B]
$$

두 스펙트럼이 서로 겹치지 않으려면 중심 스펙트럼의 오른쪽 경계가 인접 스펙트럼의 왼쪽 경계보다 작거나 같아야 한다.

$$
2\\pi B\\leq
\\omega_s-2\\pi B
$$

따라서,

$$
\\boxed{\\omega_s\\geq4\\pi B}
$$

이다.

(b) 샘플링 주파수와 대역폭을 이용한 표현

$\\omega_s=2\\pi F_s$를 대입하면,

$$
2\\pi F_s\\geq4\\pi B
$$

이므로,

$$
\\boxed{F_s\\geq2B}
$$

를 얻는다.

즉, 샘플링 주파수는 원래 신호의 대역폭의 두 배 이상이어야 한다.

(c) $B=4$ kHz, $F_s=4$ kHz인 경우

중심 스펙트럼의 범위는 다음과 같다.

$$
-4\\leq f\\leq4\\;\\mathrm{kHz}
$$

$n=1$인 인접 스펙트럼은 4 kHz만큼 이동하므로,

$$
0\\leq f\\leq8\\;\\mathrm{kHz}
$$

에 존재한다.

따라서 중심 스펙트럼과 $n=1$인 인접 스펙트럼이 겹치는 범위는 다음과 같다.

$$
\\boxed{0\\leq f\\leq4\\;\\mathrm{kHz}}
$$

마찬가지로 $n=-1$인 인접 스펙트럼은 다음 범위에서 중심 스펙트럼과 겹친다.

$$
-4\\leq f\\leq0\\;\\mathrm{kHz}
$$

따라서 중심 대역 전체에 인접한 반복 스펙트럼의 성분이 겹쳐 앨리어싱이 발생한다.

LPF는 동일한 주파수에 중첩된 원래 신호의 성분과 앨리어싱 성분을 서로 분리할 수 없으므로, 원래 신호를 왜곡 없이 복원할 수 없다.`
        }
      ]
    },
    { //문제 4
      id: "7-4",
      title: "4. 사인파를 곱하지 않고, 샘플링과 BPF로 주파수 천이하기",
      problems: [
        { //문제 4.A
          id: "7-4A",
          title: "4.A.",
          "type": "proof",
          prompt: `[그림 7.3]에서 LPF 대신, 중심 주파수가 샘플링 주파수(8 kHz)이고, 대역폭이 8 kHz인 BPF로 바꿔 넣은 경우를 고려하자. 이 경우 BPF 출력을 $z(t)$라 하자. 샘플링 신호 $p(t)$는 [그림 7.5]와 같다.

문제 3.A2에서 구한 $S(\\omega)$의 수식과 문제 3.B7에서 확인한 스펙트럼 결과를 바탕으로, $s(t)$가 BPF를 통과했을 때 출력 $z(t)$의 스펙트럼 $Z(\\omega)$의 모양(중심, 크기)을 알 수 있다. $Z(\\omega)$의 모양을 바탕으로, $Z(\\omega)$를 $P_n$과 $X(\\omega)$의 수식으로 유도하시오.

단, $z(t)$는 실수 신호이며, BPF는 지연 시간이 없고 이상적이며 양의 주파수 대역과 이에 대응하는 음의 주파수 대역을 모두 통과시킨다고 가정한다.
          `,
          
referenceAnswer: `문제 3.A2에서 유도한 샘플링 신호의 스펙트럼은 다음과 같다.

$$
S(\\omega)=
\\sum_{n=-\\infty}^{\\infty}
P_nX(\\omega-n\\omega_s)
$$

여기서 샘플링 주파수는 $F_s=8$ kHz이므로,

$$
\\omega_s=2\\pi F_s=16000\\pi\\;\\mathrm{rad/s}
$$

이다.

**1. BPF를 통과하는 주파수 성분**

BPF의 중심 주파수는 8 kHz이고 대역폭은 8 kHz이다. 따라서 양의 주파수 영역에서는 4~12 kHz, 음의 주파수 영역에서는 -12~-4 kHz를 통과시킨다.

원래 신호 $X(\\omega)$의 대역폭은 4 kHz이므로, BPF는 샘플링 신호의 스펙트럼 중 $n=1$과 $n=-1$에 해당하는 반복 스펙트럼을 추출한다.

따라서 BPF 출력의 스펙트럼은 다음과 같다.

$$
\\boxed{
Z(\\omega)=
P_1X(\\omega-\\omega_s)
+
P_{-1}X(\\omega+\\omega_s)
}
$$

즉, 원래 신호의 스펙트럼이 +8 kHz와 -8 kHz를 중심으로 각각 이동한 형태이다.

**2. 스펙트럼의 크기**

문제 3.A2에서 유도한 푸리에 급수 계수는 다음과 같다.

$$
P_n=
\\frac{1}{10}
\\mathrm{sinc}\\left(\\frac{n}{10}\\right)
e^{-jn\\pi/10}
$$

따라서 $n=1$과 $n=-1$에서 계수의 절댓값은 다음과 같다.

$$
|P_1|=|P_{-1}|
=\\frac{1}{10}
\\left|\\mathrm{sinc}(0.1)\\right|
=\\frac{\\sin(\\pi/10)}{\\pi}
\\approx0.09836
$$

그러므로 BPF를 통과한 두 스펙트럼은 각각 원래 신호의 스펙트럼과 같은 모양을 가지며, 크기는 원래 스펙트럼의 약 0.09836배가 된다.

**3. 시간 영역의 출력 신호**

푸리에 변환의 주파수 이동 성질을 이용하면 BPF 출력은 다음과 같이 나타낼 수 있다.

$$
z(t)=
P_1x(t)e^{j\\omega_st}
+
P_{-1}x(t)e^{-j\\omega_st}
$$

실수 펄스 신호에서는 $P_{-1}=P_1^*$이므로,

$$
z(t)=
2|P_1|x(t)
\\cos\\left(\\omega_st+\\angle P_1\\right)
$$

이다.

주어진 펄스가 각 주기의 시작점에서 발생한다면 $\\angle P_1=-\\pi/10$이므로,

$$
\\boxed{
z(t)=
\\frac{2\\sin(\\pi/10)}{\\pi}
x(t)\\cos\\left(16000\\pi t-\\frac{\\pi}{10}\\right)
}
$$

이다.

따라서 BPF 출력 $z(t)$는 원래 신호 $x(t)$가 8 kHz 반송파에 의해 진폭 변조된 형태로 나타난다.`
        },
        { //문제 4.B
          id: "7-4B",
          title: "4.B.",
          "type": "proof",
          prompt: `$z(t)$를 시간 영역에서 해석하면, [[equation:7.2]]와 같이 $x(t)$가 들어간 수식으로 쓸 수 있다. [[equation:7.2]]의 $A, \\omega, \\theta$를 구하는 과정을 쓰시오.
$$
z(t)=Ax(t)\\cos(\\omega t+\\theta)
\\qquad \\text{(식 7.2)}
$$
          `,
          
referenceAnswer: `문제 4.A에서 구한 BPF 출력의 스펙트럼은 다음과 같다.

$$
Z(\\omega)=
P_1X(\\omega-\\omega_s)
+
P_{-1}X(\\omega+\\omega_s)
$$

이를 푸리에 역변환하면 주파수 이동 성질에 의해 다음과 같다.

$$
z(t)=
P_1x(t)e^{j\\omega_st}
+
P_{-1}x(t)e^{-j\\omega_st}
$$

샘플링 펄스 $p(t)$는 실수 신호이므로 $P_{-1}=P_1^*$이다. 따라서,

$$
z(t)=
2|P_1|x(t)
\\cos(\\omega_st+\\angle P_1)
$$

이다.

**1. 진폭 계수 $A$**

문제 3.A2에서 유도한 푸리에 급수 계수는 다음과 같다.

$$
P_n=
\\frac{1}{10}
\\mathrm{sinc}\\left(\\frac{n}{10}\\right)
e^{-jn\\pi/10}
$$

따라서,

$$
P_1=
\\frac{1}{10}
\\mathrm{sinc}(0.1)e^{-j\\pi/10}
$$

이고, 진폭 계수는 다음과 같다.

$$
A=2|P_1|
=\\frac{2}{10}\\mathrm{sinc}(0.1)
=\\frac{2\\sin(\\pi/10)}{\\pi}
\\approx0.1967
$$

**2. 각주파수 $\\omega$**

BPF의 중심 주파수는 샘플링 주파수인 8 kHz이므로,

$$
\\omega=\\omega_s
=2\\pi F_s
=2\\pi\\times8000
=16000\\pi\\;\\mathrm{rad/s}
$$

이다.

**3. 위상 $\\theta$**

매 주기의 시작점에서 펄스가 발생한다고 가정하면 $P_1$의 위상은 다음과 같다.

$$
\\theta=\\angle P_1=-\\frac{\\pi}{10}
$$

따라서 구한 값은 다음과 같다.

$$
\\boxed{
A\\approx0.1967,\\qquad
\\omega=16000\\pi,\\qquad
\\theta=-\\frac{\\pi}{10}
}
$$

이를 (식 7.2)에 대입하면 최종적으로,

$$
\\boxed{
z(t)=0.1967x(t)
\\cos\\left(16000\\pi t-\\frac{\\pi}{10}\\right)
}
$$

을 얻는다.`

        },
{ // 문제 4.C
  id: "7-4C",
  title: "4.C.",
  prompt: `문제 4.B에서 유도한 결과를 Python 실험으로 검증해 보자. 문제 3.C에서 설계한 샘플링 및 신호 복원 시스템에서 LPF를 BPF로 변경하여, 샘플링 신호 $s(t)$로부터 주파수가 천이된 신호 $z(t)$를 생성하자. 샘플링 주파수는 $F_s=8$ kHz, 샘플링 펄스폭은 주기의 10%로 설정한다.

또한 문제 4.B에서 유도한 $Ax(t)\\cos(\\omega t+\\theta)$를 직접 계산하고, BPF의 출력 $z(t)$와 비교하여 이론적으로 유도한 결과가 실험과 일치하는지 확인하자.`
},
{
  id: "7-4C1",
  title: "4.C1.",
  type: "essay",
  prompt: `중심 주파수가 8 kHz이고 대역폭이 8 kHz인 BPF를 설계하려고 한다.

(a) BPF의 하한 및 상한 주파수를 각각 Hz 단위로 구하시오.
(b) 실수 신호의 스펙트럼을 고려하여, 설계한 BPF가 통과시키는 양의 주파수 대역과 음의 주파수 대역을 각각 쓰시오.`,
  referenceAnswer: `(a) BPF의 중심 주파수는 8 kHz이고 대역폭은 8 kHz이므로, 하한 주파수와 상한 주파수는 다음과 같다.

$$
f_L=8000-\\frac{8000}{2}=4000\\;\\mathrm{Hz}
$$

$$
f_H=8000+\\frac{8000}{2}=12000\\;\\mathrm{Hz}
$$

따라서 하한 주파수는 **4000 Hz**, 상한 주파수는 **12000 Hz**이다.

(b) 실수 신호의 스펙트럼은 양의 주파수와 음의 주파수에서 켤레 대칭을 이룬다. 따라서 BPF가 통과시키는 주파수 대역은 다음과 같다.

- 양의 주파수 대역: 4~12 kHz
- 음의 주파수 대역: -12~-4 kHz

즉, BPF는 +8 kHz와 -8 kHz를 중심으로 하는 두 주파수 대역을 통과시킨다.`
},
{
  id: "7-4C2",
  title: "4.C2.",
  type: "python",
  starterCode: `import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat

# 사운드 데이터 불러오기
file_load("ch7/sound_CH7.mat")
data = loadmat("sound_CH7.mat")["data"]

# 실험 조건
T = 1e-2
dt = 1 / 160000
t = np.arange(0, T, dt)

# 원래 사운드 신호
x = np.interp(t, data[0], data[1])

# 샘플링 펄스 신호
Fs = 8000
pulse_width = 10
samples_per_period = round(1 / (Fs * dt))
samples_per_pulse = round(samples_per_period * pulse_width / 100)
n = np.arange(len(t))
p = ((n % samples_per_period) < samples_per_pulse).astype(float)

# 샘플링된 신호
s = x * p

# BPF 설계
from scipy import signal

f_low = ?? # 문제 4.C1의 하한 주파수 답
f_high = ?? # 문제 4.C1의 상한 주파수 답
sos = signal.butter(
    N=8,
    Wn=[f_low, f_high],
    btype="bandpass",
    fs=round(1 / dt),
    output="sos"
)

# BPF 출력
z = signal.sosfilt(sos, s)

# 문제 4.B에서 유도한 이론 신호
A = ??
omega = ??
theta = ??
z_theory = A * x * np.cos(omega * t + theta)

# Time-domain Viewer
fig, axes = plt.subplots(5, 1, figsize=(11, 11))

axes[0].plot(t, x)
axes[0].set_title("Original Signal x(t)")

axes[1].step(t, p, where="post")
axes[1].set_title("Sampling Pulse p(t)")

axes[2].plot(t, s)
axes[2].set_title("Sampled Signal s(t)")

axes[3].plot(t, z)
axes[3].set_title("BPF Output z(t)")

axes[4].plot(t, z_theory)
axes[4].set_title("Theoretical Signal")

for ax in axes:
    ax.set_xlabel("Time (s)")
    ax.set_ylabel("Amplitude")
    ax.grid(True)

plt.tight_layout()
plt.show()`,
  prompt: `문제 3.C5의 py 스크립트를 참고하여 LPF를 BPF로 변경하고, BPF 출력 $z(t)$를 생성하자. BPF의 하한 및 상한 주파수는 문제 4.C1에서 구한 값을 사용한다. scipy.signal 라이브러리의 'butter()' 함수를 이용하여 BPF를 설계하고, 'sosfilt()' 함수를 이용하여 샘플링된 신호 $s(t)$를 필터링한다. 또한, 문제 4.B에서 유도한 [[equation:7.2]]를 이용하여 이론 신호 'z_theory'를 생성한다. 마지막으로, Time-domain Viewer를 추가하여 원래 신호 $x(t)$, 샘플링 펄스 $p(t)$, 샘플링된 신호 $s(t)$, BPF 출력 $z(t)$ 및 이론 신호 'z_theory'를 관찰한다.

주어진 py 스크립트의 5군데 ?(라인 31~32, 45~47)를 채워 완성하시오.`,
  referenceAnswer: `주어진 Python 스크립트의 다섯 군데 빈칸은 다음과 같이 채운다.

\`\`\`python
# BPF 설계
f_low = 4000
f_high = 12000

# 문제 4.B에서 유도한 이론 신호
A = 2 * np.sin(np.pi / 10) / np.pi
omega = 2 * np.pi * 8000
theta = -np.pi / 10

z_theory = A * x * np.cos(omega * t + theta)
\`\`\`

각 변수의 의미와 값은 다음과 같다.

- \`f_low\`: BPF의 하한 주파수 4000 Hz
- \`f_high\`: BPF의 상한 주파수 12000 Hz
- \`A\`: 진폭 계수 약 0.1967
- \`omega\`: 각주파수 $16000\\pi$ rad/s
- \`theta\`: 위상 $-\\pi/10$ rad

완성한 스크립트를 실행하면 원래 신호 $x(t)$, 샘플링 펄스 $p(t)$, 샘플링된 신호 $s(t)$, BPF 출력 $z(t)$ 및 이론 신호 \`z_theory\`의 시간 영역 파형이 출력된다.`
},
{
  id: "7-4C3",
  title: "4.C3.",
  type: "python",
  prompt: `문제 4.C2의 py 스크립트에서 시뮬레이션 시간을 'T = 1e-2'초로 설정하고 코드를 실행하시오. Time-domain Viewer에 출력된 5개의 파형을 확인하고 결과 그래프를 제시하시오. 특히, BPF 출력 $z(t)$와 이론 신호 'z_theory'의 파형을 관찰하시오.`,
  referenceAnswer: `시뮬레이션 시간을 0.01초로 설정하고 Python 스크립트를 실행하면 다섯 가지 시간 영역 파형을 관찰할 수 있다.

- $x(t)$: 원래 사운드 신호
- $p(t)$: 8 kHz로 반복되는 샘플링 펄스 신호
- $s(t)$: 원래 신호에 샘플링 펄스를 곱한 신호
- $z(t)$: 샘플링된 신호를 BPF에 통과시킨 출력 신호
- \`z_theory\`: 문제 4.B에서 유도한 수식으로 직접 생성한 이론 신호

BPF 출력 $z(t)$와 이론 신호 \`z_theory\`는 모두 원래 신호 $x(t)$가 8 kHz의 반송파에 의해 진폭 변조된 형태를 보인다.

다만 실제 BPF 출력에는 필터의 초기 과도응답, 진폭 감쇠 및 위상 지연이 발생하므로 두 파형이 정확히 일치하지는 않을 수 있다.`
},
{
  id: "7-4C4",
  title: "4.C4.",
  type: "essay",
  prompt: `문제 4.C3에서 관찰한 5개의 시간 영역 파형을 바탕으로, 다음 물음에 답하시오.

(a) 문제 4.B에서 유도한 [[equation:7.2]]가 맞는지 확인하려면 어떤 두 파형을 비교해야 하는가?
(b) 두 파형의 모양과 진폭을 비교하여, 문제 4.B의 결과가 실험 결과와 부합하는지 설명하시오.

단, 실제 BPF에서는 주파수에 따른 진폭 감쇠와 시간 지연이 발생할 수 있으므로, 두 파형이 완전히 일치하지 않더라도 그 원인을 고려하여 설명하시오.`,
referenceAnswer: `(a) 문제 4.B에서 유도한 (식 7.2)가 맞는지 확인하려면 BPF 출력 $z(t)$와 이론 신호 \`z_theory\`를 비교해야 한다.

이론 신호는 다음과 같다.

$$
z_{\\mathrm{theory}}(t)
=Ax(t)\\cos(\\omega t+\\theta)
$$

여기서,

$$
A\\approx0.1967,\\quad
\\omega=16000\\pi,\\quad
\\theta=-\\frac{\\pi}{10}
$$

이다.

(b) BPF 출력 $z(t)$와 이론 신호 \`z_theory\`는 전체적으로 유사한 진폭 변조 파형을 보인다. 두 신호 모두 원래 신호 $x(t)$의 진폭 변화에 따라 8 kHz 반송파의 진폭이 변한다.

따라서 샘플링 신호의 ±8 kHz 부근 스펙트럼을 BPF로 추출하면, 원래 신호에 코사인 함수를 곱한 형태의 신호를 얻을 수 있다는 문제 4.B의 이론과 부합한다.

다만 실제 실험에서는 8차 Butterworth BPF를 사용하므로 통과대역 내 진폭 감쇠와 위상 지연이 존재한다. 특히 시뮬레이션 초기에는 필터의 과도응답으로 두 파형의 차이가 나타날 수 있다.

또한 Python에서 생성한 이산시간 펄스와 문제 4.B에서 가정한 연속시간 사각 펄스 사이에도 작은 차이가 발생할 수 있으므로, 두 파형이 완전히 일치하지 않더라도 전체적인 변조 형태와 진폭을 비교하여 판단한다.`
},
{
  id: "7-4C5",
  title: "4.C5.",
  type: "python",
  consoleEnabled: true,
  prompt: `문제 4.C2의 py 스크립트에서 시뮬레이션 시간을 'T = 0.1'초로 변경하고 다시 실행하시오. 이후 Console에서 다음 명령을 실행하여 BPF 출력 $z(t)$의 주파수 스펙트럼 $Z(f)$를 관찰하시오.
\`\`\`python
spectrum_view(z, 1/dt, ymin=-40, ymax=25, frequency_limit_hz=80000)
\`\`\`
BPF 출력의 스펙트럼을 출력하고 결과 그래프를 제시하시오.`,
referenceAnswer: `시뮬레이션 시간을 0.1초로 변경하여 실행하고, Console에서 다음 명령을 입력한다.

\`\`\`python
spectrum_view(
    z,
    1 / dt,
    ymin=-40,
    ymax=25,
    frequency_limit_hz=80000
)
\`\`\`

BPF 출력 $z(t)$의 스펙트럼을 관찰하면 +8 kHz와 -8 kHz를 중심으로 주파수 성분이 나타난다.

설계한 BPF의 통과대역은 양의 주파수에서 4~12 kHz, 음의 주파수에서 -12~-4 kHz이므로, 이 범위를 벗어난 성분들은 대부분 감쇠된다.

따라서 샘플링 신호 $s(t)$에 존재했던 여러 반복 스펙트럼 중 ±8 kHz 부근의 성분이 주로 남는 것을 확인할 수 있다.`
},
{
  id: "7-4C6",
  title: "4.C6.",
  type: "essay",
  prompt: `문제 4.C5에서 관찰한 BPF 출력의 스펙트럼 $Z(f)$를 문제 4.A에서 유도한 결과와 비교하시오.

(a) 스펙트럼이 나타나는 중심 주파수를 쓰시오.
(b) BPF를 통과한 스펙트럼의 모양이 원래 신호 $X(f)$와 어떤 관계가 있는지 설명하시오.
(c) 관찰한 결과가 문제 4.A에서 유도한 $Z(\\omega)$와 부합하는지 쓰시오.`,
referenceAnswer: `(a) 스펙트럼의 중심 주파수

BPF 출력의 스펙트럼은 다음 주파수를 중심으로 나타난다.

$$
\\boxed{f=\\pm8\\;\\mathrm{kHz}}
$$

(b) 원래 신호의 스펙트럼과의 관계

문제 3.A2에서 유도한 샘플링 신호의 스펙트럼은 다음과 같다.

$$
S(\\omega)=
\\sum_{n=-\\infty}^{\\infty}
P_nX(\\omega-n\\omega_s)
$$

BPF는 이 중 $n=1$과 $n=-1$에 해당하는 성분을 통과시킨다.

따라서 BPF 출력의 스펙트럼은 원래 신호의 스펙트럼 $X(\\omega)$가 +8 kHz와 -8 kHz를 중심으로 이동한 형태이다. 각 반복 스펙트럼에는 푸리에 급수 계수 $P_1$과 $P_{-1}$이 곱해지므로 크기와 위상이 달라진다.

(c) 이론과의 비교

문제 4.A에서 유도한 이상적인 BPF 출력의 스펙트럼은 다음과 같다.

$$
Z(\\omega)=
P_1X(\\omega-\\omega_s)
+
P_{-1}X(\\omega+\\omega_s)
$$

실험 결과에서도 +8 kHz와 -8 kHz를 중심으로 주파수 성분이 나타나므로, 스펙트럼의 중심 위치와 전체적인 형태가 이론과 부합한다.

다만 실제 Butterworth BPF는 이상적인 필터와 달리 유한한 전이대역과 주파수별 감쇠 특성을 가지므로, 스펙트럼의 세부적인 모양과 크기에는 차이가 발생할 수 있다.`
},
{
  id: "7-4C7",
  title: "4.C7.",
  type: "essay",
  prompt: `샘플링 펄스의 주파수 $F_s=8$ kHz를 변경하지 않더라도, BPF의 중심 주파수를 변경하면 원래 신호 $x(t)$를 다른 주파수로 천이시킬 수 있다.

(a) 8 kHz 이외에 주파수를 천이시킬 수 있는 중심 주파수를 두 가지 이상 쓰시오.
(b) 문제 3.A2에서 유도한 $S(\\omega)$를 이용하여, 다른 주파수로의 천이가 가능한 이유를 설명하시오.
(c) 중심 주파수를 16 kHz로 변경하려면 BPF의 통과대역을 어떻게 설정해야 하는지 Hz 단위로 쓰시오.

단, 이상적인 BPF를 가정한다.`,
referenceAnswer: `(a) 주파수 천이가 가능한 다른 중심 주파수

샘플링 주파수가 8 kHz이므로 8 kHz 이외에도 다음과 같은 중심 주파수를 선택할 수 있다.

- 16 kHz
- 24 kHz
- 32 kHz

이들은 모두 샘플링 주파수 8 kHz의 정수배에 해당한다.

(b) 다른 주파수로 천이가 가능한 이유

문제 3.A2에서 유도한 샘플링 신호의 스펙트럼은 다음과 같다.

$$
S(\\omega)=
\\sum_{n=-\\infty}^{\\infty}
P_nX(\\omega-n\\omega_s)
$$

이 식에 따르면 원래 신호의 스펙트럼 $X(\\omega)$는 샘플링 각주파수 $\\omega_s$의 정수배를 중심으로 반복된다.

따라서 BPF의 중심 주파수를 $2F_s$, $3F_s$, $4F_s$ 등으로 변경하면 해당 위치에 존재하는 반복 스펙트럼을 선택하여 출력할 수 있다.

단, 푸리에 급수 계수 $P_n$이 0인 위치에서는 해당 반복 성분도 사라지므로, 모든 정수배에서 유효한 출력을 얻을 수 있는 것은 아니다.

(c) 중심 주파수가 16 kHz인 경우

BPF의 중심 주파수를 16 kHz, 대역폭을 8 kHz로 설정하면 하한 및 상한 주파수는 다음과 같다.

$$
f_L=16000-4000=12000\\;\\mathrm{Hz}
$$

$$
f_H=16000+4000=20000\\;\\mathrm{Hz}
$$

따라서 BPF의 통과대역은 다음과 같다.

- 양의 주파수: 12~20 kHz
- 음의 주파수: -20~-12 kHz

이상적인 BPF에서는 $n=2$와 $n=-2$에 해당하는 반복 스펙트럼을 추출할 수 있다.`
},
        { //문제 4.D
          id: "7-4D",
          title: "4.D.",
          "type": "essay",
          prompt: `문제 4.C의 실험을 토대로, 별도의 사인파를 곱하지 않고 주기적인 샘플링과 BPF만으로 원래 신호의 스펙트럼을 원하는 주파수 대역으로 이동시키는 방법을 설명하시오. 이때 샘플링 주파수와 BPF의 중심 주파수가 각각 어떤 역할을 하는지 쓰시오.`,
          referenceAnswer:`원래 신호 $x(t)$에 주기적인 샘플링 펄스 신호 $p(t)$를 곱하면, 원래 신호의 스펙트럼이 샘플링 주파수 $F_s$의 정수배를 중심으로 반복되어 나타난다.

$$
s(t)=x(t)p(t)
$$

주파수 영역에서는 다음과 같다.

$$
S(\\omega)=
\\sum_{n=-\\infty}^{\\infty}
P_nX(\\omega-n\\omega_s)
$$

여기서 $\\omega_s=2\\pi F_s$이다.

따라서 별도의 사인파를 곱하지 않더라도 샘플링 주파수를 적절하게 설정하고, 원하는 반복 스펙트럼의 위치에 맞춰 BPF의 중심 주파수를 지정하면 주파수가 천이된 신호를 얻을 수 있다.

구체적인 과정은 다음과 같다.

1. 원래 신호 $x(t)$에 주기적인 펄스 신호 $p(t)$를 곱하여 샘플링 신호 $s(t)$를 생성한다.
2. 샘플링 주파수 $F_s$를 기준으로 원래 신호의 스펙트럼이 정수배 주파수에서 반복되도록 한다.
3. 원하는 주파수에 해당하는 반복 스펙트럼을 통과시키도록 BPF의 중심 주파수와 대역폭을 설정한다.
4. BPF를 이용하여 해당 반복 스펙트럼을 추출하면 주파수가 천이된 출력 신호를 얻을 수 있다.

예를 들어 샘플링 주파수를 8 kHz로 설정하면 8 kHz, 16 kHz, 24 kHz 등을 중심으로 원래 신호의 스펙트럼이 반복된다.

이때 중심 주파수가 16 kHz이고 대역폭이 8 kHz인 BPF를 사용하면 16 kHz를 중심으로 천이된 신호를 얻을 수 있다.

따라서 샘플링 주파수와 BPF의 중심 주파수를 적절하게 설정하면 사인파를 직접 곱하지 않고도 원하는 주파수로 신호를 천이시킬 수 있다.`
        }
      ]
    }
  ]
} as const;
