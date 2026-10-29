import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const KNOWN_BROCHURES: Record<string, string> = {
    'ergonomic-vacuum-lifters': 'brochures/ergonomic-vacuum-lifters.pdf',
    'product-overview': 'brochures/product-overview.pdf',
    'area-gripping': 'brochures/area-gripping.pdf',
    'vacuum-automation': 'brochures/vacuum-automation.pdf',
};

// Module-level memory cache to prevent repeated disk I/O and Base64 CPU encoding on warm instances
const pdfBase64Cache = new Map<string, { size: number; data: string }>();

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const idParam = searchParams.get('id');
        const fileParam = searchParams.get('file');

        const publicDir = path.join(process.cwd(), 'public');
        let targetPath: string | null = null;

        // 1. Lookup by brochure ID (safest, URL contains no .pdf extension)
        if (idParam && KNOWN_BROCHURES[idParam]) {
            const resolved = path.join(publicDir, KNOWN_BROCHURES[idParam]);
            if (fs.existsSync(resolved)) {
                targetPath = resolved;
            }
        }

        // 2. Fallback to fileParam lookup
        if (!targetPath && (fileParam || idParam)) {
            const raw = (fileParam || idParam || '')
                .replace(/^[/\\]+/, '')
                .replace(/\.\.[/\\]/g, '')
                .trim();
            const cleanBase = path.basename(raw).replace(/\.pdf$/i, '');

            const candidatePaths = [
                path.join(publicDir, raw),
                path.join(publicDir, `${raw}.pdf`),
                path.join(publicDir, 'brochures', `${cleanBase}.pdf`),
                path.join(publicDir, 'brochures', path.basename(raw)),
            ];

            for (const candidate of candidatePaths) {
                const normalized = path.normalize(candidate);
                if (normalized.startsWith(publicDir) && fs.existsSync(normalized)) {
                    const stat = fs.statSync(normalized);
                    if (stat.isFile()) {
                        targetPath = normalized;
                        break;
                    }
                }
            }
        }

        if (!targetPath) {
            return NextResponse.json(
                { success: false, error: 'File dokumen tidak ditemukan' },
                { status: 404 }
            );
        }

        let cached = pdfBase64Cache.get(targetPath);
        if (!cached) {
            const buffer = await fs.promises.readFile(targetPath);
            cached = {
                size: buffer.length,
                data: buffer.toString('base64'),
            };
            pdfBase64Cache.set(targetPath, cached);
        }

        // Returning as application/json guarantees that browser download managers (e.g. IDM)
        // never intercept or hijack the fetch stream with 204 or empty responses.
        // s-maxage=31536000 caches the response on Vercel Edge CDN to eliminate Origin Transfer & CPU usage.
        return NextResponse.json(
            {
                success: true,
                size: cached.size,
                data: cached.data,
            },
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'public, max-age=86400, s-maxage=31536000, stale-while-revalidate=604800, immutable',
                    'CDN-Cache-Control': 'public, s-maxage=31536000, immutable',
                    'Vercel-CDN-Cache-Control': 'public, s-maxage=31536000, immutable',
                },
            }
        );
    } catch (error) {
        console.error('Error serving PDF document:', error);
        return NextResponse.json(
            { success: false, error: 'Gagal membaca dokumen PDF' },
            { status: 500 }
        );
    }
}
