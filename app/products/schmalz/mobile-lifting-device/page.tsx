import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft, ArrowRight, ChevronRight, Smartphone, Zap } from 'lucide-react';
import { mobileLiftingVariants } from '../../../../data/products/mobile-lifting';

export const metadata: Metadata = {
    title: 'Mobile Lifting Devices - Full Range | Schmalz - PT Dimensi Quantum Wahyudi',
    description: 'Schmalz JumboFlex Mobile (standard socket power) and JumboFlex Picker (forklift mount with touch display). Mobile vacuum tube lifter solutions without permanent overhead cranes.',
};

export default function MobileLiftingIndexPage() {
    return (
        <main className="min-h-screen bg-white">

            {/* HERO */}
            <section className="relative pt-28 pb-16 bg-slate-950 overflow-hidden">
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'linear-gradient(rgba(99,179,237,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,0.4) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
                <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6,182,212,0.2) 0%, transparent 70%)' }} />

                <div className="relative max-w-7xl mx-auto px-6">
                    <nav className="flex items-center gap-2 text-slate-500 text-xs mb-8 flex-wrap">
                        <Link href="/products" className="hover:text-blue-400 transition-colors">Products</Link>
                        <ChevronRight size={12} />
                        <Link href="/products/schmalz" className="hover:text-blue-400 transition-colors">Schmalz</Link>
                        <ChevronRight size={12} />
                        <span className="text-slate-300">Mobile Lifting Devices</span>
                    </nav>

                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <Smartphone size={11} /> {mobileLiftingVariants.length} Variants - Fully Mobile
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tighter mb-4">
                        MOBILE
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300">LIFTING DEVICES</span>
                    </h1>
                    <div className="h-1.5 w-20 bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full mb-6" />
                    <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
                        A fully mobile vacuum tube lifter solution with no need for permanent overhead cranes. Plug into a power outlet or mount directly on a forklift.
                    </p>
                </div>
            </section>

            {/* VARIANT GRID */}
            <section className="py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {mobileLiftingVariants.map((variant) => (
                            <Link
                                key={variant.slug}
                                href={`/products/schmalz/mobile-lifting-device/${variant.slug}`}
                                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-cyan-300 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-0.5"
                            >
                                <div className={`h-48 bg-gradient-to-br ${variant.heroColor} relative overflow-hidden`}>
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
                                        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-white/20 text-white border border-white/20">
                                            <Zap size={10} />{variant.badge}
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-black text-slate-900 mb-1 group-hover:text-cyan-700 transition-colors">{variant.name}</h3>
                                    <p className="text-cyan-600 text-xs font-bold uppercase tracking-wider mb-3">{variant.highlight}</p>
                                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-5">{variant.tagline}</p>
                                    <div className="flex items-center text-cyan-600 font-bold text-sm group-hover:gap-3 gap-2 transition-all">
                                        View Details <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12 bg-white border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Link href="/products/schmalz" className="flex items-center gap-2 text-slate-500 hover:text-cyan-600 font-medium text-sm transition-colors">
                        <ArrowLeft size={16} /> Back to All Schmalz Products
                    </Link>
                    <a href="https://wa.me/6281119168752" target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-green-600/20">
                        Consultation <ArrowRight size={14} />
                    </a>
                </div>
            </section>
        </main>
    );
}
