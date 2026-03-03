import React, { useRef, useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectFieldProps {
    label: string;
    value: string;
    options: string[];
    onChange: (val: string) => void;
}

export const SelectField = ({ label, value, options, onChange }: SelectFieldProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current instanceof HTMLElement && !ref.current.contains(event.target as Node)) setIsOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative w-full" ref={ref}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full h-14 md:h-16 border-2 border-slate-200 rounded-2xl md:rounded-[1.25rem] flex flex-col items-start justify-center px-4 md:px-5 bg-white hover:border-blue-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-50/50 transition-all duration-300 relative shadow-sm"
            >
                <span className="absolute top-2 left-4 md:left-5 text-[9px] md:text-[10px] text-slate-400 uppercase tracking-wider font-bold pointer-events-none">
                    {label}
                </span>
                <span className="pt-3 font-black text-slate-800 text-sm md:text-base truncate w-full text-left">
                    {value}
                </span>
                <ChevronDown size={16} className={`absolute right-4 md:right-5 top-1/2 mt-1 -translate-y-1/2 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-slate-100 rounded-xl md:rounded-[1.25rem] shadow-2xl z-[100] py-3 md:py-3 animate-in fade-in zoom-in-95 duration-150">
                    {options.map((opt: string) => (
                        <div
                            key={opt}
                            onClick={() => { onChange(opt); setIsOpen(false); }}
                            className={`px-5 md:px-5 py-3 md:py-2.5 text-xs md:text-sm font-bold cursor-pointer transition-colors ${value === opt ? 'text-blue-700 bg-blue-50' : 'text-slate-500 hover:bg-slate-50'}`}
                        >
                            {opt}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
