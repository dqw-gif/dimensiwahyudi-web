import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPostBySlug, getRelatedPosts, getAllPosts } from '../../../services/wordpress';
import { Calendar, ChevronLeft, Clock, Tag, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';
import ShareButton from '../../../components/news/ShareButton';
import type { PostSummary } from '../../../types/wordpress';
import DOMPurify from 'isomorphic-dompurify';

// ISR: Re-generate pages in the background every 6 hours.
export const revalidate = 21600;

// Pre-render all article slugs at build time
export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((post: { slug: string }) => ({
        slug: post.slug,
    }));
}



// Generate Metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Article Not Found | Dimensi Wahyudi',
        };
    }

    return {
        title: `${post.title} | Insights Dimensi Wahyudi`,
        description: post.excerpt?.replace(/<[^>]+>/g, '').slice(0, 160) || `Read more about ${post.title}`,
        openGraph: {
            title: post.title,
            description: post.excerpt?.replace(/<[^>]+>/g, '').slice(0, 160),
            url: `https://dimensiwahyudi.com/news/${slug}`,
            siteName: 'Dimensi Wahyudi',
            images: [
                {
                    url: post.featuredImage?.node?.sourceUrl || 'https://dimensiwahyudi.com/og-image.jpg', // Fallback image
                    width: 1200,
                    height: 630,
                },
            ],
            locale: 'en_ID',
            type: 'article',
        },
    };
}

export default async function PostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Decode URI component properly just in case the slug has special characters
    const decodedSlug = decodeURIComponent(slug);
    const post = await getPostBySlug(decodedSlug);

    if (!post) notFound();

    const articleDate = new Date(post.date);
    const isLegacyArticle = articleDate.getFullYear() <= 2024;

    // Fetch Related Posts
    const categorySlug = post.categories?.nodes?.[0]?.name || '';
    // Note: getRelatedPosts expects categoryName or slug. Using name as per service implementation.
    const relatedFetch = categorySlug
        ? getRelatedPosts(categorySlug, post.id, { revalidate: isLegacyArticle ? 86400 : 3600 })
        : Promise.resolve([] as PostSummary[]);
    const relatedPosts: PostSummary[] = await Promise.race([
        relatedFetch,
        new Promise<PostSummary[]>((resolve) => setTimeout(() => resolve([]), 1200)),
    ]);


    // Calculate Read Time safely
    const contentStr = post.content || '';
    const words = contentStr.replace(/<[^>]+>/g, '').split(/\s+/).length;
    const readTime = Math.ceil(words / 200) || 1;

    // Format Date (server-side, consistent string)
    function formatDateString(dateString: string) {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(date);
    }

    const formattedDate = formatDateString(post.date);
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
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

    return (
        <article className="min-h-screen bg-slate-50 font-sans pb-24 selection:bg-blue-100 selection:text-blue-900">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            {/* Background Decor - Clean Lab Style */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50 rounded-full blur-[100px]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f080_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f080_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            </div>

            {/* Immersive Hero Header */}
            <div className="relative h-[60vh] md:h-[70vh] w-full bg-slate-900 overflow-hidden">
                {post.featuredImage ? (
                    <div className="absolute inset-0 animate-in fade-in duration-1000">
                        <Image
                            src={post.featuredImage.node.sourceUrl}
                            alt={post.title}
                            fill
                            className="object-cover opacity-80"
                            priority
                        />
                    </div>
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 opacity-80"></div>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-900/60 to-slate-900/30"></div>

                <div className="absolute inset-0 flex flex-col justify-end pb-32 md:pb-40">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full relative z-10">
                        <div className="animate-in slide-in-from-bottom-5 fade-in duration-700">
                            <Link href="/news" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 uppercase tracking-widest text-xs font-bold transition-all hover:gap-3 group">
                                <ChevronLeft size={16} /> Back to Insights
                            </Link>

                            <div className="flex flex-wrap items-center gap-4 mb-6">
                                {post.categories?.nodes[0] && (
                                    <span className="px-4 py-1.5 rounded-full bg-blue-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-900/20">
                                        {post.categories.nodes[0].name}
                                    </span>
                                )}
                                <span className="flex items-center gap-2 text-white/90 text-sm font-medium bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                                    <Calendar size={14} /> {formattedDate}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6 drop-shadow-lg">
                                {post.title}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Body - Floating Paper Concept */}
            <div className="relative z-10 -mt-24 px-4 sm:px-6 mb-24">
                <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] p-8 md:p-16 border border-slate-100 flex flex-col md:flex-row gap-12 animate-in slide-in-from-bottom-10 fade-in duration-1000 fill-mode-backwards delay-300">

                    {/* Sidebar / Meta Info (Desktop) */}
                    <div className="hidden md:block w-48 shrink-0 space-y-8 sticky top-32 h-fit border-r border-slate-100 pr-8">
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Author</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center overflow-hidden">
                                    <Image src="/favicon.ico" alt="Author" width={32} height={32} className="w-8 h-8 object-contain" />
                                </div>
                                <span className="font-bold text-slate-900 text-sm">Dimensi Quantum Wahyudi</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Read Time</p>
                            <div className="flex items-center gap-2 text-slate-600 font-medium text-sm">
                                <Clock size={16} className="text-blue-500" /> {readTime} min read
                            </div>
                        </div>
                        <div className="pt-8 border-t border-slate-100">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Share</p>
                            <div className="flex gap-2">
                                <ShareButton title={post.title} slug={post.slug} />
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">

                        {/* Mobile Meta Info */}
                        <div className="md:hidden flex items-center justify-between py-6 border-b border-slate-100 mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center overflow-hidden">
                                    <Image src="/favicon.ico" alt="Author" width={32} height={32} className="w-8 h-8 object-contain" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 font-bold uppercase">Written by</p>
                                    <span className="font-bold text-slate-900 text-sm">Dimensi Quantum Wahyudi</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 text-slate-500 text-xs font-bold bg-slate-50 px-3 py-1 rounded-full">
                                <Clock size={14} /> {readTime} min
                            </div>
                            {/* Share Button Mobile */}
                            <ShareButton title={post.title} slug={post.slug} />
                        </div>

                        <div
                            className="prose prose-lg md:prose-xl prose-slate mx-auto prose-headless 
                    prose-headings:font-bold prose-headings:text-slate-900 prose-headings:tracking-tight
                    prose-p:text-slate-600 prose-p:leading-relaxed
                    prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                    prose-img:rounded-3xl prose-img:shadow-xl prose-img:my-10
                    prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50/50 prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-blockquote:text-slate-700
                    text-slate-600 [&_p]:text-slate-600 [&_li]:text-slate-600 [&_h2]:text-slate-900 [&_h3]:text-slate-900 [&_strong]:text-slate-900 [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-5 [&_ol]:pl-5
                    [&_iframe]:w-full [&_iframe]:aspect-video [&_iframe]:rounded-2xl [&_iframe]:my-8"
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(post.content || '', {
                                    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'b', 'i', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                                        'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'figure', 'figcaption', 'table',
                                        'thead', 'tbody', 'tr', 'th', 'td', 'code', 'pre', 'iframe', 'div', 'span'],
                                    ALLOWED_ATTR: ['href', 'src', 'alt', 'class', 'target', 'rel', 'width', 'height',
                                        'allow', 'allowfullscreen', 'frameborder', 'style', 'loading'],
                                    ALLOW_UNKNOWN_PROTOCOLS: false,
                                })
                            }}
                        />
                    </div>

                </div>
            </div>

            {/* Related Posts Section */}
            {relatedPosts.length > 0 ? (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
                    <div className="mb-10 flex items-end justify-between border-b border-slate-200 pb-4">
                        <div>
                            <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-1">More to Explore</p>
                            <h2 className="text-3xl font-black text-slate-900">Related Insights</h2>
                        </div>
                        <Link href="/news" className="hidden md:flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-sm transition-colors">
                            View All <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {relatedPosts.map((related) => (
                            <Link key={related.id} href={`/news/${related.slug}`} className="group block bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className="relative h-48 overflow-hidden">
                                    {related.featuredImage ? (
                                        <Image
                                            src={related.featuredImage.node.sourceUrl}
                                            alt={related.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                                            <Tag size={32} />
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4">
                                        {related.categories?.nodes[0] && (
                                            <span className="bg-white/90 backdrop-blur-sm text-slate-900 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                                                {related.categories.nodes[0].name}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-2 text-slate-400 text-xs font-mono mb-3">
                                        <Calendar size={12} /> {formatDateString(related.date)}
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-3">
                                        {related.title}
                                    </h3>
                                    <div className="text-slate-500 text-xs line-clamp-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(related.excerpt || '') }} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
                    <div className="rounded-3xl border border-slate-200 bg-white px-6 py-8 text-center shadow-sm">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-2">Insights Update</p>
                        <p className="text-slate-600 text-sm md:text-base">Related insights are being refreshed. You can continue browsing the full insights library.</p>
                        <Link href="/news" className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-500 transition-colors">
                            Explore All Insights <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            )}
        </article>
    );
}
