import type { WorkbookChapter } from "@/types/workbook";

function parseTitle(title: string) {
  const t = (title ?? "").trim();
  const match = t.match(/^(\d+)\.([A-Z])(\d+)?\.?$/);

  if (!match) return null;

  return {
    groupKey: `${match[1]}.${match[2]}`,
    subIndex: match[3] ? Number(match[3]) : null,
  };
}

/**
 * WorkbookPage가 실제 학습 문항을 flatten할 때와 같은 규칙으로 문항 수를 센다.
 *
 * 예:
 * 2.A + 2.A1 + 2.A2가 함께 있으면 2.A는 사전 설명(preface)이므로
 * 실제 학습 문항 수에서는 제외하고 A1, A2만 센다.
 */
export function countLearningProblems(chapter: WorkbookChapter): number {
  let count = 0;

  for (const section of chapter.sections ?? []) {
    const problems = section.problems ?? [];
    const hasChild: Record<string, boolean> = {};

    for (const problem of problems) {
      const info = parseTitle(problem.title);

      if (info && info.subIndex !== null) {
        hasChild[info.groupKey] = true;
      }
    }

    for (const problem of problems) {
      const info = parseTitle(problem.title);

      const isPreface = Boolean(
        info &&
          info.subIndex === null &&
          hasChild[info.groupKey],
      );

      if (!isPreface) {
        count += 1;
      }
    }
  }

  return count;
}
