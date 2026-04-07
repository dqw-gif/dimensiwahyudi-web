import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Activity, AlertTriangle, ArrowLeft, ArrowRight, TrendingDown } from 'lucide-react';
import ErgonomicsCaseStudies from '../../../../components/news/ErgonomicsCaseStudies';
import { SolidHealthIcon, SolidSafetyIcon, SolidWarningIcon, SolidCalculatorIcon } from '../../../../components/icons/ErgonomicsSolidIcons';
import { spacingTokens } from '../../../../constants/spacingTokens';

export const metadata: Metadata = {
  title: 'Health Risks in Manual Handling | Industrial Ergonomics',
  description:
    'Understand major health risks from non-ergonomic manual handling and how engineered lifting support helps reduce operator strain in industrial operations.',
  keywords: [
    'risiko ergonomi kerja',
    'penyakit akibat kerja angkat manual',
    'nyeri punggung operator produksi',
    'msd industri manufaktur indonesia',
    'kelelahan kerja operator',
    'ergonomi handling material',
    'alat bantu angkat pabrik',
    'kesehatan kerja manufaktur',
  ],
  alternates: {
    canonical: 'https://dimensiwahyudi.com/news/ergonomics/health-risks',
  },
};

const healthStats = [
  {
    stage: '01',
    label: 'Risk Task',
    value: 'High-Risk Zone',
    note: 'Repetitive lifting with awkward posture should be prioritized in the first intervention wave.',
    metricValue: 'P1',
    icon: AlertTriangle,
    accent: 'from-blue-700 to-cyan-500',
  },
  {
    stage: '02',
    label: 'Early Symptoms',
    value: '2–12 Weeks',
    note: 'Minor discomfort can escalate into recurring strain when task design remains unchanged.',
    metricValue: '2–12 wks',
    icon: Activity,
    accent: 'from-blue-600 to-sky-500',
  },
  {
    stage: '03',
    label: 'Business Loss',
    value: 'Output Drain',
    note: 'Health strain surfaces first as output variability, quality drift, and rising attendance pressure.',
    metricValue: 'Critical',
    icon: TrendingDown,
    accent: 'from-blue-700 to-blue-500',
  },
];

const bodyExposure = [
  {
    area: 'Lower back',
    note: 'Frequent strain during lifting from floor level and trunk rotation.',
    imageAlt: 'Dummy ergonomic illustration for lower back risk',
    imageSrc: '/body%20zones/Lower%20back.webp',
    accent: 'from-blue-700 to-cyan-500',
    badge: 'Highest Frequency',
  },
  {
    area: 'Shoulders and upper arms',
    note: 'Overload appears during overhead reach and repetitive object transfer.',
    imageAlt: 'Dummy ergonomic illustration for shoulder and upper arm risk',
    imageSrc: '/body%20zones/Shoulder%20and%20upper%20arms.webp',
    accent: 'from-blue-600 to-cyan-500',
    badge: 'Overhead Load',
  },
  {
    area: 'Elbow',
    note: 'Repetitive extension and load transfer can trigger tendon stress around the elbow.',
    imageAlt: 'Ergonomic illustration for elbow risk',
    imageSrc: '/body%20zones/Elbow.webp',
    accent: 'from-sky-600 to-blue-500',
    badge: 'Precision Stress',
  },
  {
    area: 'Neck and upper back',
    note: 'Static posture and frequent forward head position increase fatigue.',
    imageAlt: 'Ergonomic illustration for neck and upper back risk',
    imageSrc: '/body%20zones/Neck%20and%20upper%20back.webp',
    accent: 'from-cyan-600 to-blue-500',
    badge: 'Posture Drift',
  },
  {
    area: 'Hip',
    note: 'Uneven load transfer and frequent bending can increase hip joint pressure.',
    imageAlt: 'Ergonomic illustration for hip risk',
    imageSrc: '/body%20zones/hip.webp',
    accent: 'from-blue-500 to-sky-400',
    badge: 'Joint Pressure',
  },
  {
    area: 'Knee',
    note: 'Repeated squatting and lifting from low height can reduce knee comfort over shifts.',
    imageAlt: 'Ergonomic illustration for knee risk',
    imageSrc: '/body%20zones/knee.webp',
    accent: 'from-blue-700 to-sky-500',
    badge: 'Lower Joint Load',
  },
];

const bodyExposureByNoteLength = [...bodyExposure].sort((a, b) => b.note.length - a.note.length);

const riskItems = [
  {
    title: 'Lower back strain and recurring pain',
    desc: 'Often triggered by repetitive lifting and trunk rotation without load-assist support.',
    imageSrc: '/factory%20floors/imgi_61_64156f66f294_Icon_Ergonomie_R%C3%BCckenschmerzen_2025.webp',
    imageAlt: 'Factory-floor icon representing lower back ergonomic strain',
  },
  {
    title: 'Joint overload during awkward positioning',
    desc: 'Shoulder and elbow load spikes during off-axis object handling and poor reach angles.',
    imageSrc: '/factory%20floors/imgi_62_e9d1b153173a_Icon_Ergonomie_Gelenkbeschwerden_2025.webp',
    imageAlt: 'Factory-floor icon representing ergonomic joint overload',
  },
  {
    title: 'Physical exhaustion across long shifts',
    desc: 'Continuous force application accumulates fatigue and reduces handling precision over time.',
    imageSrc: '/factory%20floors/imgi_63_3d61795879c8_Icon_Ergonomie_Ersch%C3%B6pfung_2025.webp',
    imageAlt: 'Factory-floor icon representing ergonomic exhaustion risk',
  },
  {
    title: 'Cognitive load and mental pressure',
    desc: 'Sustained physical discomfort can degrade focus, consistency, and decision quality.',
    imageSrc: '/factory%20floors/imgi_64_d5dd52b41cf5_Icon_Ergonomie_psychische%20Belastungen_2025.webp',
    imageAlt: 'Factory-floor icon representing ergonomic mental load risk',
  },
];

export default function ErgonomicsHealthRisksPage() {
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
            <p className="text-[11px] sm:text-xs font-bold text-rose-600 uppercase tracking-[0.2em] mb-3">Health Perspective</p>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-[0.95] text-slate-900 mb-4 sm:mb-5 md:text-5xl">
              Health risks and diseases in manual handling operations
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
              Daily lifting, carrying, and repetitive handling can create a cumulative physical burden. Without ergonomic
              support, minor discomfort often develops into persistent musculoskeletal problems that affect people,
              attendance, and production continuity.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/digital-assistant/roi-calculator" className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-blue-700 transition-colors">
                <Activity className="w-4 h-4" /> Get Risk Assessment
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-600 shadow-sm hover:border-slate-300 hover:bg-slate-50 transition-colors">
                Discuss with Engineering
              </Link>
            </div>
          </div>
          <div className="relative lg:col-span-7 lg:min-h-[420px] mt-2 md:mt-0">
            <Image
              src="/top.webp"
              alt="Factory floor health-risk visual"
              width={1600}
              height={900}
              className="h-auto w-full max-w-[420px] sm:max-w-[560px] md:max-w-[680px] object-contain object-center lg:absolute lg:bottom-[-4rem] lg:right-0 lg:z-20 lg:translate-x-3"
              priority
            />
          </div>
        </section>

        <section className={`bg-white border border-slate-200 rounded-3xl ${spacingTokens.card.feature} shadow-sm`}>
          <div className="flex items-center gap-3 mb-4 sm:mb-5">
            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center">
              <SolidWarningIcon className="w-4.5 h-4.5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">Common risk patterns on factory floors</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {riskItems.map((item) => (
              <article key={item.title} className="group rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold leading-tight text-slate-900">{item.title}</h3>
                    <p className="mt-1.5 text-[11px] sm:text-xs leading-relaxed text-slate-600">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={`bg-white border border-slate-200 rounded-3xl ${spacingTokens.card.feature} shadow-sm`}>
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center">
              <SolidHealthIcon className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600">Impact Storyline</p>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">Health impact infographic snapshot</h2>
            </div>
          </div>

          {/* Infographic: 3 clean stage cards + SVG arrows between them */}
          <div className="flex flex-col lg:flex-row items-stretch gap-0">
            {healthStats.map((item, index) => {
              const riskPct = index === 0 ? 85 : index === 1 ? 55 : 90;
              const riskColor = index === 0 ? 'text-rose-600' : index === 1 ? 'text-amber-500' : 'text-red-600';
              const riskBarColor = index === 0 ? 'bg-rose-500' : index === 1 ? 'bg-amber-400' : 'bg-red-500';
              const stageRingColor = index === 0 ? 'border-blue-600 text-blue-700 bg-blue-50' : index === 1 ? 'border-sky-500 text-sky-700 bg-sky-50' : 'border-blue-700 text-blue-800 bg-blue-50';
              const accentLine = index === 0 ? 'bg-gradient-to-r from-blue-700 to-cyan-500' : index === 1 ? 'bg-gradient-to-r from-blue-600 to-sky-500' : 'bg-gradient-to-r from-blue-700 to-blue-500';

              return (
                <div key={item.label} className="flex lg:flex-1 flex-col lg:flex-row items-stretch">
                  {/* Card */}
                  <article className="flex-1 group rounded-2xl border border-slate-200 bg-white p-6 hover:border-blue-300 hover:shadow-md transition-all duration-200 flex flex-col gap-4">

                    {/* Top row: stage ring + icon + KPI badge */}
                    <div className="flex items-center justify-between">
                      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full border-2 text-sm font-black ${stageRingColor}`}>
                        {item.stage}
                      </div>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-500">
                        <item.icon className="w-3 h-3" />
                        {item.label}
                      </span>
                    </div>

                    {/* Big stat */}
                    <div>
                      <p className="text-2xl font-black leading-tight text-slate-900 tracking-tight">{item.value}</p>
                      <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">{item.note}</p>
                    </div>

                    {/* Risk level bar */}
                    <div className="mt-auto space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-[0.16em] font-bold text-slate-400">Risk Level</span>
                        <span className={`text-[11px] font-black ${riskColor}`}>{riskPct}%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                        <div className={`h-full rounded-full ${riskBarColor} transition-all duration-500`} style={{ width: `${riskPct}%` }} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-slate-400">KPI</span>
                        <span className="text-[10px] font-black text-blue-700">{item.metricValue}</span>
                      </div>
                    </div>

                    {/* Accent bottom line */}
                    <div className={`h-0.5 rounded-full ${accentLine}`} />
                  </article>

                  {/* Arrow connector between cards (desktop only, not after last) */}
                  {index < healthStats.length - 1 && (
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

          {/* Bottom summary stats */}
          <div className="mt-5 grid grid-cols-3 divide-x divide-slate-100 rounded-2xl border border-slate-100 bg-slate-50/70 overflow-hidden">
            {[
              { label: 'Body Zones At Risk', value: '6', unit: 'zones' },
              { label: 'Avg. Symptom Onset', value: '2–12', unit: 'weeks' },
              { label: 'Throughput Impact', value: 'High', unit: 'priority' },
            ].map((stat) => (
              <div key={stat.label} className="px-4 py-3.5 text-center">
                <p className="text-xl font-black text-slate-900 leading-none">{stat.value}</p>
                <p className="text-[9px] uppercase tracking-[0.18em] font-bold text-blue-500 mt-0.5">{stat.unit}</p>
                <p className="text-[10px] text-slate-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          <p className="mt-3 text-[11px] text-slate-400 leading-relaxed">
            Replace risk levels with your internal EHS and attendance data.
          </p>
        </section>

        <section className={`relative overflow-hidden bg-white border border-slate-200 rounded-3xl ${spacingTokens.card.feature} shadow-sm`}>
          <div aria-hidden className="pointer-events-none absolute -left-12 -top-12 h-44 w-44 rounded-full bg-blue-200/35 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -right-16 -bottom-16 h-52 w-52 rounded-full bg-cyan-200/35 blur-3xl" />
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
              <SolidSafetyIcon className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600">Risk Heatmap</p>
              <h2 className="text-2xl font-black text-slate-900">Most exposed body zones in repetitive handling</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-fr">
            {bodyExposureByNoteLength.map((item, index) => {
              const cardPlacement =
                index === 0
                  ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2'
                  : index === 1
                    ? 'lg:col-start-3 lg:row-start-1'
                    : index === 2
                      ? 'lg:col-start-3 lg:row-start-2'
                      : index === 3
                        ? 'lg:col-start-1 lg:row-start-3'
                        : index === 4
                          ? 'lg:col-start-2 lg:row-start-3'
                          : 'lg:col-start-3 lg:row-start-3';

              const isHero = index === 0;

              return (
                <article
                  key={item.area}
                  className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/95 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${cardPlacement}`}
                >
                  <div className="absolute inset-x-0 top-0 h-1.5">
                    <div className={`h-full w-full bg-gradient-to-r ${item.accent}`} />
                  </div>
                  <div className="relative aspect-square bg-slate-100">
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/35 to-slate-900/10" />
                    <p className="absolute left-3 top-3 rounded-lg border border-white/25 bg-slate-900/65 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                      Exposure Zone
                    </p>
                    <p className={`absolute right-3 top-3 rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white bg-gradient-to-r ${item.accent}`}>
                      {item.badge}
                    </p>
                    <div className={`absolute inset-x-3 bottom-3 rounded-2xl border border-white/20 bg-white/12 backdrop-blur-md ${isHero ? 'p-4 sm:p-5' : 'p-3'}`}>
                      <h3 className={`${isHero ? 'text-xl sm:text-2xl' : 'text-base'} font-extrabold tracking-tight text-white`}>
                        {item.area}
                      </h3>
                      <p className={`${isHero ? 'mt-2 text-sm sm:text-base group-hover:max-h-40' : 'mt-2 text-xs sm:text-sm group-hover:max-h-24'} max-h-0 overflow-hidden leading-relaxed text-slate-100/95 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0`}>
                        {item.note}
                      </p>
                      <div className="mt-3 h-1.5 w-20 overflow-hidden rounded-full bg-white/30">
                        <div className={`h-full w-full rounded-full bg-gradient-to-r ${item.accent}`} />
                      </div>
                    </div>
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.35),transparent_35%)]" />
                    </div>
                    <p className="absolute right-3 bottom-3 text-[10px] font-bold uppercase tracking-[0.14em] text-white/80">
                      {isHero ? 'Primary Focus' : 'Watch Zone'}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="mt-6 bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <p className="text-sm text-slate-600 leading-relaxed">
              Practical rule: if operators report discomfort in the same body region repeatedly, treat it as a process
              design signal, not an individual tolerance issue.
            </p>
          </div>
        </section>

        {/* UPGRADED CARDS WITH ICONS & STAT CHIPS (Matching Productivity style) */}
        <section className="grid lg:grid-cols-2 gap-6 lg:items-stretch">
          <div className={`bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col justify-between`}>
            <div>
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 border border-rose-200 text-rose-600">
                <SolidWarningIcon className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">Operational consequence</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Physical fatigue does not stay at the individual level. It influences handling speed, consistency, error
                rates, and workforce stability. Over time, this creates hidden costs through quality disruption and
                lost productive hours.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700 border border-rose-200">↑ Error Rate</span>
              <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 border border-slate-200">↓ Speed Output</span>
              <span className="inline-flex items-center rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700 border border-rose-200">↑ Absent Rate</span>
            </div>
          </div>
          <div className={`bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col justify-between`}>
            <div>
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 border border-blue-200 text-blue-600">
                <SolidHealthIcon className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">What ergonomics changes</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Engineered lifting assistance shifts physical load from operators to handling systems. This lowers strain,
                supports healthier working routines, and helps maintain consistent output quality across shifts.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-200">↓ Strain Load</span>
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">↑ Quality Output</span>
              <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-200">↓ Risk Exposure</span>
            </div>
          </div>
        </section>

        {/* 6. CASE STUDIES (Moved from above) */}
        <ErgonomicsCaseStudies topic="health" />

        <section className={`bg-slate-900 text-white rounded-3xl ${spacingTokens.card.feature} border border-slate-800`}>
          <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-[0.2em] mb-3">
            <SolidHealthIcon className="w-4 h-4" /> Recommended Next Step
          </div>
          <h2 className="text-3xl font-black mb-4">Assess your lifting risk and mitigation options</h2>
          <p className="text-slate-300 leading-relaxed mb-7 max-w-3xl">
            Discuss your handling profile with our engineering team and map where ergonomic support can reduce physical
            risk in your operation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-colors">
              Request Health-Risk Consultation
            </Link>
            <Link href="/digital-assistant/roi-calculator" className="px-6 py-3 bg-white/10 border border-white/20 hover:bg-white/20 rounded-xl font-bold transition-colors">
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
