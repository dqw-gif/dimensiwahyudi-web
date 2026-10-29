import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import postsBackup from '@/data/wordpress-posts.json';

// Precompute valid legacy WordPress article slugs so bot scanners (/wp-login, /xmlrpc, /env, etc.)
// are never 301-redirected into /news/[slug] Serverless SSR + Firestore queries.
const LEGACY_WORDPRESS_SLUGS = new Set<string>(
    (postsBackup as Array<{ slug?: string }>)
        .map((p) => (p.slug || '').toLowerCase())
        .filter(Boolean)
);

export default function proxy(request: NextRequest) {
    const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true';
    const pathname = request.nextUrl.pathname;

    // A. Proxy relative WordPress assets (images, stylesheets, uploads) to the wp subdomain
    if (pathname.startsWith('/wp-content/') || pathname.startsWith('/wp-includes/')) {
        return NextResponse.rewrite(new URL(`https://wp.dimensiwahyudi.com${pathname}`, request.url));
    }

    // 1. Redirect to /maintenance if maintenance mode is active
    if (
        isMaintenanceMode &&
        !pathname.startsWith('/maintenance') &&
        !pathname.startsWith('/_next') &&
        !pathname.startsWith('/images') &&
        !pathname.includes('.')
    ) {
        const url = request.nextUrl.clone();
        url.pathname = '/maintenance';
        return NextResponse.redirect(url);
    }

    // 2. Return to Home if maintenance is inactive but user tries to access /maintenance
    if (!isMaintenanceMode && pathname.startsWith('/maintenance')) {
        const url = request.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.redirect(url);
    }

    // Bypass admin routes from legacy news redirection
    if (pathname.startsWith('/admin')) {
        return NextResponse.next();
    }

    // 3. SEO Legacy URL Redirection:
    // Only 301-redirect single-level slugs that actually belong to known legacy WordPress articles
    // (e.g. /overhead-crane -> /news/overhead-crane), preventing bot scanners from triggering /news/[slug] SSR.
    const isSingleSlug = /^\/[a-zA-Z0-9_-]+$/.test(pathname);

    if (isSingleSlug) {
        const cleanSlug = pathname.slice(1).toLowerCase();
        if (LEGACY_WORDPRESS_SLUGS.has(cleanSlug)) {
            const url = request.nextUrl.clone();
            url.pathname = `/news/${cleanSlug}`;
            return NextResponse.redirect(url, 301); // 301 Permanent Redirect
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|images|brochures|favicon\\.ico|robots\\.txt|sitemap\\.xml|opengraph-image|icon|apple-icon|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|pdf|woff2?|ttf|css|js|map|mp4|webm|json|xml|txt)$).*)',
    ],
};
