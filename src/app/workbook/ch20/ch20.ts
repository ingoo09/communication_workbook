import type { WorkbookChapter } from '@/types/workbook';

export const chapter = {
  "id": "20-pulse-shaping-matched-filter",
  "title": "Chapter 20. Pulse Shaping and Matched Filter",
  "sections": [
    { //문제 1
      "id": "20-1",
      "title": "1. Raised cosine pulse 모양 관찰",
      "problems": [
        { //문제 1.A
          "id": "20-1A",
          "title": "1.A.",
          "type": "console",
          "prompt": `Raised Cosine(RC) 펄스의 Roll-off factor에 따른 파형 변화를 관찰해 보자.
          
본 온라인 교재에서 제공하는 함수 'rcosdesign(r, 6, L, 'normal')'은 Roll-off factor가 'r'인 Raised cosine 펄스를, 0초를 중심으로 심벌주기 당 'L'개의 샘플로 샘플링한 벡터를 출력한다.

예를 들어, 아래를 Console에서 실행하면 Roll-off factor가 $0.5$인 Raised cosine 펄스를 그릴 수 있다.
\`\`\`python
>>> import numpy as np
>>> import matplotlib.pyplot as plt
>>> Ts = 1  # 심벌 구간(symbol duration)
>>> L = 16  # 심벌 당 샘플 수
>>> r = 0.5  #Roll-off factor
>>> t = np.arange(-3 * L, 3 * L + 1) * Ts / L
>>> pt = rcosdesign(r, 6, L, 'normal')
>>> pt = pt / max(pt)
>>> plt.plot(t, pt)
>>> plt.grid()
\`\`\`
위 명령어를 참고하여 Roll-off factor가 $0, 0.25, 0.75, 1$인 경우에 대해서도 Raised cosine 펄스의 샘플 벡터 ‘pt’를 각각 생성하고 이들을 하나의 ‘figure’에 색을 달리하여 겹쳐 그리시오. ‘plt.legend()’를 이용하여 각 line의 Roll-off factor를 표시하시오. 
`,
          "referenceAnswer": `다음과 같이 Roll-off factor가 $0$, $0.25$, $0.5$, $0.75$, $1$인 Raised Cosine 펄스를 하나의 Figure에 겹쳐 그릴 수 있다.

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

Ts = 1
L = 16
t = np.arange(-3 * L, 3 * L + 1) * Ts / L

for r in [0, 0.25, 0.5, 0.75, 1]:
    pt = rcosdesign(r, 6, L, 'normal')
    pt = pt / max(pt)
    plt.plot(t, pt, label=f'r = {r}')

plt.grid()
plt.legend()
plt.xlabel('Time (symbol periods)')
plt.ylabel('Amplitude')
plt.title('Raised Cosine Pulses')
plt.show()
\`\`\`

모든 Raised Cosine 펄스는 $t=0$에서 최대값을 가지며, $t=\\pm T_s, \\pm2T_s, \\pm3T_s$와 같이 0이 아닌 심벌 주기의 정수배 지점에서 0이 된다.

Roll-off factor가 증가하면 중앙부 주변의 펄스가 시간축에서 더 빠르게 감쇠하는 형태를 보이며, 각 Roll-off factor에 따라 펄스의 세부적인 모양이 달라지는 것을 확인할 수 있다.`
        },
        { //문제 1.B
          "id": "20-1B",
          "title": "1.B.",
          "type": "essay",
          "prompt": `문제 1.A에서 생성한 Raised Cosine 펄스의 모양과 시간축을 관찰하시오.

(a) 함수 'rcosdesign(r, 6, L, 'normal')'이 출력하는 펄스는 $t=0$을 중심으로 좌우 각각 몇 심벌 동안의 파형을 나타내는가?
(b) 심벌당 샘플 수가 $L=16$일 때 생성되는 펄스의 전체 샘플 수는 몇 개인가?`,
          "referenceAnswer": `(a) 'rcosdesign(r, 6, L, 'normal')'에서 두 번째 인자인 6은 펄스의 전체 길이가 6심벌임을 의미한다. 따라서 $t=0$을 중심으로 왼쪽으로 3심벌, 오른쪽으로 3심벌 동안의 파형을 나타낸다.

즉, 시간 범위는

$$
-3T_s \\le t \\le 3T_s
$$

이다.

(b) 심벌당 샘플 수가 $L=16$이고 전체 길이가 6심벌이므로, 구간 사이의 샘플 간격 수는

$$
6L=6\\times16=96
$$

개이다.

양쪽 끝점까지 모두 포함하므로 전체 샘플 수는

$$
6L+1=97
$$

개이다.

따라서 답은 **좌우 각각 3심벌, 전체 97개 샘플**이다.`
        },
        { //문제 1.C
          "id": "20-1C",
          "title": "1.C.",
          "type": "essay",
          "prompt": `문제 1.A에서 관찰한 Raised Cosine 펄스의 모양을 바탕으로 심벌 간 간섭(ISI, Inter-Symbol Interference)에 대해 생각해 보자.

(a) 여러 데이터 심벌을 펄스 성형하여 전송할 때, 심벌 간 간섭(ISI)이 발생하지 않기 위한 펄스의 조건을 찾아 수식으로 나타내시오.
(b) 문제 1.A에서 생성한 Raised Cosine 펄스를 펄스 성형에 사용하는 경우, 이상적인 심벌 시점에서 ISI가 발생하는지 판단하고 그 이유를 설명하시오.

단, 심벌 주기는 $T_s$이며, 정확한 심벌 시점에서 샘플링한다고 가정한다.`,
          "referenceAnswer": `(a) 심벌 간 간섭(ISI)이 발생하지 않으려면 펄스 $p(t)$가 심벌 주기 $T_s$의 정수배 위치에서 다음 조건을 만족해야 한다.

$$
p(nT_s)=
\\begin{cases}
1, & n=0 \\\\
0, & n\\ne0
\\end{cases}
$$

즉, 자신의 심벌을 검출하는 시점에서는 원하는 값을 가져야 하고, 다른 심벌들의 펄스는 해당 검출 시점에서 모두 0이 되어야 한다. 이를 Nyquist의 zero-ISI 조건이라고 한다.

(b) 문제 1.A에서 생성한 Raised Cosine(RC) 펄스는 $t=0$에서 최대값을 가지며,

$$
t=\\pm T_s,\\ \\pm2T_s,\\ \\pm3T_s,\\ldots
$$

와 같이 0이 아닌 심벌 주기의 정수배 지점에서 0이 된다.

따라서 데이터 심벌들이 $T_s$ 간격으로 전송되고 정확한 심벌 시점에서 샘플링한다면, 특정 심벌을 검출하는 순간 다른 심벌에서 발생한 RC 펄스들의 값은 0이 된다.

그러므로 이상적인 Raised Cosine 펄스를 펄스 성형에 사용하는 경우 **심벌 검출 시점에서 ISI가 발생하지 않는다.**`
        },
        { //문제 1.D
          "id": "20-1D",
          "title": "1.D.",
          "type": "console",
          "prompt": `함수 'rcosdesign(r, 6, L, 'normal')'에서 'normal' 대신 'sqrt'를 사용하면 Square Root Raised Cosine(SRRC) 펄스를 생성할 수 있다. Roll-off factor가 $0, 0.25, 0.5, 0.75, 1$인 경우에 대해 SRRC 펄스를 겹쳐 그리기 위해, 'normal' 대신 'sqrt'를 사용하여 문제 1.A를 다시 수행하시오.`,
          "referenceAnswer": `다음과 같이 'normal' 대신 'sqrt'를 사용하여 Roll-off factor가 $0$, $0.25$, $0.5$, $0.75$, $1$인 SRRC 펄스를 하나의 Figure에 겹쳐 그릴 수 있다.

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

Ts = 1
L = 16
t = np.arange(-3 * L, 3 * L + 1) * Ts / L

for r in [0, 0.25, 0.5, 0.75, 1]:
    pt = rcosdesign(r, 6, L, 'sqrt')
    pt = pt / max(pt)
    plt.plot(t, pt, label=f'r = {r}')

plt.grid()
plt.legend()
plt.xlabel('Time (symbol periods)')
plt.ylabel('Amplitude')
plt.title('Square Root Raised Cosine Pulses')
plt.show()
\`\`\`

RC 펄스와 달리 SRRC 펄스 자체는 일반적으로 $t=\\pm T_s, \\pm2T_s,\\ldots$와 같은 모든 심벌 주기의 정수배 지점에서 0이 되지 않는다.

따라서 SRRC 펄스만을 관찰하면 Raised Cosine 펄스와는 다른 zero-crossing 특성을 확인할 수 있다.`
        },
        { //문제 1.E
          "id": "20-1E",
          "title": "1.E.",
          "type": "essay",
          "prompt": `문제 1.D에서 그린 SRRC 펄스의 모양을 바탕으로, SRRC 펄스를 펄스 성형에 사용하는 경우 ISI가 발생하는지 판단하고 그 이유를 설명하시오. 문제 1.C에서 분석한 RC 펄스와 비교하여, 두 펄스가 심벌 주기의 정수배 시점에서 어떤 차이를 보이는지 설명하시오.

단, 현재는 수신기의 정합 필터를 거치기 전의 SRRC 펄스 자체만 고려한다. 정합 필터를 통과한 이후의 신호는 문제 3에서 다룬다.`,
          "referenceAnswer": `SRRC(Square Root Raised Cosine) 펄스 자체를 송신 펄스로 사용하는 경우에는 일반적으로 **ISI가 존재한다.**

문제 1.C에서 살펴본 Raised Cosine(RC) 펄스는

$$
p(nT_s)=0 \\qquad (n\\ne0)
$$

을 만족하여, 0이 아닌 심벌 주기의 정수배 시점에서 펄스 값이 0이 된다. 따라서 정확한 심벌 시점에서 다른 심벌의 영향을 받지 않는다.

반면 SRRC 펄스 자체는 일반적으로

$$
p(nT_s)\\ne0 \\qquad (n\\ne0)
$$

인 지점이 존재한다. 따라서 여러 SRRC 펄스를 $T_s$ 간격으로 겹쳐 전송하면, 특정 심벌을 검출하는 시점에 인접한 다른 심벌의 펄스 값이 0이 아닐 수 있으므로 ISI가 발생한다.

즉,

- **RC 펄스:** 심벌 주기의 정수배 지점에서 zero-ISI 조건을 만족한다.
- **SRRC 펄스:** 펄스 자체만으로는 일반적으로 zero-ISI 조건을 만족하지 않는다.

그러나 SRRC 펄스는 송신기와 수신기에서 각각 사용하여 두 필터의 전체 응답이 Raised Cosine 특성이 되도록 설계한다. 따라서 이후 문제 3에서 정합 필터를 통과한 신호의 ISI 특성을 다시 확인하게 된다.`
        },
      ]
    },
    { //문제 2
      "id": "20-2",
      "title": "2. 펄스 성형과 Eye Diagram",
      "problems": [
        { //문제 2.A
          "id": "20-2A",
          "title": "2.A.",
          "prompt": `펄스 성형 신호 $p(t)$가 [그림 20.1]과 같은 삼각 파형으로 주어지는 시스템을 고려하자.
[[image:/images/ch20/figure20_1.png|그림 20.1 삼각 파형 펄스 $p(t)$|30]]`
        },
        {
          "id": "20-2A1",
          "title": "2.A1.",
          "type": "graph",
          graphInputMode: 'both',
          graphXMin: -2,
          graphXMax: 6,
          graphYMin: -2,
          graphYMax: 6,
          graphXAxisLabel: 't [sec]',
          graphYAxisLabel: 'x_1(t)*p(t)',
          graphShowGrid: true,
          "prompt": `하나의 데이터 심벌을 가진 입력 신호 $x_1(t)$(임펄스 변조된 데이터 스트림)가 [그림 20.2]와 같이 $t=0$인 지점에서 임펄스 형태일 때, $x_1(t)$를 $p(t)$로 펄스 성형한 결과($x_1(t)$와 $p(t)$의 컨볼루션)를 그리시오.
[[image:/images/ch20/figure20_2.png|그림 20.2 $x_1(t)$를 $p(t)$로 펄스 성형하는 과정|60]]`,
          "referenceAnswer": `입력 신호는

$$
x_1(t)=\\delta(t)
$$

이다. 임펄스와의 컨볼루션 성질에 의해

$$
x_1(t)*p(t)
=
\\delta(t)*p(t)
=
p(t)
$$

가 된다.

따라서 결과는 원래의 삼각 펄스 $p(t)$와 동일하다.

그래프의 주요 점은

$$
(-T,0),\\quad (0,1),\\quad (T,0)
$$

이며, 이 세 점을 직선으로 연결한 삼각 파형을 그리면 된다.`
        },
        {
          "id": "20-2A2",
          "title": "2.A2.",
          "type": "graph",
          graphInputMode: 'both',
          graphXMin: -2,
          graphXMax: 6,
          graphYMin: -2,
          graphYMax: 6,
          graphXAxisLabel: 't [sec]',
          graphYAxisLabel: 'x_2(t)*p(t)',
          graphShowGrid: true,
          "prompt": `하나의 데이터 심벌을 가진 입력 신호 $x_2(t)$가 [그림 20.3]과 같이 $t=3T$인 지점에서 임펄스 형태일 때, $x_2(t)$를 $p(t)$로 펄스 성형한 결과를 그리시오.
[[image:/images/ch20/figure20_3.png|그림 20.3 $x_2(t)$를 $p(t)$로 펄스 성형하는 과정|60]]`,
          "referenceAnswer": `입력 신호는

$$
x_2(t)=\\delta(t-3T)
$$

이다.

시간 이동된 임펄스와의 컨볼루션 성질에 의해

$$
x_2(t)*p(t)
=
\\delta(t-3T)*p(t)
=
p(t-3T)
$$

가 된다.

따라서 원래 $t=0$을 중심으로 하던 삼각 펄스가 오른쪽으로 $3T$만큼 이동한다.

그래프의 주요 점은

$$
(2T,0),\\quad (3T,1),\\quad (4T,0)
$$

이며, 이 세 점을 직선으로 연결한 삼각 파형을 그리면 된다.`
        },
        {
          "id": "20-2A3",
          "title": "2.A3.",
          "type": "graph",
          graphInputMode: 'both',
          graphXMin: -2,
          graphXMax: 6,
          graphYMin: -2,
          graphYMax: 6,
          graphXAxisLabel: 't [sec]',
          graphYAxisLabel: 'x_3(t)*p(t)',
          graphShowGrid: true,
          "prompt": `두 개의 데이터 심벌을 가진 입력 신호 $x_3(t)$가 [그림 20.4]와 같이 $t=0, t=3T$인 지점에서 임펄스 형태일 때, $x_3(t)$를 $p(t)$로 펄스 성형한 결과를 그리시오.
[[image:/images/ch20/figure20_4.png|그림 20.4 $x_3(t)$를 $p(t)$로 펄스 성형하는 과정|60]]`,
          "referenceAnswer": `입력 신호는

$$
x_3(t)
=
\\delta(t)+\\delta(t-3T)
$$

이다.

따라서 컨볼루션의 선형성에 의해

$$
x_3(t)*p(t)
=
p(t)+p(t-3T)
$$

가 된다.

첫 번째 삼각 펄스의 주요 점은

$$
(-T,0),\\quad(0,1),\\quad(T,0)
$$

이고, 두 번째 삼각 펄스의 주요 점은

$$
(2T,0),\\quad(3T,1),\\quad(4T,0)
$$

이다.

첫 번째 펄스는 $-T$부터 $T$까지 존재하고 두 번째 펄스는 $2T$부터 $4T$까지 존재하므로 두 펄스가 서로 겹치지 않는다.

따라서 두 개의 동일한 삼각 펄스가 각각 $t=0$과 $t=3T$을 중심으로 떨어져 있는 형태로 그리면 된다.`
        },
        {
          "id": "20-2A4",
          "title": "2.A4.",
          "type": "essay",
          "prompt": `더 일반적인 형태의 입력 신호 $x(t)$를 고려하자. 입력 신호 $x(t)$가 [그림 20.5]와 같이 4개의 연속적인 임펄스 형태일 때, $x(t)$를 $p(t)$로 펄스 성형한 결과가 [그림 20.6]과 같지 않은 이유를 설명하시오.
[[image:/images/ch20/figure20_5.png|그림 20.5 $x(t)$를 $p(t)$로 펄스 성형하는 과정|60]]
[[image:/images/ch20/figure20_6.png|그림 20.6 $x(t)$를 $p(t)$로 펄스 성형한 결과의 잘못된 예|60]]`,
          "referenceAnswer": `그림 20.5의 입력 신호는

$$
x(t)
=
\\delta(t)
+
\\delta(t-T)
-
\\delta(t-2T)
+
\\delta(t-3T)
$$

이다.

따라서 펄스 성형 결과는

$$
x(t)*p(t)
=
p(t)
+
p(t-T)
-
p(t-2T)
+
p(t-3T)
$$

가 된다.

각 임펄스는 자신의 위치를 중심으로 삼각 펄스 $p(t)$를 생성하며, $t=2T$에 있는 임펄스의 진폭은 $-1$이므로 이 심벌에 해당하는 삼각 펄스는 아래쪽 방향으로 나타난다.

하지만 최종 신호는 각각의 삼각 펄스를 따로 이어 붙인 것이 아니라, 같은 시간에 존재하는 모든 펄스의 값을 **선형적으로 더한 결과**이다.

특히 그림 20.5에서는 심벌들이 $T$ 간격으로 배치되어 있고 각 삼각 펄스가 좌우로 $T$ 동안 존재하므로 인접한 펄스들이 서로 겹친다.

따라서 그림 20.6처럼 각 삼각 펄스를 독립적으로 표시하는 것은 올바른 컨볼루션 결과가 아니다. 겹치는 구간에서는 각 펄스의 진폭을 합하여 최종 파형을 구해야 한다.`
        },
        {
          "id": "20-2A5",
          "title": "2.A5.",
          "type": "graph",
          graphInputMode: 'both',
          graphXMin: -2,
          graphXMax: 6,
          graphYMin: -2,
          graphYMax: 6,
          graphXAxisLabel: 't [sec]',
          graphYAxisLabel: 'x(t)*p(t)',
          graphShowGrid: true,
          "prompt": `입력 신호 $x(t)$가 [그림 20.5]와 같이 4개의 연속적인 임펄스 형태일 때, $x(t)$를 $p(t)$로 펄스 성형한 올바른 결과를 그리시오.
[[image:/images/ch20/figure20_5.png|그림 20.5 $x(t)$를 $p(t)$로 펄스 성형하는 과정|60]]`,
          "referenceAnswer": `그림 20.5의 입력 신호는

$$
x(t)
=
\\delta(t)
+
\\delta(t-T)
-
\\delta(t-2T)
+
\\delta(t-3T)
$$

이므로, 펄스 성형 결과는

$$
s(t)
=
x(t)*p(t)
$$

$$
=
p(t)
+
p(t-T)
-
p(t-2T)
+
p(t-3T)
$$

이다.

삼각 펄스의 최대 진폭을 1이라고 할 때 각 펄스를 중첩하여 더하면 최종 파형의 주요 점은

$$
(-T,0),
\\quad
(0,1),
\\quad
(T,1),
\\quad
(2T,-1),
\\quad
(3T,1),
\\quad
(4T,0)
$$

가 된다.

따라서 위의 점들을 순서대로 직선으로 연결하여 그래프를 그리면 된다.

특히 $T$부터 $2T$ 사이에서는 신호가 $1$에서 $-1$로 직선적으로 감소하므로 $t=1.5T$에서 0을 지나며, $2T$부터 $3T$ 사이에서는 $-1$에서 $1$로 직선적으로 증가하므로 $t=2.5T$에서 다시 0을 지난다.

즉, 최종 파형은

- $-T \\rightarrow 0$: 0에서 1로 증가
- $0 \\rightarrow T$: 1로 일정
- $T \\rightarrow 2T$: 1에서 -1로 감소
- $2T \\rightarrow 3T$: -1에서 1로 증가
- $3T \\rightarrow 4T$: 1에서 0으로 감소

하는 형태이다.`
        },
        { //문제 2.B
          "id": "20-2B",
          "title": "2.B.",
          "prompt": `아래 'tx_sig_gen.py' 파일은 $100$개의 랜덤한 이진 데이터 비트에 Roll-off factor가 $0.25$인 Raised cosine 펄스를 입힌 송신 신호 $s(t)$의 샘플 파형 'tx_signal'을 생성하는 코드이다.
\`\`\`python
# tx_sig_gen.py
import numpy as np

Ts = 1
L = 16
t_step = Ts / L

######### <1. Pulse waveform generation> ####################
pt = rcosdesign(?, 6, L, 'normal') #채워야 할 부분 (1)
pt = pt / np.max(pt)

######### <2. Ns bit binary symbol generation> #############
Ns = ?  #채워야 할 부분 (2)
data_bit = (np.random.rand(Ns) > 0.5)

######### <3. Unipolar to Bipolar (amplitude modulation)> ####
amp_modulated = 2 * data_bit.astype(int) - 1  # 0 => -1, 1 => 1

######### <4. Impulse modulation> ############################
impulse_modulated = np.array([])
for n in range(Ns):
    delta_signal = np.concatenate(([amp_modulated[n]], np.zeros(L - 1)))
    impulse_modulated = np.concatenate((impulse_modulated, delta_signal))

######### <5. Pulse shaping (Transmitter filtering)> #########
tx_signal = np.convolve(impulse_modulated, pt)
\`\`\`
`
        },
        {
          "id": "20-2B1",
          "title": "2.B1.",
          "type": "python",
          starterCode: `# tx_sig_gen.py
import numpy as np

Ts = 1
L = 16
t_step = Ts / L

######### <1. Pulse waveform generation> ####################
pt = rcosdesign(?, 6, L, 'normal') #채워야 할 부분 (1)
pt = pt / np.max(pt)

######### <2. Ns bit binary symbol generation> #############
Ns = ?  #채워야 할 부분 (2)
data_bit = (np.random.rand(Ns) > 0.5)

######### <3. Unipolar to Bipolar (amplitude modulation)> ####
amp_modulated = 2 * data_bit.astype(int) - 1  # 0 => -1, 1 => 1

######### <4. Impulse modulation> ############################
impulse_modulated = np.array([])
for n in range(Ns):
    delta_signal = np.concatenate(([amp_modulated[n]], np.zeros(L - 1)))
    impulse_modulated = np.concatenate((impulse_modulated, delta_signal))

######### <5. Pulse shaping (Transmitter filtering)> #########
tx_signal = np.convolve(impulse_modulated, pt)`,
          "prompt": `2개의 ?를 채워 py 스크립트를 완성한 후, 모든 라인에 대해 다음의 지침에 따라 주석(Comment)을 작성하시오.

(지침 1) '='이 있는 라인
  - '=' 왼쪽 변수의 목적(용도)을 설명하시오.
  - '=' 오른쪽 수식이 왜 해당 변수의 의미에 부합하는지 설명하시오.
(지침 2) '='이 없는 라인
  - 명령어의 기능을 설명하시오.
  - 왜 해당 명령을 수행하는지 설명하시오.`,
          "referenceAnswer": `두 개의 빈칸은 각각

$$
r=0.25, \\qquad N_s=100
$$

이므로 다음과 같이 완성할 수 있다.

\`\`\`python
# tx_sig_gen.py

# NumPy 라이브러리를 np라는 이름으로 불러온다.
# 난수 생성, 배열 생성, convolution 등의 수치 연산을 사용하기 위함이다.
import numpy as np

# Ts는 한 데이터 심벌이 차지하는 심벌 구간(symbol duration)이다.
# 문제에서 심벌 구간을 1초로 설정하므로 1을 저장한다.
Ts = 1

# L은 하나의 심벌 구간을 표현하는 샘플 수이다.
# 한 심벌당 16개의 샘플을 사용하므로 16을 저장한다.
L = 16

# t_step은 인접한 샘플 사이의 시간 간격이다.
# 하나의 심벌 구간 Ts를 L개의 샘플로 나누므로 Ts / L로 계산한다.
t_step = Ts / L

######### <1. Pulse waveform generation> ####################

# pt는 송신 펄스 성형에 사용할 Raised Cosine 펄스의 샘플 벡터이다.
# Roll-off factor가 0.25이고, 길이가 6심벌이며,
# 심벌당 L개의 샘플을 갖는 RC 펄스를 생성한다.
pt = rcosdesign(0.25, 6, L, 'normal')

# pt의 최대값이 1이 되도록 펄스의 크기를 정규화한다.
# 이후 데이터 심벌의 진폭을 기준으로 펄스 성형 결과를 관찰하기 위함이다.
pt = pt / np.max(pt)

######### <2. Ns bit binary symbol generation> #############

# Ns는 생성할 이진 데이터 심벌의 개수이다.
# 문제에서 100개의 랜덤 이진 데이터를 사용하므로 100으로 설정한다.
Ns = 100

# data_bit는 0 또는 1의 값을 갖는 랜덤 이진 데이터 벡터이다.
# [0, 1) 범위의 난수가 0.5보다 큰지를 비교하여
# False(0) 또는 True(1)의 이진 값을 생성한다.
data_bit = (np.random.rand(Ns) > 0.5)

######### <3. Unipolar to Bipolar (amplitude modulation)> ####

# amp_modulated는 0/1의 이진 데이터를 -1/+1의 bipolar 심벌로 변환한 벡터이다.
# data_bit가 0이면 2*0-1=-1,
# data_bit가 1이면 2*1-1=+1이 된다.
amp_modulated = 2 * data_bit.astype(int) - 1

######### <4. Impulse modulation> ############################

# impulse_modulated는 임펄스 변조된 전체 데이터 스트림을 저장할 배열이다.
# 각 심벌을 순서대로 추가하기 위해 처음에는 빈 배열로 생성한다.
impulse_modulated = np.array([])

# Ns개의 데이터 심벌 각각에 대해 임펄스 변조를 수행한다.
for n in range(Ns):

    # 현재 심벌 amp_modulated[n] 뒤에 L-1개의 0을 붙인다.
    # 따라서 한 심벌이 총 L개의 샘플을 차지하며,
    # 각 심벌 구간의 첫 번째 샘플에만 심벌값이 위치한다.
    delta_signal = np.concatenate(
        ([amp_modulated[n]], np.zeros(L - 1))
    )

    # 현재 생성한 L개의 샘플을 기존 impulse_modulated의 뒤에 이어 붙여
    # 전체 임펄스 변조 신호를 구성한다.
    impulse_modulated = np.concatenate(
        (impulse_modulated, delta_signal)
    )

######### <5. Pulse shaping (Transmitter filtering)> #########

# tx_signal은 최종 펄스 성형된 송신 신호의 샘플 벡터이다.
# 임펄스 변조된 데이터 스트림과 Raised Cosine 펄스 pt를
# convolution하여 각 데이터 심벌에 RC 펄스를 입힌다.
tx_signal = np.convolve(impulse_modulated, pt)
\`\`\`

따라서 임펄스 변조 단계에서는 각 심벌값 $-1$ 또는 $+1$ 사이에 $L-1$개의 0을 삽입하고, 펄스 성형 단계에서는 이 신호와 Raised Cosine 펄스를 convolution하여 연속적인 송신 파형 $s(t)$를 생성한다.`
        },
        {
          "id": "20-2B2",
          "title": "2.B2.",
          "type": "python",
          responseEnabled: true,
          starterCode: `# tx_sig_gen.py
import numpy as np

Ts = 1
L = 16
t_step = Ts / L

######### <1. Pulse waveform generation> ####################
pt = rcosdesign(?, 6, L, 'normal') #채워야 할 부분 (1)
pt = pt / np.max(pt)

######### <2. Ns bit binary symbol generation> #############
Ns = ?  #채워야 할 부분 (2)
data_bit = (np.random.rand(Ns) > 0.5)

######### <3. Unipolar to Bipolar (amplitude modulation)> ####
amp_modulated = 2 * data_bit.astype(int) - 1  # 0 => -1, 1 => 1

######### <4. Impulse modulation> ############################
impulse_modulated = np.array([])
for n in range(Ns):
    delta_signal = np.concatenate(([amp_modulated[n]], np.zeros(L - 1)))
    impulse_modulated = np.concatenate((impulse_modulated, delta_signal))

######### <5. Pulse shaping (Transmitter filtering)> #########
tx_signal = np.convolve(impulse_modulated, pt)

# 'tx_sig_gen.py'에 아래를 추가.
import matplotlib.pyplot as plt

plt.figure(100)
plt.subplot(2, 1, 1)
t_impulse = np.arange(1, len(impulse_modulated) + 1) * t_step
plt.stem(t_impulse, impulse_modulated, markerfmt='.')
plt.axis([0, Ns * Ts, -2 * np.max(impulse_modulated), 2 * np.max(impulse_modulated)])
plt.grid()
plt.title('impulse modulated')
plt.subplot(2, 1, 2)
t_tx = np.arange(1, len(tx_signal) + 1) * t_step
plt.plot(t_tx, tx_signal)
plt.axis([0, Ns * Ts, -2 * np.max(tx_signal), 2 * np.max(tx_signal)])
plt.grid()
plt.title('pulse shaped')
plt.tight_layout()
plt.show()`,
          "prompt": `'tx_sig_gen.py'에서 수행한 임펄스 변조(impulse modulation)와 펄스 성형(pulse shaping) 과정의 동작을 파악하기 위해, 아래 코드를 추가한 후 py 스크립트를 실행하시오.
\`\`\`python
# 'tx_sig_gen.py'에 아래를 추가.
import matplotlib.pyplot as plt

plt.figure(100)
plt.subplot(2, 1, 1)
t_impulse = np.arange(1, len(impulse_modulated) + 1) * t_step
plt.stem(t_impulse, impulse_modulated, markerfmt='.')
plt.axis([0, Ns * Ts, -2 * np.max(impulse_modulated), 2 * np.max(impulse_modulated)])
plt.grid()
plt.title('impulse modulated')
plt.subplot(2, 1, 2)
t_tx = np.arange(1, len(tx_signal) + 1) * t_step
plt.plot(t_tx, tx_signal)
plt.axis([0, Ns * Ts, -2 * np.max(tx_signal), 2 * np.max(tx_signal)])
plt.grid()
plt.title('pulse shaped')
plt.tight_layout()
plt.show()
\`\`\`          
출력된 파형을 토대로, impulse modulation과 pulse shaping 과정이 각각 어떤 동작을 수행하는 작업인지 쓰시오.          
          `,
          "referenceAnswer": `**Impulse modulation**

임펄스 변조에서는 각 데이터 심벌 $-1$ 또는 $+1$을 심벌 주기 $T_s$마다 하나씩 배치한다.

Python 코드에서는 각 심벌 뒤에 $L-1$개의 0을 삽입하므로,

$$
[\\,a_0,0,\\ldots,0,a_1,0,\\ldots,0,a_2,\\ldots\\,]
$$

와 같은 형태의 신호가 만들어진다.

따라서 첫 번째 그래프에서는 심벌 주기마다 $+1$ 또는 $-1$ 값을 갖는 이산적인 임펄스 형태의 신호를 확인할 수 있다.

**Pulse shaping**

펄스 성형에서는 임펄스 변조된 신호와 Raised Cosine 펄스 $p(t)$를 convolution한다.

$$
s(t)
=
\\sum_k a_k p(t-kT_s)
$$

따라서 각 임펄스 위치마다 그 심벌의 진폭에 비례하는 Raised Cosine 펄스가 생성되고, 이 펄스들이 서로 중첩되어 연속적인 송신 파형 'tx_signal'이 만들어진다.

즉,

- impulse modulation: 데이터 심벌을 $T_s$ 간격의 임펄스 형태로 배치하는 과정
- pulse shaping: 각 임펄스에 Raised Cosine 펄스 모양을 입혀 실제 전송할 송신 파형을 만드는 과정

이라고 볼 수 있다.`
        },
        {
          "id": "20-2B3",
          "title": "2.B3.",
          "type": "essay",
          "prompt": `문제 2.B2에서 그린 펄스 성형된 파형을 바탕으로, 100개의 모든 심벌에서 ISI 존재 여부를 한 눈에 쉽게 파악할 수 있는가? 만약 쉽지 않다면, 쉽지 않은 이유를 쓰시오.

(참고. 출력된 이진 신호에 대해, 비트 구간이 $T$(Python 변수 'Ts')일 때, 비트 구간의 정수배 시점인 $0, 1T, 2T, 3T, \\cdots$에서 펄스 성형된 신호가 $1$ 또는 $-1$인지 확인하여 ISI 여부를 알 수 있음. 각 비트 구간의 정수배 지점에서 $1$ 또는 $-1$ 이외의 값을 가지면 ISI가 있음을 뜻함)
`,
          "referenceAnswer": `100개의 모든 심벌에 대해 ISI의 존재 여부를 현재의 펄스 성형 파형만 보고 한눈에 판단하기는 쉽지 않다.

ISI가 존재하지 않는지를 확인하려면 각 심벌의 검출 시점에서 펄스 성형 신호의 값이 정확히 해당 심벌값인 $+1$ 또는 $-1$을 지나는지를 확인해야 한다.

그러나 현재 그래프에는 100개의 심벌 구간에 해당하는 긴 송신 신호가 한꺼번에 표시되어 있기 때문에,

- 각 심벌의 정확한 샘플링 시점을 구별하기 어렵고,
- 많은 Raised Cosine 펄스가 서로 중첩되어 있으며,
- 각 심벌 시점의 값이 정확히 $+1$ 또는 $-1$인지 시각적으로 확인하기 어렵다.

또한 사용한 Raised Cosine 펄스는 6심벌 길이로 구현되어 있으므로 펄스의 최고점이 시작 지점에서 약 $3T_s$ 뒤에 위치한다. 따라서 실제 송신 파형을 분석할 때에는 이러한 펄스 성형 필터의 지연도 고려하여 심벌 검출 시점을 맞추어야 한다.

따라서 여러 심벌 구간의 파형을 짧은 구간으로 잘라 동일한 시간축에 겹쳐 표시하는 **eye diagram**을 사용하면 각 심벌 검출 시점에서 신호가 $+1$ 또는 $-1$로 모이는지를 훨씬 쉽게 확인할 수 있다.`
        },
        { //문제 2.C
          "id": "20-2C",
          "title": "2.C.",
          "prompt": `문제 2.B에서 완성한 ‘tx_sig_gen.py’ 파일을 수행하여 샘플된 파형 ‘tx_signal’를 생성하고, 다음의 절차에 따라 3 심벌(현재의 tx_sig_gen_Nid.py에서는 Binary 심벌을 고려하고 있으므로 3 비트에 해당)구간 동안의 eye-diagram을 그려보자. 

절차에 앞서 변수 ‘Ns’를 ‘1XXX’ (‘xxx’=자신 학번 끝 3자리)로 변경하시오.`
        },
        {
          "id": "20-2C1",
          "title": "2.C1.",
          "type": "python",
          consoleEnabled: true,
          "prompt": `‘tx_signal’은 송신신호 $s(t)$를 심벌당 ‘L’ 번 샘플링하여 얻어진 것이다. 따라서, ‘tmp = tx_signal[0 : 3*L]’를 실행하면 ‘tmp’는 처음 3심벌 구간 동안의 부분 $s(t)$ 즉, $0<t \\le 3T_s$ 구간의 샘플 벡터임을 알 수 있다. 아래 명령어는 $s(t)$의 $k$번째 3심벌 구간을 추출하고 추출한 구간을 ‘tmp’에 저장한다.
\`\`\`python
tmp = tx_signal[(k-1)*3*L : k*3*L]
\`\`\`
예를 들어, ‘k’=2 일 때 ‘tmp’는 $s(t)$의 $3T_s<t \\le 6T_s$ 구간의 샘플 벡터가 되고, ‘k’=3 일 때 ‘tmp’는 $s(t)$의 $6T_s<t \\le 9T_s$ 구간의 샘플 벡터가 된다. 아래 명령어의 ‘k’를 수정하고 Console에서 실행하여 이를 테스트해 보시오.`,
          "referenceAnswer": `Python에서는 배열의 인덱스가 0부터 시작하고 slicing의 마지막 인덱스는 포함되지 않으므로, $k$번째 3심벌 구간은

\`\`\`python
tmp = tx_signal[(k-1)*3*L : k*3*L]
\`\`\`

로 추출할 수 있다.

예를 들어,

\`\`\`python
k = 2
tmp = tx_signal[(k-1)*3*L : k*3*L]
\`\`\`

를 실행하면

\`\`\`python
tmp = tx_signal[3*L : 6*L]
\`\`\`

이 되어 두 번째 3심벌 구간을 추출한다.

또한 $k=3$이면

\`\`\`python
tmp = tx_signal[6*L : 9*L]
\`\`\`

이 되어 세 번째 3심벌 구간을 추출한다.

각 경우 'tmp'의 샘플 수는

$$
3L=3\\times16=48
$$

개이다.`
        },
        {
          "id": "20-2C2",
          "title": "2.C2.",
          "type": "graph",
          graphInputMode: 'both',
          graphXMin: 0,
          graphXMax: 3,
          graphYMin: -2,
          graphYMax: 2,
          graphShowGrid: true,
          "prompt": `3심벌 구간의 eye를 보기 위해서는 3심벌 단위의 조각 즉, $s(t)(0<t \\le 3T_s)$, $s(t)(3T_s<t \\le 6T_s)$, $s(t)(6T_s<t \\le 9T_s)$, $s(t)(9T_s<t \\le 12T_s)$, $\\cdots$를 동일한 그래프에 겹쳐 그리면 된다. ‘tx_sig_gen.py’에 아래 코드를 추가하자.
\`\`\`python
# 'tx_sig_gen.py'에 아래를 추가.
import matplotlib.pyplot as plt

num_segments = 3
plt.figure(200)
for k in range(2, num_segments + 2):
    tmp = tx_signal[? : ?] # k번째 3심벌 구간. 문제 2.C1 답 참고.
    plt.plot(t_step * np.arange(0, 3 * L), tmp)

plt.axis([0, 3, np.min(tx_signal), np.max(tx_signal)])
plt.grid()
plt.title('Eye Diagram')
plt.show()
\`\`\`
Raised cosine pulse ‘pt’의 최고점이 $t=3T_s$지점에 있으므로 Pulse shaping을 수행하면 $3T_s$만큼 데이터 심벌이 지연된다. 따라서, 2번째 3심벌 구간인 $3T_s<t \\le 6T_s$ 구간부터 그리려고 한다.

'tx_sig_gen.py'를 완성하고 실행하기 전에, 'tx_sig_gen.py'를 완성하고 실행하면 어떤 결과가 나올지 예측하여 그리시오. (py 스크립트에서 사용한 펄스의 모양을 감안하여 그릴 것. 자세히 그리지 않아도 됨)`,
          "referenceAnswer": `코드의 빈칸은 다음과 같이 채운다.

\`\`\`python
tmp = tx_signal[(k-1)*3*L : k*3*L]
\`\`\`

'num_segments = 3'이므로 $k=2,3,4$에 해당하는 세 개의 3심벌 구간이 $0$부터 $3T_s$까지의 동일한 시간축에 겹쳐 그려질 것으로 예상할 수 있다.

따라서 하나의 Figure에는 서로 다른 세 개의 송신 파형 조각이 중첩되어 나타난다.

사용한 Raised Cosine 펄스는 심벌 주기의 정수배 지점에서 0이 되는 특성을 가지므로, 필터 지연 $3T_s$를 고려하여 정렬된 파형들은 $0T_s$, $1T_s$, $2T_s$와 같은 심벌 시점에서 데이터 심벌값인 $+1$ 또는 $-1$을 지나게 된다.

각 심벌 사이에서는 Raised Cosine 펄스의 영향으로 부드러운 곡선 형태의 천이 경로가 나타날 것으로 예상할 수 있다.

단, 실제 데이터는 랜덤하게 생성되므로 각 실행에서 나타나는 세부적인 곡선의 형태는 달라질 수 있다.`
        },
        {
          "id": "20-2C3",
          "title": "2.C3.",
          "type": "python",
          starterCode: `# tx_sig_gen.py
import numpy as np

Ts = 1
L = 16
t_step = Ts / L

######### <1. Pulse waveform generation> ####################
pt = rcosdesign(?, 6, L, 'normal') #채워야 할 부분 (1)
pt = pt / np.max(pt)

######### <2. Ns bit binary symbol generation> #############
Ns = ?  #채워야 할 부분 (2)
data_bit = (np.random.rand(Ns) > 0.5)

######### <3. Unipolar to Bipolar (amplitude modulation)> ####
amp_modulated = 2 * data_bit.astype(int) - 1  # 0 => -1, 1 => 1

######### <4. Impulse modulation> ############################
impulse_modulated = np.array([])
for n in range(Ns):
    delta_signal = np.concatenate(([amp_modulated[n]], np.zeros(L - 1)))
    impulse_modulated = np.concatenate((impulse_modulated, delta_signal))

######### <5. Pulse shaping (Transmitter filtering)> #########
tx_signal = np.convolve(impulse_modulated, pt)

# 'tx_sig_gen.py'에 아래를 추가.
import matplotlib.pyplot as plt

num_segments = 3
plt.figure(200)
for k in range(2, num_segments + 2):
    tmp = tx_signal[? : ?] # k번째 3심벌 구간. 문제 2.C1 답 참고.
    plt.plot(t_step * np.arange(0, 3 * L), tmp)

plt.axis([0, 3, np.min(tx_signal), np.max(tx_signal)])
plt.grid()
plt.title('Eye Diagram')
plt.show()`,
          "prompt": `
\`\`\`python
# 'tx_sig_gen.py'에 아래를 추가.
import matplotlib.pyplot as plt

num_segments = 3
plt.figure(200)
for k in range(2, num_segments + 2):
    tmp = tx_signal[? : ?] # k번째 3심벌 구간. 문제 2.C1 답 참고.
    plt.plot(t_step * np.arange(0, 3 * L), tmp)

plt.axis([0, 3, np.min(tx_signal), np.max(tx_signal)])
plt.grid()
plt.title('Eye Diagram')
plt.show()
\`\`\`
?를 채워 'tx_sig_gen.py'를 완성하고 실행하여 eye diagram이 그려지는 과정을 살펴보자.

31번째 라인 'num_segments'를 3, 10, 30으로 바꿔가면서 결과 그래플를 각각 확인하시오.`,
          "referenceAnswer": `Raised Cosine 펄스의 Roll-off factor는 $0.25$이고, 'Ns'는 문제 2.C의 지시에 따라 자신의 학번 끝 3자리를 이용한 '1XXX'로 설정한다.

예를 들어 학번 끝 3자리가 123이면

\`\`\`python
Ns = 1123
\`\`\`

으로 설정한다.

Eye diagram을 위한 빈칸은 다음과 같이 채운다.

\`\`\`python
tmp = tx_signal[(k-1)*3*L : k*3*L]
\`\`\`

따라서 핵심 수정 부분은 다음과 같다.

\`\`\`python
pt = rcosdesign(0.25, 6, L, 'normal')
pt = pt / np.max(pt)

Ns = 1XXX  # XXX는 자신의 학번 끝 3자리

...

num_segments = 3

for k in range(2, num_segments + 2):
    tmp = tx_signal[(k-1)*3*L : k*3*L]
    plt.plot(t_step * np.arange(0, 3 * L), tmp)
\`\`\`

'num_segments'를 3, 10, 30으로 증가시키면 동일한 3심벌 구간 위에 겹쳐지는 파형의 수가 증가한다.

3개만 겹친 경우에는 가능한 파형 경로의 일부만 나타나지만, 10개와 30개로 증가할수록 다양한 연속 심벌 조합에 따른 경로들이 누적되어 eye diagram의 전체적인 눈 모양이 점차 뚜렷하게 나타난다.`
        },
        {
          "id": "20-2C4",
          "title": "2.C4.",
          "type": "python",
          responseEnabled: true,
          "prompt": `문제 2.C3의 py 스크립트를 복사하여 붙여넣은 후, 33번째 라인을 'for k in range(2, Ns // 3 + 1):'로 수정한 후, py 스크립트를 다시 실행하시오.

(a) 출력된 eye diagram 그림이 문제 2.C2에서 자신이 예측한 그림과 일치하는가?
(b) eye diagram의 곡선이 각 심벌 구간의 정수배 지점에서 정확히 $1$ 또는 $-1$을 지나는가?
(c) 만약, (b)의 답이 '그렇다'이면, ISI가 없다고 말할 수 있는가? 그 이유를 쓰시오.`,
          "referenceAnswer": `(a) 대체로 예측한 형태와 일치한다. 여러 개의 3심벌 구간을 동일한 시간축에 겹쳐 그리면 서로 다른 데이터 패턴에 따른 여러 파형 경로가 중첩되면서 eye diagram의 형태가 나타난다.

(b) 그렇다. Raised Cosine 펄스를 사용하였고 필터의 $3T_s$ 지연을 고려하여 구간을 정렬하였으므로, 각 심벌 구간의 정수배 시점에서 곡선들은 데이터 심벌값인 $+1$ 또는 $-1$을 지난다.

(c) 그렇다. 심벌 검출 시점에서 다른 심벌들에 의해 발생한 Raised Cosine 펄스의 값이 0이 되기 때문이다.

Raised Cosine 펄스는 이상적으로

$$
p(nT_s)=0 \\qquad (n\\ne0)
$$

을 만족한다.

따라서 어떤 심벌을 검출하는 시점에서는 해당 심벌의 성분만 남고 다른 심벌들의 펄스는 0이 된다.

그러므로 정확한 심벌 시점에서 eye diagram의 곡선이 모두 $+1$ 또는 $-1$을 지난다면 심벌 검출 시점에서 ISI가 발생하지 않는다고 판단할 수 있다.`
        },
        {
          "id": "20-2C5",
          "title": "2.C5.",
          "type": "essay",
          "prompt": `문제 2.C4에서 생성한 eye diagram의 한 심벌 구간을 관찰하시오.

한 심벌 구간 안에서는 크게 4가지 그룹의 경로를 확인할 수 있다. 이 4가지 경로는 연속한 두 심벌의 조합 $(1,1), (1,-1), (-1,1), (-1,-1)$에 각각 대응한다. eye diagram에서 각 경로가 위의 어떤 두 심벌 조합에 해당하는지 구분하여 설명하시오. 또한, 같은 부호의 두 심벌이 연속되는 경우와 서로 다른 부호의 두 심벌이 연속되는 경우에 파형의 진행 방향이 어떻게 달라지는지 함께 설명하시오.`,
          "referenceAnswer": `eye diagram의 한 심벌 구간에서 나타나는 4가지 주요 경로는 연속한 두 심벌의 조합에 따라 결정된다.

- $(1,1)$: 이전 심벌과 다음 심벌이 모두 $+1$인 경우로, 파형이 위쪽 레벨 부근을 유지하는 경로에 해당한다.
- $(-1,-1)$: 이전 심벌과 다음 심벌이 모두 $-1$인 경우로, 파형이 아래쪽 레벨 부근을 유지하는 경로에 해당한다.
- $(1,-1)$: $+1$에서 $-1$로 심벌이 변하는 경우로, 위쪽에서 아래쪽으로 내려가는 전이 경로에 해당한다.
- $(-1,1)$: $-1$에서 $+1$로 심벌이 변하는 경우로, 아래쪽에서 위쪽으로 올라가는 전이 경로에 해당한다.

즉, 같은 부호의 심벌이 연속되면 파형은 위쪽 또는 아래쪽 레벨을 유지하는 경로를 형성하고, 서로 다른 부호의 심벌이 연속되면 두 레벨 사이를 이동하는 상승 또는 하강 경로를 형성한다.`
        },
        {
          "id": "20-2C6",
          "title": "2.C6.",
          "type": "essay",
          "prompt": `문제 2.C4에서 생선한 eye diagram이 자신이 작성한 문제 1.C의 답과 일치하는지 쓰시오.`,
          "referenceAnswer": `문제 2.C4에서 관찰한 eye diagram의 결과는 문제 1.C에서 분석한 Raised Cosine 펄스의 특성과 일치한다.

문제 1.C에서 Raised Cosine 펄스는

$$
p(nT_s)=0 \\qquad (n\\ne0)
$$

인 zero-ISI 조건을 만족한다는 것을 확인하였다.

문제 2.C4의 eye diagram에서도 각 심벌 구간의 정수배 시점에서 여러 파형들이 $+1$ 또는 $-1$로 모이는 것을 확인할 수 있다.

이는 다른 심벌에서 발생한 Raised Cosine 펄스들이 해당 심벌 검출 시점에서는 0이 되기 때문이다.

따라서 문제 1.C에서 이론적으로 확인한 Raised Cosine 펄스의 zero-ISI 특성이 eye diagram에서도 동일하게 나타난다고 할 수 있다.`
        },
        {
          "id": "20-2C7",
          "title": "2.C7.",
          "type": "python",
          responseEnabled: true,
          "prompt": `문제 2.C4의 py 스크립트를 복사하여 붙여넣은 후, 34~35번째 라인의 심벌당 샘플 수를 가리키는 변수 'L'을 모두 '(L+1)'로 수정하고(총 3군데), py 스크립트를 다시 실행하고 출력한 eye diagram을 확인하시오.
          
수정한 코드는 원하는 eye diagram을 얻지 못하는 이유를 쓰시오.`,
          "referenceAnswer": `원하는 eye diagram을 얻지 못하는 이유는 실제 송신 신호 'tx_signal'에서 하나의 심벌이 여전히 $L$개의 샘플로 표현되어 있기 때문이다.

원래 3심벌 구간의 샘플 수는

$$
3L
$$

이므로 각 구간은

\`\`\`python
tx_signal[(k-1)*3*L : k*3*L]
\`\`\`

과 같이 잘라야 한다.

하지만 $L$을 임의로 $(L+1)$로 변경하면 한 구간의 길이를

$$
3(L+1)
$$

개의 샘플로 잘라내게 된다.

$L=16$인 경우 원래 3심벌 구간은

$$
3L=48
$$

샘플이지만, 수정 후에는

$$
3(L+1)=51
$$

샘플이 된다.

따라서 실제 심벌 경계와 잘라낸 구간의 경계가 일치하지 않는다. 또한 다음 구간으로 이동할 때마다 시작 위치가 실제 3심벌 간격보다 3샘플씩 더 이동하게 되어 각 파형의 심벌 시점이 서로 어긋난다.

Eye diagram은 동일한 심벌 시점의 파형들을 같은 위치에 정확하게 겹쳐야 하는데, $(L+1)$을 사용하면 각 조각의 시간 정렬이 맞지 않으므로 파형들이 서로 다른 위치에 겹쳐져 eye가 흐트러진다.

즉, **실제 심벌당 샘플 수는 $L$인데 구간을 $(L+1)$ 기준으로 잘못 분할하였기 때문**이다.`
        },
        { //문제 2.D
          "id": "20-2D",
          "title": "2.D.",
          "prompt": `본 문제에서는 4-ary PAM(Pulse Amplitude Modulation) 신호를 고려하자. 'tx_sig_gen.py'에서 'amp_modulated' 생성 부분을 아래와 같이 변경하여 4-ary PAM 송신 신호를 생성할 수 있다.
\`\`\`python
amp_modulated = 2 * np.ceil(np.random.rand(Ns) * 4) - 5 # Ns는 이제 데이터 비트수가 아니라 4-ary 데이터 심벌 수
\`\`\``
        },
        {
          "id": "20-2D1",
          "title": "2.D1.",
          "type": "essay",
          "prompt": `위와 같이 수정하면, ‘amp_modulated’의 원소는 몇 가지 값이 가능한가? 그리고 가능한 값들을 쓰시오.`,
          "referenceAnswer": `수정된 코드는

\`\`\`python
amp_modulated = 2 * np.ceil(np.random.rand(Ns) * 4) - 5
\`\`\`

이므로 'np.random.rand(Ns) * 4'는 $0$ 이상 $4$ 미만의 값을 생성하고, 'np.ceil()'을 적용하면 일반적으로

$$
1,\\;2,\\;3,\\;4
$$

중 하나가 된다.

따라서

$$
2\\times\\{1,2,3,4\\}-5
$$

를 계산하면 가능한 값은

$$
-3,\\;-1,\\;1,\\;3
$$

이다.

즉, 'amp_modulated'의 각 원소는 총 **4가지 값 $-3,-1,1,3$** 중 하나를 갖는다.`
        },
        {
          "id": "20-2D2",
          "title": "2.D2.",
          "type": "graph",
          graphInputMode: 'both',
          graphXMin: 0,
          graphXMax: 10,
          graphYMin: -5,
          graphYMax: 5,
          graphXAxisLabel: 't [sec]',
          graphYAxisLabel: 'x(t)*p(t)',
          graphShowGrid: true,
          "prompt": ` 위 ‘amp_modulated’의 처음 8개의 원소가 ‘[-1, 3, 3, –3, –1, 1, 1, –3]’이라고 가정하자. 처음 8개 심벌 구간에 대해 Pulse shaping된 송신신호 파형을 예측하여 그리시오.`,
          "referenceAnswer": `처음 8개의 4-ary PAM 심벌이

$$
[-1,\\;3,\\;3,\\;-3,\\;-1,\\;1,\\;1,\\;-3]
$$

이라고 하면, 임펄스 변조된 신호는 각 심벌 구간마다 해당 진폭을 갖는 임펄스가 배치된 형태가 된다.

Pulse shaping을 수행하면 송신 신호는

$$
s(t)
=
\\sum_{k} a_k p(t-kT_s)
$$

와 같이 각 심벌 $a_k$에 Raised Cosine 펄스 $p(t)$를 곱하여 이동시킨 뒤 모두 더한 형태가 된다.

따라서 각 심벌의 중심에서는 데이터 심벌의 값에 대응하여

$$
-1,\\;3,\\;3,\\;-3,\\;-1,\\;1,\\;1,\\;-3
$$

의 레벨을 지나게 되며, 심벌 사이에서는 Raised Cosine 펄스의 영향으로 부드럽게 연결되는 파형이 나타난다.

즉, Binary PAM에서 $+1$과 $-1$ 두 레벨만 나타났던 것과 달리, 4-ary PAM에서는

$$
-3,\\;-1,\\;1,\\;3
$$

의 네 진폭 레벨을 갖는 펄스 성형 파형을 그리면 된다.`
        },
        {
          "id": "20-2D3",
          "title": "2.D3.",
          "type": "python",
          responseEnabled: true,
          "prompt": `문제 2.C4의 py 스크립트를 복사하여 붙여넣은 후, 17번째 라인의 ‘amp_modulated를 위와 같이 수정하고 py 스크립트를 실행하시오. 출력된 eye diagram을 확인하시오.`,
          "referenceAnswer": `4-ary PAM으로 변경한 후 eye diagram을 그리면 Binary PAM의 경우보다 더 많은 경로와 진폭 레벨이 나타난다.

'amp_modulated'의 가능한 심벌값이

$$
-3,\\;-1,\\;1,\\;3
$$

의 네 가지이므로, 심벌 검출 시점에서 eye diagram의 곡선들은 이 네 레벨 중 하나를 지나게 된다.

또한 연속한 두 심벌의 조합 수가 Binary PAM보다 증가하므로, 심벌 사이를 연결하는 천이 경로의 종류도 많아져 eye diagram이 더 복잡한 형태를 보인다.

Raised Cosine 펄스를 사용하고 있으므로 정확한 심벌 시점에서는 다른 심벌의 펄스 성분이 0이 되어, 이상적인 경우 각 곡선은 심벌 검출 시점에서 $-3$, $-1$, $1$, $3$ 중 하나의 값에 모인다.

따라서 4-ary PAM의 eye diagram에서는 Binary PAM보다 여러 개의 eye opening과 더 다양한 천이 경로를 관찰할 수 있다.`
        },
        { //문제 2.E
          "id": "20-2E",
          "title": "2.E.",
          "prompt": `Roll-off factor에 따른 4-ary PAM 신호의 eye diagram을 비교해 보자.`
        },
        {
          "id": "20-2E1",
          "title": "2.E1.",
          "type": "python",
          responseEnabled: true,
          "prompt": `문제 2.D3의 py 스크립트를 복사하여 붙여넣은 후, Roll-off factor $r=0, 0.5, 0.75, 1$일 때 'tx_sig_gen.py'을 각각 실행하여 4개의 eye diagram을 관찰하시오.
          
Roll-off factor에 따른 eye diagram의 변화를 관찰하시오. Roll-off factor가 커짐에 따라 eye가 더 넓게 열리는지 좁게 열리는지 판단하여 이를 정리하시오.`,
          // 20-2E1
"referenceAnswer": `Roll-off factor가 증가할수록 eye diagram의 eye가 일반적으로 더 넓게 열리는 것을 관찰할 수 있다.

Raised Cosine 펄스는 모든 Roll-off factor에서 이상적인 심벌 샘플링 시점의 zero-ISI 조건을 만족하므로, 정확한 심벌 시점에서는 신호가 $+1$ 또는 $-1$에 모인다.

그러나 Roll-off factor가 작을수록 시간 영역에서 펄스의 꼬리와 진동이 길게 나타나고, 심벌 샘플링 시점에서 조금 벗어났을 때 인접 심벌의 영향을 더 크게 받을 수 있다.

반대로 Roll-off factor가 증가하면 펄스가 시간 영역에서 더 빠르게 감쇠하므로 eye의 수평 방향 개방 정도가 커지고, 샘플링 시점의 오차에 대해 상대적으로 여유가 커진다.

따라서 $r=0$에서 eye가 상대적으로 좁고, $r$이 $0.5$, $0.75$, $1$로 증가할수록 eye가 더 넓게 열리는 경향을 확인할 수 있다.`
        },
        {
          "id": "20-2E2",
          "title": "2.E2.",
          "type": "python",
          responseEnabled: true,
          starterCode: `# tx_sig_gen.py
import numpy as np

Ts = 1
L = 16
t_step = Ts / L

######### <1. Pulse waveform generation> ####################
pt = rcosdesign(?, 6, L, 'normal') #채워야 할 부분 (1)
pt = pt / np.max(pt)

######### <2. Ns bit binary symbol generation> #############
Ns = ?  #채워야 할 부분 (2)
data_bit = (np.random.rand(Ns) > 0.5)

######### <3. Unipolar to Bipolar (amplitude modulation)> ####
amp_modulated = 2 * np.ceil(np.random.rand(Ns) * 4) - 5

######### <4. Impulse modulation> ############################
impulse_modulated = np.array([])
for n in range(Ns):
    delta_signal = np.concatenate(([amp_modulated[n]], np.zeros(L - 1)))
    impulse_modulated = np.concatenate((impulse_modulated, delta_signal))

######### <5. Pulse shaping (Transmitter filtering)> #########
tx_signal = np.convolve(impulse_modulated, pt)

# 'tx_sig_gen.py'에 아래를 추가.
import matplotlib.pyplot as plt
from scipy.signal import welch

rolloffs = [0, 0.5, 0.75, 1]

plt.figure(300)
for r in rolloffs:
    pt = rcosdesign(r, 6, L, 'normal')
    pt = pt / np.max(pt)
    tx_signal = np.convolve(impulse_modulated, pt)

    f, Pxx = welch(tx_signal, fs=16, nperseg=L * 8, noverlap=None, nfft=2048)
    plt.plot(f, 10 * np.log10(Pxx))

plt.axis([0, 1, -10, 15])
plt.legend(['r=0', 'r=0.5', 'r=0.75', 'r=1'])
plt.grid()`,
          "prompt": `아래는 Roll-off factor $r=0, 0.5, 0.75, 1$경우에 대해 각각 Raised Cosine 펄스를 생성하고, 동일한 데이터 심벌에 대해 Pulse shaping된 송신 신호 'tx_signal'의 Power Spectral Density(PSD)를 그린다. 그리고, 4개의 PSD를 하나의 Figure에 서로 다른 선으로 겹쳐 그리고, 'plt.legend()'를 이용하여 각 곡선의 Roll-off factor를 표시한다.
\`\`\`python
# 'tx_sig_gen.py'에 아래를 추가.
import matplotlib.pyplot as plt
from scipy.signal import welch

rolloffs = [0, 0.5, 0.75, 1]

plt.figure(300)
for r in rolloffs:
    pt = rcosdesign(r, 6, L, 'normal')
    pt = pt / np.max(pt)
    tx_signal = np.convolve(impulse_modulated, pt)

    f, Pxx = welch(tx_signal, fs=16, nperseg=L * 8, noverlap=None, nfft=2048)
    plt.plot(f, 10 * np.log10(Pxx))

plt.axis([0, 1, -10, 15])
plt.legend(['r=0', 'r=0.5', 'r=0.75', 'r=1'])
plt.grid()
\`\`\`
출력된 4개의 PSD를 비교하여 Roll-off factor가 증가함에 따라 송신 신호의 주파수 대역이 어떻게 변화하는지 관찰하시오.
          `,
          // 20-2E2
"referenceAnswer": `Roll-off factor가 증가할수록 Raised Cosine 펄스 성형 신호의 주파수 대역폭은 증가한다.

Raised Cosine 필터의 주파수 응답은 Roll-off factor $r$에 따라 천이 대역의 폭이 달라지며, 스펙트럼이 0이 되는 최대 주파수는

$$
B=\\frac{1+r}{2T_s}
$$

이다.

현재 $T_s=1$이므로

$$
B=\\frac{1+r}{2}
$$

가 된다.

따라서 각 Roll-off factor에 대한 이론적인 대역 끝 주파수는

- $r=0$: $B=0.5$ Hz
- $r=0.5$: $B=0.75$ Hz
- $r=0.75$: $B=0.875$ Hz
- $r=1$: $B=1$ Hz

이다.

실제로 출력된 PSD에서도 Roll-off factor가 커질수록 스펙트럼이 더 높은 주파수까지 퍼지는 것을 확인할 수 있다.

즉, Roll-off factor를 크게 설정하면 시간 영역에서는 펄스가 더 빠르게 감쇠하지만, 그 대가로 주파수 영역에서 더 넓은 대역폭을 사용하게 된다.`
        },
        {
          "id": "20-2E3",
          "title": "2.E3.",
          "type": "essay",
          "prompt": `Rasied cosine 펄스 성형 신호의 스펙트럼과 6 dB 대역폭을 분석하자. 6 dB 대역폭은 PSD 그래프에서, 기저대역 신호의 경우 x=0에서 y축 값(일반적으로 최댓값)을 PSD(0)이라 할 때, y축 값이 PSD(0)-z이 되는 점의 x축 값(주파수)이며, 통과대역신호의 경우, 중심 주파수의 PSD 값보다 z dB 작은 값을 y 값으로 갖는 두 지점의 x축 값의 거리를 의미한다.
          
(a) 문제 2.E2에서 얻은 PSD 그래프로부터, 스펙트럼의 중심 주파수(=0 Hz)에서 PSD 값(y축 값)을 읽어 내시오.
(b) 문제 2.E2에서 얻은 4개의 Rasied cosine의 PSD 그래프에서 6 dB 대역폭이 각각 얼마인지 읽어 내시오.`,
          // 20-2E3
"referenceAnswer": `(a) 중심 주파수 $f=0$ Hz에서의 PSD 값은 문제 2.E2에서 실제로 출력된 Welch PSD 그래프의 $y$축 값을 읽어 기록한다.

랜덤하게 생성된 데이터와 Welch PSD 추정 과정 때문에 실행할 때마다 정확한 수치는 다소 달라질 수 있으므로, 그래프에서 측정한 값을 답으로 사용한다.

(b) Raised Cosine 스펙트럼에서 6 dB 대역폭은 Roll-off factor와 관계없이 이론적으로

$$
f=\\frac{1}{2T_s}
$$

부근에서 나타난다.

현재 $T_s=1$이므로

$$
B_{6\\mathrm{dB}}=\\frac{1}{2}=0.5\\ \\mathrm{Hz}
$$

이다.

따라서 PSD 그래프에서 읽은 6 dB 대역폭은 대략

- $r=0$: 약 $0.5$ Hz
- $r=0.5$: 약 $0.5$ Hz
- $r=0.75$: 약 $0.5$ Hz
- $r=1$: 약 $0.5$ Hz

가 된다.

Roll-off factor에 따라 전체 스펙트럼의 끝 주파수는 달라지지만, Raised Cosine의 천이 대역 중심인 $1/(2T_s)$에서는 주파수 응답의 크기가 최대값의 절반이 된다. PSD는 진폭 응답의 제곱에 비례하므로 이 지점의 전력은 최대값의 $1/4$, 즉 약 $-6$ dB가 된다.

실제 Welch PSD에서는 유한한 데이터 길이와 PSD 추정 오차 때문에 정확히 $0.5$ Hz에서 6 dB 차이가 나지 않을 수 있으므로, 그래프에서는 $0.5$ Hz 부근의 값으로 측정할 수 있다.`
        },
        {
          "id": "20-2E4",
          "title": "2.E4.",
          "type": "essay",
          "prompt": `문제 2.E3 (b)에서, Raised cosine 펄스성형된 신호의 6 dB 대역폭이 Roll-off factor 값에 상관없이 $0.5$로 동일한가? 다음 과정을 통해 6 dB 대역폭이 동일한 이유를 설명하시오.

(a) 심벌 Rate를 $R_s$ [Hz], Raised cosine 펄스의 푸리에 변환을 $H_{RC}(f)$로 두자. 그러면 $H_{RC}(f)$는 Roll-off factor에 상관없이 $f=\\dfrac{R_s}{2}$ Hz에서 특정 값으로 감소한다. 이 특정 값은 얼마인가?
(b) 진폭이 50% 감소 할 때, 전력 감소량을 dB 단위로 계산하시오.
(c) (a)와 (b)의 답으로부터, 문제 2.E2의 모든 PSD의 6 dB 대역폭이 동일한 이유와 6 dB 대역폭이 $0.5$인 이유를 설명하시오`,
          // 20-2E4
"referenceAnswer": `(a) Raised Cosine 펄스의 푸리에 변환 $H_{RC}(f)$는 Roll-off factor와 관계없이

$$
f=\\frac{R_s}{2}
$$

에서 최대 진폭의 절반이 된다.

즉,

$$
H_{RC}\\left(\\frac{R_s}{2}\\right)
=
\\frac{1}{2}H_{RC}(0)
$$

이다.

(b) 진폭이 50%로 감소하면 전력은 진폭의 제곱에 비례하므로

$$
\\left(\\frac{1}{2}\\right)^2
=
\\frac{1}{4}
$$

배가 된다.

따라서 전력 감소량을 dB로 나타내면

$$
10\\log_{10}\\left(\\frac{1}{4}\\right)
\\approx -6.02\\ \\mathrm{dB}
$$

이다.

즉, 진폭이 절반이 되는 지점은 PSD 기준으로 약 $6$ dB 감소한 지점에 해당한다.

(c) Raised Cosine 펄스는 Roll-off factor가 달라도 항상

$$
f=\\frac{R_s}{2}
$$

에서 진폭 응답이 최대값의 절반이 된다.

따라서 PSD에서는 이 지점에서 최대값보다 약 $6$ dB 작은 값을 가지므로, 모든 Roll-off factor에 대해 6 dB 대역폭이 동일하게 나타난다.

현재 $T_s=1$이므로

$$
R_s=\\frac{1}{T_s}=1\\ \\mathrm{Hz}
$$

이고,

$$
\\frac{R_s}{2}
=
0.5\\ \\mathrm{Hz}
$$

이다.

따라서 모든 Raised Cosine 펄스 성형 신호의 6 dB 대역폭은 약 $0.5$ Hz가 된다.`
        },
        {
          "id": "20-2E5",
          "title": "2.E5.",
          "type": "essay",
          "prompt": `Raised cosine 펄스 성형 신호의 대역폭과 관련하여 다음 물음에 답하시오.

(a) 문제 2.E2에서 얻은 PSD 그래프로부터, 4개의 Raised cosine 펄스성형 신호의 20 dB 대역폭을 측정하시오.
(b) Roll-off factor와 대역폭의 관계를 쓰시오.`,
          // 20-2E5
"referenceAnswer": `(a) 20 dB 대역폭은 각 PSD 그래프에서 중심 주파수 $f=0$ Hz의 PSD 값보다 $20$ dB 작은 지점의 주파수를 읽어 측정한다.

Welch 방법으로 추정한 PSD이므로 실제 측정값은 실행할 때마다 약간 달라질 수 있다. 따라서 문제 2.E2에서 자신이 얻은 그래프에서 직접 읽은 값을 기록한다.

일반적으로 Roll-off factor가 증가할수록 20 dB 대역폭도 증가하는 것을 확인할 수 있다.

(b) Raised Cosine 펄스의 주파수 응답이 0이 되는 최대 주파수는

$$
B=\\frac{(1+r)R_s}{2}
$$

이다.

따라서 Roll-off factor $r$가 증가하면 Raised Cosine 펄스 성형 신호가 차지하는 주파수 대역폭도 증가한다.

현재 $R_s=1$ Hz이므로 이상적인 스펙트럼의 끝 주파수는

$$
B=\\frac{1+r}{2}
$$

가 된다.

예를 들어,

- $r=0$이면 $B=0.5$ Hz
- $r=0.5$이면 $B=0.75$ Hz
- $r=0.75$이면 $B=0.875$ Hz
- $r=1$이면 $B=1$ Hz

이다.

즉, Roll-off factor가 클수록 더 넓은 주파수 대역을 사용한다.`
        },
        {
          "id": "20-2E6",
          "title": "2.E6.",
          "type": "essay",
          "prompt": `문제 2.E1과 2.E5 (b)의 결과를 토대로, 작은 Roll-off factor 의 장·단점, 큰 Roll-off factor의 장·단점을 각각 쓰시오.`,
          // 20-2E6
"referenceAnswer": `문제 2.E1의 eye diagram과 문제 2.E5의 대역폭 결과를 함께 고려하면 Roll-off factor에는 다음과 같은 trade-off가 있다.

**작은 Roll-off factor**

장점:
- 주파수 영역에서 차지하는 대역폭이 작다.
- 주어진 주파수 자원을 보다 효율적으로 사용할 수 있다.

단점:
- 시간 영역에서 펄스의 꼬리가 길게 유지된다.
- 심벌 샘플링 시점에서 조금 벗어날 경우 인접 심벌의 영향을 더 크게 받을 수 있다.
- eye diagram의 수평 방향 개방 정도가 상대적으로 작아 timing error에 더 민감할 수 있다.

**큰 Roll-off factor**

장점:
- 시간 영역에서 펄스가 더 빠르게 감쇠한다.
- eye diagram이 더 넓게 열리는 경향을 보이므로 심벌 샘플링 시점의 오차에 대해 상대적으로 여유가 크다.
- 실제 시스템에서 timing error에 대한 민감도를 줄일 수 있다.

단점:
- 주파수 영역에서 더 넓은 대역폭을 사용한다.
- 따라서 주파수 효율은 감소한다.

즉, 작은 Roll-off factor는 대역폭 효율 측면에서 유리하고, 큰 Roll-off factor는 시간 영역에서의 파형 감쇠 및 timing 여유 측면에서 유리하다.`
        },
      ]
    },
    { //문제 3
      "id": "20-3",
      "title": "3. 정합 필터링(Matched Filtering) 후의 Eye Diagram",
      "problems": [
        { //문제 3.A
          "id": "20-3A",
          "title": "3.A.",
          "type": "essay",
          "prompt": `AWGN 노이즈 환경에서 수신된 펄스 신호에 대하여 신호 대 잡음비를 최대로 하기 위한 수신 필터를 Matched Filter(정합 필터)라 한다. 이론에 따르면 송신기에서 사용한 펄스 $p(t)$에 대한 수신단의 정합 필터의 임펄스 응답은 $p^{*}(-t)$로 주어진다. 즉, 수신 신호와 $p^{*}(-t)$의 컨볼루션이 수신 필터의 출력이 된다.
          
$p(t)$가 Raised cosine pulse인 경우, $p^{*}(-t)$와 $p(t)$가 동일한 이유를 설명하시오.`,
          // 20-3A
"referenceAnswer": `Raised Cosine(RC) 펄스 $p(t)$는 실수(real-valued)이고 $t=0$을 기준으로 좌우 대칭인 짝함수(even function)이다.

따라서 복소켤레를 취해도

$$
p^{*}(t)=p(t)
$$

이고, 시간 반전을 하여도

$$
p(-t)=p(t)
$$

이다.

그러므로

$$
p^{*}(-t)=p(-t)=p(t)
$$

가 성립한다.

따라서 Raised Cosine 펄스를 사용한 경우 정합 필터의 임펄스 응답은 송신 펄스 $p(t)$와 동일하다.`
        },
        { //문제 3.B
          "id": "20-3B",
          "title": "3.B.",
          "type": "python",
          "prompt": `문제 3.A의 결과에 따르면, 송신 신호(‘tx_signal’)와, 송신 신호를 생성하는데 사용된 Pulse shape(‘pt’)를 컨볼루션(convolution)하여 정합 필터링을 수행할 수 있다. 먼저, 노이즈가 없는 수신 신호에 정합 필터링를 수행하여 ye diagram이 어떻게 변하는지 확인해보자.

정합필터 출력의 샘플 벡터 ‘matched_out’을 생성하기 위해 py 스크립트 ‘tx_sig_gen.py’의 26번째 라인 ‘tx_signal = np.convolve(impulse_modulated, pt)’ 바로 아래에 다음 라인을 추가하자. (문제 2.C4의 py 스크립트를 가져올 것)
\`\`\`python
matched_out = np.convolve(tx_signal, pt)
\`\`\`
‘tx_signal’ 대신 ‘matched_out’으로 eye diagram을 그리기 위해, eye diagram을 그리는 35, 38번째 라인에 있는 ‘tx_signal’을 ‘matched_out’으로 바꾸자(총 3개). Roll-off factor를 $0.5$로 설정하고, Binary와 4-ary PAM 신호에 대해 각각 수정된 py 스크립트를 실행하시오. ‘matched_out’으로 그린 Binary와 4-ary PAM 신호의 eye diagram을 확인하시오.`,
          // 20-3B
"referenceAnswer": `Raised Cosine 펄스는 실수이며 짝함수이므로 정합 필터의 임펄스 응답도 'pt'와 동일하다.

따라서 정합 필터 출력은

\`\`\`python
matched_out = np.convolve(tx_signal, pt)
\`\`\`

로 구할 수 있다.

이때 송신 신호는 이미

$$
s(t)=\\sum_k a_k p(t-kT_s)
$$

의 형태이므로, 정합 필터 출력의 전체 펄스 응답은

$$
p(t)*p(t)
$$

가 된다.

Binary PAM에서는 심벌값 $-1,+1$에 대응하는 eye diagram이 나타나고, 4-ary PAM에서는 $-3,-1,1,3$에 대응하는 여러 레벨의 eye diagram이 나타난다.

그러나 Raised Cosine 펄스를 송신단과 정합 필터에서 다시 한 번 사용하면 전체 응답이 Raised Cosine 자체가 아니라 $p(t)*p(t)$가 되므로, 심벌 검출 시점에서 완전한 zero-ISI 조건이 유지되지 않을 수 있다.`
        },
        { //문제 3.C
          "id": "20-3C",
          "title": "3.C.",
          "type": "essay",
          "prompt": `(a) 문제 3.B의 결과에서, 정합 필터의 출력에서 ISI가 존재하는지 확인하시오. 다시 말해, 심벌 구간의 정수배인 $t=1, 2, \\cdots$ [sec] 지점에서, Binary 신호의 경우 eye diagram의 곡선이 정확히 2개의 지점으로 모이는가? 그리고 4-ary PAM의 경우, eye diagram의 곡선이 정확히 4개의 지점으로 모이는가? 
(b) 만약 ISI가 존재한다면, Raised cosine 펄스를 사용하였음에도 ISI가 발생하는 이유를 설명하시오.`,
          // 20-3C
"referenceAnswer": `(a) 정합 필터 출력에서는 일반적으로 ISI가 존재한다.

Binary PAM의 경우 eye diagram의 곡선들이 심벌 검출 시점에서 정확히 $+1$, $-1$의 두 지점으로 완전히 모이지 않고, 4-ary PAM의 경우에도 정확히 $-3,-1,1,3$의 네 지점으로 완전히 모이지 않는 것을 확인할 수 있다.

(b) Raised Cosine 펄스 자체는

$$
p(nT_s)=0 \\qquad (n\\ne0)
$$

을 만족하여 zero-ISI 특성을 갖는다.

그러나 수신기에서 동일한 Raised Cosine 펄스를 정합 필터로 사용하면 전체 시스템의 펄스 응답은

$$
p(t)*p(t)
$$

가 된다.

이 convolution 결과는 일반적으로 원래의 Raised Cosine 펄스와 동일하지 않으며, 심벌 주기의 정수배 지점에서 반드시 0이 되는 것도 아니다.

따라서 송신단에서 Raised Cosine 펄스를 사용한 상태에서 다시 Raised Cosine 정합 필터를 통과시키면 전체 응답의 zero-ISI 특성이 깨질 수 있으므로 ISI가 발생한다.`
        },
        { //문제 3.D
          "id": "20-3D",
          "title": "3.D.",
          "type": "python",
          "prompt": `본 문제를 통해 수신기에서 정합 필터링을 수행하는 경우, 송신기에서 Raised cosine 펄스가 아닌 SRRC 펄스를 사용하여 펄스 성형을 해야 하는 이유를 알아보자. 이를 위해, SRRC 펄스로 펄스 성형을 수행하도록 ‘tx_sig_gen.py’에서 9번째 라인 ‘pt = rcosdesign(0.5, 6, L, 'normal')’을 ‘pt = rcosdesign(0.5, 6, L, 'sqrt')’로 수정하고, 10번째 라인 ‘pt = pt / np.max(pt)’을 ‘pt = pt / np.sqrt(np.max(np.convolve(pt, pt)))’로 수정하자. (문제 3.B의 py 스크립트를 가져올 것)

먼저, SRRC 펄스성형된 송신신호의 샘플 벡터 ‘tx_signal’(‘matched_out’이 아님을 주의)의 eye diagram을 확인하자. 이를 위해, eye diagram을 그리는 35, 38번째 라인에 있는 모든 ‘matched_out’을 ‘tx_signal’ 으로 바꾸시오. Binary와 4-ary PAM 신호에 대해 각각 수정된 ‘tx_sig_gen.py’을 실행하고, ‘tx_signal’을 사용하여 그린 각각의 eye diagram을 확인하시오.`,
          // 20-3D
"referenceAnswer": `송신 펄스를 SRRC로 변경하려면 다음과 같이 수정한다.

\`\`\`python
pt = rcosdesign(0.5, 6, L, 'sqrt')
pt = pt / np.sqrt(np.max(np.convolve(pt, pt)))
\`\`\`

SRRC 펄스로 생성한 'tx_signal'의 eye diagram을 관찰하면, Raised Cosine 펄스를 사용했을 때와 달리 심벌 검출 시점에서 모든 곡선이 정확히 심벌값에 모이지 않는 것을 확인할 수 있다.

Binary PAM에서는 $+1$, $-1$ 부근에서 퍼짐이 나타나고, 4-ary PAM에서도 $-3,-1,1,3$ 부근에서 퍼짐이 나타난다.

이는 SRRC 펄스 자체가 일반적으로 심벌 주기의 정수배 지점에서 0이 되지 않기 때문이다.`
        },
        { //문제 3.E
          "id": "20-3E",
          "title": "3.E.",
          "type": "essay",
          "prompt": `‘tx_signal’에서 ISI가 존재하는지 아닌지 확인하자.

(a) ISI가 존재하는 이유를 설명하시오.
(b) 심벌 검출을 위해 정합 필터링을 수행하기 전의 송신 신호에 존재하는 ISI는 문제가 되지 않는다. 수신기에서 ISI를 제거하는 방법을 설계하고, 자신의 설계한 방법에 대해 자세히 설명하시오.`,
          // 20-3E
"referenceAnswer": `(a) SRRC 펄스 자체는 Raised Cosine 펄스와 달리

$$
p(nT_s)=0 \\qquad (n\\ne0)
$$

의 zero-ISI 조건을 직접 만족하지 않는다.

따라서 SRRC 펄스로만 송신 신호를 성형한 'tx_signal'에서는 인접 심벌의 펄스 성분이 심벌 검출 시점에 남아 있으므로 ISI가 존재한다.

(b) 수신기에서는 송신단에서 사용한 SRRC 펄스와 정합되는 SRRC 필터를 사용한다.

송신 SRRC 펄스를 $p_{SRRC}(t)$라 하면 수신 정합 필터도 동일한 형태를 가지므로 전체 응답은

$$
p_{SRRC}(t)*p_{SRRC}(t)
$$

가 된다.

SRRC는 두 개를 convolution했을 때 Raised Cosine 응답이 되도록 설계된 펄스이므로

$$
p_{SRRC}(t)*p_{SRRC}(t)
=
p_{RC}(t)
$$

가 된다.

Raised Cosine 응답은 심벌 주기의 정수배 지점에서 zero-ISI 조건을 만족하므로, 수신단에서 SRRC 정합 필터링을 수행한 뒤 적절한 심벌 시점에서 샘플링하면 ISI를 제거할 수 있다.`
        },
        { //문제 3.F
          "id": "20-3F",
          "title": "3.F.",
          "type": "python",
          "prompt": `이제 SRRC 펄스성형을 하였을 때, 정합 필터 출력인 ‘matched_out’의 eye diagram을 살펴보자. 이를 위해, 문제 3.D의 py 스크립트를 복사하여 붙여넣은 후, eye diagram을 그리는 35, 38번째 라인에 있는 모든 ‘tx_signal’을 ‘matched_out’으로 바꾸시오. Binary와 4-ary PAM 신호에 대해 각각 수정된 ‘tx_sig_gen.py’을 실행하고, ‘matched_out’을 사용하여 그린 2개의 eye diagram을 확인하시오.`,
          // 20-3F
"referenceAnswer": `송신기에서 SRRC 펄스로 성형한 후 동일한 SRRC 펄스를 정합 필터로 사용하면

$$
p_{SRRC}(t)*p_{SRRC}(t)
=
p_{RC}(t)
$$

의 관계에 의해 전체적인 펄스 응답이 Raised Cosine 형태가 된다.

따라서 'matched_out'의 eye diagram에서는 'tx_signal' 자체의 eye diagram보다 eye가 더 명확하게 열리며, 심벌 검출 시점에서 곡선들이 심벌값으로 모이는 것을 확인할 수 있다.

Binary PAM의 경우에는 $+1$, $-1$의 두 레벨로, 4-ary PAM의 경우에는 $-3,-1,1,3$의 네 레벨로 모인다.

단, 실제 코드에서는 유한 길이의 SRRC 펄스를 사용하므로 매우 작은 잔류 ISI가 나타날 수 있다.`
        },
        { //문제 3.G
          "id": "20-3G",
          "title": "3.G.",
          "type": "essay",
          "prompt": `문제 3.F에서 구현한 시스템은 송신기에서 SRRC 펄스 성형을 수행하고, 수신기에서 정합 필터링을 수행하는 시스템이다.

(a) 이러한 시스템의 정합 필터의 출력에서 ISI가 존재하는가? 자신의 답에 대한 이유도 쓰시오.
(b) 이때까지의 문항들을 통해 ISI가 없는 두 가지 경우를 확인하였다. 송신기에서 SRRC 펄스 성형 후 수신기에서 정합 필터를 수행하는 경우, 그리고 송신기에서 Raised cosine (RC) 펄스성형 후 수신기에서 이상적인 LPF를 수행하는 경우. 이 두 경우에 대해 각각 심벌 검출 단계에서 ISI가 발생하지 않는 이유를 설명하시오.
(c) (b)에서 설명한 두 경우에 대해 실제 시스템에 적용한다고 했을 때, 어떤 방식이 적합할지 노이즈 관점에서 비교하여 설명하시오.`,
          // 20-3G
"referenceAnswer": `(a) 이상적인 경우에는 ISI가 존재하지 않는다.

송신기와 수신기에서 각각 SRRC 펄스를 사용하면 전체 펄스 응답은

$$
p_{SRRC}(t)*p_{SRRC}(t)=p_{RC}(t)
$$

가 된다.

Raised Cosine 펄스는 심벌 주기의 정수배 지점에서 zero-ISI 조건을 만족하므로, 정합 필터 출력에서 올바른 시점에 심벌을 검출하면 ISI가 발생하지 않는다.

(b) 두 경우를 비교하면 다음과 같다.

**SRRC 송신 펄스 + SRRC 정합 필터**

송신기와 수신기의 SRRC 필터가 합쳐져 전체적으로 Raised Cosine 응답을 형성한다.

따라서

$$
p_{RC}(nT_s)=0 \\qquad (n\\ne0)
$$

이 되어 심벌 검출 시점에서 ISI가 제거된다.

**Raised Cosine 송신 펄스 + 이상적인 LPF**

송신기에서 사용한 Raised Cosine 펄스 자체가 이미 zero-ISI 조건을 만족한다. 수신기의 이상적인 LPF가 필요한 신호 대역을 왜곡 없이 통과시킨다면 심벌 검출 시점에서 Raised Cosine의 zero-ISI 특성이 유지되므로 ISI가 발생하지 않는다.

(c) AWGN 환경에서는 SRRC 송신 필터와 정합 필터를 사용하는 방식이 더 적합하다.

정합 필터는 단순히 신호의 대역만 제한하는 필터가 아니라, AWGN 환경에서 특정 심벌 검출 시점의 출력 SNR을 최대화하도록 설계된 필터이다.

따라서 SRRC 송신 필터와 SRRC 정합 필터를 사용하면

1. 두 필터의 전체 응답을 Raised Cosine으로 만들어 ISI를 억제하고,
2. 정합 필터를 통해 AWGN 환경에서 심벌 검출 시점의 SNR을 최대화할 수 있다.

반면 이상적인 LPF는 대역 밖의 노이즈를 제거할 수는 있지만 일반적으로 정합 필터처럼 심벌 검출 시점의 SNR을 최대화하도록 설계된 필터는 아니다.`
        },
        { //문제 3.H
          "id": "20-3H",
          "title": "3.H.",
          "type": "python",
          "prompt": `'pt'는 SRRC를 사용한 상태에서, Roll-of factor만 $0, 0.25, 0.75, 1$인 경우로 수정하여 정합 필터 출력 'matched_out'을 사용하여 eye diagram을 각각 그리시오. 각 Roll-off factor 값에 대해 Binary인 경우, 4-ary인 경우 2개의 eye diagram을 확인하시오.`,
          // 20-3H
"referenceAnswer": `SRRC 펄스의 Roll-off factor를 $0$, $0.25$, $0.75$, $1$로 변경하면서 정합 필터 출력 'matched_out'의 eye diagram을 비교한다.

이론적으로는 모든 Roll-off factor에서 송신 SRRC 필터와 수신 SRRC 정합 필터의 전체 응답이 Raised Cosine이 되므로 ISI가 없어야 한다.

그러나 실제 eye diagram에서는 Roll-off factor가 큰 경우에는 심벌 검출 시점에서 곡선들이 비교적 정확하게 심벌값으로 모이는 반면, Roll-off factor가 작아질수록 심벌값 주변에 약간의 퍼짐이 나타날 수 있다.

특히 $r=0$ 또는 $r=0.25$와 같이 작은 Roll-off factor에서 이러한 잔류 ISI가 더 뚜렷하게 나타날 수 있다.

Binary PAM에서는 $+1,-1$, 4-ary PAM에서는 $-3,-1,1,3$을 기준으로 이러한 차이를 관찰할 수 있다.`
        },
        { //문제 3.I
          "id": "20-3I",
          "title": "3.I.",
          "type": "python",
          "prompt": `이론적으로는 SRRC 펄스를 사용하여 정합 필터링을 수행 하면, 정합 필터의 출력은 Raised cosine 펄스와 동일하므로, Roll-off factor와 상관없이 ISI가 존재하지 않아야 한다. 하지만 문제 3.H에서 확인한 eye diagram을 보면, Roll-off factor가 감소함에 따라 정합 필터의 출력에서 Binary 신호의 경우에 $1$ 또는 $–1$(4-ary PAM 신호의 경우에는 $–3, -1, 1, 3$)을 정확히 지나지 않는다. 즉, ISI가 존재한다.

문제 1.B와 1.D로부터, 이상적인 SRRC 펄스와 py 스크립트에서 구현하여 사용하고 있는 SRRC 펄스의 차이점을 찾을 수 있다. 이를 바탕으로, ISI가 존재하는 이유를 설명하시오. 특히, Roll-off factor가 작은 경우에 대해 설명하시오.`,
          // 20-3I
"referenceAnswer": `이론적인 SRRC 펄스는 시간 영역에서 무한한 길이를 갖는다.

그러나 py 스크립트의

\`\`\`python
rcosdesign(r, 6, L, 'sqrt')
\`\`\`

은 전체 길이가 6심벌인 유한한 SRRC 펄스만을 생성한다. 즉, 이상적인 SRRC 펄스의 양쪽 꼬리를 잘라낸 근사 펄스를 사용하고 있다.

따라서 실제 코드에서 두 SRRC 펄스를 convolution해도 완벽한 Raised Cosine 펄스가 되지 않고,

$$
p_{SRRC}(t)*p_{SRRC}(t)
\\approx p_{RC}(t)
$$

의 관계만 성립한다.

이 때문에 심벌 주기의 정수배 위치에서 값이 정확히 0이 되지 않는 작은 오차가 발생하고, 결과적으로 잔류 ISI가 나타난다.

특히 Roll-off factor가 작을수록 SRRC 펄스는 시간 영역에서 더 천천히 감쇠하고 긴 꼬리를 갖는다.

따라서 동일하게 6심벌 길이에서 잘라낼 경우 작은 Roll-off factor일수록 잘려 나가는 펄스 성분의 영향이 커지며, 이상적인 SRRC에 대한 근사 오차도 커진다.

그러므로 $r=0$이나 $r=0.25$와 같이 Roll-off factor가 작은 경우에 정합 필터 출력에서도 상대적으로 큰 잔류 ISI가 나타난다.`
        },
        { //문제 3.J
          "id": "20-3J",
          "title": "3.J.",
          "type": "python",
          "prompt": `AWGN 채널에서 펄스 성형과 정합 필터링에 대해 알아보기 위해 py 스크립트 ‘tx_sig_gen.py’의 26번째 라인 ‘tx_signal = np.convolve(impulse_modulated, pt)’ 바로 아래에 다음 라인을 추가하자. (문제 3.D의 py 스크립트를 가져올 것)
\`\`\`python
rx_signal = tx_signal + 0.15 * np.random.randn(len(tx_signal))
\`\`\`
노이즈가 존재하는 수신 신호의 eye diagram을 그리기 위해, eye diagram을 그리는 36, 39번째 라인에 있는 ‘tx_signal’을 ‘rx_signal’으로 바꾸자(총 3개). Roll-off factor를 $1$로 설정하고, Binary와 4-ary PAM 신호에 대해 각각 수정된 py 스크립트를 실행하시오. Binary와 4-ary PAM 신호의 eye diagram을 확인하시오.`,
          // 20-3J
"referenceAnswer": `AWGN 채널을 다음과 같이 모델링한다.

\`\`\`python
rx_signal = tx_signal + 0.15 * np.random.randn(len(tx_signal))
\`\`\`

'np.random.randn()'은 평균이 0이고 분산이 1인 Gaussian 난수를 생성하므로, 여기에 0.15를 곱하여 송신 신호에 AWGN을 더한다.

'rx_signal'의 eye diagram을 그리면 노이즈가 없는 'tx_signal'에 비해 각 파형의 경로가 두꺼워지고 퍼져 보인다.

Binary PAM에서는 $+1,-1$ 부근의 곡선들이 퍼지며 eye opening이 감소하고, 4-ary PAM에서도 $-3,-1,1,3$의 각 레벨 부근에서 곡선의 분산이 증가한다.

따라서 AWGN으로 인해 심벌 판정에 사용할 수 있는 eye의 수직 개방 정도가 감소하는 것을 확인할 수 있다.`
        },
        { //문제 3.K
          "id": "20-3K",
          "title": "3.K.",
          "prompt": `노이즈가 존재하는 수신 신호에 수행하는 정합 필터링의 효과를 알아보자.`
        },
        {
          "id": "20-3K1",
          "title": "3.K1.",
          "type": "python",
          "prompt": `문제 3.J의 py 스크립트를 복사하여 붙여넣은 후, 노이즈가 존재하는 수신 신호에 대하여 정합 필터 출력을 얻기 위해, py 스크립트의 28번째 라인 ‘matched_out = np.convolve(tx_signal, pt)’을 적절히 수정하시오.
          
이후, 정합 필터 출력의 eye diagram을 보기 위해, eye diagram을 그리는 35, 38번째 라인에 있는 모든 ‘rx_signal’을 ‘matched_out’으로 바꾸시오. Binary와 4-ary PAM 신호에 대해 각각 수정된 py 스크립트를 실행하고, 출력된 2개의 eye diagram을 확인하시오.`,
          // 20-3K1
"referenceAnswer": `노이즈가 존재하는 실제 수신 신호는 'rx_signal'이므로, 정합 필터의 입력도 'tx_signal'이 아니라 'rx_signal'이어야 한다.

따라서 다음과 같이 수정한다.

\`\`\`python
matched_out = np.convolve(rx_signal, pt)
\`\`\`

즉,

\`\`\`python
rx_signal = tx_signal + 0.15 * np.random.randn(len(tx_signal))
matched_out = np.convolve(rx_signal, pt)
\`\`\`

와 같이 구성한다.

정합 필터 출력 'matched_out'으로 eye diagram을 그리면 정합 필터링 전의 'rx_signal'보다 각 심벌 레벨 주변의 퍼짐이 줄어들고 eye가 더 명확하게 열리는 것을 확인할 수 있다.

Binary PAM에서는 $+1,-1$, 4-ary PAM에서는 $-3,-1,1,3$의 심벌 검출 지점이 보다 뚜렷하게 구분된다.`
        },
        {
          "id": "20-3K2",
          "title": "3.K2.",
          "type": "essay",
          "prompt": `문제 3.J의 eye diagram과 문제 3.K1의 eye diagram을 비교하여 eye가 열리는 정도를 평가해보자.

(a) 문제 3.D의 eye diagram과 문제 3.F의 eye diagram을 비교하면, 노이즈가 없는 경우에, 정합 필터에 의해 수신 신호의 eye가 열림을 확인할 수 있다. 문제 3.J와 3.K1에서는 노이즈가 존재하는 경우에, 정합 필터에 의해 수신 신호의 eye가 열림을 확인하였다. 둘을 비교할 때, 정합 필터링에 의한 eye 열림 효과는 노이즈가 없는 환경과 있는 환경 중 어느 환경에 더 의미가 있는가?
(b) (a)의 답과, 문제 3.F의 결과로부터, 송신 신호를 SRRC 펄스 성형 하였을 때, AWGN 채널 환경에서 정합 필터링의 중요한 기능 두 가지를 정리하여 쓰시오.`,
          // 20-3K2
"referenceAnswer": `(a) 정합 필터에 의한 eye opening 효과는 **노이즈가 존재하는 환경에서 더 중요한 의미를 갖는다.**

노이즈가 없는 환경에서도 SRRC 펄스 자체에 존재하던 ISI가 정합 필터를 거치면서 전체 Raised Cosine 응답이 형성되어 eye가 열린다.

그러나 AWGN 환경에서는 정합 필터가 이러한 zero-ISI 응답을 형성하는 것뿐만 아니라 심벌 검출 시점에서 신호 대 잡음비(SNR)를 최대화하는 역할도 한다.

따라서 실제 통신 환경에서는 노이즈가 존재하는 경우 정합 필터의 효과가 더욱 중요하다.

(b) SRRC 펄스 성형을 사용하는 AWGN 시스템에서 정합 필터의 중요한 기능은 크게 두 가지이다.

**1. ISI 제거**

송신 SRRC와 수신 SRRC 정합 필터의 전체 응답은 Raised Cosine이 된다.

$$
p_{SRRC}(t)*p_{SRRC}(t)
=
p_{RC}(t)
$$

따라서 올바른 심벌 검출 시점에서 zero-ISI 조건을 만족할 수 있다.

**2. 심벌 검출 시점의 SNR 최대화**

정합 필터는 AWGN 환경에서 정해진 심벌 검출 시점의 출력 SNR이 최대가 되도록 설계된 필터이다.

따라서 수신 신호에 포함된 잡음의 영향을 줄이고, 심벌 레벨을 보다 명확하게 구분할 수 있도록 한다.

결과적으로 SRRC 송신 필터와 정합 필터를 사용하는 시스템은 **ISI를 억제하면서 동시에 AWGN 환경에서 심벌 검출 성능을 향상시키는 역할**을 한다.`
        },
      ]
    }
  ]
} as const;
