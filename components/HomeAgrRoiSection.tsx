'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

export default function HomeAgrRoiSection() {
  const { lang } = useLanguage();
  const isId = lang === 'id';

  return (
    <section id="roi-calculator" className="py-20 lg:py-24 bg-gradient-to-b from-slate-50/60 via-white to-slate-50/70 border-b border-slate-200/80 relative overflow-hidden">
      {/* Ambient Royal Blue Light Refraction */}
      <div
        className="absolute top-24 right-1/4 w-[480px] h-[480px] bg-[#005596]/8 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-24 left-10 w-[440px] h-[440px] bg-blue-600/7 rounded-full blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Part: The Science of Spinal Ergonomics (AGR Germany) */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 pb-16 border-b border-slate-200/80">
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-[#005596]/15 shadow-[0_2px_10px_rgba(0,85,150,0.06)] rounded-full text-xs font-semibold text-[#005596]">
              <ShieldCheck className="w-4 h-4 text-[#005596]" />
              <span>
                {isId
                  ? 'Sertifikasi Medis AGR e.V. (Aktion Gesunder Rücken Jerman)'
                  : 'AGR e.V. Medical Certification (Aktion Gesunder Rücken Germany)'}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {isId
                ? 'Validasi Klinis: Mencegah Cedera Tulang Belakang dan Gangguan Otot Rangka di Pabrik'
                : 'Clinical Validation: Preventing Spinal Strain and Workplace Musculoskeletal Disorders'}
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {isId
                ? 'Aktivitas angkat manual berulang memicu lebih dari 35% izin sakit di industri manufaktur akibat cedera punggung bawah. Seluruh unit Vacuum Tube Lifter Schmalz telah disertifikasi oleh asosiasi medis ortopedi independen di Jerman untuk memastikan postur operator tetap tegak dan terlindungi sepanjang shift kerja.'
                : 'Repetitive manual lifting causes more than 35% of manufacturing sick leave through lower-back musculoskeletal injuries. All Schmalz vacuum tube lifters are certified by independent German orthopedic medical associations, ensuring operator postures remain upright and protected during continuous lifting shifts.'}
            </p>

            {/* Clean Editorial Feature Points */}
            <div className="grid sm:grid-cols-2 gap-5 pt-3">
              <div className="flex items-start gap-3 text-left">
                <div className="w-5 h-5 rounded-full bg-blue-50/90 border border-blue-200/60 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#005596]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                    {isId ? 'Eliminasi Kompresi Sendi Tulang L4/L5' : 'Elimination of L4/L5 Disc Compression'}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1">
                    {isId
                      ? 'Mengalihkan 100% beban gravitasi workpiece dari otot tulang belakang ke tabung angkat vakum pneumatik.'
                      : 'Transfers 100% of workpiece gravitational load from spinal muscles into pneumatic vacuum lift tubes.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-left">
                <div className="w-5 h-5 rounded-full bg-blue-50/90 border border-blue-200/60 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#005596]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                    {isId ? 'Standar K3 & Ergonomi Internasional' : 'Global Ergonomics Compliance'}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1">
                    {isId
                      ? 'Memenuhi standar manual handling ISO 11228 serta regulasi keselamatan dan kesehatan kerja Eropa.'
                      : 'Complies with ISO 11228 manual handling standards and European workplace health directives.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Certificate Floating Brand Asset */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center text-center py-2">
            <div className="relative w-44 sm:w-52 h-40 sm:h-44 mx-auto mb-4 drop-shadow-md transition-transform duration-300 hover:scale-105">
              <Image
                src="/agr-seal.webp"
                alt="Official German AGR Medical Approval Seal for Schmalz"
                fill
                sizes="(max-width: 640px) 176px, 208px"
                className="object-contain"
                priority
              />
            </div>
            <a
              href="https://media.schmalz.com/MAM_Library/Dokumente/Publikation/Flyer/2a273ef199be_Flyer_AGR-Seal-of-Approval_Schmalz_2022_en-EN.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 hover:bg-white border border-slate-200/90 hover:border-[#005596]/40 shadow-xs hover:shadow-md text-xs font-bold text-[#005596] transition-all group"
            >
              <span>{isId ? 'Download Sertifikat Resmi AGR (PDF)' : 'Download Official AGR Certificate (PDF)'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <span className="text-[11px] text-slate-400 mt-2 font-medium">
              {isId
                ? 'Aktion Gesunder Rücken e.V. • Diterbitkan untuk J. Schmalz GmbH'
                : 'Aktion Gesunder Rücken e.V. • Issued to J. Schmalz GmbH'}
            </span>
          </div>
        </div>

        {/* Bottom Part: The Economics & ROI Calculator Teaser */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl text-left">
            <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-[#005596]/15 shadow-[0_2px_10px_rgba(0,85,150,0.06)] text-xs font-mono font-bold uppercase tracking-widest text-[#005596]">
              {isId ? 'Kalkulasi Finansial & Efisiensi Ergonomi' : 'Financial Calculation & Ergonomic Engineering'}
            </span>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {isId
                ? 'Hitung Estimasi ROI untuk Lini Produksi Pabrik Anda'
                : 'Calculate Projected Return on Investment for Your Plant'}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              {isId
                ? 'Gunakan ROI Calculator interaktif kami untuk menghitung penghematan izin sakit operator, peningkatan throughput lini packing, dan estimasi waktu balik modal berdasarkan data shift aktual Anda.'
                : 'Use our digital calculator to model sick-leave reductions, packaging throughput gains, and expected equipment payback timelines based on your shift data.'}
            </p>
          </div>
          <Link
            href="/digital-assistant/roi-calculator"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#005596] hover:bg-[#004276] text-white text-sm font-bold rounded-full shadow-[0_4px_16px_rgba(0,85,150,0.25)] hover:shadow-[0_8px_24px_rgba(0,85,150,0.35)] hover:-translate-y-0.5 transition-all shrink-0 w-full md:w-auto group"
          >
            <span>{isId ? 'Buka ROI Calculator Interaktif' : 'Open Interactive ROI Calculator'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
