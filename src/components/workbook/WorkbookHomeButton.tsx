'use client';

import Link from 'next/link';

export default function WorkbookHomeButton() {
  return (
    <Link
      href="/"
      aria-label="교재 홈으로 돌아가기"
      style={{
        position: 'fixed',
        right: 22,
        bottom: 22,
        zIndex: 100,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        minHeight: 46,
        padding: '11px 16px',
        boxSizing: 'border-box',
        borderRadius: 999,
        textDecoration: 'none',
        background: '#111827',
        color: '#fff',
        border: '1px solid rgba(255,255,255,0.16)',
        boxShadow: '0 14px 32px rgba(15,23,42,0.28)',
        fontSize: 14,
        fontWeight: 800,
        whiteSpace: 'nowrap',
      }}
    >
      <span aria-hidden="true">⌂</span>
      교재 홈
    </Link>
  );
}
