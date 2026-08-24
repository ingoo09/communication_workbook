'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

type Profile = {
  id: string;
  email: string | null;
  name: string | null;
  organization: string | null;
  student_number: string | null;
  role: string | null;
};

export default function AccountPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [profile, setProfile] = useState<Profile | null>(null);
  const [name, setName] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPasswordConfirm, setShowNewPasswordConfirm] = useState(false);

  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function initialize() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.replace('/login');
          return;
        }

        const { data, error } = await supabase
          .from('profiles')
          .select('id, email, name, organization, student_number, role')
          .eq('id', user.id)
          .maybeSingle();

        if (error) throw error;
        if (!data) throw new Error('회원정보를 찾을 수 없습니다.');

        if (!cancelled) {
          setProfile(data);
          setName(data.name ?? '');
          setStudentNumber(data.student_number ?? '');
        }
      } catch (error: any) {
        if (!cancelled) {
          setIsError(true);
          setMessage(error?.message ?? '회원정보를 불러오지 못했습니다.');
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

  function clearMessage() {
    setMessage('');
    setIsError(false);
  }

  async function verifyPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    clearMessage();

    if (!profile?.email) {
      setIsError(true);
      setMessage('로그인 이메일을 확인할 수 없습니다.');
      return;
    }

    if (!currentPassword) {
      setIsError(true);
      setMessage('현재 비밀번호를 입력해 주세요.');
      return;
    }

    setVerifying(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: profile.email,
        password: currentPassword,
      });

      if (error) throw error;

      setVerified(true);
      setCurrentPassword('');
      setMessage('비밀번호가 확인되었습니다. 회원정보를 수정할 수 있습니다.');
    } catch {
      setVerified(false);
      setIsError(true);
      setMessage('비밀번호가 일치하지 않습니다.');
    } finally {
      setVerifying(false);
    }
  }

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    clearMessage();

    if (!verified) {
      setIsError(true);
      setMessage('먼저 현재 비밀번호를 확인해 주세요.');
      return;
    }

    if (!name.trim()) {
      setIsError(true);
      setMessage('이름을 입력해 주세요.');
      return;
    }

    const wantsPasswordChange =
      newPassword.length > 0 || newPasswordConfirm.length > 0;

    if (wantsPasswordChange && !newPassword) {
      setIsError(true);
      setMessage('새 비밀번호를 입력해 주세요.');
      return;
    }

    if (wantsPasswordChange && newPassword !== newPasswordConfirm) {
      setIsError(true);
      setMessage('새 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    setSaving(true);

    try {
      const { data, error } = await supabase.rpc('update_own_profile', {
        p_name: name.trim(),
        p_student_number:
          profile?.role === 'student'
            ? studentNumber.trim() || null
            : null,
      });

      if (error) throw error;

      if (wantsPasswordChange) {
        const { error: passwordError } = await supabase.auth.updateUser({
          password: newPassword,
        });

        if (passwordError) throw passwordError;
      }

      const updated = Array.isArray(data) ? data[0] : data;

      setProfile((prev) =>
        prev
          ? {
              ...prev,
              name: updated?.name ?? name.trim(),
              student_number:
                profile?.role === 'student'
                  ? updated?.student_number ?? (studentNumber.trim() || null)
                  : prev.student_number,
            }
          : prev,
      );

      setNewPassword('');
      setNewPasswordConfirm('');
      setVerified(false);
      setMessage(
        wantsPasswordChange
          ? '회원정보와 비밀번호가 수정되었습니다. 다시 수정하려면 비밀번호를 확인해 주세요.'
          : '회원정보가 수정되었습니다. 다시 수정하려면 비밀번호를 확인해 주세요.',
      );
    } catch (error: any) {
      const msg = String(error?.message ?? '');

      setIsError(true);

      if (
        msg.includes('profiles_student_number_key') ||
        msg.toLowerCase().includes('duplicate key')
      ) {
        setMessage('이미 사용 중인 학번입니다.');
      } else {
        setMessage(msg || '회원정보 수정 중 오류가 발생했습니다.');
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main style={mainStyle}>
        <section style={cardStyle}>회원정보를 불러오는 중입니다...</section>
      </main>
    );
  }

  return (
    <main style={mainStyle}>
      <section style={cardStyle}>
        <Link
          href="/"
          style={{
            color: '#c7d2fe',
            textDecoration: 'none',
            fontSize: 14,
          }}
        >
          ← 교재 홈
        </Link>

        <div style={{ marginTop: 22 }}>
          <div style={{ fontSize: 13, color: '#a5b4fc', fontWeight: 800 }}>
            ACCOUNT
          </div>
          <h1 style={{ margin: '8px 0 0', fontSize: 32 }}>
            회원정보 수정
          </h1>
          <p
            style={{
              marginTop: 10,
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.68)',
            }}
          >
            개인정보 보호를 위해 현재 비밀번호를 확인한 뒤 수정할 수 있습니다.
          </p>
        </div>

        <div style={{ marginTop: 26 }}>
          <FieldLabel>이메일</FieldLabel>
          <input
            value={profile?.email ?? ''}
            disabled
            style={disabledInputStyle}
          />
          <div style={helperStyle}>이메일은 변경할 수 없습니다.</div>

          <FieldLabel top>소속</FieldLabel>
          <input
            value={profile?.organization ?? '소속 정보 없음'}
            disabled
            style={disabledInputStyle}
          />
          <div style={helperStyle}>소속은 변경할 수 없습니다.</div>
        </div>

        {!verified ? (
          <form onSubmit={verifyPassword} style={{ marginTop: 26 }}>
            <div
              style={{
                padding: 18,
                borderRadius: 16,
                border: '1px solid rgba(129,140,248,0.22)',
                background: 'rgba(99,102,241,0.08)',
              }}
            >
              <div style={{ fontWeight: 900 }}>본인 확인</div>
              <p
                style={{
                  margin: '7px 0 16px',
                  color: 'rgba(255,255,255,0.64)',
                  fontSize: 14,
                  lineHeight: 1.6,
                }}
              >
                회원정보를 수정하려면 현재 비밀번호를 한 번 더 입력해 주세요.
              </p>

              <div style={passwordFieldStyle}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  placeholder="현재 비밀번호"
                  style={passwordInputStyle}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  style={passwordToggleStyle}
                >
                  {showPassword ? '숨기기' : '보기'}
                </button>
              </div>

              <button
                type="submit"
                disabled={verifying}
                style={{
                  ...submitButtonStyle,
                  marginTop: 14,
                  opacity: verifying ? 0.6 : 1,
                }}
              >
                {verifying ? '확인 중...' : '비밀번호 확인'}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={saveProfile} style={{ marginTop: 26 }}>
            <div
              style={{
                padding: 18,
                borderRadius: 16,
                border: '1px solid rgba(52,211,153,0.22)',
                background: 'rgba(16,185,129,0.07)',
              }}
            >
              <div
                style={{
                  color: '#a7f3d0',
                  fontSize: 13,
                  fontWeight: 900,
                  marginBottom: 16,
                }}
              >
                ✓ 비밀번호 확인 완료
              </div>

              <FieldLabel>이름 *</FieldLabel>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                style={inputStyle}
                placeholder="이름"
              />

              {profile?.role === 'student' && (
                <>
                  <FieldLabel top>
                    학번{' '}
                    <span
                      style={{
                        fontWeight: 500,
                        color: 'rgba(255,255,255,0.55)',
                      }}
                    >
                      (선택)
                    </span>
                  </FieldLabel>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={studentNumber}
                    onChange={(event) => setStudentNumber(event.target.value)}
                    style={inputStyle}
                    placeholder="예: 20261234"
                  />
                </>
              )}

              <div
                style={{
                  marginTop: 24,
                  paddingTop: 20,
                  borderTop: '1px solid rgba(255,255,255,0.10)',
                }}
              >
                <div style={{ fontWeight: 900 }}>비밀번호 변경</div>
                <div
                  style={{
                    marginTop: 6,
                    color: 'rgba(255,255,255,0.55)',
                    fontSize: 13,
                    lineHeight: 1.6,
                  }}
                >
                  변경하지 않으려면 아래 항목을 비워두세요.
                </div>

                <FieldLabel top>새 비밀번호</FieldLabel>
                <div style={passwordFieldStyle}>
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    placeholder="새 비밀번호"
                    style={passwordInputStyle}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((value) => !value)}
                    style={passwordToggleStyle}
                  >
                    {showNewPassword ? '숨기기' : '보기'}
                  </button>
                </div>

                <FieldLabel top>새 비밀번호 확인</FieldLabel>
                <div style={passwordFieldStyle}>
                  <input
                    type={showNewPasswordConfirm ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={newPasswordConfirm}
                    onChange={(event) =>
                      setNewPasswordConfirm(event.target.value)
                    }
                    placeholder="새 비밀번호를 한 번 더 입력"
                    style={passwordInputStyle}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowNewPasswordConfirm((value) => !value)
                    }
                    style={passwordToggleStyle}
                  >
                    {showNewPasswordConfirm ? '숨기기' : '보기'}
                  </button>
                </div>

                {newPasswordConfirm.length > 0 && (
                  <div
                    style={{
                      marginTop: 8,
                      fontSize: 13,
                      fontWeight: 800,
                      color:
                        newPassword === newPasswordConfirm
                          ? '#a7f3d0'
                          : '#fecaca',
                    }}
                  >
                    {newPassword === newPasswordConfirm
                      ? '✓ 새 비밀번호가 일치합니다.'
                      : '새 비밀번호가 일치하지 않습니다.'}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={saving}
                style={{
                  ...submitButtonStyle,
                  opacity: saving ? 0.6 : 1,
                }}
              >
                {saving ? '저장 중...' : '변경사항 저장'}
              </button>
            </div>
          </form>
        )}

        {message && <div style={messageStyle(isError)}>{message}</div>}
      </section>
    </main>
  );
}

function FieldLabel({
  children,
  top = false,
}: {
  children: React.ReactNode;
  top?: boolean;
}) {
  return (
    <label
      style={{
        display: 'block',
        fontSize: 14,
        fontWeight: 800,
        margin: top ? '18px 0 8px' : '0 0 8px',
      }}
    >
      {children}
    </label>
  );
}

const mainStyle = {
  minHeight: '100vh',
  display: 'grid',
  placeItems: 'center',
  padding: 24,
  color: 'white',
  background: 'linear-gradient(180deg, #081120 0%, #0f172a 100%)',
  fontFamily: 'Inter, Pretendard, Arial, sans-serif',
};

const cardStyle = {
  width: '100%',
  maxWidth: 520,
  padding: 30,
  borderRadius: 26,
  border: '1px solid rgba(255,255,255,0.10)',
  background: 'rgba(255,255,255,0.055)',
  boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
  boxSizing: 'border-box' as const,
};

const inputStyle = {
  display: 'block',
  width: '100%',
  minHeight: 48,
  padding: '11px 13px',
  borderRadius: 12,
  border: '1px solid rgba(255,255,255,0.13)',
  outline: 'none',
  color: 'white',
  background: 'rgba(2,6,23,0.52)',
  fontSize: 15,
  boxSizing: 'border-box' as const,
};

const disabledInputStyle = {
  ...inputStyle,
  color: 'rgba(255,255,255,0.62)',
  background: 'rgba(148,163,184,0.08)',
  cursor: 'not-allowed',
};

const helperStyle = {
  marginTop: 7,
  color: 'rgba(255,255,255,0.46)',
  fontSize: 12,
};

const passwordFieldStyle = {
  position: 'relative' as const,
};

const passwordInputStyle = {
  ...inputStyle,
  paddingRight: 72,
};

const passwordToggleStyle = {
  position: 'absolute' as const,
  right: 10,
  top: '50%',
  transform: 'translateY(-50%)',
  border: 0,
  background: 'transparent',
  color: '#c7d2fe',
  cursor: 'pointer',
  fontSize: 13,
  fontWeight: 800,
  padding: '6px 8px',
};

const submitButtonStyle = {
  width: '100%',
  minHeight: 50,
  marginTop: 20,
  border: 0,
  borderRadius: 14,
  cursor: 'pointer',
  color: 'white',
  fontSize: 15,
  fontWeight: 900,
  background: 'linear-gradient(135deg,#4f46e5,#7c3aed)',
};

function messageStyle(isError: boolean) {
  return {
    marginTop: 18,
    padding: 12,
    borderRadius: 12,
    lineHeight: 1.55,
    fontSize: 14,
    background: isError
      ? 'rgba(239,68,68,0.12)'
      : 'rgba(16,185,129,0.12)',
    color: isError ? '#fecaca' : '#a7f3d0',
    border: isError
      ? '1px solid rgba(248,113,113,0.25)'
      : '1px solid rgba(52,211,153,0.25)',
  } as const;
}
