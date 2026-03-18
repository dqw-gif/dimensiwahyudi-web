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
import { spacingTokens } from '../../constants/spacingTokens';

export const metadata: Metadata = {
  title: 'About Us | PT Dimensi Quantum Wahyudi — Engineering Excellence Since 2009',
  description: 'Established in 2009, PT Dimensi Quantum Wahyudi is a trusted partner for vacuum lifting and ergonomic handling solutions in Indonesia, and a proud member of Nabel Sakha Group.',
  keywords: [
    'PT Dimensi Quantum Wahyudi',
    'Nabel Sakha Group',
    'vacuum lifting indonesia',
    'ergonomic handling system indonesia',
    'Schmalz distributor Indonesia',
    'Binar distributor Indonesia',
    'material handling Indonesia',
    'about PT Dimensi',
  ],
  openGraph: {
    title: 'About PT Dimensi Quantum Wahyudi | Trusted Vacuum Handling Partner in Indonesia',
    description: 'Part of Nabel Sakha Group and established in 2009, PT Dimensi Quantum Wahyudi supports Indonesian industry with premium vacuum automation and ergonomic handling systems.',
    url: 'https://dimensiwahyudi.com/about',
    siteName: 'PT Dimensi Quantum Wahyudi',
    locale: 'en_ID',
    type: 'website',
  },
  alternates: { canonical: 'https://dimensiwahyudi.com/about' },
};

export default async function AboutPage() {
  await getServerLang();
  const copy = {
    title: 'Pioneering Ergonomics & Vacuum Automation',
    p1: 'Established in 2009 in Bekasi, PT Dimensi Quantum Wahyudi, part of the Nabel Sakha Group, has grown into a trusted partner for vacuum components and industrial handling systems across Indonesia.',
    p2: 'With a dedicated focus on vacuum handling technologies, we deliver globally proven products backed by practical engineering support for local production realities.',
    p3: 'As a trusted technical partner, we connect world-class European innovation with measurable results on Indonesian factory floors.',
    projects: 'Project Portfolio',
    clients: 'Multinational Clients',
    philosophy: 'Our Philosophy',
    philosophyTitle: 'Building Excellence Together',
    process: 'Operational Methodology',
    processTitleA: 'A Standardized',
    processTitleB: 'Execution Framework',
    trusted: 'Trusted by',
    trustedTitle: 'The Preferred Choice of Global Industry Leaders',
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
      <section className={`relative h-[60vh] flex items-center justify-center overflow-hidden ${spacingTokens.hero.standard}`}>
        <div className="absolute inset-0">
          <Image
            src="https://i.imgur.com/RMjGMRg.jpeg"
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
      <section className={`${spacingTokens.section.spacious} relative z-10`}>
        <div className={`${spacingTokens.page.container} grid lg:grid-cols-2 gap-16 items-center`}>
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
      <section className={`${spacingTokens.section.spacious} bg-slate-50 border-y border-slate-200 relative z-10`}>
        <div className={spacingTokens.page.container}>
          <div className="text-center mb-16">
            <span className="text-blue-600 font-bold tracking-widest text-sm uppercase">{copy.philosophy}</span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-2">{copy.philosophyTitle}</h2>
          </div>
          <AboutCoreValues />
        </div>
      </section>

      {/* 4. TECHNICAL PROCESS */}
      <section className={`${spacingTokens.section.spacious} relative z-10 overflow-hidden bg-white`}>
        <div className={spacingTokens.page.container}>
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
      <section className={`${spacingTokens.section.spacious} relative z-10 bg-slate-50 border-t border-slate-200`}>
        <div className={`${spacingTokens.page.container} text-center`}>
          <span className="text-blue-600 font-bold tracking-widest text-xs uppercase">{copy.trusted}</span>
          <h2 className="text-2xl font-bold text-slate-900 mt-2 mb-16">
            {copy.trustedTitle}
          </h2>
          <AboutClientLogos />
        </div>
      </section>
    </main>
  );
}