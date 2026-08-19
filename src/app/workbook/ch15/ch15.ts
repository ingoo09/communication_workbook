import type { WorkbookChapter } from '@/types/workbook';

export const chapter = {
  "id": "15-random_signals",
  "title": "Chapter 15. Random Signals",
  "sections": [
    { //문제 1
      "id": "15-1",
      "title": "1. 가우시안 분포(PDF)의 적분과 Q-function",
      "problems": [
        {
          "id": "15-1A",
          "title": "1.A.",
          "prompt": `라는 표현은 가 가우시안 분포를 갖는 확률 변수이고, 평균이 이고 분산이 임을 의미한다. Q-function 는 가우시안 확률 변수 가 보다 높을 확률을 의미한다. 이는 의 PDF 를 에서 양의 무한대까지 적분한 것에 해당하므로, 다음과 같이 (식 15.1)로 나타낼 수 있다.`,
          "referenceAnswer": "",
          "tags": [
            "preface"
          ]
        },
      ],
    },
  ]
} as const;
