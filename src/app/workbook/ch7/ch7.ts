import type { WorkbookChapter } from '@/types/workbook';

export const chapter = {
  "id": "7-sampling-reconstruction",
  "title": "Chapter 7. Sampling and Signal Reconstruction",
  "sections": [
    { //문제 1
      "id": "7-1",
      "title": "1. Python을 이용한 LPF 설계 및 주파수 응답 분석",
      "problems": [
        { //문제 1.A
          "id": "7-1A",
          "title": "1.A.",
          "type": "python",
          "prompt": `Python의 scipy.signal 라이브러리를 이용하여 다음 그림과 같이 Sine Wave 발생기와 Analog Filter Design 블록으로 구성된 시스템을 구현하시오. 입력 신호와 필터 출력 신호는 Matplotlib을 이용하여 함께 관찰하시오.`,
        },
      ]
    }
  ]
} as const;
