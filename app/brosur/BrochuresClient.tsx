'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FileText,
  Download,
  Share2,
  ExternalLink,
  Search,
  CheckCircle,
  Sparkles,
  PhoneCall,
  ShieldCheck,
  Building2,
  ArrowRight,
  Layers,
  Cpu,
  Boxes,
  HelpCircle,
  Eye,
  Check,
  Send,
  Loader2,
  X,
  SlidersHorizontal,
  BookmarkCheck,
} from 'lucide-react';

export interface BrochureItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'ergonomics' | 'overview' | 'grippers' | 'automation';
  categoryLabel: string;
  badge: string;
  badgeColor: string;
  description: string;
  specs: string[];
  applications: string[];
  pdfUrl: string;
  coverImage: string;
  fileSize: string;
  pages: number;
  featured?: boolean;
}

const BROCHURES: BrochureItem[] = [
  {
    id: 'ergonomic-vacuum-lifters',
    title: 'Ergonomic Vacuum Lifters & Crane Systems',
    subtitle: 'Solusi JumboFlex, JumboErgo & VacuMaster',
    category: 'ergonomics',
    categoryLabel: 'Alat Angkat Ergonomis',
    badge: 'Katalog Lengkap · 56 Hal',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    description:
      'Panduan terlengkap penanganan manual handling bebas cedera pinggang untuk mengangkat karung, karton kemasan, drum, ember, lembaran logam, dan panel kayu.',
    specs: [
      'Kapasitas angkat hingga 300 kg (Jumbo) & multi-ton (VacuMaster)',
      'Sertifikasi Ergonomi AGR (Aktion Gesunder Rücken) Jerman',
      'Kontrol satu tangan super cepat (JumboFlex) & dual-hand (JumboErgo)',
      'Kompatibel dengan Sistem Crane Aluminium & Jib Crane modular',
    ],
    applications: ['Gudang & Logistik', 'Pabrik Makanan & Minuman', 'Farmasi & Kimia', 'Manufaktur Logam & Kayu'],
    pdfUrl: '/brochures/ergonomic-vacuum-lifters.pdf',
    coverImage: '/brochures/ergonomic-vacuum-lifters-cover.jpg',
    fileSize: '4.6 MB',
    pages: 56,
    featured: true,
  },
  {
    id: 'product-overview',
    title: 'Schmalz Industrial Handling Product Overview',
    subtitle: 'Rangkuman Seluruh Ekosistem Penanganan Vakum',
    category: 'overview',
    categoryLabel: 'Katalog Ringkasan',
    badge: 'Quick Guide · 6 Hal',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    description:
      'Ringkasan eksekutif seluruh lini produk penanganan vakum Schmalz Germany & Binar Handling Sweden. Ideal untuk referensi cepat para manajer pabrik, teknisi, dan bagian procurement.',
    specs: [
      'Visual overview lengkap Vacuum Lifters, Crane, dan Binar Quick-Lift',
      'Matriks panduan pemilihan alat angkat manual vs sistem robotik',
      'Tabel ringkas beban maksimum dan fleksibilitas instalasi',
      'Kompilasi studi kasus implementasi industri terkemuka',
    ],
    applications: ['Semua Sektor Industri', 'Manajemen Pabrik', 'Tim Pengadaan / Procurement', 'Konsultan Ergonomi'],
    pdfUrl: '/brochures/product-overview.pdf',
    coverImage: '/brochures/product-overview-cover.jpg',
    fileSize: '1.1 MB',
    pages: 6,
    featured: true,
  },
  {
    id: 'area-gripping',
    title: 'Large-Area Vacuum Gripping Systems',
    subtitle: 'Sistem Gripper Vakum untuk Robotika & Otomasi Paletisasi',
    category: 'grippers',
    categoryLabel: 'Robotika & Gripper EOAT',
    badge: 'Robotika & EOAT · 8 Hal',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    description:
      'Solusi vacuum gripper permukaan luas (End-of-Arm Tooling) untuk lengan robot industri dan gantry otomatis dalam menangani karton berbagai ukuran, paletisasi, dan material berpori.',
    specs: [
      'Seri FMP, FXP, SBX, dan SVE berteknologi katup pintar terintegrasi',
      'Daya cengkeram tetap 100% aman meski 50% permukaan gripper tidak tertutup',
      'Siap diintegrasikan ke robot FANUC, KUKA, ABB, Yaskawa, dan Cobot',
      'Bantalan busa khusus yang tahan lama dan mudah diganti di lini produksi',
    ],
    applications: ['Robot Palletizing & Depalletizing', 'Industri Kayu & Furniture', 'Otomotif & Baterai EV', 'Packaging Otomatis'],
    pdfUrl: '/brochures/area-gripping.pdf',
    coverImage: '/brochures/area-gripping-cover.jpg',
    fileSize: '2.5 MB',
    pages: 8,
  },
  {
    id: 'vacuum-automation',
    title: 'Vacuum Automation Components',
    subtitle: 'Suction Cups, Ejector Hemat Energi & Sensor Cerdas',
    category: 'automation',
    categoryLabel: 'Komponen Otomasi Pabrik',
    badge: 'Komponen Otomasi · 6 Hal',
    badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    description:
      'Katalog komponen vakum presisi tinggi untuk mesin pick-and-place, mesin packaging berkecepatan tinggi, dan otomatisasi pabrik modern berstandar Industri 4.0.',
    specs: [
      'Ratusan varian Suction Cup (NBR, Silikon Food-Grade FDA, Elastodur)',
      'Compact Ejector cerdas SCPS/SCPSi dengan komunikasi digital IO-Link',
      'Sistem hemat energi otomatis (Air Saving Function) hingga 80%',
      'Spring plunger, filter vakum, dan sensor switch berpresisi tinggi',
    ],
    applications: ['Mesin Packaging Otomatis', 'Industri Elektronik & Semikonduktor', 'Makanan & Minuman Steril', 'Lini Perakitan Cepat'],
    pdfUrl: '/brochures/vacuum-automation.pdf',
    coverImage: '/brochures/vacuum-automation-cover.jpg',
    fileSize: '762 KB',
    pages: 6,
  },
];

const CATEGORIES = [
  { id: 'all', label: 'Semua Brosur (4)' },
  { id: 'ergonomics', label: 'Alat Angkat Ergonomis' },
  { id: 'overview', label: 'Katalog Ringkasan' },
  { id: 'grippers', label: 'Robotika & Gripper Vakum' },
  { id: 'automation', label: 'Komponen Otomasi' },
];

export default function BrochuresClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalBrochure, setActiveModalBrochure] = useState<BrochureItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phoneOrEmail: '',
    interest: 'Umum / Semua Brosur',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Filtered brochures
  const filteredBrochures = useMemo(() => {
    return BROCHURES.filter((b) => {
      const matchesCategory = selectedCategory === 'all' || b.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.subtitle.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.specs.some((s) => s.toLowerCase().includes(q)) ||
        b.applications.some((a) => a.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // WhatsApp share link generator
  const getWhatsAppShareUrl = (brochure: BrochureItem) => {
    const fullUrl = `https://www.dimensiwahyudi.com${brochure.pdfUrl}`;
    const text = `Halo Tim PT Dimensi Quantum Wahyudi, saya sedang melihat brosur "${brochure.title}" (${fullUrl}). Saya ingin konsultasi teknis & informasi harga untuk kebutuhan pabrik kami.`;
    return `https://wa.me/6281119168752?text=${encodeURIComponent(text)}`;
  };

  const getGeneralWhatsAppUrl = () => {
    const text =
      'Halo Tim PT Dimensi Quantum Wahyudi, saya sedang berada di booth pameran Anda / melihat halaman brosur digital. Saya ingin bertanya langsung dengan sales engineering Anda.';
    return `https://wa.me/6281119168752?text=${encodeURIComponent(text)}`;
  };

  // Lead Form submission
  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phoneOrEmail.trim()) {
      setSubmitError('Nama dan Nomor WhatsApp/Email wajib diisi.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const payload = {
        name: formData.name.trim(),
        company: formData.company.trim() || 'Pameran / QR Visitor',
        email: formData.phoneOrEmail.includes('@') ? formData.phoneOrEmail.trim() : 'pameran@dimensiwahyudi.com',
        message: `Permintaan Penawaran & Konsultasi Brosur Digital Pameran. Kontak WhatsApp/HP: ${formData.phoneOrEmail}. Produk yang diminati: ${formData.interest}`,
      };

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitSuccess(true);
        setFormData({ name: '', company: '', phoneOrEmail: '', interest: 'Umum / Semua Brosur' });
      } else {
        setSubmitError('Terjadi kendala saat mengirim. Silakan hubungi kami via WhatsApp.');
      }
    } catch {
      setSubmitError('Terjadi kendala koneksi. Silakan hubungi kami via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-cyan-500 selection:text-white pb-24">
      {/* Top Exhibition Welcome Alert Banner */}
      <section className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 text-white border-b border-blue-800/40 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500 text-slate-950 font-black text-[10px]">
              ★
            </span>
            <span className="font-semibold text-slate-200">
              Selamat Datang di Portal Brosur Digital Resmi <strong className="text-white">PT Dimensi Quantum Wahyudi</strong>
            </span>
          </div>
          <a
            href={getGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-[11px] transition-all shrink-0 shadow-xs"
          >
            <PhoneCall size={12} />
            <span>Sedang di Booth? Panggil Sales Kami</span>
          </a>
        </div>
      </section>

      {/* Main Hero Header */}
      <header className="relative pt-12 pb-16 md:py-20 bg-white border-b border-slate-200 overflow-hidden">
        {/* Decorative Grid & Glow */}
        <div
          className="absolute inset-0 z-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(148, 163, 184, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.15) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          {/* Brand Partner Badges */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold">
            <span className="text-cyan-700">Official Distributor</span>
            <span>·</span>
            <span>🇩🇪 Schmalz Germany</span>
            <span>·</span>
            <span>🇸🇪 Binar Handling Sweden</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            E-Katalog & Brosur Digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-600">
              Solusi Penanganan Industri
            </span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Akses langsung spesifikasi teknis, kapasitas angkat beban, dan panduan integrasi sistem penanganan vakum
            dan crane ergonomis langsung di smartphone atau komputer Anda tanpa harus membawa brosur kertas.
          </p>

          {/* Quick Stats Banner */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-semibold text-slate-500">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-emerald-600" />
              <span>Sertifikasi Ergonomi AGR Jerman</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle size={16} className="text-blue-600" />
              <span>Uji Beban & Garansi Resmi</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles size={16} className="text-cyan-600" />
              <span>Free Engineering Survey</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Search & Filter Toolbar Card */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-md space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari brosur: karung, karton, gripper, robot, suction..."
                className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Quick Share All / Download Info */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 w-full md:w-auto justify-end">
              <span>Menampilkan {filteredBrochures.length} brosur PDF resmi</span>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <SlidersHorizontal size={12} /> Filter:
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Brochure Cards Grid */}
        <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredBrochures.map((brochure) => (
            <article
              key={brochure.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              {/* Card Header & Content */}
              <div>
                {/* Top Image Preview with Badge */}
                <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden border-b border-slate-100">
                  <Image
                    src={brochure.coverImage}
                    alt={brochure.title}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />

                  {/* Badges on Image */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-extrabold border backdrop-blur-md shadow-xs ${brochure.badgeColor}`}
                    >
                      {brochure.badge}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 text-slate-800 shadow-xs backdrop-blur-md">
                      {brochure.fileSize}
                    </span>
                  </div>

                  {/* Title overlay on bottom */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider block">
                      {brochure.categoryLabel}
                    </span>
                    <h2 className="text-lg sm:text-xl font-black tracking-tight leading-snug line-clamp-1 drop-shadow-sm">
                      {brochure.title}
                    </h2>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {brochure.description}
                  </p>

                  {/* Key Highlights */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Spesifikasi & Keunggulan Utama:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {brochure.specs.map((spec, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Suitable Applications Tag Cloud */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {brochure.applications.map((app, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-600 text-[11px] font-semibold"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons Bar */}
              <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center gap-2">
                {/* 1. Baca Langsung */}
                <a
                  href={brochure.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[120px] py-2.5 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs border border-slate-200 transition-all flex items-center justify-center gap-1.5 shadow-2xs"
                  title="Baca langsung di browser"
                >
                  <Eye size={14} className="text-cyan-600" />
                  <span>Baca Online</span>
                </a>

                {/* 2. Download PDF */}
                <a
                  href={brochure.pdfUrl}
                  download
                  className="flex-1 min-w-[130px] py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md shadow-cyan-600/20"
                  title="Simpan file PDF ke HP / Laptop"
                >
                  <Download size={14} />
                  <span>Download PDF</span>
                </a>

                {/* 3. Kirim ke WhatsApp */}
                <a
                  href={getWhatsAppShareUrl(brochure)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors shrink-0"
                  title="Kirim link brosur ini ke WhatsApp saya / minta penawaran"
                >
                  <Share2 size={16} className="text-emerald-600" />
                </a>
              </div>
            </article>
          ))}
        </section>

        {/* Lead Capture Box for Exhibition Attendees */}
        <section className="mt-16 bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Description */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold">
                <Sparkles size={14} className="text-cyan-600" />
                <span>Layanan Engineering & Survei Gratis</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Butuh Penawaran Harga Spesial Pameran atau Uji Coba Benda Kerja?
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Tinggalkan kontak Anda di bawah ini. Tim engineering PT Dimensi Quantum Wahyudi akan mengirimkan
                katalog spesifikasi lengkap, estimasi ROI investasi, dan penawaran harga khusus pameran.
              </p>
              <div className="space-y-2 text-xs text-slate-700 pt-2">
                <div className="flex items-center gap-2">
                  <CheckCircle size={15} className="text-emerald-600" />
                  <span>Gratis survei lokasi pabrik & analisa ergonomi beban</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={15} className="text-emerald-600" />
                  <span>Kirimkan sampel benda kerja (karung/drum/karton) untuk uji hisap di workshop kami</span>
                </div>
              </div>
            </div>

            {/* Right Quick Form */}
            <div className="lg:col-span-6 bg-slate-50 border border-slate-200/90 rounded-2xl p-6 shadow-xs">
              {submitSuccess ? (
                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                    <Check size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-emerald-950">Terima Kasih!</h3>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Data Anda telah kami terima. Tim engineering kami akan segera menghubungi Anda melalui WhatsApp
                    untuk memberikan katalog lengkap dan penawaran khusus pameran.
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all"
                  >
                    Kirim Permintaan Lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitLead} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Contoh: Budi Santoso"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Nama Perusahaan / Pabrik
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Contoh: PT Manufaktur Logam Utama"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Nomor WhatsApp atau Email *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.phoneOrEmail}
                      onChange={(e) => setFormData({ ...formData, phoneOrEmail: e.target.value })}
                      placeholder="Contoh: 081234567890 atau budi@perusahaan.com"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Kebutuhan Solusi
                    </label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-cyan-600 transition-all"
                    >
                      <option value="Umum / Semua Brosur">Semua Lini Produk</option>
                      <option value="Vacuum Lifter JumboFlex (Karton/Kotak)">Vacuum Lifter JumboFlex (Karton/Kotak)</option>
                      <option value="Vacuum Lifter JumboErgo (Karung/Drum/Beban Berat)">Vacuum Lifter JumboErgo (Karung/Drum/Beban Berat)</option>
                      <option value="VacuMaster (Plat Logam / Lembaran Kaca / Kayu)">VacuMaster (Plat Logam / Lembaran Kaca / Kayu)</option>
                      <option value="Area Gripping Robot (Palletizing)">Area Gripping Robot (Palletizing)</option>
                      <option value="Komponen Vakum (Suction Cup & Ejector)">Komponen Vakum (Suction Cup & Ejector)</option>
                      <option value="Sistem Crane Aluminium & Jib Crane">Sistem Crane Aluminium & Jib Crane</option>
                    </select>
                  </div>

                  {submitError && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-cyan-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Mengirim Permintaan...</span>
                      </>
                    ) : (
                      <>
                        <span>Kirim Permintaan Penawaran Pameran</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Corporate Trust & Physical Address Section */}
        <section className="mt-16 text-center space-y-4 max-w-3xl mx-auto">
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">
            PT Dimensi Quantum Wahyudi
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Pergudangan Prima Sejahtera No. 1, Teluknaga, Tangerang, Banten 15510, Indonesia <br />
            Telp: +62 21 5596 6124 | WhatsApp Resmi: +62 811-1916-8752 | Email: sales@dimensiwahyudi.com
          </p>
        </section>
      </main>

      {/* Floating Bottom Action Bar for Mobile Visitors */}
      <aside aria-label="Aksi Cepat Booth" className="fixed bottom-4 left-4 right-4 z-40 md:hidden animate-in slide-in-from-bottom-5">
        <div className="bg-slate-950/95 text-white backdrop-blur-md p-3 rounded-2xl border border-slate-800 shadow-2xl flex items-center justify-between gap-3">
          <div className="pl-1">
            <span className="text-[11px] font-bold text-cyan-400 block">Butuh bantuan di Booth?</span>
            <span className="text-[10px] text-slate-400 block">Hubungi tim sales kami</span>
          </div>
          <a
            href={getGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-md shrink-0"
          >
            <PhoneCall size={14} />
            <span>Chat Sales Booth</span>
          </a>
        </div>
      </aside>
    </div>
  );
}
