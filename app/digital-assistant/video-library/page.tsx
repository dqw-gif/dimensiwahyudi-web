'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Play,
    ExternalLink,
    Filter,
    X,
    Search,
    ArrowUpDown,
    ArrowRight,
    Car,
    AppWindow,
    Boxes,
    Hammer,
    Trees,
    FlaskConical,
    Cpu,
    Factory,
} from 'lucide-react';
import { videos } from '../../../data/videos';
import PreFooterCTA from '../../../components/PreFooterCTA';
import { useLanguage } from '@/components/LanguageProvider';

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

function getIndustryIcon(industry: string) {
    switch (industry) {
        case 'Automotive & Manufacturing':
            return Car;
        case 'Glass & Window':
            return AppWindow;
        case 'Logistics & Packaging':
            return Boxes;
        case 'Metal & Steel':
            return Hammer;
        case 'Wood & Furniture':
            return Trees;
        case 'Chemical & Pharma':
            return FlaskConical;
        case 'Electronics & Automation':
            return Cpu;
        default:
            return Factory;
    }
}

function VideoCard({
    v,
    source,
    watchText,
    onClick,
}: {
    v: typeof videos[0];
    source: SourceLabel;
    watchText: string;
    onClick: () => void;
}) {
    const isBinar = source === 'Binar';
    const IndustryIcon = getIndustryIcon(v.industry);

    return (
        <div
            className={`group bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-slate-900/5 rounded-3xl overflow-hidden transition-all duration-300 cursor-pointer shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:-translate-y-1.5 flex flex-col ${
                isBinar
                    ? 'hover:shadow-[0_20px_45px_-12px_rgba(220,38,38,0.18)] hover:border-red-400/50 hover:ring-red-400/20'
                    : 'hover:shadow-[0_20px_45px_-12px_rgba(0,85,150,0.18)] hover:border-[#005596]/35 hover:ring-[#005596]/20'
            }`}
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
                <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center group-hover:bg-slate-950/20 transition-colors">
                    <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform ${
                            isBinar ? 'bg-red-600' : 'bg-[#005596]'
                        }`}
                    >
                        <Play size={18} className="text-white fill-white ml-0.5" />
                    </div>
                </div>
                <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide bg-white/90 backdrop-blur-md text-slate-800 shadow-sm ring-1 ring-white/50">
                        <IndustryIcon size={12} className={isBinar ? 'text-red-600' : 'text-[#005596]'} />
                        <span>{v.category}</span>
                    </span>
                </div>
                <div className="absolute top-3 right-3">
                    <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-white shadow-sm backdrop-blur-md ring-1 ring-white/30 ${
                            isBinar ? 'bg-red-600' : 'bg-[#005596]'
                        }`}
                    >
                        {source}
                    </span>
                </div>
            </div>
            <div className="p-5 sm:p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                    <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                            isBinar
                                ? 'bg-red-500/10 text-red-600 border border-red-500/20'
                                : 'bg-[#005596]/10 text-[#005596] border border-[#005596]/20'
                        }`}
                        title={v.industry}
                    >
                        <IndustryIcon size={14} />
                    </div>
                    <span
                        className={`text-[11px] font-mono font-bold uppercase tracking-wider truncate ${
                            isBinar ? 'text-red-700/80' : 'text-[#005596]/80'
                        }`}
                    >
                        {v.product}
                    </span>
                </div>

                <h3
                    className={`font-extrabold text-slate-900 text-base leading-snug mb-2 transition-colors line-clamp-2 ${
                        isBinar ? 'group-hover:text-red-600' : 'group-hover:text-[#005596]'
                    }`}
                >
                    {v.title}
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-5 flex-1">
                    {v.desc}
                </p>

                <div
                    className={`w-full py-2.5 px-4 rounded-full font-bold text-xs text-center flex items-center justify-center gap-1.5 transition-all mt-auto ${
                        isBinar
                            ? 'bg-red-500/10 text-red-600 ring-1 ring-red-500/15 group-hover:bg-red-600 group-hover:text-white group-hover:ring-transparent'
                            : 'bg-[#005596]/10 text-[#005596] ring-1 ring-[#005596]/15 group-hover:bg-[#005596] group-hover:text-white group-hover:ring-transparent'
                    }`}
                >
                    <span>{watchText}</span>
                    <Play size={11} className="fill-current" />
                </div>
            </div>
        </div>
    );
}

function Modal({
    video,
    onClose,
    copy,
}: {
    video: typeof videos[0] | null;
    onClose: () => void;
    copy: { openYoutube: string; close: string; officialDemo: string };
}) {
    if (!video) return null;
    const isBinar = BINAR_VIDEO_IDS.has(video.id);

    return (
        <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl border border-white/80"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="aspect-video w-full bg-black">
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
                        <p
                            className={`text-xs font-bold uppercase tracking-wider mb-1.5 ${
                                isBinar ? 'text-red-600' : 'text-[#005596]'
                            }`}
                        >
                            {video.product} · {video.category} · {video.industry}
                        </p>
                        <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl mb-1.5 tracking-tight">
                            {video.title}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{video.desc}</p>
                    </div>
                    <a
                        href={`https://www.youtube.com/watch?v=${video.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-1.5 text-xs text-slate-400 shrink-0 whitespace-nowrap transition-colors ${
                            isBinar ? 'hover:text-red-600' : 'hover:text-[#005596]'
                        }`}
                    >
                        <ExternalLink size={14} /> {copy.openYoutube}
                    </a>
                </div>
                <div className="px-6 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                        onClick={onClose}
                        className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                    >
                        <X size={16} /> {copy.close}
                    </button>
                    <span
                        className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                            isBinar ? 'bg-red-500/10 text-red-600' : 'bg-[#005596]/10 text-[#005596]'
                        }`}
                    >
                        {copy.officialDemo}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default function VideoLibraryPage() {
    const { lang } = useLanguage();
    const isId = lang === 'id';

    const [activeBrand, setActiveBrand] = useState<'all' | 'Schmalz' | 'Binar'>('all');
    const [activeInd, setActiveInd] = useState(ALL);
    const [activeVideo, setActiveVideo] = useState<typeof videos[0] | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<SortKey>('newest');

    const copy = isId
        ? {
              badge: 'Galeri Video Resmi Schmalz & Binar',
              heroA: 'Lihat Cara Kerja Alat',
              heroB: 'di Lini Produksi Nyata',
              heroDesc:
                  'Kumpulan video demonstrasi resmi Schmalz dan Binar, mulai dari Vacuum Tube Lifter berkecepatan tinggi hingga sistem manipulator servo heavy-duty.',
              allBrands: 'Semua Brand',
              showingPrefix: 'Menampilkan',
              showingSuffix: 'video demonstrasi',
              filterIndustry: 'Industri:',
              allFilter: 'Semua',
              searchPlaceholder: 'Cari model produk, industri, atau kata kunci...',
              sortNewest: 'Urutan: Terpopuler',
              sortTitle: 'Urutan: A-Z',
              sortIndustry: 'Urutan: Berdasarkan Industri',
              noVideo: 'Tidak ada video untuk filter ini.',
              reset: 'Reset filter',
              watchDemo: 'Tonton Video Demo',
              schmalzTitle: 'Vacuum Handling & Lifting Solutions',
              schmalzDesc:
                  'Sistem Vacuum Tube Lifter ergonomis (JumboFlex, JumboErgo), VacuMaster heavy-duty sheet lifter, dan komponen Vacuum Gripping Systems.',
              viewAllSchmalz: 'Lihat Semua Produk Schmalz',
              binarTitle: 'Quick-Lift Servo Arms & Manipulators',
              binarDesc:
                  'Lengan angkat presisi bertenaga servo (QLA, QLR) dan manipulator pneumatik Ergo-Glass untuk penempatan beban yang sangat responsif.',
              viewAllBinar: 'Lihat Semua Produk Binar',
              ctaBadge: 'DEMO LANGSUNG & KALKULATOR TEKNIK',
              ctaTitle: 'Ingin Uji Coba Langsung (Trial Onsite)?',
              ctaDesc: 'Tim engineer aplikasi kami siap menjadwalkan demo dan trial unit langsung di fasilitas pabrik Anda.',
              ctaDemo: 'Ajukan Jadwal Trial Onsite',
              ctaCalc: 'Buka Vacuum Calculator',
              openYoutube: 'Buka di YouTube',
              close: 'Tutup',
              officialDemo: 'Demo Resmi',
          }
        : {
              badge: 'Schmalz & Binar Official Video Library',
              heroA: 'See How It Works',
              heroB: 'In Real Operations',
              heroDesc:
                  'A curated collection of official Schmalz and Binar demo videos, from lightweight tube lifters to heavy-duty ergonomic handling systems.',
              allBrands: 'All Brands',
              showingPrefix: 'Showing',
              showingSuffix: 'demo videos',
              filterIndustry: 'Industry:',
              allFilter: 'All',
              searchPlaceholder: 'Search product models, industries, or keywords...',
              sortNewest: 'Sort: Most Popular',
              sortTitle: 'Sort: A-Z',
              sortIndustry: 'Sort: By Industry',
              noVideo: 'No videos available for this filter.',
              reset: 'Reset filter',
              watchDemo: 'Watch Video Demo',
              schmalzTitle: 'Vacuum Handling & Lifting Solutions',
              schmalzDesc:
                  'Ergonomic vacuum tube lifting systems (JumboFlex, JumboErgo), VacuMaster heavy-duty sheet lifters, and modular vacuum gripping components.',
              viewAllSchmalz: 'View All Schmalz Products',
              binarTitle: 'Quick-Lift Servo Arms & Manipulators',
              binarDesc:
                  'Servo-driven precision lifting arms (QLA, QLR) and pneumatic Ergo-Glass manipulators for ultra-responsive load positioning.',
              viewAllBinar: 'View All Binar Products',
              ctaBadge: 'LIVE DEMO & ENGINEERING CALCULATOR',
              ctaTitle: 'Need a Live Demo?',
              ctaDesc: 'Our engineering team is ready to run an on-site demo at your facility.',
              ctaDemo: 'Request On-Site Demo',
              ctaCalc: 'Try Vacuum Calculator',
              openYoutube: 'Open on YouTube',
              close: 'Close',
              officialDemo: 'Official Demo',
          };

    const industryLabelMap: Record<string, string> = isId
        ? {
              'Automotive & Manufacturing': 'Otomotif & Manufaktur',
              'Glass & Window': 'Kaca & Jendela',
              'Logistics & Packaging': 'Logistik & Kemasan',
              'Metal & Steel': 'Logam & Baja',
              'Wood & Furniture': 'Kayu & Furnitur',
              'Chemical & Pharma': 'Kimia & Farmasi',
              'Electronics & Automation': 'Elektronik & Otomasi',
          }
        : {
              'Glass & Window': 'Glass & Windows',
              'Chemical & Pharma': 'Chemical & Pharmaceutical',
          };

    const industries = [
        { key: ALL, label: copy.allFilter },
        ...Array.from(new Set(videos.map((video) => video.industry)))
            .sort((a, b) => a.localeCompare(b))
            .map((industry) => ({
                key: industry,
                label: industryLabelMap[industry] ?? industry,
            })),
    ];

    const filtered = useMemo(() => {
        const normalizedQuery = searchQuery.trim().toLowerCase();

        const byIndustry = videos.filter((video) => activeInd === ALL || video.industry === activeInd);
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

        return byKeyword;
    }, [activeInd, searchQuery, sortBy]);

    const schmalzFiltered = useMemo(() => {
        return filtered.filter((v) => !BINAR_VIDEO_IDS.has(v.id));
    }, [filtered]);

    const binarFiltered = useMemo(() => {
        return filtered.filter((v) => BINAR_VIDEO_IDS.has(v.id));
    }, [filtered]);

    const schmalzTotalCount = useMemo(() => videos.filter((v) => !BINAR_VIDEO_IDS.has(v.id)).length, []);
    const binarTotalCount = useMemo(() => videos.filter((v) => BINAR_VIDEO_IDS.has(v.id)).length, []);

    const videoLibrarySchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: videos.map((v, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@type': 'VideoObject',
                name: v.title,
                description: v.desc || `Industrial demonstration of ${v.title} by PT Dimensi Quantum Wahyudi.`,
                thumbnailUrl: [
                    `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`,
                    `https://img.youtube.com/vi/${v.id}/mqdefault.jpg`,
                ],
                uploadDate: '2026-01-01T08:00:00+07:00',
                contentUrl: `https://www.youtube.com/watch?v=${v.id}`,
                embedUrl: `https://www.youtube-nocookie.com/embed/${v.id}`,
                publisher: {
                    '@type': 'Organization',
                    name: 'PT Dimensi Quantum Wahyudi',
                    url: 'https://dimensiwahyudi.com',
                },
            },
        })),
    };

    const activeCount =
        activeBrand === 'all' ? filtered.length : activeBrand === 'Schmalz' ? schmalzFiltered.length : binarFiltered.length;

    return (
        <main className="min-h-screen bg-slate-50">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(videoLibrarySchema) }}
            />

            {/* HERO */}
            <section className="relative pt-28 md:pt-36 pb-16 md:pb-24 bg-gradient-to-br from-slate-950 via-slate-900 to-[#005596]/85 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[360px] bg-[#005596]/25 rounded-full blur-[140px] pointer-events-none" />

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 border border-white/20 rounded-full text-white text-[11px] font-mono font-bold uppercase tracking-widest mb-6 backdrop-blur-md shadow-xs">
                        <Play size={11} className="fill-white" /> {copy.badge}
                    </div>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white leading-tight tracking-tight mb-5">
                        {copy.heroA}{' '}
                        <span className="bg-gradient-to-r from-blue-300 via-sky-200 to-white bg-clip-text text-transparent">
                            {copy.heroB}
                        </span>
                    </h1>
                    <p className="text-blue-100/90 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
                        {copy.heroDesc}
                    </p>
                </div>
            </section>

            {/* STICKY FILTER & BRAND BAR */}
            <div className="sticky top-0 z-20 bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 space-y-3">
                    {/* Primary Brand Selector Tabs */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="inline-flex items-center p-1 bg-slate-100/90 border border-slate-200/80 rounded-full w-fit">
                            <button
                                onClick={() => setActiveBrand('all')}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                                    activeBrand === 'all'
                                        ? 'bg-white text-slate-900 shadow-xs'
                                        : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                <span>{copy.allBrands}</span>
                                <span
                                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                                        activeBrand === 'all'
                                            ? 'bg-slate-100 text-slate-800'
                                            : 'bg-slate-200/70 text-slate-500'
                                    }`}
                                >
                                    {videos.length}
                                </span>
                            </button>

                            <button
                                onClick={() => setActiveBrand('Schmalz')}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                                    activeBrand === 'Schmalz'
                                        ? 'bg-[#005596] text-white shadow-xs'
                                        : 'text-slate-600 hover:text-[#005596]'
                                }`}
                            >
                                <span
                                    className={`w-2 h-2 rounded-full ${
                                        activeBrand === 'Schmalz' ? 'bg-sky-300' : 'bg-[#005596]'
                                    }`}
                                />
                                <span>Schmalz Germany</span>
                                <span
                                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                                        activeBrand === 'Schmalz'
                                            ? 'bg-white/20 text-white'
                                            : 'bg-slate-200/70 text-slate-500'
                                    }`}
                                >
                                    {schmalzTotalCount}
                                </span>
                            </button>

                            <button
                                onClick={() => setActiveBrand('Binar')}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                                    activeBrand === 'Binar'
                                        ? 'bg-red-600 text-white shadow-xs'
                                        : 'text-slate-600 hover:text-red-600'
                                }`}
                            >
                                <span
                                    className={`w-2 h-2 rounded-full ${
                                        activeBrand === 'Binar' ? 'bg-red-200' : 'bg-red-600'
                                    }`}
                                />
                                <span>Binar Sweden</span>
                                <span
                                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                                        activeBrand === 'Binar'
                                            ? 'bg-white/20 text-white'
                                            : 'bg-slate-200/70 text-slate-500'
                                    }`}
                                >
                                    {binarTotalCount}
                                </span>
                            </button>
                        </div>

                        <span className="text-xs text-slate-400 font-semibold shrink-0">
                            {copy.showingPrefix} {activeCount} {copy.showingSuffix}
                        </span>
                    </div>

                    {/* Secondary Industry Filters */}
                    <div className="flex items-center gap-2 flex-wrap pt-1 border-t border-slate-100">
                        <Filter size={13} className="text-[#005596] shrink-0" />
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            {copy.filterIndustry}
                        </span>
                        {industries.map((industry) => (
                            <button
                                key={industry.key}
                                onClick={() => setActiveInd(industry.key)}
                                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                                    activeInd === industry.key
                                        ? 'bg-[#005596] text-white shadow-2xs'
                                        : 'bg-white text-slate-600 border border-slate-200/90 hover:border-[#005596]/40 hover:text-[#005596]'
                                }`}
                            >
                                {industry.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* VIDEO LISTINGS */}
            <section className="py-10 md:py-14 max-w-7xl mx-auto px-4 sm:px-6">
                {/* Search & Sort Controls */}
                <div className="mb-10 grid gap-3 md:grid-cols-[1fr_auto]">
                    <div className="relative">
                        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={copy.searchPlaceholder}
                            className="w-full rounded-2xl border border-slate-200/90 bg-white/90 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition-all focus:border-[#005596] focus:ring-2 focus:ring-[#005596]/15 shadow-xs"
                        />
                    </div>
                    <div className="relative min-w-[220px]">
                        <ArrowUpDown
                            size={14}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                        />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as SortKey)}
                            className="w-full appearance-none rounded-2xl border border-slate-200/90 bg-white/90 py-2.5 pl-9 pr-8 text-sm font-semibold text-slate-700 outline-none transition-all focus:border-[#005596] focus:ring-2 focus:ring-[#005596]/15 shadow-xs cursor-pointer"
                        >
                            <option value="newest">{copy.sortNewest}</option>
                            <option value="title">{copy.sortTitle}</option>
                            <option value="industry">{copy.sortIndustry}</option>
                        </select>
                    </div>
                </div>

                {/* Content Sections */}
                {filtered.length === 0 ? (
                    <div className="text-center py-20 bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-slate-900/5 rounded-3xl p-10 text-slate-400">
                        <Play size={40} className="mx-auto mb-4 opacity-30 text-[#005596]" />
                        <p className="font-semibold text-slate-600">{copy.noVideo}</p>
                        <button
                            onClick={() => {
                                setActiveInd(ALL);
                                setSearchQuery('');
                                setActiveBrand('all');
                            }}
                            className="mt-3 text-sm text-[#005596] font-bold hover:underline underline-offset-4 cursor-pointer"
                        >
                            {copy.reset}
                        </button>
                    </div>
                ) : (
                    <div className="space-y-16">
                        {/* 1. SCHMALZ GERMANY SECTION */}
                        {(activeBrand === 'all' || activeBrand === 'Schmalz') && schmalzFiltered.length > 0 && (
                            <section className="space-y-6">
                                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200">
                                    <div className="space-y-1.5">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-[#005596] text-xs font-mono font-bold tracking-wider">
                                            <span className="w-2 h-2 rounded-full bg-[#005596]" />
                                            SCHMALZ GERMANY
                                        </div>
                                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                                            {copy.schmalzTitle}
                                        </h2>
                                        <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
                                            {copy.schmalzDesc}
                                        </p>
                                    </div>
                                    <Link
                                        href="/products/schmalz"
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#005596] hover:text-[#004276] hover:underline shrink-0"
                                    >
                                        <span>{copy.viewAllSchmalz}</span>
                                        <ArrowRight size={14} />
                                    </Link>
                                </div>

                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                    {schmalzFiltered.map((v) => (
                                        <VideoCard
                                            key={v.id}
                                            v={v}
                                            source="Schmalz"
                                            watchText={copy.watchDemo}
                                            onClick={() => setActiveVideo(v)}
                                        />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* 2. BINAR HANDLING SWEDEN SECTION */}
                        {(activeBrand === 'all' || activeBrand === 'Binar') && binarFiltered.length > 0 && (
                            <section className="space-y-6">
                                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-red-200">
                                    <div className="space-y-1.5">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200/80 text-red-600 text-xs font-mono font-bold tracking-wider">
                                            <span className="w-2 h-2 rounded-full bg-red-600" />
                                            BINAR HANDLING SWEDEN
                                        </div>
                                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                                            {copy.binarTitle}
                                        </h2>
                                        <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
                                            {copy.binarDesc}
                                        </p>
                                    </div>
                                    <Link
                                        href="/products/binar"
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 hover:underline shrink-0"
                                    >
                                        <span>{copy.viewAllBinar}</span>
                                        <ArrowRight size={14} />
                                    </Link>
                                </div>

                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                    {binarFiltered.map((v) => (
                                        <VideoCard
                                            key={v.id}
                                            v={v}
                                            source="Binar"
                                            watchText={copy.watchDemo}
                                            onClick={() => setActiveVideo(v)}
                                        />
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                )}
            </section>

            {/* PRE-FOOTER CTA */}
            <PreFooterCTA
                badge={copy.ctaBadge}
                title={copy.ctaTitle}
                description={copy.ctaDesc}
                primaryBtnText={copy.ctaDemo}
                primaryBtnHref="/contact"
                secondaryBtnText={copy.ctaCalc}
                secondaryBtnHref="/digital-assistant/vacuum-calculator"
            />

            <Modal
                video={activeVideo}
                onClose={() => setActiveVideo(null)}
                copy={{ openYoutube: copy.openYoutube, close: copy.close, officialDemo: copy.officialDemo }}
            />
        </main>
    );
}
