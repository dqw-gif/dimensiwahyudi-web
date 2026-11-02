'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Clock,
    MapPin,
    Package,
    ShieldCheck,
    PhoneCall,
    ChevronRight,
} from 'lucide-react';
import { useLanguage } from '../../../components/LanguageProvider';
import { getProjectDesc, getProjectIndustry } from '../../../data/projects';
import PreFooterCTA from '../../../components/PreFooterCTA';
import { MobileSnapCarousel } from '../../../components/ui/MobileSnapCarousel';

type ProjectItem = {
    id: string;
    client: string;
    industry: string;
    image: string;
    size: string;
    desc: string;
    color: string;
    logo?: string;
};

type NarrativeParts = {
    challenge: string;
    solution: string;
    result: string;
};

function buildNarrativeParts(description: string, isId: boolean): NarrativeParts {
    const text = description.replace(/\s+/g, ' ').trim();
    const resultMarker = isId ? 'Hasil:' : 'Result:';
    const operationMarker = isId ? ' Pada ' : ' In this ';

    let challenge = text;
    let solution = '';
    let result = '';

    const operationIndex = text.indexOf(operationMarker);
    if (operationIndex > -1) {
        challenge = text.slice(0, operationIndex).trim();
        solution = text.slice(operationIndex + 1).trim();
    }

    const resultIndex = solution.indexOf(resultMarker);
    if (resultIndex > -1) {
        result = solution.slice(resultIndex + resultMarker.length).trim();
        solution = solution.slice(0, resultIndex).trim();
    } else {
        const directResultIdx = challenge.indexOf(resultMarker);
        if (directResultIdx > -1) {
            result = challenge.slice(directResultIdx + resultMarker.length).trim();
            challenge = challenge.slice(0, directResultIdx).trim();
        }
    }

    if (!solution) {
        const sentences = challenge.split('. ').filter(Boolean);
        if (sentences.length > 1) {
            challenge = sentences[0].trim();
            solution = `${sentences.slice(1).join('. ').trim()}`;
        }
    }

    if (!result) {
        result = isId
            ? 'Proses material handling lebih aman, stabil, dan menjaga target throughput lini produksi.'
            : 'Safer and more consistent handling performance aligned with operational productivity goals.';
    }

    if (challenge && !challenge.endsWith('.')) {
        challenge = `${challenge}.`;
    }
    if (solution && !solution.endsWith('.')) {
        solution = `${solution}.`;
    }
    if (result && !result.endsWith('.')) {
        result = `${result}.`;
    }

    return {
        challenge,
        solution:
            solution ||
            (isId
                ? 'Sistem alat angkat terintegrasi diterapkan untuk menjaga konsistensi kualitas handling dan mengurangi beban fisik berulang pada operator.'
                : 'Engineered lifting support was introduced to stabilize handling quality and reduce repetitive operator strain.'),
        result,
    };
}

export default function CaseStudyDetailClient({
    project: c,
    relatedProjects,
}: {
    project: ProjectItem;
    relatedProjects: ProjectItem[];
}) {
    const { lang } = useLanguage();
    const isId = lang === 'id';

    const localizedDesc = getProjectDesc(c, lang);
    const localizedIndustry = getProjectIndustry(c.industry, lang);
    const narrative = buildNarrativeParts(localizedDesc, isId);

    const scaleText =
        c.size === 'large'
            ? isId
                ? 'Fasilitas Throughput Tinggi'
                : 'High-Throughput Facility'
            : c.size === 'tall'
              ? isId
                  ? 'Area Perakitan Terpadu'
                  : 'Extended Assembly Area'
              : isId
                ? 'Lini Produksi Standar'
                : 'Standard Fabrication Area';

    return (
        <main className="min-h-screen bg-slate-50/70 text-slate-800 font-sans selection:bg-[#005596] selection:text-white">
            {/* 1. MONUMENTAL DARK BLUEPRINT HEADER */}
            <section className="relative overflow-hidden bg-gradient-to-b from-[#001833] via-[#002244] to-[#003366] text-white pt-28 sm:pt-32 pb-14 md:pb-16 border-b border-[#005596]/30">
                {/* Contained Ambient Refraction Lighting */}
                <div
                    className="absolute top-12 left-1/4 w-[500px] h-[360px] bg-[#005596]/20 rounded-full blur-[140px] pointer-events-none"
                    aria-hidden="true"
                />
                <div
                    className="absolute bottom-10 right-1/4 w-[480px] h-[320px] bg-blue-600/15 rounded-full blur-[130px] pointer-events-none"
                    aria-hidden="true"
                />

                {/* Blueprint Precision Grid Texture */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.07]"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
                        backgroundSize: '28px 28px',
                    }}
                    aria-hidden="true"
                />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
                    {/* Navigation Back Link */}
                    <Link
                        href="/our-projects"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white shadow-xs backdrop-blur-md transition-all group mb-8"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                        <span>{isId ? 'Kembali ke Galeri Proyek' : 'Back to Project Gallery'}</span>
                    </Link>

                    <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
                        {/* Title & Core Narrative */}
                        <div className="lg:col-span-8 space-y-4">
                            {/* Pill Badge */}
                            <div className="flex flex-wrap items-center gap-3">
                                <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-blue-200 text-xs font-mono font-bold uppercase tracking-widest backdrop-blur-md shadow-xs">
                                    <span>{localizedIndustry}</span>
                                </div>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-mono">
                                    <Clock size={12} className="text-blue-300" />
                                    <span>Verified Installation</span>
                                </span>
                            </div>

                            {/* Monumental H1 */}
                            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight">
                                {c.client}
                            </h1>

                            <p className="max-w-2xl text-blue-100/90 leading-relaxed text-sm sm:text-base md:text-lg font-normal">
                                {isId
                                    ? 'Implementasi sistem material handling yang dirancang mengikuti kondisi riil lantai produksi, dengan kontrol ergonomi presisi dan throughput yang stabil pada operasi angkat berulang.'
                                    : 'Engineered material-handling deployment tailored for real production constraints, with stronger ergonomic control and stable throughput on repetitive transfer operations.'}
                            </p>

                            <div className="pt-2 flex flex-wrap items-center gap-5 text-blue-200/90 text-xs sm:text-sm font-medium">
                                <span className="inline-flex items-center gap-1.5">
                                    <MapPin size={15} className="text-blue-400" />
                                    <span>Indonesia Manufacturing Facility</span>
                                </span>
                                <span className="inline-flex items-center gap-1.5">
                                    <Package size={15} className="text-blue-400" />
                                    <span>{isId ? 'Solusi Handling Terintegrasi' : 'Integrated Handling System'}</span>
                                </span>
                            </div>
                        </div>

                        {/* Project Snapshot Card */}
                        <div className="lg:col-span-4">
                            <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-6 sm:p-7 shadow-2xl ring-1 ring-white/10">
                                <div className="flex items-center justify-between pb-3 border-b border-white/15 mb-4">
                                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-200">
                                        {isId ? 'Ringkasan Proyek' : 'Project Snapshot'}
                                    </span>
                                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-300">
                                        <CheckCircle2 size={13} />
                                        <span>Active</span>
                                    </span>
                                </div>
                                <dl className="space-y-3 text-xs sm:text-sm">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-slate-300 font-medium">{isId ? 'Klien' : 'Client'}</dt>
                                        <dd className="text-white font-bold">{c.client}</dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-slate-300 font-medium">{isId ? 'Industri' : 'Industry'}</dt>
                                        <dd className="text-white font-semibold text-right">{localizedIndustry}</dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-slate-300 font-medium">{isId ? 'Skala' : 'Scale'}</dt>
                                        <dd className="text-blue-200 font-mono font-semibold">{scaleText}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. MASTER FROSTED GLASS VISUAL & OPERATIONAL VALUE STAGE */}
            <section className="py-12 sm:py-16 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden border-b border-slate-200/80">
                {/* Ambient Subtle Specular Refraction */}
                <div
                    className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[450px] h-[320px] bg-[#005596]/5 rounded-full blur-[140px] pointer-events-none"
                    aria-hidden="true"
                />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] p-5 sm:p-8 lg:p-10">
                        <div className="grid gap-8 lg:grid-cols-12 items-center">
                            {/* Photographic Documentation Visual */}
                            <div className="lg:col-span-7">
                                <div className="relative h-[260px] sm:h-[380px] lg:h-[430px] rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 shadow-md group">
                                    <Image
                                        src={c.image}
                                        alt={`${c.client} project visual`}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 750px"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-mono">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-slate-200">
                                            {c.client} • {localizedIndustry}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Operational Impact Summary */}
                            <div className="lg:col-span-5 space-y-4 sm:space-y-5 text-left">
                                <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-blue-50/80 border border-blue-200/60 shadow-xs">
                                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#005596]">
                                        {isId ? 'Nilai Operasional Terukur' : 'Operational Value Delivered'}
                                    </span>
                                </div>

                                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                                    {isId ? 'Performa Produksi Stabil dengan ' : 'Consistent Throughput with '}
                                    <span className="bg-gradient-to-r from-[#005596] to-[#1d4ed8] bg-clip-text text-transparent">
                                        {isId ? 'Penanganan Ergonomis.' : 'Ergonomic Lifting.'}
                                    </span>
                                </h2>

                                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                                    {isId
                                        ? 'Instalasi ini memadukan alat bantu angkat ergonomis dan kontrol presisi untuk menekan risiko cedera otot operator, menjaga kualitas proses, dan mempertahankan konsistensi output di kondisi nyata pabrik.'
                                        : 'The implementation combines ergonomic lifting support and handling precision to reduce physical strain risk, keep process quality stable, and maintain output consistency in real factory conditions.'}
                                </p>

                                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                                    <Link
                                        href="/contact"
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#005596] to-[#1d4ed8] hover:from-[#00447a] hover:to-[#1e40af] text-white text-xs sm:text-sm font-bold rounded-full shadow-[0_6px_20px_-3px_rgba(29,78,216,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all text-center"
                                    >
                                        <span>{isId ? 'Diskusikan Proyek Serupa' : 'Discuss Similar Project'}</span>
                                        <ArrowRight size={15} />
                                    </Link>
                                    <a
                                        href="https://wa.me/6281119168752"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-[#005596]/40 shadow-xs text-xs sm:text-sm font-bold text-slate-700 hover:text-[#005596] transition-all text-center"
                                    >
                                        <PhoneCall size={14} className="text-emerald-600" />
                                        <span>Chat WhatsApp</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. CORE TECHNICAL EXECUTION & PROCESS NARRATIVE */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 relative">
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    
                    {/* Main Technical Content Column */}
                    <div className="lg:col-span-8 space-y-8 md:space-y-10">
                        {/* Section Header */}
                        <div>
                            <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-[#005596]/15 shadow-xs mb-3">
                                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#005596]">
                                    {isId ? 'Ikhtisar Rekayasa Teknis' : 'Engineering Overview'}
                                </span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                                {isId ? 'Latar Belakang & ' : 'Project Background & '}
                                <span className="bg-gradient-to-r from-[#005596] to-[#1d4ed8] bg-clip-text text-transparent">
                                    {isId ? 'Tantangan Lapangan' : 'Field Challenges'}
                                </span>
                            </h2>
                            <p className="mt-4 text-slate-600 leading-relaxed text-sm sm:text-base md:text-lg font-normal">
                                {narrative.challenge}
                            </p>
                        </div>

                        {/* 3-Stage Process Flow: Tantangan, Solusi, Hasil */}
                        <div>
                            <div className="mb-4 flex items-center justify-between">
                                <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
                                    {isId ? 'Alur Implementasi & Solusi' : 'Execution Flow & Outcomes'}
                                </span>
                            </div>

                            {/* Mobile Carousel Swipe (< 768px) */}
                            <MobileSnapCarousel
                                breakpoint="md"
                                isId={isId}
                                swipeLabelId="Geser untuk melihat detail solusi & hasil"
                                swipeLabelEn="Swipe to view solution & results"
                                desktopGridClassName="grid-cols-3 gap-4"
                            >
                                {/* Stage 1: Challenge */}
                                <div className="w-[85vw] max-w-[340px] shrink-0 snap-center md:w-auto md:max-w-none md:shrink md:snap-align-none rounded-2xl sm:rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/10 p-6 sm:p-7 shadow-[0_12px_32px_-8px_rgba(0,85,150,0.06),inset_0_1px_0_0_rgba(255,255,255,0.95)] hover:ring-[#005596]/25 hover:shadow-[0_16px_36px_-8px_rgba(0,85,150,0.1)] transition-all duration-300 flex flex-col justify-between group">
                                    <div>
                                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#005596]">
                                                01 · {isId ? 'Tantangan' : 'Challenge'}
                                            </span>
                                            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest">
                                                Phase 01
                                            </span>
                                        </div>
                                        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-snug">
                                            {isId ? 'Kondisi Awal Produksi' : 'Operational Bottleneck'}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                            {narrative.challenge}
                                        </p>
                                    </div>
                                </div>

                                {/* Stage 2: Solution */}
                                <div className="w-[85vw] max-w-[340px] shrink-0 snap-center md:w-auto md:max-w-none md:shrink md:snap-align-none rounded-2xl sm:rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/10 p-6 sm:p-7 shadow-[0_12px_32px_-8px_rgba(0,85,150,0.06),inset_0_1px_0_0_rgba(255,255,255,0.95)] hover:ring-[#005596]/25 hover:shadow-[0_16px_36px_-8px_rgba(0,85,150,0.1)] transition-all duration-300 flex flex-col justify-between group">
                                    <div>
                                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#005596]">
                                                02 · {isId ? 'Solusi Rekayasa' : 'Engineering Solution'}
                                            </span>
                                            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest">
                                                Phase 02
                                            </span>
                                        </div>
                                        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-snug">
                                            {isId ? 'Penerapan Sistem Angkat' : 'Integrated Equipment Deployment'}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                            {narrative.solution}
                                        </p>
                                    </div>
                                </div>

                                {/* Stage 3: Result */}
                                <div className="w-[85vw] max-w-[340px] shrink-0 snap-center md:w-auto md:max-w-none md:shrink md:snap-align-none rounded-2xl sm:rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/10 p-6 sm:p-7 shadow-[0_12px_32px_-8px_rgba(0,85,150,0.06),inset_0_1px_0_0_rgba(255,255,255,0.95)] hover:ring-[#005596]/25 hover:shadow-[0_16px_36px_-8px_rgba(0,85,150,0.1)] transition-all duration-300 flex flex-col justify-between group">
                                    <div>
                                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#005596]">
                                                03 · {isId ? 'Hasil Terukur' : 'Verified Outcome'}
                                            </span>
                                            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest">
                                                Phase 03
                                            </span>
                                        </div>
                                        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-snug">
                                            {isId ? 'Dampak di Lantai Kerja' : 'Production Floor Impact'}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                            {narrative.result}
                                        </p>
                                    </div>
                                </div>
                            </MobileSnapCarousel>
                        </div>

                        {/* Verified Safe Operation Callout */}
                        <div className="flex items-start gap-4 p-5 sm:p-6 bg-white/80 backdrop-blur-xl rounded-3xl border border-white/90 ring-1 ring-[#005596]/15 shadow-sm">
                            <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200/70 flex items-center justify-center text-[#005596] shrink-0 mt-0.5">
                                <ShieldCheck size={22} className="text-[#005596]" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                                    {isId ? 'Sistem Handling Terpasang & Siap Beroperasi' : 'Handling System Successfully Commissioned'}
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                    {isId
                                        ? `Instalasi dan commissioning telah selesai, terverifikasi aman sesuai standar ergonomi lantai produksi untuk sektor ${localizedIndustry}. Seluruh suku cadang dan pemeliharaan didukung penuh tim teknis PT Dimensi Quantum Wahyudi.`
                                        : `Completed installation and verified safe operation aligned with ergonomic production-floor standards for the ${localizedIndustry} industry, supported by PT Dimensi Quantum Wahyudi engineering team.`}
                                </p>
                            </div>
                        </div>

                        {/* Dark Blueprint Technical Inquiry Card */}
                        <div className="bg-gradient-to-br from-[#002244] via-[#003b6d] to-[#005596] text-white rounded-3xl border border-white/20 p-7 sm:p-9 shadow-xl relative overflow-hidden">
                            {/* Texture & Ambient Lighting */}
                            <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-400/20 rounded-full blur-[100px] pointer-events-none" />

                            <div className="relative z-10 space-y-4">
                                <span className="inline-flex items-center text-xs font-mono font-bold uppercase tracking-widest px-3.5 py-1 bg-white/12 backdrop-blur-xl rounded-full border border-white/25 text-blue-100 shadow-xs">
                                    {isId ? 'Konsultasi Rekayasa Beban' : 'Engineering Consultation'}
                                </span>

                                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight">
                                    {isId
                                        ? `Butuh Solusi Handling untuk Sektor ${localizedIndustry}?`
                                        : `Need a Custom Handling Solution for ${localizedIndustry}?`}
                                </h3>

                                <p className="text-blue-100/90 text-xs sm:text-sm sm:leading-relaxed max-w-xl font-normal">
                                    {isId
                                        ? `Diskusikan beban workpiece, karakteristik dimensi, dan target cycle time di pabrik Anda bersama tim application engineer kami untuk mendapatkan simulasi alat dan proposal teknis lengkap.`
                                        : `Discuss your workpiece load, dimensions, and target cycle times with our application engineers for a comprehensive technical simulation and quotation.`}
                                </p>

                                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                                    <Link
                                        href="/contact"
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-blue-50 text-[#005596] text-xs sm:text-sm font-bold rounded-full shadow-[0_8px_24px_-4px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 active:translate-y-0 transition-all text-center"
                                    >
                                        <span>{isId ? 'Konsultasi Engineering Gratis' : 'Request Technical Assessment'}</span>
                                        <ArrowRight size={15} />
                                    </Link>
                                    <Link
                                        href="/digital-assistant/roi-calculator"
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 backdrop-blur-xl text-white text-xs sm:text-sm font-bold shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all text-center"
                                    >
                                        <span>{isId ? 'Hitung Estimasi ROI' : 'Calculate ROI'}</span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Sidebar Column */}
                    <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 lg:self-start">
                        {/* Project Summary Card */}
                        <div className="rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] p-6 sm:p-7">
                            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                                <h3 className="font-mono font-bold text-xs uppercase tracking-widest text-[#005596]">
                                    {isId ? 'Spesifikasi Proyek' : 'Project Specifications'}
                                </h3>
                                <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                                    {isId ? 'Operasional' : 'Active'}
                                </span>
                            </div>

                            <dl className="space-y-3.5 text-xs sm:text-sm">
                                <div>
                                    <dt className="text-slate-400 text-[11px] font-mono uppercase tracking-wider">
                                        {isId ? 'Nama Klien' : 'Client Organization'}
                                    </dt>
                                    <dd className="text-slate-900 font-bold mt-0.5">{c.client}</dd>
                                </div>
                                <div>
                                    <dt className="text-slate-400 text-[11px] font-mono uppercase tracking-wider">
                                        {isId ? 'Kategori Industri' : 'Industrial Sector'}
                                    </dt>
                                    <dd className="text-slate-900 font-semibold mt-0.5">{localizedIndustry}</dd>
                                </div>
                                <div>
                                    <dt className="text-slate-400 text-[11px] font-mono uppercase tracking-wider">
                                        {isId ? 'Lokasi Instalasi' : 'Facility Location'}
                                    </dt>
                                    <dd className="text-slate-900 font-semibold mt-0.5">Indonesia</dd>
                                </div>
                                <div>
                                    <dt className="text-slate-400 text-[11px] font-mono uppercase tracking-wider">
                                        {isId ? 'Skala Operasi' : 'Operational Scale'}
                                    </dt>
                                    <dd className="text-[#005596] font-mono font-semibold mt-0.5">{scaleText}</dd>
                                </div>
                            </dl>

                            <div className="border-t border-slate-100 mt-6 pt-5 space-y-3">
                                <Link
                                    href="/contact"
                                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-gradient-to-r from-[#005596] to-[#1d4ed8] hover:from-[#00447a] hover:to-[#1e40af] text-white font-bold rounded-full text-xs sm:text-sm shadow-[0_6px_20px_-3px_rgba(29,78,216,0.35)] transition-all"
                                >
                                    <span>{isId ? 'Diskusikan Proyek Serupa' : 'Discuss Similar Project'}</span>
                                    <ArrowRight size={14} />
                                </Link>
                                <a
                                    href="https://wa.me/6281119168752"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-[#005596]/40 shadow-xs text-xs sm:text-sm font-bold text-slate-700 hover:text-[#005596] transition-all"
                                >
                                    <PhoneCall size={14} className="text-emerald-600" />
                                    <span>Chat WhatsApp Engineering</span>
                                </a>
                            </div>
                        </div>

                        {/* More Related Projects Card */}
                        <div className="rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] p-6">
                            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                                <h3 className="font-mono font-bold text-xs uppercase tracking-widest text-slate-700">
                                    {isId ? 'Studi Kasus Lainnya' : 'Related Installations'}
                                </h3>
                                <Link
                                    href="/our-projects"
                                    className="text-[11px] font-bold text-[#005596] hover:underline"
                                >
                                    {isId ? 'Lihat Semua' : 'View All'}
                                </Link>
                            </div>

                            <div className="space-y-3">
                                {relatedProjects.map((cs) => (
                                    <Link
                                        key={cs.id}
                                        href={`/our-projects/${cs.id}`}
                                        className="block p-3.5 rounded-2xl bg-slate-50/80 hover:bg-blue-50/60 transition-all border border-slate-200/80 hover:border-[#005596]/30 group"
                                    >
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="min-w-0">
                                                <p className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#005596] transition-colors line-clamp-1">
                                                    {cs.client}
                                                </p>
                                                <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                                                    {getProjectIndustry(cs.industry, lang)}
                                                </p>
                                            </div>
                                            <ChevronRight
                                                size={15}
                                                className="text-slate-400 group-hover:text-[#005596] group-hover:translate-x-0.5 transition-all shrink-0"
                                            />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </aside>

                </div>
            </div>

            {/* 4. CLOSING ENTERPRISE CTA HOOK */}
            <PreFooterCTA />

            {/* Mobile Fixed Sticky Bottom Action Bar (< 1024px) */}
            <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200/90 bg-white/95 p-3.5 backdrop-blur-xl lg:hidden shadow-[0_-8px_24px_rgba(0,0,0,0.06)]">
                <div className="mx-auto flex max-w-md items-center gap-2.5">
                    <Link
                        href="/contact"
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#005596] to-[#1d4ed8] px-4 py-3 text-xs sm:text-sm font-bold text-white shadow-md transition-all active:scale-[0.98]"
                    >
                        <span>{isId ? 'Konsultasi Proyek' : 'Discuss Project'}</span>
                        <ArrowRight size={14} />
                    </Link>
                    <a
                        href="https://wa.me/6281119168752"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-3 text-xs sm:text-sm font-bold text-slate-800 shadow-2xs transition-all hover:bg-slate-50 active:scale-[0.98]"
                    >
                        <PhoneCall size={14} className="text-emerald-600" />
                        <span>Chat WhatsApp</span>
                    </a>
                </div>
            </div>
        </main>
    );
}
