import type { WorkbookChapter } from '@/types/workbook';

export const chapter = {
  "id": "2-orthogonality",
  "title": "Chapter 2. Numerical Integration & Orthogonal expansion",
  "sections": [
    { //문제 1
      "id": "2-1",
      "title": "1. 수치적분(Numerical Integration)",
      "problems": [
        { //문제 1.A
          "id": "2-1A",
          "title": "1.A.",
          "prompt": `Python에서 임의의 함수를 수치적분할 수 있다. 아래는 정적분 $\\int_{3}^{12} 2xe^{-2x}\\,dx$의 값을 수치적분으로 계산하는 py 스크립트이다.
\`\`\`python      
import numpy as np

a=3
b=12
xstep=0.01
x=np.arange(a,b,xstep)
y=2*x*np.exp(-2*x)
S=np.sum(y)*xstep; print(S)   
\`\`\`          
`,
        },
        {
          "id": "2-1A1",
          "title": "1.A1.",
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

a=3
b=12
xstep=0.01
x=np.arange(a,b,xstep)
y=2*x*np.exp(-2*x)
S=np.sum(y)*xstep; print(S)`,
        "referenceAnswer":  `
예시 주석은 다음과 같다.
\`\`\`python
# NumPy를 np라는 이름으로 불러온다.
# 배열 생성과 지수함수, 합 계산에 사용한다.
import numpy as np

# a는 정적분 구간의 시작점을 저장한다.
# 문제의 적분 하한이 3이므로 a에 3을 저장한다.
a=3

# b는 정적분 구간의 끝점을 저장한다.
# 문제의 적분 상한이 12이므로 b에 12를 저장한다.
b=12

# xstep은 수치적분에 사용할 x축의 간격을 저장한다.
# 0.01 간격으로 적분 구간을 잘게 나누기 위해 0.01을 사용한다.
xstep=0.01

# x는 a부터 b까지의 적분 구간을 나타내는 샘플값을 저장한다.
# np.arange(a,b,xstep)으로 a 이상 b 미만의 값을 xstep 간격으로 생성한다.
x=np.arange(a,b,xstep)

# y는 각 x에서 함수 2*x*exp(-2*x)의 값을 저장한다.
# 적분하려는 함수의 값을 x의 각 원소에 대해 계산한다.
y=2*x*np.exp(-2*x)

# S는 각 직사각형의 면적을 모두 더한 수치적분 결과를 저장한다.
# y의 모든 값을 합한 뒤 xstep을 곱하여 적분값을 근사하고 출력한다.
S=np.sum(y)*xstep; print(S)
\`\`\`
코드를 실행하면 약 0.00875의 값이 출력되며, 이는 정적분의 실제 값에 가까운 결과이다.
`
        },
        {
          "id": "2-1A2",
          "title": "1.A2.",
          "type": "essay",
          "prompt": `함수 ‘np.sum(x)’는 벡터 ‘x’의 원소들을 모두 합하여 출력한다. 따라서, 라인 ‘S=np.sum(y)*xstep’은 ‘y[0]*xstep + y[1]*xstep + y[2]*xstep + … ’와 같이 풀어쓸 수 있다. 풀어쓴 식에서 $n$번째 항은 밑변이 ‘xstep’이고 높이가 ‘y[n]’인 직사각형의 면적이다. 이를 바탕으로, ‘np.sum(y)*xstep’의 결과가 함수 $2xe^{-2x}$를 ‘a’에서 ‘b’까지 정적분한 값에 근사함을 설명하시오.

(주의. Python에서 행렬 및 벡터의 인덱스는 1부터 시작하지 않고, 0부터 시작함)`,
          "referenceAnswer":  `
\`np.sum(y)*xstep\`은 ‘y[0]*xstep + y[1]*xstep + y[2]*xstep + … ’와 같이 생각할 수 있다. 각 항은 밑변의 길이가 \`xstep\`이고 높이가 해당 위치의 함수값인 직사각형의 면적이다. 따라서, 이 직사각형들의 면적을 모두 더하면 $a$부터 $b$까지 함수 $2xe^{-2x}$ 아래의 면적을 근사할 수 있다. \`xstep\`이 충분히 작아질수록 직사각형이 더 촘촘하게 나뉘므로, 그 합은 실제 정적분 값에 더욱 가까워진다. Python의 인덱스는 0부터 시작하므로 첫 번째 함수값은 \`y[0]\`에 저장된다.`
        },
        {
          "id": "2-1A3",
          "title": "1.A3.",
          "type": "python",
          "prompt": `벡터 ‘x’의 간격인 ‘xstep’을 0.05, 0.1, 0.5, 1로 바꾸어 각각 실행하시오.
(py 스크립트는 xstep 하나의 경우만 작성하되, 각각의 실행 결과는 모두 py 스크립트 아래 주석으로 작성할 것)`,
          "starterCode": `import numpy as np

a=3
b=12
xstep=0.01
x=np.arange(a,b,xstep)
y=2*x*np.exp(-2*x)
S=np.sum(y)*xstep; print(S)`,          
          "referenceAnswer":  `
\`xstep\`을 각각 변경하여 실행하면 대략 다음과 같은 결과를 얻는다.
\`\`\`text
xstep = 0.05  →  S ≈ 0.00905
xstep = 0.1   →  S ≈ 0.00944
xstep = 0.5   →  S ≈ 0.01291
xstep = 1     →  S ≈ 0.01810
\`\`\`
난수를 사용하는 문제가 아니므로 같은 환경에서는 동일하거나 매우 유사한 값이 출력된다. \`xstep\`이 커질수록 적분 구간을 나누는 간격이 커지고, 계산에 사용되는 직사각형의 개수는 줄어든다.
`
        },
        {
          "id": "2-1A4",
          "title": "1.A4.",
          "type": "essay",
          "prompt": `‘xstep’ 값이 커질수록 적분 결과가 실제 값(약 0.0088)과 비교하여 어떻게 바뀌는지 쓰고, 그 이유를 쓰시오.`,       
          "referenceAnswer":  `
실제 적분값은 약 0.0088이며, \`xstep\`이 커질수록 계산된 수치적분 결과는 실제 값보다 점점 크게 나타난다. 이는 \`xstep\`이 커질수록 함수의 곡선을 더 큰 직사각형들로 근사하게 되어 실제 함수의 모양을 세밀하게 반영하지 못하기 때문이다. 따라서 일반적으로 \`xstep\`을 작게 할수록 수치적분 결과는 실제 적분값에 더 가까워진다.
`
        },  
        { //문제 1.B
          "id": "2-1B",
          "title": "1.B.",
          "prompt": `(식 2.1)의 값을 두 가지 방법으로 구해보자.
$$
\\int_{5}^{5.01} x^3e^{-x}\\,dx
\\qquad \\text{(식 2.1)}
$$
          `,
        },
        {
          "id": "2-1B1",
          "title": "1.B1.",
          "type": "python",
          "prompt": `문제 1.A를 참고하여, 위 적분식의 값을 수치적분으로 구하는 py 스크립트를 작성하고, 실행하여 결과를 확인하시오.`,
          "referenceAnswer":  `
예시 코드는 다음과 같다.
\`\`\`python
import numpy as np

a=5
b=5.01
xstep=0.01
x=np.arange(a,b,xstep)
y=x**3*np.exp(-x)
S_num=np.sum(y)*xstep; print(S_num)
\`\`\`
\`xstep=0.01\`로 수치적분하면 출력 결과는 약 0.00842243이다. 이는 $5$부터 $5.01$까지 함수 $x^3e^{-x}$ 아래의 면적을 폭이 \`xstep\`인 직사각형의 넓이로 근사한 결과이다.
`       
        },
        {
          "id": "2-1B2",
          "title": "1.B2.",
          "type": "python",
          "prompt": `1장의 문제 4를 참고하여, 위 적분식의 값을 sympy 모듈을 사용하여 구하는 py 스크립트를 작성하고, 실행하여 결과를 확인하시오.`,
          "referenceAnswer":  `
예시 코드는 다음과 같다.
\`\`\`python
import sympy as sp

x=sp.symbols('x')

S_sym=sp.integrate(x**3*sp.exp(-x),(x,5,5.01))
print(S_sym)
print(S_sym.evalf())
\`\`\`
SymPy를 이용하여 정적분을 계산하고 \`evalf()\`로 수치값을 확인하면 약 0.00840559가 나온다. 따라서 SymPy를 이용한 적분값은 약 $0.00840559$이다.
`  
        },
        {
          "id": "2-1B3",
          "title": "1.B3.",
          "type": "essay",
          "prompt": `수치적분으로 구한 결과와 sympy 모듈로 구한 결과를 비교해보자. 아래 식에 결과를 대입하여, 오차를 구하시오.
$$
\\text{오차}[\\%] = \\frac{|\\,S_{\\text{sym}} - S_{\\text{num}}\\,|}{|\\,S_{\\text{sym}}\\,|}\\times 100
$$
          `,
          "referenceAnswer":  `
수치적분 결과와 SymPy 적분 결과는 각각 $S_{\\text{num}}\\approx0.00842243$ $S_{\\text{sym}}\\approx0.00840559$이다. 따라서 오차는 $\\frac{|0.00840559-0.00842243|}{|0.00840559|}\\times100\\approx0.200\\%$이다.
`
        },
        {
          "id": "2-1B4",
          "title": "1.B4.",
          "type": "essay",
          "prompt": `문제 1.B3에서 구한 오차가 1%보다 큰지 확인하시오. 수치적분에서 오차가 발생하는 이유를 분석하고, 오차를 줄이기 위한 방법을 설명하시오.`,
          "referenceAnswer":  `문제 1.B3에서 구한 오차는 약 $0.20\\%$이므로 1%보다 작다. 수치적분에서는 함수의 곡선을 일정한 폭의 직사각형으로 근사하므로 실제 적분값과 차이가 발생할 수 있다.

\`xstep\`을 크게 하면 적분 구간을 적은 수의 직사각형으로 근사하게 되어 오차가 커질 수 있고, \`xstep\`을 작게 하면 더 많은 직사각형을 사용하므로 함수의 모양을 더 세밀하게 반영할 수 있다.

따라서 수치적분의 오차를 줄이려면 일반적으로 \`xstep\`을 더 작게 설정하면 된다.
`
        },
        { //문제 1.C
          "id": "2-1C",
          "title": "1.C.",
          "type": "python",
          "prompt": `$f(x)=2x$, $g(x)=e^{-x}$, $t=1$이라고 하자. $\\int_{0}^{t} f(\\tau)g(t-\\tau)\\,d\\tau$를 수치적분으로 구하는 py 스크립트를 작성하시오.`,
          "referenceAnswer": `
예시 코드는 다음과 같다.
\`\`\`python
import numpy as np

t=1
taustep=0.01
tau=np.arange(0,t,taustep)
f=2*tau
g=np.exp(-(t-tau))
S=np.sum(f*g)*taustep; print(S)
\`\`\`
\`tau\`는 적분 변수 $\\tau$의 샘플값을 저장하고, \`f\`와 \`g\`는 각각 $f(\\tau)=2\\tau$, $g(t-\\tau)=e^{-(t-\\tau)}$의 값을 저장한다. 따라서, \`f*g\`는 적분식의 피적분함수 $f(\\tau)g(t-\\tau)$를 나타낸다.

\`taustep=0.01\`로 실행하면 수치적분 결과는 약 0.7258정도가 나온다. \`taustep\`을 더 작게 하면 실제 적분값 약 $0.7358$에 더욱 가까워진다.
`
        },
        { //문제 1.D
          "id": "2-1D",
          "title": "1.D.",
          "type": "python",
          "prompt": `$\\omega=-1, 0, 2, 1000$ 각각에 대하여, $\\int_{0}^{10} 2t \\times e^{j\\omega t}\\,dt$를 수치적분으로 구하는 py 스크립트를 작성하시오.
(py 스크립트는 $\\omega$ 하나의 경우만 작성하되, 각각의 실행 결과는 모두 py 스크립트 아래 주석으로 작성할 것)
          `,
          "referenceAnswer": `
예시 코드는 다음과 같다.
\`\`\`python
import numpy as np

omega=-1
tstep=0.01
t=np.arange(0,10,tstep)
y=2*t*np.exp(1j*omega*t)
S=np.sum(y)*tstep; print(S)

# omega=-1   → 약 -14.4746 - 15.7476j
# omega=0    → 약  99.9000 +  0.0000j
# omega=2    → 약   8.7924 -  3.7155j
# omega=1000 → 약   0.1041 +  0.0024j
\`\`\`
\`omega\`는 적분에 사용할 각주파수를 저장한다. \`t\`는 0 이상 10 미만의 적분 구간을 \`tstep=0.01\` 간격으로 나눈 시간 샘플이다. \`y\`는 각 $t$에서 $2t e^{j\\omega t}$의 값을 계산한 복소수 배열이다.

따라서 \`np.sum(y)*tstep\`은 $\\int_0^{10}2t e^{j\\omega t}\\,dt$를 직사각형의 합으로 근사한다. $\\omega$ 값에 따라 복소 지수함수의 진동 속도가 달라지므로 적분 결과의 실수부와 허수부도 달라진다.
`
        },
      ]
    },
    { //문제 2
      "id": "2-2",
      "title": "2. 직교확장(Orthogonal Expansion)",
      "problems": [
        { //문제 2.A
          "id": "2-2A",
          "title": "2.A",
          "prompt": `$T=8.XXX$($XXX$=학번 끝 3자리)라 하자. 주기가 $2T$인 사인(sine) 파형을 $s_1(t)$이라 하고, $s_1(t)$의 주파수의 $n$배($n$은 정수) 주파수를 갖는 사인 파형을 $s_n(t)$이라고 하자. 본 문제에서 신호 집합 $\\{s_1(t), s_2(t), s_3(t), \\dots \\}$의 원소(신호)들이 $0 \\le t \\le T$에서 서로 직교(Orthogonal)함을 수치적분 방법과 sympy 모듈을 이용한 적분 방법으로 각각 확인해 보자.
(참고. 학번이 20840258이라면, $T=8.258$이고 $t$의 범위는 $0 \\le t \\le 8.258$이 됨.)`,
          "tags": [
            "preface"
          ]
        },
        {
          "id": "2-2A1",
          "title": "2.A1",
          "type": "essay",
          "prompt": `수치적분 방법과 sympy 모듈을 이용한 적분 방법에 앞서, 수식 전개로 $\\{s_1(t), s_2(t), s_3(t), \\dots \\}$는 직교 집합임을 확인하자.
$i\\ne k$일 때,
$$
s_i(t)=\\sin\\left(\\frac{i\\pi t}{T}\\right),
\\qquad
s_k(t)=\\sin\\left(\\frac{k\\pi t}{T}\\right)
$$
이다.

곱을 합으로 바꾸는 공식
$$
\\sin A\\sin B
=
\\frac{1}{2}
\\left[
\\cos(A-B)-\\cos(A+B)
\\right]
$$
을 이용하여 다음 빈칸을 채우시오.
$$
\\begin{aligned}
\\int_0^T s_i(t)s_k(t)\\,dt
&=
\\frac{1}{2}
\\int_0^T
\\left[
\\cos\\left(\\frac{\\boxed{\\ ?\\ }\\pi t}{T}\\right)
-
\\cos\\left(\\frac{\\boxed{\\ ?\\ }\\pi t}{T}\\right)
\\right]dt
\\\\[4pt]
&=
\\frac{T}{2(i-k)\\pi}
\\left[
\\sin\\left(\\frac{(i-k)\\pi t}{T}\\right)
\\right]_0^T
\\\\
&\\quad
-
\\frac{T}{2(i+k)\\pi}
\\left[
\\sin\\left(\\frac{(i+k)\\pi t}{T}\\right)
\\right]_0^T
\\\\[4pt]
&=
\\boxed{\\ ?\\ }
\\end{aligned}
$$

따라서, $i\\ne k$일 때 $s_i(t)$와 $s_k(t)$가 서로 직교함을 설명하시오.
`,
        "referenceAnswer": `
첫 번째 빈칸은 $i-k$, 두 번째 빈칸은 $i+k$이다.

$i$와 $k$는 정수이므로
$$
\\sin((i-k)\\pi)=0,
\\qquad
\\sin((i+k)\\pi)=0
$$
이다.

따라서 마지막 빈칸은 $0$이다.

즉,
$$
\\int_0^T s_i(t)s_k(t)\\,dt=0
$$
이므로 $i\\ne k$인 두 신호는 서로 직교한다.
`
        },
        {
          "id": "2-2A2",
          "title": "2.A2",
          "type": "python",
          "prompt": `아래는 $t$ 구간 동안 $s_1(t)$와 $s_2(t)$의 샘플 벡터를 생성하고, $s_1(t)$와 $s_2(t)$의 에너지를 수치적분으로 구하는 py 스크립트이다. XXX와 ?를 채워 py 스크립트를 완성하고, 실행하여 수치적분 결과를 확인하시오.
\`\`\`python
import numpy as np

T=8.XXX # XXX는 학번 끝 3자리
t_step=1e-3
t=np.arange(0,T,t_step)
f1=1/(2*T) #s_1(t)의 주파수
s1t=np.sin(2*np.pi*f1*t) #s_1(t)의 샘플 벡터
s2t=np.sin(2*np.pi*(2*f1)*t) #s_2(t)의 샘플 벡터
E1=sum(np.power(abs(s1t),2))*t_step #에너지 공식을 수치적분으로 구현
E2=?
print(E1)
print(E2)
\`\`\`
`,

          "starterCode": `import numpy as np

T=8.XXX # XXX는 학번 끝 3자리
t_step=1e-3
t=np.arange(0,T,t_step)
f1=1/(2*T) #s_1(t)의 주파수
s1t=np.sin(2*np.pi*f1*t) #s_1(t)의 샘플 벡터
s2t=np.sin(2*np.pi*(2*f1)*t) #s_2(t)의 샘플 벡터
E1=sum(np.power(abs(s1t),2))*t_step #에너지 공식을 수치적분으로 구현
E2=?
print(E1)
print(E2)`,
          "referenceAnswer": `
\`XXX\`에는 자신의 학번 끝 3자리를 입력한다.
\`E2\`는 $s_2(t)$의 에너지를 계산해야 하므로 $E1$과 같은 방법으로 작성하면 된다.
\`\`\`python
E2=sum(np.power(abs(s2t),2))*t_step
\`\`\`
완성된 예시 코드는 다음과 같다.

\`\`\`python
import numpy as np

T=8.XXX # XXX는 학번 끝 3자리
t_step=1e-3
t=np.arange(0,T,t_step)
f1=1/(2*T)
s1t=np.sin(2*np.pi*f1*t)
s2t=np.sin(2*np.pi*(2*f1)*t)
E1=sum(np.power(abs(s1t),2))*t_step
E2=sum(np.power(abs(s2t),2))*t_step
print(E1)
print(E2)
\`\`\`

$s_1(t)$과 $s_2(t)$의 에너지는 각각
$$
E_1=\\int_0^T |s_1(t)|^2dt,
\\qquad
E_2=\\int_0^T |s_2(t)|^2dt
$$
를 수치적분한 값이다.

두 신호 모두 해당 구간에서 이론적으로 에너지가 $\\frac{T}{2}$이므로, 실행 결과도 각각 $T/2$에 가까운 값이 나오면 정상적으로 계산된 것이다.
`,
        },
        {
          "id": "2-2A3",
          "title": "2.A3",
          "type": "python",
          "prompt": `$\\{s_1(t), s_2(t), s_3(t), \\dots \\}$에서 2개의 원소(신호)를 선택하자. 2개의 원소(신호)는 자신의 학번 끝 2자리에 각각 +1한 수로 선택하시오.
(예시. 학번이 20840247이면, 4+1번째와 7+1번째 원소(신호)를 선택. 즉, $s_5(t)$와 $s_8(t)$를 선택할 것. 만약, 학번 끝 2자리가 같을 경우에는 임의의 서로 다른 2개의 원소(신호)를 선택할 것)

아래는 $s_5(t)$와 $s_8(t)$의 내적을 수치적분으로 구하는 py 스크립트의 예시이다. 이를 참고하여, 선택한 2개의 원소(신호)의 샘플 벡터를 생성하고 수치적분으로 내적이 $0$임을 보이는 py 스크립트를 완성하시오.
\`\`\`python
import numpy as np

T=8.XXX # XXX는 학번 끝 3자리
t_step=1e-3
t=np.arange(0,T,t_step)
f1=1/(2*T) #s_1(t)의 주파수

s5t=np.sin(2*np.pi*(5*f1)*t) #s_5(t)의 샘플 벡터
s8t=?

InnerProduct=sum(s5t*np.conjugate(?))*? #내적 공식을 수치적분으로 구현
print(InnerProduct)
\`\`\`
`,
        "starterCode": `import numpy as np

T=8.XXX # XXX는 학번 끝 3자리
t_step=1e-3
t=np.arange(0,T,t_step)
f1=1/(2*T) #s_1(t)의 주파수

s5t=np.sin(2*np.pi*(5*f1)*t) #s_5(t)의 샘플 벡터
s8t=?

InnerProduct=sum(s5t*np.conjugate(?))*? #내적 공식을 수치적분으로 구현
print(InnerProduct)`,
          "referenceAnswer": `
예시에서 선택한 신호는 $s_5(t)$와 $s_8(t)$이다.
$s_8(t)$의 샘플 벡터는
\`\`\`python
s8t=np.sin(2*np.pi*(8*f1)*t)
\`\`\`
로 생성한다.

두 신호의 내적은 $s_5(t)$와 $s_8(t)$의 곱을 적분하여 구하므로,
\`\`\`python
InnerProduct=sum(s5t*np.conjugate(s8t))*t_step
\`\`\`
로 작성할 수 있다.

따라서 완성된 예시 코드는 다음과 같다.
\`\`\`python
import numpy as np

T=8.XXX # XXX는 학번 끝 3자리
t_step=1e-3
t=np.arange(0,T,t_step)
f1=1/(2*T)

s5t=np.sin(2*np.pi*(5*f1)*t)
s8t=np.sin(2*np.pi*(8*f1)*t)

InnerProduct=sum(s5t*np.conjugate(s8t))*t_step
print(InnerProduct)
\`\`\`
$s_5(t)$와 $s_8(t)$는 서로 다른 정수배 주파수를 갖는 신호이므로,
$$
\\int_0^T s_5(t)s_8^*(t)\\,dt=0
$$
이다.

따라서, 수치적분 결과는 정확히 0이 아닐 수 있지만, 0에 매우 가까운 작은 값이 나오면 두 신호가 서로 직교함을 확인할 수 있다. 학생이 다른 두 신호 $s_i(t)$와 $s_k(t)$를 선택한 경우에도 $i\\ne k$이면 같은 방법으로 내적을 계산할 수 있다.
`,
        },
        {
          "id": "2-2A4",
          "title": "2.A4",
          "type": "essay",
          "prompt": `문제 2.A3의 내적 계산 결과를 근거로, 자신이 선택한 2개의 신호가 직교인지 아닌지 판단하고, 그 근거를 쓰시오. (수치적분에 의한 오차가 존재함을 유의할 것)`,
          "referenceAnswer": `
문제 2.A3에서 선택한 서로 다른 두 신호를 $s_i(t)$와 $s_k(t)$라고 하면,
두 신호의 내적은 이론적으로
$$
\\int_0^T s_i(t)s_k^*(t)\\,dt=0
$$
이다.

문제 2.A3의 수치적분 결과가 0 또는 0에 매우 가까운 작은 값으로 나타났다면, 두 신호의 내적이 0이라고 볼 수 있으므로 두 신호는 서로 직교한다. 계산 결과가 정확히 0이 아닌 매우 작은 값으로 나타날 수 있는 것은 연속시간 적분을 유한한 간격인 \`t_step\`으로 나누어 근사하는 과정에서 수치적분 오차가 발생하기 때문이다.

따라서, 내적의 절댓값이 0에 매우 가까운 경우, 수치적분 오차를 고려하여 두 신호는 직교한다고 판단할 수 있다.
`,
        },
        {
          "id": "2-2A5",
          "title": "2.A5",
          "type": "python",
          "prompt": `sympy 모듈을 이용하여 $t$를 벡터가 아닌 sympy 변수로 선언하고, 적분 결과가 $0$임을 확인하자. 아래는 학번 끝 2자리가 '4'와 '7'인 경우의 py 스크립트 예시이다. 앞서 했던 것처럼, 자신의 학번 끝 2자리에 맞게 신호를 선택하여 py 스크립트를 작성하고, 실행하여 결과를 확인하시오.
\`\`\`python
import numpy as np
import sympy as sp

T=8.XXX # XXX는 학번 끝 3자리
t = sp.symbols('t')
f1=1/(2*T)

s5t=sp.sin(2*sp.pi*f1*5*t)
s8t=?

InnerProduct=sp.integrate(?*np.conjugate(?),(t,?,?))
print(InnerProduct.evalf())
\`\`\`
`,
        "starterCode": `import numpy as np
import sympy as sp

T=8.XXX # XXX는 학번 끝 3자리
t = sp.symbols('t')
f1=1/(2*T)

s5t=sp.sin(2*sp.pi*f1*5*t)
s8t=?

InnerProduct=sp.integrate(?*np.conjugate(?),(t,?,?))
print(InnerProduct.evalf())`,
          "referenceAnswer": `
예시에서 선택한 신호는 $s_5(t)$와 $s_8(t)$이다.

$s_8(t)$는 다음과 같이 작성한다.
\`\`\`python
s8t=sp.sin(2*sp.pi*f1*8*t)
\`\`\`
두 신호의 내적은 $0$부터 $T$까지
$$
\\int_0^T s_5(t)s_8^*(t)\\,dt
$$
를 계산하므로, 완성된 예시 코드는 다음과 같다.
\`\`\`python
import numpy as np
import sympy as sp

T=8.XXX # XXX는 학번 끝 3자리
t=sp.symbols('t')
f1=1/(2*T)

s5t=sp.sin(2*sp.pi*f1*5*t)
s8t=sp.sin(2*sp.pi*f1*8*t)

InnerProduct=sp.integrate(s5t*np.conjugate(s8t),(t,0,T))
print(InnerProduct.evalf())
\`\`\`
서로 다른 두 신호 $s_5(t)$와 $s_8(t)$의 내적은 이론적으로 0이므로, 실행 결과도 0 또는 0에 매우 가까운 값이 나타난다. 학생이 다른 두 신호 $s_i(t)$와 $s_k(t)$를 선택한 경우에도 $i\\ne k$이면 같은 방법으로 코드를 작성할 수 있다.
`,
        },
        {
          "id": "2-2A6",
          "title": "2.A6",
          "type": "essay",
          "prompt": `문제 2.A5의 실행 결과로 무엇을 확인할 수 있는지 쓰시오.`,
          "referenceAnswer": `문제 2.A5에서 SymPy를 이용하여 두 신호의 내적을 계산한 결과가 0 또는 0에 매우 가까운 값으로 나타남을 확인할 수 있다.

따라서, 서로 다른 두 신호 $s_i(t)$와 $s_k(t)$는
$$
\\int_0^T s_i(t)s_k^*(t)\\,dt=0
$$
을 만족하므로 서로 직교함을 확인할 수 있다.

참고로, 문제 2.A3에서는 유한한 간격의 샘플을 이용한 수치적분으로 직교성을 확인한 반면, 문제 2.A5에서는 SymPy를 이용해 연속시간 적분식을 직접 계산하여 같은 결과를 확인하였다.
`,          
        },
        { //문제 2.B
          "id": "2-2B",
          "title": "2.B",
          "prompt": `비주기 오디오 신호를 직교 신호 집합 (orthogonal set)의 원소들을 이용하여 근사화해보자. 이 문제에서는 오디오 신호를 재생해야하므로, PC 오디오 출력에 스피커나 이어폰을 연결하여 PC 사운드를 들을 수 있도록 하시오

아래는 이번 실습에 사용할 'ch2/song.mat'을 불러오는 py 스크립트이다. 이 파일에 저장된 변수는 오디오 신호를 1/44100초 간격으로 약 16초간 샘플링한 값을 가진 벡터이다. 'data'의 0행에는 샘플링 시간이 저장되어 있고, 'data'의 1행에는 각 샘플링 시간의 샘플 값이 저장되어 있다.
\`\`\`python
from scipy.io import loadmat

file_load("ch2/song.mat"); mat = loadmat("song.mat"); data = mat['data']
signal_play(data[1], 44100)
\`\`\`
`,
        },
        {
          "id": "2-2B1",
          "title": "2.B1",
          "type": "python",
          "starterCode": `from scipy.io import loadmat

file_load("ch2/song.mat"); mat = loadmat("song.mat"); data = mat['data']
signal_play(data[1], 44100)`,
          "prompt": `py 스크립트를 실행하고, 오디오를 재생하시오.`,
          "referenceAnswer": `오디오 플레이어가 정상적으로 표시되고 신호가 재생되면 올바르게 실행된 것이다.`
        },
        {
          "id": "2-2B2",
          "title": "2.B2",
          "type": "essay",
          "prompt": `문제 2.B1의 소리를 들은 결과, 어떤 소리가 들렸는지 쓰시오.`,
          "referenceAnswer": `노래 또는 음악 소리가 들린다. 시간에 따라 소리의 높이와 크기가 계속 변하는 복잡한 오디오 신호임을 확인할 수 있다.`          
        },
        {
          "id": "2-2B3",
          "title": "2.B3",
          "type": "python",
          "starterCode": `import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat

N=5;
file_load("ch2/song.mat"); mat = loadmat("song.mat"); data = mat['data']
t_step=1/44100
sample_num=50
T=t_step*sample_num; # T= 50개 샘플동안의 시간
t=np.arange(0,T-t_step,t_step)
interval=np.arange(1,sample_num)+sample_num*X #f(t)의 구간, X는 학번 끝 한자리
ft=data[1,interval] # 음성신호 f(t)의 interval 구간의 샘플 벡터
f1=1/(2*T)
plt.figure(figsize=(5,10))
plt.subplot(N+1,1,1)
plt.plot(t, ft)
plt.grid()
for n in range(1,N+1):
    snt=np.sin(2*np.pi*n*f1*t);  
    plt.subplot(N+1,1,n+1);
    plt.plot(t, snt, 'r')
    plt.grid()`,
          "prompt": `아래 py 스크립트에서 11번째 라인의 'X'를 자신의 학번 끝 한자리로 바꾼 후, 실행하고 결과 그래프를 확인하시오.`,
          "referenceAnswer": `자신의 학번 끝 한자리를 X에 대입하여 py 스크립트를 실행하면, 맨 위에는 song.mat에서 선택한 50개 샘플 구간의 오디오 신호 f(t)가 표시되고, 그 아래에는 서로 다른 주파수를 갖는 5개의 정현파가 표시된다. 빨간색 정현파들은 sin(2πnf₁t),  n = 1, 2, ..., 5 형태이며, n이 증가할수록 주파수가 증가하는 것을 그래프에서 확인할 수 있다.`
        },
        {
          "id": "2-2B4",
          "title": "2.B4",
          "type": "essay",
          "prompt": `문제 2.B3에서 확인한 그래프의 맨 위 파형(파란색)은 문제 2.B1에서 들은 소리에서 임의의 일부분을 잘라온 것이다. 이제, 아래 파형들(빨간색)에 각각 어떤 수를 곱한 후에 다 더하여 파란색 파형과 일치하는(또는 매우 근접한) 파형을 만들려고 한다. 이것이 가능할 것 같은지 아닌지를, 이론 지식과 상관없이 자신의 직관으로 판단해 쓰시오.`,
          "referenceAnswer": `예시) 가능할 것 같다. 각 빨간색 정현파에 서로 다른 크기의 수를 곱한 뒤 모두 더하면, 여러 정현파가 합성되어 더 복잡한 파형을 만들 수 있다. 따라서 적절한 계수를 선택한다면 맨 위의 파란색 파형과 비슷한 형태의 파형을 만들 수 있을 것으로 생각한다. 다만 현재는 5개의 정현파만 사용하므로 완전히 일치하기보다는 근사된 파형이 만들어질 것으로 예상할 수 있다.`
        },
      ]
    },
  ]
} as const;
