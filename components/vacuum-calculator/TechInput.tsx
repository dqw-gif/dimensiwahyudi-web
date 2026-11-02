import React, { useRef, useState, useEffect } from 'react';
import { Info, ChevronDown } from 'lucide-react';
import { UNITS } from '../../constants/calculatorData';

interface TechInputProps {
    label: string;
    value: number | string;
    unit?: string;
    onValueChange: (val: number) => void;
    onUnitChange?: (val: string) => void;
    unitType?: string;
    step?: number;
    disabled?: boolean;
    info?: boolean;
    max?: number;
    min?: number;
}

export const TechInput = ({ label, value, unit, onValueChange, onUnitChange, unitType, step = 1, disabled = false, info = false, max, min }: TechInputProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const clickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", clickOutside);
        return () => document.removeEventListener("mousedown", clickOutside);
    }, []);

    const options = unitType ? UNITS[unitType]?.options ?? [] : [];

    return (
        <div className="group flex flex-col gap-2 w-full">
            {label && (
                <div className="flex justify-between items-center px-1">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 group-focus-within:text-[#005596] transition-colors">
                        {label}
                    </span>
                    {info && <Info size={14} className="text-slate-400 hover:text-[#005596] cursor-help transition-colors" />}
                </div>
            )}

            <div className={`flex items-stretch h-12 sm:h-14 rounded-xl sm:rounded-2xl border transition-all duration-200 ${
                disabled 
                    ? 'bg-slate-50/80 border-slate-200 text-slate-400' 
                    : 'bg-white border-slate-200 hover:border-[#005596]/40 focus-within:border-[#005596] focus-within:ring-4 focus-within:ring-[#005596]/10 shadow-xs'
            }`}>
                <input
                    type="number"
                    step={step}
                    value={value}
                    min={min}
                    max={max}
                    disabled={disabled}
                    onChange={(e) => onValueChange(parseFloat(e.target.value) || 0)}
                    className="flex-grow w-full bg-transparent px-4 py-2 font-bold text-slate-900 text-base outline-none"
                />

                {unit !== undefined && (
                    <div className="relative border-l border-slate-100 shrink-0" ref={dropdownRef}>
                        <button
                            type="button"
                            onClick={() => !disabled && options.length > 0 && setIsOpen(!isOpen)}
                            className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 h-full font-mono font-bold text-xs sm:text-sm ${
                                disabled 
                                    ? 'text-slate-400 cursor-not-allowed' 
                                    : 'text-[#005596] hover:bg-slate-50 transition-colors'
                            }`}
                        >
                            <span>{unit}</span>
                            {options.length > 1 && (
                                <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                            )}
                        </button>

                        {isOpen && (
                            <div className="absolute top-full right-0 mt-2 w-32 sm:w-36 bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-xl rounded-xl z-[100] py-2 animate-in fade-in zoom-in-95 duration-150">
                                {options.map((opt: string) => (
                                    <button
                                        type="button"
                                        key={opt}
                                        onClick={() => { onUnitChange && onUnitChange(opt); setIsOpen(false); }}
                                        className={`w-full px-4 py-2 text-left text-xs font-mono font-bold hover:bg-blue-50/50 transition-colors ${
                                            unit === opt ? 'text-[#005596] bg-blue-50/60' : 'text-slate-600'
                                        }`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
