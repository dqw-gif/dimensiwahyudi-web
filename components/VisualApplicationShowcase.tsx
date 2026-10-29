'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Factory, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageProvider';

interface ApplicationItem {
  id: string;
  name: string;
  nameId: string;
  badge: string;
  badgeId: string;
  headline: string;
  headlineId: string;
  humanStory: string;
  humanStoryId: string;
  lifterModel: string;
  factoryProof: string;
  factoryProofId: string;
  image: string;
  capacity: string;
  capacityId: string;
  speed: string;
  speedId: string;
  operatorCount: string;
  operatorCountId: string;
  vacuumBenefit: string;
  vacuumBenefitId: string;
}

const applications: ApplicationItem[] = [
  {
    id: 'box',
    name: 'Cardboard Boxes & Cartons',
    nameId: 'Kardus & Karton Kemasan',
    badge: 'Logistics, Electronics & FMCG',
    badgeId: 'Logistik, Elektronik & FMCG',
    headline: 'Transfer Up to 350 Boxes per Hour with Zero Back Bending',
    headlineId: 'Pindahkan Hingga 350 Kardus per Jam Tanpa Membungkuk',
    humanStory:
      'On packing lines and receiving docks, operators lift hundreds of heavy boxes per shift. With JumboFlex, the operator guides the suction pad with a single control lever. The box lifts instantly, posture stays upright, and daily palletizing quotas are met ahead of schedule.',
    humanStoryId:
      'Di lini packing dan area bongkar muat, operator mengangkat ratusan kardus berat setiap shift. Dengan JumboFlex, operator cukup mengarahkan suction cup menggunakan tuas satu jari. Kardus terangkat instan, postur punggung tetap tegak, dan target palletizing harian tercapai lebih cepat.',
    lifterModel: 'Schmalz JumboFlex 35 / 50',
    factoryProof: 'Live Installation at PT Rinnai Indonesia',
    factoryProofId: 'Instalasi Aktual di PT Rinnai Indonesia',
    image: '/projects/app-box-rinnai.webp',
    capacity: '20 to 50 kg',
    capacityId: '20 hingga 50 kg',
    speed: 'Up to 350 boxes / hour',
    speedId: 'Hingga 350 kardus / jam',
    operatorCount: '1 Single Operator',
    operatorCountId: '1 Operator Mandiri',
    vacuumBenefit: 'One operator stands fully upright (certified by German AGR medical standards), maintaining a steady pace without fatigue pauses.',
    vacuumBenefitId: 'Satu operator bekerja dengan postur tegak (tersertifikasi medis AGR Jerman), menjaga kestabilan cycle time tanpa jeda kelelahan.',
  },
  {
    id: 'sack',
    name: 'Sacks & Raw Material Bags',
    nameId: 'Karung & Kantong Bahan Baku',
    badge: 'Tire Manufacturing, Chemical & Cement',
    badgeId: 'Manufaktur Ban, Kimia & Semen',
    headline: 'Lift 50 kg Sacks Solo Without Tearing or Spinal Strain',
    headlineId: 'Angkat Karung 50 kg Sendiri Tanpa Sobek atau Nyeri Pinggang',
    humanStory:
      'Sacks containing cement, refined sugar, or chemical resins are heavy, dusty, and prone to tearing when pulled manually. Schmalz porous suction pads hold bag fabrics securely without puncturing. Ergonomic twist handles enable fluid pallet stacking with zero shock load transferred to the lumbar spine.',
    humanStoryId:
      'Karung berisi semen, gula rafinasi, atau resin kimia sangat berat, berdebu, dan mudah sobek saat ditarik manual. Suction cup khusus karung dari Schmalz mencengkeram permukaan karung dengan rapat tanpa merusak kemasan. Gagang putar ergonomis memudahkan penyusunan palet tanpa membebani tulang belakang.',
    lifterModel: 'Schmalz JumboErgo 60 / 110',
    factoryProof: 'Live Installation at PT Evoluzione Tyres (Pirelli Group)',
    factoryProofId: 'Instalasi Aktual di PT Evoluzione Tyres (Pirelli Group)',
    image: '/projects/app-sack-evoluzione.webp',
    capacity: '40 to 110 kg',
    capacityId: '40 hingga 110 kg',
    speed: 'Up to 240 sacks / hour',
    speedId: 'Hingga 240 karung / jam',
    operatorCount: '1 Single Operator',
    operatorCountId: '1 Operator Mandiri',
    vacuumBenefit: 'Porous suction cups hold woven material tightly without punctures, lifting the load with zero spinal compression.',
    vacuumBenefitId: 'Suction cup khusus material berpori mencengkeram karung rajut dengan rapat dan mengangkat beban tanpa tekanan pada pinggang.',
  },
  {
    id: 'drum',
    name: 'Pails, Drums & Liquid Containers',
    nameId: 'Pail, Drum & Wadah Cairan',
    badge: 'Coatings, Lubricants & Chemical Liquids',
    badgeId: 'Cat, Pelumas & Cairan Kimia',
    headline: 'Handle Pails and Chemical Drums Smoothly with Automatic Safety Check-Valves',
    headlineId: 'Pindahkan Pail dan Drum Kimia Secara Aman dengan Katup Pengaman Otomatis',
    humanStory:
      'Manually rolling or lifting paint pails and chemical drums risks slip injuries and crushed toes. Schmalz vacuum lifters clamp cylindrical containers with high-volume suction power. In the event of a sudden factory power interruption, a mechanical non-return check valve prevents drops and lowers the load controlled to the floor.',
    humanStoryId:
      'Menggelindingkan atau mengangkat pail cat dan drum kimia secara manual berisiko menyebabkan tumpahan maupun cedera kaki. Vacuum lifter Schmalz mencengkeram wadah silinder dengan daya hisap tinggi. Jika listrik pabrik padam mendadak, katup pengaman mekanis menahan beban agar turun perlahan ke lantai.',
    lifterModel: 'Schmalz Jumbo Sprint & VacuMaster',
    factoryProof: 'Live Installation at PT Hempel Indonesia',
    factoryProofId: 'Instalasi Aktual di PT Hempel Indonesia',
    image: '/projects/app-drum-hempel.webp',
    capacity: '25 to 300 kg',
    capacityId: '25 hingga 300 kg',
    speed: 'Millimeter Precision without Spills',
    speedId: 'Presisi Milimeter Tanpa Tumpah',
    operatorCount: '1 Single Operator',
    operatorCountId: '1 Operator Mandiri',
    vacuumBenefit: 'Stable vacuum grip with mechanical non-return safety valve ensuring load retention during emergency power cuts.',
    vacuumBenefitId: 'Cengkeraman vakum stabil dilengkapi katup pengaman non-return mekanis untuk menahan beban saat listrik padam darurat.',
  },
  {
    id: 'metal-glass',
    name: 'Metal Sheets, Glass & Dense Parts',
    nameId: 'Plat Logam, Kaca & Komponen Berat',
    badge: 'Fabrication, Aluminum & Architectural Glass',
    badgeId: 'Fabrikasi Logam, Aluminium & Kaca Arsitektural',
    headline: 'Load Heavy Panels onto Machine Tables Without Surface Scratches or Laceration Hazards',
    headlineId: 'Muat Plat Berat ke Meja Mesin Tanpa Goresan Permukaan atau Risiko Tergores',
    humanStory:
      'Moving raw aluminum billets, sharp sheet metal, or wide glass panes traditionally requires 3 to 4 workers and poses severe laceration risks. With Binar Quick-Lift articulated arms and Schmalz VacuMaster lifters, a single operator lifts, rotates, and indexes dense workpieces smoothly onto CNC beds.',
    humanStoryId:
      'Memindahkan billet aluminium, plat besi tajam, atau kaca lebar secara manual biasanya membutuhkan 3 hingga 4 pekerja dan berisiko tinggi melukai tangan. Dengan Binar Quick-Lift Arm dan Schmalz VacuMaster, satu operator dapat mengangkat, memutar, dan memposisikan workpiece berat secara presisi ke meja CNC.',
    lifterModel: 'Binar Quick-Lift Arm & VacuMaster',
    factoryProof: 'Live Installation at PT YKK AP Indonesia',
    factoryProofId: 'Instalasi Aktual di PT YKK AP Indonesia',
    image: '/projects/app-metal-ykk.webp',
    capacity: '50 to 300 kg',
    capacityId: '50 hingga 300 kg',
    speed: 'Zero-Gravity Responsive Float',
    speedId: 'Sensor Penyeimbang Zero-Gravity',
    operatorCount: 'Reduced from 4 to 1 Worker',
    operatorCountId: 'Efisiensi dari 4 Menjadi 1 Operator',
    vacuumBenefit: 'Smart sensors balance part weight instantaneously, so the operator only guides orientation with millimeter precision.',
    vacuumBenefitId: 'Sensor pintar menyeimbangkan berat komponen secara instan sehingga operator cukup mengarahkan posisi dengan akurasi milimeter.',
  },
];

export default function VisualApplicationShowcase() {
  const [activeTab, setActiveTab] = useState<string>('box');
  const { lang } = useLanguage();
  const isId = lang === 'id';
  const currentApp = applications.find((a) => a.id === activeTab) || applications[0];

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-slate-50/70 via-white to-slate-50/50 border-b border-slate-200/70 relative overflow-hidden">
      {/* Subtle Ambient Refraction */}
      <div 
        className="absolute top-20 left-1/4 w-[500px] h-[360px] bg-[#005596]/5 rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-10 right-1/4 w-[460px] h-[320px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-6 sm:mb-10 text-left">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-[#005596]/15 shadow-[0_2px_10px_rgba(0,85,150,0.06)] text-xs font-mono font-bold uppercase tracking-widest text-[#005596] mb-2 sm:mb-3">
            {isId ? 'Aplikasi Material Handling di Lantai Pabrik' : 'Industrial Material Handling Applications'}
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.2]">
            {isId ? 'Solusi Teruji Sesuai ' : 'Proven Solutions for Your '}<br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#005596] to-[#1d4ed8] bg-clip-text text-transparent">
              {isId ? 'Jenis Workpiece Pabrik Anda' : 'Factory Workpiece Types'}
            </span>
          </h2>
          <p className="mt-2.5 sm:mt-3.5 text-sm sm:text-lg text-slate-600 leading-relaxed font-normal">
            {isId
              ? 'Pilih profil workpiece Anda untuk melihat rekomendasi unit pengangkat dan instalasi aktual di fasilitas manufaktur Indonesia.'
              : 'Select your workpiece profile to see recommended lifting units and verified plant installations across Indonesian manufacturing facilities.'}
          </p>
        </div>

        {/* Horizontal Swipe Rail on Mobile / Centered Dock on Desktop */}
        <div className="w-full overflow-x-auto no-scrollbar pb-2 sm:pb-0 mb-6 sm:mb-10 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="inline-flex items-center p-1 sm:p-1.5 bg-white/80 backdrop-blur-2xl rounded-full border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_4px_20px_-4px_rgba(0,85,150,0.08)] whitespace-nowrap min-w-max">
            {applications.map((app) => {
              const isActive = app.id === activeTab;
              return (
                <button
                  key={app.id}
                  onClick={() => setActiveTab(app.id)}
                  type="button"
                  className={`relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-colors duration-200 cursor-pointer shrink-0 ${
                    isActive ? 'text-white' : 'text-slate-600 hover:text-[#005596]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeAppPill"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      className="absolute inset-0 bg-gradient-to-r from-[#005596] to-[#1d4ed8] rounded-full shadow-[0_4px_14px_rgba(29,78,216,0.35),inset_0_1px_0_0_rgba(255,255,255,0.25)]"
                    />
                  )}
                  <span className="relative z-10">{isId ? app.nameId : app.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Editorial Two-Column Showcase */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-14 items-center text-left">
          
          {/* Left Column: Real Plant Photo with Provenance HUD */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentApp.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_24px_60px_-15px_rgba(0,85,150,0.16)] border border-white/90 ring-1 ring-[#005596]/15 bg-slate-900 group"
              >
                <Image
                  src={currentApp.image}
                  alt={isId ? currentApp.headlineId : currentApp.headline}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />

                {/* Provenance Glass Pill */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 bg-slate-900/80 backdrop-blur-xl border border-white/20 rounded-full text-[10px] sm:text-[11px] font-semibold text-white shadow-lg">
                  <Factory className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-400" />
                  <span>{isId ? currentApp.factoryProofId : currentApp.factoryProof}</span>
                </div>

                {/* Telemetry Bar at Image Bottom */}
                <div className="absolute bottom-2.5 sm:bottom-4 left-2.5 sm:left-4 right-2.5 sm:right-4 bg-slate-900/80 sm:bg-white/90 backdrop-blur-xl sm:backdrop-blur-2xl p-2 sm:p-3.5 rounded-xl sm:rounded-2xl border border-white/20 sm:border-white/95 ring-1 ring-[#005596]/15 shadow-lg flex items-center justify-between text-white sm:text-slate-800 transition-colors">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-400 sm:bg-[#005596] shrink-0" />
                      <span className="text-[8px] sm:text-[10px] font-mono uppercase tracking-wider text-blue-300 sm:text-[#005596] font-bold">
                        {isId ? 'Rekomendasi Unit' : 'Recommended Unit'}
                      </span>
                    </div>
                    <div className="text-[11px] sm:text-sm font-extrabold text-white sm:text-slate-900 leading-tight">
                      {currentApp.lifterModel}
                    </div>
                  </div>

                  <div className="text-right border-l border-white/20 sm:border-slate-200/80 pl-3 sm:pl-4 space-y-0.5 shrink-0">
                    <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-wider text-slate-300 sm:text-slate-400 block font-semibold">
                      {isId ? 'Payload' : 'Capacity'}
                    </span>
                    <span className="text-[11px] sm:text-sm font-black text-blue-300 sm:text-[#005596] font-mono leading-tight">
                      {isId ? currentApp.capacityId : currentApp.capacity}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Key Operational Metrics & Action CTA */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentApp.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="space-y-2.5 sm:space-y-4"
              >
                <div>
                  <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#005596] block mb-1.5 sm:mb-2">
                    {isId ? currentApp.badgeId : currentApp.badge}
                  </span>
                  <h3 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                    {isId ? currentApp.headlineId : currentApp.headline}
                  </h3>
                </div>

                <p className="text-xs sm:text-base text-slate-600 leading-relaxed font-normal">
                  {isId ? currentApp.humanStoryId : currentApp.humanStory}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Key Performance Metrics Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-0.5 sm:pt-1">
              <div className="p-2.5 sm:p-3.5 rounded-xl bg-slate-50/90 border border-slate-200/80 text-center sm:text-left flex flex-col justify-between">
                <span className="text-[8px] sm:text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold mb-1">
                  {isId ? 'Payload' : 'Capacity'}
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                  {isId ? currentApp.capacityId : currentApp.capacity}
                </span>
              </div>
              <div className="p-2.5 sm:p-3.5 rounded-xl bg-slate-50/90 border border-slate-200/80 text-center sm:text-left flex flex-col justify-between">
                <span className="text-[8px] sm:text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold mb-1">
                  {isId ? 'Cycle Time' : 'Cycle Speed'}
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-[#005596] leading-snug">
                  {isId ? currentApp.speedId : currentApp.speed}
                </span>
              </div>
              <div className="p-2.5 sm:p-3.5 rounded-xl bg-slate-50/90 border border-slate-200/80 text-center sm:text-left flex flex-col justify-between">
                <span className="text-[8px] sm:text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold mb-1">
                  {isId ? 'Jumlah Operator' : 'Crew Size'}
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-700 leading-snug">
                  {isId ? currentApp.operatorCountId : currentApp.operatorCount}
                </span>
              </div>
            </div>

            {/* Real Field Operational Impact Callout */}
            <div className="flex items-start gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-blue-50/70 border border-blue-100/90 text-slate-700">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#005596] shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm leading-relaxed">
                <strong className="text-slate-900 font-bold block mb-0.5">
                  {isId ? 'Dampak di Lini Produksi:' : 'Production Floor Impact:'}
                </strong>
                <span className="text-slate-600">{isId ? currentApp.vacuumBenefitId : currentApp.vacuumBenefit}</span>
              </div>
            </div>

            {/* Direct Action Button */}
            <div className="pt-1 sm:pt-2">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href={`/contact?subject=Inquiry%20Handling%20Solution%20${encodeURIComponent(currentApp.name)}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 bg-gradient-to-r from-[#005596] to-[#1d4ed8] hover:from-[#00447a] hover:to-[#1e40af] text-white text-xs sm:text-sm font-bold rounded-full shadow-[0_8px_24px_-4px_rgba(29,78,216,0.35)] transition-all"
                >
                  <span>
                    {isId
                      ? `Minta Evaluasi Lini untuk ${currentApp.nameId}`
                      : `Request Assessment for ${currentApp.name}`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
