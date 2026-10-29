'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { animate, motion, useInView } from 'framer-motion';
import { useLanguage } from './LanguageProvider';

interface MetricItem {
  target: number;
  decimals: number;
  suffix: string;
  unit: string;
  unitId: string;
  title: string;
  titleId: string;
  desc: string;
  descId: string;
}

const performanceMetrics: MetricItem[] = [
  {
    target: 17,
    decimals: 0,
    suffix: '+',
    unit: 'Years',
    unitId: 'Tahun',
    title: 'Industrial Engineering Record',
    titleId: 'Rekam Jejak Engineering Industri',
    desc: 'Official partner of Schmalz and Binar Handling in Indonesia since 2009.',
    descId: 'Partner resmi Schmalz Jerman dan Binar Handling Swedia di Indonesia sejak 2009.',
  },
  {
    target: 500,
    decimals: 0,
    suffix: '+',
    unit: 'Lines',
    unitId: 'Lini',
    title: 'Active Plant Installations',
    titleId: 'Instalasi Aktif di Pabrik',
    desc: 'Operating across automotive, tire, chemical, cement, and logistics plants.',
    descId: 'Beroperasi di pabrik otomotif, ban, kimia, semen, farmasi, hingga gudang logistik.',
  },
  {
    target: 300,
    decimals: 0,
    suffix: '',
    unit: 'KG',
    unitId: 'KG',
    title: 'Maximum Lift Capacity',
    titleId: 'Kapasitas Payload Maksimal',
    desc: 'Single-operator handling for heavy loads with zero spinal exertion.',
    descId: 'Pemindahan beban berat oleh satu operator tanpa risiko cedera tulang belakang.',
  },
  {
    target: 0.2,
    decimals: 1,
    suffix: '',
    unit: 'Sec',
    unitId: 'Detik',
    title: 'Vacuum Grip Response',
    titleId: 'Respon Cengkeram Vakum',
    desc: 'High-flow ejectors for rapid cycle times without line delays.',
    descId: 'Aliran vakum instan untuk menjaga cycle time tinggi tanpa hambatan lini.',
  },
];

const clients = [
  { src: '/logos/client(5).svg', alt: 'Toyota Astra Motor' },
  { src: '/logos/client(2).svg', alt: 'Daihatsu Motor' },
  { src: '/logos/pirelli.svg', alt: 'PT Evoluzione Tyres (Pirelli Group)' },
  { src: '/logos/client(1).svg', alt: 'PT Gajah Tunggal, Tbk' },
  { src: '/logos/client(8).svg', alt: 'Suzuki Motor' },
  { src: '/logos/client(7).svg', alt: 'Hankook Tire' },
  { src: '/logos/client(6).svg', alt: 'Jotun Paints' },
  { src: '/logos/client(4).svg', alt: 'Yuasa Battery' },
  { src: '/logos/client(3).svg', alt: 'Mattel Indonesia' },
];

function AnimatedCounter({
  target,
  decimals,
  suffix,
  inView,
  delay = 0,
}: {
  target: number;
  decimals: number;
  suffix: string;
  inView: boolean;
  delay?: number;
}) {
  const [displayValue, setDisplayValue] = useState<string>(
    decimals > 0 ? (0).toFixed(decimals) : '0'
  );

  useEffect(() => {
    if (!inView) return;

    const controls = animate(0, target, {
      duration: 1.75,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplayValue(latest.toFixed(decimals));
      },
    });

    return () => controls.stop();
  }, [inView, target, decimals, delay]);

  return (
    <>
      {displayValue}
      {suffix}
    </>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.35 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { lang } = useLanguage();
  const isId = lang === 'id';

  const marqueeClients = [...clients, ...clients];

  return (
    <section
      ref={sectionRef}
      className="w-full bg-gradient-to-b from-slate-50/80 via-white to-slate-50/60 border-b border-slate-200/80 py-16 lg:py-20 relative overflow-hidden"
    >
      {/* Subtle Royal Blue Light Refraction */}
      <div
        className="absolute -top-24 left-1/4 w-96 h-64 bg-[#005596]/8 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-64 bg-blue-600/6 rounded-full blur-[110px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 1. Technical Performance Metric Glass Console */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          onMouseLeave={() => setHoveredIndex(null)}
          className="rounded-3xl bg-white/75 backdrop-blur-2xl backdrop-saturate-150 border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_48px_-12px_rgba(0,85,150,0.10),inset_0_1px_0_0_rgba(255,255,255,0.95)] p-3 sm:p-6 lg:p-8"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
            {performanceMetrics.map((item, idx) => {
              const isHovered = hoveredIndex === idx;

              return (
                <div
                  key={item.title}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  className="relative rounded-xl sm:rounded-2xl p-3 sm:p-5 bg-white/50 sm:bg-transparent border border-white/80 sm:border-transparent shadow-[0_2px_10px_rgba(0,85,150,0.03)] sm:shadow-none transition-colors cursor-default"
                >
                  {/* Interactive Glass Spotlight Pill that follows the cursor */}
                  {isHovered && (
                    <motion.div
                      layoutId="stats-glass-spotlight"
                      transition={{
                        type: 'spring',
                        stiffness: 240,
                        damping: 26,
                        mass: 0.8,
                      }}
                      className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/95 via-white/90 to-blue-50/70 border border-white ring-1 ring-[#005596]/25 shadow-[0_12px_30px_-8px_rgba(0,85,150,0.14),inset_0_1px_0_0_rgba(255,255,255,1)] z-0"
                    />
                  )}

                  <div className="relative z-10 flex items-stretch gap-2.5 sm:gap-4">
                    {/* Vertical Telemetry Bar with Progressive Royal Blue Fill */}
                    <div className="w-0.5 rounded-full bg-[#005596]/15 overflow-hidden shrink-0 my-0.5">
                      <motion.div
                        initial={{ height: '0%' }}
                        animate={
                          isInView
                            ? { height: '100%' }
                            : { height: '0%' }
                        }
                        transition={{
                          duration: 1.4,
                          delay: idx * 0.12,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className={`w-full rounded-full transition-colors duration-300 ${
                          isHovered
                            ? 'bg-gradient-to-b from-[#005596] to-[#1d4ed8] shadow-[0_0_10px_rgba(0,85,150,0.6)]'
                            : 'bg-[#005596]/50'
                        }`}
                      />
                    </div>

                    {/* Metric Content */}
                    <div className="space-y-1 sm:space-y-1.5 text-left min-w-0">
                      <div className="flex items-baseline gap-1 sm:gap-1.5 flex-wrap">
                        <span
                          className={`text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight font-mono tabular-nums transition-colors duration-300 ${
                            isHovered ? 'text-[#005596]' : 'text-slate-900'
                          }`}
                        >
                          <AnimatedCounter
                            target={item.target}
                            decimals={item.decimals}
                            suffix={item.suffix}
                            inView={isInView}
                            delay={idx * 0.1}
                          />
                        </span>
                        <span className="text-[10px] sm:text-sm font-bold text-[#005596] font-mono uppercase tracking-wider">
                          {isId ? item.unitId : item.unit}
                        </span>
                      </div>
                      <div className="text-[11px] sm:text-sm font-bold text-slate-900 leading-tight">
                        {isId ? item.titleId : item.title}
                      </div>
                      <div className="text-[10px] sm:text-xs text-slate-500 leading-snug sm:leading-relaxed max-w-xs line-clamp-2 sm:line-clamp-none">
                        {isId ? item.descId : item.desc}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* 2. Prestigious Client Logo Infinite Clean Floating Marquee (No Cards) */}
        <div className="pt-10 sm:pt-14 text-center">
          <p className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-slate-400 mb-6 sm:mb-8">
            {isId
              ? 'DIPERCAYA OLEH PERUSAHAAN MANUFAKTUR TERKEMUKA DI INDONESIA'
              : "TRUSTED BY INDONESIA'S LEADING INDUSTRIAL MANUFACTURERS"}
          </p>

          {/* Edge-faded Infinite Smooth Ticker without rigid cards */}
          <div className="relative w-full overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex w-max items-center gap-8 sm:gap-12 lg:gap-14 animate-stats-marquee hover:[animation-play-state:paused]">
              {marqueeClients.map((client, idx) => (
                <div
                  key={`${client.alt}-${idx}`}
                  className="shrink-0 flex items-center justify-center group/logo px-2"
                  title={client.alt}
                >
                  <div className="relative w-28 sm:w-36 h-8 sm:h-10 grayscale opacity-60 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 group-hover/logo:scale-105 transition-all duration-300">
                    <Image
                      src={client.src}
                      alt={client.alt}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes statsMarquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .animate-stats-marquee {
          animation: statsMarquee 32s linear infinite;
        }
      `}</style>
    </section>
  );
}