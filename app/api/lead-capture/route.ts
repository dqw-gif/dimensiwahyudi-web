import { NextResponse } from 'next/server';

const MIN_SUBMIT_MS = 2500;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 10;

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

type LeadKind = 'roi_unlock' | 'exit_intent_initial' | 'exit_intent_profile';

type LeadCaptureBody = {
  kind?: LeadKind;
  email?: string;
  fullName?: string;
  company?: string;
  honeypot?: string;
  startedAt?: number;
  context?: Record<string, unknown>;
};

type RateBucket = {
  count: number;
  resetAt: number;
};

const ipRateStore = new Map<string, RateBucket>();

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isDisposableEmail(email: string) {
  const domain = email.split('@')[1]?.toLowerCase() ?? '';
  return DISPOSABLE_DOMAINS.has(domain);
}

function buildSubject(kind: LeadKind) {
  if (kind === 'roi_unlock') return 'ROI Calculator Lead';
  if (kind === 'exit_intent_profile') return 'Exit Intent Profile Enrichment';
  return 'Catalog Download Lead';
}

function getClientIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for') ?? '';
  const firstIp = forwarded.split(',')[0]?.trim();
  if (firstIp) return firstIp;
  const fallback = request.headers.get('x-real-ip') ?? '';
  return fallback.trim() || 'unknown';
}

function isRateLimited(ip: string) {
  const now = Date.now();

  for (const [key, bucket] of ipRateStore.entries()) {
    if (bucket.resetAt <= now) {
      ipRateStore.delete(key);
    }
  }

  const current = ipRateStore.get(ip);
  if (!current || current.resetAt <= now) {
    ipRateStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  current.count += 1;
  ipRateStore.set(ip, current);
  return false;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadCaptureBody;
    const clientIp = getClientIp(request);

    if (isRateLimited(clientIp)) {
      return NextResponse.json({ ok: false, error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const kind = body.kind;
    const email = (body.email ?? '').trim().toLowerCase();
    const fullName = (body.fullName ?? '').trim();
    const company = (body.company ?? '').trim();
    const honeypot = (body.honeypot ?? '').trim();
    const startedAt = Number(body.startedAt ?? 0);

    if (!kind || !['roi_unlock', 'exit_intent_initial', 'exit_intent_profile'].includes(kind)) {
      return NextResponse.json({ ok: false, error: 'Invalid lead type' }, { status: 400 });
    }

    if (honeypot) {
      // Silent accept for bot traps.
      return NextResponse.json({ ok: true, accepted: false }, { status: 200 });
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 });
    }

    if (isDisposableEmail(email)) {
      return NextResponse.json({ ok: false, error: 'Disposable email is not allowed' }, { status: 400 });
    }

    if (!startedAt || !Number.isFinite(startedAt) || Date.now() - startedAt < MIN_SUBMIT_MS) {
      return NextResponse.json({ ok: false, error: 'Submission blocked by anti-spam check' }, { status: 429 });
    }

    if (kind === 'roi_unlock' && (!fullName || !company)) {
      return NextResponse.json({ ok: false, error: 'Name and company are required' }, { status: 400 });
    }

    const formId = process.env.FORMSPREE_ID || process.env.NEXT_PUBLIC_FORMSPREE_ID || 'xrearydw';
    const formspreeUrl = `https://formspree.io/f/${formId}`;

    const forwardedPayload = {
      subject: buildSubject(kind),
      lead_type: kind,
      email,
      full_name: fullName,
      company,
      context: body.context ?? {},
      source_path: request.headers.get('referer') ?? '',
      user_agent: request.headers.get('user-agent') ?? '',
      forwarded_for: request.headers.get('x-forwarded-for') ?? '',
      client_ip: clientIp,
    };

    const response = await fetch(formspreeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(forwardedPayload),
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json({ ok: false, error: 'Upstream lead endpoint failed' }, { status: 502 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false, error: 'Unexpected server error' }, { status: 500 });
  }
}
