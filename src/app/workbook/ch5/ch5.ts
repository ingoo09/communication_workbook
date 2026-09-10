import type { WorkbookChapter } from '@/types/workbook';

export const chapter = {
  "id": "5-FTPConv",
  "title": "Chapter 5. Fourier Transform Properties & Convolution",
  "sections": [
    { //문제 1
      "id": "5-1",
      "title": "1. 시간 축 컨볼루션",
      "problems": [
        {
          "id": "5-1A",
          "title": "1.A.",
          "prompt": `Boolean 연산을 이용하여 시간이 유한한(Time-limited) 신호의 샘플 벡터를 생성하는 법을 익히자.`,
        },
        {
          "id": "5-1A1",
          "title": "1.A1.",
          "type": "python",
          "prompt": `아래 py 스크립트 파일을 작성하여, ‘y=(-2<t)&(t<-1)’로 벡터 ‘y’를 생성하여 ‘plt.plot(t, y)’로 그래프를 그리고 결과 그래프를 확인하시오.
\`\`\`python      
import numpy as np
import matplotlib.pyplot as plt

t=np.arange(-5,5,0.01)
y=(-2<t)&(t<-1)
plt.plot(t,y)
plt.axis([-5,5,-1,2])
plt.grid()
\`\`\`
이후, py 스크립트의 모든 라인에 대해 다음의 지침에 따라 주석(Comment)을 작성하시오.

(지침 1) '='이 있는 라인
  - '=' 왼쪽 변수의 목적(용도)을 설명하시오.
  - '=' 오른쪽 수식이 왜 해당 변수의 의미에 부합하는지 설명하시오.
(지침 2) '='이 없는 라인
  - 명령어의 기능을 설명하시오.
  - 왜 해당 명령을 수행하는지 설명하시오.`,
        },
        {
          "id": "5-1A2",
          "title": "1.A2.",
          "type": "essay",
          "prompt": `라인에 대한 설명을 바탕으로, 문제 1.A1의 그래프의 모양을 설명하시오.`          
        },
        {
          "id": "5-1B",
          "title": "1.B.",
          "type": "python",
          "prompt": `아래 py 스크립트는 [그림 5.1]의 $f_1(t)$와 같은 모양을 갖는 벡터 ‘f1’과 [그림 5.2]의 $f_2(t)$와 같은 모양을 갖는 벡터 ‘f2’를 생성한다. ?를 채워 완성된 py 스크립트를 보이시오.
\`\`\`python      
import numpy as np
import matplotlib.pyplot as plt

tstep=0.01
t=np.arange(-5,5,tstep)

f1=0.5*((t>?)&(t<?)) #완성해야 할 부분
f2=((t>-1)&(t<0))-1*((t>0)&(t<1))
\`\`\`
[[image:/images/ch5/figure5_1.png|그림 5.1 $f_1(t)$]]
[[image:/images/ch5/figure5_1.png|그림 5.2 $f_2(t)$]]
          `,
          starterCode: `import numpy as np
import matplotlib.pyplot as plt

tstep=0.01
t=np.arange(-5,5,tstep)

f1=0.5*((t>?)&(t<?)) #완성해야 할 부분
f2=((t>-1)&(t<0))-1*((t>0)&(t<1))`
        },
      ],
    },
  ]
} as const;
