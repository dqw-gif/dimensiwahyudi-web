'use client';

import { Globe } from 'lucide-react';

export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? 'flex items-center gap-2' : 'flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-1'}>
      <Globe size={compact ? 16 : 14} className="text-slate-500" />
      <span className="rounded-full bg-slate-900 text-white px-2 py-1 text-[11px] font-bold tracking-wide">
        EN
      </span>
    </div>
  );
}
