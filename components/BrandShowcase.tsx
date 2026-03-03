'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';

const brands = [
  {
    name: 'SCHMALZ',
    country: 'Germany',
    desc: 'Global market leader teknologi vacuum automation & ergonomic handling systems.',
    logoUrl: 'https://i.imgur.com/6ns1gwx.png',
    website: 'https://www.schmalz.com/',
    internalLink: '/products/schmalz',

    style: {
      sectionBg: 'bg-slate-50',
      titleColor: 'text-slate-900',
      descColor: 'text-slate-600',
      lineColor: 'border-slate-200',
      cardBg: 'bg-white',
      cardBorder: 'border-slate-200',
      numberColor: 'text-slate-200',
      logoEffect: 'grayscale opacity-60 hover:grayscale-0 hover:opacity-100',
    },
    theme: {
      accent: 'text-blue-700',
      badgeBg: 'bg-blue-100',
      badgeText: 'text-blue-700',
      badgeBorder: 'border-blue-200',
      btnText: 'text-blue-700',
      btnHover: 'hover:text-blue-900',
      cardBorderHover: 'hover:border-blue-500',
      textHover: 'group-hover:text-blue-700',
      cardRing: 'hover:shadow-blue-100',
      badge: 'bg-blue-50 text-blue-700',
    },
    features: [
      {
        title: 'Vacuum Tube Lifter',
        desc: 'JumboFlex & seri JUMBO untuk angkat beban berat tanpa sakit pinggang.',
        img: 'https://media.schmalz.com/MAM_Library/Products/Anwendungsbilder/Handling%20Systems/Applications/Logistics/01f071828115_Picture_Anwendungsbilder_HS_JumboFlex%20Mobile_2024_03.jpg?size=l',
        tag: 'Flagship'
      },
      {
        title: 'VacuMaster',
        desc: 'Vacuum lifter portable untuk pengangkatan karton, kayu, dan kaca hingga 1000 kg.',
        img: 'https://i.imgur.com/1Whf0JL.png',
        tag: 'Popular'
      },
      {
        title: 'Vacuum Suction Cup',
        desc: 'Komponen vakum presisi untuk otomasi robotika & handling industri.',
        img: 'https://media.schmalz.com/MAM_Library/Products/Produktuntergruppenbilder/0_/001/00191/f03704cb51f0_PUG_PGE-00191_000.jpg?size=m',
        tag: 'Component'
      },
    ]
  },
  {
    name: 'BINAR HANDLING',
    country: 'Sweden',
    desc: 'Pionir solusi smart lifting & manipulator arms dengan kontrol presisi tak tertandingi.',
    logoUrl: 'https://i.imgur.com/OOBgQpe.png',
    website: 'https://www.binarhandling.com',
    internalLink: '/products/binar',

    style: {
      sectionBg: 'bg-slate-950',
      titleColor: 'text-white',
      descColor: 'text-slate-400',
      lineColor: 'border-white/10',
      cardBg: 'bg-slate-900',
      cardBorder: 'border-white/5',
      numberColor: 'text-white/5',
      logoEffect: 'brightness-0 invert opacity-70 hover:brightness-100 hover:invert-0 hover:opacity-100',
    },
    theme: {
      accent: 'text-red-500',
      badgeBg: 'bg-red-500/10',
      badgeText: 'text-red-400',
      badgeBorder: 'border-red-500/20',
      btnText: 'text-red-400',
      btnHover: 'hover:text-red-300',
      cardBorderHover: 'hover:border-red-500',
      textHover: 'group-hover:text-red-400',
      cardRing: 'hover:shadow-red-900/30',
      badge: 'bg-red-500/10 text-red-400',
    },
    features: [
      {
        title: 'Quick-Lift Arm 50i',
        desc: 'Servo lift paling responsif — fingertip control untuk beban 50 kg.',
        img: 'https://www.binarhandling.com/wp-content/uploads/2020/02/QLA50i_OM_utsnitt2_Gen3.png',
        tag: 'Bestseller'
      },
      {
        title: 'Quick-Lift Driven 300i',
        desc: 'Motor-assisted 3-arah untuk beban hingga 300 kg tanpa risiko cedera.',
        img: 'https://www.binarhandling.com/wp-content/uploads/2020/02/QLA_300_v2_Gen3.png',
        tag: 'Heavy Duty'
      },
      {
        title: 'Vacuum End Effector',
        desc: 'Gripdon vakum serbaguna dengan quick-connect untuk semua jenis permukaan.',
        img: 'https://www.binarhandling.com/wp-content/uploads/2020/03/Vacuum_Versatile_end_effector_II.jpg',
        tag: 'Gripper'
      },
    ]
  }
];

export default function BrandShowcase() {
  return (
    <div className="w-full">
      {brands.map((brand, bIndex) => (
        <section key={bIndex} className={`py-24 ${brand.style.sectionBg}`}>
          <div className="max-w-7xl mx-auto px-6">

            {/* Header Brand */}
            <div className={`flex flex-col md:flex-row justify-between items-end mb-12 border-b pb-8 ${brand.style.lineColor}`}>

              {/* KIRI: Judul & Deskripsi */}
              <div className="flex-1 max-w-3xl">
                <h3 className={`text-4xl md:text-5xl font-bold flex flex-wrap items-center gap-4 ${brand.style.titleColor}`}>
                  {brand.name}
                  <span className={`text-xs font-bold px-3 py-1 rounded-full tracking-widest border uppercase ${brand.theme.badgeBg} ${brand.theme.badgeText} ${brand.theme.badgeBorder}`}>
                    {brand.country}
                  </span>
                </h3>
                <p className={`mt-4 text-lg ${brand.style.descColor}`}>{brand.desc}</p>
              </div>

              {/* KANAN: Logo & Tombol */}
              <div className="flex flex-col items-start md:items-end gap-6 mt-8 md:mt-0 shrink-0">
                <a href={brand.website} target="_blank" rel="noopener noreferrer">
                  <div className={`relative h-20 w-64 transition-all duration-500 cursor-pointer ${brand.style.logoEffect}`}>
                    <Image
                      src={brand.logoUrl}
                      alt={`${brand.name} Logo`}
                      fill
                      className="object-contain object-left md:object-right"
                      unoptimized
                    />
                  </div>
                </a>

                <Link
                  href={brand.internalLink}
                  className={`flex items-center gap-2 transition-colors font-bold tracking-wide ${brand.theme.btnText} ${brand.theme.btnHover}`}
                >
                  EXPLORE {brand.name} <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* Grid Cards — clickable, link ke halaman produk brand */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {brand.features.map((feat, fIndex) => (
                <motion.div
                  key={fIndex}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: fIndex * 0.15 }}
                >
                  <Link
                    href={brand.internalLink}
                    className={`group block rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${brand.style.cardBg} ${brand.style.cardBorder} ${brand.theme.cardBorderHover} ${brand.theme.cardRing}`}
                  >
                    {/* Image Area */}
                    <div className="h-56 relative overflow-hidden bg-slate-100">
                      <Image
                        src={feat.img}
                        alt={feat.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        unoptimized
                      />
                      {/* Overlay number */}
                      <div className={`absolute top-4 right-4 text-5xl font-black ${brand.style.numberColor}`}>
                        0{fIndex + 1}
                      </div>
                      {/* Tag badge */}
                      <div className="absolute top-4 left-4">
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${brand.theme.badge}`}>
                          {feat.tag}
                        </span>
                      </div>
                    </div>

                    {/* Text Area */}
                    <div className="p-8">
                      <h4 className={`text-xl font-bold mb-3 transition-colors ${brand.style.titleColor} ${brand.theme.textHover}`}>
                        {feat.title}
                      </h4>
                      <p className={`text-sm leading-relaxed ${brand.style.descColor}`}>
                        {feat.desc}
                      </p>
                      <div className={`mt-4 flex items-center gap-1.5 text-xs font-bold ${brand.theme.btnText} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                        Lihat Produk <ArrowRight size={12} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

          </div>
        </section>
      ))}
    </div>
  );
}