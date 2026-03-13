import { Metadata } from 'next';
import Image from 'next/image';
import {
  AboutHero,
  AboutStoryImage,
  AboutCoreValues,
  AboutProcess,
  AboutProcessImage,
  AboutClientLogos,
} from '../../components/about/AboutAnimations';
import { getServerLang } from '../../lib/i18n';

export const metadata: Metadata = {
  title: 'Tentang Kami | PT Dimensi Quantum Wahyudi — Member of Nabel Sakha Group',
  description: 'PT Dimensi Quantum Wahyudi sebagai bagian dari Nabel Sakha Group adalah perusahaan terkemuka Indonesia yang berspesialisasi dalam desain dan distribusi vacuum component and handling system.',
  keywords: ['PT Dimensi Quantum Wahyudi', 'Nabel Sakha Group', 'Vacuum component', 'handling system', 'distributor Schmalz Indonesia', 'distributor Binar Indonesia', 'material handling Indonesia', 'tentang kami'],
  openGraph: {
    title: 'Tentang PT Dimensi Quantum Wahyudi | Mitra Utama Vacuum Handling Indonesia',
    description: 'Bagian dari Nabel Sakha Group, didirikan di Bekasi. Kami adalah pionir penyedia solusi Vacuum Automation dan Ergonomic Handling System terdepan di Indonesia.',
    url: 'https://dimensiwahyudi.com/about',
    siteName: 'PT Dimensi Quantum Wahyudi',
    locale: 'id_ID',
    type: 'website',
  },
  alternates: { canonical: 'https://dimensiwahyudi.com/about' },
};

export default async function AboutPage() {
  const lang = await getServerLang();
  const copy = lang === 'en'
    ? {
        title: 'Pioneering Ergonomics & Vacuum Automation',
        p1: 'Founded in Bekasi, PT Dimensi Quantum Wahyudi, part of the Nabel Sakha Group, is a leading Indonesian company specializing in vacuum components and handling systems.',
        p2: 'With an exclusive focus on vacuum components and handling system distribution, we are committed to delivering world-class products and support.',
        p3: 'As a trusted technical partner, we bridge top-tier European technology with the practical demands of local production floors.',
        projects: 'Project Implementations',
        clients: 'Multinational Clients',
        philosophy: 'Our Philosophy',
        philosophyTitle: 'Building Excellence Together',
        process: 'Work Methodology',
        processTitleA: 'A Standardized',
        processTitleB: 'Execution Flow',
        trusted: 'Trusted By',
        trustedTitle: 'The Preferred Choice of Global Industry Leaders',
      }
    : {
        title: 'Pionir Solusi Ergonomi & Otomasi Vakum',
        p1: 'Didirikan di Bekasi, PT Dimensi Quantum Wahyudi sebagai bagian dari Nabel Sakha Group adalah perusahaan terdepan di Indonesia yang berspesialisasi dalam desain dan distribusi komponen vakum serta sistem handling.',
        p2: 'Dengan fokus eksklusif pada distribusi vacuum components dan handling system, PT Dimensi Quantum Wahyudi terus berkomitmen untuk memberikan pelanggan setia kami produk dan layanan terbaik yang tersedia di pasaran global.',
        p3: 'Sebagai konsultan teknis yang andal, kami menjembatani teknologi Eropa terkemuka dengan kebutuhan lantai produksi lokal yang menuntut presisi dan daya tahan tinggi.',
        projects: 'Implementasi Proyek',
        clients: 'Klien Multinasional',
        philosophy: 'Filosofi Kami',
        philosophyTitle: 'Membangun Keunggulan Bersama',
        process: 'Metodologi Kerja',
        processTitleA: 'Alur Kerja',
        processTitleB: 'Terstandarisasi',
        trusted: 'Dipercaya Oleh',
        trustedTitle: 'Menjadi Pilihan Utama Pemimpin Industri Global',
      };
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-cyan-500 selection:text-white relative">

      {/* BACKGROUND GRID ACCENT */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* 1. HERO SECTION */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <Image
            src="https://i.imgur.com/iSGtXzt.jpeg"
            alt="PT Dimensi Quantum Wahyudi Warehouse Solutions"
            fill
            priority
            className="object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white" />
        </div>
        <AboutHero />
      </section>

      {/* 2. OUR STORY */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <AboutStoryImage />
          <div className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
              {copy.title.split('&')[0].trim()} &{' '}
              <span className="text-cyan-600 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
                {copy.title.split('&')[1]?.trim() || ''}
              </span>
            </h2>
            <div className="space-y-6 text-slate-600 leading-relaxed text-lg text-justify">
              <p>
                {copy.p1}
              </p>
              <p>
                {copy.p2}
              </p>
              <p className="font-medium text-slate-800 border-l-4 border-cyan-500 pl-4">
                {copy.p3}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-12 pt-4">
              <div className="group">
                <h4 className="text-4xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">500+</h4>
                <p className="text-slate-500 text-sm font-medium uppercase tracking-wide mt-1">{copy.projects}</p>
              </div>
              <div className="group">
                <h4 className="text-4xl font-black text-slate-900 group-hover:text-cyan-600 transition-colors">50+</h4>
                <p className="text-slate-500 text-sm font-medium uppercase tracking-wide mt-1">{copy.clients}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUES */}
      <section className="py-24 bg-slate-50 border-y border-slate-200 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-bold tracking-widest text-sm uppercase">{copy.philosophy}</span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-2">{copy.philosophyTitle}</h2>
          </div>
          <AboutCoreValues />
        </div>
      </section>

      {/* 4. TECHNICAL PROCESS */}
      <section className="py-24 px-6 relative z-10 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-cyan-600 font-bold tracking-widest text-sm uppercase">{copy.process}</span>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-2 mb-8">
                {copy.processTitleA} <span className="text-blue-600">{copy.processTitleB}</span>
              </h2>
              <AboutProcess />
            </div>
            <AboutProcessImage />
          </div>
        </div>
      </section>

      {/* 5. CLIENTS SECTION */}
      <section className="py-24 px-6 relative z-10 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-blue-600 font-bold tracking-widest text-xs uppercase">{copy.trusted}</span>
          <h2 className="text-2xl font-bold text-slate-900 mt-2 mb-16">
            {copy.trustedTitle}
          </h2>
          <AboutClientLogos />
          <p className="text-xs text-slate-400 mt-8"></p>
        </div>
      </section>
    </main>
  );
}