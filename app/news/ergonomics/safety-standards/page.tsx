import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ShieldCheck, FileCheck2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Occupational Safety and Ergonomics Standards | Industrial Ergonomics',
  description:
    'Practical safety and ergonomics guidance for industrial teams: compliance mindset, preventive controls, and implementation priorities.',
  alternates: {
    canonical: 'https://dimensiwahyudi.com/news/ergonomics/safety-standards',
  },
};

const principles = [
  'Prioritize preventive controls before relying on behavioral correction',
  'Design handling steps to minimize awkward posture and repetitive overload',
  'Use engineered assistance for heavy, repetitive, or precision-critical tasks',
  'Standardize safe handling workflow across shifts and operator groups',
];

export default function ErgonomicsSafetyStandardsPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <div className="relative z-10 pt-32 pb-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <nav>
          <Link href="/news/ergonomics" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">
            <ArrowLeft size={16} /> Back to Ergonomics Hub
          </Link>
        </nav>

        <section className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-3">Compliance Perspective</p>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-5">Occupational safety and ergonomics standards</h1>
            <p className="text-slate-600 text-lg leading-relaxed">
              Safety excellence is achieved when ergonomic controls are embedded into the actual workflow. Standards are
              not checklists alone, they are operational design principles that protect people and performance.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-3xl p-3 shadow-sm">
            {/* DEV: Ganti dengan visual compliance/safety audit di lingkungan manufaktur */}
            <Image
              src="/placeholders/ergonomics-placeholder.svg"
              alt="Safety standards visual placeholder"
              width={1600}
              height={900}
              className="w-full h-auto rounded-2xl"
              priority
            />
          </div>
        </section>

        <section className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
              <FileCheck2 size={18} />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Implementation principles for safer handling</h2>
          </div>
          <ul className="grid md:grid-cols-2 gap-4">
            {principles.map((item) => (
              <li key={item} className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-700 leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-8">
            <h3 className="text-xl font-black text-slate-900 mb-3">Risk control hierarchy in practice</h3>
            <p className="text-slate-600 leading-relaxed">
              The strongest ergonomic programs prioritize technical mitigation at the process level. This helps reduce
              dependency on individual behavior while improving repeatable safety outcomes.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-3xl p-8">
            <h3 className="text-xl font-black text-slate-900 mb-3">Documentation and continuous review</h3>
            <p className="text-slate-600 leading-relaxed">
              Use incident data, near-miss patterns, and workstation feedback as input for periodic ergonomics and
              handling process improvements.
            </p>
          </div>
        </section>

        <section className="bg-slate-900 text-white rounded-3xl p-8 md:p-10 border border-slate-800">
          <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-[0.2em] mb-3">
            <ShieldCheck size={14} /> Recommended Next Step
          </div>
          <h2 className="text-3xl font-black mb-4">Map your safety-critical handling points with our team</h2>
          <p className="text-slate-300 leading-relaxed mb-7 max-w-3xl">
            We can help your team identify where ergonomic assistance is most impactful for both safety performance and
            operational reliability.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-colors">
              Request Safety-Focused Consultation
            </Link>
            <Link href="/products/schmalz" className="px-6 py-3 bg-white/10 border border-white/20 hover:bg-white/20 rounded-xl font-bold transition-colors">
              Explore Handling Solutions
            </Link>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-4">
          <Link href="/news/ergonomics/productivity" className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-300 transition-colors">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Related Topic</p>
            <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">Ergonomics and productivity</h3>
            <p className="text-slate-600 mt-2">Connect safety initiatives with throughput and quality performance.</p>
            <span className="mt-4 inline-flex items-center gap-2 font-bold text-blue-600">Open topic <ArrowRight size={14} /></span>
          </Link>
          <Link href="/news/ergonomics/glossary" className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-300 transition-colors">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Next Topic</p>
            <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">Ergonomics glossary</h3>
            <p className="text-slate-600 mt-2">Quick-reference terms for cross-functional team alignment.</p>
            <span className="mt-4 inline-flex items-center gap-2 font-bold text-blue-600">Open topic <ArrowRight size={14} /></span>
          </Link>
        </section>
      </div>
    </main>
  );
}
