export type TutorialStep = {
  id: string;
  target: string;
  title: string;
  description: string;
  position?: "top" | "right" | "bottom" | "left" | "auto";
  optional?: boolean;
};

export type TutorialScope = "home" | "workbook" | "python" | "console";
