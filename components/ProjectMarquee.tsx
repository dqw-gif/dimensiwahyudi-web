"use client";

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useAnimationFrame } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Using the same type as in BentoGallery
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

export default function ProjectMarquee({ projects }: { projects: Project[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    // Mouse drag states
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax effect for the background text "OUR PROJECTS"
    const bgTextX = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

    // Duplikasi array besar untuk efek infinite seamless
    const duplicatedProjects = [...projects, ...projects, ...projects, ...projects];

    // Gunakan ref untuk melacak posisi presisi floating-point
    const exactScrollX = useRef(0);

    // Animasi infinite scroll menggunakan Framer Motion (Lebih Lambat)
    useAnimationFrame((time, delta) => {
        if (!trackRef.current || isHovered || isDragging) return;

        // Speed adjustment: lebih lambat
        exactScrollX.current += 1;
        trackRef.current.scrollLeft = Math.floor(exactScrollX.current);

        // Cek jika sudah scroll sejauh 1 set original projects, reset ke awal untuk efek infinite looping
        const container = trackRef.current;
        const oneSetWidth = container.scrollWidth / 4;

        if (container.scrollLeft >= oneSetWidth * 2) {
            exactScrollX.current -= oneSetWidth;
            container.scrollLeft -= oneSetWidth;
        }
    });

    // Event handlers untuk Drag (Geser Mouse)
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.pageX - (trackRef.current?.offsetLeft || 0));
        setScrollLeft(trackRef.current?.scrollLeft || 0);
        if (trackRef.current) exactScrollX.current = trackRef.current.scrollLeft;
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
        setIsHovered(false);
        if (trackRef.current) exactScrollX.current = trackRef.current.scrollLeft;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        if (trackRef.current) exactScrollX.current = trackRef.current.scrollLeft;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !trackRef.current) return;
        e.preventDefault();
        const x = e.pageX - (trackRef.current.offsetLeft || 0);
        const walk = (x - startX) * 1.5; // Scroll fastness multiplier
        trackRef.current.scrollLeft = scrollLeft - walk;
        exactScrollX.current = trackRef.current.scrollLeft;

        // Handle boundary saat di-drag secara paksa ke ujung
        const container = trackRef.current;
        const oneSetWidth = container.scrollWidth / 4;

        if (container.scrollLeft >= oneSetWidth * 3) {
            container.scrollLeft -= oneSetWidth;
            exactScrollX.current -= oneSetWidth;
        } else if (container.scrollLeft <= 0) {
            container.scrollLeft += oneSetWidth;
            exactScrollX.current += oneSetWidth;
        }
    };

    // Mencegah link tertrigger saat mouse di-drag
    const handleDragClick = (e: React.MouseEvent) => {
        if (Math.abs((trackRef.current?.scrollLeft || 0) - scrollLeft) > 10) {
            e.preventDefault();
        }
    };

    return (
        <section
            ref={containerRef}
            className="py-24 relative overflow-hidden bg-slate-950 border-t border-slate-900 border-b"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-cyan-900/20 blur-[120px] rounded-full pointer-events-none"></div>

            {/* Parallax Background Text */}
            <motion.div
                style={{ x: bgTextX }}
                className="absolute top-1/2 -translate-y-1/2 left-0 text-[12vw] font-black text-slate-900/50 whitespace-nowrap pointer-events-none z-0 selection:bg-transparent"
            >
                TRUSTED BY 50+ MULTINATIONAL MANUFACTURES
            </motion.div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row items-center justify-between gap-6 relative">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/40 border border-cyan-800/50 rounded-full text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                        Klien & Portofolio Manufaktur
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                        Bukti Nyata <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Implementasi Otomasi</span>.
                    </h2>
                </div>

                <Link
                    href="/our-projects"
                    className="group relative px-6 py-3 bg-slate-900 text-white font-semibold rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-all overflow-hidden flex-shrink-0"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        Lihat Semua Proyek
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                </Link>
            </div>

            {/* Marquee Track Container with Drag & Drop */}
            <div className="relative w-full group py-4">

                {/* Gradient Masks for smooth fade out on edges */}
                <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-slate-950 to-transparent z-20 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-slate-950 to-transparent z-20 pointer-events-none"></div>

                {/* Draggable Track Container */}
                <div
                    ref={trackRef}
                    className="flex overflow-x-auto w-full [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovered(true)}
                >
                    <div className="flex w-max px-4">
                        {duplicatedProjects.map((p, idx) => (
                            <Link
                                href={`/our-projects`}
                                key={`${p.id}-${idx}`}
                                onClick={handleDragClick}
                                draggable={false}
                                className="relative select-none w-[300px] md:w-[400px] h-[220px] md:h-[280px] mx-3 md:mx-4 rounded-2xl overflow-hidden group/card block shrink-0 border border-slate-800/60 bg-slate-900 transform transition-transform duration-500 hover:scale-[1.02] hover:z-30 hover:border-cyan-500/50 shadow-lg"
                            >
                                {/* Image */}
                                <Image
                                    src={p.image}
                                    alt={p.client}
                                    fill
                                    className="object-cover opacity-50 grayscale group-hover/card:grayscale-0 group-hover/card:opacity-80 transition-all duration-700 group-hover/card:scale-110"
                                    sizes="(max-width: 768px) 300px, 400px"
                                />

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                                {/* Content */}
                                <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end z-20 h-full">
                                    <div className="translate-y-4 group-hover/card:translate-y-0 transition-transform duration-500">
                                        <span className="inline-block px-2 py-1 mb-2 text-[10px] font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/80 border border-cyan-800 rounded backdrop-blur-sm">
                                            {p.industry}
                                        </span>
                                        <h3 className="text-xl md:text-2xl font-black text-white leading-tight drop-shadow-md">
                                            {p.client}
                                        </h3>

                                        {/* Hover Reveal Line */}
                                        <div className="h-0.5 w-0 bg-cyan-500 mt-3 group-hover/card:w-full transition-all duration-700 ease-out"></div>
                                    </div>
                                </div>

                                {/* Logo Factory Slot - Solid White Background & Auto Width for Landscape Logos */}
                                <div className="absolute top-4 right-4 h-12 md:h-11 bg-white rounded-xl flex items-center justify-center border border-slate-200 transform translate-y-2 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-500 delay-100 z-30 shadow-[0_8px_30px_rgb(0,0,0,0.4)] pointer-events-none px-3 py-2 max-w-[180px]">
                                    {p.logo ? (
                                         
                                        <img src={p.logo} alt={`${p.client} Logo`} className="h-full w-auto object-contain" />
                                    ) : (
                                        <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase px-1">Logo</span>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
