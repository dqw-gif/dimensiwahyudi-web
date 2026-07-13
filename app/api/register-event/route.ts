import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzWg_0WTuYfwVXN_Imn3htE9lEgVsYf-utA_9nHL1vGynfFte_eUb_wL8SIjmd5sHacuA/exec';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Forward the registration data to the Google Apps Script from the server side (bypassing CORS)
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Google Apps Script returned status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Event registration proxy error:', error);
    return NextResponse.json(
      { status: 'error', message: error instanceof Error ? error.message : 'Unknown server error' },
      { status: 500 }
    );
  }
}
