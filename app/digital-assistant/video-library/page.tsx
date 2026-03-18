'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, ExternalLink, Filter, X, Search, ArrowUpDown } from 'lucide-react';
import { spacingTokens } from '../../../constants/spacingTokens';

// ─────────────────────────────────────────────────────────────────────────────
// SCHMALZ VIDEO LIBRARY
// Managed via Admin CMS Dashboard
// ─────────────────────────────────────────────────────────────────────────────
import { videos } from '../../../data/videos';

const ALL = 'all';
const BINAR_VIDEO_IDS = new Set([
    'k6plgvsJOn0',
    'NP26W7Op55Q',
    'ir6TccqPuyY',
    'XLrabCCFk-c',
]);

type SourceLabel = 'Schmalz' | 'Binar';
type SortKey = 'newest' | 'title' | 'industry';

function getSourceByVideoId(id: string): SourceLabel {
    return BINAR_VIDEO_IDS.has(id) ? 'Binar' : 'Schmalz';
}

function VideoCard({ v, source, onClick }: { v: typeof videos[0]; source: SourceLabel; onClick: () => void }) {
    return (
        <div
            className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-blue-300 transition-all duration-300 cursor-pointer"
            onClick={onClick}
        >
            <div className="relative aspect-video bg-slate-900 overflow-hidden">
                <Image
                    src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`}
                    alt={v.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                    <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                        <Play size={22} className="text-white fill-white ml-1" />
                    </div>
                </div>
                <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-md uppercase tracking-wide">
                        {v.category}
                    </span>
                </div>
                <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 text-[10px] font-bold rounded-md uppercase tracking-wide ${source === 'Binar' ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-700'}`}>
                        {source}
                    </span>
                </div>
            </div>
            <div className="p-5">
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">{v.product} · {v.industry}</p>
                <h3 className="font-bold text-slate-900 text-sm leading-snug mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">{v.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">{v.desc}</p>
            </div>
        </div>
    );
}

function Modal({ video, onClose, copy }: { video: typeof videos[0] | null; onClose: () => void; copy: { openYoutube: string; close: string } }) {
    if (!video) return null;
    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl overflow-hidden max-w-3xl w-full shadow-2xl" onClick={e => e.stopPropagation()}>
                <div className="aspect-video w-full">
                    <iframe
                        src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                    />
                </div>
                <div className="p-6 flex items-start justify-between gap-4">
                    <div>
                        <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">{video.product} · {video.category}</p>
                        <h3 className="font-bold text-slate-900 text-lg mb-1">{video.title}</h3>
                        <p className="text-slate-500 text-sm">{video.desc}</p>
                    </div>
                    <a
                        href={`https://www.youtube.com/watch?v=${video.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 shrink-0 whitespace-nowrap"
                    >
                        <ExternalLink size={14} /> {copy.openYoutube}
                    </a>
                </div>
                <div className="px-6 pb-5">
                    <button onClick={onClose} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors">
                        <X size={14} /> {copy.close}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function VideoLibraryPage() {
    const [activeInd, setActiveInd] = useState(ALL);
    const [activeVideo, setActiveVideo] = useState<typeof videos[0] | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<SortKey>('newest');

    const copy = {
        badge: 'Schmalz & Binar Official Video Library',
        heroA: 'See How It Works',
        heroB: 'In Real Operations',
        heroDesc:
            'A curated collection of official Schmalz and Binar demo videos, from lightweight tube lifters to heavy-duty ergonomic handling systems.',
        filterIndustry: 'Industry:',
        videoCount: 'videos',
        noVideo: 'No videos available for this filter.',
        reset: 'Reset filter',
        ctaTitle: 'Need a Live Demo?',
        ctaDesc: 'Our engineering team is ready to run an on-site demo at your facility.',
        ctaDemo: 'Request On-Site Demo',
        ctaCalc: 'Try Vacuum Calculator',
        openYoutube: 'Open on YouTube',
        close: 'Close',
    };

    const industryLabelMap: Record<string, string> = {
        'Glass & Window': 'Glass & Windows',
        'Chemical & Pharma': 'Chemical & Pharmaceutical',
    };

    const industries = [
        { key: ALL, label: 'All' },
        ...Array.from(new Set(videos.map((video) => video.industry)))
            .sort((a, b) => a.localeCompare(b))
            .map((industry) => ({
                key: industry,
                label: industryLabelMap[industry] ?? industry,
            })),
    ];

    const filtered = useMemo(() => {
        const normalizedQuery = searchQuery.trim().toLowerCase();

        const byIndustry = videos.filter((video) => (activeInd === ALL || video.industry === activeInd));
        const byKeyword = normalizedQuery
            ? byIndustry.filter((video) => {
                const source = getSourceByVideoId(video.id);
                const haystack = [video.title, video.desc, video.product, video.category, video.industry, source]
                    .join(' ')
                    .toLowerCase();
                return haystack.includes(normalizedQuery);
            })
            : byIndustry;

        if (sortBy === 'title') {
            return [...byKeyword].sort((a, b) => a.title.localeCompare(b.title));
        }

        if (sortBy === 'industry') {
            return [...byKeyword].sort((a, b) => {
                const byIndustryName = a.industry.localeCompare(b.industry);
                if (byIndustryName !== 0) return byIndustryName;
                return a.title.localeCompare(b.title);
            });
        }

        // "Newest" follows curated data order from `videos`.
        return byKeyword;
    }, [activeInd, searchQuery, sortBy]);

    return (
        <main className="min-h-screen bg-slate-50">

            {/* HERO */}
            <section className={`${spacingTokens.hero.standard} bg-slate-950 relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
                <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(37,99,235,0.3) 0%, transparent 70%)' }} />
                <div className={`${spacingTokens.page.containerCompact} max-w-4xl relative text-center`}>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-600/20 border border-red-500/30 rounded-full text-red-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <Play size={11} className="fill-red-400" /> {copy.badge}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-5">
                        {copy.heroA}{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                            {copy.heroB}
                        </span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        {copy.heroDesc}
                    </p>
                </div>
            </section>

            {/* FILTER */}
            <div className="sticky top-0 z-20 bg-white border-b border-slate-200 shadow-sm">
                <div className={`${spacingTokens.page.containerNarrow} py-3 flex flex-wrap items-center gap-4`}>
                    <div className="flex items-center gap-2 flex-wrap">
                        <Filter size={14} className="text-slate-400 shrink-0" />
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{copy.filterIndustry}</span>
                        {industries.map((industry) => (
                            <button key={industry.key} onClick={() => setActiveInd(industry.key)}
                                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${activeInd === industry.key ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                                {industry.label}
                            </button>
                        ))}
                    </div>
                    <span className="ml-auto text-xs text-slate-400 font-medium shrink-0">{filtered.length} / {videos.length} {copy.videoCount}</span>
                </div>
            </div>

            {/* VIDEO GRID */}
            <section className={`${spacingTokens.section.compact} ${spacingTokens.page.containerNarrow}`}>
                <div className="mb-6 grid gap-3 md:grid-cols-[1fr_auto]">
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search use-case, product, industry, or source..."
                            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-700 outline-none transition-colors focus:border-blue-400"
                        />
                    </div>
                    <div className="relative min-w-[220px]">
                        <ArrowUpDown size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as SortKey)}
                            className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-8 pr-8 text-sm font-medium text-slate-700 outline-none transition-colors focus:border-blue-400"
                        >
                            <option value="newest">Sort: Newest</option>
                            <option value="title">Sort: A-Z</option>
                            <option value="industry">Sort: By Industry</option>
                        </select>
                    </div>
                </div>

                {filtered.length === 0 ? (
                    <div className="text-center py-20 text-slate-400">
                        <Play size={40} className="mx-auto mb-4 opacity-30" />
                        <p className="font-semibold">{copy.noVideo}</p>
                        <button onClick={() => { setActiveInd(ALL); setSearchQuery(''); }} className="mt-3 text-sm text-blue-600 underline underline-offset-4">{copy.reset}</button>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map(v => (
                            <VideoCard key={v.id} v={v} source={getSourceByVideoId(v.id)} onClick={() => setActiveVideo(v)} />
                        ))}
                    </div>
                )}
            </section>


            {/* CTA */}
            <section className={`${spacingTokens.section.compact} border-t border-slate-200 bg-white`}>
                <div className={`${spacingTokens.page.containerCompact} max-w-2xl text-center`}>
                    <h2 className="text-2xl font-black text-slate-900 mb-3">{copy.ctaTitle}</h2>
                    <p className="text-slate-500 mb-7">{copy.ctaDesc}</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link href="/contact" className="px-7 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors">
                            {copy.ctaDemo}
                        </Link>
                        <Link href="/digital-assistant/vacuum-calculator" className="px-7 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors">
                            {copy.ctaCalc}
                        </Link>
                    </div>
                </div>
            </section>

            <Modal video={activeVideo} onClose={() => setActiveVideo(null)} copy={{ openYoutube: copy.openYoutube, close: copy.close }} />
        </main>
    );
}
