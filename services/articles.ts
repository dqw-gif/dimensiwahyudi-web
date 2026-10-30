// services/articles.ts
import { cache } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore';
import type { Post, PostSummary } from '@/types/wordpress';
import postsBackup from '@/data/wordpress-posts.json';

function cleanEditorialPunctuation(text: string): string {
  if (!text) return '';
  return text
    .replace(/\s*(?:—|&#8212;|&mdash;)\s*/g, ' - ');
}

// Pre-index local backup articles once at module load for O(1) zero-CPU lookup
const LEGACY_POSTS_LIST: Post[] = ((postsBackup as unknown as Post[]) || []).map((la) => ({
  ...la,
  title: cleanEditorialPunctuation(la.title || ''),
  excerpt: cleanEditorialPunctuation(la.excerpt || ''),
  content: cleanEditorialPunctuation(la.content || ''),
  author: la.author?.node?.name ? la.author : { node: { name: 'DQW Technical Editorial' } },
}));

const LEGACY_POSTS_BY_SLUG = new Map<string, Post>(
  LEGACY_POSTS_LIST.map((post) => [post.slug, post])
);

// Global in-memory TTL cache (5 minutes) persisting across Next.js Fast Refresh / Turbopack reloads
const CACHE_TTL_MS = 5 * 60 * 1000;

interface GlobalArticlesCache {
  articles: Post[] | null;
  bySlug: Map<string, Post> | null;
  timestamp: number;
  inflight: Promise<Post[]> | null;
}

const globalCache: GlobalArticlesCache =
  (globalThis as unknown as { __articlesCache?: GlobalArticlesCache }).__articlesCache || {
    articles: null,
    bySlug: null,
    timestamp: 0,
    inflight: null,
  };

(globalThis as unknown as { __articlesCache?: GlobalArticlesCache }).__articlesCache = globalCache;

export function invalidateArticlesCache(): void {
  globalCache.articles = null;
  globalCache.bySlug = null;
  globalCache.timestamp = 0;
  globalCache.inflight = null;
}

// Helper to format Firestore ArticleItem into standard Post type
function formatFirestoreArticle(data: Record<string, unknown>, docId: string): Post {
  const title = cleanEditorialPunctuation((data.title as string) || '');
  const slug = (data.slug as string) || docId;
  const excerpt = cleanEditorialPunctuation((data.excerpt as string) || '');
  const content = cleanEditorialPunctuation((data.content as string) || '');
  const categoryName = (data.category as string) || 'News';
  const categorySlug = categoryName.toLowerCase().replace(/\s+/g, '-');
  
  let imageUrl = 'https://dimensiwahyudi.com/opengraph-image';
  if (typeof data.featuredImage === 'string' && data.featuredImage.trim()) {
    imageUrl = data.featuredImage.trim();
  } else if (data.featuredImage && typeof data.featuredImage === 'object') {
    const imgObj = data.featuredImage as { node?: { sourceUrl?: string }; url?: string; src?: string };
    imageUrl = imgObj.node?.sourceUrl || imgObj.url || imgObj.src || imageUrl;
  }

  const rawAuthor = (data.author as string) || '';
  const authorName = rawAuthor && !rawAuthor.toLowerCase().includes('dimensi quantum') && !rawAuthor.toLowerCase().includes('tim teknis') && !rawAuthor.toLowerCase().includes('admin')
    ? rawAuthor
    : 'DQW Technical Editorial';
  const dateStr = (data.publishedAt as string) || (data.date as string) || new Date().toISOString();

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
 * Fetch all published articles from Firestore (with 5-min in-memory TTL cache + concurrent request coalescing)
 */
export async function getFirestoreArticles(): Promise<Post[]> {
  const now = Date.now();
  if (globalCache.articles && now - globalCache.timestamp < CACHE_TTL_MS) {
    return globalCache.articles;
  }

  if (globalCache.inflight) {
    return globalCache.inflight;
  }

  globalCache.inflight = (async () => {
    try {
      const articlesCol = collection(db, 'articles');
      const q = query(articlesCol, where('status', '==', 'published'));
      
      // 3.5s timeout safeguard against Firestore network hangs
      const fetchPromise = getDocs(q);
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Firestore fetch timeout (3.5s)')), 3500)
      );

      const snapshot = await Promise.race([fetchPromise, timeoutPromise]);

      const articles: Post[] = [];
      const slugMap = new Map<string, Post>();
      snapshot.forEach((docSnap) => {
        const formatted = formatFirestoreArticle(docSnap.data(), docSnap.id);
        articles.push(formatted);
        slugMap.set(formatted.slug, formatted);
      });

      globalCache.articles = articles;
      globalCache.bySlug = slugMap;
      globalCache.timestamp = Date.now();
      return articles;
    } catch (error) {
      console.warn('Failed to fetch articles from Firestore:', error);
      return globalCache.articles || [];
    } finally {
      globalCache.inflight = null;
    }
  })();

  return globalCache.inflight;
}

/**
 * Fetch single published article by slug from Firestore (uses warm in-memory map first)
 */
export async function getFirestoreArticleBySlug(slug: string): Promise<Post | null> {
  // Use warm in-memory map when available to avoid per-slug Firestore network roundtrips
  if (!globalCache.bySlug || Date.now() - globalCache.timestamp >= CACHE_TTL_MS) {
    await getFirestoreArticles();
  }
  if (globalCache.bySlug) {
    return globalCache.bySlug.get(slug) || null;
  }

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
export const getAllUnifiedArticles = cache(async (): Promise<PostSummary[]> => {
  const firestoreArticles = await getFirestoreArticles();

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

  for (const la of LEGACY_POSTS_LIST) {
    if (!map.has(la.slug)) {
      map.set(la.slug, {
        id: la.id,
        slug: la.slug,
        title: la.title,
        excerpt: la.excerpt,
        date: la.date,
        featuredImage: la.featuredImage,
        categories: la.categories,
      });
    }
  }

  // Sort by date desc
  return Array.from(map.values()).sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
});

/**
 * Unified getter for single post detail (deduplicated across generateMetadata + Page via React.cache)
 */
export const getUnifiedArticleBySlug = cache(async (slug: string): Promise<Post | null> => {
  // 1. Check Firestore (via warm in-memory map) first
  const fsPost = await getFirestoreArticleBySlug(slug);
  if (fsPost) {
    return fsPost;
  }

  // 2. O(1) lookup in local backup articles map
  return LEGACY_POSTS_BY_SLUG.get(slug) || null;
});

/**
 * Unified getter for related articles
 */
export const getRelatedArticles = cache(async (categoryName: string, excludeSlug: string): Promise<PostSummary[]> => {
  const allArticles = await getAllUnifiedArticles();
  const targetCategory = categoryName.toLowerCase();
  return allArticles
    .filter((a) => {
      if (a.slug === excludeSlug) return false;
      return a.categories?.nodes?.some((c) => c.name.toLowerCase() === targetCategory);
    })
    .slice(0, 3);
});
