const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const SITEMAP_URL = `${BASE_URL}/sitemap.xml`;
const SLOW_PAGE_THRESHOLD_MS = Number(process.env.SLOW_PAGE_THRESHOLD_MS || 3000);
const MAX_SLOW_PAGES = Number(process.env.MAX_SLOW_PAGES || 0);

function extractLocs(xml) {
  const matches = xml.match(/<loc>(.*?)<\/loc>/g) || [];
  return matches
    .map((entry) => entry.replace('<loc>', '').replace('</loc>', '').trim())
    .filter(Boolean);
}

function normalizeToBase(url, baseUrl) {
  try {
    const parsed = new URL(url);
    const base = new URL(baseUrl);
    parsed.protocol = base.protocol;
    parsed.host = base.host;
    return parsed.toString();
  } catch {
    return url;
  }
}

async function requestUrl(url) {
  const startedAt = Date.now();
  try {
    const response = await fetch(url, {
      redirect: 'follow',
      headers: {
        'user-agent': 'dqw-route-health-check/1.0',
      },
    });

    const durationMs = Date.now() - startedAt;
    return {
      url,
      ok: response.ok,
      status: response.status,
      durationMs,
      contentType: response.headers.get('content-type') || '',
    };
  } catch (error) {
    return {
      url,
      ok: false,
      status: 0,
      durationMs: Date.now() - startedAt,
      contentType: '',
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function main() {
  const sitemapRes = await fetch(SITEMAP_URL, {
    headers: {
      'user-agent': 'dqw-route-health-check/1.0',
    },
  });

  if (!sitemapRes.ok) {
    console.error(`Sitemap fetch failed: ${sitemapRes.status} ${sitemapRes.statusText}`);
    process.exit(1);
  }

  const sitemapXml = await sitemapRes.text();
  const urls = extractLocs(sitemapXml).map((url) => normalizeToBase(url, BASE_URL));

  if (!urls.length) {
    console.error('No URLs found in sitemap.');
    process.exit(1);
  }

  const results = await Promise.all(urls.map((url) => requestUrl(url)));
  const failures = results.filter((result) => !result.ok);
  const slowPages = results.filter((result) => result.durationMs > SLOW_PAGE_THRESHOLD_MS);
  const timings = results.map((result) => result.durationMs).sort((a, b) => a - b);
  const averageMs = Math.round(timings.reduce((sum, value) => sum + value, 0) / Math.max(1, timings.length));
  const p95Ms = timings[Math.max(0, Math.min(timings.length - 1, Math.floor(timings.length * 0.95) - 1))] || 0;

  console.log(`BASE_URL=${BASE_URL}`);
  console.log(`SITEMAP_URLS=${urls.length}`);
  console.log(`NON_200=${failures.length}`);
  console.log(`SLOW_PAGE_THRESHOLD_MS=${SLOW_PAGE_THRESHOLD_MS}`);
  console.log(`MAX_SLOW_PAGES=${MAX_SLOW_PAGES}`);
  console.log(`SLOW_PAGES=${slowPages.length}`);
  console.log(`AVG_MS=${averageMs}`);
  console.log(`P95_MS=${p95Ms}`);

  if (failures.length) {
    console.log('\nFailed URLs:');
    failures.forEach((item) => {
      const reason = item.error ? `${item.status} (${item.error})` : `${item.status}`;
      console.log(`- ${item.url} -> ${reason}`);
    });
  }

  if (slowPages.length) {
    console.log(`\nSlow URLs (>${SLOW_PAGE_THRESHOLD_MS}ms):`);
    slowPages.forEach((item) => {
      console.log(`- ${item.url} -> ${item.durationMs}ms`);
    });
  }

  if (failures.length || slowPages.length > MAX_SLOW_PAGES) {
    if (slowPages.length > MAX_SLOW_PAGES) {
      console.error(`Performance budget failed: slowPages=${slowPages.length} exceeds MAX_SLOW_PAGES=${MAX_SLOW_PAGES}`);
    }
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
