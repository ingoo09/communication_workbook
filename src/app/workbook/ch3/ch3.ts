export const chapter = {
  ""id"": "ch3",
  "title": "Chapter 3. Fourier Series and Frequency Transfer Function(Free)",
  "sections": [
 {
      "id": "1A1",
      "prompt": `
T = (자신의 학번 끝 2자리)로 설정하자.
푸리에 급수의 기본 주파수 w0를 구하시오.
      `,
      "solution": `
w0 = 2π / T
      `
    },

    {
      "id": "1A2",
      "prompt": `
첫 번째 항만 사용하여 그래프를 그렸을 때,
결과 그래프는 어떤 함수인가?
      `,
      "solution": `
cos(w0 t) 형태의 코사인 함수
      `
    },

    {
      "id": "1A3",
      "prompt": `
두 번째 항까지 추가했을 때 그래프 변화를 설명하시오.
      `,
      "solution": `
고조파가 추가되어 파형이 사각파 형태로 조금 더 가까워짐
      `
    },

    {
      "id": "1A4",
      "prompt": `
세 번째, 네 번째, 다섯 번째 항을 수식으로 쓰시오.
      `,
      "solution": `
(4/π)*(1/5)*cos(5w0 t)
(4/π)*(-1/7)*cos(7w0 t)
(4/π)*(1/9)*cos(9w0 t)
      `
    },

    {
      "id": "1A5",
      "prompt": `
세 번째 ~ 다섯 번째 항을 코드로 작성하시오.
      `,
      "solution": `
fTt += (4/np.pi)*(1/5)*np.cos(5*w0*t)
fTt += (4/np.pi)*(-1/7)*np.cos(7*w0*t)
fTt += (4/np.pi)*(1/9)*np.cos(9*w0*t)
      `
    },

    {
      "id": "1A7",
      "prompt": `
항을 많이 더할수록 어떤 파형으로 수렴하는가?
      `,
      "solution": `
사각파(square wave)로 수렴
      `
    },

    // =========================
    // 1.B
    // =========================
    {
      "id": "1B1",
      "prompt": `
푸리에 급수를 시그마 형태로 표현하시오.
      `,
      "solution": `
f_T(t) = (4/π) Σ_{n=1}^{N} [(-1)^{n-1}/(2n-1) * cos((2n-1)w0 t)]
      `
    },

    {
      "id": "1B3",
      "prompt": `
반복문 결과는 어느 그래프와 같은가?
      `,
      "solution": `
같은 항 개수를 사용한 1A 결과와 동일
      `
    },

    {
      "id": "1B4",
      "prompt": `
N이 증가할수록 어떤 현상이 나타나는가?
      `,
      "solution": `
사각파에 수렴하며 Gibbs 현상이 나타남
      `
    },

    // =========================
    // 2
    // =========================
    {
      "id": "2A",
      "prompt": `
RC 회로의 미분 방정식을 유도하시오.
      `,
      "solution": `
f(t) = RC * dg(t)/dt + g(t)
      `
    },

    {
      "id": "2B",
      "prompt": `
전달함수 H(w)를 구하시오.
      `,
      "solution": `
H(w) = 1 / (1 + j w R C)
      `
    },

    {
      "id": "2C",
      "prompt": `
|H(w)|와 ∠H(w)를 구하시오.
      `,
      "solution": `
|H(w)| = 1 / sqrt(1 + (wRC)^2)
∠H(w) = -atan(wRC)
      `
    },

    {
      "id": "2D",
      "prompt": `
|H(w)|를 그리는 Python 코드를 완성하시오.
      `,
      "solution": `
w = np.arange(-120,120,1/1e4)
R = 0.5e3
C = 1XXXe-6
Hw = 1/(1+1j*w*R*C)
plt.plot(w, np.abs(Hw))
      `
    },

    {
      "id": "2E",
      "prompt": `
∠H(w)를 그리는 Python 코드를 작성하시오.
      `,
      "solution": `
plt.plot(w, np.angle(Hw))
      `
    },

    {
      "id": "2F",
      "prompt": `
이 회로를 저역통과필터라 부르는 이유는?
      `,
      "solution": `
저주파는 통과시키고 고주파는 감쇠시키기 때문
      `
    },

    // =========================
    // 3
    // =========================
    {
      "id": "3A2",
      "prompt": `
그래프에서 입력과 출력은 각각 무엇인가?
      `,
      "solution": `
위 그래프: 입력 / 아래 그래프: 출력
      `
    },

    {
      "id": "3A3",
      "prompt": `
입력과 출력의 주파수 관계는?
      `,
      "solution": `
출력 주파수 = 입력 주파수
      `
    },

    {
      "id": "3A6",
      "prompt": `
선형 시스템의 중요한 성질은?
      `,
      "solution": `
주파수는 변하지 않고 크기와 위상만 변함
      `
    },

    // =========================
    // 4
    // =========================
    {
      "id": "4A1",
      "prompt": `
입력이 e^{jnw0t}일 때 출력은?
      `,
      "solution": `
H(nw0) e^{jnw0 t}
      `
    },

    {
      "id": "4A2",
      "prompt": `
입력이 Fn e^{jnw0t}일 때 출력은?
      `,
      "solution": `
Fn H(nw0) e^{jnw0 t}
      `
    },

    {
      "id": "4A4",
      "prompt": `
Gn을 구하시오.
      `,
      "solution": `
Gn = H(nw0) Fn
      `
    },

    {
      "id": "4A5",
      "prompt": `
출력 g(t)의 특징은?
      `,
      "solution": `
출력도 주기함수
      `
    },

    {
      "id": "4B",
      "prompt": `
코드의 빈칸을 채우시오.
      `,
      "solution": `
w0 = (2*np.pi)/T

if n % 2 == 0:
    Fn = 0
else:
    Fn = 2/(1j*n*np.pi)

Gn = Hw * Fn
      `
    },

    {
      "id": "4B3",
      "prompt": `
결과로부터 알 수 있는 성질은?
      `,
      "solution": `
푸리에 계수에 전달함수를 곱하면 출력이 됨
      `
    }
  ]
} as const;