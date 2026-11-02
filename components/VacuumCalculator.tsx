"use client";

import React from 'react';
import {
  Share2, Timer,
  Wind, Activity, Cloud, ChevronLeft, ChevronDown,
  Info, Check, Gauge
} from 'lucide-react';
import { CustomIcons } from './icons/VacuumIcons';
import { UNITS, MENU_ITEMS } from '../constants/calculatorData';
import { useVacuumCalculator } from '../hooks/useVacuumCalculator';
import { useLanguage } from '@/components/LanguageProvider';

import { GlassCard } from './vacuum-calculator/GlassCard';
import { TechInput } from './vacuum-calculator/TechInput';
import { SelectField } from './vacuum-calculator/SelectField';
import { ResultDisplay } from './vacuum-calculator/ResultDisplay';
import PreFooterCTA from '@/components/PreFooterCTA';

// --- MODULE WRAPPER (defined outside component to avoid remount on every render) ---
interface ModuleWrapperProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  backLabel: string;
  onBack: () => void;
}

const ModuleWrapper = ({ children, title, subtitle, backLabel, onBack }: ModuleWrapperProps) => (
  <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 animate-in slide-in-from-bottom-4 duration-500">
    <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 mb-8">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/90 hover:bg-white border border-slate-200/90 hover:border-[#005596]/40 shadow-xs hover:shadow-md text-xs font-mono font-bold uppercase tracking-wider text-slate-700 hover:text-[#005596] transition-all group"
      >
        <div className="p-1 rounded-full bg-slate-100 group-hover:bg-[#005596] group-hover:text-white transition-all text-slate-500">
          <ChevronLeft size={14} />
        </div>
        <span>{backLabel}</span>
      </button>

      <div className="text-right">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight hidden sm:block">
          <span className="bg-gradient-to-r from-[#005596] to-[#1d4ed8] bg-clip-text text-transparent">{title}</span>
        </h2>
        <p className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500 hidden sm:block mt-1">
          {subtitle}
        </p>
      </div>
    </div>

    <div className="max-w-6xl mx-auto">
      {children}
    </div>
  </div>
);

const VacuumCalculator = () => {
  const { lang } = useLanguage();
  const isId = lang === 'id';
  const { state, setters, calculations } = useVacuumCalculator();
  const goToDashboard = () => setters.setCurrentView('dashboard');
  const backLabel = isId ? 'Kembali ke Dashboard' : 'Back to Dashboard';

  // --- VIEWS ---

  const renderDashboard = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 md:pt-12 md:pb-20 animate-in fade-in duration-700">
      <div className="mb-12 md:mb-16 text-center space-y-4">
        {/* Section Pill Badge: Paten Frosted Glass Monospace Tanpa Titik/Icon */}
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-[#005596]/15 shadow-[0_2px_10px_rgba(0,85,150,0.06)]">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#005596]">
            {isId ? 'Perangkat Teknik Industri 4.0' : 'Industrial 4.0 Suite'}
          </span>
        </div>

        {/* Hero Title (H1): Standar Design System */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
          Vacuum{' '}
          <span className="bg-gradient-to-r from-[#005596] to-[#1d4ed8] bg-clip-text text-transparent">
            Calculator
          </span>
        </h1>

        {/* Body Paragraf Hero */}
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto px-4">
          {isId
            ? 'Rangkaian kalkulasi teknik presisi untuk estimasi daya angkat, dimensi suction cup, dan parameter sistem vakum otomasi industri.'
            : 'A precision engineering calculation suite to estimate suction force, cup sizing, and industrial vacuum automation parameters.'}
        </p>
      </div>

      {/* Grid Menu Kartu Kalkulator */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
        {MENU_ITEMS.map((item) => {
          const itemTitle = isId ? item.titleId : item.title;
          const itemDesc = isId ? item.descId : item.desc;
          return (
            <button
              key={item.id}
              onClick={() => {
                setters.setCurrentView(item.id);
                if (typeof window !== 'undefined' && typeof (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag === 'function') {
                  (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'use_calculator', { event_category: 'Tool', event_label: item.title });
                }
              }}
              className="group p-6 sm:p-7 bg-white/90 backdrop-blur-xl border border-slate-200/80 hover:border-[#005596]/40 ring-1 ring-[#005596]/8 hover:ring-[#005596]/20 rounded-2xl sm:rounded-3xl shadow-[0_4px_20px_rgba(0,85,150,0.04)] hover:shadow-[0_16px_36px_rgba(0,85,150,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="relative z-10 mb-5 p-4 sm:p-5 rounded-2xl bg-slate-50 text-[#005596] group-hover:bg-[#005596] group-hover:text-white transition-all duration-300 shadow-xs group-hover:shadow-[0_8px_20px_rgba(0,85,150,0.25)]">
                {item.icon}
              </div>
              <h3 className="relative z-10 text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug group-hover:text-[#005596] transition-colors">
                {itemTitle}
              </h3>
              <p className="relative z-10 mt-2 text-xs text-slate-500 leading-relaxed font-normal">
                {itemDesc}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (state.currentView) {
      case 'dashboard': return renderDashboard();

      case 'num_cups': return (
        <ModuleWrapper
          onBack={goToDashboard}
          backLabel={backLabel}
          title={isId ? 'Jumlah Unit' : 'Unit Count'}
          subtitle={isId ? 'Jumlah Suction Cup yang Dibutuhkan' : 'Number of Suction Cups Required'}
        >
          <div className="grid lg:grid-cols-2 gap-6 md:gap-10">
            <GlassCard className="p-6 sm:p-8 md:p-10 space-y-6">
              <TechInput label={isId ? 'Massa Workpiece' : 'Workpiece Mass'} value={state.mass} onValueChange={(val) => setters.setMass(Number(val))} unit={state.massUnit} onUnitChange={setters.setMassUnit} unitType="mass" />
              <TechInput label={isId ? 'Akselerasi' : 'Acceleration'} value={state.accel} onValueChange={(val) => setters.setAccel(Number(val))} unit={state.accelUnit} onUnitChange={setters.setAccelUnit} unitType="accel" />
              <TechInput label={isId ? 'Level Vakum' : 'Vacuum Level'} value={state.vacuum} onValueChange={(val) => setters.setVacuum(Number(val))} unit={state.vacuumUnit} onUnitChange={setters.setVacuumUnit} unitType="pressure" step={0.1} />
              <div className="grid grid-cols-2 gap-4">
                <TechInput label={isId ? 'Safety Factor' : 'Safety Factor'} value={state.safety} onValueChange={(val) => setters.setSafety(Number(val))} step={0.1} unit="" />
                <TechInput label={isId ? 'Koefisien Gesek (µ)' : 'Friction (µ)'} value={state.friction} onValueChange={(val) => setters.setFriction(Number(val))} step={0.1} unit="" info={true} />
              </div>
            </GlassCard>

            <div className="space-y-6">
              <GlassCard className="p-6 sm:p-8 md:p-10">
                <TechInput label={isId ? 'Luas Penampang Hisap' : 'Suction Area'} value={state.suctionArea} onValueChange={(val) => setters.setSuctionArea(Number(val))} unit={state.suctionAreaUnit} onUnitChange={setters.setSuctionAreaUnit} unitType="area" disabled={state.calcAreaMode} />
                
                {/* Standardized Pill Button */}
                <button
                  type="button"
                  onClick={() => setters.setCalcAreaMode(!state.calcAreaMode)}
                  className={`mt-6 w-full py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 shadow-sm ${
                    state.calcAreaMode
                      ? 'bg-[#005596] hover:bg-[#004276] text-white shadow-[0_4px_16px_rgba(0,85,150,0.25)]'
                      : 'bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-[#005596] hover:border-[#005596]/40'
                  }`}
                >
                  {state.calcAreaMode ? <Check size={16} /> : <div className="w-3.5 h-3.5 rounded-full border-2 border-current" />}
                  <span>{isId ? 'Hitung dari Geometri' : 'Calculate from Geometry'}</span>
                </button>

                {state.calcAreaMode && (
                  <div className="mt-6 space-y-4 animate-in zoom-in-95 duration-200">
                    <SelectField label={isId ? 'Bentuk Permukaan' : 'Surface Type'} value={state.areaType} options={['Area round', 'Oval surface', 'Rectangle area']} onChange={setters.setAreaType} />
                    <div className="grid grid-cols-2 gap-4">
                      <TechInput label={state.areaType === 'Area round' ? 'Diameter' : (isId ? 'Panjang' : 'Length')} value={state.dim1} onValueChange={(val) => setters.setDim1(Number(val))} unit="mm" />
                      {state.areaType !== 'Area round' && <TechInput label={isId ? 'Lebar' : 'Width'} value={state.dim2} onValueChange={(val) => setters.setDim2(Number(val))} unit="mm" />}
                    </div>
                  </div>
                )}
              </GlassCard>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <ResultDisplay label={isId ? 'Posisi Horizontal' : 'Horizontal Case'} value={calculations.calcNumCups().h} unit="pcs" icon={<CustomIcons.HorizontalArrow className="w-8 h-8 md:w-10 md:h-10" />} color="blue" />
                <ResultDisplay label={isId ? 'Posisi Vertikal' : 'Vertical Case'} value={calculations.calcNumCups().v} unit="pcs" icon={<CustomIcons.VerticalArrow className="w-8 h-8 md:w-10 md:h-10" />} color="indigo" />
              </div>
            </div>
          </div>
        </ModuleWrapper>
      );

      case 'cup_diameter': return (
        <ModuleWrapper
          onBack={goToDashboard}
          backLabel={backLabel}
          title={isId ? 'Dimensi Cup' : 'Dimensions'}
          subtitle={isId ? 'Diameter Suction Cup Optimal' : 'Optimal Suction Cup Diameter'}
        >
          <div className="grid lg:grid-cols-2 gap-6 md:gap-10">
            <GlassCard className="p-6 sm:p-8 md:p-10 space-y-6">
              <TechInput label={isId ? 'Massa Workpiece' : 'Workpiece Mass'} value={state.mass} onValueChange={(val) => setters.setMass(Number(val))} unit={state.massUnit} onUnitChange={setters.setMassUnit} unitType="mass" />
              <TechInput label={isId ? 'Akselerasi' : 'Acceleration'} value={state.accel} onValueChange={(val) => setters.setAccel(Number(val))} unit={state.accelUnit} onUnitChange={setters.setAccelUnit} unitType="accel" />
              <TechInput label={isId ? 'Level Vakum' : 'Vacuum Level'} value={state.vacuum} onValueChange={(val) => setters.setVacuum(Number(val))} unit={state.vacuumUnit} onUnitChange={setters.setVacuumUnit} unitType="pressure" step={0.1} />
              <div className="grid grid-cols-2 gap-4">
                <TechInput label="Safety Factor" value={state.safety} onValueChange={(val) => setters.setSafety(Number(val))} step={0.1} unit="" />
                <TechInput label={isId ? 'Koefisien Gesek (µ)' : 'Friction (µ)'} value={state.friction} onValueChange={(val) => setters.setFriction(Number(val))} step={0.1} unit="" />
              </div>
              <TechInput label={isId ? 'Total Suction Cup' : 'Total Cups'} value={state.numCupsInput} onValueChange={setters.setNumCupsInput} unit="pcs" />
            </GlassCard>

            <div className="flex flex-col gap-6 justify-center">
              {/* Card 1: Horizontal */}
              <div className="flex flex-col items-center justify-center p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-white/90 backdrop-blur-xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] hover:-translate-y-1 transition-all duration-300">
                <div className="text-[#005596] mb-6 w-12 h-12"><CustomIcons.HorizontalArrow className="w-full h-full" /></div>
                <div className="flex flex-col sm:flex-row w-full justify-center items-center gap-6 sm:gap-10">
                  <div className="flex flex-col items-center text-center">
                    <div className="flex items-baseline gap-2 text-slate-900">
                      <span className="text-lg font-black text-[#005596]">&gt;</span>
                      <span className="text-4xl sm:text-5xl font-black tracking-tight">{calculations.calcDiameter().h.toLocaleString(isId ? 'id-ID' : 'en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      <span className="text-base font-bold text-[#005596] uppercase tracking-wider">mm</span>
                    </div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mt-2">
                      {isId ? 'Diameter Suction Cup' : 'Suction cup diameter'}
                    </span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="flex items-baseline gap-2 text-slate-900">
                      <span className="text-lg font-black text-[#005596]">&gt;</span>
                      <span className="text-3xl sm:text-4xl font-black tracking-tight">{calculations.calcDiameter().area_h.toLocaleString(isId ? 'id-ID' : 'en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      <span className="text-sm font-bold text-[#005596] uppercase tracking-wider">mm²</span>
                    </div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mt-2">
                      {isId ? 'Luas Area Suction Cup' : 'Suction cup area'}
                    </span>
                  </div>
                </div>
                <div className="w-full h-px bg-slate-100 my-6"></div>
                <p className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 text-center">
                  {isId ? 'Dengan aplikasi gaya arah horizontal' : 'With horizontal force application'}
                </p>
              </div>

              {/* Card 2: Vertical */}
              <div className="flex flex-col items-center justify-center p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-white/90 backdrop-blur-xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] hover:-translate-y-1 transition-all duration-300">
                <div className="text-slate-600 mb-6 w-12 h-12"><CustomIcons.VerticalArrow className="w-full h-full" /></div>
                <div className="flex flex-col sm:flex-row w-full justify-center items-center gap-6 sm:gap-10">
                  <div className="flex flex-col items-center text-center">
                    <div className="flex items-baseline gap-2 text-slate-900">
                      <span className="text-lg font-black text-slate-500">&gt;</span>
                      <span className="text-4xl sm:text-5xl font-black tracking-tight">{calculations.calcDiameter().v.toLocaleString(isId ? 'id-ID' : 'en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      <span className="text-base font-bold text-slate-500 uppercase tracking-wider">mm</span>
                    </div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mt-2">
                      {isId ? 'Diameter Suction Cup' : 'Suction cup diameter'}
                    </span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="flex items-baseline gap-2 text-slate-900">
                      <span className="text-lg font-black text-slate-500">&gt;</span>
                      <span className="text-3xl sm:text-4xl font-black tracking-tight">{calculations.calcDiameter().area_v.toLocaleString(isId ? 'id-ID' : 'en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">mm²</span>
                    </div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mt-2">
                      {isId ? 'Luas Area Suction Cup' : 'Suction cup area'}
                    </span>
                  </div>
                </div>
                <div className="w-full h-px bg-slate-100 my-6"></div>
                <p className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 text-center">
                  {isId ? 'Dengan aplikasi gaya arah vertikal' : 'With vertical force application'}
                </p>
              </div>
            </div>
          </div>
        </ModuleWrapper>
      );

      case 'suction_force': return (
        <ModuleWrapper
          onBack={goToDashboard}
          backLabel={backLabel}
          title={isId ? 'Gaya Hisap' : 'Force Yield'}
          subtitle={isId ? 'Gaya Hisap Suction Cup' : 'Suction Force Generation'}
        >
          <div className="grid lg:grid-cols-2 gap-6 md:gap-10">
            <GlassCard className="p-6 sm:p-8 md:p-10 space-y-6">
              <TechInput label={isId ? 'Luas Penampang Hisap' : 'Suction Area'} value={state.suctionArea} onValueChange={setters.setSuctionArea} unit={state.suctionAreaUnit} onUnitChange={setters.setSuctionAreaUnit} unitType="area" disabled={state.calcAreaMode} />
              
              <button
                type="button"
                onClick={() => setters.setCalcAreaMode(!state.calcAreaMode)}
                className={`mt-6 w-full py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 shadow-sm ${
                  state.calcAreaMode
                    ? 'bg-[#005596] hover:bg-[#004276] text-white shadow-[0_4px_16px_rgba(0,85,150,0.25)]'
                    : 'bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-[#005596] hover:border-[#005596]/40'
                }`}
              >
                {state.calcAreaMode ? <Check size={16} /> : <div className="w-3.5 h-3.5 rounded-full border-2 border-current" />}
                <span>{isId ? 'Hitung dari Geometri' : 'Calculate from Geometry'}</span>
              </button>

              {state.calcAreaMode && (
                <div className="mt-6 space-y-4 animate-in zoom-in-95 duration-200">
                  <SelectField label={isId ? 'Bentuk Permukaan' : 'Surface Type'} value={state.areaType} options={['Area round', 'Oval surface', 'Rectangle area']} onChange={setters.setAreaType} />
                  <div className="grid grid-cols-2 gap-4">
                    <TechInput label={state.areaType === 'Area round' ? 'Diameter' : (isId ? 'Panjang' : 'Length')} value={state.dim1} onValueChange={setters.setDim1} unit="mm" />
                    {state.areaType !== 'Area round' && <TechInput label={isId ? 'Lebar' : 'Width'} value={state.dim2} onValueChange={setters.setDim2} unit="mm" />}
                  </div>
                </div>
              )}
              <TechInput label={isId ? 'Level Vakum' : 'Vacuum Level'} value={state.vacuum} onValueChange={(val) => setters.setVacuum(Number(val))} unit={state.vacuumUnit} onUnitChange={setters.setVacuumUnit} unitType="pressure" step={0.1} />
              <TechInput label={isId ? 'Koefisien Gesek (µ)' : 'Friction (µ)'} value={state.friction} onValueChange={setters.setFriction} unit="" step={0.1} info={true} />
            </GlassCard>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <ResultDisplay label={isId ? 'Gaya Tarik (Tegak Lurus)' : 'Pulling Force (Perpendicular)'} value={calculations.calcForce()} unit="N" icon={<CustomIcons.VerticalArrow className="w-8 h-8 md:w-10 md:h-10" />} color="blue" />
              <ResultDisplay label={isId ? 'Gaya Geser (Friksi)' : 'Shear Force (Friction)'} value={Math.round(calculations.calcForce() * state.friction)} unit="N" icon={<CustomIcons.HorizontalArrow className="w-8 h-8 md:w-10 md:h-10" />} color="orange" />
            </div>
          </div>
        </ModuleWrapper>
      );

      case 'holding_force': return (
        <ModuleWrapper
          onBack={goToDashboard}
          backLabel={backLabel}
          title={isId ? 'Keamanan' : 'Security'}
          subtitle={isId ? 'Gaya Tahan Teoretis (Holding Force)' : 'Theoretical Holding Force'}
        >
          <div className="flex flex-col gap-8 md:gap-10">
            <GlassCard className="p-6 sm:p-8 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TechInput label={isId ? 'Massa Workpiece' : 'Mass of workpiece'} value={state.mass} onValueChange={setters.setMass} unit={state.massUnit} onUnitChange={setters.setMassUnit} unitType="mass" />
                <TechInput label={isId ? 'Akselerasi' : 'Acceleration'} value={state.accel} onValueChange={(val) => setters.setAccel(Number(val))} unit={state.accelUnit} onUnitChange={setters.setAccelUnit} unitType="accel" />
                <TechInput label={isId ? 'Koefisien Gesek' : 'Friction coefficient'} value={state.friction} onValueChange={setters.setFriction} unit="" step={0.1} />
                <TechInput label="Safety factor" value={state.safety} onValueChange={setters.setSafety} unit="" step={0.1} />
              </div>
            </GlassCard>

            <div className="flex items-center justify-center -my-2 text-slate-300">
              <ChevronDown size={28} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <ResultDisplay label={isId ? 'Kasus Beban 1' : 'Load case 1'} value={calculations.calcHoldingForce().lc1.toLocaleString(isId ? 'id-ID' : 'en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} unit="N" icon={<CustomIcons.VerticalArrow className="w-8 h-8 md:w-10 md:h-10" />} color="blue" />
              <ResultDisplay label={isId ? 'Kasus Beban 2' : 'Load case 2'} value={calculations.calcHoldingForce().lc2.toLocaleString(isId ? 'id-ID' : 'en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} unit="N" icon={<CustomIcons.HorizontalArrow className="w-8 h-8 md:w-10 md:h-10" />} color="indigo" />
              <ResultDisplay label={isId ? 'Kasus Beban 3' : 'Load case 3'} value={calculations.calcHoldingForce().lc3.toLocaleString(isId ? 'id-ID' : 'en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} unit="N" icon={<div className="transform rotate-90"><CustomIcons.VerticalArrow className="w-8 h-8 md:w-10 md:h-10" /></div>} color="slate" />
            </div>
          </div>
        </ModuleWrapper>
      );

      case 'hose_dist': return (
        <ModuleWrapper
          onBack={goToDashboard}
          backLabel={backLabel}
          title={isId ? 'Jaringan Aliran' : 'Flow Logic'}
          subtitle={isId ? 'Distribusi Jaringan Selang Vakum' : 'Hose Network Distribution'}
        >
          <div className="max-w-4xl mx-auto space-y-8">
            <GlassCard className="p-6 sm:p-8 md:p-10">
              {/* Standardized Pill Switch Container */}
              <div className="flex flex-col sm:flex-row bg-slate-100/90 p-1.5 rounded-full mb-8 gap-1.5 border border-slate-200/60">
                <button
                  type="button"
                  onClick={() => setters.setHoseDistMode('main_to_sub')}
                  className={`flex-1 py-2.5 sm:py-3 px-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    state.hoseDistMode === 'main_to_sub'
                      ? 'bg-white text-[#005596] shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <CustomIcons.hoseBranch />
                  <span>{isId ? 'Utama → Cabang' : 'Main → Branch'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setters.setHoseDistMode('sub_to_main')}
                  className={`flex-1 py-2.5 sm:py-3 px-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    state.hoseDistMode !== 'main_to_sub'
                      ? 'bg-white text-[#005596] shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <div className="rotate-180"><CustomIcons.hoseBranch /></div>
                  <span>{isId ? 'Cabang → Utama' : 'Branch → Main'}</span>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <TechInput label={state.hoseDistMode === 'main_to_sub' ? (isId ? 'Ø Selang Utama' : 'Ø Main Hose') : (isId ? 'Ø Selang Cabang' : 'Ø Branch Hose')} value={state.hoseInputDia} onValueChange={setters.setHoseInputDia} unit={state.hoseInputDiaUnit} onUnitChange={setters.setHoseInputDiaUnit} unitType="length" />
                <TechInput label={isId ? 'Jumlah Percabangan' : 'Number of Branches'} value={state.subHoses} onValueChange={setters.setSubHoses} unit="pcs" />
              </div>
            </GlassCard>

            <ResultDisplay label={state.hoseDistMode === 'main_to_sub' ? (isId ? 'Rekomendasi Ø Selang Cabang' : 'Recommended Ø Branch') : (isId ? 'Rekomendasi Ø Selang Utama' : 'Recommended Ø Main')} value={calculations.calcHoseDist()} unit={state.hoseInputDiaUnit} icon={<Share2 size={32} />} color="indigo" />
          </div>
        </ModuleWrapper>
      );

      case 'evac_time': return (
        <ModuleWrapper
          onBack={goToDashboard}
          backLabel={backLabel}
          title={isId ? 'Dinamika' : 'Dynamics'}
          subtitle={isId ? 'Waktu Evakuasi Sistem Vakum' : 'System Evacuation Time'}
        >
          <div className="grid lg:grid-cols-2 gap-6 md:gap-10">
            <GlassCard className="p-6 sm:p-8 md:p-10 space-y-6">
              <TechInput label={isId ? 'Volume Tangki / Sistem' : 'Tank Volume'} value={state.volume} onValueChange={setters.setVolume} unit={state.volumeUnit} onUnitChange={setters.setVolumeUnit} unitType="volume" />
              <TechInput label={isId ? 'Kapasitas Pompa' : 'Pump Capacity'} value={state.pumpCapacity} onValueChange={setters.setPumpCapacity} unit={state.pumpCapacityUnit} onUnitChange={setters.setPumpCapacityUnit} unitType="flow" />
              <TechInput label={isId ? 'Target Vakum' : 'Target Vacuum'} value={state.vacuum} onValueChange={setters.setVacuum} unit={state.vacuumUnit} onUnitChange={setters.setVacuumUnit} unitType="pressure" step={0.1} />
            </GlassCard>
            <ResultDisplay label={isId ? 'Waktu Evakuasi' : 'Evacuation Time'} value={calculations.calcEvacTime().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} unit="s" icon={<Timer size={36} />} color="emerald" />
          </div>
        </ModuleWrapper>
      );

      case 'suction_cap': return (
        <ModuleWrapper
          onBack={goToDashboard}
          backLabel={backLabel}
          title={isId ? 'Kapasitas' : 'Capacity'}
          subtitle={isId ? 'Kapasitas Hisap yang Dibutuhkan' : 'Required Suction Capacity'}
        >
          <div className="grid lg:grid-cols-2 gap-6 md:gap-10">
            <GlassCard className="p-6 sm:p-8 md:p-10 space-y-6">
              <TechInput label={isId ? 'Volume Tangki / Sistem' : 'Tank Volume'} value={state.volume} onValueChange={setters.setVolume} unit={state.volumeUnit} onUnitChange={setters.setVolumeUnit} unitType="volume" />
              <TechInput label={isId ? 'Target Vakum' : 'Target Vacuum'} value={state.vacuum} onValueChange={setters.setVacuum} unit={state.vacuumUnit} onUnitChange={setters.setVacuumUnit} unitType="pressure" step={0.1} />
              <div className="grid grid-cols-2 gap-4">
                <TechInput label={isId ? 'Target Waktu (s)' : 'Target Time'} value={state.evacTime} onValueChange={setters.setEvacTime} unit={state.evacTimeUnit} onUnitChange={setters.setEvacTimeUnit} unitType="none" />
                <SelectField label={isId ? 'Satuan Output' : 'Output Unit'} value={state.reqSuctionCapUnit} options={UNITS.flow.options} onChange={setters.setReqSuctionCapUnit} />
              </div>
            </GlassCard>
            <ResultDisplay label={isId ? 'Kapasitas Pompa Ideal' : 'Ideal Pump Capacity'} value={calculations.calcSuctionCap().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} unit={state.reqSuctionCapUnit} icon={<Wind size={36} />} color="blue" />
          </div>
        </ModuleWrapper>
      );

      case 'hose_dia_vac': return (
        <ModuleWrapper
          onBack={goToDashboard}
          backLabel={backLabel}
          title={isId ? 'Pemipaan' : 'Piping'}
          subtitle={isId ? 'Pemilihan Diameter Selang' : 'Hose Diameter Selection'}
        >
          <div className="grid lg:grid-cols-2 gap-6 md:gap-10">
            <GlassCard className="p-6 sm:p-8 md:p-10">
              <div className="flex flex-col sm:flex-row bg-slate-100/90 p-1.5 rounded-full mb-8 gap-1.5 border border-slate-200/60">
                <button
                  type="button"
                  onClick={() => setters.setHoseDiaMode('vacuum')}
                  className={`flex-1 py-2.5 sm:py-3 px-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all ${
                    state.hoseDiaMode === 'vacuum'
                      ? 'bg-white text-[#005596] shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {isId ? 'Selang Vakum' : 'Vacuum Hose'}
                </button>
                <button
                  type="button"
                  onClick={() => setters.setHoseDiaMode('compressed')}
                  className={`flex-1 py-2.5 sm:py-3 px-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all ${
                    state.hoseDiaMode !== 'vacuum'
                      ? 'bg-white text-[#005596] shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {isId ? 'Selang Udara Bertekanan' : 'Comp. Air Hose'}
                </button>
              </div>

              <div className="space-y-6">
                {state.hoseDiaMode === 'vacuum' ? (
                  <>
                    <TechInput label={isId ? 'Panjang Selang' : 'Hose Length'} value={state.hoseLength} onValueChange={setters.setHoseLength} unit={state.hoseLengthUnit} onUnitChange={setters.setHoseLengthUnit} unitType="length" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <TechInput label={isId ? 'Kapasitas Hisap' : 'Suction Capacity'} value={state.pumpCapacity} onValueChange={setters.setPumpCapacity} unit={state.pumpCapacityUnit} onUnitChange={setters.setPumpCapacityUnit} unitType="flow" />
                      <TechInput label={isId ? 'Kecepatan Aliran (v)' : 'Flow Velocity (v)'} value={state.flowRate} onValueChange={setters.setFlowRate} unit={state.flowRateUnit} onUnitChange={setters.setFlowRateUnit} unitType="velocity" />
                    </div>
                  </>
                ) : (
                  <>
                    <TechInput label={isId ? 'Debit Aliran (Q)' : 'Volume Flow (Q)'} value={state.pumpCapacity} onValueChange={setters.setPumpCapacity} unit={state.pumpCapacityUnit} onUnitChange={setters.setPumpCapacityUnit} unitType="flow" />
                    <TechInput label={isId ? 'Tekanan Sistem' : 'System Pressure'} value={state.sysPressure} onValueChange={setters.setSysPressure} unit={state.sysPressureUnit} onUnitChange={setters.setSysPressureUnit} unitType="pressure" />
                    <TechInput label={isId ? 'Tekanan Generator' : 'Generator Pressure'} value={state.genPressure} onValueChange={setters.setGenPressure} unit={state.genPressureUnit} onUnitChange={setters.setGenPressureUnit} unitType="pressure" />
                    <TechInput label={isId ? 'Panjang Selang' : 'Hose Length'} value={state.hoseLength} onValueChange={setters.setHoseLength} unit={state.hoseLengthUnit} onUnitChange={setters.setHoseLengthUnit} unitType="length" />
                  </>
                )}
              </div>
            </GlassCard>
            <ResultDisplay label={isId ? 'Diameter Selang Ideal' : 'Ideal Hose Diameter'} value={calculations.calcHoseDiameter().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} unit="mm" icon={<Activity size={36} />} color="blue" />
          </div>
        </ModuleWrapper>
      );

      case 'ambient_pressure': return (
        <ModuleWrapper
          onBack={goToDashboard}
          backLabel={backLabel}
          title={isId ? 'Atmosfer' : 'Atmosphere'}
          subtitle={isId ? 'Tekanan Ambien & Batas Vakum' : 'Ambient Pressure & Limits'}
        >
          <div className="flex flex-col gap-8 md:gap-10">
            <GlassCard className="p-6 sm:p-8 md:p-10 space-y-6 max-w-3xl mx-auto w-full">
              <TechInput label={isId ? 'Ketinggian Elevasi (h)' : 'Elevation Height (h)'} value={state.altitude} onValueChange={setters.setAltitude} unit={state.altitudeUnit} onUnitChange={setters.setAltitudeUnit} unitType="length" />
              <TechInput label={isId ? 'Target Efisiensi Pompa' : 'Target Pump Efficiency'} value={state.nominalEvacuation} onValueChange={setters.setNominalEvacuation} unit="%" unitType="percentage" />
            </GlassCard>

            <div className="flex items-center justify-center -my-2 text-slate-300">
              <ChevronDown size={28} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <ResultDisplay label={isId ? 'Tekanan Ambien' : 'Ambient Pressure'} value={calculations.calcAtmosphere().ambient.toLocaleString('en-US', { maximumFractionDigits: 2 })} unit="mbar, abs" icon={<Cloud size={28} />} color="slate" />
              <ResultDisplay label={isId ? 'Batas Vakum Maksimum' : 'Maximum Vacuum Limit'} value={calculations.calcAtmosphere().max_vac.toLocaleString('en-US', { maximumFractionDigits: 2 })} unit="mbar, rel" icon={<Gauge size={28} />} color="blue" />
              <ResultDisplay label={isId ? 'Maks (Cuaca Buruk -5%)' : 'Max (Bad Weather -5%)'} value={calculations.calcAtmosphere().max_vac_bad.toLocaleString('en-US', { maximumFractionDigits: 2 })} unit="mbar, rel" icon={<div className="text-amber-600 font-bold"><Gauge size={28} /></div>} color="orange" />
            </div>
          </div>
        </ModuleWrapper>
      );

      case 'air_flow': return (
        <ModuleWrapper
          onBack={goToDashboard}
          backLabel={backLabel}
          title={isId ? 'Kalkulasi Aliran' : 'Calculations'}
          subtitle={isId ? 'Laju Aliran Udara Melalui Pembatas Aliran' : 'Air flow rate through flow resistors'}
        >
          <div className="flex flex-col gap-8 md:gap-10">
            <GlassCard className="p-6 sm:p-8 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TechInput label={isId ? 'Tekanan ambien / masuk absolut' : 'Ambient / inlet absolute pressure'} value={state.inletPressure} onValueChange={setters.setInletPressure} unit={state.inletPressureUnit} onUnitChange={setters.setInletPressureUnit} unitType="pressure" />
                <TechInput label={isId ? 'Suhu Udara [°C]' : 'Temperature [°C]'} value={state.temperature} onValueChange={setters.setTemperature} unit="" />
                <TechInput label={isId ? 'Jumlah pembatas aliran' : 'Number of flow resistors'} value={state.numResistors} onValueChange={setters.setNumResistors} unit="" />
                <div className="grid grid-cols-1 sm:grid-cols-[1fr,auto] items-end gap-2">
                  <TechInput label={isId ? 'Tingkat penutupan workpiece [%]' : 'Occupancy rate [%]'} value={state.occupancyRate} onValueChange={setters.setOccupancyRate} unit="" step={1} max={100} />
                  <div className="hidden sm:flex text-[#005596] mb-3 px-2 cursor-pointer hover:text-[#004276] transition-colors" title={isId ? 'Persentase lubang suction cup yang tertutup oleh workpiece' : 'Percentage of suction cup holes that are covered by the workpiece'}><Info size={20} /></div>
                </div>
                <TechInput label={isId ? 'Diameter lubang pembatas aliran' : 'Drill diameter of flow resistors'} value={state.resistorDia} onValueChange={setters.setResistorDia} unit={state.resistorDiaUnit} onUnitChange={setters.setResistorDiaUnit} unitType="length" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 sm:mt-0 items-end">
                  <div className="col-span-full text-xs font-mono font-bold uppercase tracking-wider text-slate-500 sm:mb-1">
                    {isId ? 'Penurunan vakum melalui pembatas aliran' : 'Vacuum drop through flow resistors'}
                  </div>
                  <div className="col-span-full"><TechInput label="" value={state.vacuumDrop} onValueChange={setters.setVacuumDrop} unit={state.vacuumDropUnit} onUnitChange={setters.setVacuumDropUnit} unitType="pressure" /></div>
                </div>
              </div>
            </GlassCard>

            <div className="flex items-center justify-center -my-2 text-slate-300">
              <ChevronDown size={28} />
            </div>

            <GlassCard className="p-6 sm:p-8 md:p-10 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
                <div className="text-[#005596]"><Wind size={28} /></div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  {isId ? 'Laju aliran udara melalui pembatas aliran' : 'Air flow rate through flow resistors'}
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 text-center">
                <div className="space-y-1.5">
                  <div className="flex justify-center items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">{calculations.calcAirFlowResistor().open_resistors}</span>
                    <span className="text-base font-bold text-[#005596] uppercase">pcs</span>
                  </div>
                  <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                    {isId ? 'Jumlah pembatas aliran terbuka' : 'Number open flow resistors'}
                  </p>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-center items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">{calculations.calcAirFlowResistor().area_per_resistor.toLocaleString(isId ? 'id-ID' : 'en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    <span className="text-base font-bold text-[#005596] uppercase">mm²</span>
                  </div>
                  <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                    {isId ? 'Luas penampang lubang per pembatas' : 'Bore area per resistor'}
                  </p>
                </div>
                <div className="col-span-1 sm:col-span-2 mt-4 space-y-3">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2 text-slate-900 font-black">
                      <span className="text-2xl sm:text-3xl tracking-tight">{calculations.calcAirFlowResistor().flow_lmin.toLocaleString(isId ? 'id-ID' : 'en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</span>
                      <span className="text-sm font-bold text-[#005596] uppercase">l/min</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-900 font-black">
                      <span className="text-2xl sm:text-3xl tracking-tight">{calculations.calcAirFlowResistor().flow_m3h.toLocaleString(isId ? 'id-ID' : 'en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      <span className="text-sm font-bold text-[#005596] uppercase">m³/h</span>
                      <span className="text-slate-300 px-2">=</span>
                      <span className="text-2xl sm:text-3xl tracking-tight">{calculations.calcAirFlowResistor().flow_gs.toLocaleString(isId ? 'id-ID' : 'en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      <span className="text-sm font-bold text-[#005596] uppercase">g/s</span>
                    </div>
                  </div>
                  <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                    {isId ? 'Laju aliran udara pembatas terbuka' : 'Air flow rate open flow resistors'}
                  </p>
                </div>
              </div>
            </GlassCard>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight -mb-4 mt-2">
              {isId ? 'Kebutuhan Vacuum Generator (kurva karakteristik linier)' : 'Required Vacuum Generation (linear characteristic curve)'}
            </h3>

            <GlassCard className="p-6 sm:p-8 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TechInput label={isId ? 'Safety factor (mis. pressure drop di selang)' : 'Safety factor (e.g. pressure drop in hoses)'} value={state.genSafetyFactor} onValueChange={setters.setGenSafetyFactor} unit="" step={0.01} />
                <TechInput label={isId ? 'Level evakuasi nominal Vacuum Generator [%]' : 'Nominal evacuation level of generator [%]'} value={state.nominalEvacuation} onValueChange={setters.setNominalEvacuation} unit="" />
              </div>
            </GlassCard>

            <div className="flex items-center justify-center -my-2 text-slate-300">
              <ChevronDown size={28} />
            </div>

            <GlassCard className="p-6 sm:p-8 md:p-10 relative overflow-hidden">
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="flex items-center gap-2 text-slate-900 font-black">
                  <span className="text-2xl sm:text-3xl tracking-tight">{calculations.calcAirFlowResistor().req_lmin.toLocaleString(isId ? 'id-ID' : 'en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</span>
                  <span className="text-sm font-bold text-[#005596] uppercase">l/min</span>
                </div>
                <div className="flex items-center gap-2 text-slate-900 font-black">
                  <span className="text-2xl sm:text-3xl tracking-tight">{calculations.calcAirFlowResistor().req_m3h.toLocaleString(isId ? 'id-ID' : 'en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  <span className="text-sm font-bold text-[#005596] uppercase">m³/h</span>
                  <span className="text-slate-300 px-2">=</span>
                  <span className="text-2xl sm:text-3xl tracking-tight">{calculations.calcAirFlowResistor().req_gs.toLocaleString(isId ? 'id-ID' : 'en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  <span className="text-sm font-bold text-[#005596] uppercase">g/s</span>
                </div>
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mt-2 text-center">
                  {isId ? 'Hasil kalkulasi debit hisap nominal yang dibutuhkan' : 'Calculated required nominal suction volume flow'}
                </p>
              </div>
            </GlassCard>
          </div>
        </ModuleWrapper>
      );

      default: return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans pt-16 sm:pt-20">
      {/* Fully Contained Ambient Lighting Refraction */}
      <div 
        className="absolute top-16 left-1/4 w-[500px] h-[360px] bg-[#005596]/5 rounded-full blur-[150px] pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute top-1/2 right-1/4 w-[460px] h-[320px] bg-[#1d4ed8]/5 rounded-full blur-[140px] pointer-events-none" 
        aria-hidden="true" 
      />

      {state.currentView !== 'dashboard' && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#005596] via-[#1d4ed8] to-sky-400 z-50 shadow-[0_2px_10px_rgba(0,85,150,0.15)]" />
      )}

      {renderContent()}

      {/* PreFooterCTA: Standar Penutup Halaman & Jembatan Konversi Teknik */}
      <PreFooterCTA
        badge={isId ? 'VERIFIKASI SISTEM VAKUM PABRIK ANDA' : 'VERIFY YOUR VACUUM SYSTEM SIZING'}
        title={
          isId ? (
            <>
              Butuh Verifikasi Spesifikasi Sistem Vakum? <br className="hidden sm:inline" />
              Konsultasikan dengan Application Engineer Kami.
            </>
          ) : (
            <>
              Need Real-World Vacuum Sizing Verification? <br className="hidden sm:inline" />
              Consult Our Application Engineers.
            </>
          )
        }
        description={
          isId
            ? 'Hasil kalkulasi teknis di atas merupakan estimasi teoretis. Tim engineering PT Dimensi Quantum Wahyudi siap melakukan simulasi langsung, rekomendasi tipe suction cup Schmalz, dan survei teknis di pabrik Anda.'
            : 'The figures above are theoretical estimates. PT Dimensi Quantum Wahyudi engineers can conduct live sample lifting tests, recommend genuine Schmalz vacuum cups, and assist with on-site automation sizing.'
        }
        primaryBtnText={isId ? 'Hubungi Engineer Vakum' : 'Contact Vacuum Engineers'}
        primaryBtnHref="/contact"
        secondaryBtnText={isId ? 'Konsultasi WhatsApp Cepat' : 'Fast WhatsApp Consultation'}
        secondaryBtnHref="https://wa.me/6281119168752?text=Halo%20DQW,%20saya%20ingin%20konsultasi%20hasil%20kalkulasi%20vacuum%20calculator%20untuk%20pabrik%20kami"
      />
    </div>
  );
};

export default VacuumCalculator;
