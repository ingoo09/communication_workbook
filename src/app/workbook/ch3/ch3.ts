export const chapter = {
  "id": "3-fourier-frequency",
  "title": "3장. Fourier Series and Frequency Transfer Function — 문제 풀이",
  "sections": [

    // =========================
    // 1.A
    // =========================
    {
      "id": "3-1A",
      "title": "1.A",
      "problems": [
        {
          "id": "3-1A1",
          "title": "1.A1.",
          "prompt": "T를 설정하고 기본 주파수 w0를 구하시오.",
          "answerType": "textarea",
          "solution": `
푸리에 급수에서 기본 주파수는 다음과 같이 정의된다.

\\[
w_0 = \\frac{2\\pi}{T}
\\]

따라서, 자신의 학번 끝 두 자리를 T로 설정하면 해당 값에 따라 w0가 결정된다.
          `
        },
        {
          "id": "3-1A2",
          "title": "1.A2.",
          "prompt": "첫 번째 항만 사용했을 때 그래프는 어떤 함수인가?",
          "answerType": "textarea",
          "solution": `
첫 번째 항은 다음과 같다.

\\[
f(t) = \\frac{4}{\\pi} \\cos(w_0 t)
\\]

따라서 그래프는 단순한 코사인 함수이며,
주기 T를 갖는 정현파 형태이다.
          `
        },
        {
          "id": "3-1A4",
          "title": "1.A4.",
          "prompt": "3번째, 4번째, 5번째 항을 구하시오.",
          "answerType": "textarea",
          "solution": `
푸리에 급수는 다음과 같은 패턴을 가진다.

\\[
\\frac{4}{\\pi}\\left( \\cos(w_0 t) - \\frac{1}{3}\\cos(3w_0 t) + \\frac{1}{5}\\cos(5w_0 t) - ... \\right)
\\]

따라서,

- 3번째 항:
\\[
\\frac{4}{\\pi} \\cdot \\frac{1}{5} \\cos(5w_0 t)
\\]

- 4번째 항:
\\[
\\frac{4}{\\pi} \\cdot \\left(-\\frac{1}{7}\\right) \\cos(7w_0 t)
\\]

- 5번째 항:
\\[
\\frac{4}{\\pi} \\cdot \\frac{1}{9} \\cos(9w_0 t)
\\]
          `
        },
        {
          "id": "3-1A7",
          "title": "1.A7.",
          "prompt": "항을 많이 더할수록 어떤 파형으로 수렴하는가?",
          "answerType": "textarea",
          "solution": `
푸리에 급수의 항을 많이 더할수록 결과는 이상적인 사각파(square wave)에 점점 가까워진다.

다만, 불연속점에서는 Gibbs 현상이 발생하여 약간의 오버슈트가 나타난다.
          `
        }
      ]
    },

    // =========================
    // 1.B
    // =========================
    {
      "id": "3-1B",
      "title": "1.B",
      "problems": [
        {
          "id": "3-1B1",
          "title": "1.B1.",
          "prompt": "푸리에 급수를 시그마 형태로 표현하시오.",
          "answerType": "textarea",
          "solution": `
푸리에 급수는 다음과 같이 표현된다.

\\[
f_T(t) = \\frac{4}{\\pi} \\sum_{n=1}^{N} \\frac{(-1)^{n-1}}{2n-1} \\cos((2n-1)w_0 t)
\\]

이 식은 홀수 고조파만 포함하는 사각파의 푸리에 급수이다.
          `
        },
        {
          "id": "3-1B3",
          "title": "1.B3.",
          "prompt": "반복문 결과 그래프는 어떤 경우와 같은가?",
          "answerType": "textarea",
          "solution": `
반복문을 이용한 결과는 동일한 항 개수를 수동으로 더한 경우와 동일하다.

즉, 1.A에서 같은 개수의 항을 사용했을 때의 그래프와 일치한다.
          `
        }
      ]
    },

    // =========================
    // 2
    // =========================
    {
      "id": "3-2",
      "title": "2. RC 회로",
      "problems": [
        {
          "id": "3-2A",
          "title": "2.A.",
          "prompt": "RC 회로의 미분 방정식을 유도하시오.",
          "answerType": "textarea",
          "solution": `
RC 회로에서 키르히호프 전압 법칙(KVL)을 적용하면,

입력 전압 f(t)는 저항과 커패시터 전압의 합이다.

저항 전압: R i(t)  
커패시터 전류: i(t) = C dg(t)/dt

따라서,

\\[
f(t) = R C \\frac{dg(t)}{dt} + g(t)
\\]

이 된다.
          `
        },
        {
          "id": "3-2B",
          "title": "2.B.",
          "prompt": "전달함수 H(w)를 구하시오.",
          "answerType": "textarea",
          "solution": `
입력을 e^{jwt}, 출력을 H(w)e^{jwt}라 하면,

미분은 jω가 곱해진다.

따라서 식에 대입하면,

\\[
H(w)e^{jwt} + jωRC H(w)e^{jwt} = e^{jwt}
\\]

정리하면,

\\[
H(w) = \\frac{1}{1 + jωRC}
\\]
          `
        },
        {
          "id": "3-2D",
          "title": "2.D.",
          "prompt": "전달함수 크기를 그리는 코드를 설명하시오.",
          "code": `
w=np.arange(-120,120,1/1e4)
R=0.5e3
C=1XXXe-6
Hw=1/(1+1j*w*R*C)
plt.plot(w,np.abs(Hw))
          `,
          "answerType": "textarea",
          "solution": `
각 라인의 의미는 다음과 같다.

w = np.arange(-120,120,1/1e4)
- 주파수 범위를 생성한다.

R = 0.5e3
- 저항값 설정

C = 1XXXe-6
- 커패시터 값 설정

Hw = 1/(1+1j*w*R*C)
- 전달함수를 계산

plt.plot(w, np.abs(Hw))
- 전달함수의 크기를 그래프로 출력
          `
        },
        {
          "id": "3-2F",
          "title": "2.F.",
          "prompt": "왜 저역통과필터인가?",
          "answerType": "textarea",
          "solution": `
주파수가 작을 때 |H(w)| ≈ 1 이고,
주파수가 커질수록 |H(w)| → 0으로 감소한다.

즉, 저주파는 통과시키고 고주파는 차단하므로
Low Pass Filter이다.
          `
        }
      ]
    },

    // =========================
    // 3
    // =========================
    {
      "id": "3-3",
      "title": "3. 선형 시스템",
      "problems": [
        {
          "id": "3-3A3",
          "title": "3.A3.",
          "prompt": "입력과 출력의 주파수 관계를 설명하시오.",
          "answerType": "textarea",
          "solution": `
선형 시스템에서는 입력이 e^{jwt}일 때 출력도 동일한 주파수를 가진다.

즉,

입력 주파수 = 출력 주파수

이며, 변화하는 것은 진폭과 위상뿐이다.
          `
        }
      ]
    },

    // =========================
    // 4
    // =========================
    {
      "id": "3-4",
      "title": "4. 주기함수 응답",
      "problems": [
        {
          "id": "3-4A4",
          "title": "4.A4.",
          "prompt": "Gn을 구하시오.",
          "answerType": "textarea",
          "solution": `
푸리에 계수 Fn에 대해,

출력 계수는

\\[
G_n = H(nw_0) F_n
\\]

이다.

즉, 각 주파수 성분마다 전달함수를 곱하면 출력이 된다.
          `
        },
        {
          "id": "3-4B",
          "title": "4.B.",
          "prompt": "코드 빈칸을 채우시오.",
          "answerType": "textarea",
          "solution": `
w0 = (2*np.pi)/T

if n % 2 == 0:
    Fn = 0
else:
    Fn = 2/(1j*n*np.pi)

Gn = Hw * Fn
          `
        }
      ]
    }

  ]
};