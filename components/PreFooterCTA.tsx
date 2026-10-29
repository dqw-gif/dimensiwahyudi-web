'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, PhoneCall } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

interface PreFooterCTAProps {
  badge?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  primaryBtnText?: string;
  primaryBtnHref?: string;
  secondaryBtnText?: string;
  secondaryBtnHref?: string;
  theme?: 'blue' | 'red';
  className?: string;
}

export default function PreFooterCTA({
  badge,
  title,
  description,
  primaryBtnText,
  primaryBtnHref = '/contact',
  secondaryBtnText,
  secondaryBtnHref = 'https://wa.me/6281119168752?text=Hello%20DQW,%20I%20would%20like%20to%20consult%20on%20handling%20solutions%20for%20our%20plant',
  theme = 'blue',
  className = '',
}: PreFooterCTAProps) {
  const { lang } = useLanguage();
  const isRed = theme === 'red';
  const isId = lang === 'id';

  const resolvedBadge = isId
    ? 'UJI WORKPIECE TANPA KOMITMEN BIAYA'
    : (badge ?? 'SAMPLE TRIAL AT ZERO COMMITMENT');

  const resolvedTitle = isId ? (
    <>
      Ada Workpiece Berat yang Sulit Diangkat? <br className="hidden sm:inline" />
      Uji Langsung di Unit Demo Kami.
    </>
  ) : (
    title ?? (
      <>
        Challenging Workpiece to Lift? <br className="hidden sm:inline" />
        Let Us Test It on a Real Rig.
      </>
    )
  );

  const resolvedDescription = isId
    ? 'Kirimkan sampel karung, kardus, drum, atau plat logam Anda ke workshop teknis kami di Cikarang. Tim engineering kami akan mengujinya langsung pada unit Schmalz dan Binar untuk mengukur cycle time aktual sebelum Anda memutuskan investasi.'
    : (description ?? 'Bring your bags, cartons, or sheet metal samples to our technical workshop in Cikarang. We test them directly on working demo units to measure real cycle times and operator effort before you buy.');

  const resolvedPrimaryBtn = isId
    ? 'Jadwalkan Sesi Trial & Survei Pabrik'
    : (primaryBtnText ?? 'Schedule a Free Demo Session');

  const resolvedSecondaryBtn = isId
    ? 'Konsultasi WhatsApp Tim Engineering'
    : (secondaryBtnText ?? 'Chat with Our Application Engineers');

  return (
    <section className={`py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden ${className}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`relative rounded-3xl p-8 sm:p-12 lg:p-16 text-center text-white overflow-hidden border border-white/20 ${
            isRed
              ? 'bg-gradient-to-br from-[#450a0a] via-[#7f1d1d] to-[#18181b] shadow-[0_24px_60px_-15px_rgba(220,38,38,0.4),inset_0_1px_0_0_rgba(255,255,255,0.25)]'
              : 'bg-gradient-to-br from-[#003b6d] via-[#005596] to-[#1e3a8a] shadow-[0_24px_60px_-15px_rgba(0,85,150,0.4),inset_0_1px_0_0_rgba(255,255,255,0.25)]'
          }`}
        >
          {/* Subtle Ambient Specular Glow Orbs */}
          <div
            className={`absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[100px] pointer-events-none ${
              isRed ? 'bg-rose-500/20' : 'bg-blue-400/20'
            }`}
            aria-hidden="true"
          />
          <div
            className={`absolute -bottom-24 -left-24 w-96 h-96 rounded-full blur-[100px] pointer-events-none ${
              isRed ? 'bg-red-400/15' : 'bg-sky-300/15'
            }`}
            aria-hidden="true"
          />

          {/* Blueprint Engineering Grid Texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.07]"
            style={{
              backgroundImage:
                'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            {/* Top Monospace Pill Badge */}
            {resolvedBadge && (
              <span className="inline-block text-xs font-mono font-bold uppercase tracking-widest px-4 py-1.5 bg-white/12 backdrop-blur-xl rounded-full border border-white/25 text-blue-50 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25)]">
                {resolvedBadge}
              </span>
            )}

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {resolvedTitle}
            </h2>

            {/* Description */}
            {resolvedDescription && (
              <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed max-w-2xl mx-auto">
                {resolvedDescription}
              </p>
            )}

            {/* Dual CTA Button Group */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              {resolvedPrimaryBtn && (
                <Link
                  href={primaryBtnHref}
                  className={`inline-flex items-center justify-center gap-2 px-7 py-4 bg-white hover:bg-blue-50 active:scale-[0.98] font-bold rounded-full transition-all shadow-[0_10px_28px_-6px_rgba(0,0,0,0.25)] text-sm sm:text-base ${
                    isRed ? 'text-[#dc2626]' : 'text-[#005596]'
                  }`}
                >
                  <span>{resolvedPrimaryBtn}</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              )}

              {resolvedSecondaryBtn && (
                <a
                  href={secondaryBtnHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white/10 hover:bg-white/20 active:scale-[0.98] text-white font-bold rounded-full transition-all border border-white/30 backdrop-blur-sm text-sm sm:text-base"
                >
                  <PhoneCall className="w-5 h-5 text-emerald-300" />
                  <span>{resolvedSecondaryBtn}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
