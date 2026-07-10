'use client';

import React from 'react';
import Editor from '@monaco-editor/react';

type PythonProblemProps = {
  value: string;
  onChange: (value: string) => void;
  runningCode: boolean;
  codeOutput: string | null;
  plotImage: string | null;
  onRunPython: () => void;
};

export default function PythonProblem({
  value,
  onChange,
  runningCode,
  codeOutput,
  plotImage,
  onRunPython,
}: PythonProblemProps) {
  return (
    <>
      <Editor
        height="320px"
        defaultLanguage="python"
        theme="vs-dark"
        value={value}
        onChange={(nextValue) => onChange(nextValue || '')}
        options={{
          fontSize: 15,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          wordWrap: 'on',
        }}
      />

      <button
        type="button"
        onClick={onRunPython}
        disabled={runningCode}
        style={{
          marginTop: 12,
          padding: '10px 14px',
          borderRadius: 10,
          border: '1px solid #ddd',
          background: '#111827',
          color: '#fff',
          opacity: runningCode ? 0.7 : 1,
        }}
      >
        {runningCode ? '실행 중...' : '코드 실행'}
      </button>

      {codeOutput && (
        <div
          style={{
            marginTop: 12,
            padding: 12,
            borderRadius: 12,
            border: '1px solid #ddd',
            background: '#0b1020',
            color: '#e6edf3',
          }}
        >
          <div style={{ fontWeight: 900, marginBottom: 6 }}>Python 실행 결과</div>
          <pre style={{ whiteSpace: 'pre-wrap', margin: 0, lineHeight: 1.5 }}>
            {codeOutput}
          </pre>
          {plotImage && (
            <img
              src={plotImage}
              alt="plot"
              style={{
                marginTop: 16,
                maxWidth: '100%',
                borderRadius: 12,
                background: '#fff',
                padding: 10,
              }}
            />
          )}
        </div>
      )}
    </>
  );
}
