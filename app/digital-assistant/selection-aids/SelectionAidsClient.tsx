'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';

type ModuleKey = 'lifters' | 'generators';

type StepOption = {
  id: string;
  label: string;
  sub?: string;
};

type Step = {
  id: string;
  label: string;
  title: string;
  desc: string;
  type: 'grid' | 'binary' | 'slider' | 'results';
  options?: StepOption[];
  min?: number;
  max?: number;
};

type ModuleConfig = {
  title: string;
  steps: Step[];
};

type SelectionMap = Record<string, string | number>;

type Recommendation = {
  name: string;
  tagline: string;
  desc: string;
  logic: string;
  specs: Array<{ key: string; value: string }>;
  productUrl: string;
  scores: number[];
};

const DATA: Record<ModuleKey, ModuleConfig> = {
  lifters: {
    title: 'Vacuum Lifters',
    steps: [
      {
        id: 'workpiece',
        label: 'Material',
        title: 'Jenis Material',
        desc: 'Apa yang akan diangkat?',
        type: 'grid',
        options: [
          { id: 'cardboard', label: 'Cardboard', sub: 'Karton / Box' },
          { id: 'bag', label: 'Sack', sub: 'Karung Plastik/Kertas' },
          { id: 'wood', label: 'Wood', sub: 'Panel Kayu' },
          { id: 'metal', label: 'Metal', sub: 'Plat Besi' },
          { id: 'barrel', label: 'Barrel', sub: 'Drum / Kaleng' },
          { id: 'glass', label: 'Glass', sub: 'Kaca / Jendela' },
          { id: 'bucket', label: 'Bucket', sub: 'Ember Cat' },
          { id: 'luggage', label: 'Luggage', sub: 'Bagasi' },
        ],
      },
      {
        id: 'weight',
        label: 'Beban',
        title: 'Berat Maksimal',
        desc: 'Berat benda terberat (Safe Working Load).',
        type: 'slider',
        min: 0,
        max: 250,
      },
      {
        id: 'movement',
        label: 'Gerak',
        title: 'Tipe Gerakan',
        desc: 'Bagaimana benda dipindahkan?',
        type: 'binary',
        options: [
          { id: 'horizontal', label: 'Horizontal', sub: 'Angkat & Pindah Saja' },
          { id: 'tilt', label: 'Tilt / Turn', sub: 'Membalik / Memutar Benda' },
        ],
      },
      {
        id: 'cycle',
        label: 'Siklus',
        title: 'Frekuensi Angkat',
        desc: 'Berapa kali angkat per menit?',
        type: 'binary',
        options: [
          { id: 'high', label: 'High Freq', sub: '> 10x per menit (Cepat)' },
          { id: 'low', label: 'Low Freq', sub: '< 5x per menit (Lambat)' },
        ],
      },
      { id: 'results', label: 'Solusi', title: 'Rekomendasi', desc: 'Solusi Handling DQW.', type: 'results' },
    ],
  },
  generators: {
    title: 'Vacuum Generators',
    steps: [
      {
        id: 'power',
        label: 'Power',
        title: 'Sumber Daya',
        desc: 'Apa sumber tenaga yang tersedia?',
        type: 'binary',
        options: [
          { id: 'pneumatic', label: 'Pneumatic', sub: 'Kompresor Udara' },
          { id: 'electric', label: 'Electric', sub: 'Listrik (24V/220V)' },
        ],
      },
      {
        id: 'porosity',
        label: 'Surface',
        title: 'Porositas Benda',
        desc: 'Apakah udara tembus melalui benda?',
        type: 'binary',
        options: [
          { id: 'air-tight', label: 'Air-tight', sub: 'Kedap (Besi, Kaca)' },
          { id: 'porous', label: 'Porous', sub: 'Berpori (Kardus, Kayu)' },
        ],
      },
      {
        id: 'environment',
        label: 'Area',
        title: 'Lingkungan',
        desc: 'Kondisi area kerja?',
        type: 'binary',
        options: [
          { id: 'clean', label: 'Clean', sub: 'Standard / Bersih' },
          { id: 'dusty', label: 'Dirty/Dusty', sub: 'Berdebu / Lembab' },
        ],
      },
      {
        id: 'system',
        label: 'Robot',
        title: 'Integrasi',
        desc: 'Tipe robot yang digunakan?',
        type: 'grid',
        options: [
          { id: 'cobot', label: 'Cobot', sub: 'Collaborative' },
          { id: 'industrial', label: 'Industrial', sub: 'Heavy Robot' },
          { id: 'gantry', label: 'Gantry', sub: 'Linear Axis' },
          { id: 'manual', label: 'Manual', sub: 'Fixture' },
        ],
      },
      { id: 'results', label: 'Solusi', title: 'Rekomendasi', desc: 'Solusi Vakum DQW.', type: 'results' },
    ],
  },
};

type DrawFn = (ctx: CanvasRenderingContext2D) => void;

const DrawLib: Record<string, DrawFn> = {
  lifterHub: (ctx) => {
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(18, 5);
    ctx.lineTo(18, 25);
    ctx.moveTo(8, 25);
    ctx.lineTo(28, 25);
    ctx.moveTo(10, 25);
    ctx.lineTo(13, 33);
    ctx.moveTo(26, 25);
    ctx.lineTo(23, 33);
    ctx.moveTo(13, 33);
    ctx.lineTo(23, 33);
    ctx.stroke();
  },
  genHub: (ctx) => {
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.strokeRect(8, 12, 20, 12);
    ctx.beginPath();
    ctx.moveTo(5, 18);
    ctx.lineTo(8, 18);
    ctx.moveTo(28, 18);
    ctx.lineTo(31, 18);
    ctx.moveTo(18, 24);
    ctx.lineTo(18, 30);
    ctx.stroke();
  },
  cardboard: (ctx) => {
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.strokeRect(15, 20, 30, 25);
    ctx.beginPath();
    ctx.moveTo(15, 20);
    ctx.lineTo(25, 10);
    ctx.lineTo(45, 20);
    ctx.stroke();
  },
  bag: (ctx) => {
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(20, 10);
    ctx.bezierCurveTo(10, 20, 10, 45, 20, 50);
    ctx.lineTo(40, 50);
    ctx.bezierCurveTo(50, 45, 50, 20, 40, 10);
    ctx.quadraticCurveTo(30, 15, 20, 10);
    ctx.stroke();
  },
  wood: (ctx) => {
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 15, 40, 30);
    ctx.beginPath();
    ctx.moveTo(35, 25);
    ctx.arc(35, 28, 2, 0, Math.PI * 2);
    ctx.stroke();
  },
  metal: (ctx) => {
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 20, 40, 20);
    ctx.beginPath();
    ctx.moveTo(15, 40);
    ctx.lineTo(25, 20);
    ctx.stroke();
  },
  barrel: (ctx) => {
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(30, 15, 15, 5, 0, 0, Math.PI * 2);
    ctx.moveTo(15, 15);
    ctx.lineTo(15, 45);
    ctx.moveTo(45, 15);
    ctx.lineTo(45, 45);
    ctx.ellipse(30, 45, 15, 5, 0, 0, Math.PI, false);
    ctx.stroke();
  },
  glass: (ctx) => {
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(15, 15, 30, 30);
    ctx.moveTo(25, 35);
    ctx.lineTo(35, 25);
    ctx.stroke();
  },
  bucket: (ctx) => {
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(30, 20, 12, 4, 0, 0, Math.PI * 2);
    ctx.moveTo(18, 20);
    ctx.lineTo(20, 45);
    ctx.moveTo(42, 20);
    ctx.lineTo(40, 45);
    ctx.ellipse(30, 45, 10, 3, 0, 0, Math.PI, false);
    ctx.stroke();
  },
  luggage: (ctx) => {
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.strokeRect(15, 20, 30, 25);
    ctx.beginPath();
    ctx.moveTo(25, 20);
    ctx.lineTo(25, 15);
    ctx.lineTo(35, 15);
    ctx.lineTo(35, 20);
    ctx.stroke();
  },
  pneumatic: (ctx) => {
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(30, 30, 12, 0, Math.PI * 2);
    ctx.moveTo(30, 30);
    ctx.lineTo(36, 24);
    ctx.stroke();
  },
  electric: (ctx) => {
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(30, 10);
    ctx.lineTo(20, 30);
    ctx.lineTo(32, 30);
    ctx.lineTo(22, 50);
    ctx.stroke();
  },
  'air-tight': (ctx) => {
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.strokeRect(15, 15, 30, 30);
    ctx.beginPath();
    ctx.moveTo(15, 15);
    ctx.lineTo(45, 45);
    ctx.stroke();
  },
  porous: (ctx) => {
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.strokeRect(15, 15, 30, 30);
    ctx.fillStyle = '#475569';
    ctx.fillRect(25, 25, 2, 2);
    ctx.fillRect(35, 35, 2, 2);
    ctx.stroke();
  },
  clean: (ctx) => {
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(30, 30, 10, 0, Math.PI * 2);
    ctx.moveTo(30, 15);
    ctx.lineTo(30, 10);
    ctx.stroke();
  },
  dusty: (ctx) => {
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(15, 40);
    ctx.quadraticCurveTo(25, 30, 35, 40);
    ctx.quadraticCurveTo(45, 30, 55, 40);
    ctx.stroke();
  },
  cobot: (ctx) => {
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(30, 20, 6, 0, Math.PI * 2);
    ctx.moveTo(30, 26);
    ctx.lineTo(30, 35);
    ctx.moveTo(20, 35);
    ctx.lineTo(40, 35);
    ctx.stroke();
  },
  industrial: (ctx) => {
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.strokeRect(20, 40, 20, 10);
    ctx.beginPath();
    ctx.moveTo(30, 40);
    ctx.lineTo(30, 20);
    ctx.lineTo(45, 10);
    ctx.stroke();
  },
  high: (ctx) => {
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(10, 30);
    ctx.lineTo(20, 15);
    ctx.lineTo(30, 40);
    ctx.lineTo(40, 10);
    ctx.lineTo(50, 30);
    ctx.stroke();
  },
  low: (ctx) => {
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(10, 30);
    ctx.quadraticCurveTo(30, 10, 50, 30);
    ctx.stroke();
  },
  horizontal: (ctx) => {
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(10, 30);
    ctx.lineTo(50, 30);
    ctx.moveTo(45, 25);
    ctx.lineTo(50, 30);
    ctx.lineTo(45, 35);
    ctx.stroke();
  },
  tilt: (ctx) => {
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(30, 30, 15, 0, Math.PI * 1.5);
    ctx.moveTo(30, 15);
    ctx.lineTo(35, 10);
    ctx.stroke();
  },
  gantry: (ctx) => {
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(10, 45);
    ctx.lineTo(10, 15);
    ctx.lineTo(50, 15);
    ctx.lineTo(50, 45);
    ctx.moveTo(10, 20);
    ctx.lineTo(50, 20);
    ctx.stroke();
  },
  manual: (ctx) => {
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(30, 30, 10, 0, Math.PI * 2);
    ctx.moveTo(30, 40);
    ctx.lineTo(30, 50);
    ctx.moveTo(20, 50);
    ctx.lineTo(40, 50);
    ctx.stroke();
  },
  default: (ctx) => {
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(30, 30, 10, 0, Math.PI * 2);
    ctx.stroke();
  },
};

function CanvasIcon({
  iconKey,
  width,
  height,
  className,
}: {
  iconKey: string;
  width: number;
  height: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const drawFn = DrawLib[iconKey] ?? DrawLib.default;
    drawFn(ctx);
  }, [iconKey]);

  return <canvas ref={canvasRef} width={width} height={height} className={className} aria-hidden="true" />;
}

function getRecommendation(moduleKey: ModuleKey, selections: SelectionMap): Recommendation {
  if (moduleKey === 'lifters') {
    const weight = Number(selections.weight ?? 0);
    const tilt = selections.movement === 'tilt';

    if (weight > 140 || tilt) {
      return {
        name: 'VacuMaster',
        tagline: tilt ? 'Tilt & Turn' : 'Heavy Load Device',
        desc: tilt
          ? 'Solusi angkat yang mampu membalik benda 90°/180° secara aman.'
          : 'Solusi angkat beban berat dengan keamanan ganda.',
        logic: tilt
          ? 'Fungsi Tilting/Turning mewajibkan penggunaan VacuMaster.'
          : `Beban ${weight}kg memerlukan sistem chain hoist + VacuMaster.`,
        specs: [
          { key: 'Series', value: 'Basic/Comfort' },
          { key: 'Motion', value: tilt ? '90°/180°' : 'Horizontal' },
          { key: 'Safety', value: 'EN 13155' },
        ],
        productUrl: '/products/schmalz/vacumaster',
        scores: [90, 95, 82, 80, 88],
      };
    }

    if (weight <= 50) {
      return {
        name: 'JumboFlex',
        tagline: 'High Speed Handler',
        desc: 'Tube lifter operasional satu tangan untuk pemindahan barang frekuensi tinggi yang ergonomis.',
        logic: `Beban ringan (${weight}kg) dan gerak horizontal optimal dengan operasi satu jari JumboFlex.`,
        specs: [
          { key: 'Control', value: 'Single-Finger' },
          { key: 'Tube', value: 'Ø 100-120mm' },
          { key: 'Feature', value: 'Quick Change' },
        ],
        productUrl: '/products/schmalz/vacuum-tube-lifter',
        scores: [88, 86, 95, 94, 84],
      };
    }

    return {
      name: 'JumboErgo',
      tagline: 'Modular Tube Lifter',
      desc: 'Sistem tube lifter dengan handle putar (twist grip) untuk kontrol beban medium yang presisi.',
      logic: `Beban ${weight}kg paling stabil ditangani dengan handle dua tangan JumboErgo.`,
      specs: [
        { key: 'Control', value: 'Twist Grip' },
        { key: 'Payload', value: 'Max 140kg' },
        { key: 'Apps', value: 'Universal' },
      ],
      productUrl: '/products/schmalz/vacuum-tube-lifter',
      scores: [89, 90, 87, 91, 86],
    };
  }

  const power = selections.power;
  const porous = selections.porosity === 'porous';
  const dirty = selections.environment === 'dusty';
  const robot = selections.system;

  if (power === 'electric' && robot === 'cobot') {
    return {
      name: 'ECBPi',
      tagline: 'Cobot Pump',
      desc: 'Generator vakum listrik cerdas dengan interface robot langsung (NFC/IO-Link).',
      logic: 'Desain tanpa selang angin (hose-free) ideal untuk Cobot.',
      specs: [
        { key: 'Tech', value: 'Air-free' },
        { key: 'Comms', value: 'IO-Link / NFC' },
        { key: 'Gripper', value: 'Integrated' },
      ],
      productUrl: '/products/schmalz/vacuum-generator',
      scores: [92, 88, 93, 90, 84],
    };
  }

  if (power === 'electric') {
    return {
      name: 'ECBPM',
      tagline: 'Mini Electric',
      desc: 'Pembangkit vakum listrik kompak untuk sistem otomatisasi ringan tanpa suplai angin.',
      logic: 'Solusi pick & place ringan (Small Parts) tanpa kompresor.',
      specs: [
        { key: 'Voltage', value: '24V DC' },
        { key: 'Flow', value: '1.6 l/min' },
        { key: 'Size', value: 'Compact' },
      ],
      productUrl: '/products/schmalz/vacuum-generator',
      scores: [84, 85, 90, 88, 86],
    };
  }

  if (dirty) {
    return {
      name: 'SCPS / SXPi',
      tagline: 'IP65 Ejector',
      desc: 'Compact ejector tahan debu dan percikan air dengan nozzle teknologi Venturi.',
      logic: 'Area berdebu mewajibkan proteksi IP65 pada SCPS.',
      specs: [
        { key: 'Protection', value: 'IP65' },
        { key: 'Nozzle', value: 'Single-stage' },
        { key: 'Function', value: 'Auto-saving' },
      ],
      productUrl: '/products/schmalz/vacuum-generator',
      scores: [90, 94, 84, 82, 90],
    };
  }

  if (porous) {
    return {
      name: 'Basic Ejector (SBPL)',
      tagline: 'High Flow Ejector',
      desc: 'Ejector multi-stage dengan aliran hisap besar untuk mengkompensasi kebocoran pada benda berpori.',
      logic: 'Benda berpori memerlukan High Flow Rate, bukan High Vacuum.',
      specs: [
        { key: 'Tech', value: 'Multi-stage Eco' },
        { key: 'Flow', value: 'High Volume' },
        { key: 'Response', value: 'Fast' },
      ],
      productUrl: '/products/schmalz/vacuum-generator',
      scores: [87, 86, 92, 80, 89],
    };
  }

  return {
    name: 'SCPM / SCPS',
    tagline: 'Compact Ejector',
    desc: 'Sistem ejektor all-in-one dengan fungsi hemat udara terintegrasi.',
    logic: 'Standar industri untuk benda kedap udara dengan efisiensi tinggi.',
    specs: [
      { key: 'Efficiency', value: 'Air Saving' },
      { key: 'Control', value: 'NO / NC' },
      { key: 'Monitor', value: 'Digital' },
    ],
    productUrl: '/products/schmalz/vacuum-generator',
    scores: [89, 90, 89, 83, 88],
  };
}

function OptionCard({
  option,
  selected,
  onClick,
  index,
}: {
  option: StepOption;
  selected: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 14, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.33, delay: 0.05 + index * 0.04, ease: 'easeOut' }}
      whileHover={{ y: -3 }}
      className={[
        'group relative flex flex-col items-center gap-3 rounded-[1.5rem] border-2 p-5 text-center transition-all',
        'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300/50',
        selected
          ? 'border-blue-600 bg-blue-50 shadow-[0_0_25px_rgba(37,99,235,0.15)] scale-[1.02]'
          : 'border-slate-100 hover:border-blue-300 hover:bg-white',
      ].join(' ')}
      type="button"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-colors group-hover:text-blue-600">
        <CanvasIcon iconKey={option.id} width={60} height={60} className="h-10 w-10" />
      </div>
      <p className="mb-1 truncate text-[10px] font-black uppercase tracking-[0.2em] md:text-xs">{option.label}</p>
      <span className="block truncate text-[8px] font-bold uppercase tracking-widest text-blue-500 opacity-60 md:text-[9px]">
        {option.sub ?? ''}
      </span>
      {selected && <span className="absolute right-3 top-3 h-2 w-2 animate-bounce rounded-full bg-blue-600" />}
    </motion.button>
  );
}

export default function SelectionAidsClient() {
  const [currentModule, setCurrentModule] = useState<ModuleKey | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<SelectionMap>({});

  const moduleConfig = currentModule ? DATA[currentModule] : null;
  const step = moduleConfig?.steps[currentStep];
  const recommendation = useMemo(() => {
    if (!currentModule) return null;
    const current = DATA[currentModule].steps[currentStep];
    if (current.type !== 'results') return null;
    return getRecommendation(currentModule, selections);
  }, [currentModule, currentStep, selections]);

  const startModule = (moduleKey: ModuleKey) => {
    setCurrentModule(moduleKey);
    setCurrentStep(0);
    setSelections(moduleKey === 'lifters' ? { weight: 35 } : {});
  };

  const resetToHub = () => {
    setCurrentModule(null);
    setCurrentStep(0);
    setSelections({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextStep = () => {
    if (!moduleConfig || !step) return;
    if (step.type !== 'slider' && step.type !== 'results' && !selections[step.id]) return;
    setCurrentStep((prev) => Math.min(prev + 1, moduleConfig.steps.length - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSelect = (stepId: string, optionId: string) => {
    setSelections((prev) => ({ ...prev, [stepId]: optionId }));
    setCurrentStep((prev) => {
      const max = (moduleConfig?.steps.length ?? 1) - 1;
      return Math.min(prev + 1, max);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSlider = (rawValue: string) => {
    if (!step || step.type !== 'slider') return;
    const min = step.min ?? 0;
    const max = step.max ?? 250;
    const parsed = Number(rawValue);
    const safeValue = Number.isFinite(parsed) ? Math.max(min, Math.min(max, parsed)) : min;
    setSelections((prev) => ({ ...prev, weight: safeValue }));
  };

  if (!currentModule || !moduleConfig || !step) {
    return (
      <motion.section
        className="space-y-10 py-8 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <div className="mx-auto max-w-3xl space-y-4 px-4">
          <h1 className="text-3xl font-black leading-tight tracking-tighter text-slate-900 md:text-5xl">
            Selection <span className="italic text-blue-600">Assistant.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-sm font-medium leading-relaxed text-slate-500 md:text-lg">
            Pilih kategori sistem vakum di bawah ini untuk memulai konfigurasi.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-6 px-2 md:grid-cols-2">
          <motion.button
            onClick={() => startModule('lifters')}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.04, ease: 'easeOut' }}
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-8 text-left shadow-xl transition-all hover:shadow-2xl"
            type="button"
          >
            <img
              src="/vacuum.svg"
              alt="Vacuum"
              className="pointer-events-none absolute bottom-0 right-0 top-0 h-full w-auto select-none object-contain opacity-10 transition-opacity duration-300 group-hover:opacity-100"
            />
            <div className="relative z-10 space-y-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200">
                <CanvasIcon iconKey="lifterHub" width={36} height={36} />
              </div>
              <div>
                <h3 className="text-xl font-black leading-tight text-slate-900 md:text-2xl">Vacuum Lifters</h3>
                <p className="mt-2 text-xs font-medium text-slate-500 md:text-sm">Handling manual ergonomis (Jumbo/VacuMaster).</p>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600 transition-transform group-hover:translate-x-2 md:text-xs">
                Mulai Audit Lifter →
              </p>
            </div>
          </motion.button>

          <motion.button
            onClick={() => startModule('generators')}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-8 text-left shadow-xl transition-all hover:shadow-2xl"
            type="button"
          >
            <img
              src="/generator.svg"
              alt="Generator"
              className="pointer-events-none absolute bottom-0 right-0 top-0 h-full w-auto select-none object-contain opacity-10 transition-opacity duration-300 group-hover:opacity-100"
            />
            <div className="relative z-10 space-y-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200">
                <CanvasIcon iconKey="genHub" width={36} height={36} />
              </div>
              <div>
                <h3 className="text-xl font-black leading-tight text-slate-900 md:text-2xl">Vacuum Generators</h3>
                <p className="mt-2 text-xs font-medium text-slate-500 md:text-sm">Sistem otomasi & ejector (Ejector/Pump).</p>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600 transition-transform group-hover:translate-x-2 md:text-xs">
                Mulai Audit Generator →
              </p>
            </div>
          </motion.button>
        </div>
      </motion.section>
    );
  }

  const progressPercent = (currentStep / (moduleConfig.steps.length - 1)) * 100;
  const previousSteps = moduleConfig.steps.slice(0, currentStep);
  const sliderValue = Number(selections.weight ?? 35);

  return (
    <section className="space-y-6">
      <div className="grid items-start gap-6 lg:grid-cols-12">
        <aside className="hidden space-y-6 lg:col-span-3 lg:block lg:sticky lg:top-8">
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-blue-900/5">
            <div className="mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
              <div className="flex h-4 w-4 items-center justify-center rounded bg-blue-600 text-[8px] font-bold italic text-white">i</div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">Live Logs</h3>
            </div>

            <div className="max-h-[60vh] space-y-3 overflow-y-auto">
              {previousSteps.length === 0 && (
                <p className="py-4 text-center text-[10px] text-slate-400">Menunggu data...</p>
              )}
              {previousSteps.map((logStep) => {
                let value = selections[logStep.id] ?? '---';
                if (logStep.id === 'weight') {
                  value = `${String(selections.weight ?? 0)} kg`;
                } else if (logStep.options) {
                  const found = logStep.options.find((opt) => opt.id === value);
                  if (found) value = found.label;
                }

                return (
                  <div key={logStep.id} className="flex items-center justify-between border-b border-slate-50 py-2 last:border-0">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">{logStep.label}</span>
                    <span className="text-right text-[10px] font-black uppercase text-blue-900">{String(value)}</span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={resetToHub}
              className="mt-6 w-full rounded-xl border border-slate-200 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-900"
              type="button"
            >
              Reset Audit
            </button>
          </div>
        </aside>

        <div className="col-span-1 space-y-6 lg:col-span-9">
          <div className="overflow-x-auto rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm">
            <div className="relative flex min-w-[500px] justify-between px-4 md:min-w-full">
              <div className="absolute left-0 top-[18px] -z-10 h-[2px] w-full bg-slate-100" />
              <div className="absolute left-0 top-[18px] -z-10 h-[2px] bg-blue-600 transition-all duration-500" style={{ width: `${progressPercent}%` }} />
              {moduleConfig.steps.map((item, idx) => (
                <div key={item.id} className="flex min-w-[60px] flex-col items-center">
                  <div
                    className={[
                      'z-10 flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-all duration-500',
                      idx < currentStep
                        ? 'bg-blue-600 text-white'
                        : idx === currentStep
                          ? 'scale-110 bg-slate-900 text-white ring-4 ring-blue-100'
                          : 'border-2 border-slate-200 bg-white text-slate-300',
                    ].join(' ')}
                  >
                    {idx < currentStep ? '✓' : idx + 1}
                  </div>
                  <span className={[
                    'mt-3 hidden text-[9px] font-bold uppercase tracking-widest md:block',
                    idx <= currentStep ? 'text-slate-700' : 'text-slate-300',
                  ].join(' ')}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex min-h-[500px] flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-blue-900/5">
            <div className="flex flex-1 flex-col p-6 md:p-12">
              <AnimatePresence mode="wait" initial={false}>
                {step.type !== 'results' ? (
                  <motion.div
                    key={`step-${step.id}`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="space-y-6 md:space-y-10"
                  >
                    <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-4 md:flex-row md:items-center md:pb-8">
                      <div className="max-w-2xl space-y-2">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-blue-500 lg:hidden">
                          Step {currentStep + 1} of {moduleConfig.steps.length}
                        </p>
                        <h2 className="text-2xl font-black uppercase leading-tight tracking-tight text-slate-900 md:text-4xl">{step.title}</h2>
                        <p className="text-xs font-medium text-slate-500 md:text-sm">{step.desc}</p>
                      </div>
                      <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xl shadow-blue-600/30 md:flex">
                        <span className="text-lg font-black italic leading-none">{currentStep + 1}</span>
                      </div>
                    </div>

                    {(step.type === 'grid' || step.type === 'binary') && (
                      <div className={['grid gap-4', (step.options?.length ?? 0) > 4 ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1 md:grid-cols-2'].join(' ')}>
                        {step.options?.map((opt, idx) => (
                          <OptionCard
                            key={opt.id}
                            option={opt}
                            selected={selections[step.id] === opt.id}
                            onClick={() => handleSelect(step.id, opt.id)}
                            index={idx}
                          />
                        ))}
                      </div>
                    )}

                    {step.type === 'slider' && (
                      <motion.div
                        className="mx-auto w-full max-w-3xl space-y-8 py-8 md:space-y-12"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      >
                        <div className="relative h-4 rounded-full border-4 border-white bg-slate-100 shadow-inner md:h-6">
                          <div className="absolute h-full rounded-full bg-blue-600 shadow-lg transition-all duration-75" style={{ width: `${(sliderValue / (step.max ?? 250)) * 100}%` }} />
                          <input
                            type="range"
                            min={step.min}
                            max={step.max}
                            value={sliderValue}
                            onChange={(e) => handleSlider(e.target.value)}
                            className="absolute h-full w-full cursor-pointer opacity-0"
                          />
                        </div>
                        <div className="grid items-center gap-6 rounded-[2rem] border border-white/10 bg-slate-900 p-8 shadow-2xl md:grid-cols-2">
                          <div className="space-y-2 text-left">
                            <span className="mb-1 block text-[8px] font-black uppercase tracking-[0.3em] text-blue-400">Manual Input</span>
                            <div className="relative flex items-center">
                              <input
                                type="number"
                                value={sliderValue}
                                min={step.min}
                                max={step.max}
                                onChange={(e) => handleSlider(e.target.value)}
                                className="w-full rounded-xl border-2 border-slate-700 bg-slate-800 py-3 pl-4 pr-12 text-3xl font-black text-white outline-none transition-all focus:border-blue-500 md:text-4xl"
                              />
                              <span className="absolute right-4 text-lg font-black text-blue-500">KG</span>
                            </div>
                          </div>
                          <div className="hidden flex-col items-center space-y-2 px-4 text-center md:flex">
                            <div className="h-1 w-8 rounded-full bg-blue-600" />
                            <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed text-slate-400">
                              Menentukan diameter tube dan safety factor.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ) : recommendation ? (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="space-y-8"
                  >
                  <div className="space-y-4 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-100 px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.3em] text-emerald-800 shadow-lg">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" /> Selesai
                    </div>
                    <h2 className="text-3xl font-black uppercase leading-none tracking-tighter text-slate-900 md:text-5xl">
                      Solution <br />
                      <span className="text-blue-600">Found.</span>
                    </h2>
                  </div>

                  <div className="grid gap-6 md:gap-8 xl:grid-cols-12">
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.06, duration: 0.35 }}
                      className="group relative col-span-7 flex flex-col justify-between overflow-hidden rounded-[2.5rem] bg-slate-900 p-8 text-white shadow-xl md:p-12"
                    >
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.26),transparent_45%),radial-gradient(circle_at_85%_85%,rgba(30,64,175,0.35),transparent_46%)]" />
                      <div className="relative z-10">
                        <div className="mb-6 flex items-center gap-3">
                          <div className="h-1 w-8 rounded-full bg-blue-500" />
                          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">{recommendation.tagline}</span>
                        </div>
                        <h3 className="mb-6 text-4xl font-black uppercase leading-none tracking-tighter text-white italic md:text-6xl">
                          {recommendation.name}
                        </h3>
                        <p className="mb-8 text-base font-medium leading-relaxed text-slate-400 md:text-lg">{recommendation.desc}</p>
                        <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-5">
                          <p className="mb-2 text-[9px] font-black uppercase tracking-widest text-slate-500">Schmalz Logic Engine</p>
                          <p className="border-l-2 border-blue-500 pl-3 text-xs font-medium text-slate-300 md:text-sm">{recommendation.logic}</p>
                        </div>
                      </div>
                      <div className="relative z-10 flex flex-col gap-4 sm:flex-row">
                        <a
                          href={recommendation.productUrl}
                          className="flex-1 rounded-xl bg-blue-600 py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-lg shadow-blue-600/50 transition-all hover:bg-blue-700"
                        >
                          Lihat Produk →
                        </a>
                        <button
                          onClick={resetToHub}
                          type="button"
                          className="rounded-xl border border-white/20 bg-transparent px-8 py-4 text-[10px] font-black uppercase tracking-widest text-white transition-all hover:bg-white/10"
                        >
                          Restart
                        </button>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12, duration: 0.35 }}
                      className="col-span-5 space-y-6"
                    >
                      <div className="rounded-[2.5rem] border-2 border-slate-100 bg-white p-8 shadow-xl">
                        <h4 className="mb-6 text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Technical Spec Sheet</h4>
                        <div className="space-y-3">
                          {recommendation.specs.map((spec) => (
                            <div key={spec.key} className="flex items-center justify-between border-b border-slate-50 py-3 last:border-0">
                              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">{spec.key}</span>
                              <span className="text-right text-xs font-black text-slate-900">{spec.value}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 space-y-2">
                          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Performance Snapshot</p>
                          {['Efisiensi', 'Keamanan', 'Kecepatan', 'Ergonomi', 'ROI'].map((label, idx) => (
                            <div key={label} className="space-y-1">
                              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wide text-slate-500">
                                <span>{label}</span>
                                <span>{recommendation.scores[idx]}</span>
                              </div>
                              <div className="h-2 rounded bg-slate-100">
                                <div
                                  className="h-2 rounded bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-500"
                                  style={{ width: `${recommendation.scores[idx]}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            <div className="relative z-20 flex flex-col-reverse items-center justify-between gap-4 border-t border-slate-100 bg-slate-50/80 px-6 py-6 backdrop-blur-sm md:flex-row">
              <button
                onClick={prevStep}
                type="button"
                disabled={currentStep === 0}
                className="w-full rounded-full px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 transition-all hover:bg-slate-200/50 hover:text-blue-900 disabled:pointer-events-none disabled:opacity-0 md:w-auto"
              >
                ← KEMBALI
              </button>

              {step.type !== 'results' && (
                <button
                  onClick={nextStep}
                  type="button"
                  className="group flex w-full items-center justify-center gap-4 rounded-full bg-slate-900 px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-white shadow-xl transition-all hover:bg-blue-600 md:w-auto md:rounded-[2rem] md:px-12"
                >
                  <span>{currentStep === moduleConfig.steps.length - 2 ? 'LIHAT HASIL' : 'LANJUTKAN'}</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
