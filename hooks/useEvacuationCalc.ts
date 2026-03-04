import { useState, useCallback } from 'react';
import { UNITS } from '../constants/calculatorData';

/**
 * Sub-hook: handles evacuation time and suction capacity state + calculations.
 * Covers: volume, pump capacity, evacuation time, vacuum level.
 */
export const useEvacuationCalc = (
    getSI: (val: number | string, unit: string, type: string) => number,
    vacuum: number,
    vacuumUnit: string,
) => {
    const [volume, setVolume] = useState(10);
    const [volumeUnit, setVolumeUnit] = useState('l');
    const [pumpCapacity, setPumpCapacity] = useState(50);
    const [pumpCapacityUnit, setPumpCapacityUnit] = useState('l/min');
    const [evacTime, setEvacTime] = useState(5);
    const [evacTimeUnit, setEvacTimeUnit] = useState('s');

    const [reqSuctionCapUnit, setReqSuctionCapUnit] = useState('m³/h');

    const getVacuumRatio = useCallback(() => {
        // Schmalz uses standard atmospheric pressure of 1013 mbar for these calculations
        // We get pressure in Pa from getSI, converting to mbar
        const p_vac_mbar = getSI(vacuum, vacuumUnit, 'pressure') / 100;
        return Math.min(0.999, p_vac_mbar / 1013);
    }, [getSI, vacuum, vacuumUnit]);

    const getVolumeLSl = () => {
        const volume_m3 = getSI(volume, volumeUnit, 'volume');
        return volume_m3 * 1000; // Convert to Liters
    };

    const getPumpCapacityLs = () => {
        const q_val = parseFloat(String(pumpCapacity));
        if (pumpCapacityUnit === 'l/min') return q_val / 60;
        if (pumpCapacityUnit === 'm³/h') return q_val * 1000 / 3600;

        // Fallback for other potential units
        const q_m3_s = q_val * (UNITS.flow.factors[pumpCapacityUnit] || 1);
        return q_m3_s * 1000;
    };

    const calcEvacTime = () => {
        const v_L = getVolumeLSl();
        const q_Ls = getPumpCapacityLs();
        if (q_Ls <= 0) return 0;

        const r = getVacuumRatio();
        const evacFactor = Math.log(1 / (1 - r)) * 1.3;

        return Number((v_L / q_Ls * evacFactor).toFixed(2));
    };

    const calcSuctionCap = () => {
        const v_L = getVolumeLSl();
        const t_s = parseFloat(String(evacTime)) * (evacTimeUnit === 'min' ? 60 : 1);
        if (t_s <= 0) return 0;

        const r = getVacuumRatio();
        const evacFactor = Math.log(1 / (1 - r)) * 1.3;
        const required_Ls = (v_L / t_s) * evacFactor;

        if (reqSuctionCapUnit === 'l/min') return Number((required_Ls * 60).toFixed(2));
        if (reqSuctionCapUnit === 'm³/h') return Number((required_Ls * 3.6).toFixed(2));

        const required_m3_s = required_Ls / 1000;
        const factor = 1 / (UNITS.flow.factors[reqSuctionCapUnit] || 1);
        return Number((required_m3_s * factor).toFixed(2));
    };

    return {
        state: { volume, volumeUnit, pumpCapacity, pumpCapacityUnit, evacTime, evacTimeUnit, reqSuctionCapUnit },
        setters: { setVolume, setVolumeUnit, setPumpCapacity, setPumpCapacityUnit, setEvacTime, setEvacTimeUnit, setReqSuctionCapUnit },
        calculations: { calcEvacTime, calcSuctionCap },
    };
};
