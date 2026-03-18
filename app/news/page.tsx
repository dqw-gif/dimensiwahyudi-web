import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { getAllPosts } from '../../services/wordpress';
import { Zap, ArrowRight, HeartPulse } from 'lucide-react';

const NewsGrid = dynamic(() => import('../../components/news/NewsGrid'), {
    loading: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Loading articles">
            {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-72 rounded-3xl bg-white border border-slate-200 animate-pulse" />
            ))}
        </div>
    ),
});

export const revalidate = 3600; // ISR cache for 1 hour

export const metadata: Metadata = {
    title: 'Insights Hub | Engineering Articles & Industry Updates | PT Dimensi Quantum Wahyudi',
    description: 'Explore practical insights on vacuum technology, ergonomic handling, and industrial productivity improvements for manufacturers in Indonesia.',
    keywords: [
        'industrial insights Indonesia',
        'vacuum lifter article',
        'material handling best practice Indonesia',
        'ergonomics manufacturing Indonesia',
        'vacuum handling knowledge base',
    ],
    openGraph: {
        title: 'Insights Hub | PT Dimensi Quantum Wahyudi',
        description: 'Engineering articles, field updates, and case-based insights on vacuum lifting and industrial material handling for the Indonesian market.',
        url: 'https://dimensiwahyudi.com/news',
        siteName: 'PT Dimensi Quantum Wahyudi',
        locale: 'en_ID',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Insights Hub | PT Dimensi Quantum Wahyudi',
        description: 'Technical insights on vacuum lifting and ergonomic handling for Indonesian industry.',
    },
    alternates: {
        canonical: 'https://dimensiwahyudi.com/news',
        languages: {
            'en-ID': 'https://dimensiwahyudi.com/news',
            'id-ID': 'https://dimensiwahyudi.com/news',
            'x-default': 'https://dimensiwahyudi.com/news',
        },
    },
};

export default async function NewsPage() {
    const posts = await getAllPosts();
    const collectionSchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Insights Hub',
        description: 'Engineering articles and industry updates by PT Dimensi Quantum Wahyudi.',
        url: 'https://dimensiwahyudi.com/news',
        inLanguage: 'en-ID',
        about: 'Industrial vacuum lifting and ergonomic material handling in Indonesia',
        mainEntity: {
            '@type': 'ItemList',
            numberOfItems: posts.length,
        },
    };
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dimensiwahyudi.com/' },
            { '@type': 'ListItem', position: 2, name: 'Insights', item: 'https://dimensiwahyudi.com/news' },
        ],
    };
    const copy = {
        badge: 'Knowledge Base & Updates',
        subtitle:
            'Practical insights on vacuum technology, engineering precision, and measurable industrial improvement.',
        emptyTitle: 'No Articles Yet',
        emptyDesc: 'New technical insights are being prepared. Please check back soon.',
    };

    return (
        <main className="min-h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden selection:bg-blue-100 selection:text-blue-900">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            {/* Background Decor - Clean Lab Style */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-sky-100/40 rounded-full blur-[100px]"></div>
                {/* Subtle Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f080_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f080_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            </div>

            <div className="relative z-10 pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section - Static, rendered on server */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-blue-600 font-bold text-xs tracking-widest uppercase mb-6 shadow-sm hover:shadow-md transition-shadow cursor-default">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        {copy.badge}
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 text-slate-900 drop-shadow-sm">
                        INSIGHTS <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">HUB</span>
                    </h1>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
                        {copy.subtitle}
                    </p>
                </div>

                <div className="mb-12 bg-white rounded-[2rem] border border-slate-200 p-8 md:p-10 shadow-sm">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-rose-600 mb-3">
                                <HeartPulse size={14} /> Featured Topic Cluster
                            </p>
                            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">Industrial Ergonomics Hub</h2>
                            <p className="text-slate-600 max-w-2xl">
                                Explore practical guidance on health risks, productivity, and safety standards for industrial handling operations.
                            </p>
                        </div>
                        <Link
                            href="/news/ergonomics"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors"
                        >
                            Open Ergonomics Hub <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>

                {/* NewsGrid: Client Component untuk filter interaktif + rendering grid */}
                {posts.length > 0 ? (
                    <NewsGrid posts={posts} />
                ) : (
                    <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-200 shadow-sm">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                            <Zap size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">{copy.emptyTitle}</h3>
                        <p className="text-slate-500 max-w-md mx-auto">
                            {copy.emptyDesc}
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}
