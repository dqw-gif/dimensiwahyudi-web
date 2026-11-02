/**
 * lib/seo/indexing.ts
 * Otomasi Push Indexing SEO: Google Sitemap Ping & IndexNow Protocol (Bing, Yandex, dll)
 */

export interface IndexPushResult {
  googlePing: boolean;
  indexNow: boolean;
  timestamp: string;
}

const SITE_URL = 'https://dimensiwahyudi.com';
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;
// IndexNow API key for dimensiwahyudi.com
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'dimensiwahyudi-indexnow-2026';

export async function pushIndexToSearchEngines(slug: string): Promise<IndexPushResult> {
  const articleUrl = `${SITE_URL}/news/${slug}`;
  let googlePingSuccess = false;
  let indexNowSuccess = false;

  // 1. Ping Google Sitemap
  try {
    const googleRes = await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`, {
      method: 'GET',
      headers: { 'User-Agent': 'DimensiQuantumWahyudi-Bot/1.0' },
      signal: AbortSignal.timeout(5000),
    });
    googlePingSuccess = googleRes.status < 500;
  } catch (err) {
    console.warn('Google sitemap ping error (non-fatal):', (err as Error).message);
  }

  // 2. Push to IndexNow (Bing, Yandex, Naver, Seznam)
  try {
    const indexNowPayload = {
      host: 'dimensiwahyudi.com',
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: [articleUrl, SITE_URL, `${SITE_URL}/news`],
    };

    const indexNowRes = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(indexNowPayload),
      signal: AbortSignal.timeout(5000),
    });
    indexNowSuccess = indexNowRes.status < 400;
  } catch (err) {
    console.warn('IndexNow push error (non-fatal):', (err as Error).message);
  }

  return {
    googlePing: googlePingSuccess,
    indexNow: indexNowSuccess,
    timestamp: new Date().toISOString(),
  };
}
