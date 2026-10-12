// services/articles.ts
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore';
import type { Post, PostSummary } from '@/types/wordpress';
import postsBackup from '@/data/wordpress-posts.json';

// Helper to format Firestore ArticleItem into standard Post type
function formatFirestoreArticle(data: Record<string, unknown>, docId: string): Post {
  const title = (data.title as string) || '';
  const slug = (data.slug as string) || docId;
  const excerpt = (data.excerpt as string) || '';
  const content = (data.content as string) || '';
  const categoryName = (data.category as string) || 'News';
  const categorySlug = categoryName.toLowerCase().replace(/\s+/g, '-');
  const imageUrl = (data.featuredImage as string) || 'https://dimensiwahyudi.com/opengraph-image';
  const authorName = (data.author as string) || 'Tim Teknis PT Dimensi Quantum Wahyudi';
  const dateStr = (data.publishedAt as string) || new Date().toISOString();

  return {
    id: docId,
    slug,
    title,
    excerpt,
    content,
    date: dateStr,
    featuredImage: {
      node: {
        sourceUrl: imageUrl,
      },
    },
    author: {
      node: {
        name: authorName,
      },
    },
    categories: {
      nodes: [
        {
          name: categoryName,
          slug: categorySlug,
        },
      ],
    },
  };
}

/**
 * Fetch all published articles from Firestore
 */
export async function getFirestoreArticles(): Promise<Post[]> {
  try {
    const articlesCol = collection(db, 'articles');
    const q = query(articlesCol, where('status', '==', 'published'));
    const snapshot = await getDocs(q);

    const articles: Post[] = [];
    snapshot.forEach((docSnap) => {
      articles.push(formatFirestoreArticle(docSnap.data(), docSnap.id));
    });

    return articles;
  } catch (error) {
    console.warn('Failed to fetch articles from Firestore:', error);
    return [];
  }
}

/**
 * Fetch single published article by slug from Firestore
 */
export async function getFirestoreArticleBySlug(slug: string): Promise<Post | null> {
  try {
    const docRef = doc(db, 'articles', slug);
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      const data = snap.data();
      if (data.status === 'published') {
        return formatFirestoreArticle(data, snap.id);
      }
    }
  } catch (error) {
    console.warn(`Failed to fetch article slug ${slug} from Firestore:`, error);
  }
  return null;
}

/**
 * Unified getter: Merges Firestore articles with existing WordPress backup articles
 */
export async function getAllUnifiedArticles(): Promise<PostSummary[]> {
  const firestoreArticles = await getFirestoreArticles();
  const legacyArticles = (postsBackup as unknown as PostSummary[]) || [];

  // Index by slug to avoid duplicates (Firestore takes precedence)
  const map = new Map<string, PostSummary>();

  for (const fa of firestoreArticles) {
    map.set(fa.slug, {
      id: fa.id,
      slug: fa.slug,
      title: fa.title,
      excerpt: fa.excerpt,
      date: fa.date,
      featuredImage: fa.featuredImage,
      categories: fa.categories,
    });
  }

  for (const la of legacyArticles) {
    if (!map.has(la.slug)) {
      map.set(la.slug, la);
    }
  }

  // Sort by date desc
  return Array.from(map.values()).sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

/**
 * Unified getter for single post detail
 */
export async function getUnifiedArticleBySlug(slug: string): Promise<Post | null> {
  // 1. Check Firestore first
  const fsPost = await getFirestoreArticleBySlug(slug);
  if (fsPost) {
    return fsPost;
  }

  // 2. Check local backup articles
  const legacy = (postsBackup as unknown as Post[]).find((p) => p.slug === slug);
  if (legacy) {
    return legacy;
  }

  return null;
}

/**
 * Unified getter for related articles
 */
export async function getRelatedArticles(categoryName: string, excludeSlug: string): Promise<PostSummary[]> {
  const allArticles = await getAllUnifiedArticles();
  return allArticles
    .filter((a) => {
      if (a.slug === excludeSlug) return false;
      return a.categories?.nodes?.some((c) => c.name.toLowerCase() === categoryName.toLowerCase());
    })
    .slice(0, 3);
}
