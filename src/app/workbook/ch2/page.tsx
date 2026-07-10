import WorkbookPage from '@/components/workbook/WorkbookPage';
import { chapter } from './ch2';

export const dynamic = 'force-dynamic';

export default function Chapter2Page() {
  return (
    <WorkbookPage
      chapter={chapter}
      chapterSlug="ch2"
      contentPath="src/app/workbook/ch2/ch2.ts"
    />
  );
}
