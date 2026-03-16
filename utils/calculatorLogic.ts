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
    label: string;
    productUrl: string;
}

/**
 * Returns product recommendation + direct URL to the product catalog page.
 * @param weight - payload weight in kg
 */
export const getRecommendation = (weight: number): RecommendationResult => {
    if (weight <= 35) {
        return {
            label: 'Fastest Solution: SCHMALZ JumboFlex (High Speed Handling)',
            productUrl: '/products/schmalz/vacuum-tube-lifter',
        };
    } else if (weight <= 80) {
        return {
            label: 'Medium Load Solution: SCHMALZ JumboErgo (Modular Tube Lifter)',
            productUrl: '/products/schmalz/vacuum-tube-lifter',
        };
    } else if (weight <= 140) {
        return {
            label: 'Heavy Load Solution: SCHMALZ VacuMaster (Heavy Load Lifting)',
            productUrl: '/products/schmalz/vacumaster',
        };
    } else {
        return {
            label: 'Precision System: BINAR Quick-Lift Arm (Servo Lifting System)',
            productUrl: '/products/binar/qla-50i-om',
        };
    }
};

export const getSafetyMessage = (isDangerous: boolean, weight: number) => {
    if (weight > 25) {
        return 'Load exceeds the manual lifting limit. A vacuum lifter solution is required to reduce HNP injury risk.';
    }
    if (isDangerous) {
        return 'Total daily tonnage poses a high risk of operator physical fatigue.';
    }
    return 'Current operator workload remains within factory ergonomic standards.';
};
