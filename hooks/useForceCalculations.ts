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
        const fv = getSI(mass, massUnit, 'mass') * (9.81 + getSI(accel, accelUnit, 'accel')) * safety;
        const fs = getSI(vacuum, vacuumUnit, 'pressure') * getSI(suctionArea, suctionAreaUnit, 'area');
        if (fs <= 0) return { h: 0, v: 0 };
        return { h: Math.ceil(fv / (fs * friction)), v: Math.ceil(fv / fs) };
    };

    const calcDiameter = () => {
        const fv = getSI(mass, massUnit, 'mass') * (9.81 + getSI(accel, accelUnit, 'accel')) * safety;
        const p = getSI(vacuum, vacuumUnit, 'pressure');
        if (p <= 0 || numCupsInput <= 0) return { h: 0, v: 0 };
        const aH = fv / (numCupsInput * p * friction);
        const aV = fv / (numCupsInput * p);
        const factor = 1 / UNITS.length.factors[diameterUnit];
        return {
            h: Math.ceil(2 * Math.sqrt(aH / Math.PI) * factor),
            v: Math.ceil(2 * Math.sqrt(aV / Math.PI) * factor),
        };
    };

    const calcForce = () => {
        const p_pa = getSI(vacuum, vacuumUnit, 'pressure');
        const area_m2 = getSI(suctionArea, suctionAreaUnit, 'area');
        return Math.round(p_pa * area_m2);
    };

    const calcHoldingForce = () => {
        const fv = getSI(mass, massUnit, 'mass') * (9.81 + getSI(accel, accelUnit, 'accel')) * safety;
        return { v: Math.round(fv), h: Math.round(fv / friction) };
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
