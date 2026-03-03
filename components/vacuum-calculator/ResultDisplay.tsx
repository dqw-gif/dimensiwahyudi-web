import React from 'react';

interface ResultDisplayProps {
    label: string;
    value: number | string;
    unit?: string;
    icon?: React.ReactNode;
    color?: 'blue' | 'orange' | 'emerald' | 'rose' | 'indigo' | 'slate';
}

const colorMap: Record<string, string> = {
    blue: "from-blue-50 text-blue-600 border-blue-100",
    orange: "from-orange-50 text-orange-600 border-orange-100",
    emerald: "from-emerald-50 text-emerald-600 border-emerald-100",
    rose: "from-rose-50 text-rose-600 border-rose-100",
    indigo: "from-indigo-50 text-indigo-600 border-indigo-100",
    slate: "from-slate-100 text-slate-600 border-slate-200"
};

export const ResultDisplay = ({ label, value, unit, icon, color = "blue" }: ResultDisplayProps) => {
    return (
        <div className="flex flex-col items-center p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-white border border-slate-200 shadow-lg shadow-slate-200/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group overflow-hidden relative">
            <div className={`absolute inset-0 bg-gradient-to-b ${(colorMap[color] || colorMap['blue']).split(' ')[0]} to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            <div className={`relative z-10 p-4 md:p-5 rounded-2xl md:rounded-[2rem] mb-6 md:mb-8 bg-slate-50 ${(colorMap[color] || colorMap['blue']).split(' ')[1]} group-hover:bg-white group-hover:shadow-md transition-all duration-500`}>
                {icon}
            </div>
            <div className="relative z-10 flex items-baseline gap-2 text-center flex-wrap justify-center">
                <span className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter tabular-nums leading-none">
                    {value}
                </span>
                <span className={`text-xl md:text-2xl font-black ${(colorMap[color] || colorMap['blue']).split(' ')[1]} uppercase tracking-tighter`}>
                    {unit}
                </span>
            </div>
            <p className="relative z-10 mt-4 md:mt-6 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-slate-400 text-center leading-relaxed max-w-[250px]">
                {label}
            </p>
        </div>
    );
};
