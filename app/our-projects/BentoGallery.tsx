"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
    Search, 
    X,
    ArrowRight, 
    Building2, 
    Weight, 
    Cpu, 
    CheckCircle2, 
    ShieldCheck, 
    MessageSquare,
    Eye,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { useLanguage } from '../../components/LanguageProvider';
import { getProjectDesc, getProjectIndustry } from '../../data/projects';

export type Project = {
    id: string;
    client: string;
    industry: string;
    image: string;
    size: string;
    desc: string;
    color: string;
    logo?: string;
};

export function OurProjectsHero() {
    const { lang } = useLanguage();
    const isId = lang === 'id';

    return (
        <section className="pt-28 sm:pt-36 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
                {/* Monospace Technical Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-xs mb-6">
                    <span className="w-2 h-2 rounded-full bg-[#005596]" />
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#005596]">
                        {isId ? 'REKAM JEJAK IMPLEMENTASI SISTEM HANDLING' : 'LIFTING SYSTEM IMPLEMENTATION RECORD'}
                    </span>
                </div>

                {/* Monumental Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] mb-6">
                    {isId ? (
                        <>
                            Solusi Material Handling Presisi <br className="hidden sm:inline" />
                            di <span className="text-[#005596]">50+ Pabrik Manufaktur</span> Indonesia
                        </>
                    ) : (
                        <>
                            Precision Material Handling Solutions <br className="hidden sm:inline" />
                            Across <span className="text-[#005596]">50+ Manufacturing Plants</span> in Indonesia
                        </>
                    )}
                </h1>

                <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
                    {isId
                        ? 'Dokumentasi instalasi aktual sistem Vacuum Handling Schmalz (Jerman) dan Binar Quick-Lift (Swedia), teruji mempercepat cycle time lini produksi sekaligus menghilangkan beban angkat manual berulang.'
                        : 'Real-world installation documentation of Schmalz (Germany) vacuum handling and Binar Quick-Lift (Sweden) systems, verified to increase cycle speeds and eliminate repetitive manual lifting strain.'}
                </p>

                {/* HUD Engineering Metrics Strip */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
                    <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 text-center shadow-xs">
                        <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">52+</div>
                        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                            {isId ? 'Lini Pabrik Aktif' : 'Active Plant Lines'}
                        </div>
                    </div>
                    <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 text-center shadow-xs">
                        <div className="text-2xl sm:text-3xl font-black text-[#005596] font-mono">
                            {isId ? '8 Sektor' : '8 Sectors'}
                        </div>
                        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                            {isId ? 'Industri Utama' : 'Core Industries'}
                        </div>
                    </div>
                    <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 text-center shadow-xs">
                        <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono">100%</div>
                        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                            {isId ? 'Standar Medis AGR' : 'AGR Medical Standard'}
                        </div>
                    </div>
                    <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 text-center shadow-xs">
                        <div className="text-2xl sm:text-3xl font-black text-blue-600 font-mono">
                            {isId ? '0 Kasus' : '0 Cases'}
                        </div>
                        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                            {isId ? 'Cedera Pinggang (Zero HNP)' : 'Spinal Strain (Zero HNP)'}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const FEATURED_SLUG_ORDER = [
    'fmcg-mayora',
    'fmcg-meiji',
    'auto-sugity',
    'auto-gt',
    'konstruksi-ykk',
    'elektronik-rinnai',
    'kaca-asahimas',
    'kimia-hempel',
];

function ClientLogo({ src, alt, clientName }: { src?: string; alt: string; clientName: string }) {
    const [hasError, setHasError] = useState(false);

    if (!src || hasError) {
        return (
            <span className="text-xs font-black text-slate-700 uppercase tracking-wider font-mono truncate max-w-[130px]">
                {clientName}
            </span>
        );
    }

    return (
        <Image
            src={src}
            alt={alt}
            width={120}
            height={40}
            className="max-h-8 w-auto object-contain"
            onError={() => setHasError(true)}
            unoptimized
        />
    );
}

function parseProjectMeta(desc: string) {
    let machine = 'Schmalz Vacuum Lifter';
    if (/jumbo\s*flex\s*\d*/i.test(desc)) {
        const m = desc.match(/jumbo\s*flex\s*\d*/i);
        machine = m ? `Schmalz ${m[0]}` : 'Schmalz JumboFlex';
    } else if (/jumbo\s*sprint\s*\d*/i.test(desc)) {
        const m = desc.match(/jumbo\s*sprint\s*\d*/i);
        machine = m ? `Schmalz ${m[0]}` : 'Schmalz JumboSprint';
    } else if (/jumbo\s*ergo\s*\d*/i.test(desc)) {
        const m = desc.match(/jumbo\s*ergo\s*\d*/i);
        machine = m ? `Schmalz ${m[0]}` : 'Schmalz JumboErgo';
    } else if (/vacumaster/i.test(desc)) {
        machine = 'Schmalz VacuMaster System';
    } else if (/quick[\s-]lift|binar|qla|qlr/i.test(desc)) {
        machine = 'Binar Quick-Lift Servo Arm';
    }

    let payload = '';
    const payloadMatch = desc.match(/(\d+\s*(?:kg|ton))/i);
    if (payloadMatch) {
        payload = `Up to ${payloadMatch[1]}`;
    }

    return { machine, payload };
}

export default function BentoGallery({ projects }: { projects: Project[] }) {
    const { lang } = useLanguage();
    const isId = lang === 'id';
    const [filter, setFilter] = useState('All');
    const [query, setQuery] = useState('');
    const [visibleCount, setVisibleCount] = useState(12);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const modalRef = useRef<HTMLDivElement | null>(null);

    // Dynamic rotation state for Featured Spotlight
    const [activeFeaturedIndex, setActiveFeaturedIndex] = useState(0);
    const [isFeaturedPaused, setIsFeaturedPaused] = useState(false);
    const [featuredDirection, setFeaturedDirection] = useState<1 | -1>(1);

    const featuredProjects = useMemo(() => {
        const mapped = FEATURED_SLUG_ORDER
            .map((id) => projects.find((p) => p.id === id))
            .filter((p): p is Project => Boolean(p));
        return mapped.length > 0 ? mapped : [projects[0]];
    }, [projects]);

    const industries = useMemo(() => ['All', ...Array.from(new Set(projects.map((p) => p.industry)))], [projects]);
    const normalizedQuery = query.trim().toLowerCase();

    const industryCounts = useMemo(() => {
        const counts = new Map<string, number>();
        projects.forEach((project) => {
            const current = counts.get(project.industry) ?? 0;
            counts.set(project.industry, current + 1);
        });
        counts.set('All', projects.length);
        return counts;
    }, [projects]);

    const filteredProjects = useMemo(() => {
        const byIndustry = filter === 'All'
            ? projects
            : projects.filter((p) => p.industry === filter);

        if (!normalizedQuery) {
            return byIndustry;
        }

        return byIndustry.filter((project) => {
            const client = project.client.toLowerCase();
            const industry = project.industry.toLowerCase();
            const industryId = getProjectIndustry(project.industry, 'id').toLowerCase();
            const description = project.desc.toLowerCase();
            const descriptionId = getProjectDesc(project, 'id').toLowerCase();
            return (
                client.includes(normalizedQuery) ||
                industry.includes(normalizedQuery) ||
                industryId.includes(normalizedQuery) ||
                description.includes(normalizedQuery) ||
                descriptionId.includes(normalizedQuery)
            );
        });
    }, [filter, normalizedQuery, projects]);

    const visibleProjects = filteredProjects.slice(0, visibleCount);
    const hasMoreProjects = visibleCount < filteredProjects.length;

    // Auto-advance featured project every 5.5s with pause on hover/modal
    useEffect(() => {
        if (isFeaturedPaused || selectedProject || normalizedQuery || filter !== 'All') return;
        const timer = setInterval(() => {
            setFeaturedDirection(1);
            setActiveFeaturedIndex((prev) => (prev + 1) % featuredProjects.length);
        }, 5500);
        return () => clearInterval(timer);
    }, [isFeaturedPaused, selectedProject, normalizedQuery, filter, featuredProjects.length]);

    const currentFeatured = featuredProjects[activeFeaturedIndex] || featuredProjects[0];

    const handlePrevFeatured = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setFeaturedDirection(-1);
        setActiveFeaturedIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
    };

    const handleNextFeatured = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setFeaturedDirection(1);
        setActiveFeaturedIndex((prev) => (prev + 1) % featuredProjects.length);
    };

    const handleSelectFeatured = (idx: number) => {
        setFeaturedDirection(idx > activeFeaturedIndex ? 1 : -1);
        setActiveFeaturedIndex(idx);
    };

    // Handle ESC and Modal Focus
    useEffect(() => {
        if (!selectedProject) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setSelectedProject(null);
                return;
            }

            if (event.key !== 'Tab' || !modalRef.current) {
                return;
            }

            const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
            );

            if (focusableElements.length === 0) return;

            const first = focusableElements[0];
            const last = focusableElements[focusableElements.length - 1];
            const active = document.activeElement as HTMLElement | null;

            if (event.shiftKey && active === first) {
                event.preventDefault();
                last.focus();
                return;
            }

            if (!event.shiftKey && active === last) {
                event.preventDefault();
                first.focus();
            }
        };

        window.addEventListener('keydown', onKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [selectedProject]);

    return (
        <section className="py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* 1. DYNAMIC AUTO-ROTATING FEATURED SPOTLIGHT */}
            {currentFeatured && !normalizedQuery && filter === 'All' && (
                <div 
                    onMouseEnter={() => setIsFeaturedPaused(true)}
                    onMouseLeave={() => setIsFeaturedPaused(false)}
                    className="relative mb-14 bg-white rounded-3xl border border-slate-200/90 shadow-[0_12px_45px_-15px_rgba(0,85,150,0.1)] overflow-hidden"
                >
                    {/* Auto-cycling Top Indicator Progress Line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100 z-30 overflow-hidden">
                        {!isFeaturedPaused && (
                            <motion.div
                                key={`timer-${currentFeatured.id}-${activeFeaturedIndex}`}
                                initial={{ width: '0%' }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 5.5, ease: 'linear' }}
                                className="h-full bg-gradient-to-r from-[#005596] via-blue-500 to-sky-400"
                            />
                        )}
                    </div>

                    <div className="grid lg:grid-cols-12 items-stretch min-h-[420px]">
                        {/* Left Image Section (Col 7) */}
                        <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[420px] bg-slate-900 overflow-hidden">
                            <AnimatePresence initial={false} mode="wait">
                                <motion.div
                                    key={currentFeatured.id}
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={currentFeatured.image}
                                        alt={currentFeatured.client}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-out"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                                </motion.div>
                            </AnimatePresence>

                            {/* Location Badge */}
                            <div className="absolute top-5 left-5 z-20 px-3.5 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 text-white text-xs font-mono flex items-center gap-2 shadow-md">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                <span>{isId ? 'Dokumentasi Instalasi Pabrik Aktual' : 'Actual Plant Installation Documentation'}</span>
                            </div>

                            {/* Industry Tag */}
                            <div className="absolute bottom-5 left-5 z-20 hidden sm:block">
                                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide bg-white/95 backdrop-blur-md text-slate-800 shadow-sm border border-slate-200/60">
                                    {getProjectIndustry(currentFeatured.industry, lang)}
                                </span>
                            </div>

                            {/* Floating Navigation Chevrons */}
                            <div className="absolute bottom-5 right-5 z-20 flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={handlePrevFeatured}
                                    aria-label="Previous featured case study"
                                    className="w-10 h-10 rounded-full bg-slate-900/70 hover:bg-[#005596] text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
                                >
                                    <ChevronLeft size={18} />
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNextFeatured}
                                    aria-label="Next featured case study"
                                    className="w-10 h-10 rounded-full bg-slate-900/70 hover:bg-[#005596] text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Right Content Section (Col 5) */}
                        <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between bg-gradient-to-b from-white to-slate-50/50">
                            <AnimatePresence initial={false} mode="wait">
                                <motion.div
                                    key={currentFeatured.id}
                                    initial={{ opacity: 0, x: featuredDirection === 1 ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: featuredDirection === 1 ? -20 : 20 }}
                                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                    className="flex-1 flex flex-col justify-between"
                                >
                                    <div>
                                        {/* Header Bar: Featured Tag + Logo */}
                                        <div className="flex items-center justify-between gap-4 mb-4">
                                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[#005596] text-[11px] font-mono font-bold uppercase tracking-wider">
                                                <ShieldCheck size={13} />
                                                <span>{isId ? 'STUDI KASUS UTAMA' : 'FEATURED CASE STUDY'}</span>
                                                <span className="text-slate-400 font-normal">
                                                    {String(activeFeaturedIndex + 1).padStart(2, '0')}/{String(featuredProjects.length).padStart(2, '0')}
                                                </span>
                                            </div>

                                            <div className="h-9 w-28 relative flex items-center justify-end">
                                                <ClientLogo
                                                    src={currentFeatured.logo}
                                                    alt={currentFeatured.client}
                                                    clientName={currentFeatured.client}
                                                />
                                            </div>
                                        </div>

                                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug mb-3">
                                            {currentFeatured.client}
                                        </h2>

                                        <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                            {getProjectDesc(currentFeatured, lang)}
                                        </p>

                                        {/* Technical Specifications Highlights */}
                                        <div className="space-y-2.5 mb-8">
                                            <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                                                <CheckCircle2 size={16} className="text-[#005596] shrink-0" />
                                                <span>{isId ? 'Sistem:' : 'System:'} <strong>{parseProjectMeta(currentFeatured.desc).machine}</strong></span>
                                            </div>
                                            <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                                                <CheckCircle2 size={16} className="text-[#005596] shrink-0" />
                                                <span>{isId ? 'Kapasitas Payload:' : 'Lifting Capacity:'} <strong>{parseProjectMeta(currentFeatured.desc).payload || (isId ? 'Disesuaikan Lini Produksi' : 'Customized to Production Line')}</strong></span>
                                            </div>
                                            <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                                                <CheckCircle2 size={16} className="text-[#005596] shrink-0" />
                                                <span>{isId ? 'Standar Ergonomi:' : 'Ergonomic Standard:'} <strong>German AGR (Aktion Gesunder Rücken)</strong></span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons & Quick Pill Navigation */}
                                    <div className="space-y-4 pt-4 border-t border-slate-200/80">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <Link
                                                href={`/our-projects/${currentFeatured.id}`}
                                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#005596] hover:bg-[#00447a] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all group"
                                            >
                                                <span>{isId ? 'Baca Studi Kasus Lengkap' : 'Read Full Case Study'}</span>
                                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                            </Link>

                                            <button
                                                type="button"
                                                onClick={() => setSelectedProject(currentFeatured)}
                                                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                                            >
                                                <Eye size={14} />
                                                <span>{isId ? 'Ringkasan Cepat' : 'Quick Preview'}</span>
                                            </button>
                                        </div>

                                        {/* Client Switcher Navigation Pills */}
                                        <div className="flex items-center gap-1.5 pt-1">
                                            {featuredProjects.map((p, idx) => {
                                                const isActive = idx === activeFeaturedIndex;
                                                return (
                                                    <button
                                                        key={p.id}
                                                        type="button"
                                                        onClick={() => handleSelectFeatured(idx)}
                                                        aria-label={`Switch to ${p.client}`}
                                                        title={p.client}
                                                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                                                            isActive
                                                                ? 'w-8 bg-[#005596]'
                                                                : 'w-2 bg-slate-300 hover:bg-slate-400'
                                                        }`}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            )}

            {/* 2. FILTER & SEARCH CONTROL DOCK */}
            <div className="mb-10 space-y-4">
                {/* Search Bar + Result Count */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        <input
                            type="search"
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setVisibleCount(12);
                            }}
                            placeholder={isId ? "Cari nama perusahaan, model mesin, atau industri..." : "Search by client name, machine model, or industry..."}
                            className="w-full pl-11 pr-10 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-[#005596] focus:ring-2 focus:ring-[#005596]/15 transition-all shadow-2xs"
                        />
                        {query && (
                            <button
                                type="button"
                                onClick={() => setQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
                                aria-label="Clear search"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-slate-500 self-end sm:self-center">
                        <span className="font-bold text-slate-900">{filteredProjects.length}</span> {isId ? 'Proyek Terdokumentasi' : 'Projects Documented'}
                        {(filter !== 'All' || normalizedQuery) && (
                            <button
                                type="button"
                                onClick={() => {
                                    setFilter('All');
                                    setQuery('');
                                    setVisibleCount(12);
                                }}
                                className="ml-2 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-sans font-semibold transition-colors cursor-pointer"
                            >
                                {isId ? 'Reset filter' : 'Reset filters'}
                            </button>
                        )}
                    </div>
                </div>

                {/* Horizontal Scroll Spring Capsule Dock */}
                <div className="relative overflow-x-auto pb-2 scrollbar-none">
                    <div className="flex items-center gap-2 p-1.5 bg-slate-200/60 backdrop-blur-md rounded-2xl border border-slate-200/80 w-max">
                        {industries.map((ind) => {
                            const isActive = filter === ind;
                            const count = industryCounts.get(ind) ?? 0;
                            const label = ind === 'All' ? (isId ? 'Semua Industri' : 'All Industries') : getProjectIndustry(ind, lang);

                            return (
                                <button
                                    key={ind}
                                    type="button"
                                    onClick={() => {
                                        setFilter(ind);
                                        setVisibleCount(12);
                                    }}
                                    className={`relative px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                                        isActive
                                            ? 'text-white'
                                            : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                                    }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeIndustryFilter"
                                            className="absolute inset-0 bg-gradient-to-r from-[#005596] to-[#0077c8] rounded-xl shadow-[0_4px_12px_rgba(0,85,150,0.3)] ring-1 ring-inset ring-white/20"
                                            transition={{ type: "spring", stiffness: 450, damping: 35 }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center gap-1.5">
                                        <span>{label}</span>
                                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                                            isActive ? 'bg-white/20 text-white' : 'bg-slate-300/60 text-slate-600'
                                        }`}>
                                            {count}
                                        </span>
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* 3. SYMMETRICAL 3-COLUMN ENTERPRISE GRID */}
            {filteredProjects.length === 0 ? (
                <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-xs">
                    <Building2 size={36} className="mx-auto text-slate-300 mb-3" />
                    <h3 className="text-lg font-black text-slate-900">{isId ? 'Proyek tidak ditemukan' : 'No projects found'}</h3>
                    <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
                        {isId
                            ? 'Coba gunakan kata kunci lain atau klik reset untuk menampilkan seluruh portofolio.'
                            : 'Try searching with another keyword or click reset to view the entire portfolio.'}
                    </p>
                    <button
                        type="button"
                        onClick={() => {
                            setFilter('All');
                            setQuery('');
                            setVisibleCount(12);
                        }}
                        className="mt-4 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                    >
                        {isId ? 'Reset Filter & Pencarian' : 'Reset Filter & Search'}
                    </button>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
                        {visibleProjects.map((p, idx) => {
                            const meta = parseProjectMeta(p.desc);

                            return (
                                <motion.div
                                    key={p.id}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.35, delay: Math.min(idx * 0.05, 0.4) }}
                                    className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-[#005596]/30 transition-all duration-300 flex flex-col overflow-hidden group"
                                >
                                    {/* Top: Client Identity Header */}
                                    <div className="p-4 sm:p-5 flex items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/50">
                                        <div className="h-9 w-28 relative flex items-center">
                                            <ClientLogo
                                                src={p.logo}
                                                alt={`${p.client} logo`}
                                                clientName={p.client}
                                            />
                                        </div>

                                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-600 shrink-0">
                                            {getProjectIndustry(p.industry, lang)}
                                        </span>
                                    </div>

                                    {/* Middle: Full Color Machinery Photo (No Grayscale!) */}
                                    <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden">
                                        <Image
                                            src={p.image}
                                            alt={`${p.client} factory installation`}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            loading={idx < 6 ? 'eager' : 'lazy'}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />

                                        {/* Technical Spec Badges Floating over Photo Base */}
                                        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center gap-1.5 z-10">
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900/85 backdrop-blur-md border border-white/15 text-white text-[10px] font-mono font-semibold">
                                                <Cpu size={11} className="text-[#0077c8]" />
                                                <span>{meta.machine}</span>
                                            </span>
                                            {meta.payload && (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900/85 backdrop-blur-md border border-white/15 text-emerald-300 text-[10px] font-mono font-semibold">
                                                    <Weight size={11} />
                                                    <span>{meta.payload}</span>
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Content Body */}
                                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-[#005596] transition-colors leading-snug mb-2">
                                                {p.client}
                                            </h3>
                                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                                                {getProjectDesc(p, lang)}
                                            </p>
                                        </div>

                                        {/* Card Bottom CTA Links */}
                                        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                                            <Link
                                                href={`/our-projects/${p.id}`}
                                                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#005596] hover:text-[#00447a] transition-colors group-hover:translate-x-0.5 duration-200"
                                            >
                                                <span>{isId ? 'Lihat Studi Kasus' : 'View Case Study'}</span>
                                                <ArrowRight size={13} />
                                            </Link>

                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setSelectedProject(p);
                                                }}
                                                className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-slate-700 px-2 py-1 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                                                title={isId ? "Ringkasan cepat" : "Quick preview summary"}
                                            >
                                                <Eye size={12} />
                                                <span>{isId ? 'Ringkasan' : 'Quick Preview'}</span>
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Load More Button */}
                    {hasMoreProjects && (
                        <div className="mt-12 text-center">
                            <button
                                type="button"
                                onClick={() => setVisibleCount((prev) => prev + 12)}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#005596]/40 text-xs sm:text-sm font-bold text-slate-800 hover:text-[#005596] shadow-xs hover:shadow-md transition-all cursor-pointer"
                            >
                                <span>{isId ? 'Tampilkan Studi Kasus Lainnya' : 'Load More Case Studies'}</span>
                                <span className="font-mono text-xs text-slate-400">
                                    ({visibleProjects.length} {isId ? 'dari' : 'of'} {filteredProjects.length})
                                </span>
                            </button>
                        </div>
                    )}
                </>
            )}

            {/* 4. TECHNICAL PREVIEW MODAL LIGHTBOX */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md"
                        role="dialog"
                        aria-modal="true"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 15 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 15 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-2xl flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                            ref={modalRef}
                        >
                            {/* Modal Close Button */}
                            <button
                                type="button"
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
                                aria-label="Close preview modal"
                            >
                                <X size={18} />
                            </button>

                            {/* Modal Content Scrollable */}
                            <div className="overflow-y-auto">
                                <div className="relative aspect-[16/9] w-full bg-slate-900">
                                    <Image
                                        src={selectedProject.image}
                                        alt={selectedProject.client}
                                        fill
                                        className="object-cover"
                                        sizes="100vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                                    
                                    <div className="absolute bottom-6 left-6 right-6 text-white">
                                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 mb-2 inline-block">
                                            {getProjectIndustry(selectedProject.industry, lang)}
                                        </span>
                                        <h3 className="text-2xl sm:text-3xl font-black leading-tight">
                                            {selectedProject.client}
                                        </h3>
                                    </div>
                                </div>

                                <div className="p-6 sm:p-8 space-y-6">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200/60 text-[#005596] text-xs font-mono font-bold">
                                            <Cpu size={13} />
                                            <span>{parseProjectMeta(selectedProject.desc).machine}</span>
                                        </span>
                                        {parseProjectMeta(selectedProject.desc).payload && (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-mono font-bold">
                                                <Weight size={13} />
                                                <span>{parseProjectMeta(selectedProject.desc).payload}</span>
                                            </span>
                                        )}
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-mono font-bold">
                                            <ShieldCheck size={13} />
                                            <span>{isId ? 'Tersertifikasi Ergonomi Medis AGR Jerman' : 'German AGR Medical Ergonomics Certified'}</span>
                                        </span>
                                    </div>

                                    <div>
                                        <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
                                            {isId ? 'LINGKUP OPERASIONAL & IMPLEMENTASI' : 'OPERATIONAL SCOPE & IMPLEMENTATION'}
                                        </h4>
                                        <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                                            {getProjectDesc(selectedProject, lang)}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <Link
                                                href={`/our-projects/${selectedProject.id}`}
                                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#005596] hover:bg-[#00447a] text-white text-xs font-bold shadow-md transition-all"
                                            >
                                                <span>{isId ? 'Buka Halaman Studi Kasus Lengkap' : 'View Full Case Study Page'}</span>
                                                <ArrowRight size={14} />
                                            </Link>
                                        </div>

                                        <a
                                            href={`https://wa.me/6281119168752?text=Hello%20DQW,%20I%20am%20interested%20in%20the%20${encodeURIComponent(selectedProject.client)}%20project%20and%20would%20like%20to%20consult%20on%20a%20similar%20lifting%20solution.`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
                                        >
                                            <MessageSquare size={14} />
                                            <span>{isId ? 'Konsultasikan Solusi Serupa via WhatsApp' : 'Consult Similar Solution on WhatsApp'}</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
