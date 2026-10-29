'use client';

import { useState, useId } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  TrendingUp,
  Scale,
  Clock,
  Users,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  FileSpreadsheet,
  Info,
  Check,
} from 'lucide-react';
import { calculateErgonomicsAndROI } from '../utils/calculatorLogic';
import { useLanguage } from '@/components/LanguageProvider';

export default function SmartCalculator() {
  const { lang } = useLanguage();
  const isId = lang === 'id';

  const [weight, setWeight] = useState(45); // kg
  const [frequency, setFrequency] = useState(80); // cycles/hour
  const [workHours, setWorkHours] = useState(8); // hours/day
  const [operatorCount, setOperatorCount] = useState(2); // operators on line
  const [activeTab, setActiveTab] = useState<'ergonomics' | 'financial'>('ergonomics');

  // Consultation modal / lead form state
  const [showConsultForm, setShowConsultForm] = useState(false);
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [startedAt] = useState(() => Date.now());
  const [leadError, setLeadError] = useState('');
  const [leadStatus, setLeadStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const weightInputId = useId();
  const freqInputId = useId();
  const hoursInputId = useId();
  const operatorInputId = useId();

  const calc = calculateErgonomicsAndROI(weight, frequency, workHours, operatorCount, lang);

  // Currency formatter
  const formatIDR = (value: number) => {
    return `IDR ${value.toLocaleString('en-US')}`;
  };

  const handleSubmitLead = async (e: React.FormEvent) => {
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
            operator_count: operatorCount,
            total_load_tons: calc.dailyTotalTons.toFixed(2),
            annual_load_tons: calc.annualTotalTons.toFixed(1),
            status: calc.riskLevel,
            recommendation: `${calc.recommendation.title} (${calc.recommendation.series})`,
            annual_medical_saving: formatIDR(calc.annualMedicalSavingRp),
            payback_period: calc.paybackPeriodMonths,
          },
        }),
      });

      if (res.ok) {
        setLeadStatus('success');
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
          window.gtag('event', 'generate_lead', {
            event_category: 'Calculator',
            event_label: 'ROI Technical Request',
          });
          window.gtag('event', 'lead_funnel_step1_complete', {
            event_category: 'LeadFunnel',
            event_label: 'ROI Form Completed',
          });
        }
      } else {
        const payload = await res.json().catch(() => ({}));
        setLeadError(
          typeof payload?.error === 'string'
            ? payload.error
            : isId
            ? 'Gagal mengirim formulir. Silakan coba lagi.'
            : 'Failed to submit form. Please try again.'
        );
        setLeadStatus('error');
      }
    } catch {
      setLeadError(
        isId
          ? 'Kendala koneksi jaringan. Silakan periksa koneksi internet Anda.'
          : 'Network connection issue. Please verify your connection.'
      );
      setLeadStatus('error');
    }
  };

  const riskLabelDisplay =
    calc.riskLevel === 'CRITICAL'
      ? isId
        ? 'KRITIS'
        : 'CRITICAL'
      : calc.riskLevel === 'WARNING'
      ? isId
        ? 'WASPADA'
        : 'WARNING'
      : isId
      ? 'AMAN'
      : 'COMPLIANT';

  return (
    <div className="w-full bg-white/75 backdrop-blur-2xl backdrop-saturate-150 border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_20px_50px_-12px_rgba(0,85,150,0.10),inset_0_1px_0_0_rgba(255,255,255,0.95)] rounded-3xl p-4 sm:p-6 lg:p-8">
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-200/80">
        <div className="space-y-1.5">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-[#005596]/15 shadow-xs">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#005596]">
              {isId
                ? 'Instrumen Analisis Teknik Ergonomi & ROI Finansial'
                : 'Ergonomic Engineering & Financial Analysis Instrument'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed font-normal">
            {isId
              ? 'Atur parameter lini produksi di bawah ini untuk mensimulasikan beban tekan cakram tulang belakang dan estimasi waktu balik modal ROI (standar ISO 11228-1 dan K3 industri).'
              : 'Adjust line parameters below to simulate spinal biomechanical disc compression and return-on-investment timelines (ISO 11228-1 and occupational safety standards).'}
          </p>
        </div>

        {/* Live Metric Pills */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="bg-white/90 backdrop-blur-xl border border-white/95 ring-1 ring-[#005596]/12 shadow-xs px-4 py-2 rounded-2xl text-left">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
              {isId ? 'Total Harian' : 'Daily Total'}
            </span>
            <span className="text-base sm:text-lg font-mono font-black text-slate-900 tracking-tight">
              {calc.dailyTotalTons.toFixed(2)}{' '}
              <span className="text-xs font-sans font-medium text-slate-600">{isId ? 'Ton' : 'Tons'}</span>
            </span>
          </div>
          <div className="bg-white/90 backdrop-blur-xl border border-white/95 ring-1 ring-[#005596]/12 shadow-xs px-4 py-2 rounded-2xl text-left">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
              {isId ? 'Status Keamanan' : 'Safety Status'}
            </span>
            <span
              className={`text-base sm:text-lg font-mono font-black flex items-center gap-1 tracking-tight ${
                calc.riskLevel === 'CRITICAL'
                  ? 'text-red-600'
                  : calc.riskLevel === 'WARNING'
                  ? 'text-amber-600'
                  : 'text-emerald-700'
              }`}
            >
              {riskLabelDisplay}
            </span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Industrial Workbench */}
      <div className="mt-8 grid lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Operational Parameters (Inputs) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600">
              {isId ? 'Parameter Operasional Lini' : 'Operational Line Parameters'}
            </span>
            <span className="text-xs text-slate-600">
              {isId ? 'Geser slider untuk mengubah variabel' : 'Drag sliders to modify variables'}
            </span>
          </div>

          {/* Input 1: Payload Weight */}
          <div className="bg-white border border-slate-200 p-4 sm:p-5 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor={weightInputId} className="flex items-center gap-2 text-sm font-bold text-slate-800">
                <Scale className="w-4 h-4 text-[#005596]" />
                <span>{isId ? 'Berat Material (Payload)' : 'Workpiece Weight (Payload)'}</span>
              </label>
              <span className={`font-mono text-xl sm:text-2xl font-bold ${weight > 25 ? 'text-red-600' : 'text-[#005596]'}`}>
                {weight} <span className="text-xs font-medium text-slate-600">kg</span>
              </span>
            </div>

            <input
              id={weightInputId}
              type="range"
              min="5"
              max="250"
              step="5"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              aria-label="Workpiece weight in kilograms"
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#005596]"
            />

            <div className="flex justify-between items-center text-[11px] font-mono text-slate-600">
              <span>5 kg</span>
              <span className={`font-sans font-semibold flex items-center gap-1 ${weight > 25 ? 'text-red-600' : 'text-slate-600'}`}>
                {weight > 25 && <AlertTriangle className="w-3 h-3 text-red-600" />}
                {isId ? 'Batas Aman Angkat Manual: 25 kg' : 'Safe Manual Lifting Threshold: 25 kg'}
              </span>
              <span>250 kg</span>
            </div>
          </div>

          {/* Input 2: Lifting Frequency */}
          <div className="bg-white border border-slate-200 p-4 sm:p-5 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor={freqInputId} className="flex items-center gap-2 text-sm font-bold text-slate-800">
                <Clock className="w-4 h-4 text-[#005596]" />
                <span>{isId ? 'Frekuensi Angkat (Cycle Rate)' : 'Lifting Frequency'}</span>
              </label>
              <span className="font-mono text-xl sm:text-2xl font-bold text-[#005596]">
                {frequency} <span className="text-xs font-medium text-slate-600">{isId ? 'siklus/jam' : 'cycles/hour'}</span>
              </span>
            </div>

            <input
              id={freqInputId}
              type="range"
              min="10"
              max="300"
              step="10"
              value={frequency}
              onChange={(e) => setFrequency(Number(e.target.value))}
              aria-label="Lifting frequency in cycles per hour"
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#005596]"
            />

            <div className="flex justify-between items-center text-[11px] font-mono text-slate-600">
              <span>{isId ? '10 siklus/jam (Ringan)' : '10 cycles/hr (Intermittent)'}</span>
              <span>{isId ? '150 (Padat)' : '150 (Dense)'}</span>
              <span>{isId ? '300 (Lini Cepat)' : '300 (High-Speed Line)'}</span>
            </div>
          </div>

          {/* Dual Row: Shift Hours & Operator Count */}
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Shift Duration */}
            <div className="bg-white border border-slate-200 p-4 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor={hoursInputId} className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-600" />
                  <span>{isId ? 'Durasi Kerja' : 'Shift Duration'}</span>
                </label>
                <span className="font-mono text-lg font-bold text-slate-900">
                  {workHours} {isId ? 'Jam' : 'Hours'}
                </span>
              </div>
              <input
                id={hoursInputId}
                type="range"
                min="4"
                max="16"
                step="1"
                value={workHours}
                onChange={(e) => setWorkHours(Number(e.target.value))}
                aria-label="Work shift duration in hours"
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#005596]"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-600">
                <span>{isId ? '4 Jam' : '4 Hours'}</span>
                <span>{isId ? '8 Jam (1 Shift)' : '8 Hours (1 Shift)'}</span>
                <span>{isId ? '16 Jam (2 Shift)' : '16 Hours (2 Shifts)'}</span>
              </div>
            </div>

            {/* Operator Count */}
            <div className="bg-white border border-slate-200 p-4 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor={operatorInputId} className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-600" />
                  <span>{isId ? 'Operator Lini' : 'Line Operators'}</span>
                </label>
                <span className="font-mono text-lg font-bold text-slate-900">
                  {operatorCount} {isId ? 'Orang' : 'Crew'}
                </span>
              </div>
              <input
                id={operatorInputId}
                type="range"
                min="1"
                max="8"
                step="1"
                value={operatorCount}
                onChange={(e) => setOperatorCount(Number(e.target.value))}
                aria-label="Number of line operators"
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#005596]"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-600">
                <span>{isId ? '1 Orang' : '1 Crew'}</span>
                <span>{isId ? '4 Orang' : '4 Crew'}</span>
                <span>{isId ? '8 Orang' : '8 Crew'}</span>
              </div>
            </div>
          </div>

          {/* Regulatory Note */}
          <div className="p-3 bg-slate-100 border border-slate-200 rounded-xl flex items-start gap-2.5 text-xs text-slate-600">
            <Info className="w-4 h-4 text-[#005596] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>{isId ? 'Acuan Standar K3:' : 'Occupational Standard Reference:'}</strong>{' '}
              {isId ? (
                <>
                  ISO 11228-1 dan pedoman K3 industri menetapkan bahwa pengangkatan manual tanpa alat bantu tidak boleh melebihi{' '}
                  <strong>25 kg</strong> pada kondisi ergonomi ideal.
                </>
              ) : (
                <>
                  ISO 11228-1 and national industrial guidelines specify that unassisted manual lifting must not exceed{' '}
                  <strong>25 kg</strong> under optimal ergonomic conditions.
                </>
              )}
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Engineering Results & Simulation Tabs */}
        <div className="lg:col-span-6 space-y-6">
          {/* Tab Selector */}
          <div className="flex bg-slate-100/90 p-1 rounded-full border border-slate-200/80">
            <button
              onClick={() => setActiveTab('ergonomics')}
              className={`flex-1 py-2.5 px-4 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'ergonomics'
                  ? 'bg-[#005596] text-white shadow-[0_2px_8px_rgba(0,85,150,0.25)]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isId ? 'Analisis Ergonomi & Medis' : 'Ergonomic & Medical Analysis'}</span>
            </button>
            <button
              onClick={() => setActiveTab('financial')}
              className={`flex-1 py-2.5 px-4 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'financial'
                  ? 'bg-[#005596] text-white shadow-[0_2px_8px_rgba(0,85,150,0.25)]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>{isId ? 'Simulasi Finansial (ROI)' : 'Financial Simulation (ROI)'}</span>
            </button>
          </div>

          {/* TAB 1: ERGONOMICS & MEDICAL ANALYSIS */}
          {activeTab === 'ergonomics' && (
            <div className="space-y-4">
              {/* Primary Ergonomic Card */}
              <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-4">
                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-600 block">
                      {isId ? 'Akumulasi Beban Harian' : 'Daily Cumulative Load'}
                    </span>
                    <span className="text-2xl sm:text-3xl font-mono font-bold text-slate-900">
                      {calc.dailyTotalTons.toFixed(2)}
                      <span className="text-sm font-sans font-medium text-slate-600 ml-1">
                        {isId ? 'Ton/hari' : 'Tons/day'}
                      </span>
                    </span>
                    <span className="text-[11px] text-slate-600 block mt-0.5">
                      ({calc.dailyPerOperatorTons.toFixed(2)} {isId ? 'Ton per operator' : 'Tons per operator'})
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-600 block">
                      {isId ? 'Akumulasi Beban Tahunan' : 'Annual Cumulative Load'}
                    </span>
                    <span className="text-2xl sm:text-3xl font-mono font-bold text-slate-900">
                      {calc.annualTotalTons.toFixed(1)}
                      <span className="text-sm font-sans font-medium text-slate-600 ml-1">
                        {isId ? 'Ton/tahun' : 'Tons/year'}
                      </span>
                    </span>
                    <span className="text-[11px] text-slate-600 block mt-0.5">
                      {isId ? '(Asumsi 250 hari kerja aktif)' : '(Assuming 250 active operating days)'}
                    </span>
                  </div>
                </div>

                {/* Biomechanical Spine Pressure Comparison (AGR e.V. Validated) */}
                <div className="pt-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">
                      {isId
                        ? 'Gaya Tekan pada Cakram Tulang Belakang L4/L5 per Angkatan:'
                        : 'Compressive Force on Intervertebral Disc L4/L5 per Lift:'}
                    </span>
                    <span className="text-[11px] font-mono text-[#005596] font-semibold">
                      {isId ? 'Validasi Medis AGR Jerman' : 'German AGR Validation'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="p-3 bg-red-50/70 border border-red-200/80 rounded-xl">
                      <span className="text-[11px] font-medium text-red-700 block">
                        {isId ? 'Manual (Tanpa Alat)' : 'Manual (Unassisted)'}
                      </span>
                      <span className="text-xl font-mono font-bold text-red-700 block mt-1">
                        ~{calc.spineCompressionManualKg} kg
                      </span>
                      <span className="text-[10px] text-red-600 block mt-0.5">
                        {isId ? 'Tekanan kompresi berisiko tinggi' : 'Destructive compression force'}
                      </span>
                    </div>

                    <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl">
                      <span className="text-[11px] font-medium text-emerald-800 block">
                        {isId ? 'Dengan Schmalz atau Binar' : 'With Schmalz or Binar'}
                      </span>
                      <span className="text-xl font-mono font-bold text-emerald-700 block mt-1">
                        0 kg
                      </span>
                      <span className="text-[10px] text-emerald-600 block mt-0.5">
                        {isId ? '100% beban ditahan sistem vakum/servo' : '100% sustained by vacuum tube'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Safety Assessment Alert Box */}
                <div
                  className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                    calc.riskLevel === 'CRITICAL'
                      ? 'bg-red-50 border-red-200 text-red-900'
                      : calc.riskLevel === 'WARNING'
                      ? 'bg-amber-50 border-amber-200 text-amber-900'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  }`}
                >
                  {calc.riskLevel === 'CRITICAL' ? (
                    <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  ) : calc.riskLevel === 'WARNING' ? (
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                  <div className="text-xs leading-relaxed">
                    <span className="font-bold uppercase tracking-wider block mb-0.5">
                      {isId ? 'Evaluasi Keamanan:' : 'Safety Evaluation:'}{' '}
                      {calc.riskLevel === 'CRITICAL'
                        ? isId
                          ? 'Beban Kritis (Risiko Tinggi Cedera Tulang Belakang)'
                          : 'Critical Load (High Spinal Injury Risk)'
                        : calc.riskLevel === 'WARNING'
                        ? isId
                          ? 'Peringatan Kelelahan Otot Kronis'
                          : 'Chronic Muscular Fatigue Warning'
                        : isId
                        ? 'Dalam Batas Ergonomi Aman'
                        : 'Within Ergonomic Limits'}
                    </span>
                    <p>{calc.safetyMessage}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FINANCIAL & ROI SIMULATION */}
          {activeTab === 'financial' && (
            <div className="space-y-4">
              {/* Financial Metrics Card */}
              <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-4">
                <div className="grid sm:grid-cols-2 gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-600 block">
                      {isId ? 'Penghematan Biaya Cedera & Absensi' : 'Annual Injury & Sickness Savings'}
                    </span>
                    <span className="text-xl sm:text-2xl font-mono font-bold text-emerald-700">
                      {formatIDR(calc.annualMedicalSavingRp)}
                    </span>
                    <span className="text-[11px] text-slate-600 block mt-0.5">
                      {isId
                        ? `per tahun (${calc.operatorCount} operator)`
                        : `per year (${calc.operatorCount} operators)`}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-600 block">
                      {isId ? 'Estimasi Waktu Balik Modal (ROI)' : 'Projected Payback Period'}
                    </span>
                    <span className="text-xl sm:text-2xl font-mono font-bold text-[#005596]">
                      {calc.paybackPeriodMonths}
                    </span>
                    <span className="text-[11px] text-slate-600 block mt-0.5">
                      {isId
                        ? 'berdasarkan efisiensi jam kerja dan throughput'
                        : 'based on labor recovery and throughput'}
                    </span>
                  </div>
                </div>

                {/* Productivity Boost Metrics */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
                    <span className="text-[11px] font-medium text-slate-600 block">
                      {isId ? 'Kenaikan Throughput' : 'Throughput Increase'}
                    </span>
                    <span className="text-xl font-mono font-bold text-slate-900 block mt-1">
                      +{calc.throughputGainPercent}%
                    </span>
                    <span className="text-[10px] text-slate-600 block mt-0.5">
                      {isId ? 'Kecepatan stabil hingga akhir shift' : 'Consistent pace through shift end'}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
                    <span className="text-[11px] font-medium text-slate-600 block">
                      {isId ? 'Tambahan Output / Hari' : 'Additional Output / Day'}
                    </span>
                    <span className="text-xl font-mono font-bold text-slate-900 block mt-1">
                      +{calc.addedCyclesDaily.toLocaleString('en-US')}
                    </span>
                    <span className="text-[10px] text-slate-600 block mt-0.5">
                      {isId ? 'Siklus angkat ekstra per hari' : 'Additional completed lift cycles'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-blue-50/60 border border-blue-200/70 rounded-xl text-xs text-slate-700 leading-relaxed">
                  <strong>{isId ? 'Catatan Metodologi:' : 'Methodology Note:'}</strong>{' '}
                  {isId
                    ? 'Estimasi dihitung berdasarkan pengurangan 5 hingga 8 hari izin sakit per operator tiap tahun akibat keluhan nyeri punggung bawah, penghapusan biaya lembur pengganti, serta kestabilan cycle time per jam.'
                    : 'Estimates modeled on recovering 5 to 8 sick days per operator annually from lower back pain complaints, eliminating overtime backfill, and maintaining hourly cycle consistency.'}
                </div>
              </div>
            </div>
          )}

          {/* Machine Recommendation Block */}
          <div className="bg-gradient-to-br from-[#002244] via-[#003b6d] to-[#005596] text-white p-6 rounded-2xl sm:rounded-3xl border border-white/20 space-y-4 shadow-[0_16px_36px_-10px_rgba(0,85,150,0.35),inset_0_1px_0_0_rgba(255,255,255,0.25)] relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-100 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                {isId ? 'Rekomendasi Sistem Alat Angkat' : 'Recommended Equipment Solution'}
              </span>
              <span className="text-xs text-blue-100 font-mono">
                {isId ? `Sesuai payload ${weight} kg` : `Matched to ${weight} kg payload`}
              </span>
            </div>

            <div>
              <div className="text-xs font-mono font-bold text-blue-200 uppercase tracking-wider">
                {calc.recommendation.series}
              </div>
              <h4 className="text-xl sm:text-2xl font-black text-white mt-1 tracking-tight">
                {calc.recommendation.title}
              </h4>
              <p className="text-xs sm:text-sm text-blue-100/90 mt-2 leading-relaxed font-normal">
                {calc.recommendation.description}
              </p>
            </div>

            <div className="pt-3 border-t border-white/20 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="text-xs text-blue-100 flex items-center gap-1.5 font-medium">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{calc.recommendation.keyFeature}</span>
              </div>

              <Link
                href={calc.recommendation.productUrl}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-blue-50 text-[#005596] text-xs font-bold shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all shrink-0 cursor-pointer"
              >
                <span>{isId ? 'Spesifikasi Produk' : 'Product Specifications'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Call to Action: Official Study / Lead Request */}
          <div className="bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] p-6 rounded-2xl sm:rounded-3xl text-left space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="text-base font-black text-slate-900 tracking-tight">
                  {isId
                    ? 'Butuh Studi Kelayakan Pabrik & Simulasi Layout CAD 3D?'
                    : 'Require a Formal Plant Feasibility Study & 3D CAD Simulation?'}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed font-normal">
                  {isId
                    ? 'Tim engineer aplikasi PT Dimensi Quantum Wahyudi siap mengevaluasi layout area kerja Anda, menyiapkan unit trial onsite, dan menyusun gambar kerja CAD 3D sesuai kebutuhan.'
                    : 'Dimensi Quantum Wahyudi application engineers analyze your floor layout, provide lifting trial rigs, and deliver custom CAD drawings without commitment.'}
                </p>
              </div>
            </div>

            {!showConsultForm && leadStatus !== 'success' && (
              <button
                onClick={() => setShowConsultForm(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#005596] hover:bg-[#004276] text-white rounded-full text-xs sm:text-sm font-bold shadow-[0_4px_16px_rgba(0,85,150,0.25)] hover:shadow-[0_8px_24px_rgba(0,85,150,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>{isId ? 'Ajukan Studi Kelayakan Pabrik' : 'Request Plant Feasibility Study'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {showConsultForm && leadStatus !== 'success' && (
              <form onSubmit={handleSubmitLead} className="pt-3 border-t border-slate-200/80 space-y-3">
                <div className="grid sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    placeholder={isId ? 'Nama Lengkap (PIC)' : 'Full Name (Lead PIC)'}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200/90 focus:outline-none focus:border-[#005596] focus:ring-2 focus:ring-[#005596]/15 bg-white text-slate-900 transition-all"
                  />
                  <input
                    type="text"
                    required
                    placeholder={isId ? 'Nama Perusahaan / Pabrik' : 'Company / Plant Name'}
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200/90 focus:outline-none focus:border-[#005596] focus:ring-2 focus:ring-[#005596]/15 bg-white text-slate-900 transition-all"
                  />
                  <input
                    type="email"
                    required
                    placeholder="corporate.email@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200/90 focus:outline-none focus:border-[#005596] focus:ring-2 focus:ring-[#005596]/15 bg-white text-slate-900 transition-all"
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
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  <p className="text-[11px] text-slate-500 font-normal">
                    {isId
                      ? 'Data Anda dijaga kerahasiaannya khusus untuk evaluasi engineering B2B internal.'
                      : 'Your details are held strictly confidential for internal B2B engineering evaluation.'}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowConsultForm(false)}
                      className="px-3.5 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                    >
                      {isId ? 'Batal' : 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      disabled={leadStatus === 'loading'}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#005596] hover:bg-[#004276] text-white rounded-full text-xs font-bold shadow-[0_4px_16px_rgba(0,85,150,0.25)] hover:shadow-[0_8px_24px_rgba(0,85,150,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {leadStatus === 'loading'
                        ? isId
                          ? 'Mengirim...'
                          : 'Submitting...'
                        : isId
                        ? 'Kirim Permintaan'
                        : 'Submit Request'}
                    </button>
                  </div>
                </div>

                {leadStatus === 'error' && <p className="text-xs text-red-600 font-medium">{leadError}</p>}
              </form>
            )}

            {leadStatus === 'success' && (
              <div className="p-4 bg-emerald-50/90 border border-emerald-200 rounded-2xl text-xs text-emerald-800 flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-sm">
                    {isId ? 'Permintaan Studi Kelayakan Diterima' : 'Feasibility Study Request Received'}
                  </span>
                  <p className="mt-1 text-emerald-700 leading-relaxed font-normal">
                    {isId ? (
                      <>
                        Tim engineer aplikasi kami akan mengirimkan dokumen kalkulasi teknis serta jadwal survei ke{' '}
                        <strong>{email}</strong>.
                      </>
                    ) : (
                      <>
                        Our application engineering team will send the technical calculation dossier and scheduling options to{' '}
                        <strong>{email}</strong>.
                      </>
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
