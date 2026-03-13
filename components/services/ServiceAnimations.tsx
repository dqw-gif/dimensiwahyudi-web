'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Wrench, Settings, Users, Truck, CheckCircle, LucideIcon } from 'lucide-react';

interface ServiceItem {
    title: string;
    desc: string;
    icon: LucideIcon;
    image: string;
}

const services: ServiceItem[] = [
    {
        title: 'Specialist Installation & Commissioning',
        desc: 'We ensure smooth technology integration on your production line. Installation is handled by certified technicians to guarantee precision, operational safety, and day-one readiness.',
        icon: Wrench,
        image: 'https://i.imgur.com/hOiTPiG.jpeg', // Industrial construction/installation
    },
    {
        title: 'Preventive Maintenance',
        desc: 'Protect your investment with scheduled maintenance designed to reduce unplanned downtime. Our scope includes vacuum system audits, motor calibration, and electrical inspections aligned with global manufacturing standards.',
        icon: Settings,
        image: 'https://i.imgur.com/AVUmEst.jpeg', // Engineer doing maintenance
    },
    {
        title: 'Operator Training & Certification',
        desc: 'Higher productivity starts with skilled operators. We provide intensive training in ergonomic operation techniques and safety SOP compliance to minimize workplace incidents.',
        icon: Users,
        image: 'https://i.imgur.com/uBPspqb.jpeg', // People discussing/training in manufacturing
    },
    {
        title: 'Genuine Spare Parts',
        desc: 'We secure original components directly from Schmalz Germany and Binar Sweden. With responsive supply management, we help keep your production cycle moving without technical delays.',
        icon: Truck,
        image: 'https://i.imgur.com/leBwKaE.jpeg', // Logistics/warehouse/parts
    },
];

export function ServiceHero() {
    return (
        <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-cyan-600 font-bold tracking-widest text-sm uppercase mb-4 block"
            >
                Ongoing Technical Services
            </motion.span>
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight"
            >
                Installation & Maintenance <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                    for Industrial Lifting Systems
                </span>
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-slate-600 max-w-2xl mx-auto font-medium"
            >
                Our commitment starts after installation. We act as your long-term technical partner to keep every lifting solution running at peak efficiency.
            </motion.p>
        </div>
    );
}

export function ServiceList() {
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
                        <div className="relative h-[350px] md:h-[450px] rounded-3xl overflow-hidden border border-slate-200 shadow-xl transition-shadow duration-500 group-hover:shadow-2xl">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md border border-slate-100 p-5 rounded-2xl z-20 text-blue-600 shadow-lg group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                <item.icon size={32} />
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">{item.title}</h3>
                            <div className="w-20 h-1.5 bg-cyan-500 rounded-full" />
                        </div>
                        <p className="text-slate-600 text-lg leading-relaxed font-medium">{item.desc}</p>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 text-slate-700 font-semibold bg-slate-50 p-4 rounded-xl border border-slate-100 transition-colors hover:bg-white hover:border-cyan-200">
                                <CheckCircle size={22} className="text-blue-600" />
                                <span>Routine Technical Audits</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-700 font-semibold bg-slate-50 p-4 rounded-xl border border-slate-100 transition-colors hover:bg-white hover:border-cyan-200">
                                <CheckCircle size={22} className="text-blue-600" />
                                <span>Fast 24-Hour Response</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
