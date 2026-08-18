'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

type Organization = {
  id: string;
  name: string;
  code: string;
  created_at: string;
};

export default function OrganizationPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [organizationName, setOrganizationName] = useState('');
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [createdCode, setCreatedCode] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  async function loadOrganizations() {
    const { data, error } = await supabase
      .from('organizations')
      .select('id, name, code, created_at')
      .order('created_at', { ascending: false });

    if (error) throw error;

    setOrganizations(data ?? []);
  }

  useEffect(() => {
    let cancelled = false;

    async function initialize() {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          router.replace('/login');
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .maybeSingle();

        if (profileError) throw profileError;

        if (!profile || !['developer', 'admin'].includes(profile.role)) {
          router.replace('/');
          return;
        }

        const { data, error } = await supabase
          .from('organizations')
          .select('id, name, code, created_at')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (!cancelled) setOrganizations(data ?? []);
      } catch (error: any) {
        if (!cancelled) {
          setIsError(true);
          setMessage(error?.message ?? '소속 정보를 불러오지 못했습니다.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void initialize();

    return () => {
      cancelled = true;
    };
  }, [router, supabase]);

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage('');
    setIsError(false);
    setCreatedCode('');

    if (!organizationName.trim()) {
      setIsError(true);
      setMessage('소속명을 입력해 주세요.');
      return;
    }

    setCreating(true);

    try {
      const { data, error } = await supabase.rpc('create_organization', {
        p_name: organizationName.trim(),
      });

      if (error) throw error;

      const created = Array.isArray(data) ? data[0] : data;

      if (!created?.organization_code) {
        throw new Error('소속 코드 생성 결과를 확인할 수 없습니다.');
      }

      setCreatedCode(created.organization_code);
      setMessage(`${created.organization_name} 소속 코드가 생성되었습니다.`);
      setOrganizationName('');
      await loadOrganizations();
    } catch (error: any) {
      setIsError(true);
      setMessage(error?.message ?? '소속 코드 생성 중 오류가 발생했습니다.');
    } finally {
      setCreating(false);
    }
  }

  if (loading) {
    return (
      <main style={{ padding: 40, fontFamily: 'Inter, Pretendard, Arial, sans-serif' }}>
        소속 정보를 불러오는 중입니다...
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#f5f7fb',
        color: '#111827',
        fontFamily: 'Inter, Pretendard, Arial, sans-serif',
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px 80px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div style={{ color: '#4f46e5', fontWeight: 900, marginBottom: 8 }}>
              Organization
            </div>
            <h1 style={{ margin: 0, fontSize: 36, fontWeight: 900 }}>소속 코드 관리</h1>
            <p style={{ color: '#6b7280', lineHeight: 1.7 }}>
              소속을 생성한 뒤 발급된 코드를 학생에게 전달하세요.
            </p>
          </div>

          <Link
            href="/"
            style={{
              padding: '11px 16px',
              borderRadius: 12,
              textDecoration: 'none',
              color: '#111827',
              background: '#fff',
              border: '1px solid #e5e7eb',
              fontWeight: 800,
            }}
          >
            ← 홈으로
          </Link>
        </div>

        <section
          style={{
            marginTop: 28,
            padding: 24,
            background: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: 18,
          }}
        >
          <h2 style={{ margin: 0, fontSize: 20 }}>새 소속 생성</h2>

          <form onSubmit={handleCreate} style={{ marginTop: 18 }}>
            <label style={{ display: 'block', fontWeight: 800, marginBottom: 8 }}>
              소속명
            </label>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1fr) auto',
                gap: 10,
              }}
            >
              <input
                type="text"
                value={organizationName}
                onChange={(event) => setOrganizationName(event.target.value)}
                placeholder="예: 영남대학교 정보통신공학과"
                style={{
                  minHeight: 46,
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: 11,
                  fontSize: 15,
                  boxSizing: 'border-box',
                }}
              />

              <button
                type="submit"
                disabled={creating}
                style={{
                  minHeight: 46,
                  padding: '10px 18px',
                  border: 0,
                  borderRadius: 11,
                  cursor: creating ? 'wait' : 'pointer',
                  color: '#fff',
                  background: '#4f46e5',
                  fontWeight: 900,
                }}
              >
                {creating ? '생성 중...' : '소속 코드 생성'}
              </button>
            </div>
          </form>

          {createdCode && (
            <div
              style={{
                marginTop: 18,
                padding: 18,
                borderRadius: 14,
                background: '#eef2ff',
                border: '1px solid #c7d2fe',
              }}
            >
              <div style={{ fontSize: 13, color: '#4f46e5', fontWeight: 800 }}>
                새 소속 코드
              </div>
              <div
                style={{
                  marginTop: 5,
                  fontSize: 28,
                  letterSpacing: 3,
                  fontWeight: 900,
                }}
              >
                {createdCode}
              </div>
            </div>
          )}

          {message && (
            <div
              style={{
                marginTop: 16,
                padding: 12,
                borderRadius: 12,
                background: isError ? '#fef2f2' : '#ecfdf5',
                color: isError ? '#991b1b' : '#065f46',
              }}
            >
              {message}
            </div>
          )}
        </section>

        <section
          style={{
            marginTop: 22,
            padding: 24,
            background: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: 18,
          }}
        >
          <h2 style={{ margin: 0, fontSize: 20 }}>생성된 소속</h2>

          {organizations.length === 0 ? (
            <p style={{ color: '#6b7280', marginBottom: 0 }}>
              아직 생성된 소속이 없습니다.
            </p>
          ) : (
            <div style={{ display: 'grid', gap: 10, marginTop: 16 }}>
              {organizations.map((organization) => (
                <div
                  key={organization.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 16,
                    padding: 14,
                    borderRadius: 12,
                    border: '1px solid #e5e7eb',
                  }}
                >
                  <div style={{ fontWeight: 800 }}>{organization.name}</div>
                  <code
                    style={{
                      padding: '6px 9px',
                      borderRadius: 8,
                      background: '#f3f4f6',
                      fontWeight: 900,
                      letterSpacing: 1,
                    }}
                  >
                    {organization.code}
                  </code>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
