# PT Dimensi Quantum Wahyudi Web

Next.js 16 application for product catalog, technical content, and lead generation.

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Environment Setup

Copy `.env.example` to `.env.local` and fill values:

- `WORDPRESS_API_URL`
- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_FORMSPREE_ID`

Optional but recommended for production reliability:

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

When Upstash variables are set, WordPress fallback cache becomes shared and persistent across instances.

## Reliability Stack

Implemented reliability controls:

- Timeout + retry + exponential backoff for WordPress fetches.
- Circuit breaker for upstream failure bursts.
- In-memory fallback cache (default).
- Shared persistent fallback cache via Upstash (optional).
- Health endpoint: `/api/health/wordpress`.

## Quality Gates

Run locally:

```bash
npm run lint
npm run build
npm run qa:route-health
npm run qa:reliability
```

`qa:reliability` runs lint, build, starts production server, checks route health, and validates WordPress reliability health.

## CI

GitHub Actions workflow: `.github/workflows/reliability-gate.yml`.

For pull requests and main branch pushes, CI runs reliability gate automatically.

## Deployment Activation Checklist

1. Set all production env vars from `.env.example`.
2. Enable Upstash vars for persistent cache.
3. Confirm `/api/health/wordpress` returns `status: ok` under normal operation.
4. Ensure CI reliability gate is required before merge.
5. Run post-deploy smoke test:

```bash
BASE_URL=https://your-domain.com npm run qa:route-health
```
