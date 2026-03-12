import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, Globe, Award, Zap } from 'lucide-react';
import { BRANDS, schmalzProducts, binarProducts } from '../../data/products';

export const metadata: Metadata = {
    title: 'Produk | PT Dimensi Quantum Wahyudi � Distributor Resmi Schmalz & Binar Handling',
    description: 'Temukan solusi vacuum lifter, lift arm ergonomis, dan gripdon dari Schmalz (Germany) dan Binar Handling (Sweden). Distributor resmi di Indonesia.',
};

const brandCards = [
    {
        brand: BRANDS.schmalz,
        productCount: schmalzProducts.length,
        href: '/products/schmalz',
        gradient: 'from-sky-400 via-blue-500 to-blue-700',
        cardBg: 'bg-white border-blue-200 hover:border-blue-400',
        glowColor: 'shadow-blue-500/10',
        hoverGlow: 'hover:shadow-blue-500/30',
        tagColor: 'bg-blue-50 text-blue-600 border-blue-200',
        accentLine: 'bg-blue-500',
        nameCls: 'text-slate-900 group-hover:text-blue-700',
        descCls: 'text-slate-500',
        countCls: 'text-slate-400',
        ctaCls: 'text-blue-700',
        estCls: 'text-slate-400',
        tagPillCls: 'bg-slate-50 border-slate-200 text-slate-500',
        categories: ['Vacuum Tube Lifter', 'VacuMaster', 'Crane System', 'Suction Cups'],
    },
    {
        brand: BRANDS.binar,
        productCount: binarProducts.length,
        href: '/products/binar',
        gradient: 'from-zinc-900 via-red-950 to-black',
        cardBg: 'bg-zinc-950 border-red-800/40 hover:border-red-600',
        glowColor: 'shadow-red-700/20',
        hoverGlow: 'hover:shadow-red-600/40',
        tagColor: 'bg-red-500/10 text-red-400 border-red-500/30',
        accentLine: 'bg-red-500',
        nameCls: 'text-white group-hover:text-red-300',
        descCls: 'text-zinc-400',
        countCls: 'text-zinc-500',
        ctaCls: 'text-red-400',
        estCls: 'text-zinc-600',
        tagPillCls: 'bg-white/5 border-white/10 text-zinc-400',
        categories: ['QLA 50i OM', 'QLA 100i OM', 'QLD 300i', 'Vacuum Grippers'],
    },
];

export default function ProductsPage() {
    return (
        <main className="min-h-screen bg-white">

            {/* HERO */}
            <section className="relative pt-32 pb-20 bg-white overflow-hidden">
                {/* Grid pattern bg */}
                <div className="absolute inset-0 opacity-[0.06]"
                    style={{ backgroundImage: 'linear-gradient(rgba(37,99,235,1) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
                {/* Soft blue radial fade */}
                <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(219,234,254,0.9) 0%, transparent 70%)' }} />

                <div className="relative max-w-7xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-600 text-xs font-bold uppercase tracking-widest mb-8">
                        <Zap size={12} />
                        Authorized Distributor � Indonesia
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight mb-6">
                        <span className="block text-xl md:text-2xl font-bold text-slate-600 mb-2 uppercase tracking-widest">Distributor Resmi</span>
                        PRODUK SOLUSI ANGKAT &
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                            VACUUM LIFTER.
                        </span>
                    </h1>
                    <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        PT Dimensi Quantum Wahyudi adalah distributor resmi <strong className="text-slate-800">Schmalz</strong> dari Jerman dan <strong className="text-slate-800">Binar Handling</strong> dari Swedia � dua pemimpin teknologi ergonomi & vakum dunia.
                    </p>
                </div>
            </section>

            {/* BRAND CARDS */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-8">
                        {brandCards.map(({ brand, productCount, href, gradient, cardBg, glowColor, hoverGlow, tagColor, accentLine, nameCls, descCls, countCls, ctaCls, estCls, tagPillCls, categories }) => (
                            <Link
                                key={brand.id}
                                href={href}
                                className={`group relative block rounded-2xl border ${cardBg} overflow-hidden shadow-xl ${glowColor} ${hoverGlow} hover:shadow-2xl transition-all duration-500 hover:-translate-y-1`}
                            >
                                {/* Top gradient bar */}
                                <div className={`h-1.5 w-full bg-gradient-to-r ${gradient}`} />

                                <div className="p-8 md:p-10">
                                    {/* Origin badge */}
                                    <div className="flex items-center justify-between mb-8">
                                        <span className={`flex items-center gap-2 px-3 py-1 border rounded-full text-xs font-bold uppercase tracking-widest ${tagColor}`}>
                                            <Globe size={10} />
                                            {brand.origin}
                                        </span>
                                        <span className={`text-xs font-mono ${estCls}`}>Est. {brand.founded}</span>
                                    </div>

                                    {/* Brand name */}
                                    <h2 className={`text-4xl md:text-5xl font-black mb-2 tracking-tight transition-colors ${nameCls}`}>
                                        {brand.name}
                                    </h2>
                                    <div className={`h-1 w-16 ${accentLine} rounded-full mb-5`} />
                                    <p className={`text-base leading-relaxed mb-8 ${descCls}`}>
                                        {brand.description}
                                    </p>

                                    {/* Product preview tags */}
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {categories.map(cat => (
                                            <span key={cat} className={`px-3 py-1 border rounded-lg text-xs font-medium ${tagPillCls}`}>
                                                {cat}
                                            </span>
                                        ))}
                                        <span className={`px-3 py-1 border rounded-lg text-xs font-medium ${tagPillCls}`}>
                                            +{productCount - 4} lainnya
                                        </span>
                                    </div>

                                    {/* CTA */}
                                    <div className="flex items-center justify-between">
                                        <div className={`flex items-center gap-2 text-sm ${countCls}`}>
                                            <Award size={14} />
                                            <span>{productCount} produk unggulan</span>
                                        </div>
                                        <div className={`flex items-center gap-2 font-bold text-sm group-hover:gap-4 transition-all ${ctaCls}`}>
                                            Lihat Katalog Produk {brand.name}
                                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* BOTTOM CTA */}
            <section className="py-20 bg-white border-t border-slate-100">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-black text-slate-900 mb-4">Butuh Konsultasi Teknis?</h2>
                    <p className="text-slate-500 mb-8">Engineer kami siap membantu memilih solusi yang tepat untuk kebutuhan industri Anda.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://wa.me/6281119168752"
                            target="_blank"
                            className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all"
                        >
                            Chat WhatsApp
                        </a>
                        <Link href="/contact" className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition-all">
                            Tentang Kami
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
