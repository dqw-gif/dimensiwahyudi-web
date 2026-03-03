import { useState } from 'react';
import { useForceCalculations } from './useForceCalculations';
import { useEvacuationCalc } from './useEvacuationCalc';
import { useHoseCalc } from './useHoseCalc';

/**
 * Orchestrator hook for the Vacuum Calculator.
 * Composes three focused sub-hooks and exposes a unified API.
 * The public shape (state / setters / calculations) is identical to the
 * original monolith, so VacuumCalculator.tsx requires no changes.
 */
export const useVacuumCalculator = () => {
    const [currentView, setCurrentView] = useState('dashboard');

    // Sub-hook 1 — Force, area, cup & diameter calculations
    const force = useForceCalculations();

    // Sub-hook 2 — Evacuation time & suction capacity (needs vacuum from force hook)
    const evac = useEvacuationCalc(
        force.getSI,
        force.state.vacuum,
        force.state.vacuumUnit,
    );

    // Sub-hook 3 — Hose sizing, altitude, resistor (needs pump capacity from evac hook)
    const hose = useHoseCalc(
        force.getSI,
        evac.state.pumpCapacity,
        evac.state.pumpCapacityUnit,
    );

    return {
        state: {
            currentView,
            ...force.state,
            ...evac.state,
            ...hose.state,
        },
        setters: {
            setCurrentView,
            ...force.setters,
            ...evac.setters,
            ...hose.setters,
        },
        calculations: {
            ...force.calculations,
            ...evac.calculations,
            ...hose.calculations,
        },
    };
};
