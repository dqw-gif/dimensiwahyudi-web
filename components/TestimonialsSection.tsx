'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Quote, ArrowRight } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

interface CaseStudy {
  company: string;
  division: string;
  divisionId: string;
  speaker: string;
  logo: string;
  quoteBefore: string;
  quoteBeforeId: string;
  quoteHighlight: string;
  quoteHighlightId: string;
  quoteMiddle: string;
  quoteMiddleId: string;
  quoteHighlight2: string;
  quoteHighlight2Id: string;
  quoteEnd: string;
  photo: string;
}

const caseStudies: CaseStudy[] = [
  {
    company: 'PT Toyota Astra Motor',
    division: 'Receiving & Logistics Team',
    divisionId: 'Tim Receiving & Logistik',
    speaker: 'Abdullah Mubarok',
    logo: '/logos/client(5).svg',
    quoteBefore: 'We operate the JumboFlex system in our logistics receiving bays. This equipment makes ',
    quoteBeforeId: 'Kami mengoperasikan sistem JumboFlex di area receiving logistik kami. Unit ini membuat ',
    quoteHighlight: 'repetitive handling significantly safer and lighter for operators',
    quoteHighlightId: 'pemindahan barang berulang jauh lebih aman dan ringan bagi operator',
    quoteMiddle: ', resulting in a measurable drop in workplace musculoskeletal risks. Beyond hardware reliability, DQW’s engineering crew provides ',
    quoteMiddleId: ', sehingga risiko cedera otot dan tulang belakang turun signifikan. Selain kehandalan unitnya, tim engineering DQW memberikan ',
    quoteHighlight2: 'dependable technical support from on-site trials through ongoing after-sales service.',
    quoteHighlight2Id: 'dukungan teknis yang responsif sejak trial onsite hingga aftersales service berkala.',
    quoteEnd: '',
    photo: '/testimonials/abdullah.webp',
  },
  {
    company: 'PT Evoluzione Tyres (Pirelli Group)',
    division: 'Project Procurement Division',
    divisionId: 'Divisi Project Procurement',
    speaker: 'Anang Wahyudi',
    logo: '/logos/pirelli.svg',
    quoteBefore: 'We selected Schmalz lifters in strict alignment with ',
    quoteBeforeId: 'Kami memilih unit pengangkat Schmalz sesuai dengan ',
    quoteHighlight: 'safety standards specified by our Italian headquarters',
    quoteHighlightId: 'standar keselamatan kerja yang ditetapkan kantor pusat kami di Italia',
    quoteMiddle: ', and PT Dimensi Quantum Wahyudi proved their execution capacity as an authorized partner. Their engineering response was prompt and the installation ',
    quoteMiddleId: ', dan PT Dimensi Quantum Wahyudi membuktikan kapasitas eksekusi mereka sebagai partner resmi. Respon teknis mereka sangat cepat dan instalasinya ',
    quoteHighlight2: 'measurably improved line throughput and operator ergonomic safety.',
    quoteHighlight2Id: 'terbukti meningkatkan throughput lini serta keamanan ergonomi operator.',
    quoteEnd: '',
    photo: '/testimonials/anang.webp',
  },
  {
    company: 'PT Gajah Tunggal, Tbk',
    division: 'Industrial Engineering Division',
    divisionId: 'Divisi Industrial Engineering',
    speaker: 'Ibnu Abilbari',
    logo: '/logos/client(1).svg',
    quoteBefore: 'Vacuum lifting units from DQW successfully ',
    quoteBeforeId: 'Unit vacuum lifter dari DQW berhasil ',
    quoteHighlight: 'eliminated repetitive 20 to 100 kg manual lifts on our production lines',
    quoteHighlightId: 'menghilangkan aktivitas angkat manual berulang 20 hingga 100 kg di lini produksi kami',
    quoteMiddle: '. Heavy handling is now completed in a controlled manner by single operators. Their technical support team is ',
    quoteMiddleId: '. Penanganan beban berat kini dapat dilakukan secara terkendali oleh satu operator. Tim dukungan teknis mereka juga ',
    quoteHighlight2: 'exceptionally responsive whenever on-site calibration is requested.',
    quoteHighlight2Id: 'sangat sigap setiap kali kami membutuhkan kalibrasi langsung di pabrik.',
    quoteEnd: '',
    photo: '/testimonials/ibnu.webp',
  },
];

export default function TestimonialsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { lang } = useLanguage();
  const isId = lang === 'id';

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    const cardWidth = clientWidth * 0.85;
    const index = Math.round(scrollLeft / (cardWidth > 0 ? cardWidth : 1));
    setActiveIndex(Math.min(Math.max(index, 0), caseStudies.length - 1));
  };

  const scrollToCard = (index: number) => {
    if (!scrollContainerRef.current) return;
    const cards = scrollContainerRef.current.children;
    if (cards[index]) {
      (cards[index] as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-slate-50/70 to-white border-b border-slate-200/80 relative overflow-hidden">
      {/* Subtle Royal Blue Light Refraction */}
      <div
        className="absolute top-1/3 left-1/4 w-[480px] h-[360px] bg-[#005596]/8 rounded-full blur-[130px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-1/4 w-[420px] h-[320px] bg-blue-600/7 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-[#005596]/15 shadow-[0_2px_10px_rgba(0,85,150,0.06)] rounded-full text-xs font-mono font-bold uppercase tracking-widest text-[#005596] mb-3">
            <span>{isId ? 'Studi Kasus & Ulasan Terverifikasi' : 'Client Case Studies & Verified Reviews'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {isId
              ? 'Dipercaya Para Pemimpin Manufaktur di Seluruh Indonesia'
              : 'Trusted by Manufacturing Leaders Across Indonesia'}
          </h2>
          <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            {isId
              ? 'Pengalaman nyata dari Plant Manager, tim logistik, dan Industrial Engineer yang mengoperasikan sistem Schmalz serta Binar Handling.'
              : 'Direct accounts from plant managers, logistics directors, and industrial engineers deploying Schmalz and Binar Handling systems.'}
          </p>
        </div>

        {/* 3 Executive Authentic Testimonial Cards */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex lg:grid lg:grid-cols-3 gap-5 sm:gap-8 overflow-x-auto lg:overflow-visible snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 pb-4 lg:pb-0"
        >
          {caseStudies.map((study, idx) => (
            <div
              key={idx}
              className="w-[85vw] max-w-[340px] sm:max-w-[420px] lg:w-auto shrink-0 snap-center bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_12px_36px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:ring-[#005596]/30 hover:bg-white hover:shadow-[0_20px_50px_-10px_rgba(0,85,150,0.14)] transition-all duration-300 relative group"
            >
              <div>
                {/* Card Top: Quote Icon + Official Client Logo */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200/60">
                  <Quote className="w-8 h-8 text-[#005596]/25 shrink-0" />
                  <div className="relative w-24 h-9 shrink-0 opacity-85 group-hover:opacity-100 transition-opacity">
                    <Image
                      src={study.logo}
                      alt={study.company}
                      fill
                      className="object-contain object-right"
                    />
                  </div>
                </div>

                {/* Direct Testimonial Quote */}
                <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed mb-6 text-left font-normal">
                  &ldquo;{isId ? study.quoteBeforeId : study.quoteBefore}
                  <strong className="text-slate-900 font-semibold bg-blue-50/80 px-1 py-0.5 rounded text-left">
                    {isId ? study.quoteHighlightId : study.quoteHighlight}
                  </strong>
                  {isId ? study.quoteMiddleId : study.quoteMiddle}
                  <strong className="text-slate-900 font-semibold bg-blue-50/80 px-1 py-0.5 rounded text-left">
                    {isId ? study.quoteHighlight2Id : study.quoteHighlight2}
                  </strong>
                  {study.quoteEnd}&rdquo;
                </p>
              </div>

              {/* Speaker Profile Footer */}
              <div className="pt-4 border-t border-slate-200/70 flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-100 border-2 border-white ring-1 ring-[#005596]/20 shadow-xs shrink-0">
                  <Image
                    src={study.photo}
                    alt={study.speaker}
                    fill
                    sizes="48px"
                    loading="eager"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 text-left">
                  <div className="text-sm sm:text-base font-bold text-slate-900 leading-tight truncate">
                    {study.speaker}
                  </div>
                  <div className="text-xs text-slate-500 font-medium leading-tight mt-0.5 truncate">
                    {isId ? study.divisionId : study.division}
                  </div>
                  <div className="text-xs font-bold text-[#005596] leading-tight mt-0.5 truncate">
                    {study.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile / Tablet Pagination Dots & Swipe Indicator */}
        <div className="flex lg:hidden flex-col items-center justify-center gap-2 mt-5 mb-1 relative z-20">
          <div className="flex items-center gap-2">
            {caseStudies.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToCard(idx)}
                aria-label={`View testimonial ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  activeIndex === idx
                    ? 'w-6 h-2 bg-[#005596]'
                    : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1.5">
            <span>{isId ? 'Geser untuk melihat ulasan klien lainnya' : 'Swipe to view more client reviews'}</span>
            <span className="text-[#005596] font-bold">{`(${activeIndex + 1} / ${caseStudies.length})`}</span>
          </span>
        </div>

        {/* Footer Link to Our Projects */}
        <div className="mt-10 sm:mt-12 text-center">
          <Link
            href="/our-projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-200 hover:border-[#005596]/40 shadow-xs hover:shadow-md text-xs sm:text-sm font-bold text-slate-700 hover:text-[#005596] transition-all group"
          >
            <span>{isId ? 'Lihat 50+ Dokumentasi Instalasi Pabrik Klien Kami' : 'View 50+ Verified Industrial Client Installations'}</span>
            <ArrowRight className="w-4 h-4 text-[#005596] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
