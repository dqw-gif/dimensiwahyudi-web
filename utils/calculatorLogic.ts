// utils/calculatorLogic.ts

export interface RecommendationResult {
  title: string;
  series: string;
  badge: string;
  description: string;
  productUrl: string;
  keyFeature: string;
}

export interface ErgonomicCalculation {
  weight: number;
  frequency: number;
  workHours: number;
  operatorCount: number;
  dailyTotalKg: number;
  dailyTotalTons: number;
  dailyPerOperatorTons: number;
  annualTotalTons: number;
  spineCompressionManualKg: number;
  spineCompressionSchmalzKg: number;
  isDangerous: boolean;
  riskLevel: 'CRITICAL' | 'WARNING' | 'COMPLIANT';
  safetyMessage: string;
  recommendation: RecommendationResult;
  // Financial & ROI
  annualMedicalSavingRp: number;
  throughputGainPercent: number;
  addedCyclesDaily: number;
  paybackPeriodMonths: string;
}

export const calculateErgonomicsAndROI = (
  weight: number,
  frequency: number,
  workHours: number,
  operatorCount: number = 2,
  lang: 'en' | 'id' = 'en'
): ErgonomicCalculation => {
  const isId = lang === 'id';
  const dailyTotalKg = weight * frequency * workHours * operatorCount;
  const dailyTotalTons = dailyTotalKg / 1000;
  const dailyPerOperatorTons = (weight * frequency * workHours) / 1000;
  const annualTotalTons = dailyTotalTons * 250; // 250 active operating days per year

  // Biomechanical compression on intervertebral discs (L4/L5) during manual bending and lifting:
  // Average back lever arm ratio ~10:1 plus upper body mass.
  const spineCompressionManualKg = Math.round(weight * 8.5 + 85);
  const spineCompressionSchmalzKg = 0; // Gravitational load fully sustained by pneumatic tube / servo arm

  // International standard ISO 11228-1 and national labor standards: max manual lift limit is 25 kg
  const isDangerous = weight > 25 || dailyPerOperatorTons > 5;
  let riskLevel: 'CRITICAL' | 'WARNING' | 'COMPLIANT' = 'COMPLIANT';
  let safetyMessage = isId
    ? 'Beban angkat operator masih berada di dalam batas pedoman ergonomi manual standar.'
    : 'Operator handling load remains within acceptable unassisted ergonomic guidelines.';

  if (weight > 25) {
    riskLevel = 'CRITICAL';
    safetyMessage = isId
      ? 'Beban melebihi batas aman angkat manual 25 kg (ISO 11228-1). Risiko tinggi cedera punggung bawah (saraf terjepit / LBP) jika tanpa alat bantu angkat mekanis.'
      : 'Load exceeds the 25 kg safe manual lifting threshold (ISO 11228-1). High risk of lower back injury (herniated disc / LBP) without mechanical lifting assistance.';
  } else if (dailyPerOperatorTons > 4 || weight > 18) {
    riskLevel = 'WARNING';
    safetyMessage = isId
      ? 'Akumulasi tonase harian yang tinggi memicu kelelahan otot kronis dan penurunan kecepatan cycle time di akhir shift.'
      : 'High cumulative daily tonnage causes chronic muscular fatigue and cycle deceleration across the shift.';
  }

  // Equipment Recommendation Logic (Product names & series remain 100% in English)
  let recommendation: RecommendationResult;
  if (weight <= 35) {
    recommendation = {
      title: 'SCHMALZ JumboFlex',
      series: 'High-Speed Vacuum Tube Lifter',
      badge: isId ? 'Logistik Cycle Tinggi (Karton & Box)' : 'High-Cycle Logistics (Boxes & Cartons)',
      description: isId
        ? 'Dirancang untuk lini pengemasan, sel perakitan, dan penyortiran logistik dengan kendali satu jari yang responsif.'
        : 'Engineered for packaging lines, assembly cells, and logistics sorting with responsive single-finger control.',
      productUrl: '/products/schmalz/vacuum-tube-lifter/jumboflex',
      keyFeature: isId
        ? 'Kecepatan angkat hingga 1 m/s dengan tuas kendali ergonomis satu tangan.'
        : 'Lifting speed up to 1 m/s with ergonomic one-handed control handle.',
    };
  } else if (weight <= 80) {
    recommendation = {
      title: 'SCHMALZ JumboErgo',
      series: 'Modular Vacuum Tube Lifter',
      badge: isId ? 'Handling Beban Menengah (Karung, Drum, Pail)' : 'Medium-Weight Handling (Sacks, Drums, Pails)',
      description: isId
        ? 'Tuas putar memanjang menjaga postur punggung operator tetap tegak saat mengangkat karung bahan baku atau wadah berat ke atas palet.'
        : 'Extended twist handle maintains an upright operator posture when lifting heavy raw material sacks or containers onto pallets.',
      productUrl: '/products/schmalz/vacuum-tube-lifter/jumboergo',
      keyFeature: isId
        ? 'Tuas kendali model gas motor memberikan jarak pandang beban yang jelas dan penempatan stabil.'
        : 'Extended motorcycle-style twist handle provides clear load line-of-sight and steady positioning.',
    };
  } else if (weight <= 250) {
    recommendation = {
      title: 'SCHMALZ VacuMaster',
      series: 'Heavy-Duty Industrial Vacuum Lifter',
      badge: isId ? 'Lembaran Industri Berat (Plat Besi, Kaca, Kayu)' : 'Heavy Industrial Sheets (Metal, Glass, Timber)',
      description: isId
        ? 'Tangki cadangan vakum terintegrasi mencegah workpiece jatuh saat terjadi mati listrik mendadak di pabrik.'
        : 'Integrated vacuum safety reservoir prevents workpiece drops during unexpected factory electrical outages.',
      productUrl: '/products/schmalz/vacumaster',
      keyFeature: isId
        ? 'Dilengkapi katup pengaman satu arah, tangki reservoar, serta indikator kebocoran vakum audio/visual.'
        : 'Equipped with non-return safety valve, reservoir tank, and audible/visual vacuum leak indicators.',
    };
  } else {
    recommendation = {
      title: 'BINAR Quick-Lift Arm (QLA)',
      series: 'Precision Intelligent Lifting Arm',
      badge: isId ? 'Manipulator Servo Elektrik Swedia' : 'Swedish Electric Servo Manipulator',
      description: isId
        ? 'Manipulator servo elektrik asal Swedia yang merespons sentuhan tangan operator secara instan tanpa menguras tenaga.'
        : 'Ultra-ergonomic Swedish servo manipulator with electric motors that respond instantly to operator hand pressure.',
      productUrl: '/products/binar/qla-50i-om',
      keyFeature: isId
        ? 'Penempatan komponen presisi tinggi hingga 0,2 mm untuk lini perakitan dengan beban hingga 300+ kg.'
        : 'High precision positioning down to 0.2 mm for assembly lines with loads up to 300+ kg.',
    };
  }

  // Financial & ROI Modeling
  // 1. Annual injury claim, sick leave, and shift disruption savings (IDR / year)
  let baseSavingPerOperator = 8000000;
  if (weight > 25) {
    baseSavingPerOperator = 22000000;
  } else if (weight > 15) {
    baseSavingPerOperator = 14000000;
  }
  const annualMedicalSavingRp = baseSavingPerOperator * operatorCount;

  // 2. Throughput Acceleration
  const throughputGainPercent = weight <= 50 ? 35 : 25;
  const addedCyclesDaily = Math.round(frequency * workHours * (throughputGainPercent / 100) * operatorCount);

  // 3. Estimated Payback Period
  let paybackPeriodMonths = isId ? '9 hingga 14 Bulan' : '9 to 14 Months';
  if (dailyTotalTons > 15 || (weight > 25 && frequency > 80)) {
    paybackPeriodMonths = isId ? '6 hingga 9 Bulan' : '6 to 9 Months';
  } else if (weight <= 25 && frequency <= 50) {
    paybackPeriodMonths = isId ? '12 hingga 16 Bulan' : '12 to 16 Months';
  }

  return {
    weight,
    frequency,
    workHours,
    operatorCount,
    dailyTotalKg,
    dailyTotalTons,
    dailyPerOperatorTons,
    annualTotalTons,
    spineCompressionManualKg,
    spineCompressionSchmalzKg,
    isDangerous,
    riskLevel,
    safetyMessage,
    recommendation,
    annualMedicalSavingRp,
    throughputGainPercent,
    addedCyclesDaily,
    paybackPeriodMonths,
  };
};

// Legacy exports for backward compatibility
export const calculateTotalLoad = (weight: number, frequency: number, workHours: number) => {
  const totalLoadKg = weight * frequency * workHours;
  return {
    kg: totalLoadKg,
    tons: totalLoadKg / 1000,
  };
};

export const checkSafetyStatus = (totalLoadTons: number, weightPerUnit: number) => {
  return totalLoadTons > 5 || weightPerUnit > 25;
};

export const getRecommendation = (weight: number) => {
  const calc = calculateErgonomicsAndROI(weight, 100, 8, 1);
  return {
    label: `${calc.recommendation.title} (${calc.recommendation.series})`,
    productUrl: calc.recommendation.productUrl,
  };
};

export const getSafetyMessage = (isDangerous: boolean, weight: number) => {
  if (weight > 25) {
    return 'Load exceeds the 25 kg safe manual lifting threshold (ISO 11228-1). Mechanical vacuum lifters are required to prevent lumbar spine injury.';
  }
  if (isDangerous) {
    return 'High cumulative daily tonnage causes severe physical fatigue on line operators.';
  }
  return 'Operator workload currently remains within standard ergonomic thresholds.';
};
