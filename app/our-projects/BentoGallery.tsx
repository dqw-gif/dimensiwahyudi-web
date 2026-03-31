"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

type Project = {
    id: string;
    client: string;
    industry: string;
    image: string;
    size: string;
    desc: string;
    color: string;
    logo?: string;
};

export default function BentoGallery({ projects }: { projects: Project[] }) {
    const [filter, setFilter] = useState('All');
    const [query, setQuery] = useState('');
    const [visibleCount, setVisibleCount] = useState(12);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [showStickyCta, setShowStickyCta] = useState(false);
    const modalRef = useRef<HTMLDivElement | null>(null);

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
            const description = project.desc.toLowerCase();
            return client.includes(normalizedQuery) || industry.includes(normalizedQuery) || description.includes(normalizedQuery);
        });
    }, [filter, normalizedQuery, projects]);

    const visibleProjects = filteredProjects.slice(0, visibleCount);
    const hasMoreProjects = visibleCount < filteredProjects.length;

    useEffect(() => {
        setVisibleCount(12);
    }, [filter, normalizedQuery]);

    useEffect(() => {
        const onScroll = () => {
            const maxScrollable = document.documentElement.scrollHeight - window.innerHeight;
            if (maxScrollable <= 0) {
                setShowStickyCta(false);
                return;
            }

            const progress = window.scrollY / maxScrollable;
            setShowStickyCta(progress >= 0.5);
        };

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        if (!selectedProject) {
            return;
        }

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

            if (focusableElements.length === 0) {
                return;
            }

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
        const firstFocusable = modalRef.current?.querySelector<HTMLElement>('button, a[href]');
        firstFocusable?.focus();

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [selectedProject]);

    // Color maps for industry badges
    const getBadgeStyle = (color: string) => {
        const styles: Record<string, string> = {
            blue: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
            red: 'bg-red-500/20 text-red-300 border-red-500/30',
            sky: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
            slate: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
            emerald: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
            indigo: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
            amber: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
            teal: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
        };
        return styles[color] || styles.blue;
    };

    return (
        <section className="py-8 bg-transparent relative z-20">
            <div className="max-w-7xl mx-auto px-6">

                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <label className="relative block w-full md:max-w-md">
                        <span className="sr-only">Search projects</span>
                        <input
                            type="search"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Search by client, industry, or keyword"
                            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        />
                    </label>

                    <div className="flex items-center gap-2 text-sm">
                        <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 font-semibold text-slate-600">
                            {filteredProjects.length} projects
                        </span>
                        {(filter !== 'All' || normalizedQuery) ? (
                            <button
                                type="button"
                                onClick={() => {
                                    setFilter('All');
                                    setQuery('');
                                }}
                                className="rounded-full border border-slate-300 bg-white px-3 py-1.5 font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                                Reset filters
                            </button>
                        ) : null}
                    </div>
                </div>

                {/* LIGHT MODE FILTER CHIPS */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    {industries.map(ind => (
                        <button
                            key={ind}
                            onClick={() => setFilter(ind)}
                            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border backdrop-blur-md relative overflow-hidden group
                                ${filter === ind
                                    ? 'bg-blue-600 border-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]'
                                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400 hover:text-slate-900 hover:bg-slate-50 shadow-sm'
                                }`}
                        >
                            <span className="relative z-10">{ind} ({industryCounts.get(ind) ?? 0})</span>
                            {filter === ind && (
                                <span className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/20 to-blue-400/0 translate-x-[-100%] animate-[shimmer_2s_infinite]"></span>
                            )}
                        </button>
                    ))}
                </div>

                {/* BENTO GRID */}
                {filteredProjects.length === 0 ? (
                    <div className="rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
                        <h3 className="text-xl font-black text-slate-900">No projects found</h3>
                        <p className="mt-2 text-sm text-slate-600">Try another keyword or reset filters to view all portfolio items.</p>
                    </div>
                ) : (
                    <>
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[280px] grid-flow-row-dense"
                        >
                            <AnimatePresence mode="popLayout">
                                {visibleProjects.map((p, idx) => {
                                    let spanClass = 'col-span-1 row-span-1';
                                    if (p.size === 'large') spanClass = 'col-span-1 md:col-span-2 row-span-1';
                                    if (p.size === 'tall') spanClass = 'col-span-1 row-span-2';

                                    return (
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                                            transition={{ duration: 0.4, type: 'spring', stiffness: 100, damping: 14 }}
                                            key={p.id}
                                            className={`relative rounded-3xl overflow-hidden group border border-slate-200 bg-white shadow-sm hover:shadow-xl ${spanClass}`}
                                        >
                                            <Link
                                                href={`/our-projects/${p.id}`}
                                                className="absolute inset-0 z-20"
                                                aria-label={`Open ${p.client} case study`}
                                            >
                                                <span className="sr-only">View full case study for {p.client}</span>
                                            </Link>

                                            <div className="absolute inset-0 w-full h-full">
                                                <Image
                                                    src={p.image}
                                                    alt={p.client}
                                                    fill
                                                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out grayscale group-hover:grayscale-0"
                                                    sizes={p.size === 'large' ? '(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw' : '(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw'}
                                                    loading={idx < 4 ? 'eager' : 'lazy'}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
                                            </div>

                                            <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 flex flex-col justify-end h-full z-20">
                                                <div className="flex flex-col gap-2 transform transition-all duration-500">
                                                    <div>
                                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border w-max mb-3 ${getBadgeStyle(p.color)}`}>
                                                            {p.industry}
                                                        </span>
                                                        <h3 className="text-xl md:text-2xl font-black text-white leading-tight drop-shadow-md">
                                                            {p.client}
                                                        </h3>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <span className="inline-flex items-center rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                                                            View Project
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={(event) => {
                                                                event.preventDefault();
                                                                event.stopPropagation();
                                                                setSelectedProject(p);
                                                            }}
                                                            className="z-30 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white transition hover:bg-white/25"
                                                        >
                                                            Quick Preview
                                                        </button>
                                                    </div>

                                                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                                                        <div className="overflow-hidden">
                                                            <p className="text-slate-300 text-sm leading-relaxed font-light drop-shadow-lg pt-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                                                                {p.desc}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="absolute top-5 right-5 h-12 md:h-11 bg-white rounded-xl flex items-center justify-center border border-slate-200 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 z-30 shadow-[0_8px_30px_rgb(0,0,0,0.4)] pointer-events-none px-3 py-2 max-w-[180px]">
                                                {p.logo ? (
                                                    <Image
                                                        src={p.logo}
                                                        alt={`${p.client} logo`}
                                                        width={140}
                                                        height={44}
                                                        className="h-full w-auto object-contain"
                                                        unoptimized
                                                    />
                                                ) : (
                                                    <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase px-1">Logo</span>
                                                )}
                                            </div>

                                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/30 rounded-3xl transition-colors duration-500 pointer-events-none z-10" />
                                        </motion.div>
                                    );
                                })}
                    </AnimatePresence>
                </motion.div>

                        {hasMoreProjects ? (
                            <div className="mt-10 flex justify-center">
                                <button
                                    type="button"
                                    onClick={() => setVisibleCount((prev) => prev + 12)}
                                    className="rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                                >
                                    Load more projects
                                </button>
                            </div>
                        ) : null}
                    </>
                )}

            </div>

            {/* LIGHTBOX MODAL */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-sm cursor-zoom-out"
                        role="presentation"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-6xl max-h-[90vh] rounded-3xl overflow-hidden cursor-default flex flex-col bg-white border border-slate-200 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="project-preview-title"
                            aria-describedby="project-preview-description"
                            ref={modalRef}
                        >
                            {/* Image Container */}
                            <div className="relative w-full h-[50vh] md:h-[70vh] bg-slate-100">
                                <Image
                                    src={selectedProject.image}
                                    alt={selectedProject.client}
                                    fill
                                    className="object-contain"
                                    sizes="100vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-100"></div>
                            </div>

                            {/* Info Container */}
                            <div className="p-6 md:p-8 flex flex-col gap-4">
                                <div className="flex flex-wrap items-start justify-between gap-4">
                                    <div>
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border w-max mb-3 ${getBadgeStyle(selectedProject.color)}`}>
                                            {selectedProject.industry}
                                        </span>
                                        <h3 id="project-preview-title" className="text-2xl md:text-4xl font-black text-slate-900 leading-tight">
                                            {selectedProject.client}
                                        </h3>
                                    </div>
                                </div>
                                <p id="project-preview-description" className="text-slate-600 leading-relaxed font-light text-sm md:text-base max-w-4xl">
                                    {selectedProject.desc}
                                </p>

                                <div className="mt-5 flex flex-wrap gap-2">
                                    <Link
                                        href={`/our-projects/${selectedProject.id}`}
                                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700"
                                    >
                                        View Full Project Detail
                                    </Link>
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
                                    >
                                        Discuss Similar Project
                                    </Link>
                                </div>
                            </div>

                            {/* Close Button */}
                            <button
                                type="button"
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 w-12 h-12 bg-white/50 hover:bg-white/90 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 backdrop-blur-md transition-all border border-slate-200 shadow-sm"
                                aria-label="Close preview"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>

                            <div className="border-t border-slate-200 bg-slate-50 px-6 py-3 text-xs font-semibold text-slate-500">
                                Tip: press Esc to close this preview.
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showStickyCta ? (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 16 }}
                        className="fixed bottom-4 left-4 right-4 z-[90] md:left-auto md:right-6 md:w-[340px]"
                    >
                        <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur">
                            <p className="text-sm font-bold text-slate-900">Need similar results for your production line?</p>
                            <p className="mt-1 text-xs text-slate-600">Talk with our engineering team and get a tailored handling proposal.</p>
                            <Link
                                href="/contact"
                                className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700"
                            >
                                Discuss Your Project
                            </Link>
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </section>
    );
}
