import WorkbookPage from '@/components/workbook/WorkbookPage';
import WorkbookHomeButton from '@/components/workbook/WorkbookHomeButton';
import ChapterUnlockPanel from '@/components/workbook/ChapterUnlockPanel';
import { createClient } from '@/lib/supabase/server';
import { chapter } from './ch6';

export const dynamic = 'force-dynamic';

export default async function Chapter5Page() {
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
        .eq('chapter_id', 'ch6')
        .maybeSingle();

      canAccess = Boolean(access);
    }
  }

  if (!canAccess) {
    return (
      <ChapterUnlockPanel
        chapterId="ch6"
        chapterNumber={5}
      />
    );
  }

  return (
    <>
      <WorkbookPage
        chapter={chapter}
        chapterSlug="ch6"
        contentPath="src/app/workbook/ch6/ch6.ts"
      />
      <WorkbookHomeButton />
    </>
  );
}
