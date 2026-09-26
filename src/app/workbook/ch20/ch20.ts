import type { WorkbookChapter } from '@/types/workbook';

export const chapter = {
  "id": "20-pulse-shaping-matched-filter",
  "title": "Chapter 20. Pulse Shaping and Matched Filter",
  "sections": [
    { //문제 1
      "id": "20-1",
      "title": "1. Raised cosine pulse 모양 관찰",
      "problems": [
        { //문제 1.A
          "id": "20-1A",
          "title": "1.A.",
          "type": "console",
          "prompt": `Raised Cosine(RC) 펄스의 Roll-off factor에 따른 파형 변화를 관찰해 보자.
          
본 온라인 교재에서 제공하는 함수 'rcosdesign(r, 6, L, 'normal')'은 Roll-off factor가 'r'인 Raised cosine 펄스를, 0촐르 중심으로 심벌주기 당 'L'개의 샘플로 샘플링한 벡터를 출력한다.

예를 들어, 아래를 Console에서 실행하면 Roll-off factor가 $0.5$인 Raised cosine 펄스를 그릴 수 있다.
\`\`\`python
>>> import numpy as np
>>> import matplotlib.pyplot as plt
>>> Ts = 1  # 심벌 구간(symbol duration)
>>> L = 16  # 심벌 당 샘플 수
>>> r = 0.5  #Roll-off factor
>>> t = np.arange(-3 * L, 3 * L + 1) * Ts / L
>>> pt = rcosdesign(r, 6, L, 'normal')
>>> pt = pt / max(pt)
>>> plt.plot(t, pt)
>>> plt.grid()
\`\`\`
위 명령어를 참고하여 Roll-off factor가 $0, 0.25, 0.75, 1$인 경우에 대해서도 Raised cosine 펄스의 샘플 벡터 ‘pt’를 각각 생성하고 이들을 하나의 ‘figure’에 색을 달리하여 겹쳐 그리시오. ‘plt.legend()’를 이용하여 각 line의 Roll-off factor를 표시하시오. 
`
        },
        { //문제 1.B
          "id": "20-1B",
          "title": "1.B.",
          "type": "essay",
          "prompt": `문제 1.A에서 생성한 Raised Cosine 펄스의 모양과 시간축을 관찰하시오.

(a) 함수 'rcosdesign(r, 6, L, 'normal')'이 출력하는 펄스는 $t=0$을 중심으로 좌우 각각 몇 심벌 동안의 파형을 나타내는가?
(b) 심벌당 샘플 수가 $L=16$일 때 생성되는 펄스의 전체 샘플 수는 몇 개인가?`
        },
        { //문제 1.C
          "id": "20-1C",
          "title": "1.C.",
          "type": "essay",
          "prompt": `문제 1.A에서 관찰한 Raised Cosine 펄스의 모양을 바탕으로 심벌 간 간섭(ISI, Inter-Symbol Interference)에 대해 생각해 보자.

(a) 여러 데이터 심벌을 펄스 성형하여 전송할 때, 심벌 간 간섭(ISI)이 발생하지 않기 위한 펄스의 조건을 찾아 수식으로 나타내시오.
(b) 문제 1.A에서 생성한 Raised Cosine 펄스를 펄스 성형에 사용하는 경우, 이상적인 심벌 시점에서 ISI가 발생하는지 판단하고 그 이유를 설명하시오.

단, 심벌 주기는 $T_s$이며, 정확한 심벌 시점에서 샘플링한다고 가정한다.`
        },
        { //문제 1.D
          "id": "20-1D",
          "title": "1.D.",
          "type": "console",
          "prompt": `함수 'rcosdesign(r, 6, L, 'normal')'에서 'normal' 대신 'sqrt'를 사용하면 Square Root Raised Cosine(SRRC) 펄스를 생성할 수 있다. Roll-off factor가 $0, 0.25, 0.5, 0.75, 1$인 경우에 대해 SRRC 펄스를 겹쳐 그리기 위해, 'normal' 대신 'sqrt'를 사용하여 문제 1.A를 다시 수행하시오.`
        },
        { //문제 1.E
          "id": "20-1E",
          "title": "1.E.",
          "type": "essay",
          "prompt": `문제 1.D에서 그린 SRRC 펄스의 모양을 바탕으로, SRRC 펄스를 펄스 성형에 사용하는 경우 ISI가 발생하는지 판단하고 그 이유를 설명하시오. 문제 1.C에서 분석한 RC 펄스와 비교하여, 두 펄스가 심벌 주기의 정수배 시점에서 어떤 차이를 보이는지 설명하시오.

단, 현재는 수신기의 정합 필터를 거치기 전의 SRRC 펄스 자체만 고려한다. 정합 필터를 통과한 이후의 신호는 문제 3에서 다룬다.`
        },
      ]
    }
  ]
} as const;
