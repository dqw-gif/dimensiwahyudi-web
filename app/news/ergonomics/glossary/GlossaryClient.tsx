'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Search, BookOpen, Layers, Users, Wrench } from 'lucide-react';
import { spacingTokens } from '../../../../constants/spacingTokens';
import { useLanguage } from '../../../../components/LanguageProvider';
import { MobileSnapCarousel } from '../../../../components/ui/MobileSnapCarousel';

const roleUsage = [
  {
    role: 'Engineering Team',
    roleId: 'Tim Engineering',
    icon: Wrench,
    use: 'Align technical discussion on load profile, workstation design, and control options.',
    useId: 'Menyamakan acuan teknis terkait karakteristik payload, tata letak stasiun kerja, dan pilihan alat bantu angkat.',
  },
  {
    role: 'Procurement Team',
    roleId: 'Tim Procurement',
    icon: Layers,
    use: 'Evaluate requirement scope and compare ergonomic solution proposals consistently.',
    useId: 'Mengevaluasi ruang lingkup spesifikasi teknis dan membandingkan proposal investasi alat secara objektif.',
  },
  {
    role: 'Plant and HSE Team',
    roleId: 'Tim Plant & HSE (K3)',
    icon: Users,
    use: 'Standardize language for risk review, training, and implementation decisions.',
    useId: 'Menstandarkan istilah pada saat audit risiko K3, pelatihan operator, dan pengambilan keputusan di pabrik.',
  },
];

const terms = [
  {
    term: 'Ergonomics',
    termId: 'Ergonomi Industri (Industrial Ergonomics)',
    category: 'Fundamental',
    categoryId: 'Fondasi',
    def: 'The discipline of adapting work, tools, and environment to human capability to improve safety, comfort, and performance.',
    defId: 'Disiplin rekayasa yang menyesuaikan stasiun kerja, alat bantu angkat, dan alur proses dengan batas kemampuan fisik manusia guna meningkatkan keselamatan dan throughput.',
  },
  {
    term: 'Musculoskeletal Disorders (MSDs)',
    termId: 'Musculoskeletal Disorders (MSDs)',
    category: 'Health & Risk',
    categoryId: 'Kesehatan & Risiko',
    def: 'Injuries or disorders affecting muscles, joints, tendons, and related structures, often linked to repetitive strain and awkward posture.',
    defId: 'Cedera atau gangguan pada otot, sendi, ligamen, dan tulang belakang yang dipicu oleh pengangkatan beban berulang serta postur kerja yang membungkuk atau memutar.',
  },
  {
    term: 'Manual Handling',
    termId: 'Manual Handling (Pengangkatan Manual)',
    category: 'Operations',
    categoryId: 'Operasional',
    def: 'Lifting, carrying, pushing, pulling, or moving loads by human effort, with varying physical risk depending on weight and frequency.',
    defId: 'Aktivitas mengangkat, menahan, mendorong, menarik, atau memindahkan beban menggunakan tenaga otot manusia, dengan tingkat risiko yang bergantung pada berat payload dan frekuensi siklus.',
  },
  {
    term: 'Repetitive Strain',
    termId: 'Repetitive Strain (Beban Berulang)',
    category: 'Health & Risk',
    categoryId: 'Kesehatan & Risiko',
    def: 'Cumulative physical stress from repeating similar motions over time, potentially reducing comfort and control quality.',
    defId: 'Ketegangan fisik kumulatif akibat mengulang gerakan angkat-pindah yang sama ribuan kali per shift, yang menurunkan presisi dan memicu cedera otot.',
  },
  {
    term: 'Awkward Posture',
    termId: 'Awkward Posture (Postur Janggal)',
    category: 'Ergonomics',
    categoryId: 'Ergonomi',
    def: 'Body positioning that places joints outside neutral alignment, increasing fatigue and risk of long-term strain.',
    defId: 'Posisi tubuh yang menempatkan tulang belakang atau sendi di luar posisi netral (seperti membungkuk ke palet bawah atau menjangkau di atas bahu), yang mempercepat kelelahan.',
  },
  {
    term: 'Engineering Control',
    termId: 'Engineering Control (Pengendalian Teknis)',
    category: 'Safety Standard',
    categoryId: 'Standar K3',
    def: 'A technical intervention that reduces hazard exposure at the source, such as lifting assistance and ergonomic handling systems.',
    defId: 'Intervensi teknis yang menghilangkan beban bahaya langsung dari sumbernya, seperti penggunaan Vacuum Tube Lifter, VacuMaster, atau Binar Quick-Lift.',
  },
  {
    term: 'Cycle Time',
    termId: 'Cycle Time (Waktu Siklus)',
    category: 'Productivity',
    categoryId: 'Produktivitas',
    def: 'The total time required to complete one operational handling cycle in a process.',
    defId: 'Total waktu (detik) yang dibutuhkan untuk menyelesaikan satu siklus penuh pengambilan, pemindahan, dan pelepasan workpiece.',
  },
  {
    term: 'ROI (Return on Investment)',
    termId: 'ROI (Return on Investment)',
    category: 'Finance & Planning',
    categoryId: 'Finansial & ROI',
    def: 'A financial metric used to evaluate whether gains from ergonomic investment justify the implementation cost.',
    defId: 'Metrik finansial untuk menghitung periode balik modal investasi alat berdasarkan penghematan tenaga kerja, percepatan cycle time, dan pencegahan biaya medis.',
  },
  {
    term: 'Workstation Design',
    termId: 'Workstation Design (Desain Stasiun Kerja)',
    category: 'Engineering',
    categoryId: 'Engineering',
    def: 'Layout and equipment configuration designed to support safe posture, efficient motion, and consistent output quality.',
    defId: 'Tata letak area kerja, jangkauan Jib Crane, dan penempatan konveyor/palet yang dirancang untuk mendukung postur kerja tegak dan gerakan yang efisien.',
  },
  {
    term: 'Fatigue Management',
    termId: 'Fatigue Management (Manajemen Kelelahan)',
    category: 'Operations',
    categoryId: 'Operasional',
    def: 'Operational strategies to reduce physical and mental exhaustion that can affect safety and productivity.',
    defId: 'Strategi operasional dan mekanis untuk menekan kelelahan fisik operator agar kecepatan produksi di akhir shift tetap sama stabilnya dengan awal shift.',
  },
];

export default function GlossaryClient() {
  const { lang } = useLanguage();
  const isId = lang === 'id';
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTerms = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return terms;
    return terms.filter((item) => {
      const termMatch = (isId ? item.termId : item.term).toLowerCase().includes(q);
      const defMatch = (isId ? item.defId : item.def).toLowerCase().includes(q);
      const catMatch = (isId ? item.categoryId : item.category).toLowerCase().includes(q);
      return termMatch || defMatch || catMatch;
    });
  }, [searchQuery, isId]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-[#005596] relative overflow-hidden">
      {/* Contained Ambient Specular Glow Orbs (DESIGN_SYSTEM.md Rule 2) */}
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
          className="max-w-3xl"
        >
          {/* Standard Glass Pill Badge */}
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-[#005596]/15 shadow-[0_2px_10px_rgba(0,85,150,0.06)] mb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#005596]">
              {isId ? 'Glosarium & Acuan Teknis' : 'Industrial Ergonomics Glossary'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.1] mb-5">
            {isId ? 'Glosarium & Terminologi ' : 'Industrial Ergonomics '}
            <span className="bg-gradient-to-r from-[#005596] to-[#1d4ed8] bg-clip-text text-transparent">
              {isId ? 'Ergonomi Industri' : 'Glossary & Reference'}
            </span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
            {isId
              ? 'Referensi praktis untuk menyamakan pemahaman teknis antara tim engineering, procurement, HSE (K3), dan operasional pabrik saat merencanakan sistem material handling ergonomis.'
              : 'A practical reference to align technical understanding across engineering, procurement, HSE, and plant operations when designing ergonomic handling systems.'}
          </p>
        </motion.section>

        {/* Master Glossary Card (Anti-Card Fatigue Container with Search) */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl sm:rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] p-6 sm:p-10 overflow-hidden"
        >
          {/* Header & Search Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-[#005596] flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {isId ? 'Daftar Istilah Teknis' : 'Technical Terminology'}
                </h2>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  {isId
                    ? `Menampilkan ${filteredTerms.length} dari ${terms.length} istilah`
                    : `Showing ${filteredTerms.length} of ${terms.length} terms`}
                </p>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isId ? 'Cari istilah atau kata kunci...' : 'Search term or keyword...'}
                className="w-full pl-9 pr-4 py-2.5 rounded-full bg-white/90 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#005596]/30 focus:border-[#005596] transition-all"
              />
            </div>
          </div>

          {/* Clean Editorial Term List (Anti-Card Fatigue) */}
          <div className="divide-y divide-slate-100">
            {filteredTerms.length === 0 ? (
              <div className="py-12 text-center text-slate-500">
                <p className="text-sm font-medium">
                  {isId
                    ? `Tidak ada istilah yang cocok dengan "${searchQuery}"`
                    : `No terms matched "${searchQuery}"`}
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="mt-3 text-xs font-bold text-[#005596] hover:underline cursor-pointer"
                >
                  {isId ? 'Reset pencarian' : 'Reset search'}
                </button>
              </div>
            ) : (
              filteredTerms.map((item, idx) => (
                <div
                  key={item.term}
                  className="py-5 sm:py-6 group flex flex-col md:flex-row md:items-start gap-3 md:gap-8 hover:bg-[#005596]/[0.02] -mx-4 px-4 sm:-mx-6 sm:px-6 transition-colors rounded-xl"
                >
                  <div className="md:w-64 shrink-0 flex items-start gap-3">
                    <span className="text-xs font-mono font-bold text-[#005596]/60 pt-0.5 shrink-0">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#005596] transition-colors">
                        {isId ? item.termId : item.term}
                      </h3>
                      <span className="inline-block mt-1 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {isId ? item.categoryId : item.category}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal flex-1 pt-0.5">
                    {isId ? item.defId : item.def}
                  </p>
                </div>
              ))
            )}
          </div>
        </motion.section>

        {/* How To Use This Glossary : Frosted Glass Container */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className={`relative rounded-2xl sm:rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] ${spacingTokens.card.feature} overflow-hidden`}
        >
          <div className="inline-flex items-center px-3 py-0.5 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-[#005596]/15 shadow-xs mb-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#005596]">
              {isId ? 'Penerapan Lintas Divisi' : 'Cross-Functional Use'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-6">
            {isId ? 'Gunakan terminologi yang seragam lintas tim' : 'Apply a shared vocabulary across teams'}
          </h2>

          <MobileSnapCarousel
            breakpoint="md"
            desktopGridClassName="grid-cols-3 gap-4"
            cardWidthClass="w-[85vw] max-w-[320px] shrink-0 snap-center"
            swipeLabelId="Geser untuk melihat peran divisi lainnya"
            swipeLabelEn="Swipe to view other team applications"
            isId={isId}
          >
            {roleUsage.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.role}
                  className="rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-md p-5 shadow-xs hover:border-[#005596]/30 hover:shadow-md transition-all duration-300 h-full flex flex-col"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-[#005596] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2">
                    {isId ? item.roleId : item.role}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mt-auto">
                    {isId ? item.useId : item.use}
                  </p>
                </div>
              );
            })}
          </MobileSnapCarousel>
        </motion.section>

        {/* Dark Engineering Blueprint Card (DESIGN_SYSTEM.md Rule 3 & 4) */}
        <section className="relative overflow-hidden">
          <div className="bg-gradient-to-br from-[#002244] via-[#003b6d] to-[#005596] text-white rounded-[2rem] border border-white/20 relative overflow-hidden shadow-[0_24px_60px_-15px_rgba(0,85,150,0.4),inset_0_1px_0_0_rgba(255,255,255,0.25)] p-7 sm:p-10 md:p-12">
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

            <div className="relative z-10 max-w-2xl">
              <span className="inline-block text-[11px] font-mono font-bold uppercase tracking-widest px-3 py-1 bg-white/12 backdrop-blur-xl rounded-full border border-white/25 text-blue-100 shadow-xs mb-4">
                {isId ? 'Konsultasi Teknis' : 'Technical Consultation'}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 tracking-tight leading-tight">
                {isId
                  ? 'Butuh panduan teknis untuk aplikasi spesifik di pabrik Anda?'
                  : 'Need guidance for your specific application?'}
              </h2>
              <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed mb-8 font-normal">
                {isId
                  ? 'Tim Application Engineer PT Dimensi Quantum Wahyudi siap menerjemahkan kebutuhan ergonomi menjadi rekomendasi sistem Vacuum Lifter atau Manipulator yang terukur untuk lini Anda.'
                  : 'Our application engineering team can translate ergonomics principles into practical handling recommendations for your plant process.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3.5">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-blue-50 text-[#005596] text-sm font-bold rounded-full shadow-[0_10px_28px_-6px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer text-center"
                >
                  <span>{isId ? 'Minta Konsultasi Engineering' : 'Request Consultation'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/digital-assistant/selection-aids"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 backdrop-blur-xl text-white text-sm font-bold shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer text-center"
                >
                  <span>Selection Aids</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related Topics (Bottom Nav) */}
        <section className="grid md:grid-cols-2 gap-4">
          <Link
            href="/news/ergonomics/health-risks"
            className="group rounded-2xl sm:rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] p-6 sm:p-7 hover:ring-[#005596]/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 mb-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                  {isId ? 'Topik Terkait' : 'Related Topic'}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#005596] transition-colors">
                {isId ? 'Risiko Kesehatan & Cedera MSD' : 'Health Risks and MSD Exposure'}
              </h3>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed font-normal">
                {isId
                  ? 'Tinjau risiko kesehatan berfrekuensi tinggi dan area tubuh rentan pada operasi angkat manual.'
                  : 'Review high-impact health risks and exposed body zones in manual handling operations.'}
              </p>
            </div>
            <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#005596]">
              <span>{isId ? 'Buka Topik' : 'Open Topic'}</span>
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          <Link
            href="/news/ergonomics/productivity"
            className="group rounded-2xl sm:rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] p-6 sm:p-7 hover:ring-[#005596]/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 mb-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                  {isId ? 'Topik Terkait' : 'Related Topic'}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#005596] transition-colors">
                {isId ? 'Ergonomi dan Produktivitas Pabrik' : 'Productivity Impact'}
              </h3>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed font-normal">
                {isId
                  ? 'Hubungkan strategi ergonomi dengan peningkatan cycle time dan output terukur di lini manufaktur.'
                  : 'Connect ergonomics strategy with measurable throughput gains and shift consistency.'}
              </p>
            </div>
            <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#005596]">
              <span>{isId ? 'Buka Topik' : 'Open Topic'}</span>
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </section>
      </div>
    </main>
  );
}
