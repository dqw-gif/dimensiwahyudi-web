import { notFound } from 'next/navigation';
import { getUnifiedArticleBySlug, getRelatedArticles, getAllUnifiedArticles } from '@/services/articles';
import { Metadata } from 'next';
import type { PostSummary } from '../../../types/wordpress';
import { sanitizeEditorialHtml, sanitizeExcerptHtml } from '@/utils/sanitizeHtml';
import ReadingProgressBar from '@/components/news/ReadingProgressBar';
import PostDetailClient from './PostDetailClient';

export const revalidate = 604800; // Incremental Static Regeneration: 7 days

// Pre-render all article slugs at build time
export async function generateStaticParams() {
    const posts = await getAllUnifiedArticles();
    return posts.map((post: { slug: string }) => ({
        slug: post.slug,
    }));
}

function getFeaturedImageUrl(post: { featuredImage?: unknown }): string {
    if (!post.featuredImage) return '';
    if (typeof post.featuredImage === 'string') return post.featuredImage;
    const node = (post.featuredImage as { node?: { sourceUrl?: string } }).node;
    if (node?.sourceUrl) return node.sourceUrl;
    const direct = post.featuredImage as { sourceUrl?: string; url?: string };
    return direct?.sourceUrl || direct?.url || '';
}

// Generate Metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await getUnifiedArticleBySlug(slug);

    if (!post) {
        return {
            title: 'Article Not Found | Dimensi Wahyudi',
        };
    }

    const excerpt = post.excerpt?.replace(/<[^>]+>/g, '').slice(0, 160) || `Read more about ${post.title}`;
    const canonicalUrl = `https://dimensiwahyudi.com/news/${slug}`;
    const featuredImage = getFeaturedImageUrl(post) || 'https://dimensiwahyudi.com/opengraph-image';
    const categoryNames = post.categories?.nodes?.map((category) => category.name) || [];

    return {
        title: `${post.title} | Insights Dimensi Wahyudi`,
        description: excerpt,
        keywords: [
            ...categoryNames,
            'industrial insights Indonesia',
            'vacuum lifting article',
            'material handling best practice',
            'ergonomic handling Indonesia',
        ],
        authors: [{ name: 'DQW Technical Editorial', url: 'https://dimensiwahyudi.com/about' }],
        alternates: {
            canonical: canonicalUrl,
            languages: {
                'en-ID': canonicalUrl,
                'id-ID': canonicalUrl,
                'x-default': canonicalUrl,
            },
        },
        robots: {
            index: true,
            follow: true,
        },
        openGraph: {
            title: post.title,
            description: excerpt,
            url: canonicalUrl,
            siteName: 'Dimensi Wahyudi',
            images: [
                {
                    url: featuredImage,
                    width: 1200,
                    height: 630,
                },
            ],
            locale: 'en_ID',
            type: 'article',
            publishedTime: post.date,
            modifiedTime: (post as { modified?: string }).modified || post.date,
            authors: ['PT Dimensi Quantum Wahyudi'],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: excerpt,
            images: [featuredImage],
        },
    };
}

// Topical Silo Architecture for Contextual Internal Linking (SEO)
interface InternalLinkRule {
    keyword: string;
    slug?: string;
    href: string;
}

const TOPICAL_LINK_RULES: InternalLinkRule[] = [
    { keyword: 'gantry crane', slug: 'gantry-crane', href: '/news/gantry-crane' },
    { keyword: 'overhead crane', slug: 'overhead-crane', href: '/news/overhead-crane' },
    { keyword: 'suction cup vacuum', slug: 'suction-cup-vacuum', href: '/news/suction-cup-vacuum' },
    { keyword: 'suction cup', slug: 'suction-cup-vacuum', href: '/news/suction-cup-vacuum' },
    { keyword: 'vacuum tube lifter', href: '/products/schmalz/vacuum-tube-lifter' },
    { keyword: 'jumboflex', href: '/products/schmalz/vacuum-tube-lifter/jumboflex' },
    { keyword: 'jumboergo', href: '/products/schmalz/vacuum-tube-lifter/jumboergo' },
    { keyword: 'vacumaster', href: '/products/schmalz/vacumaster' },
    { keyword: 'jib crane', href: '/products/schmalz/crane-system/jib-cranes' },
    { keyword: 'chain hoist', href: '/products/schmalz/crane-system/chain-hoists' },
    { keyword: 'quick lift arm', href: '/products/binar/qla-50i-om' },
    { keyword: 'electric manipulator', href: '/products/binar' },
    { keyword: 'ergonomi industri', href: '/news/ergonomics' },
    { keyword: 'cedera muskuloskeletal', href: '/news/ergonomics/health-risks' },
    { keyword: 'sertifikasi agr', href: '/news/ergonomics/safety-standards' },
    { keyword: 'kalkulator roi', href: '/digital-assistant/roi-calculator' },
    { keyword: 'selection aids', href: '/digital-assistant/selection-aids' },
];

function injectContextualInternalLinks(html: string, currentSlug: string): string {
    if (!html) return '';

    // Split HTML so we never inject links inside existing <a>, <h1-h6>, or attributes
    const tokenRegex = /(<a\b[^>]*>[\s\S]*?<\/a>|<h[1-6]\b[^>]*>[\s\S]*?<\/h[1-6]>|<[^>]+>)|([^<]+)/gi;
    const linkedKeywords = new Set<string>();

    return html.replace(tokenRegex, (match, tagOrAnchor: string, textContent: string) => {
        if (tagOrAnchor) return tagOrAnchor;
        if (!textContent) return '';

        let processedText = textContent;

        for (const rule of TOPICAL_LINK_RULES) {
            if (rule.slug && rule.slug === currentSlug) continue; // Don't self-link to current article
            if (linkedKeywords.has(rule.keyword)) continue; // Max 1 internal link per keyword per article

            const regex = new RegExp(`\\b(${rule.keyword})\\b`, 'i');
            const found = processedText.match(regex);
            if (found) {
                linkedKeywords.add(rule.keyword);
                processedText = processedText.replace(
                    regex,
                    `<a href="${rule.href}" class="text-[#005596] font-bold underline decoration-blue-200 underline-offset-4 hover:decoration-[#005596] transition-colors" title="${found[0]}">$1</a>`
                );
            }
        }

        return processedText;
    });
}

function rewriteWordPressContentLinks(htmlContent: string, currentSlug: string): string {
    if (!htmlContent) return '';

    let processed = htmlContent;

    // Decode leaked escaped headings like &lt;h2 id=&#8221;cara-kerja&#8221;&gt;...&lt;/h2&gt; whether wrapped in <p> or standalone
    processed = processed.replace(
        /(?:<p\b[^>]*>\s*)?&lt;(h[1-6])([\s\S]*?)&gt;([\s\S]*?)&lt;\/\1&gt;(?:\s*<\/p>)?/gi,
        (_, tag, attrs, content) => {
            const cleanAttrs = attrs
                .replace(/&#8220;|&#8221;|&quot;/g, '"')
                .replace(/&#8216;|&#8217;/g, "'");
            return `<${tag}${cleanAttrs}>${content}</${tag}>`;
        }
    );

    // Strip redundant legacy byline and separators imported from WordPress
    processed = processed.replace(
        /<p\b[^>]*>\s*<em>\s*Oleh Tim Teknis[\s\S]*?Estimasi baca:[^<]*<\/em>\s*<\/p>(?:\s*<hr\b[^>]*\/?>)?/gi,
        ''
    );

    const domains = [
        'https://dimensiwahyudi.com',
        'https://wp.dimensiwahyudi.com',
        'http://dimensiwahyudi.com',
        'http://wp.dimensiwahyudi.com',
    ];

    // Convert absolute internal URLs to relative paths first
    for (const domain of domains) {
        const escapedDomain = domain.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp(`href="${escapedDomain}(/[^"]*)"`, 'g');
        processed = processed.replace(regex, 'href="$1"');

        // Also clean up image sources
        const imgRegex = new RegExp(`src="${escapedDomain}(/wp-content/uploads/[^"]*)"`, 'g');
        processed = processed.replace(imgRegex, 'src="$1"');
    }

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
        '/services',
        '/schmalz-fanuc-event',
        '/events',
        '/nsg-login',
        '/brosur',
        '/katalog',
    ];

    // Prefix news path to single-slug relative links
    processed = processed.replace(/href="(\/[^"]*)"/g, (match, path: string) => {
        const lowerPath = path.toLowerCase();
        
        if (lowerPath.startsWith('/news/')) {
            return match;
        }

        const isStatic = staticPaths.some(staticPath => {
            if (staticPath === '/') {
                return path === '/';
            }
            return lowerPath === staticPath || lowerPath.startsWith(staticPath + '/');
        });

        if (isStatic) {
            return match;
        }

        if (path.includes('://') || path.startsWith('mailto:') || path.startsWith('tel:') || path.startsWith('#') || path.startsWith('/wp-content/')) {
            return match;
        }

        const cleanPath = path.startsWith('/') ? path : '/' + path;
        return `href="/news${cleanPath}"`;
    });

    // Inject smart contextual internal links for SEO
    processed = injectContextualInternalLinks(processed, currentSlug);

    return processed;
}

export default async function PostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);
    const post = await getUnifiedArticleBySlug(decodedSlug);

    if (!post) notFound();

    const categoryName = post.categories?.nodes?.[0]?.name || 'Teknologi';
    const relatedPosts: PostSummary[] = categoryName
        ? await getRelatedArticles(categoryName, post.slug)
        : [];

    const contentStr = post.content || '';
    const words = contentStr.replace(/<[^>]+>/g, '').split(/\s+/).length;
    const readTime = Math.ceil(words / 200) || 1;

    const rawAuthor = post.author?.node?.name;
    const authorName = rawAuthor && !rawAuthor.toLowerCase().includes('dimensi quantum') && !rawAuthor.toLowerCase().includes('tim teknis') && !rawAuthor.toLowerCase().includes('admin')
        ? rawAuthor
        : 'DQW Technical Editorial';

    const featuredImgUrl = getFeaturedImageUrl(post);

    const sanitizedHtml = sanitizeEditorialHtml(rewriteWordPressContentLinks(contentStr, post.slug));

    const sanitizedRelatedPosts = relatedPosts.map((related) => ({
        id: related.id,
        slug: related.slug,
        title: related.title,
        date: related.date,
        excerptHtml: sanitizeExcerptHtml(related.excerpt || ''),
        categoryName: related.categories?.nodes?.[0]?.name,
        imgUrl: getFeaturedImageUrl(related),
    }));

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Beranda',
                item: 'https://dimensiwahyudi.com/',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Insights',
                item: 'https://dimensiwahyudi.com/news',
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: post.title,
                item: `https://dimensiwahyudi.com/news/${post.slug}`,
            },
        ],
    };

    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt?.replace(/<[^>]+>/g, '').slice(0, 160) || post.title,
        inLanguage: 'id-ID',
        datePublished: post.date,
        dateModified: (post as { modified?: string }).modified || post.date,
        mainEntityOfPage: `https://dimensiwahyudi.com/news/${post.slug}`,
        author: {
            '@type': 'Organization',
            name: authorName,
            url: 'https://dimensiwahyudi.com/about',
        },
        publisher: {
            '@type': 'Organization',
            name: 'PT Dimensi Quantum Wahyudi',
            logo: {
                '@type': 'ImageObject',
                url: 'https://dimensiwahyudi.com/logo.webp',
            },
        },
        image: featuredImgUrl || 'https://dimensiwahyudi.com/opengraph-image',
        articleSection: categoryName,
        keywords: (post.categories?.nodes || []).map((category) => category.name).join(', '),
    };

    return (
        <article className="min-h-screen bg-slate-50 font-sans pb-16 selection:bg-blue-100 selection:text-blue-900 relative">
            <ReadingProgressBar />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            {/* Subtle Engineering Blueprint Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f080_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f080_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10" />

            <PostDetailClient
                title={post.title}
                slug={post.slug}
                categoryName={categoryName}
                authorName={authorName}
                dateStr={post.date}
                readTime={readTime}
                featuredImgUrl={featuredImgUrl}
                sanitizedHtml={sanitizedHtml}
                relatedPosts={sanitizedRelatedPosts}
            />
        </article>
    );
}
