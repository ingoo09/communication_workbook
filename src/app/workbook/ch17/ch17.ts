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
        
          referenceAnswer: `두 신호의 주파수는 각각
$$
f_n=n\\Delta_f,\\qquad f_{n+1}=(n+1)\\Delta_f
$$
이므로 주파수 간격은
$$
f_{n+1}-f_n=\\Delta_f.
$$
따라서
$$
\\boxed{\\Delta_f=\\frac{1}{T}\\text{ Hz}}
$$
이다.`},
        { //문제 1.B
          "id": "17-1B",
          "title": "1.B.",
          "type": "proof",
          "prompt": `$t=[0, T]$에서 [[equation:17.1]]의 두 신호 $x_n(t)$와 $x_{n+1}(t)$의 상관 값(Correlation)을 계산하고, $n \\neq m$일 때 두 신호가 직교함을 보이시오.`,
        
          referenceAnswer: `두 신호 $x_n(t)$와 $x_m(t)$의 상관값은
$$
R_{nm}
=
\\int_0^T x_n(t)x_m(t)\\,dt
$$
이다.

[[equation:17.1]]을 대입하면
$$
R_{nm}
=
A^2\\int_0^T
\\cos(2\\pi n\\Delta_ft)
\\cos(2\\pi m\\Delta_ft)\\,dt.
$$

곱-합 공식
$$
\\cos\\alpha\\cos\\beta
=
\\frac12\\left[
\\cos(\\alpha-\\beta)+
\\cos(\\alpha+\\beta)
\\right]
$$
을 사용하면
$$
R_{nm}
=
\\frac{A^2}{2}
\\int_0^T
\\left[
\\cos(2\\pi(n-m)\\Delta_ft)
+
\\cos(2\\pi(n+m)\\Delta_ft)
\\right]dt.
$$

$\\Delta_f=1/T$이고 $n\\ne m$이면 두 적분 모두 정수 개의 주기를 포함하므로 0이 된다.

따라서
$$
\\boxed{
R_{nm}=0,\\qquad n\\ne m
}
$$
이며, $x_n(t)$와 $x_m(t)$는 $[0,T]$에서 직교한다.

특히 $m=n+1$인 경우에도 동일하게 상관값은 0이다.`},
        { //문제 1.C
          "id": "17-1C",
          "title": "1.C.",
          "type": "proof",
          "prompt": `[[equation:17.1]]의 신호 $x_n(t)$의 에너지 $E_n$을 계산하시오.`,
        
          referenceAnswer: `신호 에너지는
$$
E_n
=
\\int_0^T|x_n(t)|^2dt
$$
이다.

[[equation:17.1]]을 대입하면
$$
E_n
=
A^2\\int_0^T
\\cos^2(2\\pi n\\Delta_ft)\\,dt.
$$

$\\cos^2\\theta=(1+\\cos2\\theta)/2$를 사용하면
$$
E_n
=
\\frac{A^2}{2}
\\int_0^T
\\left[
1+\\cos(4\\pi n\\Delta_ft)
\\right]dt.
$$

두 번째 항은 $[0,T]$에서 적분값이 0이므로
$$
\\boxed{
E_n=\\frac{A^2T}{2}
}
$$
이다.`},
        { //문제 1.D
          "id": "17-1D",
          "title": "1.D.",
          "type": "proof",
          "prompt": `[[equation:17.1]]에 정의된 $x_n(t)$에서, $t=[0, T]$에서 정의된 또 하나의 신호 집합 $\\psi_n(t)=\\dfrac{x_n(t)}{\\sqrt{E_n}}(n=1,2,3,\\cdots)$이 정규 직교(Ortho-normal) 신호 집합임을 보이시오.`,
        
          referenceAnswer: `문제 1.C에서
$$
E_n=\\frac{A^2T}{2}
$$
이므로
$$
\\psi_n(t)
=
\\frac{x_n(t)}{\\sqrt{E_n}}
=
\\sqrt{\\frac{2}{T}}
\\cos(2\\pi n\\Delta_ft)
$$
이다.

먼저 각 신호의 에너지는
$$
\\int_0^T|\\psi_n(t)|^2dt
=
\\frac{1}{E_n}
\\int_0^T|x_n(t)|^2dt
=1.
$$

또한 $n\\ne m$이면 문제 1.B에서
$$
\\int_0^T x_n(t)x_m(t)dt=0
$$
이므로
$$
\\int_0^T\\psi_n(t)\\psi_m(t)dt
=
\\frac{1}{\\sqrt{E_nE_m}}
\\int_0^Tx_n(t)x_m(t)dt
=0.
$$

따라서
$$
\\boxed{
\\int_0^T\\psi_n(t)\\psi_m(t)dt
=
\\begin{cases}
1,&n=m\\\\
0,&n\\ne m
\\end{cases}
}
$$
이므로 $\\{\\psi_n(t)\\}$는 정규 직교 신호 집합이다.`},
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
        
          referenceAnswer: `$A=1$, $T=1$이면
$$
\\Delta_f=1
$$
이고,
$$
E_n=\\frac12.
$$

따라서
$$
\\psi_n(t)
=
\\frac{\\cos(2\\pi nt)}{\\sqrt{1/2}}
=
\\sqrt2\\cos(2\\pi nt).
$$

즉,
$$
\\boxed{
\\psi_1(t)=\\sqrt2\\cos(2\\pi t)
}
$$
$$
\\boxed{
\\psi_2(t)=\\sqrt2\\cos(4\\pi t)
}
$$
$$
\\boxed{
\\psi_3(t)=\\sqrt2\\cos(6\\pi t)
}
$$
이다.`},
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
        
          referenceAnswer: `비트열을 3비트씩 나누면
$$
010\\;001\\;110\\;011\\;010\\;100\\;101\\;010\\;111\\;010\\cdots
$$
이다.

<표 17.1>의 매핑을 적용하면
$$
010\\to s_3,\\quad
001\\to s_2,\\quad
110\\to s_7,\\quad
011\\to s_4,
$$
$$
010\\to s_3,\\quad
100\\to s_5,\\quad
101\\to s_6,\\quad
010\\to s_3,\\quad
111\\to s_8,\\quad
010\\to s_3.
$$

따라서 신호 배열은
$$
\\boxed{
s_3(t),\\,s_2(t),\\,s_7(t),\\,s_4(t),\\,s_3(t),\\,s_5(t),\\,s_6(t),\\,s_3(t),\\,s_8(t),\\,s_3(t),\\cdots
}
$$
이다.`},
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
        ,
          referenceAnswer: `<표 17.1>의 $\\psi_1,\\psi_2,\\psi_3$ 계수를 그대로 좌표로 사용하면 된다.

$$
\\boxed{
\\mathbf{s}_1=(-2,-1,-5)
}
$$
$$
\\boxed{
\\mathbf{s}_2=(1,-2,-3)
}
$$
$$
\\boxed{
\\mathbf{s}_3=(0.5,4,2)
}
$$
$$
\\boxed{
\\mathbf{s}_4=(3,-1,-1)
}
$$
$$
\\boxed{
\\mathbf{s}_5=(-1,-4,3)
}
$$
$$
\\boxed{
\\mathbf{s}_6=(1,3,-0.5)
}
$$
$$
\\boxed{
\\mathbf{s}_7=(-1,-6,3)
}
$$
$$
\\boxed{
\\mathbf{s}_8=(-2,-3,1)
}
$$
이다.`},
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
        ,
          referenceAnswer: `(a) 정규 직교 기저에 대한 좌표는 내적으로 구하므로
$$
\\boxed{
Z_k=\\int_0^T r(t)\\psi_k(t)dt,\\qquad k=1,2,\\ldots,N
}
$$
이다.

따라서
$$
Z_1=\\int_0^Tr(t)\\psi_1(t)dt,\\quad
Z_2=\\int_0^Tr(t)\\psi_2(t)dt,\\quad\\cdots
$$
이다.

(b) 본 문제에서는 $T=1$이고
$$
r(t)=\\cos(1.532\\pi t),
$$
$$
\\psi_1(t)=\\sqrt2\\cos(2\\pi t),\\quad
\\psi_2(t)=\\sqrt2\\cos(4\\pi t),\\quad
\\psi_3(t)=\\sqrt2\\cos(6\\pi t)
$$
이다.

직접 적분하면 대략
$$
\\boxed{
Z_1\\approx0.4151,\\quad
Z_2\\approx0.0503,\\quad
Z_3\\approx0.0204
}
$$
이다.

따라서
$$
\\boxed{
\\mathbf Z\\approx(0.4151,\\;0.0503,\\;0.0204)
}
$$
이다.

(c) 노이즈가 없고 $r(t)=s_i(t)$이면
$$
s_i(t)=\\sum_{k=1}^{3}s_{ik}\\psi_k(t)
$$
이므로
$$
Z_m
=
\\int_0^Ts_i(t)\\psi_m(t)dt
=
\\sum_{k=1}^{3}s_{ik}
\\int_0^T\\psi_k(t)\\psi_m(t)dt.
$$

정규직교성에 의해
$$
\\int_0^T\\psi_k(t)\\psi_m(t)dt
=
\\delta_{km}
$$
이므로
$$
Z_m=s_{im}.
$$

따라서
$$
\\boxed{\\mathbf Z=\\mathbf s_i}
$$
가 된다.`},
        {
          "id": "17-2C3",
          "title": "2.C3.",
          "type": "essay",
          "prompt": `벡터 공간에서 $r(t)$와 $s_i(t)(i=1,2,3,\\cdots,8)$ 사이의 유클리드 거리를 계산하시오. (모든 $i=1,2,3,\\cdots,8$ 에 대해 각각 구할 것)`
        ,
          referenceAnswer: `문제 2.C2에서
$$
\\mathbf Z\\approx(0.4151,\\;0.0503,\\;0.0204)
$$
이다.

각 후보와의 유클리드 거리의 제곱은
$$
d_i^2=\\|\\mathbf Z-\\mathbf s_i\\|^2
$$
로 계산한다.

계산하면 대략
$$
d_1^2\\approx32.14,\\quad
d_2^2\\approx13.67,\\quad
d_3^2\\approx19.53,\\quad
d_4^2\\approx8.83,
$$
$$
d_5^2\\approx27.29,\\quad
d_6^2\\approx9.31,\\quad
d_7^2\\approx47.49,\\quad
d_8^2\\approx16.10.
$$

따라서 실제 유클리드 거리는
$$
d_1\\approx5.67,\\;
d_2\\approx3.70,\\;
d_3\\approx4.42,\\;
d_4\\approx2.97,
$$
$$
d_5\\approx5.22,\\;
d_6\\approx3.05,\\;
d_7\\approx6.89,\\;
d_8\\approx4.01.
$$

가장 작은 값은 $d_4$이다.`},
        {
          "id": "17-2C4",
          "title": "2.C4.",
          "type": "essay",
          "prompt": `(a) 신호 $s_i(t)(i=1,2,3,\\cdots,8)$ 중에서 $r(t)$와 가장 가까운 것은 무엇인가?
(b) (a)의 답으로부터, 송신된 3개의 비트를 추정하시오.`
        ,
          referenceAnswer: `(a) 문제 2.C3의 결과에서 가장 작은 유클리드 거리를 갖는 후보는
$$
\\boxed{s_4(t)}
$$
이다.

(b) <표 17.1>에서
$$
s_4(t)\\leftrightarrow011
$$
이므로 추정한 송신 비트는
$$
\\boxed{011}
$$
이다.`},
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
        ,
          referenceAnswer: `이번에는
$$
r(t)=\\cos(4.53\\pi t)
$$
를 사용한다.

기저함수와의 내적을 계산하면 대략
$$
\\boxed{
Z_1\\approx0.1229,\\quad
Z_2\\approx0.4491,\\quad
Z_3\\approx-0.1312
}
$$
이다.

즉,
$$
\\mathbf Z\\approx(0.1229,0.4491,-0.1312).
$$

각 후보와의 거리 제곱은 대략
$$
d_1^2\\approx30.31,\\quad
d_2^2\\approx15.00,\\quad
d_3^2\\approx17.29,\\quad
d_4^2\\approx11.13,
$$
$$
d_5^2\\approx30.86,\\quad
d_6^2\\approx7.41,\\quad
d_7^2\\approx52.66,\\quad
d_8^2\\approx17.68.
$$

가장 가까운 신호는
$$
\\boxed{s_6(t)}
$$
이고, <표 17.1>에서 $s_6(t)$는
$$
\\boxed{101}
$$
에 대응한다.`},
      ]
    },
    { //문제 3
      "id": "17-3",
      "title": "3. 벡터 공간에서 ML 검출 실험",
      "problems": [
        { //문제 3.A
          "id": "17-3A",
          "title": "3.A.",
          "type": "python",
          "prompt": `아래 py 스크립트는 [[equation:17.2]]에서 유도한 $\\psi_2(t)$의 Python 샘플 벡터 ‘p2t’를 생성하기 위해 작성된 것이다. 아래 py 스크립트에서는, $x_2(t)$의 에너지를 수치적분([[link:/workbook/ch2?p=2-1A1|2장의 문제 1]] 참고)을 이용해 계산한다.
\`\`\`python      
import numpy as np

Ts=1
tstep=Ts/10000
tvector=np.arange(0,Ts,tstep)

Delta_f=1/Ts
f2=2*Delta_f

x2t=np.cos(2*np.pi*f2*tvector)
E2=sum(x2t**2)*tstep # 수치적분(2장의 문제 1 참고)
p2t=x2t/np.sqrt(E2) # ψ_2(t)의 샘플 벡터 
\`\`\` 
라인 7~12에 대해 다음의 지침에 따라 주석(Comment)을 작성하시오.

(지침 1) '='이 있는 라인
  - '=' 왼쪽 변수의 목적(용도)을 설명하시오.
  - '=' 오른쪽 수식이 왜 해당 변수의 의미에 부합하는지 설명하시오.
(지침 2) '='이 없는 라인
  - 명령어의 기능을 설명하시오.
  - 왜 해당 명령을 수행하는지 설명하시오.

(참고. ‘신호를 Python 샘플 벡터로 생성한다’라고 할 때, ‘벡터’는 단순히 ‘신호 파형을 일정한 간격으로 샘플링하여 Python의 벡터 변수로 만든다’라는 의미임. ‘신호를 벡터 스페이스의 한 점으로 옮긴다(매핑한다)’라고 할 때의 ‘벡터’와 다른 의미임을 주의할 것)
        `,
        
          referenceAnswer: `주석 예시는 다음과 같다.

\`\`\`python
Ts=1
# 한 심벌의 시간 길이를 1초로 설정한다.

tstep=Ts/10000
# [0,Ts] 구간을 충분히 촘촘하게 샘플링하기 위한 시간 간격을 설정한다.

tvector=np.arange(0,Ts,tstep)
# ψ_2(t)를 Python 샘플 벡터로 만들기 위한 시간축 벡터를 생성한다.

Delta_f=1/Ts
# 식 (17.1)의 직교 주파수 간격 Δf=1/Ts를 계산한다.

f2=2*Delta_f
# 두 번째 기저 신호 x_2(t)의 주파수 2Δf를 설정한다.

x2t=np.cos(2*np.pi*f2*tvector)
# x_2(t)=cos(2πf_2t)를 샘플링하여 Python 벡터 x2t를 생성한다.

E2=sum(x2t**2)*tstep
# ∫|x_2(t)|²dt를 수치적분하여 x_2(t)의 에너지를 계산한다.

p2t=x2t/np.sqrt(E2)
# x_2(t)를 √E2로 나누어 에너지가 1인 정규화 기저 신호 ψ_2(t)를 만든다.
\`\`\``},
        { //문제 3.B
          "id": "17-3B",
          "title": "3.B.",
          "prompt": `문제 2.C1~2.C4를 수행하는 py 스크립트를, 아래를 참고하여 작성해보자. 신호의 에너지를 계산하거나 수신 신호를 벡터 공간의 한 좌표로 매핑([[equation:17.6]] 참고)하기 위한 적분은 수치적분([[link:/workbook/ch2?p=2-1A1|2장의 문제 1]] 참고)으로 구현하시오. ‘rt’는 수신 신호 $r(t)$의 Python 샘플 벡터로 생성하시오. ‘p1t’, ‘p2t’, ‘p3t’는 각각 $\\psi_1(t)$, $\\psi_2(t)$, $\\psi_3(t)$에 해당하는 Python 샘플 벡터로 생성하시오.
\`\`\`python      
import numpy as np

Ts=1
tstep=Ts/10000
tvector=np.arange(0,Ts,tstep)

Delta_f=1/Ts
f2=2*Delta_f

x2t=np.cos(2*np.pi*f2*tvector)
E2=sum(x2t**2)*tstep # 수치적분(2장의 문제 1 참고)
p2t=x2t/np.sqrt(E2) # ψ_2(t)의 샘플 벡터 

# 신호 샘플 벡터 p1t 생성 (= ψ_1(t)의 샘플 벡터)
x1t=?
E1=?
p1t=?
# 신호 샘플 벡터 p3t 생성 (= ψ_3(t)의 샘플 벡터)
x3t=?
E3=?
p3t=?

# 신호 샘플 벡터 rt 생성
rt=np.cos(?) # (식 17.3)

# (식 17.4)에서 구한 각각의 8-ary 신호의 벡터 공간 좌표 생성.
s1t_in_vector_space=np.array([?,?,?]) #=s_1
s2t_in_vector_space=np.array([?,?,?])
...
s8t_in_vector_space=np.array([?,?,?])

# (식 17.6)에 나타낸 적분 계산을 수치적분(2장의 문제 1 참고)으로 구현.
Z1=sum(????)*tstep
Z2=???
Z3=???
rt_in_vector_space=np.array([?,?,?]) # = (식 17.5)의 Z

# 문제 2.C3에서 수행한 계산을 Python으로 구현.
ED_rt_s1t=sum(abs(?-?)**2) # 벡터 공간에서 rt와 s1t의 유클리드 거리의 제곱

# 위와 같은 방법으로 ED_rt_s2t~ED_rt_s8t 계산
ED_rt_s2t=sum(abs(?-?)**2)
...
ED_rt_s8t=sum(abs(?-?)**2)

# 문제 2.C4에서 수행한 계산을 Python으로 구현.
T=np.argmin(np.array([ED_rt_s1t,?,?,...,ED_rt_s8t]))
print(T+1) #Python 배열의 인덱스는 0부터 시작하므로, 1을 더해야 함에 유의.
\`\`\``,
        },
        {
          "id": "17-3B1",
          "title": "3.B1.",
          "type": "python",
          responseEnabled: true,
          starterCode: `import numpy as np

Ts=1
tstep=Ts/10000
tvector=np.arange(0,Ts,tstep)

Delta_f=1/Ts
f2=2*Delta_f

x2t=np.cos(2*np.pi*f2*tvector)
E2=sum(x2t**2)*tstep # 수치적분(2장의 문제 1 참고)
p2t=x2t/np.sqrt(E2) # ψ_2(t)의 샘플 벡터 

# 신호 샘플 벡터 p1t 생성 (= ψ_1(t)의 샘플 벡터)
x1t=?
E1=?
p1t=?
# 신호 샘플 벡터 p3t 생성 (= ψ_3(t)의 샘플 벡터)
x3t=?
E3=?
p3t=?

# 신호 샘플 벡터 rt 생성
rt=np.cos(?) # (식 17.3)

# (식 17.4)에서 구한 각각의 8-ary 신호의 벡터 공간 좌표 생성.
s1t_in_vector_space=np.array([?,?,?]) #=s_1
s2t_in_vector_space=np.array([?,?,?])
...
s8t_in_vector_space=np.array([?,?,?])

# (식 17.6)에 나타낸 적분 계산을 수치적분(2장의 문제 1 참고)으로 구현.
Z1=sum(????)*tstep
Z2=???
Z3=???
rt_in_vector_space=np.array([?,?,?]) # = (식 17.5)의 Z

# 문제 2.C3에서 수행한 계산을 Python으로 구현.
ED_rt_s1t=sum(abs(?-?)**2) # 벡터 공간에서 rt와 s1t의 유클리드 거리의 제곱

# 위와 같은 방법으로 ED_rt_s2t~ED_rt_s8t 계산
ED_rt_s2t=sum(abs(?-?)**2)
...
ED_rt_s8t=sum(abs(?-?)**2)

# 문제 2.C4에서 수행한 계산을 Python으로 구현.
T=np.argmin(np.array([ED_rt_s1t,?,?,...,ED_rt_s8t]))
print(T+1) #Python 배열의 인덱스는 0부터 시작하므로, 1을 더해야 함에 유의.`,
          "prompt": `주석을 참고하여 위 py 스크립트 파일를 완성하고 수행하시오. 수행 결과를 바탕으로 아래 물음에 답하시오.

(a) 수행 결과 ‘T’ 값을 쓰시오.
(b) (a)의 결과에 따른 ML 검출 결과(추정한 3개의 데이터 비트)를 쓰시오.
(c) 수행 결과가 문제 2.C4의 결과가 같은지 확인하시오.
(d) 수신 신호 $r(t)$를 [[equation:17.7]]로 수정하자. 위 py 스크립트를 수정하고, (a)~(c)를 반복하시오.`,
          referenceAnswer: `완성 예시는 다음과 같다.

\`\`\`python
import numpy as np

Ts=1
tstep=Ts/10000
tvector=np.arange(0,Ts,tstep)

Delta_f=1/Ts

# 정규 직교 기저 ψ1, ψ2, ψ3 생성
x1t=np.cos(2*np.pi*1*Delta_f*tvector)
E1=sum(x1t**2)*tstep
p1t=x1t/np.sqrt(E1)

x2t=np.cos(2*np.pi*2*Delta_f*tvector)
E2=sum(x2t**2)*tstep
p2t=x2t/np.sqrt(E2)

x3t=np.cos(2*np.pi*3*Delta_f*tvector)
E3=sum(x3t**2)*tstep
p3t=x3t/np.sqrt(E3)

# 8-ary 신호의 벡터 공간 좌표
s1=np.array([-2,-1,-5])
s2=np.array([1,-2,-3])
s3=np.array([0.5,4,2])
s4=np.array([3,-1,-1])
s5=np.array([-1,-4,3])
s6=np.array([1,3,-0.5])
s7=np.array([-1,-6,3])
s8=np.array([-2,-3,1])

S=[s1,s2,s3,s4,s5,s6,s7,s8]

# ----------------------------
# (식 17.3)
# ----------------------------
rt=np.cos(1.532*np.pi*tvector)

Z1=sum(rt*p1t)*tstep
Z2=sum(rt*p2t)*tstep
Z3=sum(rt*p3t)*tstep

rt_in_vector_space=np.array([Z1,Z2,Z3])

ED=[
    sum(abs(rt_in_vector_space-si)**2)
    for si in S
]

T=np.argmin(np.array(ED))
print("Z =", rt_in_vector_space)
print("T =", T+1)

# ----------------------------
# (식 17.7)을 확인하려면 위 rt만 다음과 같이 변경
# rt=np.cos(4.53*np.pi*tvector)
# ----------------------------
\`\`\`

[[equation:17.3]]에서는
$$
\\mathbf Z\\approx(0.4151,\\;0.0503,\\;0.0204)
$$
이고
$$
\\boxed{T=4}
$$
가 출력된다. 따라서 검출 신호는 $s_4(t)$이고 추정 비트는
$$
\\boxed{011}
$$
이다.

[[equation:17.7]]로 바꾸면
$$
\\mathbf Z\\approx(0.1229,\\;0.4491,\\;-0.1312)
$$
이고
$$
\\boxed{T=6}
$$
이므로 $s_6(t)$, 즉
$$
\\boxed{101}
$$
로 검출된다.

두 결과 모두 문제 2.C4와 2.C5의 계산 결과와 일치한다.

※ 기존 답안처럼 \`rt_in_vector_space\`에 좌표값을 직접 입력하지 말고, 실제로 계산한 \`Z1\`, \`Z2\`, \`Z3\`를 사용하는 것이 맞다.`,
        },
        {
          "id": "17-3B2",
          "title": "3.B2.",
          "type": "essay",
          "prompt": `위 py 스크립트는 벡터 공간에서 수신 신호와 송신 후보 신호 간의 유클리드 거리의 제곱을 구한 것이다.

(a) 유클리드 거리를 사용하지 않고, 유클리드 거리의 제곱을 사용해도 ML 검출 과정에 무방한 이유를 쓰시오.
(b) 코드 구현의 측면에서, 유클리드 거리가 아닌 유클리드 거리의 제곱을 사용함으로써 얻는 이점들은 무엇인가?`
        ,
          referenceAnswer: `(a) 유클리드 거리 $d$는 항상 $d\\ge0$이고, 제곱 함수 $d^2$는 $d\\ge0$에서 단조 증가한다.

따라서
$$
d_i<d_j
\\quad\\Longleftrightarrow\\quad
d_i^2<d_j^2
$$
이므로 가장 가까운 신호를 찾는 결과는 동일하다.

(b) 거리의 제곱을 사용하면

- 제곱근 연산이 필요하지 않아 계산량이 줄어든다.
- 코드가 더 단순해진다.
- 많은 후보 신호를 반복 비교할 때 연산 효율이 좋아진다.

따라서 ML 판별에서는 유클리드 거리 대신 거리의 제곱을 비교하는 것이 일반적으로 더 효율적이다.`}
      ]
    },
    {
      "id": "17-4",
      "title": "4. 벡터 공간에서 ML 검출 실험",
      "problems": [
        { //문제 4.A
          "id": "17-4A",
          "title": "4.A.",
          "type": "python",
          starterCode: `import numpy as np

Ts=1
tstep=Ts/10000
tvector=np.arange(0,Ts,tstep)

Delta_f=1/Ts
f2=2*Delta_f

x2t=np.cos(2*np.pi*f2*tvector)
E2=sum(x2t**2)*tstep
p2t=x2t/np.sqrt(E2)

# 신호 샘플 벡터 p1t 생성 (= ψ_1(t)의 샘플 벡터)
x1t=?
E1=?
p1t=?
# 신호 샘플 벡터 p3t 생성 (= ψ_3(t)의 샘플 벡터)
x3t=?
E3=?
p3t=?

# s1t(=s_1(t)의 샘플 벡터), s2t, ..., s8t 생성
# 예를 들어, 벡터 s1t는 아래와 같이 생성
s1t=?*p1t+?*p2t+?*p3t # <표 17.1> 참고
s2t=?
...
s8t=?`,
          "prompt": `$r(t)$와 $s_i(t)$ 사이의 차이 에너지는 [[equation:17.8]]과 같이 계산할 수 있다.
$$
E_{r(t)-s_i(t)}=\\int_{0}^{T}\\left| r(t)-s_i(t) \\right|^2\\,dt
\\qquad \\text{(식 17.8)}
$$
본 문제에서는, 두 신호의 차이 에너지를 계산하는 Python 코드를 작성해보자. [[equation:17.3]]과 [[equation:17.7]]에 주어진 두 수신 신호 $r(t)$의 예시에 대해 ML 검출을 수행하자.

아래를 참고하여 <표 17.1>의 에 해당하는 Python 샘플 벡터 ‘s1t’, ‘s2t’, ‘s3t’, …, ‘s8t’를 생성하는 py 스크립트를 작성하시오. 주석을 참고하여 py 스크립트를 완성하시오.
\`\`\`python      
import numpy as np

Ts=1
tstep=Ts/10000
tvector=np.arange(0,Ts,tstep)

Delta_f=1/Ts
f2=2*Delta_f

x2t=np.cos(2*np.pi*f2*tvector)
E2=sum(x2t**2)*tstep
p2t=x2t/np.sqrt(E2)

# 신호 샘플 벡터 p1t 생성 (= ψ_1(t)의 샘플 벡터)
x1t=?
E1=?
p1t=?
# 신호 샘플 벡터 p3t 생성 (= ψ_3(t)의 샘플 벡터)
x3t=?
E3=?
p3t=?

# s1t(=s_1(t)의 샘플 벡터), s2t, ..., s8t 생성
# 예를 들어, 벡터 s1t는 아래와 같이 생성
s1t=?*p1t+?*p2t+?*p3t # <표 17.1> 참고
s2t=?
...
s8t=?
\`\`\`
`,
          referenceAnswer: `\`\`\`python      
import numpy as np

Ts=1
tstep=Ts/10000
tvector=np.arange(0,Ts,tstep)

Delta_f=1/Ts
f2=2*Delta_f

x2t=np.cos(2*np.pi*f2*tvector)
E2=sum(x2t**2)*tstep
p2t=x2t/np.sqrt(E2)

# 신호 샘플 벡터 p1t 생성 (= ψ_1(t)의 샘플 벡터)
x1t=np.cos(2*np.pi*Delta_f*tvector)
E1=sum(x1t**2)*tstep
p1t=x1t/np.sqrt(E1)
# 신호 샘플 벡터 p3t 생성 (= ψ_3(t)의 샘플 벡터)
x3t=np.cos(2*np.pi*3*Delta_f*tvector)
E3=sum(x3t**2)*tstep
p3t=x3t/np.sqrt(E3)

# s1t(=s_1(t)의 샘플 벡터), s2t, ..., s8t 생성
# 예를 들어, 벡터 s1t는 아래와 같이 생성
s1t=-2*p1t-p2t-5*p3t
s2t=p1t-2*p2t-3*p3t
s3t=0.5*p1t+4*p2t+2*p3t
s4t=3*p1t-p2t-p3t
s5t=-p1t-4*p2t+3*p3t
s6t=p1t+3*p2t-0.5*p3t
s7t=-p1t-6*p2t+3*p3t
s8t=-2*p1t-3*p2t+p3t
\`\`\`
`
        },
        { //문제 4.B
          "id": "17-4B",
          "title": "4.B.",
          "type": "python",
          starterCode: `import numpy as np

Ts=1
tstep=Ts/10000
tvector=np.arange(0,Ts,tstep)

Delta_f=1/Ts
f2=2*Delta_f

x2t=np.cos(2*np.pi*f2*tvector)
E2=sum(x2t**2)*tstep
p2t=x2t/np.sqrt(E2)

# 신호 샘플 벡터 p1t 생성 (= ψ_1(t)의 샘플 벡터)
x1t=?
E1=?
p1t=?
# 신호 샘플 벡터 p3t 생성 (= ψ_3(t)의 샘플 벡터)
x3t=?
E3=?
p3t=?

# s1t(=s_1(t)의 샘플 벡터), s2t, ..., s8t 생성
# 예를 들어, 벡터 s1t는 아래와 같이 생성
s1t=?*p1t+?*p2t+?*p3t # <표 17.1> 참고
s2t=?
...
s8t=?

# 문제 4.A의 py 스크립트 파일에 아래를 추가.
rt=np.cos(?) # (식 17.3) 또는 (식 17.7)
E_rt_s1t=sum(abs(???)**2)*tstep # (식 17.8)을 수치적분으로 구현
...
...
...
E_rt_s8t=sum(????)*tstep`,
          "prompt": `모든 $i=1,2,3,\\cdots,8$에 대해 [[equation:17.8]]을 수치적분으로 계산하기 위해, 문제 4.A의 py 스크립트에 아래를 완성하여 추가하시오.
\`\`\`python      
# 문제 4.A의 py 스크립트 파일에 아래를 추가.
rt=np.cos(?) # (식 17.3) 또는 (식 17.7)
E_rt_s1t=sum(abs(???)**2)*tstep # (식 17.8)을 수치적분으로 구현
...
...
...
E_rt_s8t=sum(????)*tstep
\`\`\`
`,
          referenceAnswer: `[[equation:17.3]]의 경우 다음과 같이 계산한다.

\`\`\`python
rt=np.cos(1.532*np.pi*tvector)

E_rt_s1t=sum(abs(rt-s1t)**2)*tstep
E_rt_s2t=sum(abs(rt-s2t)**2)*tstep
E_rt_s3t=sum(abs(rt-s3t)**2)*tstep
E_rt_s4t=sum(abs(rt-s4t)**2)*tstep
E_rt_s5t=sum(abs(rt-s5t)**2)*tstep
E_rt_s6t=sum(abs(rt-s6t)**2)*tstep
E_rt_s7t=sum(abs(rt-s7t)**2)*tstep
E_rt_s8t=sum(abs(rt-s8t)**2)*tstep
\`\`\`

[[equation:17.7]]을 계산하려면 수신 신호만

\`\`\`python
rt=np.cos(4.53*np.pi*tvector)
\`\`\`

로 바꾸고 동일한 차이 에너지 계산을 반복하면 된다.`
        },
        { //문제 4.C
          "id": "17-4C",
          "title": "4.C.",
          "prompt": `문제 4.B의 py 스크립트를 복사하여 붙여넣은 후, 문제 3.B를 참고하여 함수 ‘np.argmin()’을 사용하여 $B_{r(t)-s_i(t)}$를 최소화하는 $s_i(t)$를 찾는 코드를 추가하시오.
          
이후, 수신 신호가 [[equation:17.3]]과 [[equation:17.7]]에서 주어지는 $r(t)$인 두 경우에 대해, 완성한 py 스크립트를 각각 실행하고, 다음 물음에 답하시오.`,
        
          referenceAnswer: `문제 4.B에서 계산한 차이 에너지를 배열로 만든 뒤 \`np.argmin()\`을 사용하면 된다.

\`\`\`python
E_list=np.array([
    E_rt_s1t,
    E_rt_s2t,
    E_rt_s3t,
    E_rt_s4t,
    E_rt_s5t,
    E_rt_s6t,
    E_rt_s7t,
    E_rt_s8t
])

T=np.argmin(E_list)
print(T+1)
\`\`\`

[[equation:17.3]]의 수신 신호에서는 $s_4(t)$, [[equation:17.7]]의 수신 신호에서는 $s_6(t)$가 선택되어야 한다.`},
        { //문제 4.C1
          "id": "17-4C1",
          "title": "4.C1.",
          "type": "python",
          responseEnabled: true,
          "prompt": `두 경우에 대해 py 스크립트를 실행한 결과, $E_{r(t)-s_i(t)}$를 최소화하는 $s_i(t)$는 각각 무엇인지 쓰시오.`,
          referenceAnswer: `차이 에너지들을 배열로 만든 뒤 \`np.argmin()\`으로 최소값의 후보를 찾는다.

\`\`\`python
E_list=np.array([
    E_rt_s1t,
    E_rt_s2t,
    E_rt_s3t,
    E_rt_s4t,
    E_rt_s5t,
    E_rt_s6t,
    E_rt_s7t,
    E_rt_s8t
])

T=np.argmin(E_list)
print(T+1)
\`\`\`

[[equation:17.3]]
$$
r(t)=\\cos(1.532\\pi t)
$$
를 사용하면
$$
\\boxed{T=4}
$$
이므로
$$
\\boxed{s_4(t)}
$$
가 선택되고, 송신 비트는
$$
\\boxed{011}
$$
로 추정된다.

[[equation:17.7]]
$$
r(t)=\\cos(4.53\\pi t)
$$
로 바꾸면
$$
\\boxed{T=6}
$$
이므로
$$
\\boxed{s_6(t)}
$$
가 선택되고, 송신 비트는
$$
\\boxed{101}
$$
로 추정된다.`
        },
        { 
          "id": "17-4C2",
          "title": "4.C2.",
          "type": "essay",
          "prompt": `문제 4.C1의 답이 문제 3.B1의 (a)와 (d)에서 구한 벡터 공간에서 유클리드 거리를 이용한 방법과 일치하는가?`

        ,
          referenceAnswer: `일치한다.

정규 직교 기저에서는 Parseval 관계에 의해
$$
\\int_0^T|r(t)-s_i(t)|^2dt
=
\\|\\mathbf Z-\\mathbf s_i\\|^2
+
E_{\\perp}
$$
로 볼 수 있고, 모든 후보 $s_i$에 대해 $E_{\\perp}$는 동일하다.

따라서 시간영역의 차이 에너지를 최소화하는 후보와 벡터 공간의 유클리드 거리를 최소화하는 후보는 동일하다.

즉,
- [[equation:17.3]] → $s_4(t)$ → \`011\`
- [[equation:17.7]] → $s_6(t)$ → \`101\`

로 두 방법의 결과가 같다.`},
        { //문제 4.D
          "id": "17-4D",
          "title": "4.D.",
          "type": "essay",
          "prompt": `문제 3.B와 문제 4.C에서 사용한 2개의 py 스크립트 중에서, 더 높은 컴퓨터 연산 복잡도를 요구하는 것은 무엇인가? 그 이유를 쓰시오.`
        ,
          referenceAnswer: `더 높은 연산 복잡도를 요구하는 것은 일반적으로 문제 4.C의 **시간영역 차이 에너지 직접 계산 방식**이다.

문제 3.B에서는 수신 신호를 기저 함수와의 내적으로 한 번 벡터 공간의 좌표 $\\mathbf Z$로 변환한 뒤, 이후에는 3차원 좌표끼리 거리만 계산한다.

반면 문제 4.C에서는 각 후보 $s_i(t)$마다 모든 시간 샘플에 대해
$$
|r(t)-s_i(t)|^2
$$
를 계산하고 적분해야 한다.

샘플 수를 $N_s$, 후보 신호 수를 $M$이라 하면, 시간영역 방식은 대략 $M N_s$에 비례하는 반복 연산이 필요하지만, 벡터 공간 방식은 좌표 변환 이후 후보당 차원 수 $N$만큼만 거리 계산을 하면 된다.

보통
$$
N\\ll N_s
$$
이므로 벡터 공간 방식이 훨씬 효율적이다.`}
      ]
    }
  ]
} as const;
