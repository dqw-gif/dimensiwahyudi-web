import type { Metadata } from 'next';
import Image from 'next/image';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import BenefitsSection from '../components/BenefitsSection';
import BrandShowcase from '../components/BrandShowcase';
import SmartCalculator from '../components/Calculator';
import ProjectMarquee from '../components/ProjectMarquee';
import TestimonialsSection from '../components/TestimonialsSection';
import { projects } from '../data/projects';

export const metadata: Metadata = {
  title: "Vacuum Lifter Indonesia | Solusi Lifting Ergonomis & Safety | PT Dimensi Quantum Wahyudi",
  description: "Solusi material handling terpercaya di Indonesia. Distributor resmi Schmalz & Binar Handling. Tingkatkan produktivitas & keselamatan kerja dengan teknologi vacuum lifter standar Eropa.",
  keywords: ["Vacuum Lifter", "Jual Vacuum Lifter", "Schmalz Indonesia", "Binar Handling Indonesia", "Lifting Equipment", "Alat Angkat Barang", "Ergonomi Industri", "Material Handling Indonesia"],
  openGraph: {
    title: "Vacuum Lifter Indonesia | Solusi Lifting Ergonomis & Safety",
    description: "Solusi material handling terpercaya di Indonesia. Distributor resmi Schmalz & Binar Handling.",
    url: "https://dimensiwahyudi.com",
    siteName: "PT Dimensi Quantum Wahyudi",
    locale: "id_ID",
    type: "website",
  },
};

// --- MAIN PAGE COMPONENT ---
export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500 selection:text-white">


      <HeroSection />
      <StatsSection />
      <BenefitsSection />
      <BrandShowcase />

      {/* 6. CALCULATOR & AGR CERTIFICATION SECTION (SEO OPTIMIZED) */}
      <section className="py-24 bg-white border-t border-slate-100 relative overflow-hidden">

        {/* Background Pattern Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">

          {/* BAGIAN ATAS: AGR CERTIFICATION */}
          <div className="text-center mb-20 space-y-8">
            <div className="inline-block px-4 py-2 bg-blue-100 border border-blue-200 rounded-full">
              <span className="text-blue-700 font-bold text-xs tracking-widest uppercase">
                ⭐ Sertifikasi Medis Internasional
              </span>
            </div>

            {/* SEO: Menggunakan keyword "Vacuum Lifter Ergonomis" dan "Standar Jerman" */}
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mx-auto max-w-3xl">
              Solusi <span className="text-blue-600">Vacuum Lifter Ergonomis</span> dengan Sertifikasi AGR Jerman.
            </h2>

            {/* SEO: Menjelaskan manfaat kesehatan untuk meningkatkan relevansi kata kunci terkait K3 (Keselamatan dan Kesehatan Kerja) */}
            <p className="text-slate-600 text-lg leading-relaxed max-w-3xl mx-auto">
              Sistem handling kami telah teruji secara klinis oleh <strong>Aktion Gesunder Rücken e. V. (AGR)</strong> untuk mendukung kesehatan tulang belakang operator.
              Investasi pada alat lifting yang tepat bukan hanya soal efisiensi, tapi juga perlindungan jangka panjang terhadap aset manusia Anda.
            </p>

            {/* List Keunggulan Medis (Lengkap dengan Icon) */}
            <div className="flex flex-col md:flex-row justify-center gap-8 pt-4">
              <div className="flex items-start gap-3 text-left max-w-xs">
                <div className="bg-emerald-100 p-1 rounded text-emerald-600 mt-1 shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div>
                  <strong className="text-slate-900 block font-bold">Ergonomi Kerja Optimal</strong>
                  <span className="text-sm text-slate-600">Mengurangi risiko cedera tulang belakang (HNP) dan kelelahan fisik operator pabrik.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-left max-w-xs">
                <div className="bg-emerald-100 p-1 rounded text-emerald-600 mt-1 shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div>
                  <strong className="text-slate-900 block font-bold">Standar K3 Internasional</strong>
                  <span className="text-sm text-slate-600">Memenuhi standar kesehatan kerja global untuk industri manufaktur dan logistik.</span>
                </div>
              </div>
            </div>

            {/* Gambar Sertifikat AGR */}
            <div className="pt-10">
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-4">
                Klik untuk unduh Sertifikat Resmi AGR (PDF)
              </p>
              <a
                href="https://media.schmalz.com/MAM_Library/Dokumente/Publikation/Flyer/2a273ef199be_Flyer_AGR-Seal-of-Approval_Schmalz_2022_en-EN.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-block transition-transform hover:scale-105"
              >
                <div className="relative w-full flex justify-center">
                  <Image
                    src="/agr.svg"
                    alt="Sertifikasi AGR Jerman untuk Vacuum Lifter Schmalz"
                    width={200}
                    height={176}
                    className="drop-shadow-md cursor-pointer"
                    unoptimized
                  />
                </div>
              </a>
            </div>
          </div>

          {/* Garis Pembatas */}
          <div className="w-full h-px bg-slate-100 mb-20"></div>

          {/* BAGIAN BAWAH: SMART CALCULATOR */}
          <div className="w-full">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Kalkulator ROI & Efisiensi Ergonomi</h3>
              <p className="text-slate-500 text-sm italic">Analisa potensi penghematan biaya kesehatan dan peningkatan produktivitas tim Anda secara otomatis.</p>
            </div>
            <SmartCalculator />
          </div>

        </div>
      </section>

      <ProjectMarquee projects={projects} />

      <TestimonialsSection />

    </main>
  );
}