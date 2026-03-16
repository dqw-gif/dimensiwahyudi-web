import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { CheckCircle, Phone, Mail, ChevronRight, Shield } from 'lucide-react';
import { vacuumGeneratorVariants } from '../../../../../data/products/vacuum-generators';

interface Props { params: Promise<{ variant: string }> }

export async function generateStaticParams() {
    return vacuumGeneratorVariants.map(v => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { variant: slug } = await params;
    const v = vacuumGeneratorVariants.find(x => x.slug === slug);
    if (!v) return { title: 'Not Found' };
    return {
        title: `${v.name} | Vacuum Generator Schmalz — PT Dimensi Quantum Wahyudi`,
        description: v.description.slice(0, 160),
    };
}

const badgeColors: Record<string, string> = {
    'High Flow': 'bg-teal-600 text-white',
    'Smart': 'bg-violet-600 text-white',
    'Electric': 'bg-amber-500 text-white',
};

export default async function VacuumGeneratorVariantPage({ params }: Props) {
    const { variant: slug } = await params;
    const variant = vacuumGeneratorVariants.find(v => v.slug === slug);
    if (!variant) notFound();

    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: variant.name,
        description: variant.description,
        sku: variant.slug,
        mpn: variant.seriesCode,
        category: 'Vacuum Generator',
        url: `https://dimensiwahyudi.com/products/schmalz/vacuum-generator/${variant.slug}`,
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
            { '@type': 'ListItem', position: 4, name: 'Vacuum Generator', item: 'https://dimensiwahyudi.com/products/schmalz/vacuum-generator' },
            { '@type': 'ListItem', position: 5, name: variant.name, item: `https://dimensiwahyudi.com/products/schmalz/vacuum-generator/${variant.slug}` },
        ],
    };

    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <section className="relative pt-28 pb-14 bg-slate-950 overflow-hidden">
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'linear-gradient(rgba(37,99,235,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.4) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
                <div className={`absolute inset-0 bg-gradient-to-br ${variant.heroColor} opacity-20`} />
                <div className="relative max-w-7xl mx-auto px-6">
                    <nav className="flex items-center gap-2 text-slate-500 text-xs mb-8 flex-wrap">
                        <Link href="/products" className="hover:text-blue-400 transition-colors">Products</Link>
                        <ChevronRight size={12} />
                        <Link href="/products/schmalz" className="hover:text-blue-400 transition-colors">Schmalz</Link>
                        <ChevronRight size={12} />
                        <Link href="/products/schmalz/vacuum-generator" className="hover:text-blue-400 transition-colors">Vacuum Generators</Link>
                        <ChevronRight size={12} />
                        <span className="text-slate-300">{variant.seriesCode}</span>
                    </nav>
                    <div className="flex items-center gap-2 flex-wrap mb-3">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest">
                            Schmalz Vacuum Components
                        </div>
                        {variant.badge && (
                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${badgeColors[variant.badge] || 'bg-white/20 text-white'}`}>
                                {variant.badge}
                            </div>
                        )}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight mb-3">{variant.name}</h1>
                    <p className="text-blue-400 font-bold text-lg max-w-2xl">{variant.tagline}</p>
                </div>
            </section>

            <section className="py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-3 gap-10">
                        <div className="lg:col-span-2 space-y-8">
                            {variant.imageUrl && (
                                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                                    <img src={variant.imageUrl} alt={variant.name} className="w-full h-72 object-cover" loading="lazy" />
                                </div>
                            )}
                            <div className="bg-white rounded-2xl border border-slate-200 p-8">
                                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-4">Product Description</h2>
                                <div className="h-1 w-12 bg-blue-500 rounded-full mb-6" />
                                <p className="text-slate-600 leading-relaxed">{variant.description}</p>
                                <div className="mt-6 flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                                    <Shield className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                    <div>
                                        <div className="text-xs font-black text-blue-700 uppercase tracking-wider mb-1">Primary Advantage</div>
                                        <div className="text-slate-700 text-sm font-semibold">{variant.highlight}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl border border-slate-200 p-8">
                                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-4">Technical Specifications</h2>
                                <div className="h-1 w-12 bg-blue-500 rounded-full mb-6" />
                                <div className="divide-y divide-slate-100">
                                    {variant.specs.map((s, i) => (
                                        <div key={i} className="flex items-center justify-between py-3.5">
                                            <span className="text-slate-500 text-sm font-medium">{s.label}</span>
                                            <span className="text-slate-900 text-sm font-bold text-right max-w-xs">{s.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl border border-slate-200 p-8">
                                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-4">Key Features</h2>
                                <div className="h-1 w-12 bg-blue-500 rounded-full mb-6" />
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {variant.features.map((f, i) => (
                                        <div key={i} className="flex items-start gap-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                                            <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                            <span className="text-slate-700 text-sm leading-relaxed">{f}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl border border-slate-200 p-8">
                                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-4">Applications</h2>
                                <div className="h-1 w-12 bg-blue-500 rounded-full mb-6" />
                                <div className="flex flex-wrap gap-3">
                                    {variant.applications.map((a, i) => (
                                        <span key={i} className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-700 text-sm font-medium">{a}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className={`rounded-2xl bg-gradient-to-br ${variant.heroColor} p-6 text-white shadow-lg`}>
                                <div className="text-xs font-bold uppercase tracking-widest mb-1 opacity-70">Suction Rate</div>
                                <div className="text-3xl font-black">{variant.capacity}</div>
                                <div className="mt-2 text-xs font-mono opacity-70">{variant.seriesCode}</div>
                            </div>
                            <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-24">
                                <h3 className="text-lg font-black text-slate-900 mb-1">Need Technical Guidance?</h3>
                                <p className="text-slate-500 text-sm mb-6">Discuss your vacuum system goals with our engineers for a precise recommendation.</p>
                                <div className="flex flex-col gap-3">
                                    <a href="https://wa.me/6281119168752" target="_blank" rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3.5 rounded-xl transition-colors">
                                        <Phone size={17} /> Chat on WhatsApp
                                    </a>
                                    <Link href="/contact"
                                        className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition-colors">
                                        <Mail size={17} /> Request a Quote
                                    </Link>
                                </div>
                                <div className="mt-6 pt-6 border-t border-slate-100">
                                    <div className="text-xs text-slate-400 font-medium mb-3 uppercase tracking-wider">Other Vacuum Generator Variants</div>
                                    {vacuumGeneratorVariants.filter(v => v.slug !== slug).map(v => (
                                        <Link key={v.slug} href={`/products/schmalz/vacuum-generator/${v.slug}`}
                                            className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors group/s">
                                            <div>
                                                <div className="text-slate-700 text-xs font-bold group-hover/s:text-blue-700">{v.seriesCode}</div>
                                                <div className="text-slate-400 text-[10px]">{v.capacity}</div>
                                            </div>
                                            <ChevronRight size={12} className="text-slate-400" />
                                        </Link>
                                    ))}
                                    <Link href="/products/schmalz/vacuum-generator"
                                        className="flex items-center gap-1.5 py-2 px-3 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors mt-1">
                                        View all variants ({vacuumGeneratorVariants.length})
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
