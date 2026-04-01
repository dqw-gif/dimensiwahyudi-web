'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, PhoneCall, ArrowRight, Zap } from 'lucide-react';

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    // Determine if it was already shown in this session to prevent spamming the user
    const sessionKey = 'dqw_exit_intent_shown';
    const alreadyShown = sessionStorage.getItem(sessionKey);
    
    if (alreadyShown) {
      setHasTriggered(true);
      return;
    }

    const mouseEvent = (e: MouseEvent) => {
      // Trigger when the cursor moves up towards the address bar (clientY < 10px) 
      // and it hasn't triggered yet.
      if (!hasTriggered && e.clientY < 10) {
        setIsVisible(true);
        setHasTriggered(true);
        sessionStorage.setItem(sessionKey, 'true');
        
        // Push event to Google Analytics
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'exit_intent_trigger', {
                event_category: 'Engagement',
            });
        }
      }
    };

    // Only attach to desktop/mouse users
    document.addEventListener('mouseleave', mouseEvent);
    
    return () => {
      document.removeEventListener('mouseleave', mouseEvent);
    };
  }, [hasTriggered]);

  const closeModal = () => {
    setIsVisible(false);
  };

  const handleWhatsAppClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'exit_intent_conversion', {
            event_category: 'Engagement',
            event_label: 'WhatsApp Click',
        });
    }
  };

  const WHATSAPP_NUMBER = '6281119168752';
  const WA_MESSAGE = encodeURIComponent('Hello DQW, I visited your website and need a quick free consultation regarding a material handling solution.');

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-black/5 hover:bg-black/10 rounded-full text-slate-500 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Banner/Header Segment */}
            <div className="bg-slate-950 p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                <div className="relative z-10">
                    <div className="w-16 h-16 mx-auto bg-red-500/20 border border-red-500/30 rounded-2xl flex items-center justify-center text-red-400 mb-4 animate-pulse">
                        <AlertTriangle size={32} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-white mb-2">Wait! Before you leave...</h2>
                    <p className="text-slate-400 text-sm">Having trouble finding the exact specification for your facility?</p>
                </div>
            </div>

            {/* Body Segment */}
            <div className="p-8 text-center bg-slate-50">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Skip the reading. Get straight answers.</h3>
                <p className="text-slate-600 mb-8 leading-relaxed text-sm">
                    Designing a vacuum handling system can be complex. Talk directly to our Chief Engineer for a <strong className="text-slate-900">Free 15-Minute Technical Consultation</strong> to identify your production bottlenecks instantly.
                </p>

                <a 
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WA_MESSAGE}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleWhatsAppClick}
                    className="group relative flex items-center justify-center gap-3 w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-[0_0_40px_-10px_rgba(22,163,74,0.5)] overflow-hidden"
                >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:animate-[shimmer_1.5s_infinite]"></div>
                    <PhoneCall size={20} className="relative z-10 group-hover:scale-110 transition-transform" /> 
                    <span className="relative z-10">Consult via WhatsApp Now</span>
                    <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                </a>

                <button 
                  onClick={closeModal}
                  className="mt-6 text-sm text-slate-500 hover:text-slate-800 font-semibold underline-offset-4 hover:underline transition-colors"
                >
                  No thanks, I&apos;ll figure it out myself
                </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
