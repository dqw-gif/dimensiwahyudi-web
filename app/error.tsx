'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, Home } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log to error reporting service in production
        console.error('Application Error:', error);
    }, [error]);

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 font-sans selection:bg-blue-100">
            {/* Background Decor */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-50 rounded-full blur-[120px] opacity-60"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[100px] opacity-60"></div>
            </div>

            <div className="relative z-10 text-center max-w-lg">
                {/* Error Icon */}
                <div className="w-24 h-24 bg-red-50 border-2 border-red-100 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-red-50">
                    <svg className="w-12 h-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                </div>

                {/* Status Code */}
                <p className="text-xs font-black text-red-400 uppercase tracking-[0.3em] mb-3">System Error</p>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                    Something Went Wrong
                </h1>

                {/* Description */}
                <p className="text-slate-500 text-lg mb-2 leading-relaxed">
                    An unexpected error occurred. Our team has been notified.
                </p>
                {process.env.NODE_ENV === 'development' && (
                    <p className="text-xs text-red-400 font-mono bg-red-50 px-4 py-2 rounded-xl mb-8 text-left break-all border border-red-100">
                        {error.message}
                    </p>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                    <button
                        onClick={reset}
                        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-blue-600 text-white rounded-full font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5"
                    >
                        <RefreshCw size={16} />
                        Try Again
                    </button>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white border-2 border-slate-200 text-slate-700 rounded-full font-bold text-sm hover:border-slate-900 transition-all hover:-translate-y-0.5"
                    >
                        <Home size={16} />
                        Back to Home
                    </Link>
                </div>
            </div>
        </main>
    );
}
