import { Metadata } from 'next';
import Image from 'next/image';
import {
  AboutHero,
  AboutStoryImage,
  AboutStoryContent,
  AboutPhilosophyHeader,
  AboutCoreValues,
  AboutClientsHeader,
  AboutClientLogos,
} from '../../components/about/AboutAnimations';
import { spacingTokens } from '../../constants/spacingTokens';
import PreFooterCTA from '../../components/PreFooterCTA';

export const metadata: Metadata = {
  title: 'About Us | PT Dimensi Quantum Wahyudi, Ergonomic Handling Since 2009',
  description:
    'Established in 2009 and a member of Nabel Sakha Group, PT Dimensi Quantum Wahyudi is the authorized distributor for Schmalz Germany and Binar Sweden in Indonesia.',
  keywords: [
    'PT Dimensi Quantum Wahyudi',
    'Nabel Sakha Group',
    'Schmalz Indonesia distributor',
    'Binar Handling Indonesia',
    'industrial vacuum lifter Indonesia',
    'ergonomic handling systems Indonesia',
    'factory automation equipment Indonesia',
    'material handling engineering Indonesia',
  ],
  openGraph: {
    title: 'About PT Dimensi Quantum Wahyudi | Official Ergonomic Handling Partner',
    description:
      'Founded in 2009, we deliver certified vacuum lifting equipment from Schmalz Germany and electric manipulator arms from Binar Sweden to manufacturing plants across Indonesia.',
    url: 'https://dimensiwahyudi.com/about',
    siteName: 'PT Dimensi Quantum Wahyudi',
    locale: 'en_US',
    type: 'website',
  },
  alternates: { canonical: 'https://dimensiwahyudi.com/about' },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-[#005596] selection:text-white relative overflow-hidden">
      {/* Ambient Blue Glow Accents */}
      <div
        className="absolute top-20 left-1/4 w-[600px] h-[380px] bg-[#005596]/5 rounded-full blur-[150px] pointer-events-none -z-0"
        aria-hidden="true"
      />
      <div
        className="absolute top-[800px] right-1/4 w-[500px] h-[340px] bg-[#005596]/4 rounded-full blur-[140px] pointer-events-none -z-0"
        aria-hidden="true"
      />
      <div
        className="absolute top-[1600px] left-1/3 w-[550px] h-[360px] bg-[#005596]/5 rounded-full blur-[150px] pointer-events-none -z-0"
        aria-hidden="true"
      />

      {/* Background Technical Grid Accent */}
      <div
        className="absolute inset-0 z-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#005596 1px, transparent 1px), linear-gradient(90deg, #005596 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* 1. HERO SECTION */}
      <section className={`relative min-h-[55vh] flex items-center justify-center overflow-hidden ${spacingTokens.hero.standard} border-b border-slate-100`}>
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/warehouse-bg.webp"
            alt="Intralogistics Engineering Facility of PT Dimensi Quantum Wahyudi"
            fill
            priority
            className="object-cover opacity-[0.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white" />
        </div>

        <AboutHero />
      </section>

      {/* 2. TRACK RECORD & CREDENTIALS (OUR STORY) */}
      <section className={`${spacingTokens.section.spacious} relative z-10`}>
        <div className={`${spacingTokens.page.container} grid lg:grid-cols-2 gap-12 lg:gap-16 items-center`}>
          <AboutStoryImage />
          <AboutStoryContent />
        </div>
      </section>

      {/* 3. CORE VALUES & PHILOSOPHY (VISION & MISSION) */}
      <section className={`${spacingTokens.section.spacious} bg-slate-50/70 border-y border-slate-200/80 relative z-10`}>
        <div className={spacingTokens.page.container}>
          <AboutPhilosophyHeader />
          <AboutCoreValues />
        </div>
      </section>

      {/* 4. MULTINATIONAL CLIENTS SHOWCASE */}
      <section className={`${spacingTokens.section.spacious} relative z-10 bg-white`}>
        <div className={`${spacingTokens.page.container} text-center`}>
          <AboutClientsHeader />
          <AboutClientLogos />
        </div>
      </section>

      {/* 5. PRE-FOOTER CTA SECTION */}
      <PreFooterCTA />
    </main>
  );
}
