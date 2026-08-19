import type { WorkbookChapter } from '@/types/workbook';

export const chapter = {
  "id": "16-MLforBT",
  "title": "Chapter 16. Maximum Likelihood(ML) Detection for Binary Transmission",
  "sections": [
    { //문제 1
      "id": "16-1",
      "title": "1. Likelihood 함수와 ML(Maximum Likelihood) 검출 기법",
      "problems": [
        {
          "id": "16-1A",
          "title": "1.A.",
          "prompt": `채널의 임펄스 응답 $h_c(t)$가 임펄스이고 수신단에서 가우시안 노이즈 성분만 더해지는 채널을 AWGN(Additive White Gaussian Noise) 채널이라고 한다. AWGN 채널에서, 데이터 비트 $d$가 $'1'$일 때 신호 $s_1(t)$를 송신하고 $'0'$일 때 신호 $s_2(t)$를 전송하는 이진 데이터 통신을 고려하자. 이때 수신 신호 $r(t)$는 (식 16.1)과 같이 주어진다.
$$
r(t)=
\\begin{cases}
s_1(t)+n(t), & \\text{if transmitted bit is '1'} \\\\
s_2(t)+n(t), & \\text{if transmitted bit is '0'}
\\end{cases}
\\qquad \\text{(식 16.1)}
$$
여기서 $n(t)$는 AWGN을 의미한다.

[[image:/images/ch16/figure16_1.png|그림 16.1 디지털 신호의 복조(demodulation)/검출(detection)의 기본적인 두 단계]]          
[그림 16.1]은 디지털 신호의 복조(demodulation)/검출(detection)의 기본적인 두 단계(Step)를 보여준다. Step 1에서는 수신 신호를 기저 대역 신호로 변환하고, 필터링한 후 심벌당 한 번씩 샘플링하여 판별변수(Decision Statistic 또는 Test Statistic)를 생성한다. 수신 필터(등화기 필터는 본 실습에서 고려하지 않음)의 출력을 $z(t)$라 하고 현재 데이터 심벌의 샘플링 지점을 $T$라 하면, $z(T)$가 현재 데이터 심벌의 판별변수가 된다. 필터링된 기저 대역 신호 $z(t)$는 (식 16.2)와 같이 나타낼 수 있다.
$$
z(t)=
\\begin{cases}
a_1(t)+n_0(t), & \\text{for bit = '1'} \\\\
a_2(t)+n_0(t), & \\text{for bit = '0'}
\\end{cases}
\\qquad \\text{(식 16.2)}
$$
여기서 $a_i(t)(i=1,2)$는 송신 신호 $s_i(t)(i=1,2)$의 필터링된 출력이고, $n_0(t)$는 필터링된 노이즈를 의미한다.

디지털 신호의 복조, 검출 과정의 입력이 하나의 랜덤 변수인 가장 단순한 경우를 생각해보자. 판별변수 $z(T)$를 생성하기 위해 필터링된 기저 대역 신호 $z(t)$를 $t=T$인 순간에 샘플링한다. 단 하나의 송신 신호를 송신하였다고 가정하여 $z(T)$를 편의상 $z$라 표기하자. $z$는 (식 16.3)과 같이 나타낼 수 있다.
$$
z=
\\begin{cases}
a_1+n_0, & \\text{if } s_1(t) \\text{(bit = '1') is transmitted} \\\\
a_2+n_0, & \\text{if } s_2(t) \\text{(bit = '0') is transmitted}
\\end{cases}
\\qquad \\text{(식 16.3)}
$$
여기서 $a_i$는 $a_i(T)$이고, $n_0$는 평균이 0이고 분산이 $\\sigma_0^2$인 가우시안 노이즈 $n_0(T)$를 의미한다.
          `,
          "tags": [
            "preface"
          ]
        },
        {
          "id": "16-1A",
          "title": "1.A1.",
          "type": "essay",
          "prompt": `$X$는 $X \\sim N(0, \\sigma^2)$를 따르는 독립 가우시안 확률 변수이고, $Y=aX+b$라면, $Y \\sim N(?, ?)$를 따른다. ?를 채우시오.
(Hint. 14장의 문제 4.A를 참고)`,
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
        }
      ],
    },
  ]
} as const;
