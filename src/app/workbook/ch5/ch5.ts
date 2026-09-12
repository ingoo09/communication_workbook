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
        },
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
        },
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
        },
        {
          "id": "5-1E2",
          "title": "1.E2.",
          "type": "essay",
          "prompt": `$f_1(-\\tau)$가 제대로 생성되었는지 확인하시오. (시간 축 변수가 $t$에서 $\\tau$로 바뀐 것뿐임. $x$축 벡터 $\\tau$는 문제 1.A의 벡터 $t$와 같은 방식으로 생성)`
        },
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
        },
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
        }
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
        },
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
        },
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
        },
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
        },
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
        },
        {
          "id": "5-2A6",
          "title": "2.A6.",
          "type": "essay",
          "prompt": `문제 2.A5의 결과 그래프를 바탕으로, 문제 2.A2~2.A4의 자신의 답이 맞는지 쓰시오.`,
        },
        {
          "id": "5-2B",
          "title": "2.B.",
          "type": "python",
          "prompt": `문제 1.B의 py 스크립트와 문제 2.A5의 py 스크립트를 결합하여, $-5\\le\\tau\\le5$ 범위에서 $a$가 각각 $-1, -0.5, 0, 0.5, 1, 2.5, 3$일 때 $f_2(\\tau)f_1(a-\\tau)$의 모양을 갖는 벡터를 각각 생성하고, $\\tau$를 가로축으로 하여 각각의 그래프를 그리시오. ‘plt.subplot()’을 사용하여 하나의 창 안에서 7개의 그래프를 세로로 나열하여 그리고, 결과 그래프를 확인하시오.`
        },
        {
          "id": "5-2C",
          "title": "2.C.",
          "type": "essay",
          "prompt": `$f_2(\\tau)f_1(a-\\tau)$의 그래프의 모양을 바탕으로, $a$와 상관없이 $\\int_{-\\infty}^{\\infty} f_2(\\tau)f_1(a-\\tau)\\,d\\tau$ 대신 $\\int_{-5}^{5} f_2(\\tau)f_1(a-\\tau)\\,d\\tau$를 사용하여도 같음을 설명하시오.`
        },
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
        },
        {
          "id": "5-2D2",
          "title": "2.D2.",    
          "type": "proof",
          "prompt": `$t=0.2$일 때 $\\int_{-\\infty}^{\\infty} f_2(\\tau)f_1(t-\\tau)\\,d\\tau$의 값을, 수식을 직접 적분하여 구하시오. 구한 과정을 작성하여, 구한 값이 문제 2.D1의 py 스크립트 실행 결과와 동일한 값이 나오는지 확인하시오.`,
        },
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
        },
        {
          "id": "5-2D4",
          "title": "2.D4.",    
          "type": "proof",
          "prompt": `문제 2.D3에서 자신이 설정한 $t$ 값에 대해 $\\int_{-\\infty}^{\\infty} f_2(\\tau)f_1(t-\\tau)\\,d\\tau$의 값을, 수식을 직접 적분하여 구하시오. 구한 과정을 작성하여, 구한 값이 문제 2.D3의 py 스크립트 실행 결과와 동일한 값이 나오는지 확인하시오.`,
        },
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
        },
        {
          "id": "5-2E2",
          "title": "2.E2.",    
          "type": "essay",
          "prompt": `15번째 라인 ‘f2convf1_at_t=sum(f2*f1mirror_delayed)*tau_step’은 컨볼루션 수식 $\\int_{-\\infty}^{\\infty} f_2(\\tau)f_1(t-\\tau)\\,d\\tau$을 수치적분으로 구현한 것이므로, 이 라인이 실행되면 변수 ‘f2convf1_at_t’는 수치적분 값을 갖게 된다. 이것을 for-loop 안에서 반복하여 연산하는 이유를 쓰시오.`,
        },
        {
          "id": "5-2E3",
          "title": "2.E3.",    
          "type": "essay",
          "prompt": `위의 py 스크립트에서 변수 ‘f2convf1_at_t’와 ‘f2convf1’의 의미와 차이를 명확히 설명하시오.`,
        },
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
        },
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
        },
        {
          "id": "5-2F3",
          "title": "2.F3.",
          "type": "essay",
          "prompt": `문제 2.F2의 그래프와 문제 2.E1의 그래프가 일치하는지 확인하시오.`,
        },
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
        },
        {
          "id": "5-3A2",
          "title": "3.A2.",
          "type": "essay",
          "prompt": `문제 3.A1의 결과 그래프를 보면, $f_1(t)$는 잘 알려진 어떤 함수와 근사한다. 그 함수의 이름을 쓰시오.`
        },
        {
          "id": "5-3A3",
          "title": "3.A3.",
          "type": "python",
          "prompt": `문제 2.E에서 $f_1(-\\tau)$의 샘플링 벡터 ‘f1mirror’를 생성하여 사용한다.
          
문제 2.E의 py 스크립트를 복사하여 붙여넣은 후, 6번째 라인 ‘f1mirror=0.5*((tau>-1)&(tau<0))’을 ‘f1mirror=1/tau_step*(round(tau,2)==0)’로 수정하면, $f_2(t)$와 문제 3.A1에서 확인한 $f_1(t)$의 컨볼루션 결과를 얻을 수 있다. 수정한 py 스크립트를 실행하고, 컨볼루션 결과 그래프를 확인하시오.`
        },
        {
          "id": "5-3A4",
          "title": "3.A4.",
          "type": "essay",
          "prompt": `문제 3.A3의 그래프와 $f_2(t)$의 그래프의 모양을 비교하시오. 비교 결과를 바탕으로 컨볼루션의 중요한 공식(성질) 중 하나를 유추하여 쓰시오.`
        },
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
        },
        {
          "id": "5-3B2",
          "title": "3.B2.",
          "type": "essay",
          "prompt": `수정한 문제 3.B1의 $f_1(t)$의 그래프와, 수정하기 전 문제 3.A1의 $f_1(t)$의 그래프가 어떤 차이가 있는지 쓰시오.`
        },
        {
          "id": "5-3B3",
          "title": "3.B3.",
          "type": "python",
          "prompt": `문제 3.A3의 py 스크립트를 복사하여 붙여넣은 후, 6번째 라인 ‘f1mirror=1/tau_step*(round(tau,2)==0)’을 ‘f1mirror=1/tau_step*(round(tau,2)==-1.5)’로 수정하면, $f_2(t)$와 문제 3.B1에서 확인한 $f_1(t)$의 컨볼루션 결과를 얻을 수 있다. 수정한 py 스크립트를 실행하고, 컨볼루션 결과 그래프를 확인하시오.`
        },
        {
          "id": "5-3B4",
          "title": "3.B4.",
          "type": "essay",
          "prompt": `문제 3.B3의 그래프와 $f_2(t)$의 그래프의 모양을 비교하시오. 비교 결과를 바탕으로 문제 3.A4에서 자신이 유추하여 쓴 컨볼루션의 중요한 공식(성질)을 일반화하여 쓰시오.`
        },
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
        },
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
        },
        {
          "id": "5-4D",
          "title": "4.D.",
          "type": "essay",
          "prompt": `임펄스 응답이 $h(t)$인 선형 시스템의 입력에 $f(t)$가 인가되면, 그 출력 $g(t)$는 $f(t)$와 $h(t)$의 시간 축 컨볼루션이 된다. 하지만, 문제 4.C에서 답한 컨볼루션의 중요한 성질을 이용하면, 실제 시간 축 컨볼루션을 수행하지 않고 다른 방법으로 출력 $g(t)$를 구할 수 있다. 그 방법을 구체적으로 쓰시오.`,
        },
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
        },
        {
          "id": "5-4E2",
          "title": "4.E2.",
          "type": "proof",
          "prompt": `문제 4.E1에서 얻은 $f_1(t)*f_2(t)$의 푸리에 변환을 구하시오.`,
        },
        {
          "id": "5-4E3",
          "title": "4.E3.",
          "type": "proof",
          "prompt": `$f_1(t)$의 푸리에 변환 $F_1(\\omega)$를 구하시오.`,
        },
        {
          "id": "5-4E4",
          "title": "4.E4.",
          "type": "proof",
          "prompt": `$f_2(t)$의 푸리에 변환 $F_2(\\omega)$를 구하시오.`,
        },
        {
          "id": "5-4E5",
          "title": "4.E5.",
          "type": "proof",
          "prompt": `문제 4.E2의 답과 $F_1(\\omega) \\times F_2(\\omega)$의 답이 같음을 보이시오.`,
        },
      ]
    }
  ]
} as const;
