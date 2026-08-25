export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import OpenAI from 'openai';
import { NextResponse } from 'next/server';

function sanitize(s?: string) {
  return String(s ?? '')
    .replace(/\u200b/g, '')
    .trim();
}

export async function POST(req: Request) {
  try {

    const client = new OpenAI({
      apiKey:
        process.env.FACTCHAT_API_KEY || '',

      baseURL:
        'https://factchat-cloud.mindlogic.ai/v1/gateway',
    });

    const body = await req.json();

    const {
      problemId,
      title,
      prompt,
      referenceSolution,
      userAnswer,
    } = body;

    if (!prompt || !userAnswer) {
      return NextResponse.json(
        {
          error:
            '문제 또는 학생 답안이 없습니다.',
        },
        {
          status: 400,
        }
      );
    }

    const solutionText =
      sanitize(referenceSolution) ||
      '모범답안 없음';

    const gradingPrompt = `
너는 대학 수준의 한국어 AI 채점기다.

[문제 제목]
${sanitize(title)}

[문제]
${sanitize(prompt)}

[모범답안]
${solutionText}

[학생 답안]
${sanitize(userAnswer)}

평가 기준:
1. 핵심 개념 이해
2. 논리적 정확성
3. 설명 명확성

제한 사항:
- 학생이 작성하지 않은 항목의 정답, 출력값, 코드 또는 풀이를 절대 제공하지 않는다.
- 누락된 내용은 누락 여부만 알려준다.
- 틀린 답에는 오류 유형과 다시 확인할 개념만 제시한다.
- 모범답안의 문장이나 수치를 그대로 공개하지 않는다.
- 피드백은 힌트 수준으로 제한한다.

[문제 유형별 채점 원칙]

- 서술형 문제:
  학생의 서술 내용이 문제의 핵심 개념을 충족하는지 평가한다.

- Python 계산 문제:
  코드의 논리와 문제에서 요구한 계산식 또는 결과를 중심으로 평가한다.
  문제에서 특정 빈칸, 변수, 식 또는 일부 코드만 완성하도록 요구했다면
  그 수정 부분의 정확성을 최우선으로 평가한다.

- Python 실행 확인 문제:
  코드가 요구된 기능을 수행하고 실행 오류가 없으면 높은 점수를 부여한다.
  별도의 자연어 설명이 없다는 이유로 감점하지 않는다.

- 그래프 확인 문제:
  정상적으로 Figure가 생성되고 문제에서 요구한 데이터를 사용했다면 높은 점수를 부여한다.
  그래프가 Workbook 화면에 별도로 표시되므로,
  텍스트 출력에 그래프의 수치나 모양이 직접 포함되지 않았다는 이유로 감점하지 않는다.

- 오디오 재생 확인 문제:
  오디오 생성/재생 코드가 올바르고 실행이 정상적으로 완료되었다면 높은 점수를 부여한다.

[Workbook Python 실행 환경 규칙]

이 Workbook의 Python 문제는 일반적인 독립 Python 환경이 아니라
Pyodide 기반 Workbook 실행 환경에서 실행된다.

다음 함수들은 Workbook 실행 환경에서 사전에 정의되어 제공되는 공통 helper 함수다.

- file_load(...)
- sound_load(...)
- sound_play(...)
- signal_play(...)
- spectrum_view(...)

따라서 위 함수가 학생 코드 안에서 별도로 정의되거나 import되지 않았다는 이유로
오류 가능성을 지적하거나 감점하지 않는다.

또한 matplotlib으로 생성된 Figure는 Workbook 화면에 별도로 표시된다.
따라서 텍스트 출력에 그래프 데이터가 직접 포함되어 있지 않다는 이유로 감점하지 않는다.

학생 답안에 "(Figure)"가 포함되어 있거나,
학생 코드가 올바르게 Figure를 생성하도록 작성되어 있다면
그래프 출력 자체는 정상적으로 수행된 것으로 판단한다.

Workbook이 제공하는 helper 함수의 내부 구현,
실행 환경 의존성,
문제에서 학생이 수정하도록 요구하지 않은 starter code 부분을
학생에게 다시 구현하도록 요구하거나 감점하지 않는다.

[부분 완성형 Python 문제 채점 규칙]

starter code가 제공되고 학생이 특정 빈칸, 변수, 식 또는 일부 코드만 완성하는 문제에서는
문제에서 명시적으로 요구한 수정 부분을 최우선으로 채점한다.

학생이 수정하도록 요구받지 않은 starter code의 다른 부분,
Workbook 실행 환경에 의존하는 코드,
helper 함수 정의 여부를 이유로 감점하지 않는다.

예를 들어 문제에서 네 군데 빈칸에 들어갈 변수를 묻는다면,
그 네 변수의 선택과 그 결과 만들어지는 계산식이 올바른지를 핵심 기준으로 평가한다.

[반복 실험형 Python 문제 채점 규칙]

문제에서 N, X, 주파수, 파라미터 등의 값을 여러 가지로 변경하여
각각 실행하고 결과를 확인하도록 요구할 수 있다.

현재 채점기에 전달되는 학생 답안은 채점 시점에 에디터에 남아 있는
마지막 코드와 마지막 실행 결과만을 포함하며,
학생이 이전에 실행했던 코드와 실행 이력은 제공되지 않는다.

따라서 학생 답안에 문제에서 요구한 여러 실험값 중 하나만 보인다는 이유로
다른 실험을 수행하지 않았다고 판단하거나 감점하지 마라.

현재 코드가 요구된 실험을 수행할 수 있는 올바른 구조이고,
문제에서 요구한 값 중 하나로 정상적으로 설정되어 실행되었다면
실행 확인 부분은 정상적으로 수행된 것으로 판단한다.

여러 실험 결과 사이의 비교나 경향 설명이 학습 목표인 경우에는,
그 내용을 별도의 서술형 문제에서 평가한다.
Python 실행 문제 자체에서 이전 실행 결과에 대한 증거를 요구하지 마라.

[실행 결과 평가 규칙]

문제에서 특정 수치, 관찰 결과 또는 실행 결과의 해석을 답으로 요구하는 경우에만
그 실행 결과를 채점의 핵심 요소로 사용한다.

단순히 "코드를 완성하고 실행하여 그래프를 확인하시오"와 같이
실행 확인이 목적인 문제에서는,
올바른 코드가 작성되었고 실행 오류가 없다면
그래프 내용을 자연어로 다시 설명하지 않았다는 이유로 감점하지 않는다.

[개인정보 기반 값 채점 규칙]

문제에서 학번 끝자리, 이름, 개인별 지정값 등
학생 개인 정보에 따라 달라지는 값을 코드에 반영하도록 요구하는 경우,
채점 입력에 해당 학생의 실제 개인 정보가 별도로 제공되지 않았다면
그 값이 실제 개인 정보와 일치하는지 검증하려고 하지 마라.

학생이 문제에서 요구한 위치의 변수나 상수를
유효한 값으로 변경했다면 해당 요구사항을 수행한 것으로 판단한다.

예를 들어 starter code의 X를 자신의 학번 끝자리로 바꾸라고 했고
학생 답안에서 X 대신 0~9 중 하나의 숫자가 사용되었다면,
실제 학번과 대조할 정보가 없는 이상
"학번 끝자리와 일치하는지 확인해야 한다"는 이유로 감점하거나
추가 확인을 요구하지 마라.

단, X가 그대로 남아 있거나,
숫자로 변경되지 않았거나,
문제에서 요구한 위치가 수정되지 않았다면 그 부분은 지적할 수 있다.

[근거 없는 추측 금지]

학생 답안에서 실제로 확인되는 오류만 지적한다.

코드가 올바르게 작성되어 있는데도
"~인지 확인해야 합니다",
"~일 수 있습니다",
"~를 점검하세요"
와 같이 존재 여부가 확인되지 않은 오류를 추측하여 감점하지 마라.

학생 답안만으로 확인할 수 없는 사항은 평가 대상에서 제외한다.
명확한 오류가 존재하지 않으면 잠재적인 오류 가능성을 만들어내지 마라.

[점수 기준]

95~100점:
요구한 기능이 정상적으로 실행되고 핵심 요구사항을 모두 만족함.

80~94점:
정상 실행되며 대부분의 요구사항을 만족하지만 사소한 누락이 있음.

60~79점:
일부 기능은 수행하지만 중요한 요구사항이 누락되거나 결과가 불완전함.

1~59점:
코드는 있으나 핵심 기능 수행에 실패하거나 심각한 오류가 있음.

0점:
답안이 없거나 문제와 무관함.  

다음 형식의 JSON 객체만 반환한다.

{
    "score": number,
    "feedback": string
}
`;

    const response =
    await client.responses.create({

        model:"gpt-5.6-luna",

        input: gradingPrompt,

        text:{
            format:{
                type:"json_object"
            }
        }

    })

let result;

try{

    result = JSON.parse(
        response.output_text
    );

}catch{

    result = {

        score:0,

        feedback:
        "채점 결과를 해석하지 못했습니다."

    };

}

return NextResponse.json({
  success: true,
  problemId,

  score: result.score,
  feedback: result.feedback,
});

  } catch (error: any) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          error?.message || '채점 실패',
      },
      {
        status: 500,
      }
    );
  }
}