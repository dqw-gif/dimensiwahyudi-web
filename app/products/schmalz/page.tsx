import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { ArrowRight, ArrowLeft, Filter, Award } from 'lucide-react';
import { schmalzProducts } from '../../../data/products/schmalz';
import { videos } from '../../../data/videos';
import ProductVideoGrid from './ProductVideoGrid';

export const metadata: Metadata = {
    title: 'Produk Schmalz Indonesia | Vacuum Lifter, VacuMaster, Crane System | PT Dimensi Quantum Wahyudi',
    description: 'Katalog lengkap produk Schmalz: Vacuum Tube Lifter JumboFlex, VacuMaster, Crane System, Mobile Lifting Device, Suction Cup. Distributor resmi Schmalz di Indonesia. Garansi resmi & spare part tersedia.',
    keywords: ['Schmalz Indonesia', 'Vacuum Tube Lifter Schmalz', 'VacuMaster Indonesia', 'JumboFlex', 'Crane System Schmalz', 'Alat Angkat Vakum', 'PT Dimensi Quantum Wahyudi Bekasi'],
    alternates: { canonical: 'https://dimensiwahyudi.com/products/schmalz' },
    openGraph: {
        title: 'Produk Schmalz Indonesia | Vacuum Lifter & Crane System',
        description: 'Distributor resmi Schmalz untuk Indonesia. Vacuum lifter, crane system, suction cup standar Jerman.',
        url: 'https://dimensiwahyudi.com/products/schmalz',
        type: 'website',
        locale: 'id_ID',
        siteName: 'PT Dimensi Quantum Wahyudi',
    },
};

const categoryColors: Record<string, string> = {
    'Vacuum Lifter': 'bg-blue-500/10 text-blue-600 border-blue-200',
    'Crane System': 'bg-sky-500/10 text-sky-600 border-sky-200',
    'Vacuum Component': 'bg-teal-500/10 text-teal-600 border-teal-200',
    'Mobile Lifting': 'bg-cyan-500/10 text-cyan-600 border-cyan-200',
};

export default function SchmalzCatalogPage() {
    return (
        <main className="min-h-screen bg-white">

            {/* HERO */}
            <section className="relative pt-32 pb-16 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 overflow-hidden">
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'linear-gradient(rgba(99,179,237,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,0.4) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
                <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 80% at 30% 50%, rgba(37,99,235,0.2) 0%, transparent 70%)' }} />

                <div className="relative max-w-7xl mx-auto px-6">
                    <Link href="/products" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 mb-8 text-sm font-medium transition-colors">
                        <ArrowLeft size={16} /> Semua Brand
                    </Link>
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                                🇩🇪 Made in Germany · Est. 1910
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black text-white leading-none tracking-tighter mb-4">
                                SCHMALZ
                            </h1>
                            <div className="h-1.5 w-24 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full mb-6" />
                            <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
                                Pemimpin global dalam teknologi vakum industri — solusi lengkap untuk otomasi, manual handling, dan clamping.
                            </p>
                        </div>
                        <div className="hidden lg:flex flex-col items-end gap-6">
                            <a href="https://www.schmalz.com" target="_blank" rel="noopener noreferrer"
                                className="block bg-white border border-blue-100 rounded-2xl px-6 py-4 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105 transition-all">
                                <Image
                                    src="https://imgur.com/6ns1gwx.png"
                                    alt="Schmalz Logo"
                                    width={160}
                                    height={48}
                                    className="object-contain"
                                    unoptimized
                                />
                            </a>
                            <div className="flex items-center gap-4 text-slate-500 text-sm">
                                <div className="text-center">
                                    <div className="text-3xl font-black text-white">{schmalzProducts.length}</div>
                                    <div className="text-xs uppercase tracking-widest">Produk</div>
                                </div>
                                <div className="w-px h-12 bg-slate-700" />
                                <div className="text-center">
                                    <div className="text-3xl font-black text-blue-400">70+</div>
                                    <div className="text-xs uppercase tracking-widest">Negara</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRODUCT GRID */}
            <section className="py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center gap-3 mb-10">
                        <Filter size={16} className="text-slate-400" />
                        <span className="text-slate-500 text-sm font-medium">Menampilkan {schmalzProducts.length} produk unggulan</span>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {schmalzProducts.map((product, i) => (
                            <Link
                                key={product.slug}
                                href={`/products/schmalz/${product.slug}`}
                                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-0.5"
                            >
                                {/* Card image area */}
                                <div className={`h-44 bg-gradient-to-br ${product.heroColor} relative overflow-hidden`}>
                                    {product.imageUrl ? (
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="absolute inset-0 w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    ) : (
                                        /* 📷 Foto belum diisi — gradient ditampilkan sebagai placeholder */
                                        <div className="absolute inset-0 opacity-20"
                                            style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                                    )}
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <span className={`inline-block px-3 py-1 border rounded-full text-xs font-bold uppercase tracking-wider ${categoryColors[product.category]} bg-white/90`}>
                                            {product.category}
                                        </span>
                                    </div>
                                    <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm rounded-lg px-2 py-1 text-white text-xs font-mono font-bold border border-white/20">
                                        {product.capacity}
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-blue-700 transition-colors leading-tight">
                                        {product.name}
                                    </h3>
                                    <p className="text-blue-600 text-xs font-bold uppercase tracking-wider mb-3">
                                        {product.tagline}
                                    </p>
                                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-6">
                                        {product.description}
                                    </p>

                                    {/* Key specs preview */}
                                    <div className="grid grid-cols-2 gap-2 mb-6">
                                        {product.specs.slice(0, 2).map(spec => (
                                            <div key={spec.label} className="bg-slate-50 rounded-lg px-3 py-2">
                                                <div className="text-slate-400 text-[10px] uppercase tracking-wider">{spec.label}</div>
                                                <div className="text-slate-800 text-xs font-bold mt-0.5">{spec.value}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex items-center text-blue-600 font-bold text-sm group-hover:gap-3 gap-2 transition-all">
                                        Lihat Detail
                                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* VIDEO DEMO SECTION */}
            <ProductVideoGrid videos={[videos[0], videos[2], videos[3]]} />

            {/* CTA */}
            <section className="py-16 bg-white border-t border-slate-100">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <Award className="w-10 h-10 text-blue-600 mx-auto mb-4 opacity-60" />
                    <h2 className="text-2xl font-black text-slate-900 mb-3">Tidak Menemukan yang Anda Cari?</h2>
                    <p className="text-slate-500 mb-8">Schmalz memiliki ribuan varian produk. Konsultasikan kebutuhan spesifik Anda dengan tim engineer kami.</p>
                    <a href="https://wa.me/6281119168752" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/30">
                        Konsultasi via WhatsApp
                        <ArrowRight size={16} />
                    </a>
                </div>
            </section>
        </main>
    );
}

