'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Hand } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [heroMode, setHeroMode] = useState<'rig' | 'video'>('rig');
  const [isLifted, setIsLifted] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      setIsDesktop(true);
    }
  }, []);

  return (
    <section className="relative w-full bg-gradient-to-b from-slate-50 via-white to-slate-50/50 pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden border-b border-slate-200/70">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute -top-12 left-1/3 w-[400px] h-[300px] bg-[#005596]/5 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Human Story & Precision Engineering (7 Cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            <motion.div 
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-2.5 text-xs font-mono font-bold tracking-wider text-[#005596] uppercase"
            >
              <div className="inline-flex items-center gap-1.5">
                <Image src="/images/flags/germany.svg" alt="Germany" width={16} height={10} className="w-4 h-2.5 rounded-[1px] object-cover border border-slate-300/80 shrink-0" />
                <span>Schmalz Germany</span>
              </div>
              <span className="text-slate-300">&bull;</span>
              <div className="inline-flex items-center gap-1.5">
                <Image src="/images/flags/sweden.svg" alt="Sweden" width={16} height={10} className="w-4 h-2.5 rounded-[1px] object-cover border border-slate-300/80 shrink-0" />
                <span>Binar Sweden</span>
              </div>
              <span className="text-slate-300">|</span>
              <span className="text-slate-500 font-medium normal-case font-sans tracking-normal">Official Distributor in Indonesia</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.14]"
            >
              Lifting 50 kg Feels Weightless.<br />
              <span className="text-[#005596]">Protect Operators. Accelerate Line Throughput.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal"
            >
              The human lumbar spine cannot sustain repetitive heavy lifting. Transferring cartons, sacks, and steel sheets hundreds of times daily leads to chronic disc injuries, absenteeism, and production bottlenecks. Schmalz vacuum handling systems eliminate physical strain by transferring load weight to pneumatic lift tubes, managed effortlessly with intuitive single-finger controls.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-3 pt-2 sm:items-center"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#005596] hover:bg-[#004277] text-white text-sm sm:text-base font-bold rounded-xl shadow-[0_4px_16px_rgba(0,85,150,0.25)] hover:shadow-[0_6px_22px_rgba(0,85,150,0.35)] transition-all duration-200 text-center w-full sm:w-auto"
                >
                  <span>Request On-Site Workpiece Trial</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/brosur"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/80 hover:bg-white text-slate-800 text-sm sm:text-base font-semibold rounded-xl border border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:border-[#005596]/40 transition-all duration-200 text-center backdrop-blur-md w-full sm:w-auto"
                >
                  <span>Download 2026 Catalogs &amp; Brochures</span>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="pt-4 border-t border-slate-200/70 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono text-slate-500"
            >
              <span className="font-semibold text-slate-800">17+ Years Engineering Experience</span>
              <span className="text-slate-300">•</span>
              <span className="font-semibold text-slate-800">German AGR Medical Certification</span>
              <span className="text-slate-300">•</span>
              <span className="font-semibold text-slate-800">Stocked Spare Parts Hub in Cikarang</span>
            </motion.div>
          </motion.div>

          {/* Right Column: Interactive Rig (5 Cols) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/10 via-blue-500/10 to-blue-500/5 rounded-3xl blur-2xl opacity-80 pointer-events-none" />

              <div className="flex items-center justify-end gap-2 mb-3">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">Mode:</span>
                <div className="inline-flex p-0.5 bg-slate-100/90 backdrop-blur-md border border-slate-200/80 rounded-lg text-[10px] font-bold">
                  <button
                    type="button"
                    onClick={() => setHeroMode('rig')}
                    className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      heroMode === 'rig' ? 'bg-white text-[#005596] shadow-xs' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Interactive Rig
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeroMode('video')}
                    className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      heroMode === 'video' ? 'bg-white text-[#005596] shadow-xs' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Plant Video
                  </button>
                </div>
              </div>

              {heroMode === 'rig' ? (
                <div className="relative w-full max-w-sm sm:max-w-md mx-auto aspect-[4/5] flex flex-col items-center justify-between py-2">
                  <div className="w-56 h-3 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded-full shadow-xs border border-slate-300/80 flex items-center justify-center relative z-20">
                    <span className="w-3 h-3 rounded-full bg-slate-400 border border-slate-500/40 shadow-xs" />
                  </div>

                  <div 
                    onClick={() => setIsLifted(!isLifted)}
                    className="relative w-full flex-1 flex flex-col items-center justify-center cursor-pointer select-none group"
                    title="Click to raise / lower payload"
                  >
                    <motion.div
                      animate={{
                        y: isLifted ? [0, -10, 0] : [20, 24, 20],
                        scaleY: isLifted ? [1, 0.98, 1] : [1.06, 1.08, 1.06],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: isLifted ? 3.5 : 2.5,
                        ease: 'easeInOut',
                      }}
                      style={{ transformOrigin: 'top center' }}
                      className="relative w-44 sm:w-52 aspect-[603/795] z-10 drop-shadow-[0_15px_30px_rgba(0,85,150,0.18)]"
                    >
                      <Image
                        src="/hero-lifter-clean.png"
                        alt="Schmalz JumboFlex Vacuum Lifter"
                        fill
                        className="object-contain"
                        priority
                      />
                    </motion.div>

                    <motion.div
                      animate={{
                        y: isLifted ? [0, -10, 0] : [28, 30, 28],
                        rotate: isLifted ? [0, -0.5, 0.5, 0] : [0, 0, 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: isLifted ? 3.5 : 2.5,
                        ease: 'easeInOut',
                      }}
                      className="relative w-52 sm:w-60 aspect-[603/393] -mt-7 sm:-mt-8 z-20 drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
                    >
                      <Image
                        src="/hero-box.png"
                        alt="Workpiece Carton Handled by Schmalz"
                        fill
                        className="object-contain"
                        priority
                      />
                    </motion.div>

                    <div className="w-56 h-2 bg-gradient-to-r from-transparent via-slate-300/80 to-transparent rounded-full mt-2" />
                  </div>

                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full bg-white/90 backdrop-blur-xl border border-white/90 p-3 sm:p-3.5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex items-center justify-between text-slate-800"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#005596]/10 flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-4 h-4 text-[#005596]" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-slate-900 leading-tight">
                          {isLifted ? 'Schmalz JumboFlex 35 (Levitating)' : 'Approaching Workpiece Position'}
                        </div>
                        <div className="text-[10px] text-slate-500 font-medium">
                          {isLifted ? '35 kg payload feels weightless' : 'Suction pad ready for engagement'}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsLifted(!isLifted)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-[#005596] rounded-lg text-[10px] font-bold transition-colors cursor-pointer border border-blue-200/80"
                    >
                      <Hand className="w-3 h-3 animate-bounce" />
                      <span>{isLifted ? 'Lower Load' : 'Lift Load'}</span>
                    </button>
                  </motion.div>

                </div>
              ) : (
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,85,150,0.1)] border border-slate-200/80 bg-slate-900">
                  <picture>
                    <source media="(max-width: 767px)" srcSet="/hero-poster-mobile.webp" />
                    <source media="(min-width: 768px)" srcSet="/hero-poster.webp" />
                    <img
                      src="/hero-poster.webp"
                      alt="Schmalz Vacuum Tube Lifter Plant Operation"
                      className="w-full h-full object-cover"
                      fetchPriority="high"
                    />
                  </picture>

                  {isDesktop && (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      poster="/hero-poster.webp"
                      className="absolute inset-0 w-full h-full object-cover"
                    >
                      <source src="/hero-video.mp4" type="video/mp4" />
                    </video>
                  )}

                  <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-xl border border-white/90 p-3 sm:p-3.5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] flex items-center justify-between text-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#005596]/10 flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-4 h-4 text-[#005596]" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-slate-900 leading-tight">Schmalz JumboFlex 35</div>
                        <div className="text-[10px] text-slate-500 font-medium">German AGR Medical Certification</div>
                      </div>
                    </div>

                    <div className="text-right border-l border-slate-200/80 pl-3">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">Vacuum Response</span>
                      <span className="text-xs font-black text-[#005596] font-mono">0.2 Sec</span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
