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

    const [inletPressure, setInletPressure] = useState(1013);
    const [inletPressureUnit, setInletPressureUnit] = useState('mbar');
    const [temperature, setTemperature] = useState(20);
    const [occupancyRate, setOccupancyRate] = useState(0);
    const [vacuumDrop, setVacuumDrop] = useState(600);
    const [vacuumDropUnit, setVacuumDropUnit] = useState('mbar');
    const [genSafetyFactor, setGenSafetyFactor] = useState(1.35);

    const calcAirFlowResistor = () => {
        // Inputs
        const p1_mbar = getSI(inletPressure, inletPressureUnit, 'pressure') / 100; // ambient inlet
        const dP_mbar = getSI(vacuumDrop, vacuumDropUnit, 'pressure') / 100; // vacuum drop
        const T_C = parseFloat(String(temperature));
        const T_K = T_C + 273.15;
        const total_resistors = parseInt(String(numResistors)) || 0;
        const occ_rate = parseFloat(String(occupancyRate)) / 100;
        const dia_mm = parseFloat(String(resistorDia));
        const safety = parseFloat(String(genSafetyFactor));
        const nom_eff = parseFloat(String(nominalEvacuation)) / 100;

        // Stage 1: Physical Geometry
        const open_resistors = Math.max(0, total_resistors * (1 - occ_rate));
        const area_mm2 = Math.PI * Math.pow(dia_mm / 2, 2);

        // Stage 2: Thermodynamic Mass Flow Rate (compressable orifice flow)
        // ISO 6358 calculation approximation for air
        const p1 = Math.max(0.1, p1_mbar * 100); // Pa
        const p2 = Math.max(0, (p1_mbar - dP_mbar) * 100); // Pa
        const p_ratio = p2 / p1;

        const R = 287.058; // Gas constant air J/(kg*K)
        const k = 1.4; // Heat capacity ratio air
        const cr = Math.pow(2 / (k + 1), k / (k - 1)); // Critical pressure ratio ~ 0.528

        let mass_flow_kg_s = 0;
        const A_m2 = (area_mm2 * open_resistors) / 1000000;
        const Cd = 1.0; // Discharge coefficient for sharp orifice

        if (p1 > 0 && A_m2 > 0) {
            if (p_ratio <= cr) {
                // Sonic (Choked) flow
                mass_flow_kg_s = Cd * A_m2 * p1 * Math.sqrt(k / (R * T_K)) * Math.pow(2 / (k + 1), (k + 1) / (2 * (k - 1)));
            } else {
                // Subsonic flow
                mass_flow_kg_s = Cd * A_m2 * p1 * Math.sqrt((2 * k) / (R * T_K * (k - 1)) * (Math.pow(p_ratio, 2 / k) - Math.pow(p_ratio, (k + 1) / k)));
            }
        }

        const flow_gs = mass_flow_kg_s * 1000;

        // Volumetric Flow (at Standard Reference Conditions for 'NL/min')
        const rho_std = 1.1883; // Density of air at 20C, 1013mbar (kg/m3)
        const vol_flow_m3_s = mass_flow_kg_s / rho_std;
        // Schmalz applies standard to expanded volume conversions based on the vacuum level
        const pd = Math.max(1, p1_mbar - dP_mbar);
        const expansion_ratio = p1_mbar / pd;

        const flow_lmin = (vol_flow_m3_s * 60000) * expansion_ratio;
        const flow_m3h = (vol_flow_m3_s * 3600) * expansion_ratio;
        // flow_gs remains constant mass

        // Stage 3: Required Generator Capacity
        // Schmalz scales based on the pump's linear characteristic curve against the max nominal vacuum
        const eff = nom_eff > 0 ? nom_eff : 1;
        const max_vac_abs = p1_mbar * (1 - eff);
        const current_vac_abs = pd;

        // Empirically Schmalz's multiplier follows a curve loss factor derived from (P_nominal - dP)
        const linear_factor = Math.max(0.01, (p1_mbar * eff - dP_mbar) / (p1_mbar * eff));
        // There is an additional proprietary ~1.559 scaling constant empirically deduced from their models
        const schmalz_constant = 1.5595;

        const req_lmin = (flow_lmin * safety * schmalz_constant) / linear_factor;
        const req_m3h = (flow_m3h * safety * schmalz_constant) / linear_factor;
        const req_gs = (flow_gs * safety * schmalz_constant) / linear_factor;

        return {
            open_resistors: Math.ceil(open_resistors),
            area_per_resistor: area_mm2,
            flow_lmin,
            flow_m3h,
            flow_gs,
            req_lmin,
            req_m3h,
            req_gs
        };
    };

    return {
        state: {
            hoseDistMode, hoseInputDia, hoseInputDiaUnit, subHoses,
            hoseDiaMode, hoseLength, hoseLengthUnit, flowRate, flowRateUnit,
            sysPressure, sysPressureUnit, genPressure, genPressureUnit,
            altitude, altitudeUnit, nominalEvacuation,
            numResistors, resistorDia, resistorDiaUnit,
            inletPressure, inletPressureUnit, temperature, occupancyRate,
            vacuumDrop, vacuumDropUnit, genSafetyFactor
        },
        setters: {
            setHoseDistMode, setHoseInputDia, setHoseInputDiaUnit, setSubHoses,
            setHoseDiaMode, setHoseLength, setHoseLengthUnit, setFlowRate, setFlowRateUnit,
            setSysPressure, setSysPressureUnit, setGenPressure, setGenPressureUnit,
            setAltitude, setAltitudeUnit, setNominalEvacuation,
            setNumResistors, setResistorDia, setResistorDiaUnit,
            setInletPressure, setInletPressureUnit, setTemperature, setOccupancyRate,
            setVacuumDrop, setVacuumDropUnit, setGenSafetyFactor
        },
        calculations: {
            calcHoseDist, calcHoseDiameter, calcAmbientPressure,
            calcMaxAchievableVacuum, calcAtmosphere, calcAirFlowResistor,
        },
    };
};
