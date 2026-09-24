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
          referenceAnswer: `주어진 비트열을 두 비트씩 나누면 \`01 10 11 01 00 01 11 01 00 11 10\`이다. 표 18.1의 00→s1, 01→s2, 10→s3, 11→s4를 적용하면 차례대로 s2, s3, s4, s2, s1, s2, s4, **s2, s1, s4, s3**를 전송한다. 따라서 네 빈칸은 s2(t), s1(t), s4(t), s3(t)이다.`,

        },
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
          referenceAnswer: `제공된 스크립트를 실행하면 L, Ns, tstep은 숫자로, p1t, p2t, s1t~s4t, tvector, rt는 1차원 NumPy 배열로 불러온다. 제공된 MATLAB 리포트에 기록된 자료에서는 L=32, Ns=37830, 각 기저·심벌 벡터 길이=32, rt 길이=1,210,560이다. 다른 MAT 파일을 배포한다면 실제 출력값을 기준으로 확인한다.

\`\`\`python
print('L =', L, 'Ns =', Ns, 'tstep =', tstep)
for name in ('p1t','p2t','s1t','s2t','s3t','s4t','tvector','rt'):
    print(name, np.shape(globals()[name]))
\`\`\``,

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
          referenceAnswer: `(a) ① \`p1t\`, ② \`p2t\`.

(b) ③ 1초, ④ 1/32초(0.03125초), ⑤ \`tstep\`, ⑥ 32개. \`T=1\`, \`L=32\`, \`tstep=T/L\`이고 \`tvector=np.arange(1,L+1)*tstep\`이기 때문이다.`,

        },
        { 
          "id": "18-1C2",
          "title": "1.C2.",
          "type": "essay",
          "prompt": `‘rt_gen.py’의 Python 변수 중, 벡터 ‘data_bits’는 송신 데이터(이미지 파일)의 비트열이고, ‘Nb’는 송신 데이터의 총 비트 수(비트열의 길이)다. 송신 데이터 비트열을 4-ary 신호로 전송할 때, 총 ‘Ns’ 번의 4-ary 신호 전송이 필요하다. ‘rt_gen.py’에서 ‘Ns’가 어떻게 설정되어 있는지 쓰고, 그렇게 설정된 이유를 쓰시오.
          `,
          referenceAnswer: `\`Ns = Nb // 2\`이다. 4-ary 심벌 하나가 00, 01, 10, 11 중 하나이므로 두 비트를 전달한다. 전체 \`Nb\`개 비트를 보내려면 \`Nb/2\`개 심벌을 전송해야 한다(총 비트 수가 짝수인 경우).`,

        },
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
          referenceAnswer: `(a) 나머지 두 수치적분은 다음과 같다.

$$\\int_0^1\\psi_2^2(t)\\,dt\\quad\\text{및}\\quad\\int_0^1\\psi_1(t)\\psi_2(t)\\,dt.$$

(b) \`sum(p1t**2)*tstep\`과 \`sum(p2t**2)*tstep\`은 각각 약 1이고, \`sum(p1t*p2t)*tstep\`은 약 0이다. 각 기저의 에너지는 1이고 서로 내적은 0이므로 정규직교 기저이다. 보고서에서는 세 번째 결과가 약 -2.3×10⁻¹⁷로 나타났다.`,

        },
        { 
          "id": "18-1C4",
          "title": "1.C4.",
          "type": "essay",
          "prompt": `‘rt_gen.py’에서 ‘xt’는 변조된 4-ary 송신 신호임을 알 수 있다. ‘xt’는 송신 데이터 비트(‘data_bits’)를 두 비트 단위로 끊어, 그 값에 따라 <표 18.1>의 규칙에 따라 ‘s1t’, ‘s2t’, ‘s3t’, ‘s4t’ 중 하나를 연달아 이어 붙임으로써 생성됨을 알 수 있다. 그런 다음, py 스크립트에서 어떤 추가 과정을 거쳐 수신 신호 Python 벡터 ‘rt’가 생성되는가?
          `,
          referenceAnswer: `송신 신호 벡터 \`xt\`에 평균 0의 가우시안 잡음을 더해 수신 신호 \`rt\`를 생성한다. 현재 제시된 Python 예시에서는 \`noise_sample = 6 * rng.standard_normal(xt_len)\`이고 \`rt = xt + noise_sample\`이다. 따라서 잡음의 이론적 표준편차는 6이다(이전 MATLAB 리포트에 쓰인 표준편차 3과 구분). 참고로 예시 코드를 실제 실행하려면 \`rng = np.random.default_rng()\`를 먼저 정의해야 한다.`,

        },
        { 
          "id": "18-1C5",
          "title": "1.C5.",
          "type": "essay",
          "prompt": `결국, ‘rt[0:L]’는 처음 전송된 4-ary 신호에 대한 수신 신호 샘플 벡터, ‘rt[L:L+L]’는 두 번째로 전송된 4-ary 신호에 대한 수신 신호 샘플 벡터, ‘rt[2*L:3*L]’는 세 번째로 전송된 4-ary 신호에 대한 수신 신호 샘플 벡터에 해당한다. 그렇다면, $n$번째로 전송된 4-ary 신호에 대한 수신 신호 샘플 벡터는 어떻게 ‘rt[?:?]’로 나타낼 수 있는지 쓰시오.`,
          referenceAnswer: `Python의 0부터 시작하는 인덱스와 종료 위치 미포함 규칙을 적용하면 n번째 심벌의 수신 샘플은 **\`rt[(n-1)*L : n*L]\`**이다. 예를 들어 L=32일 때 첫 번째는 \`rt[0:32]\`, 다섯 번째는 \`rt[128:160]\`이다.`,

        },
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
          referenceAnswer: `네 신호는 모두 길이 32의 샘플 벡터이다. 아래처럼 같은 시간축에 각각 그릴 수 있다. 보고서의 벡터공간 좌표는 s1=(1,3), s2=(2,5), s3=(4,-1), s4=(-3,-2)이므로 각 파형은 해당 기저의 서로 다른 선형결합이다.

\`\`\`python
import matplotlib.pyplot as plt
fig, axes = plt.subplots(2, 2, figsize=(10, 6))
for ax, signal, name in zip(axes.flat, (s1t,s2t,s3t,s4t), ('s1','s2','s3','s4')):
    ax.plot(tvector, signal)
    ax.set_title(name + '(t)')
    ax.set_xlabel('Time (s)')
    ax.grid(True)
plt.tight_layout()
plt.show()
\`\`\``,

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
          referenceAnswer: `\`len(rt)\`는 전체 수신 신호의 샘플 수이다. 제공된 리포트 기준으로 1,210,560개이며, \`Ns*L = 37830*32\`와 일치한다.

\`\`\`python
print(len(rt))
plt.figure(figsize=(10, 3))
plt.plot(rt)
plt.xlabel('Sample index')
plt.ylabel('Amplitude')
plt.grid(True)
plt.show()
\`\`\``,

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
          referenceAnswer: `\`len(s1t)\`, \`len(s2t)\`, \`len(s3t)\`, \`len(s4t)\`은 모두 **32**이다. 4-ary 신호 하나당 \`L=32\`개의 샘플로 생성되기 때문이다.

\`\`\`python
print(len(s1t), len(s2t), len(s3t), len(s4t))
# 32 32 32 32
\`\`\``,

        },
        {
          "id": "18-2B3",
          "title": "2.B3.",
          "type": "essay",
          "prompt": `$r(t)$는 4-ary 신호 열을 이어 붙여 만든 것임을 상기하자. 문제 2.B1, 2.B2의 결과, 그리고 4-ary 신호당 전송하는 비트 수를 이용하여, 이미지 파일의 전체 비트 수를 계산하시오.`,
          referenceAnswer: `4-ary 심벌당 2비트를 전송하므로 전체 비트 수는 \`Nb = 2 * len(rt) // L = 2*Ns\`이다. 제공된 리포트의 \`len(rt)=1,210,560\`, \`L=32\`, \`Ns=37,830\`을 대입하면 **75,660비트**이다.`,

        },
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
          referenceAnswer: `첫 번째 수신 심벌은 \`rt[0:32]\`이다. \`plt.axis([0,32,-20,20])\`으로 확대하여 2.A의 네 기준 파형과 비교한다. 보고서에서도 AWGN으로 원래 파형이 상당히 왜곡되어 육안으로 특정 심벌을 확정하기 어렵다고 기록했다. 심벌을 정확하게 판정하려면 3번 문제의 ML 검출을 사용한다.`,

        },
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
          referenceAnswer: `다섯 번째 심벌은 Python에서 인덱스 128~159이므로 확대 범위는 **\`plt.axis([128,160,-20,20])\`**이다. 보고서의 MATLAB 범위 \`[129,160]\`은 1부터 시작하는 인덱스이므로 Python에서는 128부터 시작한다. 잡음 때문에 그래프의 모양만으로는 어떤 심벌이 송신됐는지 확정하기 어렵다.`,

        },
        {
          "id": "18-2C3",
          "title": "2.C3.",
          "type": "essay",
          "prompt": `$r(t)$는 4-ary 신호 $\\{s_1(t), s_2(t), s_3(t), s_4(t)\\}$를 이어 붙여 전송한 것이다. 그런데, 문제 2.C1~2.C2에서 눈으로 판별하는 것이 어려웠다면, 그 이유를 쓰시오.
          `,
          referenceAnswer: `AWGN 채널에서 수신 신호는 \`r(t)=s_i(t)+n(t)\`가 된다. 잡음이 매 샘플의 진폭을 변화시켜 네 기준 파형과의 차이가 커지므로, 32개 샘플만 육안으로 비교해서 송신 심벌을 안정적으로 판별하기 어렵다.`,

        },
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
a_{ik}=
\\int_{t_1}^{t_2}s_i(t) \\psi_k^{*}(t)\\,dt
=\\int_{t_1}^{t_2}s_i(t) \\psi_k(t)\\,dt
(\\psi_k(t)\\text{가 실수 신호인 경우.})
\\qquad \\text{(식 18.3)}
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
          referenceAnswer: `정규직교 기저 조건은 \`∫ ψ_l(t) ψ_k*(t) dt = δ_lk\`이다. 이를 이용해 식 18.1을 식 18.3의 우변에 대입하면

$$\\begin{aligned}\\int_{t_1}^{t_2}s_i(t)\\psi_k^*(t)\\,dt &= \\int_{t_1}^{t_2}\\left(\\sum_{l=1}^{N}a_{il}\\psi_l(t)\\right)\\psi_k^*(t)\\,dt\\\\ &= \\sum_{l=1}^{N}a_{il}\\int_{t_1}^{t_2}\\psi_l(t)\\psi_k^*(t)\\,dt\\\\ &= \\sum_{l=1}^{N}a_{il}\\delta_{lk}=a_{ik}.\\end{aligned}$$

따라서 식 18.3은 신호의 k번째 벡터공간 좌표를 추출한다.`,

        },
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
          referenceAnswer: `빈칸은 \`s1t * p2t\`이다. 두 기저와 내적하여 첫 번째 심벌의 좌표를 계산한다.

\`\`\`python
a11 = np.sum(s1t * p1t) * tstep
a12 = np.sum(s1t * p2t) * tstep
s1 = np.array([a11, a12])
print('s1 =', s1)
# 제공된 MATLAB 리포트 기준: [1. 3.]
\`\`\``,

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
          referenceAnswer: `네 심벌을 각각 \`p1t\`, \`p2t\`에 투영하면 된다. MATLAB 리포트의 결과는 **s1=(1,3), s2=(2,5), s3=(4,-1), s4=(-3,-2)**이다.

\`\`\`python
s1 = np.array([np.sum(s1t*p1t)*tstep, np.sum(s1t*p2t)*tstep])
s2 = np.array([np.sum(s2t*p1t)*tstep, np.sum(s2t*p2t)*tstep])
s3 = np.array([np.sum(s3t*p1t)*tstep, np.sum(s3t*p2t)*tstep])
s4 = np.array([np.sum(s4t*p1t)*tstep, np.sum(s4t*p2t)*tstep])
for name, v in (('s1',s1),('s2',s2),('s3',s3),('s4',s4)):
    print(name, np.round(v, 6))
\`\`\``,

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
          referenceAnswer: `다음은 문제 3.A3의 좌표 계산에 이어 작성하는 벡터공간 ML 검출 코드이다. 수신 신호를 심벌별로 나누어 두 기저에 투영하고 네 신호 좌표까지의 제곱 유클리드 거리가 가장 작은 심벌을 검출한다. 저장 파일은 다음 문제에서 재사용한다.

\`\`\`python
import numpy as np
import pickle
from scipy.io import loadmat
file_load('ch18/st_and_rt.mat')
m = loadmat('st_and_rt.mat', simplify_cells=True)
L, Ns, tstep = int(m['L']), int(m['Ns']), float(m['tstep'])
p1t, p2t = np.ravel(m['p1t']), np.ravel(m['p2t'])
rt = np.ravel(m['rt'])
S = np.stack([np.ravel(m[k]) for k in ('s1t','s2t','s3t','s4t')])
coords = np.stack([np.sum(S*p1t, axis=1)*tstep,
                   np.sum(S*p2t, axis=1)*tstep], axis=1)
labels = np.array([[0,0],[0,1],[1,0],[1,1]], dtype=np.uint8)
data_bits_hat = np.empty(2*Ns, dtype=np.uint8)
for n in range(Ns):
    rt_nth = rt[n*L:(n+1)*L]
    z = np.array([np.sum(rt_nth*p1t)*tstep,
                  np.sum(rt_nth*p2t)*tstep])
    distances = np.sum((coords-z)**2, axis=1)
    T = np.argmin(distances)
    data_bits_hat[2*n:2*n+2] = labels[T]
with open('data_bits_hat.pkl','wb') as f:
    pickle.dump(data_bits_hat, f)
print('First 30 bits:', data_bits_hat[:30])
\`\`\`

문제의 빈칸을 직접 채우는 경우 \`z2=sum(rt_nth*p2t)*tstep\`, \`ED_z_s2=sum(abs(z-s2)**2)\`, \`ED_z_s3=sum(abs(z-s3)**2)\`, \`ED_z_s4=sum(abs(z-s4)**2)\`이다. \`T=0,1,2,3\`이면 각각 \`[0,0]\`, \`[0,1]\`, \`[1,0]\`, \`[1,1]\`로 디매핑한다.`,

        },
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
          referenceAnswer: `실제 송신 비트열을 읽어 앞의 복조 결과와 처음 30비트를 비교한다. 리포트에서는 처음 30비트에 오류가 없었다. 그러나 **처음 30비트가 일치한다고 전체 BER이 0이라는 뜻은 아니다.** 전체 오류율은 3.D에서 구한다.

\`\`\`python
import pickle
import numpy as np
from scipy.io import loadmat
file_load('ch18/data_bits.mat')
data_bits = np.asarray(loadmat('data_bits.mat')['data_bits']).ravel().astype(np.uint8)
with open('data_bits_hat.pkl','rb') as f:
    data_bits_hat = np.asarray(pickle.load(f)).ravel().astype(np.uint8)
print('Original  :', data_bits[:30])
print('Recovered :', data_bits_hat[:30])
print('Errors in first 30:', np.count_nonzero(data_bits[:30]!=data_bits_hat[:30]))
\`\`\``,

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
          referenceAnswer: `앞 문제의 \`data_bits_hat.pkl\`을 읽고 \`data_bits.mat\`과 비교하여 \`BER=np.mean(data_bits!=data_bits_hat)\`를 출력한다. 이후 제공된 \`painting.jpg\`의 크기에 맞게 비트열을 이미지로 복원하고 조건을 만족하면 \`dummy.mat\`의 MP3를 재생한다. MATLAB 리포트에는 BER 약 **0.0044** 및 복원된 빈센트 반 고흐의 **The Starry Night** 이미지가 기록되어 있다. 음악에서 작품 제목을 나타내는 'Starry Night'가 총 **4번** 들린다고 보고했다. 배포된 MAT 파일과 Python 검출 결과에 따라 BER은 실제 실행값으로 확인해야 한다. \`player.play()\`는 브라우저의 자동 재생 제한으로 사용자 동작 없이 차단될 수 있다.`,

        },
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
          referenceAnswer: `차이 에너지 ML 검출은 각 후보 신호와 수신 신호의 차이 제곱을 합산해 가장 작은 후보를 선택한다. 문제에 주어진 빈칸은 \`E_rt_s1t=sum(abs(rt_nth-s1t)**2)*tstep\`이며 s2t~s4t도 같은 방식이다.

\`\`\`python
import numpy as np
import pickle
from scipy.io import loadmat
file_load('ch18/st_and_rt.mat')
m = loadmat('st_and_rt.mat', simplify_cells=True)
L, Ns, tstep = int(m['L']), int(m['Ns']), float(m['tstep'])
rt = np.asarray(m['rt']).ravel()
S = np.stack([np.asarray(m[k]).ravel() for k in ('s1t','s2t','s3t','s4t')])
labels = np.array([[0,0],[0,1],[1,0],[1,1]], dtype=np.uint8)
data_bits_hat = np.empty(2*Ns, dtype=np.uint8)
for n in range(Ns):
    rt_nth = rt[n*L:(n+1)*L]
    energies = np.sum(np.abs(S-rt_nth)**2, axis=1)*tstep
    T = np.argmin(energies)
    data_bits_hat[2*n:2*n+2] = labels[T]
with open('data_bits_hat.pkl','wb') as f:
    pickle.dump(data_bits_hat, f)
print(data_bits_hat[:30])
\`\`\``,

        },
        {
          "id": "18-3E2",
          "title": "3.E2.",
          "type": "essay",
          "prompt": `송신한 비트가 제대로 복조되었는가?
          `,
          referenceAnswer: `차이 에너지 검출 결과의 처음 30비트를 실제 \`data_bits\`와 비교한다. 제공된 MATLAB 리포트에서는 처음 30비트가 동일하게 복조되었다. 단, 전체 비트열에는 잡음으로 인한 소수의 오류가 남을 수 있으므로 전체 성공 여부는 BER로 판단한다.`,

        },
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
          referenceAnswer: `문제 3.E1에서 생성한 \`data_bits_hat.pkl\`에 대해 주어진 이미지 복원 코드를 실행한다. \`BER=np.mean(data_bits!=data_bits_hat)\`로 오류율을 구하고, 복원 이미지를 확인한다. MATLAB 리포트에서는 차이 에너지 검출의 BER도 약 **0.0044**였고, 복원된 **The Starry Night**가 표시되었다. 실제 Python 실행에서 얻은 BER 및 이미지 상태를 함께 제시한다. \`dummy.mat\` 음악 재생은 처음 30비트의 조건 만족 여부와 브라우저 재생 권한에 따라 달라질 수 있다.`,

        },
        {
          "id": "18-3E4",
          "title": "3.E4.",
          "type": "essay",
          "prompt": `문제 3.D의 결과와 비교하고, 차이 에너지(Difference Energy)를 이용한 복조 방법과 벡터 공간에서 거리를 이용한 복조 방법 중 더 좋은 BER 성능을 갖는 것은 어떤 것인지 쓰시오. 그리고, 이러한 결과가 나오는 이유도 쓰시오.
          `,
          referenceAnswer: `두 방법은 **이상적인 정규직교 기저와 동일한 AWGN 조건**에서 같은 ML 검출 결정을 내리므로 이론적으로 BER 성능이 동일하다. 수신 벡터 \`r\`과 후보 \`s_i\`의 차이 에너지는 기저공간으로 투영한 좌표 \`z\`와 심벌 좌표 \`s_i\` 사이의 거리 제곱에, 모든 후보에 공통인 직교 여공간 잡음 에너지를 더한 값이다. 공통항은 \`argmin\` 결과에 영향을 주지 않는다. MATLAB 리포트에서는 두 방식 모두 BER 약 **0.0044**였다. 실습 데이터의 실제 BER은 실행으로 확인한다.`,

        },
      ]
    }
  ]
} as const;
