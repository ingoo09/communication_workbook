'use client';

import Link from 'next/link';
import { FormEvent, ReactNode, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

type Mode = 'login' | 'signup';
type AccountType = 'student' | 'professor';

const PROFESSOR_SIGNUP_ENABLED = false;

export default function LoginPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [mode, setMode] = useState<Mode>('login');
  const [accountType, setAccountType] = useState<AccountType>('student');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [organizationCode, setOrganizationCode] = useState('');
  const [verifiedOrganizationName, setVerifiedOrganizationName] = useState('');
  const [verifiedOrganizationCode, setVerifiedOrganizationCode] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingOrganization, setCheckingOrganization] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  function clearMessage() {
    setMessage('');
    setIsError(false);
  }

  function resetRoleFields() {
    setOrganizationName('');
    setOrganizationCode('');
    setVerifiedOrganizationName('');
    setVerifiedOrganizationCode('');
    setStudentNumber('');
    clearMessage();
  }

  async function verifyOrganizationCode() {
    clearMessage();
    const code = organizationCode.trim().toUpperCase();

    if (!code) {
      setIsError(true);
      setMessage('교수에게 받은 인증코드를 입력해 주세요.');
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
        setMessage('유효하지 않은 인증코드입니다.');
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
      setMessage(error?.message ?? '인증코드 확인 중 오류가 발생했습니다.');
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

    if (
      mode === 'signup' &&
      accountType === 'professor' &&
      !PROFESSOR_SIGNUP_ENABLED
    ) {
      setIsError(true);
      setMessage('교수 회원가입은 현재 임시로 중단되어 있습니다.');
      return;
    }

    if (mode === 'signup' && !name.trim()) {
      setIsError(true);
      setMessage('이름을 입력해 주세요.');
      return;
    }

    if (mode === 'signup' && accountType === 'student') {
      const currentCode = organizationCode.trim().toUpperCase();

      if (
        !verifiedOrganizationName ||
        !verifiedOrganizationCode ||
        currentCode !== verifiedOrganizationCode
      ) {
        setIsError(true);
        setMessage('교수에게 받은 인증코드를 먼저 확인해 주세요.');
        return;
      }
    }

    if (mode === 'signup' && accountType === 'professor' && !organizationName.trim()) {
      setIsError(true);
      setMessage('소속을 입력해 주세요.');
      return;
    }

    if (mode === 'signup' && password !== passwordConfirm) {
      setIsError(true);
      setMessage('비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    setLoading(true);

    try {
      if (mode === 'login') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) throw error;
        if (!data.user) throw new Error('사용자 정보를 확인할 수 없습니다.');

        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        if (profileError) throw profileError;

        const role = profile?.role;

        if (accountType === 'student' && role !== 'student') {
          await supabase.auth.signOut();
          setIsError(true);
          setMessage('학생 계정이 아닙니다. 교수 로그인을 선택해 주세요.');
          return;
        }

        if (
          accountType === 'professor' &&
          !['professor', 'developer', 'admin'].includes(role)
        ) {
          await supabase.auth.signOut();
          setIsError(true);
          setMessage('교수 계정이 아닙니다. 학생 로그인을 선택해 주세요.');
          return;
        }

        router.push('/');
        router.refresh();
        return;
      }

      const metadata =
        accountType === 'student'
          ? {
              account_type: 'student',
              name: name.trim(),
              organization_code: verifiedOrganizationCode,
              student_number: studentNumber.trim() || null,
            }
          : {
              account_type: 'professor',
              name: name.trim(),
              organization_name: organizationName.trim(),
            };

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { data: metadata },
      });

      if (error) throw error;

      if (data.session) {
        router.push('/');
        router.refresh();
        return;
      }

      setMessage(
        accountType === 'professor'
          ? '교수 회원가입이 완료되었습니다. 이메일 인증 후 로그인하면 학생용 인증코드를 확인할 수 있습니다.'
          : '학생 회원가입이 완료되었습니다. 이메일 인증 링크를 확인해 주세요.',
      );
    } catch (error: any) {
      setIsError(true);
      setMessage(error?.message ?? '인증 처리 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }

  const isSignup = mode === 'signup';
  const passwordConfirmTouched = isSignup && passwordConfirm.length > 0;
  const passwordMatches =
    !passwordConfirmTouched || password === passwordConfirm;
  const signupPasswordMismatch =
    isSignup && passwordConfirmTouched && !passwordMatches;

  return (
    <main style={mainStyle}>
      <section style={cardStyle}>
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
            학생과 교수 계정을 구분하여 로그인하고 회원가입할 수 있습니다.
          </p>
        </div>

        <div style={segmentedContainerStyle}>
          {(['login', 'signup'] as Mode[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setMode(item);

                if (
                  item === 'signup' &&
                  !PROFESSOR_SIGNUP_ENABLED &&
                  accountType === 'professor'
                ) {
                  setAccountType('student');
                  resetRoleFields();
                }

                clearMessage();
              }}
              style={segmentButtonStyle(mode === item)}
            >
              {item === 'login' ? '로그인' : '회원가입'}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 18 }}>
          <div style={{ marginBottom: 8, fontSize: 13, fontWeight: 800, color: '#c7d2fe' }}>
            계정 유형
          </div>
          <div style={{ ...segmentedContainerStyle, marginTop: 0 }}>
            {(['student', 'professor'] as AccountType[]).map((item) => {
              const professorSignupBlocked =
                isSignup &&
                item === 'professor' &&
                !PROFESSOR_SIGNUP_ENABLED;

              return (
                <button
                  key={item}
                  type="button"
                  disabled={professorSignupBlocked}
                  onClick={() => {
                    setAccountType(item);
                    resetRoleFields();
                  }}
                  title={
                    professorSignupBlocked
                      ? '교수 회원가입은 현재 임시로 중단되어 있습니다.'
                      : undefined
                  }
                  style={{
                    ...segmentButtonStyle(accountType === item),
                    opacity: professorSignupBlocked ? 0.42 : 1,
                    cursor: professorSignupBlocked ? 'not-allowed' : 'pointer',
                  }}
                >
                  {item === 'student'
                    ? '학생'
                    : professorSignupBlocked
                      ? '교수 (준비중)'
                      : '교수'}
                </button>
              );
            })}
          </div>

          {isSignup && !PROFESSOR_SIGNUP_ENABLED && (
            <div
              style={{
                marginTop: 10,
                padding: '10px 12px',
                borderRadius: 10,
                background: 'rgba(245,158,11,0.10)',
                border: '1px solid rgba(245,158,11,0.22)',
                color: '#fde68a',
                fontSize: 13,
                lineHeight: 1.55,
              }}
            >
              교수 회원가입 준비중입니다.
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} style={{ marginTop: 22 }}>
          {isSignup && (
            <>
              <FieldLabel>이름 *</FieldLabel>
              <input
                type="text"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={accountType === 'student' ? '홍길동' : '김교수'}
                style={inputStyle}
              />

              {accountType === 'student' ? (
                <>
                  <FieldLabel top>교수 인증코드 *</FieldLabel>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8 }}>
                    <input
                      type="text"
                      value={organizationCode}
                      onChange={(event) => {
                        setOrganizationCode(event.target.value.toUpperCase());
                        setVerifiedOrganizationName('');
                        setVerifiedOrganizationCode('');
                      }}
                      placeholder="교수에게 받은 8자리 코드"
                      style={inputStyle}
                    />
                    <button
                      type="button"
                      onClick={verifyOrganizationCode}
                      disabled={checkingOrganization}
                      style={codeButtonStyle}
                    >
                      {checkingOrganization ? '확인 중' : '코드 확인'}
                    </button>
                  </div>

                  {verifiedOrganizationName && (
                    <div style={{ marginTop: 9, fontSize: 13, color: '#a7f3d0' }}>
                      ✓ {verifiedOrganizationName}
                    </div>
                  )}

                  <FieldLabel top>
                    학번 <span style={{ fontWeight: 500, color: 'rgba(255,255,255,0.55)' }}>(선택)</span>
                  </FieldLabel>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={studentNumber}
                    onChange={(event) => setStudentNumber(event.target.value)}
                    placeholder="예: 20261234"
                    style={inputStyle}
                  />
                </>
              ) : (
                <>
                  <FieldLabel top>소속 *</FieldLabel>
                  <input
                    type="text"
                    value={organizationName}
                    onChange={(event) => setOrganizationName(event.target.value)}
                    placeholder="예: ○○대학교 ○○전공"
                    style={inputStyle}
                  />
                  <p style={{ margin: '9px 0 0', color: 'rgba(255,255,255,0.55)', fontSize: 13 }}>
                    가입이 완료되면 학생들에게 전달할 인증코드가 자동 생성됩니다.
                  </p>
                </>
              )}
            </>
          )}

          <FieldLabel top={isSignup}>이메일</FieldLabel>
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={accountType === 'student' ? 'student@example.com' : 'professor@example.com'}
            style={inputStyle}
          />

          <FieldLabel top>비밀번호</FieldLabel>
          <div style={passwordFieldStyle}>
            <input
              type={showPassword ? 'text' : 'password'}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="비밀번호"
              style={passwordInputStyle}
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
              style={passwordToggleStyle}
            >
              {showPassword ? '숨기기' : '보기'}
            </button>
          </div>

          {isSignup && (
            <>
              <FieldLabel top>비밀번호 확인</FieldLabel>
              <div style={passwordFieldStyle}>
                <input
                  type={showPasswordConfirm ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={passwordConfirm}
                  onChange={(event) => setPasswordConfirm(event.target.value)}
                  placeholder="비밀번호를 한 번 더 입력"
                  style={passwordInputStyle}
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordConfirm((value) => !value)}
                  aria-label={
                    showPasswordConfirm
                      ? '비밀번호 확인 숨기기'
                      : '비밀번호 확인 보기'
                  }
                  style={passwordToggleStyle}
                >
                  {showPasswordConfirm ? '숨기기' : '보기'}
                </button>
              </div>

              {passwordConfirmTouched && (
                <div
                  style={{
                    marginTop: 8,
                    fontSize: 13,
                    fontWeight: 800,
                    color: passwordMatches ? '#a7f3d0' : '#fecaca',
                  }}
                >
                  {passwordMatches
                    ? '✓ 비밀번호가 일치합니다.'
                    : '비밀번호가 다릅니다.'}
                </div>
              )}
            </>
          )}

          {message && (
            <div style={messageStyle(isError)}>{message}</div>
          )}

          <button
            type="submit"
            disabled={loading || signupPasswordMismatch}
            style={{
              ...submitButtonStyle,
              opacity: loading || signupPasswordMismatch ? 0.55 : 1,
              cursor: loading || signupPasswordMismatch ? 'not-allowed' : 'pointer',
            }}
          >
            {loading
              ? '처리 중...'
              : mode === 'login'
                ? accountType === 'student' ? '학생 로그인' : '교수 로그인'
                : accountType === 'student' ? '학생 회원가입' : '교수 회원가입'}
          </button>
        </form>
      </section>
    </main>
  );
}

function FieldLabel({ children, top = false }: { children: ReactNode; top?: boolean }) {
  return (
    <label style={{ display: 'block', fontSize: 14, fontWeight: 800, margin: top ? '18px 0 8px' : '0 0 8px' }}>
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
  maxWidth: 480,
  padding: 30,
  borderRadius: 26,
  border: '1px solid rgba(255,255,255,0.10)',
  background: 'rgba(255,255,255,0.055)',
  boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
  boxSizing: 'border-box' as const,
};

const segmentedContainerStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 8,
  padding: 5,
  marginTop: 22,
  borderRadius: 14,
  background: 'rgba(255,255,255,0.055)',
};

function segmentButtonStyle(active: boolean) {
  return {
    padding: '10px 12px',
    border: 0,
    borderRadius: 10,
    cursor: 'pointer',
    fontWeight: 800,
    color: 'white',
    background: active ? 'linear-gradient(135deg,#4f46e5,#7c3aed)' : 'transparent',
  } as const;
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

const codeButtonStyle = {
  minWidth: 92,
  border: '1px solid rgba(255,255,255,0.13)',
  borderRadius: 12,
  cursor: 'pointer',
  color: 'white',
  background: 'rgba(99,102,241,0.20)',
  fontWeight: 800,
};

const submitButtonStyle = {
  width: '100%',
  minHeight: 52,
  marginTop: 22,
  border: 0,
  borderRadius: 15,
  cursor: 'pointer',
  color: 'white',
  fontSize: 16,
  fontWeight: 900,
  background: 'linear-gradient(135deg,#4f46e5,#7c3aed)',
};

function messageStyle(isError: boolean) {
  return {
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
  } as const;
}
