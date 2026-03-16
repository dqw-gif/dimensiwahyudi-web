import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
    const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true';

    // Redirect ke /maintenance jika mode maintenance aktif
    if (
        isMaintenanceMode &&
        !request.nextUrl.pathname.startsWith('/maintenance') &&
        !request.nextUrl.pathname.startsWith('/_next') &&
        !request.nextUrl.pathname.startsWith('/images') &&
        !request.nextUrl.pathname.includes('.')
    ) {
        const url = request.nextUrl.clone();
        url.pathname = '/maintenance';
        return NextResponse.redirect(url);
    }

    // Kembalikan ke Home jika maintenance mati tapi user akses /maintenance
    if (!isMaintenanceMode && request.nextUrl.pathname.startsWith('/maintenance')) {
        const url = request.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
