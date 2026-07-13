import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
    const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true';
    const pathname = request.nextUrl.pathname;

    // 0. Seamless Reverse Proxy Rewrite for the Fanuc event page:
    // Keep the main domain URL in the browser but fetch the content from wp.dimensiwahyudi.com in the background.
    if (pathname.toLowerCase() === '/schmalz-x-fanuc-event') {
        return NextResponse.rewrite(new URL('https://wp.dimensiwahyudi.com/schmalz-x-fanuc-event', request.url));
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

    // 3. SEO Legacy URL Redirection:
    // If a request is for a single-level slug (e.g. /overhead-crane), and it's not a static route or file,
    // permanently redirect (301) to /news/[slug] to maintain search engine ranking and prevent 404s.
    const staticPaths = [
        '/',
        '/about',
        '/contact',
        '/career',
        '/industries',
        '/our-projects',
        '/products',
        '/faq',
        '/privacy-policy',
        '/terms-of-service',
        '/site-directory',
        '/maintenance',
        '/digital-assistant',
        '/internal',
        '/news',
    ];

    // Match single-level paths like /gantry-crane, but not /news/gantry-crane, /_next/..., files with extension, or api routes
    const isSingleSlug = /^\/[a-zA-Z0-9_-]+$/.test(pathname);

    if (isSingleSlug && !staticPaths.includes(pathname.toLowerCase())) {
        const url = request.nextUrl.clone();
        url.pathname = `/news${pathname}`;
        return NextResponse.redirect(url, 301); // 301 Permanent Redirect
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
