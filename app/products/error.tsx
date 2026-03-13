'use client';

import { useEffect } from 'react';

interface ErrorBoundaryProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function ProductsError({ error, reset }: ErrorBoundaryProps) {
    useEffect(() => {
        console.error('[Products Error Boundary]', error);
    }, [error]);

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-6">
            <div className="max-w-md w-full text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 3a9 9 0 110 18A9 9 0 0112 3z" />
                    </svg>
                </div>
                <h1 className="text-2xl font-black text-slate-900 mb-2">Unable to Load This Page</h1>
                <p className="text-slate-500 mb-8 text-sm leading-relaxed">
                    There was an error loading product data. Please try again, or contact us if the issue continues.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={reset}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors"
                    >
                        Try Again
                    </button>
                    <a
                        href="/contact"
                        className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors"
                    >
                        Contact Us
                    </a>
                </div>
                {process.env.NODE_ENV === 'development' && (
                    <details className="mt-8 text-left bg-red-50 border border-red-200 rounded-xl p-4">
                        <summary className="text-red-700 text-xs font-bold cursor-pointer">Error Detail (dev only)</summary>
                        <pre className="text-xs text-red-600 mt-2 overflow-auto">{error.message}</pre>
                    </details>
                )}
            </div>
        </div>
    );
}
