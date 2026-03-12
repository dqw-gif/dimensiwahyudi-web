import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft, ArrowRight, ChevronRight, Shield, Droplets, Leaf, Layers, Wind } from 'lucide-react';
import { vacuMasterVariants } from '../../../../data/products/vacumaster';

export const metadata: Metadata = {
    title: 'VacuMaster � Semua Seri | Schmalz � PT Dimensi Quantum Wahyudi',
    description: 'Lini lengkap Schmalz VacuMaster: Basic, Comfort, Vario (2000kg), Eco (tanpa listrik), Window, Wood, Coil, Light, Multi, Glass, Panel (14m). 11 varian untuk setiap industri.',
};

const badgeIcons: Record<string, React.ReactNode> = {
    'No Power': <Shield size={10} />,
    'Glass': <Wind size={10} />,
    'Wood': <Leaf size={10} />,
    'Coil': <Droplets size={10} />,
};

const badgeColors: Record<string, string> = {
    'No Power': 'bg-green-600 text-white',
    'Glass': 'bg-cyan-600 text-white',
    'Wood': 'bg-amber-600 text-white',
    'Coil': 'bg-zinc-600 text-white',
};

export default function VacuMasterIndexPage() {
    return (
        <main className="min-h-screen bg-white">

            {/* HERO */}
            <section className="relative pt-28 pb-16 bg-slate-950 overflow-hidden">
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'linear-gradient(rgba(99,179,237,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,0.4) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
                <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(37,99,235,0.25) 0%, transparent 70%)' }} />

                <div className="relative max-w-7xl mx-auto px-6">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-slate-500 text-xs mb-8">
                        <Link href="/products" className="hover:text-blue-400 transition-colors">Produk</Link>
                        <ChevronRight size={12} />
                        <Link href="/products/schmalz" className="hover:text-blue-400 transition-colors">Schmalz</Link>
                        <ChevronRight size={12} />
                        <span className="text-slate-300">VacuMaster</span>
                    </nav>

                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <Layers size={11} /> 11 Varian � Satu Kategori
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tighter mb-4">
                        VACUMASTER
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">LIFTING DEVICE</span>
                    </h1>
                    <div className="h-1.5 w-20 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full mb-6" />
                    <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
                        Seri VacuMaster dari Schmalz � vacuum lifting device paling serbaguna. Dari 100 kg hingga 2.000 kg, dari kayu berpori hingga kaca, dari coil baja hingga panel 14 meter.
                    </p>

                    <div className="flex items-center gap-8 mt-8">
                        {[
                            { label: 'Varian', value: '11' },
                            { label: 'Max Kapasitas', value: '2.000 kg' },
                            { label: 'Max Panel Length', value: '14 m' },
                        ].map(stat => (
                            <div key={stat.label} className="text-center">
                                <div className="text-2xl font-black text-white">{stat.value}</div>
                                <div className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* VARIANT GRID */}
            <section className="py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center gap-3 mb-10">
                        <Layers size={16} className="text-slate-400" />
                        <span className="text-slate-500 text-sm font-medium">Pilih varian yang sesuai kebutuhan Anda</span>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {vacuMasterVariants.map((variant) => (
                            <Link
                                key={variant.slug}
                                href={`/products/schmalz/vacumaster/${variant.slug}`}
                                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-0.5"
                            >
                                {/* Card header */}
                                <div className={`h-40 bg-gradient-to-br ${variant.heroColor} relative overflow-hidden`}>
                                    {variant.imageUrl ? (
                                        <img
                                            src={variant.imageUrl}
                                            alt={variant.name}
                                            className="absolute inset-0 w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 opacity-25"
                                            style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, white 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
                                    )}
                                    <div className="absolute top-3 left-3 bg-black/30 backdrop-blur-sm rounded-md px-2 py-1 text-white/90 text-[10px] font-mono font-bold border border-white/10">
                                        {variant.seriesCode}
                                    </div>
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 text-blue-600 text-xs font-mono font-bold border border-white/20 shadow-sm">
                                        {variant.capacity}
                                    </div>
                                    {variant.badge && (
                                        <div className={`absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${badgeColors[variant.badge]}`}>
                                            {badgeIcons[variant.badge]}
                                            {variant.badge}
                                        </div>
                                    )}
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-black text-slate-900 mb-1 group-hover:text-blue-700 transition-colors">
                                        {variant.name}
                                    </h3>
                                    <p className="text-blue-600 text-xs font-bold uppercase tracking-wider mb-3 leading-tight">
                                        {variant.highlight}
                                    </p>
                                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-5">
                                        {variant.tagline}
                                    </p>
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

            {/* BACK + CTA */}
            <section className="py-12 bg-white border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Link href="/products/schmalz" className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium text-sm transition-colors">
                        <ArrowLeft size={16} /> Kembali ke Semua Produk Schmalz
                    </Link>
                    <a
                        href="https://wa.me/6281119168752"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-green-600/20"
                    >
                        Konsultasi Pemilihan Varian
                        <ArrowRight size={14} />
                    </a>
                </div>
            </section>
        </main>
    );
}
