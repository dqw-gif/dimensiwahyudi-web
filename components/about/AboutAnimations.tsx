'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Award, Target, Users, Factory, Truck, Box, Sofa, FlaskConical, Monitor, Hammer, ChevronDown } from 'lucide-react';

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

/* ─── Client Logos ─── */
const projectLogos = [
    { "client": "PT Mayora Indah", "industry": "FMCG & F&B", "logo": "https://www.mayoraindah.co.id/assets/frontend/images/logo.png" },
    { "client": "PT Gajah Tunggal", "industry": "Otomotif & Kendaraan", "logo": "https://www.gt-tires.com/wp-content/themes/gajahtunggal/images/corporate_logo.png" },
    { "client": "PT Angkasa Pura II", "industry": "Logistik Udara", "logo": "https://upload.wikimedia.org/wikipedia/id/thumb/a/a6/Angkasa_Pura_II_logo_2014.svg/3840px-Angkasa_Pura_II_logo_2014.svg.png" },
    { "client": "PT Asahimas Flat Glass Tbk", "industry": "Kaca & Material Solid", "logo": "https://upload.wikimedia.org/wikipedia/commons/d/d6/Logo_Asahimas_Flat_Glass_Tbk.png" },
    { "client": "PT Unilever Indonesia Tbk", "industry": "FMCG & F&B", "logo": "https://upload.wikimedia.org/wikipedia/id/3/37/Unilever.png" },
    { "client": "PT. Indonesia Nikka Chemicals", "industry": "Kimia & Farmasi", "logo": "https://img2.lokercepat.id/files/2023-11-11/pt-indonesia-nikka-chemicals-inkali-382.jpg" },
    { "client": "PT GS Battery", "industry": "Otomotif & Kendaraan", "logo": "https://www.gs.astra.co.id/media/dzpc02gq/gs-battery-logo.png" },
    { "client": "PT Nestle Indonesia", "industry": "FMCG & F&B", "logo": "https://www.nestle.co.id/themes/custom/da_vinci_code/logo.svg" },
    { "client": "PT Hokkan Indonesia", "industry": "Kemasan & Plastik", "logo": "https://www.hokkan.co.id/images/logo.jpg" },
    { "client": "PT Taco Anugrah Corporindo", "industry": "Furnitur & Interior", "logo": "https://manage.taco.co.id/asset-images/logo.svg" },
    { "client": "PT Otsuka Indonesia", "industry": "Kimia & Farmasi", "logo": "https://www.otsuka.co.id/themes/otsuka/assets/img/otsuka.png" },
    { "client": "PT Mowilex Indonesia", "industry": "Kimia & Farmasi", "logo": "https://mowilex.com/wp-content/themes/movi/images/MowilexPremiumPaints.webp" },
    { "client": "PT Yakult Indonesia Persada", "industry": "FMCG & F&B", "logo": "https://upload.wikimedia.org/wikipedia/commons/f/f9/Yakult-Logo.svg" },
    { "client": "PT Nutrifood Indonesia", "industry": "FMCG & F&B", "logo": "https://www.nutrifood.co.id/wp-content/themes/nutrifood/images/logo-nutrifood.png" },
    { "client": "PT Nutribev Nabati Indonesia", "industry": "FMCG & F&B", "logo": "https://www.nabatisnack.co.id/assets/icons/ic-nabati.png" },
    { "client": "PT Cabot Indonesia", "industry": "Kimia & Farmasi", "logo": "https://companieslogo.com/img/orig/CBT_BIG-f438266d.png?t=1720244491" },
    { "client": "PT Kayu Permata", "industry": "Furnitur & Interior", "logo": "https://www.permatadoor.com/wp-content/themes/permata_door/assets/images/svg/permata_door.svg" },
    { "client": "PT Multi Bintang Indonesia Tbk", "industry": "FMCG & F&B", "logo": "https://cdn.cookielaw.org/logos/00afdec3-358f-4f2d-8b63-0c71e6f49172/019808a1-d0bd-747f-b424-020636e1ab33/8a3915b9-9563-470f-8efd-2af699d3f08e/multibintang.png" },
    { "client": "PT. DSM Firmenich Aromatics", "industry": "Kimia & Farmasi", "logo": "https://www.dsm-firmenich.com/content/dam/dsm-firmenich/logos/logo-black.svg" },
    { "client": "PT. Federal Karyatama", "industry": "Otomotif & Kendaraan", "logo": "https://federaloil.co.id/themes/web/desktop2020/new/assets/collections/default/fo-logo-2.png" },
    { "client": "PT. Fukusuke Kogyo Indonesia", "industry": "Kemasan & Plastik", "logo": "https://kemindogroup.id/wp-content/uploads/2020/09/logo-client-kemindo-8.png" },
    { "client": "PT. Indofood CBP Sukses Makmur", "industry": "FMCG & F&B", "logo": "https://www.indofoodcbp.com/images/btn/logo-indofoodcbp.png" },
    { "client": "PT. Mars Symbioscience", "industry": "FMCG & F&B", "logo": "https://wikiexport.ai/wp-content/uploads/2022/10/15-1170x600.png" },
    { "client": "PT. Nufarm Indonesia", "industry": "Kimia & Farmasi", "logo": "https://nufarm.com/id/wp-content/themes/nufarm/images/site-logo.svg" },
    { "client": "PT. Sakae Riken Indonesia", "industry": "Otomotif & Kendaraan", "logo": "https://www.sakaeriken.co.jp/assets/img/common/logo/logo-site.png" },
    { "client": "PT Garuda Food", "industry": "FMCG & F&B", "logo": "https://www.vhv.rs/dpng/d/73-737965_garudafood-logo-png-transparent-png.png" },
    { "client": "PT Bredero Shaw Indonesia", "industry": "Industri Berat & Otomasi", "logo": "https://karir-production.nos.jkt-1.neo.id/logos/22/1264222/Bredero_Shaw_Indonesia_01.png" },
    { "client": "PT Delifood Sentosa Corpindo", "industry": "FMCG & F&B", "logo": "https://cdn0-production-images-kly.akamaized.net/TpRMBHzC6SCc6V4oTvo3-KIt8kE=/2560x1440/smart/filters:quality(75):strip_icc()/kly-media-production/medias/4243444/original/067506700_1669705672-logo_mayora.jpg" },
    { "client": "PT Diageo Indonesia", "industry": "FMCG & F&B", "logo": "https://cdn.getamigo.io/ggr/rebuild/client-story-imgs/diageo-hero.webp" },
    { "client": "PT Elangperdana Tyre Industry", "industry": "Otomotif & Kendaraan", "logo": "https://admin.zeetex-radial.com/storage/page-contents/February2021/hcwzrhzeJOolozrpB7p5.png" },
    { "client": "PT Hempel Indonesia", "industry": "Bahan Bangunan & Infrastruktur", "logo": "https://image1ws.indotrading.com/s3/webp/co19822/companylogo/w400-h220/logo.jpg" },
    { "client": "PT Industrial Robotic Automation", "industry": "Industri Berat & Otomasi", "logo": "https://i.imgur.com/7Jpv5Qg.jpeg" },
    { "client": "PT Inoac Polytechno Indonesia", "industry": "Kemasan & Plastik", "logo": "https://www.inoac.co.jp/common/img/logo.svg" },
    { "client": "PT Kalbe Morinaga Indonesia", "industry": "Kimia & Farmasi", "logo": "https://kalbenutritionals.com/images/kalbe-nutritionals-logo.png" },
    { "client": "PT Kian Mulia Manunggal", "industry": "Kaca & Material Solid", "logo": "https://www.temposcangroup.com/public/images/LOGO_TEMPO_SCAN_100_INDONESIA.png" },
    { "client": "PT Meiji Food Indonesia", "industry": "FMCG & F&B", "logo": "https://meiji.co.id/storage/public/generals/eY0Fj5yMvi7ZPSz9zNcI9RSoYvYQIuQb2cMEKCTl.png" },
    { "client": "PT Cipta Mortar Utama", "industry": "Bahan Bangunan & Infrastruktur", "logo": "https://www.mortarutama.com/wp-content/uploads/2023/12/logo-MU-new-hires-01-1536x635.png" },
    { "client": "PT Rinnai Indonesia", "industry": "Elektronik", "logo": "https://www.rinnai.co.id/wp-content/uploads/2019/04/logo-395x100.png" },
    { "client": "PT Sarihusada Generasi Mahardhika", "industry": "FMCG & F&B", "logo": "https://www.sarihusada.co.id/assets/img/logo.png" },
    { "client": "PT Sri Trang Lingga Indonesia", "industry": "Kaca & Material Solid", "logo": "https://axeoneverest.com/wp-content/uploads/2011/04/sri-trang-group-everest-logo-1.jpg" },
    { "client": "PT Sugity Creatives", "industry": "Otomotif & Kendaraan", "logo": "https://uccareer.id/assets/upload/company/thumbs/thumb300px-20251007-100131-a1262.jpg" },
    { "client": "PT Sumi Rubber Indonesia", "industry": "Otomotif & Kendaraan", "logo": "https://dunlop.co.id/logo-default.svg" },
    { "client": "PT URC Indonesia", "industry": "FMCG & F&B", "logo": "https://www.urc.co.id/wp-content/uploads/2021/01/2.jpg" },
    { "client": "PT. Evoluzione Tyres", "industry": "Otomotif & Kendaraan", "logo": "https://csr.subang.go.id/assets/upload/company/pt-evoluzione-tyres-768x576.jpg" },
    { "client": "PT. Mura Maha Agung", "industry": "Bahan Bangunan & Infrastruktur", "logo": "https://www.muramaha.com/wp-content/uploads/2017/01/cropped-logo-muramaha3.png" },
    { "client": "PT Suryaraya Rubberindo Industries", "industry": "Otomotif & Kendaraan", "logo": "https://fdrtire.com/assets/frontend/img/logo.jpg" },
    { "client": "PT Astra Daihatsu Motor", "industry": "Otomotif & Kendaraan", "logo": "https://medias.astra-daihatsu.id/sys-master-media/h70/hc8/8819719208990/astraDaihatsulogo.svg" },
    { "client": "PT YKK AP Indonesia", "industry": "Bahan Bangunan & Infrastruktur", "logo": "https://www.ykkap.co.id/assets/img/header_logo01.svg" }
];

// Define Industry categories, icons, and priority
const industriesConfig = [
    { name: "FMCG & F&B", icon: Factory, color: "text-blue-600", bg: "bg-blue-50/80", border: "border-blue-200" },
    { name: "Otomotif & Kendaraan", icon: Truck, color: "text-red-600", bg: "bg-red-50/80", border: "border-red-200" },
    { name: "Kimia & Farmasi", icon: FlaskConical, color: "text-emerald-600", bg: "bg-emerald-50/80", border: "border-emerald-200" },
    { name: "Kaca & Material Solid", icon: Box, color: "text-slate-600", bg: "bg-slate-50/80", border: "border-slate-200" },
    { name: "Kemasan & Plastik", icon: Box, color: "text-indigo-600", bg: "bg-indigo-50/80", border: "border-indigo-200" },
    { name: "Furnitur & Interior", icon: Sofa, color: "text-amber-600", bg: "bg-amber-50/80", border: "border-amber-200" },
    { name: "Bahan Bangunan & Infrastruktur", icon: Hammer, color: "text-stone-600", bg: "bg-stone-50/80", border: "border-stone-200" },
    { name: "Industri Berat & Otomasi", icon: Factory, color: "text-slate-700", bg: "bg-slate-100/80", border: "border-slate-300" },
    { name: "Elektronik", icon: Monitor, color: "text-cyan-600", bg: "bg-cyan-50/80", border: "border-cyan-200" },
    { name: "Logistik Udara", icon: Truck, color: "text-sky-600", bg: "bg-sky-50/80", border: "border-sky-200" }
];

export function AboutClientLogos() {
    // 1. Group the project logos by industry
    const groupedLogos: Record<string, typeof projectLogos> = {};

    // Group remote logos
    projectLogos.forEach(logo => {
        if (!groupedLogos[logo.industry]) {
            groupedLogos[logo.industry] = [];
        }
        groupedLogos[logo.industry].push(logo);
    });

    const [expandedIndustry, setExpandedIndustry] = useState<string | null>("FMCG & F&B");

    return (
        <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full px-4">
            {industriesConfig.map((industry, catIndex) => {
                const logos = groupedLogos[industry.name];
                if (!logos || logos.length === 0) return null;

                const Icon = industry.icon;
                const isExpanded = expandedIndustry === industry.name;

                return (
                    <motion.div
                        key={industry.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: catIndex * 0.05 }}
                        className="flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
                    >
                        {/* Interactive Accordion Header */}
                        <button
                            onClick={() => setExpandedIndustry(isExpanded ? null : industry.name)}
                            className="w-full flex items-center justify-between p-5 md:p-6 outline-none hover:bg-slate-50 transition-colors group"
                        >
                            <div className="flex items-center gap-4 mx-auto">
                                <div className={`p-2.5 rounded-xl border ${industry.border} ${industry.bg} transition-transform group-hover:scale-110`}>
                                    <Icon size={20} className={industry.color} />
                                </div>
                                <div className="text-left flex-1 min-w-[200px]">
                                    <h3 className="text-lg md:text-xl font-bold text-slate-800 tracking-tight">{industry.name}</h3>
                                    <p className="text-sm text-slate-500 font-medium">{logos.length} Klien Multinasional</p>
                                </div>
                            </div>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 text-slate-500 transition-transform duration-300 ${isExpanded ? 'rotate-180 bg-slate-200 text-slate-800' : 'group-hover:bg-slate-200'}`}>
                                <ChevronDown size={20} />
                            </div>
                        </button>

                        {/* Collapsible Logos Grid */}
                        <AnimatePresence initial={false}>
                            {isExpanded && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                >
                                    {/* Using grid-flow-dense and varying spans for a more dynamic "bento/masonry" style */}
                                    <div className="p-6 pt-2 bg-slate-50/50 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 auto-rows-[100px] grid-flow-dense gap-4">
                                        {logos.map((logo, index) => {
                                            // Make every 5th logo slightly larger (span 2 columns, span 2 rows)
                                            // and every 3rd logo span 2 columns but 1 row
                                            // Normal logos span 1 column, 1 row using Tailwind breakpoints instead of window size
                                            let spanClass = "col-span-1 row-span-1";
                                            let imgSizeClass = "max-h-12 max-w-full";
                                            if (index % 5 === 0 && logos.length > 3) {
                                                spanClass = "md:col-span-2 md:row-span-2";
                                                imgSizeClass = "max-h-12 md:max-h-20 max-w-[80%]";
                                            } else if (index % 3 === 0 && logos.length > 2) {
                                                spanClass = "sm:col-span-2 row-span-1";
                                            }

                                            return (
                                                <motion.div
                                                    key={logo.client}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: index * 0.03, duration: 0.3 }}
                                                    className={`relative w-full h-full flex flex-col items-center justify-center p-4 group bg-white rounded-2xl border border-slate-200 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.02)] hover:shadow-lg hover:border-slate-300 hover:-translate-y-1 hover:z-10 transition-all duration-300 ${spanClass}`}
                                                >
                                                    {/* Tooltip on Hover */}
                                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none drop-shadow-md z-20">
                                                        {logo.client}
                                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
                                                    </div>

                                                    {/* Used eslint-disable for standard img to avoid Next config overhead */}
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img
                                                        src={logo.logo}
                                                        alt={logo.client}
                                                        className={`object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 mx-auto drop-shadow-sm group-hover:drop-shadow-md relative z-10 ${imgSizeClass}`}
                                                    />
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                );
            })}
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
                src="https://i.imgur.com/M39qASX.jpeg"
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
                    src="https://i.imgur.com/N3cXzid.jpeg"
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

