import type { Metadata } from 'next';
import Link from 'next/link';
import SmartCalculator from '@/components/Calculator';
import { spacingTokens } from '../../../constants/spacingTokens';

export const metadata: Metadata = {
  title: 'ROI Calculator for Ergonomics | Digital Assistant',
  description:
    'Estimate ergonomic workload risk and productivity impact with our ROI calculator for manual material handling operations in Indonesia.',
  keywords: [
    'ROI calculator ergonomics Indonesia',
    'manual handling calculator',
    'material handling productivity',
    'ergonomic risk assessment',
    'industrial lifting ROI',
  ],
  alternates: {
    canonical: '/digital-assistant/roi-calculator',
  },
};

export default function RoiCalculatorPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.08),_transparent_32%),linear-gradient(180deg,#f8fafc_0%,#eef4ff_100%)] selection:bg-cyan-500/30">
      <section className={`relative overflow-hidden ${spacingTokens.hero.standard}`}>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#94a3b812_1px,transparent_1px),linear-gradient(to_bottom,#94a3b812_1px,transparent_1px)] bg-[size:28px_28px] opacity-60" aria-hidden="true" />
        <div className="absolute -top-32 right-0 h-80 w-80 rounded-full bg-blue-200/70 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-cyan-200/70 blur-3xl" aria-hidden="true" />

        <div className={`relative ${spacingTokens.page.containerNarrow}`}>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/85 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-blue-700 shadow-sm backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-cyan-500" aria-hidden="true" />
            Digital Assistant
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
                ROI & Ergonomic Workload Calculator
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
                Model daily lifting load, surface ergonomic overload risk, and see where vacuum handling can improve safety, productivity, and line stability in one clear view.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-slate-950/15 transition-transform hover:-translate-y-0.5"
                >
                  Discuss Your Process
                </Link>
                <Link
                  href="/news/ergonomics"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white/90 px-6 py-3 text-sm font-bold text-slate-700 shadow-sm transition-colors hover:border-blue-300 hover:text-slate-950"
                >
                  Read Ergonomics Hub
                </Link>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-2xl border border-white/70 bg-white/90 p-4 shadow-sm backdrop-blur-md">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Focus</p>
                <p className="mt-2 text-lg font-black text-slate-950">Manual Handling Risk</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">Track payload, cycle rate, and exposure window.</p>
              </div>
              <div className="rounded-2xl border border-white/70 bg-white/90 p-4 shadow-sm backdrop-blur-md">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Output</p>
                <p className="mt-2 text-lg font-black text-slate-950">Instant Load Estimate</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">See cumulative body load in real time.</p>
              </div>
              <div className="rounded-2xl border border-white/70 bg-white/90 p-4 shadow-sm backdrop-blur-md">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Action</p>
                <p className="mt-2 text-lg font-black text-slate-950">Solution Direction</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">Get a recommended handling concept.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`relative ${spacingTokens.section.standard}`}>
        <div className={spacingTokens.page.containerNarrow}>
          <SmartCalculator />
        </div>
      </section>
    </main>
  );
}
