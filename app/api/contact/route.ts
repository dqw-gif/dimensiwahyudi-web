import { NextResponse } from 'next/server';

const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com',
  'guerrillamail.com',
  'tempmail.com',
  '10minutemail.com',
  'yopmail.com',
  'trashmail.com',
  'dispostable.com',
  'temp-mail.org',
  'sharklasers.com',
  'getnada.com',
  'maildrop.cc',
  'throwawaymail.com',
]);

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isDisposableEmail(email: string) {
  const domain = email.split('@')[1]?.toLowerCase() ?? '';
  return DISPOSABLE_DOMAINS.has(domain);
}

function getClientIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for') ?? '';
  const firstIp = forwarded.split(',')[0]?.trim();
  if (firstIp) return firstIp;
  const fallback = request.headers.get('x-real-ip') ?? '';
  return fallback.trim() || 'unknown';
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    
    const name = (body.name ?? '').trim();
    const company = (body.company ?? '').trim();
    const email = (body.email ?? '').trim().toLowerCase();
    const message = (body.message ?? '').trim();

    // Basic Validation
    if (!name || name.length < 2) {
      return NextResponse.json({ ok: false, error: 'Name is too short' }, { status: 400 });
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: 'Invalid email address' }, { status: 400 });
    }

    if (isDisposableEmail(email)) {
      return NextResponse.json({ ok: false, error: 'Disposable email addresses are not allowed' }, { status: 400 });
    }

    if (!message || message.length < 10) {
      return NextResponse.json({ ok: false, error: 'Message description is too short' }, { status: 400 });
    }

    // Direct Google Sheets Web App URL (100% Full Google Sheets)
    const googleSheetsUrl = 'https://script.google.com/macros/s/AKfycbzOVLGii1B5ZiHHIgqehgi8zeyz8SibowHogFzWKE1TvQ6N6Xtqty_E-FReLRQVE2rg/exec';

    const payload = {
      name,
      company,
      email,
      message,
      lead_type: 'Contact Form',
    };

    console.info('Submitting contact form lead directly to Google Sheets Web App');

    const res = await fetch(googleSheetsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorText = await res.text().catch(() => 'Unknown network error');
      throw new Error(`Upstream submission failed: ${res.status} ${errorText}`);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error('Contact form API error:', errorMessage);
    return NextResponse.json(
      { ok: false, error: 'Internal server error while processing your request' },
      { status: 500 }
    );
  }
}
