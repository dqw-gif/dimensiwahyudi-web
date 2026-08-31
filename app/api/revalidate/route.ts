import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

/**
 * API Route to programmatically revalidate Next.js cache.
 * Triggered by WordPress webhooks when posts are updated.
 *
 * Endpoint: POST /api/revalidate?secret=YOUR_SECRET
 */
export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');

    // 1. Verify Secret Token (Supports environment variable and default secret)
    const expectedSecret = process.env.REVALIDATION_SECRET || 'dimensi2026secret';
    if (!secret || (secret !== expectedSecret && secret !== 'dimensi2026secret')) {
      console.warn('Unauthorized cache revalidation attempt');
      return NextResponse.json(
        { message: 'Invalid token or REVALIDATION_SECRET not configured' },
        { status: 401 }
      );
    }

    // 2. Parse request body to check if slug is provided
    let slug: string | null = null;
    try {
      const body = await request.json();
      // WordPress webhook payloads vary depending on the plugin.
      slug =
        body.slug ||
        body.post?.post_name ||
        body.post_data?.post_name ||
        body.post_name ||
        body.post?.slug ||
        null;
    } catch {
      // Body might be empty or not JSON, fallback to query parameter
      slug = searchParams.get('slug');
    }

    console.info(`Triggering revalidation. Post slug to update: ${slug || 'None (Listing page and Home page only)'}`);

    // 3. Clear Cache
    // Revalidate home page, news directory page, and sitemap
    revalidatePath('/');
    revalidatePath('/news');
    revalidatePath('/sitemap.xml');

    // Revalidate specific post page if slug is provided
    if (slug) {
      revalidatePath(`/news/${slug}`);
    }

    return NextResponse.json({
      revalidated: true,
      timestamp: Date.now(),
      revalidatedPaths: slug ? ['/', '/news', '/sitemap.xml', `/news/${slug}`] : ['/', '/news', '/sitemap.xml'],
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error('Revalidation error:', errorMessage);
    return NextResponse.json(
      { message: 'Error during revalidation', error: errorMessage },
      { status: 500 }
    );
  }
}

export { POST as GET };
