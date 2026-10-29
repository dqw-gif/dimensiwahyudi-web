'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

interface ProductSlide {
  id: string;
  name: string;
  capacity: string;
  capacityId: string;
  desc: string;
  descId: string;
  href: string;
  image: string;
  imageAlt: string;
}

const SCHMALZ_PRODUCTS: ProductSlide[] = [
  {
    id: 'jumboflex',
    name: 'JumboFlex',
    capacity: 'Loads up to 50 kg',
    capacityId: 'Payload hingga 50 kg',
    desc: 'Single-hand pistol grip for rapid carton and parcel handling.',
    descId: 'Kontrol satu tangan untuk pemindahan kardus dan paket kecepatan tinggi.',
    href: '/products/schmalz/vacuum-tube-lifter',
    image: '/brands/schmalz-jumboflex.webp',
    imageAlt: 'Schmalz Vacuum Tube Lifter JumboFlex',
  },
  {
    id: 'jumbosprint',
    name: 'JumboSprint',
    capacity: 'Loads up to 300 kg',
    capacityId: 'Payload hingga 300 kg',
    desc: 'Loop handle with twist-valve control for sacks, bags, and compact workpieces.',
    descId: 'Gagang melingkar dengan kontrol katup putar untuk karung, kantong bahan baku, dan workpiece kompak.',
    href: '/products/schmalz/vacuum-tube-lifter',
    image: '/brands/schmalz-jumbosprint.webp',
    imageAlt: 'Schmalz Vacuum Tube Lifter JumboSprint',
  },
  {
    id: 'jumboergo',
    name: 'JumboErgo',
    capacity: 'Loads up to 300 kg',
    capacityId: 'Payload hingga 300 kg',
    desc: 'Twist-grip handle for wooden boards, metal sheets, and steel drums.',
    descId: 'Gagang putar ergonomis untuk papan kayu, plat besi, dan drum baja.',
    href: '/products/schmalz/vacuum-tube-lifter',
    image: '/brands/schmalz-jumboergo.webp',
    imageAlt: 'Schmalz Vacuum Tube Lifter JumboErgo',
  },
  {
    id: 'vacumaster',
    name: 'VacuMaster',
    capacity: 'Loads up to 2,000 kg',
    capacityId: 'Payload hingga 2.000 kg',
    desc: 'Heavy duty vacuum lifter for sheet metal, glass plates, and crane integration.',
    descId: 'Heavy-duty vacuum lifter untuk plat logam, lembaran kaca, dan integrasi crane pabrik.',
    href: '/products/schmalz/vacumaster',
    image: '/brands/schmalz-vacumaster.webp',
    imageAlt: 'Schmalz Heavy Vacuum Lifter VacuMaster',
  },
  {
    id: 'vacuum-gripper',
    name: 'Vacuum Gripper',
    capacity: 'Robotic Automation',
    capacityId: 'Otomasi Robotik',
    desc: 'Intelligent vacuum end-effectors for industrial robots and multi-product lines.',
    descId: 'End-effector vakum presisi untuk lengan robot industri dan lini palletizing otomatis.',
    href: '/products/schmalz',
    image: '/brands/schmalz-vacuum-gripper.webp',
    imageAlt: 'Schmalz Industrial Vacuum Area Gripper',
  },
  {
    id: 'suction-cups',
    name: 'Suction Cups',
    capacity: 'Precision Components',
    capacityId: 'Komponen Vakum Presisi',
    desc: 'Modular suction cups for porous, oily, curved, and rough sheet surfaces.',
    descId: 'Suction cup modular untuk permukaan berpori, berminyak, melengkung, hingga plat bertekstur.',
    href: '/products/schmalz/vacuum-suction-cups',
    image: '/brands/schmalz-suction-cups.webp',
    imageAlt: 'Schmalz Industrial Vacuum Suction Cup Collection',
  },
];

const BINAR_PRODUCTS: ProductSlide[] = [
  {
    id: 'qla-arm',
    name: 'Manipulator Arm',
    capacity: 'Payload 50 to 300 kg',
    capacityId: 'Payload 50 hingga 300 kg',
    desc: 'Articulated servo arm QLA for high-precision factory assembly.',
    descId: 'Lengan servo artikulasi QLA untuk perakitan komponen pabrik berpresisi tinggi.',
    href: '/products/binar/qla-50i-om',
    image: '/brands/binar-manipulator-arm.webp',
    imageAlt: 'Binar Handling Quick-Lift Arm QLA 300',
  },
  {
    id: 'qla-rail',
    name: 'Lift Rail System',
    capacity: 'Overhead Rail',
    capacityId: 'Sistem Overhead Rail',
    desc: 'Servo-driven QLR lifting unit for continuous overhead production tracks.',
    descId: 'Unit angkat servo QLR untuk jalur overhead crane di lini produksi berkelanjutan.',
    href: '/products/binar/qld-300i',
    image: '/brands/binar-lift-rail.webp',
    imageAlt: 'Binar Handling Quick-Lift Rail System QLR 501',
  },
  {
    id: 'binar-neo',
    name: 'Binar NEO 30',
    capacity: 'Battery • up to 30 kg',
    capacityId: 'Baterai • hingga 30 kg',
    desc: 'Ready-to-use portable lithium battery lifter for mobile workstations.',
    descId: 'Unit pengangkat portabel bertenaga baterai lithium untuk area kerja fleksibel.',
    href: '/products/binar',
    image: '/brands/binar-neo.webp',
    imageAlt: 'Binar Handling NEO 30 Battery Lifter',
  },
  {
    id: 'control-handle',
    name: 'Control Handle',
    capacity: 'Stepless Sensor',
    capacityId: 'Sensor Tekanan Tangan',
    desc: 'Patented control handle responding directly to operator hand pressure.',
    descId: 'Gagang kendali berpaten yang merespon langsung gerakan tangan operator tanpa jeda.',
    href: '/products/binar',
    image: '/brands/binar-control-handle.webp',
    imageAlt: 'Binar Handling Patented Control Handle',
  },
  {
    id: 'end-effector',
    name: 'End-Effector',
    capacity: 'Payload up to 275 kg',
    capacityId: 'Payload hingga 275 kg',
    desc: 'Custom mechanical and magnetic grippers engineered for steel parts.',
    descId: 'Mechanical & magnetic gripper khusus untuk penanganan komponen baja dan mesin.',
    href: '/products/binar/magnetic-gripper-110',
    image: '/brands/binar-end-effector.webp',
    imageAlt: 'Binar Handling Magnetic End-Effector',
  },
  {
    id: 'ergo-glass',
    name: 'Ergo Glass',
    capacity: 'Vacuum Tilt & Rotate',
    capacityId: 'Vacuum Tilt & Rotate',
    desc: 'Pneumatic tilt-and-rotate gripper for architectural glass and solar panels.',
    descId: 'Gripper vakum dengan fitur miring dan putar untuk lembaran kaca dan panel surya.',
    href: '/products/binar/vacuum-tilt-gripper',
    image: '/brands/binar-ergo-glass.webp',
    imageAlt: 'Binar Handling Ergo Glass Lifter',
  },
];

function CleanFloatingCarousel({
  slides,
  activeIndex,
  onSelect,
  accent = 'blue',
}: {
  slides: ProductSlide[];
  activeIndex: number;
  onSelect: (idx: number) => void;
  accent?: 'blue' | 'red';
}) {
  const isRed = accent === 'red';

  return (
    <div className="w-full max-w-full h-[300px] sm:h-[380px] lg:h-[480px] relative flex items-center justify-center select-none">
      {/* Subtle Ambient Glow behind floating product */}
      <div
        className={`w-64 h-64 sm:w-80 sm:h-80 rounded-full blur-3xl pointer-events-none transition-colors duration-500 ${
          isRed
            ? 'bg-gradient-to-tr from-red-600/10 via-rose-500/8 to-amber-500/8'
            : 'bg-gradient-to-tr from-[#005596]/10 via-blue-500/8 to-sky-400/8'
        }`}
        aria-hidden="true"
      />

      {/* Mobile Touch Quick Navigation Chevron Buttons */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onSelect((activeIndex - 1 + slides.length) % slides.length);
        }}
        aria-label="Previous product"
        className="lg:hidden absolute left-2 z-40 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-md border border-slate-200/80 flex items-center justify-center text-slate-700 active:scale-95 transition-all"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onSelect((activeIndex + 1) % slides.length);
        }}
        aria-label="Next product"
        className="lg:hidden absolute right-2 z-40 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-md border border-slate-200/80 flex items-center justify-center text-slate-700 active:scale-95 transition-all"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Pure Product-Only Smooth 3D Carousel with Touch Drag Support */}
      <div className="absolute inset-0 flex items-center justify-center [perspective:1400px]">
        {slides.map((slide, idx) => {
          const offset = idx - activeIndex;
          const absOffset = Math.abs(offset);
          const isActive = idx === activeIndex;

          // Smooth 3D carousel depth positioning
          const xPercent = offset * 34;
          const scale = isActive ? 1 : Math.max(0.62, 0.74 - (absOffset - 1) * 0.12);
          const rotateY = offset * -14;
          const opacity = isActive ? 1 : absOffset === 1 ? 0.22 : 0;
          const blurPx = isActive ? 0 : absOffset === 1 ? 5 : 10;
          const zIndex = isActive ? 30 : 20 - absOffset * 5;

          return (
            <motion.div
              key={slide.id}
              onClick={() => {
                if (!isActive) onSelect(idx);
              }}
              drag={isActive ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_e, info) => {
                if (info.offset.x < -35 || info.velocity.x < -250) {
                  onSelect((activeIndex + 1) % slides.length);
                } else if (info.offset.x > 35 || info.velocity.x > 250) {
                  onSelect((activeIndex - 1 + slides.length) % slides.length);
                }
              }}
              animate={{
                x: `${xPercent}%`,
                scale,
                rotateY,
                opacity,
                filter: `blur(${blurPx}px)`,
              }}
              transition={{
                type: 'spring',
                stiffness: 105,
                damping: 22,
                mass: 0.95,
              }}
              style={{
                zIndex,
                pointerEvents: isActive || absOffset === 1 ? 'auto' : 'none',
              }}
              className={`absolute inset-x-4 sm:inset-x-8 top-2 sm:top-4 bottom-8 sm:bottom-10 lg:bottom-12 flex items-center justify-center ${
                isActive ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'
              }`}
            >
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                <div className="relative w-full h-[88%]">
                  <Image
                    src={slide.image}
                    alt={slide.imageAlt}
                    fill
                    className="object-contain pointer-events-none"
                    sizes="(max-width: 1024px) 90vw, 42vw"
                    priority={idx === 0}
                  />
                </div>
                {/* Natural Ground Contact Shadow directly under the product */}
                <div
                  className={`w-[68%] max-w-[320px] h-3.5 -mt-1 rounded-[100%] blur-[6px] pointer-events-none transition-all duration-300 ${
                    isRed ? 'bg-red-950/25' : 'bg-slate-900/22'
                  }`}
                  aria-hidden="true"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function BrandShowcase() {
  const router = useRouter();
  const [activeSchmalz, setActiveSchmalz] = useState(0);
  const [activeBinar, setActiveBinar] = useState(0);
  const { lang } = useLanguage();
  const isId = lang === 'id';

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-white via-slate-50/50 to-white border-b border-slate-200/80 relative overflow-hidden">
      {/* Ambient Royal Blue Light Refractions */}
      <div
        className="absolute top-1/4 right-10 w-[440px] h-[440px] bg-[#005596]/8 rounded-full blur-[130px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 left-10 w-[440px] h-[440px] bg-blue-600/8 rounded-full blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: Center Editorial Intro */}
        <div className="max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-24 text-center">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-[#005596]/15 shadow-[0_2px_12px_rgba(0,85,150,0.06)] mb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#005596]">
              {isId ? 'Aliansi Teknologi Engineering Eropa' : 'Official European Engineering Alliance'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {isId ? 'Kemitraan Teknologi Langsung ' : 'Direct Technology Partnerships '}<br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#005596] to-[#1d4ed8] bg-clip-text text-transparent">
              {isId ? 'Dari Jerman dan Swedia' : 'From Germany and Sweden'}
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
            {isId
              ? 'PT Dimensi Quantum Wahyudi adalah distributor tunggal bersertifikat di Indonesia untuk Schmalz (Jerman) dan Binar Handling (Swedia).'
              : 'PT Dimensi Quantum Wahyudi is the certified sole distributor in Indonesia for Schmalz (Germany) and Binar Handling (Sweden).'}
          </p>
        </div>

        <div className="space-y-16 lg:space-y-24">
          {/* SHOWCASE 1: SCHMALZ GERMANY */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Story & Interactive Product Cards Left (Desktop) / Flow (Mobile) */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left min-w-0 max-w-full">
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
                <div className="space-y-0.5">
                  <span className="text-xs font-mono font-medium text-[#005596] uppercase tracking-wider block">
                    {isId ? 'Glatten, Jerman • Sejak 1910' : 'Glatten, Germany • Since 1910'}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    SCHMALZ GERMANY
                  </h3>
                </div>

                {/* Enlarged Logo with Hyperlink to Official Website */}
                <a
                  href="https://www.schmalz.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 sm:h-12 w-36 sm:w-44 relative shrink-0 block transition-transform duration-300 hover:scale-105"
                  title="Visit Schmalz Germany Official Website (schmalz.com)"
                >
                  <Image
                    src="/brands/schmalz.webp"
                    alt="Schmalz Germany Official Website"
                    fill
                    className="object-contain object-right"
                    unoptimized
                  />
                </a>
              </div>

              <div className="space-y-2">
                <h4 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  {isId
                    ? 'Sistem Vacuum Handling Industri dan Crane Ergonomis'
                    : 'Industrial Vacuum Handling and Ergonomic Crane Systems'}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {isId
                    ? 'Teknologi Vacuum Lifting Jerman dengan sertifikasi medis resmi Aktion Gesunder Rücken (AGR). Menghilangkan beban angkat manual dengan mengalihkan berat workpiece ke tabung vakum pneumatik, melindungi kesehatan tulang belakang operator pada shift produksi frekuensi tinggi.'
                    : 'German vacuum lifting technology with official Aktion Gesunder Rücken (AGR) medical certification. Eliminates physical lifting strain by transferring load weight to pneumatic lift tubes, protecting spinal health across high-frequency manufacturing shifts.'}
                </p>
              </div>

              {/* MOBILE ONLY: Unified Synchronized Swiper (No Scrollbar, Pure Swipe + Dots) */}
              <div className="block lg:hidden space-y-3">
                {/* 1. 3D Floating Product Visual (Swipable) */}
                <CleanFloatingCarousel
                  slides={SCHMALZ_PRODUCTS}
                  activeIndex={activeSchmalz}
                  onSelect={setActiveSchmalz}
                />

                {/* 2. Synchronized Active Product Card (Swipeable left/right) */}
                <div className="relative overflow-hidden px-0.5">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={SCHMALZ_PRODUCTS[activeSchmalz].id}
                      initial={{ opacity: 0, x: 22 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -22 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.25}
                      onDragEnd={(_e, info) => {
                        if (info.offset.x < -30 || info.velocity.x < -200) {
                          setActiveSchmalz((activeSchmalz + 1) % SCHMALZ_PRODUCTS.length);
                        } else if (info.offset.x > 30 || info.velocity.x > 200) {
                          setActiveSchmalz((activeSchmalz - 1 + SCHMALZ_PRODUCTS.length) % SCHMALZ_PRODUCTS.length);
                        }
                      }}
                      className="p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-white ring-2 ring-[#005596]/30 shadow-[0_12px_28px_-6px_rgba(0,85,150,0.14),inset_0_1px_0_0_rgba(255,255,255,1)] cursor-grab active:cursor-grabbing select-none"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-xs font-mono font-bold text-[#005596]">
                          {isId ? SCHMALZ_PRODUCTS[activeSchmalz].capacityId : SCHMALZ_PRODUCTS[activeSchmalz].capacity}
                        </span>
                        <span className="text-[10px] font-mono font-semibold text-slate-400">
                          {activeSchmalz + 1} / {SCHMALZ_PRODUCTS.length}
                        </span>
                      </div>

                      <div
                        onClick={() => router.push(SCHMALZ_PRODUCTS[activeSchmalz].href)}
                        className="text-base font-extrabold text-slate-900 hover:text-[#005596] flex items-center justify-between gap-2 transition-colors cursor-pointer group/title"
                      >
                        <span>{SCHMALZ_PRODUCTS[activeSchmalz].name}</span>
                        <div className="flex items-center gap-1 text-xs font-semibold text-[#005596] shrink-0">
                          <span>{isId ? 'Lihat Spesifikasi' : 'View Specs'}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover/title:translate-x-0.5 transition-transform" />
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-normal">
                        {isId ? SCHMALZ_PRODUCTS[activeSchmalz].descId : SCHMALZ_PRODUCTS[activeSchmalz].desc}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* 3. Pagination Dots (Titik-Titik Navigasi Sinkron) */}
                <div className="flex items-center justify-center gap-2 pt-1 pb-1">
                  {SCHMALZ_PRODUCTS.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveSchmalz(idx)}
                      aria-label={`Select ${item.name}`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        activeSchmalz === idx
                          ? 'w-7 bg-[#005596] shadow-[0_0_8px_rgba(0,85,150,0.6)]'
                          : 'w-2 bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* DESKTOP ONLY: 6 Grid Cards */}
              <div className="hidden lg:grid lg:grid-cols-3 gap-3 pt-1">
                {SCHMALZ_PRODUCTS.map((item, idx) => {
                  const isActive = activeSchmalz === idx;
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        if (isActive) {
                          router.push(item.href);
                        } else {
                          setActiveSchmalz(idx);
                        }
                      }}
                      onMouseEnter={() => setActiveSchmalz(idx)}
                      className={`group relative p-3.5 rounded-2xl backdrop-blur-xl transition-all duration-300 block cursor-pointer select-none ${
                        isActive
                          ? 'bg-white/95 border border-white ring-2 ring-[#005596]/35 shadow-[0_14px_32px_-8px_rgba(0,85,150,0.16),inset_0_1px_0_0_rgba(255,255,255,1)] -translate-y-0.5'
                          : 'bg-white/70 border border-white/90 ring-1 ring-[#005596]/10 shadow-[0_8px_24px_-6px_rgba(0,85,150,0.06),inset_0_1px_0_0_rgba(255,255,255,0.95)] hover:bg-white/90'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[11px] font-mono font-semibold text-[#005596]">
                          {isId ? item.capacityId : item.capacity}
                        </span>
                        <span
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            isActive
                              ? 'bg-[#005596] shadow-[0_0_8px_rgba(0,85,150,0.6)] scale-125'
                              : 'bg-slate-300'
                          }`}
                        />
                      </div>
                      <div
                        className={`text-xs sm:text-sm font-bold flex items-center justify-between gap-1 transition-colors ${
                          isActive ? 'text-[#005596]' : 'text-slate-900 group-hover:text-[#005596]'
                        }`}
                      >
                        <span>{item.name}</span>
                        <Link
                          href={item.href}
                          onClick={(e) => e.stopPropagation()}
                          className="p-1 rounded-full hover:bg-blue-50 transition-colors"
                          title={`Open specifications for ${item.name}`}
                        >
                          <ArrowRight
                            className={`w-3.5 h-3.5 transition-all duration-300 ${
                              isActive
                                ? 'opacity-100 translate-x-0.5 text-[#005596]'
                                : 'opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5'
                            }`}
                          />
                        </Link>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 leading-snug">
                        {isId ? item.descId : item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2">
                <Link
                  href="/products/schmalz"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#005596] to-[#1d4ed8] hover:from-[#00447a] hover:to-[#1e40af] text-white text-xs sm:text-sm font-bold shadow-[0_6px_20px_-3px_rgba(29,78,216,0.35),inset_0_1px_0_0_rgba(255,255,255,0.25)] transition-all"
                >
                  <span>{isId ? 'Lihat Seluruh Lini Produk Schmalz' : 'Explore Complete Schmalz Portfolio'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Desktop-Only Product Visual Stage (Right Side) */}
            <div className="hidden lg:flex lg:col-span-5 items-center justify-center min-w-0 max-w-full">
              <CleanFloatingCarousel
                slides={SCHMALZ_PRODUCTS}
                activeIndex={activeSchmalz}
                onSelect={setActiveSchmalz}
              />
            </div>
          </div>

          {/* Hairline Divider */}
          <div className="border-t border-slate-200/80" />

          {/* SHOWCASE 2: BINAR HANDLING SWEDEN */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Desktop-Only Clean Product Carousel (Left Side on Desktop) */}
            <div className="hidden lg:flex lg:col-span-5 items-center justify-center min-w-0 max-w-full">
              <CleanFloatingCarousel
                slides={BINAR_PRODUCTS}
                activeIndex={activeBinar}
                onSelect={setActiveBinar}
                accent="red"
              />
            </div>

            {/* Story & Interactive Product Cards Right (Desktop) / Flow (Mobile) */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left min-w-0 max-w-full">
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
                <div className="space-y-0.5">
                  <span className="text-xs font-mono font-medium text-red-600 uppercase tracking-wider block">
                    {isId ? 'Trollhättan, Swedia • Sejak 1979' : 'Trollhättan, Sweden • Since 1979'}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    BINAR HANDLING SWEDEN
                  </h3>
                </div>

                {/* Enlarged Logo with Hyperlink to Official Website */}
                <a
                  href="https://www.binarhandling.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 sm:h-12 w-36 sm:w-44 relative shrink-0 block transition-transform duration-300 hover:scale-105"
                  title="Visit Binar Handling Sweden Official Website (binarhandling.com)"
                >
                  <Image
                    src="/brands/binar.webp"
                    alt="Binar Handling Sweden Official Website"
                    fill
                    className="object-contain object-right"
                    unoptimized
                  />
                </a>
              </div>

              <div className="space-y-2">
                <h4 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  {isId
                    ? 'Manipulator Servo Cerdas dan Lengan Artikulasi Presisi'
                    : 'Intelligent Servo Manipulators and Precision Articulated Arms'}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {isId
                    ? 'Sistem manipulator lengan servo Swedia berpresisi tinggi. Motor penyeimbang otomatis mendeteksi tekanan tangan secara instan, memungkinkan operator mengarahkan workpiece hingga 300 kg dengan ringan dan akurat di lini perakitan.'
                    : 'High-precision Swedish servo arm manipulators. Ultra-responsive auto-balance motors detect hand pressure instantaneously, providing effortless float guidance for workpieces up to 300 kg on precision assembly lines.'}
                </p>
              </div>

              {/* MOBILE ONLY: Unified Synchronized Swiper (No Scrollbar, Pure Swipe + Dots) */}
              <div className="block lg:hidden space-y-3">
                {/* 1. 3D Floating Product Visual (Swipable) */}
                <CleanFloatingCarousel
                  slides={BINAR_PRODUCTS}
                  activeIndex={activeBinar}
                  onSelect={setActiveBinar}
                  accent="red"
                />

                {/* 2. Synchronized Active Product Card (Swipeable left/right) */}
                <div className="relative overflow-hidden px-0.5">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={BINAR_PRODUCTS[activeBinar].id}
                      initial={{ opacity: 0, x: 22 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -22 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.25}
                      onDragEnd={(_e, info) => {
                        if (info.offset.x < -30 || info.velocity.x < -200) {
                          setActiveBinar((activeBinar + 1) % BINAR_PRODUCTS.length);
                        } else if (info.offset.x > 30 || info.velocity.x > 200) {
                          setActiveBinar((activeBinar - 1 + BINAR_PRODUCTS.length) % BINAR_PRODUCTS.length);
                        }
                      }}
                      className="p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-white ring-2 ring-red-600/30 shadow-[0_12px_28px_-6px_rgba(220,38,38,0.14),inset_0_1px_0_0_rgba(255,255,255,1)] cursor-grab active:cursor-grabbing select-none"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-xs font-mono font-bold text-red-600">
                          {isId ? BINAR_PRODUCTS[activeBinar].capacityId : BINAR_PRODUCTS[activeBinar].capacity}
                        </span>
                        <span className="text-[10px] font-mono font-semibold text-slate-400">
                          {activeBinar + 1} / {BINAR_PRODUCTS.length}
                        </span>
                      </div>

                      <div
                        onClick={() => router.push(BINAR_PRODUCTS[activeBinar].href)}
                        className="text-base font-extrabold text-slate-900 hover:text-red-600 flex items-center justify-between gap-2 transition-colors cursor-pointer group/title"
                      >
                        <span>{BINAR_PRODUCTS[activeBinar].name}</span>
                        <div className="flex items-center gap-1 text-xs font-semibold text-red-600 shrink-0">
                          <span>{isId ? 'Lihat Spesifikasi' : 'View Specs'}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover/title:translate-x-0.5 transition-transform" />
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-normal">
                        {isId ? BINAR_PRODUCTS[activeBinar].descId : BINAR_PRODUCTS[activeBinar].desc}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* 3. Pagination Dots (Titik-Titik Navigasi Sinkron) */}
                <div className="flex items-center justify-center gap-2 pt-1 pb-1">
                  {BINAR_PRODUCTS.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveBinar(idx)}
                      aria-label={`Select ${item.name}`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        activeBinar === idx
                          ? 'w-7 bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.6)]'
                          : 'w-2 bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* DESKTOP ONLY: 6 Grid Cards */}
              <div className="hidden lg:grid lg:grid-cols-3 gap-3 pt-1">
                {BINAR_PRODUCTS.map((item, idx) => {
                  const isActive = activeBinar === idx;
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        if (isActive) {
                          router.push(item.href);
                        } else {
                          setActiveBinar(idx);
                        }
                      }}
                      onMouseEnter={() => setActiveBinar(idx)}
                      className={`group relative p-3.5 rounded-2xl backdrop-blur-xl transition-all duration-300 block cursor-pointer select-none ${
                        isActive
                          ? 'bg-white/95 border border-white ring-2 ring-red-600/35 shadow-[0_14px_32px_-8px_rgba(220,38,38,0.18),inset_0_1px_0_0_rgba(255,255,255,1)] -translate-y-0.5'
                          : 'bg-white/70 border border-white/90 ring-1 ring-red-600/10 shadow-[0_8px_24px_-6px_rgba(220,38,38,0.05),inset_0_1px_0_0_rgba(255,255,255,0.95)] hover:bg-white/90'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[11px] font-mono font-semibold text-red-600">
                          {isId ? item.capacityId : item.capacity}
                        </span>
                        <span
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            isActive
                              ? 'bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.6)] scale-125'
                              : 'bg-slate-300'
                          }`}
                        />
                      </div>
                      <div
                        className={`text-xs sm:text-sm font-bold flex items-center justify-between gap-1 transition-colors ${
                          isActive ? 'text-red-600' : 'text-slate-900 group-hover:text-red-600'
                        }`}
                      >
                        <span>{item.name}</span>
                        <Link
                          href={item.href}
                          onClick={(e) => e.stopPropagation()}
                          className="p-1 rounded-full hover:bg-red-50 transition-colors"
                          title={`Open specifications for ${item.name}`}
                        >
                          <ArrowRight
                            className={`w-3.5 h-3.5 transition-all duration-300 ${
                              isActive
                                ? 'opacity-100 translate-x-0.5 text-red-600'
                                : 'opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5'
                            }`}
                          />
                        </Link>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 leading-snug">
                        {isId ? item.descId : item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2">
                <Link
                  href="/products/binar"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white text-xs sm:text-sm font-bold shadow-[0_6px_20px_-3px_rgba(220,38,38,0.35),inset_0_1px_0_0_rgba(255,255,255,0.25)] transition-all"
                >
                  <span>{isId ? 'Lihat Seluruh Lini Produk Binar' : 'Explore Complete Binar Portfolio'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}