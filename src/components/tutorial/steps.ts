import type { TutorialStep } from "./types";

export const HOME_TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: "home-history",
    target: '[data-tutorial="home-history"]',
    title: "내 학습 기록",
    description:
      "저장한 답안, 점수와 피드백은 내 학습 기록에서 다시 확인하고 이어서 학습할 수 있습니다.",
    position: "bottom",
    optional: true,
  },
  {
    id: "home-credit",
    target: '[data-tutorial="home-credit"]',
    title: "Credit",
    description:
      "현재 보유 Credit을 확인할 수 있습니다. Credit 표시를 누르면 충전 화면으로 이동합니다.",
    position: "bottom",
    optional: true,
  },
  {
    id: "home-chapter",
    target: '[data-tutorial="home-chapter-card"]',
    title: "Chapter 선택",
    description:
      "학습할 Chapter를 선택합니다. 무료 공개 Chapter는 바로 시작할 수 있고, 잠긴 Chapter는 필요한 Credit을 확인할 수 있습니다.",
    position: "top",
  },
];

export const WORKBOOK_TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: "workbook-sidebar",
    target: '[data-tutorial="workbook-sidebar"]',
    title: "문제 목록",
    description:
      "왼쪽 문제 목록에서 원하는 문제를 바로 선택할 수 있습니다. 상위 문제와 세부 문제가 계층적으로 표시됩니다.",
    position: "right",
  },
  {
    id: "workbook-prompt",
    target: '[data-tutorial="workbook-prompt"]',
    title: "문제 확인",
    description:
      "현재 문제의 설명, 수식, 표, 그림과 필요한 Python 스크립트를 확인합니다.",
    position: "bottom",
  },
  {
    id: "workbook-answer",
    target: '[data-tutorial="workbook-answer"]',
    title: "답안 작성",
    description:
      "서술형 문제는 답안을 직접 작성합니다. Python 문제는 코드 실행 결과가 답안에 포함될 수 있습니다.",
    position: "top",
    optional: true,
  },
  {
    id: "workbook-run",
    target: '[data-tutorial="workbook-run"]',
    title: "Python 실행",
    description:
      "Python 문제에서는 코드를 작성한 뒤 실행합니다. 실행 결과와 그래프를 확인한 후 필요한 부분을 수정하세요.",
    position: "top",
    optional: true,
  },
  {
    id: "workbook-save",
    target: '[data-tutorial="workbook-save"]',
    title: "답안 저장",
    description:
      "작성한 답안을 계정에 저장합니다. 문제를 이동하기 전에 저장하지 않은 변경사항이 있으면 안내가 표시됩니다.",
    position: "top",
    optional: true,
  },
  {
    id: "workbook-grade",
    target: '[data-tutorial="workbook-grade"]',
    title: "답안 채점",
    description:
      "답안 채점을 누르면 점수와 피드백을 확인할 수 있습니다. 결과를 참고해 답안을 수정하고 다시 시도할 수 있습니다.",
    position: "top",
  },
  {
    id: "workbook-navigation",
    target: '[data-tutorial="workbook-navigation"]',
    title: "이전 · 다음 문제",
    description:
      "이전 문제와 다음 문제 버튼으로 순서대로 학습할 수 있습니다. 저장되지 않은 답안이 있으면 이동 전에 확인합니다.",
    position: "top",
    optional: true,
  },
];

export const PYTHON_MINI_TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: "python-editor",
    target: '[data-tutorial="python-editor"]',
    title: "Python 코드 작성",
    description:
      "제공된 기본 코드를 확인하고 문제에서 요구한 부분을 작성하거나 수정합니다.",
    position: "top",
  },
  {
    id: "python-run",
    target: '[data-tutorial="workbook-run"]',
    title: "코드 실행",
    description:
      "코드 실행을 눌러 결과를 확인합니다. 그래프 문제는 실행 결과 아래의 Figure도 확인하세요.",
    position: "top",
  },
  {
    id: "python-grade",
    target: '[data-tutorial="workbook-grade"]',
    title: "채점하기",
    description:
      "실행이 끝난 뒤 답안을 채점합니다. 필요한 경우 코드를 수정하고 다시 실행한 뒤 재채점할 수 있습니다.",
    position: "top",
  },
];

export const CONSOLE_MINI_TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: "console-input",
    target: '[data-tutorial="console-input"]',
    title: "현재 명령 입력",
    description:
      "화면에 제시된 현재 명령을 직접 입력하세요. 복사해서 붙여넣기보다 명령을 직접 작성하는 학습을 목표로 합니다.",
    position: "top",
  },
  {
    id: "console-run",
    target: '[data-tutorial="console-run"]',
    title: "현재 명령 실행",
    description:
      "입력한 명령을 실행하고 결과를 확인합니다. 필요한 경우 이전 명령과 다음 명령으로 이동할 수 있습니다.",
    position: "top",
  },
];
