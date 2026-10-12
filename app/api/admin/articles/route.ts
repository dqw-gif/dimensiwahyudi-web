import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { ADMIN_COOKIE_NAME, verifyAdminToken } from '@/lib/admin-auth';
import { db } from '@/lib/firebase';
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  query,
  orderBy,
  getDoc,
} from 'firebase/firestore';

export type ArticleItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  category: string;
  tags?: string[];
  author?: string;
  status: 'published' | 'draft';
  publishedAt: string;
  updatedAt: string;
};

async function checkAuth(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  return verifyAdminToken(token);
}

// GET: Retrieve all Firestore articles
export async function GET(request: NextRequest) {
  const isAuth = await checkAuth(request);
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const articlesCol = collection(db, 'articles');
    const q = query(articlesCol, orderBy('publishedAt', 'desc'));
    const snapshot = await getDocs(q);

    const articles: ArticleItem[] = [];
    snapshot.forEach((d) => {
      articles.push({ id: d.id, ...d.data() } as ArticleItem);
    });

    return NextResponse.json({ success: true, articles });
  } catch (error) {
    const err = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  }
}

// POST: Create a new article
export async function POST(request: NextRequest) {
  const isAuth = await checkAuth(request);
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, excerpt, content, category, featuredImage, tags, author, status, customSlug } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    // Generate SEO friendly slug
    const cleanSlug = (customSlug || title)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const docId = cleanSlug || `post-${Date.now()}`;
    const nowIso = new Date().toISOString();

    const articleData: ArticleItem = {
      id: docId,
      slug: cleanSlug,
      title: title.trim(),
      excerpt: (excerpt || title).trim().slice(0, 200),
      content,
      featuredImage: featuredImage || 'https://dimensiwahyudi.com/opengraph-image',
      category: category || 'News',
      tags: Array.isArray(tags) ? tags : [],
      author: author || 'Tim Teknis PT Dimensi Quantum Wahyudi',
      status: status === 'draft' ? 'draft' : 'published',
      publishedAt: nowIso,
      updatedAt: nowIso,
    };

    const docRef = doc(db, 'articles', docId);
    await setDoc(docRef, articleData);

    // Instant On-Demand Revalidation
    revalidatePath('/news');
    revalidatePath(`/news/${cleanSlug}`);
    revalidatePath('/');
    revalidatePath('/sitemap.xml');

    return NextResponse.json({ success: true, article: articleData });
  } catch (error) {
    const err = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  }
}

// PUT: Update an existing article
export async function PUT(request: NextRequest) {
  const isAuth = await checkAuth(request);
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, title, excerpt, content, category, featuredImage, tags, author, status, slug } = body;

    if (!id) {
      return NextResponse.json({ error: 'Article ID is required' }, { status: 400 });
    }

    const docRef = doc(db, 'articles', id);
    const existingSnap = await getDoc(docRef);

    if (!existingSnap.exists()) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    const existingData = existingSnap.data() as ArticleItem;
    const nowIso = new Date().toISOString();

    const updatedData: ArticleItem = {
      ...existingData,
      title: title !== undefined ? title.trim() : existingData.title,
      slug: slug || existingData.slug,
      excerpt: excerpt !== undefined ? excerpt.trim().slice(0, 200) : existingData.excerpt,
      content: content !== undefined ? content : existingData.content,
      category: category || existingData.category,
      featuredImage: featuredImage || existingData.featuredImage,
      tags: Array.isArray(tags) ? tags : existingData.tags,
      author: author || existingData.author,
      status: status || existingData.status,
      updatedAt: nowIso,
    };

    await setDoc(docRef, updatedData, { merge: true });

    // Instant Revalidation
    revalidatePath('/news');
    revalidatePath(`/news/${updatedData.slug}`);
    revalidatePath('/');
    revalidatePath('/sitemap.xml');

    return NextResponse.json({ success: true, article: updatedData });
  } catch (error) {
    const err = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  }
}

// DELETE: Delete an article
export async function DELETE(request: NextRequest) {
  const isAuth = await checkAuth(request);
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Article ID is required' }, { status: 400 });
    }

    const docRef = doc(db, 'articles', id);
    const snap = await getDoc(docRef);
    const data = snap.exists() ? (snap.data() as ArticleItem) : null;

    await deleteDoc(docRef);

    // Revalidate
    revalidatePath('/news');
    if (data?.slug) {
      revalidatePath(`/news/${data.slug}`);
    }
    revalidatePath('/');
    revalidatePath('/sitemap.xml');

    return NextResponse.json({ success: true, message: 'Article deleted successfully' });
  } catch (error) {
    const err = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  }
}
