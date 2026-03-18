import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle, Clock, MapPin, Package, ArrowRight } from 'lucide-react';
import { projects } from '../page';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return projects.map(p => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const c = projects.find(cs => cs.id === slug);
    if (!c) return {};
    return {
        title: `${c.client} — ${c.industry} | Our Projects PT Dimensi Quantum Wahyudi`,
        description: `Our Projects: ${c.desc.slice(0, 120)}...`,
        openGraph: {
            title: `Our Projects: ${c.client} (${c.industry})`,
            description: c.desc.slice(0, 160),
            url: `https://dimensiwahyudi.com/our-projects/${slug}`,
        },
        alternates: { canonical: `https://dimensiwahyudi.com/our-projects/${slug}` },
    };
}

export default async function CaseStudyDetailPage({ params }: Props) {
    const { slug } = await params;
    const c = projects.find(cs => cs.id === slug);
    if (!c) notFound();

    return (
        <main className="min-h-screen bg-white">

            {/* HERO */}
            <section className="relative pt-28 pb-16 bg-slate-950 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.04]"
                    style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                {/* BREADCRUMB / BACK LINK */}
                <div className="absolute top-8 left-6 md:left-12 z-20">
                    <Link href="/our-projects" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-8 transition-colors">
                        <ArrowLeft size={16} /> Back to Gallery
                    </Link>
                </div>

                <div className="max-w-5xl mx-auto px-6">
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-xs font-bold uppercase tracking-wider">
                            {c.industry}
                        </span>
                        <span className="flex items-center gap-1.5 text-slate-500 text-xs">
                            <Clock size={12} /> 2024
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
                        {c.client}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm">
                        <span className="flex items-center gap-1.5"><MapPin size={14} /> Indonesia</span>
                        <span className="flex items-center gap-1.5"><Package size={14} /> Integrated Handling Solution</span>
                    </div>
                </div>
            </section>

            {/* HERO IMAGE */}
            <div className="relative h-64 md:h-80 overflow-hidden bg-slate-200">
                { }
                <Image src={c.image} alt={c.client} fill sizes="100vw" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* CONTENT */}
            <div className="max-w-5xl mx-auto px-6 py-16">
                <div className="grid lg:grid-cols-3 gap-12">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Content Body - Simplified for new Project Format */}
                        <div>
                            <span className="text-xs font-black text-cyan-500 uppercase tracking-widest">Overview</span>
                            <h2 className="text-2xl font-black text-slate-900 mt-2 mb-4">Project Background</h2>
                            <p className="text-slate-600 leading-relaxed text-lg">{c.desc}</p>
                        </div>

                        {/* Placeholder for future detailed elaboration */}
                        <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl">
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Interested in a Similar Project Scale?</h3>
                            <p className="text-slate-500 mb-4">Discuss your {c.industry} handling requirements with our sales engineering team and get a complete technical proposal.</p>
                            <Link href="/contact" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold transition-colors">
                                Talk to Our Team <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4 p-5 bg-slate-50 rounded-xl border border-slate-100">
                            <CheckCircle size={20} className="text-blue-600 shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <div className="flex items-baseline gap-3 flex-wrap">
                                    <span className="text-xl font-black text-blue-600">Handling System Installed</span>
                                </div>
                                <p className="text-slate-500 text-sm mt-1">Completed installation and verified safe operation aligned with ergonomic production-floor standards for the {c.industry} industry.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
                {/* Project Fast Facts */}
                <div className="bg-slate-950 rounded-2xl p-6 text-white sticky top-6">
                    <h3 className="font-black text-sm uppercase tracking-wider text-slate-400 mb-4">Project Summary</h3>
                    <dl className="space-y-3 text-sm">
                        <div>
                            <dt className="text-slate-500 text-xs uppercase tracking-wider">Client</dt>
                            <dd className="text-white font-semibold mt-0.5">{c.client}</dd>
                        </div>
                        <div>
                            <dt className="text-slate-500 text-xs uppercase tracking-wider">Industry</dt>
                            <dd className="text-white font-semibold mt-0.5">{c.industry}</dd>
                        </div>
                        <div>
                            <dt className="text-slate-500 text-xs uppercase tracking-wider">Location</dt>
                            <dd className="text-white font-semibold mt-0.5">Indonesia</dd>
                        </div>
                        <div>
                            <dt className="text-slate-500 text-xs uppercase tracking-wider">Project Scale</dt>
                            <dd className="text-white font-semibold mt-0.5">{c.size === 'large' ? 'High-Throughput Facility' : c.size === 'tall' ? 'Extended Assembly Area' : 'Standard Fabrication Area'}</dd>
                        </div>
                        <div>
                            <dt className="text-slate-500 text-xs uppercase tracking-wider">Status</dt>
                            <dd className="text-white font-semibold flex items-center gap-1.5 mt-0.5 text-emerald-400">
                                <CheckCircle size={14} /> Completed
                            </dd>
                        </div>
                    </dl>

                    <div className="border-t border-white/10 mt-5 pt-5 space-y-3">
                        <Link href="/contact" className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm transition-colors">
                            Consultation for Similar Projects
                        </Link>
                        <a href="https://wa.me/6281119168752" target="_blank" rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-sm transition-colors">
                            Chat WhatsApp
                        </a>
                    </div>
                </div>

                <div className="flex flex-col gap-4 sticky top-24">
                    <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl">
                        <h3 className="text-xl font-black text-white mb-4">More Projects</h3>
                        <div className="space-y-4">
                            {/* Other case studies */}
                            {projects.filter(p => p.id !== slug).slice(0, 3).map(cs => (
                                <Link key={cs.id} href={`/our-projects/${cs.id}`}
                                    className="block p-4 rounded-2xl bg-slate-800/50 hover:bg-slate-800 transition-colors border border-slate-700/50 group"
                                >
                                    <div className="flex items-center gap-3">
                                        <CheckCircle size={16} className="text-blue-600 shrink-0" />
                                        <div>
                                            <p className="text-sm font-bold text-white line-clamp-1">{cs.client}</p>
                                            <p className="text-xs text-slate-400">{cs.industry}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
