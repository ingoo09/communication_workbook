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
        
          referenceAnswer: `\`wavfile.read()\`로 얻은 \`fs\`가 샘플링 주파수이다. 샘플 시간 간격은
$$
T_s=\\frac{1}{f_s}
$$
이고, 샘플 개수를 $N=\\mathrm{len(data)}$라 하면 오디오의 시간 길이는
$$
T_{\\mathrm{audio}}=\\frac{N}{f_s}=NT_s
$$
이다. 실제 실행 결과의 \`fs\`와 \`len(data)\`를 위 식에 대입하면 된다.`},
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
        
          referenceAnswer: `각 파일은 재생 결과를 바탕으로 대략 다음과 같이 구분할 수 있다.

- \`chirp.wav\`: 시간에 따라 음높이가 변하는 chirp 소리
- \`gong.wav\`: 금속성 gong 소리
- \`handel.wav\`: 음악/합창 음원
- \`laughter.wav\`: 웃음소리
- \`splat.wav\`: 짧은 충격성 소리
- \`train.wav\`: 기차 소리

가장 높은 음계 또는 고주파 성분이 두드러지는 파일은 실제 청취 결과와 PSD를 함께 보고 판단한다. 일반적으로 \`chirp.wav\`는 높은 주파수까지 성분이 확장되므로 고음 성분이 두드러진다.`},
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
        
          referenceAnswer: `PSD에서 각 음원의 주요 주파수 성분이 서로 다른 위치에 분포한다.

저음으로 들리는 신호는 낮은 주파수 영역에 에너지가 집중되고, 날카롭거나 높은 음은 더 높은 주파수까지 성분이 분포한다. 짧은 충격성 소리는 비교적 넓은 주파수 대역을 갖는다.

따라서 문제 1.B에서의 청취 결과와 문제 1.C의 PSD에서 관찰한 주파수 분포는 서로 부합한다고 볼 수 있다.`},
        {
          "id": "6-1D",
          "title": "1.D.",
          "type": "proof",
          "prompt": `문제 1.C에서 그린 PSD 그래프를 보면 양수의 주파수 영역에서만 주파수 스펙트럼을 보여주는 것을 알 수 있다. 실수 함수의 주파수 스펙트럼 모양은 $y$축에 대하여 대칭이기 때문이다. 임의의 ‘실수’ 함수 $f(t)$의 푸리에 변환을 $F(\\omega)$라 할 때 $\\left| F(\\omega) \\right| = \\left| F(-\\omega) \\right|$임을 수식 유도로 증명하시오.`
        ,
          referenceAnswer: `실수 신호 $f(t)$의 푸리에 변환을
$$
F(\\omega)=\\int_{-\\infty}^{\\infty}f(t)e^{-j\\omega t}dt
$$
라 하자.

$f(t)$가 실수이면
$$
F^*(\\omega)
=
\\int_{-\\infty}^{\\infty}f(t)e^{j\\omega t}dt
=
F(-\\omega).
$$

따라서
$$
F(-\\omega)=F^*(\\omega)
$$
이고,
$$
\\boxed{|F(-\\omega)|=|F(\\omega)|}
$$
이다. 그러므로 실수 신호의 magnitude spectrum은 원점을 기준으로 좌우 대칭이다.`},
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
        ,
          referenceAnswer: `학번 끝자리를 $X$라 하면 \`3.Xe3\` 부분을 실제 값으로 바꾼다.

예를 들어 학번 끝자리가 8이면
\`\`\`python
tone=np.sin(2*np.pi*3.8e3*t)
\`\`\`
로 작성한다.

PSD에서는 원래 \`handel.wav\`의 분포 위에 약 3.8 kHz 부근의 뚜렷한 좁은 peak가 나타나야 한다.`},
        {
          "id": "6-1E2",
          "title": "1.E2.",
          "type": "essay",
          "prompt": `문제 1.E1의 PSD 그래프를 바탕으로 3.XkHz인 사인파의 샘플 벡터가 제대로 더해졌다고 볼 수 있는 이유를 쓰시오.`
        ,
          referenceAnswer: `원래 음원의 PSD와 비교했을 때
$$
\\boxed{f=3.X\\text{ kHz}}
$$
부근에 새롭고 뚜렷한 peak가 나타나면 사인파가 정상적으로 더해졌다고 볼 수 있다.

이상적인 사인파는 하나의 주파수 성분을 가지므로 PSD에서 해당 주파수 부근에 에너지가 집중된다.`},
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
        
          referenceAnswer: `재생하면 원래 \`handel.wav\` 음악 위에 일정한 높이의 강한 \`삐\` 소리가 함께 들린다.

이는
$$
y_{\\mathrm{plus\\ tone}}(t)=x_{\\mathrm{handel}}(t)+\\sin(2\\pi f_0t)
$$
처럼 원 음악에 단일 주파수 정현파가 직접 더해졌기 때문이다.`},
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
        ,
          referenceAnswer: `선형 시불변 시스템에서 입력과 출력의 푸리에 변환은
$$
\\boxed{Y(\\omega)=H(\\omega)X(\\omega)}
$$
의 관계를 갖는다.`},
        {
          "id": "6-2A2",
          "title": "2.A2.",
          "type": "proof",
          "prompt": `선형 시스템의 주파수 전달 함수 $H(\\omega)$가 주어졌을 때 이로부터 이 시스템의 임펄스 응답 $h(t)$를 구하려 한다. 구하는 관계식을 쓰시오.`
        ,
          referenceAnswer: `임펄스 응답은 주파수 전달함수의 역푸리에 변환이다.
$$
\\boxed{
h(t)=\\frac{1}{2\\pi}\\int_{-\\infty}^{\\infty}H(\\omega)e^{j\\omega t}d\\omega
}
$$
즉,
$$
\\boxed{h(t)=\\mathcal{F}^{-1}\\{H(\\omega)\\}}
$$
이다.`},
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
        ,
          referenceAnswer: `문제 2.A1에서
$$
Y(\\omega)=H(\\omega)X(\\omega)
$$
이고, 문제 2.A2에서
$$
h(t)=\\mathcal{F}^{-1}\\{H(\\omega)\\}
$$
이다.

푸리에 변환의 컨볼루션 정리에 의해
$$
H(\\omega)X(\\omega)\\longleftrightarrow h(t)*x(t)
$$
이므로
$$
\\boxed{y(t)=h(t)*x(t)}
$$
가 된다.`},
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
        ,
          referenceAnswer: `문제 2.A1에서
$$
Y(\\omega)=H(\\omega)X(\\omega)
$$
이다.

[[equation:6.2]]에서 $|\\omega|\\le2\\pi B$에서는 $H(\\omega)=1$이므로 입력 스펙트럼이 그대로 통과하고, 그보다 높은 주파수에서는 $H(\\omega)=0$이므로 출력이 제거된다.

따라서 낮은 주파수만 통과시키므로 LPF(Low Pass Filter)라고 부른다.`},
        {
          "id": "6-2B2",
          "title": "2.B2.",
          "type": "essay",
          "prompt": `이 LPF의 대역폭은 몇 Hz인가? (단위 주의)`
        ,
          referenceAnswer: `통과 대역은
$$
|\\omega|\\le2\\pi B
$$
이므로 $f=\\omega/(2\\pi)$로 바꾸면
$$
|f|\\le B.
$$
따라서 양의 주파수 기준 cutoff frequency, 즉 대역폭은
$$
\\boxed{B\\text{ Hz}}
$$
이다.`},
        {
          "id": "6-2B3",
          "title": "2.B3.",
          "type": "essay",
          "prompt": `[[equation:6.2]]에서 $B$가 무한대일 때, $H(\\omega)$는 대역폭이 무한대인 필터의 주파수 응답이 된다. 대역폭이 무한대인 필터를 통과할 경우 $Y(\\omega)=X(\\omega)$가 되는 이유를 문제 2.A1의 답을 이용하여 설명하시오.`
        ,
          referenceAnswer: `$B\\to\\infty$이면 모든 유한한 $\\omega$에서
$$
H(\\omega)=1
$$
이 된다.

따라서
$$
Y(\\omega)=H(\\omega)X(\\omega)=X(\\omega)
$$
이므로
$$
\\boxed{Y(\\omega)=X(\\omega)}
$$
이다.`},
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
        ,
          referenceAnswer: `역푸리에 변환을 이용하면
$$
h(t)=\\frac{1}{2\\pi}\\int_{-2\\pi B}^{2\\pi B}e^{j\\omega t}d\\omega.
$$
적분하면
$$
h(t)=\\frac{\\sin(2\\pi Bt)}{\\pi t}.
$$
sinc 정의
$$
\\operatorname{sinc}(x)=\\frac{\\sin(\\pi x)}{\\pi x}
$$
를 이용하면
$$
\\boxed{h(t)=2B\\operatorname{sinc}(2Bt)}
$$
이다.`},
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
        ,
          referenceAnswer: `$B=200$ Hz이면
$$
h(t)=400\\operatorname{sinc}(400t)
$$
이다.

최대값은 $t=0$에서
$$
h(0)=2B=400
$$
이고, 첫 번째 영점은
$$
t=\\pm\\frac{1}{2B}=\\pm0.0025\\text{ s}
$$
에 나타난다.`},
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
        ,
          referenceAnswer: `$B=100$ Hz일 때 첫 번째 영점은
$$
\\pm\\frac{1}{200}=\\pm0.005\\text{ s}
$$
이고, $B=400$ Hz일 때는
$$
\\pm\\frac{1}{800}=\\pm0.00125\\text{ s}
$$
이다.

따라서 $B$가 커질수록 sinc 주엽의 폭은 좁아진다.`},
        {
          "id": "6-2C4",
          "title": "2.C4.",
          "type": "essay",
          "prompt": `문제 2.C2~2.C3의 그림 결과를 토대로 LPF의 대역폭과 LPF의 임펄스 응답의 폭과의 관계를 쓰시오.`
        ,
          referenceAnswer: `LPF의 대역폭 $B$가 커질수록 시간영역 임펄스 응답의 폭은 좁아지고, $B$가 작아질수록 넓어진다.

즉,
$$
\\boxed{\\text{대역폭}\\uparrow\\Rightarrow\\text{임펄스 응답 폭}\\downarrow}
$$
의 관계가 있다.`},
        {
          "id": "6-2C5",
          "title": "2.C5.",
          "type": "essay",
          "prompt": `만약 $B$가 무한대가 되면, $h(t)$는 어떤 함수로 수렴하겠는가?`
        ,
          referenceAnswer: `$B\\to\\infty$이면
$$
2B\\operatorname{sinc}(2Bt)
$$
는 폭이 0으로 줄고 높이가 무한히 커지면서 면적 1을 유지한다.

따라서
$$
\\boxed{h(t)\\to\\delta(t)}
$$
로 수렴한다.`},
        {
          "id": "6-2C6",
          "title": "2.C6.",
          "type": "essay",
          "prompt": `문제 2.C5에서 답한 함수를 [[equation:6.1]]에 대입하면, $y(t)$는 무엇과 같아지는가?`
        ,
          referenceAnswer: `[[equation:6.1]]에 $h(t)=\\delta(t)$를 대입하면
$$
y(t)=\\delta(t)*x(t).
$$
임펄스의 컨볼루션 성질에 의해
$$
\\boxed{y(t)=x(t)}
$$
이다.`},
        {
          "id": "6-2C7",
          "title": "2.C7.",
          "type": "essay",
          "prompt": `문제 2.C6의 결과는 문제 2.B3에서 답한 대역폭이 무한대인 LPF의 개념과 일치하는가?`
        ,
          referenceAnswer: `일치한다.

주파수영역에서는 $B\\to\\infty$일 때 $H(\\omega)=1$이므로 $Y(\\omega)=X(\\omega)$이고, 시간영역에서는 $h(t)=\\delta(t)$이므로 $y(t)=x(t)$가 된다.`},
        {
          "id": "6-2C8",
          "title": "2.C8.",
          "type": "essay",
          "prompt": `문제 2.C2(또는 2.C3)에서 그린 임펄스 응답을 갖는 선형 시스템은 현실적으로 구현할 수 없는 이유는 무엇인가?`
        ,
          referenceAnswer: `이상적인
$$
h(t)=2B\\operatorname{sinc}(2Bt)
$$
는 $t<0$에서도 값이 존재하므로 비인과(non-causal) 시스템이다.

또한 sinc 함수가 무한한 시간까지 지속되므로 무한 길이의 임펄스 응답을 실제 시스템에서 정확히 구현할 수 없다.`},
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
        ,
          referenceAnswer: `실행 결과 sinc 파형의 중심 및 최대값은
$$
\\boxed{t=t_d=0.02\\text{ s}}
$$
부근에 나타난다.

즉, 이상적인 sinc 임펄스 응답을 오른쪽으로 0.02초 이동시킨 뒤 $0\\le t\\le0.04$ 구간만 사용하는 형태이다.`},
        {
          "id": "6-2D2",
          "title": "2.D2.",
          "type": "essay",
          "prompt": `문제 2.D1에서 그린 임펄스 응답을 갖는 선형 시스템은 현실적으로 구현할 수 있는 이유는 무엇인가?`
        ,
          referenceAnswer: `[[equation:6.4]]는
$$
h(t)=0,\\qquad t<0
$$
이므로 인과(causal) 시스템이다.

또한 $0\\le t\\le2t_d$의 유한한 구간에서만 값을 가지므로 실제 FIR 형태로 근사하여 구현할 수 있다.`},
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
        ,
          referenceAnswer: `두 빈칸은 각각 \`ht\`, \`t\`이다.

\`\`\`python
Hw=sum(ht*np.exp(-1j*w*t))*t_step
\`\`\`

즉,
$$
H(\\omega)\\approx\\sum_k h(t_k)e^{-j\\omega t_k}\\Delta t
$$
형태로 푸리에 변환 적분을 수치적으로 계산한다.`},
        {
          "id": "6-2D4",
          "title": "2.D4.",
          "type": "essay",
          "prompt": `문제 2.D3에서 그린 진폭 스펙트럼으로부터 설계한 LPF의 3dB 대역폭은 얼마인지 측정하여 Hz 단위로 쓰시오.`
        ,
          referenceAnswer: `$B=2000$ Hz로 설계했으므로 측정되는 3 dB 대역폭은 대략
$$
\\boxed{2\\text{ kHz 부근}}
$$
이어야 한다.

truncated sinc를 사용하므로 transition band와 ripple 때문에 정확히 2000 Hz와 일치하지 않을 수 있다.`},
        {
          "id": "6-2D5",
          "title": "2.D5.",
          "type": "essay",
          "prompt": `문제 2.D3에서 그린 위상 스펙트럼(Figure 창에서 맨 하단 그림)의 원점에서의 기울기를 측정하여 쓰시오.`
        ,
          referenceAnswer: `시간 지연 $t_d$는 주파수영역에서 $e^{-j\\omega t_d}$의 위상항을 만든다.

따라서 원점 부근에서
$$
\\angle H(\\omega)\\approx-\\omega t_d
$$
이고 기울기는
$$
\\boxed{\\frac{d\\angle H}{d\\omega}=-t_d}.
$$

$t_d=0.02$ s이면 기울기는 약
$$
\\boxed{-0.02}
$$
이다.`},
        {
          "id": "6-2D6",
          "title": "2.D6.",
          "type": "python",
          "prompt": `문제 2.D3의 py 스크립트를 복사해서 붙여넣은 후, 지연 시간 ‘td=0.01, 0.03’으로 수정하여 각각 수행한 결과 그래프를 확인하시오.`
        ,
          referenceAnswer: `\`td=0.01\`, \`0.03\`으로 바꾸면 sinc 파형의 최대값 위치는 각각 약 0.01 s, 0.03 s가 된다.

위상 스펙트럼의 원점 부근 기울기는 각각 약
$$
-0.01,\\qquad -0.03
$$
으로 바뀐다.

진폭 스펙트럼의 통과대역 모양은 지연만 바꾸면 거의 변하지 않는다.`},
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
        ,
          referenceAnswer: `표는 다음과 같이 채울 수 있다.

[[table:
$h(t)$의 지연 시간 | 측정한 지연 시간(최댓값 위치) | 측정한 위상 스펙트럼의 기울기
$t_d=0.01$ | 약 $0.01$ s | 약 $-0.01$
$t_d=0.02$ | 약 $0.02$ s | 약 $-0.02$
$t_d=0.03$ | 약 $0.03$ s | 약 $-0.03$
]]

즉, 지연시간과 위상 기울기는
$$
\\boxed{\\text{위상 기울기}\\approx-t_d}
$$
의 관계를 갖는다.`},
        {
          "id": "6-2D8",
          "title": "2.D8.",
          "type": "essay",
          "prompt": `문제 2.D5와 <표 6.1>의 결과를 바탕으로, 시간 축에서 신호의 지연은 위상 스펙트럼에 어떤 영향을 미치는지 쓰고, ‘td’와 $\\angle H(\\omega)$의 기울기의 관계식을 세우시오.`
        ,
          referenceAnswer: `시간축에서 $t_d$만큼 지연하면 푸리에 변환에는
$$
e^{-j\\omega t_d}
$$
가 곱해진다.

따라서
$$
\\angle H(\\omega)=\\angle H_0(\\omega)-\\omega t_d
$$
이며,
$$
\\boxed{\\frac{d\\angle H}{d\\omega}=-t_d}
$$
이다.

즉, 지연시간이 커질수록 위상 스펙트럼의 음의 기울기 절댓값도 커진다.`},
        {
          "id": "6-2D9",
          "title": "2.D9.",
          "type": "essay",
          "prompt": `문제 2.D3, 2.D6에서 확인한 그래프를 바탕으로, 시간 축에서 신호의 지연은 진폭 스펙트럼 $\\left| H(\\omega) \\right|$에 어떤 영향을 미치는지 쓰시오.`
        ,
          referenceAnswer: `시간 지연은 푸리에 변환에 $e^{-j\\omega t_d}$를 곱하는 효과만 있으므로
$$
|e^{-j\\omega t_d}|=1
$$
이다.

따라서
$$
\\boxed{\\text{시간 지연은 }|H(\\omega)|\\text{를 변화시키지 않는다.}}
$$
지연은 위상만 변화시킨다.`},
        {
          "id": "6-2D10",
          "title": "2.D10.",
          "type": "python",
          "prompt": `문제 2.D3에서 완성한 py 스크립트를 복사하여 붙여넣은 후, 대역폭 ‘B=250, 1000’으로 바꿔서 각각 수행하시오. 결과 그래프에서 측정한 대역폭이 ‘B’와 일치하는지 다시 확인하시오.`
        ,
          referenceAnswer: `\`B=250\` Hz이면 측정 대역폭은 약 250 Hz 부근, \`B=1000\` Hz이면 약 1 kHz 부근이어야 한다.

truncation에 의한 ripple과 transition band 때문에 약간의 오차는 있을 수 있지만, 설정한 $B$와 측정된 대역폭은 대체로 일치한다.`},
        {
          "id": "6-2D11",
          "title": "2.D11.",
          "type": "python",
          "prompt": `$h(t)$의 파형이 지연된 만큼 LPF의 출력 또한 지연된다. LPF의 지연을 줄이기 위하여 문제 2.D3에서 완성한 py 스크립트를 복사하여 붙여넣은 후, ‘td=0.001’로 수정한 후 수행하여 결과 그래프를 확인하시오.`
        ,
          referenceAnswer: `\`td=0.001\`로 줄이면 sinc 중심이 약 1 ms로 이동하여 필터 지연은 크게 감소한다.

하지만 $0\\le t\\le0.002$ s의 짧은 구간만 남기므로 sinc 임펄스 응답이 매우 짧게 잘린 형태가 된다.`},
        {
          "id": "6-2D12",
          "title": "2.D12.",
          "type": "essay",
          "prompt": `문제 2.D11의 결과 그래프에서 지연이 줄어든 대신 발생한 문제점을 쓰고, 지연을 줄인 것이 왜 이러한 문제를 유발한 것인지 이유를 쓰시오.`
        ,
          referenceAnswer: `지연을 줄이면 임펄스 응답 길이 $2t_d$도 함께 짧아진다. 따라서 sinc 꼬리를 더 많이 잘라내게 되고,

- 통과대역 ripple 증가
- stopband 감쇠 성능 저하
- transition band 증가
- 목표 대역폭과의 오차 증가

등이 나타난다.

즉,
$$
\\boxed{\\text{지연 감소}\\Rightarrow\\text{필터 길이 감소}\\Rightarrow\\text{주파수 선택도 저하}}
$$
라는 trade-off가 있다.`},
      ]
    },
    { //문제 3
      "id": "6-3",
      "title": "3. LPF 출력 실험",
      "problems": [
        { //문제 3.A
          "id": "6-3A",
          "title": "3.A.",
          "prompt": `시간 함수 $a(t)$와 $b(t)$의 콘볼루션을 $c(t)\\left(=a(t)*b(t)\\right)$라 하자. $a(t)$, $b(t)$의 Python 샘플 벡터를 각각 ‘at’, ‘bt’라 하면 $c(t)$의 Python 샘플 벡터 ‘ct’는 다음과 같이 생성할 수 있다.
\`\`\`python
ct=np.convolve(at, bt)
\`\`\`
본 문제에서는, 함수 ‘np.convolve()’를 이용하여 LPF 출력을 생성하고 분석한다.

아래는 오디오 샘플 파일 ‘handel.wav’의 신호 벡터를 ‘y’로 설정하고, 대역폭이 2kHz인 LPF에 입력하여 출력 벡터 ‘yt’ 를 생성하는 py 스크립트이다.
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt
from scipy.io import wavfile

file_load("ch6/handel.wav")
fs, y = wavfile.read('handel.wav')
y=y.astype(float)
y=y/np.max(np.abs(y)) # 정규화, 내용과 상관 없는 부분.

B=2000 #대역폭, 현재 2kHz 설정
td=0.02 #지연 시간
t_step=1/8192
t=np.arange(0,0.04,t_step)
ht=2*B*np.sinc(2*B*(t-td)) #ht는 LPF의 임펄스 응답 h(t)의 샘플 벡터
xt=y #xt는 LPF 입력 신호 x(t)의 샘플 벡터.
yt=np.convolve(?,xt) #입출력과 임펄스 응답과의 관계식 이용
\`\`\`
          `
        },
        {
          "id": "6-3A1",
          "title": "3.A1.",
          "type": "essay",
          "prompt": `위 py 스크립트의 맨 마지막 라인 '?'에 들어갈 Python 변수는 무엇인가?`
        ,
          referenceAnswer: `[[equation:6.1]]에서
$$
y(t)=h(t)*x(t)
$$
이므로 Python에서는
\`\`\`python
yt=np.convolve(ht,xt)
\`\`\`
로 구현한다.

따라서 빈칸은
$$
\\boxed{\\texttt{ht}}
$$
이다.`},
        {
          "id": "6-3A2",
          "title": "3.A2.",
          starterCode: `import numpy as np
import matplotlib.pyplot as plt
from scipy.io import wavfile

file_load("ch6/handel.wav")
fs, y = wavfile.read('handel.wav')
y=y.astype(float)
y=y/np.max(np.abs(y)) # 정규화, 내용과 상관 없는 부분.

B=2000 #대역폭, 현재 2kHz 설정
td=0.02 #지연 시간
t_step=1/8192
t=np.arange(0,0.04,t_step)
ht=2*B*np.sinc(2*B*(t-td)) #ht는 LPF의 임펄스 응답 h(t)의 샘플 벡터
xt=y #xt는 LPF 입력 신호 x(t)의 샘플 벡터.
yt=np.convolve(?,xt) #입출력과 임펄스 응답과의 관계식 이용`,
          "type": "python",
          consoleEnabled: true,
          "prompt": `py 스크립트를 완성하고 수행하시오. 이후, Console에서 아래를 차례대로 수행하여 LPF 입력과 출력의 소리를 재생하고, 소리를 비교하여 어떻게 들렸는지 쓰시오.
\`\`\`python
>>> signal_play(xt,fs)
>>> signal_play(yt,fs)
\`\`\`          
          `,
        
          referenceAnswer: `완성 코드는
\`\`\`python
yt=np.convolve(ht,xt)
\`\`\`
이다.

입력 \`xt\`에 비해 출력 \`yt\`는 2 kHz보다 높은 주파수 성분이 감쇠되므로 고음이 줄고 더 둔하고 부드럽게 들린다.

또한 임펄스 응답이 약 $t_d=0.02$ s 지연되어 있으므로 출력도 입력보다 약간 늦게 나타난다.`},
        {
          "id": "6-3A3",
          "title": "3.A3.",
          starterCode: `import numpy as np
import matplotlib.pyplot as plt
from scipy.io import wavfile

file_load("ch6/handel.wav")
fs, y = wavfile.read('handel.wav')
y=y.astype(float)
y=y/np.max(np.abs(y)) # 정규화, 내용과 상관 없는 부분.

B=2000 #대역폭, 현재 2kHz 설정
td=0.02 #지연 시간
t_step=1/8192
t=np.arange(0,0.04,t_step)
ht=2*B*np.sinc(2*B*(t-td)) #ht는 LPF의 임펄스 응답 h(t)의 샘플 벡터
xt=y #xt는 LPF 입력 신호 x(t)의 샘플 벡터.
yt=np.convolve(?,xt) #입출력과 임펄스 응답과의 관계식 이용`,
          "type": "python",
          consoleEnabled: true,
          "prompt": `문제 3.A의 py 스크립트에서 LPF의 대역폭 ‘B’를 500Hz로 수정하여 다시 py 스크립트 파일을 실행하고, ‘yt’를 재생하시오. 또, ‘B’를 4,000Hz로 수정하여 다시 py 스크립트를 실행하고, ‘yt’를 재생하시오. 재생 결과를 비교하고, 대역폭이 증가하거나 감소함에 따라 출력의 소리는 어떻게 바뀌는지 쓰시오.
          `,
        
          referenceAnswer: `- $B=500$ Hz: 중·고주파 성분이 대부분 제거되어 매우 둔하고 먹먹하게 들린다.
- $B=2000$ Hz: 저주파와 일부 중간 주파수 성분이 통과하여 비교적 자연스럽지만 고음이 줄어든다.
- $B=4000$ Hz: 더 많은 고주파 성분이 통과하므로 원래 음악에 더 가깝고 선명하게 들린다.

즉,
$$
\\boxed{B\\uparrow\\Rightarrow\\text{더 많은 고주파 성분 통과}\\Rightarrow\\text{원음에 가까워짐}}
$$
이다.`},
        {
          "id": "6-3A4",
          "title": "3.A4.",
          starterCode: `import numpy as np
import matplotlib.pyplot as plt
from scipy.io import wavfile

file_load("ch6/handel.wav")
fs, y = wavfile.read('handel.wav')
y=y.astype(float)
y=y/np.max(np.abs(y)) # 정규화, 내용과 상관 없는 부분.

B=2000 #대역폭, 현재 2kHz 설정
td=0.02 #지연 시간
t_step=1/8192
t=np.arange(0,0.04,t_step)
ht=2*B*np.sinc(2*B*(t-td)) #ht는 LPF의 임펄스 응답 h(t)의 샘플 벡터
xt=y #xt는 LPF 입력 신호 x(t)의 샘플 벡터.
yt=np.convolve(?,xt) #입출력과 임펄스 응답과의 관계식 이용`,
          "type": "python",
          consoleEnabled: true,
          "prompt": `문제 3.A의 py 스크립트 실행 후, Console에서 아래를 수행하여 결과 그래프를 확인하시오.
\`\`\`python
>>> t_axis=1/8192*np.arange(0,len(yt))
>>> plt.plot(t_axis, yt/8192)
>>> plt.axis([0,0.1,-1,1])
>>> plt.grid()
\`\`\`                   
결과 그래프에서 본격적으로 신호가 출력되는(크기가 커지기 시작하는) 위치의 x 좌표의 값을 쓰고, 그 값을
가지는 이유를 설명하시오.`,
        
          referenceAnswer: `출력 신호가 본격적으로 나타나는 위치는 약
$$
\\boxed{0.02\\text{ s}}
$$
부근이다.

이는 사용한 임펄스 응답의 중심이
$$
t_d=0.02\\text{ s}
$$
만큼 지연되어 있기 때문이다. 컨볼루션 출력에도 이 필터 지연이 반영된다.`},
        { //문제 3.B
          "id": "6-3B",
          "title": "3.B.",
          "prompt": `LPF를 이용하여 사운드 신호에 더해진 사인파를 제거해보자.

아래 py 스크립트는 ‘handel.wav’의 신호 벡터를 ‘y’로 설정하고, 어떤 주파수를 가지는 사인파를 더한 신호 ‘xt’를 생성하고, ‘xt’의 PSD를 그린다.
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt
from scipy.io import wavfile
from scipy.signal import welch

file_load("ch6/handel.wav")
fs, y = wavfile.read('handel.wav')

f=3250+500*np.random.rand()
tone=np.sin(2*np.pi*f*(np.arange(1,len(y)+1)*1/fs))*fs
xt=y+tone
f,Pxx=welch(xt, fs=fs)
plt.figure()
plt.semilogy(f,Pxx)
plt.grid()
del f
\`\`\`
          `
        },
        {
          "id": "6-3B1",
          "title": "3.B1.",
          "type": "python",
          responseEnabled: true,
          starterCode: `import numpy as np
import matplotlib.pyplot as plt
from scipy.io import wavfile
from scipy.signal import welch

file_load("ch6/handel.wav")
fs, y = wavfile.read('handel.wav')

f=3250+500*np.random.rand()
tone=np.sin(2*np.pi*f*(np.arange(1,len(y)+1)*1/fs))*fs
xt=y+tone
f,Pxx=welch(xt, fs=fs)
plt.figure()
plt.semilogy(f,Pxx)
plt.grid()
del f`,
          "prompt": `위 py 스크립트를 수행한 후, ‘xt’의 PSD 결과를 확인하시오. 결과 그래프를 바탕으로, 더해진 사인파의 주파수가 얼마인지 최대한 정확히 쓰시오. (관심 영역 확대를 위해 'plt.axis([?, ?, -1, -1])'를 이용할 수 있음)`
        ,
          referenceAnswer: `tone 주파수는
\`\`\`python
f=3250+500*np.random.rand()
\`\`\`
로 생성되므로
$$
3250\\text{ Hz}\\le f<3750\\text{ Hz}
$$
범위에서 매번 랜덤하게 정해진다.

PSD에서 이 범위에 나타나는 매우 크고 좁은 peak의 x축 주파수를 읽으면 더해진 사인파의 주파수이다.

따라서 구체적인 정답은 실행할 때마다 달라지며, 측정한 PSD peak 위치와 일치해야 한다.`},
        {
          "id": "6-3B2",
          "title": "3.B2.",
          "type": "python",
          consoleEnabled: true,
          starterCode: `import numpy as np
import matplotlib.pyplot as plt
from scipy.io import wavfile
from scipy.signal import welch

file_load("ch6/handel.wav")
fs, y = wavfile.read('handel.wav')

f=3250+500*np.random.rand()
tone=np.sin(2*np.pi*f*(np.arange(1,len(y)+1)*1/fs))*fs
xt=y+tone
f,Pxx=welch(xt, fs=fs)
plt.figure()
plt.semilogy(f,Pxx)
plt.grid()
del f`,
          "prompt": `문제 3.B의 py 스크립트를 다시 실행한 후, Console에서 아래를 수행하여 ‘xt’를 재생하고 결과를 쓰시오.
\`\`\`python
>>> signal_play(xt,fs)
\`\`\`
          `
        ,
          referenceAnswer: `재생하면 원래 \`handel.wav\` 음악에 약 3.25~3.75 kHz 범위의 일정한 \`삐\` 소리가 강하게 섞여 들린다.

이는 단일 주파수 사인파 \`tone\`을 원 음악 \`y\`에 직접 더하여
$$
x(t)=y(t)+\\text{tone}(t)
$$
으로 만들었기 때문이다.`},
        {
          "id": "6-3B3",
          "title": "3.B3.",
          "type": "python",
          consoleEnabled: true,
          starterCode: `import numpy as np
import matplotlib.pyplot as plt
from scipy.io import wavfile
from scipy.signal import welch

file_load("ch6/handel.wav")
fs, y = wavfile.read('handel.wav')

f=3250+500*np.random.rand()
tone=np.sin(2*np.pi*f*(np.arange(1,len(y)+1)*1/fs))*fs
xt=y+tone
f,Pxx=welch(xt, fs=fs)
plt.figure()
plt.semilogy(f,Pxx)
plt.grid()
del f

#문제 3.B의 py 스크립트에 아래를 추가.
B=? #xt에 들어있는 사인파(‘삐’ 소리의 원인)의 주파수를 걸러내기 위핸 LPF 대역폭 결정(상수)
td=0.02 #지연 시간
t_step=1/8192
t=np.arange(0,0.04,t_step)
ht=2*B*np.sinc(2*B*(t-td)) #LPF h(t)의 샘플 벡터
yt=np.?(?,xt) #xt를 LPF에 통과시켜 출력 yt를 생성. 첫 번째 ?는 함수 이름, 두 번째 ?는 변수 이름`,
          "prompt": `‘xt’를 LPF에 통과시켜, 원래 소리에 손상 없이 ‘삐’ 소리를 제거해보자. 문제 3.B의 py 스크립트에 아래를 추가하여 수행하면, LPF의 출력 ‘yt’는 ‘삐’ 소리가 제거된 할렐루야 소리가 되도록 할 수 있다.
\`\`\`python
#문제 3.B의 py 스크립트에 아래를 추가.
B=? #xt에 들어있는 사인파(‘삐’ 소리의 원인)의 주파수를 걸러내기 위핸 LPF 대역폭 결정(상수)
td=0.02 #지연 시간
t_step=1/8192
t=np.arange(0,0.04,t_step)
ht=2*B*np.sinc(2*B*(t-td)) #LPF h(t)의 샘플 벡터
yt=np.?(?,xt) #xt를 LPF에 통과시켜 출력 yt를 생성. 첫 번째 ?는 함수 이름, 두 번째 ?는 변수 이름
\`\`\`          
주석을 참고하여, 세 군데의 ?에 상수, 변수, 함수 등을 적절히 채워 완성된 py 스크립트를 작성하시오.

이후, 자신이 설정한 ‘B’ 값의 근거를 쓰고, py 스크립트를 실행한 후, Console에서 아래를 수행하여 출력 ‘yt’를 재생하시오.
\`\`\`python
>>> signal_play(yt,fs)
\`\`\`
5회 이상 반복하여 모두 ‘삐’ 소리가 제거되었는지 확인하시오.`
        ,
          referenceAnswer: `예를 들어 다음과 같이 작성할 수 있다.

\`\`\`python
B=3000
td=0.02
t_step=1/8192
t=np.arange(0,0.04,t_step)
ht=2*B*np.sinc(2*B*(t-td))
yt=np.convolve(ht,xt)
\`\`\`

즉,
- 함수 이름: \`convolve\`
- 첫 번째 변수: \`ht\`

이다.

tone은 항상 3.25~3.75 kHz에 있으므로, 이를 충분히 감쇠시키려면 LPF cutoff를 이보다 낮게 잡아야 한다. 예를 들어 $B\\approx3$ kHz를 사용하면 모든 반복에서 tone을 크게 줄일 수 있다.

단, 원 음악의 3 kHz 이상 성분도 함께 감쇠되므로 완전히 무손상인 제거는 불가능하다.`}
      ]
    },
    { //문제 4
      "id": "6-4",
      "title": "4. BPF(Band Pass Filter) 설계",
      "problems": [
        { //문제 4.A
          "id": "6-4A",
          "title": "4.A.",
          "type": "console",
          "prompt": `Console 창에서 아래를 수행하여 대역폭 300Hz LPF의 임펄스 응답을 생성하고 PSD를 그리시오.
\`\`\`python
>>> import numpy as np
>>> import matplotlib.pyplot as plt
>>> t=np.arange(0,0.04,1/8192)
>>> B=300; td=0.02
>>> ht=2*B*np.sinc(2*B*(t-td))*8192
>>> plt.psd(ht,NFFT=8192*2,Fs=8192)
\`\`\`
          `
        ,
          referenceAnswer: `\`ht\`는 약 300 Hz 대역폭의 LPF 임펄스 응답이므로 PSD에서는 DC를 중심으로 저주파 영역에 에너지가 집중되고 약 300 Hz 이후부터 크게 감소하는 형태가 나타난다.

truncated sinc를 사용하므로 이상적인 직사각형 응답이 아니라 transition band와 ripple이 포함된다.`},
        {
          "id": "6-4B",
          "title": "4.B.",
          "type": "proof",
          "prompt": `$z(t)$의 푸리에 변환을 $Z(\\omega)$라 하자. $z(t)\\cos(\\omega_0t)$의 푸리에 변환은 $\\dfrac{1}{2}\\left[Z(\\omega+\\omega_0)+Z(\\omega-\\omega_0)\\right]$임을 유도하시오.`
        ,
          referenceAnswer: `오일러 공식으로
$$
\\cos(\\omega_0t)
=
\\frac12\\left(e^{j\\omega_0t}+e^{-j\\omega_0t}\\right)
$$
이다.

따라서
$$
z(t)\\cos(\\omega_0t)
=
\\frac12z(t)e^{j\\omega_0t}
+
\\frac12z(t)e^{-j\\omega_0t}.
$$

주파수 이동 성질을 적용하면
$$
z(t)e^{j\\omega_0t}\\longleftrightarrow Z(\\omega-\\omega_0)
$$
이고
$$
z(t)e^{-j\\omega_0t}\\longleftrightarrow Z(\\omega+\\omega_0)
$$
이므로
$$
\\boxed{
\\mathcal{F}\\{z(t)\\cos(\\omega_0t)\\}
=
\\frac12\\left[
Z(\\omega-\\omega_0)+Z(\\omega+\\omega_0)
\\right]
}
$$
이다.`},
        {
          "id": "6-4C",
          "title": "4.C.",
          "prompt": `문제 4.A에서 생성한 ‘ht’와 같은 길이를 갖는 3kHz 코사인 파형 벡터 ‘cos3000’을 생성하기 위해, 주어진 py 스크립트를 실행 후, Console에서 아래를 계속 수행하자. ‘ht’와 ‘cos3000’을 곱하여 ‘ht_times_cos’를 생성하고 ‘ht_times_cos’의 PSD를 관찰하시오.
\`\`\`python
>>> cos3000=np.cos(2*np.pi*3000*t)
>>> ht_times_cos=ht*cos3000
>>> plt.psd(ht_times_cos,NFFT=8192*2,Fs=8192)
\`\`\``
        },
        {
          "id": "6-4C1",
          "title": "4.C1.",
          "type": "python",
          consoleEnabled: true,
          starterCode: `import numpy as np
import matplotlib.pyplot as plt
t=np.arange(0,0.04,1/8192)
B=300; td=0.02
ht=2*B*np.sinc(2*B*(t-td))*8192
plt.psd(ht,NFFT=8192*2,Fs=8192)`,
          "prompt": `‘ht’의 PSD 결과 그래프를 확인하시오.`
        ,
          referenceAnswer: `\`ht\` 자체의 PSD는 0 Hz를 중심으로 하는 LPF 형태이다.

이후
\`\`\`python
ht_times_cos=ht*cos3000
\`\`\`
을 생성하면 문제 4.B의 주파수 이동 성질에 의해 원래 LPF의 주파수응답이 $\\pm3$ kHz를 중심으로 이동한 두 복사본으로 나타난다.`},
        {
          "id": "6-4C2",
          "title": "4.C2.",
          "type": "essay",
          "prompt": `문제 4.B에서 유도한 식과 연관 지어 PSD 결과 그래프를 설명하시오.`
        ,
          referenceAnswer: `문제 4.B에 의해
$$
h(t)\\cos(2\\pi f_0t)
$$
의 주파수응답은 원래 $H(f)$를 $+f_0$와 $-f_0$로 이동시킨 두 복사본의 합이다.

여기서 $f_0=3$ kHz이고 원래 LPF 대역폭이 약 300 Hz이므로 양의 주파수 영역에서는 대략
$$
\\boxed{2.7\\text{ kHz}\\sim3.3\\text{ kHz}}
$$
를 통과하는 band-pass 형태가 나타난다.`},
        {
          "id": "6-4C3",
          "title": "4.C3.",
          "type": "graph",
          graphInputMode: 'both',
          graphXMin: -1000,
          graphXMax: 5000,
          graphYMin: -1,
          graphYMax: 29,
          graphXAxisLabel: 'f(=ω/2π)',
          graphYAxisLabel: '|X(ω)|',
          graphShowGrid: true,
          "prompt": `‘xt’의 PSD 모양이 아래 그래프와 같은 경우에 대하여 ‘np.convolve(xt,ht_times_cos)’의 PSD 모양을 위에 겹쳐 그리시오. (‘ht’는 길이가 무한대인 완벽한 sinc 함수로 가정)
[[image:/images/ch6/4C3.png||30]]`
        ,
          referenceAnswer: `\`ht_times_cos\`는 중심주파수 약 3 kHz, 반대역폭 약 300 Hz의 BPF 역할을 한다.

따라서 입력 \`xt\`의 스펙트럼 중
$$
\\boxed{2.7\\text{ kHz}\\lesssim f\\lesssim3.3\\text{ kHz}}
$$
구간과 겹치는 부분만 출력에 남고, 그 밖의 성분은 제거된다.

그래프에는 주어진 입력 스펙트럼 위에서 이 구간에 해당하는 부분만 남도록 그리면 된다.`},
        {
          "id": "6-4C4",
          "title": "4.C4.",
          "type": "graph",
          graphInputMode: 'both',
          graphXMin: -1000,
          graphXMax: 5000,
          graphYMin: -1,
          graphYMax: 29,
          graphXAxisLabel: 'f(=ω/2π)',
          graphYAxisLabel: '|X(ω)|',
          graphShowGrid: true,
          "prompt": `‘xt’의 PSD 모양이 아래 그래프와 같은 경우에 대하여 ‘np.convolve(xt,ht_times_cos)’의 PSD 모양을 위에 겹쳐 그리시오. (‘ht’는 길이가 무한대인 완벽한 sinc 함수로 가정)
[[image:/images/ch6/4C4.png||30]]`
        ,
          referenceAnswer: `출력 스펙트럼은 입력 스펙트럼과 BPF 통과대역의 교집합이다.

즉, 약 2.7~3.3 kHz 범위 안에 존재하는 입력 성분만 남고 그 밖의 주파수 성분은 0이 된다.

따라서 그림의 입력 스펙트럼 중 이 범위와 겹치는 부분만 그대로 남도록 겹쳐 그리면 된다.`},
        {
          "id": "6-4C5",
          "title": "4.C5.",
          "type": "graph",
          graphInputMode: 'both',
          graphXMin: -1000,
          graphXMax: 5000,
          graphYMin: -1,
          graphYMax: 29,
          graphXAxisLabel: 'f(=ω/2π)',
          graphYAxisLabel: '|X(ω)|',
          graphShowGrid: true,
          "prompt": `‘xt’의 PSD 모양이 아래 그래프와 같은 경우에 대하여 ‘np.convolve(xt,ht_times_cos)’의 PSD 모양을 위에 겹쳐 그리시오. (‘ht’는 길이가 무한대인 완벽한 sinc 함수로 가정)
[[image:/images/ch6/4C5.png||30]]`
        ,
          referenceAnswer: `문제 4.C3, 4.C4와 동일하게
$$
Y(f)=X(f)H_{\\mathrm{BPF}}(f)
$$
이므로 입력 스펙트럼에서 약 3 kHz를 중심으로 $\\pm300$ Hz 안에 있는 성분만 통과한다.

즉, 그림에서
$$
2.7\\text{ kHz}\\sim3.3\\text{ kHz}
$$
와 겹치는 부분만 출력 스펙트럼으로 그리면 된다.`},
        {
          "id": "6-4D",
          "title": "4.D.",
          "prompt": `[그림 6.1]과 같이 입력 신호에서 주파수가 $B_L$보다 크고 $B_H$보다 작은 성분만을 추출하는 시스템을 BPF(Band Pass Filter, 대역통과필터)라고 한다.
[[image:/images/ch6/figure6_1.png|그림 6.1 BDF(Band Pass Filter, 대역통과필터)|50]]`
        },
        {
          "id": "6-4D1",
          "title": "4.D1.",
          "type": "essay",
          "prompt": `문제 4.A~4.C를 토대로 Python에서 BPF의 임펄스 응답 ‘ht_BPF’를 생성하는 방법을 설명하시오.`
        ,
          referenceAnswer: `원하는 BPF의 중심주파수를 $f_c$, 반대역폭을 $B$라 하자.

먼저 대역폭 $B$인 LPF의 임펄스 응답
$$
h_{\\mathrm{LPF}}(t)=2B\\operatorname{sinc}[2B(t-t_d)]
$$
를 만들고, 여기에 중심주파수 $f_c$의 cosine을 곱한다.

$$
\\boxed{
h_{\\mathrm{BPF}}(t)
=
2B\\operatorname{sinc}[2B(t-t_d)]
\\cos(2\\pi f_ct)
}
$$

cosine 곱셈에 의해 LPF의 주파수응답이 $\\pm f_c$로 이동하므로 BPF가 된다.`},
        {
          "id": "6-4D2",
          "title": "4.D2.",
          "type": "python",
          consoleEnabled: true,
          starterCode: `import numpy as np
import matplotlib.pyplot as plt
from scipy.io import wavfile
from scipy.signal import welch

file_load("ch6/handel.wav")
fs, y = wavfile.read('handel.wav')

f=3250+500*np.random.rand()
tone=np.sin(2*np.pi*f*(np.arange(1,len(y)+1)*1/fs))*fs
xt=y+tone
f,Pxx=welch(xt, fs=fs)
plt.figure()
plt.semilogy(f,Pxx)
plt.grid()
del f

#문제 3.B의 py 스크립트에 아래를 추가.
B=? #BPF를 만들기 위한 LPF의 대역폭
td=0.02 #지연 시간
t_step=1/8192
t=np.arange(0,0.04,t_step)
ht_BPF=2*B*np.sinc(2*B*(t-td))*np.cos(2*np.pi*?*t) #BPF의 임펄스 응답 h(t)의 샘플 벡터
yt=np.convolve(xt,ht_BPF)`,
          "prompt": `아래 py 스크립트는 BPF를 이용하여, 문제 3.B에서 생성한 ‘xt’(‘삐’ 소리가 더해진 할렐루야 음악)에서 ‘삐’ 소리만을 추출하고자 한다. 문제 3.B1에서 작성한 py 스크립트에 아래를 추가로 작성하시오.
\`\`\`python
#문제 3.B의 py 스크립트에 아래를 추가.
B=? #BPF를 만들기 위한 LPF의 대역폭
td=0.02 #지연 시간
t_step=1/8192
t=np.arange(0,0.04,t_step)
ht_BPF=2*B*np.sinc(2*B*(t-td))*np.cos(2*np.pi*?*t) #BPF의 임펄스 응답 h(t)의 샘플 벡터
yt=np.convolve(xt,ht_BPF)
\`\`\`          
두 군데 ?에 들어갈 적절한 상수를 근거와 함께 쓰시오. (변수 ‘f’는 문제 3.B1에서 ‘del’ 되어 지워졌으므로, 변수 ‘f’를 사용할 수 없음에 유의)

이후, py 스크립트를 실행한 후, Console에서 아래를 수행하여 BPF 출력 ‘yt’를 재생하시오.
\`\`\`python
>>> signal_play(yt,fs)
\`\`\`
결과가 어떠한지 쓰시오. (반복하여 실행했을 때, 모든 경우에서 ‘삐’ 소리가 깨끗하게 추출되어야 함)`
        ,
          referenceAnswer: `문제 3.B의 tone은 항상
$$
3250\\le f<3750\\text{ Hz}
$$
범위에 있으므로 이 전체 범위를 포함하는 BPF를 설계하면 된다.

중심주파수는
$$
f_c=\\frac{3250+3750}{2}
=
\\boxed{3500\\text{ Hz}}
$$
이고, 중심에서 양 끝까지의 거리는
$$
B=3750-3500
=
\\boxed{250\\text{ Hz}}
$$
이다.

따라서 예시는

\`\`\`python
B=250
td=0.02
t_step=1/8192
t=np.arange(0,0.04,t_step)

ht_BPF=(
    2*B
    * np.sinc(2*B*(t-td))
    * np.cos(2*np.pi*3500*t)
)

yt=np.convolve(xt,ht_BPF)
\`\`\`

이다.

이론적으로 약 3.25~3.75 kHz만 통과시키므로 반복 실행할 때마다 랜덤하게 생성되는 \`삐\` 소리 성분이 주로 추출된다. truncated sinc의 transition band 때문에 실제 출력에는 주변 음악 성분이 일부 남을 수 있다.`}
      ]
    }
  ]
} as const;
