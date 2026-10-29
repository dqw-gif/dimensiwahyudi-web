'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import PdfFlipbookViewer from '@/components/brosur/PdfFlipbookViewer';
import {
  Download,
  Share2,
  Search,
  CheckCircle,
  PhoneCall,
  ShieldCheck,
  Building2,
  ArrowRight,
  Eye,
  Check,
  Loader2,
  X,
  SlidersHorizontal,
} from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

export interface BrochureItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'ergonomics' | 'overview' | 'grippers' | 'automation';
  categoryLabel: string;
  categoryLabelId?: string;
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
    subtitle: 'JumboFlex, JumboErgo & VacuMaster Engineering Dossier',
    category: 'ergonomics',
    categoryLabel: 'Ergonomic Lifting Systems',
    categoryLabelId: 'Sistem Lifter Ergonomis',
    badge: 'Complete Catalog · 56 Pages',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    description:
      'Engineering reference for manual handling without spinal strain, covering sacks, packaging cartons, drums, pails, metal sheets, and timber panels.',
    specs: [
      'Lifting capacity up to 300 kg (Jumbo) and multi-ton sheets (VacuMaster)',
      'German AGR (Aktion Gesunder Rücken) Medical Ergonomic Certification',
      'Single-handed high-cycle control (JumboFlex) and dual-hand guidance (JumboErgo)',
      'Compatible with modular aluminum crane runway and articulated jib systems',
    ],
    applications: ['Warehouse & Logistics', 'Food & Beverage Processing', 'Pharma & Chemicals', 'Metal & Woodworking Fabrication'],
    pdfUrl: '/brochures/ergonomic-vacuum-lifters.pdf',
    coverImage: '/brochures/ergonomic-vacuum-lifters-cover.jpg',
    fileSize: '4.6 MB',
    pages: 56,
    featured: true,
  },
  {
    id: 'product-overview',
    title: 'Schmalz Industrial Handling Product Overview',
    subtitle: 'Vacuum Handling Ecosystem Summary',
    category: 'overview',
    categoryLabel: 'Summary Catalog',
    categoryLabelId: 'Katalog Ringkasan',
    badge: 'Quick Guide · 6 Pages',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    description:
      'Executive summary covering Schmalz Germany and Binar Handling Sweden vacuum systems. Ideal quick reference for plant managers, project engineers, and procurement teams.',
    specs: [
      'Visual overview of Vacuum Lifters, Crane Systems, and Binar Quick-Lift',
      'Decision matrix comparing manual lift assist vs robotic automation',
      'Working load limits table and runway layout options',
      'Compiled case studies from leading industrial manufacturing plants',
    ],
    applications: ['All Manufacturing Sectors', 'Plant Management', 'Procurement & Sourcing', 'EHS & Ergonomics Engineering'],
    pdfUrl: '/brochures/product-overview.pdf',
    coverImage: '/brochures/product-overview-cover.jpg',
    fileSize: '1.1 MB',
    pages: 6,
    featured: true,
  },
  {
    id: 'area-gripping',
    title: 'Large-Area Vacuum Gripping Systems',
    subtitle: 'Vacuum Grippers for Robotics & Palletizing Automation',
    category: 'grippers',
    categoryLabel: 'Robotics & EOAT Grippers',
    categoryLabelId: 'Robotika & EOAT Gripper',
    badge: 'Robotics & EOAT · 8 Pages',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    description:
      'Large-area vacuum gripper solutions (End-of-Arm Tooling) for articulated robot arms and gantry axes handling cartons, mixed-case palletizing, and porous panels.',
    specs: [
      'FMP, FXP, SBX, and SVE series with integrated intelligent valve technology',
      '100% secure grip retention even when up to 50% of gripper surface is uncovered',
      'Ready for integration with FANUC, KUKA, ABB, Yaskawa, and collaborative robots',
      'Durable sealing foam pads replaceable on-line in minutes',
    ],
    applications: ['Robot Palletizing & Depalletizing', 'Timber & Furniture Lines', 'Automotive & EV Battery Assembly', 'High-Speed Packaging Lines'],
    pdfUrl: '/brochures/area-gripping.pdf',
    coverImage: '/brochures/area-gripping-cover.jpg',
    fileSize: '2.5 MB',
    pages: 8,
  },
  {
    id: 'vacuum-automation',
    title: 'Vacuum Automation Components',
    subtitle: 'Suction Cups, Energy-Saving Ejectors & Smart Sensors',
    category: 'automation',
    categoryLabel: 'Automation Components',
    categoryLabelId: 'Komponen Otomasi Vakum',
    badge: 'Automation Components · 6 Pages',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    description:
      'Precision vacuum components for high-speed pick-and-place, carton erecting, packaging equipment, and Industry 4.0 production cells.',
    specs: [
      'Extensive suction cup range (NBR, FDA food-grade silicone, Elastodur)',
      'Compact intelligent ejectors SCPS/SCPSi with IO-Link digital telemetry',
      'Automatic air-saving regulation reducing compressed air usage up to 80%',
      'Spring plungers, in-line vacuum filters, and digital pressure switches',
    ],
    applications: ['Automated Packaging Machinery', 'Electronics & Semiconductor Assembly', 'Sterile Food & Beverage Packaging', 'High-Cycle Transfer Feeders'],
    pdfUrl: '/brochures/vacuum-automation.pdf',
    coverImage: '/brochures/vacuum-automation-cover.jpg',
    fileSize: '762 KB',
    pages: 6,
  },
];

export default function BrochuresClient() {
  const { lang } = useLanguage();
  const isId = lang === 'id';

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [flipbookBrochure, setFlipbookBrochure] = useState<BrochureItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phoneOrEmail: '',
    interest: 'All Product Lines',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const CATEGORIES = isId
    ? [
        { id: 'all', label: 'Semua Katalog (4)' },
        { id: 'ergonomics', label: 'Ergonomic Lifters' },
        { id: 'overview', label: 'Panduan Ringkas' },
        { id: 'grippers', label: 'Robotika & Grippers' },
        { id: 'automation', label: 'Komponen Otomasi' },
      ]
    : [
        { id: 'all', label: 'All Catalogs (4)' },
        { id: 'ergonomics', label: 'Ergonomic Lifters' },
        { id: 'overview', label: 'Summary Guides' },
        { id: 'grippers', label: 'Robotics & Grippers' },
        { id: 'automation', label: 'Automation Components' },
      ];

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
    const text = `Hello DQW Engineering Team, I am reviewing the "${brochure.title}" brochure (${fullUrl}). I would like to request technical specifications and pricing details for our manufacturing plant.`;
    return `https://wa.me/6281119168752?text=${encodeURIComponent(text)}`;
  };

  const getGeneralWhatsAppUrl = () => {
    const text =
      'Hello DQW Engineering Team, I am browsing your digital brochure catalog. I would like to speak directly with an application engineer.';
    return `https://wa.me/6281119168752?text=${encodeURIComponent(text)}`;
  };

  // Lead Form submission
  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phoneOrEmail.trim()) {
      setSubmitError(
        isId
          ? 'Nama lengkap dan nomor WhatsApp atau email perusahaan wajib diisi.'
          : 'Name and WhatsApp number or corporate email are required.'
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const payload = {
        name: formData.name.trim(),
        company: formData.company.trim() || 'Digital Catalog Visitor',
        email: formData.phoneOrEmail.includes('@') ? formData.phoneOrEmail.trim() : 'visitor@dimensiwahyudi.com',
        message: `Catalog Consultation Request. Contact Info: ${formData.phoneOrEmail}. System Interest: ${formData.interest}`,
      };

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitSuccess(true);
        setFormData({ name: '', company: '', phoneOrEmail: '', interest: 'All Product Lines' });
      } else {
        setSubmitError(
          isId
            ? 'Terjadi kendala saat pengiriman. Silakan hubungi kami melalui WhatsApp.'
            : 'An issue occurred during submission. Please reach us via WhatsApp.'
        );
      }
    } catch {
      setSubmitError(
        isId
          ? 'Kendala koneksi jaringan. Silakan hubungi kami melalui WhatsApp.'
          : 'Network connection issue. Please contact us via WhatsApp.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-[#005596] selection:text-white pb-24">
      {/* Top Welcome Alert Banner */}
      <section className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 text-white border-b border-blue-800/40 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#005596] text-white font-black text-[10px]">
              ★
            </span>
            <span className="font-semibold text-slate-200">
              {isId ? (
                <>
                  Selamat Datang di Portal Brosur Teknis Resmi <strong className="text-white">PT Dimensi Quantum Wahyudi</strong>
                </>
              ) : (
                <>
                  Welcome to the Official Technical Brochure Portal of <strong className="text-white">PT Dimensi Quantum Wahyudi</strong>
                </>
              )}
            </span>
          </div>
          <a
            href={getGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-[11px] transition-all shrink-0 shadow-xs"
          >
            <PhoneCall size={12} />
            <span>{isId ? 'Chat Tim Sales Engineering' : 'Chat with Sales Engineering'}</span>
          </a>
        </div>
      </section>

      {/* Main Hero Header */}
      <header className="relative pt-12 pb-16 md:py-20 bg-white border-b border-slate-200 overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(148, 163, 184, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.15) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#005596]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          {/* Brand Partner Badges */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold">
            <span className="text-[#005596]">{isId ? 'Distributor Resmi' : 'Official Distributor'}</span>
            <span>·</span>
            <span>Schmalz Germany</span>
            <span>·</span>
            <span>Binar Handling Sweden</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            {isId ? 'Katalog Teknis & Brosur Digital' : 'Technical Catalogs & Digital Brochures'} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005596] to-[#1d4ed8]">
              {isId ? 'Solusi Material Handling Industri' : 'Industrial Handling Solutions'}
            </span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            {isId
              ? 'Akses langsung spesifikasi teknis, kapasitas angkat (SWL), dan gambar integrasi sistem melalui smartphone maupun desktop Anda.'
              : 'Direct access to engineering specifications, lifting capacities, and system integration drawings directly on your smartphone or desktop without carrying paper brochures.'}
          </p>

          {/* Quick Stats Banner */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-[#005596]" />
              <span>{isId ? 'Sertifikasi Medis AGR Jerman' : 'German AGR Medical Certification'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle size={16} className="text-[#005596]" />
              <span>{isId ? 'Teruji Beban Pabrik & Bergaransi Resmi' : 'Factory Load Tested & Warranty'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Building2 size={16} className="text-[#005596]" />
              <span>{isId ? 'Survei Engineering Lini Gratis' : 'Complimentary Engineering Survey'}</span>
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
                placeholder={
                  isId
                    ? 'Cari katalog: JumboFlex, VacuMaster, grippers, suction cup...'
                    : 'Search catalogs: sacks, cartons, grippers, robotics, suction cups...'
                }
                className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#005596] focus:ring-1 focus:ring-[#005596]/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Total Count */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 w-full md:w-auto justify-end">
              <span>
                {isId
                  ? `Menampilkan ${filteredBrochures.length} katalog PDF resmi`
                  : `Displaying ${filteredBrochures.length} official PDF catalogs`}
              </span>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1 scrollbar-none">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
              <SlidersHorizontal size={12} /> Filter:
            </span>
            <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-2xl border border-slate-200/80 w-max">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`relative px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'text-white'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeBrochureCategory"
                        className="absolute inset-0 bg-gradient-to-r from-[#005596] to-[#0077c8] rounded-xl shadow-[0_4px_12px_rgba(0,85,150,0.3)] ring-1 ring-inset ring-white/20"
                        transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Brochure Cards Grid */}
        <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-stretch">
          {filteredBrochures.map((brochure) => (
            <article
              key={brochure.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-[#005596]/30 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div
                  onClick={() => setFlipbookBrochure(brochure)}
                  className="relative aspect-[1/1.38] bg-slate-100 overflow-hidden cursor-pointer"
                >
                  <Image
                    src={brochure.coverImage}
                    alt={brochure.title}
                    fill
                    className="object-cover object-top group-hover:scale-103 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute top-0 bottom-0 left-0 w-3 bg-gradient-to-r from-black/20 via-black/5 to-transparent pointer-events-none" />

                  {/* Hover Quick Read Cue */}
                  <div className="absolute inset-0 bg-[#005596]/0 group-hover:bg-[#005596]/15 transition-colors flex items-center justify-center pointer-events-none">
                    <span className="opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-200 px-3 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5 shadow-lg">
                      <Eye size={13} className="text-[#0077c8]" />
                      <span>{isId ? 'Buka Flipbook' : 'Open Flipbook'}</span>
                    </span>
                  </div>
                </div>

                {/* Title & Category Info */}
                <div className="p-4 sm:p-5 pb-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#005596] block mb-1">
                    {isId ? brochure.categoryLabelId || brochure.categoryLabel : brochure.categoryLabel}
                  </span>
                  <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight leading-snug line-clamp-2 group-hover:text-[#005596] transition-colors">
                    {brochure.title}
                  </h2>
                </div>
              </div>

              {/* Action Buttons Bar */}
              <div className="p-4 sm:p-5 pt-0 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  {/* 1. Open Flipbook */}
                  <button
                    type="button"
                    onClick={() => setFlipbookBrochure(brochure)}
                    className="flex-1 py-2.5 px-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                    title={isId ? 'Buka brosur digital interaktif' : 'Open interactive digital brochure'}
                  >
                    <Eye size={14} className="text-[#005596]" />
                    <span>{isId ? 'Baca' : 'Read'}</span>
                  </button>

                  {/* 2. Direct Download */}
                  <a
                    href={brochure.pdfUrl}
                    download
                    className="flex-1 py-2.5 px-2 rounded-xl bg-[#005596] hover:bg-[#00447a] text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    title="Direct PDF download"
                  >
                    <Download size={14} />
                    <span>Download ({brochure.fileSize})</span>
                  </a>

                  {/* 3. Share Button */}
                  <a
                    href={getWhatsAppShareUrl(brochure)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-500 border border-slate-200/80 transition-colors shrink-0 cursor-pointer"
                    title="Share via WhatsApp"
                    aria-label={`Share ${brochure.title}`}
                  >
                    <Share2 size={15} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Consultation & Workpiece Sampling Request Card */}
        <section className="mt-20 relative rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] p-8 md:p-12 lg:p-14 overflow-hidden">
          <div
            className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[450px] h-[320px] bg-[#005596]/5 rounded-full blur-[140px] pointer-events-none"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Column: Heading & Engineering Value */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-[#005596]/15 shadow-[0_2px_10px_rgba(0,85,150,0.06)]">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#005596]">
                  {isId ? 'Konsultasi Teknik & Uji Sampel Workpiece' : 'Engineering Advisory & Workpiece Testing'}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                {isId ? 'Butuh Proposal Teknis atau ' : 'Need a Custom Proposal or '}
                <span className="bg-gradient-to-r from-[#005596] to-[#1d4ed8] bg-clip-text text-transparent">
                  {isId ? 'Trial Angkat Workpiece?' : 'Workpiece Lifting Trial?'}
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                {isId
                  ? 'Kirimkan spesifikasi workpiece Anda atau jadwalkan trial onsite (karung, karton, plat besi, drum) bersama tim engineer aplikasi PT Dimensi Quantum Wahyudi. Kami siap menyusun simulasi cycle time dan kalkulasi ROI.'
                  : 'Submit your workpiece specifications or schedule an on-site vacuum suction trial (sacks, cartons, sheet metal, drums) with PT Dimensi Quantum Wahyudi application engineers. We provide cycle simulations and ROI calculations.'}
              </p>

              <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#005596]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={13} className="text-[#005596] stroke-[2.5]" />
                  </div>
                  <span className="font-medium">
                    {isId
                      ? 'Survei area pabrik dan evaluasi ergonomi stasiun kerja tanpa biaya'
                      : 'Complimentary plant floor survey and ergonomic task evaluation'}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#005596]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={13} className="text-[#005596] stroke-[2.5]" />
                  </div>
                  <span className="font-medium">
                    {isId
                      ? 'Uji angkat langsung (trial) menggunakan material asli Anda di workshop kami atau di pabrik Anda'
                      : 'Live workpiece lifting trials at our workshop or on your production floor'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Lead Capture Form */}
            <div className="lg:col-span-6 bg-slate-50/80 backdrop-blur-xl border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
              {submitSuccess ? (
                <div className="p-8 bg-emerald-50/90 rounded-2xl border border-emerald-200 text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                    <Check size={22} className="stroke-[2.5]" />
                  </div>
                  <h3 className="text-lg font-bold text-emerald-950">
                    {isId ? 'Permintaan Diterima' : 'Request Received'}
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
                    {isId
                      ? 'Tim engineer aplikasi kami akan segera menghubungi Anda untuk meninjau spesifikasi beban dan menjadwalkan sesi trial.'
                      : 'Our application engineering team will contact you promptly to review your lifting specifications and arrange trial testing.'}
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-full transition-all cursor-pointer"
                  >
                    {isId ? 'Kirim Permintaan Lainnya' : 'Submit Another Request'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitLead} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      {isId ? 'Nama Lengkap *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={isId ? 'Contoh: Budi Santoso' : 'e.g. John Doe'}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#005596] focus:ring-2 focus:ring-[#005596]/15 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      {isId ? 'Nama Perusahaan / Pabrik' : 'Company / Plant Name'}
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder={isId ? 'Contoh: PT Manufaktur Indonesia' : 'e.g. PT Manufacturing Industries'}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#005596] focus:ring-2 focus:ring-[#005596]/15 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      {isId ? 'Email Perusahaan atau WhatsApp *' : 'Corporate Email or WhatsApp *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.phoneOrEmail}
                      onChange={(e) => setFormData({ ...formData, phoneOrEmail: e.target.value })}
                      placeholder={isId ? 'nama@perusahaan.com atau +62 812...' : 'e.g. name@company.com or +62 812 3456 7890'}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#005596] focus:ring-2 focus:ring-[#005596]/15 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      {isId ? 'Fokus Sistem yang Diminati' : 'Selected Solution Focus'}
                    </label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#005596] focus:ring-2 focus:ring-[#005596]/15 transition-all cursor-pointer"
                    >
                      <option value="All Product Lines">{isId ? 'Semua Lini Produk' : 'All Product Lines'}</option>
                      <option value="Vacuum Lifter JumboFlex (Boxes & Cartons)">
                        Vacuum Lifter JumboFlex (Boxes &amp; Cartons)
                      </option>
                      <option value="Vacuum Lifter JumboErgo (Sacks, Drums & Heavy Loads)">
                        Vacuum Lifter JumboErgo (Sacks, Drums &amp; Heavy Loads)
                      </option>
                      <option value="VacuMaster (Sheet Metal, Glass & Timber)">
                        VacuMaster (Sheet Metal, Glass &amp; Timber)
                      </option>
                      <option value="Robotic Area Gripping (Palletizing)">
                        Robotic Area Gripping (Palletizing)
                      </option>
                      <option value="Vacuum Components (Suction Cups & Ejectors)">
                        Vacuum Components (Suction Cups &amp; Ejectors)
                      </option>
                      <option value="Aluminum Crane & Jib Crane Systems">
                        Aluminum Crane &amp; Jib Crane Systems
                      </option>
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
                    className="w-full py-3.5 px-6 rounded-full bg-[#005596] hover:bg-[#004276] active:scale-[0.99] text-white font-bold text-sm shadow-[0_4px_16px_rgba(0,85,150,0.25)] hover:shadow-[0_8px_24px_rgba(0,85,150,0.35)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>{isId ? 'Mengirim Permintaan...' : 'Submitting Request...'}</span>
                      </>
                    ) : (
                      <>
                        <span>{isId ? 'Jadwalkan Konsultasi Teknis' : 'Request Technical Consultation'}</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Floating Bottom Action Bar for Mobile Visitors */}
      <aside aria-label="Quick Contact Action" className="fixed bottom-4 left-4 right-4 z-40 md:hidden animate-in slide-in-from-bottom-5">
        <div className="bg-slate-950/95 text-white backdrop-blur-md p-3 rounded-2xl border border-slate-800 shadow-2xl flex items-center justify-between gap-3">
          <div className="pl-1">
            <span className="text-[11px] font-bold text-blue-300 block">
              {isId ? 'Butuh panduan teknis?' : 'Need engineering guidance?'}
            </span>
            <span className="text-[10px] text-slate-400 block">
              {isId ? 'Hubungi tim sales engineering kami' : 'Contact our technical sales team'}
            </span>
          </div>
          <a
            href={getGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-md shrink-0 cursor-pointer"
          >
            <PhoneCall size={14} />
            <span>Chat Sales</span>
          </a>
        </div>
      </aside>

      {/* Interactive 3D PDF Flipbook Viewer Modal */}
      <PdfFlipbookViewer
        brochure={flipbookBrochure}
        onClose={() => setFlipbookBrochure(null)}
      />
    </div>
  );
}
