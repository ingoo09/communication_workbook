import WorkbookPage from '@/components/workbook/WorkbookPage';
import WorkbookHomeButton from '@/components/workbook/WorkbookHomeButton';
import ChapterUnlockPanel from '@/components/workbook/ChapterUnlockPanel';
import { createClient } from '@/lib/supabase/server';
import { chapter } from './ch15';

export const dynamic = 'force-dynamic';

export default async function Chapter15Page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let canAccess = false;

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle();

    if (profile?.role === 'developer' || profile?.role === 'admin') {
      canAccess = true;
    } else {
      const { data: access } = await supabase
        .from('chapter_access')
        .select('chapter_id')
        .eq('user_id', user.id)
        .eq('chapter_id', 'ch15')
        .maybeSingle();

      canAccess = Boolean(access);
    }
  }

  if (!canAccess) {
    return (
      <ChapterUnlockPanel
        chapterId="ch15"
        chapterNumber={15}
      />
    );
  }

  return (
    <>
      <WorkbookPage
        chapter={chapter}
        chapterSlug="ch15"
        contentPath="src/app/workbook/ch15/ch15.ts"
      />
      <WorkbookHomeButton />
    </>
  );
}
