import type { WorkbookChapter } from '@/types/workbook';

export const chapter = {
  "id": "21-bpsk",
  "title": "Chapter 21. BPSK BER Simulation (Waveform Level)",
  "sections": [
    { //문제 1
      "id": "21-1",
      "title": "1. 기저대역 (Baseband) BPSK 시뮬레이션을 위한 Eb/N0 설정",
      "problems": [
        { //문제 1.A
          "id": "21-1A",
          "title": "1.A.",
          "type": "python",
          consoleEnabled: true,
          starterCode : `import numpy as np

######### <Signal pulse design> #############################
Ts = 1
L = 16
t_step = Ts / L
pt = rcosdesign(?, 6, ?, ?) # 채워야 할 부분 (1)
pt = pt / np.sqrt(np.max(np.convolve(pt, pt)))
N = len(pt)

######### <Signal Energy> ###################################
Eb = np.sum(?) * t_step # BPSK, 채워야 할 부분 (2)

######### <N0 setting> ######################################
EbN0dB = 100 # Eb/N0 = 100dB로 주어졌다고 가정.

EbN0 = 10 ** (?) # 채워야 할 부분 (3), 주어진 EbN0dB가 바뀌면 EbN0가 따라서 바뀔 수 있도록 EbN0dB가 들어간 식으로 완성할 것.
N0 = ? # 채워야 할 부분 (4), 주어진 EbN0dB가 바뀌면 N0가 따라서 바뀔 수 있도록 Eb, EbN0가 들어간 식으로 완성할 것.`,
          "prompt": `BER Simulation에서는, 여러 개의 다른 $E_b/N_0$ 값에 대하여 각각 BER을 실험으로 구하고 $E_b/N_0$를 x축으로 하고 BER을 y축으로 하여 BER 커브를 그리게 된다. 통상 x축은 dB scale로 그리므로, $E_b/N_0$는 dB 단위에서 일정한 간격의 값들을 택하게 된다. 한편, 실험에서는 크기가 고정된 펄스를 사용하므로 비트 에너지 $E_b$역시 상수로 고정되게 된다. 따라서, $N_0$을 조절하여 원하는 $E_b/N_0$를 설정해야한다. 가장 보편적으로 사용되는 신호변조 방식인 M-ary PSK와 M-ary QAM 방식의 경우에, 전체적으로 다음의 과정에 따라 파형 단계에서의 BER simulation이 완성된다.

Step 1. 사용할 펄스를 설계. 예를 들어, ISI(Inter Symbol Interference)가 존재하지 않으면서 대역폭 요구조건을 만족시키는 펄스.
Step 2. 디자인한 펄스의 에너지(=비트 에너지 $E_b$) 계산. 
Step 3. BER 실험을 할 $E_b/N_0$[dB] 값 설정.
Step 4. $E_b/N_0$[dB] 값을 linear scale의 $E_b/N_0$ 값으로 환산.
Step 5. Step 4에서 구한 linear scale의 $E_b/N_0$와 Step 2에서 구한 $E_b$에 의해 $N_0$계산.
Step 6. $N_0$ 값에 따라 노이즈 샘플 벡터의 분산 설정.
Step 7. 송신 신호 샘플 벡터 생성, $N_0$에 맞게 노이즈 샘플 벡터 생성, 수신신호 샘플 벡터 생성, 수신신호 샘플 벡터로부터 송신된 비트를 추정. 잘못 추정된 비트수를 세어 저장.
Step 8. 실험을 수행한 송신 비트수가 통계적으로 의미가 있는 평균적인 BER을 계산하기에 충
분한 크기가 될 때까지 독립적으로 생성한 송신비트와 수신신호를 이용하여 Step 7을 반복.
Step 9. $E_b/N_0$[dB]값을 바꿔가며 각 값에 대하여 Step 4~Step 8를 수행하여 BER 벡터 생성.
Step 10. BER 커브를 $E_b/N_0$[dB]의 함수로 plot.

아래는 먼저 펄스 ‘pt’를 설계하고, 주어진$E_b/N_0$[dB] 값에 대해 $N_0$를 계산하는 과정(위에서 Step1~Step5에 해당)의 py 스크립트이다. 변수 ‘EbN0dB’는 dB scale에서 $E_b/N_0$를, ‘EbN0’는 Linear scale에서의 $E_b/N_0$를 나타낸다. Roll-off factor=0.5인 ‘square root raised cosine’ 펄스를 가정하자. 그리고 송신 심벌은 BPSK 심벌로 가정하고, 심벌주기 ‘Ts’=1초, 심벌 당 샘플 수 ‘L’=16으로 놓자. 아래의 모든 ?을 채워 py 스크립트를 완성하시오.
\`\`\`python
import numpy as np

######### <Signal pulse design> #############################
Ts = 1
L = 16
t_step = Ts / L
pt = rcosdesign(?, 6, ?, ?) # 채워야 할 부분 (1)
pt = pt / np.sqrt(np.max(np.convolve(pt, pt)))
N = len(pt)

######### <Signal Energy> ###################################
Eb = np.sum(?) * t_step # BPSK, 채워야 할 부분 (2)

######### <N0 setting> ######################################
EbN0dB = 100 # Eb/N0 = 100dB로 주어졌다고 가정.

EbN0 = 10 ** (?) # 채워야 할 부분 (3), 주어진 EbN0dB가 바뀌면 EbN0가 따라서 바뀔 수 있도록 EbN0dB가 들어간 식으로 완성할 것.
N0 = ? # 채워야 할 부분 (4), 주어진 EbN0dB가 바뀌면 N0가 따라서 바뀔 수 있도록 Eb, EbN0가 들어간 식으로 완성할 것.
\`\`\`
(참고. [[link:/workbook/ch20?p=20-2B1|20장의 문제 2.B]]에서 사용한 tx_sig_gen.py을 다시 보자. 데이터 비트가 unipolar to bipolar, impulse modulation 그리고 pulse shaping 과정을 거치게 된다. 이 일련의 과정은 결국, 매 데이터 비트 주기 마다, 데이터 비트가 ‘1’일 때는 ‘pt’를 전송하고, 데이터 비트가 ‘0’일 때는 ‘-pt’를 전송하는 것과 동일함을 알 수 있다. 따라서, 비트 당 사용하는 에너지 는 ‘pt’의 에너지가 된다. 샘플된 신호의 에너지를 수치적으로 계산하는 방법은 [[link:/workbook/ch17?p=17-3A1|17장의 문제 3.A]] 참고.)

(참고. $x$(Linear scale 값)를 $X$(dB 값)로 변환하는 식 : $X=10\\log_{10}{x}$)

이후, 완성한 py 스크립트를 실행하고, 계산된 ‘N0’값을 출력하기 위해 Console에서 ‘>> N0’ 를 실행하고 결과를 확인하시오.
`,
          "referenceAnswer": `빈칸을 채우면 다음과 같다.

\`\`\`python
import numpy as np

######### <Signal pulse design> #############################
Ts = 1
L = 16
t_step = Ts / L

pt = rcosdesign(0.5, 6, L, 'sqrt')
pt = pt / np.sqrt(np.max(np.convolve(pt, pt)))
N = len(pt)

######### <Signal Energy> ###################################
Eb = np.sum(pt ** 2) * t_step

######### <N0 setting> ######################################
EbN0dB = 100

EbN0 = 10 ** (EbN0dB / 10)
N0 = Eb / EbN0
\`\`\`

Roll-off factor가 $0.5$인 SRRC 펄스를 사용하므로 첫 번째 빈칸은

\`\`\`python
rcosdesign(0.5, 6, L, 'sqrt')
\`\`\`

가 된다.

BPSK에서는 비트 1개를 전송할 때 $p(t)$ 또는 $-p(t)$가 전송되므로 비트 에너지 $E_b$는 펄스 자체의 에너지와 같다. 따라서

$$
E_b
=
\\int |p(t)|^2dt
\\approx
\\sum_k |p[k]|^2\\,\\text{t\\_step}
$$

이므로

\`\`\`python
Eb = np.sum(pt ** 2) * t_step
\`\`\`

로 계산한다.

또한

$$
E_b/N_0[\\mathrm{dB}]
=
10\\log_{10}(E_b/N_0)
$$

이므로 linear scale의 값은

$$
E_b/N_0
=
10^{E_b/N_0[\\mathrm{dB}]/10}
$$

이며,

\`\`\`python
EbN0 = 10 ** (EbN0dB / 10)
\`\`\`

가 된다.

마지막으로

$$
\\frac{E_b}{N_0}=\\mathrm{EbN0}
$$

이므로

$$
N_0=\\frac{E_b}{\\mathrm{EbN0}}
$$

이고,

\`\`\`python
N0 = Eb / EbN0
\`\`\`

로 계산한다.`
        },
        { //문제 1.B
          "id": "21-1B",
          "title": "1.B.",
          "prompt": `[그림 21.1]은 노이즈 리젝션(noise rejection) 아날로그 필터와 이후 샘플링 된 신호의 디지털 필터 과정을 설명하고 있다.
[[image:/images/ch21/figure21_1.png|그림 21.1 노이즈 리젝션 필터와 정합 필터]]
그림에서 $r(t)$는 수신신호를 나타내고, 이것은 송신신호 $s(t)$에 스펙트럼 밀도 $N_0/2$를 갖는 AWGN 신호 $n(t)$가 더해진 신호이다. 노이즈 리젝션 필터의 대역폭은 출력의 샘플링 주파수의 절반(‘1/(2*t_step)’)으로 놓는다.`,
        },
        {
          "id": "21-1B1",
          "title": "1.B1.",
          "type": "graph",
          graphInputMode: 'both',
          graphXMin: -10,
          graphXMax: 10,
          graphYMin: -10,
          graphYMax: 10,
          graphXAxisLabel: 'f[Hz]',
          graphYAxisLabel: 'PSD',
          graphShowGrid: true,
          "prompt": `[그림 21.2]는 $r(t)$에 포함된 노이즈 $n(t)$ 의 PSD(Power Spectral Density; 파워 스펙트럼 밀도)을 보이고 있다.
[[image:/images/ch21/figure21_2.png|그림 21.2 노이즈 리젝션 필터 통과 전후의 PSD와 신호전력]]
노이즈 리젝션 필터를 통과한 노이즈의 PSD는 어떤 모양인지 정확히 그리시오.`,
          "referenceAnswer": `노이즈 리젝션 필터는 차단 주파수가

$$
f_c=\\frac{1}{2\\times\\text{t\\_step}}
$$

인 이상적인 저역통과필터로 볼 수 있다.

따라서 필터 출력 노이즈의 PSD는

$$
S_n(f)=
\\begin{cases}
\\dfrac{N_0}{2},
& |f|\\le\\dfrac{1}{2\\times\\text{t\\_step}}\\\\
0,
& |f|>\\dfrac{1}{2\\times\\text{t\\_step}}
\\end{cases}
$$

가 된다.

현재

$$
\\text{t\\_step}=\\frac{T_s}{L}=\\frac{1}{16}
$$

이므로 차단 주파수는

$$
\\frac{1}{2\\times(1/16)}=8\\ \\mathrm{Hz}
$$

이다.

따라서 그래프에는 $-8$ Hz부터 $8$ Hz까지 높이가 $N_0/2$인 직사각형 PSD를 그리고, 그 밖의 주파수에서는 0으로 그리면 된다.`
        },
        {
          "id": "21-1B2",
          "title": "1.B2.",
          "type": "essay",
          "prompt": `어떤 신호의 전력은 그 신호의 PSD로부터 구할 수 있다. 신호의 전력을 PSD로부터 구하는 관계식을 쓰시오.`,
          "referenceAnswer": `신호의 평균 전력은 그 신호의 Power Spectral Density(PSD)를 모든 주파수에 대해 적분하여 구할 수 있다.

즉, PSD를 $S_x(f)$라고 하면

$$
P_x
=
\\int_{-\\infty}^{\\infty} S_x(f)\\,df
$$

이다.

따라서 PSD 그래프에서 주파수에 대한 전체 면적이 그 신호의 평균 전력에 해당한다.`
        },
        {
          "id": "21-1B3",
          "title": "1.B3.",
          "type": "proof",
          "prompt": `노이즈 리젝션 필터 출력(샘플링 전)의 노이즈 전력을 $P_{n,NRF}$이라 할 때, $P_{n,NRF}$은 [[equation:21.1]]과 같이 계산할 수 있다.
$$
P_{n,NRF}=\\frac{N_0}{2\\times \\text{t\\_step}}
\\qquad \\text{(식 21.1)}
$$
문제 1.B1에서 구한 PSD 모양, 문제 1.B2의 관계식을 이용하여 [[equation:21.1]]을 증명하시오.`,
            "referenceAnswer": `문제 1.B1에서 구한 노이즈 리젝션 필터 출력의 PSD는

$$
S_n(f)=
\\begin{cases}
\\dfrac{N_0}{2},
& -\\dfrac{1}{2\\text{t\\_step}}
\\le f\\le
\\dfrac{1}{2\\text{t\\_step}}\\\\
0, & \\text{otherwise}
\\end{cases}
$$

이다.

신호의 전력은 PSD를 모든 주파수에 대해 적분하여 구할 수 있으므로

$$
P_{n,NRF}
=
\\int_{-\\infty}^{\\infty}S_n(f)df
$$

이다.

PSD가 0이 아닌 구간만 적분하면

$$
P_{n,NRF}
=
\\int_{-\\frac{1}{2\\text{t\\_step}}}^{\\frac{1}{2\\text{t\\_step}}}
\\frac{N_0}{2}\\,df
$$

이고,

$$
=
\\frac{N_0}{2}
\\left(
\\frac{1}{2\\text{t\\_step}}
-
\\left(-\\frac{1}{2\\text{t\\_step}}\\right)
\\right)
$$

이다.

따라서

$$
P_{n,NRF}
=
\\frac{N_0}{2}
\\frac{1}{\\text{t\\_step}}
=
\\boxed{
\\frac{N_0}{2\\times\\text{t\\_step}}
}
$$

가 되어 식 21.1이 증명된다.`
        },
        {
          "id": "21-1B4",
          "title": "1.B4.",
          "type": "proof",
          "prompt": `노이즈 리젝션 필터를 통과한 노이즈 샘플들의 분포와 노이즈 샘플들 간의 상관관계를 알아보자.
  
노이즈 샘플들의 분포와 평균 : 노이즈 리젝션 필터가 선형 시스템이므로 이를 통과한 노이즈 샘플들 $\\cdots, n[k-1], n[k], n[k+1], \\cdots$ 역시 각각 동일한 분포의 평균 0인 가우시안 랜덤 변수들이 된다.
노이즈 샘플들의 상관관계 : 노이즈 리젝션 필터를 통과한 노이즈 샘플들 $\\cdots, n[k-1], n[k], n[k+1], \\cdots$은 서로 독립이다. 다음 과정을 통해 이를 증명해보자.

(a) 자기상관(Autocorrelation)과 PSD의 상관 관계를 쓰고 PSD가 주어지면 자기상관은 어떻게 구할 수 있는지 쓰시오. 그리고 문제 1.B1의 답을 이용하여, 노이즈의 자기상관 $R_n(\\tau)$를 구하시오. (계산 과정 중에 오일러 공식을 이용하여 Sinc 또는 Sin 함수 형태로 정리 할 것.)
(b) (a)의 결과에 따라, 노이즈의 자기상관은 Sinc 함수 형태를 가짐을 상기하자. $k=0$을 제외한 노이즈 샘플 사이의 상관값은 0임을 증명하시오. 즉, $k\\neq0$인 정수일 때, $R_n(k\\times \\text{t\\_step})$임을 증명하시오.
(c) 노이즈의 자기상관함수($R_n(k\\times \\text{t\\_step})$, ($k\\neq0$인 정수))에서 노이즈 샘플 간의 상관이 없다는 것을 볼 수 있는 이유를 쓰시오. 즉, 왜 t_step 간격으로 확인하는지 쓰시오.

(참고. 노이즈 샘플들은 가우시안임을 알고 있다. 따라서, 위 (b)에서 노이즈 샘플들간 상관성이 없음을 증명하였다면, 가우시안 변수의 특성에 의해, 노이즈 샘플들간 서로 독립임을 증명한 것과 같다.)`,
          "referenceAnswer": `(a) 랜덤 프로세스의 자기상관함수와 PSD는 푸리에 변환 관계에 있다.

$$
S_n(f)
=
\\mathcal{F}\\{R_n(\\tau)\\}
$$

따라서 PSD가 주어졌을 때 자기상관함수는 PSD의 역푸리에 변환으로 구할 수 있다.

$$
R_n(\\tau)
=
\\mathcal{F}^{-1}\\{S_n(f)\\}
$$

문제 1.B1에서

$$
S_n(f)=\\frac{N_0}{2}
$$

이고 PSD가 존재하는 주파수 범위는

$$
-\\frac{1}{2\\text{t\\_step}}
\\le f\\le
\\frac{1}{2\\text{t\\_step}}
$$

이므로

$$
R_n(\\tau)
=
\\int_{-\\frac{1}{2\\text{t\\_step}}}^{\\frac{1}{2\\text{t\\_step}}}
\\frac{N_0}{2}e^{j2\\pi f\\tau}df.
$$

적분하면

$$
R_n(\\tau)
=
\\frac{N_0}{2}
\\frac{
\\sin\\left(\\pi\\tau/\\text{t\\_step}\\right)
}{
\\pi\\tau
}
$$

이고, 이를 normalized sinc 함수

$$
\\operatorname{sinc}(x)
=
\\frac{\\sin(\\pi x)}{\\pi x}
$$

를 이용하여 나타내면

$$
\\boxed{
R_n(\\tau)
=
\\frac{N_0}{2\\text{t\\_step}}
\\operatorname{sinc}
\\left(
\\frac{\\tau}{\\text{t\\_step}}
\\right)
}
$$

이다.

(b) 서로 다른 두 노이즈 샘플 사이의 시간 간격은 $k\\times\\text{t\\_step}$이므로

$$
\\tau=k\\times\\text{t\\_step}
$$

을 대입한다.

그러면

$$
R_n(k\\times\\text{t\\_step})
=
\\frac{N_0}{2\\text{t\\_step}}
\\operatorname{sinc}(k).
$$

$k\\neq0$인 정수에 대해

$$
\\operatorname{sinc}(k)
=
\\frac{\\sin(\\pi k)}{\\pi k}
=
0
$$

이므로

$$
\\boxed{
R_n(k\\times\\text{t\\_step})=0,
\\qquad k\\ne0
}
$$

가 된다.

따라서 서로 다른 샘플 시점의 노이즈 샘플들은 서로 상관되어 있지 않다.

(c) 노이즈 신호는 't_step' 간격으로 샘플링되므로 실제 디지털 노이즈 샘플은

$$
n[0],\\ n[1],\\ n[2],\\ldots
$$

와 같이 서로 't_step'만큼 떨어진 시점에서 얻어진다.

따라서 두 노이즈 샘플 사이의 시간 차이는 항상

$$
k\\times\\text{t\\_step}
$$

꼴이다.

이 때문에 연속시간 자기상관함수 $R_n(\\tau)$에서 실제 노이즈 샘플 간의 상관관계를 확인하려면 $\\tau=k\\times\\text{t\\_step}$인 지점의 값을 확인해야 한다.

이 값이 모든 $k\\ne0$에 대해 0이므로 서로 다른 노이즈 샘플 사이에는 상관이 없다.

또한 각 노이즈 샘플은 가우시안 랜덤 변수이므로, 가우시안 변수들의 경우 무상관은 독립을 의미한다. 따라서 노이즈 샘플들은 서로 독립이라고 할 수 있다.`
        },
        {
          "id": "21-1B5",
          "title": "1.B5.",
          "type": "essay",
          "prompt": `노이즈 리젝션 필터를 통과한 노이즈 샘플의 분산에 대해 알아보자. 평균이 0인 일반적인 신호를 가정하자. 일반적으로, 이 신호의 어떤 시간지점에서의 샘플 값의 분산(=샘플 제곱의 앙상블 평균인가 시간 평균인가?)이 이 신호의 전력(=샘플 제곱의 앙상블 평균인가 시간 평균인가?)과 같다고 할 수 없다. 하지만, 우리가 다루는 노이즈의 경우 샘플의 분산은 샘플링 이전의 노이즈(필터출력) 신호 전력(문제 1.B3의 답)과 동일하다. 이는 필터출력 노이즈 신호가 어떤 성질을 만족하는 랜덤 프로세스이기 때문인가?`,
          "referenceAnswer": `필터 출력 노이즈는 정상성(stationarity)을 가지며, 시간 평균과 앙상블 평균을 동일하게 취급할 수 있는 에르고딕(ergodic) 랜덤 프로세스로 다룰 수 있기 때문이다.

평균이 0인 노이즈 샘플 $n(t)$의 분산은

$$
\\sigma_n^2
=
E[n^2(t)]
$$

이고, 이는 자기상관함수의 $\\tau=0$ 값

$$
R_n(0)
=
E[n^2(t)]
$$

과 같다.

한편 필터 출력 노이즈의 평균 전력은

$$
P_n
=
\\int_{-\\infty}^{\\infty}S_n(f)df
=
R_n(0)
$$

이다.

따라서 평균이 0인 이 노이즈에 대해서는

$$
\\boxed{
\\sigma_n^2=P_n
}
$$

가 성립한다.

문제 1.B3에서

$$
P_n
=
\\frac{N_0}{2\\times\\text{t\\_step}}
$$

이므로 노이즈 샘플의 분산 역시

$$
\\boxed{
\\sigma_n^2
=
\\frac{N_0}{2\\times\\text{t\\_step}}
}
$$

이다.`
        },
        { //문제 1.C
          "id": "21-1C",
          "title": "1.C.",
          "type": "python",
          "prompt": `문제 1.B를 정리하면 노이즈 리젝션 필터 후 노이즈 샘플들 $\\cdots, n[k-1], n[k], n[k+1], \\cdots$은 각각 평균이 0이고 분산이 동일한 독립적인 가우시안 랜덤변수들이 된다. 노이즈 샘플의 분산을 나타내는 변수를 ‘v_n’이라 할 때, 문제 1.A의 py 스크립트에 ‘v_n’을 생성하는 문장을 추가하고, ?를 채워 넣으시오.
\`\`\`python
# 문제 1.A의 py 스크립트에 아래를 추가.
v_n = ? # N0와 t_step의 함수
\`\`\``,
          "referenceAnswer": `노이즈 샘플의 분산 'v_n'은 문제 1.B3에서 구한 노이즈 리젝션 필터 출력의 전력과 같다.

따라서

$$
v_n
=
\\frac{N_0}{2\\times\\text{t\\_step}}
$$

이므로 다음과 같이 작성한다.

\`\`\`python
v_n = N0 / (2 * t_step)
\`\`\``
        },
        { //문제 1.D
          "id": "21-1D",
          "title": "1.D.",
          "prompt": `이제 문제 1.C에서 완성한 py 스크립트를 이용해, [그림 21.1]에서 수신 신호의 샘플링 된 벡터(신호와 노이즈를 모두 포함한) $\\cdots, r[k-1], r[k], r[k+1], \\cdots$(Python 변수=‘r_samples’)를 생성할 수 있다. 즉, 아래와 같이, 먼저 [[link:/workbook/ch20?p=20-2B1|20장의 문제 2.B]]의 ‘tx_sig_gen.m’와 동일한 과정을 통하여 신호 샘플 벡터 $\\cdots, s[k-1], s[k], s[k+1], \\cdots$(Python 변수=‘tx_signal’, 아래 참고)를 생성한 후, 동일한 길이의 노이즈 샘플 벡터 $\\cdots, n[k-1], n[k], n[k+1], \\cdots$(Python 변수=‘n_samples’)를 생성한다. 그리고 그 둘을 더하면 된다. 문제 1.C에서 만든 py 스크립트에 아래에 추가하시오.
\`\`\`python
# 문제 1.C의 py 스크립트에 아래를 추가.

# 20장의 tx_sig_gen.py에서 아래 2, 3, 4, 5 부분을 가져와서 추가.
######### <2. Ns bit binary symbol generation> #############
######### <3. Unipolar to Bipolar (amplitude modulation)> ####
######### <4. Impulse modulation> ############################
######### <5. Pulse shaping (Transmitter filtering)> #########

######### <Noise sample 발생 > ################################
n_samples = np.sqrt(v_n) * np.random.randn(len(tx_signal)) # n[k] 생성

######### <수신 신호 샘플 발생> ################################
r_samples = tx_signal + n_samples
\`\`\`
(참고. 일반적으로, 신호(노이즈가 아닌)의 스펙트럼을 왜곡없이 통과시키기 위해 샘플링 주파수는 신호의 대역폭보다 충분히 크게 잡는다. 따라서, 노이즈 리젝션 필터(대역폭=샘플링주파수/2) 통과 후 샘플링된 신호 성분은 노이즈 리젝션 필터를 통과하기 전의 신호 성분과 같다고 가정해도 무방하다.)
`
        },
        {
          "id": "21-1D1",
          "title": "1.D1.",
          "type": "python",
          starterCode: `import numpy as np

######### <Signal pulse design> #############################
Ts = 1
L = 16
t_step = Ts / L
pt = rcosdesign(?, 6, ?, ?) # 채워야 할 부분 (1)
pt = pt / np.sqrt(np.max(np.convolve(pt, pt)))
N = len(pt)

######### <Signal Energy> ###################################
Eb = np.sum(?) * t_step # BPSK, 채워야 할 부분 (2)

######### <N0 setting> ######################################
EbN0dB = 100 # Eb/N0 = 100dB로 주어졌다고 가정.

EbN0 = 10 ** (?) # 채워야 할 부분 (3), 주어진 EbN0dB가 바뀌면 EbN0가 따라서 바뀔 수 있도록 EbN0dB가 들어간 식으로 완성할 것.
N0 = ? # 채워야 할 부분 (4), 주어진 EbN0dB가 바뀌면 N0가 따라서 바뀔 수 있도록 Eb, EbN0가 들어간 식으로 완성할 것.

v_n = ? # N0와 t_step의 함수

# 20장의 tx_sig_gen.py에서 아래 2, 3, 4, 5 부분을 가져와서 추가.
######### <2. Ns bit binary symbol generation> #############
######### <3. Unipolar to Bipolar (amplitude modulation)> ####
######### <4. Impulse modulation> ############################
######### <5. Pulse shaping (Transmitter filtering)> #########

######### <Noise sample 발생 > ################################
n_samples = np.sqrt(v_n) * np.random.randn(len(tx_signal)) # n[k] 생성

######### <수신 신호 샘플 발생> ################################
r_samples = tx_signal + n_samples`,
          "prompt": `py 스크립트를 완성하고, 완성한 py 스크립트를 보이시오.`,
          "referenceAnswer": `완성된 py 스크립트의 한 예는 다음과 같다.

\`\`\`python
import numpy as np

######### <Signal pulse design> #############################
Ts = 1
L = 16
t_step = Ts / L

pt = rcosdesign(0.5, 6, L, 'sqrt')
pt = pt / np.sqrt(np.max(np.convolve(pt, pt)))
N = len(pt)

######### <Signal Energy> ###################################
Eb = np.sum(pt ** 2) * t_step

######### <N0 setting> ######################################
EbN0dB = 100

EbN0 = 10 ** (EbN0dB / 10)
N0 = Eb / EbN0

######### <Noise variance> ###################################
v_n = N0 / (2 * t_step)

######### <2. Ns bit binary symbol generation> #############
Ns = 100
data_bit = (np.random.rand(Ns) > 0.5)

######### <3. Unipolar to Bipolar> ###########################
amp_modulated = 2 * data_bit.astype(int) - 1

######### <4. Impulse modulation> ############################
impulse_modulated = np.array([])

for n in range(Ns):
    delta_signal = np.concatenate(
        ([amp_modulated[n]], np.zeros(L - 1))
    )
    impulse_modulated = np.concatenate(
        (impulse_modulated, delta_signal)
    )

######### <5. Pulse shaping> #################################
tx_signal = np.convolve(impulse_modulated, pt)

######### <Noise sample 발생> ################################
n_samples = np.sqrt(v_n) * np.random.randn(len(tx_signal))

######### <수신 신호 샘플 발생> ###############################
r_samples = tx_signal + n_samples
\`\`\`

여기서 'n_samples'는 'tx_signal'과 동일한 개수의 독립적인 가우시안 노이즈 샘플을 생성하며, 'r_samples'는 송신 신호와 AWGN이 더해진 수신 신호의 샘플 벡터이다.`
        },
        {
          "id": "21-1D2",
          "title": "1.D2.",
          "type": "essay",
          "prompt": `노이즈 샘플 발생 라인에서 ‘sqrt(v_n)’을 곱한 이유를 쓰시오.`,
          "referenceAnswer": `'np.random.randn()'으로 생성되는 각 랜덤 변수는 평균이 0이고 분산이 1인 표준 정규분포를 따른다.

즉,

$$
X\\sim\\mathcal{N}(0,1)
$$

이다.

랜덤 변수에 상수 $a$를 곱하면 분산은 $a^2$배가 되므로

$$
\\mathrm{Var}(aX)
=
a^2\\mathrm{Var}(X)
$$

이다.

노이즈 샘플의 목표 분산은 'v_n'이므로

$$
a^2=v_n
$$

을 만족해야 하며,

$$
a=\\sqrt{v_n}
$$

가 된다.

따라서

\`\`\`python
n_samples = np.sqrt(v_n) * np.random.randn(len(tx_signal))
\`\`\`

와 같이 작성하면 각 노이즈 샘플은

$$
n[k]\\sim\\mathcal{N}(0,v_n)
$$

을 만족한다.

즉, 'sqrt(v_n)'을 곱하는 이유는 표준 정규분포의 분산 1을 원하는 노이즈 분산 'v_n'으로 조정하기 위해서이다.`
        }
      ]
    },
    { //문제 2
      "id": "21-2",
      "title": "2. 정합 필터링, 판별 변수 생성 및 검출",
      "problems": [
        { //문제 2.A
          "id": "21-2A",
          "title": "2.A.",
          "type": "python",
          "prompt": `문제 1의 py 스크립트는 [그림 21.1]의 수신신호의 샘플 백터 $\\cdots, r[k-1], r[k], r[k+1], \\cdots$를 생성하는 것까지 구현한 것이다. [그림 21.1]의 우측(샘플링 후)은 샘플링된 신호에 대한 정합 필터(Matched filter)의 과정이다.
          
문제 1.D1에서 완성한 py 스크립트를 복사하여 붙여넣은 후, 아래와 같이 정합 필터의 출력 샘플 벡터 $\\cdots, z[k-1], z[k], z[k+1], \\cdots$(Python 변수 = ‘z_samples’)을 생성하는 라인을 추가하시오. 적절한 Python의 numpy 함수와 변수 이름을 넣어 완성하시오. ([[link:/workbook/ch20?p=20-3B|20장의 문제 3.B]] 참고)
\`\`\`python
z_samples = np.??(r_samples, ??)
\`\`\``,
          // 21-2A
"referenceAnswer": `정합 필터의 출력은 수신 신호 샘플 벡터 'r_samples'와 펄스 'pt'의 convolution으로 구한다.

따라서 다음과 같이 작성한다.

\`\`\`python
z_samples = np.convolve(r_samples, pt)
\`\`\`

SRRC 펄스는 실수이며 대칭이므로 정합 필터의 임펄스 응답 $p^*(-t)$가 현재 사용한 'pt'와 동일하다.`
        },
        { //문제 2.B
          "id": "21-2B",
          "title": "2.B.",
          "type": "python",
          consoleEnabled: true,
          "prompt": `‘z_samples’와 ‘impulse_ modulated’를 관찰하기 위해 문제 2.A에서 완성한 py 스크립트를 실행하고, 아래를 Console에서 실행하자. 결과 그래프를 확인하시오.
\`\`\`python
>>> import matplotlib.pyplot as plt
>>> plt.figure()
>>> plt.subplot(2, 1, 1)
>>> plt.stem(impulse_modulated[:20 * L], markerfmt='.')
>>> plt.grid()
>>> plt.subplot(2, 1, 2)
>>> plt.plot(z_samples[:20 * L])
>>> plt.grid()
>>> plt.tight_layout()
\`\`\``,
          // 21-2B
"referenceAnswer": `첫 번째 그래프에는 송신 심벌을 L개의 샘플 간격으로 배치한 'impulse_modulated'가 나타난다.

두 번째 그래프에는 송신 SRRC 펄스 성형과 수신 SRRC 정합 필터링을 모두 거친 'z_samples'가 나타난다.

'z_samples'는 'impulse_modulated'에 비해 일정한 샘플만큼 지연되어 나타나며, 이후 문제에서는 이 지연량을 이용하여 올바른 심벌 판별 시점을 결정한다.`
        },
        { //문제 2.C
          "id": "21-2C",
          "title": "2.C.",
          "type": "python",
          consoleEnabled: true,
          "prompt": `Py 스크립트의 ‘N=length(pt)’ 라인을 보면, 변수 ‘N’은 펄스 성형 필터(이자 정합 필터)의 샘플 벡터인 ‘pt’의 길이로 설정되어 있다. Console에서 ‘>> N’을 실행하여 ‘N’ 값을 확인하시오.`,
          // 21-2C
"referenceAnswer": `'pt'는

\`\`\`python
pt = rcosdesign(0.5, 6, L, 'sqrt')
\`\`\`

로 생성되며, span이 6심벌이고 심벌당 샘플 수가 $L=16$이므로 샘플 개수는

$$
N=6L+1
$$

이다.

따라서

$$
N=6\\times16+1=97
$$

이므로 Console에서

\`\`\`python
>>> N
\`\`\`

을 실행하면

\`\`\`
97
\`\`\`

이 출력된다.`
        },
        { //문제 2.D
          "id": "21-2D",
          "title": "2.D.",
          "type": "essay",
          "prompt": `문제 2.B 과정에서 얻어진 그림으로부터, ‘z_samples’과 ‘impulse_modulated’ 사이에 발생한 지연(delay)이 몇 샘플인지 카운트하시오. 아래 1~3의 답을 참고하여 답을 구하시오.

1. ‘>> plt.plot(pt)’를 수행하여 ‘pt’의 최고점(중앙)은 몇 번째 샘플인지 확인하시오. 
2. [그림 21.1]의 우측(샘플링 이후)은 정합 필터 과정을 나타낸 것으로, 입력과 ‘pt’와의 콘볼루션 과정을 보인 것이다. 따라서 필터 계수 c[0]=‘pt(N)’, c[1] = ‘pt(N-1)’, ...., c[N-2] = ‘pt(2)’, c[N-1] = ‘pt(1)’이 된다. Delay line의 초기값이 0이라 가정하고 필터에 1,0,0,0,0,0... 이 입력되면 출력에서 ‘pt’의 최대값(중앙)이 나오는 순간은 몇 샘플 클록 후가 되겠는가? 즉, 콘볼루션 연산 ‘np.convolve([1, 0, 0, 0, 0, ...], pt)’를 수행하면 ‘pt’의 최대값(중앙)이 출력 신호의 몇 번째 샘플에 존재하는가?
3. 송신기와 수신기에서, ‘impulse_modulated’는 ‘z_samples’가 되기까지 ‘pt’와 몇 번 콘볼루션되었는지? 

지연된 샘플수가 ‘N’(문제 2.C의 답)과 동일한가?`,
          // 21-2D
"referenceAnswer": `SRRC 펄스 'pt'의 길이는 $N=97$이고, 중앙의 최대값은 Python 인덱스로 48번, 사람이 세는 샘플 순서로는 49번째 샘플에 위치한다.

송신단에서는 'impulse_modulated'가 'pt'와 한 번 convolution되어 'tx_signal'이 되고,

$$
\\text{impulse\\_modulated}
\\rightarrow
\\text{tx\\_signal}
$$

수신단에서는 다시 'pt'와 convolution되어 'z_samples'가 된다.

$$
\\text{tx\\_signal}
\\rightarrow
\\text{z\\_samples}
$$

따라서 'impulse_modulated'는 'z_samples'가 되기까지 SRRC 펄스와 총 2번 convolution된다.

한 번의 길이 $N=97$인 대칭 FIR 펄스의 group delay는

$$
\\frac{N-1}{2}
=
48
$$

샘플이다.

송신 필터와 수신 정합 필터를 모두 통과하므로 전체 지연은

$$
48+48=96
$$

샘플이다.

즉, Python 배열에서는 첫 번째 심벌의 최대 출력이 인덱스 96에 위치하며, 이것은 사람이 세는 샘플 번호로는 97번째이다.

따라서 지연 위치는 $N=97$번째 샘플에 해당한다.`
        },
        { //문제 2.E
          "id": "21-2E",
          "title": "2.E.",
          "type": "essay",
          "prompt": `비트당 샘플수 ‘L’과 ‘z_samples’과 ‘impulse_modulated’ 사이에 발생한 지연 ‘N’으로부터, ‘z_samples[(N-1)+(n-1)*L]’ 값이 ‘n’번째 송신 비트 ‘data_bit[n]’의 판별변수(decision variable 또는 test statistics)가 됨을 알 수 있다. 다시 말해, ‘z_samples[(N-1)+(n-1)*L]’ 값을 근거로 ‘data_bit[n]’을 추정한다. ‘z_samples’의 샘플 인덱스를 ‘(N-1)+(n-1)*L’ 로 두는 이유를 설명하시오.`,
          // 21-2E
"referenceAnswer": `송신 심벌은 L개의 샘플 간격으로 배치되어 있으므로, 인접한 두 심벌의 판별 시점도 $L$ 샘플씩 떨어져 있다.

또한 송신 SRRC 필터와 수신 정합 필터를 통과하면서 첫 번째 심벌의 최적 판별 시점은 Python 배열에서

$$
N-1
$$

번 인덱스에 위치한다.

따라서 $n$번째 심벌의 판별 위치는

$$
(N-1)+(n-1)L
$$

이 된다.

즉,

\`\`\`python
z_samples[(N - 1) + (n - 1) * L]
\`\`\`

은 $n$번째 송신 비트에 대응하는 정합 필터 출력의 최적 샘플링 값이다.

이 위치는 SRRC 송신 필터와 SRRC 정합 필터의 전체 응답이 Raised Cosine이 되어 eye가 가장 크게 열리는 심벌 중심에 해당한다.`
        },
        { //문제 2.F
          "id": "21-2F",
          "title": "2.F.",
          "type": "essay",
          "prompt": `아래 명령어를 Console에서 실행하면, 문제 2.E의 판별 변수를 이용하여 ‘data bit’의 처음 5비트를 검출(예측)결과를 얻을 수 있다.
\`\`\`python
>>> estimated_data_bit = np.zeros(5, dtype=bool)
>>> estimated_data_bit[0] = (z_samples[(N - 1) + (1 - 1) * L] > 0)
>>> estimated_data_bit[1] = (z_samples[(N - 1) + (2 - 1) * L] > 0)
>>> estimated_data_bit[2] = (z_samples[(N - 1) + (3 - 1) * L] > 0)
>>> estimated_data_bit[3] = (z_samples[(N - 1) + (4 - 1) * L] > 0)
>>> estimated_data_bit[4] = (z_samples[(N - 1) + (5 - 1) * L] > 0)
>>> estimated_data_bit
>>> data_bit[:5]
\`\`\`
예를 들어, ‘n’번째 비트에 대한 검출(예측) 값을 ‘(z_samples[(N - 1) + (n - 1) * L] > 0)’로 하는 이유를 쓰시오. (‘tx_sig_gen.py’의 <3. Unipolar to Bipolar (amplitude modulation)> 부분 참고)`,
          // 21-2F
"referenceAnswer": `BPSK에서는 송신 비트가 다음과 같이 bipolar 심벌로 변환된다.

$$
0\\rightarrow -1
$$

$$
1\\rightarrow +1
$$

정합 필터 출력의 올바른 판별 시점에서는 송신 비트가 1이면 양의 값, 0이면 음의 값이 나타난다.

따라서 $n$번째 비트의 판별 변수

\`\`\`python
z_samples[(N - 1) + (n - 1) * L]
\`\`\`

가 0보다 크면 비트 1로, 0보다 작으면 비트 0으로 판별하면 된다.

즉,

\`\`\`python
z_samples[(N - 1) + (n - 1) * L] > 0
\`\`\`

이라는 비교 결과가 각각 True 또는 False가 되고, 이는 BPSK의 비트 1 또는 비트 0에 대응한다.`
        },
        { //문제 2.G
          "id": "21-2G",
          "title": "2.G.",
          "type": "python",
          consoleEnabled: true,
          "prompt": `아래 문제 2.F의 명령어를 실행하여 출력된 결과를 확인하시오.
\`\`\`python
>>> estimated_data_bit = np.zeros(5, dtype=bool)
>>> estimated_data_bit[0] = (z_samples[(N - 1) + (1 - 1) * L] > 0)
>>> estimated_data_bit[1] = (z_samples[(N - 1) + (2 - 1) * L] > 0)
>>> estimated_data_bit[2] = (z_samples[(N - 1) + (3 - 1) * L] > 0)
>>> estimated_data_bit[3] = (z_samples[(N - 1) + (4 - 1) * L] > 0)
>>> estimated_data_bit[4] = (z_samples[(N - 1) + (5 - 1) * L] > 0)
>>> estimated_data_bit
>>> data_bit[:5]
\`\`\`
‘estimated_data_bit’가 ‘data_bit[:5]’와 동일한가?`,
          // 21-2G
"referenceAnswer": `현재 $E_b/N_0=100$ dB로 매우 큰 값이 설정되어 있으므로 노이즈의 영향은 거의 없다.

따라서 정상적으로 구현되었다면

\`\`\`python
estimated_data_bit
\`\`\`

와

\`\`\`python
data_bit[:5]
\`\`\`

의 값은 동일하게 나타난다.

단, 'data_bit'는 랜덤하게 생성되므로 실제 True/False 배열의 구체적인 값은 실행할 때마다 달라질 수 있다.`
        },
        { //문제 2.H
          "id": "21-2H",
          "title": "2.H.",
          "prompt": `아래 코드를 통해 ‘data_bit’ 벡터의 ‘Ns’개의 모든 비트들을 검출할 수 있다. 문제 2.A의 py 스크립트에 아래를 추가하시오.
\`\`\`python
# 문제 2.A의 py 스크립트에 아래를 추가.
estimated_data_bit = np.zeros(Ns, dtype=bool)
for k in range(Ns):
    estimated_data_bit[k] = (z_samples[(N - 1) + k * L] > 0)

# 또는 for 반복문을 쓰지 않고 벡터 단위로 한 줄로 구현하는 것도 가능하다.
estimated_data_bit = (z_samples[(N - 1) + np.arange(Ns) * L] > 0)
\`\`\``,
          // 21-2H
"referenceAnswer": `for 반복문을 사용하는 경우 Python에서는 'k'가 0부터 시작하므로 다음과 같이 작성한다.

\`\`\`python
estimated_data_bit = np.zeros(Ns, dtype=bool)

for k in range(Ns):
    estimated_data_bit[k] = (
        z_samples[(N - 1) + k * L] > 0
    )
\`\`\`

또는 NumPy의 벡터 인덱싱을 사용하면 모든 비트를 한 줄로 검출할 수 있다.

\`\`\`python
estimated_data_bit = (
    z_samples[(N - 1) + np.arange(Ns) * L] > 0
)
\`\`\`

'np.arange(Ns)'는

$$
0,1,2,\\ldots,N_s-1
$$

을 생성하므로 판별 위치는

$$
N-1,\\;
N-1+L,\\;
N-1+2L,\\ldots
$$

이 된다.`
        },
        {
          "id": "21-2H1",
          "title": "2.H1.",
          "type": "python",
          consoleEnabled: true,
          "prompt": `py 스크립트를 실행한 후, Console에서 ‘>>> np.sum(estimated_data_bit != data_bit)’를 실행 후 결과를 확인하시오.`,
          // 21-2H1
"referenceAnswer": `다음 명령은 추정한 비트와 실제 송신 비트를 원소별로 비교한 후 서로 다른 비트의 개수를 계산한다.

\`\`\`python
np.sum(estimated_data_bit != data_bit)
\`\`\`

현재 $E_b/N_0=100$ dB이므로 정상적으로 구현되었다면 일반적으로 결과는

\`\`\`
0
\`\`\`

이 된다.`
        },
        {
          "id": "21-2H2",
          "title": "2.H2.",
          "type": "essay",
          "prompt": `문제 2.H1의 결과는 비트 검출 에러가 없음을 의미하는가? 자신의 답에 대한 이유도 쓰시오.`,
          // 21-2H2
"referenceAnswer": `문제 2.H1의 결과가 0이라면, 이번 시뮬레이션에서 전송한 'Ns'개의 비트에 대해서는 검출 오류가 발생하지 않았음을 의미한다.

이는

\`\`\`python
estimated_data_bit != data_bit
\`\`\`

가 두 배열의 각 비트를 비교하여 서로 다른 위치를 True로 만들고,

\`\`\`python
np.sum(...)
\`\`\`

이 그 True의 개수를 세기 때문이다.

따라서 결과가 0이면 이번에 전송한 비트 중 잘못 검출된 비트가 0개라는 의미이다.

다만 이것이 이 시스템의 BER이 항상 정확히 0이라는 의미는 아니다. 현재 $E_b/N_0=100$ dB로 매우 높고, 유한한 개수의 비트만 실험했기 때문에 이번 시행에서 오류가 관찰되지 않은 것이다. 충분히 많은 비트를 전송하거나 더 낮은 $E_b/N_0$에서 실험하면 비트 오류가 발생할 수 있다.`
        },
      ]
    },
    { //문제 3
      "id": "21-3",
      "title": "3. BER 시뮬레이션 전체 루프 완성",
      "problems": [
        { //문제 3.A
          "id": "21-3A",
          "title": "3.A.",
          "prompt": `이제 나머지 단계(문제 1 앞 부분에서 설명한 순서 중 Step 8, Step9)를 마저 구현하여 BER 커브를 그리는 시뮬레이션을 완성해보자.
          
Step 8을 구현하자. 아래의 개념적인 py 스크립트를 토대로 하여 우선, $E_b/N_0=0$dB일 때, BER 시뮬레이션 py 스크립트를 완성하자.
\`\`\`python
# 문제 1.C의 py 스크립트에 아래를 추가. (주의. EbN0dB=0으로 설정)

sum_Ne = 0 # 전체 에러 수 초기화
N_frame = 20 # 실험할 프레임 수

######### <Step 8> ###########################################
for frame_number in range(N_frame):

    ######### <Step 7> #######################################
    # 아래와 같이 문제 1.D, 2.A, 2.H에서 추가된 부분 삽입
    ######### <Ns bit binary symbol generation> #############
    ######### <Unipolar to Bipolar> ###########################
    ######### <Impulse modulation> ############################
    ######### <Pulse shaping> #################################

    ######### <Noise sample 발생> #############################
    n_samples = np.sqrt(v_n) * np.random.randn(len(tx_signal)) #..., n[k-1], n[k], n[k+1], ... 생성

    ######### <수신 신호 샘플 발생> ###########################
    r_samples = tx_signal + n_samples

    z_samples = np.convolve(r_samples, pt) #정합 필터

    estimated_data_bit = (z_samples[(N - 1) + np.arange(Ns) * L] > 0) # 문제 2.H에서 구현한 데이터 비트 추정

    ######### <Error counting> ################################
    Ne = np.sum(estimated_data_bit != data_bit) # ?
    sum_Ne = sum_Ne + Ne # ?

######### <BER calculation> ##################################
# BER = 전체 비트 에러 발생 개수 / 전송된 전체 비트 수
Total_bit = ? * ?
BER = sum_Ne / Total_bit
\`\`\`
          `,
        },
        {
          "id": "21-3A1",
          "title": "3.A1.",
          "type": "essay",
          "prompt": `한 프레임 동안 보내지는 비트수는 얼마인가? 위 py 스크립트에서 수행되는 총 프레임 수는 얼마인가? 결국 위 py 스크립트를 통해 전송되는 비트수는 얼마인가?`,
          // 21-3A1
"referenceAnswer": `한 프레임에서 전송하는 비트 수는 변수 'Ns'에 저장된 값이다.

즉,

$$
N_{\\text{bit, frame}}=N_s
$$

이다.

현재 실습에서 $N_s=100$으로 설정하였다면 한 프레임당 100비트를 전송한다.

또한

\`\`\`python
N_frame = 20
\`\`\`

이므로 총 20개의 프레임을 실험한다.

따라서 전체 전송 비트 수는

$$
N_{\\text{total}}
=
N_s\\times N_{\\text{frame}}
$$

이다.

현재 $N_s=100$, $N_{\\text{frame}}=20$이라면

$$
N_{\\text{total}}
=
100\\times20
=
2000
$$

비트를 전송한다.`
        },
        {
          "id": "21-3A2",
          "title": "3.A2.",
          "type": "essay",
          "prompt": `Step 8을 위해 ‘for’ 루프내부에 추가된 다음의 두 라인의 동작을 설명하시오.
\`\`\`python
Ne = np.sum(estimated_data_bit != data_bit) # ?
sum_Ne = sum_Ne + Ne # ?
\`\`\``,
          // 21-3A2
"referenceAnswer": `첫 번째 줄

\`\`\`python
Ne = np.sum(estimated_data_bit != data_bit)
\`\`\`

은 현재 한 프레임에서 추정한 비트 'estimated_data_bit'와 실제 송신 비트 'data_bit'를 원소별로 비교한다.

서로 다른 위치에서는

\`\`\`python
estimated_data_bit != data_bit
\`\`\`

의 결과가 True가 되고, 'np.sum()'은 이러한 True의 개수를 세므로 'Ne'에는 현재 프레임에서 발생한 비트 오류 개수가 저장된다.

두 번째 줄

\`\`\`python
sum_Ne = sum_Ne + Ne
\`\`\`

은 현재 프레임의 오류 개수 'Ne'를 이전 프레임들에서 누적된 오류 개수 'sum_Ne'에 더한다.

따라서 모든 프레임의 반복이 끝난 후 'sum_Ne'에는 전체 실험에서 발생한 비트 오류의 총 개수가 저장된다.`
        },
        {
          "id": "21-3A3",
          "title": "3.A3.",
          "type": "essay",
          "prompt": `라인 ‘Total_bit = ? * ?’의 ?에 들어가야 할 것들이 무엇인지 이유와 함께 쓰시오. (‘Total_bit’는 상수가 아니라 반드시 변수 ‘Ns’와 ‘N_frame’의 함수로 표현되어야 함)`,
          // 21-3A3
"referenceAnswer": `한 프레임에서 'Ns'개의 비트를 전송하고 총 'N_frame'개의 프레임을 실험하므로 전체 전송 비트 수는

$$
\\text{Total\\_bit}
=
N_s\\times N_{\\text{frame}}
$$

이다.

따라서 빈칸은 다음과 같이 채운다.

\`\`\`python
Total_bit = Ns * N_frame
\`\`\`

BER은 전체 오류 비트 수를 전체 전송 비트 수로 나누어 계산하므로

\`\`\`python
BER = sum_Ne / Total_bit
\`\`\`

가 된다.`
        },
        {
          "id": "21-3A4",
          "title": "3.A4.",
          "type": "python",
          starterCode: `import numpy as np

######### <Signal pulse design> #############################
Ts = 1
L = 16
t_step = Ts / L
pt = rcosdesign(?, 6, ?, ?) # 채워야 할 부분 (1)
pt = pt / np.sqrt(np.max(np.convolve(pt, pt)))
N = len(pt)

######### <Signal Energy> ###################################
Eb = np.sum(?) * t_step # BPSK, 채워야 할 부분 (2)

######### <N0 setting> ######################################
EbN0dB = 0

EbN0 = 10 ** (?) # 채워야 할 부분 (3), 주어진 EbN0dB가 바뀌면 EbN0가 따라서 바뀔 수 있도록 EbN0dB가 들어간 식으로 완성할 것.
N0 = ? # 채워야 할 부분 (4), 주어진 EbN0dB가 바뀌면 N0가 따라서 바뀔 수 있도록 Eb, EbN0가 들어간 식으로 완성할 것.

v_n = ? # N0와 t_step의 함수

sum_Ne = 0 # 전체 에러 수 초기화
N_frame = 20 # 실험할 프레임 수

######### <Step 8> ###########################################
for frame_number in range(N_frame):

    ######### <Step 7> #######################################
    # 아래와 같이 문제 1.D, 2.A, 2.H에서 추가된 부분 삽입
    ######### <Ns bit binary symbol generation> #############
    ######### <Unipolar to Bipolar> ###########################
    ######### <Impulse modulation> ############################
    ######### <Pulse shaping> #################################

    ######### <Noise sample 발생> #############################
    n_samples = np.sqrt(v_n) * np.random.randn(len(tx_signal)) #..., n[k-1], n[k], n[k+1], ... 생성

    ######### <수신 신호 샘플 발생> ###########################
    r_samples = tx_signal + n_samples

    z_samples = np.convolve(r_samples, pt) #정합 필터

    estimated_data_bit = (z_samples[(N - 1) + np.arange(Ns) * L] > 0) # 문제 2.H에서 구현한 데이터 비트 추정

    ######### <Error counting> ################################
    Ne = np.sum(estimated_data_bit != data_bit) # ?
    sum_Ne = sum_Ne + Ne # ?

######### <BER calculation> ##################################
# BER = 전체 비트 에러 발생 개수 / 전송된 전체 비트 수
Total_bit = ? * ?
BER = sum_Ne / Total_bit
print(BER)`,
          "prompt": `py 스크립트를 완성하고, 수행하여 얻은 BER 결과를 확인하시오.`,
          // 21-3A4
"referenceAnswer": `주요 빈칸과 Step 7을 완성하면 다음과 같다.

\`\`\`python
import numpy as np

######### <Signal pulse design> #############################
Ts = 1
L = 16
t_step = Ts / L

pt = rcosdesign(0.5, 6, L, 'sqrt')
pt = pt / np.sqrt(np.max(np.convolve(pt, pt)))
N = len(pt)

######### <Signal Energy> ###################################
Eb = np.sum(pt ** 2) * t_step

######### <N0 setting> ######################################
EbN0dB = 0

EbN0 = 10 ** (EbN0dB / 10)
N0 = Eb / EbN0

v_n = N0 / (2 * t_step)

sum_Ne = 0
N_frame = 20

######### <Step 8> ###########################################
for frame_number in range(N_frame):

    ######### <Ns bit binary symbol generation> #############
    Ns = 100
    data_bit = (np.random.rand(Ns) > 0.5)

    ######### <Unipolar to Bipolar> ###########################
    amp_modulated = 2 * data_bit.astype(int) - 1

    ######### <Impulse modulation> ############################
    impulse_modulated = np.array([])

    for n in range(Ns):
        delta_signal = np.concatenate(
            ([amp_modulated[n]], np.zeros(L - 1))
        )
        impulse_modulated = np.concatenate(
            (impulse_modulated, delta_signal)
        )

    ######### <Pulse shaping> #################################
    tx_signal = np.convolve(impulse_modulated, pt)

    ######### <Noise sample 발생> #############################
    n_samples = np.sqrt(v_n) * np.random.randn(len(tx_signal))

    ######### <수신 신호 샘플 발생> ###########################
    r_samples = tx_signal + n_samples

    ######### <Matched filtering> #############################
    z_samples = np.convolve(r_samples, pt)

    ######### <Bit detection> #################################
    estimated_data_bit = (
        z_samples[(N - 1) + np.arange(Ns) * L] > 0
    )

    ######### <Error counting> ################################
    Ne = np.sum(estimated_data_bit != data_bit)
    sum_Ne = sum_Ne + Ne

######### <BER calculation> ##################################
Total_bit = Ns * N_frame
BER = sum_Ne / Total_bit
print(BER)
\`\`\`

$E_b/N_0=0$ dB에서 실행할 때 랜덤 비트와 랜덤 노이즈를 사용하므로 실제 'BER' 값은 실행할 때마다 조금씩 달라질 수 있다.`
        },
        { //문제 3.B
          "id": "21-3B",
          "title": "3.B.",
          "prompt": `문제 3.A4에서 얻은 시뮬레이션 BER 결과와 BPSK의 이론치 BER이 같은지 확인해보자.`
        },
        {
          "id": "21-3B1",
          "title": "3.B1.",
          "type": "python",
          consoleEnabled: true,
          "prompt": `Q 함수 형태로 주어지는 이론치 BPSK BER은 ‘erfc()’를 사용해 구할 수 있다.
\`\`\`python
from scipy.special import erfc
BER_exact = 0.5 * erfc(?)
\`\`\`
(a) 이론치 BER을 계산하는 ‘BER_exact’의 ‘?’를 ‘EbN0’의 함수로 채우시오.
(b) 완성된 명령어를 Console에서 실행하고, 결과를 확인하시오.
          `,
          // 21-3B1
"referenceAnswer": `BPSK의 이론적인 BER은

$$
P_b
=
Q\\left(\\sqrt{\\frac{2E_b}{N_0}}\\right)
$$

이다.

Q 함수와 erfc 함수의 관계

$$
Q(x)
=
\\frac{1}{2}
\\operatorname{erfc}
\\left(
\\frac{x}{\\sqrt{2}}
\\right)
$$

를 이용하면

$$
P_b
=
\\frac{1}{2}
\\operatorname{erfc}
\\left(
\\sqrt{\\frac{E_b}{N_0}}
\\right)
$$

가 된다.

따라서 Python에서는 다음과 같이 계산한다.

\`\`\`python
from scipy.special import erfc
BER_exact = 0.5 * erfc(np.sqrt(EbN0))
\`\`\`

$E_b/N_0=0$ dB이면 linear scale에서

$$
E_b/N_0=1
$$

이므로 이론적인 BER은 약

$$
BER_{exact}\\approx0.07865
$$

이다.`
        },
        {
          "id": "21-3B2",
          "title": "3.B2.",
          "type": "essay",
          "prompt": `시뮬레이션 BER과 이론치 BER이 일치하는지 확인하시오.`,
          // 21-3B2
"referenceAnswer": `시뮬레이션으로 얻은 BER은 이론적인 BPSK BER과 완전히 같은 숫자가 되지는 않지만, 충분한 비트를 전송하였다면 이론값에 가까운 값을 얻어야 한다.

$E_b/N_0=0$ dB에서 이론적인 BPSK BER은 약

$$
0.07865
$$

이다.

따라서 문제 3.A4에서 얻은 시뮬레이션 BER이 이 값과 비슷하다면 시뮬레이션 결과와 이론적인 BER이 대체로 일치한다고 판단할 수 있다.

두 값이 정확하게 동일하지 않은 것은 BER 시뮬레이션이 유한한 개수의 랜덤 비트와 랜덤 노이즈를 사용한 통계적인 실험이기 때문이다.`
        },
        { //문제 3.C
          "id": "21-3C",
          "title": "3.C.",
          "prompt": `‘EbN0dB = 9’로 설정하여 문제 3.A4의 py 스크립트를 다시 실행하시오. 실행이 끝나면, Console에서 문제 3.B1의 명령어를 다시 수행하시오.`
        },
        {
          "id": "21-3C1",
          "title": "3.C1.",
          "type": "python",
          consoleEnabled: true,
          "prompt": `시뮬레이션 BER과 이론치 BER을 구한 결과를 확인하시오. 시뮬레이션 BER과 이론치 BER이 같은지 확인하시오.`,
          // 21-3C1
"referenceAnswer": `$E_b/N_0=9$ dB에서 시뮬레이션 BER과 이론적인 BER을 각각 확인한다.

이론적인 BER은

\`\`\`python
BER_exact = 0.5 * erfc(np.sqrt(EbN0))
\`\`\`

으로 구한다.

$E_b/N_0=9$ dB에서는 BER이 매우 작기 때문에, 단지 20개의 프레임만 사용하는 시뮬레이션에서는 비트 오류가 거의 또는 전혀 발생하지 않을 수 있다.

따라서 시뮬레이션 BER이 0으로 계산되거나 이론적인 BER과 상당한 차이를 보일 수 있다.`
        },
        {
          "id": "21-3C2",
          "title": "3.C2.",
          "type": "essay",
          "prompt": `두 BER이 같지 않다면 무엇이 문제인지 분석하여 쓰시오.`,
          // 21-3C2
"referenceAnswer": `$E_b/N_0=9$ dB에서는 실제 BER이 매우 작다.

그런데 현재 시뮬레이션에서는

\`\`\`python
N_frame = 20
\`\`\`

으로 고정되어 있어 전송하는 전체 비트 수가 충분히 많지 않다.

BER이 작은 환경에서는 오류가 매우 드물게 발생하므로, 적은 비트만 전송하면 우연히 오류가 한 번도 발생하지 않아

$$
BER=0
$$

으로 계산될 수도 있다.

즉, 문제는 이론식이 잘못된 것이 아니라 **BER이 매우 작은 환경에서 통계적으로 신뢰할 수 있는 BER을 추정하기에 실험한 비트 수가 부족한 것**이다.

따라서 높은 $E_b/N_0$에서는 충분한 수의 비트 오류가 관찰될 때까지 더 많은 프레임을 반복하여 실험할 필요가 있다.`
        },
        { //문제 3.D
          "id": "21-3D",
          "title": "3.D.",
          "prompt": `문제 3.C에서 작성한 BER 시뮬레이션 py 스크립트에서 ‘for’ 루프를 ‘while’ 루프로 바꾸어 전체 비트 에러 발생 개수가 25보다 크면 반복(loop)를 멈추도록 수정하자.
\`\`\`python
# 문제 3.C의 py 스크립트에서 ‘for’ 루프 앞에 있는 부분은 모두 그대로 두되, ‘N_frame=20’ 라인 만 아래와 같이 수정

N_frame = 0 # frame 개수 카운트 변수 초기화

# ‘for’ 루프를 아래와 같이 수정
while ? < 25:
    # ‘for’ 루프 내부의 모든 코드는 그대로 두고, 아래와 같이 실험한 frame 수를 계산하는 라인을 추가
    N_frame += 1

######### <BER calculation> ##################################
from scipy.special import erfc

Total_bit = ? * ? # 문제 3.A3의 답과 동일
BER = sum_Ne / Total_bit
BER_exact = 0.5 * erfc(?) # 문제 3.B1 (a)의 답과 동일
print("BER= ", BER)
print("BER_exact= ", BER_exact)
\`\`\``
        },
        {
          "id": "21-3D1",
          "title": "3.D1.",
          "type" : "essay",
          "prompt": `수정된 m-file을 실행하면, 오류 비트 수가 25보다 커질 경우 실행이 종료되게 하고자 한다. ‘while ? < 25’ 라인에서 ?에 들어갈 알맞은 변수는 무엇인가?`,
          // 21-3D1
"referenceAnswer": `반복을 종료하는 기준은 지금까지 발생한 전체 비트 오류 개수이다.

전체 비트 오류 개수를 저장하는 변수는

\`\`\`python
sum_Ne
\`\`\`

이므로 다음과 같이 작성한다.

\`\`\`python
while sum_Ne < 25:
\`\`\`

반복 과정에서 각 프레임의 오류 개수 'Ne'가 'sum_Ne'에 누적되고, 'sum_Ne'가 25 이상이 되면 반복이 종료된다.`
        },
        {
          "id": "21-3D2",
          "title": "3.D2.",
          "type" : "python",
          "prompt": `‘EbN0dB’=9인 상태를 유지한 채로 수정한 py 스크립트를 다시 실행하고 시뮬레이션 BER과 이론치 BER이 같은지 보이시오.`,
          // 21-3D2
"referenceAnswer": `$E_b/N_0=9$ dB에서도

\`\`\`python
while sum_Ne < 25:
\`\`\`

를 사용하면 전체 오류 개수가 적어도 25개 정도 관찰될 때까지 새로운 프레임을 계속 생성하여 BER을 측정한다.

따라서 고정된 20개 프레임만 사용했던 문제 3.C보다 훨씬 많은 비트를 실험하게 되고, 시뮬레이션 BER이 BPSK의 이론적인 BER에 더 가까워진다.

BER 계산은

\`\`\`python
Total_bit = Ns * N_frame
BER = sum_Ne / Total_bit

from scipy.special import erfc
BER_exact = 0.5 * erfc(np.sqrt(EbN0))
\`\`\`

로 수행한다.

랜덤 시뮬레이션이므로 두 값이 정확하게 같지는 않지만, 문제 3.C보다 훨씬 유사한 결과가 나타나야 한다.`
        },
        {
          "id": "21-3D3",
          "title": "3.D3.",
          "type" : "essay",
          "prompt": `문제 3.C의 시뮬레이션 BER이 잘못된 문제점이 문제 3.D2에서 해결된 이유는 시뮬레이션에 사용한 frame의 수가 충분히 크기 때문이다. 문제 3.D2의 py 스크립트에서, frame 수를 더 큰 수로 지정한 적이 없음에도 불구하고 시뮬레이션에 사용한 frame의 수가 커진 이유는 무엇인가?`,
          // 21-3D3
"referenceAnswer": `문제 3.D에서는 프레임 수를 미리 큰 값으로 지정하지 않고

\`\`\`python
N_frame = 0
\`\`\`

으로 시작한다.

대신

\`\`\`python
while sum_Ne < 25:
\`\`\`

조건을 사용하여 전체 오류 개수가 25개 이상 발생할 때까지 새로운 프레임을 계속 실험한다.

그리고 매 반복마다

\`\`\`python
N_frame += 1
\`\`\`

을 수행하므로 실제 실험에 사용된 프레임 수가 자동으로 증가한다.

특히 $E_b/N_0$가 큰 경우에는 BER이 작아서 한 프레임에서 오류가 거의 발생하지 않는다. 따라서 오류 25개를 얻기 위해서는 훨씬 많은 프레임을 반복해야 하고, 결과적으로 'N_frame'도 자동으로 큰 값이 된다.

이와 같이 오류가 충분히 관찰될 때까지 실험하기 때문에 문제 3.C보다 통계적으로 신뢰할 수 있는 BER을 얻을 수 있다.`
        },
        { //문제 3.E
          "id": "21-3E",
          "title": "3.E.",
          "type": "python",
          "prompt": `이제, 문제 3.D의 py 스크립트에 마지막 Step(Step 9, Step 10)을 추가하자. 아래와 같이 수정하여 $E_b/N_0=2, 4, 6, 8, 10$dB일 때 BER 시뮬레이션을 반복하도록 하자.
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt
from scipy.special import erfc

EbN0dB_vector = np.array([2, 4, 6, 8, 10])

BER_vector = np.zeros(len(EbN0dB_vector))
BER_exact_vector = np.zeros(len(EbN0dB_vector))

for snr_i in range(len(EbN0dB_vector)):
    EbN0dB = EbN0dB_vector[snr_i]

    # <문제 3.D의 py 스크립트 삽입>
    # 주의:
    # EbN0dB = 9 라인은 삭제
    # 초기화/BER 계산 부분은 그대로 사용

    BER_vector[snr_i] = BER
    BER_exact_vector[snr_i] = BER_exact

plt.figure()
plt.semilogy(EbN0dB_vector, BER_vector, marker='o', label='Simulated')
plt.semilogy(EbN0dB_vector, BER_exact_vector, marker='o', label='Theory')
plt.xlabel('Eb/N0 [dB]')
plt.ylabel('BER')
plt.legend()
plt.grid()
plt.show()
\`\`\`
완성한 py 스크립트를 실행하고, 시뮬레이션 수행 후 얻어진 BER 곡선 결과를 확인하시오.`,
          // 21-3E
"referenceAnswer": `각 $E_b/N_0$ 값에 대해 문제 3.D의 BER 시뮬레이션을 반복하고 결과를 각각 'BER_vector'와 'BER_exact_vector'에 저장한다.

전체 구조는 다음과 같다.

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt
from scipy.special import erfc

Ts = 1
L = 16
t_step = Ts / L

pt = rcosdesign(0.5, 6, L, 'sqrt')
pt = pt / np.sqrt(np.max(np.convolve(pt, pt)))
N = len(pt)

Eb = np.sum(pt ** 2) * t_step

Ns = 100

EbN0dB_vector = np.array([2, 4, 6, 8, 10])

BER_vector = np.zeros(len(EbN0dB_vector))
BER_exact_vector = np.zeros(len(EbN0dB_vector))

for snr_i in range(len(EbN0dB_vector)):

    EbN0dB = EbN0dB_vector[snr_i]

    EbN0 = 10 ** (EbN0dB / 10)
    N0 = Eb / EbN0
    v_n = N0 / (2 * t_step)

    sum_Ne = 0
    N_frame = 0

    while sum_Ne < 25:

        data_bit = (np.random.rand(Ns) > 0.5)

        amp_modulated = 2 * data_bit.astype(int) - 1

        impulse_modulated = np.array([])

        for n in range(Ns):
            delta_signal = np.concatenate(
                ([amp_modulated[n]], np.zeros(L - 1))
            )
            impulse_modulated = np.concatenate(
                (impulse_modulated, delta_signal)
            )

        tx_signal = np.convolve(impulse_modulated, pt)

        n_samples = (
            np.sqrt(v_n)
            * np.random.randn(len(tx_signal))
        )

        r_samples = tx_signal + n_samples

        z_samples = np.convolve(r_samples, pt)

        estimated_data_bit = (
            z_samples[(N - 1) + np.arange(Ns) * L] > 0
        )

        Ne = np.sum(
            estimated_data_bit != data_bit
        )

        sum_Ne += Ne
        N_frame += 1

    Total_bit = Ns * N_frame
    BER = sum_Ne / Total_bit

    BER_exact = 0.5 * erfc(np.sqrt(EbN0))

    BER_vector[snr_i] = BER
    BER_exact_vector[snr_i] = BER_exact

plt.figure()

plt.semilogy(
    EbN0dB_vector,
    BER_vector,
    marker='o',
    label='Simulated'
)

plt.semilogy(
    EbN0dB_vector,
    BER_exact_vector,
    marker='o',
    label='Theory'
)

plt.xlabel('Eb/N0 [dB]')
plt.ylabel('BER')
plt.legend()
plt.grid()
plt.show()
\`\`\`

실행 결과 $E_b/N_0$가 증가할수록 BER이 감소하는 BPSK의 BER 곡선을 확인할 수 있다.

랜덤 시뮬레이션이므로 실행할 때마다 'BER_vector'의 값에는 약간의 차이가 발생할 수 있다.`
        },
        { //문제 3.F
          "id": "21-3F",
          "title": "3.F.",
          "type": "essay",
          "prompt": ` 문제 3.E에서 확인한 그래프는 시뮬레이션 BER 곡선과 이론적인 BER 곡선을 나타낸다. 두 BER 곡선을 비교하시오. 두 BER 곡선이 일치하는가?`,
          // 21-3F
"referenceAnswer": `시뮬레이션으로 구한 BER 곡선과 이론적인 BPSK BER 곡선은 대체로 서로 일치한다.

$E_b/N_0$가 증가할수록 두 곡선 모두 BER이 빠르게 감소한다.

시뮬레이션 BER은 유한한 개수의 랜덤 비트와 AWGN 샘플을 이용하여 계산한 통계적인 결과이므로 각 $E_b/N_0$ 지점에서 이론적인 BER과 완전히 동일하지는 않고 약간의 차이가 발생할 수 있다.

그러나 문제 3.D에서와 같이 각 $E_b/N_0$에 대해 일정 개수 이상의 비트 오류가 발생할 때까지 충분한 비트를 전송하면 시뮬레이션 BER은 이론 BER에 가까워진다.

따라서 전체적인 BER 곡선의 경향과 수치는 이론적인 BPSK BER 곡선과 일치한다고 볼 수 있다.`
        },
      ]
    },
    { //문제 4
      "id": "21-4",
      "title": "4. 심벌 타이밍 오차가 존재할 때 Roll-off factor가 BER에 미치는 영향",
      "problems": [
        { //문제 4.A
          "id": "21-4A",
          "title": "4.A.",
          "prompt": `정합 필터 출력의 eye가 최대로 열리는 지점이 아닌 다른 지점의 값을 판별 변수로 사용하는 경우를 “심벌 타이밍 오차가 존재한다”라고 한다. 본 문제를 통해 심벌 타이밍 오차가 BER 성능에 미치는 영향을 알아보자.`
        },
        {
          "id": "21-4A1",
          "title": "4.A1.",
          "type": "python",
          consoleEnabled: true,
          "prompt": `문제 3.E에서는, 수신신호 ‘z_samples’로부터 정확한 심벌 타이밍을 가정하여 판별 변수를 생성하였다. 심벌(Binary 신호의 경우 비트와 동일)당 샘플수가 ‘L’ 개이고, 문제 2.D에서 ‘z_samples’와 ‘impulse_modulated’ 간에 ‘N’ 샘플만큼 지연이 있음을 상기하자. 따라서 ‘z_samples[(N-1)+(n-1)*L]’ 은 eye가 최대로 열리는 순간의 샘플로 ‘n’번째 심벌(비트)의 판별 변수에 해당 한다. 

Console에서 아래 명령어를 수행하고, 처음 10개의 심벌의 판별 변수를 생성하기 위한 샘플 인덱스(index) 출력 결과를 확인하시오.
\`\`\`python
>>> sample_index = (N - 1) + np.arange(Ns) * L
>>> sample_index[:10]
\`\`\``,
          // 21-4A1
"referenceAnswer": `현재 $N=97$, $L=16$이므로

\`\`\`python
sample_index = (N - 1) + np.arange(Ns) * L
\`\`\`

에서 처음 10개의 인덱스는

\`\`\`
[ 96 112 128 144 160 176 192 208 224 240]
\`\`\`

이 된다.

각 인덱스는 정확한 심벌 타이밍에서 정합 필터 출력 'z_samples'를 샘플링하는 위치이며, 인접한 심벌의 판별 위치는 $L=16$ 샘플씩 떨어져 있다.`
        },
        {
          "id": "21-4A2",
          "title": "4.A2.",
          "type": "python",
          consoleEnabled: true,
          "prompt": `이제 타이밍 오차가 존재하는 경우의 ‘z_samples’의 인덱스를 관찰해 보자. Console에서 아래 명령어를 수행하시오.
\`\`\`python
>>> t_offset = 2
>>> sample_index = (N - 1) + t_offset + np.arange(Ns) * L
>>> sample_index[:10]
\`\`\`
실행 결과를 확인하시오. 문제 4.A1의 결과와 비교하여 변수 ‘t_offset’의 역할이 무엇인지 쓰시오. 즉, 판별 변수를 얻기 위해, 문제 4.A1의 ‘sample_index’ 대신 4.A2 (a)의 ‘sample_index’를 사용하면 어떤 일이 발생하는지 쓰시오.

(참고. 본 실습에서는 심벌 타이밍 오차가 고정되어 있는 단순화된 타이밍 오차 환경에 대해 실습을 수행한다. 실제 환경에서는 클록 지터와 같은 여러 가지 요인에 의해 심벌 타이밍 오차가 발생하며, 심벌마다 주기적 또는 랜덤하게 타이밍 오차가 발생할 수 있다)
`,
          // 21-4A2
"referenceAnswer": `'t_offset'은 정확한 심벌 판별 시점에서 몇 샘플만큼 어긋난 위치를 사용할 것인지를 나타낸다.

$t_{offset}=2$이면

\`\`\`python
sample_index = (N - 1) + 2 + np.arange(Ns) * L
\`\`\`

이므로 처음 10개의 인덱스는

\`\`\`
[ 98 114 130 146 162 178 194 210 226 242]
\`\`\`

가 된다.

문제 4.A1의 정확한 판별 시점보다 모든 샘플링 위치가 2샘플 뒤로 이동한 것이다.

따라서 eye가 가장 크게 열리는 지점이 아닌 약간 어긋난 지점의 정합 필터 출력을 판별 변수로 사용하게 되고, 이것이 심벌 타이밍 오차에 해당한다.

이 경우 인접 심벌의 영향이 증가하여 판별 변수의 여유가 감소하고 BER 성능이 나빠질 수 있다.`
        },
        {
          "id": "21-4A3",
          "title": "4.A3.",
          "type": "python",
          responseEnabled: true,
          "prompt": `문제 3.E의 py 스크립트에서 ‘estimated_data_bit = (z_samples[(N - 1) + np.arange(Ns) * L] > 0)’ 라인을 아래의 세 라인으로 교체하자.
\`\`\`python
t_offset = 2
sample_index = (N - 1) + t_offset + np.arange(Ns) * L
estimated_data_bit = (z_samples[sample_index] > 0)
\`\`\`
이제 판별 변수를 얻기 위한 샘플 지점은 eye가 최대로 열리는 지점에서 2 샘플 어긋난 곳이 된다.

수정한 py 스크립트를 실행하고, 출력된 BER 그래프를 확인하시오. 타이밍 오차가 존재하는 경우의 실험 BER 곡선과 완벽한 심벌 타이밍을 가질 때의 BER 곡선을 비교하고, 비교 결과를 쓰시오.
`,
          // 21-4A3
"referenceAnswer": `심벌 타이밍 오차가 없는 경우에는 eye가 가장 크게 열리는 시점에서 판별하므로 BER 성능이 가장 좋다.

반면

\`\`\`python
t_offset = 2
\`\`\`

를 사용하면 정확한 심벌 중심에서 2샘플 벗어난 위치를 판별 변수로 사용한다.

이 위치에서는 eye opening이 감소하고 인접 심벌의 영향이 더 커지므로 비트 판별 오류가 증가한다.

따라서 동일한 $E_b/N_0$에서 비교하면 심벌 타이밍 오차가 있는 경우의 BER이 정확한 심벌 타이밍을 사용하는 경우보다 더 크게 나타난다.

즉, timing error가 존재하면 BER 곡선이 전체적으로 성능이 나빠지는 방향으로 이동한다.`
        },
        { //문제 4.B
          "id": "21-4B",
          "title": "4.B.",
          "type": "python",
          responseEnabled: true,
          "prompt": `문제 4.A3의 py 스크립트에서 ‘EbN0dB_vector = np.array([2, 4, 6, 8, 10])’ 라인을 ‘EbN0dB_vector = np.array([4])’ 로 수정하고, ‘while sum_Ne < 25:’ 라인을 ‘while sum_Ne < 500:’으로 수정하시오. 그리고, ‘t_offset’ = 0, 2, 4, 8이고, roll-off factor = 0.25, 0.5, 0.75인 각각의 경우에 대해서 BER을 시뮬레이션하여 <표 21.1>을 채우시오.
[[table:
caption:표 21.1 심벌 타이밍 오차와 Roll-off factor에 따른 BER
Roll-off factor / 타이밍 샘플 오차 | 0 | 2 | 4 | 8
0.25 | | | |
0.5 | | | |
0.75 | | | |
]]
          `,
          // 21-4B
"referenceAnswer": `각 Roll-off factor와 timing offset 조합에 대해 BER 시뮬레이션을 수행하여 표를 완성한다.

랜덤 비트와 AWGN을 사용하므로 정확한 BER 값은 실행할 때마다 달라질 수 있다.

일반적으로 다음과 같은 경향을 확인할 수 있다.

- 't_offset = 0'에서는 모든 Roll-off factor에서 BER 성능이 비교적 좋다.
- 같은 Roll-off factor에서는 't_offset'이 커질수록 BER이 증가한다.
- timing error가 존재할 때는 Roll-off factor가 클수록 BER 증가가 상대적으로 작다.

따라서 표의 실제 수치는 자신이 실행한 시뮬레이션 결과를 기록해야 하며, 전체적인 경향은 timing offset 증가에 따른 BER 증가와 Roll-off factor 증가에 따른 timing error 강인성 향상으로 나타난다.`
        },
        { //문제 4.C
          "id": "21-4C",
          "title": "4.C.",
          "prompt": `심벌 타이밍 오차와 roll-off factor에 따른 BER 성능을 알아보자.`,
        },
        {
          "id": "21-4C1",
          "title": "4.C1.",
          "type": "essay",
          "prompt": `심벌 타이밍 오차가 커짐에 따라 BER이 어떻게 변하는지 설명하시오.`,
          // 21-4C1
"referenceAnswer": `심벌 타이밍 오차가 커질수록 BER은 증가한다.

정확한 심벌 타이밍에서는 eye가 가장 크게 열리는 지점에서 판별 변수를 얻기 때문에 인접 심벌의 영향을 가장 적게 받는다.

하지만 't_offset'이 증가하면 eye 중심에서 더 멀리 떨어진 지점에서 샘플링하게 된다.

그 결과 판별 시점에서 인접 심벌의 영향이 커지고, 잡음에 의해 판별 경계를 잘못 넘을 가능성도 증가한다.

따라서

$$
|t_{offset}| \\uparrow
\\quad\\Rightarrow\\quad
BER \\uparrow
$$

의 경향을 보인다.`
        },
        {
          "id": "21-4C2",
          "title": "4.C2.",
          "type": "essay",
          "prompt": `심벌 타이밍 오차가 있는 경우에 즉, ‘t_offset’ = 2, 4, 8 인 경우, Roll-off factor가 커짐에 따라 BER이 어떻게 변하는지 설명하시오.`,
          // 21-4C2
"referenceAnswer": `심벌 타이밍 오차가 존재하는 경우에는 Roll-off factor가 커질수록 일반적으로 BER 성능이 향상된다.

즉, 동일한 't_offset'에 대해

$$
r=0.25
$$

인 경우보다

$$
r=0.5
$$

또는

$$
r=0.75
$$

인 경우의 BER이 더 작게 나타나는 경향이 있다.

Roll-off factor가 클수록 eye diagram의 수평 방향 opening이 넓어지므로 정확한 심벌 중심에서 조금 벗어나더라도 판별 변수의 크기가 비교적 안정적으로 유지된다.

따라서 Roll-off factor가 큰 시스템이 심벌 타이밍 오차에 더 강인하다.`
        },
        {
          "id": "21-4C3",
          "title": "4.C3.",
          "type": "essay",
          "prompt": `[[link:/workbook/ch20?p=20-3H|20장의 문제 3.H]]에서 얻은 결과를 토대로, 심벌 타이밍 오차가 있는 경우에 Roll-off factor가 커짐에 따라 BER 성능이 향상되는 이유를 설명하시오.`,
          // 21-4C3
"referenceAnswer": `20장의 문제 3.H에서 확인했듯이 Roll-off factor가 커질수록 정합 필터 출력의 eye가 시간축 방향으로 더 넓게 열리는 경향이 있다.

Roll-off factor가 작은 경우에는 펄스의 시간 영역 꼬리가 길게 이어지므로 심벌 중심에서 조금만 벗어나도 인접 심벌의 영향을 크게 받을 수 있다.

반면 Roll-off factor가 큰 경우에는 펄스가 시간 영역에서 더 빠르게 감쇠하므로 eye의 수평 opening이 넓어진다.

따라서 timing offset이 존재하더라도 판별 시점이 비교적 넓은 eye 내부에 위치하게 되고, 판별 변수의 크기가 덜 감소한다.

그 결과 동일한 심벌 타이밍 오차에서 Roll-off factor가 클수록 비트 오류가 적어지고 BER 성능이 향상된다.`
        },
        { //문제 4.D
          "id": "21-4D",
          "title": "4.D.",
          "type": "essay",
          "prompt": `대역폭 성능, 심벌 타이밍 오차에 대한 강인성(robustness, BER 성능이 나빠지는 정도), 이 두 가지 측면에서 roll-off factor의 대소에 따른 장점과 단점을 쓰시오.`,
          // 21-4D
"referenceAnswer": `Roll-off factor에는 대역폭 성능과 심벌 타이밍 오차에 대한 강인성 사이의 trade-off가 존재한다.

**작은 Roll-off factor**

장점:
- Raised Cosine 계열 신호가 차지하는 주파수 대역폭이 작다.
- 따라서 주파수 효율이 높다.

단점:
- 시간 영역에서 펄스의 꼬리가 길게 나타난다.
- eye의 수평 opening이 상대적으로 좁다.
- 심벌 타이밍 오차가 발생하면 BER이 더 크게 증가할 수 있다.
- 즉, timing error에 대한 강인성이 낮다.

**큰 Roll-off factor**

장점:
- 시간 영역에서 펄스가 더 빠르게 감쇠한다.
- eye의 수평 opening이 더 넓다.
- 심벌 중심에서 약간 벗어나더라도 판별 성능의 저하가 상대적으로 작다.
- 따라서 timing error에 대한 강인성이 높다.

단점:
- 더 넓은 주파수 대역폭을 사용한다.
- 따라서 주파수 효율이 낮아진다.

정리하면 작은 Roll-off factor는 대역폭 효율 측면에서 유리하고, 큰 Roll-off factor는 심벌 타이밍 오차에 대한 강인성과 BER 성능 측면에서 유리하다.`
        },
      ]
    },
    { //문제 5
      "id": "21-5",
      "title": "5. 통과대역(Passband) BPSK BER 시뮬레이션, 반송파 위상오차 영향 분석",
      "problems": [
        { //문제 5.A
          "id": "21-5A",
          "title": "5.A.",
          "type": "python",
          "prompt": `본 문제를 통해 통과대역에서 BPSK의 BER 성능을 실험하고, 반송파의 위상오차 BER 성능에 미치는 영향을 알아보자. Pulse shaping된 기저 대역에 사인 파형(반송파(carrier wave))을 곱함으로써 통과대역 BPSK 신호를 생성할 수 있다.

문제 3.E에서 완성한 py 스크립트를 다시 불러와, Roll-off factor=0.5 이고 심벌 타이밍 오차가 없음을 확인하시오.

이후,  ‘r_samples’ 생성 문장 다음에 아래 박스의 내용을 추가하자. (단, 기존 내용 유지)
\`\`\`python
carrier_wave = np.cos(2 * np.pi * 3.2 * np.arange(1, len(tx_signal) + 1) * t_step)
passband_tx_signal = tx_signal * carrier_wave
r_samples_pass = passband_tx_signal + n_samples
\`\`\`
추가된 라인에 대해 다음의 지침에 따라 주석(Comment)을 작성하시오.

(지침)
  - '=' 왼쪽 변수의 목적(용도)을 설명하시오.
  - '=' 오른쪽 수식이 왜 해당 변수의 의미에 부합하는지 설명하시오.
`,
          // 21-5A
"referenceAnswer": `각 라인의 의미는 다음과 같다.

\`\`\`python
# 주파수 3.2 Hz의 반송파를 tx_signal과 동일한 길이로 생성한다.
# np.arange(1, len(tx_signal) + 1) * t_step은 각 샘플의 시간축을 나타낸다.
carrier_wave = np.cos(
    2 * np.pi * 3.2
    * np.arange(1, len(tx_signal) + 1)
    * t_step
)

# 기저대역 신호 tx_signal에 반송파를 곱하여
# 중심 주파수가 3.2 Hz인 통과대역 BPSK 신호를 생성한다.
passband_tx_signal = tx_signal * carrier_wave

# 통과대역 송신 신호에 AWGN 샘플을 더하여
# 채널을 통과한 통과대역 수신 신호를 생성한다.
r_samples_pass = passband_tx_signal + n_samples
\`\`\`

즉, 'carrier_wave'는 통과대역 변조에 사용할 반송파이고,
'passband_tx_signal'은 기저대역 BPSK 신호를 반송파에 실은 통과대역 신호이며,
'r_samples_pass'는 여기에 AWGN이 추가된 수신 신호이다.`
        },
        { //문제 5.B
          "id": "21-5B",
          "title": "5.B.",
          "prompt": `전송하고자하는 통과대역 신호(Python 변수 ‘passband_tx_signal’)의 스펙트럼을 관찰해보자.`
        },
        {
          "id": "21-5B1",
          "title": "5.B1.",
          "type": "python",
          consoleEnabled: true,
          "prompt": `‘EbN0dB_vector = np.array([2, 4, 6, 8, 10])’ 라인을 ‘EbN0dB_vector = np.array([10])’으로 수정하고, ‘while sum_Ne < 25:’ 라인을 ‘while sum_Ne < 1:’ 로 수정하시오. py 스크립트를 실행한 후 Cosole에서 아래를 실행하여 결과 그래프를 확인하시오.
\`\`\`python
>>> BW_v = np.fft.fft(passband_tx_signal, 1024)
>>> plt.figure()
>>> plt.plot(np.arange(-512, 512) / 1024 * L, np.abs(np.fft.fftshift(BW_v)))
>>> plt.grid()
\`\`\`
`,
          // 21-5B1
"referenceAnswer": `'passband_tx_signal'에 대해 1024-point FFT를 수행하고 fftshift를 적용하면 0 Hz를 중심으로 음의 주파수와 양의 주파수를 함께 관찰할 수 있다.

송신 반송파 주파수가 3.2 Hz이므로, 출력 스펙트럼에서는 기저대역 신호의 스펙트럼이 약 $+3.2$ Hz와 $-3.2$ Hz를 중심으로 이동한 형태가 나타난다.`
        },
        {
          "id": "21-5B2",
          "title": "5.B2.",
          "type": "essay",
          "prompt": `본인이 예상한 스펙트럼의 모양과 일치하는가? 예상한 스펙트럼 모양에 대해 그렇게 예상한 이유도 쓰시오.`,
          // 21-5B2
"referenceAnswer": `예상한 형태와 일치한다.

기저대역 신호를 $s(t)$라 하고 반송파 주파수를 $f_c=3.2$ Hz라 하면 통과대역 신호는

$$
s_p(t)=s(t)\\cos(2\\pi f_ct)
$$

이다.

푸리에 변환의 주파수 이동 성질에 의해

$$
S_p(f)
=
\\frac{1}{2}
\\left[
S(f-f_c)+S(f+f_c)
\\right]
$$

가 된다.

따라서 원래 0 Hz를 중심으로 존재하던 기저대역 스펙트럼이

$$
f=+3.2\\text{ Hz}
$$

와

$$
f=-3.2\\text{ Hz}
$$

를 중심으로 각각 이동하여 나타난다.

그러므로 FFT 결과에서 $\\pm3.2$ Hz 부근에 대칭적인 스펙트럼이 나타나는 것은 예상한 결과와 일치한다.`
        },
        { //문제 5.C
          "id": "21-5C",
          "title": "5.C.",
          "prompt": `송신된 데이터 비트는 통과대역 신호 ‘r_samples_pass’를 기저대역 신호로 변환 후에 검출할 수 있다.`
        },
        {
          "id": "21-5C1",
          "title": "5.C1.",
          "type": "python",
          consoleEnabled: true,
          "prompt": `‘r_samples_pass = passband_tx_signal + n_samples’ 라인 아래에, 송신단에서 사용한 반송파와 같은 주파수와 위상을 가지는 로컬 반송파를 다시 곱하여 ‘r_samples _pass’를 기저대역의 낮은 주파수 대역으로 변환하는 아래 두 라인을 추가하시오.
\`\`\`python
local_carrier = np.cos(2 * np.pi * 3.2 * np.arange(1, len(tx_signal) + 1) * t_step)
mult_out = r_samples_pass * local_carrier
\`\`\`
수정한 py 스크립트를 수행하시오. 수행이 끝나면, Console에서 아래를 수행하시오.
\`\`\`python
>>> BW_v = np.fft.fft(mult_out, 1024)
>>> plt.figure()
>>> plt.plot(np.arange(-512, 512) / 1024 * L, np.abs(np.fft.fftshift(BW_v)))
>>> plt.grid()
\`\`\`
수행 결과 그래프는 ‘mult_out’(‘passband_tx_signal’이 아님)의 PSD를 보여준다. 결과 그래프를 확인하시오.
`,
          // 21-5C1
"referenceAnswer": `로컬 반송파는 송신단에서 사용한 반송파와 동일한 주파수와 위상을 갖는다.

\`\`\`python
local_carrier = np.cos(
    2 * np.pi * 3.2
    * np.arange(1, len(tx_signal) + 1)
    * t_step
)

mult_out = r_samples_pass * local_carrier
\`\`\`

수신된 통과대역 신호에 동일한 반송파를 다시 곱하면 통과대역 신호의 일부가 다시 0 Hz 부근의 기저대역으로 이동한다.

동시에 반송파 주파수의 두 배인

$$
2f_c=6.4\\text{ Hz}
$$

부근에도 새로운 주파수 성분이 발생한다.`
        },
        {
          "id": "21-5C2",
          "title": "5.C2.",
          "type": "essay",
          "prompt": `본인이 예상한 스펙트럼의 모양과 일치하는가? 예상한 스펙트럼 모양에 대해 그렇게 예상한 이유도 쓰시오.`,
          // 21-5C2
"referenceAnswer": `예상한 형태와 일치한다.

노이즈를 제외하고 생각하면

$$
r(t)=s(t)\\cos(2\\pi f_ct)
$$

이고, 여기에 동일한 로컬 반송파를 곱하면

$$
r(t)\\cos(2\\pi f_ct)
=
s(t)\\cos^2(2\\pi f_ct)
$$

가 된다.

삼각함수 공식

$$
\\cos^2\\theta
=
\\frac{1}{2}
+
\\frac{1}{2}\\cos(2\\theta)
$$

를 사용하면

$$
\\text{mult\\_out}
=
\\frac{1}{2}s(t)
+
\\frac{1}{2}s(t)\\cos(4\\pi f_ct)
$$

가 된다.

따라서 스펙트럼에는

1. 0 Hz를 중심으로 하는 기저대역 성분
2. $\\pm2f_c=\\pm6.4$ Hz 부근의 고주파 성분

이 동시에 존재한다.

그래서 'mult_out'의 스펙트럼에서 기저대역 성분과 6.4 Hz 부근의 성분이 함께 나타난다.`
        },
        { //문제 5.D
          "id": "21-5D",
          "title": "5.D.",
          "prompt": `문제 5.C에서 얻은 ‘mult_out’의 PSD에서 6.4 Hz(=3.2*2 Hz) 성분의 존재를 확인할 수 있다. 이후 수신 과정을 위해서는 AM 복조에서 했던 것처럼, LPF(lowpass filter)를 통과시켜 6.4 Hz의 주파수 성분을 제거하여야 한다. 하지만, LPF 과정 없이, 그 다음과정인 정합 필터링을 바로 수행해 보자. `
        },
        {
          "id": "21-5D1",
          "title": "5.D1.",
          "type": "python",
          consoleEnabled: true,
          "prompt": `py 스크립트에서 ‘mult_out’에 정합 필터링을 곧장 수행하기 위해 ‘z_samples = np.convolve(r_samples, pt)’ 라인의 ‘r_samples’를 ‘mult_out’으로 수정하시오. 수정한 py 스크립트를 수행한 후, Console에서 아래를 실행하고 결과 그림을 확인하시오.
\`\`\`python
>>> BW_v = np.fft.fft(z_samples, 1024)
>>> plt.figure()
>>> plt.plot(np.arange(-512, 512) / 1024 * L, np.abs(np.fft.fftshift(BW_v)))
>>> plt.grid()
\`\`\`
`,
          // 21-5D1
"referenceAnswer": `정합 필터의 입력을 기존 'r_samples' 대신 'mult_out'으로 변경한다.

\`\`\`python
z_samples = np.convolve(mult_out, pt)
\`\`\`

FFT 결과를 확인하면 'mult_out'에 존재하던 6.4 Hz 부근의 고주파 성분이 정합 필터를 통과한 이후 크게 억제되고, 주로 기저대역 성분이 남는 것을 확인할 수 있다.`
        },
        {
          "id": "21-5D2",
          "title": "5.D2.",
          "type": "essay",
          "prompt": `LPF 단계를 건너뛰어도 기저대역 신호를 복원할 수 있는 이유를 쓰시오.`,
          // 21-5D2
"referenceAnswer": `수신단에서 사용하는 정합 필터 'pt'는 SRRC 펄스이며, 필요한 기저대역 신호의 주파수 성분을 통과시키는 저역통과 특성을 갖는다.

'local_carrier'를 곱한 뒤의 'mult_out'에는

$$
\\frac{1}{2}s(t)
$$

에 해당하는 기저대역 성분과,

$$
\\frac{1}{2}s(t)\\cos(4\\pi f_ct)
$$

에 해당하는 $6.4$ Hz 부근의 고주파 성분이 함께 존재한다.

이후 'pt'를 이용하여 정합 필터링하면 원하는 기저대역 신호 성분은 통과하지만 6.4 Hz 부근의 성분은 정합 필터의 대역 밖에 있으므로 크게 억제된다.

따라서 별도의 LPF를 명시적으로 추가하지 않아도 정합 필터가 필요한 기저대역 성분을 선택하는 역할을 함께 수행하므로 데이터 검출이 가능하다.`
        },
        { //문제 5.E
          "id": "21-5E",
          "title": "5.E.",
          "type": "python",
          "prompt": `‘EbN0dB_vector = np.array([10])’ 라인을 ‘EbN0dB_vector = np.array([1, 3, 5, 7, 9])’로 변경하고, ‘while sum_Ne < 1:’ 라인을 ‘while sum_Ne < 25:’ 로 복원하시오. py 스크립트를 실행한 후 BER 커브 결과를 확인하시오.`,
          // 21-5E
"referenceAnswer": `통과대역 BPSK 시스템으로 BER 시뮬레이션을 수행하면 $E_b/N_0$가 증가할수록 BER이 감소하는 결과를 얻는다.

그러나 현재

\`\`\`python
carrier_wave = np.cos(...)
\`\`\`

를 사용한 경우 시뮬레이션 BER 곡선은 기존의 이론적인 BPSK BER 곡선과 일치하지 않고 성능이 약 3 dB 나쁜 방향으로 나타난다.

이 차이는 기저대역 신호에 진폭 1의 cosine 반송파를 곱하는 과정에서 실제 전송 비트 에너지가 절반으로 감소하기 때문에 발생한다.`
        },
        { //문제 5.F
          "id": "21-5F",
          "title": "5.F.",
          "prompt": `지금까지의 모든 과정이 올바르게 수행되었다면, 문제 5.E에서 실험을 통해 얻은 BER 곡선은 이론적인 BER 곡선과 일치하지 않는다.`
        },
        {
          "id": "21-5F1",
          "title": "5.F1.",
          "type": "essay",
          "prompt": `일반적으로, 심벌의 에너지($M=2$인 경우 비트 에너지)는 노이즈가 더해지기 직전 단계의 심벌의 에너지를 의미한다. 노이즈 더하기 전에 신호에 추가적인 작업(연산)이 있었다면 그에 맞게 심벌의 에너지를 다시 계산하여야 한다. 문제 5.E에서 실험을 통해 얻은 BER 곡선은 이론적인 BER과 동일한 BER 성능을 달성하기 위해서는 3 dB(Linear scale에서는 2배)의 심벌 에너지가 더 필요하다. 이러한 문제는 ‘tx_signal’에 ‘carrier_wave’를 곱해 통과대역 신호로 변환 과정에서 발생한다. 통과대역 신호로 변환하는 과정이 심벌 에너지를 절반으로 줄이는 이유를 수학적으로 설명하시오.`,
          // 21-5F1
"referenceAnswer": `기저대역 신호를 $s(t)$라 하면 통과대역 신호는

$$
s_p(t)
=
s(t)\\cos(2\\pi f_ct)
$$

이다.

통과대역 신호의 에너지는

$$
E_p
=
\\int |s_p(t)|^2dt
$$

이므로

$$
E_p
=
\\int |s(t)|^2\\cos^2(2\\pi f_ct)dt
$$

이다.

삼각함수 관계

$$
\\cos^2(2\\pi f_ct)
=
\\frac{1}{2}
+
\\frac{1}{2}\\cos(4\\pi f_ct)
$$

를 이용하면

$$
E_p
=
\\frac{1}{2}
\\int |s(t)|^2dt
+
\\frac{1}{2}
\\int |s(t)|^2
\\cos(4\\pi f_ct)dt
$$

가 된다.

반송파가 충분히 빠르게 변화하는 경우 두 번째 적분 항은 평균적으로 0이 되므로

$$
E_p
\\approx
\\frac{1}{2}
\\int |s(t)|^2dt
$$

이다.

따라서

$$
\\boxed{E_p\\approx\\frac{E_b}{2}}
$$

가 된다.

즉, 진폭 1의 cosine 반송파를 곱하면 평균적인 $\\cos^2$ 값이 $1/2$이기 때문에 신호 에너지가 절반으로 감소한다.

에너지가 절반이 되는 것은 dB로

$$
10\\log_{10}\\left(\\frac{1}{2}\\right)
\\approx-3.01\\text{ dB}
$$

에 해당한다.

따라서 동일한 BER을 얻으려면 약 3 dB 더 큰 $E_b/N_0$가 필요하게 된다.`
        },
        {
          "id": "21-5F2",
          "title": "5.F2.",
          "type": "essay",
          "prompt": `문제 5.F1에서 언급한 문제를 해결하려면, ‘carrier_wave = np.cos(2 * np.pi * 3.2 * np.arange(1, len(tx_signal) + 1) * t_step)’ 라인을 ‘carrier_wave = np.sqrt(2) * np.cos(2 * np.pi * 3.2 * np.arange(1, len(tx_signal) + 1) * t_step)’로 수정해야 한다. 이렇게 수정하면 문제가 해결되는 이유를 설명하시오.`,
          // 21-5F2
"referenceAnswer": `반송파를

\`\`\`python
carrier_wave = np.sqrt(2) * np.cos(...)
\`\`\`

로 변경하면 통과대역 신호는

$$
s_p(t)
=
\\sqrt{2}s(t)\\cos(2\\pi f_ct)
$$

가 된다.

따라서 에너지는

$$
E_p
=
\\int
2|s(t)|^2
\\cos^2(2\\pi f_ct)dt
$$

이다.

cosine 제곱의 시간 평균은 $1/2$이므로

$$
E_p
\\approx
2\\times\\frac{1}{2}
\\int|s(t)|^2dt
$$

이고,

$$
\\boxed{E_p=E_b}
$$

가 된다.

즉, 기존 반송파를 곱하면서 발생했던 $1/2$의 에너지 감소를 $\\sqrt{2}$의 제곱인 2가 정확히 보상한다.

따라서 통과대역 변조 전과 후의 비트 에너지가 동일하게 유지되고, 시뮬레이션에서 설정한 $E_b/N_0$와 실제 전송 신호의 $E_b/N_0$가 일치하게 된다.`
        },
        {
          "id": "21-5F3",
          "title": "5.F3.",
          "type": "python",
          "prompt": `문제 5.F2에서 설명한대로 py 스크립트를 수정하고, 수정한 py 스크립트를 실행하시오. 출력된 $E_b/N_0$에 따른 BER 곡선을 확인하시오.`,
          // 21-5F3
"referenceAnswer": `송신 반송파를

\`\`\`python
carrier_wave = (
    np.sqrt(2)
    * np.cos(
        2 * np.pi * 3.2
        * np.arange(1, len(tx_signal) + 1)
        * t_step
    )
)
\`\`\`

로 수정한 후 BER 시뮬레이션을 다시 수행한다.

이 경우 통과대역 변환 과정에서도 비트 에너지가 보존되므로, 수정 전 약 3 dB 정도 차이가 발생하던 시뮬레이션 BER 곡선이 이론적인 BPSK BER 곡선에 가까워지는 것을 확인할 수 있다.

랜덤 시뮬레이션이므로 각 점이 이론값과 완전히 동일하지는 않을 수 있지만 전체적인 BER 곡선은 이론값과 일치해야 한다.`
        },
        {
          "id": "21-5F4",
          "title": "5.F4.",
          "type": "essay",
          "prompt": `‘local_carrier’에는 ‘carrier_wave’에서 한 것과 같이 ‘np.sqrt(2)’를 곱해주지 않아도 되는 이유를 설명하시오.`,
          // 21-5F4
"referenceAnswer": `'carrier_wave'에 $\\sqrt{2}$를 곱한 이유는 실제 채널을 통해 전송되기 전에 통과대역 변환으로 인해 송신 비트 에너지가 절반으로 감소하는 것을 방지하기 위해서이다.

반면 'local_carrier'는 수신기 내부에서 복조를 위해 사용하는 신호이다. 이 단계에서 일정한 상수를 더 곱하는 것은 최종 판별 변수의 크기를 일정한 비율로 변화시킬 뿐이다.

BPSK에서는 판별 기준이

$$
z>0\\Rightarrow1,
\\qquad
z<0\\Rightarrow0
$$

이므로, 양의 상수를 전체 판별 변수에 곱하더라도 부호는 변하지 않는다.

또한 수신기 내부에서 신호와 잡음이 함께 같은 비율로 스케일되므로 신호 대 잡음비 자체도 개선되지 않는다.

따라서 로컬 반송파에는 반드시 $\\sqrt{2}$를 곱할 필요가 없다.`
        },
        { //문제 5.G
          "id": "21-5G",
          "title": "5.G.",
          "prompt": `위상 동기화 에러가 발생하는 경우를 생각해보자. 반송파(‘carrier _wave’)와 로컬 반송파(‘local_carrier’)사이에 위상차가 $\\pi/4$만큼 발생하도록 아래와 같이 ‘local_carrier’ 생성 문장을 수정하시오.
\`\`\`python
local_carrier = np.cos(2 * np.pi * 3.2 * np.arange(1, len(tx_signal) + 1) * t_step + np.pi / 4)
\`\`\`
          `
        },
        {
          "id": "21-5G1",
          "title": "5.G1.",
          "type": "python",
          "prompt": `수정한 py 스크립트를 실행하고, 출력된 BER 곡선을 확인하시오.`,
          // 21-5G1
"referenceAnswer": `로컬 반송파에 $\\pi/4$의 위상오차를 추가하여 BER 시뮬레이션을 수행하면, 위상오차가 없는 경우보다 BER 성능이 나빠지는 것을 확인할 수 있다.

즉, 동일한 BER을 얻기 위해 더 큰 $E_b/N_0$가 필요하며, BER 곡선이 위상오차가 없는 이론적인 BPSK BER 곡선보다 성능이 나쁜 방향으로 이동한다.`
        },
        {
          "id": "21-5G2",
          "title": "5.G2.",
          "type": "essay",
          "prompt": `문제 5.G1의 결과와 위상오차가 0일 때의 이론적인 BER 결과를 비교하시오. $10^{-3}$의 BER을 얻으려면, 위상 동기와 오차가 존재할 때는 이론적인 환경에 비해 SNR($E_b/N_0$)이 몇 dB 더 필요한지 쓰시오.`,
          // 21-5G2
"referenceAnswer": `위상차가

$$
\\phi=\\frac{\\pi}{4}
$$

이면 coherent detection에서 유효한 신호 성분은 $\\cos\\phi$배로 감소한다.

따라서 유효한 신호 에너지는

$$
\\cos^2\\left(\\frac{\\pi}{4}\\right)
=
\\frac{1}{2}
$$

배가 된다.

같은 BER을 얻기 위해서는 $E_b/N_0$를 그 역수인 2배로 증가시켜야 한다.

이를 dB로 나타내면

$$
10\\log_{10}2
\\approx
3.01\\text{ dB}
$$

이다.

따라서 BER이 $10^{-3}$일 때도 위상오차가 없는 경우와 비교하여 약

$$
\\boxed{3\\text{ dB}}
$$

더 큰 $E_b/N_0$가 필요하다.`
        },
        {
          "id": "21-5G3",
          "title": "5.G3.",
          "type": "proof",
          "prompt": `문제 5.G2에서 답한 SNR 간격이 발생하는 이유를 수식으로 설명하시오.`,
          // 21-5G3
"referenceAnswer": `송신 반송파와 수신 로컬 반송파 사이에 위상차 $\\phi$가 있다고 하자.

수신 신호의 신호 성분은

$$
s(t)\\sqrt{2}\\cos(2\\pi f_ct)
$$

이고, 수신기에서는

$$
\\cos(2\\pi f_ct+\\phi)
$$

를 곱한다.

두 cosine의 곱에 대해

$$
\\cos A\\cos B
=
\\frac{1}{2}
\\left[
\\cos(A-B)+\\cos(A+B)
\\right]
$$

를 적용하면 기저대역 성분은 $\\cos\\phi$에 비례한다.

따라서 판별 변수의 유효 신호 진폭은

$$
A_{eff}=A\\cos\\phi
$$

로 감소한다.

전력 또는 에너지는 진폭의 제곱에 비례하므로 유효 비트 에너지는

$$
E_{b,eff}
=
E_b\\cos^2\\phi
$$

가 된다.

따라서 위상오차가 있는 BPSK의 BER은

$$
P_b
=
Q\\left(
\\sqrt{
2\\frac{E_b}{N_0}
}
\\cos\\phi
\\right)
$$

로 생각할 수 있다.

위상오차가 없는 경우와 같은 BER을 얻으려면

$$
\\left(\\frac{E_b}{N_0}\\right)_{\\phi}
\\cos^2\\phi
=
\\left(\\frac{E_b}{N_0}\\right)_0
$$

이어야 하므로

$$
\\left(\\frac{E_b}{N_0}\\right)_{\\phi}
=
\\frac{1}{\\cos^2\\phi}
\\left(\\frac{E_b}{N_0}\\right)_0
$$

이다.

$\\phi=\\pi/4$이면

$$
\\cos^2\\left(\\frac{\\pi}{4}\\right)
=
\\frac{1}{2}
$$

이므로 필요한 $E_b/N_0$는 2배가 되고,

$$
10\\log_{10}2
\\approx3.01\\text{ dB}
$$

의 SNR 손실이 발생한다.`
        },
        {
          "id": "21-5G4",
          "title": "5.G4.",
          "type": "proof",
          "prompt": `위상차가 $\\pi/8$라 가정하자. 위상오차가 0일 때와 동일한 BER을 얻기 위해 SNR($E_b/N_0$) 이 몇 dB 더 필요한지 계산하시오.`,
          // 21-5G4
"referenceAnswer": `위상오차가

$$
\\phi=\\frac{\\pi}{8}
$$

일 때 유효한 신호 에너지는

$$
E_{b,eff}
=
E_b\\cos^2\\left(\\frac{\\pi}{8}\\right)
$$

이다.

위상오차가 없는 경우와 동일한 BER을 얻으려면 필요한 $E_b/N_0$ 증가 비율은

$$
\\frac{1}{
\\cos^2\\left(\\frac{\\pi}{8}\\right)
}
$$

이다.

먼저

$$
\\cos\\left(\\frac{\\pi}{8}\\right)
\\approx0.92388
$$

이므로

$$
\\cos^2\\left(\\frac{\\pi}{8}\\right)
\\approx0.85355
$$

이다.

따라서 필요한 SNR 증가량은

$$
10\\log_{10}
\\left(
\\frac{1}{0.85355}
\\right)
$$

이고,

$$
\\boxed{
\\Delta\\mathrm{SNR}
\\approx0.69\\text{ dB}
}
$$

이다.

따라서 위상차가 $\\pi/8$일 때에는 위상오차가 없는 경우보다 약 $0.69$ dB 더 큰 $E_b/N_0$가 필요하다.`
        },
        {
          "id": "21-5G5",
          "title": "5.G5.",
          "type": "python",
          responseEnabled: true,
          "prompt": `py 스크립트를 적절히 수정하고, 실험을 수행하여 문제 5.G4의 답이 맞음을 보이시오.`,
          // 21-5G5
"referenceAnswer": `로컬 반송파의 위상차를 $\\pi/8$로 변경한다.

\`\`\`python
local_carrier = np.cos(
    2 * np.pi * 3.2
    * np.arange(1, len(tx_signal) + 1)
    * t_step
    + np.pi / 8
)
\`\`\`

이후 동일한 BER 시뮬레이션을 수행하여 위상오차가 없는 BER 곡선과 비교한다.

이론적으로 위상차가 $\\pi/8$이면 동일한 BER을 얻기 위해 약

$$
0.69\\text{ dB}
$$

더 큰 $E_b/N_0$가 필요하다.

따라서 시뮬레이션 BER 곡선도 위상오차가 없는 이론적인 BER 곡선보다 약 $0.69$ dB 성능이 나쁜 방향으로 이동하는 결과를 확인할 수 있다.

유한한 비트 수와 랜덤 AWGN을 이용한 시뮬레이션이므로 측정한 간격은 정확히 $0.69$ dB가 아닐 수 있지만, 충분한 비트를 사용하면 이론값에 가까워진다.`
        },
        {
          "id": "21-5G6",
          "title": "5.G6.",
          "type": "essay",
          "prompt": `좋은 BER 성능을 얻으려면, 위상 동기화 과정이 필수인 이유를 설명하시오.`,
          // 21-5G6
"referenceAnswer": `BPSK의 coherent detection에서는 송신 반송파와 수신기의 로컬 반송파가 동일한 주파수뿐만 아니라 정확한 위상을 가져야 한다.

위상차가 $\\phi$만큼 발생하면 원하는 기저대역 신호의 진폭은

$$
\\cos\\phi
$$

배로 감소하고, 유효한 신호 에너지는

$$
\\cos^2\\phi
$$

배로 감소한다.

따라서 위상오차가 증가할수록 판별 변수의 크기가 감소하여 잡음에 의해 비트를 잘못 판별할 가능성이 증가하고 BER 성능이 나빠진다.

특히

$$
\\phi=\\frac{\\pi}{2}
$$

에 가까워지면

$$
\\cos\\phi\\rightarrow0
$$

이 되어 원하는 신호 성분을 거의 얻을 수 없게 된다.

따라서 coherent BPSK에서 좋은 BER 성능을 얻기 위해서는 수신기의 로컬 반송파를 송신 반송파와 정확하게 맞추는 위상 동기화 과정이 필수적이다.`
        },
      ]
    }
  ]
} as const;
