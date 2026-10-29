'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SolidGlossaryIcon } from '../../../../components/icons/ErgonomicsSolidIcons';
import { spacingTokens } from '../../../../constants/spacingTokens';
import { useLanguage } from '../../../../components/LanguageProvider';

const roleUsage = [
  {
    role: 'Engineering Team',
    roleId: 'Tim Engineering',
    use: 'Align technical discussion on load profile, workstation design, and control options.',
    useId: 'Menyamakan acuan teknis terkait karakteristik payload, tata letak stasiun kerja, dan pilihan alat bantu angkat.',
  },
  {
    role: 'Procurement Team',
    roleId: 'Tim Procurement',
    use: 'Evaluate requirement scope and compare ergonomic solution proposals consistently.',
    useId: 'Mengevaluasi ruang lingkup spesifikasi teknis dan membandingkan proposal investasi alat secara objektif.',
  },
  {
    role: 'Plant and HSE Team',
    roleId: 'Tim Plant & HSE (K3)',
    use: 'Standardize language for risk review, training, and implementation decisions.',
    useId: 'Menstandarkan istilah pada saat audit risiko K3, pelatihan operator, dan pengambilan keputusan di pabrik.',
  },
];

const terms = [
  {
    term: 'Ergonomics',
    termId: 'Ergonomi Industri (Industrial Ergonomics)',
    def: 'The discipline of adapting work, tools, and environment to human capability to improve safety, comfort, and performance.',
    defId: 'Disiplin rekayasa yang menyesuaikan stasiun kerja, alat bantu angkat, dan alur proses dengan batas kemampuan fisik manusia guna meningkatkan keselamatan dan throughput.',
  },
  {
    term: 'Musculoskeletal Disorders (MSDs)',
    termId: 'Musculoskeletal Disorders (MSDs)',
    def: 'Injuries or disorders affecting muscles, joints, tendons, and related structures, often linked to repetitive strain and awkward posture.',
    defId: 'Cedera atau gangguan pada otot, sendi, ligamen, dan tulang belakang yang dipicu oleh pengangkatan beban berulang serta postur kerja yang membungkuk atau memutar.',
  },
  {
    term: 'Manual Handling',
    termId: 'Manual Handling',
    def: 'Lifting, carrying, pushing, pulling, or moving loads by human effort, with varying physical risk depending on weight and frequency.',
    defId: 'Aktivitas mengangkat, menahan, mendorong, menarik, atau memindahkan beban menggunakan tenaga otot manusia, dengan tingkat risiko yang bergantung pada berat payload dan frekuensi siklus.',
  },
  {
    term: 'Repetitive Strain',
    termId: 'Repetitive Strain (Beban Berulang)',
    def: 'Cumulative physical stress from repeating similar motions over time, potentially reducing comfort and control quality.',
    defId: 'Ketegangan fisik kumulatif akibat mengulang gerakan angkat-pindah yang sama ribuan kali per shift, yang menurunkan presisi dan memicu cedera otot.',
  },
  {
    term: 'Awkward Posture',
    termId: 'Awkward Posture (Postur Janggal)',
    def: 'Body positioning that places joints outside neutral alignment, increasing fatigue and risk of long-term strain.',
    defId: 'Posisi tubuh yang menempatkan tulang belakang atau sendi di luar posisi netral (seperti membungkuk ke palet bawah atau menjangkau di atas bahu), yang mempercepat kelelahan.',
  },
  {
    term: 'Engineering Control',
    termId: 'Engineering Control (Pengendalian Teknis)',
    def: 'A technical intervention that reduces hazard exposure at the source, such as lifting assistance and ergonomic handling systems.',
    defId: 'Intervensi teknis yang menghilangkan beban bahaya langsung dari sumbernya, seperti penggunaan Vacuum Tube Lifter, VacuMaster, atau Binar Quick-Lift.',
  },
  {
    term: 'Cycle Time',
    termId: 'Cycle Time',
    def: 'The total time required to complete one operational handling cycle in a process.',
    defId: 'Total waktu (detik) yang dibutuhkan untuk menyelesaikan satu siklus penuh pengambilan, pemindahan, dan pelepasan workpiece.',
  },
  {
    term: 'ROI (Return on Investment)',
    termId: 'ROI (Return on Investment)',
    def: 'A financial metric used to evaluate whether gains from ergonomic investment justify the implementation cost.',
    defId: 'Metrik finansial untuk menghitung periode balik modal investasi alat berdasarkan penghematan tenaga kerja, percepatan cycle time, dan pencegahan biaya medis.',
  },
  {
    term: 'Workstation Design',
    termId: 'Workstation Design (Desain Stasiun Kerja)',
    def: 'Layout and equipment configuration designed to support safe posture, efficient motion, and consistent output quality.',
    defId: 'Tata letak area kerja, jangkauan Jib Crane, dan penempatan konveyor/palet yang dirancang untuk mendukung postur kerja tegak dan gerakan yang efisien.',
  },
  {
    term: 'Fatigue Management',
    termId: 'Fatigue Management (Manajemen Kelelahan)',
    def: 'Operational strategies to reduce physical and mental exhaustion that can affect safety and productivity.',
    defId: 'Strategi operasional dan mekanis untuk menekan kelelahan fisik operator agar kecepatan produksi di akhir shift tetap sama stabilnya dengan awal shift.',
  },
];

export default function GlossaryClient() {
  const { lang } = useLanguage();
  const isId = lang === 'id';

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <div className={`${spacingTokens.page.shell} ${spacingTokens.page.containerNarrow} ${spacingTokens.page.stack}`}>
        <nav>
          <Link href="/news/ergonomics" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">
            <ArrowLeft size={16} /> {isId ? 'Kembali ke Pusat Ergonomi' : 'Back to Ergonomics Hub'}
          </Link>
        </nav>

        <section className={`bg-white border border-slate-200 rounded-3xl ${spacingTokens.card.feature} shadow-sm`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-200 text-violet-600 flex items-center justify-center">
              <SolidGlossaryIcon className="w-4.5 h-4.5" />
            </div>
            <p className="text-xs font-bold text-violet-600 uppercase tracking-[0.2em]">
              {isId ? 'HALAMAN REFERENSI' : 'Reference Page'}
            </p>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-5">
            {isId ? 'Glosarium Ergonomi Industri' : 'Industrial ergonomics glossary'}
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed max-w-3xl">
            {isId
              ? 'Referensi praktis untuk menyamakan pemahaman teknis antara tim engineering, procurement, HSE (K3), dan operasional pabrik saat merencanakan sistem material handling.'
              : 'A practical reference to align understanding across engineering, procurement, HSE, and operations teams. Use this page as a shared baseline for ergonomics planning discussions.'}
          </p>
        </section>

        <section className="grid gap-4">
          {terms.map((item) => (
            <article key={item.term} className="bg-white border border-slate-200 rounded-2xl p-6">
              <h2 className="text-xl font-black text-slate-900 mb-2">
                {isId ? item.termId : item.term}
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {isId ? item.defId : item.def}
              </p>
            </article>
          ))}
        </section>

        <section className={`bg-white border border-slate-200 rounded-3xl ${spacingTokens.card.feature} shadow-sm`}>
          <p className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-2">
            {isId ? 'CARA MENGGUNAKAN GLOSARIUM INI' : 'How To Use This Glossary'}
          </p>
          <h2 className="text-2xl font-black text-slate-900 mb-6">
            {isId ? 'Gunakan terminologi yang seragam lintas divisi' : 'Apply a shared vocabulary across teams'}
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {roleUsage.map((item) => (
              <article key={item.role} className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <h3 className="font-black text-slate-900 mb-2">
                  {isId ? item.roleId : item.role}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {isId ? item.useId : item.use}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className={`bg-slate-900 text-white rounded-3xl ${spacingTokens.card.feature} border border-slate-800`}>
          <h2 className="text-3xl font-black mb-4">
            {isId ? 'Butuh panduan teknis untuk aplikasi spesifik di pabrik Anda?' : 'Need guidance for your specific application?'}
          </h2>
          <p className="text-slate-300 leading-relaxed mb-7 max-w-3xl">
            {isId
              ? 'Tim Application Engineer kami siap menerjemahkan prinsip ergonomi menjadi rekomendasi sistem Vacuum Lifter atau Manipulator yang terukur untuk lini Anda.'
              : 'Our team can translate ergonomics principles into practical handling recommendations for your process.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-colors text-center">
              {isId ? 'Minta Konsultasi Engineering' : 'Request Consultation'}
            </Link>
            <Link href="/digital-assistant/selection-aids" className="px-6 py-3 bg-white/10 border border-white/20 hover:bg-white/20 rounded-xl font-bold transition-colors text-center">
              {isId ? 'Buka Selection Aids' : 'Open Selection Aids'}
            </Link>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-4">
          <Link href="/news/ergonomics/health-risks" className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-300 transition-colors">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">
              {isId ? 'Topik Terkait' : 'Related Topic'}
            </p>
            <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
              {isId ? 'Risiko Kesehatan & Cedera MSD' : 'Health risks and diseases'}
            </h3>
            <p className="text-slate-600 mt-2">
              {isId ? 'Tinjau risiko kesehatan berfrekuensi tinggi pada operasi angkat manual.' : 'Review high-impact health risks in manual handling operations.'}
            </p>
            <span className="mt-4 inline-flex items-center gap-2 font-bold text-blue-600">
              {isId ? 'Buka topik' : 'Open topic'} <ArrowRight size={14} />
            </span>
          </Link>
          <Link href="/news/ergonomics/productivity" className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-300 transition-colors">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">
              {isId ? 'Topik Terkait' : 'Related Topic'}
            </p>
            <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
              {isId ? 'Ergonomi dan Produktivitas Pabrik' : 'Ergonomics and productivity'}
            </h3>
            <p className="text-slate-600 mt-2">
              {isId ? 'Hubungkan strategi ergonomi dengan peningkatan cycle time dan output yang terukur.' : 'Connect ergonomics strategy with measurable business outcomes.'}
            </p>
            <span className="mt-4 inline-flex items-center gap-2 font-bold text-blue-600">
              {isId ? 'Buka topik' : 'Open topic'} <ArrowRight size={14} />
            </span>
          </Link>
        </section>
      </div>
    </main>
  );
}
