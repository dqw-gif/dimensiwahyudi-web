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
    <main className="min-h-screen bg-slate-50">
      <section className={`relative overflow-hidden border-b border-slate-200 bg-white ${spacingTokens.hero.standard}`}>
        <div className="absolute -top-32 right-0 h-80 w-80 rounded-full bg-blue-100 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-cyan-100 blur-3xl" aria-hidden="true" />

        <div className={`relative ${spacingTokens.page.containerNarrow}`}>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">Digital Assistant</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
            ROI & Ergonomic Workload Calculator
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
            Model daily lifting load, identify ergonomic overload risk, and estimate where vacuum handling solutions can improve safety and productivity on your line.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-500"
            >
              Discuss Your Process
            </Link>
            <Link
              href="/news/ergonomics"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition-colors hover:border-blue-300"
            >
              Read Ergonomics Hub
            </Link>
          </div>
        </div>
      </section>

      <section className={`relative ${spacingTokens.section.standard}`}>
        <div className={spacingTokens.page.containerNarrow}>
          {/* Komponen existing dipakai ulang agar logic kalkulator tetap satu sumber */}
          <SmartCalculator />
        </div>
      </section>
    </main>
  );
}
