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
    const dropdownRef = useRef(null);

    useEffect(() => {
        const clickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && (dropdownRef.current as HTMLElement).contains && !(dropdownRef.current as HTMLElement).contains(e.target as Node)) setIsOpen(false);
        };
        document.addEventListener("mousedown", clickOutside);
        return () => document.removeEventListener("mousedown", clickOutside);
    }, []);

    const options = unitType ? UNITS[unitType]?.options ?? [] : [];

    return (
        <div className="group flex flex-col gap-2 w-full">
            <div className="flex justify-between items-center px-1">
                <span className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    {label}
                </span>
                {info && <Info size={14} className="text-slate-300 hover:text-blue-500 cursor-help" />}
            </div>

            <div className={`flex items-stretch h-14 md:h-16 rounded-2xl md:rounded-[1.25rem] border-2 transition-all duration-300 ${disabled ? 'bg-slate-50 border-slate-100' : 'bg-white border-slate-200 hover:border-blue-300 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-50/50 shadow-sm'}`}>
                <input
                    type="number"
                    step={step}
                    value={value}
                    min={min}
                    max={max}
                    disabled={disabled}
                    onChange={(e) => onValueChange(parseFloat(e.target.value) || 0)}
                    className="flex-grow w-full bg-transparent px-4 py-2 md:px-5 font-black text-slate-800 text-base md:text-lg outline-none"
                />

                {unit !== undefined && (
                    <div className="relative border-l-2 border-slate-100 shrink-0" ref={dropdownRef}>
                        <button
                            onClick={() => !disabled && options.length > 0 && setIsOpen(!isOpen)}
                            className={`flex items-center gap-2 px-4 py-2 md:px-5 h-full font-bold text-xs md:text-sm ${disabled ? 'text-slate-400' : 'text-blue-600 hover:bg-blue-50/50'}`}
                        >
                            {unit}
                            {options.length > 1 && <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />}
                        </button>

                        {isOpen && (
                            <div className="absolute top-full right-0 mt-3 w-32 md:w-40 bg-white border border-slate-100 shadow-2xl rounded-xl md:rounded-[1.25rem] z-[100] py-3 md:py-3 animate-in fade-in zoom-in-95 duration-150">
                                {options.map((opt: string) => (
                                    <button
                                        key={opt}
                                        onClick={() => { onUnitChange && onUnitChange(opt); setIsOpen(false); }}
                                        className={`w-full px-5 md:px-5 py-3 md:py-2.5 text-left text-xs font-bold hover:bg-blue-50 transition-colors ${unit === opt ? 'text-blue-700 bg-blue-50' : 'text-slate-500'}`}
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
