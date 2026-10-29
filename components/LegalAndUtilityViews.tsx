'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { FileText, Package, Briefcase, Sliders, Info, Home, AlertTriangle, ChevronRight } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

export function Custom500View() {
  const { lang } = useLanguage();
  const isId = lang === 'id';

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans select-none relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-100 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-md w-full bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10 shadow-xl shadow-slate-200/50 text-center">
        <div className="w-16 h-16 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center text-red-500 mx-auto mb-6">
          <AlertTriangle size={32} />
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
          {isId ? 'Gangguan Sistem Sementara' : 'System Interruption'}
        </h1>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
          {isId
            ? 'Kami mengalami kendala koneksi server sementara. Tim teknis kami telah menerima notifikasi ini. Silakan muat ulang halaman beberapa saat lagi.'
            : 'We encountered an unexpected database or connection issue. Our technical team has been notified. Please try again shortly.'}
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-xl inline-flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98]"
          >
            <Home size={18} />
            {isId ? 'Kembali ke Beranda' : 'Back to Home'}
          </Link>
        </div>
      </div>
    </main>
  );
}

export function PrivacyPolicyView() {
  const { lang } = useLanguage();
  const isId = lang === 'id';

  const formattedDate = new Date().toLocaleDateString(isId ? 'id-ID' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="min-h-screen pt-24 pb-16 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
            {isId ? 'Kebijakan Privasi' : 'Privacy Policy'}
          </h1>
          <p className="text-slate-500 mb-8">
            {isId ? `Terakhir diperbarui: ${formattedDate}` : `Last updated: ${formattedDate}`}
          </p>

          {isId ? (
            <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-blue-600">
              <p>
                PT Dimensi Quantum Wahyudi (&quot;kami&quot;) berkomitmen untuk melindungi privasi dan data pribadi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, memproses, dan melindungi informasi Anda saat mengakses situs web kami sesuai dengan Undang-Undang Pelindungan Data Pribadi di Indonesia (UU No. 27 Tahun 2022 tentang PDP).
              </p>

              <h2>1. Informasi yang Kami Kumpulkan</h2>
              <p>Kami dapat mengumpulkan informasi identifikasi bisnis dan kontak dari Anda saat Anda:</p>
              <ul>
                <li>Mengunjungi situs web dan halaman katalog produk kami</li>
                <li>Mengisi formulir kontak teknis atau permintaan penawaran harga (RFQ)</li>
                <li>Menggunakan asisten digital interaktif kami (seperti Vacuum Calculator, Kalkulator ROI, atau Selection Aids)</li>
                <li>Menghubungi tim engineering kami melalui WhatsApp, email korporat, atau telepon</li>
              </ul>
              <p>
                Jenis data yang dapat kami kumpulkan meliputi nama lengkap, nama perusahaan, alamat email korporat, nomor telepon/WhatsApp, serta parameter spesifikasi proyek (seperti berat workpiece dan dimensi area kerja) yang Anda berikan secara sukarela.
              </p>

              <h2>2. Penggunaan Informasi</h2>
              <p>Informasi yang dikumpulkan digunakan secara khusus untuk keperluan bisnis dan teknis berikut:</p>
              <ul>
                <li>Merespons pertanyaan teknis, survei pabrik, dan permintaan penawaran harga resmi</li>
                <li>Memberikan layanan purnajual (Aftersales Service) dan dukungan aplikasi engineering</li>
                <li>Meningkatkan akurasi kalkulator digital dan pengalaman navigasi pengguna di situs kami</li>
                <li>Mengirimkan pembaruan katalog teknis atau undangan pameran industri (hanya jika Anda menyetujuinya)</li>
              </ul>

              <h2>3. Cookie dan Teknologi Analitik</h2>
              <p>
                Situs web kami menggunakan cookie dan teknologi analitik (seperti Google Analytics) untuk menjaga preferensi bahasa Anda, menganalisis performa halaman, dan memahami kebutuhan pengunjung industri. Anda dapat menerima atau menolak cookie analitik melalui banner persetujuan cookie yang tersedia di layar.
              </p>

              <h2>4. Keamanan dan Kerahasiaan Data</h2>
              <p>
                Kami menerapkan standar keamanan penyimpanan data yang ketat untuk mencegah akses tidak sah, perubahan, atau penyalahgunaan informasi bisnis Anda.
                <br /><br />
                Kami tidak pernah menjual, menyewakan, atau memperdagangkan data pribadi maupun data proyek pelanggan kepada pihak ketiga mana pun.
              </p>

              <h2>5. Hak Subjek Data</h2>
              <p>
                Sesuai ketentuan UU PDP yang berlaku di Indonesia, Anda berhak untuk meminta akses, pembaruan, koreksi, atau penghapusan data pribadi Anda yang tersimpan di sistem kami kapan saja.
              </p>

              <h2>6. Pembaruan Kebijakan Privasi</h2>
              <p>
                PT Dimensi Quantum Wahyudi dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu mengikuti perkembangan regulasi dan layanan digital kami. Setiap perubahan akan langsung ditampilkan pada halaman ini.
              </p>

              <h2>7. Hubungi Kami</h2>
              <p>
                Apabila Anda memiliki pertanyaan mengenai Kebijakan Privasi ini atau pengelolaan data bisnis Anda, silakan hubungi kami di:
                <br /><br />
                <strong>PT Dimensi Quantum Wahyudi</strong><br />
                BizPark 3 Bekasi, Jl. Sultan Agung No.80 No. C37,<br />
                Kali Baru, Medan Satria, Kota Bekasi, Jawa Barat 17132<br />
                Email: <strong>sales@dimensiwahyudi.com</strong>
              </p>
            </div>
          ) : (
            <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-blue-600">
              <p>
                PT Dimensi Quantum Wahyudi (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy and personal data. This Privacy Policy outlines how we collect, use, process, and protect your information when you use our website in compliance with the Personal Data Protection Law of Indonesia (UU PDP).
              </p>

              <h2>1. Information We Collect</h2>
              <p>We may collect personal identification information from you in a variety of ways, including, but not limited to, when you:</p>
              <ul>
                <li>Visit our website</li>
                <li>Fill out our contact forms or request a quote</li>
                <li>Use our interactive digital assistants (e.g., Vacuum Calculator, ROI Calculator)</li>
                <li>Communicate with us via WhatsApp, email, or telephone</li>
              </ul>
              <p>
                The types of personal data we may collect include your name, company name, corporate email address, phone number, and any project specifications you voluntarily provide to us.
              </p>

              <h2>2. How We Use Your Information</h2>
              <p>We may use the collected information for the following purposes:</p>
              <ul>
                <li>To respond to your inquiries, technical requests, and quotation requests</li>
                <li>To provide customer service and engineering support</li>
                <li>To improve our website functionality, tools, and user experience based on analytics</li>
                <li>To send you relevant technical updates, marketing emails, or product news (only if you have opted in)</li>
              </ul>

              <h2>3. Cookies and Tracking Technologies</h2>
              <p>
                Our website uses cookies and similar tracking technologies (such as Google Analytics) to enhance user experience, analyze site traffic, and understand where our audience comes from. You have the ability to accept or decline cookies through our cookie consent banner. Please refer to your browser settings for more control over tracking.
              </p>

              <h2>4. Data Sharing and Protection</h2>
              <p>
                We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information.
                <br /><br />
                We do not sell, trade, or rent user personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners and trusted affiliates.
              </p>

              <h2>5. Your Rights</h2>
              <p>
                Under applicable data protection laws, you have the right to access, rectify, or erase any personal data we hold about you. You may also withdraw your consent to our processing of your personal data at any time.
              </p>

              <h2>6. Changes to This Privacy Policy</h2>
              <p>
                PT Dimensi Quantum Wahyudi has the discretion to update this privacy policy at any time. We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect.
              </p>

              <h2>7. Contacting Us</h2>
              <p>
                If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at:
                <br /><br />
                <strong>PT Dimensi Quantum Wahyudi</strong><br />
                BizPark 3 Bekasi, Jl. Sultan Agung No.80 No. C37,<br />
                Kali Baru, Medan Satria, Bekasi, West Java 17132<br />
                Email: <strong>sales@dimensiwahyudi.com</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export function TermsOfServiceView() {
  const { lang } = useLanguage();
  const isId = lang === 'id';

  const formattedDate = new Date().toLocaleDateString(isId ? 'id-ID' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="min-h-screen pt-24 pb-16 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
            {isId ? 'Syarat & Ketentuan Layanan' : 'Terms of Service'}
          </h1>
          <p className="text-slate-500 mb-8">
            {isId ? `Terakhir diperbarui: ${formattedDate}` : `Last updated: ${formattedDate}`}
          </p>

          {isId ? (
            <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-blue-600">
              <h2>1. Penerimaan Ketentuan</h2>
              <p>
                Dengan mengakses dan menggunakan situs web PT Dimensi Quantum Wahyudi (&quot;kami&quot;), Anda menyetujui Syarat &amp; Ketentuan Layanan ini. Apabila Anda tidak menyetujui bagian mana pun dari ketentuan ini, mohon untuk tidak melanjutkan penggunaan situs web kami.
              </p>

              <h2>2. Penggunaan Situs Web</h2>
              <p>
                Situs web kami menyediakan informasi teknis mengenai solusi Vacuum Lifters, Crane Systems, komponen vakum, manipulator elektrik, serta layanan engineering kami. Seluruh materi ditujukan sebagai referensi teknis dan komersial B2B. Anda dilarang menggunakan situs ini dengan cara yang dapat merusak ketersediaan atau keamanan jaringan kami.
              </p>

              <h2>3. Hak Kekayaan Intelektual</h2>
              <p>
                Kecuali dinyatakan lain, PT Dimensi Quantum Wahyudi beserta prinsipal resmi kami (J. Schmalz GmbH dan Binar Handling AB) memegang hak kekayaan intelektual atas seluruh merek produk, foto proyek, diagram teknis, dan materi di situs ini. Anda diperkenankan mengunduh brosur teknis untuk keperluan evaluasi internal perusahaan Anda.
              </p>

              <h2>4. Spesifikasi Produk dan Hasil Simulasi Kalkulator</h2>
              <p>
                Spesifikasi teknis, konfigurasi produk, serta hasil perhitungan dari alat bantu digital (seperti Vacuum Calculator, Kalkulator ROI, dan Selection Aids) di situs ini bersifat estimasi awal. Untuk penentuan desain sistem akhir dan penawaran harga mengikat, selalu lakukan verifikasi bersama tim Application Engineer kami melalui survei lapangan atau uji angkat workpiece.
              </p>

              <h2>5. Batasan Tanggung Jawab</h2>
              <p>
                Sejauh diizinkan oleh hukum yang berlaku, PT Dimensi Quantum Wahyudi tidak bertanggung jawab atas kerugian tidak langsung atau konsekuensial yang timbul dari penerapan hasil kalkulasi mandiri tanpa verifikasi engineering resmi dari tim kami.
              </p>

              <h2>6. Hukum yang Berlaku</h2>
              <p>
                Syarat &amp; Ketentuan ini diatur dan ditafsirkan sesuai dengan hukum Negara Republik Indonesia. Setiap perselisihan yang timbul akan diselesaikan melalui yurisdiksi pengadilan yang berwenang di Indonesia.
              </p>

              <h2>7. Kontak Resmi</h2>
              <p>
                Jika Anda memiliki pertanyaan terkait Syarat &amp; Ketentuan Layanan ini, silakan hubungi kami melalui email di <strong>sales@dimensiwahyudi.com</strong>.
              </p>
            </div>
          ) : (
            <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-blue-600">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using the website of PT Dimensi Quantum Wahyudi (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
              </p>

              <h2>2. Use of the Website</h2>
              <p>
                Our website provides information about our industrial vacuum lifting solutions, products, and services. The content is for general information purposes only. You must not use our website in any way that causes damage to the website or impairs its availability or accessibility.
              </p>

              <h2>3. Intellectual Property Rights</h2>
              <p>
                Unless otherwise stated, PT Dimensi Quantum Wahyudi and/or our licensed partners (such as Schmalz and Binar Handling) own the intellectual property rights for all materials on this website. All intellectual property rights are reserved. You may view and print pages for your personal, non-commercial use, subject to restrictions set in these terms.
              </p>

              <h2>4. Product Information and Calculations</h2>
              <p>
                The product specifications, technical configurations, and outputs from digital tools (such as the Vacuum Calculator or ROI Calculator) provided on this site are indicative and intended for estimation purposes only. Always consult directly with our engineers for final system design and binding quotations.
              </p>

              <h2>5. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by applicable law, we exclude all representations, warranties, and conditions relating to our website and the use of this website. PT Dimensi Quantum Wahyudi shall not be liable for any indirect, special, or consequential loss or damage arising under these terms or in connection with our website.
              </p>

              <h2>6. Governing Law</h2>
              <p>
                These Terms will be governed by and interpreted in accordance with the laws of the Republic of Indonesia. Any disputes relating to these terms will be subject to the exclusive jurisdiction of the courts of Indonesia.
              </p>

              <h2>7. Contact Us</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at <strong>sales@dimensiwahyudi.com</strong>.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export function SiteDirectoryView() {
  const { lang } = useLanguage();
  const isId = lang === 'id';
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const structure = [
    {
      title: isId ? 'Perusahaan & Informasi' : 'Company & Information',
      icon: <Briefcase className="text-[#005596]" size={22} />,
      links: [
        { name: isId ? 'Beranda' : 'Home', href: '/' },
        { name: isId ? 'Tentang Kami' : 'About Us', href: '/about' },
        { name: isId ? 'Layanan Engineering' : 'Engineering Services', href: '/services' },
        { name: isId ? 'Portofolio Proyek' : 'Project Portfolio', href: '/our-projects' },
        { name: isId ? 'Karir' : 'Careers', href: '/career' },
        { name: isId ? 'Hubungi Sales & Engineering' : 'Contact Sales & Engineering', href: '/contact' },
        { name: isId ? 'Pertanyaan Umum (FAQ)' : 'Frequently Asked Questions', href: '/faq' },
      ],
    },
    {
      title: isId ? 'Produk & Solusi Sistem' : 'Products & Solutions',
      icon: <Package className="text-[#005596]" size={22} />,
      links: [
        { name: isId ? 'Katalog Semua Produk' : 'All Products Hub', href: '/products' },
        { name: 'Schmalz Vacuum Technology', href: '/products/schmalz' },
        { name: 'Vacuum Tube Lifters (Jumbo)', href: '/products/schmalz/vacuum-tube-lifter', isSubItem: true },
        { name: 'Vacuum Lifting Devices (VacuMaster)', href: '/products/schmalz/vacumaster', isSubItem: true },
        { name: 'Crane Systems & Jib Cranes', href: '/products/schmalz/crane-system', isSubItem: true },
        { name: 'Mobile Lifting Devices', href: '/products/schmalz/mobile-lifting-device', isSubItem: true },
        { name: 'Vacuum Generators & Ejectors', href: '/products/schmalz/vacuum-generator', isSubItem: true },
        { name: 'Vacuum Suction Cups', href: '/products/schmalz/vacuum-suction-cups', isSubItem: true },
        { name: 'Binar Handling Systems', href: '/products/binar' },
      ],
    },
    {
      title: isId ? 'Asisten Digital & Kalkulator' : 'Digital Assistants & Calculators',
      icon: <Sliders className="text-[#005596]" size={22} />,
      links: [
        { name: 'Vacuum Calculator', href: '/digital-assistant/vacuum-calculator' },
        { name: isId ? 'Kalkulator ROI & Ergonomi' : 'ROI & Ergonomic Calculator', href: '/digital-assistant/roi-calculator' },
        { name: 'Selection Aids', href: '/digital-assistant/selection-aids' },
        { name: isId ? 'Video Library Aplikasi' : 'Application Video Library', href: '/digital-assistant/video-library' },
        { name: isId ? 'Download Brosur Teknis' : 'Technical Brochures', href: '/brosur' },
      ],
    },
    {
      title: isId ? 'Wawasan Industri & Ergonomi' : 'Industrial Insights & Cases',
      icon: <FileText className="text-[#005596]" size={22} />,
      links: [
        { name: isId ? 'Pusat Artikel & Insights' : 'All Insights Hub', href: '/news' },
        { name: isId ? 'Pusat Panduan Ergonomi' : 'Ergonomics Knowledge Hub', href: '/news/ergonomics' },
        { name: isId ? 'Standar Keselamatan & K3' : 'Ergonomics & Safety Standards', href: '/news/ergonomics/safety-standards', isSubItem: true },
        { name: isId ? 'Produktivitas Material Handling' : 'Handling Productivity', href: '/news/ergonomics/productivity', isSubItem: true },
        { name: isId ? 'Risiko Kesehatan & Mitigasi MSD' : 'Health Risks & Mitigation', href: '/news/ergonomics/health-risks', isSubItem: true },
        { name: isId ? 'Glosarium Ergonomi Industri' : 'Industrial Ergonomics Glossary', href: '/news/ergonomics/glossary', isSubItem: true },
      ],
    },
    {
      title: isId ? 'Legal & Kepatuhan' : 'Legal & Compliance',
      icon: <Info className="text-[#005596]" size={22} />,
      links: [
        { name: isId ? 'Kebijakan Privasi' : 'Privacy Policy', href: '/privacy-policy' },
        { name: isId ? 'Syarat & Ketentuan Layanan' : 'Terms of Service', href: '/terms-of-service' },
      ],
    },
  ];

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    const cardWidth = clientWidth * 0.85;
    const index = Math.round(scrollLeft / (cardWidth > 0 ? cardWidth : 1));
    setActiveIndex(Math.min(Math.max(index, 0), structure.length - 1));
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
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50/70 to-white pt-28 pb-20 sm:pb-28 selection:bg-[#005596] selection:text-white relative overflow-hidden">
      {/* Contained Ambient Blue Glow (DESIGN_SYSTEM.md Rule 2) */}
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[400px] bg-[#005596]/6 rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[450px] h-[350px] bg-[#1d4ed8]/5 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14 text-left">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-[#005596]/15 shadow-[0_2px_10px_rgba(0,85,150,0.06)] mb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#005596]">
              {isId ? 'DIREKTORI SITUS' : 'SITE DIRECTORY'}
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
            {isId ? 'Peta Situs ' : 'HTML '}
            <span className="bg-gradient-to-r from-[#005596] to-[#1d4ed8] bg-clip-text text-transparent">
              {isId ? 'Lengkap' : 'Sitemap'}
            </span>
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-2xl">
            {isId
              ? 'Daftar lengkap seluruh halaman di ekosistem web PT Dimensi Quantum Wahyudi. Akses cepat ke katalog produk, kalkulator engineering, dan informasi korporat.'
              : 'A complete overview of our web ecosystem. Navigate quickly to our technical products, interactive simulators, or corporate information.'}
          </p>
        </div>

        {/* Glass Cards Grid (Desktop) & Horizontal Snap Swipe Carousel (Mobile < 1024px) */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex lg:grid lg:grid-cols-3 gap-5 sm:gap-8 overflow-x-auto lg:overflow-visible snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 pb-4 lg:pb-0"
        >
          {structure.map((section, idx) => (
            <div
              key={idx}
              className="w-[85vw] max-w-[340px] sm:max-w-[380px] lg:w-auto lg:max-w-none shrink-0 snap-center bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:ring-[#005596]/30 hover:bg-white hover:shadow-[0_20px_50px_-10px_rgba(0,85,150,0.14)] transition-all duration-300"
            >
              <div className="w-11 h-11 bg-[#005596]/8 rounded-xl flex items-center justify-center mb-5 border border-[#005596]/15">
                {section.icon}
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-4">
                {section.title}
              </h2>
              <ul className="space-y-2.5">
                {section.links.map((link, lIdx) => (
                  <li
                    key={lIdx}
                    className={`flex items-start ${link.isSubItem ? 'pl-4' : ''}`}
                  >
                    {link.isSubItem ? (
                      <span className="text-[#005596]/60 mr-2 font-mono text-xs mt-1 shrink-0">↳</span>
                    ) : (
                      <ChevronRight className="w-4 h-4 text-[#005596] mr-1.5 mt-1 shrink-0 opacity-75" />
                    )}
                    <Link
                      href={link.href}
                      className="text-sm sm:text-base text-slate-600 hover:text-[#005596] font-medium leading-relaxed transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile / Tablet Pagination Dots & Swipe Counter (DESIGN_SYSTEM.md Rule 5) */}
        <div className="flex lg:hidden flex-col items-center justify-center gap-2 mt-5 mb-1 relative z-20">
          <div className="flex items-center gap-2">
            {structure.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToCard(idx)}
                aria-label={`View directory section ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  activeIndex === idx
                    ? 'w-6 h-2 bg-[#005596]'
                    : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1.5">
            <span>{isId ? 'Geser untuk melihat kategori direktori lainnya' : 'Swipe to view more directory categories'}</span>
            <span className="text-[#005596] font-bold">{`(${activeIndex + 1} / ${structure.length})`}</span>
          </span>
        </div>
      </div>
    </main>
  );
}
