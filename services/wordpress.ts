
// services/wordpress.ts

type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message?: string }>;
};

type FetchOptions = {
  variables?: Record<string, unknown>;
  revalidate?: number;
  cacheKey: string;
  retries?: number;
  timeoutMs?: number;
  fallbackTtlSec?: number;
};

const DEFAULT_RETRIES = 2;
const DEFAULT_TIMEOUT_MS = 12000;
const RETRY_BASE_DELAY_MS = 350;
const DEFAULT_FALLBACK_TTL_SEC = 60 * 60 * 6;

const BREAKER_FAILURE_THRESHOLD = 4;
const BREAKER_COOLDOWN_MS = 30_000;
const ALERT_WINDOW_REQUEST_MIN = 20;
const ALERT_MIN_INTERVAL_MS = 5 * 60 * 1000;

// Cache sederhana di level process untuk fallback saat WP API bermasalah sementara.
const staleCache = new Map<string, unknown>();

const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;
const hasPersistentCache = Boolean(upstashUrl && upstashToken);

type CircuitState = 'closed' | 'open';
const breaker = {
  state: 'closed' as CircuitState,
  failureCount: 0,
  openedAt: 0,
};

const reliabilityMetrics = {
  requests: 0,
  failures: 0,
  fallbackHits: 0,
  cacheWrites: 0,
  cacheReadHits: 0,
  cacheReadMisses: 0,
  lastError: null as string | null,
  lastErrorAt: 0,
  lastAlertAt: 0,
};

function persistentKey(cacheKey: string) {
  return `wp:cache:${cacheKey}`;
}

async function redisCommand(command: Array<string | number>) {
  if (!hasPersistentCache || !upstashUrl || !upstashToken) {
    return null;
  }

  const res = await fetch(upstashUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${upstashToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
  });

  if (!res.ok) {
    throw new Error(`Persistent cache error: ${res.status} ${res.statusText}`);
  }

  return (await res.json()) as { result?: unknown };
}

async function persistentCacheGet<T>(cacheKey: string): Promise<T | null> {
  if (!hasPersistentCache) {
    return null;
  }

  try {
    const response = await redisCommand(['GET', persistentKey(cacheKey)]);
    const raw = response?.result;
    if (typeof raw === 'string' && raw.length > 0) {
      reliabilityMetrics.cacheReadHits += 1;
      return JSON.parse(raw) as T;
    }
    reliabilityMetrics.cacheReadMisses += 1;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`Persistent cache GET failed for ${cacheKey}: ${message}`);
  }

  return null;
}

async function persistentCacheSet<T>(cacheKey: string, value: T, ttlSec: number) {
  if (!hasPersistentCache) {
    return;
  }

  try {
    await redisCommand(['SET', persistentKey(cacheKey), JSON.stringify(value), 'EX', ttlSec]);
    reliabilityMetrics.cacheWrites += 1;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`Persistent cache SET failed for ${cacheKey}: ${message}`);
  }
}

function isCircuitOpen() {
  if (breaker.state !== 'open') {
    return false;
  }

  if (Date.now() - breaker.openedAt < BREAKER_COOLDOWN_MS) {
    return true;
  }

  breaker.state = 'closed';
  breaker.failureCount = 0;
  return false;
}

function recordSuccess() {
  breaker.state = 'closed';
  breaker.failureCount = 0;
}

function recordFailure(message: string) {
  breaker.failureCount += 1;
  reliabilityMetrics.failures += 1;
  reliabilityMetrics.lastError = message;
  reliabilityMetrics.lastErrorAt = Date.now();

  if (breaker.failureCount >= BREAKER_FAILURE_THRESHOLD) {
    breaker.state = 'open';
    breaker.openedAt = Date.now();
  }
}

function maybeLogReliabilityAlert() {
  if (reliabilityMetrics.requests < ALERT_WINDOW_REQUEST_MIN) {
    return;
  }

  const now = Date.now();
  if (now - reliabilityMetrics.lastAlertAt < ALERT_MIN_INTERVAL_MS) {
    return;
  }

  const errorRate = reliabilityMetrics.failures / reliabilityMetrics.requests;
  const fallbackRate = reliabilityMetrics.fallbackHits / reliabilityMetrics.requests;

  if (errorRate >= 0.2 || fallbackRate >= 0.2) {
    reliabilityMetrics.lastAlertAt = now;
    console.warn(
      `WordPress reliability alert: requests=${reliabilityMetrics.requests}, errorRate=${errorRate.toFixed(2)}, fallbackRate=${fallbackRate.toFixed(2)}, breaker=${breaker.state}`
    );
  }
}

export function getWordPressReliabilitySnapshot() {
  return {
    persistentCacheEnabled: hasPersistentCache,
    breaker: {
      state: breaker.state,
      failureCount: breaker.failureCount,
      openedAt: breaker.openedAt,
      cooldownMs: BREAKER_COOLDOWN_MS,
      threshold: BREAKER_FAILURE_THRESHOLD,
    },
    metrics: {
      ...reliabilityMetrics,
      errorRate: reliabilityMetrics.requests ? reliabilityMetrics.failures / reliabilityMetrics.requests : 0,
      fallbackRate: reliabilityMetrics.requests ? reliabilityMetrics.fallbackHits / reliabilityMetrics.requests : 0,
    },
  };
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchGraphQL<T>(query: string, options: FetchOptions): Promise<T | null> {
  const wpUrl = process.env.WORDPRESS_API_URL || 'https://dimensiwahyudi.com/graphql';
  const {
    variables,
    revalidate = 60,
    cacheKey,
    retries = DEFAULT_RETRIES,
    timeoutMs = DEFAULT_TIMEOUT_MS,
    fallbackTtlSec = DEFAULT_FALLBACK_TTL_SEC,
  } = options;

  reliabilityMetrics.requests += 1;

  if (isCircuitOpen()) {
    const persistentFallback = await persistentCacheGet<T>(cacheKey);
    if (persistentFallback) {
      reliabilityMetrics.fallbackHits += 1;
      maybeLogReliabilityAlert();
      return persistentFallback;
    }

    const memoryFallback = staleCache.get(cacheKey) as T | undefined;
    if (memoryFallback) {
      reliabilityMetrics.fallbackHits += 1;
      maybeLogReliabilityAlert();
      return memoryFallback;
    }

    maybeLogReliabilityAlert();
    return null;
  }

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetch(wpUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
        next: { revalidate },
        signal: controller.signal,
      });

      if (!res.ok) {
        throw new Error(`WP API Error: ${res.status} ${res.statusText}`);
      }

      const json = (await res.json()) as GraphQLResponse<T>;
      if (json.errors?.length) {
        const firstErr = json.errors[0]?.message || 'Unknown GraphQL error';
        throw new Error(`WP GraphQL Error: ${firstErr}`);
      }

      if (!json.data) {
        throw new Error('WP GraphQL returned empty data');
      }

      staleCache.set(cacheKey, json.data);
      await persistentCacheSet(cacheKey, json.data, fallbackTtlSec);
      recordSuccess();
      maybeLogReliabilityAlert();
      return json.data;
    } catch (error) {
      const isLastAttempt = attempt === retries;
      const message = error instanceof Error ? error.message : String(error);

      if (isLastAttempt) {
        recordFailure(message);
        const persistentFallback = await persistentCacheGet<T>(cacheKey);
        if (persistentFallback) {
          reliabilityMetrics.fallbackHits += 1;
          console.warn(`WordPress persistent fallback used for ${cacheKey}: ${message}`);
          maybeLogReliabilityAlert();
          return persistentFallback;
        }

        const cached = staleCache.get(cacheKey) as T | undefined;
        if (cached) {
          reliabilityMetrics.fallbackHits += 1;
          console.warn(`WordPress fallback cache used for ${cacheKey}: ${message}`);
          maybeLogReliabilityAlert();
          return cached;
        }
        console.error(`WordPress fetch failed for ${cacheKey}: ${message}`);
        maybeLogReliabilityAlert();
        return null;
      }

      await sleep(RETRY_BASE_DELAY_MS * Math.pow(2, attempt));
    } finally {
      clearTimeout(timeout);
    }
  }

  return null;
}

/**
 * Service to handle WordPress GraphQL data fetching.
 * Decouples the UI from the specific API implementation.
 */
export async function getHomeData() {
  const query = `
  query HomePageQuery {
    generalSettings {
      title
      description
    }
    posts(first: 6, where: { categoryName: "Produk" }) {
      nodes {
        id
        slug
        title
        excerpt
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
  `;

  return fetchGraphQL<{
    generalSettings?: { title?: string; description?: string };
    posts?: {
      nodes?: Array<{
        id: string;
        slug: string;
        title: string;
        excerpt: string;
        featuredImage?: { node: { sourceUrl: string } };
      }>;
    };
  }>(query, {
    revalidate: 3600,
    cacheKey: 'home-data',
  });
}

export async function getAllPosts(options?: { revalidate?: number }) {
  const query = `
    query AllPosts {
        posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
            nodes {
                id
                slug
                title
                excerpt
                date
                featuredImage {
                    node {
                        sourceUrl
                    }
                }
                categories {
                    nodes {
                        name
                        slug
                    }
                }
            }
        }
    }
    `;

  const data = await fetchGraphQL<{
    posts?: {
      nodes?: Array<{
        id: string;
        slug: string;
        title: string;
        excerpt: string;
        date: string;
        featuredImage?: { node: { sourceUrl: string } };
        categories?: { nodes: Array<{ name: string; slug: string }> };
      }>;
    };
  }>(query, {
    revalidate: options?.revalidate ?? 300,
    cacheKey: 'all-posts',
  });

  return data?.posts?.nodes || [];
}

export async function getPostBySlug(slug: string, options?: { revalidate?: number }) {
  const query = `
    query PostBySlug($slug: ID!) {
        post(id: $slug, idType: SLUG) {
            id
            slug
            title
            excerpt
            content
            date
            featuredImage {
                node {
                    sourceUrl
                }
            }
            author {
                node {
                    name
                }
            }
            categories {
                nodes {
                    name
                    slug
                }
            }
        }
    }
    `;

  const data = await fetchGraphQL<{
    post?: {
      id: string;
      slug: string;
      title: string;
      excerpt?: string;
      content: string;
      date: string;
      featuredImage?: { node: { sourceUrl: string } };
      author?: { node: { name: string } };
      categories?: { nodes: Array<{ name: string; slug: string }> };
    };
  }>(query, {
    variables: { slug },
    revalidate: options?.revalidate ?? 900,
    cacheKey: `post:${slug}`,
  });

  return data?.post || null;
}

export async function getRelatedPosts(categoryName: string, excludeId: string, options?: { revalidate?: number }) {
  const query = `
    query RelatedPosts($categoryName: String!) {
      posts(first: 3, where: { categoryName: $categoryName, orderby: { field: DATE, order: DESC } }) {
        nodes {
          id
          slug
          title
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const data = await fetchGraphQL<{
    posts?: {
      nodes?: Array<{
        id: string;
        slug: string;
        title: string;
        excerpt: string;
        date: string;
        featuredImage?: { node: { sourceUrl: string } };
        categories?: { nodes: Array<{ name: string; slug: string }> };
      }>;
    };
  }>(query, {
    variables: { categoryName },
    revalidate: options?.revalidate ?? 3600,
    cacheKey: `related:${categoryName}`,
  });

  const posts = data?.posts?.nodes || [];
  return posts.filter((p: { id: string }) => p.id !== excludeId);
}


