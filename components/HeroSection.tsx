'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
// Kita gunakan icon dari Lucide agar lebih rapi (sudah diinstall sebelumnya)
import { ArrowRight, MessageSquare } from 'lucide-react';

const words = ['Vacuum Lifter', 'Otomasi Industri', 'Material Handling', 'Robotik & Cobot', 'Ergonomic Handling'];

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
    <section className="relative h-screen w-full overflow-hidden bg-slate-950">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        suppressHydrationWarning
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay (Nuansa Biru Gelap/Cyberpunk) */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center px-6 max-w-6xl mx-auto">

          {/* Tagline Kecil di Atas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <span className="px-3 py-1 border border-cyan-500/30 rounded-full text-cyan-400 text-xs md:text-sm font-medium tracking-widest uppercase bg-cyan-500/10 backdrop-blur-md">
              Solusi Material Handling & Otomasi Vakum
            </span>
          </motion.div>

          {/* Company Name */}
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight tracking-tight"
          >
            PT Dimensi Quantum <br className="hidden md:block" /> Wahyudi
          </motion.h1>

          {/* Typewriter Effect (Warna Cyan) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-12 h-20" // Fixed height agar tidak lompat
          >
            <p className="text-xl md:text-4xl lg:text-5xl text-slate-300 font-light">
              Solusi Untuk{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-semibold inline-block min-w-[300px] text-left">
                {currentText}
                <span className="animate-pulse text-cyan-400">|</span>
              </span>
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            {/* Tombol 1: Primary (Biru Solid) */}
            <Link
              href="/services"
              className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-bold text-lg transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/60 flex items-center gap-3"
              aria-label="Eksplorasi Layanan Teknik & Solusi Lifting"
            >
              Eksplorasi Solusi Vacuum & Lifting
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Tombol 2: Secondary (Outline Cyan/Glass) */}
            <Link
              href="/contact"
              className="relative px-8 py-4 border border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/10 text-cyan-400 font-semibold text-lg rounded-lg transition-all duration-300 backdrop-blur-sm flex items-center gap-3 hover:border-cyan-400"
            >
              Hubungi Kami
              <MessageSquare className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
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