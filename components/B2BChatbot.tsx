'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, ChevronRight, Calculator, LifeBuoy, Send, Bot, Calendar } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from './LanguageProvider';

export default function B2BChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [isBubbleDismissed, setIsBubbleDismissed] = useState(false);
  const { lang } = useLanguage();
  const isId = lang === 'id';

  // Constants
  const WHATSAPP_NUMBER = '6281119168752';
  const WA_QUOTATION_TEXT = encodeURIComponent(
    isId
      ? 'Halo DQW, saya ingin meminta penawaran harga dan konsultasi teknis untuk kebutuhan pabrik kami.'
      : 'Hello DQW, I am interested in requesting a product quotation. Please assist me.'
  );

  const toggleChat = () => {
    const nextOpen = !isOpen;
    if (nextOpen && !hasOpened) {
      setHasOpened(true);
    }
    setIsOpen(nextOpen);
  };

  // Track interactions (gtag)
  const trackAction = (actionLabel: string) => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'chatbot_click', {
        event_category: 'Engagement',
        event_label: actionLabel,
      });
    }
    setIsOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-20 right-4 left-4 sm:left-auto sm:right-6 sm:bottom-24 sm:w-[350px] max-w-[calc(100vw-2rem)] z-50 bg-white rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] border border-slate-200 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 to-blue-900 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3 relative">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20 relative">
                  <Bot size={20} className="text-blue-300" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 outline outline-2 outline-slate-900 bg-emerald-400 rounded-full"></span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm tracking-wide">
                    {isId ? 'Asisten Teknis DQW' : 'Virtual Engineer'}
                  </h3>
                  <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider">Online</p>
                </div>
              </div>
              <button 
                onClick={toggleChat}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-5 bg-slate-50 flex-1 h-[320px] overflow-y-auto w-full custom-scrollbar flex flex-col gap-4">
              
              {/* Bot Message */}
              <div className="flex gap-3 max-w-[90%]">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 border border-blue-200">
                  <Image src="/favicon.ico" alt="DQW" width={16} height={16} className="opacity-70" />
                </div>
                <div className="bg-white border border-slate-200 text-slate-700 text-sm p-4 rounded-2xl rounded-tl-none leading-relaxed shadow-sm">
                  {isId ? (
                    <>
                      Halo! Selamat datang di <strong>PT Dimensi Quantum Wahyudi</strong>. <br/><br/>
                      Ada kebutuhan penanganan beban atau optimasi ergonomi di lini produksi Anda hari ini?
                    </>
                  ) : (
                    <>
                      Hello! Welcome to <strong>PT Dimensi Quantum Wahyudi</strong>. <br/><br/>
                      How can we help optimize your warehouse &amp; production productivity today?
                    </>
                  )}
                </div>
              </div>

              {/* Timestamp */}
              <div className="text-[10px] text-slate-400 font-medium text-center uppercase tracking-widest mt-1 mb-2">
                {isId ? 'Pilih menu layanan di bawah' : 'Select an option below'}
              </div>

              {/* Quick Replies */}
              <div className="flex flex-col gap-2.5 w-full">
                {/* Event Calendar Link */}
                <Link 
                  href="/events"
                  onClick={() => trackAction('View Events Page')}
                  className="w-full bg-gradient-to-r from-blue-50 to-sky-50 border border-blue-200 hover:border-[#005596] hover:shadow-md hover:shadow-blue-500/10 text-slate-800 p-3 rounded-xl text-sm font-bold flex items-center justify-between transition-all group"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-[#005596] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <Calendar size={14} />
                    </span>
                    <span className="text-blue-900 font-extrabold">
                      {isId ? 'Pameran & Seminar 2026' : 'Exhibitions & Events 2026'}
                    </span>
                  </span>
                  <ChevronRight size={16} className="text-blue-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </Link>

                {/* 1. Request Quote -> WhatsApp */}
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WA_QUOTATION_TEXT}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAction('Request Quotation (WA)')}
                  className="w-full bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md hover:shadow-blue-500/10 text-slate-800 p-3 rounded-xl text-sm font-bold flex items-center justify-between transition-all group"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                      <Send size={14} className="-ml-0.5" />
                    </span>
                    {isId ? 'Minta Penawaran Harga' : 'I need a Product Quotation'}
                  </span>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </a>

                {/* 2. Calculate ROI -> Internal */}
                <Link 
                  href="/#roi-calculator"
                  onClick={() => trackAction('Calculate ROI')}
                  className="w-full bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md hover:shadow-blue-500/10 text-slate-800 p-3 rounded-xl text-sm font-bold flex items-center justify-between transition-all group"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                      <Calculator size={14} />
                    </span>
                    {isId ? 'Hitung Estimasi ROI Pabrik' : 'Calculate Ergonomic ROI'}
                  </span>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </Link>

                {/* 3. Tech Support -> Internal */}
                <Link 
                  href="/contact"
                  onClick={() => trackAction('Technical Support')}
                  className="w-full bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md hover:shadow-blue-500/10 text-slate-800 p-3 rounded-xl text-sm font-bold flex items-center justify-between transition-all group"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
                      <LifeBuoy size={14} />
                    </span>
                    {isId ? 'Bantuan Teknis & Sparepart' : 'Technical Help / Spareparts'}
                  </span>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </Link>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Teaser speech bubble next to the chat button (Hidden on Mobile, Visible on Desktop) */}
      {!isOpen && !hasOpened && !isBubbleDismissed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.4, type: 'spring', stiffness: 100 }}
          className="hidden md:flex fixed bottom-[96px] right-6 z-50 bg-slate-900/95 backdrop-blur-md text-white text-xs font-medium pl-4 pr-2.5 py-3 rounded-2xl rounded-br-none shadow-xl border border-slate-700/80 transition-all select-none max-w-[270px] items-center justify-between gap-2.5 group"
        >
          <div
            onClick={toggleChat}
            className="flex items-center gap-2.5 cursor-pointer flex-1"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
            <span className="text-slate-200 leading-snug font-sans group-hover:text-white transition-colors">
              {isId
                ? 'Butuh konsultasi teknis sistem vacuum handling industri?'
                : 'Need technical guidance on industrial vacuum handling?'}
            </span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsBubbleDismissed(true);
            }}
            className="w-5 h-5 rounded-full hover:bg-white/20 text-slate-400 hover:text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
            aria-label="Tutup pesan"
          >
            <X size={12} />
          </button>
        </motion.div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 w-13 h-13 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-slate-900 text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-[3px] sm:border-4 border-white/20 cursor-pointer ${
          isOpen ? 'rotate-90 bg-slate-800' : 'hover:shadow-blue-600/50'
        }`}
        aria-label="Toggle Virtual Assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-5 h-5 sm:w-7 sm:h-7" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative"
            >
              <MessageSquare className="w-5 h-5 sm:w-6.5 sm:h-6.5 fill-current -mt-0.5 ml-0.5" />
              {/* Notification Dot */}
              {!hasOpened && (
                <span className="absolute -top-0.5 -right-0.5 sm:top-0 sm:right-0 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-red-500 border-2 border-slate-900 rounded-full animate-pulse z-10"></span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </>
  );
}
