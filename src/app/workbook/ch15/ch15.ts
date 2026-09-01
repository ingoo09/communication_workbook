import type { WorkbookChapter } from '@/types/workbook';

export const chapter = {
  "id": "15-random_signals",
  "title": "Chapter 15. Random Signals",
  "sections": [
    { //문제 1
      "id": "15-1",
      "title": "1. 가우시안 분포(PDF)의 적분과 Q-function",
      "problems": [
        { //문제 1.A
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

(식 15.1)의 첫 번째 줄에서 $m+k\\sigma$를 $t$로 치환하고, 우변과 좌변을 바꾸면 (식 15.2)로 표현할 수 있다. 즉, 가우시안 확률 변수 $X$가 어떤 실수 $t$보다 높을 확률 $\\Pr\\{X \\ge t\\}$를 Q-function으로 표현할 수 있다. 빈칸을 채워 관계식을 완성하시오.
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
        },
        { //문제 1.B
          "id": "15-1B",
          "title": "1.B.",
          "type": "python",
          "prompt": `Q-function은 (식 15.3)과 같이 에러 함수 ‘erfc()’와의 관계가 성립한다. 에러 함수는 scipy.special 모듈에 함수 ‘erfc()’로 정의되어 있으므로, (식 15.3)의 우변을 이용하여 Q-function을 계산하는 것이 가능하다.
$$
Q(x)=\\frac{1}{2}\\operatorname{erfc}\\left(\\frac{x}{\\sqrt{2}}\\right)
\\qquad \\text{(식 15.3)}
$$          
아래는 함수 ‘erfc()’와 (식 15.3)을 이용하여 $Q(x)$를 계산하는 py 스크립트이다. 아래 py 스크립트에서는 $Q(x)$의 매우 작은 범위까지 정확하게 확인하기 위해, ‘plt.plot()’를 사용하지 않고, y축을 로그 스케일로 출력하는 ‘plt.semilogy()’를 사용한다. ?를 채워 py 스크립트를 완성하고, 벡터 ‘x=np.arange(0,6,0.01)’의 각 원소에 대하여 $Q(x)$를 구하고, 결과 그래프를 확인하시오.
\`\`\`python
import numpy as np
from scipy.special import erfc
import matplotlib.pyplot as plt

x=np.arange(0,6,0.01)
Qx=? #채워넣을 부분
plt.semilogy(x,Qx)
\`\`\`
`,        
          "starterCode": `import numpy as np
from scipy.special import erfc
import matplotlib.pyplot as plt

x=np.arange(0,6,0.01)
Qx=? #채워넣을 부분
plt.semilogy(x,Qx)`,
          "referenceAnswer": `
\`\`\`python
import numpy as np
from scipy.special import erfc
import matplotlib.pyplot as plt

x=np.arange(0,6,0.01)
Qx=0.5*erfc(x / np.sqrt(2))
plt.semilogy(x,Qx)
\`\`\`
그래프에서는 $x$가 증가할수록 $Q(x)$가 감소하며, \`plt.semilogy()\`를 사용했기 때문에 작은 확률값도 로그 스케일에서 확인할 수 있다.
`       
        },
        { //문제 1.C
          "id": "15-1C",
          "title": "1.C.",
          "type": "essay",
          "prompt": `(식 15.2)와 (식 15.3)을 이용하여, (식 15.4)를 완성하시오.
$$
\\Pr\\{X\\ge t\\}
=
0.5 \\times \\operatorname{erfc}(\\ ?\\ ),
\\qquad X \\sim N(m,\\sigma^2)
\\qquad \\text{(식 15.4)}
$$  
`,
          "referenceAnswer": `
정규 확률변수 $X\\sim N(m,\\sigma^2)$에 대하여,
$$
\\Pr\\{X\\ge t\\}
=
Q\\left(\\frac{t-m}{\\sigma}\\right)
$$
이고,
$$
Q(x)=\\frac{1}{2}\\operatorname{erfc}\\left(\\frac{x}{\\sqrt{2}}\\right)
$$
이므로,
$$
\\Pr\\{X\\ge t\\}
=
0.5\\times\\operatorname{erfc}
\\left(
\\frac{t-m}{\\sqrt{2}\\sigma}
\\right)
$$
따라서 빈칸은
$$
\\frac{t-m}{\\sqrt{2}\\sigma}
$$
이다.
`
        },
        { //문제 1.D
          "id": "15-1D",
          "title": "1.D.",
          "prompt": `(식 15.4)를 이용하여 다양한 가우시안 확률 변수의 대소 확률을 Python에서 계산할 수 있다. Python의 ‘erfc()’를 사용하여 다음을 구하시오.`
        },
        {
          "id": "15-1D1",
          "title": "1.D1.",
          "type": "python",                    
          "prompt": `$X \\sim N(1, 0.5)$일 때, $\\Pr\\{X\\ge 1.5\\}$의 값을 구하시오.`,
          "referenceAnswer": `
$X\\sim N(1,0.5)$이므로 평균은 $m=1$, 분산은 $\\sigma^2=0.5$이고,
$$
\\sigma=\\sqrt{0.5}
$$
이다. 따라서,
$$
\\Pr\\{X\\ge1.5\\}
=
0.5\\operatorname{erfc}
\\left(
\\frac{1.5-1}{\\sqrt{2}\\sqrt{0.5}}
\\right)
$$
이다.

Python에서는 다음과 같이 계산할 수 있다.
\`\`\`python
import numpy as np
from scipy.special import erfc

P = 0.5 * erfc((1.5 - 1) / (np.sqrt(2) * np.sqrt(0.5)))
print(P)
\`\`\`
따라서,
$$
\\Pr\\{X\\ge1.5\\}\\approx0.23975
$$
이다.
`,
        },
        {
          "id": "15-1D2",
          "title": "1.D2.",
          "type": "python",                    
          "prompt": `$X \\sim N(2, 1)$일 때, $\\Pr\\{X\\ge 2.5\\}$의 값을 구하시오.`,
          "referenceAnswer": `
$X\\sim N(2,1)$이므로 $m=2$, $\\sigma=1$이다. 따라서,
$$
\\Pr\\{X\\ge2.5\\}
=
0.5\\operatorname{erfc}
\\left(
\\frac{2.5-2}{\\sqrt{2}}
\\right)
$$
이다.

Python에서는 다음과 같이 계산할 수 있다.
\`\`\`python
import numpy as np
from scipy.special import erfc

P = 0.5 * erfc((2.5 - 2) / np.sqrt(2))
print(P)
\`\`\`
따라서,
$$
\\Pr\\{X\\ge2.5\\}\\approx0.30854
$$
이다.
`,
        },
        {
          "id": "15-1D3",
          "title": "1.D3.",
          "type": "python",                    
          "prompt": `$X \\sim N(1.5, 0.25)$일 때, $\\Pr\\{X\\ge 0\\}$의 값을 구하시오.`,
          "referenceAnswer": `
$X\\sim N(1.5,0.25)$이므로 $m=1.5$, $\\sigma=\\sqrt{0.25}=0.5$이다. 따라서,
$$
\\Pr\\{X\\ge0\\}
=
0.5\\operatorname{erfc}
\\left(
\\frac{0-1.5}{\\sqrt{2}\\times0.5}
\\right)
$$
이다.

Python에서는 다음과 같이 계산할 수 있다.
\`\`\`python
import numpy as np
from scipy.special import erfc

P = 0.5 * erfc((0 - 1.5) / (np.sqrt(2) * np.sqrt(0.25)))
print(P)
\`\`\`
따라서,
$$
\\Pr\\{X\\ge0\\}\\approx0.99865
$$
이다.
`,
        },
        {
          "id": "15-1D4",
          "title": "1.D4.",
          "type": "python",                    
          "prompt": `$X \\sim N(1, 0.5)$일 때, $\\Pr\\{X\\le -1.5\\}$의 값을 구하시오.
(Hint. 가우시안 확률 분포(PDF)는 평균을 중심으로 대칭인 성질을 이용)`,
          "referenceAnswer": `
$X\\sim N(1,0.5)$이고 가우시안 확률 분포는 평균 $m=1$을 중심으로 대칭이다.

$-1.5$는 평균 $1$에서 왼쪽으로 $2.5$만큼 떨어져 있으므로, 대칭 위치는 $1+2.5=3.5$이다.

따라서,
$$
\\Pr\\{X\\le-1.5\\}
=
\\Pr\\{X\\ge3.5\\}
$$
이다.
$\\sigma=\\sqrt{0.5}$이므로,
$$
\\Pr\\{X\\le-1.5\\}
=
0.5\\operatorname{erfc}
\\left(
\\frac{3.5-1}{\\sqrt{2}\\sqrt{0.5}}
\\right)
$$
이다.

Python에서는 다음과 같이 계산할 수 있다.
\`\`\`python
import numpy as np
from scipy.special import erfc

P = 0.5 * erfc((3.5 - 1) / (np.sqrt(2) * np.sqrt(0.5)))
print(P)
\`\`\`
따라서,
$$
\\Pr\\{X\\le-1.5\\}\\approx2.03476\\times10^{-4}
$$
이다.
`,
        },
        { //문제 1.E
          "id": "15-1E",
          "title": "1.E.",          
          "prompt": `실험으로 문제 1.D1의 답을 검증해보자. Python 함수 ‘np.random.randn()’을 이용하여, $X \\sim N(1, 0.5)$의 샘플을 랜덤하게 생성할 수 있다. ([[link:/workbook/ch14?p=14-4B|14장의 문제 4.B]] 참고)

아래 py 스크립트는 1.5보다 큰 $X$의 샘플 개수가 'Nid'가 될 때까지 $X$번 반복 생성하여, $\\Pr\\{X\\ge 1.5\\}$(=py 스크립트에서 변수 'P')를 실험으로 구한다.
\`\`\`python
import numpy as np

Nid=1XXX #XXX=학번 끝 3자리
cnt=0
trials=0
while(cnt<Nid):
    X=?*np.random.randn()+? #완성해야 할 부분 (1)
    if(X >= 1.5):
        cnt=cnt+1
    trials=trials+1
P=?/? #완성해야 할 부분 (2)
print(P)
\`\`\`
          `,
        },
        {
          "id": "15-1E1",
          "title": "1.E1.",
          "type": "python",
          "prompt": `?를 채워 py 스크립트를 완성한 후, 모든 라인에 대해 다음의 지침에 따라 주석을 작성하시오.

(지침 1) '='이 있는 라인
  - '=' 왼쪽 변수의 목적(용도)을 설명하시오.
  - '=' 오른쪽 수식이 왜 해당 변수의 의미에 부합하는지 설명하시오.
(지침 2) '='이 없는 라인
  - 명령어의 기능을 설명하시오.
  - 왜 해당 명령을 수행하는지 설명하시오.
  
이후, '코드 실행' 버튼을 눌러 py 스크립트를 실행하고, 결과를 확인하시오.
  `,
        "starterCode": `import numpy as np

Nid=1XXX #XXX=학번 끝 3자리
cnt=0
trials=0
while(cnt<Nid):
    X=?*np.random.randn()+? #완성해야 할 부분 (1)
    if(X >= 1.5):
        cnt=cnt+1
    trials=trials+1
P=?/? #완성해야 할 부분 (2)
print(P)`,
          "referenceAnswer": `
$X\\sim N(1,0.5)$이므로 평균은 $m=1$, 분산은 $\\sigma^2=0.5$이다. 따라서 표준편차는
$$
\\sigma=\\sqrt{0.5}
$$
이고, 표준정규 확률변수 $Z\\sim N(0,1)$에 대하여
$$
X=\\sqrt{0.5}Z+1
$$
로 생성할 수 있다.

또한, $X\\ge1.5$인 횟수를 \`cnt\`, 전체 시행 횟수를 \`trials\`라 하면 실험적으로 구한 확률은
$$
P=\\frac{cnt}{trials}
$$
이다.

완성된 py 스크립트의 예는 다음과 같다.
\`\`\`python
import numpy as np  # NumPy 모듈을 np라는 이름으로 불러온다. 난수 생성과 제곱근 계산에 사용한다.
from scipy.special import erfc  # erfc 함수를 불러온다. 문제 1.D1에서 이론적인 확률을 계산할 때 사용하는 함수이다.

Nid=1XXX  # X가 1.5 이상인 샘플을 몇 개 얻을 때까지 실험할지를 정한다. XXX에는 학번 끝 3자리를 사용한다.
cnt=0  # X가 1.5 이상인 샘플의 개수를 저장하는 변수이며, 실험 시작 전이므로 0으로 초기화한다.
trials=0  # 지금까지 생성한 전체 X 샘플의 개수를 저장하는 변수이며, 실험 시작 전이므로 0으로 초기화한다.

while(cnt<Nid):  # X가 1.5 이상인 샘플의 개수 cnt가 목표값 Nid에 도달할 때까지 반복한다.
    X=np.sqrt(0.5)*np.random.randn()+1  # 평균 1, 분산 0.5인 가우시안 확률변수 X의 샘플 하나를 생성한다.
    if(X >= 1.5):  # 생성된 X가 관심 사건인 X>=1.5를 만족하는지 확인한다.
        cnt=cnt+1  # X>=1.5를 만족했으므로 해당 사건의 발생 횟수 cnt를 1 증가시킨다.
    trials=trials+1  # X 샘플을 한 번 생성했으므로 전체 시행 횟수 trials를 1 증가시킨다.

P=cnt/trials  # X>=1.5가 발생한 횟수를 전체 시행 횟수로 나누어 Pr{X>=1.5}를 실험적으로 추정한다.
print(P)  # 실험으로 구한 확률 P를 화면에 출력하여 확인한다.
\`\`\`
난수를 이용한 실험이므로 실행할 때마다 $P$의 값은 조금씩 달라질 수 있다.
`     
        }, 
        {
          "id": "15-1E2",
          "title": "1.E2.",
          "type": "essay",          
          "prompt": `문제 1.E1에서 실험으로 구한 값과 문제 1.D1에서 함수 ‘erfc()’를 사용하여 얻은 값이 일치하는지 확인하시오.`,  
          "referenceAnswer": `
문제 1.D1에서 \`erfc()\`를 이용하여 구한 이론적인 확률은
$$
\\Pr\\{X\\ge1.5\\}
\\approx 0.23975
$$
이다.

문제 1.E1에서 얻은 $P=cnt/trials$는 난수를 이용하여 구한 실험적인 확률이므로 실행할 때마다 값이 조금씩 달라질 수 있다. 그러나, 충분한 횟수의 샘플을 생성하면 실험값 $P$는 문제 1.D1에서 계산한 이론값인 약 $0.23975$에 가까운 값으로 나타난다.

따라서, 실험으로 구한 결과와 \`erfc()\`를 이용하여 구한 결과가 근사적으로 일치함을 확인할 수 있다.
`         
        },
        { //문제 1.F
          "id": "15-1F",
          "title": "1.F.",          
          "prompt": `문제 1.E의 py 스크립트를 수정하여, 문제 1.D2~1.D4의 답을 실험으로 검증하자. 각각의 문제에 대해 문제 1.E의 py 스크립트를 복사하여 붙여넣은 후, py 스크립트을 수정하여 실행 결과를 보이고, 실험으로 구한 값이 함수 ‘erfc()’를 사용하여 얻은 값과 일치하는지 확인하시오.`,
        },
        {
          "id": "15-1F1",
          "title": "1.F1.",
          "type": "python",
          "prompt": `실험으로 문제 1.D2($X \\sim N(2, 1)$일 때, $\\Pr\\{X\\ge 2.5\\}$)의 값을 검증하시오.`,   
          "referenceAnswer": `
$X\\sim N(2,1)$이므로 평균은 $m=2$, 표준편차는 $\\sigma=1$이다.
따라서 표준정규 확률변수 $Z\\sim N(0,1)$를 이용하면
$$
X=Z+2
$$
로 샘플을 생성할 수 있다.

문제 1.E의 실험 구조를 이용한 예시는 다음과 같다.
\`\`\`python
import numpy as np

Nid=1XXX  # XXX에는 학번 끝 3자리를 사용한다.
cnt=0
trials=0

while(cnt<Nid):
    X=np.random.randn()+2
    if(X >= 2.5):
        cnt=cnt+1
    trials=trials+1

P=cnt/trials
print(P)
\`\`\`
문제 1.D2에서 \`erfc()\`를 이용하여 구한 이론값은
$$
\\Pr\\{X\\ge2.5\\}\\approx0.30854
$$
이다.

난수를 이용한 실험값 $P$는 실행할 때마다 조금씩 달라질 수 있지만, 충분한 시행 횟수에서는 약 $0.30854$에 가까운 값을 얻을 수 있다.

따라서 실험으로 구한 값과 \`erfc()\`를 이용하여 구한 이론값이 근사적으로 일치함을 확인할 수 있다.
`         
        },
        {
          "id": "15-1F2",
          "title": "1.F2.",
          "type": "python",
          "prompt": `실험으로 문제 1.D3($X \\sim N(1.5, 0.25)$일 때, $\\Pr\\{X\\ge 0\\}$)의 값을 검증하시오.`,      
          "referenceAnswer": `
$X\\sim N(1.5,0.25)$이므로 평균은 $m=1.5$, 표준편차는
$$
\\sigma=\\sqrt{0.25}=0.5
$$
이다.
따라서
$$
X=0.5Z+1.5,
\\qquad Z\\sim N(0,1)
$$
로 샘플을 생성할 수 있다.

문제 1.E의 실험 구조를 이용한 예시는 다음과 같다.
\`\`\`python
import numpy as np

Nid=1XXX  # XXX에는 학번 끝 3자리를 사용한다.
cnt=0
trials=0

while(cnt<Nid):
    X=0.5*np.random.randn()+1.5
    if(X >= 0):
        cnt=cnt+1
    trials=trials+1

P=cnt/trials
print(P)
\`\`\`
문제 1.D3에서 \`erfc()\`를 이용하여 구한 이론값은
$$
\\Pr\\{X\\ge0\\}\\approx0.99865
$$
이다.

실험값 $P$는 난수에 따라 조금씩 달라지지만, 충분한 시행 횟수에서는 약 $0.99865$에 가까운 값을 얻을 수 있다.

따라서 실험값과 이론값이 근사적으로 일치함을 확인할 수 있다.
`  
        },
        {
          "id": "15-1F3",
          "title": "1.F3.",
          "type": "python",
          "prompt": `실험으로 문제 1.D4($X \\sim N(1, 0.5)$일 때, $\\Pr\\{X\\le -1.5\\}$)의 값을 검증하시오.`,       
          "referenceAnswer": `
$X\\sim N(1,0.5)$이므로 평균은 $m=1$, 표준편차는
$$
\\sigma=\\sqrt{0.5}
$$
이다.
따라서
$$
X=\\sqrt{0.5}Z+1,
\\qquad Z\\sim N(0,1)
$$
로 샘플을 생성할 수 있다.

문제 1.E의 실험 구조를 이용한 예시는 다음과 같다.
\`\`\`python
import numpy as np

Nid=1XXX  # XXX에는 학번 끝 3자리를 사용한다.
cnt=0
trials=0

while(cnt<Nid):
    X=np.sqrt(0.5)*np.random.randn()+1
    if(X <= -1.5):
        cnt=cnt+1
    trials=trials+1

P=cnt/trials
print(P)
\`\`\`
문제 1.D4에서 \`erfc()\`를 이용하여 구한 이론값은
$$
\\Pr\\{X\\le-1.5\\}\\approx2.03476\\times10^{-4}
$$
이다.

실험값 $P$는 실행할 때마다 달라질 수 있지만, 충분히 많은 시행을 수행하면 이론값에 가까워진다.

따라서 실험으로 구한 값과 \`erfc()\`를 사용하여 얻은 값이 근사적으로 일치함을 확인할 수 있다.
`
        },
      ],
    },
    { //문제 2
      "id": "15-2",
      "title": "2. 독립 확률 변수와 가우시안 확률 변수(Gaussian Random Variables)",
      "problems": [
        { //문제 2.A
          "id": "15-2A",
          "title": "2.A.",
          "type": "essay",    
          "prompt": `본 문제를 통하여 독립 확률 변수의 주요 특성과 가우시안 확률 변수의 고유 특성을 알아보자.
          
서로 독립인 확률 변수 $X_1$, $X_2$가 있고, 각각의 PDF를 $f_{X_1}(x)$, $f_{X_2}(x)$라 하자. 두 확률 변수의 합을 $X_3=X_1+X_2$라 할 때, 독립 확률 변수의 합에 대한 convolution 관계를 이용하면 $X_3$의 PDF는 다음과 같이 구할 수 있다.

아래 식의 ?를 채워 완성하시오.
$$
f_{X_3}(x)
=
\\int_{-\\infty}^{\\infty}
f_{X_1}(\\tau)
f_{X_2}(\\ ?\\ )
\\,d\\tau
$$
또한 위 식이 $f_{X_1}(x)$와 $f_{X_2}(x)$의 convolution임을 기호로 나타내시오.
`,
  "referenceAnswer": `
서로 독립인 확률 변수 $X_1$, $X_2$의 합 $X_3=X_1+X_2$의 PDF는 두 PDF의 convolution으로 구할 수 있다.

따라서,
$$
f_{X_3}(x)
=
\\int_{-\\infty}^{\\infty}
f_{X_1}(\\tau)
f_{X_2}(x-\\tau)
\\,d\\tau
$$
이다.

따라서 빈칸은
$$
x-\\tau
$$
이고, convolution 기호를 사용하면
$$
f_{X_3}(x)
=
f_{X_1}(x)*f_{X_2}(x)
$$
로 나타낼 수 있다.
`      
        },
        { //문제 2.B
          "id": "15-2B",
          "title": "2.B.",
          "type": "essay",
          "prompt": `
서로 독립인 $K$개의 확률 변수 $X_1,X_2,\\ldots,X_K$의 합을 $S=\\sum_{i=1}^{K}X_i$라 하자.

문제 2.A에서 두 독립 확률 변수의 합의 PDF가 두 PDF의 convolution으로 주어짐을 확인하였다. 이를 $K$개의 독립 확률 변수로 확장하여, $S$의 PDF $f_S(x)$를 $f_{X_1}(x),f_{X_2}(x),\\ldots,f_{X_K}(x)$와 convolution 기호 $*$를 사용하여 나타내시오.
`,
          "referenceAnswer": `
서로 독립인 확률 변수의 합의 PDF는 각 확률 변수 PDF의 convolution으로 구할 수 있다.

따라서,
$$
S=X_1+X_2+\\cdots+X_K
$$
일 때,
$$
f_S(x)
=
f_{X_1}(x)
*
f_{X_2}(x)
*
\\cdots
*
f_{X_K}(x)
$$
이다.

즉, $K$개의 독립 확률 변수의 합에 대한 PDF는 각각의 PDF를 반복적으로 convolution하여 얻는다.

참고로, $X_i(i=1,2,3,\\ldots,K)$가 모두 같은 PDF를 갖는 경우에도, 각각의 확률 변수가 서로 독립이면 위 관계는 성립한다.
`
        },
        { //문제 2.C
          "id": "15-2C",
          "title": "2.C.",
          "type": "essay",
          "prompt": `서로 독립인 $K$개의 확률 변수 $X_i(i=1,2,3,\\ldots,K)$의 선형 결합을 $Y=\\sum_{i=1}^{K}(a_iX_i+b_i)$라 하자.

이때 $Y$의 평균은
$$
m_Y
=
\\sum_{i=1}^{K}(a_im_{X_i}+b_i)
\\qquad \\text{(식 15.5)}
$$
이고, 분산은
$$
\\sigma_Y^2
=
\\sum_{i=1}^{K}a_i^2\\sigma_{X_i}^2
\\qquad \\text{(식 15.6)}
$$
로 주어진다.

(식 15.6)을 증명하기 위해 아래 식의 ?를 채우시오.
$$
\\sigma_Y^2
=
E\\left[(Y-m_Y)^2\\right]
$$
$$
=
E\\left[
\\left(
\\sum_{i=1}^{K}
a_i(X_i-m_{X_i})
\\right)^2
\\right]
$$
$$
=
\\sum_{i=1}^{K}
a_i^2E\\left[(X_i-m_{X_i})^2\\right]
+
\\sum_{i\\ne j}
a_ia_j
E\\left[
(X_i-m_{X_i})(X_j-m_{X_j})
\\right]
$$
서로 독립인 $X_i$, $X_j$에 대하여
$$
E\\left[
(X_i-m_{X_i})(X_j-m_{X_j})
\\right]
=
\\ ?
$$
이므로 최종적으로
$$
\\sigma_Y^2
=
\\ ?
$$
가 된다.

왜 교차항이 사라지는지도 함께 설명하시오.
`,
         "referenceAnswer": `
서로 독립인 확률 변수 $X_i$, $X_j$에 대해서는
$$
E\\left[
(X_i-m_{X_i})(X_j-m_{X_j})
\\right]
=
E[X_i-m_{X_i}]
E[X_j-m_{X_j}]
$$
이고,
$$
E[X_i-m_{X_i}]=0,
\\qquad
E[X_j-m_{X_j}]=0
$$
이므로,
$$
E\\left[
(X_i-m_{X_i})(X_j-m_{X_j})
\\right]
=
0
$$
이다.

따라서 모든 교차항이 0이 되고,
$$
\\sigma_Y^2
=
\\sum_{i=1}^{K}
a_i^2E\\left[(X_i-m_{X_i})^2\\right]
$$
이다.

또한.
$$
E\\left[(X_i-m_{X_i})^2\\right]
=
\\sigma_{X_i}^2
$$
이므로,
$$
\\boxed{
\\sigma_Y^2
=
\\sum_{i=1}^{K}
a_i^2\\sigma_{X_i}^2
}
$$
이다.

따라서 첫 번째 빈칸은 $0$이고,
두 번째 빈칸은
$$
\\sum_{i=1}^{K}a_i^2\\sigma_{X_i}^2
$$
이다.
`
        },
        { //문제 2.D
          "id": "15-2D",
          "title": "2.D.",
          "prompt": `$X_1 \\sim N(1, 2), X_2 \\sim N(-2, 9), X_3 \\sim N(0, 4)$를 따르는 독립적인 가우시안 확률 변수이고, $Y=X_1+3X_2-2X_3$일 때, 아래와 같이 함수 ‘np.random.randn()’을 사용하여, $X_1, X_2, X_3, Y$를 생성할 수 있다.
\`\`\`python
X1=np.sqrt(?)*np.random.randn()+?
X2=np.sqrt(?)*np.random.randn()+?
X3=np.sqrt(?)*np.random.randn()+?
Y=?
\`\`\`
아래 py 스크립트는 변수 ‘Y’를 ‘Nid’번 반복적으로 생성하고, 그 값들을 이용하여 평균 ‘mY’와 분산 ‘vY’를 구한다.
\`\`\`python
import numpy as np

Nid=1XXX # XXX=학번 끝 3자리
Y=np.empty(Nid)
for n in range(Nid):
    X1=np.sqrt(?)*np.random.randn()+? #완성해야 할 부분 (1)
    X2=np.sqrt(?)*np.random.randn()+? #완성해야 할 부분 (2)
    X3=np.sqrt(?)*np.random.randn()+? #완성해야 할 부분 (3)
    Y[n]=? #완성해야 할 부분 (4)

mY=? #완성해야 할 부분 (5), 14장의 문제 5.A 참고, 함수 'np.mean()'을 사용하지 말 것.
vY=? #완성해야 할 부분 (6), 14장의 문제 5.B 참고, 함수 'np.var()'를 사용하지 말 것.

print(mY)
print(vY)
\`\`\`
(참고. [[link:/workbook/ch14?p=14-5A|14장의 문제 5.A]], [[link:/workbook/ch14?p=14-5B|14장의 문제 5.B]])
`
        },
        {
          "id": "15-2D1",
          "title": "2.D1.",
          "type": "python",
          "prompt": `?를 채워 py 스크립트를 완성하고, 실행하여 결과를 확인하시오.`,
          "starterCode": `import numpy as np

Nid=1XXX # XXX=학번 끝 3자리
Y=np.empty(Nid)
for n in range(Nid):
    X1=np.sqrt(?)*np.random.randn()+? #완성해야 할 부분 (1)
    X2=np.sqrt(?)*np.random.randn()+? #완성해야 할 부분 (2)
    X3=np.sqrt(?)*np.random.randn()+? #완성해야 할 부분 (3)
    Y[n]=? #완성해야 할 부분 (4)

mY=? #완성해야 할 부분 (5), 14장의 문제 5.A 참고, 함수 'np.mean()'을 사용하지 말 것.
vY=? #완성해야 할 부분 (6), 14장의 문제 5.B 참고, 함수 'np.var()'를 사용하지 말 것.

print(mY)
print(vY)`,
          "referenceAnswer":  `
각 확률 변수는
$$
X_1\\sim N(1,2),\\qquad
X_2\\sim N(-2,9),\\qquad
X_3\\sim N(0,4)
$$
이므로, 표준정규 확률변수 $Z\\sim N(0,1)$를 이용하면
$$
X_1=\\sqrt{2}Z+1,
$$
$$
X_2=\\sqrt{9}Z-2,
$$
$$
X_3=\\sqrt{4}Z
$$
의 형태로 각각 생성할 수 있다.

또한,
$$
Y=X_1+3X_2-2X_3
$$
이므로 py 스크립트는 다음과 같이 완성할 수 있다.
\`\`\`python
import numpy as np

Nid=1XXX # XXX=학번 끝 3자리
Y=np.empty(Nid)

for n in range(Nid):
    X1=np.sqrt(2)*np.random.randn()+1
    X2=np.sqrt(9)*np.random.randn()-2
    X3=np.sqrt(4)*np.random.randn()+0
    Y[n]=X1+3*X2-2*X3

mY=np.sum(Y)/Nid
vY=np.sum((Y-mY)**2)/Nid

print(mY)
print(vY)
\`\`\`
난수를 이용한 시뮬레이션이므로 실행할 때마다 $m_Y$와 $v_Y$의 값은 조금씩 달라질 수 있다.
`
        },
        {
          "id": "15-2D2",
          "title": "2.D2.",
          "type": "essay",
          "prompt": `(식 15.5)와 (식 15.6)을 통해 $Y$의 평균과 분산의 이론치를 구하고, 구한 이론치가 문제 2.D1의 시뮬레이션 결과와 일치하는지 확인하시오.`,
          "referenceAnswer": `
$$
Y=X_1+3X_2-2X_3
$$
이고,
$$
X_1\\sim N(1,2),\\qquad
X_2\\sim N(-2,9),\\qquad
X_3\\sim N(0,4)
$$
이다.

(식 15.5)에 따라 $Y$의 평균은
$$
m_Y
=
1\\times1
+
3\\times(-2)
+
(-2)\\times0
$$
이므로,
$$
m_Y=-5
$$
이다.

또한, $X_1$, $X_2$, $X_3$는 서로 독립이므로 (식 15.6)에 따라 $Y$의 분산은
$$
\\sigma_Y^2
=
1^2\\times2
+
3^2\\times9
+
(-2)^2\\times4
$$
이다.

따라서,
$$
\\sigma_Y^2
=
2+81+16
=
99
$$
이다.

즉, $Y$의 평균과 분산의 이론치는 각각
$$
\\boxed{m_Y=-5}
$$
$$
\\boxed{\\sigma_Y^2=99}
$$
이다.

문제 2.D1에서 구한 시뮬레이션 결과는 난수에 의해 실행할 때마다 조금씩 달라지지만, 충분한 수의 샘플을 생성하면
$$
m_Y\\approx-5,
\\qquad
v_Y\\approx99
$$
에 가까운 값을 얻을 수 있다.

따라서, 시뮬레이션 결과와 이론적으로 구한 평균 및 분산이 근사적으로 일치함을 확인할 수 있다.
`
        },
        { //문제 2.E
          "id": "15-2E",
          "title": "2.E.",
          "prompt": `$K$개의 확률 변수들 즉, $X_i (i=1, 2, \\ldots, K)$가 각각 독립적인 가우시안 분포를 따른다고 가정하자.
          
$X_i$들의 선형 결합으로 생성된 확률 변수 $Y$는
$$
Y=\\sum_{i=1}^{K}(a_i X_i + b_i)
$$
로 나타낼 수 있다.`,
        },
        {
          "id": "15-2E1",
          "title": "2.E1.",     
          "type": "essay",
          "prompt": `가우시안 확률 변수의 정리에 따르면, 확률 변수 $Y$는 어떠한 분포를 따르는가?`,
          "referenceAnswer": `
각 $X_i$가 서로 독립적인 가우시안 확률 변수이고,
$$
Y=\\sum_{i=1}^{K}(a_iX_i+b_i)
$$
와 같이 이들의 선형 결합으로 $Y$가 정의되므로, $Y$ 역시 가우시안 분포를 따른다.

즉,
$$
Y\\sim N(m_Y,\\sigma_Y^2)
$$
이며,
$$
m_Y
=
\\sum_{i=1}^{K}
(a_i m_{X_i}+b_i)
$$
이고,
$$
\\sigma_Y^2
=
\\sum_{i=1}^{K}
a_i^2\\sigma_{X_i}^2
$$
이다.
`
        },
        {
          "id": "15-2E2",
          "title": "2.E2.",     
          "type": "essay",
          "prompt": `문제 2.E1의 결과와 문제 2.D2에서 (식 15.5)와 (식 15.6)을 이용하여 구한 평균과 분산을 이용하면, 문제 2.D에서 생성한 확률 변수 $Y$(Python 변수=‘Y’)의 정확한 PDF $f_Y(y)$를 구할 수 있다. $f_Y(y)$를 쓰시오.`,
          "referenceAnswer": `
문제 2.D2에서 구한 $Y$의 평균과 분산은
$$
m_Y=-5,
\\qquad
\\sigma_Y^2=99
$$
이다.

또한 문제 2.E1에서 확인한 바와 같이 $Y$는 가우시안 분포를 따르므로,
$$
Y\\sim N(-5,99)
$$
이다.

가우시안 확률 변수의 PDF는
$$
f_Y(y)
=
\\frac{1}{\\sqrt{2\\pi\\sigma_Y^2}}
\\exp\\left(
-\\frac{(y-m_Y)^2}{2\\sigma_Y^2}
\\right)
$$
이므로, $m_Y=-5$, $\\sigma_Y^2=99$를 대입하면
$$
f_Y(y)
=
\\frac{1}{\\sqrt{2\\pi\\times99}}
\\exp\\left(
-\\frac{(y+5)^2}{2\\times99}
\\right)
$$
이다.

따라서,
$$
\\boxed{
f_Y(y)
=
\\frac{1}{\\sqrt{198\\pi}}
\\exp\\left(
-\\frac{(y+5)^2}{198}
\\right)
}
$$
이다.
`
        },
        {
          "id": "15-2E3",
          "title": "2.E3.",     
          "type": "console",
          "prompt": `(식 15.4)를 이용하여 문제 2.D에서 생성한 ‘Y’가 10보다 높을 확률 $\\Pr\\{Y \\ge 10\\}$을 구할 수 있다. 아래 명령어를 완성하여 Console 창에서 그 값을 구하고, 결과를 쓰시오.
\`\`\`python
>>> import numpy as np
>>> from scipy.special import erfc
>>> m=?; v=?; t=? #완성해야 할 부분 (1)
>>> Pr=?*erfc(?) #완성해야 할 부분 (2)
>>> print(Pr)
\`\`\`
`,
          "referenceAnswer": `
문제 2.D2에서 구한 $Y$의 평균과 분산은
$$
m_Y=-5,
\\qquad
v_Y=\\sigma_Y^2=99
$$
이다.

또한 구하고자 하는 확률은
$$
\\Pr\\{Y\\ge10\\}
$$
이므로 $t=10$이다.

(식 15.4)에 따라
$$
\\Pr\\{Y\\ge10\\}
=
0.5\\operatorname{erfc}
\\left(
\\frac{10-(-5)}{\\sqrt{2}\\sqrt{99}}
\\right)
$$
이다.

따라서 Console 명령어는 다음과 같이 완성할 수 있다.
\`\`\`python
>>> import numpy as np
>>> from scipy.special import erfc
>>> m=-5; v=99; t=10
>>> Pr=0.5*erfc((t-m)/(np.sqrt(2)*np.sqrt(v)))
>>> print(Pr)
\`\`\`
실행 결과는 약
$$
\\Pr\\{Y\\ge10\\}\\approx0.06583
$$
이다.
`
        },
        {
          "id": "15-2E4",
          "title": "2.E4.",     
          "type": "python",          
          "prompt": `아래는 $\\Pr\\{Y \\ge 10\\}$을 실험으로 구하는 py 스크립트이다.
\`\`\`python
import numpy as np

Nid=1XXX #XXX=학번 끝 3자리
cnt=0
trials=0
while(cnt<Nid):
    X1=np.sqrt(?)*np.random.randn()+? #완성해야 할 부분 (1)
    X2=np.sqrt(?)*np.random.randn()+? #완성해야 할 부분 (2)
    X3=np.sqrt(?)*np.random.randn()+? #완성해야 할 부분 (3)
    Y=? #완성해야 할 부분 (4)
    if(Y >= ?): #완성해야 할 부분 (5)
        cnt=cnt+1
    trials=trials+1
P=?/? #완성해야 할 부분 (6)
\`\`\`
?를 채워 py 스크립트를 완성하고, 실행하여 결과를 확인하시오.
          `,
          "starterCode": `import numpy as np

Nid=1XXX #XXX=학번 끝 3자리
cnt=0
trials=0
while(cnt<Nid):
    X1=np.sqrt(?)*np.random.randn()+? #완성해야 할 부분 (1)
    X2=np.sqrt(?)*np.random.randn()+? #완성해야 할 부분 (2)
    X3=np.sqrt(?)*np.random.randn()+? #완성해야 할 부분 (3)
    Y=? #완성해야 할 부분 (4)
    if(Y >= ?): #완성해야 할 부분 (5)
        cnt=cnt+1
    trials=trials+1
P=?/? #완성해야 할 부분 (6)`,
            "referenceAnswer": `
각 확률 변수는
$$
X_1\\sim N(1,2),\\qquad
X_2\\sim N(-2,9),\\qquad
X_3\\sim N(0,4)
$$
이므로,
$$
X_1=\\sqrt{2}Z+1,
$$
$$
X_2=\\sqrt{9}Z-2,
$$
$$
X_3=\\sqrt{4}Z
$$
의 형태로 각각 생성할 수 있다.

또한
$$
Y=X_1+3X_2-2X_3
$$
이므로 py 스크립트는 다음과 같이 완성할 수 있다.
\`\`\`python
import numpy as np

Nid=1XXX #XXX=학번 끝 3자리
cnt=0
trials=0

while(cnt<Nid):
    X1=np.sqrt(2)*np.random.randn()+1
    X2=np.sqrt(9)*np.random.randn()-2
    X3=np.sqrt(4)*np.random.randn()+0
    Y=X1+3*X2-2*X3

    if(Y >= 10):
        cnt=cnt+1

    trials=trials+1

P=cnt/trials
print(P)
\`\`\`
문제 2.E3에서 함수 \`erfc()\`를 이용하여 구한 이론값은
$$
\\Pr\\{Y\\ge10\\}\\approx0.06583
$$
이다.

난수를 이용한 실험값 $P$는 실행할 때마다 조금씩 달라질 수 있다.
`
        },
        {
          "id": "15-2E5",
          "title": "2.E5.",     
          "type": "essay",  
          "prompt": `문제 2.E4에서 얻은 실험 결과와 문제 2.E3에서 구한 이론값이 근사적으로 일치하는지 확인하시오.`,
          "referenceAnswer": `
문제 2.E3에서 함수 \`erfc()\`를 이용하여 구한 이론값은

$$
\\Pr\\{Y\\ge10\\}\\approx0.06583
$$

이다.

문제 2.E4에서 구한 값은 난수를 이용한 실험 결과이므로, 실행할 때마다 조금씩 달라질 수 있다.

하지만 충분한 횟수의 실험을 수행하면 문제 2.E4에서 얻은 확률은 약 $0.06583$에 가까워진다.

따라서 두 값이 정확히 같은 것은 아니지만, 실험 결과와 이론값은 근사적으로 일치한다고 할 수 있다.
`
        },
        {
          "id": "15-2E6",
          "title": "2.E6.",
          "type": "python",
          "consoleEnabled": true,
          "prompt": `$\\Pr\\{Y \\le -15\\}$에 대하여 문제 2.E3~2.E4를 반복하여 이론치와 실험치가 근사적으로 일치하는지 확인하시오.
          
(참고. 이론치를 구할 때, 가우시안 확률 분포(PDF)는 평균을 중심으로 대칭임을 이용할 것)`,
          "referenceAnswer": `
문제 2.D2에서 구한 $Y$의 평균과 분산은
$$
m_Y=-5,
\\qquad
\\sigma_Y^2=99
$$
이다.

가우시안 확률 분포는 평균을 중심으로 대칭이다. $-15$는 평균 $-5$에서 왼쪽으로 $10$만큼 떨어져 있으므로, 평균을 중심으로 대칭인 위치는 $-5+10=5$이다.

따라서,
$$
\\Pr\\{Y\\le-15\\}
=
\\Pr\\{Y\\ge5\\}
$$
이다.

(식 15.4)를 이용하면,
$$
\\Pr\\{Y\\le-15\\}
=
0.5\\operatorname{erfc}
\\left(
\\frac{5-(-5)}
{\\sqrt{2}\\sqrt{99}}
\\right)
$$
이다.

Console에서 이론치는 다음과 같이 계산할 수 있다.
\`\`\`python
>>> import numpy as np
>>> from scipy.special import erfc
>>> m=-5; v=99; t=5
>>> Pr=0.5*erfc((t-m)/(np.sqrt(2)*np.sqrt(v)))
>>> print(Pr)
\`\`\`
따라서 이론치는 약
$$
\\Pr\\{Y\\le-15\\}
\\approx0.15744
$$
이다.

다음으로, 문제 2.E4와 같은 방법으로 실험값을 구할 수 있다.
\`\`\`python
import numpy as np

Nid=1XXX #XXX=학번 끝 3자리
cnt=0
trials=0

while(cnt<Nid):
    X1=np.sqrt(2)*np.random.randn()+1
    X2=np.sqrt(9)*np.random.randn()-2
    X3=np.sqrt(4)*np.random.randn()+0
    Y=X1+3*X2-2*X3

    if(Y <= -15):
        cnt=cnt+1

    trials=trials+1

P=cnt/trials
print(P)
\`\`\`
난수를 이용한 실험값 $P$는 실행할 때마다 조금씩 달라지지만, 충분한 횟수의 실험을 수행하면 이론값
$$
0.15744
$$
에 가까운 값을 얻을 수 있다.

따라서 $\\Pr\\{Y\\le-15\\}$의 이론치와 실험치는 근사적으로 일치함을 확인할 수 있다.
`
        }
      ]
    },
    { //문제 3
      "id": "15-3",
      "title": "3. Central Limit Theorem(CLT)",
      "problems": [
        { //문제 3.A
          "id": "15-3A",
          "title": "3.A.", 
          "prompt": `$X$가 $[1, 2, 3, ..., 6]$ 값들을 균일한 확률로 갖는 독립 랜덤 변수일 때, (식 15.7)과 같이 정의되는 랜덤 변수 $Y$를 고려하자.
$$
Y=\\sum_{i=1}^{M}X_i
\\qquad \\text{(식 15.7)}
$$

$M=2$일 때, 랜덤 변수 $Y$의 한 샘플을 다음과 같이 생성할 수 있다.
\`\`\`python
X[0]=math.ceil(np.random.randn()*6)
X[1]=math.ceil(np.random.randn()*6)
Y=sum(X)
\`\`\`
          `
        },
        {
          "id": "15-3A1",
          "title": "3.A1.",
          "type": "essay",    
          "prompt": `$M=2$일 때, ‘Y’가 가질 수 있는 가능한 값을 모두 쓰고, (식 15.7)에서 랜덤 변수 $Y$가 가질 수 있는 최솟값이 $M$일 때, $Y$가 가질 수 있는 최댓값을 $M$에 대한 식으로 나타내시오.`,
          "referenceAnswer": `$M=2$일 때, $Y=X_1+X_2$이고 각 $X_i$는 $1,2,3,4,5,6$ 중 하나의 값을 가지므로, $Y$가 가질 수 있는 값은 $2,3,4,5,6,7,8,9,10,11,12$이다. 일반적으로 $M$개의 확률 변수의 합 $Y=\\sum_{i=1}^{M}X_i$에서 각 $X_i$의 최솟값은 $1$, 최댓값은 $6$이다. 따라서 모든 $X_i=1$일 때 $Y_{\\min}=M$이고, 모든 $X_i=6$일 때 $Y_{\\max}=6M$이다. 따라서 $Y$가 가질 수 있는 최댓값은
$$
\\boxed{6M}
$$
이다.
`    
        },
        {
          "id": "15-3A2",
          "title": "3.A2.",
          "type": "python",   
          "prompt": `아래 py 스크립트는 $M=2$인 때에 대해 변수 ‘Y’를 ‘Nid*100’번 반복적으로 생성하여 ‘Y’가 가질 수 있는 모든 값에 대하여 분포를 그린다. ?를 채워 py 스크립트를 완성하고, 수행 결과 그래프를 보이시오.
\`\`\`python
import numpy as np
import math
import matplotlib.pyplot as plt

M=2
Nid=1XXX #XXX=학번 끝 3자리
np.random.rand(Nid) #py 스크립트 내용과 상관없으나 반드시 추가할 것
Nsim=Nid*100

Possible_Y=np.arange(M,?+1,1) #완성해야 할 부분 (1), 문제 3.A1의 답인 Y의 최댓값을 ?에 넣으시오.
count=np.zeros(len(Possible_Y))
X=np.empty(M)

for n in range(Nsim):
    for i in range(M):
        X[i]=math.ceil(np.random.rand()*6)
    Y=sum(?) #완성해야 할 부분 (2)
    for k in range(len(Possible_Y)):
        if (Y==Possible_Y[k]):
            count[k]=count[k]+1

P_Y=?/Nsim #완성해야 할 부분 (3)
plt.plot(Possible_Y,P_Y)
plt.xlabel('Y')
plt.ylabel('Pr[Y]')
\`\`\`
          `,
          "starterCode": `import numpy as np
import math
import matplotlib.pyplot as plt

M=2
Nid=1XXX #XXX=학번 끝 3자리
np.random.rand(Nid) #py 스크립트 내용과 상관없으나 반드시 추가할 것
Nsim=Nid*100

Possible_Y=np.arange(M,?+1,1) #완성해야 할 부분 (1), 문제 3.A1의 답인 Y의 최댓값을 ?에 넣으시오.
count=np.zeros(len(Possible_Y))
X=np.empty(M)

for n in range(Nsim):
    for i in range(M):
        X[i]=math.ceil(np.random.rand()*6)
    Y=sum(?) #완성해야 할 부분 (2)
    for k in range(len(Possible_Y)):
        if (Y==Possible_Y[k]):
            count[k]=count[k]+1

P_Y=?/Nsim #완성해야 할 부분 (3)
plt.plot(Possible_Y,P_Y)
plt.xlabel('Y')
plt.ylabel('Pr[Y]')`,
          "referenceAnswer": `
문제 3.A1에서 $Y$의 최댓값은 $Y_{\\max}=6M$이다. 따라서
\`\`\`python
Possible_Y=np.arange(M,6*M+1,1)
\`\`\`
로 나타낼 수 있다.

각 시행에서 $M=2$개의 랜덤 변수 $X_i$를 생성한 뒤 이들의 합을 구해야 하므로,
\`\`\`python
Y=sum(X)
\`\`\`
로 작성한다.

또한 각 가능한 $Y$ 값이 발생한 횟수는 배열 \`count\`에 저장되어 있으므로, 전체 시행 횟수 \`Nsim\`으로 나누면 각 $Y$의 실험적 확률을 얻을 수 있다. 따라서,
\`\`\`python
P_Y=count/Nsim
\`\`\`
이다.

완성된 py 스크립트는 다음과 같다.
\`\`\`python
import numpy as np
import math
import matplotlib.pyplot as plt

M=2
Nid=1XXX #XXX=학번 끝 3자리
np.random.rand(Nid) #py 스크립트 내용과 상관없으나 반드시 추가할 것
Nsim=Nid*100

Possible_Y=np.arange(M,6*M+1,1)
count=np.zeros(len(Possible_Y))
X=np.empty(M)

for n in range(Nsim):
    for i in range(M):
        X[i]=math.ceil(np.random.rand()*6)
    Y=sum(X)

    for k in range(len(Possible_Y)):
        if (Y==Possible_Y[k]):
            count[k]=count[k]+1

P_Y=count/Nsim

plt.plot(Possible_Y,P_Y)
plt.xlabel('Y')
plt.ylabel('Pr[Y]')
\`\`\`
그래프를 확인하면 $Y=7$ 부근의 확률이 가장 크고, $Y=2$와 $Y=12$로 갈수록 확률이 작아지는 삼각형 형태의 분포가 나타난다.
`
        },
        { //문제 3.B
          "id": "15-3B",
          "title": "3.B.", 
          "prompt": `문제 3.A2의 py 스크립트를 수정하여, ‘M=4, 8, 16, 50’인 경우로 확장하자.`
        },
        {
          "id": "15-3B1",
          "title": "3.B1.",
          "type": "python",    
          "prompt": `문제 3.A2의 py 스크립트를 복사하여 붙여넣은 후, ‘M=4, 8, 16, 50’일 때에 대하여 수정한 py 스크립트를 각각 수행하고, 각각의 ‘M’ 값에 대한 $Y$의 분포를 확인하시오.`,
          "referenceAnswer": `
문제 3.A2의 py 스크립트에서 $M$의 값을 각각 $4$, $8$, $16$, $50$으로 변경하여 실행한다.

예를 들어 $M=4$일 때의 py 스크립트는 다음과 같다.
\`\`\`python
import numpy as np
import math
import matplotlib.pyplot as plt

M=4
Nid=1XXX #XXX=학번 끝 3자리
np.random.rand(Nid)
Nsim=Nid*100

Possible_Y=np.arange(M,6*M+1,1)
count=np.zeros(len(Possible_Y))
X=np.empty(M)

for n in range(Nsim):
    for i in range(M):
        X[i]=math.ceil(np.random.rand()*6)

    Y=sum(X)

    for k in range(len(Possible_Y)):
        if (Y==Possible_Y[k]):
            count[k]=count[k]+1

P_Y=count/Nsim

plt.plot(Possible_Y,P_Y)
plt.xlabel('Y')
plt.ylabel('Pr[Y]')
\`\`\`
$M=8$, $16$, $50$인 경우에도 위 코드에서 $M$의 값만 각각 변경하여 실행하면 된다.

실행 결과를 비교하면 $M$이 증가함에 따라 $Y$의 분포가 점차 가운데가 높은 대칭적인 종 모양에 가까워지는 것을 확인할 수 있다.
`
        },
        {
          "id": "15-3B2",
          "title": "3.B2.",
          "type": "essay",    
          "prompt": `‘M’ 값이 증가함에 따라, $Y$의 분포가 어떤 모양으로 바뀌고 있는지 쓰시오. (분포 범위의 변화 말고, 전체적인 모양의 변화에 주목할 것)`,
          "referenceAnswer": `
$M$이 작을 때에는 $Y$의 분포가 다각형 또는 삼각형에 가까운 형태로 나타난다. 그러나, $M$이 증가할수록 분포의 가운데 부분이 점차 부드럽고 둥근 형태가 되며, 전체적으로 평균을 중심으로 대칭적인 종 모양에 가까워진다.

즉,
$$
M=4,8,16,50
$$
과 같이 $M$이 증가할수록 $Y$의 분포는 점차 가우시안 분포와 유사한 형태로 변한다. 이는 서로 독립이고 동일한 분포를 따르는 확률 변수들의 합이 충분히 많아질수록 그 합의 분포가 가우시안 분포에 가까워지는 중심극한정리의 특성과 일치한다.
`   
        },
        { //문제 3.C
          "id": "15-3C",
          "title": "3.C.", 
          "prompt": `다른 형태의 분포를 가지는 랜덤 변수 $X_i$에 대해 문제 3.B를 반복하자. 문제 3.A2의 py 스크립트에서 라인 ‘X[i]=math.ceil(np.random.rand()*6)’을 ‘X[i]=math.ceil((np.random.rand()**2)*6)’로 수정하면, $X_i$가 가질 수 있는 값의 범위는 여전히 $[1, 2, 3, ..., 6]$이다. 하지만, 수정된 $X_i$는 균등 분포를 가지지 않는다.`
        },
        {
          "id": "15-3C1",
          "title": "3.C1.", 
          "type": "python",
          "prompt": `문제 3.A2의 py 스크립트를 복사하여 붙여넣은 후, 16번째 라인 ‘X[i]=math.ceil(np.random.rand()*6)’을 ‘X[i]=math.ceil((np.random.rand()**2)*6)’로 수정하고, ‘M=1’로 설정하시오. 수정된 py 스크립트를 실행하고, 실험으로 얻은 $X_i$의 분포를 확인하시오.`,
          "referenceAnswer": `
$M=1$로 설정하고, $X_i$ 생성 부분을
\`\`\`python
X[i]=math.ceil((np.random.rand()**2)*6)
\`\`\`
로 수정한다.

완성된 py 스크립트의 예시는 다음과 같다.
\`\`\`python
import numpy as np
import math
import matplotlib.pyplot as plt

M=1
Nid=1XXX #XXX=학번 끝 3자리
np.random.rand(Nid)
Nsim=Nid*100

Possible_Y=np.arange(M,6*M+1,1)
count=np.zeros(len(Possible_Y))
X=np.empty(M)

for n in range(Nsim):
    for i in range(M):
        X[i]=math.ceil((np.random.rand()**2)*6)

    Y=sum(X)

    for k in range(len(Possible_Y)):
        if (Y==Possible_Y[k]):
            count[k]=count[k]+1

P_Y=count/Nsim

plt.plot(Possible_Y,P_Y)
plt.xlabel('X_i')
plt.ylabel('Pr[X_i]')
\`\`\`
$M=1$이므로 $Y=X_1$이며, 실행 결과를 통해 수정된 $X_i$의 분포를 직접 확인할 수 있다. 분포는 $1,2,3,\\ldots,6$에서 균일하지 않으며, 작은 값일수록 발생 확률이 큰 형태로 나타난다.
`
        },
        {
          "id": "15-3C2",
          "title": "3.C2.",
          "type": "essay",    
          "prompt": `$X_i$의 분포가 어떤 형태를 가지는지 쓰시오. (균일한 분포와는 달리, $X_i$의 분포가 $[1, 2, 3, ..., 6]$ 범위에서 어떻게 분포되어 있는지 쓸 것)`,
          "referenceAnswer": `
수정된 $X_i$는 $1,2,3,\\ldots,6$의 값을 가지지만 각 값이 발생할 확률은 동일하지 않다. 실험 결과를 보면 작은 값인 $1$, $2$가 발생할 확률이 상대적으로 높고, 값이 커질수록 발생 확률이 감소하는 형태를 보인다. 즉, 수정된 $X_i$는 $1$에서 높은 확률을 가지고 $6$ 방향으로 갈수록 확률이 감소하는 비균등한 분포를 가진다.
`          
        },
        {
          "id": "15-3C3",
          "title": "3.C3.",
          "type": "essay",    
          "prompt": `수정된 $X_i$의 생성 라인을 참고하여, 직관적으로 $X_i$가 $[1, 2, 3, ..., 6]$ 범위에서 작은 값들을 가질 확률이 더 높은 이유를 설명하시오.`,
          "referenceAnswer": `
\`np.random.rand()\`는 $0$과 $1$ 사이에서 균일하게 분포하는 난수를 생성한다. $0\\le u<1$인 값에 대해 $u^2$을 계산하면,
$$
u^2\\le u
$$
이므로 대부분의 값이 원래의 $u$보다 작은 방향으로 이동한다.

따라서
\`\`\`python
np.random.rand()**2
\`\`\`
의 결과는 $0$에 가까운 작은 값 쪽에 더 많이 분포하게 된다.

이 값에 $6$을 곱하고 \`math.ceil()\`을 적용하므로,
\`\`\`python
math.ceil((np.random.rand()**2)*6)
\`\`\`
으로 생성되는 $X_i$ 역시 $1,2$와 같은 작은 값을 가질 확률이 상대적으로 높고, $5,6$과 같은 큰 값을 가질 확률은 상대적으로 낮아진다.
`          
        },
         {
          "id": "15-3C4",
          "title": "3.C4.",
          "type": "essay",    
          "prompt": `문제 3.C1과 같이, $X_i$의 분포가 균등 분포가 아닐 때, ‘M’ 값이 증가함에 따라 $Y=\\sum_{i=1}^{M}X_i$의 분포는 어떻게 변하겠는가? $X_i$이 균등 분포일 때와 같이 ‘M’ 값이 증가함에 따라 $Y=\\sum_{i=1}^{M}X_i$의 분포가 가우시안 분포로 수렴하겠는가? 자신의 예상을 쓰시오.`,
          "referenceAnswer": `
(예시 답안)

$X_i$ 자체의 분포는 균등 분포가 아니지만, 서로 독립이고 같은 분포를 가지는 여러 $X_i$를 더하면 $M$이 증가함에 따라 $Y$의 분포는 점차 부드럽고 종 모양에 가까워질 것으로 예상할 수 있다. 즉, $Y=\\sum_{i=1}^{M}X_i$에서 $M$이 충분히 커지면 $X_i$의 원래 분포가 균등하지 않더라도 $Y$의 분포는 가우시안 분포와 유사한 형태로 수렴할 것으로 예상한다.
`        
        },
        {
          "id": "15-3C5",
          "title": "3.C5.",
          "type": "python",    
          "prompt": `문제 3.C1의 py 스크립트를 복사하여 붙여넣은 후, ‘M=4, 8, 16, 50’일 때에 대하여 수정한 py 스크립트를 각각 수행하고, 각각의 ‘M’ 값에 대한 $Y$의 분포를 확인하시오.`,
          "referenceAnswer": `
문제 3.C1의 코드에서 $M$을 각각 $4$, $8$, $16$, $50$으로 변경하여 실행한다.

예를 들어 $M=4$일 때는 다음과 같이 실행할 수 있다.
\`\`\`python
import numpy as np
import math
import matplotlib.pyplot as plt

M=4
Nid=1XXX #XXX=학번 끝 3자리
np.random.rand(Nid)
Nsim=Nid*100

Possible_Y=np.arange(M,6*M+1,1)
count=np.zeros(len(Possible_Y))
X=np.empty(M)

for n in range(Nsim):
    for i in range(M):
        X[i]=math.ceil((np.random.rand()**2)*6)

    Y=sum(X)

    for k in range(len(Possible_Y)):
        if (Y==Possible_Y[k]):
            count[k]=count[k]+1

P_Y=count/Nsim

plt.plot(Possible_Y,P_Y)
plt.xlabel('Y')
plt.ylabel('Pr[Y]')
\`\`\`
$M=8$, $16$, $50$에 대해서도 $M$의 값만 변경하여 동일한 실험을 수행한다.

실행 결과를 비교하면 $M$이 증가할수록 원래 $X_i$의 비대칭적인 분포 형태가 점차 사라지고, $Y$의 분포가 보다 부드러운 종 모양에 가까워지는 것을 확인할 수 있다.
`          
        },
        {
          "id": "15-3C6",
          "title": "3.C6.",
          "type": "essay",    
          "prompt": `‘M’ 값이 증가함에 따라, $Y$의 분포가 어떤 모양으로 바뀌고 있는지 쓰시오.`,
          "referenceAnswer": `
$M$이 작을 때에는 $Y$의 분포가 원래 $X_i$의 비균등한 분포 특성을 어느 정도 나타내며 비대칭적인 모습을 보인다. 그러나 $M$이 증가할수록 분포가 점차 부드러워지고, 평균을 중심으로 한 종 모양에 가까워진다. 특히 $M=16$, $50$과 같이 $M$이 충분히 커지면 $Y$의 분포는 원래 $X_i$의 분포와는 다른, 가우시안 분포와 유사한 형태를 나타낸다. 따라서 $X_i$가 균등 분포를 따르지 않는 경우에도 여러 독립 확률 변수의 합은 $M$이 증가할수록 가우시안 분포에 가까워지는 경향을 확인할 수 있다.
`         
        },   
        { //문제 3.D
          "id": "15-3D",
          "title": "3.D.",
          "type": "essay",    
          "prompt": `문제 3.B, 3.C를 토대로 Central Limit Theorem(CLT)을 검증하시오.`,
          "referenceAnswer": `
문제 3.B에서는 각각의 $X_i$가 $1,2,3,\\ldots,6$에서 균등하게 분포하는 경우를 실험하였다. $M$이 증가함에 따라
$$
Y=\\sum_{i=1}^{M}X_i
$$
의 분포는 점차 부드럽고 대칭적인 종 모양으로 변하였으며, 가우시안 분포와 유사한 형태에 가까워지는 것을 확인하였다.

문제 3.C에서는 $X_i$가 균등 분포가 아닌 경우를 실험하였다. 각각의 $X_i$는 작은 값이 발생할 확률이 높은 비균등한 분포를 가졌지만, $M$이 증가함에 따라 그 합 $Y$의 분포 역시 점차 가우시안 분포와 유사한 형태로 변하였다. 따라서 $X_i$의 원래 분포가 가우시안 분포가 아니더라도, 서로 독립이고 동일한 분포를 가지며 평균과 분산이 유한한 확률 변수들을 충분히 많이 더하면 그 합의 분포는 가우시안 분포에 가까워진다는 Central Limit Theorem의 특성을 실험적으로 확인할 수 있다. 즉,
$$
Y=\\sum_{i=1}^{M}X_i
$$
에서 $M$이 충분히 커질수록 $Y$의 분포는 가우시안 형태에 가까워진다.
`          
        },
        { //문제 3.E
          "id": "15-3E",
          "title": "3.E.",
          "prompt": `문제 3.B, 3.C에서는 실험으로 얻은 분포에 근거하여 CLT를 검증했다. 실험으로 분포를 얻기 위해서는 많은 수의 랜덤 변수 생성이 필요하고, 이에 따라 실험 시간이 길어지는 문제가 있다. 이 문제에서는, 많은 수의 랜덤 변수를 생성하는 방법이 아닌, 다른 방법으로 CLT를 검증하자.`               
        },
        {
          "id": "15-3E1",
          "title": "3.E1.",
          "type": "python",
          "prompt": `아래 py 스크립트를 작성하시오. 두 번째 줄의 벡터 ‘ID’의 각 원소는 자신의 학번 각각의 자릿수로 설정하시오. (학번의 길이는 몇 자리여도 상관없음) 이후 문제에서 샘플 벡터 ‘pX’를 이산 확률 변수 $X$의 PDF로 간주한다. 예를 들어, ‘pX[0]’, ‘pX[1]’, …는 각각 가 0, 1, …일 확률을 나타낸다.
\`\`\`python
import numpy as np
ID=np.array([2,0,8,4,3,8,1,2]) # 자신의 학번이 20843812인 경우의 예시
pX=ID/sum(ID); print(pX) # sum(pX)=1이 되도록 pX를 정규화함
\`\`\`
생성한 벡터 ‘pX’를 확인하시오. 생성한 벡터 ‘pX’로부터 $X$가 2일 확률 즉, $\\Pr (X=2)$는 얼마인가?
          `,
          "referenceAnswer": `
벡터 \`pX\`는
\`\`\`python
pX=ID/sum(ID)
\`\`\`
로 정규화되므로,
$$
\\sum_k pX[k]=1
$$
을 만족한다.

또한 \`pX[k]\`는 $X=k$일 확률을 의미하므로,
$$
\\Pr(X=2)=pX[2]
$$
이다.

예를 들어 학번이 20843812라면
\`\`\`python
ID=np.array([2,0,8,4,3,8,1,2])
pX=ID/sum(ID)
\`\`\`
이므로,
$$
\\Pr(X=2)
=
\\frac{8}{2+0+8+4+3+8+1+2}
=
\\frac{8}{28}
=
\\frac{2}{7}
\\approx0.2857
$$
이다.

실제 자신의 학번을 사용한 경우에는 출력된 \`pX[2]\` 값을 확인하면 된다.
`
        },
        {
          "id": "15-3E2",
          "title": "3.E2.",
          "type": "python",
          "prompt": `문제 3.E1의 py 스크립트를 복사하여 붙여넣은 후, 아래 코드를 추가하시오.
\`\`\`python
# 문제 3.E1의 py 스크립트에 아래를 추가.
import matplotlib.pyplot as plt
plt.plot(pX)
\`\`\`
자신이 만든 $X$의 확률 분포 ‘pX’의 모양을 확인하시오.
          `,
          "referenceAnswer": `
문제 3.E1에서 만든 확률분포 \`pX\`를 다음과 같이 그릴 수 있다.
\`\`\`python
import matplotlib.pyplot as plt
plt.plot(pX)
\`\`\`
그래프의 각 점은 $X=0,1,2,\\ldots$에 대한 확률값을 나타낸다.

학번의 각 자릿수 값에 따라 확률분포의 모양은 사람마다 다르게 나타난다.
`
        },        
        {
          "id": "15-3E3",
          "title": "3.E3.",
          "type": "python",
          "consoleEnabled": true,          
          "prompt": `문제 3.E2의 py 스크립트를 복사하여 붙여넣으시오.

Python numpy 함수 ‘np.convolve(a,b)’는 ‘a’와 ‘b’의 콘볼루션 결과를 반환한다. Console에서 아래를 수행하고, 콘볼루션 결과 그래프를 확인하시오.
\`\`\`python
>>> pX=np.convolve(pX,pX); plt.plot(pX)
\`\`\`
이후, Console에서 아래 코드를 5회 정도 반복하여 수행하시오. 한 번씩 수행하면서, 그때마다 그려지는 결과 그래프를 확인하시오.
\`\`\`python
>>> plt.close(); pX=np.convolve(pX,pX); plt.plot(pX) #실행 후 그래프 확인
>>> plt.close(); pX=np.convolve(pX,pX); plt.plot(pX) #실행 후 그래프 확인
>>> ... 5회 정도 반복
\`\`\`
          `,
          "referenceAnswer": `
\`np.convolve(pX,pX)\`는 두 확률분포의 convolution을 계산한다.

독립인 확률 변수 $X_1$, $X_2$의 합
$$
Y=X_1+X_2
$$
의 PDF는 각각의 PDF의 convolution으로 주어지므로,
\`\`\`python
pX=np.convolve(pX,pX)
\`\`\`
를 수행하면 두 개의 독립 확률 변수의 합에 대한 확률분포를 얻을 수 있다.

이 연산을 반복하면,
- 1회 convolution 후: 2개의 확률 변수의 합
- 2회 convolution 후: 4개의 확률 변수의 합
- 3회 convolution 후: 8개의 확률 변수의 합
- 4회 convolution 후: 16개의 확률 변수의 합
- 5회 convolution 후: 32개의 확률 변수의 합
에 해당하는 분포를 얻는다.

반복할수록 그래프의 모양은 점차 부드럽고 종 모양에 가까워지며, 전체적으로 가우시안 분포와 유사한 형태를 나타낸다. 따라서 많은 랜덤 샘플을 직접 생성하지 않고도, PDF의 반복 convolution을 통해 여러 독립 확률 변수의 합이 가우시안 형태로 가까워지는 현상을 확인할 수 있다.
`
        },
        {
          "id": "15-3E4",
          "title": "3.E4.",
          "type": "python",
          "consoleEnabled": true,          
          "prompt": `문제 3.E1에서 자신의 학번이 아닌 다른 임의의 값과 길이를 가진 양의 실수로 이루어진 벡터에 대해 ‘pX’를 설정하고, 수정한 ‘pX’를 이용하여 문제 3.E3을 수행하시오. 콘볼루션 결과 그래프를 확인하시오.`,
          "referenceAnswer": `
예를 들어 다음과 같이 임의의 양의 실수 벡터를 사용할 수 있다.
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

ID=np.array([1.2, 4.5, 2.1, 7.3, 3.0, 5.4])
pX=ID/sum(ID)

plt.plot(pX)
\`\`\`
이후 반복적으로
\`\`\`python
plt.close(); pX=np.convolve(pX,pX); plt.plot(pX)
\`\`\`
를 수행한다.

초기의 \`pX\` 모양은 선택한 벡터에 따라 달라지지만, convolution을 반복할수록 분포는 점차 부드럽고 종 모양에 가까워진다. 즉, 초기 확률분포의 구체적인 모양이 달라도 독립 확률 변수의 합을 반복적으로 형성하면 그 분포가 가우시안 형태에 가까워지는 현상을 확인할 수 있다.
`
        },
        {
          "id": "15-3E5",
          "title": "3.E5.",
          "type": "essay",          
          "prompt": `
CLT는 ‘여러 확률 변수가 더해졌을 때, 더한 값의 분포가 가우시안 분포를 따른다.’라는 이론이다. 그러므로, 문제 3.B, 3.C에서는 실제로 변수를 발생하여 더한 값(‘Y’)의 분포가 가우시안 분포를 따름을 직접 확인하여 CLT를 검증한 것임을 상기하자. 한편, 문제 3.E3, 3.E4의 결과가 가우시안 분포 형태로 수렴함을 확인할 수 있다. 이 결과 역시 CLT를 검증하는 것이다. 그런데, 밑줄 친 문장의 CLT를 직접 증명하려면, 문제 3.B, 3.C처럼 확률 변수를 더하는 과정이 필요하다.

(a) 문제 3.E3, 3.E4에서 확률 변수를 더하는 과정이 있었는가?
(b) 만약, 더하는 과정이 없다면, 어떻게 문제 3.E3, 3.E4의 결과가 CLT를 증명하는 것인지 설명하시오.
(c) 이 방법(문제 3.E3, 3.E4)과 문제 3.B, 3.C의 방법 중 어떤 것이 더 효율적인 CLT 증명(검증) 방법인가? 이유를 설명하시오.`,
          "referenceAnswer": `
(a) 문제 3.E3, 3.E4에서는 문제 3.B, 3.C처럼 여러 개의 확률 변수 샘플을 직접 생성하여 더하는 과정은 수행하지 않았다. 대신 확률 변수의 확률분포 자체를 나타내는 벡터 \`pX\`에 대하여
\`\`\`python
pX=np.convolve(pX,pX)
\`\`\`
를 반복하였다.

(b) 서로 독립인 두 확률 변수의 합의 PDF는 각각의 PDF를 convolution한 결과와 같다. 즉, 독립인 확률 변수 $X_1$, $X_2$에 대하여
$$
Y=X_1+X_2
$$
이면,
$$
f_Y(y)
=
f_{X_1}(y)*f_{X_2}(y)
$$
이다. 따라서 문제 3.E3, 3.E4에서
\`\`\`python
pX=np.convolve(pX,pX)
\`\`\`
를 수행한 것은 확률 변수의 샘플을 직접 생성하여 더하지 않았더라도, 두 독립 확률 변수의 합에 대한 확률분포를 직접 계산한 것과 같다.

또한 이 convolution을 반복하면 여러 독립 확률 변수의 합에 대한 분포를 얻을 수 있다. 예를 들어 처음의 \`pX\`를 하나의 확률 변수 $X$의 PDF라고 하면,
- 1회 convolution 후에는 2개의 독립 확률 변수의 합에 대한 PDF
- 2회 convolution 후에는 4개의 독립 확률 변수의 합에 대한 PDF
- 3회 convolution 후에는 8개의 독립 확률 변수의 합에 대한 PDF
- 4회 convolution 후에는 16개의 독립 확률 변수의 합에 대한 PDF
를 얻는다. 따라서 convolution을 반복했을 때 결과 분포가 점차 가우시안 분포 형태로 가까워지는 것을 확인하는 것은, 여러 독립 확률 변수의 합의 분포가 가우시안 분포에 가까워지는 CLT를 다른 방법으로 검증한 것이다.

(c) 문제 3.E3, 3.E4의 convolution을 이용한 방법이 문제 3.B, 3.C의 랜덤 시뮬레이션 방법보다 일반적으로 더 효율적이다.문제 3.B, 3.C에서는 $Y$의 분포를 충분히 정확하게 얻기 위해 많은 수의 랜덤 변수를 반복적으로 생성하고 더해야 하므로 많은 시행 횟수와 계산 시간이 필요하다. 반면 문제 3.E3, 3.E4에서는 이미 주어진 확률분포 \`pX\`를 직접 convolution하므로 랜덤 샘플을 대량으로 발생시키지 않고도 여러 확률 변수의 합에 대한 분포를 구할 수 있다. 또한 랜덤 시뮬레이션 결과는 시행할 때마다 조금씩 달라질 수 있지만, convolution을 이용한 방법은 주어진 확률분포에 대해 직접 계산한 결과이므로 샘플 수에 따른 통계적 오차가 발생하지 않는다. 따라서 이산 확률 변수의 PDF가 주어져 있고 convolution을 직접 계산할 수 있는 경우에는 문제 3.E3, 3.E4의 방법이 더 빠르고 정확하게 CLT의 특성을 확인할 수 있는 방법이라고 할 수 있다.
`
        },
        {
          "id": "15-3E6",
          "title": "3.E6.",
          "type": "console",          
          "prompt": `Console에서 아래와 같이 임의의 양의 실숫값을 원소로 가진 벡터를 6개 이상 생성하시오. (벡터의 길이는 같지 않아도 됨)
\`\`\`python
>>> import numpy as np
>>> import matplotlib.pyplot as plt
>>> pX1=np.array([1, 0.3, 4.3, 8, 3])
>>> pX2=np.array([2, 0, 5, 1, 8])
>>> pX3=np.array([9, 11.5, 6.7, 1.02, 8])
...
>>> pX6=np.array([0.1, 4, 3, 0, 2])
\`\`\`
생성한 벡터를 아래와 같이 재귀적으로 콘볼루션 하시오.
\`\`\`python
>>> pX=pX1
>>> pX=np.convolve(pX, pX2); plt.plot(pX)
>>> plt.close(); pX=np.convolve(pX, pX3); plt.plot(pX)
...
>>> plt.close(); pX=np.convolve(pX, pX6); plt.plot(pX)
\`\`\`
각 라인마다 콘볼루션 결과 그래프를 확인하고, 이 결과를 이용하여 CLT를 일반화하여 설명하시오.
          `,
          "referenceAnswer": `
문제 3.E6에서는 서로 다른 형태를 가지는 여러 벡터를 순차적으로 convolution하였다.

예를 들어,
\`\`\`python
pX=np.convolve(pX1,pX2)
\`\`\`
를 수행하면 두 벡터의 convolution 결과를 얻고, 이후
\`\`\`python
pX=np.convolve(pX,pX3)
pX=np.convolve(pX,pX4)
pX=np.convolve(pX,pX5)
pX=np.convolve(pX,pX6)
\`\`\`
와 같이 계속 convolution을 수행하면 여러 분포가 더해진 결과를 순차적으로 확인할 수 있다.

각 단계의 그래프를 비교하면, 처음에는 각각의 벡터가 서로 다른 형태를 가지더라도 convolution을 반복할수록 전체적인 분포의 모양이 점차 부드러워지고 종 모양에 가까워지는 것을 확인할 수 있다. 이는 문제 3.E3과 3.E4에서 동일한 형태의 분포를 반복적으로 convolution한 경우뿐만 아니라, 서로 다른 형태의 분포들을 순차적으로 convolution한 경우에도 여러 확률 변수가 더해질수록 그 합의 분포가 가우시안 분포와 유사한 형태로 변할 수 있음을 보여준다.

따라서 Central Limit Theorem은 여러 확률 변수가 더해질 때, 각각의 확률 변수들이 반드시 동일한 형태의 분포를 가지지 않더라도, 확률 변수의 수가 충분히 많아지면 그 합의 분포가 가우시안 분포에 가까워질 수 있다는 형태로 일반화하여 이해할 수 있다.
`
        },
        {
          "id": "15-3E7",
          "title": "3.E7.",
          "type": "python",
          "consoleEnabled": true,          
          "prompt": `벡터 ‘ID=np.array([10, 1, 1, 1, 1, 1, 1, 10])’로 설정하여 문제 3.E1~3.E3.을 반복하시오.`,
          "referenceAnswer": `
다음과 같이 벡터를 설정하여 문제 3.E1~3.E3을 반복한다.
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

ID=np.array([10,1,1,1,1,1,1,10])
pX=ID/sum(ID)
print(pX)

plt.plot(pX)
\`\`\`
초기의 \`pX\`는 양쪽 끝의 값이 크고 가운데 값들이 작은 형태의 분포를 가진다.

이후 Console에서 자기 자신과의 convolution을 반복한다.
\`\`\`python
pX=np.convolve(pX,pX); plt.plot(pX)
\`\`\`
그리고,
\`\`\`python
plt.close(); pX=np.convolve(pX,pX); plt.plot(pX)
\`\`\`
를 반복하여 각 단계의 그래프를 확인한다.

초기에는 양쪽 부분이 상대적으로 큰 비가우시안 형태를 보이지만, convolution을 반복할수록 분포가 점차 부드러워지고 가운데 부분이 높은 종 모양으로 변한다. 따라서 처음 확률분포의 모양이 가우시안 분포와 크게 다르더라도, 반복적인 convolution을 통해 여러 확률 변수의 합에 해당하는 분포가 점차 가우시안 분포와 유사한 형태로 변하는 것을 확인할 수 있다.
`
        },
        {
          "id": "15-3E8",
          "title": "3.E8.",
          "type": "essay",       
          "prompt": `모든 원소가 0인 벡터는 제외하고, 0 또는 양의 실숫값을 원소로 가지고, 자기 자신과 반복적으로 콘볼루션을 수행하여도 가우시안 PDF의 일반적인 모양으로 수렴하지 않는 벡터가 존재한다면, 예시를 제시해 보시오.`,
          "referenceAnswer": `
예를 들어 다음과 같은 벡터를 생각할 수 있다.
\`\`\`python
pX=np.array([1,0])
\`\`\`
이 벡터에서
$$
\\Pr(X=0)=1
$$
이고,
$$
\\Pr(X=1)=0
$$
이다.

즉, 확률 변수 $X$는 항상 $0$이라는 하나의 값만 가진다.

이 벡터를 자기 자신과 convolution하면
\`\`\`python
np.convolve(pX,pX)
\`\`\`
의 결과 역시 하나의 위치에만 확률이 집중된 형태가 된다.

따라서 이와 같은 벡터는 자기 자신과 convolution을 반복하여도 일반적인 종 모양의 가우시안 PDF로 수렴하지 않는 예가 될 수 있다.
`
        },
        {
          "id": "15-3E9",
          "title": "3.E9.",
          "type": "python",
          "consoleEnabled": true,   
          "prompt": `문제 3.E8에서 자신이 예시로 제시한 벡터에 대하여 검증하시오.`,
          "referenceAnswer": `
문제 3.E8에서 제시한 벡터
\`\`\`python
pX=np.array([1,0])
\`\`\`
에 대해 다음과 같이 반복적으로 convolution을 수행한다.
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

pX=np.array([1,0])

plt.plot(pX)
\`\`\`
이후 Console에서 다음을 반복한다.
\`\`\`python
plt.close(); pX=np.convolve(pX,pX); plt.plot(pX)
\`\`\`
첫 번째 convolution 결과는
\`\`\`python
[1,0,0]
\`\`\`
과 같은 형태가 되고, 다시 convolution하면
\`\`\`python
[1,0,0,0,0]
\`\`\`
과 같은 형태가 된다.

convolution을 계속 반복하여도 첫 번째 위치의 값만 $1$이고 나머지 값은 모두 $0$인 형태가 유지된다. 따라서 convolution 횟수를 증가시켜도 분포가 가운데가 높은 종 모양으로 변하지 않으며, 일반적인 가우시안 PDF의 형태로 수렴하지 않는 것을 확인할 수 있다.
`
        },
        {
          "id": "15-3E10",
          "title": "3.E10.",
          "type": "essay",
          "prompt": `만약, 자신이 예시로 제시한 벡터가 콘볼루션을 반복하여도 가우시안 PDF의 일반적인 모양으로 수렴하지 않았다면, 그 이유를 이론적으로 설명하시오.`,
          "referenceAnswer": `
문제 3.E8에서 제시한
\`\`\`python
pX=np.array([1,0])
\`\`\`
은 확률 변수 $X$가 항상 $0$인 경우를 의미한다.

즉,
$$
\\Pr(X=0)=1
$$
이므로 평균은
$$
E[X]=0
$$
이고 분산도
$$
\\mathrm{Var}(X)=0
$$
이다.

이와 같은 확률 변수들을 여러 개 더하더라도
$$
Y=X_1+X_2+\\cdots+X_M=0
$$
이 항상 성립한다.

따라서 $M$이 아무리 증가하여도 $Y$에는 랜덤한 변화가 발생하지 않고 하나의 값에만 확률이 집중된다. PDF의 관점에서도 두 독립 확률 변수의 합에 대한 PDF는 각각의 PDF를 convolution하여 구하지만, 하나의 값에만 확률이 집중된 PDF끼리 convolution하면 그 결과 역시 하나의 값에만 확률이 집중된다.

따라서 이 경우에는 convolution을 반복하여도 분포가 퍼지거나 종 모양으로 변하지 않으며 가우시안 PDF의 일반적인 형태로 수렴하지 않는다. 이는 해당 확률 변수의 분산이 $0$이기 때문에 여러 확률 변수의 합에서 가우시안 형태가 나타날 수 있는 랜덤성이 존재하지 않기 때문이다.
`
        },
      ]
    },
    { //문제 4
      "id": "15-4",
      "title": "4. 가우시안 랜덤 프로세스 및 자기 상관 함수",
      "problems": [
        { //문제 4.A
          "id": "15-4A",
          "title": "4.A.", 
          "prompt": `아래 py 스크립트에서 ‘xt’는 어떤 랜덤 프로세스 $x(t)$의 하나의 시행 결과(관찰 결과)에 대한 Python 샘플(0초부터 99초까지 1초의 간격) 벡터이다. 아래 py 스크립트를 반복해서 실행하면, xt가 매번 새로 생성되어 Figure에 출력된다.
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

plt.close('all')
ID=np.array([2,5,3,8,1,5,7,1]) #자신의 학번 각각의 자릿수로 설정할 것
xt=np.convolve(np.random.randn(100),ID)+4.35 #xt 생성. 생성 원리(우변)는 몰라도 무방.
plt.plot(xt)
plt.xlabel('t [sec]')
\`\`\`
          `
        },
        {
          "id": "15-4A1",
          "title": "4.A1.",
          "type": "python",
          "prompt": `벡터 ‘ID’의 각 원소를 자신의 학번 각각의 자릿수로 설정하고, py 스크립트를 여러 차례 반복 실행하시오. 실행할 때마다 달라지는 xt를 확인하시오.`,
          "starterCode": `import numpy as np
import matplotlib.pyplot as plt

plt.close('all')
ID=np.array([2,5,3,8,1,5,7,1]) #자신의 학번 각각의 자릿수로 설정할 것
xt=np.convolve(np.random.randn(100),ID)+4.35 #xt 생성. 생성 원리(우변)는 몰라도 무방.
plt.plot(xt)
plt.xlabel('t [sec]')`,
           "referenceAnswer": `
벡터 \`ID\`의 각 원소를 자신의 학번 각각의 자릿수로 설정한 후 py 스크립트를 여러 차례 반복 실행한다. 실행할 때마다 \`xt\`가 새롭게 생성되며, Figure에 나타나는 파형도 매번 다르게 나타나는 것을 확인할 수 있다. 즉, 같은 py 스크립트를 반복해서 실행하더라도 $x(t)$의 관찰 결과는 매번 동일하지 않고 서로 다른 파형으로 나타난다.
`
        },
        {
          "id": "15-4A2",
          "title": "4.A2.",
          "type": "essay",
          "prompt": `문제 4.A1에서 확인한 결과 그래프를 바탕으로, $x(t)$가 랜덤 프로세스인지 판단하고, 근거를 쓰시오.`,
          "referenceAnswer": `
$x(t)$는 랜덤 프로세스라고 판단할 수 있다. 문제 4.A1에서 동일한 조건으로 py 스크립트를 반복 실행하였음에도 불구하고, 실행할 때마다 서로 다른 \`xt\`가 생성되고 서로 다른 파형이 나타났다. 즉, 같은 시간 $t$에 대해서도 시행할 때마다 $x(t)$의 값이 달라질 수 있으며, 하나의 시행 결과가 미리 결정된 동일한 신호로 나타나지 않는다. 따라서 $x(t)$는 시행에 따라 서로 다른 결과를 가지는 랜덤 프로세스이다.
`
        },
        {
          "id": "15-4A3",
          "title": "4.A3.",
          "type": "essay",
          "prompt": `문제 4.A1에서 확인한 결과 그래프만으로 $x(t)$가 ‘가우시안’ 랜덤 프로세스라고 판단할 수 있는가? (Yes / No)
답의 근거도 쓰시오.`,
          "referenceAnswer": `
No.

문제 4.A1의 결과 그래프를 통해서는 $x(t)$가 시행할 때마다 서로 다른 값을 가지는 랜덤 프로세스라는 것은 확인할 수 있다. 하지만 몇 개의 시행 결과에 대한 시간 파형만을 관찰하는 것으로는 $x(t)$의 확률분포가 가우시안 분포인지 판단할 수 없다. 가우시안 랜덤 프로세스인지 판단하려면 특정 시각 $t=t_0$에서 여러 시행에 의해 얻어진 $x(t_0)$의 값들의 확률분포를 확인하거나, 여러 시각에서의 확률 변수들이 가우시안 특성을 가지는지를 확인해야 한다. 따라서 문제 4.A1에서 얻은 개별 파형들만으로는 $x(t)$가 가우시안 랜덤 프로세스라고 판단할 수 없다.
`
        },
        { //문제 4.B
          "id": "15-4B",
          "title": "4.B.",
          "prompt": `$t=t_0$에서 $x(t)$의 시행 결괏값들을 모아보자. 아래 py 스크립트는 $x(t)$의 시행 결과에 대한 샘플 벡터 ‘xt’를 반복적으로 생성한다. 그리고, 각 시행 결과마다 $t=t_0$일 때 $x(t)$의 값 즉, ‘xt’의 ‘t0’ 번째 샘플을 택하여 벡터 ‘xt_at_t0’에 각 원소로 저장한다. 아래 py 스크립트에서는 $t_0=23$초로 설정했다. 아래 py 스크립트를 실행하면, 최종적으로 $x(t)\\big|_{t=t_0}$ ($t=t_0$일 때 $x(t)$의 값)의 평균값과 $x(t)\\big|_{t=t_0}$의 분포를 히스토그램으로 얻을 수 있다.
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

plt.close('all')
ID=np.array([2,5,3,8,1,5,7,1]) #자신의 학번 각각의 자릿수로 설정할 것
t0=23
xt_at_t0=np.empty(50000)
for trial in range(50000): #50000=>PC 속도에 따라 조절 가능. 단, 작을수록 오차 증가
    xt=np.convolve(np.random.randn(100),ID)+4.35
    xt_at_t0[trial]=xt[t0]
    
print(np.mean(xt_at_t0))
plt.hist(xt_at_t0,100)
\`\`\`
          `,
        },
        {
          "id": "15-4B1",
          "title": "4.B1.",
          "type": "essay",
          "prompt": `(a) 위 py 스크립트에서 $x(t)\\big|_{t=t_0}$의 시행 결과에 대한 샘플에 해당하는 Python 변수는 무엇인가?

(b) ‘plt.hist(xt_at_t0,100)’를 사용하여 ‘xt_at_t0’의 그래프를 출력할 때, 출력한 그래프의 $x$축이 나타내는 것은 무엇인가?

(c) 위 py 스크립트 파일의 ‘print(np.mean(xt_at_t0))’는 랜덤 프로세스 $x(t)$의 평균값을 출력한다. 이때, 출력된 평균값은 Time Average(시간 평균)인가, Ensemble Average(앙상블 평균)인가? 답의 근거도 쓰시오.`,
            "referenceAnswer": `
(a) $x(t)\\big|_{t=t_0}$의 여러 시행 결과를 저장한 Python 변수는
\`\`\`python
xt_at_t0
\`\`\`
이다.

각 시행에서 생성된 \`xt\`에 대하여
\`\`\`python
xt_at_t0[trial]=xt[t0]
\`\`\`
를 수행하므로, \`xt_at_t0\`에는 동일한 시각 $t=t_0$에서 얻은 여러 시행의 $x(t_0)$ 값들이 저장된다.

(b) 
\`\`\`python
plt.hist(xt_at_t0,100)
\`\`\`
으로 출력한 히스토그램의 $x$축은 특정 시각 $t=t_0$에서 랜덤 프로세스가 가질 수 있는 값, 즉
$$
x(t_0)
$$
의 값을 나타낸다. 따라서 $x$축은 시간이 아니라 여러 시행에서 얻어진 $x(t_0)$의 값이다.

(c) 출력된 평균값은 Ensemble Average(앙상블 평균)이다.
\`\`\`python
np.mean(xt_at_t0)
\`\`\`
은 하나의 시행 결과를 시간에 따라 평균한 것이 아니라, 동일한 시각 $t=t_0$에서 여러 번의 서로 다른 시행으로 얻어진 값들을 평균한다.

즉,
$$
x_1(t_0),x_2(t_0),\\ldots,x_N(t_0)
$$
과 같이 동일한 시간에서 여러 시행 결과를 모아 평균한 것이므로 Ensemble Average에 해당한다.
`
        },
        {
          "id": "15-4B2",
          "title": "4.B2.",
          "type": "python",
          "prompt": `위 py 스크립트를 수행하고, ‘print(np.mean(xt_at_t0))’의 결과와 ‘plt.hist(xt_at_t0,100)’의 결과인 PDF 그래프를 확인하시오.`,
          "starterCode": `import numpy as np
import matplotlib.pyplot as plt

plt.close('all')
ID=np.array([2,5,3,8,1,5,7,1]) #자신의 학번 각각의 자릿수로 설정할 것
t0=23
xt_at_t0=np.empty(50000)
for trial in range(50000): #50000=>PC 속도에 따라 조절 가능. 단, 작을수록 오차 증가
    xt=np.convolve(np.random.randn(100),ID)+4.35
    xt_at_t0[trial]=xt[t0]
    
print(np.mean(xt_at_t0))
plt.hist(xt_at_t0,100)`,
            "referenceAnswer": `
py 스크립트를 실행하면 \`xt_at_t0\`에 $t=t_0$에서 얻어진 여러 시행 결과가 저장된다.
\`\`\`python
print(np.mean(xt_at_t0))
\`\`\`
의 결과를 확인하면 평균값이 약 $4.35$ 부근으로 나타나는 것을 확인할 수 있다. 시행 횟수가 유한하므로 실행할 때마다 정확히 동일한 값이 출력되지는 않지만, 충분히 많은 시행을 수행하면 $4.35$에 가까운 값이 나타난다.

또한
\`\`\`python
plt.hist(xt_at_t0,100)
\`\`\`
의 결과를 확인하면 $x(t_0)$의 값들이 평균 부근에 많이 분포하고, 양쪽으로 갈수록 빈도가 감소하는 종 모양의 분포를 확인할 수 있다.
`
        },
        {
          "id": "15-4B3",
          "title": "4.B3.",
          "type": "python",
          "prompt": `‘t0’ 값을 0에서 99 사이의 임의의 다른 정숫값으로 수정하여 py 스크립트를 실행하시오. 적어도 4가지의 다른 값에 대하여 실행하고, 결과를 확인하시오.`,
          "starterCode": `import numpy as np
import matplotlib.pyplot as plt

plt.close('all')
ID=np.array([2,5,3,8,1,5,7,1]) #자신의 학번 각각의 자릿수로 설정할 것
t0=23
xt_at_t0=np.empty(50000)
for trial in range(50000): #50000=>PC 속도에 따라 조절 가능. 단, 작을수록 오차 증가
    xt=np.convolve(np.random.randn(100),ID)+4.35
    xt_at_t0[trial]=xt[t0]
    
print(np.mean(xt_at_t0))
plt.hist(xt_at_t0,100)`,       
           "referenceAnswer": `
예를 들어
\`\`\`python
t0=10
\`\`\`
\`\`\`python
t0=30
\`\`\`
\`\`\`python
t0=50
\`\`\`
\`\`\`python
t0=80
\`\`\`
과 같이 $t_0$를 서로 다른 값으로 설정하여 각각 실행한다. 각 $t_0$에 대해 \`np.mean(xt_at_t0)\`의 결과와 히스토그램을 확인한다.

실행 결과, 서로 다른 $t_0$ 값에 대해서도 평균은 대체로 $4.35$ 부근으로 나타나며, \`xt_at_t0\`의 히스토그램은 전체적으로 종 모양의 분포를 나타내는 것을 확인할 수 있다. 실험 결과에는 랜덤 샘플에 의한 차이가 있으므로 각 실행에서 평균과 히스토그램이 완전히 동일하게 나타나지는 않는다.
`
        },
        {
          "id": "15-4B4",
          "title": "4.B4.",
          "type": "essay",          
          "prompt": `실행 결과를 바탕으로, 랜덤 프로세스 $x(t)$가 가우시안 랜덤 프로세스라고 판단할 수 있는지 쓰고, 근거도 쓰시오. (py 스크립트의 ‘xt’ 생성 코드로부터 판단하지 말고, py 스크립트의 실행 결과로 판단할 것)`,
          "referenceAnswer": `
실행 결과를 바탕으로 $x(t)$는 가우시안 랜덤 프로세스라고 판단할 수 있다.

문제 4.B2와 4.B3에서 특정 시각 $t=t_0$를 고정하고 여러 시행 결과의 $x(t_0)$ 값을 모아 히스토그램으로 확인하였다. $t_0$를 여러 다른 값으로 변경하여 실험한 결과, 각 시각에서 얻은 $x(t_0)$의 분포가 모두 평균을 중심으로 한 종 모양의 가우시안 분포와 유사한 형태를 나타내었다. 따라서 여러 시각에서 관찰한 랜덤 변수 $x(t_0)$가 가우시안 형태의 분포를 가지는 것을 실험적으로 확인하였으므로, $x(t)$를 가우시안 랜덤 프로세스로 판단할 수 있다.
`
        },
        { //문제 4.C
          "id": "15-4C",
          "title": "4.C.",
          "prompt": `랜덤 프로세스의 자기 상관 함수를 실험으로 구하고 관찰하자. 랜덤 프로세스 $x(t)$의 자기 상관 함수 $R_x(t_1, t_2)$는 (식 15.8)과 같이 나타낼 수 있다.
$$
R_x(t_1,t_2)
=E\\left[x(t_1)x^*(t_2)\\right]
$$
$$
=E\\left[x(t_1)x(t_2)\\right]
\\quad \\text{when } x(t) \\text{ is a real-valued random process.}
\\qquad \\text{(식 15.8)}
$$
아래 py 스크립트는 문제 4.A~4.B에서 사용한 랜덤 프로세스 $x(t)$를 이용하여, $x(t_1)$과 $x(t_2)$의 상관 값 $R_x(t_1, t_2)$를 구한다.
\`\`\`python
import numpy as np

ID=np.array([2,5,3,8,1,5,7,1]) #자신의 학번 각각의 자릿수로 만든 벡터
t1=51
t2=87
xt1_mult_xt2=np.empty(50000)
for trial in range(50000): #50000=>PC 속도에 따라 조절 가능. 단, 작을수록 오차 증가
    xt=np.convolve(np.random.randn(100),ID)+4.35
    xt1_mult_xt2[trial]=xt[t1]*xt[t2]
    
print(np.mean(xt1_mult_xt2))
\`\`\`
          `,
        },
        {
          "id": "15-4C1",
          "title": "4.C1.",
          "type": "python",
          "prompt": `모든 라인에 대해 다음의 지침에 따라 주석(Comment)을 작성하시오.

(지침 1) '='이 있는 라인
  - '=' 왼쪽 변수의 목적(용도)을 설명하시오.
  - '=' 오른쪽 수식이 왜 해당 변수의 의미에 부합하는지 설명하시오.
(지침 2) '='이 없는 라인
  - 명령어의 기능을 설명하시오.
  - 왜 해당 명령을 수행하는지 설명하시오.
  
이후, '코드 실행' 버튼을 눌러 py 스크립트를 실행하고, 결과를 확인하시오.
  `,
        "starterCode": `import numpy as np

ID=np.array([2,5,3,8,1,5,7,1]) #자신의 학번 각각의 자릿수로 만든 벡터
t1=51
t2=87
xt1_mult_xt2=np.empty(50000)
for trial in range(50000): #50000=>PC 속도에 따라 조절 가능. 단, 작을수록 오차 증가
    xt=np.convolve(np.random.randn(100),ID)+4.35
    xt1_mult_xt2[trial]=xt[t1]*xt[t2]
    
print(np.mean(xt1_mult_xt2))`,
          "referenceAnswer": `
각 라인에 대한 주석은 다음과 같이 작성할 수 있다.
\`\`\`python
import numpy as np
# NumPy 라이브러리를 np라는 이름으로 불러온다. 랜덤 변수 생성, 배열 생성, 평균 계산 등에 사용한다.

ID=np.array([2,5,3,8,1,5,7,1])
# ID는 자신의 학번 각 자릿수를 저장하는 벡터이다.
# np.array()를 이용하여 학번의 각 자릿수를 NumPy 배열로 저장한다.

t1=51
# t1은 자기 상관 값을 구하기 위한 첫 번째 시간 지점을 나타낸다.
# 여기서는 첫 번째 시간 지점을 51초로 설정한다.

t2=87
# t2는 자기 상관 값을 구하기 위한 두 번째 시간 지점을 나타낸다.
# 여기서는 두 번째 시간 지점을 87초로 설정한다.

xt1_mult_xt2=np.empty(50000)
# xt1_mult_xt2는 각 시행에서 x(t1)x(t2)의 값을 저장하기 위한 벡터이다.
# 총 50000번의 시행 결과를 저장하기 위해 길이가 50000인 배열을 생성한다.

for trial in range(50000):
    # 랜덤 프로세스 x(t)를 50000번 독립적으로 생성하여 앙상블 평균을 구하기 위해 반복한다.

    xt=np.convolve(np.random.randn(100),ID)+4.35
    # xt는 랜덤 프로세스 x(t)의 한 시행 결과를 저장하는 벡터이다.
    # 랜덤하게 생성된 신호와 ID 벡터를 convolution하고 4.35를 더하여 한 번의 xt를 생성한다.

    xt1_mult_xt2[trial]=xt[t1]*xt[t2]
    # 현재 시행에서 얻은 x(t1)과 x(t2)의 곱을 저장한다.
    # 자기 상관 함수가 E[x(t1)x(t2)]로 정의되므로 각 시행의 곱을 구하여 저장한다.

print(np.mean(xt1_mult_xt2))
# 모든 시행에서 얻은 x(t1)x(t2)의 값들을 평균하여 R_x(t1,t2)를 실험적으로 구하고 출력한다.
\`\`\`
`
        },
        {
          "id": "15-4C2",
          "title": "4.C2.",
          "type": "essay",
          "prompt": `마지막 라인의 ‘np.mean(xt1_mult_xt2)’는 Time Average인가, Ensemble Average인가? 근거를 쓰시오.`,
          "referenceAnswer": `
\`np.mean(xt1_mult_xt2)\`는 Ensemble Average(앙상블 평균)이다.

각 시행마다 새로운 랜덤 프로세스 $x(t)$의 시행 결과 \`xt\`를 생성하고, 동일한 두 시각 $t_1$, $t_2$에서
$$
x(t_1)x(t_2)
$$
의 값을 구한다.

이 과정을 여러 시행에 대하여 반복한 뒤,
$$
E[x(t_1)x(t_2)]
$$
를 실험적으로 계산하기 위해 모든 시행 결과의 평균을 구한다.

즉, 하나의 시행 결과를 시간에 따라 평균하는 것이 아니라 동일한 $t_1$, $t_2$에 대해 여러 시행 결과를 평균하므로 Ensemble Average이다.
`
        },
        {
          "id": "15-4C3",
          "title": "4.C3.",
          "type": "python",
          "prompt": `여러 ‘t1’, ‘t2’의 조합에 대해서도 문제 4.B1의 py 스크립트 파일을 수행하자.
          
$8 < t_1 < 100, 8 < t_2 < 100$이고, 두 지점의 시간 차이가 $t_2-t_1=3$을 만족하는 $(t_1, t_2)$쌍에 대하여 ‘t1’과 ‘t2’를 수정하여 py 스크립트를 수행하시오. (예를 들어, ‘t1=37’이고 ‘t2=40’, 적어도 4개 이상의 $(t_1, t_2)$쌍에 대해 실험을 수행할 것)`,
        "starterCode": `import numpy as np

ID=np.array([2,5,3,8,1,5,7,1]) #자신의 학번 각각의 자릿수로 만든 벡터
t1=51
t2=87
xt1_mult_xt2=np.empty(50000)
for trial in range(50000): #50000=>PC 속도에 따라 조절 가능. 단, 작을수록 오차 증가
    xt=np.convolve(np.random.randn(100),ID)+4.35
    xt1_mult_xt2[trial]=xt[t1]*xt[t2]
    
print(np.mean(xt1_mult_xt2))`,
          "referenceAnswer": `
$t_2-t_1=3$이 되도록 여러 $(t_1,t_2)$쌍을 설정하여 py 스크립트를 실행한다.

예를 들어,
\`\`\`python
t1=20
t2=23
\`\`\`
\`\`\`python
t1=37
t2=40
\`\`\`
\`\`\`python
t1=50
t2=53
\`\`\`
\`\`\`python
t1=70
t2=73
\`\`\`
과 같이 설정할 수 있다.

각 경우에 대하여 출력되는
$$
R_x(t_1,t_2)
=
E[x(t_1)x(t_2)]
$$
의 값을 확인한다.

랜덤 실험에 의한 약간의 오차는 존재하지만, $t_2-t_1=3$으로 동일하게 유지한 경우 서로 다른 $(t_1,t_2)$쌍에서도 $R_x(t_1,t_2)$가 서로 비슷한 값으로 나타나는 것을 확인할 수 있다.
`
        },
        {
          "id": "15-4C4",
          "title": "4.C4.",
          "type": "essay",
          "prompt": `문제 4.C3의 $R_x(t_1, t_2)$의 실험 결과를 정리하시오.`,
          "referenceAnswer": `
문제 4.C3에서 $t_2-t_1=3$을 유지하면서 여러 $(t_1,t_2)$쌍에 대해 실험하였다.

실험 결과, $t_1$과 $t_2$의 값 자체가 달라져도 두 시각의 차이가
$$
t_2-t_1=3
$$
으로 동일하면 $R_x(t_1,t_2)$의 값은 대체로 서로 비슷하게 나타났다. 각 실험 결과 사이에는 유한한 시행 횟수에 따른 작은 오차가 존재할 수 있다.

참고로 현재 예시 ID=[2,5,3,8,1,5,7,1]을 그대로 사용한다면 이론적으로는 약 111.92 부근이다. 학생 자신의 학번을 사용하면 값은 달라진다.
`
        },
        {
          "id": "15-4C5",
          "title": "4.C5.",
          "type": "python",
          "prompt": `두 지점의 시간 차이가 $t_2-t_1=5$를 만족하는 $(t_1, t_2)$쌍에 대하여 ‘t1’과 ‘t2’를 수정하여 py 스크립트를 수행하시오. (예를 들어, ‘t1=37’이고 ‘t2=42’, 적어도 4개 이상의 $(t_1, t_2)$쌍에 대해 실험을 수행할 것)`,
        "starterCode": `import numpy as np

ID=np.array([2,5,3,8,1,5,7,1]) #자신의 학번 각각의 자릿수로 만든 벡터
t1=51
t2=87
xt1_mult_xt2=np.empty(50000)
for trial in range(50000): #50000=>PC 속도에 따라 조절 가능. 단, 작을수록 오차 증가
    xt=np.convolve(np.random.randn(100),ID)+4.35
    xt1_mult_xt2[trial]=xt[t1]*xt[t2]
    
print(np.mean(xt1_mult_xt2))`,
          "referenceAnswer": `
$t_2-t_1=5$가 되도록 여러 $(t_1,t_2)$쌍을 설정하여 py 스크립트를 실행한다.

예를 들어,
\`\`\`python
t1=20
t2=25
\`\`\`
\`\`\`python
t1=37
t2=42
\`\`\`
\`\`\`python
t1=50
t2=55
\`\`\`
\`\`\`python
t1=70
t2=75
\`\`\`
과 같이 설정할 수 있다.

각 경우의 $R_x(t_1,t_2)$를 비교하면, 랜덤 실험에 의한 작은 차이는 있지만 $t_2-t_1=5$가 동일한 경우 서로 비슷한 값을 나타내는 것을 확인할 수 있다.
`
        },
        {
          "id": "15-4C6",
          "title": "4.C6.",
          "type": "essay",
          "prompt": `문제 4.C5의 $R_x(t_1, t_2)$의 실험 결과를 정리하시오.`,
          "referenceAnswer": `
문제 4.C5에서 $t_2-t_1=5$를 유지하면서 여러 $(t_1,t_2)$쌍에 대해 실험하였다.

실험 결과, $t_1$과 $t_2$의 절대적인 값이 달라져도
$$
t_2-t_1=5
$$
로 시간 차이가 동일한 경우 $R_x(t_1,t_2)$의 값은 대체로 서로 비슷하게 나타났다. 실험마다 발생하는 작은 차이는 유한한 횟수의 랜덤 실험에 따른 오차로 볼 수 있다.

현재 예시 ID라면 \(t_2-t_1=5\)일 때는 약 66.92 부근이 나온다.
`
        },        
        {
          "id": "15-4C7",
          "title": "4.C7.",
          "type": "essay",
          "prompt": `문제 4.C3~4.C6의 결과로부터, 랜덤 프로세스 $x(t)$의 상관 함수 $R_x(t_1, t_2)$가 가지고 있는 주요한 특성이 무엇인지 쓰시오. (실험 결과가 본인의 예상과 일치하지 않으면, 현재 ‘50000’으로 설정된 실험 수를 더 큰 값으로 설정하여 실험으로 인한 오차를 줄일 것)`,
           "referenceAnswer": `
문제 4.C3~4.C6의 결과를 비교하면, $R_x(t_1,t_2)$는 $t_1$과 $t_2$의 절대적인 위치보다 두 시간 사이의 차이에 따라 결정되는 특성을 확인할 수 있다.

예를 들어,
$$
t_2-t_1=3
$$
을 만족하는 여러 $(t_1,t_2)$쌍에 대해서는 $R_x(t_1,t_2)$가 서로 비슷한 값을 나타냈다.

또한,
$$
t_2-t_1=5
$$
를 만족하는 여러 $(t_1,t_2)$쌍에서도 서로 비슷한 자기 상관 값을 나타냈다.

반면 시간 차이가 $3$인 경우와 $5$인 경우의 자기 상관 값은 서로 다르게 나타났다. 따라서 이 랜덤 프로세스의 자기 상관 함수는 $t_1$과 $t_2$ 각각의 절대적인 시간보다 두 시각의 시간 차이
$$
\\tau=t_2-t_1
$$
에 주로 의존하는 특성을 가진다.

즉,
$$
R_x(t_1,t_2)=R_x(t_2-t_1)=R_x(\\tau)
$$
와 같은 형태로 나타낼 수 있음을 실험적으로 확인할 수 있다.
`
        },
        { //문제 4.D
          "id": "15-4D",
          "title": "4.D.",
          "prompt": `아래 py 스크립트는 ‘tau’만큼 떨어진 두 지점 ‘t1’, ‘t2’의 자기 상관 값을 구한다. ‘tau’를 바꾸어 가면서 자기 상관 값을 구하여, ‘tau’에 대한 함수로 자기 상관 함수의 그래프를 그린다. 아래 py 스크립트 파일에서 ‘t1=51’로 고정되어 있고, ‘t2=t1+tau’로 설정하여 각 ‘tau(=t2-t1)’ 값에 따라 자기 상관 값을 계산한다. 
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

ID=np.array([2,2,2,1,2,1,5,8]) #자신의 학번 각각의 자릿수로 만든 벡터
t1=51

R_vector=np.empty(0)
tau_vector=np.empty(0)
for tau in range(-t1+1,-t1+101,1):
    t2=t1+tau
    xt1_mult_xt2=np.empty(10000)
    for trial in range(10000): #PC 속도에 따라 조절 가능. 단, 작을수록 오차 증가
        xt=np.convolve(np.random.randn(100),ID)+4.35
        xt1_mult_xt2[trial]=xt[t1]*xt[t2]
        
    tau_vector=np.append(tau_vector,tau)
    R_at_tau=np.mean(xt1_mult_xt2)
    R_vector=np.append(R_vector,R_at_tau)

plt.plot(tau_vector,R_vector)
plt.axis([-50, 50, min(R_vector), max(R_vector)])
plt.xlabel('tau')
plt.grid()
\`\`\`
          `,
        },
        {
          "id": "15-4D1",
          "title": "4.D1.",
          "type": "python",
          "prompt": `라인 7~8, 10, 16~18, 20에 대해 다음의 지침에 따라 주석(Comment)을 작성하시오.

(지침 1) '='이 있는 라인
  - '=' 왼쪽 변수의 목적(용도)을 설명하시오.
  - '=' 오른쪽 수식이 왜 해당 변수의 의미에 부합하는지 설명하시오.
(지침 2) '='이 없는 라인
  - 명령어의 기능을 설명하시오.
  - 왜 해당 명령을 수행하는지 설명하시오.
  
이후, '코드 실행' 버튼을 눌러 py 스크립트를 실행하고, 결과 그래프를 확인하시오.
  `,
        "starterCode": `import numpy as np
import matplotlib.pyplot as plt

ID=np.array([2,2,2,1,2,1,5,8]) #자신의 학번 각각의 자릿수로 만든 벡터
t1=51

R_vector=np.empty(0)
tau_vector=np.empty(0)
for tau in range(-t1+1,-t1+101,1):
    t2=t1+tau
    xt1_mult_xt2=np.empty(10000)
    for trial in range(10000): #PC 속도에 따라 조절 가능. 단, 작을수록 오차 증가
        xt=np.convolve(np.random.randn(100),ID)+4.35
        xt1_mult_xt2[trial]=xt[t1]*xt[t2]
        
    tau_vector=np.append(tau_vector,tau)
    R_at_tau=np.mean(xt1_mult_xt2)
    R_vector=np.append(R_vector,R_at_tau)

plt.plot(tau_vector,R_vector)
plt.axis([-50, 50, min(R_vector), max(R_vector)])
plt.xlabel('tau')
plt.grid()`,
          "referenceAnswer": `
각 라인에 대한 주석은 다음과 같이 작성할 수 있다.
\`\`\`python
R_vector=np.empty(0)
# R_vector는 각 tau 값에 대해 계산된 자기 상관 값 R_x(t1,t2)를 저장하기 위한 벡터이다.
# 아직 계산된 자기 상관 값이 없으므로 길이가 0인 빈 배열로 초기화한다.

tau_vector=np.empty(0)
# tau_vector는 각 자기 상관 값에 대응하는 시간 차이 tau 값을 저장하기 위한 벡터이다.
# 아직 저장된 tau 값이 없으므로 길이가 0인 빈 배열로 초기화한다.

t2=t1+tau
# t2는 t1으로부터 tau만큼 떨어진 두 번째 시간 지점을 나타낸다.
# tau=t2-t1이므로 이를 정리한 t2=t1+tau를 이용하여 t2를 계산한다.

tau_vector=np.append(tau_vector,tau)
# 현재 사용한 tau 값을 tau_vector의 마지막 원소로 추가한다.
# 이후 자기 상관 함수를 tau에 대한 그래프로 나타내기 위해 각 tau 값을 순서대로 저장한다.

R_at_tau=np.mean(xt1_mult_xt2)
# R_at_tau는 현재 tau에 대한 자기 상관 값을 저장한다.
# 자기 상관 함수 R_x(t1,t2)=E[x(t1)x(t2)]이므로, 여러 시행에서 구한 x(t1)x(t2)의 평균을 계산한다.

R_vector=np.append(R_vector,R_at_tau)
# 현재 tau에서 계산한 자기 상관 값 R_at_tau를 R_vector의 마지막 원소로 추가한다.
# 각 tau에 대응하는 자기 상관 값을 순서대로 저장하여 최종 자기 상관 함수 그래프에 사용한다.

plt.plot(tau_vector,R_vector)
# tau_vector를 x축, R_vector를 y축으로 하여 자기 상관 함수의 그래프를 그린다.
# 이를 통해 자기 상관 값이 시간 차이 tau에 따라 어떻게 변하는지 확인한다.
\`\`\`
`
        },
        {
          "id": "15-4D2",
          "title": "4.D2.",
          "type": "essay",
          "prompt": `(a) (식 15.8)의 상관 식에 $\\tau=0$($t_1=t_2$와 같은 의미)을 대입하여 정리하면, 그 값은 신호의 무엇을 의미하는지 쓰시오.

(b) 문제 4.D1의 그래프로부터 신호 ‘xt’의 전력을 알아내시오.`,
          "referenceAnswer": `
(a) $\\tau=0$이면 $t_1=t_2$이므로, 자기 상관 함수는
$$
R_x(t_1,t_1)
=
E\\left[x(t_1)x(t_1)\\right]
$$
가 된다.

따라서,
$$
R_x(t_1,t_1)
=
E\\left[x^2(t_1)\\right]
$$
이다.

이는 랜덤 프로세스 $x(t)$의 평균 제곱값으로, 신호의 평균 전력을 의미한다. 따라서 자기 상관 함수에서 $\\tau=0$일 때의 값은 신호의 전력이다.

(b) 문제 4.D1에서 얻은 자기 상관 함수 그래프에서
$$
\\tau=0
$$
일 때의 $R_x$ 값을 확인하면 신호 \`xt\`의 전력을 구할 수 있다.

즉,
$$
P_x=R_x(0)
$$
이다.

주어진 예시
\`\`\`python
ID=np.array([2,2,2,1,2,1,5,8])
\`\`\`
를 사용한 경우, 문제 4.D1의 실험 결과에서 $\\tau=0$일 때 자기 상관 값은 약
$$
R_x(0)\\approx125.9
$$
부근으로 나타난다.

따라서 신호 \`xt\`의 전력은 약
$$
\\boxed{P_x\\approx125.9}
$$
이다.

단, 랜덤 실험으로 계산한 값이므로 시행할 때마다 약간의 오차가 발생할 수 있으며, 자신의 학번으로 \`ID\`를 설정한 경우에는 실제 그래프에서 $\\tau=0$일 때의 값을 전력으로 사용한다.
`
        },
        {
          "id": "15-4D3",
          "title": "4.D3.",
          "type": "python",
          "prompt": `‘t1’ 값을 40에서 60 사이의 임의의 다른 값들로 바꿔가면서 문제 4.D1의 py 스크립트를 여러 번 반복하여 수행하고, 결과 그래프를 확인하시오. 적어도 4개 이상의 ‘t1’ 값에 대해 실험을 수행하고, $R_x(t_1, t_1+\\tau_0)$의 결과 그래프를 확인하시오.
  `,
        "starterCode": `import numpy as np
import matplotlib.pyplot as plt

ID=np.array([2,2,2,1,2,1,5,8]) #자신의 학번 각각의 자릿수로 만든 벡터
t1=51

R_vector=np.empty(0)
tau_vector=np.empty(0)
for tau in range(-t1+1,-t1+101,1):
    t2=t1+tau
    xt1_mult_xt2=np.empty(10000)
    for trial in range(10000): #PC 속도에 따라 조절 가능. 단, 작을수록 오차 증가
        xt=np.convolve(np.random.randn(100),ID)+4.35
        xt1_mult_xt2[trial]=xt[t1]*xt[t2]
        
    tau_vector=np.append(tau_vector,tau)
    R_at_tau=np.mean(xt1_mult_xt2)
    R_vector=np.append(R_vector,R_at_tau)

plt.plot(tau_vector,R_vector)
plt.axis([-50, 50, min(R_vector), max(R_vector)])
plt.xlabel('tau')
plt.grid()`,
          "referenceAnswer": `
예를 들어 다음과 같이 서로 다른 $t_1$ 값을 설정하여 문제 4.D1의 py 스크립트를 반복 실행한다.
\`\`\`python
t1=42
\`\`\`
\`\`\`python
t1=48
\`\`\`
\`\`\`python
t1=54
\`\`\`
\`\`\`python
t1=60
\`\`\`
각 $t_1$ 값에 대해
$$
R_x(t_1,t_1+\\tau)
$$
의 그래프를 확인한다.

실행 결과, $t_1$의 값을 변경하더라도 자기 상관 함수의 전체적인 그래프 모양은 거의 동일하게 나타난다. 랜덤 실험에 의해 각 그래프 사이에 작은 차이는 발생할 수 있지만, 충분한 시행 횟수를 사용하면 서로 비슷한 형태의 자기 상관 함수가 나타나는 것을 확인할 수 있다.
`
        },
        {
          "id": "15-4D4",
          "title": "4.D4.",
          "type": "essay",
          "prompt": `문제 4.D3의 $R_x(t_1, t_1+\\tau_0)$의 그래프로부터, $R_x(t_1, t_1+\\tau_0)$는 $t_1$에 대한 함수인지, 또는 $\\tau_0$에 대한 함수인지, 아니면, $t_1, \\tau_0$ 두 변수 모두에 대한 함수인지 판단하시오. 자신의 판단에 대한 근거도 쓰시오.`,
          "referenceAnswer": `
문제 4.D3의 실험 결과를 보면 $t_1$의 값을 여러 값으로 변경하여도
$$
R_x(t_1,t_1+\\tau_0)
$$
의 그래프는 거의 동일한 형태로 나타난다. 즉, $t_1$의 절대적인 값이 달라져도 동일한 $\\tau_0$에 대해서는 자기 상관 값이 거의 동일하다.

따라서 이 랜덤 프로세스의 자기 상관 함수는 $t_1$에 대한 함수라기보다 두 시간 사이의 차이인 $\\tau_0$에 대한 함수라고 판단할 수 있다. 즉,
$$
R_x(t_1,t_1+\\tau_0)=R_x(\\tau_0)
$$
와 같이 나타낼 수 있다.

실험에서 그래프 사이에 약간의 차이가 발생할 수 있지만, 이는 유한한 횟수의 랜덤 시행에 의해 발생하는 오차이며 시행 횟수를 증가시키면 그 차이는 감소한다. 따라서 $R_x(t_1,t_1+\\tau_0)$는 $t_1$에는 거의 의존하지 않고 $\\tau_0$에 의해 결정되는 함수라고 판단할 수 있다.
`
        },
        {
          "id": "15-4D5",
          "title": "4.D5.",
          "type": "essay",  
          "prompt": `어떤 랜덤 프로세스가 WSS(Wide Sense Stationary)하기 위한 조건을 쓰시오.`,
          "referenceAnswer": `
랜덤 프로세스 $x(t)$가 WSS(Wide Sense Stationary)이기 위해서는 다음 조건을 만족해야 한다.

첫째, 랜덤 프로세스의 평균이 시간 $t$에 관계없이 일정해야 한다.
$$
E[x(t)]=m_x
$$
즉, $t$가 변하더라도 평균값이 변하지 않아야 한다.

둘째, 자기 상관 함수가 $t_1$, $t_2$ 각각의 절대적인 시간에 의존하지 않고 두 시간의 차이에만 의존해야 한다.
$$
R_x(t_1,t_2)
=
R_x(t_2-t_1)
$$
또는 시간 차이를
$$
\\tau=t_2-t_1
$$
이라고 하면,
$$
R_x(t_1,t_2)=R_x(\\tau)
$$
로 나타낼 수 있어야 한다.

따라서 평균이 시간에 따라 변하지 않고, 자기 상관 함수가 두 시간 사이의 차이 $\\tau$에만 의존하면 $x(t)$는 WSS 랜덤 프로세스이다.
`           
        },
        {
          "id": "15-4D6",
          "title": "4.D6.",
          "type": "essay",  
          "prompt": `문제 4.B4와 문제 4.D4의 결과로부터, 랜덤 프로세스 $x(t)$가 WSS인지 판단하시오. 판단의 근거를 명확히 설명하시오.`,   
          "referenceAnswer": `
랜덤 프로세스 $x(t)$는 WSS라고 판단할 수 있다.

먼저 문제 4.B의 실험에서 여러 서로 다른 시간 $t_0$에 대하여 $x(t_0)$의 평균값을 확인한 결과, 시간 $t_0$가 달라져도 평균값은 거의 일정하게 나타났다.

즉,
$$
E[x(t)]\\approx4.35
$$
로 시간에 관계없이 일정한 평균을 가지는 것을 확인하였다.

또한 문제 4.D4에서는 $t_1$을 여러 값으로 변경하여도 자기 상관 함수의 그래프가 거의 동일하게 나타났으며,
$$
R_x(t_1,t_1+\\tau)
$$
가 $t_1$의 절대적인 값에는 의존하지 않고 시간 차이 $\\tau$에 따라 결정되는 것을 확인하였다. 즉,
$$
R_x(t_1,t_2)=R_x(t_2-t_1)=R_x(\\tau)
$$
의 특성을 가진다.

따라서 $x(t)$는
1. 평균이 시간에 따라 변하지 않고,
2. 자기 상관 함수가 두 시간의 차이 $\\tau$에만 의존하므로,
WSS(Wide Sense Stationary) 랜덤 프로세스라고 판단할 수 있다.
`       
        },
        {
          "id": "15-4D7",
          "title": "4.D7.",
          "type": "essay",
          "prompt": `$x(t)$에서 $t=77$인 지점의 값과 $t=82$인 지점의 값, 두 값의 상관을 구하시오. py 스크립트를 수정하여 수행하지 말고, 이전에 수행한 실험들의 결과에 근거하여 구하시오.`,
          "referenceAnswer": `
$x(t)$는 앞의 실험에서 WSS 랜덤 프로세스임을 확인하였다. 따라서 자기 상관 함수는 두 시간의 절대적인 위치가 아니라 두 시간 사이의 차이에만 의존한다.

$t_1=77$, $t_2=82$이므로 두 시간의 차이는
$$
\\tau=t_2-t_1
=82-77
=5
$$
이다.

따라서 구하고자 하는 상관 값은
$$
R_x(77,82)
=
R_x(82-77)
=
R_x(5)
$$
이다.

문제 4.C5 또는 문제 4.D1에서 이미 $\\tau=5$일 때의 자기 상관 값을 실험으로 구하였으므로, 그때 얻은 $R_x(5)$의 값이 곧 $x(77)$과 $x(82)$의 상관 값이다.
즉,
$$
\\boxed{R_x(77,82)=R_x(5)}
$$
이며, 실제 수치는 앞에서 자신의 학번을 이용하여 얻은 $\\tau=5$에서의 자기 상관 값을 사용한다.
`
        },
        {
          "id": "15-4D8",
          "title": "4.D8.",
          "type": "essay",   
          "prompt": `문제 4.D1의 py 스크립트에서 벡터 ‘ID’의 길이를 $L$이라 하자. 문제 4.D3의 자기 상관 그래프의 ‘tau’$<-L$ 또는 $L<$‘tau’인 구간에서, y축 값이 급격히 0에 가까워짐을 알 수 있다. 이는 $x(t)$에서 $L$초 이상 떨어진 두 시점의 값은 서로 상관관계가 없음을 뜻한다. 이러한 현상이 발생한 원인을 py 스크립트의  라인‘xt=np.convolve(np .random.randn(100),ID)+4.35’을 다음 물음을 통해 분석하여 설명하시오.

(a) ID=[a, b]이고, RandomSignal=[r1, r2, r3, r4, r5, r6, …]이고, 원소 r1, r2, r3, r4, r5, r6, …은 서로 상관이 없다. ID와 RandomSignal의 콘볼루션을 직접 수행하고, 콘볼루션 결과의 앞 6개의 샘플 값을 수식으로 표현하시오. (ID(a 이전의 값은 0이라 가정)를 y축 반전시키고, 우측으로 밀고 가면서 겹치는 부분의 원소를 곱하고 덧셈하면 됨. 첫 번째 샘플=a*r1, 두 번째 샘플=b*r1+a*r2임. 이후 샘플들의 식을 구하여 쓸 것)

(b) (a)에서 구한 출력 샘플 식에서 ? 샘플 이상 떨어진 출력의 샘플 식에 들어있는 랜덤 변수들을 비교하고, 왜 ? 샘플 이상 떨어져 있으면 상관이 없게 되는지 설명하시오.

(c) (b)의 설명을 ID의 길이가 2보다 큰 $L$인 경우로 확장하시오.

(d) (c)의 확장 결과를 이용하여, 각 원소가 서로 상관없는 랜덤 신호라도, 길이가 $L$인 임의의 신호와 콘볼루션 하면, 콘볼루션 후 원소 간 상관관계가 어떻게 바뀌는지 정리하시오.`,
          "referenceAnswer": `
(a) 
\`\`\`text
ID=[a,b]
RandomSignal=[r1,r2,r3,r4,r5,r6,...]
\`\`\`
일 때 두 벡터를 convolution하면 출력의 앞 6개 샘플은 다음과 같다.
$$
y_1=ar_1
$$
$$
y_2=br_1+ar_2
$$
$$
y_3=br_2+ar_3
$$
$$
y_4=br_3+ar_4
$$
$$
y_5=br_4+ar_5
$$
$$
y_6=br_5+ar_6
$$
즉, convolution 결과에서 처음을 제외한 각 출력 샘플은 서로 인접한 두 랜덤 변수의 선형결합으로 만들어진다.

(b)
ID의 길이가 2이므로 출력 샘플 사이의 간격이 2 이상이면 두 출력 샘플에 공통으로 포함되는 랜덤 변수가 없다. 예를 들어,
$$
y_2=br_1+ar_2
$$
이고,
$$
y_4=br_3+ar_4
$$
이므로 $y_2$와 $y_4$에는 공통으로 포함되는 랜덤 변수가 없다.

마찬가지로
$$
y_3=br_2+ar_3
$$
와
$$
y_5=br_4+ar_5
$$
에도 서로 같은 랜덤 변수가 포함되어 있지 않다.

$r_1,r_2,r_3,\\ldots$이 서로 상관이 없는 랜덤 변수이므로, 서로 다른 랜덤 변수들만으로 구성된 두 출력 역시 서로 상관이 없게 된다.

따라서 ID의 길이가 2인 경우에는
$$
\\boxed{2}
$$
샘플 이상 떨어진 출력 샘플들 사이에는 상관관계가 없게 된다.

(c)
ID의 길이가 $L$이라고 하자. 길이가 $L$인 ID와 RandomSignal을 convolution하면 하나의 출력 샘플은 연속된 $L$개의 랜덤 변수에 의해 결정된다.

예를 들어 일반적인 출력 샘플은
$$
y_n
=
h_0r_n+h_1r_{n-1}+\\cdots+h_{L-1}r_{n-L+1}
$$
과 같은 형태로 나타낼 수 있다. 따라서 서로 가까운 두 출력 샘플은 일부 동일한 랜덤 변수들을 공유하므로 서로 상관을 가질 수 있다.

그러나 두 출력 샘플 사이의 간격이 $L$ 이상이 되면 두 식에서 공통으로 포함되는 랜덤 변수가 존재하지 않는다. 입력 랜덤 변수들이 서로 상관이 없으므로, 공통으로 포함되는 랜덤 변수가 없는 출력 샘플들도 서로 상관이 없게 된다.

따라서 ID의 길이가 $L$이면
$$
|\\tau|\\ge L
$$
인 경우 출력 샘플들 사이의 상관관계가 없어지는 특성이 나타난다.

(d)
각 원소가 서로 상관없는 랜덤 신호를 길이가 $L$인 임의의 신호와 convolution하면, convolution 결과의 각 출력 샘플은 서로 연속된 $L$개의 입력 랜덤 샘플들의 조합으로 생성된다. 따라서 convolution 전에는 각 랜덤 샘플들이 서로 상관이 없더라도, convolution 후에는 가까운 출력 샘플들이 동일한 입력 랜덤 변수를 일부 공유하게 되므로 서로 상관관계를 가질 수 있다.

그러나 출력 샘플 사이의 간격이 $L$ 이상이 되면 두 출력 샘플을 만드는 데 사용되는 입력 랜덤 변수들이 서로 겹치지 않는다. 따라서 길이가 $L$인 신호와 convolution한 이후에는
$$
|\\tau|<L
$$
인 범위에서는 출력 샘플들 사이에 상관관계가 발생할 수 있지만,
$$
|\\tau|\\ge L
$$
인 범위에서는 서로 상관이 없는 형태가 된다. 즉, 서로 상관이 없던 랜덤 신호도 길이가 $L$인 신호와 convolution하면 가까운 출력 샘플 사이에는 상관관계가 생기며, 그 상관관계가 나타나는 범위는 convolution하는 신호의 길이 $L$에 의해 결정된다.
`
        },
        { //문제 4.E
  "id": "15-4E",
  "title": "4.E.",
  "prompt": `$a(t)$는 WSS인 랜덤 프로세스라고 가정하자. 다음 두 랜덤 프로세스를 고려한다.
$$
x(t)=a(t)\\cos(\\omega_c t)
\\qquad \\text{(식 15.9)}
$$
$$
x(t)=a(t)\\cos(\\omega_c t+\\theta),
\\qquad
\\theta\\sim U[0,2\\pi]
\\qquad \\text{(식 15.10)}
$$
각 경우에 대하여 평균과 자기 상관 함수를 이용하여 $x(t)$가 WSS인지 판단하자.`
},
{
  "id": "15-4E1",
  "title": "4.E1.",
  "type": "essay",
  "prompt": `(식 15.9)의 $x(t)=a(t)\\cos(\\omega_c t)$에 대하여 평균 $E[x(t)]$를 구하고, 평균이 시간 $t$에 따라 변하는지 판단하시오.`,
  "referenceAnswer": `
$a(t)$의 평균을

$$
E[a(t)]=m_a
$$

라고 하면,

$$
E[x(t)]
=
E[a(t)\\cos(\\omega_c t)]
$$

이다.

$\\cos(\\omega_c t)$는 랜덤 변수가 아니라 결정된 함수이므로 기대값 밖으로 꺼낼 수 있다.

따라서

$$
E[x(t)]
=
E[a(t)]\\cos(\\omega_c t)
=
m_a\\cos(\\omega_c t)
$$

이다.

일반적으로 이 값은 시간 $t$에 따라 변한다.

따라서 $m_a\\neq0$인 일반적인 경우에는 평균이 일정하지 않으므로 $x(t)$는 WSS의 평균 조건을 만족하지 않는다.
`
},
{
  "id": "15-4E2",
  "title": "4.E2.",
  "type": "essay",
  "prompt": `(식 15.9)의 $x(t)=a(t)\\cos(\\omega_c t)$에 대하여 자기 상관 함수 $R_x(t_1,t_2)$를 구하고, 자기 상관 함수가 시간 차이 $t_2-t_1$에만 의존하는지 판단하시오.`,
  "referenceAnswer": `
자기 상관 함수는

$$
R_x(t_1,t_2)
=
E[x(t_1)x(t_2)]
$$

이다.

따라서

$$
R_x(t_1,t_2)
=
E[a(t_1)a(t_2)]
\\cos(\\omega_c t_1)
\\cos(\\omega_c t_2)
$$

이다.

$a(t)$가 WSS이므로

$$
E[a(t_1)a(t_2)]
=
R_a(t_2-t_1)
$$

이다.

따라서

$$
R_x(t_1,t_2)
=
R_a(t_2-t_1)
\\cos(\\omega_c t_1)
\\cos(\\omega_c t_2)
$$

이다.

여기에는 $t_1$과 $t_2$가 각각 포함되어 있으므로 일반적으로 시간 차이 $t_2-t_1$에만 의존하지 않는다.

따라서 (식 15.9)의 $x(t)$는 일반적으로 WSS가 아니다.
`
},
{
  "id": "15-4E3",
  "title": "4.E3.",
  "type": "essay",
  "prompt": `(식 15.10)의 $x(t)=a(t)\\cos(\\omega_c t+\\theta)$에 대하여 $\\theta$가 $[0,2\\pi]$에서 균일하게 분포할 때, 평균 $E[x(t)]$를 구하시오.`,
  "referenceAnswer": `
$$
E[x(t)]
=
E[a(t)\\cos(\\omega_c t+\\theta)]
$$

이다.

$\\theta$가 $[0,2\\pi]$에서 균일하게 분포하므로

$$
E[\\cos(\\omega_c t+\\theta)]
=
0
$$

이다.

따라서

$$
E[x(t)]=0
$$

이다.

즉, 평균은 시간 $t$에 관계없이 일정하다.
`
},
{
  "id": "15-4E4",
  "title": "4.E4.",
  "type": "essay",
  "prompt": `(식 15.10)의 자기 상관 함수 $R_x(t_1,t_2)$를 구하고, 그 결과를 이용하여 $x(t)$가 WSS인지 판단하시오.`,
  "referenceAnswer": `
자기 상관 함수는

$$
R_x(t_1,t_2)
=
E[a(t_1)a(t_2)
\\cos(\\omega_c t_1+\\theta)
\\cos(\\omega_c t_2+\\theta)]
$$

이다.

삼각함수 공식

$$
\\cos A\\cos B
=
\\frac{1}{2}
\\left[
\\cos(A-B)+\\cos(A+B)
\\right]
$$

를 이용하면,

$$
R_x(t_1,t_2)
=
\\frac{1}{2}R_a(t_2-t_1)
E[
\\cos(\\omega_c(t_1-t_2))
+
\\cos(\\omega_c(t_1+t_2)+2\\theta)
]
$$

가 된다.

$\\theta$가 $[0,2\\pi]$에서 균일하게 분포하므로

$$
E[
\\cos(\\omega_c(t_1+t_2)+2\\theta)
]
=
0
$$

이다.

따라서

$$
R_x(t_1,t_2)
=
\\frac{1}{2}
R_a(t_2-t_1)
\\cos(\\omega_c(t_1-t_2))
$$

이다.

이 결과는 $t_1$, $t_2$ 각각의 절대 시간에는 의존하지 않고 시간 차이에만 의존한다.

또한 평균은

$$
E[x(t)]=0
$$

으로 일정하다.

따라서 (식 15.10)의 $x(t)$는 WSS이다.
`
},
        {
            "id": "15-4E5",
            "title": "4.E5.",
            "type": "python",
            "prompt": `(식 15.9)에 해당하는 $x(t)$의 샘플 벡터 ‘xt’를 생성하여 문제 4.E1~4.E2의 답을 검증하자.

문제 4.D1의 py 스크립트를 복사하여 붙여넣은 후, 13번째 라인 ‘xt=np.convolve(np.random.randn(100),ID)+4.35’을 ‘at=np.convolve(np.random.randn (100),ID)+4.35’로 수정하고, 바로 아래 라인에 ‘xt=at*np.cos(0.1*np.arange(0,len(at)))’를 추가하시오. 수정된 py 스크립트를 실행하여 결과를 확인하시오.`,
          "referenceAnswer": `
문제 4.D1의 py 스크립트에서 랜덤 프로세스 $a(t)$의 샘플 벡터를 먼저 생성하고, 여기에 cosine 신호를 곱하여 $x(t)$를 생성한다.

수정된 부분은 다음과 같다.
\`\`\`python
at=np.convolve(np.random.randn(100),ID)+4.35
xt=at*np.cos(0.1*np.arange(0,len(at)))
\`\`\`
전체적인 실행 과정에서는 각 시행마다 새로운 \`at\`가 생성되고,
$$
x(t)=a(t)\\cos(0.1t)
$$
에 해당하는 \`xt\`가 만들어진다.

이 \`xt\`를 이용하여 문제 4.D1과 동일한 방식으로 자기 상관 값을 계산하면, $x(t)$의 자기 상관 함수가 시간에 따라 어떻게 변하는지 확인할 수 있다. 실행 결과, 기존의 $a(t)$와 달리 cosine 항이 곱해짐에 따라 자기 상관 함수의 형태가 $t_1$ 값에 따라서도 달라지는 것을 확인할 수 있다.
`
        },
        {
            "id": "15-4E6",
            "title": "4.E6.",
            "type": "essay",
            "prompt": `수정한 문제 4.E5의 py 스크립트를 이용하여 문제 4.D3, 4.D4, 4.D6을 반복하자.

(문제 4.D3) ‘t1’ 값을 40에서 60 사이의 임의의 다른 값들로 바꿔가면서 문제 4.D1의 py 스크립트를 여러 번 반복하여 수행하고, 결과 그래프를 확인하시오. 적어도 4개 이상의 ‘t1’ 값에 대해 실험을 수행하고, $R_x(t_1, t_1+\\tau_0)$의 결과 그래프를 확인하시오.

(문제 4.D4) 문제 4.D3의 $R_x(t_1, t_1+\\tau_0)$의 그래프로부터, $R_x(t_1, t_1+\\tau_0)$는 $t_1$에 대한 함수인지, 또는 $\\tau_0$에 대한 함수인지, 아니면, $t_1, \\tau_0$ 두 변수 모두에 대한 함수인지 판단하시오. 자신의 판단에 대한 근거도 쓰시오.

(문제 4.D6) 문제 4.B4와 문제 4.D4의 결과로부터, 랜덤 프로세스 $x(t)$가 WSS인지 판단하시오. 판단의 근거를 명확히 설명하시오.`,
          "referenceAnswer": `
문제 4.E5에서 생성한
$$
x(t)=a(t)\\cos(0.1t)
$$
를 이용하여 문제 4.D3, 4.D4, 4.D6을 반복하였다.

먼저 문제 4.D3과 같이 $t_1$을 여러 값으로 변경하면서
$$
R_x(t_1,t_1+\\tau_0)
$$
의 그래프를 확인하였다.

실행 결과, $t_1$의 값을 변경하면 자기 상관 함수의 그래프가 동일하게 유지되지 않고 달라지는 것을 확인할 수 있다. 따라서 문제 4.D4의 관점에서 보면,
$$
R_x(t_1,t_1+\\tau_0)
$$
는 $\\tau_0$에만 의존하는 함수가 아니라 $t_1$에도 의존한다고 판단할 수 있다.

즉,
$$
R_x(t_1,t_1+\\tau_0)
$$
는 일반적으로 $t_1$과 $\\tau_0$ 두 변수 모두에 대한 함수이다.

또한 $x(t)$의 평균은
$$
E[x(t)]
=
E[a(t)]\\cos(0.1t)
$$
와 같이 시간에 따라 변할 수 있다.

따라서 $x(t)$는 WSS의 조건인
1. 평균이 시간에 관계없이 일정할 것
2. 자기 상관 함수가 두 시간의 차이 $\\tau$에만 의존할 것
을 만족하지 않는다.

실험 결과에서도 $t_1$을 변경할 때 자기 상관 함수의 그래프가 달라지는 것을 확인할 수 있으므로, $x(t)$는 WSS 랜덤 프로세스가 아니라고 판단할 수 있다.
`
        },
        {
            "id": "15-4E7",
            "title": "4.E7.",
            "type": "python",
            "prompt": `(식 15.10)에 해당하는 $x(t)$의 샘플 벡터 ‘xt’를 생성하여 문제 4.E3~4.E4의 답을 검증하자.

문제 4.E5의 py 스크립트를 복사하여 붙여넣은 후, 14번째 라인 ‘xt=at*np.cos(0.1*np.arange(0,len(at)))’을 ‘xt=at*np.cos(0.1*np.arange(0,len(at))+2*np.pi *np.random.rand())’으로 수정하시오. 수정된 py 스크립트를 실행하여 결과를 확인하시오.`,
          "referenceAnswer": `
문제 4.E5의 py 스크립트에서 $x(t)$를 생성하는 라인을 다음과 같이 수정한다.
\`\`\`python
xt=at*np.cos(0.1*np.arange(0,len(at))+2*np.pi*np.random.rand())
\`\`\`
여기서
\`\`\`python
2*np.pi*np.random.rand()
\`\`\`
는 $0$부터 $2\\pi$ 사이에서 균일하게 분포하는 랜덤 위상 $\\theta$를 생성한다.

따라서 생성되는 \`xt\`는
$$
x(t)=a(t)\\cos(0.1t+\\theta)
$$
에 해당한다.

각 시행마다 새로운 $a(t)$뿐만 아니라 새로운 랜덤 위상 $\\theta$도 생성된다. 수정된 py 스크립트를 실행하여 자기 상관 함수의 그래프를 확인하면, 문제 4.E5의 경우와 달리 $t_1$을 변화시켜도 자기 상관 함수의 전체적인 형태가 거의 동일하게 나타나는 경향을 확인할 수 있다.
`
        },
        {
            "id": "15-4E8",
            "title": "4.E8.",
            "type": "essay",
            "prompt": `수정한 문제 4.E7의 py 스크립트를 이용하여 문제 4.D3, 4.D4, 4.D6을 반복하자.

(문제 4.D3) ‘t1’ 값을 40에서 60 사이의 임의의 다른 값들로 바꿔가면서 문제 4.D1의 py 스크립트를 여러 번 반복하여 수행하고, 결과 그래프를 확인하시오. 적어도 4개 이상의 ‘t1’ 값에 대해 실험을 수행하고, $R_x(t_1, t_1+\\tau_0)$의 결과 그래프를 확인하시오.

(문제 4.D4) 문제 4.D3의 $R_x(t_1, t_1+\\tau_0)$의 그래프로부터, $R_x(t_1, t_1+\\tau_0)$는 $t_1$에 대한 함수인지, 또는 $\\tau_0$에 대한 함수인지, 아니면, $t_1, \\tau_0$ 두 변수 모두에 대한 함수인지 판단하시오. 자신의 판단에 대한 근거도 쓰시오.

(문제 4.D6) 문제 4.B4와 문제 4.D4의 결과로부터, 랜덤 프로세스 $x(t)$가 WSS인지 판단하시오. 판단의 근거를 명확히 설명하시오.`,
          "referenceAnswer": `
문제 4.E7에서 생성한 랜덤 프로세스는
$$
x(t)=a(t)\\cos(0.1t+\\theta)
$$
이며, $\\theta$는 $0$부터 $2\\pi$ 사이에서 균일하게 분포하는 랜덤 변수이다.

문제 4.D3과 같이 $t_1$을 여러 값으로 변경하면서
$$
R_x(t_1,t_1+\\tau_0)
$$
의 그래프를 확인하였다. 실행 결과, $t_1$의 값을 변경하여도 자기 상관 함수의 전체적인 그래프 모양은 거의 동일하게 나타나는 것을 확인할 수 있다.

따라서 문제 4.D4의 관점에서 보면,
$$
R_x(t_1,t_1+\\tau_0)
$$
는 $t_1$의 절대적인 값에는 의존하지 않고, 두 시간 사이의 차이인 $\\tau_0$에 주로 의존한다고 판단할 수 있다.

즉,
$$
R_x(t_1,t_1+\\tau_0)=R_x(\\tau_0)
$$
와 같은 형태로 나타낼 수 있다.

또한 랜덤 위상 $\\theta$가 $[0,2\\pi]$ 구간에서 균일하게 분포하므로, 여러 시행에 대해 평균을 구하면 cosine 항의 평균이 상쇄되어 $x(t)$의 평균은 시간에 관계없이 일정하게 나타난다.

따라서 $x(t)$는
1. 평균이 시간에 따라 변하지 않고,
2. 자기 상관 함수가 $t_1$의 절대적인 위치가 아니라 시간 차이 $\\tau_0$에만 의존하므로,
WSS(Wide Sense Stationary) 랜덤 프로세스라고 판단할 수 있다.

즉, 문제 4.E5의
$$
x(t)=a(t)\\cos(0.1t)
$$
는 일반적으로 WSS가 아니었지만, 랜덤 위상 $\\theta$를 추가한
$$
x(t)=a(t)\\cos(0.1t+\\theta)
$$
는 실험 결과 WSS의 특성을 나타내는 것을 확인할 수 있다.
`
        },
        {
        "id": "15-4E9",
        "title": "4.E9.",
        "type": "essay",
        "prompt": `문제 4.E5~4.E8의 실험 결과가 앞에서 (식 15.9)와 (식 15.10)에 대하여 수식으로 판단한 WSS 여부와 일치하는지 쓰시오.`,
        "referenceAnswer": `
실험 결과는 앞에서 수식으로 판단한 결과와 일치한다.

(식 15.9)의
$$
x(t)=a(t)\\cos(\\omega_c t)
$$
의 경우, 실험에서 $t_1$을 변경하면 자기 상관 함수의 그래프가 달라지는 것을 확인하였다. 따라서 자기 상관 함수가 시간 차이 $\\tau$에만 의존하지 않으므로 WSS가 아니라고 판단하였다. 이는 앞의 수식 유도에서 (식 15.9)의 랜덤 프로세스가 일반적으로 WSS가 아니라는 결과와 일치한다.

반면 (식 15.10)의
$$
x(t)=a(t)\\cos(\\omega_c t+\\theta)
$$
의 경우, 랜덤 위상 $\\theta$를 추가한 후에는 $t_1$을 변경하여도 자기 상관 함수의 전체적인 형태가 거의 동일하게 나타났다. 또한 평균도 시간에 관계없이 일정하게 나타나므로 WSS라고 판단하였다. 이 역시 앞의 수식 유도에서 (식 15.10)의 랜덤 프로세스가 WSS라는 결과와 일치한다.

따라서 두 랜덤 프로세스에 대한 실험적 판단과 수식에 의한 이론적 판단이 서로 일치함을 확인할 수 있다.
`
        },
        { //문제 4.F
          "id": "15-4F",
          "title": "4.F.",
          "prompt": `AWGN 신호의 통계적인 특성을 살펴보자.`
        },
        {
          "id": "15-4F1",
          "title": "4.F1.",
          "type": "essay",
          "prompt": `‘np.random.randn(b)’는 길이가 ‘b’인 벡터를 생성하며, 각 원소는 서로 독립이며, 분포가 같은 가우시안 랜덤 변수로 채워진다. 문제 4.D1의 py 스크립트에서 라인 ‘xt=np.convolve(np.random.randn(100),ID)+4.35’을 ‘xt=np.random.randn(100)’으로 수정하여 실행하면, 문제 4.D1의 자기 상관 함수 그래프와 다른 모양의 자기 상관 함수 그래프를 얻게 될 것이다. 실험하기 전에, 어떻게 바뀔지 예측하시오. 자신의 예측에 대한 근거도 쓰시오.`,
          "referenceAnswer": `
(예시 답안)

\`np.random.randn(100)\`으로 생성되는 각 샘플은 서로 독립이고 평균이 0인 가우시안 랜덤 변수이다. 따라서 서로 다른 시간의 두 샘플 $x(t_1)$과 $x(t_2)$는 $t_1\\neq t_2$일 때 서로 상관이 없다. 그러므로 자기 상관 함수는 $\\tau=0$에서만 큰 값을 가지고, $\\tau\\neq0$에서는 0에 가까운 값을 가질 것으로 예상할 수 있다.

즉, 자기 상관 함수는
$$
R_x(\\tau)
=
\\begin{cases}
\\sigma_x^2, & \\tau=0 \\\\
0, & \\tau\\neq0
\\end{cases}
$$
와 유사한 형태가 될 것으로 예상한다.

\`np.random.randn()\`으로 생성되는 랜덤 변수의 분산은 $1$이므로, $\\tau=0$에서의 자기 상관 값은 약 $1$이고 나머지 $\\tau$에서는 약 $0$에 가까운 그래프가 나타날 것으로 예상한다.
`
        },
        {
          "id": "15-4F2",
          "title": "4.F2.",
          "type": "python",
          "prompt": `문제 4.D1의 py 스크립트를 복사하여 붙여넣은 후, 13번째 라인 ‘xt=np.convolve(np.random.randn(100),ID)+4.35’을 ‘xt=np.random.randn(100)’으로 수정하시오. 수정된 py 스크립트를 실행하여 결과를 확인하시오.`,
          "referenceAnswer": `
문제 4.D1의 py 스크립트에서
\`\`\`python
xt=np.convolve(np.random.randn(100),ID)+4.35
\`\`\`
를
\`\`\`python
xt=np.random.randn(100)
\`\`\`
으로 수정하여 실행한다. 실행 결과, 자기 상관 함수는 $\\tau=0$에서 약 $1$ 정도의 큰 값을 가지며, $\\tau\\neq0$에서는 대부분 $0$에 가까운 값을 나타낸다. 유한한 횟수의 랜덤 실험을 이용하여 자기 상관 값을 계산하므로 $\\tau\\neq0$인 지점에서도 정확히 $0$이 아니라 작은 오차가 나타날 수 있다.
`
        },
        {
          "id": "15-4F3",
          "title": "4.F3.",
          "type": "essay",
          "prompt": `문제 4.F2에서 확인한 결과 그래프는 문제 4.F1에서 자신이 예측한 결과와 일치하는가?`,
          "referenceAnswer": `
예측한 결과와 대체로 일치한다.

문제 4.F1에서는 서로 다른 시간의 랜덤 변수들이 독립이므로 $\\tau\\neq0$일 때 자기 상관 값이 $0$에 가까워지고, $\\tau=0$에서만 큰 값을 가질 것으로 예상하였다. 실험 결과에서도 $\\tau=0$에서 자기 상관 함수가 가장 큰 값을 가지며, 나머지 $\\tau$에서는 거의 $0$에 가까운 값을 나타내었다. 따라서 문제 4.F1에서 예상한 자기 상관 함수의 형태와 실험 결과가 일치한다고 볼 수 있다.
`          
        },
        {
          "id": "15-4F4",
          "title": "4.F4.",
          "type": "essay",
          "prompt": `문제 4.F2에서 실행하여 얻은 $x(t)$의 자기 상관 함수만을 바탕으로, $x(t)$가 가우시안 랜덤 프로세스라고 단정할 수 있는가? 자신의 답에 대한 근거도 쓰시오.`,
          "referenceAnswer": `$x(t)$가 가우시안 랜덤 프로세스라고 단정할 수 없다.

자기 상관 함수는 서로 다른 시간의 랜덤 변수들이 얼마나 상관되어 있는지를 나타내지만, 랜덤 변수 자체가 어떤 PDF를 가지는지는 직접 나타내지 않는다. 문제 4.F2의 자기 상관 함수에서 $\\tau\\neq0$일 때 값이 거의 $0$이라는 사실은 서로 다른 시간의 샘플들이 서로 상관이 거의 없다는 것을 의미한다. 그러나 이러한 자기 상관 특성만으로 각 $x(t)$의 확률분포가 가우시안 분포라고 단정할 수는 없다. 따라서 자기 상관 함수만을 이용해서는 $x(t)$가 가우시안 랜덤 프로세스인지 판단할 수 없다.
`
        },
        {
          "id": "15-4F5",
          "title": "4.F5.",
          "type": "essay",
          "prompt": `하지만, $x(t)$는 가우시안 랜덤 프로세스인 것은 사실이다. PDF를 실험으로 구하지 않고, py 스크립트를 분석하여 ‘xt’($x(t)$의 샘플 벡터)가 가우시안 랜덤 프로세스라고 판단할 수 있는 이유를 쓰시오.`,
          "referenceAnswer": `
py 스크립트에서 $x(t)$의 샘플 벡터 \`xt\`는
\`\`\`python
xt=np.random.randn(100)
\`\`\`
으로 생성된다. \`np.random.randn(100)\`은 서로 독립이며 동일한 표준 가우시안 분포를 따르는 랜덤 변수 100개를 생성한다.

따라서 각 시간 $t$에서의 샘플 $x(t)$는 가우시안 랜덤 변수이며,
$$
x(t)\\sim N(0,1)
$$
의 분포를 가진다. 또한 서로 다른 시간에서 생성된 샘플들도 각각 가우시안 랜덤 변수들로 구성된다.

따라서 PDF를 실험적으로 직접 구하지 않더라도, \`xt=np.random.randn(100)\`이라는 생성 코드를 분석함으로써 $x(t)$가 가우시안 랜덤 프로세스임을 판단할 수 있다.
`
        },
        {
          "id": "15-4F6",
          "title": "4.F6.",
          "type": "python",
          "prompt": `문제 4.B2의 py 스크립트를 복사하여 붙여넣은 후, 9번째 라인 ‘xt=np.convolve(np.random.randn(100),ID)+4.35’을 ‘xt=np.random.randn(100)’으로 수정한 후, 적어도 4가지 이상의 ‘t0’에 대하여 py 스크립트를 실행하여 결과를 확인하시오.`,
          "referenceAnswer": `
문제 4.B2의 py 스크립트에서
\`\`\`python
xt=np.convolve(np.random.randn(100),ID)+4.35
\`\`\`
를
\`\`\`python
xt=np.random.randn(100)
\`\`\`
으로 수정한다. 그 후 \`t0\`를 서로 다른 값으로 바꾸어가며 실행한다.

예를 들어,
\`\`\`python
t0=10
\`\`\`
\`\`\`python
t0=30
\`\`\`
\`\`\`python
t0=50
\`\`\`
\`\`\`python
t0=80
\`\`\`
과 같이 설정할 수 있다. 각 경우에 대하여 \`xt_at_t0\`의 평균과 히스토그램을 확인한다.

실행 결과, 서로 다른 $t_0$ 값에서도 평균은 대체로 0 부근으로 나타나고, 히스토그램은 평균 0을 중심으로 한 종 모양의 가우시안 분포 형태를 나타낸다. 유한한 횟수의 랜덤 실험을 이용하므로 각 실행 결과에는 약간의 오차가 발생할 수 있다.
`
        },
        {
          "id": "15-4F7",
          "title": "4.F7.",
          "type": "essay",
          "prompt": `문제 4.F6의 결과를 바탕으로, $x(t)$가 가우시안임을 증명해 보이시오.`,
          "referenceAnswer": `
문제 4.F6에서 여러 서로 다른 시간 $t_0$에 대하여 동일한 시각의 여러 시행 결과
$$
x(t_0)
$$
를 모아 PDF의 형태를 확인하였다.

실험 결과, 서로 다른 $t_0$ 값에 대해서도 $x(t_0)$의 히스토그램이 모두 평균 0을 중심으로 한 종 모양의 가우시안 분포 형태를 나타내었다. 즉, 여러 시간 지점에서 랜덤 변수 $x(t_0)$의 분포가 가우시안 형태임을 확인할 수 있었다. 따라서 문제 4.F6의 실험 결과를 바탕으로 $x(t)$가 가우시안 랜덤 프로세스임을 확인할 수 있다.
`
        },
        {
          "id": "15-4F8",
          "title": "4.F8.",
          "type": "essay",
          "prompt": `문제 4.F6의 PDF 그래프의 결과가 $x(t)$는 white 함을 의미하지는 않는다. 하지만, $x(t)$는 white 한 것은 사실이다. 문제 4.F2에서 얻은 자기 상관 함수 그래프를 다시 검토하여, 그 결과가 white 함을 입증할 수 있는 이유를 쓰시오.`,
          "referenceAnswer": `
문제 4.F6에서 얻은 PDF 그래프는 각 시간에서 $x(t)$가 어떤 확률분포를 가지는지를 나타내므로, 이 결과만으로는 서로 다른 시간의 샘플 사이의 상관관계를 알 수 없다. 따라서 PDF가 가우시안 형태라는 사실만으로 $x(t)$가 white하다고 판단할 수는 없다.

반면 문제 4.F2에서 얻은 자기 상관 함수는 $\\tau=0$에서만 큰 값을 가지고,
$$
\\tau\\neq0
$$
인 경우에는 거의 0에 가까운 값을 나타내었다. 즉,
$$
R_x(\\tau)
\\approx0,
\\qquad \\tau\\neq0
$$
이므로 서로 다른 시간의 $x(t)$ 값들 사이에는 상관관계가 거의 없음을 알 수 있다. white 랜덤 프로세스는 서로 다른 시간의 샘플들이 서로 상관되지 않는 특성을 가지므로, 문제 4.F2의 자기 상관 함수 결과는 $x(t)$가 white함을 입증한다.
`
        },        
        {
          "id": "15-4F9",
          "title": "4.F9.",
          "type": "essay",
          "prompt": `py 스크립트 파일의 ‘xt’($x(t)$의 샘플 벡터) 생성 코드로부터, $x(t)$가 white 한 이유를 알 수 있다. 이유를 쓰시오.`,
          "referenceAnswer": `
py 스크립트에서 $x(t)$의 샘플 벡터 \`xt\`는
\`\`\`python
xt=np.random.randn(100)
\`\`\`
으로 생성된다. \`np.random.randn(100)\`은 서로 독립인 랜덤 변수들을 생성한다. 따라서 서로 다른 시간 $t_1$, $t_2$에 해당하는 샘플
$$
x(t_1),\\;x(t_2)
$$
는 서로 독립이며, 서로 상관이 없다. 즉,
$$
R_x(t_1,t_2)=0
$$
인 특성을 가지며, 시간 차이 $\\tau=t_2-t_1$로 나타내면
$$
R_x(\\tau)=0,
\\qquad \\tau\\neq0
$$
이다.

따라서 \`xt=np.random.randn(100)\`이라는 생성 코드 자체로부터 서로 다른 시간의 샘플들이 서로 독립이고 상관되지 않음을 알 수 있으므로, $x(t)$는 white한 랜덤 프로세스라고 판단할 수 있다.
`
        },        
        { //문제 4.G
          "id": "15-4G",
          "title": "4.G.",
          "prompt": `선형 시스템에 가우시안 랜덤 프로세스가 입력되었을 때 출력의 특성을 확인하자.`
        },
        {
          "id": "15-4G1",
          "title": "4.G1.",
          "type": "python",
          "prompt": `문제 4.B2의 py 스크립트를 복사하여 붙여넣은 후, 9번째 라인 ‘xt=np.convolve(np.random.randn(100),ID)+4.35’을 ‘xt=np.convolve(np.random.randn(100),ID)’로 수정하시오. 이후, 5번째 라인의 벡터 ‘ID’를 임의의 실숫값을 각 원소로 가지는 임의의 길이를 갖는 벡터로 바꾸고, py 스크립트를 실행하시오. ‘t0’ 값을 바꾸어 가면서 실행하고, 각 분포의 그래프를 확인하시오. 또, 각 ‘t0’에서 ‘ID’ 값을 바꾸어 가면서 실행하여 분포 그래프를 확인하시오. (적어도 4가지 이상의 ‘ID’에 대해 실험을 수행할 것)`,
          "referenceAnswer": `
여러 $t_0$ 값과 여러 형태의 \`ID\` 벡터에 대하여 py 스크립트를 반복 실행하고, 각 경우의 \`xt_at_t0\` 히스토그램을 확인한다. 예를 들어 \`ID\`는 다음과 같이 서로 다른 실숫값과 길이를 가지도록 설정할 수 있다.
\`\`\`python
ID=np.array([1,2])
\`\`\`
\`\`\`python
ID=np.array([0.5,2,-1])
\`\`\`
\`\`\`python
ID=np.array([1.2,-0.5,3,0.8])
\`\`\`
\`\`\`python
ID=np.array([2,-1,0.3,1.5,-0.7])
\`\`\`
또한 \`t0\`를 여러 값으로 변경하면서 각 경우의 분포 그래프를 확인한다. 실행 결과, \`t0\`와 \`ID\`를 변경하면 분포의 평균이나 퍼짐 정도는 달라질 수 있지만, 전체적인 분포의 모양은 계속 종 모양의 가우시안 형태를 유지하는 것을 확인할 수 있다.
`
        },
        {
          "id": "15-4G2",
          "title": "4.G2.",
          "type": "essay",
          "prompt": `문제 4.G1에서 얻은 그래프로부터, $t_0$와 ID가 바뀌어도, 랜덤 프로세스 $x(t)$의 분포가 유지하는 공통된 특성을 설명하시오.`,
          "referenceAnswer": `
문제 4.G1에서 $t_0$와 \`ID\`를 여러 값으로 변경하여 실험한 결과, 분포의 위치나 퍼짐 정도는 경우에 따라 달라질 수 있지만 공통적으로 종 모양의 가우시안 분포 형태를 나타낸다. 즉, 선형 시스템의 특성에 해당하는 \`ID\`가 달라지고 관찰하는 시간 $t_0$가 달라져도 출력 랜덤 프로세스 $x(t)$는 가우시안 분포의 특성을 유지한다. 따라서 입력이 가우시안 랜덤 프로세스인 경우 선형 시스템을 통과한 출력도 가우시안 랜덤 프로세스가 되는 특성을 확인할 수 있다.
`
        },
        {
          "id": "15-4G3",
          "title": "4.G3.",
          "type": "essay",
          "prompt": `선형 시스템의 입력과 선형 시스템의 임펄스 응답으로부터 선형 시스템의 출력을 구하는 식을 쓰시오.`,
          "referenceAnswer": `
선형 시스템의 입력을 $x(t)$, 임펄스 응답을 $h(t)$, 출력을 $y(t)$라고 하면 출력은 입력과 임펄스 응답의 convolution으로 구할 수 있다.
$$
y(t)=x(t)*h(t)
$$
즉,
$$
y(t)
=
\\int_{-\\infty}^{\\infty}
x(\\tau)h(t-\\tau)d\\tau
$$
로 나타낼 수 있다.

따라서 선형 시스템의 출력은 입력 신호와 시스템의 임펄스 응답을 convolution하여 구한다.
`
        },
        {
          "id": "15-4G4",
          "title": "4.G4.",
          "type": "essay",
          "prompt": `문제 4.G1의 실험 결과에 따르면, ‘가우시안 프로세스를 선형 시스템에 입력하면, 출력 또한 가우시안 프로세스가 된다.’라는 결론을 내릴 수 있다.

문제 4.G3에서 답한 관계식에 따르면, py 스크립트의 라인 ‘xt=np.convolve(np.random.randn(100),ID)’에서, 랜덤 벡터 ‘np.random.randn(100)’는 선형 시스템의 입력, ‘xt’는 선형 시스템의 출력으로 해석할 수 있다. 그렇다면, 이 선형 시스템의 임펄스 응답에 해당하는 것은 무엇인가?`,
          "referenceAnswer": `
선형 시스템의 출력 관계는
$$
y(t)=x(t)*h(t)
$$
이다.

py 스크립트의
\`\`\`python
xt=np.convolve(np.random.randn(100),ID)
\`\`\`
에서
\`\`\`python
np.random.randn(100)
\`\`\`
은 선형 시스템의 입력에 해당하고, \`xt\`는 convolution 결과인 출력에 해당한다.

따라서 입력과 convolution되는 벡터
\`\`\`python
ID
\`\`\`
가 선형 시스템의 임펄스 응답에 해당한다.

즉,
$$
\\boxed{h=ID}
$$
로 해석할 수 있다.
`
        },
        {
          "id": "15-4G5",
          "title": "4.G5.",
          "type": "essay",
          "prompt": `문제 4.G4의 답과 문제 4.G2에서 얻은 랜덤 프로세스 분포의 특성을 참고하여, 가우시안 랜덤 프로세스가 선형 시스템을 통과했을 때, 출력의 중요한 성질을 설명하시오. 또, 이 성질은 임의의 선형 시스템에 대해서도 성립한다는 것은 위의 어떤 문제에서 검증하고 있는지도 쓰시오.`,
          "referenceAnswer": `
문제 4.G4에서 벡터 \`ID\`는 선형 시스템의 임펄스 응답에 해당한다. 문제 4.G1에서는 가우시안 랜덤 프로세스를 입력으로 하고, 서로 다른 여러 \`ID\`를 이용하여 선형 시스템의 출력을 생성하였다. 실험 결과, \`ID\`가 바뀌면 출력 분포의 평균이나 분산 등은 달라질 수 있지만, 출력 랜덤 프로세스의 분포는 계속 가우시안 형태를 유지하였다. 따라서 가우시안 랜덤 프로세스가 선형 시스템을 통과하면 출력 역시 가우시안 랜덤 프로세스가 된다는 중요한 성질을 확인할 수 있다.

즉,
$$
\\text{Gaussian random process}
\\xrightarrow{\\text{linear system}}
\\text{Gaussian random process}
$$
의 성질이 성립한다.

또한 문제 4.G1에서는 \`ID\`를 임의의 실숫값과 임의의 길이를 가지는 여러 벡터로 변경하여 실험하였다. 이는 서로 다른 임펄스 응답을 가지는 여러 선형 시스템을 사용한 것과 같으므로, 가우시안 랜덤 프로세스를 선형 시스템에 입력하면 출력도 가우시안 랜덤 프로세스가 된다는 성질이 임의의 선형 시스템에 대해서도 성립함을 문제 4.G1에서 검증하고 있다.
`
        },
      ]
    },
  ]
} as const;