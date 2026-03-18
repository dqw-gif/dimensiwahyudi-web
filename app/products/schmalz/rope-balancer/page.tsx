import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { ArrowLeft, ArrowRight, ChevronRight, Layers } from 'lucide-react';
import { ropeBalancerVariants } from '../../../../data/products/rope-balancers';

export const metadata: Metadata = {
    title: 'Rope Balancers & Lift Systems — Full Range | Schmalz — PT Dimensi Quantum Wahyudi',
    description: 'Binar Handling NEO 30 (battery, 30kg), QLA (360 degrees, 300kg), QLR (rail, 600kg), and Ergo-Glass. Intelligent lift systems for precision workstations.',
    keywords: [
        'rope balancer indonesia',
        'lift assist system indonesia',
        'ergonomic lifting system indonesia',
        'binar handling indonesia',
        'industrial lifting solutions',
        'pt dimensi quantum wahyudi',
    ],
    alternates: {
        canonical: 'https://dimensiwahyudi.com/products/schmalz/rope-balancer',
    },
    openGraph: {
        title: 'Rope Balancers & Lift Systems — Full Range | Schmalz',
        description: 'Explore battery, articulated, and rail-based lift systems from Binar Handling and Schmalz for precise industrial lifting.',
        url: 'https://dimensiwahyudi.com/products/schmalz/rope-balancer',
        type: 'website',
    },
};

const badgeColors: Record<string, string> = {
    'Battery': 'bg-green-600 text-white',
    'Glass': 'bg-cyan-600 text-white',
};

export default function RopeBalancerIndexPage() {
    return (
        <main className="min-h-screen bg-white">

            <section className="relative pt-28 pb-16 bg-slate-950 overflow-hidden">
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'linear-gradient(rgba(251,191,36,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.3) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
                <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(245,158,11,0.2) 0%, transparent 70%)' }} />

                <div className="relative max-w-7xl mx-auto px-6">
                    <nav className="flex items-center gap-2 text-slate-500 text-xs mb-8 flex-wrap">
                        <Link href="/products" className="hover:text-amber-400 transition-colors">Products</Link>
                        <ChevronRight size={12} />
                        <Link href="/products/schmalz" className="hover:text-amber-400 transition-colors">Schmalz</Link>
                        <ChevronRight size={12} />
                        <span className="text-slate-300">Rope Balancers</span>
                    </nav>

                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <Layers size={11} /> {ropeBalancerVariants.length} Systems - Binar Handling
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tighter mb-4">
                        ROPE BALANCERS
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-300">& LIFT SYSTEMS</span>
                    </h1>
                    <div className="h-1.5 w-20 bg-gradient-to-r from-amber-500 to-orange-400 rounded-full mb-6" />
                    <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
                        Intelligent lift systems from Binar Handling with zero-gravity feel and precise positioning, from 30 kg battery-operated units up to 600 kg rail systems.
                    </p>
                </div>
            </section>

            <section className="py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        {ropeBalancerVariants.map((variant) => (
                            <Link
                                key={variant.slug}
                                href={`/products/schmalz/rope-balancer/${variant.slug}`}
                                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-amber-300 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-0.5"
                            >
                                <div className={`h-44 bg-gradient-to-br ${variant.heroColor} relative overflow-hidden`}>
                                    {variant.imageUrl ? (
                                        <Image src={variant.imageUrl} alt={variant.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="absolute inset-0 w-full h-full object-cover" />
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
                                    <h3 className="text-xl font-black text-slate-900 mb-1 group-hover:text-amber-700 transition-colors">{variant.name}</h3>
                                    <p className="text-amber-600 text-xs font-bold uppercase tracking-wider mb-3">{variant.highlight}</p>
                                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-5">{variant.tagline}</p>
                                    <div className="flex items-center text-amber-600 font-bold text-sm group-hover:gap-3 gap-2 transition-all">
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
                    <Link href="/products/schmalz" className="flex items-center gap-2 text-slate-500 hover:text-amber-600 font-medium text-sm transition-colors">
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
