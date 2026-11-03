import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

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

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const name = (body.name ?? '').trim();
    const company = (body.company ?? '').trim();
    const phone = (body.phone ?? '').trim();
    const email = (body.email ?? '').trim().toLowerCase();

    // 1. Validation
    if (!name || name.length < 2) {
      return NextResponse.json({ success: false, error: 'Nama penanggung jawab wajib diisi (min. 2 karakter)' }, { status: 400 });
    }

    if (!company || company.length < 2) {
      return NextResponse.json({ success: false, error: 'Nama perusahaan / PT wajib diisi' }, { status: 400 });
    }

    if (!phone || phone.replace(/\D/g, '').length < 8) {
      return NextResponse.json({ success: false, error: 'Nomor WhatsApp / telepon wajib valid (min. 8 digit)' }, { status: 400 });
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ success: false, error: 'Format email tidak valid' }, { status: 400 });
    }

    if (isDisposableEmail(email)) {
      return NextResponse.json({ success: false, error: 'Email sementara (disposable email) tidak diizinkan' }, { status: 400 });
    }

    const sessionId = `chat-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const nowIso = new Date().toISOString();

    const initialWelcomeMessage = {
      sender: 'assistant' as const,
      text: `Halo Pak/Bu **${name}** dari **${company}**! Selamat datang di PT Dimensi Quantum Wahyudi.\n\nSaya adalah Technical Consultant yang siap membantu Anda menganalisis kebutuhan sistem pengangkatan ergonomis (Schmalz & Binar Handling) serta kepatuhan standar K3 di pabrik Anda.\n\nAda beban atau proses handling apa yang ingin dioptimasi hari ini? *(Sisa Kuota: 5 Pertanyaan)*`,
      timestamp: nowIso,
    };

    // 2. Save lead & initial chat session to Firestore
    try {
      await setDoc(doc(db, 'leads', sessionId), {
        id: sessionId,
        name,
        company,
        phone,
        email,
        lead_type: 'AI Chatbot Consultation',
        status: 'new',
        chatCount: 0,
        maxChats: 5,
        messages: [initialWelcomeMessage],
        message: 'Memulai sesi konsultasi AI Virtual Engineer Chatbot di website',
        createdAt: nowIso,
        updatedAt: nowIso,
      });
    } catch (dbErr) {
      console.error('Firestore chat session creation error:', dbErr);
      // Non-fatal fallback: still allow session to proceed
    }

    // 3. Mirror Lead into Google Sheets via Web App
    try {
      const googleSheetsUrl = 'https://script.google.com/macros/s/AKfycbzOVLGii1B5ZiHHIgqehgi8zeyz8SibowHogFzWKE1TvQ6N6Xtqty_E-FReLRQVE2rg/exec';
      fetch(googleSheetsUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          company,
          phone,
          email,
          message: 'Memulai sesi konsultasi AI Virtual Engineer Chatbot di website',
          lead_type: 'AI Chatbot Consultation',
        }),
      }).catch((err) => console.warn('Google Sheets mirror warning (non-fatal):', err));
    } catch (sheetErr) {
      console.warn('Google Sheets fetch warning:', sheetErr);
    }

    return NextResponse.json({
      success: true,
      sessionId,
      initialMessage: initialWelcomeMessage,
      remainingChats: 5,
      clientName: name,
      companyName: company,
    });
  } catch (err) {
    console.error('Error creating chatbot session:', err);
    return NextResponse.json(
      { success: false, error: 'Gagal membuat sesi konsultasi' },
      { status: 500 }
    );
  }
}
