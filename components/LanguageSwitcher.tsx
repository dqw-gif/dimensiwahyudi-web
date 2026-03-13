'use client';

import { Globe } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLanguage();

  return (
    <div className={compact ? 'flex items-center gap-2' : 'flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-1'}>
      <Globe size={compact ? 16 : 14} className="text-slate-500" />
      <button
        type="button"
        onClick={() => setLang('id')}
        className={[
          'rounded-full px-2 py-1 text-[11px] font-bold tracking-wide transition-colors',
          lang === 'id' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900',
        ].join(' ')}
      >
        ID
      </button>
      <button
        type="button"
        onClick={() => setLang('en')}
        className={[
          'rounded-full px-2 py-1 text-[11px] font-bold tracking-wide transition-colors',
          lang === 'en' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900',
        ].join(' ')}
      >
        EN
      </button>
    </div>
  );
}
