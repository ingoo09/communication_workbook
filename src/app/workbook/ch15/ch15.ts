import type { WorkbookChapter } from '@/types/workbook';

export const chapter = {
  "id": "15-random_signals",
  "title": "Chapter 15. Random Signals",
  "sections": [
    { //문제 1
      "id": "15-1",
      "title": "1. 가우시안 분포(PDF)의 적분과 Q-function",
      "problems": [
        {
          "id": "15-1A",
          "title": "1.A.",
          "type": "essay",
          "prompt": `$X \\sim N(m, \\sigma^2)$라는 표현은 $X$가 가우시안 분포를 갖는 확률 변수이고, 평균이 $m$이고 분산이 $\\sigma^2$임을 의미한다.

Q-function $Q(k)$는 가우시안 확률 변수 $X$가 $m+k\\sigma$보다 높을 확률을 의미한다. 이는 $X$의 PDF $f_X(x)$를 $m+k\\sigma$에서 양의 무한대까지 적분한 것에 해당하므로, 다음과 같이 표현할 수 있다.
$$
Q(k) \\equiv \\Pr\\{X \\ge m+k\\sigma\\},
\\qquad X \\sim N(m,\\sigma^2)
$$
$$
=
\\int_{m+k\\sigma}^{\\infty} f_X(x)\\,dx
\\qquad \\text{(식 15.1)}
$$

(식 15.1)의 첫 번째 줄에서 $m+k\\sigma$를 $t$로 치환하고, 우변과 좌변을 바꾸면 (식 15.2)로 표현할 수 있다. 즉, 가우시안 확률 변수 $X$가 어떤 실수 $t$보다 높을 확률 $\\Pr\\{X \\ge t\\}$를 Q-function으로 표현할 수 있다. 식 (15.1)에서 $m+k\\sigma$를 $t$로 치환하면, $k$를 $t$, $m$, $\\sigma$에 관한 식으로 표현할 수 있다. 빈칸을 채워 관계식을 완성하시오.
$$
\\Pr\\{X \\ge t\\}
=
Q(\\ ?\\ ),
\\qquad X \\sim N(m,\\sigma^2)
\\qquad \\text{(식 15.2)}
$$
`,
          "referenceAnswer": `$m+k\\sigma=t$ 이므로
$$
k=\\frac{t-m}{\\sigma}
$$
따라서
$$
\\Pr\\{X\\ge t\\}
=
Q\\left(\\frac{t-m}{\\sigma}\\right)
$$
`,
          "tags": [
            "preface"
          ]
        },
      ],
    },
  ]
} as const;
