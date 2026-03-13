"use client";

import React, { useState } from 'react';
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
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const industries = ['All', ...Array.from(new Set(projects.map(p => p.industry)))];

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.industry === filter);

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
                            <span className="relative z-10">{ind}</span>
                            {filter === ind && (
                                <span className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/20 to-blue-400/0 translate-x-[-100%] animate-[shimmer_2s_infinite]"></span>
                            )}
                        </button>
                    ))}
                </div>

                {/* BENTO GRID */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[280px] grid-flow-row-dense"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((p, idx) => {
                            // Determine grid spans based on the 'size' property
                            let spanClass = 'col-span-1 row-span-1'; // standard
                            if (p.size === 'large') spanClass = 'col-span-1 md:col-span-2 row-span-1';
                            if (p.size === 'tall') spanClass = 'col-span-1 row-span-2';

                            return (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                                    transition={{ duration: 0.4, type: "spring", stiffness: 100, damping: 14 }}
                                    key={p.id}
                                    onClick={() => setSelectedProject(p)}
                                    className={`relative rounded-3xl overflow-hidden group border border-slate-200 bg-white shadow-sm hover:shadow-xl cursor-zoom-in ${spanClass}`}
                                >
                                    {/* Image Background */}
                                    <div className="absolute inset-0 w-full h-full">
                                        <Image
                                            src={p.image}
                                            alt={p.client}
                                            fill
                                            className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out grayscale group-hover:grayscale-0"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
                                    </div>

                                    {/* Glassmorphism Hover Content */}
                                    <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 flex flex-col justify-end h-full z-20">

                                        {/* Smooth expanding content container */}
                                        <div className="flex flex-col gap-2 transform transition-all duration-500">
                                            <div>
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border w-max mb-3 ${getBadgeStyle(p.color)}`}>
                                                    {p.industry}
                                                </span>
                                                <h3 className="text-xl md:text-2xl font-black text-white leading-tight drop-shadow-md">
                                                    {p.client}
                                                </h3>
                                            </div>

                                            {/* Hover state: Smart Description - using layout grid trick for smooth auto height animation */}
                                            <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                                                <div className="overflow-hidden">
                                                    <p className="text-slate-300 text-sm leading-relaxed font-light drop-shadow-lg pt-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                                                        {p.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    {/* Logo Factory Slot - Solid White Background & Auto Width for Landscape Logos */}
                                    <div className="absolute top-5 right-5 h-12 md:h-11 bg-white rounded-xl flex items-center justify-center border border-slate-200 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 z-30 shadow-[0_8px_30px_rgb(0,0,0,0.4)] pointer-events-none px-3 py-2 max-w-[180px]">
                                        {p.logo ? (
                                             
                                            <img src={p.logo} alt={`${p.client} Logo`} className="h-full w-auto object-contain" />
                                        ) : (
                                            <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase px-1">Logo</span>
                                        )}
                                    </div>

                                    {/* Futuristic Glow Border Effect on Hover */}
                                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/30 rounded-3xl transition-colors duration-500 pointer-events-none z-10"></div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

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
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-6xl max-h-[90vh] rounded-3xl overflow-hidden cursor-default flex flex-col bg-white border border-slate-200 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
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
                                        <h3 className="text-2xl md:text-4xl font-black text-slate-900 leading-tight">
                                            {selectedProject.client}
                                        </h3>
                                    </div>
                                </div>
                                <p className="text-slate-600 leading-relaxed font-light text-sm md:text-base max-w-4xl">
                                    {selectedProject.desc}
                                </p>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 w-12 h-12 bg-white/50 hover:bg-white/90 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 backdrop-blur-md transition-all border border-slate-200 shadow-sm"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
