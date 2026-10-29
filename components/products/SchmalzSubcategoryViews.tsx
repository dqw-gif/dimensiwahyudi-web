'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle,
    Phone,
    Mail,
    ChevronRight,
    Layers,
    AlertTriangle,
    Droplets,
    Wind,
    Shield,
    Leaf,
} from 'lucide-react';
import { useLanguage } from '../LanguageProvider';
import { localizeProduct } from '../../data/products/translations_id';
import Breadcrumbs from '../Breadcrumbs';
import ProductMatrix from '../ProductMatrix';

const badgeIcons: Record<string, React.ReactNode> = {
    ATEX: <AlertTriangle size={10} />,
    'Food Grade': <Droplets size={10} />,
    IP69K: <Wind size={10} />,
    'No Power': <Shield size={10} />,
    Glass: <Wind size={10} />,
    Wood: <Leaf size={10} />,
    Coil: <Droplets size={10} />,
};

const badgeColors: Record<string, string> = {
    ATEX: 'bg-amber-600/90 text-white border border-amber-500/40',
    'Food Grade': 'bg-teal-700/90 text-white border border-teal-600/40',
    IP69K: 'bg-slate-700/90 text-white border border-slate-600/40',
    'No Power': 'bg-emerald-700/90 text-white border border-emerald-600/40',
    Glass: 'bg-blue-600/90 text-white border border-blue-500/40',
    Wood: 'bg-amber-600/90 text-white border border-amber-500/40',
    Coil: 'bg-slate-700/90 text-white border border-slate-600/40',
    'Heavy Duty': 'bg-slate-700/90 text-white border border-slate-500/40',
    CSA: 'bg-[#005596]/90 text-white border border-blue-400/40',
    Mobile: 'bg-cyan-600/90 text-white border border-cyan-400/40',
    'Forklift Mount': 'bg-amber-600/90 text-white border border-amber-400/40',
    Battery: 'bg-emerald-600/90 text-white border border-emerald-400/40',
    'High Flow': 'bg-teal-600/90 text-white border border-teal-400/40',
    Smart: 'bg-violet-600/90 text-white border border-violet-400/40',
    Electric: 'bg-amber-500/90 text-white border border-amber-400/40',
    'ESD Safe': 'bg-slate-800/90 text-white border border-slate-700/40',
    'High Temp': 'bg-rose-700/90 text-white border border-rose-600/40',
};

export interface SubcategoryConfig {
    basePath: string;
    breadcrumbLabel: string;
    heroImage: string;
    heroBadgeEn: string;
    heroBadgeId: string;
    titleLine1: string;
    titleLine2: string;
    descEn: string;
    descId: string;
    primaryCtaEn: string;
    primaryCtaId: string;
    secondaryCtaEn: string;
    secondaryCtaId: string;
    secondaryCtaHref: string;
    stats: { labelEn: string; labelId: string; value: string }[];
    gridHeaderEn: string;
    gridHeaderId: string;
    columns?: 2 | 3;
    showMatrix?: boolean;
    materialsPills?: string[];
    bottomCtaEn: string;
    bottomCtaId: string;
}

export interface GenericVariant {
    slug: string;
    name: string;
    seriesCode?: string;
    shape?: string;
    application?: string;
    tagline: string;
    description: string;
    capacity?: string;
    highlight?: string;
    badge?: string;
    badges?: string[];
    heroColor: string;
    specs: { label: string; value: string }[];
    features: string[];
    applications: string[];
    imageUrl: string;
}

export function SchmalzSubcategoryIndexView({
    config,
    variants,
}: {
    config: SubcategoryConfig;
    variants: GenericVariant[];
}) {
    const { lang } = useLanguage();
    const isId = lang === 'id';

    return (
        <>
            {/* HERO */}
            <section className="relative pt-32 pb-20 min-h-[580px] lg:min-h-[640px] flex items-center bg-slate-950 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <Image
                        src={config.heroImage}
                        alt={config.breadcrumbLabel}
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

                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
                    <div className="mb-8">
                        <Breadcrumbs
                            items={[
                                { label: 'Products', href: '/products' },
                                { label: 'Schmalz', href: '/products/schmalz' },
                                { label: config.breadcrumbLabel, href: config.basePath },
                            ]}
                        />
                    </div>

                    <div className="max-w-2xl lg:max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-blue-200 text-xs font-mono font-bold uppercase tracking-widest mb-6 shadow-sm">
                            <Layers size={12} className="text-blue-300" />
                            <span>{isId ? config.heroBadgeId : config.heroBadgeEn}</span>
                        </div>

                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.08] tracking-tight mb-4 drop-shadow-sm">
                            {config.titleLine1}{' '}
                            <span className="block bg-gradient-to-r from-blue-400 via-sky-300 to-blue-200 bg-clip-text text-transparent">
                                {config.titleLine2}
                            </span>
                        </h1>
                        <div className="h-1.5 w-20 bg-gradient-to-r from-[#005596] to-sky-400 rounded-full mb-6" />

                        <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal mb-8 max-w-2xl drop-shadow-xs">
                            {isId ? config.descId : config.descEn}
                        </p>

                        {config.materialsPills && (
                            <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-8">
                                {config.materialsPills.map((m) => (
                                    <span
                                        key={m}
                                        className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/15 rounded-full text-blue-200 text-xs font-mono font-bold tracking-wider"
                                    >
                                        {m}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="flex flex-wrap items-center gap-3 mb-12">
                            <a
                                href="https://wa.me/6281119168752"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#005596] hover:bg-[#004276] text-white text-xs sm:text-sm font-bold rounded-full shadow-[0_4px_16px_rgba(0,85,150,0.35)] hover:shadow-[0_8px_24px_rgba(0,85,150,0.45)] hover:-translate-y-0.5 transition-all"
                            >
                                <span>{isId ? config.primaryCtaId : config.primaryCtaEn}</span>
                                <ArrowRight size={14} />
                            </a>
                            <Link
                                href={config.secondaryCtaHref}
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-xs sm:text-sm font-bold text-white backdrop-blur-md transition-all"
                            >
                                <span>{isId ? config.secondaryCtaId : config.secondaryCtaEn}</span>
                            </Link>
                        </div>

                        <div className="pt-8 border-t border-white/15 grid grid-cols-3 gap-6 max-w-xl">
                            {config.stats.map((stat, i) => (
                                <div key={stat.labelEn} className={i > 0 ? 'border-l border-white/15 pl-5' : ''}>
                                    <div className="text-2xl sm:text-3xl font-black text-white font-mono">{stat.value}</div>
                                    <div className="text-[10px] sm:text-[11px] font-mono font-bold text-slate-300 uppercase tracking-widest mt-1">
                                        {isId ? stat.labelId : stat.labelEn}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* VARIANT GRID */}
            <section className="relative py-16 sm:py-20 bg-slate-50/70 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center gap-2 mb-10 text-xs font-mono font-bold uppercase tracking-widest text-slate-500">
                        <Layers size={14} className="text-[#005596]" />
                        <span>{isId ? config.gridHeaderId : config.gridHeaderEn}</span>
                    </div>

                    <div
                        className={`grid md:grid-cols-2 ${
                            config.columns === 2 ? 'max-w-5xl mx-auto' : 'lg:grid-cols-3'
                        } gap-6 sm:gap-8`}
                    >
                        {variants.map((rawVariant) => {
                            const variant = localizeProduct(rawVariant, lang);
                            const primaryBadge = variant.badge || (variant.badges && variant.badges[0]);

                            return (
                                <Link
                                    key={variant.slug}
                                    href={`${config.basePath}/${variant.slug}`}
                                    className="group relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-white/95 bg-white/85 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] ring-1 ring-[#005596]/12 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_-10px_rgba(0,85,150,0.14)] hover:ring-[#005596]/25"
                                >
                                    <div className={`h-48 sm:h-52 bg-gradient-to-br ${variant.heroColor} relative overflow-hidden`}>
                                        {variant.imageUrl ? (
                                            <Image
                                                src={variant.imageUrl}
                                                alt={variant.name}
                                                fill
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                            />
                                        ) : (
                                            <div
                                                className="absolute inset-0 opacity-25"
                                                style={{
                                                    backgroundImage:
                                                        'radial-gradient(circle at 30% 50%, white 1px, transparent 1px)',
                                                    backgroundSize: '18px 18px',
                                                }}
                                            />
                                        )}
                                    </div>

                                    <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                                        <div>
                                            <div className="flex items-start justify-between gap-2 mb-2">
                                                <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-[#005596] transition-colors leading-tight">
                                                    {variant.name}
                                                </h3>
                                                {primaryBadge ? (
                                                    <span
                                                        className={`shrink-0 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                                                            badgeColors[primaryBadge] || 'bg-[#005596]/10 text-[#005596]'
                                                        }`}
                                                    >
                                                        {badgeIcons[primaryBadge]}
                                                        {primaryBadge}
                                                    </span>
                                                ) : variant.shape ? (
                                                    <span className="shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#005596]/10 text-[#005596]">
                                                        {variant.shape}
                                                    </span>
                                                ) : null}
                                            </div>

                                            <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-5 font-normal">
                                                {variant.tagline}
                                            </p>
                                        </div>

                                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                                                    {variant.capacity
                                                        ? isId
                                                            ? 'Kapasitas Maks'
                                                            : 'Max Capacity'
                                                        : isId
                                                          ? 'Aplikasi Utama'
                                                          : 'Application'}
                                                </span>
                                                <span className="text-xs font-mono font-bold text-[#005596]">
                                                    {variant.capacity || variant.application || 'Universal'}
                                                </span>
                                            </div>
                                            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-50 group-hover:bg-[#005596] text-[#005596] group-hover:text-white border border-slate-200/90 group-hover:border-[#005596] text-xs font-bold transition-all duration-300 shadow-2xs group-hover:shadow-md">
                                                <span>{isId ? 'Detail Varian' : 'Variant Details'}</span>
                                                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {config.showMatrix && <ProductMatrix />}
                </div>
            </section>

            {/* BACK + CTA */}
            <section className="py-12 bg-white/70 border-t border-slate-200/70 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Link
                        href="/products/schmalz"
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-[#005596] font-medium text-sm transition-colors"
                    >
                        <ArrowLeft size={16} />{' '}
                        {isId ? 'Kembali ke Semua Produk Schmalz' : 'Back to All Schmalz Products'}
                    </Link>
                    <a
                        href="https://wa.me/6281119168752"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#005596] hover:bg-[#004276] text-white text-sm font-bold rounded-full shadow-[0_4px_16px_rgba(0,85,150,0.25)] hover:shadow-[0_8px_24px_rgba(0,85,150,0.35)] hover:-translate-y-0.5 transition-all"
                    >
                        <span>{isId ? config.bottomCtaId : config.bottomCtaEn}</span>
                        <ArrowRight size={14} />
                    </a>
                </div>
            </section>
        </>
    );
}

export function SchmalzVariantDetailView({
    rawVariant,
    allVariants,
    basePath,
    categoryLabel,
    originLabel = 'Made in Germany',
}: {
    rawVariant: GenericVariant;
    allVariants: GenericVariant[];
    basePath: string;
    categoryLabel: string;
    originLabel?: string;
}) {
    const { lang } = useLanguage();
    const isId = lang === 'id';
    const variant = localizeProduct(rawVariant, lang);

    const badgesList = variant.badges && variant.badges.length > 0 ? variant.badges : variant.badge ? [variant.badge] : [];

    return (
        <>
            {/* HERO */}
            <section className="relative pt-32 pb-16 bg-slate-950 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[350px] bg-[#005596]/25 rounded-full blur-[150px] pointer-events-none" aria-hidden="true" />
                <div className="absolute bottom-10 right-1/4 w-[400px] h-[250px] bg-blue-500/15 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

                <div className="relative max-w-7xl mx-auto px-6">
                    <div className="mb-8">
                        <Breadcrumbs
                            items={[
                                { label: 'Products', href: '/products' },
                                { label: 'Schmalz', href: '/products/schmalz' },
                                { label: categoryLabel, href: basePath },
                                { label: variant.name, href: `${basePath}/${variant.slug}` },
                            ]}
                        />
                    </div>

                    <div className="max-w-3xl">
                        <div className="flex items-center gap-2.5 flex-wrap mb-4">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-blue-200 text-xs font-mono font-bold uppercase tracking-widest shadow-sm">
                                <Layers size={12} className="text-blue-300" />
                                <span>{categoryLabel}</span>
                            </div>
                            {badgesList.map((b) => (
                                <div
                                    key={b}
                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
                                        badgeColors[b] || 'bg-white/20 text-white border border-white/20'
                                    }`}
                                >
                                    {badgeIcons[b]}
                                    <span>{b}</span>
                                </div>
                            ))}
                        </div>

                        <h1 className="text-4xl sm:text-6xl font-black text-white leading-[1.08] tracking-tight mb-4 drop-shadow-sm">
                            {variant.name}
                        </h1>
                        <div className="h-1.5 w-20 bg-gradient-to-r from-[#005596] to-sky-400 rounded-full mb-6" />

                        <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal mb-8 max-w-2xl drop-shadow-xs">
                            {variant.tagline}
                        </p>

                        <div className="flex flex-wrap items-center gap-3">
                            {variant.capacity ? (
                                <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white font-mono text-xs font-bold backdrop-blur-md">
                                    {isId ? 'Kapasitas Payload:' : 'Capacity:'} {variant.capacity}
                                </span>
                            ) : variant.shape ? (
                                <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white font-mono text-xs font-bold backdrop-blur-md">
                                    Shape: {variant.shape}
                                </span>
                            ) : null}

                            {variant.seriesCode ? (
                                <span className="px-3.5 py-1.5 rounded-full bg-[#005596]/90 border border-blue-400/30 text-white font-mono text-xs font-bold backdrop-blur-md">
                                    Series: {variant.seriesCode}
                                </span>
                            ) : variant.application ? (
                                <span className="px-3.5 py-1.5 rounded-full bg-[#005596]/90 border border-blue-400/30 text-white font-mono text-xs font-bold backdrop-blur-md">
                                    App: {variant.application}
                                </span>
                            ) : null}

                            <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-slate-300 font-mono text-xs font-bold backdrop-blur-md">
                                {originLabel}
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
                            {variant.imageUrl && (
                                <div className="rounded-2xl sm:rounded-3xl border border-white/95 bg-white/85 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] ring-1 ring-[#005596]/12 backdrop-blur-2xl overflow-hidden p-3 transition-all duration-300 hover:shadow-[0_20px_48px_-10px_rgba(0,85,150,0.14)]">
                                    <div className="relative w-full h-72 sm:h-96 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100">
                                        <Image
                                            src={variant.imageUrl}
                                            alt={variant.name}
                                            fill
                                            className="object-cover transition-transform duration-700 hover:scale-105"
                                            sizes="(max-width: 1024px) 100vw, 66vw"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="rounded-2xl sm:rounded-3xl border border-white/95 bg-white/85 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] ring-1 ring-[#005596]/12 backdrop-blur-2xl p-6 sm:p-8">
                                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-3">
                                    {isId ? 'Deskripsi Teknis Produk' : 'Product Description'}
                                </h2>
                                <div className="h-1 w-12 bg-gradient-to-r from-[#005596] to-sky-400 rounded-full mb-6" />
                                <p className="text-slate-600 leading-relaxed text-base font-normal">{variant.description}</p>

                                {variant.highlight && (
                                    <div className="mt-6 flex items-start gap-3.5 p-4 sm:p-5 bg-gradient-to-r from-[#005596]/8 via-sky-500/5 to-transparent rounded-2xl border border-[#005596]/20">
                                        <CheckCircle className="w-5 h-5 text-[#005596] shrink-0 mt-0.5" />
                                        <div>
                                            <div className="text-xs font-mono font-bold text-[#005596] uppercase tracking-wider mb-1">
                                                {isId ? 'Keunggulan Teknis Utama' : 'Primary Advantage'}
                                            </div>
                                            <div className="text-slate-800 text-sm font-semibold leading-relaxed">
                                                {variant.highlight}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="rounded-2xl sm:rounded-3xl border border-white/95 bg-white/85 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] ring-1 ring-[#005596]/12 backdrop-blur-2xl p-6 sm:p-8">
                                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-3">
                                    {isId ? 'Spesifikasi Teknis' : 'Technical Specifications'}
                                </h2>
                                <div className="h-1 w-12 bg-gradient-to-r from-[#005596] to-sky-400 rounded-full mb-6" />
                                <div className="divide-y divide-slate-100/80">
                                    {variant.specs.map((spec, i) => (
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

                            <div className="rounded-2xl sm:rounded-3xl border border-white/95 bg-white/85 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] ring-1 ring-[#005596]/12 backdrop-blur-2xl p-6 sm:p-8">
                                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-3">
                                    {isId ? 'Fitur Utama' : 'Key Features'}
                                </h2>
                                <div className="h-1 w-12 bg-gradient-to-r from-[#005596] to-sky-400 rounded-full mb-6" />
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {variant.features.map((feat, i) => (
                                        <div
                                            key={i}
                                            className="flex items-start gap-3 p-3.5 bg-slate-50/80 hover:bg-white rounded-2xl border border-slate-200/60 hover:border-[#005596]/30 hover:shadow-xs transition-all duration-300"
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
                                    {variant.applications.map((app, i) => (
                                        <span
                                            key={i}
                                            className="px-4 py-2 bg-white border border-slate-200/90 rounded-full text-slate-700 text-xs font-mono font-bold shadow-2xs hover:border-[#005596]/40 hover:text-[#005596] transition-all"
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
                                    {variant.capacity
                                        ? isId
                                            ? 'Kapasitas Payload'
                                            : 'Payload Capacity'
                                        : isId
                                          ? 'Geometri Cup'
                                          : 'Cup Geometry'}
                                </div>
                                <div className="text-3xl font-black font-mono">
                                    {variant.capacity || variant.shape || variant.name}
                                </div>
                                <div className="mt-2 text-xs font-mono text-blue-200/80">
                                    {variant.seriesCode || variant.application || categoryLabel}
                                </div>
                            </div>

                            <div className="rounded-2xl sm:rounded-3xl border border-white/95 bg-white/85 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] ring-1 ring-[#005596]/12 backdrop-blur-2xl p-6 sticky top-24">
                                <h3 className="text-lg font-black text-slate-900 mb-1">
                                    {isId ? 'Butuh Konsultasi Spesifikasi?' : 'Need Technical Guidance?'}
                                </h3>
                                <p className="text-slate-500 text-sm mb-6 leading-relaxed font-normal">
                                    {isId
                                        ? 'Diskusikan kebutuhan lini produksi Anda bersama tim engineer bersertifikat kami untuk rekomendasi unit yang presisi.'
                                        : 'Discuss your workflow goals with our certified engineers for a precise recommendation.'}
                                </p>

                                <div className="flex flex-col gap-3">
                                    <a
                                        href="https://wa.me/6281119168752"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 w-full bg-[#005596] hover:bg-[#004276] text-white font-bold py-3.5 rounded-full transition-all shadow-[0_4px_16px_rgba(0,85,150,0.25)] hover:shadow-[0_8px_24px_rgba(0,85,150,0.35)] hover:-translate-y-0.5 text-sm"
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
                                        {isId ? `Varian ${categoryLabel} Lainnya` : `Other ${categoryLabel}`}
                                    </div>
                                    <div className="space-y-1.5">
                                        {allVariants
                                            .filter((v) => v.slug !== variant.slug)
                                            .slice(0, 4)
                                            .map((v) => (
                                                <Link
                                                    key={v.slug}
                                                    href={`${basePath}/${v.slug}`}
                                                    className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-blue-50/50 border border-transparent hover:border-[#005596]/15 transition-all group/sub"
                                                >
                                                    <div>
                                                        <div className="text-slate-700 text-xs font-bold group-hover/sub:text-[#005596] transition-colors">
                                                            {v.seriesCode || v.name}
                                                        </div>
                                                        <div className="text-slate-400 font-mono text-[10px]">
                                                            {v.capacity || v.application}
                                                        </div>
                                                    </div>
                                                    <ChevronRight
                                                        size={13}
                                                        className="text-slate-400 group-hover/sub:text-[#005596] group-hover/sub:translate-x-0.5 transition-all"
                                                    />
                                                </Link>
                                            ))}
                                        <Link
                                            href={basePath}
                                            className="flex items-center gap-1.5 py-2 px-3 text-xs font-bold text-[#005596] hover:bg-blue-50/50 rounded-xl transition-colors mt-2"
                                        >
                                            <ArrowLeft size={12} />{' '}
                                            {isId
                                                ? `Semua varian (${allVariants.length})`
                                                : `All variants (${allVariants.length})`}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BACK + CTA BAR */}
            <section className="py-12 bg-white/70 border-t border-slate-200/70 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Link
                        href={basePath}
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-[#005596] font-medium text-sm transition-colors"
                    >
                        <ArrowLeft size={16} />{' '}
                        {isId ? `Kembali ke Lini ${categoryLabel}` : `Back to ${categoryLabel} Lineup`}
                    </Link>
                    <a
                        href="https://wa.me/6281119168752"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#005596] hover:bg-[#004276] text-white text-sm font-bold rounded-full shadow-[0_4px_16px_rgba(0,85,150,0.25)] hover:shadow-[0_8px_24px_rgba(0,85,150,0.35)] hover:-translate-y-0.5 transition-all"
                    >
                        <span>{isId ? 'Konsultasikan Konfigurasi Ini' : 'Consult This Configuration'}</span>
                        <ChevronRight size={14} />
                    </a>
                </div>
            </section>
        </>
    );
}
