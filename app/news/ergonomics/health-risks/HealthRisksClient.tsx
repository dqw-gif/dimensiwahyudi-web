'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Activity, AlertTriangle, ArrowLeft, ArrowRight, TrendingDown } from 'lucide-react';
import ErgonomicsCaseStudies from '../../../../components/news/ErgonomicsCaseStudies';
import { SolidHealthIcon, SolidSafetyIcon, SolidWarningIcon } from '../../../../components/icons/ErgonomicsSolidIcons';
import { spacingTokens } from '../../../../constants/spacingTokens';
import { useLanguage } from '../../../../components/LanguageProvider';

const healthStats = [
  {
    stage: '01',
    label: 'Risk Task',
    labelId: 'Aktivitas Berisiko',
    value: 'High-Risk Zone',
    valueId: 'Zona Risiko Tinggi',
    note: 'Repetitive lifting with awkward posture should be prioritized in the first intervention wave.',
    noteId: 'Pengangkatan berulang dengan postur membungkuk wajib diprioritaskan pada tahap intervensi pertama.',
    metricValue: 'P1',
    icon: AlertTriangle,
    accent: 'from-[#005596] to-[#1d4ed8]',
  },
  {
    stage: '02',
    label: 'Early Symptoms',
    labelId: 'Gejala Awal',
    value: '2-12 Weeks',
    valueId: '2-12 Minggu',
    note: 'Minor discomfort can escalate into recurring strain when task design remains unchanged.',
    noteId: 'Keluhan pegal ringan dapat berkembang menjadi cedera saraf dan otot berulang jika metode kerja tidak diubah.',
    metricValue: '2-12 wks',
    icon: Activity,
    accent: 'from-[#005596] to-sky-500',
  },
  {
    stage: '03',
    label: 'Business Loss',
    labelId: 'Kerugian Operasional',
    value: 'Output Drain',
    valueId: 'Penurunan Output',
    note: 'Health strain surfaces first as output variability, quality drift, and rising attendance pressure.',
    noteId: 'Kelelahan fisik terlihat dari melambatnya cycle time, penurunan ketelitian, dan meningkatnya izin sakit.',
    metricValue: 'Critical',
    icon: TrendingDown,
    accent: 'from-[#004276] to-[#005596]',
  },
];

const bodyExposure = [
  {
    area: 'Lower back',
    areaId: 'Punggung Bawah (Lumbar)',
    note: 'Frequent strain during lifting from floor level and trunk rotation.',
    noteId: 'Rentan cedera kompresi saat mengangkat beban dari level lantai sambil memutar pinggang.',
    imageAlt: 'Ergonomic illustration for lower back risk',
    imageSrc: '/body%20zones/Lower%20back.webp',
    accent: 'from-[#005596] to-[#1d4ed8]',
    badge: 'Highest Frequency',
    badgeId: 'Frekuensi Tertinggi',
  },
  {
    area: 'Shoulders and upper arms',
    areaId: 'Bahu & Lengan Atas',
    note: 'Overload appears during overhead reach and repetitive object transfer.',
    noteId: 'Beban berlebih muncul saat menjangkau posisi di atas bahu dan memindahkan workpiece berulang kali.',
    imageAlt: 'Ergonomic illustration for shoulder and upper arm risk',
    imageSrc: '/body%20zones/Shoulder%20and%20upper%20arms.webp',
    accent: 'from-[#005596] to-sky-500',
    badge: 'Overhead Load',
    badgeId: 'Beban Jangkauan Atas',
  },
  {
    area: 'Elbow',
    areaId: 'Sendi Siku',
    note: 'Repetitive extension and load transfer can trigger tendon stress around the elbow.',
    noteId: 'Ekstensi tangan berulang saat menahan beban memicu ketegangan tendon di sekitar siku.',
    imageAlt: 'Ergonomic illustration for elbow risk',
    imageSrc: '/body%20zones/Elbow.webp',
    accent: 'from-sky-600 to-[#005596]',
    badge: 'Precision Stress',
    badgeId: 'Tegangan Tendon',
  },
  {
    area: 'Neck and upper back',
    areaId: 'Leher & Punggung Atas',
    note: 'Static posture and frequent forward head position increase fatigue.',
    noteId: 'Postur statis dan posisi kepala menunduk terus-menerus mempercepat kelelahan otot leher.',
    imageAlt: 'Ergonomic illustration for neck and upper back risk',
    imageSrc: '/body%20zones/Neck%20and%20upper%20back.webp',
    accent: 'from-blue-600 to-[#005596]',
    badge: 'Posture Drift',
    badgeId: 'Beban Postur Statis',
  },
  {
    area: 'Hip',
    areaId: 'Panggul',
    note: 'Uneven load transfer and frequent bending can increase hip joint pressure.',
    noteId: 'Tumpuan beban yang tidak seimbang dan gerakan membungkuk berulang meningkatkan tekanan sendi panggul.',
    imageAlt: 'Ergonomic illustration for hip risk',
    imageSrc: '/body%20zones/hip.webp',
    accent: 'from-[#005596] to-sky-400',
    badge: 'Joint Pressure',
    badgeId: 'Tekanan Sendi',
  },
  {
    area: 'Knee',
    areaId: 'Lutut',
    note: 'Repeated squatting and lifting from low height can reduce knee comfort over shifts.',
    noteId: 'Gerakan jongkok-berdiri berulang saat mengambil barang dari palet bawah membebani sendi lutut.',
    imageAlt: 'Ergonomic illustration for knee risk',
    imageSrc: '/body%20zones/knee.webp',
    accent: 'from-[#004276] to-sky-500',
    badge: 'Lower Joint Load',
    badgeId: 'Tumpuan Kaki',
  },
];

const bodyExposureByNoteLength = [...bodyExposure].sort((a, b) => b.note.length - a.note.length);

const riskItems = [
  {
    title: 'Lower back strain and recurring pain',
    titleId: 'Cedera punggung bawah dan nyeri kambuhan',
    desc: 'Often triggered by repetitive lifting and trunk rotation without load-assist support.',
    descId: 'Sering dipicu oleh pengangkatan manual berulang dan gerakan memutar pinggang tanpa alat bantu angkat.',
    imageSrc: '/factory%20floors/imgi_61_64156f66f294_Icon_Ergonomie_R%C3%BCckenschmerzen_2025.webp',
    imageAlt: 'Factory-floor icon representing lower back ergonomic strain',
  },
  {
    title: 'Joint overload during awkward positioning',
    titleId: 'Beban berlebih pada sendi saat posisi janggal',
    desc: 'Shoulder and elbow load spikes during off-axis object handling and poor reach angles.',
    descId: 'Lonjakan beban pada bahu dan siku saat menangani workpiece di luar jangkauan ideal operator.',
    imageSrc: '/factory%20floors/imgi_62_e9d1b153173a_Icon_Ergonomie_Gelenkbeschwerden_2025.webp',
    imageAlt: 'Factory-floor icon representing ergonomic joint overload',
  },
  {
    title: 'Physical exhaustion across long shifts',
    titleId: 'Kelelahan fisik kumulatif sepanjang shift',
    desc: 'Continuous force application accumulates fatigue and reduces handling precision over time.',
    descId: 'Pengerahan tenaga otot terus-menerus menumpuk kelelahan dan menurunkan akurasi kerja di akhir shift.',
    imageSrc: '/factory%20floors/imgi_63_3d61795879c8_Icon_Ergonomie_Ersch%C3%B6pfung_2025.webp',
    imageAlt: 'Factory-floor icon representing ergonomic exhaustion risk',
  },
  {
    title: 'Cognitive load and mental pressure',
    titleId: 'Penurunan fokus dan konsentrasi operator',
    desc: 'Sustained physical discomfort can degrade focus, consistency, and decision quality.',
    descId: 'Rasa nyeri fisik yang berkepanjangan menurunkan kewaspadaan, konsistensi, dan keselamatan kerja.',
    imageSrc: '/factory%20floors/imgi_64_d5dd52b41cf5_Icon_Ergonomie_psychische%20Belastungen_2025.webp',
    imageAlt: 'Factory-floor icon representing ergonomic mental load risk',
  },
];

export default function HealthRisksClient() {
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
            <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-rose-500/15 shadow-[0_2px_10px_rgba(225,29,72,0.06)] mb-4">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-600">
                {isId ? 'Perspektif Kesehatan Kerja' : 'Health Perspective'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.05] text-slate-900 mb-5">
              {isId ? 'Risiko kesehatan dan cedera MSD pada ' : 'Health risks and diseases in '}
              <span className="bg-gradient-to-r from-[#005596] to-[#1d4ed8] bg-clip-text text-transparent">
                {isId ? 'operasi angkat manual' : 'manual handling operations'}
              </span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 font-normal">
              {isId
                ? 'Aktivitas mengangkat, menahan, dan memindahkan beban secara berulang setiap hari menciptakan beban fisik kumulatif. Tanpa bantuan sistem angkat ergonomis, keluhan nyeri ringan sering berkembang menjadi gangguan muskuloskeletal (MSD) kronis yang mengganggu kesehatan operator dan kelancaran produksi.'
                : 'Daily lifting, carrying, and repetitive handling can create a cumulative physical burden. Without ergonomic support, minor discomfort often develops into persistent musculoskeletal problems that affect people, attendance, and production continuity.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-3.5">
              <Link
                href="/digital-assistant/roi-calculator"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#005596] hover:bg-[#004276] text-white text-sm font-bold rounded-full shadow-[0_4px_16px_rgba(0,85,150,0.25)] hover:shadow-[0_8px_24px_rgba(0,85,150,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                <Activity className="w-4 h-4" />
                <span>{isId ? 'Evaluasi Risiko Angkat' : 'Get Risk Assessment'}</span>
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
              src="/top.webp"
              alt="Factory floor health-risk visual"
              width={1600}
              height={900}
              className="h-auto w-full max-w-[420px] sm:max-w-[560px] md:max-w-[680px] object-contain object-center lg:absolute lg:bottom-[-4rem] lg:right-0 lg:z-20 lg:translate-x-3 drop-shadow-xl"
              priority
            />
          </div>
        </motion.section>

        {/* Common risk patterns : Glass Card Container */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className={`relative rounded-2xl sm:rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] ${spacingTokens.card.feature} overflow-hidden`}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shrink-0">
              <SolidWarningIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="inline-flex items-center px-3 py-0.5 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-rose-500/15 shadow-xs mb-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-rose-600">
                  {isId ? 'Pemetaan Risiko' : 'Risk Assessment'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {isId ? 'Pola risiko fisik yang umum di lantai produksi' : 'Common risk patterns on factory floors'}
              </h2>
            </div>
          </div>

          <div className="grid gap-3.5 md:grid-cols-2">
            {riskItems.map((item) => (
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

        {/* Health impact infographic snapshot : Glass Card Container */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className={`relative rounded-2xl sm:rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] ${spacingTokens.card.feature} overflow-hidden`}
        >
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-[#005596] flex items-center justify-center shrink-0">
              <SolidHealthIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="inline-flex items-center px-3 py-0.5 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-[#005596]/15 shadow-xs mb-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#005596]">
                  {isId ? 'Alur Dampak Kesehatan' : 'Impact Storyline'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {isId ? 'Ringkasan eskalasi risiko kesehatan operator' : 'Health impact infographic snapshot'}
              </h2>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch gap-0">
            {healthStats.map((item, index) => {
              const riskPct = index === 0 ? 85 : index === 1 ? 55 : 90;
              const riskColor = index === 0 ? 'text-rose-600' : index === 1 ? 'text-amber-500' : 'text-red-600';
              const riskBarColor = index === 0 ? 'bg-rose-500' : index === 1 ? 'bg-amber-400' : 'bg-red-500';
              const stageRingColor = index === 0 ? 'border-[#005596] text-[#005596] bg-blue-50' : index === 1 ? 'border-sky-500 text-sky-700 bg-sky-50' : 'border-[#004276] text-[#004276] bg-blue-50';

              return (
                <div key={item.label} className="flex lg:flex-1 flex-col lg:flex-row items-stretch">
                  <div className="flex-1 group rounded-2xl border border-slate-200/90 bg-white/90 backdrop-blur-md p-6 hover:border-[#005596]/40 hover:shadow-lg transition-all duration-300 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full border-2 text-sm font-mono font-black ${stageRingColor}`}>
                        {item.stage}
                      </div>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50/80 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-600">
                        <item.icon className="w-3 h-3" />
                        {isId ? item.labelId : item.label}
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
                          {isId ? 'Tingkat Risiko' : 'Risk Level'}
                        </span>
                        <span className={`text-[11px] font-mono font-black ${riskColor}`}>{riskPct}%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                        <div className={`h-full rounded-full ${riskBarColor} transition-all duration-500`} style={{ width: `${riskPct}%` }} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-400">KPI</span>
                        <span className="text-[10px] font-mono font-bold text-[#005596]">{item.metricValue}</span>
                      </div>
                    </div>

                    <div className={`h-1 rounded-full bg-gradient-to-r ${item.accent}`} />
                  </div>

                  {index < healthStats.length - 1 && (
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

          {/* Bottom summary stats */}
          <div className="mt-6 grid grid-cols-3 divide-x divide-slate-200/80 rounded-2xl border border-slate-200/80 bg-slate-50/80 backdrop-blur-md overflow-hidden">
            {[
              { label: isId ? 'Titik Tubuh Berisiko' : 'Body Zones At Risk', value: '6', unit: isId ? 'zona' : 'zones' },
              { label: isId ? 'Munculnya Gejala Awal' : 'Avg. Symptom Onset', value: '2-12', unit: isId ? 'minggu' : 'weeks' },
              { label: isId ? 'Dampak ke Throughput' : 'Throughput Impact', value: isId ? 'Tinggi' : 'High', unit: isId ? 'prioritas' : 'priority' },
            ].map((stat) => (
              <div key={stat.label} className="px-4 py-3.5 text-center">
                <p className="text-xl sm:text-2xl font-black text-slate-900 leading-none tracking-tight">{stat.value}</p>
                <p className="text-[9px] font-mono uppercase tracking-[0.18em] font-bold text-[#005596] mt-1">{stat.unit}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          <p className="mt-3 text-[11px] font-mono text-slate-400 leading-relaxed">
            {isId
              ? 'Sesuaikan indikator risiko di atas dengan catatan klinik/EHS dan data absensi internal pabrik Anda.'
              : 'Replace risk levels with your internal EHS and attendance data.'}
          </p>
        </motion.section>

        {/* Risk Heatmap (Body Zones) : Glass Card Container */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className={`relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] ${spacingTokens.card.feature}`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-[#005596] flex items-center justify-center shrink-0">
              <SolidSafetyIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="inline-flex items-center px-3 py-0.5 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-[#005596]/15 shadow-xs mb-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#005596]">
                  {isId ? 'Peta Paparan Tubuh' : 'Risk Heatmap'}
                </span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {isId ? 'Bagian tubuh paling rentan cedera saat angkat berulang' : 'Most exposed body zones in repetitive handling'}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-fr">
            {bodyExposureByNoteLength.map((item, index) => {
              const cardPlacement =
                index === 0
                  ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2'
                  : index === 1
                    ? 'lg:col-start-3 lg:row-start-1'
                    : index === 2
                      ? 'lg:col-start-3 lg:row-start-2'
                      : index === 3
                        ? 'lg:col-start-1 lg:row-start-3'
                        : index === 4
                          ? 'lg:col-start-2 lg:row-start-3'
                          : 'lg:col-start-3 lg:row-start-3';

              const isHero = index === 0;

              return (
                <article
                  key={item.area}
                  className={`group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${cardPlacement}`}
                >
                  <div className="absolute inset-x-0 top-0 h-1.5 z-20">
                    <div className={`h-full w-full bg-gradient-to-r ${item.accent}`} />
                  </div>
                  <div className="relative aspect-square bg-slate-100">
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/35 to-slate-900/10" />

                    <p className="absolute left-3 top-3.5 rounded-full border border-white/25 bg-slate-900/70 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-white shadow-xs">
                      {isId ? 'Zona Paparan' : 'Exposure Zone'}
                    </p>
                    <p className={`absolute right-3 top-3.5 rounded-full px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-white shadow-xs bg-gradient-to-r ${item.accent}`}>
                      {isId ? item.badgeId : item.badge}
                    </p>

                    <div className={`absolute inset-x-3 bottom-3 rounded-2xl border border-white/20 bg-white/15 backdrop-blur-md ${isHero ? 'p-4 sm:p-5' : 'p-3'} shadow-lg`}>
                      <h3 className={`${isHero ? 'text-xl sm:text-2xl' : 'text-base'} font-black tracking-tight text-white`}>
                        {isId ? item.areaId : item.area}
                      </h3>
                      <p className={`${isHero ? 'mt-2 text-sm sm:text-base group-hover:max-h-40' : 'mt-2 text-xs sm:text-sm group-hover:max-h-24'} max-h-0 overflow-hidden leading-relaxed text-slate-100/95 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 font-normal`}>
                        {isId ? item.noteId : item.note}
                      </p>
                      <div className="mt-3 h-1.5 w-20 overflow-hidden rounded-full bg-white/30">
                        <div className={`h-full w-full rounded-full bg-gradient-to-r ${item.accent}`} />
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-6 bg-slate-50/80 border border-slate-200/80 rounded-2xl p-4">
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              <strong className="text-slate-900 font-bold">{isId ? 'Aturan praktis di lapangan:' : 'Practical rule:'}</strong>{' '}
              {isId
                ? 'jika beberapa operator mengeluhkan nyeri pada bagian tubuh yang sama secara berulang, perlakukan hal tersebut sebagai sinyal desain stasiun kerja yang perlu dikoreksi secara teknis.'
                : 'if operators report discomfort in the same body region repeatedly, treat it as a process design signal, not an individual tolerance issue.'}
            </p>
          </div>
        </motion.section>

        {/* Operational consequence vs What ergonomics changes : 2 Glass Cards */}
        <section className="grid lg:grid-cols-2 gap-6 lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl sm:rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-rose-500/12 shadow-[0_16px_40px_-10px_rgba(225,29,72,0.06),inset_0_1px_0_0_rgba(255,255,255,0.95)] p-8 flex flex-col justify-between"
          >
            <div>
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 border border-rose-200/80 text-rose-600 shadow-xs">
                <SolidWarningIcon className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-4">
                {isId ? 'Konsekuensi operasional di lini pabrik' : 'Operational consequence'}
              </h3>
              <p className="text-slate-600 leading-relaxed text-base font-normal">
                {isId
                  ? 'Kelelahan fisik tidak berhenti pada keluhan individu. Hal ini langsung menurunkan kecepatan angkat, akurasi penempatan barang, dan stabilitas kehadiran operator. Dalam jangka panjang, pabrik menanggung biaya tersembunyi akibat defect dan jam kerja yang hilang.'
                  : 'Physical fatigue does not stay at the individual level. It influences handling speed, consistency, error rates, and workforce stability. Over time, this creates hidden costs through quality disruption and lost productive hours.'}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full bg-rose-50/80 px-3 py-1 text-xs font-mono font-bold text-rose-700 border border-rose-200">
                {isId ? '↑ Tingkat Reject/Error' : '↑ Error Rate'}
              </span>
              <span className="inline-flex items-center rounded-full bg-slate-100/80 px-3 py-1 text-xs font-mono font-bold text-slate-600 border border-slate-200">
                {isId ? '↓ Kecepatan Cycle Time' : '↓ Speed Output'}
              </span>
              <span className="inline-flex items-center rounded-full bg-rose-50/80 px-3 py-1 text-xs font-mono font-bold text-rose-700 border border-rose-200">
                {isId ? '↑ Absensi Operator' : '↑ Absent Rate'}
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
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 border border-blue-200/80 text-[#005596] shadow-xs">
                <SolidHealthIcon className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-4">
                {isId ? 'Perubahan nyata dengan sistem ergonomis' : 'What ergonomics changes'}
              </h3>
              <p className="text-slate-600 leading-relaxed text-base font-normal">
                {isId
                  ? 'Alat bantu angkat terukur seperti Vacuum Tube Lifter dan Binar Quick-Lift mengalihkan beban berat dari tulang belakang operator ke struktur mekanis. Beban otot turun drastis, postur kerja tetap tegak, dan target output harian terjaga dari awal hingga akhir shift.'
                  : 'Engineered lifting assistance shifts physical load from operators to handling systems. This lowers strain, supports healthier working routines, and helps maintain consistent output quality across shifts.'}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full bg-blue-50/80 px-3 py-1 text-xs font-mono font-bold text-[#005596] border border-blue-200">
                {isId ? '↓ Beban Tulang Belakang' : '↓ Strain Load'}
              </span>
              <span className="inline-flex items-center rounded-full bg-emerald-50/80 px-3 py-1 text-xs font-mono font-bold text-emerald-700 border border-emerald-200">
                {isId ? '↑ Konsistensi Output' : '↑ Quality Output'}
              </span>
              <span className="inline-flex items-center rounded-full bg-blue-50/80 px-3 py-1 text-xs font-mono font-bold text-[#005596] border border-blue-200">
                {isId ? '↓ Paparan Cedera MSD' : '↓ Risk Exposure'}
              </span>
            </div>
          </motion.div>
        </section>

        {/* Case Studies */}
        <ErgonomicsCaseStudies topic="health" />

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
                <SolidHealthIcon className="w-3.5 h-3.5" />
                <span>{isId ? 'Rekomendasi Langkah Berikutnya' : 'Recommended Next Step'}</span>
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 tracking-tight leading-tight">
                {isId ? 'Evaluasi titik angkat berisiko dan opsi mitigasinya' : 'Assess your lifting risk and mitigation options'}
              </h2>
              <p className="text-blue-100/90 leading-relaxed mb-8 max-w-2xl font-normal text-sm sm:text-base">
                {isId
                  ? 'Diskusikan karakteristik beban dan siklus angkat di pabrik Anda bersama tim engineering kami untuk memetakan solusi pengangkatan yang paling efektif.'
                  : 'Discuss your handling profile with our engineering team and map where ergonomic support can reduce physical risk in your operation.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3.5">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-blue-50 text-[#005596] text-sm font-bold rounded-full shadow-[0_10px_28px_-6px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                >
                  <span>{isId ? 'Jadwalkan Konsultasi Risiko Angkat' : 'Request Health-Risk Consultation'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/digital-assistant/roi-calculator"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 backdrop-blur-xl text-white text-sm font-bold shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                >
                  <span>{isId ? 'Hitung Estimasi ROI' : 'Estimate ROI Impact'}</span>
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
              {isId ? 'Topik Selanjutnya' : 'Next Topic'}
            </span>
            <h3 className="text-xl font-black text-slate-900 group-hover:text-[#005596] transition-colors tracking-tight">
              {isId ? 'Ergonomi dan Produktivitas Pabrik' : 'Ergonomics and productivity'}
            </h3>
            <p className="text-slate-600 mt-2 text-sm leading-relaxed font-normal">
              {isId
                ? 'Pelajari bagaimana sistem angkat ergonomis meningkatkan throughput dan menekan waktu siklus yang hilang.'
                : 'See how ergonomics improves throughput and lowers hidden process loss.'}
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
              {isId ? 'Topik Terkait' : 'Related Topic'}
            </span>
            <h3 className="text-xl font-black text-slate-900 group-hover:text-[#005596] transition-colors tracking-tight">
              {isId ? 'Standar Keselamatan & Kepatuhan K3' : 'Safety standards and compliance'}
            </h3>
            <p className="text-slate-600 mt-2 text-sm leading-relaxed font-normal">
              {isId
                ? 'Telusuri kerangka regulasi K3 dan sertifikasi medis untuk implementasi ergonomi di pabrik.'
                : 'Explore practical safety frameworks for ergonomic implementation.'}
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
