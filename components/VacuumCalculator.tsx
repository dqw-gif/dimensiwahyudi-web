"use client";

import React, { useRef } from 'react';
import {
  Share2, Timer,
  Wind, Activity, Cloud, ChevronLeft, ChevronDown,
  Info, Check, ArrowRight, ShieldCheck, Gauge
} from 'lucide-react';
import { CustomIcons, VacuumIcons } from './icons/VacuumIcons';
import { UNITS, MENU_ITEMS } from '../constants/calculatorData';
import { useVacuumCalculator } from '../hooks/useVacuumCalculator';

import { GlassCard } from './vacuum-calculator/GlassCard';
import { TechInput } from './vacuum-calculator/TechInput';
import { SelectField } from './vacuum-calculator/SelectField';
import { ResultDisplay } from './vacuum-calculator/ResultDisplay';

// --- MODERN UI COMPONENTS ---
// Components have been extracted to /components/vacuum-calculator/ folder


// --- APP LOGIC ---

const VacuumCalculator = () => {
  const { state, setters, calculations } = useVacuumCalculator();

  // --- VIEWS ---

  const renderHeader = (title: string, subtitle: string) => (
    <div className="bg-transparent px-4 md:px-8 py-4 md:py-6 relative z-20 transition-all flex items-center">
      <button
        onClick={() => setters.setCurrentView('dashboard')}
        className="flex items-center gap-3 text-slate-400 hover:text-blue-600 transition-all font-black text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] group"
      >
        <div className="p-2 md:p-3 rounded-xl bg-white border border-slate-200 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-all shadow-sm">
          <ChevronLeft size={16} />
        </div>
        Kembali ke Dashboard
      </button>
      <div className="ml-auto text-right">
        <h2 className="text-2xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none hidden sm:block">
          {title}
        </h2>
        <p className="text-blue-600 font-bold uppercase tracking-widest text-xs hidden sm:block mt-1">{subtitle}</p>
      </div>
    </div>
  );

  interface ModuleWrapperProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
  }
  const ModuleWrapper = ({ children, title, subtitle }: ModuleWrapperProps) => (
    <div className="w-full mx-auto px-2 sm:px-4 py-4 md:py-8 animate-in slide-in-from-bottom-8 duration-700">
      {renderHeader(title, subtitle)}
      <div className="max-w-6xl mx-auto mt-4">
        {children}
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="max-w-7xl mx-auto px-4 pt-8 pb-12 md:pt-16 md:pb-24 animate-in fade-in duration-1000">
      <div className="mb-12 md:mb-20 text-center space-y-4 md:space-y-6">
        <div className="inline-flex items-center gap-2 md:gap-3 bg-slate-900 text-white px-6 md:px-8 py-2 md:py-3 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] shadow-xl shadow-slate-400/30">
          <VacuumIcons.SuctionCap className="w-4 h-4 text-blue-400" />
          Industrial 4.0 Suite
        </div>
        <h1 className="text-4xl md:text-[5.5rem] lg:text-[6.5rem] font-black text-slate-900 tracking-tighter uppercase leading-[0.9]">
          Vacuum <span className="text-blue-600">Calculator</span>
        </h1>
        <p className="text-slate-400 font-bold uppercase tracking-[0.1em] md:tracking-[0.3em] text-[10px] md:text-sm max-w-2xl mx-auto px-4">
          Sistem kalkulasi teknis presisi untuk otomatisasi industri vakum
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {MENU_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setters.setCurrentView(item.id)}
            className="group p-6 md:p-10 bg-white border border-slate-100 rounded-[1.5rem] md:rounded-[2.5rem] shadow-md shadow-slate-200/50 hover:shadow-xl hover:shadow-blue-200/40 hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 mb-4 md:mb-8 p-5 md:p-6 rounded-full md:rounded-[2rem] bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-700 transform group-hover:rotate-[360deg] shadow-inner group-hover:shadow-md">
              {item.icon}
            </div>
            <h3 className="relative z-10 text-sm md:text-base font-black text-slate-800 uppercase tracking-tighter leading-tight group-hover:text-blue-700 transition-colors">
              {item.title}
            </h3>
            <p className="relative z-10 mt-2 md:mt-3 text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
              {item.desc}
            </p>
          </button>
        ))}
      </div>
    </div>
  );



  const renderContent = () => {
    switch (state.currentView) {
      case 'dashboard': return renderDashboard();

      case 'num_cups': return (
        <ModuleWrapper title="Unit Count" subtitle="Number of Suction Cups Required">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-12">
            <GlassCard className="p-6 md:p-12 space-y-6 md:space-y-8">
              <TechInput label="Workpiece Mass" value={state.mass} onValueChange={(val) => setters.setMass(Number(val))} unit={state.massUnit} onUnitChange={setters.setMassUnit} unitType="mass" />
              <TechInput label="Acceleration" value={state.accel} onValueChange={(val) => setters.setAccel(Number(val))} unit={state.accelUnit} onUnitChange={setters.setAccelUnit} unitType="accel" />
              <TechInput label="Vacuum Level" value={state.vacuum} onValueChange={(val) => setters.setVacuum(Number(val))} unit={state.vacuumUnit} onUnitChange={setters.setVacuumUnit} unitType="pressure" step={0.1} />
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <TechInput label="Safety Factor" value={state.safety} onValueChange={(val) => setters.setSafety(Number(val))} step={0.1} unit="" />
                <TechInput label="Friction (µ)" value={state.friction} onValueChange={(val) => setters.setFriction(Number(val))} step={0.1} unit="" info={true} />
              </div>
            </GlassCard>

            <div className="space-y-6 md:space-y-10">
              <GlassCard className="p-6 md:p-10">
                <TechInput label="Suction Area" value={state.suctionArea} onValueChange={(val) => setters.setSuctionArea(Number(val))} unit={state.suctionAreaUnit} onUnitChange={setters.setSuctionAreaUnit} unitType="area" disabled={state.calcAreaMode} />
                <button
                  onClick={() => setters.setCalcAreaMode(!state.calcAreaMode)}
                  className={`mt-6 md:mt-8 w-full py-4 md:py-5 rounded-xl md:rounded-[1.5rem] font-black text-[10px] md:text-xs uppercase tracking-widest border-2 transition-all flex items-center justify-center gap-3 md:gap-4 ${state.calcAreaMode ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-50 border-slate-200 text-slate-400 hover:border-blue-600 hover:text-blue-600'}`}
                >
                  {state.calcAreaMode ? <Check size={18} /> : <div className="w-4 h-4 rounded-full border-2 border-current" />} Hitung dari Geometri
                </button>
                {state.calcAreaMode && (
                  <div className="mt-6 md:mt-10 space-y-4 md:space-y-8 animate-in zoom-in-95 duration-300">
                    <SelectField label="Tipe Permukaan" value={state.areaType} options={['Area round', 'Oval surface', 'Rectangle area']} onChange={setters.setAreaType} />
                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                      <TechInput label={state.areaType === 'Area round' ? 'Diameter' : 'Panjang'} value={state.dim1} onValueChange={(val) => setters.setDim1(Number(val))} unit="mm" />
                      {state.areaType !== 'Area round' && <TechInput label="Lebar" value={state.dim2} onValueChange={(val) => setters.setDim2(Number(val))} unit="mm" />}
                    </div>
                  </div>
                )}
              </GlassCard>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                <ResultDisplay label="Kasus Horizontal" value={calculations.calcNumCups().h} unit="pcs" icon={<CustomIcons.HorizontalArrow className="w-8 h-8 md:w-12 md:h-12" />} color="blue" />
                <ResultDisplay label="Kasus Vertikal" value={calculations.calcNumCups().v} unit="pcs" icon={<CustomIcons.VerticalArrow className="w-8 h-8 md:w-12 md:h-12" />} color="indigo" />
              </div>
            </div>
          </div>
        </ModuleWrapper>
      );

      case 'cup_diameter': return (
        <ModuleWrapper title="Dimensions" subtitle="Optimal Suction Cup Diameter">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-12">
            <GlassCard className="p-6 md:p-12 space-y-6 md:space-y-8">
              <TechInput label="Workpiece Mass" value={state.mass} onValueChange={(val) => setters.setMass(Number(val))} unit={state.massUnit} onUnitChange={setters.setMassUnit} unitType="mass" />
              <TechInput label="Acceleration" value={state.accel} onValueChange={(val) => setters.setAccel(Number(val))} unit={state.accelUnit} onUnitChange={setters.setAccelUnit} unitType="accel" />
              <TechInput label="Vacuum Level" value={state.vacuum} onValueChange={(val) => setters.setVacuum(Number(val))} unit={state.vacuumUnit} onUnitChange={setters.setVacuumUnit} unitType="pressure" step={0.1} />
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <TechInput label="Safety Factor" value={state.safety} onValueChange={(val) => setters.setSafety(Number(val))} step={0.1} unit="" />
                <TechInput label="Friction (µ)" value={state.friction} onValueChange={(val) => setters.setFriction(Number(val))} step={0.1} unit="" />
              </div>
              <TechInput label="Total Cups" value={state.numCupsInput} onValueChange={setters.setNumCupsInput} unit="pcs" />
            </GlassCard>
            <div className="flex flex-col gap-6 md:gap-8 justify-center">
              {/* Card 1: Horizontal */}
              <div className="flex flex-col items-center justify-center p-8 md:p-10 rounded-[2rem] bg-white border border-slate-200 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-transform duration-500">
                <div className="text-blue-600 mb-8 w-16 h-16"><CustomIcons.HorizontalArrow className="w-full h-full" /></div>
                <div className="flex flex-col sm:flex-row w-full justify-center items-center gap-8 sm:gap-12">
                  <div className="flex flex-col items-center text-center">
                    <div className="flex items-baseline gap-2 text-slate-900">
                      <span className="text-xl font-black text-blue-600">&gt;</span>
                      <span className="text-4xl md:text-5xl font-black tracking-tighter">{calculations.calcDiameter().h.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      <span className="text-lg font-black text-blue-600 uppercase tracking-tighter">mm</span>
                    </div>
                    <span className="text-xs text-slate-400 font-bold tracking-widest uppercase mt-2">Suction cup diameter</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="flex items-baseline gap-2 text-slate-900">
                      <span className="text-xl font-black text-blue-600">&gt;</span>
                      <span className="text-3xl md:text-4xl font-black tracking-tighter">{calculations.calcDiameter().area_h.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      <span className="text-base font-black text-blue-600 uppercase tracking-tighter">mm²</span>
                    </div>
                    <span className="text-xs text-slate-400 font-bold tracking-widest uppercase mt-2">Suction cup area</span>
                  </div>
                </div>
                <div className="w-full h-px bg-slate-100 my-6"></div>
                <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-slate-400 text-center">With horizontal force application</p>
              </div>

              {/* Card 2: Vertical */}
              <div className="flex flex-col items-center justify-center p-8 md:p-10 rounded-[2rem] bg-white border border-slate-200 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-transform duration-500">
                <div className="text-slate-600 mb-8 w-16 h-16"><CustomIcons.VerticalArrow className="w-full h-full" /></div>
                <div className="flex flex-col sm:flex-row w-full justify-center items-center gap-8 sm:gap-12">
                  <div className="flex flex-col items-center text-center">
                    <div className="flex items-baseline gap-2 text-slate-900">
                      <span className="text-xl font-black text-slate-500">&gt;</span>
                      <span className="text-4xl md:text-5xl font-black tracking-tighter">{calculations.calcDiameter().v.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      <span className="text-lg font-black text-slate-500 uppercase tracking-tighter">mm</span>
                    </div>
                    <span className="text-xs text-slate-400 font-bold tracking-widest uppercase mt-2">Suction cup diameter</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="flex items-baseline gap-2 text-slate-900">
                      <span className="text-xl font-black text-slate-500">&gt;</span>
                      <span className="text-3xl md:text-4xl font-black tracking-tighter">{calculations.calcDiameter().area_v.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      <span className="text-base font-black text-slate-500 uppercase tracking-tighter">mm²</span>
                    </div>
                    <span className="text-xs text-slate-400 font-bold tracking-widest uppercase mt-2">Suction cup area</span>
                  </div>
                </div>
                <div className="w-full h-px bg-slate-100 my-6"></div>
                <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-slate-400 text-center">With vertical force application</p>
              </div>
            </div>
          </div>
        </ModuleWrapper>
      );

      case 'suction_force': return (
        <ModuleWrapper title="Force Yield" subtitle="Suction Force Generation">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-12">
            <GlassCard className="p-6 md:p-12 space-y-6 md:space-y-8">
              <TechInput label="Suction Area" value={state.suctionArea} onValueChange={setters.setSuctionArea} unit={state.suctionAreaUnit} onUnitChange={setters.setSuctionAreaUnit} unitType="area" disabled={state.calcAreaMode} />
              <button onClick={() => setters.setCalcAreaMode(!state.calcAreaMode)} className={`mt-6 md:mt-8 w-full py-4 md:py-5 rounded-xl md:rounded-[1.5rem] font-black text-[10px] md:text-xs uppercase tracking-widest border-2 transition-all flex items-center justify-center gap-3 md:gap-4 ${state.calcAreaMode ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-50 border-slate-200 text-slate-400 hover:border-blue-600 hover:text-blue-600'}`}>
                {state.calcAreaMode ? <Check size={18} /> : <div className="w-4 h-4 rounded-full border-2 border-current" />} Hitung dari Geometri
              </button>
              {state.calcAreaMode && (
                <div className="mt-6 md:mt-10 space-y-4 md:space-y-8 animate-in zoom-in-95 duration-300">
                  <SelectField label="Tipe Permukaan" value={state.areaType} options={['Area round', 'Oval surface', 'Rectangle area']} onChange={setters.setAreaType} />
                  <div className="grid grid-cols-2 gap-4 md:gap-6">
                    <TechInput label={state.areaType === 'Area round' ? 'Diameter' : 'Panjang'} value={state.dim1} onValueChange={setters.setDim1} unit="mm" />
                    {state.areaType !== 'Area round' && <TechInput label="Lebar" value={state.dim2} onValueChange={setters.setDim2} unit="mm" />}
                  </div>
                </div>
              )}
              <TechInput label="Vacuum Level" value={state.vacuum} onValueChange={(val) => setters.setVacuum(Number(val))} unit={state.vacuumUnit} onUnitChange={setters.setVacuumUnit} unitType="pressure" step={0.1} />
              <TechInput label="Friction (µ)" value={state.friction} onValueChange={setters.setFriction} unit="" step={0.1} info={true} />
            </GlassCard>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
              <ResultDisplay label="Gaya Tarik (Tegak Lurus)" value={calculations.calcForce()} unit="N" icon={<CustomIcons.VerticalArrow className="w-8 h-8 md:w-12 md:h-12" />} color="blue" />
              <ResultDisplay label="Gaya Geser (Friction)" value={Math.round(calculations.calcForce() * state.friction)} unit="N" icon={<CustomIcons.HorizontalArrow className="w-8 h-8 md:w-12 md:h-12" />} color="orange" />
            </div>
          </div>
        </ModuleWrapper>
      );

      case 'holding_force': return (
        <ModuleWrapper title="Security" subtitle="Theoretical Holding Force">
          <div className="flex flex-col gap-6 md:gap-12">
            <GlassCard className="p-6 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <TechInput label="Mass of workpiece" value={state.mass} onValueChange={setters.setMass} unit={state.massUnit} onUnitChange={setters.setMassUnit} unitType="mass" />
                <TechInput label="Acceleration" value={state.accel} onValueChange={(val) => setters.setAccel(Number(val))} unit={state.accelUnit} onUnitChange={setters.setAccelUnit} unitType="accel" />
                <TechInput label="Friction coefficient" value={state.friction} onValueChange={setters.setFriction} unit="" step={0.1} />
                <TechInput label="Safety factor" value={state.safety} onValueChange={setters.setSafety} unit="" step={0.1} />
              </div>
            </GlassCard>

            <div className="flex items-center justify-center -my-2 md:-my-6 text-slate-300">
              <ChevronDown size={32} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
              <ResultDisplay label="Load case 1" value={calculations.calcHoldingForce().lc1.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} unit="N" icon={<CustomIcons.VerticalArrow className="w-8 h-8 md:w-12 md:h-12" />} color="blue" />
              <ResultDisplay label="Load case 2" value={calculations.calcHoldingForce().lc2.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} unit="N" icon={<CustomIcons.HorizontalArrow className="w-8 h-8 md:w-12 md:h-12" />} color="indigo" />
              <ResultDisplay label="Load case 3" value={calculations.calcHoldingForce().lc3.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} unit="N" icon={<div className="transform rotate-90"><CustomIcons.VerticalArrow className="w-8 h-8 md:w-12 md:h-12" /></div>} color="slate" />
            </div>
          </div>
        </ModuleWrapper>
      );

      case 'hose_dist': return (
        <ModuleWrapper title="Flow Logic" subtitle="Hose Network Distribution">
          <div className="max-w-4xl mx-auto space-y-6 md:space-y-12">
            <GlassCard className="p-6 md:p-12">
              <div className="flex flex-col sm:flex-row bg-slate-100 p-2 rounded-xl md:rounded-[1.5rem] mb-6 md:mb-12 gap-2">
                <button onClick={() => setters.setHoseDistMode('main_to_sub')} className={`flex-1 py-3 md:py-5 rounded-lg md:rounded-[1rem] font-black text-[10px] md:text-xs uppercase tracking-[0.1em] md:tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${state.hoseDistMode === 'main_to_sub' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-400'}`}>
                  <CustomIcons.hoseBranch /> Utama → Cabang
                </button>
                <button onClick={() => setters.setHoseDistMode('sub_to_main')} className={`flex-1 py-3 md:py-5 rounded-lg md:rounded-[1rem] font-black text-[10px] md:text-xs uppercase tracking-[0.1em] md:tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${state.hoseDistMode !== 'main_to_sub' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-400'}`}>
                  <div className="rotate-180"><CustomIcons.hoseBranch /></div> Cabang → Utama
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-6 md:gap-10">
                <TechInput label={state.hoseDistMode === 'main_to_sub' ? "Ø Selang Utama" : "Ø Selang Cabang"} value={state.hoseInputDia} onValueChange={setters.setHoseInputDia} unit={state.hoseInputDiaUnit} onUnitChange={setters.setHoseInputDiaUnit} unitType="length" />
                <TechInput label="Jumlah Cabang" value={state.subHoses} onValueChange={setters.setSubHoses} unit="pcs" />
              </div>
            </GlassCard>
            <ResultDisplay label={state.hoseDistMode === 'main_to_sub' ? "Rekomendasi Ø Cabang" : "Rekomendasi Ø Utama"} value={calculations.calcHoseDist()} unit={state.hoseInputDiaUnit} icon={<Share2 size={32} />} color="indigo" />
          </div>
        </ModuleWrapper>
      );

      case 'evac_time': return (
        <ModuleWrapper title="Dynamics" subtitle="System Evacuation Time">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-12">
            <GlassCard className="p-6 md:p-12 space-y-6 md:space-y-8">
              <TechInput label="Volume Tangki" value={state.volume} onValueChange={setters.setVolume} unit={state.volumeUnit} onUnitChange={setters.setVolumeUnit} unitType="volume" />
              <TechInput label="Kapasitas Pompa" value={state.pumpCapacity} onValueChange={setters.setPumpCapacity} unit={state.pumpCapacityUnit} onUnitChange={setters.setPumpCapacityUnit} unitType="flow" />
              <TechInput label="Target Vakum" value={state.vacuum} onValueChange={setters.setVacuum} unit={state.vacuumUnit} onUnitChange={setters.setVacuumUnit} unitType="pressure" step={0.1} />
            </GlassCard>
            <ResultDisplay label="Waktu Evakuasi" value={calculations.calcEvacTime().toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} unit="s" icon={<Timer size={40} />} color="emerald" />
          </div>
        </ModuleWrapper>
      );

      case 'suction_cap': return (
        <ModuleWrapper title="Capacity" subtitle="Required Suction Capacity">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-12">
            <GlassCard className="p-6 md:p-12 space-y-6 md:space-y-8">
              <TechInput label="Volume Tangki" value={state.volume} onValueChange={setters.setVolume} unit={state.volumeUnit} onUnitChange={setters.setVolumeUnit} unitType="volume" />
              <TechInput label="Target Vakum" value={state.vacuum} onValueChange={setters.setVacuum} unit={state.vacuumUnit} onUnitChange={setters.setVacuumUnit} unitType="pressure" step={0.1} />
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <TechInput label="Waktu Target" value={state.evacTime} onValueChange={setters.setEvacTime} unit={state.evacTimeUnit} onUnitChange={setters.setEvacTimeUnit} unitType="none" />
                <SelectField label="Satuan Output" value={state.reqSuctionCapUnit} options={UNITS.flow.options} onChange={setters.setReqSuctionCapUnit} />
              </div>
            </GlassCard>
            <ResultDisplay label="Kapasitas Pompa Ideal" value={calculations.calcSuctionCap().toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} unit={state.reqSuctionCapUnit} icon={<Wind size={40} />} color="blue" />
          </div>
        </ModuleWrapper>
      );

      case 'hose_dia_vac': return (
        <ModuleWrapper title="Piping" subtitle="Hose Diameter Selection">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-12">
            <GlassCard className="p-6 md:p-12">
              <div className="flex flex-col sm:flex-row bg-slate-100 p-2 rounded-xl md:rounded-[1.5rem] mb-6 md:mb-10 gap-2">
                <button onClick={() => setters.setHoseDiaMode('vacuum')} className={`flex-1 py-3 md:py-5 rounded-lg md:rounded-[1rem] font-black text-[10px] md:text-xs uppercase tracking-widest transition-all ${state.hoseDiaMode === 'vacuum' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-400'}`}>Vacuum Hose</button>
                <button onClick={() => setters.setHoseDiaMode('compressed')} className={`flex-1 py-3 md:py-5 rounded-lg md:rounded-[1rem] font-black text-[10px] md:text-xs uppercase tracking-widest transition-all ${state.hoseDiaMode !== 'vacuum' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-400'}`}>Comp. Air Hose</button>
              </div>
              <div className="space-y-6 md:space-y-8">
                {state.hoseDiaMode === 'vacuum' ? (
                  <>
                    <TechInput label="Panjang Selang" value={state.hoseLength} onValueChange={setters.setHoseLength} unit={state.hoseLengthUnit} onUnitChange={setters.setHoseLengthUnit} unitType="length" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <TechInput label="Kapasitas Suction" value={state.pumpCapacity} onValueChange={setters.setPumpCapacity} unit={state.pumpCapacityUnit} onUnitChange={setters.setPumpCapacityUnit} unitType="flow" />
                      <TechInput label="Kecepatan Aliran (v)" value={state.flowRate} onValueChange={setters.setFlowRate} unit={state.flowRateUnit} onUnitChange={setters.setFlowRateUnit} unitType="velocity" />
                    </div>
                  </>
                ) : (
                  <>
                    <TechInput label="Laju Volume (Q)" value={state.pumpCapacity} onValueChange={setters.setPumpCapacity} unit={state.pumpCapacityUnit} onUnitChange={setters.setPumpCapacityUnit} unitType="flow" />
                    <TechInput label="Tekanan Sistem" value={state.sysPressure} onValueChange={setters.setSysPressure} unit={state.sysPressureUnit} onUnitChange={setters.setSysPressureUnit} unitType="pressure" />
                    <TechInput label="Tekanan Generator" value={state.genPressure} onValueChange={setters.setGenPressure} unit={state.genPressureUnit} onUnitChange={setters.setGenPressureUnit} unitType="pressure" />
                    <TechInput label="Panjang Selang" value={state.hoseLength} onValueChange={setters.setHoseLength} unit={state.hoseLengthUnit} onUnitChange={setters.setHoseLengthUnit} unitType="length" />
                  </>
                )}
              </div>
            </GlassCard>
            <ResultDisplay label="Diameter Selang Ideal" value={calculations.calcHoseDiameter().toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} unit="mm" icon={<Activity size={40} />} color="blue" />
          </div>
        </ModuleWrapper>
      );

      case 'ambient_pressure': return (
        <ModuleWrapper title="Atmosphere" subtitle="Ambient Pressure & Limits">
          <div className="flex flex-col gap-6 md:gap-12">
            <GlassCard className="p-6 md:p-12 space-y-6 md:space-y-8 max-w-3xl mx-auto w-full">
              <TechInput label="Ketinggian Elevasi (h)" value={state.altitude} onValueChange={setters.setAltitude} unit={state.altitudeUnit} onUnitChange={setters.setAltitudeUnit} unitType="length" />
              <TechInput label="Target Efisiensi Pompa" value={state.nominalEvacuation} onValueChange={setters.setNominalEvacuation} unit="%" unitType="percentage" />
            </GlassCard>

            <div className="flex items-center justify-center -my-2 md:-my-6 text-slate-300">
              <ChevronDown size={32} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
              <ResultDisplay label="Tekanan Ambien" value={calculations.calcAtmosphere().ambient.toLocaleString('id-ID', { maximumFractionDigits: 2 })} unit="mbar, abs" icon={<Cloud size={28} />} color="slate" />
              <ResultDisplay label="Batas Vakum Maksimal" value={calculations.calcAtmosphere().max_vac.toLocaleString('id-ID', { maximumFractionDigits: 2 })} unit="mbar, rel" icon={<Gauge size={28} />} color="blue" />
              <ResultDisplay label="Max (Cuaca Buruk -5%)" value={calculations.calcAtmosphere().max_vac_bad.toLocaleString('id-ID', { maximumFractionDigits: 2 })} unit="mbar, rel" icon={<div className="text-orange-500 font-bold"><Gauge size={28} /></div>} color="orange" />
            </div>
          </div>
        </ModuleWrapper>
      );

      default: return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans pt-20">
      {state.currentView === 'dashboard' && (
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-100/50 to-transparent pointer-events-none" />
      )}

      {state.currentView !== 'dashboard' && (
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-cyan-400 z-50 shadow-lg shadow-blue-500/30" />
      )}

      {renderContent()}
    </div>
  );
};

export default VacuumCalculator;