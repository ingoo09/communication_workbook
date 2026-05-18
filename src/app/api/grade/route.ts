import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function sanitize(s?: string) {
  return String(s ?? '')
    .replace(/\u200b/g, '')
    .trim();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ✅ 현재 page.tsx 구조에 맞춤
    const {
      problemId,
      title,
      prompt,
      referenceSolution,
      userAnswer,
    } = body;

    // 디버깅용 로그
    console.log('채점 요청:', body);

    // 필수값 체크
    if (!prompt || !userAnswer) {
      return NextResponse.json(
        {
          error: '문제 또는 학생 답안이 없습니다.',
        },
        {
          status: 400,
        }
      );
    }

    // 정답이 없는 경우 대비
    const solutionText =
      sanitize(referenceSolution) ||
      '모범답안이 제공되지 않았습니다. 문제 의도 기반으로 채점하세요.';

    const gradingPrompt = `
너는 대학 수준의 한국어 AI 채점기다.

학생의 답안을 평가하라.

[문제 제목]
${sanitize(title)}

[문제]
${sanitize(prompt)}

[모범답안]
${solutionText}

[학생 답안]
${sanitize(userAnswer)}

평가 기준:
1. 핵심 개념 이해 여부
2. 수학적/논리적 정확성
3. 설명의 명확성
4. 문제 요구 충족 여부

반드시 아래 JSON 형식만 출력하라.

{
  "score": 0~100 사이 숫자,
  "feedback": "학생에게 줄 자세한 피드백"
}
`;

    const response = await client.responses.create({
      model: 'gpt-4.1-mini',

      input: gradingPrompt,

      text: {
        format: {
          type: 'json_schema',

          name: 'grading_result',

          schema: {
            type: 'object',

            properties: {
              score: {
                type: 'number',
              },

              feedback: {
                type: 'string',
              },
            },

            required: ['score', 'feedback'],

            additionalProperties: false,
          },
        },
      },
    });

    const result = JSON.parse(response.output_text);

    return NextResponse.json({
      success: true,

      problemId,

      score: result.score,

      feedback: result.feedback,
    });

  } catch (error: any) {
    console.error('AI 채점 오류:', error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'AI 채점 실패',
      },
      {
        status: 500,
      }
    );
  }
}