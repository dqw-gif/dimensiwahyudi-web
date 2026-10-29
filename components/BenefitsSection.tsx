'use client';

import Link from 'next/link';
import { ArrowRight, Box, Shield, Cpu, Anchor } from 'lucide-react';

const solutions = [
  {
    category: 'High-Speed Manual Handling',
    title: 'Vacuum Tube Lifters (JumboFlex & Jumbo Series)',
    desc: 'Built for high-cycle transfer with single-handed intuitive control. Transfers load weight away from operator shoulders and lumbar joints to a reinforced pneumatic lift tube.',
    icon: Box,
    payload: '20 to 300 kg',
    applications: 'Cartons, Cement Sacks, Flour Bags, Small Drums',
    link: '/products/schmalz',
  },
  {
    category: 'Heavy Material Handling',
    title: 'VacuMaster Lifting Systems',
    desc: 'Engineered for dense sheet metal, architectural glass, and structural timber panels. Includes 90° motorized tilting and 180° rotation for CNC laser cutting, press brake, and router infeed.',
    icon: Anchor,
    payload: '100 to 2,000 kg',
    applications: 'Steel Plates, Stainless Sheets, Architectural Glass, MDF Boards',
    link: '/products/schmalz',
  },
  {
    category: 'Modular Runway Systems',
    title: 'Aluminum Light Crane & Jib Cranes',
    desc: 'Cold-extruded aluminum rails with low friction coefficients. Provides smooth lateral gliding with minimal starting resistance across operator work areas.',
    icon: Shield,
    payload: 'Up to 12 m span',
    applications: 'Independent Workstations, Assembly Line Bridge Cranes',
    link: '/products/binar',
  },
  {
    category: 'End-of-Arm Tooling (EOAT)',
    title: 'Vacuum Grippers & Robotic Automation',
    desc: 'Vacuum end effectors configured for collaborative robots (Cobots) and articulated industrial arms. Tailored for pick-and-place tasks with variable packaging surfaces.',
    icon: Cpu,
    payload: 'Cobot & Robot Integration',
    applications: 'Cobot Palletizing, Packaging Automation, Conveyor Sorting',
    link: '/products/schmalz',
  },
];

export default function BenefitsSection() {
  return (
    <section className="py-20 lg:py-24 bg-slate-50 border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#005596] block mb-2">
              Material Handling Engineering Capabilities
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Four Core Pillars in Vacuum Handling &amp; Industrial Ergonomics
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed font-normal">
              From high-frequency carton transfer to 2,000 kg steel plate manipulation, we supply engineered systems built to European safety standards.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#005596] hover:text-[#003b6d] transition-colors shrink-0"
          >
            <span>Explore Complete Product Line</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Solution Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {solutions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                      {item.category}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 border border-slate-200/80">
                      <Icon className="w-4 h-4 text-[#005596]" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="font-semibold text-slate-700">Capacity:</span>
                    <span className="font-mono font-bold text-slate-900">{item.payload}</span>
                  </div>
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="font-semibold text-slate-700">Typical Workpieces:</span>
                    <span className="text-slate-500 text-right">{item.applications}</span>
                  </div>

                  <div className="pt-3">
                    <Link
                      href={item.link}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#005596] hover:text-[#003b6d] transition-colors"
                    >
                      <span>View Series Specifications</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
