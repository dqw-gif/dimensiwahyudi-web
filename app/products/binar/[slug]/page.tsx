import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ArrowLeft, CheckCircle, Phone, Mail, ChevronRight, Cpu } from 'lucide-react';
import { binarProducts } from '../../../../data/products/binar';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return binarProducts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const product = binarProducts.find(p => p.slug === slug);
    if (!product) return { title: 'Produk Tidak Ditemukan' };
    const title = `${product.name} (${product.modelCode}) | Binar Handling — PT Dimensi Quantum Wahyudi`;
    const description = product.description.slice(0, 160);
    const url = `https://dimensiwahyudi.com/products/binar/${slug}`;
    return {
        title,
        description,
        keywords: [product.name, product.modelCode, 'Binar Handling', 'PT Dimensi Quantum Wahyudi', 'Lift Arm Industri', 'Intelligent Lifting Sweden'],
        alternates: { canonical: url },
        openGraph: {
            title,
            description,
            url,
            type: 'website',
            locale: 'id_ID',
            siteName: 'PT Dimensi Quantum Wahyudi',
        },
    };
}

export default async function BinarProductDetail({ params }: Props) {
    const { slug } = await params;
    const product = binarProducts.find(p => p.slug === slug);
    if (!product) notFound();

    // JSON-LD: Product schema for rich search results
    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product!.name,
        description: product!.description,
        mpn: product!.modelCode,
        brand: { '@type': 'Brand', name: 'Binar Handling' },
        offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            seller: { '@type': 'Organization', name: 'PT Dimensi Quantum Wahyudi' },
            areaServed: 'ID',
            priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'IDR' },
        },
    };

    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />

            {/* HERO — black + red grid */}
            <section className="relative pt-28 pb-16 bg-black overflow-hidden">
                {/* Red grid overlay */}
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'linear-gradient(rgba(239,68,68,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.5) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
                {/* Red radial glow */}
                <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 60% at 30% 50%, rgba(220,38,38,0.18) 0%, transparent 70%)' }} />
                {/* Top red accent bar */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent" />

                <div className="relative max-w-7xl mx-auto px-6">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-zinc-500 text-xs mb-8">
                        <Link href="/products" className="hover:text-red-400 transition-colors">Produk</Link>
                        <ChevronRight size={12} />
                        <Link href="/products/binar" className="hover:text-red-400 transition-colors">Binar Handling</Link>
                        <ChevronRight size={12} />
                        <span className="text-zinc-300">{product.modelCode}</span>
                    </nav>

                    <div className="flex items-start gap-6 mb-4">
                        <div className="p-3 rounded-xl bg-red-600/20 border border-red-600/30 shadow-lg">
                            <Cpu className="w-6 h-6 text-red-400" />
                        </div>
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 border rounded-full text-xs font-bold uppercase tracking-widest mb-3 bg-red-500/10 border-red-500/20 text-red-400">
                                {product.modelCode} · {product.category}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
                                {product.name}
                            </h1>
                        </div>
                    </div>
                    <p className="font-bold text-lg max-w-2xl text-red-400">
                        {product.tagline}
                    </p>
                </div>
            </section>

            {/* CONTENT */}
            <section className="py-16 bg-zinc-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-3 gap-10">

                        {/* LEFT */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* Product Image */}
                            {product.imageUrl && (
                                <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-full h-72 object-cover"
                                        loading="lazy"
                                    />
                                </div>
                            )}

                            {/* Description */}
                            <div className="bg-white rounded-2xl border border-zinc-200 p-8">
                                <h2 className="text-xl font-black text-zinc-900 uppercase tracking-tight mb-4">Deskripsi Produk</h2>
                                <div className="h-1 w-12 bg-red-600 rounded-full mb-6" />
                                <p className="text-zinc-600 leading-relaxed text-base">{product.description}</p>
                            </div>

                            {/* Specs */}
                            <div className="bg-white rounded-2xl border border-zinc-200 p-8">
                                <h2 className="text-xl font-black text-zinc-900 uppercase tracking-tight mb-4">Spesifikasi Teknis</h2>
                                <div className="h-1 w-12 bg-red-600 rounded-full mb-6" />
                                <div className="divide-y divide-zinc-100">
                                    {product.specs.map((spec, i) => (
                                        <div key={i} className="flex items-center justify-between py-3.5">
                                            <span className="text-zinc-500 text-sm font-medium">{spec.label}</span>
                                            <span className="text-zinc-900 text-sm font-bold text-right max-w-xs">{spec.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Features */}
                            <div className="bg-white rounded-2xl border border-zinc-200 p-8">
                                <h2 className="text-xl font-black text-zinc-900 uppercase tracking-tight mb-4">Fitur Unggulan</h2>
                                <div className="h-1 w-12 bg-red-600 rounded-full mb-6" />
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {product.features.map((feat, i) => (
                                        <div key={i} className="flex items-start gap-3 p-3 rounded-xl border bg-red-50/40 border-red-100">
                                            <CheckCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
                                            <span className="text-zinc-700 text-sm leading-relaxed">{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Applications */}
                            <div className="bg-white rounded-2xl border border-zinc-200 p-8">
                                <h2 className="text-xl font-black text-zinc-900 uppercase tracking-tight mb-4">Aplikasi</h2>
                                <div className="h-1 w-12 bg-red-600 rounded-full mb-6" />
                                <div className="flex flex-wrap gap-3">
                                    {product.applications.map((app, i) => (
                                        <span key={i} className="px-4 py-2 bg-zinc-100 border border-zinc-200 rounded-xl text-zinc-700 text-sm font-medium">
                                            {app}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT — Sticky Sidebar */}
                        <div className="space-y-6">
                            {/* Model card — black + red */}
                            <div className="rounded-2xl bg-zinc-950 border border-red-900/40 p-6 text-white shadow-xl shadow-red-950/30">
                                <div className="text-xs font-bold uppercase tracking-widest mb-1 text-red-500/70">Model</div>
                                <div className="text-2xl font-black font-mono text-white">{product.modelCode}</div>
                                <div className="mt-3 text-xs text-zinc-400 font-medium">
                                    Kapasitas: <span className="font-black text-white text-base">{product.capacity}</span>
                                </div>
                                <div className="mt-2 text-xs text-zinc-600">Made in Sweden 🇸🇪</div>
                            </div>

                            {/* CTA */}
                            <div className="bg-white rounded-2xl border border-zinc-200 p-6 sticky top-24">
                                <h3 className="text-lg font-black text-zinc-900 mb-1">Tertarik dengan produk ini?</h3>
                                <p className="text-zinc-500 text-sm mb-6">Engineer kami siap membantu. Konsultasi gratis.</p>

                                <div className="flex flex-col gap-3">
                                    <a
                                        href={`https://wa.me/6281119168752?text=Halo%2C+saya+tertarik+dengan+${encodeURIComponent(product.name)}.`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-green-600/20"
                                    >
                                        <Phone size={17} /> Chat WhatsApp
                                    </a>
                                    <Link
                                        href="/contact"
                                        className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-red-600/20"
                                    >
                                        <Mail size={17} /> Minta Penawaran
                                    </Link>
                                </div>

                                <div className="mt-6 pt-6 border-t border-zinc-100">
                                    <div className="text-xs text-zinc-400 font-medium mb-3 uppercase tracking-wider">Produk Lainnya Binar</div>
                                    <div className="space-y-1">
                                        {binarProducts
                                            .filter(p => p.slug !== slug)
                                            .slice(0, 4)
                                            .map(p => (
                                                <Link
                                                    key={p.slug}
                                                    href={`/products/binar/${p.slug}`}
                                                    className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-zinc-50 transition-colors group/sub"
                                                >
                                                    <div>
                                                        <div className="text-xs font-bold text-red-700 group-hover/sub:text-red-600">{p.modelCode}</div>
                                                        <div className="text-zinc-500 text-[10px]">{p.name.split(' ').slice(0, 3).join(' ')}</div>
                                                    </div>
                                                    <ChevronRight size={12} className="text-zinc-400" />
                                                </Link>
                                            ))}
                                        <Link href="/products/binar" className="flex items-center gap-1.5 py-2 px-3 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-1">
                                            Semua produk Binar →
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
