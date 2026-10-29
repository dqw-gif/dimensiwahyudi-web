'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-50/70 text-slate-600 font-sans relative border-t border-slate-200/90 pt-16 pb-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Symmetrical 12-Column Grid (4 + 2 + 3 + 3) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">

          {/* Kolom 1: Profil & Brand DQW + Nabel Sakha Group (Span 4) */}
          <div className="lg:col-span-4 space-y-4 pr-0 lg:pr-6">
            <div>
              <Link href="/" className="block relative h-14 w-48 hover:opacity-90 transition-opacity">
                <Image
                  src="/logo-dqw-3-baris.svg"
                  alt="PT Dimensi Quantum Wahyudi Logo"
                  fill
                  className="object-contain object-left"
                  priority
                  unoptimized
                />
              </Link>

              {/* A Member of Nabel Sakha Group */}
              <div className="flex items-center gap-2 mt-3 pt-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {t.footer.memberOf}
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="relative h-4 w-7 shrink-0">
                    <Image
                      src="/nsg-ico.png"
                      alt="Nabel Sakha Group"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-xs font-bold tracking-tight text-slate-800">
                    Nabel Sakha Group
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-600 max-w-sm">
              {t.footer.tagline}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://www.linkedin.com/company/dimensiwahyudi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn PT Dimensi Quantum Wahyudi"
                className="w-8 h-8 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#005596] hover:border-[#005596] transition-colors shadow-2xs"
              >
                <Linkedin size={15} />
              </a>
              <a
                href="https://www.instagram.com/nabelsakha/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram PT Dimensi Quantum Wahyudi"
                className="w-8 h-8 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-pink-600 hover:border-pink-500 transition-colors shadow-2xs"
              >
                <Instagram size={15} />
              </a>
            </div>
          </div>

          {/* Kolom 2: Company (Span 2) */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4 pt-1">
              {t.footer.company}
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/about" className="text-slate-600 hover:text-[#005596] transition-colors">
                  {t.footer.about}
                </Link>
              </li>
              <li>
                <Link href="/our-projects" className="text-slate-600 hover:text-[#005596] transition-colors">
                  {t.footer.projectGallery}
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-slate-600 hover:text-[#005596] transition-colors">
                  {t.footer.industryInsights}
                </Link>
              </li>
              <li>
                <Link href="/news/ergonomics" className="text-slate-600 hover:text-[#005596] transition-colors">
                  {t.footer.ergonomicsCenter}
                </Link>
              </li>
              <li>
                <Link href="/career" className="text-slate-600 hover:text-[#005596] transition-colors">
                  {t.footer.career}
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Solutions (Span 3) - Product names strictly 100% English */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4 pt-1">
              {t.footer.solutions}
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/products/schmalz/vacuum-tube-lifter" className="text-slate-600 hover:text-[#005596] transition-colors">
                  Vacuum Tube Lifters (Jumbo)
                </Link>
              </li>
              <li>
                <Link href="/products/schmalz/vacumaster" className="text-slate-600 hover:text-[#005596] transition-colors">
                  Heavy Duty VacuMaster
                </Link>
              </li>
              <li>
                <Link href="/products/schmalz/crane-system" className="text-slate-600 hover:text-[#005596] transition-colors">
                  Crane Systems &amp; Jib Cranes
                </Link>
              </li>
              <li>
                <Link href="/products/binar" className="text-slate-600 hover:text-[#005596] transition-colors">
                  Binar Intelligent Quick-Lift
                </Link>
              </li>
              <li>
                <Link href="/products/schmalz/vacuum-suction-cups" className="text-slate-600 hover:text-[#005596] transition-colors">
                  Suction Cups &amp; Components
                </Link>
              </li>
              <li>
                <Link href="/brosur" className="text-slate-600 hover:text-[#005596] transition-colors">
                  {t.footer.downloadCatalogs}
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Contact & Office (Span 3) */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4 pt-1">
              {t.footer.contactUs}
            </h3>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-[#005596] mt-0.5 shrink-0" />
                <span className="leading-relaxed text-slate-600">
                  BizPark 3 Bekasi, Jl. Sultan Agung No. 80 Blok C37,<br />
                  Medan Satria, Bekasi City, West Java 17132, Indonesia
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#005596] shrink-0" />
                <a
                  href="https://wa.me/6281119168752"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-slate-800 hover:text-[#005596] font-semibold transition-colors"
                >
                  +62 811-1916-8752
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-[#005596] shrink-0" />
                <a
                  href="mailto:sales@dimensiwahyudi.com"
                  className="text-slate-700 hover:text-[#005596] transition-colors"
                >
                  sales@dimensiwahyudi.com
                </a>
              </li>
            </ul>

            <div className="mt-5">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#005596] hover:bg-[#004478] text-white text-xs font-semibold transition-colors shadow-2xs"
              >
                <span>{t.footer.techConsultation}</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="border-t border-slate-200/90 pt-7 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p className="text-center md:text-left">
            &copy; 2026 PT Dimensi Quantum Wahyudi. {t.footer.rightsReserved}
          </p>

          <div className="flex gap-5 items-center flex-wrap justify-center text-slate-500">
            <Link href="/site-directory" className="hover:text-slate-900 transition-colors">
              {t.footer.sitemap}
            </Link>
            <span className="text-slate-300">·</span>
            <Link href="/faq" className="hover:text-slate-900 transition-colors">
              {t.footer.faq}
            </Link>
            <span className="text-slate-300">·</span>
            <Link href="/privacy-policy" className="hover:text-slate-900 transition-colors">
              {t.footer.privacyPolicy}
            </Link>
            <span className="text-slate-300">·</span>
            <Link href="/terms-of-service" className="hover:text-slate-900 transition-colors">
              {t.footer.termsOfService}
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
