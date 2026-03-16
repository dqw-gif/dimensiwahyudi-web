import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ArrowLeft, CheckCircle, Phone, Mail, ChevronRight, Zap } from 'lucide-react';
import { schmalzProducts } from '../../../../data/products/schmalz';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return schmalzProducts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const product = schmalzProducts.find(p => p.slug === slug);
    if (!product) return { title: 'Product Not Found' };
    const title = `${product.name} | Schmalz — PT Dimensi Quantum Wahyudi`;
    const description = product.description.slice(0, 160);
    const url = `https://dimensiwahyudi.com/products/schmalz/${slug}`;
    return {
        title,
        description,
        keywords: [
            product.name,
            product.category,
            'Schmalz',
            'PT Dimensi Quantum Wahyudi',
            'Vacuum Lifter Indonesia',
            'Industrial Lifting Equipment',
            'Material Handling Indonesia',
        ],
        alternates: { canonical: url },
        openGraph: {
            title,
            description,
            url,
            type: 'website',
            locale: 'en_ID',
            siteName: 'PT Dimensi Quantum Wahyudi',
        },
    };
}

export default async function SchmalzProductDetail({ params }: Props) {
    const { slug } = await params;
    const product = schmalzProducts.find(p => p.slug === slug);

    if (!product) notFound();

    // JSON-LD: Product schema for rich search results
    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product!.name,
        description: product!.description,
        sku: product!.slug,
        category: product!.category,
        url: `https://dimensiwahyudi.com/products/schmalz/${product!.slug}`,
        image: product!.imageUrl ? [product!.imageUrl] : undefined,
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
            { '@type': 'ListItem', position: 4, name: product.name, item: `https://dimensiwahyudi.com/products/schmalz/${product.slug}` },
        ],
    };

    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            {/* BREADCRUMB + HERO */}
            <section className="relative pt-28 pb-16 bg-slate-950 overflow-hidden">
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'linear-gradient(rgba(99,179,237,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,0.3) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
                <div className={`absolute inset-0 bg-gradient-to-br ${product.heroColor} opacity-20`} />

                <div className="relative max-w-7xl mx-auto px-6">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-slate-500 text-xs mb-8">
                        <Link href="/products" className="hover:text-blue-400 transition-colors">Products</Link>
                        <ChevronRight size={12} />
                        <Link href="/products/schmalz" className="hover:text-blue-400 transition-colors">Schmalz</Link>
                        <ChevronRight size={12} />
                        <span className="text-slate-300">{product.name}</span>
                    </nav>

                    <div className="flex items-start gap-6 mb-6">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${product.heroColor} shadow-lg`}>
                            <Zap className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">
                                {product.category}
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight">
                                {product.name}
                            </h1>
                        </div>
                    </div>
                    <p className="text-blue-400 font-bold text-lg max-w-2xl">
                        {product.tagline}
                    </p>
                </div>
            </section>

            {/* CONTENT */}
            <section className="py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-3 gap-10">

                        {/* LEFT — Main Content */}
                        <div className="lg:col-span-2 space-y-10">

                            {/* Product image shown automatically when imageUrl is provided in schmalz.ts */}
                            {product.imageUrl && (
                                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-full h-72 object-cover"
                                        loading="lazy"
                                    />
                                </div>
                            )}

                            {/* Description */}
                            <div className="bg-white rounded-2xl border border-slate-200 p-8">
                                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-4">Product Description</h2>
                                <div className="h-1 w-12 bg-blue-600 rounded-full mb-6" />
                                <p className="text-slate-600 leading-relaxed text-base">{product.description}</p>
                            </div>

                            {/* Specs Table */}
                            <div className="bg-white rounded-2xl border border-slate-200 p-8">
                                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-4">Technical Specifications</h2>
                                <div className="h-1 w-12 bg-blue-600 rounded-full mb-6" />
                                <div className="divide-y divide-slate-100">
                                    {product.specs.map((spec, i) => (
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
                                    {product.features.map((feat, i) => (
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
                                    {product.applications.map((app, i) => (
                                        <span key={i} className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-700 text-sm font-medium">
                                            {app}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT — Sticky CTA */}
                        <div className="space-y-6">
                            {/* Capacity Badge */}
                            <div className={`rounded-2xl bg-gradient-to-br ${product.heroColor} p-6 text-white shadow-lg`}>
                                <div className="text-xs font-bold uppercase tracking-widest mb-1 opacity-70">Capacity</div>
                                <div className="text-3xl font-black">{product.capacity}</div>
                                <div className="mt-3 text-xs opacity-70 font-medium">Schmalz — German Engineering</div>
                            </div>

                            {/* CTA Card */}
                            <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-24">
                                <h3 className="text-lg font-black text-slate-900 mb-1">Need Technical Guidance?</h3>
                                <p className="text-slate-500 text-sm mb-6">Discuss your operational goals with our engineers and get a precise recommendation.</p>

                                <div className="flex flex-col gap-3">
                                    <a
                                        href="https://wa.me/6281119168752"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-green-600/20"
                                    >
                                        <Phone size={17} /> Speak on WhatsApp
                                    </a>
                                    <Link
                                        href="/contact"
                                        className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-blue-600/20"
                                    >
                                        <Mail size={17} /> Request a Quote
                                    </Link>
                                </div>

                                <div className="mt-6 pt-6 border-t border-slate-100">
                                    <div className="text-xs text-slate-400 font-medium mb-3 uppercase tracking-wider">More Products</div>
                                    <div className="space-y-2">
                                        {schmalzProducts
                                            .filter(p => p.slug !== slug)
                                            .slice(0, 3)
                                            .map(p => (
                                                <Link
                                                    key={p.slug}
                                                    href={`/products/schmalz/${p.slug}`}
                                                    className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors group"
                                                >
                                                    <span className="text-slate-700 text-xs font-medium group-hover:text-blue-700">{p.name}</span>
                                                    <ChevronRight size={12} className="text-slate-400 group-hover:text-blue-600" />
                                                </Link>
                                            ))}
                                        <Link href="/products/schmalz" className="flex items-center gap-2 py-2 px-3 text-blue-600 text-xs font-bold hover:bg-blue-50 rounded-lg transition-colors">
                                            View all Schmalz products <ArrowLeft size={12} className="rotate-180" />
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
