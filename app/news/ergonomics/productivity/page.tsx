import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Gauge, ScanLine, Repeat2, UserRoundMinus } from 'lucide-react';
import ErgonomicsCaseStudies from '../../../../components/news/ErgonomicsCaseStudies';
import {
  SolidProductivityIcon,
  SolidCalculatorIcon,
  SolidSafetyIcon,
  SolidWarningIcon,
} from '../../../../components/icons/ErgonomicsSolidIcons';
import { spacingTokens } from '../../../../constants/spacingTokens';

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
    stage: '01',
    title: 'Cycle Time Stability',
    value: 'Cycle Gains',
    note: 'Less fatigue-driven variability during repetitive handling windows.',
    icon: SolidProductivityIcon,
    metricValue: 'Faster',
    accent: 'from-blue-700 to-cyan-500',
  },
  {
    stage: '02',
    title: 'Process Accuracy',
    value: 'Error Drop',
    note: 'Assisted control reduces small handling mistakes that trigger rework.',
    icon: SolidSafetyIcon,
    metricValue: '↓ Rework',
    accent: 'from-emerald-600 to-teal-500',
  },
  {
    stage: '03',
    title: 'Output Reliability',
    value: 'Shift Stability',
    note: 'Operational performance remains more consistent across shifts.',
    icon: SolidProductivityIcon,
    metricValue: 'Stable',
    accent: 'from-blue-700 to-violet-500',
  },
];

const evaluationMetrics = [
  {
    metric: 'Average cycle time before vs after implementation',
    sublabel: 'Cycle Time Delta',
    icon: Gauge,
  },
  {
    metric: 'Shift-end speed drop compared to shift-start baseline',
    sublabel: 'Shift Performance Drop',
    icon: ScanLine,
  },
  {
    metric: 'Handling-related rework or defect frequency trend',
    sublabel: 'Rework Frequency',
    icon: Repeat2,
  },
  {
    metric: 'Absence and replacement manpower requirement trend',
    sublabel: 'Workforce Stability',
    icon: UserRoundMinus,
  },
];

const impactPoints = [
  {
    title: 'Higher process consistency',
    desc: 'Reduced fatigue supports stable handling quality across long shifts.',
    imageSrc: '/Productivity/imgi_151_37809a956c3e_Icon_Ergonomie_Produktivitaetsverlust_2025.webp',
    imageAlt: 'Ergonomic icon representing productivity loss from fatigue',
  },
  {
    title: 'Lower avoidable errors',
    desc: 'Improved control and positioning reduce rework and handling-related defects.',
    imageSrc: '/Productivity/imgi_148_f23f1e3eaebd_Icon_Ergonomie_Motivationsverlust_2025.webp',
    imageAlt: 'Ergonomic icon representing motivation and error reduction',
  },
  {
    title: 'Faster cycle execution',
    desc: 'Assisted lifting improves movement efficiency for repetitive tasks.',
    imageSrc: '/Productivity/imgi_142_6197315e365c_Icon_Ergonomie_Ineffizient_2025.webp',
    imageAlt: 'Ergonomic icon representing inefficiency in handling cycles',
  },
  {
    title: 'More resilient workforce',
    desc: 'Less physical burden helps teams sustain output over time.',
    imageSrc: '/Productivity/imgi_145_d75966cb42a2_Icon_Ergonomie_Hohe%20Kosten_2025.jpg',
    imageAlt: 'Ergonomic icon representing high cost from workforce strain',
  },
];

export default function ErgonomicsProductivityPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <div className={`${spacingTokens.page.shell} ${spacingTokens.page.containerNarrow} ${spacingTokens.page.stack}`}>
        <nav>
          <Link href="/news/ergonomics" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">
            <ArrowLeft size={16} /> Back to Ergonomics Hub
          </Link>
        </nav>

        <section className="grid items-end gap-4 lg:grid-cols-12 lg:gap-1">
          <div className="max-w-[520px] lg:col-span-5">
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-[0.2em] mb-3">Performance Perspective</p>
            <h1 className="text-4xl font-black tracking-tight leading-[0.95] text-slate-900 mb-5 sm:text-5xl">
              Ergonomics as the foundation for maximum productivity
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Ergonomics is not only a safety topic. It is an operational discipline that protects performance quality.
              When physical strain decreases, teams can execute tasks faster, cleaner, and more consistently.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/digital-assistant/roi-calculator" className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-blue-700 transition-colors">
                <SolidCalculatorIcon className="w-4 h-4" /> Calculate ROI Target
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-600 shadow-sm hover:border-slate-300 hover:bg-slate-50 transition-colors">
                Discuss with Engineering
              </Link>
            </div>
          </div>
          <div className="relative lg:col-span-7 lg:min-h-[420px]">
            <Image
              src="/diva1.webp"
              alt="Industrial productivity ergonomics visual"
              width={1600}
              height={900}
              className="h-auto w-full max-w-[680px] object-contain object-center lg:absolute lg:bottom-[-4rem] lg:right-0 lg:z-20 lg:translate-x-3"
              priority
            />
          </div>
        </section>

        {/* 2. PRODUCTIVITY IMPACTS */}
        <section className={`bg-white border border-slate-200 rounded-3xl ${spacingTokens.card.feature} shadow-sm`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
              <SolidProductivityIcon className="w-4.5 h-4.5" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Productivity impacts you can measure</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {impactPoints.map((item) => (
              <article key={item.title} className="group rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold leading-tight text-slate-900">{item.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{item.desc}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 3. INFOGRAPHIC DASHBOARD */}
        <section className={`bg-white border border-slate-200 rounded-3xl ${spacingTokens.card.feature} shadow-sm`}>
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
              <SolidProductivityIcon className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-600">Performance Storyline</p>
              <h2 className="text-2xl font-black text-slate-900">Productivity infographic dashboard</h2>
            </div>
          </div>

          {/* Infographic: 3 stage cards + SVG arrows */}
          <div className="flex flex-col lg:flex-row items-stretch gap-0">
            {kpiCards.map((item, index) => {
              const gainPct = index === 0 ? 72 : index === 1 ? 60 : 80;
              const gainColor = index === 0 ? 'text-blue-600' : index === 1 ? 'text-emerald-600' : 'text-violet-600';
              const gainBarColor = index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-emerald-500' : 'bg-violet-500';
              const stageRingColor = index === 0
                ? 'border-blue-600 text-blue-700 bg-blue-50'
                : index === 1
                ? 'border-emerald-500 text-emerald-700 bg-emerald-50'
                : 'border-violet-600 text-violet-700 bg-violet-50';
              const accentLine = index === 0
                ? 'bg-gradient-to-r from-blue-700 to-cyan-500'
                : index === 1
                ? 'bg-gradient-to-r from-emerald-600 to-teal-500'
                : 'bg-gradient-to-r from-blue-700 to-violet-500';
              const Icon = item.icon;

              return (
                <div key={item.title} className="flex lg:flex-1 flex-col lg:flex-row items-stretch">
                  {/* Card */}
                  <article className="flex-1 group rounded-2xl border border-slate-200 bg-white p-6 hover:border-emerald-300 hover:shadow-md transition-all duration-200 flex flex-col gap-4">

                    {/* Top row: stage ring + label badge */}
                    <div className="flex items-center justify-between">
                      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full border-2 text-sm font-black ${stageRingColor}`}>
                        {item.stage}
                      </div>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-500">
                        <Icon className="w-3 h-3" />
                        {item.title}
                      </span>
                    </div>

                    {/* Big stat */}
                    <div>
                      <p className="text-2xl font-black leading-tight text-slate-900 tracking-tight">{item.value}</p>
                      <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">{item.note}</p>
                    </div>

                    {/* Gain level bar */}
                    <div className="mt-auto space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-[0.16em] font-bold text-slate-400">Gain Level</span>
                        <span className={`text-[11px] font-black ${gainColor}`}>{gainPct}%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                        <div className={`h-full rounded-full ${gainBarColor} transition-all duration-500`} style={{ width: `${gainPct}%` }} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-slate-400">KPI</span>
                        <span className={`text-[10px] font-black ${gainColor}`}>{item.metricValue}</span>
                      </div>
                    </div>

                    {/* Accent bottom line */}
                    <div className={`h-0.5 rounded-full ${accentLine}`} />
                  </article>

                  {/* Arrow connector (desktop only, not after last) */}
                  {index < kpiCards.length - 1 && (
                    <div className="hidden lg:flex items-center justify-center w-10 shrink-0 text-slate-300">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom summary bar */}
          <div className="mt-5 grid grid-cols-3 divide-x divide-slate-100 rounded-2xl border border-slate-100 bg-slate-50/70 overflow-hidden">
            {[
              { label: 'Cycle Time Impact', value: '↑ 72%', unit: 'gain' },
              { label: 'Error Reduction', value: '↓ 60%', unit: 'rework' },
              { label: 'Shift Consistency', value: '↑ 80%', unit: 'stability' },
            ].map((stat) => (
              <div key={stat.label} className="px-4 py-3.5 text-center">
                <p className="text-xl font-black text-slate-900 leading-none">{stat.value}</p>
                <p className="text-[9px] uppercase tracking-[0.18em] font-bold text-emerald-500 mt-0.5">{stat.unit}</p>
                <p className="text-[10px] text-slate-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          <p className="mt-3 text-[11px] text-slate-400 leading-relaxed">
            Replace gain levels with your internal KPI and cycle time measurement data.
          </p>
        </section>

        {/* 4. HIDDEN COSTS & BUSINESS CASE (Upgraded with icons and stats) */}
        <section className="grid lg:grid-cols-2 gap-6 lg:items-stretch">
          <div className={`bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col justify-between`}>
            <div>
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 border border-amber-200 text-amber-600">
                <SolidWarningIcon className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">The hidden cost of non-ergonomic handling</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Fatigue-driven slowdown, micro interruptions, and inconsistent execution are usually invisible in daily
                reporting, but they accumulate into significant annual productivity loss.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 border border-slate-200">↓ Cycle Speed</span>
              <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 border border-amber-200">↑ Micro Interruptions</span>
            </div>
          </div>
          <div className={`bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col justify-between`}>
            <div>
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 border border-blue-200 text-blue-600">
                <SolidProductivityIcon className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">A practical business case</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Ergonomic handling systems can be evaluated with clear operational metrics: cycle time, error rate,
                absence trend, and manpower utilization efficiency.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">↑ Manpower Utilization</span>
              <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-200">↓ Absence Trend</span>
            </div>
          </div>
        </section>

        {/* 5. KPI TRACKING FRAMEWORK */}
        <section className={`bg-white border border-slate-200 rounded-3xl ${spacingTokens.card.feature} shadow-sm`}>
          <p className="text-xs font-bold text-emerald-600 uppercase tracking-[0.2em] mb-2">KPI Tracking Framework</p>
          <h2 className="text-2xl font-black text-slate-900 mb-6">How to quantify ergonomics impact in your plant</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {evaluationMetrics.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.metric}
                  className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-300 hover:shadow-sm transition-all duration-200 border-l-4 border-l-blue-600"
                >
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 transition-colors group-hover:bg-blue-100">
                    <Icon className="w-4.5 h-4.5" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-500 mb-1">{item.sublabel}</p>
                    <p className="text-slate-700 text-sm leading-relaxed font-medium">{item.metric}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-slate-400 mt-5 leading-relaxed">
            Tip: publish this section with before-after charts from your own implementation data for stronger credibility.
          </p>
        </section>

        {/* 6. CASE STUDIES */}
        <ErgonomicsCaseStudies topic="productivity" />

        <section className={`bg-slate-900 text-white rounded-3xl ${spacingTokens.card.feature} border border-slate-800`}>
          <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-[0.2em] mb-3">
            <SolidProductivityIcon className="w-4 h-4" /> Recommended Next Step
          </div>
          <h2 className="text-3xl font-black mb-4">Model your potential productivity and ROI uplift</h2>
          <p className="text-slate-300 leading-relaxed mb-7 max-w-3xl">
            Use our digital calculator to estimate handling improvement potential based on your operating scenario.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/digital-assistant/roi-calculator" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-colors inline-flex items-center gap-2">
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
