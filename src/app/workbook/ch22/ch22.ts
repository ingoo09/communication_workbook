import type { WorkbookChapter } from '@/types/workbook';

export const chapter = {
  "id": "22-qpsk",
  "title": "Chapter 22. QPSK and OQPSK",
  "sections": [
    { //문제 1
      "id": "22-1",
      "title": "1. QPSK 신호 특성",
      "problems": [
        { //문제 1.A
          "id": "22-1A",
          "title": "1.A.",
          "prompt": `[[equation:22.1]]과 같은 통과대역(Passband) QPSK 신호(펄스성형은 하지 않음)가 있다.
$$
s_i(t)
=\\sqrt{\\dfrac{2E_s}{T_s}}\\cos\\left(\\omega_c t - \\phi_i \\right), 
\\qquad 0 \\le t \\le T_s, 
\\qquad i=1, 2, 3, 4.
\\qquad \\text{(식 22.1)}
$$
여기서, 위상 $\\phi_i$는 하나의 4-ary (Quaternary) 심벌을 이루는 두 데이터 비트 $b_I, b_Q$에 따라 <표 22.1>과 같이 선택된다. $E_s$는 심벌 에너지, $T_s$는 심벌 길이를 나타낸다.
[[table:
caption:표 22.1 4-ary 심벌의 위상 매핑 (mapping)
$i$ | $b_I b_Q$ | $\\phi_i$
1 | 00 | $\\pi/4$
2 | 01 | $-\\pi/4$
3 | 10 | $3\\pi/4$
4 | 11 | $-3\\pi/4$
]]
두 정규직교(orthonormal) 기저(basis)를 $\\psi_1(t)=\\sqrt{\\dfrac{2}{T_s}}\\cos\\left(\\omega_c t\\right)$와 $\\psi_2(t)=\\sqrt{\\dfrac{2}{T_s}}\\sin\\left(\\omega_c t\\right)$로 두자. 그러면, QPSK 신호 $s_i(t)$는 기저를 이용해 [[equation:22.2]]와 같이 다시 쓸 수 있다.
$$
s_i(t)
=\\sqrt{E_s}\\cos\\left(\\phi_i\\right)\\psi_1(t)
+\\sqrt{E_s}\\sin\\left(\\phi_i\\right)\\psi_2(t),
\\qquad i=1, \\cdots, 4.
\\qquad \\text{(식 22.2)}
$$

다음의 두 가지 방법으로 [[equation:22.2]]를 증명하시오.

(주의. [[equation:22.1]]의 우변이 [[equation:22.2]]의 우변이 됨을 보이는 증명이므로, 증명 과정에서 $s_i(t)$를 [[equation:22.2]]의 우변으로 놓고 푸는 것은 모순임)
`,
        },
        {
          "id": "22-1A1",
          "title": "1.A1.",
          "type": "proof",
          "prompt": `(방법 1) 삼각함수 공식(trigonometric formula) 즉, $\\cos(A-B)=??$를 사용하여 [[equation:22.1]]의 우변을 전개하시오.`,
          referenceAnswer: `$\\cos(A-B)=\\cos A\\cos B+\\sin A\\sin B$이므로,
$$
\\begin{aligned}
s_i(t)
&=\\sqrt{\\frac{2E_s}{T_s}}
\\cos(\\omega_ct-\\phi_i)\\\\
&=\\sqrt{\\frac{2E_s}{T_s}}
\\left[
\\cos(\\omega_ct)\\cos\\phi_i+
\\sin(\\omega_ct)\\sin\\phi_i
\\right]\\\\
&=\\sqrt{E_s}\\cos\\phi_i
\\left(\\sqrt{\\frac{2}{T_s}}\\cos\\omega_ct\\right)
+\\sqrt{E_s}\\sin\\phi_i
\\left(\\sqrt{\\frac{2}{T_s}}\\sin\\omega_ct\\right)\\\\
&=\\sqrt{E_s}\\cos\\phi_i\\psi_1(t)
+\\sqrt{E_s}\\sin\\phi_i\\psi_2(t).
\\end{aligned}
$$
따라서 식 (22.2)가 성립한다.`,
        },
        {
          "id": "22-1A2",
          "title": "1.A2.",
          "type": "proof",
          "prompt": `(방법 2) 정규직교 기저 $\\psi_1(t)$와 $\\psi_2(t)$를 사용하여, $s_i(t)$([[equation:22.1]]의 우변)를 2차원(2-D) 벡터 스페이스의 한 점으로 변환하시오.

(a) $s_i(t)$가 가지고 있는 $\\psi_1(t)$ 성분의 크기는 $\\int_{0}^{T_s} s_i(t) \\psi_1^{*}(t) \\, dt$로 구할 수 있으며, $s_i(t)$가 가지고 있는 $\\psi_2(t)$ 성분의 크기는 ??로 구할 수 있다. 각 성분의 크기를 구하시오. ($\\omega_c>>1$임을 이용할 것)
(b) (a)의 결과를 이용하여, $s_i(t)$를 $\\psi_1(t)$와 $\\psi_2(t)$의 선형 결합으로 나타내시오.
`,
          referenceAnswer: `(a) $\\psi_2(t)$ 성분의 크기는
$$
\\int_0^{T_s}s_i(t)\\psi_2^*(t)\\,dt
$$
로 구한다.

$\\psi_1(t)$ 방향의 성분은
$$
\\begin{aligned}
\\int_0^{T_s}s_i(t)\\psi_1(t)\\,dt
&=\\int_0^{T_s}
\\sqrt{\\frac{2E_s}{T_s}}
\\cos(\\omega_ct-\\phi_i)
\\sqrt{\\frac{2}{T_s}}\\cos(\\omega_ct)\\,dt\\\\
&\\simeq \\sqrt{E_s}\\cos\\phi_i.
\\end{aligned}
$$

마찬가지로 $\\psi_2(t)$ 방향의 성분은
$$
\\int_0^{T_s}s_i(t)\\psi_2(t)\\,dt
\\simeq \\sqrt{E_s}\\sin\\phi_i.
$$

따라서 2차원 벡터 공간에서 $s_i(t)$의 좌표는
$$
\\left(\\sqrt{E_s}\\cos\\phi_i,\\,
\\sqrt{E_s}\\sin\\phi_i\\right)
$$
이다.

(b) 각 기저 성분을 이용하면
$$
s_i(t)
=\\sqrt{E_s}\\cos\\phi_i\\psi_1(t)
+\\sqrt{E_s}\\sin\\phi_i\\psi_2(t)
$$
가 되어 식 (22.2)를 얻는다.`,
        },
        { //문제 1.B
          "id": "22-1B",
          "title": "1.B.",
          "type": "proof",
          "prompt": `[[equation:22.2]]의 $\\phi_i$에 <표 22.1>에서 주어진 값을 대입하여, $s_i(t)$를 다시 나타내시오.
- $s_1(t) = ?$
- $s_2(t) = ?$
- $s_3(t) = ?$
- $s_4(t) = ?$
`,
          referenceAnswer: `각 위상을 식 (22.2)에 대입하면
$$
s_1(t)
=\\sqrt{\\frac{E_s}{2}}\\psi_1(t)
+\\sqrt{\\frac{E_s}{2}}\\psi_2(t),
$$

$$
s_2(t)
=\\sqrt{\\frac{E_s}{2}}\\psi_1(t)
-\\sqrt{\\frac{E_s}{2}}\\psi_2(t),
$$

$$
s_3(t)
=-\\sqrt{\\frac{E_s}{2}}\\psi_1(t)
+\\sqrt{\\frac{E_s}{2}}\\psi_2(t),
$$

$$
s_4(t)
=-\\sqrt{\\frac{E_s}{2}}\\psi_1(t)
-\\sqrt{\\frac{E_s}{2}}\\psi_2(t).
$$`,
        },
        { //문제 1.C
          "id": "22-1C",
          "title": "1.C.",
          "prompt": `$\\psi_1(t)$가 x축(In-phase, 또는 I 채널이라 부름) 단위(unit) 벡터이고, $\\psi_2(t)$가 y축(Quadri-phase, 또는 Q 채널이라 부름) 단위 벡터인 2차원 벡터 공간을 생각하자.`,
        },
        {
          "id": "22-1C1",
          "title": "1.C1.",
          "type": "essay",
          "prompt": `문제 1.A2 (a), 1.B의 답을 이용하여, 벡터 공간에서 4가지 신호 $s_i(t), i=1, 2, 3, 4$의 x, y 좌표를 각각 쓰시오.`,
          referenceAnswer: `각 신호의 $(x,y)$ 좌표는 다음과 같다.

- $s_1(t)$: $\\left(\\sqrt{E_s/2},\\sqrt{E_s/2}\\right)$
- $s_2(t)$: $\\left(\\sqrt{E_s/2},-\\sqrt{E_s/2}\\right)$
- $s_3(t)$: $\\left(-\\sqrt{E_s/2},\\sqrt{E_s/2}\\right)$
- $s_4(t)$: $\\left(-\\sqrt{E_s/2},-\\sqrt{E_s/2}\\right)$`,
        },
        {
          "id": "22-1C2",
          "title": "1.C2.",
          "type": "graph",
          graphInputMode: 'both',
          graphShowGrid: true,
          "prompt": `2-D 공간의 x축과 y축 그림에서, 4가지 신호 $s_i(t), i=1, 2, 3, 4$ 각각의 좌표에 해당하는 지점을 표시하고, <표 22.1>을 바탕으로 각 신호 지점위에 전송되는 두 데이터 비트 값을 명시하시오`,
          referenceAnswer: `2차원 I-Q 평면에 다음 네 점을 표시한다.

- $00$: $\\left(\\sqrt{E_s/2},\\sqrt{E_s/2}\\right)$
- $01$: $\\left(\\sqrt{E_s/2},-\\sqrt{E_s/2}\\right)$
- $10$: $\\left(-\\sqrt{E_s/2},\\sqrt{E_s/2}\\right)$
- $11$: $\\left(-\\sqrt{E_s/2},-\\sqrt{E_s/2}\\right)$

네 점은 모두 원점으로부터 거리가 $\\sqrt{E_s}$이고, 각 사분면에 하나씩 위치한다.`,
        },
        { //문제 1.D
          "id": "22-1D",
          "title": "1.D.",
          "type": "essay",
          "prompt": `문제 1.C2에서 그린 벡터 공간위의 네 지점이 x축과 이루는 각도가 <표 22.1>에서 주어진 $\\phi_i$ 값과 같은지 확인하시오.`,
          referenceAnswer: `각 좌표가 x축과 이루는 각도를 확인하면

- $s_1(t)$: $\\pi/4$
- $s_2(t)$: $-\\pi/4$
- $s_3(t)$: $3\\pi/4$
- $s_4(t)$: $-3\\pi/4$

가 된다. 따라서 네 신호점이 x축과 이루는 각도는 <표 22.1>의 $\\phi_i$와 일치한다.`,
        },
        { //문제 1.E
          "id": "22-1E",
          "title": "1.E.",
          "prompt": `일반적으로, MPSK 신호는 $s_i(t)=\\sqrt{\\dfrac{2E_s}{T_s}}\\cos\\left(\\omega_c t-\\dfrac{2\\pi(i-1)}{M}\\right), i=1, 2, \\cdots, M$과 같이 표현된다. 여기서, $E_s$는 $M$-ary 심벌의 에너지이다.`,
        },
        {
          "id": "22-1E1",
          "title": "1.E1.",
          "type": "proof",
          "prompt": `$M=8$일 때 즉, 8PSK를 고려하자. $\\psi_1(t)$와 $\\psi_2(t)$로 확장된 2차 벡터 공간에서 $s_i(t), i=1, 2, \\cdots, 8$의 각각의 x, y 좌표를 계산하시오. ($\\psi_1(t)=\\sqrt{\\dfrac{2}{T_s}}\\cos\\left(\\omega_c t\\right)$와 $\\psi_2(t)=\\sqrt{\\dfrac{2}{T_s}}\\sin\\left(\\omega_c t\\right)$임을 상기할 것)

(참고. 본 교재에서는 "$\\psi_1(t)$가 x축(In-phase) 단위(unit) 벡터이고 $\\psi_2(t)$가 y축(Quadri-phase) 단위 벡터인 벡터 공간"을 줄여서, $\\psi_1(t)$와 $\\psi_2(t)$로 확장된 벡터 공간으로 표현하기도 한다.)`,
          referenceAnswer: `8PSK에서
$$
\\theta_i=\\frac{2\\pi(i-1)}{8}
$$
라 하면 각 신호의 좌표는
$$
(x_i,y_i)
=\\left(\\sqrt{E_s}\\cos\\theta_i,\\sqrt{E_s}\\sin\\theta_i\\right)
$$
이다.

따라서

- $i=1$: $(\\sqrt{E_s},0)$
- $i=2$: $(\\sqrt{E_s/2},\\sqrt{E_s/2})$
- $i=3$: $(0,\\sqrt{E_s})$
- $i=4$: $(-\\sqrt{E_s/2},\\sqrt{E_s/2})$
- $i=5$: $(-\\sqrt{E_s},0)$
- $i=6$: $(-\\sqrt{E_s/2},-\\sqrt{E_s/2})$
- $i=7$: $(0,-\\sqrt{E_s})$
- $i=8$: $(\\sqrt{E_s/2},-\\sqrt{E_s/2})$

이다.`,
        },
        {
          "id": "22-1E2",
          "title": "1.E2.",
          "type": "essay",
          "prompt": `MPSK 신호 에너지 $E_s$와 비트 에너지 $E_b$ 사이의 관계를 수식으로 나타내시오.`,
          referenceAnswer: `하나의 $M$-ary 심벌에는 $\\log_2M$개의 비트가 포함되므로
$$
E_s=E_b\\log_2M
$$
이다.

따라서
$$
E_b=\\frac{E_s}{\\log_2M}.
$$

특히 QPSK에서는 $M=4$이므로
$$
E_s=2E_b.
$$`,
        },
        { //문제 1.F
          "id": "22-1F",
          "title": "1.F.",
          "type": "proof",
          "prompt": `문제 1.B, 1.E2의 답을 사용하여, [[equation:22.2]]에 주어진 QPSK 신호 $s_i(t)$를 [[equation:22.3]]과 같이 표현할 수 있다.
$$
s_i(t)
=x(t)+y(t)
\\qquad \\text{(식 22.3)}
$$
여기서
$$
x(t)=
\\begin{cases}
\\sqrt{E_b}\\psi_1(t)
& \\text{ if } b_I=0 \\\\
-\\sqrt{E_b}\\psi_1(t)
& \\text{ if } b_I=1
\\end{cases},
\\qquad y(t) = ?
\\qquad \\text{(식 22.4)}
$$
이다. 

[[equation:22.4]]에 따르면, $x(t)$와 $y(t)$는 다음과 같이 해석할 수 있다.
- $x(t)$는 $\\psi_1(t)$ 축에서 비트 $b_I$를 전송하는 antipodal (BPSK) 신호.
- $y(t)$는 $\\psi_2(t)$ 축에서 비트 $b_Q$를 전송하는 antipodal (BPSK) 신호.
따라서, 두 개의 분리된 BPSK 신호를 생성하여 더함으로써 QPSK 신호 $s_i(t)$를 생성 할 수 있다. 

[[equation:22.4]]의 ?를 채워 식을 완성하시오.`,
          referenceAnswer: `식 (22.4)의 $y(t)$는
$$
y(t)=
\\begin{cases}
\\sqrt{E_b}\\psi_2(t),
& \\text{if } b_Q=0,\\\\
-\\sqrt{E_b}\\psi_2(t),
& \\text{if } b_Q=1.
\\end{cases}
$$

따라서
$$
s_i(t)=x(t)+y(t)
$$
이며, $x(t)$와 $y(t)$는 각각 $\\psi_1(t)$와 $\\psi_2(t)$ 방향에서 $b_I$와 $b_Q$를 전송하는 서로 직교하는 BPSK 신호이다.`,
        },
      ]
    },
    { //문제 2
  "id": "22-2",
  "title": "2. QPSK 송신기 구현",
  "problems": [
    { // 문제 2.A
  "id": "22-2A",
  "title": "2.A.",
  "prompt": `문제 1.F에서 QPSK 신호 $s_i(t)$는 [[equation:22.3]]과 같이 서로 직교하는 두 개의 BPSK 신호 $x(t)$와 $y(t)$의 합으로 생성할 수 있음을 확인하였다. 여기서 I 채널은 데이터 비트 $b_I$를, Q 채널은 데이터 비트 $b_Q$를 전송한다.

본 실습에서는 다음 조건으로 QPSK 송신기를 Python으로 구현한다.
- QPSK 심벌 주기: $T_s=1$ sec
- 반송 주파수: $f_c=30$ Hz
- 비트 에너지: $E_b=16$
- QPSK 심벌당 샘플 수: $L=256$
- 샘플 간격: $t_{step}=T_s/L=1/256$ sec
[[image:/images/ch22/figure22_1.png|그림 22.1 QPSK 송신기 설계|75]]
아래 Python 코드는 [그림 22.1]의 QPSK 송신기를 구현한 기본 코드이다.
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

# QPSK 시스템 파라미터
Ts = 1
L = 256
t_step = Ts / L

Eb = 16
fc = 30
Ns = 20

# I/Q binary data 생성
seed_I = XX # XX는 학번 끝 2자리

rng_I = np.random.default_rng(seed_I)
rng_Q = np.random.default_rng(seed_I + 1)

bI = rng_I.integers(0, 2, Ns)
bQ = rng_Q.integers(0, 2, Ns)

# Unipolar binary -> bipolar
# 0 -> -1, 1 -> +1
aI = 2 * bI - 1
aQ = 2 * bQ - 1

# 각 심벌을 L개의 sample로 확장
I_baseband = np.repeat(aI, L)
Q_baseband = np.repeat(aQ, L)

# binary data 관찰용 파형
bI_wave = np.repeat(bI, L)
bQ_wave = np.repeat(bQ, L)

# 시간축
t = np.arange(Ns * L) * t_step

# 직교 기저 신호
psi1 = np.sqrt(2 / Ts) * np.cos(2 * np.pi * fc * t)
psi2 = np.sqrt(2 / Ts) * np.sin(2 * np.pi * fc * t)

# I/Q 채널 BPSK 신호
x = np.sqrt(Eb) * I_baseband * psi1
y = np.sqrt(Eb) * Q_baseband * psi2

# QPSK 송신 신호
tx_signal = x + y

# Time-domain Viewer
plt.figure(figsize=(11, 8))

plt.subplot(3, 1, 1)
plt.step(t, bI_wave, where='post')
plt.ylabel('$b_I$')
plt.yticks([0, 1])
plt.grid()

plt.subplot(3, 1, 2)
plt.step(t, bQ_wave, where='post')
plt.ylabel('$b_Q$')
plt.yticks([0, 1])
plt.grid()

plt.subplot(3, 1, 3)
plt.plot(t, tx_signal)
plt.xlabel('Time (s)')
plt.ylabel('$s_i(t)$')
plt.grid()

plt.tight_layout()
plt.show()
\`\`\`
위 코드에서 $b_I$, $b_Q$는 서로 독립적으로 생성되는 binary data이며, 두 데이터는 각각 bipolar 신호로 변환된 후 서로 직교하는 기저신호 $\\psi_1(t)$와 $\\psi_2(t)$를 이용하여 변조된다.

본 Python 실습에서는 원래 송신기 구현의 Unipolar-to-Bipolar 변환과 동일하게 $0\\rightarrow -1$, $1\\rightarrow +1$의 매핑을 사용한다. 이는 [[equation:22.4]]에 제시된 부호 convention과 반대이지만, 송신기와 수신기에서 동일한 매핑을 사용하면 변복조 동작에는 영향을 주지 않는다.

최종적으로 두 채널의 신호를 더하여 QPSK 송신신호 $s_i(t)$를 생성한다.`,
},
{
  "id": "22-2A1",
  "title": "2.A1.",
  "type": "essay",
  "prompt": `[그림 22.1]과 위 Python 코드를 참고하여 다음 신호가 각각 어떤 Python 변수에 해당하는지 쓰시오.

- I 채널 binary 데이터 $b_I$
- Q 채널 binary 데이터 $b_Q$
- 기저 신호 $\\psi_1(t)$
- 기저 신호 $\\psi_2(t)$
- I 채널 BPSK 신호 $x(t)$
- Q 채널 BPSK 신호 $y(t)$
- 최종 QPSK 송신 신호 $s_i(t)$`,
referenceAnswer: `각 신호와 Python 변수의 대응은 다음과 같다.

- I 채널 binary 데이터 $b_I$ → \`bI\`
- Q 채널 binary 데이터 $b_Q$ → \`bQ\`
- 기저 신호 $\\psi_1(t)$ → \`psi1\`
- 기저 신호 $\\psi_2(t)$ → \`psi2\`
- I 채널 BPSK 신호 $x(t)$ → \`x\`
- Q 채널 BPSK 신호 $y(t)$ → \`y\`
- 최종 QPSK 송신 신호 $s_i(t)$ → \`tx_signal\`

따라서 I 채널에서는 $b_I$를 $\\psi_1(t)$에 실어 $x(t)$를 생성하고, Q 채널에서는 $b_Q$를 $\\psi_2(t)$에 실어 $y(t)$를 생성한다. 최종적으로
$$
s_i(t)=x(t)+y(t)
$$
와 같이 두 직교 채널의 신호를 더하여 QPSK 송신 신호를 생성한다.`,
},
{
  "id": "22-2A2",
  "title": "2.A2.",
  "type": "essay",
  "prompt": `위 Python 코드의 주요 파라미터가 다음과 같이 설정된 이유를 각각 설명하시오.

1. $T_s=1$
2. $\\sqrt{E_b}=4$
3. $f_c=30$ Hz
4. $\\psi_1(t)$와 $\\psi_2(t)$의 진폭을 $\\sqrt{2/T_s}=\\sqrt{2}$로 설정한 이유
5. I 채널과 Q 채널의 binary data를 서로 다른 random sequence로 생성해야 하는 이유

또한, $2\\pi f_c=60\\pi$이므로 원본 설계의 반송파 각주파수와 현재 Python 코드의 $f_c=30$ Hz가 같은 설정임을 확인하시오.`,
referenceAnswer: `1. $T_s=1$  
QPSK의 한 심벌이 유지되는 시간이 1 sec로 주어졌기 때문이다.

2. $\\sqrt{E_b}=4$  
각 I/Q 채널의 antipodal BPSK 신호는 $\\pm\\sqrt{E_b}$의 크기를 가지므로
$$
\\sqrt{E_b}=\\sqrt{16}=4
$$
의 gain이 필요하다.

3. $f_c=30$ Hz  
본 실습에서 반송 주파수가 30 Hz로 주어졌기 때문이다. 따라서 반송파의 각주파수는
$$
\\omega_c=2\\pi f_c=2\\pi(30)=60\\pi\\text{ rad/s}
$$
이다.

4. $\\psi_1(t)$와 $\\psi_2(t)$의 진폭을 $\\sqrt{2/T_s}$로 설정하는 이유  
두 기저 신호가 심벌 구간 $0\\le t\\le T_s$에서 단위 에너지를 갖는 정규직교 기저가 되도록 하기 위해서이다.
$$
\\psi_1(t)=\\sqrt{\\frac{2}{T_s}}\\cos(2\\pi f_ct),
\\qquad
\\psi_2(t)=\\sqrt{\\frac{2}{T_s}}\\sin(2\\pi f_ct)
$$
이고, $T_s=1$이므로 진폭은 $\\sqrt{2}$가 된다.

5. I/Q 채널의 random sequence를 서로 다르게 생성하는 이유  
I 채널의 $b_I$와 Q 채널의 $b_Q$는 한 QPSK 심벌을 구성하는 서로 독립적인 두 비트이므로 서로 다른 binary sequence를 사용해야 한다. 동일한 random sequence를 사용하면 두 채널의 데이터가 항상 같아져 QPSK의 네 가지 비트 조합을 적절히 생성할 수 없다.`,
},
    { // 문제 2.B
  "id": "22-2B",
  "title": "2.B.",
  "prompt": `문제 2.A에서 구현한 QPSK 송신기를 이용하여 $s_i(t)$를 20심벌 동안 연속하여 생성하고, I 채널과 Q 채널의 데이터 및 최종 QPSK 송신신호의 시간영역 파형을 관찰해 보자.

본 실습에서는
- QPSK 심벌 주기: $T_s=1$ sec
- 심벌당 샘플 수: $L=256$
- 샘플 간격: $t_{step}=1/256$ sec
를 사용한다.`,
},
{
  "id": "22-2B1",
  "title": "2.B1.",
  "type": "essay",
  "prompt": `QPSK 심벌 20개를 연속하여 생성하려고 한다.

$T_s=1$ sec일 때 전체 신호의 관찰 시간을 얼마로 설정해야 하는지 쓰고, 그 이유를 설명하시오.`,
referenceAnswer: `전체 관찰 시간은 20 sec이다.

QPSK의 한 심벌 주기가
$$
T_s=1\\text{ sec}
$$
이고 총 20개의 심벌을 생성하므로
$$
T_{simulation}=20T_s=20\\times1=20\\text{ sec}
$$
가 된다.`,
},
{
  "id": "22-2B2",
  "title": "2.B2.",
  "type": "python",
  "starterCode": `import numpy as np
import matplotlib.pyplot as plt

# QPSK 시스템 파라미터
Ts = 1
L = 256
t_step = Ts / L

Eb = 16
fc = 30
Ns = 20

# I/Q binary data 생성
seed_I = XX # XX는 학번 끝 2자리

rng_I = np.random.default_rng(seed_I)
rng_Q = np.random.default_rng(seed_I + 1)

bI = rng_I.integers(0, 2, Ns)
bQ = rng_Q.integers(0, 2, Ns)

# Unipolar binary -> bipolar
# 0 -> -1, 1 -> +1
aI = 2 * bI - 1
aQ = 2 * bQ - 1

# 각 심벌을 L개의 sample로 확장
I_baseband = np.repeat(aI, L)
Q_baseband = np.repeat(aQ, L)

# binary data 관찰용 파형
bI_wave = np.repeat(bI, L)
bQ_wave = np.repeat(bQ, L)

# 시간축
t = np.arange(Ns * L) * t_step

# 직교 기저 신호
psi1 = np.sqrt(2 / Ts) * np.cos(2 * np.pi * fc * t)
psi2 = np.sqrt(2 / Ts) * np.sin(2 * np.pi * fc * t)

# I/Q 채널 BPSK 신호
x = np.sqrt(Eb) * I_baseband * psi1
y = np.sqrt(Eb) * Q_baseband * psi2

# QPSK 송신 신호
tx_signal = x + y

# Time-domain Viewer
plt.figure(figsize=(11, 8))

plt.subplot(3, 1, 1)
plt.step(t, bI_wave, where='post')
plt.ylabel('$b_I$')
plt.yticks([0, 1])
plt.grid()

plt.subplot(3, 1, 2)
plt.step(t, bQ_wave, where='post')
plt.ylabel('$b_Q$')
plt.yticks([0, 1])
plt.grid()

plt.subplot(3, 1, 3)
plt.plot(t, tx_signal)
plt.xlabel('Time (s)')
plt.ylabel('$s_i(t)$')
plt.grid()

plt.tight_layout()
plt.show()`,
  "prompt": `문제 2.A에 주어진 py 스크립트를 실행하여 20심벌 동안 생성된 다음 세 신호의 시간영역 파형을 관찰하시오.

1. I 채널의 binary data $b_I$
2. Q 채널의 binary data $b_Q$
3. 최종 QPSK 송신신호 $s_i(t)$

실행 결과를 바탕으로 다음을 확인하시오.
- 각 binary data가 한 심벌 주기 $T_s=1$ sec 동안 일정한 값을 유지하는가?
- $b_I$와 $b_Q$가 서로 다른 binary sequence로 생성되는가?
- 데이터 비트 조합이 바뀔 때 QPSK 송신신호의 위상이 어떻게 변하는가?`,
  responseEnabled: true,
  referenceAnswer: `\`XX\`에는 자신의 학번 끝 두 자리를 입력하여 실행한다.

실행 결과에서 $b_I$와 $b_Q$는 각각 한 심벌 주기인 $T_s=1$ sec 동안 0 또는 1의 값을 일정하게 유지한다. 두 채널은 서로 다른 random number generator를 사용하므로 서로 다른 binary sequence가 생성된다.

각 비트는
$$
0\\rightarrow -1,\\qquad 1\\rightarrow +1
$$
의 bipolar 값으로 변환된 후, I 채널에서는 $\\psi_1(t)$, Q 채널에서는 $\\psi_2(t)$와 곱해진다.

따라서
$$
x(t)=\\sqrt{E_b}a_I\\psi_1(t),
\\qquad
y(t)=\\sqrt{E_b}a_Q\\psi_2(t)
$$
가 되고 최종 QPSK 송신 신호는
$$
s_i(t)=x(t)+y(t)
$$
가 된다.

$b_I$와 $b_Q$의 조합이 변하면 I/Q 성분의 부호가 변하므로 QPSK 송신신호의 위상도 네 가지 가능한 위상 중 하나로 변한다.

- $(b_I,b_Q)=(0,0)$ → $\\phi=-3\\pi/4$
- $(b_I,b_Q)=(0,1)$ → $\\phi=3\\pi/4$
- $(b_I,b_Q)=(1,0)$ → $\\phi=-\\pi/4$
- $(b_I,b_Q)=(1,1)$ → $\\phi=\\pi/4$

따라서 실행 결과의 QPSK 파형에서는 심벌 경계에서 데이터 비트 조합에 따라 반송파의 위상이 달라지는 것을 확인할 수 있다.`,
},
    { // 문제 2.C
  "id": "22-2C",
  "title": "2.C.",
  "type": "essay",
  "prompt": `[[equation:22.3]]의 $x(t)$, $y(t)$, $s_i(t)$의 신호 대역폭을 비교하시오. (실험으로 측정하지 않고 자신의 판단으로 답할 것.)

QPSK 송신신호 $s_i(t)$에서는 서로 직교하는 I 채널과 Q 채널을 통해 한 심벌 구간 동안 두 비트 $b_I$, $b_Q$를 동시에 전송한다. 따라서 $s_i(t)$의 비트 전송률은 $x(t)$ 또는 $y(t)$ 하나만 사용하는 경우에 비해 두 배가 된다. 그럼에도 불구하고 $s_i(t)$의 전송에 필요한 대역폭이 $x(t)$ 또는 $y(t)$의 두 배가 되지 않는 이유를 설명하시오.`,
referenceAnswer: `$x(t)$와 $y(t)$는 서로 직교하는 cosine 및 sine 반송파를 이용하지만 동일한 반송 주파수 $f_c$를 사용한다. 따라서 두 신호는 서로 다른 주파수 대역을 차지하는 것이 아니라 같은 주파수 대역을 공유한다.

최종 QPSK 신호
$$
s_i(t)=x(t)+y(t)
$$
의 대역폭은 $x(t)$ 또는 $y(t)$의 대역폭과 본질적으로 동일하다.

한 심벌 구간 동안 $x(t)$는 $b_I$ 한 비트를, $y(t)$는 $b_Q$ 한 비트를 전송하므로 QPSK는 동일한 심벌 주기 동안 총 2비트를 전송한다. 따라서 비트 전송률은 하나의 BPSK 채널보다 두 배가 된다.

그러나 I 채널과 Q 채널은 서로 직교하므로 동일한 주파수 대역 안에서 서로 간섭하지 않고 동시에 정보를 전송할 수 있다. 따라서 비트 전송률이 두 배가 되더라도 필요한 대역폭이 두 배로 증가하지 않는다.`,
},
    { // 문제 2.D
  "id": "22-2D",
  "title": "2.D.",
  "type": "python",
  "starterCode": `import numpy as np

def qpsk_tx(bI, bQ, Eb=16, Ts=1, L=256, fc=30):
    """
    QPSK 송신기

    Parameters
    ----------
    bI : I 채널 binary data
    bQ : Q 채널 binary data
    Eb : bit energy
    Ts : QPSK symbol duration
    L  : samples per symbol
    fc : carrier frequency

    Returns
    -------
    t          : 시간축
    I_baseband : I 채널 bipolar 기저대역 신호
    Q_baseband : Q 채널 bipolar 기저대역 신호
    x          : I 채널 BPSK 통과대역 신호
    y          : Q 채널 BPSK 통과대역 신호
    tx_signal  : QPSK 송신신호
    """

    # 두 채널의 비트 수가 같은지 확인
    if len(bI) != len(bQ):
        raise ValueError("bI와 bQ의 길이는 같아야 합니다.")

    t_step = Ts / L

    # Unipolar -> bipolar
    aI = ??
    aQ = ??

    # 심벌을 sample 단위로 확장
    I_baseband = ??
    Q_baseband = ??

    # 시간축
    t = np.arange(len(bI) * L) * t_step

    # 직교 기저 신호
    psi1 = ??
    psi2 = ??

    # I/Q 채널 BPSK 신호
    x = ??
    y = ??

    # QPSK 송신신호
    tx_signal = ??

    return t, I_baseband, Q_baseband, x, y, tx_signal`,
  "prompt": `문제 2.A~2.B에서 단계적으로 구현한 QPSK 송신기를 하나의 재사용 가능한 \`qpsk_tx()\` 함수로 구성하자.

빈칸을 채워 함수를 완성하시오.

함수에서는 다음 과정이 순서대로 수행되어야 한다.

1. $b_I$, $b_Q$의 unipolar binary data를 bipolar 데이터로 변환
2. 각 심벌을 $L$개의 sample로 확장
3. 서로 직교하는 기저신호 $\\psi_1(t)$와 $\\psi_2(t)$ 생성
4. I/Q 채널의 BPSK 신호 $x(t)$와 $y(t)$ 생성
5. 두 신호를 더하여 최종 QPSK 송신신호 $s_i(t)$ 생성

완성한 \`qpsk_tx()\` 함수는 이후 QPSK 수신기 및 BER 실험에서 계속 사용한다.`,
referenceAnswer: `\`\`\`python
import numpy as np

def qpsk_tx(bI, bQ, Eb=16, Ts=1, L=256, fc=30):
    """
    QPSK 송신기
    """

    if len(bI) != len(bQ):
        raise ValueError("bI와 bQ의 길이는 같아야 합니다.")

    t_step = Ts / L

    # Unipolar -> bipolar
    # 0 -> -1, 1 -> +1
    aI = 2 * bI - 1
    aQ = 2 * bQ - 1

    # 심벌을 sample 단위로 확장
    I_baseband = np.repeat(aI, L)
    Q_baseband = np.repeat(aQ, L)

    # 시간축
    t = np.arange(len(bI) * L) * t_step

    # 직교 기저 신호
    psi1 = np.sqrt(2 / Ts) * np.cos(2 * np.pi * fc * t)
    psi2 = np.sqrt(2 / Ts) * np.sin(2 * np.pi * fc * t)

    # I/Q 채널 BPSK 신호
    x = np.sqrt(Eb) * I_baseband * psi1
    y = np.sqrt(Eb) * Q_baseband * psi2

    # QPSK 송신신호
    tx_signal = x + y

    return t, I_baseband, Q_baseband, x, y, tx_signal
\`\`\`

완성된 함수는 $b_I$와 $b_Q$를 각각 bipolar 데이터로 변환한 후, 서로 직교하는 기저신호 $\\psi_1(t)$와 $\\psi_2(t)$를 이용하여 두 BPSK 신호 $x(t)$와 $y(t)$를 생성한다.

마지막으로
$$
s_i(t)=x(t)+y(t)
$$
를 계산하여 최종 QPSK 송신신호를 반환한다.`,
},
  ]
},
    { // 문제 3
  "id": "22-3",
  "title": "3. QPSK 수신기 설계",
  "problems": [
    { // 문제 3.A
      "id": "22-3A",
      "title": "3.A.",
      "prompt": `문제 2에서 생성한 QPSK 송신신호 $s_i(t)$로부터 I 채널의 데이터 $b_I$와 Q 채널의 데이터 $b_Q$를 복조하는 QPSK 수신기를 구현해 보자.

QPSK 신호는 서로 직교하는 두 기저신호 $\\psi_1(t)$와 $\\psi_2(t)$를 이용하여 두 개의 BPSK 신호를 동시에 전송한 것으로 해석할 수 있다. 따라서 수신기에서도 두 개의 상관기를 병렬로 사용하여 I 채널과 Q 채널을 각각 검출할 수 있다.
[[image:/images/ch22/figure22_2.png|그림 22.2 수신기의 In-phase 상관 회로|75]]
수신기에서는 송신기와 동일한 기저신호를 생성한다.
$$
\\psi_1(t)=\\sqrt{\\frac{2}{T_s}}\\cos(2\\pi f_ct)
$$
$$
\\psi_2(t)=\\sqrt{\\frac{2}{T_s}}\\sin(2\\pi f_ct)
$$
수신신호를 각각의 기저신호와 곱한 뒤 한 심벌 구간 $T_s$ 동안 적분하여 I/Q 채널의 상관값을 계산한다.

아래 Python 코드는 [그림 22.2]의 상관기 기반 QPSK 수신기를 구현한 기본 코드이다.
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

# QPSK 시스템 파라미터
Ts = 1
L = 256
t_step = Ts / L

Eb = 16
fc = 30
Ns = 20

# I/Q binary data 생성
seed_I = XX # XX는 학번 끝 2자리

rng_I = np.random.default_rng(seed_I)
rng_Q = np.random.default_rng(seed_I + 1)

bI = rng_I.integers(0, 2, Ns)
bQ = rng_Q.integers(0, 2, Ns)

# 문제 2.D에서 작성한 QPSK 송신기 사용
t, I_baseband, Q_baseband, x, y, tx_signal = qpsk_tx(
    bI, bQ, Eb=Eb, Ts=Ts, L=L, fc=fc
)

# 노이즈가 없는 수신신호
r = tx_signal

# 수신기의 직교 기저신호
psi1_rx = np.sqrt(2 / Ts) * np.cos(2 * np.pi * fc * t)
psi2_rx = np.sqrt(2 / Ts) * np.sin(2 * np.pi * fc * t)

# 수신신호와 각 기저신호의 곱
product_I = r * psi1_rx
product_Q = r * psi2_rx

# Integrate-and-Dump
def integrate_and_dump(u, L, t_step):
    Ns = len(u) // L

    corr = np.zeros(Ns)
    corr_hold = np.zeros_like(u, dtype=float)

    for k in range(Ns):
        start = k * L
        end = (k + 1) * L

        # 한 심벌 구간의 상관값 계산
        corr[k] = np.sum(u[start:end])

        # 계산된 결과는 다음 심벌 구간 동안 출력
        if k < Ns - 1:
            corr_hold[(k + 1) * L:(k + 2) * L] = corr[k]

    return corr, corr_hold

# I/Q 채널 상관값
corr_I, corr_I_hold = integrate_and_dump(
    product_I, L, t_step
)

corr_Q, corr_Q_hold = integrate_and_dump(
    product_Q, L, t_step
)
\`\`\`
위 코드에서는 한 QPSK 심벌을 구성하는 $L=256$개의 sample을 한 구간으로 묶어 상관값을 계산한다. 한 구간의 계산이 끝난 후 얻어진 상관값은 다음 심벌 구간 동안 출력되는 형태로 구현하였다.`,
    },
    {
      "id": "22-3A1",
      "title": "3.A1.",
      "type": "essay",
      "prompt": `위 코드의 \`integrate_and_dump()\` 함수는 입력신호를 $L$개의 sample 단위로 나누고, 각 구간의 sample 값을 이용하여 하나의 상관값을 계산한다.

본 실습에서 Integrate-and-Dump의 한 integration period를 $L=256$ samples로 설정해야 하는 이유를 설명하시오.`,
      referenceAnswer: `Integrate-and-Dump의 한 integration period를 L=256 samples로 설정해야 하는 이유는, 한 QPSK 심벌의 길이가 T_s=1 sec이고 이를 샘플 단위로 표현할 때 한 심벌이 정확히 256개의 sample로 구성되기 때문이다.

즉, 수신기에서는 한 심벌 구간 전체에 대해
\\[
\\int_0^{T_s} r(t)\\psi_1(t)dt, \\qquad \\int_0^{T_s} r(t)\\psi_2(t)dt
\\]
에 대응하는 상관 연산을 수행해야 한다. 본 Python 구현에서는 원래 Integrate-and-Dump의 동작과 동일하게 한 심벌에 해당하는 256개의 sample 값을 모두 합산하여 상관값을 계산한다.

만약 integration period가 256보다 작으면 한 심벌의 일부만 누적하게 되고, 256보다 크면 서로 다른 심벌 구간이 섞이게 되어 올바른 상관값을 얻을 수 없다. 따라서 한 integration period는 반드시 한 심벌 구간과 정확히 일치하는 L=256 samples가 되어야 한다.`
    },
    {
      "id": "22-3A2",
      "title": "3.A2.",
      "type": "python",
      "starterCode": `# 문제 3.A의 코드를 먼저 실행한 후 아래 코드를 실행한다.

print("I-channel correlation values:")
print(corr_I)

print("\\nQ-channel correlation values:")
print(corr_Q)

print("\\nNumber of I correlation values =", len(corr_I))
print("Number of Q correlation values =", len(corr_Q))`,
      "prompt": `문제 3.A의 Python 코드를 실행한 후 I 채널과 Q 채널에서 계산된 상관값을 확인하시오.

20개의 QPSK 심벌을 전송했을 때 각 채널에서 몇 개의 상관값이 계산되는지 확인하고 그 이유를 설명하시오.`,
      responseEnabled: true,
      referenceAnswer: `20개의 QPSK 심벌을 전송하면 I 채널에서 20개의 상관값, Q 채널에서도 20개의 상관값이 계산된다.

그 이유는 Integrate-and-Dump가 입력신호를 한 심벌 길이에 해당하는 L=256 sample씩 나누어 처리하기 때문이다. 전체 신호는 20개의 심벌로 이루어져 있으므로, 각 심벌 구간마다 하나의 상관값이 계산되어 각 채널에서 총 20개의 상관값이 나온다.

즉,
- QPSK 심벌 수 = 20
- 심벌당 상관값 수 = 1
이므로 각 채널의 상관값 개수는 20개이다.`
    },
    {
      "id": "22-3A3",
      "title": "3.A3.",
      "type": "essay",
      "prompt": `문제 3.A의 수신기 코드에서 다음 파라미터의 설정값을 쓰고, 송신기와 같은 값을 사용해야 하는 이유를 설명하시오.

1. 수신기 기저신호 $\\psi_1(t)$의 진폭
2. 수신기 기저신호 $\\psi_1(t)$의 주파수
3. 수신기 기저신호 $\\psi_2(t)$의 진폭
4. 수신기 기저신호 $\\psi_2(t)$의 주파수
5. Integrate-and-Dump의 integration period $L$

특히 송신기와 수신기의 반송 주파수 및 기저신호가 일치해야 하는 이유를 설명하시오.`,
      referenceAnswer: `수신기 코드에서 사용한 파라미터의 설정값은 다음과 같다.

1. 수신기 기저신호 \\(\\psi_1(t)\\)의 진폭: \\(\\sqrt{2/T_s}=\\sqrt{2}\\)
2. 수신기 기저신호 \\(\\psi_1(t)\\)의 주파수: \\(f_c=30\\) Hz
3. 수신기 기저신호 \\(\\psi_2(t)\\)의 진폭: \\(\\sqrt{2/T_s}=\\sqrt{2}\\)
4. 수신기 기저신호 \\(\\psi_2(t)\\)의 주파수: \\(f_c=30\\) Hz
5. Integrate-and-Dump의 integration period: \\(L=256\\)

송신기와 수신기에서 같은 값을 사용해야 하는 이유는, 수신기의 상관기가 송신기에서 사용한 기저신호와 정확히 같은 기준함수에 대해 내적을 계산해야 하기 때문이다.

특히 반송 주파수가 다르면 수신기에서 곱하는 기저신호가 송신 신호와 정확히 일치하지 않으므로, 원하는 I/Q 성분이 제대로 추출되지 않는다. 또한 기저신호의 진폭이나 형태가 다르면 상관값의 크기가 달라지거나 직교성이 깨질 수 있다.

integration period 역시 한 심벌 길이와 정확히 같아야 한다. 그래야 한 심벌 구간의 에너지를 정확히 누적하여 해당 심벌의 판별변수를 얻을 수 있다. 따라서 송신기와 수신기의 반송 주파수, 기저신호, 심벌 구간 길이는 서로 일치해야 한다.`
    },
    { // 문제 3.B
      "id": "22-3B",
      "title": "3.B.",
      "prompt": `Integrate-and-Dump의 동작을 직접 확인해 보자.

I 채널에서 수신신호와 기저신호를 곱한 결과인 \`product_I\`가 Integrate-and-Dump의 입력이며, \`corr_I_hold\`는 각 심벌 구간의 상관값을 계산한 후 다음 심벌 구간 동안 유지한 출력이다.

20심벌 동안 두 파형을 시간영역에서 비교한다.`,
    },
    {
      "id": "22-3B1",
      "title": "3.B1.",
      "type": "python",
      "starterCode": `# 문제 3.A의 코드를 먼저 실행한 후 아래 코드를 추가한다.

plt.figure(figsize=(11, 6))

plt.subplot(2, 1, 1)
plt.plot(t, product_I)
plt.ylabel('Input')
plt.title('I-channel Correlator Input')
plt.grid()

plt.subplot(2, 1, 2)
plt.step(t, corr_I_hold, where='post')
plt.xlabel('Time (s)')
plt.ylabel('Output')
plt.title('I-channel Integrate-and-Dump Output')
plt.grid()

plt.tight_layout()
plt.show()`,
      "prompt": `위 코드를 실행하여 I 채널 Integrate-and-Dump의 입력과 출력을 20 sec 동안 관찰하시오.

입력은 심벌 구간 내부에서도 빠르게 변화하지만, 출력은 각 심벌의 상관값 계산이 완료된 후 다음 심벌 구간 동안 일정하게 유지되는지 확인하시오.`,
      responseEnabled: true,
      referenceAnswer: `코드를 실행하면 I 채널 상관기의 입력인 \`product_I\`는 심벌 구간 내부에서도 빠르게 진동하는 파형으로 나타나고, Integrate-and-Dump 출력인 \`corr_I_hold\`는 각 심벌 구간에 대한 적분이 끝난 후 하나의 일정한 값으로 유지되는 계단형 파형으로 나타난다.

즉, \`product_I\`는 시간에 따라 빠르게 변하지만, \`corr_I_hold\`는 한 심벌마다 하나의 상관값만을 나타낸다.

또한 현재 구현에서는 한 심벌 구간의 상관값을 계산한 뒤 그 값을 다음 심벌 구간 동안 출력하도록 하였으므로, \`corr_I_hold\`의 값 변화는 원래 심벌 경계보다 한 심벌 늦게 나타난다.

따라서 그래프를 통해 Integrate-and-Dump가 한 심벌 구간의 입력을 누적하여 하나의 판별값으로 만들고, 그 결과를 다음 심벌 구간 동안 유지하는 동작을 확인할 수 있다.`
    },
    {
      "id": "22-3B2",
      "title": "3.B2.",
      "type": "essay",
      "prompt": `문제 3.B1의 결과를 바탕으로 Integrate-and-Dump가 실제로 어떤 동작을 수행하는지 설명하시오.

신호의 정확한 크기보다는 입력과 출력의 전체적인 파형 모양 및 출력값이 바뀌는 시점에 집중하여 설명하시오.`,
      referenceAnswer: `Integrate-and-Dump는 입력신호를 한 심벌 구간 동안 누적(적분)하여 하나의 상관값으로 바꾸는 동작을 수행한다.

문제 3.B1의 결과를 보면 입력인 product_I는 심벌 구간 내부에서도 연속적으로 진동하며 빠르게 변한다. 반면 출력인 corr_I_hold는 각 심벌 구간에 대한 적분이 끝난 뒤 하나의 값으로 결정되고, 그 값이 다음 심벌 구간 동안 일정하게 유지된다.

즉, Integrate-and-Dump는
1. 한 심벌 구간의 sample들을 모두 모아 더하고,
2. 그 결과를 해당 심벌의 상관값으로 만든 뒤,
3. 다음 심벌 구간 동안 그 값을 유지하여 출력하는 역할을 한다.

따라서 입력의 세부적인 진동을 그대로 출력하는 것이 아니라, 한 심벌마다 하나의 대표값(판별변수)으로 압축하여 출력하는 장치라고 볼 수 있다.`
    },
    { // 문제 3.C
      "id": "22-3C",
      "title": "3.C.",
      "type": "python",
      "starterCode": `# I 채널의 상관값으로 binary data 판정
#
# 문제 2에서 사용한 mapping:
# bit 0 -> -1
# bit 1 -> +1

bI_hat = (corr_I ?? 0).astype(int)

print("Original bI :", bI)
print("Detected bI :", bI_hat)`,
      "prompt": `I 채널의 상관값을 이용하여 binary data를 판정하자.

문제 2에서는
$$
0\\rightarrow -1,\\qquad 1\\rightarrow +1
$$
의 bipolar mapping을 사용하였다.

따라서 상관값의 부호를 이용하여 원래 비트를 판별할 수 있다.

\`??\`에 알맞은 비교 연산자를 입력하여 \`bI_hat\`을 완성하고, 상관값의 기준을 0으로 설정할 수 있는 이유를 설명하시오.`,
      responseEnabled: true,
      referenceAnswer: `비교 연산자에는 '>'가 들어가야 한다. 따라서 완성된 코드는 다음과 같다.

\`\`\`python
bI_hat = (corr_I > 0).astype(int)
\`\`\`

문제 2에서 사용한 bipolar mapping은
\\[
0 \\rightarrow -1, \\qquad 1 \\rightarrow +1
\\]
이므로, I 채널의 상관값이 양수이면 원래 비트는 1이고, 음수이면 원래 비트는 0이라고 판정할 수 있다.

상관값의 기준을 0으로 설정할 수 있는 이유는, 노이즈가 없는 경우 상관기 출력이 서로 부호가 반대인 두 값으로 나타나기 때문이다. 현재 Integrate-and-Dump는 256개의 sample을 그대로 합산하므로 $E_b=16$, $L=256$에서 이상적인 상관값의 크기는 약 1024가 되어 $+1024$ 또는 $-1024$로 나타난다. 두 경우의 경계는 0이므로, 상관값이 0보다 크면 1, 0보다 작으면 0으로 판정하면 된다.`
    },
    { // 문제 3.D
      "id": "22-3D",
      "title": "3.D.",
      "prompt": `I 채널의 원래 binary data $b_I$와 수신기에서 검출한 binary data $\\hat b_I$의 시간영역 파형을 비교해 보자.

Integrate-and-Dump에서는 한 심벌 구간의 sample이 모두 입력된 후에야 해당 심벌의 상관값을 얻을 수 있다. 따라서 계산된 검출 결과는 다음 심벌 구간에서 출력되는 것으로 표현한다.`,
    },
    {
      "id": "22-3D1",
      "title": "3.D1.",
      "type": "python",
      "starterCode": `# 원래 I 채널 데이터 파형
bI_wave = np.repeat(bI, L)

# 검출된 데이터는 한 심벌 뒤에 출력
bI_hat_wave = np.zeros(Ns * L, dtype=int)
bI_hat_wave[L:] = np.repeat(bI_hat[:-1], L)

plt.figure(figsize=(11, 5))

plt.step(t, bI_wave, where='post', label='$b_I$')
plt.step(t, bI_hat_wave, where='post',
         linestyle='--', label='$\\\\hat{b}_I$')

plt.xlabel('Time (s)')
plt.ylabel('Bit')
plt.yticks([0, 1])
plt.title('Original and Detected I-channel Bits')
plt.legend()
plt.grid()
plt.show()`,
      "prompt": `위 코드를 실행하여 송신한 I 채널 binary data $b_I$와 수신단에서 검출한 $\\hat b_I$의 파형을 비교하시오.

두 파형의 데이터 패턴이 동일하지만 시간축에서 한 심벌만큼 이동되어 있는지 확인하시오.`,
      responseEnabled: true,
      referenceAnswer: `코드를 실행하면 송신한 I 채널 데이터 $b_I$와 수신단에서 검출한 데이터 $\\hat b_I$의 비트 패턴이 동일하게 나타난다.

다만 \`bI_hat_wave\`는 검출된 데이터를 한 심벌 뒤에 출력하도록 구성했기 때문에, $\\hat b_I$ 파형은 원래 $b_I$ 파형보다 정확히 한 심벌 주기
$$
T_s=1\\text{ sec}
$$
만큼 지연되어 나타난다.

즉, 두 파형은 시간축에서 한 심벌만큼 이동되어 있을 뿐, 대응하는 비트 값은 동일하다.

노이즈가 없는 경우에는 상관값의 부호를 이용한 판정이 정확하게 이루어지므로, 한 심벌의 지연을 고려하면 송신한 $b_I$와 검출한 $\\hat b_I$가 모두 일치한다.`
    },
    {
      "id": "22-3D2",
      "title": "3.D2.",
      "type": "essay",
      "prompt": `문제 3.D1에서 원래 I 채널의 binary data $b_I$와 검출된 데이터 $\\hat b_I$ 사이에 $T_s=1$ sec의 시간차가 나타나는 이유를 Integrate-and-Dump의 동작과 관련하여 설명하시오.`,
      referenceAnswer: `원래 I 채널 데이터 \\(b_I\\)와 검출된 데이터 \\(\\hat b_I\\) 사이에 \\(T_s=1\\) sec의 시간차가 나타나는 이유는 Integrate-and-Dump가 한 심벌 구간의 모든 sample을 다 받은 후에야 그 심벌에 대한 상관값을 계산할 수 있기 때문이다.

즉, 첫 번째 심벌의 판별값은 첫 번째 심벌 구간이 끝난 뒤에야 얻어진다. 따라서 이 값을 시간영역 파형으로 나타내면, 계산된 결과는 다음 심벌 구간에서 출력되는 형태가 된다.

결국 Integrate-and-Dump는 한 심벌을 관찰하여 그 심벌의 판별변수를 만든 뒤, 그 결과를 다음 구간에 보여주므로 출력 파형은 입력 데이터 파형보다 정확히 한 심벌 주기만큼 지연되어 보이게 된다.`
    },
    { // 문제 3.E
      "id": "22-3E",
      "title": "3.E.",
      "type": "python",
      "starterCode": `# Q 채널 binary data 검출
bQ_hat = (corr_Q > 0).astype(int)

# 원래 Q 채널 데이터 파형
bQ_wave = np.repeat(bQ, L)

# 검출된 데이터는 한 심벌 뒤에 출력
bQ_hat_wave = np.zeros(Ns * L, dtype=int)
bQ_hat_wave[L:] = np.repeat(bQ_hat[:-1], L)

plt.figure(figsize=(11, 5))

plt.step(t, bQ_wave, where='post', label='$b_Q$')
plt.step(t, bQ_hat_wave, where='post',
         linestyle='--', label='$\\\\hat{b}_Q$')

plt.xlabel('Time (s)')
plt.ylabel('Bit')
plt.yticks([0, 1])
plt.title('Original and Detected Q-channel Bits')
plt.legend()
plt.grid()
plt.show()`,
      "prompt": `Q 채널에 대해서도 상관값 \`corr_Q\`를 이용하여 binary data를 검출하시오.

실행 결과에서 송신한 Q 채널 binary data $b_Q$와 수신단에서 검출한 $\\hat b_Q$의 데이터 패턴이 같은지 확인하고, I 채널과 마찬가지로 한 심벌 주기의 시간차가 나타나는지 확인하시오.`,
      responseEnabled: true,
      referenceAnswer: `Q 채널에서도 I 채널과 동일한 원리로 binary data를 검출할 수 있다. 문제 2에서
\\[
0 \\rightarrow -1, \\qquad 1 \\rightarrow +1
\\]
의 mapping을 사용하였으므로, Q 채널의 상관값이 양수이면 원래 비트는 1, 음수이면 0이다. 따라서

\`\`\`python
bQ_hat = (corr_Q > 0).astype(int)
\`\`\`

와 같이 판정할 수 있다.

실행 결과를 보면 송신한 Q 채널 binary data \\(b_Q\\)와 수신단에서 검출한 \\(\\hat b_Q\\)는 데이터 패턴이 동일하게 나타난다. 또한 I 채널의 경우와 마찬가지로, Integrate-and-Dump가 한 심벌 구간의 적분을 끝낸 뒤에 결과를 출력하므로, \\(\\hat b_Q\\) 역시 \\(b_Q\\)에 비해 한 심벌 주기만큼 지연되어 나타난다.`
    },
    { // 문제 3.F
      "id": "22-3F",
      "title": "3.F.",
      "prompt": `노이즈가 없는 경우, 수신된 QPSK 심벌이 가질 수 있는 모든 가능한 I/Q 상관값을 2차원 벡터 공간에 나타낸 도면을 constellation이라 한다.

I 채널의 상관값을 x축, Q 채널의 상관값을 y축으로 두어 수신 QPSK 심벌의 constellation diagram을 관찰해 보자.
[[image:/images/ch22/figure22_3.png|그림 22.3 Scatter plot 입력 블록도|75]]`,
    },
    {
      "id": "22-3F1",
      "title": "3.F1.",
      "type": "python",
      "starterCode": `# Constellation 관찰을 위한 QPSK 심벌 생성
Ns_const = 2000

seed_I = XX
seed_Q = seed_I + 1

rng_I = np.random.default_rng(seed_I)
rng_Q = np.random.default_rng(seed_Q)

bI_const = rng_I.integers(0, 2, Ns_const)
bQ_const = rng_Q.integers(0, 2, Ns_const)

t_const, _, _, _, _, tx_const = qpsk_tx(
    bI_const, bQ_const,
    Eb=16, Ts=1, L=256, fc=30
)

# 수신기 기저신호
psi1_const = np.sqrt(2) * np.cos(
    2 * np.pi * 30 * t_const
)

psi2_const = np.sqrt(2) * np.sin(
    2 * np.pi * 30 * t_const
)

# 상관기 입력
product_I_const = tx_const * psi1_const
product_Q_const = tx_const * psi2_const

# I/Q 상관값 계산
corr_I_const, _ = integrate_and_dump(
    product_I_const, 256, 1/256
)

corr_Q_const, _ = integrate_and_dump(
    product_Q_const, 256, 1/256
)

print("Number of QPSK symbols =", Ns_const)
print("Number of constellation points =", len(corr_I_const))`,
      "prompt": `QPSK 심벌 2000개를 생성한 후 각 심벌에 대한 I 채널과 Q 채널의 상관값을 계산하시오.

각 QPSK 심벌마다 I/Q 상관값이 하나씩 계산되므로 총 몇 개의 constellation 좌표가 만들어지는지 확인하시오.`,
      responseEnabled: true,
      referenceAnswer: `QPSK 심벌 2000개를 생성하면, 각 심벌마다 I 채널 상관값 1개와 Q 채널 상관값 1개가 계산된다. 따라서 총 2000개의 constellation 좌표가 만들어진다.

그 이유는 constellation의 한 점이 하나의 QPSK 심벌에 대응하기 때문이다. 각 심벌에 대해
- x좌표: I 채널 상관값
- y좌표: Q 채널 상관값
이 하나씩 계산되므로, 심벌 수와 constellation 점의 개수는 동일하다.

즉,
- QPSK 심벌 수 = 2000
- constellation 좌표 수 = 2000
이다.`
    },
    {
      "id": "22-3F2",
      "title": "3.F2.",
      "type": "python",
      "starterCode": `# 마지막 1000개의 수신 심벌을 표시
symbols_to_display = 1000

I_display = corr_I_const[-symbols_to_display:]
Q_display = corr_Q_const[-symbols_to_display:]

plt.figure(figsize=(7, 7))

plt.scatter(I_display, Q_display, alpha=0.35)

plt.axhline(0)
plt.axvline(0)

plt.xlabel('I-channel correlation')
plt.ylabel('Q-channel correlation')
plt.title('QPSK Constellation Diagram')

plt.grid()
plt.axis('equal')
plt.show()`,
      "prompt": `계산된 수신 심벌 중 마지막 1000개의 I/Q 상관값을 이용하여 constellation diagram을 출력하시오.

노이즈가 없는 경우 constellation에서 몇 개의 신호점이 나타나는지 확인하고, 각 점의 위치가 문제 1에서 구한 QPSK 신호의 2차원 좌표와 어떤 관계가 있는지 설명하시오.`,
      responseEnabled: true,
      referenceAnswer: `노이즈가 없는 경우 constellation diagram에서는 4개의 신호점이 나타난다.

그 이유는 QPSK가 두 비트 \\((b_I, b_Q)\\)를 한 심벌로 전송하므로 가능한 심벌 조합이
\\[
(0,0), (0,1), (1,0), (1,1)
\\]
의 4가지이기 때문이다.

문제 2의 bipolar mapping
\[
0 \rightarrow -1, \qquad 1 \rightarrow +1
\]
을 사용하면 I 채널과 Q 채널의 상관값은 각각 양수 또는 음수의 두 값 중 하나가 된다.

본 Python 실습의 Integrate-and-Dump는 한 심벌 구간의 256개 sample을 그대로 합산한다. 따라서 \(E_b=16\), \(L=256\)일 때 각 축의 상관값 크기는
\[
\sqrt{E_b}\,L=4\times256=1024
\]
가 되어 constellation의 4개 점은 대략 다음 좌표에 위치한다.
\[
(1024,1024), \quad (1024,-1024), \quad (-1024,1024), \quad (-1024,-1024)
\]

이는 원래 Integrate-and-Dump 출력과 같은 스케일이다. 만약 합산 결과에 $t_{step}=1/256$을 곱해 연속시간 적분값으로 정규화하면 좌표는 $(\pm4,\pm4)$가 된다.

따라서 문제 1에서 구한 QPSK 신호공간과 동일하게 네 개의 사분면에 하나씩 신호점이 나타나며, 차이는 Integrate-and-Dump 출력의 스케일에 있다. 또한 본 Python 실습에서는 $0\rightarrow -1$, $1\rightarrow +1$의 bipolar convention을 사용하므로 각 좌표에 대응되는 비트 라벨은 [[equation:22.4]]의 convention과 반대로 배치된다.`
    },
  ]
},
    { // 문제 4
  "id": "22-4",
  "title": "4. SNR 설정, Constellation, 위상 및 주파수 오차",
  "problems": [
    {
      "id": "22-4A",
      "title": "4.A.",
      "type": "proof",
      "prompt": `문제 3에서는 노이즈가 없는 QPSK 수신신호의 constellation을 관찰하였다.
[[image:/images/ch22/figure22_4.png|그림 22.4 QPSK 송신기 출력에 노이즈 인가|75]]
이제 QPSK 송신신호 $s_i(t)$에 평균이 0인 AWGN $n(t)$를 더하여 다음과 같은 수신신호를 생성한다.
$$
r(t)=s_i(t)+n(t)
$$
본 실습에서 비트 에너지는 $E_b=16$, 샘플 간격은 $t_{step}=\\frac{1}{256}$이다.

$E_b/N_0=13$ dB일 때 Python에서 생성해야 하는 AWGN sample의 분산 $v_n$을 다음 순서에 따라 계산하시오.

1. $E_b/N_0$를 dB scale에서 linear scale로 변환
2. $E_b/N_0$와 $E_b=16$으로부터 $N_0$ 계산
3. 다음 식을 이용하여 noise sample의 분산 계산
$$
v_n=\\frac{N_0}{2t_{step}}
$$
계산 과정을 모두 보이시오.`,
      referenceAnswer: `$E_b/N_0=13$ dB를 linear scale로 변환하면
$$
\\frac{E_b}{N_0}
=10^{13/10}
\\approx 19.9526
$$
이다.

$E_b=16$이므로
$$
N_0
=\\frac{E_b}{E_b/N_0}
=\\frac{16}{19.9526}
\\approx 0.8019
$$
이다.

또한
$$
t_{step}=\\frac{1}{256}
$$
이므로 noise sample의 분산은
$$
\\begin{aligned}
v_n
&=\\frac{N_0}{2t_{step}}\\\\
&=\\frac{0.8019}{2(1/256)}\\\\
&\\approx 102.64.
\\end{aligned}
$$

따라서 $E_b/N_0=13$ dB일 때 AWGN sample의 분산은 약
$$
\\boxed{v_n\\approx102.64}
$$
이다.`,
    },
    {
      "id": "22-4B",
      "title": "4.B.",
      "type": "python",
      "starterCode": `# 문제 2.D의 qpsk_tx()와
# 문제 3.A의 integrate_and_dump()를 먼저 실행한다.

import numpy as np
import matplotlib.pyplot as plt

Ts = 1
L = 256
t_step = Ts / L

Eb = 16
fc = 30

# Constellation 관찰용 QPSK 심벌 수
Ns = 2000

# -------------------------------------------------
# Binary data 생성
# -------------------------------------------------

seed_I = XX
seed_Q = seed_I + 1
seed_noise = seed_I + 2

rng_I = np.random.default_rng(seed_I)
rng_Q = np.random.default_rng(seed_Q)
rng_noise = np.random.default_rng(seed_noise)

bI = rng_I.integers(0, 2, Ns)
bQ = rng_Q.integers(0, 2, Ns)

# -------------------------------------------------
# QPSK 송신신호 생성
# -------------------------------------------------

t, _, _, _, _, tx_signal = qpsk_tx(
    bI, bQ,
    Eb=Eb, Ts=Ts, L=L, fc=fc
)

# -------------------------------------------------
# AWGN 분산 계산 함수
# -------------------------------------------------

def noise_variance(EbN0dB, Eb, t_step):
    EbN0 = 10 ** (EbN0dB / 10)
    N0 = Eb / EbN0
    v_n = N0 / (2 * t_step)

    return EbN0, N0, v_n


# -------------------------------------------------
# QPSK 상관 수신기
# -------------------------------------------------

def qpsk_correlator(
    r, t,
    Ts=1, L=256, fc=30,
    phase_error=0
):
    psi1_rx = np.sqrt(2 / Ts) * np.cos(
        2 * np.pi * fc * t + phase_error
    )

    psi2_rx = np.sqrt(2 / Ts) * np.sin(
        2 * np.pi * fc * t + phase_error
    )

    product_I = r * psi1_rx
    product_Q = r * psi2_rx

    corr_I, _ = integrate_and_dump(
        product_I, L, Ts / L
    )

    corr_Q, _ = integrate_and_dump(
        product_Q, L, Ts / L
    )

    return corr_I, corr_Q


# -------------------------------------------------
# Eb/N0 = 13 dB
# -------------------------------------------------

EbN0dB = 13

EbN0, N0, v_n = noise_variance(
    EbN0dB, Eb, t_step
)

print("Eb/N0 =", EbN0)
print("N0 =", N0)
print("Noise variance =", v_n)

# 표준정규분포 noise를 원하는 분산으로 scaling
z_noise = rng_noise.standard_normal(
    len(tx_signal)
)

n_samples = np.sqrt(v_n) * z_noise

# AWGN 채널 출력
r = tx_signal + n_samples

# I/Q 상관값
corr_I, corr_Q = qpsk_correlator(
    r, t,
    Ts=Ts, L=L, fc=fc
)

# 마지막 1000개 symbol 표시
symbols_to_display = 1000

plt.figure(figsize=(7, 7))

plt.scatter(
    corr_I[-symbols_to_display:],
    corr_Q[-symbols_to_display:],
    alpha=0.35
)

plt.axhline(0)
plt.axvline(0)

plt.xlabel('In-phase Amplitude')
plt.ylabel('Quadrature Amplitude')
plt.title('QPSK Constellation: Eb/N0 = 13 dB')

plt.grid()
plt.axis('equal')
plt.show()`,
      "prompt": `문제 4.A에서 계산한 $E_b/N_0=13$ dB의 noise variance를 이용하여 QPSK 송신신호에 AWGN을 더하고 constellation diagram을 출력하시오.

노이즈가 없는 문제 3.F의 constellation과 비교하여, 네 개의 이상적인 신호점 주위로 수신 심벌들이 분산되어 나타나는지 확인하시오.`,
      responseEnabled: true,
      referenceAnswer: `$E_b/N_0=13$ dB에서 계산된 noise variance는
$$
v_n\\approx102.64
$$
이다.

따라서 Python에서는 평균이 0이고 분산이 $v_n$인 Gaussian noise를 생성하여
$$
r(t)=s_i(t)+n(t)
$$
와 같이 QPSK 송신신호에 더한다.

실행 결과 constellation은 노이즈가 없을 때의 네 이상적인 신호점
$$
(\\pm1024,\\pm1024)
$$
주위에 여러 수신 심벌들이 분산된 네 개의 군집 형태로 나타난다.

노이즈가 없는 문제 3.F에서는 각 심벌이 거의 정확히 네 점에 위치하지만, AWGN이 추가되면 I/Q 상관값에 랜덤한 오차가 생기기 때문에 각 이상적인 신호점 주변으로 점들이 퍼져 나타난다.`,
    },
    {
      "id": "22-4C",
      "title": "4.C.",
      "type": "python",
      "starterCode": `# 문제 4.B의 코드를 먼저 실행한다.

EbN0dB_list = [1, 15, 30]

for EbN0dB in EbN0dB_list:

    EbN0, N0, v_n = noise_variance(
        EbN0dB, Eb, t_step
    )

    # 문제 4.B에서 생성한 동일한
    # standard normal noise를 사용하여 비교
    n_samples = np.sqrt(v_n) * z_noise

    r = tx_signal + n_samples

    corr_I, corr_Q = qpsk_correlator(
        r, t,
        Ts=Ts, L=L, fc=fc
    )

    print(
        "Eb/N0 =", EbN0dB, "dB,",
        "variance =", v_n
    )

    plt.figure(figsize=(7, 7))

    plt.scatter(
        corr_I[-1000:],
        corr_Q[-1000:],
        alpha=0.35
    )

    plt.axhline(0)
    plt.axvline(0)

    plt.xlabel('In-phase Amplitude')
    plt.ylabel('Quadrature Amplitude')

    plt.title(
        f'QPSK Constellation: '
        f'Eb/N0 = {EbN0dB} dB'
    )

    plt.grid()
    plt.axis('equal')
    plt.show()`,
      "prompt": `$E_b/N_0=1$, 15, 30 dB일 때 각각 noise variance를 계산하고 constellation diagram을 출력하시오.

세 결과와 문제 4.B의 13 dB 결과를 비교하여 다음을 설명하시오.

1. $E_b/N_0$가 증가할수록 noise variance는 어떻게 변하는가?
2. $E_b/N_0$가 증가할수록 constellation의 각 신호점 주위에 분포하는 점들의 범위는 어떻게 변하는가?
3. 이러한 변화가 나타나는 이유는 무엇인가?`,
      responseEnabled: true,
      referenceAnswer: `각 $E_b/N_0$에 대한 noise variance는 다음과 같다.

1. $E_b/N_0=1$ dB

$$
\\frac{E_b}{N_0}=10^{1/10}\\approx1.2589
$$

$$
N_0=\\frac{16}{1.2589}\\approx12.7093
$$

$$
v_n
=\\frac{12.7093}{2(1/256)}
\\approx1626.78
$$

2. $E_b/N_0=15$ dB

$$
\\frac{E_b}{N_0}=10^{15/10}\\approx31.6228
$$

$$
N_0=\\frac{16}{31.6228}\\approx0.5060
$$

$$
v_n
=\\frac{0.5060}{2(1/256)}
\\approx64.76
$$

3. $E_b/N_0=30$ dB

$$
\\frac{E_b}{N_0}=10^{30/10}=1000
$$

$$
N_0=\\frac{16}{1000}=0.016
$$

$$
v_n
=\\frac{0.016}{2(1/256)}
=2.048
$$

따라서 $E_b/N_0$가 증가할수록 noise variance는 감소한다.

Constellation diagram을 비교하면,

- 1 dB에서는 noise variance가 매우 크므로 각 신호점 주변의 점들이 넓게 퍼지고 서로 겹치는 영역도 나타난다.
- 13 dB와 15 dB에서는 네 개의 신호점 주위에 비교적 뚜렷한 군집이 형성된다.
- 30 dB에서는 noise variance가 매우 작아 수신 심벌들이 $(\\pm1024,\\pm1024)$ 부근에 매우 빽빽하게 모인다.

즉, $E_b/N_0$가 증가할수록 신호에 대한 noise의 상대적인 영향이 감소하기 때문에 constellation의 분포가 각 이상적인 신호점 주변으로 더욱 좁게 모인다.`,
    },
    {
      "id": "22-4D",
      "title": "4.D.",
      "prompt": `이번에는 AWGN을 제거하고 송신기와 수신기 사이에 위상오차(phase error)가 존재할 때 constellation diagram의 변화를 관찰해 보자.

수신기의 기저신호에 위상오차 $\\theta$가 존재하면

$$
\\psi_{1,R}(t)
=
\\sqrt{\\frac{2}{T_s}}
\\cos(2\\pi f_ct+\\theta)
$$

$$
\\psi_{2,R}(t)
=
\\sqrt{\\frac{2}{T_s}}
\\sin(2\\pi f_ct+\\theta)
$$

를 사용하게 된다.

본 실습에서는 송신신호에는 노이즈를 추가하지 않고 위상오차만 변화시킨다.`,
    },
    {
      "id": "22-4D1",
      "title": "4.D1.",
      "type": "python",
      "starterCode": `# AWGN이 없는 수신신호
r = tx_signal

# 수신기의 위상오차 45 degree
phase_error = np.pi / 4

corr_I_phase, corr_Q_phase = qpsk_correlator(
    r, t,
    Ts=Ts,
    L=L,
    fc=fc,
    phase_error=phase_error
)

plt.figure(figsize=(7, 7))

plt.scatter(
    corr_I_phase[-1000:],
    corr_Q_phase[-1000:],
    alpha=0.35
)

plt.axhline(0)
plt.axvline(0)

plt.xlabel('In-phase Amplitude')
plt.ylabel('Quadrature Amplitude')

plt.title(
    'QPSK Constellation: '
    'Phase Error = 45 deg'
)

plt.grid()
plt.axis('equal')
plt.show()`,
      "prompt": `AWGN을 제거한 상태에서 수신기의 $\\psi_1(t)$와 $\\psi_2(t)$에 각각 45도($\\pi/4$)의 위상오차를 추가하고 constellation diagram을 출력하시오.

위상오차가 없는 문제 3.F의 constellation과 비교하여 신호점의 위치가 어떻게 변했는지 관찰하시오.`,
      responseEnabled: true,
      referenceAnswer: `수신기에
$$
\\theta=45^\\circ=\\frac{\\pi}{4}
$$
의 위상오차를 주면 constellation의 네 신호점은 원점을 중심으로 약 $45^\\circ$ 반시계방향으로 회전한다.

위상오차가 없을 때의 신호점이
$$
(\\pm1024,\\pm1024)
$$
이므로 원점으로부터의 거리는
$$
\\sqrt{1024^2+1024^2}
=1024\\sqrt{2}
\\approx1448
$$
이다.

따라서 $45^\\circ$ 회전 후에는 네 신호점이 대략
$$
(1448,0),\\quad
(0,1448),\\quad
(-1448,0),\\quad
(0,-1448)
$$
와 같이 x축과 y축 부근에 위치한다.

즉, 위상오차에 의해 constellation 전체의 크기는 거의 변하지 않고 원점을 중심으로 회전한다.`,
    },
    {
      "id": "22-4D2",
      "title": "4.D2.",
      "type": "python",
      "starterCode": `phase_error_deg_list = [15, 30, 60]

for phase_deg in phase_error_deg_list:

    phase_error = np.deg2rad(phase_deg)

    corr_I_phase, corr_Q_phase = qpsk_correlator(
        tx_signal,
        t,
        Ts=Ts,
        L=L,
        fc=fc,
        phase_error=phase_error
    )

    plt.figure(figsize=(7, 7))

    plt.scatter(
        corr_I_phase[-1000:],
        corr_Q_phase[-1000:],
        alpha=0.35
    )

    plt.axhline(0)
    plt.axvline(0)

    plt.xlabel('In-phase Amplitude')
    plt.ylabel('Quadrature Amplitude')

    plt.title(
        f'QPSK Constellation: '
        f'Phase Error = {phase_deg} deg'
    )

    plt.grid()
    plt.axis('equal')
    plt.show()`,
      "prompt": `수신기의 위상오차를 각각 15도, 30도, 60도로 설정하여 constellation diagram을 출력하시오.

각 결과를 문제 3.F의 위상오차가 없는 constellation과 비교하고 다음을 설명하시오.

1. 위상오차가 증가할 때 constellation의 네 신호점이 어떻게 이동하는가?
2. 신호점의 회전각과 설정한 위상오차 사이에는 어떤 관계가 있는가?
3. 회전 방향은 어느 방향인가?`,
      responseEnabled: true,
      referenceAnswer: `위상오차를 각각 15도, 30도, 60도로 설정하면 constellation의 네 신호점은 원점을 중심으로 각각 약 15도, 30도, 60도만큼 반시계방향으로 회전한다.

즉,

- 위상오차 15도 → constellation이 약 15도 반시계방향 회전
- 위상오차 30도 → constellation이 약 30도 반시계방향 회전
- 위상오차 60도 → constellation이 약 60도 반시계방향 회전

한다.

따라서 constellation의 회전각은 수신기에 설정한 위상오차에 비례하며, 본 실습의 양의 위상오차에서는 신호점들이 반시계방향으로 회전한다.

위상오차만 존재하고 AWGN은 없는 경우에는 각 신호점이 퍼지는 것이 아니라 네 개의 점이 원점을 중심으로 회전한 위치에 나타난다.`,
    },
    {
      "id": "22-4E",
      "title": "4.E.",
      "prompt": `이번에는 송신기와 수신기 사이에 주파수오차(frequency error)가 존재할 때 constellation의 변화를 관찰해 보자.

수신기의 각주파수가 송신기의 각주파수와 $\\Delta\\omega$만큼 차이가 나면, 송수신기 사이의 위상차는 시간에 따라

$$
\\theta(t)=\\Delta\\omega t
$$

와 같이 계속 누적된다.

따라서 일정한 위상오차와 달리 constellation의 신호점은 한 위치에 고정되지 않고 시간에 따라 계속 회전한다.

원래 실습에서는 매우 긴 simulation을 수행하여 이러한 회전을 관찰한다. Python 온라인 실습에서는 동일한 주파수오차에 의한 위상 누적 효과를 심벌 단위로 계산하여 관찰한다.`,
    },
    {
      "id": "22-4E1",
      "title": "4.E1.",
      "type": "python",
      "starterCode": `# 주파수오차 관찰용 심벌 수
Ns_freq = 5000

rng_I_freq = np.random.default_rng(seed_I)
rng_Q_freq = np.random.default_rng(seed_I + 1)

bI_freq = rng_I_freq.integers(
    0, 2, Ns_freq
)

bQ_freq = rng_Q_freq.integers(
    0, 2, Ns_freq
)

# 0 -> -1, 1 -> +1
aI_freq = 2 * bI_freq - 1
aQ_freq = 2 * bQ_freq - 1

# Integrate-and-Dump 출력의 이상적인 크기
A = np.sqrt(Eb) * L

I0 = A * aI_freq
Q0 = A * aQ_freq

# 수신기 각주파수 오차
delta_omega = 0.00001 * np.pi

# 각 심벌을 관찰하는 시점에서 누적된 위상오차
theta = (
    delta_omega
    * (np.arange(Ns_freq) + 0.5)
    * Ts
)

# 주파수오차로 인해 constellation이 회전
I_freq = (
    I0 * np.cos(theta)
    - Q0 * np.sin(theta)
)

Q_freq = (
    I0 * np.sin(theta)
    + Q0 * np.cos(theta)
)

plt.figure(figsize=(7, 7))

plt.scatter(
    I_freq,
    Q_freq,
    s=8,
    alpha=0.3
)

plt.axhline(0)
plt.axvline(0)

plt.xlabel('In-phase Amplitude')
plt.ylabel('Quadrature Amplitude')

plt.title(
    r'Frequency Error = $0.00001\\pi$ rad/s'
)

plt.grid()
plt.axis('equal')
plt.show()`,
      "prompt": `수신기의 각주파수에

$$
\\Delta\\omega=0.00001\\pi\\;\\text{rad/s}
$$

의 오차가 존재한다고 가정하고 constellation diagram을 출력하시오.

일정한 위상오차를 적용한 문제 4.D와 달리 신호점이 한 위치에 고정되지 않고 시간에 따라 반시계방향으로 이동하는지 관찰하시오.`,
      responseEnabled: true,
      referenceAnswer: `주파수오차가
$$
\\Delta\\omega=0.00001\\pi\\text{ rad/s}
$$
이면 송수신기 사이의 위상차는 시간에 따라
$$
\\theta(t)=\\Delta\\omega t
$$
와 같이 계속 증가한다.

따라서 일정한 위상오차와 달리 constellation의 네 신호점은 특정 위치에 고정되지 않고 시간에 따라 원점을 중심으로 계속 반시계방향으로 이동한다.

본 코드에서 5000개의 심벌을 관찰하면 전체 관찰시간이 약 5000 sec이므로 누적 위상오차는
$$
\\theta
\\approx0.00001\\pi\\times5000
=0.05\\pi
$$
이고, 이는 약
$$
9^\\circ
$$
에 해당한다.

따라서 constellation에서는 각 이상적인 QPSK 신호점으로부터 반시계방향으로 조금씩 이동한 짧은 궤적이 나타난다.`,
    },
    {
      "id": "22-4E2",
      "title": "4.E2.",
      "type": "python",
      "starterCode": `delta_omega_list = [
    0.00005 * np.pi,
    0.0001 * np.pi
]

for delta_omega in delta_omega_list:

    theta = (
        delta_omega
        * (np.arange(Ns_freq) + 0.5)
        * Ts
    )

    I_freq = (
        I0 * np.cos(theta)
        - Q0 * np.sin(theta)
    )

    Q_freq = (
        I0 * np.sin(theta)
        + Q0 * np.cos(theta)
    )

    plt.figure(figsize=(7, 7))

    plt.scatter(
        I_freq,
        Q_freq,
        s=8,
        alpha=0.3
    )

    plt.axhline(0)
    plt.axvline(0)

    plt.xlabel('In-phase Amplitude')
    plt.ylabel('Quadrature Amplitude')

    plt.title(
        'Frequency Error = '
        f'{delta_omega / np.pi:.5f}π rad/s'
    )

    plt.grid()
    plt.axis('equal')
    plt.show()`,
      "prompt": `주파수오차를 각각

$$
\\Delta\\omega=0.00005\\pi,
\\qquad
\\Delta\\omega=0.0001\\pi
$$

rad/s로 설정하여 문제 4.E1을 반복하시오.

세 주파수오차의 constellation을 비교하고 다음을 설명하시오.

1. 주파수오차가 커질수록 constellation의 신호점이 이동하는 속도는 어떻게 변하는가?
2. 일정한 위상오차와 주파수오차가 constellation에 미치는 영향은 어떻게 다른가?`,
      responseEnabled: true,
      referenceAnswer: `주파수오차가 존재하면 누적 위상오차는
$$
\\theta(t)=\\Delta\\omega t
$$
이므로, $\\Delta\\omega$가 클수록 같은 시간 동안 constellation이 더 빠르게 회전한다.

5000심벌을 관찰할 경우,

1. $\\Delta\\omega=0.00001\\pi$

$$
\\theta\\approx0.05\\pi=9^\\circ
$$

2. $\\Delta\\omega=0.00005\\pi$

$$
\\theta\\approx0.25\\pi=45^\\circ
$$

3. $\\Delta\\omega=0.0001\\pi$

$$
\\theta\\approx0.5\\pi=90^\\circ
$$

만큼 위상차가 누적된다.

따라서 주파수오차가
$$
0.00001\\pi
\\rightarrow0.00005\\pi
\\rightarrow0.0001\\pi
$$
로 커질수록 constellation의 신호점이 반시계방향으로 움직이는 속도가 빨라지고, 같은 관찰시간 동안 더 긴 회전 궤적이 나타난다.

일정한 위상오차는 constellation 전체를 일정한 각도만큼 회전시킨 뒤 그 위치에 고정시키는 반면, 주파수오차는 위상차가 시간에 따라 계속 누적되므로 constellation이 지속적으로 회전한다.`,
    },
  ]
},
  ]
} as const;
