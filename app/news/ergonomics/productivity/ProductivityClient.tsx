'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Gauge, ScanLine, Repeat2, UserRoundMinus } from 'lucide-react';
import ErgonomicsCaseStudies from '../../../../components/news/ErgonomicsCaseStudies';
import {
  SolidProductivityIcon,
  SolidCalculatorIcon,
  SolidSafetyIcon,
  SolidWarningIcon,
} from '../../../../components/icons/ErgonomicsSolidIcons';
import { spacingTokens } from '../../../../constants/spacingTokens';
import { useLanguage } from '../../../../components/LanguageProvider';

const kpiCards = [
  {
    stage: '01',
    title: 'Cycle Time Stability',
    titleId: 'Stabilitas Cycle Time',
    value: 'Cycle Gains',
    valueId: 'Siklus Lebih Cepat',
    note: 'Less fatigue-driven variability during repetitive handling windows.',
    noteId: 'Variasi waktu angkat akibat kelelahan di pertengahan hingga akhir shift jauh berkurang.',
    icon: SolidProductivityIcon,
    metricValue: 'Faster',
    accent: 'from-[#005596] to-[#1d4ed8]',
  },
  {
    stage: '02',
    title: 'Process Accuracy',
    titleId: 'Akurasi Proses Kerja',
    value: 'Error Drop',
    valueId: 'Minim Rework',
    note: 'Assisted control reduces small handling mistakes that trigger rework.',
    noteId: 'Kendali angkat presisi menekan risiko benturan workpiece yang memicu cacat produk atau rework.',
    icon: SolidSafetyIcon,
    metricValue: '↓ Rework',
    accent: 'from-emerald-600 to-teal-500',
  },
  {
    stage: '03',
    title: 'Output Reliability',
    titleId: 'Keandalan Output Shift',
    value: 'Shift Stability',
    valueId: 'Stabil Antar-Shift',
    note: 'Operational performance remains more consistent across shifts.',
    noteId: 'Target throughput harian lebih terjaga secara konsisten dari shift pagi hingga shift malam.',
    icon: SolidProductivityIcon,
    metricValue: 'Stable',
    accent: 'from-[#005596] to-sky-500',
  },
];

const evaluationMetrics = [
  {
    metric: 'Average cycle time before vs after implementation',
    metricId: 'Rata-rata cycle time per siklus angkat sebelum vs sesudah instalasi alat',
    sublabel: 'Cycle Time Delta',
    sublabelId: 'Selisih Cycle Time',
    icon: Gauge,
  },
  {
    metric: 'Shift-end speed drop compared to shift-start baseline',
    metricId: 'Persentase penurunan kecepatan kerja di jam akhir shift dibanding awal shift',
    sublabel: 'Shift Performance Drop',
    sublabelId: 'Penurunan Performa Shift',
    icon: ScanLine,
  },
  {
    metric: 'Handling-related rework or defect frequency trend',
    metricId: 'Tren frekuensi cacat komponen atau rework akibat benturan saat pemindahan barang',
    sublabel: 'Rework Frequency',
    sublabelId: 'Frekuensi Rework',
    icon: Repeat2,
  },
  {
    metric: 'Absence and replacement manpower requirement trend',
    metricId: 'Tren absensi operator dan kebutuhan tenaga kerja pengganti di stasiun angkat berat',
    sublabel: 'Workforce Stability',
    sublabelId: 'Stabilitas Tenaga Kerja',
    icon: UserRoundMinus,
  },
];

const impactPoints = [
  {
    title: 'Higher process consistency',
    titleId: 'Konsistensi proses yang jauh lebih terjaga',
    desc: 'Reduced fatigue supports stable handling quality across long shifts.',
    descId: 'Berkurangnya beban fisik membantu operator menjaga ritme dan presisi sepanjang shift kerja.',
    imageSrc: '/Productivity/imgi_151_37809a956c3e_Icon_Ergonomie_Produktivitaetsverlust_2025.webp',
    imageAlt: 'Ergonomic icon representing productivity loss from fatigue',
  },
  {
    title: 'Lower avoidable errors',
    titleId: 'Penurunan kerusakan workpiece & human error',
    desc: 'Improved control and positioning reduce rework and handling-related defects.',
    descId: 'Kontrol posisi yang stabil meminimalkan risiko komponen lecet, miring, atau jatuh saat perakitan.',
    imageSrc: '/Productivity/imgi_148_f23f1e3eaebd_Icon_Ergonomie_Motivationsverlust_2025.webp',
    imageAlt: 'Ergonomic icon representing motivation and error reduction',
  },
  {
    title: 'Faster cycle execution',
    titleId: 'Eksekusi cycle time lebih cepat',
    desc: 'Assisted lifting improves movement efficiency for repetitive tasks.',
    descId: 'Pengangkatan berbantuan vakum mempercepat gerakan ambil-pindah-lepas pada siklus repetitif.',
    imageSrc: '/Productivity/imgi_142_6197315e365c_Icon_Ergonomie_Ineffizient_2025.webp',
    imageAlt: 'Ergonomic icon representing inefficiency in handling cycles',
  },
  {
    title: 'More resilient workforce',
    titleId: 'Efisiensi alokasi operator (1 orang vs 2 orang)',
    desc: 'Less physical burden helps teams sustain output over time.',
    descId: 'Beban yang biasanya diangkat oleh 2-3 orang kini cukup ditangani 1 operator dengan aman.',
    imageSrc: '/Productivity/imgi_145_d75966cb42a2_Icon_Ergonomie_Hohe%20Kosten_2025.webp',
    imageAlt: 'Ergonomic icon representing high cost from workforce strain',
  },
];

export default function ProductivityClient() {
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

      <div className={`relative z-10 ${spacingTokens.page.shell} ${spacingTokens.page.containerNarrow} ${spacingTokens.page.stack}`}>
        {/* Back navigation */}
        <nav>
          <Link
            href="/news/ergonomics"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-500 hover:text-[#005596] transition-colors"
          >
            <ArrowLeft size={16} /> {isId ? 'Kembali ke Pusat Ergonomi' : 'Back to Ergonomics Hub'}
          </Link>
        </nav>

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="grid items-end gap-6 lg:grid-cols-12 lg:gap-2"
        >
          <div className="max-w-[540px] lg:col-span-5">
            {/* Standard Glass Pill Badge */}
            <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-emerald-500/15 shadow-[0_2px_10px_rgba(16,185,129,0.06)] mb-4">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-700">
                {isId ? 'Perspektif Performa Lini' : 'Performance Perspective'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.05] text-slate-900 mb-5">
              {isId ? 'Ergonomi sebagai fondasi untuk ' : 'Ergonomics as the foundation for '}
              <span className="bg-gradient-to-r from-[#005596] to-[#1d4ed8] bg-clip-text text-transparent">
                {isId ? 'produktivitas pabrik maksimal' : 'maximum productivity'}
              </span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 font-normal">
              {isId
                ? 'Ergonomi di lini manufaktur berkaitan erat dengan pencapaian target produksi. Ketika beban angkat fisik berkurang drastis, operator dapat mengeksekusi pemindahan barang lebih cepat, presisi, dan stabil hingga jam terakhir shift.'
                : 'Ergonomics is not only a safety topic. It is an operational discipline that protects performance quality. When physical strain decreases, teams can execute tasks faster, cleaner, and more consistently.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-3.5">
              <Link
                href="/digital-assistant/roi-calculator"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#005596] hover:bg-[#004276] text-white text-sm font-bold rounded-full shadow-[0_4px_16px_rgba(0,85,150,0.25)] hover:shadow-[0_8px_24px_rgba(0,85,150,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                <SolidCalculatorIcon className="w-4 h-4" />
                <span>{isId ? 'Hitung Target ROI' : 'Calculate ROI Target'}</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/90 hover:bg-white border border-slate-200/90 hover:border-[#005596]/40 shadow-xs hover:shadow-md text-sm font-bold text-slate-700 hover:text-[#005596] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                <span>{isId ? 'Diskusi dengan Engineering' : 'Discuss with Engineering'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative lg:col-span-7 lg:min-h-[420px] mt-2 md:mt-0">
            <Image
              src="/diva1.webp"
              alt="Industrial productivity ergonomics visual"
              width={1600}
              height={900}
              className="h-auto w-full max-w-[420px] sm:max-w-[560px] md:max-w-[680px] object-contain object-center lg:absolute lg:bottom-[-4rem] lg:right-0 lg:z-20 lg:translate-x-3 drop-shadow-xl"
              priority
            />
          </div>
        </motion.section>

        {/* 2. PRODUCTIVITY IMPACTS : Glass Card Container */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className={`relative rounded-2xl sm:rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] ${spacingTokens.card.feature} overflow-hidden`}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-[#005596] flex items-center justify-center shrink-0">
              <SolidProductivityIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="inline-flex items-center px-3 py-0.5 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-[#005596]/15 shadow-xs mb-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#005596]">
                  {isId ? 'Metrik Performa' : 'Performance Metrics'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {isId ? 'Dampak produktivitas yang dapat diukur di lapangan' : 'Productivity impacts you can measure'}
              </h2>
            </div>
          </div>

          <div className="grid gap-3.5 md:grid-cols-2">
            {impactPoints.map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-md p-3.5 shadow-xs hover:border-[#005596]/30 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start gap-3.5">
                  <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100 border border-slate-200/60">
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold leading-snug text-slate-900 group-hover:text-[#005596] transition-colors">
                      {isId ? item.titleId : item.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-600 font-normal">
                      {isId ? item.descId : item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 3. INFOGRAPHIC DASHBOARD : Glass Card Container */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className={`relative rounded-2xl sm:rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] ${spacingTokens.card.feature} overflow-hidden`}
        >
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
              <SolidProductivityIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="inline-flex items-center px-3 py-0.5 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-emerald-500/15 shadow-xs mb-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-700">
                  {isId ? 'Alur Peningkatan Performa' : 'Performance Storyline'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {isId ? 'Dasbor indikator peningkatan produktivitas' : 'Productivity infographic dashboard'}
              </h2>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch gap-0">
            {kpiCards.map((item, index) => {
              const gainPct = index === 0 ? 72 : index === 1 ? 60 : 80;
              const gainColor = index === 0 ? 'text-[#005596]' : index === 1 ? 'text-emerald-600' : 'text-blue-700';
              const gainBarColor = index === 0 ? 'bg-[#005596]' : index === 1 ? 'bg-emerald-500' : 'bg-blue-600';
              const stageRingColor = index === 0
                ? 'border-[#005596] text-[#005596] bg-blue-50'
                : index === 1
                ? 'border-emerald-500 text-emerald-700 bg-emerald-50'
                : 'border-[#004276] text-[#004276] bg-blue-50';
              const Icon = item.icon;

              return (
                <div key={item.title} className="flex lg:flex-1 flex-col lg:flex-row items-stretch">
                  <div className="flex-1 group rounded-2xl border border-slate-200/90 bg-white/90 backdrop-blur-md p-6 hover:border-[#005596]/40 hover:shadow-lg transition-all duration-300 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full border-2 text-sm font-mono font-black ${stageRingColor}`}>
                        {item.stage}
                      </div>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50/80 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-600">
                        <Icon className="w-3 h-3" />
                        {isId ? item.titleId : item.title}
                      </span>
                    </div>

                    <div>
                      <p className="text-2xl font-black leading-tight text-slate-900 tracking-tight">
                        {isId ? item.valueId : item.value}
                      </p>
                      <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                        {isId ? item.noteId : item.note}
                      </p>
                    </div>

                    <div className="mt-auto space-y-1.5 pt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-mono font-bold text-slate-400">
                          {isId ? 'Tingkat Peningkatan' : 'Gain Level'}
                        </span>
                        <span className={`text-[11px] font-mono font-black ${gainColor}`}>{gainPct}%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                        <div className={`h-full rounded-full ${gainBarColor} transition-all duration-500`} style={{ width: `${gainPct}%` }} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-400">KPI</span>
                        <span className={`text-[10px] font-mono font-bold ${gainColor}`}>{item.metricValue}</span>
                      </div>
                    </div>

                    <div className={`h-1 rounded-full bg-gradient-to-r ${item.accent}`} />
                  </div>

                  {index < kpiCards.length - 1 && (
                    <div className="hidden lg:flex items-center justify-center w-8 shrink-0 text-slate-300">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom summary bar */}
          <div className="mt-6 grid grid-cols-3 divide-x divide-slate-200/80 rounded-2xl border border-slate-200/80 bg-slate-50/80 backdrop-blur-md overflow-hidden">
            {[
              { label: isId ? 'Dampak Cycle Time' : 'Cycle Time Impact', value: '↑ 72%', unit: isId ? 'peningkatan' : 'gain' },
              { label: isId ? 'Penurunan Error' : 'Error Reduction', value: '↓ 60%', unit: 'rework' },
              { label: isId ? 'Konsistensi Shift' : 'Shift Consistency', value: '↑ 80%', unit: isId ? 'stabilitas' : 'stability' },
            ].map((stat) => (
              <div key={stat.label} className="px-4 py-3.5 text-center">
                <p className="text-xl sm:text-2xl font-black text-slate-900 leading-none tracking-tight">{stat.value}</p>
                <p className="text-[9px] font-mono uppercase tracking-[0.18em] font-bold text-emerald-600 mt-1">{stat.unit}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          <p className="mt-3 text-[11px] font-mono text-slate-400 leading-relaxed">
            {isId
              ? 'Gunakan data time-study dan pengukuran cycle time internal pabrik Anda untuk memvalidasi persentase di atas.'
              : 'Replace gain levels with your internal KPI and cycle time measurement data.'}
          </p>
        </motion.section>

        {/* 4. HIDDEN COSTS & BUSINESS CASE : 2 Glass Cards */}
        <section className="grid lg:grid-cols-2 gap-6 lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl sm:rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-amber-500/12 shadow-[0_16px_40px_-10px_rgba(245,158,11,0.06),inset_0_1px_0_0_rgba(255,255,255,0.95)] p-8 flex flex-col justify-between"
          >
            <div>
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 shadow-xs">
                <SolidWarningIcon className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-4">
                {isId ? 'Biaya tersembunyi dari angkat manual non-ergonomis' : 'The hidden cost of non-ergonomic handling'}
              </h3>
              <p className="text-slate-600 leading-relaxed text-base font-normal">
                {isId
                  ? 'Melambatnya ritme kerja akibat kelelahan, jeda istirahat mikro di sela siklus, dan kualitas penempatan yang tidak rata jarang tercatat di laporan harian, namun terakumulasi menjadi kehilangan jam produksi yang besar setiap tahun.'
                  : 'Fatigue-driven slowdown, micro interruptions, and inconsistent execution are usually invisible in daily reporting, but they accumulate into significant annual productivity loss.'}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full bg-slate-100/80 px-3 py-1 text-xs font-mono font-bold text-slate-600 border border-slate-200">
                {isId ? '↓ Kecepatan Siklus' : '↓ Cycle Speed'}
              </span>
              <span className="inline-flex items-center rounded-full bg-amber-50/80 px-3 py-1 text-xs font-mono font-bold text-amber-700 border border-amber-200">
                {isId ? '↑ Jeda Mikro Operator' : '↑ Micro Interruptions'}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl sm:rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] p-8 flex flex-col justify-between"
          >
            <div>
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 border border-blue-200 text-[#005596] shadow-xs">
                <SolidProductivityIcon className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-4">
                {isId ? 'Kalkulasi investasi bisnis yang rasional' : 'A practical business case'}
              </h3>
              <p className="text-slate-600 leading-relaxed text-base font-normal">
                {isId
                  ? 'Investasi sistem Vacuum Lifter dan Manipulator dapat dievaluasi dengan metrik operasional yang jelas: penghematan detik cycle time, penurunan tingkat reject, dan optimalisasi jumlah operator per stasiun kerja.'
                  : 'Ergonomic handling systems can be evaluated with clear operational metrics: cycle time, error rate, absence trend, and manpower utilization efficiency.'}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full bg-emerald-50/80 px-3 py-1 text-xs font-mono font-bold text-emerald-700 border border-emerald-200">
                {isId ? '↑ Optimalisasi Manpower' : '↑ Manpower Utilization'}
              </span>
              <span className="inline-flex items-center rounded-full bg-blue-50/80 px-3 py-1 text-xs font-mono font-bold text-[#005596] border border-blue-200">
                {isId ? '↓ Tren Absensi Sakit' : '↓ Absence Trend'}
              </span>
            </div>
          </motion.div>
        </section>

        {/* 5. KPI TRACKING FRAMEWORK : Glass Card Container */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className={`relative rounded-2xl sm:rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] ${spacingTokens.card.feature} overflow-hidden`}
        >
          <div className="inline-flex items-center px-3 py-0.5 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-emerald-500/15 shadow-xs mb-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-700">
              {isId ? 'Kerangka Pengukuran KPI' : 'KPI Tracking Framework'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-6">
            {isId ? 'Cara mengukur dampak ergonomi di pabrik Anda' : 'How to quantify ergonomics impact in your plant'}
          </h2>

          <div className="grid md:grid-cols-2 gap-3.5">
            {evaluationMetrics.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.metric}
                  className="group flex items-start gap-4 rounded-2xl border border-slate-200/90 bg-white/90 backdrop-blur-md p-4.5 hover:border-[#005596]/40 hover:shadow-md transition-all duration-300 border-l-4 border-l-[#005596]"
                >
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#005596] transition-colors group-hover:bg-[#005596] group-hover:text-white">
                    <Icon className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#005596] mb-1">
                      {isId ? item.sublabelId : item.sublabel}
                    </p>
                    <p className="text-slate-700 text-sm leading-relaxed font-medium">
                      {isId ? item.metricId : item.metric}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-slate-400 mt-5 leading-relaxed font-mono">
            {isId
              ? 'Tip engineering: catat perbandingan cycle time sebelum dan sesudah trial unit untuk menyusun proposal investasi CAPEX yang akurat.'
              : 'Tip: publish this section with before-after charts from your own implementation data for stronger credibility.'}
          </p>
        </motion.section>

        {/* 6. CASE STUDIES */}
        <ErgonomicsCaseStudies topic="productivity" />

        {/* Recommended Next Step : Dark Engineering Card */}
        <section className="relative overflow-visible">
          <div className="bg-gradient-to-br from-[#002244] via-[#003b6d] to-[#005596] text-white rounded-[2rem] border border-white/20 p-8 sm:p-10 md:p-12 relative overflow-hidden shadow-[0_24px_60px_-15px_rgba(0,85,150,0.4),inset_0_1px_0_0_rgba(255,255,255,0.25)]">
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-400/20 rounded-full blur-[100px] pointer-events-none" />
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.08]"
              style={{
                backgroundImage:
                  'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            <div className="relative z-10 max-w-3xl">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-widest px-3 py-1 bg-white/12 backdrop-blur-xl rounded-full border border-white/25 text-blue-100 shadow-xs mb-4">
                <SolidProductivityIcon className="w-3.5 h-3.5" />
                <span>{isId ? 'Rekomendasi Langkah Berikutnya' : 'Recommended Next Step'}</span>
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 tracking-tight leading-tight">
                {isId ? 'Simulasikan potensi peningkatan produktivitas dan ROI Anda' : 'Model your potential productivity and ROI uplift'}
              </h2>
              <p className="text-blue-100/90 leading-relaxed mb-8 max-w-2xl font-normal text-sm sm:text-base">
                {isId
                  ? 'Gunakan kalkulator digital kami untuk mengestimasi penghematan waktu siklus dan periode balik modal investasi berdasarkan parameter operasional Anda.'
                  : 'Use our digital calculator to estimate handling improvement potential based on your operating scenario.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3.5">
                <Link
                  href="/digital-assistant/roi-calculator"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-blue-50 text-[#005596] text-sm font-bold rounded-full shadow-[0_10px_28px_-6px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                >
                  <SolidCalculatorIcon className="w-4.5 h-4.5" />
                  <span>{isId ? 'Mulai Kalkulasi ROI' : 'Start Calculation'}</span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 backdrop-blur-xl text-white text-sm font-bold shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                >
                  <span>{isId ? 'Minta Evaluasi Produktivitas Lini' : 'Request Productivity Assessment'}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Next / Related Topics : 2 Glass Cards */}
        <section className="grid md:grid-cols-2 gap-4">
          <Link
            href="/news/ergonomics/health-risks"
            className="group rounded-2xl sm:rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-sm hover:shadow-xl hover:border-[#005596]/40 p-6 sm:p-7 transition-all duration-300"
          >
            <span className="inline-block text-[11px] font-mono font-bold uppercase tracking-widest text-[#005596] mb-2">
              {isId ? 'Topik Terkait' : 'Related Topic'}
            </span>
            <h3 className="text-xl font-black text-slate-900 group-hover:text-[#005596] transition-colors tracking-tight">
              {isId ? 'Risiko Kesehatan & Cedera MSD' : 'Health risks and diseases'}
            </h3>
            <p className="text-slate-600 mt-2 text-sm leading-relaxed font-normal">
              {isId
                ? 'Pahami pola beban otot-tulang pada operator dan titik pencegahan utamanya.'
                : 'Understand operator strain patterns and preventive action points.'}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 font-bold text-xs font-mono text-[#005596] group-hover:translate-x-1 transition-transform">
              {isId ? 'Buka topik' : 'Open topic'} <ArrowRight size={13} />
            </span>
          </Link>

          <Link
            href="/news/ergonomics/safety-standards"
            className="group rounded-2xl sm:rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-sm hover:shadow-xl hover:border-[#005596]/40 p-6 sm:p-7 transition-all duration-300"
          >
            <span className="inline-block text-[11px] font-mono font-bold uppercase tracking-widest text-[#005596] mb-2">
              {isId ? 'Topik Selanjutnya' : 'Next Topic'}
            </span>
            <h3 className="text-xl font-black text-slate-900 group-hover:text-[#005596] transition-colors tracking-tight">
              {isId ? 'Standar Keselamatan & Kepatuhan K3' : 'Safety standards and compliance'}
            </h3>
            <p className="text-slate-600 mt-2 text-sm leading-relaxed font-normal">
              {isId
                ? 'Hubungkan implementasi ergonomi dengan standar K3 dan sertifikasi medis internasional.'
                : 'Connect ergonomic implementation with practical safety frameworks.'}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 font-bold text-xs font-mono text-[#005596] group-hover:translate-x-1 transition-transform">
              {isId ? 'Buka topik' : 'Open topic'} <ArrowRight size={13} />
            </span>
          </Link>
        </section>
      </div>
    </main>
  );
}
