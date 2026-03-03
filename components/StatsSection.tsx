'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const stats = [
  { number: '12+', label: 'Tahun Pengalaman' },
  { number: '500+', label: 'Proyek Selesai' },
  { number: '50+', label: 'Mitra Industri' },
  { number: '100%', label: 'Kepuasan Klien' },
];

const clients = [
  { src: '/logos/client(1).svg', alt: 'Client 1' },
  { src: '/logos/client(2).svg', alt: 'Client 2' },
  { src: '/logos/client(3).svg', alt: 'Client 3' },
  { src: '/logos/client(4).svg', alt: 'Client 4' },
  { src: '/logos/client(5).svg', alt: 'Client 5' },
  { src: '/logos/client(6).svg', alt: 'Client 6' },
  { src: '/logos/client(7).svg', alt: 'Client 7' },
  { src: '/logos/client(8).svg', alt: 'Client 8' },
];

export default function StatsSection() {
  return (
    <section className="relative w-full py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Container Statistik dengan Background Gelap (Kembali ke Style Awal) */}
        <div className="relative p-8 md:p-16 bg-slate-900 rounded-[2rem] shadow-2xl mb-24 overflow-hidden border border-white/10">
          {/* Efek aksen cahaya di background kotak gelap */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent)] pointer-events-none"></div>
          
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-[0.2em]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Client Logos Section (Tetap di atas Background Putih) */}
        <div className="text-center mb-12">
          <p className="text-slate-400 uppercase text-xs tracking-[0.4em] font-bold">
            Dipercaya Oleh Industri Terkemuka
          </p>
        </div>

        {/* Marquee Container */}
        <div className="relative w-full flex overflow-hidden group">
          {/* Fade efek putih menyesuaikan background luar */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>

          <motion.div
            className="flex flex-nowrap gap-16 md:gap-28 py-4 items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
          >
            {[...clients, ...clients].map((client, index) => (
              <div
                key={index}
                className="relative flex-shrink-0 w-32 h-12 md:w-40 md:h-14 group-hover:scale-110 transition-transform duration-300"
              >
                <Image
                  src={client.src}
                  alt={client.alt}
                  fill
                  className="object-contain filter grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}