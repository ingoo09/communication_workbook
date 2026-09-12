import type { WorkbookChapter } from '@/types/workbook';

export const chapter = {
  "id": "17-svc-ml1",
  "title": "Chapter 17. Signal Vector Space and ML Detection Ⅰ",
  "sections": [
    { //문제 1
      "id": "17-1",
      "title": "1. 직교 신호 집합",
      "problems": [
        { //문제 1.A
          "id": "17-1A",
          "title": "1.A.",
          "type": "essay",
          "prompt": `$t=[0, T]$ 영역에서 [[equation:17.1]]과 같은 직교(Orthogonal) 신호 집합이 있다.
$$
x_n(t)=A\\cos(2\\pi n\\Delta_f t), \\quad n=1,2,3,\\cdots,
\\quad \\text{wehre}\\quad
\\Delta_f\\triangleq\\frac{1}{T}
\\qquad \\text{(식 17.1)}
$$
두 신호 $x_n(t)$와 $x_{n+1}(t)$의 주파수 간격을 쓰시오.
          `,
        },
        { //문제 1.B
          "id": "17-1B",
          "title": "1.B.",
          "type": "proof",
          "prompt": `$t=[0, T]$에서 [[equation:17.1]]의 두 신호 $x_n(t)$와 $x_{n+1}(t)$의 상관 값(Correlation)을 계산하고, $n \\neq m$일 때 두 신호가 직교함을 보이시오.`,
        },
        { //문제 1.C
          "id": "17-1C",
          "title": "1.C.",
          "type": "proof",
          "prompt": `[[equation:17.1]]의 신호 $x_n(t)$의 에너지 $E_n$을 계산하시오.`,
        },
        { //문제 1.D
          "id": "17-1D",
          "title": "1.D.",
          "type": "proof",
          "prompt": `[[equation:17.1]]에 정의된 $x_n(t)$에서, $t=[0, T]$에서 정의된 또 하나의 신호 집합 $\\psi_n(t)=\\dfrac{x_n(t)}{\\sqrt{E_n}}(n=1,2,3,\\cdots)$이 정규 직교(Ortho-normal) 신호 집합임을 보이시오.`,
        },
      ],
    },
    { //문제 2
      "id": "17-2",
      "title": "2. 벡터 공간에서 ML(Maximum Likelihood) 검출",
      "problems": [
        { //문제 2.A
          "id": "17-2A",
          "title": "2.A.",
          "type": "essay",
          "prompt": `[[equation:17.1]]에서 $A=1, T=1$인 경우를 생각해보자. 문제 1.D의 답에서 주어진 $\\psi_1(t), \\psi_2(t), \\psi_3(t)$에 $A=1, T=1$ 을 대입하고, 그 결과를 쓰시오.
$$
\\psi_1(t)=?, \\psi_2(t)=?, \\psi_3(t)=?
\\qquad \\text{(식 17.2)}
$$
          `,
        },
        { //문제 2.B
          "id": "17-2B",
          "title": "2.B.",
          "type": "essay",
          "prompt": `8개의 파형 $s_i(t)(i=1,2,3,\\cdots,8)$을 이용하여 3개의 비트를 전송하는 8-ary 신호 전송 시스템이 있다. 각 파형($s_i(t)$)은 $\\psi_1(t)$, $\\psi_2(t)$, $\\psi_3(t)$을 선형 결합하여 발생시킨다. <표 17.1>은 3개의 데이터 비트 값에 따라 $s_i(t)$ 중 어떤 것이 전송되는지, 그리고 각 $s_i(t)$는 $\\psi_1(t)$, $\\psi_2(t)$, $\\psi_3(t)$로부터 어떻게 선형 결합하여 생성하는지를 나타낸 것이다.
[[table:
caption:표 17.1 데이터 비트 ↔ 8-ary 신호 매핑 표
신호 색인(index) $i$ | 송신 데이터 비트 | 매핑된 신호 $s_i(t)$
$1$ | $000$ | $s_1(t)=-2\\psi_1(t)-\\psi_2(t)-5\\psi_3(t)$
$2$ | $001$ | $s_2(t)=\\psi_1(t)-2\\psi_2(t)-3\\psi_3(t)$
$3$ | $010$ | $s_3(t)=0.5\\psi_1(t)+4\\psi_2(t)+2\\psi_3(t)$
$4$ | $011$ | $s_4(t)=3\\psi_1(t)-\\psi_2(t)-\\psi_3(t)$
$5$ | $100$ | $s_5(t)=-\\psi_1(t)-4\\psi_2(t)+3\\psi_3(t)$
$6$ | $101$ | $s_6(t)=\\psi_1(t)+3\\psi_2(t)-0.5\\psi_3(t)$
$7$ | $110$ | $s_7(t)=-1\\psi_1(t)-6\\psi_2(t)+3\\psi_3(t)$
$8$ | $111$ | $s_8(t)=-2\\psi_1(t)-3\\psi_2(t)+\\psi_3(t)$
]]
예를 들어, 송신 데이터 비트열(Transmit Data Bit Stream)이 다음과 같이 주어진다면,
$$
\\text{송신 데이터 비트} = 0100011100110101001010101110101\\cdots
$$
이때, 신호 $s_3(t) s_2(t) s_7(t) ? ? ? ? ? \\cdots$를 순서대로 전송한다. 신호 $ ? ? ? ? ? \\cdots$에 해당하는 신호 배열(Sequence)을 쓰시오.
          `,
        },
        { //문제 2.C
          "id": "17-2C",
          "title": "2.C.",
          "prompt": `8-ary 신호 $\\{s_1(t),s_2(t),\\cdots,s_8(t)\\}$ 중 하나의 신호가 송신되었다고 가정하자. 수신 단에서는, 송신한 신호와 노이즈 신호 성분 $n(t)$가 함께 수신된다. 송신 신호와 노이즈 신호의 합 즉, 수신 신호 $r(t)$를 [[equation:17.3]]과 같이 간단한 신호 $\\cos(1.532\\pi t)$로 주어진다고 가정하고 분석을 진행하자. 다음 물음을 통해, ML 검출 방식을 이용하여 [[equation:17.3]]에 주어진 수신 신호 $r(t)$로부터 3개의 데이터 비트를 복조(Demodulate)해보자.
$$
r(t)=s_i(t)+n(t)=\\cos(1.532\\pi t),
\\qquad 0\\le t \\le 1
\\qquad \\text{(식 17.3)}
$$
(참고. 랜덤 신호인 노이즈 신호가 더해진 수신 신호 $r(t)$가 [[equation:17.3]]과 같이 정형화된 신호 $\\cos(1.532\\pi t)$로 가정하는 것은 비현실적이다. 본 실습에서는 이해와 풀이 과정의 효율적인 확인을 위하여 이처럼 가정한다.)
[[image:/images/ch17/figure17_1.png|그림 17.1 수신 신호의 복조 과정]] 
          `,
        },
        {
          "id": "17-2C1",
          "title": "2.C1.",
          "type": "essay",
          "prompt": `$\\psi_1(t),\\psi_2(t),\\psi_3(t)$가 각각 $x, y, z$축의 직교 단위 벡터인 3차원 벡터 공간의 한 지점(Point)으로 8-ary 신호 집합 $\\{s_1(t),s_2(t),\\cdots,s_8(t)\\}$의 각 원소를 표현하시오. 예를 들어, <표 17.1>에 따르면, $s_1(t)$는 3차원 벡터 공간의 한 점 $(-2, 1, 5)$로 매핑된다. 이를 $s_1(t)\\Rightarrow \\mathbf{s}_1=(-2,-1,-5)$라 표현하자. 아래 다른 신호에 대하여도 그 좌푯값을 구하고, [[equation:17.4]]의 ?를 채워서 완성하시오.
$$
s_2(t)\\Rightarrow \\mathbf{s}_2=(?,?,?),
s_3(t)\\Rightarrow \\mathbf{s}_3=(?,?,?), \\cdots,
s_8(t)\\Rightarrow \\mathbf{s}_8=(?,?,?)
\\qquad \\text{(식 17.4)}
$$
`
        },
        {
          "id": "17-2C2",
          "title": "2.C2.",
          "type": "essay",
          "prompt": `[그림 17.1]은 M-ary 신호를 벡터 공간에서 ML 검출하는 과정을 보인 것이다. 점선 내부의 블록은 [[equation:17.5]]와 같이 수신 신호 $r(t)$를 벡터 공간의 좌표 $\\mathbf{Z}$로 전환하는 과정에 해당한다.
$$
r(t)\\Rightarrow \\mathbf{Z}=(Z_1,Z_2,\\cdots,Z_N),
\\qquad \\text{(식 17.5)}
$$

(a) [그림 17.1]을 참고하여, [[equation:17.6]]의 ?를 채워 넣어 $\\mathbf{Z}$의 각 원소 $Z_1,Z_2,\\cdots,Z_N$을 계산하는 식을 $r(t),\\psi_1(t),\\psi_2(t),\\cdots,\\psi_N(t)$의 함수로 완성하시오.
$$
Z_1=\\int ?dt, Z_2=?, Z_3=?, \\cdots, Z_N=?
\\qquad \\text{(식 17.6)}
$$
(b) [그림 17.1]의 적분 구간 $T$는 M-ary 신호의 길이와 같게 설정해야 한다. 따라서, [[equation:17.3]]에 주어진 수신 신호를 복조하기 위해 $T=1$로 설정할 것. 본 문제에서, 3개의 기저 신호의 결합으로 이루어진 8-ary 신호를 고려하고 있으므로, 벡터 공간의 차원 $N=3$이다. [[equation:17.3]]에 주어진 $r(t)$와 [[equation:17.2]]에서 나타낸 $\\psi_1(t),\\psi_2(t),\\psi_3(t)$의 정확한 수식을 [[equation:17.6]]에 대입하여 $Z_1,Z_2,Z_3$을 계산하시오.
(c) 노이즈가 없는 환경에서는 $r(t)$와 $s_i(t)$가 같다. 이러한 환경에서 (b)를 반복하고, $\\mathbf{Z}=\\{Z_1,Z_2,Z_3\\}$가 문제 2.C1에서 얻은 $\\mathbf{s_i}$와 같음을 보이시오.
`
        },
        {
          "id": "17-2C3",
          "title": "2.C3.",
          "type": "essay",
          "prompt": `벡터 공간에서 $r(t)$와 $s_i(t)(i=1,2,3,\\cdots,8)$ 사이의 유클리드 거리를 계산하시오. (모든 $i=1,2,3,\\cdots,8$ 에 대해 각각 구할 것)`
        },
        {
          "id": "17-2C4",
          "title": "2.C4.",
          "type": "essay",
          "prompt": `(a) 신호 $s_i(t)(i=1,2,3,\\cdots,8)$ 중에서 $r(t)$와 가장 가까운 것은 무엇인가?
(b) (a)의 답으로부터, 송신된 3개의 비트를 추정하시오.`
        },
        {
          "id": "17-2C5",
          "title": "2.C5.",
          "type": "essay",
          "prompt": `수신 신호 $r(t)$가 [[equation:17.7]]과 같이 주어졌을 때, 문제 2.C2~2.C4의 ML 검출 과정을 반복하시오.
$$
r(t)=\\cos(4.53\\pi t),
\\qquad 0\\le t \\le 1
\\qquad \\text{(식 17.7)}
$$`
        },
      ]
    }
  ]
} as const;
