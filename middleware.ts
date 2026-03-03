import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Cek apakah mode maintenance aktif dari Environment Variable
    const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true';

    // Jika aktif dan user BUKAN sedang mengakses halaman /maintenance, arahkan mereka ke sana
    if (
        isMaintenanceMode &&
        !request.nextUrl.pathname.startsWith('/maintenance') &&
        !request.nextUrl.pathname.startsWith('/_next') && // Jangan blokir file aset/sistem Next.js
        !request.nextUrl.pathname.startsWith('/images') && // Jangan blokir gambar statis
        !request.nextUrl.pathname.includes('.') // Jangan blokir file dengan ekstensi (seperti favicon.ico)
    ) {
        const url = request.nextUrl.clone();
        url.pathname = '/maintenance';
        return NextResponse.redirect(url);
    }

    // Jika mode maintenance MATI, tapi user iseng ngetik /maintenance, kembalikan ke Home
    if (!isMaintenanceMode && request.nextUrl.pathname.startsWith('/maintenance')) {
        const url = request.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    // Middleware akan dijalankan di semua halaman kecuali file statis / API
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
