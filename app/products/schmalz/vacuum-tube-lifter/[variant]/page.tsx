import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ArrowLeft, CheckCircle, Phone, Mail, ChevronRight, Zap, AlertTriangle } from 'lucide-react';
import { vacuumTubeLifterVariants } from '../../../../../data/products/vacuum-tube-lifters';

interface Props {
    params: Promise<{ variant: string }>;
}

export async function generateStaticParams() {
    return vacuumTubeLifterVariants.map(v => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { variant: slug } = await params;
    const variant = vacuumTubeLifterVariants.find(v => v.slug === slug);
    if (!variant) return { title: 'Variant Not Found' };
    return {
        title: `${variant.name} | Vacuum Tube Lifter Schmalz — PT Dimensi Quantum Wahyudi`,
        description: variant.description.slice(0, 160),
    };
}

export default async function VTLVariantDetailPage({ params }: Props) {
    const { variant: slug } = await params;
    const variant = vacuumTubeLifterVariants.find(v => v.slug === slug);

    if (!variant) notFound();

    const isAtex = variant.badge === 'ATEX';
    const isFoodGrade = variant.badge === 'Food Grade' || variant.badge === 'IP69K';
    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: variant.name,
        description: variant.description,
        sku: variant.slug,
        mpn: variant.seriesCode,
        category: 'Vacuum Tube Lifter',
        url: `https://dimensiwahyudi.com/products/schmalz/vacuum-tube-lifter/${variant.slug}`,
        image: variant.imageUrl ? [variant.imageUrl] : undefined,
        brand: { '@type': 'Brand', name: 'Schmalz' },
        offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            priceCurrency: 'IDR',
            seller: { '@type': 'Organization', name: 'PT Dimensi Quantum Wahyudi' },
            areaServed: 'ID',
        },
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dimensiwahyudi.com/' },
            { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://dimensiwahyudi.com/products' },
            { '@type': 'ListItem', position: 3, name: 'Schmalz', item: 'https://dimensiwahyudi.com/products/schmalz' },
            { '@type': 'ListItem', position: 4, name: 'Vacuum Tube Lifters', item: 'https://dimensiwahyudi.com/products/schmalz/vacuum-tube-lifter' },
            { '@type': 'ListItem', position: 5, name: variant.name, item: `https://dimensiwahyudi.com/products/schmalz/vacuum-tube-lifter/${variant.slug}` },
        ],
    };

    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            {/* HERO */}
            <section className="relative pt-28 pb-14 bg-slate-950 overflow-hidden">
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'linear-gradient(rgba(99,179,237,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,0.3) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
                <div className={`absolute inset-0 bg-gradient-to-br ${variant.heroColor} opacity-20`} />

                <div className="relative max-w-7xl mx-auto px-6">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-slate-500 text-xs mb-8 flex-wrap">
                        <Link href="/products" className="hover:text-blue-400 transition-colors">Products</Link>
                        <ChevronRight size={12} />
                        <Link href="/products/schmalz" className="hover:text-blue-400 transition-colors">Schmalz</Link>
                        <ChevronRight size={12} />
                        <Link href="/products/schmalz/vacuum-tube-lifter" className="hover:text-blue-400 transition-colors">Vacuum Tube Lifters</Link>
                        <ChevronRight size={12} />
                        <span className="text-slate-300">{variant.seriesCode}</span>
                    </nav>

                    <div className="flex items-start gap-4 mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${variant.heroColor} shadow-lg shrink-0`}>
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 flex-wrap mb-3">
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest">
                                    Vacuum Tube Lifter
                                </div>
                                {variant.badge && (
                                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${isAtex ? 'bg-orange-500 text-white' : 'bg-teal-500 text-white'}`}>
                                        {isAtex && <AlertTriangle size={10} />}
                                        {variant.badge}
                                    </div>
                                )}
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight">
                                {variant.name}
                            </h1>
                        </div>
                    </div>
                    <p className="text-blue-400 font-bold text-lg max-w-2xl">
                        {variant.tagline}
                    </p>
                </div>
            </section>

            {/* CONTENT */}
            <section className="py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-3 gap-10">

                        {/* LEFT */}
                        <div className="lg:col-span-2 space-y-10">

                            {/* Product Image — 📷 Tampil otomatis setelah imageUrl diisi di vacuum-tube-lifters.ts */}
                            {variant.imageUrl && (
                                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                                    <Image
                                        src={variant.imageUrl}
                                        alt={variant.name}
                                        width={1280}
                                        height={576}
                                        className="w-full h-72 object-cover"
                                        sizes="(max-width: 1024px) 100vw, 66vw"
                                    />
                                </div>
                            )}

                            {/* Description */}
                            <div className="bg-white rounded-2xl border border-slate-200 p-8">
                                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-4">Product Description</h2>
                                <div className="h-1 w-12 bg-blue-600 rounded-full mb-6" />
                                <p className="text-slate-600 leading-relaxed text-base">{variant.description}</p>

                                {/* Highlight callout */}
                                <div className="mt-6 flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                                    <Zap className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                    <div>
                                        <div className="text-xs font-black text-blue-700 uppercase tracking-wider mb-1">Primary Advantage</div>
                                        <div className="text-slate-700 text-sm font-semibold">{variant.highlight}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Specs */}
                            <div className="bg-white rounded-2xl border border-slate-200 p-8">
                                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-4">Technical Specifications</h2>
                                <div className="h-1 w-12 bg-blue-600 rounded-full mb-6" />
                                <div className="divide-y divide-slate-100">
                                    {variant.specs.map((spec, i) => (
                                        <div key={i} className="flex items-center justify-between py-3.5">
                                            <span className="text-slate-500 text-sm font-medium">{spec.label}</span>
                                            <span className="text-slate-900 text-sm font-bold text-right max-w-xs">{spec.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Features */}
                            <div className="bg-white rounded-2xl border border-slate-200 p-8">
                                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-4">Key Features</h2>
                                <div className="h-1 w-12 bg-blue-600 rounded-full mb-6" />
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {variant.features.map((feat, i) => (
                                        <div key={i} className="flex items-start gap-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                                            <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                            <span className="text-slate-700 text-sm leading-relaxed">{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Applications */}
                            <div className="bg-white rounded-2xl border border-slate-200 p-8">
                                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-4">Applications</h2>
                                <div className="h-1 w-12 bg-blue-600 rounded-full mb-6" />
                                <div className="flex flex-wrap gap-3">
                                    {variant.applications.map((app, i) => (
                                        <span key={i} className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-700 text-sm font-medium">
                                            {app}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT — Sticky sidebar */}
                        <div className="space-y-6">
                            {/* Capacity card */}
                            <div className={`rounded-2xl bg-gradient-to-br ${variant.heroColor} p-6 text-white shadow-lg`}>
                                <div className="text-xs font-bold uppercase tracking-widest mb-1 opacity-70">Capacity</div>
                                <div className="text-3xl font-black">{variant.capacity}</div>
                                <div className="mt-2 text-xs font-mono opacity-70">{variant.seriesCode}</div>
                                {variant.badge && (
                                    <div className="mt-3 inline-flex items-center gap-1 px-2 py-1 bg-white/20 rounded-md text-[10px] font-black uppercase">
                                        {variant.badge} ✓
                                    </div>
                                )}
                            </div>

                            {/* CTA */}
                            <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-24">
                                <h3 className="text-lg font-black text-slate-900 mb-1">Need Technical Guidance?</h3>
                                <p className="text-slate-500 text-sm mb-6">Discuss your workflow goals with our engineers for a precise recommendation.</p>

                                <div className="flex flex-col gap-3">
                                    <a href="https://wa.me/6281119168752" target="_blank" rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-green-600/20">
                                        <Phone size={17} /> Chat on WhatsApp
                                    </a>
                                    <Link href="/contact"
                                        className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-blue-600/20">
                                        <Mail size={17} /> Request a Quote
                                    </Link>
                                </div>

                                {/* Related variants */}
                                <div className="mt-6 pt-6 border-t border-slate-100">
                                    <div className="text-xs text-slate-400 font-medium mb-3 uppercase tracking-wider">Other Vacuum Tube Lifter Variants</div>
                                    <div className="space-y-1">
                                        {vacuumTubeLifterVariants
                                            .filter(v => v.slug !== slug)
                                            .slice(0, 4)
                                            .map(v => (
                                                <Link
                                                    key={v.slug}
                                                    href={`/products/schmalz/vacuum-tube-lifter/${v.slug}`}
                                                    className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors group/sub"
                                                >
                                                    <div>
                                                        <div className="text-slate-700 text-xs font-bold group-hover/sub:text-blue-700">{v.seriesCode}</div>
                                                        <div className="text-slate-400 text-[10px]">{v.capacity}</div>
                                                    </div>
                                                    <ChevronRight size={12} className="text-slate-400" />
                                                </Link>
                                            ))}
                                        <Link href="/products/schmalz/vacuum-tube-lifter"
                                            className="flex items-center gap-1.5 py-2 px-3 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                            <ArrowLeft size={12} className="rotate-180" /> All variants ({vacuumTubeLifterVariants.length})
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
