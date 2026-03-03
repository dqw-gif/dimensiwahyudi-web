import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft, ArrowRight, ChevronRight, Layers, Building2 } from 'lucide-react';
import { craneSystemVariants } from '../../../../data/products/crane-systems';

export const metadata: Metadata = {
    title: 'Crane Systems & Jib Cranes — Semua Varian | Schmalz — PT Dimensi Quantum Wahyudi',
    description: 'Schmalz Jib Cranes (1.000kg), Aluminum Bridge Cranes (1.200kg), KBG Modular Steel (30×8.5m), Chain Hoists (2.500kg). Fondasi sistem handling vakum premium.',
};

const badgeColors: Record<string, string> = {
    'Heavy Duty': 'bg-zinc-700 text-white',
    'CSA': 'bg-blue-700 text-white',
};

export default function CraneSystemIndexPage() {
    return (
        <main className="min-h-screen bg-white">

            <section className="relative pt-28 pb-16 bg-slate-950 overflow-hidden">
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'linear-gradient(rgba(99,179,237,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,0.3) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
                <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(37,99,235,0.2) 0%, transparent 70%)' }} />

                <div className="relative max-w-7xl mx-auto px-6">
                    <nav className="flex items-center gap-2 text-slate-500 text-xs mb-8 flex-wrap">
                        <Link href="/products" className="hover:text-blue-400 transition-colors">Produk</Link>
                        <ChevronRight size={12} />
                        <Link href="/products/schmalz" className="hover:text-blue-400 transition-colors">Schmalz</Link>
                        <ChevronRight size={12} />
                        <span className="text-slate-300">Crane Systems & Jib Cranes</span>
                    </nav>

                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <Building2 size={11} /> {craneSystemVariants.length} Sistem — Hingga 2.500 kg
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tighter mb-4">
                        CRANE SYSTEMS
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">& JIB CRANES</span>
                    </h1>
                    <div className="h-1.5 w-20 bg-gradient-to-r from-blue-500 to-sky-400 rounded-full mb-6" />
                    <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
                        Fondasi sistem handling yang handal — Jib Crane, Bridge Crane aluminium, struktur baja modular KBG, hingga Chain Hoist 2.500 kg bersertifikat CSA.
                    </p>

                    <div className="flex items-center gap-8 mt-8">
                        {[
                            { label: 'Varian', value: '4' },
                            { label: 'Max Hoist', value: '2.500 kg' },
                            { label: 'Max Workspace', value: '30 × 8.5 m' },
                        ].map(s => (
                            <div key={s.label} className="text-center">
                                <div className="text-2xl font-black text-white">{s.value}</div>
                                <div className="text-xs text-slate-500 uppercase tracking-wider">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        {craneSystemVariants.map((variant) => (
                            <Link
                                key={variant.slug}
                                href={`/products/schmalz/crane-system/${variant.slug}`}
                                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-0.5"
                            >
                                <div className={`h-44 bg-gradient-to-br ${variant.heroColor} relative overflow-hidden`}>
                                    {variant.imageUrl ? (
                                        <img src={variant.imageUrl} alt={variant.name} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                                    ) : (
                                        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, white 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
                                    )}
                                    <div className="absolute top-3 left-3 bg-black/30 backdrop-blur-sm rounded-md px-2 py-1 text-white/90 text-[10px] font-mono font-bold border border-white/10">
                                        {variant.seriesCode}
                                    </div>
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 text-blue-600 text-xs font-mono font-bold border border-white/20 shadow-sm">
                                        {variant.capacity}
                                    </div>
                                    {variant.badge && (
                                        <div className={`absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${badgeColors[variant.badge] || 'bg-white/20 text-white'}`}>
                                            {variant.badge}
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-black text-slate-900 mb-1 group-hover:text-blue-700 transition-colors">{variant.name}</h3>
                                    <p className="text-blue-600 text-xs font-bold uppercase tracking-wider mb-3">{variant.highlight}</p>
                                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-5">{variant.tagline}</p>
                                    <div className="flex items-center text-blue-600 font-bold text-sm group-hover:gap-3 gap-2 transition-all">
                                        Lihat Detail <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12 bg-white border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Link href="/products/schmalz" className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium text-sm transition-colors">
                        <ArrowLeft size={16} /> Kembali ke Semua Produk Schmalz
                    </Link>
                    <a href="https://wa.me/6281119168752" target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-green-600/20">
                        Konsultasi <ArrowRight size={14} />
                    </a>
                </div>
            </section>
        </main>
    );
}
