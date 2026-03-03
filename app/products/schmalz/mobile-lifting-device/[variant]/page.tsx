import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ArrowLeft, CheckCircle, Phone, Mail, ChevronRight, Shield } from 'lucide-react';
import { mobileLiftingVariants } from '../../../../../data/products/mobile-lifting';

interface Props { params: Promise<{ variant: string }> }

export async function generateStaticParams() {
    return mobileLiftingVariants.map(v => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { variant: slug } = await params;
    const v = mobileLiftingVariants.find(x => x.slug === slug);
    if (!v) return { title: 'Tidak Ditemukan' };
    return { title: `${v.name} | Mobile Lifting Devices Schmalz — PT Dimensi Quantum Wahyudi`, description: v.description.slice(0, 160) };
}

export default async function MobileLiftingVariantPage({ params }: Props) {
    const { variant: slug } = await params;
    const variant = mobileLiftingVariants.find(v => v.slug === slug);
    if (!variant) notFound();

    return (
        <main className="min-h-screen bg-white">
            <section className="relative pt-28 pb-14 bg-slate-950 overflow-hidden">
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'linear-gradient(rgba(99,179,237,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,0.3) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
                <div className={`absolute inset-0 bg-gradient-to-br ${variant.heroColor} opacity-20`} />
                <div className="relative max-w-7xl mx-auto px-6">
                    <nav className="flex items-center gap-2 text-slate-500 text-xs mb-8 flex-wrap">
                        <Link href="/products" className="hover:text-blue-400 transition-colors">Produk</Link>
                        <ChevronRight size={12} />
                        <Link href="/products/schmalz" className="hover:text-blue-400 transition-colors">Schmalz</Link>
                        <ChevronRight size={12} />
                        <Link href="/products/schmalz/mobile-lifting-device" className="hover:text-blue-400 transition-colors">Mobile Lifting</Link>
                        <ChevronRight size={12} />
                        <span className="text-slate-300">{variant.seriesCode}</span>
                    </nav>
                    {variant.badge && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-black uppercase tracking-widest mb-3">
                            {variant.badge}
                        </div>
                    )}
                    <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight mb-3">{variant.name}</h1>
                    <p className="text-cyan-400 font-bold text-lg max-w-2xl">{variant.tagline}</p>
                </div>
            </section>

            <section className="py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-3 gap-10">
                        <div className="lg:col-span-2 space-y-8">
                            {variant.imageUrl && (
                                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                                    <img src={variant.imageUrl} alt={variant.name} className="w-full h-72 object-cover" loading="lazy" />
                                </div>
                            )}
                            <div className="bg-white rounded-2xl border border-slate-200 p-8">
                                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-4">Deskripsi Produk</h2>
                                <div className="h-1 w-12 bg-cyan-600 rounded-full mb-6" />
                                <p className="text-slate-600 leading-relaxed">{variant.description}</p>
                                <div className="mt-6 flex items-start gap-3 p-4 bg-cyan-50 rounded-xl border border-cyan-100">
                                    <Shield className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                                    <div>
                                        <div className="text-xs font-black text-cyan-700 uppercase tracking-wider mb-1">Keunggulan Utama</div>
                                        <div className="text-slate-700 text-sm font-semibold">{variant.highlight}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl border border-slate-200 p-8">
                                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-4">Spesifikasi Teknis</h2>
                                <div className="h-1 w-12 bg-cyan-600 rounded-full mb-6" />
                                <div className="divide-y divide-slate-100">
                                    {variant.specs.map((s, i) => (
                                        <div key={i} className="flex items-center justify-between py-3.5">
                                            <span className="text-slate-500 text-sm font-medium">{s.label}</span>
                                            <span className="text-slate-900 text-sm font-bold text-right max-w-xs">{s.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl border border-slate-200 p-8">
                                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-4">Fitur Unggulan</h2>
                                <div className="h-1 w-12 bg-cyan-600 rounded-full mb-6" />
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {variant.features.map((f, i) => (
                                        <div key={i} className="flex items-start gap-3 p-3 bg-cyan-50/50 rounded-xl border border-cyan-100">
                                            <CheckCircle className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                                            <span className="text-slate-700 text-sm leading-relaxed">{f}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl border border-slate-200 p-8">
                                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-4">Aplikasi</h2>
                                <div className="h-1 w-12 bg-cyan-600 rounded-full mb-6" />
                                <div className="flex flex-wrap gap-3">
                                    {variant.applications.map((a, i) => (
                                        <span key={i} className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-700 text-sm font-medium">{a}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className={`rounded-2xl bg-gradient-to-br ${variant.heroColor} p-6 text-white shadow-lg`}>
                                <div className="text-xs font-bold uppercase tracking-widest mb-1 opacity-70">Kapasitas</div>
                                <div className="text-3xl font-black">{variant.capacity}</div>
                                <div className="mt-2 text-xs font-mono opacity-70">{variant.seriesCode}</div>
                            </div>
                            <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-24">
                                <h3 className="text-lg font-black text-slate-900 mb-1">Tertarik?</h3>
                                <p className="text-slate-500 text-sm mb-6">Konsultasikan kebutuhan Anda bersama engineer kami.</p>
                                <div className="flex flex-col gap-3">
                                    <a href="https://wa.me/6281119168752" target="_blank" rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3.5 rounded-xl transition-colors">
                                        <Phone size={17} /> Chat WhatsApp
                                    </a>
                                    <Link href="/about"
                                        className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition-colors">
                                        <Mail size={17} /> Minta Penawaran
                                    </Link>
                                </div>
                                <div className="mt-6 pt-6 border-t border-slate-100">
                                    <div className="text-xs text-slate-400 font-medium mb-3 uppercase tracking-wider">Varian Lain</div>
                                    {mobileLiftingVariants.filter(v => v.slug !== slug).map(v => (
                                        <Link key={v.slug} href={`/products/schmalz/mobile-lifting-device/${v.slug}`}
                                            className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors group/s">
                                            <div>
                                                <div className="text-slate-700 text-xs font-bold group-hover/s:text-cyan-700">{v.seriesCode}</div>
                                                <div className="text-slate-400 text-[10px]">{v.capacity}</div>
                                            </div>
                                            <ChevronRight size={12} className="text-slate-400" />
                                        </Link>
                                    ))}
                                    <Link href="/products/schmalz/mobile-lifting-device"
                                        className="flex items-center gap-1.5 py-2 px-3 text-xs font-bold text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors mt-1">
                                        Semua varian →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
