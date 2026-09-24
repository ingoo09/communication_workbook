import type { WorkbookChapter } from '@/types/workbook';

export const chapter = {
  "id": "19-cor-ml",
  "title": "Chapter 19. Correlator-based ML Detection",
  "sections": [
    { //문제 1
      "id": "19-1",
      "title": "1. 벡터 공간에서 AWGN의 통계적 특성",
      "problems": [
        { //문제 1.A
          "id": "19-1A",
          "title": "1.A.",
          "type": "python",
          "prompt": `벡터 공간에서 노이즈 성분의 통계적 특성을 실험으로 알아보자. 18장에서 사용한 ‘st_and_rt.mat’을 다시 load 한다.

아래 py 스크립트는 ‘st_and_rt.mat’에 저장된 변수 중 ‘rt’를 제외한 나머지 다른 신호 샘플 벡터들 즉, 4-ary 신호의 샘플 벡터인 ‘s1t’, ‘s2t’, ‘s3t’, ‘s4t’와 2개의 직교 기저 함수의 샘플 벡터인 ‘p1t’, ‘p2t’를 이번 문제에서 그대로 사용한다. 바로 다음에는 100,000개의 4-ary 심벌 (200,000비트) 시간에 해당하는 수신 신호 ‘rt’를 새롭게 생성하는 라인을 추가하여, 수신 신호 샘플 벡터 ‘rt’를 수정했다. 1개의 4-ary 심벌의 샘플 수가 ‘L’ 개이므로, ‘rt’의 길이는 ‘L*100000’이 된다. 아래 py 스크립트를 통해 생성된 수신 신호 ‘rt’는 데이터 신호가 없이 오직 노이즈로만 채워져 있음을 알 수 있다.
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

noise_sample=2*np.random.randn(L*100000) # AWGN
rt=noise_sample # 오직 노이즈뿐인 수신 신호
\`\`\`
아래 코드는 오직 노이즈로만 채워진 수신 신호 ‘rt’를, [[link:/workbook/ch18?p=18-3B|18장의 문제 3.B]]에서 수행한 것과 같이, 벡터 공간의 점으로 변환한다. 총 70,000개의 M-ary 심벌 주기 동안 수신 신호의 벡터 공간 좌표(‘z1’, ‘z2’)를 계산한다. 본 문제에서는 실험을 통해 ‘z1’과 ‘z2’의 상관관계를 확인한다. 본 문제에서 수행하는 ‘z1’과 ‘z2’의 상관관계를 확인하는 실험 방법은 경험적 방법 중 하나이다. 구체적으로, ‘z1’이 2개의 분리된 임의의 영역 ‘R1’과 ‘R2’에 포함될 때, ‘z2’를 각각 수집한다. 즉, 수신 신호를 벡터 공간상의 좌표(‘z1’, ‘z2’)로 변환한 후, ‘z1’ 값이 ‘R1’ 영역에 있는 경우의 ‘z2’ 값과, ‘z1’ 값이 ‘R2’ 영역에 있는 경우의 ‘z2’ 값을 각각 분리하여 수집한다. 그리고, 수집한 2개의 ‘z2’ 집합의 확률밀도함수를 각각 구한다. 이는 ‘z1’의 조건에 따라 수집한 ‘z2’들로 구한 것이므로, 조건부 확률밀도함수가 되고, 2개의 조건부 확률밀도함수가 같은지 확인함으로써, ‘z1’과 ‘z2’의 상관관계를 알아낼 수 있다. 실험을 수행하기 위해, 아래 py 스크립트에서는 ‘R1’ 영역을 [0, 0.1], ‘R2’ 영역을 [0.2, 0.3]으로 설정했다. ‘z1’$\\in$‘R1’일 때, 수집한 ‘z2’들은 ‘z2when_z1inR1’의 원소로 추가된다. 그리고, ‘z1’$\\in$‘R2’일 때, 수집한 ‘z2’들은 ‘z2when_z1inR2’의 원소로 추가된다.     
\`\`\`python
#위 py 스크립트에 이어서 아래를 추가.
z1s=np.empty(0); z2s=np.empty(0)
z2when_z1inR1=np.empty(0); z2when_z1inR2=np.empty(0)
for n in range(70000):
    
    rt_nth=rt[n*L:(n+1)*L] # n번째 M-ary 심벌 기간의 수신 신호 샘플
    
    z1=sum(rt_nth*?)*tstep # (식 18.3)에 따라 수신 신호를 벡터 공간상의 한 점으로 변환
    z2=sum(rt_nth*?)*tstep # (식 18.3)에 따라 수신 신호를 벡터 공간상의 한 점으로 변환
    
    if (0<=z1) & (z1<=0.1):
        z2when_z1inR1=np.append(z2when_z1inR1, z2) # z1이 R1 영역에 포함될 때, z2를 수집
        
    if (0.2<=z1) & (z1<=0.3):
        z2when_z1inR2=np.append(z2when_z1inR2, z2) # z1이 R2 영역에 포함될 때, z2를 수집
    
    z1s=np.append(z1s, z1); z2s=np.append(z2s, z2)
\`\`\`
전체 py 스크립트를 완성하시오.
`,
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

noise_sample=2*np.random.randn(L*100000) # AWGN
rt=noise_sample # 오직 노이즈뿐인 수신 신호

z1s=np.empty(0); z2s=np.empty(0)
z2when_z1inR1=np.empty(0); z2when_z1inR2=np.empty(0)
for n in range(70000):
    
    rt_nth=rt[n*L:(n+1)*L] # n번째 M-ary 심벌 기간의 수신 신호 샘플
    
    z1=sum(rt_nth*?)*tstep # (식 18.3)에 따라 수신 신호를 벡터 공간상의 한 점으로 변환
    z2=sum(rt_nth*?)*tstep # (식 18.3)에 따라 수신 신호를 벡터 공간상의 한 점으로 변환
    
    if (0<=z1) & (z1<=0.1):
        z2when_z1inR1=np.append(z2when_z1inR1, z2) # z1이 R1 영역에 포함될 때, z2를 수집
        
    if (0.2<=z1) & (z1<=0.3):
        z2when_z1inR2=np.append(z2when_z1inR2, z2) # z1이 R2 영역에 포함될 때, z2를 수집
    
    z1s=np.append(z1s, z1); z2s=np.append(z2s, z2)`,
          
referenceAnswer: `수신 신호 \`rt\`에는 평균이 0이고 분산이 4인 가우시안 잡음만 포함되어 있다. 각 심벌 구간의 수신 샘플을 두 정규직교 기저 신호에 투영하면 벡터공간 좌표 \`z1\`과 \`z2\`를 얻을 수 있다.

따라서 두 빈칸에 들어갈 변수는 각각 \`p1t\`와 \`p2t\`이다.

\`\`\`python
z1 = sum(rt_nth * p1t) * tstep
z2 = sum(rt_nth * p2t) * tstep
\`\`\`

전체 코드는 다음과 같다.

\`\`\`python
import numpy as np
from scipy.io import loadmat

file_load("ch18/st_and_rt.mat")
mat = loadmat("st_and_rt.mat", simplify_cells=True)

L = int(mat["L"])
Ns = int(mat["Ns"])
tstep = float(mat["tstep"])

p1t = np.asarray(mat["p1t"]).ravel()
p2t = np.asarray(mat["p2t"]).ravel()
rt = np.asarray(mat["rt"]).ravel()
s1t = np.asarray(mat["s1t"]).ravel()
s2t = np.asarray(mat["s2t"]).ravel()
s3t = np.asarray(mat["s3t"]).ravel()
s4t = np.asarray(mat["s4t"]).ravel()
tvector = np.asarray(mat["tvector"]).ravel()

# 노이즈만 포함된 수신 신호 생성
noise_sample = 2 * np.random.randn(L * 100000)
rt = noise_sample

# 좌표와 조건부 표본을 저장할 배열 초기화
z1s = np.empty(0)
z2s = np.empty(0)
z2when_z1inR1 = np.empty(0)
z2when_z1inR2 = np.empty(0)

# 70,000개의 심벌 구간에 대해 반복
for n in range(70000):

    # n번째 심벌의 수신 샘플 추출
    rt_nth = rt[n*L:(n+1)*L]

    # 두 기저에 투영하여 수신 좌표 계산
    z1 = sum(rt_nth * p1t) * tstep
    z2 = sum(rt_nth * p2t) * tstep

    # z1이 R1=[0, 0.1]에 속할 때 z2 수집
    if (0 <= z1) & (z1 <= 0.1):
        z2when_z1inR1 = np.append(z2when_z1inR1, z2)

    # z1이 R2=[0.2, 0.3]에 속할 때 z2 수집
    if (0.2 <= z1) & (z1 <= 0.3):
        z2when_z1inR2 = np.append(z2when_z1inR2, z2)

    # 전체 좌표 저장
    z1s = np.append(z1s, z1)
    z2s = np.append(z2s, z2)
\`\`\`

수집된 \`z1s\`와 \`z2s\`는 전체 좌표의 통계적 특성을 분석하는 데 사용한다. 또한 \`z2when_z1inR1\`과 \`z2when_z1inR2\`는 서로 다른 \`z1\` 조건에서 얻은 \`z2\`의 분포를 비교하는 데 사용한다.`,
        },
        { //문제 1.B
          "id": "19-1B",
          "title": "1.B.",
          "prompt": `문제 1.A에서 완성한 py 스크립트를 복사하여 붙여넣은 후, 아래 명령어를 Console에서 실행하여 실험으로 얻은 ‘z1’과 ‘z2’의 분포를 그리자.
\`\`\`python
>>> import matplotlib.pyplot as plt
>>> plt.figure(); plt.hist(z1s,100)
>>> plt.figure(); plt.hist(z2s,100)
\`\`\``
        },
        {
          "id": "19-1B1",
          "title": "1.B1.",
          "type": "python",
          consoleEnabled: true,
          "prompt": `결과 그래프를 확인하고, 히스토그램이 가우시안 분포를 따르는지 설명하시오.`,
          
referenceAnswer: `\`z1s\`와 \`z2s\`의 히스토그램은 모두 평균 0을 중심으로 좌우 대칭인 종 모양(Bell-shaped Curve)을 나타낸다.

\`\`\`python
import matplotlib.pyplot as plt

plt.figure()
plt.hist(z1s, 100)
plt.title("Distribution of z1")
plt.xlabel("z1")
plt.ylabel("Frequency")
plt.grid(True)
plt.show()

plt.figure()
plt.hist(z2s, 100)
plt.title("Distribution of z2")
plt.xlabel("z2")
plt.ylabel("Frequency")
plt.grid(True)
plt.show()
\`\`\`

두 히스토그램은 중심 부근에서 빈도가 높고 중심에서 멀어질수록 빈도가 낮아지므로, **\`z1\`과 \`z2\`는 모두 평균이 0인 가우시안 분포를 따른다**고 판단할 수 있다.

실험에 사용한 표본 수가 유한하므로 두 히스토그램의 모양이 완전히 일치하지는 않을 수 있다.`,
        },
        {
          "id": "19-1B2",
          "title": "1.B2.",
          "type": "essay",
          "prompt": `샘플 벡터 ‘rt_nth’의 각 원소는 i.i.d.인 랜덤 변수이고, 평균은 0이고 분산이 4인 가우시안 분포를 따른다. 또한, ‘z1’과 ‘z2’를 생성한 라인으로부터, ‘z1’과 ‘z2’는 ‘rt_nth’의 각 원소(=평균이 0이고 분산이 4인 가우시안 변수)에 ‘p1t’와 ‘p2t’의 원소를 각각 가중치로 곱한 후 합한 값임을 알 수 있다. 이러한 사실들로부터, ‘z1’과 ‘z2’가 가우시안 분포를 따르는 이유를 설명하시오.`,
          
referenceAnswer: `수신 신호 \`rt_nth\`의 각 원소는 평균이 0이고 분산이 4인 서로 독립적인 가우시안 확률 변수이다.

각 원소를 $n_k$라고 하면,

$$
n_k\\sim\\mathcal{N}(0,4)
$$

이다.

수신 신호의 벡터공간 좌표 \`z1\`과 \`z2\`는 각각 다음과 같이 계산된다.

$$
z_1
=
\\sum_{k=1}^{L}
n_k\\,p1t[k]\\,\\Delta t
$$

$$
z_2
=
\\sum_{k=1}^{L}
n_k\\,p2t[k]\\,\\Delta t
$$

여기서 \`p1t\`, \`p2t\` 및 $\\Delta t$는 확률 변수가 아닌 고정된 값이다.

**서로 독립적인 가우시안 확률 변수들의 선형 결합은 다시 가우시안 분포를 따른다.**

따라서 \`z1\`과 \`z2\`는 모두 가우시안 분포를 따른다.`,
        },
        { //문제 1.C
          "id": "19-1C",
          "title": "1.C.",
          "prompt": `문제 1.A의 py 스크립트로부터, ‘z1s’와 ‘z2s’는 각각 각 심벌 구간에서 계산한 ‘z1’과 ‘z2’의 값들을 저장한 벡터임을 알 수 있다. 
          
문제 1.A에서 완성한 py 스크립트를 복사하여 붙여넣은 후, 아래 명령어를 Console에서 실행하여, ‘z1s’와 ‘z2s’의 평균과 분산을 계산해보자.
\`\`\`python
>>> print(np.mean(z1s))
>>> print(np.var(z1s))
>>> print(np.mean(z2s))
>>> print(np.var(z2s))
\`\`\`
          `
        },
        {
          "id": "19-1C1",
          "title": "1.C1.",
          "type": "python",
          consoleEnabled: true,
          "prompt": `수행 결과를 확인하고, ‘z1’과 ‘z2’의 평균과 분산이 같은지 설명하시오. (유한한 샘플 수로 인한 실험 오차가 있음을 감안할 것)`,
          
referenceAnswer: `실험에서 수집한 \`z1s\`와 \`z2s\`의 평균과 분산은 다음과 같이 계산한다.

\`\`\`python
print(np.mean(z1s))
print(np.var(z1s))
print(np.mean(z2s))
print(np.var(z2s))
\`\`\`

실행 결과에서 \`z1\`과 \`z2\`의 평균은 모두 0에 가까우며, 분산은 모두 0.125에 가까운 값을 나타낸다.

$$
E[z_1]\\approx E[z_2]\\approx 0
$$

$$
\\operatorname{Var}(z_1)
\\approx
\\operatorname{Var}(z_2)
\\approx 0.125
$$

따라서 **두 확률 변수의 평균과 분산은 이론적으로 동일하다.** 실제 계산값에 약간의 차이가 발생하는 것은 유한한 표본 수에 따른 실험 오차 때문이다.`,
        },
        {
          "id": "19-1C2",
          "title": "1.C2.",
          "type": "proof",
          "prompt": `문제 1.B2의 내용과 [[link:/workbook/ch15?p=15-2C|(식 15.5)]], [[link:/workbook/ch15?p=15-2C|(식 15.6)]]을 통해 ‘z1’과 ‘z2’의 이론적인 평균과 분산을 구할 수 있다.
          
‘z1’과 ‘z2’의 이론적인 평균은 모두 $0$임을 증명하시오.`,

referenceAnswer: `수신 신호의 각 샘플을 $n_k$라고 하면, $n_k$는 평균이 0이고 분산이 4인 독립 가우시안 확률 변수이다.

$$
E[n_k]=0
$$

벡터공간 좌표 $z_1$과 $z_2$는 다음과 같다.

$$
z_1=\\sum_{k=1}^{L}n_k\\,p1t[k]\\,\\Delta t
$$

$$
z_2=\\sum_{k=1}^{L}n_k\\,p2t[k]\\,\\Delta t
$$

기댓값의 선형성을 이용하여 $z_1$의 평균을 계산하면,

$$
\\begin{aligned}
E[z_1]
&=E\\left[
\\sum_{k=1}^{L}n_k\\,p1t[k]\\,\\Delta t
\\right]\\\\
&=\\sum_{k=1}^{L}
p1t[k]\\,\\Delta t\\,E[n_k]\\\\
&=0
\\end{aligned}
$$

이다. 같은 방법으로 $z_2$의 평균을 계산하면,

$$
\\begin{aligned}
E[z_2]
&=\\sum_{k=1}^{L}
p2t[k]\\,\\Delta t\\,E[n_k]\\\\
&=0
\\end{aligned}
$$

이다.

따라서 두 벡터공간 좌표의 이론적 평균은 모두 0이다.

$$
\\boxed{E[z_1]=E[z_2]=0}
$$`,
        },
        {
          "id": "19-1C3",
          "title": "1.C3.",
          "type": "proof",
          "prompt": `문제 1.A의 py 스크립트에서 ‘z1’과 ‘z2’의 생성 라인과 [[link:/workbook/ch15?p=15-2C|(식 15.6)]]으로부터, ‘z1’과 ‘z2’의 이론적인 분산을 아래의 명령어를 통해 계산할 수 있는 이유를 설명하시오.
\`\`\`python
>>> z1variance=sum((p1t*tstep)**2)*4; print(z1variance)
>>> z2variance=sum((p2t*tstep)**2)*4; print(z2variance)
\`\`\`    
(참고. ‘rt_nth’의 각 원소는 평균이 이고 분산이 인 독립 가우시안 변수임을 상기할 것)`,

referenceAnswer: `수신 신호의 각 샘플 $n_k$는 서로 독립이며, 모두 분산이 4인 가우시안 확률 변수이다.

$$
\\operatorname{Var}(n_k)=4
$$

서로 독립적인 확률 변수의 가중합에 대한 분산은 각 확률 변수의 분산에 가중치의 제곱을 곱한 값들의 합으로 계산할 수 있다.

따라서 $z_1$의 분산은 다음과 같다.

$$
\\begin{aligned}
\\operatorname{Var}(z_1)
&=\\operatorname{Var}
\\left(
\\sum_{k=1}^{L}
n_k\\,p1t[k]\\,\\Delta t
\\right)\\\\
&=\\sum_{k=1}^{L}
\\left(p1t[k]\\,\\Delta t\\right)^2
\\operatorname{Var}(n_k)\\\\
&=4\\sum_{k=1}^{L}
\\left(p1t[k]\\,\\Delta t\\right)^2
\\end{aligned}
$$

같은 방법으로 $z_2$의 분산은 다음과 같다.

$$
\\operatorname{Var}(z_2)
=
4\\sum_{k=1}^{L}
\\left(p2t[k]\\,\\Delta t\\right)^2
$$

이를 Python 코드로 구현하면 다음과 같다.

\`\`\`python
z1variance = sum((p1t * tstep)**2) * 4
z2variance = sum((p2t * tstep)**2) * 4

print(z1variance)
print(z2variance)
\`\`\`

두 기저 신호는 정규화되어 있으므로,

$$
\\sum_{k=1}^{L}p1t[k]^2
=
\\sum_{k=1}^{L}p2t[k]^2
=
\\frac{1}{\\Delta t}
$$

이다. 따라서 두 분산은 모두 다음과 같다.

$$
\\begin{aligned}
\\operatorname{Var}(z_1)
=\\operatorname{Var}(z_2)
&=4\\Delta t\\\\
&=4\\times\\frac{1}{32}\\\\
&=\\boxed{0.125}
\\end{aligned}
$$`,
        },
        {
          "id": "19-1C4",
          "title": "1.C4.",
          "type": "python",
          consoleEnabled: true,
          "prompt": `문제 1.A에서 완성한 py 스크립트를 복사하여 붙여넣은 후, Console에서 아래를 실행하고 결과를 확인하시오. 문제 1.C의 실험 결과와 일치하는지 설명하시오. (유한한 샘플 수로 인한 실험 오차가 있음을 감안할 것)
\`\`\`python
>>> z1variance=sum((p1t*tstep)**2)*4; print(z1variance)
>>> z2variance=sum((p2t*tstep)**2)*4; print(z2variance)
\`\`\`              
          `,
          
referenceAnswer: `두 벡터공간 좌표의 이론적 분산은 다음 코드로 계산한다.

\`\`\`python
z1variance = sum((p1t * tstep)**2) * 4
z2variance = sum((p2t * tstep)**2) * 4

print(z1variance)
print(z2variance)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
0.125
0.125
\`\`\`

문제 1.C1에서 구한 실험적 분산도 각각 약 0.125이므로, 이론값과 실험값이 거의 일치한다.

$$
\\boxed{
\\operatorname{Var}(z_1)
=
\\operatorname{Var}(z_2)
=
0.125
}
$$

실험적 분산과 이론적 분산 사이에 약간의 차이가 나타나는 것은 무작위로 생성한 유한한 표본을 사용했기 때문이다.`,
        },
        {
          "id": "19-1C5",
          "title": "1.C5.",
          "type": "proof",
          "prompt": `‘z1’과 ‘z2’의 평균과 분산을 알고, 가우시안 분포를 따른다는 것을 알고 있다고 가정하여, ‘z1’과 ‘z2’의 확률밀도함수(PDF) 수식을 쓰시오.`,
          
referenceAnswer: `문제 1.B2에서 $z_1$과 $z_2$는 가우시안 분포를 따름을 확인했다. 또한 문제 1.C2와 1.C3에서 두 확률 변수의 평균은 0, 분산은 0.125임을 구했다.

$$
z_1,z_2\\sim\\mathcal{N}(0,0.125)
$$

평균이 $\\mu$이고 분산이 $\\sigma^2$인 가우시안 확률 변수의 확률밀도함수는 다음과 같다.

$$
f_Z(z)
=
\\frac{1}{\\sqrt{2\\pi\\sigma^2}}
\\exp\\left(
-\\frac{(z-\\mu)^2}{2\\sigma^2}
\\right)
$$

여기에 $\\mu=0$, $\\sigma^2=0.125=\\frac18$을 대입하면,

$$
\\begin{aligned}
f_Z(z)
&=
\\frac{1}{\\sqrt{2\\pi(0.125)}}
\\exp\\left(
-\\frac{z^2}{2(0.125)}
\\right)\\\\
&=
\\frac{2}{\\sqrt{\\pi}}e^{-4z^2}
\\end{aligned}
$$

이다.

따라서 $z_1$과 $z_2$의 확률밀도함수는 각각 다음과 같다.

$$
\\boxed{
f_{Z_1}(z_1)
=
\\frac{2}{\\sqrt{\\pi}}e^{-4z_1^2}
}
$$

$$
\\boxed{
f_{Z_2}(z_2)
=
\\frac{2}{\\sqrt{\\pi}}e^{-4z_2^2}
}
$$

두 확률 변수는 평균과 분산이 같으므로 동일한 가우시안 확률밀도함수를 갖는다.`,
        },
        { //문제 1.D
          "id": "19-1D",
          "title": "1.D.",
          "prompt": `문제 1.A에서 완성한 py 스크립트를 복사하여 붙여넣은 후, ‘z2when_z1inR1’과 ‘z2when_z1inR2’에 포함된 각 원소의 히스토그램을 그리기 위해, 아래 명령어를 Console에서 실행하시오.
\`\`\`python
>>> import matplotlib.pyplot as plt
>>> plt.figure(); plt.hist(z2when_z1inR1,30)
>>> plt.figure(); plt.hist(z2when_z1inR2,30)
>>> print(np.var(z2when_z1inR1))
>>> print(np.var(z2when_z1inR2))
\`\`\`
          `
        },
        {
          "id": "19-1D1",
          "title": "1.D1.",
          "type": "python",
          consoleEnabled: true,
          "prompt": `결과 그래프와 계산한 분산 값을 확인하고, ‘z2when_z1inR1’과 ‘z2when_z1inR2’의 각 원소는 어떤 분포를 따르는지 쓰시오. ‘z2when_z1inR1’과 ‘z2when_z1inR2’의 각 원소는 ‘z2s’의 각 원소의 평균 및 분산과 같은가? 그리고 똑같이 가우시안 분포를 따르는가?

(참고. 문제 1.B1에서 얻은 히스토그램에 비해 축 분할 개수가 100에서 30으로 줄어들었다. 이는 ‘z2when_z1inR1’과 ‘z2when_z1inR2’의 각 원소의 수가 ‘z2s’의 원소들의 수보다 매우 적기 때문에, 이에 따라 줄인 것이다. 히스토그램의 전체적인 분포 모양과 평균(중심)에 집중하여 물음에 답할 것)`,
          
referenceAnswer: `\`z1\`이 $R_1=[0,0.1]$에 속할 때와 $R_2=[0.2,0.3]$에 속할 때 수집한 \`z2\`의 히스토그램을 비교하면, 두 경우 모두 평균 0을 중심으로 하는 종 모양의 분포가 나타난다.

두 조건에서 얻은 \`z2\`의 평균과 분산은 이론적으로 다음과 같다.

$$
\\begin{aligned}
E[z_2\\mid z_1\\in R_1]
&=E[z_2\\mid z_1\\in R_2]=0 \\\\
\\operatorname{Var}(z_2\\mid z_1\\in R_1)
&=\\operatorname{Var}(z_2\\mid z_1\\in R_2)=0.125
\\end{aligned}
$$

따라서 두 조건부 분포는 조건을 적용하지 않은 \`z2s\`의 분포와 동일한 가우시안 분포를 따른다.

$$
\\boxed{
z_2\\mid(z_1\\in R_1),\\ 
z_2\\mid(z_1\\in R_2)
\\sim\\mathcal{N}(0,0.125)
}
$$

실제 히스토그램이나 표본분산은 수집된 샘플 수가 적어 약간 다르게 나타날 수 있다.`,
        },
        {
          "id": "19-1D2",
          "title": "1.D2.",
          "type": "python",
          consoleEnabled: true,
          "prompt": `문제 1.A의 py 스크립트에서 ‘z1’에 대한 ‘R1’과 ‘R2’ 영역을 다르게 설정하시오. (예를 들어, ‘R1’=[-2, 0], ‘R2’=[0, 2]로 설정) 수정 후 py 스크립트를 실행하시오. 실행이 끝나면, ‘z2when_z1inR1’과 ‘z2when_z1inR2’의 원소들의 히스토그램을 그리고, 문제 1.D1에서 한 것과 같이 분산을 구하시오. (‘R1’과 ‘R2’ 영역을 0에서 먼 값으로 설정할수록, 실험을 통해 얻는 ‘z2when_z1inR1’과 ‘z2when_z1inR2’의 원소들의 수가 줄어듦. 따라서, 히스토그램이 정확하지 않을 수 있음)

(a) 실험 결과로부터, ‘z2when_z1inR1’과 ‘z2when_z1inR2’의 원소들의 분포가 ‘z1’의 ‘R1’, ‘R2’ 영역에 상관없이 같은가?
(b) (a)의 답이 ‘같다’이면, 이는 ‘z1’과 ‘z2’가 서로 독립임을 뜻한다. (a)의 결과가 ‘z1’과 ‘z2’가 서로 독립이라는 것을 검증할 수 있는 이유는 무엇인가?},
      `,
      
referenceAnswer: `(a) 두 영역을 $R_1=[-2,0]$, $R_2=[0,2]$로 변경해도, \`z2\`의 조건부 분포는 이론적으로 동일하다.

문제 1.A의 두 조건문을 다음과 같이 수정한다.

\`\`\`python
if (-2 <= z1) & (z1 <= 0):
    z2when_z1inR1 = np.append(z2when_z1inR1, z2)

if (0 <= z1) & (z1 <= 2):
    z2when_z1inR2 = np.append(z2when_z1inR2, z2)
\`\`\`

두 집합의 히스토그램은 모두 평균이 0에 가까운 가우시안 분포를 나타내며, 표본분산도 약 0.125이다.

(b) 두 확률 변수가 독립이면 한 변수의 값에 대한 조건을 부여하더라도 다른 변수의 확률분포가 변하지 않는다.

$$
f_{Z_2\\mid Z_1}(z_2\\mid z_1)=f_{Z_2}(z_2)
$$

서로 다른 두 영역에 대해 수집한 \`z2\`의 분포가 원래 분포와 일치한다는 실험 결과는 \`z1\`과 \`z2\`의 독립성을 뒷받침한다.

다만 유한한 표본으로 일부 영역을 비교하는 실험만으로 모든 조건에서의 독립성을 수학적으로 증명할 수는 없다. 이론적인 독립성은 문제 1.E에서 검증한다.`,
        },
        { //문제 1.E
          "id": "19-1E",
          "title": "1.E.",
          "prompt": `‘z1’과 ‘z2’의 통계적 특성을 수식으로 정확히 검증하자. [[link:/workbook/ch18?p=18-3A1|(식 18.3)]]으로부터, 수신된 노이즈 신호의 벡터 공간상의 좌표(‘z1’, ‘z2’)는 [[equation:19.1]]과 같이 계산할 수 있다.
$$
\\begin{aligned}
z_1 &= \\int_0^T r(t)\\psi_1(t)\\,dt
    && \\text{for } \\psi_1(t)\\text{는 실수 신호.} \\\\[12pt]
z_2 &= \\int_0^T r(t)\\psi_2(t)\\,dt
    && \\text{for } \\psi_2(t)\\text{는 실수 신호.}
\\end{aligned}
\\qquad \\text{(식 19.1)}
$$
여기서 $n(t)$는 AWGN 신호이고, $T$는 4-ary 신호의 길이이다. 앞서 실험에 사용한 py 스크립트에서는 $T=1$로 설정했다. 그리고, $\\psi_1(t)$와 $\\psi_2(t)$는 직교 기저 함수이고, py 스크립트에서 정의한 $\\psi_1(t)$와 $\\psi_2(t)$를 수식으로 정리하면 [[equation:19.2]]와 같다.
$$
\\begin{aligned}
\\psi_1(t) &= \\sqrt{2}\\cos(3\\pi t),
&& 0 \\le t \\le 1 \\\\
\\psi_2(t) &= \\sqrt{2}\\sin(3\\pi t),
&& 0 \\le t \\le 1
\\end{aligned}
\\qquad \\text{(식 19.2)}
$$
참고로, [[equation:19.1]]의 의 Python 샘플 벡터는 문제 1.A의 ‘noise_sample’이다. 또한, 문제 1.A의 답으로부터, [[equation:19.2]]의 $\\psi_1(t)$와 $\\psi_2(t)$의 Python 샘플 벡터는 ‘p1t’와 ‘p2t’인 것을 알 수 있다. 따라서, py 스크립트의 ‘z1’과 ‘z2’는 [[equation:19.1]]의 $z_1$과 $z_2$를 수치적으로 나타낸 것이다.
`,
        },
        {
          "id": "19-1E1",
          "title": "1.E1.",
          "type": "essay",
          "prompt": `[[equation:19.1]]의 $z_1$과 $z_2$가 가우시안 분포를 따르는 이유를 설명하시오.`,
          
referenceAnswer: `AWGN 신호 $n(t)$는 가우시안 확률 과정이다. 수신 신호에 잡음만 존재하는 경우 $r(t)=n(t)$이므로, 두 벡터공간 좌표는 다음과 같다.

$$
z_1=\\int_0^T n(t)\\psi_1(t)\\,dt
$$

$$
z_2=\\int_0^T n(t)\\psi_2(t)\\,dt
$$

여기서 $\\psi_1(t)$와 $\\psi_2(t)$는 확률 변수가 아닌 정해진 기저 함수이다.

**가우시안 확률 과정에 대한 결정적인 선형 연산의 결과는 가우시안 확률 변수이다.** 두 적분은 AWGN에 고정된 가중치를 적용한 선형 연산이므로 $z_1$과 $z_2$는 각각 가우시안 분포를 따른다.

또한 두 좌표는 동일한 가우시안 확률 과정에 대한 선형 연산으로 생성되므로 결합 가우시안 분포를 이룬다.`,
        },
        {
          "id": "19-1E2",
          "title": "1.E2.",
          "type": "proof",
          "prompt": `AWGN 신호 $n(t)$의 자기 상관 함수는 $\\dfrac{N_0}{2}\\delta(\\tau)$로 주어진다. 여기서 $\\dfrac{N_0}{2}$는 $n(t)$의 양측(Two-sided) 전력 밀도이다. $z_1$과 $z_2$의 평균은 $0$이고, 분산은 $\\dfrac{N_0}{2}$임을 보이시오.`,
          
referenceAnswer: `AWGN은 평균이 0이고 자기상관 함수가 다음과 같다.

$$
E[n(t)]=0
$$

$$
R_n(t,u)
=E[n(t)n(u)]
=\\frac{N_0}{2}\\delta(t-u)
$$

먼저 기댓값의 선형성을 이용하면,

$$
\\begin{aligned}
E[z_i]
&=E\\left[\\int_0^T n(t)\\psi_i(t)\\,dt\\right]\\\\
&=\\int_0^T E[n(t)]\\psi_i(t)\\,dt\\\\
&=0
\\end{aligned}
$$

이다.

평균이 0이므로 분산은 $E[z_i^2]$이다.

$$
\\begin{aligned}
\\operatorname{Var}(z_i)
&=E\\left[
\\int_0^T n(t)\\psi_i(t)\\,dt
\\int_0^T n(u)\\psi_i(u)\\,du
\\right]\\\\
&=\\int_0^T\\int_0^T
E[n(t)n(u)]\\psi_i(t)\\psi_i(u)
\\,dt\\,du\\\\
&=\\frac{N_0}{2}
\\int_0^T\\int_0^T
\\delta(t-u)\\psi_i(t)\\psi_i(u)
\\,dt\\,du\\\\
&=\\frac{N_0}{2}
\\int_0^T\\psi_i^2(t)\\,dt
\\end{aligned}
$$

두 기저 함수는 정규화되어 있으므로,

$$
\\int_0^T\\psi_i^2(t)\\,dt=1
$$

이다. 따라서 두 좌표의 평균과 분산은 다음과 같다.

$$
\\boxed{
E[z_1]=E[z_2]=0
}
$$

$$
\\boxed{
\\operatorname{Var}(z_1)
=\\operatorname{Var}(z_2)
=\\frac{N_0}{2}
}
$$`,
        },
        {
          "id": "19-1E3",
          "title": "1.E3.",
          "type": "proof",
          "prompt": `$z_1$과 $z_2$의 상호 상관 $E[z_1, z_2]=0$임을 보이시오.`,
          
referenceAnswer: `두 노이즈 좌표의 상호상관은 다음과 같다.

$$
\\begin{aligned}
E[z_1z_2]
&=E\\left[
\\int_0^T n(t)\\psi_1(t)\\,dt
\\int_0^T n(u)\\psi_2(u)\\,du
\\right]\\\\
&=\\int_0^T\\int_0^T
E[n(t)n(u)]
\\psi_1(t)\\psi_2(u)
\\,dt\\,du\\\\
&=\\frac{N_0}{2}
\\int_0^T\\int_0^T
\\delta(t-u)
\\psi_1(t)\\psi_2(u)
\\,dt\\,du\\\\
&=\\frac{N_0}{2}
\\int_0^T\\psi_1(t)\\psi_2(t)\\,dt
\\end{aligned}
$$

두 기저 함수는 서로 직교하므로,

$$
\\int_0^T\\psi_1(t)\\psi_2(t)\\,dt=0
$$

이다.

따라서 두 좌표의 상호상관은 다음과 같다.

$$
\\boxed{E[z_1z_2]=0}
$$

또한 두 좌표의 평균도 0이므로 공분산 역시 0이다.`,
        },
        {
          "id": "19-1E4",
          "title": "1.E4.",
          "type": "essay",
          "prompt": `$z_1$과 $z_2$는 독립 가우시안 확률 변수라 말할 수 있는가?`,
          
referenceAnswer: `**$z_1$과 $z_2$는 서로 독립인 가우시안 확률 변수이다.**

두 좌표는 동일한 AWGN 확률 과정에 대한 선형 연산으로 얻어졌으므로 결합 가우시안 분포를 따른다.

문제 1.E3에서 두 좌표의 공분산이 0임을 증명했다.

$$
\\operatorname{Cov}(z_1,z_2)
=E[z_1z_2]-E[z_1]E[z_2]
=0
$$

결합 가우시안 확률 변수들은 공분산이 0이면 서로 독립이다. 따라서 다음과 같이 결론 내릴 수 있다.

$$
\\boxed{z_1\\perp z_2}
$$

각 좌표는 평균 0, 분산 $N_0/2$인 가우시안 분포를 따른다.

$$
z_1,z_2\\sim\\mathcal{N}
\\left(0,\\frac{N_0}{2}\\right)
$$`,
        },
        {
          "id": "19-1E5",
          "title": "1.E5.",
          "type": "proof",
          "prompt": `$\\psi_2(t)$를 $\\psi_1(t)$와 직교하지 않는 신호로 설정해보자. 한 예로, $\\psi_2(t)=\\sqrt{2}\\sin\\left(3\\pi t+\\dfrac{\\pi}{3}\\right), 0 \\le t \\le 1$로 들자. 이때, $z_1$과 $z_2$의 상호 상관 $E[z_1, z_2]=\\dfrac{\\sqrt{3}}{4}N_0$임을 보이시오.`,
          
referenceAnswer: `두 기저 함수는 다음과 같다.

$$
\\psi_1(t)=\\sqrt{2}\\cos(3\\pi t)
$$

$$
\\psi_2(t)=\\sqrt{2}\\sin\\left(3\\pi t+\\frac{\\pi}{3}\\right)
$$

AWGN의 자기상관 함수를 이용하면 두 노이즈 좌표의 상호상관은 다음과 같다.

$$
\\begin{aligned}
E[z_1z_2]
&=\\frac{N_0}{2}
\\int_0^1\\psi_1(t)\\psi_2(t)\\,dt\\\\
&=N_0\\int_0^1\\cos(3\\pi t)
\\sin\\left(3\\pi t+\\frac{\\pi}{3}\\right)\\,dt
\\end{aligned}
$$

삼각함수의 덧셈정리를 적용하면 다음과 같다.

$$
\\sin\\left(3\\pi t+\\frac{\\pi}{3}\\right)
=\\frac12\\sin(3\\pi t)
+\\frac{\\sqrt3}{2}\\cos(3\\pi t)
$$

이를 상호상관 식에 대입하면,

$$
\\begin{aligned}
E[z_1z_2]
&=\\frac{N_0}{2}
\\int_0^1\\cos(3\\pi t)\\sin(3\\pi t)\\,dt\\\\
&\\quad+\\frac{\\sqrt3N_0}{2}
\\int_0^1\\cos^2(3\\pi t)\\,dt\\\\
&=0+\\frac{\\sqrt3N_0}{2}\\cdot\\frac12\\\\
&=\\boxed{\\frac{\\sqrt3}{4}N_0}
\\end{aligned}
$$

두 좌표의 평균이 모두 0이므로 공분산도 $\\frac{\\sqrt3}{4}N_0$이다.

따라서 두 기저 함수가 서로 직교하지 않는 경우에는 두 가우시안 노이즈 좌표 사이에 상관관계가 존재하며, 서로 독립이 아니다.`,
        },
        { //문제 1.F
          "id": "19-1F",
          "title": "1.F.",
          "prompt": `수신 신호 생성 라인 ‘rt=noise_sample’로 알 수 있듯이, 수신 신호에 노이즈 신호만 있을 때 수신 신호의 벡터 공간상 좌표(‘z1’, ‘z2’)에서 ‘z1’과 ‘z2’는 각각 평균이 $0$이고 분산이 $0.125$인 가우시안 랜덤 변수인 점을 문제 1.C4에서 확인했다. 한편, [[link:/workbook/ch18?p=18-3A2|18장의 문제 3.A2]]에서는 4-ary 신호를 벡터 공간상의 한 점으로 변환했다. 예를 들어, 첫 번째 4-ary 신호의 샘플 벡터 ‘s1t’의 벡터 공간상 좌표(‘a11’, ‘a12’)로 변환된다.`,
        },
        {
          "id": "19-1F1",
          "title": "1.F1.",
          "type": "essay",
          "prompt": `M-ary 신호 ‘s1t’가 노이즈 신호와 함께 수신되었을 때를 고려하자. 이러한 경우는 문제 1.A의 py 스크립트에서 29번째 라인 ‘rt_nth=rt[n*L:(n+1)*L]’ 아래에 ‘rt_nth=rt_nth+s1t’를 추가하여 구현할 수 있다. 이때, 수신 신호 샘플 벡터 ‘rt_nth’의 벡터 공간 좌표(‘z1’, ‘z2’) 중 ‘z1’은 평균이 ‘a11’이고 분산이 $0.125$인 가우시안 랜덤 변수가 되고, ‘z2’는 평균이 ‘a12’이고 분산이 $0.125$인 가우시안 랜덤 변수가 된다. 이 결론에 대한 근거를 쓰시오.`,
          
referenceAnswer: `첫 번째 송신 신호 $s_1(t)$가 AWGN과 함께 수신되면 수신 신호는 다음과 같다.

$$
r(t)=s_1(t)+n(t)
$$

수신 신호를 첫 번째 기저 함수에 투영하면,

$$
\\begin{aligned}
z_1
&=\\int_0^1r(t)\\psi_1(t)\\,dt\\\\
&=\\int_0^1s_1(t)\\psi_1(t)\\,dt
+\\int_0^1n(t)\\psi_1(t)\\,dt\\\\
&=a_{11}+n_1
\\end{aligned}
$$

이다. 마찬가지로 두 번째 기저 함수에 투영하면,

$$
z_2=a_{12}+n_2
$$

이다.

여기서 $a_{11}$과 $a_{12}$는 송신 신호의 고정된 벡터공간 좌표이고, $n_1$과 $n_2$는 각각 평균 0, 분산 0.125인 가우시안 노이즈 좌표이다.

확률 변수에 상수를 더하면 평균은 그 상수만큼 이동하지만 분산은 변하지 않는다. 따라서,

$$
\\boxed{
z_1\\sim\\mathcal{N}(a_{11},0.125)
}
$$

$$
\\boxed{
z_2\\sim\\mathcal{N}(a_{12},0.125)
}
$$

이다.

즉, 송신 신호가 추가되면 수신 좌표의 평균은 송신 신호의 좌표로 이동하지만, AWGN에 의해 발생하는 분산은 그대로 유지된다.`,
        },
        {
          "id": "19-1F2",
          "title": "1.F2.",
          "type": "proof",
          "prompt": `문제 1.F1을 응용하여, M-ary 신호 중 ‘s3t’가 노이즈 신호와 함께 수신된 때에 대해서, ‘rt_nth’의 벡터 공간 좌표 ‘z1’, ‘z2’의 PDF를 쓰시오.`,
          
referenceAnswer: `세 번째 송신 신호 $s_3(t)$의 벡터공간 좌표는 다음과 같다.

$$
\\mathbf{s}_3=(a_{31},a_{32})=(4,-1)
$$

수신 신호가 $r(t)=s_3(t)+n(t)$일 때, 각 수신 좌표는 다음과 같다.

$$
z_1=a_{31}+n_1=4+n_1
$$

$$
z_2=a_{32}+n_2=-1+n_2
$$

여기서 $n_1$과 $n_2$는 서로 독립이며 평균 0, 분산 0.125인 가우시안 확률 변수이다.

따라서,

$$
z_1\\sim\\mathcal{N}(4,0.125)
$$

$$
z_2\\sim\\mathcal{N}(-1,0.125)
$$

이다.

가우시안 확률밀도함수의 일반식을 적용하면,

$$
f_Z(z)=
\\frac{1}{\\sqrt{2\\pi\\sigma^2}}
\\exp\\left(
-\\frac{(z-\\mu)^2}{2\\sigma^2}
\\right)
$$

이므로, 두 좌표의 PDF는 각각 다음과 같다.

$$
\\boxed{
f_{Z_1}(z_1)
=\\frac{2}{\\sqrt{\\pi}}
\\exp\\left[-4(z_1-4)^2\\right]
}
$$

$$
\\boxed{
f_{Z_2}(z_2)
=\\frac{2}{\\sqrt{\\pi}}
\\exp\\left[-4(z_2+1)^2\\right]
}
$$

두 확률 변수는 서로 독립이므로 결합 PDF는 두 주변 PDF의 곱으로 표현할 수 있다.

$$
\\boxed{
f_{Z_1,Z_2}(z_1,z_2)
=\\frac{4}{\\pi}
\\exp\\left[
-4(z_1-4)^2-4(z_2+1)^2
\\right]
}
$$`,
        },
        { //문제 1.G
          "id": "19-1G",
          "title": "1.G.",
          "prompt": `‘st_and_rt.mat’에 저장되어 있던 $\\psi_2(t)$의 샘플 벡터 ‘p2t’는 ‘np.sqrt(2) * np.sin(3 *np.pi * tvector)’($\\sqrt{2}\\sin(3\\pi t)$의 샘플 벡터)이었음을 상기하자. ([[link:/workbook/ch18?p=18-1C1|18장의 문제 1.C]]의 ‘rt_gen.py’ 참고) ‘p2t’를 문제 1.E5에 주어진 $\\psi_2(t)\\left(=\\sqrt{2}\\sin\\left(3\\pi t+\\dfrac{\\pi}{3}\\right)\\right)$의 샘플 벡터로 수정하자. 문제 1.A에서 작성한 py 스크립트에서 27번째 라인 ‘for’ 반복문 직전에 다음의 라인을 추가하면 된다.
\`\`\`python
p2t = np.sqrt(2) * np.sin(3 * np.pi * tvector + np.pi / 3)
\`\`\`
          `
        },
        {
          "id": "19-1G1",
          "title": "1.G1.",
          "type": "python",
          consoleEnabled: true,
          "prompt": `문제 1.A의 py 스크립트를 복사하여 붙여넣은 후, 라인을 추가하여 수정한 py 스크립트를 실행하고, 문제 1.D의 명령어를 Console 창에서 다시 실행하시오. ‘z2when_z1inR1’과 ‘z2when_z1inR2’의 히스토그램을 캡쳐하여 보이시오.
\`\`\`python
>>> import matplotlib.pyplot as plt
>>> plt.figure(); plt.hist(z2when_z1inR1,30)
>>> plt.figure(); plt.hist(z2when_z1inR2,30)
>>> print(np.var(z2when_z1inR1))
>>> print(np.var(z2when_z1inR2))
\`\`\`          
두 히스토그램의 평균이 거의 일치하는가, ‘z2’의 분포는 ‘z1’의 조건(영역)에 따라 약간의 변화라도 보이는가?`,
          
referenceAnswer: `두 번째 기저 신호를 다음과 같이 수정한다.

\`\`\`python
p2t = np.sqrt(2) * np.sin(
    3 * np.pi * tvector + np.pi / 3
)
\`\`\`

이후 문제 1.A의 반복문을 다시 실행하고, 다음 코드로 두 조건부 분포를 비교한다.

\`\`\`python
import matplotlib.pyplot as plt

plt.figure()
plt.hist(z2when_z1inR1, 30)
plt.title("z2 when z1 is in R1")
plt.grid(True)

plt.figure()
plt.hist(z2when_z1inR2, 30)
plt.title("z2 when z1 is in R2")
plt.grid(True)

print("R1 mean:", np.mean(z2when_z1inR1))
print("R2 mean:", np.mean(z2when_z1inR2))

print("R1 variance:", np.var(z2when_z1inR1))
print("R2 variance:", np.var(z2when_z1inR2))
\`\`\`

수정된 두 함수 사이의 내적은 다음과 같다.

$$
\\int_0^1\\psi_1(t)\\psi_2(t)\\,dt
=\\frac{\\sqrt{3}}{2}
$$

따라서 두 노이즈 좌표 사이에는 양의 상관관계가 존재한다.

특히 $z_1$이 상대적으로 큰 값을 갖는 영역에서 수집한 $z_2$는, $z_1$이 작은 영역에서 수집한 $z_2$보다 평균이 크게 나타나는 경향이 있다.

기존 영역 $R_1=[0,0.1]$과 $R_2=[0.2,0.3]$을 사용하면 두 히스토그램의 중심이 서로 다른 위치에 나타날 것으로 예상된다.

또한 두 조건에서 얻은 표본분산은 서로 비슷한 값을 갖지만, 조건을 적용하지 않은 전체 \`z2s\`의 분산인 0.125보다 작게 나타난다.

실제 히스토그램의 모양과 평균·분산은 무작위 표본에 따라 약간 달라질 수 있다.`,
        },
        {
          "id": "19-1G2",
          "title": "1.G2.",
          "type": "essay",
          "prompt": `문제 1.G1의 결과에 근거하면, ‘p2t’를 수정한 후에 ‘z1’과 ‘z2’는 여전히 독립인가? 문제 1.G1의 결과를 이용하여 자신의 답에 대한 근거를 쓰시오.`,
          
referenceAnswer: `**수정된 \`p2t\`를 사용하면 \`z1\`과 \`z2\`는 더 이상 서로 독립이 아니다.**

문제 1.G1에서 $z_1$이 서로 다른 영역에 속할 때 수집한 $z_2$의 히스토그램을 비교하면, 두 분포의 중심이 서로 다른 위치에 나타난다.

즉, $z_1$에 부여한 조건에 따라 $z_2$의 확률분포가 달라진다.

서로 독립인 두 확률 변수라면 한 변수에 조건을 부여하더라도 다른 변수의 확률분포는 변하지 않아야 한다.

$$
f_{Z_2\\mid Z_1}(z_2\\mid z_1)
=f_{Z_2}(z_2)
$$

그러나 이번 실험에서는 $z_1$의 조건에 따라 $z_2$의 분포가 변하므로 두 좌표는 서로 독립이 아니다.

이론적으로도 문제 1.E5에서 두 좌표의 상호상관이 다음과 같이 0이 아님을 확인했다.

$$
E[z_1z_2]=\\frac{\\sqrt{3}}{4}N_0\\neq0
$$

두 좌표의 평균은 모두 0이므로 공분산도 0이 아니다. 따라서 두 노이즈 좌표 사이에는 상관관계가 존재하며, 서로 독립이 아니다.`,
        },
        {
          "id": "19-1G3",
          "title": "1.G3.",
          "type": "python",
          consoleEnabled: true,
          "prompt": `수정된 ‘p2t’에 대하여, 문제 1.B1, 1.B2, 1.C1, 1.C2를 다시 수행하고 결과를 확인하시오.
\`\`\`python
>>> import matplotlib.pyplot as plt
>>> plt.figure(); plt.hist(z1s,100)
>>> plt.figure(); plt.hist(z2s,100)
>>> print(np.mean(z1s))
>>> print(np.var(z1s))
>>> print(np.mean(z2s))
>>> print(np.var(z2s))
\`\`\`            
‘p2t’를 수정한 후에도 수정하기 전과 같은 결과임을 확인하고, 그 이유를 설명하시오.
          `,
          
referenceAnswer: `수정된 \`p2t\`로 다시 계산한 \`z1s\`와 \`z2s\`의 히스토그램은 모두 평균 0을 중심으로 하는 가우시안 분포를 나타낸다.

\`\`\`python
import matplotlib.pyplot as plt

plt.figure()
plt.hist(z1s, 100)
plt.title("Distribution of z1")
plt.grid(True)

plt.figure()
plt.hist(z2s, 100)
plt.title("Distribution of z2")
plt.grid(True)

print(np.mean(z1s))
print(np.var(z1s))
print(np.mean(z2s))
print(np.var(z2s))
\`\`\`

두 좌표의 이론적인 평균과 분산은 수정 전과 동일하다.

$$
E[z_1]=E[z_2]=0
$$

$$
\\operatorname{Var}(z_1)
=\\operatorname{Var}(z_2)
=0.125
$$

그 이유는 수정된 두 번째 함수 역시 에너지가 1인 정규화된 함수이기 때문이다.

$$
\\int_0^1\\psi_2^2(t)\\,dt=1
$$

가우시안 잡음을 정규화된 함수에 투영한 결과의 분산은 해당 함수의 에너지에 비례한다. 따라서 함수의 위상이 바뀌더라도 에너지가 유지되면 노이즈 좌표의 분산은 변하지 않는다.

또한 가우시안 확률 과정에 대한 선형 연산이므로 수정된 \`z2\` 역시 가우시안 분포를 따른다.

따라서 **두 좌표의 주변 확률분포는 수정 전과 동일하지만, 두 좌표 사이의 상관관계와 독립성은 달라진다.**`,
        },
        { //문제 1.H
          "id": "19-1H",
          "title": "1.H.",
          "prompt": `직교 기저 벡터가 노이즈 벡터에 끼치는 영향을 알아보자.`
        },
        {
          "id": "19-1H1",
          "title": "1.H1.",
          "type": "essay",
          "prompt": `벡터 공간에서 기저 벡터들이 서로 직교하면, 벡터 공간의 가우시안 노이즈 벡터(좌표)의 원소들은 서로 독립적이다. 현재까지 19장에서 완료한 문항 중 어떤 문항이 이러한 사실을 실험으로 검증한 문항인가? 또한, 어떤 문항과 답이 이러한 사실을 이론적으로 검증한 문항인가? 해당 문항에서 어떤 근거로 서로 독립임을 검증했는가?`,
          
referenceAnswer: `**실험적 검증: 문제 1.D1과 1.D2**

문제 1.D1에서는 $z_1$이 두 영역 $R_1$과 $R_2$에 포함될 때 수집한 $z_2$의 히스토그램을 비교했다. 두 조건에서 얻은 분포는 모두 평균 0, 분산 약 0.125인 가우시안 분포로 나타났다.

문제 1.D2에서는 $R_1$과 $R_2$의 범위를 변경한 후에도 같은 결과를 확인했다.

이는 $z_1$에 부여한 조건에 관계없이 $z_2$의 분포가 유지됨을 보여 주므로, 두 노이즈 좌표의 독립성을 실험적으로 뒷받침한다.

**이론적 검증: 문제 1.E3과 1.E4**

문제 1.E3에서는 두 정규직교 기저 함수의 직교성을 이용하여 상호상관이 0임을 증명했다.

$$
\\begin{aligned}
E[z_1z_2]
&=\\frac{N_0}{2}
\\int_0^T\\psi_1(t)\\psi_2(t)\\,dt\\\\
&=0
\\end{aligned}
$$

또한 문제 1.E4에서는 두 좌표가 결합 가우시안 확률 변수라는 사실을 이용했다.

결합 가우시안 확률 변수들은 공분산이 0이면 서로 독립이다. 두 좌표는 평균이 모두 0이므로 상호상관이 0이면 공분산도 0이다.

따라서 다음과 같이 결론 내릴 수 있다.

$$
\\boxed{z_1\\text{과 }z_2\\text{는 서로 독립이다.}}
$$`,
        },
        {
          "id": "19-1H2",
          "title": "1.H2.",
          "type": "essay",
          "prompt": `벡터 공간에서 기저 벡터들이 서로 직교하지 않으면, 벡터 공간의 노이즈 벡터들의 원소들은 서로 독립적이지 않게 된다. 현재까지 19장에서 완료한 문항 중 어떤 문항이 이러한 사실을 실험으로 검증한 문항인가? 또한, 어떤 문항과 답이 이러한 사실을 이론적으로 검증한 문항인가? 해당 문항에서 어떤 근거로 서로 독립이 아님을 검증했는가?`,
          
referenceAnswer: `**실험적 검증: 문제 1.G1과 1.G2**

문제 1.G1에서는 두 번째 함수를 다음과 같이 수정했다.

$$
\\psi_2(t)
=\\sqrt{2}\\sin\\left(
3\\pi t+\\frac{\\pi}{3}
\\right)
$$

수정 후 $z_1$이 서로 다른 영역 $R_1$과 $R_2$에 포함될 때의 $z_2$ 히스토그램을 비교했다.

그 결과 두 조건에서 얻은 분포의 평균이 달라지는 것을 관찰할 수 있다. 이는 $z_2$의 분포가 $z_1$에 부여한 조건에 영향을 받는다는 의미이다.

문제 1.G2에서는 이러한 결과를 근거로 두 노이즈 좌표가 서로 독립이 아님을 확인했다.

**이론적 검증: 문제 1.E5**

문제 1.E5에서는 수정된 두 함수의 내적을 이용하여 상호상관을 계산했다.

$$
\\begin{aligned}
E[z_1z_2]
&=\\frac{N_0}{2}
\\int_0^1\\psi_1(t)\\psi_2(t)\\,dt\\\\
&=\\frac{\\sqrt{3}}{4}N_0
\\end{aligned}
$$

두 좌표의 평균은 모두 0이므로, 공분산도 다음과 같이 0이 아니다.

$$
\\operatorname{Cov}(z_1,z_2)
=\\frac{\\sqrt{3}}{4}N_0\\neq0
$$

즉, 두 좌표 사이에 상관관계가 존재한다. 독립인 확률 변수의 공분산은 0이어야 하므로, 다음과 같이 결론 내릴 수 있다.

$$
\\boxed{z_1\\text{과 }z_2\\text{는 서로 독립이 아니다.}}
$$`,
        },
      ]
    },
    { //문제 2
      "id": "19-2",
      "title": "2. 상관기(Correlator) 기반 ML 검출 기법",
      "problems": [
        { //문제 2.A
          "id": "19-2A",
          "title": "2.A.",
          "prompt": `AWGN 채널 환경에서 M-ary 신호 전송 시스템이 있다. 여기서도, M-ary 신호의 길이(심벌의 주기)는 $T$, 송신 M-ary 신호는 $s_i(t)(i=1, 2, \\cdots, M)$, 수신 신호는 $r(t)$로 표현하자.
          
만약, $s_i(t)$들이 MPSK나 MFSK처럼 같은 에너지를 가지는 경우라면, 즉 $E_{s_1(t)}=E_{s_2(t)}=\\cdots=E_{s_M(t)}$이면, [[equation:19.3]]이 성립함을 수식으로 증명할 수 있다.
$$
\\underset{k}{\\operatorname{argmin}}
\\int_{0}^{T} \\left|r(t)-s_k(t)\\right|^2\\,dt
=\\underset{k}{\\operatorname{argmax}}
\\operatorname{Re}\\left[
\\int_{0}^{T} r(t)s_k^{*}(t)\\,dt
\\right]
\\qquad \\text{(식 19.3)}
$$
이때, $r(t)$와 $s_i(t)$는 복소(Complex) 신호로 가정한다. [[equation:19.3]]의 좌변은 수신 신호 $r(t)$와 $s_i(t)$들의 차이 에너지 제곱 중 차이 에너지가 최소가 되는 M-ary 신호 $s_k(t)$의 인덱스(index) $k$이고, 우변은 $r(t)$와 $s_i(t)$들의 상관 값 중 상관 값이 최대가 되는 M-ary 신호 $s_k(t)$의 인덱스(index) $k$이다. [[equation:19.3]]에 의하면, $s_i(t)$들이 같은 에너지를 가지는 때에는, 유클리드(Euclidean) 거리가 아닌 상관 값(Correlation) 계산을 사용하는 ML 수신기를 설계할 수 있다. 이것을 ‘상관기 기반 ML 수신기(Correlator-based ML Receiver)’라고 부른다.
`
        },
        {
          "id": "19-2A1",
          "title": "2.A1.",
          "type": "proof",
          "prompt": `[[equation:19.3]]을 증명하시오.`,
          
referenceAnswer: `수신 신호 $r(t)$와 $k$번째 송신 신호 $s_k(t)$ 사이의 차이 에너지는 다음과 같다.

$$
D_k=\\int_0^T|r(t)-s_k(t)|^2\\,dt
$$

복소 신호에 대해 제곱항을 전개하면,

$$
\\begin{aligned}
|r(t)-s_k(t)|^2
&=(r(t)-s_k(t))(r^*(t)-s_k^*(t))\\\\
&=|r(t)|^2+|s_k(t)|^2\\\\
&\\quad-2\\operatorname{Re}[r(t)s_k^*(t)]
\\end{aligned}
$$

이다. 이를 적분하면 다음과 같다.

$$
\\begin{aligned}
D_k
&=\\int_0^T|r(t)|^2\\,dt
+\\int_0^T|s_k(t)|^2\\,dt\\\\
&\\quad-2\\operatorname{Re}
\\left[\\int_0^T r(t)s_k^*(t)\\,dt\\right]\\\\
&=E_r+E_{s_k}
-2\\operatorname{Re}
\\left[\\int_0^T r(t)s_k^*(t)\\,dt\\right]
\\end{aligned}
$$

여기서 $E_r$은 수신 신호의 에너지이므로 송신 후보 $k$에 관계없이 일정하다. 또한 모든 M-ary 신호의 에너지가 동일하므로 $E_{s_k}=E_s$이다.

따라서 $D_k$를 최소화하는 것은 상관 값의 실수부를 최대화하는 것과 같다.

$$
\\boxed{
\\underset{k}{\\operatorname{argmin}}
\\int_0^T|r(t)-s_k(t)|^2\\,dt
=
\\underset{k}{\\operatorname{argmax}}
\\operatorname{Re}
\\left[
\\int_0^T r(t)s_k^*(t)\\,dt
\\right]
}
$$

즉, 모든 송신 신호의 에너지가 동일할 때 최소 차이 에너지 검출과 최대 상관 검출은 동일한 송신 신호를 선택한다.`,
        },
        {
          "id": "19-2A2",
          "title": "2.A2.",
          "type": "proof",
          "prompt": `다음을 증명하시오.
$$
\\int_{0}^{T} r(t)s_k^{*}(t)\\,dt
=\\left<
\\mathbf{z}, \\mathbf{s_k^{*}}
\\right>
$$
(여기서, $\\mathbf{z}$와 $\\mathbf{s_k^{*}}$는 각각 $r(t)$와 $s_k(t)$의 벡터 공간상 좌표이고, $\\left<\\mathbf{z}, \\mathbf{s_k^{*}}\\right>$는 $\\mathbf{z}$와 $\\mathbf{s_k^{*}}$의 내적을 뜻함)
          `,
          
referenceAnswer: `송신 신호 $s_k(t)$를 $N$개의 정규직교 기저 함수로 표현하면 다음과 같다.

$$
s_k(t)=\\sum_{j=1}^{N}a_{kj}\\psi_j(t)
$$

수신 신호를 동일한 기저 함수에 투영한 좌표는 다음과 같다.

$$
z_j=\\int_0^T r(t)\\psi_j^*(t)\\,dt
$$

송신 신호의 복소켤레를 상관 적분에 대입하면,

$$
\\begin{aligned}
\\int_0^T r(t)s_k^*(t)\\,dt
&=\\int_0^T r(t)
\\left(\\sum_{j=1}^{N}a_{kj}^*\\psi_j^*(t)\\right)dt\\\\
&=\\sum_{j=1}^{N}a_{kj}^*
\\int_0^T r(t)\\psi_j^*(t)\\,dt\\\\
&=\\sum_{j=1}^{N}z_j a_{kj}^*
\\end{aligned}
$$

이다.

수신 벡터와 송신 신호의 벡터공간 좌표를 각각 다음과 같이 정의하자.

$$
\\mathbf{z}=(z_1,z_2,\\ldots,z_N)
$$

$$
\\mathbf{s}_k=(a_{k1},a_{k2},\\ldots,a_{kN})
$$

그러면 상관 적분은 두 벡터의 복소 내적으로 표현할 수 있다.

$$
\\boxed{
\\int_0^T r(t)s_k^*(t)\\,dt
=
\\sum_{j=1}^{N}z_j a_{kj}^*
=
\\left\\langle\\mathbf{z},\\mathbf{s}_k\\right\\rangle
}
$$

따라서 시간 영역에서 계산한 상관 값은 신호 벡터공간에서 수신 벡터와 송신 벡터 사이의 내적과 동일하다.`,
        },
        {
          "id": "19-2A3",
          "title": "2.A3.",
          "type": "proof",
          "prompt": `문제 2.A2의 등식을 이용하여, [[equation:19.3]]이 아래와 같음을 보이시오.
$$
\\underset{k}{\\operatorname{argmin}}
\\int_{0}^{T} \\left|r(t)-s_k(t)\\right|^2\\,dt
=\\underset{k}{\\operatorname{argmax}}
\\operatorname{Re}\\left[
\\left<
\\mathbf{z}, \\mathbf{s_k^{*}}
\\right>
\\right]
$$          
          `,
          
referenceAnswer: `문제 2.A1에서 모든 송신 신호의 에너지가 동일하면 최소 차이 에너지 검출과 최대 상관 검출이 동일함을 증명했다.

$$
\\underset{k}{\\operatorname{argmin}}
\\int_0^T|r(t)-s_k(t)|^2\\,dt
=
\\underset{k}{\\operatorname{argmax}}
\\operatorname{Re}
\\left[
\\int_0^T r(t)s_k^*(t)\\,dt
\\right]
$$

또한 문제 2.A2에서 시간 영역의 상관 적분이 벡터공간의 내적과 동일함을 보였다.

$$
\\int_0^T r(t)s_k^*(t)\\,dt
=
\\sum_{j=1}^{N}z_j a_{kj}^*
$$

따라서 이를 최대 상관 검출식에 대입하면,

$$
\\boxed{
\\underset{k}{\\operatorname{argmin}}
\\int_0^T|r(t)-s_k(t)|^2\\,dt
=
\\underset{k}{\\operatorname{argmax}}
\\operatorname{Re}
\\left[
\\left\\langle
\\mathbf{z},\\mathbf{s}_k
\\right\\rangle
\\right]
}
$$

이다.

즉, 모든 송신 신호의 에너지가 동일한 경우 수신 신호를 벡터공간 좌표로 변환한 후, 각 송신 벡터와의 내적에서 실수부가 가장 큰 신호를 선택하면 ML 검출을 수행할 수 있다.`,
        },
        {
          "id": "19-2A4",
          "title": "2.A4.",
          "type": "essay",
          "prompt": `$\\underset{k}{\\operatorname{argmax}}\\operatorname{Re}\\left[\\left<\\mathbf{z}, \\mathbf{s_k^{*}}\\right>\\right]$를 이용하여 수신기를 구현할 때, 수신기의 계산량 측면에서 장점은 무엇인지 설명하시오. 
          `,
          
referenceAnswer: `벡터공간에서 상관 값을 이용한 ML 수신기는 모든 송신 후보에 대해 유클리드 거리를 직접 계산하는 대신, 수신 벡터와 각 송신 벡터 사이의 내적만 비교하면 된다.

$$
\\boxed{
\\hat{k}
=
\\underset{k}{\\operatorname{argmax}}
\\operatorname{Re}
\\left[
\\sum_{j=1}^{N}z_j a_{kj}^*
\\right]
}
$$

최소 거리 검출에서는 각 송신 후보에 대해 좌표의 차이를 계산하고 이를 제곱하여 합산해야 한다.

반면 최대 상관 검출에서는 좌표 간 곱을 합산한 후 실수부만 비교하므로, 좌표의 차이 및 제곱 연산을 생략할 수 있다.

또한 수신 신호를 처음 한 번만 $N$차원 벡터공간으로 변환하면, 이후에는 각 송신 후보에 대해 $N$개 좌표의 내적만 계산하면 된다. 따라서 신호의 전체 샘플 수가 $L$이고 $N$이 $L$보다 충분히 작은 경우에는 시간 영역에서 모든 후보 파형과 직접 비교하는 방법보다 계산량을 줄일 수 있다.

특히 송신 신호의 에너지가 모두 동일하면 후보별 에너지 계산도 필요하지 않으므로 수신기를 더욱 간단하게 구현할 수 있다.`,
        },
        { //문제 2.B
          "id": "19-2B",
          "title": "2.B.",
          "prompt": `아래 py 스크립트는 상관기 기반 ML 검출 기법을 이용하여 수신 신호를 복조한다.
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

data_bits_hat=np.empty(0) #복조된 비트를 저장하기 위한 벡터 초기화
for n in range(1,Ns+1):
    rt_nth=rt[(n-1)*L:n*L] # n번째 M-ary 수신 신호 샘플
    
    C_rt_nth_s1t=sum(rt_nth*s1t)*tstep # 수신 신호와 s1t의 상관 값을 수치적분으로 계산
    ...
    ...
    C_rt_nth_s4t=???

    T=np.argmax([C_rt_nth_s1t,?,?,?]) # M-ary 신호 중 수신 신호와 상관 값이 가장 높은 신호를 찾음
    if (T==0):
        twobits_hat=np.array([?, ?]) # <표 18.1>을 참고하여 복조한 M-ary 신호에 따라 데이터를 매핑
    elif (T==1):
        ...
    elif (T==2):
        ...
    else:
        ...
        

    data_bits_hat=np.append(data_bits_hat, twobits_hat)  #검출된 비트를 비트열로 연결

import pickle
with open('data_bits_hat.pkl', 'wb') as f: pickle.dump(data_bits_hat,f)
\`\`\`
먼저 18장에서 한 것과 같이, ‘st_and_rt.mat’ 파일을 load하여 $r(t)$의 샘플 벡터 ‘rt’와 $s_i(t)$들의 샘플 벡터 ‘s1t’, ‘s2t’, ‘s3t’, ‘s4t’를 불러온다. 18장에서는 유클리드 거리 기반 ML 검출 기법을 사용하여 수신 신호를 복조한 바가 있다. 아래의 라인 ‘C_rt_nth_s1t=sum(rt_nth*s1t)*tstep’에서, 우변인 ‘sum(rt_nth*s1t)*tstep’은 수신 신호 $r(t)$와 M-ary 신호 중 하나인 $s_1(t)$의 상관 값 $\\int_{0}^{T}r(t)s_1^{*}(t)\\,dt$를 수치적분으로 계산한 것이다. $r(t)$와 $s_i(t)(i=1, 2, \\cdots, M)$는 모두 실수 신호이기 때문에, 신호의 실수부를 취하기 위한 추가적인 작업은 수행하지 않는다. 그리고, 라인 ‘T=np.argmax([C_rt_nth_s1t, ?,?,?])’에서, $s_i(t)(i=1, 2, \\cdots, M)$ 중 $r(t)$와 상관 값이 가장 높은 신호를 찾는다.`
        },
        {
          "id": "19-2B1",
          "title": "2.B1.",
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

data_bits_hat=np.empty(0) #복조된 비트를 저장하기 위한 벡터 초기화
for n in range(1,Ns+1):
    rt_nth=rt[(n-1)*L:n*L] # n번째 M-ary 수신 신호 샘플
    
    C_rt_nth_s1t=sum(rt_nth*s1t)*tstep # 수신 신호와 s1t의 상관 값을 수치적분으로 계산
    ...
    ...
    C_rt_nth_s4t=???

    T=np.argmax([C_rt_nth_s1t,?,?,?]) # M-ary 신호 중 수신 신호와 상관 값이 가장 높은 신호를 찾음
    if (T==0):
        twobits_hat=np.array([?, ?]) # <표 18.1>을 참고하여 복조한 M-ary 신호에 따라 데이터를 매핑
    elif (T==1):
        ...
    elif (T==2):
        ...
    else:
        ...
        

    data_bits_hat=np.append(data_bits_hat, twobits_hat)  #검출된 비트를 비트열로 연결

import pickle
with open('data_bits_hat.pkl', 'wb') as f: pickle.dump(data_bits_hat,f)`,
          "prompt": `위 py 스크립트를 완성하고 실행하시오.`,
          
referenceAnswer: `상관기 기반 검출은 수신 신호와 네 송신 신호의 상관 값을 각각 계산한 후, 가장 큰 상관 값을 갖는 신호를 선택한다.

각 송신 신호에 대한 상관 값은 다음과 같다.

$$
C_i=\\int_0^T r_n(t)s_i(t)\\,dt
$$

주어진 신호는 모두 실수이므로 복소켤레와 실수부를 별도로 계산할 필요가 없다.

완성된 Python 코드는 다음과 같다.

\`\`\`python
import numpy as np
from scipy.io import loadmat
import pickle

# 실습 데이터 불러오기
file_load("ch18/st_and_rt.mat")
mat = loadmat("st_and_rt.mat", simplify_cells=True)

# 심벌당 샘플 수, 심벌 수, 샘플 간격
L = int(mat["L"])
Ns = int(mat["Ns"])
tstep = float(mat["tstep"])

# 수신 신호와 네 송신 신호 불러오기
rt = np.asarray(mat["rt"]).ravel()
s1t = np.asarray(mat["s1t"]).ravel()
s2t = np.asarray(mat["s2t"]).ravel()
s3t = np.asarray(mat["s3t"]).ravel()
s4t = np.asarray(mat["s4t"]).ravel()

# 전체 복조 비트열을 저장할 배열
data_bits_hat = np.empty(2 * Ns, dtype=np.uint8)

# 각 수신 심벌에 대해 상관 검출 수행
for n in range(1, Ns + 1):

    # n번째 수신 심벌의 샘플 추출
    rt_nth = rt[(n-1)*L:n*L]

    # 네 송신 신호와의 상관 값 계산
    C_rt_nth_s1t = sum(rt_nth * s1t) * tstep
    C_rt_nth_s2t = sum(rt_nth * s2t) * tstep
    C_rt_nth_s3t = sum(rt_nth * s3t) * tstep
    C_rt_nth_s4t = sum(rt_nth * s4t) * tstep

    # 상관 값이 가장 큰 신호 선택
    T = np.argmax([
        C_rt_nth_s1t,
        C_rt_nth_s2t,
        C_rt_nth_s3t,
        C_rt_nth_s4t
    ])

    # 선택한 신호를 두 비트로 디매핑
    if T == 0:
        twobits_hat = np.array([0, 0])
    elif T == 1:
        twobits_hat = np.array([0, 1])
    elif T == 2:
        twobits_hat = np.array([1, 0])
    else:
        twobits_hat = np.array([1, 1])

    # 검출한 두 비트를 순서대로 저장
    data_bits_hat[2*(n-1):2*n] = twobits_hat

# 복조 비트열 저장
with open("data_bits_hat.pkl", "wb") as f:
    pickle.dump(data_bits_hat, f)

# 처음 30비트 출력
print(data_bits_hat[0:30])
\`\`\`

검출 규칙은 다음과 같다.

$$
\\boxed{
\\hat{i}
=
\\underset{i\\in\\{1,2,3,4\\}}{\\operatorname{argmax}}
\\int_0^T r_n(t)s_i(t)\\,dt
}
$$

검출한 신호를 <표 18.1>의 매핑 규칙에 따라 두 비트로 변환하고, 모든 심벌에 대해 반복하여 전체 복조 비트열을 얻는다.`
        },
        {
          "id": "19-2B2",
          "title": "2.B2.",
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
(주의. 브라우저를 새로고침했거나 Chapter를 나갔다가 다시 들어오면 저장된 ‘data_bits_hat.pkl’이 사라지므로, 이 경우 문제 2.B1의 py 스크립트를 다시 실행할 것)

[[link:/workbook/ch18?p=18-3D|18장의 문제 3.D]]에서 얻은 ‘BER 결과’와 ‘복조된 미술 작품 그림’과 비교하시오. ‘BER 결과’와 ‘복조된 미술 작품 그림’ 각각에 대하여 어떤 차이가 발생했는지 쓰시오.
           `,
           
referenceAnswer: `문제 2.B1에서 상관기 기반 검출로 복조한 비트열을 실제 송신 비트열과 비교하여 BER을 계산한다.

$$
\\mathrm{BER}
=
\\frac{\\text{오류가 발생한 비트 수}}
{\\text{전체 송신 비트 수}}
$$

Python에서는 다음과 같이 계산한다.

\`\`\`python
BER = np.mean(data_bits != data_bits_hat)
print("BER =", BER)
\`\`\`

18장의 유클리드 거리 기반 ML 검출 결과와 비교하면, 현재의 상관기 기반 검출에서는 일반적으로 더 높은 BER이 나타날 수 있다.

이는 문제 2.A에서 증명한 두 검출 방법의 동등성이 **모든 후보 송신 신호의 에너지가 동일한 경우에만 성립하기 때문**이다. 현재 실습의 네 송신 신호는 에너지가 서로 다르므로, 상관 값만을 비교하는 검출은 유클리드 거리 기반 ML 검출과 동일한 결정을 내리지 않는다.

이에 따라 상관기 기반 검출로 복원한 이미지에는 유클리드 거리 기반 ML 검출 결과보다 더 많은 픽셀 오류와 색상 왜곡이 나타날 수 있다.

두 방법의 정확한 BER과 이미지 손상 정도는 동일한 수신 신호 \`rt\`에 대해 각 검출 코드를 실행한 결과를 기준으로 비교한다.`,
        },
        {
          "id": "19-2B3",
          "title": "2.B3.",
          "type": "essay",
          "prompt": `py 스크립트를 잘 작성했다면, 18장에서 같은 수신 신호 샘플 벡터 ‘rt’에 대해 유클리드 거리 기반 ML 검출을 수행했고, 그때의 BER 결과(18장의 문제 3.D 결과)가 문제 2.B2의 BER 결과보다 더 작음을 확인할 수 있을 것이다.
          
그런데, 문제 2.A에서 유도한 이론에 따르면, 상관 기반 ML 검출 기법은 유클리드 거리 기반 ML 검출 기법과 같은 성능을 얻는다는 것을 알 수 있었다.

(a) 그렇다면, 현재 수행하고 있는 실험에서, 어떤 원인에 의해 상관기 기반 검출 방법이 유클리드 거리 기반 ML 검출 기법보다 좋지 못한 BER 성능을 갖게 된 것인지 쓰시오.
(b) 위에 제시한 원인이 진짜로 있었는지, 18장에서의 실험 결과 중 하나를 보면 알 수 있다. 해당 실험 결과를 다시 보이고, 그 결과가 자신의 설명한 원인에 부합하는지 설명하시오.`,
          
referenceAnswer: `(a) 현재 실험에서 두 검출 방법의 BER이 달라지는 이유는 **네 송신 신호의 에너지가 서로 동일하지 않기 때문**이다.

수신 신호와 $k$번째 송신 후보 사이의 차이 에너지를 전개하면 다음과 같다.

$$
\\begin{aligned}
D_k
&=\\int_0^T|r(t)-s_k(t)|^2\\,dt\\\\
&=E_r+E_{s_k}
-2\\operatorname{Re}
\\left[
\\int_0^T r(t)s_k^*(t)\\,dt
\\right]
\\end{aligned}
$$

여기서 $E_r$은 모든 후보에 공통이므로 검출 결과에 영향을 주지 않는다. 그러나 현재 실험에서는 송신 신호 에너지 $E_{s_k}$가 후보에 따라 달라진다.

따라서 상관 값만 최대화하면 후보별 에너지 차이를 고려하지 못한다.

에너지가 서로 다른 신호에 대해서도 유클리드 거리 기반 ML 검출과 동일한 결정을 얻으려면 다음과 같이 검출해야 한다.

$$
\\boxed{
\\hat{k}
=
\\underset{k}{\\operatorname{argmax}}
\\left\\{
\\operatorname{Re}
\\left[
\\int_0^T r(t)s_k^*(t)\\,dt
\\right]
-\\frac{E_{s_k}}{2}
\\right\\}
}
$$

(b) 이러한 원인은 18장의 문제 3.A3에서 구한 네 송신 신호의 벡터공간 좌표를 이용하여 확인할 수 있다.

각 송신 신호의 에너지는 정규직교 기저에 대한 좌표의 제곱합과 같다.

$$
E_{s_i}=a_{i1}^2+a_{i2}^2
$$

앞서 구한 좌표가 $\\mathbf{s}_1=(1,3)$, $\\mathbf{s}_2=(2,5)$, $\\mathbf{s}_3=(4,-1)$, $\\mathbf{s}_4=(-3,-2)$일 때, 각 신호의 에너지는 다음과 같다.

[[table:
송신 신호 | 벡터공간 좌표 | 신호 에너지
$s_1(t)$ | $(1,3)$ | $1^2+3^2=10$
$s_2(t)$ | $(2,5)$ | $2^2+5^2=29$
$s_3(t)$ | $(4,-1)$ | $4^2+(-1)^2=17$
$s_4(t)$ | $(-3,-2)$ | $(-3)^2+(-2)^2=13$
]]

네 신호의 에너지가 서로 다르므로 문제 2.A의 동일 에너지 조건을 만족하지 않는다. 따라서 현재 실험에서 단순 최대 상관 검출과 유클리드 거리 기반 ML 검출의 BER이 다르게 나타나는 것은 이론적인 결과와 모순되지 않는다.

실제 신호 에너지는 다음 코드로도 확인할 수 있다.

\`\`\`python
for name, signal in [
    ("s1", s1t),
    ("s2", s2t),
    ("s3", s3t),
    ("s4", s4t)
]:
    energy = np.sum(np.abs(signal)**2) * tstep
    print(name, "energy =", energy)
\`\`\`

결론적으로, 현재 실습의 송신 신호들은 동일 에너지 조건을 만족하지 않으므로 후보별 에너지 항을 생략한 단순 상관 검출이 유클리드 거리 기반 ML 검출보다 높은 BER을 나타낼 수 있다.`,
        },
        { //문제 2.C
          "id": "19-2C",
          "title": "2.C.",
          "prompt": `4-ary 신호들이 같은 에너지를 가진 때에 대해 실험을 수행하자. 18장의 ‘rt_gen.py’에서 ‘a’, ‘b’, ‘c’, …, ‘h’의 값을 적절하게 재설정하면, 같은 에너지를 갖는 ‘s1t’, ‘s2t’, ‘s3t’, ‘s4t’를 생성할 수 있다. 그런 다음, 수정된 ‘s1t’, ‘s2t’, ‘s3t’, ‘s4t’를 이용하여 이미지 비트열을 전송하여, 수신한 신호의 샘플 벡터 ‘rt’를 다시 생성할 수 있다.
        `
        },
        {
          "id": "19-2C1",
          "title": "2.C1.",
          "type": "proof",
          "prompt": `임의의 신호 $s(t)$에 대한 벡터 공간의 좌표를 $\\mathcal{s}$라고 할 때, $\\mathcal{s}$로부터 $s(t)$의 에너지를 계산할 수 있다. 계산식을 쓰시오.`,
          
referenceAnswer: `신호 $s(t)$가 $N$개의 정규직교 기저 함수로 표현된다고 하자.

$$
s(t)=\\sum_{k=1}^{N}a_k\\psi_k(t)
$$

이때 신호의 벡터공간 좌표는 다음과 같다.

$$
\\mathcal{s}=(a_1,a_2,\\ldots,a_N)
$$

신호의 에너지는 다음과 같이 계산한다.

$$
E_s=\\int_0^T|s(t)|^2\\,dt
$$

기저 함수의 선형 결합을 대입하고 정규직교 조건을 적용하면,

$$
\\begin{aligned}
E_s
&=\\int_0^T
\\left|
\\sum_{k=1}^{N}a_k\\psi_k(t)
\\right|^2dt\\\\
&=\\sum_{k=1}^{N}|a_k|^2
\\end{aligned}
$$

이다.

따라서 신호의 에너지는 벡터공간 좌표의 크기를 제곱한 값과 같다.

$$
\\boxed{
E_s=\\|\\mathcal{s}\\|^2
=\\sum_{k=1}^{N}|a_k|^2
}
$$

특히 실수 신호를 2차원 벡터공간의 좌표 $(a,b)$로 표현하면,

$$
\\boxed{E_s=a^2+b^2}
$$

이다.`,
        },
        {
          "id": "19-2C2",
          "title": "2.C2.",
          "type": "essay",
          "prompt": `아래는 18장의 ‘rt_gen.py’이다.
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
noise_sample = 3 * rng.standard_normal(xt_len) #AWGN
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
$s_1(t)$(샘플링 벡터=‘s1t’)의 벡터 공간에서, $x$, $y$ 좌표를 나타내는 변수인 ‘a’, ‘b’를 각각 ‘a=2’, ‘b=-1’로 설정하면, 문제 2.C1의 답을 이용하여 ‘s1t’의 에너지가 $5$임을 보이시오.
          `,
          
referenceAnswer: `첫 번째 송신 신호는 두 정규직교 기저 함수의 선형 결합으로 표현된다.

$$
s_1(t)=a\\psi_1(t)+b\\psi_2(t)
$$

문제에서 주어진 계수 $a=2$, $b=-1$을 대입하면,

$$
s_1(t)=2\\psi_1(t)-\\psi_2(t)
$$

이다. 따라서 첫 번째 송신 신호의 벡터공간 좌표는 다음과 같다.

$$
\\mathbf{s}_1=(2,-1)
$$

문제 2.C1에서 구한 신호 에너지 계산식을 적용하면,

$$
\\begin{aligned}
E_{s_1}
&=a^2+b^2\\\\
&=2^2+(-1)^2\\\\
&=4+1\\\\
&=\\boxed{5}
\\end{aligned}
$$

따라서 첫 번째 송신 신호의 에너지는 5이다.

Python 코드에서는 다음과 같이 계수를 설정한다.

\`\`\`python
a, b = 2, -1
\`\`\`

생성된 신호의 에너지는 수치적분을 이용하여 다음과 같이 확인할 수 있다.

\`\`\`python
s1t = a * p1t + b * p2t

Es1 = np.sum(s1t**2) * tstep
print("Energy of s1 =", Es1)
\`\`\`

실행 결과는 수치적 오차를 무시하면 5이다.`,
        },
        {
          "id": "19-2C3",
          "title": "2.C3.",
          "type": "essay",
          "prompt": `‘s2t’, ‘s3t’, ‘s4t’가 ‘s1t’와 같은 에너지를 가질 수 있도록, ‘c’, ‘d’, ‘e’, ‘f’, ‘g’, ‘h’의 값을 재설정하시오. (여러 가지 값이 가능함)`,
          
referenceAnswer: `첫 번째 신호의 에너지가 5이므로, 나머지 세 신호도 다음 조건을 만족하도록 계수를 설정해야 한다.

$$
\\boxed{
c^2+d^2=e^2+f^2=g^2+h^2=5
}
$$

이를 만족하는 계수의 한 가지 예는 다음과 같다.

$$
\\begin{aligned}
\\mathbf{s}_1&=(2,-1)\\\\
\\mathbf{s}_2&=(1,2)\\\\
\\mathbf{s}_3&=(-2,1)\\\\
\\mathbf{s}_4&=(-1,-2)
\\end{aligned}
$$

따라서 Python 코드의 계수를 다음과 같이 설정한다.

\`\`\`python
a, b =  2, -1
c, d =  1,  2
e, f = -2,  1
g, h = -1, -2
\`\`\`

각 신호의 에너지를 계산하면,

$$
\\begin{aligned}
E_{s_1}&=2^2+(-1)^2=5\\\\
E_{s_2}&=1^2+2^2=5\\\\
E_{s_3}&=(-2)^2+1^2=5\\\\
E_{s_4}&=(-1)^2+(-2)^2=5
\\end{aligned}
$$

이다.

따라서 네 가지 송신 신호의 에너지는 모두 동일하다.

$$
\\boxed{
E_{s_1}=E_{s_2}=E_{s_3}=E_{s_4}=5
}
$$

이와 같이 설정하면 네 신호는 2차원 벡터공간에서 원점을 중심으로 반지름이 $\\sqrt{5}$인 원 위에 위치한다.`
        },
        { //문제 2.D
          "id": "19-2D",
          "title": "2.D.",
          "prompt": `문제 2.C2~2.C3에서 자신이 설정한 ‘a’, ‘b’, ‘c’, …, ‘h’의 값을 적용한 ‘rt_gen.py’를 실행하자. 수정한 ‘rt_gen.py’를 실행하면, 같은 에너지를 가지는 4-ary 신호 ‘s1t’, ‘s2t’, ‘s3t’, ‘s4t’가 새롭게 생성되고, 새롭게 생성된 4-ary 신호를 이용하여 이미지 비트열을 전송하여 수신한 신호의 샘플 벡터 ‘rt’가 새로 생성된다.`
        },
        {
          "id": "19-2D1",
          "title": "2.D1.",
          "type": "python",
          starterCode: `# rt_gen.py
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
print("MAT 파일 저장 완료")`,
          "prompt": `수정된 ‘rt_gen.py’를 실행하여, ‘st_and_rt.mat’ 파일을 새로 생성하시오.`,
          referenceAnswer: `문제 2.C2~2.C3에서 설정한 계수를 \`rt_gen.py\`에 적용하여 네 송신 신호의 에너지가 모두 같도록 설정한다.

첫 번째 송신 신호의 좌표는 $(2,-1)$이므로 에너지는 다음과 같다.

$$
E_{s_1}=2^2+(-1)^2=5
$$

나머지 세 신호도 에너지가 5가 되도록 다음과 같이 설정할 수 있다.

\`\`\`python
a, b =  2, -1
c, d =  1, -2
e, f =  1,  2
g, h = -2, -1
\`\`\`

각 송신 신호의 에너지를 계산하면,

$$
\\begin{aligned}
E_{s_1}&=2^2+(-1)^2=5\\\\
E_{s_2}&=1^2+(-2)^2=5\\\\
E_{s_3}&=1^2+2^2=5\\\\
E_{s_4}&=(-2)^2+(-1)^2=5
\\end{aligned}
$$

이다.

따라서 네 송신 신호는 모두 동일한 에너지를 가진다.

$$
\\boxed{
E_{s_1}=E_{s_2}=E_{s_3}=E_{s_4}=5
}
$$

설정한 계수로 \`rt_gen.py\`를 실행하면 네 송신 신호를 이용한 새로운 송신 신호와 AWGN이 추가된 수신 신호가 생성된다. 생성된 신호들은 \`st_and_rt.mat\`에 저장된다.

다음 코드로 각 송신 신호의 에너지를 확인할 수 있다.

\`\`\`python
for s in (s1t, s2t, s3t, s4t):
    print(np.sum(s**2) * tstep)
\`\`\`

네 신호의 에너지가 모두 5로 계산되면 동일 에너지 조건을 만족한다.`,
        },
        {
          "id": "19-2D2",
          "title": "2.D2.",
          "type": "python",
          "prompt": `[[link:/workbook/ch18?p=18-3B|18장의 문제 3.B]]에서 완성한 py 스크립트를 복사하여 붙여넣은 후 5번째 라인 'file_load("ch18/st_and_rt.mat")'을 제거하시오. 이후, py 스크립트를 실행하여, 새롭게 생성한 ‘rt’에 대해, 새로 생성한 ‘s1t’, ‘s2t’, ‘s3t’, ‘s4t’를 이용하여 ML 검출을 수행하시오.`,
          referenceAnswer: `문제 2.D1에서 새롭게 생성한 \`st_and_rt.mat\`을 불러와 유클리드 거리 기반 ML 검출을 수행한다.

기존 18장의 MAT 파일을 다시 불러오지 않도록 \`file_load("ch18/st_and_rt.mat")\` 명령은 제거한다.

$n$번째 수신 신호를 두 정규직교 기저 함수에 투영하면 벡터공간 좌표 $(z_1,z_2)$를 얻을 수 있다.

$$
\\begin{aligned}
z_1&=\\int_0^T r_n(t)\\psi_1(t)\\,dt\\\\
z_2&=\\int_0^T r_n(t)\\psi_2(t)\\,dt
\\end{aligned}
$$

이후 수신 벡터와 각 송신 벡터 사이의 제곱 유클리드 거리를 계산하고, 가장 작은 값을 갖는 신호를 선택한다.

$$
\\boxed{
\\hat{k}
=
\\underset{k}{\\operatorname{argmin}}
\\|\\mathbf{z}-\\mathbf{s}_k\\|^2
}
$$

완성된 Python 코드는 다음과 같다.

\`\`\`python
import numpy as np
from scipy.io import loadmat
import pickle

# 새롭게 생성한 MAT 파일 사용
mat = loadmat("st_and_rt.mat", simplify_cells=True)

L = int(mat["L"])
Ns = int(mat["Ns"])
tstep = float(mat["tstep"])

p1t = np.asarray(mat["p1t"]).ravel()
p2t = np.asarray(mat["p2t"]).ravel()
rt = np.asarray(mat["rt"]).ravel()

signals = np.stack([
    np.asarray(mat[name]).ravel()
    for name in ("s1t", "s2t", "s3t", "s4t")
])

# 네 송신 신호의 벡터공간 좌표
signal_coords = np.column_stack((
    np.sum(signals * p1t, axis=1) * tstep,
    np.sum(signals * p2t, axis=1) * tstep
))

data_bits_hat = np.empty(2 * Ns, dtype=np.uint8)

for n in range(Ns):
    rt_nth = rt[n*L:(n+1)*L]

    z1 = np.sum(rt_nth * p1t) * tstep
    z2 = np.sum(rt_nth * p2t) * tstep
    z = np.array([z1, z2])

    # 네 송신 신호까지의 제곱 거리
    distances = np.sum(
        (signal_coords - z)**2, axis=1
    )

    # 최소 거리 검출
    T = np.argmin(distances)

    # 심벌을 두 비트로 변환
    data_bits_hat[2*n] = T // 2
    data_bits_hat[2*n+1] = T % 2

with open("data_bits_hat.pkl", "wb") as f:
    pickle.dump(data_bits_hat, f)
\`\`\`

복조된 비트열은 \`data_bits_hat.pkl\`에 저장되며, 다음 문제에서 BER 계산과 이미지 복원에 사용한다.`,
        },
        {
          "id": "19-2D3",
          "title": "2.D3.",
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

first_bits = data_bits_hat[0::2]
second_bits = data_bits_hat[1::2]

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
(주의. 브라우저를 새로고침했거나 Chapter를 나갔다가 다시 들어오면 저장된 ‘data_bits_hat.pkl’이 사라지므로, 이 경우 문제 2.D2의 py 스크립트를 다시 실행할 것)
           `,
           referenceAnswer: `문제 2.D2에서 유클리드 거리 기반 ML 검출을 통해 얻은 복조 비트열 \`data_bits_hat\`을 원래 송신한 비트열 \`data_bits\`과 비교하여 BER을 계산한다.

비트 오류율은 다음과 같다.

$$
\\mathrm{BER}
=
\\frac{N_{\\mathrm{error}}}{N_b}
$$

여기서 $N_{\\mathrm{error}}$는 오류가 발생한 비트 수이고, $N_b$는 전체 송신 비트 수이다.

주어진 Python 코드에서는 다음과 같이 BER을 계산한다.

\`\`\`python
BER = np.mean(data_bits != data_bits_hat)
print("BER =", BER)
\`\`\`

이후 복조된 비트열에서 각 픽셀의 상위 2비트를 복원하여 수신 이미지를 출력한다.

\`\`\`python
first_bits = data_bits_hat[0::2]
second_bits = data_bits_hat[1::2]

pixel_values = (2 * first_bits + second_bits) * 64
Bhat = pixel_values.reshape(
    (h, w, 3), order="F"
).astype(np.uint8)
\`\`\`

복원된 이미지는 빈센트 반 고흐의 **The Starry Night(별이 빛나는 밤)**이다. AWGN으로 인해 일부 비트 오류가 발생하면 원본 이미지와 비교했을 때 특정 픽셀의 색상이 달라질 수 있다.

이번 실험에서 얻은 BER과 복원 이미지는 다음 문제에서 수행할 상관기 기반 검출의 결과와 비교하는 기준이 된다.

동일한 송신 신호 집합과 동일한 수신 신호를 사용한다면, 두 검출 방법은 이론적으로 동일한 비트열을 검출하므로 BER과 복원 이미지도 같아야 한다.`,
        },
        {
          "id": "19-2D4",
          "title": "2.D4.",
          "type": "python",
          "prompt": `문제 2.B1에서 완성한 py 스크립트를 복사하여 붙여넣은 후 3번째 라인 'file_load("ch18/st_and_rt.mat")'을 제거하시오. 이후, py 스크립트를 실행하여, 새롭게 생성한 ‘rt’에 대해, 새로 생성한 ‘s1t’, ‘s2t’, ‘s3t’, ‘s4t’를 이용하여 상관기 기반 검출을 수행하시오.`,
          
referenceAnswer: `문제 2.D1에서 생성한 새로운 \`st_and_rt.mat\`을 사용하여 상관기 기반 검출을 수행한다.

기존 18장의 실습 데이터를 다시 불러오지 않도록 \`file_load("ch18/st_and_rt.mat")\` 명령을 제거한다.

각 수신 심벌 $r_n(t)$와 네 송신 신호 $s_i(t)$ 사이의 상관 값을 계산한다.

$$
C_i=\\int_0^T r_n(t)s_i(t)\\,dt
$$

현재 네 송신 신호는 모두 실수이며 에너지가 동일하므로, 상관 값이 가장 큰 신호를 선택하면 유클리드 거리 기반 ML 검출과 같은 결과를 얻을 수 있다.

$$
\\boxed{
\\hat{i}
=
\\underset{i\\in\\{1,2,3,4\\}}{\\operatorname{argmax}}
C_i
}
$$

완성된 Python 코드는 다음과 같다.

\`\`\`python
import numpy as np
from scipy.io import loadmat
import pickle

# 문제 2.D1에서 새로 생성한 MAT 파일 불러오기
mat = loadmat("st_and_rt.mat", simplify_cells=True)

L = int(mat["L"])
Ns = int(mat["Ns"])
tstep = float(mat["tstep"])

rt = np.asarray(mat["rt"]).ravel()
s1t = np.asarray(mat["s1t"]).ravel()
s2t = np.asarray(mat["s2t"]).ravel()
s3t = np.asarray(mat["s3t"]).ravel()
s4t = np.asarray(mat["s4t"]).ravel()

# 복조 비트열 초기화
data_bits_hat = np.empty(2 * Ns, dtype=np.uint8)

for n in range(Ns):

    # n번째 수신 심벌의 샘플 추출
    rt_nth = rt[n*L:(n+1)*L]

    # 각 송신 신호와의 상관 값 계산
    C_rt_nth_s1t = np.sum(rt_nth * s1t) * tstep
    C_rt_nth_s2t = np.sum(rt_nth * s2t) * tstep
    C_rt_nth_s3t = np.sum(rt_nth * s3t) * tstep
    C_rt_nth_s4t = np.sum(rt_nth * s4t) * tstep

    # 상관 값이 가장 큰 송신 신호 검출
    T = np.argmax([
        C_rt_nth_s1t,
        C_rt_nth_s2t,
        C_rt_nth_s3t,
        C_rt_nth_s4t
    ])

    # 검출 결과를 두 비트로 변환
    if T == 0:
        twobits_hat = np.array([0, 0])
    elif T == 1:
        twobits_hat = np.array([0, 1])
    elif T == 2:
        twobits_hat = np.array([1, 0])
    else:
        twobits_hat = np.array([1, 1])

    data_bits_hat[2*n:2*n+2] = twobits_hat

# 검출된 비트열 저장
with open("data_bits_hat.pkl", "wb") as f:
    pickle.dump(data_bits_hat, f)
\`\`\`

문제 2.D3과 동일한 수신 신호를 사용했으므로 두 검출 방법의 판정 결과는 수치적 오차에 의한 동률 상황을 제외하면 일치해야 한다.

복조된 비트열은 \`data_bits_hat.pkl\`에 저장되며, 문제 2.D5에서 BER과 수신 이미지를 확인한다.`,
        },
        {
          "id": "19-2D5",
          "title": "2.D5.",
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

first_bits = data_bits_hat[0::2]
second_bits = data_bits_hat[1::2]

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
(주의. 브라우저를 새로고침했거나 Chapter를 나갔다가 다시 들어오면 저장된 ‘data_bits_hat.pkl’이 사라지므로, 이 경우 문제 2.D4의 py 스크립트를 다시 실행할 것)
           `,
           referenceAnswer: `문제 2.D4에서 상관기 기반 검출로 얻은 복조 비트열을 실제 송신 비트열과 비교하여 BER을 계산한다.

$$
\\mathrm{BER}
=
\\frac{N_{\\mathrm{error}}}{N_b}
$$

주어진 Python 코드에서는 다음과 같이 계산한다.

\`\`\`python
BER = np.mean(data_bits != data_bits_hat)
print("BER =", BER)
\`\`\`

이후 복조 비트열의 연속된 두 비트를 하나의 픽셀 값으로 변환하여 수신 이미지를 복원한다.

\`\`\`python
first_bits = data_bits_hat[0::2]
second_bits = data_bits_hat[1::2]

pixel_values = (2 * first_bits + second_bits) * 64
Bhat = pixel_values.reshape(
    (h, w, 3), order="F"
).astype(np.uint8)
\`\`\`

복원되는 이미지는 빈센트 반 고흐의 **The Starry Night(별이 빛나는 밤)**이다.

이번 실험에서는 네 송신 신호의 에너지가 모두 동일하므로, 상관기 기반 검출과 유클리드 거리 기반 ML 검출은 동일한 송신 심벌을 선택한다.

따라서 문제 2.D3에서 얻은 BER과 이번 문제에서 얻은 BER은 동일해야 하며, 복원 이미지도 동일하게 나타나야 한다.

실제 BER 값은 새로 생성한 잡음과 문제 2.C에서 설정한 송신 신호 좌표에 따라 달라지므로, Python에서 출력한 값을 확인한다.

단, 두 검출 결과를 올바르게 비교하려면 동일한 수신 신호와 동일한 송신 비트열을 사용해야 한다.`,
        },
        {
          "id": "19-2D6",
          "title": "2.D6.",
          "type": "python",
          "prompt": `문제 2.D5의 결과와 문제 2.D3의 결과로부터 내릴 수 있는 결론을 쓰시오.`,
          referenceAnswer: `문제 2.D3의 유클리드 거리 기반 ML 검출 결과와 문제 2.D5의 상관기 기반 검출 결과를 비교하면, 두 방법의 BER은 동일하며 복원된 수신 이미지도 동일하게 나타난다.

그 이유는 이번 실험에서 네 송신 신호의 에너지가 모두 같도록 설정했기 때문이다.

$$
E_{s_1}=E_{s_2}=E_{s_3}=E_{s_4}=5
$$

수신 신호 $r(t)$와 $k$번째 송신 후보 $s_k(t)$ 사이의 차이 에너지는 다음과 같다.

$$
\\begin{aligned}
D_k
&=\\int_0^T|r(t)-s_k(t)|^2\\,dt\\\\
&=E_r+E_{s_k}
-2\\operatorname{Re}
\\left[
\\int_0^T r(t)s_k^*(t)\\,dt
\\right]
\\end{aligned}
$$

여기서 수신 신호의 에너지 $E_r$과 송신 신호의 에너지 $E_{s_k}$는 모든 후보에 대해 동일한 값이다.

따라서 차이 에너지를 최소화하는 것은 상관 값의 실수부를 최대화하는 것과 같다.

$$
\\boxed{
\\underset{k}{\\operatorname{argmin}}\\ D_k
=
\\underset{k}{\\operatorname{argmax}}
\\operatorname{Re}
\\left[
\\int_0^T r(t)s_k^*(t)\\,dt
\\right]
}
$$

결론적으로, **동일한 에너지를 갖는 송신 신호 집합에 대해서는 유클리드 거리 기반 ML 검출과 상관기 기반 검출이 동일한 BER 성능을 갖는다.**

또한 두 방법이 같은 송신 심벌을 검출하므로 복조 비트열과 복원 이미지도 동일하다.`,
        },
        {
          "id": "19-2D7",
          "title": "2.D7.",
          "type": "python",
          "prompt": `상관기 기반 검출 방법이 ML 검출 방법과 같은 동작을 하기 위한 조건을 정리하시오.`,
          
referenceAnswer: `상관기 기반 검출이 유클리드 거리 기반 ML 검출과 동일하게 동작하기 위해서는 **모든 송신 후보 신호의 에너지가 동일해야 한다.**

즉, 다음 조건을 만족해야 한다.

$$
\\boxed{
E_{s_1}=E_{s_2}=\\cdots=E_{s_M}
}
$$

수신 신호와 각 송신 후보 사이의 차이 에너지를 전개하면 다음과 같다.

$$
D_k
=
E_r+E_{s_k}
-2\\operatorname{Re}
\\left[
\\int_0^T r(t)s_k^*(t)\\,dt
\\right]
$$

모든 송신 신호의 에너지가 동일하면 $E_r$과 $E_{s_k}$는 검출 후보에 관계없이 일정하므로, 두 항을 검출 과정에서 생략할 수 있다.

따라서 다음 두 검출 규칙은 동일하다.

$$
\\boxed{
\\begin{aligned}
\\text{최소 거리 검출:}\\quad
&\\hat{k}
=\\underset{k}{\\operatorname{argmin}}\\ D_k\\\\[8pt]
\\text{최대 상관 검출:}\\quad
&\\hat{k}
=\\underset{k}{\\operatorname{argmax}}
\\operatorname{Re}
\\left[
\\int_0^T r(t)s_k^*(t)\\,dt
\\right]
\\end{aligned}
}
$$

반대로 송신 신호의 에너지가 서로 다르면 단순히 상관 값만 최대화하는 검출 방식은 유클리드 거리 기반 ML 검출과 다른 결과를 얻을 수 있다.

이 경우에는 각 송신 후보의 에너지를 고려하여 다음과 같이 검출해야 한다.

$$
\\boxed{
\\hat{k}
=
\\underset{k}{\\operatorname{argmax}}
\\left\\{
\\operatorname{Re}
\\left[
\\int_0^T r(t)s_k^*(t)\\,dt
\\right]
-\\frac{E_{s_k}}{2}
\\right\\}
}
$$

이 검출 규칙은 AWGN 채널에서 송신 신호의 사전확률이 동일할 때 유클리드 거리 기반 ML 검출과 동등하다.`,
        },
      ]
    }
  ]
} as const;
