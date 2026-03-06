'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Award, Target, Users } from 'lucide-react';

/* ─── Hero Fade-in ─── */
export function AboutHero() {
    return (
        <div className="relative z-10 text-center px-6 max-w-4xl">
            <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-cyan-600 font-bold tracking-widest text-sm uppercase mb-4 block"
            >
                Membangun Standar Baru Sejak 2012
            </motion.span>
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight tracking-tight"
            >
                Solusi Cerdas untuk <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                    Produktivitas Industri
                </span>
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
            >
                PT Dimensi Quantum Wahyudi (DQW) adalah mitra strategis spesialis Material Handling & Otomasi Industri yang berfokus pada keselamatan kerja dan efisiensi operasional.
            </motion.p>
        </div>
    );
}

/* ─── Story Section ─── */
export function AboutStoryImage() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[500px] rounded-2xl overflow-hidden border border-slate-200 group shadow-2xl shadow-slate-200/50"
        >
            <Image
                src="https://i.imgur.com/M39qASX.jpeg" // Ganti URL ini untuk gambar "Transformasi Operasional"
                alt="PT Dimensi Quantum Wahyudi Professional Team"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md border border-slate-200 p-6 rounded-xl shadow-xl">
                <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-3">Partner Resmi</p>
                <div className="flex items-center gap-6">
                    <Image
                        src="/brands/schmalz.png"
                        alt="Schmalz Germany"
                        width={120}
                        height={40}
                        className="object-contain"
                    />
                    <div className="w-px h-8 bg-slate-200"></div>
                    <Image
                        src="/brands/binar.png"
                        alt="Binar Sweden"
                        width={100}
                        height={40}
                        className="object-contain"
                    />
                </div>
            </div>
        </motion.div>
    );
}

/* ─── Vision & Mission ─── */
const values = [
    {
        icon: <Target className="w-8 h-8" />,
        title: 'Visi Kami',
        color: 'blue',
        desc: 'Menjadi penyedia Sistem Otomasi Vakum dan Handling Ergonomis yang unggul dalam produk maupun layanan dari semua kompetitor, serta terus meningkatkan nilai tambah bagi pelanggan di Indonesia.',
        bgImage: 'https://dimensiwahyudi.com/wp-content/uploads/2025/11/pameran-allpack-indonesia-2025-dqw-dukung-industri-manufaktur-berkelanjutan-jsn.webp' // Modern factory/tech image
    },
    {
        icon: <Users className="w-8 h-8" />,
        title: 'Misi Kami',
        color: 'cyan',
        desc: 'Terus menemukan, mengembangkan, dan menyediakan solusi Sistem Otomasi Vakum dan Handling Ergonomis yang inovatif demi kepuasan pelanggan, serta memberikan nilai tinggi bagi mereka yang berinvestasi pada ide dan kontribusi positif di perusahaan.',
        bgImage: 'https://dimensiwahyudi.com/wp-content/uploads/2025/05/0509_24-scaled.jpg' // Team collaboration image
    }
];

export function AboutCoreValues() {
    return (
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((item, i) => (
                <div key={i} className="bg-white border border-slate-200 p-10 rounded-3xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group shadow-lg flex flex-col items-center text-center relative overflow-hidden">
                    {/* Background Image that fades in on hover */}
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ backgroundImage: `url(${item.bgImage})` }}
                    />

                    {/* Dark overlay when image is showing to make text readable */}
                    <div className={`absolute inset-0 bg-slate-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                    {/* Top gradient accent */}
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-500"></div>

                    {/* Content (Z-10 so it stays above the background image and overlay) */}
                    <div className={`relative z-10 w-20 h-20 bg-${item.color}-50 rounded-2xl flex items-center justify-center text-${item.color}-600 mb-8 group-hover:bg-transparent group-hover:text-white transition-all shadow-sm border border-${item.color}-100 group-hover:border-transparent scale-100 group-hover:scale-110 duration-500`}>
                        {item.icon}
                    </div>

                    <h3 className="relative z-10 text-2xl font-black text-slate-900 mb-4 group-hover:text-white transition-colors duration-500">
                        {item.title}
                    </h3>

                    <p className="relative z-10 text-slate-600 leading-relaxed text-base group-hover:text-slate-200 transition-colors duration-500">
                        {item.desc}
                    </p>
                </div>
            ))}
        </div>
    );
}

/* ─── Process Steps ─── */
const steps = [
    { step: '01', title: 'Audit Lapangan (Site Visit)', desc: 'Engineering kami melakukan survei langsung untuk memetakan alur produksi dan batasan teknis area kerja.' },
    { step: '02', title: 'Analisa Ergonomi', desc: 'Mengkaji beban angkat dan postur operator guna menentukan perangkat yang paling tepat memitigasi cedera.' },
    { step: '03', title: 'Desain Sistem Kustom', desc: 'Proses engineering untuk menyesuaikan konfigurasi sistem lifting dengan kebutuhan spesifik operasional Anda.' },
    { step: '04', title: 'Instalasi & Sertifikasi', desc: 'Pemasangan oleh teknisi ahli serta pelatihan komprehensif untuk menjamin penggunaan yang aman dan efisien.' },
];

export function AboutProcess() {
    return (
        <div className="space-y-10">
            {steps.map((item, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-6 group items-start"
                >
                    <span className="text-4xl font-black text-slate-100 group-hover:text-cyan-400 transition-colors duration-300 shrink-0">
                        {item.step}
                    </span>
                    <div className="pt-1">
                        <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{item.title}</h4>
                        <p className="text-slate-500 leading-relaxed text-sm">{item.desc}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

/* ─── Process Image ─── */
export function AboutProcessImage() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[550px] bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden flex items-center justify-center p-12 shadow-inner"
        >
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
            <div className="relative z-10 text-center group">
                <Image
                    src="https://i.imgur.com/N3cXzid.jpeg" // Ganti URL ini untuk gambar "Metodologi Kerja"
                    alt="Precision Engineering Plan and Blueprint"
                    width={450}
                    height={350}
                    className="rounded-xl shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700 rotate-2 group-hover:rotate-0"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg border border-slate-100 max-w-[180px] text-left">
                    <p className="text-[10px] uppercase font-bold text-cyan-600 mb-1">Expertise</p>
                    <p className="text-[11px] leading-snug text-slate-500 font-medium italic">&quot;Presisi bukan sekadar angka, tapi jaminan keselamatan operasional.&quot;</p>
                </div>
            </div>
        </motion.div>
    );
}

/* ─── Client Logos ─── */
const projectLogos = [
    "PT Angkasa Pura II.jpg",
    "PT Asahimas Flat Glass Tbk.jpeg",
    "PT Astra Daihatsu Motor.jpg",
    "PT Bredero.jpg",
    "PT Cabot Indonesia.png",
    "PT Delifood.jpg",
    "PT Diageo Indonesia.jpg",
    "PT Elang Perdana Tyre.jpg",
    "PT GS Battery.jpg",
    "PT Gajah Tunggal (1).jpg",
    "PT Gajah Tunggal (2).jpg",
    "PT Gajah Tunggal.jpg",
    "PT Garuda Food.jpg",
    "PT HOKKAN INDONESIA.jpg",
    "PT Hempel Indonesia.jpg",
    "PT Industrial Robotic Automation.jpg",
    "PT Inoac.jpg",
    "PT Kalbe Morinaga.jpg",
    "PT Kayu Permata.png",
    "PT Kian Mulia Manunggal.jpg",
    "PT Mayora Indah.jpeg",
    "PT Meiji Food Indonesia.jpg",
    "PT Mortar Utama.jpg",
    "PT Mowilex Indonesia.jpg",
    "PT Multi Bintang Indonesia Tbk.png",
    "PT NESTLE.jpg",
    "PT Nutribev Nabati Indonesia.jpg",
    "PT Nutrifood Indonesia.jpeg",
    "PT Nutrifood Indonesia.jpg",
    "PT Otsuka Indonesia.jpeg",
    "PT Rinnai.jpg",
    "PT Sarihusada Generasi Mahardhika.jpg",
    "PT Sri Trang Lingga.jpg",
    "PT Sugity.jpg",
    "PT Summy Rubber.jpg",
    "PT Suryaraya Rubber.jpg",
    "PT Taco Anugrah Corporindo.jpg",
    "PT URC Indonesia.jpg",
    "PT Unilever Indonesia Tbk.jpeg",
    "PT YKK AP.jpg",
    "PT Yakult Indonesia Persada.jpg",
    "PT. DSM Firmenich Aromatics.jpg",
    "PT. Evoluzione Tyre.jpg",
    "PT. Federal Karyatama.jpg",
    "PT. Fukusuke Kogyo Indonesia.png",
    "PT. Indofood CBP Sukses.jpg",
    "PT. Indonesia Nikka Chemicals.jpg",
    "PT. Mars Symbiocince.jpg",
    "PT. Mura Maha Agung.jpg",
    "PT. Nufarm.jpg",
    "PT. Sakae Riken Indonesia.jpg",
    "PT. Suntory Garuda.png",
    "PT. Suryaraya Rubberindo.jpg"
];

export function AboutClientLogos() {
    const defaultLogos = [1, 2, 3, 4, 5, 6, 7, 8].map(num => ({
        id: `default-${num}`,
        src: `/logos/client(${num}).svg`,
        alt: `Client partner ${num}`
    }));

    const newLogos = projectLogos.map((filename, i) => ({
        id: `project-${i}`,
        src: `/projects/${encodeURI(filename)}`,
        alt: filename.replace(/\.[^/.]+$/, "")
    }));

    const allLogos = [...defaultLogos, ...newLogos];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center px-4">
            {allLogos.map((logo, index) => (
                <motion.div
                    key={logo.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (index % 8) * 0.08, duration: 0.5 }}
                    whileHover={{ scale: 1.15 }}
                    className="relative h-14 w-full flex justify-center group"
                >
                    <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={140}
                        height={70}
                        className="object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 max-h-14"
                    />
                </motion.div>
            ))}
        </div>
    );
}
