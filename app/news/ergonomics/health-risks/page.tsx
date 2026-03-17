import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, HeartPulse, ShieldAlert } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Health Risks in Manual Handling | Industrial Ergonomics',
  description:
    'Understand major health risks from non-ergonomic manual handling and how engineered lifting support helps reduce operator strain in industrial operations.',
  alternates: {
    canonical: 'https://dimensiwahyudi.com/news/ergonomics/health-risks',
  },
};

const riskItems = [
  'Lower back strain and recurring pain from repetitive lifting tasks',
  'Shoulder and elbow overload during awkward object positioning',
  'Wrist and grip fatigue caused by continuous force application',
  'Reduced concentration due to physical exhaustion over long shifts',
];

export default function ErgonomicsHealthRisksPage() {
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
            <p className="text-xs font-bold text-rose-600 uppercase tracking-[0.2em] mb-3">Health Perspective</p>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-5">Health risks and diseases in manual handling operations</h1>
            <p className="text-slate-600 text-lg leading-relaxed">
              Daily lifting, carrying, and repetitive handling can create a cumulative physical burden. Without ergonomic
              support, minor discomfort often develops into persistent musculoskeletal problems that affect people,
              attendance, and production continuity.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-3xl p-3 shadow-sm">
            {/* DEV: Ganti dengan foto operator handling beban manual berisiko postur */}
            <Image
              src="/placeholders/ergonomics-placeholder.svg"
              alt="Health risk visual placeholder"
              width={1600}
              height={900}
              className="w-full h-auto rounded-2xl"
              priority
            />
          </div>
        </section>

        <section className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center">
              <ShieldAlert size={18} />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Common risk patterns on factory floors</h2>
          </div>
          <ul className="grid md:grid-cols-2 gap-4">
            {riskItems.map((item) => (
              <li key={item} className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-700 leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-8">
            <h3 className="text-xl font-black text-slate-900 mb-3">Operational consequence</h3>
            <p className="text-slate-600 leading-relaxed">
              Physical fatigue does not stay at the individual level. It influences handling speed, consistency, error
              rates, and workforce stability. Over time, this creates hidden costs through quality disruption and lost
              productive hours.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-3xl p-8">
            <h3 className="text-xl font-black text-slate-900 mb-3">What ergonomics changes</h3>
            <p className="text-slate-600 leading-relaxed">
              Engineered lifting assistance shifts physical load from operators to handling systems. This lowers strain,
              supports healthier working routines, and helps maintain consistent output quality across shifts.
            </p>
          </div>
        </section>

        <section className="bg-slate-900 text-white rounded-3xl p-8 md:p-10 border border-slate-800">
          <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-[0.2em] mb-3">
            <HeartPulse size={14} /> Recommended Next Step
          </div>
          <h2 className="text-3xl font-black mb-4">Assess your lifting risk and mitigation options</h2>
          <p className="text-slate-300 leading-relaxed mb-7 max-w-3xl">
            Discuss your handling profile with our engineering team and map where ergonomic support can reduce physical
            risk in your operation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-colors">
              Request Technical Consultation
            </Link>
            <Link href="/digital-assistant/vacuum-calculator" className="px-6 py-3 bg-white/10 border border-white/20 hover:bg-white/20 rounded-xl font-bold transition-colors">
              Estimate ROI Impact
            </Link>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-4">
          <Link href="/news/ergonomics/productivity" className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-300 transition-colors">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Next Topic</p>
            <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">Ergonomics and productivity</h3>
            <p className="text-slate-600 mt-2">See how ergonomics improves throughput and lowers hidden process loss.</p>
            <span className="mt-4 inline-flex items-center gap-2 font-bold text-blue-600">Open topic <ArrowRight size={14} /></span>
          </Link>
          <Link href="/news/ergonomics/safety-standards" className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-300 transition-colors">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Related Topic</p>
            <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">Safety standards and compliance</h3>
            <p className="text-slate-600 mt-2">Explore practical safety frameworks for ergonomic implementation.</p>
            <span className="mt-4 inline-flex items-center gap-2 font-bold text-blue-600">Open topic <ArrowRight size={14} /></span>
          </Link>
        </section>
      </div>
    </main>
  );
}
