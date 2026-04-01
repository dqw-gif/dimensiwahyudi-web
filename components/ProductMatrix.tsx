import React from 'react';
import { vacuumTubeLifterVariants } from '../data/products/vacuum-tube-lifters';
import { AlertTriangle, Droplets, Wind, Check } from 'lucide-react';

export default function ProductMatrix() {
  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden my-16">
      <div className="bg-slate-950 p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <h2 className="text-2xl md:text-3xl font-black mb-2 relative z-10">Model Comparison Matrix</h2>
        <p className="text-slate-400 text-sm md:text-base relative z-10 max-w-2xl">
          Evaluate maximum loading capacities, specific industrial handles, and safety ratings Head-to-Head to determine the ideal handling solution for your factory.
        </p>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-5 font-bold text-slate-900 w-1/4">Series Model</th>
              <th className="p-5 font-bold text-slate-500 text-sm uppercase tracking-wider">Max Capacity</th>
              <th className="p-5 font-bold text-slate-500 text-sm uppercase tracking-wider">Handle Type</th>
              <th className="p-5 font-bold text-slate-500 text-sm uppercase tracking-wider">Highlight Feature</th>
              <th className="p-5 font-bold text-slate-500 text-sm uppercase tracking-wider text-center">Safety / Badge</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {vacuumTubeLifterVariants.map((variant) => (
              <tr key={variant.slug} className="hover:bg-blue-50/30 transition-colors">
                <td className="p-5">
                  <span className="font-bold text-slate-900 block text-lg">{variant.seriesCode}</span>
                  <span className="text-xs text-slate-500">{variant.name}</span>
                </td>
                <td className="p-5 font-mono text-blue-600 font-bold">
                  {variant.capacity}
                </td>
                <td className="p-5 text-sm text-slate-700">
                  {variant.specs.find(s => s.label === 'Control' || s.label === 'Handle' || s.label === 'Operation')?.value || 'Standard'}
                </td>
                <td className="p-5 text-sm text-slate-600 font-medium">
                  <div className="flex items-start gap-2">
                    <Check size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                    {variant.highlight}
                  </div>
                </td>
                <td className="p-5 text-center">
                  {variant.badge ? (
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-md mx-auto
                      ${variant.badge === 'ATEX' ? 'bg-orange-100 text-orange-700 border border-orange-200' : 
                        variant.badge === 'Food Grade' ? 'bg-teal-100 text-teal-700 border border-teal-200' : 
                        'bg-cyan-100 text-cyan-700 border border-cyan-200'
                      }
                    `}>
                      {variant.badge === 'ATEX' && <AlertTriangle size={12} />}
                      {variant.badge === 'Food Grade' && <Droplets size={12} />}
                      {variant.badge === 'IP69K' && <Wind size={12} />}
                      {variant.badge}
                    </span>
                  ) : (
                    <span className="text-slate-300 text-xs font-bold uppercase tracking-wider">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="bg-slate-50 p-4 border-t border-slate-200 text-center text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4">
        <p>Swipe left/right to view full table on mobile.</p>
        <a href="#roi-calculator" className="text-blue-600 font-bold hover:underline">Unsure which model? Calculate exact ROI first.</a>
      </div>
    </div>
  );
}
