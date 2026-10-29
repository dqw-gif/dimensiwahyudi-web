import { Metadata } from 'next';
import Link from 'next/link';
import { ServiceHero, ServiceList } from '../../components/services/ServiceAnimations';
import { spacingTokens } from '../../constants/spacingTokens';
import PreFooterCTA from '../../components/PreFooterCTA';

export const metadata: Metadata = {
  title: 'Technical Services | Installation, Maintenance & Training | PT Dimensi Quantum Wahyudi',
  description: 'Professional after-sales services from PT Dimensi Quantum Wahyudi: installation and commissioning, preventive maintenance, operator training, and genuine Schmalz & Binar parts with responsive technical support.',
  keywords: [
    'technical services indonesia',
    'vacuum lifter installation indonesia',
    'lifting equipment maintenance',
    'operator training industrial handling',
    'Schmalz spare parts indonesia',
    'Binar spare parts indonesia',
    'after-sales service material handling',
  ],
  openGraph: {
    title: 'Technical Services | Installation, Maintenance & Training',
    description: 'Reliable installation, preventive maintenance, operator training, and genuine parts support for industrial lifting systems.',
    url: 'https://dimensiwahyudi.com/services',
    siteName: 'PT Dimensi Quantum Wahyudi',
    locale: 'en_ID',
    type: 'website',
  },
  alternates: { canonical: 'https://dimensiwahyudi.com/services' },
};

export default async function ServicesPage() {
  const copy = {
    title: 'Maximize Equipment Performance with Expert Support',
    desc: 'Protect uptime and extend equipment life with responsive support from our specialist engineering team.',
    btn1: 'Book a Service Consultation',
    btn2: 'Speak with Technical Support',
  };

  const servicesFaqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Do you provide installation and commissioning services in Indonesia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Our technical team supports installation and commissioning projects across Indonesia for Schmalz and Binar handling systems.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you offer preventive maintenance and spare parts support?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. We provide preventive maintenance programs and genuine parts support to maintain reliability, safety, and uptime.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can operators receive on-site training?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. We provide practical operator training focused on safe handling procedures, ergonomic practices, and efficient day-to-day operation.',
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-[#005596] selection:text-white relative overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesFaqSchema) }} />

      {/* BACKGROUND GRID ACCENT */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      
      {/* ─── AMBIENT BLUE GLOW ACCENTS (Fully Contained) ─── */}
      <div className="absolute top-20 left-1/4 w-[600px] h-[380px] bg-[#005596]/5 rounded-full blur-[150px] pointer-events-none -z-0" aria-hidden="true" />
      <div className="absolute top-[800px] right-1/4 w-[500px] h-[340px] bg-[#005596]/4 rounded-full blur-[140px] pointer-events-none -z-0" aria-hidden="true" />

      {/* 1. HERO SECTION */}
      <section className={`${spacingTokens.hero.tall} relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[120px] -z-10" />
        <div className={spacingTokens.page.container}>
          <ServiceHero />
        </div>
      </section>

      {/* 2. SERVICE LIST */}
      <section className={`${spacingTokens.section.compact} relative z-10`}>
        <div className={spacingTokens.page.container}>
          <ServiceList />
        </div>
      </section>

      {/* 3. PRE-FOOTER CTA */}
      <PreFooterCTA />
    </main>
  );
}