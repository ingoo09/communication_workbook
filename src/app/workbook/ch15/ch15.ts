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
    }
  ]
} as const;
