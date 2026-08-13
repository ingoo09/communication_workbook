import { NextResponse } from "next/server";

import { chapter as chapter1 } from "@/app/workbook/ch1/ch1";
import { chapter as chapter2 } from "@/app/workbook/ch2/ch2";
import { chapter as chapter14 } from "@/app/workbook/ch14/ch14";
import { countLearningProblems } from "@/lib/workbook/countLearningProblems";

export const dynamic = "force-dynamic";

const AVAILABLE_CHAPTERS = {
  1: chapter1,
  2: chapter2,
  14: chapter14
} as const;

export async function GET() {
  const counts = Object.fromEntries(
    Object.entries(AVAILABLE_CHAPTERS).map(([chapterId, chapter]) => [
      chapterId,
      countLearningProblems(chapter),
    ]),
  );

  return NextResponse.json({ counts });
}
