import { Metadata } from 'next';
import BentoGallery from './BentoGallery';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { spacingTokens } from '../../constants/spacingTokens';

export const metadata: Metadata = {
    title: 'Our Projects | PT Dimensi Quantum Wahyudi',
    description: 'Explore selected project portfolio highlights featuring vacuum lifting and ergonomic handling systems deployed across major manufacturing facilities in Indonesia.',
    keywords: ['PT Dimensi Quantum Wahyudi portfolio', 'vacuum lifter projects', 'industrial handling implementation', 'Schmalz installation Indonesia'],
    openGraph: {
        title: 'Our Projects | PT Dimensi Quantum Wahyudi',
        description: 'Portfolio highlights of practical handling solutions deployed across leading industrial production lines in Indonesia.',
        url: 'https://dimensiwahyudi.com/our-projects',
        locale: 'en_ID',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Our Projects | PT Dimensi Quantum Wahyudi',
        description: 'Explore portfolio highlights for vacuum lifting and ergonomic handling projects in Indonesia.',
    },
    alternates: {
        canonical: 'https://dimensiwahyudi.com/our-projects',
        languages: {
            'en-ID': 'https://dimensiwahyudi.com/our-projects',
            'id-ID': 'https://dimensiwahyudi.com/our-projects',
            'x-default': 'https://dimensiwahyudi.com/our-projects',
        },
    },
};

import { projects } from '../../data/projects';
export { projects };

export default async function OurProjectsPage() {
    const copy = {
        badge: 'Solutions Portfolio',
        titleLine1: 'World-Class Material Handling',
        titleLine2: 'Built for Indonesia.',
        subtitle:
            'Trusted by leading manufacturers to deploy ergonomic European lifting technology that improves productivity and elevates workplace safety.',
        ctaTitle: 'Boost Your Production Efficiency',
        ctaDesc:
            'Every facility has its own material handling constraints. Talk to our engineers today and get a precision-built solution tailored to your production line.',
        ctaButton: 'Discuss Your Requirements',
    };

    return (
        <main className="min-h-screen bg-slate-50 selection:bg-blue-500/30">

            {/* HERO SECTION - LIGHT/GRID */}
            <section className={`relative ${spacingTokens.hero.standard} overflow-hidden`}>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-100/50 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

                <div className={`${spacingTokens.page.containerMedium} relative text-center z-10`}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 border border-slate-200 backdrop-blur-md rounded-full text-blue-700 text-xs font-bold uppercase tracking-[0.2em] mb-8 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                        {copy.badge}
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight drop-shadow-sm">
                        {copy.titleLine1} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600">
                            {copy.titleLine2}
                        </span>
                    </h1>

                    <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
                        {copy.subtitle}
                    </p>
                </div>
            </section>

            {/* INTERACTIVE BENTO GALLERY (CLIENT COMPONENT) */}
            <BentoGallery projects={projects} />

            {/* CTA SECTION - GRADIENT */}
            <section className={`${spacingTokens.section.spacious} relative overflow-hidden bg-slate-100 border-t border-slate-200`}>
                <div className={`${spacingTokens.page.containerCompact} max-w-3xl text-center relative z-10`}>
                    <div className="bg-white border border-slate-200 p-4 inline-block rounded-3xl mb-8 shadow-sm">
                        <CheckCircle size={40} className="text-blue-500" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 drop-shadow-sm">{copy.ctaTitle}</h2>
                    <p className="text-slate-600 text-lg mb-10 leading-relaxed font-light">
                        {copy.ctaDesc}
                    </p>
                    <Link href="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-md shadow-blue-600/20">
                        {copy.ctaButton} <ArrowRight size={18} />
                    </Link>
                </div>
            </section>
        </main>
    );
}

