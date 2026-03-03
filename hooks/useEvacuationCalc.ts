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

    const getVacuumRatio = useCallback(() => {
        return Math.min(0.99, getSI(vacuum, vacuumUnit, 'pressure') / 100000);
    }, [getSI, vacuum, vacuumUnit]);

    const calcEvacTime = () => {
        const q = parseFloat(String(pumpCapacity)) * UNITS.flow.factors[pumpCapacityUnit];
        if (q <= 0) return 0;
        const r = getVacuumRatio();
        return ((getSI(volume, volumeUnit, 'volume') / q) * Math.log(1 / (1 - r)) * 1.3).toFixed(2);
    };

    const calcSuctionCap = () => {
        const vol_m3 = getSI(volume, volumeUnit, 'volume');
        const t_s = parseFloat(String(evacTime)) * (evacTimeUnit === 'min' ? 60 : 1);
        if (t_s <= 0) return 0;
        const r = getVacuumRatio();
        const s_m3s = (vol_m3 / t_s) * Math.log(1 / (1 - r)) * 1.3;
        const factor = 1 / UNITS.flow.factors[pumpCapacityUnit];
        return (s_m3s * factor).toFixed(1);
    };

    return {
        state: { volume, volumeUnit, pumpCapacity, pumpCapacityUnit, evacTime, evacTimeUnit },
        setters: { setVolume, setVolumeUnit, setPumpCapacity, setPumpCapacityUnit, setEvacTime, setEvacTimeUnit },
        calculations: { calcEvacTime, calcSuctionCap },
    };
};
