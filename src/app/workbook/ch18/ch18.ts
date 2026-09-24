import type { WorkbookChapter } from '@/types/workbook';

export const chapter = {
  "id": "18-svc-ml2",
  "title": "Chapter 18. Signal Vector Space and ML Detection Ⅱ",
  "sections": [
    { //문제 1
      "id": "18-1",
      "title": "1. 제공된 수신신호의 생성 파일 분석",
      "problems": [
        { //문제 1.A
          "id": "18-1A",
          "title": "1.A.",
          "type": "essay",
          "prompt": `다음의 매핑(Mapping) 표 <표 18.1>에 따라, $s_i(t)$ 중 하나를 전송하는 4-ary 신호 전송 시스템이 있다.
[[table:
caption:표 18.1 데이터 비트 ↔ 4-ary 신호 매핑 표
데이터 비트 | 송신 신호 $s_i(t)$
00 | $s_1(t)$
01 | $s_2(t)$
10 | $s_3(t)$
11 | $s_4(t)$
]]          
‘data_bits=0110110100011101001110’라고 예를 들면, 연속적으로 $s_2(t), s_3(t), s_4(t), s_2(t), s_1(t), s_2(t), s_4(t) ? ? ? ?$를 전송한다. ? ? ? ?에 알맞은 송신 신호를 쓰시오.          
          `,
          
referenceAnswer: `주어진 데이터 비트열을 두 비트씩 나누면 다음과 같다.

\`\`\`text
01 | 10 | 11 | 01 | 00 | 01 | 11 | 01 | 00 | 11 | 10
\`\`\`

<표 18.1>의 매핑 규칙에 따라 각 비트 조합을 대응하는 4-ary 신호로 변환한다.

[[table:
데이터 비트 | 송신 신호
00 | $s_1(t)$
01 | $s_2(t)$
10 | $s_3(t)$
11 | $s_4(t)$
]]

따라서 송신 신호의 순서는 다음과 같다.

$$
s_2(t),\\ s_3(t),\\ s_4(t),\\ s_2(t),\\
s_1(t),\\ s_2(t),\\ s_4(t),\\
s_2(t),\\ s_1(t),\\ s_4(t),\\ s_3(t)
$$

그러므로 네 개의 빈칸에 들어갈 신호는

$$
\\boxed{s_2(t),\\ s_1(t),\\ s_4(t),\\ s_3(t)}
$$

이다.`,},
        { //문제 1.B
          "id": "18-1B",
          "title": "1.B.",
          "type": "python",
          starterCode: `import numpy as np
from scipy.io import loadmat

file_load("ch18/st_and_rt.mat")
mat = loadmat("st_and_rt.mat", simplify_cells=True)

# 스칼라 변수
L = int(mat["L"])
Ns = int(mat["Ns"])
tstep = float(mat["tstep"])

# 벡터 변수
p1t = np.asarray(mat["p1t"]).ravel()
p2t = np.asarray(mat["p2t"]).ravel()
rt = np.asarray(mat["rt"]).ravel()
s1t = np.asarray(mat["s1t"]).ravel()
s2t = np.asarray(mat["s2t"]).ravel()
s3t = np.asarray(mat["s3t"]).ravel()
s4t = np.asarray(mat["s4t"]).ravel()
tvector = np.asarray(mat["tvector"]).ravel()

# 불러온 변수 확인
for name, value in mat.items():
    if not name.startswith("__"):
        print(f"{name}: {np.shape(value)}")`,
          "prompt": `아래는 이번 실습에 사용할 'ch18/st_and_rt.mat'의 모든 Python 변수(벡터)들을 불러오는 py 스크립트이다. 이 py 스크립트를 실행하여, 'st_and_rt.mat'에 저장된 Python 변수(벡터)들을 모두 불러오시오.
\`\`\`python  
import numpy as np
from scipy.io import loadmat

file_load("ch18/st_and_rt.mat")
mat = loadmat("st_and_rt.mat", simplify_cells=True)

# 스칼라 변수
L = int(mat["L"])
Ns = int(mat["Ns"])
tstep = float(mat["tstep"])

# 벡터 변수
p1t = np.asarray(mat["p1t"]).ravel()
p2t = np.asarray(mat["p2t"]).ravel()
rt = np.asarray(mat["rt"]).ravel()
s1t = np.asarray(mat["s1t"]).ravel()
s2t = np.asarray(mat["s2t"]).ravel()
s3t = np.asarray(mat["s3t"]).ravel()
s4t = np.asarray(mat["s4t"]).ravel()
tvector = np.asarray(mat["tvector"]).ravel()

# 불러온 변수 확인
for name, value in mat.items():
    if not name.startswith("__"):
        print(f"{name}: {np.shape(value)}")
\`\`\`          
          `,
          
referenceAnswer: `주어진 Python 스크립트를 실행하면 \`st_and_rt.mat\`에 저장된 변수들을 불러올 수 있다.

스칼라 변수는 \`L\`, \`Ns\`, \`tstep\`이며, 나머지 변수는 NumPy의 1차원 배열로 변환된다.

[[table:
변수 | 의미 | 크기
\`L\` | 4-ary 신호 하나의 샘플 수 | 32
\`Ns\` | 전체 4-ary 심벌 수 | 37830
\`tstep\` | 샘플 간격 | 0.03125초
\`p1t\`, \`p2t\` | 정규직교 기저 신호 | 각각 32
\`s1t\`~\`s4t\` | 4개의 송신 심벌 신호 | 각각 32
\`tvector\` | 한 심벌의 시간축 | 32
\`rt\` | 전체 수신 신호 | 1210560
]]

각 변수의 값과 배열 크기는 다음 코드로 확인할 수 있다.

\`\`\`python
print("L =", L)
print("Ns =", Ns)
print("tstep =", tstep)

for name in (
    "p1t", "p2t",
    "s1t", "s2t", "s3t", "s4t",
    "tvector", "rt"
):
    print(name, np.shape(mat[name]))
\`\`\`

특히 전체 수신 신호 \`rt\`는 \`Ns\`개의 4-ary 신호를 연속적으로 이어 붙인 결과이므로 샘플 수는

$$
\\begin{aligned}
N_{\\mathrm{samples}}
&=N_sL\\\\
&=37830\\times32\\\\
&=\\boxed{1210560}
\\end{aligned}
$$

이다.`,

        },
        { //문제 1.C
          "id": "18-1C",
          "title": "1.C.",
          "prompt": `‘st_and_rt.mat’에 저장된 모든 변수 또는 벡터는 아래 py 스크립트인 ‘rt_gen.py’를 실행하여 생성한 것이다. Python 벡터 ‘s1t’, ‘s2t’, ‘s3t’, ‘s4t’는 각각 파형 $s_1(t), s_2(t), s_3(t), s_4(t)$의 샘플링된 버전(Version)이다. 그리고, Python 벡터 ‘rt’는 어떤 이미지 파일의 비트열을 AWGN(Additional White Gaussian Noise) 채널에서, 4-ary 신호로 연속적으로 전송했을 때, 수신된 신호 $r(t)$의 샘플링된 버전이다. 다음 ‘rt_gen.py’ 코드를 자세히 읽고, 물음에 답하시오.        

(주의. 이 py 스크립트 'rt_gen.py'는 ‘s1t’, ‘s2t’, ‘s3t’, ‘s4t’, ‘rt’가 각각 어떻게 생성되었는지에 대한 이해를 돕기 위해 보인 것이다. 아래 py 스크립트를 완성하라는 것이 아니며, 아래 py 스크립트 파일을 완성하여 실행하면 ‘st_and_rt.pkl’ 파일이 변경되므로, 절대 실행하지 말 것.)
\`\`\`python
# rt_gen.py
import numpy as np
from PIL import Image
from scipy.io import savemat

# ==================================================
# 1. 초기 설정
# ==================================================
rng = np.random.default_rng()

T = 1
L = 32

tstep = T / L
tvector = np.arange(1, L+1) * tstep

# ==================================================
# 2. 4진 신호 집합 생성
# ==================================================
p1t = np.sqrt(2) * np.cos(3 * np.pi * tvector) # 2차원 벡터 공간의 x축 기저 신호
p2t = np.sqrt(2) * np.sin(3 * np.pi * tvector) # 2차원 벡터 공간의 y축 기저 신호

a, b = ?, ?
c, d = ?, ?
e, f = ?, ?
g, h = ?, ?

s1t = a * p1t + b * p2t
s2t = c * p1t + d * p2t
s3t = e * p1t + f * p2t
s4t = g * p1t + h * p2t

signal_set = np.stack([s1t, s2t, s3t, s4t])

# ==================================================
# 3. 이미지 → 비트열 변환: 실습과 상관 없는 부분
# ==================================================
sp = 2
file_load("ch18/painting.jpg")
A = np.asarray(Image.open("painting.jpg").convert("RGB"), dtype=np.uint8)
A = A[::sp, ::sp, :]
pixel_values = A.ravel(order="F")
two_bits = pixel_values >> 6
data_bits = np.empty(2 * len(two_bits), dtype=np.uint8)
data_bits[0::2] = (two_bits >> 1) & 1
data_bits[1::2] = two_bits & 1
Nb = len(data_bits)
Ns = Nb // 2

# ==================================================
# 4. 비트열 → 송신 신호 매핑
# ==================================================

# 00 → s1t
# 01 → s2t
# 10 → s3t
# 11 → s4t
symbol_indices = (2 * data_bits[0::2] + data_bits[1::2])
xt = signal_set[symbol_indices].reshape(-1)
xt_len = len(xt)

# ==================================================
# 5. AWGN 채널
# ==================================================
noise_sample = 6 * rng.standard_normal(xt_len) #AWGN
rt = xt + noise_sample #Noise addition

# ==================================================
# 6. MAT 파일 저장
# ==================================================
savemat("st_and_rt.mat", {
    "L": L,
    "Ns": Ns,
    "tstep": tstep,
    "tvector": tvector,
    "p1t": p1t,
    "p2t": p2t,
    "s1t": s1t,
    "s2t": s2t,
    "s3t": s3t,
    "s4t": s4t,
    "rt": rt,
})
print("MAT 파일 저장 완료")
\`\`\`
          `,
        },
        { 
          "id": "18-1C1",
          "title": "1.C1.",
          "type": "essay",
          "prompt": `다음 문장의 빈칸을 채우시오.
          
(a) 4-ary 신호의 Python 샘플 벡터(‘s1t’, ‘s2t’, ‘s3t’, ‘s4t’)는 2차원 벡터 공간의 두 정규 직교 기저 신호 $\\psi_1(t)$와 $\\psi_2(t)$의 샘플 벡터인 ___①___와 ___②___의 선형 결합으로 발생한다.
(b) 두 정규 직교 기저 신호 샘플 벡터를 생성하는 문장을 보면, ‘tvector’를 시간 축 샘플 벡터로 사용하고 있음을 알 수 있다. 따라서, ‘tvector’를 어떻게 설정했는데 보면, 4-ary 신호의 Python 샘플 벡터(‘s1t’, ‘s2t’, ‘s3t’, ‘s4t’)의 신호 길이(초)와 샘플 간격이 어떻게 설정되었는지 알 수 있다. 4-ary 신호의 길이는 ___③___초이고, 샘플 간격은 ___④___초이며, 이를 나타내는 Python 변수는 ___⑤___이다. 또, 4-ary 신호는 ___⑥___개의 샘플로 이루어졌다.
          `,
          referenceAnswer: `(a) 두 빈칸에 들어갈 정규직교 기저 신호의 샘플 벡터는 다음과 같다.

① \`p1t\`  
② \`p2t\`

4-ary 신호는 두 기저 신호의 선형 결합으로 생성된다. 예를 들어, 첫 번째 신호는 다음과 같다.

$$
s_1(t)=a\\psi_1(t)+b\\psi_2(t)
$$

(b) 나머지 빈칸의 정답은 다음과 같다.

③ 1초  
④ $\\frac{1}{32}$초 = 0.03125초  
⑤ \`tstep\`  
⑥ 32개

주어진 코드에서 신호의 길이는 $T=1$초, 심벌당 샘플 수는 $L=32$로 설정되어 있다. 따라서 샘플 간격은

$$
\\Delta t=\\frac{T}{L}
=\\frac{1}{32}
=0.03125\\text{초}
$$

이다. 시간축 벡터 \`tvector\`는 0.03125초부터 1초까지 일정한 간격으로 배치된 32개의 샘플로 구성된다.`,},
        { 
          "id": "18-1C2",
          "title": "1.C2.",
          "type": "essay",
          "prompt": `‘rt_gen.py’의 Python 변수 중, 벡터 ‘data_bits’는 송신 데이터(이미지 파일)의 비트열이고, ‘Nb’는 송신 데이터의 총 비트 수(비트열의 길이)다. 송신 데이터 비트열을 4-ary 신호로 전송할 때, 총 ‘Ns’ 번의 4-ary 신호 전송이 필요하다. ‘rt_gen.py’에서 ‘Ns’가 어떻게 설정되어 있는지 쓰고, 그렇게 설정된 이유를 쓰시오.
          `,
          referenceAnswer: `4-ary 신호 하나는 $00$, $01$, $10$, $11$ 중 한 가지 비트 조합을 나타내므로, 한 번의 심벌 전송으로 2비트를 전달할 수 있다.

따라서 송신 데이터의 전체 비트 수가 $N_b$일 때 필요한 4-ary 심벌 수 $N_s$는 다음과 같다.

$$
N_s=\\frac{N_b}{2}
$$

이를 Python 코드로 구현하면 다음과 같다.

\`\`\`python
Ns = Nb // 2
\`\`\`

여기서 \`//\`는 정수 나눗셈 연산자이다. 주어진 비트열은 두 비트씩 묶어 전송할 수 있도록 짝수 개로 구성되어 있으므로, 전체 비트 수를 2로 나누어 필요한 심벌 수를 구한다.`,},
        { 
          "id": "18-1C3",
          "title": "1.C3.",
          "type": "python",
          consoleEnabled: true,
          starterCode: `import numpy as np
from scipy.io import loadmat

file_load("ch18/st_and_rt.mat")
mat = loadmat("st_and_rt.mat", simplify_cells=True)

# 스칼라 변수
L = int(mat["L"])
Ns = int(mat["Ns"])
tstep = float(mat["tstep"])

# 벡터 변수
p1t = np.asarray(mat["p1t"]).ravel()
p2t = np.asarray(mat["p2t"]).ravel()
rt = np.asarray(mat["rt"]).ravel()
s1t = np.asarray(mat["s1t"]).ravel()
s2t = np.asarray(mat["s2t"]).ravel()
s3t = np.asarray(mat["s3t"]).ravel()
s4t = np.asarray(mat["s4t"]).ravel()
tvector = np.asarray(mat["tvector"]).ravel()

# 불러온 변수 확인
for name, value in mat.items():
    if not name.startswith("__"):
        print(f"{name}: {np.shape(value)}")`,
          "prompt": `‘p1t’와 ‘p2t’는 ‘s1t’, ‘s2t’, ‘s3t’, ‘s4t’를 생성하기 위해 사용한 정규 직교 기저 신호(Basis) $\\psi_1(t)$와 $\\psi_2(t)$의 샘플 벡터이다.

주어진 py 스크립트를 실행하여 'st_and_rt.mat'의 모든 변수(벡터)를 불러온 후, Console에서 아래를 수행하시오.
\`\`\`python
>>> print(sum(p1t**2)*tstep)
>>> print(sum(p2t**2)*tstep)
>>> print(sum(p1t*p2t)*tstep)
\`\`\`
다음 물음에 답하시오.
(a) 위 명령어는 수치적분([[link:/workbook/ch2?p=2-1A|2장의 문제 1]] 참고)을 수행한다. 예를 들어, 라인 ‘sum(p1t**2)*tstep’은 수식 $\\int_{0}^{1}\\left(\\psi_1(t)\\right)^2\\,dt$를 수치적분으로 구현한 것이다. 나머지 2개 라인의 수치적분에 해당하는 수식을 쓰시오.
(b) 실행 결과를 토대로, ‘p1t’와 ‘p2t’는 Orthonormal Basis임을 설명하시오. (수치적분으로 인한 약간의 오차는 무시할 것)
`,
          referenceAnswer: `(a) 각 명령어에 해당하는 수치적분은 다음과 같다.

첫 번째 명령어는 첫 번째 기저 신호의 에너지를 계산한다.

$$
\\int_0^1\\psi_1^2(t)\\,dt
$$

두 번째 명령어는 두 번째 기저 신호의 에너지를 계산한다.

$$
\\boxed{
\\int_0^1\\psi_2^2(t)\\,dt
}
$$

세 번째 명령어는 두 기저 신호의 내적을 계산한다.

$$
\\boxed{
\\int_0^1\\psi_1(t)\\psi_2(t)\\,dt
}
$$

(b) 명령어의 실행 결과는 수치적 오차를 무시하면 순서대로 $1$, $1$, $0$이다.

$$
\\int_0^1\\psi_1^2(t)\\,dt=1
$$

$$
\\int_0^1\\psi_2^2(t)\\,dt=1
$$

$$
\\int_0^1\\psi_1(t)\\psi_2(t)\\,dt=0
$$

즉, 각 기저 신호의 에너지는 모두 1이므로 **정규화(Normalization)** 조건을 만족하며, 두 기저 신호의 내적은 0이므로 **직교성(Orthogonality)** 조건을 만족한다.

따라서 \`p1t\`와 \`p2t\`는 정규직교 기저(Orthonormal Basis) 신호의 샘플 벡터이다.`,
},
        { 
          "id": "18-1C4",
          "title": "1.C4.",
          "type": "essay",
          "prompt": `‘rt_gen.py’에서 ‘xt’는 변조된 4-ary 송신 신호임을 알 수 있다. ‘xt’는 송신 데이터 비트(‘data_bits’)를 두 비트 단위로 끊어, 그 값에 따라 <표 18.1>의 규칙에 따라 ‘s1t’, ‘s2t’, ‘s3t’, ‘s4t’ 중 하나를 연달아 이어 붙임으로써 생성됨을 알 수 있다. 그런 다음, py 스크립트에서 어떤 추가 과정을 거쳐 수신 신호 Python 벡터 ‘rt’가 생성되는가?
          `,
         referenceAnswer: `송신 신호 벡터 \`xt\`에 가산성 백색 가우시안 잡음(AWGN)을 더하여 수신 신호 벡터 \`rt\`를 생성한다.

잡음과 수신 신호를 생성하는 코드는 다음과 같다.

\`\`\`python
noise_sample = 3 * rng.standard_normal(xt_len)
rt = xt + noise_sample
\`\`\`

\`rng.standard_normal(xt_len)\`은 평균이 0이고 표준편차가 1인 가우시안 난수 \`xt_len\`개를 생성한다. 여기에 6을 곱하므로 생성된 잡음의 평균은 0, 이론적 표준편차는 6이다.

따라서 수신 신호는 다음과 같이 표현된다.

$$
\\boxed{
r(t)=x(t)+n(t)
}
$$

여기서 $x(t)$는 송신 신호이고, $n(t)$는 AWGN이다. 수신 신호는 잡음의 영향으로 원래 송신 신호와 서로 다른 파형을 갖게 된다.`,},
        { 
          "id": "18-1C5",
          "title": "1.C5.",
          "type": "essay",
          "prompt": `결국, ‘rt[0:L]’는 처음 전송된 4-ary 신호에 대한 수신 신호 샘플 벡터, ‘rt[L:L+L]’는 두 번째로 전송된 4-ary 신호에 대한 수신 신호 샘플 벡터, ‘rt[2*L:3*L]’는 세 번째로 전송된 4-ary 신호에 대한 수신 신호 샘플 벡터에 해당한다. 그렇다면, $n$번째로 전송된 4-ary 신호에 대한 수신 신호 샘플 벡터는 어떻게 ‘rt[?:?]’로 나타낼 수 있는지 쓰시오.`,
          referenceAnswer: `Python 배열의 인덱스는 0부터 시작하며, 슬라이싱할 때 종료 인덱스에 해당하는 원소는 포함하지 않는다.

4-ary 신호 하나는 $L$개의 샘플로 구성되어 있으므로, $n$번째 신호의 시작 인덱스는 $(n-1)L$이고 종료 인덱스는 $nL$이다.

따라서 $n$번째로 전송된 4-ary 신호에 대한 수신 신호 샘플 벡터는 다음과 같다.

\`\`\`python
rt_nth = rt[(n-1)*L:n*L]
\`\`\`

$L=32$인 경우, 첫 번째와 두 번째, 다섯 번째 심벌의 수신 신호는 각각 다음과 같이 추출한다.

\`\`\`python
rt[0:32]      # 첫 번째 심벌
rt[32:64]     # 두 번째 심벌
rt[128:160]   # 다섯 번째 심벌
\`\`\`

각 슬라이싱 결과에는 정확히 32개의 샘플이 포함된다.`},
      ]
    },
    { //문제 2
      "id": "18-2",
      "title": "2. 4-ary 심벌 신호 및 수신 신호 파형 관찰",
      "problems": [
        { //문제 2.A
          "id": "18-2A",
          "title": "2.A.",
          "type": "python",
          consoleEnabled: true,
          starterCode: `import numpy as np
from scipy.io import loadmat

file_load("ch18/st_and_rt.mat")
mat = loadmat("st_and_rt.mat", simplify_cells=True)

# 스칼라 변수
L = int(mat["L"])
Ns = int(mat["Ns"])
tstep = float(mat["tstep"])

# 벡터 변수
p1t = np.asarray(mat["p1t"]).ravel()
p2t = np.asarray(mat["p2t"]).ravel()
rt = np.asarray(mat["rt"]).ravel()
s1t = np.asarray(mat["s1t"]).ravel()
s2t = np.asarray(mat["s2t"]).ravel()
s3t = np.asarray(mat["s3t"]).ravel()
s4t = np.asarray(mat["s4t"]).ravel()
tvector = np.asarray(mat["tvector"]).ravel()

# 불러온 변수 확인
for name, value in mat.items():
    if not name.startswith("__"):
        print(f"{name}: {np.shape(value)}")`,
          "prompt": `문제 1.C의 ‘rt_gen.py’에서 생성한 신호 $s_1(t), s_2(t), s_3(t), s_4(t)$의 샘플링된 버전의 그래프를 그리자. 아래 예시와 같이 Console에서 $s_1(t)$의 그래프를 그릴 수 있다.
\`\`\`python
>>> import matplotlib.pyplot as plt
>>> plt.figure(); plt.plot(s1t); plt.grid()
\`\`\`          
주어진 py 스크립트를 실행하여 'st_and_rt.mat'의 모든 변수(벡터)를 불러온 후, 4개의 신호의 그래프를 각각 그리시오.
          `,
          referenceAnswer: `네 가지 4-ary 신호는 각각 32개의 샘플로 구성되어 있으며, 두 정규직교 기저 신호 $\\psi_1(t)$와 $\\psi_2(t)$의 서로 다른 선형 결합으로 생성된다.

각 신호의 파형은 다음과 같이 그릴 수 있다.

\`\`\`python
import matplotlib.pyplot as plt

signals = [s1t, s2t, s3t, s4t]

for i, signal in enumerate(signals, start=1):
    plt.figure()
    plt.plot(tvector, signal)
    plt.title(f"s{i}(t)")
    plt.xlabel("Time (s)")
    plt.ylabel("Amplitude")
    plt.grid(True)
    plt.show()
\`\`\`

각 그래프의 시간축은 0.03125초부터 1초까지이며, 신호마다 진폭과 위상이 다르게 나타난다. 이는 네 신호를 구성하는 두 기저 신호의 선형 결합 계수가 서로 다르기 때문이다.`,

        },
        { //문제 2.B
          "id": "18-2B",
          "title": "2.B.",
          "prompt": `문제 2.A에서 load 한 ‘st_and_rt.mat’에는, 문제 1.C의 ‘rt_gen.pkl’에서 생성한 이미지 파일의 수신 신호 $r(t)$의 샘플링 버전인 벡터 ‘rt’도 들어있다.
          `
        },
        {
          "id": "18-2B1",
          "title": "2.B1.",
          "type": "python",
          consoleEnabled: true,
          starterCode: `import numpy as np
from scipy.io import loadmat

file_load("ch18/st_and_rt.mat")
mat = loadmat("st_and_rt.mat", simplify_cells=True)

# 스칼라 변수
L = int(mat["L"])
Ns = int(mat["Ns"])
tstep = float(mat["tstep"])

# 벡터 변수
p1t = np.asarray(mat["p1t"]).ravel()
p2t = np.asarray(mat["p2t"]).ravel()
rt = np.asarray(mat["rt"]).ravel()
s1t = np.asarray(mat["s1t"]).ravel()
s2t = np.asarray(mat["s2t"]).ravel()
s3t = np.asarray(mat["s3t"]).ravel()
s4t = np.asarray(mat["s4t"]).ravel()
tvector = np.asarray(mat["tvector"]).ravel()

# 불러온 변수 확인
for name, value in mat.items():
    if not name.startswith("__"):
        print(f"{name}: {np.shape(value)}")`,
          "prompt": `주어진 py 스크립트를 실행하여 'st_and_rt.mat'의 모든 변수(벡터)를 불러온 후, Console에서 아래를 실행하여, 수신 신호 $r(t)$의 샘플 길이를 확인하고, 전체 파형을 그리시오.
\`\`\`python
>>> import matplotlib.pyplot as plt
>>> len(rt)
>>> plt.plot(rt)
\`\`\` 
          `,
          referenceAnswer: `전체 수신 신호 \`rt\`의 샘플 수는 \`len(rt)\`으로 확인할 수 있으며, 전체 파형은 다음 코드로 그릴 수 있다.

\`\`\`python
import matplotlib.pyplot as plt

print("Number of samples:", len(rt))

plt.figure(figsize=(12, 4))
plt.plot(rt)
plt.xlabel("Sample index")
plt.ylabel("Amplitude")
plt.title("Received signal")
plt.grid(True)
plt.show()
\`\`\`

전체 수신 신호는 $N_s$개의 4-ary 신호를 연속적으로 연결한 것이며, 각 신호는 $L=32$개의 샘플로 구성되어 있다.

따라서 전체 수신 신호의 샘플 수는

$$
N_{\\mathrm{samples}}=N_sL
$$

이다. $N_s=37830$인 경우에는

$$
N_{\\mathrm{samples}}
=37830\\times32
=\\boxed{1210560}
$$

개의 샘플이 출력된다.

수신 신호에는 AWGN이 추가되어 있으므로, 전체 파형은 각 송신 신호의 파형에 잡음이 중첩된 형태로 나타난다.`,

        },
        {
          "id": "18-2B2",
          "title": "2.B2.",
          "type": "python",
          consoleEnabled: true,
          starterCode: `import numpy as np
from scipy.io import loadmat

file_load("ch18/st_and_rt.mat")
mat = loadmat("st_and_rt.mat", simplify_cells=True)

# 스칼라 변수
L = int(mat["L"])
Ns = int(mat["Ns"])
tstep = float(mat["tstep"])

# 벡터 변수
p1t = np.asarray(mat["p1t"]).ravel()
p2t = np.asarray(mat["p2t"]).ravel()
rt = np.asarray(mat["rt"]).ravel()
s1t = np.asarray(mat["s1t"]).ravel()
s2t = np.asarray(mat["s2t"]).ravel()
s3t = np.asarray(mat["s3t"]).ravel()
s4t = np.asarray(mat["s4t"]).ravel()
tvector = np.asarray(mat["tvector"]).ravel()

# 불러온 변수 확인
for name, value in mat.items():
    if not name.startswith("__"):
        print(f"{name}: {np.shape(value)}")`,
          "prompt": `주어진 py 스크립트를 실행하여 'st_and_rt.mat'의 모든 변수(벡터)를 불러온 후, Console에서 아래를 실행하여, 함수 ‘len()’을 이용하여 $s_1(t), s_2(t), s_3(t), s_4(t)$ 의 샘플 길이를 확인하시오.
\`\`\`python
>>> import matplotlib.pyplot as plt
>>> len(rt)
>>> plt.plot(rt)
\`\`\` 
          `,
          referenceAnswer: `각 4-ary 신호의 샘플 수는 다음과 같이 확인한다.

\`\`\`python
print(len(s1t))
print(len(s2t))
print(len(s3t))
print(len(s4t))
\`\`\`

실행 결과는 모두 32이다.

\`\`\`text
32
32
32
32
\`\`\`

신호 생성 과정에서 심벌당 샘플 수를 $L=32$로 설정했으므로,

$$
\\boxed{
\\operatorname{len}(s1t)
=\\operatorname{len}(s2t)
=\\operatorname{len}(s3t)
=\\operatorname{len}(s4t)
=32
}
$$

이다. 따라서 네 가지 신호는 파형이 서로 다르더라도 모두 같은 개수의 샘플로 표현된다.`,

        },
        {
          "id": "18-2B3",
          "title": "2.B3.",
          "type": "essay",
          "prompt": `$r(t)$는 4-ary 신호 열을 이어 붙여 만든 것임을 상기하자. 문제 2.B1, 2.B2의 결과, 그리고 4-ary 신호당 전송하는 비트 수를 이용하여, 이미지 파일의 전체 비트 수를 계산하시오.`,
          referenceAnswer: `4-ary 신호는 네 가지 신호 중 하나를 전송하므로, 심벌 하나당 2비트를 전달한다.

또한 4-ary 신호 하나는 $L=32$개의 샘플로 구성되어 있으므로, 전체 심벌 수는 수신 신호의 샘플 수를 $L$로 나누어 구할 수 있다.

$$
N_s=\\frac{\\operatorname{len}(rt)}{L}
$$

따라서 이미지 파일의 전체 비트 수 $N_b$는

$$
N_b=2N_s
=\\frac{2\\operatorname{len}(rt)}{L}
$$

이다.

수신 신호의 샘플 수가 1,210,560개인 경우,

$$
\\begin{aligned}
N_b
&=\\frac{2\\times1210560}{32}\\\\
&=\\boxed{75660\\text{비트}}
\\end{aligned}
$$

이다.`},
        { //문제 2.C
          "id": "18-2C",
          "title": "2.C.",
          "prompt": `수신 신호 $r(t)$의 샘플링된 버전 ‘rt’를 확대하여, 수신되는 4-ary 신호의 모양을 살펴보자.`
        },
        {
          "id": "18-2C1",
          "title": "2.C1.",
          "type": "python",
          consoleEnabled: true,
          starterCode: `import numpy as np
from scipy.io import loadmat

file_load("ch18/st_and_rt.mat")
mat = loadmat("st_and_rt.mat", simplify_cells=True)

# 스칼라 변수
L = int(mat["L"])
Ns = int(mat["Ns"])
tstep = float(mat["tstep"])

# 벡터 변수
p1t = np.asarray(mat["p1t"]).ravel()
p2t = np.asarray(mat["p2t"]).ravel()
rt = np.asarray(mat["rt"]).ravel()
s1t = np.asarray(mat["s1t"]).ravel()
s2t = np.asarray(mat["s2t"]).ravel()
s3t = np.asarray(mat["s3t"]).ravel()
s4t = np.asarray(mat["s4t"]).ravel()
tvector = np.asarray(mat["tvector"]).ravel()

# 불러온 변수 확인
for name, value in mat.items():
    if not name.startswith("__"):
        print(f"{name}: {np.shape(value)}")`,
          "prompt": `$r(t)$의 맨 앞의(첫 번째 전송된) 4-ary 신호를 보기 위해, 그래프의 $x$축 범위가 [0, 32]가 되도록 아래를 실행하여 확대하시오.
\`\`\`python
>>> import matplotlib.pyplot as plt
>>> plt.plot(rt)
>>> plt.axis([0, 32, -20, 20])
\`\`\`           
결과 그래프를 확인하고, $r(t)$에서 첫 번째 전송된 4-ary 신호는 $\\{s_1(t), s_2(t), s_3(t), s_4(t)\\}$ 중 어떤 것이었을지 눈으로 판별하시오. (문제 2.A에서 확인한 $\\{s_1(t), s_2(t), s_3(t), s_4(t)\\}$와 비교하여 판별할 것)`,
          referenceAnswer: `첫 번째로 전송된 4-ary 신호는 수신 신호 \`rt\`의 처음 32개 샘플에 해당한다.

따라서 첫 번째 수신 심벌은 다음과 같이 추출할 수 있다.

\`\`\`python
rt_first = rt[0:32]
\`\`\`

전체 수신 신호의 앞부분을 확대하여 표시하는 코드는 다음과 같다.

\`\`\`python
import matplotlib.pyplot as plt

plt.figure()
plt.plot(rt)
plt.axis([0, 32, -20, 20])
plt.xlabel("Sample index")
plt.ylabel("Amplitude")
plt.grid(True)
plt.show()
\`\`\`

첫 번째 수신 신호에는 AWGN이 추가되어 있으므로, 문제 2.A에서 관찰한 네 가지 송신 신호의 파형과 정확히 일치하지 않는다.

잡음으로 인해 파형이 크게 왜곡되어 있다면, 그래프의 모양만 비교하여 어떤 4-ary 신호가 송신되었는지 확실하게 판별하기 어렵다.`},
        {
          "id": "18-2C2",
          "title": "2.C2.",
          "type": "python",
          consoleEnabled: true,
          starterCode: `import numpy as np
from scipy.io import loadmat

file_load("ch18/st_and_rt.mat")
mat = loadmat("st_and_rt.mat", simplify_cells=True)

# 스칼라 변수
L = int(mat["L"])
Ns = int(mat["Ns"])
tstep = float(mat["tstep"])

# 벡터 변수
p1t = np.asarray(mat["p1t"]).ravel()
p2t = np.asarray(mat["p2t"]).ravel()
rt = np.asarray(mat["rt"]).ravel()
s1t = np.asarray(mat["s1t"]).ravel()
s2t = np.asarray(mat["s2t"]).ravel()
s3t = np.asarray(mat["s3t"]).ravel()
s4t = np.asarray(mat["s4t"]).ravel()
tvector = np.asarray(mat["tvector"]).ravel()

# 불러온 변수 확인
for name, value in mat.items():
    if not name.startswith("__"):
        print(f"{name}: {np.shape(value)}")`,
          "prompt": `$r(t)$ 신호 중 5번째로 전송한 4-ary 신호를 보기 위해, 그래프의 확대해야 하는 $x$축 범위를 설정하시오.
\`\`\`python
>>> import matplotlib.pyplot as plt
>>> plt.plot(rt)
>>> plt.axis([?, ?, -20, 20])
\`\`\`           
결과 그래프를 확인하고, $r(t)$에서 5번째 전송된 4-ary 신호는 $\\{s_1(t), s_2(t), s_3(t), s_4(t)\\}$ 중 어떤 것이었을지 눈으로 판별하시오. (문제 2.A에서 확인한 $\\{s_1(t), s_2(t), s_3(t), s_4(t)\\}$와 비교하여 판별할 것)`,
          referenceAnswer: `4-ary 신호 하나는 $L=32$개의 샘플로 구성된다. 따라서 다섯 번째 신호는 네 개의 심벌이 전송된 이후부터 시작한다.

다섯 번째 심벌의 시작 인덱스는

$$
(5-1)L=4\\times32=128
$$

이며, 종료 인덱스는

$$
5L=5\\times32=160
$$

이다.

따라서 다섯 번째 수신 신호는 다음과 같이 추출한다.

\`\`\`python
rt_fifth = rt[128:160]
\`\`\`

문제의 그래프 확대 코드를 완성하면 다음과 같다.

\`\`\`python
import matplotlib.pyplot as plt

plt.figure()
plt.plot(rt)
plt.axis([128, 160, -20, 20])
plt.xlabel("Sample index")
plt.ylabel("Amplitude")
plt.grid(True)
plt.show()
\`\`\`

따라서 $x$축에 입력할 범위는 **128과 160**이다.

다섯 번째 수신 신호 역시 AWGN에 의해 파형이 왜곡되어 있으므로, 네 가지 송신 신호 중 어느 신호가 전송되었는지 육안으로 확실하게 판별하기 어려울 수 있다.`},
        {
          "id": "18-2C3",
          "title": "2.C3.",
          "type": "essay",
          "prompt": `$r(t)$는 4-ary 신호 $\\{s_1(t), s_2(t), s_3(t), s_4(t)\\}$를 이어 붙여 전송한 것이다. 그런데, 문제 2.C1~2.C2에서 눈으로 판별하는 것이 어려웠다면, 그 이유를 쓰시오.
          `,
          referenceAnswer: `수신 신호는 송신 신호에 가산성 백색 가우시안 잡음(AWGN)이 더해진 형태이다.

$$
\\boxed{
r(t)=s_i(t)+n(t)
}
$$

여기서 $s_i(t)$는 전송된 4-ary 신호이고, $n(t)$는 AWGN이다.

잡음은 각 샘플의 진폭을 불규칙하게 변화시키므로 수신 신호의 파형은 원래 송신 신호의 파형과 다르게 나타난다. 특히 잡음의 크기가 클수록 네 가지 송신 신호의 특징을 파형만으로 구분하기 어려워진다.

따라서 수신 신호를 육안으로 비교하는 대신, 정규직교 기저를 이용하여 수신 신호의 벡터공간 좌표를 구하고 각 송신 신호와의 거리를 비교하는 ML 검출 방법을 사용할 수 있다.`},
      ]
    },
    { //문제 3
      "id": "18-3",
      "title": "3. 벡터 공간에서 ML 검출",
      "problems": [
        { //문제 3.A
          "id": "18-3A",
          "title": "3.A.",
          "prompt": `문제 1.C에 주어진 ‘rt_gen.py’의 마지막(6. MAT 파일 저장)을 보면, ‘st_and_rt.mat’에 변수를 저장할 때, 송신 데이터 비트열 ‘data_bits’는 저장하지 않음을 알 수 있다. 본 문제에서는, ‘st_and_rt.mat’에 저장된 4-ary 신호 샘플 벡터(‘s1t’, ‘s2t’, ‘s3t’, ‘s4t’) 그리고 여타 Python 벡터 및 변수들만을 이용하여, 수신 신호 샘플 벡터 ‘rt’로부터 ‘data_bits’를 역으로 추정한다. ML 검출 기법을 이용하여, 문제 2에서 눈으로 판별할 수 없었던 것을, ML 검출을 이용하면 가능할 것인지 확인하자.

ML 검출 기법을 이용하여, 수신 신호 샘플 벡터 ‘rt’로부터 송신 데이터 비트열을 복조하는 Python 코드를 다음의 과정을 따라 작성할 수 있다.

[[equation:18.1]]과 같이 $N$개의 직교 기저(Orthogonal Basis) 함수들 $\\psi_k(t)(k=1,\\cdots,N)$을 선형 결합하여 M-ary($M$가지 수의) 신호 $s_1(t), \\cdots, s_M(t)$를 생성할 수 있다.
$$
s_i(t)=
\\sum_{k=1}^{N} a_{ik} \\psi_k(t),
i=1, \\cdots, M
\\left(
\\text{일반적으로 } N \\le M
\\right)
\\qquad \\text{(식 18.1)}
$$
이렇게 생성된 M-ary 신호 $s_1(t), \\cdots, s_M(t)$는 각각 [[equation:18.2]]와 같이, $N$개의 직교 기저 $\\psi_k(t)(k=1,\\cdots,N)$가 좌표축을 형성하는 $N$차 벡터 공간 위의 한 점으로 나타낼 수 있다.
$$
s_i(t)\\Rightarrow \\mathbf{s}_i=(a_{i1}, a_{i2}, \\cdots, a_{iN})
\\qquad \\text{(식 18.2)}
$$
$a_{ik}$의 값은 $s_i(t)$와 직교 기저 함수 $\\psi_k(t)(k=1,\\cdots,N)$를 이용하여 [[equation:18.3]]과 같이 계산할 수 있다.
$$
\\begin{aligned}
a_{ik}
&=
\\int_{t_1}^{t_2}s_i(t) \\psi_k^{*}(t)\\,dt \\\\
&=
\\int_{t_1}^{t_2}s_i(t) \\psi_k(t)\\,dt
(\\psi_k(t)\\text{가 실수 신호인 경우.})
\\qquad \\text{(식 18.3)}
\\end{aligned}
$$
여기서 $t_1$과 $t_2$는 심벌 구간의 경계이며, $s_1(t), \\cdots, s_M(t)$과 $\\psi_1(t), \\cdots, \\psi_N^{*}(t)$의 심벌 구간은 모두 같다.
`,
        },
        {
          "id": "18-3A1",
          "title": "3.A1.",
          "type": "proof",
          "prompt": `[[equation:18.1]]을 [[equation:18.3]]의 우변에 대입하여, [[equation:18.3]]이 성립함을 보이시오.
          `,
          
referenceAnswer: `정규직교 기저 함수는 다음 조건을 만족한다.

$$
\\int_{t_1}^{t_2}\\psi_l(t)\\psi_k^*(t)\\,dt
=
\\begin{cases}
1, & l=k \\\\
0, & l\\neq k
\\end{cases}
=\\delta_{lk}
$$

식 18.1의 신호 표현을 식 18.3의 우변에 대입하면 다음과 같다.

$$
\\begin{aligned}
\\int_{t_1}^{t_2}s_i(t)\\psi_k^*(t)\\,dt
&=
\\int_{t_1}^{t_2}
\\left(
\\sum_{l=1}^{N}a_{il}\\psi_l(t)
\\right)
\\psi_k^*(t)\\,dt \\\\
&=
\\sum_{l=1}^{N}a_{il}
\\int_{t_1}^{t_2}
\\psi_l(t)\\psi_k^*(t)\\,dt \\\\
&=
\\sum_{l=1}^{N}a_{il}\delta_{lk} \\\\
&=
\\boxed{a_{ik}}
\\end{aligned}
$$

정규직교 조건에 의해 $l\neq k$인 항은 모두 0이 되고, $l=k$인 항만 남는다.

따라서 신호 $s_i(t)$와 $k$번째 기저 함수의 내적을 계산하면 해당 신호의 $k$번째 벡터공간 좌표 $a_{ik}$를 구할 수 있다.`},
        {
          "id": "18-3A2",
          "title": "3.A2.",
          "type": "python",
          starterCode: `import numpy as np
from scipy.io import loadmat

file_load("ch18/st_and_rt.mat")
mat = loadmat("st_and_rt.mat", simplify_cells=True)

# 스칼라 변수
L = int(mat["L"])
Ns = int(mat["Ns"])
tstep = float(mat["tstep"])

# 벡터 변수
p1t = np.asarray(mat["p1t"]).ravel()
p2t = np.asarray(mat["p2t"]).ravel()
rt = np.asarray(mat["rt"]).ravel()
s1t = np.asarray(mat["s1t"]).ravel()
s2t = np.asarray(mat["s2t"]).ravel()
s3t = np.asarray(mat["s3t"]).ravel()
s4t = np.asarray(mat["s4t"]).ravel()
tvector = np.asarray(mat["tvector"]).ravel()

a11 = sum(s1t * p1t) * tstep #a_11의 수치적분 구현, 2장의 문제 1 참고
a12 = sum(????) * tstep #완성해야 할 부분
s1 = np.array([a11, a12]); print("s1={}".format(s1))`,
          "prompt": `[[equation:18.3]]의 적분은 수치적분을 이용하여 계산할 수 있다. 아래 py 스크립트에서는 $s_1(t)$의 샘플 벡터인 ‘s1t’를 이용하여 $s_1(t)$에 해당하는 2차원 벡터 공간의 한 점 $\\mathbf{s}_1$을 구한다. 즉, $\\mathbf{s}_1$의 $x$, $y$좌표에 해당하는 $a_{11}$, $a_{12}$를 계산한다. 아래에 ?를 적절히 채워 py 스크립트를 완성하시오.
\`\`\`python
import numpy as np
from scipy.io import loadmat

file_load("ch18/st_and_rt.mat")
mat = loadmat("st_and_rt.mat", simplify_cells=True)

# 스칼라 변수
L = int(mat["L"])
Ns = int(mat["Ns"])
tstep = float(mat["tstep"])

# 벡터 변수
p1t = np.asarray(mat["p1t"]).ravel()
p2t = np.asarray(mat["p2t"]).ravel()
rt = np.asarray(mat["rt"]).ravel()
s1t = np.asarray(mat["s1t"]).ravel()
s2t = np.asarray(mat["s2t"]).ravel()
s3t = np.asarray(mat["s3t"]).ravel()
s4t = np.asarray(mat["s4t"]).ravel()
tvector = np.asarray(mat["tvector"]).ravel()

a11 = sum(s1t * p1t) * tstep #a_11의 수치적분 구현, 2장의 문제 1 참고
a12 = sum(????) * tstep #완성해야 할 부분
s1 = np.array([a11, a12]); print("s1={}".format(s1))
\`\`\`    
          `,
          
referenceAnswer: `첫 번째 신호 $s_1(t)$의 벡터공간 좌표는 두 정규직교 기저 함수에 각각 투영하여 구한다.

$$
a_{11}
=
\\int_0^1 s_1(t)\\psi_1(t)\\,dt
$$

$$
a_{12}
=
\\int_0^1 s_1(t)\\psi_2(t)\\,dt
$$

두 적분을 수치적분으로 구현하면 다음과 같다.

\`\`\`python
a11 = np.sum(s1t * p1t) * tstep
a12 = np.sum(s1t * p2t) * tstep

s1 = np.array([a11, a12])
print("s1 =", s1)
\`\`\`

따라서 빈칸에 들어갈 식은 **\`s1t * p2t\`**이다.

제공된 신호의 좌표를 계산하면 수치적분에 따른 미세한 오차를 제외하고 다음 결과를 얻는다.

$$
\\boxed{\\mathbf{s}_1=(1,3)}
$$

즉, 첫 번째 신호는 두 기저 함수의 선형 결합으로 다음과 같이 표현된다.

$$
s_1(t)=\\psi_1(t)+3\\psi_2(t)
$$`,

        },
        {
          "id": "18-3A3",
          "title": "3.A3.",
          "type": "python",
          starterCode: `import numpy as np
from scipy.io import loadmat

file_load("ch18/st_and_rt.mat")
mat = loadmat("st_and_rt.mat", simplify_cells=True)

# 스칼라 변수
L = int(mat["L"])
Ns = int(mat["Ns"])
tstep = float(mat["tstep"])

# 벡터 변수
p1t = np.asarray(mat["p1t"]).ravel()
p2t = np.asarray(mat["p2t"]).ravel()
rt = np.asarray(mat["rt"]).ravel()
s1t = np.asarray(mat["s1t"]).ravel()
s2t = np.asarray(mat["s2t"]).ravel()
s3t = np.asarray(mat["s3t"]).ravel()
s4t = np.asarray(mat["s4t"]).ravel()
tvector = np.asarray(mat["tvector"]).ravel()

a11 = sum(s1t * p1t) * tstep #a_11의 수치적분 구현, 2장의 문제 1 참고
a12 = sum(????) * tstep #완성해야 할 부분
s1 = np.array([a11, a12]); print("s1={}".format(s1))`,
          "prompt": `문제 3.A2의 py 스크립트를 복사하여 붙여넣은 후, 나머지 4-ary 신호 ‘s2t’, ‘s3t’, ‘s4t’의 벡터 공간 좌표를 구하는 라인을 추가하시오. 수정한 py 스크립트를 실행하여 결과를 확인하시오.
          `,
          
referenceAnswer: `나머지 세 신호도 문제 3.A2와 동일한 방식으로 각각 두 정규직교 기저 함수에 투영하면 된다.

일반적으로 $i$번째 신호의 벡터공간 좌표는 다음과 같다.

$$
\\mathbf{s}_i=(a_{i1},a_{i2})
$$

$$
a_{i1}
=
\\int_0^1 s_i(t)\\psi_1(t)\\,dt,
\\qquad
a_{i2}
=
\\int_0^1 s_i(t)\\psi_2(t)\\,dt
$$

네 신호의 좌표를 모두 계산하는 Python 코드는 다음과 같다.

\`\`\`python
# 첫 번째 신호의 좌표
a11 = np.sum(s1t * p1t) * tstep
a12 = np.sum(s1t * p2t) * tstep
s1 = np.array([a11, a12])

# 두 번째 신호의 좌표
a21 = np.sum(s2t * p1t) * tstep
a22 = np.sum(s2t * p2t) * tstep
s2 = np.array([a21, a22])

# 세 번째 신호의 좌표
a31 = np.sum(s3t * p1t) * tstep
a32 = np.sum(s3t * p2t) * tstep
s3 = np.array([a31, a32])

# 네 번째 신호의 좌표
a41 = np.sum(s4t * p1t) * tstep
a42 = np.sum(s4t * p2t) * tstep
s4 = np.array([a41, a42])

# 계산 결과 출력
print("s1 =", np.round(s1, 6))
print("s2 =", np.round(s2, 6))
print("s3 =", np.round(s3, 6))
print("s4 =", np.round(s4, 6))
\`\`\`

각 신호의 벡터공간 좌표는 수치적분에 따른 미세한 오차를 무시하면 다음과 같다.

[[table:
송신 신호 | 첫 번째 좌표 | 두 번째 좌표
$s_1(t)$ | 1 | 3
$s_2(t)$ | 2 | 5
$s_3(t)$ | 4 | -1
$s_4(t)$ | -3 | -2
]]

따라서 네 가지 4-ary 신호는 2차원 신호공간에서 서로 다른 네 점으로 표현된다.

$$
\\boxed{
\\begin{aligned}
\\mathbf{s}_1&=(1,3) \\\\
\\mathbf{s}_2&=(2,5) \\\\
\\mathbf{s}_3&=(4,-1) \\\\
\\mathbf{s}_4&=(-3,-2)
\\end{aligned}
}
$$

이후 수신 신호 역시 두 기저 함수에 투영하여 벡터공간 좌표를 구하면, 네 송신 신호의 좌표 중 가장 가까운 점을 선택하는 ML 검출을 수행할 수 있다.`,

        },
        { //문제 3.B
          "id": "18-3B",
          "title": "3.B.",
          "type": "python",
          consoleEnabled: true,
          starterCode: `import numpy as np
from scipy.io import loadmat

file_load("ch18/st_and_rt.mat")
mat = loadmat("st_and_rt.mat", simplify_cells=True)

# 스칼라 변수
L = int(mat["L"])
Ns = int(mat["Ns"])
tstep = float(mat["tstep"])

# 벡터 변수
p1t = np.asarray(mat["p1t"]).ravel()
p2t = np.asarray(mat["p2t"]).ravel()
rt = np.asarray(mat["rt"]).ravel()
s1t = np.asarray(mat["s1t"]).ravel()
s2t = np.asarray(mat["s2t"]).ravel()
s3t = np.asarray(mat["s3t"]).ravel()
s4t = np.asarray(mat["s4t"]).ravel()
tvector = np.asarray(mat["tvector"]).ravel()

a11 = sum(s1t * p1t) * tstep #a_11의 수치적분 구현, 2장의 문제 1 참고
a12 = sum(????) * tstep #완성해야 할 부분
s1 = np.array([a11, a12]); print("s1={}".format(s1))

#문제 3.A3의 py 스크립트에 아래를 추가.
data_bits_hat=np.empty(0) #복조된 비트를 저장하기 위한 벡터 초기화
for n in range(1,Ns+1):
    rt_nth=rt[(n-1)*L:n*L] # (Step 2) 수행
    z1=sum(rt_nth*p1t)*tstep; z2=??? # (Step 3) 수행
    z=np.array([z1, z2])
    ED_z_s1=sum(abs(z-s1)**2) # (Step 4) 수행, z와 s1 거리,
    ED_z_s2=??? # z와 s2 거리,
    ED_z_s3=??? # z와 s3 거리,
    ED_z_s4=??? # z와 s4 거리 계산.
    
    T=np.argmin([ED_z_s1, ED_z_s2, ED_z_s3, ED_z_s4]) # (Stpe 4), z와 가장 가까운 좌표 검출
    if (T==0):
        twobits_hat=np.array([0,0]) # <표 18.1>에 따라 검출된 두 비트를 twobits_hat에 대입
    elif (T==1):
        ???
    elif (T==2):
        ???
    else:
        ???
        

    data_bits_hat=np.append(data_bits_hat, twobits_hat) #검출된 비트를 비트열로 연결

import pickle
with open('data_bits_hat.pkl', 'wb') as f: pickle.dump(data_bits_hat,f)`,
          "prompt": `수신 신호 ‘rt’를 4-ary 신호 구간 단위로 끊어 각각에 대하여 벡터 공간 좌표를 계산하고 ML 검출을 이용해 해당 비트를 복조하고자 한다. 문제 3.A3에서 작성한 py 스크립트에 다음 (Step 1)~(Step 6)에 해당하는 코드를 추가하여 완성할 수 있다.

(Step 1) ‘n=1’로 둔다. 이 변수는 ‘rt’(의 샘플 벡터)에 포함된 4-ary 신호의 순차적인 색인(index)으로 사용된다.
(Step 2) ‘st_and_rt.mat’에 저장된 Python 변수 중, ‘L’은 4-ary 신호 샘플 벡터의 길이(신호당 샘플 수)였음을 상기하자. 아래와 같이 ‘rt’로부터, ‘n’ 번째 전송된 4-ary 신호에 대한 수신 신호 샘플 벡터 부분만 추출한다. 즉, ‘rt_nth=rt[(n-1)*L:n*L]’
(Step 3) ‘rt_nth’를 2차원 벡터 공간의 한 점(‘z=[z1, z2]’)으로 변환한다. (문제 3.A2, 3.A3의 답과 유사한 과정임)
(Step 4) 벡터 공간에서 ‘z’와 각 4-ary 신호의 좌표들의 유클리드 거리를 계산한다. 4-ary 신호 중 ‘z’와 가장 가까운 좌표를 가진 신호를 선택(ML 검출)한다.
(Step 5) 검출된 4-ary 신호를 <표 18.1>을 사용하여 두 비트 데이터로 디매핑한다.
(Step 6) 다음으로 수신된 4-ary 신호를 검출하기 위해 ‘n=n+1’로 증가시키고, (Step 2)로 돌아가 반복한다.
\`\`\`python
#문제 3.A3의 py 스크립트에 아래를 추가.
data_bits_hat=np.empty(0) #복조된 비트를 저장하기 위한 벡터 초기화
for n in range(1,Ns+1):
    rt_nth=rt[(n-1)*L:n*L] # (Step 2) 수행
    z1=sum(rt_nth*p1t)*tstep; z2=??? # (Step 3) 수행
    z=np.array([z1, z2])
    ED_z_s1=sum(abs(z-s1)**2) # (Step 4) 수행, z와 s1 거리,
    ED_z_s2=??? # z와 s2 거리,
    ED_z_s3=??? # z와 s3 거리,
    ED_z_s4=??? # z와 s4 거리 계산.
    
    T=np.argmin([ED_z_s1, ED_z_s2, ED_z_s3, ED_z_s4]) # (Stpe 4), z와 가장 가까운 좌표 검출
    if (T==0):
        twobits_hat=np.array([0,0]) # <표 18.1>에 따라 검출된 두 비트를 twobits_hat에 대입
    elif (T==1):
        ???
    elif (T==2):
        ???
    else:
        ???
        

    data_bits_hat=np.append(data_bits_hat, twobits_hat) #검출된 비트를 비트열로 연결

import pickle
with open('data_bits_hat.pkl', 'wb') as f: pickle.dump(data_bits_hat,f)
\`\`\`
위 py 스크립트를 완성한 후, 모든 라인에 대해 다음의 지침에 따라 주석(Comment)을 작성하시오.

(지침 1) '='이 있는 라인
  - '=' 왼쪽 변수의 목적(용도)을 설명하시오.
  - '=' 오른쪽 수식이 왜 해당 변수의 의미에 부합하는지 설명하시오.
(지침 2) '='이 없는 라인
  - 명령어의 기능을 설명하시오.
  - 왜 해당 명령을 수행하는지 설명하시오.

이후, py 스크립트를 수행하고, data_bits’의 복조 결과(‘data_bits_hat’)의 첫 30비트 결과를 출력하기 위해, Console에서 ‘print(data_bits_hat[0:30])’을 실행하여 결과를 확인하시오.
`,
          
referenceAnswer: `수신 신호를 심벌 단위로 분리한 뒤, 두 정규직교 기저 신호에 투영하여 수신 벡터의 좌표를 계산한다.

그다음 수신 벡터와 네 송신 신호의 좌표 사이의 제곱 유클리드 거리를 비교하여 가장 가까운 신호를 검출한다.

**완성된 Python 코드는 다음과 같다.**

\`\`\`python
import numpy as np  # 벡터 및 수치 연산에 사용
from scipy.io import loadmat  # MAT 파일 불러오기
import pickle  # 복조된 비트열 저장에 사용

# 실습에 필요한 MAT 파일을 불러온다.
file_load("ch18/st_and_rt.mat")
mat = loadmat("st_and_rt.mat", simplify_cells=True)

# 심벌당 샘플 수, 전체 심벌 수, 샘플 간격을 불러온다.
L = int(mat["L"])
Ns = int(mat["Ns"])
tstep = float(mat["tstep"])

# 두 정규직교 기저 신호의 샘플 벡터를 불러온다.
p1t = np.asarray(mat["p1t"]).ravel()
p2t = np.asarray(mat["p2t"]).ravel()

# 전체 수신 신호와 네 송신 신호를 불러온다.
rt = np.asarray(mat["rt"]).ravel()
s1t = np.asarray(mat["s1t"]).ravel()
s2t = np.asarray(mat["s2t"]).ravel()
s3t = np.asarray(mat["s3t"]).ravel()
s4t = np.asarray(mat["s4t"]).ravel()

# 각 송신 신호를 두 기저에 투영하여 벡터공간 좌표를 구한다.
a11 = sum(s1t * p1t) * tstep
a12 = sum(s1t * p2t) * tstep
s1 = np.array([a11, a12])

a21 = sum(s2t * p1t) * tstep
a22 = sum(s2t * p2t) * tstep
s2 = np.array([a21, a22])

a31 = sum(s3t * p1t) * tstep
a32 = sum(s3t * p2t) * tstep
s3 = np.array([a31, a32])

a41 = sum(s4t * p1t) * tstep
a42 = sum(s4t * p2t) * tstep
s4 = np.array([a41, a42])

# 복조된 비트를 저장할 정수형 배열을 초기화한다.
data_bits_hat = np.empty(0, dtype=np.uint8)

# 전체 수신 신호를 첫 번째부터 마지막 심벌까지 처리한다.
for n in range(1, Ns + 1):

    # n번째 심벌에 해당하는 L개의 수신 샘플을 추출한다.
    rt_nth = rt[(n-1)*L:n*L]

    # 수신 신호를 두 기저에 투영하여 수신 벡터의 좌표를 구한다.
    z1 = sum(rt_nth * p1t) * tstep
    z2 = sum(rt_nth * p2t) * tstep
    z = np.array([z1, z2])

    # 수신 벡터와 각 송신 신호 사이의 제곱 거리를 계산한다.
    ED_z_s1 = sum(abs(z - s1)**2)
    ED_z_s2 = sum(abs(z - s2)**2)
    ED_z_s3 = sum(abs(z - s3)**2)
    ED_z_s4 = sum(abs(z - s4)**2)

    # 거리가 가장 작은 신호의 인덱스를 검출한다.
    T = np.argmin([
        ED_z_s1, ED_z_s2,
        ED_z_s3, ED_z_s4
    ])

    # 검출된 신호를 표 18.1의 규칙에 따라 두 비트로 변환한다.
    if T == 0:
        twobits_hat = np.array([0, 0], dtype=np.uint8)
    elif T == 1:
        twobits_hat = np.array([0, 1], dtype=np.uint8)
    elif T == 2:
        twobits_hat = np.array([1, 0], dtype=np.uint8)
    else:
        twobits_hat = np.array([1, 1], dtype=np.uint8)

    # 검출한 두 비트를 전체 복조 비트열에 이어 붙인다.
    data_bits_hat = np.append(data_bits_hat, twobits_hat)

# 다음 문제에서 사용할 수 있도록 복조된 비트열을 저장한다.
with open("data_bits_hat.pkl", "wb") as f:
    pickle.dump(data_bits_hat, f)

# 복조 결과 중 처음 30비트를 출력한다.
print(data_bits_hat[0:30])
\`\`\`

**ML 검출 원리**

$n$번째 수신 신호를 두 정규직교 기저에 투영하면 다음의 수신 벡터를 얻는다.

$$
\\mathbf{z}=(z_1,z_2)
$$

여기서 각 좌표는 다음과 같다.

$$
z_1=\\int_0^1r_n(t)\\psi_1(t)\\,dt
$$

$$
z_2=\\int_0^1r_n(t)\\psi_2(t)\\,dt
$$

각 송신 신호의 벡터공간 좌표를 $\\mathbf{s}_i$라고 하면, 수신 벡터와의 제곱 유클리드 거리는

$$
D_i^2=\\|\\mathbf{z}-\\mathbf{s}_i\\|^2
$$

이다. AWGN 채널에서 네 신호의 사전확률이 동일할 경우, ML 검출은 이 거리가 가장 작은 송신 신호를 선택한다.

$$
\\boxed{
\\hat{i}=\\underset{i\\in\\{1,2,3,4\\}}{\\operatorname{argmin}}
\\|\\mathbf{z}-\\mathbf{s}_i\\|^2
}
$$

검출한 신호를 <표 18.1>에 따라 두 비트로 변환하고, 이를 모든 심벌에 반복하여 전체 비트열 \`data_bits_hat\`을 복원한다.

마지막으로 \`data_bits_hat.pkl\`에 복조 결과를 저장하고 처음 30비트를 출력하여 다음 문제에서 실제 송신 비트열과 비교할 수 있다.`,},
        { //문제 3.C
          "id": "18-3C",
          "title": "3.C.",
          "type": "python",
          consoleEnabled: true,
          starterCode: `import numpy as np
from scipy.io import loadmat

file_load("ch18/data_bits.mat")
mat = loadmat("data_bits.mat", simplify_cells=True)
data_bits = np.asarray(mat["data_bits"]).ravel()`,
          "prompt": `‘rt_gen.py’에서 수신 신호 샘플 벡터 ‘rt’를 생성할 때 쓰인 실제 송신 데이터 비트는 ‘ch18/data_bits.mat’에 저장되어 있다.

주어진 py 스크립트를 수행하고, Console에서 ‘print(data_bits[0:30])’을 실행하여 실제 송신 데이터 비트 중 첫 30비트를 캡쳐하여 보이고, 문제 3.B에서 얻은 복조 결과와 비교하여 비트 오류가 발생했는지 판단하시오.

(주의. 만약, 비트 오류가 발생했다면, 문제 3.B의 py 스크립트를 제대로 작성한 것이 아니므로, 반드시 비트 오류가 없을 때까지 문제 3.B의 자신의 py 스크립트에서 오류를 찾아 수정하여야 함. 특히, 변수(또는 벡터) 이름에 신호의 인덱스 {1,2,3,4}, 기저 신호의 인덱스 {1,2}가 수식 공식과 일치하는지 꼼꼼히 확인해야 함.)
          `,
          
referenceAnswer: `실제 송신 비트열 \`data_bits\`와 문제 3.B에서 복조한 비트열 \`data_bits_hat\`의 처음 30비트를 비교한다.

\`\`\`python
import numpy as np
import pickle
from scipy.io import loadmat

# 실제 송신 비트열 불러오기
file_load("ch18/data_bits.mat")
mat = loadmat("data_bits.mat", simplify_cells=True)
data_bits = np.asarray(mat["data_bits"]).ravel()

# 문제 3.B에서 복조한 비트열 불러오기
with open("data_bits_hat.pkl", "rb") as f:
    data_bits_hat = pickle.load(f)

data_bits_hat = np.asarray(data_bits_hat).ravel()

# 처음 30비트 비교
print("송신 비트:", data_bits[0:30])
print("복조 비트:", data_bits_hat[0:30])

# 처음 30비트에서 발생한 오류 수
errors = np.count_nonzero(
    data_bits[0:30] != data_bits_hat[0:30]
)

print("비트 오류 수:", errors)
\`\`\`

처음 30비트의 송신 결과와 복조 결과가 모두 일치하면, 해당 구간에서는 비트 오류가 발생하지 않은 것이다.

$$
\\boxed{N_{\\mathrm{error,30}}=0}
$$

다만 처음 30비트가 일치하더라도 나머지 비트에서 오류가 발생할 수 있다. 전체 비트열의 복조 성능은 다음 문제에서 BER(Bit Error Rate)을 계산하여 확인할 수 있다.

$$
\\mathrm{BER}
=
\\frac{\\text{오류가 발생한 비트 수}}
{\\text{전체 송신 비트 수}}
$$`,

        },
        { //문제 3.D
          "id": "18-3D",
          "title": "3.D.",
          "type": "python",
          consoleEnabled: true,
          starterCode: `# plot_received_image.py
import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat
from PIL import Image
import pickle

# ==========================================
# 1. 원본 비트열과 검출된 비트열 불러오기
# ==========================================

file_load("ch18/data_bits.mat")

mat = loadmat("data_bits.mat", simplify_cells=True)

data_bits = np.asarray(mat["data_bits"]).ravel().astype(np.uint8)

# 앞 문제에서 저장한 검출 결과
with open("data_bits_hat.pkl", "rb") as f:
    data_bits_hat = pickle.load(f)

data_bits_hat = np.asarray(data_bits_hat).ravel().astype(np.uint8)

# ==========================================
# 2. BER 계산
# ==========================================
if len(data_bits) != len(data_bits_hat):
    raise ValueError("원본과 검출 비트열의 길이가 다릅니다.")

BER = np.mean(data_bits != data_bits_hat)
print("BER =", BER)

# ==========================================
# 3. 원본 이미지의 크기 확인
# ==========================================
file_load("ch18/painting.jpg")

original = np.asarray(Image.open("painting.jpg").convert("RGB"))
sp = 2
original_small = original[::sp, ::sp, :]
h, w, channels = original_small.shape

# ==========================================
# 4. 검출된 비트열 → 이미지 픽셀
# ==========================================
N = len(data_bits_hat)
if N != h * w * 3 * 2:
    raise ValueError("비트열 길이와 이미지 크기가 일치하지 않습니다.")
half = N // 2
first_bits = data_bits_hat[:half]
second_bits = data_bits_hat[half:]

# 각 비트 쌍을 0, 1, 2, 3으로 변환
pixel_values = (2 * first_bits + second_bits) * 64
Bhat = pixel_values.reshape((h, w, 3), order="F").astype(np.uint8)

# ==========================================
# 5. 복원 이미지 확대
# ==========================================
E = 3
EB = np.repeat(np.repeat(Bhat, E, axis=0), E, axis=1)

# ==========================================
# 6. 이미지 표시
# ==========================================
plt.figure(figsize=(12, 5))
plt.imshow(EB)
plt.axis("off")
plt.tight_layout()
plt.show()

# ==========================================
# 7. 음악 재생
# ==========================================
from js import Blob, URL, Audio, Uint8Array
from pyodide.ffi import to_js

# dummy.mat 불러오기
file_load("ch18/dummy.mat")
mat = loadmat("dummy.mat")

# MP3 바이너리 데이터 추출
mp3_content = np.asarray(mat["mp3_content"], dtype=np.uint8).ravel()

# 검출된 비트열의 처음 30비트 확인
first_30_bits = "".join(str(int(bit)) for bit in data_bits_hat[:30])

if int(first_30_bits, 2) == 103009:
    mp3_array = Uint8Array.new(to_js(mp3_content.tolist()))
    blob = Blob.new(to_js([mp3_array]), to_js({"type": "audio/mpeg"})    )
    audio_url = URL.createObjectURL(blob)
    player = Audio.new(audio_url)

    # 음악 재생
    player.play()

    print("음악 재생을 멈추려면 >> player.pause() 를 실행하면 됨")

else:
    print("음악 재생 조건을 만족하지 않습니다.")`,
          "prompt": `주어진 py 스크립트 ‘plot_received_image.py’는 자신이 복조한 결과의 BER을 출력하고, 복조한 비트열로부터 이미지를 복원하여 그려준다.
          
문제 3.B에서 py 스크립트를 제대로 작성했다면, 주어진 py 스크립트를 수행했을 때 미술 작품 그림과 함께 이 작품을 주제로 하는 음악이 깨끗하게 끝까지 재생되어야 한다. 가사의 첫 소절에 나오는 이 미술 작품의 영문 제목은 무엇이며, 음악이 끝날 때 까지 총 몇 번 깨끗하게 나오는지 쓰시오 (영어 단어가 정확히 무엇인지 알지 못하는 경우, 소리나는 대로 한글로 표기하고 동일한 단어가 몇 번 나오는지 쓸 것)
(주의. 브라우저를 새로고침했거나 Chapter를 나갔다가 다시 들어오면 저장된 ‘data_bits_hat.pkl’이 사라지므로, 이 경우 문제 3.B의 py 스크립트를 다시 실행할 것)
           `,
          
referenceAnswer: `주어진 Python 스크립트를 실행하면 송신 비트열과 복조된 비트열을 비교하여 BER을 계산하고, 복조된 비트열로부터 이미지를 복원할 수 있다.

비트 오류율(BER)은 다음과 같다.

$$
\\mathrm{BER}
=
\\frac{\\text{오류가 발생한 비트 수}}
{\\text{전체 송신 비트 수}}
$$

이를 Python 코드로 계산하면 다음과 같다.

\`\`\`python
BER = np.mean(data_bits != data_bits_hat)
print("BER =", BER)
\`\`\`

주어진 실습 데이터의 정상적인 복조 결과에서는 BER이 약 $0.0044$이며, 복원된 이미지는 빈센트 반 고흐(Vincent van Gogh)의 작품 **The Starry Night(별이 빛나는 밤)**이다.

음악의 가사에서 반복되는 작품의 영문 제목은 **Starry Night**이며, 음악이 끝날 때까지 총 **4번** 들린다.

따라서 정답은 다음과 같다.

- **작품의 영문 제목:** The Starry Night
- **가사에서 반복되는 표현:** Starry Night
- **반복 횟수:** 4번

BER이 0이 아니더라도 대부분의 비트가 정상적으로 복조되면 원본 작품의 전체적인 형태와 색상을 알아볼 수 있다. 다만 비트 오류가 발생한 일부 픽셀에서는 원본 이미지와 색상이 다르게 나타날 수 있다.`,},
        { //문제 3.E
          "id": "18-3E",
          "title": "3.E.",
          "prompt": `[[link:/workbook/ch17?p=17-4A|17장의 문제 4]]에서와 같이 ‘rt_nth’와 각 ‘s1t’, ‘s2t’, ‘s3t’, ‘s4t’ 사이의 차이 에너지(Difference Energy)를 이용해 송신 데이터 비트열을 복조하는 py 스크립트를 작성하자.
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat

file_load("ch18/st_and_rt.mat")
mat = loadmat("st_and_rt.mat", simplify_cells=True)

# 스칼라 변수
L = int(mat["L"])
Ns = int(mat["Ns"])
tstep = float(mat["tstep"])

# 벡터 변수
p1t = np.asarray(mat["p1t"]).ravel()
p2t = np.asarray(mat["p2t"]).ravel()
rt = np.asarray(mat["rt"]).ravel()
s1t = np.asarray(mat["s1t"]).ravel()
s2t = np.asarray(mat["s2t"]).ravel()
s3t = np.asarray(mat["s3t"]).ravel()
s4t = np.asarray(mat["s4t"]).ravel()
tvector = np.asarray(mat["tvector"]).ravel()

data_bits_hat=np.empty(0) #복조된 비트를 저장하기 위한 벡터 초기화
for n in range(1,Ns+1):
    rt_nth=rt[(n-1)*L:n*L] # n번째 M-ary 수신 신호 샘플
    
    E_rt_s1t=sum(abs(?-?)**2)*tstep # rt_nth와 s1t와의 차이 에너지 수치적분
    ... # 이후 필요한 과정들이 무엇인지 생각하여 라인들을 적절히 구현.
    ...
    E_rt_s4t=??

    T=np.argmin([E_rt_s1t, ?, ?, ?])
    if (T==0):
        twobits_hat=?
    elif (??):
        ...
    elif (??):
        ...
    else:
        ...
        

    data_bits_hat=np.append(data_bits_hat, twobits_hat) #검출된 비트를 비트열로 연결

import pickle
with open('data_bits_hat.pkl', 'wb') as f: pickle.dump(data_bits_hat,f)
\`\`\`
           `
        },
        {
          "id": "18-3E1",
          "title": "3.E1.",
          "type": "python",
          consoleEnabled: true,
          starterCode: `import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat

file_load("ch18/st_and_rt.mat")
mat = loadmat("st_and_rt.mat", simplify_cells=True)

# 스칼라 변수
L = int(mat["L"])
Ns = int(mat["Ns"])
tstep = float(mat["tstep"])

# 벡터 변수
p1t = np.asarray(mat["p1t"]).ravel()
p2t = np.asarray(mat["p2t"]).ravel()
rt = np.asarray(mat["rt"]).ravel()
s1t = np.asarray(mat["s1t"]).ravel()
s2t = np.asarray(mat["s2t"]).ravel()
s3t = np.asarray(mat["s3t"]).ravel()
s4t = np.asarray(mat["s4t"]).ravel()
tvector = np.asarray(mat["tvector"]).ravel()

data_bits_hat=np.empty(0) #복조된 비트를 저장하기 위한 벡터 초기화
for n in range(1,Ns+1):
    rt_nth=rt[(n-1)*L:n*L] # n번째 M-ary 수신 신호 샘플
    
    E_rt_s1t=sum(abs(?-?)**2)*tstep # rt_nth와 s1t와의 차이 에너지 수치적분
    ... # 이후 필요한 과정들이 무엇인지 생각하여 라인들을 적절히 구현.
    ...
    E_rt_s4t=??

    T=np.argmin([E_rt_s1t, ?, ?, ?])
    if (T==0):
        twobits_hat=?
    elif (??):
        ...
    elif (??):
        ...
    else:
        ...
        

    data_bits_hat=np.append(data_bits_hat, twobits_hat) #검출된 비트를 비트열로 연결

import pickle
with open('data_bits_hat.pkl', 'wb') as f: pickle.dump(data_bits_hat,f)`,
          "prompt": `위 py 스크립트를 완성 후 실행하시오. 이후, 복조된 비트 중 첫 30비트 결과를 출력하기 위해, Console에서 ‘print(data_bits_hat[0:30])’을 실행하시오.`,
          
referenceAnswer: `차이 에너지(Difference Energy)를 이용한 검출은 수신 신호와 네 가지 송신 신호 사이의 차이 에너지를 각각 계산한 후, 그 값이 가장 작은 신호를 선택하는 방법이다.

$n$번째 수신 신호 $r_n(t)$와 후보 신호 $s_i(t)$ 사이의 차이 에너지는 다음과 같다.

$$
E_i=\\int_0^1|r_n(t)-s_i(t)|^2\\,dt
$$

수치적분을 적용하면 다음과 같이 계산할 수 있다.

$$
E_i\\approx
\\sum_{k=1}^{L}
|r_n[k]-s_i[k]|^2\\Delta t
$$

네 후보 신호에 대한 차이 에너지를 모두 계산하고, 가장 작은 값을 갖는 신호를 검출한다.

**완성된 Python 코드는 다음과 같다.**

\`\`\`python
import numpy as np
from scipy.io import loadmat
import pickle

# 실습 데이터를 불러온다.
file_load("ch18/st_and_rt.mat")
mat = loadmat("st_and_rt.mat", simplify_cells=True)

# 심벌당 샘플 수, 전체 심벌 수, 샘플 간격을 불러온다.
L = int(mat["L"])
Ns = int(mat["Ns"])
tstep = float(mat["tstep"])

# 수신 신호와 네 가지 송신 신호를 불러온다.
rt = np.asarray(mat["rt"]).ravel()
s1t = np.asarray(mat["s1t"]).ravel()
s2t = np.asarray(mat["s2t"]).ravel()
s3t = np.asarray(mat["s3t"]).ravel()
s4t = np.asarray(mat["s4t"]).ravel()

# 검출된 비트를 저장할 배열을 초기화한다.
data_bits_hat = np.empty(0, dtype=np.uint8)

# 전체 수신 신호를 심벌 단위로 나누어 검출한다.
for n in range(1, Ns + 1):

    # n번째 수신 심벌에 해당하는 L개의 샘플을 추출한다.
    rt_nth = rt[(n-1)*L:n*L]

    # 수신 심벌과 각 송신 신호 사이의 차이 에너지를 계산한다.
    E_rt_s1t = sum(abs(rt_nth - s1t)**2) * tstep
    E_rt_s2t = sum(abs(rt_nth - s2t)**2) * tstep
    E_rt_s3t = sum(abs(rt_nth - s3t)**2) * tstep
    E_rt_s4t = sum(abs(rt_nth - s4t)**2) * tstep

    # 차이 에너지가 가장 작은 신호의 인덱스를 검출한다.
    T = np.argmin([
        E_rt_s1t,
        E_rt_s2t,
        E_rt_s3t,
        E_rt_s4t
    ])

    # 검출한 신호를 두 비트로 디매핑한다.
    if T == 0:
        twobits_hat = np.array([0, 0], dtype=np.uint8)
    elif T == 1:
        twobits_hat = np.array([0, 1], dtype=np.uint8)
    elif T == 2:
        twobits_hat = np.array([1, 0], dtype=np.uint8)
    else:
        twobits_hat = np.array([1, 1], dtype=np.uint8)

    # 검출한 두 비트를 전체 복조 비트열에 이어 붙인다.
    data_bits_hat = np.append(data_bits_hat, twobits_hat)

# 복조된 비트열을 다음 문제에서 사용할 수 있도록 저장한다.
with open("data_bits_hat.pkl", "wb") as f:
    pickle.dump(data_bits_hat, f)

# 복조된 비트열의 처음 30비트를 출력한다.
print(data_bits_hat[0:30])
\`\`\`

**검출 원리**

네 가지 송신 신호 중 수신 신호와의 차이 에너지가 가장 작은 신호를 선택한다.

$$
\\boxed{
\\hat{i}
=
\\underset{i\\in\\{1,2,3,4\\}}{\\operatorname{argmin}}
\\int_0^1|r_n(t)-s_i(t)|^2\\,dt
}
$$

AWGN 채널에서 네 송신 신호의 사전확률이 동일하다면 이 과정은 ML 검출에 해당한다.

검출된 신호를 00, 01, 10, 11 중 하나로 변환하고, 모든 심벌에 대해 반복하면 전체 비트열 \`data_bits_hat\`을 얻는다.`,

        },
        {
          "id": "18-3E2",
          "title": "3.E2.",
          "type": "essay",
          "prompt": `송신한 비트가 제대로 복조되었는가?
          `,
          
referenceAnswer: `차이 에너지 검출을 통해 얻은 \`data_bits_hat\`의 처음 30비트를 실제 송신 비트열 \`data_bits\`와 비교한다.

\`\`\`python
file_load("ch18/data_bits.mat")

mat = loadmat("data_bits.mat", simplify_cells=True)
data_bits = np.asarray(mat["data_bits"]).ravel()

print("송신 비트:", data_bits[0:30])
print("복조 비트:", data_bits_hat[0:30])

errors = np.count_nonzero(
    data_bits[0:30] != data_bits_hat[0:30]
)

print("비트 오류 수:", errors)
\`\`\`

처음 30비트의 송신 결과와 복조 결과가 모두 일치한다면, 해당 구간에서는 비트 오류가 발생하지 않은 것이다.

$$
\\boxed{N_{\\mathrm{error,30}}=0}
$$

그러나 처음 30비트가 정상적으로 복조되더라도 전체 비트열에는 AWGN으로 인한 오류가 남아 있을 수 있다.

따라서 전체 복조 성능은 다음 문제에서 BER을 계산하여 확인한다.`},
        {
          "id": "18-3E3",
          "title": "3.E3.",
          "type": "python",
          consoleEnabled: true,
          starterCode: `# plot_received_image.py
import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat
from PIL import Image
import pickle

# ==========================================
# 1. 원본 비트열과 검출된 비트열 불러오기
# ==========================================

file_load("ch18/data_bits.mat")

mat = loadmat("data_bits.mat", simplify_cells=True)

data_bits = np.asarray(mat["data_bits"]).ravel().astype(np.uint8)

# 앞 문제에서 저장한 검출 결과
with open("data_bits_hat.pkl", "rb") as f:
    data_bits_hat = pickle.load(f)

data_bits_hat = np.asarray(data_bits_hat).ravel().astype(np.uint8)

# ==========================================
# 2. BER 계산
# ==========================================
if len(data_bits) != len(data_bits_hat):
    raise ValueError("원본과 검출 비트열의 길이가 다릅니다.")

BER = np.mean(data_bits != data_bits_hat)
print("BER =", BER)

# ==========================================
# 3. 원본 이미지의 크기 확인
# ==========================================
file_load("ch18/painting.jpg")

original = np.asarray(Image.open("painting.jpg").convert("RGB"))
sp = 2
original_small = original[::sp, ::sp, :]
h, w, channels = original_small.shape

# ==========================================
# 4. 검출된 비트열 → 이미지 픽셀
# ==========================================
N = len(data_bits_hat)
if N != h * w * 3 * 2:
    raise ValueError("비트열 길이와 이미지 크기가 일치하지 않습니다.")
half = N // 2
first_bits = data_bits_hat[:half]
second_bits = data_bits_hat[half:]

# 각 비트 쌍을 0, 1, 2, 3으로 변환
pixel_values = (2 * first_bits + second_bits) * 64
Bhat = pixel_values.reshape((h, w, 3), order="F").astype(np.uint8)

# ==========================================
# 5. 복원 이미지 확대
# ==========================================
E = 3
EB = np.repeat(np.repeat(Bhat, E, axis=0), E, axis=1)

# ==========================================
# 6. 이미지 표시
# ==========================================
plt.figure(figsize=(12, 5))
plt.imshow(EB)
plt.axis("off")
plt.tight_layout()
plt.show()

# ==========================================
# 7. 음악 재생
# ==========================================
from js import Blob, URL, Audio, Uint8Array
from pyodide.ffi import to_js

# dummy.mat 불러오기
file_load("ch18/dummy.mat")
mat = loadmat("dummy.mat")

# MP3 바이너리 데이터 추출
mp3_content = np.asarray(mat["mp3_content"], dtype=np.uint8).ravel()

# 검출된 비트열의 처음 30비트 확인
first_30_bits = "".join(str(int(bit)) for bit in data_bits_hat[:30])

if int(first_30_bits, 2) == 103009:
    mp3_array = Uint8Array.new(to_js(mp3_content.tolist()))
    blob = Blob.new(to_js([mp3_array]), to_js({"type": "audio/mpeg"})    )
    audio_url = URL.createObjectURL(blob)
    player = Audio.new(audio_url)

    # 음악 재생
    player.play()

    print("음악 재생을 멈추려면 >> player.pause() 를 실행하면 됨")

else:
    print("음악 재생 조건을 만족하지 않습니다.")`,
          "prompt": `주어진 py 스크립트 ‘plot_received_image.py’를 실행하여 BER과 수신 이미지를 확인하시오.
(주의. 브라우저를 새로고침했거나 Chapter를 나갔다가 다시 들어오면 저장된 ‘data_bits_hat.pkl’이 사라지므로, 이 경우 문제 3.E1의 py 스크립트를 다시 실행할 것)
           `,
          
referenceAnswer: `문제 3.E1에서 차이 에너지 검출을 통해 복원한 \`data_bits_hat\`을 실제 송신 비트열 \`data_bits\`와 비교하여 BER을 계산한다.

$$
\\mathrm{BER}
=
\\frac{N_{\\mathrm{error}}}{N_b}
$$

여기서 $N_{\\mathrm{error}}$는 오류가 발생한 비트 수이고, $N_b$는 전체 송신 비트 수이다.

주어진 Python 코드에서는 다음과 같이 계산한다.

\`\`\`python
BER = np.mean(data_bits != data_bits_hat)
print("BER =", BER)
\`\`\`

정상적으로 복조한 경우 BER은 약 $0.0044$ 수준이며, 복원된 이미지는 빈센트 반 고흐의 **The Starry Night(별이 빛나는 밤)**이다.

BER이 0이 아니더라도 대부분의 비트가 올바르게 복조되면 원본 이미지의 전체적인 형태를 알아볼 수 있다. 다만 일부 비트 오류로 인해 픽셀의 색상이 원본 이미지와 다르게 나타날 수 있다.

또한 처음 30비트가 음악 재생 조건을 만족하면 작품을 주제로 하는 음악을 재생할 수 있다.`},
        {
          "id": "18-3E4",
          "title": "3.E4.",
          "type": "essay",
          "prompt": `문제 3.D의 결과와 비교하고, 차이 에너지(Difference Energy)를 이용한 복조 방법과 벡터 공간에서 거리를 이용한 복조 방법 중 더 좋은 BER 성능을 갖는 것은 어떤 것인지 쓰시오. 그리고, 이러한 결과가 나오는 이유도 쓰시오.
          `,
          
referenceAnswer: `차이 에너지(Difference Energy)를 이용한 복조 방법과 벡터공간에서 거리를 이용한 복조 방법은 동일한 AWGN 환경에서 이론적으로 같은 ML 검출 결과를 얻는다. 따라서 두 방법의 BER 성능은 동일하다.

**두 방법이 동일한 결과를 얻는 이유는 다음과 같다.**

수신 신호를 $r(t)$, $i$번째 송신 후보를 $s_i(t)$라고 하면, 차이 에너지는 다음과 같다.

$$
E_i
=
\\int_0^1|r(t)-s_i(t)|^2\\,dt
$$

수신 신호를 정규직교 기저가 형성하는 신호공간에 투영한 좌표를 $\\mathbf{z}$, 각 송신 신호의 좌표를 $\\mathbf{s}_i$라고 하자.

수신 신호에서 신호공간에 속하지 않는 성분을 $r_\\perp(t)$라고 하면, 직교성에 의해 차이 에너지는 다음과 같이 분해된다.

$$
E_i
=
\\|\\mathbf{z}-\\mathbf{s}_i\\|^2
+
\\int_0^1|r_\\perp(t)|^2\\,dt
$$

두 번째 항은 어떤 송신 신호 후보를 선택하더라도 동일한 값이다. 따라서 차이 에너지가 가장 작은 신호를 선택하는 것은 벡터공간에서 제곱 유클리드 거리가 가장 작은 신호를 선택하는 것과 같다.

$$
\\boxed{
\\underset{i}{\\operatorname{argmin}}\\ E_i
=
\\underset{i}{\\operatorname{argmin}}
\\|\\mathbf{z}-\\mathbf{s}_i\\|^2
}
$$

즉, 두 방법은 서로 다른 방식으로 계산하지만 최종적으로 동일한 송신 신호를 검출하므로 BER 성능에 차이가 없다.

본 실습에서는 두 복조 방법 모두 약 $0.0044$의 BER을 얻을 수 있으며, 실제 비교에서는 각 Python 스크립트가 출력한 BER 값을 확인한다.`},
      ]
    }
  ]
} as const;
