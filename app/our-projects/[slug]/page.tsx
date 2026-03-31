import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle, Clock, MapPin, Package, ArrowRight } from 'lucide-react';
import { projects } from '../page';

interface Props {
    params: Promise<{ slug: string }>;
}

type NarrativeParts = {
    challenge: string;
    solution: string;
    result: string;
};

function buildNarrativeParts(description: string): NarrativeParts {
    const text = description.replace(/\s+/g, ' ').trim();
    const resultMarker = 'Result:';
    const operationMarker = ' In this ';

    let challenge = text;
    let solution = '';
    let result = '';

    const operationIndex = text.indexOf(operationMarker);
    if (operationIndex > -1) {
        challenge = text.slice(0, operationIndex).trim();
        solution = text.slice(operationIndex + 1).trim();
    }

    const resultIndex = solution.indexOf(resultMarker);
    if (resultIndex > -1) {
        result = solution.slice(resultIndex + resultMarker.length).trim();
        solution = solution.slice(0, resultIndex).trim();
    }

    if (!solution) {
        const sentences = challenge.split('. ').filter(Boolean);
        if (sentences.length > 1) {
            challenge = sentences[0].trim();
            solution = `${sentences.slice(1).join('. ').trim()}`;
        }
    }

    if (!result) {
        result = 'Safer and more consistent handling performance aligned with operational productivity goals.';
    }

    if (!challenge.endsWith('.')) {
        challenge = `${challenge}.`;
    }
    if (solution && !solution.endsWith('.')) {
        solution = `${solution}.`;
    }
    if (!result.endsWith('.')) {
        result = `${result}.`;
    }

    return {
        challenge,
        solution: solution || 'Engineered lifting support was introduced to stabilize handling quality and reduce repetitive operator strain.',
        result,
    };
}

export async function generateStaticParams() {
    return projects.map(p => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const c = projects.find(cs => cs.id === slug);
    if (!c) return {};
    const canonicalUrl = `https://dimensiwahyudi.com/our-projects/${slug}`;
    const description = `${c.desc.slice(0, 155)}${c.desc.length > 155 ? '...' : ''}`;
    return {
        title: `${c.client} — ${c.industry} | Our Projects PT Dimensi Quantum Wahyudi`,
        description,
        keywords: [
            `${c.industry} project Indonesia`,
            'industrial handling case study',
            'vacuum lifting implementation Indonesia',
            'ergonomic material handling project',
            'PT Dimensi Quantum Wahyudi portfolio',
        ],
        openGraph: {
            title: `Our Projects: ${c.client} (${c.industry})`,
            description,
            url: canonicalUrl,
            type: 'article',
            locale: 'en_ID',
            images: [
                {
                    url: c.image,
                    width: 1200,
                    height: 630,
                    alt: `${c.client} project case study`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `Our Projects: ${c.client} (${c.industry})`,
            description,
            images: [c.image],
        },
        alternates: {
            canonical: canonicalUrl,
            languages: {
                'en-ID': canonicalUrl,
                'id-ID': canonicalUrl,
                'x-default': canonicalUrl,
            },
        },
    };
}

export default async function CaseStudyDetailPage({ params }: Props) {
    const { slug } = await params;
    const c = projects.find(cs => cs.id === slug);
    if (!c) notFound();
    const narrative = buildNarrativeParts(c.desc);

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dimensiwahyudi.com/' },
            { '@type': 'ListItem', position: 2, name: 'Our Projects', item: 'https://dimensiwahyudi.com/our-projects' },
            { '@type': 'ListItem', position: 3, name: c.client, item: `https://dimensiwahyudi.com/our-projects/${slug}` },
        ],
    };
    const caseStudySchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: `${c.client} - ${c.industry} Project Case Study`,
        description: c.desc,
        image: c.image,
        inLanguage: 'en-ID',
        datePublished: '2024-01-01',
        dateModified: '2024-01-01',
        mainEntityOfPage: `https://dimensiwahyudi.com/our-projects/${slug}`,
        articleSection: 'Industrial Project Portfolio',
        author: {
            '@type': 'Organization',
            name: 'PT Dimensi Quantum Wahyudi',
        },
        publisher: {
            '@type': 'Organization',
            name: 'PT Dimensi Quantum Wahyudi',
            logo: {
                '@type': 'ImageObject',
                url: 'https://dimensiwahyudi.com/logo.png',
            },
        },
        about: c.industry,
    };

    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }} />

            {/* EDITORIAL HEADER */}
            <section className="relative overflow-hidden bg-slate-950 pt-28 pb-10 md:pb-12">
                <div
                    className="absolute inset-0 opacity-[0.05]"
                    style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
                />
                <div className="absolute -left-24 top-24 h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl" />
                <div className="absolute -right-24 bottom-8 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" />

                <div className="relative max-w-6xl mx-auto px-6">
                    <Link href="/our-projects" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors">
                        <ArrowLeft size={16} /> Back to Gallery
                    </Link>

                    <div className="mt-7 grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
                        <div>
                            <div className="flex flex-wrap items-center gap-3 mb-5">
                                <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-xs font-bold uppercase tracking-wider">
                                    {c.industry}
                                </span>
                                <span className="flex items-center gap-1.5 text-slate-500 text-xs">
                                    <Clock size={12} /> 2024
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.05] tracking-tight">
                                {c.client}
                            </h1>

                            <p className="mt-5 max-w-2xl text-slate-300 leading-relaxed text-base md:text-lg">
                                Engineered material-handling deployment tailored for real production constraints, with stronger ergonomic control and stable throughput on repetitive transfer operations.
                            </p>

                            <div className="mt-6 flex flex-wrap items-center gap-5 text-slate-300 text-sm">
                                <span className="flex items-center gap-1.5"><MapPin size={14} /> Indonesia</span>
                                <span className="flex items-center gap-1.5"><Package size={14} /> Integrated Handling Solution</span>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400 font-black">Project Snapshot</p>
                            <dl className="mt-3 space-y-2 text-sm">
                                <div>
                                    <dt className="text-slate-500">Client</dt>
                                    <dd className="text-white font-semibold">{c.client}</dd>
                                </div>
                                <div>
                                    <dt className="text-slate-500">Industry</dt>
                                    <dd className="text-white font-semibold">{c.industry}</dd>
                                </div>
                                <div>
                                    <dt className="text-slate-500">Scope</dt>
                                    <dd className="text-white font-semibold">Facility Handling Upgrade</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-gradient-to-b from-slate-100 to-white border-y border-slate-200">
                <div className="max-w-6xl mx-auto px-6 py-7 md:py-10">
                    <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
                        <div className="rounded-3xl border border-slate-200 bg-white p-2 md:p-3 shadow-sm">
                            <div className="relative h-[260px] md:h-[420px] overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_20%_20%,#dbeafe_0%,#e2e8f0_45%,#f8fafc_100%)]">
                                <Image
                                    src={c.image}
                                    alt={`${c.client} project visual`}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 900px"
                                    className="object-contain p-2 md:p-4"
                                    priority
                                />
                            </div>
                        </div>

                        <article className="rounded-3xl border border-slate-200 bg-white p-6 md:p-7 shadow-sm">
                            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400 font-black">Why This Matters</p>
                            <h2 className="mt-2 text-2xl font-black text-slate-900 leading-tight">Operational performance with safer repetitive handling.</h2>
                            <p className="mt-4 text-slate-600 leading-relaxed text-sm md:text-base">
                                The implementation combines ergonomic lifting support and handling precision to reduce physical strain risk, keep process quality stable, and maintain output consistency in real factory conditions.
                            </p>
                            <Link
                                href="/contact"
                                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
                            >
                                Discuss Similar Project <ArrowRight size={15} />
                            </Link>
                        </article>
                    </div>
                </div>
            </section>

            {/* CONTENT */}
            <div className="max-w-6xl mx-auto px-6 py-14 md:py-16">
                <div className="grid lg:grid-cols-3 gap-10 xl:gap-12">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8 md:space-y-10">
                        <div>
                            <span className="text-xs font-black text-cyan-500 uppercase tracking-widest">Overview</span>
                            <h2 className="text-2xl font-black text-slate-900 mt-2 mb-4">Project Background</h2>
                            <p className="text-slate-600 leading-relaxed text-lg">{narrative.challenge}</p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                            <article className="rounded-2xl border border-slate-200 bg-white p-5">
                                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">Challenge</p>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600">{narrative.challenge}</p>
                            </article>
                            <article className="rounded-2xl border border-slate-200 bg-white p-5">
                                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-600">Solution</p>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600">{narrative.solution}</p>
                            </article>
                            <article className="rounded-2xl border border-slate-200 bg-white p-5">
                                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-600">Result</p>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600">{narrative.result}</p>
                            </article>
                        </div>

                        <div className="flex items-start gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-200">
                            <CheckCircle size={20} className="text-blue-600 shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <span className="text-lg md:text-xl font-black text-blue-600">Handling System Installed</span>
                                <p className="text-slate-500 text-sm mt-1">
                                    Completed installation and verified safe operation aligned with ergonomic production-floor standards for the {c.industry} industry.
                                </p>
                            </div>
                        </div>

                        <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl">
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Interested in a Similar Project Scale?</h3>
                            <p className="text-slate-500 mb-4">Discuss your {c.industry} handling requirements with our sales engineering team and get a complete technical proposal.</p>
                            <Link href="/contact" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold transition-colors">
                                Discuss Similar Project <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
                        <div className="bg-slate-950 rounded-2xl p-6 text-white">
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
                                    Discuss Similar Project
                                </Link>
                                <a href="https://wa.me/6281119168752" target="_blank" rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-sm transition-colors">
                                    Chat WhatsApp
                                </a>
                            </div>
                        </div>

                        <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl">
                            <h3 className="text-xl font-black text-white mb-4">More Projects</h3>
                            <div className="space-y-4">
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
                    </aside>
                </div>
            </div>

            <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 backdrop-blur lg:hidden">
                <div className="mx-auto flex max-w-6xl items-center gap-2">
                    <Link
                        href="/contact"
                        className="inline-flex flex-1 items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                    >
                        Discuss Similar Project
                    </Link>
                    <a
                        href="https://wa.me/6281119168752"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
                    >
                        Chat WhatsApp
                    </a>
                </div>
            </div>
        </main>
    );
}
