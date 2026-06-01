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

반드시 JSON만 출력:

{
  "score": 0~100,
  "feedback": "피드백"
}
`;

    const response =
      await client.chat.completions.create({
        model: 'gpt-5-mini',

        messages: [
          {
            role: 'user',
            content: gradingPrompt,
          },
        ],
      });

    const text =
      response.choices?.[0]?.message?.content ||
      '';

    return NextResponse.json({
      success: true,
      problemId,
      raw: text,
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