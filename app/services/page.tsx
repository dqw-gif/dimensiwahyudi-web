import { Metadata } from 'next';
import Link from 'next/link';
import { ServiceHero, ServiceList } from '../../components/services/ServiceAnimations';
import { getServerLang } from '../../lib/i18n';

export const metadata: Metadata = {
  title: 'Layanan Teknis | Instalasi, Maintenance & Training | PT Dimensi Quantum Wahyudi',
  description: 'Layanan purna jual profesional PT Dimensi Quantum Wahyudi: instalasi & commissioning, pemeliharaan preventif, sertifikasi operator, suku cadang asli Schmalz & Binar. Respon teknisi 24 jam.',
  keywords: ['layanan teknis', 'instalasi vacuum lifter', 'maintenance lifting equipment', 'sertifikasi operator', 'suku cadang Schmalz', 'after sales service'],
  openGraph: {
    title: 'Layanan Teknis PT Dimensi Quantum Wahyudi | Instalasi, Maintenance & Training',
    description: 'Respon teknis 24 jam. Instalasi, pemeliharaan preventif, training operator, dan suku cadang asli Schmalz & Binar.',
    url: 'https://dimensiwahyudi.com/services',
    siteName: 'PT Dimensi Quantum Wahyudi',
    locale: 'id_ID',
    type: 'website',
  },
  alternates: { canonical: 'https://dimensiwahyudi.com/services' },
};

export default async function ServicesPage() {
  const lang = await getServerLang();
  const copy = lang === 'en'
    ? {
        title: 'Optimize Your Equipment Performance Today',
        desc: 'Protect your plant uptime with support from our specialist team. Schedule a technical visit today.',
        btn1: 'Service Consultation',
        btn2: 'Technical WhatsApp Support',
      }
    : {
        title: 'Optimalkan Performa Alat Anda Sekarang',
        desc: 'Lindungi kelangsungan operasional pabrik Anda dengan bantuan tim ahli kami. Jadwalkan Technical Visit hari ini.',
        btn1: 'Konsultasi Layanan Servis',
        btn2: 'Chat WhatsApp Teknis',
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
      <section className="pt-44 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[120px] -z-10" />
        <ServiceHero />
      </section>

      {/* 2. SERVICE LIST */}
      <section className="py-12 px-6 relative z-10">
        <ServiceList />
      </section>

      {/* 3. CTA BOX */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-[2.5rem] p-12 md:p-16 text-center border border-slate-800 relative overflow-hidden shadow-2xl">
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