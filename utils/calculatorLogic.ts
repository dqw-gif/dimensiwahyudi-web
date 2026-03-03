// utils/calculatorLogic.ts

export const calculateTotalLoad = (weight: number, frequency: number, workHours: number) => {
    const totalLoadKg = weight * frequency * workHours;
    return {
        kg: totalLoadKg,
        tons: totalLoadKg / 1000
    };
};

export const checkSafetyStatus = (totalLoadTons: number, weightPerUnit: number) => {
    return totalLoadTons > 5 || weightPerUnit > 25;
};

export interface RecommendationResult {
    label: string;    // Teks rekomendasi (ditampilkan di card)
    productUrl: string; // URL ke halaman produk spesifik
}

/**
 * Returns product recommendation + direct URL to the product catalog page.
 * @param weight - berat payload dalam kg
 */
export const getRecommendation = (weight: number): RecommendationResult => {
    if (weight <= 35) {
        return {
            label: 'Solusi Tercepat: SCHMALZ JumboFlex (High Speed Handling)',
            productUrl: '/products/schmalz/vacuum-tube-lifter',
        };
    } else if (weight <= 80) {
        return {
            label: 'Solusi Beban Sedang: SCHMALZ JumboErgo (Modular Tube Lifter)',
            productUrl: '/products/schmalz/vacuum-tube-lifter',
        };
    } else if (weight <= 140) {
        return {
            label: 'Solusi Beban Berat: SCHMALZ VacuMaster (Heavy Load Lifting)',
            productUrl: '/products/schmalz/vacumaster',
        };
    } else {
        return {
            label: 'Sistem Presisi: BINAR Quick-Lift Arm (Servo Lifting System)',
            productUrl: '/products/binar/qla-50i-om',
        };
    }
};

export const getSafetyMessage = (isDangerous: boolean, weight: number) => {
    if (weight > 25) {
        return 'Beban melebihi batas angkat manual. Diperlukan solusi Vacuum Lifter untuk mencegah risiko HNP.';
    }
    if (isDangerous) {
        return 'Total tonase harian berisiko tinggi terhadap kelelahan fisik operator.';
    }
    return 'Beban kerja operator saat ini masih memenuhi standar ergonomi pabrik.';
};
