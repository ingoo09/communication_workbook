import WorkbookPage from '@/components/workbook/WorkbookPage';
import WorkbookHomeButton from '@/components/workbook/WorkbookHomeButton';
import { chapter } from './ch14';

export const dynamic = 'force-dynamic';

export default function Chapter14Page() {
  return (
    <>
      <WorkbookPage
        chapter={chapter}
        chapterSlug="ch14"
        contentPath="src/app/workbook/ch14/ch14.ts"
      />
      <WorkbookHomeButton />
    </>
  );
}
