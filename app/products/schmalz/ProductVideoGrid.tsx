"use client";

import { useState } from 'react';
import { ArrowRight, ExternalLink, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../../../components/LanguageProvider';

type Video = {
    id: string;
    title: string;
    product: string;
    category: string;
    industry: string;
    desc: string;
};

interface ProductVideoGridProps {
    videos: Video[];
    brand?: 'schmalz' | 'binar';
}

export default function ProductVideoGrid({ videos, brand = 'schmalz' }: ProductVideoGridProps) {
    const [activeVideo, setActiveVideo] = useState<Video | null>(null);
    const { lang } = useLanguage();
    const isId = lang === 'id';
    const isBinar = brand === 'binar';

    return (
        <section className="py-20 bg-slate-50 border-t border-slate-200/80 relative">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-12">
                    <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-xs ${
                        isBinar 
                            ? 'bg-red-500/10 border border-red-500/20 text-red-600'
                            : 'bg-[#005596]/10 border border-[#005596]/20 text-[#005596]'
                    }`}>
                        <svg className={`w-3 h-3 ${isBinar ? 'fill-red-600' : 'fill-[#005596]'}`} viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        {isId ? 'Video Demo Resmi' : 'Official Demo Videos'}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
                        {isId ? 'Cara Kerja Sistem di Lini Produksi' : 'See How It Works'}
                    </h2>
                    <p className="text-slate-600 max-w-xl mx-auto text-base leading-relaxed">
                        {isBinar 
                            ? (isId
                                ? 'Dokumentasi video resmi Binar Handling yang menampilkan pengoperasian lengan manipulator di lingkungan pabrik.'
                                : 'Official Binar Handling demo videos showing products in real production environments.')
                            : (isId
                                ? 'Dokumentasi video resmi Schmalz yang menampilkan kinerja sistem vacuum lifting di lingkungan produksi aktual.'
                                : 'Official Schmalz demo videos showing products in real production environments.')}
                    </p>
                </div>

                <div className="flex md:grid md:grid-cols-3 gap-5 md:gap-6 mb-4 md:mb-10 overflow-x-auto md:overflow-visible snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden -mx-6 px-6 md:mx-0 md:px-0 py-2">
                    {videos.map(v => (
                        <div
                            key={v.id}
                            onClick={() => setActiveVideo(v)}
                            className={`group shrink-0 w-[82vw] sm:w-[65vw] md:w-auto snap-center bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-slate-900/5 rounded-3xl overflow-hidden transition-all cursor-pointer shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:-translate-y-1 ${
                                isBinar 
                                    ? 'hover:shadow-[0_20px_40px_-12px_rgba(220,38,38,0.15)] hover:border-red-400/50 hover:ring-red-400/20'
                                    : 'hover:shadow-[0_20px_40px_-12px_rgba(0,85,150,0.15)] hover:border-[#005596]/30 hover:ring-[#005596]/20'
                            }`}
                        >
                            <div className="relative aspect-video bg-slate-900 overflow-hidden">
                                <Image
                                    src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`}
                                    alt={v.title}
                                    fill
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center group-hover:bg-slate-950/20 transition-colors">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl ${
                                        isBinar ? 'bg-red-600' : 'bg-[#005596]'
                                    }`}>
                                        <svg className="w-5 h-5 fill-white ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                    </div>
                                </div>
                            </div>
                            <div className="p-5">
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${
                                    isBinar
                                        ? 'text-red-600 bg-red-500/10 border-red-500/15'
                                        : 'text-[#005596] bg-[#005596]/10 border-[#005596]/15'
                                }`}>
                                    {v.product}
                                </span>
                                <p className={`text-sm font-bold text-slate-900 mt-3 transition-colors line-clamp-2 leading-snug ${
                                    isBinar ? 'group-hover:text-red-600' : 'group-hover:text-[#005596]'
                                }`}>
                                    {v.title}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile swipe hint */}
                <div className="flex md:hidden items-center justify-center gap-1.5 text-xs text-slate-400 mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                    <span>{isId ? 'Geser ke samping untuk melihat video lainnya' : 'Swipe horizontally to view more videos'}</span>
                    <span className="text-slate-500 font-bold">→</span>
                </div>

                <div className="text-center">
                    <Link 
                        href="/digital-assistant/video-library" 
                        className={`inline-flex items-center gap-2 px-7 py-3.5 text-white font-bold rounded-xl text-sm transition-all hover:-translate-y-0.5 ${
                            isBinar
                                ? 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 shadow-[0_6px_20px_-3px_rgba(220,38,38,0.35)]'
                                : 'bg-gradient-to-r from-[#005596] to-[#1d4ed8] hover:from-[#00447a] hover:to-[#1e40af] shadow-[0_6px_20px_-3px_rgba(0,85,150,0.35)]'
                        }`}
                    >
                        {isId ? 'Lihat Semua Video Demo' : 'View All Videos'}
                        <ArrowRight size={14} />
                    </Link>
                </div>
            </div>

            {/* Modal */}
            {activeVideo && (
                <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={() => setActiveVideo(null)}>
                    <div className="bg-white rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl border border-white/80" onClick={e => e.stopPropagation()}>
                        <div className="aspect-video w-full bg-black">
                            <iframe
                                src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&rel=0`}
                                title={activeVideo.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                            />
                        </div>
                        <div className="p-6 flex items-start justify-between gap-4">
                            <div>
                                <p className={`text-xs font-bold uppercase tracking-wider mb-1.5 ${isBinar ? 'text-red-600' : 'text-[#005596]'}`}>
                                    {activeVideo.product} · {activeVideo.category}
                                </p>
                                <h3 className="font-extrabold text-slate-900 text-lg mb-1 tracking-tight">{activeVideo.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{activeVideo.desc}</p>
                            </div>
                            <a
                                href={`https://www.youtube.com/watch?v=${activeVideo.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-1 text-xs text-slate-400 shrink-0 whitespace-nowrap transition-colors ${
                                    isBinar ? 'hover:text-red-600' : 'hover:text-[#005596]'
                                }`}
                            >
                                <ExternalLink size={14} /> {isId ? 'Buka di YouTube' : 'Open on YouTube'}
                            </a>
                        </div>
                        <div className="px-6 pb-5 border-t border-slate-100 pt-3">
                            <button onClick={() => setActiveVideo(null)} className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                                <X size={16} /> {isId ? 'Tutup' : 'Close'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
