'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ChevronLeft, Clock, ArrowRight, ShieldCheck, CheckCircle2, MessageSquare, Wrench } from 'lucide-react';
import ShareButton from '../../../components/news/ShareButton';
import PreFooterCTA from '../../../components/PreFooterCTA';
import { useLanguage } from '../../../components/LanguageProvider';

export interface SanitizedRelatedPost {
    id?: string;
    slug: string;
    title: string;
    date: string;
    excerptHtml: string;
    categoryName?: string;
    imgUrl: string;
}

interface PostDetailClientProps {
    title: string;
    slug: string;
    categoryName: string;
    authorName: string;
    dateStr: string;
    readTime: number;
    featuredImgUrl: string;
    sanitizedHtml: string;
    relatedPosts: SanitizedRelatedPost[];
}

export default function PostDetailClient({
    title,
    slug,
    categoryName,
    authorName,
    dateStr,
    readTime,
    featuredImgUrl,
    sanitizedHtml,
    relatedPosts,
}: PostDetailClientProps) {
    const { lang } = useLanguage();
    const isId = lang === 'id';

    function formatDate(dateString: string) {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat(isId ? 'id-ID' : 'en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(date);
    }

    const formattedDate = formatDate(dateStr);

    return (
        <>
            {/* Top Section: Breadcrumb Trail, Category Badge, Title */}
            <div className="pt-28 sm:pt-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Navigation Trail */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <Link
                        href="/news"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 hover:bg-white border border-slate-200/80 hover:border-[#005596]/40 text-xs font-bold text-slate-700 hover:text-[#005596] shadow-xs hover:shadow-sm transition-all group"
                    >
                        <ChevronLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
                        <span>{isId ? 'Kembali ke Insights' : 'Back to Insights'}</span>
                    </Link>

                    {/* Standardized Category Badge */}
                    <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-xl border border-white/95 ring-1 ring-[#005596]/15 shadow-xs">
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#005596]">
                            {categoryName}
                        </span>
                    </div>
                </div>

                {/* Monumental Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] mb-6 max-w-5xl">
                    {title}
                </h1>

                {/* Technical Meta HUD Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 py-4 px-6 bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-200/80 shadow-xs mb-8">
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-600">
                        <span className="font-bold text-slate-800">
                            {authorName}
                        </span>
                        <div className="hidden sm:inline text-slate-300">&bull;</div>
                        <div className="flex items-center gap-1.5 font-mono text-slate-500">
                            <Calendar size={14} className="text-[#005596]" />
                            <span>{formattedDate}</span>
                        </div>
                        <div className="hidden sm:inline text-slate-300">&bull;</div>
                        <div className="flex items-center gap-1.5 text-slate-500">
                            <Clock size={14} className="text-[#005596]" />
                            <span>{readTime} {isId ? 'Menit Baca' : 'Min Read'}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">
                            {isId ? 'Bagikan:' : 'Share:'}
                        </span>
                        <ShareButton title={title} slug={slug} />
                    </div>
                </div>

                {/* Editorial Featured Image */}
                {featuredImgUrl && (
                    <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-3xl overflow-hidden border border-slate-200/80 shadow-[0_20px_50px_-15px_rgba(0,85,150,0.08)] mb-12 bg-slate-950">
                        <Image
                            src={featuredImgUrl}
                            alt={title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                {/* 12-Column Editorial Architecture */}
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-20">
                    {/* Left: Main Article Content (Col 8) */}
                    <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 md:p-14 border border-slate-200/80 shadow-[0_4px_25px_-5px_rgba(0,85,150,0.04)]">
                        <div
                            className="prose prose-lg prose-slate max-w-none
                            prose-headings:font-black prose-headings:text-slate-900 prose-headings:tracking-tight
                            prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pt-6 prose-h2:border-t prose-h2:border-slate-100
                            prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
                            prose-p:text-slate-600 prose-p:leading-relaxed prose-p:text-base sm:prose-p:text-lg prose-p:text-justify
                            prose-a:text-[#005596] prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                            prose-img:rounded-2xl prose-img:border prose-img:border-slate-200/80 prose-img:shadow-md prose-img:my-8
                            prose-strong:text-slate-900 prose-strong:font-bold
                            prose-blockquote:border-l-4 prose-blockquote:border-[#005596] prose-blockquote:bg-blue-50/40 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-blockquote:text-slate-700
                            prose-ol:list-decimal prose-ul:list-disc prose-li:text-slate-600 prose-li:my-1
                            prose-table:border prose-table:border-slate-200 prose-th:bg-slate-50 prose-th:p-3 prose-td:p-3
                            [&_iframe]:w-full [&_iframe]:aspect-video [&_iframe]:rounded-2xl [&_iframe]:my-8"
                            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
                        />
                    </div>

                    {/* Right: Focused Sticky Engineering Sidebar (Col 4) */}
                    <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
                        {/* Primary Technical Consultation Card */}
                        <div className="bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] rounded-3xl p-6 sm:p-7">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[#005596] text-[11px] font-mono font-bold uppercase tracking-wider mb-4">
                                <Wrench size={12} />
                                <span>{isId ? 'KONSULTASI TEKNIS' : 'TECHNICAL CONSULTATION'}</span>
                            </div>

                            <h3 className="text-xl font-black text-slate-900 tracking-tight leading-snug mb-3">
                                {isId ? 'Butuh Konfigurasi Material Handling Serupa?' : 'Need a Similar Handling Setup?'}
                            </h3>

                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                                {isId
                                    ? 'Konsultasikan parameter beban, dimensi area kerja, dan uji langsung workpiece fisik Anda di fasilitas workshop engineering kami di Cikarang.'
                                    : 'Review load parameters, operational envelope, and test your physical workpieces at our Cikarang engineering testing facility.'}
                            </p>

                            <div className="space-y-3">
                                <a
                                    href="https://wa.me/6281119168752?text=Hello%20DQW,%20I%20would%20like%20to%20consult%20on%20material%20handling%20solutions"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 w-full py-3 bg-[#005596] hover:bg-[#004276] text-white text-xs font-bold rounded-full shadow-[0_4px_14px_rgba(0,85,150,0.25)] hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
                                >
                                    <MessageSquare size={14} />
                                    <span>{isId ? 'WhatsApp Tim Engineering' : 'WhatsApp Engineering'}</span>
                                </a>

                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-slate-50 hover:bg-white text-slate-700 hover:text-[#005596] border border-slate-200 rounded-full text-xs font-bold transition-all"
                                >
                                    <span>{isId ? 'Jadwalkan Survei Lantai Pabrik' : 'Schedule Plant Survey'}</span>
                                    <ArrowRight size={13} />
                                </Link>
                            </div>
                        </div>

                        {/* Official Engineering Credentials */}
                        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                            <div className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
                                {isId ? 'STANDAR ENGINEERING EROPA:' : 'EUROPEAN ENGINEERING STANDARDS:'}
                            </div>

                            <div className="space-y-3.5">
                                <div className="flex items-start gap-3">
                                    <ShieldCheck className="w-5 h-5 text-[#005596] shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-xs font-bold text-slate-800">
                                            {isId ? 'Distributor Resmi Schmalz & Binar' : 'Authorized Schmalz & Binar Distributor'}
                                        </p>
                                        <p className="text-[11px] text-slate-500">
                                            {isId
                                                ? '100% unit dan suku cadang asli dari prinsipal Jerman dan Swedia.'
                                                : '100% genuine German and Swedish engineering components.'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-[#005596] shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-xs font-bold text-slate-800">
                                            {isId ? 'Sertifikasi Medis AGR Jerman' : 'German AGR Medical Certification'}
                                        </p>
                                        <p className="text-[11px] text-slate-500">
                                            {isId
                                                ? 'Teruji klinis mencegah kompresi tulang belakang dan cedera otot operator.'
                                                : 'Clinically certified prevention of spinal and musculoskeletal compression.'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-3 border-t border-slate-100">
                                <Link
                                    href="/digital-assistant/roi-calculator"
                                    className="inline-flex items-center justify-between w-full text-xs font-bold text-[#005596] hover:text-[#004276] group"
                                >
                                    <span>{isId ? 'Buka Kalkulator ROI Pabrik' : 'Open Facility ROI Calculator'}</span>
                                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Related Insights Section */}
            {relatedPosts.length > 0 && (
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 border-t border-slate-200/70 pt-16">
                    <div className="flex items-end justify-between mb-8">
                        <div>
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[#005596] text-[11px] font-mono font-bold uppercase tracking-wider mb-2">
                                {isId ? 'REFERENSI TERKAIT' : 'RELATED INSIGHTS'}
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                                {isId ? 'Artikel Teknis Terkait' : 'Related Technical Articles'}
                            </h2>
                        </div>
                        <Link
                            href="/news"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#005596] hover:text-[#004276] uppercase tracking-wider group"
                        >
                            <span>{isId ? 'Semua Artikel' : 'All Articles'}</span>
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                        {relatedPosts.map((related) => (
                            <Link
                                key={related.id || related.slug}
                                href={`/news/${related.slug}`}
                                className="group block bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                            >
                                <div className="relative h-48 overflow-hidden bg-slate-900">
                                    {related.imgUrl ? (
                                        <Image
                                            src={related.imgUrl}
                                            alt={related.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300" />
                                    )}
                                    <div className="absolute top-4 left-4">
                                        {related.categoryName && (
                                            <span className="bg-white/90 backdrop-blur-sm text-slate-900 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                                                {related.categoryName}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex items-center gap-2 text-slate-400 text-xs font-mono mb-3">
                                        <Calendar size={12} /> {formatDate(related.date)}
                                    </div>
                                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#005596] transition-colors line-clamp-2 mb-3">
                                        {related.title}
                                    </h3>
                                    <div
                                        className="text-slate-500 text-xs line-clamp-2 leading-relaxed mb-4"
                                        dangerouslySetInnerHTML={{ __html: related.excerptHtml }}
                                    />
                                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-[#005596] uppercase tracking-wider">
                                        <span>{isId ? 'Baca Artikel' : 'Read Article'}</span>
                                        <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Standardized PreFooter CTA Section */}
            <PreFooterCTA
                badge={isId ? 'KONSULTASI TEKNIS & TRIAL WORKSHOP' : 'TECHNICAL CONSULTATION & WORKSHOP TESTING'}
                title={
                    isId ? (
                        <>
                            Tingkatkan Ergonomi Pabrik &amp; <br className="hidden sm:inline" />
                            Throughput Material Handling
                        </>
                    ) : (
                        <>
                            Improve Plant Ergonomics &amp; <br className="hidden sm:inline" />
                            Material Handling Throughput
                        </>
                    )
                }
                description={
                    isId
                        ? 'Diskusikan tantangan angkat beban di lini produksi Anda bersama tim Application Engineer tersertifikasi Schmalz dan Binar. Uji langsung workpiece di workshop Cikarang atau jadwalkan survei ke pabrik Anda.'
                        : 'Discuss lifting challenges across your production floor with our certified Schmalz and Binar application engineers. Test workpieces at our Cikarang facility or schedule an on-site plant survey.'
                }
                primaryBtnText={isId ? 'Jadwalkan Konsultasi Engineering' : 'Schedule Engineering Consultation'}
                primaryBtnHref="/contact"
                secondaryBtnText={isId ? 'WhatsApp Tim Engineering' : 'WhatsApp Engineering Team'}
                secondaryBtnHref="https://wa.me/6281119168752?text=Hello%20DQW,%20I%20would%20like%20to%20consult%20on%20material%20handling%20solutions"
            />
        </>
    );
}
