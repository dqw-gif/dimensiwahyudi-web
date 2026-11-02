import React from 'react';

interface ResultDisplayProps {
    label: string;
    value: number | string;
    unit?: string;
    icon?: React.ReactNode;
    color?: 'blue' | 'orange' | 'emerald' | 'rose' | 'indigo' | 'slate';
}

const colorMap: Record<string, { text: string; bg: string; border: string }> = {
    blue: { text: "text-[#005596]", bg: "from-blue-50/60", border: "border-[#005596]/20" },
    orange: { text: "text-amber-600", bg: "from-amber-50/60", border: "border-amber-200" },
    emerald: { text: "text-emerald-600", bg: "from-emerald-50/60", border: "border-emerald-200" },
    rose: { text: "text-rose-600", bg: "from-rose-50/60", border: "border-rose-200" },
    indigo: { text: "text-[#1d4ed8]", bg: "from-blue-50/60", border: "border-blue-200" },
    slate: { text: "text-slate-700", bg: "from-slate-100/60", border: "border-slate-200" }
};

export const ResultDisplay = ({ label, value, unit, icon, color = "blue" }: ResultDisplayProps) => {
    const theme = colorMap[color] || colorMap['blue'];

    return (
        <div className="flex flex-col items-center p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-white/90 backdrop-blur-xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] transition-all duration-300 hover:shadow-[0_20px_45px_rgba(0,85,150,0.12)] hover:-translate-y-1 group overflow-hidden relative">
            <div className={`absolute inset-0 bg-gradient-to-b ${theme.bg} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
            
            {icon && (
                <div className={`relative z-10 p-3.5 sm:p-4 rounded-2xl mb-4 sm:mb-6 bg-slate-50 border border-slate-100 ${theme.text} group-hover:bg-white group-hover:shadow-sm transition-all duration-300`}>
                    {icon}
                </div>
            )}
            
            <div className="relative z-10 flex items-baseline gap-2 text-center flex-wrap justify-center">
                <span className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight tabular-nums leading-none">
                    {value}
                </span>
                {unit && (
                    <span className={`text-base sm:text-xl font-bold ${theme.text} uppercase tracking-tight`}>
                        {unit}
                    </span>
                )}
            </div>
            
            <p className="relative z-10 mt-3 sm:mt-4 text-xs font-mono font-bold uppercase tracking-wider text-slate-500 text-center leading-relaxed max-w-[280px]">
                {label}
            </p>
        </div>
    );
};
