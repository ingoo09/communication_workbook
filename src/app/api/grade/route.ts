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
- 누락된 항목은 번호와 누락 여부만 알려준다.
- 틀린 답에는 오류 유형과 다시 확인할 개념만 제시한다.
- 모범답안의 문장이나 수치를 그대로 공개하지 않는다.
- 피드백은 힌트 수준으로 제한한다.

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