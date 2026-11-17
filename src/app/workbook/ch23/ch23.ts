import type { WorkbookChapter } from '@/types/workbook';

export const chapter = {
  "id": "23-qam",
  "title": "Chapter 23. QAM",
  "sections": [
    { // 문제 1
  "id": "23-1",
  "title": "1. 16QAM 변조기의 bit mapping 확인",
  "problems": [
    { // 문제 1.A
      "id": "23-1A",
      "title": "1.A.",
      "type": "python",
      "starterCode": `import numpy as np
import matplotlib.pyplot as plt

def qam16_map(bits):
    """
    4개의 binary data [b4, b3, b2, b1]을
    Gray-mapped 16QAM complex symbol로 변환한다.

    b4, b3 : In-phase 성분 결정
    b2, b1 : Quadrature 성분 결정
    """

    bits = np.asarray(bits, dtype=int)

    if len(bits) != 4:
        raise ValueError(
            "16QAM 심벌 하나에는 4개의 비트가 필요합니다."
        )

    b4, b3, b2, b1 = bits

    # Gray mapping
    axis_map = {
        (0, 0): -3,
        (0, 1): -1,
        (1, 1):  1,
        (1, 0):  3
    }

    I = axis_map[(b4, b3)]

    # Q축은 위쪽이 +이므로 부호 반전
    Q = -axis_map[(b2, b1)]

    qam_symbol = I + 1j * Q

    return qam_symbol


# 0000 입력
bits = [0, 0, 0, 0]

qamsymbol = qam16_map(bits)

print("bits =", bits)
print("qamsymbol =", qamsymbol)`,
      "prompt": `16QAM에서는 한 심벌에 $\\log_2 16=4$개의 binary data가 포함된다. 본 실습에서는 4개의 비트를 MSB부터 $(b_4,b_3,b_2,b_1)$이라 하고, 이를 2차원 벡터공간의 한 점 $(I,Q)$또는 complex symbol $I+jQ$로 변환한다.

위 Python 코드는 \`qam16_map()\`을 이용하여 16QAM Gray mapping을 구현한다. 코드를 실행하여 data bits $0000$이 어떤 complex symbol로 변환되는지 확인하시오.`,
      responseEnabled: true,
      referenceAnswer: `data bits $0000$을 입력하면

$$
I=-3,
\\qquad
Q=3
$$

이므로 complex symbol은

$$
\\boxed{-3+3j}
$$

이다.

Python 출력은 다음과 같다.

\`\`\`text
bits = [0, 0, 0, 0]
qamsymbol = (-3+3j)
\`\`\`

따라서 $0000$은 16QAM constellation의 좌표

$$
\\boxed{(-3,3)}
$$

에 mapping된다.`,
    },
    { // 문제 1.B
      "id": "23-1B",
      "title": "1.B.",
      "prompt": `문제 1.A에서 구현한 \`qam16_map()\`을 이용하여 16QAM의 모든 가능한 4-bit 조합과 corresponding QAM symbol을 확인해 보자.

16QAM의 각 축에서 가능한 amplitude는 $-3,\\;-1,\\;+1,\\;+3$이며, 인접한 constellation point 사이의 거리는 2이다.`,
    },
    { // 문제 1.B1
  "id": "23-1B1",
  "title": "1.B1.",
  "type": "python",
  "starterCode": `bits = [0, 0, 0, 0]

qamsymbol = qam16_map(bits)

print(qamsymbol)`,
  "prompt": `코드를 실행하여 data bits \`0000\`에 해당하는 \`qamsymbol\` 값을 쓰시오.`,
  responseEnabled: true,
  referenceAnswer: `\`0000\`에 해당하는 \`qamsymbol\`은

$$
\\boxed{-3+3j}
$$

이다.

즉, I-Q 평면에서의 좌표는

$$
\\boxed{(-3,3)}
$$

이다.`,
},
    { // 문제 1.B2
  "id": "23-1B2",
  "title": "1.B2.",
  "type": "python",
  "starterCode": `from itertools import product

mapping_table = []

for bits in product([0, 1], repeat=4):

    symbol = qam16_map(bits)

    mapping_table.append(
        (bits, symbol.real, symbol.imag)
    )

    bit_string = ''.join(
        str(b) for b in bits
    )

    print(
        bit_string,
        "->",
        symbol
    )`,
  "prompt": `\`0000\`부터 \`1111\`까지 가능한 16가지 4-bit data를 모두 입력하여 각 data bits에 해당하는 16QAM symbol을 확인하시오. 출력된 결과에서 각 심벌의 I축과 Q축 좌표가 $\\{-3,-1,1,3\\}$ 중 하나의 값을 갖는지 확인하시오.`,
  responseEnabled: true,
      referenceAnswer: `16가지 data bits에 대한 Gray-mapped 16QAM symbol은 다음과 같다.

[[table:
caption:16QAM Gray mapping
Data bits | I | Q | Complex symbol
0000 | -3 | 3 | $-3+3j$
0001 | -3 | 1 | $-3+1j$
0010 | -3 | -3 | $-3-3j$
0011 | -3 | -1 | $-3-1j$
0100 | -1 | 3 | $-1+3j$
0101 | -1 | 1 | $-1+1j$
0110 | -1 | -3 | $-1-3j$
0111 | -1 | -1 | $-1-1j$
1000 | 3 | 3 | $3+3j$
1001 | 3 | 1 | $3+1j$
1010 | 3 | -3 | $3-3j$
1011 | 3 | -1 | $3-1j$
1100 | 1 | 3 | $1+3j$
1101 | 1 | 1 | $1+1j$
1110 | 1 | -3 | $1-3j$
1111 | 1 | -1 | $1-1j$
]]

모든 심벌의 I축과 Q축 좌표는

$$
\\{-3,-1,1,3\\}
$$

중 하나의 값을 갖는다.`,
},
    { // 문제 1.B3
  "id": "23-1B3",
  "title": "1.B3.",
  "type": "python",
  "starterCode": `plt.figure(figsize=(7, 7))

for bits, I, Q in mapping_table:

    bit_string = ''.join(
        str(b) for b in bits
    )

    plt.scatter(I, Q)

    plt.text(
        I + 0.08,
        Q + 0.08,
        bit_string,
        fontsize=9
    )

plt.axhline(0)
plt.axvline(0)

plt.xticks([-3, -1, 1, 3])
plt.yticks([-3, -1, 1, 3])

plt.xlim(-4, 4)
plt.ylim(-4, 4)

plt.xlabel('In-phase')
plt.ylabel('Quadrature')

plt.title(
    '16QAM Gray Mapping'
)

plt.grid()
plt.axis('equal')
plt.show()`,
  "prompt": `문제 1.B2에서 얻은 16개의 16QAM symbol을 I-Q 평면에 표시하시오. 각 constellation point 옆에 corresponding 4-bit data를 표시하고 다음을 확인하시오.

(a) \`0000\`이 $(-3,3)$에 위치하는가?
(b) 서로 인접한 constellation point들의 bit pattern을 비교했을 때 Gray mapping의 특징이 나타나는가?`,
  responseEnabled: true,
      referenceAnswer: `(a) 출력된 constellation에서 \`0000\`은

$$
\\boxed{(-3,3)}
$$

에 위치한다.

(b) 서로 수평 또는 수직으로 인접한 constellation point를 비교하면 bit pattern이 단 하나의 bit만 다르게 배치되어 있다.

예를 들어,

$$
0000
\\leftrightarrow
0100
$$

은 한 bit만 다르고,

$$
0000
\\leftrightarrow
0001
$$

역시 한 bit만 다르다.

따라서 출력된 16QAM constellation이 Gray mapping의 특성을 만족함을 확인할 수 있다.`,
},
    { // 문제 1.B4
      "id": "23-1B4",
      "title": "1.B4.",
      "type": "python",
      "starterCode": `symbol_energies = []

for bits, I, Q in mapping_table:

    Es_symbol = I**2 + Q**2

    symbol_energies.append(
        Es_symbol
    )

    bit_string = ''.join(
        str(b) for b in bits
    )

    print(
        bit_string,
        ":",
        Es_symbol
    )

Es_average = np.mean(
    symbol_energies
)

print(
    "Average symbol energy =",
    Es_average
)`,
      "prompt": `QAM constellation에서 한 심벌의 에너지는 원점으로부터 거리의 제곱 $E_s^{(i)}=I_i^2+Q_i^2$으로 구할 수 있다.

(a) 16개의 QAM symbol 각각에 대해 심벌 에너지를 계산하고 평균 심벌 에너지 $E_s$를 구하시오.
(b) constellation point 사이의 거리가 2인 square $M$-QAM의 평균 심벌 에너지는 $E_s=\\dfrac{2(M-1)}{3}$으로 주어진다. $M=16$을 대입한 이론값과 Python에서 구한 평균 심벌 에너지가 일치하는지 확인하시오.`,
      responseEnabled: true,
      referenceAnswer: `(a) 각 QAM 심벌의 에너지는

$$
E_s^{(i)}
=
I_i^2+Q_i^2
$$

로 계산한다.

16개 심벌의 에너지는 다음과 같다.

[[table:
Data bits | Symbol energy
0000 | 18
0001 | 10
0010 | 18
0011 | 10
0100 | 10
0101 | 2
0110 | 10
0111 | 2
1000 | 18
1001 | 10
1010 | 18
1011 | 10
1100 | 10
1101 | 2
1110 | 10
1111 | 2
]]

따라서 평균 심벌 에너지는

$$
E_s
=
\\frac{
4(18)+8(10)+4(2)
}{16}
$$

$$
=
\\frac{160}{16}
=
\\boxed{10}.
$$

(b) 이론적인 평균 심벌 에너지 식

$$
E_s
=
\\frac{2(M-1)}{3}
$$

에 $M=16$을 대입하면

$$
E_s
=
\\frac{2(16-1)}{3}
=
\\frac{30}{3}
=
\\boxed{10}.
$$

따라서 Python으로 계산한 평균 심벌 에너지와 이론값이 일치한다.`,
    },
    { // 문제 1.B5
      "id": "23-1B5",
      "title": "1.B5.",
      "type": "proof",
      "prompt": `(a) $M$-ary modulation에서는 한 심벌이 $\\log_2M$개의 비트를 전달한다. 이를 이용하여 평균 심벌 에너지 $E_s$와 비트 에너지 $E_b$의 관계식을 쓰시오.
(b) 문제 1.B4에서 구한 16QAM의 평균 심벌 에너지를 이용하여 $E_b=2.5$임을 보이시오.`,
      referenceAnswer: `(a) $M$-ary modulation에서는 한 심벌이

$$
\\log_2M
$$

개의 비트를 전송하므로 심벌 에너지와 비트 에너지의 관계는

$$
\\boxed{
E_s
=
E_b\\log_2M
}
$$

또는

$$
\\boxed{
E_b
=
\\frac{E_s}{\\log_2M}
}
$$

이다.

(b) 16QAM에서는

$$
M=16,
\\qquad
E_s=10
$$

이므로

$$
E_b
=
\\frac{10}{\\log_2 16}
=
\\frac{10}{4}
=
\\boxed{2.5}.
$$`,
    },
    { // 문제 1.B6
      "id": "23-1B6",
      "title": "1.B6.",
      "type": "essay",
      "prompt": `문제 1.B3에서 확인한 mapping을 Gray mapping이라 한다. Gray mapping의 정의와 디지털통신 시스템에서 사용하는 장점을 각각 간략히 설명하시오.`,
      referenceAnswer: `Gray mapping은 서로 인접한 심벌들의 bit pattern이 단 하나의 bit만 다르도록 mapping하는 방법이다.

인접한 constellation point로 잘못 검출되는 경우에도 일반적으로 한 bit만 오류가 발생하므로 bit error의 영향을 줄일 수 있다는 장점이 있다.`,
    },
    { // 문제 1.C
      "id": "23-1C",
      "title": "1.C.",
      "prompt": `16QAM 신호가 AWGN 채널을 통과한 후 수신기에서 얻은 2차원 좌표를 $(z_1,z_2)$라 하자. Noise가 없을 때에는 $(z_1,z_2)$가 16개의 이상적인 constellation point 중 하나와 일치하지만, AWGN이 더해지면 일반적으로 정확한 constellation point에서 벗어난 위치에 나타난다. 수신기는 관찰된 $(z_1,z_2)$를 이용하여 송신된 4개의 data bits $(b_4,b_3,b_2,b_1)$을 추정해야 한다. ML(Maximum Likelihood) detection은 원칙적으로 수신 좌표와 모든 constellation point 사이의 거리를 비교하여 가장 가까운 심벌을 선택하는 방법이다. 그러나, 16QAM의 Gray mapping 규칙을 이용하면 모든 거리를 직접 계산하지 않고도 각 비트를 판별할 수 있다.`,
    },
    { // 문제 1.C1
      "id": "23-1C1",
      "title": "1.C1.",
      "type": "proof",
      "prompt": `문제 1.B3에서 얻은 Gray mapping constellation을 이용하여 다음 표의 빈칸을 채우시오.
[[table:
caption:표 23.1 Gray mapping된 16QAM의 4비트 판별 조건
데이터 비트 | 판별 조건
$b_4$ | IF $z_1>0$, $\\hat b_4=1$, ELSE $\\hat b_4=0$
$b_3$ | ?
$b_2$ | ?
$b_1$ | ?
]]
각 판별식이 constellation의 어떤 영역을 구분하는지도 함께 설명하시오.`,
      referenceAnswer: `16QAM Gray mapping의 각 축을 살펴보면 판별조건은 다음과 같다.

[[table:
caption:표 23.1 Gray mapping된 16QAM의 4비트 판별 조건
데이터 비트 | 판별 조건
$b_4$ | IF $z_1>0$, $\\hat b_4=1$, ELSE $\\hat b_4=0$
$b_3$ | IF $\\lvert z_1 \\rvert<2$, $\\hat b_3=1$, ELSE $\\hat b_3=0$
$b_2$ | IF $z_2<0$, $\\hat b_2=1$, ELSE $\\hat b_2=0$
$b_1$ | IF $\\lvert z_2 \\rvert<2$, $\\hat b_1=1$, ELSE $\\hat b_1=0$
]]

$b_4$는 I축의 양수/음수 영역을 구분한다.

$b_3$는 I축에서 안쪽 constellation point $(\\pm1)$과 바깥쪽 constellation point $(\\pm3)$를 구분한다.

$b_2$는 Q축의 양수/음수 영역을 구분하며, 본 mapping에서는 Q축이 양수이면 $b_2=0$, 음수이면 $b_2=1$이다.

$b_1$은 Q축에서 안쪽 constellation point $(\\pm1)$과 바깥쪽 constellation point $(\\pm3)$를 구분한다.`,
    },
    { // 문제 1.C2
      "id": "23-1C2",
      "title": "1.C2.",
      "type": "essay",
      "prompt": `문제 1.C1에서 완성한 판별조건을 이용할 경우 16개의 constellation point와 수신 좌표 사이의 Euclidean distance를 모두 계산할 필요가 있는지 설명하시오.`,
      referenceAnswer: `16개의 constellation point에 대해 Euclidean distance를 모두 계산할 필요가 없다.

Gray mapping의 규칙성을 이용하면 수신 좌표 $(z_1,z_2)$가 어느 decision region에 속하는지만 확인하여 각 비트를 직접 판별할 수 있다.

즉,

$$
z_1,\\quad |z_1|,\\quad z_2,\\quad |z_2|
$$

를 각각 threshold와 비교하면 $b_4,b_3,b_2,b_1$을 결정할 수 있으므로 16개 심벌과의 거리 계산 과정은 필요하지 않다.`,
    },
    { // 문제 1.D
      "id": "23-1D",
      "title": "1.D.",
      "prompt": `이제 $\\dfrac{E_b}{N_0}=\\gamma$로 주어졌을 때 Gray-mapped 16QAM의 theoretical BER을 $\\gamma$의 함수로 유도해 보자. 문제 1.B5에서 $E_b=2.5$임을 확인하였다. 또한, AWGN 환경에서 수신 좌표 $z_1$, $z_2$에 포함되는 noise 성분은 각각 평균 0, 분산 $\\dfrac{N_0}{2}$인 Gaussian random variable이다.`,
    },
    { // 문제 1.D1
      "id": "23-1D1",
      "title": "1.D1.",
      "type": "proof",
      "prompt": `$\\dfrac{E_b}{N_0}=\\gamma$에 문제 1.B5에서 구한 $E_b=2.5$를 이용하여 $N_0$를 $\\gamma$의 함수로 나타내시오.`,
      referenceAnswer: `주어진 관계는

$$
\\frac{E_b}{N_0}
=
\\gamma
$$

이고,

$$
E_b=2.5
$$

이므로

$$
\\frac{2.5}{N_0}
=
\\gamma.
$$

따라서

$$
\\boxed{
N_0
=
\\frac{2.5}{\\gamma}
}
$$

이다.`,
    },
    { // 문제 1.D2
  "id": "23-1D2",
  "title": "1.D2.",
  "type": "proof",
  "prompt": `먼저 MSB인 $b_4$의 error probability를 구해 보자. Noise가 더해진 I축 수신 좌표 $z_1$은 전송한 I-coordinate를 평균으로 하고 $\\dfrac{N_0}{2}$의 분산을 갖는 Gaussian random variable이다. 예를 들어, \`0000\`이 전송되면 이상적인 I-coordinate는 $-3$이므로 $z_1\\sim\\mathcal{N}\\left(-3,\\dfrac{N_0}{2}\\right)$이다.

문제 1.C1의 $b_4$ 판별조건을 이용하여 다음을 수행하시오.
(a) \`0000\`이 전송되었을 때 $b_4$ error가 발생하는 영역을 쓰시오.
(b) 해당 error probability를 Q-function으로 나타내시오.
(c) I-coordinate가 $-3,-1,+1,+3$인 모든 경우를 고려하여 평균 $b_4$ error probability $P_{b_4}$를 Q-function으로 유도하시오.`,
      referenceAnswer: `(a) \`0000\`이 전송되면

$$
b_4=0,
\\qquad
z_1
\\sim
\\mathcal{N}
\\left(
-3,
\\frac{N_0}{2}
\\right).
$$

$b_4$의 판별조건은

$$
z_1>0
\\Rightarrow
\\hat b_4=1
$$

이므로 error가 발생하는 영역은

$$
\\boxed{z_1>0}
$$

이다.

(b) Noise의 표준편차는

$$
\\sigma
=
\\sqrt{\\frac{N_0}{2}}
$$

이므로

$$
P(e\\mid I=-3)
=
Q
\\left(
\\frac{3}{\\sqrt{N_0/2}}
\\right)
$$

$$
=
\\boxed{
Q
\\left(
\\sqrt{\\frac{18}{N_0}}
\\right)
}.
$$

(c) I-coordinate가 $-3,-1,+1,+3$인 경우의 error probability는 각각

$$
Q\\left(\\sqrt{\\frac{18}{N_0}}\\right),
\\quad
Q\\left(\\sqrt{\\frac{2}{N_0}}\\right),
\\quad
Q\\left(\\sqrt{\\frac{2}{N_0}}\\right),
\\quad
Q\\left(\\sqrt{\\frac{18}{N_0}}\\right)
$$

이다.

네 amplitude level은 동일한 확률로 발생하므로

$$
P_{b_4}
=
\\frac14
\\left[
2Q\\left(\\sqrt{\\frac{2}{N_0}}\\right)
+
2Q\\left(\\sqrt{\\frac{18}{N_0}}\\right)
\\right].
$$

따라서

$$
\\boxed{
P_{b_4}
=
\\frac12
Q\\left(\\sqrt{\\frac{2}{N_0}}\\right)
+
\\frac12
Q\\left(\\sqrt{\\frac{18}{N_0}}\\right)
}
$$

이다.`,
},
    { // 문제 1.D3
      "id": "23-1D3",
      "title": "1.D3.",
      "type": "proof",
      "prompt": `문제 1.D2와 같은 방법으로 $P_{b_3}, P_{b_2}, P_{b_1}$을 각각 Q-function으로 유도하시오. 문제 1.C1에서 구한 decision boundary를 사용하고, constellation의 네 amplitude level $-3,-1,+1,+3$에서 발생할 수 있는 모든 error 영역을 고려하시오.`,
      referenceAnswer: `$b_3$의 판별조건은

$$
|z_1|<2
\\Rightarrow
\\hat b_3=1
$$

이다.

바깥쪽 심벌 $I=\\pm3$에서는 error probability가

$$
Q\\left(\\sqrt{\\frac{2}{N_0}}\\right)
-
Q\\left(\\sqrt{\\frac{50}{N_0}}\\right)
$$

이고, 안쪽 심벌 $I=\\pm1$에서는

$$
Q\\left(\\sqrt{\\frac{2}{N_0}}\\right)
+
Q\\left(\\sqrt{\\frac{18}{N_0}}\\right)
$$

이다.

따라서 평균하면

$$
\\boxed{
P_{b_3}
=
Q\\left(\\sqrt{\\frac{2}{N_0}}\\right)
+
\\frac12
Q\\left(\\sqrt{\\frac{18}{N_0}}\\right)
-
\\frac12
Q\\left(\\sqrt{\\frac{50}{N_0}}\\right)
}
$$

이다.

Q축에서도 동일한 구조가 적용된다.

$b_2$는 Q축의 부호를 이용하여 판별하므로

$$
\\boxed{
P_{b_2}
=
\\frac12
Q\\left(\\sqrt{\\frac{2}{N_0}}\\right)
+
\\frac12
Q\\left(\\sqrt{\\frac{18}{N_0}}\\right)
}
$$

이다.

$b_1$은 Q축에서 $|z_2|<2$인지 여부로 판별하므로

$$
\\boxed{
P_{b_1}
=
Q\\left(\\sqrt{\\frac{2}{N_0}}\\right)
+
\\frac12
Q\\left(\\sqrt{\\frac{18}{N_0}}\\right)
-
\\frac12
Q\\left(\\sqrt{\\frac{50}{N_0}}\\right)
}
$$

이다.

따라서

$$
P_{b_4}=P_{b_2},
\\qquad
P_{b_3}=P_{b_1}.
$$`,
    },
    { // 문제 1.D4
      "id": "23-1D4",
      "title": "1.D4.",
      "type": "essay",
      "prompt": `$b_4$, $b_3$, $b_2$, $b_1$의 error probability가 모두 동일한지 비교하시오. 동일하지 않다면 $P_{b_4},\\;P_{b_3},\\;P_{b_2},\\;P_{b_1}$의 대소 관계를 쓰고, 각 비트가 사용하는 decision boundary의 차이를 이용하여 그 이유를 설명하시오.`,
      referenceAnswer: `네 비트의 error probability는 모두 동일하지 않다.

대소 관계는

$$
\\boxed{
P_{b_3}
=
P_{b_1}
>
P_{b_4}
=
P_{b_2}
}
$$

이다.

$b_4$와 $b_2$는 각각 I축과 Q축에서 단순히 양수와 음수를 구분하며 decision boundary는 0 하나이다.

반면 $b_3$와 $b_1$은

$$
|z_1|=2,
\\qquad
|z_2|=2
$$

의 decision boundary를 이용하여 안쪽 심벌과 바깥쪽 심벌을 구분한다.

따라서 $b_3$와 $b_1$은 noise에 의해 잘못된 영역으로 이동할 수 있는 경우가 더 많아 $b_4$, $b_2$보다 error probability가 크다.`,
    },
    { // 문제 1.D5
      "id": "23-1D5",
      "title": "1.D5.",
      "type": "proof",
      "prompt": `16QAM의 한 심벌은 4개의 비트를 전송하므로 평균 BER은 $P_b=\\dfrac{P_{b_4}+P_{b_3}+P_{b_2}+P_{b_1}}{4}$로 구할 수 있다. 문제 1.D2와 1.D3의 결과를 이용하여 평균 BER 식을 하나의 식으로 정리하시오.

또한, 문제 1.D1에서 얻은 $N_0=\\dfrac{2.5}{\\gamma}$를 대입하여 최종 BER을 $\\gamma=\\dfrac{E_b}{N_0}$의 함수로 나타내시오.`,
      referenceAnswer: `평균 BER은

$$
P_b
=
\\frac{
P_{b_4}
+
P_{b_3}
+
P_{b_2}
+
P_{b_1}
}{4}
$$

이다.

앞에서 구한 결과

$$
P_{b_4}
=
P_{b_2}
=
\\frac12Q\\left(\\sqrt{\\frac{2}{N_0}}\\right)
+
\\frac12Q\\left(\\sqrt{\\frac{18}{N_0}}\\right)
$$

이고,

$$
P_{b_3}
=
P_{b_1}
=
Q\\left(\\sqrt{\\frac{2}{N_0}}\\right)
+
\\frac12Q\\left(\\sqrt{\\frac{18}{N_0}}\\right)
-
\\frac12Q\\left(\\sqrt{\\frac{50}{N_0}}\\right)
$$

이므로

$$
P_b
=
\\boxed{
\\frac34
Q\\left(\\sqrt{\\frac{2}{N_0}}\\right)
+
\\frac12
Q\\left(\\sqrt{\\frac{18}{N_0}}\\right)
-
\\frac14
Q\\left(\\sqrt{\\frac{50}{N_0}}\\right)
}.
$$

문제 1.D1에서

$$
N_0
=
\\frac{2.5}{\\gamma}
$$

이므로

$$
\\frac{2}{N_0}
=
0.8\\gamma,
$$

$$
\\frac{18}{N_0}
=
7.2\\gamma,
$$

$$
\\frac{50}{N_0}
=
20\\gamma.
$$

따라서 최종 theoretical BER은

$$
\\boxed{
P_b(\\gamma)
=
\\frac34Q\\left(\\sqrt{0.8\\gamma}\\right)
+
\\frac12Q\\left(\\sqrt{7.2\\gamma}\\right)
-
\\frac14Q\\left(\\sqrt{20\\gamma}\\right)
}
$$

이다.`,
    },
    { // 문제 1.D6
  "id": "23-1D6",
  "title": "1.D6.",
  "type": "python",
  "starterCode": `import numpy as np
from scipy.special import erfc

def Q(x):
    return 0.5 * erfc(
        x / np.sqrt(2)
    )


# Eb/N0 = gamma = 10
gamma = 10

# 문제 1.D5에서 유도한
# Gray-mapped 16QAM theoretical BER
BER_theory = (
    ?? * Q(
        np.sqrt(?? * gamma)
    )
    +
    ?? * Q(
        np.sqrt(?? * gamma)
    )
    -
    ?? * Q(
        np.sqrt(?? * gamma)
    )
)

print(
    "16QAM theoretical BER =",
    BER_theory
)`,
  "prompt": `문제 1.D5에서 유도한 Gray-mapped 16QAM의 theoretical BER 식을 이용하여 빈칸을 채우시오. $\\gamma=\\dfrac{E_b}{N_0}=10$일 때 theoretical BER을 계산하시오. 문제 1.D5의 식으로 계산한 값이 수행 결과와 일치하는지 확인하시오.`,
  responseEnabled: true,
  referenceAnswer: `빈칸을 채우면 다음과 같다.

\`\`\`python
BER_theory = (
    0.75 * Q(
        np.sqrt(0.8 * gamma)
    )
    +
    0.5 * Q(
        np.sqrt(7.2 * gamma)
    )
    -
    0.25 * Q(
        np.sqrt(20 * gamma)
    )
)
\`\`\`

따라서 전체 코드는

\`\`\`python
import numpy as np
from scipy.special import erfc

def Q(x):
    return 0.5 * erfc(
        x / np.sqrt(2)
    )

gamma = 10

BER_theory = (
    0.75 * Q(
        np.sqrt(0.8 * gamma)
    )
    +
    0.5 * Q(
        np.sqrt(7.2 * gamma)
    )
    -
    0.25 * Q(
        np.sqrt(20 * gamma)
    )
)

print(
    "16QAM theoretical BER =",
    BER_theory
)
\`\`\`

실행 결과는 약

$$
\\boxed{
P_b\\approx0.0018
}
$$

이다.

따라서 문제 1.D5에서 유도한 16QAM theoretical BER 식으로 계산한 결과가 주어진 결과와 일치한다.`,
},
  ]
},
  { // 문제 2
  "id": "23-2",
  "title": "2. AWGN 환경에서 QAM 수신 신호 발생기 설계",
  "problems": [
    { // 문제 2.A
      "id": "23-2A",
      "title": "2.A.",
      "prompt": `16QAM 송신신호에 AWGN을 더하여 수신신호를 생성하는 시스템을 구현해 보자.

16QAM 송신 과정은 다음과 같다.
Step 1. 4개의 binary data $(b_4,b_3,b_2,b_1)$를 생성한다.
Step 2. 4-bit data를 Gray mapping하여 complex QAM symbol $I+jQ$로 변환한다.
Step 3. I 성분과 Q 성분을 각각 직교 기저신호와 곱한다.
Step 4. 두 신호를 더하여 passband 16QAM 신호를 생성한다.
Step 5. 생성된 신호에 AWGN을 더하여 수신신호 $r(t)$를 만든다.
[[image:/images/ch23/figure23_1.png|그림 23.1 AWGN 환경에서 16QAM 수신신호 발생 구조|80]]
이번 문제에서 사용하는 주요 시스템 파라미터는 다음과 같다.
- QAM symbol duration: $T_s=1$ sec
- Carrier frequency: $f_c=20$ Hz
- Samples per symbol: $L=100$
- Sample interval: $t_{step}=1/100$ sec
- 초기 noise variance: $0$`,
    },
    { // 문제 2.A1
      "id": "23-2A1",
      "title": "2.A1.",
      "type": "python",
      "starterCode": `import numpy as np
import matplotlib.pyplot as plt

# -------------------------------------------------
# 16QAM system parameters
# -------------------------------------------------

Ts = ??
L = ??
t_step = Ts / L

fc = ??
noise_variance = ??

seed_bits = XX

print("Ts =", Ts)
print("L =", L)
print("t_step =", t_step)
print("fc =", fc)
print("noise variance =", noise_variance)`,
      "prompt": `16QAM 송신신호의 파라미터를 다음과 같이 설정한다.
- $T_s=1$ sec
- samples per symbol = 100
- carrier frequency = 20 Hz
- noise variance = 0

위 조건을 이용하여 코드의 빈칸을 채우시오.
\`\`\`python
Ts = ??
L = ??
fc = ??
noise_variance = ??
\`\`\`
또한 $t_{step}=\\dfrac{T_s}{L}$이 $1/100$ sec가 되는지 확인하시오.`,
      responseEnabled: true,
      referenceAnswer: `빈칸은 다음과 같이 채운다.

\`\`\`python
Ts = 1
L = 100
fc = 20
noise_variance = 0
\`\`\`

따라서

$$
t_{step}
=
\\frac{T_s}{L}
=
\\frac{1}{100}
=
0.01\\;\\text{sec}
$$

이다.

즉, 한 QAM 심벌 주기 $T_s=1$ sec를 100개의 sample로 표현하므로 sample interval은 $1/100$ sec가 된다.`,
    },
    { // 문제 2.A2
      "id": "23-2A2",
      "title": "2.A2.",
      "type": "essay",
      "prompt": `문제 2.A1에서 설정한 각 파라미터의 의미를 설명하시오.

(a) $T_s=1$
(b) $L=100$
(c) $t_{step}=1/100$
(d) $f_c=20$ Hz
(e) noise variance = 0`,
      referenceAnswer: `(a) $T_s=1$

한 16QAM 심벌이 유지되는 symbol duration이 1 sec라는 의미이다.

(b) $L=100$

한 QAM 심벌을 100개의 sample로 표현한다는 의미이다.

(c) $t_{step}=1/100$

연속된 두 sample 사이의 시간 간격이

$$
\\frac{1}{100}\\text{ sec}
$$

임을 의미한다.

(d) $f_c=20$ Hz

Passband 16QAM 신호를 생성할 때 사용하는 carrier frequency가 20 Hz라는 의미이다.

(e) noise variance = 0

AWGN sample의 분산을 0으로 설정하므로 noise가 발생하지 않는다.

따라서

$$
n(t)=0
$$

이고,

$$
r(t)=s(t)
$$

가 된다.`,
    },
    { // 문제 2.A3
      "id": "23-2A3",
      "title": "2.A3.",
      "type": "python",
      "starterCode": `def qam16_awgn(
    bits,
    Ts=1,
    L=100,
    fc=20,
    noise_variance=0,
    seed_noise=0
):
    """
    Gray-mapped 16QAM passband signal + AWGN

    Parameters
    ----------
    bits : shape (Ns, 4)
        각 행이 [b4, b3, b2, b1]
    Ts : symbol duration
    L : samples per symbol
    fc : carrier frequency
    noise_variance : AWGN sample variance
    seed_noise : noise random seed
    """

    bits = np.asarray(
        bits,
        dtype=int
    )

    if (
        bits.ndim != 2
        or bits.shape[1] != 4
    ):
        raise ValueError(
            "bits의 shape은 (Ns, 4)이어야 합니다."
        )

    Ns = len(bits)

    # ---------------------------------------------
    # Gray mapping
    # ---------------------------------------------

    symbols = np.array([
        qam16_map(row)
        for row in bits
    ])

    I_symbols = symbols.real
    Q_symbols = symbols.imag

    # ---------------------------------------------
    # Symbol -> sample expansion
    # ---------------------------------------------

    I_baseband = np.repeat(
        I_symbols,
        L
    )

    Q_baseband = np.repeat(
        Q_symbols,
        L
    )

    # ---------------------------------------------
    # Time axis
    # ---------------------------------------------

    t_step = Ts / L

    t = np.arange(
        Ns * L
    ) * t_step

    # ---------------------------------------------
    # Orthogonal basis
    # ---------------------------------------------

    psi1 = ??
    psi2 = ??

    # ---------------------------------------------
    # Passband 16QAM
    # ---------------------------------------------

    tx_signal = (
        ??
        +
        ??
    )

    # ---------------------------------------------
    # AWGN
    # ---------------------------------------------

    rng_noise = np.random.default_rng(
        seed_noise
    )

    noise = np.sqrt(
        noise_variance
    ) * rng_noise.standard_normal(
        len(tx_signal)
    )

    rx_signal = ??

    return (
        t,
        I_symbols,
        Q_symbols,
        I_baseband,
        Q_baseband,
        tx_signal,
        rx_signal
    )`,
      "prompt": `16QAM 송신신호와 AWGN 채널을 하나의 재사용 가능한 \`qam16_awgn()\` 함수로 구성하시오.

직교 기저신호는 $\\psi_1(t)=\\sqrt{2}\\cos(2\\pi f_ct)$, $\\psi_2(t)=\\sqrt{2}\\sin(2\\pi f_ct)$를 사용한다. 코드의 다음 빈칸을 채우시오.
\`\`\`python
psi1 = ??
psi2 = ??

tx_signal = (
    ??
    +
    ??
)

rx_signal = ??
\`\`\`

noise variance가 0이면 $r(t)=s(t)$가 되어야 한다.`,
      responseEnabled: true,
      referenceAnswer: `직교 기저신호는 다음과 같이 완성한다.

\`\`\`python
psi1 = np.sqrt(2) * np.cos(
    2 * np.pi * fc * t
)

psi2 = np.sqrt(2) * np.sin(
    2 * np.pi * fc * t
)
\`\`\`

Passband 16QAM 송신신호는 I/Q 기저대역 성분을 각각 두 직교 기저신호에 실어 더하므로

\`\`\`python
tx_signal = (
    I_baseband * psi1
    +
    Q_baseband * psi2
)
\`\`\`

가 된다.

마지막으로 AWGN을 더하면

\`\`\`python
rx_signal = tx_signal + noise
\`\`\`

이다.

따라서 전체 빈칸은

\`\`\`python
psi1 = np.sqrt(2) * np.cos(
    2 * np.pi * fc * t
)

psi2 = np.sqrt(2) * np.sin(
    2 * np.pi * fc * t
)

tx_signal = (
    I_baseband * psi1
    +
    Q_baseband * psi2
)

rx_signal = tx_signal + noise
\`\`\`

로 완성된다.

Noise variance가 0이면

$$
\\text{noise}=0
$$

이므로

$$
\\boxed{r(t)=s(t)}
$$

가 된다.`,
    },
    { // 문제 2.B
      "id": "23-2B",
      "title": "2.B.",
      "prompt": `함수 \`qam16_awgn()\`의 출력에서
- \`I_symbols\`, \`Q_symbols\`는 Gray mapping된 기저대역 16QAM symbol의 I/Q 성분
- \`tx_signal\`은 passband 16QAM 송신신호 $s(t)$
- \`rx_signal\`은 AWGN이 더해진 수신신호 $r(t)$
를 나타낸다.

이들 신호의 특성을 확인해 보자.`,
    },
    { // 문제 2.B1
      "id": "23-2B1",
      "title": "2.B1.",
      "type": "python",
      "starterCode": `# -------------------------------------------------
# 50개의 16QAM symbol 생성
# -------------------------------------------------

Ns = 50

rng_bits = np.random.default_rng(
    seed_bits
)

bits = rng_bits.integers(
    0,
    2,
    size=(Ns, 4)
)

(
    t,
    I_symbols,
    Q_symbols,
    I_baseband,
    Q_baseband,
    tx_signal,
    rx_signal
) = qam16_awgn(
    bits,
    Ts=1,
    L=100,
    fc=20,
    noise_variance=0,
    seed_noise=seed_bits + 1
)


# -------------------------------------------------
# I/Q baseband symbol observation
# -------------------------------------------------

symbol_time = np.arange(Ns)

plt.figure(figsize=(11, 6))

plt.subplot(2, 1, 1)

plt.step(
    symbol_time,
    I_symbols,
    where='post'
)

plt.ylabel('I')
plt.yticks([-3, -1, 1, 3])
plt.grid()


plt.subplot(2, 1, 2)

plt.step(
    symbol_time,
    Q_symbols,
    where='post'
)

plt.xlabel('Time (s)')
plt.ylabel('Q')
plt.yticks([-3, -1, 1, 3])

plt.grid()

plt.tight_layout()
plt.show()`,
      "prompt": `50개의 16QAM symbol을 생성하고 Gray mapping된 I 성분과 Q 성분을 관찰하시오.

(a) I/Q 성분이 각각 $-3,-1,+1,+3$중 하나의 값을 갖는지 확인하시오.
(b) 각 I/Q 값이 한 symbol duration 동안 유지되는 계단 형태의 신호인지 확인하시오.`,
      responseEnabled: true,
      referenceAnswer: `(a) 출력된 I/Q symbol을 확인하면 각 값은

$$
\\boxed{
-3,\\;-1,\\;+1,\\;+3
}
$$

중 하나를 갖는다.

이는 16QAM constellation의 각 축이 네 개의 amplitude level로 구성되기 때문이다.

(b) 각 QAM symbol은 한 symbol duration

$$
T_s=1\\text{ sec}
$$

동안 동일한 I/Q 값을 유지한다.

따라서 I/Q 기저대역 신호는 각 심벌 경계에서 값이 변하고, 심벌 구간 내부에서는 일정한 값을 유지하는 계단 형태로 나타난다.`,
    },
    { // 문제 2.B2
      "id": "23-2B2",
      "title": "2.B2.",
      "type": "essay",
      "prompt": `문제 2.A1에서 설정한 시스템 파라미터를 이용하여 passband 16QAM 신호의 carrier frequency를 쓰시오.`,
      referenceAnswer: `설정된 carrier frequency는

$$
\\boxed{f_c=20\\text{ Hz}}
$$

이다.

따라서 passband 16QAM 신호의 carrier angular frequency는

$$
\\omega_c
=
2\\pi f_c
=
2\\pi\\times20
=
40\\pi\\;\\text{rad/s}
$$

이다.`,
    },
    { // 문제 2.B3
      "id": "23-2B3",
      "title": "2.B3.",
      "type": "proof",
      "prompt": `16QAM passband signal을 생성하는 두 직교 기저신호가 $\\psi_1(t)=\\sqrt{2}\\cos(2\\pi\\times20t)$, $\\psi_2(t)=\\sqrt{2}\\sin(2\\pi\\times20t)$가 되는 이유를 다음 파라미터를 이용하여 설명하시오.
- Carrier amplitude: $\\sqrt{2}$
- Carrier frequency: $20$ Hz
- 한 반송파의 phase: $\\pi/2$
- 다른 반송파의 phase: $0$

특히, $\\sin\\left(\\omega t+\\dfrac{\\pi}{2}\\right)=\\cos(\\omega t)$의 관계를 이용하시오.`,
      referenceAnswer: `Carrier amplitude가 $\\sqrt{2}$이고 carrier frequency가 20 Hz이므로 기본 sine wave는

$$
\\sqrt{2}
\\sin
\\left(
2\\pi\\times20t+\\phi
\\right)
$$

의 형태이다.

첫 번째 반송파는 phase가

$$
\\phi=\\frac{\\pi}{2}
$$

이므로

$$
\\sqrt{2}
\\sin
\\left(
2\\pi\\times20t+\\frac{\\pi}{2}
\\right)
$$

이다.

삼각함수 관계

$$
\\sin
\\left(
\\omega t+\\frac{\\pi}{2}
\\right)
=
\\cos(\\omega t)
$$

를 이용하면

$$
\\boxed{
\\psi_1(t)
=
\\sqrt{2}
\\cos(2\\pi\\times20t)
}
$$

가 된다.

두 번째 반송파는 phase가 0이므로

$$
\\boxed{
\\psi_2(t)
=
\\sqrt{2}
\\sin(2\\pi\\times20t)
}
$$

이다.

또한 cosine과 sine은 한 심벌 구간에서 서로 직교하므로 두 신호를 각각 In-phase와 Quadrature-phase basis로 사용할 수 있다.`,
    },
    { // 문제 2.B4
      "id": "23-2B4",
      "title": "2.B4.",
      "type": "python",
      "starterCode": `bits = np.array([
    [0, 1, 1, 0]
])

(
    t,
    I_symbols,
    Q_symbols,
    I_baseband,
    Q_baseband,
    tx_signal,
    rx_signal
) = qam16_awgn(
    bits,
    Ts=1,
    L=100,
    fc=20,
    noise_variance=0
)

print(
    "16QAM symbol =",
    qam16_map(bits[0])
)

print(
    "I coordinate =",
    I_symbols[0]
)

print(
    "Q coordinate =",
    Q_symbols[0]
)


plt.figure(figsize=(11, 4))

plt.plot(
    t,
    rx_signal
)

plt.xlabel('Time (s)')
plt.ylabel('r(t)')

plt.grid()
plt.show()`,
      "prompt": `첫 번째 4-bit data가 $0110$이고 noise가 없다고 가정하자.

(a) 문제 1의 Gray mapping을 이용하여 \`0110\`에 해당하는 I/Q coordinate를 구하시오.
(b) 이를 이용하여 수신신호가 $r(t)=-\\psi_1(t)-3\\psi_2(t)$가 됨을 설명하시오.
(c) Python 코드를 실행하여 실제로 $I=-1, Q=-3$이 출력되는지 확인하고 passband waveform을 관찰하시오.`,
      responseEnabled: true,
      referenceAnswer: `(a) data bits가

$$
0110
$$

일 때

$$
(b_4,b_3)=(0,1)
$$

이므로 I-coordinate는

$$
I=-1
$$

이다.

또한

$$
(b_2,b_1)=(1,0)
$$

이므로 Q-coordinate는

$$
Q=-3
$$

이다.

따라서 16QAM complex symbol은

$$
\\boxed{-1-3j}
$$

이다.

(b) Passband 16QAM 신호는

$$
r(t)
=
I\\psi_1(t)
+
Q\\psi_2(t)
$$

로 나타낼 수 있다.

여기에

$$
I=-1,
\\qquad
Q=-3
$$

을 대입하면

$$
r(t)
=
(-1)\\psi_1(t)
+
(-3)\\psi_2(t)
$$

이므로

$$
\\boxed{
r(t)
=
-\\psi_1(t)
-
3\\psi_2(t)
}
$$

가 된다.

Noise variance가 0이므로 송신신호와 수신신호는 동일하다.

(c) Python 코드를 실행하면 다음과 같은 값을 확인할 수 있다.

\`\`\`text
16QAM symbol = (-1-3j)
I coordinate = -1.0
Q coordinate = -3.0
\`\`\`

따라서 Python의 Gray mapping 결과와 이론적으로 구한 I/Q 좌표가 일치한다.`,
    },
  ]
},
    { // 문제 3
  "id": "23-3",
  "title": "3. QAM 복조기 설계",
  "problems": [
    { // 문제 3.A
      "id": "23-3A",
      "title": "3.A.",
      "type": "proof",
      "prompt": `AWGN이 더해진 16QAM 수신신호를 $r(t)$라 하자. $n$번째 QAM 심벌의 벡터공간 좌표를 $z_1$, $z_2$라 하면 상관 수신기를 이용하여 [[equation:23.1]]과 같이 계산할 수 있다.
$$
z_1
=
\\int_{(n-1)T_s}^{nT_s}
r(t)\\psi_1(t)dt
,
\\qquad
z_2
=
\\int_{(n-1)T_s}^{nT_s}
r(t)\\times ?\\;dt
\\qquad \\text{(식 23.1)}
$$
여기서 사용되는 두 직교 기저신호는 $\\psi_1(t)=\\sqrt{2}\\cos(2\\pi\\times20t)$, $\\psi_2(t)=\\sqrt{2}\\sin(2\\pi\\times20t)$이다.

[[equation:23.1]]의 $z_2$를 구하는 식의 빈칸을 채우고, $z_1$과 $z_2$가 각각 송신된 16QAM symbol의 I-coordinate와 Q-coordinate를 추정하는 값이 되는 이유를 설명하시오.`,
      referenceAnswer: `빈칸에는 $\\psi_2(t)$가 들어간다.

따라서

$$
z_2
=
\\int_{(n-1)T_s}^{nT_s}
r(t)\\psi_2(t)dt
$$

이다.

16QAM 송신신호를

$$
s(t)
=
I\\psi_1(t)
+
Q\\psi_2(t)
$$

라 하면, 두 기저신호 $\\psi_1(t)$와 $\\psi_2(t)$는 서로 직교하므로 한 심벌 구간에서

$$
\\int \\psi_1(t)\\psi_2(t)dt
=
0
$$

이다.

따라서 수신신호와 $\\psi_1(t)$의 correlation을 계산하면 I 성분이 추출되고, $\\psi_2(t)$와 correlation을 계산하면 Q 성분이 추출된다.

즉,

$$
z_1\\approx I,
\\qquad
z_2\\approx Q
$$

가 되어 $(z_1,z_2)$를 이용해 송신된 16QAM constellation 좌표를 추정할 수 있다.`,
    },
    { // 문제 3.B
      "id": "23-3B",
      "title": "3.B.",
      "prompt": `수신신호 $r(t)$로부터 각 QAM 심벌의 좌표 $(z_1,z_2)$를 계산하는 상관 수신기를 구현해 보자.

한 QAM symbol duration은 $T_s=1$ sec이고 한 심벌당 sample 수는 $L=100$이므로 $t_{step}=\\dfrac{T_s}{L}=\\dfrac{1}{100}$이다. 각 심벌 구간에서 $r(t)$와 기저신호의 곱을 100개의 sample에 대해 더한 뒤 $t_{step}$을 곱하여 수치적분을 수행한다.
[[image:/images/ch23/figure23_2.png|그림 23.2 QAM 상관 수신기 구조|80]]`,
    },
    { // 문제 3.B1
      "id": "23-3B1",
      "title": "3.B1.",
      "type": "python",
      "starterCode": `def qam16_correlator(
    rx_signal,
    Ts=1,
    L=100,
    fc_rx=20
):
    """
    Passband 16QAM 수신신호로부터
    각 심벌의 z1, z2를 계산한다.
    """

    rx_signal = np.asarray(
        rx_signal,
        dtype=float
    )

    Ns = len(rx_signal) // L

    t_step = Ts / L

    t = np.arange(
        Ns * L
    ) * t_step

    # Receiver basis
    psi1_rx = np.sqrt(2) * np.cos(
        2 * np.pi * fc_rx * t
    )

    psi2_rx = np.sqrt(2) * np.sin(
        2 * np.pi * fc_rx * t
    )

    product_I = (
        rx_signal[:Ns * L]
        * psi1_rx
    )

    product_Q = (
        rx_signal[:Ns * L]
        * psi2_rx
    )

    z1 = np.zeros(Ns)
    z2 = np.zeros(Ns)

    for k in range(Ns):

        start = k * L
        end = (k + 1) * L

        z1[k] = (
            np.sum(
                product_I[start:end]
            )
            * ??
        )

        z2[k] = (
            np.sum(
                product_Q[start:end]
            )
            * ??
        )

    return z1, z2`,
      "prompt": `각 QAM 심벌에 대해 100개의 sample 값을 더한 결과를 실제 적분값으로 변환하려면 sample interval을 곱해야 한다. 다음 두 빈칸을 채우시오.
\`\`\`python
z1[k] = (
    np.sum(product_I[start:end])
    * ??
)

z2[k] = (
    np.sum(product_Q[start:end])
    * ??
)
\`\`\`
완성된 함수가 $z_1\\approx\\int r(t)\\psi_1(t)dt$, $z_2\\approx\\int r(t)\\psi_2(t)dt$를 계산하는지 확인하시오.`,
      responseEnabled: true,
      referenceAnswer: `두 빈칸에는 모두 sample interval인 \`t_step\`이 들어간다.

\`\`\`python
z1[k] = (
    np.sum(
        product_I[start:end]
    )
    * t_step
)

z2[k] = (
    np.sum(
        product_Q[start:end]
    )
    * t_step
)
\`\`\`

본 실습에서는

$$
t_{step}
=
\\frac{T_s}{L}
=
\\frac{1}{100}
$$

이므로 100개의 sample 값을 더한 뒤 $1/100$을 곱하여 수치적분을 수행한다.

즉,

$$
z_1
\\approx
\\sum r[n]\\psi_1[n]t_{step}
$$

$$
z_2
\\approx
\\sum r[n]\\psi_2[n]t_{step}
$$

로 계산된다.`,
    },
    { // 문제 3.B2
      "id": "23-3B2",
      "title": "3.B2.",
      "type": "python",
      "starterCode": `# -------------------------------------------------
# Noise가 없는 16QAM constellation
# -------------------------------------------------

Ns = 2000

rng_bits = np.random.default_rng(
    seed_bits
)

bits = rng_bits.integers(
    0,
    2,
    size=(Ns, 4)
)

(
    t,
    I_symbols,
    Q_symbols,
    I_baseband,
    Q_baseband,
    tx_signal,
    rx_signal
) = qam16_awgn(
    bits,
    Ts=1,
    L=100,
    fc=20,
    noise_variance=0,
    seed_noise=seed_bits + 1
)

z1, z2 = qam16_correlator(
    rx_signal,
    Ts=1,
    L=100,
    fc_rx=20
)

# 마지막 1000개의 symbol 표시
plt.figure(figsize=(7, 7))

plt.scatter(
    z1[-1000:],
    z2[-1000:],
    s=12
)

plt.axhline(0)
plt.axvline(0)

plt.xticks([-3, -1, 1, 3])
plt.yticks([-3, -1, 1, 3])

plt.xlabel('z1')
plt.ylabel('z2')

plt.title(
    'Received 16QAM Constellation'
)

plt.grid()
plt.axis('equal')
plt.show()`,
      "prompt": `Noise variance를 0으로 설정하여 16QAM 신호를 생성하고, 문제 3.B1의 상관 수신기로 $(z_1,z_2)$를 계산하시오. 마지막 1000개의 QAM symbol을 constellation diagram으로 나타내고 다음을 확인하시오.

(a) 수신 constellation이 $z_1,z_2\\in\\{-3,-1,+1,+3\\}$의 16개 위치에 나타나는가?
(b) 문제 1.B3에서 확인한 Gray-mapped 16QAM constellation과 동일한 형태인지 확인하시오.`,
      responseEnabled: true,
      referenceAnswer: `(a) Noise variance가 0이고 송수신 carrier가 정확히 동기된 경우 상관 수신기의 출력은 이상적인 QAM symbol 좌표와 일치한다.

따라서

$$
z_1,z_2
\\in
\\{-3,-1,+1,+3\\}
$$

이며 총 16개의 constellation point가 나타난다.

즉,

$$
(-3,3),\\;(-1,3),\\;(1,3),\\;(3,3)
$$

을 포함하여 $4\\times4$ 격자 형태의 constellation이 나타난다.

(b) 출력된 constellation은 문제 1.B3에서 확인한 Gray-mapped 16QAM constellation과 동일한 위치를 갖는다.

Python의 부동소수점 계산으로 인해 좌표가 정확히 정수값이 아닌 매우 작은 수치 오차를 포함할 수 있지만, 각 점은 $\\pm1$, $\\pm3$ 부근에 위치한다.`,
    },
    { // 문제 3.B3
      "id": "23-3B3",
      "title": "3.B3.",
      "type": "essay",
      "prompt": `문제 3.B2에서 얻은 constellation을 문제 1.B3의 16QAM constellation과 비교하시오. 두 constellation의 위치가 일치하는지 확인하고, 이를 바탕으로 문제 3.B1에서 구현한 $(z_1,z_2)$ 생성 과정이 올바르게 동작하는지 설명하시오.`,
      referenceAnswer: `문제 3.B2에서 얻은 constellation은 문제 1.B3의 16QAM Gray mapping constellation과 동일한 16개의 위치에 나타난다.

즉,

$$
z_1,z_2
\\in
\\{-3,-1,+1,+3\\}
$$

의 조합으로 구성된 $4\\times4$ constellation이 복원된다.

따라서 수신신호 $r(t)$에 각각 $\\psi_1(t)$와 $\\psi_2(t)$를 곱하고 한 심벌 구간 동안 적분하여 $(z_1,z_2)$를 계산한 상관 수신기가 올바르게 구현되었음을 확인할 수 있다.`,
    },
    { // 문제 3.B4
      "id": "23-3B4",
      "title": "3.B4.",
      "type": "python",
      "starterCode": `# -------------------------------------------------
# AWGN variance = 10
# -------------------------------------------------

noise_variance = 10

(
    t,
    I_symbols,
    Q_symbols,
    I_baseband,
    Q_baseband,
    tx_signal,
    rx_signal
) = qam16_awgn(
    bits,
    Ts=1,
    L=100,
    fc=20,
    noise_variance=noise_variance,
    seed_noise=seed_bits + 1
)

z1_noise, z2_noise = qam16_correlator(
    rx_signal,
    Ts=1,
    L=100,
    fc_rx=20
)

plt.figure(figsize=(7, 7))

plt.scatter(
    z1_noise[-1000:],
    z2_noise[-1000:],
    s=10,
    alpha=0.5
)

plt.axhline(0)
plt.axvline(0)

plt.xlabel('z1')
plt.ylabel('z2')

plt.title(
    '16QAM Constellation with AWGN'
)

plt.grid()
plt.axis('equal')
plt.show()`,
      "prompt": `AWGN sample의 variance를 $10$으로 설정하고 constellation을 다시 관찰하시오. Noise variance가 0이었던 문제 3.B2와 비교하여 각 constellation point 주변의 분포가 어떻게 변하는지 설명하시오.`,
      responseEnabled: true,
      referenceAnswer: `Noise variance를 10으로 증가시키면 각 이상적인 constellation point가 하나의 점으로 나타나지 않고 주변으로 퍼진 분포를 형성한다.

즉, noise가 없는 경우에는

$$
(\\pm1,\\pm1),
\\quad
(\\pm1,\\pm3),
\\quad
(\\pm3,\\pm1),
\\quad
(\\pm3,\\pm3)
$$

의 16개 위치에 점이 집중되지만, AWGN이 추가되면 각 좌표에 Gaussian noise 성분이 더해져 중심점 주변으로 흩어진다.

따라서 noise variance가 증가할수록 인접한 decision region으로 넘어가는 수신 symbol의 수가 증가하여 BER도 증가할 수 있다.`,
    },
    { // 문제 3.B5
      "id": "23-3B5",
      "title": "3.B5.",
      "type": "python",
      "starterCode": `# -------------------------------------------------
# Receiver carrier frequency error
# -------------------------------------------------

fc_rx = 20.00001

# noise variance = 10인 수신신호 사용
z1_freq, z2_freq = qam16_correlator(
    rx_signal,
    Ts=1,
    L=100,
    fc_rx=fc_rx
)

plt.figure(figsize=(7, 7))

plt.scatter(
    z1_freq,
    z2_freq,
    s=8,
    alpha=0.35
)

plt.axhline(0)
plt.axvline(0)

plt.xlabel('z1')
plt.ylabel('z2')

plt.title(
    '16QAM with Receiver Frequency Error'
)

plt.grid()
plt.axis('equal')
plt.show()`,
      "prompt": `수신기의 carrier frequency를 $f_{c,R}=20.00001\\text{ Hz}$로 변경하여 송신기의 carrier frequency $f_{c,T}=20\\text{ Hz}$와 작은 주파수 오차가 존재하도록 한다. Noise variance는 문제 3.B4와 동일하게 10으로 유지한다. 수신 constellation을 관찰하고 주파수 오차가 없는 경우와 비교하여 constellation point들의 위치가 시간에 따라 어떻게 변하는지 설명하시오.

※ 주파수 오차에 의한 회전은 시간에 따라 누적되므로 충분한 수의 QAM symbol을 사용하여 관찰한다.`,
      responseEnabled: true,
      referenceAnswer: `송신 carrier frequency는

$$
f_{c,T}=20\\text{ Hz}
$$

이고 수신 carrier frequency는

$$
f_{c,R}=20.00001\\text{ Hz}
$$

이므로

$$
\\Delta f
=
0.00001\\text{ Hz}
$$

의 주파수 오차가 존재한다.

이 작은 주파수 차이도 시간에 따라 phase difference를 누적시킨다.

$$
\\Delta\\phi(t)
=
2\\pi\\Delta f\\,t
$$

따라서 수신기에서 계산되는 $(z_1,z_2)$ constellation은 고정된 위치에 머무르지 않고 시간에 따라 점차 회전한다.

현재처럼 수신 carrier frequency가 송신 carrier frequency보다 큰 경우 constellation은 시간에 따라 반시계방향으로 회전하는 형태를 보인다.

Simulation 시간을 더 길게 할수록 누적되는 phase error가 커지므로 회전 현상이 더욱 뚜렷해진다.`,
    },
    { // 문제 3.B6
      "id": "23-3B6",
      "title": "3.B6.",
      "type": "essay",
      "prompt": `문제 3.B4의 AWGN과 문제 3.B5의 carrier frequency error를 비교하시오.

(a) AWGN은 constellation point의 분포를 어떻게 변화시키는가?
(b) Carrier frequency error는 constellation 전체를 어떻게 변화시키는가?
(c) 현재의 두 조건 중 BER 성능에 더 치명적인 영향을 줄 수 있는 것은 무엇인지 그 이유와 함께 설명하시오.`,
      referenceAnswer: `(a) AWGN은 각 이상적인 constellation point를 중심으로 수신 symbol을 주변으로 퍼뜨린다.

즉, constellation의 전체 구조는 유지되지만 각 신호점 주변에 Gaussian 형태의 분산이 발생한다.

(b) Carrier frequency error는 송수신 carrier 사이의 phase difference가 시간에 따라 누적되게 한다.

따라서 각 신호점 주변을 단순히 퍼뜨리는 것이 아니라 constellation 전체의 방향을 계속 회전시킨다.

(c) 현재의 설정에서는 carrier frequency error가 BER 성능에 더 치명적일 수 있다.

AWGN은 신호점을 원래 위치 주변으로 퍼뜨리지만, 작은 frequency error도 시간이 지남에 따라 phase error가 계속 누적되어 constellation 자체가 decision region에서 벗어나기 때문이다.

따라서 충분히 긴 시간 동안 수신하면 높은 SNR에서도 잘못된 bit decision이 발생할 수 있다.`,
    },
    { // 문제 3.B7
      "id": "23-3B7",
      "title": "3.B7.",
      "type": "essay",
      "prompt": `16QAM 수신기에서는 송신기에 사용한 carrier와 동일한 주파수 및 위상을 갖는 기저신호를 이용하여 correlation을 수행해야 한다. 문제 3.B5와 3.B6의 결과를 바탕으로 QAM 신호가 동기검파(Coherent Detection)를 필요로 하는 이유를 설명하시오.`,
      referenceAnswer: `동기검파(Coherent Detection)는 수신기에서 송신 carrier와 동일한 주파수와 위상을 갖는 국부 반송파를 생성하여 수신신호와 correlation을 수행하는 검파 방식이다.

16QAM에서는 수신신호를 I축과 Q축으로 정확하게 분리해야 하므로 수신기의

$$
\\psi_1(t)
$$

와

$$
\\psi_2(t)
$$

가 송신기에 사용된 carrier와 동기되어야 한다.

Carrier frequency나 phase에 오차가 존재하면 constellation이 회전하여 $(z_1,z_2)$의 위치가 올바른 decision region에서 벗어날 수 있다.

특히 작은 frequency error도 시간이 지나면서 phase error가 계속 누적된다.

따라서 16QAM 신호를 정확하게 복조하기 위해서는 송수신 carrier의 주파수와 위상을 일치시키는 동기검파가 필요하다.`,
    },
    { // 문제 3.C
      "id": "23-3C",
      "title": "3.C.",
      "type": "python",
      "starterCode": `def qam16_detect(z1, z2):
    """
    Correlator 출력 z1, z2로부터
    [b4, b3, b2, b1]을 검출한다.
    """

    z1 = np.asarray(z1)
    z2 = np.asarray(z2)

    b4_hat = (
        z1 ?? 0
    ).astype(int)

    b3_hat = (
        np.abs(z1) ?? 2
    ).astype(int)

    b2_hat = (
        z2 ?? 0
    ).astype(int)

    b1_hat = (
        np.abs(z2) ?? 2
    ).astype(int)

    bits_hat = np.column_stack([
        b4_hat,
        b3_hat,
        b2_hat,
        b1_hat
    ])

    return bits_hat`,
      "prompt": `문제 1.C1에서 구한 Gray mapping의 bit decision rule을 $(z_1,z_2)$에 적용하여 4개의 data bit를 검출한다.

다음 빈칸을 채우시오.
\`\`\`python
b4_hat = (z1 ?? 0).astype(int)

b3_hat = (
    np.abs(z1) ?? 2
).astype(int)

b2_hat = (z2 ?? 0).astype(int)

b1_hat = (
    np.abs(z2) ?? 2
).astype(int)
\`\`\`
완성된 함수가 각 QAM symbol에 대해 $(\\hat b_4,\\hat b_3,\\hat b_2,\\hat b_1)$을 출력하는지 확인하시오.
[[image:/images/ch23/figure23_3.png|그림 23.3 16QAM bit detection 구조|80]]`,
      responseEnabled: true,
      referenceAnswer: `문제 1.C1의 Gray mapping 판별조건을 적용하면 빈칸은 각각

\`\`\`python
b4_hat = (
    z1 > 0
).astype(int)

b3_hat = (
    np.abs(z1) < 2
).astype(int)

b2_hat = (
    z2 < 0
).astype(int)

b1_hat = (
    np.abs(z2) < 2
).astype(int)
\`\`\`

이다.

따라서 완성된 함수는

\`\`\`python
def qam16_detect(z1, z2):

    z1 = np.asarray(z1)
    z2 = np.asarray(z2)

    b4_hat = (
        z1 > 0
    ).astype(int)

    b3_hat = (
        np.abs(z1) < 2
    ).astype(int)

    b2_hat = (
        z2 < 0
    ).astype(int)

    b1_hat = (
        np.abs(z2) < 2
    ).astype(int)

    bits_hat = np.column_stack([
        b4_hat,
        b3_hat,
        b2_hat,
        b1_hat
    ])

    return bits_hat
\`\`\`

판별조건은

$$
\\hat b_4
=
\\begin{cases}
1,&z_1>0\\\\
0,&z_1\\le0
\\end{cases}
$$

$$
\\hat b_3
=
\\begin{cases}
1,&|z_1|<2\\\\
0,&|z_1|\\ge2
\\end{cases}
$$

$$
\\hat b_2
=
\\begin{cases}
1,&z_2<0\\\\
0,&z_2\\ge0
\\end{cases}
$$

$$
\\hat b_1
=
\\begin{cases}
1,&|z_2|<2\\\\
0,&|z_2|\\ge2
\\end{cases}
$$

이다.`,
    },
    { // 문제 3.D
      "id": "23-3D",
      "title": "3.D.",
      "type": "python",
      "starterCode": `# -------------------------------------------------
# Noise와 frequency error가 없는 상태
# -------------------------------------------------

Ns = 50

rng_bits = np.random.default_rng(
    seed_bits
)

bits = rng_bits.integers(
    0,
    2,
    size=(Ns, 4)
)

(
    t,
    I_symbols,
    Q_symbols,
    I_baseband,
    Q_baseband,
    tx_signal,
    rx_signal
) = qam16_awgn(
    bits,
    Ts=1,
    L=100,
    fc=20,
    noise_variance=0,
    seed_noise=seed_bits + 1
)

z1, z2 = qam16_correlator(
    rx_signal,
    Ts=1,
    L=100,
    fc_rx=20
)

bits_hat = qam16_detect(
    z1,
    z2
)

# -------------------------------------------------
# 4-bit symbol -> serial bit sequence
# -------------------------------------------------

tx_bits_serial = bits.reshape(-1)

rx_bits_serial = bits_hat.reshape(-1)

print(
    "송신 bit 수 =",
    len(tx_bits_serial)
)

print(
    "검출 bit 수 =",
    len(rx_bits_serial)
)`,
      "prompt": `각 16QAM symbol에서 검출된 $(\\hat b_4,\\hat b_3,\\hat b_2,\\hat b_1)$을 하나의 serial bit sequence로 변환하고 원래 송신 bit sequence와 비교할 수 있도록 구성하시오. 코드를 실행하여 송신 bit 수와 검출 bit 수가 동일한지 확인하시오.
[[image:/images/ch23/figure23_4.png|그림 23.4 송신 비트와 검출 비트 비교 구조|80]]`,
      responseEnabled: true,
      referenceAnswer: `한 QAM symbol에는 4개의 bit가 포함되고

$$
N_s=50
$$

개의 symbol을 생성하였으므로 전체 송신 bit 수는

$$
50\\times4
=
200
$$

이다.

\`bits_hat\` 역시 각 QAM symbol마다 4개의 검출 bit를 출력하므로

$$
50\\times4
=
200
$$

개의 bit를 갖는다.

따라서 실행 결과는

\`\`\`text
송신 bit 수 = 200
검출 bit 수 = 200
\`\`\`

이 된다.

\`\`\`python
tx_bits_serial = bits.reshape(-1)
rx_bits_serial = bits_hat.reshape(-1)
\`\`\`

을 이용하면 각 symbol의

$$
(b_4,b_3,b_2,b_1)
$$

순서를 유지하면서 하나의 serial bit sequence로 변환된다.`,
    },
    { // 문제 3.E
      "id": "23-3E",
      "title": "3.E.",
      "type": "python",
      "starterCode": `# -------------------------------------------------
# 송신 bit와 검출 bit 비교
# -------------------------------------------------

bit_index = np.arange(
    len(tx_bits_serial)
)

plt.figure(figsize=(12, 6))

plt.subplot(2, 1, 1)

plt.step(
    bit_index,
    tx_bits_serial,
    where='post'
)

plt.ylabel('Transmitted bit')
plt.yticks([0, 1])
plt.grid()


plt.subplot(2, 1, 2)

plt.step(
    bit_index,
    rx_bits_serial,
    where='post'
)

plt.xlabel('Bit index')
plt.ylabel('Detected bit')
plt.yticks([0, 1])
plt.grid()

plt.tight_layout()
plt.show()


num_errors = np.count_nonzero(
    tx_bits_serial
    != rx_bits_serial
)

print(
    "Number of bit errors =",
    num_errors
)`,
      "prompt": `Noise variance를 0으로 하고 송수신 carrier frequency를 모두 20 Hz로 설정한 상태에서 송신 bit sequence와 검출 bit sequence를 비교하시오.

(a) 두 bit waveform이 서로 일치하는지 확인하시오.
(b) 다음 코드로 bit error의 개수를 확인하시오.
\`\`\`python
num_errors = np.count_nonzero(
    tx_bits_serial
    != rx_bits_serial
)
\`\`\`
Noise와 동기오차가 없는 경우 error 수가 얼마인지 쓰시오.`,
      responseEnabled: true,
      referenceAnswer: `(a) Noise variance가 0이고 송수신 carrier frequency가 모두 20 Hz로 정확하게 동기되어 있으므로 송신 bit waveform과 검출 bit waveform은 서로 일치한다.

(b) 따라서

\`\`\`python
num_errors = np.count_nonzero(
    tx_bits_serial
    != rx_bits_serial
)
\`\`\`

의 실행 결과는

\`\`\`text
Number of bit errors = 0
\`\`\`

이다.

즉,

$$
\\boxed{
N_{error}=0
}
$$

이며 모든 송신 bit가 올바르게 복원되었음을 확인할 수 있다.`,
    },
    { // 문제 3.F
      "id": "23-3F",
      "title": "3.F.",
      "type": "essay",
      "prompt": `문제 3.E에서 관찰한 송신 bit sequence와 검출 bit sequence가 일치하는지 쓰시오.

또한, 이 결과를 바탕으로 다음 과정이 올바르게 구현되었는지 설명하시오.
$$
\\text{16QAM Gray mapping}
\\rightarrow
\\text{Passband modulation}
\\rightarrow
\\text{Correlation}
\\rightarrow
(z_1,z_2)
\\rightarrow
\\text{Bit decision}
$$`,
      referenceAnswer: `문제 3.E에서 송신 bit sequence와 검출 bit sequence는 서로 일치하며 bit error의 개수는 0이다.

따라서

$$
\\text{16QAM Gray mapping}
\\rightarrow
\\text{Passband modulation}
\\rightarrow
\\text{Correlation}
\\rightarrow
(z_1,z_2)
\\rightarrow
\\text{Bit decision}
$$

의 전체 송수신 과정이 올바르게 구현되었음을 확인할 수 있다.

송신된 4-bit data는 Gray mapping을 통해 16QAM symbol로 변환되고, passband 신호로 전송된 후 상관 수신기를 통해 $(z_1,z_2)$가 복원된다.

이후 Gray mapping의 decision rule을 적용하면 원래의

$$
(b_4,b_3,b_2,b_1)
$$

을 정확하게 검출할 수 있다.`,
    },
  ]
},
    { // 문제 4
  "id": "23-4",
  "title": "4. BER Simulation",
  "problems": [
    { // 문제 4.A
      "id": "23-4A",
      "title": "4.A.",
      "prompt": `Gray-mapped 16QAM의 BER 성능을 실험해 보자.

먼저 $\\dfrac{E_b}{N_0}=10\\text{ dB}$일 때 AWGN sample의 variance를 계산한다. 문제 1.B5에서 16QAM의 bit energy는 $E_b=2.5$임을 확인하였다. 또한, noise sample interval은 $t_{step}=\\dfrac{1}{100}\\text{ sec}$이다.

AWGN sample의 variance는 [[equation:23.2]]와 같이 계산한다.
$$
v_n
=
\\frac{N_0}{2t_{step}}
\\qquad \\text{(식 23.2)}
$$
`,
    },
    { // 문제 4.A1
      "id": "23-4A1",
      "title": "4.A1.",
      "type": "proof",
      "prompt": `$E_b/N_0=10$ dB를 linear scale로 변환하시오.

다음 관계를 사용한다.
$$
\\left(\\frac{E_b}{N_0}\\right)_{linear}
=
10^{
\\left(E_b/N_0\\right)_{dB}/10
}
$$`,
      referenceAnswer: `$E_b/N_0=10$ dB를 linear scale로 변환하면

$$
\\left(
\\frac{E_b}{N_0}
\\right)_{linear}
=
10^{10/10}
=
10
$$

이다.

따라서

$$
\\boxed{
\\frac{E_b}{N_0}=10
}
$$

이다.`,
    },
    { // 문제 4.A2
      "id": "23-4A2",
      "title": "4.A2.",
      "type": "proof",
      "prompt": `문제 1.B5에서 구한 $E_b=2.5$와 문제 4.A1에서 구한 $E_b/N_0$의 linear 값을 이용하여 $N_0$를 계산하시오.
$$
N_0
=
\\frac{E_b}{E_b/N_0}
$$`,
      referenceAnswer: `문제 1.B5에서

$$
E_b=2.5
$$

이고 문제 4.A1에서

$$
\\frac{E_b}{N_0}=10
$$

이므로

$$
N_0
=
\\frac{E_b}{E_b/N_0}
=
\\frac{2.5}{10}
=
0.25
$$

이다.

따라서

$$
\\boxed{N_0=0.25}
$$

이다.`,
    },
    { // 문제 4.A3
      "id": "23-4A3",
      "title": "4.A3.",
      "type": "proof",
      "prompt": `AWGN sample의 variance는 [[equation:23.2]]로 계산한다. 본 시스템에서는 $t_{step}=\\dfrac{1}{100}$이다. 문제 4.A2에서 구한 $N_0$를 이용하여 $\\boxed{v_n=12.5}$가 됨을 보이시오.`,
      referenceAnswer: `AWGN sample의 variance는

$$
v_n
=
\\frac{N_0}{2t_{step}}
$$

이다.

여기에

$$
N_0=0.25,
\\qquad
t_{step}=\\frac{1}{100}
$$

을 대입하면

$$
v_n
=
\\frac{0.25}{
2\\times\\frac{1}{100}
}
$$

$$
=
\\frac{0.25}{0.02}
=
12.5
$$

이다.

따라서

$$
\\boxed{v_n=12.5}
$$

이다.`,
    },
    { // 문제 4.B
      "id": "23-4B",
      "title": "4.B.",
      "prompt": `문제 2와 3에서 구현한 16QAM 송신기, AWGN channel, 상관 수신기와 bit detector를 이용하여 BER simulation 함수를 구성해 보자.

각 $E_b/N_0$에 대해 다음 과정을 반복한다.
Step 1. Random 4-bit data를 생성한다.
Step 2. Gray mapping하여 passband 16QAM 신호를 생성한다.
Step 3. 계산한 noise variance를 이용하여 AWGN을 추가한다.
Step 4. 상관 수신기로 $(z_1,z_2)$를 계산한다.
Step 5. Gray mapping decision rule로 bit를 검출한다.
Step 6. 송신 bit와 검출 bit를 비교하여 BER을 계산한다.`,
    },
    { // 문제 4.B1
      "id": "23-4B1",
      "title": "4.B1.",
      "type": "python",
      "starterCode": `def simulate_qam16_ber(
    EbN0dB,
    Nerrs=200,
    max_symbols=50000,
    chunk_symbols=1000,
    seed_bits=0
):
    Eb = 2.5
    Ts = 1
    L = 100

    t_step = Ts / L

    # dB -> linear
    EbN0 = 10 ** (
        EbN0dB / 10
    )

    N0 = Eb / EbN0

    noise_variance = (
        N0
        /
        (2 * t_step)
    )

    total_errors = 0
    total_bits = 0
    total_symbols = 0

    rng_bits = np.random.default_rng(
        seed_bits
    )

    block_index = 0

    while (
        total_errors < Nerrs
        and total_symbols < max_symbols
    ):

        Ns = min(
            chunk_symbols,
            max_symbols - total_symbols
        )

        bits = rng_bits.integers(
            0,
            2,
            size=(Ns, 4)
        )

        (
            t,
            I_symbols,
            Q_symbols,
            I_baseband,
            Q_baseband,
            tx_signal,
            rx_signal
        ) = qam16_awgn(
            bits,
            Ts=Ts,
            L=L,
            fc=20,
            noise_variance=noise_variance,
            seed_noise=seed_bits + 1 + block_index
        )

        z1, z2 = qam16_correlator(
            rx_signal,
            Ts=Ts,
            L=L,
            fc_rx=20
        )

        bits_hat = qam16_detect(
            z1,
            z2
        )

        tx_bits = bits.reshape(-1)
        rx_bits = bits_hat.reshape(-1)

        total_errors += np.count_nonzero(
            tx_bits != rx_bits
        )

        total_bits += len(tx_bits)
        total_symbols += Ns

        block_index += 1

    BER = (
        total_errors
        /
        total_bits
    )

    return (
        BER,
        total_errors,
        total_bits,
        noise_variance
    )`,
      "prompt": `16QAM BER simulation 함수를 실행할 준비를 하시오. 이 함수는 누적 error bit 수가 $N_{errs}$에 도달하거나 최대 symbol 수에 도달할 때까지 simulation을 반복한다. 코드를 실행하여 함수가 정상적으로 정의되는지 확인하시오.`,
      responseEnabled: true,
      referenceAnswer: `함수는 입력된 $E_b/N_0$를 이용하여

$$
\\frac{E_b}{N_0}
=
10^{E_b/N_0[dB]/10}
$$

으로 linear scale을 계산하고,

$$
N_0
=
\\frac{E_b}{E_b/N_0}
$$

및

$$
v_n
=
\\frac{N_0}{2t_{step}}
$$

을 이용하여 AWGN sample variance를 구한다.

이후 random 4-bit data 생성, 16QAM 변조, AWGN 추가, correlation, bit detection, error counting을 반복한다.

누적 error 수가 $N_{errs}$에 도달하거나 최대 symbol 수에 도달하면 simulation을 종료하고

$$
\\boxed{
BER
=
\\frac{\\text{error bits}}
{\\text{total transmitted bits}}
}
$$

을 반환한다.

따라서 코드를 실행하여 \`simulate_qam16_ber()\` 함수가 정상적으로 정의되면 된다.`,
    },
    { // 문제 4.B2
      "id": "23-4B2",
      "title": "4.B2.",
      "type": "python",
      "starterCode": `BER_sim, errors, total_bits, v_n = (
    simulate_qam16_ber(
        EbN0dB=10,
        Nerrs=200,
        max_symbols=50000,
        seed_bits=seed_bits
    )
)

print(
    "noise variance =",
    v_n
)

print(
    "error bits =",
    errors
)

print(
    "total bits =",
    total_bits
)

print(
    "simulated BER =",
    BER_sim
)`,
      "prompt": `$E_b/N_0=10$ dB에서 BER simulation을 수행하시오.

(a) noise variance가 문제 4.A3에서 구한 $12.5$와 일치하는지 확인하시오.
(b) simulated BER을 관찰하시오. 난수를 이용한 simulation이므로 실행 결과는 매번 이론값과 완전히 동일하지 않을 수 있으나, 충분한 error bit가 누적되면 이론값에 가까워지는지 확인하시오.`,
      responseEnabled: true,
      referenceAnswer: `(a) $E_b/N_0=10$ dB에서 계산되는 noise variance는

$$
\\boxed{v_n=12.5}
$$

이다.

따라서 출력되는 \`noise variance\` 값은 문제 4.A3의 결과와 일치한다.

(b) 충분한 수의 bit를 이용해 simulation하면 BER은 이론적인 16QAM BER인

$$
\\boxed{
BER\\approx0.0018
}
$$

부근의 값을 갖는다.

난수를 이용한 Monte Carlo simulation이므로 실제 출력값은 실행 조건에 따라 약간 달라질 수 있다.

또한 simulation은 유한한 개수의 bit만 관찰하므로 theoretical BER과 완전히 동일한 값이 나오지는 않는다.`,
    },
    { // 문제 4.C
      "id": "23-4C",
      "title": "4.C.",
      "type": "python",
      "starterCode": `from scipy.special import erfc

def Q(x):
    return 0.5 * erfc(
        x / np.sqrt(2)
    )

gamma = 10

BER_theory = (
    0.75 * Q(
        np.sqrt(0.8 * gamma)
    )
    +
    0.5 * Q(
        np.sqrt(7.2 * gamma)
    )
    -
    0.25 * Q(
        np.sqrt(20 * gamma)
    )
)

print(
    "Simulated BER =",
    BER_sim
)

print(
    "Theoretical BER =",
    BER_theory
)`,
      "prompt": `문제 4.B2에서 얻은 simulated BER과 문제 1.D5에서 유도한 Gray-mapped 16QAM theoretical BER을 비교하시오.

$\\dfrac{E_b}{N_0}=10$일 때 theoretical BER은 약 $0.0018$이다. 두 BER이 유사한 값을 갖는지 확인하고 차이가 발생할 수 있는 이유를 설명하시오.`,
      responseEnabled: true,
      referenceAnswer: `$E_b/N_0=10$ dB일 때

$$
\\gamma
=
10
$$

이다.

Gray-mapped 16QAM의 theoretical BER은

$$
P_b
=
\\frac34
Q\\left(
\\sqrt{0.8\\gamma}
\\right)
+
\\frac12
Q\\left(
\\sqrt{7.2\\gamma}
\\right)
-
\\frac14
Q\\left(
\\sqrt{20\\gamma}
\\right)
$$

이므로

$$
\\boxed{
P_b\\approx0.0018
}
$$

이다.

Simulation에서 얻은 BER 역시 충분한 수의 bit를 사용하면 이 값에 가까워진다.

두 값 사이의 작은 차이는 random data와 AWGN을 이용한 유한 길이 Monte Carlo simulation의 통계적 오차 때문에 발생한다.`,
    },
    { // 문제 4.D
      "id": "23-4D",
      "title": "4.D.",
      "prompt": `여러 $E_b/N_0$ 값에서 BER simulation을 수행하여 16QAM의 BER curve를 그려 보자. 사용할 $E_b/N_0$ 범위는 $2,4,6,8,10,12\\text{ dB}$이다. 각 $E_b/N_0$에서 simulated BER과 theoretical BER을 계산하고 두 결과를 비교한다.`,
    },
    { // 문제 4.D1
      "id": "23-4D1",
      "title": "4.D1.",
      "type": "python",
      "starterCode": `EbN0dB_vector = np.arange(
    2,
    14,
    2
)

BER_vector = []

for EbN0dB in EbN0dB_vector:

    BER, errors, total_bits, v_n = (
        simulate_qam16_ber(
            EbN0dB=EbN0dB,
            Nerrs=200,
            max_symbols=50000,
            seed_bits=seed_bits
        )
    )

    BER_vector.append(
        BER
    )

BER_vector = np.array(
    BER_vector
)


# ---------------------------------------------
# Theoretical BER
# ---------------------------------------------

gamma_vector = (
    10 ** (
        EbN0dB_vector / 10
    )
)

BER_theory = (
    0.75
    * Q(
        np.sqrt(
            0.8 * gamma_vector
        )
    )
    +
    0.5
    * Q(
        np.sqrt(
            7.2 * gamma_vector
        )
    )
    -
    0.25
    * Q(
        np.sqrt(
            20 * gamma_vector
        )
    )
)


plt.figure(figsize=(8, 6))

plt.semilogy(
    EbN0dB_vector,
    BER_vector,
    'o-',
    label='Simulated'
)

plt.semilogy(
    EbN0dB_vector,
    BER_theory,
    's-',
    label='Theory'
)

plt.xlabel(
    'Eb/N0 (dB)'
)

plt.ylabel(
    'BER'
)

plt.grid(
    True,
    which='both'
)

plt.legend()

plt.show()`,
      "prompt": `$E_b/N_0$를 $2\\text{ dB}\\sim12\\text{ dB}$범위에서 2 dB 간격으로 변화시키면서 simulated BER과 theoretical BER을 계산하시오. 완성된 BER curve를 관찰하고 두 결과가 전반적으로 일치하는지 확인하시오.`,
      responseEnabled: true,
      referenceAnswer: `$E_b/N_0$가 증가할수록 simulated BER과 theoretical BER은 모두 감소한다.

또한

$$
2,4,6,8,10,12\\text{ dB}
$$

의 각 $E_b/N_0$에서 simulated BER curve는 theoretical BER curve와 전반적으로 유사한 형태를 갖는다.

낮은 $E_b/N_0$에서는 error가 많이 발생하므로 비교적 안정적인 BER 추정값을 얻을 수 있다.

반면 높은 $E_b/N_0$에서는 error 발생 확률이 매우 작아 동일한 simulation 길이에서도 관찰되는 error 수가 감소한다.`,
    },
    { // 문제 4.D2
      "id": "23-4D2",
      "title": "4.D2.",
      "type": "essay",
      "prompt": `문제 4.D1에서 얻은 simulated BER curve와 theoretical BER curve를 비교하시오.

(a) $E_b/N_0$가 증가할수록 BER은 어떻게 변하는가?
(b) 두 BER curve가 전체적으로 일치하는가?
(c) 높은 $E_b/N_0$ 영역에서 simulation 결과의 통계적 변동이 커질 수 있는 이유를 설명하시오.`,
      referenceAnswer: `(a) $E_b/N_0$가 증가하면 신호 에너지에 비해 noise의 영향이 작아지므로 BER은 감소한다.

(b) Simulated BER curve와 theoretical BER curve는 전체적으로 유사한 경향을 보인다.

Monte Carlo simulation의 symbol 수를 충분히 증가시키면 두 결과는 더욱 가까워진다.

(c) 높은 $E_b/N_0$에서는 실제 BER 자체가 매우 작기 때문에 제한된 simulation 시간 동안 관찰되는 error bit의 수가 적다.

따라서 몇 개의 error 발생 여부가 BER 계산값에 상대적으로 큰 영향을 주어 통계적 변동이 커질 수 있다.`,
    },
    { // 문제 4.D3
      "id": "23-4D3",
      "title": "4.D3.",
      "type": "python",
      "starterCode": `# ---------------------------------------------
# Gain error test
# ---------------------------------------------

Ns = 5000

rng_bits = np.random.default_rng(
    seed_bits
)

bits = rng_bits.integers(
    0,
    2,
    size=(Ns, 4)
)

(
    t,
    I_symbols,
    Q_symbols,
    I_baseband,
    Q_baseband,
    tx_signal,
    rx_signal
) = qam16_awgn(
    bits,
    Ts=1,
    L=100,
    fc=20,
    noise_variance=0,
    seed_noise=seed_bits + 1
)

# 수신신호 크기를 10배 증가
rx_gain = 10

rx_signal_gain = (
    rx_gain
    * rx_signal
)

z1_gain, z2_gain = qam16_correlator(
    rx_signal_gain,
    Ts=1,
    L=100,
    fc_rx=20
)

# 기존 decision rule 사용
bits_hat_gain = qam16_detect(
    z1_gain,
    z2_gain
)

BER_gain = np.mean(
    bits.reshape(-1)
    != bits_hat_gain.reshape(-1)
)

print(
    "BER with gain = 10:",
    BER_gain
)`,
      "prompt": `Noise variance를 0으로 설정하고 수신신호의 크기를 10배 증가시키시오. 즉, $r'(t)=10r(t)$이다. 기존 16QAM decision rule을 그대로 사용하여 BER을 계산한 뒤 다음에 답하시오.
(a) Noise가 없음에도 BER이 0이 아닌 이유를 설명하시오.
(b) BER이 약 $\\dfrac14$이 되는 이유를 $b_4,b_3,b_2,b_1$의 판별조건을 이용하여 설명하시오.
(c) Gain이 10인 상태에서 올바른 bit detection을 수행하려면 $b_3$와 $b_1$의 decision threshold를 어떤 값으로 변경해야 하는지 쓰시오.
(d) QPSK에서는 수신신호에 양의 gain이 곱해져도 기존 bit decision rule을 그대로 사용할 수 있다. 그 이유를 16QAM과 비교하여 설명하시오.`,
      referenceAnswer: `(a) 수신신호에 gain 10을 적용하면 원래 constellation의

$$
\\pm1,
\\qquad
\\pm3
$$

좌표는

$$
\\pm10,
\\qquad
\\pm30
$$

으로 변한다.

그러나 기존 bit detector는 여전히

$$
|z_1|<2,
\\qquad
|z_2|<2
$$

를 기준으로 $b_3$, $b_1$을 판별한다.

따라서 noise가 없더라도 amplitude에 관련된 bit가 잘못 판별되어 BER이 0이 아니게 된다.

(b) $b_4$와 $b_2$는 각각

$$
z_1>0,
\\qquad
z_2<0
$$

처럼 부호만 이용해 판별한다.

양의 gain 10은 신호의 부호를 바꾸지 않으므로 $b_4$, $b_2$는 정상적으로 검출된다.

반면 $b_3$와 $b_1$은 기존 threshold 2를 사용하면

$$
|z_1|,
|z_2|
\\in
\\{10,30\\}
$$

이므로 항상

$$
|z|>2
$$

로 판별된다.

따라서 $b_3$, $b_1$ 각각에서 평균적으로 절반의 bit가 틀리게 된다.

전체 4개의 bit 중 두 bit에서 각각 error probability가 $1/2$이므로

$$
BER
=
\\frac{
0+\\frac12+0+\\frac12
}{4}
=
\\boxed{\\frac14}
$$

이다.

(c) 원래 inner/outer decision threshold는 2이므로 gain 10을 적용하면 threshold도 동일하게 10배 증가시켜야 한다.

따라서

$$
\\boxed{
|z_1|<20
}
$$

및

$$
\\boxed{
|z_2|<20
}
$$

을 사용해야 한다.

(d) QPSK의 decision rule은 constellation point의 amplitude가 아니라 주로 I/Q 성분의 부호를 이용한다.

따라서 양의 gain이 곱해져도 부호는 변하지 않으므로 기존 decision boundary인 0을 그대로 사용할 수 있다.

반면 16QAM은 같은 부호 영역 안에서도 $\\pm1$과 $\\pm3$의 서로 다른 amplitude를 구분해야 하므로 signal gain이 변하면 amplitude decision threshold 역시 함께 조정해야 한다.`,
      responseEnabled: true,
    },
    { // 문제 4.D4
      "id": "23-4D4",
      "title": "4.D4.",
      "type": "essay",
      "prompt": `수신기의 복잡도와 신호 처리 계산량 측면에서 QPSK에 비해 $M$-ary QAM $(M>4)$이 갖는 단점을 설명하시오.

다음 내용을 고려하시오.
- constellation point의 개수
- decision boundary의 개수
- amplitude 판별
- 수신기의 계산량`,
      referenceAnswer: `$M$-ary QAM에서 $M$이 증가하면 constellation point의 개수가 증가한다.

따라서 수신기에서는 더 많은 signal level과 decision region을 구분해야 하며 amplitude와 phase를 더 정밀하게 판별해야 한다.

특히 QPSK는 각 축에서 주로 부호를 판별하면 되지만, 16QAM이나 64QAM에서는 하나의 축에서도 여러 amplitude level을 구분해야 한다.

따라서 $M$이 증가할수록

- decision boundary의 수가 증가하고,
- bit mapping 및 detection 과정이 복잡해지며,
- constellation point 판별에 필요한 계산량이 증가하고,
- gain과 noise에 대한 정확도 요구조건도 높아진다.

결과적으로 QPSK에 비해 $M$-ary QAM은 수신기의 구조와 signal processing 계산량이 증가한다.`,
    },
    { // 문제 4.E
      "id": "23-4E",
      "title": "4.E.",
      "prompt": `16QAM passband 신호의 주파수 영역 특성을 관찰해 보자.

문제 2에서 사용한 파라미터는 $T_s=1\\text{ sec}, t_{step}=\\dfrac{1}{100}\\text{ sec}$이므로 sampling frequency는 $f_s=\\dfrac{1}{t_{step}}=100\\text{ Hz}$이다.

1장에서 사용한 \`spectrum_view()\`를 이용하여 16QAM passband 신호의 스펙트럼을 관찰하시오. 사각 펄스를 사용하는 경우 대역폭은 roll-off factor가 1인 Raised-Cosine pulse를 사용하는 경우와 동일한 것으로 가정한다.`,
    },
    { // 문제 4.E1
      "id": "23-4E1",
      "title": "4.E1.",
      "type": "python",
      "starterCode": `# ---------------------------------------------
# 충분한 수의 16QAM symbol 생성
# ---------------------------------------------

Ns = 500

rng_bits = np.random.default_rng(
    seed_bits
)

bits = rng_bits.integers(
    0,
    2,
    size=(Ns, 4)
)

(
    t,
    I_symbols,
    Q_symbols,
    I_baseband,
    Q_baseband,
    tx_signal,
    rx_signal
) = qam16_awgn(
    bits,
    Ts=1,
    L=100,
    fc=20,
    noise_variance=0,
    seed_noise=seed_bits + 1
)

fs = 100

spectrum_view(
    tx_signal,
    fs,
    frequency_limit_hz=30
)`,
      "prompt": `16QAM passband 송신신호 \`tx_signal\`의 spectrum을 관찰하시오.
(a) 출력된 전체 spectrum의 모양을 관찰하시오.
(b) 양의 주파수 영역에서 통과대역 신호의 중심주파수를 쓰시오.
(c) 음의 주파수와 양의 주파수 영역에서 대칭적인 spectrum이 나타나는지 확인하고, 그 이유를 설명하시오.`,
      responseEnabled: true,
      referenceAnswer: `(a) 16QAM passband signal의 spectrum은 양의 주파수와 음의 주파수 영역에 각각 하나의 주된 spectrum이 나타나는 형태이다.

각 spectrum은 rectangular pulse의 영향을 받아 main lobe와 side lobe를 갖는 sinc 계열의 형태를 나타낸다.

(b) 양의 주파수 영역에서 중심주파수는

$$
\\boxed{
f_c=20\\text{ Hz}
}
$$

이다.

음의 주파수 영역에서는 이에 대응하는

$$
-20\\text{ Hz}
$$

를 중심으로 동일한 형태가 나타난다.

(c) \`tx_signal\`은 실수 passband signal이므로 Fourier transform은 양의 주파수와 음의 주파수에서 conjugate symmetry를 갖는다.

따라서 power spectrum은

$$
\\boxed{
-20\\text{ Hz}
\\quad\\text{및}\\quad
+20\\text{ Hz}
}
$$

를 중심으로 좌우 대칭적으로 나타난다.`,
    },
    { // 문제 4.E2
      "id": "23-4E2",
      "title": "4.E2.",
      "type": "python",
      "starterCode": `# ---------------------------------------------
# 20 Hz 부근을 직접 확대하여 관찰
# ---------------------------------------------

N = len(tx_signal)

X = np.fft.fftshift(
    np.fft.fft(tx_signal)
)

frequency = np.fft.fftshift(
    np.fft.fftfreq(
        N,
        d=1 / fs
    )
)

magnitude = np.abs(X)

magnitude_db = (
    20
    * np.log10(
        magnitude
        /
        np.max(magnitude)
        +
        1e-12
    )
)

plt.figure(figsize=(10, 5))

plt.plot(
    frequency,
    magnitude_db
)

plt.xlim(
    18,
    22
)

plt.ylim(
    -50,
    5
)

plt.xlabel(
    'Frequency (Hz)'
)

plt.ylabel(
    'Normalized Magnitude (dB)'
)

plt.grid()

plt.show()`,
      "prompt": `양의 주파수 영역의 한쪽 passband spectrum을 자세히 관찰하기 위해 $18\\text{ Hz}\\le f\\le22\\text{ Hz}$범위로 확대하시오.
(a) 확대된 main lobe의 모양을 관찰하시오.
(b) peak로부터 20 dB 감소한 두 주파수 지점 사이의 폭을 이용하여 20 dB bandwidth를 측정하시오.
(c) 측정한 bandwidth가 사각 펄스에 대해 예상되는 이론적인 bandwidth와 유사한지 확인하시오.`,
      referenceAnswer: `(a) $18\\text{ Hz}\\le f\\le22\\text{ Hz}$로 확대하면

$$
f_c=20\\text{ Hz}
$$

를 중심으로 하나의 main lobe와 그 양쪽의 side lobe를 관찰할 수 있다.

Rectangular pulse를 사용하므로 spectrum은 sinc 계열의 형태를 갖고, 첫 번째 null은 대략

$$
19\\text{ Hz},
\\qquad
21\\text{ Hz}
$$

부근에서 나타난다.

(b) $20$ Hz에서의 peak를 기준으로 power가 20 dB 감소하는 좌우의 주파수를 읽으면 대략

$$
f_L\\approx19.1\\text{ Hz},
\\qquad
f_H\\approx20.9\\text{ Hz}
$$

부근이다.

따라서 20 dB bandwidth는 대략

$$
B_{20\\text{dB}}
=
f_H-f_L
\\approx
1.8\\text{ Hz}
$$

정도가 된다.

실제 random data와 FFT 길이에 따라 측정값은 약간 달라질 수 있다.

(c) 사각 펄스는 본 문제에서 roll-off factor가 1인 Raised-Cosine pulse와 동일한 대역폭을 갖는 것으로 가정한다.

Symbol rate가

$$
R_s
=
\\frac{1}{T_s}
=
1\\text{ symbol/s}
$$

이므로 이론적인 passband bandwidth는

$$
B
=
(1+\\alpha)R_s
$$

에서

$$
\\alpha=1
$$

을 대입하여

$$
\\boxed{
B=2\\text{ Hz}
}
$$

이다.

따라서 측정된 약 $1.8\\sim2$ Hz의 20 dB bandwidth는 이론적인 2 Hz와 유사한 결과이다.`,
      responseEnabled: true,
    },
    { // 문제 4.F
      "id": "23-4F",
      "title": "4.F.",
      "prompt": `QAM의 constellation size $M$에 따른 BER 성능과 대역폭 효율의 trade-off를 분석해 보자. QPSK는 constellation 관점에서 4QAM과 동일하게 볼 수 있다. 따라서, QPSK, 16QAM, 64QAM을 비교하면 $M$이 증가할 때 BER 성능과 bandwidth efficiency가 어떻게 변하는지 확인할 수 있다.`,
    },
    { // 문제 4.F1
      "id": "23-4F1",
      "title": "4.F1.",
      "type": "python",
      "starterCode": `EbN0dB = np.linspace(
    0,
    14,
    200
)

gamma = (
    10 ** (
        EbN0dB / 10
    )
)

# QPSK theoretical BER
BER_qpsk = (
    0.5
    * erfc(
        np.sqrt(gamma)
    )
)

# 16QAM theoretical BER
BER_16qam = (
    0.75
    * Q(
        np.sqrt(
            0.8 * gamma
        )
    )
    +
    0.5
    * Q(
        np.sqrt(
            7.2 * gamma
        )
    )
    -
    0.25
    * Q(
        np.sqrt(
            20 * gamma
        )
    )
)

plt.figure(figsize=(8, 6))

plt.semilogy(
    EbN0dB,
    BER_qpsk,
    label='QPSK / 4QAM'
)

plt.semilogy(
    EbN0dB,
    BER_16qam,
    label='16QAM'
)

plt.xlabel(
    'Eb/N0 (dB)'
)

plt.ylabel(
    'BER'
)

plt.grid(
    True,
    which='both'
)

plt.legend()

plt.show()`,
      "prompt": `QPSK(=4QAM)와 16QAM의 theoretical BER curve를 비교하시오.
(a) 동일한 $E_b/N_0$에서 어느 변조방식의 BER이 더 낮은지 확인하시오.
(b) 16QAM의 BER 성능이 QPSK보다 불리한 이유를 constellation point 사이의 거리와 decision region 관점에서 설명하시오.`,
      referenceAnswer: `(a) 동일한 $E_b/N_0$에서 QPSK(=4QAM)의 BER이 16QAM보다 낮다.

즉,

$$
\\boxed{
BER_{QPSK}
<
BER_{16QAM}
}
$$

이다.

(b) 동일한 평균 bit energy 조건에서 16QAM은 QPSK보다 많은 constellation point를 배치한다.

따라서 인접한 constellation point 사이의 거리가 상대적으로 작아지고 decision region 역시 좁아진다.

AWGN에 의해 수신 symbol이 이동할 때 decision boundary를 넘어 인접한 symbol로 잘못 판별될 가능성이 증가하므로 16QAM의 BER 성능이 QPSK보다 불리하다.`,
      responseEnabled: true,
    },
    { // 문제 4.F2
      "id": "23-4F2",
      "title": "4.F2.",
      "type": "proof",
      "prompt": `Data bit rate를 $R_b$ [bits/sec], QAM constellation size를 $M$이라 하자. 한 QAM symbol은 $\\log_2M$개의 bit를 전송한다.
(a) QAM symbol rate가 $\\boxed{R_s=\\dfrac{R_b}{\\log_2M}}$이 됨을 보이시오.
(b) roll-off factor가 0인 ideal pulse shaping을 가정할 때 passband QAM의 bandwidth가 $\\boxed{B=\\dfrac{R_b}{\\log_2M}}$이 됨을 보이시오.`,
      referenceAnswer: `(a) 한 QAM symbol이 전달하는 bit 수는

$$
\\log_2M
$$

이다.

QAM symbol rate를 $R_s$라 하면 bit rate는

$$
R_b
=
R_s\\log_2M
$$

이므로

$$
\\boxed{
R_s
=
\\frac{R_b}{\\log_2M}
}
$$

이다.

(b) roll-off factor가 0인 ideal pulse shaping에서는 passband QAM의 bandwidth가 symbol rate와 같다고 볼 수 있으므로

$$
B=R_s
$$

이다.

따라서

$$
\\boxed{
B
=
\\frac{R_b}{\\log_2M}
}
$$

이다.`,
    },
    { // 문제 4.F3
      "id": "23-4F3",
      "title": "4.F3.",
      "type": "proof",
      "prompt": `대역폭 효율은 [[equation:23.3]]과 같이 정의한다.
$$
\\eta
=
\\frac{
R_b\\;[\\text{bits/sec}]
}{
B\\;[\\text{Hz}]
}
\\qquad \\text{(식 23.3)}
$$
문제 4.F2의 결과를 이용하여 다음 변조방식의 대역폭 효율을 각각 구하시오.
(a) QPSK = 4QAM
(b) 16QAM
(c) 64QAM

세 변조방식의 대역폭 효율을 비교하시오.`,
      referenceAnswer: `대역폭 효율은

$$
\\eta
=
\\frac{R_b}{B}
$$

이다.

문제 4.F2에서

$$
B
=
\\frac{R_b}{\\log_2M}
$$

이므로

$$
\\eta
=
\\frac{R_b}{
R_b/\\log_2M
}
=
\\log_2M
$$

이다.

따라서 QPSK(=4QAM)의 경우

$$
\\eta
=
\\log_2 4
=
\\boxed{
2\\text{ bits/s/Hz}
}
$$

이다.

16QAM의 경우

$$
\\eta
=
\\log_2 16
=
\\boxed{
4\\text{ bits/s/Hz}
}
$$

이다.

64QAM의 경우

$$
\\eta
=
\\log_2 64
=
\\boxed{
6\\text{ bits/s/Hz}
}
$$

이다.

따라서

$$
\\boxed{
\\eta_{4QAM}
<
\\eta_{16QAM}
<
\\eta_{64QAM}
}
$$

이며 $M$이 증가할수록 대역폭 효율이 증가한다.`,
    },
    { // 문제 4.F4
      "id": "23-4F4",
      "title": "4.F4.",
      "type": "essay",
      "prompt": `QAM에서 constellation size $M$이 증가할 때 나타나는 다음 두 특성의 변화를 정리하시오.
1. 대역폭 효율
2. 동일한 $E_b/N_0$에서의 BER 성능

또한, $M$을 크게 하면 대역폭 효율은 향상되지만 수신 성능과 구현 복잡도 측면에서 불리해지는 이유를 설명하시오.`,
      referenceAnswer: `QAM에서 constellation size $M$이 증가하면 한 symbol에 포함되는 bit 수

$$
\\log_2M
$$

이 증가한다.

따라서 동일한 bit rate $R_b$를 전송할 때 필요한 symbol rate와 bandwidth가 감소하므로 대역폭 효율은 증가한다.

즉,

$$
M\\uparrow
\\quad\\Rightarrow\\quad
\\eta\\uparrow
$$

이다.

반면 동일한 평균 $E_b/N_0$ 조건에서는 제한된 신호공간 안에 더 많은 constellation point를 배치해야 하므로 인접한 signal point 사이의 거리가 감소한다.

따라서 AWGN에 의해 decision boundary를 넘어갈 가능성이 증가하여 BER 성능은 악화된다.

즉,

$$
M\\uparrow
\\quad\\Rightarrow\\quad
BER\\;\\text{성능 악화}
$$

이다.

또한 $M$이 커질수록 더 많은 amplitude와 phase level을 구분해야 하므로 수신기의 decision rule, gain 정확도 및 signal processing 계산량도 증가한다.

따라서 높은 차수의 QAM은

$$
\\boxed{
\\text{높은 대역폭 효율}
\\leftrightarrow
\\text{낮은 noise 내성 및 높은 구현 복잡도}
}
$$

의 trade-off를 갖는다.`,
    },
  ]
},
  ]
} as const;
