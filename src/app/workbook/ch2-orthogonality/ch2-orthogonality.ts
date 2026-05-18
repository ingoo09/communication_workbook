export const chapter = {
  "id": "2-orthogonality",
  "title": "Chapter 2. Numerical Integration & Orthogonal expansion",
  "sections": [
    {
      "id": "2-1A",
      "title": "1.A.",
      "problems": [
        {
          "id": "2-1A",
          "title": "1.A. 간단한 수치적분(Nemerical Integration)",
          "prompt": "Python에서 임의의 함수를 수치적분 할 수 있다.",
          "answerType": "textarea",
          "solution": "이 문항은 **수치적분의 기본 아이디어를 이해하기 위한 서문**이다.\n\n핵심은 다음과 같다.\n\n- 적분구간 \\([a,b]\\)를 작은 간격 `xstep`으로 잘게 나눈다.\n- 각 점에서 함수값 \\(f(x)\\)를 계산한다.\n- 각 구간을 폭 `xstep`, 높이 \\(f(x_n)\\)인 직사각형으로 보고 면적을 더한다.\n- 이렇게 얻은 합\n  \\[\n  \\sum_n f(x_n)\\,\\Delta x\n  \\]\n  이 정적분\n  \\[\n  \\int_a^b f(x)\\,dx\n  \\]\n  의 근사값이 된다.\n\n즉, Python에서는 벡터 `x`, 함수값 벡터 `y`, 그리고 `np.sum(y) * xstep`을 이용해 임의의 함수의 정적분을 **수치적으로 근사**할 수 있다."
        },
        {
          "id": "2-1A1",
          "title": "1.A1.",
          "prompt": "아래는 정적분의 값을 수치적분으로 계산하는 `py` 스크립트 파일이다.\n\n위 `py` 스크립트 파일을 작성하여 실행한 후 결과를 확인하고, 각 라인의 의미가 무엇인지 `py` 스크립트 파일의 **모든 라인**에 대한 설명을 다음의 지침에 따라 작성하시오.\n\n- (지침1) '`=`이 있는 라인': '`=` 왼쪽 변수의 목적(용도)', '`=` 오른쪽 수식이 왼쪽 변수의 목적(용도)에 왜 부합하는지'를 쓰시오.  \n- (지침2) '`=`이 없는 라인': 명령어에 대한 설명과 명령어를 왜 수행하는지 설명.",
          "code": "%reset -sf\n%clear\nimport numpy as np\nnp.random.randint(1,XXX) # XXX=학번 끝 3자리, 내용과 상관 없으나 꼭 추가할 것\na=3\nb=12\nxstep=0.01\nx=np.arange(a,b,xstep)\ny=2*x*np.exp(-2*x)\nS=np.sum(y)*xstep; print(S)",
          "answerType": "code",
          "solution": "예시 실행 결과는 대략 다음과 같다.\n\n```text\nS ≈ 0.00875\n```\n\n(`xstep=0.01`이고 `x=np.arange(a,b,xstep)`로 계산했을 때의 대표적인 출력)\n\n각 라인의 의미는 다음과 같다.\n\n```python\n%reset -sf\n```\n- 현재 IPython/Colab 작업 공간의 변수를 정리하는 명령이다.\n- 이전에 만들었던 변수들이 남아 있으면 결과 해석이 꼬일 수 있으므로, 깨끗한 상태에서 시작하려고 수행한다.\n\n```python\n%clear\n```\n- 화면 출력 내용을 정리하는 명령이다.\n- 이전 출력과 현재 실행 결과를 구분하기 쉽게 하려고 사용한다.\n\n```python\nimport numpy as np\n```\n- 수치계산용 라이브러리 `numpy`를 `np`라는 이름으로 불러온다.\n- 이후 벡터 생성, 지수함수 계산, 합 계산 등을 하려면 필요하다.\n\n```python\nnp.random.randint(1,XXX)\n```\n- 1 이상 `XXX` 미만의 임의 정수를 하나 만드는 명령이다.\n- 적분 계산 자체에는 본질적으로 필요하지 않지만, 문제 지시상 반드시 넣으라고 했으므로 포함한다.\n\n```python\na=3\n```\n- 적분 시작점(하한) `a`를 저장한다.\n- 이 문제의 적분 구간이 3에서 시작하므로 `a=3`이 적절하다.\n\n```python\nb=12\n```\n- 적분 끝점(상한) `b`를 저장한다.\n- 이 문제의 적분 구간이 12에서 끝나므로 `b=12`가 적절하다.\n\n```python\nxstep=0.01\n```\n- 샘플 간격이자 직사각형의 밑변 길이 \\(\\Delta x\\)를 저장한다.\n- 수치적분에서는 구간을 잘게 나눠야 하므로, `0.01`처럼 작은 간격을 사용해 근사 오차를 줄인다.\n\n```python\nx=np.arange(a,b,xstep)\n```\n- `a`부터 `b` 직전까지 `xstep` 간격으로 점들을 만든다.\n- 적분구간 안의 샘플 위치 \\(x_n\\)들을 벡터로 만들어, 각 점에서 함수값을 계산하기 위해 필요하다.\n\n```python\ny=2*x*np.exp(-2*x)\n```\n- 각 샘플점 `x`에서 함수 \\(f(x)=2xe^{-2x}\\) 값을 계산해 벡터 `y`에 저장한다.\n- 적분하려는 대상 함수의 높이(직사각형 높이)가 바로 각 점의 함수값이므로, 이 식이 `y`의 목적에 정확히 맞는다.\n\n```python\nS=np.sum(y)*xstep; print(S)\n```\n- `S`의 목적은 정적분의 **수치적분 근사값**을 저장하는 것이다.\n- `np.sum(y)`는 각 샘플점에서의 함수값들을 모두 더한 값이고, 여기에 `xstep`을 곱하면\n  \\[\n  \\sum_n f(x_n)\\,\\Delta x\n  \\]\n  꼴의 리만합이 되어 적분값을 근사하게 된다.\n- `print(S)`는 계산된 근사 적분값을 화면에 출력하기 위해 수행한다."
        },
        {
          "id": "2-1A2",
          "title": "1.A2.",
          "prompt": "함수 `np.sum(x)`는 벡터 `x`의 원소들을 모두 합하여 출력한다. 따라서 라인\n\n은 다음과 같이 풀어쓸 수 있다.\n\n\\[\ny[0]\\cdot xstep + y[1]\\cdot xstep + y[2]\\cdot xstep + \\cdots\n\\]\n\n풀어쓴 식에서 \\(n\\)번째 항은 밑변이 `xstep`이고 높이가 \\(y[n]\\)인 직사각형의 면적이다. 이를 바탕으로, `np.sum(y)*xstep`의 결과가 함수\n\n\\[\nf(x)=2x e^{-2x}\n\\]\n\n를 \\(a\\)에서 \\(b\\)까지 정적분한 값\n\n\\[\n\\int_a^b 2x e^{-2x}\\,dx\n\\]\n\n에 **근사함을 설명하시오.**  \n(주의: Python에서 벡터 인덱스는 0부터 시작)",
          "code": "S = np.sum(y) * xstep",
          "answerType": "textarea",
          "solution": "`x = np.arange(a,b,xstep)` 이므로 샘플점들은\n\n\\[\nx[0]=a,\\quad x[1]=a+xstep,\\quad x[2]=a+2xstep,\\quad \\cdots\n\\]\n\n처럼 만들어진다. 그리고\n\n\\[\ny[n] = 2x[n]e^{-2x[n]}\n\\]\n\n이므로, 코드\n\n```python\nS = np.sum(y) * xstep\n```\n\n은 실제로\n\n\\[\nS \\approx y[0]\\cdot xstep + y[1]\\cdot xstep + y[2]\\cdot xstep + \\cdots\n\\]\n\n를 계산하는 것과 같다.\n\n여기서 각 항 \\(y[n]\\cdot xstep\\)은\n\n- 밑변: `xstep`\n- 높이: \\(y[n]=f(x[n])\\)\n\n인 직사각형 하나의 면적이다. 따라서 이들을 모두 더한 값은 함수\n\n\\[\nf(x)=2xe^{-2x}\n\\]\n\n의 그래프 아래 넓이를 직사각형 여러 개로 근사한 값이 된다.\n\n즉,\n\n\\[\n\\sum_n f(x_n)\\,\\Delta x\n\\]\n\n꼴의 합으로 정적분\n\n\\[\n\\int_a^b 2xe^{-2x}\\,dx\n\\]\n\n를 근사하는 것이다.  \n`xstep`이 충분히 작을수록 직사각형들이 곡선을 더 잘 따라가므로, `np.sum(y)*xstep` 값은 실제 적분값에 더 가까워진다."
        },
        {
          "id": "2-1A3",
          "title": "1.A3.",
          "prompt": "벡터 `x`의 간격인 `xstep`을 **0.05, 0.1, 0.5, 1**로 바꾸어 각각 실행하고 결과를 보이시오.  \n`xstep` 값이 커질수록 적분 결과가 실제 값(약 0.0088)과의 차이가 벌어지는 이유를 쓰시오.",
          "answerType": "textarea",
          "solution": "# 1.A3 정답(예시)\n\n`1.A1`의 스크립트에서 `xstep`을 바꾸면, 직사각형(리만 합)으로 적분을 근사하는 “사각형의 폭”이 바뀐다.  \n`xstep`이 **클수록** 사각형이 **거칠어져** 곡선을 잘 따라가지 못하므로, 적분 근사 오차가 커진다.\n\n---\n\n## (1) 실행 결과 예시\n\n아래 코드를 사용하여 `xstep`을 바꾸며 적분 근사값을 비교할 수 있다.\n\n```python\nimport numpy as np\n\na=3\nb=12\nfor xstep in [0.05, 0.1, 0.5, 1]:\n    x = np.arange(a, b, xstep)\n    y = 2*x*np.exp(-2*x)\n    S = np.sum(y) * xstep\n    print(f\"xstep={xstep:>4}  S≈{S:.10f}\")\n```\n\n참고로, 이 적분의 (기호적) 실제값은 다음과 같다.\n\n\\[\n\\int_{3}^{12} 2x e^{-2x}\\,dx \\approx 0.0086756321\n\\]\n\n따라서 `xstep`이 0.05, 0.1일 때는 실제값(약 0.0087~0.0088)에 비교적 가깝고,  \n`xstep`이 0.5, 1처럼 커지면 오차가 눈에 띄게 커지는 것을 확인할 수 있다.\n\n---\n\n## (2) `xstep`이 커질수록 오차가 커지는 이유(서술)\n\n`np.sum(y) * xstep`은 다음 형태의 리만 합(직사각형 면적 합)이다.\n\n\\[\n\\sum_{n} f(x_n)\\,\\Delta x\n\\]\n\n여기서 \\(\\Delta x = xstep\\) 이고, 각 항은 밑변이 `xstep`, 높이가 \\(f(x_n)\\)인 직사각형의 면적이다.  \n`xstep`이 커지면,\n\n- 한 직사각형이 대표하는 구간이 길어짐(표본점이 듬성듬성)\n- 곡선의 굴곡/변화를 직사각형이 반영하지 못함\n\n그래서 곡선 아래 면적(정적분)을 더 거칠게 근사하게 되어 **근사 오차가 증가**한다."
        }
      ]
    },
    {
      "id": "2-1B",
      "title": "1.B.",
      "problems": [
        {
          "id": "2-1B",
          "title": "1.B.",
          "prompt": "다음 적분을 수치적분으로 구하는 `py` 스크립트 파일을 작성하고, `py` 스크립트 파일을 실행한 결과 값을 보이시오.  \n( `py` 스크립트 파일의 코드를 각 문항에 보일 것 )\n\n\\[\n\\int_{-1}^{5} x^2 e^{-2x}\\,dx\n\\]",
          "answerType": "code",
          "solution": "\\[\n\\int_{-1}^{5} x^2 e^{-2x}\\,dx\n\\]\n\n### Python 예시(리만합)\n```python\nimport numpy as np\n\na, b = -1.0, 5.0\ndx = 1e-5  # 충분히 작게\n\nx = np.arange(a, b, dx)   # b는 제외(리만합)\ny = x**2 * np.exp(-2*x)\n\nS_num = np.sum(y) * dx\nprint(S_num)\n```\n\n- 예시 결과(참고): 약 **1.8466** (dx=1e-5 기준)\n\n---"
        }
      ]
    },
    {
      "id": "2-1C",
      "title": "1.C.",
      "problems": [
        {
          "id": "2-1C",
          "title": "1.C.",
          "prompt": "다음 적분을 수치적분으로 구하는 `py` 스크립트 파일을 작성하고, `py` 스크립트 파일을 실행한 결과 값을 보이시오.  \n( `py` 스크립트 파일의 코드를 각 문항에 보일 것 )\n\n\\[\n\\int_{5}^{5.01} x^3 e^{-x}\\,dx\n\\]",
          "answerType": "code",
          "solution": "\\[\n\\int_{5}^{5.01} x^3 e^{-x}\\,dx\n\\]\n\n```python\nimport numpy as np\n\na, b = 5.0, 5.01\ndx = 1e-6  # 구간이 매우 짧으므로 더 작게\n\nx = np.arange(a, b, dx)\ny = x**3 * np.exp(-x)\n\nS_num = np.sum(y) * dx\nprint(S_num)\n```\n\n- 예시 결과(참고): 약 **0.0084056** (dx=1e-6 기준)\n\n---"
        }
      ]
    },
    {
      "id": "2-1D",
      "title": "1.D.",
      "problems": [
        {
          "id": "2-1D",
          "title": "1.D.",
          "prompt": "### (서문) SymPy로 적분하는 아주 간단한 예\n아래는 `sympy`를 이용해 적분을 계산하는 최소 예시이다. (예시이므로 그대로 복사/실행해도 무방)",
          "code": "import sympy as sp\nx = sp.Symbol('x', real=True)\n\nexpr = x**2\nI = sp.integrate(expr, (x, 0, 1))  # 기호적분\nprint(I)           # exact\nprint(I.evalf())   # numeric",
          "answerType": "textarea",
          "solution": "이 예시는 `sympy`로 **기호적 적분**과 **수치값 변환**을 어떻게 하는지 보여주는 최소 예제이다.\n\n```python\nimport sympy as sp\nx = sp.Symbol('x', real=True)\n\nexpr = x**2\nI = sp.integrate(expr, (x, 0, 1))\nprint(I)         # exact\nprint(I.evalf()) # numeric\n```\n\n이 코드는\n\n\\[\n\\int_0^1 x^2\\,dx\n\\]\n\n를 계산한다. 결과는\n\n- exact: \\(\\frac{1}{3}\\)\n- numeric: \\(0.3333333333\\cdots\\)\n\n이다.\n\n즉, `sp.integrate(...)`는 적분의 정확한 기호식을 구하고, `evalf()`는 그것을 소수 형태의 수치값으로 바꾸는 역할을 한다."
        },
        {
          "id": "2-1D1",
          "title": "1.D1.",
          "prompt": "`sympy` 모듈(1장의 문제 5 참고)을 이용하여 문제 **1.B, 1.C**의 적분을 구하시오.  \n(결과가 복잡한 연산으로 주어지면, `evalf()`을 이용하여 실수로 반드시 변환할 것)",
          "answerType": "code",
          "solution": "```python\nimport sympy as sp\n\nx = sp.Symbol('x', real=True)\n\nS_B = sp.integrate(x**2*sp.exp(-2*x), (x, -1, 5))\nS_C = sp.integrate(x**3*sp.exp(-x), (x, 5, sp.Rational(501,100)))  # 5.01\n\nprint(\"S_B =\", S_B)\nprint(\"S_B (num) =\", sp.N(S_B, 15))\nprint(\"S_C (num) =\", sp.N(S_C, 15))\n```\n\n- 참고 수치(15-digit):\n  - S_B ≈ **1.84657**\n  - S_C ≈ **0.00840558**\n\n---"
        },
        {
          "id": "2-1D2",
          "title": "1.D2.",
          "prompt": "수치적분으로 구한 결과와 `sympy` 모듈로 구한 결과를 비교하시오. (식 2.1)에 결과를 대입하여, 두 결과의 오차를 표로 정리하시오.\n\n\\[\n\\text{오차}[\\%] = \\frac{|\\,S_{\\text{sym}} - S_{\\text{num}}\\,|}{|\\,S_{\\text{sym}}\\,|}\\times 100 \\quad (\\text{식 2.1})\n\\]",
          "answerType": "textarea",
          "solution": "문제의 식(2.1):\n\n\\[\n\\mathrm{error}[\\%] = \\frac{|S_{sym}-S_{num}|}{|S_{sym}|}\\times 100\n\\]\n\n예시 코드:\n```python\nimport numpy as np\nimport sympy as sp\n\n# sympy 결과 (D1에서 계산)\nx = sp.Symbol('x', real=True)\nS_B_sym = sp.N(sp.integrate(x**2*sp.exp(-2*x), (x, -1, 5)), 20)\nS_C_sym = sp.N(sp.integrate(x**3*sp.exp(-x), (x, 5, sp.Rational(501,100))), 20)\n\n# 수치적분 결과 (B,C에서 계산한 S_num을 여기에 넣거나 다시 계산)\nS_B_num = 1.846592771100248  # 예: dx=1e-4 리만합 결과\nS_C_num = 0.008406028860941671  # 예: dx=1e-6 리만합 결과\n\nerrB = abs(float(S_B_sym) - S_B_num) / abs(float(S_B_sym)) * 100\nerrC = abs(float(S_C_sym) - S_C_num) / abs(float(S_C_sym)) * 100\n\nprint(\"errorB[%] =\", errB)\nprint(\"errorC[%] =\", errC)\n```\n\n예시 표(위 숫자 기준):\n\n| 항목 | S_sym (SymPy) | S_num (수치적분) | error[%] |\n|---|---:|---:|---:|\n| 1.B | 1.846569… | 1.846593… | 약 0.0013% |\n| 1.C | 0.00840558… | 0.00840603… | 약 0.0053% |\n\n---"
        },
        {
          "id": "2-1D3",
          "title": "1.D3.",
          "prompt": "오차가 **1%보다 크다면** 아래를 푸시오. 작다면 그냥 넘어갈 것.\n\n(a) 오차가 발생한 이유를 쓰시오.  \n(b) 제 **1.B, 1.C**의 자신의 수치적분 `py` 스크립트 파일을 수정하고 실행하여 결괏값과 오차를 다시 보이시오.",
          "answerType": "textarea",
          "solution": "- 위 D2에서 **error[%] > 1%** 인 항목이 있으면:\n  1) 오차가 큰 이유를 설명  \n  2) 자신의 1.B/1.C 수치적분 스크립트를 수정하고, 새 결과와 error[%]를 다시 제시\n\n- **error[%] ≤ 1%** 라면: “정상적으로 일치한다” 정도로 간단히 언급하고 넘어가면 됨.\n\n---"
        }
      ]
    },
    {
      "id": "2-1E",
      "title": "1.E.",
      "problems": [
        {
          "id": "2-1E",
          "title": "1.E.",
          "prompt": "\\(f(x)=2x\\), \\(g(x)=e^{-x}\\), \\(t=1\\) 이라고 하자. 다음 적분값을 **수치적분**으로 구하는 `py` 스크립트 파일을 작성하시오.\n\n\\[\n\\int_{0}^{t} f(\\tau)\\, g(t-\\tau)\\, d\\tau\n\\]\n\n- `py` 스크립트 파일의 코드를 문항에 보이고, 실행 결과 값을 보이시오.",
          "answerType": "textarea",
          "solution": "\\[\ny(t) = \\int_{0}^{t} 2\\tau\\,e^{-(t-\\tau)}\\,d\\tau,\\quad t=1\n\\]\n\n```python\nimport numpy as np\n\nt = 1.0\ndt = 1e-5\ntau = np.arange(0.0, t, dt)\n\ny = 2*tau * np.exp(-(t - tau))\nS_num = np.sum(y) * dt\nprint(S_num)\n```\n\n- 예시 결과(참고): 약 **0.73575** (dt=1e-5 기준)\n\n---"
        }
      ]
    },
    {
      "id": "2-1F",
      "title": "1.F.",
      "problems": [
        {
          "id": "2-1F",
          "title": "1.F.",
          "prompt": "ω = -1, 0, 2, 10^3 에 대하여 각각\n\n\\[\n\\int_{0}^{10} 2t\\,e^{j\\omega t}\\,dt\n\\]\n\n를 수치적분으로 구하는 py 스크립트 파일을 작성하시오.",
          "answerType": "textarea",
          "solution": "\\[\n\\int_{0}^{10} 2t\\,e^{j\\omega t}\\,dt,\\quad \\omega\\in\\{-1,0,2,10^3\\}\n\\]\n\n```python\nimport numpy as np\n\ndt = 1e-4\nt = np.arange(0.0, 10.0, dt)  # 10은 제외(리만합)\nomegas = [-1.0, 0.0, 2.0, 1e3]\n\nfor w in omegas:\n    y = 2*t * np.exp(1j*w*t)\n    S = np.sum(y) * dt\n    print(f\"w={w:>7g}  integral ≈ {S}\")\n```\n\n- 예시 결과(참고, dt=1e-4):\n  - w=-1  ≈ ( -2.5029 - 30.5216j )\n  - w=0   ≈ 99.9990\n  - w=2   ≈ ( -29.4164 - 13.1751j )\n  - w=1e3 ≈ ( -0.0522 - 0.0501j )"
        }
      ]
    },
    {
      "id": "2-1G",
      "title": "1.G.",
      "problems": [
        {
          "id": "2-1G",
          "title": "1.G.",
          "prompt": "sympy 모듈로 문제 1.E, 1.F의 적분을 구하고 수치적분 결과와 비교하시오.",
          "answerType": "textarea",
          "solution": "아래는 **sympy**로 1.E와 1.F의 적분을 구한 뒤, 본인이 1.E/1.F에서 얻은 수치적분 값과 비교(오차[%])하는 예시이다.\n\n### (1) 1.E의 sympy 적분\n1.E에서 \\(t=1\\), \\(f(\\tau)=2\\tau\\), \\(g(t-\\tau)=e^{-(t-\\tau)}\\) 이므로\n\\[\nS_{sym,E}=\\int_{0}^{1} 2\\tau\\, e^{-(1-\\tau)}\\, d\\tau = \\frac{2}{e}.\n\\]\n\n### (2) 1.F의 sympy 적분\n1.F에서\n\\[\nS_{sym,F}(\\omega)=\\int_{0}^{10} 2t\\, e^{j\\omega t}\\, dt.\n\\]\nsympy로는 아래처럼 구할 수 있다. (단, \\(\\omega=0\\)이면 \\(S_{sym,F}(0)=\\int_0^{10}2t\\,dt=100\\).)\n\n### (3) Python(sympy) 예시 코드 + 오차[%] 계산\n> 아래 코드에서 `S_num_E`, `S_num_F`는 **본인이 1.E/1.F에서 수치적분으로 얻은 값**(출력값)을 그대로 넣으면 된다.\n\n```python\nimport sympy as sp\n\n# --- 1.E ---\ntau = sp.Symbol('tau', real=True)\nS_sym_E = sp.integrate(2*tau * sp.exp(-(1 - tau)), (tau, 0, 1))  # t=1\nS_sym_E = sp.N(S_sym_E)\n\n# --- 1.F ---\nt, w = sp.symbols('t w', real=True)\nj = sp.I\nS_sym_F = sp.integrate(2*t * sp.exp(j*w*t), (t, 0, 10))\n# w=0은 별도로 처리\nS_sym_F_w0 = sp.Integer(100)\n\n# ====== 여기에 본인 수치적분 결과를 입력 ======\nS_num_E = None  # 예: 0.7357...\n# 예: w_list = [-1, 0, 2, 1e3] 에 대한 수치적분 결과를 dict로 저장\nS_num_F = {\n    -1: None,\n     0: None,\n     2: None,\n  1e3: None,\n}\n\n# --- 오차[%] (식 2.1) ---\ndef err_percent(S_sym, S_num):\n    return abs(S_sym - S_num) / abs(S_sym) * 100\n\n# 1.E 오차\nif S_num_E is not None:\n    print(\"S_sym_E =\", S_sym_E)\n    print(\"error_E[%] =\", err_percent(complex(S_sym_E), complex(S_num_E)))\n\n# 1.F 오차\nfor ww, s_num in S_num_F.items():\n    if s_num is None:\n        continue\n    if ww == 0:\n        s_sym = complex(S_sym_F_w0)\n    else:\n        s_sym = complex(sp.N(S_sym_F.subs(w, ww)))\n    print(f\"w={ww}  S_sym={s_sym}  error[%]={err_percent(s_sym, complex(s_num))}\")\n```\n\n- 오차[%]가 매우 작으면: “수치적분 결과가 sympy 결과와 잘 일치한다.” 정도로 간단히 정리하면 된다.\n- 오차가 크게 나오면: 1.D3 지시사항에 따라 스크립트를 수정 후 재실행하여 다시 비교하면 된다."
        }
      ]
    },
    {
      "id": "2-2A",
      "title": "2.A.Orthogonal Expansion",
      "problems": [
        {
          "id": "2-2A",
          "title": "2.A",
          "prompt": "T = 8.XXX(XXX=학번 끝 3자리)라 하자. 주기가 2T인 사인(sine) 파형을 \\(s_1(t)\\)이라 하고, \\(s_1(t)\\)의 주파수의 \\(n\\)배(\\(n\\)은 정수) 주파수를 갖는 사인 파형을 \\(s_n(t)\\)이라고 하자. 본 문제에서 신호 집합 \\(\\{ s_1(t), s_2(t), s_3(t), \\dots \\}\\)의 원소(신호)들이 \\(0 \\le t \\le T\\)에서 서로 직교(Orthogonal)함을 **수치적분 방법**과 **sympy 모듈을 이용한 적분 방법**으로 각각 확인해 보자.  \n\n참고: 학번이 20840258이라면, \\(T=8.258\\)이고 \\(t\\)의 범위는 \\(0 \\le t \\le 8.258\\)이 됨.\n\n---",
          "answerType": "textarea",
          "solution": "",
          "tags": [
            "preface"
          ]
        },
        {
          "id": "2-2A1",
          "title": "2.A1",
          "prompt": "수치적분 방법과 sympy 모듈을 이용한 적분 방법에 앞서, 수식 전개로 \\(\\{ s_1(t), s_2(t), s_3(t), \\dots \\}\\)는 직교 집합임을 확인할 수 있다. \\(s_1(t)\\)는 사인(sine) 파형이라 했으므로 \\(s_1(t)=\\sin(2\\pi f_1 t)\\)로 나타내며, 주기가 \\(2T\\)라 했으므로 주파수 \\(f_1=1/(2T)\\)이다. \\(s_n(t)\\)은 \\(s_1(t)\\)의 주파수의 정수 \\(n\\)배의 주파수를 갖는 사인파라고 했으므로 \\(s_n(t)=\\sin(2\\pi n f_1 t)\\)이다. 임의의 두 원소 \\(s_l(t), s_k(t)\\)를 내적 공식 \\(\\int_0^T s_l(t)s_k(t)\\,dt\\)에 대입하여 정리하면 내적이 0임을 보일 수 있다. 수식으로 정리하여 보이시오.",
          "solution": "# Chapter 2 — 2.A + 2.A1 (Answer)\n\n> 본 파일은 **2.A1(수식 전개로 직교성 증명)**의 풀이를 제공합니다.  \n> (2.A는 설정/서문)\n\n---\n\n## 정답(수식 전개로 직교성 증명)\n\n주기 \\(2T\\)이므로\n\\[\nf_1=\\frac{1}{2T}.\n\\]\n또한\n\\[\ns_n(t)=\\sin(2\\pi n f_1 t)\n\\]\n이므로\n\\[\ns_n(t)=\\sin\\left(2\\pi n\\cdot \\frac{1}{2T}\\,t\\right)\n=\\sin\\left(\\frac{\\pi n}{T}t\\right).\n\\]\n\n임의의 서로 다른 정수 \\(l\\neq k\\)에 대해 내적을 계산하면\n\\[\n\\int_0^T s_l(t)s_k(t)\\,dt\n=\\int_0^T \\sin\\left(\\frac{\\pi l}{T}t\\right)\\sin\\left(\\frac{\\pi k}{T}t\\right)\\,dt.\n\\]\n\n곱-합 공식\n\\[\n\\sin A\\sin B=\\frac12\\big[\\cos(A-B)-\\cos(A+B)\\big]\n\\]\n을 쓰면\n\\[\n=\\frac12\\int_0^T\\left[\n\\cos\\left(\\frac{\\pi(l-k)}{T}t\\right)\n-\\cos\\left(\\frac{\\pi(l+k)}{T}t\\right)\n\\right]dt.\n\\]\n\n적분하면\n\\[\n=\\frac12\\left[\n\\frac{\\sin\\left(\\frac{\\pi(l-k)}{T}t\\right)}{\\frac{\\pi(l-k)}{T}}\n-\\frac{\\sin\\left(\\frac{\\pi(l+k)}{T}t\\right)}{\\frac{\\pi(l+k)}{T}}\n\\right]_{0}^{T}.\n\\]\n\n여기서 \\(t=T\\)일 때 \\(\\sin(\\pi(l\\pm k))=0\\), \\(t=0\\)일 때도 \\(\\sin 0=0\\)이므로(그리고 \\(l\\neq k\\)라서 분모는 0이 아님),\n\\[\n\\int_0^T s_l(t)s_k(t)\\,dt=0\\quad (l\\neq k).\n\\]\n\n따라서 \\(\\{s_1(t), s_2(t), s_3(t), \\dots\\}\\)는 구간 \\(0\\le t\\le T\\)에서 서로 직교이다.\n\n---\n\n## (참고) 같은 원소의 내적(에너지)\n\\[\n\\int_0^T s_l^2(t)\\,dt=\\frac{T}{2}.\n\\]",
          "tags": []
        },
        {
          "id": "2-2A2",
          "title": "2.A2",
          "prompt": "# Chapter 2 — 2.A2 (Problem)\n\n## 2.A2\n아래를 참고하여 **\\(0 \\le t \\le T\\)** 구간 동안 \\(s_1(t)\\)와 \\(s_2(t)\\)의 샘플 벡터를 생성하고, \\(s_1(t)\\)와 \\(s_2(t)\\)의 에너지를 **수치적분**으로 구하는 **py 스크립트 파일**을 완성하여 보이고, **수치적분 결과도 보이시오.**\n\n- 해야 할 것: 아래 코드에서 `E2=?` 를 **완성**하고, 실행하여 **E1, E2 결과값**을 출력할 것.\n- 주의: `np.random.randint(1,XXX)` 라인은 **내용과 상관없으나 반드시 포함**할 것.\n\n```python\n%reset -sf\n%clear\n\nimport numpy as np\n\nnp.random.randint(1,XXX) # XXX=학번 끝 3자리, 내용과 상관없으나 꼭 추가할 것\n\nT=8.XXX # XXX는 학번 끝 3자리\nt_step=1e-3\nt=np.arange(0,T,t_step)\nf1=1/(2*T) # s1(t)의 주파수 \ns1t=np.sin(2*np.pi*f1*t) # s1(t)의 샘플 벡터  \ns2t=np.sin(2*np.pi*(2*f1)*t) # s2(t)의 샘플 벡터\nE1=sum(np.power(abs(s1t),2))*t_step # 에너지 공식 E1 = ∫_0^T |s1(t)|^2 dt 을 수치적분으로 구현\n\nE2=?  # 에너지 공식 E2 = ∫_0^T |s2(t)|^2 dt 을 수치적분으로 구현\n```",
          "solution": "# Chapter 2 — 2.A2 (Answer)\n\n## 정답\n\n### (1) E2 정답 라인\n`E1`과 동일한 방식으로, 신호만 `s2t`로 바꾸면 됩니다.\n\n```python\nE2 = sum(np.power(abs(s2t),2)) * t_step\n```\n\n### (2) “수치적분 결과도 보이시오”용 출력 예\n```python\nprint(\"E1 =\", E1)\nprint(\"E2 =\", E2)\n```\n\n### (3) 완성 코드 예시(참고)\n```python\n%reset -sf\n%clear\n\nimport numpy as np\n\nnp.random.randint(1,XXX) # XXX=학번 끝 3자리, 내용과 상관없으나 꼭 추가할 것\n\nT=8.XXX # XXX는 학번 끝 3자리\nt_step=1e-3\nt=np.arange(0,T,t_step)\nf1=1/(2*T) # s1(t)의 주파수 \ns1t=np.sin(2*np.pi*f1*t) # s1(t)의 샘플 벡터  \ns2t=np.sin(2*np.pi*(2*f1)*t) # s2(t)의 샘플 벡터\nE1=sum(np.power(abs(s1t),2))*t_step # 에너지 공식 E1 = ∫_0^T |s1(t)|^2 dt 을 수치적분으로 구현\n\nE2=sum(np.power(abs(s2t),2))*t_step # 에너지 공식 E2 = ∫_0^T |s2(t)|^2 dt 을 수치적분으로 구현\n\nprint(\"E1 =\", E1)\nprint(\"E2 =\", E2)\n```",
          "tags": []
        },
        {
          "id": "2-2A3",
          "title": "2.A3",
          "prompt": "# Chapter 2 — 2.A3 (Problem)\n\n## 2.A3\n\\(\\{s_1(t), s_2(t), s_3(t), \\dots\\}\\)에서 2개의 원소(신호)를 아래 ‘참고’에 따라 선택하시오.\n\n- **참고(선택 규칙)**: 학번 **끝 2자리**에 각각 +1한 수로 선택.  \n  예를 들어 학번이 20840247이면, 4+1번째와 7+1번째 원소(신호)를 선택. 즉, \\(s_5(t)\\)와 \\(s_8(t)\\)을 선택할 것.  \n  만약 학번 끝 2자리가 같을 경우는 임의의 서로 다른 2개의 원소(신호)를 선택할 것.\n\n그리고, 그들의 샘플 벡터를 생성하고 수치적분으로 내적이 0임을 보이는 py 스크립트 파일을 작성하시오.\n\n- (a) 완성된 py 스크립트 파일과 내적 계산 결과를 보이시오.  \n- (b) 내적 계산 결과를 근거로 2개의 신호가 직교인지 아닌지 판단하고, 그 근거를 쓰시오.  \n  (수치적분에 의한 오차가 존재함을 유의할 것)",
          "solution": "# Chapter 2 — 2.A3 (Answer)\n\n## 정답(예시 스크립트 + 판단 기준)\n\n아래는 **학번 끝 2자리**로 \\(s_{n_1}(t)\\), \\(s_{n_2}(t)\\)를 선택한 뒤, 샘플 벡터를 만들고 **수치적분으로 내적**을 계산하는 예시입니다.\n\n> - `a`, `b`를 **본인 학번 끝 2자리**로 채우면 됩니다.  \n> - 만약 `a == b`이면 문제 지침에 따라 서로 다른 두 신호가 되도록 `n2`를 조정합니다.\n\n```python\n%reset -sf\n%clear\n\nimport numpy as np\n\nnp.random.randint(1,XXX)  # XXX=학번 끝 3자리, 내용과 상관없으나 꼭 추가할 것\n\n# ---- 설정 ----\nT = 8.XXX      # XXX=학번 끝 3자리\nt_step = 1e-3\nt = np.arange(0, T, t_step)\n\nf1 = 1/(2*T)\n\n# ---- 학번 끝 2자리로 선택 (예: ...47 -> a=4, b=7) ----\na = 4   # 학번 끝에서 십의 자리 (본인 값으로 수정)\nb = 7   # 학번 끝에서 일의 자리 (본인 값으로 수정)\n\nn1 = a + 1\nn2 = b + 1\n\n# 끝 2자리가 같으면 임의로 서로 다르게 선택\nif n1 == n2:\n    n2 = n1 + 1\n\n# ---- 신호 샘플 벡터 생성 ----\ns1 = np.sin(2*np.pi*n1*f1*t)   # s_{n1}(t)\ns2 = np.sin(2*np.pi*n2*f1*t)   # s_{n2}(t)\n\n# ---- 내적(수치적분) ----\nInnerProduct = np.sum(s1 * np.conjugate(s2)) * t_step\n\nprint(\"n1 =\", n1, \", n2 =\", n2)\nprint(\"InnerProduct =\", InnerProduct)\n```\n\n---\n\n## (b) 직교 여부 판단 및 근거(답안 서술 예)\n\n- 계산된 내적 `InnerProduct`가 **0에 매우 가깝게** 나오면(예: \\(10^{-3}\\), \\(10^{-6}\\) 수준의 작은 값),\n  수치적분 오차로 인해 정확히 0이 아닐 수 있으나 **두 신호는 직교(orthogonal)**라고 판단한다.\n- 반대로 `InnerProduct`가 0 근처가 아니라 **유의미하게 큰 값**이면, **직교가 아니다**라고 판단한다.\n\n(문제에서 “수치적분에 의한 오차가 존재함을 유의”하라고 명시했으므로, ‘0에 가깝다’는 기준으로 판단을 서술하면 됩니다.)",
          "tags": []
        },
        {
          "id": "2-2A4",
          "title": "2.A4",
          "prompt": "# Chapter 2 — 2.A4 (Problem)\n\n## 2.A4\nsympy 모듈을 이용하여 (**t를 벡터가 아닌 sympy 변수로 선언**) 적분 결과가 0임을 확인해 보자. 아래는 학번 끝 2자리가 ‘4’와 ‘7’인 경우의 py 스크립트 파일이다. 자신의 학번 끝 2자리에 맞게 신호를 선택하여 아래 py 스크립트 파일을 수정하여 보이고, 실행 결과도 보이시오. 그리고 실행 결과로 무엇을 확인할 수 있는지 쓰시오.\n\n> 아래 코드에서 `??`, `?` 부분을 채워 **완성**하시오.\n\n```python\n%reset -sf\n%clear\n\nimport numpy as np\nimport sympy as sp\n\nnp.random.randint(1,XXX) # XXX=학번 끝 3자리, 내용과 상관없으나 꼭 추가할 것\n\nT=8.XXX # XXX는 학번 끝 3자리\nt = sp.symbols('t')\nf1=1/(2*T) \n\ns5t=sp.sin(2*sp.pi*f1*5*t) #‘4’+1=>5\ns8t=??                         #‘7’+1=>8\n\nInnerProduct=sp.integrate(?*np.conjugate(?),(t,?,?))\nInnerProduct.evalf()\n```",
          "solution": "# Chapter 2 — 2.A4 (Answer)\n\n## 정답\n\n### (1) ‘4’와 ‘7’인 경우(예시 그대로 채우기)\n```python\n%reset -sf\n%clear\n\nimport numpy as np\nimport sympy as sp\n\nnp.random.randint(1,XXX) # XXX=학번 끝 3자리, 내용과 상관없으나 꼭 추가할 것\n\nT=8.XXX # XXX는 학번 끝 3자리\nt = sp.symbols('t')\nf1=1/(2*T) \n\ns5t=sp.sin(2*sp.pi*f1*5*t)      # ‘4’+1 => 5\ns8t=sp.sin(2*sp.pi*f1*8*t)      # ‘7’+1 => 8\n\nInnerProduct=sp.integrate(s5t*np.conjugate(s8t),(t,0,T))\nInnerProduct.evalf()\n```\n\n### (2) 실행 결과로 무엇을 확인할 수 있는가?\n- `InnerProduct.evalf()` 값이 **0(또는 0에 해당하는 값)**으로 나오면, **sympy(기호적 적분)**로 계산한 두 신호의 내적이 0임을 확인하는 것이다.\n- 즉, 2.A3에서는 수치적분으로 “0에 가깝다”를 확인했고, 2.A4에서는 **기호적 적분으로 내적이 0임을 확인**한다.",
          "tags": []
        }
      ]
    },
    {
      "id": "2-2B",
      "title": "2.B",
      "problems": [
        {
          "id": "2-2B",
          "title": "2.B",
          "prompt": "비 주기 오디오 신호를 직교 신호 집합(Orthogonal Set)의 원소들을 이용하여 근사화해보자.  \n아래 문제에서 오디오 신호를 재생해야 하므로, PC 오디오 출력에 스피커나 이어폰을 연결하여 PC 소리를 들을 수 있도록 하시오.",
          "solution": "",
          "tags": [
            "preface"
          ]
        },
        {
          "id": "2-2B1",
          "title": "2.B1",
          "prompt": "아래 절차를 **순서대로 그대로 수행**하고, 샘플 오디오를 청취한 뒤 어떤 소리가 들리는지 **1~2문장으로** 쓰시오.\n\n[따라하기]\n1) 새 탭에서 https://colab.research.google.com/ 를 열고 \"새 노트(또는 New Notebook)\" 열기  \n2) 오디오샘플 다운로드(클릭 또는 복사-붙여넣기):\n   - 수업/배포용: https://<YOUR-DOMAIN>/assets/ch02/song.pkl\n   - 로컬 테스트: http://localhost:3000/assets/ch02/song.pkl\n3) 오디오샘플 업로드(Colab): Colab 왼쪽 Files(폴더 아이콘) → Upload → `song.pkl` 선택  \n4) 아래 코드 셀을 코랩 노트의 셀에 복사하여 실행  \n5) 셀 실행 결과 아래에 나타난 오디오 플레이어에서 ▶(재생) 버튼을 눌러 오디오 재생\n\n### Colab 코드셀(그대로 실행)\n```python\nimport pickle\nimport numpy as np\nfrom IPython.display import Audio, display\n\nwith open('song.pkl', 'rb') as f:\n    song = pickle.load(f)\n\n# song[1]에 오디오 샘플 벡터가 저장되어 있음 (샘플레이트: 44100 Hz)\nx = np.array(song[1], dtype=float)\n\n# (권장) 클리핑 방지 정규화\nx = x / (np.max(np.abs(x)) + 1e-12) * 0.9\n\ndisplay(Audio(x, rate=44100))\n```",
          "solution": "# 2.B1 정답(예시/작성 가이드)\n\n이 문항은 **청취형 문항**으로, 정해진 “단일 정답 문장”이 있는 문제가 아니다.  \n채점(또는 확인)의 핵심은 아래 2가지를 만족하는지이다.\n\n## (1) 실행 확인 체크\n- `song.pkl`을 Colab에 업로드했다.\n- 위 코드셀을 실행했을 때, 출력 영역에 오디오 플레이어가 나타나고 ▶(재생) 버튼으로 재생이 된다.\n\n## (2) 서술(예시)\n학생은 들린 소리를 1~2문장으로 서술한다. 예:\n\n- “멜로디가 있는 음악(노래)처럼 들렸다.”\n- “여러 음이 섞인 짧은 음악/효과음이 들렸다.”\n\n※ 실제 내용은 제공된 샘플에 따라 달라질 수 있으며, **재생 여부와 간단한 청취 서술**이 핵심이다.",
          "tags": []
        }
      ]
    }
  ]
} as const;