'use client';

import Link from 'next/link';
import nextDynamic from 'next/dynamic';
import { FileText, ArrowRight } from 'lucide-react';
import PreFooterCTA from '@/components/PreFooterCTA';
import type { PostSummary } from '../../types/wordpress';
import { useLanguage } from '@/components/LanguageProvider';

const NewsGrid = nextDynamic(() => import('../../components/news/NewsGrid'), {
    loading: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Loading articles">
            {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-72 rounded-3xl bg-white border border-slate-200 animate-pulse" />
            ))}
        </div>
    ),
});

export default function NewsHubClient({ posts }: { posts: PostSummary[] }) {
    const { lang } = useLanguage();
    const isId = lang === 'id';

    const copy = isId
        ? {
              badge: 'Pusat Pengetahuan & Artikel Teknis',
              subtitle:
                  'Wawasan praktis seputar teknologi vakum, presisi engineering, dan peningkatan produktivitas manufaktur di Indonesia.',
              clusterBadge: 'KLASTER PENGETAHUAN ERGONOMI',
              clusterTitle: 'Pusat Ergonomi Industri',
              clusterDesc:
                  'Panduan praktis material handling manual: pencegahan cedera otot dan tulang belakang (MSD), optimasi throughput produksi, serta kepatuhan K3 di pabrik manufaktur.',
              clusterBtn: 'Buka Pusat Ergonomi',
              emptyTitle: 'Belum Ada Artikel',
              emptyDesc: 'Artikel teknis baru sedang disiapkan oleh tim redaksi kami.',
              ctaBadge: 'KONSULTASI TEKNIS & STUDI KELAYAKAN',
              ctaTitle: 'Evaluasi Solusi Alat Angkat Bersama Tim Engineer Kami',
              ctaDesc:
                  'Tim engineer aplikasi kami menganalisis siklus alur kerja, memverifikasi batas beban aman (SWL), dan mengonfigurasi sistem Vacuum Lifter serta Crane untuk pabrik Anda.',
              ctaPrimary: 'Hubungi Tim Engineer Kami',
              ctaSecondary: 'Katalog & Brosur Resmi',
          }
        : {
              badge: 'Knowledge Base & Updates',
              subtitle:
                  'Practical insights on vacuum technology, engineering precision, and measurable industrial improvement.',
              clusterBadge: 'ERGONOMICS KNOWLEDGE CLUSTER',
              clusterTitle: 'Industrial Ergonomics Hub',
              clusterDesc:
                  'Practical guidance on manual material handling: musculoskeletal disorder (MSD) prevention, production throughput optimization, and workplace safety compliance in Indonesian manufacturing.',
              clusterBtn: 'Explore Ergonomics Hub',
              emptyTitle: 'No Articles Yet',
              emptyDesc: 'New technical insights are being prepared. Please check back soon.',
              ctaBadge: 'TECHNICAL CONSULTATION & WORKSHOP FEASIBILITY',
              ctaTitle: 'Review Lifting Solutions with Our Application Engineers',
              ctaDesc:
                  'Our engineering team analyzes workflow cycles, verifies working load limits (WLL), and configures vacuum and hoist systems for your specific facility requirements.',
              ctaPrimary: 'Contact Our Engineering Team',
              ctaSecondary: 'Official Catalogs & Brochures',
          };

    return (
        <>
            <div className="relative z-10 pt-28 md:pt-32 pb-20 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-16 md:mb-20">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-[#005596]/15 shadow-[0_2px_10px_rgba(0,85,150,0.06)] mb-6 cursor-default">
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#005596]">
                            {copy.badge}
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 text-slate-900 drop-shadow-sm">
                        INSIGHTS{' '}
                        <span className="bg-gradient-to-r from-[#005596] to-[#1d4ed8] bg-clip-text text-transparent">
                            HUB
                        </span>
                    </h1>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
                        {copy.subtitle}
                    </p>
                </div>

                {/* Featured Topic Cluster Showcase */}
                <div className="mb-12 bg-white/85 backdrop-blur-2xl rounded-3xl border border-white/95 ring-1 ring-[#005596]/12 p-7 md:p-10 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)]">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div className="space-y-2">
                            <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-blue-50/80 border border-blue-200/60 shadow-xs">
                                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#005596]">
                                    {copy.clusterBadge}
                                </span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                                {copy.clusterTitle}
                            </h2>
                            <p className="text-slate-600 max-w-2xl text-sm sm:text-base leading-relaxed">
                                {copy.clusterDesc}
                            </p>
                        </div>
                        <Link
                            href="/news/ergonomics"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#005596] hover:bg-[#004276] text-white text-sm font-bold rounded-full shadow-[0_4px_16px_rgba(0,85,150,0.25)] hover:shadow-[0_8px_24px_rgba(0,85,150,0.35)] hover:-translate-y-0.5 transition-all shrink-0 w-full sm:w-auto text-center"
                        >
                            <span>{copy.clusterBtn}</span>
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>

                {/* NewsGrid */}
                {posts.length > 0 ? (
                    <NewsGrid posts={posts} />
                ) : (
                    <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-200 shadow-sm">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                            <FileText size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">{copy.emptyTitle}</h3>
                        <p className="text-slate-500 max-w-md mx-auto">{copy.emptyDesc}</p>
                    </div>
                )}
            </div>

            {/* PRE-FOOTER CTA */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <PreFooterCTA
                    badge={copy.ctaBadge}
                    title={copy.ctaTitle}
                    description={copy.ctaDesc}
                    primaryBtnText={copy.ctaPrimary}
                    primaryBtnHref="/contact"
                    secondaryBtnText={copy.ctaSecondary}
                    secondaryBtnHref="/brosur"
                />
            </div>
        </>
    );
}
