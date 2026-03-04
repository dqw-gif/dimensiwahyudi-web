import { useState, useEffect, useCallback } from 'react';
import { UNITS } from '../constants/calculatorData';

/**
 * Sub-hook: handles force-related state and calculations.
 * Covers: mass, acceleration, vacuum, safety factor, friction, suction area.
 */
export const useForceCalculations = () => {
    const [mass, setMass] = useState(10);
    const [massUnit, setMassUnit] = useState('kg');
    const [accel, setAccel] = useState(5);
    const [accelUnit, setAccelUnit] = useState('m/s²');
    const [vacuum, setVacuum] = useState(0.6);
    const [vacuumUnit, setVacuumUnit] = useState('bar');
    const [safety, setSafety] = useState(2.0);
    const [friction, setFriction] = useState(0.5);

    const [suctionArea, setSuctionArea] = useState(1963.5);
    const [suctionAreaUnit, setSuctionAreaUnit] = useState('mm²');
    const [calcAreaMode, setCalcAreaMode] = useState(false);
    const [areaType, setAreaType] = useState('Area round');
    const [dim1, setDim1] = useState(50);
    const [dim2, setDim2] = useState(30);

    const [numCupsInput, setNumCupsInput] = useState(1);
    const [diameterUnit, setDiameterUnit] = useState('mm');

    const getSI = useCallback((val: number | string, unit: string, type: string) => {
        const factor: number = UNITS[type]?.factors[unit] || 1;
        return parseFloat(String(val)) * factor;
    }, []);

    // Auto-calculate suction area from dimensions
    useEffect(() => {
        if (calcAreaMode) {
            let areaMM2 = 0;
            const d1 = parseFloat(String(dim1)) || 0;
            const d2 = parseFloat(String(dim2)) || 0;
            if (areaType === 'Area round') areaMM2 = Math.PI * Math.pow(d1 / 2, 2);
            else if (areaType === 'Rectangle area') areaMM2 = d1 * d2;
            else if (areaType === 'Oval surface') areaMM2 = (Math.PI / 4) * d1 * d2;
            const areaM2 = areaMM2 * 1e-6;
            const factorToUnit = 1 / UNITS.area.factors[suctionAreaUnit];
            const newValue = Number((areaM2 * factorToUnit).toFixed(2));
            setSuctionArea(prev => prev !== newValue ? newValue : prev);
        }
    }, [calcAreaMode, areaType, dim1, dim2, suctionAreaUnit]);

    const calcNumCups = () => {
        const m = getSI(mass, massUnit, 'mass');
        const a = getSI(accel, accelUnit, 'accel');

        // Correct Schmalz formulas
        const f_horizontal = m * (9.81 + a / friction) * safety;
        const f_vertical = (m / friction) * (9.81 + a) * safety;

        const fs = getSI(vacuum, vacuumUnit, 'pressure') * getSI(suctionArea, suctionAreaUnit, 'area');
        if (fs <= 0) return { h: 0, v: 0 };
        return {
            h: Math.ceil(f_horizontal / fs),
            v: Math.ceil(f_vertical / fs)
        };
    };

    const calcDiameter = () => {
        const m = getSI(mass, massUnit, 'mass');
        const a = getSI(accel, accelUnit, 'accel');

        const f_horizontal = m * (9.81 + a / friction) * safety;
        const f_vertical = (m / friction) * (9.81 + a) * safety;

        const p = getSI(vacuum, vacuumUnit, 'pressure');
        if (p <= 0 || numCupsInput <= 0) return { h: 0, v: 0, area_h: 0, area_v: 0 };

        const aH = f_horizontal / (numCupsInput * p);
        const aV = f_vertical / (numCupsInput * p);

        const factor = 1 / UNITS.length.factors[diameterUnit];
        return {
            h: Number((2 * Math.sqrt(aH / Math.PI) * factor).toFixed(2)),
            v: Number((2 * Math.sqrt(aV / Math.PI) * factor).toFixed(2)),
            area_h: Number((aH * 1e6).toFixed(2)),
            area_v: Number((aV * 1e6).toFixed(2)),
        };
    };

    const calcForce = () => {
        const p_pa = getSI(vacuum, vacuumUnit, 'pressure');
        const area_m2 = getSI(suctionArea, suctionAreaUnit, 'area');
        return Math.round(p_pa * area_m2);
    };

    const calcHoldingForce = () => {
        const m = getSI(mass, massUnit, 'mass');
        const a = getSI(accel, accelUnit, 'accel');

        const lc1 = m * (9.81 + a) * safety;
        const lc2 = m * (9.81 + a / friction) * safety;
        const lc3 = (m / friction) * (9.81 + a) * safety;

        return {
            lc1: Number(lc1.toFixed(1)),
            lc2: Number(lc2.toFixed(1)),
            lc3: Number(lc3.toFixed(1))
        };
    };

    return {
        state: {
            mass, massUnit, accel, accelUnit, vacuum, vacuumUnit, safety, friction,
            suctionArea, suctionAreaUnit, calcAreaMode, areaType, dim1, dim2,
            numCupsInput, diameterUnit,
        },
        setters: {
            setMass, setMassUnit, setAccel, setAccelUnit, setVacuum, setVacuumUnit,
            setSafety, setFriction, setSuctionArea, setSuctionAreaUnit,
            setCalcAreaMode, setAreaType, setDim1, setDim2,
            setNumCupsInput, setDiameterUnit,
        },
        calculations: { calcNumCups, calcDiameter, calcForce, calcHoldingForce },
        getSI,
    };
};
