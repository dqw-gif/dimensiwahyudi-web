'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import {
  SolidSafetyIcon,
  SolidProductivityIcon,
  SolidCalculatorIcon,
  SolidWarningIcon,
} from '../../../components/icons/ErgonomicsSolidIcons';
import { spacingTokens } from '../../../constants/spacingTokens';
import { useLanguage } from '../../../components/LanguageProvider';
import { MobileSnapCarousel } from '../../../components/ui/MobileSnapCarousel';

const benchmarkCards = [
  {
    title: 'Fatigue-Related Slowdown',
    titleId: 'Penurunan Kecepatan Akibat Kelelahan',
    value: '12-25%',
    valueId: '12-25%',
    note: 'Typical end-of-shift handling slowdown in non-ergonomic repetitive tasks.',
    noteId: 'Rata-rata pelambatan ritme angkat pada akhir shift di lini manual tanpa alat bantu ergonomi.',
    icon: SolidWarningIcon,
    color: 'text-rose-600 bg-rose-50/80 border-rose-200/80',
  },
  {
    title: 'Potential Throughput Lift',
    titleId: 'Potensi Kenaikan Throughput',
    value: '8-22%',
    valueId: '8-22%',
    note: 'Indicative gain when high-strain manual handling is assisted by ergonomic systems.',
    noteId: 'Peningkatan output terukur saat proses angkat berat dibantu oleh sistem Vacuum Lifter ergonomis.',
    icon: SolidProductivityIcon,
    color: 'text-emerald-600 bg-emerald-50/80 border-emerald-200/80',
  },
  {
    title: 'Handling Safety Consistency',
    titleId: 'Konsistensi Keselamatan Kerja',
    value: 'Higher',
    valueId: 'Lebih Stabil',
    note: 'Structured ergonomic workflows reduce risky movement variability across shifts.',
    noteId: 'Alur kerja ergonomis menekan risiko gerakan bungkuk atau puntir berbahaya antar-shift.',
    icon: SolidSafetyIcon,
    color: 'text-[#005596] bg-blue-50/80 border-blue-200/80',
  },
];

const implementationSteps = [
  {
    step: '01',
    title: 'Identify High-Strain Tasks',
    titleId: 'Identifikasi Titik Beban Berat',
    desc: 'Map lifting frequency, awkward posture exposure, and load characteristics by workstation.',
    descId: 'Petakan frekuensi angkat, paparan postur bungkuk, dan karakteristik workpiece di setiap stasiun kerja.',
  },
  {
    step: '02',
    title: 'Quantify Business Impact',
    titleId: 'Hitung Dampak Operasional & ROI',
    desc: 'Estimate cycle-time loss, quality disruption, and absence risk using baseline operational data.',
    descId: 'Hitung potensi waktu cycle time yang hilang, risiko cacat produk, dan absensi operator dari data lini Anda.',
  },
  {
    step: '03',
    title: 'Deploy Assisted Handling',
    titleId: 'Implementasi Alat Bantu Angkat',
    desc: 'Prioritize technical controls and validate results through KPI-based pilot implementation.',
    descId: 'Terapkan solusi teknis Vacuum Tube Lifter atau Manipulator dan validasi hasilnya lewat KPI lapangan.',
  },
];

const visualNavigationTiles = [
  {
    title: 'Ergonomics for Every Industry',
    titleId: 'Ergonomi untuk Setiap Industri',
    desc: 'Start from the complete hub and pick your implementation path.',
    descId: 'Mulai dari pusat panduan ini dan pilih fokus evaluasi ergonomi pabrik Anda.',
    href: '/news/ergonomics',
    disabled: true,
    image: '/Ergonomics/ERGONOMICS%20FOR%20EVERY%20INDUSTRY%20(COMPRESS).webp',
    position: 'center 30%',
    className: 'md:col-span-7 md:row-span-2 min-h-[340px] md:min-h-[460px]',
  },
  {
    title: 'Health Risks and MSD Exposure',
    titleId: 'Risiko Kesehatan & Paparan MSD',
    desc: 'Identify strain patterns and high-risk manual handling tasks.',
    descId: 'Kenali pola ketegangan otot-tulang dan aktivitas angkat manual berisiko tinggi.',
    href: '/news/ergonomics/health-risks',
    image: '/Ergonomics/HEALTH%20RISKS%20&%20MSD%20EXPOSURE%20(COMPRESS).webp',
    position: 'center 38%',
    className: 'md:col-span-5 min-h-[220px]',
  },
  {
    title: 'Productivity Impact',
    titleId: 'Dampak pada Produktivitas Pabrik',
    desc: 'Translate ergonomics into throughput and quality consistency.',
    descId: 'Konversikan perbaikan ergonomi menjadi stabilitas cycle time dan konsistensi kualitas.',
    href: '/news/ergonomics/productivity',
    image: '/Ergonomics/PRODUCTIVITY%20IMPACT%20(COMPRESS).webp',
    position: 'center 32%',
    className: 'md:col-span-5 min-h-[220px]',
  },
  {
    title: 'Safety and Standards',
    titleId: 'Standar Keselamatan & Kepatuhan K3',
    desc: 'Map controls to practical compliance on your production floor.',
    descId: 'Selaraskan pengendalian risiko teknis dengan regulasi K3 dan sertifikasi AGR di lantai produksi.',
    href: '/news/ergonomics/safety-standards',
    image: '/Ergonomics/SAFETY%20&%20STANDARDS%20(COMPRESS).webp',
    position: 'center 40%',
    className: 'md:col-span-4 min-h-[220px]',
  },
  {
    title: 'Open ROI Calculator',
    titleId: 'Buka Kalkulator ROI',
    desc: 'Estimate ergonomic impact and investment economics quickly.',
    descId: 'Simulasikan penghematan biaya operasional dan periode balik modal investasi secara cepat.',
    href: '/digital-assistant/roi-calculator',
    image: '/Ergonomics/ROI%20CALCULATOR%20(COMPRESS).webp',
    position: 'center 38%',
    className: 'md:col-span-4 min-h-[220px]',
  },
  {
    title: 'Selection Aids',
    titleId: 'Selection Aids',
    desc: 'Use digital assistant tools to shortlist suitable handling systems.',
    descId: 'Gunakan asisten digital untuk memilih spesifikasi sistem angkat yang sesuai.',
    href: '/digital-assistant/selection-aids',
    image: '/Ergonomics/SELECTION%20AIDS%20(COMPRESS).webp',
    position: 'center 34%',
    className: 'md:col-span-4 min-h-[220px]',
  },
];

export default function ErgonomicsHubClient() {
  const { lang } = useLanguage();
  const isId = lang === 'id';

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-[#005596] relative overflow-hidden">
      {/* Contained Ambient Specular Glow Orbs (DESIGN_SYSTEM formula) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-20 left-1/4 w-[600px] h-[400px] bg-[#005596]/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[350px] bg-[#1d4ed8]/4 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f080_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f080_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />
      </div>

      <div className={`relative z-10 ${spacingTokens.page.shell} ${spacingTokens.page.container} ${spacingTokens.page.stack}`}>
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="grid items-end gap-6 lg:grid-cols-12 lg:gap-2 pb-0 md:pb-0"
        >
          <div className="max-w-[540px] lg:col-span-5">
            {/* Standard Glass Pill Badge */}
            <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-[#005596]/15 shadow-[0_2px_10px_rgba(0,85,150,0.06)] mb-5">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#005596]">
                {isId ? 'Pusat Panduan Ergonomi Industri' : 'Industrial Ergonomics Knowledge Hub'}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-5 leading-[1.1]">
              {isId ? 'Lindungi Operator.' : 'Protect Operators.'}{' '}
              <span className="bg-gradient-to-r from-[#005596] to-[#1d4ed8] bg-clip-text text-transparent">
                {isId ? 'Tingkatkan Throughput.' : 'Improve Throughput.'}
              </span>
            </h1>

            <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl font-normal">
              {isId
                ? 'Pusat panduan teknis ini membantu tim engineering dan HSE mengevaluasi ergonomi dari tiga sisi utama: pencegahan cedera tulang belakang, stabilitas produktivitas shift, dan kepatuhan standar keselamatan kerja di lantai produksi Indonesia.'
                : 'This hub helps industrial teams evaluate ergonomics from every critical angle: health risk prevention, productivity performance, and workplace safety compliance. Built for practical implementation on real production floors in Indonesia.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-3.5 mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#005596] hover:bg-[#004276] text-white text-sm font-bold rounded-full shadow-[0_4px_16px_rgba(0,85,150,0.25)] hover:shadow-[0_8px_24px_rgba(0,85,150,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                <span>{isId ? 'Minta Konsultasi Engineering' : 'Request Engineering Consultation'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/digital-assistant/roi-calculator"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/90 hover:bg-white border border-slate-200/90 hover:border-[#005596]/40 shadow-xs hover:shadow-md text-sm font-bold text-[#005596] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                <span>{isId ? 'Buka Kalkulator ROI' : 'Open ROI Calculator'}</span>
              </Link>
            </div>
          </div>

          <div className="relative lg:col-span-7 lg:min-h-[420px] -mb-12 md:-mb-16 lg:mb-0 z-20 flex justify-center lg:block">
            <Image
              src="/divdin.webp"
              alt="Industrial ergonomics implementation visual"
              width={1280}
              height={1280}
              className="h-auto w-full max-w-[420px] sm:max-w-[520px] lg:max-w-[680px] object-contain object-bottom lg:absolute lg:bottom-[-4rem] lg:right-0 lg:z-20 lg:translate-x-3 drop-shadow-xl"
              priority
            />
          </div>
        </motion.section>

        {/* Why this topic matters now : Glass Card */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className={`relative rounded-2xl sm:rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] ${spacingTokens.card.feature} overflow-hidden`}
        >
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-60 bg-[#005596]/5 rounded-full blur-[100px] pointer-events-none" />
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-3">
            {isId ? 'Mengapa ergonomi krusial bagi operasional pabrik' : 'Why this topic matters now'}
          </h2>
          <p className="text-slate-600 leading-relaxed font-normal text-sm sm:text-base">
            {isId
              ? 'Ergonomi di lini manufaktur berdampak langsung pada keandalan jadwal produksi, konsistensi cycle time, dan retensi tenaga kerja terampil. Lini yang masih mengandalkan angkat manual berulang sering mengalami kerugian tersembunyi akibat absensi cedera pinggang, variasi kualitas di jam akhir shift, serta risiko kecelakaan kerja.'
              : 'Ergonomics is no longer just a health initiative. It is now a strategic lever for plant reliability, productivity consistency, and sustainable workforce performance. Teams that ignore ergonomics often face hidden losses through absenteeism, quality variation, and avoidable operational risk.'}
          </p>
        </motion.section>

        {/* Visual Navigation Tiles */}
        <section>
          <div className="flex items-end justify-between mb-6 md:mb-8 gap-4">
            <div>
              <div className="inline-flex items-center px-3 py-0.5 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-[#005596]/15 shadow-xs mb-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#005596]">
                  {isId ? 'Navigasi Topik' : 'Visual Navigation'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                {isId ? 'Telusuri Ergonomi Berdasarkan Skenario' : 'Explore Ergonomics by Scenario'}
              </h2>
            </div>
          </div>

          <MobileSnapCarousel
            breakpoint="md"
            desktopGridClassName="grid-cols-12 gap-4 md:gap-5 auto-rows-fr"
            cardWidthClass="w-[85vw] max-w-[320px] shrink-0 snap-center min-h-[300px]"
            swipeLabelId="Geser untuk memilih skenario ergonomi"
            swipeLabelEn="Swipe to explore ergonomics scenarios"
            isId={isId}
          >
            {visualNavigationTiles.map((tile, idx) => (
              tile.disabled ? (
                <article
                  key={tile.title}
                  aria-current="page"
                  className={`relative overflow-hidden rounded-3xl border border-slate-200/90 shadow-sm min-h-[300px] h-full ${tile.className}`}
                >
                  <Image
                    src={tile.image}
                    alt={isId ? tile.titleId : tile.title}
                    fill
                    className="object-cover"
                    style={{ objectPosition: tile.position ?? 'center' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/40 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 text-white">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 backdrop-blur-md px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-[0.15em] mb-3 shadow-xs">
                      {isId ? 'Topik Saat Ini' : 'Current topic'}
                    </div>
                    <h3 className="text-xl md:text-2xl font-black leading-tight tracking-tight">
                      {isId ? tile.titleId : tile.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-100/90 max-w-2xl">
                      {isId ? tile.descId : tile.desc}
                    </p>
                  </div>
                </article>
              ) : (
                <motion.div
                  key={tile.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className={`min-h-[300px] h-full ${tile.className}`}
                >
                  <Link
                    href={tile.href}
                    className="group relative block h-full w-full overflow-hidden rounded-3xl border border-slate-200/90 shadow-sm hover:border-[#005596]/40 hover:shadow-2xl transition-all duration-300"
                  >
                    <Image
                      src={tile.image}
                      alt={isId ? tile.titleId : tile.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{ objectPosition: tile.position ?? 'center' }}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/40 to-transparent transition-opacity group-hover:from-slate-950/90" />

                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 text-white">
                      <div className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/15 backdrop-blur-md px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-[0.15em] mb-3 shadow-xs group-hover:bg-[#005596]/40 transition-colors">
                        <span>{isId ? 'Buka Topik' : 'Open topic'}</span>
                        <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-black leading-tight tracking-tight group-hover:text-blue-100 transition-colors">
                        {isId ? tile.titleId : tile.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-100/90 max-w-2xl font-normal leading-relaxed">
                        {isId ? tile.descId : tile.desc}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              )
            ))}
          </MobileSnapCarousel>
          <p className="text-xs text-slate-400 mt-4 font-mono">
            {isId
              ? 'Visual menggunakan dokumentasi proyek industri asli dari arsip portofolio PT Dimensi Quantum Wahyudi.'
              : 'Visuals use real industrial project photos from PT Dimensi Quantum Wahyudi portfolio archives.'}
          </p>
        </section>

        {/* Operational Snapshot : Glass Card Container */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className={`relative rounded-2xl sm:rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] ${spacingTokens.card.inset} overflow-hidden`}
        >
          <div className="flex items-end justify-between mb-6 gap-4">
            <div>
              <div className="inline-flex items-center px-3 py-0.5 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-[#005596]/15 shadow-xs mb-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#005596]">
                  {isId ? 'Ringkasan Operasional' : 'Operational Snapshot'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                {isId ? 'Ringkasan dampak ergonomi di lini produksi' : 'Ergonomics impact at a glance'}
              </h2>
            </div>
          </div>
          <MobileSnapCarousel
            breakpoint="md"
            desktopGridClassName="grid-cols-3 gap-4"
            cardWidthClass="w-[85vw] max-w-[320px] shrink-0 snap-center"
            swipeLabelId="Geser untuk melihat dampak metrik lainnya"
            swipeLabelEn="Swipe to view more impact metrics"
            isId={isId}
          >
            {benchmarkCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-md p-5 shadow-xs hover:border-[#005596]/30 hover:shadow-md transition-all duration-300 h-full flex flex-col"
                >
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${card.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-mono font-bold uppercase tracking-[0.16em] text-slate-500 mb-2">
                    {isId ? card.titleId : card.title}
                  </p>
                  <p className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
                    {isId ? card.valueId : card.value}
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed mt-auto">
                    {isId ? card.noteId : card.note}
                  </p>
                </div>
              );
            })}
          </MobileSnapCarousel>
          <p className="text-xs text-slate-400 mt-4 font-mono">
            {isId
              ? 'Angka patokan indikatif untuk diskusi perencanaan engineering. Gunakan data aktual pabrik Anda pada Kalkulator ROI untuk perhitungan presisi.'
              : 'Indicative benchmarks for planning discussion. Replace with audited project data for publication-ready claims.'}
          </p>
        </motion.section>

        {/* Implementation Framework : Glass Card Container */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className={`relative rounded-2xl sm:rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] ${spacingTokens.card.inset} overflow-hidden`}
        >
          <div className="inline-flex items-center px-3 py-0.5 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-[#005596]/15 shadow-xs mb-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#005596]">
              {isId ? 'Kerangka Implementasi' : 'Implementation Framework'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-4 sm:mb-6">
            {isId ? 'Dari pemetaan risiko hingga instalasi sistem' : 'From risk mapping to ergonomic deployment'}
          </h2>
          <MobileSnapCarousel
            breakpoint="md"
            desktopGridClassName="grid-cols-3 gap-4"
            cardWidthClass="w-[85vw] max-w-[320px] shrink-0 snap-center"
            swipeLabelId="Geser untuk melihat tahap implementasi"
            swipeLabelEn="Swipe to view implementation steps"
            isId={isId}
          >
            {implementationSteps.map((item) => (
              <div
                key={item.step}
                className="relative rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-md p-5 shadow-xs hover:border-[#005596]/30 hover:shadow-md transition-all duration-300 h-full flex flex-col"
              >
                <p className="text-xs font-mono font-black text-[#005596] tracking-[0.2em] mb-3">
                  {isId ? `TAHAP ${item.step}` : `STEP ${item.step}`}
                </p>
                <h3 className="text-lg font-black text-slate-900 mb-2 tracking-tight">
                  {isId ? item.titleId : item.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mt-auto">
                  {isId ? item.descId : item.desc}
                </p>
              </div>
            ))}
          </MobileSnapCarousel>
        </motion.section>

        {/* Next Action Section (Dark Engineering Card) */}
        <section className="relative overflow-visible">
          <div className="bg-gradient-to-br from-[#002244] via-[#003b6d] to-[#005596] text-white rounded-[2rem] border border-white/20 relative overflow-hidden shadow-[0_24px_60px_-15px_rgba(0,85,150,0.4),inset_0_1px_0_0_rgba(255,255,255,0.25)] lg:[padding-right:clamp(0px,42%,520px)]">
            {/* Ambient specular glows */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-400/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-sky-300/15 rounded-full blur-[100px] pointer-events-none" />

            {/* Blueprint Grid Texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.08]"
              style={{
                backgroundImage:
                  'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            <div className="relative z-10 p-6 sm:p-8 md:p-12 flex flex-col items-center lg:items-start text-center lg:text-left">
              <span className="inline-block text-[11px] font-mono font-bold uppercase tracking-widest px-3 py-1 bg-white/12 backdrop-blur-xl rounded-full border border-white/25 text-blue-100 shadow-xs mb-3">
                {isId ? 'Langkah Selanjutnya' : 'Next Action'}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 tracking-tight leading-tight max-w-xl lg:max-w-none">
                {isId ? 'Hitung nilai ekonomis investasi ergonomi Anda' : 'Measure the economics of ergonomic investment'}
              </h2>
              <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed mb-6 sm:mb-7 font-normal max-w-lg lg:max-w-none">
                {isId
                  ? 'Gunakan Kalkulator ROI untuk mengestimasi potensi peningkatan throughput dan penghematan biaya operasional sesuai parameter angkat di pabrik Anda.'
                  : 'Use the ROI calculator to estimate potential productivity gains and operational savings for your handling scenario.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto justify-center lg:justify-start">
                <Link
                  href="/digital-assistant/roi-calculator"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-blue-50 text-[#005596] text-sm font-bold rounded-full shadow-[0_10px_28px_-6px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                >
                  <SolidCalculatorIcon className="w-4.5 h-4.5" />
                  <span>{isId ? 'Buka Kalkulator ROI' : 'Open Calculator'}</span>
                </Link>
                <Link
                  href="/digital-assistant/selection-aids"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 backdrop-blur-xl text-white text-sm font-bold shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                >
                  <span>Selection Aids</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Character image */}
          <div
            className="hidden lg:block absolute right-0 bottom-0 pointer-events-none select-none"
            style={{ width: 'clamp(320px, 40%, 500px)' }}
          >
            <Image
              src="/dian.webp"
              alt="Economic calculation visual for ergonomic investment"
              width={900}
              height={1100}
              className="w-full h-auto object-contain object-bottom drop-shadow-2xl translate-y-0 -mt-24"
              style={{ marginTop: '-6rem' }}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
