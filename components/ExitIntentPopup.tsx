'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Download, CheckCircle } from 'lucide-react';

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const hasTriggeredRef = useRef(false);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [leadStep, setLeadStep] = useState<'capture' | 'profile' | 'done'>('capture');
  const [captureStatus, setCaptureStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [profileStatus, setProfileStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [captureError, setCaptureError] = useState('');
  const [profileError, setProfileError] = useState('');
  const [captureStartedAt, setCaptureStartedAt] = useState(() => Date.now());
  const [profileStartedAt, setProfileStartedAt] = useState(() => Date.now());

const openModal = () => {
    setCaptureStartedAt(Date.now());
    setProfileStartedAt(Date.now());
    setLeadStep('capture');
    setCaptureStatus('idle');
    setProfileStatus('idle');
    setCaptureError('');
    setProfileError('');
    setHoneypot('');
    setIsVisible(true);
  };

  useEffect(() => {
    const sessionKey = 'dqw_exit_intent_catalog';
    const alreadyShown = sessionStorage.getItem(sessionKey);
    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;

    if (alreadyShown) {
      hasTriggeredRef.current = true;
      return;
    }

    if (isMobile) {
      const timeoutId = window.setTimeout(() => {
        if (hasTriggeredRef.current) {
          return;
        }

        hasTriggeredRef.current = true;
        sessionStorage.setItem(sessionKey, 'true');
        openModal();

        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
          window.gtag('event', 'exit_intent_trigger', {
            event_category: 'LeadGen',
          });
        }
      }, 45000);

      return () => window.clearTimeout(timeoutId);
    }

    const mouseEvent = (e: MouseEvent) => {
      if (!hasTriggeredRef.current && e.clientY < 10) {
        hasTriggeredRef.current = true;
        sessionStorage.setItem(sessionKey, 'true');
        openModal();

        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('event', 'exit_intent_trigger', {
                event_category: 'LeadGen',
            });
        }
      }
    };

    document.addEventListener('mouseleave', mouseEvent);
    return () => document.removeEventListener('mouseleave', mouseEvent);
  }, []);

  const closeModal = () => setIsVisible(false);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
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
            className="relative w-full max-w-4xl max-h-[92svh] overflow-y-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-black/5 hover:bg-black/10 rounded-full text-slate-500 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Left Image Side */}
            <div className="hidden md:flex w-full md:w-5/12 bg-slate-950 p-8 flex-col items-center justify-center relative overflow-hidden">
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
            <div className="w-full md:w-7/12 p-5 sm:p-6 md:p-12 bg-slate-50 flex flex-col justify-center">
                {leadStep === 'capture' ? (
                  <>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3 tracking-tight">Leaving so soon?</h2>
                    <p className="text-slate-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                      Download the guide instantly with your corporate email. We will only use it for technical follow-up and relevant product references.
                    </p>

                    <form 
                        onSubmit={async (e) => {
                          e.preventDefault();
                          if (!email) return;
                          setCaptureStatus('loading');
                          setCaptureError('');
                          try {
                            const res = await fetch('/api/lead-capture', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                kind: 'exit_intent_initial',
                                email,
                                honeypot,
                                startedAt: captureStartedAt,
                                context: {
                                  source: 'Exit Intent Popup',
                                  step: 1,
                                },
                              })
                            });
                            if (res.ok) {
                              setLeadStep('profile');
                              setProfileStartedAt(Date.now());
                              if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
                                window.gtag('event', 'generate_lead', { event_category: 'LeadGen', event_label: 'Catalog Download' });
                                window.gtag('event', 'lead_funnel_step1_complete', {
                                  event_category: 'LeadFunnel',
                                  event_label: 'Exit Intent Email',
                                });
                              }
                            } else {
                              const payload = await res.json().catch(() => ({}));
                              setCaptureError(typeof payload?.error === 'string' ? payload.error : 'Connection error. Please try again.');
                              setCaptureStatus('error');
                            }
                          } catch (err) {
                            setCaptureError('Connection error. Please try again.');
                            setCaptureStatus('error');
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
                        <input
                          type="text"
                          tabIndex={-1}
                          autoComplete="off"
                          value={honeypot}
                          onChange={(e) => setHoneypot(e.target.value)}
                          className="hidden"
                          aria-hidden="true"
                        />
                        <button 
                          type="submit" 
                          disabled={captureStatus === 'loading'}
                          className="group relative flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-blue-600/30 disabled:opacity-50 overflow-hidden"
                        >
                            {captureStatus === 'loading' ? 'Processing...' : (
                              <>
                                <Download size={20} className="relative z-10" /> 
                                <span className="relative z-10">Send & Unlock PDF</span>
                              </>
                            )}
                        </button>
                        {captureStatus === 'error' && <p className="text-red-500 text-sm mt-2 text-center">{captureError || 'Connection error. Please try again.'}</p>}
                    </form>

                    <button 
                      onClick={closeModal}
                      className="mt-6 text-sm text-slate-400 hover:text-slate-600 font-medium underline-offset-4 hover:underline transition-colors block text-center"
                    >
                      No thanks, I do not need the catalog right now
                    </button>
                  </>
                ) : leadStep === 'profile' ? (
                  <>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3 tracking-tight">Help us tailor your use-case brief</h2>
                    <p className="text-slate-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                      Optional but recommended: share your name and company so our engineers can send examples that match your industry and plant needs.
                    </p>

                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        setProfileStatus('loading');
                        setProfileError('');

                        try {
                          const res = await fetch('/api/lead-capture', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              kind: 'exit_intent_profile',
                              email,
                              fullName,
                              company,
                              honeypot,
                              startedAt: profileStartedAt,
                              context: {
                                source: 'Exit Intent Popup',
                                step: 2,
                              },
                            }),
                          });

                          if (res.ok) {
                            setLeadStep('done');
                            if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
                              window.gtag('event', 'lead_funnel_step2_complete', {
                                event_category: 'LeadFunnel',
                                event_label: 'Exit Intent Profile',
                              });
                            }
                          } else {
                            const payload = await res.json().catch(() => ({}));
                            setProfileError(typeof payload?.error === 'string' ? payload.error : 'Failed to save details.');
                            setProfileStatus('error');
                          }
                        } catch {
                          setProfileError('Failed to save details.');
                          setProfileStatus('error');
                        }
                      }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name (optional)</label>
                        <input
                          type="text"
                          placeholder="e.g. Budi Santoso"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Company (optional)</label>
                        <input
                          type="text"
                          placeholder="e.g. PT Maju Jaya"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={profileStatus === 'loading'}
                        className="group relative flex items-center justify-center gap-2 w-full bg-slate-900 hover:bg-black text-white font-bold py-4 px-6 rounded-xl transition-all disabled:opacity-50 overflow-hidden"
                      >
                        {profileStatus === 'loading' ? 'Saving...' : 'Save details'}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
                            window.gtag('event', 'lead_funnel_step2_skipped', {
                              event_category: 'LeadFunnel',
                              event_label: 'Exit Intent Profile',
                            });
                          }
                          setLeadStep('done');
                        }}
                        className="w-full text-sm text-slate-500 hover:text-slate-700 underline underline-offset-4"
                      >
                        Skip, just download
                      </button>

                      {profileStatus === 'error' && <p className="text-red-500 text-sm mt-2 text-center">{profileError || 'Failed to save details.'}</p>}
                    </form>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={40} className="text-emerald-600" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4 tracking-tight">You&apos;re all set!</h2>
                    <p className="text-slate-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                        A copy has been sent to your email. You can also download it directly right now.
                    </p>
                    <a 
                      href="https://drive.google.com/uc?export=download&id=1bWcblVo0Ps-Dx6aGwL21hrWkfdwhU30K"
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => closeModal()}
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
