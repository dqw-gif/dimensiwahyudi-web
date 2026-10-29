'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  Target,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { useLanguage } from '../LanguageProvider';

/* ─── 1. Hero Section ─── */
export function AboutHero() {
  const { lang } = useLanguage();
  const isId = lang === 'id';

  return (
    <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Pill Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-[#005596]/15 shadow-[0_2px_10px_rgba(0,85,150,0.06)] mb-6"
      >
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#005596]">
          {isId ? 'TENTANG KAMI • BERDIRI SEJAK 2009' : 'ABOUT US • ESTABLISHED 2009'}
        </span>
      </motion.div>

      {/* Monumental Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.6 }}
        className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-[1.15] tracking-tight"
      >
        {isId ? 'Spesialis Ergonomic Handling & ' : 'Pioneering Ergonomic Handling & '}<br className="hidden sm:inline" />
        <span className="bg-gradient-to-r from-[#005596] to-[#1d4ed8] bg-clip-text text-transparent">
          {isId ? 'Sistem Otomasi Vakum Industri' : 'Vacuum Automation Systems'}
        </span>
      </motion.h1>

      {/* Lead Paragraph */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8"
      >
        {isId
          ? 'PT Dimensi Quantum Wahyudi (DQW), bagian dari Nabel Sakha Group, menghadirkan sistem Vacuum Handling bersertifikat dari Schmalz Jerman dan manipulator lengan elektrik dari Binar Swedia langsung ke pabrik manufaktur di seluruh Indonesia.'
          : 'PT Dimensi Quantum Wahyudi (DQW), a member of Nabel Sakha Group, delivers certified vacuum handling equipment from Schmalz Germany and electric manipulator arms from Binar Sweden directly to manufacturing facilities across Indonesia.'}
      </motion.p>

      {/* Quick Action Pill Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.6 }}
        className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
      >
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#005596] hover:bg-[#004276] active:scale-[0.98] text-white text-sm font-bold rounded-full shadow-[0_4px_16px_rgba(0,85,150,0.25)] hover:shadow-[0_8px_24px_rgba(0,85,150,0.35)] hover:-translate-y-0.5 transition-all"
        >
          <span>{isId ? 'Konsultasi dengan Tim Engineer' : 'Speak with Our Engineers'}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/90 hover:bg-white active:scale-[0.98] border border-slate-200/90 hover:border-[#005596]/40 shadow-xs hover:shadow-md text-sm font-bold text-[#005596] transition-all"
        >
          <span>{isId ? 'Lihat Solusi Produk' : 'Explore Handling Solutions'}</span>
        </Link>
      </motion.div>
    </div>
  );
}

/* ─── 2. Story Image & Credential Badges ─── */
export function AboutStoryImage() {
  const { lang } = useLanguage();
  const isId = lang === 'id';

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative h-[380px] sm:h-[480px] rounded-3xl overflow-hidden border border-white/95 ring-1 ring-[#005596]/15 shadow-[0_20px_50px_-15px_rgba(0,85,150,0.12)] group bg-slate-100"
    >
      <Image
        src="/about/team-facility.jpg"
        alt="Engineering Facility and Team of PT Dimensi Quantum Wahyudi"
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        priority
      />

      {/* Subtle overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent pointer-events-none" />

      {/* Official Partners Floating Card */}
      <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 bg-white/90 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/15 p-4 sm:p-5 rounded-2xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-4">
          <div className="h-8 flex items-center">
            <Image
              src="/brands/schmalz.webp"
              alt="Schmalz Germany"
              width={105}
              height={32}
              className="object-contain"
            />
          </div>
          <div className="w-px h-7 bg-slate-200" />
          <div className="h-8 flex items-center">
            <Image
              src="/brands/binar.webp"
              alt="Binar Sweden"
              width={85}
              height={32}
              className="object-contain"
            />
          </div>
        </div>

        <div className="text-left sm:text-right border-t sm:border-t-0 sm:border-l border-slate-200 pt-2 sm:pt-0 sm:pl-4">
          <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#005596]">
            {isId ? 'Distributor Resmi di Indonesia' : 'Authorized Indonesian Partner'}
          </p>
          <p className="text-xs text-slate-500 font-medium">
            {isId ? 'Suku Cadang OEM Asli & Teknisi Bersertifikat' : 'Genuine OEM Spare Parts & Factory Certified Support'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── 3. Core Values (Vision & Mission) ─── */
const values = [
  {
    badge: 'STRATEGIC VISION',
    badgeId: 'VISI STRATEGIS',
    title: 'Corporate Vision',
    titleId: 'Visi Perusahaan',
    icon: <Target className="w-7 h-7 text-[#005596]" />,
    desc: 'Deliver reliable vacuum automation and ergonomic handling systems across Indonesian industry, backed by German AGR health certification, immediate local spare parts, and dedicated field engineering.',
    descId: 'Menghadirkan sistem otomasi vakum dan ergonomic handling yang andal di seluruh industri manufaktur Indonesia, didukung sertifikasi kesehatan AGR Jerman, ketersediaan sparepart lokal, serta tim teknisi lapangan berdedikasi.',
    commitments: [
      'International Ergonomic Standards (German AGR Certified)',
      'Operational Testing Rig & Sample Trials in Cikarang',
      'Guaranteed OEM Spare Parts & Local Field Engineering',
    ],
    commitmentsId: [
      'Standar Ergonomi Internasional (Bersertifikasi Medis AGR Jerman)',
      'Fasilitas Uji Workpiece & Simulasi Aktual di Workshop Cikarang',
      'Jaminan Sparepart OEM Asli & Dukungan Teknisi Lapangan',
    ],
  },
  {
    badge: 'OPERATIONAL MISSION',
    badgeId: 'MISI OPERASIONAL',
    title: 'Corporate Mission',
    titleId: 'Misi Perusahaan',
    icon: <ShieldCheck className="w-7 h-7 text-[#005596]" />,
    desc: 'Engineer and deploy industrial lifting systems that reliably eliminate lower-back strain on factory floors, shorten cycle times by up to 40%, and deliver verifiable ROI for manufacturing plants.',
    descId: 'Merancang dan menginstalasi sistem pengangkat industri yang menghilangkan risiko cedera punggung bawah di lantai pabrik, mempercepat cycle time hingga 40%, serta memberikan ROI terukur bagi perusahaan manufaktur.',
    commitments: [
      'Elimination of Musculoskeletal Strain and Spinal Injury Risks',
      'Cycle Time Reductions up to 40% on Heavy Assembly Lines',
      'Hands-on Operator Safety Training and Rig Certification',
    ],
    commitmentsId: [
      'Eliminasi Risiko Cedera Otot Rangka dan Tulang Belakang Operator',
      'Pemangkasan Cycle Time hingga 40% pada Lini Produksi Berat',
      'Pelatihan Pengoperasian Aman & Sertifikasi Unit di Pabrik',
    ],
  },
];

export function AboutCoreValues() {
  const { lang } = useLanguage();
  const isId = lang === 'id';

  return (
    <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
      {values.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.15 }}
          className="bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] rounded-3xl p-7 sm:p-9 hover:shadow-xl hover:ring-[#005596]/25 transition-all flex flex-col justify-between group relative overflow-hidden"
        >
          {/* Subtle ambient light corner accent */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-[#005596]/5 rounded-bl-full pointer-events-none group-hover:bg-[#005596]/8 transition-colors" />

          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-[#005596]/10 text-[#005596] ring-1 ring-[#005596]/20 flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
                {item.icon}
              </div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#005596]/8 text-[#005596] border border-[#005596]/15">
                {isId ? item.badgeId : item.badge}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3 tracking-tight">
              {isId ? item.titleId : item.title}
            </h3>

            <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-6 font-normal">
              {isId ? item.descId : item.desc}
            </p>
          </div>

          {/* Concrete Commitments */}
          <div className="pt-6 border-t border-slate-100 space-y-3">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
              {isId ? 'Pilar Eksekusi Utama:' : 'Key Execution Pillars:'}
            </p>
            {(isId ? item.commitmentsId : item.commitments).map((c, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#005596] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-700 font-medium leading-snug">
                  {c}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── 4. Client Showcase: 3 Smooth Infinite Marquee Tracks (48 Industry Leaders) ─── */
interface ClientBrand {
  name: string;
  logo: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'max-h-5 sm:max-h-6 max-w-[100px] sm:max-w-[120px]',  // Chunky/bold uppercase wordmarks (MARS, CABOT, INOAC)
  md: 'max-h-7 sm:max-h-8 max-w-[125px] sm:max-w-[145px]',  // Standard horizontal balanced logos
  lg: 'max-h-10 sm:max-h-12 max-w-[125px] sm:max-w-[145px]', // Vertical, circular, or fine-detail marks (Unilever, Nutrifood, Kalbe, YKK, Hempel)
};

const row1Clients: ClientBrand[] = [
  { name: 'PT Astra Daihatsu Motor', logo: '/clients/astra-daihatsu.svg', size: 'md' },
  { name: 'PT Unilever Indonesia Tbk', logo: '/clients/unilever.svg', size: 'lg' },
  { name: 'PT Mayora Indah Tbk', logo: '/clients/mayora.png', size: 'md' },
  { name: 'PT Indofood CBP Sukses Makmur', logo: '/clients/indofood.png', size: 'md' },
  { name: 'PT Nestle Indonesia', logo: '/clients/nestle.svg', size: 'md' },
  { name: 'PT Gajah Tunggal Tbk', logo: '/clients/gajah-tunggal.png', size: 'md' },
  { name: 'PT GS Battery', logo: '/clients/gs-battery.png', size: 'md' },
  { name: 'PT Evoluzione Tyres (Pirelli Group)', logo: '/clients/pirelli.svg', size: 'md' },
  { name: 'PT Sumi Rubber Indonesia (Dunlop)', logo: '/clients/dunlop.svg', size: 'md' },
  { name: 'PT Asahimas Flat Glass Tbk', logo: '/clients/asahimas.png', size: 'md' },
  { name: 'PT Yakult Indonesia Persada', logo: '/clients/yakult.svg', size: 'md' },
  { name: 'PT Garudafood Putra Putri Jaya Tbk', logo: '/clients/garudafood.png', size: 'md' },
  { name: 'PT Rinnai Indonesia', logo: '/clients/rinnai.svg', size: 'md' },
  { name: 'PT YKK AP Indonesia', logo: '/clients/ykk-ap.svg', size: 'lg' },
  { name: 'PT Otsuka Indonesia', logo: '/clients/otsuka.png', size: 'md' },
  { name: 'PT Angkasa Pura II', logo: '/clients/angkasa-pura-2.svg', size: 'lg' },
];

const row2Clients: ClientBrand[] = [
  { name: 'PT Taco Anugrah Corporindo', logo: '/clients/taco.svg', size: 'md' },
  { name: 'PT Mowilex Indonesia', logo: '/clients/mowilex.webp', size: 'md' },
  { name: 'PT Cabot Indonesia', logo: '/clients/cabot.png', size: 'sm' },
  { name: 'PT Nutribev Nabati Indonesia', logo: '/clients/nabati.png', size: 'md' },
  { name: 'PT Nutrifood Indonesia', logo: '/clients/nutrifood.png', size: 'lg' },
  { name: 'PT Multi Bintang Indonesia Tbk', logo: '/images/clients/logo-pt-multi-bintang-indonesia-tbk.webp', size: 'lg' },
  { name: 'PT Kalbe Morinaga Indonesia', logo: '/images/clients/logo-pt-kalbe-morinaga-indonesia.webp', size: 'lg' },
  { name: 'PT Meiji Food Indonesia', logo: '/images/clients/meiji-logo.webp', size: 'md' },
  { name: 'PT Sarihusada Generasi Mahardhika', logo: '/images/clients/logo-pt-sarihusada-generasi-mahardhika.webp', size: 'md' },
  { name: 'PT URC Indonesia', logo: '/images/clients/logo-pt-urc-indonesia.webp', size: 'md' },
  { name: 'PT Suryaraya Rubberindo Industries', logo: '/images/clients/logo-pt-suryaraya-rubberindo-industries.webp', size: 'md' },
  { name: 'PT Sugity Creatives', logo: '/images/clients/sugity-logo.webp', size: 'md' },
  { name: 'PT Hokkan Indonesia', logo: '/images/clients/logo-pt-hokkan-indonesia.webp', size: 'md' },
  { name: 'PT Bredero Shaw Indonesia', logo: '/images/clients/logo-pt-bredero-shaw-indonesia.webp', size: 'md' },
  { name: 'PT Cipta Mortar Utama', logo: '/images/clients/logo-pt-cipta-mortar-utama.webp', size: 'md' },
  { name: 'PT Delifood Sentosa Corpindo', logo: '/images/clients/logo-pt-delifood-sentosa-corpindo.webp', size: 'lg' },
];

const row3Clients: ClientBrand[] = [
  { name: 'PT Diageo Indonesia', logo: '/images/clients/logo-pt-diageo-indonesia.webp', size: 'sm' },
  { name: 'PT DSM-Firmenich Aromatics', logo: '/images/clients/logo-pt-dsm-firmenich-aromatics.svg', size: 'md' },
  { name: 'PT Elangperdana Tyre Industry', logo: '/images/clients/logo-pt-elangperdana-tyre-industry.webp', size: 'md' },
  { name: 'PT Federal Karyatama', logo: '/images/clients/logo-pt-federal-karyatama.webp', size: 'lg' },
  { name: 'PT Fukusuke Kogyo Indonesia', logo: '/images/clients/logo-pt-fukusuke-kogyo-indonesia.webp', size: 'md' },
  { name: 'PT Hempel Indonesia', logo: '/images/clients/logo-pt-hempel-indonesia.webp', size: 'lg' },
  { name: 'PT Indonesia Nikka Chemicals', logo: '/images/clients/logo-pt-indonesia-nikka-chemicals.webp', size: 'lg' },
  { name: 'PT Industrial Robotic Automation', logo: '/images/clients/logo-pt-industrial-robotic-automation.webp', size: 'lg' },
  { name: 'PT Inoac Polytechno Indonesia', logo: '/images/clients/logo-pt-inoac-polytechno-indonesia.svg', size: 'sm' },
  { name: 'PT Kayu Permata', logo: '/images/clients/logo-pt-kayu-permata.svg', size: 'md' },
  { name: 'PT Kian Mulia Manunggal', logo: '/images/clients/logo-pt-kian-mulia-manunggal.webp', size: 'lg' },
  { name: 'PT Mars Symbioscience', logo: '/images/clients/logo-pt-mars-symbioscience.webp', size: 'sm' },
  { name: 'PT Mura Maha Agung', logo: '/images/clients/logo-pt-mura-maha-agung.webp', size: 'sm' },
  { name: 'PT Nufarm Indonesia', logo: '/images/clients/logo-pt-nufarm-indonesia.svg', size: 'md' },
  { name: 'PT Sakae Riken Indonesia', logo: '/images/clients/logo-pt-sakae-riken-indonesia.webp', size: 'md' },
  { name: 'PT Sri Trang Lingga Indonesia', logo: '/images/clients/logo-pt-sri-trang-lingga-indonesia.webp', size: 'md' },
];

function ClientLogoItem({ client }: { client: ClientBrand }) {
  const sizeClass = sizeClasses[client.size || 'md'];

  return (
    <div
      className="w-40 sm:w-52 h-16 sm:h-20 shrink-0 flex items-center justify-center px-4 py-2 group transition-all duration-300"
      title={client.name}
    >
      <Image
        src={client.logo}
        alt={client.name}
        width={160}
        height={60}
        className={`${sizeClass} w-auto h-auto object-contain grayscale contrast-125 opacity-85 group-hover:grayscale-0 group-hover:contrast-100 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300`}
      />
    </div>
  );
}

export function AboutClientLogos() {
  const { lang } = useLanguage();
  const isId = lang === 'id';

  return (
    <div className="w-full">
      {/* 3 Continuous Sliding Rows with Smooth Leftward Scroll */}
      <div className="relative w-full overflow-hidden py-4 space-y-3 sm:space-y-5">
        {/* Left & Right Gradient Fade Masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

        {/* Row 1: Sliding Left */}
        <div className="flex w-max animate-marquee-row-1 gap-4 sm:gap-6 items-center">
          {[...row1Clients, ...row1Clients].map((client, idx) => (
            <ClientLogoItem key={`r1-${client.name}-${idx}`} client={client} />
          ))}
        </div>

        {/* Row 2: Sliding Left with Subtle Offset Speed */}
        <div className="flex w-max animate-marquee-row-2 gap-4 sm:gap-6 items-center">
          {[...row2Clients, ...row2Clients].map((client, idx) => (
            <ClientLogoItem key={`r2-${client.name}-${idx}`} client={client} />
          ))}
        </div>

        {/* Row 3: Sliding Left */}
        <div className="flex w-max animate-marquee-row-3 gap-4 sm:gap-6 items-center">
          {[...row3Clients, ...row3Clients].map((client, idx) => (
            <ClientLogoItem key={`r3-${client.name}-${idx}`} client={client} />
          ))}
        </div>
      </div>

      {/* Executive Footnote & Link to Case Studies */}
      <div className="mt-12 sm:mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left max-w-6xl mx-auto">
        <div className="space-y-1">
          <p className="text-sm font-bold text-slate-800">
            {isId
              ? 'Dipercaya di 50+ Pabrik Manufaktur Utama di Indonesia'
              : 'Trusted across 50+ Major Manufacturing Plants in Indonesia'}
          </p>
          <p className="text-xs text-slate-500 font-medium">
            {isId
              ? 'Kawasan Industri Cikarang (Jababeka, EJIP, MM2100, GIIC), Karawang (KIIC, Suryacipta), hingga Jawa Timur.'
              : 'Cikarang Industrial Corridors (Jababeka, EJIP, MM2100, GIIC), Karawang (KIIC, Suryacipta), and East Java hubs.'}
          </p>
        </div>

        <Link
          href="/our-projects"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/90 hover:bg-white border border-slate-200/90 hover:border-[#005596]/40 shadow-xs hover:shadow-md text-xs font-bold text-[#005596] transition-all shrink-0 active:scale-[0.98]"
        >
          <span>{isId ? 'Lihat Studi Kasus Proyek' : 'View Project Case Studies'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

export function AboutStoryContent() {
  const { lang } = useLanguage();
  const isId = lang === 'id';

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-[#005596]/15 shadow-[0_2px_10px_rgba(0,85,150,0.06)] mb-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#005596]">
            {isId ? 'REKAM JEJAK TERUJI' : 'PROVEN TRACK RECORD'}
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          {isId ? 'Menghubungkan Presisi Eropa dengan ' : 'Connecting European Precision with '}
          <span className="bg-gradient-to-r from-[#005596] to-[#1d4ed8] bg-clip-text text-transparent">
            {isId ? 'Kebutuhan Lini Pabrik Indonesia' : 'Indonesian Factory Demands'}
          </span>
        </h2>
      </div>

      <div className="space-y-4 sm:space-y-5 text-slate-600 leading-relaxed text-sm sm:text-base">
        {isId ? (
          <>
            <p>
              Didirikan pada tahun 2009 di Bekasi, <strong>PT Dimensi Quantum Wahyudi (DQW)</strong> beroperasi sebagai perusahaan anggota <strong>Nabel Sakha Group</strong>. Selama lebih dari 17 tahun, kami berkembang menjadi mitra engineering spesialis untuk sistem otomasi vakum dan ergonomic material handling di berbagai koridor industri Indonesia.
            </p>
            <p>
              Berfokus penuh pada penanganan beban presisi, kami menyuplai unit bersertifikat dari <strong>Schmalz Jerman</strong> dan <strong>Binar Swedia</strong>, didukung layanan teknis lapangan yang disesuaikan dengan ritme operasional pabrik lokal.
            </p>
            <div className="border-l-4 border-[#005596] pl-4 py-2.5 bg-blue-50/50 rounded-r-xl">
              <p className="font-semibold text-slate-800 text-sm sm:text-base italic">
                &ldquo;Fokus kami adalah merancang sistem handling yang mengalihkan beban fisik dari tulang belakang operator dan menjaga kestabilan cycle time sepanjang shift kerja.&rdquo;
              </p>
            </div>
          </>
        ) : (
          <>
            <p>
              Founded in 2009 in Bekasi, <strong>PT Dimensi Quantum Wahyudi (DQW)</strong> operates as a member company of <strong>Nabel Sakha Group</strong>. Over the past 17 years, we have grown into a specialized engineering partner for vacuum automation and ergonomic material handling throughout Indonesian industrial corridors.
            </p>
            <p>
              Focusing strictly on precision load handling, we supply certified equipment from <strong>Schmalz Germany</strong> and <strong>Binar Sweden</strong>, paired with on-the-ground engineering support tailored to local plant floor dynamics.
            </p>
            <div className="border-l-4 border-[#005596] pl-4 py-2.5 bg-blue-50/50 rounded-r-xl">
              <p className="font-semibold text-slate-800 text-sm sm:text-base italic">
                &ldquo;Our engineering focus is building handling systems that remove physical loads from operator spines and sustain consistent cycle speeds through entire work shifts.&rdquo;
              </p>
            </div>
          </>
        )}
      </div>

      {/* Standard Metrics Row */}
      <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-4 border-t border-slate-100">
        <div className="group">
          <h4 className="text-3xl sm:text-4xl font-black text-slate-900 group-hover:text-[#005596] transition-colors">
            17+
          </h4>
          <p className="text-slate-500 text-xs sm:text-sm font-semibold tracking-wide mt-1">
            {isId ? 'Tahun Pengalaman (Sejak 2009)' : 'Years of Experience (Since 2009)'}
          </p>
        </div>
        <div className="group">
          <h4 className="text-3xl sm:text-4xl font-black text-slate-900 group-hover:text-[#005596] transition-colors">
            500+
          </h4>
          <p className="text-slate-500 text-xs sm:text-sm font-semibold tracking-wide mt-1">
            {isId ? 'Sistem Terpasang di Indonesia' : 'Systems Installed in Indonesia'}
          </p>
        </div>
        <div className="group">
          <h4 className="text-3xl sm:text-4xl font-black text-slate-900 group-hover:text-[#005596] transition-colors">
            50+
          </h4>
          <p className="text-slate-500 text-xs sm:text-sm font-semibold tracking-wide mt-1">
            {isId ? 'Klien Manufaktur Terverifikasi' : 'Verified Enterprise Clients'}
          </p>
        </div>
      </div>

      {/* Nabel Sakha Group Strategic Membership Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/90 border border-slate-200/90 shadow-2xs mt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative h-8 w-14 shrink-0">
              <Image
                src="/nsg-ico.png"
                alt="Nabel Sakha Group Icon"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-base sm:text-lg font-black tracking-tight text-slate-900">
              Nabel Sakha Group
            </span>
          </div>
          <div className="border-t sm:border-t-0 sm:border-l border-slate-200/90 pt-3 sm:pt-0 sm:pl-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#005596] block">
              {isId ? 'Bagian dari Nabel Sakha Group' : 'A Member of Nabel Sakha Group'}
            </span>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              {isId ? (
                <>
                  Sebagai unit bisnis spesialis ergonomic handling dari <strong>Nabel Sakha Group</strong>, kami beroperasi dengan dukungan rantai pasok langsung dan jangkauan layanan teknis di seluruh Indonesia.
                </>
              ) : (
                <>
                  As the dedicated ergonomic handling business unit of <strong>Nabel Sakha Group</strong>, we operate with direct supply chain backing and nationwide service coverage across Indonesia.
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AboutPhilosophyHeader() {
  const { lang } = useLanguage();
  const isId = lang === 'id';

  return (
    <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
      <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-[#005596]/15 shadow-[0_2px_10px_rgba(0,85,150,0.06)] mb-3">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#005596]">
          {isId ? 'FILOSOFI ENGINEERING' : 'ENGINEERING PHILOSOPHY'}
        </span>
      </div>
      <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
        {isId ? 'Komitmen terhadap Kualitas Engineering & ' : 'Commitment to Engineering Quality & '}
        <span className="bg-gradient-to-r from-[#005596] to-[#1d4ed8] bg-clip-text text-transparent">
          {isId ? 'Keselamatan Operator' : 'Operator Safety'}
        </span>
      </h2>
      <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed max-w-2xl mx-auto">
        {isId
          ? 'Pekerjaan kami berfokus pada pencegahan cedera otot rangka bagi pekerja pabrik sekaligus memastikan kepatuhan terhadap standar keselamatan angkat internasional.'
          : 'Our work focuses on preventing musculoskeletal disorders among factory staff while complying with international lifting safety standards.'}
      </p>
    </div>
  );
}

export function AboutClientsHeader() {
  const { lang } = useLanguage();
  const isId = lang === 'id';

  return (
    <>
      <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-[#005596]/15 shadow-[0_2px_10px_rgba(0,85,150,0.06)] mb-3">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#005596]">
          {isId ? 'KLIEN MANUFAKTUR TERPERCAYA' : 'TRUSTED ENTERPRISE CLIENTS'}
        </span>
      </div>

      <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
        {isId ? 'Dipilih oleh Perusahaan Manufaktur ' : "Selected by Indonesia's Leading "}
        <span className="bg-gradient-to-r from-[#005596] to-[#1d4ed8] bg-clip-text text-transparent">
          {isId ? 'Terkemuka di Indonesia' : 'Manufacturers'}
        </span>
      </h2>

      <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mb-12 sm:mb-16">
        {isId
          ? 'Unit Vacuum Lifter dan manipulator lengan elektrik kami beroperasi setiap hari di berbagai lini produksi otomotif, makanan & minuman, farmasi, hingga kimia.'
          : 'Our vacuum lifters and electric manipulator arms operate daily across automotive, food, pharmaceutical, and chemical production lines.'}
      </p>
    </>
  );
}
