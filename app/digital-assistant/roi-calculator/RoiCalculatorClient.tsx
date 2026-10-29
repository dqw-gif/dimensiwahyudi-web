'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SmartCalculator from '@/components/Calculator';
import { spacingTokens } from '../../../constants/spacingTokens';
import { useLanguage } from '@/components/LanguageProvider';

export default function RoiCalculatorClient() {
  const { lang } = useLanguage();
  const isId = lang === 'id';

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-[#005596] relative overflow-hidden">
      {/* Contained Ambient Specular Glow Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-20 left-1/4 w-[600px] h-[400px] bg-[#005596]/5 rounded-full blur-[150px]" />
        <div className="absolute top-2/3 right-1/4 w-[500px] h-[350px] bg-[#1d4ed8]/4 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f080_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f080_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />
      </div>

      <section className={`relative z-10 overflow-hidden ${spacingTokens.hero.standard}`}>
        <div className={`relative ${spacingTokens.page.containerNarrow}`}>
          {/* Standard Glass Pill Badge */}
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-[#005596]/15 shadow-[0_2px_10px_rgba(0,85,150,0.06)] mb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#005596]">
              {isId ? 'Asisten Digital Teknik' : 'Digital Assistant'}
            </span>
          </div>

          <div className="mt-4 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-4xl font-black tracking-tight text-slate-900 md:text-5xl lg:text-6xl leading-[1.05]">
                {isId ? 'Kalkulator ROI & ' : 'ROI & Ergonomic '}
                <span className="bg-gradient-to-r from-[#005596] to-[#1d4ed8] bg-clip-text text-transparent">
                  {isId ? 'Beban Kerja Ergonomi' : 'Workload Calculator'}
                </span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg font-normal">
                {isId
                  ? 'Hitung akumulasi beban angkat harian, deteksi risiko cedera ergonomi operator, dan lihat bagaimana sistem vacuum handling meningkatkan keselamatan kerja, throughput, dan stabilitas lini produksi.'
                  : 'Model daily lifting load, surface ergonomic overload risk, and see where vacuum handling can improve safety, productivity, and line stability in one clear view.'}
              </p>
              <div className="mt-8 flex flex-wrap gap-3.5">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#005596] hover:bg-[#004276] text-white text-sm font-bold rounded-full shadow-[0_4px_16px_rgba(0,85,150,0.25)] hover:shadow-[0_8px_24px_rgba(0,85,150,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                >
                  <span>{isId ? 'Konsultasikan Lini Produksi' : 'Discuss Your Process'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/news/ergonomics"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/90 hover:bg-white border border-slate-200/90 hover:border-[#005596]/40 shadow-xs hover:shadow-md text-sm font-bold text-slate-700 hover:text-[#005596] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                >
                  <span>{isId ? 'Panduan Ergonomi Industri' : 'Read Ergonomics Hub'}</span>
                </Link>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-2xl border border-white/95 bg-white/85 p-5 shadow-sm ring-1 ring-[#005596]/12 backdrop-blur-2xl">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#005596] block">
                  {isId ? 'Fokus' : 'Focus'}
                </span>
                <p className="mt-1.5 text-lg font-black text-slate-900 tracking-tight">
                  {isId ? 'Risiko Angkat Manual' : 'Manual Handling Risk'}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 font-normal">
                  {isId ? 'Pantau payload, cycle rate, dan durasi kerja.' : 'Track payload, cycle rate, and exposure window.'}
                </p>
              </div>
              <div className="rounded-2xl border border-white/95 bg-white/85 p-5 shadow-sm ring-1 ring-[#005596]/12 backdrop-blur-2xl">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#005596] block">
                  {isId ? 'Hasil' : 'Output'}
                </span>
                <p className="mt-1.5 text-lg font-black text-slate-900 tracking-tight">
                  {isId ? 'Estimasi Beban Instan' : 'Instant Load Estimate'}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 font-normal">
                  {isId ? 'Lihat akumulasi beban tulang belakang secara real-time.' : 'See cumulative body load in real time.'}
                </p>
              </div>
              <div className="rounded-2xl border border-white/95 bg-white/85 p-5 shadow-sm ring-1 ring-[#005596]/12 backdrop-blur-2xl">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#005596] block">
                  {isId ? 'Solusi' : 'Action'}
                </span>
                <p className="mt-1.5 text-lg font-black text-slate-900 tracking-tight">
                  {isId ? 'Rekomendasi Sistem' : 'Solution Direction'}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 font-normal">
                  {isId ? 'Dapatkan rekomendasi tipe lifter yang sesuai.' : 'Get a recommended handling concept.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`relative z-10 ${spacingTokens.section.standard}`}>
        <div className={spacingTokens.page.containerNarrow}>
          <SmartCalculator />
        </div>
      </section>
    </main>
  );
}
