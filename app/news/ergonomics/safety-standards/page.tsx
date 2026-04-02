import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Activity, ArrowLeft, ArrowRight, CheckCircle, TrendingDown } from 'lucide-react';
import ErgonomicsCaseStudies from '../../../../components/news/ErgonomicsCaseStudies';
import { SolidSafetyIcon, SolidWarningIcon, SolidHealthIcon } from '../../../../components/icons/ErgonomicsSolidIcons';
import { spacingTokens } from '../../../../constants/spacingTokens';

export const metadata: Metadata = {
  title: 'Occupational Safety and Ergonomics Standards | Industrial Ergonomics',
  description:
    'Practical safety and ergonomics guidance for industrial teams: compliance mindset, preventive controls, and implementation priorities.',
  keywords: [
    'standar keselamatan kerja ergonomi',
    'k3 ergonomi manufaktur',
    'compliance handling material',
    'pengendalian risiko ergonomi',
    'audit keselamatan angkat manual',
    'ergonomic risk assessment indonesia',
    'technical control lifting process',
    'ergonomi dan kepatuhan industri',
  ],
  alternates: {
    canonical: 'https://dimensiwahyudi.com/news/ergonomics/safety-standards',
  },
};

const standardsMap = [
  {
    stage: '01',
    label: 'PLANNING & AUDIT',
    title: 'ISO 45001 (OHS Management)',
    focus: 'System-level safety governance and risk reduction',
    kpi: 'Audit Readiness',
    val: 'High',
    icon: CheckCircle,
    ring: 'border-blue-600 text-blue-700 bg-blue-50',
    bar: 'bg-blue-600',
    accent: 'from-blue-700 to-cyan-500'
  },
  {
    stage: '02',
    label: 'PROCESS DESIGN',
    title: 'Manual Handling Rules',
    focus: 'Task design to minimize lifting, carrying, pushing, and pulling risks',
    kpi: 'Handling Load',
    val: 'Optimized',
    icon: Activity,
    ring: 'border-sky-500 text-sky-700 bg-sky-50',
    bar: 'bg-sky-500',
    accent: 'from-blue-600 to-sky-500'
  },
  {
    stage: '03',
    label: 'SUSTAINMENT',
    title: 'Ergonomic Design',
    focus: 'Workstation and tool design aligned to human capability',
    kpi: 'Compliance',
    val: 'Sustained',
    icon: TrendingDown,
    ring: 'border-blue-700 text-blue-800 bg-blue-50',
    bar: 'bg-blue-500',
    accent: 'from-blue-700 to-blue-500'
  },
];

const stopModel = [
  {
    label: 'S - Substitution',
    desc: 'Remove the hazardous task pattern where possible.',
    imageSrc: '/stop/imgi_121_64f3dd7d4410_Picture_Ergonomie_STOP-Prinzip_Grafik_S-1_2025.webp',
  },
  {
    label: 'T - Technical Controls',
    desc: 'Use engineering solutions to reduce physical load at source.',
    imageSrc: '/stop/imgi_125_3847367ebb42_Picture_STOP-Prinzip_Grafik_T-2_2025.webp',
  },
  {
    label: 'O - Organizational Controls',
    desc: 'Adjust shift design, task rotation, and process allocation.',
    imageSrc: '/stop/imgi_129_773d3bbdf100_Picture_STOP-Prinzip_Grafik_O-3_2025.webp',
  },
  {
    label: 'P - Personal Controls',
    desc: 'Training and behavior reinforcement as supporting layer.',
    imageSrc: '/stop/imgi_133_63d81f090abd_Picture_STOP-Prinzip_Grafik_P-4_2025.webp',
  },
];

const principles = [
  {
    text: 'Prioritize preventive controls before relying on behavioral correction',
    iconSrc: '/safer handling/Prioritize preventive.webp'
  },
  {
    text: 'Design handling steps to minimize awkward posture and repetitive overload',
    iconSrc: '/safer handling/Design handling.webp'
  },
  {
    text: 'Use engineered assistance for heavy, repetitive, or precision-critical tasks',
    iconSrc: '/safer handling/engineered assistance.webp'
  },
  {
    text: 'Standardize safe handling workflow across shifts and operator groups',
    iconSrc: '/safer handling/Standardize safe.webp'
  },
];

export default function ErgonomicsSafetyStandardsPage() {
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
            <p className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-3">Compliance Perspective</p>
            <h1 className="text-4xl font-black tracking-tight leading-[0.95] text-slate-900 mb-5 sm:text-5xl">
              Occupational safety and ergonomics standards
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Safety excellence is achieved when ergonomic controls are embedded into the actual workflow. Standards are
              not checklists alone, they are operational design principles that protect people and performance.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-blue-700 transition-colors">
                <CheckCircle className="w-4 h-4" /> Request Compliance Audit
              </Link>
              <Link href="/products/schmalz" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-600 shadow-sm hover:border-slate-300 hover:bg-slate-50 transition-colors">
                Explore Handling Solutions
              </Link>
            </div>
          </div>
          <div className="relative lg:col-span-7 lg:min-h-[420px]">
            <Image
              src="/divadian.webp"
              alt="Occupational safety ergonomics visual"
              width={1600}
              height={900}
              className="h-auto w-full max-w-[680px] object-contain object-center lg:absolute lg:bottom-[-4rem] lg:right-0 lg:z-20 lg:translate-x-3"
              priority
            />
          </div>
        </section>

        <section className={`bg-white border border-slate-200 rounded-3xl ${spacingTokens.card.feature} shadow-sm`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
              <SolidSafetyIcon className="w-4.5 h-4.5" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Implementation principles for safer handling</h2>
          </div>
          <ul className="grid md:grid-cols-2 gap-4">
            {principles.map((item) => (
              <li key={item.text} className="group flex items-center gap-5 rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-300 hover:shadow-sm transition-all duration-200 border-l-4 border-l-blue-600">
                <div className="relative h-24 w-24 shrink-0">
                  <Image src={item.iconSrc} alt={item.text} fill className="object-contain" />
                </div>
                <p className="text-slate-700 leading-relaxed text-[15px] font-medium">{item.text}</p>
              </li>
            ))}
          </ul>
        </section>



        <section className={`bg-white border border-slate-200 rounded-3xl ${spacingTokens.card.feature} shadow-sm`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
              <SolidSafetyIcon className="w-4.5 h-4.5" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Standards and compliance matrix</h2>
          </div>
          <div className="flex flex-col lg:flex-row items-stretch gap-0 mt-8">
            {standardsMap.map((item, index) => (
              <div key={item.title} className="flex lg:flex-1 flex-col lg:flex-row items-stretch">
                <article className="flex-1 group rounded-2xl border border-slate-200 bg-white p-6 hover:border-blue-300 hover:shadow-md transition-all duration-200 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full border-2 text-sm font-black ${item.ring}`}>
                      {item.stage}
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-500">
                      <item.icon className="w-3 h-3" />
                      {item.label}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-black leading-tight text-slate-900 tracking-tight">{item.title}</h3>
                    <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">{item.focus}</p>
                  </div>
                  <div className="mt-auto space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.16em] font-bold text-slate-400">{item.kpi}</span>
                      <span className={`text-[11px] font-black text-blue-600`}>{item.val}</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                      <div className={`h-full w-full rounded-full ${item.bar}`} />
                    </div>
                  </div>
                </article>
                {index < standardsMap.length - 1 && (
                  <div className="hidden lg:flex w-8 items-center justify-center z-10 -mx-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm text-slate-400">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                )}
                {index < standardsMap.length - 1 && (
                  <div className="flex lg:hidden h-8 items-center justify-center z-10 -my-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm text-slate-400 rotate-90">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-4">
            {/* DEV: Bisa tambah nomor regulasi lokal Indonesia bila tim legal/EHS sudah approve. */}
            Align this matrix with your local legal and EHS references before final publication.
          </p>
        </section>

        <section className="grid lg:grid-cols-2 gap-6 lg:items-stretch">
          <div className={`bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col justify-between`}>
            <div>
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 border border-blue-200 text-blue-600">
                <SolidSafetyIcon className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">Risk control hierarchy in practice</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                The strongest ergonomic programs prioritize technical mitigation at the process level. This helps reduce
                dependency on individual behavior while improving repeatable safety outcomes.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-200">↑ Safety Outcome</span>
              <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 border border-slate-200">↓ Behavioral Dependency</span>
            </div>
          </div>
          <div className={`bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col justify-between`}>
            <div>
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 border border-rose-200 text-rose-600">
                <SolidWarningIcon className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">Documentation and continuous review</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Use incident data, near-miss patterns, and workstation feedback as input for periodic ergonomics and
                handling process improvements.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700 border border-rose-200">↓ Near-miss Patterns</span>
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">↑ Process Feedback</span>
            </div>
          </div>
        </section>

        <section className={`bg-white border border-slate-200 rounded-3xl ${spacingTokens.card.feature} shadow-sm`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-600 flex items-center justify-center">
              <SolidWarningIcon className="w-4.5 h-4.5" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">STOP principle in handling operations</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stopModel.map((item) => (
              <article key={item.label} className="group flex flex-col rounded-2xl border border-slate-200 bg-white hover:border-cyan-300 hover:shadow-md transition-all duration-200 overflow-hidden">
                <div className="relative w-full aspect-[4/3] bg-slate-50 border-b border-slate-100 p-4">
                  <Image src={item.imageSrc} alt={item.label} fill className="object-contain p-4 mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-black text-slate-900 mb-2">{item.label}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 6. CASE STUDIES (Moved from above to the bottom) */}
        <ErgonomicsCaseStudies topic="safety" />

        <section className={`bg-slate-900 text-white rounded-3xl ${spacingTokens.card.feature} border border-slate-800`}>
          <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-[0.2em] mb-3">
            <SolidSafetyIcon className="w-4 h-4" /> Recommended Next Step
          </div>
          <h2 className="text-3xl font-black mb-4">Map your safety-critical handling points with our team</h2>
          <p className="text-slate-300 leading-relaxed mb-7 max-w-3xl">
            We can help your team identify where ergonomic assistance is most impactful for both safety performance and
            operational reliability.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-colors">
              Request Safety-Focused Assessment
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
