import { NextResponse } from "next/server";

import { chapter as chapter1 } from "@/app/workbook/ch1/ch1";
import { chapter as chapter2 } from "@/app/workbook/ch2/ch2";
/*
import { chapter as chapter3 } from "@/app/workbook/ch3/ch3";
import { chapter as chapter4 } from "@/app/workbook/ch4/ch4";
import { chapter as chapter5 } from "@/app/workbook/ch5/ch5";
import { chapter as chapter6 } from "@/app/workbook/ch6/ch6";
import { chapter as chapter7 } from "@/app/workbook/ch7/ch7";
import { chapter as chapter8 } from "@/app/workbook/ch8/ch8";
import { chapter as chapter9 } from "@/app/workbook/ch9/ch9";
import { chapter as chapter10 } from "@/app/workbook/ch10/ch10";
import { chapter as chapter11 } from "@/app/workbook/ch11/ch11";
import { chapter as chapter12 } from "@/app/workbook/ch12/ch12";
import { chapter as chapter13 } from "@/app/workbook/ch13/ch13";
*/
import { chapter as chapter14 } from "@/app/workbook/ch14/ch14";
import { chapter as chapter15 } from "@/app/workbook/ch15/ch15";
import { chapter as chapter16 } from "@/app/workbook/ch16/ch16";
/*
import { chapter as chapter17 } from "@/app/workbook/ch17/ch17";
import { chapter as chapter18 } from "@/app/workbook/ch18/ch18";
import { chapter as chapter19 } from "@/app/workbook/ch19/ch19";
import { chapter as chapter20 } from "@/app/workbook/ch20/ch20";
import { chapter as chapter21 } from "@/app/workbook/ch21/ch21";
import { chapter as chapter22 } from "@/app/workbook/ch22/ch22";
import { chapter as chapter23 } from "@/app/workbook/ch23/ch23";
import { chapter as chapter24 } from "@/app/workbook/ch24/ch24";
import { chapter as chapter25 } from "@/app/workbook/ch25/ch25";
import { chapter as chapter26 } from "@/app/workbook/ch26/ch26";
import { chapter as chapter27 } from "@/app/workbook/ch27/ch27";
import { chapter as chapter28 } from "@/app/workbook/ch28/ch28";
import { chapter as chapter29 } from "@/app/workbook/ch29/ch29";
import { chapter as chapter30 } from "@/app/workbook/ch30/ch30";
*/
import { countLearningProblems } from "@/lib/workbook/countLearningProblems";

export const dynamic = "force-dynamic";

const AVAILABLE_CHAPTERS = {
  1: chapter1,
  2: chapter2,
  /*
  3: chapter3,
  4: chapter4,
  5: chapter5,
  6: chapter6,
  7: chapter7,
  8: chapter8,
  9: chapter9,
  10: chapter10,
  11: chapter11,
  12: chapter12,
  13: chapter13,
  */
  14: chapter14,
  15: chapter15,
  16: chapter16,
  /*
  17: chapter17,
  18: chapter18,
  19: chapter19,
  20: chapter20,
  21: chapter21,
  22: chapter22,
  23: chapter23,
  24: chapter24,
  25: chapter25,
  26: chapter26,
  27: chapter27,
  28: chapter28,
  29: chapter29,
  30: chapter30
  */
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
