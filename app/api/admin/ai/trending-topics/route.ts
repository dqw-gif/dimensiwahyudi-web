import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, verifyAdminToken } from '@/lib/admin-auth';
import { generateTrendingTopics } from '@/lib/ai/gemini-service';

export async function POST(request: NextRequest) {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { industry?: string; topic?: string };
    const industry = body.industry || 'FMCG & F&B';
    const topics = await generateTrendingTopics(industry, body.topic);

    return NextResponse.json({ success: true, topics });
  } catch (error) {
    console.error('Error generating trending topics:', error);
    return NextResponse.json(
      { error: (error as Error).message || 'Gagal meriset topik tren' },
      { status: 500 }
    );
  }
}
