import type { WorkbookChapter } from '@/types/workbook';

export const chapter = {
  "id": "25-fading-diversity-combining",
  "title": "Chapter 25. Fading, Diversity and Combining",
  "sections": [
    { //문제 1
      "id": "25-1",
      "title": "1. 레일레이(Rayleigh) 페이딩 채널에서 판별변수 식 및 평균 BER 유도",
      "problems": [
        { // 문제 1.A
          "id": "25-1A",
          "title": "1.A.",
          "type": "python",
          "starterCode": `import numpy as np

seed = XX
rng = np.random.default_rng(seed)

# Rayleigh fading coefficient
h = ?? * rng.standard_normal() \\
    + ?? * ?? * rng.standard_normal()

print("h =", h)
print("Real(h) =", h.real)
print("Imag(h) =", h.imag)`,
          "prompt": `주파수 비선택적(frequency nonselective) Rayleigh fading 채널에서 fading coefficient $h$는
$$
h=z+jy
\\qquad \\text{(식 25.1)}
$$
로 나타낼 수 있다. 여기서 $z$와 $y$는 서로 독립이며 각각 평균이 0이고 분산이 $1/2$인 Gaussian random variable이다.

표준정규분포 $X\\sim\\mathcal{N}(0,1)$에 상수 $a$를 곱하면 분산은 $a^2$배가 된다. 이를 이용하여 $z$와 $y$의 분산이 각각 $1/2$이 되도록 다음 코드의 빈칸을 채우시오.
\`\`\`python
h = ?? * rng.standard_normal() \\
    + ?? * ?? * rng.standard_normal()
\`\`\`
Python에서 허수 단위는 \`1j\`로 표현한다.

완성된 코드를 실행하여 복소 fading coefficient $h$를 생성하고, \`h.real\`과 \`h.imag\`가 각각 $z$와 $y$에 해당함을 확인하시오.`,
          responseEnabled: true,
        },
        { //문제 1.B
          "id": "25-1B",
          "title": "1.B.",
          "prompt": `페이딩 계수 $h$를 극형식(크기와 위상)으로
$$
h=|h|e^{j\\angle h}
\\qquad \\text{(식 25.2)}
$$          
로 나타낼 수 있다.
          `
        },
        {
          "id": "25-1B1",
          "title": "1.B1.",
          "type": "essay",
          "prompt": `페이딩의 크기 $|h|$를 $z, y$로 나타내시오.`
        },
        {
          "id": "25-1B2",
          "title": "1.B2.",
          "type": "essay",
          "prompt": `$z, y$는 각각 평균 $0$ 분산 $\\dfrac12$인 독립 가우시안 확률 변수임을 이용하면, 문제 1.B1의 식으로부터 $|h|^2$의 평균 즉, $E[|h|^2]$를 구할 수 있다. $E[|h|^2]$를 구하시오.`
        },
      ]
    }
  ]
} as const;
