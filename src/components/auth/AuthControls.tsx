'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';

type Profile = {
  name: string | null;
  student_number: string | null;
  role: string | null;
};

export default function AuthControls() {
  const supabase = useMemo(() => createClient(), []);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);

  async function loadProfile(currentUser: User | null) {
    setUser(currentUser);

    if (!currentUser) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from('profiles')
      .select('name, student_number, role')
      .eq('id', currentUser.id)
      .maybeSingle();

    setProfile(data ?? null);
    setLoading(false);
  }

  useEffect(() => {
    let mounted = true;

    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      void loadProfile(data.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      void loadProfile(session?.user ?? null);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  async function signOut() {
    setSigningOut(true);
    try {
      await supabase.auth.signOut();
      window.location.href = '/';
    } finally {
      setSigningOut(false);
    }
  }

  const buttonStyle = {
    minHeight: 42,
    padding: '10px 14px',
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.12)',
    color: 'white',
    background: 'rgba(255,255,255,0.07)',
    fontWeight: 700,
    fontSize: 13,
    boxSizing: 'border-box' as const,
    whiteSpace: 'nowrap' as const,
  };

  if (loading) {
    return <div style={{ ...buttonStyle, opacity: 0.65 }}>로그인 확인 중...</div>;
  }

  if (!user) {
    return (
      <Link href="/login" style={{ ...buttonStyle, textDecoration: 'none' }}>
        로그인 / 회원가입
      </Link>
    );
  }

  const userLabel = profile?.name?.trim() || user.email || '사용자';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
      <div
        title={user.email ?? ''}
        style={{
          maxWidth: 210,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          fontSize: 13,
          color: 'rgba(255,255,255,0.78)',
        }}
      >
        {userLabel}
        {profile?.student_number ? ` · ${profile.student_number}` : ''}
      </div>
      {profile?.role === 'developer' && (
        <Link
          href="/admin"
          style={{
            ...buttonStyle,
            textDecoration: 'none',
            color: '#c7d2fe',
            border: '1px solid rgba(129,140,248,0.28)',
            background: 'rgba(99,102,241,0.14)',
          }}
        >
          관리자
        </Link>
      )}
      <button
        type="button"
        onClick={signOut}
        disabled={signingOut}
        style={{ ...buttonStyle, cursor: signingOut ? 'wait' : 'pointer' }}
      >
        {signingOut ? '로그아웃 중...' : '로그아웃'}
      </button>
    </div>
  );
}
