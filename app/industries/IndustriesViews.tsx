'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Apple,
  Beaker,
  Car,
  Package,
  Factory,
  HardHat,
  Cpu,
  Layers,
  ChevronRight,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { industries, IndustryDef } from '@/data/industries';
import { VTLVariant } from '@/data/products/vacuum-tube-lifters';
import { localizeProduct } from '@/data/products/translations_id';
import PreFooterCTA from '@/components/PreFooterCTA';
import { useLanguage } from '@/components/LanguageProvider';

const getIcon = (type: IndustryDef['iconType']) => {
  switch (type) {
    case 'food':
      return <Apple size={28} />;
    case 'flask':
      return <Beaker size={28} />;
    case 'car':
      return <Car size={28} />;
    case 'box':
      return <Package size={28} />;
    case 'hard-hat':
      return <HardHat size={28} />;
    case 'cpu':
      return <Cpu size={28} />;
    case 'factory':
    default:
      return <Factory size={28} />;
  }
};

export function IndustriesIndexClient() {
  const { lang } = useLanguage();
  const isId = lang === 'id';

  return (
    <main className="min-h-screen bg-slate-50 selection:bg-[#005596] selection:text-white">
      {/* HERO SECTION */}
      <section className="relative pt-36 pb-20 bg-gradient-to-b from-[#005596]/[0.05] via-slate-50/60 to-slate-50 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#005596_1px,transparent_1px),linear-gradient(to_bottom,#005596_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.03] pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#005596]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#005596]/10 border border-[#005596]/20 rounded-full text-[#005596] text-xs font-bold uppercase tracking-wider mb-6 shadow-xs backdrop-blur-sm">
            <Layers size={14} className="text-[#005596]" />{' '}
            {isId ? 'Solusi Material Handling Spesifik Industri' : 'Industry Specific Handling Solutions'}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight mb-6 max-w-4xl mx-auto">
            {isId ? (
              <>
                Solusi Vacuum Handling untuk <span className="text-[#005596]">Setiap Sektor Industri</span>
              </>
            ) : (
              <>
                Vacuum Handling Solutions for <span className="text-[#005596]">Every Industry</span>
              </>
            )}
          </h1>
          <p className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            {isId
              ? 'Mulai dari ruang cleanroom farmasi yang steril hingga fasilitas stamping logam berat, sistem lifter ergonomis kami dirancang khusus untuk menjawab tantangan angkat beban di sektor Anda.'
              : "From sterile pharmaceutical clean-rooms to abrasive metal stamping facilities, our ergonomic lifters are engineered specifically to conquer your sector's toughest handling challenges."}
          </p>
        </div>
      </section>

      {/* INDUSTRIES GRID */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((ind) => {
              const title = isId ? ind.nameId : ind.name;
              const tagline = isId ? ind.taglineId : ind.tagline;
              return (
                <Link
                  href={`/industries/${ind.slug}`}
                  key={ind.slug}
                  className="group relative bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-slate-900/5 hover:ring-[#005596]/25 rounded-3xl p-8 hover:shadow-[0_20px_45px_-12px_rgba(0,85,150,0.15)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col h-full shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]"
                >
                  <div className="relative z-10 flex-1">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-[#005596]/10 text-[#005596] ring-1 ring-[#005596]/15 group-hover:bg-[#005596] group-hover:text-white group-hover:ring-transparent transition-all duration-300 shadow-xs">
                      {getIcon(ind.iconType)}
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 group-hover:text-[#005596] transition-colors mb-3 tracking-tight">
                      {title}
                    </h2>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6">{tagline}</p>
                  </div>

                  <div className="relative z-10 mt-auto pt-6 border-t border-slate-100 flex items-center justify-between font-bold text-sm text-[#005596] group-hover:text-[#00447a] transition-colors">
                    <span>{isId ? 'Lihat Solusi' : 'View Solutions'}</span>
                    <ArrowRight size={16} className="translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRE-FOOTER CTA */}
      <PreFooterCTA
        badge={isId ? 'SOLUSI INDUSTRI KUSTOM' : 'CUSTOM INDUSTRIAL SOLUTIONS'}
        title={
          isId ? (
            <>
              Sektor Industri Anda Belum Tercantum? <br className="hidden sm:inline" />
              Kami Rancangkan Konfigurasi Khusus.
            </>
          ) : (
            <>
              Industry Sector Not Listed Above? <br className="hidden sm:inline" />
              Let Us Engineer a Tailored Configuration.
            </>
          )
        }
        description={
          isId
            ? 'Teknologi vakum Schmalz dan Binar Quick-Lift Systems dapat disesuaikan secara modular untuk ribuan profil workpiece industri. Hubungi tim engineer aplikasi kami untuk merancang sistem yang presisi bagi lini produksi Anda.'
            : 'Schmalz vacuum technology and Binar articulated lift arms adapt modularly to thousands of industrial workpiece profiles. Contact our engineering team to design a precise solution for your production line.'
        }
        primaryBtnText={isId ? 'Jadwalkan Konsultasi Teknis' : 'Request Technical Consultation'}
        primaryBtnHref="/contact"
        secondaryBtnText={isId ? 'Hubungi via WhatsApp' : 'WhatsApp Engineering Support'}
        secondaryBtnHref="https://wa.me/6281119168752?text=Hello%20DQW,%20I%20would%20like%20to%20consult%20regarding%20an%20industrial%20handling%20solution"
      />
    </main>
  );
}

export function IndustryDetailClient({
  industry,
  recommendedLifters,
}: {
  industry: IndustryDef;
  recommendedLifters: VTLVariant[];
}) {
  const { lang } = useLanguage();
  const isId = lang === 'id';

  const displayTitle = isId ? industry.nameId : industry.name;
  const displayTagline = isId ? industry.taglineId : industry.tagline;
  const displayDesc = isId ? industry.descriptionId : industry.description;
  const displayPainPoints = isId ? industry.painPointsId : industry.painPoints;

  return (
    <>
      {/* HERO */}
      <section className="relative pt-36 pb-24 bg-slate-950 overflow-hidden">
        {industry.imageUrl && (
          <Image
            src={industry.imageUrl}
            alt={displayTitle}
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-40"
          />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-[#005596]/60 backdrop-blur-[1px]" />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="inline-flex items-center gap-2 text-slate-300 text-xs mb-8 flex-wrap bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 shadow-sm">
            <Link href="/" className="hover:text-white transition-colors">
              {isId ? 'Beranda' : 'Home'}
            </Link>
            <ChevronRight size={12} className="text-slate-400" />
            <Link href="/industries" className="hover:text-white transition-colors">
              {isId ? 'Industri' : 'Industries'}
            </Link>
            <ChevronRight size={12} className="text-slate-400" />
            <span className="text-white font-bold">{displayTitle}</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/15 border border-white/25 rounded-full text-white text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-md shadow-sm">
              {isId ? 'Fokus Industri' : 'Industry Focus'}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6">
              <span className="text-blue-200/90 font-medium block text-xl md:text-2xl mb-2">
                {isId ? 'Solusi Material Handling untuk' : 'Handling Solutions for'}
              </span>
              {displayTitle}
            </h1>
            <p className="text-lg md:text-2xl text-blue-100/90 font-normal leading-relaxed max-w-3xl">
              {displayTagline}
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-20 bg-gradient-to-b from-white via-slate-50/50 to-white relative">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Overview */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#005596]/10 text-[#005596] text-xs font-bold uppercase tracking-wider ring-1 ring-[#005596]/15">
              {isId ? 'Tinjauan Operasional' : 'Industry Overview'}
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {isId ? 'Mengatasi Hambatan Fisik di Lini Produksi' : 'Overcoming Physical Constraints'}
            </h2>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed">{displayDesc}</p>

            <div className="pt-2 flex justify-center sm:justify-start">
              <a
                href="#solutions"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#005596] to-[#1d4ed8] hover:from-[#00447a] hover:to-[#1e40af] text-white font-bold rounded-xl transition-all shadow-[0_6px_20px_-3px_rgba(0,85,150,0.35)] hover:shadow-[0_10px_25px_-3px_rgba(0,85,150,0.45)] hover:-translate-y-0.5 active:translate-y-0 text-sm md:text-base text-center"
              >
                {isId ? 'Lihat Rekomendasi Alat' : 'See Recommended Equipment'} <ArrowRight size={18} />
              </a>
            </div>
          </div>

          {/* Pain Points */}
          <div className="bg-white/85 backdrop-blur-xl border border-white/90 ring-1 ring-slate-900/5 p-8 md:p-10 rounded-3xl shadow-[0_12px_36px_-6px_rgba(0,0,0,0.06)] relative overflow-hidden">
            <div className="flex items-center gap-3.5 mb-8">
              <div className="w-12 h-12 bg-red-500/10 ring-1 ring-red-500/20 rounded-2xl flex items-center justify-center text-red-600 shrink-0">
                <AlertCircle size={22} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                {isId ? 'Kendala Umum di Lapangan' : 'Common Pain Points'}
              </h3>
            </div>
            <ul className="space-y-5">
              {displayPainPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-red-500/10 ring-1 ring-red-500/20 flex items-center justify-center text-red-600 text-xs font-bold">
                    {idx + 1}
                  </div>
                  <p className="text-slate-700 text-sm md:text-base font-medium leading-relaxed">{point}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* RECOMMENDED SOLUTIONS */}
      <section id="solutions" className="py-24 bg-slate-50 border-t border-slate-200/80 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#005596]/10 text-[#005596] text-xs font-bold uppercase tracking-wider ring-1 ring-[#005596]/15 mb-4">
              {isId ? 'Teknologi Teruji' : 'Proven Machinery'}
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              {isId ? 'Rekomendasi Sistem Schmalz' : 'Recommended Schmalz Lifters'}
            </h2>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed">
              {isId ? (
                <>
                  Tim engineer kami merekomendasikan konfigurasi Vacuum Tube Lifter berikut untuk menjawab tuntutan operasional di sektor{' '}
                  <strong className="text-slate-900 font-bold">{displayTitle}</strong>.
                </>
              ) : (
                <>
                  Our engineering team has identified these vacuum tube lifters as the optimal configurations for the unique demands of the{' '}
                  <strong className="text-slate-900 font-bold">{displayTitle}</strong> sector.
                </>
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendedLifters.map((rawProduct) => {
              const product = localizeProduct(rawProduct, lang);
              return (
                <Link
                  href={`/products/schmalz/vacuum-tube-lifter/${product.slug}`}
                  key={product.slug}
                  className="group bg-white/80 backdrop-blur-xl rounded-3xl border border-white/90 ring-1 ring-slate-900/5 overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(0,85,150,0.14)] hover:border-[#005596]/30 hover:ring-[#005596]/20 hover:-translate-y-1.5 transition-all duration-300 flex flex-col shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]"
                >
                  <div className="h-56 bg-slate-100 p-6 relative flex flex-col justify-between border-b border-slate-100 overflow-hidden">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <Layers className="absolute -bottom-4 -right-4 w-32 h-32 text-slate-200 opacity-50 group-hover:scale-110 transition-transform duration-500" />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-slate-950/40 pointer-events-none" />

                    <div className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1 bg-[#005596] rounded-lg text-[10px] text-white font-bold uppercase tracking-wider w-fit shadow-md backdrop-blur-md">
                      {product.badge || (isId ? 'Seri Standar' : 'Standard Series')}
                    </div>
                    <div className="relative z-10 mt-auto">
                      <h4 className="text-2xl font-black text-white drop-shadow-md tracking-tight">
                        {product.seriesCode}
                      </h4>
                      <p className="text-blue-100/90 font-bold font-mono text-xs mt-1 drop-shadow-md">
                        {isId ? 'Kapasitas' : 'Cap'}: {product.capacity}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-slate-600 text-sm mb-6 flex-1 line-clamp-3 leading-relaxed">
                      {product.tagline}
                    </p>

                    <ul className="space-y-2.5 mb-6 text-sm text-slate-600 font-medium">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />{' '}
                        {isId ? 'Ideal untuk sektor industri ini' : 'Ideal for this industry'}
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />{' '}
                        {isId ? 'Sertifikasi Ergonomi AGR' : 'Ergonomic Certification'}
                      </li>
                    </ul>

                    <div className="w-full py-3 bg-[#005596]/10 rounded-xl text-center text-sm font-bold text-[#005596] group-hover:bg-[#005596] group-hover:text-white transition-all duration-200 ring-1 ring-[#005596]/15 group-hover:ring-transparent">
                      {isId ? 'Lihat Spesifikasi' : 'View Specifications'}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
