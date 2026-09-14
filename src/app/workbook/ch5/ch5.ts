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
        
          referenceAnswer: `예시 주석은 다음과 같다.

\`\`\`python
import numpy as np              # 수치 계산 및 배열 생성을 위해 NumPy를 불러온다.
import matplotlib.pyplot as plt # 그래프를 그리기 위해 pyplot을 불러온다.

t=np.arange(-5,5,0.01)         # -5 이상 5 미만을 0.01 간격으로 갖는 시간축 벡터를 만든다.
y=(-2<t)&(t<-1)                # -2<t<-1인 원소에서만 True가 되는 Boolean 벡터를 만든다.
plt.plot(t,y)                  # t를 가로축, y를 세로축으로 그래프를 그린다.
plt.axis([-5,5,-1,2])          # x축과 y축의 표시 범위를 지정한다.
plt.grid()                     # 그래프에 격자를 표시한다.
\`\`\`

\`y\`는 조건이 참인 구간에서 1, 거짓인 구간에서 0으로 표시된다.`},
        {
          "id": "5-1A2",
          "title": "1.A2.",
          "type": "essay",
          "prompt": `라인에 대한 설명을 바탕으로, 문제 1.A1의 그래프의 모양을 설명하시오.`          
        ,
          referenceAnswer: `그래프는
$$
y(t)=
\\begin{cases}
1, & -2<t<-1\\\\
0, & \\text{그 외}
\\end{cases}
$$
형태의 직사각 펄스이다.

즉, $t=-2$와 $t=-1$ 사이에서만 값이 1이고 나머지 구간에서는 0이다.`},
        { //문제 1.B
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
[[image:/images/ch5/figure5_2.png|그림 5.2 $f_2(t)$]]
          `,
          starterCode: `import numpy as np
import matplotlib.pyplot as plt

tstep=0.01
t=np.arange(-5,5,tstep)

f1=0.5*((t>?)&(t<?)) #완성해야 할 부분
f2=((t>-1)&(t<0))-1*((t>0)&(t<1))`,
          "referenceAnswer": `
\`\`\`python      
import numpy as np
import matplotlib.pyplot as plt

tstep=0.01
t=np.arange(-5,5,tstep)

f1=0.5*((t>0)&(t<1)) #완성해야 할 부분
f2=((t>-1)&(t<0))-1*((t>0)&(t<1))
\`\`\`
        `
        },
        { //문제 1.C
          "id": "5-1C",
          "title": "1.C.",
          "type": "python",
          "consoleEnabled": true,
          "prompt": `문제 1.B에서 완성한 py 스크립트 복사하여 붙여넣은 후 실행하고, Console에서 아래 명령어를 실행하여 $f_1(t)$를 그리시오.
\`\`\`python      
>>> plt.plot(t,f1)
>>> plt.axis([-5,5,-5,5])
>>> plt.grid()
\`\`\`
결과 그래프를 확인하고, ‘f1’이 [그림 5.1]의 $f_1(t)$의 그래프와 같은지 확인하시오.
          `
        ,
          referenceAnswer: `\`plt.plot(t,f1)\`을 실행하면 $f_1(t)$는
$$
f_1(t)=
\\begin{cases}
0.5, & 0<t<1\\\\
0, & \\text{그 외}
\\end{cases}
$$
의 직사각 펄스로 나타나며 [그림 5.1]과 같은 모양이다.`},
        { //문제 1.D
          "id": "5-1D",
          "title": "1.D.",
          "type": "python",
          "consoleEnabled": true,
          "prompt": `문제 1.B에서 완성한 py 스크립트 복사하여 붙여넣은 후 실행하고, ?에 알맞은 변수 이름을 넣고, Console에서 아래 명령어를 실행하여 $f_2(t)$를 그리시오.
\`\`\`python      
>>> plt.plot(?,?) #완성해야 할 부분
>>> plt.axis([-5,5,-5,5])
>>> plt.grid()
\`\`\`
결과 그래프를 확인하고, ‘f2’이 [그림 5.2]의 $f_2(t)$의 그래프와 같은지 확인하시오.
          `
        ,
          referenceAnswer: `완성해야 할 명령은 다음과 같다.

\`\`\`python
plt.plot(t,f2)
plt.axis([-5,5,-5,5])
plt.grid()
\`\`\`

결과는
$$
f_2(t)=
\\begin{cases}
1, & -1<t<0\\\\
-1, & 0<t<1\\\\
0, & \\text{그 외}
\\end{cases}
$$
형태이며 [그림 5.2]와 일치한다.`},
        { //문제 1.E
          "id": "5-1E",
          "title": "1.E.",          
          "prompt": `아래 py 스크립트는 $-5\\le\\tau\\le5$ 범위에서, $f_1(-\\tau)$의 모양을 갖는 벡터 ‘f1mirror’를 생성하고 $\\tau$를 $x$축으로 하여 $f_1(-\\tau)$의 그래프를 그린다.
\`\`\`python      
import numpy as np
import matplotlib.pyplot as plt

tau_step=0.01
tau=np.arange(-5,5,tau_step)
f1mirror=0.5*((tau>-1)&(tau<0))
plt.plot(tau,f1mirror); plt.axis([-5,5,-5,5]); plt.grid()
\`\`\``
        },
        {
          "id": "5-1E1",
          "title": "1.E1.",
          "type": "python",     
          "prompt": `py 스크립트를 실행한 후, 결과 그래프를 확인하시오.`,
          "starterCode": `import numpy as np
import matplotlib.pyplot as plt

tau_step=0.01
tau=np.arange(-5,5,tau_step)
f1mirror=0.5*((tau>-1)&(tau<0))
plt.plot(tau,f1mirror); plt.axis([-5,5,-5,5]); plt.grid()`,
        
          referenceAnswer: `실행 결과 $f_1(-\\tau)$는
$$
f_1(-\\tau)=
\\begin{cases}
0.5, & -1<\\tau<0\\\\
0, & \\text{그 외}
\\end{cases}
$$
로 나타난다.

즉, 원래 $f_1(t)$의 직사각 펄스를 시간축에 대해 좌우 반전한 모양이다.`},
        {
          "id": "5-1E2",
          "title": "1.E2.",
          "type": "essay",
          "prompt": `$f_1(-\\tau)$가 제대로 생성되었는지 확인하시오. (시간 축 변수가 $t$에서 $\\tau$로 바뀐 것뿐임. $x$축 벡터 $\\tau$는 문제 1.A의 벡터 $t$와 같은 방식으로 생성)`
        ,
          referenceAnswer: `원래
$$
f_1(t)=0.5,\\qquad 0<t<1
$$
이므로 $t=-\\tau$를 대입하면
$$
0<-\\tau<1
$$
이고, 이를 정리하면
$$
-1<\\tau<0
$$
이다.

따라서 생성된 \`f1mirror=0.5*((tau>-1)&(tau<0))\`는 $f_1(-\\tau)$를 올바르게 나타낸다.`},
        { //문제 1.F
          "id": "5-1F",
          "title": "1.F.",          
          "prompt": `함수 ‘np.roll()’을 이용하여 벡터 원소의 위치를 원하는 만큼 이동하는 방법을 익히자.`
        },
        {
          "id": "5-1F1",
          "title": "1.F1.",
          "type": "console",
          "prompt": `Console에서 아래를 수행하고, 각 라인의 결과를 비교해보자. 각 라인을 수행하여 결과를 확인하고, 결과로부터 각 라인의 의미를 설명하시오.
\`\`\`python      
>>> import numpy as np
>>> temp=np.random.rand(10); print(temp)
>>> temp2=np.roll(temp,1); print(temp2)
>>> temp2=np.roll(temp,3); print(temp2)
>>> temp2=np.roll(temp,-1); print(temp2)
\`\`\``,
        
          referenceAnswer: `\`np.roll()\`은 배열 원소의 위치를 순환 이동시키는 함수이다.

- \`np.roll(temp,1)\`: 모든 원소를 오른쪽으로 1칸 이동한다. 마지막 원소는 맨 앞으로 이동한다.
- \`np.roll(temp,3)\`: 오른쪽으로 3칸 이동한다.
- \`np.roll(temp,-1)\`: 왼쪽으로 1칸 이동한다.

즉, 두 번째 인수가 양수이면 오른쪽, 음수이면 왼쪽으로 순환 이동한다.`},
        {
          "id": "5-1F2",
          "title": "1.F2.",
          "type": "python",
          "consoleEnabled": true,
          "prompt": `문제 1.E의 py 스크립트를 실행한 후, 벡터 ‘f1mirror’에 대하여, Console 창에서 아래를 실행하고, 결과 그래프를 보이시오.
\`\`\`python      
>>> temp=np.roll(f1mirror,100)
>>> plt.plot(tau,temp)
\`\`\`
결과 그래프를 보면 ‘f1mirror’가 오른쪽으로 1초 이동되어 있음을 알 수 있다. 1초 이동한 이유를 쓰시오. (‘tau_step=0.01’ 초임)`,
          "starterCode": `import numpy as np
import matplotlib.pyplot as plt

tau_step=0.01
tau=np.arange(-5,5,tau_step)
f1mirror=0.5*((tau>-1)&(tau<0))
plt.plot(tau,f1mirror); plt.axis([-5,5,-5,5]); plt.grid()`,
        
          referenceAnswer: `샘플 간격이
$$
\\tau_{\\text{step}}=0.01\\text{ s}
$$
이고 \`np.roll(f1mirror,100)\`은 100개의 샘플만큼 오른쪽으로 이동시킨다.

따라서 시간 이동량은
$$
100\\times0.01=1\\text{ s}
$$
이므로 \`f1mirror\`가 오른쪽으로 1초 이동한다.`}
      ],
    },
    { //문제 2
      "id": "5-2",
      "title": "2. 컨볼루션의 시간 축 분석",
      "problems": [
        {
          "id": "5-2A",
          "title": "2.A.",
          "prompt": `본 문제에서 컨볼루션의 중간 과정을 시각화하여 관찰함으로써, 시간 축에서의 컨볼루션에 대해 알아보자.`,
        },
        {
          "id": "5-2A1",
          "title": "2.A1.",
          "type": "essay",
          "prompt": `$f_1(a-\\tau)$는 $f_1(-\\tau)$를 $\\tau$ 축에서 어느 방향으로 얼마만큼 이동한 것인가?`,
        
          referenceAnswer: `$f_1(-\\tau)$에서 $\\tau$를 $\\tau-a$로 바꾸면
$$
f_1(a-\\tau)=f_1[-(\\tau-a)]
$$
가 된다.

따라서 $f_1(a-\\tau)$는 $f_1(-\\tau)$를 $\\tau$축에서
$$
\\boxed{a\\text{ 만큼 오른쪽으로 이동}}
$$
한 것이다. $a<0$이면 결과적으로 왼쪽으로 $|a|$만큼 이동한다.`},
        {
          "id": "5-2A2",
          "title": "2.A2.",
          "type": "graph",
          "prompt": `$a=-1$인 경우, $f_1(a-\\tau)$([그림 5.1] 참고)의 그래프를 그리시오.`,
          graphInputMode: "both",
          graphXMin: -5,
          graphXMax: 5,
          graphYMin: -2,
          graphYMax: 2,
          graphXAxisLabel: "τ",
          graphYAxisLabel: "f₁(a-τ)",
          graphShowGrid: true,
        
          referenceAnswer: `$f_1(-\\tau)$는 $-1<\\tau<0$에서 높이 0.5이다.

$a=-1$이면 이를 왼쪽으로 1만큼 이동하므로
$$
f_1(-1-\\tau)=
\\begin{cases}
0.5, & -2<\\tau<-1\\\\
0, & \\text{그 외}
\\end{cases}
$$
이다.`},
        {
          "id": "5-2A3",
          "title": "2.A3.",
          "type": "graph",
          "prompt": `$a=0$인 경우, $f_1(a-\\tau)$([그림 5.1] 참고)의 그래프를 그리시오.`,
          graphInputMode: "both",
          graphXMin: -5,
          graphXMax: 5,
          graphYMin: -2,
          graphYMax: 2,
          graphXAxisLabel: "τ",
          graphYAxisLabel: "f₁(a-τ)",
          graphShowGrid: true,
        
          referenceAnswer: `$a=0$이면 이동이 없으므로
$$
f_1(-\\tau)=
\\begin{cases}
0.5, & -1<\\tau<0\\\\
0, & \\text{그 외}
\\end{cases}
$$
이다.`},
        {
          "id": "5-2A4",
          "title": "2.A4.",
          "type": "graph",
          "prompt": `$a=2.5$인 경우, $f_1(a-\\tau)$([그림 5.1] 참고)의 그래프를 그리시오.`,
          graphInputMode: "both",
          graphXMin: -5,
          graphXMax: 5,
          graphYMin: -2,
          graphYMax: 2,
          graphXAxisLabel: "τ",
          graphYAxisLabel: "f₁(a-τ)",
          graphShowGrid: true,
        
          referenceAnswer: `$a=2.5$이면 $f_1(-\\tau)$를 오른쪽으로 2.5만큼 이동하므로
$$
f_1(2.5-\\tau)=
\\begin{cases}
0.5, & 1.5<\\tau<2.5\\\\
0, & \\text{그 외}
\\end{cases}
$$
이다.`},
        {
          "id": "5-2A5",
          "title": "2.A5.",
          "type": "python",
          "prompt": `아래 py 스크립트는 $-5\\le\\tau\\le5$ 범위에서 $a$가 각각 $-1, -0.5, 0, 0.5, 1, 2.5, 3$일 때, $f_1(-\\tau)$의 모양을 갖는 벡터들을 ‘np.roll()’을 사용하여 각각 생성한다. 그리고 $\\tau$를 가로축으로 하여 $f_1(-\\tau)$의 그래프를 그린다. ‘plt.subplot(7,1,1)’, ‘plt.subplot(7,1,2)’, …, ‘plt.subplot(7,1,7)’을 사용하여 하나의 Figure 창 안에 7개의 그래프를 세로로 나열하여 그린다.
\`\`\`python      
import numpy as np
import matplotlib.pyplot as plt

tau_step=0.01
tau=np.arange(-5,5,tau_step)
f1mirror=0.5*((tau>-1)&(tau<0))
plt.figure()

a=-1
delay_samples=round(a/(tau_step))
f1mirror_delayed=np.roll(f1mirror,delay_samples)
plt.subplot(7,1,1)
plt.plot(tau,f1mirror_delayed); plt.axis([-5,5,-0.5,1]); plt.grid()

a=-0.5
delay_samples=round(a/(tau_step))
f1mirror_delayed=np.roll(f1mirror,delay_samples)
plt.subplot(7,1,2)
plt.plot(tau,f1mirror_delayed); plt.axis([-5,5,-0.5,1]); plt.grid()

# ... a=0, 0.5, 1, 2.5, 3인 경우에 대한 코드를 반복하여 작성할 것.
\`\`\`          
py 스크립트를 마저 완성하고, 라인 9~11, 15~17에 대해 다음의 지침에 따라 주석(Comment)을 작성하시오.

(지침 1) '='이 있는 라인
  - '=' 왼쪽 변수의 목적(용도)을 설명하시오.
  - '=' 오른쪽 수식이 왜 해당 변수의 의미에 부합하는지 설명하시오.
(지침 2) '='이 없는 라인
  - 명령어의 기능을 설명하시오.
  - 왜 해당 명령을 수행하는지 설명하시오.

이후, py 스크립트를 실행하여 결과 그래프를 확인하시오.
          `,
          starterCode: `import numpy as np
import matplotlib.pyplot as plt

tau_step=0.01
tau=np.arange(-5,5,tau_step)
f1mirror=0.5*((tau>-1)&(tau<0))
plt.figure()

a=-1
delay_samples=round(a/(tau_step))
f1mirror_delayed=np.roll(f1mirror,delay_samples)
plt.subplot(7,1,1)
plt.plot(tau,f1mirror_delayed); plt.axis([-5,5,-0.5,1]); plt.grid()

a=-0.5
delay_samples=round(a/(tau_step))
f1mirror_delayed=np.roll(f1mirror,delay_samples)
plt.subplot(7,1,2)
plt.plot(tau,f1mirror_delayed); plt.axis([-5,5,-0.5,1]); plt.grid()

# ... a=0, 0.5, 1, 2.5, 3인 경우에 대한 코드를 반복하여 작성할 것.`,
        
          referenceAnswer: `완성 예시는 다음과 같다.

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

tau_step=0.01
tau=np.arange(-5,5,tau_step)
f1mirror=0.5*((tau>-1)&(tau<0))
plt.figure()

a_list=[-1,-0.5,0,0.5,1,2.5,3]

for i,a in enumerate(a_list):
    delay_samples=round(a/tau_step)
    f1mirror_delayed=np.roll(f1mirror,delay_samples)

    plt.subplot(7,1,i+1)
    plt.plot(tau,f1mirror_delayed)
    plt.axis([-5,5,-0.5,1])
    plt.grid()

plt.tight_layout()
\`\`\`

\`delay_samples=round(a/tau_step)\`은 $a$초에 해당하는 샘플 이동 개수를 계산하고, \`np.roll()\`은 그만큼 \`f1mirror\`를 이동시킨다.`},
        {
          "id": "5-2A6",
          "title": "2.A6.",
          "type": "essay",
          "prompt": `문제 2.A5의 결과 그래프를 바탕으로, 문제 2.A2~2.A4의 자신의 답이 맞는지 쓰시오.`,
        
          referenceAnswer: `문제 2.A5의 결과에서

- $a=-1$: 펄스가 $-2<\\tau<-1$
- $a=0$: 펄스가 $-1<\\tau<0$
- $a=2.5$: 펄스가 $1.5<\\tau<2.5$

에 나타난다.

따라서 문제 2.A2~2.A4에서 그린 결과와 일치한다.`},
        {
          "id": "5-2B",
          "title": "2.B.",
          "type": "python",
          "prompt": `문제 1.B의 py 스크립트와 문제 2.A5의 py 스크립트를 결합하여, $-5\\le\\tau\\le5$ 범위에서 $a$가 각각 $-1, -0.5, 0, 0.5, 1, 2.5, 3$일 때 $f_2(\\tau)f_1(a-\\tau)$의 모양을 갖는 벡터를 각각 생성하고, $\\tau$를 가로축으로 하여 각각의 그래프를 그리시오. ‘plt.subplot()’을 사용하여 하나의 창 안에서 7개의 그래프를 세로로 나열하여 그리고, 결과 그래프를 확인하시오.`
        ,
          referenceAnswer: `예시는 다음과 같다.

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

tau_step=0.01
tau=np.arange(-5,5,tau_step)

f2=((tau>-1)&(tau<0))-1*((tau>0)&(tau<1))
f1mirror=0.5*((tau>-1)&(tau<0))

a_list=[-1,-0.5,0,0.5,1,2.5,3]

plt.figure()

for i,a in enumerate(a_list):
    delay_samples=round(a/tau_step)
    f1mirror_delayed=np.roll(f1mirror,delay_samples)

    product=f2*f1mirror_delayed

    plt.subplot(7,1,i+1)
    plt.plot(tau,product)
    plt.axis([-5,5,-1,1])
    plt.grid()

plt.tight_layout()
\`\`\`

각 그래프는 주어진 $a$에 대한 $f_2(\\tau)f_1(a-\\tau)$의 모양을 나타낸다.`},
        {
          "id": "5-2C",
          "title": "2.C.",
          "type": "essay",
          "prompt": `$f_2(\\tau)f_1(a-\\tau)$의 그래프의 모양을 바탕으로, $a$와 상관없이 $\\int_{-\\infty}^{\\infty} f_2(\\tau)f_1(a-\\tau)\\,d\\tau$ 대신 $\\int_{-5}^{5} f_2(\\tau)f_1(a-\\tau)\\,d\\tau$를 사용하여도 같음을 설명하시오.`
        ,
          referenceAnswer: `$f_2(\\tau)$는 $-1<\\tau<1$ 밖에서 0이고, $f_1(a-\\tau)$도 폭이 1인 유한 구간에서만 0이 아니다.

따라서 두 함수의 곱
$$
f_2(\\tau)f_1(a-\\tau)
$$
은 모든 $a$에 대해 $[-5,5]$ 밖에서 0이다.

그러므로
$$
\\int_{-\\infty}^{\\infty}f_2(\\tau)f_1(a-\\tau)d\\tau
=
\\int_{-5}^{5}f_2(\\tau)f_1(a-\\tau)d\\tau
$$
로 계산해도 결과가 같다.`},
        { //문제 2.D
          "id": "5-2D",
          "title": "2.D.",    
          "prompt": `아래 py 스크립트는 수치적분을 이용하여, $t=0.2$일 때 $\\int_{-\\infty}^{\\infty} f_2(\\tau)f_1(t-\\tau)\\,d\\tau$를 구한다.
\`\`\`python      
import numpy as np

tau_step=0.01
tau=np.arange(-5,5,tau_step) #컨볼루션 적분 식은 적분 구간이 -에서 인데, 적분 구간을 -5에서 5로 하는 이유를 주석으로 쓰시오.
f2=((tau>-1)&(tau<0))-1*((tau>0)&(tau<1))
f1mirror=0.5*((tau>-1)&(tau<0))
 
t=0.2
delay_samples=round(t/tau_step)
f1mirror_delayed=np.roll(f1mirror, delay_samples)
 
print(sum(f2*f1mirror_delayed)*tau_step)
\`\`\`
          `,
        },
        {
          "id": "5-2D1",
          "title": "2.D1.",    
          "type": "python",
          starterCode: `import numpy as np

tau_step=0.01
tau=np.arange(-5,5,tau_step) #컨볼루션 적분 식은 적분 구간이 -∞에서 ∞인데, 적분 구간을 -5에서 5로 하는 이유를 주석으로 쓰시오.
f2=((tau>-1)&(tau<0))-1*((tau>0)&(tau<1))
f1mirror=0.5*((tau>-1)&(tau<0))
 
t=0.2
delay_samples=round(t/tau_step)
f1mirror_delayed=np.roll(f1mirror, delay_samples)
 
print(sum(f2*f1mirror_delayed)*tau_step)`,
          "prompt": `이 py 스크립트의 마지막 라인이 $\\int_{-\\infty}^{\\infty} f_2(\\tau)f_1(t-\\tau)\\,d\\tau$의 값을 수치적분으로 계산한 것이다. py 스크립트를 실행하여 결과를 확인하고, 컨볼루션 적분 식은 적분 구간이 $-\\infty$에서 $\\infty$인데, 적분 구간을 $-5$에서 $5$로 하는 이유를 주석으로 작성하시오.`
        ,
          referenceAnswer: `코드를 실행하면 $t=0.2$에서 컨볼루션 값은 약
$$
\\boxed{0.30}
$$
이 나온다.

적분 구간을 $[-5,5]$로 제한해도 되는 이유는 $f_2(\\tau)$와 $f_1(t-\\tau)$의 곱이 그 구간 밖에서 모두 0이기 때문이다.`},
        {
          "id": "5-2D2",
          "title": "2.D2.",    
          "type": "proof",
          "prompt": `$t=0.2$일 때 $\\int_{-\\infty}^{\\infty} f_2(\\tau)f_1(t-\\tau)\\,d\\tau$의 값을, 수식을 직접 적분하여 구하시오. 구한 과정을 작성하여, 구한 값이 문제 2.D1의 py 스크립트 실행 결과와 동일한 값이 나오는지 확인하시오.`,
        
          referenceAnswer: `$t=0.2$이면 $f_1(t-\\tau)$는
$$
-0.8<\\tau<0.2
$$
에서 0.5이다.

따라서
$$
\\int f_2(\\tau)f_1(0.2-\\tau)d\\tau
=
\\frac12\\int_{-0.8}^{0}1\\,d\\tau
+
\\frac12\\int_{0}^{0.2}(-1)\\,d\\tau.
$$

계산하면
$$
\\frac12(0.8)-\\frac12(0.2)
=0.4-0.1
=\\boxed{0.3}
$$
이다.

이는 Python의 수치적분 결과와 일치한다.`},
        {
          "id": "5-2D3",
          "title": "2.D3.",    
          "type": "python",
          starterCode: `import numpy as np

tau_step=0.01
tau=np.arange(-5,5,tau_step) #컨볼루션 적분 식은 적분 구간이 -∞에서 ∞인데, 적분 구간을 -5에서 5로 하는 이유를 주석으로 쓰시오.
f2=((tau>-1)&(tau<0))-1*((tau>0)&(tau<1))
f1mirror=0.5*((tau>-1)&(tau<0))
 
t=0.2
delay_samples=round(t/tau_step)
f1mirror_delayed=np.roll(f1mirror, delay_samples)
 
print(sum(f2*f1mirror_delayed)*tau_step)`,
          "prompt": `‘t=0.2’가 아닌 다른 값일 때의 $\\int_{-\\infty}^{\\infty} f_2(\\tau)f_1(t-\\tau)\\,d\\tau$의 값을 수치적분으로 계산하기 위해서는, 위 py 스크립트의 8번째 라인 ‘t=0.2’에서 ‘t’ 값을 수정하면 된다. $-1<t<2$의 범위에서 ‘t=0.2’가 아닌 다른 값으로 설정한 후 py 스크립트를 실행하여 결과를 확인하시오.`
        ,
          referenceAnswer: `학생이 선택한 $t$ 값에 따라 결과가 달라진다.

이 컨볼루션의 정확한 결과는
$$
(f_2*f_1)(t)=
\\begin{cases}
0, & t\\le-1\\\\
\\frac12(t+1), & -1<t<0\\\\
\\frac12-t, & 0\\le t<1\\\\
\\frac12t-1, & 1\\le t<2\\\\
0, & t\\ge2
\\end{cases}
$$
이다.

따라서 자신이 선택한 $t$를 위 식에 대입한 값과 Python 결과가 거의 같아야 한다.`},
        {
          "id": "5-2D4",
          "title": "2.D4.",    
          "type": "proof",
          "prompt": `문제 2.D3에서 자신이 설정한 $t$ 값에 대해 $\\int_{-\\infty}^{\\infty} f_2(\\tau)f_1(t-\\tau)\\,d\\tau$의 값을, 수식을 직접 적분하여 구하시오. 구한 과정을 작성하여, 구한 값이 문제 2.D3의 py 스크립트 실행 결과와 동일한 값이 나오는지 확인하시오.`,
        
          referenceAnswer: `학생이 문제 2.D3에서 선택한 $t$ 값에 대해 다음 식을 사용하면 된다.

$$
(f_2*f_1)(t)=
\\begin{cases}
0, & t\\le-1\\\\
\\frac12(t+1), & -1<t<0\\\\
\\frac12-t, & 0\\le t<1\\\\
\\frac12t-1, & 1\\le t<2\\\\
0, & t\\ge2
\\end{cases}
$$

해당 구간의 식을 선택하여 직접 적분한 결과가 Python 수치적분 결과와 일치함을 확인하면 된다.`},
        { //문제 2.E
          "id": "5-2E",
          "title": "2.E.",    
          "prompt": `아래 py 스크립트는 수치적분을 이용하여, $t=-3$에서 0.05 간격으로 $4$까지 증가하면서 $\\int_{-\\infty}^{\\infty} f_2(\\tau)f_1(t-\\tau)\\,d\\tau$를 구하고, 그 값들을 순서대로 원소로 갖는 벡터 ‘f2convf1’을 생성한다.
\`\`\`python      
import numpy as np
import matplotlib.pyplot as plt

tau_step=0.01
tau=np.arange(-5,5,tau_step)
f1mirror=0.5*((tau>-1)&(tau<0))
f2=((tau>-1)&(tau<0))-1*((tau>0)&(tau<1))
t_vector=np.empty(0)
f2convf1=np.empty(0)

for t in np.arange(?,?,0.05): #완성해야 할 부분

    delay_samples=round(t/tau_step)
    f1mirror_delayed=np.roll(f1mirror, delay_samples)
    f2convf1_at_t=sum(f2*f1mirror_delayed)*tau_step

    t_vector=np.append(t_vector,t)
    f2convf1=np.append(f2convf1,f2convf1_at_t)

plt.figure()
plt.plot(t_vector, f2convf1)
plt.grid()
\`\`\`
          `,
        },
        {
          "id": "5-2E1",
          "title": "2.E1.",    
          "type": "python",
          starterCode: `import numpy as np
import matplotlib.pyplot as plt

tau_step=0.01
tau=np.arange(-5,5,tau_step)
f1mirror=0.5*((tau>-1)&(tau<0))
f2=((tau>-1)&(tau<0))-1*((tau>0)&(tau<1))
t_vector=np.empty(0)
f2convf1=np.empty(0)

for t in np.arange(?,?,0.05): #완성해야 할 부분

    delay_samples=round(t/tau_step)
    f1mirror_delayed=np.roll(f1mirror, delay_samples)
    f2convf1_at_t=sum(f2*f1mirror_delayed)*tau_step

    t_vector=np.append(t_vector,t)
    f2convf1=np.append(f2convf1,f2convf1_at_t)

plt.figure()
plt.plot(t_vector, f2convf1)
plt.grid()`,
          "prompt": `?를 채워 py 스크립트를 완성하고, 실행하여 컨볼루션 결과 그래프를 확인하시오.`
        ,
          referenceAnswer: `빈칸은 \`-3\`, \`4\`이다.

\`\`\`python
for t in np.arange(-3,4,0.05):
\`\`\`

와 같이 작성한다.

실행 결과 $f_2*f_1$은 $-1<t<2$에서만 0이 아닌 조각별 선형 함수로 나타난다.`},
        {
          "id": "5-2E2",
          "title": "2.E2.",    
          "type": "essay",
          "prompt": `15번째 라인 ‘f2convf1_at_t=sum(f2*f1mirror_delayed)*tau_step’은 컨볼루션 수식 $\\int_{-\\infty}^{\\infty} f_2(\\tau)f_1(t-\\tau)\\,d\\tau$을 수치적분으로 구현한 것이므로, 이 라인이 실행되면 변수 ‘f2convf1_at_t’는 수치적분 값을 갖게 된다. 이것을 for-loop 안에서 반복하여 연산하는 이유를 쓰시오.`,
        
          referenceAnswer: `컨볼루션 결과는 하나의 $t$ 값에서만 필요한 것이 아니라 모든 $t$에 대한 함수
$$
(f_2*f_1)(t)
$$
를 구해야 한다.

따라서 \`for\` 문 안에서 $t$를 변화시키면서 각 $t$에 대한 수치적분값 \`f2convf1_at_t\`를 반복 계산한다. 이렇게 얻은 값들을 모으면 전체 컨볼루션 파형을 만들 수 있다.`},
        {
          "id": "5-2E3",
          "title": "2.E3.",    
          "type": "essay",
          "prompt": `위의 py 스크립트에서 변수 ‘f2convf1_at_t’와 ‘f2convf1’의 의미와 차이를 명확히 설명하시오.`,
        
          referenceAnswer: `\`f2convf1_at_t\`는 현재 반복문의 특정한 하나의 $t$에서 계산한 컨볼루션 값, 즉 하나의 스칼라이다.

반면 \`f2convf1\`은 각 $t$에서 구한 \`f2convf1_at_t\`를 순서대로 저장한 벡터이다.

즉,

- \`f2convf1_at_t\`: 한 시점의 컨볼루션 값
- \`f2convf1\`: 여러 시점의 값을 모은 전체 컨볼루션 샘플 벡터

이다.`},
        { //문제 2.F
          "id": "5-2F",
          "title": "2.F.",
          "prompt": `문제 2.E의 결과가 맞는지 직접 검증해보자.`,
        },
        {
          "id": "5-2F1",
          "title": "2.F1.",
          "type": "proof",
          "prompt": `[그림 5.1]과 [그림 5.2]에 주어진 $f_1(t)$와 $f_2(t)$에 대하여, $f_2(t)*f_1(t)$를 수식으로 전개하시오.`,
        
          referenceAnswer: `컨볼루션은
$$
(f_2*f_1)(t)=
\\int_{-\\infty}^{\\infty}
f_2(\\tau)f_1(t-\\tau)d\\tau
$$
이다.

주어진 두 함수에 대해 정리하면
$$
\\boxed{
(f_2*f_1)(t)=
\\begin{cases}
0, & t\\le-1\\\\
\\frac12(t+1), & -1<t<0\\\\
\\frac12-t, & 0\\le t<1\\\\
\\frac12t-1, & 1\\le t<2\\\\
0, & t\\ge2
\\end{cases}
}
$$
이다.`},
        {
          "id": "5-2F2",
          "title": "2.F2.",
          "prompt": `문제 2.F1에서 답한 $f_2(t)*f_1(t)$의 그래프를 그리시오.`,
          "type": "graph",
          graphInputMode: "both",
          graphXMin: -3,
          graphXMax: 4,
          graphYMin: -1,
          graphYMax: 1,
          graphXAxisLabel: "t",
          graphYAxisLabel: "f₂(t)*f₁(t)",
          graphShowGrid: true,
        
          referenceAnswer: `그래프는 다음 점들을 직선으로 연결한 모양이다.

$$
(-1,0)\\rightarrow(0,0.5)\\rightarrow(1,-0.5)\\rightarrow(2,0)
$$

그리고 $t\\le-1$ 및 $t\\ge2$에서는 0이다.`},
        {
          "id": "5-2F3",
          "title": "2.F3.",
          "type": "essay",
          "prompt": `문제 2.F2의 그래프와 문제 2.E1의 그래프가 일치하는지 확인하시오.`,
        
          referenceAnswer: `문제 2.E1의 수치적분 그래프와 문제 2.F2에서 직접 구한 조각별 선형 그래프는 거의 동일하다.

샘플 간격과 수치적분으로 인한 작은 오차를 제외하면 두 결과가 일치하므로 Python으로 구현한 컨볼루션 계산이 올바름을 확인할 수 있다.`},
      ]
    },
    { //문제 3
      "id": "5-3",
      "title": "3. 임펄스 함수(Impulse Function)와 컨볼루션",
      "problems": [
        { //문제 3.A
          "id": "5-3A",
          "title": "3.A.",
          "prompt": `원점에 존재하는 임펄스 함수와 컨볼루션의 관계를 알아보자.
          
아래 py 스크립트는 $f_1(t)$의 샘플링 벡터 ‘f1’을 변경하여 [그림 5.1]의 $f_1(t)$와는 다른 형태의 $f_1(t)$을 생성한다.
\`\`\`python      
import numpy as np
import matplotlib.pyplot as plt

t_step=0.01
t=np.arange(-5,5,t_step)
f1=1/t_step*(np.round(t,2)==0)
plt.figure(); plt.plot(t,f1)
plt.axis([-5, 5, -5, 10]); plt.grid()
\`\`\`
`,
        },
        {
          "id": "5-3A1",
          "title": "3.A1.",
          "type": "python",
          "prompt": `py 스크립트를 실행하고, 결과 그래프를 확인하시오.`,
          starterCode: `import numpy as np
import matplotlib.pyplot as plt

t_step=0.01
t=np.arange(-5,5,t_step)
f1=1/t_step*(np.round(t,2)==0)
plt.figure(); plt.plot(t,f1)
plt.axis([-5, 5, -5, 10]); plt.grid()`,
        
          referenceAnswer: `실행 결과 원점 $t=0$에서만 매우 큰 값을 갖고 다른 샘플에서는 0인 좁은 펄스가 나타난다.

펄스의 높이는
$$
\\frac1{t_{\\text{step}}}=100
$$
이고 폭은 약 $0.01$ s이므로 면적은 약 1이다.`},
        {
          "id": "5-3A2",
          "title": "3.A2.",
          "type": "essay",
          "prompt": `문제 3.A1의 결과 그래프를 보면, $f_1(t)$는 잘 알려진 어떤 함수와 근사한다. 그 함수의 이름을 쓰시오.`
        ,
          referenceAnswer: `그래프는 원점에서 매우 좁고 높으며 면적이 1인 형태이므로
$$
\\boxed{\\delta(t)}
$$
즉, 임펄스 함수(Dirac delta function)를 근사한 것이다.`},
        {
          "id": "5-3A3",
          "title": "3.A3.",
          "type": "python",
          "prompt": `문제 2.E에서 $f_1(-\\tau)$의 샘플링 벡터 ‘f1mirror’를 생성하여 사용한다.
          
문제 2.E의 py 스크립트를 복사하여 붙여넣은 후, 6번째 라인 ‘f1mirror=0.5*((tau>-1)&(tau<0))’을 ‘f1mirror=1/tau_step*(round(tau,2)==0)’로 수정하면, $f_2(t)$와 문제 3.A1에서 확인한 $f_1(t)$의 컨볼루션 결과를 얻을 수 있다. 수정한 py 스크립트를 실행하고, 컨볼루션 결과 그래프를 확인하시오.`
        ,
          referenceAnswer: `수정한 \`f1mirror\`를 사용하여 컨볼루션을 계산하면 결과 파형은 $f_2(t)$와 거의 같은 모양으로 나타난다.

샘플 기반 임펄스 근사와 수치적분 때문에 경계에서 아주 작은 오차가 있을 수 있다.`},
        {
          "id": "5-3A4",
          "title": "3.A4.",
          "type": "essay",
          "prompt": `문제 3.A3의 그래프와 $f_2(t)$의 그래프의 모양을 비교하시오. 비교 결과를 바탕으로 컨볼루션의 중요한 공식(성질) 중 하나를 유추하여 쓰시오.`
        ,
          referenceAnswer: `실험 결과
$$
f_2(t)*\\delta(t)
=
f_2(t)
$$
임을 확인할 수 있다.

즉,
$$
\\boxed{
f(t)*\\delta(t)=f(t)
}
$$
이며 임펄스 함수는 컨볼루션의 항등원이다.`},
        { //문제 3.B
          "id": "5-3B",
          "title": "3.B.",
          "prompt": `지연된 임펄스 함수와 컨볼루션의 관계를 알아보자.`,
        },
        {
          "id": "5-3B1",
          "title": "3.B1.",
          "type": "python",
          "prompt": `문제 3.A1의 py 스크립트에서 5번째 라인 ‘f1=1/t_step*(np.round(t,2)==0)’을 ‘f1=1/t_step*(np.round(t,2)==1.5)’로 수정하자. 수정한 py 스크립트를 실행하고 결과 그래프를 확인하시오.`,
          starterCode: `import numpy as np
import matplotlib.pyplot as plt

t_step=0.01
t=np.arange(-5,5,t_step)
f1=1/t_step*(np.round(t,2)==0)
plt.figure(); plt.plot(t,f1)
plt.axis([-5, 5, -5, 10]); plt.grid()`,
        
          referenceAnswer: `수정 후 $t=1.5$에서만 큰 값을 갖는 좁은 펄스가 나타난다.

즉, 그래프는
$$
\\boxed{\\delta(t-1.5)}
$$
를 샘플링으로 근사한 형태이다.`},
        {
          "id": "5-3B2",
          "title": "3.B2.",
          "type": "essay",
          "prompt": `수정한 문제 3.B1의 $f_1(t)$의 그래프와, 수정하기 전 문제 3.A1의 $f_1(t)$의 그래프가 어떤 차이가 있는지 쓰시오.`
        ,
          referenceAnswer: `문제 3.A1은 원점에 있는 $\\delta(t)$를 근사하고, 문제 3.B1은 그 임펄스를 오른쪽으로 1.5만큼 이동시킨 형태이다.

따라서
$$
\\boxed{
\\delta(t)\\rightarrow\\delta(t-1.5)
}
$$
의 관계이다.`},
        {
          "id": "5-3B3",
          "title": "3.B3.",
          "type": "python",
          "prompt": `문제 3.A3의 py 스크립트를 복사하여 붙여넣은 후, 6번째 라인 ‘f1mirror=1/tau_step*(round(tau,2)==0)’을 ‘f1mirror=1/tau_step*(round(tau,2)==-1.5)’로 수정하면, $f_2(t)$와 문제 3.B1에서 확인한 $f_1(t)$의 컨볼루션 결과를 얻을 수 있다. 수정한 py 스크립트를 실행하고, 컨볼루션 결과 그래프를 확인하시오.`
        ,
          referenceAnswer: `수정한 코드를 실행하면 컨볼루션 결과는 원래 $f_2(t)$를 오른쪽으로 1.5만큼 이동시킨 형태로 나타난다.

즉, 결과는
$$
f_2(t-1.5)
$$
와 거의 같다.`},
        {
          "id": "5-3B4",
          "title": "3.B4.",
          "type": "essay",
          "prompt": `문제 3.B3의 그래프와 $f_2(t)$의 그래프의 모양을 비교하시오. 비교 결과를 바탕으로 문제 3.A4에서 자신이 유추하여 쓴 컨볼루션의 중요한 공식(성질)을 일반화하여 쓰시오.`
        ,
          referenceAnswer: `문제 3.A4의 성질을 일반화하면
$$
\\boxed{
f(t)*\\delta(t-t_0)=f(t-t_0)
}
$$
이다.

즉, 어떤 함수를 $t_0$만큼 지연된 임펄스와 컨볼루션하면 그 함수도 $t_0$만큼 지연된다.`},
      ]
    },
    { //문제 4
      "id": "5-4",
      "title": "4. 컨볼루션의 주파수 축 분석",
      "problems": [
        { //문제 4.A
          "id": "5-4A",
          "title": "4.A.",
          "prompt": `[[link:/workbook/ch4?p=4-4C1|4장의 문제 4.C]]의 py 스크립트를 참고하여, [그림 5.1]의 $f_1(t)$과 [그림 5.2]의 $f_2(t)$의 샘플링 벡터 ‘f1’, ‘f2’에 대한 푸리에 변환 ‘Fw1’, ‘Fw2’를 수치적분으로 구하고, ‘Fw1’, ‘Fw2’ 각각의 진폭 스펙트럼과 위상(Phase) 스펙트럼을 그려보자.
\`\`\`python  
import numpy as np
import matplotlib.pyplot as plt
import pickle

tstep=0.01
t=np.arange(-5,5,tstep)
f1=0.5*((t>0)&(t<1))
f2=((t>-1)&(t<0))-1*((t>0)&(t<1))

Fw1=np.empty(0)
Fw2=np.empty(0)
w_vector=np.empty(0)
w_step=2*np.pi*0.01
for w in np.arange(2*np.pi*?,2*np.pi*?,w_step): #완성해야 할 부분 (1), 주파수 단위가 rad/sec임을 유의할 것.

    Fw1_at_w=sum(f1*np.exp(-1j*w*t))*tstep
    Fw2_at_w=? #완성해야 할 부분 (2)
    
    w_vector=np.append(w_vector,w)
    
    Fw1=np.append(Fw1,Fw1_at_w)
    Fw2=np.append(Fw2,Fw2_at_w)

data=[Fw1,Fw2]
with open('Fw1_Fw2.pkl','wb') as f: pickle.dump(data,f)
plt.figure(1)
plt.subplot(2,1,1)
plt.plot(w_vector, abs(Fw1)) #f1(t)의 진폭 스펙트럼
plt.subplot(2,1,2)
plt.plot(w_vector, np.angle(Fw1)) #f1(t)의 위상 스펙트럼
plt.figure(2)
plt.subplot(2,1,1)
plt.plot(w_vector, abs(Fw2)) #f2(t)의 진폭 스펙트럼
plt.subplot(2,1,2)
plt.plot(w_vector, np.angle(Fw2)) #f2(t)의 위상 스펙트럼
\`\`\``,
        },
        {
          "id": "5-4A1",
          "title": "4.A1.",
          "type": "python",
          starterCode: `import numpy as np
import matplotlib.pyplot as plt
import pickle

tstep=0.01
t=np.arange(-5,5,tstep)
f1=0.5*((t>0)&(t<1))
f2=((t>-1)&(t<0))-1*((t>0)&(t<1))

Fw1=np.empty(0)
Fw2=np.empty(0)
w_vector=np.empty(0)
w_step=2*np.pi*0.01
for w in np.arange(2*np.pi*?,2*np.pi*?,w_step): #완성해야 할 부분 (1), 주파수 단위가 rad/sec임을 유의할 것.

    Fw1_at_w=sum(f1*np.exp(-1j*w*t))*tstep
    Fw2_at_w=? #완성해야 할 부분 (2)
    
    w_vector=np.append(w_vector,w)
    
    Fw1=np.append(Fw1,Fw1_at_w)
    Fw2=np.append(Fw2,Fw2_at_w)

data=[Fw1,Fw2]
with open('Fw1_Fw2.pkl','wb') as f: pickle.dump(data,f)
plt.figure(1)
plt.subplot(2,1,1)
plt.plot(w_vector, abs(Fw1)) #f1(t)의 진폭 스펙트럼
plt.subplot(2,1,2)
plt.plot(w_vector, np.angle(Fw1)) #f1(t)의 위상 스펙트럼
plt.figure(2)
plt.subplot(2,1,1)
plt.plot(w_vector, abs(Fw2)) #f2(t)의 진폭 스펙트럼
plt.subplot(2,1,2)
plt.plot(w_vector, np.angle(Fw2)) #f2(t)의 위상 스펙트럼`,
          "prompt": `주파수 변수 ‘w’의 범위는 -10Hz에서 10Hz까지, 주파수 간격은 0.01Hz가 되도록 위 py 스크립트의 ?를 채워 완성하고, 수행한 결과 그래프를 확인하시오. (주파수 변수 ‘w’는 단위가 rad/sec임에 유의할 것)`,
          referenceAnswer: `
\`\`\`python  
import numpy as np
import matplotlib.pyplot as plt
import pickle

tstep=0.01
t=np.arange(-5,5,tstep)
f1=0.5*((t>0)&(t<1))
f2=((t>-1)&(t<0))-1*((t>0)&(t<1))

Fw1=np.empty(0)
Fw2=np.empty(0)
w_vector=np.empty(0)
w_step=2*np.pi*0.01
for w in np.arange(2*np.pi*-10,2*np.pi*10,w_step): #완성해야 할 부분 (1), 주파수 단위가 rad/sec임을 유의할 것.

    Fw1_at_w=sum(f1*np.exp(-1j*w*t))*tstep
    Fw2_at_w=sum(f2*np.exp(-1j*w*t))*tstep #완성해야 할 부분 (2)
    
    w_vector=np.append(w_vector,w)
    
    Fw1=np.append(Fw1,Fw1_at_w)
    Fw2=np.append(Fw2,Fw2_at_w)

data=[Fw1,Fw2]
with open('Fw1_Fw2.pkl','wb') as f: pickle.dump(data,f)
plt.figure(1)
plt.subplot(2,1,1)
plt.plot(w_vector, abs(Fw1)) #f1(t)의 진폭 스펙트럼
plt.subplot(2,1,2)
plt.plot(w_vector, np.angle(Fw1)) #f1(t)의 위상 스펙트럼
plt.figure(2)
plt.subplot(2,1,1)
plt.plot(w_vector, abs(Fw2)) #f2(t)의 진폭 스펙트럼
plt.subplot(2,1,2)
plt.plot(w_vector, np.angle(Fw2)) #f2(t)의 위상 스펙트럼
\`\`\`          
          `
        },
        {
          "id": "5-4A2",
          "title": "4.A2.",
          "type": "essay",
          "prompt": `문제 4.A1의 py 스크립트에서 16번째 라인 ‘Fw1_at_w=sum(f1*np.exp(-1j*w*t))*tstep’은 푸리에 변환 수식 $\\int_{-\\infty}^{\\infty} f_1(t)e^{-j\\omega t}\\,dt$을 수치적분으로 구현한 것이다. 이것을 for-loop 안에서 반복적으로 실행해야 하는 이유를 쓰시오.`
        ,
          referenceAnswer: `푸리에 변환 $F_1(\\omega)$는 하나의 숫자가 아니라 주파수 $\\omega$에 따른 함수이다.

따라서 원하는 주파수 범위 전체의 스펙트럼을 얻으려면 각 $\\omega$마다
$$
F_1(\\omega)
=
\\int f_1(t)e^{-j\\omega t}dt
$$
를 반복 계산해야 한다.

\`for\` 문은 $\\omega$를 일정한 간격으로 변화시키면서 각 주파수에서의 푸리에 변환값을 계산하기 위해 사용된다.`},
        { //문제 4.B
          "id": "5-4B",
          "title": "4.B.",
          "type": "python",
          starterCode: `import numpy as np
import matplotlib.pyplot as plt

tau_step=0.01
tau=np.arange(-5,5,tau_step)
f1mirror=0.5*((tau>=-1)&(tau<0))
f2=((tau>=-1)&(tau<=0))-1*((tau>=0)&(tau<=1))

t_vector=np.empty(0); f2convf1=np.empty(0)
w_vector=np.empty(0); Fourier_f2convf1=np.empty(0)
tstep=0.05

for t in np.arange(-3,4,tstep):
    delay_samples=round(t/tau_step)
    f1mirror_delayed=np.roll(f1mirror, delay_samples)
    f2convf1_at_t=sum(f2*f1mirror_delayed)*tau_step #f2와 f1의 콘볼루션
    
    t_vector=np.append(t_vector,t)
    f2convf1=np.append(f2convf1,f2convf1_at_t)
    
for w in np.arange(2*np.pi*-10, 2*np.pi*10, 2*np.pi*0.01):
    Fourier_f2convf1_at_w=sum(?*np.exp(-1j*?*t_vector))*tstep
    w_vector=np.append(w_vector, w)
    Fourier_f2convf1=np.append(Fourier_f2convf1, Fourier_f2convf1_at_w)

plt.figure()
plt.subplot(2,1,1)
plt.plot(w_vector, abs(Fourier_f2convf1)) #f1(t)*f2(t)의 진폭 스펙트럼
plt.subplot(2,1,2)
plt.plot(w_vector, ?) #f1(t)*f2(t)의 위상 스펙트럼`,
          "prompt": `아래는 $f_1(t)$와 $f_2(t)$의 컨볼루션인 $f_1(t)*f_2(t)$를 수치적분을 통해 구하고, $f_1(t)*f_2(t)$의 푸리에 변환을 구하는 py 스크립트이다.
\`\`\`python  
import numpy as np
import matplotlib.pyplot as plt

tau_step=0.01
tau=np.arange(-5,5,tau_step)
f1mirror=0.5*((tau>=-1)&(tau<0))
f2=((tau>=-1)&(tau<=0))-1*((tau>=0)&(tau<=1))

t_vector=np.empty(0); f2convf1=np.empty(0)
w_vector=np.empty(0); Fourier_f2convf1=np.empty(0)
tstep=0.05

for t in np.arange(-3,4,tstep):
    delay_samples=round(t/tau_step)
    f1mirror_delayed=np.roll(f1mirror, delay_samples)
    f2convf1_at_t=sum(f2*f1mirror_delayed)*tau_step #f2와 f1의 콘볼루션
    
    t_vector=np.append(t_vector,t)
    f2convf1=np.append(f2convf1,f2convf1_at_t)
    
for w in np.arange(2*np.pi*-10, 2*np.pi*10, 2*np.pi*0.01):
    Fourier_f2convf1_at_w=sum(?*np.exp(-1j*?*t_vector))*tstep
    w_vector=np.append(w_vector, w)
    Fourier_f2convf1=np.append(Fourier_f2convf1, Fourier_f2convf1_at_w)

plt.figure()
plt.subplot(2,1,1)
plt.plot(w_vector, abs(Fourier_f2convf1)) #f1(t)*f2(t)의 진폭 스펙트럼
plt.subplot(2,1,2)
plt.plot(w_vector, ?) #f1(t)*f2(t)의 위상 스펙트럼
\`\`\`  
변수 ‘f2convf1’는 $f_1(t)*f_2(t)$의 시간 축 샘플링 벡터이고, ‘Fourier_f2convf1’는 $f_1(t)*f_2(t)$의 푸리에 변환 $F[f_1(t)*f_2(t)]$을 주파수 축에서 샘플링한 벡터이다. py 스크립트를 마저 완성한 후, 실행하여 $f_1(t)*f_2(t)$의 진폭 스펙트럼과 위상 스펙트럼을 확인하시오.`,
          referenceAnswer: `
\`\`\`python  
import numpy as np
import matplotlib.pyplot as plt

tau_step=0.01
tau=np.arange(-5,5,tau_step)
f1mirror=0.5*((tau>=-1)&(tau<0))
f2=((tau>=-1)&(tau<=0))-1*((tau>=0)&(tau<=1))

t_vector=np.empty(0); f2convf1=np.empty(0)
w_vector=np.empty(0); Fourier_f2convf1=np.empty(0)
tstep=0.05

for t in np.arange(-3,4,tstep):
    delay_samples=round(t/tau_step)
    f1mirror_delayed=np.roll(f1mirror, delay_samples)
    f2convf1_at_t=sum(f2*f1mirror_delayed)*tau_step #f2와 f1의 콘볼루션
    
    t_vector=np.append(t_vector,t)
    f2convf1=np.append(f2convf1,f2convf1_at_t)
    
for w in np.arange(2*np.pi*-10, 2*np.pi*10, 2*np.pi*0.01):
    Fourier_f2convf1_at_w=sum(f2convf1*np.exp(-1j*w*t_vector))*tstep
    w_vector=np.append(w_vector, w)
    Fourier_f2convf1=np.append(Fourier_f2convf1, Fourier_f2convf1_at_w)

plt.figure()
plt.subplot(2,1,1)
plt.plot(w_vector, abs(Fourier_f2convf1)) #f1(t)*f2(t)의 진폭 스펙트럼
plt.subplot(2,1,2)
plt.plot(w_vector, np.angle(Fourier_f2convf1)) #f1(t)*f2(t)의 위상 스펙트럼
\`\`\`
`
        },
        {
          "id": "5-4C",
          "title": "4.C.",
          "type": "python",
          consoleEnabled: true,
          "prompt": `문제 4.A의 py 스크립트에서 ‘f1’과 ‘f2’의 푸리에 변환, 즉 ‘Fw1’과 ‘Fw2’를 생성하여 ‘Fw1_Fw2.pkl’에 저장하였다.
(주의. 브라우저를 새로고침했거나 Chapter를 나갔다가 다시 들어오면 저장된 ‘Fw1_Fw2.pkl’이 사라지므로, 이 경우 문제 4.A1의 py 스크립트를 다시 실행할 것)
          
문제 4.B에서 완성한 py 스크립트를 복사하여 붙여넣고 실행한 후, 아래 명령어를 Console에서 실행하고, 결과 그래프를 확인하시오.
\`\`\`python  
>>> import pickle
>>> with open('Fw1_Fw2.pkl','rb') as f: Fw1, Fw2=pickle.load(f)
>>> plt.close()
>>> plt.plot(w_vector,abs(Fw1*Fw2-Fourier_f2convf1))
>>> plt.axis([-10,10,-2,2])
\`\`\`
결과 그래프를 바탕으로 ‘Fourier_f2convf1’과 ‘Fw1*Fw2’가 같다고 할 수 있는가? 이 결과를 바탕으로 컨볼루션의 중요한 공식(성질) 중 하나를 유추하여 쓰시오.`
        ,
          referenceAnswer: `그래프 \`abs(Fw1*Fw2-Fourier_f2convf1)\`가 거의 0에 가까우므로
$$
\\boxed{
\\mathcal{F}[f_1*f_2]
=
F_1(\\omega)F_2(\\omega)
}
$$
라고 할 수 있다.

즉, 시간영역에서의 컨볼루션은 주파수영역에서의 곱셈에 대응한다.

수치적분과 샘플링 오차 때문에 완전히 0이 아닌 아주 작은 차이는 나타날 수 있다.`},
        {
          "id": "5-4D",
          "title": "4.D.",
          "type": "essay",
          "prompt": `임펄스 응답이 $h(t)$인 선형 시스템의 입력에 $f(t)$가 인가되면, 그 출력 $g(t)$는 $f(t)$와 $h(t)$의 시간 축 컨볼루션이 된다. 하지만, 문제 4.C에서 답한 컨볼루션의 중요한 성질을 이용하면, 실제 시간 축 컨볼루션을 수행하지 않고 다른 방법으로 출력 $g(t)$를 구할 수 있다. 그 방법을 구체적으로 쓰시오.`,
        
          referenceAnswer: `선형 시스템의 출력이
$$
g(t)=f(t)*h(t)
$$
이면 컨볼루션 정리에 의해
$$
G(\\omega)=F(\\omega)H(\\omega)
$$
이다.

따라서 시간영역에서 직접 컨볼루션을 수행하지 않고

1. 입력 $f(t)$를 푸리에 변환하여 $F(\\omega)$를 구한다.
2. 임펄스응답 $h(t)$를 푸리에 변환하여 $H(\\omega)$를 구한다.
3. 주파수영역에서 $F(\\omega)H(\\omega)$를 계산한다.
4. 그 결과를 역푸리에 변환하여 $g(t)$를 얻는다.

와 같이 출력 신호를 구할 수 있다.`},
        {
          "id": "5-4E",
          "title": "4.E.",
          "prompt": `두 함수 $f_1(t)=e^{-(k+1)t}u(t)$, $f_2(t)=e^{-t}u(t)$라고 할 때, 다음 물음에 답하시오. (여기서 $k$는 자신의 학번 끝자리 수)`,
        },
        {
          "id": "5-4E1",
          "title": "4.E1.",
          "type": "proof",
          "prompt": `두 함수의 콘볼루션 $f_1(t)*f_2(t)$를 구하시오.`,
        
          referenceAnswer: `두 함수는 인과 신호이므로 $t<0$에서는 컨볼루션 결과가 0이다.

$t\\ge0$에서
$$
(f_1*f_2)(t)
=
\\int_0^t
e^{-(k+1)\\tau}e^{-(t-\\tau)}d\\tau.
$$

$k\\neq0$이면
$$
(f_1*f_2)(t)
=
e^{-t}\\int_0^t e^{-k\\tau}d\\tau
=
\\boxed{
\\frac{e^{-t}-e^{-(k+1)t}}{k}u(t)
}.
$$

만약 학번 끝자리 $k=0$이면
$$
\\boxed{
(f_1*f_2)(t)=te^{-t}u(t)
}
$$
이다.`},
        {
          "id": "5-4E2",
          "title": "4.E2.",
          "type": "proof",
          "prompt": `문제 4.E1에서 얻은 $f_1(t)*f_2(t)$의 푸리에 변환을 구하시오.`,
        
          referenceAnswer: `$k\\neq0$에서
$$
f_1*f_2
=
\\frac1k
\\left[
e^{-t}-e^{-(k+1)t}
\\right]u(t)
$$
이므로
$$
\\mathcal{F}[f_1*f_2]
=
\\frac1k
\\left[
\\frac1{1+j\\omega}
-
\\frac1{k+1+j\\omega}
\\right].
$$

정리하면
$$
\\boxed{
\\mathcal{F}[f_1*f_2]
=
\\frac1{(1+j\\omega)(k+1+j\\omega)}
}
$$
이다.

$k=0$인 경우에도 결과는
$$
\\boxed{\\frac1{(1+j\\omega)^2}}
$$
가 된다.`},
        {
          "id": "5-4E3",
          "title": "4.E3.",
          "type": "proof",
          "prompt": `$f_1(t)$의 푸리에 변환 $F_1(\\omega)$를 구하시오.`,
        
          referenceAnswer: `푸리에 변환 정의를 이용하면
$$
F_1(\\omega)
=
\\int_0^\\infty
e^{-(k+1)t}e^{-j\\omega t}dt
$$
이므로
$$
\\boxed{
F_1(\\omega)
=
\\frac1{k+1+j\\omega}
}
$$
이다.`},
        {
          "id": "5-4E4",
          "title": "4.E4.",
          "type": "proof",
          "prompt": `$f_2(t)$의 푸리에 변환 $F_2(\\omega)$를 구하시오.`,
        
          referenceAnswer: `마찬가지로
$$
F_2(\\omega)
=
\\int_0^\\infty
e^{-t}e^{-j\\omega t}dt
$$
이므로
$$
\\boxed{
F_2(\\omega)
=
\\frac1{1+j\\omega}
}
$$
이다.`},
        {
          "id": "5-4E5",
          "title": "4.E5.",
          "type": "proof",
          "prompt": `문제 4.E2의 답과 $F_1(\\omega) \\times F_2(\\omega)$의 답이 같음을 보이시오.`,
        
          referenceAnswer: `문제 4.E3과 4.E4의 결과를 곱하면
$$
F_1(\\omega)F_2(\\omega)
=
\\frac1{k+1+j\\omega}
\\frac1{1+j\\omega}
$$
이므로
$$
\\boxed{
F_1(\\omega)F_2(\\omega)
=
\\frac1{(1+j\\omega)(k+1+j\\omega)}
}
$$
이다.

이는 문제 4.E2에서 구한 $\\mathcal{F}[f_1*f_2]$와 동일하므로 컨볼루션 정리를 다시 확인할 수 있다.`},
      ]
    },
    { //문제 5
      "id": "5-5",
      "title": "5. 여러 가지 시간영역 연산의 주파수 축 분석",
      "problems": [
        { //문제 5.A
          "id": "5-5A",
          "title": "5.A.",
          "prompt": `시간영역에서 신호를 확대·축소하거나 지연시키고, 정현파 또는 복소지수함수를 곱하는 연산은 주파수영역의 스펙트럼을 변화시킨다.

본 문제에서는 4개의 실습 데이터 'ch5/xt.mat', 'yt.mat', 'zt.mat', 'wt.mat'을 이용하여 시간영역 파형을 관찰하고, Fourier Transform의 여러 성질을 이용하여 스펙트럼을 먼저 예측한 후 'spectrum_view()'로 확인한다.

(주의. 스펙트럼 예측 문항에서는 실험 결과를 실행하기 전에 먼저 이론적인 스펙트럼을 예측하고, 그 근거가 되는 Fourier Transform 성질을 함께 쓰시오.)

아래 py 스크립트로 4개의 실습 신호를 불러오시오. 각 파일은 첫 번째 행에 시간, 두 번째 행에 신호값이 저장되어 있다.
\`\`\`python  
import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat

file_load("ch5/xt.mat")
file_load("ch5/yt.mat")
file_load("ch5/zt.mat")
file_load("ch5/wt.mat")

xt = loadmat("xt.mat")["xt"]
yt = loadmat("yt.mat")["yt"]
zt = loadmat("zt.mat")["zt"]
wt = loadmat("wt.mat")["wt"]

# Spectrum Analyzer 조건에 맞추기 위하여 16 kHz의 공통 시간축으로 변환. 실습과 상관없는 부분.
fs = 16e3
t = np.arange(0, 10, 1/fs)

xA = np.interp(t, xt[0], xt[1])
xB = np.interp(t, yt[0], yt[1])
xC = np.interp(t, zt[0], zt[1])
xD = np.interp(t, wt[0], wt[1])
\`\`\`
`
        },
        {
          "id": "5-5A1",
          "title": "5.A1.",
          "type": "python",
          responseEnabled: true,
          starterCode: `import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat

file_load("ch5/xt.mat")
file_load("ch5/yt.mat")
file_load("ch5/zt.mat")
file_load("ch5/wt.mat")

xt = loadmat("xt.mat")["xt"]
yt = loadmat("yt.mat")["yt"]
zt = loadmat("zt.mat")["zt"]
wt = loadmat("wt.mat")["wt"]

# Spectrum Analyzer 조건에 맞추기 위하여 16 kHz의 공통 시간축으로 변환. 실습과 상관없는 부분.
fs = 16e3
t = np.arange(0, 10, 1/fs)

xA = np.interp(t, xt[0], xt[1])
xB = np.interp(t, yt[0], yt[1])
xC = np.interp(t, zt[0], zt[1])
xD = np.interp(t, wt[0], wt[1])

#문제 5.A의 py 스크립트에 아래를 추가.
plt.figure(figsize=(10, 8))

signals = [xA, xB, xC, xD]
titles = ["A", "B", "C", "D"]

for i, sig in enumerate(signals):
    plt.subplot(4, 1, i+1)
    plt.plot(t, sig)
    plt.xlim(0, 0.2)
    plt.ylabel(titles[i])
    plt.grid()

plt.xlabel("Time (s)")
plt.tight_layout()`,
          "prompt": `아래 py 스크립트를 추가하여, 처음 $0.2$초 구간을 한 Figure에 나타내자.
\`\`\`python  
#문제 5.A의 py 스크립트에 아래를 추가.
plt.figure(figsize=(10, 8))

signals = [xA, xB, xC, xD]
titles = ["A", "B", "C", "D"]

for i, sig in enumerate(signals):
    plt.subplot(4, 1, i+1)
    plt.plot(t, sig)
    plt.xlim(0, 0.2)
    plt.ylabel(titles[i])
    plt.grid()

plt.xlabel("Time (s)")
plt.tight_layout()
\`\`\`
파형의 피크와 주변 모양을 비교하여 A의 신호를 $x(t)$라 할 때 B, C, D를 $x(t)$를 이용한 식으로 나타내시오.
`
        ,
          referenceAnswer: `파형을 비교하면

$$
\\boxed{
B=x(t/2)
}
$$

$$
\\boxed{
C=x(2t)
}
$$

$$
\\boxed{
D=x(t-0.05)
}
$$

이다.

즉, B는 A를 시간축에서 2배 늘린 신호, C는 1/2로 압축한 신호, D는 A를 0.05초 지연한 신호이다.`},
        {
          "id": "5-5A2",
          "title": "5.A2.",
          "type": "essay",
          "prompt": `A, B, C, D의 파형을 비교하여 같은 시간 동안 신호의 변화가 적은 것부터 많은 것 순으로 나열하시오. 또한 그 순서로 판단한 이유를 설명하시오.`
        ,
          referenceAnswer: `같은 시간 동안 변화가 적은 것부터 많은 것 순으로 보면
$$
\\boxed{
B < A=D < C
}
$$
이다.

B는 시간축으로 늘어나 가장 천천히 변하고, C는 압축되어 가장 빠르게 변한다. D는 A를 시간 이동했을 뿐 신호 자체의 변화 속도는 같으므로 A와 D는 같은 수준으로 볼 수 있다.`},
        { //문제 5.B
          "id": "5-5B",
          "title": "5.B.",
          "prompt": `$x(t)$의 magnitude spectrum을 확인하자.`
        },
        {
          "id": "5-5B1",
          "title": "5.B1.",
          "type": "python",
          starterCode: `import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat

file_load("ch5/xt.mat")
file_load("ch5/yt.mat")
file_load("ch5/zt.mat")
file_load("ch5/wt.mat")

xt = loadmat("xt.mat")["xt"]
yt = loadmat("yt.mat")["yt"]
zt = loadmat("zt.mat")["zt"]
wt = loadmat("wt.mat")["wt"]

# Spectrum Analyzer 조건에 맞추기 위하여 16 kHz의 공통 시간축으로 변환. 실습과 상관없는 부분.
fs = 16e3
t = np.arange(0, 10, 1/fs)

xA = np.interp(t, xt[0], xt[1])
xB = np.interp(t, yt[0], yt[1])
xC = np.interp(t, zt[0], zt[1])
xD = np.interp(t, wt[0], wt[1])

#문제 5.A의 py 스크립트에 아래를 추가.
spectrum_view(xA, fs, units="Watts", frequency_limit_hz=8e3)`,
          "prompt": `문제 5.A의 py 스크립트에, A 신호에 대하여 아래를 추가하여 실행하고, 결과를 확인하시오.
\`\`\`python  
#문제 5.A의 py 스크립트에 아래를 추가.
spectrum_view(xA, fs, units="Watts", frequency_limit_hz=8e3)
\`\`\`
`
        ,
          referenceAnswer: `\`spectrum_view()\`를 실행하면 A 신호의 magnitude spectrum이 원점을 중심으로 나타난다.

주요 성분은 대략
$$
-0.5\\text{ kHz}\\sim+0.5\\text{ kHz}
$$
범위에 존재하는 형태로 관찰된다.`},
        {
          "id": "5-5B2",
          "title": "5.B2.",
          "type": "essay",
          "prompt": `문제 5.B1의 스펙트럼에서 신호의 크기가 급격히 작아지는 양쪽 끝의 주파수를 관찰하여, 그 값을 쓰시오.`
        ,
          referenceAnswer: `스펙트럼의 크기가 급격히 작아지는 양쪽 끝 주파수는 대략
$$
\\boxed{-0.5\\text{ kHz},\\quad+0.5\\text{ kHz}}
$$
이다.

따라서 전체 양측 스펙트럼 폭은 약 1 kHz로 볼 수 있다.`},
        { //문제 5.C
          "id": "5-5C",
          "title": "5.C.",
          "prompt": `시간축 scaling과 delay의 스펙트럼을 확인하자.`
        },
        {
          "id": "5-5C1",
          "title": "5.C1.",
          "type": "python",
          responseEnabled: true,
          "prompt": `B는 $x_B(t)=x(t/2)$이다. B의 스펙트럼을 예측하시오.
예측한 후 실제로 문제 5.A의 py 스크립트에 아래를 추가하여 실행하고, 결과를 확인하시오.
\`\`\`python  
#문제 5.A의 py 스크립트에 아래를 추가.
spectrum_view(xB, fs, units="Watts", frequency_limit_hz=8e3)
\`\`\``
        ,
          referenceAnswer: `B는
$$
x_B(t)=x(t/2)
$$
이다.

시간 scaling 성질
$$
x(at)
\\longleftrightarrow
\\frac1{|a|}X\\left(\\frac{f}{a}\\right)
$$
에서 $a=1/2$이므로
$$
X_B(f)=2X(2f)
$$
이다.

따라서 원래 $\\pm0.5$ kHz였던 끝 주파수는
$$
\\boxed{\\pm0.25\\text{ kHz}}
$$
가 된다.

실험 결과도 약 $\\pm0.25$ kHz로 나타나 예측과 일치한다.`},
        {
          "id": "5-5C2",
          "title": "5.C2.",
          "type": "python",
          responseEnabled: true,
          "prompt": `C는 $x_B(t)=x(2t)$이다. C의 스펙트럼을 예측하시오.
예측한 후 실제로 문제 5.A의 py 스크립트에 아래를 추가하여 실행하고, 결과를 확인하시오.
\`\`\`python  
#문제 5.A의 py 스크립트에 아래를 추가.
spectrum_view(xC, fs, units="Watts", frequency_limit_hz=8e3)
\`\`\``
        ,
          referenceAnswer: `C는
$$
x_C(t)=x(2t)
$$
이다.

따라서
$$
X_C(f)
=
\\frac12X(f/2)
$$
이고 주파수축 폭은 2배 넓어진다.

따라서 끝 주파수는
$$
\\boxed{\\pm1\\text{ kHz}}
$$
로 예상되며 실험 결과도 약 $\\pm1$ kHz로 나타난다.`},
        {
          "id": "5-5C3",
          "title": "5.C3.",
          "type": "python",
          responseEnabled: true,
          "prompt": `D는 $x_D(t)=x(t-0.05)$이다. D의 스펙트럼을 예측하시오.
예측한 후 실제로 문제 5.A의 py 스크립트에 아래를 추가하여 실행하고, 결과를 확인하시오.
\`\`\`python  
#문제 5.A의 py 스크립트에 아래를 추가.
spectrum_view(xD, fs, units="Watts", frequency_limit_hz=8e3)
\`\`\``
        ,
          referenceAnswer: `D는
$$
x_D(t)=x(t-0.05)
$$
이다.

시간 이동 성질에 의해
$$
X_D(f)=X(f)e^{-j2\\pi f(0.05)}
$$
이고
$$
|X_D(f)|=|X(f)|
$$
이다.

따라서 magnitude spectrum의 끝 주파수는 A와 같은
$$
\\boxed{\\pm0.5\\text{ kHz}}
$$
이며 실험 결과도 일치한다.`},
        {
          "id": "5-5C4",
          "title": "5.C4.",
          "type": "essay",
          "prompt": `A~D의 시간파형과 스펙트럼 결과를 함께 고려하면, 시간축에서 신호가 빠르게 변화하는 정도와 주파수영역의 대역폭 사이에는 어떤 관계가 있는가?`
        ,
          referenceAnswer: `시간축에서 빠르게 변화하는 신호일수록 높은 주파수 성분이 더 많이 필요하므로 대역폭이 넓어진다.

실험에서도 B는 약 0.25 kHz, A와 D는 약 0.5 kHz, C는 약 1 kHz의 끝 주파수를 보여, 시간영역 변화가 빨라질수록 스펙트럼 폭이 넓어지는 경향을 확인할 수 있다.`},
        { //문제 5.D
          "id": "5-5D",
          "title": "5.D.",
          "type": "essay",
          "prompt": `이제 A 신호 $x(t)$를 이용하여 새로운 F~K에 해당하는 신호를 Python으로 만들자.

자신의 학번 끝자리를 $X$라 하고, $f_0=2000+500X$[Hz]로 설정한다. 예를 들어, 학번 끝자리가 8이면 $f_0=6000$[Hz]이다.

아래 py 스크립트는 A 신호 $x(t)$를 이용하여 새로운 F~K에 해당하는 신호이다.
\`\`\`python  
#문제 5.A의 py 스크립트에 아래를 추가.
X = 8  # 자신의 학번 끝자리
f0 = 2000 + X*500

# F
xF = xA**2

# G
xG = np.cos(2*np.pi*f0*t)

# H
xH = xA*xG

# I
xI = np.exp(1j*2*np.pi*f0*t)

# J
xJ = xA*xI

# K
xK = np.conj(xJ)
\`\`\`
위 py 스크립트를 바탕으로, F~J에 해당하는 신호가 무엇인지 아래 표의 ①~④를 채우시오.
[[table:
신호 | 시간영역 식
A | $x(t)$
F | ①
G | $\\cos(2\\pi f_0t), 2\\pi f_0=2\\pi \\times ②$
H | $x(t)\\cos(2\\pi f_0t)$
I | ③ (오일러 공식 이용)
J | ④
]]
`
        ,
          referenceAnswer: `표의 빈칸은 다음과 같다.

- ① $x^2(t)$
- ② $f_0=2000+500X$
- ③ $e^{j2\\pi f_0t}$
- ④ $x(t)e^{j2\\pi f_0t}$

따라서

[[table:
신호 | 시간영역 식
A | $x(t)$
F | $x^2(t)$
G | $\\cos(2\\pi f_0t)$
H | $x(t)\\cos(2\\pi f_0t)$
I | $e^{j2\\pi f_0t}$
J | $x(t)e^{j2\\pi f_0t}$
]]`},
        { //문제 5.E
          "id": "5-5E",
          "title": "5.E.",
          "prompt": `복소지수함수와 주파수 이동을 확인하자. 다음 물음에 답하시오.`
        },
        {
          "id": "5-5E1",
          "title": "5.E1.",
          "type": "essay",
          "prompt": `문제 5.D의 표에서 자신이 작성한 I의 식을 바탕으로, I의 스펙트럼을 예측하시오.`
        ,
          referenceAnswer: `I는
$$
e^{j2\\pi f_0t}
$$
이므로 푸리에 변환은 $+f_0$에 하나의 line spectrum을 갖는다.

즉,
$$
\\boxed{f=+f_0}
$$
에만 주요 성분이 존재한다.

예를 들어 $X=8$이면 $f_0=6$ kHz이므로 +6 kHz에 하나의 line이 나타난다.`},
        {
          "id": "5-5E2",
          "title": "5.E2.",
          "type": "python",
          responseEnabled: true,
          starterCode: `import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat

file_load("ch5/xt.mat")
file_load("ch5/yt.mat")
file_load("ch5/zt.mat")
file_load("ch5/wt.mat")

xt = loadmat("xt.mat")["xt"]
yt = loadmat("yt.mat")["yt"]
zt = loadmat("zt.mat")["zt"]
wt = loadmat("wt.mat")["wt"]

# Spectrum Analyzer 조건에 맞추기 위하여 16 kHz의 공통 시간축으로 변환. 실습과 상관없는 부분.
fs = 16e3
t = np.arange(0, 10, 1/fs)

xA = np.interp(t, xt[0], xt[1])
xB = np.interp(t, yt[0], yt[1])
xC = np.interp(t, zt[0], zt[1])
xD = np.interp(t, wt[0], wt[1])

#문제 5.A의 py 스크립트에 아래를 추가.
X = 8  # 자신의 학번 끝자리
f0 = 2000 + X*500

# F
xF = xA**2

# G
xG = np.cos(2*np.pi*f0*t)

# H
xH = xA*xG

# I
xI = np.exp(1j*2*np.pi*f0*t)

# J
xJ = xA*xI

# K
xK = np.conj(xJ)

#문제 5.D의 py 스크립트에 아래를 추가.
spectrum_view(xI, fs, units="Watts", frequency_limit_hz=8e3)`,
          "prompt": `I의 스펙트럼을 확인하시오.
\`\`\`python  
#문제 5.D의 py 스크립트에 아래를 추가.
spectrum_view(xI, fs, units="Watts", frequency_limit_hz=8e3)
\`\`\`
          `
        ,
          referenceAnswer: `실험 결과 I의 스펙트럼은 문제 5.E1의 예측처럼
$$
\\boxed{+f_0}
$$
에 하나의 주요 line으로 나타난다.

예를 들어 $X=8$이면 +6 kHz에서 line spectrum이 관찰된다.`},
        {
          "id": "5-5E3",
          "title": "5.E3.",
          "type": "essay",
          "prompt": `문제 5.D의 표에서 자신이 작성한 J의 식을 바탕으로, J의 스펙트럼을 예측하시오.`
        ,
          referenceAnswer: `J는
$$
x_J(t)=x(t)e^{j2\\pi f_0t}
$$
이다.

주파수 이동 성질에 의해
$$
\\boxed{
X_J(f)=X(f-f_0)
}
$$
이므로 원래 $X(f)$가 $+f_0$만큼 이동한다.

원 신호의 대역이 약 $-0.5\\sim+0.5$ kHz이고 $f_0=6$ kHz라면 J의 대역은 약
$$
\\boxed{5.5\\sim6.5\\text{ kHz}}
$$
이다.`},
        {
          "id": "5-5E4",
          "title": "5.E4.",
          "type": "python",
          responseEnabled: true,
          starterCode: `import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat

file_load("ch5/xt.mat")
file_load("ch5/yt.mat")
file_load("ch5/zt.mat")
file_load("ch5/wt.mat")

xt = loadmat("xt.mat")["xt"]
yt = loadmat("yt.mat")["yt"]
zt = loadmat("zt.mat")["zt"]
wt = loadmat("wt.mat")["wt"]

# Spectrum Analyzer 조건에 맞추기 위하여 16 kHz의 공통 시간축으로 변환. 실습과 상관없는 부분.
fs = 16e3
t = np.arange(0, 10, 1/fs)

xA = np.interp(t, xt[0], xt[1])
xB = np.interp(t, yt[0], yt[1])
xC = np.interp(t, zt[0], zt[1])
xD = np.interp(t, wt[0], wt[1])

#문제 5.A의 py 스크립트에 아래를 추가.
X = 8  # 자신의 학번 끝자리
f0 = 2000 + X*500

# F
xF = xA**2

# G
xG = np.cos(2*np.pi*f0*t)

# H
xH = xA*xG

# I
xI = np.exp(1j*2*np.pi*f0*t)

# J
xJ = xA*xI

# K
xK = np.conj(xJ)

#문제 5.D의 py 스크립트에 아래를 추가.
spectrum_view(xJ, fs, units="Watts", frequency_limit_hz=8e3)`,
          "prompt": `J의 스펙트럼을 확인하시오.
\`\`\`python  
#문제 5.D의 py 스크립트에 아래를 추가.
spectrum_view(xJ, fs, units="Watts", frequency_limit_hz=8e3)
\`\`\`
          `
        ,
          referenceAnswer: `실험 결과 J의 스펙트럼은 $+f_0$를 중심으로 원래 $X(f)$와 같은 모양으로 이동한다.

예를 들어 $X=8$이면 6 kHz를 중심으로 약
$$
5.5\\sim6.5\\text{ kHz}
$$
범위의 스펙트럼이 나타나 문제 5.E3의 예측과 일치한다.`},
        {
          "id": "5-5E5",
          "title": "5.E5.",
          "type": "essay",
          "prompt": `문제 5.D의 표에서 자신이 작성한 G의 식을 바탕으로, G의 스펙트럼을 예측하시오.`
        ,
          referenceAnswer: `G는
$$
\\cos(2\\pi f_0t)
=
\\frac12e^{j2\\pi f_0t}
+
\\frac12e^{-j2\\pi f_0t}
$$
이므로
$$
\\boxed{-f_0,\\quad+f_0}
$$
에 두 개의 line spectrum이 나타난다.

예를 들어 $X=8$이면 -6 kHz와 +6 kHz에 line이 나타난다.`},
        {
          "id": "5-5E6",
          "title": "5.E6.",
          "type": "python",
          responseEnabled: true,
          starterCode: `import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat

file_load("ch5/xt.mat")
file_load("ch5/yt.mat")
file_load("ch5/zt.mat")
file_load("ch5/wt.mat")

xt = loadmat("xt.mat")["xt"]
yt = loadmat("yt.mat")["yt"]
zt = loadmat("zt.mat")["zt"]
wt = loadmat("wt.mat")["wt"]

# Spectrum Analyzer 조건에 맞추기 위하여 16 kHz의 공통 시간축으로 변환. 실습과 상관없는 부분.
fs = 16e3
t = np.arange(0, 10, 1/fs)

xA = np.interp(t, xt[0], xt[1])
xB = np.interp(t, yt[0], yt[1])
xC = np.interp(t, zt[0], zt[1])
xD = np.interp(t, wt[0], wt[1])

#문제 5.A의 py 스크립트에 아래를 추가.
X = 8  # 자신의 학번 끝자리
f0 = 2000 + X*500

# F
xF = xA**2

# G
xG = np.cos(2*np.pi*f0*t)

# H
xH = xA*xG

# I
xI = np.exp(1j*2*np.pi*f0*t)

# J
xJ = xA*xI

# K
xK = np.conj(xJ)

#문제 5.D의 py 스크립트에 아래를 추가.
spectrum_view(xG, fs, units="Watts", frequency_limit_hz=8e3)`,
          "prompt": `G의 스펙트럼을 확인하시오.
\`\`\`python  
#문제 5.D의 py 스크립트에 아래를 추가.
spectrum_view(xG, fs, units="Watts", frequency_limit_hz=8e3)
\`\`\`
          `
        ,
          referenceAnswer: `실험 결과 G의 스펙트럼은 문제 5.E5에서 예측한 것처럼
$$
-f_0,\\quad+f_0
$$
두 위치에 line이 나타난다.

예를 들어 $X=8$이면 -6 kHz와 +6 kHz에서 두 개의 line spectrum이 관찰된다.`},
        {
          "id": "5-5E7",
          "title": "5.E7.",
          "type": "essay",
          "prompt": `문제 5.D의 표에서 자신이 작성한 H의 식을 바탕으로, H의 스펙트럼을 예측하시오.`
        ,
          referenceAnswer: `H는
$$
x_H(t)=x(t)\\cos(2\\pi f_0t)
$$
이다.

cosine을 복소지수로 전개하면
$$
x_H(t)
=
\\frac12x(t)e^{j2\\pi f_0t}
+
\\frac12x(t)e^{-j2\\pi f_0t}
$$
이므로
$$
\\boxed{
X_H(f)
=
\\frac12X(f-f_0)
+
\\frac12X(f+f_0)
}
$$
이다.

따라서 원 스펙트럼이 $\\pm f_0$를 중심으로 두 개 복사되어 나타난다. $f_0=6$ kHz이면 약 $-6.5\\sim-5.5$ kHz와 $5.5\\sim6.5$ kHz이다.`},
        {
          "id": "5-5E8",
          "title": "5.E8.",
          "type": "python",
          responseEnabled: true,
          starterCode: `import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat

file_load("ch5/xt.mat")
file_load("ch5/yt.mat")
file_load("ch5/zt.mat")
file_load("ch5/wt.mat")

xt = loadmat("xt.mat")["xt"]
yt = loadmat("yt.mat")["yt"]
zt = loadmat("zt.mat")["zt"]
wt = loadmat("wt.mat")["wt"]

# Spectrum Analyzer 조건에 맞추기 위하여 16 kHz의 공통 시간축으로 변환. 실습과 상관없는 부분.
fs = 16e3
t = np.arange(0, 10, 1/fs)

xA = np.interp(t, xt[0], xt[1])
xB = np.interp(t, yt[0], yt[1])
xC = np.interp(t, zt[0], zt[1])
xD = np.interp(t, wt[0], wt[1])

#문제 5.A의 py 스크립트에 아래를 추가.
X = 8  # 자신의 학번 끝자리
f0 = 2000 + X*500

# F
xF = xA**2

# G
xG = np.cos(2*np.pi*f0*t)

# H
xH = xA*xG

# I
xI = np.exp(1j*2*np.pi*f0*t)

# J
xJ = xA*xI

# K
xK = np.conj(xJ)

#문제 5.D의 py 스크립트에 아래를 추가.
spectrum_view(xH, fs, units="Watts", frequency_limit_hz=8e3)`,
          "prompt": `H의 스펙트럼을 확인하시오.
\`\`\`python  
#문제 5.D의 py 스크립트에 아래를 추가.
spectrum_view(xH, fs, units="Watts", frequency_limit_hz=8e3)
\`\`\`
          `
        ,
          referenceAnswer: `실험 결과 H의 스펙트럼은 $-f_0$와 $+f_0$를 중심으로 원 스펙트럼의 복사본 두 개가 나타난다.

예를 들어 $X=8$이면 약
$$
-6.5\\sim-5.5\\text{ kHz}
$$
및
$$
5.5\\sim6.5\\text{ kHz}
$$
에 스펙트럼이 나타나 예측과 일치한다.`},
        { //문제 5.F
          "id": "5-5F",
          "title": "5.F.",
          "prompt": `복소수 신호 $z(t)$의 푸리에 변환을 $Z(f)$라 하자. 다음 물음에 답하시오.`
        },
        {
          "id": "5-5F1",
          "title": "5.F1.",
          "type": "proof",
          "prompt": `[[equation:5.1]]을 증명하시오.
$$
\\mathrm{F}\\left[z^{*}(t)\\right]=Z^{*}(-f)
\\qquad \\text{(식 5.1)}
$$`
        ,
          referenceAnswer: `푸리에 변환 정의에서
$$
Z(f)
=
\\int_{-\\infty}^{\\infty}
z(t)e^{-j2\\pi ft}dt
$$
이다.

양변에 공액을 취하면
$$
Z^*(f)
=
\\int z^*(t)e^{j2\\pi ft}dt.
$$

여기서 $f$를 $-f$로 바꾸면
$$
Z^*(-f)
=
\\int z^*(t)e^{-j2\\pi ft}dt
=
\\mathcal{F}[z^*(t)].
$$

따라서
$$
\\boxed{
\\mathcal{F}[z^*(t)]
=
Z^*(-f)
}
$$
이다.`},
        {
          "id": "5-5F2",
          "title": "5.F2.",
          "type": "essay",
          "prompt": `문제 5.D의 py 스크립트에 따르면, K는 J의 conjuage(공액) 신호임을 알 수 있다. K의 스펙트럼을 예측하시오.`
        ,
          referenceAnswer: `K는
$$
x_K(t)=x_J^*(t)
$$
이므로
$$
X_K(f)=X_J^*(-f)
$$
이다.

Magnitude spectrum에서는
$$
|X_K(f)|=|X_J(-f)|
$$
이므로 J의 스펙트럼을 원점을 기준으로 좌우 반전한 모양이 된다.

예를 들어 J가 5.5~6.5 kHz에 있다면 K는
$$
\\boxed{-6.5\\sim-5.5\\text{ kHz}}
$$
에 나타난다.`},
        {
          "id": "5-5F3",
          "title": "5.F3.",
          "type": "python",
          responseEnabled: true,
          starterCode: `import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat

file_load("ch5/xt.mat")
file_load("ch5/yt.mat")
file_load("ch5/zt.mat")
file_load("ch5/wt.mat")

xt = loadmat("xt.mat")["xt"]
yt = loadmat("yt.mat")["yt"]
zt = loadmat("zt.mat")["zt"]
wt = loadmat("wt.mat")["wt"]

# Spectrum Analyzer 조건에 맞추기 위하여 16 kHz의 공통 시간축으로 변환. 실습과 상관없는 부분.
fs = 16e3
t = np.arange(0, 10, 1/fs)

xA = np.interp(t, xt[0], xt[1])
xB = np.interp(t, yt[0], yt[1])
xC = np.interp(t, zt[0], zt[1])
xD = np.interp(t, wt[0], wt[1])

#문제 5.A의 py 스크립트에 아래를 추가.
X = 8  # 자신의 학번 끝자리
f0 = 2000 + X*500

# F
xF = xA**2

# G
xG = np.cos(2*np.pi*f0*t)

# H
xH = xA*xG

# I
xI = np.exp(1j*2*np.pi*f0*t)

# J
xJ = xA*xI

# K
xK = np.conj(xJ)

#문제 5.D의 py 스크립트에 아래를 추가.
spectrum_view(xK, fs, units="Watts", frequency_limit_hz=8e3)`,
          "prompt": `K의 스펙트럼을 확인하시오.
\`\`\`python  
#문제 5.D의 py 스크립트에 아래를 추가.
spectrum_view(xK, fs, units="Watts", frequency_limit_hz=8e3)
\`\`\`
          `
        ,
          referenceAnswer: `실험 결과 K의 스펙트럼은 J의 magnitude spectrum을 좌우 반전한 형태로 나타난다.

예를 들어 $X=8$이면 K는 -6 kHz를 중심으로 약 -6.5~-5.5 kHz의 스펙트럼을 갖는다. 이는
$$
\\mathcal{F}[z^*(t)]=Z^*(-f)
$$
와 일치한다.`},
        { //문제 5.G
          "id": "5-5G",
          "title": "5.G.",
          "prompt": `$x(t)$와 $y(t)$의 푸리에 변환을 각각 $X(f), Y(f)$라 하자. 다음 물음에 답하시오.`
        },
        {
          "id": "5-5G1",
          "title": "5.G1.",
          "type": "proof",
          "prompt": `[[equation:5.2]]를 완성하시오.
$$
\\mathrm{F}\\left[x(t)y(t)\\right]=\\frac{1}{2\\pi}\\left(X(f)?Y(f)\\right)
\\qquad \\text{(식 5.2)}
$$`
        ,
          referenceAnswer: `시간영역의 곱셈은 주파수영역의 컨볼루션에 대응한다.

따라서 빈칸은 \`*\`이고
$$
\\boxed{
\\mathcal{F}[x(t)y(t)]
=
\\frac1{2\\pi}
\\left(X(f)*Y(f)\\right)
}
$$
이다.`},
        {
          "id": "5-5G2",
          "title": "5.G2.",
          "type": "proof",
          "prompt": `[[equation:5.2]]로부터, 신호 제곱의 푸리에 변환 공식인 [[equation:5.3]]를 완성하시오.
$$
\\mathrm{F}\\left[x^2(t)\\right]=?
\\qquad \\text{(식 5.3)}
$$`
        ,
          referenceAnswer: `식 (5.2)에서 $y(t)=x(t)$로 두면
$$
\\boxed{
\\mathcal{F}[x^2(t)]
=
\\frac1{2\\pi}
\\left(X(f)*X(f)\\right)
}
$$
이다.`},
        {
          "id": "5-5G3",
          "title": "5.G3.",
          "type": "essay",
          "prompt": `문제 5.D의 표에서 자신이 작성한 F의 식, 문제 5.B1에서 확인한 $x(t)$의 스펙트럼, [[equation:5.3]]을 바탕으로, F의 스펙트럼을 예측하시오.`
        ,
          referenceAnswer: `F는
$$
x_F(t)=x^2(t)
$$
이다.

따라서
$$
\\mathcal{F}[x_F(t)]
=
\\frac1{2\\pi}X(f)*X(f)
$$
이다.

원래 $X(f)$의 주요 대역을 약 $-0.5$~$+0.5$ kHz의 사각형으로 근사하면 두 사각형의 컨볼루션은 삼각형 모양이 된다.

주파수 지지구간은
$$
[-0.5,0.5]+[-0.5,0.5]
=
[-1,1]\\text{ kHz}
$$
이므로 0 Hz를 중심으로 양쪽 끝이 약 -1 kHz와 +1 kHz인 삼각형 형태를 예상할 수 있다.

단, 실제 $x^2(t)$에는 양의 평균값이 생기므로 0 Hz에서 큰 DC 성분도 나타날 수 있다.`},
        {
          "id": "5-5G4",
          "title": "5.G4.",
          "type": "python",
          responseEnabled: true,
          starterCode: `import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat

file_load("ch5/xt.mat")
file_load("ch5/yt.mat")
file_load("ch5/zt.mat")
file_load("ch5/wt.mat")

xt = loadmat("xt.mat")["xt"]
yt = loadmat("yt.mat")["yt"]
zt = loadmat("zt.mat")["zt"]
wt = loadmat("wt.mat")["wt"]

# Spectrum Analyzer 조건에 맞추기 위하여 16 kHz의 공통 시간축으로 변환. 실습과 상관없는 부분.
fs = 16e3
t = np.arange(0, 10, 1/fs)

xA = np.interp(t, xt[0], xt[1])
xB = np.interp(t, yt[0], yt[1])
xC = np.interp(t, zt[0], zt[1])
xD = np.interp(t, wt[0], wt[1])

#문제 5.A의 py 스크립트에 아래를 추가.
X = 8  # 자신의 학번 끝자리
f0 = 2000 + X*500

# F
xF = xA**2

# G
xG = np.cos(2*np.pi*f0*t)

# H
xH = xA*xG

# I
xI = np.exp(1j*2*np.pi*f0*t)

# J
xJ = xA*xI

# K
xK = np.conj(xJ)

#문제 5.D의 py 스크립트에 아래를 추가.
xF_no_dc = xF - np.mean(xF) # 제곱으로 인해 발생한 DC 성분 제거
spectrum_view(xF_no_dc, fs, units="Watts", frequency_limit_hz=8e3)`,
          "prompt": `F의 스펙트럼을 확인하시오.
\`\`\`python  
#문제 5.D의 py 스크립트에 아래를 추가.
xF_no_dc = xF - np.mean(xF) # 제곱으로 인해 발생한 DC 성분 제거
spectrum_view(xF_no_dc, fs, units="Watts", frequency_limit_hz=8e3)
\`\`\`
(참고. $x^2(t)$는 양의 평균값을 가지므로 $f=0$에서 큰 DC 성분이 나타날 수 있다. 본 문제에서는 convolution에 의해 형성되는 스펙트럼의 전체적인 모양을 관찰하기 위해 평균값을 제거한 신호를 사용한다.)
          `
        ,
          referenceAnswer: `\`xF_no_dc = xF - np.mean(xF)\`는 제곱으로 생긴 DC 성분만 제거하여 convolution에 의해 형성되는 전체적인 스펙트럼 모양을 보기 쉽게 한다.

실행 결과 DC를 제외한 스펙트럼은 대략 0 Hz를 중심으로 하고, 주요 폭은 약
$$
-1\\text{ kHz}\\sim+1\\text{ kHz}
$$
까지 확장된 삼각형 형태로 관찰된다.

따라서 문제 5.G3의 예측과 일치한다.`}
      ]
    }
  ]
} as const;
