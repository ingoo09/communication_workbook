import type { WorkbookChapter } from '@/types/workbook';

export const chapter = {
  "id": "14-probability",
  "title": "Chapter 14. Probability and Random Variables",
  "sections": [
    {
      "id": "14-1",
      "title": "1. 균등 랜덤 변수 PDF 그리기",
      "problems": [
        {
          "id": "14-1A",
          "title": "1.A.",
          "prompt": `아래는 전산 모의 실험을 통해 주사위 눈의 분포를 그리는 py 스크립트이다.
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

          "prompt": `이 py 스크립트에서는 ‘x=math.ceil(np.random.rand*6)’을 ‘Nsim’번 반복 실행하여 실행할 때마다 값이 바뀌는 랜덤 변수 ‘x’를 생성한다. 한편, 매번 실행하면서, 현재까지 ‘x’가 1인 횟수를 ‘count[0]’에, ‘x’가 2인 횟수를 ‘count[1]’에, …, ‘x’가 6인 횟수를 ‘count[5]’에 저장한다. ‘Px’는 각 사건(주사위의 눈)이 발생한 확률의 실험치를 원소로 갖는 벡터이다. 예를 들어, ‘Px[2]’는 ‘x’가 3인 확률의 실험치이다. py 스크립트 파일의 미완성된 부분을 마저 채워 완성하시오.`,
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
          "prompt": `완성한 py 스크립트를 실행하고, 결과 그래프를 확인하시오. 결과 그래프는 이론적인 주사위 눈과 같이 균등 분포를 가지는가? 그렇지 않다면 그 이유를 설명하시오.`,
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
          "prompt": `py 스크립트를 수정 작성하시오.`,
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
          "prompt": `실험을 최소 2번 수행하여 출력된 확률 밀도 함수(PDF)의 그래프를 확인하시오. 문제 1.A2의 PDF 그래프와 문제 1.B1의 PDF 그래프의 차이점이 무엇인지 쓰시오. 이러한 차이가 발생한 이유는 무엇인가?`,
          "referenceAnswer": `문제 1.A2에서는 Nsim=6으로 실험 횟수가 매우 적기 때문에 각 주사위 눈의 상대도수 Px가 1/6에서 크게 벗어날 수 있다. 따라서 그래프의 막대 높이가 눈마다 크게 달라지고, 실행할 때마다 그래프의 모양도 크게 변할 수 있다.

반면 문제 1.B1에서는 Nsim=1000+XXX로 실험 횟수가 크게 증가한다. 이 경우 각 눈이 관측되는 횟수가 충분히 많아지므로 Px[0], Px[1], …, Px[5]가 모두 이론적인 확률 1/6 ≈ 0.1667에 가까워진다. 따라서 그래프는 문제 1.A2보다 훨씬 균등한 형태를 보인다.

또한 문제 1.B1을 여러 번 반복하더라도 각 실행 결과 사이의 차이는 문제 1.A2보다 상대적으로 작다. 이는 실험 횟수가 증가할수록 표본의 상대도수가 실제 확률에 수렴하는 큰 수의 법칙 때문이다.

따라서 두 그래프의 주요 차이는 다음과 같다.

- Nsim=6: 표본 수가 작아 확률의 실험치가 크게 흔들리고 실행마다 차이가 크다.
- Nsim=1000+XXX: 표본 수가 충분히 커 각 눈의 실험 확률이 1/6에 가까워지고 실행 간 차이도 작아진다.`
        },
      ]
    },
  ]
} as const;
