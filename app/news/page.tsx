import type { Metadata } from 'next';
import { getAllUnifiedArticles } from '@/services/articles';
import NewsHubClient from './NewsHubClient';

export const revalidate = 604800; // Incremental Static Regeneration: 7 days

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
    const posts = await getAllUnifiedArticles();
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

    return (
        <main className="min-h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden selection:bg-blue-100 selection:text-blue-900">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-sky-100/40 rounded-full blur-[100px]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f080_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f080_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            </div>

            <NewsHubClient posts={posts} />
        </main>
    );
}
