"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, Calculator, Cpu, Newspaper, BookOpen, Briefcase, Package, Play } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // Single state replaces 3 separate states — null = all closed, string = which dropdown is open
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const openDropdown = (name: string) => setActiveDropdown(name);
  const closeDropdown = () => setActiveDropdown(null);

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-white border-b border-slate-200 shadow-sm py-2 md:py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="block relative h-16 w-64 hover:opacity-80 transition-opacity">
              <Image
                src="/logo.png"
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
              Home
            </Link>
            <Link href="/about" className="text-slate-600 hover:text-cyan-600 transition-colors text-sm font-semibold tracking-wide">
              About Us
            </Link>

            {/* Dropdown INSIGHTS */}
            <div
              className="relative group py-2"
              onMouseEnter={() => openDropdown('insights')}
              onMouseLeave={closeDropdown}
            >
              <button className="flex items-center space-x-1 text-slate-600 group-hover:text-cyan-600 transition-colors text-sm font-semibold tracking-wide outline-none">
                <span>Insights</span>
                <ChevronDown size={16} className={`transition-transform duration-300 ${activeDropdown === 'insights' ? 'rotate-180' : ''}`} />
              </button>

              <div className={`absolute left-0 top-full w-64 pt-2 transition-all duration-300 origin-top-left ${activeDropdown === 'insights' ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible pointer-events-none'}`}>
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden shadow-slate-200/50">
                  <div className="p-2 space-y-1">
                    <Link href="/news" onClick={closeDropdown}
                      className="flex items-start p-3 rounded-xl hover:bg-slate-50 transition-all group/item">
                      <div className="bg-orange-50 p-2 rounded-lg group-hover/item:bg-orange-100 transition-colors mr-3 text-orange-600">
                        <Newspaper size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">News &amp; Updates</p>
                        <p className="text-xs text-slate-500">Corporate &amp; product news</p>
                      </div>
                    </Link>

                    <Link href="/our-projects" onClick={closeDropdown}
                      className="flex items-start p-3 rounded-xl hover:bg-slate-50 transition-all group/item">
                      <div className="bg-emerald-50 p-2 rounded-lg group-hover/item:bg-emerald-100 transition-colors mr-3 text-emerald-600">
                        <Briefcase size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">Our Projects</p>
                        <p className="text-xs text-slate-500">Industrial success stories</p>
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
                <span>Digital Assistants</span>
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

                    <Link href="/digital-assistant/selection-aids" onClick={closeDropdown}
                      className="flex items-start p-3 rounded-xl hover:bg-slate-50 transition-all group/item">
                      <div className="bg-cyan-50 p-2 rounded-lg group-hover/item:bg-cyan-100 transition-colors mr-3 text-cyan-600">
                        <Cpu size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">Selection Aids</p>
                        <p className="text-xs text-slate-500">Smart tools for picking parts</p>
                      </div>
                    </Link>

                    <Link href="/digital-assistant/video-library" onClick={closeDropdown}
                      className="flex items-start p-3 rounded-xl hover:bg-slate-50 transition-all group/item">
                      <div className="bg-red-50 p-2 rounded-lg group-hover/item:bg-red-100 transition-colors mr-3 text-red-600">
                        <Play size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">Video Library</p>
                        <p className="text-xs text-slate-500">Demo produk Schmalz</p>
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
                <span>Products</span>
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
                        <Image src="/brands/schmalz.png" alt="Schmalz" width={56} height={24} className="object-contain h-6 w-14" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800">Schmalz</p>
                        <p className="text-xs text-slate-500">Vacuum lifters &amp; crane systems</p>
                      </div>
                    </Link>

                    <Link href="/products/binar" onClick={closeDropdown}
                      className="flex items-center p-3 rounded-xl hover:bg-red-50 transition-all group/item">
                      <div className="bg-white border border-red-100 rounded-lg p-1.5 mr-3 shrink-0 group-hover/item:border-red-300 transition-colors">
                        <Image src="/brands/binar.png" alt="Binar Handling" width={56} height={24} className="object-contain h-6 w-14" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800">Binar Handling</p>
                        <p className="text-xs text-slate-500">Intelligent lift arms &amp; grippers</p>
                      </div>
                    </Link>
                  </div>
                  <div className="border-t border-slate-100 px-4 py-3">
                    <Link href="/products" onClick={closeDropdown} className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                      Lihat semua brand →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/services" className="text-slate-600 hover:text-cyan-600 transition-colors text-sm font-semibold tracking-wide">
              Services
            </Link>
            <Link href="/contact" className="text-slate-600 hover:text-cyan-600 transition-colors text-sm font-semibold tracking-wide">
              Contact
            </Link>
          </div>

          {/* Right Side: Button (Desktop) */}
          <div className="hidden md:flex items-center">
            <Link href="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-full transition-all shadow-md shadow-blue-500/20 hover:shadow-blue-500/40 text-sm">
              Get Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none p-2"
              aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
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
            <Link href="/" className="block px-3 py-3 rounded-md text-base font-semibold text-slate-600 hover:text-cyan-600 hover:bg-slate-50" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/about" className="block px-3 py-3 rounded-md text-base font-semibold text-slate-600 hover:text-cyan-600 hover:bg-slate-50" onClick={() => setIsOpen(false)}>About Us</Link>

            {/* Mobile Digital Assistants Section */}
            <div className="py-2 border-y border-slate-50">
              <p className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Digital Assistants</p>
              <Link href="/digital-assistant/vacuum-calculator" className="flex items-center space-x-3 px-3 py-3 rounded-md text-base font-semibold text-slate-600 hover:text-cyan-600 hover:bg-slate-50" onClick={() => setIsOpen(false)}>
                <Calculator size={18} className="text-blue-500" /><span>Vacuum Calculator</span>
              </Link>
              <Link href="/digital-assistant/selection-aids" className="flex items-center space-x-3 px-3 py-3 rounded-md text-base font-semibold text-slate-600 hover:text-cyan-600 hover:bg-slate-50" onClick={() => setIsOpen(false)}>
                <Cpu size={18} className="text-cyan-500" /><span>Selection Aids</span>
              </Link>
              <Link href="/digital-assistant/video-library" className="flex items-center space-x-3 px-3 py-3 rounded-md text-base font-semibold text-slate-600 hover:text-cyan-600 hover:bg-slate-50" onClick={() => setIsOpen(false)}>
                <Play size={18} className="text-red-500" /><span>Video Library</span>
              </Link>
            </div>


            {/* Mobile Insights Section */}
            <div className="py-2 border-b border-slate-50">
              <p className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Insights</p>
              <Link href="/news" className="flex items-center space-x-3 px-3 py-3 rounded-md text-base font-semibold text-slate-600 hover:text-cyan-600 hover:bg-slate-50" onClick={() => setIsOpen(false)}>
                <Newspaper size={18} className="text-orange-500" /><span>News &amp; Updates</span>
              </Link>
              <Link href="/our-projects" className="flex items-center space-x-3 px-3 py-3 rounded-md text-base font-semibold text-slate-600 hover:text-cyan-600 hover:bg-slate-50" onClick={() => setIsOpen(false)}>
                <Briefcase size={18} className="text-emerald-500" /><span>Our Projects</span>
              </Link>
            </div>

            {/* Mobile Products Section */}
            <div className="py-2 border-b border-slate-50">
              <p className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Products</p>
              <Link href="/products" className="flex items-center space-x-3 px-3 py-3 rounded-md text-base font-semibold text-slate-600 hover:text-cyan-600 hover:bg-slate-50" onClick={() => setIsOpen(false)}>
                <Package size={18} className="text-slate-400" /><span>Semua Brand</span>
              </Link>
              <Link href="/products/schmalz" className="flex items-center space-x-3 px-3 py-3 rounded-md text-base font-semibold text-slate-600 hover:text-cyan-600 hover:bg-slate-50" onClick={() => setIsOpen(false)}>
                <div className="bg-white border border-blue-100 rounded-md p-1 shrink-0">
                  <Image src="/brands/schmalz.png" alt="Schmalz" width={40} height={18} className="object-contain h-[18px] w-10" />
                </div>
                <span>Schmalz</span>
              </Link>
              <Link href="/products/binar" className="flex items-center space-x-3 px-3 py-3 rounded-md text-base font-semibold text-slate-600 hover:text-cyan-600 hover:bg-slate-50" onClick={() => setIsOpen(false)}>
                <div className="bg-white border border-red-100 rounded-md p-1 shrink-0">
                  <Image src="/brands/binar.png" alt="Binar Handling" width={40} height={18} className="object-contain h-[18px] w-10" />
                </div>
                <span>Binar Handling</span>
              </Link>
            </div>

            <Link href="/services" className="block px-3 py-3 rounded-md text-base font-semibold text-slate-600 hover:text-cyan-600 hover:bg-slate-50" onClick={() => setIsOpen(false)}>Services</Link>
            <Link href="/contact" className="block px-3 py-3 rounded-md text-base font-semibold text-slate-600 hover:text-cyan-600 hover:bg-slate-50" onClick={() => setIsOpen(false)}>Contact</Link>

            <div className="pt-4">
              <Link href="/contact"
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-blue-500/20"
                onClick={() => setIsOpen(false)}>
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}