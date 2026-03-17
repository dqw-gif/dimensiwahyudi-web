import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SolidGlossaryIcon } from '../../../../components/icons/ErgonomicsSolidIcons';

export const metadata: Metadata = {
  title: 'Industrial Ergonomics Glossary | Key Terms for Manufacturing Teams',
  description:
    'A practical glossary of ergonomics terms for industrial engineers, procurement teams, and plant managers.',
  keywords: [
    'glosarium ergonomi industri',
    'istilah ergonomi manufaktur',
    'definisi msd',
    'manual handling definition',
    'ergonomic risk terms',
    'istilah k3 ergonomi',
    'kamus ergonomi pabrik',
    'ergonomi indonesia',
  ],
  alternates: {
    canonical: 'https://dimensiwahyudi.com/news/ergonomics/glossary',
  },
};

const roleUsage = [
  {
    role: 'Engineering Team',
    use: 'Align technical discussion on load profile, workstation design, and control options.',
  },
  {
    role: 'Procurement Team',
    use: 'Evaluate requirement scope and compare ergonomic solution proposals consistently.',
  },
  {
    role: 'Plant and HSE Team',
    use: 'Standardize language for risk review, training, and implementation decisions.',
  },
];

const terms = [
  {
    term: 'Ergonomics',
    def: 'The discipline of adapting work, tools, and environment to human capability to improve safety, comfort, and performance.',
  },
  {
    term: 'Musculoskeletal Disorders (MSDs)',
    def: 'Injuries or disorders affecting muscles, joints, tendons, and related structures, often linked to repetitive strain and awkward posture.',
  },
  {
    term: 'Manual Handling',
    def: 'Lifting, carrying, pushing, pulling, or moving loads by human effort, with varying physical risk depending on weight and frequency.',
  },
  {
    term: 'Repetitive Strain',
    def: 'Cumulative physical stress from repeating similar motions over time, potentially reducing comfort and control quality.',
  },
  {
    term: 'Awkward Posture',
    def: 'Body positioning that places joints outside neutral alignment, increasing fatigue and risk of long-term strain.',
  },
  {
    term: 'Engineering Control',
    def: 'A technical intervention that reduces hazard exposure at the source, such as lifting assistance and ergonomic handling systems.',
  },
  {
    term: 'Cycle Time',
    def: 'The total time required to complete one operational handling cycle in a process.',
  },
  {
    term: 'ROI (Return on Investment)',
    def: 'A financial metric used to evaluate whether gains from ergonomic investment justify the implementation cost.',
  },
  {
    term: 'Workstation Design',
    def: 'Layout and equipment configuration designed to support safe posture, efficient motion, and consistent output quality.',
  },
  {
    term: 'Fatigue Management',
    def: 'Operational strategies to reduce physical and mental exhaustion that can affect safety and productivity.',
  },
];

export default function ErgonomicsGlossaryPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <div className="relative z-10 pt-32 pb-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <nav>
          <Link href="/news/ergonomics" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">
            <ArrowLeft size={16} /> Back to Ergonomics Hub
          </Link>
        </nav>

        <section className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5F7F99] to-[#2F4E67] border border-[#3F617A]/40 text-white flex items-center justify-center shadow-[0_10px_24px_-10px_rgba(47,78,103,0.85)] ring-1 ring-white/20">
              <SolidGlossaryIcon className="w-4.5 h-4.5" />
            </div>
            <p className="text-xs font-bold text-[#3F617A] uppercase tracking-[0.2em]">Reference Page</p>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-5">Industrial ergonomics glossary</h1>
          <p className="text-slate-600 text-lg leading-relaxed max-w-3xl">
            A practical reference to align understanding across engineering, procurement, HSE, and operations teams.
            Use this page as a shared baseline for ergonomics planning discussions.
          </p>
        </section>

        <section className="grid gap-4">
          {terms.map((item) => (
            <article key={item.term} className="bg-white border border-slate-200 rounded-2xl p-6">
              <h2 className="text-xl font-black text-slate-900 mb-2">{item.term}</h2>
              <p className="text-slate-600 leading-relaxed">{item.def}</p>
            </article>
          ))}
        </section>

        <section className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm">
          <p className="text-xs font-bold text-[#3F617A] uppercase tracking-[0.2em] mb-2">How To Use This Glossary</p>
          <h2 className="text-2xl font-black text-slate-900 mb-6">Apply a shared vocabulary across teams</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {roleUsage.map((item) => (
              <article key={item.role} className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <h3 className="font-black text-slate-900 mb-2">{item.role}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.use}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-slate-900 text-white rounded-3xl p-8 md:p-10 border border-slate-800">
          <h2 className="text-3xl font-black mb-4">Need guidance for your specific application?</h2>
          <p className="text-slate-300 leading-relaxed mb-7 max-w-3xl">
            Our team can translate ergonomics principles into practical handling recommendations for your process.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className="px-6 py-3 bg-[#3F617A] hover:bg-[#2F4E67] rounded-xl font-bold transition-colors">
              Request Consultation
            </Link>
            <Link href="/digital-assistant/selection-aids" className="px-6 py-3 bg-white/10 border border-white/20 hover:bg-white/20 rounded-xl font-bold transition-colors">
              Open Selection Aids
            </Link>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-4">
          <Link href="/news/ergonomics/health-risks" className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-300 transition-colors">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Related Topic</p>
            <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">Health risks and diseases</h3>
            <p className="text-slate-600 mt-2">Review high-impact health risks in manual handling operations.</p>
            <span className="mt-4 inline-flex items-center gap-2 font-bold text-blue-600">Open topic <ArrowRight size={14} /></span>
          </Link>
          <Link href="/news/ergonomics/productivity" className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-300 transition-colors">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Related Topic</p>
            <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">Ergonomics and productivity</h3>
            <p className="text-slate-600 mt-2">Connect ergonomics strategy with measurable business outcomes.</p>
            <span className="mt-4 inline-flex items-center gap-2 font-bold text-blue-600">Open topic <ArrowRight size={14} /></span>
          </Link>
        </section>
      </div>
    </main>
  );
}
