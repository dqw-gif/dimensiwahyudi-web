import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Selalu jalankan secara real-time, tanpa cache

export async function GET() {
    const query = `
    query AllPosts {
      posts(first: 2) {
        nodes {
          id
          title
        }
      }
    }
  `;

    try {
        const start = Date.now();
        const wpUrl = process.env.WORDPRESS_API_URL || 'https://dimensiwahyudi.com/graphql';

        const res = await fetch(wpUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Vercel-Diagnostic-Bot/1.0' // Coba kelabui firewall
            },
            body: JSON.stringify({ query }),
            cache: 'no-store' // 100% matikan CDN caching Vercel
        });

        const elapsed = Date.now() - start;

        // Kalau diblok HTTP error (seperti 403 Forbidden)
        if (!res.ok) {
            const errorText = await res.text();
            return NextResponse.json({
                status: 'FAILED',
                httpCode: res.status,
                message: 'Wordfence/Server menolak koneksi',
                timeTakenMs: elapsed,
                responseSnippet: errorText.substring(0, 200)
            }, { status: 500 });
        }

        const jsonData = await res.json();

        // Kalau lolos dan berhasil dapat data JSON
        return NextResponse.json({
            status: 'SUCCESS',
            httpCode: res.status,
            timeTakenMs: elapsed,
            totalPostsFound: jsonData.data?.posts?.nodes?.length || 0,
            posts: jsonData.data?.posts?.nodes
        });

    } catch (error: any) {
        // Kalau ada Network Error (misal DNS tidak ketemu)
        return NextResponse.json({
            status: 'NETWORK_ERROR',
            message: error.message || 'Unknown network error'
        }, { status: 500 });
    }
}
