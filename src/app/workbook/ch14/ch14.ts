import type { WorkbookChapter } from '@/types/workbook';

export const chapter = {
  "id": "14-probability",
  "title": "Chapter 14. Probability and Random Variables",
  "sections": [
    { //문제 1
      "id": "14-1",
      "title": "1. 균등 랜덤 변수 PDF 그리기",
      "problems": [
        {
          "id": "14-1A",
          "title": "1.A.",
          "prompt": `아래 py 스크립트는 전산 모의 실험을 통해 주사위 눈의 분포를 그린다.
\`\`\`python
import math
import matplotlib.pyplot as plt

Nsim=6
count=np.zeros(6)
for n in range(0,Nsim):
  x=math.ceil(np.random.rand()*6)
  if x==1:
    count[0]=count[0]+1
  elif x==2:
    count[1]=count[1]+1
  ...

Px=count/?
plt.stem([1,2,3,4,5,6],Px)
\`\`\`
`,
          "referenceAnswer": "",
          "tags": [
            "preface"
          ]
        },
        {
          "id": "14-1A1",
          "title": "1.A1.",
          "type": "essay",
          "prompt": `함수 ‘math.ceil(np.random.rand*6)’을 사용하면, 주사위를 던졌을 때 나오는 주사위 눈의 실험값을 얻을 수 있다. ‘math.ceil(np.random.rand*6)’이 어떻게 주사위 눈과 같은 확률 변수가 되는지 설명하시오.`,
          "referenceAnswer": `np.random.rand()는 0 이상 1 미만의 구간에서 균등하게 분포하는 난수를 생성한다. 이 값에 6을 곱하면 0 이상 6 미만의 실수가 되고, math.ceil()을 적용하면 그 값은 1, 2, 3, 4, 5, 6 중 하나가 된다.

예를 들어,
- 0 < 6·np.random.rand() ≤ 1 이면 x=1,
- 1 < 6·np.random.rand() ≤ 2 이면 x=2,
- …
- 5 < 6·np.random.rand() < 6 이면 x=6

이 된다. 각 구간의 길이는 모두 1로 같고 np.random.rand()가 균등분포를 따르므로, x가 1부터 6까지의 각 값을 가질 확률은 모두 약 1/6이다. 따라서 x는 이상적인 6면체 주사위의 눈과 같은 이산 균등 확률 변수로 볼 수 있다.

단, np.random.rand()가 정확히 0을 생성하는 경우 math.ceil(0)=0이 될 수 있으나, 연속 균등분포의 관점에서는 그 확률이 0이며 실제 난수 생성에서도 극히 드문 경계 경우이다.`
        },
        {
          "id": "14-1A2",
          "title": "1.A2.",
          "type": "python",
          "prompt": `이 py 스크립트에서는 ‘x=math.ceil(np.random.rand*6)’을 ‘Nsim’번 반복 실행하여 실행할 때마다 값이 바뀌는 랜덤 변수 ‘x’를 생성한다. 한편, 매번 실행하면서, 현재까지 ‘x’가 1인 횟수를 ‘count[0]’에, ‘x’가 2인 횟수를 ‘count[1]’에, …, ‘x’가 6인 횟수를 ‘count[5]’에 저장한다. ‘Px’는 각 사건(주사위의 눈)이 발생한 확률의 실험치를 원소로 갖는 벡터이다. 예를 들어, ‘Px[2]’는 ‘x’가 3인 확률의 실험치이다.
py 스크립트 파일의 미완성된 부분을 마저 채워 완성하고, '코드 실행'을 여러 번 클릭하여 결과 그래프를 확인하시오.`,
          "starterCode": `import math
import matplotlib.pyplot as plt

Nsim=6
count=np.zeros(6)
for n in range(0,Nsim):
  x=math.ceil(np.random.rand()*6)
  if x==1:
    count[0]=count[0]+1
  elif x==2:
    count[1]=count[1]+1
  ...

Px=count/?
plt.stem([1,2,3,4,5,6],Px)`,
          "referenceAnswer": `
\`\`\`python          
import numpy as np
import math
import matplotlib.pyplot as plt

Nsim=6
count=np.zeros(6)
for n in range(0,Nsim):
  x=math.ceil(np.random.rand()*6)
  if x==1:
    count[0]=count[0]+1
  elif x==2:
    count[1]=count[1]+1
  elif x==3:
    count[2]=count[2]+1
  elif x==4:
    count[3]=count[3]+1
  elif x==5:
    count[4]=count[4]+1
  elif x==6:
    count[5]=count[5]+1

Px=count/Nsim
plt.stem([1,2,3,4,5,6],Px)
\`\`\`
          `,
        },
        {
          "id": "14-1A3",
          "title": "1.A3.",
          "type": "essay",
          "prompt": `확인한 결과 그래프는 이론적인 주사위 눈과 같이 균등 분포를 가지는가? 그렇지 않다면 그 이유를 설명하시오.`,
          "referenceAnswer": `Nsim=6인 경우 결과 그래프는 일반적으로 이론적인 주사위의 균등 분포와 정확히 일치하지 않는다.

이론적으로 공정한 주사위의 각 눈이 나올 확률은 모두 1/6이다. 그러나 전산 모의 실험에서는 유한한 횟수만큼 난수를 발생시키므로 각 눈의 발생 횟수가 정확히 같아진다는 보장이 없다. 특히 Nsim=6은 실험 횟수가 매우 작기 때문에 표본의 무작위 변동이 크게 나타난다.

예를 들어 6번의 실험에서 어떤 눈은 한 번도 나오지 않을 수 있고, 어떤 눈은 여러 번 나올 수도 있다. 따라서 Px=count/Nsim으로 얻은 경험적 확률은 각 눈마다 서로 다른 값을 가질 수 있다.

즉, 이론적인 확률은 각 눈에 대해 1/6로 균등하지만, 적은 횟수의 모의 실험으로 얻은 상대도수는 표본오차 때문에 균등하지 않을 수 있다. 실험 횟수 Nsim을 충분히 크게 하면 큰 수의 법칙에 의해 각 Px 값은 점차 1/6에 가까워진다.`
        },
        {
          "id": "14-1B",
          "title": "1.B.",
          "prompt": `문제 1.A의 py 스크립트에서 실행 횟수 ‘Nsim=6’을 ‘Nsim=(1000+XXX)(XXX=학번 끝 3자리)’로 수정하고, 수정한 py 스크립트로 실험을 수행하자.`,
          "referenceAnswer": "",
          "tags": [
            "preface"
          ]
        },
        {
          "id": "14-1B1",
          "title": "1.B1.",
          "type": "python",
          "prompt": `py 스크립트를 수정하여 완성하고, '코드 실행'을 여러 번 클릭하여 결과 그래프를 확인하시오.`,
          "referenceAnswer": `
\`\`\`python
import numpy as np
import math
import matplotlib.pyplot as plt

Nsim = 1000 + XXX # 본인의 학번 끝 3자리로 수정
count = np.zeros(6)
for n in range(Nsim):
  x = math.ceil(np.random.rand() * 6)

  if x == 1:
    count[0] += 1
  elif x == 2:
    count[1] += 1
  elif x == 3:
    count[2] += 1
  elif x == 4:
    count[3] += 1
  elif x == 5:
    count[4] += 1
  elif x == 6:
    count[5] += 1

Px = count / Nsim
plt.stem([1, 2, 3, 4, 5, 6], Px)
\`\`\`

위 코드에서 XXX는 본인의 학번 끝 3자리로 바꾸어 사용한다.`
        },
        {
          "id": "14-1B2",
          "title": "1.B2.",
          "type": "essay",
          "prompt": `문제 1.A2의 PDF 그래프와 문제 1.B1의 PDF 그래프의 차이점이 무엇인지 쓰고, 이러한 차이가 발생한 이유를 설명하시오.`,
          "referenceAnswer": `문제 1.A2에서는 Nsim=6으로 실험 횟수가 매우 적기 때문에 각 주사위 눈의 상대도수 Px가 1/6에서 크게 벗어날 수 있다. 따라서 그래프의 막대 높이가 눈마다 크게 달라지고, 실행할 때마다 그래프의 모양도 크게 변할 수 있다.

반면 문제 1.B1에서는 Nsim=1000+XXX로 실험 횟수가 크게 증가한다. 이 경우 각 눈이 관측되는 횟수가 충분히 많아지므로 Px[0], Px[1], …, Px[5]가 모두 이론적인 확률 1/6 ≈ 0.1667에 가까워진다. 따라서 그래프는 문제 1.A2보다 훨씬 균등한 형태를 보인다.

또한 문제 1.B1을 여러 번 반복하더라도 각 실행 결과 사이의 차이는 문제 1.A2보다 상대적으로 작다. 이는 실험 횟수가 증가할수록 표본의 상대도수가 실제 확률에 수렴하는 큰 수의 법칙 때문이다.

따라서 두 그래프의 주요 차이는 다음과 같다.

- Nsim=6: 표본 수가 작아 확률의 실험치가 크게 흔들리고 실행마다 차이가 크다.
- Nsim=1000+XXX: 표본 수가 충분히 커 각 눈의 실험 확률이 1/6에 가까워지고 실행 간 차이도 작아진다.`
        },
      ]
    },
    { //문제 2
      "id": "14-2",
      "title": "2. 수식을 이용하여, 가우시안 랜덤 변수 PDF 그리기",
      "problems": [
        {
          "id": "14-2A",
          "title": "2.A.",
          "prompt": `아래 py 스크립트는 평균이 0이고 분산이 1인 가우시안 랜덤 변수 $X$의 PDF $f_X(x)$의 그래프를 그린다. 아래 py 스크립트에서 'x'와 'Px'는 각각 PDF의 $x$축의 샘플 벡터와 PDF $f_X(x)$의 샘플 벡터이다. PDF의 $x$축은 -5부터 5까지로 둔다. 즉, 'x=np.arange(-5,5,x_step)'이다. 여기서, 'x_step=0.01' 정도로 설정하자.
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

x_step=0.01
x=np.arange(-5,5,x_step)
mu=0
sigma=np.sqrt(1)
Px=(1/np.sqrt(?))*np.exp(-(x-?)**2/?)
plt.plot(x,Px)
\`\`\`
`
        },
        {
          "id": "14-2A1",
          "title": "2.A1.",
          "type": "essay",
          "prompt": `평균이 'mu', 표준편차가 'sigma'인 가우시안 랜덤 변수의 PDF를 다음과 같은 Python 식으로 표현하려고 한다.

'Px=(1/np.sqrt(___①___))*np.exp(-(x-___②___)**2/___③___)'

세 빈칸에 들어갈 식을 순서대로 작성하시오.
- 제곱근 안의 정규화 항: ①
- 지수부에서 x와 평균의 차이를 나타내는 항: ②
- 지수부 분모에 들어가는 항: ③`,
          "referenceAnswer": `① 2*np.pi*sigma**2
② mu
③ 2*sigma**2`
        },
        {
          "id": "14-2A2",
          "title": "2.A2.",
          "type": "python",
          "prompt": `문제 2.A1에서 답한 수식을 통해 'Px' 생성 라인을 완성하고, 결과 그래프를 확인하시오.`,
          "starterCode": `import numpy as np
import matplotlib.pyplot as plt

x_step=0.01
x=np.arange(-5,5,x_step)
mu=0
sigma=np.sqrt(1)
Px=(1/np.sqrt(?))*np.exp(-(x-?)**2/?)
plt.plot(x,Px)`,
          "referenceAnswer": `\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

x_step=0.01
x=np.arange(-5,5,x_step)
mu=0
sigma=np.sqrt(1)

Px=(1/np.sqrt(2*np.pi*sigma**2))*np.exp(-(x-mu)**2/(2*sigma**2))

plt.plot(x,Px)
\`\`\`

평균 mu=0, 표준편차 sigma=1인 표준 가우시안 PDF를 계산한 것이다.`
        },
        {
          "id": "14-2A3",
          "title": "2.A3.",
          "type": "essay",
          "prompt": `문제 2.A2에서 확인한 그래프의 형태를 설명하시오. 그래프의 중심 위치, 대칭성, 그리고 x=0 부근에서의 특징을 포함하여 작성하시오.`,
          "referenceAnswer": `그래프는 x=0을 중심으로 좌우 대칭인 종(bell) 모양의 가우시안 PDF 형태를 가진다.
평균이 mu=0이므로 PDF의 중심과 최대값은 x=0 부근에 위치한다. 또한 표준편차가 sigma=1이므로 분포의 폭은 표준 가우시안 분포와 동일하다.
x가 0에서 멀어질수록 PDF 값은 점차 감소하며, 양의 방향과 음의 방향에서 동일한 형태를 가진다.
이 그래프는 가우시안 PDF의 이론식을 직접 계산하여 그린 것이므로, 코드가 올바르게 작성되었다면 이론적인 평균 0, 분산 1의 표준 가우시안 PDF와 일치한다.`
        },
        {
          "id": "14-2B",
          "title": "2.B.",
          "type": "essay",
          "prompt": `문제 2.A의 py 스크립트에서 평균 'mu'와 분산 'sigma**2'의 값을 바꾸어 가우시안 PDF를 다시 그리고자 한다. 평균과 분산을 각각 변화시켰을 때 PDF $f_X(x)$의 그래프가 어떻게 변할지 설명하시오.

- 평균이 변할 때 그래프의 중심 위치는 어떻게 변하는가?
- 분산이 커지거나 작아질 때 그래프의 폭과 최대값은 어떻게 변하는가?`,
          "referenceAnswer": `평균 'mu'는 가우시안 PDF의 중심 위치를 결정한다.
평균이 증가하면 그래프 전체가 x축의 양의 방향으로 이동하고, 평균이 감소하면 음의 방향으로 이동한다. 그래프의 최대값은 평균에 해당하는 x=mu 부근에서 나타난다.
분산 'sigma**2'는 그래프의 퍼짐 정도를 결정한다.
분산이 커지면 분포가 더 넓게 퍼지고 중심 부근의 최대값은 낮아진다. 반대로 분산이 작아지면 분포가 평균 부근에 더 집중되어 그래프의 폭이 좁아지고 최대값은 높아진다.
즉, 평균은 그래프의 중심 위치를, 분산은 그래프의 폭과 높이를 결정한다.`
        },
        {
          "id": "14-2C",
          "title": "2.C.",
          "prompt": `문제 2.B의 답과 문제 2.A2의 py 스크립트를 참고하여, 평균과 분산이 아래와 같이 주어지는 경우 벡터 'x'를 $x$축으로 하여 'Px'의 그래프를 그리는 py 스크립트를 작성하시오.`,
          "tags": ["preface"]
        },
        {
          "id": "14-2C1",
          "title": "2.C1.",
          "type": "python",
          "prompt": `평균 = 0, 분산 = 3`,
          "referenceAnswer": `\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

x_step=0.01
x=np.arange(-5,5,x_step)

mu=0
sigma=np.sqrt(3)

Px=(1/np.sqrt(2*np.pi*sigma**2))*np.exp(-(x-mu)**2/(2*sigma**2))

plt.plot(x,Px)
\`\`\``
        },
        {
          "id": "14-2C2",
          "title": "2.C2.",
          "type": "python",
          "prompt": `평균 = 0, 분산 = 0.2`,
          "referenceAnswer": `\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

x_step=0.01
x=np.arange(-5,5,x_step)

mu=0
sigma=np.sqrt(0.2)

Px=(1/np.sqrt(2*np.pi*sigma**2))*np.exp(-(x-mu)**2/(2*sigma**2))

plt.plot(x,Px)
\`\`\``
        },
        {
          "id": "14-2C3",
          "title": "2.C3.",
          "type": "python",
          "prompt": `평균 = 2, 분산 = 1`,
          "referenceAnswer": `\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

x_step=0.01
x=np.arange(-5,5,x_step)

mu=2
sigma=np.sqrt(1)

Px=(1/np.sqrt(2*np.pi*sigma**2))*np.exp(-(x-mu)**2/(2*sigma**2))

plt.plot(x,Px)
\`\`\``
        },
        {
          "id": "14-2C4",
          "title": "2.C4.",
          "type": "python",
          "prompt": `평균 = -3, 분산 = 1`,
          "referenceAnswer": `\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

x_step=0.01
x=np.arange(-5,5,x_step)

mu=-3
sigma=np.sqrt(1)

Px=(1/np.sqrt(2*np.pi*sigma**2))*np.exp(-(x-mu)**2/(2*sigma**2))

plt.plot(x,Px)
\`\`\``
        },
        {
          "id": "14-2D",
          "title": "2.D.",
          "type": "essay",
          "prompt": `문제 2.C1~2.C4에서 확인한 각 그래프가 문제 2.B에서 예상한 결과와 일치하는지 설명하시오. 각 경우에 대해 그래프의 중심 위치, 폭, 최대값의 변화를 비교하여 작성하시오.`,
          "referenceAnswer": `문제 2.C의 결과는 문제 2.B에서 예상한 가우시안 PDF의 특성과 일치한다.

1. 평균=0, 분산=3
평균이 0이므로 그래프의 중심은 x=0에 위치한다. 분산이 1인 경우보다 분산이 크므로 그래프가 더 넓게 퍼지고 최대값은 더 낮아진다.

2. 평균=0, 분산=0.2
평균이 0이므로 중심은 x=0에 위치한다. 분산이 매우 작으므로 그래프가 x=0 부근에 좁게 집중되고 최대값은 더 높아진다.

3. 평균=2, 분산=1
분산은 기준 경우와 동일하므로 그래프의 폭과 형태는 거의 동일하다. 평균이 2이므로 그래프 전체가 오른쪽으로 이동하여 최대값이 x=2 부근에 위치한다.

4. 평균=-3, 분산=1
분산은 기준 경우와 동일하므로 그래프의 폭과 형태는 거의 동일하다. 평균이 -3이므로 그래프 전체가 왼쪽으로 이동하여 최대값이 x=-3 부근에 위치한다.

따라서 평균은 가우시안 PDF의 중심 위치를 이동시키고, 분산은 분포의 폭과 최대값의 크기를 변화시킨다는 것을 확인할 수 있다.`
        },
      ],
    },
    { //문제 3
      "id": "14-3",
      "title": "3. 함수 'np.random.randn()'을 이용하여, 가우시안 랜덤 변수 PDF 그리기",
      "problems": [
        {
          "id": "14-3A",
          "title": "3.A.",
          "prompt": `Python의 numpy 모듈에서 제공하는 확률 변수 생성 함수(‘np.random.rand()’, ‘np.random.randn()’ 등)를 이용해 확률 변수를 반복적으로 생성하는 실험을 통하여 PDF의 실험치를 구할 수 있다. 아래는 구체적인 절차이다.

(Step 1) 먼저, PDF를 그리기 위한 x축을 다수 개의 연결된 구간으로 나눈다. 구간의 경계를 결정하는 벡터 ‘x’를 생성한다. 즉, 첫 번째 구간은 ‘(x[0], x[1])’, 두 번째 구간은 ‘(x[1], x[2])’, ….
(Step 2) 각 구간의 중심을 구한다.
(Step 3-1) PDF를 그리고자 하는 확률 변수를 ‘Nsim’번 반복적으로 생성한다.
(Step 3-2) 매번 생성할 때마다, 생성된 값이 어느 구간에 속하는 값인지 확인하여 각 구간 당 샘플 수 Count를 증가시킨다. 반복 생성이 모두 끝나면 각 구간에 속하는 샘플의 수가 결정된다.
(Step 4) ‘Nsim’번의 확률 변수 생성이 모두 끝나면, PDF 전체 면적이 1이 되도록, ‘Nsim’ 값으로 각 구간 당 샘플 수를 정규화한다. 정규화된 값은 해당 구간의 중심값에서의 PDF 실험치가 된다.
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

Nsim=100
xstep=0.01
xmin=-5
xmax=5
x=np.arange(xmin,xmax,xstep)
Number_of_partitions=(xmax-xmin)/xstep
PartitionCenters=np.arange(xmin+xstep/2,xmax-xstep/2+xstep,xstep)

CountAtEachPartition=np.zeros(int(Number_of_partitions))
for n in np.arange(0,Nsim):

    random_sample=np.random.randn()
    
    for k in np.arange(0,Number_of_partitions-1):
        
        kth_partition_left_end=x[int(k)]
        kth_partition_right_end=x[int(k)+1]
        
        if(kth_partition_left_end<=random_sample)&(random_sample<kth_partition_right_end):
            CountAtEachPartition[int(k)]=CountAtEachPartition[int(k)]+1

Px=CountAtEachPartition/xstep/Nsim
plt.figure()
plt.plot(PartitionCenters,Px,'r')
plt.grid()
\`\`\`
`
        },
        {
          "id": "14-3A1",
          "title": "3.A1.",
          "type": "python",
          "starterCode": `import numpy as np
import matplotlib.pyplot as plt

Nsim=100
xstep=0.01
xmin=-5
xmax=5
x=np.arange(xmin,xmax,xstep)
Number_of_partitions=(xmax-xmin)/xstep
PartitionCenters=np.arange(xmin+xstep/2,xmax-xstep/2+xstep,xstep)

CountAtEachPartition=np.zeros(int(Number_of_partitions))
for n in np.arange(0,Nsim):

    random_sample=np.random.randn()
    
    for k in np.arange(0,Number_of_partitions-1):
        
        kth_partition_left_end=x[int(k)]
        kth_partition_right_end=x[int(k)+1]
        
        if(kth_partition_left_end<=random_sample)&(random_sample<kth_partition_right_end):
            CountAtEachPartition[int(k)]=CountAtEachPartition[int(k)]+1

Px=CountAtEachPartition/xstep/Nsim
plt.figure()
plt.plot(PartitionCenters,Px,'r')
plt.grid()`,
          "prompt": `Python numpy 함수 ‘np.random.randn()’은 명령어가 호출될 때마다 평균이 0이고 분산이 1인 가우시안 변수 샘플을 발생한다. 각 라인이 위에서 설명한 절차 (Step 1)~(Step 4) 중 어디에 속하는지 주석을 다시오.`,
          "referenceAnswer": `\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

Nsim=100

# Step 1: PDF를 구할 x축의 구간 경계를 설정한다.
xstep=0.01
xmin=-5
xmax=5
x=np.arange(xmin,xmax,xstep)
Number_of_partitions=(xmax-xmin)/xstep

# Step 2: 각 구간의 중심값을 계산한다.
PartitionCenters=np.arange(xmin+xstep/2,xmax-xstep/2+xstep,xstep)

# Step 3-2를 위해 각 구간에 포함된 샘플의 개수를 저장할 배열을 만든다.
CountAtEachPartition=np.zeros(int(Number_of_partitions))

# Step 3-1: 가우시안 랜덤 변수를 Nsim번 반복 생성한다.
for n in np.arange(0,Nsim):

    random_sample=np.random.randn()

    # Step 3-2: 생성된 샘플이 어느 구간에 속하는지 확인한다.
    for k in np.arange(0,Number_of_partitions):

        kth_partition_left_end=x[int(k)]
        kth_partition_right_end=x[int(k)+1]

        if (kth_partition_left_end<=random_sample) & (random_sample<kth_partition_right_end):
            CountAtEachPartition[int(k)]=CountAtEachPartition[int(k)]+1

# Step 4: 각 구간의 샘플 수를 Nsim과 구간 폭으로 정규화하여 PDF 실험치를 구한다.
Px=CountAtEachPartition/xstep/Nsim
plt.figure()
plt.plot(PartitionCenters,Px,'r')
plt.grid()
\`\`\`
`
        },
        {
          "id": "14-3A2",
          "title": "3.A2.",
          "prompt": `라인 'if(kth_partition_left_end<=random_sample)&(random_sample<kth_partition_right_end)'에서 확인하고자 하는 조건은 무엇인가?`,
          "referenceAnswer": `생성된 랜덤 샘플 'random_sample'이 현재 확인하고 있는 k번째 구간에 포함되는지를 검사하는 조건이다.
k번째 구간의 왼쪽 경계를 'kth_partition_left_end', 오른쪽 경계를 'kth_partition_right_end'라고 하면,
kth_partition_left_end <= random_sample < kth_partition_right_end를 만족하는지 확인한다.
조건을 만족하면 해당 랜덤 샘플이 k번째 구간에 속한다고 판단하여 'CountAtEachPartition[k]'를 1 증가시킨다.`
        },
        {
          "id": "14-3B",
          "title": "3.B.",
          "type": "python",
          "consoleEnabled": true,
          "starterCode": `import numpy as np
import matplotlib.pyplot as plt

Nsim=100
xstep=0.01
xmin=-5
xmax=5
x=np.arange(xmin,xmax,xstep)
Number_of_partitions=(xmax-xmin)/xstep
PartitionCenters=np.arange(xmin+xstep/2,xmax-xstep/2+xstep,xstep)

CountAtEachPartition=np.zeros(int(Number_of_partitions))
for n in np.arange(0,Nsim):

    random_sample=np.random.randn()
    
    for k in np.arange(0,Number_of_partitions-1):
        
        kth_partition_left_end=x[int(k)]
        kth_partition_right_end=x[int(k)+1]
        
        if(kth_partition_left_end<=random_sample)&(random_sample<kth_partition_right_end):
            CountAtEachPartition[int(k)]=CountAtEachPartition[int(k)]+1

Px=CountAtEachPartition/xstep/Nsim
plt.figure()
plt.plot(PartitionCenters,Px,'r')
plt.grid()`,
          "prompt": `문제 3.A의 py 스크립트를 실행하시오. 이후, 문제 2.A2를 참고하여, Console 창에서 'plt.plot()'을 이용해 이론적인 PDF를 겹쳐 그리고, 실행한 결과와 이론적인 PDF가 같은지 확인하시오.`,
          "referenceAnswer": `먼저 주어진 py 스크립트를 실행하여 Nsim=100개의 가우시안 랜덤 샘플로부터 PDF의 실험치를 구한다.
그 후 Console에서 다음과 같이 평균 0, 분산 1인 이론적인 가우시안 PDF를 계산하여 기존 그래프에 겹쳐 그릴 수 있다.
\`\`\`python
mu=0
sigma=np.sqrt(1)
P_theory=(1/np.sqrt(2*np.pi*sigma**2))*np.exp(
    -(PartitionCenters-mu)**2/(2*sigma**2)
)
plt.plot(PartitionCenters,P_theory)
\`\`\`
Nsim=100인 경우 실험으로 얻은 PDF는 이론적인 가우시안 PDF와 대략적인 중심 위치와 형태는 비슷하지만 정확히 일치하지 않는다.
이는 유한한 개수의 랜덤 샘플만을 이용하여 확률밀도를 추정했기 때문에 각 구간의 샘플 수에 통계적인 변동이 존재하기 때문이다.`
        },
        {
"id": "14-3C",
          "title": "3.C.",
          "type": "python",
          "consoleEnabled": true,
          "starterCode": `import numpy as np
import matplotlib.pyplot as plt

Nsim=100
xstep=0.01
xmin=-5
xmax=5
x=np.arange(xmin,xmax,xstep)
Number_of_partitions=(xmax-xmin)/xstep
PartitionCenters=np.arange(xmin+xstep/2,xmax-xstep/2+xstep,xstep)

CountAtEachPartition=np.zeros(int(Number_of_partitions))
for n in np.arange(0,Nsim):

    random_sample=np.random.randn()
    
    for k in np.arange(0,Number_of_partitions-1):
        
        kth_partition_left_end=x[int(k)]
        kth_partition_right_end=x[int(k)+1]
        
        if(kth_partition_left_end<=random_sample)&(random_sample<kth_partition_right_end):
            CountAtEachPartition[int(k)]=CountAtEachPartition[int(k)]+1

Px=CountAtEachPartition/xstep/Nsim
plt.figure()
plt.plot(PartitionCenters,Px,'r')
plt.grid()`,
          "prompt": `'Nsim=1e4'로 증가시켜 문제 3.B를 반복하시오. 실행한 결과와 이론적인 PDF가 같은지 확인하시오.
(실행하는데 다소 시간이 소요될 수 있음)`,
          "referenceAnswer": `py 스크립트의
\`\`\`python
Nsim=100
\`\`\`
을
\`\`\`python
Nsim=1e4
\`\`\`
로 변경하여 실행한다.
그 후 문제 3.B와 동일하게 Console에서 이론적인 PDF를 계산하여 겹쳐 그린다.
\`\`\`python
mu=0
sigma=np.sqrt(1)
P_theory=(1/np.sqrt(2*np.pi*sigma**2))*np.exp(
    -(PartitionCenters-mu)**2/(2*sigma**2)
)
plt.plot(PartitionCenters,P_theory)
\`\`\`
Nsim=100일 때보다 Nsim=10000일 때 실험 PDF의 불규칙한 변동이 감소하며, 전체적인 형태가 이론적인 가우시안 PDF에 더 가까워지는 것을 확인할 수 있다.`
        },
        {
          "id": "14-3D",
          "title": "3.D.",
          "type": "essay",
          "prompt": `문제 3.B~3.C의 결과를 토대로, 'Nsim'의 값이 작을 때, 실험에 의한 PDF와 이론적인 PDF가 일치하지 않는 이유를 쓰시오.`,
          "referenceAnswer": `Nsim의 값이 작으면 랜덤 변수의 전체 확률분포를 충분히 대표할 만큼 많은 샘플을 얻지 못하기 때문에, 각 구간에 포함되는 샘플의 수가 이론적인 확률에서 크게 변동할 수 있다.
문제 3.B의 Nsim=100에서는 각 구간에 포함되는 샘플 수가 매우 적어 일부 구간에는 샘플이 하나도 없거나 우연히 여러 개가 포함될 수 있다. 따라서 실험을 통해 얻은 PDF가 불규칙하게 나타나며 이론적인 가우시안 PDF와 차이가 발생한다.
반면 문제 3.C에서 Nsim을 10000으로 증가시키면 각 구간에 더 많은 샘플이 포함되고 상대적인 통계적 변동이 감소한다. 그 결과 실험 PDF가 이론적인 가우시안 PDF에 더 가까워진다.
즉, Nsim이 증가할수록 랜덤 샘플의 경험적 분포가 실제 확률분포에 가까워지는 큰 수의 법칙에 의해 실험 PDF와 이론적인 PDF의 차이가 감소한다.`
        },
      ],
    },
    { //문제 4
      "id": "14-4",
      "title": "4. 가우시안 랜덤 변수 생성",
      "problems": [
        {
          "id": "14-4A",
          "title": "4.A.",
          "type" : "essay",
          "prompt": `가우시안 랜덤 변수 $X$의 평균이 $m_X$, 분산이 $\\sigma_X^2$이고, $$Y=aX+b$$로 정의한다고 하자. 이때 $Y$의 평균과 분산은 다음과 같이 표현할 수 있다.
- 평균: $m_Y=$ ①
- 분산: $\\sigma_Y^2=$ ②

①과 ②에 들어갈 식을 작성하고, 상수 $a$와 $b$가 각각 가우시안 PDF의 평균과 분산에 어떤 영향을 주는지 설명하시오.`,
  "referenceAnswer": `① a*m_X+b
② a**2*sigma_X**2

랜덤 변수 Y=aX+b에서 상수 b는 랜덤 변수 전체를 이동시키므로 평균을 변화시킨다.
상수 a는 X의 변동 크기를 확대하거나 축소하므로 분산에 a의 제곱이 곱해진다.
따라서, m_Y = a*m_X + b, sigma_Y**2 = a**2*sigma_X**2가 된다.`
        },
        {
          "id": "14-4B",
          "title": "4.B.",
          "type" : "essay",
          "prompt": `Python numpy 함수 ‘np.random.randn()’는 평균이 0이고 분산이 1인 가우시안 변수의 샘플을 발생한다. 문제 4.A의 답을 토대로, 평균이 -3이고 분산이 0.01인 가우시안 랜덤 변수 의 샘플 ‘z’를 생성하는 코드를 완성하시오.
\`\`\`python
z=?*np.random.randn()+?
\`\`\`          
          `,
  "referenceAnswer": `\`\`\`python
z=0.1*np.random.randn()-3
\`\`\`
np.random.randn()의 평균은 0이고 분산은 1이다.
분산 0.01에 해당하는 표준편차는 sqrt(0.01)=0.1이므로 0.1을 곱한다.
또한 평균을 -3으로 이동시키기 위해 -3을 더한다.
따라서 'z = 0.1*np.random.randn() - 3'으로 생성하면 평균이 -3이고 분산이 0.01인 가우시안 랜덤 변수의 샘플을 얻을 수 있다.
`
        },
        {
          "id": "14-4C",
          "title": "4.C.",
          "prompt": `평균과 분산이 아래와 같이 주어지는 경우에 대하여 문제 3.B를 반복하시오. 'Nsim=1e4'로 설정하고, 문제 3.A의 py 스크립트의 라인 'random_sample=np.random.randn()'을 적절하게 수정할 것.`,
        },
        {
          "id": "14-4C1",
          "title": "4.C1.",
          "type": "python",
          "consoleEnabled": true,
          "starterCode": `import numpy as np
import matplotlib.pyplot as plt

Nsim=100
xstep=0.01
xmin=-5
xmax=5
x=np.arange(xmin,xmax,xstep)
Number_of_partitions=(xmax-xmin)/xstep
PartitionCenters=np.arange(xmin+xstep/2,xmax-xstep/2+xstep,xstep)

CountAtEachPartition=np.zeros(int(Number_of_partitions))
for n in np.arange(0,Nsim):

    random_sample=np.random.randn()
    
    for k in np.arange(0,Number_of_partitions-1):
        
        kth_partition_left_end=x[int(k)]
        kth_partition_right_end=x[int(k)+1]
        
        if(kth_partition_left_end<=random_sample)&(random_sample<kth_partition_right_end):
            CountAtEachPartition[int(k)]=CountAtEachPartition[int(k)]+1

Px=CountAtEachPartition/xstep/Nsim
plt.figure()
plt.plot(PartitionCenters,Px,'r')
plt.grid()`,
          "prompt": `평균 = 0, 분산 = 0.2`,
          "referenceAnswer": `\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

Nsim=int(1e4)
xstep=0.01
xmin=-5
xmax=5
x=np.arange(xmin,xmax,xstep)
Number_of_partitions=(xmax-xmin)/xstep
PartitionCenters=np.arange(xmin+xstep/2,xmax-xstep/2+xstep,xstep)

CountAtEachPartition=np.zeros(int(Number_of_partitions))
for n in np.arange(0,Nsim):

    random_sample=np.sqrt(0.2)*np.random.randn()
    
    for k in np.arange(0,Number_of_partitions-1):
        
        kth_partition_left_end=x[int(k)]
        kth_partition_right_end=x[int(k)+1]
        
        if(kth_partition_left_end<=random_sample)&(random_sample<kth_partition_right_end):
            CountAtEachPartition[int(k)]=CountAtEachPartition[int(k)]+1

Px=CountAtEachPartition/xstep/Nsim
plt.figure()
plt.plot(PartitionCenters,Px,'r')
plt.grid()
\`\`\`
Console에서는 다음과 같이 이론적인 PDF를 계산하여 겹쳐 그릴 수 있다.
\`\`\`python
mu=0
sigma=np.sqrt(0.2)
P_theory=(1/np.sqrt(2*np.pi*sigma**2))*np.exp(
    -(PartitionCenters-mu)**2/(2*sigma**2)
)
plt.plot(PartitionCenters,P_theory)
\`\`\`
평균이 0이므로 그래프의 중심은 x=0 부근에 위치한다.
분산이 0.2로 1보다 작기 때문에 표준 가우시안 PDF보다 평균 부근에 더 집중되어 폭이 좁고 최대값은 더 높다.
Nsim을 충분히 크게 설정하면 실험으로 얻은 PDF가 이론적인 PDF와 대체로 일치하는 것을 확인할 수 있다.`
        },
        {
          "id": "14-4C2",
          "title": "4.C2.",
          "type": "python",
          "consoleEnabled": true,
          "starterCode": `import numpy as np
import matplotlib.pyplot as plt

Nsim=100
xstep=0.01
xmin=-5
xmax=5
x=np.arange(xmin,xmax,xstep)
Number_of_partitions=(xmax-xmin)/xstep
PartitionCenters=np.arange(xmin+xstep/2,xmax-xstep/2+xstep,xstep)

CountAtEachPartition=np.zeros(int(Number_of_partitions))
for n in np.arange(0,Nsim):

    random_sample=np.random.randn()
    
    for k in np.arange(0,Number_of_partitions-1):
        
        kth_partition_left_end=x[int(k)]
        kth_partition_right_end=x[int(k)+1]
        
        if(kth_partition_left_end<=random_sample)&(random_sample<kth_partition_right_end):
            CountAtEachPartition[int(k)]=CountAtEachPartition[int(k)]+1

Px=CountAtEachPartition/xstep/Nsim
plt.figure()
plt.plot(PartitionCenters,Px,'r')
plt.grid()`,
          "prompt": `평균 = -3, 분산 = 1`,
          "referenceAnswer": `\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

Nsim=int(1e4)
xstep=0.01
xmin=-5
xmax=5
x=np.arange(xmin,xmax,xstep)
Number_of_partitions=(xmax-xmin)/xstep
PartitionCenters=np.arange(xmin+xstep/2,xmax-xstep/2+xstep,xstep)

CountAtEachPartition=np.zeros(int(Number_of_partitions))
for n in np.arange(0,Nsim):

    random_sample=np.random.randn()-3
    
    for k in np.arange(0,Number_of_partitions-1):
        
        kth_partition_left_end=x[int(k)]
        kth_partition_right_end=x[int(k)+1]
        
        if(kth_partition_left_end<=random_sample)&(random_sample<kth_partition_right_end):
            CountAtEachPartition[int(k)]=CountAtEachPartition[int(k)]+1

Px=CountAtEachPartition/xstep/Nsim
plt.figure()
plt.plot(PartitionCenters,Px,'r')
plt.grid()
\`\`\`
Console에서는 다음과 같이 이론적인 PDF를 계산하여 겹쳐 그릴 수 있다.
\`\`\`python
mu=-3
sigma=np.sqrt(1)
P_theory=(1/np.sqrt(2*np.pi*sigma**2))*np.exp(
    -(PartitionCenters-mu)**2/(2*sigma**2)
)
plt.plot(PartitionCenters,P_theory)
\`\`\`
분산은 1이므로 표준 가우시안 PDF와 폭과 높이는 동일하다.
평균이 -3이므로 그래프의 중심과 최대값이 x=-3 부근으로 이동한다.
Nsim을 충분히 크게 설정하면 실험 PDF가 이론적인 PDF와 대체로 일치한다.`
        },
      ],
    },
    { //문제 5
      "id": "14-5",
      "title": "5. 함수 'np.random.randn()'의 '평균', '분산' 실험",
      "problems": [
        {
          "id": "14-5A",
          "title": "5.A.",
          "type": "console",
          "prompt": `Python에서 ‘X=np.random.randn(N)’을 실행하면, 평균이 0이고 분산이 1인 가우시안 랜덤 변수를 ‘N’번 독립적으로 발생시키고 각각을 원소로 갖는 벡터 ‘X’를 생성할 수 있다.
랜덤 변수 X의 평균의 실험치는 (식 14.1)과 같이 나타낼 수 있다. 여기서,  $X[k]$는 $X$의 $k$번째 성분으로 정의된다.
$$
m=\\frac{\\sum_{k=0}^{N-1} X[k]}{N}
\\qquad \\text{(식 14.1)}
$$
아래에서, 랜덤 변수 벡터 'x'를 구성하고 있는 원소들의 평균 'm'을 계산하는 코드를 완성하고, 완성된 코드를 Console 창에서 한 줄씩 실행하여 결과를 확인하시오.
\`\`\`python
>>> import numpy as np
>>> N=1XXX #XXX=자신의 학번 끝 3자리
>>> X=np.random.randn(N)
>>> m=sum(?)/?; print(m)
\`\`\`
실험을 통해 계산한 $m$이 함수' np.random.randn()'의 이론적인 평균과 거의 일치하는가? 만약, 일치하지 않았다면, 'N'의 값을 현재 값에서 10배 증가시키고, 코드를 다시 수행하여 $m$을 다시 계산하시오.
`,
        "referenceAnswer": `완성 코드는 다음과 같다.
\`\`\`python
import numpy as np
N=1XXX   # XXX는 자신의 학번 끝 3자리로 바꾼다.
X=np.random.randn(N)
m=sum(X)/N; print(m)
\`\`\`
'np.random.randn(N)'은 평균이 0이고 분산이 1인 가우시안 랜덤 변수의 샘플을 N개 생성한다.
따라서 샘플 평균은 m = (X[0]+X[1]+...+X[N-1])/N 으로 계산할 수 있으며, Python에서는 'sum(X)/N'으로 구현할 수 있다.
N이 충분히 크면 실험적으로 계산한 m은 이론적인 평균 0에 가까운 값을 갖는다. 다만, 랜덤 샘플을 유한한 개수만 사용하므로 정확히 0이 되지 않을 수 있다. N을 10배 증가시키면 일반적으로 표본 평균의 변동이 감소하여 0에 더 가까워진다.`
        },
        {
          "id": "14-5B",
          "title": "5.B.",
          "type": "console",
          "prompt": `  
랜덤 변수 X의 분산의 실험치는 (식 14.2)과 같이 나타낼 수 있다.
$$
v=
\\left(
\\frac{\\sum_{k=0}^{N-1} X^2[k]}{N}
\\right)
-m^2
\\qquad \\text{(식 14.2)}
$$
아래에서, 랜덤 변수 벡터 'x'를 구성하고 있는 원소들의 분산 'v'를 계산하는 코드를 완성하고, 완성된 코드를 Console 창에서 한 줄씩 실행하여 결과를 확인하시오.
\`\`\`python
>>> import numpy as np
>>> N=1XXX #XXX=자신의 학번 끝 3자리
>>> X=np.random.randn(N)
>>> m=sum(?)/?; print(m)
>>> v=?/N-m**2; print(v)
\`\`\`
실험을 통해 계산한 $v$가 함수' np.random.randn()'의 이론적인 분산과 거의 일치하는가? 만약, 일치하지 않았다면, 'N'의 값을 현재 값에서 10배 증가시키고, 코드를 다시 수행하여 $v$를 다시 계산하시오.
`,
        "referenceAnswer": `완성 코드는 다음과 같다.
\`\`\`python
import numpy as np
N=1XXX   # XXX는 자신의 학번 끝 3자리로 바꾼다.
X=np.random.randn(N)
m=sum(X)/N; print(m)
v=sum(X**2)/N-m**2; print(v)
\`\`\`
분산의 실험치는 v = (1/N) * sum(X[k]^2) - m^2으로 계산한다.
Python에서는 벡터 X의 각 원소를 제곱한 'X**2'를 이용하여 sum(X**2)/N-m**2로 구현할 수 있다.
'np.random.randn()'의 이론적인 분산은 1이므로, N이 충분히 크면 실험적으로 계산한 v는 1에 가까워진다. 유한한 샘플을 사용하므로 정확히 1이 되지 않을 수 있으며, N을 증가시키면 일반적으로 실험 분산이 이론적인 값 1에 더 가까워진다.`
        },
        {
          "id": "14-5C",
          "title": "5.C.",
          "type": "console",
          "prompt": `문제 5.A~5.B에서의 실험 방식으로, 문제 4.B에서 발생한 'z'의 평균과 분산을 구하시오.
이를 위해, 문제 4.B의 'z' 생성문을 'z=?*np.random.randn(N)+?'로 수정하여 'N'개의 독립적인 랜덤 변수를 생성하고, (식 14.1)과 (식 14.2)를 Python에서 구현하여 'z'의 평균과 분산을 계산하시오.

이론적인 'z'의 평균(=-3)과 분산(=0.01)의 값과 일치하는지 확인하시오. (약간의 실험 오차는 무시할 것)
`,
        "referenceAnswer": `문제 4.B에서 평균이 -3이고 분산이 0.01인 가우시안 랜덤 변수는 다음과 같이 생성할 수 있다.
\`\`\`python
import numpy as np
N=1XXX   # XXX는 자신의 학번 끝 3자리로 바꾼다.
z=0.1*np.random.randn(N)-3
m=sum(z)/N
v=sum(z**2)/N-m**2
print(m)
print(v)
\`\`\`
'np.random.randn(N)'의 평균은 0이고 분산은 1이다.
여기에 0.1을 곱하면 분산은 0.1^2 × 1 = 0.01이 되고, -3을 더하면 평균이 -3으로 이동한다.
따라서 z=0.1*np.random.randn(N)-3은 평균이 -3이고 분산이 0.01인 가우시안 랜덤 변수의 샘플을 N개 생성한다.
실험적으로 계산한 평균 m은 -3에 가까운 값을 가지며, 분산 v는 0.01에 가까운 값을 가진다. 유한한 개수의 샘플을 사용하므로 정확히 -3과 0.01이 되지 않을 수 있지만, N이 충분히 크면 이론적인 값에 가까워진다.`
        },
      ],
    },
    { //문제 6
      "id": "14-6",
      "title": "6. 수치적분을 이용한 '평균', '분산' 계산",
      "problems": [
        {
          "id": "14-6A",
          "title": "6.A.",
          "type": "python",
          "prompt": `문제 2.A2에서, 평균이 0이고 분산이 1인 가우시안 랜덤 변수 $X$의 PDF $f_X(x)$의 샘플 벡터 'Px'를 생성하였다. 이 문제에서는 수치적분을 이용하여 평균과 분산을 계산해보자.
          
평균의 정의인 (식 14.3)에 따라 수치적분으로 'x'의 평균을 구할 수 있다.
$$
m_X \\triangleq \\mathrm{E}[X]
=
\\int x f_X(x)\\,dx
\\qquad \\text{(식 14.3)}
$$
문제 2.A2의 py 스크립트를 그대로 복사해서 붙여넣은 후, 아래 코드를 추가하고 실행하시오.
\`\`\`python
#문제 2.A2의 py 스크립트에 아래를 추가.
m_x=sum(x*Px)*x_step; print(m_x)
\`\`\`
수치적분으로 구한 평균의 값을 확인하고, 이론적인 값과 거의 일치하는지 확인하시오.
`,
        "referenceAnswer": `연속 랜덤 변수의 평균은 m_X = ∫ x f_X(x) dx로 정의된다. 벡터 'x'와 'Px'는 각각 x축의 샘플값과 해당 위치에서의 PDF 샘플값이므로, sum(x*Px)*x_step은 적분을 일정한 간격 'x_step'으로 근사한 것이다. 평균이 0이고 분산이 1인 가우시안 랜덤 변수의 이론적인 평균은 0이다. 따라서 계산된 'm_x'는 0에 매우 가까운 값을 가진다. 단, 유한한 x축 범위와 유한한 간격으로 수치적분을 수행하므로 정확히 0이 아닌 작은 오차가 발생할 수 있다.`
        },
        {
          "id": "14-6B",
          "title": "6.B.",
          "type": "python",
          "prompt": `분산의 정의인 (식 14.4)에 따라 수치적분으로 'x'의 분산을 구할 수 있다.
$$
\\sigma_X^2
\\triangleq
\\mathrm{E}\\left[(X-m_X)^2\\right]
=
\\int (x-m_X)^2 f_X(x)\\,dx
\\qquad \\text{(식 14.4)}
$$
문제 6.A의 py 스크립트를 그대로 복사해서 붙여넣은 후, 아래 코드를 완성해서 추가하고 실행하시오.
\`\`\`python
#문제 6.A의 py 스크립트에 아래를 추가.
v=sum(?*Px)*x_step; print(v)
\`\`\`
수치적분으로 구한 분산의 값을 확인하고, 이론적인 값과 거의 일치하는지 확인하시오.
`,
        "referenceAnswer": `완성 코드는 다음과 같다.
\`\`\`python
v=sum((x-m_x)**2*Px)*x_step; print(v)
\`\`\`
분산의 정의는 σ_X² = ∫ (x-m_X)² f_X(x) dx이다. 따라서 각 x에서 '(x-m_x)**2'와 PDF 값 'Px'를 곱하고, 이를 모두 더한 뒤 샘플 간격 'x_step'을 곱하면 분산의 수치적분 값을 구할 수 있다. 평균이 0이고 분산이 1인 가우시안 랜덤 변수의 이론적인 분산은 1이므로 계산된 'v'는 1에 가까운 값을 가진다. 수치적분이므로 정확히 1이 아닌 작은 오차가 발생할 수 있다.`
        },
        {
          "id": "14-6C",
          "title": "6.C.",
          "prompt": `분산의 정의인 (식 14.4)
$$
\\sigma_X^2
=
\\int
(x-m_X)^2 f_X(x)\\,dx
$$
에서 $(x-m_X)^2$을 전개하면 아래과 같다.
$$
\\sigma_X^2
=
\\int
\\left(
x^2-2m_Xx+m_X^2
\\right)
f_X(x)\\,dx
$$
이를 풀어쓰면, 아래와 같이 분산이 (식 14.5)와 같음을 알 수 있다.
$$
\\sigma_X^2
=
\\int
x^2 f_X(x)\\,dx
-
2m_X
\\underbrace{
\\int
x f_X(x)\\,dx
}_{①}
+
m_X^2
\\underbrace{
\\int
f_X(x)\\,dx
}_{②}
$$
$$
=
\\mathrm{E}[X^2]-m_X^2
\\qquad \\text{(식 14.5)}
$$`
        },
        {
          "id": "14-6C1",
          "title": "6.C1.",
          "type": "essay",
          "prompt": `위 식에서 ①과 ②에 해당하는 적분값을 각각 쓰고, 그 이유를 설명하시오. 이를 이용하여 최종적으로 $\\sigma_X^2=\\mathrm{E}[X^2]-m_X^2$가 성립하는 이유를 설명하시오.`,
          "referenceAnswer": `① = m_X, ② = 1
①은 랜덤 변수 X의 평균의 정의에 의해 E[X] = ∫ x f_X(x) dx = m_X이다.
②는 확률밀도함수 f_X(x)의 전체 면적이 1이므로 ∫ f_X(x) dx = 1이다.

따라서,
σ_X²
= E[X²] - 2m_X·m_X + m_X²·1
= E[X²] - 2m_X² + m_X²
= E[X²] - m_X²
가 된다.`
        },
        {
          "id": "14-6C2",
          "title": "6.C2.",
          "type": "python",
          "prompt": `(식 14.5)에 따라 수치적분으로 'x'의 분산을 구할 수 있다.
문제 6.B의 py 스크립트를 그대로 복사해서 붙여넣은 후, 아래 코드를 완성해서 추가하고 실행하시오.
\`\`\`python
#문제 6.B의 py 스크립트에 아래를 추가.
v=sum(?)*x_step-m_x**2; print(v)
\`\`\`
수치적분으로 구한 분산의 값을 확인하고, 이론적인 값과 거의 일치하는지 확인하시오.`,
          "referenceAnswer": `완성 코드는 다음과 같다.
\`\`\`python
v=sum(x**2*Px)*x_step-m_x**2; print(v)
\`\`\`
(식 14.5) σ_X² = E[X²] - m_X²에서 E[X²]는 ∫ x² f_X(x) dx이므로 수치적분에서는 sum(x**2*Px)*x_step으로 근사할 수 있다.
따라서, v=sum(x**2*Px)*x_step-m_x**2로 분산을 계산할 수 있다. 문제 6.B에서 분산의 정의를 직접 이용해 계산한 값과 거의 같은 결과가 나오며, 이론적인 분산 1에도 가까운 값을 가진다.`
        },
        {
          "id": "14-6D",
          "title": "6.D.",
          "prompt": `평균과 분산이 아래와 같이 주어지는 경우에 대하여 문제 6.C2의 py 스크립트를 적절히 수정하고, py 스크립트를 실행하여 결과를 확인하시오.`,
        },
        {
          "id": "14-6D1",
          "title": "6.D1.",
          "type": "python",
          "prompt": `평균 = 0, 분산 = 0.3`,
          "referenceAnswer": `\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

x_step=0.01
x=np.arange(-5,5,x_step)
mu=0
sigma=np.sqrt(0.3)
Px=(1/np.sqrt(2*np.pi*sigma**2))*np.exp(-(x-mu)**2/(2*sigma**2))
plt.plot(x,Px)

m_x=sum(x*Px)*x_step; print(m_x)
v=sum(x**2*Px)*x_step-m_x**2; print(v)
\`\`\`
수치적분으로 계산한 평균은 0에 매우 가깝고, 분산은 0.3에 매우 가까운 값을 갖는다.`
        },
        {
          "id": "14-6D2",
          "title": "6.D2.",
          "type": "python",
          "prompt": `평균 = 0, 분산 = 0.001`,
          "referenceAnswer": `\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

x_step=0.01
x=np.arange(-5,5,x_step)
mu=0
sigma=np.sqrt(0.001)
Px=(1/np.sqrt(2*np.pi*sigma**2))*np.exp(-(x-mu)**2/(2*sigma**2))
plt.plot(x,Px)

m_x=sum(x*Px)*x_step; print(m_x)
v=sum(x**2*Px)*x_step-m_x**2; print(v)
\`\`\`
평균은 0에 가까운 값을 갖고 분산도 0.001 부근의 값을 갖는다. 다만 분산이 매우 작으면 PDF가 평균 근처에 매우 좁게 집중된다. 따라서 동일한 x_step=0.01을 사용할 경우 넓게 퍼진 PDF보다 수치적분 오차가 상대적으로 커질 수 있다.`
        },
        {
          "id": "14-6D3",
          "title": "6.D3.",
          "type": "python",
          "prompt": `평균 = 2, 분산 = 1`,
          "referenceAnswer": `\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

x_step=0.01
x=np.arange(-5,5,x_step)
mu=2
sigma=np.sqrt(1)
Px=(1/np.sqrt(2*np.pi*sigma**2))*np.exp(-(x-mu)**2/(2*sigma**2))
plt.plot(x,Px)

m_x=sum(x*Px)*x_step; print(m_x)
v=sum(x**2*Px)*x_step-m_x**2; print(v)
\`\`\`
수치적분으로 계산한 평균은 2에 가깝고 분산은 1에 가까운 값을 갖는다. 그러나 PDF의 중심이 x=2로 이동하면서 현재 적분 범위 [-5,5]가 평균을 기준으로 좌우 대칭이 아니게 된다. 특히 x>5 영역에 존재하는 가우시안 PDF의 일부가 적분 범위에서 제외되므로 작은 오차가 발생할 수 있다.`
        },
        {
          "id": "14-6E",
          "title": "6.E.",
          "type": "essay",
          "prompt": `문제 6.D1~6.D3의 결과를 토대로, 평균과 분산 값에 따라 계산한 값의 오차들이 서로 차이가 있음을 알 수 있다. 이러한 차이가 발생하는 이유를 쓰시오.`,
          "referenceAnswer": `문제 6.D의 각 경우에서 수치적분 오차가 서로 다른 이유는 PDF의 형태와 현재 사용한 수치적분 조건이 서로 다르기 때문이다.
첫째, 이론적인 평균과 분산은 -∞부터 ∞까지의 적분으로 정의되지만 py 스크립트에서는 x의 범위를 -5부터 5까지만 사용한다. 따라서 이 범위 밖에 존재하는 PDF의 일부는 계산에서 제외되며, 이로 인해 적분 구간에 의한 오차가 발생할 수 있다.
특히 평균이 2이고 분산이 1인 경우 PDF의 중심이 오른쪽으로 이동하므로 [-5,5] 구간 밖으로 나가는 확률밀도의 양이 평균이 0인 경우보다 커질 수 있다.
둘째, 연속적인 적분을 계산하는 대신 일정한 간격 'x_step'으로 PDF를 샘플링하여 합으로 근사한다. 따라서 'x_step'의 크기에 따른 수치적분 오차가 발생한다.
특히 분산이 0.001처럼 매우 작은 경우 PDF가 평균 부근에 매우 좁고 높게 집중되므로 동일한 'x_step=0.01'에서는 PDF의 형태를 충분히 세밀하게 샘플링하지 못하여 상대적으로 더 큰 오차가 발생할 수 있다.
따라서 수치적분의 정확도를 높이기 위해서는 PDF가 충분히 포함되도록 x축의 범위를 넓히고, 필요한 경우 'x_step'을 더 작게 설정해야 한다.`
        },
      ],
    },
    { //문제 7
      "id": "14-7",
      "title": "7. 레일 레이(Rayleigh) 분포의 PDF 그리기",
      "problems": [
        {
          "id": "14-7A",
          "title": "7.A.",
          "prompt": `레일 레이 페이딩(Rayleigh fading) 채널 모형은 무선 통신 분야에서 일반적으로 흔히 접할 수 있는 페이딩 채널 모형 중 하나이다. 레일레이 페이딩 채널에서는 수신 신호를 아래와 같이 나타낼 수 있다.
$$
r=\\alpha s+n
\\qquad \\text{(식 14.6)}
$$
여기서 $s$는 송신 신호, $n$은 가우시안 노이즈이며, 페이딩 계수 $\\alpha$는 Rayleigh 랜덤 변수이다.
그리고, 페이딩 계수(coefficient) $\\alpha$의 PDF는 다음과 같다.
$$
f_\\alpha(x)=
\\begin{cases}
\\dfrac{x}{\\sigma^2}
\\exp\\left(-\\dfrac{x^2}{2\\sigma^2}\\right), & x\\ge 0 \\\\
0, & x<0
\\end{cases}
\\qquad \\text{(식 14.7)}
$$
또한, $\\alpha$의 제곱의 평균은 $\\mathrm{E}[\\alpha^2]=2\\sigma^2$이다.`
        },
        {
          "id": "14-7A1",
          "title": "7.A1.",
          "type": "essay",
          "prompt": `Rayleigh PDF의 전체 면적은 다음과 같다.
$$
\\int_0^{\\infty}
\\frac{x}{\\sigma^2}
\\exp\\left(-\\frac{x^2}{2\\sigma^2}\\right)dx
$$
$u=\\frac{x^2}{2\\sigma^2}$로 치환하면,
$$
du = ①\\,dx
$$
이고, 적분은
$$
\\int_0^{\\infty} ②\\,du
$$
의 형태가 된다.
①, ②에 들어갈 식을 쓰고, 최종 적분값을 작성하시오.`,
          "referenceAnswer": `① x/σ², ② exp(-u)
최종 적분값 = 1`
        },
        {
  "id": "14-7A2",
  "title": "7.A2.",
  "type": "essay",
  "prompt": `Rayleigh 랜덤 변수 $\\alpha$의 제곱평균은 다음과 같다.
$$
\\mathrm{E}[\\alpha^2]
=
\\int_0^{\\infty}
\\frac{x^3}{\\sigma^2}
\\exp\\left(-\\frac{x^2}{2\\sigma^2}\\right)dx
$$
$u=\\frac{x^2}{2\\sigma^2}$로 치환하면,
$$
x^2 = ①
$$
이고,
$$
\\mathrm{E}[\\alpha^2]
=
②
\\int_0^{\\infty}
u e^{-u}du
$$
가 된다.
①, ②에 들어갈 식을 쓰고 최종 $\\mathrm{E}[\\alpha^2]$ 값을 작성하시오.`,
  "referenceAnswer": `① 2σ²u, ② 2σ²
최종적으로 E[α²] = 2σ²`
        },
        {
          "id": "14-7B",
          "title": "7.B.",
          "prompt": `(식 14.8)과 같이 두 개의 독립적인 가우시안 랜덤 변수를 사용하여, 레일 레이 랜덤 변수 $\\alpha$를 만들 수 있다. 여기서, $z$와 $y$는 평균이 0이고 분산이 $\\sigma^2$인 독립 가우시안 랜덤 변수이다.
$$
\\alpha = \\sqrt{z^2+y^2}
\\qquad \\text{(식 14.8)}
$$
          `
        },
        {
          "id": "14-7B1",
          "title": "7.B1.",
          "type": "console",
          "prompt": `$\\sigma^2=1$일 때, (식 14.8)에 따라 $\\alpha$의 샘플을 생성해보자. 함수 'np.random.randn()'을 이용하여, $\\alpha$의 샘플 'alpha_sample'을 생성하는 코드를 완성하시오.
(코드 작성 전, 'import numpy as np'를 실행하는 것을 잊지 말 것)
\`\`\`python
alpha_sample = ?
\`\`\`          
          `,
          "referenceAnswer": `\`\`\`python
alpha_sample = np.sqrt(np.random.randn()**2 + np.random.randn()**2)
\`\`\`
np.random.randn()은 평균 0, 분산 1인 가우시안 랜덤 변수의 샘플을 생성한다. σ²=1이므로 z와 y를 각각 np.random.randn()으로 생성할 수 있다.
따라서, np.sqrt(np.random.randn()**2 + np.random.randn()**2)로 Rayleigh 랜덤 변수 α의 샘플을 생성할 수 있다.
          `
        },
        {
          "id": "14-7B2",
          "title": "7.B2.",
          "type": "console",
          "prompt": `$\\sigma^2=0.5$일 때, 문제 7.B1을 반복하시오.
(코드 작성 전, 'import numpy as np'를 실행하는 것을 잊지 말 것)
\`\`\`python
alpha_sample = ?
\`\`\`          
          `,
          "referenceAnswer": `\`\`\`python
alpha_sample = alpha_sample = np.sqrt((np.sqrt(0.5)*np.random.randn())**2+(np.sqrt(0.5)*np.random.randn())**2)
\`\`\`
np.random.randn()의 분산은 1이다. 분산을 0.5로 만들기 위해서는 표준편차인 sqrt(0.5)를 곱해야 한다.
          `
        },
        {
          "id": "14-7C",
          "title": "7.C.",
          "type": "python",
          "prompt": `문제 3에서 했던 방법으로, $\\sigma^2=1$인 레일 레이 랜덤 변수 $\\alpha$의 실험에 의한 PDF를 그리자. ‘Nsim=1000’, ‘xstep=0.1’, ‘xmin=0’, ‘xmax=5’으로 설정할 것.

문제 3.A에서 완성한 py 스크립트 파일에, 문제 7.B1의 답을 활용하여 py 스크립트 파일을 적절히 수정하고, (식 14.7)을 참고하여 이론적인 PDF는 파란색으로 겹쳐 그리도록 작성하자.

요구사항에 맞게 py 스크립트를 수정한 후 실행하여 결과 그림을 확인하시오.
(실험에 의한 PDF 곡선이 부드럽게 그려지지 않았을 때는 ‘Nsim’의 값을 더 크게 설정할 것)`,
          "referenceAnswer": `\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

Nsim=1000
xstep=0.1
xmin=0
xmax=5
x=np.arange(xmin,xmax,xstep)
Number_of_partitions=(xmax-xmin)/xstep
PartitionCenters=np.arange(xmin+xstep/2,xmax-xstep/2+xstep,xstep)

sigma=np.sqrt(1)

CountAtEachPartition=np.zeros(int(Number_of_partitions))
for n in np.arange(0,Nsim):

    z=sigma*np.random.randn()
    y=sigma*np.random.randn()
    alpha_sample=np.sqrt(z**2+y**2)

    for k in np.arange(0,Number_of_partitions-1):

        kth_partition_left_end=x[int(k)]
        kth_partition_right_end=x[int(k)+1]

        if(kth_partition_left_end<=alpha_sample)&(alpha_sample<kth_partition_right_end):
            CountAtEachPartition[int(k)]=CountAtEachPartition[int(k)]+1

Px=CountAtEachPartition/xstep/Nsim
plt.figure()
plt.plot(PartitionCenters,Px,'r')
plt.grid()

# 이론적인 Rayleigh PDF
P_theory=(PartitionCenters/sigma**2)*np.exp(-(PartitionCenters**2)/(2*sigma**2))
plt.plot(PartitionCenters,P_theory,'b')
\`\`\`
sigma²=1일 때 실험에 의해 얻은 Rayleigh PDF와 이론적인 PDF는 전체적으로 거의 같은 형태를 보인다. 다만 Nsim=1000은 유한한 샘플 수이므로 실험 PDF에는 작은 불규칙한 변동이 나타날 수 있다.`
        },
        {
          "id": "14-7D",
          "title": "7.D.",
          "type": "python",
          "prompt": `$\\sigma^2=0.5$일 때, 문제 7.C를 반복하시오.`,
          "referenceAnswer": `\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

Nsim=1000
xstep=0.1
xmin=0
xmax=5
x=np.arange(xmin,xmax,xstep)
Number_of_partitions=(xmax-xmin)/xstep
PartitionCenters=np.arange(xmin+xstep/2,xmax-xstep/2+xstep,xstep)

sigma=np.sqrt(0.5)

CountAtEachPartition=np.zeros(int(Number_of_partitions))
for n in np.arange(0,Nsim):

    z=sigma*np.random.randn()
    y=sigma*np.random.randn()
    alpha_sample=np.sqrt(z**2+y**2)

    for k in np.arange(0,Number_of_partitions-1):

        kth_partition_left_end=x[int(k)]
        kth_partition_right_end=x[int(k)+1]

        if(kth_partition_left_end<=alpha_sample)&(alpha_sample<kth_partition_right_end):
            CountAtEachPartition[int(k)]=CountAtEachPartition[int(k)]+1

Px=CountAtEachPartition/xstep/Nsim
plt.figure()
plt.plot(PartitionCenters,Px,'r')
plt.grid()

# 이론적인 Rayleigh PDF
P_theory=(PartitionCenters/sigma**2)*np.exp(-(PartitionCenters**2)/(2*sigma**2))
plt.plot(PartitionCenters,P_theory,'b')
\`\`\`
sigma²=0.5에서는 sigma²=1일 때보다 Rayleigh 분포가 작은 x 값 쪽에 더 집중된다. 따라서 PDF의 최대값이 나타나는 위치가 왼쪽으로 이동하고, 분포의 폭도 더 좁아진다. 실험 PDF와 이론 PDF는 전체적으로 거의 일치한다.`          
        },
        {
          "id": "14-7E",
          "title": "7.E.",
          "type": "python",
          "prompt": `$\\sigma^2=3$일 때, 문제 7.C를 반복하시오.`,
          "referenceAnswer": `\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

Nsim=1000
xstep=0.1
xmin=0
xmax=5
x=np.arange(xmin,xmax,xstep)
Number_of_partitions=(xmax-xmin)/xstep
PartitionCenters=np.arange(xmin+xstep/2,xmax-xstep/2+xstep,xstep)

sigma=np.sqrt(3)

CountAtEachPartition=np.zeros(int(Number_of_partitions))
for n in np.arange(0,Nsim):

    z=sigma*np.random.randn()
    y=sigma*np.random.randn()
    alpha_sample=np.sqrt(z**2+y**2)

    for k in np.arange(0,Number_of_partitions-1):

        kth_partition_left_end=x[int(k)]
        kth_partition_right_end=x[int(k)+1]

        if(kth_partition_left_end<=alpha_sample)&(alpha_sample<kth_partition_right_end):
            CountAtEachPartition[int(k)]=CountAtEachPartition[int(k)]+1

Px=CountAtEachPartition/xstep/Nsim
plt.figure()
plt.plot(PartitionCenters,Px,'r')
plt.grid()

# 이론적인 Rayleigh PDF
P_theory=(PartitionCenters/sigma**2)*np.exp(-(PartitionCenters**2)/(2*sigma**2))
plt.plot(PartitionCenters,P_theory,'b')
\`\`\`
sigma²=3에서는 sigma²=1일 때보다 Rayleigh 분포가 더 넓게 퍼진다. PDF의 최대값이 나타나는 위치가 더 큰 x 값 쪽으로 이동하고, 최대 높이는 낮아진다. 실험 PDF와 이론 PDF는 전체적으로 거의 일치하지만, Nsim이 유한하므로 작은 실험 오차가 발생할 수 있다.`
        },
      ],
    },
  ]
} as const;
