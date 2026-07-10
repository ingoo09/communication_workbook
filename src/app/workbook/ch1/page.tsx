import WorkbookPage from '@/components/workbook/WorkbookPage';
import WorkbookHomeButton from '@/components/workbook/WorkbookHomeButton';
import { chapter } from './ch1';

export const dynamic = 'force-dynamic';

export default function Chapter1Page() {
  return (
    <>
      <WorkbookPage
        chapter={chapter}
        chapterSlug="ch1"
        contentPath="src/app/workbook/ch1/ch1.ts"
      />
      <WorkbookHomeButton />
    </>
  );
}
