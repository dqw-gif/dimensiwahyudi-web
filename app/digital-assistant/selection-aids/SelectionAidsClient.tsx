'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { useLanguage } from '../../../components/LanguageProvider';

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

const DATA_EN: Record<ModuleKey, ModuleConfig> = {
  lifters: {
    title: 'Vacuum Lifters',
    steps: [
      {
        id: 'workpiece',
        label: 'Material',
        title: 'Material Type',
        desc: 'What are you lifting?',
        type: 'grid',
        options: [
          { id: 'cardboard', label: 'Cardboard', sub: 'Carton / Box' },
          { id: 'bag', label: 'Sack', sub: 'Plastic/Paper Sack' },
          { id: 'wood', label: 'Wood', sub: 'Wood Panel' },
          { id: 'metal', label: 'Metal', sub: 'Steel Plate' },
          { id: 'barrel', label: 'Barrel', sub: 'Drum / Can' },
          { id: 'glass', label: 'Glass', sub: 'Glass / Window' },
          { id: 'bucket', label: 'Bucket', sub: 'Paint Bucket' },
          { id: 'luggage', label: 'Luggage', sub: 'Baggage' },
        ],
      },
      {
        id: 'weight',
        label: 'Load',
        title: 'Maximum Weight',
        desc: 'Weight of the heaviest workpiece (Safe Working Load).',
        type: 'slider',
        min: 0,
        max: 250,
      },
      {
        id: 'movement',
        label: 'Movement',
        title: 'Movement Type',
        desc: 'How is the item moved?',
        type: 'binary',
        options: [
          { id: 'horizontal', label: 'Horizontal', sub: 'Lift & Transfer Only' },
          { id: 'tilt', label: 'Tilt / Turn', sub: 'Rotate or Flip Item' },
        ],
      },
      {
        id: 'cycle',
        label: 'Cycles',
        title: 'Lifting Frequency',
        desc: 'How many lifts per minute?',
        type: 'binary',
        options: [
          { id: 'high', label: 'High Frequency', sub: '> 10 lifts per minute (Fast)' },
          { id: 'low', label: 'Low Frequency', sub: '< 5 lifts per minute (Slow)' },
        ],
      },
      { id: 'results', label: 'Solution', title: 'Recommendation', desc: 'DQW handling recommendation.', type: 'results' },
    ],
  },
  generators: {
    title: 'Vacuum Generators',
    steps: [
      {
        id: 'power',
        label: 'Power',
        title: 'Power Source',
        desc: 'What power source is available?',
        type: 'binary',
        options: [
          { id: 'pneumatic', label: 'Pneumatic', sub: 'Air Compressor' },
          { id: 'electric', label: 'Electric', sub: 'Electricity (24V/220V)' },
        ],
      },
      {
        id: 'porosity',
        label: 'Surface',
        title: 'Workpiece Porosity',
        desc: 'Does air pass through the workpiece?',
        type: 'binary',
        options: [
          { id: 'air-tight', label: 'Air-tight', sub: 'Sealed (Metal, Glass)' },
          { id: 'porous', label: 'Porous', sub: 'Porous (Carton, Wood)' },
        ],
      },
      {
        id: 'environment',
        label: 'Area',
        title: 'Environment',
        desc: 'What is the work environment?',
        type: 'binary',
        options: [
          { id: 'clean', label: 'Clean', sub: 'Standard / Clean' },
          { id: 'dusty', label: 'Dirty/Dusty', sub: 'Dusty / Humid' },
        ],
      },
      {
        id: 'system',
        label: 'Robot',
        title: 'Integration',
        desc: 'What robot type is used?',
        type: 'grid',
        options: [
          { id: 'cobot', label: 'Cobot', sub: 'Collaborative' },
          { id: 'industrial', label: 'Industrial', sub: 'Heavy Robot' },
          { id: 'gantry', label: 'Gantry', sub: 'Linear Axis' },
          { id: 'manual', label: 'Manual', sub: 'Fixture' },
        ],
      },
      { id: 'results', label: 'Solution', title: 'Recommendation', desc: 'DQW vacuum recommendation.', type: 'results' },
    ],
  },
};

const DATA_ID: Record<ModuleKey, ModuleConfig> = {
  lifters: {
    title: 'Vacuum Lifters',
    steps: [
      {
        id: 'workpiece',
        label: 'Material',
        title: 'Jenis Material Workpiece',
        desc: 'Material apa yang akan diangkat?',
        type: 'grid',
        options: [
          { id: 'cardboard', label: 'Karton', sub: 'Kardus / Boks' },
          { id: 'bag', label: 'Karung', sub: 'Karung Plastik / Kertas' },
          { id: 'wood', label: 'Kayu', sub: 'Panel Kayu / MDF' },
          { id: 'metal', label: 'Logam', sub: 'Plat Baja / Aluminium' },
          { id: 'barrel', label: 'Drum', sub: 'Drum / Tong Industri' },
          { id: 'glass', label: 'Kaca', sub: 'Lembaran Kaca / Jendela' },
          { id: 'bucket', label: 'Ember', sub: 'Pail Cat / Kimia' },
          { id: 'luggage', label: 'Koper', sub: 'Bagasi Bandara' },
        ],
      },
      {
        id: 'weight',
        label: 'Beban',
        title: 'Beban Maksimum (Payload)',
        desc: 'Berat workpiece terberat yang diangkat (Safe Working Load).',
        type: 'slider',
        min: 0,
        max: 250,
      },
      {
        id: 'movement',
        label: 'Gerakan',
        title: 'Arah Pergerakan',
        desc: 'Bagaimana posisi workpiece dipindahkan?',
        type: 'binary',
        options: [
          { id: 'horizontal', label: 'Horizontal', sub: 'Angkat & Geser Saja' },
          { id: 'tilt', label: 'Tilt / Putar', sub: 'Miringkan 90° atau Balik 180°' },
        ],
      },
      {
        id: 'cycle',
        label: 'Cycle',
        title: 'Frekuensi Angkat (Cycle Time)',
        desc: 'Berapa kali angkatan per menit?',
        type: 'binary',
        options: [
          { id: 'high', label: 'Frekuensi Tinggi', sub: '> 10 angkatan/menit (Cepat)' },
          { id: 'low', label: 'Frekuensi Standar', sub: '< 5 angkatan/menit (Normal)' },
        ],
      },
      { id: 'results', label: 'Solusi', title: 'Rekomendasi Sistem', desc: 'Rekomendasi sistem material handling DQW.', type: 'results' },
    ],
  },
  generators: {
    title: 'Vacuum Generators',
    steps: [
      {
        id: 'power',
        label: 'Daya',
        title: 'Sumber Tenaga',
        desc: 'Sumber daya apa yang tersedia di lini produksi?',
        type: 'binary',
        options: [
          { id: 'pneumatic', label: 'Pneumatik', sub: 'Kompresor Udara' },
          { id: 'electric', label: 'Elektrik', sub: 'Listrik (24V DC / 220V AC)' },
        ],
      },
      {
        id: 'porosity',
        label: 'Permukaan',
        title: 'Porositas Workpiece',
        desc: 'Apakah udara menembus permukaan workpiece?',
        type: 'binary',
        options: [
          { id: 'air-tight', label: 'Kedap Udara', sub: 'Rapat (Plat Logam, Kaca)' },
          { id: 'porous', label: 'Berpori (Porous)', sub: 'Tembus Udara (Karton, MDF)' },
        ],
      },
      {
        id: 'environment',
        label: 'Area Kerja',
        title: 'Kondisi Area Produksi',
        desc: 'Bagaimana kondisi lingkungan lantai pabrik?',
        type: 'binary',
        options: [
          { id: 'clean', label: 'Bersih', sub: 'Standar / Cleanroom' },
          { id: 'dusty', label: 'Berdebu / Lembap', sub: 'Banyak Debu / Partikel' },
        ],
      },
      {
        id: 'system',
        label: 'Integrasi',
        title: 'Integrasi Mesin / Robot',
        desc: 'Dipasang pada sistem otomasi apa?',
        type: 'grid',
        options: [
          { id: 'cobot', label: 'Cobot', sub: 'Collaborative Robot' },
          { id: 'industrial', label: 'Industrial Robot', sub: 'Robot Beban Berat' },
          { id: 'gantry', label: 'Gantry Axis', sub: 'Portal Linear' },
          { id: 'manual', label: 'Manual Fixture', sub: 'Jig / Meja Kerja' },
        ],
      },
      { id: 'results', label: 'Solusi', title: 'Rekomendasi Sistem', desc: 'Rekomendasi Vacuum Generator DQW.', type: 'results' },
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

function getRecommendation(moduleKey: ModuleKey, selections: SelectionMap, isId: boolean): Recommendation {
  if (moduleKey === 'lifters') {
    const weight = Number(selections.weight ?? 0);
    const tilt = selections.movement === 'tilt';

    if (weight > 140 || tilt) {
      return {
        name: 'VacuMaster',
        tagline: tilt ? 'Tilt & Turn' : 'Heavy Load Device',
        desc: isId
          ? (tilt
            ? 'Sistem VacuMaster untuk memutar atau membalik workpiece hingga 90°/180° dengan aman.'
            : 'Sistem VacuMaster beban berat dengan proteksi tangki vakum ganda sesuai standar keselamatan.')
          : (tilt
            ? 'A lifting solution that safely rotates workpieces by 90°/180°.'
            : 'A heavy-duty lifting solution with built-in dual safety protection.'),
        logic: isId
          ? (tilt
            ? 'Gerakan putar/miring (tilt/turn) memerlukan struktur rangka VacuMaster.'
            : `Payload ${weight} kg memerlukan kombinasi Electric Chain Hoist + sistem VacuMaster.`)
          : (tilt
            ? 'Tilting/turning motion requires a VacuMaster system.'
            : `A ${weight}kg load requires a chain hoist + VacuMaster system.`),
        specs: [
          { key: 'Series', value: 'Basic/Comfort' },
          { key: isId ? 'Gerakan' : 'Motion', value: tilt ? '90°/180°' : 'Horizontal' },
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
        desc: isId
          ? 'Vacuum Tube Lifter satu tangan yang ergonomis untuk pemindahan barang dengan cycle time tinggi.'
          : 'Ergonomic one-hand tube lifter for high-frequency material handling.',
        logic: isId
          ? `Payload ringan ${weight} kg dengan gerakan horizontal sangat ideal untuk kendali satu jari JumboFlex.`
          : `A light ${weight}kg payload with horizontal movement is ideal for JumboFlex single-hand operation.`,
        specs: [
          { key: isId ? 'Kendali' : 'Control', value: 'Single-Finger' },
          { key: 'Tube', value: 'Ø 100-120mm' },
          { key: isId ? 'Fitur' : 'Feature', value: 'Quick Change' },
        ],
        productUrl: '/products/schmalz/vacuum-tube-lifter',
        scores: [88, 86, 95, 94, 84],
      };
    }

    return {
      name: 'JumboErgo',
      tagline: 'Modular Tube Lifter',
      desc: isId
        ? 'Vacuum Tube Lifter dengan tuas putar (twist-grip) untuk penanganan payload menengah secara presisi.'
        : 'Tube lifter with twist-grip control for precise medium-payload handling.',
      logic: isId
        ? `Payload ${weight} kg paling stabil ditangani menggunakan kendali dua tangan pada seri JumboErgo.`
        : `A ${weight}kg payload is handled most reliably with JumboErgo two-hand control.`,
      specs: [
        { key: isId ? 'Kendali' : 'Control', value: 'Twist Grip' },
        { key: 'Payload', value: 'Max 140kg' },
        { key: isId ? 'Aplikasi' : 'Apps', value: 'Universal' },
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
      desc: isId
        ? 'Vacuum Generator elektrik pintar dengan antarmuka langsung ke Cobot (NFC/IO-Link).'
        : 'Smart electric vacuum generator with direct robot interface (NFC/IO-Link).',
      logic: isId
        ? 'Desain tanpa selang kompresor sangat ideal untuk integrasi pada lengan Cobot.'
        : 'A hose-free design is ideal for cobot integration.',
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
      desc: isId
        ? 'Sumber vakum elektrik ringkas untuk otomasi beban ringan tanpa jalur udara kompresor.'
        : 'Compact electric vacuum source for lightweight automation without compressed air.',
      logic: isId
        ? 'Konfigurasi bebas kompresor yang pas untuk aplikasi pick-and-place komponen kecil.'
        : 'An ideal compressor-free setup for small-part pick-and-place.',
      specs: [
        { key: 'Voltage', value: '24V DC' },
        { key: 'Flow', value: '1.6 l/min' },
        { key: isId ? 'Ukuran' : 'Size', value: 'Compact' },
      ],
      productUrl: '/products/schmalz/vacuum-generator',
      scores: [84, 85, 90, 88, 86],
    };
  }

  if (dirty) {
    return {
      name: 'SCPS / SXPi',
      tagline: 'IP65 Ejector',
      desc: isId
        ? 'Compact Ejector tahan debu dan cipratan air (IP65) dengan teknologi Venturi Nozzle.'
        : 'Compact ejector resistant to dust and splash exposure with Venturi nozzle technology.',
      logic: isId
        ? 'Area kerja berdebu memerlukan proteksi kelas IP65 pada unit SCPS / SXPi.'
        : 'Dusty areas require IP65-grade SCPS protection.',
      specs: [
        { key: isId ? 'Proteksi' : 'Protection', value: 'IP65' },
        { key: 'Nozzle', value: 'Single-stage' },
        { key: isId ? 'Fungsi' : 'Function', value: 'Auto-saving' },
      ],
      productUrl: '/products/schmalz/vacuum-generator',
      scores: [90, 94, 84, 82, 90],
    };
  }

  if (porous) {
    return {
      name: 'Basic Ejector (SBPL)',
      tagline: 'High Flow Ejector',
      desc: isId
        ? 'Multi-stage Ejector dengan laju aliran hisap tinggi untuk mengimbangi kebocoran pada material berpori.'
        : 'Multi-stage ejector with high suction flow to compensate leakage on porous materials.',
      logic: isId
        ? 'Material berpori seperti karton/MDF membutuhkan volume aliran udara (flow rate) tinggi.'
        : 'Porous materials require high flow rate, not high vacuum.',
      specs: [
        { key: 'Tech', value: 'Multi-stage Eco' },
        { key: 'Flow', value: 'High Volume' },
        { key: isId ? 'Respons' : 'Response', value: 'Fast' },
      ],
      productUrl: '/products/schmalz/vacuum-generator',
      scores: [87, 86, 92, 80, 89],
    };
  }

  return {
    name: 'SCPM / SCPS',
    tagline: 'Compact Ejector',
    desc: isId
      ? 'Sistem Compact Ejector terintegrasi dengan fitur penghematan udara otomatis (air-saving control).'
      : 'All-in-one ejector system with integrated air-saving control.',
    logic: isId
      ? 'Standar industri teruji untuk workpiece kedap udara dengan efisiensi kompresor tinggi.'
      : 'A proven industry standard for airtight workpieces with high efficiency.',
    specs: [
      { key: isId ? 'Efisiensi' : 'Efficiency', value: 'Air Saving' },
      { key: isId ? 'Kendali' : 'Control', value: 'NO / NC' },
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
        'group relative flex flex-col items-center gap-3 rounded-2xl border p-5 text-center transition-all duration-300 cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#005596]/20',
        selected
          ? 'border-[#005596] bg-blue-50/80 shadow-[0_4px_20px_rgba(0,85,150,0.15)] ring-2 ring-[#005596]/20 scale-[1.02]'
          : 'border-slate-200/80 bg-white/90 backdrop-blur-md hover:border-[#005596]/40 hover:bg-white hover:shadow-md',
      ].join(' ')}
      type="button"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 border border-slate-200/60 text-slate-400 transition-colors group-hover:text-[#005596] group-hover:border-[#005596]/30">
        <CanvasIcon iconKey={option.id} width={60} height={60} className="h-10 w-10" />
      </div>
      <p className="mb-1 truncate text-xs font-mono font-bold uppercase tracking-wider text-slate-900 md:text-xs">{option.label}</p>
      <span className="block truncate text-[10px] font-mono font-bold uppercase tracking-widest text-[#005596] opacity-80">
        {option.sub ?? ''}
      </span>
      {selected && <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-[#005596] shadow-sm" />}
    </motion.button>
  );
}

export default function SelectionAidsClient() {
  const { lang, t } = useLanguage();
  const isId = lang === 'id';
  const activeData = isId ? DATA_ID : DATA_EN;
  const [currentModule, setCurrentModule] = useState<ModuleKey | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<SelectionMap>({});

  const moduleConfig = currentModule ? activeData[currentModule] : null;
  const step = moduleConfig?.steps[currentStep];
  const recommendation = useMemo(() => {
    if (!currentModule) return null;
    const current = activeData[currentModule].steps[currentStep];
    if (current.type !== 'results') return null;
    return getRecommendation(currentModule, selections, isId);
  }, [currentModule, currentStep, selections, activeData, isId]);

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
        className="space-y-8 py-8 md:py-12 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <div className="mx-auto max-w-3xl space-y-4 px-4">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-[#005596]/15 shadow-xs mb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#005596]">
              Engineering Selection Aids
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-slate-900">
            {isId ? 'Asisten Konfigurasi' : 'Industrial Selection'}{' '}
            <span className="bg-gradient-to-r from-[#005596] to-[#1d4ed8] bg-clip-text text-transparent">
              {isId ? 'Teknik' : 'Assistant'}
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-sm sm:text-base font-normal leading-relaxed text-slate-600 md:text-lg">
            {t.selectionAids.subtitle}
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-6 px-2 md:grid-cols-2">
          <motion.button
            onClick={() => startModule('lifters')}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.04, ease: 'easeOut' }}
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] p-6 sm:p-8 text-left transition-all hover:ring-[#005596]/30 hover:shadow-[0_24px_50px_-10px_rgba(0,85,150,0.18)] cursor-pointer"
            type="button"
          >
            <Image
              src="/vacuum.svg"
              alt="Vacuum"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="pointer-events-none absolute bottom-0 right-0 top-0 h-full w-auto select-none object-contain opacity-10 transition-opacity duration-500 group-hover:opacity-100"
            />
            <div className="relative z-10 space-y-6">
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-[#005596] text-white shadow-lg shadow-[#005596]/25">
                <CanvasIcon iconKey="lifterHub" width={36} height={36} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black leading-tight text-slate-900 tracking-tight">Vacuum Lifters</h3>
                <p className="mt-2 text-xs sm:text-sm font-normal text-slate-600 leading-relaxed">
                  {isId ? 'Sistem alat angkat vakum ergonomis untuk operator (Jumbo / VacuMaster).' : 'Ergonomic manual handling systems (Jumbo/VacuMaster).'}
                </p>
              </div>
              <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#005596] transition-transform group-hover:translate-x-1.5 flex items-center gap-1.5">
                <span>{t.selectionAids.startLifter}</span>
                <span>→</span>
              </p>
            </div>
          </motion.button>

          <motion.button
            onClick={() => startModule('generators')}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] p-6 sm:p-8 text-left transition-all hover:ring-[#005596]/30 hover:shadow-[0_24px_50px_-10px_rgba(0,85,150,0.18)] cursor-pointer"
            type="button"
          >
            <Image
              src="/generator.svg"
              alt="Generator"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="pointer-events-none absolute bottom-0 right-0 top-0 h-full w-auto select-none object-contain opacity-10 transition-opacity duration-500 group-hover:opacity-100"
            />
            <div className="relative z-10 space-y-6">
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-[#005596] text-white shadow-lg shadow-[#005596]/25">
                <CanvasIcon iconKey="genHub" width={36} height={36} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black leading-tight text-slate-900 tracking-tight">Vacuum Generators</h3>
                <p className="mt-2 text-xs sm:text-sm font-normal text-slate-600 leading-relaxed">
                  {isId ? 'Komponen penghasil vakum untuk otomasi robotik (Compact Ejector / Pump).' : 'Automation and ejector systems (Ejector/Pump).'}
                </p>
              </div>
              <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#005596] transition-transform group-hover:translate-x-1.5 flex items-center gap-1.5">
                <span>{t.selectionAids.startGenerator}</span>
                <span>→</span>
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
    <section className="space-y-5 md:space-y-6">
      <div className="grid items-start gap-6 lg:grid-cols-12">
        <aside className="hidden space-y-6 lg:col-span-3 lg:block lg:sticky lg:top-8">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/95 bg-white/85 p-6 shadow-sm ring-1 ring-[#005596]/12 backdrop-blur-2xl">
            <div className="mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#005596] text-[9px] font-bold italic text-white">i</div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-slate-900">
                {isId ? 'Log Parameter' : 'Live Logs'}
              </h3>
            </div>

            <div className="max-h-[60vh] space-y-3 overflow-y-auto">
              {previousSteps.length === 0 && (
                <p className="py-4 text-center text-xs font-mono text-slate-400">{t.selectionAids.waitingData}</p>
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
                  <div key={logStep.id} className="flex items-center justify-between border-b border-slate-100/60 py-2.5 last:border-0">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">{logStep.label}</span>
                    <span className="text-right text-xs font-mono font-bold uppercase text-[#005596]">{String(value)}</span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={resetToHub}
              className="mt-6 w-full rounded-full border border-slate-200 py-3 text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 transition-all hover:bg-white hover:border-[#005596] hover:text-[#005596] cursor-pointer"
              type="button"
            >
              {t.selectionAids.resetAudit}
            </button>
          </div>
        </aside>

        <div className="col-span-1 space-y-5 md:space-y-6 lg:col-span-9">
          <div className="overflow-x-auto rounded-2xl sm:rounded-3xl border border-white/95 bg-white/85 p-3 sm:p-4 shadow-sm ring-1 ring-[#005596]/12 backdrop-blur-2xl">
            <div className="relative flex min-w-[460px] justify-between px-2 sm:px-4 md:min-w-full">
              <div className="absolute left-0 top-[18px] -z-10 h-[2px] w-full bg-slate-100" />
              <div className="absolute left-0 top-[18px] -z-10 h-[2px] bg-[#005596] transition-all duration-500" style={{ width: `${progressPercent}%` }} />
              {moduleConfig.steps.map((item, idx) => (
                <div key={item.id} className="flex min-w-[60px] flex-col items-center">
                  <div
                    className={[
                      'z-10 flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-all duration-500 font-mono',
                      idx < currentStep
                        ? 'bg-[#005596] text-white shadow-xs'
                        : idx === currentStep
                          ? 'scale-110 bg-[#005596] text-white ring-4 ring-[#005596]/20 shadow-md'
                          : 'border-2 border-slate-200 bg-white text-slate-400',
                    ].join(' ')}
                  >
                    {idx < currentStep ? <Check size={14} className="stroke-[3]" /> : idx + 1}
                  </div>
                  <span className={[
                    'mt-3 hidden text-[10px] font-mono font-bold uppercase tracking-wider md:block',
                    idx <= currentStep ? 'text-slate-800' : 'text-slate-400',
                  ].join(' ')}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex min-h-[500px] flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-white/95 bg-white/85 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] ring-1 ring-[#005596]/12 backdrop-blur-2xl">
            <div className="flex flex-1 flex-col p-4 sm:p-6 md:p-12">
              <AnimatePresence mode="wait" initial={false}>
                {step.type !== 'results' ? (
                  <motion.div
                    key={`step-${step.id}`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="space-y-5 md:space-y-10"
                  >
                    <div className="flex flex-col justify-between gap-3 border-b border-slate-100 pb-4 md:flex-row md:items-center md:pb-8">
                      <div className="max-w-2xl space-y-2">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#005596]/20 bg-[#005596]/5 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-[#005596] lg:hidden">
                          {isId ? 'Tahap' : 'Step'} {currentStep + 1} / {moduleConfig.steps.length}
                        </div>
                        <h2 className="text-xl sm:text-2xl font-black uppercase leading-tight tracking-tight text-slate-900 md:text-3xl">{step.title}</h2>
                        <p className="text-xs font-medium text-slate-500 md:text-sm">{step.desc}</p>
                      </div>
                      <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#005596] text-white shadow-lg shadow-[#005596]/20 ring-1 ring-white/20 md:flex">
                        <span className="font-mono text-base font-bold leading-none">{currentStep + 1}</span>
                      </div>
                    </div>

                    {(step.type === 'grid' || step.type === 'binary') && (
                      <div className={['grid gap-3 md:gap-4', (step.options?.length ?? 0) > 4 ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1 md:grid-cols-2'].join(' ')}>
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
                        className="mx-auto w-full max-w-3xl space-y-6 py-4 md:space-y-10 md:py-8"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      >
                        <div className="relative h-4 rounded-full border-2 border-white bg-slate-100 shadow-inner md:h-5">
                          <div className="absolute h-full rounded-full bg-gradient-to-r from-[#005596] to-[#1d4ed8] shadow-md transition-all duration-75" style={{ width: `${(sliderValue / (step.max ?? 250)) * 100}%` }} />
                          <input
                            type="range"
                            min={step.min}
                            max={step.max}
                            value={sliderValue}
                            onChange={(e) => handleSlider(e.target.value)}
                            className="absolute h-full w-full cursor-pointer opacity-0"
                          />
                        </div>
                        <div className="grid items-center gap-6 rounded-2xl sm:rounded-3xl border border-white/15 bg-gradient-to-br from-[#002244] via-[#003b6d] to-[#005596] p-6 sm:p-8 text-white shadow-xl ring-1 ring-white/10 md:grid-cols-2">
                          <div className="space-y-2 text-left">
                            <span className="mb-1 block text-[10px] font-mono font-bold uppercase tracking-wider text-blue-200">
                              {isId ? 'Input Beban Manual' : 'Manual Input'}
                            </span>
                            <div className="relative flex items-center">
                              <input
                                type="number"
                                value={sliderValue}
                                min={step.min}
                                max={step.max}
                                onChange={(e) => handleSlider(e.target.value)}
                                className="w-full rounded-xl border border-white/20 bg-white/10 py-3 pl-4 pr-14 font-mono text-2xl sm:text-3xl font-black text-white outline-none backdrop-blur-md transition-all focus:border-sky-400 md:text-4xl"
                              />
                              <span className="absolute right-4 font-mono text-sm font-bold text-blue-200">KG</span>
                            </div>
                          </div>
                          <div className="hidden flex-col items-center space-y-2 px-4 text-center md:flex">
                            <div className="h-1 w-10 rounded-full bg-sky-400" />
                            <p className="text-xs font-medium leading-relaxed text-blue-100/90">
                              {isId
                                ? 'Menentukan diameter lift tube serta faktor keselamatan mekanis (Safety Factor).'
                                : 'Determines tube diameter and mechanical safety factor.'}
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
                    className="space-y-6 md:space-y-8"
                  >
                  <div className="space-y-3 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 shadow-xs backdrop-blur-md">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" /> {t.selectionAids.complete}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black uppercase leading-tight tracking-tight text-slate-900 md:text-4xl">
                      {isId ? 'Solusi' : 'Solution'} <span className="bg-gradient-to-r from-[#005596] to-[#1d4ed8] bg-clip-text text-transparent">{t.selectionAids.found}</span>
                    </h2>
                  </div>

                  <div className="grid gap-6 md:gap-8 xl:grid-cols-12">
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.06, duration: 0.35 }}
                      className="group relative col-span-7 flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#002244] via-[#003b6d] to-[#005596] p-6 sm:p-8 text-white shadow-2xl border border-white/15 ring-1 ring-white/10 md:p-10"
                    >
                      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#005596]/30 blur-3xl" />
                      <div className="relative z-10">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-blue-200 backdrop-blur-md">
                          {recommendation.tagline}
                        </div>
                        <h3 className="mb-4 text-2xl sm:text-3xl font-black uppercase leading-tight tracking-tight text-white md:text-4xl">
                          {recommendation.name}
                        </h3>
                        <p className="mb-6 text-sm font-medium leading-relaxed text-blue-100/90 md:text-base">{recommendation.desc}</p>
                        <div className="mb-6 sm:mb-8 rounded-2xl border border-white/15 bg-white/10 p-4 sm:p-5 backdrop-blur-md">
                          <p className="mb-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-blue-200">Schmalz Logic Engine</p>
                          <p className="border-l-2 border-sky-400 pl-3 text-xs font-medium text-white/90 md:text-sm">{recommendation.logic}</p>
                        </div>
                      </div>
                      <div className="relative z-10 flex flex-col gap-3 sm:flex-row">
                        <a
                          href={recommendation.productUrl}
                          className="flex-1 rounded-full bg-white px-6 py-3.5 text-center text-xs font-bold uppercase tracking-wider text-[#005596] shadow-lg shadow-black/20 transition-all hover:bg-slate-100 hover:scale-[1.01] active:scale-[0.99]"
                        >
                          {isId ? 'Lihat Detail Produk →' : 'View Product →'}
                        </a>
                        <button
                          onClick={resetToHub}
                          type="button"
                          className="rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-center text-xs font-mono font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all hover:bg-white/15"
                        >
                          {t.selectionAids.restart}
                        </button>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12, duration: 0.35 }}
                      className="col-span-5 space-y-6"
                    >
                      <div className="rounded-2xl sm:rounded-3xl border border-white/95 bg-white/85 p-6 sm:p-8 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] ring-1 ring-[#005596]/12 backdrop-blur-2xl">
                        <h4 className="mb-4 text-[10px] font-mono font-bold uppercase tracking-wider text-[#005596]">{t.selectionAids.technicalSpec}</h4>
                        <div className="space-y-3">
                          {recommendation.specs.map((spec) => (
                            <div key={spec.key} className="flex items-center justify-between border-b border-slate-100 py-2.5 last:border-0">
                              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">{spec.key}</span>
                              <span className="text-right text-xs font-bold text-slate-900">{spec.value}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 space-y-3">
                          <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#005596]">{t.selectionAids.performanceSnapshot}</p>
                          {(isId
                            ? ['Efisiensi', 'Safety', 'Kecepatan', 'Ergonomi', 'ROI']
                            : ['Efficiency', 'Safety', 'Speed', 'Ergonomics', 'ROI']
                          ).map((label, idx) => (
                            <div key={label} className="space-y-1">
                              <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-wide text-slate-500">
                                <span>{label}</span>
                                <span>{recommendation.scores[idx]}%</span>
                              </div>
                              <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                                <div
                                  className="h-2 rounded-full bg-gradient-to-r from-[#005596] to-[#1d4ed8] transition-all duration-500"
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

            <div className="relative z-20 flex flex-col-reverse items-center justify-between gap-4 border-t border-slate-100/80 bg-white/60 px-6 py-5 backdrop-blur-md md:flex-row">
              <button
                onClick={prevStep}
                type="button"
                disabled={currentStep === 0}
                className="w-full rounded-full px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-900 disabled:pointer-events-none disabled:opacity-0 md:w-auto"
              >
                ← {t.selectionAids.back}
              </button>

              {step.type !== 'results' && (
                <button
                  onClick={nextStep}
                  type="button"
                  className="group flex w-full items-center justify-center gap-3 rounded-full bg-[#005596] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-[#005596]/20 transition-all hover:bg-[#004276] hover:shadow-[#005596]/30 hover:scale-[1.01] active:scale-[0.99] md:w-auto"
                >
                  <span>{currentStep === moduleConfig.steps.length - 2 ? t.selectionAids.seeResult : t.selectionAids.continue}</span>
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
