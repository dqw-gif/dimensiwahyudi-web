'use client';

import React from 'react';
import Link from 'next/link';
import { vacuumTubeLifterVariants } from '../data/products/vacuum-tube-lifters';
import { localizeProduct } from '../data/products/translations_id';
import { AlertTriangle, Droplets, Wind, Check, ArrowRight } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

export default function ProductMatrix() {
  const { lang } = useLanguage();
  const isId = lang === 'id';

  return (
    <div className="w-full bg-white/85 rounded-2xl sm:rounded-3xl border border-white/95 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] ring-1 ring-[#005596]/12 backdrop-blur-2xl overflow-hidden my-16">
      <div className="bg-gradient-to-br from-[#002244] via-[#003b6d] to-[#005596] p-6 sm:p-8 md:p-10 text-white relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#005596]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold uppercase tracking-widest text-blue-200 mb-3">
            {isId ? 'Matriks Spesifikasi Teknis' : 'Technical Specification Matrix'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black mb-2 text-white tracking-tight">
            {isId ? 'Perbandingan Varian Model' : 'Model Comparison Matrix'}
          </h2>
          <p className="text-blue-100/90 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
            {isId
              ? 'Bandingkan kapasitas payload maksimal, tipe handle kendali, dan sertifikasi keselamatan tiap seri secara berdampingan untuk menentukan unit yang tepat bagi lini produksi Anda.'
              : 'Evaluate maximum loading capacities, specific industrial handles, and safety ratings head-to-head to determine the ideal handling solution for your factory.'}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200/80">
              <th className="p-5 font-mono text-xs font-bold text-[#005596] uppercase tracking-wider w-1/4">
                {isId ? 'Seri Model' : 'Series Model'}
              </th>
              <th className="p-5 font-mono text-xs font-bold text-[#005596] uppercase tracking-wider">
                {isId ? 'Kapasitas Maks' : 'Max Capacity'}
              </th>
              <th className="p-5 font-mono text-xs font-bold text-[#005596] uppercase tracking-wider">
                {isId ? 'Tipe Handle' : 'Handle Type'}
              </th>
              <th className="p-5 font-mono text-xs font-bold text-[#005596] uppercase tracking-wider">
                {isId ? 'Keunggulan Utama' : 'Highlight Feature'}
              </th>
              <th className="p-5 font-mono text-xs font-bold text-[#005596] uppercase tracking-wider text-center">
                {isId ? 'Sertifikasi / Zona' : 'Safety / Badge'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/80">
            {vacuumTubeLifterVariants.map((rawVariant) => {
              const variant = localizeProduct(rawVariant, lang);
              return (
                <tr key={variant.slug} className="hover:bg-[#005596]/5 transition-colors">
                  <td className="p-5">
                    <span className="font-mono font-bold text-slate-900 block text-base">{variant.seriesCode}</span>
                    <span className="text-xs text-slate-500 font-medium">{variant.name}</span>
                  </td>
                  <td className="p-5 font-mono text-[#005596] font-bold text-sm">
                    {variant.capacity}
                  </td>
                  <td className="p-5 text-sm text-slate-700 font-medium">
                    {rawVariant.specs.find(s => s.label === 'Control' || s.label === 'Handle' || s.label === 'Operation')?.value || 'Standard'}
                  </td>
                  <td className="p-5 text-sm text-slate-600">
                    <div className="flex items-start gap-2">
                      <Check size={16} className="text-emerald-500 mt-0.5 shrink-0 stroke-[2.5]" />
                      <span className="font-normal">{variant.highlight}</span>
                    </div>
                  </td>
                  <td className="p-5 text-center">
                    {variant.badge ? (
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider rounded-full mx-auto
                        ${variant.badge === 'ATEX' ? 'bg-amber-500/10 text-amber-700 border border-amber-500/20' : 
                          variant.badge === 'Food Grade' ? 'bg-teal-500/10 text-teal-700 border border-teal-500/20' : 
                          'bg-[#005596]/10 text-[#005596] border border-[#005596]/20'
                        }
                      `}>
                        {variant.badge === 'ATEX' && <AlertTriangle size={11} />}
                        {variant.badge === 'Food Grade' && <Droplets size={11} />}
                        {variant.badge === 'IP69K' && <Wind size={11} />}
                        {variant.badge}
                      </span>
                    ) : (
                      <span className="text-slate-300 text-xs font-mono">-</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="bg-slate-50/70 p-4 sm:p-5 border-t border-slate-200/80 text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-sm">
        <p className="font-medium">
          {isId ? 'Geser tabel ke kiri/kanan pada layar ponsel.' : 'Swipe left/right to view full table on mobile.'}
        </p>
        <Link href="/digital-assistant/roi-calculator" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#005596] hover:text-[#004276] transition-colors">
          <span>{isId ? 'Belum yakin memilih model? Hitung estimasi ROI terlebih dahulu' : 'Unsure which model? Calculate exact ROI first'}</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}
