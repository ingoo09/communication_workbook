'use client';

import Link from 'next/link';
import { FormEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

type Mode = 'login' | 'signup';

export default function LoginPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [organizationCode, setOrganizationCode] = useState('');
  const [verifiedOrganizationName, setVerifiedOrganizationName] = useState('');
  const [verifiedOrganizationCode, setVerifiedOrganizationCode] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingOrganization, setCheckingOrganization] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  function clearMessage() {
    setMessage('');
    setIsError(false);
  }

  function resetSignupVerification() {
    setVerifiedOrganizationName('');
    setVerifiedOrganizationCode('');
  }

  async function verifyOrganizationCode() {
    clearMessage();

    const code = organizationCode.trim().toUpperCase();

    if (!code) {
      setIsError(true);
      setMessage('소속 코드를 입력해 주세요.');
      return;
    }

    setCheckingOrganization(true);

    try {
      const { data, error } = await supabase.rpc('get_organization_by_code', {
        p_code: code,
      });

      if (error) throw error;

      const organization = Array.isArray(data) ? data[0] : data;

      if (!organization?.organization_id) {
        setVerifiedOrganizationName('');
        setVerifiedOrganizationCode('');
        setIsError(true);
        setMessage('유효하지 않은 소속 코드입니다.');
        return;
      }

      setOrganizationCode(code);
      setVerifiedOrganizationCode(code);
      setVerifiedOrganizationName(organization.organization_name);
      setMessage(`소속이 확인되었습니다: ${organization.organization_name}`);
    } catch (error: any) {
      setVerifiedOrganizationName('');
      setVerifiedOrganizationCode('');
      setIsError(true);
      setMessage(error?.message ?? '소속 코드 확인 중 오류가 발생했습니다.');
    } finally {
      setCheckingOrganization(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    clearMessage();

    if (!email.trim() || !password) {
      setIsError(true);
      setMessage('이메일과 비밀번호를 입력해 주세요.');
      return;
    }

    if (mode === 'signup' && !name.trim()) {
      setIsError(true);
      setMessage('이름을 입력해 주세요.');
      return;
    }

    if (mode === 'signup') {
      const currentCode = organizationCode.trim().toUpperCase();

      if (
        !verifiedOrganizationName ||
        !verifiedOrganizationCode ||
        currentCode !== verifiedOrganizationCode
      ) {
        setIsError(true);
        setMessage('소속 코드를 먼저 확인해 주세요.');
        return;
      }
    }

    if (mode === 'signup' && password !== passwordConfirm) {
      setIsError(true);
      setMessage('비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    setLoading(true);

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) throw error;

        router.push('/');
        router.refresh();
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            name: name.trim(),
            organization_code: verifiedOrganizationCode,
            student_number: studentNumber.trim() || null,
          },
        },
      });

      if (error) throw error;

      if (data.session) {
        router.push('/');
        router.refresh();
        return;
      }

      setMessage('회원가입 요청이 완료되었습니다. 이메일 인증 링크를 확인해 주세요.');
    } catch (error: any) {
      setIsError(true);
      setMessage(error?.message ?? '인증 처리 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }


  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: 24,
        color: 'white',
        background: 'linear-gradient(180deg, #081120 0%, #0f172a 100%)',
        fontFamily: 'Inter, Pretendard, Arial, sans-serif',
      }}
    >
      <section
        style={{
          width: '100%',
          maxWidth: 460,
          padding: 30,
          borderRadius: 26,
          border: '1px solid rgba(255,255,255,0.10)',
          background: 'rgba(255,255,255,0.055)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
          boxSizing: 'border-box',
        }}
      >
        <Link href="/" style={{ color: '#c7d2fe', textDecoration: 'none', fontSize: 14 }}>
          ← 교재 홈
        </Link>

        <div style={{ marginTop: 22 }}>
          <div style={{ fontSize: 13, color: '#a5b4fc', fontWeight: 800 }}>
            COMMUNICATION WORKBOOK
          </div>

          <h1 style={{ margin: '8px 0 0', fontSize: 32 }}>
            {mode === 'login' ? '계정 로그인' : '계정 만들기'}
          </h1>

          <p style={{ marginTop: 10, lineHeight: 1.65, color: 'rgba(255,255,255,0.68)' }}>
            로그인하면 이후 답안, 채점 결과와 학습 History를 사용자 계정에 연결할 수 있습니다.
          </p>
        </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 8,
              padding: 5,
              marginTop: 22,
              borderRadius: 14,
              background: 'rgba(255,255,255,0.055)',
            }}
          >
            {(['login', 'signup'] as Mode[]).map((item) => {
              const active = mode === item;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setMode(item);
                    resetSignupVerification();
                    clearMessage();
                  }}
                  style={{
                    padding: '10px 12px',
                    border: 0,
                    borderRadius: 10,
                    cursor: 'pointer',
                    fontWeight: 800,
                    color: 'white',
                    background: active
                      ? 'linear-gradient(135deg,#4f46e5,#7c3aed)'
                      : 'transparent',
                  }}
                >
                  {item === 'login' ? '로그인' : '회원가입'}
                </button>
              );
            })}
          </div>

        <form onSubmit={handleSubmit} style={{ marginTop: 22 }}>
              {mode === 'signup' && (
                <>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 14,
                      fontWeight: 800,
                      marginBottom: 8,
                    }}
                  >
                    이름 <span style={{ color: '#a5b4fc' }}>*</span>
                  </label>

                  <input
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="홍길동"
                    style={inputStyle}
                  />

                  <label
                    style={{
                      display: 'block',
                      fontSize: 14,
                      fontWeight: 800,
                      margin: '18px 0 8px',
                    }}
                  >
                    소속 코드 <span style={{ color: '#a5b4fc' }}>*</span>
                  </label>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8 }}>
                    <input
                      type="text"
                      value={organizationCode}
                      onChange={(event) => {
                        setOrganizationCode(event.target.value.toUpperCase());
                        setVerifiedOrganizationName('');
                        setVerifiedOrganizationCode('');
                      }}
                      placeholder="예: A1B2C3D4"
                      style={inputStyle}
                    />

                    <button
                      type="button"
                      onClick={verifyOrganizationCode}
                      disabled={checkingOrganization}
                      style={{
                        minWidth: 86,
                        border: '1px solid rgba(255,255,255,0.13)',
                        borderRadius: 12,
                        cursor: checkingOrganization ? 'wait' : 'pointer',
                        color: 'white',
                        background: 'rgba(99,102,241,0.20)',
                        fontWeight: 800,
                      }}
                    >
                      {checkingOrganization ? '확인 중' : '코드 확인'}
                    </button>
                  </div>

                  {verifiedOrganizationName && (
                    <div
                      style={{
                        marginTop: 9,
                        fontSize: 13,
                        color: '#a7f3d0',
                        lineHeight: 1.5,
                      }}
                    >
                      ✓ {verifiedOrganizationName}
                    </div>
                  )}

                  <label
                    style={{
                      display: 'block',
                      fontSize: 14,
                      fontWeight: 800,
                      margin: '18px 0 8px',
                    }}
                  >
                    학번{' '}
                    <span
                      style={{
                        fontWeight: 500,
                        color: 'rgba(255,255,255,0.55)',
                      }}
                    >
                      (선택)
                    </span>
                  </label>

                  <input
                    type="text"
                    inputMode="numeric"
                    value={studentNumber}
                    onChange={(event) => setStudentNumber(event.target.value)}
                    placeholder="예: 20261234"
                    style={inputStyle}
                  />
                </>
              )}

              <label
                style={{
                  display: 'block',
                  fontSize: 14,
                  fontWeight: 800,
                  margin: mode === 'signup' ? '18px 0 8px' : '0 0 8px',
                }}
              >
                이메일
              </label>

              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="student@example.com"
                style={inputStyle}
              />

              <label
                style={{
                  display: 'block',
                  fontSize: 14,
                  fontWeight: 800,
                  margin: '18px 0 8px',
                }}
              >
                비밀번호
              </label>

              <input
                type="password"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="비밀번호"
                style={inputStyle}
              />

              {mode === 'signup' && (
                <>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 14,
                      fontWeight: 800,
                      margin: '18px 0 8px',
                    }}
                  >
                    비밀번호 확인
                  </label>

                  <input
                    type="password"
                    autoComplete="new-password"
                    value={passwordConfirm}
                    onChange={(event) => setPasswordConfirm(event.target.value)}
                    placeholder="비밀번호를 한 번 더 입력"
                    style={inputStyle}
                  />
                </>
              )}

          {message && (
            <div
              style={{
                marginTop: 16,
                padding: 12,
                borderRadius: 12,
                lineHeight: 1.55,
                fontSize: 14,
                background: isError ? 'rgba(239,68,68,0.12)' : 'rgba(16,185,129,0.12)',
                color: isError ? '#fecaca' : '#a7f3d0',
                border: isError
                  ? '1px solid rgba(248,113,113,0.25)'
                  : '1px solid rgba(52,211,153,0.25)',
              }}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              minHeight: 52,
              marginTop: 22,
              border: 0,
              borderRadius: 15,
              cursor: loading ? 'wait' : 'pointer',
              color: 'white',
              fontSize: 16,
              fontWeight: 900,
              background: 'linear-gradient(135deg,#4f46e5,#7c3aed)',
              opacity: loading ? 0.65 : 1,
            }}
          >
            {loading ? '처리 중...' : mode === 'login' ? '로그인' : '회원가입'}
          </button>


        </form>
      </section>
    </main>
  );
}

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
