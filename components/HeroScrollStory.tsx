'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import HeroCanvasSequence from './HeroCanvasSequence';
import { useLanguage } from './LanguageProvider';

export default function HeroScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const isId = lang === 'id';

  // Continuous Scroll Story tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  // HERO CONTENT (Section 1) Animations - Clean & Grand Entrance
  const heroOpacity = useTransform(smoothProgress, [0, 0.2, 0.36], [1, 1, 0]);
  const heroY = useTransform(smoothProgress, [0, 0.2, 0.36], [0, 0, -20]);
  const heroScale = useTransform(smoothProgress, [0, 0.2, 0.36], [1, 1, 0.97]);
  const heroPointerEvents = useTransform(smoothProgress, (v) => (v < 0.3 ? 'auto' : 'none'));

  // DOCKING & ACTION CONTENT (Section 2) Animations - Official Schmalz Narrative
  const dockingOpacity = useTransform(smoothProgress, [0.32, 0.48, 1], [0, 1, 1]);
  const dockingY = useTransform(smoothProgress, [0.32, 0.48], [20, 0]);
  const dockingScale = useTransform(smoothProgress, [0.32, 0.48], [0.97, 1]);
  const dockingPointerEvents = useTransform(smoothProgress, (v) => (v >= 0.32 ? 'auto' : 'none'));

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[220vh] sm:h-[240vh] bg-slate-900"
    >
      {/* Sticky Fullscreen Frame */}
      <div className="sticky top-0 h-[100dvh] w-full flex items-center overflow-hidden border-b border-slate-200/80 bg-slate-50">
        
        {/* BACKGROUND: CANVAS IMAGE SEQUENCE */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <HeroCanvasSequence progress={smoothProgress} />

          {/* Desktop Gradient Mask */}
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/85 via-45% to-transparent pointer-events-none" />

          {/* Mobile Gradient Mask */}
          <div className="lg:hidden absolute inset-x-0 top-0 h-[360px] bg-gradient-to-b from-slate-50 via-slate-50 via-75% to-transparent pointer-events-none z-1" />

          {/* Top & Bottom Ambient Edge Fades */}
          <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-slate-50 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none" />
        </div>

        {/* Subtle Ambient Refractions behind hero */}
        <div
          className="absolute top-16 right-1/4 w-[520px] h-[520px] bg-[#005596]/10 rounded-full blur-[130px] pointer-events-none z-1"
          aria-hidden="true"
        />
        <div
          className="absolute -top-10 left-1/4 w-[460px] h-[340px] bg-blue-600/8 rounded-full blur-[120px] pointer-events-none z-1"
          aria-hidden="true"
        />

        {/* DESKTOP LAYOUT (lg+) */}
        <div className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative">
            
            {/* Left Side (7 Columns): HERO CONTENT & SECTION 2 CONTENT */}
            <div className="lg:col-span-7 relative min-h-[540px] flex items-center">
              
              {/* LAYER 1: HERO CONTENT */}
              <motion.div
                style={{
                  opacity: heroOpacity,
                  y: heroY,
                  scale: heroScale,
                  pointerEvents: heroPointerEvents as unknown as 'auto' | 'none',
                }}
                className="absolute inset-0 flex flex-col justify-center space-y-7 text-left"
              >
                {/* Technical Partnership Line */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-[#005596]/12 shadow-[0_4px_16px_rgba(0,85,150,0.06),inset_0_1px_0_0_rgba(255,255,255,0.95)] w-fit text-xs font-semibold tracking-wide">
                  <div className="inline-flex items-center gap-1.5">
                    <Image src="/images/flags/germany.svg" alt="Germany" width={16} height={10} className="w-4 h-2.5 rounded-[1px] object-cover border border-slate-300/80 shrink-0" />
                    <span className="text-[#005596] font-bold">Schmalz</span>
                  </div>
                  <span className="text-slate-300">&bull;</span>
                  <div className="inline-flex items-center gap-1.5">
                    <Image src="/images/flags/sweden.svg" alt="Sweden" width={16} height={10} className="w-4 h-2.5 rounded-[1px] object-cover border border-slate-300/80 shrink-0" />
                    <span className="text-[#dc2626] font-bold">Binar Handling</span>
                  </div>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-600 font-medium">
                    {isId ? 'Distributor Resmi di Indonesia' : 'Authorized Distributor in Indonesia'}
                  </span>
                </div>

                {/* H1 Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 tracking-tight leading-[1.08]">
                  {isId ? 'Angkat Beban Berat.' : 'Lifting Heavy Loads.'}<br />
                  <span className="bg-gradient-to-r from-[#005596] to-[#1d4ed8] bg-clip-text text-transparent">
                    {isId ? 'Lindungi Operator Pabrik.' : 'Protecting Factory Workers.'}
                  </span>
                </h1>

                {/* Subline */}
                <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl font-normal">
                  {isId
                    ? 'Sistem Vacuum Handling Schmalz Jerman dan Binar Handling Swedia yang dirancang untuk menghilangkan beban angkat manual dan mempercepat cycle time produksi.'
                    : 'German vacuum handling systems by Schmalz engineered to eliminate operator strain and accelerate factory throughput.'}
                </p>
              </motion.div>

              {/* LAYER 2: SECTION 2 DOCKING & ACTION CONTENT */}
              <motion.div
                style={{
                  opacity: dockingOpacity,
                  y: dockingY,
                  scale: dockingScale,
                  pointerEvents: dockingPointerEvents as unknown as 'auto' | 'none',
                }}
                className="absolute inset-0 flex flex-col justify-center space-y-7 text-left"
              >
                {/* H2 Headline */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
                  {isId ? 'Material Handling Siklus Tinggi' : 'High-Cycle Material Handling'}<br />
                  <span className="bg-gradient-to-r from-[#005596] to-[#1d4ed8] bg-clip-text text-transparent">
                    {isId ? 'Tanpa Risiko Cedera Pinggang.' : 'Without Lower Back Strain.'}
                  </span>
                </h2>

                {/* Product Description */}
                <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-normal">
                  {isId ? (
                    <>
                      Unit <strong className="text-slate-900 font-semibold">Schmalz Jumbo Vacuum Tube Lifter</strong> dirancang untuk pemindahan cepat dan berulang pada kardus, karung, drum, hingga plat lembaran. Dengan kontrol satu jari, operator dapat mengangkat beban hingga 300 kg tanpa menguras tenaga fisik, menekan risiko cedera kerja sekaligus menjaga kestabilan cycle time sepanjang shift.
                    </>
                  ) : (
                    <>
                      The <strong className="text-slate-900 font-semibold">Schmalz Jumbo</strong> vacuum tube lifter is built for rapid, repetitive handling of cartons, bags, drums, and sheets. With single-finger control, operators hover loads up to 300 kg without physical exertion, eliminating workplace injury risks while maintaining consistent takt times across entire shifts.
                    </>
                  )}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-3 sm:items-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#005596] to-[#1d4ed8] hover:from-[#00447a] hover:to-[#1e40af] text-white text-sm sm:text-base font-bold rounded-full shadow-[0_8px_24px_-4px_rgba(29,78,216,0.4),inset_0_1px_0_0_rgba(255,255,255,0.25)] hover:shadow-[0_12px_28px_-4px_rgba(29,78,216,0.5)] transition-all duration-200 text-center w-full sm:w-auto"
                  >
                    <span>{isId ? 'Jadwalkan Trial Workpiece Gratis' : 'Test Your Workpieces (Free Demo)'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/brosur"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/85 backdrop-blur-xl hover:bg-white text-slate-800 hover:text-[#005596] text-sm sm:text-base font-semibold rounded-full border border-white/90 ring-1 ring-[#005596]/15 shadow-[0_4px_16px_rgba(0,85,150,0.06)] transition-all duration-200 text-center w-full sm:w-auto"
                  >
                    <span>{isId ? 'Download Katalog 2026' : 'Download 2026 Catalogs'}</span>
                  </Link>
                </div>

              </motion.div>

            </div>

            {/* Right Side (5 Columns): Visual Area */}
            <div className="lg:col-span-5 h-[520px] sm:h-[580px] lg:h-[640px] relative pointer-events-none" />

          </div>
        </div>

        {/* MOBILE / SMARTPHONE LAYOUT (< lg) */}
        <div className="lg:hidden w-full h-full flex flex-col justify-between pt-20 sm:pt-24 pb-6 px-4 sm:px-5 relative z-10 pointer-events-none">
          
          {/* Top Half: Layered Text Content */}
          <div className="relative min-h-[220px] flex items-start pointer-events-auto">
            
            {/* Mobile Layer 1: Clean Hero */}
            <motion.div
              style={{
                opacity: heroOpacity,
                y: heroY,
                scale: heroScale,
                pointerEvents: heroPointerEvents as unknown as 'auto' | 'none',
              }}
              className="absolute inset-0 flex flex-col justify-start space-y-2.5 text-left"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/85 backdrop-blur-xl border border-white/95 ring-1 ring-[#005596]/12 shadow-xs w-fit text-[11px] font-semibold">
                <span className="text-[#005596] font-bold">Schmalz</span>
                <span className="text-slate-300">&bull;</span>
                <span className="text-[#dc2626] font-bold">Binar Handling</span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-600 font-medium">{isId ? 'Distributor Resmi' : 'Authorized Distributor'}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                {isId ? 'Angkat Beban Berat.' : 'Lifting Heavy Loads.'}<br />
                <span className="bg-gradient-to-r from-[#005596] to-[#1d4ed8] bg-clip-text text-transparent">
                  {isId ? 'Lindungi Operator Pabrik.' : 'Protecting Factory Workers.'}
                </span>
              </h1>

              <p className="text-xs text-slate-600 leading-relaxed font-normal max-w-sm">
                {isId
                  ? 'Sistem Vacuum Handling Jerman untuk menghilangkan kelelahan operator dan mempercepat cycle time pabrik.'
                  : 'German vacuum lifting systems engineered to eliminate operator strain and accelerate factory throughput.'}
              </p>
            </motion.div>

            {/* Mobile Layer 2: Docking & Action */}
            <motion.div
              style={{
                opacity: dockingOpacity,
                y: dockingY,
                scale: dockingScale,
                pointerEvents: dockingPointerEvents as unknown as 'auto' | 'none',
              }}
              className="absolute inset-0 flex flex-col justify-start space-y-2 text-left"
            >
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-snug">
                {isId ? 'Handling Siklus Tinggi,' : 'High-Cycle Handling,'}<br />
                <span className="text-[#005596]">{isId ? 'Bebas Cedera Pinggang.' : 'Without Spinal Strain.'}</span>
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed font-normal line-clamp-2">
                {isId ? (
                  <>
                    Unit <strong className="text-slate-900 font-semibold">Schmalz Jumbo Vacuum Tube Lifter</strong> memudahkan operator mengangkat beban berat hanya dengan kontrol satu jari.
                  </>
                ) : (
                  <>
                    The <strong className="text-slate-900 font-semibold">Schmalz Jumbo</strong> vacuum tube lifter lets operators hover heavy items effortlessly using single-finger controls.
                  </>
                )}
              </p>

              <div className="flex flex-col gap-2 pt-1.5">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-[#005596] to-[#1d4ed8] text-white text-xs font-bold rounded-xl shadow-xs text-center"
                >
                  <span>{isId ? 'Trial Workpiece Gratis' : 'Free Workpiece Trial'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/brosur"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-white/90 backdrop-blur-md text-slate-800 text-xs font-semibold rounded-xl border border-slate-200 text-center"
                >
                  <span>{isId ? 'Download Katalog 2026' : 'Download 2026 Catalogs'}</span>
                </Link>
              </div>
            </motion.div>

          </div>

          <div className="w-full h-8 pointer-events-none" />

        </div>

      </div>
    </div>
  );
}
