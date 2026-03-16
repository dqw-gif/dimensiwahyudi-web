import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, Globe, Award, Zap } from 'lucide-react';
import { BRANDS, schmalzProducts, binarProducts } from '../../data/products';

export const metadata: Metadata = {
    title: 'Products | PT Dimensi Quantum Wahyudi — Official Schmalz & Binar Handling Distributor',
    description: 'Explore premium vacuum lifters, ergonomic lift arms, and gripping solutions from Schmalz (Germany) and Binar Handling (Sweden), officially distributed by PT Dimensi Quantum Wahyudi in Indonesia.',
    keywords: [
        'vacuum lifter indonesia',
        'schmalz indonesia distributor',
        'binar handling indonesia distributor',
        'ergonomic lifting solutions indonesia',
        'industrial material handling indonesia',
        'pt dimensi quantum wahyudi',
    ],
    openGraph: {
        title: 'Products | Official Schmalz & Binar Handling Distributor in Indonesia',
        description: 'Explore premium industrial lifting and vacuum handling products from Schmalz and Binar Handling, officially distributed by PT Dimensi Quantum Wahyudi.',
        url: 'https://dimensiwahyudi.com/products',
        siteName: 'PT Dimensi Quantum Wahyudi',
        locale: 'en_ID',
        type: 'website',
    },
    alternates: { canonical: 'https://dimensiwahyudi.com/products' },
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

export default async function ProductsPage() {
    const copy = {
        heroBadge: 'Authorized Distributor in Indonesia',
        heroKicker: 'Official Distributor',
        heroTitleA: 'LIFTING SOLUTIONS &',
        heroTitleB: 'VACUUM LIFTERS.',
        heroDesc:
            'PT Dimensi Quantum Wahyudi is the official distributor of Schmalz from Germany and Binar Handling from Sweden, two global leaders in ergonomic and vacuum handling technology.',
        plusMore: 'more',
        featuredProducts: 'featured products',
        catalogCta: 'View Product Catalog',
        bottomTitle: 'Need Technical Guidance?',
        bottomDesc: 'Our engineers are ready to help you select the right solution for your operation.',
        whatsapp: 'Chat on WhatsApp',
        about: 'About Us',
    };

    const productsFaqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: 'Do you serve only customers in Indonesia?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes. PT Dimensi Quantum Wahyudi focuses on industrial customers across Indonesia with local engineering support and implementation services.',
                },
            },
            {
                '@type': 'Question',
                name: 'Are Schmalz and Binar products officially distributed by your company?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes. We are the official distributor for Schmalz and Binar Handling in Indonesia, including technical consultation, installation support, and after-sales service.',
                },
            },
            {
                '@type': 'Question',
                name: 'Can I request a product trial before purchasing?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes. Our engineering team can arrange a technical assessment and product trial to validate fit, ergonomics, and operational performance before full deployment.',
                },
            },
        ],
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://dimensiwahyudi.com/',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Products',
                item: 'https://dimensiwahyudi.com/products',
            },
        ],
    };

    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productsFaqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

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
                        {copy.heroBadge}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight mb-6">
                        <span className="block text-xl md:text-2xl font-bold text-slate-600 mb-2 uppercase tracking-widest">{copy.heroKicker}</span>
                        {copy.heroTitleA}
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                            {copy.heroTitleB}
                        </span>
                    </h1>
                    <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        {copy.heroDesc}
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
                                            +{productCount - 4} {copy.plusMore}
                                        </span>
                                    </div>

                                    {/* CTA */}
                                    <div className="flex items-center justify-between">
                                        <div className={`flex items-center gap-2 text-sm ${countCls}`}>
                                            <Award size={14} />
                                            <span>{productCount} {copy.featuredProducts}</span>
                                        </div>
                                        <div className={`flex items-center gap-2 font-bold text-sm group-hover:gap-4 transition-all ${ctaCls}`}>
                                            {copy.catalogCta} {brand.name}
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
                    <h2 className="text-3xl font-black text-slate-900 mb-4">{copy.bottomTitle}</h2>
                    <p className="text-slate-500 mb-8">{copy.bottomDesc}</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://wa.me/6281119168752"
                            target="_blank"
                            className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all"
                        >
                            {copy.whatsapp}
                        </a>
                        <Link href="/contact" className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition-all">
                            {copy.about}
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
