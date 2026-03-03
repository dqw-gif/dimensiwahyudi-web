import type { Metadata } from 'next';
import { getAllPosts } from '../../services/wordpress';
import NewsGrid from '../../components/news/NewsGrid';
import { Zap } from 'lucide-react';

export const revalidate = 3600; // ISR cache for 1 hour

export const metadata: Metadata = {
    title: 'Insights Hub | Berita & Artikel Teknis | PT Dimensi Quantum Wahyudi',
    description: 'Eksplorasi konten seputar teknologi vakum, vacuum lifter, material handling, dan solusi industri terkini dari PT Dimensi Quantum Wahyudi.',
    openGraph: {
        title: 'Insights Hub | PT Dimensi Quantum Wahyudi',
        description: 'Berita, artikel teknis, dan case study seputar vacuum lifter & material handling industri.',
        url: 'https://dimensiwahyudi.com/news',
        siteName: 'PT Dimensi Quantum Wahyudi',
        locale: 'id_ID',
        type: 'website',
    },
};

export default async function NewsPage() {
    const posts = await getAllPosts();

    return (
        <main className="min-h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden selection:bg-blue-100 selection:text-blue-900">

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
                        Knowledge Base &amp; Updates
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 text-slate-900 drop-shadow-sm">
                        INSIGHTS <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">HUB</span>
                    </h1>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
                        Exploring the frontiers of vacuum technology, engineering precision, and industrial innovation.
                    </p>
                </div>

                {/* NewsGrid: Client Component untuk filter interaktif + rendering grid */}
                {posts.length > 0 ? (
                    <NewsGrid posts={posts} />
                ) : (
                    <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-200 shadow-sm">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                            <Zap size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Belum Ada Artikel</h3>
                        <p className="text-slate-500 max-w-md mx-auto">
                            Konten sedang disiapkan. Silakan kembali lagi nanti.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}
