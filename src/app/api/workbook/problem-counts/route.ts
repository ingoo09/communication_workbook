import { NextResponse } from "next/server";

import { chapter as chapter1 } from "@/app/workbook/ch1/ch1";
import { chapter as chapter2 } from "@/app/workbook/ch2/ch2";

import { chapter as chapter14 } from "@/app/workbook/ch14/ch14";
import { chapter as chapter15 } from "@/app/workbook/ch15/ch15";
import { chapter as chapter16 } from "@/app/workbook/ch16/ch16";

import { countLearningProblems } from "@/lib/workbook/countLearningProblems";

export const dynamic = "force-dynamic";

const AVAILABLE_CHAPTERS = {
  1: chapter1,
  2: chapter2,

  14: chapter14,
  15: chapter15,
  16: chapter16
  
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
