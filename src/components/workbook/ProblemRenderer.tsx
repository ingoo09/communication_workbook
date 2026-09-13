"use client";

import type { WorkbookProblem } from "@/types/workbook";
import { resolveProblemType } from "@/types/workbook";
import ConsoleProblem from "./ConsoleProblem";
import EssayProblem from "./EssayProblem";
import PythonProblem from "./PythonProblem";
import ProofProblem from "./ProofProblem";
import GraphProblem from "./GraphProblem";
import PythonConsoleProblem, { isPythonConsoleProblem } from "./PythonConsoleProblem";

type ProblemRendererProps = {
  problem: WorkbookProblem;
  value: string;
  onChange: (value: string) => void;
  pyodide: any;
  pyReady: boolean;
  runningCode: boolean;
  codeOutput: string | null;
  plotImage: string | null;
  audioSource: string | null;
  onRunPython: () => void;
  onEnsureWorkbookHelpers?: () => Promise<void>;
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
  audioSource,
  onRunPython,
  onEnsureWorkbookHelpers,
}: ProblemRendererProps) {
  const type = resolveProblemType(problem);

  if (isPythonConsoleProblem(problem)) {
    return (
      <PythonConsoleProblem
        problem={problem}
        value={value}
        onChange={onChange}
        pyodide={pyodide}
        pyReady={pyReady}
        onEnsureWorkbookHelpers={onEnsureWorkbookHelpers}
      />
    );
  }

  if (type === "proof" && problem.type === "proof") {
    return (
      <ProofProblem
        problem={problem}
        value={value}
        onChange={onChange}
      />
    );
  }

  if (type === "graph" && problem.type === "graph") {
    return (
      <GraphProblem
        problem={problem}
        value={value}
        onChange={onChange}
      />
    );
  }

  if (type === "python") {
    return (
      <PythonProblem
        problem={problem.type === "python" ? problem : undefined}
        value={value}
        onChange={onChange}
        runningCode={runningCode}
        codeOutput={codeOutput}
        plotImage={plotImage}
        audioSource={audioSource}
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
        onEnsureWorkbookHelpers={onEnsureWorkbookHelpers}
      />
    );
  }

  return <EssayProblem value={value} onChange={onChange} />;
}
