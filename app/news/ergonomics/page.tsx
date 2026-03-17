import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Activity, TrendingUp, BookOpen, Calculator } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Industrial Ergonomics Hub | Health, Productivity, and Safety Insights',
  description:
    'Explore practical ergonomics guidance for Indonesian manufacturers: health risk prevention, productivity improvement, safety compliance, and implementation strategy.',
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

const topicCards = [
  {
    title: 'Health Risks and Diseases',
    desc: 'Understand the operational impact of musculoskeletal disorders and how to prevent long-term operator strain.',
    href: '/news/ergonomics/health-risks',
    icon: Activity,
    color: 'text-rose-600 bg-rose-50 border-rose-200',
  },
  {
    title: 'Ergonomics and Productivity',
    desc: 'See how ergonomic handling supports throughput, quality consistency, and workforce resilience.',
    href: '/news/ergonomics/productivity',
    icon: TrendingUp,
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  },
  {
    title: 'Safety and Standards',
    desc: 'Review practical safety principles and compliance-oriented ergonomics implementation in industrial settings.',
    href: '/news/ergonomics/safety-standards',
    icon: ShieldCheck,
    color: 'text-blue-600 bg-blue-50 border-blue-200',
  },
  {
    title: 'Ergonomics Glossary',
    desc: 'A clear explanation of key ergonomics terms for engineers, procurement teams, and plant leaders.',
    href: '/news/ergonomics/glossary',
    icon: BookOpen,
    color: 'text-violet-600 bg-violet-50 border-violet-200',
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

      <div className="relative z-10 pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <section className="grid lg:grid-cols-2 gap-10 items-center">
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
              <Link href="/digital-assistant/vacuum-calculator" className="px-6 py-3 bg-white border border-slate-200 hover:border-blue-300 text-slate-700 font-bold rounded-xl transition-colors">
                Open ROI Calculator
              </Link>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-[2rem] p-3 shadow-sm">
            {/* DEV: Ganti dengan visual hero ergonomics industrial (operator handling beban di pabrik) */}
            <Image
              src="/placeholders/ergonomics-placeholder.svg"
              alt="Industrial ergonomics visual placeholder"
              width={1600}
              height={900}
              className="w-full h-auto rounded-[1.5rem]"
              priority
            />
          </div>
        </section>

        <section className="bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">Why this topic matters now</h2>
          <p className="text-slate-600 leading-relaxed">
            Ergonomics is no longer just a health initiative. It is now a strategic lever for plant reliability,
            productivity consistency, and sustainable workforce performance. Teams that ignore ergonomics often face
            hidden losses through absenteeism, quality variation, and avoidable operational risk.
          </p>
        </section>

        <section>
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-2">Explore by Perspective</p>
              <h2 className="text-3xl font-black text-slate-900">Core Ergonomics Topics</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {topicCards.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group block bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-blue-300 transition-all"
                >
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${card.color}`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{card.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-5">{card.desc}</p>
                  <div className="inline-flex items-center gap-2 font-bold text-blue-600">
                    Read topic
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="bg-slate-900 text-white rounded-[2rem] p-8 md:p-12 border border-slate-800 overflow-hidden relative">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(#fff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}
          />
          <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-cyan-300 text-xs font-bold uppercase tracking-[0.2em] mb-3">Next Action</p>
              <h2 className="text-3xl md:text-4xl font-black mb-4">Measure the economics of ergonomic investment</h2>
              <p className="text-slate-300 leading-relaxed mb-7">
                Use the ROI calculator to estimate potential productivity gains and operational savings for your
                handling scenario.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/digital-assistant/vacuum-calculator" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-colors inline-flex items-center gap-2">
                  <Calculator size={18} /> Open Calculator
                </Link>
                <Link href="/digital-assistant/selection-aids" className="px-6 py-3 bg-white/10 border border-white/20 hover:bg-white/20 rounded-xl font-bold transition-colors">
                  Selection Aids
                </Link>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
              {/* DEV: Ganti dengan mockup screenshot calculator/selection aids */}
              <Image
                src="/placeholders/ergonomics-placeholder.svg"
                alt="Calculator preview placeholder"
                width={1600}
                height={900}
                className="w-full h-auto rounded-xl"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
