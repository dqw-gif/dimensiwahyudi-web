'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Activity, ArrowLeft, ArrowRight, CheckCircle, TrendingDown } from 'lucide-react';
import ErgonomicsCaseStudies from '../../../../components/news/ErgonomicsCaseStudies';
import { SolidSafetyIcon, SolidWarningIcon } from '../../../../components/icons/ErgonomicsSolidIcons';
import { spacingTokens } from '../../../../constants/spacingTokens';
import { useLanguage } from '../../../../components/LanguageProvider';
import { MobileSnapCarousel } from '../../../../components/ui/MobileSnapCarousel';

const standardsMap = [
  {
    stage: '01',
    label: 'NATIONAL REGULATION',
    labelId: 'REGULASI NASIONAL K3',
    title: 'Permenaker No. 5/2018',
    focus: 'Statutory threshold limits for manual lifting and workplace ergonomic factors in Indonesian industrial operations',
    focusId: 'Batas nilai ambang faktor ergonomi dan angkat beban manual dalam lingkungan kerja industri di Indonesia',
    kpi: 'Legal Compliance',
    kpiId: 'Kepatuhan Regulasi',
    val: 'Mandatory',
    valId: 'Wajib',
    icon: CheckCircle,
    ring: 'border-[#005596] text-[#005596] bg-blue-50',
    bar: 'bg-[#005596]',
    accent: 'from-[#005596] to-[#1d4ed8]',
  },
  {
    stage: '02',
    label: 'INTERNATIONAL STANDARD',
    labelId: 'STANDAR INTERNASIONAL',
    title: 'ISO 11228-1 & ISO 45001',
    focus: 'Manual handling evaluation, repetitive lifting limits, and occupational health management',
    focusId: 'Evaluasi batas angkat manual, frekuensi pemindahan beban berulang, dan sistem manajemen K3',
    kpi: 'Handling Safety',
    kpiId: 'Keselamatan Angkat',
    val: 'Certified',
    valId: 'Tersertifikasi',
    icon: Activity,
    ring: 'border-sky-500 text-sky-700 bg-sky-50',
    bar: 'bg-sky-500',
    accent: 'from-[#005596] to-sky-500',
  },
  {
    stage: '03',
    label: 'HEALTH BOARD CERTIFICATION',
    labelId: 'SERTIFIKASI MEDIS JERMAN',
    title: 'AGR Germany Certification',
    focus: 'Aktion Gesunder Rücken e.V. certified vacuum lifters ensuring verified spinal protection',
    focusId: 'Sertifikasi medis Aktion Gesunder Rücken e.V. pada sistem Vacuum Lifter untuk proteksi tulang belakang operator',
    kpi: 'Spine Protection',
    kpiId: 'Proteksi Tulang Belakang',
    val: 'Approved',
    valId: 'Teruji Medis',
    icon: TrendingDown,
    ring: 'border-[#004276] text-[#004276] bg-blue-50',
    bar: 'bg-[#004276]',
    accent: 'from-[#004276] to-[#005596]',
  },
];

const stopModel = [
  {
    label: 'S - Substitution',
    labelId: 'S - Substitusi (Substitution)',
    desc: 'Remove the hazardous task pattern where possible.',
    descId: 'Eliminasi atau ganti pola kerja angkat manual yang membahayakan tulang belakang operator.',
    imageSrc: '/stop/imgi_121_64f3dd7d4410_Picture_Ergonomie_STOP-Prinzip_Grafik_S-1_2025.webp',
  },
  {
    label: 'T - Technical Controls',
    labelId: 'T - Rekayasa Teknis (Technical)',
    desc: 'Use engineering solutions to reduce physical load at source.',
    descId: 'Pasang alat bantu angkat mekanis (Vacuum Tube Lifter / Manipulator) untuk menahan beban dari sumbernya.',
    imageSrc: '/stop/imgi_125_3847367ebb42_Picture_STOP-Prinzip_Grafik_T-2_2025.webp',
  },
  {
    label: 'O - Organizational Controls',
    labelId: 'O - Pengaturan Kerja (Organizational)',
    desc: 'Adjust shift design, task rotation, and process allocation.',
    descId: 'Atur rotasi shift, tata letak palet, dan pembagian beban kerja antar-stasiun.',
    imageSrc: '/stop/imgi_129_773d3bbdf100_Picture_STOP-Prinzip_Grafik_O-3_2025.webp',
  },
  {
    label: 'P - Personal Controls',
    labelId: 'P - Perlindungan Personel (Personal)',
    desc: 'Training and behavior reinforcement as supporting layer.',
    descId: 'Pelatihan SOP postur kerja aman dan APD sebagai lapisan perlindungan pendukung.',
    imageSrc: '/stop/imgi_133_63d81f090abd_Picture_STOP-Prinzip_Grafik_P-4_2025.webp',
  },
];

const principles = [
  {
    text: 'Prioritize preventive controls before relying on behavioral correction',
    textId: 'Utamakan rekayasa alat bantu teknis sebelum hanya mengandalkan teguran postur operator',
    iconSrc: '/safer handling/Prioritize preventive.webp',
  },
  {
    text: 'Design handling steps to minimize awkward posture and repetitive overload',
    textId: 'Rancang tinggi meja dan jangkauan kerja untuk meminimalkan gerakan membungkuk atau memutar pinggang',
    iconSrc: '/safer handling/Design handling.webp',
  },
  {
    text: 'Use engineered assistance for heavy, repetitive, or precision-critical tasks',
    textId: 'Gunakan sistem Vacuum Lifter atau Manipulator untuk beban berat, siklus tinggi, atau komponen presisi',
    iconSrc: '/safer handling/engineered assistance.webp',
  },
  {
    text: 'Standardize safe handling workflow across shifts and operator groups',
    textId: 'Standarisasi SOP pengangkatan aman secara merata di seluruh shift produksi',
    iconSrc: '/safer handling/Standardize safe.webp',
  },
];

export default function SafetyStandardsClient() {
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
            <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-[#005596]/15 shadow-[0_2px_10px_rgba(0,85,150,0.06)] mb-4">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#005596]">
                {isId ? 'Perspektif Kepatuhan K3' : 'Compliance Perspective'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.05] text-slate-900 mb-5">
              {isId ? 'Keselamatan kerja (K3) dan ' : 'Occupational safety and '}
              <span className="bg-gradient-to-r from-[#005596] to-[#1d4ed8] bg-clip-text text-transparent">
                {isId ? 'standar ergonomi industri' : 'ergonomics standards'}
              </span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 font-normal">
              {isId
                ? 'Standar keselamatan kerja tercapai secara efektif saat pengendalian ergonomi ditanamkan langsung ke dalam peralatan kerja di lini produksi. Regulasi K3 dan sertifikasi medis menjadi acuan teknis untuk melindungi operator sekaligus menjaga kontinuitas operasi.'
                : 'Safety excellence is achieved when ergonomic controls are embedded into the actual workflow. Standards are not checklists alone, they are operational design principles that protect people and performance.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-3.5">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#005596] hover:bg-[#004276] text-white text-sm font-bold rounded-full shadow-[0_4px_16px_rgba(0,85,150,0.25)] hover:shadow-[0_8px_24px_rgba(0,85,150,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                <CheckCircle className="w-4 h-4" />
                <span>{isId ? 'Jadwalkan Audit Kepatuhan Ergonomi' : 'Request Compliance Audit'}</span>
              </Link>
              <Link
                href="/products/schmalz"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/90 hover:bg-white border border-slate-200/90 hover:border-[#005596]/40 shadow-xs hover:shadow-md text-sm font-bold text-slate-700 hover:text-[#005596] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                <span>{isId ? 'Lihat Solusi Alat Angkat' : 'Explore Handling Solutions'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative lg:col-span-7 lg:min-h-[420px] -mb-12 md:-mb-16 lg:mb-0 z-20 flex justify-center lg:block mt-2 md:mt-0">
            <Image
              src="/divadian.webp"
              alt="Occupational safety ergonomics visual"
              width={1280}
              height={1280}
              className="h-auto w-full max-w-[420px] sm:max-w-[560px] md:max-w-[680px] object-contain object-bottom lg:absolute lg:bottom-[-4rem] lg:right-0 lg:z-20 lg:translate-x-3 drop-shadow-xl"
              priority
            />
          </div>
        </motion.section>

        {/* Implementation principles : Glass Card Container */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className={`relative rounded-2xl sm:rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] ${spacingTokens.card.feature} overflow-hidden`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-[#005596] flex items-center justify-center shrink-0">
              <SolidSafetyIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="inline-flex items-center px-3 py-0.5 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-[#005596]/15 shadow-xs mb-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#005596]">
                  {isId ? 'Prinsip Pengendalian' : 'Control Principles'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {isId ? 'Prinsip implementasi untuk pemindahan beban yang aman' : 'Implementation principles for safer handling'}
              </h2>
            </div>
          </div>

          <MobileSnapCarousel
            breakpoint="md"
            desktopGridClassName="grid-cols-2 gap-4"
            cardWidthClass="w-[85vw] max-w-[320px] shrink-0 snap-center"
            swipeLabelId="Geser untuk melihat prinsip keselamatan lainnya"
            swipeLabelEn="Swipe to view more safety principles"
            isId={isId}
          >
            {principles.map((item) => (
              <div
                key={item.text}
                className="group flex flex-col sm:flex-row items-start gap-4 sm:gap-5 rounded-2xl border border-slate-200/90 bg-white/90 backdrop-blur-md p-4 sm:p-5 hover:border-[#005596]/40 hover:shadow-md transition-all duration-300 border-l-4 border-l-[#005596] h-full"
              >
                <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 mx-auto sm:mx-0">
                  <Image src={item.iconSrc} alt={isId ? item.textId : item.text} fill className="object-contain" />
                </div>
                <p className="text-slate-700 leading-relaxed text-[13px] sm:text-[15px] font-medium pt-1">
                  {isId ? item.textId : item.text}
                </p>
              </div>
            ))}
          </MobileSnapCarousel>
        </motion.section>

        {/* Standards and compliance matrix : Glass Card Container */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className={`relative rounded-2xl sm:rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] ${spacingTokens.card.feature} overflow-hidden`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-[#005596] flex items-center justify-center shrink-0">
              <SolidSafetyIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="inline-flex items-center px-3 py-0.5 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-[#005596]/15 shadow-xs mb-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#005596]">
                  {isId ? 'Matriks Regulasi & Sertifikasi' : 'Regulatory Matrix'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {isId ? 'Matriks standar keselamatan dan kepatuhan ergonomi' : 'Standards and compliance matrix'}
              </h2>
            </div>
          </div>

          <MobileSnapCarousel
            breakpoint="lg"
            desktopGridClassName="flex flex-row items-stretch gap-0 mt-6 w-full"
            cardWidthClass="w-[85vw] max-w-[320px] shrink-0 snap-center"
            swipeLabelId="Geser untuk melihat matriks regulasi lainnya"
            swipeLabelEn="Swipe to view more regulatory matrices"
            isId={isId}
          >
            {standardsMap.map((item, index) => (
              <div key={item.title} className="flex lg:flex-1 flex-col lg:flex-row items-stretch h-full">
                <div className="flex-1 group rounded-2xl border border-slate-200/90 bg-white/90 backdrop-blur-md p-6 hover:border-[#005596]/40 hover:shadow-lg transition-all duration-300 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full border-2 text-sm font-mono font-black ${item.ring}`}>
                      {item.stage}
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50/80 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-600">
                      <item.icon className="w-3 h-3" />
                      {isId ? item.labelId : item.label}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-black leading-tight text-slate-900 tracking-tight">{item.title}</h3>
                    <p className="mt-1.5 text-xs text-slate-500 leading-relaxed font-normal">
                      {isId ? item.focusId : item.focus}
                    </p>
                  </div>
                  <div className="mt-auto space-y-1.5 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-mono font-bold text-slate-400">
                        {isId ? item.kpiId : item.kpi}
                      </span>
                      <span className="text-[11px] font-mono font-black text-[#005596]">
                        {isId ? item.valId : item.val}
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                      <div className={`h-full w-full rounded-full ${item.bar}`} />
                    </div>
                  </div>
                </div>

                {index < standardsMap.length - 1 && (
                  <div className="hidden lg:flex w-8 items-center justify-center z-10 -mx-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm text-slate-400">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </MobileSnapCarousel>
          <p className="text-xs text-slate-400 mt-5 font-mono">
            {isId
              ? 'Selaraskan matriks ini dengan dokumen audit SMK3 dan standar EHS internal perusahaan Anda.'
              : 'Align this matrix with your local legal and EHS references before final publication.'}
          </p>
        </motion.section>

        {/* Risk control hierarchy vs Documentation : 2 Glass Cards */}
        <section className="grid lg:grid-cols-2 gap-6 lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl sm:rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 border border-blue-200 text-[#005596] shadow-xs">
                <SolidSafetyIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">
                {isId ? 'Hierarki pengendalian risiko di lapangan' : 'Risk control hierarchy in practice'}
              </h3>
              <p className="text-slate-600 leading-relaxed text-base font-normal">
                {isId
                  ? 'Program ergonomi yang paling efektif memprioritaskan rekayasa teknis langsung pada proses kerja. Pendekatan ini mengurangi ketergantungan pada kedisiplinan postur individu sekaligus memberikan hasil keselamatan yang konsisten.'
                  : 'The strongest ergonomic programs prioritize technical mitigation at the process level. This helps reduce dependency on individual behavior while improving repeatable safety outcomes.'}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full bg-blue-50/80 px-3 py-1 text-xs font-mono font-bold text-[#005596] border border-blue-200">
                {isId ? '↑ Hasil Keselamatan Kerja' : '↑ Safety Outcome'}
              </span>
              <span className="inline-flex items-center rounded-full bg-slate-100/80 px-3 py-1 text-xs font-mono font-bold text-slate-600 border border-slate-200">
                {isId ? '↓ Ketergantungan Faktor Manusia' : '↓ Behavioral Dependency'}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl sm:rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-rose-500/12 shadow-[0_16px_40px_-10px_rgba(225,29,72,0.06),inset_0_1px_0_0_rgba(255,255,255,0.95)] p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 shadow-xs">
                <SolidWarningIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">
                {isId ? 'Dokumentasi audit dan evaluasi berkala' : 'Documentation and continuous review'}
              </h3>
              <p className="text-slate-600 leading-relaxed text-base font-normal">
                {isId
                  ? 'Gunakan catatan insiden klinik, laporan near-miss, dan masukan operator di stasiun kerja sebagai dasar evaluasi peningkatan ergonomi secara berkala.'
                  : 'Use incident data, near-miss patterns, and workstation feedback as input for periodic ergonomics and handling process improvements.'}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full bg-rose-50/80 px-3 py-1 text-xs font-mono font-bold text-rose-700 border border-rose-200">
                {isId ? '↓ Potensi Near-Miss' : '↓ Near-miss Patterns'}
              </span>
              <span className="inline-flex items-center rounded-full bg-emerald-50/80 px-3 py-1 text-xs font-mono font-bold text-emerald-700 border border-emerald-200">
                {isId ? '↑ Umpan Balik Stasiun Kerja' : '↑ Process Feedback'}
              </span>
            </div>
          </motion.div>
        </section>

        {/* STOP principle : Glass Card Container */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className={`relative rounded-2xl sm:rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] ${spacingTokens.card.feature} overflow-hidden`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-[#005596] flex items-center justify-center shrink-0">
              <SolidWarningIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="inline-flex items-center px-3 py-0.5 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-[#005596]/15 shadow-xs mb-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#005596]">
                  {isId ? 'Kerangka K3' : 'Framework'}
                </span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {isId ? 'Prinsip STOP dalam operasi material handling' : 'STOP principle in handling operations'}
              </h2>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stopModel.map((item) => (
              <div
                key={item.label}
                className="group flex flex-col rounded-2xl border border-slate-200/90 bg-white/90 backdrop-blur-md hover:border-[#005596]/40 hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="relative w-full aspect-[4/3] bg-slate-50/80 border-b border-slate-100 p-4">
                  <Image
                    src={item.imageSrc}
                    alt={isId ? item.labelId : item.label}
                    fill
                    className="object-contain p-4 mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-black text-slate-900 mb-2 tracking-tight group-hover:text-[#005596] transition-colors">
                      {isId ? item.labelId : item.label}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                      {isId ? item.descId : item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Case Studies */}
        <ErgonomicsCaseStudies topic="safety" />

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
                <SolidSafetyIcon className="w-3.5 h-3.5" />
                <span>{isId ? 'Rekomendasi Langkah Berikutnya' : 'Recommended Next Step'}</span>
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 tracking-tight leading-tight">
                {isId ? 'Petakan titik angkat kritis K3 bersama tim engineering kami' : 'Map your safety-critical handling points with our team'}
              </h2>
              <p className="text-blue-100/90 leading-relaxed mb-8 max-w-2xl font-normal text-sm sm:text-base">
                {isId
                  ? 'Kami siap membantu tim HSE dan engineering Anda mengidentifikasi stasiun kerja mana yang paling membutuhkan alat bantu angkat untuk memenuhi standar keselamatan dan efisiensi.'
                  : 'We can help your team identify where assisted handling delivers the highest measurable benefit for both safety performance and operational reliability.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3.5">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-blue-50 text-[#005596] text-sm font-bold rounded-full shadow-[0_10px_28px_-6px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer text-center"
                >
                  <span>{isId ? 'Minta Survei Keselamatan Angkat' : 'Request Safety-Focused Assessment'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/products/schmalz"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 backdrop-blur-xl text-white text-sm font-bold shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer text-center"
                >
                  <span>{isId ? 'Lihat Solusi Alat Angkat' : 'Explore Handling Solutions'}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Next / Related Topics : 2 Glass Cards */}
        <section className="grid md:grid-cols-2 gap-4">
          <Link
            href="/news/ergonomics/productivity"
            className="group rounded-2xl sm:rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-sm hover:shadow-xl hover:border-[#005596]/40 p-6 sm:p-7 transition-all duration-300"
          >
            <span className="inline-block text-[11px] font-mono font-bold uppercase tracking-widest text-[#005596] mb-2">
              {isId ? 'Topik Terkait' : 'Related Topic'}
            </span>
            <h3 className="text-xl font-black text-slate-900 group-hover:text-[#005596] transition-colors tracking-tight">
              {isId ? 'Ergonomi dan Produktivitas Pabrik' : 'Ergonomics and productivity'}
            </h3>
            <p className="text-slate-600 mt-2 text-sm leading-relaxed font-normal">
              {isId
                ? 'Hubungkan inisiatif keselamatan K3 dengan peningkatan throughput dan kualitas produk.'
                : 'Connect safety initiatives with throughput and quality performance.'}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 font-bold text-xs font-mono text-[#005596] group-hover:translate-x-1 transition-transform">
              {isId ? 'Buka topik' : 'Open topic'} <ArrowRight size={13} />
            </span>
          </Link>

          <Link
            href="/news/ergonomics/glossary"
            className="group rounded-2xl sm:rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-sm hover:shadow-xl hover:border-[#005596]/40 p-6 sm:p-7 transition-all duration-300"
          >
            <span className="inline-block text-[11px] font-mono font-bold uppercase tracking-widest text-[#005596] mb-2">
              {isId ? 'Topik Selanjutnya' : 'Next Topic'}
            </span>
            <h3 className="text-xl font-black text-slate-900 group-hover:text-[#005596] transition-colors tracking-tight">
              {isId ? 'Glosarium Ergonomi Industri' : 'Ergonomics glossary'}
            </h3>
            <p className="text-slate-600 mt-2 text-sm leading-relaxed font-normal">
              {isId
                ? 'Referensi istilah teknis cepat untuk menyamakan persepsi lintas divisi engineering, HSE, dan procurement.'
                : 'Quick-reference terms for cross-functional team alignment.'}
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
