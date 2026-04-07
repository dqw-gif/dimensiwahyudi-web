'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Zap, CheckCircle, AlertTriangle, ArrowDown, Mail, Lock } from 'lucide-react';
import { calculateTotalLoad, checkSafetyStatus, getRecommendation, getSafetyMessage } from '../utils/calculatorLogic';

export default function SmartCalculator() {
  const [weight, setWeight] = useState(50); // kg
  const [frequency, setFrequency] = useState(100); // times/hour
  const [workHours, setWorkHours] = useState(8); // hours
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [startedAt] = useState(() => Date.now());
  const [leadError, setLeadError] = useState('');
  const [leadStatus, setLeadStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isUnlocked, setIsUnlocked] = useState(false);

  const { tons: totalLoadTons } = calculateTotalLoad(weight, frequency, workHours);
  const isDangerous = checkSafetyStatus(totalLoadTons, weight);
  const recommendation = getRecommendation(weight);
  const safetyMessage = getSafetyMessage(isDangerous, weight);

  return (
    <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[1.5rem] md:rounded-[2rem] border border-slate-200 bg-white/90 p-4 sm:p-6 shadow-[0_30px_100px_rgba(15,23,42,0.12)] backdrop-blur-xl md:p-8 lg:p-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.12),transparent_30%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-cyan-200/50 blur-3xl" aria-hidden="true" />

      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[11px] font-black uppercase tracking-[0.22em] text-cyan-700">
              <Zap size={12} />
              Interactive estimator
            </div>
            <h2 className="mt-4 text-2xl sm:text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
              ROI <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">& Ergonomic Workload</span>
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
              Adjust the operational inputs to see how cumulative load, safety status, and handling recommendations shift in real time.
            </p>
          </div>

          <div className="grid min-w-full gap-3 sm:min-w-0 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">Payload</p>
              <p className="mt-1 text-lg font-black text-slate-950">{weight} kg</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">Cycles</p>
              <p className="mt-1 text-lg font-black text-slate-950">{frequency}/hr</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">Shift</p>
              <p className="mt-1 text-lg font-black text-slate-950">{workHours} h</p>
            </div>
          </div>
        </div>

        <div className="mt-6 md:mt-8 grid gap-6 md:gap-8 lg:grid-cols-[1.03fr_0.97fr] lg:gap-10">
          <div className="order-2 lg:order-1 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5 md:p-6">
              <div className="mb-5 flex items-center gap-2">
                <Zap className="text-cyan-600" size={20} />
                <h3 className="text-lg font-black text-slate-950 md:text-xl">Operational parameters</h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-4 rounded-2xl border border-white bg-white p-4 shadow-sm">
                  <div className="flex items-end justify-between gap-4">
                    <label className="text-sm font-bold text-slate-700 md:text-base">Unit material weight (payload)</label>
                    <span className={`font-mono text-2xl font-black transition-colors ${weight > 25 ? 'text-rose-600' : 'text-cyan-600'}`}>
                      {weight} <span className="text-xs font-semibold text-slate-400">kg</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    suppressHydrationWarning
                    className={`w-full appearance-none rounded-full ${weight > 25 ? 'bg-rose-200 accent-rose-600' : 'bg-slate-200 accent-cyan-600'}`}
                  />
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                    <span>0 kg</span>
                    <span className="text-rose-600">Manual safety limit: 25 kg</span>
                    <span>200 kg</span>
                  </div>
                </div>

                <div className="space-y-4 rounded-2xl border border-white bg-white p-4 shadow-sm">
                  <div className="flex items-end justify-between gap-4">
                    <label className="text-sm font-bold text-slate-700 md:text-base">Lifting intensity (cycle time)</label>
                    <span className="font-mono text-2xl font-black text-cyan-600">
                      {frequency} <span className="text-xs font-semibold text-slate-400">times/hour</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={frequency}
                    onChange={(e) => setFrequency(Number(e.target.value))}
                    suppressHydrationWarning
                    className="w-full appearance-none rounded-full bg-slate-200 accent-cyan-600"
                  />
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                    <span>Low</span>
                    <span>High frequency</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-white bg-white p-4 shadow-sm">
                  <label className="mb-3 block text-sm font-bold text-slate-700 md:text-base">Work shift duration</label>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      max="24"
                      value={workHours}
                      onChange={(e) => setWorkHours(Number(e.target.value))}
                      suppressHydrationWarning
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-28 text-lg font-black text-slate-950 outline-none transition focus:border-cyan-500 focus:bg-white"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">hours/day</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">Risk lens</p>
                <p className="mt-2 text-sm font-semibold text-slate-700">Body load accumulation</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">Use case</p>
                <p className="mt-2 text-sm font-semibold text-slate-700">Manual material handling</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">Outcome</p>
                <p className="mt-2 text-sm font-semibold text-slate-700">Solution direction</p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative overflow-hidden rounded-3xl border border-slate-900 bg-slate-950 p-4 sm:p-5 text-white shadow-[0_24px_80px_rgba(15,23,42,0.28)] md:p-6">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.12),transparent_35%)]" aria-hidden="true" />

            <div className={`relative space-y-5 transition-all duration-700 ${!isUnlocked ? 'blur-[8px] opacity-30 select-none pointer-events-none grayscale-[30%]' : ''}`}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">Daily cumulative body load</p>
                <div className="mt-3 flex items-end gap-2">
                  <p className="text-4xl sm:text-5xl font-black tracking-tight md:text-6xl">{totalLoadTons.toFixed(2)}</p>
                  <span className="pb-2 text-lg font-semibold text-cyan-300/80">Ton</span>
                </div>
              </div>

              <div className={`rounded-2xl border p-5 ${isDangerous ? 'border-rose-400/40 bg-rose-500/10' : 'border-emerald-400/40 bg-emerald-500/10'}`}>
                <div className="flex items-start gap-4">
                  {isDangerous ? (
                    <div className="rounded-xl bg-rose-500/20 p-2 text-rose-300">
                      <AlertTriangle size={24} />
                    </div>
                  ) : (
                    <div className="rounded-xl bg-emerald-500/20 p-2 text-emerald-300">
                      <CheckCircle size={24} />
                    </div>
                  )}

                  <div>
                    <h4 className={`text-sm font-black uppercase tracking-[0.18em] ${isDangerous ? 'text-rose-200' : 'text-emerald-200'}`}>
                      {isDangerous ? 'Warning: ergonomic overload' : 'Status: safe'}
                    </h4>
                    <p className={`mt-2 text-sm leading-relaxed ${isDangerous ? 'text-rose-100/80' : 'text-emerald-100/80'}`}>
                      {safetyMessage}
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-slate-900 to-slate-950 p-5 shadow-inner">
                <div className="absolute -right-12 -bottom-12 h-40 w-40 rounded-full bg-cyan-500/15 blur-3xl" aria-hidden="true" />
                <h4 className="relative text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">Recommended handling solution</h4>
                <p className="relative mt-3 text-xl font-black leading-tight text-white md:text-2xl">
                  {recommendation.label}
                </p>
                <Link href={recommendation.productUrl} className="relative mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-slate-950 transition-transform hover:-translate-y-0.5 hover:bg-cyan-400">
                  View Product <ArrowDown size={16} />
                </Link>
              </div>
            </div>

            {!isUnlocked && (
              <div className="absolute inset-0 z-20 flex items-center justify-center p-3 sm:p-5">
                <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-slate-950/95 p-4 sm:p-6 text-center shadow-2xl backdrop-blur-md">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">
                    <Lock size={20} className="text-white" />
                  </div>
                  <h4 className="text-xl sm:text-2xl font-black tracking-tight text-white">Unlock full analysis</h4>
                  <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed text-slate-400">
                    Use your corporate contact details so our engineers can send recommendations aligned with your facility context.
                  </p>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      if (!email || !fullName || !company) return;
                      setLeadStatus('loading');
                      setLeadError('');
                      try {
                        const res = await fetch('/api/lead-capture', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            kind: 'roi_unlock',
                            fullName,
                            company,
                            email,
                            honeypot,
                            startedAt,
                            context: {
                              weight_kg: weight,
                              frequency_per_hr: frequency,
                              hours_per_day: workHours,
                              total_load_tons: totalLoadTons.toFixed(2),
                              status: isDangerous ? 'DANGEROUS' : 'SAFE',
                              recommendation: recommendation.label,
                            },
                          }),
                        });
                        if (res.ok) {
                          setLeadStatus('success');
                          setIsUnlocked(true);
                          if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
                            window.gtag('event', 'generate_lead', { event_category: 'Calculator', event_label: 'ROI Request' });
                            window.gtag('event', 'lead_funnel_step1_complete', {
                              event_category: 'LeadFunnel',
                              event_label: 'ROI Unlock Form',
                            });
                          }
                        } else {
                          const payload = await res.json().catch(() => ({}));
                          setLeadError(typeof payload?.error === 'string' ? payload.error : 'Failed to unlock. Please try again.');
                          setLeadStatus('error');
                        }
                      } catch (err) {
                        setLeadError('Failed to unlock. Please try again.');
                        setLeadStatus('error');
                      }
                    }}
                    className="mt-6 flex flex-col gap-3"
                  >
                    <input
                      type="text"
                      required
                      placeholder="Full name (PIC)"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:bg-white/10"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Company or plant name"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:bg-white/10"
                    />
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:bg-white/10"
                    />
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
                      disabled={leadStatus === 'loading'}
                      className="inline-flex items-center justify-center rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-black uppercase tracking-[0.18em] text-slate-950 transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {leadStatus === 'loading' ? 'Unlocking...' : 'Unlock engineered results'}
                    </button>
                  </form>
                  {leadStatus === 'error' && <p className="mt-3 text-xs font-medium text-rose-300">{leadError || 'Failed to unlock. Please try again.'}</p>}
                  <p className="mt-4 flex items-center justify-center gap-1 text-[10px] uppercase tracking-[0.18em] text-slate-500">
                    <Lock size={10} /> Secure and confidential calculation
                  </p>
                </div>
              </div>
            )}

            {isUnlocked && (
              <div className="relative mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-emerald-100">
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="mt-0.5 shrink-0 text-emerald-300" />
                  <div className="text-sm">
                    <p className="font-bold text-emerald-100">Analysis unlocked successfully</p>
                    <p className="mt-1 text-xs leading-relaxed text-emerald-100/75">
                      Our engineering team has sent a copy of these recommendations to <span className="font-semibold text-emerald-200">{email}</span>.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}