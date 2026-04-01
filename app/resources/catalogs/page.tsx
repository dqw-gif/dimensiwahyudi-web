'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, CheckCircle, ShieldCheck, Mail, Briefcase, Building2, User, Lock, KeyRound } from 'lucide-react';
import Image from 'next/image';

export default function CatalogsGatePage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    jobTitle: '',
    email: ''
  });

  const SUPABASE_PDF_URL = 'https://[your-project].supabase.co/storage/v1/object/public/[bucket]/[filename.pdf]';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API delay / Webhook trigger
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsUnlocked(true);
    setIsSubmitting(false);

    // Track Gated Content Unlock
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'generate_lead', {
            event_category: 'Lead Magnet',
            event_label: 'Catalog Unlock',
        });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                <FileText size={14} /> Official E-Katalog 2026
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4">
                The Complete Vacuum Automation Catalog
            </h1>
            <p className="text-slate-600 text-lg">
                Technical specifications, load capacities, and integration guides for the entire Schmalz and Binar Handling industrial lineup.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
            
            {/* Left: Premium Catalog Preview */}
            <div className="relative group perspective-[1000px]">
                {/* Decorative background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                
                <motion.div 
                   className="relative bg-white p-2 rounded-3xl border border-slate-200 shadow-2xl transform-style-3d group-hover:-rotate-y-12 group-hover:rotate-x-6 transition-transform duration-700"
                >
                    <div className="bg-slate-950 rounded-2xl overflow-hidden aspect-[3/4] flex flex-col items-center justify-center p-8 relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl mix-blend-screen"></div>
                        <Image src="/logo.png" alt="DQW Logo" width={200} height={50} className="opacity-50 object-contain mb-8 invert filter grayscale" />
                        
                        <h2 className="text-4xl font-black text-white text-center mb-4 leading-none tracking-tighter">
                            INDUSTRIAL<br/>HANDLING<br/><span className="text-cyan-400">2026</span>
                        </h2>
                        <div className="w-16 h-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mb-8"></div>
                        
                        <div className="flex flex-col gap-3 w-full max-w-[200px]">
                            <div className="h-2 w-full bg-white/10 rounded-full"></div>
                            <div className="h-2 w-3/4 bg-white/10 rounded-full"></div>
                            <div className="h-2 w-1/2 bg-white/10 rounded-full"></div>
                        </div>

                        <div className="absolute bottom-6 right-6">
                            <span className="text-slate-500 text-xs font-mono">1.2.0-REV</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Right: Gated Content Engine */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-slate-200 relative overflow-hidden">
                <AnimatePresence mode="wait">
                    
                    {!isUnlocked ? (
                        <motion.div 
                            key="form"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500">
                                    <Lock size={24} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 leading-none">Unlock Document</h3>
                                    <p className="text-sm text-slate-500 mt-1">Free digital download for Engineering Professionals.</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-1.5 flex-1 w-full">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Full Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                            <User size={16} />
                                        </div>
                                        <input required type="text" name="name" value={formData.name} onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 ring-blue-500/20 outline-none transition-all placeholder:text-slate-400" placeholder="e.g. Budi Santoso" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5 flex-1 w-full">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Company</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                                <Building2 size={16} />
                                            </div>
                                            <input required type="text" name="company" value={formData.company} onChange={handleChange}
                                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 ring-blue-500/20 outline-none transition-all" placeholder="e.g. PT Maju Jaya" />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5 flex-1 w-full">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Job Title</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                                <Briefcase size={16} />
                                            </div>
                                            <input required type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange}
                                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 ring-blue-500/20 outline-none transition-all" placeholder="e.g. Plant Manager" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-1.5 flex-1 w-full">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Corporate Email</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                            <Mail size={16} />
                                        </div>
                                        <input required type="email" name="email" value={formData.email} onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 ring-blue-500/20 outline-none transition-all" placeholder="budi@majujaya.com" />
                                    </div>
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="w-full bg-slate-900 hover:bg-black text-white px-6 py-4 rounded-xl font-bold transition-all mt-4 flex items-center justify-center gap-2 group disabled:opacity-70"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">Authenticating <span className="animate-pulse">...</span></span>
                                    ) : (
                                        <><KeyRound size={18} className="group-hover:rotate-12 transition-transform" /> Unlock Catalog</>
                                    )}
                                </button>

                                <div className="flex items-center justify-center gap-2 mt-4 text-[11px] text-slate-400 font-medium">
                                    <ShieldCheck size={14} className="text-emerald-500" /> We respect your privacy. No spam guaranteed.
                                </div>
                            </form>
                        </motion.div>

                    ) : (

                        /* SUCCESS STATE */
                        <motion.div 
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="h-full flex flex-col items-center justify-center text-center py-10"
                        >
                            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500 mb-6 mx-auto animate-[bounce_1s_ease-in-out_1]">
                                <CheckCircle size={48} />
                            </div>
                            
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-full text-slate-500 text-xs font-black uppercase tracking-widest mb-4">
                                Document Unlocked
                            </div>
                            
                            <h3 className="text-3xl font-black text-slate-900 mb-4">Success, {formData.name.split(' ')[0]}!</h3>
                            <p className="text-slate-600 mb-8 max-w-sm mx-auto">
                                The 2026 Schmalz Technical Catalog is ready to download.
                            </p>
                            
                            <a 
                                href={SUPABASE_PDF_URL} 
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full max-w-sm bg-blue-600 hover:bg-blue-500 text-white font-black px-6 py-4 rounded-xl transition-all shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 group"
                            >
                                <Download size={20} className="group-hover:-translate-y-1 transition-transform" />
                                Download PDF File Now
                            </a>
                        </motion.div>

                    )}
                </AnimatePresence>
            </div>

        </div>
      </div>
    </main>
  );
}
