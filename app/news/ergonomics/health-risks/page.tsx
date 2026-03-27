import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ErgonomicsCaseStudies from '../../../../components/news/ErgonomicsCaseStudies';
import { SolidHealthIcon, SolidSafetyIcon, SolidWarningIcon } from '../../../../components/icons/ErgonomicsSolidIcons';
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
    metricLabel: 'Priority score',
    metricValue: 'P1',
    trend: 'Load exposure compounds daily',
    accent: 'from-blue-700 to-cyan-500',
  },
  {
    stage: '02',
    label: 'Early Symptoms',
    value: '2-12 Weeks',
    note: 'Minor discomfort can escalate into recurring strain when task design remains unchanged.',
    metricLabel: 'Response SLA',
    metricValue: '< 14 days',
    trend: 'Recovery time grows each cycle',
    accent: 'from-blue-600 to-sky-500',
  },
  {
    stage: '03',
    label: 'Business Loss',
    value: 'People -> Throughput',
    note: 'Health strain typically surfaces first as output variability, quality drift, and attendance pressure.',
    metricLabel: 'Output risk',
    metricValue: 'High',
    trend: 'Stability drops across shifts',
    accent: 'from-blue-700 to-blue-500',
  },
];

const bodyExposure = [
  {
    area: 'Lower back',
    note: 'Frequent strain during lifting from floor level and trunk rotation.',
    imageAlt: 'Dummy ergonomic illustration for lower back risk',
    imageSrc: '/body%20zones/Lower%20back.jpeg',
    accent: 'from-blue-700 to-cyan-500',
    badge: 'Highest Frequency',
  },
  {
    area: 'Shoulders and upper arms',
    note: 'Overload appears during overhead reach and repetitive object transfer.',
    imageAlt: 'Dummy ergonomic illustration for shoulder and upper arm risk',
    imageSrc: '/body%20zones/Shoulder%20and%20upper%20arms.jpeg',
    accent: 'from-blue-600 to-cyan-500',
    badge: 'Overhead Load',
  },
  {
    area: 'Elbow',
    note: 'Repetitive extension and load transfer can trigger tendon stress around the elbow.',
    imageAlt: 'Ergonomic illustration for elbow risk',
    imageSrc: '/body%20zones/Elbow.jpeg',
    accent: 'from-sky-600 to-blue-500',
    badge: 'Precision Stress',
  },
  {
    area: 'Neck and upper back',
    note: 'Static posture and frequent forward head position increase fatigue.',
    imageAlt: 'Ergonomic illustration for neck and upper back risk',
    imageSrc: '/body%20zones/Neck%20and%20upper%20back.jpeg',
    accent: 'from-cyan-600 to-blue-500',
    badge: 'Posture Drift',
  },
  {
    area: 'Hip',
    note: 'Uneven load transfer and frequent bending can increase hip joint pressure.',
    imageAlt: 'Ergonomic illustration for hip risk',
    imageSrc: '/body%20zones/hip.jpeg',
    accent: 'from-blue-500 to-sky-400',
    badge: 'Joint Pressure',
  },
  {
    area: 'Knee',
    note: 'Repeated squatting and lifting from low height can reduce knee comfort over shifts.',
    imageAlt: 'Ergonomic illustration for knee risk',
    imageSrc: '/body%20zones/knee.jpeg',
    accent: 'from-blue-700 to-sky-500',
    badge: 'Lower Joint Load',
  },
];

const bodyExposureByNoteLength = [...bodyExposure].sort((a, b) => b.note.length - a.note.length);

const riskItems = [
  {
    title: 'Lower back strain and recurring pain',
    desc: 'Often triggered by repetitive lifting and trunk rotation without load-assist support.',
    imageSrc: '/factory%20floors/imgi_61_64156f66f294_Icon_Ergonomie_R%C3%BCckenschmerzen_2025.jpg',
    imageAlt: 'Factory-floor icon representing lower back ergonomic strain',
  },
  {
    title: 'Joint overload during awkward positioning',
    desc: 'Shoulder and elbow load spikes during off-axis object handling and poor reach angles.',
    imageSrc: '/factory%20floors/imgi_62_e9d1b153173a_Icon_Ergonomie_Gelenkbeschwerden_2025.jpg',
    imageAlt: 'Factory-floor icon representing ergonomic joint overload',
  },
  {
    title: 'Physical exhaustion across long shifts',
    desc: 'Continuous force application accumulates fatigue and reduces handling precision over time.',
    imageSrc: '/factory%20floors/imgi_63_3d61795879c8_Icon_Ergonomie_Ersch%C3%B6pfung_2025.jpg',
    imageAlt: 'Factory-floor icon representing ergonomic exhaustion risk',
  },
  {
    title: 'Cognitive load and mental pressure',
    desc: 'Sustained physical discomfort can degrade focus, consistency, and decision quality.',
    imageSrc: '/factory%20floors/imgi_64_d5dd52b41cf5_Icon_Ergonomie_psychische%20Belastungen_2025.jpg',
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
            <p className="text-xs font-bold text-rose-600 uppercase tracking-[0.2em] mb-3">Health Perspective</p>
            <h1 className="text-4xl font-black tracking-tight leading-[0.95] text-slate-900 mb-5 sm:text-5xl">
              Health risks and diseases in manual handling operations
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed">
              Daily lifting, carrying, and repetitive handling can create a cumulative physical burden. Without ergonomic
              support, minor discomfort often develops into persistent musculoskeletal problems that affect people,
              attendance, and production continuity.
            </p>
          </div>
          <div className="relative lg:col-span-7 lg:min-h-[420px]">
            <Image
              src="/top.png"
              alt="Factory floor health-risk visual"
              width={1600}
              height={900}
              className="h-auto w-full max-w-[680px] object-contain object-right-bottom lg:absolute lg:bottom-[-4rem] lg:right-0 lg:z-20 lg:translate-x-3"
              priority
            />
          </div>
        </section>

        <section className={`bg-white border border-slate-200 rounded-3xl ${spacingTokens.card.feature} shadow-sm`}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center">
              <SolidWarningIcon className="w-4.5 h-4.5" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Common risk patterns on factory floors</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {riskItems.map((item) => (
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
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={`bg-white border border-slate-200 rounded-3xl ${spacingTokens.card.feature} shadow-sm`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center">
              <SolidHealthIcon className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600">Impact Storyline</p>
              <h2 className="text-2xl font-black text-slate-900">Health impact infographic snapshot</h2>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {healthStats.map((item, index) => (
              <article key={item.label} className="group relative rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="absolute inset-x-0 top-0 h-1.5 overflow-hidden rounded-t-xl">
                  <div className={`h-full w-full bg-gradient-to-r ${item.accent}`} />
                </div>
                <div className="mb-4 flex items-center justify-between">
                  <p className="inline-flex h-8 min-w-8 items-center justify-center rounded-full border border-blue-200 bg-blue-50 px-2 text-xs font-black tracking-wide text-blue-700">
                    {item.stage}
                  </p>
                  <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-600">
                    {item.metricLabel}
                  </span>
                </div>
                <p className="text-[11px] uppercase tracking-[0.16em] font-bold text-slate-500 mb-2">{item.label}</p>
                <p className="text-3xl font-black leading-tight text-slate-900 mb-3">{item.value}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{item.note}</p>
                <div className="mt-4 flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-blue-700">{item.metricValue}</span>
                  <span className="text-[11px] font-medium text-slate-500">{item.trend}</span>
                </div>
                {index < healthStats.length - 1 ? (
                  <div className="pointer-events-none absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-blue-600 lg:flex">
                    <ArrowRight size={14} />
                  </div>
                ) : null}
              </article>
            ))}
          </div>
          <p className="mt-5 rounded-lg border border-blue-100 bg-blue-50/60 px-3 py-2 text-xs text-slate-600">
            {/* DEV: Jika sudah ada data absensi / incident client lokal, taruh metrik real di kartu ini. */}
            Use your internal EHS and attendance data to replace these planning-level indicators and quantify each stage.
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

        <section className="grid lg:grid-cols-2 gap-6">
          <div className={`bg-white border border-slate-200 rounded-3xl ${spacingTokens.card.standard}`}>
            <h3 className="text-xl font-black text-slate-900 mb-3">Operational consequence</h3>
            <p className="text-slate-600 leading-relaxed">
              Physical fatigue does not stay at the individual level. It influences handling speed, consistency, error
              rates, and workforce stability. Over time, this creates hidden costs through quality disruption and lost
              productive hours.
            </p>
          </div>
          <div className={`bg-white border border-slate-200 rounded-3xl ${spacingTokens.card.standard}`}>
            <h3 className="text-xl font-black text-slate-900 mb-3">What ergonomics changes</h3>
            <p className="text-slate-600 leading-relaxed">
              Engineered lifting assistance shifts physical load from operators to handling systems. This lowers strain,
              supports healthier working routines, and helps maintain consistent output quality across shifts.
            </p>
          </div>
        </section>

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
