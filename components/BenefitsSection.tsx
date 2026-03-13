'use client';

import { motion } from 'framer-motion';
// Kita pakai icon warna biru tua biar kontras
import { ShieldCheck, Settings, Zap, Activity, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    title: 'Safety-First Ergonomics',
    desc: 'European-standard vacuum lifting systems designed to reduce strain injuries and improve daily operator safety.',
    icon: ShieldCheck,
  },
  {
    title: 'On-Site Technical Audit',
    desc: 'Certified engineers assess your production flow and recommend a lifting setup that fits your operation with precision.',
    icon: Settings,
  },
  {
    title: 'Live Product Trial',
    desc: 'Test handling units directly on your line before you commit, with measurable performance and ergonomics feedback.',
    icon: Zap,
  },
  {
    title: 'After-Sales Service & Support',
    desc: 'Responsive technical support, genuine spare part availability, and scheduled maintenance for long-term reliability.',
    icon: Activity,
  },
];

export default function BenefitsSection() {
  return (
    // BG diganti jadi bg-white (Putih)
    <section className="py-24 bg-white relative overflow-hidden">

      {/* Background Pattern Halus (Abu-abu tipis) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">

        {/* BAGIAN KIRI: Teks Utama */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <span className="text-blue-600 font-bold tracking-widest text-sm uppercase bg-blue-50 px-3 py-1 rounded-full">
            Certified Engineering Expertise
          </span>
          {/* Judul jadi hitam (slate-900) */}
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
            Your Trusted Partner in <br />
            <span className="text-blue-600">
              European-Grade Lifting Systems
            </span>
          </h2>
          {/* Teks jadi abu-abu tua (slate-600) */}
          <p className="text-slate-600 text-lg leading-relaxed max-w-lg">
            As the official Schmalz and Binar Handling partner in Indonesia, we do more than supply lifting equipment. We design practical, high-performance <em>vacuum handling</em> systems that improve productivity, protect operators, and deliver strong long-term <em>ROI</em> for manufacturers.
          </p>

          <div className="pt-4">
            {/* Link jadi biru */}
            <Link href="/about" className="group inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-all">
              Learn More About Our Company
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* BAGIAN KANAN: Grid 2x2 (Kartu Putih) */}
        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              // Kartu background putih dengan shadow halus dan border abu
              className="bg-white border border-slate-200 p-8 rounded-2xl hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100/50 transition-all group"
            >
              {/* Icon background biru muda */}
              <div className="w-14 h-14 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <item.icon size={26} />
              </div>
              {/* Judul kartu hitam */}
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>
              {/* Deskripsi kartu abu tua */}
              <p className="text-slate-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}