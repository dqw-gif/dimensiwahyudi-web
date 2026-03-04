import { useState } from 'react';
import { UNITS } from '../constants/calculatorData';

/**
 * Sub-hook: handles hose sizing, altitude, and air flow resistor calculations.
 */
export const useHoseCalc = (
    getSI: (val: number | string, unit: string, type: string) => number,
    pumpCapacity: number,
    pumpCapacityUnit: string,
) => {
    const [hoseDistMode, setHoseDistMode] = useState('main_to_sub');
    const [hoseInputDia, setHoseInputDia] = useState(12);
    const [hoseInputDiaUnit, setHoseInputDiaUnit] = useState('mm');
    const [subHoses, setSubHoses] = useState(4);

    const [hoseDiaMode, setHoseDiaMode] = useState('vacuum');
    const [hoseLength, setHoseLength] = useState(5);
    const [hoseLengthUnit, setHoseLengthUnit] = useState('m');
    const [flowRate, setFlowRate] = useState(60);
    const [flowRateUnit, setFlowRateUnit] = useState('m/s');
    const [sysPressure, setSysPressure] = useState(6);
    const [sysPressureUnit, setSysPressureUnit] = useState('bar');
    const [genPressure, setGenPressure] = useState(4);
    const [genPressureUnit, setGenPressureUnit] = useState('bar');

    const [altitude, setAltitude] = useState(0);
    const [altitudeUnit, setAltitudeUnit] = useState('m');
    const [nominalEvacuation, setNominalEvacuation] = useState(85);

    const [numResistors, setNumResistors] = useState(1);
    const [resistorDia, setResistorDia] = useState(2);
    const [resistorDiaUnit, setResistorDiaUnit] = useState('mm');

    const calcHoseDist = () => {
        const d = parseFloat(String(hoseInputDia));
        const n = parseInt(String(subHoses)) || 1;
        return (hoseDistMode === 'main_to_sub' ? d / Math.sqrt(n) : d * Math.sqrt(n)).toFixed(1);
    };

    const calcHoseDiameter = () => {
        const q_m3s = parseFloat(String(pumpCapacity)) * UNITS.flow.factors[pumpCapacityUnit];
        const L = getSI(hoseLength, hoseLengthUnit, 'length');
        let d_m = 0;

        if (hoseDiaMode === 'vacuum') {
            const v_ms = parseFloat(String(flowRate)) * UNITS.velocity.factors[flowRateUnit];

            let d_v = 0;
            if (v_ms > 0) d_v = Math.sqrt((4 * q_m3s) / (Math.PI * v_ms));

            let d_p = 0;
            // Schmalz uses a pressure drop constraint for vacuum hoses, modeled here with ~200mbar limit equivalent
            if (L > 0) d_p = Math.pow((Math.pow(q_m3s, 2) * L) / 20500, 0.2) * 0.5;

            d_m = Math.max(d_v, d_p);
        } else {
            const p_sys_pa = getSI(sysPressure, sysPressureUnit, 'pressure');
            const p_gen_pa = getSI(genPressure, genPressureUnit, 'pressure');
            const dP = Math.abs(p_sys_pa - p_gen_pa);
            if (dP > 0 && L > 0) d_m = Math.pow((Math.pow(q_m3s, 2) * L) / dP, 0.2) * 0.5;
        }

        return Number((d_m * 1000).toFixed(2));
    };

    const calcAmbientPressure = () => {
        const h = parseFloat(String(altitude)) * (altitudeUnit === 'm' ? 1 : 0.3048);
        const p_atm = 1013.25 * Math.pow((1 - 2.25577e-5 * h), 5.25588);
        return Math.round(p_atm);
    };

    const calcMaxAchievableVacuum = () => {
        const p_atm = calcAmbientPressure();
        const nom = parseFloat(String(nominalEvacuation)) / 100;
        return Math.round(p_atm * nom);
    };

    const calcAtmosphere = () => {
        const h = parseFloat(String(altitude)) * (altitudeUnit === 'm' ? 1 : 0.3048);
        const p_atm = 1013.25 * Math.pow((1 - 2.25577e-5 * h), 5.25588);
        const nom = parseFloat(String(nominalEvacuation)) / 100;
        return {
            ambient: p_atm,
            max_vac: -(p_atm * nom),
            max_vac_bad: -(p_atm * nom * 0.95)
        };
    };

    const calcAirFlowResistor = () => {
        const n = parseInt(String(numResistors)) || 1;
        const d_mm = parseFloat(String(resistorDia));
        const A_mm2 = n * Math.PI * Math.pow(d_mm / 2, 2);
        return (A_mm2 * 12 * Math.sqrt(0.6)).toFixed(1);
    };

    return {
        state: {
            hoseDistMode, hoseInputDia, hoseInputDiaUnit, subHoses,
            hoseDiaMode, hoseLength, hoseLengthUnit, flowRate, flowRateUnit,
            sysPressure, sysPressureUnit, genPressure, genPressureUnit,
            altitude, altitudeUnit, nominalEvacuation,
            numResistors, resistorDia, resistorDiaUnit,
        },
        setters: {
            setHoseDistMode, setHoseInputDia, setHoseInputDiaUnit, setSubHoses,
            setHoseDiaMode, setHoseLength, setHoseLengthUnit, setFlowRate, setFlowRateUnit,
            setSysPressure, setSysPressureUnit, setGenPressure, setGenPressureUnit,
            setAltitude, setAltitudeUnit, setNominalEvacuation,
            setNumResistors, setResistorDia, setResistorDiaUnit,
        },
        calculations: {
            calcHoseDist, calcHoseDiameter, calcAmbientPressure,
            calcMaxAchievableVacuum, calcAtmosphere, calcAirFlowResistor,
        },
    };
};
