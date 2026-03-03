'use client';

import Image from 'next/image';
import Link from 'next/link'; // 👈 Kita butuh Link
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ProductCardProps {
  title: string;
  excerpt: string;
  imageUrl: string;
  slug: string; // 👈 Menambahkan properti Slug (alamat URL)
}

export default function ProductCard({ title, excerpt, imageUrl, slug }: ProductCardProps) {
  return (
    <Link href={`/products/${slug}`} className="block h-full">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -10 }}
        className="group relative h-full bg-slate-900 border border-white/10 rounded-xl overflow-hidden hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col"
      >
        {/* 1. Gambar Produk */}
        <div className="relative h-64 w-full overflow-hidden">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
          
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 ease-in-out grayscale group-hover:grayscale-0 group-hover:scale-110"
          />
          
          <div className="absolute top-4 right-4 z-20">
            <span className="px-3 py-1 text-xs font-bold text-cyan-400 bg-black/70 backdrop-blur-md border border-cyan-500/30 rounded-full">
              INDUSTRIAL GRADE
            </span>
          </div>
        </div>

        {/* 2. Konten Teks */}
        <div className="p-6 flex flex-col flex-grow relative z-20">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
            {title}
          </h3>
          
          <div 
            className="text-slate-400 text-sm mb-6 line-clamp-3 flex-grow"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />

          {/* Tombol Panah */}
          <div className="flex items-center text-cyan-500 font-semibold text-sm tracking-wide mt-auto">
            <span className="mr-2 group-hover:mr-4 transition-all">LIHAT DETAIL</span>
            <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
        
        {/* Efek Glow Hover */}
        <div className="absolute inset-0 z-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </motion.div>
    </Link>
  );
}