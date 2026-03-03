'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Play, ExternalLink, Filter, X, Plus } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// SCHMALZ VIDEO LIBRARY
// Managed via Admin CMS Dashboard
// ─────────────────────────────────────────────────────────────────────────────
import { videos } from '../../../data/videos';

const ALL = 'Semua';
const industries = [ALL, 'Otomotif & Manufaktur', 'Kaca & Jendela', 'Logistik & Kemasan', 'Logam & Baja', 'Kayu & Furnitur', 'Kimia & Farmasi'];

function VideoCard({ v, onClick }: { v: typeof videos[0]; onClick: () => void }) {
    return (
        <div
            className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-blue-300 transition-all duration-300 cursor-pointer"
            onClick={onClick}
        >
            <div className="relative aspect-video bg-slate-900 overflow-hidden">
                <img
                    src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`}
                    alt={v.title}
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
            </div>
            <div className="p-5">
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">{v.product} · {v.industry}</p>
                <h3 className="font-bold text-slate-900 text-sm leading-snug mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">{v.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">{v.desc}</p>
            </div>
        </div>
    );
}

function Modal({ video, onClose }: { video: typeof videos[0] | null; onClose: () => void }) {
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
                        <ExternalLink size={14} /> Buka YouTube
                    </a>
                </div>
                <div className="px-6 pb-5">
                    <button onClick={onClose} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors">
                        <X size={14} /> Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function VideoLibraryPage() {
    const [activeInd, setActiveInd] = useState(ALL);
    const [activeVideo, setActiveVideo] = useState<typeof videos[0] | null>(null);

    const filtered = videos.filter(v =>
        (activeInd === ALL || v.industry === activeInd)
    );

    return (
        <main className="min-h-screen bg-slate-50">

            {/* HERO */}
            <section className="pt-32 pb-14 bg-slate-950 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
                <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(37,99,235,0.3) 0%, transparent 70%)' }} />
                <div className="relative max-w-4xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-600/20 border border-red-500/30 rounded-full text-red-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <Play size={11} className="fill-red-400" /> Schmalz Official Video Library
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-5">
                        Lihat Cara Kerja{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                            Nyata-nya
                        </span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Koleksi video demo resmi produk Schmalz — dari tube lifter ringan hingga vacuum lifting device berton-ton.
                    </p>
                </div>
            </section>

            {/* FILTER */}
            <div className="sticky top-0 z-20 bg-white border-b border-slate-200 shadow-sm">
                <div className="max-w-6xl mx-auto px-6 py-3 flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2 flex-wrap">
                        <Filter size={14} className="text-slate-400 shrink-0" />
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Industri:</span>
                        {industries.map(i => (
                            <button key={i} onClick={() => setActiveInd(i)}
                                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${activeInd === i ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                                {i}
                            </button>
                        ))}
                    </div>
                    <span className="ml-auto text-xs text-slate-400 font-medium shrink-0">{filtered.length} / {videos.length} video</span>
                </div>
            </div>

            {/* VIDEO GRID */}
            <section className="max-w-6xl mx-auto px-6 py-12">
                {filtered.length === 0 ? (
                    <div className="text-center py-20 text-slate-400">
                        <Play size={40} className="mx-auto mb-4 opacity-30" />
                        <p className="font-semibold">Tidak ada video untuk filter ini.</p>
                        <button onClick={() => setActiveInd(ALL)} className="mt-3 text-sm text-blue-600 underline underline-offset-4">Reset filter</button>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map(v => (
                            <VideoCard key={v.id} v={v} onClick={() => setActiveVideo(v)} />
                        ))}
                    </div>
                )}
            </section>


            {/* CTA */}
            <section className="border-t border-slate-200 bg-white py-14">
                <div className="max-w-2xl mx-auto px-6 text-center">
                    <h2 className="text-2xl font-black text-slate-900 mb-3">Butuh Demo Langsung?</h2>
                    <p className="text-slate-500 mb-7">Tim engineer PT Dimensi Quantum Wahyudi siap melakukan demo on-site di fasilitas Anda.</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link href="/contact" className="px-7 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors">
                            Request Demo On-Site
                        </Link>
                        <Link href="/digital-assistant/vacuum-calculator" className="px-7 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors">
                            Coba Vacuum Calculator
                        </Link>
                    </div>
                </div>
            </section>

            <Modal video={activeVideo} onClose={() => setActiveVideo(null)} />
        </main>
    );
}
