import type { WorkbookChapter } from '@/types/workbook';

export const chapter = {
  "id": "4-FT",
  "title": "Chapter 4. Fourier Transform",
  "sections": [
    { //문제 4
      "id": "4-4",
      "title": "4. 일반 비주기 샘플 사운드의 스펙트럼 분석",
      "problems": [
        { //문제 4.A
          "id": "4-4A",
          "title": "4.A.",
          "type": "python",
          consoleEnabled: true,
          starterCode: `import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat

file_load("ch4/sampled_ft.mat"); mat = loadmat("sampled_ft.mat")
t_vector = mat['t_vector'][0]; ft_vector = mat['ft_vector'][0]`,
          "prompt": `아래는 이번 실습에 사용할 'ch4/sampled_ft.mat'을 불러오는 py 스크립트이다.
\`\`\`python          
import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat

file_load("ch4/sampled_ft.mat"); mat = loadmat("sampled_ft.mat")
t_vector = mat['t_vector'][0]; ft_vector = mat['ft_vector'][0]
\`\`\`
'ch4/sampled_ft.mat'에 저장된 변수 ‘ft_vector’는 시간 영역의 신호 $f(t)$를 0초부터 10초까지 1/8192초 간격으로 샘플링한 값을 가진 벡터이다. 그리고 변수 ‘t_vector’는 각 샘플이 샘플링된 시간이 저장된 벡터이다.

코드 실행 후, 샘플링 간격을 확인하기 위해 다음을 Console에서 실행해보자.
\`\`\`python          
>>> t_vector[1]-t_vector[0]
>>> plt.plot(t_vector, ft_vector)
\`\`\`          
샘플링 간격이 1/8192인지를 확인하고, 파형의 그래프를 관찰하여, ‘ft_vector’는 비주기 랜덤 신호라 할 수 있는지 쓰시오.`,
        },
        { //문제 4.B
          "id": "4-4B",
          "title": "4.B.",
          "prompt": `$f(t)$(Python 샘플 벡터=‘ft_vector’)의 푸리에 변환을 $F(\\omega)$라 할 때, 수치적분(Numerical integration, [[link:/workbook/ch2?p=2-1A|2장의 문제 1]] 참고)을 이용하여 $F(30), F(70), F(200)$을 구해보자.`
        },
        {
          "id": "4-4B1",
          "title": "4.B1.",
          "type": "proof",
          "prompt": `$f(t)$로부터 $F(\\omega)$를 구하는 푸리에 변환 공식을 쓰시오.
          
($0\\le t\\le 10$ 구간 밖에서는 $f(t)=0$이라고 가정한다. 따라서, 푸리에 변환 식의 적분 구간은 0에서 10까지로 설정할 것)`
        },
        {
          "id": "4-4B2",
          "title": "4.B2.",
          "type": "python",
          "prompt": `아래는 수치적분을 이용하여 $F(30), F(70), F(200)$을 구하는 py 스크립트이다.
\`\`\`python          
import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat

file_load("ch4/sampled_ft.mat"); mat = loadmat("sampled_ft.mat")
t_vector = mat['t_vector'][0]; ft_vector = mat['ft_vector'][0]

t_step=t_vector[1]-t_vector[0]

Fw30=np.sum(?*np.exp(-1j*30*t_vector))*t_step #완성해야 할 부분 (1)
#위 라인은 w=30에서 푸리에 변한 F(w) 즉, F(30)을 수치적분(2장의 문제 1 참고)으로 구현한 것

Fw70=? #완성해야 할 부분 (2)
Fw200=? #완성해야 할 부분 (3)
\`\`\`        
?를 채워 py 스크립트를 완성하고, 모든 라인에 대해 다음의 지침에 따라 주석(Comment)을 작성하시오.

(지침 1) '='이 있는 라인
  - '=' 왼쪽 변수의 목적(용도)을 설명하시오.
  - '=' 오른쪽 수식이 왜 해당 변수의 의미에 부합하는지 설명하시오.
(지침 2) '='이 없는 라인
  - 명령어의 기능을 설명하시오.
  - 왜 해당 명령을 수행하는지 설명하시오.`,
          starterCode: `import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat

file_load("ch4/sampled_ft.mat"); mat = loadmat("sampled_ft.mat")
t_vector = mat['t_vector'][0]; ft_vector = mat['ft_vector'][0]

t_step=t_vector[1]-t_vector[0]

Fw30=np.sum(?*np.exp(-1j*30*t_vector))*t_step #완성해야 할 부분 (1)
#위 라인은 w=30에서 푸리에 변한 F(w) 즉, F(30)을 수치적분(2장의 문제 1 참고)으로 구현한 것

Fw70=? #완성해야 할 부분 (2)
Fw200=? #완성해야 할 부분 (3)`
        },
        { //문제 4.C
          "id": "4-4C",
          "title": "4.C.",
          "prompt": `아래는 주파수 $\\omega$를 -25,000에서 50 간격으로 25,000까지 증가시켜가면서, 각각의 $\\omega$에서의 $F(\\omega)$를 계산하고, 이 값들을 순서대로 원소로 갖는 벡터 ‘Fw_vector’를 만들고, 진폭(Magnitude) 스펙트럼을 그리는 py 스크립트이다.
\`\`\`python          
import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat

file_load("ch4/sampled_ft.mat"); mat = loadmat("sampled_ft.mat")
t_vector = mat['t_vector'][0]; ft_vector = mat['ft_vector'][0]

t_step=t_vector[1]-t_vector[0]

Fw_vector=np.empty(0)
w_vector=np.empty(0)
for w in range(-25000, 25000, 50):
    
    Fw=np.sum(?*np.exp(-1j*w*t_vector))*t_step
    
    w_vector=np.append(w_vector,w)
    Fw_vector=np.append(Fw_vector,Fw)

plt.plot(w_vector,abs(Fw_vector))
plt.xlabel('Frequency [rad/sec]')
plt.grid()
\`\`\``
        },
        {
          "id": "4-4C1",
          "title": "4.C1.",
          "type": "python",
          "prompt": `?를 채워 py 스크립트를 완성하고, 모든 라인에 대해 다음의 지침에 따라 주석(Comment)을 작성하시오.

(지침 1) '='이 있는 라인
  - '=' 왼쪽 변수의 목적(용도)을 설명하시오.
  - '=' 오른쪽 수식이 왜 해당 변수의 의미에 부합하는지 설명하시오.
(지침 2) '='이 없는 라인
  - 명령어의 기능을 설명하시오.
  - 왜 해당 명령을 수행하는지 설명하시오.
  
이후, 완성한 py 스크립트를 수행하여 결과 그래프를 확인하시오.`,
          starterCode: `import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat

file_load("ch4/sampled_ft.mat"); mat = loadmat("sampled_ft.mat")
t_vector = mat['t_vector'][0]; ft_vector = mat['ft_vector'][0]

t_step=t_vector[1]-t_vector[0]

Fw_vector=np.empty(0)
w_vector=np.empty(0)
for w in range(-25000, 25000, 50):
    
    Fw=np.sum(?*np.exp(-1j*w*t_vector))*t_step
    
    w_vector=np.append(w_vector,w)
    Fw_vector=np.append(Fw_vector,Fw)

plt.plot(w_vector,abs(Fw_vector))
plt.xlabel('Frequency [rad/sec]')
plt.grid()`
        },
        {
          "id": "4-4C2",
          "title": "4.C2.",
          "type": "essay",
          "prompt": `위 py 스크립트에서 14번째 라인 ‘Fw=np.sum(?*np.exp(-1j*w*t_vector))*t_step’은 푸리에 변환을 수치적분으로 구현한 것이다. 이것을 for 문으로 반복해야 하는 이유를 쓰시오.`,
        },
        {
          "id": "4-4C3",
          "title": "4.C3.",
          "type": "essay",
          "prompt": `문제 4.C1에서 확인한 결과 그래프에서, $f(t)$의 주파수 성분은 주로 몇 kHz 이내에 있는지 쓰시오.
          
(주의. 그래프의 $x$축 단위는 rad/sec이므로 Hz 단위로 변환하여야 함)`,
        },
        {
          "id": "4-4C4",
          "title": "4.C4.",
          "type": "python",
          consoleEnabled: true,
          "prompt": `문제 4.C1에서 완성한 py 스크립트를 복사하여 붙여넣은 후, Console에서 아래를 수행하여 $f(t)$의 스펙트럼에서 최대로 큰 곳이 주파수가 얼마인지 쓰시오.
\`\`\`python          
>>> T=np.argmax(abs(Fw_vector)) #T는 가장 큰 원소의 인덱스임.
>>> abs(w_vector[T]) #주파수 벡터에서 해당 인덱스의 원소를 찾아냄. 진폭 스펙트럼은 원점을 기준으로 좌우 대칭이므로, 함수 ‘np.argmax()’는 음수 주파수 영역에서 ‘Fw_vector’의 최댓값을 찾아낸다. 양수 주파수 영역에서 진폭 스펙트럼이 최댓값을 가지는 주파수를 찾기 위해 함수 ‘abs()’를 사용한다.
\`\`\``,
        },
        {
          "id": "4-4C5",
          "title": "4.C5.",
          "type": "essay",
          "prompt": `가청 주파수의 범위를 쓰고, 문제 4.C3~4.C4의 답에 근거하여 $f(t)$가 가청 신호인지 판단하시오.`
        },
        { //문제 4.D
          "id": "4-4D",
          "title": "4.D.",
          "type": "python",
          starterCode: `import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat

file_load("ch4/sampled_ft.mat"); mat = loadmat("sampled_ft.mat")
t_vector = mat['t_vector'][0]; ft_vector = mat['ft_vector'][0]

signal_play(ft_vector,8192)`,
          "prompt": `PC 오디오 출력에 스피커나 이어폰을 연결하여 PC 사운드를 들을 수 있도록 준비하시오. 이후, 아래 py 스크립트를 실행하여 재생이 잘 되는지 확인하시오.
\`\`\`python          
import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat

file_load("ch4/sampled_ft.mat"); mat = loadmat("sampled_ft.mat")
t_vector = mat['t_vector'][0]; ft_vector = mat['ft_vector'][0]

signal_play(ft_vector,8192)
\`\`\``
        },
        { //문제 4.E
          "id": "4-4E",
          "title": "4.E.",
          "prompt": `가청 신호인 $f(t)$를 미분한 함수 즉, $\\dfrac{df(t)}{dt}$의 스펙트럼을 그려보고 소리를 청취함으로써, 미분의 물리적 의미를 파악하자.`
        },
        {
          "id": "4-4E1",
          "title": "4.E1.",
          "type": "proof",
          "prompt": `$F(\\omega)$와 $D(\\omega)$는 각각 $f(t)$와 $\\dfrac{df(t)}{dt}$의 푸리에 변환이라고 할 때, $\\left| D(\\omega) \\right| = \\left| \\omega \\right| \\times \\left| F(\\omega) \\right|$임을 증명하시오.`,
        },
        {
          "id": "4-4E2",
          "title": "4.E2.",
          "type": "proof",
          "prompt": `$\\left| D(\\omega) \\right| = \\left| \\omega \\right| \\times \\left| F(\\omega) \\right|$를 근거로, $\\left| D(\\omega) \\right|$와 $\\left| F(\\omega) \\right|$ 그래프 모양의 상대적인 차이점이 어떠한지 설명하시오.`,
        },
        {
          "id": "4-4E3",
          "title": "4.E3.",
          "type": "essay",
          "prompt": `벡터 ‘ft_vector’의 $n$번째 샘플에서의 미분값(기울기)은 ‘(ft_vector[n+1]-ft_vector[n])/샘플 간격’으로 근사화할 수 있음을 설명하시오.`
        },
        {
          "id": "4-4E4",
          "title": "4.E4.",
          "type": "python",
          starterCode: `import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat

file_load("ch4/sampled_ft.mat"); mat = loadmat("sampled_ft.mat")
t_vector = mat['t_vector'][0]; ft_vector = mat['ft_vector'][0]

t_step=t_vector[1]-t_vector[0]
L=len(ft_vector)
diff_out=(ft_vector[2:L]-ft_vector[1:(L-1)])/t_step
t_vector=t_vector[1:(L-1)] #‘diff_out’의 길이는 L이 아니라 L-1이므로 ‘t_vector’에 저장된 마지막 샘플링 시점을 제거함

Dw_vector=np.empty(0)
w_vector=np.empty(0)
for w in range(-25000, 25000, 50):
    w_vector=np.append(w_vector,w)
    Dw=np.sum(?*np.exp(-1j*?*?))*t_step #푸리에 변환 공식을 수치적분으로 구함.
    Dw_vector=np.append(Dw_vector,Dw)

plt.plot(w_vector,abs(Dw_vector))
plt.xlabel('Frequency [rad/sec]')
plt.grid()`,
          "prompt": `‘ft_vector’의 샘플 간격은 1/8192이므로, ‘ft_vector’의 길이를 ‘L’이라 할 때, ‘diff_out=(ft_vector[2:L]- ft_vector[1:(L-1)])/샘플 간격’으로 ‘diff_out’을 생성하면, ‘diff_out’은 $\\dfrac{df(t)}{dt}$에 대한 샘플 벡터로 근사화할 수 있다. 아래는 $\\dfrac{df(t)}{dt}$의 푸리에 변환을 Python 벡터로 생성하고 Magnitude 스펙트럼을 그리는 py 스크립트이다.
\`\`\`python          
import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat

file_load("ch4/sampled_ft.mat"); mat = loadmat("sampled_ft.mat")
t_vector = mat['t_vector'][0]; ft_vector = mat['ft_vector'][0]

t_step=t_vector[1]-t_vector[0]
L=len(ft_vector)
diff_out=(ft_vector[2:L]-ft_vector[1:(L-1)])/t_step
t_vector=t_vector[1:(L-1)] #‘diff_out’의 길이는 L이 아니라 L-1이므로 ‘t_vector’에 저장된 마지막 샘플링 시점을 제거함

Dw_vector=np.empty(0)
w_vector=np.empty(0)
for w in range(-25000, 25000, 50):
    w_vector=np.append(w_vector,w)
    Dw=np.sum(?*np.exp(-1j*?*?))*t_step #푸리에 변환 공식을 수치적분으로 구함.
    Dw_vector=np.append(Dw_vector,Dw)

plt.plot(w_vector,abs(Dw_vector))
plt.xlabel('Frequency [rad/sec]')
plt.grid()
\`\`\`
?를 채워 py 스크립트를 완성하고, 모든 라인에 대해 다음의 지침에 따라 주석(Comment)을 작성하시오.

(지침 1) '='이 있는 라인
  - '=' 왼쪽 변수의 목적(용도)을 설명하시오.
  - '=' 오른쪽 수식이 왜 해당 변수의 의미에 부합하는지 설명하시오.
(지침 2) '='이 없는 라인
  - 명령어의 기능을 설명하시오.
  - 왜 해당 명령을 수행하는지 설명하시오.
  
이후, 완성한 py 스크립트를 수행하여 $\\left| D(\\omega) \\right|$의 결과 그래프를 확인하시오.`,
        },
        {
          "id": "4-4E5",
          "title": "4.E5.",
          "type": "essay",
          "prompt": `문제 4.E4의 $\\left| D(\\omega) \\right|$의 그래프와 문제 4.C1의 $\\left| F(\\omega) \\right|$의 그래프의 관계가, 문제 4.E2의 답과 일치하는지 설명하시오. ($y$축의 절대적인 값보다는 스펙트럼의 전체적인 모양을 보고, 두 스펙트럼의 모양의 차이를 기반으로 설명할 것)`
        },
        {
          "id": "4-4E6",
          "title": "4.E6.",
          "type": "python",
          "prompt": `문제 4.E4의 py 스크립트를 복사하여 붙여넣은 후, 아래를 추가하시오.
\`\`\`python          
#문제 4.E4의 py 스크립트에 아래를 추가

signal_play(diff_out,8192)
\`\`\`
이후, py 스크립트를 실행한 후 $\\dfrac{df(t)}{dt}$를 재생하시오.
          `
        },
        {
          "id": "4-4E7",
          "title": "4.E7.",
          "type": "essay",
          "prompt": `문제 4.D에서 들은 $f(t)$는 합창 소리 뒷 배경으로 미약한 저음의 베이스 기타 소리가 있음을 확인할 수 있었을 것이다. $f(t)$와 문제 4.E6에서 들은 $\\dfrac{df(t)}{dt}$의 베이스 기타 소리의 크기를 비교하고, 문제 4.E5의 결과와 관련지어 베이스 기타 소리 크기 비교 결과에 대한 이유를 쓰시오.`
        },
        {
          "id": "4-4E8",
          "title": "4.E8.",
          "type": "essay",
          "prompt": `지금까지 실험 결과를 바탕으로, '미분기는 선형 시스템이다.'라고 말할 수 있는 이유를 설명하고, 문제 4.E5의 결과를 토대로 미분기가 고역 통과 필터(High Pass Filter, HPF)의 일종인 이유를 설명하시오.`
        },
      ],
    },
  ]
} as const;
