import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { ArrowRight, ArrowLeft, Filter, Award } from 'lucide-react';
import { binarProducts } from '../../../data/products/binar';
import { videos } from '../../../data/videos';
import ProductVideoGrid from '../schmalz/ProductVideoGrid';

export const metadata: Metadata = {
    title: 'Produk Binar Handling Indonesia | Lift Arm Cerdas & Gripper | PT Dimensi Quantum Wahyudi',
    description: 'Katalog produk Binar Handling dari Swedia: QLA Quick-Lift Arm, QLD Motorized 300kg, Vacuum Gripper, Magnetic Gripper. Solusi ergonomis untuk industri manufaktur & otomotif Indonesia.',
    keywords: ['Binar Handling Indonesia', 'QLA Lift Arm', 'QLD 300i', 'Intelligent Lift Arm Sweden', 'Vacuum Gripper Industri', 'Magnetic Gripper', 'PT Dimensi Quantum Wahyudi'],
    alternates: { canonical: 'https://dimensiwahyudi.com/products/binar' },
    openGraph: {
        title: 'Produk Binar Handling Indonesia | Lift Arm & Gripper Cerdas',
        description: 'Distributor resmi Binar Handling (Swedia) di Indonesia. Lift arm pintar dan gripper untuk industri manufaktur.',
        url: 'https://dimensiwahyudi.com/products/binar',
        type: 'website',
        locale: 'id_ID',
        siteName: 'PT Dimensi Quantum Wahyudi',
    },
};

const categoryColors: Record<string, string> = {
    'Lift Arm': 'bg-red-500/10 text-red-700 border-red-200',
    'Gripper': 'bg-rose-500/10 text-rose-700 border-rose-200',
    'Accessory': 'bg-red-900/10 text-red-900 border-red-200',
};

export default function BinarCatalogPage() {
    const liftArms = binarProducts.filter(p => p.category === 'Lift Arm');
    const grippers = binarProducts.filter(p => p.category === 'Gripper');

    return (
        <main className="min-h-screen bg-white">

            {/* HERO */}
            <section className="relative pt-32 pb-16 bg-gradient-to-br from-black via-zinc-950 to-black overflow-hidden">
                {/* Red grid overlay */}
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'linear-gradient(rgba(239,68,68,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.5) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
                {/* Red radial glow */}
                <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 80% at 70% 50%, rgba(220,38,38,0.20) 0%, transparent 70%)' }} />
                {/* Subtle red bar at top */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent" />

                <div className="relative max-w-7xl mx-auto px-6">
                    <Link href="/products" className="inline-flex items-center gap-2 text-zinc-400 hover:text-red-400 mb-8 text-sm font-medium transition-colors">
                        <ArrowLeft size={16} /> Semua Brand
                    </Link>
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-xs font-bold uppercase tracking-widest mb-6">
                                ???? Made in Sweden � Est. 1976
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tighter mb-4">
                                BINAR
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400">HANDLING</span>
                            </h1>
                            <div className="h-1.5 w-24 bg-gradient-to-r from-red-600 to-rose-500 rounded-full mb-6" />
                            <p className="text-zinc-400 text-lg max-w-xl leading-relaxed">
                                Teknologiledare dalam intelligent lift arms � servo precision yang menetapkan standar baru ergonomi industri global.
                            </p>
                        </div>
                        <div className="hidden lg:flex flex-col items-end gap-6">
                            <a href="https://www.binarhandling.com" target="_blank" rel="noopener noreferrer"
                                className="block bg-white border border-red-100 rounded-2xl px-6 py-4 hover:shadow-lg hover:shadow-red-500/20 hover:scale-105 transition-all">
                                <Image
                                    src="https://i.imgur.com/OOBgQpe.png"
                                    alt="Binar Handling Logo"
                                    width={160}
                                    height={48}
                                    className="object-contain"
                                    unoptimized
                                />
                            </a>
                            <div className="flex items-center gap-4 text-zinc-500 text-sm">
                                <div className="text-center">
                                    <div className="text-3xl font-black text-white">{binarProducts.length}</div>
                                    <div className="text-xs uppercase tracking-widest">Produk</div>
                                </div>
                                <div className="w-px h-12 bg-zinc-800" />
                                <div className="text-center">
                                    <div className="text-3xl font-black text-red-500">8000+</div>
                                    <div className="text-xs uppercase tracking-widest">Gripdon Dibuat</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* LIFT ARMS */}
            <section className="pt-16 pb-8 bg-zinc-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-1 w-8 bg-red-600 rounded-full" />
                        <h2 className="text-2xl font-black text-zinc-900 uppercase tracking-tight">Vikarmskranar / Lift Arms</h2>
                        <Filter size={14} className="text-zinc-400 ml-auto" />
                        <span className="text-zinc-400 text-sm">{liftArms.length} produk</span>
                    </div>

                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16">
                        {liftArms.map((product) => (
                            <Link
                                key={product.slug}
                                href={`/products/binar/${product.slug}`}
                                className="group bg-white rounded-2xl border border-zinc-200 overflow-hidden hover:border-red-400 hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300 hover:-translate-y-0.5"
                            >
                                <div className={`h-44 bg-gradient-to-br ${product.heroColor} relative overflow-hidden`}>
                                    {product.imageUrl ? (
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="absolute inset-0 w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 opacity-20"
                                            style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                                    )}
                                    <div className="absolute bottom-4 left-4">
                                        <span className={`inline-block px-3 py-1 border rounded-full text-xs font-bold uppercase tracking-wider ${categoryColors[product.category]} bg-white/90`}>
                                            {product.category}
                                        </span>
                                    </div>
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 text-red-600 text-xs font-mono font-bold border border-red-100 shadow-sm">
                                        {product.capacity}
                                    </div>
                                    <div className="absolute top-4 left-4 bg-black/30 backdrop-blur-sm rounded-md px-2 py-1 text-white/80 text-[10px] font-mono border border-white/10">
                                        {product.modelCode}
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-lg font-black text-zinc-900 mb-1 group-hover:text-red-700 transition-colors leading-tight">
                                        {product.name}
                                    </h3>
                                    <p className="text-red-600 text-xs font-bold uppercase tracking-wider mb-3">
                                        {product.tagline}
                                    </p>
                                    <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2 mb-5">
                                        {product.description}
                                    </p>

                                    <div className="grid grid-cols-2 gap-2 mb-5">
                                        {product.specs.slice(0, 2).map(spec => (
                                            <div key={spec.label} className="bg-zinc-50 rounded-lg px-3 py-2">
                                                <div className="text-zinc-400 text-[10px] uppercase tracking-wider">{spec.label}</div>
                                                <div className="text-zinc-800 text-xs font-bold mt-0.5">{spec.value}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex items-center text-red-600 font-bold text-sm group-hover:gap-3 gap-2 transition-all">
                                        Lihat Detail
                                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* GRIPPERS */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-1 w-8 bg-rose-700 rounded-full" />
                        <h2 className="text-2xl font-black text-zinc-900 uppercase tracking-tight">Gripdon / End Effectors</h2>
                        <Filter size={14} className="text-zinc-400 ml-auto" />
                        <span className="text-zinc-400 text-sm">{grippers.length} produk</span>
                    </div>

                    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {grippers.map((product) => (
                            <Link
                                key={product.slug}
                                href={`/products/binar/${product.slug}`}
                                className="group bg-white rounded-2xl border border-zinc-200 overflow-hidden hover:border-rose-400 hover:shadow-xl hover:shadow-rose-500/10 transition-all duration-300 hover:-translate-y-0.5"
                            >
                                <div className={`h-32 bg-gradient-to-br ${product.heroColor} relative overflow-hidden`}>
                                    {product.imageUrl ? (
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="absolute inset-0 w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 opacity-20"
                                            style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, white 1px, transparent 1px)', backgroundSize: '15px 15px' }} />
                                    )}
                                    <div className="absolute bottom-3 left-3">
                                        <span className={`inline-block px-2 py-0.5 border rounded-full text-[10px] font-bold uppercase tracking-wider ${categoryColors[product.category]} bg-white/90`}>
                                            {product.category}
                                        </span>
                                    </div>
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-md px-2 py-1 text-red-600 text-[10px] font-mono font-bold border border-red-100 shadow-sm">
                                        {product.capacity}
                                    </div>
                                </div>

                                <div className="p-5">
                                    <h3 className="text-base font-black text-zinc-900 mb-2 group-hover:text-rose-700 transition-colors leading-tight">
                                        {product.name}
                                    </h3>
                                    <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2 mb-4">
                                        {product.tagline}
                                    </p>
                                    <div className="flex items-center text-rose-600 font-bold text-xs group-hover:gap-2 gap-1 transition-all">
                                        Lihat Detail <ArrowRight size={12} />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* VIDEO DEMO SECTION */}
            <ProductVideoGrid videos={videos.filter(v => v.title.toLowerCase().includes('binar') || v.product.toLowerCase().includes('ql')).slice(0, 3)} />

            {/* CTA */}
            <section className="py-16 bg-white border-t border-zinc-100">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <Award className="w-10 h-10 text-red-600 mx-auto mb-4 opacity-60" />
                    <h2 className="text-2xl font-black text-zinc-900 mb-3">Butuh Gripdon Custom?</h2>
                    <p className="text-zinc-500 mb-8">Binar Handling telah membuat 8.000+ varian gripdon custom. Konsultasikan kebutuhan spesifik Anda.</p>
                    <a href="https://wa.me/6281119168752" target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-600/30">
                        Konsultasi via WhatsApp
                        <ArrowRight size={16} />
                    </a>
                </div>
            </section>
        </main>
    );
}
