'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    ArrowRight,
    ArrowLeft,
    Globe,
    Award,
    Filter,
    CheckCircle,
    Phone,
    Mail,
    ChevronRight,
    Layers,
    Cpu,
} from 'lucide-react';
import { useLanguage } from '../LanguageProvider';
import { BRANDS, schmalzProducts, binarProducts, Product, BinarProduct } from '../../data/products';
import { localizeProduct } from '../../data/products/translations_id';
import { videos } from '../../data/videos';
import ProductVideoGrid from '../../app/products/schmalz/ProductVideoGrid';
import PreFooterCTA from '../PreFooterCTA';
import Breadcrumbs from '../Breadcrumbs';

/* ─── 1. /products Hub View ─── */
export function ProductsHubView() {
    const { lang } = useLanguage();
    const isId = lang === 'id';

    const brandCards = [
        {
            brand: BRANDS.schmalz,
            originText: isId ? 'Jerman' : 'Germany',
            descText: isId
                ? 'Pemimpin global teknologi vakum industri asal Jerman. Menghadirkan Vacuum Tube Lifter, VacuMaster, Crane System, dan komponen vakum untuk otomasi serta material handling pabrik.'
                : BRANDS.schmalz.description,
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
            originText: isId ? 'Swedia' : 'Sweden',
            descText: isId
                ? 'Pelopor lengan manipulator servo cerdas asal Swedia. Mengembangkan sistem Quick-Lift Arm elektrik yang menetapkan standar baru dalam kecepatan siklus, akurasi posisi, dan ergonomi kerja.'
                : BRANDS.binar.description,
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

    return (
        <>
            {/* HERO */}
            <section className="relative pt-24 md:pt-32 pb-14 md:pb-20 bg-white overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(37,99,235,1) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,1) 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(219,234,254,0.9) 0%, transparent 70%)',
                    }}
                />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#005596] mb-6 md:mb-8">
                        <Award size={12} className="text-[#005596]" />
                        {isId ? 'Distributor Resmi di Indonesia' : 'Authorized Distributor in Indonesia'}
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight mb-5 md:mb-6">
                        <span className="block text-lg sm:text-xl md:text-2xl font-bold text-slate-600 mb-2 uppercase tracking-widest">
                            {isId ? 'Mitra Resmi Principal Eropa' : 'Official Distributor'}
                        </span>
                        {isId ? 'SISTEM MATERIAL HANDLING &' : 'LIFTING SOLUTIONS &'}
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#005596] to-sky-600">
                            VACUUM LIFTERS.
                        </span>
                    </h1>
                    <p className="text-slate-500 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        {isId
                            ? 'PT Dimensi Quantum Wahyudi adalah distributor resmi Schmalz dari Jerman dan Binar Handling dari Swedia, dua pemimpin global dalam teknologi pengangkatan vakum dan manipulator ergonomis.'
                            : 'PT Dimensi Quantum Wahyudi is the official distributor of Schmalz from Germany and Binar Handling from Sweden, two global leaders in ergonomic and vacuum handling technology.'}
                    </p>
                </div>
            </section>

            {/* BRAND CARDS */}
            <section className="py-16 md:py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-5 md:gap-8">
                        {brandCards.map(
                            ({
                                brand,
                                originText,
                                descText,
                                productCount,
                                href,
                                gradient,
                                cardBg,
                                glowColor,
                                hoverGlow,
                                tagColor,
                                accentLine,
                                nameCls,
                                descCls,
                                countCls,
                                ctaCls,
                                estCls,
                                tagPillCls,
                                categories,
                            }) => (
                                <Link
                                    key={brand.id}
                                    href={href}
                                    className={`group relative block rounded-2xl border ${cardBg} overflow-hidden shadow-xl ${glowColor} ${hoverGlow} hover:shadow-2xl transition-all duration-500 hover:-translate-y-1`}
                                >
                                    <div className={`h-1.5 w-full bg-gradient-to-r ${gradient}`} />

                                    <div className="p-6 sm:p-8 md:p-10">
                                        <div className="flex items-center justify-between gap-3 mb-6 md:mb-8">
                                            <span
                                                className={`flex items-center gap-2 px-3 py-1 border rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest ${tagColor}`}
                                            >
                                                <Globe size={10} />
                                                {originText}
                                            </span>
                                            <span className={`text-xs font-mono ${estCls}`}>Est. {brand.founded}</span>
                                        </div>

                                        <h2
                                            className={`text-3xl sm:text-4xl md:text-5xl font-black mb-2 tracking-tight transition-colors ${nameCls}`}
                                        >
                                            {brand.name}
                                        </h2>
                                        <div className={`h-1 w-14 sm:w-16 ${accentLine} rounded-full mb-4 md:mb-5`} />
                                        <p className={`text-sm sm:text-base leading-relaxed mb-6 md:mb-8 ${descCls}`}>
                                            {descText}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                                            {categories.map((cat) => (
                                                <span
                                                    key={cat}
                                                    className={`px-3 py-1 border rounded-lg text-[11px] sm:text-xs font-medium ${tagPillCls}`}
                                                >
                                                    {cat}
                                                </span>
                                            ))}
                                            <span
                                                className={`px-3 py-1 border rounded-lg text-[11px] sm:text-xs font-medium ${tagPillCls}`}
                                            >
                                                +{productCount - 4} {isId ? 'lainnya' : 'more'}
                                            </span>
                                        </div>

                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                            <div className={`flex items-center gap-2 text-sm ${countCls}`}>
                                                <Award size={14} />
                                                <span>
                                                    {productCount} {isId ? 'lini produk utama' : 'featured products'}
                                                </span>
                                            </div>
                                            <div
                                                className={`flex items-center gap-2 font-bold text-sm group-hover:gap-4 transition-all ${ctaCls}`}
                                            >
                                                {isId ? `Lihat Katalog ${brand.name}` : `View Product Catalog ${brand.name}`}
                                                <ArrowRight
                                                    size={16}
                                                    className="group-hover:translate-x-1 transition-transform"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ),
                        )}
                    </div>
                </div>
            </section>

            {/* PRE-FOOTER CTA */}
            <PreFooterCTA />
        </>
    );
}

/* ─── 2. /products/schmalz Catalog View ─── */
export function SchmalzCatalogView() {
    const { lang } = useLanguage();
    const isId = lang === 'id';

    return (
        <>
            {/* HERO */}
            <section className="relative pt-28 md:pt-36 pb-16 md:pb-24 bg-gradient-to-br from-slate-950 via-slate-900 to-[#005596]/90 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
                <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#005596]/30 rounded-full blur-3xl pointer-events-none" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-6 md:mb-8 text-sm font-medium transition-colors bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-xs w-fit"
                    >
                        <ArrowLeft size={16} /> {isId ? 'Semua Brand' : 'All Brands'}
                    </Link>

                    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        <div className="lg:col-span-7">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 border border-white/20 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-5 md:mb-6 text-white backdrop-blur-md shadow-xs">
                                <Image
                                    src="/images/flags/germany.svg"
                                    alt="Germany"
                                    width={18}
                                    height={12}
                                    className="w-4.5 h-3 rounded-[2px] object-cover shadow-xs border border-white/20 shrink-0"
                                />
                                <span>{isId ? 'Buatan Jerman, Sejak 1910' : 'Made in Germany, Est. 1910'}</span>
                            </div>
                            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-white leading-none tracking-tight mb-4">
                                SCHMALZ
                            </h1>
                            <p className="text-blue-100/90 text-base sm:text-lg max-w-xl leading-relaxed font-normal mb-8">
                                {isId
                                    ? 'Pemimpin global teknologi vakum industri asal Jerman. Direkayasa dengan presisi tinggi untuk otomasi siklus cepat, pengangkatan manual ergonomis, dan sistem cekam pabrik.'
                                    : 'A global leader in industrial vacuum technology. Engineered with German precision for high-cycle automation, ergonomic manual lifting, and intelligent factory clamping.'}
                            </p>

                            <div className="flex flex-wrap items-center gap-4">
                                <a
                                    href="#catalog"
                                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-[#005596] font-bold text-sm shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:bg-blue-50 transition-all hover:-translate-y-0.5"
                                >
                                    <span>{isId ? 'Jelajahi 6 Lini Produk' : 'Explore 6 Product Lines'}</span>
                                    <ArrowRight size={15} />
                                </a>
                                <a
                                    href="https://wa.me/6281119168752"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 backdrop-blur-md transition-all hover:-translate-y-0.5"
                                >
                                    <span>{isId ? 'Konsultasi dengan Engineer' : 'Consult an Engineer'}</span>
                                </a>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-white/15 max-w-lg">
                                <div>
                                    <div className="text-2xl sm:text-3xl font-extrabold text-white">6</div>
                                    <div className="text-[11px] font-semibold uppercase tracking-wider text-blue-200/80 mt-0.5">
                                        {isId ? 'Kategori Utama' : 'Product Lines'}
                                    </div>
                                </div>
                                <div className="border-l border-white/15 pl-4">
                                    <div className="text-2xl sm:text-3xl font-extrabold text-white">70+</div>
                                    <div className="text-[11px] font-semibold uppercase tracking-wider text-blue-200/80 mt-0.5">
                                        {isId ? 'Negara Pengguna' : 'Countries'}
                                    </div>
                                </div>
                                <div className="border-l border-white/15 pl-4">
                                    <div className="text-2xl sm:text-3xl font-extrabold text-white">100%</div>
                                    <div className="text-[11px] font-semibold uppercase tracking-wider text-blue-200/80 mt-0.5">
                                        {isId ? 'Standar Jerman' : 'German Quality'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-5 relative flex items-center justify-center">
                            <div className="absolute inset-0 bg-radial from-[#005596]/50 via-[#005596]/15 to-transparent rounded-full blur-2xl pointer-events-none" />

                            <div className="relative w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.5)]">
                                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                                    <Image
                                        src="/brands/schmalz-white.webp"
                                        alt="Schmalz Official Logo"
                                        width={110}
                                        height={46}
                                        className="object-contain h-6 sm:h-7 w-auto"
                                    />
                                    <span className="text-[10px] font-bold text-blue-200 uppercase tracking-widest bg-white/10 px-2.5 py-1 rounded-full border border-white/15">
                                        {isId ? 'Distributor Resmi' : 'Authorized Partner'}
                                    </span>
                                </div>

                                <div className="relative h-64 sm:h-72 w-full flex items-center justify-center py-2">
                                    <Image
                                        src="/brands/schmalz-jumboflex.webp"
                                        alt="Schmalz JumboFlex Vacuum Tube Lifter"
                                        width={320}
                                        height={480}
                                        className="h-full w-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)] hover:scale-105 transition-transform duration-500"
                                        priority
                                    />
                                </div>

                                <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs">
                                    <div>
                                        <p className="font-bold text-white tracking-tight">JumboFlex Series</p>
                                        <p className="text-[11px] text-blue-200/80">
                                            {isId ? 'Kontrol Ergonomis Satu Tangan' : 'Ergonomic One-Hand Control'}
                                        </p>
                                    </div>
                                    <span className="px-2.5 py-1 rounded-full bg-white/10 text-white font-mono font-bold text-[10px] uppercase tracking-wider border border-white/20 backdrop-blur-md">
                                        AGR Certified
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRODUCT GRID */}
            <section id="catalog" className="py-14 md:py-20 bg-slate-50/70 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center gap-2 mb-8 md:mb-10">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 text-slate-600 text-xs font-semibold shadow-xs">
                            <Filter size={14} className="text-[#005596]" />
                            <span>
                                {isId
                                    ? `Menampilkan ${schmalzProducts.length} kategori produk utama`
                                    : `Showing ${schmalzProducts.length} featured products`}
                            </span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {schmalzProducts.map((rawProduct) => {
                            const product = localizeProduct(rawProduct, lang);
                            return (
                                <Link
                                    key={product.slug}
                                    href={`/products/schmalz/${product.slug}`}
                                    className="group bg-white/80 backdrop-blur-xl rounded-3xl border border-white/90 ring-1 ring-slate-900/5 overflow-hidden hover:shadow-[0_24px_50px_-12px_rgba(0,85,150,0.18)] hover:border-[#005596]/35 hover:ring-[#005596]/20 hover:-translate-y-1.5 transition-all duration-300 flex flex-col shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)]"
                                >
                                    <div className={`h-52 sm:h-56 bg-gradient-to-br ${product.heroColor} relative overflow-hidden`}>
                                        {product.imageUrl ? (
                                            <Image
                                                src={product.imageUrl}
                                                alt={product.name}
                                                fill
                                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                            />
                                        ) : (
                                            <div
                                                className="absolute inset-0 opacity-20"
                                                style={{
                                                    backgroundImage:
                                                        'radial-gradient(circle at 30% 50%, white 1px, transparent 1px)',
                                                    backgroundSize: '20px 20px',
                                                }}
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-slate-950/40 pointer-events-none" />

                                        <div className="absolute top-3.5 left-3.5">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wide bg-white/90 backdrop-blur-md text-[#005596] shadow-sm ring-1 ring-white/50">
                                                {product.category}
                                            </span>
                                        </div>
                                        <div className="absolute top-3.5 right-3.5">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white bg-[#005596] shadow-sm backdrop-blur-md">
                                                {product.capacity}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6 sm:p-7 flex flex-col flex-1">
                                        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-1.5 group-hover:text-[#005596] transition-colors leading-tight tracking-tight">
                                            {product.name}
                                        </h3>
                                        <p className="text-[#005596] text-xs sm:text-sm font-semibold leading-relaxed mb-3">
                                            {product.tagline}
                                        </p>
                                        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                                            {product.description}
                                        </p>

                                        <div className="grid grid-cols-2 divide-x divide-slate-200/80 py-2.5 px-3.5 rounded-xl bg-slate-50/90 border border-slate-100 mb-6">
                                            {product.specs.slice(0, 2).map((spec, sIdx) => (
                                                <div key={spec.label} className={sIdx === 0 ? 'pr-3' : 'pl-3'}>
                                                    <p className="text-slate-400 text-[10px] uppercase tracking-wider font-semibold">
                                                        {spec.label}
                                                    </p>
                                                    <p className="text-slate-800 text-xs font-bold mt-0.5 leading-snug">
                                                        {spec.value}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="w-full py-3 px-4 rounded-xl bg-[#005596]/10 text-[#005596] font-bold text-sm text-center flex items-center justify-center gap-2 group-hover:bg-[#005596] group-hover:text-white transition-all duration-300 ring-1 ring-[#005596]/15 group-hover:ring-transparent">
                                            <span>{isId ? 'Lihat Spesifikasi & Varian' : 'View Specifications'}</span>
                                            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* VIDEO DEMO SECTION */}
            <ProductVideoGrid videos={[videos[0], videos[1], videos[3]]} brand="schmalz" />

            {/* PRE-FOOTER CTA */}
            <PreFooterCTA />
        </>
    );
}

/* ─── 3. /products/binar Catalog View ─── */
export function BinarCatalogView() {
    const { lang } = useLanguage();
    const isId = lang === 'id';

    const liftArms = binarProducts.filter((p) => p.category === 'Lift Arm');
    const grippers = binarProducts.filter((p) => p.category === 'Gripper');

    return (
        <>
            {/* HERO */}
            <section className="relative pt-28 md:pt-36 pb-16 md:pb-24 bg-gradient-to-br from-slate-950 via-zinc-950 to-red-950/80 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
                <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/25 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 text-zinc-300 hover:text-white mb-6 md:mb-8 text-sm font-medium transition-colors bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-xs w-fit"
                    >
                        <ArrowLeft size={16} /> {isId ? 'Semua Brand' : 'All Brands'}
                    </Link>

                    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        <div className="lg:col-span-7">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 border border-white/20 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-5 md:mb-6 text-white backdrop-blur-md shadow-xs">
                                <Image
                                    src="/images/flags/sweden.svg"
                                    alt="Sweden"
                                    width={18}
                                    height={12}
                                    className="w-4.5 h-3 rounded-[2px] object-cover shadow-xs border border-white/20 shrink-0"
                                />
                                <span>{isId ? 'Buatan Swedia, Sejak 1976' : 'Made in Sweden, Est. 1976'}</span>
                            </div>
                            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-white leading-none tracking-tight mb-4">
                                BINAR
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400">
                                    HANDLING
                                </span>
                            </h1>
                            <p className="text-zinc-300 text-base sm:text-lg max-w-xl leading-relaxed font-normal mb-8">
                                {isId
                                    ? 'Pemimpin teknologi global dalam sistem Intelligent Lift Arm asal Swedia. Menghadirkan presisi motor servo ultra-ringan yang menetapkan tolok ukur baru untuk ergonomi dan keselamatan perakitan industri.'
                                    : 'A global technology leader in intelligent lift arms, delivering ultra-light servo precision that sets a new benchmark for industrial ergonomics and safety.'}
                            </p>

                            <div className="flex flex-wrap items-center gap-4">
                                <a
                                    href="#catalog"
                                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-red-600 font-bold text-sm shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:bg-red-50 transition-all hover:-translate-y-0.5"
                                >
                                    <span>
                                        {isId
                                            ? `Jelajahi ${binarProducts.length} Model Produk`
                                            : `Explore ${binarProducts.length} Products`}
                                    </span>
                                    <ArrowRight size={15} />
                                </a>
                                <a
                                    href="https://wa.me/6281119168752"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 backdrop-blur-md transition-all hover:-translate-y-0.5"
                                >
                                    <span>{isId ? 'Konsultasi dengan Engineer' : 'Consult an Engineer'}</span>
                                </a>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-white/15 max-w-lg">
                                <div>
                                    <div className="text-2xl sm:text-3xl font-extrabold text-white">
                                        {binarProducts.length}
                                    </div>
                                    <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mt-0.5">
                                        {isId ? 'Model Produk' : 'Product Models'}
                                    </div>
                                </div>
                                <div className="border-l border-white/15 pl-4">
                                    <div className="text-2xl sm:text-3xl font-extrabold text-red-400">8000+</div>
                                    <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mt-0.5">
                                        {isId ? 'Gripdon Terpasang' : 'Gripdons Delivered'}
                                    </div>
                                </div>
                                <div className="border-l border-white/15 pl-4">
                                    <div className="text-2xl sm:text-3xl font-extrabold text-white">100%</div>
                                    <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mt-0.5">
                                        {isId ? 'Kualitas Swedia' : 'Swedish Quality'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-5 relative flex items-center justify-center">
                            <div className="absolute inset-0 bg-radial from-red-600/40 via-red-600/15 to-transparent rounded-full blur-2xl pointer-events-none" />

                            <div className="relative w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.5)]">
                                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                                    <Image
                                        src="/brands/binar-white.webp"
                                        alt="Binar Handling Official Logo"
                                        width={110}
                                        height={65}
                                        className="object-contain h-7 sm:h-8 w-auto"
                                    />
                                    <span className="text-[10px] font-bold text-red-300 uppercase tracking-widest bg-white/10 px-2.5 py-1 rounded-full border border-white/15">
                                        {isId ? 'Distributor Resmi' : 'Authorized Partner'}
                                    </span>
                                </div>

                                <div className="relative h-64 sm:h-72 w-full flex items-center justify-center py-2">
                                    <Image
                                        src="/brands/binar-manipulator-arm.webp"
                                        alt="Binar Handling Quick-Lift Arm Manipulator"
                                        width={360}
                                        height={480}
                                        className="h-full w-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)] hover:scale-105 transition-transform duration-500"
                                        priority
                                    />
                                </div>

                                <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs">
                                    <div>
                                        <p className="font-bold text-white tracking-tight">Quick-Lift Series (QLA / QLD)</p>
                                        <p className="text-[11px] text-zinc-300/80">
                                            {isId ? 'Sistem Pengangkat Servo Cerdas' : 'Intelligent Servo-Assisted Lifting'}
                                        </p>
                                    </div>
                                    <span className="px-2.5 py-1 rounded-lg bg-red-500/20 text-red-300 font-bold text-[10px] uppercase tracking-wider border border-red-500/30">
                                        Patented Servo
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* LIFT ARMS */}
            <section id="catalog" className="pt-14 md:pt-20 pb-10 bg-slate-50/70 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center gap-3 mb-8 md:mb-10">
                        <div className="h-1.5 w-8 bg-red-600 rounded-full" />
                        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 uppercase tracking-tight">
                            Intelligent Lift Arms
                        </h2>
                        <div className="ml-auto inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 text-slate-600 text-xs font-semibold shadow-xs">
                            <Filter size={13} className="text-red-600" />
                            <span>
                                {liftArms.length} {isId ? 'model' : 'products'}
                            </span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
                        {liftArms.map((rawProduct) => {
                            const product = localizeProduct(rawProduct, lang);
                            return (
                                <Link
                                    key={product.slug}
                                    href={`/products/binar/${product.slug}`}
                                    className="group bg-white/80 backdrop-blur-xl rounded-3xl border border-white/90 ring-1 ring-slate-900/5 overflow-hidden hover:shadow-[0_24px_50px_-12px_rgba(220,38,38,0.18)] hover:border-red-500/35 hover:ring-red-500/20 hover:-translate-y-1.5 transition-all duration-300 flex flex-col shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)]"
                                >
                                    <div className={`h-52 sm:h-56 bg-gradient-to-br ${product.heroColor} relative overflow-hidden`}>
                                        {product.imageUrl ? (
                                            <Image
                                                src={product.imageUrl}
                                                alt={product.name}
                                                fill
                                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                            />
                                        ) : (
                                            <div
                                                className="absolute inset-0 opacity-20"
                                                style={{
                                                    backgroundImage:
                                                        'radial-gradient(circle at 70% 50%, white 1px, transparent 1px)',
                                                    backgroundSize: '20px 20px',
                                                }}
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-slate-950/40 pointer-events-none" />

                                        <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wide bg-white/90 backdrop-blur-md text-red-600 shadow-sm ring-1 ring-white/50">
                                                {product.category}
                                            </span>
                                            <span className="bg-slate-950/70 backdrop-blur-md rounded-full px-2.5 py-0.5 text-white/90 text-[10px] font-mono border border-white/10 shadow-xs">
                                                {product.modelCode}
                                            </span>
                                        </div>
                                        <div className="absolute top-3.5 right-3.5">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white bg-red-600 shadow-sm backdrop-blur-md">
                                                {product.capacity}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6 sm:p-7 flex flex-col flex-1">
                                        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-1.5 group-hover:text-red-600 transition-colors leading-tight tracking-tight">
                                            {product.name}
                                        </h3>
                                        <p className="text-red-600 text-xs sm:text-sm font-semibold leading-relaxed mb-3">
                                            {product.tagline}
                                        </p>
                                        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                                            {product.description}
                                        </p>

                                        <div className="grid grid-cols-2 divide-x divide-slate-200/80 py-2.5 px-3.5 rounded-xl bg-slate-50/90 border border-slate-100 mb-6">
                                            {product.specs.slice(0, 2).map((spec, sIdx) => (
                                                <div key={spec.label} className={sIdx === 0 ? 'pr-3' : 'pl-3'}>
                                                    <p className="text-slate-400 text-[10px] uppercase tracking-wider font-semibold">
                                                        {spec.label}
                                                    </p>
                                                    <p className="text-slate-800 text-xs font-bold mt-0.5 leading-snug">
                                                        {spec.value}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="w-full py-3 px-4 rounded-xl bg-red-500/10 text-red-600 font-bold text-sm text-center flex items-center justify-center gap-2 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 ring-1 ring-red-500/15 group-hover:ring-transparent">
                                            <span>{isId ? 'Lihat Spesifikasi' : 'View Specifications'}</span>
                                            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* GRIPPERS */}
                    <div className="flex items-center gap-3 mb-8 md:mb-10">
                        <div className="h-1.5 w-8 bg-rose-600 rounded-full" />
                        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 uppercase tracking-tight">
                            Gripdons / End Effectors
                        </h2>
                        <div className="ml-auto inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 text-slate-600 text-xs font-semibold shadow-xs">
                            <Filter size={13} className="text-rose-600" />
                            <span>
                                {grippers.length} {isId ? 'model' : 'products'}
                            </span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-6">
                        {grippers.map((rawProduct) => {
                            const product = localizeProduct(rawProduct, lang);
                            return (
                                <Link
                                    key={product.slug}
                                    href={`/products/binar/${product.slug}`}
                                    className="group bg-white/80 backdrop-blur-xl rounded-3xl border border-white/90 ring-1 ring-slate-900/5 overflow-hidden hover:shadow-[0_20px_45px_-12px_rgba(220,38,38,0.15)] hover:border-rose-400 hover:ring-rose-400/20 hover:-translate-y-1.5 transition-all duration-300 flex flex-col shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]"
                                >
                                    <div className={`h-40 sm:h-44 bg-gradient-to-br ${product.heroColor} relative overflow-hidden`}>
                                        {product.imageUrl ? (
                                            <Image
                                                src={product.imageUrl}
                                                alt={product.name}
                                                fill
                                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                                            />
                                        ) : (
                                            <div
                                                className="absolute inset-0 opacity-20"
                                                style={{
                                                    backgroundImage:
                                                        'radial-gradient(circle at 50% 50%, white 1px, transparent 1px)',
                                                    backgroundSize: '15px 15px',
                                                }}
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-slate-950/40 pointer-events-none" />

                                        <div className="absolute top-3 left-3">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide bg-white/90 backdrop-blur-md text-rose-700 shadow-sm ring-1 ring-white/50">
                                                {product.category}
                                            </span>
                                        </div>
                                        <div className="absolute top-3 right-3">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold text-white bg-rose-600 shadow-sm backdrop-blur-md">
                                                {product.capacity}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-5 sm:p-6 flex flex-col flex-1">
                                        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1 group-hover:text-rose-600 transition-colors leading-tight tracking-tight">
                                            {product.name}
                                        </h3>
                                        <p className="text-rose-600 text-xs font-semibold leading-snug mb-3 line-clamp-1">
                                            {product.tagline}
                                        </p>
                                        <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-5 flex-1">
                                            {product.description}
                                        </p>
                                        <div className="w-full py-2.5 px-3 rounded-xl bg-rose-500/10 text-rose-700 font-bold text-xs text-center flex items-center justify-center gap-1.5 group-hover:bg-rose-600 group-hover:text-white transition-all ring-1 ring-rose-500/15 group-hover:ring-transparent mt-auto">
                                            <span>{isId ? 'Lihat Detail' : 'View Details'}</span>
                                            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* VIDEO DEMO SECTION */}
            <ProductVideoGrid
                videos={[
                    videos.find((v) => v.id === 'k6plgvsJOn0'),
                    videos.find((v) => v.id === 'NP26W7Op55Q'),
                    videos.find((v) => v.id === 'ir6TccqPuyY'),
                ].filter((v): v is (typeof videos)[0] => Boolean(v))}
                brand="binar"
            />

            {/* PRE-FOOTER CTA */}
            <PreFooterCTA theme="red" />
        </>
    );
}

/* ─── 4. /products/schmalz/[slug] Detail View ─── */
export function SchmalzProductDetailView({ rawProduct }: { rawProduct: Product }) {
    const { lang } = useLanguage();
    const isId = lang === 'id';
    const product = localizeProduct(rawProduct, lang);

    return (
        <>
            <section className="relative pt-32 pb-20 min-h-[520px] lg:min-h-[580px] flex items-center bg-slate-950 overflow-hidden">
                {product.imageUrl && (
                    <div className="absolute inset-0 pointer-events-none">
                        <Image
                            src={product.imageUrl}
                            alt={`${product.name} in industrial operation`}
                            fill
                            priority
                            className="object-cover object-right md:object-center opacity-40 lg:opacity-55 scale-[1.02] transition-transform duration-1000"
                            sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/30" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/70" />
                        <div className="absolute top-1/3 left-1/4 w-[500px] h-[360px] bg-[#005596]/30 rounded-full blur-[160px]" aria-hidden="true" />
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_20%_50%,#000_70%,transparent_100%)]" />
                    </div>
                )}

                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
                    <div className="mb-8">
                        <Breadcrumbs
                            items={[
                                { label: 'Products', href: '/products' },
                                { label: 'Schmalz', href: '/products/schmalz' },
                                { label: product.name, href: `/products/schmalz/${product.slug}` },
                            ]}
                        />
                    </div>

                    <div className="max-w-2xl lg:max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-blue-200 text-xs font-mono font-bold uppercase tracking-widest mb-6 shadow-sm">
                            <Layers size={12} className="text-blue-300" />
                            <span>
                                {product.category} | {isId ? 'Distributor Resmi Schmalz Indonesia' : 'Official Schmalz Indonesia'}
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.08] tracking-tight mb-4 drop-shadow-sm">
                            {product.name}
                        </h1>
                        <div className="h-1.5 w-20 bg-gradient-to-r from-[#005596] to-sky-400 rounded-full mb-6" />

                        <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal mb-8 max-w-2xl drop-shadow-xs">
                            {product.tagline}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 mb-10">
                            <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white font-mono text-xs font-bold backdrop-blur-md">
                                {isId ? 'Kapasitas Payload:' : 'Capacity:'} {product.capacity}
                            </span>
                            <span className="px-4 py-2 rounded-full bg-[#005596]/90 border border-blue-400/30 text-white font-mono text-xs font-bold backdrop-blur-md">
                                DIN / German Engineering
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTENT */}
            <section className="relative py-16 sm:py-20 bg-slate-50/70 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="rounded-2xl sm:rounded-3xl border border-white/95 bg-white/85 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] ring-1 ring-[#005596]/12 backdrop-blur-2xl p-6 sm:p-8">
                                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-3">
                                    {isId ? 'Deskripsi Teknis Produk' : 'Product Description'}
                                </h2>
                                <div className="h-1 w-12 bg-gradient-to-r from-[#005596] to-sky-400 rounded-full mb-6" />
                                <p className="text-slate-600 leading-relaxed text-base font-normal">{product.description}</p>
                            </div>

                            <div className="rounded-2xl sm:rounded-3xl border border-white/95 bg-white/85 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] ring-1 ring-[#005596]/12 backdrop-blur-2xl p-6 sm:p-8">
                                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-3">
                                    {isId ? 'Spesifikasi Teknis' : 'Technical Specifications'}
                                </h2>
                                <div className="h-1 w-12 bg-gradient-to-r from-[#005596] to-sky-400 rounded-full mb-6" />
                                <div className="divide-y divide-slate-100">
                                    {product.specs.map((spec, i) => (
                                        <div key={i} className="flex items-center justify-between py-3.5">
                                            <span className="text-slate-500 text-xs font-mono uppercase tracking-wider">
                                                {spec.label}
                                            </span>
                                            <span className="text-slate-900 text-sm font-bold text-right max-w-xs">
                                                {spec.value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-2xl sm:rounded-3xl border border-white/95 bg-white/85 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] ring-1 ring-[#005596]/12 backdrop-blur-2xl p-6 sm:p-8">
                                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-3">
                                    {isId ? 'Fitur Utama' : 'Key Features'}
                                </h2>
                                <div className="h-1 w-12 bg-gradient-to-r from-[#005596] to-sky-400 rounded-full mb-6" />
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {product.features.map((feat, i) => (
                                        <div
                                            key={i}
                                            className="flex items-start gap-3 p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/60"
                                        >
                                            <CheckCircle className="w-5 h-5 text-[#005596] shrink-0 mt-0.5" />
                                            <span className="text-slate-700 text-sm leading-relaxed">{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-2xl sm:rounded-3xl border border-white/95 bg-white/85 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] ring-1 ring-[#005596]/12 backdrop-blur-2xl p-6 sm:p-8">
                                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-3">
                                    {isId ? 'Aplikasi Industri' : 'Applications'}
                                </h2>
                                <div className="h-1 w-12 bg-gradient-to-r from-[#005596] to-sky-400 rounded-full mb-6" />
                                <div className="flex flex-wrap gap-2.5">
                                    {product.applications.map((app, i) => (
                                        <span
                                            key={i}
                                            className="px-4 py-2 bg-white border border-slate-200/90 rounded-full text-slate-700 text-xs font-mono font-bold shadow-2xs"
                                        >
                                            {app}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#002244] via-[#003b6d] to-[#005596] p-6 text-white shadow-xl border border-white/10 ring-1 ring-white/10 relative overflow-hidden">
                                <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#005596]/30 rounded-full blur-2xl pointer-events-none" />
                                <div className="text-[10px] font-mono font-bold uppercase tracking-widest mb-1 text-blue-200">
                                    {isId ? 'Kapasitas Payload' : 'Payload Capacity'}
                                </div>
                                <div className="text-3xl font-black font-mono">{product.capacity}</div>
                                <div className="mt-3 text-xs text-blue-100/80 font-medium">
                                    Schmalz | German Precision Engineering
                                </div>
                            </div>

                            <div className="rounded-2xl sm:rounded-3xl border border-white/95 bg-white/85 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] ring-1 ring-[#005596]/12 backdrop-blur-2xl p-6 sticky top-24">
                                <h3 className="text-lg font-black text-slate-900 mb-1">
                                    {isId ? 'Butuh Konsultasi Spesifikasi?' : 'Need Technical Guidance?'}
                                </h3>
                                <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                                    {isId
                                        ? 'Diskusikan target throughput operasional dan karakteristik benda kerja Anda bersama tim aplikasi engineering kami.'
                                        : 'Discuss your operational throughput and handling criteria with our certified engineering specialists.'}
                                </p>

                                <div className="flex flex-col gap-3">
                                    <a
                                        href="https://wa.me/6281119168752"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 w-full bg-[#005596] hover:bg-[#004276] text-white font-bold py-3.5 rounded-full transition-all shadow-md shadow-[#005596]/20 hover:-translate-y-0.5 text-sm"
                                    >
                                        <Phone size={16} /> Chat WhatsApp
                                    </a>
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center justify-center gap-2 w-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 font-bold py-3.5 rounded-full transition-all shadow-2xs hover:shadow-xs text-sm"
                                    >
                                        <Mail size={16} /> {isId ? 'Minta Penawaran Resmi' : 'Request Official Quote'}
                                    </Link>
                                </div>

                                <div className="mt-6 pt-6 border-t border-slate-100">
                                    <div className="text-[10px] font-mono text-slate-400 font-bold mb-3 uppercase tracking-wider">
                                        {isId ? 'Lini Produk Schmalz Lainnya' : 'Explore Product Lineup'}
                                    </div>
                                    <div className="space-y-1.5">
                                        {schmalzProducts
                                            .filter((p) => p.slug !== product.slug)
                                            .slice(0, 3)
                                            .map((p) => (
                                                <Link
                                                    key={p.slug}
                                                    href={`/products/schmalz/${p.slug}`}
                                                    className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-[#005596]/5 transition-colors group"
                                                >
                                                    <span className="text-slate-700 text-xs font-medium group-hover:text-[#005596]">
                                                        {p.name}
                                                    </span>
                                                    <ChevronRight
                                                        size={12}
                                                        className="text-slate-400 group-hover:text-[#005596] transition-transform group-hover:translate-x-0.5"
                                                    />
                                                </Link>
                                            ))}
                                        <Link
                                            href="/products/schmalz"
                                            className="flex items-center gap-2 py-2 px-3 text-[#005596] text-xs font-bold hover:bg-[#005596]/5 rounded-xl transition-colors mt-2"
                                        >
                                            <span>{isId ? 'Lihat semua produk Schmalz' : 'View all Schmalz products'}</span>
                                            <ArrowLeft size={12} className="rotate-180" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

/* ─── 5. /products/binar/[slug] Detail View ─── */
export function BinarProductDetailView({ rawProduct }: { rawProduct: BinarProduct }) {
    const { lang } = useLanguage();
    const isId = lang === 'id';
    const product = localizeProduct(rawProduct, lang);

    return (
        <>
            <section className="relative pt-32 pb-16 bg-slate-950 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[350px] bg-red-600/20 rounded-full blur-[150px] pointer-events-none" aria-hidden="true" />
                <div className="absolute bottom-10 right-1/4 w-[400px] h-[250px] bg-rose-500/15 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent" />

                <div className="relative max-w-7xl mx-auto px-6">
                    <div className="mb-8">
                        <Breadcrumbs
                            items={[
                                { label: 'Products', href: '/products' },
                                { label: 'Binar Handling', href: '/products/binar' },
                                { label: product.name, href: `/products/binar/${product.slug}` },
                            ]}
                        />
                    </div>

                    <div className="max-w-3xl">
                        <div className="flex items-center gap-2.5 flex-wrap mb-4">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-red-200 text-xs font-mono font-bold uppercase tracking-widest shadow-sm">
                                <Cpu size={12} className="text-red-400" />
                                <span>
                                    {product.modelCode} · {product.category}
                                </span>
                            </div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-white/15 backdrop-blur-md text-white border border-white/20">
                                <Image
                                    src="/images/flags/sweden.svg"
                                    alt="Sweden"
                                    width={14}
                                    height={9}
                                    className="w-3.5 h-2.5 rounded-[1px] object-cover shrink-0"
                                />
                                <span>{isId ? 'Buatan Swedia' : 'Made in Sweden'}</span>
                            </div>
                        </div>

                        <h1 className="text-4xl sm:text-6xl font-black text-white leading-[1.08] tracking-tight mb-4 drop-shadow-sm">
                            {product.name}
                        </h1>
                        <div className="h-1.5 w-20 bg-gradient-to-r from-red-600 to-rose-400 rounded-full mb-6" />

                        <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal mb-8 max-w-2xl drop-shadow-xs">
                            {product.tagline}
                        </p>

                        <div className="flex flex-wrap items-center gap-3">
                            <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white font-mono text-xs font-bold backdrop-blur-md">
                                {isId ? 'Kapasitas Payload:' : 'Capacity:'} {product.capacity}
                            </span>
                            <span className="px-3.5 py-1.5 rounded-full bg-red-600/90 border border-red-400/30 text-white font-mono text-xs font-bold backdrop-blur-md">
                                Model: {product.modelCode}
                            </span>
                            <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-slate-300 font-mono text-xs font-bold backdrop-blur-md">
                                Intelligent Servo Assist
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTENT */}
            <section className="relative py-16 sm:py-20 bg-slate-50/70 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
                        <div className="lg:col-span-2 space-y-8">
                            {product.imageUrl && (
                                <div className="rounded-2xl sm:rounded-3xl border border-white/95 bg-white/85 shadow-[0_16px_40px_-10px_rgba(220,38,38,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] ring-1 ring-red-600/12 backdrop-blur-2xl overflow-hidden p-3 transition-all duration-300 hover:shadow-[0_20px_48px_-10px_rgba(220,38,38,0.14)]">
                                    <div className="relative w-full h-72 sm:h-96 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100">
                                        <Image
                                            src={product.imageUrl}
                                            alt={product.name}
                                            fill
                                            className="object-cover transition-transform duration-700 hover:scale-105"
                                            sizes="(max-width: 1024px) 100vw, 66vw"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="rounded-2xl sm:rounded-3xl border border-white/95 bg-white/85 shadow-[0_16px_40px_-10px_rgba(220,38,38,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] ring-1 ring-red-600/12 backdrop-blur-2xl p-6 sm:p-8">
                                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-3">
                                    {isId ? 'Deskripsi Teknis Produk' : 'Product Description'}
                                </h2>
                                <div className="h-1 w-12 bg-gradient-to-r from-red-600 to-rose-400 rounded-full mb-6" />
                                <p className="text-slate-600 leading-relaxed text-base font-normal">{product.description}</p>

                                <div className="mt-6 flex items-start gap-3.5 p-4 sm:p-5 bg-gradient-to-r from-red-600/8 via-rose-500/5 to-transparent rounded-2xl border border-red-600/20">
                                    <Cpu className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                                    <div>
                                        <div className="text-xs font-mono font-bold text-red-600 uppercase tracking-wider mb-1">
                                            Ultra-Light Servo Assist
                                        </div>
                                        <div className="text-slate-800 text-sm font-semibold leading-relaxed">
                                            {product.tagline}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl sm:rounded-3xl border border-white/95 bg-white/85 shadow-[0_16px_40px_-10px_rgba(220,38,38,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] ring-1 ring-red-600/12 backdrop-blur-2xl p-6 sm:p-8">
                                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-3">
                                    {isId ? 'Spesifikasi Teknis' : 'Technical Specifications'}
                                </h2>
                                <div className="h-1 w-12 bg-gradient-to-r from-red-600 to-rose-400 rounded-full mb-6" />
                                <div className="divide-y divide-slate-100/80">
                                    {product.specs.map((spec, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center justify-between py-3.5 transition-colors hover:bg-slate-50/50 px-2 rounded-lg"
                                        >
                                            <span className="text-slate-500 text-xs font-mono uppercase tracking-wider">
                                                {spec.label}
                                            </span>
                                            <span className="text-slate-900 text-sm font-bold font-mono text-right max-w-xs">
                                                {spec.value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-2xl sm:rounded-3xl border border-white/95 bg-white/85 shadow-[0_16px_40px_-10px_rgba(220,38,38,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] ring-1 ring-red-600/12 backdrop-blur-2xl p-6 sm:p-8">
                                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-3">
                                    {isId ? 'Fitur Utama' : 'Key Features'}
                                </h2>
                                <div className="h-1 w-12 bg-gradient-to-r from-red-600 to-rose-400 rounded-full mb-6" />
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {product.features.map((feat, i) => (
                                        <div
                                            key={i}
                                            className="flex items-start gap-3 p-3.5 bg-slate-50/80 hover:bg-white rounded-2xl border border-slate-200/60 hover:border-red-600/30 hover:shadow-xs transition-all duration-300"
                                        >
                                            <CheckCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                                            <span className="text-slate-700 text-sm leading-relaxed">{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-2xl sm:rounded-3xl border border-white/95 bg-white/85 shadow-[0_16px_40px_-10px_rgba(220,38,38,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] ring-1 ring-red-600/12 backdrop-blur-2xl p-6 sm:p-8">
                                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-3">
                                    {isId ? 'Aplikasi Industri' : 'Applications'}
                                </h2>
                                <div className="h-1 w-12 bg-gradient-to-r from-red-600 to-rose-400 rounded-full mb-6" />
                                <div className="flex flex-wrap gap-2.5">
                                    {product.applications.map((app, i) => (
                                        <span
                                            key={i}
                                            className="px-4 py-2 bg-white border border-slate-200/90 rounded-full text-slate-700 text-xs font-mono font-bold shadow-2xs hover:border-red-600/40 hover:text-red-600 transition-all"
                                        >
                                            {app}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-950 via-zinc-950 to-red-950/90 p-6 text-white shadow-xl border border-white/10 ring-1 ring-white/10 relative overflow-hidden">
                                <div className="absolute -top-12 -right-12 w-32 h-32 bg-red-600/25 rounded-full blur-2xl pointer-events-none" />
                                <div className="text-[10px] font-mono font-bold uppercase tracking-widest mb-1 text-red-300">
                                    {isId ? 'Kapasitas Payload' : 'Payload Capacity'}
                                </div>
                                <div className="text-3xl font-black font-mono">{product.capacity}</div>
                                <div className="mt-2 text-xs font-mono text-zinc-300/80">
                                    {product.modelCode} · {product.category}
                                </div>
                                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border border-white/20">
                                    <Image
                                        src="/images/flags/sweden.svg"
                                        alt="Sweden"
                                        width={14}
                                        height={9}
                                        className="w-3.5 h-2.5 rounded-[1px] object-cover shrink-0"
                                    />
                                    <span>{isId ? 'Buatan Swedia' : 'Made in Sweden'}</span>
                                </div>
                            </div>

                            <div className="rounded-2xl sm:rounded-3xl border border-white/95 bg-white/85 shadow-[0_16px_40px_-10px_rgba(220,38,38,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] ring-1 ring-red-600/12 backdrop-blur-2xl p-6 sticky top-24">
                                <h3 className="text-lg font-black text-slate-900 mb-1">
                                    {isId ? 'Butuh Konsultasi Teknis?' : 'Need Technical Guidance?'}
                                </h3>
                                <p className="text-slate-500 text-sm mb-6 leading-relaxed font-normal">
                                    {isId
                                        ? 'Tim engineer kami siap memetakan alur kerja stasiun perakitan Anda dan merekomendasikan konfigurasi lengan Binar yang tepat.'
                                        : 'Our engineers are ready to map your workflow and recommend the right intelligent lift system.'}
                                </p>

                                <div className="flex flex-col gap-3">
                                    <a
                                        href={`https://wa.me/6281119168752?text=Hello%2C+I+am+interested+in+${encodeURIComponent(product.name)}.`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-full transition-all shadow-[0_4px_16px_rgba(220,38,38,0.25)] hover:shadow-[0_8px_24px_rgba(220,38,38,0.35)] hover:-translate-y-0.5 text-sm"
                                    >
                                        <Phone size={16} /> Chat WhatsApp
                                    </a>
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center justify-center gap-2 w-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 font-bold py-3.5 rounded-full transition-all shadow-2xs hover:shadow-xs hover:-translate-y-0.5 text-sm"
                                    >
                                        <Mail size={16} /> {isId ? 'Minta Penawaran Resmi' : 'Request Official Quote'}
                                    </Link>
                                </div>

                                <div className="mt-6 pt-6 border-t border-slate-100">
                                    <div className="text-[10px] font-mono text-slate-400 font-bold mb-3 uppercase tracking-wider">
                                        {isId ? 'Sistem Binar Lainnya' : 'Other Binar Systems'}
                                    </div>
                                    <div className="space-y-1.5">
                                        {binarProducts
                                            .filter((p) => p.slug !== product.slug)
                                            .slice(0, 4)
                                            .map((p) => (
                                                <Link
                                                    key={p.slug}
                                                    href={`/products/binar/${p.slug}`}
                                                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50/80 transition-all border border-transparent hover:border-slate-200/60 group/item"
                                                >
                                                    <div>
                                                        <div className="text-xs font-mono font-bold text-slate-900 group-hover/item:text-red-600 transition-colors">
                                                            {p.modelCode}
                                                        </div>
                                                        <div className="text-[10px] text-slate-500 font-mono">
                                                            {p.capacity}
                                                        </div>
                                                    </div>
                                                    <ChevronRight
                                                        size={14}
                                                        className="text-slate-400 group-hover/item:text-red-600 group-hover/item:translate-x-0.5 transition-all"
                                                    />
                                                </Link>
                                            ))}
                                        <Link
                                            href="/products/binar"
                                            className="flex items-center gap-1.5 pt-2 text-xs font-mono font-bold text-red-600 hover:text-red-700 transition-colors"
                                        >
                                            <span>{isId ? 'Lihat semua sistem Binar' : 'View all Binar systems'}</span>
                                            <ChevronRight size={12} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
