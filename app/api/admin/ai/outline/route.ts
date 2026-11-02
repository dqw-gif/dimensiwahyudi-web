import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, verifyAdminToken } from '@/lib/admin-auth';
import { generateArticleOutline, type OutlineInput } from '@/lib/ai/gemini-service';

export async function POST(request: NextRequest) {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await request.json()) as OutlineInput;
    if (!body.topic || !body.topic.trim()) {
      return NextResponse.json({ error: 'Topik artikel wajib diisi' }, { status: 400 });
    }

    const outline = await generateArticleOutline(body);
    return NextResponse.json({ success: true, outline });
  } catch (error) {
    console.error('Error in AI outline API:', error);
    return NextResponse.json(
      { error: (error as Error).message || 'Gagal membuat kerangka artikel' },
      { status: 500 }
    );
  }
}
