'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Wrench, Settings, Users, Truck, CheckCircle, LucideIcon } from 'lucide-react';
import { useLanguage } from '../LanguageProvider';

interface ServiceItem {
    title: string;
    titleId: string;
    desc: string;
    descId: string;
    icon: LucideIcon;
    image: string;
}

const services: ServiceItem[] = [
    {
        title: 'Specialist Installation & Commissioning',
        titleId: 'Instalasi & Commissioning Spesialis',
        desc: 'We ensure smooth technology integration on your production line. Installation is handled by certified technicians to guarantee precision, operational safety, and day-one readiness.',
        descId: 'Kami memastikan integrasi sistem berjalan presisi di lini produksi Anda. Instalasi dikerjakan langsung oleh teknisi bersertifikat untuk menjamin keamanan struktur crane, kalibrasi daya angkat vakum, dan kesiapan operasional sejak hari pertama.',
        icon: Wrench,
        image: 'https://i.imgur.com/hOiTPiG.jpeg',
    },
    {
        title: 'Preventive Maintenance',
        titleId: 'Preventive Maintenance Berkala',
        desc: 'Protect your investment with scheduled maintenance designed to reduce unplanned downtime. Our scope includes vacuum system audits, motor calibration, and electrical inspections aligned with global manufacturing standards.',
        descId: 'Lindungi umur pakai mesin Anda melalui jadwal maintenance terencana untuk mencegah downtime mendadak. Lingkup kerja kami mencakup audit kebocoran vakum, kalibrasi motor servo, serta inspeksi kelistrikan sesuai standar pabrikan Eropa.',
        icon: Settings,
        image: 'https://i.imgur.com/AVUmEst.jpeg',
    },
    {
        title: 'Operator Training & Certification',
        titleId: 'Pelatihan & Sertifikasi Operator',
        desc: 'Higher productivity starts with skilled operators. We provide intensive training in ergonomic operation techniques and safety SOP compliance to minimize workplace incidents.',
        descId: 'Produktivitas lini dimulai dari operator yang terampil. Kami memberikan pelatihan langsung di lantai pabrik mengenai teknik pengoperasian ergonomis dan kepatuhan SOP keselamatan kerja guna menekan risiko insiden.',
        icon: Users,
        image: 'https://i.imgur.com/uBPspqb.jpeg',
    },
    {
        title: 'Genuine Spare Parts',
        titleId: 'Suku Cadang OEM Asli (Genuine Sparepart)',
        desc: 'We secure original components directly from Schmalz Germany and Binar Sweden. With responsive supply management, we help keep your production cycle moving without technical delays.',
        descId: 'Kami menyediakan komponen dan suction cup asli langsung dari Schmalz Jerman dan Binar Swedia. Dengan stok lokal yang siap kirim, kami menjaga kelancaran cycle time produksi Anda tanpa hambatan teknis.',
        icon: Truck,
        image: 'https://i.imgur.com/leBwKaE.jpeg',
    },
];

export function ServiceHero() {
    const { lang } = useLanguage();
    const isId = lang === 'id';

    return (
        <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-cyan-600 font-bold tracking-widest text-sm uppercase mb-4 block"
            >
                {isId ? 'Layanan Teknis & Aftersales Service' : 'Ongoing Technical Services'}
            </motion.span>
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight"
            >
                {isId ? 'Instalasi & Maintenance ' : 'Installation & Maintenance '} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005596] to-sky-600">
                    {isId ? 'Sistem Pengangkat Industri' : 'for Industrial Lifting Systems'}
                </span>
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-slate-600 max-w-2xl mx-auto font-medium"
            >
                {isId
                    ? 'Komitmen kami berlanjut setelah instalasi selesai. Kami hadir sebagai mitra teknis jangka panjang untuk memastikan setiap unit pengangkat beroperasi pada performa dan keamanan tertinggi.'
                    : 'Our commitment starts after installation. We act as your long-term technical partner to keep every lifting solution running at peak efficiency.'}
            </motion.p>
        </div>
    );
}

export function ServiceList() {
    const { lang } = useLanguage();
    const isId = lang === 'id';

    return (
        <div className="max-w-7xl mx-auto space-y-32">
            {services.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className={`flex flex-col gap-16 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
                >
                    <div className="flex-1 w-full group">
                        <div className="relative h-[320px] md:h-[440px] rounded-3xl overflow-hidden border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.1)] transition-all duration-500 group-hover:shadow-2xl">
                            <Image
                                src={item.image}
                                alt={isId ? item.titleId : item.title}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-xl border border-white/95 ring-1 ring-[#005596]/15 p-4 rounded-2xl z-20 text-[#005596] shadow-lg group-hover:bg-[#005596] group-hover:text-white transition-all duration-300">
                                <item.icon size={32} />
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                                {isId ? item.titleId : item.title}
                            </h3>
                            <div className="w-16 h-1 bg-gradient-to-r from-[#005596] to-[#1d4ed8] rounded-full" />
                        </div>
                        <p className="text-slate-600 text-lg leading-relaxed font-medium">
                            {isId ? item.descId : item.desc}
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 text-slate-700 font-semibold bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 ring-1 ring-[#005596]/10 shadow-xs hover:border-[#005596]/30 transition-all">
                                <CheckCircle size={20} className="text-[#005596]" />
                                <span>{isId ? 'Audit Teknis Terjadwal' : 'Routine Technical Audits'}</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-700 font-semibold bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 ring-1 ring-[#005596]/10 shadow-xs hover:border-[#005596]/30 transition-all">
                                <CheckCircle size={20} className="text-[#005596]" />
                                <span>{isId ? 'Respon Cepat 24 Jam' : 'Fast 24-Hour Response'}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
