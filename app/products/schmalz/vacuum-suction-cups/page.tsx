import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { ArrowLeft, ArrowRight, ChevronRight, Layers, Zap } from 'lucide-react';
import { suctionCupVariants } from '../../../../data/products/suction-cups';

export const metadata: Metadata = {
    title: 'Vacuum Suction Cups - Full Range | Schmalz - PT Dimensi Quantum Wahyudi',
    description: 'Explore the complete Schmalz vacuum suction cup range: flat, bellows, oval, and specialized variants for electronics, sheet metal, glass, wood, packaging, and high-temperature applications.',
    keywords: [
        'vacuum suction cup indonesia',
        'schmalz suction cups',
        'vacuum cup for robotics',
        'vacuum cup sheet metal handling',
        'industrial vacuum components indonesia',
        'pt dimensi quantum wahyudi',
    ],
    alternates: {
        canonical: 'https://dimensiwahyudi.com/products/schmalz/vacuum-suction-cups',
    },
    openGraph: {
        title: 'Vacuum Suction Cups Full Range — Schmalz Indonesia',
        description: 'Find Schmalz vacuum suction cups for electronics, packaging, glass, wood, and heavy industrial handling applications.',
        url: 'https://dimensiwahyudi.com/products/schmalz/vacuum-suction-cups',
        type: 'website',
        locale: 'en_ID',
        siteName: 'PT Dimensi Quantum Wahyudi',
    },
};

const badgeColors: Record<string, string> = {
    'Heavy Duty': 'bg-slate-500/20 text-slate-300 border-slate-500/30',
    'Food Grade': 'bg-green-500/20 text-green-300 border-green-500/30',
    'ESD Safe': 'bg-violet-500/20 text-violet-300 border-violet-500/30',
    Wood: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    Glass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    'High Temp': 'bg-red-500/20 text-red-300 border-red-500/30',
};

export default function SuctionCupsPage() {
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
                        <span className="text-slate-300">Vacuum Suction Cups</span>
                    </nav>

                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <Layers size={11} /> {suctionCupVariants.length} Types - Vacuum Components
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tighter mb-4">
                        VACUUM
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300">SUCTION CUPS</span>
                    </h1>
                    <div className="h-1.5 w-20 bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full mb-6" />
                    <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
                        Hundreds of variants for every gripping need, from sensitive electronics to heavy sheet metal. Choose from flat, bellows, oval, and engineered specialty designs.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        {['NBR', 'Silicone', 'Viton', 'PU', 'PTFE'].map(m => (
                            <span key={m} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-slate-400 text-xs font-mono">{m}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* VARIANT GRID */}
            <section className="py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {suctionCupVariants.map((variant) => (
                            <Link
                                key={variant.slug}
                                href={`/products/schmalz/vacuum-suction-cups/${variant.slug}`}
                                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-cyan-300 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-0.5"
                            >
                                <div className={`h-40 bg-gradient-to-br ${variant.heroColor} relative overflow-hidden`}>
                                    {variant.imageUrl ? (
                                        <Image src={variant.imageUrl} alt={variant.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="absolute inset-0 w-full h-full object-cover" />
                                    ) : (
                                        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, white 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
                                    )}
                                    <div className="absolute top-3 left-3 bg-black/30 backdrop-blur-sm rounded-md px-2 py-1 text-white/90 text-[10px] font-mono font-bold border border-white/10">
                                        {variant.shape}
                                    </div>
                                    {variant.badges.length > 0 && (
                                        <div className="absolute top-3 right-3 flex gap-1 flex-wrap justify-end">
                                            {variant.badges.map(badge => (
                                                <span key={badge} className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${badgeColors[badge] ?? 'bg-white/20 text-white border-white/30'}`}>
                                                    {badge}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    {variant.application && (
                                        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-white/20 text-white border border-white/20">
                                            <Zap size={9} />{variant.application}
                                        </div>
                                    )}
                                </div>
                                <div className="p-5">
                                    <h3 className="text-base font-black text-slate-900 mb-1 group-hover:text-cyan-700 transition-colors leading-snug">{variant.name}</h3>
                                    <p className="text-cyan-600 text-xs font-bold uppercase tracking-wider mb-2">{variant.tagline}</p>
                                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-4">{variant.description}</p>
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
