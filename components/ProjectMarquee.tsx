"use client";

import React, { useRef, useState } from 'react';
import { useAnimationFrame } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

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
    const trackRef = useRef<HTMLDivElement>(null);

    // Mouse drag states
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Take 10 featured projects and duplicate for continuous marquee looping
    const curatedProjects = projects.slice(0, 10);
    const duplicatedProjects = [...curatedProjects, ...curatedProjects];

    const exactScrollX = useRef(0);

    // Animasi infinite scroll menggunakan Framer Motion
    useAnimationFrame(() => {
        if (!trackRef.current || isHovered || isDragging) return;

        exactScrollX.current += 0.8;
        trackRef.current.scrollLeft = Math.floor(exactScrollX.current);

        const container = trackRef.current;
        const oneSetWidth = container.scrollWidth / 2;

        if (container.scrollLeft >= oneSetWidth) {
            exactScrollX.current -= oneSetWidth;
            container.scrollLeft -= oneSetWidth;
        }
    });

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
        const walk = (x - startX) * 1.5;
        trackRef.current.scrollLeft = scrollLeft - walk;
        exactScrollX.current = trackRef.current.scrollLeft;
    };

    const handleDragClick = (e: React.MouseEvent) => {
        if (Math.abs((trackRef.current?.scrollLeft || 0) - scrollLeft) > 10) {
            e.preventDefault();
        }
    };

    return (
        <section className="py-20 lg:py-24 bg-slate-50 border-b border-slate-200/80 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 relative z-10">
                <div className="max-w-2xl">
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#005596] block mb-2">
                        Installation Documentation Gallery
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        Live Deployments Across National Manufacturing Facilities
                    </h2>
                    <p className="mt-3 text-base text-slate-600 leading-relaxed font-normal">
                        Field proof of Schmalz vacuum lifters and aluminum crane runway systems operating in automotive, tire, chemical, and logistics plants across Indonesia.
                    </p>
                </div>

                <Link
                    href="/our-projects"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-lg border border-slate-300 shadow-2xs hover:border-slate-400 transition-all shrink-0"
                >
                    <span>Explore Project Portfolio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                </Link>
            </div>

            {/* Marquee Track Container with Drag & Drop */}
            <div className="relative w-full group py-2">
                {/* Clean Edge Gradient Masks matching slate-50 */}
                <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-slate-50 to-transparent z-20 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-slate-50 to-transparent z-20 pointer-events-none"></div>

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
                                href="/our-projects"
                                key={`${p.id}-${idx}`}
                                onClick={handleDragClick}
                                draggable={false}
                                className="relative select-none w-[280px] md:w-[360px] h-[220px] md:h-[260px] mx-3 rounded-2xl overflow-hidden group/card block shrink-0 border border-slate-200 bg-white hover:border-[#005596] shadow-xs hover:shadow-md transition-all duration-300"
                            >
                                <Image
                                    src={p.image}
                                    alt={p.client}
                                    fill
                                    loading="lazy"
                                    className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                                    sizes="(max-width: 768px) 280px, 360px"
                                />

                                {/* Subtle Technical Bottom Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent"></div>

                                {/* Content Details */}
                                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex flex-col justify-end z-20">
                                    <span className="inline-block self-start px-2 py-0.5 mb-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-200 bg-slate-900/80 rounded border border-white/10">
                                        {p.industry}
                                    </span>
                                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug drop-shadow-xs">
                                        {p.client}
                                    </h3>
                                </div>

                                {/* Clean Client Badge Top-Right */}
                                {p.logo && (
                                    <div className="absolute top-3 right-3 h-8 bg-white/95 backdrop-blur-xs rounded-md flex items-center justify-center border border-slate-200 px-2.5 shadow-2xs pointer-events-none">
                                        <Image
                                            src={p.logo}
                                            alt={`${p.client} Logo`}
                                            width={90}
                                            height={28}
                                            loading="lazy"
                                            className="h-full w-auto object-contain"
                                            unoptimized
                                        />
                                    </div>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
