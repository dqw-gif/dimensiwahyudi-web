'use client';

import { createContext, useContext, useMemo, useState } from 'react';

export type Lang = 'id' | 'en';

type Dictionary = {
  navbar: {
    home: string;
    about: string;
    insights: string;
    digitalAssistants: string;
    products: string;
    services: string;
    contact: string;
    quote: string;
    seeAllBrands: string;
    selectionAidsDesc: string;
    videoLibraryDesc: string;
    newsDesc: string;
    projectsDesc: string;
    closeMenu: string;
    openMenu: string;
    language: string;
    allBrands: string;
  };
  footer: {
    company: string;
    solutions: string;
    contactUs: string;
    about: string;
    catalog: string;
    service: string;
    career: string;
    liftingService: string;
    tagline: string;
  };
  selectionAids: {
    title: string;
    subtitle: string;
    startLifter: string;
    startGenerator: string;
    resetAudit: string;
    waitingData: string;
    continue: string;
    seeResult: string;
    back: string;
    restart: string;
    found: string;
    technicalSpec: string;
    performanceSnapshot: string;
    complete: string;
  };
};

const messages: Record<Lang, Dictionary> = {
  id: {
    navbar: {
      home: 'Home',
      about: 'Tentang Kami',
      insights: 'Insight',
      digitalAssistants: 'Asisten Digital',
      products: 'Produk',
      services: 'Layanan',
      contact: 'Kontak',
      quote: 'Minta Penawaran',
      seeAllBrands: 'Lihat semua brand →',
      selectionAidsDesc: 'Alat pintar untuk memilih komponen',
      videoLibraryDesc: 'Demo produk Schmalz',
      newsDesc: 'Kabar perusahaan & produk terbaru',
      projectsDesc: 'Kisah sukses implementasi industri',
      closeMenu: 'Tutup menu',
      openMenu: 'Buka menu',
      language: 'Bahasa',
      allBrands: 'Semua Brand',
    },
    footer: {
      company: 'Perusahaan',
      solutions: 'Solusi Kami',
      contactUs: 'Hubungi Kami',
      about: 'Tentang Kami',
      catalog: 'Katalog Produk',
      service: 'Layanan Service',
      career: 'Karir',
      liftingService: 'Layanan & Service',
      tagline:
        'Mitra terpercaya solusi industrial lifting & handling system di Indonesia. Menggabungkan presisi teknologi Jerman dan inovasi Swedia untuk produktivitas pabrik Anda.',
    },
    selectionAids: {
      title: 'Selection Assistant.',
      subtitle: 'Pilih kategori sistem vakum di bawah ini untuk memulai konfigurasi.',
      startLifter: 'Mulai Audit Lifter →',
      startGenerator: 'Mulai Audit Generator →',
      resetAudit: 'Reset Audit',
      waitingData: 'Menunggu data...',
      continue: 'LANJUTKAN',
      seeResult: 'LIHAT HASIL',
      back: '← KEMBALI',
      restart: 'Restart',
      found: 'Found.',
      technicalSpec: 'Technical Spec Sheet',
      performanceSnapshot: 'Performance Snapshot',
      complete: 'Selesai',
    },
  },
  en: {
    navbar: {
      home: 'Home',
      about: 'About Us',
      insights: 'Insights',
      digitalAssistants: 'Digital Assistants',
      products: 'Products',
      services: 'Services',
      contact: 'Contact',
      quote: 'Get a Quote',
      seeAllBrands: 'See all brands →',
      selectionAidsDesc: 'Smart tools to pick the right parts',
      videoLibraryDesc: 'Watch Schmalz product demos',
      newsDesc: 'Latest company and product updates',
      projectsDesc: 'Real industrial success stories',
      closeMenu: 'Close menu',
      openMenu: 'Open menu',
      language: 'Language',
      allBrands: 'All Brands',
    },
    footer: {
      company: 'Company',
      solutions: 'Our Solutions',
      contactUs: 'Get in Touch',
      about: 'About Us',
      catalog: 'Product Catalog',
      service: 'Service Support',
      career: 'Careers',
      liftingService: 'Service & Support',
      tagline:
        'Your trusted partner for industrial lifting and handling solutions in Indonesia. We combine German precision and Swedish innovation to improve factory productivity.',
    },
    selectionAids: {
      title: 'Selection Assistant.',
      subtitle: 'Choose a vacuum system category below to start your configuration.',
      startLifter: 'Start Lifter Audit →',
      startGenerator: 'Start Generator Audit →',
      resetAudit: 'Reset Audit',
      waitingData: 'Waiting for inputs...',
      continue: 'CONTINUE',
      seeResult: 'SEE RESULTS',
      back: '← BACK',
      restart: 'Restart',
      found: 'Found.',
      technicalSpec: 'Technical Specs',
      performanceSnapshot: 'Performance Snapshot',
      complete: 'Done',
    },
  },
};

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  initialLang,
  children,
}: {
  initialLang: Lang;
  children: React.ReactNode;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = (nextLang: Lang) => {
    setLangState(nextLang);
    document.cookie = `site-lang=${nextLang}; path=/; max-age=31536000; samesite=lax`;
    document.documentElement.lang = nextLang;
    window.location.reload();
  };

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: messages[lang],
    }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
