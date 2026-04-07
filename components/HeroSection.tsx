'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
// Using Lucide icons for a cleaner visual style
import { ArrowRight, MessageSquare } from 'lucide-react';

const words = ['Vacuum Lifters', 'Industrial Automation', 'Material Handling', 'Robotics & Cobots', 'Ergonomic Lifting'];

export default function HeroSection() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const currentWord = words[currentWordIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.substring(0, currentText.length + 1));
          setTypingSpeed(150);
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentWord.substring(0, currentText.length - 1));
          setTypingSpeed(100);
        } else {
          // Move to next word
          setIsDeleting(false);
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, typingSpeed]);

  return (
    <section className="relative min-h-[86svh] md:h-screen w-full overflow-hidden bg-slate-950">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/hero-poster.webp"
        suppressHydrationWarning
        className="absolute inset-0 w-full h-full object-cover opacity-35 md:opacity-50"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay (Nuansa Biru Gelap/Cyberpunk) */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950"></div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-start justify-center pt-20 pb-12 sm:items-center sm:pt-0">
        <div className="mx-auto w-full max-w-6xl px-4 text-center sm:px-6">

          {/* H1 for SEO (Visually Hidden) */}
          <h1 className="sr-only">PT Dimensi Quantum Wahyudi | Premium Vacuum Lifting Solutions in Indonesia</h1>

          {/* Tagline Kecil di Atas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-3 sm:mb-4"
          >
            <span className="inline-flex max-w-[92vw] items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-cyan-400 backdrop-blur-md sm:text-xs md:text-sm md:tracking-widest">
              Trusted Partner for Vacuum Lifting Excellence
            </span>
          </motion.div>

          {/* Company Logo */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="mb-3 md:mb-6 flex justify-center"
          >
            <Image
              src="/logo_dqw_putih.webp"
              alt="PT Dimensi Quantum Wahyudi"
              width={1100}
              height={220}
              priority
              className="w-full max-w-[240px] sm:max-w-sm md:max-w-3xl h-auto"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28 }}
            className="text-cyan-300 text-[11px] sm:text-sm md:text-base font-semibold uppercase tracking-[0.16em] sm:tracking-[0.18em] mb-3 sm:mb-4"
          >
            Market Leader in Vacuum Lifting Solutions in Indonesia
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-slate-200 text-sm sm:text-base md:text-xl max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 leading-relaxed"
          >
            Since 2009, PT Dimensi Quantum Wahyudi has helped Indonesian manufacturers improve safety, throughput, and operator ergonomics through high-performance vacuum lifting systems.
          </motion.p>

          {/* Typewriter Effect (Warna Cyan) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-7 md:mb-12 min-h-[3.5rem] md:min-h-[5rem] flex flex-col items-center justify-center gap-1.5 sm:gap-2"
          >
            <span className="text-base sm:text-lg md:text-3xl lg:text-4xl text-slate-300 font-light text-center">
              Built For
            </span>
            <span className="text-lg sm:text-2xl md:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-bold text-center min-h-[2.5rem] md:min-h-[3rem] leading-none">
              {currentText}
              <span className="animate-pulse text-cyan-400">|</span>
            </span>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-stretch sm:items-center"
          >
            {/* Tombol 1: Primary (Biru Solid) */}
            <Link
              href="/services"
              className="group relative w-full sm:w-auto px-5 sm:px-6 md:px-8 py-3.5 md:py-4 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm sm:text-base md:text-lg font-bold transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/60 flex items-center justify-center gap-3"
              aria-label="Explore technical services and lifting solutions"
            >
              Explore Engineering Solutions
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Tombol 2: Secondary (Outline Cyan/Glass) */}
            <Link
              href="/contact"
              className="relative w-full sm:w-auto px-5 sm:px-6 md:px-8 py-3.5 md:py-4 border border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/10 text-cyan-400 font-semibold text-sm sm:text-base md:text-lg rounded-lg transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-3 hover:border-cyan-400"
            >
              Talk to Our Engineers
              <MessageSquare className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="hidden md:block absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="text-cyan-500/50"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}