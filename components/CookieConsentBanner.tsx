'use client';

import { useEffect, useState } from 'react';
import { readConsentChoice, writeConsentChoice } from '@/lib/consent';

type ConsentState = 'loading' | 'pending' | 'done';

export default function CookieConsentBanner() {
  const [state, setState] = useState<ConsentState>('loading');

  useEffect(() => {
    const currentChoice = readConsentChoice();
    setState(currentChoice ? 'done' : 'pending');
  }, []);

  const handleChoice = (choice: 'accepted' | 'rejected') => {
    writeConsentChoice(choice);
    setState('done');
  };

  if (state !== 'pending') {
    return null;
  }

  return (
    <aside className="fixed inset-x-0 bottom-0 z-[120] border-t border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p className="max-w-3xl text-sm leading-relaxed text-slate-700">
          We use essential cookies for site functionality and optional analytics cookies to improve performance.
          You can accept or reject analytics cookies.
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => handleChoice('rejected')}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => handleChoice('accepted')}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Accept
          </button>
        </div>
      </div>
    </aside>
  );
}
