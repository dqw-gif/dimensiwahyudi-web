'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Zap, CheckCircle, AlertTriangle, ArrowDown, Mail } from 'lucide-react';
import { calculateTotalLoad, checkSafetyStatus, getRecommendation, getSafetyMessage } from '../utils/calculatorLogic';

export default function SmartCalculator() {
  const [weight, setWeight] = useState(50); // kg
  const [frequency, setFrequency] = useState(100); // times/hour
  const [workHours, setWorkHours] = useState(8); // hours
  const [email, setEmail] = useState('');
  const [leadStatus, setLeadStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const { tons: totalLoadTons } = calculateTotalLoad(weight, frequency, workHours);
  const isDangerous = checkSafetyStatus(totalLoadTons, weight);
  const recommendation = getRecommendation(weight);
  const safetyMessage = getSafetyMessage(isDangerous, weight);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 md:p-8 bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-blue-900/20 relative overflow-hidden">

      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center tracking-tight">
        Calculator <span className="text-cyan-400">ROI & Ergonomic Workload</span>
      </h2>
      <p className="text-slate-400 text-center mb-10 max-w-2xl mx-auto">
        Analyze risks <span className="text-slate-200">manual material handling</span> in your production line. Calculate cumulative daily load to reduce spinal injury risk and improve workplace safety standards.
      </p>

      <div className="grid md:grid-cols-2 gap-12">

        {/* Left Side - Inputs */}
        <div className="space-y-8">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="text-cyan-400" size={24} />
            <h3 className="text-2xl font-bold text-white">
              Operational Parameters
            </h3>
          </div>

          {/* Material Weight Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <label className="text-slate-300 font-medium text-lg">
                Unit Material Weight (Payload)
              </label>
              <span className={`font-bold text-2xl font-mono transition-colors ${weight > 25 ? 'text-red-400' : 'text-cyan-400'}`}>
                {weight} <span className="text-sm text-slate-500">kg</span>
              </span>
            </div>
            <div className="py-2"> {/* Added padding for better mobile touch area */}
              <input
                type="range"
                min="0"
                max="200"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                suppressHydrationWarning
                className={`w-full h-4 md:h-2 rounded-lg appearance-none cursor-pointer transition-all ${weight > 25 ? 'bg-red-500/30 accent-red-500' : 'bg-slate-700 accent-cyan-500'
                  }`}
              />
            </div>
            <div className="flex justify-between text-slate-500 text-xs font-mono uppercase">
              <span>0 kg</span>
              <span className="text-red-500 font-bold italic">Manual Safety Limit: 25kg</span>
              <span>200 kg</span>
            </div>
          </div>

          {/* Lifting Frequency Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <label className="text-slate-300 font-medium text-lg">
                Lifting Intensity (Cycle Time)
              </label>
              <span className="text-cyan-400 font-bold text-2xl font-mono">
                {frequency} <span className="text-sm text-slate-500">times/hour</span>
              </span>
            </div>
            <div className="py-2"> {/* Added padding for better mobile touch area */}
              <input
                type="range"
                min="0"
                max="500"
                value={frequency}
                onChange={(e) => setFrequency(Number(e.target.value))}
                suppressHydrationWarning
                className="w-full h-4 md:h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500 hover:accent-cyan-400 transition-all"
              />
            </div>
            <div className="flex justify-between text-slate-500 text-xs font-mono uppercase">
              <span>Low</span>
              <span>High Cycles (High Frequency)</span>
            </div>
          </div>

          {/* Work Hours Input */}
          <div className="space-y-3">
            <label className="text-slate-300 font-medium text-lg block">
              Work Shift Duration
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                max="24"
                value={workHours}
                onChange={(e) => setWorkHours(Number(e.target.value))}
                suppressHydrationWarning
                className="w-full px-4 py-3 bg-slate-800/50 text-white text-xl font-bold rounded-lg border border-white/10 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">Hours/Day</span>
            </div>
          </div>
        </div>

        {/* Right Side - Results */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle className="text-blue-500" size={24} />
            <h3 className="text-2xl font-bold text-white">
              Safety Analysis Results
            </h3>
          </div>

          {/* Total Load Display */}
          <div className="bg-slate-800/50 p-6 rounded-xl border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-cyan-500/10 to-transparent" />
            <p className="text-slate-400 text-sm mb-2 uppercase tracking-wider font-semibold">Daily Cumulative Body Load</p>
            <p className="text-5xl md:text-6xl font-black text-white tracking-tight">
              {totalLoadTons.toFixed(2)}
              <span className="text-2xl ml-2 text-cyan-500/70 font-medium">Ton</span>
            </p>
          </div>

          {/* Safety Status */}
          <div className={`p-5 rounded-xl border transition-all duration-300 ${isDangerous
            ? 'bg-red-500/10 border-red-500/50'
            : 'bg-emerald-500/10 border-emerald-500/50'
            }`}>
            <div className="flex items-start gap-4">
              {isDangerous ? (
                <div className="p-2 bg-red-500/20 rounded-lg text-red-500">
                  <AlertTriangle size={28} />
                </div>
              ) : (
                <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-500">
                  <CheckCircle size={28} />
                </div>
              )}

              <div>
                <h4 className={`font-bold text-lg mb-1 tracking-wide ${isDangerous ? 'text-red-400' : 'text-emerald-400'
                  }`}>
                    {isDangerous ? 'WARNING: ERGONOMIC OVERLOAD' : 'STATUS: SAFE'}
                </h4>
                <p className={`text-sm leading-relaxed ${isDangerous ? 'text-red-200/70' : 'text-emerald-200/70'
                  }`}>
                  {safetyMessage}
                </p>
              </div>
            </div>
          </div>

          {/* Recommendation Card */}
          <div className="bg-gradient-to-br from-blue-900/40 to-slate-900 p-6 rounded-xl border border-blue-500/30 relative overflow-hidden shadow-inner">
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl" />

            <h4 className="text-cyan-400 font-bold text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
              Recommended Handling Solution
            </h4>
            <p className="text-white text-lg md:text-xl font-bold leading-tight z-10 relative mb-6">
              {recommendation.label}
            </p>

            <Link href={recommendation.productUrl} className="block w-full text-center bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-6 rounded-lg transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-600/50 z-10 relative flex items-center justify-center gap-2 uppercase text-sm tracking-wide">
              View Product <ArrowDown size={18} />
            </Link>
          </div>

          {/* Lead Capture Form */}
          <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700/50 mt-6 shadow-inner">
            <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
              <Mail size={16} className="text-cyan-400" />
              Get Detailed Safety & ROI Report
            </h4>
            <p className="text-slate-400 text-xs mb-4">
              Enter your corporate email to receive a customized engineering report based on these parameters.
            </p>

            {leadStatus === 'success' ? (
              <div className="bg-emerald-500/20 text-emerald-300 p-3 rounded-lg text-sm flex items-center gap-2 border border-emerald-500/30">
                <CheckCircle size={16} /> Request Received! Our engineer will follow up shortly.
              </div>
            ) : (
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
                        subject: '💡 ROI Calculator Lead',
                        email: email,
                        weight_kg: weight,
                        frequency_per_hr: frequency,
                        hours_per_day: workHours,
                        total_load_tons: totalLoadTons.toFixed(2),
                        status: isDangerous ? 'DANGEROUS' : 'SAFE',
                        recommendation: recommendation.label
                      })
                    });
                    if (res.ok) {
                      setLeadStatus('success');
                      if (typeof window !== 'undefined' && (window as any).gtag) {
                        (window as any).gtag('event', 'generate_lead', { event_category: 'Calculator', event_label: 'ROI Request' });
                      }
                    } else {
                      setLeadStatus('error');
                    }
                  } catch (err) {
                    setLeadStatus('error');
                  }
                }}
                className="flex gap-2"
              >
                <input 
                  type="email" 
                  required
                  placeholder="name@company.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
                <button 
                  type="submit" 
                  disabled={leadStatus === 'loading'}
                  className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-4 py-2 rounded-lg text-sm transition-colors whitespace-nowrap disabled:opacity-50"
                >
                  {leadStatus === 'loading' ? 'Sending...' : 'Send Report'}
                </button>
              </form>
            )}
            {leadStatus === 'error' && <p className="text-red-400 text-xs mt-2">Failed to send request. Please try again.</p>}
          </div>

        </div>
      </div>
    </div>
  );
}