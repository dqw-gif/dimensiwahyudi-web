import Link from 'next/link';
import { Home, AlertTriangle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Internal Server Error | PT Dimensi Quantum Wahyudi',
  robots: 'noindex, nofollow',
};

export default function Custom500() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans select-none relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-100 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-md w-full bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10 shadow-xl shadow-slate-200/50 text-center">
        {/* Icon */}
        <div className="w-16 h-16 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center text-red-500 mx-auto mb-6">
          <AlertTriangle size={32} />
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
          System Interruption
        </h1>
        
        {/* Description */}
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
          We encountered an unexpected database or connection issue. Our technical team has been notified. Please try again shortly.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-xl inline-flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98]"
          >
            <Home size={18} />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
