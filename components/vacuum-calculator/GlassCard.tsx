import React from 'react';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
}

export const GlassCard = ({ children, className = "" }: GlassCardProps) => (
    <div className={`bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] rounded-2xl sm:rounded-3xl ${className}`}>
        {children}
    </div>
);
