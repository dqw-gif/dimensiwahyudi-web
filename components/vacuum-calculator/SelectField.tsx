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
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative w-full" ref={ref}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full h-12 sm:h-14 border border-slate-200 rounded-xl sm:rounded-2xl flex flex-col items-start justify-center px-4 bg-white hover:border-[#005596]/40 focus:border-[#005596] focus:ring-4 focus:ring-[#005596]/10 transition-all duration-200 relative shadow-xs"
            >
                <span className="absolute top-2 left-4 text-[9px] text-slate-400 uppercase tracking-wider font-mono font-bold pointer-events-none">
                    {label}
                </span>
                <span className="pt-3 font-bold text-slate-900 text-sm truncate w-full text-left">
                    {value}
                </span>
                <ChevronDown size={16} className={`absolute right-4 top-1/2 mt-1 -translate-y-1/2 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#005596]' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-xl shadow-xl z-[100] py-2 animate-in fade-in zoom-in-95 duration-150">
                    {options.map((opt: string) => (
                        <button
                            type="button"
                            key={opt}
                            onClick={() => { onChange(opt); setIsOpen(false); }}
                            className={`w-full px-4 py-2.5 text-xs text-left font-bold transition-colors ${
                                value === opt ? 'text-[#005596] bg-blue-50/60' : 'text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
