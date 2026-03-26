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
    label: 'High-Risk Manual Handling Tasks',
    value: 'Top Priority',
    note: 'Repetitive lifting and awkward posture tasks should be assessed first.',
  },
  {
    label: 'Early Warning Window',
    value: 'Weeks to Months',
    note: 'Minor discomfort can escalate quickly if load profile is unchanged.',
  },
  {
    label: 'Business Impact Path',
    value: 'People -> Output',
    note: 'Health strain often appears first as quality and speed inconsistency.',
  },
];

const bodyExposure = [
  {
    area: 'Lower back',
    note: 'Frequent strain during lifting from floor level and trunk rotation.',
    imageAlt: 'Dummy ergonomic illustration for lower back risk',
    accent: 'from-rose-500 to-orange-400',
    badge: 'Highest Frequency',
  },
  {
    area: 'Shoulders and upper arms',
    note: 'Overload appears during overhead reach and repetitive object transfer.',
    imageAlt: 'Dummy ergonomic illustration for shoulder and upper arm risk',
    accent: 'from-blue-500 to-cyan-400',
    badge: 'Overhead Load',
  },
  {
    area: 'Elbows and wrists',
    note: 'High repetition and forceful grip can trigger tendon stress quickly.',
    imageAlt: 'Dummy ergonomic illustration for elbow and wrist risk',
    accent: 'from-violet-500 to-indigo-400',
    badge: 'Precision Stress',
  },
  {
    area: 'Neck and upper back',
    note: 'Static posture and frequent forward head position increase fatigue.',
    imageAlt: 'Dummy ergonomic illustration for neck and upper back risk',
    accent: 'from-fuchsia-500 to-rose-400',
    badge: 'Posture Drift',
  },
  {
    area: 'Hip and knee joints',
    note: 'Repeated squatting and uneven load transfer reduce joint comfort.',
    imageAlt: 'Dummy ergonomic illustration for hip and knee joint risk',
    accent: 'from-amber-500 to-yellow-400',
    badge: 'Joint Pressure',
  },
  {
    area: 'Grip and forearm area',
    note: 'Sustained pinching and carrying force can reduce handling endurance.',
    imageAlt: 'Dummy ergonomic illustration for grip and forearm risk',
    accent: 'from-emerald-500 to-teal-400',
    badge: 'Grip Fatigue',
  },
];

const riskItems = [
  'Lower back strain and recurring pain from repetitive lifting tasks',
  'Shoulder and elbow overload during awkward object positioning',
  'Wrist and grip fatigue caused by continuous force application',
  'Reduced concentration due to physical exhaustion over long shifts',
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

        <section className={`bg-white border border-slate-200 rounded-3xl ${spacingTokens.card.feature} shadow-sm`}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center">
              <SolidWarningIcon className="w-4.5 h-4.5" />
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

        <section className={`bg-white border border-slate-200 rounded-3xl ${spacingTokens.card.feature} shadow-sm`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center">
              <SolidHealthIcon className="w-4.5 h-4.5" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Health impact infographic snapshot</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {healthStats.map((item) => (
              <article key={item.label} className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <p className="text-xs uppercase tracking-[0.16em] font-bold text-slate-500 mb-2">{item.label}</p>
                <p className="text-2xl font-black text-slate-900 mb-2">{item.value}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{item.note}</p>
              </article>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-4">
            {/* DEV: Jika sudah ada data absensi / incident client lokal, taruh metrik real di kartu ini. */}
            Use your internal EHS and attendance data to replace these planning-level indicators.
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-12">
            {bodyExposure.map((item, index) => {
              const cardPlacement =
                index === 0
                  ? 'sm:col-span-2 xl:col-span-6 xl:row-span-2'
                  : index === 1
                    ? 'xl:col-span-3'
                    : index === 2
                      ? 'xl:col-span-3'
                      : index === 3
                        ? 'xl:col-span-3'
                        : index === 4
                          ? 'xl:col-span-3'
                          : 'xl:col-span-6';

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
                      src="/placeholders/ergonomics-placeholder.svg"
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
                    <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/20 bg-white/12 p-3 backdrop-blur-md">
                      <h3 className={`${isHero ? 'text-lg sm:text-xl' : 'text-base'} font-extrabold tracking-tight text-white`}>
                        {item.area}
                      </h3>
                      <p className={`${isHero ? 'mt-2 text-sm sm:text-base group-hover:max-h-28' : 'mt-2 text-xs sm:text-sm group-hover:max-h-24'} max-h-0 overflow-hidden leading-relaxed text-slate-100/95 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0`}>
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
