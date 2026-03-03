import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Facebook, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8 text-slate-600 font-sans relative z-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Kolom 1: Brand & Deskripsi */}
          <div>
            <div className="mb-8">
              <Link href="/" className="block relative h-16 w-64 hover:opacity-80 transition-opacity">
                <Image
                  src="/logo.png"
                  alt="PT Dimensi Quantum Wahyudi Logo"
                  fill
                  className="object-contain object-left"
                />
              </Link>
            </div>

            <p className="text-sm leading-relaxed mb-6">
              Mitra terpercaya solusi industrial lifting & handling system di Indonesia.
              Menggabungkan presisi teknologi Jerman dan inovasi Swedia untuk produktivitas pabrik Anda.
            </p>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/company/dimensiwahyudi" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-100 text-slate-600 rounded-full hover:bg-blue-700 hover:text-white transition-all shadow-sm">
                <Linkedin size={18} />
              </a>
              <a href="https://www.instagram.com/nabelsakha/" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-100 text-slate-600 rounded-full hover:bg-pink-600 hover:text-white transition-all shadow-sm">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Kolom 2: Quick Links */}
          <div>
            <h4 className="text-slate-900 font-bold mb-6 uppercase tracking-wider text-xs">Perusahaan</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/about" className="hover:text-cyan-600 transition-colors">Tentang Kami</Link></li>
              <li><Link href="/products" className="hover:text-cyan-600 transition-colors">Katalog Produk</Link></li>
              <li><Link href="/services" className="hover:text-cyan-600 transition-colors">Layanan Service</Link></li>
              <li><Link href="/career" className="hover:text-cyan-600 transition-colors">Karir</Link></li>
            </ul>
          </div>

          {/* Kolom 3: Produk */}
          <div>
            <h4 className="text-slate-900 font-bold mb-6 uppercase tracking-wider text-xs">Solusi Kami</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/products/schmalz/vacuum-tube-lifter" className="hover:text-cyan-600 transition-colors">Vacuum Lifters</Link></li>
              <li><Link href="/products/schmalz/crane-system" className="hover:text-cyan-600 transition-colors">Crane Systems</Link></li>
              <li><Link href="/products/binar" className="hover:text-cyan-600 transition-colors">Lift Arms & Grippers</Link></li>
              <li><Link href="/services" className="hover:text-cyan-600 transition-colors">Layanan & Service</Link></li>
            </ul>
          </div>

          {/* Kolom 4: Kontak */}
          <div>
            <h4 className="text-slate-900 font-bold mb-6 uppercase tracking-wider text-xs">Hubungi Kami</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-cyan-600 mt-1 shrink-0" />
                <span className="leading-relaxed">
                  BizPark 3 Bekasi, Jl. Sultan Agung No.80 No. C37,<br />
                  Kali Baru, Medan Satria, Bekasi, West Java 17132
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-cyan-600 shrink-0" />
                <a href="https://wa.me/6281119168752" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-cyan-600 transition-colors">+62 811-1916-8752</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-cyan-600 shrink-0" />
                <a href="mailto:sales@dimensiwahyudi.com" className="font-medium hover:text-cyan-600 transition-colors">sales@dimensiwahyudi.com</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Garis Pemisah & Copyright */}
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-medium text-slate-500">
          <p>&copy; 2026 PT Dimensi Quantum Wahyudi. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-cyan-600">Privacy Policy</Link>
            <Link href="#" className="hover:text-white px-3 py-1 bg-slate-900 rounded-md transition-colors hover:bg-cyan-600">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}