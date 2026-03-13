'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, CheckCircle, ExternalLink, AlertCircle } from 'lucide-react';

type FieldErrors = { name?: string; email?: string; message?: string };

function validateField(name: string, value: string): string {
  const text = {
    nameMin: 'Name must be at least 2 characters',
    emailInvalid: 'Invalid email format',
    messageMin: 'Description must be at least 20 characters',
  };

  switch (name) {
    case 'name': return value.trim().length < 2 ? text.nameMin : '';
    case 'email': return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : text.emailInvalid;
    case 'message': return value.trim().length < 20 ? text.messageMin : '';
    default: return '';
  }
}

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', company: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const FORMSPREE_URL = `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID || 'xrearydw'}`;
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const formRef = useRef<HTMLFormElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  }

  function validateAll(): boolean {
    const newErrors: FieldErrors = {};
    const required = ['name', 'email', 'message'] as const;
    required.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    setTouched({ name: true, email: true, message: true });
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validateAll()) return;

    setFormStatus('submitting');

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormStatus('success');
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  }

  const inputBase = "w-full bg-slate-50 border rounded-xl px-5 py-4 text-slate-900 focus:bg-white focus:ring-4 outline-none transition-all font-medium";
  const inputOk = "border-slate-200 focus:border-blue-600 focus:ring-blue-50";
  const inputErr = "border-red-400 focus:border-red-500 focus:ring-red-50 bg-red-50/30";

  function fieldClass(name: keyof FieldErrors) {
    if (!touched[name]) return `${inputBase} ${inputOk}`;
    return touched[name] && errors[name] ? `${inputBase} ${inputErr}` : `${inputBase} border-emerald-400 focus:border-emerald-500 focus:ring-emerald-50`;
  }

  const copy = {
    heroTitleA: 'Free Technical & Lifting',
    heroTitleB: 'Consultation',
    heroDesc:
      'Share your current material handling challenge. Our certified engineers are ready to design the most efficient ergonomic vacuum lifting solution for your production line.',
    contactCenter: 'Contact Service Center',
    officeTitle: 'Workshop & Office Location',
    officeResponse: 'Fast Response: Within 24 Business Hours',
    businessMail: 'Business Correspondence',
    hotline: 'Technical Hotline & WhatsApp',
    emergency: 'Emergency Maintenance Support Available',
    officeHours: 'Office Hours',
    weekdays: 'Monday - Friday',
    weekend: 'Saturday - Sunday',
    closed: 'Closed',
    formTitle: 'Request a Quote & Tailored Solution',
    formDesc:
      'Share your operational requirements so we can prepare a precise handling design and bill of quantity estimate.',
    successTitle: 'Request Received!',
    successDesc: 'Our engineer will contact you within 24 business hours.',
    continueWa: 'Continue via WhatsApp',
    sendAnother: 'Send another request',
    failed: 'Failed to send message',
    failedDesc: 'Please contact us directly via WhatsApp:',
    waChat: 'WhatsApp Chat',
    retry: 'Try again',
    personName: 'Person in Charge Name',
    companyName: 'Company Name',
    corporateEmail: 'Corporate Email',
    projectSpec: 'Project Specification',
    namePlaceholder: 'Example: John Smith',
    companyPlaceholder: 'Example: PT Manufacturing Indonesia',
    emailPlaceholder: 'email@company-name.com',
    messagePlaceholder: 'Mention material weight (kg), object type (box/sheet), and lifting frequency per hour...',
    looksGood: 'Looks good!',
    emailValid: 'Valid email',
    processing: 'Processing...',
    getQuote: 'Get Price Quotation',
    privacy: 'Your data is kept confidential for technical consultation and official quotation purposes.',
    minText: 'min',
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-cyan-500 selection:text-white relative">

      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      {/* 1. Header */}
      <section className="pt-44 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-50 rounded-full blur-[120px] -z-10" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-slate-900">
            {copy.heroTitleA} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">{copy.heroTitleB}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-slate-600 text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            {copy.heroDesc}
          </motion.p>
        </div>
      </section>

      {/* 2. Contact Information & Form */}
      <section className="pb-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50">

          {/* LEFT: INFO */}
          <div className="p-10 md:p-16 bg-slate-50 border-r border-slate-200">
            <h2 className="text-3xl font-bold text-slate-900 mb-10">{copy.contactCenter}</h2>
            <div className="space-y-10">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-200">
                  <MapPin size={28} />
                </div>
                <div>
                  <h3 className="text-slate-900 font-bold text-xl mb-2">{copy.officeTitle}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    BizPark 3 Bekasi, Jl. Sultan Agung No.80 No. C37,<br />
                    Kali Baru, Medan Satria, Bekasi, West Java 17132<br />
                    Indonesia
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-cyan-500 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-cyan-100">
                  <Mail size={28} />
                </div>
                <div>
                  <h3 className="text-slate-900 font-bold text-xl mb-2">{copy.businessMail}</h3>
                  <a href="mailto:sales@dimensiwahyudi.com" className="text-slate-600 text-lg font-medium underline underline-offset-4 hover:text-blue-600 transition-colors">
                    sales@dimensiwahyudi.com
                  </a>
                  <p className="text-slate-400 text-xs mt-2 uppercase tracking-widest font-bold">{copy.officeResponse}</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-slate-200">
                  <Phone size={28} />
                </div>
                <div>
                  <h3 className="text-slate-900 font-bold text-xl mb-2">{copy.hotline}</h3>
                  <a href="https://wa.me/6281119168752" target="_blank" rel="noopener noreferrer"
                    className="text-slate-600 text-lg font-medium hover:text-green-600 transition-colors flex items-center gap-2">
                    +62 811-1916-8752 <ExternalLink size={14} />
                  </a>
                  <p className="text-slate-400 text-xs mt-2 uppercase tracking-widest font-bold">{copy.emergency}</p>
                </div>
              </div>

              <div className="mt-12 pt-12 border-t border-slate-200">
                <h3 className="text-slate-900 font-bold text-lg mb-4 flex items-center gap-2">
                  <Clock size={20} className="text-blue-600" /> {copy.officeHours}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:border-blue-200 transition-all">
                    <span className="font-semibold text-slate-600">{copy.weekdays}</span>
                    <span className="font-bold text-slate-900">08:00 - 17:00 WIB</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-100/50 p-4 rounded-xl border border-dashed border-slate-200 opacity-60">
                    <span className="font-semibold text-slate-400">{copy.weekend}</span>
                    <span className="font-bold text-slate-400">{copy.closed}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: FORM */}
          <div className="p-10 md:p-16 bg-white">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">{copy.formTitle}</h2>
            <p className="text-slate-500 mb-10 text-lg font-medium">{copy.formDesc}</p>

            {formStatus === 'success' ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 rounded-[2rem] p-12 text-center">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-green-100">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-3">{copy.successTitle}</h3>
                <p className="text-slate-600 text-lg mb-6">{copy.successDesc}</p>
                <a href="https://wa.me/6281119168752" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-colors mb-4">
                  <Phone size={18} /> {copy.continueWa}
                </a>
                <br />
                <button onClick={() => { setFormStatus('idle'); setFormData({ name: '', company: '', email: '', message: '' }); setErrors({}); setTouched({}); }}
                  className="mt-4 px-6 py-2 text-sm font-bold text-green-600 hover:text-green-700 underline underline-offset-4 transition-all">
                  {copy.sendAnother}
                </button>
              </motion.div>
            ) : formStatus === 'error' ? (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center mb-6">
                <p className="text-red-700 font-bold mb-2">{copy.failed}</p>
                <p className="text-red-600 text-sm mb-4">{copy.failedDesc}</p>
                <a href="https://wa.me/6281119168752" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-colors">
                  <Phone size={18} /> {copy.waChat}
                </a>
                <button onClick={() => setFormStatus('idle')} className="block mx-auto mt-4 text-sm text-slate-500 underline">{copy.retry}</button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-7" noValidate>
                <div className="grid md:grid-cols-2 gap-7">
                  {/* Name */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-bold text-slate-700 uppercase tracking-tight">
                      {copy.personName} <span className="text-red-500">*</span>
                    </label>
                    <input id="name" name="name" type="text" value={formData.name}
                      onChange={handleChange} onBlur={handleBlur}
                      className={fieldClass('name')} placeholder={copy.namePlaceholder} />
                    {touched.name && errors.name && (
                      <p className="flex items-center gap-1.5 text-xs text-red-600 font-medium">
                        <AlertCircle size={12} /> {errors.name}
                      </p>
                    )}
                    {touched.name && !errors.name && formData.name && (
                      <p className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                        <CheckCircle size={12} /> {copy.looksGood}
                      </p>
                    )}
                  </div>
                  {/* Company */}
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-bold text-slate-700 uppercase tracking-tight">{copy.companyName}</label>
                    <input id="company" name="company" type="text" value={formData.company}
                      onChange={handleChange}
                      className={`${inputBase} ${inputOk}`} placeholder={copy.companyPlaceholder} />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-bold text-slate-700 uppercase tracking-tight">
                    {copy.corporateEmail} <span className="text-red-500">*</span>
                  </label>
                  <input id="email" name="email" type="email" value={formData.email}
                    onChange={handleChange} onBlur={handleBlur}
                    className={fieldClass('email')} placeholder={copy.emailPlaceholder} />
                  {touched.email && errors.email && (
                    <p className="flex items-center gap-1.5 text-xs text-red-600 font-medium">
                      <AlertCircle size={12} /> {errors.email}
                    </p>
                  )}
                  {touched.email && !errors.email && formData.email && (
                    <p className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                      <CheckCircle size={12} /> {copy.emailValid}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-bold text-slate-700 uppercase tracking-tight">
                    {copy.projectSpec} <span className="text-red-500">*</span>
                  </label>
                  <textarea id="message" name="message" rows={5} value={formData.message}
                    onChange={handleChange} onBlur={handleBlur}
                    className={`${fieldClass('message')} resize-none`}
                    placeholder={copy.messagePlaceholder} />
                  <div className="flex items-start justify-between">
                    <div>
                      {touched.message && errors.message && (
                        <p className="flex items-center gap-1.5 text-xs text-red-600 font-medium">
                          <AlertCircle size={12} /> {errors.message}
                        </p>
                      )}
                    </div>
                    <span className={`text-xs font-medium ${formData.message.length < 20 ? 'text-slate-400' : 'text-emerald-600'}`}>
                      {formData.message.length}/20 {copy.minText}
                    </span>
                  </div>
                </div>

                <button type="submit" disabled={formStatus === 'submitting'}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-5 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-500/30 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed">
                  {formStatus === 'submitting' ? (
                    <span className="flex items-center gap-2 text-lg">
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                      {copy.processing}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-lg">
                      {copy.getQuote} <Send size={22} />
                    </span>
                  )}
                </button>
                <p className="text-center text-xs text-slate-400 font-medium">{copy.privacy}</p>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}