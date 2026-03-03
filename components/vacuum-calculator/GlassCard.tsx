import React from 'react';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
}

export const GlassCard = ({ children, className = "" }: GlassCardProps) => (
    <div className={`bg-white/95 backdrop-blur-2xl border border-slate-200/60 shadow-xl shadow-slate-200/40 rounded-[2.5rem] ${className}`}>
        {children}
    </div>
);
