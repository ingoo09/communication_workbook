import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      question,
      studentAnswer,
      modelAnswer,
    } = body;

    // 입력값 검사
    if (!question || !studentAnswer || !modelAnswer) {
      return NextResponse.json(
        {
          error: '필수 값이 없습니다.',
        },
        {
          status: 400,
        }
      );
    }

    // AI 프롬프트
    const prompt = `
너는 온라인 교재의 한국어 AI 채점 시스템이다.

학생 답안을 평가하라.

[문제]
${question}

[모범답안]
${modelAnswer}

[학생답안]
${studentAnswer}

채점 기준:
- 핵심 개념 포함 여부
- 설명 정확성
- 문장 이해 가능 여부

반드시 아래 JSON 형식만 출력하라.

{
  "score": 0~100 사이 숫자,
  "feedback": "학생에게 줄 피드백"
}
`;

    // OpenAI 호출
    const response = await client.responses.create({
      model: 'gpt-4.1-mini',

      input: prompt,

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

    // JSON 파싱
    const result = JSON.parse(response.output_text);

    // 반환
    return NextResponse.json({
      success: true,
      result,
    });

  } catch (error) {
    console.error('AI 채점 오류:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'AI 채점 중 오류가 발생했습니다.',
      },
      {
        status: 500,
      }
    );
  }
}