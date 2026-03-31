import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import {
  SolidSafetyIcon,
  SolidProductivityIcon,
  SolidCalculatorIcon,
  SolidWarningIcon,
} from '../../../components/icons/ErgonomicsSolidIcons';
import { spacingTokens } from '../../../constants/spacingTokens';

export const metadata: Metadata = {
  title: 'Industrial Ergonomics Hub | Health, Productivity, and Safety Insights',
  description:
    'Explore practical ergonomics guidance for Indonesian manufacturers: health risk prevention, productivity improvement, safety compliance, and implementation strategy.',
  keywords: [
    'ergonomi industri indonesia',
    'ergonomi kerja manufaktur',
    'keselamatan kerja angkat manual',
    'MSD manufaktur',
    'peningkatan produktivitas pabrik',
    'alat bantu angkat ergonomis',
    'vacuum lifter ergonomis indonesia',
    'material handling ergonomis',
    'k3 ergonomi pabrik',
    'PT Dimensi Quantum Wahyudi',
  ],
  alternates: {
    canonical: 'https://dimensiwahyudi.com/news/ergonomics',
  },
  openGraph: {
    title: 'Industrial Ergonomics Hub | PT Dimensi Quantum Wahyudi',
    description:
      'A practical ergonomics knowledge hub for manufacturing leaders: reduce strain, improve productivity, and strengthen safety compliance.',
    url: 'https://dimensiwahyudi.com/news/ergonomics',
    type: 'article',
    locale: 'en_ID',
  },
};

const benchmarkCards = [
  {
    title: 'Fatigue-Related Slowdown',
    value: '12-25%',
    note: 'Typical end-of-shift handling slowdown in non-ergonomic repetitive tasks.',
    icon: SolidWarningIcon,
    color: 'text-rose-600 bg-rose-50 border-rose-200',
  },
  {
    title: 'Potential Throughput Lift',
    value: '8-22%',
    note: 'Indicative gain when high-strain manual handling is assisted by ergonomic systems.',
    icon: SolidProductivityIcon,
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  },
  {
    title: 'Handling Safety Consistency',
    value: 'Higher',
    note: 'Structured ergonomic workflows reduce risky movement variability across shifts.',
    icon: SolidSafetyIcon,
    color: 'text-blue-600 bg-blue-50 border-blue-200',
  },
];

const implementationSteps = [
  {
    step: '01',
    title: 'Identify High-Strain Tasks',
    desc: 'Map lifting frequency, awkward posture exposure, and load characteristics by workstation.',
  },
  {
    step: '02',
    title: 'Quantify Business Impact',
    desc: 'Estimate cycle-time loss, quality disruption, and absence risk using baseline operational data.',
  },
  {
    step: '03',
    title: 'Deploy Assisted Handling',
    desc: 'Prioritize technical controls and validate results through KPI-based pilot implementation.',
  },
];

const visualNavigationTiles = [
  {
    title: 'Ergonomics for Every Industry',
    desc: 'Start from the complete hub and pick your implementation path.',
    href: '/news/ergonomics',
    disabled: true,
    image: '/projects/PT Mayora Indah.jpeg',
    position: 'center 30%',
    className: 'md:col-span-7 md:row-span-2 min-h-[340px] md:min-h-[460px]',
  },
  {
    title: 'Health Risks and MSD Exposure',
    desc: 'Identify strain patterns and high-risk manual handling tasks.',
    href: '/news/ergonomics/health-risks',
    image: '/projects/PT Gajah Tunggal.jpg',
    position: 'center 38%',
    className: 'md:col-span-5 min-h-[220px]',
  },
  {
    title: 'Productivity Impact',
    desc: 'Translate ergonomics into throughput and quality consistency.',
    href: '/news/ergonomics/productivity',
    image: '/projects/PT HOKKAN INDONESIA.jpg',
    position: 'center 32%',
    className: 'md:col-span-5 min-h-[220px]',
  },
  {
    title: 'Safety and Standards',
    desc: 'Map controls to practical compliance on your production floor.',
    href: '/news/ergonomics/safety-standards',
    image: '/projects/PT GS Battery.jpg',
    position: 'center 40%',
    className: 'md:col-span-4 min-h-[220px]',
  },
  {
    title: 'Open ROI Calculator',
    desc: 'Estimate ergonomic impact and investment economics quickly.',
    href: '/digital-assistant/roi-calculator',
    image: '/projects/PT Asahimas Flat Glass Tbk.jpeg',
    position: 'center 38%',
    className: 'md:col-span-4 min-h-[220px]',
  },
  {
    title: 'Selection Aids',
    desc: 'Use digital assistant tools to shortlist suitable handling systems.',
    href: '/digital-assistant/selection-aids',
    image: '/projects/PT Otsuka Indonesia.jpeg',
    position: 'center 34%',
    className: 'md:col-span-4 min-h-[220px]',
  },
];

export default function ErgonomicsHubPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-sky-100/40 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f080_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f080_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className={`${spacingTokens.page.shell} ${spacingTokens.page.container} ${spacingTokens.page.stack}`}>
        <section className="grid lg:grid-cols-2 gap-8 md:gap-10 items-center pb-0 md:pb-0">
          <div>
            <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-blue-600 font-bold text-xs tracking-widest uppercase mb-6">
              Industrial Ergonomics Knowledge Hub
            </p>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-6">
              Protect Operators. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Improve Throughput.</span>
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed max-w-2xl">
              This hub helps industrial teams evaluate ergonomics from every critical angle: health risk prevention,
              productivity performance, and workplace safety compliance. Built for practical implementation on real
              production floors in Indonesia.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link href="/contact" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors">
                Request Engineering Consultation
              </Link>
              <Link href="/digital-assistant/roi-calculator" className="px-6 py-3 bg-white border border-slate-200 hover:border-blue-300 text-slate-700 font-bold rounded-xl transition-colors">
                Open ROI Calculator
              </Link>
            </div>
          </div>

          <div className="relative lg:min-h-[420px]">
            <Image
              src="/divdin.png"
              alt="Industrial ergonomics implementation visual"
              width={1600}
              height={900}
              className="h-auto w-full max-w-[680px] object-contain object-center lg:absolute lg:bottom-[-4rem] lg:right-0 lg:z-20 lg:translate-x-3"
              priority
            />
          </div>
        </section>

        <section className={`bg-white border border-slate-200 rounded-[2rem] ${spacingTokens.card.inset} shadow-sm`}>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">Why this topic matters now</h2>
          <p className="text-slate-600 leading-relaxed">
            Ergonomics is no longer just a health initiative. It is now a strategic lever for plant reliability,
            productivity consistency, and sustainable workforce performance. Teams that ignore ergonomics often face
            hidden losses through absenteeism, quality variation, and avoidable operational risk.
          </p>
        </section>

        <section>
          <div className="flex items-end justify-between mb-6 md:mb-8 gap-4">
            <div>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-2">Visual Navigation</p>
              <h2 className="text-3xl font-black text-slate-900">Explore Ergonomics by Scenario</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-4 md:gap-5 auto-rows-fr">
            {visualNavigationTiles.map((tile) => (
              tile.disabled ? (
                <article
                  key={tile.title}
                  aria-current="page"
                  className={`relative overflow-hidden rounded-3xl border border-slate-200 shadow-sm ${tile.className}`}
                >
                  <Image
                    src={tile.image}
                    alt={tile.title}
                    fill
                    className="object-cover"
                    style={{ objectPosition: tile.position ?? 'center' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/35 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 text-white">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] mb-3">
                      Current topic
                    </div>
                    <h3 className="text-xl md:text-2xl font-black leading-tight">{tile.title}</h3>
                    <p className="mt-2 text-sm text-slate-100/90 max-w-2xl">{tile.desc}</p>
                  </div>
                </article>
              ) : (
                <Link
                  key={tile.title}
                  href={tile.href}
                  className={`group relative overflow-hidden rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all ${tile.className}`}
                >
                  <Image
                    src={tile.image}
                    alt={tile.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition: tile.position ?? 'center' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/35 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 text-white">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] mb-3">
                      Open topic
                      <ArrowUpRight size={13} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-black leading-tight">{tile.title}</h3>
                    <p className="mt-2 text-sm text-slate-100/90 max-w-2xl">{tile.desc}</p>
                  </div>
                </Link>
              )
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-4">
            Visuals use real industrial project photos from PT Dimensi Quantum Wahyudi portfolio archives.
          </p>
        </section>

        <section className={`bg-white border border-slate-200 rounded-[2rem] ${spacingTokens.card.inset} shadow-sm`}>
          <div className="flex items-end justify-between mb-6 gap-4">
            <div>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-2">Operational Snapshot</p>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900">Ergonomics impact at a glance</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {benchmarkCards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.title} className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${card.color}`}>
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 mb-2">{card.title}</p>
                  <p className="text-3xl font-black text-slate-900 mb-2">{card.value}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{card.note}</p>
                </article>
              );
            })}
          </div>
          <p className="text-xs text-slate-400 mt-4">
            {/* DEV: Ganti benchmark dengan data internal proyek Indonesia / studi pelanggan terverifikasi. */}
            Indicative benchmarks for planning discussion. Replace with audited project data for publication-ready claims.
          </p>
        </section>

        <section className={`bg-white border border-slate-200 rounded-[2rem] ${spacingTokens.card.inset} shadow-sm`}>
          <p className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-2">Implementation Framework</p>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">From risk mapping to ergonomic deployment</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {implementationSteps.map((item) => (
              <article key={item.step} className="relative bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <p className="text-xs font-black text-blue-600 tracking-[0.2em] mb-3">STEP {item.step}</p>
                <h3 className="text-lg font-black text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-slate-900 text-white rounded-[2rem] p-7 md:p-12 border border-slate-800 relative overflow-visible">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(#fff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}
          />
          <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-end">
            <div>
              <p className="text-cyan-300 text-xs font-bold uppercase tracking-[0.2em] mb-3">Next Action</p>
              <h2 className="text-3xl md:text-4xl font-black mb-4">Measure the economics of ergonomic investment</h2>
              <p className="text-slate-300 leading-relaxed mb-7">
                Use the ROI calculator to estimate potential productivity gains and operational savings for your
                handling scenario.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/digital-assistant/roi-calculator" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-colors inline-flex items-center gap-2">
                  <SolidCalculatorIcon className="w-4.5 h-4.5" /> Open Calculator
                </Link>
                <Link href="/digital-assistant/selection-aids" className="px-6 py-3 bg-white/10 border border-white/20 hover:bg-white/20 rounded-xl font-bold transition-colors">
                  Selection Aids
                </Link>
              </div>
            </div>
            <Image
              src="/dian.png"
              alt="Economic calculation visual for ergonomic investment"
              width={1600}
              height={900}
              className="w-full h-auto rounded-2xl -mt-16 md:-mt-24"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
