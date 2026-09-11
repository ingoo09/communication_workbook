export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import OpenAI from "openai";
import { NextResponse } from "next/server";

function sanitize(s?: string) {
  return String(s ?? "")
    .replace(/\u200b/g, "")
    .trim();
}

function isSupportedImageDataUrl(value: unknown) {
  if (typeof value !== "string") return false;

  return /^data:image\/(png|jpeg|jpg|webp);base64,/i.test(
    value,
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const imageDataUrl = body?.imageDataUrl;
    const problemTitle = sanitize(body?.problemTitle);
    const problemPrompt = sanitize(body?.problemPrompt);

    if (!isSupportedImageDataUrl(imageDataUrl)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "지원되는 증명 이미지가 없습니다. JPG, PNG, WebP 이미지를 사용해 주세요.",
        },
        { status: 400 },
      );
    }

    const client = new OpenAI({
      apiKey: process.env.FACTCHAT_API_KEY || "",
      baseURL:
        "https://factchat-cloud.mindlogic.ai/v1/gateway",
    });

    const recognitionInstruction = `
너는 대학 공학/수학 과목의 손글씨 증명 답안을 정확히 전사하는 인식기다.

[문제 제목]
${problemTitle || "(제목 없음)"}

[문제]
${problemPrompt || "(문제 본문 없음)"}

첨부된 이미지는 학생이 작성한 증명 과정이다.

다음 원칙을 반드시 지켜라.

1. 학생이 실제로 적은 내용을 가능한 한 빠짐없이 전사한다.
2. 수식은 사람이 읽을 수 있는 LaTeX 표기법으로 변환한다.
3. 수식만 있는 경우 억지로 자연어 설명을 추가하지 않는다.
4. 학생이 쓰지 않은 풀이, 정답, 중간 과정은 절대 보충하지 않는다.
5. 알아보기 어려운 부분을 임의로 정답처럼 고치지 않는다.
6. 확실히 읽을 수 없는 부분은 [인식불가]라고 표시한다.
7. 줄바꿈과 증명 단계의 순서를 최대한 유지한다.
8. 출력은 학생 답안의 전사본만 작성한다.
`;

    const response = await client.responses.create({
      model: "gpt-5.6-luna",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: recognitionInstruction,
            },
            {
              type: "input_image",
              image_url: imageDataUrl,
              detail: "high",
            },
          ],
        },
      ],
    });

    const recognizedText = String(
      response.output_text ?? "",
    ).trim();

    if (!recognizedText) {
      return NextResponse.json(
        {
          success: false,
          error: "증명 내용을 인식하지 못했습니다.",
        },
        { status: 422 },
      );
    }

    return NextResponse.json({
      success: true,
      recognizedText,
    });
  } catch (error: any) {
    console.error("Proof recognition failed:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ||
          "증명 필기 인식 중 오류가 발생했습니다.",
      },
      { status: 500 },
    );
  }
}
