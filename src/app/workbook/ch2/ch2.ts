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
          "prompt": `[[link:/workbook/ch1?p=1-4A|1장의 문제 4]]를 참고하여, 위 적분식의 값을 sympy 모듈을 사용하여 구하는 py 스크립트를 작성하고, 실행하여 결과를 확인하시오.`,
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
s8t=? #완성해야 할 부분 (1)

InnerProduct=sum(s5t*np.conjugate(?))*? #완성해야 할 부분 (2), 내적 공식을 수치적분으로 구현
print(InnerProduct)
\`\`\`
`,
        "starterCode": `import numpy as np

T=8.XXX # XXX는 학번 끝 3자리
t_step=1e-3
t=np.arange(0,T,t_step)
f1=1/(2*T) #s_1(t)의 주파수

s5t=np.sin(2*np.pi*(5*f1)*t) #s_5(t)의 샘플 벡터
s8t=? #완성해야 할 부분 (1)

InnerProduct=sum(s5t*np.conjugate(?))*? #완성해야 할 부분 (2), 내적 공식을 수치적분으로 구현
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
s8t=? #완성해야 할 부분 (1)

InnerProduct=sp.integrate(?*np.conjugate(?),(t,?,?)) #완성해야 할 부분 (2), 4군데
print(InnerProduct.evalf())
\`\`\`
`,
        "starterCode": `import numpy as np
import sympy as sp

T=8.XXX # XXX는 학번 끝 3자리
t = sp.symbols('t')
f1=1/(2*T)

s5t=sp.sin(2*sp.pi*f1*5*t)
s8t=? #완성해야 할 부분 (1)

InnerProduct=sp.integrate(?*np.conjugate(?),(t,?,?)) #완성해야 할 부분 (2), 4군데
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
          "prompt": `비주기 오디오 신호를 직교 신호 집합 (orthogonal set)의 원소들을 이용하여 근사화해보자.
(이 문제에서는 오디오 신호를 재생해야하므로, PC 오디오 출력에 스피커나 이어폰을 연결하여 PC 사운드를 들을 수 있도록 할 것)
`,
        },
        {
          "id": "2-2B1",
          "title": "2.B1",
          "type": "python",
          "starterCode": `from scipy.io import loadmat

file_load("ch2/song.mat"); mat = loadmat("song.mat"); data = mat['data']
signal_play(data[1], 44100)`,
          "prompt": `
아래는 이번 실습에 사용할 'ch2/song.mat'을 불러오는 py 스크립트이다. 이 파일에 저장된 변수는 오디오 신호를 1/44100초 간격으로 약 16초간 샘플링한 값을 가진 벡터이다. 'data'의 0행에는 샘플링 시간이 저장되어 있고, 'data'의 1행에는 각 샘플링 시간의 샘플 값이 저장되어 있다.
\`\`\`python
from scipy.io import loadmat

file_load("ch2/song.mat"); mat = loadmat("song.mat"); data = mat['data']
signal_play(data[1], 44100)
\`\`\`          
py 스크립트를 실행하고, 오디오를 재생하시오.`,
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

N=5
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
          "prompt": `문제 2.B3에서 확인한 그래프의 $\\underline{\\text{맨 위 파형(파란색)}}$은 문제 2.B1에서 들은 소리에서 임의의 일부분을 잘라온 것이다. 이제, $\\underline{\\text{아래 파형들(빨간색)}}$에 각각 $\\underline{\\text{어떤 수}}$를 곱한 후에 다 더하여 파란색 파형과 일치하는(또는 매우 근접한) 파형을 만들려고 한다. 이것이 가능할 것 같은지 아닌지를, 이론 지식과 상관없이 자신의 직관으로 판단해 쓰시오.`,
          "referenceAnswer": `예시) 가능할 것 같다. 각 빨간색 정현파에 서로 다른 크기의 수를 곱한 뒤 모두 더하면, 여러 정현파가 합성되어 더 복잡한 파형을 만들 수 있다. 따라서 적절한 계수를 선택한다면 맨 위의 파란색 파형과 비슷한 형태의 파형을 만들 수 있을 것으로 생각한다. 다만 현재는 5개의 정현파만 사용하므로 완전히 일치하기보다는 근사된 파형이 만들어질 것으로 예상할 수 있다.`
        },
        {
          "id": "2-2B5",
          "title": "2.B5",
          "type": "essay",
          "prompt": `문제 2.B2에서 확인한 오디오 신호를 임의의 시간 지점에서 $T$초 길이만큼 잘라낸 신호를 $f(t)$라 하자. 이제, 직교 신호 집합 $\\{s_1(t), s_2(t), s_3(t), \\dots \\}$의 원소들을 이용하여 $f(t) \\simeq \\sum_{n=1}^{N} f_n s_n(t)$로 근사화하려 한다. $f(t)$와 $\\sum_{n=1}^{N} f_n s_n(t)$의 오차를 최소화하는 $f_n$의 수식은 (식 2.2)와 같이 $f(t)$와 $s_n(t)$를 이용하여 결정됨을 상기하자.
$$
f_n
=
\\frac{
\\displaystyle \\int_{0}^{T} f(t)s_n^{*}(t)\\,dt
}{
\\displaystyle \\int_{0}^{T} s_n(t)s_n^{*}(t)\\,dt
}
(s_n^{*}(t)는 s_n(t)의 \\text{conjugate})
\\qquad \\text{(식 2.2)}
$$
아래는 $N=5$일 때, 수치적분을 이용하여 $f_1, ..., f_N$을 계산하고, $f(t)$와  $\\sum_{n=1}^{N} f_n s_n(t)$를 겹쳐 그리는 py 스크립트이다.
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat

N=5
file_load("ch2/song.mat"); mat = loadmat("song.mat"); data = mat['data']
t_step=1/44100
sample_num=50
T=t_step*sample_num; # T=50개 샘플 동안의 시간
t=np.arange(0,T-t_step,t_step)
interval=np.arange(1,sample_num)+sample_num*X #f(t)의 구간, X는 학번 끝자리
ft=data[1,interval] #음성신호 f(t)의 interval 구간의 샘플 벡터
f1=1/(2*T)
ft_approx=np.zeros(len(t)) #‘t’와 길이가 같은 0벡터 생성.
for n in range(1,N):
    snt=np.sin(2*np.pi*n*f1*t);  
    f_n=sum(?*np.conjugate(?)*t_step)/(sum(?*np.conjugate(?)*t_step)) #완성해야 할 부분 4군데
    ft_approx = ft_approx + f_n*snt
plt.figure()
plt.plot(t,ft,label='ft')
plt.plot(t,ft_approx,'r',label='$ft_{approx}$')
plt.legend()
\`\`\`
위 py 스크립트에서 문제 2.B4에서 설명한 $\\underline{\\text{맨 위 파형(파란색)}}$, $\\underline{\\text{아래 파형들(빨간색)}}$, $\\underline{\\text{어떤 수}}$에 대응되는 변수를 차례대로 쓰시오.`,
          "referenceAnswer": `문제 2.B4의 표현과 py 스크립트의 변수를 대응시키면 다음과 같다.
- 맨 위 파형(파란색): \`ft\`
- 아래 파형들(빨간색): \`snt\`
- 각 빨간색 파형에 곱하는 어떤 수: \`f_n\`
즉, \`ft\`는 근사하려는 오디오 신호 $f(t)$에 대응하고, \`snt\`는 각 직교 신호 $s_n(t)$에 대응하며, \`f_n\`은 각 $s_n(t)$에 곱해지는 계수 $f_n$에 대응한다.`
        },
        {
          "id": "2-2B6",
          "title": "2.B6",
          "type": "python",
          "prompt": `문제 2.B5의 py 스크립트에서 17번째 라인의 네 군데 ?에 들어갈 변수를 채워 py 스크립트를 완성하고, 실행하여 결과 그래프를 확인하시오.`,
          "starterCode": `import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat

N=5
file_load("ch2/song.mat"); mat = loadmat("song.mat"); data = mat['data']
t_step=1/44100
sample_num=50
T=t_step*sample_num; # T=50개 샘플 동안의 시간
t=np.arange(0,T-t_step,t_step)
interval=np.arange(1,sample_num)+sample_num*X #f(t)의 구간, X는 학번 끝자리
ft=data[1,interval] #음성신호 f(t)의 interval 구간의 샘플 벡터
f1=1/(2*T)
ft_approx=np.zeros(len(t)) #‘t’와 길이가 같은 0벡터 생성.
for n in range(1,N):
    snt=np.sin(2*np.pi*n*f1*t);  
    f_n=sum(?*np.conjugate(?)*t_step)/(sum(?*np.conjugate(?)*t_step)) #완성해야 할 부분 4군데
    ft_approx = ft_approx + f_n*snt
plt.figure()
plt.plot(t,ft,label='ft')
plt.plot(t,ft_approx,'r',label='$ft_{approx}$')
plt.legend()`,
          "referenceAnswer": `식 (2.2)에서 $f(t)$는 \`ft\`, $s_n(t)$는 \`snt\`에 대응하므로 네 군데 ?에는 차례대로 \`ft\`, \`snt\`, \`snt\`, \`snt\`가 들어간다.

따라서 완성된 코드는 다음과 같다.
\`\`\`python
f_n=sum(ft*np.conjugate(snt)*t_step)/(sum(snt*np.conjugate(snt)*t_step))
\`\`\`
이 식으로 각 직교 신호 $s_n(t)$에 대한 계수 $f_n$을 구하고, \`ft_approx = ft_approx + f_n*snt\`를 반복하여 $f(t)$의 근사 신호를 만든다.`
        },
        {
          "id": "2-2B7",
          "title": "2.B7",
          "type": "essay",
          "prompt": `<표 2.1>은 문제 2.B5의 py 스크립트에 생성된 각 변수에 해당하는 식이다. 빈칸 ①, ②를 채우시오.
[[table:
caption:표 2.1 문제 2.B5의 Python 스크립트 변수와 대응 수식
변수 | 수식
ft | $f(t)$
snt | $s_5(t)=\\sin(2\\pi \\times 5f_1t)$ <br> ('for' 문이 종료되었으므로 $n=5$)
f_n | ①
ft_approx | ②=$? \\times ? + ? \\times ? + ... + ? \\times ?$ <br> (for 문이 'N'번 도는 동안 'ft_approx'에 모두 더해진 항을 풀어서 쓸 것)
]]          `,
         "referenceAnswer": `①
$$
f_n=
\\frac{
\\displaystyle \\int f(t)s_n^{*}(t)\\,dt
}{
\\displaystyle \\int s_n(t)s_n^{*}(t)\\,dt
}
$$

②
f_1s_1(t)
+
f_2s_2(t)
+
f_3s_3(t)
+
f_4s_4(t)
+
f_5s_5(t)
$$
즉, 각 직교 신호 $s_n(t)$에 식 (2.2)로 구한 계수 $f_n$을 곱한 뒤 모두 더한 것이 \`ft_approx\`이다.`
        },
        { //문제 2.C
          "id": "2-2C",
          "title": "2.C",
          "prompt": `문제 2.B5의 py 스크립트에서, $N=10, 20, 30$으로 증가시켰을 때 결과를 확인해보자.`,
        },
        {
          "id": "2-2C1",
          "title": "2.C1",
          "type": "python",
          "prompt": `문제 2.B6에서 완성한 py 스크립트를 복사해서 붙여넣은 후, 5번째 라인의 변수 'N'을 10, 20, 30으로 증가시키면서 각각 실행해보고, 결과 그래프를 확인하시오.`,
          "referenceAnswer": `문제 2.B6에서 완성한 py 스크립트의 N을 각각 10, 20, 30으로 변경하여 실행하면, N이 증가할수록 직교 신호의 합으로 만든 근사 신호 ft_approx가 원래 오디오 신호 ft의 형태를 점점 더 잘 따라가는 것을 그래프에서 확인할 수 있다.`    
        },
        {
          "id": "2-2C2",
          "title": "2.C2",
          "type": "essay",
          "prompt": `$N$이 증가할수록, $\\sum_{n=1}^{N} f_n s_n(t)$가 $f(t)$에 가까워짐을 확인할 수 있었는가?`,
          "referenceAnswer": `확인할 수 있었다. $N$이 증가하면 근사에 사용하는 직교 신호 $s_n(t)$의 개수가 많아지므로, $\\sum_{n=1}^{N} f_n s_n(t)$가 원래 신호 $f(t)$의 세부적인 변화를 더 잘 표현하게 된다. 따라서 N=10, 20, 30으로 증가할수록 근사 신호가 $f(t)$에 더 가까워지는 것을 확인할 수 있다.`
        },
        {
          "id": "2-2C3",
          "title": "2.C3",
          "type": "python",
          "prompt": `다시 문제 2.B6에서 완성한 py 스크립트를 복사해서 붙여넣은 후, 11번째 라인의 'X'(=학번 끝자리)를 다른 값으로 수정하여 $f(t)$를 오디오 신호의 다른 임의의 구간으로 설정하시오.
          
이후, 문제 2.C1에서 했던 것처럼 5번째 라인의 변수 'N'을 10, 20, 30으로 증가시키면서 각각 실행해보고, 결과 그래프를 확인하시오.`,
          "referenceAnswer": `X를 기존 값과 다른 0~9 중 하나의 값으로 변경하여 오디오 신호의 다른 구간을 선택한 후, N을 10, 20, 30으로 증가시키며 실행한다. 선택한 구간이 달라져 원래 신호 ft의 모양은 변하지만, N이 증가할수록 ft_approx가 해당 ft의 파형에 점점 가까워지는 경향을 확인할 수 있다.`
        },
        {
          "id": "2-2C4",
          "title": "2.C4",
          "type": "essay",
          "prompt": `오디오 신호의 다른 임의의 구간으로 설정하여도, $N$이 증가할수록, $\\sum_{n=1}^{N} f_n s_n(t)$가 $f(t)$에 가까워짐을 확인할 수 있었는가?`,
          "referenceAnswer": `확인할 수 있었다. 오디오 신호에서 선택한 구간이 달라져도, N이 증가할수록 근사에 사용하는 직교 신호의 수가 많아져 $\\sum_{n=1}^{N} f_n s_n(t)$가 해당 구간의 $f(t)$를 더 잘 따라가는 것을 확인할 수 있다.`
        },
        {
          "id": "2-2C5",
          "title": "2.C5",
          "type": "essay",
          "prompt": `문제 2.C1~2.C4의 결과를 바탕으로, 어떤 파형의 모양이라도 직교 확장 이론(주어진 함수(파형)를 직교함수들의 선형결합으로 근사화할 수 있음)이 성립하는지 판단하여 쓰시오.`,
          "referenceAnswer": `문제 2.C1~2.C4의 결과로부터, 서로 다른 모양의 오디오 신호 구간에서도 직교 신호의 개수 N을 증가시키면 근사 신호가 원래 신호에 점점 가까워지는 것을 확인할 수 있었다. 따라서 주어진 파형이 적절한 조건을 만족한다면, 충분한 수의 직교함수를 이용한 선형결합으로 그 파형을 근사할 수 있다고 판단할 수 있다. 즉, N을 충분히 크게 하면 다양한 형태의 파형을 직교함수들의 합으로 표현하거나 근사할 수 있다.`
        },
        { //문제 2.D
          "id": "2-2D",
          "title": "2.D",
          "prompt": `이제, 주기가 $T$($T$는 문제 2.B3에서 주어진 값)인 사인 파형을 $s_1(t)$이라 하고, $s_1(t)$ 주파수의 $n$배의 주파수를 갖는 사인 파형을 $s_n(t)$이라고 하자.`,
        },
        {
          "id": "2-2D1",
          "title": "2.D1",
          "type": "python",
          "prompt": `문제 2.B6에서 완성한 py 스크립트를 복사해서 붙여넣은 후, 13번째 라인 'f1=1/(2*T)'를 'f1=1/T'로 수정하시오. 수정한 py 스크립트에서 $N=35$로 설정하여 실행해보고, 결과 그래프를 확인하시오.`,
          "referenceAnswer": `f1을 1/T로 수정하고 N=35로 설정하여 실행하면, 많은 수의 사인 파형을 사용하더라도 근사 신호 ft_approx가 원래 신호 ft를 충분히 잘 따라가지 못하고 일정한 오차가 남는 것을 확인할 수 있다. 이는 f1=1/T로 설정했을 때 사용하는 직교 신호 집합이 원래 신호를 표현하는 데 필요한 모든 성분을 포함하지 않기 때문이다.`     
        },
        {
          "id": "2-2D2",
          "title": "2.D2",
          "type": "essay",
          "prompt": `문제 2.D1의 결과를 주기를 $2T$로 수행한 원래 문제 2.C1의 결과 그래프와 비교해보자. 문제 2.D1의 $s_n(t)$은 ‘complete’ 한 직교 집합인가? 그 이유가 무엇인지 쓰시오.
(참고. Completely Orthogonal Set: $N$이 무한대로 증가할 때 주어진 함수와 합성한 함수의 오차가 0으로 수렴할 때 Orthogonal Set이 ‘complete’ 하다고 함)`,
          "referenceAnswer": `문제 2.D1의 $s_n(t)$ 집합은 complete한 직교 집합이 아니다. $f_1=1/T$일 때 사용되는 신호는
$$
s_n(t)=\\sin\\left(\\frac{2\\pi n}{T}t\\right)
$$
형태이므로 이들끼리는 서로 직교하지만, $0\\le t\\le T$에서 임의의 신호 $f(t)$를 표현하는 데 필요한 모든 직교 성분을 포함하지 않는다. 따라서, $N$을 계속 증가시키더라도 $\\sum_{n=1}^{N}f_ns_n(t)$가 임의의 $f(t)$에 완전히 가까워지지 못하고 오차가 남을 수 있다.

반면, 기존 문제에서 $f_1=1/(2T)$로 두면
$$
s_n(t)=\\sin\\left(\\frac{n\\pi}{T}t\\right)
$$
형태의 직교 신호들을 사용할 수 있으므로, $N$을 증가시킬수록 주어진 신호를 더 잘 근사할 수 있다. 따라서, 문제 2.D1에서 사용한 직교 집합은 orthogonal하지만 complete하지 않다고 판단할 수 있다.`            
        },
        { //문제 2.E
          "id": "2-2E",
          "title": "2.E",
          "prompt": `$t_1 \\le t \\le t_2$ 범위에서 문제 2.B에서 주어진 $f(t)$의 지수(exponetial) 푸리에 급수(Fourier Series) $F_n$을 수치적분을 이용하여 구해보자. $F_n$은 (식 2.3)과 같이 표현할 수 있고, 여기서 $f(t)$의 주기는 $T=t_2-t_1$이다.
$$
F_n
=
\\frac{
\\displaystyle \\int_{t_1}^{t_2} f(t)e^{-jn\\omega_0 t}\\,dt
}{
\\displaystyle \\int_{t_1}^{t_2}
e^{jn\\omega_0 t}e^{-jn\\omega_0 t}\\,dt
}
=
\\frac{1}{t_2-t_1}
\\int_{t_1}^{t_2}
f(t)e^{-jn\\omega_0 t}\\,dt
\\qquad \\text{(식 2.3)}
$$
          `,
        },
        {
          "id": "2-2E1",
          "title": "2.E1",
          "type": "essay",
          "prompt": `식 (2.3)의 지수 푸리에 급수에서 기본 주파수 $\\omega_0$를 $t_1$, $t_2$의 함수로 나타내고, 이를 이용하여 지수함수 집합이 $t_1 \\le t \\le t_2$ 구간에서 서로 직교함을 확인해보자.

다음 증명의 빈칸 ①~⑤를 채우시오.

주기 $T$는 $T=t_2-t_1$이므로 기본 각주파수는
$$
\\omega_0 = \\frac{\\text{①}}{t_2-t_1}
$$
이다.

지수함수 집합의 두 원소
$$
s_n(t)=e^{jn\\omega_0 t}, \\qquad
s_m(t)=e^{jm\\omega_0 t}
$$
에 대하여 두 함수의 내적은
$$
\\int_{t_1}^{t_2}
s_n(t)s_m^*(t)\\,dt
=
\\int_{t_1}^{t_2}
e^{jn\\omega_0 t}e^{-jm\\omega_0 t}\\,dt
$$
이고, 이를 정리하면
$$
=
\\int_{t_1}^{t_2}
e^{j\\text{②}\\omega_0 t}\\,dt
$$
가 된다.

$n\\ne m$인 경우,
$$
\\int_{t_1}^{t_2}
e^{j(n-m)\\omega_0 t}\\,dt
=
\\left[
\\frac{
e^{j(n-m)\\omega_0 t}
}{
\\text{③}
}
\\right]_{t_1}^{t_2}
$$
이고, $\\omega_0=\\frac{2\\pi}{t_2-t_1}$를 대입하면
$$
e^{j(n-m)\\omega_0(t_2-t_1)}
=
e^{j\\text{④}}
=
1
$$
이므로 적분값은 0이 된다.

반면 $n=m$인 경우에는
$$
\\int_{t_1}^{t_2}1\\,dt
=
\\text{⑤}
$$
가 된다.

따라서 $n\\ne m$일 때 내적이 0이므로, 지수함수 집합
$$
\\{\\cdots,e^{-j2\\omega_0t},e^{-j\\omega_0t},1,
e^{j\\omega_0t},e^{j2\\omega_0t},\\cdots\\}
$$
은 $t_1\\le t\\le t_2$ 구간에서 서로 직교한다.`,
  "referenceAnswer": `① $2\\pi$
② $n-m$
③ $j(n-m)\\omega_0$
④ $2\\pi(n-m)$
⑤ $t_2-t_1$

따라서
$$
\\omega_0=\\frac{2\\pi}{t_2-t_1}
$$
이며,

$n\\ne m$일 때
$$
\\int_{t_1}^{t_2}
e^{jn\\omega_0 t}e^{-jm\\omega_0 t}\\,dt=0
$$
이고,

$n=m$일 때
$$
\\int_{t_1}^{t_2}1\\,dt=t_2-t_1
$$
이므로 지수함수 집합은 $t_1\\le t\\le t_2$ 구간에서 서로 직교한다.`
        },
        {
          "id": "2-2E2",
          "title": "2.E2",
          "type": "python",
          "prompt": `아래는 (식 2.3)을 수치적분으로 구하고, $0 \\le t \\le T$ 범위에서 $f(t)$, $\\sum_{n=-3}^{3} F_n e^{jn\\omega_0 t}$를 그리는 py 스크립트이다. 11번째 라인의 'X'를 자신의 학번 끝 한자리로 바꾼 후, py 스크립트를 실행하고 결과 그래프를 확인하시오.
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat

N=3
file_load("ch2/song.mat"); mat = loadmat("song.mat"); data = mat['data']
t_step=1/44100
sample_num=50
T=t_step*sample_num; # T=50개 샘플 동안의 시간
t=np.arange(0,T-t_step,t_step)
interval=np.arange(1,sample_num)+sample_num*X #f(t)의 구간, X는 학번 끝자리
ft=data[1,interval] #음성신호 f(t)의 interval 구간의 샘플 벡터
t1=0
t2=T
w0=2*np.pi/(t2-t1) # 이 문제에서는 w0=2*np.pi/T로 설정해도 무방함.
ft_approx=np.zeros(len(t))
for n in range(-N,N):
    nth_exp=np.exp(1j*n*w0*t)
    f_n=(sum(ft*np.conjugate(nth_exp))*t_step)/(sum(nth_exp*np.conjugate(nth_exp))*t_step)
    # 또는 f_n=(sum(ft*np.conjugate(nth_exp))*t_step)/T
    ft_approx=ft_approx+f_n*nth_exp
plt.figure()
plt.plot(t,ft,label='ft')
plt.plot(t,ft_approx,'r',label='$ft_{approx}$')
plt.legend()
\`\`\`
`,
          "starterCode": `import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat

N=3
file_load("ch2/song.mat"); mat = loadmat("song.mat"); data = mat['data']
t_step=1/44100
sample_num=50
T=t_step*sample_num; # T=50개 샘플 동안의 시간
t=np.arange(0,T-t_step,t_step)
interval=np.arange(1,sample_num)+sample_num*X #f(t)의 구간, X는 학번 끝자리
ft=data[1,interval] #음성신호 f(t)의 interval 구간의 샘플 벡터
t1=0
t2=T
w0=2*np.pi/(t2-t1) # 이 문제에서는 w0=2*np.pi/T로 설정해도 무방함.
ft_approx=np.zeros(len(t))
for n in range(-N,N):
    nth_exp=np.exp(1j*n*w0*t)
    f_n=(sum(ft*np.conjugate(nth_exp))*t_step)/(sum(nth_exp*np.conjugate(nth_exp))*t_step)
    # 또는 f_n=(sum(ft*np.conjugate(nth_exp))*t_step)/T
    ft_approx=ft_approx+f_n*nth_exp
plt.figure()
plt.plot(t,ft,label='ft')
plt.plot(t,ft_approx,'r',label='$ft_{approx}$')
plt.legend()`,
          "referenceAnswer": `py 스크립트를 실행하면 원래 오디오 신호 $f(t)$와 지수 푸리에 급수의 일부 항 $\\sum_{n=-3}^{3}F_ne^{jn\\omega_0t}$을 이용하여 만든 근사 신호가 함께 표시된다.

현재는 $n=-3,\\ldots,3$의 유한한 개수의 항만 사용하므로 근사 신호가 $f(t)$와 완전히 일치하지는 않지만, 지수함수들의 선형결합을 이용하여 원래 파형을 근사할 수 있음을 확인할 수 있다.`,
        },
        {
          "id": "2-2E3",
          "title": "2.E3",
          "type": "python",
          "prompt": `문제 2.E2의 py 스크립트틑 복사하여 붙여넣은 후, 변수를 적절히 수정하여 $\\sum_{n=-7}^{7} F_n e^{jn\\omega_0 t}$, $\\sum_{n=-15}^{15} F_n e^{jn\\omega_0 t}$를 그려 보고, 결과 그래프를 확인하시오.`,
          "referenceAnswer": `문제 2.E2의 py 스크립트에서 $N$을 각각 7과 15로 변경하여 실행한다.

$N$이 증가하면 근사에 사용하는 지수함수의 개수가 증가하므로, $\\sum_{n=-7}^{7}F_ne^{jn\\omega_0t}$보다 $\\sum_{n=-15}^{15}F_ne^{jn\\omega_0t}$가 원래 신호 $f(t)$의 파형을 더 잘 따라가는 것을 확인할 수 있다. 즉, 사용되는 푸리에 급수 항의 수가 증가할수록 근사 오차가 감소하는 경향을 확인할 수 있다.`,
        },
        {
          "id": "2-2E4",
          "title": "2.E4",
          "type": "essay",          
          "prompt": `문제 2.E3의 결과를 바탕으로 직교함수 집합 $\\{\\cdots,e^{-j2\\omega_0t},e^{-j\\omega_0t},1,e^{j\\omega_0t},e^{j2\\omega_0t},\\cdots\\}$ 이 ‘complete’ 한지 판단하시오.`,
          "referenceAnswer": `complete한 직교함수 집합이라고 판단할 수 있다. 문제 2.E2와 2.E3에서 지수 푸리에 급수에 사용하는 항의 수를 증가시킬수록
$$
\\sum_{n=-N}^{N}F_ne^{jn\\omega_0t}
$$
가 원래 신호 $f(t)$에 점점 가까워지는 것을 확인할 수 있었다.

따라서 $N$을 계속 증가시키면 적절한 조건을 만족하는 $f(t)$에 대한 근사 오차가 0에 가까워질 수 있으므로,
$$
\\{\\cdots,e^{-j2\\omega_0t},e^{-j\\omega_0t},1,e^{j\\omega_0t},e^{j2\\omega_0t},\\cdots\\}
$$
는 $0\\le t\\le T$에서 complete한 직교함수 집합이다.`,       
        },
        {
           "id": "2-2E5",
          "title": "2.E5",
          "type": "essay",          
          "prompt": `문제 2.D, 2.E2에서 사용한 직교함수의 가장 작은 주파수(기본 주파수 또는 주파수 간격)는 같음에도 불구하고 문제 2.D의 직교함수는 ‘incomplete’하고, 문제 2.E2의 직교함수는 ‘complete’ 한 이유를 쓰시오.`,
          "referenceAnswer": `문제 2.D, 2.E2에서 사용한 직교함수의 가장 작은 주파수(기본 주파수 또는 주파수 간격)는 같음에도 불구하고 문제 2.D의 직교함수는 ‘incomplete’하고, 문제 2.E2의 직교함수는 ‘complete’ 한 이유를 쓰시오.`,
  "referenceAnswer": `두 경우의 기본 주파수는 모두 $f_0=\\frac{1}{T}$이지만, 직교함수 집합을 구성하는 함수의 종류가 서로 다르기 때문이다.

문제 2.D에서는
$$
\\sin(n\\omega_0t), \\qquad n=1,2,3,\\ldots
$$
형태의 사인 함수만 사용한다. 따라서 주파수가 $n\\omega_0$인 성분 중 사인 성분만 포함하고, 코사인 성분과 DC 성분은 포함하지 않는다. 이 때문에 $0\\le t\\le T$의 임의의 파형을 모두 표현하는 데 필요한 성분이 부족하여 incomplete하다.

반면 문제 2.E2의 집합은
$$
\\{\\cdots,e^{-j2\\omega_0t},e^{-j\\omega_0t},1,e^{j\\omega_0t},e^{j2\\omega_0t},\\cdots\\}
$$
처럼 음의 주파수, 0 주파수, 양의 주파수를 모두 포함한다.

복소 지수함수의 양의 주파수와 음의 주파수 성분을 함께 사용하면 사인 성분과 코사인 성분을 모두 표현할 수 있고, $n=0$인 항은 DC 성분을 표현한다. 따라서 임의의 파형을 표현하는 데 필요한 성분을 모두 포함하므로 complete한 집합이 된다.

즉, complete 여부는 기본 주파수의 크기만으로 결정되는 것이 아니라, 필요한 직교 성분들을 빠짐없이 포함하고 있는지에 따라 결정된다.`,     
        },
        {
           "id": "2-2E6",
          "title": "2.E6",
          "type": "essay",          
          "prompt": `실수 신호인 사인 함수로만 이루어져 있음에도 불구하고, 문제 2.A에서 문제 2.C의 직교함수 집합은 ‘complete’ 한 이유를 설명하시오.`,
          "referenceAnswer": `문제 2.A~2.C에서는 기본 주파수를 $f_1=\\frac{1}{2T}$로 설정하였으므로 사용한 직교함수는
$$
s_n(t)
=
\\sin\\left(\\frac{n\\pi}{T}t\\right),
\\qquad n=1,2,3,\\ldots
$$
가 된다.

이 사인 함수들은 $0\\le t\\le T$ 구간에서 complete한 직교함수 집합을 이룬다. 따라서 코사인 함수를 별도로 사용하지 않더라도 이 구간에서 정의된 적절한 함수 $f(t)$를 사인 함수들의 선형결합으로 근사할 수 있다.

문제 2.C에서도 $N$을 증가시킬수록
$$
\\sum_{n=1}^{N}f_ns_n(t)
$$
가 $f(t)$에 점점 가까워지는 것을 확인하였다.

즉, 직교함수 집합이 complete하기 위해 반드시 사인 함수와 코사인 함수를 모두 포함해야 하는 것은 아니다. 어떤 구간에서 사용하는 함수 집합 자체가 그 구간의 함수를 충분히 표현할 수 있도록 구성되어 있으면 complete할 수 있다.`,     
        },
        { //문제 2.F
          "id": "2-2F",
          "title": "2.F",
          "prompt": `이번에는 직접 임의의 함수를 설정하여, 직교함수의 선형결합으로 표현해보자.`
        },
        {
          "id": "2-2F1",
          "title": "2.F1",
          "type": "essay",
          "prompt": `구간 $t_1 \\le t \\le t_2$를 임의로 설정하고, 설정된 범위에서 임의의 연속함수 $f(t)$를 쓰시오.`,
          "referenceAnswer": `정답은 하나로 정해지지 않는다. $t_1<t_2$인 임의의 유한 구간과 그 구간에서 정의된 연속함수 $f(t)$를 올바르게 제시하면 된다.

예를 들어,
$$
t_1=0, \\qquad t_2=2
$$
로 설정하고,
$$
f(t)=t^2+t+1, \\qquad 0\\le t\\le2
$$
로 설정할 수 있다.

이외에도 $\\sin t$, $\\cos t$, $e^t$ 또는 다항함수 등 설정한 구간에서 연속인 함수를 사용한 답은 모두 가능하다.`
        },
        {
          "id": "2-2F2",
          "title": "2.F2",
          "type": "python",
          "prompt": `자신이 설정한 구간($t_1 \\le t \\le t_2$)의 범위에서, 자신이 설정한 $f(t)$를 Python으로 그리고, 그래프가 미분가능한 연속 함수인지 확인하시오.
(참고. $f(t)$의 그래프가 부드러운 곡선으로 보일수 있도록, 't_step'은 충분히 작은 값으로 설정할 것)`,
          "referenceAnswer": `문제 2.F1에서 자신이 설정한 $t_1$, $t_2$, $f(t)$를 올바르게 Python 코드로 표현하고 그래프를 생성하면 된다.

예를 들어 문제 2.F1에서
$$
0\\le t\\le2, \\qquad f(t)=t^2+t+1
$$
로 설정했다면 다음과 같이 작성할 수 있다.
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

t1=0
t2=2
t_step=0.001
t=np.arange(t1,t2,t_step)

ft=t**2+t+1

plt.figure()
plt.plot(t,ft)
plt.grid()
\`\`\`
$f(t)=t^2+t+1$은 해당 구간에서 연속이고 미분가능하며, 그래프가 끊어지거나 급격하게 불연속적으로 변하지 않는 부드러운 곡선으로 나타난다.

학생이 문제 2.F1에서 다른 함수와 구간을 설정했다면, 그 함수와 구간을 일관되게 사용한 코드도 올바른 답이다.`          
        },
        {
          "id": "2-2F3",
          "title": "2.F3",
          "type": "python",
          "prompt": `자신이 설정한 구간($t_1 \\le t \\le t_2$)의 범위에서, 자신이 설정한 $f(t)$, $\\sum_{n=-15}^{15}F_ne^{jn\\omega_0t}$를 겹쳐 그리는 py 스크립트를 작성하고, 완성한 py 스크립트를 실행하여 결과 그래프를 확인하시오.
(참고. 문제 2.E2의 py 스크립트를 적절히 수정할 것)`,
          "referenceAnswer": `문제 2.F1에서 설정한 구간과 함수에 대하여
$$
\\omega_0=\\frac{2\\pi}{t_2-t_1}
$$
로 설정하고, (식 2.3)을 이용하여 $F_n$을 계산한 뒤
$$
\\sum_{n=-15}^{15}F_ne^{jn\\omega_0t}
$$
를 구성하면 된다.

예를 들어 $0\\le t\\le2$, $f(t)=t^2+t+1$로 설정한 경우 다음과 같이 작성할 수 있다.
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

N=15
t1=0
t2=2
t_step=0.001
t=np.arange(t1,t2,t_step)

ft=t**2+t+1

T=t2-t1
w0=2*np.pi/T

ft_approx=np.zeros(len(t),dtype=complex)

for n in range(-N,N):
    nth_exp=np.exp(1j*n*w0*t)
    F_n=(sum(ft*np.conjugate(nth_exp))*t_step)/(sum(nth_exp*np.conjugate(nth_exp))*t_step)
    ft_approx=ft_approx+F_n*nth_exp

plt.figure()
plt.plot(t,ft,label='ft')
plt.plot(t,np.real(ft_approx),'r',label='$ft_{approx}$')
plt.legend()
plt.grid()
\`\`\`
학생이 문제 2.F1에서 다른 함수와 구간을 설정한 경우에도, 동일한 방법으로 자신이 설정한 $f(t)$와 해당 구간을 일관되게 사용하고 $n=-15,\\ldots,15$의 지수 푸리에 급수 근사를 올바르게 계산했다면 정답으로 인정할 수 있다.`          
        },
        {
          "id": "2-2F4",
          "title": "2.F4",
          "type": "essay",
          "prompt": `문제 2.F3에서 확인한 결과 그래프가 문제 2.F2에서 그린 $f(t)$에 근사하는지 비교하시오.`,
          "referenceAnswer": `근사하는 것을 확인할 수 있다. 문제 2.F3에서 구한
$$
\\sum_{n=-15}^{15}F_ne^{jn\\omega_0t}
$$
의 그래프는 문제 2.F2에서 설정한 $f(t)$의 전체적인 형태를 따라간다.

다만 유한한 개수의 푸리에 급수 항만 사용하였으므로 원래 함수와 완전히 일치하지 않고 일부 오차가 남을 수 있다. 사용되는 항의 수 $N$을 더 증가시키면 일반적으로 근사 신호가 원래 함수에 더 가까워질 수 있다.

학생이 설정한 함수와 구간에 따라 실제 그래프의 모양과 오차의 크기는 달라질 수 있으므로, 자신의 결과 그래프에서 두 파형이 얼마나 유사한지를 올바르게 비교하여 설명하면 된다.`
        },
      ]
    },
  ]
} as const;