import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Apple, Beaker, Car, Package, Factory, HardHat, Cpu, Layers, ChevronRight, ArrowRight } from 'lucide-react';
import { industries, IndustryDef } from '../../data/industries';

export const metadata: Metadata = {
  title: 'Industrial Handling Solutions by Sector | PT Dimensi Quantum Wahyudi',
  description: 'Discover how Schmalz vacuum lifting technology transforms productivity and ergonomics across Food & Beverage, Automotive, Logistics, and more.',
};

const getIcon = (type: IndustryDef['iconType']) => {
  switch (type) {
    case 'food': return <Apple size={32} />;
    case 'flask': return <Beaker size={32} />;
    case 'car': return <Car size={32} />;
    case 'box': return <Package size={32} />;
    case 'hard-hat': return <HardHat size={32} />;
    case 'cpu': return <Cpu size={32} />;
    case 'factory':
    default: return <Factory size={32} />;
  }
};

export default function IndustriesIndexPage() {
  return (
    <main className="min-h-screen bg-slate-50 selection:bg-cyan-500 selection:text-white">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'linear-gradient(rgba(99,179,237,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,0.3) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Layers size={14} /> Solusi Spesifik Lini Produksi
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight mb-6 max-w-4xl mx-auto">
            Vacuum Handling Solutions for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Every Industry</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto mb-10">
            From sterile pharmaceutical clean-rooms to abrasive metal stamping facilities, our ergonomic lifters are engineered specifically to conquer your sector&apos;s toughest handling challenges.
          </p>
        </div>
      </section>

      {/* INDUSTRIES GRID */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((ind) => (
              <Link 
                href={`/industries/${ind.slug}`} 
                key={ind.slug}
                className="group relative bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-2xl hover:border-blue-300 hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col h-full"
              >

                <div className="relative z-10 flex-1">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-blue-100 bg-blue-50 text-blue-600">
                    {getIcon(ind.iconType)}
                  </div>
                  <h2 className="text-xl font-black text-slate-900 mb-3">{ind.name}</h2>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">{ind.tagline}</p>
                </div>

                <div className="relative z-10 mt-auto pt-6 border-t border-slate-100 flex items-center justify-between font-bold text-sm text-slate-400 group-hover:text-blue-600 transition-colors">
                  View Solutions
                  <ArrowRight size={16} className="-translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* BOT CTA */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Don&apos;t see your industry listed?</h2>
            <p className="text-slate-500 mb-8">Schmalz vacuum technology is highly modular. Contact our engineers to design a custom lifting solution for your unique material handling challenge.</p>
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-blue-600/25">
                Consult an Engineer Fast
            </Link>
        </div>
      </section>
    </main>
  );
}
