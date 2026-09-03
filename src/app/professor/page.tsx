'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

type OrganizationSummary = {
  id: string;
  name: string;
};

export default function ProfessorPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState<OrganizationSummary | null>(null);
  const [code, setCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [checkingCode, setCheckingCode] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function load() {
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
          .select('name, role, organization_id')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;

        if (profile.role !== 'professor') {
          router.replace('/');
          return;
        }

        if (!profile.organization_id) {
          throw new Error('교수 계정에 연결된 소속 정보가 없습니다.');
        }

        // 로그인 직후에는 인증코드를 읽지 않는다.
        // 대표 교수(owner_id) 여부와 관계없이 profile.organization_id로 소속을 찾는다.
        const { data: org, error: orgError } = await supabase
          .from('organizations')
          .select('id, name')
          .eq('id', profile.organization_id)
          .maybeSingle();

        if (orgError) throw orgError;

        if (!cancelled) {
          setName(profile.name ?? '');
          setOrganization(org ?? null);
        }
      } catch (error: any) {
        if (!cancelled) {
          setMessage(error?.message ?? '교수 계정 정보를 불러오지 못했습니다.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [router, supabase]);

  async function handleCheckCode() {
    if (!organization) return;

    if (showCode) {
      setShowCode(false);
      setCode('');
      setMessage('');
      return;
    }

    setCheckingCode(true);
    setMessage('');

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        router.replace('/login');
        return;
      }

      const { data: org, error } = await supabase
        .from('organizations')
        .select('code')
        .eq('id', organization.id)
        .single();

      if (error) throw error;

      setCode(org.code ?? '');
      setShowCode(true);
    } catch (error: any) {
      setMessage(error?.message ?? '인증코드를 확인하지 못했습니다.');
    } finally {
      setCheckingCode(false);
    }
  }

  async function copyCode() {
    if (!code) return;

    try {
      await navigator.clipboard.writeText(code);
      setMessage('인증코드를 복사했습니다.');
    } catch {
      setMessage('복사하지 못했습니다. 인증코드를 직접 선택해 주세요.');
    }
  }

  if (loading) {
    return <main style={{ padding: 40 }}>교수 계정 정보를 불러오는 중입니다...</main>;
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
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '48px 24px 80px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
          <Link href="/" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: 800 }}>
            ← 교재 홈
          </Link>

          <span
            style={{
              padding: '7px 11px',
              borderRadius: 999,
              background: '#ede9fe',
              color: '#5b21b6',
              fontSize: 13,
              fontWeight: 900,
            }}
          >
            교수 계정
          </span>
        </div>

        <div style={{ marginTop: 26 }}>
          <div style={{ color: '#4f46e5', fontWeight: 900, fontSize: 13 }}>PROFESSOR</div>
          <h1 style={{ margin: '7px 0 0', fontSize: 36 }}>
            {name ? `${name} 교수 계정` : '교수 계정'}
          </h1>
          <p style={{ color: '#6b7280', lineHeight: 1.7 }}>
            소속 학생의 학습 현황을 확인하고 학생 가입용 인증코드를 관리할 수 있습니다.
          </p>
        </div>

        <div
          style={{
            marginTop: 26,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 14,
          }}
        >
          <Link
            href="/professor/students"
            style={{
              padding: 22,
              borderRadius: 18,
              textDecoration: 'none',
              background: '#fff',
              border: '1px solid #e5e7eb',
              color: '#111827',
            }}
          >
            <div style={{ color: '#4f46e5', fontWeight: 900, fontSize: 14 }}>
              STUDENT ANSWERS
            </div>
            <div style={{ marginTop: 6, fontSize: 21, fontWeight: 900 }}>
              학생 답안 보기
            </div>
            <div style={{ marginTop: 8, color: '#6b7280', lineHeight: 1.6 }}>
              내 소속으로 가입한 학생들의 답안·채점 결과를 확인하고, 분반 배정과 Chapter별 마감기한을 관리합니다.
            </div>
          </Link>

          <div
            style={{
              padding: 22,
              borderRadius: 18,
              background: '#fff',
              border: '1px solid #e5e7eb',
            }}
          >
            <div style={{ color: '#6b7280', fontSize: 14, fontWeight: 800 }}>소속</div>
            <div style={{ marginTop: 6, fontSize: 21, fontWeight: 900 }}>
              {organization?.name ?? '소속 정보 없음'}
            </div>
          </div>
        </div>

        {organization ? (
          <section
            style={{
              marginTop: 18,
              padding: 28,
              borderRadius: 20,
              border: '1px solid #e5e7eb',
              background: '#fff',
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 900 }}>학생 회원가입 인증코드</div>
            <p style={{ color: '#6b7280', lineHeight: 1.65 }}>
              인증코드는 로그인 직후에는 표시되지 않습니다. 필요할 때만 아래 버튼으로 확인하세요.
            </p>

            {!showCode ? (
              <button
                type="button"
                onClick={handleCheckCode}
                disabled={checkingCode}
                style={{
                  marginTop: 8,
                  minHeight: 44,
                  padding: '10px 16px',
                  border: 0,
                  borderRadius: 11,
                  cursor: checkingCode ? 'wait' : 'pointer',
                  background: '#4f46e5',
                  color: '#fff',
                  fontWeight: 900,
                }}
              >
                {checkingCode ? '확인 중...' : '코드 확인'}
              </button>
            ) : (
              <>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 16,
                    flexWrap: 'wrap',
                    marginTop: 16,
                    padding: 18,
                    borderRadius: 14,
                    background: '#eef2ff',
                    border: '1px solid #c7d2fe',
                  }}
                >
                  <code
                    style={{
                      fontSize: 30,
                      fontWeight: 900,
                      letterSpacing: 4,
                      color: '#312e81',
                    }}
                  >
                    {code}
                  </code>

                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={copyCode}
                      style={{
                        border: 0,
                        borderRadius: 11,
                        padding: '10px 14px',
                        cursor: 'pointer',
                        background: '#4f46e5',
                        color: '#fff',
                        fontWeight: 900,
                      }}
                    >
                      코드 복사
                    </button>

                    <button
                      type="button"
                      onClick={handleCheckCode}
                      style={{
                        border: '1px solid #d1d5db',
                        borderRadius: 11,
                        padding: '10px 14px',
                        cursor: 'pointer',
                        background: '#fff',
                        color: '#374151',
                        fontWeight: 900,
                      }}
                    >
                      코드 숨기기
                    </button>
                  </div>
                </div>
              </>
            )}
          </section>
        ) : (
          <section style={{ marginTop: 18, padding: 24, background: '#fff', borderRadius: 16 }}>
            생성된 소속 정보를 찾지 못했습니다.
          </section>
        )}

        {message && (
          <div
            style={{
              marginTop: 16,
              padding: 12,
              borderRadius: 12,
              background: '#eef2ff',
              color: '#3730a3',
            }}
          >
            {message}
          </div>
        )}
      </div>
    </main>
  );
}
