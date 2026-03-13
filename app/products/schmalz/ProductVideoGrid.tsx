"use client";

import { useState } from 'react';
import { ArrowRight, ExternalLink, X } from 'lucide-react';
import Link from 'next/link';

type Video = {
    id: string;
    title: string;
    product: string;
    category: string;
    industry: string;
    desc: string;
};

export default function ProductVideoGrid({ videos }: { videos: Video[] }) {
    const [activeVideo, setActiveVideo] = useState<Video | null>(null);

    return (
        <section className="py-16 bg-slate-50 border-t border-slate-100">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-100 border border-red-200 rounded-full text-red-700 text-xs font-bold uppercase tracking-widest mb-4">
                        <svg className="w-3 h-3 fill-red-700" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        Official Demo Videos
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-3">See How It Works</h2>
                    <p className="text-slate-500 max-w-xl mx-auto text-sm">Official Schmalz demo videos showing products in real production environments.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-5 mb-8">
                    {videos.map(v => (
                        <div
                            key={v.id}
                            onClick={() => setActiveVideo(v)}
                            className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer"
                        >
                            <div className="relative aspect-video bg-slate-900">
                                <img
                                    src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`}
                                    alt={v.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                                        <svg className="w-5 h-5 fill-white ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4">
                                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{v.product}</span>
                                <p className="text-sm font-bold text-slate-900 mt-1 group-hover:text-blue-700 transition-colors line-clamp-2">{v.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center">
                    <Link href="/digital-assistant/video-library" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-colors">
                        View All Videos
                        <ArrowRight size={14} />
                    </Link>
                </div>
            </div>

            {/* Modal */}
            {activeVideo && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setActiveVideo(null)}>
                    <div className="bg-white rounded-2xl overflow-hidden max-w-3xl w-full shadow-2xl" onClick={e => e.stopPropagation()}>
                        <div className="aspect-video w-full">
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
                                <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">{activeVideo.product} · {activeVideo.category}</p>
                                <h3 className="font-bold text-slate-900 text-lg mb-1">{activeVideo.title}</h3>
                                <p className="text-slate-500 text-sm">{activeVideo.desc}</p>
                            </div>
                            <a
                                href={`https://www.youtube.com/watch?v=${activeVideo.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 shrink-0 whitespace-nowrap"
                            >
                                <ExternalLink size={14} /> Open on YouTube
                            </a>
                        </div>
                        <div className="px-6 pb-5">
                            <button onClick={() => setActiveVideo(null)} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors">
                                <X size={14} /> Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
