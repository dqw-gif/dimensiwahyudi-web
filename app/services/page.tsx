import { Metadata } from 'next';
import Link from 'next/link';
import { ServiceHero, ServiceList } from '../../components/services/ServiceAnimations';
import { spacingTokens } from '../../constants/spacingTokens';

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
    <main className="min-h-screen bg-white text-slate-900 selection:bg-cyan-500 selection:text-white relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesFaqSchema) }} />

      {/* BACKGROUND GRID ACCENT */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

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

      {/* 3. CTA BOX */}
      <section className={`${spacingTokens.section.spacious} relative z-10`}>
        <div className={`${spacingTokens.page.containerMedium} bg-slate-900 rounded-[2.5rem] p-12 md:p-16 text-center border border-slate-800 relative overflow-hidden shadow-2xl`}>
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: `radial-gradient(#fff 0.5px, transparent 0.5px)`, backgroundSize: '24px 24px' }}
          />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              {copy.title}
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto font-medium">
              {copy.desc}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <Link
                href="/contact"
                className="px-10 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 flex items-center justify-center gap-2"
              >
                {copy.btn1}
              </Link>
              <a
                href="https://wa.me/6281119168752"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-full hover:bg-white hover:text-slate-900 transition-all flex items-center justify-center gap-2"
              >
                {copy.btn2}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}