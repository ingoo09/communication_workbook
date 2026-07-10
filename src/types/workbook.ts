/**
 * 온라인 교재에서 지원하는 문제 유형입니다.
 *
 * - essay: 일반 서술형
 * - python: Python 코드 작성 및 실행형
 * - console: 명령을 한 줄씩 실행하고 결과를 해석하는 콘솔형
 * - proof: 수식 전개 및 증명형
 */
export type ProblemType = 'essay' | 'python' | 'console' | 'proof';

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

  /** 기존 문제 데이터와의 호환을 위한 필드입니다. */
  code?: string;
  answerType?: 'textarea' | 'short' | 'code';
};

export type EssayProblem = BaseProblem & {
  type: 'essay';
};

export type PythonProblem = BaseProblem & {
  type: 'python';
  starterCode?: string;
  resultPrompt?: string;
};

export type ConsoleValidation =
  | {
      mode: 'exact';
      expectedOutput: string;
    }
  | {
      mode: 'numeric';
      expectedValue: number;
      tolerance?: number;
    }
  | {
      mode: 'contains';
      expectedFragments: ReadonlyArray<string>;
    };

export type ConsoleExerciseItem = {
  id: string;
  command: string;
  prompt?: string;
  referenceExplanation?: string;
  validation?: ConsoleValidation;
};

export type ConsoleProblem = BaseProblem & {
  type: 'console';
  setupCode?: string;
  items: ReadonlyArray<ConsoleExerciseItem>;
};

export type ProofStep = {
  id: string;
  prompt: string;
  hint?: string;
  expectedExpression?: string;
  referenceExplanation?: string;
};

export type ProofProblem = BaseProblem & {
  type: 'proof';
  givenExpressions?: ReadonlyArray<string>;
  proofSteps?: ReadonlyArray<ProofStep>;
  finalExpression?: string;
};

export type TypedWorkbookProblem =
  | EssayProblem
  | PythonProblem
  | ConsoleProblem
  | ProofProblem;

/**
 * 아직 type 필드가 없는 기존 ch1.ts/ch2.ts를 그대로 사용할 수 있게 하는 타입입니다.
 * 새 문제부터는 type을 명시하는 것을 권장합니다.
 */
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

/**
 * 기존 answerType을 사용하는 문제도 새 문제 유형으로 해석합니다.
 * 향후 모든 데이터에 type이 추가되면 fallback 부분을 제거할 수 있습니다.
 */
export function resolveProblemType(problem: WorkbookProblem): ProblemType {
  if (problem.type) return problem.type;
  return problem.answerType === 'code' ? 'python' : 'essay';
}

export const PROBLEM_TYPE_LABEL: Record<ProblemType, string> = {
  essay: '서술형',
  python: 'Python 실행형',
  console: 'Console 실습형',
  proof: '수식 증명형',
};
