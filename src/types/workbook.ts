/** 온라인 교재 문제 유형 */
export type ProblemType = "essay" | "python" | "console";

export type GradingCriterion = {
  id: string;
  label: string;
  description: string;
  weight: number;
};

export type LegacyAnswerFields = {
  answer?: string;
  answer_md?: string;
  solution?: string;
  solution_md?: string;
  solutionText?: string;
  solutionMarkdown?: string;
  explanation?: string;
  explanation_md?: string;
  rationale?: string;
};

export type BaseProblem = LegacyAnswerFields & {
  id: string;
  title: string;
  prompt: string;
  tags?: ReadonlyArray<string>;
  referenceAnswer?: string;
  gradingRubric?: ReadonlyArray<GradingCriterion>;
  code?: string;
  answerType?: "textarea" | "short" | "code";

  /** 이전 수식 증명 데이터와의 임시 호환용. 화면에서는 서술형으로 처리합니다. */
  givenExpressions?: ReadonlyArray<string>;
  proofSteps?: ReadonlyArray<unknown>;
  finalExpression?: string;
};

export type EssayProblem = BaseProblem & {
  type: "essay";
};

export type PythonProblem = BaseProblem & {
  type: "python";
  starterCode?: string;
  resultPrompt?: string;
};

export type ConsoleValidation =
  | { mode: "exact"; expectedOutput: string }
  | { mode: "numeric"; expectedValue: number; tolerance?: number }
  | { mode: "contains"; expectedFragments: ReadonlyArray<string> };

export type ConsoleExerciseItem = {
  id: string;
  command: string;
  prompt?: string;
  referenceExplanation?: string;
  validation?: ConsoleValidation;
};

export type ConsoleProblem = BaseProblem & {
  type: "console";
  setupCode?: string;
  items: ReadonlyArray<ConsoleExerciseItem>;
};


export type TypedWorkbookProblem = EssayProblem | PythonProblem | ConsoleProblem;

export type LegacyWorkbookProblem = BaseProblem & {
  type?: undefined;
};

export type WorkbookProblem = TypedWorkbookProblem | LegacyWorkbookProblem;

export type WorkbookSection = {
  id: string;
  title: string;
  problems: ReadonlyArray<WorkbookProblem>;
};

export type WorkbookChapter = {
  id?: string;
  title: string;
  sections: ReadonlyArray<WorkbookSection>;
};

export function resolveProblemType(problem: WorkbookProblem): ProblemType {
  if (problem.type) return problem.type;
  return problem.answerType === "code" ? "python" : "essay";
}

export const PROBLEM_TYPE_LABEL: Record<ProblemType, string> = {
  essay: "서술형",
  python: "Python 실행형",
  console: "Console 실습형",
};
