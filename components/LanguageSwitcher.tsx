"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { useLanguage, Lang } from './LanguageProvider';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'navbar' | 'mobile';
}

const LANGUAGES: { code: Lang; label: string; flag: string; nativeName: string }[] = [
  {
    code: 'id',
    label: 'ID',
    nativeName: 'Bahasa Indonesia',
    flag: '/images/flags/flag-id.webp',
  },
  {
    code: 'en',
    label: 'EN',
    nativeName: 'English',
    flag: '/images/flags/flag-en.webp',
  },
];

export default function LanguageSwitcher({ className = '', variant = 'navbar' }: LanguageSwitcherProps) {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const currentLang = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[1];

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Mobile Segmented / Pill Selector Variant
  if (variant === 'mobile') {
    return (
      <div className={`flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/80 ${className}`}>
        {LANGUAGES.map((item) => {
          const isActive = item.code === lang;
          return (
            <button
              key={item.code}
              type="button"
              onClick={() => setLang(item.code)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-white text-[#005596] shadow-sm ring-1 ring-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <div className="relative w-5 h-5 rounded-full overflow-hidden shrink-0 shadow-2xs">
                <Image
                  src={item.flag}
                  alt={item.nativeName}
                  width={20}
                  height={20}
                  className="object-cover w-full h-full"
                />
              </div>
              <span>{item.nativeName}</span>
              {isActive && <Check size={14} className="text-[#005596] ml-0.5" />}
            </button>
          );
        })}
      </div>
    );
  }

  // Desktop Navbar Dropdown Capsule Variant
  return (
    <div ref={containerRef} className={`relative inline-block text-left ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Pilih Bahasa / Select Language"
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/80 hover:bg-white border border-slate-200/80 hover:border-[#005596]/40 shadow-xs hover:shadow-sm text-xs font-bold text-slate-700 hover:text-[#005596] transition-all cursor-pointer group focus:outline-none"
      >
        <div className="relative w-5 h-5 rounded-full overflow-hidden shrink-0 shadow-2xs ring-1 ring-slate-200/60 group-hover:scale-105 transition-transform">
          <Image
            src={currentLang.flag}
            alt={currentLang.nativeName}
            width={20}
            height={20}
            className="object-cover w-full h-full"
            priority
          />
        </div>
        <span className="font-mono text-[11px] font-bold text-slate-800 tracking-wider">
          {currentLang.label}
        </span>
        <ChevronDown
          size={13}
          className={`text-slate-400 group-hover:text-slate-600 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Floating Dropdown Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 mt-2 w-48 rounded-2xl bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-[0_12px_30px_-5px_rgba(0,85,150,0.15)] p-1.5 z-50 overflow-hidden"
          >
            <div className="px-2.5 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
              Language / Bahasa
            </div>

            <div className="space-y-0.5">
              {LANGUAGES.map((item) => {
                const isActive = item.code === lang;
                return (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => {
                      setLang(item.code);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-blue-50/80 text-[#005596] font-bold'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-5 h-5 rounded-full overflow-hidden shrink-0 shadow-2xs ring-1 ring-slate-200/60">
                        <Image
                          src={item.flag}
                          alt={item.nativeName}
                          width={20}
                          height={20}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <span className="text-xs">{item.nativeName}</span>
                    </div>

                    {isActive && <Check size={14} className="text-[#005596]" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
