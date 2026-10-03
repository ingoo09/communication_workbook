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
예를 들어, ‘k’=2 일 때 ‘tmp’는 $s(t)$의 $3T_s<t \\le 6T_s$ 구간의 샘플 벡터가 되고, ‘k’=3 일 때 ‘tmp’는 $s(t)$의 $6T_s<t \\le 9T_s$ 구간의 샘플 벡터가 된다. 아래 명령어의 ‘k’를 수정하고 Console에서 실행하여 이를 테스트해 보시오.`
        },
      ]
    }
  ]
} as const;
