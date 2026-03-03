import { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, MapPin, Clock, ChevronRight, Send } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Karir | Bergabung dengan Tim PT Dimensi Quantum Wahyudi',
    description: 'Bergabunglah dengan tim PT Dimensi Quantum Wahyudi. Kami mencari engineer, sales, dan technical specialist yang passionate di bidang material handling & otomasi industri Indonesia.',
    keywords: ['lowongan kerja PT Dimensi Quantum Wahyudi', 'karir material handling', 'loker engineer Bekasi', 'PT Dimensi Quantum Wahyudi career'],
    openGraph: {
        title: 'Karir di PT Dimensi Quantum Wahyudi | Bergabung dengan Tim Kami',
        description: 'Bergabunglah dengan tim PT Dimensi Quantum Wahyudi. Kami mencari talenta terbaik di bidang material handling & otomasi industri.',
        url: 'https://dimensiwahyudi.com/career',
    },
    alternates: { canonical: 'https://dimensiwahyudi.com/career' },
};

const openings = [
    {
        title: 'Technical Sales Engineer',
        type: 'Full Time',
        location: 'Bekasi, Jawa Barat',
        desc: 'Melakukan presentasi solusi teknis kepada klien industri, analisa kebutuhan material handling, dan mengembangkan hubungan bisnis jangka panjang.',
        requirements: ['S1 Teknik Mesin / Industri / Elektro', 'Pengalaman sales industri 2+ tahun', 'Kemampuan presentasi teknis yang baik', 'Memiliki kendaraan pribadi'],
    },
    {
        title: 'Field Service Technician',
        type: 'Full Time',
        location: 'Bekasi (mobility ke klien)',
        desc: 'Melakukan instalasi, commissioning, dan perawatan berkala sistem vakum & lifting equipment di fasilitas klien di seluruh Pulau Jawa.',
        requirements: ['D3/S1 Teknik Mesin / Elektro', 'Pengalaman maintenance alat industri', 'Bersedia mobile ke lokasi klien', 'Memiliki SIM A/C'],
    },
    {
        title: 'Application Engineer',
        type: 'Full Time',
        location: 'Bekasi, Jawa Barat',
        desc: 'Menganalisa kebutuhan teknis klien, merancang solusi sistem lifting/vacuum yang tepat, dan mendukung tim sales dengan kalkulasi teknis yang akurat.',
        requirements: ['S1 Teknik Mesin / Industri', 'Familiar dengan AutoCAD atau SolidWorks', 'Kemampuan analitis dan problem-solving', 'Pengalaman 1+ tahun di bidang engineering'],
    },
];

const benefits = [
    'Gaji kompetitif + insentif prestasi',
    'Asuransi kesehatan BPJS + tambahan',
    'Training teknis dari prinsipal Schmalz & Binar di Jerman/Swedia',
    'Laptop & alat kerja disediakan',
    'Lingkungan kerja profesional & kolaboratif',
    'Jenjang karir yang jelas',
];

export default function CareerPage() {
    return (
        <main className="min-h-screen bg-white">

            {/* HERO */}
            <section className="relative pt-32 pb-20 bg-slate-950 overflow-hidden">
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'linear-gradient(rgba(37,99,235,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.4) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
                <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(37,99,235,0.2) 0%, transparent 70%)' }} />

                <div className="relative max-w-4xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <Briefcase size={11} /> Bergabung dengan Kami
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-6">
                        Bangun Karir di{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                            Industri Terdepan
                        </span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        PT Dimensi Quantum Wahyudi adalah tempat di mana engineer bertemu bisnis. Kami menghadirkan teknologi Eropa ke industri Indonesia — dan kami butuh talenta terbaik untuk melakukannya.
                    </p>
                </div>
            </section>

            {/* BENEFITS */}
            <section className="py-16 bg-blue-600">
                <div className="max-w-5xl mx-auto px-6">
                    <p className="text-blue-200 text-xs font-bold uppercase tracking-widest text-center mb-8">Mengapa Bergabung dengan DQW?</p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {benefits.map((b, i) => (
                            <div key={i} className="flex items-start gap-3 bg-white/10 rounded-xl px-4 py-3">
                                <ChevronRight size={16} className="text-cyan-300 shrink-0 mt-0.5" />
                                <span className="text-white text-sm font-medium">{b}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* JOB OPENINGS */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black text-slate-900 mb-2">Posisi Terbuka</h2>
                        <p className="text-slate-500">Semua posisi berbasis di Bekasi, Jawa Barat.</p>
                    </div>
                    <div className="space-y-6">
                        {openings.map((job, i) => (
                            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-8 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                                    <div>
                                        <h3 className="text-xl font-black text-slate-900">{job.title}</h3>
                                        <div className="flex items-center gap-4 mt-2 flex-wrap">
                                            <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                                                <Clock size={13} /> {job.type}
                                            </span>
                                            <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                                                <MapPin size={13} /> {job.location}
                                            </span>
                                        </div>
                                    </div>
                                    <a
                                        href={`mailto:hr@dimensiwahyudi.com?subject=Lamaran: ${job.title}`}
                                        className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm transition-colors"
                                    >
                                        <Send size={14} /> Lamar Sekarang
                                    </a>
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed mb-4">{job.desc}</p>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Kualifikasi:</p>
                                    <ul className="space-y-1">
                                        {job.requirements.map((req, j) => (
                                            <li key={j} className="flex items-center gap-2 text-slate-600 text-sm">
                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                                                {req}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* GENERAL APPLICATION CTA */}
            <section className="py-16 bg-white border-t border-slate-100">
                <div className="max-w-2xl mx-auto px-6 text-center">
                    <h2 className="text-2xl font-black text-slate-900 mb-3">Tidak Ada Posisi yang Sesuai?</h2>
                    <p className="text-slate-500 mb-8">Kirim CV dan portfolio kamu ke tim HR kami. Kami selalu terbuka untuk talenta luar biasa.</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="mailto:hr@dimensiwahyudi.com?subject=Lamaran Umum — PT Dimensi Quantum Wahyudi"
                            className="flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors"
                        >
                            <Send size={16} /> Kirim CV ke HR
                        </a>
                        <Link href="/contact" className="flex items-center gap-2 px-8 py-3.5 border border-slate-200 hover:border-blue-300 text-slate-700 font-bold rounded-xl transition-colors">
                            Hubungi Kami
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
