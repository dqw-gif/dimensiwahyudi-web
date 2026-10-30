'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';

export type Lang = 'en' | 'id';

type Dictionary = {
  navbar: {
    home: string;
    about: string;
    insights: string;
    digitalAssistants: string;
    products: string;
    industries: string;
    services: string;
    contact: string;
    quote: string;
    seeAllBrands: string;
    selectionAidsDesc: string;
    videoLibraryDesc: string;
    newsTitle: string;
    newsDesc: string;
    projectsTitle: string;
    projectsDesc: string;
    ergonomicsTitle: string;
    ergonomicsDesc: string;
    eventsTitle: string;
    eventsDesc: string;
    brochuresTitle: string;
    brochuresDesc: string;
    vacCalcDesc: string;
    roiCalcDesc: string;
    authDistributor: string;
    schmalzDesc: string;
    binarDesc: string;
    foodPharmaTitle: string;
    foodPharmaDesc: string;
    autoMetalTitle: string;
    autoMetalDesc: string;
    logisticsTitle: string;
    logisticsDesc: string;
    viewAllIndustries: string;
    quickActions: string;
    closeMenu: string;
    openMenu: string;
    language: string;
    allBrands: string;
  };
  footer: {
    memberOf: string;
    company: string;
    solutions: string;
    contactUs: string;
    about: string;
    projectGallery: string;
    industryInsights: string;
    ergonomicsCenter: string;
    career: string;
    downloadCatalogs: string;
    techConsultation: string;
    tagline: string;
    rightsReserved: string;
    sitemap: string;
    faq: string;
    privacyPolicy: string;
    termsOfService: string;
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
  en: {
    navbar: {
      home: 'Home',
      about: 'About Us',
      insights: 'Insights',
      digitalAssistants: 'Digital Assistants',
      products: 'Products',
      industries: 'Industries',
      services: 'Services',
      contact: 'Contact',
      quote: 'Get a Quote',
      seeAllBrands: 'See all brands →',
      selectionAidsDesc: 'Smart tools to pick the right parts',
      videoLibraryDesc: 'Watch Schmalz product demos',
      newsTitle: 'News & Updates',
      newsDesc: 'Latest engineering and industry updates',
      projectsTitle: 'Our Projects',
      projectsDesc: 'Actual industrial installation documentation',
      ergonomicsTitle: 'Ergonomics Hub',
      ergonomicsDesc: 'Health, productivity, and safety insights',
      eventsTitle: 'Industrial Events',
      eventsDesc: 'Upcoming seminars, expos & exhibitions',
      brochuresTitle: 'Catalogs & Brochures',
      brochuresDesc: 'Download official product catalogs',
      vacCalcDesc: 'Calculate vacuum system parameters',
      roiCalcDesc: 'Estimate ergonomic impact and ROI',
      authDistributor: 'Authorized Distributor',
      schmalzDesc: 'Vacuum lifters & crane systems',
      binarDesc: 'Intelligent lift arms & grippers',
      foodPharmaTitle: 'Food & Pharma',
      foodPharmaDesc: 'Hygienic & cleanroom standard',
      autoMetalTitle: 'Auto & Metal',
      autoMetalDesc: 'Heavy duty sheet & part lifting',
      logisticsTitle: 'Logistics & E-comm',
      logisticsDesc: 'High speed carton & sack sorting',
      viewAllIndustries: 'View All 8 Industries',
      quickActions: 'Quick Actions',
      closeMenu: 'Close menu',
      openMenu: 'Open menu',
      language: 'Language',
      allBrands: 'All Brands',
    },
    footer: {
      memberOf: 'Member of',
      company: 'Company',
      solutions: 'Handling Solutions',
      contactUs: 'Contact & Support',
      about: 'About Us',
      projectGallery: 'Project Gallery',
      industryInsights: 'Industry Insights',
      ergonomicsCenter: 'Ergonomics Center',
      career: 'Careers at DQW',
      downloadCatalogs: 'Download Product Catalogs',
      techConsultation: 'Technical Consultation',
      tagline:
        'Official Indonesian partner for industrial lifting and ergonomic handling systems. We deliver certified vacuum lifters from Schmalz Germany and electric manipulator arms from Binar Sweden to protect operators and keep factory lines moving.',
      rightsReserved: 'All rights reserved.',
      sitemap: 'Sitemap',
      faq: 'FAQ',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
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
  id: {
    navbar: {
      home: 'Beranda',
      about: 'Tentang Kami',
      insights: 'Insights',
      digitalAssistants: 'Asisten Digital',
      products: 'Produk',
      industries: 'Industri',
      services: 'Layanan',
      contact: 'Kontak',
      quote: 'Minta Penawaran',
      seeAllBrands: 'Lihat Semua Brand →',
      selectionAidsDesc: 'Alat bantu pemilihan unit & spesifikasi tepat',
      videoLibraryDesc: 'Tonton video demo cara kerja unit Schmalz',
      newsTitle: 'Berita & Artikel',
      newsDesc: 'Artikel teknis, riset, dan pembaruan industri',
      projectsTitle: 'Proyek Kami',
      projectsDesc: 'Dokumentasi instalasi aktual di pabrik',
      ergonomicsTitle: 'Pusat Ergonomi',
      ergonomicsDesc: 'Panduan kesehatan kerja, produktivitas, dan K3',
      eventsTitle: 'Agenda & Pameran',
      eventsDesc: 'Jadwal seminar teknis, pameran, dan eksibisi',
      brochuresTitle: 'Katalog & Brosur',
      brochuresDesc: 'Download brosur teknis resmi',
      vacCalcDesc: 'Hitung parameter gaya angkat sistem vakum',
      roiCalcDesc: 'Estimasi pengembalian investasi dan efisiensi lini',
      authDistributor: 'Distributor Resmi',
      schmalzDesc: 'Vacuum Tube Lifters & Crane Systems',
      binarDesc: 'Quick-Lift Systems & End-Effectors',
      foodPharmaTitle: 'Makanan & Farmasi',
      foodPharmaDesc: 'Standar higienis & ruang cleanroom',
      autoMetalTitle: 'Otomotif & Logam',
      autoMetalDesc: 'Penanganan plat baja & komponen berat',
      logisticsTitle: 'Logistik & Gudang',
      logisticsDesc: 'Pemindahan kardus & karung kecepatan tinggi',
      viewAllIndustries: 'Lihat Semua 8 Sektor Industri',
      quickActions: 'Akses Cepat',
      closeMenu: 'Tutup menu',
      openMenu: 'Buka menu',
      language: 'Bahasa',
      allBrands: 'Semua Brand',
    },
    footer: {
      memberOf: 'Bagian dari',
      company: 'Perusahaan',
      solutions: 'Solusi Handling',
      contactUs: 'Kontak & Dukungan',
      about: 'Tentang Kami',
      projectGallery: 'Galeri Proyek',
      industryInsights: 'Artikel Industri',
      ergonomicsCenter: 'Pusat Ergonomi',
      career: 'Karir di DQW',
      downloadCatalogs: 'Download Brosur Teknis',
      techConsultation: 'Konsultasi Teknis',
      tagline:
        'Mitra resmi sistem pengangkat industri dan material handling ergonomis di Indonesia. Menghadirkan Vacuum Lifter bersertifikat dari Schmalz Jerman dan lengan manipulator elektrik dari Binar Swedia untuk melindungi operator serta menjaga kelancaran lini produksi.',
      rightsReserved: 'Seluruh hak cipta dilindungi.',
      sitemap: 'Peta Situs',
      faq: 'FAQ',
      privacyPolicy: 'Kebijakan Privasi',
      termsOfService: 'Syarat Layanan',
    },
    selectionAids: {
      title: 'Asisten Pemilihan Sistem.',
      subtitle: 'Pilih kategori sistem vakum di bawah ini untuk memulai konfigurasi beban kerja.',
      startLifter: 'Mulai Audit Lifter →',
      startGenerator: 'Mulai Audit Generator →',
      resetAudit: 'Reset Audit',
      waitingData: 'Menunggu input parameter...',
      continue: 'LANJUTKAN',
      seeResult: 'LIHAT HASIL REKOMENDASI',
      back: '← KEMBALI',
      restart: 'Mulai Ulang',
      found: 'Ditemukan.',
      technicalSpec: 'Spesifikasi Teknis',
      performanceSnapshot: 'Ringkasan Performa',
      complete: 'Selesai',
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
  initialLang = 'en',
  children,
}: {
  initialLang?: Lang;
  children: React.ReactNode;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  React.useEffect(() => {
    try {
      const saved = (localStorage.getItem('site-lang') || (document.cookie.match(/site-lang=(id|en)/)?.[1])) as Lang | null;
      if (saved && (saved === 'en' || saved === 'id') && saved !== lang) {
        setLangState(saved);
        document.documentElement.lang = saved === 'id' ? 'id-ID' : 'en-ID';
      }
    } catch {
      // ignore
    }
  }, []);

  const setLang = (nextLang: Lang) => {
    setLangState(nextLang);
    try {
      document.cookie = `site-lang=${nextLang}; path=/; max-age=31536000; samesite=lax`;
      document.documentElement.lang = nextLang === 'id' ? 'id-ID' : 'en-ID';
      localStorage.setItem('site-lang', nextLang);
    } catch {
      // ignore storage errors
    }
  };

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: messages[lang] || messages.en,
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
