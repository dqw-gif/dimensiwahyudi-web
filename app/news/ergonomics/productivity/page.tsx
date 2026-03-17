import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ErgonomicsCaseStudies from '../../../../components/news/ErgonomicsCaseStudies';
import {
  SolidProductivityIcon,
  SolidCalculatorIcon,
  SolidSafetyIcon,
} from '../../../../components/icons/ErgonomicsSolidIcons';

export const metadata: Metadata = {
  title: 'Ergonomics as a Productivity Lever | Industrial Ergonomics',
  description:
    'Learn how ergonomics contributes to throughput stability, error reduction, and better manpower utilization in manufacturing operations.',
  keywords: [
    'ergonomi dan produktivitas',
    'peningkatan throughput pabrik',
    'efisiensi handling material',
    'cycle time manufaktur',
    'reduksi error produksi',
    'optimasi tenaga kerja produksi',
    'alat angkat ergonomis indonesia',
    'roi ergonomi industri',
  ],
  alternates: {
    canonical: 'https://dimensiwahyudi.com/news/ergonomics/productivity',
  },
};

const kpiCards = [
  {
    title: 'Cycle Time Stability',
    value: 'Improves',
    note: 'Less fatigue-driven variability during repetitive handling windows.',
    icon: SolidProductivityIcon,
    color: 'text-blue-600 bg-blue-50 border-blue-200',
  },
  {
    title: 'Process Accuracy',
    value: 'Improves',
    note: 'Assisted control reduces small handling mistakes that trigger rework.',
    icon: SolidSafetyIcon,
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  },
  {
    title: 'Output Reliability',
    value: 'Improves',
    note: 'Operational performance remains more consistent across shifts.',
    icon: SolidProductivityIcon,
    color: 'text-violet-600 bg-violet-50 border-violet-200',
  },
];

const evaluationMetrics = [
  'Average cycle time before vs after implementation',
  'Shift-end speed drop compared to shift-start baseline',
  'Handling-related rework or defect frequency trend',
  'Absence and replacement manpower requirement trend',
];

const impactPoints = [
  {
    title: 'Higher process consistency',
    desc: 'Reduced fatigue supports stable handling quality across long shifts.',
  },
  {
    title: 'Lower avoidable errors',
    desc: 'Improved control and positioning reduce rework and handling-related defects.',
  },
  {
    title: 'Faster cycle execution',
    desc: 'Assisted lifting improves movement efficiency for repetitive tasks.',
  },
  {
    title: 'More resilient workforce',
    desc: 'Less physical burden helps teams sustain output over time.',
  },
];

export default function ErgonomicsProductivityPage() {
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
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-[0.2em] mb-3">Performance Perspective</p>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-5">Ergonomics as the foundation for maximum productivity</h1>
            <p className="text-slate-600 text-lg leading-relaxed">
              Ergonomics is not only a safety topic. It is an operational discipline that protects performance quality.
              When physical strain decreases, teams can execute tasks faster, cleaner, and more consistently.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-3xl p-3 shadow-sm">
            {/* DEV: Ganti dengan visual line produksi/logistik yang menunjukkan alur kerja efisien */}
            <Image
              src="/placeholders/ergonomics-placeholder.svg"
              alt="Productivity visual placeholder"
              width={1600}
              height={900}
              className="w-full h-auto rounded-2xl"
              priority
            />
          </div>
        </section>

        <section className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
              <SolidProductivityIcon className="w-4.5 h-4.5" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Productivity impacts you can measure</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {impactPoints.map((item) => (
              <article key={item.title} className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <h3 className="font-black text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <ErgonomicsCaseStudies topic="productivity" />

        <section className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
              <SolidProductivityIcon className="w-4.5 h-4.5" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Productivity infographic dashboard</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {kpiCards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.title} className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${card.color}`}>
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <p className="text-xs uppercase tracking-[0.16em] font-bold text-slate-500 mb-2">{card.title}</p>
                  <p className="text-2xl font-black text-slate-900 mb-2">{card.value}</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{card.note}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-8">
            <h3 className="text-xl font-black text-slate-900 mb-3">The hidden cost of non-ergonomic handling</h3>
            <p className="text-slate-600 leading-relaxed">
              Fatigue-driven slowdown, micro interruptions, and inconsistent execution are usually invisible in daily
              reporting, but they accumulate into significant annual productivity loss.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-3xl p-8">
            <h3 className="text-xl font-black text-slate-900 mb-3">A practical business case</h3>
            <p className="text-slate-600 leading-relaxed">
              Ergonomic handling systems can be evaluated with clear operational metrics: cycle time, error rate,
              absence trend, and manpower utilization efficiency.
            </p>
          </div>
        </section>

        <section className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm">
          <p className="text-xs font-bold text-emerald-600 uppercase tracking-[0.2em] mb-2">KPI Tracking Framework</p>
          <h2 className="text-2xl font-black text-slate-900 mb-6">How to quantify ergonomics impact in your plant</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {evaluationMetrics.map((metric) => (
              <div key={metric} className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-700 leading-relaxed">
                {metric}
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-4">
            {/* DEV: Jika ada data pilot project internal, tambahkan chart before/after di section ini. */}
            Tip: publish this section with before-after charts from your own implementation data for stronger credibility.
          </p>
        </section>

        <section className="bg-slate-900 text-white rounded-3xl p-8 md:p-10 border border-slate-800">
          <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-[0.2em] mb-3">
            <SolidProductivityIcon className="w-4 h-4" /> Recommended Next Step
          </div>
          <h2 className="text-3xl font-black mb-4">Model your potential productivity and ROI uplift</h2>
          <p className="text-slate-300 leading-relaxed mb-7 max-w-3xl">
            Use our digital calculator to estimate handling improvement potential based on your operating scenario.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/digital-assistant/vacuum-calculator" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-colors inline-flex items-center gap-2">
              <SolidCalculatorIcon className="w-4.5 h-4.5" /> Start Calculation
            </Link>
            <Link href="/contact" className="px-6 py-3 bg-white/10 border border-white/20 hover:bg-white/20 rounded-xl font-bold transition-colors">
              Request Productivity Assessment
            </Link>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-4">
          <Link href="/news/ergonomics/health-risks" className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-300 transition-colors">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Related Topic</p>
            <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">Health risks and diseases</h3>
            <p className="text-slate-600 mt-2">Understand operator strain patterns and preventive action points.</p>
            <span className="mt-4 inline-flex items-center gap-2 font-bold text-blue-600">Open topic <ArrowRight size={14} /></span>
          </Link>
          <Link href="/news/ergonomics/safety-standards" className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-300 transition-colors">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Next Topic</p>
            <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">Safety standards and compliance</h3>
            <p className="text-slate-600 mt-2">Connect ergonomic implementation with practical safety frameworks.</p>
            <span className="mt-4 inline-flex items-center gap-2 font-bold text-blue-600">Open topic <ArrowRight size={14} /></span>
          </Link>
        </section>
      </div>
    </main>
  );
}
