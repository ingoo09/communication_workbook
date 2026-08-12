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
          "type" : "essay",
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
          "referenceAnswer": ""
        },
        {
          "id": "14-1A2",
          "title": "1.A2.",
          "type": "python",
          "starterCode": `import numpy as np
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
          `,
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

Px=count/x
plt.stem([1,2,3,4,5,6],Px)
\`\`\`
          `,
        },
      ]
    },
  ]
} as const;
