"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Calculator, Cpu, Newspaper, Briefcase, Package, Play, HeartPulse, BarChart3, Calendar, FileText } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { t } = useLanguage();
  const pathname = usePathname();

  const openDropdown = (name: string) => setActiveDropdown(name);
  const closeDropdown = () => setActiveDropdown(null);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  return (
    <header className="fixed top-3 sm:top-4 inset-x-0 z-50 px-3 sm:px-5 xl:px-6 pointer-events-none">
      <nav className="pointer-events-auto max-w-7xl xl:max-w-[1360px] mx-auto rounded-2xl lg:rounded-full bg-white/80 backdrop-blur-2xl backdrop-saturate-150 border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_12px_36px_-6px_rgba(0,85,150,0.12),0_2px_8px_rgba(15,23,42,0.04),inset_0_1px_0_0_rgba(255,255,255,0.95)] transition-all duration-300 px-3.5 sm:px-4 lg:px-4 xl:px-5 py-2">
        <div className="flex items-center justify-between gap-1.5 xl:gap-3 h-12 sm:h-14">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center pl-1">
            <Link href="/" className="block relative h-10 w-36 sm:h-11 sm:w-44 lg:h-9 lg:w-32 xl:h-10 xl:w-40 hover:opacity-85 transition-opacity">
              <Image
                src="/logo.webp"
                alt="PT Dimensi Quantum Wahyudi Logo"
                fill
                className="object-contain object-left"
                priority
                unoptimized
              />
            </Link>
          </div>

          {/* Center Dock Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-0.5 bg-slate-900/[0.035] p-1 rounded-full border border-slate-900/[0.04] shadow-[inset_0_1px_2px_rgba(15,23,42,0.03)]">
            <Link
              href="/"
              className={`whitespace-nowrap px-2 xl:px-3 py-1.5 rounded-full text-[12px] xl:text-[13px] font-semibold tracking-wide transition-all duration-200 ${
                isActive('/')
                  ? 'bg-white text-[#005596] shadow-[0_2px_8px_rgba(0,85,150,0.10)] ring-1 ring-[#005596]/10'
                  : 'text-slate-600 hover:text-[#005596] hover:bg-white/70'
              }`}
            >
              {t.navbar.home}
            </Link>
            <Link
              href="/about"
              className={`whitespace-nowrap px-2 xl:px-3 py-1.5 rounded-full text-[12px] xl:text-[13px] font-semibold tracking-wide transition-all duration-200 ${
                isActive('/about')
                  ? 'bg-white text-[#005596] shadow-[0_2px_8px_rgba(0,85,150,0.10)] ring-1 ring-[#005596]/10'
                  : 'text-slate-600 hover:text-[#005596] hover:bg-white/70'
              }`}
            >
              {t.navbar.about}
            </Link>

            {/* Dropdown INSIGHTS */}
            <div
              className="relative group"
              onMouseEnter={() => openDropdown('insights')}
              onMouseLeave={closeDropdown}
            >
              <button
                className={`whitespace-nowrap flex items-center space-x-1 px-2 xl:px-3 py-1.5 rounded-full text-[12px] xl:text-[13px] font-semibold tracking-wide outline-none transition-all duration-200 ${
                  activeDropdown === 'insights' || isActive('/news') || isActive('/our-projects') || isActive('/events') || isActive('/brosur')
                    ? 'bg-white text-[#005596] shadow-[0_2px_8px_rgba(0,85,150,0.10)] ring-1 ring-[#005596]/10'
                    : 'text-slate-600 group-hover:text-[#005596] group-hover:bg-white/70'
                }`}
              >
                <span>{t.navbar.insights}</span>
                <ChevronDown size={13} className={`shrink-0 transition-transform duration-300 ${activeDropdown === 'insights' ? 'rotate-180 text-[#005596]' : ''}`} />
              </button>

              <div className={`absolute left-1/2 -translate-x-1/2 top-full w-72 pt-3 transition-all duration-200 origin-top ${activeDropdown === 'insights' ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible pointer-events-none'}`}>
                <div className="bg-white/95 backdrop-blur-2xl backdrop-saturate-150 rounded-2xl border border-white/90 ring-1 ring-[#005596]/12 shadow-[0_20px_50px_-10px_rgba(0,85,150,0.16),inset_0_1px_0_0_rgba(255,255,255,0.95)] overflow-hidden">
                  <div className="p-2 space-y-1">
                    <Link href="/news" onClick={closeDropdown}
                      className="flex items-start p-2.5 rounded-xl hover:bg-[#005596]/[0.06] transition-all group/item">
                      <div className="bg-[#005596]/10 p-2 rounded-xl ring-1 ring-[#005596]/15 text-[#005596] group-hover/item:bg-[#005596] group-hover/item:text-white group-hover/item:ring-transparent transition-all mr-3 shrink-0">
                        <Newspaper size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 group-hover/item:text-[#005596] transition-colors">{t.navbar.newsTitle}</p>
                        <p className="text-xs text-slate-500">{t.navbar.newsDesc}</p>
                      </div>
                    </Link>

                    <Link href="/our-projects" onClick={closeDropdown}
                      className="flex items-start p-2.5 rounded-xl hover:bg-[#005596]/[0.06] transition-all group/item">
                      <div className="bg-[#005596]/10 p-2 rounded-xl ring-1 ring-[#005596]/15 text-[#005596] group-hover/item:bg-[#005596] group-hover/item:text-white group-hover/item:ring-transparent transition-all mr-3 shrink-0">
                        <Briefcase size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 group-hover/item:text-[#005596] transition-colors">{t.navbar.projectsTitle}</p>
                        <p className="text-xs text-slate-500">{t.navbar.projectsDesc}</p>
                      </div>
                    </Link>

                    <Link href="/news/ergonomics" onClick={closeDropdown}
                      className="flex items-start p-2.5 rounded-xl hover:bg-[#005596]/[0.06] transition-all group/item">
                      <div className="bg-[#005596]/10 p-2 rounded-xl ring-1 ring-[#005596]/15 text-[#005596] group-hover/item:bg-[#005596] group-hover/item:text-white group-hover/item:ring-transparent transition-all mr-3 shrink-0">
                        <HeartPulse size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 group-hover/item:text-[#005596] transition-colors">{t.navbar.ergonomicsTitle}</p>
                        <p className="text-xs text-slate-500">{t.navbar.ergonomicsDesc}</p>
                      </div>
                    </Link>

                    <Link href="/events" onClick={closeDropdown}
                      className="flex items-start p-2.5 rounded-xl hover:bg-[#005596]/[0.06] transition-all group/item">
                      <div className="bg-[#005596]/10 p-2 rounded-xl ring-1 ring-[#005596]/15 text-[#005596] group-hover/item:bg-[#005596] group-hover/item:text-white group-hover/item:ring-transparent transition-all mr-3 shrink-0">
                        <Calendar size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 group-hover/item:text-[#005596] transition-colors">{t.navbar.eventsTitle}</p>
                        <p className="text-xs text-slate-500">{t.navbar.eventsDesc}</p>
                      </div>
                    </Link>

                    <Link href="/brosur" onClick={closeDropdown}
                      className="flex items-start p-2.5 rounded-xl hover:bg-[#005596]/[0.06] transition-all group/item">
                      <div className="bg-[#005596]/10 p-2 rounded-xl ring-1 ring-[#005596]/15 text-[#005596] group-hover/item:bg-[#005596] group-hover/item:text-white group-hover/item:ring-transparent transition-all mr-3 shrink-0">
                        <FileText size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 group-hover/item:text-[#005596] transition-colors">{t.navbar.brochuresTitle}</p>
                        <p className="text-xs text-slate-500">{t.navbar.brochuresDesc}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Dropdown Digital Assistants */}
            <div
              className="relative group"
              onMouseEnter={() => openDropdown('assistant')}
              onMouseLeave={closeDropdown}
            >
              <button
                className={`whitespace-nowrap flex items-center space-x-1 px-2 xl:px-3 py-1.5 rounded-full text-[12px] xl:text-[13px] font-semibold tracking-wide outline-none transition-all duration-200 ${
                  activeDropdown === 'assistant' || isActive('/digital-assistant')
                    ? 'bg-white text-[#005596] shadow-[0_2px_8px_rgba(0,85,150,0.10)] ring-1 ring-[#005596]/10'
                    : 'text-slate-600 group-hover:text-[#005596] group-hover:bg-white/70'
                }`}
              >
                <span>{t.navbar.digitalAssistants}</span>
                <ChevronDown size={13} className={`shrink-0 transition-transform duration-300 ${activeDropdown === 'assistant' ? 'rotate-180 text-[#005596]' : ''}`} />
              </button>

              <div className={`absolute left-1/2 -translate-x-1/2 top-full w-72 pt-3 transition-all duration-200 origin-top ${activeDropdown === 'assistant' ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible pointer-events-none'}`}>
                <div className="bg-white/95 backdrop-blur-2xl backdrop-saturate-150 rounded-2xl border border-white/90 ring-1 ring-[#005596]/12 shadow-[0_20px_50px_-10px_rgba(0,85,150,0.16),inset_0_1px_0_0_rgba(255,255,255,0.95)] overflow-hidden">
                  <div className="p-2 space-y-1">
                    <Link href="/digital-assistant/vacuum-calculator" onClick={closeDropdown}
                      className="flex items-start p-2.5 rounded-xl hover:bg-[#005596]/[0.06] transition-all group/item">
                      <div className="bg-[#005596]/10 p-2 rounded-xl ring-1 ring-[#005596]/15 text-[#005596] group-hover/item:bg-[#005596] group-hover/item:text-white group-hover/item:ring-transparent transition-all mr-3 shrink-0">
                        <Calculator size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 group-hover/item:text-[#005596] transition-colors">Vacuum Calculator</p>
                        <p className="text-xs text-slate-500">{t.navbar.vacCalcDesc}</p>
                      </div>
                    </Link>

                    <Link href="/digital-assistant/roi-calculator" onClick={closeDropdown}
                      className="flex items-start p-2.5 rounded-xl hover:bg-[#005596]/[0.06] transition-all group/item">
                      <div className="bg-[#005596]/10 p-2 rounded-xl ring-1 ring-[#005596]/15 text-[#005596] group-hover/item:bg-[#005596] group-hover/item:text-white group-hover/item:ring-transparent transition-all mr-3 shrink-0">
                        <BarChart3 size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 group-hover/item:text-[#005596] transition-colors">ROI Calculator</p>
                        <p className="text-xs text-slate-500">{t.navbar.roiCalcDesc}</p>
                      </div>
                    </Link>

                    <Link href="/digital-assistant/selection-aids" onClick={closeDropdown}
                      className="flex items-start p-2.5 rounded-xl hover:bg-[#005596]/[0.06] transition-all group/item">
                      <div className="bg-[#005596]/10 p-2 rounded-xl ring-1 ring-[#005596]/15 text-[#005596] group-hover/item:bg-[#005596] group-hover/item:text-white group-hover/item:ring-transparent transition-all mr-3 shrink-0">
                        <Cpu size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 group-hover/item:text-[#005596] transition-colors">Selection Aids</p>
                        <p className="text-xs text-slate-500">{t.navbar.selectionAidsDesc}</p>
                      </div>
                    </Link>

                    <Link href="/digital-assistant/video-library" onClick={closeDropdown}
                      className="flex items-start p-2.5 rounded-xl hover:bg-[#005596]/[0.06] transition-all group/item">
                      <div className="bg-[#005596]/10 p-2 rounded-xl ring-1 ring-[#005596]/15 text-[#005596] group-hover/item:bg-[#005596] group-hover/item:text-white group-hover/item:ring-transparent transition-all mr-3 shrink-0">
                        <Play size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 group-hover/item:text-[#005596] transition-colors">Video Library</p>
                        <p className="text-xs text-slate-500">{t.navbar.videoLibraryDesc}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Dropdown Products */}
            <div
              className="relative group"
              onMouseEnter={() => openDropdown('products')}
              onMouseLeave={closeDropdown}
            >
              <button
                className={`whitespace-nowrap flex items-center space-x-1 px-2 xl:px-3 py-1.5 rounded-full text-[12px] xl:text-[13px] font-semibold tracking-wide outline-none transition-all duration-200 ${
                  activeDropdown === 'products' || isActive('/products')
                    ? 'bg-white text-[#005596] shadow-[0_2px_8px_rgba(0,85,150,0.10)] ring-1 ring-[#005596]/10'
                    : 'text-slate-600 group-hover:text-[#005596] group-hover:bg-white/70'
                }`}
              >
                <span>{t.navbar.products}</span>
                <ChevronDown size={13} className={`shrink-0 transition-transform duration-300 ${activeDropdown === 'products' ? 'rotate-180 text-[#005596]' : ''}`} />
              </button>

              <div className={`absolute left-1/2 -translate-x-1/2 top-full w-72 pt-3 transition-all duration-200 origin-top ${activeDropdown === 'products' ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible pointer-events-none'}`}>
                <div className="bg-white/95 backdrop-blur-2xl backdrop-saturate-150 rounded-2xl border border-white/90 ring-1 ring-[#005596]/12 shadow-[0_20px_50px_-10px_rgba(0,85,150,0.16),inset_0_1px_0_0_rgba(255,255,255,0.95)] overflow-hidden">
                  <div className="px-4 pt-3 pb-1">
                    <p className="text-[10px] font-bold text-[#005596] uppercase tracking-widest">{t.navbar.authDistributor}</p>
                  </div>
                  <div className="p-2 space-y-1">
                    <Link href="/products/schmalz" onClick={closeDropdown}
                      className="flex items-center p-2.5 rounded-xl hover:bg-[#005596]/[0.06] transition-all group/item">
                      <div className="bg-white border border-slate-200/80 rounded-lg p-1.5 mr-3 shrink-0 group-hover/item:border-[#005596]/40 transition-colors shadow-xs">
                        <Image src="/brands/schmalz.webp" alt="Schmalz" width={56} height={24} className="object-contain h-6 w-14" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 group-hover/item:text-[#005596] transition-colors">Schmalz</p>
                        <p className="text-xs text-slate-500">{t.navbar.schmalzDesc}</p>
                      </div>
                    </Link>

                    <Link href="/products/binar" onClick={closeDropdown}
                      className="flex items-center p-2.5 rounded-xl hover:bg-[#005596]/[0.06] transition-all group/item">
                      <div className="bg-white border border-slate-200/80 rounded-lg p-1.5 mr-3 shrink-0 group-hover/item:border-[#005596]/40 transition-colors shadow-xs">
                        <Image src="/brands/binar.webp" alt="Binar Handling" width={56} height={24} className="object-contain h-6 w-14" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 group-hover/item:text-[#005596] transition-colors">Binar Handling</p>
                        <p className="text-xs text-slate-500">{t.navbar.binarDesc}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Dropdown Industries */}
            <div
              className="relative group"
              onMouseEnter={() => openDropdown('industries')}
              onMouseLeave={closeDropdown}
            >
              <button
                className={`whitespace-nowrap flex items-center space-x-1 px-2 xl:px-3 py-1.5 rounded-full text-[12px] xl:text-[13px] font-semibold tracking-wide outline-none transition-all duration-200 ${
                  activeDropdown === 'industries' || isActive('/industries')
                    ? 'bg-white text-[#005596] shadow-[0_2px_8px_rgba(0,85,150,0.10)] ring-1 ring-[#005596]/10'
                    : 'text-slate-600 group-hover:text-[#005596] group-hover:bg-white/70'
                }`}
              >
                <span>{t.navbar.industries}</span>
                <ChevronDown size={13} className={`shrink-0 transition-transform duration-300 ${activeDropdown === 'industries' ? 'rotate-180 text-[#005596]' : ''}`} />
              </button>

              <div className={`absolute left-1/2 -translate-x-1/2 top-full w-72 pt-3 transition-all duration-200 origin-top ${activeDropdown === 'industries' ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible pointer-events-none'}`}>
                <div className="bg-white/95 backdrop-blur-2xl backdrop-saturate-150 rounded-2xl border border-white/90 ring-1 ring-[#005596]/12 shadow-[0_20px_50px_-10px_rgba(0,85,150,0.16),inset_0_1px_0_0_rgba(255,255,255,0.95)] overflow-hidden">
                  <div className="p-2 space-y-1">
                    <Link href="/industries/food-beverage" onClick={closeDropdown}
                      className="flex items-start p-2.5 rounded-xl hover:bg-[#005596]/[0.06] transition-all group/item">
                      <div className="bg-[#005596]/10 p-2 rounded-xl ring-1 ring-[#005596]/15 text-[#005596] group-hover/item:bg-[#005596] group-hover/item:text-white group-hover/item:ring-transparent transition-all mr-3 shrink-0">
                        <Package size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 group-hover/item:text-[#005596] transition-colors">{t.navbar.foodPharmaTitle}</p>
                        <p className="text-xs text-slate-500">{t.navbar.foodPharmaDesc}</p>
                      </div>
                    </Link>

                    <Link href="/industries/automotive-metal" onClick={closeDropdown}
                      className="flex items-start p-2.5 rounded-xl hover:bg-[#005596]/[0.06] transition-all group/item">
                      <div className="bg-[#005596]/10 p-2 rounded-xl ring-1 ring-[#005596]/15 text-[#005596] group-hover/item:bg-[#005596] group-hover/item:text-white group-hover/item:ring-transparent transition-all mr-3 shrink-0">
                        <Briefcase size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 group-hover/item:text-[#005596] transition-colors">{t.navbar.autoMetalTitle}</p>
                        <p className="text-xs text-slate-500">{t.navbar.autoMetalDesc}</p>
                      </div>
                    </Link>

                    <Link href="/industries/logistics-ecommerce" onClick={closeDropdown}
                      className="flex items-start p-2.5 rounded-xl hover:bg-[#005596]/[0.06] transition-all group/item">
                      <div className="bg-[#005596]/10 p-2 rounded-xl ring-1 ring-[#005596]/15 text-[#005596] group-hover/item:bg-[#005596] group-hover/item:text-white group-hover/item:ring-transparent transition-all mr-3 shrink-0">
                        <BarChart3 size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 group-hover/item:text-[#005596] transition-colors">{t.navbar.logisticsTitle}</p>
                        <p className="text-xs text-slate-500">{t.navbar.logisticsDesc}</p>
                      </div>
                    </Link>
                  </div>
                  <div className="border-t border-slate-200/60 px-4 py-2.5 bg-slate-50/70">
                    <Link href="/industries" onClick={closeDropdown} className="text-xs font-bold text-[#005596] hover:text-[#005596] flex items-center gap-1 w-full justify-center">
                      {t.navbar.viewAllIndustries}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/services"
              className={`whitespace-nowrap px-2 xl:px-3 py-1.5 rounded-full text-[12px] xl:text-[13px] font-semibold tracking-wide transition-all duration-200 ${
                isActive('/services')
                  ? 'bg-white text-[#005596] shadow-[0_2px_8px_rgba(0,85,150,0.10)] ring-1 ring-[#005596]/10'
                  : 'text-slate-600 hover:text-[#005596] hover:bg-white/70'
              }`}
            >
              {t.navbar.services}
            </Link>
            <Link
              href="/contact"
              className={`whitespace-nowrap px-2 xl:px-3 py-1.5 rounded-full text-[12px] xl:text-[13px] font-semibold tracking-wide transition-all duration-200 ${
                isActive('/contact')
                  ? 'bg-white text-[#005596] shadow-[0_2px_8px_rgba(0,85,150,0.10)] ring-1 ring-[#005596]/10'
                  : 'text-slate-600 hover:text-[#005596] hover:bg-white/70'
              }`}
            >
              {t.navbar.contact}
            </Link>
          </div>

          {/* Right Side: Language Switcher + Royal Blue Capsule CTA (Desktop) */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2 shrink-0">
            <LanguageSwitcher />
            <Link href="/contact"
              data-navbar-cta="true"
              className="whitespace-nowrap bg-gradient-to-r from-[#005596] to-[#1d4ed8] hover:from-[#00447a] hover:to-[#1e40af] active:scale-[0.98] text-white font-bold px-3.5 xl:px-4.5 py-2 rounded-full transition-all shadow-[0_6px_20px_-3px_rgba(29,78,216,0.4),inset_0_1px_0_0_rgba(255,255,255,0.25)] hover:shadow-[0_8px_24px_-2px_rgba(29,78,216,0.5)] text-[12px] xl:text-[13px] tracking-wide">
              {t.navbar.quote}
            </Link>
          </div>

          {/* Mobile Right: Language Switcher + Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 hover:text-[#005596] bg-white/70 hover:bg-white rounded-xl p-2 border border-slate-200/70 shadow-xs transition-all focus:outline-none"
              aria-label={isOpen ? t.navbar.closeMenu : t.navbar.openMenu}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Frosted Glass Dock Drawer */}
      {isOpen && (
        <div className="lg:hidden pointer-events-auto max-w-6xl mx-auto mt-2 rounded-2xl bg-white/88 backdrop-blur-2xl backdrop-saturate-150 border border-white/90 ring-1 ring-[#005596]/12 shadow-[0_24px_48px_-12px_rgba(0,85,150,0.18)] overflow-hidden max-h-[82vh] overflow-y-auto">
          <div className="px-4 pt-3 pb-6 space-y-1">
            <div className="py-2 border-b border-slate-200/60 mb-2">
              <p className="px-3.5 text-[11px] font-bold text-[#005596] uppercase tracking-wider mb-2">{t.navbar.language}</p>
              <div className="px-3">
                <LanguageSwitcher variant="mobile" />
              </div>
            </div>
            <Link href="/" className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-[#005596] hover:bg-[#005596]/[0.06]" onClick={() => setIsOpen(false)}>{t.navbar.home}</Link>
            <Link href="/about" className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-[#005596] hover:bg-[#005596]/[0.06]" onClick={() => setIsOpen(false)}>{t.navbar.about}</Link>

            <div className="py-2.5 border-b border-slate-200/60">
              <p className="px-3.5 text-[11px] font-bold text-[#005596] uppercase tracking-wider mb-2">{t.navbar.quickActions}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-3">
                <Link href="/contact" className="rounded-xl bg-gradient-to-r from-[#005596] to-[#1d4ed8] text-white text-xs font-bold py-2.5 text-center shadow-sm" onClick={() => setIsOpen(false)}>
                  {t.navbar.quote}
                </Link>
                <Link href="/digital-assistant/roi-calculator" className="rounded-xl bg-white/80 border border-slate-200/80 text-slate-700 text-xs font-bold py-2.5 text-center" onClick={() => setIsOpen(false)}>
                  ROI Calculator
                </Link>
                <Link href="/products" className="rounded-xl bg-white/80 border border-slate-200/80 text-slate-700 text-xs font-bold py-2.5 text-center" onClick={() => setIsOpen(false)}>
                  {t.navbar.products}
                </Link>
              </div>
            </div>

            {/* Mobile Digital Assistants Section */}
            <div className="py-2 border-b border-slate-200/60">
              <p className="px-3.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">{t.navbar.digitalAssistants}</p>
              <Link href="/digital-assistant/vacuum-calculator" className="flex items-center space-x-3 px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-[#005596] hover:bg-[#005596]/[0.06]" onClick={() => setIsOpen(false)}>
                <Calculator size={17} className="text-[#005596]" /><span>Vacuum Calculator</span>
              </Link>
              <Link href="/digital-assistant/roi-calculator" className="flex items-center space-x-3 px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-[#005596] hover:bg-[#005596]/[0.06]" onClick={() => setIsOpen(false)}>
                <BarChart3 size={17} className="text-[#005596]" /><span>ROI Calculator</span>
              </Link>
              <Link href="/digital-assistant/selection-aids" className="flex items-center space-x-3 px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-[#005596] hover:bg-[#005596]/[0.06]" onClick={() => setIsOpen(false)}>
                <Cpu size={17} className="text-[#005596]" /><span>Selection Aids</span>
              </Link>
              <Link href="/digital-assistant/video-library" className="flex items-center space-x-3 px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-[#005596] hover:bg-[#005596]/[0.06]" onClick={() => setIsOpen(false)}>
                <Play size={17} className="text-[#005596]" /><span>Video Library</span>
              </Link>
            </div>

            {/* Mobile Insights Section */}
            <div className="py-2 border-b border-slate-200/60">
              <p className="px-3.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">{t.navbar.insights}</p>
              <Link href="/news" className="flex items-center space-x-3 px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-[#005596] hover:bg-[#005596]/[0.06]" onClick={() => setIsOpen(false)}>
                <Newspaper size={17} className="text-[#005596]" /><span>{t.navbar.newsTitle}</span>
              </Link>
              <Link href="/our-projects" className="flex items-center space-x-3 px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-[#005596] hover:bg-[#005596]/[0.06]" onClick={() => setIsOpen(false)}>
                <Briefcase size={17} className="text-[#005596]" /><span>{t.navbar.projectsTitle}</span>
              </Link>
              <Link href="/news/ergonomics" className="flex items-center space-x-3 px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-[#005596] hover:bg-[#005596]/[0.06]" onClick={() => setIsOpen(false)}>
                <HeartPulse size={17} className="text-[#005596]" /><span>{t.navbar.ergonomicsTitle}</span>
              </Link>
              <Link href="/events" className="flex items-center space-x-3 px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-[#005596] hover:bg-[#005596]/[0.06]" onClick={() => setIsOpen(false)}>
                <Calendar size={17} className="text-[#005596]" /><span>{t.navbar.eventsTitle}</span>
              </Link>
              <Link href="/brosur" className="flex items-center space-x-3 px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-[#005596] hover:bg-[#005596]/[0.06]" onClick={() => setIsOpen(false)}>
                <FileText size={17} className="text-[#005596]" /><span>{t.navbar.brochuresTitle}</span>
              </Link>
            </div>

            {/* Mobile Products Section */}
            <div className="py-2 border-b border-slate-200/60">
              <p className="px-3.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">{t.navbar.products}</p>
              <Link href="/products" className="flex items-center space-x-3 px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-[#005596] hover:bg-[#005596]/[0.06]" onClick={() => setIsOpen(false)}>
                <Package size={17} className="text-[#005596]" /><span>{t.navbar.allBrands}</span>
              </Link>
              <Link href="/products/schmalz" className="flex items-center space-x-3 px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-[#005596] hover:bg-[#005596]/[0.06]" onClick={() => setIsOpen(false)}>
                <div className="bg-white border border-slate-200 rounded-md p-1 shrink-0">
                  <Image src="/brands/schmalz.webp" alt="Schmalz" width={40} height={18} className="object-contain h-[18px] w-10" unoptimized />
                </div>
                <span>Schmalz</span>
              </Link>
              <Link href="/products/binar" className="flex items-center space-x-3 px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-[#005596] hover:bg-[#005596]/[0.06]" onClick={() => setIsOpen(false)}>
                <div className="bg-white border border-slate-200 rounded-md p-1 shrink-0">
                  <Image src="/brands/binar.webp" alt="Binar Handling" width={40} height={18} className="object-contain h-[18px] w-10" unoptimized />
                </div>
                <span>Binar Handling</span>
              </Link>
            </div>

            <Link href="/services" className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-[#005596] hover:bg-[#005596]/[0.06]" onClick={() => setIsOpen(false)}>{t.navbar.services}</Link>
            <Link href="/contact" className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-[#005596] hover:bg-[#005596]/[0.06]" onClick={() => setIsOpen(false)}>{t.navbar.contact}</Link>

            <div className="pt-3">
              <Link href="/contact"
                className="block w-full text-center bg-gradient-to-r from-[#005596] to-[#1d4ed8] text-white font-bold py-3 rounded-full transition-all shadow-[0_6px_20px_-3px_rgba(29,78,216,0.4)] text-sm"
                onClick={() => setIsOpen(false)}>
                {t.navbar.quote}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
