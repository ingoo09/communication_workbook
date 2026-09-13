import type { WorkbookChapter } from '@/types/workbook';

export const chapter = {
  "id": "16-MLforBT",
  "title": "Chapter 16. Maximum Likelihood(ML) Detection for Binary Transmission",
  "sections": [
    { //문제 1
      "id": "16-1",
      "title": "1. Likelihood 함수와 ML(Maximum Likelihood) 검출 기법",
      "problems": [
        { //문제 1.A
          "id": "16-1A",
          "title": "1.A.",
          "prompt": `채널의 임펄스 응답 $h_c(t)$가 임펄스이고 수신단에서 가우시안 노이즈 성분만 더해지는 채널을 AWGN(Additive White Gaussian Noise) 채널이라고 한다. AWGN 채널에서, 데이터 비트 $d$가 $'1'$일 때 신호 $s_1(t)$를 송신하고 $'0'$일 때 신호 $s_2(t)$를 전송하는 이진 데이터 통신을 고려하자. 이때 수신 신호 $r(t)$는 [[equation:16.1]]과 같이 주어진다.
$$
r(t)=
\\begin{cases}
s_1(t)+n(t), & \\text{if transmitted bit is ‘1’} \\\\
s_2(t)+n(t), & \\text{if transmitted bit is ‘0’}
\\end{cases}
\\qquad \\text{(식 16.1)}
$$
여기서 $n(t)$는 AWGN을 의미한다.

[[image:/images/ch16/figure16_1.png|그림 16.1 디지털 신호의 복조(demodulation)/검출(detection)의 기본적인 두 단계]]          
[그림 16.1]은 디지털 신호의 복조(demodulation)/검출(detection)의 기본적인 두 단계(Step)를 보여준다. Step 1에서는 수신 신호를 기저 대역 신호로 변환하고, 필터링한 후 심벌당 한 번씩 샘플링하여 판별변수(Decision Statistic 또는 Test Statistic)를 생성한다. 수신 필터(등화기 필터는 본 실습에서 고려하지 않음)의 출력을 $z(t)$라 하고 현재 데이터 심벌의 샘플링 지점을 $T$라 하면, $z(T)$가 현재 데이터 심벌의 판별변수가 된다. 필터링된 기저 대역 신호 $z(t)$는 [[equation:16.2]]와 같이 나타낼 수 있다.
$$
z(t)=
\\begin{cases}
a_1(t)+n_0(t), & \\text{for bit = ‘1’} \\\\
a_2(t)+n_0(t), & \\text{for bit = ‘0’}
\\end{cases}
\\qquad \\text{(식 16.2)}
$$
여기서 $a_i(t)(i=1,2)$는 송신 신호 $s_i(t)(i=1,2)$의 필터링된 출력이고, $n_0(t)$는 필터링된 노이즈를 의미한다.

디지털 신호의 복조, 검출 과정의 입력이 하나의 랜덤 변수인 가장 단순한 경우를 생각해보자. 판별변수 $z(T)$를 생성하기 위해 필터링된 기저 대역 신호 $z(t)$를 $t=T$인 순간에 샘플링한다. 단 하나의 송신 신호를 송신하였다고 가정하여 $z(T)$를 편의상 $z$라 표기하자. $z$는 [[equation:16.3]]과 같이 나타낼 수 있다.
$$
z=
\\begin{cases}
a_1+n_0, & \\text{if } s_1(t) \\text{(bit = ‘1’) is transmitted} \\\\
a_2+n_0, & \\text{if } s_2(t) \\text{(bit = ‘0’) is transmitted}
\\end{cases}
\\qquad \\text{(식 16.3)}
$$
여기서 $a_i$는 $a_i(T)$이고, $n_0$는 평균이 0이고 분산이 $\\sigma_0^2$인 가우시안 노이즈 $n_0(T)$를 의미한다.
          `,
        },
        {
          "id": "16-1A1",
          "title": "1.A1.",
          "type": "essay",
          "prompt": `$X$는 $X \\sim N(0, \\sigma^2)$를 따르는 독립 가우시안 확률 변수이고, $Y=aX+b$라면, $Y \\sim N(?, ?)$를 따른다. ?를 채우시오.
(Hint. [[link:/workbook/ch14?p=14-4A|14장 문제 4.A]]를 참고)`,
          "referenceAnswer": `$X \\sim N(0,\\sigma^2)$이고 $Y=aX+b$이므로, 가우시안 확률 변수의 선형변환 성질에 의해
$$
E[Y]=aE[X]+b=b
$$
이고,
$$
\\mathrm{Var}(Y)
=
a^2\\mathrm{Var}(X)
=
a^2\\sigma^2
$$
이다.
따라서,
$$
\\boxed{
Y \\sim N\\left(b,\\,a^2\\sigma^2\\right)
}
$$
이므로 빈칸은 각각 $b$, $a^2\\sigma^2$이다.
`,
        },
        {
          "id": "16-1A2",
          "title": "1.A2.",
          "type": "proof",
          "prompt": `[[equation:16.3]]을 통해 판별변수 $z$는 평균이 송신한 비트에 의해 정해지는 가우시안 랜덤 변수인 것을 알 수 있다. $s_1(t)$(비트=$'1'$)를 송신한 경우의 $z$의 조건부 확률 밀도 함수(PDF)를 $f_{z \\mid s_1}$, $s_2(t)$(비트=$'0'$)를 송신한 경우의 $z$의 조건부 확률 밀도 함수(PDF)를 $f_{z \\mid s_2}$라 하자. $f_{z \\mid s_1}$, $f_{z \\mid s_2}$를 $a_i$와 $\\sigma_0$의 함수로 정확히 표현하시오.`,
        },
        { //문제 1.B
          "id": "16-1B",
          "title": "1.B.",
          "prompt": `[그림 16.1]의 Step 2에서는 송신한 비트가 $'1'$과 $'0'$중 무엇인지 알아내기 위해, Step 1에서 생성한 판별변수 $z$를 바탕으로 송신 심벌(이 문제에서는 비트)을 검출한다. 여러 감출 방식 중에서 ML(Maximum Likelihood) 검출 방식은, $'1'$과 $'0'$이 같은 확률로 전송될 때 BER(Bit Error Rate)을 최소화하는 특성이 있다. $'1'$과 $'0'$을 전송하는 이진 시스템에서, ML 검출 방식은 [[equation:16.4]]와 같이 Likelihood 함수 $\\Lambda(z)$와 $1$을 비교하여 송신 비트가 무엇인지 결정한다.
$$
\\hat{d}=
\\begin{cases}
‘1’, & \\text{if } \\Lambda(z)>1 \\\\
‘0’, & \\text{if } \\Lambda(z)<1
\\end{cases}
\\qquad \\text{where} \\quad
\\Lambda(z)=\\frac{\\Pr(s_1 \\mid z)}{\\Pr(s_2 \\mid z)}
\\qquad \\text{(식 16.4)}
$$
여기서 $\\hat{d}$은 수신 단에서 검출한 송신 비트를 의미한다. 또한, Likelihood 함수 $\\Lambda(z)$는, 판별변수가 $z$인 조건에서 송신된 신호가 $s_1(t)$이었을 조건부 확률과 $s_2(t)$이었을 조건부 확률의 비(Ratio)로 정의된다. [[equation:16.4]]는 Bayesian 정리를 이용하여, [[equation:16.5]]와 같이 나타낼 수 있다.
$$
\\Lambda(z)
\\left(
=
\\frac{\\Pr(s_1 \\mid z)}{\\Pr(s_2 \\mid z)}
\\right)
=
\\frac{f_{z \\mid s_1}(z) \\Pr(s_1)}{f_{z \\mid s_2}(z) \\Pr(s_2)}
\\qquad
\\text{(식 16.5)}
$$
여기서 $\\Pr(s_1)$과 $\\Pr(s_2)$는 이진 데이터 $'1'$과 $'0'$의 값에 각각 해당하는 $s_1$, $s_2$의 사전 확률(Prior Probabilities)이다. 그리고, $f_{z \\mid s_1}(z)$는 $s_1(t)$를 송신했을 때, $z$의 조건부 PDF이고, $f_{z \\mid s_2}(z)$는 $s_2(t)$를 송신했을 때, $z$의 조건부 PDF이다.
          `
        },
        {
          "id": "16-1B1",
          "title": "1.B1.",
          "type": "proof",
          "prompt": `[[equation:16.5]]가 성립함을 수식으로 유도하여 보이시오.`,  
        },
        {
          "id": "16-1B2",
          "title": "1.B2.",
          "type": "proof",
          "prompt": `일반적인 이진 시스템에서 데이터 비트가 $'1'$일 확률과 $'0'$일 확률은 같다. 즉, $\\Pr(s_1)=\\Pr(s_2)=0.5$이다. 이때, [[equation:16.5]]의 Likelihood 함수는 [[equation:16.6]]과 같이 정리할 수 있다.
$$
\\Lambda(z)
=
\\frac{f_{z \\mid s_1}(z)}{f_{z \\mid s_2}(z)}
\\qquad
\\text{(식 16.6)}
$$
문제 1.A2에서 유도한 $f_{z \\mid s_1}(z)$와 $f_{z \\mid s_2}(z)$를 [[equation:16.6]]에 대입하면, $\\Lambda(z)$는 [[equation:16.7]]과 같이 $a_1$, $a_2$, $\\sigma_0$의 함수로 나타낼 수 있다. 유도과정을 보이시오.
$$
\\Lambda(z)
=
\\exp\\left(
-\\frac{a_1^2-a_2^2}{2\\sigma_0^2}
+
\\frac{z(a_1-a_2)}{\\sigma_0^2}
\\right)
\\qquad
\\text{(식 16.7)}
$$
          `,  
        },        
        {
          "id": "16-1B3",
          "title": "1.B3.",
          "type": "proof",
          "prompt": `이진 데이터가 같은 확률로 발생하는 경우, [[equation:16.4]]와 [[equation:16.6]]을 이용하여 ML 검출 규칙이 [[equation:16.8]]의 판별 규칙과 같음을 보이시오.
$$
\\hat{d}=
\\begin{cases}
‘1’, & \\text{if } f_{z \\mid s_1}(z) > f_{z \\mid s_2}(z) \\\\
‘0’, & \\text{if } f_{z \\mid s_2}(z) > f_{z \\mid s_1}(z)
\\end{cases}
\\qquad \\text{(식 16.8)}
$$
          `
        },
        { //문제 1.C
          "id": "16-1C",
          "title": "1.C.",
          "prompt": `$a_1>a_2$인 경우를 가정해보자. [[equation:16.7]]을 [[equation:16.4]]에 대입하여 정리하면, 송신 비트를 $'1'$로 판별하는 영역과 $'0'$으로 판별하는 영역 즉, $z$의 두 판별 영역(Decision Region)을 유도할 수 있다.
$$
\\hat{d}=
\\begin{cases}
‘1’, & \\text{if } z > \\dfrac{a_1+a_2}{2} \\\\
‘0’, & \\text{if } z < \\dfrac{a_1+a_2}{2}
\\end{cases}
\\qquad \\text{(식 16.9)}
$$          
          `
        },
        {
          "id": "16-1C1",
          "title": "1.C1.",
          "type": "proof",
          "prompt": `[[equation:16.7]]을 [[equation:16.4]]에 대입하여 [[equation:16.9]]를 유도하시오.`
        },
        {
          "id": "16-1C2",
          "title": "1.C2.",
          "type": "essay",
          "prompt": `아래와 같이, [[equation:16.9]]의 두 판별 영역을 정리할 수 있다. 두 판별 영역 $R_1$과 $R_2$의 범위를 정의하시오.

- $z$가 $R_1$ 지역에 속한다면($z \\in R_1$), $'1'$을 송신한 것으로 판단
- $z$가 $R_2$ 지역에 속한다면($z \\in R_2$), $'0'$을 송신한 것으로 판단`
        },
        {
          "id": "16-1C3",
          "title": "1.C3.",
          "type": "essay",
          "prompt": `[[equation:16.9]]로부터, AWGN 채널에서 수신된 Binary 신호의 ML(BER을 최소화하는) 검출 기법이란, 결국 $z$값을 어떤 상숫값과 비교하여 송신 심벌을 추정하는 것이다. 그 값을 쓰시오.`
        },
        { //문제 1.D
          "id": "16-1D",
          "title": "1.D.",
          "prompt": `[[equation:16.9]]에 따른 검출 법칙에 따라 심벌 판정을 했을 때 판단 결과가 실제 송신 비트와 일치하지 않을 확률 즉, BER(Bit Error Rate)을 구해보자.`
        },
        {
          "id": "16-1D1",
          "title": "1.D1.",
          "type": "proof",
          "prompt": `[[equation:16.9]]를 참고하여 아래 문장의 네모 부분에 들어갈 알맞은 값(수식) 또는 단어를 넣어 문장을 완성하시오.
‘데이터 비트 $'1'$을 송신한 경우, $\\boxed{\\text{문제 1.C3의 답}}$보다 $\\boxed{\\text{큰 / 작은}}$ 경우에 비트 에러($\\hat{d}=0$)가 발생한다.’

다음으로, 문제 1.A에서 구한 $z$의 PDF $f_{z \\mid s_1}(z)$를 이용하여, 데이터 비트 $'1'$을 송신한 경우의 비트 판별이 잘못될 확률을 [[equation:16.10]]과 같이 Q-function으로 나타낼 수 있음을 보이시오. (가우시안 PDF와 Q-function의 관계는 [[link:/workbook/ch15?p=15-1A|15장의 문제 1.A]]를 참고할 것)
$$
\\text{‘1’을 전송한 경우의 BER}
=
\\Pr(\\hat{d}=0 \\mid s_1)
=Q\\left(
\\frac{a_1-a_2}{2\\sigma_0}
\\right)
\\qquad \\text{(식 16.10)}
$$ 
`
        },
        {
          "id": "16-1D2",
          "title": "1.D2.",
          "type": "proof",
          "prompt": `문제 1.D1과 같은 과정을 통해, 송신 데이터 비트가 $'0'$일 때 BER 또한 $Q\\left(\\dfrac{a_1-a_2}{2\\sigma_0}\\right)$임을 보이시오.`
        },
        {
          "id": "16-1D3",
          "title": "1.D3.",
          "type": "proof",
          "prompt": `$\\Pr(s_1)=\\Pr(s_2)=0.5$이면, 이진 데이터 전송 시스템의 평균 BER은 [[equation:16.11]]과 같음을 보이시오.
$$
p_b
=Q\\left(
\\frac{a_1-a_2}{2\\sigma_0}
\\right)
\\qquad \\text{(식 16.11)}
$$           
          `
        },
        { //문제 1.E
          "id": "16-1E",
          "title": "1.E.",
          "prompt": `[[equation:16.11]]의 BER 공식과 Python의 함수 ‘erfc()’를 이용하여, 아래의 변수에 따른 BER을 구하시오.

(주의. 함수 ‘erfc()’를 사용하기 위해, ‘from scipy.special import erfc’를 먼저 실행해야 함을 잊지말 것)`
        },
        {
          "id": "16-1E1",
          "title": "1.E1.",
          "type": "console",
          "prompt": `$a_1=8, a_2=-8, \\sigma_0^2=4$`,        
        },
        {
          "id": "16-1E2",
          "title": "1.E2.",
          "type": "console",
          "prompt": `$a_1=2, a_2=-2, \\sigma_0^2=0.25$`,       
        },
        {
          "id": "16-1E3",
          "title": "1.E3.",
          "type": "console",
          "prompt": `$a_1=1, a_2=-1, \\sigma_0^2=0.5$`,         
        },
        {
          "id": "16-1E4",
          "title": "1.E4.",
          "type": "console",
          "prompt": `$a_1=4, a_2=0, \\sigma_0^2=0.25$`,
        },
        {
          "id": "16-1E5",
          "title": "1.E5.",
          "type": "console",
          "prompt": `$a_1=10, a_2=-6, \\sigma_0^2=4$`, 
        },
        { //문제 1.F
          "id": "16-1F",
          "title": "1.F.",
          "prompt": `문제 1.E의 결과를 바탕으로, 다음 물음에 답하시오.`
        },
        {
          "id": "16-1F1",
          "title": "1.F1.",
          "type": "essay",
          "prompt": `문제 1.E의 5가지 경우의 BER을 비교하여, 같은 BER을 갖는 경우는 어떤 것인지 쓰시오.`, 
        },
        {
          "id": "16-1F2",
          "title": "1.F2.",
          "type": "essay",
          "prompt": `[[equation:16.11]]의 BER 공식으로부터, 같은 BER을 같기 위한 $a_1$, $a_2$, $\\sigma_0^2$의 관계식을 쓰시오. (문제 1.E의 결과로부터 유추해도 되고, 수식으로 유도해도 무방)`, 
        },
        {
          "id": "16-1F3",
          "title": "1.F3.",
          "type": "essay",
          "prompt": `문제 1.F1과 문제 1.F2의 결과가 서로 일치하는가?`, 
        },
        { //문제 1.G
          "id": "16-1G",
          "title": "1.G.",
          "type": "proof",
          "prompt": `$a_1^2+a_2^2$은 신호 성분의 에너지를 의미한다. $a_1^2+a_2^2$이 $K$로 고정되어 있을 때, BER을 최소화하기 위한 $a_1$과 $a_2$의 관계식을 구하시오.`, 
        }
      ],
    },
    { //문제 2
      "id": "16-2",
      "title": "2. AWGN 채널 환경에서 Binary 통신의 BER 시뮬레이션",
      "problems": [
        { //문제 2.A
          "id": "16-2A",
          "title": "2.A.",
          "prompt": `아래는 AWGN 채널 환경에서 Binary 통신의 ML Decision을 시뮬레이션하는 py 스크립트이다. py 스크립트의 ‘PART 1’에서는 [[equation:16.3]]에 나타낸 판별변수 $z$를 생성한다. 그리고, ‘PART 2’에서는 [[equation:16.9]]에 나타낸 ML 검출 규칙을 이용하여 심벌을 판별한다. 아래 py 스크립트에서는 [[equation:16.3]]의 판별변수 $z$를 생성하기 위해 $a_1=1$, $a_2=-1$, $\\sigma_0^2=1.5$인 경우를 가정하고 있다.
\`\`\`python
import numpy as np

##### PART 1 ###########
a1=1 # = (식 16.3)에서 a_1
a2=-1 # = (식 16.3)에서 a_2
vn=1.5 # = (식 16.3)에서 n_0의 분산 
n0=np.random.randn()*np.sqrt(vn) # = (식 16.3)에서 n_0

d=(np.random.rand()>1/2) # = d, 송신한 이진 데이터 ('1', '0'), 즉, 비트

if (d==1): z_nonoise=a1 # z_nonoise는 노이즈가 없는 환경의 z 값을 의미한다.
if (d==0): z_nonoise=? # 채워야 할 부분 (1)

z=z_nonoise+n0 # = (식 16.3)에서 z
######################

##### PART 2 #############
if (z>?): d_estimate=1 # (식 16.9)의 ML 검출 규칙에 따른 데이터 판별
if (z<?): d_estimate=? # (식 16.9)의 ML 검출 규칙에 따른 데이터 판별, 채워야 할 부분 (2)
decision_check=(d_estimate==?) # 판별이 올바른 경우에는 decision_check가 True가 되고, 잘못된 경우에는 decision_check가 False가 됨, 채워야 할 부분 (3)
######################
\`\`\`          
          `
        },
        {
          "id": "16-2A1",
          "title": "2.A1.",
          "type": "essay",
          "prompt": `위 py 스크립트의 변수 설정과 관련하여,

(a) ‘n0’를 ‘np.random.randn()*np.sqrt(vn)’로 설정한 이유를 [[equation:16.3]]에서 정의한 $n_0$의 확률적 모형을 토대로 설명하시오.
(b) ‘d’를 ‘(np.random.rand()>1/2)’로 설정한 이유를 설명하시오.

(참고. 균등(Uniform) 랜덤 변수를 이용하여, 같은 확률(0.5)로 $'0'$또는 $'1'$의 값을 갖는 이진(Binary) 랜덤 변수로 바꾸는 방법을 생각해보자. Python에서 ‘d=(np.random.rand()<0.25)’를 생성한다면, ‘d’가 0과 1이 될 확률이 각각 얼마인가?)
          `, 
        },
        {
          "id": "16-2A2",
          "title": "2.A2.",
          "type": "python",
          "prompt": `위 py 스크립트를 통해, $a_1$, $a_2$, $\\sigma_0^2$의 값을 여러 가지 다른 조합으로 설정하여 실험을 수행하고자 한다. 따라서, 각 ?가 $a_1$, $a_2$, $\\sigma_0^2$의 값에 따라 적절히 바뀔 수 있도록 ?를 채워 완성하시오. 완성한 py 스크립트를 최소 3회 이상 실행하여 결과를 확인하시오.`,
          "starterCode": `import numpy as np

##### PART 1 ###########
a1=1 # = (식 16.3)에서 a_1
a2=-1 # = (식 16.3)에서 a_2
vn=1.5 # = (식 16.3)에서 n_0의 분산 
n0=np.random.randn()*np.sqrt(vn) # = (식 16.3)에서 n_0

d=(np.random.rand()>1/2) # = d, 송신한 이진 데이터 ('1', '0'), 즉, 비트

if (d==1): z_nonoise=a1 # z_nonoise는 노이즈가 없는 환경의 z 값을 의미한다.
if (d==0): z_nonoise=? # 채워야 할 부분 (1)

z=z_nonoise+n0 # = (식 16.3)에서 z
######################

##### PART 2 #############
if (z>?): d_estimate=1 # (식 16.9)의 ML 검출 규칙에 따른 데이터 판별
if (z<?): d_estimate=? # (식 16.9)의 ML 검출 규칙에 따른 데이터 판별, 채워야 할 부분 (2)
decision_check=(d_estimate==?) # 판별이 올바른 경우에는 decision_check가 True가 되고, 잘못된 경우에는 decision_check가 False가 됨, 채워야 할 부분 (3)
######################`,
        },
        {
          "id": "16-2A3",
          "title": "2.A3.",
          "type": "essay",
          "prompt": `문제 2.A2의 py 스크립트를 최소 3회 이상 실행한 결과(‘decision_check’)를 토대로, 실행마다 비트 판별이 제대로 되었는지 확인하시오.`,
        },
        { //문제 2.B
          "id": "16-2B",
          "title": "2.B.",
          "prompt": `문제 2.A2에서 완성한 py 스크립트에서, 랜덤한 비트 대신 자신의 이미지를 비트열로 만들어 노이즈 환경에서 전송하고 수신한 후 이미지를 확인하자.`,
        },
        {
          "id": "16-2B1",
          "title": "2.B1.",
          "type": "console",
          "fileUploadEnabled": true,
          "prompt": `학교의 포털 시스템(또는 학생 지원 시스템, 종합 정보 시스템 등)에 등록된 자신의 사진을 우클릭한 후, ‘이미지를 다른 이름으로 저장’을 선택하여, 자신의 Python 작업 폴더에 ‘myphoto.jpg’(파일 형식은 JPEG Image)로 저장하시오. 온라인 Workbook의 실습 파일 가져오기 기능을 이용하여 myphoto.jpg를 Python 작업공간으로 가져오시오. 이후 Console 창에서 다음 명령을 실행하여 파일이 정상적으로 가져와졌는지 확인하시오.
\`\`\`python
>>> import os
>>> os.path.exists("myphoto.jpg")
\`\`\`
실행 결과가 True로 나타나는지 확인하시오.
          `,
        },
        {
          "id": "16-2B2",
          "title": "2.B2.",
          "type": "python",
          "fileUploadEnabled": true,
          "prompt": `아래 py 스크립트는 문제 2.A2에서 완성한 py 스크립트 파일에서, 랜덤한 비트 대신 자신의 이미지를 비트열로 만들어 노이즈 환경에서 전송하고 수신한 후 이미지를 보여준다. 또, 전체 전송한 이미지 비트 수와 잘못 판별한 비트 수를 구하고, 이 둘의 비율로 BER을 구한다.
\`\`\`python
from PIL import Image
import numpy as np
import matplotlib.pyplot as plt

a1=1
a2=-a1
vn=1.5

########## 이미지를 비트열로 만드는 과정: 실습과 상관없는 부분 #####################
A=Image.open('myphoto.jpg')
B=np.transpose(np.array(A.convert('L')))
C=np.unpackbits(B)
T2, T1=B.shape
Nbits=C.size
###################################################################################

d=C.astype(np.uint8) # 이미지의 전체 비트를 송신 비트 d로 사용
z_nonoise=np.where(d == 1, a1, ?) # 각 비트에 대응하는 송신 신호 생성, 채워야 할 부분 (1)
n0=np.random.randn(Nbits)*np.sqrt(vn) # 모든 비트에 대한 Gaussian noise를 한 번에 생성
z=z_nonoise+n0 # 수신 신호

# 수신 비트 판정
d_estimate=np.zeros(Nbits, dtype=np.uint8)
d_estimate[z > ?] = 1  # 채워야 할 부분 (2)
d_estimate[z < ?] = ?  # 채워야 할 부분 (3)

# Bit Error 개수 계산
errcnt=np.count_nonzero(d_estimate != ?)  # 채워야 할 부분 (4)

# BER 계산
BER = ?/?  # 채워야 할 부분 (5)
print(BER)

########## 수신 비트를 이미지로 만들어 그리는 과정: 실습과 상관없는 부분 #####################
r_bits=d_estimate

BB=np.packbits(r_bits)
Bhat=BB.reshape(T2, T1).T
Bhat=np.uint8(Bhat)

plt.figure(22)
plt.imshow(Bhat, cmap='gray')
plt.axis('off')
########################################################################
\`\`\`          
py 스크립트의 ?를 채워 완성하고 수행하여 실험으로 얻은 BER 결과를 확인하고, 실험으로 얻은 그림(노이즈 환경에서 수신된 자신의 이미지)를 확인하시오.`,
          "starterCode": `from PIL import Image
import numpy as np
import matplotlib.pyplot as plt

a1=1
a2=-a1
vn=1.5

########## 이미지를 비트열로 만드는 과정: 실습과 상관없는 부분 #####################
A=Image.open('myphoto.jpg')
B=np.transpose(np.array(A.convert('L')))
C=np.unpackbits(B)
T2, T1=B.shape
Nbits=C.size
###################################################################################

d=C.astype(np.uint8) # 이미지의 전체 비트를 송신 비트 d로 사용
z_nonoise=np.where(d == 1, a1, ?) # 각 비트에 대응하는 송신 신호 생성, 채워야 할 부분 (1)
n0=np.random.randn(Nbits)*np.sqrt(vn) # 모든 비트에 대한 Gaussian noise를 한 번에 생성
z=z_nonoise+n0 # 수신 신호

# 수신 비트 판정
d_estimate=np.zeros(Nbits, dtype=np.uint8)
d_estimate[z > ?] = 1  # 채워야 할 부분 (2)
d_estimate[z < ?] = ?  # 채워야 할 부분 (3)

# Bit Error 개수 계산
errcnt=np.count_nonzero(d_estimate != ?)  # 채워야 할 부분 (4)

# BER 계산
BER = ?/?  # 채워야 할 부분 (5)
print(BER)

########## 수신 비트를 이미지로 만들어 그리는 과정: 실습과 상관없는 부분 #####################
r_bits=d_estimate

BB=np.packbits(r_bits)
Bhat=BB.reshape(T2, T1).T
Bhat=np.uint8(Bhat)

plt.figure(22)
plt.imshow(Bhat, cmap='gray')
plt.axis('off')
########################################################################`,
          "referenceAnswer": `
\`\`\`python
from PIL import Image
import numpy as np
import matplotlib.pyplot as plt

a1=1
a2=-a1
vn=1.5

########## 이미지를 비트열로 만드는 과정: 실습과 상관없는 부분 #####################
A=Image.open('myphoto.jpg')
B=np.transpose(np.array(A.convert('L')))
C=np.unpackbits(B)
T2, T1=B.shape
Nbits=C.size
###################################################################################

d=C.astype(np.uint8) # 이미지의 전체 비트를 송신 비트 d로 사용
z_nonoise=np.where(d == 1, a1, a2) # 각 비트에 대응하는 송신 신호 생성, 채워야 할 부분 (1)
n0=np.random.randn(Nbits)*np.sqrt(vn) # 모든 비트에 대한 Gaussian noise를 한 번에 생성
z=z_nonoise+n0 # 수신 신호

# 수신 비트 판정
d_estimate=np.zeros(Nbits, dtype=np.uint8)
d_estimate[z > (a1+a2)/2] = 1  # 채워야 할 부분 (2)
d_estimate[z < (a1+a2)/2] = 0  # 채워야 할 부분 (3)

# Bit Error 개수 계산
errcnt=np.count_nonzero(d_estimate != d)  # 채워야 할 부분 (4)

# BER 계산
BER = errcnt/Nbits  # 채워야 할 부분 (5)
print(BER)

########## 수신 비트를 이미지로 만들어 그리는 과정: 실습과 상관없는 부분 #####################
r_bits=d_estimate

BB=np.packbits(r_bits)
Bhat=BB.reshape(T2, T1).T
Bhat=np.uint8(Bhat)

plt.figure(22)
plt.imshow(Bhat, cmap='gray')
plt.axis('off')
########################################################################
\`\`\`             
          `
        },
        { //문제 2.C
          "id": "16-2C",
          "title": "2.C.",
          "prompt": `아래 py 스크립트는 신호의 크기인 $a_1$를 $0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3, 3.5$로 각각 달리하면서 이미지 파일을 노이즈 환경에서 전송했을 때, 각 $a_1$값에 따른 BER 실험치를 구하고 $a_1$(=$x$축)의 함수로 BER(=$y$축)을 그래프로 그린다. 또한, 각 $a_1$값에 따른 수신 이미지를 ‘Bhat’에 저장한다.
\`\`\`python
from PIL import Image
import numpy as np
import matplotlib.pyplot as plt

vn=1.5
########## 이미지를 비트열로 만드는 과정: 실습과 상관없는 부분 #####################
A=Image.open('myphoto.jpg')
B=np.transpose(np.array(A.convert('L')))
C=np.unpackbits(B)

T2, T1=B.shape
Nbits=C.size
###################################################################################

a1_vector=np.array([0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3, 3.5])
BER=[]
Bhat=[]

d=C.astype(np.uint8) # 이미지 전체 비트를 송신 비트열로 사용

for n in range(len(a1_vector)):

    a1=a1_vector[?]  # 채워야 할 부분 (1)
    a2=-a1

    z_nonoise = np.where(d == 1, a1, ?) # 각 비트에 대응하는 송신 신호 생성, 채워야 할 부분 (2)
    n0=np.random.randn(Nbits) * np.sqrt(vn) # 모든 비트에 대한 Gaussian noise를 한 번에 생성

    z=z_nonoise + n0 # 수신 신호

    # 수신 비트 판정
    d_estimate=np.zeros(Nbits, dtype=np.uint8)
    d_estimate[z > ?] = 1  # 채워야 할 부분 (3)
    d_estimate[z < ?] = ?  # 채워야 할 부분 (4)

    # Bit Error 개수
    errcnt= np.count_nonzero(d_estimate != ?)  # 채워야 할 부분 (5)

    # BER 계산
    BER.append(?/?)  # 채워야 할 부분 (6)
    print(BER)

    ########## 수신 비트를 이미지로 만드는 과정: 실습과 상관없는 부분 ############
    r_bits=d_estimate

    BB=np.packbits(r_bits)
    Bhat0=BB.reshape(T2, T1).T

    Bhat.append(np.uint8(Bhat0))
    ###############################################################################

plt.figure()
plt.semilogy(a1_vector, BER)
plt.xlabel('a_1')
plt.ylabel('BER')
plt.grid()
\`\`\`          
` ,
        },
        {
          "id": "16-2C1",
          "title": "2.C1.",
          "type": "python",
          "fileUploadEnabled": true,
          "prompt": `위 py 스크립트의 ?를 모두 채워 완성하고, BER 결과 그래프를 확인하시오.`,
          "starterCode": `from PIL import Image
import numpy as np
import matplotlib.pyplot as plt

vn=1.5
########## 이미지를 비트열로 만드는 과정: 실습과 상관없는 부분 #####################
A=Image.open('myphoto.jpg')
B=np.transpose(np.array(A.convert('L')))
C=np.unpackbits(B)

T2, T1=B.shape
Nbits=C.size
###################################################################################

a1_vector=np.array([0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3, 3.5])
BER=[]
Bhat=[]

d=C.astype(np.uint8) # 이미지 전체 비트를 송신 비트열로 사용

for n in range(len(a1_vector)):

    a1=a1_vector[?]  # 채워야 할 부분 (1)
    a2=-a1

    z_nonoise = np.where(d == 1, a1, ?) # 각 비트에 대응하는 송신 신호 생성, 채워야 할 부분 (2)
    n0=np.random.randn(Nbits)*np.sqrt(vn) # 모든 비트에 대한 Gaussian noise를 한 번에 생성

    z=z_nonoise + n0 # 수신 신호

    # 수신 비트 판정
    d_estimate=np.zeros(Nbits, dtype=np.uint8)
    d_estimate[z > ?] = 1  # 채워야 할 부분 (3)
    d_estimate[z < ?] = ?  # 채워야 할 부분 (4)

    # Bit Error 개수
    errcnt= np.count_nonzero(d_estimate != ?)  # 채워야 할 부분 (5)

    # BER 계산
    BER.append(?/?)  # 채워야 할 부분 (6)
    print(BER)

    ########## 수신 비트를 이미지로 만드는 과정: 실습과 상관없는 부분 ############
    r_bits=d_estimate

    BB=np.packbits(r_bits)
    Bhat0=BB.reshape(T2, T1).T

    Bhat.append(np.uint8(Bhat0))
    ###############################################################################

plt.figure()
plt.semilogy(a1_vector, BER)
plt.xlabel('a_1')
plt.ylabel('BER')
plt.grid()`,
          "referenceAnswer": `
\`\`\`python
from PIL import Image
import numpy as np
import matplotlib.pyplot as plt

vn=1.5
########## 이미지를 비트열로 만드는 과정: 실습과 상관없는 부분 #####################
A=Image.open('myphoto.jpg')
B=np.transpose(np.array(A.convert('L')))
C=np.unpackbits(B)

T2, T1=B.shape
Nbits=C.size
###################################################################################

a1_vector=np.array([0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3, 3.5])
BER=[]
Bhat=[]

d=C.astype(np.uint8) # 이미지 전체 비트를 송신 비트열로 사용

for n in range(len(a1_vector)):

    a1=a1_vector[n]  # 채워야 할 부분 (1)
    a2=-a1

    z_nonoise = np.where(d == 1, a1, a2) # 각 비트에 대응하는 송신 신호 생성, 채워야 할 부분 (2)
    n0=np.random.randn(Nbits)*np.sqrt(vn) # 모든 비트에 대한 Gaussian noise를 한 번에 생성

    z=z_nonoise + n0 # 수신 신호

    # 수신 비트 판정
    d_estimate=np.zeros(Nbits, dtype=np.uint8)
    d_estimate[z > (a1+a2)/2] = 1  # 채워야 할 부분 (3)
    d_estimate[z < (a1+a2)/2] = 0  # 채워야 할 부분 (4)

    # Bit Error 개수
    errcnt= np.count_nonzero(d_estimate != d)  # 채워야 할 부분 (5)

    # BER 계산
    BER.append(errcnt/Nbits)  # 채워야 할 부분 (6)
    print(BER)

    ########## 수신 비트를 이미지로 만드는 과정: 실습과 상관없는 부분 ############
    r_bits=d_estimate

    BB=np.packbits(r_bits)
    Bhat0=BB.reshape(T2, T1).T

    Bhat.append(np.uint8(Bhat0))
    ###############################################################################

plt.figure()
plt.semilogy(a1_vector, BER)
plt.xlabel('a_1')
plt.ylabel('BER')
plt.grid()
\`\`\`              
          `
        },
        {
          "id": "16-2C2",
          "title": "2.C2.",
          "type": "essay",
          "prompt": `문제 2.C1의 BER 결과 그래프를 보면, $x$축($a_1$ 값)이 증가할수록, BER은 감소함을 알 수 있다. 그 이유를 쓰시오.`
        },
        {
          "id": "16-2C3",
          "title": "2.C3.",
          "type": "python",
          "fileUploadEnabled": true,
          "consoleEnabled": true,
          "prompt": `문제 2.C1의 py 스크립트를 복사하여 붙여넣고 실행하시오. BER에 따라 수신 이미지의 질을 파악해보자. 송신 신호의 크기 $a_1$이, 벡터 ‘a1_vector’(=[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3, 3.5])의 ‘n’ 번째 값과 같을 때, 그때 BER은 벡터 ‘BER’의 ‘n’ 번째 원소와 같으므로, Console 창에서 ‘BER[n]’로 확인할 수 있고, 그때 수신된 이미지는 Console 창에서 ‘plt.close(); plt.imshow(Bhat[n], cmap=‘gray’)’로 그릴 수 있다.

(주의. Python에서 벡터의 인덱스는 0부터 시작함을 유의)

(a) 송신 신호의 크기 $a_1=0.5$일 때, 실험으로 구한 BER(=‘BER[?]’)과 그때 수신된 이미지를 확인하시오.
(b) 송신 신호의 크기 $a_1$가 $1.25, 2, 3.5$일 때, (a)를 각각 반복하시오. BER과 수신 이미지의 질의 관계를 쓰고, 자신의 예상과 맞는지 설명하시오.`
        },
        { //문제 2.D
          "id": "16-2D",
          "title": "2.D.", 
          "type": "python",
          "fileUploadEnabled": true,
          "consoleEnabled": true,
          "prompt": `문제 2.C1에서 완성한 py 스크립트를 복사하여 붙여넣은 후, 실행하시오. 아래와 같이 Console 창에서, [[equation:16.11]]의 BER 공식을 이용하여, $a_1$이 $0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3, 3.5$일 때의 BER 이론치를 계산하고, 그래프로 그리자. 아래를 Console 창에서 실행하고, 이론치 결과 그래프를 겹쳐 그리시오.
\`\`\`python
>>> from scipy.special import erfc
>>> a2_vector=-a1_vector
>>> BER_exact=0.5*erfc(((a1_vector-(a2_vector))/(2*np.sqrt(vn)))/np.sqrt(2)) # 벡터 연산을 이용하여 각 a_1 값에 대한 BER을 한 번에 계산한다.
>>> plt.semilogy(a1_vector,BER_exact,'r')
\`\`\`          
BER 실험치(문제 2.C1의 결과 그래프)와 비교하여 두 값이 같은지 확인하시오.
          `,
        },
        { //문제 2.E
          "id": "16-2E",
          "title": "2.E.", 
          "prompt": `문제 2.C에서 작성한 py 스크립트에서 19번째 라인 ‘d=C.astype(np.uint8)’를 ‘d=(np.random.rand(Nbits)>9/10).astype(np.uint8)’로 수정하면, [[equation:16.12]]와 같이 $'1'$과 $'0'$을 각각 $\\dfrac{1}{10}$과 $\\dfrac{9}{10}$의 다른 확률로 가지는 이진 데이터 비트 $d$를 생성할 수 있다.
$$
\\Pr(d=1)=\\Pr(s_1)=\\dfrac{1}{10}, 
\\qquad 
\\Pr(d=0)=\\Pr(s_2)=\\dfrac{9}{10}
\\qquad \\text{(식 16.12)}
$$           
          `,
        },
        {
          "id": "16-2E1",
          "title": "2.E1.",
          "type": "essay",
          "prompt": `‘d=(np.random.rand(Nbits)>9/10).astype(np.uint8)’로 ‘d’를 생성하면, $s_1$과 $s_2$의 발생 확률이 [[equation:16.12]]를 만족하는 이유를 설명하시오.`,
        },
        {
          "id": "16-2E2",
          "title": "2.E2.", 
          "type": "python",
          "fileUploadEnabled": true,
          "prompt": `문제 2.C1의 py 스크립트를 복사하여 붙여넣은 후, 19번째 라인을 ‘d=(np.random.rand(Nbits)>9/10).astype(np.uint8)’로 수정한 py 스크립트를 수행하여 BER 실험치의 그래프를 그리시오.`,
        },
        {
          "id": "16-2E3",
          "title": "2.E3.",
          "type": "essay",
          "prompt": `[[equation:16.9]]의 ML 판별 규칙에 따르면, $z$를 판별 경곗값인 $\\dfrac{a_1+a_2}{2}$와 비교하여 비트를 판별한다. 그러나, [[equation:16.7]]의 Likelihood 함수와 [[equation:16.9]]의 ML 판별 규칙은 $'1'$과 $'0'$이 같은 확률로 발생하는, 즉 $\\Pr(s_1)=\\Pr(s_2)=\\dfrac{1}{2}$를 가정하여 구한 것이다.
          
(a) [[equation:16.12]]에 나타낸 것과 같이, 두 비트의 발생 확률이 같지 않은 환경에서, Likelihood 함수와 Ml 판별 규칙을 구하시오. ([[equation:16.12]]를 [[equation:16.5]]에 대입하여 유도과정을 다시 보일 것)
(b) (a)에서 구한 판별 경곗값이 두 비트의 발생 확률이 같은 환경에서 구한 $\\dfrac{a_1+a_2}{2}$에 비해 큰 값인가, 작은 값인가?
(c) [[equation:16.12]]의 환경에서 구한 판별 경곗값이 $\\dfrac{a_1+a_2}{2}$이 아닌 이유를 직관적으로 설명하시오. 또한, 그 값이 왜 (b)와 같은 결과인지도 직관적으로 설명하시오.`,
        },
        {
          "id": "16-2E4",
          "title": "2.E4.", 
          "type": "python",
          "fileUploadEnabled": true,
          "prompt": `문제 2.E3 (a)에서 구한 판별 경곗값을 이용하여, 문제 2.E2의 py 스크립트를 복사하여 붙여넣은 후, 33번째 라인 ‘d_estimate[z > ?] = ...’와 34번째 라인  d_estimate[z < ?] = ...’를 수정하시오. 자연로그 함수 $\\ln(\\cdot)$는 Python 함수 ‘np.log()’를 사용하시오. py 스크립트를 실행하고, BER 결과 그래프를 확인하시오.`,
        },
        {
          "id": "16-2E5",
          "title": "2.E5.",
          "type": "essay",
          "prompt": `판별 경곗값이 $\\dfrac{a_1+a_2}{2}$인 문제 2.E2의 BER 실험 결과와 문제 2.E4의 BER 실험 결과의 대소 비교를 하고, 이유를 분석하시오.`
        }
      ]
    },
    { //문제 3
      "id": "16-3",
      "title": "3. 가우시안이 아닌 노이즈(Non-Gaussian Noise) 환경에서 ML 검출",
      "problems": [
        { //문제 3.A
          "id": "16-3A",
          "title": "3.A.",
          "prompt": `[[equation:16.3]]에서, $n_0$는 판별변수 $z$의 노이즈 성분이며, 가우시안 분포를 따른다고 가정했다. 본 문제에서는 $n_0$의 PDF가 가우시안이 아닌 경우를 생각해보자. 예를 들어, $n_0$의 PDF가 [[equation:16.13]]과 같은 경우를 고려해보자.
$$
p_{n_0}(x)=
\\begin{cases}
\\left| x \\right|, & -1\\le x \\le 1\\\\
0, & \\text{elsewhere}
\\end{cases}
\\qquad \\text{(식 16.13)}
$$
송신 신호가 각각 $s_1(t)$, $s_2(t)$이고, 노이즈 없이 수신되었을 때 판별변수 $z$의 값을 각각 $a_1$, $a_2$라 할 때, $a_1=0.75$, $a_2=-0.75$라 가정하자.`
        },
        {
          "id": "16-3A1",
          "title": "3.A1.",
          "type": "graph",
          graphInputMode: 'both',
          graphXMin: -3,
          graphXMax: 3,
          graphYMin: -3,
          graphYMax: 3,
          graphXAxisLabel: 'x',
          graphYAxisLabel: 'p_{n_0}(x)',
          graphShowGrid: true,
          "prompt": `[[equation:16.13]]에 나타낸 $n_0$의 PDF를 그리시오. 그래프의 x축 범위를 [-3, 3]으로 설정하여, [-3, 3] 범위에서 연속인 그래프가 되도록 그리시오. 그래프가 x축과 겹치는 범위, 즉 PDF가 0인 범위에서는 x축과 구분되도록 그래프를 굵은 선으로 그리시오.`
        },
        {
          "id": "16-3A2",
          "title": "3.A2.",
          "type": "proof",
          "prompt": `$n_0$의 PDF 곡선 아래의 면적이 $1$임을 보이시오.`
        },
        {
          "id": "16-3B",
          "title": "3.B.",
          "prompt": `[[equation:16.13]]에 나타낸 PDF를 가진 노이즈 성분 $n_0$가 송신 신호에 더해져 수신되었을 때, 아래 $z$의 두 조건부 PDF를 겹쳐 그려보자. 아래 문제 3.B1, 3.B2의 그래프를 하나의 좌표 축에 겹쳐 그리시오. 두 그래프(PDF) 모두 x축 범위를 [-3, 3]으로 설정하여, [-3, 3] 범위에서 연속인 그래프가 되도록 그리시오.

(참고. $X$가 랜덤 변수이고 $c$가 상수일 때, $Y=X+c$의 PDF는 $X$의 PDF를 $x$축에서 $c$만큼 이동한 것과 같다.)`
        },
        {
          "id": "16-3B1",
          "title": "3.B1.",
          "type": "graph",
          graphInputMode: 'both',
          graphXMin: -3,
          graphXMax: 3,
          graphYMin: -3,
          graphYMax: 3,
          graphXAxisLabel: 'x',
          graphYAxisLabel: 'p_{n_0}(x)',
          graphShowGrid: true,
          "prompt": `$s_1$를 전송했을 때 $z(=a_1+n_0)$의 조건부 PDF $f_{z \\mid s_1}(z)$`
        },
        {
          "id": "16-3B2",
          "title": "3.B2.",
          "type": "graph",
          graphInputMode: 'both',
          graphXMin: -3,
          graphXMax: 3,
          graphYMin: -3,
          graphYMax: 3,
          graphXAxisLabel: 'x',
          graphYAxisLabel: 'p_{n_0}(x)',
          graphShowGrid: true,
          "prompt": `$s_2$를 전송했을 때 $z(=a_2+n_0)$의 조건부 PDF $f_{z \\mid s_2}(z)$`
        },
        {
          "id": "16-3C",
          "title": "3.C.",
          "prompt": `[[equation:16.8]]로부터 이진 데이터의 발생 확률이 같을 때, ML 판별 규칙은 결국 $f_{z \\mid s_1}(z)$와 $f_{z \\mid s_2}(z)$ 중 더 큰 것으로 판별하는 것과 같음을 기억하자. 문제 3.B에서 그린 조건부 확률 그림을 토대로, 다음 물음에 답하시오.`
        },
        {
          "id": "16-3C1",
          "title": "3.C1.",
          "type": "essay",
          "prompt": `$f_{z \\mid s_1}(z)>f_{z \\mid s_2}(z)$를 만족하는 $z$의 영역(조건식)을 쓰시오.`
        },
        {
          "id": "16-3C2",
          "title": "3.C2.",
          "type": "essay",
          "prompt": `$f_{z \\mid s_1}(z)<f_{z \\mid s_2}(z)$를 만족하는 $z$의 영역(조건식)을 쓰시오.`
        },
        {
          "id": "16-3C3",
          "title": "3.C3.",
          "type": "essay",
          "prompt": `[[equation:16.8]]에 따르면, 판별변수 $z$가 문제 3.C1에서 구한 영역에 있을 때, 송신한 비트를 $'0'$ 또는 $'1'$ 중 어느 것으로 판별하는가?`
        },
        {
          "id": "16-3D",
          "title": "3.D.",
          "type": "proof",
          "prompt": `문제 1.D의 가우시안 노이즈 환경에서 ML 검출의 BER을 구한 것과 같은 원리를 이용하여, 문제 3.C에서 구한 $z$의 영역에 따라 ML 검출했을 때 BER은 얼마인지 수식으로 구하시오.`
        },
        { //문제 3.E
          "id": "16-3E",
          "title": "3.E.",
          "prompt": `다음 물음에 답하시오.`
        },
        {
          "id": "16-3E1",
          "title": "3.E1.",
          "type": "console",
          "prompt": `[[equation:16.13]]의 PDF를 가지는 노이즈 샘플 $n_0$를 생성하기 위해, Console에서 아래를 실행하시오. 히스토그램 결과 창을 확인하시오.
\`\`\`python
>>> import numpy as np
>>> import matplotlib.pyplot as plt
>>> n0_samples=np.sign(np.random.rand(100000)-0.5)*np.sqrt(np.random.rand(100000))
>>> plt.hist(n0_samples,100); plt.axis([-2, 2, 0, 5e3])
\`\`\`            
          `
        },
        {
          "id": "16-3E2",
          "title": "3.E2.",
          "type": "essay",
          "prompt": `문제 3.E1에서 캡쳐한 히스토그램이 문제 3.A1에서 그린 $n_0$의 PDF와 같은가?`
        },
        {
          "id": "16-3E3",
          "title": "3.E3.",
          "type": "python",
          "fileUploadEnabled": true,
          "prompt": `[[equation:16.13]]에 나타낸 PDF를 따르는 노이즈 샘플 $n_0$를 생성하기 위해, 문제 2.B2의 py 스크립트에서 19번째 라인 ‘n0=np.random.randn(Nbits)*np.sqrt(vn)’을 ‘n0=np.sign(np.random.rand(Nbits)-0.5)-np.sqrt(np.random.rand(Nbits))’로 수정하시오. 그리고, 신호 성분의 크기를 변경하기 위해, 5~6번째 라인 ‘a1=1’, ‘a2=-a1’을 ‘a1=0.75’, ‘a2=-0.75’로 수정하시오. 문제 2.B2의 py 스크립트를 복사하여 붙여넣고 수정한 후(다른 라인은 수정하지 말 것), py 스크립트를 수행하여 BER 결과를 보이시오.`
        },
        { //문제 3.F
          "id": "16-3F",
          "title": "3.F.",
          "prompt": `문제 3.E3에서 수정한 py 스크립트에서 24번째 라인 ‘d_estimate[z > ?] = ...’와 25번째 라인 ‘d_estimate[z < ?] = ...’를 문제 3.C1, 3.C2에서 구한 $z$의 영역에 따라 ML 검출하도록 py 스크립트를 추가로 수정하시오.`
        },
        {
          "id": "16-3F1",
          "title": "3.F1.",
          "type": "python",
          "fileUploadEnabled": true,
          "prompt": `문제 3.E3의 py 스크립트를 복사하여 붙여넣고 수정한 후, py 스크립트를 수행하여 BER 결과를 보이시오.`
        },
        {
          "id": "16-3F2",
          "title": "3.F2.",
          "type": "essay",
          "prompt": `문제 3.D에서의 수식 유도와 문제 3.F2의 실험이 올바르면, 문제 3.D, 3.F1의 결과는 일치해야 한다. 문제 3.D, 3.F1의 결과가 일치하는지 확인하시오. 결과가 일치하지 않으면, 수식 유도나 실험을 올바르게 수행하지 못한 것이므로, 잘못된 부분을 수정해야 다시 수행하시오.`
        },
        {
          "id": "16-3G",
          "title": "3.G.",
          "type": "essay",
          "prompt": `문제 3.E3의 BER 결과와 문제 3.F1의 BER 결과를 비교하시오. 차이에 대한 이유를 설명하시오.`
        },
        {
          "id": "16-3H",
          "title": "3.H.",
          "prompt": `노이즈의 분포가 [[equation:16.13]]이 아니라 가우시안 분포를 따른다면, 검출 영역의 경계는 $a_1$과 $a_2$의 중간 지점인 $0$이 된다. 그러나, 노이즈가 굳이 가우시안 분포가 아니라도, 검출 영역의 경계가 $a_1$과 $a_2$ 중간 지점이 되는 경우가 있다.`
        },
        {
          "id": "16-3H1",
          "title": "3.H1.",
          "type": "graph",
          graphInputMode: 'both',
          graphXMin: -3,
          graphXMax: 3,
          graphYMin: -3,
          graphYMax: 3,
          graphXAxisLabel: 'x',
          graphYAxisLabel: 'p_{n_0}(x)',
          graphShowGrid: true,
          "prompt": `이러한 경우의 노이즈의 분포를 예로 들어 그려보시오.`
        },
        {
          "id": "16-3H2",
          "title": "3.H2.",
          "type": "essay",
          "prompt": `문제 3.H1을 더욱 일반화하여, 노이즈의 분포가 어떤 성질을 만족할 때 검출 영역의 경계가 $a_1$과 $a_2$ 중간 지점이 되는지 쓰시오.`
        },
      ]
    }
  ]
} as const;