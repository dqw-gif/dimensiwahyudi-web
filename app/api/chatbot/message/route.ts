import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, arrayUnion, increment } from 'firebase/firestore';
import { CHATBOT_SYSTEM_INSTRUCTION } from '@/lib/ai/chatbot-prompt';

// In-memory rate limiting per IP
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_MINUTE = 15;
const ipRateMap = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for') ?? '';
  const first = forwarded.split(',')[0]?.trim();
  if (first) return first;
  return request.headers.get('x-real-ip') ?? 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipRateMap.get(ip);
  if (!entry || entry.resetAt <= now) {
    ipRateMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (entry.count >= MAX_REQUESTS_PER_MINUTE) {
    return true;
  }
  entry.count += 1;
  return false;
}

function getApiKey(): string {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error('GEMINI_API_KEY is not defined in environment variables');
  }
  return key.trim();
}

function cleanAiMarkers(text: string): string {
  return text
    .replace(/—/g, ', ')
    .replace(/\s--\s/g, ', ')
    .replace(/\bdelve into\b/gi, 'meninjau')
    .replace(/\btapestry\b/gi, 'rangkaian');
}

/**
 * Call Gemini API with automatic fallback
 */
async function callGeminiChat(
  systemInstruction: string,
  history: { role: 'user' | 'model'; parts: { text: string }[] }[]
): Promise<string> {
  const apiKey = getApiKey();
  const models = ['gemini-3.5-flash-lite', 'gemini-3.5-flash', 'gemini-flash-latest'];
  let lastError: Error | null = null;

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const payload = {
        systemInstruction: {
          parts: [{ text: systemInstruction }],
        },
        contents: history,
        generationConfig: {
          temperature: 0.5,
          maxOutputTokens: 800,
        },
      };

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(`Gemini ${model} failed (${res.status}): ${JSON.stringify(errorData)}`);
      }

      const data = await res.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) {
        throw new Error(`No text generated from ${model}`);
      }

      return rawText;
    } catch (err) {
      lastError = err as Error;
      console.warn(`Gemini Chat model ${model} failed, trying fallback:`, (err as Error).message);
    }
  }

  throw lastError || new Error('Semua model Gemini gagal merespons');
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: 'Terlalu banyak permintaan. Mohon tunggu beberapa detik.' },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const sessionId = (body.sessionId ?? '').trim();
    const userMessage = (body.message ?? '').trim();

    if (!sessionId) {
      return NextResponse.json({ success: false, error: 'ID Sesi diperlukan' }, { status: 400 });
    }

    if (!userMessage || userMessage.length < 2) {
      return NextResponse.json({ success: false, error: 'Pesan pertanyaan terlalu pendek' }, { status: 400 });
    }

    if (userMessage.length > 1000) {
      return NextResponse.json({ success: false, error: 'Pesan maksimal 1.000 karakter' }, { status: 400 });
    }

    // 1. Fetch Session from Firestore
    const leadRef = doc(db, 'leads', sessionId);
    const snap = await getDoc(leadRef);

    if (!snap.exists()) {
      return NextResponse.json({ success: false, error: 'Sesi konsultasi tidak ditemukan' }, { status: 404 });
    }

    const leadData = snap.data();
    const currentChatCount = Number(leadData.chatCount ?? 0);
    const maxChats = Number(leadData.maxChats ?? 5);

    // 2. Strict Server-side Quota Check
    if (currentChatCount >= maxChats) {
      return NextResponse.json({
        success: false,
        quotaExceeded: true,
        remainingChats: 0,
        reply: 'Kuota diskusi interaktif (5 pertanyaan) telah terpenuhi. Tim sales & engineering kami siap melanjutkan konsultasi detail melalui WhatsApp atau email resmi DQW.',
      });
    }

    // 3. Format Conversation History for Gemini
    const existingMessages: Array<{ sender: string; text: string }> = leadData.messages || [];
    
    // Take last 8 messages for context to keep within fast token limits
    const recentMessages = existingMessages.slice(-8);

    const geminiContents: { role: 'user' | 'model'; parts: { text: string }[] }[] = [];

    // Context intro with user profile
    geminiContents.push({
      role: 'user',
      parts: [
        {
          text: `Halo, nama saya ${leadData.name || 'User'} dari ${leadData.company || 'Pabrik'}. Saya ingin berkonsultasi mengenai solusi pengangkatan ergonomis di pabrik kami.`,
        },
      ],
    });

    geminiContents.push({
      role: 'model',
      parts: [
        {
          text: `Halo Pak/Bu ${leadData.name || ''} dari ${leadData.company || ''}. Senang bisa berdiskusi dengan Anda. Silakan sampaikan tantangan handling di lini pabrik Anda.`,
        },
      ],
    });

    for (const msg of recentMessages) {
      if (msg.sender === 'user') {
        geminiContents.push({
          role: 'user',
          parts: [{ text: msg.text }],
        });
      } else if (msg.sender === 'assistant') {
        geminiContents.push({
          role: 'model',
          parts: [{ text: msg.text.replace(/\[TRIGGER_COMMERCIAL_ACTION\]/g, '') }],
        });
      }
    }

    // Append new user message
    geminiContents.push({
      role: 'user',
      parts: [{ text: userMessage }],
    });

    // 4. Generate AI Reply with strict instruction
    let rawReply = await callGeminiChat(CHATBOT_SYSTEM_INSTRUCTION, geminiContents);

    // 5. Check if Commercial Guardrail was triggered
    const isCommercial = rawReply.includes('[TRIGGER_COMMERCIAL_ACTION]');
    const cleanedReply = cleanAiMarkers(rawReply.replace(/\[TRIGGER_COMMERCIAL_ACTION\]/g, '').trim());

    const nowIso = new Date().toISOString();
    const newChatCount = currentChatCount + 1;
    const remainingChats = Math.max(0, maxChats - newChatCount);

    const userMsgObj = {
      sender: 'user',
      text: userMessage,
      timestamp: nowIso,
    };

    const assistantMsgObj = {
      sender: 'assistant',
      text: cleanedReply,
      timestamp: nowIso,
      isCommercial,
    };

    // 6. Update Firestore
    try {
      await updateDoc(leadRef, {
        messages: arrayUnion(userMsgObj, assistantMsgObj),
        chatCount: increment(1),
        message: `Tanya [${newChatCount}/5]: "${userMessage.slice(0, 100)}${userMessage.length > 100 ? '...' : ''}"`,
        updatedAt: nowIso,
      });
    } catch (updateErr) {
      console.error('Failed to update chat history in Firestore:', updateErr);
    }

    return NextResponse.json({
      success: true,
      reply: cleanedReply,
      chatCount: newChatCount,
      remainingChats,
      quotaExceeded: remainingChats === 0,
      isCommercial,
    });
  } catch (error) {
    console.error('Chatbot message API error:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message || 'Gagal memproses pesan' },
      { status: 500 }
    );
  }
}
