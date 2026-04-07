"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, Calculator, Cpu, Newspaper, Briefcase, Package, Play, HeartPulse, BarChart3 } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // Single state replaces 3 separate states — null = all closed, string = which dropdown is open
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { t } = useLanguage();

  const openDropdown = (name: string) => setActiveDropdown(name);
  const closeDropdown = () => setActiveDropdown(null);

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-white border-b border-slate-200 shadow-sm py-2 md:py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="block relative h-12 w-44 sm:h-14 sm:w-52 md:h-16 md:w-64 hover:opacity-80 transition-opacity">
              <Image
                src="/logo.webp"
                alt="PT Dimensi Quantum Wahyudi Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </Link>
          </div>

          {/* Center Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-slate-600 hover:text-cyan-600 transition-colors text-sm font-semibold tracking-wide">
              {t.navbar.home}
            </Link>
            <Link href="/about" className="text-slate-600 hover:text-cyan-600 transition-colors text-sm font-semibold tracking-wide">
              {t.navbar.about}
            </Link>

            {/* Dropdown INSIGHTS */}
            <div
              className="relative group py-2"
              onMouseEnter={() => openDropdown('insights')}
              onMouseLeave={closeDropdown}
            >
              <button className="flex items-center space-x-1 text-slate-600 group-hover:text-cyan-600 transition-colors text-sm font-semibold tracking-wide outline-none">
                <span>{t.navbar.insights}</span>
                <ChevronDown size={16} className={`transition-transform duration-300 ${activeDropdown === 'insights' ? 'rotate-180' : ''}`} />
              </button>

              <div className={`absolute left-0 top-full w-64 pt-2 transition-all duration-300 origin-top-left ${activeDropdown === 'insights' ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible pointer-events-none'}`}>
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden shadow-slate-200/50">
                  <div className="p-2 space-y-1">
                    <Link href="/news" onClick={closeDropdown}
                      className="flex items-start p-3 rounded-xl hover:bg-slate-50 transition-all group/item">
                      <div className="bg-blue-50 p-2 rounded-lg group-hover/item:bg-blue-100 transition-colors mr-3 text-blue-600">
                        <Newspaper size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">News &amp; Updates</p>
                        <p className="text-xs text-slate-500">{t.navbar.newsDesc}</p>
                      </div>
                    </Link>

                    <Link href="/our-projects" onClick={closeDropdown}
                      className="flex items-start p-3 rounded-xl hover:bg-slate-50 transition-all group/item">
                      <div className="bg-cyan-50 p-2 rounded-lg group-hover/item:bg-cyan-100 transition-colors mr-3 text-cyan-600">
                        <Briefcase size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">Our Projects</p>
                        <p className="text-xs text-slate-500">{t.navbar.projectsDesc}</p>
                      </div>
                    </Link>

                    <Link href="/news/ergonomics" onClick={closeDropdown}
                      className="flex items-start p-3 rounded-xl hover:bg-slate-50 transition-all group/item">
                      <div className="bg-blue-50 p-2 rounded-lg group-hover/item:bg-blue-100 transition-colors mr-3 text-blue-700">
                        <HeartPulse size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">Ergonomics Hub</p>
                        <p className="text-xs text-slate-500">Health, productivity, and safety insights</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Dropdown Digital Assistants */}
            <div
              className="relative group py-2"
              onMouseEnter={() => openDropdown('assistant')}
              onMouseLeave={closeDropdown}
            >
              <button className="flex items-center space-x-1 text-slate-600 group-hover:text-cyan-600 transition-colors text-sm font-semibold tracking-wide outline-none">
                <span>{t.navbar.digitalAssistants}</span>
                <ChevronDown size={16} className={`transition-transform duration-300 ${activeDropdown === 'assistant' ? 'rotate-180' : ''}`} />
              </button>

              <div className={`absolute left-0 top-full w-64 pt-2 transition-all duration-300 origin-top-left ${activeDropdown === 'assistant' ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible pointer-events-none'}`}>
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden shadow-slate-200/50">
                  <div className="p-2 space-y-1">
                    <Link href="/digital-assistant/vacuum-calculator" onClick={closeDropdown}
                      className="flex items-start p-3 rounded-xl hover:bg-slate-50 transition-all group/item">
                      <div className="bg-blue-50 p-2 rounded-lg group-hover/item:bg-blue-100 transition-colors mr-3 text-blue-600">
                        <Calculator size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">Vacuum Calculator</p>
                        <p className="text-xs text-slate-500">Calculate system performance</p>
                      </div>
                    </Link>

                    <Link href="/digital-assistant/roi-calculator" onClick={closeDropdown}
                      className="flex items-start p-3 rounded-xl hover:bg-slate-50 transition-all group/item">
                      <div className="bg-cyan-50 p-2 rounded-lg group-hover/item:bg-cyan-100 transition-colors mr-3 text-cyan-600">
                        <BarChart3 size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">ROI Calculator</p>
                        <p className="text-xs text-slate-500">Estimate ergonomic impact and ROI</p>
                      </div>
                    </Link>

                    <Link href="/digital-assistant/selection-aids" onClick={closeDropdown}
                      className="flex items-start p-3 rounded-xl hover:bg-slate-50 transition-all group/item">
                      <div className="bg-cyan-50 p-2 rounded-lg group-hover/item:bg-cyan-100 transition-colors mr-3 text-cyan-600">
                        <Cpu size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">Selection Aids</p>
                        <p className="text-xs text-slate-500">{t.navbar.selectionAidsDesc}</p>
                      </div>
                    </Link>

                    <Link href="/digital-assistant/video-library" onClick={closeDropdown}
                      className="flex items-start p-3 rounded-xl hover:bg-slate-50 transition-all group/item">
                      <div className="bg-blue-50 p-2 rounded-lg group-hover/item:bg-blue-100 transition-colors mr-3 text-blue-600">
                        <Play size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">Video Library</p>
                        <p className="text-xs text-slate-500">{t.navbar.videoLibraryDesc}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Dropdown Products */}
            <div
              className="relative group py-2"
              onMouseEnter={() => openDropdown('products')}
              onMouseLeave={closeDropdown}
            >
              <button className="flex items-center space-x-1 text-slate-600 group-hover:text-cyan-600 transition-colors text-sm font-semibold tracking-wide outline-none">
                <span>{t.navbar.products}</span>
                <ChevronDown size={16} className={`transition-transform duration-300 ${activeDropdown === 'products' ? 'rotate-180' : ''}`} />
              </button>

              <div className={`absolute left-0 top-full w-72 pt-2 transition-all duration-300 origin-top-left ${activeDropdown === 'products' ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible pointer-events-none'}`}>
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                  <div className="px-4 pt-3 pb-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Authorized Distributor</p>
                  </div>
                  <div className="p-2 space-y-1">
                    <Link href="/products/schmalz" onClick={closeDropdown}
                      className="flex items-center p-3 rounded-xl hover:bg-blue-50 transition-all group/item">
                      <div className="bg-white border border-blue-100 rounded-lg p-1.5 mr-3 shrink-0 group-hover/item:border-blue-300 transition-colors">
                        <Image src="/brands/schmalz.webp" alt="Schmalz" width={56} height={24} className="object-contain h-6 w-14" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800">Schmalz</p>
                        <p className="text-xs text-slate-500">Vacuum lifters &amp; crane systems</p>
                      </div>
                    </Link>

                    <Link href="/products/binar" onClick={closeDropdown}
                      className="flex items-center p-3 rounded-xl hover:bg-red-50 transition-all group/item">
                      <div className="bg-white border border-red-100 rounded-lg p-1.5 mr-3 shrink-0 group-hover/item:border-red-300 transition-colors">
                        <Image src="/brands/binar.webp" alt="Binar Handling" width={56} height={24} className="object-contain h-6 w-14" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800">Binar Handling</p>
                        <p className="text-xs text-slate-500">Intelligent lift arms &amp; grippers</p>
                      </div>
                    </Link>
                  </div>
                  <div className="border-t border-slate-100 px-4 py-3">
                  </div>
                </div>
              </div>
            </div>

            {/* Dropdown Industries */}
            <div
              className="relative group py-2"
              onMouseEnter={() => openDropdown('industries')}
              onMouseLeave={closeDropdown}
            >
              <button className="flex items-center space-x-1 text-slate-600 group-hover:text-cyan-600 transition-colors text-sm font-semibold tracking-wide outline-none">
                <span>Industries</span>
                <ChevronDown size={16} className={`transition-transform duration-300 ${activeDropdown === 'industries' ? 'rotate-180' : ''}`} />
              </button>

              <div className={`absolute left-0 top-full w-64 pt-2 transition-all duration-300 origin-top-left ${activeDropdown === 'industries' ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible pointer-events-none'}`}>
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden shadow-slate-200/50">
                  <div className="p-2 space-y-1">
                    <Link href="/industries/food-beverage" onClick={closeDropdown}
                      className="flex items-start p-3 rounded-xl hover:bg-slate-50 transition-all group/item">
                      <div className="bg-blue-50 p-2 rounded-lg group-hover/item:bg-blue-100 transition-colors mr-3 text-blue-600">
                        <Package size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">Food & Pharma</p>
                        <p className="text-xs text-slate-500">Hygienic standard</p>
                      </div>
                    </Link>

                    <Link href="/industries/automotive-metal" onClick={closeDropdown}
                      className="flex items-start p-3 rounded-xl hover:bg-slate-50 transition-all group/item">
                      <div className="bg-cyan-50 p-2 rounded-lg group-hover/item:bg-cyan-100 transition-colors mr-3 text-cyan-600">
                        <Briefcase size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">Auto & Metal</p>
                        <p className="text-xs text-slate-500">Heavy duty lifting</p>
                      </div>
                    </Link>

                    <Link href="/industries/logistics-ecommerce" onClick={closeDropdown}
                      className="flex items-start p-3 rounded-xl hover:bg-slate-50 transition-all group/item">
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 group-hover/item:bg-slate-100 transition-colors mr-3 text-blue-700">
                        <BarChart3 size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">Logistics & E-comm</p>
                        <p className="text-xs text-slate-500">High speed sorting</p>
                      </div>
                    </Link>
                  </div>
                  <div className="border-t border-slate-100 px-4 py-3 bg-slate-50">
                    <Link href="/industries" onClick={closeDropdown} className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 w-full justify-center">
                      View All 8 Industries
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Us Link */}

            <Link href="/services" className="text-slate-600 hover:text-cyan-600 transition-colors text-sm font-semibold tracking-wide">
              {t.navbar.services}
            </Link>
            <Link href="/contact" className="text-slate-600 hover:text-cyan-600 transition-colors text-sm font-semibold tracking-wide">
              {t.navbar.contact}
            </Link>
          </div>

          {/* Right Side: Button (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-full transition-all shadow-md shadow-blue-500/20 hover:shadow-blue-500/40 text-sm">
              {t.navbar.quote}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none p-2"
              aria-label={isOpen ? t.navbar.closeMenu : t.navbar.openMenu}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 absolute top-full left-0 w-full shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <Link href="/" className="block px-3 py-2.5 rounded-md text-base font-semibold text-slate-600 hover:text-cyan-600 hover:bg-slate-50" onClick={() => setIsOpen(false)}>{t.navbar.home}</Link>
            <Link href="/about" className="block px-3 py-2.5 rounded-md text-base font-semibold text-slate-600 hover:text-cyan-600 hover:bg-slate-50" onClick={() => setIsOpen(false)}>{t.navbar.about}</Link>

            <div className="py-2 border-b border-slate-100">
              <p className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Quick Actions</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-3">
                <Link href="/contact" className="rounded-lg bg-blue-600 text-white text-sm font-bold py-2.5 text-center" onClick={() => setIsOpen(false)}>
                  Get Quote
                </Link>
                <Link href="/digital-assistant/roi-calculator" className="rounded-lg border border-slate-200 text-slate-700 text-sm font-bold py-2.5 text-center" onClick={() => setIsOpen(false)}>
                  ROI Calculator
                </Link>
                <Link href="/products" className="rounded-lg border border-slate-200 text-slate-700 text-sm font-bold py-2.5 text-center" onClick={() => setIsOpen(false)}>
                  Products
                </Link>
              </div>
            </div>

            {/* Mobile Digital Assistants Section */}
            <div className="py-2 border-y border-slate-50">
              <p className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t.navbar.digitalAssistants}</p>
              <Link href="/digital-assistant/vacuum-calculator" className="flex items-center space-x-3 px-3 py-2.5 rounded-md text-base font-semibold text-slate-600 hover:text-cyan-600 hover:bg-slate-50" onClick={() => setIsOpen(false)}>
                <Calculator size={18} className="text-blue-600" /><span>Vacuum Calculator</span>
              </Link>
              <Link href="/digital-assistant/roi-calculator" className="flex items-center space-x-3 px-3 py-2.5 rounded-md text-base font-semibold text-slate-600 hover:text-cyan-600 hover:bg-slate-50" onClick={() => setIsOpen(false)}>
                <BarChart3 size={18} className="text-cyan-600" /><span>ROI Calculator</span>
              </Link>
              <Link href="/digital-assistant/selection-aids" className="flex items-center space-x-3 px-3 py-2.5 rounded-md text-base font-semibold text-slate-600 hover:text-cyan-600 hover:bg-slate-50" onClick={() => setIsOpen(false)}>
                <Cpu size={18} className="text-blue-600" /><span>Selection Aids</span>
              </Link>
              <Link href="/digital-assistant/video-library" className="flex items-center space-x-3 px-3 py-2.5 rounded-md text-base font-semibold text-slate-600 hover:text-cyan-600 hover:bg-slate-50" onClick={() => setIsOpen(false)}>
                <Play size={18} className="text-cyan-600" /><span>Video Library</span>
              </Link>
            </div>


            {/* Mobile Insights Section */}
            <div className="py-2 border-b border-slate-50">
              <p className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t.navbar.insights}</p>
              <Link href="/news" className="flex items-center space-x-3 px-3 py-2.5 rounded-md text-base font-semibold text-slate-600 hover:text-cyan-600 hover:bg-slate-50" onClick={() => setIsOpen(false)}>
                <Newspaper size={18} className="text-blue-600" /><span>News &amp; Updates</span>
              </Link>
              <Link href="/our-projects" className="flex items-center space-x-3 px-3 py-2.5 rounded-md text-base font-semibold text-slate-600 hover:text-cyan-600 hover:bg-slate-50" onClick={() => setIsOpen(false)}>
                <Briefcase size={18} className="text-cyan-600" /><span>Our Projects</span>
              </Link>
              <Link href="/news/ergonomics" className="flex items-center space-x-3 px-3 py-2.5 rounded-md text-base font-semibold text-slate-600 hover:text-cyan-600 hover:bg-slate-50" onClick={() => setIsOpen(false)}>
                <HeartPulse size={18} className="text-blue-700" /><span>Ergonomics Hub</span>
              </Link>
            </div>

            {/* Mobile Products Section */}
            <div className="py-2 border-b border-slate-50">
              <p className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t.navbar.products}</p>
              <Link href="/products" className="flex items-center space-x-3 px-3 py-2.5 rounded-md text-base font-semibold text-slate-600 hover:text-cyan-600 hover:bg-slate-50" onClick={() => setIsOpen(false)}>
                <Package size={18} className="text-blue-600" /><span>{t.navbar.allBrands}</span>
              </Link>
              <Link href="/products/schmalz" className="flex items-center space-x-3 px-3 py-2.5 rounded-md text-base font-semibold text-slate-600 hover:text-cyan-600 hover:bg-slate-50" onClick={() => setIsOpen(false)}>
                <div className="bg-white border border-blue-100 rounded-md p-1 shrink-0">
                  <Image src="/brands/schmalz.webp" alt="Schmalz" width={40} height={18} className="object-contain h-[18px] w-10" />
                </div>
                <span>Schmalz</span>
              </Link>
              <Link href="/products/binar" className="flex items-center space-x-3 px-3 py-2.5 rounded-md text-base font-semibold text-slate-600 hover:text-cyan-600 hover:bg-slate-50" onClick={() => setIsOpen(false)}>
                <div className="bg-white border border-red-100 rounded-md p-1 shrink-0">
                  <Image src="/brands/binar.webp" alt="Binar Handling" width={40} height={18} className="object-contain h-[18px] w-10" />
                </div>
                <span>Binar Handling</span>
              </Link>
            </div>

            <Link href="/services" className="block px-3 py-2.5 rounded-md text-base font-semibold text-slate-600 hover:text-cyan-600 hover:bg-slate-50" onClick={() => setIsOpen(false)}>{t.navbar.services}</Link>
            <Link href="/contact" className="block px-3 py-2.5 rounded-md text-base font-semibold text-slate-600 hover:text-cyan-600 hover:bg-slate-50" onClick={() => setIsOpen(false)}>{t.navbar.contact}</Link>

            <div className="pt-4">
              <Link href="/contact"
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-blue-500/20"
                onClick={() => setIsOpen(false)}>
                {t.navbar.quote}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}