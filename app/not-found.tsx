import Link from 'next/link';
import { Newspaper, Home, ArrowRight } from 'lucide-react';

export default function NotFound() {
    return (
        <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 font-sans selection:bg-blue-100 text-center">
            {/* Background Decor */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[700px] h-[700px] bg-blue-100/40 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-sky-100/40 rounded-full blur-[100px]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f080_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f080_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
            </div>

            <div className="relative z-10 max-w-lg">
                {/* 404 Number */}
                <p className="text-[9rem] md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-slate-200 to-slate-100 leading-none select-none mb-0 -mb-6">
                    404
                </p>

                {/* Icon */}
                <div className="w-20 h-20 bg-white border border-slate-200 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-slate-100">
                    <Newspaper size={36} className="text-blue-500" />
                </div>

                {/* Status */}
                <p className="text-xs font-black text-blue-500 uppercase tracking-[0.3em] mb-3">Page Not Found</p>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
                    Page Not Found
                </h1>

                {/* Description */}
                <p className="text-slate-500 text-base leading-relaxed mb-10">
                    The page you are looking for may have been moved, removed, or the URL may be incorrect.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-slate-900 text-white rounded-full font-bold text-sm hover:bg-blue-600 transition-all shadow-lg shadow-slate-900/20 hover:shadow-blue-600/30 hover:-translate-y-0.5"
                    >
                        <Home size={16} />
                        Back to Home
                    </Link>
                    <Link
                        href="/news"
                        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white border-2 border-slate-200 text-slate-700 rounded-full font-bold text-sm hover:border-slate-900 transition-all hover:-translate-y-0.5 group"
                    >
                        View Articles
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </main>
    );
}
