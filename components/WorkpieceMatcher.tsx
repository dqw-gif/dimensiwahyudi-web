'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, SlidersHorizontal, Package, Wheat, Fuel, Layers, Compass, Info } from 'lucide-react';

interface WorkpieceCategory {
  id: string;
  name: string;
  industry: string;
  icon: typeof Package;
  minWeight: number;
  maxWeight: number;
  defaultWeight: number;
  workpieces: {
    maxWeightThreshold: number;
    lifterModel: string;
    brand: string;
    suctionPad: string;
    cycleSpeed: string;
    ergonomicsRating: string;
    typicalApplications: string;
    brochureUrl: string;
    specs: {
      reachRadius: string;
      controlHandle: string;
      safetyValve: string;
    };
  }[];
}

const workpieceCategories: WorkpieceCategory[] = [
  {
    id: 'box',
    name: 'Cartons & Boxes',
    industry: 'Logistics, E-Commerce, Food & Beverage, Pharmaceuticals',
    icon: Package,
    minWeight: 5,
    maxWeight: 85,
    defaultWeight: 35,
    workpieces: [
      {
        maxWeightThreshold: 35,
        lifterModel: 'Schmalz JumboFlex 35',
        brand: 'Schmalz (Germany)',
        suctionPad: 'Round Bellows Pad 160 mm (Food-grade NBR)',
        cycleSpeed: 'Up to 350 cycles/hr (Single-Hand Operation)',
        ergonomicsRating: 'German AGR Medical Certification (Zero Lumbar Strain)',
        typicalApplications: 'Palletizing and depalletizing biscuit cartons, pharmaceuticals, e-commerce parcels',
        brochureUrl: '/brochures/product-overview.pdf',
        specs: {
          reachRadius: 'Modular jib crane up to 6 m radius',
          controlHandle: 'Ergonomic 1-finger trigger control',
          safetyValve: 'Automatic vacuum retention valve (controlled lowering during power cuts)',
        },
      },
      {
        maxWeightThreshold: 85,
        lifterModel: 'Schmalz JumboFlex 50 / JumboSprint 85',
        brand: 'Schmalz (Germany)',
        suctionPad: 'Double Suction Plate with Precision Slide Valve',
        cycleSpeed: 'Up to 280 cycles/hr',
        ergonomicsRating: 'German AGR Medical Certification',
        typicalApplications: 'Motor oil cartons, automotive spare parts boxes, heavy liquid cases',
        brochureUrl: '/brochures/ergonomic-vacuum-lifters.pdf',
        specs: {
          reachRadius: 'Overhead aluminum light crane up to 12 m span',
          controlHandle: 'Two-hand safety operator bow handle',
          safetyValve: 'Integrated non-return safety check valve',
        },
      },
    ],
  },
  {
    id: 'sack',
    name: 'Sacks & Bags',
    industry: 'Chemical, Cement, Food Ingredients, Animal Feed, Plastics',
    icon: Wheat,
    minWeight: 15,
    maxWeight: 100,
    defaultWeight: 50,
    workpieces: [
      {
        maxWeightThreshold: 60,
        lifterModel: 'Schmalz JumboErgo 60 (Sack Edition)',
        brand: 'Schmalz (Germany)',
        suctionPad: 'Special Sack Gripper with Sponge Sealing Lip & Dust Skirt',
        cycleSpeed: 'Up to 240 cycles/hr',
        ergonomicsRating: 'AGR Certified (Lower Back Herniation Prevention)',
        typicalApplications: '50 kg sugar bags, premix cement sacks, plastic resin bags, flour sacks',
        brochureUrl: '/brochures/ergonomic-vacuum-lifters.pdf',
        specs: {
          reachRadius: 'Articulated 360° jib crane',
          controlHandle: 'Twist-grip handle (motorcycle-throttle style for continuous flow)',
          safetyValve: 'Dual-stage cyclone dust filter prevents particulate ingress into the pump',
        },
      },
      {
        maxWeightThreshold: 100,
        lifterModel: 'Schmalz JumboSprint 85 / 110 Heavy Sack',
        brand: 'Schmalz (Germany)',
        suctionPad: 'High-Flow Multi-Chamber Vacuum Pad for woven/porous sacks',
        cycleSpeed: 'Up to 180 cycles/hr',
        ergonomicsRating: 'AGR Certified Heavy Lifting Assist',
        typicalApplications: 'Unloading container trucks with chemical raw material and animal feed sacks',
        brochureUrl: '/brochures/ergonomic-vacuum-lifters.pdf',
        specs: {
          reachRadius: 'Dual-girder overhead runway crane system',
          controlHandle: 'Extended safety handle for reaching high pallet tiers',
          safetyValve: 'High-volume safety vacuum reservoir tank',
        },
      },
    ],
  },
  {
    id: 'drum',
    name: 'Drums, Pails & Barrels',
    industry: 'Oil & Lubricants, Paints & Coatings, Industrial Chemicals',
    icon: Fuel,
    minWeight: 20,
    maxWeight: 300,
    defaultWeight: 150,
    workpieces: [
      {
        maxWeightThreshold: 120,
        lifterModel: 'Schmalz VacuMaster Drum 100',
        brand: 'Schmalz (Germany)',
        suctionPad: 'Curved Vacuum Gripper Plate for cylindrical drum perimeters',
        cycleSpeed: 'Precision controlled handling',
        ergonomicsRating: 'Zero manual strain for upright and tilted drums',
        typicalApplications: '20 to 25 kg paint pails, solvent containers, chemical jerrycans',
        brochureUrl: '/brochures/vacuum-automation.pdf',
        specs: {
          reachRadius: 'Overhead jib crane with integrated hoist',
          controlHandle: 'Ergonomic crane operator pendant with safety lockout',
          safetyValve: 'Acoustic and visual vacuum pressure warning buzzer',
        },
      },
      {
        maxWeightThreshold: 300,
        lifterModel: 'Binar Quick-Lift Driven 300i / VacuMaster Vario',
        brand: 'Binar Handling (Sweden) & Schmalz',
        suctionPad: 'Mechanical Rim Clamp + High-Tack Suction Dual Security',
        cycleSpeed: 'Servo-controlled float sensing (follows hand movement without drag)',
        ergonomicsRating: 'Ultra-Ergonomic Servo Balancer (20 g hand sensitivity)',
        typicalApplications: 'Standard 200-liter steel drums (200 to 250 kg) at filling and blending stations',
        brochureUrl: '/brochures/product-overview.pdf',
        specs: {
          reachRadius: 'Articulated arm 3 m radius or runway track',
          controlHandle: 'Intelligent handle with force sensor',
          safetyValve: 'Independent mechanical anti-drop lock without electrical reliance',
        },
      },
    ],
  },
  {
    id: 'metal',
    name: 'Sheet Metal & Plates',
    industry: 'Automotive Stamping, CNC Laser Cutting, Metal Fabrication',
    icon: Layers,
    minWeight: 50,
    maxWeight: 300,
    defaultWeight: 180,
    workpieces: [
      {
        maxWeightThreshold: 150,
        lifterModel: 'Schmalz VacuMaster Basic 125',
        brand: 'Schmalz (Germany)',
        suctionPad: 'Flat Rubber Pads with High Friction Pattern for oily sheets',
        cycleSpeed: 'Rapid CNC machine infeed without surface scratches',
        ergonomicsRating: 'Protects operators from laceration hazards and spinal loading',
        typicalApplications: 'Infeed of steel, aluminum, and stainless sheets onto laser cutting tables',
        brochureUrl: '/brochures/product-overview.pdf',
        specs: {
          reachRadius: 'Wide-area aluminum bridge crane system',
          controlHandle: 'Operator handle with quick-release vacuum vent valve',
          safetyValve: 'High-precision analog vacuum gauge with safe red/green zones',
        },
      },
      {
        maxWeightThreshold: 300,
        lifterModel: 'Schmalz VacuMaster Comfort 300 (Tilt 90°)',
        brand: 'Schmalz (Germany)',
        suctionPad: 'Multi-Pad Cross Beam System (Adjustable pad positions)',
        cycleSpeed: 'Equipped with 90° horizontal-to-vertical motorized swivel drive',
        ergonomicsRating: 'Prevents spinal torsion when standing plates upright',
        typicalApplications: 'Extracting plates from vertical storage racks and loading flat onto press brakes',
        brochureUrl: '/brochures/product-overview.pdf',
        specs: {
          reachRadius: 'Heavy-duty industrial gantry runway crane',
          controlHandle: 'Comfort push-button console with dual safety interlocks',
          safetyValve: 'Battery backup safety system with audible warning buzzer',
        },
      },
    ],
  },
  {
    id: 'wood-glass',
    name: 'Wood, Panels & Glass',
    industry: 'Furniture, Building Construction, Solar Photovoltaics',
    icon: Compass,
    minWeight: 30,
    maxWeight: 250,
    defaultWeight: 120,
    workpieces: [
      {
        maxWeightThreshold: 150,
        lifterModel: 'Schmalz VacuMaster Window / Wood Basic',
        brand: 'Schmalz (Germany)',
        suctionPad: 'Non-Marking Suction Pads (Leaves zero residue on glass or varnished wood)',
        cycleSpeed: 'Smooth handling with zero crack or surface blemish risks',
        ergonomicsRating: '1 operator handles wide glass panes independently',
        typicalApplications: 'Handling architectural glass, finished windows, plywood, MDF, and wooden doors',
        brochureUrl: '/brochures/product-overview.pdf',
        specs: {
          reachRadius: 'Wall-mounted or column-mounted aluminum jib crane',
          controlHandle: 'Extended ergonomic handle for unobstructed glass placement line of sight',
          safetyValve: 'Micro-leak sensor with visual indicator',
        },
      },
      {
        maxWeightThreshold: 300,
        lifterModel: 'Schmalz VacuMaster Multi 250 (Swivel 90°)',
        brand: 'Schmalz (Germany)',
        suctionPad: 'High-Tack Silicone-Free Suction Pads',
        cycleSpeed: 'Precision rotation and tilt for furniture assembly',
        ergonomicsRating: 'Replaces a 3-person manual lift with 1 autonomous operator',
        typicalApplications: 'Mounting solar panels, solid partition boards, marble slabs',
        brochureUrl: '/brochures/product-overview.pdf',
        specs: {
          reachRadius: 'Ultra-low friction aluminum overhead crane',
          controlHandle: 'Ergonomic console with motorized tilt controls',
          safetyValve: 'Dual-circuit safety vacuum system conforming to European CE standards',
        },
      },
    ],
  },
];

export default function WorkpieceMatcher() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('box');
  const [currentWeight, setCurrentWeight] = useState<number>(35);

  const selectedCategory = workpieceCategories.find((c) => c.id === selectedCategoryId) || workpieceCategories[0];

  const handleCategoryChange = (cat: WorkpieceCategory) => {
    setSelectedCategoryId(cat.id);
    setCurrentWeight(cat.defaultWeight);
  };

  const matchedLifter =
    selectedCategory.workpieces.find((w) => currentWeight <= w.maxWeightThreshold) ||
    selectedCategory.workpieces[selectedCategory.workpieces.length - 1];

  return (
    <section className="py-20 lg:py-24 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 rounded-md text-xs font-semibold text-slate-700 mb-3">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#005596]" />
            <span>Digital Application Engineering Tool</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Match the Right Lifting System to Your Workpiece
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed font-normal">
            Select your load profile and estimated workpiece weight. Our application database recommends verified lifter models, suction pad designs, and ergonomic crane configurations.
          </p>
        </div>

        {/* Step 1: Workpiece Category Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 mb-10">
          {workpieceCategories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = cat.id === selectedCategoryId;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat)}
                type="button"
                className={`p-3.5 sm:p-4 rounded-xl text-left border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 border-slate-900 text-white shadow-md'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-[#005596] text-white' : 'bg-white border border-slate-200 text-slate-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  )}
                </div>
                <div>
                  <div className="font-bold text-sm sm:text-base leading-tight mb-1">{cat.name}</div>
                  <div className={`text-[11px] leading-tight ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    {cat.minWeight} to {cat.maxWeight} kg
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Step 2 & 3: Weight Slider & Live Engineering Recommendation Box */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls: Weight Slider Box */}
          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Selected Category:
              </div>
              <h3 className="text-lg font-bold text-slate-900">{selectedCategory.name}</h3>
              <p className="text-xs text-slate-500 mt-1 leading-normal">
                Commonly deployed in: {selectedCategory.industry}
              </p>
            </div>

            {/* Slider Input */}
            <div className="space-y-3 pt-2 border-t border-slate-200/80">
              <div className="flex justify-between items-baseline">
                <label htmlFor="weight-slider" className="text-sm font-semibold text-slate-700">
                  Estimated Workpiece Weight:
                </label>
                <span className="text-2xl font-black text-[#005596] font-mono">
                  {currentWeight} <span className="text-sm font-bold text-slate-500">KG</span>
                </span>
              </div>

              <input
                id="weight-slider"
                type="range"
                min={selectedCategory.minWeight}
                max={selectedCategory.maxWeight}
                step={5}
                value={currentWeight}
                onChange={(e) => setCurrentWeight(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#005596]"
              />

              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>{selectedCategory.minWeight} kg</span>
                <span>Max: {selectedCategory.maxWeight} kg</span>
              </div>
            </div>

            {/* Quick Weight Select Buttons */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-500">Popular Weight Presets:</span>
              <div className="flex flex-wrap gap-2">
                {[
                  selectedCategory.minWeight,
                  selectedCategory.defaultWeight,
                  Math.min(selectedCategory.defaultWeight + 25, selectedCategory.maxWeight),
                  selectedCategory.maxWeight,
                ]
                  .filter((v, i, a) => a.indexOf(v) === i)
                  .map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setCurrentWeight(w)}
                      className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all ${
                        currentWeight === w
                          ? 'bg-[#005596] text-white font-bold shadow-2xs'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {w} kg
                    </button>
                  ))}
              </div>
            </div>

            <div className="p-3.5 bg-blue-50/60 border border-blue-100 rounded-lg text-xs text-blue-900 leading-relaxed flex items-start gap-2">
              <Info size={15} className="text-blue-600 mt-0.5 shrink-0" />
              <div>
                <strong>Need capacity above 300 kg up to 2,000 kg?</strong> We supply custom hoist cranes and VacuMaster Heavy Duty systems for heavy steel and plate fabrication.
              </div>
            </div>
          </div>

          {/* Result: Live Engineering Recommendation Card */}
          <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-3">
              <div>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#005596] block mb-1">
                  Recommended Lifter Configuration:
                </span>
                <h4 className="text-2xl font-black text-slate-900 tracking-tight">
                  {matchedLifter.lifterModel}
                </h4>
                <div className="text-xs font-medium text-slate-500 mt-0.5">
                  Manufacturer: {matchedLifter.brand}
                </div>
              </div>

              <div className="self-start sm:self-center px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-md text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% matched to {currentWeight} kg</span>
              </div>
            </div>

            {/* Specifications Matrix Table */}
            <div className="py-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold mb-1">
                    Suction Pad / Gripper Specification
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    {matchedLifter.suctionPad}
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold mb-1">
                    Cycle Throughput Speed
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    {matchedLifter.cycleSpeed}
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                  Ergonomic &amp; Medical Validation:
                </div>
                <div className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed flex items-center gap-1.5">
                  <Check size={14} className="text-emerald-600 shrink-0" />
                  <span>{matchedLifter.ergonomicsRating}</span>
                </div>
                <div className="text-xs text-slate-500 leading-normal">
                  Primary Workpiece Focus: {matchedLifter.typicalApplications}
                </div>
              </div>

              {/* Hardware Feature Points */}
              <div className="grid sm:grid-cols-3 gap-2.5 text-xs text-slate-600 pt-2">
                <div className="p-2.5 bg-white border border-slate-100 rounded-lg">
                  <span className="font-semibold text-slate-800 block text-[11px]">Working Radius:</span>
                  <span className="text-[11px] text-slate-500">{matchedLifter.specs.reachRadius}</span>
                </div>
                <div className="p-2.5 bg-white border border-slate-100 rounded-lg">
                  <span className="font-semibold text-slate-800 block text-[11px]">Control Interface:</span>
                  <span className="text-[11px] text-slate-500">{matchedLifter.specs.controlHandle}</span>
                </div>
                <div className="p-2.5 bg-white border border-slate-100 rounded-lg">
                  <span className="font-semibold text-slate-800 block text-[11px]">Safety Systems:</span>
                  <span className="text-[11px] text-slate-500">{matchedLifter.specs.safetyValve}</span>
                </div>
              </div>
            </div>

            {/* Action Bar for this Match */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <Link
                href={`/contact?subject=Inquiry%20${encodeURIComponent(matchedLifter.lifterModel)}%20for%20${encodeURIComponent(selectedCategory.name)}%20${currentWeight}kg`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#005596] hover:bg-[#004277] active:scale-[0.98] text-white text-xs sm:text-sm font-bold rounded-lg transition-all"
              >
                <span>Test This Unit on Your Factory Floor</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href={matchedLifter.brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-all"
              >
                <span>Download Technical Brochure (PDF)</span>
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
