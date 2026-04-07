'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, ChevronRight, Calculator, LifeBuoy, Send, Bot } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function B2BChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  // Constants
  const WHATSAPP_NUMBER = '6281119168752';
  const WA_QUOTATION_TEXT = encodeURIComponent('Hello DQW, I am interested in requesting a product quotation. Please assist me.');

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
    setIsOpen(false); // Close bot after navigation
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
            className="fixed bottom-24 right-6 w-[340px] z-50 bg-white rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] border border-slate-200 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 to-blue-900 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3 relative">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20 relative">
                  <Bot size={20} className="text-blue-300" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 outline outline-2 outline-slate-900 bg-emerald-400 rounded-full"></span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm tracking-wide">Virtual Engineer</h3>
                  <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider">Online</p>
                </div>
              </div>
              <button 
                onClick={toggleChat}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-colors"
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
                  Hello! Welcome to <strong>PT Dimensi Quantum Wahyudi</strong>. <br/><br/>
                  How can we help optimize your warehouse & production productivity today?
                </div>
              </div>

              {/* Timestamp */}
              <div className="text-[10px] text-slate-400 font-medium text-center uppercase tracking-widest mt-1 mb-2">
                Select an option below
              </div>

              {/* Quick Replies */}
              <div className="flex flex-col gap-2.5 w-full">
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
                    I need a Product Quotation
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
                    Calculate Ergonomic ROI
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
                    Technical Help / Spareparts
                  </span>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </Link>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-blue-600 to-slate-900 text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-4 border-white/20 ${isOpen ? 'rotate-90 bg-slate-800' : 'hover:shadow-blue-600/50'}`}
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
              <X size={28} />
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
              <MessageSquare size={26} className="fill-current -mt-1 ml-0.5" />
              {/* Notification Dot */}
              {!hasOpened && (
                <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-slate-900 rounded-full animate-pulse z-10"></span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </>
  );
}
