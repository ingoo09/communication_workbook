import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(
      'https://emkc.org/api/v2/piston/execute',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          language: 'python',
          version: '3.10.0',

          files: [
            {
              content: body.code,
            },
          ],
        }),
      }
    );

    const result = await response.json();

    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json(
      {
        success: false,
        error: String(e?.message ?? e),
      },
      {
        status: 500,
      }
    );
  }
}