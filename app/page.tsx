import type { Metadata } from 'next';
import HeroScrollStory from '../components/HeroScrollStory';
import VisualApplicationShowcase from '../components/VisualApplicationShowcase';
import StatsSection from '../components/StatsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import BrandShowcase from '../components/BrandShowcase';
import HomeAgrRoiSection from '../components/HomeAgrRoiSection';
import PreFooterCTA from '../components/PreFooterCTA';

export const metadata: Metadata = {
  title: "Industrial Vacuum Lifters Indonesia | Official Partner for Schmalz & Binar",
  description: "PT Dimensi Quantum Wahyudi is the authorized distributor for Schmalz Germany and Binar Handling Sweden in Indonesia. Certified ergonomic vacuum lifters engineered for operator safety and manufacturing throughput.",
  keywords: [
    "Industrial Vacuum Lifter Indonesia",
    "Schmalz Indonesia distributor",
    "Binar Handling Indonesia",
    "Vacuum Tube Lifter",
    "Ergonomic Material Handling Indonesia",
    "JumboFlex Schmalz",
    "VacuMaster Indonesia",
    "Factory Lifting Equipment Cikarang",
    "PT Dimensi Quantum Wahyudi"
  ],
  openGraph: {
    title: "PT Dimensi Quantum Wahyudi | Industrial Vacuum Lifting & Ergonomic Systems",
    description: "Supporting more than 500 manufacturing production lines across Indonesia since 2009 with certified German and Swedish handling systems.",
    url: "https://dimensiwahyudi.com",
    siteName: "PT Dimensi Quantum Wahyudi",
    locale: "en_US",
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-[#005596] selection:text-white">
      
      {/* 1 & 2. HERO & WORKPIECE DOCKING: Continuous Scroll-Driven Storytelling */}
      <HeroScrollStory />

      {/* 3. PERFORMANCE RIBBON & PRESTIGIOUS CLIENT LOGOS */}
      <StatsSection />

      {/* 4. TWO EUROPEAN GIANTS: Unified Schmalz Germany & Binar Handling Sweden Showcase */}
      <BrandShowcase />

      {/* 5. VISUAL APPLICATION SHOWCASE */}
      <VisualApplicationShowcase />

      {/* 6. EXECUTIVE CASE STUDIES */}
      <TestimonialsSection />

      {/* 7. MEDICAL SCIENCE & ECONOMIC PROOF: AGR Seal + Smart ROI Calculator */}
      <HomeAgrRoiSection />

      {/* 8. CLOSING ZERO-RISK ENGINEERING INVITATION */}
      <PreFooterCTA />

    </main>
  );
}
