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

    // Determine target URL: Google Sheets Webhook or Formspree
    const googleSheetsUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    const formspreeId = process.env.FORMSPREE_ID || process.env.NEXT_PUBLIC_FORMSPREE_ID || 'xrearydw';
    const formspreeUrl = `https://formspree.io/f/${formspreeId}`;

    const targetUrl = googleSheetsUrl || formspreeUrl;
    const isGoogleSheets = Boolean(googleSheetsUrl);

    // Format the payload to match what the receiving API expects
    const payload = isGoogleSheets 
      ? {
          name,
          company,
          email,
          message,
          lead_type: 'Contact Form',
        }
      : {
          name,
          company,
          email,
          message,
          subject: `Contact Form Lead: ${name} (${company})`,
        };

    console.info(`Submitting contact form lead to: ${isGoogleSheets ? 'Google Sheets Web App' : 'Formspree'}`);

    const res = await fetch(targetUrl, {
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
