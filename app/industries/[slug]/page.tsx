import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ChevronRight, ArrowRight, Zap, AlertCircle, CheckCircle2 } from 'lucide-react';
import { industries, getRecommendedProducts, IndustryDef } from '../../../data/industries';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return industries.map(ind => ({ slug: ind.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = industries.find(i => i.slug === slug);
  if (!industry) return { title: 'Industry Not Found' };
  return {
    title: `Vacuum Handling Solutions for ${industry.name} | PT Dimensi Quantum Wahyudi`,
    description: industry.description.slice(0, 160),
  };
}

export default async function IndustryDetailPage({ params }: Props) {
  const { slug } = await params;
  const industry = industries.find(i => i.slug === slug);

  if (!industry) notFound();

  const recommendedLifters = getRecommendedProducts(industry.recommendedProducts);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className="relative pt-32 pb-24 bg-slate-950 overflow-hidden">
        {industry.imageUrl && (
          <img 
             src={industry.imageUrl}
             alt={industry.name}
             className="absolute inset-0 w-full h-full object-cover object-center opacity-30"
          />
        )}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        <div className={`absolute inset-0 bg-gradient-to-br ${industry.heroColor} opacity-70`} />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-slate-500 text-xs mb-8 flex-wrap">
            <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/industries" className="hover:text-blue-400 transition-colors">Industries</Link>
            <ChevronRight size={12} />
            <span className="text-slate-300 font-bold">{industry.name}</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-white text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
               Industry Focus
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-6">
              <span className="text-slate-400 font-light block text-2xl md:text-3xl mb-2">Handling Solutions for</span>
              {industry.name}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 font-medium leading-relaxed max-w-3xl">
              {industry.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
          
          {/* Overview */}
          <div>
            <h2 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-3">Industry Overview</h2>
            <h3 className="text-3xl font-black text-slate-900 mb-6">Overcoming Physical Constraints</h3>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              {industry.description}
            </p>
            
            <a href="#solutions" className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-slate-900/25 gap-2">
              See Recommended Equipment <ArrowRight size={18} />
            </a>
          </div>

          {/* Pain Points */}
          <div className="bg-slate-50 border border-slate-200 p-8 md:p-10 rounded-3xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600"><AlertCircle size={24}/></div>
              <h3 className="text-2xl font-black text-slate-900">Common Pain Points</h3>
            </div>
            <ul className="space-y-6">
              {industry.painPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="mt-1 shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-xs font-black">{idx + 1}</div>
                  <p className="text-slate-700 font-medium leading-relaxed">{point}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* RECOMMENDED SOLUTIONS */}
      <section id="solutions" className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
             <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Recommended Schmalz Lifters</h2>
             <p className="text-slate-600 text-lg">Our engineering team has identified these vacuum tube lifters as the optimal configurations for the unique demands of the <strong>{industry.name}</strong> sector.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendedLifters.map((product) => (
              <Link href={`/products/schmalz/vacuum-tube-lifter/${product.slug}`} key={product.slug} className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:border-blue-300 hover:-translate-y-2 transition-all duration-300 flex flex-col">
                <div className="h-56 bg-slate-50 p-6 relative flex flex-col justify-between border-b border-slate-100">
                  {product.imageUrl ? (
                    <Image src={product.imageUrl} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                  ) : (
                    <Zap className="absolute -bottom-4 -right-4 w-32 h-32 text-slate-200 opacity-50 group-hover:scale-110 transition-transform duration-500" />
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/10 to-transparent pointer-events-none" />

                  <div className="relative z-10 inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-600 rounded-md text-[10px] text-white font-black uppercase tracking-widest w-fit shadow-md">
                    {product.badge || 'Standard Series'}
                  </div>
                  <div className="relative z-10 mt-auto">
                    <h4 className="text-2xl font-black text-white drop-shadow-md">{product.seriesCode}</h4>
                    <p className="text-white/90 font-bold font-mono text-sm mt-1 drop-shadow-md">Cap: {product.capacity}</p>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-slate-600 text-sm mb-6 flex-1 line-clamp-3 leading-relaxed">{product.tagline}</p>
                  
                  <ul className="space-y-2 mb-6 text-sm text-slate-500">
                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Ideal for this industry</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Ergonomic Certification</li>
                  </ul>

                  <div className="w-full py-3 bg-slate-50 rounded-xl text-center text-sm font-bold text-slate-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    View Specifications
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
