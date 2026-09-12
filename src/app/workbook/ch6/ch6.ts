import type { WorkbookChapter } from '@/types/workbook';

export const chapter = {
  "id": "6-LPF-BPF-Design",
  "title": "Chapter 6. LPF and BPF Design",
  "sections": [
    { //문제 1
      "id": "6-1",
      "title": "1. 사운드 신호의 파워 스펙트럼 분석",
      "problems": [
        { //문제 1.A
          "id": "6-1A",
          "title": "1.A.",
          "type": "python",
          consoleEnabled: true,
          starterCode: `file_load("ch6/chirp.wav")
file_load("ch6/gong.wav")
file_load("ch6/handel.wav")
file_load("ch6/laughter.wav")
file_load("ch6/splat.wav")
file_load("ch6/train.wav")`,
          "prompt": `아래는 이번 실습에 사용할 6가지의 wav 파일을 불러오는 py 스크립트이다.
\`\`\`python
file_load("ch6/chirp.wav")
file_load("ch6/gong.wav")
file_load("ch6/handel.wav")
file_load("ch6/laughter.wav")
file_load("ch6/splat.wav")
file_load("ch6/train.wav")
\`\`\`
위 py 스크립트를 실행하여 6가지의 오디오(Auido) 파일을 불러오고, Console에서 아래 명령어를 수행하여 wav 파일을 불러들이시오. ‘fs’는 샘플링 주파수 값, ‘data’는 오디오 샘플 벡터가 설정된다.
\`\`\`python
>>> from scipy.io import wavfile
>>> fs, data = wavfile.read('gong.wav')
\`\`\`
이후, Console에서 ‘fs’를 입력하여 샘플링 주파수가 얼마인지 쓰고, 샘플링 주파수로부터 샘플의 시간 간격을 계산하여 쓰시오. 그리고, 샘플의 시간 간격과 오디오 샘플 벡터 ‘data’의 길이로부터 오디오 샘플의 시간 길이를 계산하시오.
          `,
        },
        {
          "id": "6-1B",
          "title": "1.B.",
          "type": "python",
          consoleEnabled: true,
          starterCode: `file_load("ch6/chirp.wav")
file_load("ch6/gong.wav")
file_load("ch6/handel.wav")
file_load("ch6/laughter.wav")
file_load("ch6/splat.wav")
file_load("ch6/train.wav")`,
          "prompt": `py 스크립트 실행 후, Console에서 아래를 입력하여 샘플 벡터를 재생하시오.
\`\`\`python
>>> from scipy.io import wavfile
>>> fs, data = wavfile.read('gong.wav')
>>> signal_play(data,fs)
\`\`\`
각각 어떠한 소리가 나는지 쓰고, (6가지의 오디오 샘플링 파일 각각에 대하여 반복할 것) 6개의 오디오 파일 중 가장 높은 음계를 가진 소리는 어떤 것이었는지 쓰시오.
          `,
        },
        { //문제 1.C
          "id": "6-1C",
          "title": "1.C.",
          "type": "python",
          consoleEnabled: true,
          starterCode: `file_load("ch6/chirp.wav")
file_load("ch6/gong.wav")
file_load("ch6/handel.wav")
file_load("ch6/laughter.wav")
file_load("ch6/splat.wav")
file_load("ch6/train.wav")`,
          "prompt": `함수 ‘plt.psd()’는 샘플링된 벡터의 진폭(Magnitude) 스펙트럼을 출력하거나 그래프를 그린다. 예를 들어, 임의의 시간 함수(또는 신호) $h(t)$를 ‘fs’의 샘플링 주파수로 샘플링한 벡터를 ‘ht’라 할 때, ‘plt.psd(ht, NFFT=fs*2, Fs=fs)’를 수행하면, 가로축은 주파수 $\\omega$, 세로축은 $h(t)$의 PSD를 그린다. 6개의 오디오 파일의 PSD를 그려보자.

py 스크립트 실행 후, Console에서 아래를 실행하여, 6개의 오디오 파일의 데이터를 불러오고, 각 오디오 파일에 대한 PSD를 그리시오. ‘plt.subplot()’을 사용하여 한 개의 창에 모두 나타내고, 결과 그래프를 확인하시오.
\`\`\`python
>>> from scipy.io import wavfile
>>> import matplotlib.pyplot as plt
>>> fs, data=wavfile.read('chirp.wav'); plt.subplot(6,1,1); plt.psd(data,NFFT=fs*2,Fs=fs)
>>> fs, data=wavfile.read('gong.wav'); plt.subplot(6,1,2); plt.psd(data,NFFT=fs*2,Fs=fs)
>>> fs, data=wavfile.read('handel.wav'); plt.subplot(6,1,3); plt.psd(data,NFFT=fs*2,Fs=fs)
>>> ...
>>> ...
>>> ...
\`\`\`
PSD 모양이 문제 1.B에서 답한 것과 부합하는지 쓰시오. (각 PSD의 절대적인 크기가 아니라, 각 신호에 포함된 주파수 성분이 주로 어디에 분포되어 있는지를 분석하여 볼 것)
          `,
        },
        {
          "id": "6-1D",
          "title": "1.D.",
          "type": "proof",
          "prompt": `문제 1.C에서 그린 PSD 그래프를 보면 양수의 주파수 영역에서만 주파수 스펙트럼을 보여주는 것을 알 수 있다. 실수 함수의 주파수 스펙트럼 모양은 $y$축에 대하여 대칭이기 때문이다. 임의의 ‘실수’ 함수 $f(t)$의 푸리에 변환을 $F(\\omega)$라 할 때 $\\left| F(\\omega) \\right| = \\left| F(-\\omega) \\right|$임을 수식 유도로 증명하시오.`
        },
        {
          "id": "6-1E",
          "title": "1.E.",
          "prompt": `아래는 오디오 파일 ‘handel.wav’을 읽어 데이터 샘플 벡터 변수를 ‘data’로 설정한 후, 주파수가 3.XkHz(X=학번 끝자리)인 사인파의 샘플 벡터 ‘tone’을 더한 사운드 샘플 벡터 변수 ‘y_plus_tone’를 생성하고 PSD를 그리는 py 스크립트이다.
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt
from scipy.io import wavfile
from scipy.signal import welch

file_load("ch6/handel.wav")
fs, data = wavfile.read('handel.wav')
data=data.astype(float)
data=data/np.max(np.abs(data)) # 정규화, 내용과 상관 없는 부분.

t_step=1/fs
t=np.arange(0,len(data)*t_step,t_step)
tone=np.sin(2*np.pi*3.Xe3*t) # X=학번 끝자리
y_plus_tone=data+tone
f,Pxx=welch(y_plus_tone, fs=fs)
plt.figure()
plt.semilogy(f,Pxx)
plt.grid()
\`\`\`
          `,
        },
        {
          "id": "6-1E1",
          "title": "1.E1.",
          "type": "python",
          starterCode: `import numpy as np
import matplotlib.pyplot as plt
from scipy.io import wavfile
from scipy.signal import welch

file_load("ch6/handel.wav")
fs, data = wavfile.read('handel.wav')
data=data.astype(float)
data=data/np.max(np.abs(data)) # 정규화, 내용과 상관 없는 부분.

t_step=1/fs
t=np.arange(0,len(data)*t_step,t_step)
tone=np.sin(2*np.pi*3.Xe3*t) # X=학번 끝자리
y_plus_tone=data+tone
f,Pxx=welch(y_plus_tone, fs=fs)
plt.figure()
plt.semilogy(f,Pxx)
plt.grid()`,
          "prompt": `위 py 스크립트에서 자신의 학번 끝자리를 채워 완성된 py 스크립트를 실행한 후, 결과 그래프를 확인하시오.`
        },
        {
          "id": "6-1E2",
          "title": "1.E2.",
          "type": "essay",
          "prompt": `문제 1.E1의 PSD 그래프를 바탕으로 3.XkHz인 사인파의 샘플 벡터가 제대로 더해졌다고 볼 수 있는 이유를 쓰시오.`
        },
        {
          "id": "6-1E3",
          "title": "1.E3.",
          "type": "python",
          consoleEnabled: true,
          "prompt": `완성한 문제 1.E1의 py 스크립트를 복사하여 붙여넣은 후, Console에서 아래를 실행하여 소리를 재생하시오.
\`\`\`python
>>> signal_play(y_plus_tone,fs)
\`\`\`          
소리를 재생한 결과를 쓰시오. 이러한 소리가 나는 이유도 쓰시오.`,
        },
      ],
    },
    { //문제 2
      "id": "6-2",
      "title": "2. LPF(Low Pass Filter) 설계",
      "problems": [
        { //문제 2.A
          "id": "6-2A",
          "title": "2.A.",
          "prompt": `주파수 전달 함수가 $H(\\omega)$인 선형 시스템이 있다.`
        },
        {
          "id": "6-2A1",
          "title": "2.A1.",
          "type": "proof",
          "prompt": `입력의 스펙트럼(푸리에 변환)이 $X(\\omega)$일 때, 출력의 스펙트럼(푸리에 변환) $Y(\\omega)$을 $H(\\omega)$와 $X(\\omega)$로 나타내시오.`
        },
        {
          "id": "6-2A2",
          "title": "2.A2.",
          "type": "proof",
          "prompt": `선형 시스템의 주파수 전달 함수 $H(\\omega)$가 주어졌을 때 이로부터 이 시스템의 임펄스 응답 $h(t)$를 구하려 한다. 구하는 관계식을 쓰시오.`
        },
        {
          "id": "6-2A3",
          "title": "2.A3.",
          "type": "proof",
          "prompt": `문제 2.A1, 2.A2에서 답한 식을 유도하면, 입력이 $x(t)$일 때 출력 $y(t)$는 [[equation:6.1]]과 같이 콘볼루션 연산으로 구할 수 있음을 보일 수 있다. 문제 2.A1, 2.A2에서 답한 식으로부터, [[equation:6.1]]을 유도하시오.
$$
y(t)=h(t)*x(t)
\\qquad \\text{* = 컨볼루션 연산자}
\\qquad \\text{(식 6.1)}
$$`
        },
        { //문제 2.B
          "id": "6-2B",
          "title": "2.B.",
          "prompt": `[[equation:6.2]]와 같은 주파수 전달함수를 갖는 선형 시스템이 있다.
$$
H(\\omega)
=
\\begin{cases}
1, & \\left| \\omega \\right| \\le 2\\pi B \\text{[rad/sec]} \\\\
0, & \\left| \\omega \\right| > 2\\pi B \\text{[rad/sec]}
\\end{cases}
\\qquad \\text{(식 6.2)}
$$`
        },
        {
          "id": "6-2B1",
          "title": "2.B1.",
          "type": "essay",
          "prompt": `이 시스템을 LPF(Low Pass Filter, 저역통과필터)라고 부르는 이유는 무엇인가? 반드시 문제 2.A1의 답을 이용하여 설명하시오.`
        },
        {
          "id": "6-2B2",
          "title": "2.B2.",
          "type": "essay",
          "prompt": `이 LPF의 대역폭은 몇 Hz인가? (단위 주의)`
        },
        {
          "id": "6-2B3",
          "title": "2.B3.",
          "type": "essay",
          "prompt": `[[equation:6.2]]에서 $B$가 무한대일 때, $H(\\omega)$는 대역폭이 무한대인 필터의 주파수 응답이 된다. 대역폭이 무한대인 필터를 통과할 경우 $Y(\\omega)=X(\\omega)$가 되는 이유를 문제 2.A1의 답을 이용하여 설명하시오.`
        },
        { //문제 2.C
          "id": "6-2C",
          "title": "2.C.",
          "prompt": `선형 시스템의 주파수 전달함수 $H(\\omega)$가 주어졌을 때, 이로부터 이 시스템의 임펄스 응답 $h(t)$를 구하려 한다.`
        },
        {
          "id": "6-2C1",
          "title": "2.C1.",
          "type": "proof",
          "prompt": `문제 2.A2에서 답한 관계식을 이용하여 [[equation:6.2]]에 주어진 LPF의 임펄스 응답은 [[equation:6.3]]과 같음을 유도하시오.
$$
h(t)=2B\\operatorname{sinc}(2Bt)
\\qquad \\text{where} \\qquad \\operatorname{sinc}(x) \\triangleq \\dfrac{\\sin(\\pi x)}{\\pi x}
\\qquad \\text{(식 6.3)}
$$`
        },
        {
          "id": "6-2C2",
          "title": "2.C2.",
          "type": "python",
          starterCode: `import numpy as np
import matplotlib.pyplot as plt

B=200
t=np.arange(-0.02,0.02,(1/8192))
ht=2*B*np.sinc(2*B*t)
plt.plot(t,ht)
plt.grid()`,
          "prompt": `아래는 $B=200$Hz일 때 [[equation:6.3]]의 $h(t)$를 Python 벡터로 생성하여 그림을 그리는 과정이다. 무한대의 시간까지 존재하지만 모든 시간 영역을 그릴 수는 없으므로, $-0.02 \\le t \\le 0.02$ 영역에서 1/8192초 시간 간격으로 $h(t)$를 생성하였다. 아래 py 스크립트를 실행하고 결과 그래프를 확인하시오.
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

B=200
t=np.arange(-0.02,0.02,(1/8192))
ht=2*B*np.sinc(2*B*t)
plt.plot(t,ht)
plt.grid()
\`\`\`
          `
        },
        {
          "id": "6-2C3",
          "title": "2.C3.",
          "type": "python",
          starterCode: `import numpy as np
import matplotlib.pyplot as plt

B=200
t=np.arange(-0.02,0.02,(1/8192))
ht=2*B*np.sinc(2*B*t)
plt.plot(t,ht)
plt.grid()`,
          "prompt": `‘B=100, 400’인 각 경우에 대하여 py 스크립트를 수정하여 각각 실행하시오.`
        },
        {
          "id": "6-2C4",
          "title": "2.C4.",
          "type": "essay",
          "prompt": `문제 2.C2~2.C3의 그림 결과를 토대로 LPF의 대역폭과 LPF의 임펄스 응답의 폭과의 관계를 쓰시오.`
        },
        {
          "id": "6-2C5",
          "title": "2.C5.",
          "type": "essay",
          "prompt": `만약 $B$가 무한대가 되면, $h(t)$는 어떤 함수로 수렴하겠는가?`
        },
        {
          "id": "6-2C6",
          "title": "2.C6.",
          "type": "essay",
          "prompt": `문제 2.C5에서 답한 함수를 [[equation:6.1]]에 대입하면, $y(t)$는 무엇과 같아지는가?`
        },
        {
          "id": "6-2C7",
          "title": "2.C7.",
          "type": "essay",
          "prompt": `문제 2.C6의 결과는 문제 2.B3에서 답한 대역폭이 무한대인 LPF의 개념과 일치하는가?`
        },
        {
          "id": "6-2C8",
          "title": "2.C8.",
          "type": "essay",
          "prompt": `문제 2.C2(또는 2.C3)에서 그린 임펄스 응답을 갖는 선형 시스템은 현실적으로 구현할 수 없는 이유는 무엇인가?`
        },
        { //문제 2.D
          "id": "6-2D",
          "title": "2.D.",
          "prompt": `[[equation:6.4]]와 같은 현실적인 임펄스 응답을 갖는 LPF를 고려하자.
$$
h(t)
=
\\begin{cases}
2B\\operatorname{sinc}(2B(t-t_d)), & 0 \\le t \\le 2t_d \\\\
0, & \\text{elsewhere}
\\end{cases}
\\qquad \\text{(식 6.4)}
$$
          `
        },
        {
          "id": "6-2D1",
          "title": "2.D1.",
          "type": "python",
          starterCode: `import numpy as np
import matplotlib.pyplot as plt

B=200
t=np.arange(-0.02,0.02,(1/8192))
ht=2*B*np.sinc(2*B*t)
plt.plot(t,ht)
plt.grid()`,
          "prompt": `아래는 $B=200$Hz, $t_d=0.02$에 대하여 [[equation:6.4]]를 생성하고 그리는 py 스크립트이다.
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

B=200
td=0.02
t_step=1/8192
t=np.arange(0,2*td,t_step)
ht=2*B*np.sinc(2*B*(t-td))
plt.plot(t,ht)
plt.grid()
\`\`\`
py 스크립트를 실행하고 결과 그래프를 확인하시오.
          `
        },
        {
          "id": "6-2D2",
          "title": "2.D2.",
          "type": "essay",
          "prompt": `문제 2.D1에서 그린 임펄스 응답을 갖는 선형 시스템은 현실적으로 구현할 수 있는 이유는 무엇인가?`
        },
        {
          "id": "6-2D3",
          "title": "2.D3.",
          "type": "python",
          starterCode: `import numpy as np
import matplotlib.pyplot as plt

B=2000 #대역폭, 현재 2kHz로 설정
td=0.02 #지연 시간
t_step=1/8192
t=np.arange(0,2*td,t_step)

ht=2*B*np.sinc(2*B*(t-td)) #(식 6.4)

Hw_vector=np.empty(0)
w_vector=np.empty(0)
for w in range(-20000,20000,10):
    w_vector=np.append(w_vector,w)
    Hw=sum(?*np.exp(-1j*w*?))*t_step
    Hw_vector=np.append(Hw_vector,Hw)
 
plt.figure()
plt.subplot(3,1,1)
plt.plot(t,ht); plt.xlabel('t [sec]'); plt.ylabel('h(t)'); plt.grid()
plt.subplot(3,1,2)
plt.plot(w_vector,abs(Hw_vector))
plt.xlabel('w [rad/sec]'); plt.ylabel('|H(w)|'); plt.grid()
plt.subplot(3,1,3)
plt.plot(w_vector,np.angle(Hw_vector))
plt.xlabel('w [rad/sec]'); plt.ylabel('\angle H(w)'); plt.grid(); plt.axis([-50,50,-1,1])`,
          "prompt": `[[equation:6.4]]는 [[equation:6.3]]과 다르므로, [[equation:6.4]]의 임펄스 응답을 갖는 현실적인 LPF의 $H(\\omega)$ 또한 [[equation:6.2]]와 다르다. $H(\\omega)$는 [[equation:6.4]]의 $h(t)$를 푸리에 변환하여 얻을 수 있다. 하지만, 시간 축에서 제한된 영역에만 존재하는 Truncated sinc 모양이므로 수식에 의한 푸리에 변환은 힘들다. 이런 경우, 수치적분([[link:/workbook/ch2?p=2-1A|2장의 문제 1]] 참고)을 이용한 푸리에 변환으로 $H(\\omega)$의 Python 벡터를 생성할 수 있다.
          
아래는 $h(t)$의 Python 샘플 벡터 ‘ht’로부터 $H(\\omega)$의 Python 벡터 ‘Hw_vectror’를 수치적분으로 구하고, 진폭(Magnitude) 스펙트럼 $\\left| H(\\omega) \\right|$과 위상(Phase) 스펙트럼 $\\angle H(\\omega)$를 그리는 py 스크립트이다.

<수치적분 참고 사항>
- $0 \\le t \\le 0.04$ 영역 밖에서는 $h(t)=0$이므로, 푸리에 변환 식 $\\int_{-\\infty}^{\\infty} h(t)e^{-j\\omega t}dt=\\int_{0}^{0.04} h(t)e^{-j\\omega t}dt$임. 따라서, 수치적분 구간도 0~0.04까지로 설정함.
- 푸리에 변환 주파수 범위 = -20,000rad/sec에서 20,000rad/sec까지, 주파수 간격 = 10rad/sec로 설정함.
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

B=2000 #대역폭, 현재 2kHz로 설정
td=0.02 #지연 시간
t_step=1/8192
t=np.arange(0,2*td,t_step)

ht=2*B*np.sinc(2*B*(t-td)) #(식 6.4)

Hw_vector=np.empty(0)
w_vector=np.empty(0)
for w in range(-20000,20000,10):
    w_vector=np.append(w_vector,w)
    Hw=sum(?*np.exp(-1j*w*?))*t_step
    Hw_vector=np.append(Hw_vector,Hw)
 
plt.figure()
plt.subplot(3,1,1)
plt.plot(t,ht); plt.xlabel('t [sec]'); plt.ylabel('h(t)'); plt.grid()
plt.subplot(3,1,2)
plt.plot(w_vector,abs(Hw_vector))
plt.xlabel('w [rad/sec]'); plt.ylabel('|H(w)|'); plt.grid()
plt.subplot(3,1,3)
plt.plot(w_vector,np.angle(Hw_vector))
plt.xlabel('w [rad/sec]'); plt.ylabel('\angle H(w)'); plt.grid(); plt.axis([-50,50,-1,1])
\`\`\`
위 py 스크립트에서 15번째 라인 ‘Hw=sum(?.*exp(-j*w*?))*t_step’은 $h(t)$(샘플 벡터 = ‘ht’)의 푸리에 변환 $\\int_{0}^{0.04} h(t)e^{-j\\omega t}dt$를 수치적분으로 구현한 것이다. 두 군데 ?를 채워 완성하고 py 스크립트를 수행한 후 결과 그래프를 확인하시오.
`
        },
        {
          "id": "6-2D4",
          "title": "2.D4.",
          "type": "essay",
          "prompt": `문제 2.D3에서 그린 진폭 스펙트럼으로부터 설계한 LPF의 3dB 대역폭은 얼마인지 측정하여 Hz 단위로 쓰시오.`
        },
        {
          "id": "6-2D5",
          "title": "2.D5.",
          "type": "essay",
          "prompt": `문제 2.D3에서 그린 위상 스펙트럼(Figure 창에서 맨 하단 그림)의 원점에서의 기울기를 측정하여 쓰시오.`
        },
        {
          "id": "6-2D6",
          "title": "2.D6.",
          "type": "python",
          "prompt": `문제 2.D3의 py 스크립트를 복사해서 붙여넣은 후, 지연 시간 ‘td=0.01, 0.03’으로 수정하여 각각 수행한 결과 그래프를 확인하시오.`
        },
        {
          "id": "6-2D7",
          "title": "2.D7.",
          "type": "essay",
          "prompt": `문제 2.D3, 2.D6에서 확인한 각 Figure 창에서 맨 상단 그림을 보면, $h(t)$는 지연된 sinc 파형임을 알 수 있다. 각 Figure 창에서 지연 시간을 측정하여 쓰시오. 또, 각각에 대하여 $H(\\omega)$의 위상 스펙트럼(각 Figure 창에서 맨 하단 그림)의 원점에서의 기울기를 측정하여 <표 6.1>의 ①~⑥을 채우시오.
[[table:
caption:표 6.1 $h(t)$의 지연 시간과 위상 스펙트럼의 기울기
$h(t)$의 지연 시간 | 측정한 지연 시간(최댓값 위치) | 측정한 위상 스펙트럼의 기울기 
$t_d=0.01$ | ① | ② 
$t_d=0.02$ | ③ | ④ 
$t_d=0.03$ | ⑤ | ⑥
]]`
        },
        {
          "id": "6-2D8",
          "title": "2.D8.",
          "type": "essay",
          "prompt": `문제 2.D5와 <표 6.1>의 결과를 바탕으로, 시간 축에서 신호의 지연은 위상 스펙트럼에 어떤 영향을 미치는지 쓰고, ‘td’와 $\\angle H(\\omega)$의 기울기의 관계식을 세우시오.`
        },
        {
          "id": "6-2D9",
          "title": "2.D9.",
          "type": "essay",
          "prompt": `문제 2.D3, 2.D6에서 확인한 그래프를 바탕으로, 시간 축에서 신호의 지연은 진폭 스펙트럼 $\\left| H(\\omega) \\right|$에 어떤 영향을 미치는지 쓰시오.`
        },
        {
          "id": "6-2D10",
          "title": "2.D10.",
          "type": "python",
          "prompt": `문제 2.D3에서 완성한 py 스크립트를 복사하여 붙여넣은 후, 대역폭 ‘B=250, 1000’으로 바꿔서 각각 수행하시오. 결과 그래프에서 측정한 대역폭이 ‘B’와 일치하는지 다시 확인하시오.`
        },
        {
          "id": "6-2D11",
          "title": "2.D11.",
          "type": "python",
          "prompt": `$h(t)$의 파형이 지연된 만큼 LPF의 출력 또한 지연된다. LPF의 지연을 줄이기 위하여 문제 2.D3에서 완성한 py 스크립트를 복사하여 붙여넣은 후, ‘td=0.001’로 수정한 후 수행하여 결과 그래프를 확인하시오.`
        },
        {
          "id": "6-2D12",
          "title": "2.D12.",
          "type": "essay",
          "prompt": `문제 2.D11의 결과 그래프에서 지연이 줄어든 대신 발생한 문제점을 쓰고, 지연을 줄인 것이 왜 이러한 문제를 유발한 것인지 이유를 쓰시오.`
        },
      ]
    }
  ]
} as const;
