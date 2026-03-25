import { NextResponse } from 'next/server';

const GOOGLE_SHEETS_API_URL =
  'https://script.google.com/macros/s/AKfycbwrzzBRRVc0uUz6hUKbJVqwCCJa2Gjppb89Ptcjl62gJxvp-1Jt2u47TADle77n6p0ZjA/exec';

export async function GET() {
  try {
    const response = await fetch(GOOGLE_SHEETS_API_URL, {
      method: 'GET',
      cache: 'no-store',
      redirect: 'follow',
    });

    if (!response.ok) {
      return NextResponse.json(
        { ok: false, error: `Upstream failed with status ${response.status}` },
        { status: 502 }
      );
    }

    const data = await response.json();
    return NextResponse.json({ ok: true, data }, { status: 200 });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Failed to fetch portfolio data from upstream' },
      { status: 502 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.text();

    const response = await fetch(GOOGLE_SHEETS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
      cache: 'no-store',
      redirect: 'follow',
    });

    // Apps Script often returns opaque/non-standard response; treat transport success as accepted.
    if (!response.ok) {
      return NextResponse.json(
        { ok: false, error: `Upstream failed with status ${response.status}` },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Failed to submit portfolio payload to upstream' },
      { status: 502 }
    );
  }
}
