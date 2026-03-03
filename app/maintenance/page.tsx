import { Metadata } from 'next';
import { Settings } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Sedang Dalam Pemeliharaan | PT Dimensi Quantum Wahyudi',
    description: 'Sistem sedang dalam proses peningkatan layanan (Maintenance).',
    robots: { index: false, follow: false }, // Jangan di-index oleh Google selama maintenance
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
                    Website Sedang Dalam <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                        Pemeliharaan
                    </span>
                </h1>

                <p className="text-lg md:text-xl text-slate-300 max-w-xl mx-auto leading-relaxed font-light">
                    Kami sedang melakukan peningkatan sistem dan pembaruan layanan untuk memberikan pengalaman yang lebih baik bagi Anda.
                </p>

                <div className="pt-8">
                    <p className="text-sm text-slate-500 uppercase tracking-widest font-bold mb-4">
                        Butuh bantuan mendesak?
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                            href="mailto:info@dimensiwahyudi.com"
                            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 transition-colors text-white font-semibold rounded-lg shadow-lg shadow-blue-600/20"
                        >
                            Email Kami
                        </a>
                        <a
                            href="https://wa.me/628123456789" // Ganti dengan nomor asli
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-3 bg-transparent border border-cyan-500/30 hover:bg-cyan-500/10 text-cyan-400 transition-all font-semibold rounded-lg"
                        >
                            Hubungi WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
