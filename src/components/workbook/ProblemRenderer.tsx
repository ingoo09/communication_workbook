"use client";

import type { WorkbookProblem } from "@/types/workbook";
import { resolveProblemType } from "@/types/workbook";
import ConsoleProblem from "./ConsoleProblem";
import EssayProblem from "./EssayProblem";
import PythonProblem from "./PythonProblem";

type ProblemRendererProps = {
  problem: WorkbookProblem;
  value: string;
  onChange: (value: string) => void;
  pyodide: any;
  pyReady: boolean;
  runningCode: boolean;
  codeOutput: string | null;
  plotImage: string | null;
  onRunPython: () => void;
};

export default function ProblemRenderer({
  problem,
  value,
  onChange,
  pyodide,
  pyReady,
  runningCode,
  codeOutput,
  plotImage,
  onRunPython,
}: ProblemRendererProps) {
  const type = resolveProblemType(problem);

  if (type === "python") {
    return (
      <PythonProblem
        value={value}
        onChange={onChange}
        runningCode={runningCode}
        codeOutput={codeOutput}
        plotImage={plotImage}
        onRunPython={onRunPython}
      />
    );
  }

  if (type === "console" && problem.type === "console") {
    return (
      <ConsoleProblem
        problem={problem}
        value={value}
        onChange={onChange}
        pyodide={pyodide}
        pyReady={pyReady}
      />
    );
  }

  return <EssayProblem value={value} onChange={onChange} />;
}
