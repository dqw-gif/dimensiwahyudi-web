import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { ADMIN_COOKIE_NAME, verifyAdminToken } from '@/lib/admin-auth';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { getAllPosts } from '@/services/wordpress';

export async function POST(request: NextRequest) {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const isAuth = await verifyAdminToken(token);

  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    console.log('[SYNC] Starting manual sync from WordPress to Firebase Firestore...');
    const wpPosts = await getAllPosts({ revalidate: 0 });

    if (!Array.isArray(wpPosts) || wpPosts.length === 0) {
      return NextResponse.json({ success: false, error: 'Tidak ada artikel yang dapat ditarik dari WordPress' }, { status: 400 });
    }

    let syncedCount = 0;
    const nowIso = new Date().toISOString();

    for (const post of wpPosts) {
      if (!post.slug) continue;

      const slug = post.slug;
      const categoryName = post.categories?.nodes?.[0]?.name || 'News';
      const featuredImage = post.featuredImage?.node?.sourceUrl || 'https://dimensiwahyudi.com/opengraph-image';
      const rawPost = post as Record<string, any>;
      const authorName = rawPost.author?.node?.name || 'Tim Teknis PT Dimensi Quantum Wahyudi';
      const publishedAt = post.date ? new Date(post.date).toISOString() : nowIso;

      const articleData = {
        id: slug,
        slug: slug,
        title: post.title || 'Untitled',
        excerpt: (post.excerpt || post.title || '').replace(/<[^>]+>/g, '').trim().slice(0, 250),
        content: rawPost.content || post.excerpt || '',
        category: categoryName,
        featuredImage: featuredImage,
        author: authorName,
        status: 'published',
        publishedAt: publishedAt,
        updatedAt: nowIso,
        syncedAt: nowIso,
        source: 'wordpress_sync',
      };

      await setDoc(doc(db, 'articles', slug), articleData, { merge: true });
      syncedCount++;
    }

    // Revalidate public news pages
    revalidatePath('/news');
    revalidatePath('/news/[slug]', 'page');

    console.log(`[SYNC] Berhasil sinkronisasi ${syncedCount} artikel ke Firebase.`);
    return NextResponse.json({
      success: true,
      syncedCount,
      message: `Berhasil menyinkronkan ${syncedCount} artikel dari WordPress ke Firebase!`,
    });
  } catch (error) {
    const err = error instanceof Error ? error.message : String(error);
    console.error('[SYNC] Gagal sinkronisasi WordPress:', err);
    return NextResponse.json({ success: false, error: `Gagal sinkronisasi: ${err}` }, { status: 500 });
  }
}
