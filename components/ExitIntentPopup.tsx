'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Download, CheckCircle } from 'lucide-react';

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [email, setEmail] = useState('');
  const [leadStatus, setLeadStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    const sessionKey = 'dqw_exit_intent_catalog';
    const alreadyShown = sessionStorage.getItem(sessionKey);
    
    if (alreadyShown) {
      setHasTriggered(true);
      return;
    }

    const mouseEvent = (e: MouseEvent) => {
      if (!hasTriggered && e.clientY < 10) {
        setIsVisible(true);
        setHasTriggered(true);
        sessionStorage.setItem(sessionKey, 'true');
        
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'exit_intent_trigger', {
                event_category: 'LeadGen',
            });
        }
      }
    };

    document.addEventListener('mouseleave', mouseEvent);
    return () => document.removeEventListener('mouseleave', mouseEvent);
  }, [hasTriggered]);

  const closeModal = () => setIsVisible(false);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-black/5 hover:bg-black/10 rounded-full text-slate-500 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Left Image Side */}
            <div className="w-full md:w-5/12 bg-slate-950 p-8 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-blue-500/10 blur-3xl rounded-full translate-x-[-20%] translate-y-[-20%]"></div>
                <div className="relative z-10 text-center">
                    <BookOpen size={48} className="text-cyan-400 mx-auto mb-6" />
                    <h3 className="text-2xl font-black text-white mb-2 leading-tight">2026 Material Handling Guide</h3>
                    <p className="text-cyan-400 font-bold uppercase tracking-widest text-xs mb-8">Free PDF Catalog</p>
                    <div className="relative w-48 h-64 mx-auto bg-slate-800 rounded-lg shadow-2xl border border-slate-700 overflow-hidden transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/50 to-slate-900 flex items-center justify-center p-4 text-center">
                            <span className="text-white font-black text-xl leading-tight">Ergonomic Solutions Catalog</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Form Side */}
            <div className="w-full md:w-7/12 p-8 md:p-12 bg-slate-50 flex flex-col justify-center">
                {leadStatus !== 'success' ? (
                  <>
                    <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Leaving so soon?</h2>
                    <p className="text-slate-600 mb-8 leading-relaxed">
                        Don't leave empty-handed. Download our comprehensive guide to vacuum handling systems and see how top manufacturers prevent musculoskeletal disorders.
                    </p>

                    <form 
                        onSubmit={async (e) => {
                          e.preventDefault();
                          if (!email) return;
                          setLeadStatus('loading');
                          try {
                            const res = await fetch(`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID || 'xrearydw'}`, {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                subject: '📚 Catalog Download Lead',
                                email: email,
                                source: 'Exit Intent Popup'
                              })
                            });
                            if (res.ok) {
                              setLeadStatus('success');
                              if (typeof window !== 'undefined' && (window as any).gtag) {
                                (window as any).gtag('event', 'generate_lead', { event_category: 'LeadGen', event_label: 'Catalog Download' });
                              }
                            } else {
                              setLeadStatus('error');
                            }
                          } catch (err) {
                            setLeadStatus('error');
                          }
                        }}
                        className="space-y-4"
                    >
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Corporate Email</label>
                            <input 
                              type="email" 
                              required
                              placeholder="engineer@company.com" 
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                            />
                        </div>
                        <button 
                          type="submit" 
                          disabled={leadStatus === 'loading'}
                          className="group relative flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-blue-600/30 disabled:opacity-50 overflow-hidden"
                        >
                            {leadStatus === 'loading' ? 'Processing...' : (
                              <>
                                <Download size={20} className="relative z-10" /> 
                                <span className="relative z-10">Send & Unlock PDF</span>
                              </>
                            )}
                        </button>
                        {leadStatus === 'error' && <p className="text-red-500 text-sm mt-2 text-center">Connection error. Please try again.</p>}
                    </form>

                    <button 
                      onClick={closeModal}
                      className="mt-6 text-sm text-slate-400 hover:text-slate-600 font-medium underline-offset-4 hover:underline transition-colors block text-center"
                    >
                      No thanks, I don't need the catalog right now
                    </button>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={40} className="text-emerald-600" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">You're all set!</h2>
                    <p className="text-slate-600 mb-8 leading-relaxed">
                        A copy has been sent to your email. You can also download it directly right now.
                    </p>
                    <a 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); alert('Catalog PDF downloading...'); closeModal(); }}
                      className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-emerald-600/30 w-full"
                    >
                        <Download size={20} /> Download PDF Directory
                    </a>
                  </div>
                )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
