import type { WorkbookChapter } from '@/types/workbook';

export const chapter = {
  "id": "25-fading-diversity-combining",
  "title": "Chapter 25. Fading, Diversity and Combining",
  "sections": [
    { // 문제 1
  "id": "25-1",
  "title": "1. 레일레이(Rayleigh) 페이딩 채널에서 판별변수 식 및 평균 BER 유도",
  "problems": [
    { // 문제 1.A
      "id": "25-1A",
      "title": "1.A.",
      "type": "python",
      "starterCode": `import numpy as np

seed = XXX  # 학번 끝 세 자리
rng = np.random.default_rng(seed)

h = ?? * rng.standard_normal() + ?? * ?? * rng.standard_normal()

print(h)`,
      "prompt": `주파수 비선택적(frequency nonselective) 페이딩(fading) 채널에서 2차원 변조(QAM, MPSK 등)된 심벌 $s$에 대한 수신기 정합필터(matched filter) 출력의 샘플링된 값 $r$을 복소평면의 좌표값으로 나타내면 [[equation:25.1]]과 같다.
$$
r=hs+n
\\qquad \\text{(식 25.1)}
$$
여기서 각 변수의 의미는 다음과 같다.
- $h$: 페이딩에 의한 신호 스케일링 계수(페이딩 계수)
- $s$: 심벌의 복소평면 위의 좌표로서, 평균 심벌 에너지 $E[|s|^2]$는 $E_s$로 나타낸다.
- $n$: AWGN 성분으로, 실수부와 허수부가 각각 평균 0, 분산 $N_0/2$인 독립 가우시안 분포를 따르는 복소 가우시안 확률변수

본 장부터는 2차원 변조심벌에 대한 수신신호를 하나의 복소수로 나타낸다. Real 성분은 In-phase 기저대역 신호의 matched filter 출력을 심벌 타이밍에서 샘플링한 값이고, Imag 성분은 Quadrature-phase 기저대역 신호의 matched filter 출력을 심벌 타이밍에서 샘플링한 값이다.

수신 파형을 발생시키고 수신 파형으로부터 판별변수를 생성하는 과정까지 BER simulation에 포함하는 경우를 Waveform level simulation이라 한다. 반면, 수신 파형에서 판별변수를 생성하는 과정을 생략하고 수식으로 유도된 판별변수에서 시작하는 BER simulation을 Decision variable level simulation이라 한다. 본 장에서는 Decision variable level simulation을 수행한다.

반사, 산란, 굴절 등에 의해 직접 경로의 신호가 존재하지 않는 NLOS(Non-Line of Sight) 환경에서 페이딩 계수의 크기가 Rayleigh 분포를 따르는 채널을 Rayleigh fading channel이라 한다.

Rayleigh fading channel에서 페이딩 계수 $h$는 복소 가우시안 분포를 따른다. 즉, $h=z+jy$로 주어지며, $z$와 $y$는 각각 평균 0, 분산 $1/2$인 독립 가우시안 분포를 따르는 실수이다.

아래 코드의 빈칸을 채워 페이딩 계수 $h$를 생성하시오.
\`\`\`python
h = ?? * rng.standard_normal() + ?? * ?? * rng.standard_normal()
\`\`\`
참고로 Python에서 \`rng.standard_normal()\`은 평균 0, 분산 1인 표준정규분포 난수를 생성하며, 허수 단위는 \`1j\`로 표현한다.`,
      responseEnabled: true,
      referenceAnswer: `빈칸을 채우면 다음과 같다.

\`\`\`python
h = np.sqrt(1/2) * rng.standard_normal() + 1j * np.sqrt(1/2) * rng.standard_normal()
\`\`\`

\`rng.standard_normal()\`은 평균 0, 분산 1인 표준정규분포 난수를 생성한다.

따라서 $\\sqrt{1/2}$를 곱하면 평균은 0으로 유지되고 분산은

$$
\\left(\\sqrt{\\frac12}\\right)^2
=
\\frac12
$$

이 된다.

두 난수를 독립적으로 생성하고 하나에 허수 단위 \`1j\`를 곱하면

$$
h=z+jy
$$

의 형태가 된다. 여기서

$$
z,y\\sim\\mathcal{N}\\left(0,\\frac12\\right)
$$

이므로 Rayleigh fading channel의 페이딩 계수 $h$를 생성할 수 있다.`,
    },
    { // 문제 1.B
      "id": "25-1B",
      "title": "1.B.",
      "prompt": `페이딩 계수 $h$를 극형식(크기와 위상)으로 나타내면 [[equation:25.2]]와 같다.
$$
h=|h|e^{j\\angle h}
\\qquad \\text{(식 25.2)}
$$`,
    },
    { // 문제 1.B1
      "id": "25-1B1",
      "title": "1.B1.",
      "type": "proof",
      "prompt": `페이딩 계수 $h=z+jy$의 크기 $|h|$를 $z$와 $y$로 나타내시오.`,
      referenceAnswer: `페이딩 계수는

$$
h=z+jy
$$

로 주어진다.

복소수의 크기는 실수부와 허수부의 제곱합에 제곱근을 취한 값이므로

$$
\\boxed{|h|=\\sqrt{z^2+y^2}}
$$

이다.`,
    },
    { // 문제 1.B2
      "id": "25-1B2",
      "title": "1.B2.",
      "type": "proof",
      "prompt": `$z$와 $y$는 각각 평균 0, 분산 $1/2$인 독립 가우시안 확률변수이다. 이러한 특성을 이용하여 문제 1.B1에서 구한 식으로부터 페이딩 계수의 크기 제곱의 평균, 즉 $E[|h|^2]$를 구하시오.`,
      referenceAnswer: `문제 1.B1에서

$$
|h|=\\sqrt{z^2+y^2}
$$

이므로

$$
|h|^2=z^2+y^2
$$

이다.

$z$와 $y$는 각각 평균 0, 분산 $1/2$인 가우시안 확률변수이므로

$$
E[z^2]=\\operatorname{Var}(z)+(E[z])^2
=\\frac12
$$

$$
E[y^2]=\\operatorname{Var}(y)+(E[y])^2
=\\frac12
$$

이다.

따라서

$$
\\begin{aligned}
E[|h|^2]
&=E[z^2+y^2]\\\\
&=E[z^2]+E[y^2]\\\\
&=\\frac12+\\frac12\\\\
&=1
\\end{aligned}
$$

이므로

$$
\\boxed{E[|h|^2]=1}
$$

이다.`,
    },
    { // 문제 1.C
      "id": "25-1C",
      "title": "1.C.",
      "prompt": `수신기에서는 다음과 같이 수신신호 $r$을 $h$의 위상만큼 역회전하여 판별변수(Decision variable) $D$를 생성한다. 그 결과 판별변수의 신호 성분 위상이 본래 심벌 $s$의 위상과 동일하도록 복원된다.
$$
\\begin{aligned}
D&=re^{-j\\angle h}\\\\
&=(hs+n)e^{-j\\angle h}\\\\
&=(|h|e^{j\\angle h}s+n)e^{-j\\angle h}\\\\
&=|h|s+ne^{-j\\angle h}
\\end{aligned}
\\qquad \\text{(식 25.3)}
$$`,
    },
    { // 문제 1.C1
      "id": "25-1C1",
      "title": "1.C1.",
      "type": "python",
      "starterCode": `import numpy as np
import matplotlib.pyplot as plt

x = np.arange(0, 5.01, 0.01)
f = 2 * x * np.exp(-x**2)

plt.figure()
plt.plot(x, f)
plt.xlabel('x')
plt.ylabel('Probability Density')
plt.grid()
plt.show()`,
      "prompt": `판별변수 $D$의 noise 성분 $ne^{-j\\angle h}$ 역시 $n$과 동일한 분포를 갖는 복소 가우시안 확률변수이다. 이에 대한 증명은 문제 1.C7에서 다룬다. 따라서, 페이딩은 결과적으로 판별변수 $D$에서 noise의 통계적 특성에는 영향을 미치지 않고, 신호 성분의 크기를 $|h|$만큼 스케일링하는 효과를 가져온다.

복소 가우시안 확률변수의 원점으로부터의 거리인 $|h|$는 [[equation:25.4]]와 같은 Rayleigh 분포를 따른다.
$$
f_{|h|}(x)=
\\begin{cases}
2x\\exp(-x^2), & x\\geq0\\\\
0, & x<0
\\end{cases}
\\qquad \\text{(식 25.4)}
$$
페이딩 계수 $h$ 자체는 복소 가우시안 분포를 따르지만, 페이딩에 의한 위상을 복원하면 신호 성분의 크기가 Rayleigh 분포를 갖는 확률변수에 의해 스케일링되므로 이를 Rayleigh fading이라 부른다.

다음 Python 코드를 실행하여 [[equation:25.4]]에 주어진 $f_{|h|}(x)$의 그래프를 그리고 결과를 확인하시오.`,
      responseEnabled: true,
      referenceAnswer: `출력된 그래프는 다음과 같은 Rayleigh 확률밀도함수를 나타낸다.

$$
f_{|h|}(x)=2x\\exp(-x^2),
\\qquad x\\geq0
$$

$x=0$에서 확률밀도함수의 값은 0이며, $x$가 증가함에 따라 확률밀도가 증가하다가

$$
x=\\frac{1}{\\sqrt2}\\approx0.707
$$

에서 최댓값을 갖는다.

이후 $x$가 증가할수록 확률밀도가 감소하여 0에 가까워지는 형태를 나타낸다.

따라서 출력된 그래프가 Rayleigh 분포의 확률밀도함수 형태와 일치함을 확인할 수 있다.`,
    },
    { // 문제 1.C2
      "id": "25-1C2",
      "title": "1.C2.",
      "type": "python",
      "starterCode": `import numpy as np
import matplotlib.pyplot as plt

x = np.arange(0, 5.01, 0.01)
f_c = np.exp(-x)

plt.figure()
plt.plot(x, f_c)
plt.xlabel('x')
plt.ylabel('Probability Density')
plt.grid()
plt.show()`,
      "prompt": `$c=|h|^2$이라 정의하자. 복소 가우시안 확률변수의 원점으로부터 거리의 제곱인 $c$는 [[equation:25.5]]와 같은 Exponential 분포를 따른다.
$$
f_c(x)=\\exp(-x),
\\qquad x\\geq0
\\qquad \\text{(식 25.5)}
$$
다음 Python 코드를 실행하여 [[equation:25.5]]에 주어진 $f_c(x)$의 그래프를 그리고 결과를 확인하시오.`,
      responseEnabled: true,
      referenceAnswer: `출력된 그래프는 다음과 같은 Exponential 확률밀도함수를 나타낸다.

$$
f_c(x)=\\exp(-x),
\\qquad x\\geq0
$$

$x=0$에서

$$
f_c(0)=1
$$

로 최댓값을 가지며, $x$가 증가함에 따라 확률밀도가 지수적으로 감소하여 0에 가까워진다.

따라서 페이딩 계수의 크기 제곱인

$$
c=|h|^2
$$

의 확률밀도함수가 Exponential 분포의 형태를 나타냄을 확인할 수 있다.`,
    },
    { // 문제 1.C3
      "id": "25-1C3",
      "title": "1.C3.",
      "type": "proof",
      "prompt": `확률변수 $c$의 평균 $E[c]$는 확률밀도함수 $f_c(x)$를 이용하여 다음과 같이 구할 수 있다.
$$
E[c]=\\int_{-\\infty}^{\\infty}(?)\\times f_c(x)dx
$$
위 식의 빈칸을 채우시오.`,
      referenceAnswer: `확률변수의 평균은 확률변수의 값과 해당 확률밀도함수의 곱을 전체 구간에 대하여 적분하여 구한다.

따라서 빈칸에는

$$
\\boxed{x}
$$

가 들어간다.

완성된 식은

$$
\\boxed{
E[c]=\\int_{-\\infty}^{\\infty}x f_c(x)dx
}
$$

이다.`,
    },
    { // 문제 1.C4
      "id": "25-1C4",
      "title": "1.C4.",
      "type": "python",
      "starterCode": `import sympy as sp

x = sp.symbols('x')

E_c = sp.integrate(x * sp.exp(-x), (x, 0, sp.oo))

sp.pprint(E_c)`,
      "prompt": `(a) 문제 1.C3에서 완성한 공식과 [[equation:25.5]]를 이용하여 확률변수 $c$의 평균 $E[c]$를 직접 계산하시오.
(b) (a)에서 구한 결과가 문제 1.B2에서 구한 $E[|h|^2]$와 일치함을 보이시오. 또한 Python의 symbolic math 라이브러리인 SymPy를 이용하여 (a)의 계산 결과를 검증하시오.`,
      responseEnabled: true,
      referenceAnswer: `(a) 확률변수 $c$의 확률밀도함수는

$$
f_c(x)=
\\begin{cases}
e^{-x},&x\\geq0\\\\
0,&x<0
\\end{cases}
$$

이다.

따라서 문제 1.C3의 평균 계산식을 이용하면

$$
\\begin{aligned}
E[c]
&=\\int_{-\\infty}^{\\infty}x f_c(x)dx\\\\
&=\\int_0^{\\infty}xe^{-x}dx
\\end{aligned}
$$

이다.

부분적분을 적용하면

$$
\\begin{aligned}
E[c]
&=\\left[-xe^{-x}\\right]_0^{\\infty}
+\\int_0^{\\infty}e^{-x}dx\\\\
&=0+\\left[-e^{-x}\\right]_0^{\\infty}\\\\
&=0+1\\\\
&=1
\\end{aligned}
$$

이다.

따라서

$$
\\boxed{E[c]=1}
$$

이다.

(b) 문제 1.B2에서 구한 결과는

$$
E[|h|^2]=1
$$

이다.

$c=|h|^2$이므로

$$
\\boxed{E[c]=E[|h|^2]=1}
$$

이며 두 결과가 일치한다.

SymPy를 이용한 검증 코드는 다음과 같다.

\`\`\`python
import sympy as sp

x = sp.symbols('x')

E_c = sp.integrate(x * sp.exp(-x), (x, 0, sp.oo))

sp.pprint(E_c)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
1
\`\`\`

따라서 직접 계산한 결과와 symbolic math의 결과가 일치한다.`,
    },
    { // 문제 1.C5
      "id": "25-1C5",
      "title": "1.C5.",
      "type": "proof",
      "prompt": `판별변수 $D$의 신호 성분의 순간 에너지는 $\\left||h|s\\right|^2=|h|^2|s|^2$이다. 페이딩이 없을 때($h=1$로 일정한 채널 상황) 신호 성분의 평균 에너지는 $E[|s|^2]=E_s$이다. 페이딩 계수 $h$와 송신 심벌 $s$가 서로 독립이라고 가정하고, 문제 1.B2의 결과를 이용하여 페이딩이 존재할 때 판별변수 $D$에서 신호 성분의 평균 에너지 $E[|h|^2|s|^2]=E[c|s|^2]$ 역시 $E_s$와 동일함을 수식으로 보이시오.`,
      referenceAnswer: `페이딩이 존재할 때 판별변수 $D$에서 신호 성분의 순간 에너지는

$$
|h|^2|s|^2
$$

이다.

페이딩 계수 $h$와 송신 심벌 $s$는 서로 독립이므로

$$
E[|h|^2|s|^2]
=
E[|h|^2]E[|s|^2]
$$

이다.

문제 1.B2에서

$$
E[|h|^2]=1
$$

이고, 평균 심벌 에너지의 정의에 의해

$$
E[|s|^2]=E_s
$$

이므로

$$
\\begin{aligned}
E[|h|^2|s|^2]
&=E[|h|^2]E[|s|^2]\\\\
&=1\\times E_s\\\\
&=E_s
\\end{aligned}
$$

이다.

따라서

$$
\\boxed{E[|h|^2|s|^2]=E_s}
$$

이다.

즉, 페이딩이 없는 AWGN channel과 Rayleigh fading channel에서 수신신호의 신호 성분 평균 심벌 에너지는 동일하다.`,
    },
    { // 문제 1.C6
      "id": "25-1C6",
      "title": "1.C6.",
      "type": "essay",
      "prompt": `문제 1.C5의 결과에 따르면 Rayleigh fading channel에서 수신신호의 신호 성분 평균 심벌 에너지와 AWGN channel에서 수신신호의 신호 성분 평균 심벌 에너지가 동일함을 알 수 있다. 그렇다면 동일한 noise 조건에서 페이딩에 의해 BER은 증가할지, 감소할지, 아니면 동일할지 그 근거와 함께 추측해 보시오.

참고로 일반적으로 페이딩이 없는 채널, 즉 항상 $h=1$인 채널을 AWGN channel이라 한다.`,
      referenceAnswer: `Rayleigh fading channel과 AWGN channel에서 수신신호의 신호 성분 평균 심벌 에너지는 모두 $E_s$로 동일하다.

따라서 noise 에너지 역시 동일하다면 평균 SNR이 동일하므로 BER도 동일할 것으로 추측할 수 있다.

반면 Rayleigh fading channel에서는 페이딩 계수에 의해 순간적인 심벌 에너지가 변하고, 순간적으로 신호의 크기가 매우 작아질 수 있으므로 BER이 증가할 것으로 추측할 수도 있다.

본 문항은 실험 전 BER 성능을 예측하는 문제이므로, 자신의 추측과 그에 대한 타당한 근거를 작성하면 된다.

실제 BER 성능의 차이는 문제 2의 실험을 통해 확인한다.`,
    },
    { // 문제 1.C7
      "id": "25-1C7",
      "title": "1.C7.",
      "type": "proof",
      "prompt": `[[equation:25.3]]에서 판별변수 $D$의 noise 성분은 $ne^{-j\\angle h}$이다. AWGN 성분 $n$의 실수부와 허수부는 각각 평균 0, 분산 $N_0/2$인 독립 가우시안 분포를 따르며, $n$과 $h$는 서로 독립이라고 가정한다. 이를 이용하여 $ne^{-j\\angle h}$가 $n$과 동일한 분포를 갖는 복소 가우시안 확률변수임을 증명하시오.`,
      referenceAnswer: `AWGN 성분 $n$을

$$
n=n_I+jn_Q
$$

라 하고, 페이딩 계수의 위상을

$$
\\theta=\\angle h
$$

라 하자.

$n_I$와 $n_Q$는 서로 독립이며 각각

$$
n_I,n_Q\\sim\\mathcal{N}\\left(0,\\frac{N_0}{2}\\right)
$$

의 분포를 따른다.

Euler 공식에 의해

$$
e^{-j\\theta}=\\cos\\theta-j\\sin\\theta
$$

이므로 판별변수의 noise 성분은

$$
\\begin{aligned}
ne^{-j\\theta}
&=(n_I+jn_Q)(\\cos\\theta-j\\sin\\theta)\\\\
&=(n_I\\cos\\theta+n_Q\\sin\\theta)\\\\
&\\quad+j(n_Q\\cos\\theta-n_I\\sin\\theta)
\\end{aligned}
$$

이다.

회전된 noise의 실수부와 허수부를 각각

$$
n'_I=n_I\\cos\\theta+n_Q\\sin\\theta
$$

$$
n'_Q=n_Q\\cos\\theta-n_I\\sin\\theta
$$

라 하자.

$n$과 $h$가 서로 독립이므로 $\\theta$가 주어졌을 때 각 성분의 평균은

$$
E[n'_I\\mid\\theta]=0
$$

$$
E[n'_Q\\mid\\theta]=0
$$

이다.

각 성분의 분산은 $n_I$와 $n_Q$가 독립임을 이용하면

$$
\\begin{aligned}
\\operatorname{Var}(n'_I\\mid\\theta)
&=\\frac{N_0}{2}\\cos^2\\theta
+\\frac{N_0}{2}\\sin^2\\theta\\\\
&=\\frac{N_0}{2}
\\end{aligned}
$$

$$
\\begin{aligned}
\\operatorname{Var}(n'_Q\\mid\\theta)
&=\\frac{N_0}{2}\\cos^2\\theta
+\\frac{N_0}{2}\\sin^2\\theta\\\\
&=\\frac{N_0}{2}
\\end{aligned}
$$

이다.

또한 두 성분 사이의 공분산은

$$
\\begin{aligned}
\\operatorname{Cov}(n'_I,n'_Q\\mid\\theta)
&=-\\frac{N_0}{2}\\cos\\theta\\sin\\theta\\\\
&\\quad+\\frac{N_0}{2}\\sin\\theta\\cos\\theta\\\\
&=0
\\end{aligned}
$$

이다.

$n'_I$와 $n'_Q$는 가우시안 확률변수들의 선형결합이며 공동 가우시안 분포를 따르므로, 공분산이 0이라는 것은 서로 독립임을 의미한다.

따라서 $\\theta$의 값에 관계없이

$$
n'_I,n'_Q\\sim\\mathcal{N}\\left(0,\\frac{N_0}{2}\\right)
$$

이며 서로 독립이다. 이 조건부 분포가 $\\theta$에 의존하지 않으므로 평균화한 분포 역시 동일하다.

결국

$$
\\boxed{
ne^{-j\\angle h}\\sim\\mathcal{CN}(0,N_0)
}
$$

이므로 $ne^{-j\\angle h}$는 원래의 $n$과 동일한 분포를 갖는 복소 가우시안 확률변수이다.

즉, 복소평면에서 noise를 회전시키더라도 noise의 통계적 특성은 변하지 않는다.`,
    },
    { // 문제 1.D
      "id": "25-1D",
      "title": "1.D.",
      "prompt": `페이딩 환경에서는 [[equation:25.3]]의 $|h|$가 상수가 아니라 [[equation:25.4]]의 분포를 따르는 확률변수이다. [[equation:25.3]]에 따르면 페이딩 환경에서 BPSK 심벌의 순간적인 신호 에너지는 $|h|^2E_s=cE_s$임을 알 수 있다. BPSK에서는 $E_s=E_b$이므로 순간적인 BER은 $Q\\left(\\sqrt{\\dfrac{2cE_b}{N_0}}\\right)$이다. 그러나, $c$는 확률변수이므로 순간 BER을 $c$에 대하여 평균을 취해야 페이딩 환경에서의 평균 BER을 구할 수 있다.
$$
\\begin{aligned}
BER_{fading}
&=E_c\\left[
Q\\left(\\sqrt{\\dfrac{2cE_b}{N_0}}\\right)
\\right]\\\\
&=E_c\\left[
\\dfrac{1}{2}
\\left\\{
1-\\operatorname{erf}\\left(
\\sqrt{\\dfrac{cE_b}{N_0}}
\\right)
\\right\\}
\\right]
\\end{aligned}
\\qquad \\text{(식 25.6)}
$$`,
    },
    { // 문제 1.D1
      "id": "25-1D1",
      "title": "1.D1.",
      "type": "python",
      "starterCode": `import sympy as sp

c, EbN0 = sp.symbols('c EbN0')
instantBER = sp.Rational(1, 2) * (1 - sp.erf(sp.sqrt(c * EbN0)))
BER_fading = sp.integrate(instantBER * sp.exp(-c), (c, 0, sp.oo))
sp.pprint(BER_fading)`,
      "prompt": `아래의 Python 코드는 SymPy의 symbolic math 기능을 이용하여 Rayleigh fading channel에서 BPSK의 평균 BER을 구하는 과정이다.
\`\`\`python      
import sympy as sp

c, EbN0 = sp.symbols('c EbN0')
instantBER = sp.Rational(1, 2) * (1 - sp.erf(sp.sqrt(c * EbN0)))
BER_fading = sp.integrate(instantBER * sp.exp(-c), (c, 0, sp.oo))
sp.pprint(BER_fading)
\`\`\`
코드를 실행하고 모든 라인에 대해 다음의 지침에 따라 주석(Comment)을 작성하시오.

(지침 1) '='이 있는 라인
  - '=' 왼쪽 변수의 목적(용도)을 설명하시오.
  - '=' 오른쪽 수식이 왜 해당 변수의 의미에 부합하는지 설명하시오.
(지침 2) '='이 없는 라인
  - 명령어의 기능을 설명하시오.
  - 왜 해당 명령을 수행하는지 설명하시오.`,
      responseEnabled: true,
      referenceAnswer: `각 라인의 기능 및 목적을 주석으로 작성하면 다음과 같다.

\`\`\`python
import sympy as sp
# SymPy 라이브러리를 불러온다.
# symbolic 변수 선언, 수식 계산 및 적분을 수행하기 위함이다.

c, EbN0 = sp.symbols('c EbN0')
# c와 EbN0를 symbolic 변수로 선언한다.
# c는 페이딩 계수의 크기 제곱이고,
# EbN0는 Eb/N0의 linear scale 값을 나타낸다.
# 두 변수의 구체적인 수치 없이 수식을 계산하기 위함이다.

instantBER = sp.Rational(1, 2) * (1 - sp.erf(sp.sqrt(c * EbN0)))
# instantBER는 페이딩 환경에서의 순간 BER을 나타낸다.
# 식 25.6에 주어진 순간 BER 식을 이용하여 계산한다.
# sp.Rational(1, 2)는 정확한 분수 1/2을 나타낸다.
# sp.erf()는 error function을 계산한다.

BER_fading = sp.integrate(instantBER * sp.exp(-c), (c, 0, sp.oo))
# BER_fading은 Rayleigh fading 환경에서의 평균 BER을 나타낸다.
# 순간 BER에 c의 확률밀도함수 exp(-c)를 곱한 뒤,
# c에 대하여 0부터 무한대까지 적분하여 평균 BER을 구한다.

sp.pprint(BER_fading)
# 계산된 BER_fading의 symbolic 수식을 출력한다.
# 계산 결과를 수학적인 형태로 확인하기 위함이다.
\`\`\`

순간 BER은

$$
P_b(c)=\\frac12
\\left[
1-\\operatorname{erf}\\left(
\\sqrt{c\\frac{E_b}{N_0}}
\\right)
\\right]
$$

이고, $c$의 확률밀도함수는

$$
f_c(c)=e^{-c},
\\qquad c\\geq0
$$

이므로 평균 BER은

$$
BER_{fading}
=
\\int_0^{\\infty}
P_b(c)e^{-c}dc
$$

로 계산된다.`,
    },
    { // 문제 1.D2
      "id": "25-1D2",
      "title": "1.D2.",
      "type": "essay",
      "prompt": `[[equation:25.6]]의 우변을 수식으로 유도하면 Rayleigh fading channel에서 BPSK의 평균 BER은 다음과 같이 주어진다.
$$
P_e=
\\dfrac{1}{2}
\\left(
1-\\sqrt{
\\dfrac{E_b/N_0}{1+E_b/N_0}
}
\\right)
\\qquad \\text{(식 25.7)}
$$
문제 1.D1에서 얻은 symbolic math의 결과를 쓰고, [[equation:25.7]]의 이론식과 일치하는지 확인하시오. Symbolic math의 결과에 별도의 조건이 포함되어 있다면 해당 조건도 함께 확인하시오.`,
      referenceAnswer: `문제 1.D1의 코드를 실행하면 symbolic math의 결과가 조건에 따라 구분되는 Piecewise 형태로 출력될 수 있다.

$\\gamma=E_b/N_0$라 하면, SymPy의 출력 결과는 다음과 같다.

$$
BER_{fading}
=
\\begin{cases}
\\dfrac12-\\dfrac{1}{2\\sqrt{1+1/\\gamma}},
& |\\arg(\\gamma)|\\leq\\dfrac{\\pi}{2}\\\\
\\displaystyle\\int_0^{\\infty}
\\dfrac12
\\left(1-\\operatorname{erf}(\\sqrt{c\\gamma})\\right)
e^{-c}dc,
& \\text{otherwise}
\\end{cases}
$$

첫 번째 조건의 결과를 정리하면

$$
\\begin{aligned}
BER_{fading}
&=\\frac12-\\frac{1}{2\\sqrt{1+1/\\gamma}}\\\\
&=\\frac12
\\left(
1-\\sqrt{\\frac{\\gamma}{1+\\gamma}}
\\right)
\\end{aligned}
$$

이다.

따라서 $\\gamma>0$인 실제 통신 시스템의 조건에서는

$$
\\boxed{
BER_{fading}
=
\\frac12
\\left(
1-\\sqrt{
\\frac{E_b/N_0}{1+E_b/N_0}
}
\\right)
}
$$

이므로 식 25.7의 이론식과 일치한다.

그러나 symbolic 변수에 양수 조건을 지정하지 않았으므로 SymPy는 일반적인 복소수의 경우까지 고려한다.

따라서 다른 조건에서는 적분이 완료되지 않은 수식이 함께 출력될 수 있다.

SymPy의 버전에 따라 출력 수식의 표현이나 조건은 달라질 수 있다.`,
    },
    { // 문제 1.D3
      "id": "25-1D3",
      "title": "1.D3.",
      "type": "python",
      "starterCode": `import sympy as sp

c, EbN0 = sp.symbols('c EbN0', positive=True)
instantBER = sp.Rational(1, 2) * (1 - sp.erf(sp.sqrt(c * EbN0)))
BER_fading = sp.integrate(instantBER * sp.exp(-c), (c, 0, sp.oo))
sp.pprint(BER_fading)`,
      "prompt": `문제 1.D1의 symbolic 변수 선언 부분을 다음과 같이 수정하자.
\`\`\`python
c, EbN0 = sp.symbols('c EbN0', positive=True)
\`\`\`
여기서 \`positive=True\`는 symbolic 변수인 $c$와 $EbN0$가 양수라는 조건을 나타내기 위해 사용한 것이다.

(a) 수정된 Python 코드를 실행하고, symbolic math의 결과가 [[equation:25.7]]의 이론식과 일치하는지 확인하시오.
(b) 문제 1.D2의 결과와 다른 이유를 설명하시오.

참고로 SymPy의 symbolic math 기능을 사용할 때 symbolic 변수가 양수 또는 실수라는 조건이 존재한다면 \`positive=True\`, \`real=True\` 등의 옵션을 지정하는 것이 좋다. 별도의 조건을 지정하지 않으면 적분 결과에 여러 조건이 포함되거나 수식이 완전히 정리되지 않을 수 있다.`,
      responseEnabled: true,
      referenceAnswer: `(a) symbolic 변수를 다음과 같이 선언한다.

\`\`\`python
c, EbN0 = sp.symbols('c EbN0', positive=True)
\`\`\`

수정된 전체 코드는 다음과 같다.

\`\`\`python
import sympy as sp

c, EbN0 = sp.symbols('c EbN0', positive=True)

instantBER = sp.Rational(1, 2) * (1 - sp.erf(sp.sqrt(c * EbN0)))

BER_fading = sp.integrate(instantBER * sp.exp(-c), (c, 0, sp.oo))

sp.pprint(BER_fading)
\`\`\`

실행하면 다음과 같은 수식이 출력된다.

$$
BER_{fading}
=
\\frac12
-
\\frac{1}{2\\sqrt{1+1/EbN0}}
$$

이를 정리하면

$$
\\begin{aligned}
BER_{fading}
&=\\frac12
\\left(
1-\\frac{1}{\\sqrt{1+1/EbN0}}
\\right)\\\\
&=\\frac12
\\left(
1-\\sqrt{\\frac{EbN0}{1+EbN0}}
\\right)
\\end{aligned}
$$

이다.

여기서 $EbN0=E_b/N_0$이므로

$$
\\boxed{
BER_{fading}
=
\\frac12
\\left(
1-\\sqrt{
\\frac{E_b/N_0}{1+E_b/N_0}
}
\\right)
}
$$

이다.

따라서 식 25.7의 이론식과 일치함을 확인할 수 있다.

(b) 문제 1.D1에서는 symbolic 변수인 $c$와 $EbN0$에 별도의 조건을 지정하지 않았다.

따라서 SymPy는 해당 변수가 일반적인 복소수일 가능성까지 고려하여 조건이 포함된 Piecewise 형태의 결과를 출력하였다.

반면 본 문제에서는 \`positive=True\`를 사용하여 symbolic 변수가 양수임을 명시하였다.

실제 적분 구간의 내부에서는

$$
c>0
$$

이고, 신호 에너지와 noise 에너지의 비율은

$$
\\frac{E_b}{N_0}>0
$$

이므로 이러한 조건은 실제 계산 상황에 부합한다.

따라서 불필요한 복소수 조건을 고려할 필요가 없어지고, 식 25.7과 동일한 형태의 결과를 얻을 수 있다.`,
    },
  ]
},
    { // 문제 2
  "id": "25-2",
  "title": "2. 레일레이 페이딩 환경에서 BER 실험",
  "problems": [
    { // 문제 2.A
      "id": "25-2A",
      "title": "2.A.",
      "prompt": `Rayleigh fading 환경에서 BPSK 변조방식의 BER을 실험해 보자. 본 실험에서는 $E_b/N_0$를 0 dB부터 20 dB까지 2 dB 간격으로 변화시키면서 각 조건에서 BER을 계산한다.

각 $E_b/N_0$에 대하여 다음 과정을 반복한다.
Step 1. BPSK 송신 심벌 $s$를 생성한다.
Step 2. Rayleigh fading 계수 $h$를 생성한다.
Step 3. 복소 가우시안 noise $n$을 생성한다.
Step 4. [[equation:25.1]]을 이용하여 수신신호 $r$을 생성한다.
Step 5. [[equation:25.3]]을 이용하여 판별변수 $D$를 생성한다.
Step 6. 판별된 심벌과 송신 심벌을 비교하여 error의 개수를 계산한다.

각 $E_b/N_0$에서 error가 500개 누적될 때까지 simulation을 반복하고, 전체 송신 심벌 수에 대한 error 심벌 수의 비율을 이용하여 BER을 구한다.

아래 py 스크립트는 Rayleigh fading 환경에서 BPSK 변조방식의 BER을 실험하기 위한 코드이다.
\`\`\`python      
import numpy as np
import matplotlib.pyplot as plt

seed = XXX  # 학번 끝 세 자리
rng = np.random.default_rng(seed)

EbN0dB_vector = np.arange(0, 21, 2)
Eb = 1

BER = np.zeros(len(EbN0dB_vector))

for snr_i in range(len(EbN0dB_vector)):
    EbN0dB = EbN0dB_vector[snr_i]
    EbN0 = 10**(EbN0dB / 10)
    N0 = Eb / EbN0
    sym_cnt = 0
    err_cnt = 0
    while err_cnt < 500:
        s = np.sign(rng.random() - 0.5)
        h = np.sqrt(1/2) * (rng.standard_normal() + 1j * rng.standard_normal())
        n = np.sqrt(N0/2) * (rng.standard_normal() + 1j * rng.standard_normal())

        r = ? * s + ? # 채워야 할 부분 (1)

        D = r * np.exp(-1j * np.angle(h))
        s_hat = D / np.abs(D)
        if ??: # 채워야 할 부분 (2)
            err_cnt = err_cnt + 1
        sym_cnt = sym_cnt + 1
    BER[snr_i] = err_cnt / sym_cnt
    print("Eb/N0 =", EbN0dB, "dB, BER =", BER[snr_i])
BER_bpsk = BER.copy() # BPSK BER 결과 저장
plt.figure()
plt.semilogy(EbN0dB_vector, BER)
plt.xlabel('Eb/N0 [dB]')
plt.ylabel('BER')
plt.grid()
plt.show()
\`\`\`   
`,
    },
    { // 문제 2.A1
      "id": "25-2A1",
      "title": "2.A1.",
      "type": "python",
      "starterCode": `import numpy as np
import matplotlib.pyplot as plt

seed = XXX  # 학번 끝 세 자리
rng = np.random.default_rng(seed)

EbN0dB_vector = np.arange(0, 21, 2)
Eb = 1

BER = np.zeros(len(EbN0dB_vector))

for snr_i in range(len(EbN0dB_vector)):
    EbN0dB = EbN0dB_vector[snr_i]
    EbN0 = 10**(EbN0dB / 10)
    N0 = Eb / EbN0
    sym_cnt = 0
    err_cnt = 0
    while err_cnt < 500:
        s = np.sign(rng.random() - 0.5)
        h = np.sqrt(1/2) * (rng.standard_normal() + 1j * rng.standard_normal())
        n = np.sqrt(N0/2) * (rng.standard_normal() + 1j * rng.standard_normal())

        r = ? * s + ? # 채워야 할 부분 (1)

        D = r * np.exp(-1j * np.angle(h))
        s_hat = D / np.abs(D)
        if ??: # 채워야 할 부분 (2)
            err_cnt = err_cnt + 1
        sym_cnt = sym_cnt + 1
    BER[snr_i] = err_cnt / sym_cnt
    print("Eb/N0 =", EbN0dB, "dB, BER =", BER[snr_i])
BER_bpsk = BER.copy() # BPSK BER 결과 저장
plt.figure()
plt.semilogy(EbN0dB_vector, BER)
plt.xlabel('Eb/N0 [dB]')
plt.ylabel('BER')
plt.grid()
plt.show()`,
      "prompt": `(a) 다음 세 부분이 해당 형태로 작성된 이유를 설명하시오.
\`\`\`python
h = np.sqrt(1/2) * (rng.standard_normal() + 1j * rng.standard_normal())
n = np.sqrt(N0/2) * (rng.standard_normal() + 1j * rng.standard_normal())
D = r * np.exp(-1j * np.angle(h))
\`\`\`
또한, 송신 심벌 $s$를 생성하는 코드로부터 \`Eb = 1\`로 설정한 이유를 설명하시오.

(b) 코드의 모든 빈칸을 적절히 채우시오.
\`\`\`python
r = ? * s + ? # 채워야 할 부분 (1)
if ??: # 채워야 할 부분 (2)
  err_cnt = err_cnt + 1
\`\`\`
완성된 코드의 모든 라인에 대해 다음의 지침에 따라 주석(Comment)을 작성하시오.

(지침 1) '='이 있는 라인
  - '=' 왼쪽 변수의 목적(용도)을 설명하시오.
  - '=' 오른쪽 수식이 왜 해당 변수의 의미에 부합하는지 설명하시오.
(지침 2) '='이 없는 라인
  - 명령어의 기능을 설명하시오.
  - 왜 해당 명령을 수행하는지 설명하시오.`,
      responseEnabled: true,
      referenceAnswer: `(a) 각 코드가 해당 형태로 작성된 이유는 다음과 같다.

\`\`\`python
h = np.sqrt(1/2) * (rng.standard_normal() + 1j * rng.standard_normal())
\`\`\`

Rayleigh fading 계수 $h$는 실수부와 허수부가 각각 평균 0, 분산 $1/2$인 독립 가우시안 분포를 따라야 한다.

표준정규분포 난수에 $\\sqrt{1/2}$를 곱하면 분산이 $1/2$이 되므로 위와 같이 작성한다.

\`\`\`python
n = np.sqrt(N0/2) * (rng.standard_normal() + 1j * rng.standard_normal())
\`\`\`

복소 AWGN 성분 $n$의 실수부와 허수부는 각각 평균 0, 분산 $N_0/2$인 독립 가우시안 분포를 따라야 한다.

따라서 표준정규분포 난수에 $\\sqrt{N_0/2}$를 곱하여 복소 AWGN을 생성한다.

\`\`\`python
D = r * np.exp(-1j * np.angle(h))
\`\`\`

식 25.3에 따라 수신신호 $r$을 페이딩 계수 $h$의 위상만큼 역회전하여 판별변수 $D$를 생성한다.

$$
D=re^{-j\\angle h}
=|h|s+ne^{-j\\angle h}
$$

이를 통해 페이딩에 의해 변화한 신호의 위상을 보상할 수 있다.

또한 송신 심벌은

\`\`\`python
s = np.sign(rng.random() - 0.5)
\`\`\`

와 같이 생성되므로 거의 확실하게 $+1$ 또는 $-1$의 값을 동일한 확률로 갖는다.

따라서 평균 심벌 에너지는

$$
E_s=E[|s|^2]=1
$$

이고, BPSK에서는 한 심벌이 하나의 bit를 전송하므로

$$
\\boxed{E_b=E_s=1}
$$

이다.

(b) 빈칸을 채우면 다음과 같다.

\`\`\`python
r = h * s + n

if s_hat != s:
    err_cnt = err_cnt + 1
\`\`\`

완성된 코드에 주석을 작성하면 다음과 같다.

\`\`\`python
import numpy as np
# 난수 생성 및 수치 연산을 위해 NumPy를 불러온다.

import matplotlib.pyplot as plt
# BER 결과를 그래프로 표시하기 위해 Matplotlib을 불러온다.

seed = XXX
# 학번 끝 세 자리를 random seed로 설정한다.

rng = np.random.default_rng(seed)
# 동일한 seed에서 난수 생성 결과를 재현하기 위한 난수 생성기를 정의한다.

EbN0dB_vector = np.arange(0, 21, 2)
# BER 실험에 사용할 Eb/N0 값을 0~20 dB 범위에서 2 dB 간격으로 생성한다.

Eb = 1
# BPSK 송신 심벌이 +1 또는 -1이므로 비트 에너지를 1로 설정한다.

BER = np.zeros(len(EbN0dB_vector))
# 각 Eb/N0에서 계산한 BER을 저장할 배열을 초기화한다.

for snr_i in range(len(EbN0dB_vector)):
    # 설정한 모든 Eb/N0에 대하여 BER 실험을 반복한다.

    EbN0dB = EbN0dB_vector[snr_i]
    # 현재 실험에 사용할 dB 단위의 Eb/N0 값을 가져온다.

    EbN0 = 10**(EbN0dB / 10)
    # dB 단위의 Eb/N0를 linear scale로 변환한다.

    N0 = Eb / EbN0
    # Eb/N0와 비트 에너지 Eb를 이용하여 N0를 계산한다.

    sym_cnt = 0
    # 전체 송신 심벌 수를 0으로 초기화한다.

    err_cnt = 0
    # 오류가 발생한 심벌 수를 0으로 초기화한다.

    while err_cnt < 500:
        # 오류가 500개 누적될 때까지 실험을 반복한다.

        s = np.sign(rng.random() - 0.5)
        # +1 또는 -1의 값을 갖는 BPSK 송신 심벌을 생성한다.

        h = np.sqrt(1/2) * (rng.standard_normal() + 1j * rng.standard_normal())
        # 실수부와 허수부가 각각 평균 0, 분산 1/2인 페이딩 계수를 생성한다.

        n = np.sqrt(N0/2) * (rng.standard_normal() + 1j * rng.standard_normal())
        # 실수부와 허수부가 각각 평균 0, 분산 N0/2인 복소 AWGN을 생성한다.

        r = h * s + n
        # 식 25.1에 따라 페이딩과 AWGN이 적용된 수신신호를 생성한다.

        D = r * np.exp(-1j * np.angle(h))
        # 식 25.3에 따라 페이딩 계수의 위상을 보상하여 판별변수를 생성한다.

        s_hat = D / np.abs(D)
        # 판별변수 D를 크기로 나누어 복소수의 sign 연산을 수행한다.

        if s_hat != s:
            # 판별된 심벌과 송신 심벌이 서로 다른지 확인한다.

            err_cnt = err_cnt + 1
            # 오류가 발생한 경우 오류 개수를 1 증가시킨다.

        sym_cnt = sym_cnt + 1
        # 하나의 심벌을 전송하였으므로 전체 송신 심벌 수를 1 증가시킨다.

    BER[snr_i] = err_cnt / sym_cnt
    # 오류 심벌 수를 전체 송신 심벌 수로 나누어 BER을 계산하고 저장한다.

    print("Eb/N0 =", EbN0dB, "dB, BER =", BER[snr_i])
    # 현재 Eb/N0와 계산된 BER을 출력한다.

BER_bpsk = BER.copy()
# 현재 BPSK BER 결과를 별도의 배열에 복사하여 저장한다.

plt.figure()
# BER 그래프를 표시할 새로운 Figure를 생성한다.

plt.semilogy(EbN0dB_vector, BER)
# x축은 linear scale, y축은 logarithmic scale로 BER 그래프를 그린다.

plt.xlabel('Eb/N0 [dB]')
# x축의 이름과 단위를 표시한다.

plt.ylabel('BER')
# y축의 이름을 표시한다.

plt.grid()
# 그래프에 격자를 표시한다.

plt.show()
# 완성된 BER 그래프를 출력한다.
\`\`\`

본 코드에서는 복소수의 sign 연산을 그대로 사용하였으며, 이에 따른 판별 결과는 문제 2.B와 2.C에서 확인한다.`,
    },
    { // 문제 2.A2
      "id": "25-2A2",
      "title": "2.A2.",
      "type": "essay",
      "prompt": `문제 2.A1에서 Rayleigh fading 계수 $h$를 생성하는 부분은 다음과 같다.
\`\`\`python
h = np.sqrt(1/2) * (rng.standard_normal() + 1j * rng.standard_normal())
\`\`\`
위 코드가 \`while\` 반복문 내부에 위치해야 하는 이유를 설명하시오. 즉, 위 코드를 \`while\` 반복문 바로 앞에 위치하도록 수정하면 안 되는 이유를 설명하시오.`,
      referenceAnswer: `Rayleigh fading 환경에서 페이딩 계수 $h$는 일정한 상수가 아니라 복소 가우시안 분포를 따르는 확률변수이다.

본 실험에서는 각 송신 심벌에 대하여 독립적인 페이딩 계수를 생성한다고 가정한다.

따라서

\`\`\`python
h = np.sqrt(1/2) * (rng.standard_normal() + 1j * rng.standard_normal())
\`\`\`

는 \`while\` 반복문 내부에 위치해야 한다.

이렇게 하면 각 심벌을 전송할 때마다 새로운 페이딩 계수가 생성되어 순간적인 수신신호의 크기와 위상이 랜덤하게 변화한다.

반면 위 코드를 반복문 외부에 위치시키면 해당 $E_b/N_0$에서 모든 심벌에 동일한 페이딩 계수가 적용되므로 다양한 페이딩 상태에 대한 평균 BER을 구할 수 없다.`,
    },
    { // 문제 2.A3
      "id": "25-2A3",
      "title": "2.A3.",
      "type": "essay",
      "prompt": `만약 문제 2.A1에서 페이딩 계수 $h$를 생성하는 코드를 \`while\` 반복문 바로 앞에 위치하도록 수정한다면, 이때 얻어지는 BER 결과는 어떤 의미를 갖게 되는지 설명하시오.`,
      referenceAnswer: `페이딩 계수 $h$를 생성하는 코드를 \`while\` 반복문 바로 앞에 위치시키면 각 $E_b/N_0$에서 하나의 페이딩 계수만 생성된다.

따라서 해당 $E_b/N_0$에 대한 simulation이 진행되는 동안 $h$는 일정하게 유지되고, 송신 심벌 $s$와 AWGN 성분 $n$만 변화한다.

이 경우 올바른 BPSK 판별식을 사용하더라도 얻어지는 BER은 특정 페이딩 계수 $h$가 주어졌을 때의 조건부 BER이다.

$$
P_b(h)
=
Q\\left(
\\sqrt{\\frac{2|h|^2E_b}{N_0}}
\\right)
$$

즉, 순간적인 $|h|^2E_b/N_0$에 대한 BER을 구하는 것이다.

Rayleigh fading channel의 평균 BER은 다양한 페이딩 상태에 대하여

$$
BER_{fading}
=
E_h\\left[
Q\\left(
\\sqrt{\\frac{2|h|^2E_b}{N_0}}
\\right)
\\right]
$$

와 같이 평균을 취해야 한다.

따라서 반복문 외부에서 $h$를 한 번만 생성하면 Rayleigh fading channel의 평균 BER을 올바르게 얻을 수 없다.

단, 문제 2.A1의 잘못된 판별식을 그대로 사용하면 이러한 차이와 무관하게 BER은 거의 확실하게 1로 나타난다.`,
    },
    { // 문제 2.B
      "id": "25-2B",
      "title": "2.B.",
      "type": "python",
      "starterCode": `# 문제 2.A1에서 계산한 BER 사용

plt.figure()
plt.semilogy(EbN0dB_vector, BER)
plt.xlabel('Eb/N0 [dB]')
plt.ylabel('BER')
plt.grid()
plt.show()`,
      "prompt": `문제 2.A1의 완성된 Python 코드를 실행하여 얻은 BER 결과 그래프를 확인하시오. $E_b/N_0$가 증가함에 따라 BER이 어떻게 변화하는지 관찰하고, 출력된 BER 값을 확인하시오.`,
      responseEnabled: true,
      referenceAnswer: `출력된 BER 그래프는 모든 $E_b/N_0$에서

$$
\\boxed{BER=1}
$$

인 수평선 형태로 나타난다.

즉,

$$
E_b/N_0=0,2,4,\\ldots,20\\text{ dB}
$$

의 모든 조건에서 BER이 1로 계산된다.

일반적인 디지털통신 시스템에서는 $E_b/N_0$가 증가할수록 BER이 감소해야 하지만, 본 실험에서는 그러한 변화가 나타나지 않는다.

이는 문제 2.A1에서 사용한 판별식에 문제가 있음을 의미하며, 그 원인은 문제 2.C에서 확인한다.`,
    },
    { // 문제 2.C
      "id": "25-2C",
      "title": "2.C.",
      "type": "essay",
      "prompt": `문제 2.B의 BER 결과가 모든 $E_b/N_0$에서 1임을 확인하자. 이러한 결과가 발생하는 이유는 다음과 같이 복소수인 판별변수 $D$에 복소수의 sign 연산을 적용하였기 때문이다.
\`\`\`python
s_hat = D / np.abs(D)
\`\`\`
올바른 BPSK 판별을 위해서는 다음과 같이 수정해야 한다.
\`\`\`python
s_hat = np.sign(np.real(D))
\`\`\`
판별변수 $D$에 포함된 신호 성분은 $|h|\\sqrt{E_b}$ 또는 $-|h|\\sqrt{E_b}$이므로 이미 실수이다. 그럼에도 불구하고 $D$의 실수부를 취한 뒤 부호를 판별해야 하는 이유를 설명하시오.`,
      referenceAnswer: `식 25.3에 따라 판별변수 $D$는

$$
D=|h|s+ne^{-j\\angle h}
$$

이다.

BPSK 송신 심벌은

$$
s=\\pm\\sqrt{E_b}
$$

이므로 판별변수의 신호 성분인 $|h|s$는 실수이다.

그러나 noise 성분인 $ne^{-j\\angle h}$는 복소 가우시안 확률변수이므로 판별변수 $D$는 일반적으로 복소수가 된다.

기존 코드

\`\`\`python
s_hat = D / np.abs(D)
\`\`\`

는 다음과 같은 복소수의 sign 연산을 수행한다.

$$
\\hat{s}
=
\\frac{D}{|D|}
=
e^{j\\angle D}
$$

따라서 판별 결과는 복소평면의 단위원 위에 위치하며, 일반적으로 실수인 $+1$ 또는 $-1$과 정확히 일치하지 않는다.

결과적으로

\`\`\`python
if s_hat != s:
\`\`\`

가 거의 확실하게 참이 되어 BER이 1로 계산된다.

BPSK의 정보는 판별변수의 실수부에 포함되어 있으므로 허수부는 판별에 사용할 필요가 없다.

따라서 판별변수의 실수부를 취한 뒤 부호를 판별해야 한다.

\`\`\`python
s_hat = np.sign(np.real(D))
\`\`\`

이 경우

$$
\\hat{s}=
\\begin{cases}
+1,&\\operatorname{Re}(D)>0\\\\
-1,&\\operatorname{Re}(D)<0
\\end{cases}
$$

가 되어 올바른 BPSK 판별을 수행할 수 있다.`,
    },
    { // 문제 2.D
      "id": "25-2D",
      "title": "2.D.",
      "type": "python",
      "prompt": `문제 2.A1의 Python 코드에서
\`\`\`python
s_hat = D / np.abs(D)
\`\`\`
를 다음과 같이 수정하자.
\`\`\`python
s_hat = np.sign(np.real(D))
\`\`\`
수정된 Python 코드를 실행하고 BER 결과 그래프를 확인하시오. 문제 2.B에서 얻은 BER 결과와 비교하여 $E_b/N_0$의 증가에 따른 BER의 변화를 관찰하시오.`,
      responseEnabled: true,
      referenceAnswer: `문제 2.A1에서 사용한 판별식을 다음과 같이 수정한다.

수정 전:

\`\`\`python
s_hat = D / np.abs(D)
\`\`\`

수정 후:

\`\`\`python
s_hat = np.sign(np.real(D))
\`\`\`

수정된 코드를 실행하면 문제 2.B와 달리 $E_b/N_0$가 증가할수록 BER이 감소하는 형태의 그래프가 나타난다.

Rayleigh fading channel에서 BPSK의 이론적인 BER은 다음과 같으므로 실험 결과도 이 값들에 가까워진다.

[[table:
caption:Eb/N0에 따른 BPSK의 이론 BER
Eb/N0 (dB) | BER
0 | 0.14645
10 | 0.02327
20 | 0.00248
]]

실제 simulation 결과는 random seed와 유한한 실험 횟수에 따라 위 값과 약간의 차이가 발생할 수 있다.

기존에는 복소수의 sign 연산으로 인해 모든 심벌이 잘못 판별되었지만, 수정 후에는 판별변수의 실수부를 이용하여 정상적인 BPSK 판별이 이루어진다.

따라서 $E_b/N_0$가 증가함에 따라 BER이 감소하는 정상적인 결과를 얻을 수 있다.

이후 문제에서 실험 결과를 사용하기 위해 수정된 코드의 BER 결과를 다음과 같이 저장한다.

\`\`\`python
BER_bpsk = BER.copy()
\`\`\``,
    },
    { // 문제 2.E
      "id": "25-2E",
      "title": "2.E.",
      "type": "python",
      "starterCode": `EbN0_vector = 10**(EbN0dB_vector / 10)

BER_theory = 0.5 * (
    1 - np.sqrt(EbN0_vector / (1 + EbN0_vector))
)

plt.figure()

plt.semilogy(
    EbN0dB_vector,
    BER_bpsk,
    'b',
    label='Rayleigh fading, Simulation'
)

plt.semilogy(
    EbN0dB_vector,
    BER_theory,
    'r',
    label='Rayleigh fading, Theory'
)

plt.xlabel('Eb/N0 [dB]')
plt.ylabel('BER')
plt.legend()
plt.grid()
plt.show()`,
      "prompt": `Rayleigh fading channel에서 BPSK 신호의 이론적인 BER은 [[equation:25.7]]과 같이 주어진다. 아래 Python 코드를 실행하여 이론적인 BER 곡선을 문제 2.D에서 얻은 실험 BER 곡선과 하나의 그래프에 겹쳐 그리시오. 두 BER 곡선을 관찰하시오.`,
      responseEnabled: true,
      referenceAnswer: `Rayleigh fading channel에서 BPSK의 이론적인 BER은 식 25.7에 의해

$$
P_e=
\\frac12
\\left(
1-\\sqrt{
\\frac{E_b/N_0}{1+E_b/N_0}
}
\\right)
$$

으로 주어진다.

이를 Python으로 계산하면 다음과 같다.

\`\`\`python
EbN0_vector = 10**(EbN0dB_vector / 10)

BER_theory = 0.5 * (
    1 - np.sqrt(EbN0_vector / (1 + EbN0_vector))
)
\`\`\`

실행 결과, 하나의 그래프에 다음 두 개의 BER 곡선이 나타난다.

- 파란색: Rayleigh fading channel의 simulated BER
- 빨간색: Rayleigh fading channel의 theoretical BER

두 BER 곡선 모두 $E_b/N_0$가 증가함에 따라 감소하며, 서로 거의 일치하는 형태를 나타낸다.

따라서 문제 2.D에서 구현한 BPSK BER simulation이 Rayleigh fading channel의 이론적인 BER 성능을 잘 재현함을 확인할 수 있다.`,
    },
    { // 문제 2.F
      "id": "25-2F",
      "title": "2.F.",
      "type": "essay",
      "prompt": `문제 2.E에서 얻은 BER 그래프를 이용하여 자신의 simulation 결과가 이론적인 BER과 일치하는지 확인하시오. 두 결과 사이에 차이가 존재한다면 그 이유도 간략히 설명하시오.`,
      referenceAnswer: `문제 2.E에서 얻은 simulation BER 곡선과 theoretical BER 곡선을 비교하면 두 곡선이 전반적으로 거의 일치하는 것을 확인할 수 있다.

두 결과 사이에 작은 차이가 발생하는 이유는 simulation에서 랜덤하게 생성되는 BPSK 심벌, 페이딩 계수 및 AWGN을 이용하여 유한한 횟수의 Monte Carlo simulation을 수행하기 때문이다.

본 실험에서는 각 $E_b/N_0$에서 오류가 500개 누적될 때까지 simulation을 수행하므로 통계적 오차가 발생할 수 있다.

누적 오류 개수의 기준을 증가시켜 더 많은 심벌에 대해 실험하면 일반적으로 BER 추정값의 정확도가 향상된다.

따라서 작은 통계적 오차를 제외하면 실험 결과는 이론적인 BER과 일치한다고 판단할 수 있다.`,
    },
    { // 문제 2.G
      "id": "25-2G",
      "title": "2.G.",
      "prompt": `AWGN channel과 Rayleigh fading channel에서 BPSK 변조방식의 BER 성능을 비교해 보자.`,
    },
    { // 문제 2.G1
      "id": "25-2G1",
      "title": "2.G1.",
      "type": "proof",
      "prompt": `AWGN channel에서 BPSK 변조방식의 이론적인 BER을 $E_b/N_0$에 대한 함수로 나타내시오.`,
      referenceAnswer: `AWGN channel에서 BPSK 변조방식의 이론적인 BER은

$$
\\boxed{
P_b=
Q\\left(
\\sqrt{\\frac{2E_b}{N_0}}
\\right)
}
$$

이다.

Q-function과 complementary error function 사이에는

$$
Q(x)
=
\\frac12\\operatorname{erfc}
\\left(
\\frac{x}{\\sqrt2}
\\right)
$$

의 관계가 성립한다.

따라서 AWGN channel에서 BPSK의 BER은 다음과 같이 나타낼 수도 있다.

$$
\\boxed{
P_b=
\\frac12\\operatorname{erfc}
\\left(
\\sqrt{\\frac{E_b}{N_0}}
\\right)
}
$$`,
    },
    { // 문제 2.G2
      "id": "25-2G2",
      "title": "2.G2.",
      "type": "python",
      "starterCode": `from scipy.special import erfc

BER_AWGN = 0.5 * erfc(np.sqrt(EbN0_vector))

plt.figure()

plt.semilogy(
    EbN0dB_vector,
    BER_bpsk,
    'b',
    label='Rayleigh fading, Simulation'
)

plt.semilogy(
    EbN0dB_vector,
    BER_theory,
    'r',
    label='Rayleigh fading, Theory'
)

plt.semilogy(
    EbN0dB_vector,
    BER_AWGN,
    'g',
    label='AWGN'
)

plt.axis([0, 20, 1e-6, 1])

plt.xlabel('Eb/N0 [dB]')
plt.ylabel('BER')
plt.legend()
plt.grid()
plt.show()`,
      "prompt": `위 Python 코드를 실행하여 AWGN channel에서 BPSK의 이론적인 BER 곡선을 문제 2.D와 2.E에서 얻은 BER 곡선에 겹쳐 그리시오.

하나의 그래프에 다음 세 개의 BER 곡선이 나타나는지 확인하시오.
- Rayleigh fading channel의 simulated BER
- Rayleigh fading channel의 theoretical BER
- AWGN channel의 theoretical BER

세 BER 곡선의 형태를 관찰하시오.`,
      responseEnabled: true,
      referenceAnswer: `AWGN channel에서 BPSK의 이론적인 BER은

$$
P_b=
\\frac12\\operatorname{erfc}
\\left(
\\sqrt{\\frac{E_b}{N_0}}
\\right)
$$

이므로 Python에서는 다음과 같이 계산한다.

\`\`\`python
from scipy.special import erfc

BER_AWGN = 0.5 * erfc(np.sqrt(EbN0_vector))
\`\`\`

출력된 그래프에는 다음 세 개의 BER 곡선이 나타난다.

- 파란색: Rayleigh fading channel의 simulated BER
- 빨간색: Rayleigh fading channel의 theoretical BER
- 초록색: AWGN channel의 theoretical BER

Rayleigh fading channel의 실험값과 이론값은 거의 일치한다.

반면 AWGN channel의 BER은 동일한 $E_b/N_0$에서 Rayleigh fading channel의 BER보다 낮으며, $E_b/N_0$가 증가할수록 훨씬 빠르게 감소하는 형태를 나타낸다.`,
    },
    { // 문제 2.H
      "id": "25-2H",
      "title": "2.H.",
      "type": "essay",
      "prompt": `문제 2.G2에서 얻은 Rayleigh fading channel과 AWGN channel의 BER 곡선을 비교하시오.

다음 두 가지 관점에서 BER 곡선의 차이점을 설명하시오.

(a) BER 곡선의 순간 기울기 및 $E_b/N_0$ 증가에 따른 기울기의 변화
(b) $E_b/N_0$ 증가에 따른 두 채널의 BER 성능 차이`,
      referenceAnswer: `(a) BER 곡선의 순간 기울기

Rayleigh fading channel에서는 $E_b/N_0$가 증가함에 따라 BER이 감소하며, 높은 $E_b/N_0$ 영역에서는 BER 곡선의 기울기가 거의 일정해진다.

Rayleigh fading channel에서 BPSK의 이론적인 BER은

$$
P_{b,fading}
=
\\frac12
\\left(
1-\\sqrt{\\frac{\\gamma}{1+\\gamma}}
\\right)
$$

이다. 여기서

$$
\\gamma=\\frac{E_b}{N_0}
$$

이다.

높은 SNR 영역에서는 위 식을 다음과 같이 근사할 수 있다.

$$
P_{b,fading}
\\approx
\\frac{1}{4\\gamma}
$$

따라서 높은 SNR 영역에서 BER 곡선은 semilogy 그래프상 거의 일정한 기울기를 갖는 직선 형태로 나타난다.

반면 AWGN channel의 BER은

$$
P_{b,AWGN}
=
Q(\\sqrt{2\\gamma})
$$

이며, 높은 SNR 영역에서는

$$
P_{b,AWGN}
\\approx
\\frac{e^{-\\gamma}}{\\sqrt{4\\pi\\gamma}}
$$

와 같이 지수적으로 감소한다.

따라서 $E_b/N_0$가 증가할수록 AWGN channel의 BER 곡선은 더욱 가파르게 감소한다.

(b) 두 채널의 BER 성능 차이

동일한 $E_b/N_0$에서 AWGN channel의 BER이 Rayleigh fading channel의 BER보다 낮다.

또한 $E_b/N_0$가 증가할수록 AWGN channel의 BER은 Rayleigh fading channel보다 훨씬 빠르게 감소하므로 두 채널 간의 상대적인 BER 성능 차이가 커진다.

이는 Rayleigh fading channel에서는 평균 SNR이 높더라도 순간적으로 페이딩 계수의 크기가 작아지는 상황이 발생할 수 있기 때문이다.

따라서 Rayleigh fading channel의 BER 성능은 AWGN channel보다 불리하다.`,
    },
    { // 문제 2.I
      "id": "25-2I",
      "title": "2.I.",
      "type": "essay",
      "prompt": `문제 2.H에서 비교한 결과가 문제 1.C6에서 자신이 예측했던 결과와 일치하는지 쓰시오. 또한, 두 채널에서 수신신호의 평균 심벌 에너지가 동일함에도 BER 성능이 달라질 수 있는 이유를 설명하시오.`,
      referenceAnswer: `문제 2.H의 결과에 따르면 동일한 평균 심벌 에너지와 noise 조건에서도 Rayleigh fading channel의 BER이 AWGN channel의 BER보다 높다.

따라서 문제 1.C6에서 BER이 동일할 것으로 예측하였다면 실제 실험 결과와 일치하지 않는다.

반면 순간적인 심벌 에너지의 변화를 고려하여 BER이 증가할 것으로 예측하였다면 실험 결과와 일치한다.

AWGN channel에서는 $h=1$이므로 신호 성분의 심벌 에너지가 일정하게 유지된다.

그러나 Rayleigh fading channel에서는 순간적인 심벌 에너지가

$$
|h|^2E_s=cE_s
$$

로 주어지며, 페이딩 계수에 따라 랜덤하게 변화한다.

평균적으로는

$$
E[cE_s]=E_s
$$

이지만, 순간적으로 $c$가 매우 작은 값을 가지면 수신신호의 에너지가 크게 감소하여 오류가 발생할 확률이 증가한다.

또한 순간 SNR이 증가할 때 얻는 BER 감소 효과보다 순간 SNR이 감소할 때 발생하는 BER 증가 효과가 더 크다.

즉,

$$
E_c\\left[
Q(\\sqrt{2c\\gamma})
\\right]
>
Q(\\sqrt{2\\gamma})
$$

가 성립한다.

따라서 평균 심벌 에너지와 평균 SNR이 동일하더라도 Rayleigh fading channel의 BER 성능이 AWGN channel보다 나쁘게 나타난다.`,
    },
    { // 문제 2.J
      "id": "25-2J",
      "title": "2.J.",
      "prompt": `이제 문제 2.D에서 완성한 Python 코드를 수정하여 Rayleigh fading 환경에서 QPSK 변조방식의 BER을 실험해 보자.
\`\`\`python 
import numpy as np
import matplotlib.pyplot as plt

seed = XXX  # 학번 끝 세 자리
rng = np.random.default_rng(seed)

EbN0dB_vector = np.arange(0, 21, 2)
Eb = 1

BER = np.zeros(len(EbN0dB_vector))

for snr_i in range(len(EbN0dB_vector)):
    EbN0dB = EbN0dB_vector[snr_i]
    EbN0 = 10**(EbN0dB / 10)
    N0 = Eb / EbN0
    sym_cnt = 0

    err_cnt = 0
    while err_cnt < 500:
        s = (np.sqrt(Eb) * np.sign(rng.random() - 0.5) + 1j * np.sqrt(Eb) * np.sign(rng.random() - 0.5))
        h = np.sqrt(1/2) * (rng.standard_normal() + 1j * rng.standard_normal())
        n = np.sqrt(N0/2) * (rng.standard_normal() + 1j * rng.standard_normal())
        r = h * s + n
        D = r * np.exp(-1j * np.angle(h))
        s_hat = np.sign(np.real(D))
        s_hat2 = np.sign(np.imag(D))
        if np.sign(np.real(s)) != s_hat:
            err_cnt = err_cnt + 1
        if np.sign(np.imag(s)) != s_hat2:
            err_cnt = err_cnt + 1
        sym_cnt = sym_cnt + 2
    BER[snr_i] = err_cnt / sym_cnt
    print("Eb/N0 =", EbN0dB, "dB, BER =", BER[snr_i])
# QPSK BER 결과 저장
BER_qpsk = BER.copy()
plt.figure()
plt.semilogy(EbN0dB_vector, BER_qpsk)
plt.xlabel('Eb/N0 [dB]')
plt.ylabel('BER')
plt.grid()
plt.show()
\`\`\`
BPSK에서는 한 심벌이 하나의 bit를 전송하지만, QPSK에서는 한 심벌이 두 개의 bit를 전송한다. 본 실험에서는 QPSK 송신 심벌 $s$를 다음과 같이 생성한다.
$$
s=\\sqrt{E_b}a_I+j\\sqrt{E_b}a_Q
$$
여기서 $a_I$와 $a_Q$는 각각 $+1$ 또는 $-1$의 값을 동일한 확률로 갖는 독립적인 확률변수이다. 따라서 QPSK 수신기에서는 판별변수 $D$의 실수부와 허수부를 각각 이용하여 두 개의 bit를 판별해야 한다.`,
    },
    { // 문제 2.J1
      "id": "25-2J1",
      "title": "2.J1.",
      "type": "python",
      "starterCode": `import numpy as np
import matplotlib.pyplot as plt

seed = XXX  # 학번 끝 세 자리
rng = np.random.default_rng(seed)

EbN0dB_vector = np.arange(0, 21, 2)
Eb = 1

BER = np.zeros(len(EbN0dB_vector))

for snr_i in range(len(EbN0dB_vector)):
    EbN0dB = EbN0dB_vector[snr_i]
    EbN0 = 10**(EbN0dB / 10)
    N0 = Eb / EbN0
    sym_cnt = 0

    err_cnt = 0
    while err_cnt < 500:
        s = (np.sqrt(Eb) * np.sign(rng.random() - 0.5) + 1j * np.sqrt(Eb) * np.sign(rng.random() - 0.5))
        h = np.sqrt(1/2) * (rng.standard_normal() + 1j * rng.standard_normal())
        n = np.sqrt(N0/2) * (rng.standard_normal() + 1j * rng.standard_normal())
        r = h * s + n
        D = r * np.exp(-1j * np.angle(h))
        s_hat = np.sign(np.real(D))
        s_hat2 = np.sign(np.imag(D))
        if np.sign(np.real(s)) != s_hat:
            err_cnt = err_cnt + 1
        if np.sign(np.imag(s)) != s_hat2:
            err_cnt = err_cnt + 1
        sym_cnt = sym_cnt + 2
    BER[snr_i] = err_cnt / sym_cnt
    print("Eb/N0 =", EbN0dB, "dB, BER =", BER[snr_i])
# QPSK BER 결과 저장
BER_qpsk = BER.copy()
plt.figure()
plt.semilogy(EbN0dB_vector, BER_qpsk)
plt.xlabel('Eb/N0 [dB]')
plt.ylabel('BER')
plt.grid()
plt.show()`,
      "prompt": `위 Python 코드에서 다음 부분은 문제 2.D의 BPSK BER simulation 코드에서 새롭게 수정된 부분이다.
\`\`\`python
s = (np.sqrt(Eb) * np.sign(rng.random() - 0.5) + 1j * np.sqrt(Eb) * np.sign(rng.random() - 0.5))

s_hat = np.sign(np.real(D))
s_hat2 = np.sign(np.imag(D))

if np.sign(np.real(s)) != s_hat:
    err_cnt = err_cnt + 1
if np.sign(np.imag(s)) != s_hat2:
    err_cnt = err_cnt + 1
sym_cnt = sym_cnt + 2
\`\`\`
수정된 모든 라인에 대해 다음의 지침에 따라 주석(Comment)을 작성하시오.

(지침 1) '='이 있는 라인
  - '=' 왼쪽 변수의 목적(용도)을 설명하시오.
  - '=' 오른쪽 수식이 왜 해당 변수의 의미에 부합하는지 설명하시오.
(지침 2) '='이 없는 라인
  - 명령어의 기능을 설명하시오.
  - 왜 해당 명령을 수행하는지 설명하시오.

특히 BPSK에서는 \`sym_cnt\`를 1씩 증가시켰으나 QPSK에서는 2씩 증가시키는 이유를 설명하시오.`,
      responseEnabled: true,
      referenceAnswer: `BPSK BER simulation 코드에서 QPSK BER simulation을 위해 수정된 부분에 주석을 작성하면 다음과 같다.

\`\`\`python
s = (np.sqrt(Eb) * np.sign(rng.random() - 0.5) + 1j * np.sqrt(Eb) * np.sign(rng.random() - 0.5))
# QPSK 송신 심벌 s를 생성한다.
# 실수부와 허수부는 각각 독립적으로 +sqrt(Eb) 또는 -sqrt(Eb)를 갖는다.
# 따라서 하나의 복소 심벌에 두 개의 bit를 포함시킬 수 있다.

s_hat = np.sign(np.real(D))
# 판별변수 D의 실수부에 대한 부호를 판별한다.
# QPSK 심벌의 In-phase 성분에 포함된 bit를 검출한다.

s_hat2 = np.sign(np.imag(D))
# 판별변수 D의 허수부에 대한 부호를 판별한다.
# QPSK 심벌의 Quadrature-phase 성분에 포함된 bit를 검출한다.

if np.sign(np.real(s)) != s_hat:
    # 송신 심벌의 실수부 부호와 검출된 I 채널의 부호를 비교한다.

    err_cnt = err_cnt + 1
    # I 채널에서 bit error가 발생하면 오류 개수를 1 증가시킨다.

if np.sign(np.imag(s)) != s_hat2:
    # 송신 심벌의 허수부 부호와 검출된 Q 채널의 부호를 비교한다.

    err_cnt = err_cnt + 1
    # Q 채널에서 bit error가 발생하면 오류 개수를 1 증가시킨다.

sym_cnt = sym_cnt + 2
# 하나의 QPSK 심벌에는 두 개의 bit가 포함되므로
# 전체 송신 bit 수를 2 증가시킨다.
\`\`\`

QPSK 송신 심벌은

$$
s=\\sqrt{E_b}a_I+j\\sqrt{E_b}a_Q
$$

로 주어지며, $a_I$와 $a_Q$는 각각 $+1$ 또는 $-1$의 값을 갖는다.

따라서 가능한 constellation point는

$$
(\\sqrt{E_b},\\sqrt{E_b}),
\\quad
(\\sqrt{E_b},-\\sqrt{E_b}),
$$

$$
(-\\sqrt{E_b},\\sqrt{E_b}),
\\quad
(-\\sqrt{E_b},-\\sqrt{E_b})
$$

이다.

평균 심벌 에너지는

$$
\\begin{aligned}
E_s
&=E[|s|^2]\\\\
&=E[E_ba_I^2+E_ba_Q^2]\\\\
&=2E_b
\\end{aligned}
$$

이다.

QPSK에서는 한 심벌이 두 개의 bit를 전송하므로

$$
\\boxed{E_s=2E_b}
$$

이다.

또한 하나의 심벌에서 I 채널과 Q 채널의 판별 결과에 따라 0개, 1개 또는 2개의 bit error가 발생할 수 있다.

BER은 전체 전송 bit 수에 대한 오류 bit 수의 비율이므로

$$
BER=
\\frac{\\text{Number of bit errors}}
{\\text{Number of transmitted bits}}
$$

이다.

따라서 BPSK에서는 하나의 심벌마다 \`sym_cnt\`를 1 증가시키지만, QPSK에서는 하나의 심벌마다 2 증가시켜야 한다.

본 QPSK simulation에서 \`sym_cnt\`는 변수명과 달리 실제로 전체 송신 bit 수를 의미한다.`,
    },
    { // 문제 2.J2
      "id": "25-2J2",
      "title": "2.J2.",
      "type": "python",
      "starterCode": `# 문제 2.J1에서 계산한 QPSK BER 사용

plt.figure()

plt.semilogy(
    EbN0dB_vector,
    BER_qpsk
)

plt.xlabel('Eb/N0 [dB]')
plt.ylabel('BER')
plt.grid()
plt.show()`,
      "prompt": `문제 2.J1의 Python 코드를 실행하여 Rayleigh fading 환경에서 QPSK 변조방식의 BER 결과 그래프를 확인하시오. $E_b/N_0$가 증가함에 따라 QPSK의 BER이 어떻게 변화하는지 관찰하시오.`,
      responseEnabled: true,
      referenceAnswer: `Rayleigh fading 환경에서 QPSK의 BER simulation을 수행하면 $E_b/N_0$가 증가할수록 BER이 감소하는 그래프가 나타난다.

QPSK는 I 채널과 Q 채널에 각각 하나의 bit를 전송하며, 각 채널의 bit를 독립적으로 판별한다.

동일한 $E_b/N_0$에서 QPSK의 이론적인 평균 BER은 BPSK와 동일하므로

$$
BER_{QPSK}
=
\\frac12
\\left(
1-\\sqrt{
\\frac{E_b/N_0}{1+E_b/N_0}
}
\\right)
$$

이다.

따라서 실험 결과는 다음 이론값들에 가까운 형태로 나타난다.

[[table:
caption:Rayleigh fading 환경에서 QPSK의 이론 BER
Eb/N0 (dB) | BER
0 | 0.14645
10 | 0.02327
20 | 0.00248
]]

높은 $E_b/N_0$ 영역에서는 semilogy 그래프상 거의 일정한 기울기를 갖는 감소 곡선이 나타난다.

실제 BER 값은 random seed와 simulation의 통계적 오차에 따라 약간 달라질 수 있다.`,
    },
    { // 문제 2.J3
      "id": "25-2J3",
      "title": "2.J3.",
      "type": "python",
      "starterCode": `plt.figure()

plt.semilogy(
    EbN0dB_vector,
    BER_bpsk,
    'b',
    label='BPSK, Simulation'
)

plt.semilogy(
    EbN0dB_vector,
    BER_qpsk,
    'g',
    label='QPSK, Simulation'
)

plt.semilogy(
    EbN0dB_vector,
    BER_theory,
    'r',
    label='Rayleigh fading, Theory'
)

plt.xlabel('Eb/N0 [dB]')
plt.ylabel('BER')
plt.legend()
plt.grid()
plt.show()`,
      "prompt": `문제 2.J2에서 얻은 QPSK의 BER을 문제 2.E에서 얻은 BPSK의 BER과 비교하시오. 두 변조방식의 simulated BER과 Rayleigh fading channel의 theoretical BER을 하나의 그래프에 겹쳐 그리시오.

전산실험의 통계적 오차를 감안하면 BPSK와 QPSK의 BER 곡선은 거의 일치한다. 동일한 $E_b/N_0$ 조건에서 두 변조방식의 BER이 거의 일치하는 이유를 설명하시오.`,
      responseEnabled: true,
      referenceAnswer: `출력된 그래프에는 다음 세 개의 BER 곡선이 나타난다.

- 파란색: BPSK의 simulated BER
- 초록색: QPSK의 simulated BER
- 빨간색: Rayleigh fading channel의 theoretical BER

세 BER 곡선은 전산실험의 통계적 오차를 감안하면 거의 일치한다.

QPSK 송신 심벌은

$$
s=\\sqrt{E_b}a_I+j\\sqrt{E_b}a_Q
$$

이다.

페이딩에 의한 위상을 보상한 판별변수는

$$
D=|h|s+ne^{-j\\angle h}
$$

이므로

$$
D=
|h|\\sqrt{E_b}a_I
+j|h|\\sqrt{E_b}a_Q
+n'
$$

로 나타낼 수 있다.

여기서

$$
n'=ne^{-j\\angle h}
$$

이며, 문제 1.C7에서 증명한 것처럼 $n'$은 원래 noise $n$과 동일한 분포를 갖는다.

따라서 I 채널과 Q 채널의 판별변수는 각각

$$
\\operatorname{Re}(D)
=
|h|\\sqrt{E_b}a_I+\\operatorname{Re}(n')
$$

$$
\\operatorname{Im}(D)
=
|h|\\sqrt{E_b}a_Q+\\operatorname{Im}(n')
$$

이다.

각 채널은 동일한 페이딩 계수의 크기 $|h|$가 적용된 하나의 BPSK 시스템과 동일한 판별 구조를 갖는다.

따라서 페이딩 계수 $h$가 주어졌을 때 각 채널의 조건부 bit error probability는

$$
P_{b,I}(h)=P_{b,Q}(h)
=
Q\\left(
\\sqrt{\\frac{2|h|^2E_b}{N_0}}
\\right)
$$

이다.

QPSK의 평균 BER은 두 채널의 bit error probability를 평균한 값이므로

$$
P_{b,QPSK}(h)
=
\\frac{P_{b,I}(h)+P_{b,Q}(h)}{2}
$$

$$
=
Q\\left(
\\sqrt{\\frac{2|h|^2E_b}{N_0}}
\\right)
$$

이다.

이를 페이딩 계수에 대하여 평균을 취하면

$$
\\boxed{
P_{b,QPSK}
=
P_{b,BPSK}
=
\\frac12
\\left(
1-\\sqrt{
\\frac{E_b/N_0}{1+E_b/N_0}
}
\\right)
}
$$

이다.

따라서 동일한 $E_b/N_0$ 조건에서 Rayleigh fading channel의 BPSK와 QPSK는 이론적으로 동일한 BER을 갖는다.

다만 실제 simulation에서는 유한한 실험 횟수와 난수에 의한 통계적 오차 때문에 두 BER 곡선이 완전히 일치하지 않을 수 있다.`,
    },
  ]
},
    { // 문제 3
  "id": "25-3",
  "title": "3. Diversity",
  "problems": [
    { // 문제 3.A
      "id": "25-3A",
      "title": "3.A.",
      "type": "proof",
      "prompt": `페이딩 채널에서 BER이 크게 증가하는 원인은 순간 심벌 에너지를 결정하는 $c=|h|^2$의 분포로부터 유추할 수 있다.

페이딩에 의해 순간 심벌 에너지는 0에서 무한대까지 큰 폭으로 변화한다. 그런데 $Q(\\sqrt{x})$ 그래프는 $x$에 대하여 빠르게 감소하므로, $c$가 1보다 작은 값을 가지면 BER은 크게 증가하게 된다.

$c$가 1보다 클 때의 BER 감소 폭에 비해 $c$가 1보다 작을 때의 BER 증가 폭이 현저하게 크므로, 결과적으로 평균 BER은 증가하게 된다.

페이딩 채널에서 BER 성능을 향상시키기 위해서는 순간 심벌 에너지가 작은 값을 가질 확률을 줄여야 한다. 이를 위한 방법으로 Diversity 기술이 사용된다.

Diversity란 동일한 채널 심벌이 수신기에 여러 경로를 통해 수신되는 것을 의미한다. 이러한 Diversity는 다음과 같은 상황에서 얻을 수 있다.
1. 다중 송수신 안테나를 이용하여 동일한 심벌을 복수의 안테나에서 전송 및 수신하는 경우
2. 다중 경로 채널에서 동일한 송신신호를 여러 경로를 통해 수신하는 경우
3. 수신기가 분리할 수 있는 복수의 신호를 이용하여 동일한 심벌을 전송하는 경우

이와 같은 Diversity 환경에서는 동일한 심벌에 서로 다른 페이딩 계수가 곱해져 수신된다. 페이딩 계수가 곱해져 수신되는 각각의 신호를 Diversity branch라고 하며, branch의 개수를 Diversity order(다이버시티 차수)라고 한다.

본 실습에서는 Diversity order가 $L$인 페이딩 환경을 고려한다. $L$개의 Diversity branch가 존재하고, 하나의 송신 심벌 $s$에 대하여 $L$개의 수신신호는 [[equation:25.8]]과 같이 주어진다.
$$
\\begin{aligned}
r(1)&=h(1)s+n(1)\\\\
r(2)&=h(2)s+n(2)\\\\
&\\vdots\\\\
r(L)&=h(L)s+n(L)
\\end{aligned}
\\qquad \\text{(식 25.8)}
$$
위 식에서 각 변수의 조건은 다음과 같다.
- $h(1),h(2),\\ldots,h(L)$은 문제 1.A에서 생성한 페이딩 계수 $h$와 동일한 분포를 가지며 서로 독립이다.
- $n(1),n(2),\\ldots,n(L)$은 [[equation:25.1]]에서의 AWGN 성분 $n$과 동일한 분포를 가지며 서로 독립이다.
- 송신신호 $s$는 다음 두 값을 각각 0.5의 확률로 갖는 BPSK 신호이다.
$$
s=\\sqrt{\\frac{E_s}{L}}
\\quad\\text{또는}\\quad
s=-\\sqrt{\\frac{E_s}{L}}
$$
송신신호 $s$를 위와 같이 설정하는 이유는 페이딩이 없는 상황에서 $L$개의 수신신호에 포함된 데이터 심벌의 총 에너지가 $E_s$가 되도록 하기 위함이다.

페이딩이 없고 $h(1)=h(2)=\\cdots=h(L)=1$ Noise가 없을 때 $n(1)=n(2)=\\cdots=n(L)=0$ 수신신호의 총 에너지는 데이터 심벌의 총 에너지와 동일하다고 볼 수 있다.

위 조건과 [[equation:25.8]]을 이용하여 다음 식이 성립함을 수식으로 보이시오.
$$
\\boxed{
|r(1)|^2+|r(2)|^2+\\cdots+|r(L)|^2=E_s
}
$$`,
      referenceAnswer: `페이딩이 없고 noise가 없는 경우 각 Diversity branch에서

$$
h(k)=1,
\\qquad
n(k)=0
\\qquad
(k=1,2,\\ldots,L)
$$

이다.

따라서 식 25.8에 의해 각 branch의 수신신호는

$$
\\begin{aligned}
r(k)
&=h(k)s+n(k)\\\\
&=1\\times s+0\\\\
&=s
\\end{aligned}
$$

이다.

한편, 송신신호 $s$는

$$
s=\\pm\\sqrt{\\frac{E_s}{L}}
$$

이므로 각 branch의 수신신호 에너지는

$$
|r(k)|^2
=
|s|^2
=
\\frac{E_s}{L}
$$

이다.

따라서 $L$개의 Diversity branch에서 수신신호의 총 에너지는

$$
\\begin{aligned}
\\sum_{k=1}^{L}|r(k)|^2
&=|r(1)|^2+|r(2)|^2+\\cdots+|r(L)|^2\\\\
&=\\sum_{k=1}^{L}\\frac{E_s}{L}\\\\
&=L\\times\\frac{E_s}{L}\\\\
&=E_s
\\end{aligned}
$$

이다.

따라서

$$
\\boxed{
|r(1)|^2+|r(2)|^2+\\cdots+|r(L)|^2=E_s
}
$$

임을 보일 수 있다.

즉, 송신신호 $s$를 $\\pm\\sqrt{E_s/L}$로 설정하면 Diversity order $L$이 증가하더라도 데이터 심벌의 총 에너지는 항상 $E_s$로 일정하게 유지된다.

이러한 에너지 정규화를 통해 동일한 총 심벌 에너지 조건에서 Diversity order에 따른 BER 성능을 공정하게 비교할 수 있다.`,
    },
  ]
},
    { // 문제 4
  "id": "25-4",
  "title": "4. Combining 기법",
  "problems": [
    { // 문제 4.A
      "id": "25-4A",
      "title": "4.A.",
      "prompt": `본 문제에서는 $L$개의 branch를 갖는 Diversity 환경에서 $L$개의 수신신호를 어떤 방식으로 결합(Combining)하여 판별변수를 생성하는지 학습한다.

다음 세 가지 대표적인 Combining 방법을 구현하고 성능을 분석한다.
1. Selection Diversity Combining (SDC)
2. Equal Gain Combining (EGC)
3. Maximum Ratio Combining (MRC)

일반적으로 페이딩 채널에서는 수신기가 각 branch의 페이딩 계수 $h(1),h(2),\\ldots,h(L)$을 정확히 알고 있다고 가정한다. 실제 환경에서는 페이딩 계수가 일정한 심벌 기간 동안 크게 변하지 않는 경우가 많으므로, pilot과 같은 신호를 이용하여 페이딩 계수를 추정할 수 있다. 본 실험에서는 수신기가 각 branch의 페이딩 계수를 정확히 알고 있다고 가정한다.

Selection Diversity Combining(SDC)에서는 아래와 같이 페이딩 계수의 크기가 가장 큰 branch의 수신신호를 선택하여 판별변수 $D$를 생성한다. 나머지 branch의 수신신호는 사용하지 않는다.
$$
\\begin{aligned}
\\text{Step 1:}\\quad
k_{best}
&=\\underset{k}{\\operatorname{argmax}}\\;|h(k)|\\\\
\\text{Step 2:}\\quad
D
&=r(k_{best})e^{-j\\angle h(k_{best})}
\\end{aligned}
\\qquad \\text{(식 25.9)}
$$`,
    },
    { // 문제 4.A1
      "id": "25-4A1",
      "title": "4.A1.",
      "type": "python",
      "starterCode": `import numpy as np
import matplotlib.pyplot as plt

seed = XXX  # 학번 끝 세 자리

def simulate_sdc(L, EbN0dB_vector, seed):

    rng = np.random.default_rng(seed)
    Eb = 1

    BER = np.zeros(len(EbN0dB_vector))

    for snr_i in range(len(EbN0dB_vector)):

        EbN0dB = EbN0dB_vector[snr_i]
        EbN0 = 10**(EbN0dB / 10)
        N0 = Eb / EbN0

        sym_cnt = 0
        err_cnt = 0

        while err_cnt < 100:

            Ns = 1000

            b = np.sign(rng.random(Ns) - 0.5)
            s = np.sqrt(Eb/L) * b

            h = np.zeros((Ns, L), dtype=complex)
            n = np.zeros((Ns, L), dtype=complex)
            r = np.zeros((Ns, L), dtype=complex)

            for k in range(L):

                h[:, k] = np.sqrt(1/2) * (rng.standard_normal(Ns) + 1j * rng.standard_normal(Ns))

                n[:, k] = np.sqrt(N0/2) * (rng.standard_normal(Ns) + 1j * rng.standard_normal(Ns))

                r[:, k] = ?? * s + ??

            row = np.arange(Ns)

            k_best = np.argmax(??, axis=1)

            D = r[row, ??] * np.exp(-1j * np.angle(h[row, ??]))

            b_hat = np.sign(np.real(D))

            err_cnt = err_cnt + np.count_nonzero(b_hat != b)

            sym_cnt = sym_cnt + Ns

        BER[snr_i] = err_cnt / sym_cnt

        print("L =", L, "Eb/N0 =", EbN0dB, "dB, BER =", BER[snr_i])

    return BER`,
      "prompt": `위 Python 코드는 Diversity 환경에서 SDC를 적용한 경우의 BER을 simulation하기 위한 함수이다.

문제 2와 동일하게 BPSK 변조방식을 사용하며, 문제 3.A에서 설명한 에너지 정규화 조건을 적용한다.

본 코드에서는 simulation의 실행 속도를 높이기 위해 한 번의 while 반복문에서 1000개의 심벌을 생성하고 처리한다.

따라서 배열 $h$, $n$, $r$은 각각 다음과 같은 구조를 갖는다.

- 행(row): 송신 심벌에 해당하는 번호
- 열(column): Diversity branch에 해당하는 번호
- 배열의 크기: $(N_s,L)$

(a) [[equation:25.8]]과 [[equation:25.9]]를 이용하여 다음 코드의 빈칸을 적절히 채우시오.
\`\`\`python
r[:, k] = ?? * s + ??

k_best = np.argmax(??, axis=1)

D = r[row, ??] * np.exp(-1j * np.angle(h[row, ??]))
\`\`\`

(b) 다음 코드의 각 라인에 대해 주석(Comment)을 작성하시오.
\`\`\`python
b = np.sign(rng.random(Ns) - 0.5)
s = np.sqrt(Eb/L) * b

for k in range(L):

    h[:, k] = np.sqrt(1/2) * (rng.standard_normal(Ns) + 1j * rng.standard_normal(Ns))

    n[:, k] = np.sqrt(N0/2) * (rng.standard_normal(Ns) + 1j * rng.standard_normal(Ns))

    r[:, k] = ?? * s + ??

row = np.arange(Ns)

k_best = np.argmax(??, axis=1)

D = r[row, ??] * np.exp(-1j * np.angle(h[row, ??]))

b_hat = np.sign(np.real(D))

err_cnt = err_cnt + np.count_nonzero(b_hat != b)

sym_cnt = sym_cnt + Ns
\`\`\`
다음 지침에 따라 작성하시오.

(지침 1) '='이 있는 라인
  - '=' 왼쪽 변수의 목적(용도)을 설명하시오.
  - '=' 오른쪽 수식이 왜 해당 변수의 의미에 부합하는지 설명하시오.

(지침 2) '='이 없는 라인
  - 명령어의 기능을 설명하시오.
  - 왜 해당 명령을 수행하는지 설명하시오.

참고로 \`np.argmax(a, axis=1)\`은 2차원 배열 \`a\`의 각 행에서 가장 큰 값을 갖는 원소의 index를 반환한다. 또한, Python의 index는 0부터 시작한다.`,
      responseEnabled: true,
      referenceAnswer: `(a) 코드의 빈칸을 순서대로 채우면 다음과 같다.

\`\`\`python
r[:, k] = h[:, k] * s + n[:, k]

k_best = np.argmax(np.abs(h), axis=1)

D = r[row, k_best] * np.exp(-1j * np.angle(h[row, k_best]))
\`\`\`

각 branch의 수신신호는 식 25.8에 의해

$$
r(k)=h(k)s+n(k)
$$

으로 주어진다.

또한 SDC에서는 식 25.9에 따라

$$
k_{best}
=
\\underset{k}{\\operatorname{argmax}}\\;|h(k)|
$$

를 구하고, 선택된 branch에 대하여 위상을 보상하여 판별변수를 생성한다.

$$
D=r(k_{best})e^{-j\\angle h(k_{best})}
$$

(b) 각 라인에 주석을 작성하면 다음과 같다.

\`\`\`python
b = np.sign(rng.random(Ns) - 0.5)
# +1 또는 -1의 값을 동일한 확률로 갖는
# Ns개의 BPSK 심벌을 생성한다.

s = np.sqrt(Eb/L) * b
# 각 branch에 적용되는 송신신호 s를 생성한다.
# branch당 에너지를 Eb/L로 설정하여
# L개 branch의 총 에너지가 Eb가 되도록 한다.

for k in range(L):
    # L개의 Diversity branch에 대해
    # 페이딩 계수, AWGN 및 수신신호를 생성한다.

    h[:, k] = np.sqrt(1/2) * (rng.standard_normal(Ns) + 1j * rng.standard_normal(Ns))
    # k번째 branch의 Ns개 페이딩 계수를 생성한다.
    # 실수부와 허수부는 각각 평균 0, 분산 1/2인
    # 독립 가우시안 분포를 따른다.

    n[:, k] = np.sqrt(N0/2) * (rng.standard_normal(Ns) + 1j * rng.standard_normal(Ns))
    # k번째 branch의 Ns개 복소 AWGN 성분을 생성한다.
    # 실수부와 허수부의 분산은 각각 N0/2이다.

    r[:, k] = h[:, k] * s + n[:, k]
    # 식 25.8에 따라 k번째 branch의 수신신호를 생성한다.
    # 송신신호에 페이딩 계수를 곱하고 AWGN을 더한다.

row = np.arange(Ns)
# 각 송신 심벌에 해당하는 행의 index를 생성한다.
# 0부터 Ns-1까지의 값을 갖는다.

k_best = np.argmax(np.abs(h), axis=1)
# 각 심벌에 대하여 페이딩 계수의 크기가
# 가장 큰 branch의 index를 구한다.
# axis=1은 각 행에서 열 방향으로 연산함을 의미한다.

D = r[row, k_best] * np.exp(-1j * np.angle(h[row, k_best]))
# 각 심벌에서 선택된 branch의 수신신호를 가져온다.
# 해당 branch의 페이딩에 의한 위상을 보상하여
# SDC의 판별변수 D를 생성한다.

b_hat = np.sign(np.real(D))
# 판별변수 D의 실수부의 부호를 이용하여
# BPSK 송신 심벌을 판별한다.

err_cnt = err_cnt + np.count_nonzero(b_hat != b)
# 송신 심벌과 검출된 심벌이 서로 다른 개수를 계산한다.
# 해당 개수를 누적 오류 수에 더한다.

sym_cnt = sym_cnt + Ns
# 한 번의 while 반복문에서 Ns개의 심벌을 처리하므로
# 전체 송신 심벌 수를 Ns만큼 증가시킨다.
\`\`\`

SDC에서는 각 심벌에 대하여 페이딩 계수의 크기가 가장 큰 branch 하나만 사용하며, 나머지 branch의 수신신호는 판별에 사용하지 않는다.`,
    },
    { // 문제 4.A2
      "id": "25-4A2",
      "title": "4.A2.",
      "type": "python",
      "starterCode": `EbN0dB_vector_sdc = np.arange(0, 16, 3)

L = 3

BER_sdc_L3 = simulate_sdc(
    L,
    EbN0dB_vector_sdc,
    seed
)

plt.figure()
plt.semilogy(EbN0dB_vector_sdc, BER_sdc_L3)
plt.xlabel('Eb/N0 [dB]')
plt.ylabel('BER')
plt.grid()
plt.show()`,
      "prompt": `문제 4.A1에서 완성한 SDC BER simulation 함수를 이용하여 Diversity order $L=3$인 경우의 BER을 계산하시오. $E_b/N_0$는 0 dB부터 15 dB까지 3 dB 간격으로 변화시킨다. 코드를 실행하여 얻은 BER 결과 그래프를 관찰하시오.`,
      responseEnabled: true,
      referenceAnswer: `Diversity order를 $L=3$으로 설정하여 다음과 같이 SDC BER simulation 함수를 실행한다.

\`\`\`python
EbN0dB_vector_sdc = np.arange(0, 16, 3)

L = 3

BER_sdc_L3 = simulate_sdc(
    L,
    EbN0dB_vector_sdc,
    seed
)
\`\`\`

실험에 사용되는 $E_b/N_0$의 값은

$$
0,3,6,9,12,15\\text{ dB}
$$

이다.

출력된 BER 그래프는 $E_b/N_0$가 증가할수록 BER이 감소하는 형태를 나타낸다.

SDC에서는 세 개의 Diversity branch 중 페이딩 계수의 크기가 가장 큰 branch를 선택하여 BPSK 심벌을 판별한다.

따라서 하나의 branch만 사용하는 경우보다 높은 SNR 영역에서 BER이 빠르게 감소한다.

실제 BER 값은 random seed와 유한한 simulation 횟수에 따라 달라질 수 있다.`,
    },
    { // 문제 4.A3
      "id": "25-4A3",
      "title": "4.A3.",
      "type": "python",
      "starterCode": `BER_sdc_L1 = simulate_sdc(
    1,
    EbN0dB_vector_sdc,
    seed
)

BER_sdc_L5 = simulate_sdc(
    5,
    EbN0dB_vector_sdc,
    seed
)

plt.figure()

plt.semilogy(
    EbN0dB_vector_sdc,
    BER_sdc_L1,
    label='L=1'
)

plt.semilogy(
    EbN0dB_vector_sdc,
    BER_sdc_L3,
    label='L=3'
)

plt.semilogy(
    EbN0dB_vector_sdc,
    BER_sdc_L5,
    label='L=5'
)

plt.xlabel('Eb/N0 [dB]')
plt.ylabel('BER')
plt.legend()
plt.grid()
plt.show()`,
      "prompt": `Diversity order $L=1$과 $L=5$인 경우에 대하여 문제 4.A1의 SDC BER simulation 함수를 각각 실행하시오. 얻어진 두 BER 곡선을 문제 4.A2에서 얻은 $L=3$의 BER 곡선과 하나의 그래프에 겹쳐 그리시오. 세 곡선은 legend를 이용하여 각각 L=1, L=3, L=5로 구분하시오.

이후 문제에서 BER 결과를 다시 사용하므로 다음 변수의 값을 유지하시오.
- \`BER_sdc_L1\`
- \`BER_sdc_L3\`
- \`BER_sdc_L5\``,
      responseEnabled: true,
      referenceAnswer: `Diversity order $L=1$과 $L=5$에 대하여 다음과 같이 SDC BER simulation을 수행한다.

\`\`\`python
BER_sdc_L1 = simulate_sdc(
    1,
    EbN0dB_vector_sdc,
    seed
)

BER_sdc_L5 = simulate_sdc(
    5,
    EbN0dB_vector_sdc,
    seed
)
\`\`\`

출력된 그래프에는 다음 세 개의 BER 곡선이 나타난다.

- L=1
- L=3
- L=5

높은 SNR 영역에서는 Diversity order가 증가할수록 BER이 감소하고 BER 곡선의 기울기가 가팔라지는 경향을 확인할 수 있다.

반면 낮은 SNR 영역에서는 송신 에너지 정규화의 영향으로 $L$이 증가하더라도 BER 성능이 반드시 향상되지는 않는다.

특히 $L=1$인 경우에는 선택할 수 있는 branch가 하나뿐이므로 문제 2에서 실험한 Rayleigh fading channel의 BPSK BER과 이론적으로 동일하다.

이후 BER 성능 비교를 위해 다음 변수의 값을 유지한다.

- \`BER_sdc_L1\`
- \`BER_sdc_L3\`
- \`BER_sdc_L5\``,
    },
    { // 문제 4.A4
      "id": "25-4A4",
      "title": "4.A4.",
      "type": "essay",
      "prompt": `문제 4.A3에서 얻은 SDC의 BER 곡선을 비교하시오.

(a) Diversity order $L$이 증가함에 따라 BER이 어떻게 변화하는지 설명하시오. BER의 증감뿐만 아니라 BER 곡선의 기울기 변화도 언급하고, 이러한 결과에 대한 직관적인 해석을 추가하시오.
(b) 낮은 SNR 영역에서는 $L$이 증가함에 따라 BER이 오히려 약간 증가할 수 있다. 문제 3.A에서 적용한 에너지 정규화 조건과 SDC의 판별변수 생성 방법을 고려하여 그 이유를 설명하시오.`,
      referenceAnswer: `(a) 높은 SNR 영역에서는 Diversity order $L$이 증가할수록 BER이 감소하며, BER 곡선의 기울기가 더욱 가팔라진다.

SDC에서는

$$
k_{best}
=
\\underset{k}{\\operatorname{argmax}}\\;|h(k)|
$$

에 해당하는 branch를 선택한다.

따라서 $L$이 증가하면 페이딩 계수의 크기가 큰 branch를 선택할 가능성이 증가한다.

또한 서로 독립인 모든 branch에서 동시에 심한 페이딩이 발생할 확률이 감소한다.

이러한 이유로 높은 SNR 영역에서 Diversity order가 증가할수록 BER 성능이 향상된다.

이론적으로 높은 SNR 영역에서 SDC의 BER은

$$
BER\\propto
\\left(\\frac{E_b}{N_0}\\right)^{-L}
$$

의 형태로 감소하므로 $L$이 증가할수록 semilogy 그래프의 기울기가 가팔라진다.

(b) 본 실험에서는 전체 송신 에너지를 일정하게 유지하기 위해 각 branch의 송신신호를

$$
s=\\sqrt{\\frac{E_b}{L}}b
$$

로 설정한다.

따라서 하나의 branch에 할당되는 에너지는

$$
\\frac{E_b}{L}
$$

이다.

그러나 SDC에서는 $L$개의 branch 중 하나만 선택하고 나머지 branch의 신호 에너지는 사용하지 않는다.

SDC의 순간적인 SNR은

$$
\\gamma_{SDC}
=
\\frac{E_b}{LN_0}
\\max_k|h(k)|^2
$$

으로 나타낼 수 있다.

낮은 SNR 영역에서는 branch 수의 증가로 얻는 선택 이득보다 각 branch의 에너지 감소에 의한 영향이 더 크게 나타날 수 있다.

따라서 낮은 SNR 영역에서는 $L$이 증가할 때 오히려 BER이 증가할 수 있다.`,
    },
    { // 문제 4.B
      "id": "25-4B",
      "title": "4.B.",
      "prompt": `Equal Gain Combining(EGC)에서는 페이딩 계수의 크기와 관계없이 모든 branch의 수신신호 $r(1),r(2),\\ldots,r(L)$을 더하여 판별변수로 사용한다. 다만, 각 branch의 수신신호를 더하기 전에 페이딩에 의한 위상을 보상한다.

EGC의 판별변수 $D$는 [[equation:25.10]]과 같이 주어진다.
$$
D=
\\sum_{k=1}^{L}
r(k)e^{-j\\angle h(k)}
\\qquad \\text{(식 25.10)}
$$`,
    },
    { // 문제 4.B1
      "id": "25-4B1",
      "title": "4.B1.",
      "type": "python",
      "starterCode": `def simulate_egc(L, EbN0dB_vector, seed):

    rng = np.random.default_rng(seed)
    Eb = 1

    BER = np.zeros(len(EbN0dB_vector))

    for snr_i in range(len(EbN0dB_vector)):

        EbN0dB = EbN0dB_vector[snr_i]
        EbN0 = 10**(EbN0dB / 10)
        N0 = Eb / EbN0

        sym_cnt = 0
        err_cnt = 0

        while err_cnt < 100:

            Ns = 1000

            b = np.sign(rng.random(Ns) - 0.5)
            s = np.sqrt(Eb/L) * b

            h = np.zeros((Ns, L), dtype=complex)
            n = np.zeros((Ns, L), dtype=complex)
            r = np.zeros((Ns, L), dtype=complex)

            for k in range(L):

                h[:, k] = np.sqrt(1/2) * (rng.standard_normal(Ns) + 1j * rng.standard_normal(Ns))

                n[:, k] = np.sqrt(N0/2) * (rng.standard_normal(Ns) + 1j * rng.standard_normal(Ns))

                r[:, k] = h[:, k] * s + n[:, k]

            D = np.sum(r * np.exp(-1j * np.angle(h)), axis=1)

            b_hat = np.sign(np.real(D))

            err_cnt = err_cnt + np.count_nonzero(b_hat != b)

            sym_cnt = sym_cnt + Ns

        BER[snr_i] = err_cnt / sym_cnt

        print("L =", L, "Eb/N0 =", EbN0dB, "dB, BER =", BER[snr_i])

    return BER`,
      "prompt": `(a) 문제 4.A1에서 작성한 SDC BER simulation 코드에서 가장 큰 페이딩 계수를 갖는 branch를 선택하고 판별변수를 생성하는 부분을 제거한다. 이후 [[equation:25.10]]에 맞게 판별변수 $D$를 계산하는 부분을 다음과 같이 수정한다.
\`\`\`python
D = np.sum(r * np.exp(-1j * np.angle(h)), axis=1)
\`\`\`
수정된 코드를 실행하여 EGC BER simulation 함수가 정상적으로 정의되는지 확인하고, 수정된 판별변수 계산 코드의 의미를 설명하시오. 참고로 \`np.sum(a, axis=1)\`은 2차원 배열 \`a\`의 각 행에 대하여 열 방향의 원소들을 모두 더한다.

(b) 페이딩 계수의 값이 다음과 같다고 하자.
$$
h(1)=2,
\\qquad
h(2)=j,
\\qquad
h(3)=-3j
$$
각 branch의 수신신호는 다음과 같다.
$$
r(1)=2+j
$$
$$
r(2)=-4+3j
$$
$$
r(3)=3-j
$$
이때 EGC의 판별변수가
$$
\\boxed{D=6+8j}
$$
가 됨을 보이시오. Python 함수를 이용하지 말고 [[equation:25.10]]을 이용하여 직접 계산하고 증명하시오.`,
      responseEnabled: true,
      referenceAnswer: `(a) SDC에서는 페이딩 계수의 크기가 가장 큰 branch 하나를 선택하여 판별변수를 생성한다.

반면 EGC에서는 모든 branch의 페이딩에 의한 위상을 보상하고, 위상이 보상된 수신신호들을 동일한 가중치로 더한다.

식 25.10에 의해 EGC의 판별변수는

$$
D=
\\sum_{k=1}^{L}
r(k)e^{-j\\angle h(k)}
$$

이다.

따라서 Python 코드는 다음과 같다.

\`\`\`python
D = np.sum(r * np.exp(-1j * np.angle(h)), axis=1)
\`\`\`

\`np.angle(h)\`는 각 페이딩 계수의 위상을 계산한다.

\`np.exp(-1j * np.angle(h))\`는 각 branch의 페이딩에 의한 위상을 보상하기 위한 복소수 계수를 생성한다.

이 계수를 각 branch의 수신신호에 곱한 후 \`np.sum(..., axis=1)\`을 이용하여 모든 branch의 수신신호를 심벌별로 합산한다.

따라서 각 심벌에 대한 EGC의 판별변수 $D$를 생성할 수 있다.

(b) 각 branch의 페이딩 계수는

$$
h(1)=2,
\\qquad
h(2)=j,
\\qquad
h(3)=-3j
$$

이므로 각각의 위상은

$$
\\angle h(1)=0
$$

$$
\\angle h(2)=\\frac{\\pi}{2}
$$

$$
\\angle h(3)=-\\frac{\\pi}{2}
$$

이다.

따라서 위상 보상 계수는

$$
e^{-j\\angle h(1)}
=
e^0
=
1
$$

$$
e^{-j\\angle h(2)}
=
e^{-j\\pi/2}
=
-j
$$

$$
e^{-j\\angle h(3)}
=
e^{j\\pi/2}
=
j
$$

이다.

각 branch의 수신신호에 위상 보상 계수를 곱하면

$$
r(1)e^{-j\\angle h(1)}
=
(2+j)\\times1
=
2+j
$$

$$
r(2)e^{-j\\angle h(2)}
=
(-4+3j)(-j)
=
3+4j
$$

$$
r(3)e^{-j\\angle h(3)}
=
(3-j)j
=
1+3j
$$

이다.

따라서 EGC의 판별변수는

$$
\\begin{aligned}
D
&=\\sum_{k=1}^{3}
r(k)e^{-j\\angle h(k)}\\\\
&=(2+j)+(3+4j)+(1+3j)\\\\
&=6+8j
\\end{aligned}
$$

이다.

결과적으로

$$
\\boxed{D=6+8j}
$$

임을 보일 수 있다.`,
    },
    { // 문제 4.B2
      "id": "25-4B2",
      "title": "4.B2.",
      "type": "python",
      "starterCode": `EbN0dB_vector_egc = np.arange(0, 13, 3)

BER_egc_L1 = simulate_egc(
    1,
    EbN0dB_vector_egc,
    seed
)

BER_egc_L3 = simulate_egc(
    3,
    EbN0dB_vector_egc,
    seed
)

BER_egc_L5 = simulate_egc(
    5,
    EbN0dB_vector_egc,
    seed
)

plt.figure()

plt.semilogy(
    EbN0dB_vector_egc,
    BER_egc_L1,
    label='L=1'
)

plt.semilogy(
    EbN0dB_vector_egc,
    BER_egc_L3,
    label='L=3'
)

plt.semilogy(
    EbN0dB_vector_egc,
    BER_egc_L5,
    label='L=5'
)

plt.xlabel('Eb/N0 [dB]')
plt.ylabel('BER')
plt.legend()
plt.grid()
plt.show()`,
      "prompt": `문제 4.B1에서 완성한 EGC BER simulation 함수를 이용하여 Diversity order $L=1,3,5$인 경우의 BER을 각각 계산하시오. 본 실험에서는 $E_b/N_0$의 범위를 0 dB부터 12 dB까지로 설정하며, 3 dB 간격으로 변화시킨다. 세 BER 곡선을 하나의 그래프에 겹쳐 그리고 legend를 이용하여 각각 L=1, L=3, L=5로 구분하시오.

이후 문제에서 BER 결과를 다시 사용하므로 다음 변수의 값을 유지하시오.
- \`BER_egc_L1\`
- \`BER_egc_L3\`
- \`BER_egc_L5\``,
      responseEnabled: true,
      referenceAnswer: `EGC BER simulation 함수를 이용하여 Diversity order $L=1,3,5$인 경우의 BER을 각각 계산한다.

실험에 사용되는 $E_b/N_0$의 값은

$$
0,3,6,9,12\\text{ dB}
$$

이다.

출력된 그래프에는 다음 세 개의 BER 곡선이 나타난다.

- L=1
- L=3
- L=5

각 BER 곡선은 $E_b/N_0$가 증가할수록 감소하는 형태를 나타낸다.

또한 Diversity order가 증가할수록 BER이 감소하고, 특히 높은 SNR 영역에서 BER 곡선의 기울기가 가팔라진다.

EGC에서는 SDC와 달리 모든 branch의 수신신호를 위상 보상한 후 합산하므로 여러 branch의 신호 성분을 모두 활용할 수 있다.

이후 문제에서 BER 성능을 비교하기 위해 다음 변수의 값을 유지한다.

- \`BER_egc_L1\`
- \`BER_egc_L3\`
- \`BER_egc_L5\``,
    },
    { // 문제 4.B3
      "id": "25-4B3",
      "title": "4.B3.",
      "type": "essay",
      "prompt": `문제 4.B2에서 얻은 EGC의 BER 곡선을 관찰하시오. Diversity order $L$이 증가함에 따라 BER이 어떻게 변화하는지 설명하시오. BER의 증감뿐만 아니라 BER 곡선의 기울기 변화도 함께 언급하시오.`,
      referenceAnswer: `EGC에서는 Diversity order $L$이 증가할수록 BER이 감소하며, 높은 SNR 영역에서 BER 곡선의 기울기가 더욱 가팔라진다.

EGC의 판별변수는

$$
D=
\\sum_{k=1}^{L}
r(k)e^{-j\\angle h(k)}
$$

이다.

각 branch에서 수신된 신호의 위상을 보상한 후 합산하므로 신호 성분이 동일한 위상으로 결합된다.

또한 각 branch의 페이딩 계수가 서로 독립적이므로 모든 branch에서 동시에 심한 페이딩이 발생할 확률이 감소한다.

따라서 Diversity order가 증가할수록 순간적인 수신 SNR이 매우 낮아질 가능성이 감소하여 BER 성능이 향상된다.

높은 SNR 영역에서 EGC의 BER은

$$
BER\\propto
\\left(\\frac{E_b}{N_0}\\right)^{-L}
$$

의 형태로 감소한다.

따라서 $L$이 증가할수록 BER 곡선의 기울기가 가팔라진다.`,
    },
    { // 문제 4.B4
      "id": "25-4B4",
      "title": "4.B4.",
      "type": "python",
      "starterCode": `plt.figure(figsize=(9, 6))

# Selection Diversity Combining
plt.semilogy(EbN0dB_vector_sdc, BER_sdc_L1, 'b-', label='SDC, L=1')
plt.semilogy(EbN0dB_vector_sdc, BER_sdc_L3, 'b--', label='SDC, L=3')
plt.semilogy(EbN0dB_vector_sdc, BER_sdc_L5, 'b:', label='SDC, L=5')

# Equal Gain Combining
plt.semilogy(EbN0dB_vector_egc, BER_egc_L1, 'g-', label='EGC, L=1')
plt.semilogy(EbN0dB_vector_egc, BER_egc_L3, 'g--', label='EGC, L=3')
plt.semilogy(EbN0dB_vector_egc, BER_egc_L5, 'g:', label='EGC, L=5')

plt.xlabel('Eb/N0 [dB]')
plt.ylabel('BER')
plt.legend()
plt.grid()
plt.show()`,
      "prompt": `문제 4.B2에서 얻은 EGC의 BER 곡선과 문제 4.A3에서 얻은 SDC의 BER 곡선을 비교해 보자. 쉬운 비교를 위해 6개의 BER 곡선을 하나의 그래프에 모두 겹쳐 그리시오. 동일한 Diversity order $L$에 대하여 다음 내용을 비교하고 결과를 작성하시오.

(a) 두 Combining 방법의 상대적인 BER 성능
(b) 두 Combining 방법의 BER 곡선 기울기

단, 두 방식의 $E_b/N_0$ 범위가 서로 다르므로 공통된 $E_b/N_0$ 범위에서 비교하시오.`,
      responseEnabled: true,
      referenceAnswer: `(a) 동일한 Diversity order에 대한 SDC와 EGC의 BER 성능을 비교하면 다음과 같다.

$L=1$인 경우 두 방식 모두 하나의 branch만 사용하여 위상을 보상하므로 이론적으로 동일한 BER 성능을 갖는다.

반면 $L=3$ 또는 $L=5$인 경우에는 본 실험의 BER 곡선에서 일반적으로 EGC가 SDC보다 낮은 BER을 나타낸다.

SDC는 페이딩 계수의 크기가 가장 큰 branch 하나만 사용하고 나머지 branch의 수신신호는 사용하지 않는다.

반면 EGC는 모든 branch의 수신신호를 위상 보상한 후 합산하므로 여러 branch의 신호 성분을 활용할 수 있다.

따라서 본 실험에서는 EGC가 SDC보다 전반적으로 좋은 BER 성능을 나타낸다.

(b) Diversity order가 증가할수록 두 방식 모두 BER 곡선의 기울기가 가팔라진다.

실험에서 사용한 유한한 SNR 범위에서는 EGC의 BER 곡선이 SDC보다 더욱 가파르게 감소하는 형태가 관찰될 수 있다.

다만 동일한 Diversity order $L$에 대하여 충분히 높은 SNR 영역에서 두 방식의 이론적인 diversity order는 모두 $L$이다.

즉,

$$
BER_{SDC}\\propto\\gamma^{-L}
$$

$$
BER_{EGC}\\propto\\gamma^{-L}
$$

이다.

여기서

$$
\\gamma=\\frac{E_b}{N_0}
$$

이다.

따라서 두 방식은 높은 SNR 영역에서 동일한 점근적 기울기를 갖지만, 실제 BER 값과 유한한 SNR 범위에서의 기울기는 서로 다를 수 있다.

본 실험에서는 공통된 0~12 dB 범위에서 두 방식의 BER 성능을 비교한다.`,
    },
    { // 문제 4.C
      "id": "25-4C",
      "title": "4.C.",
      "prompt": `Maximum Ratio Combining(MRC)에서는 EGC와 동일하게 위상이 보상된 모든 branch의 수신신호를 더하여 판별변수로 사용한다. EGC와의 차이점은 각 branch의 수신신호를 더하기 전에 해당 branch의 페이딩 계수의 크기 $|h(k)|$에 비례하는 가중치를 곱한다는 것이다.

MRC의 판별변수 $D$는 [[equation:25.11]]과 같이 주어진다.
$$
D=
\\sum_{k=1}^{L}
|h(k)|r(k)e^{-j\\angle h(k)}
\\qquad \\text{(식 25.11)}
$$`,
    },
    { // 문제 4.C1
      "id": "25-4C1",
      "title": "4.C1.",
      "type": "proof",
      "prompt": `페이딩 계수 $h(k)$의 극형식과 복소 켤레(complex conjugate)의 관계를 이용하여 [[equation:25.11]]이 다음과 같이 나타낼 수 있음을 보이시오.
$$
D=
\\sum_{k=1}^{L}
h^*(k)r(k)
\\qquad \\text{(식 25.12)}
$$
여기서 $h^*(k)$는 $h(k)$의 복소 켤레를 의미한다.`,
      referenceAnswer: `페이딩 계수 $h(k)$를 극형식으로 나타내면

$$
h(k)
=
|h(k)|e^{j\\angle h(k)}
$$

이다.

따라서 $h(k)$의 복소 켤레는

$$
h^*(k)
=
|h(k)|e^{-j\\angle h(k)}
$$

이다.

한편 식 25.11에 의해 MRC의 판별변수는

$$
D=
\\sum_{k=1}^{L}
|h(k)|r(k)e^{-j\\angle h(k)}
$$

이다.

복소수 곱셈의 교환법칙을 이용하여 정리하면

$$
\\begin{aligned}
D
&=\\sum_{k=1}^{L}
|h(k)|r(k)e^{-j\\angle h(k)}\\\\
&=\\sum_{k=1}^{L}
\\left(
|h(k)|e^{-j\\angle h(k)}
\\right)r(k)\\\\
&=\\sum_{k=1}^{L}
h^*(k)r(k)
\\end{aligned}
$$

이다.

따라서

$$
\\boxed{
D=
\\sum_{k=1}^{L}
h^*(k)r(k)
}
$$

임을 보일 수 있다.

즉, 각 branch의 수신신호에 페이딩 계수의 복소 켤레를 곱하면 위상 보상과 페이딩 계수의 크기에 따른 가중치 적용을 동시에 수행할 수 있다.`,
    },
    { // 문제 4.C2
      "id": "25-4C2",
      "title": "4.C2.",
      "type": "python",
      "starterCode": `def simulate_mrc(L, EbN0dB_vector, seed):

    rng = np.random.default_rng(seed)
    Eb = 1

    BER = np.zeros(len(EbN0dB_vector))

    for snr_i in range(len(EbN0dB_vector)):

        EbN0dB = EbN0dB_vector[snr_i]
        EbN0 = 10**(EbN0dB / 10)
        N0 = Eb / EbN0

        sym_cnt = 0
        err_cnt = 0

        while err_cnt < 100:

            Ns = 1000

            b = np.sign(rng.random(Ns) - 0.5)
            s = np.sqrt(Eb/L) * b

            h = np.zeros((Ns, L), dtype=complex)
            n = np.zeros((Ns, L), dtype=complex)
            r = np.zeros((Ns, L), dtype=complex)

            for k in range(L):

                h[:, k] = np.sqrt(1/2) * (rng.standard_normal(Ns) + 1j * rng.standard_normal(Ns))

                n[:, k] = np.sqrt(N0/2) * (rng.standard_normal(Ns) + 1j * rng.standard_normal(Ns))

                r[:, k] = h[:, k] * s + n[:, k]

            D = np.sum(np.conj(??) * ??, axis=1)

            b_hat = np.sign(np.real(D))

            err_cnt = err_cnt + np.count_nonzero(b_hat != b)

            sym_cnt = sym_cnt + Ns

        BER[snr_i] = err_cnt / sym_cnt

        print("L =", L, "Eb/N0 =", EbN0dB, "dB, BER =", BER[snr_i])

    return BER`,
      "prompt": `문제 4.A1에서 작성한 SDC BER simulation 코드에서 가장 큰 페이딩 계수를 갖는 branch를 선택하고 판별변수를 생성하는 부분을 제거한다. 이후 [[equation:25.12]]에 맞게 판별변수 $D$를 계산하는 부분을 다음과 같이 수정한다.
\`\`\`python
D = np.sum(np.conj(??) * ??, axis=1)
\`\`\`
빈칸을 적절히 채워 MRC BER simulation 함수를 완성하고, 코드를 실행하시오.

참고로 Python에서 \`np.conj()\`는 복소수 또는 복소수 배열의 복소 켤레를 계산하는 함수이다.`,
      responseEnabled: true,
      referenceAnswer: `식 25.12에 의해 MRC의 판별변수는

$$
D=
\\sum_{k=1}^{L}
h^*(k)r(k)
$$

이다.

따라서 빈칸을 채우면 다음과 같다.

\`\`\`python
D = np.sum(np.conj(h) * r, axis=1)
\`\`\`

\`np.conj(h)\`는 각 branch의 페이딩 계수에 대한 복소 켤레를 계산한다.

\`np.conj(h) * r\`은 각 branch의 수신신호에 해당 페이딩 계수의 복소 켤레를 곱하는 연산이다.

이 연산을 통해 페이딩에 의한 위상을 보상하는 동시에 페이딩 계수의 크기에 비례하는 가중치를 적용할 수 있다.

마지막으로 \`np.sum(..., axis=1)\`을 이용하여 각 심벌에 대한 모든 branch의 결과를 합산한다.

따라서 MRC의 판별변수 $D$를 생성할 수 있다.

완성된 함수를 실행하여 \`simulate_mrc()\`가 정상적으로 정의되는지 확인한다.`,
    },
    { // 문제 4.C3
      "id": "25-4C3",
      "title": "4.C3.",
      "type": "python",
      "starterCode": `EbN0dB_vector_mrc = np.arange(0, 13, 3)

BER_mrc_L1 = simulate_mrc(
    1,
    EbN0dB_vector_mrc,
    seed
)

BER_mrc_L3 = simulate_mrc(
    3,
    EbN0dB_vector_mrc,
    seed
)

BER_mrc_L5 = simulate_mrc(
    5,
    EbN0dB_vector_mrc,
    seed
)

plt.figure()

plt.semilogy(
    EbN0dB_vector_mrc,
    BER_mrc_L1,
    label='L=1'
)

plt.semilogy(
    EbN0dB_vector_mrc,
    BER_mrc_L3,
    label='L=3'
)

plt.semilogy(
    EbN0dB_vector_mrc,
    BER_mrc_L5,
    label='L=5'
)

plt.xlabel('Eb/N0 [dB]')
plt.ylabel('BER')
plt.legend()
plt.grid()
plt.show()`,
      "prompt": `문제 4.C2에서 완성한 MRC BER simulation 함수를 이용하여 Diversity order $L=1,3,5$인 경우의 BER을 각각 계산하시오. 문제 4.B2의 EGC와 동일하게 $E_b/N_0$의 범위를 0 dB부터 12 dB까지로 설정하며, 3 dB 간격으로 변화시킨다. 세 BER 곡선을 하나의 그래프에 겹쳐 그리고 legend를 이용하여 각각 L=1, L=3, L=5로 구분하시오.

이후 문제에서 BER 결과를 다시 사용하므로 다음 변수의 값을 유지하시오.
- \`BER_mrc_L1\`
- \`BER_mrc_L3\`
- \`BER_mrc_L5\``,
      responseEnabled: true,
      referenceAnswer: `MRC BER simulation 함수를 이용하여 Diversity order $L=1,3,5$에 대한 BER을 각각 계산한다.

실험에 사용되는 $E_b/N_0$의 값은

$$
0,3,6,9,12\\text{ dB}
$$

이다.

출력된 그래프에는 다음 세 개의 BER 곡선이 나타난다.

- L=1
- L=3
- L=5

모든 BER 곡선은 $E_b/N_0$가 증가할수록 감소하는 형태를 나타낸다.

또한 Diversity order가 증가할수록 BER이 감소하며, 높은 SNR 영역에서 BER 곡선의 기울기가 가팔라진다.

MRC는 각 branch의 페이딩 계수 크기에 비례하는 가중치를 적용하여 수신신호를 결합하므로 페이딩 계수의 크기가 큰 branch의 신호를 상대적으로 더 많이 반영한다.

따라서 여러 branch의 수신신호를 효과적으로 활용하여 BER 성능을 향상시킬 수 있다.

이후 문제에서 BER 성능을 비교하기 위해 다음 변수의 값을 유지한다.

- \`BER_mrc_L1\`
- \`BER_mrc_L3\`
- \`BER_mrc_L5\``,
    },
    { // 문제 4.C4
      "id": "25-4C4",
      "title": "4.C4.",
      "type": "essay",
      "prompt": `문제 4.C3에서 얻은 MRC의 BER 곡선을 관찰하시오. Diversity order $L$이 증가함에 따라 BER이 어떻게 변화하는지 설명하시오. BER의 증감뿐만 아니라 BER 곡선의 기울기 변화도 함께 언급하시오.`,
      referenceAnswer: `MRC에서는 Diversity order $L$이 증가할수록 BER이 감소하고, 높은 SNR 영역에서 BER 곡선의 기울기가 더욱 가팔라진다.

MRC의 판별변수는

$$
D=
\\sum_{k=1}^{L}
h^*(k)r(k)
$$

이다.

각 branch의 수신신호에 페이딩 계수의 복소 켤레를 곱하여 합산하므로, 위상 보상과 함께 페이딩 계수의 크기에 따른 가중치가 적용된다.

본 실험의 에너지 정규화 조건에서 MRC의 순간적인 SNR은

$$
\\gamma_{MRC}
=
\\frac{E_b}{LN_0}
\\sum_{k=1}^{L}|h(k)|^2
$$

이다.

Diversity order가 증가하면 서로 독립적인 여러 페이딩 계수의 크기 제곱을 합산하게 된다.

이에 따라 평균적인 SNR은 유지되면서 순간적인 SNR이 매우 낮아질 확률이 감소한다.

따라서 BER 성능이 향상된다.

높은 SNR 영역에서 MRC의 BER은

$$
BER\\propto
\\left(\\frac{E_b}{N_0}\\right)^{-L}
$$

의 형태로 감소하므로, Diversity order $L$이 증가할수록 BER 곡선의 기울기가 가팔라진다.`,
    },
    { // 문제 4.C5
      "id": "25-4C5",
      "title": "4.C5.",
      "type": "python",
      "starterCode": `plt.figure(figsize=(9, 6))

# Equal Gain Combining
plt.semilogy(EbN0dB_vector_egc, BER_egc_L1, 'g-', label='EGC, L=1')
plt.semilogy(EbN0dB_vector_egc, BER_egc_L3, 'g--', label='EGC, L=3')
plt.semilogy(EbN0dB_vector_egc, BER_egc_L5, 'g:', label='EGC, L=5')

# Maximum Ratio Combining
plt.semilogy(EbN0dB_vector_mrc, BER_mrc_L1, 'r-', label='MRC, L=1')
plt.semilogy(EbN0dB_vector_mrc, BER_mrc_L3, 'r--', label='MRC, L=3')
plt.semilogy(EbN0dB_vector_mrc, BER_mrc_L5, 'r:', label='MRC, L=5')

plt.xlabel('Eb/N0 [dB]')
plt.ylabel('BER')
plt.legend()
plt.grid()
plt.show()`,
      "prompt": `문제 4.C3에서 얻은 MRC의 BER 곡선과 문제 4.B2에서 얻은 EGC의 BER 곡선을 비교해 보자. 문제 4.B4와 동일한 방법으로 6개의 BER 곡선을 하나의 그래프에 모두 겹쳐 그리시오. 동일한 Diversity order $L$에 대하여 다음 내용을 비교하고 결과를 작성하시오.

(a) 두 Combining 방법의 상대적인 BER 성능
(b) 두 Combining 방법의 BER 곡선 기울기`,
      responseEnabled: true,
      referenceAnswer: `(a) 동일한 Diversity order에 대한 EGC와 MRC의 BER 성능을 비교하면 다음과 같다.

$L=1$인 경우 EGC와 MRC는 이론적으로 동일한 BER 성능을 갖는다.

EGC에서는

$$
D_{EGC}=r(1)e^{-j\\angle h(1)}
$$

이고 MRC에서는

$$
D_{MRC}=|h(1)|r(1)e^{-j\\angle h(1)}
$$

이다.

따라서

$$
D_{MRC}=|h(1)|D_{EGC}
$$

이다.

양의 실수인 $|h(1)|$을 곱하더라도 판별변수 실수부의 부호는 변하지 않으므로 두 방식의 BPSK 판별 결과는 동일하다.

반면 $L=3$ 또는 $L=5$인 경우 MRC가 EGC보다 일반적으로 낮은 BER을 나타낸다.

EGC는 모든 branch에 동일한 크기의 가중치를 적용한다.

그러나 MRC는 페이딩 계수의 크기가 큰 branch에 더 큰 가중치를 적용하므로 상대적으로 신호 품질이 좋은 branch를 더욱 효과적으로 활용할 수 있다.

따라서 MRC가 EGC보다 좋은 BER 성능을 나타낸다.

(b) 두 방식 모두 Diversity order $L$이 증가할수록 BER 곡선의 기울기가 가팔라진다.

실험에서 사용한 유한한 SNR 범위에서는 MRC가 EGC보다 더욱 가파르게 감소하는 BER 곡선을 나타낼 수 있다.

다만 동일한 Diversity order $L$에 대하여 충분히 높은 SNR 영역에서의 이론적인 diversity order는 두 방식 모두 $L$이다.

즉,

$$
BER_{EGC}\\propto\\gamma^{-L}
$$

$$
BER_{MRC}\\propto\\gamma^{-L}
$$

이다.

따라서 두 방식의 점근적인 BER 곡선 기울기는 동일하지만 MRC가 더 낮은 BER을 갖는다.`,
    },
    { // 문제 4.C6
      "id": "25-4C6",
      "title": "4.C6.",
      "type": "proof",
      "prompt": `MRC에서 사용하는 [[equation:25.12]]가 판별변수 $D$의 SNR을 최대화함을 수식으로 증명할 수 있다. 다음 순서에 따라 증명하시오.

(a) [[equation:25.12]]의 $h^*(k)$ 대신 일반적인 복소 가중치 $g(k)$를 사용하면 판별변수 $D$는 다음과 같이 주어진다.
$$
D=
\\sum_{k=1}^{L}
g(k)r(k)
$$
[[equation:25.8]]의 $r(k)=h(k)s+n(k)$를 위 식에 대입하여 $D$를 신호 성분과 noise 성분으로 나누어 나타내시오. 신호 성분을 $S_D$, noise 성분을 $N_D$라 할 때, 각각의 수식을 쓰시오.

(b) (a)에서 구한 $S_D$와 $N_D$를 이용하여 판별변수 $D$의 SNR을 나타내시오.
$$
SNR_D=
\\frac{|S_D|^2}{\\sigma_{N_D}^2}
$$
여기서 $\\sigma_{N_D}^2$는 noise 성분 $N_D$의 전력, 즉 $E[|N_D|^2]$를 의미한다.

(c) Diversity order가 $L=2$이고 다음 조건이 주어졌다고 하자.
$$
h(1)=2,
\\qquad
h(2)=1
$$
$$
g^2(1)+g^2(2)=5
$$
이때 $g(1)$과 $g(2)$를 실수 가중치라고 가정하고, (b)에서 구한 SNR을 최대화하는 $g(1)$과 $g(2)$의 값을 구하시오. (Hint. Cauchy-Schwarz 부등식을 이용하시오)

(d) $L=2$인 경우 일반적인 복소 페이딩 계수 $h(1)$, $h(2)$에 대하여 SNR을 최대화하는 가중치 $g(1)$, $g(2)$의 조건을 구하시오.

(e) (d)의 결과를 일반적인 Diversity order $L$인 경우로 확장하시오. 즉, 판별변수 $D$의 SNR을 최대화하기 위한 가중치 $g(1),g(2),\\ldots,g(L)$의 조건을 쓰고, 이를 MRC의 판별변수 식인 [[equation:25.12]]와 비교하시오.`,
      referenceAnswer: `(a) 일반적인 복소 가중치 $g(k)$를 적용한 판별변수 $D$는

$$
D=
\\sum_{k=1}^{L}
g(k)r(k)
$$

이다.

식 25.8에 의해

$$
r(k)=h(k)s+n(k)
$$

이므로 이를 대입하면

$$
\\begin{aligned}
D
&=\\sum_{k=1}^{L}
g(k)\\left(h(k)s+n(k)\\right)\\\\
&=s\\sum_{k=1}^{L}g(k)h(k)
+\\sum_{k=1}^{L}g(k)n(k)
\\end{aligned}
$$

이다.

따라서 신호 성분 $S_D$와 noise 성분 $N_D$는 각각

$$
\\boxed{
S_D=
s\\sum_{k=1}^{L}g(k)h(k)
}
$$

$$
\\boxed{
N_D=
\\sum_{k=1}^{L}g(k)n(k)
}
$$

이다.

(b) 주어진 페이딩 계수에 대하여 신호 성분의 에너지는

$$
\\begin{aligned}
|S_D|^2
&=
\\left|
s\\sum_{k=1}^{L}g(k)h(k)
\\right|^2\\\\
&=
|s|^2
\\left|
\\sum_{k=1}^{L}g(k)h(k)
\\right|^2
\\end{aligned}
$$

이다.

각 branch의 noise 성분 $n(k)$는 평균 0인 독립 복소 가우시안 확률변수이며

$$
E[|n(k)|^2]=N_0
$$

이다.

따라서 noise 성분의 전력은

$$
\\begin{aligned}
\\sigma_{N_D}^2
&=E[|N_D|^2]\\\\
&=E\\left[
\\left|
\\sum_{k=1}^{L}g(k)n(k)
\\right|^2
\\right]\\\\
&=\\sum_{k=1}^{L}
|g(k)|^2E[|n(k)|^2]\\\\
&=N_0\\sum_{k=1}^{L}|g(k)|^2
\\end{aligned}
$$

이다.

결과적으로 판별변수 $D$의 SNR은

$$
\\boxed{
SNR_D
=
\\frac{
|s|^2
\\left|
\\displaystyle\\sum_{k=1}^{L}g(k)h(k)
\\right|^2
}{
N_0
\\displaystyle\\sum_{k=1}^{L}|g(k)|^2
}
}
$$

이다.

(c) $L=2$이고

$$
h(1)=2,
\\qquad
h(2)=1
$$

이며

$$
g^2(1)+g^2(2)=5
$$

이다.

따라서 판별변수의 SNR은

$$
SNR_D
=
\\frac{
|s|^2(2g(1)+g(2))^2
}{
N_0(g^2(1)+g^2(2))
}
$$

$$
=
\\frac{
|s|^2(2g(1)+g(2))^2
}{
5N_0
}
$$

이다.

분모가 일정하므로 SNR을 최대화하기 위해서는

$$
(2g(1)+g(2))^2
$$

을 최대화해야 한다.

Cauchy-Schwarz 부등식에 의해

$$
(2g(1)+g(2))^2
\\leq
(2^2+1^2)
(g^2(1)+g^2(2))
$$

이다.

주어진 조건을 대입하면

$$
(2g(1)+g(2))^2
\\leq
5\\times5
=
25
$$

이다.

등호가 성립하기 위한 조건은 두 벡터가 서로 비례하는 것이다.

따라서 실수 상수 $a$에 대하여

$$
\\begin{aligned}
g(1)&=2a\\\\
g(2)&=a
\\end{aligned}
$$

로 나타낼 수 있다.

이를 주어진 조건에 대입하면

$$
(2a)^2+a^2=5
$$

$$
5a^2=5
$$

$$
a=\\pm1
$$

이다.

따라서 SNR을 최대화하는 실수 가중치는

$$
(g(1),g(2))=(2,1)
$$

또는

$$
(g(1),g(2))=(-2,-1)
$$

이다.

두 경우 모두 동일한 최대 SNR을 갖지만, 기존 BPSK 부호 판별을 그대로 사용하기 위해 양의 비례상수를 선택하면

$$
\\boxed{
g(1)=2,
\\qquad
g(2)=1
}
$$

이다.

이때 최대 SNR은

$$
SNR_{D,max}
=
\\frac{5|s|^2}{N_0}
$$

이다.

(d) $L=2$이고 $h(1)$, $h(2)$가 일반적인 복소수인 경우

$$
SNR_D
=
\\frac{
|s|^2
|g(1)h(1)+g(2)h(2)|^2
}{
N_0(|g(1)|^2+|g(2)|^2)
}
$$

이다.

복소수에 대한 Cauchy-Schwarz 부등식에 의해

$$
\\begin{aligned}
&|g(1)h(1)+g(2)h(2)|^2\\\\
&\\leq
(|g(1)|^2+|g(2)|^2)
(|h(1)|^2+|h(2)|^2)
\\end{aligned}
$$

이다.

등호가 성립하기 위해서는 가중치 벡터가 페이딩 계수의 복소 켤레 벡터에 비례해야 한다.

따라서 0이 아닌 상수 $a$에 대하여

$$
\\boxed{
g(1)=ah^*(1)
}
$$

$$
\\boxed{
g(2)=ah^*(2)
}
$$

이어야 한다.

SNR의 크기만을 고려하면 공통 비례상수 $a$는 0이 아닌 복소수이어도 된다.

다만 기존 BPSK 판별 방식을 그대로 사용하려면 위상 변화가 발생하지 않도록 양의 실수 $a$를 선택하는 것이 적절하다.

(e) 위 결과를 일반적인 Diversity order $L$인 경우로 확장하면 Cauchy-Schwarz 부등식에 의해

$$
\\left|
\\sum_{k=1}^{L}g(k)h(k)
\\right|^2
\\leq
\\left(
\\sum_{k=1}^{L}|g(k)|^2
\\right)
\\left(
\\sum_{k=1}^{L}|h(k)|^2
\\right)
$$

이다.

따라서 판별변수의 SNR은

$$
\\begin{aligned}
SNR_D
&=
\\frac{
|s|^2
\\left|
\\displaystyle\\sum_{k=1}^{L}g(k)h(k)
\\right|^2
}{
N_0
\\displaystyle\\sum_{k=1}^{L}|g(k)|^2
}\\\\
&\\leq
\\frac{|s|^2}{N_0}
\\sum_{k=1}^{L}|h(k)|^2
\\end{aligned}
$$

이다.

이때 등호가 성립하는 조건은

$$
\\boxed{
g(k)=ah^*(k),
\\qquad
k=1,2,\\ldots,L
}
$$

이다.

여기서 공통 비례상수를 $a=1$로 설정하면

$$
g(k)=h^*(k)
$$

이다.

따라서 판별변수는

$$
\\boxed{
D=
\\sum_{k=1}^{L}
h^*(k)r(k)
}
$$

가 된다.

이 식은 MRC의 판별변수 식인 식 25.12와 동일하다.

결과적으로 MRC는 판별변수의 SNR을 최대화하는 Combining 방식이며, 최대 SNR은

$$
\\boxed{
SNR_{D,max}
=
\\frac{|s|^2}{N_0}
\\sum_{k=1}^{L}|h(k)|^2
}
$$

이다.

본 실험에서는

$$
|s|^2=\\frac{E_b}{L}
$$

이므로

$$
\\boxed{
SNR_{D,max}
=
\\frac{E_b}{LN_0}
\\sum_{k=1}^{L}|h(k)|^2
}
$$

이다.`,
    },
    { // 문제 4.D
      "id": "25-4D",
      "title": "4.D.",
      "prompt": `지금까지 구현한 세 가지 Combining 방식인 SDC, EGC, MRC의 BER 성능을 비교해 보자. 각 Combining 방법에 대하여 Diversity order $L=1,3,5$인 경우의 BER 결과를 비교한다.`,
    },
    { // 문제 4.D1
      "id": "25-4D1",
      "title": "4.D1.",
      "type": "python",
      "starterCode": `plt.figure(figsize=(10, 7))

# Selection Diversity Combining (SDC)
plt.semilogy(EbN0dB_vector_sdc, BER_sdc_L1, 'b-', label='SDC, L=1')
plt.semilogy(EbN0dB_vector_sdc, BER_sdc_L3, 'b--', label='SDC, L=3')
plt.semilogy(EbN0dB_vector_sdc, BER_sdc_L5, 'b:', label='SDC, L=5')

# Equal Gain Combining (EGC)
plt.semilogy(EbN0dB_vector_egc, BER_egc_L1, 'g-', label='EGC, L=1')
plt.semilogy(EbN0dB_vector_egc, BER_egc_L3, 'g--', label='EGC, L=3')
plt.semilogy(EbN0dB_vector_egc, BER_egc_L5, 'g:', label='EGC, L=5')

# Maximum Ratio Combining (MRC)
plt.semilogy(EbN0dB_vector_mrc, BER_mrc_L1, 'r-', label='MRC, L=1')
plt.semilogy(EbN0dB_vector_mrc, BER_mrc_L3, 'r--', label='MRC, L=3')
plt.semilogy(EbN0dB_vector_mrc, BER_mrc_L5, 'r:', label='MRC, L=5')

plt.xlabel('Eb/N0 [dB]')
plt.ylabel('BER')
plt.legend()
plt.grid()
plt.show()`,
      "prompt": `문제 4.A3, 4.B2, 4.C3에서 얻은 9개의 BER 곡선을 하나의 그래프에 모두 겹쳐 그리시오.

세 가지 Combining 방식을 쉽게 구분하기 위하여 다음과 같이 그래프의 색상을 설정한다.

- SDC: 파란색
- EGC: 초록색
- MRC: 빨간색

또한, 같은 색상에서도 Diversity order $L$을 구분하기 위하여 다음과 같이 선의 종류를 설정한다.

- $L=1$: 실선
- $L=3$: 파선
- $L=5$: 점선

완성된 BER 그래프를 관찰하고 다음에 답하시오.

(a) 동일한 Diversity order $L$에서 가장 BER 성능이 좋은 Combining 방식은 무엇인가?
(b) $L=5$일 때 SNR이 증가함에 따라 세 가지 Combining 방식의 상대적인 BER 성능 차이는 어떻게 변화하는지 설명하시오.

단, 세 방식의 공통된 $E_b/N_0$ 범위에서 비교하시오.`,
      responseEnabled: true,
      referenceAnswer: `출력된 그래프에는 SDC, EGC, MRC 각각에 대하여 Diversity order $L=1,3,5$인 경우의 BER 곡선이 나타나므로 총 9개의 BER 곡선이 표시된다.

각 Combining 방식은 다음 색상으로 구분한다.

- SDC: 파란색
- EGC: 초록색
- MRC: 빨간색

또한 Diversity order는 다음과 같이 구분한다.

- L=1: 실선
- L=3: 파선
- L=5: 점선

(a) 동일한 Diversity order $L=1$인 경우 세 가지 Combining 방식의 BER 성능은 이론적으로 동일하다.

이는 하나의 branch만 존재하므로 세 방식 모두 동일한 BPSK 부호 판별 결과를 얻기 때문이다.

반면 $L=3$ 또는 $L=5$인 경우에는 본 실험에서 일반적으로 다음과 같은 BER 성능 관계가 나타난다.

$$
\\boxed{
BER_{MRC}
<
BER_{EGC}
<
BER_{SDC}
}
$$

따라서 동일한 Diversity order에서 가장 좋은 BER 성능을 갖는 방식은 MRC이다.

MRC는 각 branch의 페이딩 계수에 따라 적절한 가중치를 적용하여 판별변수의 SNR을 최대화하기 때문이다.

(b) $L=5$인 경우 $E_b/N_0$가 증가함에 따라 세 방식의 BER은 모두 감소한다.

그러나 본 실험의 공통 SNR 범위에서는 SDC보다 EGC와 MRC의 BER이 상대적으로 빠르게 감소하는 경향을 확인할 수 있다.

따라서 높은 SNR 영역으로 갈수록 세 방식 간의 상대적인 BER 성능 차이가 뚜렷하게 나타난다.

다만 충분히 높은 SNR 영역에서 세 방식의 이론적인 diversity order는 모두 5이므로 점근적인 BER 곡선의 기울기는 동일하다.

즉, 높은 SNR 영역에서의 성능 차이는 주로 동일한 BER을 달성하기 위해 필요한 SNR의 차이로 나타난다.

본 실험 결과에서는 MRC가 가장 좋은 성능을 나타내고, EGC와 SDC가 그 뒤를 따른다.`,
    },
    { // 문제 4.D2
      "id": "25-4D2",
      "title": "4.D2.",
      "type": "essay",
      "prompt": `[[equation:25.9]], [[equation:25.10]], [[equation:25.12]]에 주어진 세 가지 Combining 방식의 판별변수 계산식을 비교하시오. 판별변수를 생성하기 위해 필요한 연산의 종류와 계산량을 중심으로 다음에 답하시오.

(a) 구현 복잡도가 가장 낮다고 판단되는 Combining 방식은 무엇인가?
(b) 구현 복잡도가 가장 높다고 판단되는 Combining 방식은 무엇인가?

각 방식에서 필요한 페이딩 계수의 크기 비교, 위상 계산, 복소 켤레, 곱셈 및 덧셈 연산 등을 고려하여 그 근거를 설명하시오.`,
      referenceAnswer: `세 가지 Combining 방식의 판별변수 계산식은 다음과 같다.

SDC:

$$
k_{best}
=
\\underset{k}{\\operatorname{argmax}}\\;|h(k)|
$$

$$
D=
r(k_{best})e^{-j\\angle h(k_{best})}
$$

EGC:

$$
D=
\\sum_{k=1}^{L}
r(k)e^{-j\\angle h(k)}
$$

MRC:

$$
D=
\\sum_{k=1}^{L}
h^*(k)r(k)
$$

각 방식에서 필요한 연산을 비교하면 다음과 같다.

[[table:
caption:Combining 방식별 판별변수 계산에 필요한 연산
Combining 방식 | 주요 연산
SDC | 페이딩 계수의 크기 계산 및 비교, 최대값 index 선택, 위상 계산, 복소수 곱셈
EGC | 모든 branch의 위상 계산, 복소 지수 계산, 복소수 곱셈 및 덧셈
MRC | 모든 branch의 복소 켤레 계산, 복소수 곱셈 및 덧셈
]]

(a) 주어진 판별변수 계산식을 직접 구현하는 관점에서는 MRC의 구현이 비교적 간단하다.

MRC에서는

$$
h^*(k)
=
|h(k)|e^{-j\\angle h(k)}
$$

의 관계를 이용하므로 별도의 위상 계산이나 복소 지수 계산 없이 복소 켤레 연산만으로 위상 보상 및 가중치 적용을 동시에 수행할 수 있다.

Python에서는

\`\`\`python
D = np.sum(np.conj(h) * r, axis=1)
\`\`\`

와 같이 구현할 수 있다.

(b) SDC에서는 먼저 각 branch의 페이딩 계수의 크기를 계산하고 비교한 후, 가장 큰 값을 갖는 branch의 index를 찾아야 한다.

이후 선택된 branch에 대하여 위상을 계산하고 보상해야 한다.

따라서 branch 선택 및 판별변수 생성의 두 단계가 필요하므로 구현 절차의 관점에서는 SDC가 상대적으로 복잡하다고 볼 수 있다.

EGC 역시 모든 branch에서 위상 계산과 복소 지수 계산을 수행해야 하므로 이러한 연산의 계산 비용을 고려하면 구현 복잡도가 높아질 수 있다.

따라서 본 교재의 판별변수 계산식과 구현 절차를 중심으로 비교하면 MRC가 간단하고 SDC의 구현 절차가 상대적으로 복잡하다고 판단할 수 있다.

다만 실제 수신기의 구현 복잡도는 branch 수, 하드웨어 구성, 채널 추정 방식, 위상 보상 방법 및 각 연산의 계산 비용에 따라 달라질 수 있다.

SDC는 선택된 하나의 branch에 대해서만 위상을 보상한다는 장점이 있으므로 모든 구현 환경에서 SDC의 계산량이 가장 많다고 단정할 수는 없다.

따라서 각 방식의 연산 구조와 계산량에 근거하여 타당하게 비교한 답안도 인정할 수 있다.`,
    },
    { // 문제 4.E
      "id": "25-4E",
      "title": "4.E.",
      "prompt": `지금까지 SDC, EGC, MRC의 BER simulation을 통해 Diversity order $L$에 따른 BER 성능의 변화를 관찰하였다. 이제 각 branch의 페이딩 계수 사이의 통계적 관계를 변화시켜 Diversity 이득이 발생하는 원인을 분석해 보자.`,
    },
    { // 문제 4.E1
      "id": "25-4E1",
      "title": "4.E1.",
      "type": "essay",
      "prompt": `문제 4.A3, 4.B2, 4.C3에서 얻은 세 가지 Combining 방식의 BER 그래프를 관찰하시오. Diversity order $L$이 증가함에 따른 BER 곡선 변화의 공통적인 특징은 무엇이었는가? 높은 SNR 영역에서의 BER 변화와 BER 곡선의 기울기 변화를 중심으로 설명하시오. 또한, 이러한 특징이 나타나는 이유를 순간적인 페이딩 계수의 크기와 수신신호 에너지의 관점에서 설명하시오.`,
      referenceAnswer: `SDC, EGC, MRC의 BER 그래프에서 공통적으로 나타나는 특징은 높은 SNR 영역에서 Diversity order $L$이 증가할수록 BER이 감소하고 BER 곡선의 기울기가 가팔라진다는 것이다.

Rayleigh fading channel에서는 페이딩 계수의 크기가 순간적으로 매우 작은 값을 가질 수 있다.

이 경우 수신신호의 순간적인 에너지가 크게 감소하여 오류가 발생할 확률이 증가한다.

그러나 Diversity 환경에서는 동일한 송신 심벌이 서로 독립적인 페이딩 계수를 갖는 여러 branch를 통해 수신된다.

따라서 특정 branch에서 심한 페이딩이 발생하더라도 다른 branch에서는 상대적으로 양호한 수신신호를 얻을 가능성이 존재한다.

예를 들어 각 branch에서 심한 페이딩이 발생할 확률을 $p$라고 하면, 페이딩 계수들이 서로 독립적인 경우 모든 branch에서 동시에 심한 페이딩이 발생할 확률은

$$
p^L
$$

이다.

여기서

$$
0<p<1
$$

이므로 $L$이 증가할수록

$$
p^L
$$

은 감소한다.

따라서 Diversity order가 증가하면 순간적인 수신 SNR이 매우 낮아질 확률이 감소하여 BER 성능이 향상된다.

높은 SNR 영역에서 BER은 일반적으로

$$
BER\\propto
\\left(\\frac{E_b}{N_0}\\right)^{-L}
$$

의 형태로 감소하므로 Diversity order가 증가할수록 BER 곡선의 기울기가 가팔라진다.

이러한 성능 향상을 Diversity 이득이라 한다.`,
    },
    { // 문제 4.E2
      "id": "25-4E2",
      "title": "4.E2.",
      "type": "python",
      "starterCode": `def simulate_mrc_shared(L, EbN0dB_vector, seed):

    rng = np.random.default_rng(seed)
    Eb = 1

    BER = np.zeros(len(EbN0dB_vector))

    for snr_i in range(len(EbN0dB_vector)):

        EbN0dB = EbN0dB_vector[snr_i]
        EbN0 = 10**(EbN0dB / 10)
        N0 = Eb / EbN0

        sym_cnt = 0
        err_cnt = 0

        while err_cnt < 100:

            Ns = 1000

            b = np.sign(rng.random(Ns) - 0.5)
            s = np.sqrt(Eb/L) * b

            h = np.zeros((Ns, L), dtype=complex)
            n = np.zeros((Ns, L), dtype=complex)
            r = np.zeros((Ns, L), dtype=complex)

            hk = np.sqrt(1/2) * (rng.standard_normal(Ns) + 1j * rng.standard_normal(Ns))

            for k in range(L):

                h[:, k] = hk

                n[:, k] = np.sqrt(N0/2) * (rng.standard_normal(Ns) + 1j * rng.standard_normal(Ns))

                r[:, k] = ?? * s + ??

            D = np.sum(np.conj(h) * r, axis=1)

            b_hat = np.sign(np.real(D))

            err_cnt = err_cnt + np.count_nonzero(b_hat != b)

            sym_cnt = sym_cnt + Ns

        BER[snr_i] = err_cnt / sym_cnt

        print("L =", L, "Eb/N0 =", EbN0dB, "dB, BER =", BER[snr_i])

    return BER`,
      "prompt": `문제 4.C2에서 작성한 MRC BER simulation 코드를 수정하여 각 branch에 동일한 페이딩 계수가 적용되는 경우를 실험해 보자.

기존 코드에서는 각 branch의 페이딩 계수 $h(k)$를 다음과 같이 생성하였다.
\`\`\`python
for k in range(L):

    h[:, k] = np.sqrt(1/2) * (rng.standard_normal(Ns) + 1j * rng.standard_normal(Ns))
\`\`\`
이를 다음과 같이 수정한다.
\`\`\`python
hk = np.sqrt(1/2) * (rng.standard_normal(Ns) + 1j * rng.standard_normal(Ns))

for k in range(L):

    h[:, k] = hk

    n[:, k] = np.sqrt(N0/2) * (rng.standard_normal(Ns) + 1j * rng.standard_normal(Ns))

    r[:, k] = ?? * s + ??
\`\`\`
(a) [[equation:25.8]]을 이용하여 코드의 빈칸을 채우고, 수정된 MRC BER simulation 함수를 완성하시오.
(b) 코드를 수정한 후에도 각 branch의 페이딩 계수 $h(k)$ 자체의 확률분포는 수정 전과 동일하다. 그 이유를 설명하시오.

단, 각 branch의 AWGN 성분 $n(k)$은 수정 전과 동일하게 서로 독립적으로 생성한다.`,
      responseEnabled: true,
      referenceAnswer: `(a) 식 25.8에 의해 각 branch의 수신신호는

$$
r(k)=h(k)s+n(k)
$$

이다.

따라서 코드의 빈칸을 채우면 다음과 같다.

\`\`\`python
hk = np.sqrt(1/2) * (rng.standard_normal(Ns) + 1j * rng.standard_normal(Ns))

for k in range(L):

    h[:, k] = hk

    n[:, k] = np.sqrt(N0/2) * (rng.standard_normal(Ns) + 1j * rng.standard_normal(Ns))

    r[:, k] = h[:, k] * s + n[:, k]
\`\`\`

수정 전에는 각 branch에서 서로 독립적인 페이딩 계수를 생성하였다.

반면 수정 후에는 각 송신 심벌에 대하여 페이딩 계수를 한 번만 생성하고, 해당 계수를 모든 branch에 동일하게 적용한다.

따라서 하나의 송신 심벌에 대하여

$$
h(1)=h(2)=\\cdots=h(L)=h_k
$$

이다.

(b) 수정된 코드에서 페이딩 계수 $h_k$는

\`\`\`python
hk = np.sqrt(1/2) * (rng.standard_normal(Ns) + 1j * rng.standard_normal(Ns))
\`\`\`

와 같이 생성된다.

따라서 $h_k$의 실수부와 허수부는 각각 평균 0, 분산 $1/2$인 독립 가우시안 분포를 따른다.

$$
\\operatorname{Re}(h_k),
\\operatorname{Im}(h_k)
\\sim
\\mathcal{N}\\left(0,\\frac12\\right)
$$

즉,

$$
h_k\\sim\\mathcal{CN}(0,1)
$$

이다.

모든 branch의 페이딩 계수를 $h_k$로 설정하였으므로 각 branch의 페이딩 계수 자체의 확률분포는

$$
h(k)\\sim\\mathcal{CN}(0,1)
$$

로 수정 전과 동일하다.

그러나 수정 전에는 각 branch의 페이딩 계수가 서로 독립적이었던 반면, 수정 후에는 모든 branch에서 동일한 페이딩 계수를 사용하므로 서로 독립적이지 않다.

즉, 각 페이딩 계수의 개별적인 확률분포는 동일하지만 페이딩 계수 사이의 통계적 관계가 변화하였다.

또한 각 branch의 AWGN 성분은 수정 전과 동일하게 서로 독립적으로 생성된다.`,
    },
    { // 문제 4.E3
      "id": "25-4E3",
      "title": "4.E3.",
      "type": "python",
      "starterCode": `L = 5

BER_mrc_shared = simulate_mrc_shared(
    L,
    EbN0dB_vector_mrc,
    seed
)

plt.figure()

plt.semilogy(
    EbN0dB_vector_mrc,
    BER_mrc_shared,
    label='MRC, L=5, Same fading'
)

plt.xlabel('Eb/N0 [dB]')
plt.ylabel('BER')
plt.legend()
plt.grid()
plt.show()`,
      "prompt": `Diversity order를 $L=5$로 설정하고 문제 4.E2에서 완성한 MRC BER simulation 함수를 실행하시오. 모든 branch에 동일한 페이딩 계수가 적용되는 경우의 BER 결과 그래프를 관찰하시오.`,
      responseEnabled: true,
      referenceAnswer: `Diversity order를 $L=5$로 설정하고 수정된 MRC BER simulation 함수를 실행한다.

\`\`\`python
L = 5

BER_mrc_shared = simulate_mrc_shared(
    L,
    EbN0dB_vector_mrc,
    seed
)
\`\`\`

출력된 BER 그래프는 $E_b/N_0$가 증가할수록 BER이 감소하는 형태를 나타낸다.

그러나 문제 4.C3에서 얻은 독립적인 페이딩 계수를 사용하는 $L=5$의 MRC BER 그래프와 비교하면 BER 감소 폭이 작고 BER 곡선의 기울기가 완만하다.

모든 branch에서 동일한 페이딩 계수를 사용하므로 하나의 branch에서 심한 페이딩이 발생하면 다른 branch에서도 동일하게 심한 페이딩이 발생하기 때문이다.

본 실험의 에너지 정규화 조건에서는 모든 branch의 페이딩 계수가 동일할 경우 이론적으로 $L=1$인 Rayleigh fading channel의 BPSK BER과 동일한 성능을 갖는다.

따라서 물리적으로 5개의 branch가 존재하더라도 실제 diversity order는 1에 해당하는 BER 곡선이 나타난다.`,
    },
    { // 문제 4.E4
      "id": "25-4E4",
      "title": "4.E4.",
      "type": "python",
      "starterCode": `plt.figure(figsize=(8, 6))

plt.semilogy(
    EbN0dB_vector_mrc,
    BER_mrc_L5,
    'b',
    label='MRC, L=5, Independent fading'
)

plt.semilogy(
    EbN0dB_vector_mrc,
    BER_mrc_shared,
    'r',
    label='MRC, L=5, Same fading'
)

plt.xlabel('Eb/N0 [dB]')
plt.ylabel('BER')
plt.legend()
plt.grid()
plt.show()`,
      "prompt": `문제 4.C3에서 얻은 수정 전 MRC의 BER 곡선과 문제 4.E3에서 얻은 수정 후 MRC의 BER 곡선을 비교하시오. 두 경우 모두 Diversity order는 $L=5$로 동일하다.

(a) 두 BER 곡선을 하나의 그래프에 겹쳐 그리고 BER 성능 및 BER 곡선의 기울기를 비교하시오.
(b) 두 그래프 사이에 현저한 차이가 발생하는 이유를 설명하시오.

즉, 수정 전과 수정 후에 각 페이딩 계수 $h(k)$의 확률분포 자체는 동일함에도 수정 후의 MRC simulation에서는 Diversity 효과를 얻지 못하는 이유를 설명하시오.`,
      responseEnabled: true,
      referenceAnswer: `(a) 출력된 그래프에는 다음 두 개의 BER 곡선이 나타난다.

- 파란색: 서로 독립적인 페이딩 계수를 사용하는 MRC, L=5
- 빨간색: 동일한 페이딩 계수를 사용하는 MRC, L=5

서로 독립적인 페이딩 계수를 사용하는 경우 BER이 더욱 빠르게 감소하고 BER 곡선의 기울기가 가파르다.

반면 동일한 페이딩 계수를 사용하는 경우에는 BER이 상대적으로 높으며 BER 곡선의 기울기가 완만하다.

따라서 $E_b/N_0$가 증가할수록 두 경우의 상대적인 BER 성능 차이가 커진다.

(b) 독립적인 페이딩 계수를 사용하는 MRC의 순간적인 SNR은

$$
\\gamma_{MRC}
=
\\frac{E_b}{LN_0}
\\sum_{k=1}^{L}|h(k)|^2
$$

이다.

수정 전에는

$$
h(1),h(2),\\ldots,h(L)
$$

이 서로 독립적인 복소 가우시안 확률변수이다.

따라서 하나의 branch에서 페이딩 계수의 크기가 매우 작아지더라도 다른 branch의 페이딩 계수는 큰 값을 가질 수 있다.

이러한 여러 branch의 수신신호를 결합하면 모든 branch에서 동시에 심한 페이딩이 발생할 확률이 감소하므로 Diversity 이득을 얻을 수 있다.

반면 수정 후에는 모든 branch의 페이딩 계수가

$$
h(1)=h(2)=\\cdots=h(L)=h_k
$$

로 동일하다.

따라서 MRC의 순간적인 SNR은

$$
\\begin{aligned}
\\gamma_{MRC,shared}
&=
\\frac{E_b}{LN_0}
\\sum_{k=1}^{L}|h(k)|^2\\\\
&=
\\frac{E_b}{LN_0}
\\sum_{k=1}^{L}|h_k|^2\\\\
&=
\\frac{E_b}{LN_0}
L|h_k|^2\\\\
&=
\\frac{E_b}{N_0}|h_k|^2
\\end{aligned}
$$

이다.

따라서

$$
\\boxed{
\\gamma_{MRC,shared}
=
\\frac{E_b}{N_0}|h_k|^2
}
$$

이다.

이는 Diversity order가 1인 Rayleigh fading channel의 순간적인 SNR과 동일하다.

즉, $L$개의 branch가 존재하더라도 하나의 branch에서 심한 페이딩이 발생하면 나머지 모든 branch에서도 동일한 페이딩이 발생한다.

따라서 순간적인 수신신호 에너지가 매우 작아질 확률을 줄일 수 없으며 Diversity 이득을 얻지 못한다.

결과적으로 수정 전의 실제 diversity order는 5인 반면 수정 후의 실제 diversity order는 1이다.

각 페이딩 계수 자체의 확률분포가 동일하더라도 branch 사이의 통계적 독립성이 사라지면 Diversity 이득을 얻을 수 없음을 확인할 수 있다.`,
    },
    { // 문제 4.E5
      "id": "25-4E5",
      "title": "4.E5.",
      "type": "essay",
      "prompt": `문제 4.E3과 4.E4에서 얻은 실험 결과를 바탕으로 다음에 답하시오.

Diversity 이득을 최대화하기 위해 각 branch의 페이딩 계수 $h(1),h(2),\\ldots,h(L)$가 만족해야 하는 통계적 조건은 무엇인가? 각 페이딩 계수의 확률분포와 페이딩 계수 사이의 통계적 독립성 관점에서 설명하시오.`,
      referenceAnswer: `문제 4.E3과 4.E4의 결과에 따르면 각 branch의 페이딩 계수 자체의 확률분포가 동일하더라도 페이딩 계수 사이의 통계적 관계에 따라 BER 성능이 크게 달라진다.

본 실험에서 설정한 동일한 평균 에너지의 Rayleigh fading 환경에서는 각 branch의 페이딩 계수가

$$
h(k)\\sim\\mathcal{CN}(0,1),
\\qquad
k=1,2,\\ldots,L
$$

의 동일한 확률분포를 따르고, 서로 통계적으로 독립적인 것이 이상적이다.

즉, 각 branch의 페이딩 계수

$$
h(1),h(2),\\ldots,h(L)
$$

는 서로 독립이고 동일한 분포를 갖는 i.i.d. (independent and identically distributed) 확률변수이다.

서로 독립적인 페이딩 계수를 사용하면 특정 branch에서 심한 페이딩이 발생하더라도 다른 branch에서 동일한 페이딩이 발생할 가능성이 감소한다.

따라서 모든 branch에서 동시에 심한 페이딩이 발생할 확률이 감소하여 Diversity 이득을 얻을 수 있다.

반면 페이딩 계수 사이의 상관성이 매우 높으면 여러 branch에서 동시에 심한 페이딩이 발생할 가능성이 증가하므로 Diversity 이득이 감소한다.

결론적으로 본 실험에서 이상적인 Diversity 이득을 얻기 위한 통계적 조건은

$$
\\boxed{
h(1),h(2),\\ldots,h(L)
\\text{ are i.i.d.}
}
$$

이다.

특히 각 branch의 페이딩 계수가 동일한 분포를 갖는다는 사실만으로는 충분하지 않으며, 페이딩 계수 사이의 통계적 독립성이 중요하다.`,
    },
  ]
},
  ]
} as const;
