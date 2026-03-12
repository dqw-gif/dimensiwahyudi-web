import { Metadata } from 'next';
import BentoGallery from './BentoGallery';
import { BarChart2, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Our Projects | Portofolio Instalasi PT Dimensi Quantum Wahyudi',
    description: 'Lebih dari sekadar nama. Lihat langsung dokumentasi instalasi sistem vacuum lifting kami di berbagai fasilitas manufaktur raksasa Indonesia.',
    keywords: ['portofolio PT Dimensi Quantum Wahyudi', 'proyek vacuum lifter', 'klien binar handling', 'instalasi schmalz indonesia'],
    openGraph: {
        title: 'Our Projects PT Dimensi Quantum Wahyudi | Kepercayaan Raksasa Industri',
        description: 'Bukti nyata implementasi solusi handling di lini produksi Gajah Tunggal, Unilever, Nestle, hingga Angkasa Pura.',
        url: 'https://dimensiwahyudi.com/our-projects',
    },
    alternates: { canonical: 'https://dimensiwahyudi.com/our-projects' },
};

import { projects } from '../../data/projects';
export { projects };

export default function OurProjectsPage() {
    return (
        <main className="min-h-screen bg-slate-50 selection:bg-blue-500/30">

            {/* HERO SECTION - LIGHT/GRID */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-100/50 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

                <div className="relative max-w-5xl mx-auto px-6 text-center z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 border border-slate-200 backdrop-blur-md rounded-full text-blue-700 text-xs font-bold uppercase tracking-[0.2em] mb-8 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                        Portofolio Solusi
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight drop-shadow-sm">
                        Solusi Material Handling <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600">
                            Kelas Dunia di Indonesia.
                        </span>
                    </h1>

                    <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
                        Dipercaya oleh ratusan manufaktur terkemuka untuk mengintegrasikan teknologi alat angkat ergonomis Eropa demi <strong className="text-slate-900 font-semibold">produktivitas dan keselamatan kerja</strong> yang maksimal.
                    </p>
                </div>
            </section>

            {/* INTERACTIVE BENTO GALLERY (CLIENT COMPONENT) */}
            <BentoGallery projects={projects} />

            {/* CTA SECTION - GRADIENT */}
            <section className="py-24 relative overflow-hidden bg-slate-100 border-t border-slate-200">
                <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
                    <div className="bg-white border border-slate-200 p-4 inline-block rounded-3xl mb-8 shadow-sm">
                        <CheckCircle size={40} className="text-blue-500" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 drop-shadow-sm">Tingkatkan Efisiensi Produksi Anda</h2>
                    <p className="text-slate-600 text-lg mb-10 leading-relaxed font-light">
                        Setiap industri memiliki rintangan penanganan material yang spesifik. Hubungi tim <i>engineer</i> kami hari ini untuk merancang solusi presisi yang disesuaikan khusus dengan kebutuhan lini fasilitas Anda.
                    </p>
                    <Link href="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-md shadow-blue-600/20">
                        Konsultasi Kebutuhan Anda <ArrowRight size={18} />
                    </Link>
                </div>
            </section>
        </main>
    );
}

