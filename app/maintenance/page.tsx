import { Metadata } from 'next';
import { Settings } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Under Maintenance | PT Dimensi Quantum Wahyudi',
    description: 'Our system is currently undergoing scheduled service improvements.',
    robots: { index: false, follow: false },
};

export default function MaintenancePage() {
    return (
        <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute inset-0 bg-[url('https://i.imgur.com/iSGtXzt.jpeg')] bg-cover bg-center opacity-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-950"></div>

            <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8">
                <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
                    <div className="absolute inset-0 border-t-2 border-r-2 border-cyan-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-2 border-b-2 border-l-2 border-blue-500 rounded-full animate-[spin_3s_linear_reverse]"></div>
                    <Settings className="w-10 h-10 text-cyan-400 mx-auto animate-pulse" />
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
                    Website Under <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                        Maintenance
                    </span>
                </h1>

                <p className="text-lg md:text-xl text-slate-300 max-w-xl mx-auto leading-relaxed font-light">
                    We are currently performing service upgrades to deliver a better experience for your team.
                </p>

                <div className="pt-8">
                    <p className="text-sm text-slate-500 uppercase tracking-widest font-bold mb-4">
                        Need urgent support?
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                            href="mailto:info@dimensiwahyudi.com"
                            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 transition-colors text-white font-semibold rounded-lg shadow-lg shadow-blue-600/20"
                        >
                            Email Us
                        </a>
                        <a
                            href="https://wa.me/6281119168752"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-3 bg-transparent border border-cyan-500/30 hover:bg-cyan-500/10 text-cyan-400 transition-all font-semibold rounded-lg"
                        >
                            Contact via WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
