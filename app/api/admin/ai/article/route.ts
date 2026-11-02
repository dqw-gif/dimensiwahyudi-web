import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, verifyAdminToken } from '@/lib/admin-auth';
import { db } from '@/lib/firebase';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { generateFullArticle, type FullArticleInput } from '@/lib/ai/gemini-service';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await request.json()) as FullArticleInput;
    if (!body.outline || !body.outline.title) {
      return NextResponse.json({ error: 'Kerangka outline artikel wajib disertakan' }, { status: 400 });
    }

    // Retrieve existing articles for internal linking context
    let existingArticles: { title: string; slug: string; category?: string }[] = [];
    try {
      const articlesCol = collection(db, 'articles');
      const q = query(articlesCol, limit(50));
      const snapshot = await getDocs(q);
      snapshot.forEach((d) => {
        const data = d.data();
        if (data.title && data.slug) {
          existingArticles.push({
            title: data.title,
            slug: data.slug,
            category: data.category,
          });
        }
      });
    } catch (e) {
      console.warn('Failed to load from Firestore, falling back to local json:', e);
      // Fallback to local posts if available
      try {
        const postsFile = path.join(process.cwd(), 'latest_posts.json');
        if (fs.existsSync(postsFile)) {
          const raw = JSON.parse(fs.readFileSync(postsFile, 'utf8'));
          if (Array.isArray(raw)) {
            existingArticles = raw.slice(0, 40).map((p: any) => ({
              title: p.title,
              slug: p.slug,
              category: p.categoryName,
            }));
          }
        }
      } catch (err) {
        console.warn('Fallback posts read error:', err);
      }
    }

    const article = await generateFullArticle({
      ...body,
      existingArticles,
    });

    return NextResponse.json({ success: true, article });
  } catch (error) {
    console.error('Error in AI article generator API:', error);
    return NextResponse.json(
      { error: (error as Error).message || 'Gagal menghasilkan artikel utuh' },
      { status: 500 }
    );
  }
}
