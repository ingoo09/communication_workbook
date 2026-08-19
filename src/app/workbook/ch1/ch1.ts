import type { WorkbookChapter } from '@/types/workbook';

export const chapter = {
  id: '1-python-basics',
  title: 'Chapter 1. Python Basics',
  sections: [
    { //문제 1
      id: '1-1',
      title: '1. Python의 다양한 변수 연산 및 그래프 출력',
      problems: [
        { //문제 1.A
          id: '1-1A',
          type: 'console',
          title: '1.A.',
          prompt:
            `스칼라(실수, 복소수) 변수 연산\n아래 명령을 순서대로 실행하고 Console 결과를 확인하시오. 각 명령이 수행하는 동작과 출력 결과의 의미를 작성하고, 만약 오류 메시지가 출력되면 그 오류의 의미를 작성하시오.
\`\`\`python
1. A=12; print(A)\t\t\t\t\t17. j
2. B; print(B)\t\t\t\t\t\t18. 1j
3. B=A*3; print(B)\t\t\t\t\t19. X=1+3j; print(X)
4. B*6\t\t\t\t\t\t\t20. Y=-2+1j; print(Y)
5. B/5\t\t\t\t\t\t\t21. Z=X+Y; print(Z)
6. B//5\t\t\t\t\t\t\t22. Z=X*Y; print(Z)
7. B%5\t\t\t\t\t\t\t23. np.real(Z)
8. A*B-A*3-B\t\t\t\t\t\t24. np.imag(Z)
9. A=B^2; print(A)\t\t\t\t\t25. np.conjugate(Z)
10. A=B**2; print(A)\t\t\t\t\t26. abs(Z)
11. import numpy as np\t\t\t\t\t27. T=np.angle(1+1j); print(T)
12. A=np.power(B,2); print(A)\t\t\t\t28. (180/pi)*T
13. C=np.sqrt(B); print(C)\t\t\t\t29. (180/np.pi)*T
14. A=2; B=4;C=A+B; print(C)
15. C=A**B; print(C)
16. A=12e6; print(A)
\`\`\`
추가로, 5번과 6번, 9번과 10번, 17번과 18번 명령어의 차이점을 설명하시오.
            `,
          referenceAnswer: `
1. A=12; print(A)
변수 A에 정수 12를 저장한 후 A의 값을 출력한다.
출력 결과는 12이다.

2. B; print(B)
변수 B의 값을 확인하려 하지만, 이 시점에서는 B가 아직 정의되지 않았다.
따라서 NameError가 발생한다. 오류 메시지는 현재 이름 공간에 B라는 변수가 정의되어 있지 않다는 의미이다.
앞의 B에서 오류가 발생하므로 뒤의 print(B)는 실행되지 않는다.

3. B=A*3; print(B)
A=12에 3을 곱한 값을 B에 저장한다.
따라서 B=36이며 출력 결과는 36이다.

4. B*6
B=36에 6을 곱한다.
출력 결과는 216이다.

5. B/5
/는 일반 나눗셈 연산자이다.
36/5를 계산하므로 출력 결과는 7.2이다.

6. B//5
//는 floor division 연산자로, 나눗셈 결과를 아래쪽 정수 방향으로 내림한 몫을 구한다.
36//5의 출력 결과는 7이다.

7. B%5
%는 나눗셈의 나머지를 구하는 연산자이다.
36을 5로 나눈 나머지는 1이므로 출력 결과는 1이다.

8. A*B-A*3-B
현재 A=12, B=36이므로
12×36 - 12×3 - 36 = 360
이다.
따라서 출력 결과는 360이다.

9. A=B^2; print(A)
Python에서 ^는 거듭제곱 연산자가 아니라 bitwise XOR 연산자이다.
B=36에 대해 36 XOR 2를 계산하므로 A=38이 된다.
따라서 출력 결과는 38이다.

10. A=B**2; print(A)
**는 Python의 거듭제곱 연산자이다.
B=36이므로 A=36²=1296이 된다.
출력 결과는 1296이다.

11. import numpy as np
NumPy 라이브러리를 np라는 이름으로 불러온다.
별도의 출력 결과는 없다.
이후 np.power(), np.sqrt(), np.real() 등의 NumPy 함수를 사용할 수 있다.

12. A=np.power(B,2); print(A)
NumPy의 power() 함수를 사용하여 B의 2제곱을 계산한다.
B=36이므로 A=1296이 되고 출력 결과는 1296이다.

13. C=np.sqrt(B); print(C)
NumPy의 sqrt() 함수를 이용하여 B의 제곱근을 계산한다.
B=36이므로 C=6.0이며 출력 결과는 6.0이다.

14. A=2; B=4; C=A+B; print(C)
A에 2, B에 4를 저장한 후 A+B를 계산하여 C에 저장한다.
따라서 C=6이며 출력 결과는 6이다.

15. C=A**B; print(C)
현재 A=2, B=4이므로 2⁴을 계산한다.
따라서 C=16이며 출력 결과는 16이다.

16. A=12e6; print(A)
12e6은 과학적 표기법으로 12×10⁶을 의미한다.
따라서 A에는 12000000.0이 저장되며 출력 결과는 12000000.0이다.

17. j
Python에서 j라는 문자 자체는 허수 단위를 의미하지 않고 일반적인 변수 이름으로 취급된다.
현재 j라는 변수가 정의되어 있지 않으므로 NameError가 발생한다.

18. 1j
Python에서는 숫자 뒤에 j를 붙여 복소수의 허수부를 표현할 수 있다.
따라서 1j는 허수 단위를 나타내는 복소수이며 출력 결과는 1j이다.

19. X=1+3j; print(X)
복소수 1+3j를 변수 X에 저장한다.
출력 결과는 (1+3j)이다.

20. Y=-2+1j; print(Y)
복소수 -2+j를 변수 Y에 저장한다.
출력 결과는 (-2+1j)이다.

21. Z=X+Y; print(Z)
X=1+3j와 Y=-2+j를 더한다.

Z = (1+3j)+(-2+j)
  = -1+4j

따라서 출력 결과는 (-1+4j)이다.

22. Z=X*Y; print(Z)
두 복소수 X와 Y를 곱한다.

Z = (1+3j)(-2+j)
  = -2+j-6j+3j²
  = -2-5j-3
  = -5-5j

따라서 출력 결과는 (-5-5j)이다.

23. np.real(Z)
복소수 Z의 실수부를 구한다.
현재 Z=-5-5j이므로 출력 결과는 -5.0이다.

24. np.imag(Z)
복소수 Z의 허수부를 구한다.
현재 Z=-5-5j이므로 출력 결과는 -5.0이다.

25. np.conjugate(Z)
복소수 Z의 켤레복소수를 구한다.
Z=-5-5j에서 허수부의 부호가 바뀌므로 출력 결과는 (-5+5j)이다.

26. abs(Z)
복소수 Z의 크기, 즉 절댓값을 계산한다.

|Z| = √((-5)²+(-5)²)
    = √50
    ≈ 7.071

따라서 출력 결과는 약 7.071이다.

27. T=np.angle(1+1j); print(T)
np.angle()은 복소수의 위상각을 radian 단위로 계산한다.
1+j의 위상각은 π/4이므로

T = π/4 ≈ 0.7854 rad

이다.
따라서 출력 결과는 약 0.785398이다.

28. (180/pi)*T
radian 단위의 T를 degree 단위로 변환하려는 식이다.
그러나 pi라는 이름을 별도로 정의하거나 import하지 않았으므로 NameError가 발생한다.
즉, 현재 이름 공간에 pi라는 변수가 존재하지 않는다는 의미이다.

29. (180/np.pi)*T
NumPy에 정의된 원주율 np.pi를 사용하여 T를 radian에서 degree로 변환한다.

(180/π)×(π/4) = 45

따라서 출력 결과는 45.0이다.

[비교]
5번, 6번의 차이
5번의 / 연산자는 일반 나눗셈을 수행하므로 36/5=7.2가 된다.
6번의 // 연산자는 floor division을 수행하여 나눗셈 결과를 아래쪽 정수 방향으로 내림한다. 따라서 36//5=7이 된다.
즉, /는 실제 나눗셈 결과를 구하고 //는 바닥 나눗셈을 통해 몫에 해당하는 값을 구한다.

9번, 10번, 11번의 차이
9번의 ^는 Python에서 거듭제곱 연산자가 아니라 bitwise XOR 연산자이다.
따라서 B=36일 때 B^2의 결과는 38이다.
10번의 **는 Python의 거듭제곱 연산자이다.
따라서 B**2는 36²=1296이 된다.
즉, 수학적으로 제곱을 계산하기 위해서는 ^가 아니라 **를 사용해야 한다.

17번과 18번의 차이
17번의 j는 일반 변수 이름으로 해석되므로, 미리 정의되어 있지 않으면 NameError가 발생한다.
반면 18번의 1j는 Python에서 허수 단위를 나타내는 복소수 리터럴이다.
즉, Python에서는 허수 단위 j를 단독으로 쓰지 않고 1j처럼 숫자와 함께 표현해야 한다.
            `,
        },
        { //문제 1.B
          id: '1-1B',
          type: 'console',
          title: '1.B.',
          prompt: `벡터(1차원 Array) 변수 연산\n아래 명령을 순서대로 실행하고 Console 결과를 확인하시오. 각 명령이 수행하는 동작과 출력 결과의 의미를 작성하고, 만약 오류 메시지가 출력되면 그 오류의 의미를 작성하시오.
\`\`\`python
1. import numpy as np\t\t\t\t\t15. Z[0]
2. X=np.arange(-2,5); print(X)\t\t\t\t16. Z[:2]
3. X=np.arange(2,13,3); print(X)\t\t\t17. Z[2:]
4. Y=np.linspace(1,7,4); print(Y)\t\t\t18. Z[1:4]
5. Z=X+Y; print(Z)\t\t\t\t\t19. X=[2,4,8,16]
6. Z=X*Y; print(Z)\t\t\t\t\t20. Y=np.log2(X); print(Y)
7. Z=np.dot(X,Y); print(Z)\t\t\t\t21. Y**3
8. Z=X/Y; print(Z)\t\t\t\t\t22. Y=[7,3,-4,2,9,-1]
9. 2*Y\t\t\t\t\t\t\t23. min(Y)
10. sum(Y)\t\t\t\t\t\t24. max(Y)
11. Y = [2, 1, 4, -3]\t\t\t\t\t25. np.argmin(Y)
12. Y = [2 1 4 -3]\t\t\t\t\t26. np.argmax(Y)
13. len(Y)\t\t\t\t\t\t27. sorted(Y)
14. X=np.reshape(Y,(2,2)); print(X)\t\t\t28. np.append(X,Y)
\`\`\`
            `,
          referenceAnswer: `
1. import numpy as np
NumPy 모듈을 불러와 np라는 이름으로 사용할 수 있도록 한다. 별도의 출력 결과는 없다.

2. X=np.arange(-2,5); print(X)
-2부터 5 미만까지 1씩 증가하는 값을 생성하여 X에 저장한다.
출력 결과는 [-2 -1  0  1  2  3  4]이다.

3. X=np.arange(2,13,3); print(X)
2부터 13 미만까지 3씩 증가하는 값을 생성하여 X에 저장한다.
출력 결과는 [ 2  5  8 11]이다.

4. Y=np.linspace(1,7,4); print(Y)
1부터 7까지 동일한 간격으로 총 4개의 값을 생성하여 Y에 저장한다.
출력 결과는 [1. 3. 5. 7.]이다.

5. Z=X+Y; print(Z)
X와 Y의 같은 위치에 있는 원소끼리 더한다.
[2,5,8,11]+[1,3,5,7]=[3,8,13,18]이므로
출력 결과는 [ 3.  8. 13. 18.]이다.

6. Z=X*Y; print(Z)
X와 Y의 같은 위치에 있는 원소끼리 곱한다.
[2×1, 5×3, 8×5, 11×7]=[2,15,40,77]이므로
출력 결과는 [ 2. 15. 40. 77.]이다.

7. Z=np.dot(X,Y); print(Z)
X와 Y의 내적을 계산한다.
2×1+5×3+8×5+11×7=134이므로 출력 결과는 134.0이다.

8. Z=X/Y; print(Z)
X와 Y의 같은 위치에 있는 원소끼리 나눈다.
출력 결과는 약
[2.         1.66666667 1.6        1.57142857]
이다.

9. 2*Y
Y의 모든 원소에 2를 곱한다.
출력 결과는 [ 2.  6. 10. 14.]이다.

10. sum(Y)
Y의 모든 원소의 합을 계산한다.
1+3+5+7=16이므로 출력 결과는 16.0이다.

11. Y = [2, 1, 4, -3]
정수 2, 1, 4, -3을 원소로 갖는 Python 리스트를 생성하여 Y에 저장한다.
별도의 출력 결과는 없다.

12. Y = [2 1 4 -3]
리스트의 원소 사이에 쉼표(,)가 없으므로 Python 문법에 맞지 않는다.
따라서 SyntaxError가 발생한다.
이 명령이 실행되지 않으므로 Y에는 11번에서 저장한 [2,1,4,-3]이 그대로 남는다.

13. len(Y)
Y에 포함된 원소의 개수를 구한다.
Y에는 4개의 원소가 있으므로 출력 결과는 4이다.

14. X=np.reshape(Y,(2,2)); print(X)
Y의 4개 원소를 2행 2열의 NumPy 배열로 변환하여 X에 저장한다.
출력 결과는
[[ 2  1]
 [ 4 -3]]
이다.

15. Z[0]
현재 Z는 8번에서 저장된 배열이다.
인덱스 0에 해당하는 첫 번째 원소를 출력하므로 결과는 2.0이다.

16. Z[:2]
Z의 처음부터 인덱스 2 직전까지의 원소를 선택한다.
즉 첫 번째와 두 번째 원소를 가져오므로 출력 결과는
[2.         1.66666667]
이다.

17. Z[2:]
Z의 인덱스 2부터 마지막 원소까지 선택한다.
출력 결과는
[1.6        1.57142857]
이다.

18. Z[1:4]
Z의 인덱스 1부터 인덱스 4 직전까지의 원소를 선택한다.
따라서 두 번째부터 네 번째 원소까지 선택되어
[1.66666667 1.6        1.57142857]
이 출력된다.

19. X=[2,4,8,16]
2, 4, 8, 16을 원소로 갖는 Python 리스트를 생성하여 X에 저장한다.
별도의 출력 결과는 없다.

20. Y=np.log2(X); print(Y)
X의 각 원소에 밑이 2인 로그를 적용하여 Y에 저장한다.
log2(2)=1, log2(4)=2, log2(8)=3, log2(16)=4이므로
출력 결과는 [1. 2. 3. 4.]이다.

21. Y**3
Y의 각 원소를 3제곱한다.
출력 결과는 [ 1.  8. 27. 64.]이다.

22. Y=[7,3,-4,2,9,-1]
7, 3, -4, 2, 9, -1을 원소로 갖는 Python 리스트를 생성하여 Y에 저장한다.
별도의 출력 결과는 없다.

23. min(Y)
Y의 원소 중 최솟값을 구한다.
출력 결과는 -4이다.

24. max(Y)
Y의 원소 중 최댓값을 구한다.
출력 결과는 9이다.

25. np.argmin(Y)
Y의 원소 중 최솟값이 위치한 인덱스를 구한다.
최솟값 -4는 세 번째 원소이고 Python의 인덱스는 0부터 시작하므로 출력 결과는 2이다.

26. np.argmax(Y)
Y의 원소 중 최댓값이 위치한 인덱스를 구한다.
최댓값 9는 다섯 번째 원소이므로 출력 결과는 4이다.

27. sorted(Y)
Y의 원소를 오름차순으로 정렬한 새로운 리스트를 반환한다.
출력 결과는 [-4, -1, 2, 3, 7, 9]이다.
원래 변수 Y의 원소 순서는 변경되지 않는다.

28. np.append(X,Y)
X의 원소 뒤에 Y의 원소를 이어 붙여 새로운 NumPy 배열을 생성한다.

X=[2,4,8,16]
Y=[7,3,-4,2,9,-1]

이므로 출력 결과는
[ 2  4  8 16  7  3 -4  2  9 -1]
이다.
          `,
        },
        { //문제 1.C
          id: '1-1C',
          type: 'console',
          title: '1.C.',
          prompt:`행렬(다차원 Array) 변수 연산\n아래 명령을 순서대로 실행하고 Console 결과를 확인하시오. 각 명령이 수행하는 동작과 출력 결과의 의미를 작성하고, 만약 오류 메시지가 출력되면 그 오류의 의미를 작성하시오.
\`\`\`python
1. import numpy as np\t\t\t\t\t14. np.conjugate(Z.T)
2. X=np.array([[3,6,-2],[0,5,2],[7,-1,4]]);print(X)\t15. Z=X*Y; print(Z)
3. X.shape\t\t\t\t\t\t16. Z=X@Y; print(Z)
4. Z=X[2,1]; print(Z)\t\t\t\t\t17. Z=X**3; print(Z)
5. X[:,2]\t\t\t\t\t\t18. Z=X[2,1]; print(Z)
6. X[:2,:]\t\t\t\t\t\t19. Z=(X**2)-3*Y; print(Z)
7. X[0:2,1:3]\t\t\t\t\t\t20. Z.max()
8. Y=np.zeros((3,3)); print(Y)\t\t\t\t21. Z.argmax()
9. Y[0,:]=X[1,:]; print(Y)\t\t\t\t22. Z.max(axis=0)
10. Y[1,:]=X[0,:]; print(Y)\t\t\t\t23. Z.min(axis=1)
11. Y[2,:]=[1,2,3]; print(Y)\t\t\t\t24. Z=np.linalg.det(X); print(Z)
12. Z=X+1j*Y; print(Z)\t\t\t\t\t25. Z=np.linalg.inv(X); print(Z)
13. Z.T\t\t\t\t\t\t\t26. Z@X #결과가 왜 그렇게 나왔는지 쓸 것. 수치 오차가 존재함을 감안할 것.
\`\`\`
            `,
          referenceAnswer: `
1. import numpy as np  
NumPy 패키지를 np라는 이름으로 불러온다.

2. X=np.array([[3,6,-2],[0,5,2],[7,-1,4]]); print(X)  
3×3 NumPy 배열 X를 생성하고 출력한다.

3. X.shape  
X의 크기를 확인한다. 출력 결과는 (3, 3)이다.

4. Z=X[2,1]; print(Z)  
X의 세 번째 행, 두 번째 열의 원소를 선택한다. Python의 인덱스는 0부터 시작하므로 출력 결과는 -1이다.

5. X[:,2]  
X의 모든 행에서 세 번째 열을 선택한다. 출력 결과는 [-2, 2, 4]이다.

6. X[:2,:]  
X의 첫 번째와 두 번째 행 전체를 선택한다.

7. X[0:2,1:3]  
X의 첫 번째~두 번째 행과 두 번째~세 번째 열을 선택한다.

8. Y=np.zeros((3,3)); print(Y)  
모든 원소가 0인 3×3 배열 Y를 생성한다.

9. Y[0,:]=X[1,:]; print(Y)  
Y의 첫 번째 행에 X의 두 번째 행을 대입한다.

10. Y[1,:]=X[0,:]; print(Y)  
Y의 두 번째 행에 X의 첫 번째 행을 대입한다.

11. Y[2,:]=[1,2,3]; print(Y)  
Y의 세 번째 행에 [1,2,3]을 대입한다.

12. Z=X+1j*Y; print(Z)  
X를 실수부, Y를 허수부로 갖는 복소 배열 Z를 생성한다.

13. Z.T  
Z의 전치행렬을 구한다.

14. np.conjugate(Z.T)  
Z의 전치행렬에 켤레복소수를 취한다. 즉, Z의 Hermitian transpose를 구한다.

15. Z=X*Y; print(Z)  
X와 Y의 같은 위치에 있는 원소끼리 곱한다. *는 행렬곱이 아니라 원소별 곱이다.

16. Z=X@Y; print(Z)  
X와 Y의 행렬곱을 수행한다. @는 행렬곱 연산자이다.

17. Z=X**3; print(Z)  
X의 각 원소를 세제곱한다. 행렬 자체를 세 번 곱하는 연산은 아니다.

18. Z=X[2,1]; print(Z)  
X의 세 번째 행, 두 번째 열의 원소를 선택한다. 출력 결과는 -1이다.

19. Z=(X**2)-3*Y; print(Z)  
X의 각 원소를 제곱한 뒤, 같은 위치의 3Y를 뺀 배열 Z를 생성한다.

20. Z.max()  
Z의 모든 원소 중 최댓값을 구한다. 출력 결과는 46이다.

21. Z.argmax()  
Z를 1차원으로 펼쳤을 때 최댓값이 위치한 인덱스를 구한다. 출력 결과는 6이다.

22. Z.max(axis=0)  
Z의 각 열별 최댓값을 구한다. 출력 결과는 [46, 21, 10]이다.

23. Z.min(axis=1)  
Z의 각 행별 최솟값을 구한다. 출력 결과는 [-2, -9, -5]이다.

24. Z=np.linalg.det(X); print(Z)  
X의 determinant를 계산한다. 이론적인 값은 220이며, 부동소수점 연산으로 인해 219.9999999999999처럼 출력될 수 있다.

25. Z=np.linalg.inv(X); print(Z)  
X의 역행렬을 계산한다.

26. Z@X  
25번에서 Z는 X의 역행렬이므로 Z@X는 단위행렬이 되어야 한다. 실제 출력에서는 0이어야 할 원소가 약 $10^{-16}$ 또는 $10^{-17}$ 수준의 매우 작은 값으로 나타날 수 있는데, 이는 부동소수점 연산에 의한 수치 오차이다.
`,
        },
        { //문제 1.D
          id: '1-1D',
          type: 'console',
          title: '1.D.',
          prompt:
            `랜덤(Random) 변수 연산\n아래 명령을 순서대로 실행하고 Console 결과를 확인하시오. 각 명령이 수행하는 동작과 출력 결과의 의미를 작성하고, 만약 오류 메시지가 출력되면 그 오류의 의미를 작성하시오.
특히 2~9번, 25~27번은 반복 실행하여 명령어의 의미를 유추하여 쓰시오.
\`\`\`python
1. import numpy as np\t\t\t\t\t16. N=np.random.randn(1000000)+3; print(N)
2. np.random.rand()\t\t\t\t\t17. np.mean(N) #이론치에 근사하는지도 쓸 것
3. 6*np.random.rand()\t\t\t\t\t18. np.var(N) #이론치에 근사하는지도 쓸 것
4. np.random.rand()+2\t\t\t\t\t19. N=np.random.randn(10,5)
5. np.random.rand(1,5)\t\t\t\t\t20. N.max()
6. 6*np.random.rand(3,4)+2\t\t\t\t21. np.max(N,axis=0)
7. np.random.rand(4)\t\t\t\t\t22. np.max(N,axis=1)
8. np.random.randn()\t\t\t\t\t23. max(np.max(N,axis=0))
9. np.random.randn(10)\t\t\t\t\t24. max(np.min(N,axis=0))
10. N=np.random.randn(10000000); print(N)\t\t25. np.random.randint(5)
11. np.mean(N) #이론치에 근사하는지도 쓸 것\t\t26. np.random.randint(-5,-3)
12. np.var(N) #이론치에 근사하는지도 쓸 것\t\t27. np.random.randint(1,5,10)
13. N=np.sqrt(5)*np.random.randn(10000000) 
14. np.mean(N) #이론치에 근사하는지도 쓸 것 
15. np.var(N) #이론치에 근사하는지도 쓸 것
\`\`\`            
            `,
          referenceAnswer: `
1. import numpy as np  
NumPy 패키지를 np라는 이름으로 불러온다.

2. np.random.rand()  
0 이상 1 미만의 균등분포에서 하나의 난수를 생성한다. 반복 실행할 때마다 다른 값이 출력된다.

3. 6*np.random.rand()  
0 이상 6 미만의 균등분포에서 하나의 난수를 생성한다.

4. np.random.rand()+2  
2 이상 3 미만의 균등분포에서 하나의 난수를 생성한다.

5. np.random.rand(1,5)  
0 이상 1 미만의 균등분포 난수로 구성된 1×5 배열을 생성한다.

6. 6*np.random.rand(3,4)+2  
2 이상 8 미만의 균등분포 난수로 구성된 3×4 배열을 생성한다.

7. np.random.rand(4)  
0 이상 1 미만의 균등분포 난수 4개로 구성된 1차원 배열을 생성한다.

8. np.random.randn()  
평균이 0이고 분산이 1인 표준 가우시안 분포에서 하나의 난수를 생성한다. 양수와 음수가 모두 나타날 수 있다.

9. np.random.randn(10)  
평균이 0이고 분산이 1인 표준 가우시안 분포에서 난수 10개를 생성한다.

10. N=np.random.randn(10000000); print(N)  
평균 0, 분산 1인 표준 가우시안 난수 10,000,000개를 생성하여 N에 저장한다. 출력되는 값들은 실행할 때마다 달라진다.

11. np.mean(N)  
N의 표본 평균을 계산한다. 표본 수가 매우 크므로 이론적인 평균 0에 가까운 값이 나온다.

12. np.var(N)  
N의 표본 분산을 계산한다. 표본 수가 매우 크므로 이론적인 분산 1에 가까운 값이 나온다.

13. N=np.sqrt(5)*np.random.randn(10000000)  
표준 가우시안 난수에 $\\sqrt{5}$를 곱한다. 따라서 N은 평균 0, 분산 5인 가우시안 분포를 따른다.

14. np.mean(N)  
N의 표본 평균을 계산한다. 이론적인 평균 0에 가까운 값이 나온다.

15. np.var(N)  
N의 표본 분산을 계산한다. 이론적인 분산 5에 가까운 값이 나온다.

16. N=np.random.randn(1000000)+3; print(N)  
표준 가우시안 난수에 3을 더하므로 평균 3, 분산 1인 가우시안 난수 1,000,000개를 생성한다.

17. np.mean(N)  
N의 표본 평균을 계산한다. 표본 수가 크므로 이론적인 평균 3에 가까운 값이 나온다.

18. np.var(N)  
N의 표본 분산을 계산한다. 이론적인 분산 1에 가까운 값이 나온다.

19. N=np.random.randn(10,5)  
평균 0, 분산 1인 표준 가우시안 난수로 구성된 10×5 배열을 생성한다.

20. N.max()  
N의 모든 원소 중 가장 큰 값을 구한다. 난수로 생성된 배열이므로 실행할 때마다 결과가 달라진다.

21. np.max(N,axis=0)  
각 열별 최댓값을 구한다. N이 10×5 배열이므로 5개의 값이 출력된다.

22. np.max(N,axis=1)  
각 행별 최댓값을 구한다. N이 10×5 배열이므로 10개의 값이 출력된다.

23. max(np.max(N,axis=0))  
먼저 각 열별 최댓값을 구한 뒤 그중 가장 큰 값을 구한다. 결과적으로 N 전체의 최댓값과 같다.

24. max(np.min(N,axis=0))  
각 열별 최솟값을 구한 뒤, 그 최솟값들 중 가장 큰 값을 구한다.

25. np.random.randint(5)  
0 이상 5 미만의 정수 중 하나를 무작위로 생성한다. 따라서 0, 1, 2, 3, 4 중 하나가 출력된다.

26. np.random.randint(-5,-3)  
-5 이상 -3 미만의 정수 중 하나를 무작위로 생성한다. 따라서 -5 또는 -4가 출력된다.

27. np.random.randint(1,5,10)  
1 이상 5 미만의 정수 난수 10개를 생성한다. 따라서 각 원소는 1, 2, 3, 4 중 하나이다.

2~9번과 25~27번은 난수를 생성하는 명령이므로 반복 실행할 때마다 출력값이 달라질 수 있다. 다만 각 명령에서 지정한 범위, 분포 및 배열의 크기는 유지된다.
`,
        },
        { //문제 1.E
          id: '1-1E',
          type: 'console',
          title: '1.E.',
          prompt:
            `기본적인 NumPy 수학 함수와 Matplotlib 그래프 그리기\n아래 명령을 순서대로 실행하고 Console 결과 및 Figure의 변화를 확인하시오. 각 명령이 수행하는 동작과 출력 결과 또는 그래프의 의미를 작성하시오.
(주의. Figure를 초기 상태로 되돌리려면 브라우저를 새로고침한 후 다시 실행하시오.),
\`\`\`python
1. import numpy as np\t\t\t\t\t15. plt.axis([-5,15,-3,3])
2. import matplotlib.pyplot as plt\t\t\t16. plt.axis([0,10,-2,2])
3. x=np.arange(0,10,0.1)\t\t\t\t17. plt.figure()
4. y1=np.sin(x)\t\t\t\t\t\t18. plt.subplot(3,1,1)
5. y2=np.cos(x)\t\t\t\t\t\t19. plt.plot(x,y1)
6. plt.plot(x)\t\t\t\t\t\t20. plt.subplot(3,1,2)
7. plt.plot(y1)\t\t\t\t\t\t21. plt.plot(x,y2)
8. plt.figure()\t\t\t\t\t\t22. plt.subplot(3,1,3)
9. plt.plot(x,y1,label='sin(x)')\t\t\t23. plt.plot(x,y3)
10. plt.grid()\t\t\t\t\t\t24. plt.figure()
11. plt.plot(x,y2,label='cos(x)')\t\t\t25. plt.semilogy(x,y3)
12. y3=np.exp(-x)
13. plt.plot(x,y3,'r',label='exp(-x)')
14. plt.legend()
\`\`\`
            `,
          referenceAnswer: `
1. import numpy as np  
NumPy 패키지를 np라는 이름으로 불러온다.

2. import matplotlib.pyplot as plt  
Matplotlib의 pyplot 모듈을 plt라는 이름으로 불러온다.

3. x=np.arange(0,10,0.1)  
0 이상 10 미만의 값을 0.1 간격으로 생성하여 x에 저장한다.

4. y1=np.sin(x)  
x의 각 원소에 대해 사인 값을 계산하여 y1에 저장한다.

5. y2=np.cos(x)  
x의 각 원소에 대해 코사인 값을 계산하여 y2에 저장한다.

6. plt.plot(x)  
x의 원소 값을 세로축 값으로 하여 그래프를 그린다. 가로축에는 배열의 인덱스가 사용된다.

7. plt.plot(y1)  
y1의 원소 값을 세로축 값으로 하여 그래프를 그린다. 가로축에는 배열의 인덱스가 사용된다.

8. plt.figure()  
새로운 Figure를 생성한다. 이후의 그래프는 새 Figure에 그려진다.

9. plt.plot(x,y1,label='sin(x)')  
x를 가로축, y1을 세로축으로 하여 sin(x) 그래프를 그리고, 범례에 사용할 이름을 'sin(x)'로 지정한다.

10. plt.grid()  
현재 Figure에 격자선을 표시한다.

11. plt.plot(x,y2,label='cos(x)')  
현재 Figure에 cos(x) 그래프를 추가하고, 범례 이름을 'cos(x)'로 지정한다.

12. y3=np.exp(-x)  
$x$의 각 원소에 대해 $e^{-x}$를 계산하여 y3에 저장한다.

13. plt.plot(x,y3,'r',label='exp(-x)')  
현재 Figure에 $e^{-x}$ 그래프를 빨간색으로 추가하고, 범례 이름을 'exp(-x)'로 지정한다.

14. plt.legend()  
각 그래프에 지정된 label을 이용하여 범례를 표시한다.

15. plt.axis([-5,15,-3,3])  
가로축 범위를 -5에서 15, 세로축 범위를 -3에서 3으로 설정한다.

16. plt.axis([0,10,-2,2])  
가로축 범위를 0에서 10, 세로축 범위를 -2에서 2로 다시 설정한다. 따라서 현재 Figure의 표시 범위가 변경된다.

17. plt.figure()  
새로운 Figure를 생성한다.

18. plt.subplot(3,1,1)  
현재 Figure를 3행 1열의 영역으로 나누고 첫 번째 영역을 선택한다.

19. plt.plot(x,y1)  
첫 번째 subplot에 sin(x) 그래프를 그린다.

20. plt.subplot(3,1,2)  
두 번째 subplot 영역을 선택한다.

21. plt.plot(x,y2)  
두 번째 subplot에 cos(x) 그래프를 그린다.

22. plt.subplot(3,1,3)  
세 번째 subplot 영역을 선택한다.

23. plt.plot(x,y3)  
세 번째 subplot에 $e^{-x}$ 그래프를 그린다.

24. plt.figure()  
새로운 Figure를 생성한다.

25. plt.semilogy(x,y3)  
x축은 선형 스케일, y축은 로그 스케일로 하여 y3를 그린다.
y3=exp(-x)이므로 일반적인 plot에서는 지수적으로 감소하는 곡선으로 보이지만,
semilogy에서는 y축에 로그 스케일이 적용되어 직선 형태로 나타난다.
`,
        },
        { //문제 1.F
          id: '1-1F',
          type: 'console',
          title: '1.F.',
          prompt:
            `불(Bool) 연산과 그래프 그리기\n아래 명령을 순서대로 실행하고 Console 결과 및 Figure의 변화를 확인하시오. 각 명령이 수행하는 동작과 출력 결과 또는 그래프의 의미를 작성하시오.
\`\`\`python
1. import numpy as np\t\t\t\t\t11. np.array([1,0,1,1,1])==np.array([1,0,1,0,0])
2. import matplotlib.pyplot as plt\t\t\t12. np.array([1,0,1,1,1])!=np.array([1,0,1,0,0])
3. A=np.array([0,1,2,3,4])\t\t\t\t13. x=np.arange(0,10,0.1)
4. A<3\t\t\t\t\t\t\t14. y=x<3
5. B=(A>2); print(B)\t\t\t\t\t15. plt.plot(x,y);plt.axis([0,10,-2,2]);plt.grid()
6. B=np.where(A>2,1,0); print(B)\t\t\t16. y=(1<x)&(x<4)
7. np.logical_and([1,1,0,0],[1,1,1,0])\t\t\t17. plt.plot(x,y);plt.axis([0,10,-2,2])
8. np.logical_or([1,1,0,0],[1,1,1,0]) 
9. np.logical_xor([1,1,0,0],[1,1,1,0])
10. np.logical_not([1,0,1,0,0])
\`\`\`        
            `,
          referenceAnswer:`
1. import numpy as np  
NumPy 패키지를 np라는 이름으로 불러온다.

2. import matplotlib.pyplot as plt  
Matplotlib의 pyplot 모듈을 plt라는 이름으로 불러온다.

3. A=np.array([0,1,2,3,4])  
원소가 0, 1, 2, 3, 4인 NumPy 배열 A를 생성한다.

4. A<3  
A의 각 원소가 3보다 작은지 비교한다. 출력 결과는 [True, True, True, False, False]이다.

5. B=(A>2); print(B)  
A의 각 원소가 2보다 큰지 비교한 Bool 배열을 B에 저장한다. 출력 결과는 [False, False, False, True, True]이다.

6. B=np.where(A>2,1,0); print(B)  
A의 원소가 2보다 크면 1, 그렇지 않으면 0을 선택한다. 출력 결과는 [0, 0, 0, 1, 1]이다.

7. np.logical_and([1,1,0,0],[1,1,1,0])  
두 배열의 대응하는 원소에 논리 AND 연산을 수행한다. 출력 결과는 [True, True, False, False]이다.

8. np.logical_or([1,1,0,0],[1,1,1,0])  
두 배열의 대응하는 원소에 논리 OR 연산을 수행한다. 출력 결과는 [True, True, True, False]이다.

9. np.logical_xor([1,1,0,0],[1,1,1,0])  
두 배열의 대응하는 원소에 논리 XOR 연산을 수행한다. 두 값이 서로 다를 때 True가 되며, 출력 결과는 [False, False, True, False]이다.

10. np.logical_not([1,0,1,0,0])  
각 원소에 논리 NOT 연산을 수행한다. 1은 False, 0은 True로 변환되어 출력 결과는 [False, True, False, True, True]이다.

11. np.array([1,0,1,1,1])==np.array([1,0,1,0,0])  
두 배열의 대응하는 원소가 같은지 비교한다. 출력 결과는 [True, True, True, False, False]이다.

12. np.array([1,0,1,1,1])!=np.array([1,0,1,0,0])  
두 배열의 대응하는 원소가 서로 다른지 비교한다. 출력 결과는 [False, False, False, True, True]이다.

13. x=np.arange(0,10,0.1)  
0 이상 10 미만의 값을 0.1 간격으로 생성하여 x에 저장한다.

14. y=x<3  
x의 각 원소가 3보다 작은지 비교하여 Bool 배열 y를 생성한다. $x<3$인 구간에서는 True이고, $x\\geq3$인 구간에서는 False이다.

15. plt.plot(x,y);plt.axis([0,10,-2,2]);plt.grid()  
x에 따른 y의 값을 그래프로 그리고 축 범위를 설정한 뒤 격자선을 표시한다. 그래프에서 True는 1, False는 0으로 표현되므로 $0\\leq x<3$에서는 1, $x\\geq3$에서는 0으로 나타난다.

16. y=(1<x)&(x<4)  
두 조건을 원소별 AND 연산으로 결합한다. 따라서 $1<x<4$인 경우에만 True이고 나머지는 False이다.

17. plt.plot(x,y);plt.axis([0,10,-2,2])  
16번에서 생성한 Bool 배열 y를 그래프로 추가한다. True는 1, False는 0으로 표현되므로 $1<x<4$ 구간에서는 1, 그 외의 구간에서는 0으로 나타난다.
`,
        },
      ],
    },
    { //문제 2
      id: '1-2',
      title: '2. Python 스크립트 만들고 사용하기',
      problems: [
        {
          id: '1-2A',
          type: 'python',
          title: '2.A.',
          prompt: `앞의 과정까지는 Console 창에서 명령어(또는 기본 함수)를 한 문장씩 직접 수행하여 결과를 확인했다. 그러나 Console 창에서는, 일련의 명령어들로 이루어진 알고리듬을 작성하여 수행하기는 어렵다. 그래서, Python 스크립트(이하 'py 스크립트')를 작성하는 방법을 사용한다. 즉, 사용자가 수행하고자 하는 기능(알고리듬)을 달성하도록 명령어들을 작성한다.

아래는 $a=0.1, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8$인 경우에 대하여, 함수 $y=x\\sin(ax) (0<x<20)$를 하나의 그래프에 겹쳐 그리는 Python 스크립트이다.           
\`\`\`python  
import numpy as np
import matplotlib.pyplot as plt

x = np.arange(1,20,0.1)
y = np.zeros((len(x),8))

for n in range(1,9):
  a = n/10 #for 문 내부의 모든 문장은 for 문 라인보다 들여쓰기 및 정렬해야 함
  if (a==0.2):
    a=0.25 #if 문 내부의 모든 문장은 if 문 라인보다 들여쓰기 및 정렬해야 함
  y[:,n-1] = x*np.sin(a*x)
  
plt.plot(x,y)
plt.xlabel('x')
plt.ylabel('y=x sin(ax)')
plt.legend(['a=0.1','a=0.25','a=0.3','a=0.4','a=0.5','a=0.6','a=0.7','a=0.8'])
plt.grid()
\`\`\`
          `
        },
        { //문제 2.A1
          id: '1-2A1',
          type: 'python',
          title: '2.A1.',
          prompt: `Python 스크립트의 모든 라인에 대해 다음의 지침에 따라 주석(Comment)을 작성하시오.

(지침 1) '='이 있는 라인
  - '=' 왼쪽 변수의 목적(용도)을 설명하시오.
  - '=' 오른쪽 수식이 왜 해당 변수의 의미에 부합하는지 설명하시오.
(지침 2) '='이 없는 라인
  - 명령어의 기능을 설명하시오.
  - 왜 해당 명령을 수행하는지 설명하시오.
  
이후, '코드 실행' 버튼을 눌러 py 스크립트를 실행하고, 결과 그래프가 문제 의도에 맞게 출력되었는지 확인하시오.
  `,
          starterCode: `import numpy as np
import matplotlib.pyplot as plt

x = np.arange(1,20,0.1)
y = np.zeros((len(x),8))

for n in range(1,9):
  a = n/10 #for 문 내부의 모든 문장은 for 문 라인보다 들여쓰기 및 정렬해야 함
  if (a==0.2):
    a=0.25 #if 문 내부의 모든 문장은 if 문 라인보다 들여쓰기 및 정렬해야 함
  y[:,n-1] = x*np.sin(a*x)
  
plt.plot(x,y)
plt.xlabel('x')
plt.ylabel('y=x sin(ax)')
plt.legend(['a=0.1','a=0.25','a=0.3','a=0.4','a=0.5','a=0.6','a=0.7','a=0.8'])
plt.grid()`,
          referenceAnswer: `
\`\`\`python
# NumPy를 np라는 이름으로 불러온다.
# 배열 생성과 수치 계산을 위해 사용한다.
import numpy as np

# matplotlib.pyplot을 plt라는 이름으로 불러온다.
# 계산한 함수의 그래프를 그리기 위해 사용한다.
import matplotlib.pyplot as plt

# x는 함수값을 계산할 독립변수의 샘플을 저장한다.
# 1 이상 20 미만의 값을 0.1 간격으로 생성한다.
x = np.arange(1, 20, 0.1)

# y는 8개의 a 값에 대한 함수값을 열별로 저장한다.
# x의 샘플 수만큼 행을 갖는 8열 배열을 0으로 초기화한다.
y = np.zeros((len(x), 8))

# n을 1부터 8까지 변화시키며 8개의 함수값을 계산한다.
for n in range(1, 9):

    # a는 현재 사용할 사인 함수의 계수를 저장한다.
    # n/10으로 0.1부터 0.8까지의 값을 만든다.
    a = n / 10

    # 문제에서 0.2 대신 0.25를 사용하므로 a가 0.2인지 확인한다.
    if a == 0.2:

        # a를 문제에서 요구한 계수 0.25로 변경한다.
        a = 0.25

    # y의 n-1번째 열은 현재 a에 대한 y=x*sin(ax)의 값을 저장한다.
    # x의 각 원소에 대해 x*sin(ax)를 계산한다.
    y[:, n - 1] = x * np.sin(a * x)

# x를 가로축, y의 각 열을 세로축으로 하여 8개의 곡선을 겹쳐 그린다.
plt.plot(x, y)

# 가로축이 독립변수 x임을 나타내기 위해 축 이름을 표시한다.
plt.xlabel('x')

# 세로축이 함수 y=x*sin(ax)의 값임을 나타내기 위해 축 이름을 표시한다.
plt.ylabel('y = x sin(ax)')

# 각 곡선에 해당하는 a 값을 구분할 수 있도록 범례를 표시한다.
plt.legend(['a=0.1','a=0.25','a=0.3','a=0.4','a=0.5','a=0.6','a=0.7','a=0.8'])

# 그래프의 값을 쉽게 확인하고 비교할 수 있도록 격자선을 표시한다.
plt.grid()

# 완성된 Figure를 화면에 표시한다.
plt.show()
\`\`\`
코드를 실행하면 $a=0.1, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8$에 대한 $y=x\\sin(ax)$의 8개 곡선이 하나의 Figure에 겹쳐 표시된다.

가로축은 $x$, 세로축은 $y=x\\sin(ax)$이며, 각 곡선의 $a$ 값을 나타내는 범례와 격자선이 함께 표시되어야 한다. 이와 같이 출력되었다면 문제 의도에 맞게 정상 실행된 것이다.
`,
        },
        {
          id: '1-2A2',
          type: 'python',
          title: '2.A2.',
          "consoleEnabled": true,
          prompt: `코드 실행 후, Console에서 아래를 실행하고, 결과의 의미를 쓰시오.
\`\`\`python
>>> x
>>> y
\`\`\`
          `,
          starterCode: `import numpy as np
import matplotlib.pyplot as plt

x = np.arange(1,20,0.1)
y = np.zeros((len(x),8))

for n in range(1,9):
  a = n/10 #for 문 내부의 모든 문장은 for 문 라인보다 들여쓰기 및 정렬해야 함
  if (a==0.2):
    a=0.25 #if 문 내부의 모든 문장은 if 문 라인보다 들여쓰기 및 정렬해야 함
  y[:,n-1] = x*np.sin(a*x)
  
plt.plot(x,y)
plt.xlabel('x')
plt.ylabel('y=x sin(ax)')
plt.legend(['a=0.1','a=0.25','a=0.3','a=0.4','a=0.5','a=0.6','a=0.7','a=0.8'])
plt.grid()`,
          referenceAnswer: `\`x\`는 1 이상 20 미만의 값을 0.1 간격으로 저장한 1차원 배열이다.
\`y\`는 $a=0.1, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8$에 대해 계산한 $y=x\\sin(ax)$의 함수값을 저장한 2차원 배열이다.
\`y\`의 각 열은 하나의 $a$ 값에 대한 함수값을 나타내며, 각 행은 하나의 $x$ 값에서 계산된 8개의 함수값을 나타낸다. 따라서 \`y\`의 크기는 190×8이다.
`
        },
        {
          id: '1-2B',
          type: 'python',
          title: '2.B.',
          prompt: `문제 2.A에서 작성한 py 스크립트를 참고하여 10개의 사인 파형을 그리는 파일을 작성해보자.
          
주파수가 각각 $1, 2, 3, ..., 10\\text{ Hz}$인 사인 파형들이 있다. 이 중, 가장 작은 주기(가장 큰 주파수)를 갖는 사인 파형의 주기 $T$를 먼저 계산하여 보이고, $-2T<t<2T$(그래프에서 시간 축($x$축)의 범위) 구간에서 각 사인 파형을 겹쳐서 그리는 py 스크립트를 작성하시오.
('for'문을 사용하고, 'plt.legend()'를 사용하여 10개의 파형에 범례를 달 것)

코드 실행 후, 결과 그래프가 제대로 나오는지 확인하시오.`,
          referenceAnswer: `
가장 큰 주파수는 $10\\text{ Hz}$이므로 가장 작은 주기 $T$는
$$
T=\\frac{1}{f_{\\max}}
=\\frac{1}{10}
=0.1\\text{ s}
$$
이다. 따라서 그래프의 시간 범위는
$$
-2T<t<2T
$$
즉, $-0.2<t<0.2$이다.

예시 코드는 다음과 같다.
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

T = 1/10
t = np.arange(-2*T, 2*T, 0.001)

for f in range(1, 11):
    y = np.sin(2*np.pi*f*t)
    plt.plot(t, y)

plt.xlabel('t')
plt.ylabel('y')
plt.legend(['f=1Hz','f=2Hz','f=3Hz','f=4Hz','f=5Hz','f=6Hz','f=7Hz','f=8Hz', 'f=9Hz', 'f=10Hz'])
plt.grid()
\`\`\`
코드를 실행하면 주파수가 $1,2,3,\\ldots,10\\text{ Hz}$인 총 10개의 사인 파형이 $-2T<t<2T$ 구간의 하나의 Figure에 겹쳐 표시된다.

주파수가 증가할수록 같은 시간 구간에서 더 많은 진동이 나타나며, $10\\text{ Hz}$ 파형의 주기가 가장 짧은 $T=0.1\\text{ s}$이다.
`
        },
        { //문제 2.C
          id: '1-2C',
          title: '2.C.',
          prompt: `임의의 행렬에서 최댓값을 갖는 행 또는 열을 찾고, 각 행의 평균을 계산하는 py 스크립트를 작성해보자.
          
아래는 함수 'np.random.rand()를 이용하여 $0$에서 $3$ 사이의 임의의 값들을 원소로 하는 9(행)×10(열) 행렬을 생성하고, 함수 'np.max()'와 'np.min()'을 이용하여 가장 큰 원소의 값과 가장 작은 원소의 값을 찾는 py 스크립트이다.
\`\`\`python
import numpy as np

A=3*np.random.rand(9,10)
MAX=np.max(A)
MIN=np.min(A)
MAX_POS=np.unravel_index(A.argmax(), A.shape)
MIN_POS=np.unravel_index(A.argmin(), A.shape)
print(np.array(A))
print("최댓값:{}, 최댓값 위치:{}".format(MAX,MAX_POS))
print("최솟값:{}, 최솟값 위치:{}".format(MIN,MIN_POS))
\`\`\``
        },
        {
          id: '1-2C1',
          type: 'python',
          title: '2.C1.',
          prompt: `모든 라인에 대해 다음의 지침에 따라 주석(Comment)을 작성하시오.

(지침 1) '='이 있는 라인
  - '=' 왼쪽 변수의 목적(용도)을 설명하시오.
  - '=' 오른쪽 수식이 왜 해당 변수의 의미에 부합하는지 설명하시오.
(지침 2) '='이 없는 라인
  - 명령어의 기능을 설명하시오.
  - 왜 해당 명령을 수행하는지 설명하시오.
  
이후, '코드 실행' 버튼을 눌러 py 스크립트를 실행하고, 결과가 문제 의도에 맞게 출력되었는지 확인하시오.
  `,
          starterCode: `import numpy as np

A=3*np.random.rand(9,10)
MAX=np.max(A)
MIN=np.min(A)
MAX_POS=np.unravel_index(A.argmax(), A.shape)
MIN_POS=np.unravel_index(A.argmin(), A.shape)
print(np.array(A))
print("최댓값:{}, 최댓값 위치:{}".format(MAX,MAX_POS))
print("최솟값:{}, 최솟값 위치:{}".format(MIN,MIN_POS))`,
          referenceAnswer: `
예시 주석은 다음과 같다.
\`\`\`python
# NumPy를 np라는 이름으로 불러온다.
# 난수 행렬 생성과 최댓값, 최솟값 등의 계산에 사용한다.
import numpy as np

# A는 9×10 크기의 임의의 값들을 저장하는 행렬이다.
# np.random.rand(9,10)에 3을 곱하여 0 이상 3 미만의 난수로 구성한다.
A=3*np.random.rand(9,10)

# MAX는 A의 전체 원소 중 최댓값을 저장한다.
# np.max(A)는 A에서 가장 큰 원소를 구한다.
MAX=np.max(A)

# MIN은 A의 전체 원소 중 최솟값을 저장한다.
# np.min(A)는 A에서 가장 작은 원소를 구한다.
MIN=np.min(A)

# MAX_POS는 최댓값이 위치한 행과 열의 인덱스를 저장한다.
# argmax()로 얻은 인덱스를 A의 행과 열 위치로 변환한다.
MAX_POS=np.unravel_index(A.argmax(), A.shape)

# MIN_POS는 최솟값이 위치한 행과 열의 인덱스를 저장한다.
# argmin()으로 얻은 인덱스를 A의 행과 열 위치로 변환한다.
MIN_POS=np.unravel_index(A.argmin(), A.shape)

# 생성된 행렬 A를 출력하여 원소들을 확인한다.
print(np.array(A))

# 계산한 최댓값과 그 위치를 확인하기 위해 출력한다.
print("최댓값:{}, 최댓값 위치:{}".format(MAX,MAX_POS))

# 계산한 최솟값과 그 위치를 확인하기 위해 출력한다.
print("최솟값:{}, 최솟값 위치:{}".format(MIN,MIN_POS))
\`\`\`
A가 난수로 생성되므로 실행할 때마다 원소와 최댓값, 최솟값 및 그 위치는 달라진다.
출력된 최댓값과 최솟값의 위치가 실제 A의 해당 원소와 일치하면 문제 의도에 맞게 정상 실행된 것이다.
`
        },
        {
          id: '1-2C2',
          type: 'python',
          title: '2.C2.',
          "consoleEnabled": true,
          prompt: `위에서 생성한 행렬의 각 행의 평균을 취하고 가장 큰 평균을 갖는 행이 몇 번째 행인지, Console 창에서 적절한 명령을 수행하고 결과를 보이시오. (평균을 구하기 위해 함수 ‘np.mean()’을 이용할 것)`,
          starterCode: `import numpy as np

A=3*np.random.rand(9,10)
MAX=np.max(A)
MIN=np.min(A)
MAX_POS=np.unravel_index(A.argmax(), A.shape)
MIN_POS=np.unravel_index(A.argmin(), A.shape)
print(np.array(A))
print("최댓값:{}, 최댓값 위치:{}".format(MAX,MAX_POS))
print("최솟값:{}, 최솟값 위치:{}".format(MIN,MIN_POS))`,
          referenceAnswer: `
예시 명령은 다음과 같다.
\`\`\`python
>>> np.mean(A,axis=1)
>>> np.argmax(np.mean(A,axis=1))+1
\`\`\`
\`np.mean(A,axis=1)\`은 A의 각 행에 있는 10개 원소의 평균을 계산한다. A는 9개의 행을 가지므로 총 9개의 평균값이 출력된다.
\`np.argmax(np.mean(A,axis=1))\`은 이 평균값들 중 가장 큰 값의 인덱스를 구한다. Python의 인덱스는 0부터 시작하므로, 실제 몇 번째 행인지를 나타내기 위해 1을 더한다.

A가 난수 행렬이므로 각 행의 평균과 가장 큰 평균을 갖는 행은 실행할 때마다 달라질 수 있다.
`
        },
        { //문제 2.D
          id: '1-2D',
          title: '2.D.',
          "type": "python",
          prompt: `
아래는 논리연산자를 이용하여 (식 1.1)의 불연속 함수 $y(t)$를 그리는 py 스크립트이다.
$$
y(t)=
\\begin{cases}
\\sin\\left(2\\pi \\times 5t + \\frac{\\pi}{3}\\right),
& 1 \\le t \\le 2 \\\\
0,
& 0 \\le t < 1 \\text{ or } 2 < t \\le 5
\\end{cases}
\\qquad \\text{(식 1.1)}
$$
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

t=np.arange(0,5,0.01)
x=np.logical_and(1<=t,t<=2)
x2=np.sin(2*np.pi*5*t+np.pi/3)
y=x*x2
plt.plot(t,y)
plt.axis([-1,6,-2,2])
\`\`\`
모든 라인에 대해 다음의 지침에 따라 주석(Comment)을 작성하시오.

(지침 1) '='이 있는 라인
  - '=' 왼쪽 변수의 목적(용도)을 설명하시오.
  - '=' 오른쪽 수식이 왜 해당 변수의 의미에 부합하는지 설명하시오.
(지침 2) '='이 없는 라인
  - 명령어의 기능을 설명하시오.
  - 왜 해당 명령을 수행하는지 설명하시오.
  
이후, '코드 실행' 버튼을 눌러 py 스크립트를 실행하고, 결과 그래프가 문제 의도에 맞게 출력되었는지 확인하시오.`,
          starterCode: `import numpy as np
import matplotlib.pyplot as plt

t=np.arange(0,5,0.01)
x=np.logical_and(1<=t,t<=2)
x2=np.sin(2*np.pi*5*t+np.pi/3)
y=x*x2
plt.plot(t,y)
plt.axis([-1,6,-2,2])`,
        referenceAnswer: `
예시 주석은 다음과 같다.
\`\`\`python
# NumPy를 np라는 이름으로 불러온다.
# 배열 연산과 논리연산, 사인 함수 계산에 사용한다.
import numpy as np

# matplotlib.pyplot을 plt라는 이름으로 불러온다.
# 계산한 y(t)의 그래프를 그리기 위해 사용한다.
import matplotlib.pyplot as plt

# t는 함수값을 계산할 시간 샘플을 저장한다.
# 0 이상 5 미만의 값을 0.01 간격으로 생성한다.
t=np.arange(0,5,0.01)

# x는 1<=t<=2인 구간을 나타내는 Bool 배열이다.
# 두 조건을 논리 AND로 결합하므로 해당 구간에서만 True가 된다.
x=np.logical_and(1<=t,t<=2)

# x2는 각 t에서 사인파 값을 저장한다.
# 식 (1.1)의 sin(2*pi*5*t+pi/3)을 계산한다.
x2=np.sin(2*np.pi*5*t+np.pi/3)

# y는 식 (1.1)의 불연속 함수값을 저장한다.
# Bool 배열 x는 계산 시 True=1, False=0으로 사용되므로
# 1<=t<=2에서는 사인파가 남고 그 외 구간에서는 0이 된다.
y=x*x2

# t를 가로축, y를 세로축으로 하여 불연속 함수의 그래프를 그린다.
plt.plot(t,y)

# 그래프를 확인하기 쉽도록 x축과 y축의 표시 범위를 설정한다.
plt.axis([-1,6,-2,2])
\`\`\`
코드를 실행하면 $1\\le t\\le2$ 구간에서는 $\\sin\\left(2\\pi\\times5t+\\frac{\\pi}{3}\\right)$가 나타나고, 그 외 구간에서는 0이 된다. 따라서, (식 1.1)의 불연속 함수가 문제 의도에 맞게 그래프로 출력된다.
`
        },
        { //문제 2.E
          id: '1-2E',
          title: '2.E.',
          "type": "python",
          prompt: `사인(또는 코사인) 함수와 연산자(>, <, = 등)를 이용하여, [그림 1.1]의 $f(t)$를 그리는 py 스크립트를 작성하고, 실행하시오.
          [[image:/images/ch1/figure1_1.png|그림 1.1 주기함수 $f(t)$]]          
          `,
          "referenceAnswer": `
[그림 1.1]의 $f(t)$는 주기가 $1$초이고, 각 주기에서 폭이 $1/2$초인 구간 동안 값이 2인 주기함수이다. $\\cos(2\\pi t)$는 주기가 1초이며, $\\cos(2\\pi t)>0$인 구간이 각 주기의 절반이므로 이를 논리연산에 이용할 수 있다.

예시 코드는 다음과 같다.
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

t = np.arange(-3,3,0.001)
x = np.cos(2*np.pi*t) > 0
f = 2*x

plt.plot(t,f)
plt.xlabel('t(sec)')
plt.ylabel('f(t)')
plt.axis([-3,3,-0.5,2.5])
plt.grid()
\`\`\`
\`x\`는 $\\cos(2\\pi t)>0$인 구간에서 True, 그 외의 구간에서 False가 된다.
Bool 값은 수치 연산에서 True=1, False=0으로 사용되므로
\`\`\`python
f = 2*x
\`\`\`
에 의해 해당 구간에서는 $f(t)=2$, 나머지 구간에서는 $f(t)=0$이 된다.

따라서, 실행 결과는 높이 2, 주기 1초, 펄스 폭 $1/2$초인 [그림 1.1]의 주기함수와 같은 형태가 된다.
`
        },
      ],
    },
    { //문제 3
      id: '1-3',
      title: '3. 사용자 함수(Function) 만들고 사용하기',
      problems: [
        {
          id: '1-3A',
          title: '3.A.',
          "type": "python",
          "consoleEnabled": true,
          prompt: `입력에 대하여, 의도한 동작을 수행하여 출력하는 루틴을 사용자 함수로 만들고, Console 창이나 py 스크립트 안에서 호출하여 사용할 수 있다. 본 문제를 통해 사용자 함수 사용법을 익혀보자.

아래는 Linear scale의 값을 입력받아 dB scale로 출력하는 함수 'lin2dB()'를 만든 것이다.
\`\`\`python          
import numpy as np

def lin2dB(x):
  xdB=10*np.log10(x)
  return xdB
\`\`\`
이 py 스크립트를 실행한 후, Console 창에 아래를 수행한 결과를 확인하시오. 결과가 의도에 맞게 나오는지 설명하시오.
\`\`\`python          
>>> lin2dB(100)
>>> lin2dB([1,2,10,20,1/10])
\`\`\`
          `,
          starterCode: `import numpy as np

def lin2dB(x):
  xdB=10*np.log10(x)
  return xdB`,
          referenceAnswer: `
\`lin2dB(x)\`는 Linear scale의 입력값 $x$를
$$
x_{dB}=10\\log_{10}(x)
$$
를 이용하여 dB scale로 변환하는 사용자 함수이다.

\`lin2dB(100)\`을 실행하면
$$
10\\log_{10}(100)=20
$$
이므로 출력 결과는 20 dB이다.

\`lin2dB([1,2,10,20,1/10])\`을 실행하면 각 원소에 대해 dB 변환이 수행되어 대략
\`\`\`text
[  0.           3.01029996  10.          13.01029996 -10.        ]
\`\`\`
이 출력된다.

즉, 입력값 각각에 $10\\log_{10}(x)$가 적용되므로 함수가 의도한 Linear scale → dB scale 변환을 정상적으로 수행한다.
`
        },
        { //문제 3.B
          id: '1-3B',
          title: '3.B.',
          prompt: `아래는 Gaussian PDF를 만들고 출력하는 함수 'plot_gaussian(m,v)'가 포함된 py 스크립트이다.
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

def plot_gaussian(m,v):
  x=np.arange(-5,5,0.01)
  fx=1/np.sqrt(2*np.pi*v)*np.exp(-(x-m)**2/(2*v))
  plt.plot(x,fx)

plot_gaussian(0,1) #이 라인은 들여쓰기하면 안 됨
\`\`\``
        },
        {
          id: '1-3B1',
          type: 'python',
          title: '3.B1.',
          prompt: `모든 라인에 대해 다음의 지침에 따라 주석(Comment)을 작성하시오.

(지침 1) '='이 있는 라인
  - '=' 왼쪽 변수의 목적(용도)을 설명하시오.
  - '=' 오른쪽 수식이 왜 해당 변수의 의미에 부합하는지 설명하시오.
(지침 2) '='이 없는 라인
  - 명령어의 기능을 설명하시오.
  - 왜 해당 명령을 수행하는지 설명하시오.
  
이후, '코드 실행' 버튼을 눌러 py 스크립트를 실행하고, 결과 그래프가 문제 의도에 맞게 출력되었는지 확인하시오.
  `,
          starterCode: `import numpy as np
import matplotlib.pyplot as plt

def plot_gaussian(m,v):
  x=np.arange(-5,5,0.01)
  fx=1/np.sqrt(2*np.pi*v)*np.exp(-(x-m)**2/(2*v))
  plt.plot(x,fx)

plot_gaussian(0,1) #이 라인은 들여쓰기하면 안 됨`,
          referenceAnswer: `
예시 주석은 다음과 같다.
\`\`\`python
# NumPy를 np라는 이름으로 불러온다.
# 배열 생성과 지수함수 계산에 사용한다.
import numpy as np

# matplotlib.pyplot을 plt라는 이름으로 불러온다.
# Gaussian PDF 그래프를 그리기 위해 사용한다.
import matplotlib.pyplot as plt

# 평균 m과 분산 v를 입력받아 Gaussian PDF를 그리는 사용자 함수를 정의한다.
def plot_gaussian(m,v):

  # x는 PDF를 계산할 가로축 샘플을 저장한다.
  # -5 이상 5 미만의 값을 0.01 간격으로 생성한다.
  x=np.arange(-5,5,0.01)

  # fx는 평균 m, 분산 v인 Gaussian PDF 값을 저장한다.
  # Gaussian PDF 식을 x의 각 원소에 대해 계산한다.
  fx=1/np.sqrt(2*np.pi*v)*np.exp(-(x-m)**2/(2*v))

  # x를 가로축, fx를 세로축으로 하여 Gaussian PDF를 그린다.
  plt.plot(x,fx)

# 평균 0, 분산 1인 Gaussian PDF를 그리기 위해 함수를 호출한다.
plot_gaussian(0,1)
\`\`\`
코드를 실행하면 평균이 0인 위치를 중심으로 좌우 대칭인 Gaussian PDF가 출력된다.
분산이 1이므로 표준편차는 1이며, 그래프는 중심 부근에서 가장 큰 값을 갖고 양쪽으로 감소한다.
`
        },
        {
          id: '1-3B2',
          type: 'python',
          title: '3.B2.',
          prompt: `평균('m')과 분산('v') 값을 임의의 적당한 값으로 변경해 가며 라인 'plot_gaussian(m,v)'를 수정하고 py 스크립트를 실행하시오. 여러 경우에 대해 결과 그래프가 문제 의도에 맞게 출력되는지 확인하시오.
  `,
          starterCode: `import numpy as np
import matplotlib.pyplot as plt

def plot_gaussian(m,v):
  x=np.arange(-5,5,0.01)
  fx=1/np.sqrt(2*np.pi*v)*np.exp(-(x-m)**2/(2*v))
  plt.plot(x,fx)

plot_gaussian(0,1) #이 라인은 들여쓰기하면 안 됨`,
          referenceAnswer: `
예를 들어 다음과 같이 평균과 분산을 변경하여 실행할 수 있다.
\`\`\`python
plot_gaussian(1,1)
plot_gaussian(-1,1)
plot_gaussian(0,0.5)
plot_gaussian(0,2)
\`\`\`
평균 $m$을 변화시키면 Gaussian PDF의 중심 위치가 좌우로 이동한다.
분산 $v$를 크게 하면 그래프가 더 넓게 퍼지고 중심의 높이는 낮아지며, 분산 $v$를 작게 하면 그래프가 중심에 더 좁게 모이고 높이는 커진다.

따라서 서로 다른 $m$과 $v$ 값을 입력했을 때, 각 평균을 중심으로 하고 해당 분산에 따른 폭을 갖는 Gaussian PDF가 출력되면 정상적으로 실행된 것이다.
`
        },
        { //문제 3.C
          id: '1-3C',
          title: '3.C.',
          prompt: `행렬을 입력받아 행렬의 특정 행 또는 열의 위치를 서로 교환하는 함수 'swap(A,row0col1,c,d)'를 만들어보자. 함수 'swap()'은 'row0col1'이 0이면, 행렬 'A'의 '(c+1)'행과 '(d+1)'행을 서로 교환한 행렬을 반환하고, 'row0col1'이 1이면, 행렬 'A'의 '(c+1)'열과 '(d+1)'열을 서로 교환한 행렬을 반환한다. (Python에서 행렬 및 벡터의 인덱스는 1부터 시작하지 않고, 0부터 시작함을 유의)
\`\`\`python
import numpy as np

def swap(A,row0col1,c,d):
  e=A.copy() #원본이 변경되지 않기 위해 반드시 '.copy()'를 붙여야 함에 유의 ('e=A'가 아님)
  if row0col1==0:
    e[d,:]=A[c,:]
    e[?,:]=A[?,:]
  if row0col1==1:
    ??
    ??
  return e
\`\`\``          
        },
        {
          id: '1-3C1',
          type: 'python',
          title: '3.C1.',
          prompt: `위 py 스크립트에서 ?를 채워 함수 'swap(A,row0col1,c,d)'를 완성하고, 모든 라인에 대해 다음의 지침에 따라 주석(Comment)을 작성하시오.

(지침 1) '='이 있는 라인
  - '=' 왼쪽 변수의 목적(용도)을 설명하시오.
  - '=' 오른쪽 수식이 왜 해당 변수의 의미에 부합하는지 설명하시오.
(지침 2) '='이 없는 라인
  - 명령어의 기능을 설명하시오.
  - 왜 해당 명령을 수행하는지 설명하시오.
  `,
          starterCode: `import numpy as np

def swap(A,row0col1,c,d):
  e=A.copy() #원본이 변경되지 않기 위해 반드시 '.copy()'를 붙여야 함에 유의 ('e=A'가 아님)
  if row0col1==0:
    e[d,:]=A[c,:]
    e[?,:]=A[?,:]
  if row0col1==1:
    ??
    ??
  return e`,
          referenceAnswer: `
빈칸을 채운 코드 및 예시 주석은 다음과 같다.
\`\`\`python
# NumPy를 np라는 이름으로 불러온다.
# 배열과 행렬 연산에 사용한다.
import numpy as np

# 행렬 A의 두 행 또는 두 열을 서로 교환하는 사용자 함수를 정의한다.
def swap(A,row0col1,c,d):

  # e는 교환 결과를 저장할 행렬이다.
  # A.copy()를 사용하여 원본 A가 변경되지 않도록 복사한다.
  e=A.copy()

  # row0col1이 0이면 두 행을 서로 교환한다.
  if row0col1==0:

    # e의 d번째 행에 A의 c번째 행을 대입한다.
    e[d,:]=A[c,:]

    # e의 c번째 행에 A의 d번째 행을 대입한다.
    e[c,:]=A[d,:]

  # row0col1이 1이면 두 열을 서로 교환한다.
  if row0col1==1:

    # e의 d번째 열에 A의 c번째 열을 대입한다.
    e[:,d]=A[:,c]

    # e의 c번째 열에 A의 d번째 열을 대입한다.
    e[:,c]=A[:,d]

  # 행 또는 열의 교환이 완료된 행렬 e를 반환한다.
  return e
\`\`\`
따라서 빈칸은 다음과 같다.
\`\`\`python
e[c,:]=A[d,:]

e[:,d]=A[:,c]
e[:,c]=A[:,d]
\`\`\`
Python의 인덱스는 0부터 시작하므로, 행 교환 시 c와 d는 각각 실제 (c+1)번째 행과 (d+1)번째 행을 의미하고, 열 교환 시에도 같은 방식으로 (c+1)번째 열과 (d+1)번째 열을 의미한다.
`      
        },
        {
          id: '1-3C2',
          type: 'python',
          "consoleEnabled": true,
          title: '3.C2.',
          prompt: `문제 3.C1에서 완성한 py 스크립트를 복사해서 붙여넣으시오. py 스크립트를 실행한 후, Console에서 아래 명령어를 실행하여, 본인이 작성한 함수가 제대로 동작하는지 확인하시오.
\`\`\`python
>>> x=np.random.randn(4,5)
>>> y=swap(x,0,1,3)
>>> z=swap(y,1,4,0)
>>> x
>>> y
>>> z
\`\`\`
  `,
          referenceAnswer: `
\`x=np.random.randn(4,5)\`는 평균 0, 분산 1인 가우시안 난수로 구성된 4×5 행렬 x를 생성한다.
\`y=swap(x,0,1,3)\`에서 \`row0col1=0\`이므로 행을 교환한다. 따라서, x의 인덱스 1번 행과 3번 행, 즉 실제 두 번째 행과 네 번째 행이 서로 바뀐 행렬이 y에 저장된다.
\`z=swap(y,1,4,0)\`에서 \`row0col1=1\`이므로 열을 교환한다. 따라서, y의 인덱스 4번 열과 0번 열, 즉 실제 다섯 번째 열과 첫 번째 열이 서로 바뀐 행렬이 z에 저장된다.

\`x\`를 출력하면 처음 생성된 원본 행렬이 나타난다.
\`y\`를 출력하면 x의 두 번째 행과 네 번째 행만 서로 교환되어 있고, 나머지 행은 x와 같아야 한다.
\`z\`를 출력하면 y에서 첫 번째 열과 다섯 번째 열이 추가로 서로 교환되어 있어야 한다.

또한, \`swap()\` 함수에서 \`A.copy()\`를 사용하였으므로 y와 z를 생성한 후에도 원본 행렬 x 자체는 변경되지 않는다.
`
        },
      ]
    },
    { //문제 4
      id: '1-4',
      title: '4. sympy 모듈 사용하기',
      problems: [
        {
          id: '1-4A',
          title: '4.A.',
          "type": "console",
          prompt:
            `Python에서 제공하는 sympy 모듈을 사용하면, 문자를 변수로 취급할 수 있으므로 복잡한 수식 계산이나 수식 정리를 할 수 있다.

Console 창에서 아래 명령어의 모든 라인의 수행 결과를 보이고, 각각의 의미를 쓰시오.
\`\`\`python
1. import sympy as sp
2. a, b, c, x, t = sp.symbols('a b c x t')
3. y=sp.sin(t)
4. sp.diff(y)
5. sp.integrate(y)
6. sp.integrate(y,(t,0,sp.pi))
7. z=sp.integrate(x**2*sp.exp(-x),(x,1,3)); print(z)
8. z.evalf()
9. sp.summation(x**2,(x,1,4))
10. sp.limit(sp.exp(-x),x,sp.oo)
11. T=sp.solve(a*x**2+b*x+c,x); print(T)
12. T2=sp.solve(a*x**2+b*x+c,b); print(T2)
13. T[0].subs([(a,1),(b,2),(c,3)])
14. T[1].subs([(a,1),(b,2),(c,3)])
15. T[0].subs([(a,t),(b,2),(c,3)])
16. T[1].subs([(a,t),(b,2),(c,3)])
\`\`\`   
`,
          referenceAnswer: `
1. import sympy as sp  
SymPy 모듈을 sp라는 이름으로 불러온다. 문자 수식의 미분, 적분, 방정식 계산 등에 사용한다.

2. a, b, c, x, t = sp.symbols('a b c x t')  
a, b, c, x, t를 수치가 아닌 기호 변수(Symbol)로 선언한다.

3. y=sp.sin(t)  
기호 변수 t에 대한 함수 $y=\\sin(t)$를 정의한다.

4. sp.diff(y)  
$y=\\sin(t)$를 t에 대해 미분한다. 출력 결과는
$$
\\cos(t)
$$
이다.

5. sp.integrate(y)  
$y=\\sin(t)$를 t에 대해 부정적분한다. 출력 결과는
$$
-\\cos(t)
$$
이다. 적분상수는 SymPy 결과에 포함되지 않는다.

6. sp.integrate(y,(t,0,sp.pi))  
$\\sin(t)$를 $0$부터 $\\pi$까지 정적분한다. 출력 결과는 2이다.

7. z=sp.integrate(x**2*sp.exp(-x),(x,1,3)); print(z)  
$x^2e^{-x}$를 1부터 3까지 정적분하여 z에 저장한다. 출력 결과는
\`\`\`text
-17*exp(-3) + 5*exp(-1)
\`\`\`
이다.

8. z.evalf()  
z의 정확한 기호 표현을 수치값으로 변환한다. 출력 결과는 약 0.993017이다.

9. sp.summation(x**2,(x,1,4))  
$x^2$을 $x=1$부터 4까지 합한다.
$$
1^2+2^2+3^2+4^2=30
$$
따라서 출력 결과는 30이다.

10. sp.limit(sp.exp(-x),x,sp.oo)  
$x$가 무한대로 갈 때 $e^{-x}$의 극한을 계산한다. 출력 결과는 0이다.

11. T=sp.solve(a*x**2+b*x+c,x); print(T)  
방정식 $ax^2+bx+c=0$을 x에 대해 풀어 두 근을 T에 저장한다.

출력 결과는
$$
\\frac{-b-\\sqrt{b^2-4ac}}{2a},
\\qquad
\\frac{-b+\\sqrt{b^2-4ac}}{2a}
$$
이다.

12. T2=sp.solve(a*x**2+b*x+c,b); print(T2)  
같은 방정식을 b에 대해 풀어 T2에 저장한다. 출력 결과는
$$
b=-ax-\\frac{c}{x}
$$
이다.

13. T[0].subs([(a,1),(b,2),(c,3)])  
첫 번째 근에 $a=1$, $b=2$, $c=3$을 대입한다. 출력 결과는
$$
-1-\\sqrt{2}j
$$
이다.

14. T[1].subs([(a,1),(b,2),(c,3)])  
두 번째 근에 $a=1$, $b=2$, $c=3$을 대입한다. 출력 결과는
$$
-1+\\sqrt{2}j
$$
이다.

15. T[0].subs([(a,t),(b,2),(c,3)])  
첫 번째 근의 a에 t를, b에 2를, c에 3을 대입한다. 출력 결과는
$$
\\frac{-2-\\sqrt{4-12t}}{2t}
$$
이다.

16. T[1].subs([(a,t),(b,2),(c,3)])  
두 번째 근의 a에 t를, b에 2를, c에 3을 대입한다. 출력 결과는
$$
\\frac{-2+\\sqrt{4-12t}}{2t}
$$
이다.
`
        },
        {
          id: '1-4B',
          title: '4.B.',
          prompt:
            `문제 4.A를 참고하여, sympy 모듈로 아래 등식이 성립하는지 판단하시오. Console 창에서 sympy 모듈로 각각을 계산한 코드를 보이시오.`
        },
        {
          id: '1-4B1',
          title: '4.B1.',
          "type": "console",
          prompt:
            `$$
\\int_{-\\infty}^{\\infty} e^{-x^2}\\,dx
=
\\sqrt{\\pi}
\\qquad \\text{(식 1.2)}
$$`,
        referenceAnswer: `
예시 코드는 다음과 같다.
\`\`\`python
import sympy as sp
x = sp.symbols('x')
sp.integrate(sp.exp(-x**2),(x,-sp.oo,sp.oo))
\`\`\`
출력 결과는
$$
\\sqrt{\\pi}
$$
이므로 (식 1.2)는 성립한다.
`
        },
        {
          id: '1-4B2',
          title: '4.B2.',
          "type": "console",
          prompt:
            `$$
\\sum_{r=1}^{\\infty}
\\left(\\frac{1}{3}\\right)^r
=
\\frac{1}{2}
\\qquad \\text{(식 1.3)}
$$`,
         referenceAnswer: `
예시 코드는 다음과 같다.
\`\`\`python
import sympy as sp
r = sp.symbols('r', integer=True, positive=True)
sp.summation((sp.Rational(1,3))**r,(r,1,sp.oo))
\`\`\`
출력 결과는
$$
\\frac{1}{2}
$$
이므로 (식 1.3)은 성립한다.
`
        },
        {
          id: '1-4B3',
          title: '4.B3.',
          "type": "console",
          prompt:
            `$$
\\lim_{x\\to\\infty}
\\left(1+\\frac{1}{x}\\right)^x
=
e
\\qquad \\text{(식 1.4)}
$$`,
          referenceAnswer: `
예시 코드는 다음과 같다.
\`\`\`python
import sympy as sp
x = sp.symbols('x')
sp.limit((1+1/x)**x,x,sp.oo)
\`\`\`
출력 결과는
$$
e
$$
이므로 (식 1.4)는 성립한다.
`
        },
        {
          id: '1-4B4',
          title: '4.B4.',
          "type": "console",
          prompt:
            `$$
c
=
\\int_{1}^{2} \\sin(z)e^{-z}\\,dz
\\qquad \\text{(식 1.5)}
$$
계산 후, 반드시 Console 창에서 'c.evalf()'를 실행하고 결과를 확인하시오. 결과를 얻기위해 'evalf()'를 수행해야 하는 이유도 설명하시오.`,
            referenceAnswer: `
예시 코드는 다음과 같다.
\`\`\`python
import sympy as sp
z = sp.symbols('z')
c = sp.integrate(sp.sin(z)*sp.exp(-z),(z,1,2))
print(c)
c.evalf()
\`\`\`
\`c\`에는 적분 결과가 기호식 형태로 저장되며, 출력 결과는 다음과 같은 형태로 나타난다.
$$
c=
-\\frac{e^{-2}\\sin 2}{2}
-\\frac{e^{-2}\\cos 2}{2}
+\\frac{e^{-1}\\cos 1}{2}
+\\frac{e^{-1}\\sin 1}{2}
$$
\`c.evalf()\`를 실행하면 이를 수치값으로 계산하며,
\`\`\`text
0.220792655592938
\`\`\`
과 같은 결과를 얻는다.
SymPy는 기본적으로 정확한 기호식 형태로 결과를 유지하므로, 소수 형태의 근삿값을 확인하려면 \`evalf()\`를 사용해야 한다.
`
        },
      ]
    },
  ],
} as const satisfies WorkbookChapter;
