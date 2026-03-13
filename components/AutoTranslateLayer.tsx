'use client';

import { useEffect } from 'react';
import { useLanguage } from './LanguageProvider';

const REPLACEMENTS: Array<[string, string]> = [
  ['Karir & Peluang', 'Careers & Opportunities'],
  ['Bentuk Masa Depan', 'Shape the Future of'],
  ['Otomasi Industri', 'Industrial Automation'],
  ['Nilai & Keuntungan', 'Benefits & Value'],
  ['Posisi Tersedia', 'Open Roles'],
  ['Temukan Peran Anda', 'Find Your Role'],
  ['Belum Menemukan Posisi yang Pas?', 'Haven\'t Found the Right Role Yet?'],
  ['Kirim Lamaran', 'Apply Now'],
  ['Kirim permintaan lainnya', 'Send another request'],
  ['Submit Spontaneous Application', 'Submit a General Application'],
  ['Persyaratan Kunci', 'Key Requirements'],
  ['Konsultasi Kebutuhan Anda', 'Talk to Our Team'],
  ['Tingkatkan Efisiensi Produksi Anda', 'Boost Your Production Efficiency'],
  ['Portofolio Solusi', 'Solutions Portfolio'],
  ['Solusi Material Handling', 'Material Handling Solutions'],
  ['Kelas Dunia di Indonesia.', 'for World-Class Operations in Indonesia.'],
  ['Pionir Solusi Ergonomi &', 'Pioneering Ergonomic Solutions &'],
  ['Otomasi Vakum', 'Vacuum Automation'],
  ['Filosofi Kami', 'Our Philosophy'],
  ['Membangun Keunggulan Bersama', 'Building Excellence Together'],
  ['Metodologi Kerja', 'How We Work'],
  ['Alur Kerja', 'A Structured'],
  ['Terstandarisasi', 'Workflow'],
  ['Dipercaya Oleh', 'Trusted By'],
  ['Menjadi Pilihan Utama Pemimpin Industri Global', 'The Preferred Partner of Global Industry Leaders'],
  ['Implementasi Proyek', 'Project Implementations'],
  ['Klien Multinasional', 'Multinational Clients'],
  ['Konsultasi', 'Consultation'],
  ['Konsultasi Teknikal & Lifting Gratis', 'Free Technical & Lifting Consultation'],
  ['Sampaikan tantangan beban operasional Anda. Tim engineer tersertifikasi kami siap merancang solusi vacuum lifting dan material handling ergonomis paling efisien untuk lini produksi Anda.', 'Share your operational lifting challenges. Our certified engineers are ready to design the most efficient vacuum lifting and ergonomic material handling setup for your production line.'],
  ['Request Penawaran & Solusi Terkustomisasi', 'Request a Quote & Tailored Solution'],
  ['Lengkapi detail operasional pabrik Anda untuk rancang bangun sistem handling dan estimasi biaya (BoQ) yang presisi.', 'Provide your operational details so we can design the right handling system and deliver an accurate cost estimate (BoQ).'],
  ['Hubungi Pusat Layanan', 'Contact Our Service Center'],
  ['Lokasi Workshop & Kantor', 'Workshop & Office Location'],
  ['Korespondensi Bisnis', 'Business Correspondence'],
  ['Fast Response: 24 Jam Kerja', 'Fast Response: Within 24 Business Hours'],
  ['Hotline Teknis & WhatsApp', 'Technical Hotline & WhatsApp'],
  ['Layanan Darurat Maintenance Tersedia', 'Emergency Maintenance Support Available'],
  ['Jam Operasional Kantor', 'Office Hours'],
  ['Senin - Jumat', 'Monday - Friday'],
  ['Sabtu - Minggu', 'Saturday - Sunday'],
  ['Tutup', 'Closed'],
  ['Nama Penanggung Jawab', 'Contact Person Name'],
  ['Nama Perusahaan', 'Company Name'],
  ['Email Korporat', 'Corporate Email'],
  ['Spesifikasi Proyek', 'Project Requirements'],
  ['Gagal mengirim pesan', 'Failed to send your message'],
  ['Chat WhatsApp', 'Chat on WhatsApp'],
  ['Coba lagi', 'Try again'],
  ['Permintaan Diterima!', 'Request Received!'],
  ['Engineer kami akan menghubungi Anda dalam 1×24 jam kerja.', 'Our engineering team will contact you within 24 business hours.'],
  ['Lanjut via WhatsApp', 'Continue via WhatsApp'],
  ['Memproses...', 'Processing...'],
  ['Dapatkan Penawaran Harga', 'Get a Quote'],
  ['Contoh: Budi Santoso', 'Example: Michael Carter'],
  ['Contoh: PT Manufaktur Indonesia', 'Example: PT Industrial Manufacturing'],
  ['alamat@nama-perusahaan.com', 'name@company.com'],
  ['Email valid', 'Valid email'],
  ['Nama minimal 2 karakter', 'Name must be at least 2 characters'],
  ['Format email tidak valid', 'Invalid email format'],
  ['Deskripsi minimal 20 karakter', 'Description must be at least 20 characters'],
  ['Sebutkan berat material (kg), jenis benda (box/plat), dan frekuensi angkat per jam...', 'Please include material weight (kg), item type (box/sheet), and lifting frequency per hour...'],
  ['Solusi Vacuum Lifter Ergonomis', 'Ergonomic Vacuum Lifting Solutions'],
  ['dengan Sertifikasi AGR Jerman.', 'with German AGR Certification.'],
  ['Sistem handling kami telah teruji secara klinis oleh', 'Our handling systems are clinically validated by'],
  ['untuk mendukung kesehatan tulang belakang operator.', 'to support operator back health and ergonomic safety.'],
  ['Investasi pada alat lifting yang tepat bukan hanya soal efisiensi, tapi juga perlindungan jangka panjang terhadap aset manusia Anda.', 'Investing in the right lifting system is not just about efficiency, but long-term protection for your people.'],
  ['Ergonomi Kerja Optimal', 'Optimized Workplace Ergonomics'],
  ['Mengurangi risiko cedera tulang belakang (HNP) dan kelelahan fisik operator pabrik.', 'Reduces back injury risks and physical fatigue for production operators.'],
  ['Standar K3 Internasional', 'International Safety Standard'],
  ['Memenuhi standar kesehatan kerja global untuk industri manufaktur dan logistik.', 'Meets global workplace safety standards for manufacturing and logistics operations.'],
  ['Klik untuk unduh Sertifikat Resmi AGR (PDF)', 'Click to download the official AGR certificate (PDF)'],
  ['Kalkulator ROI & Efisiensi Ergonomi', 'ROI & Ergonomics Efficiency Calculator'],
  ['Analisa potensi penghematan biaya kesehatan dan peningkatan produktivitas tim Anda secara otomatis.', 'Automatically estimate healthcare cost savings and productivity gains for your team.'],
  ['Lihat Cara Kerja', 'See It in Action'],
  ['Nyata-nya', 'for Real'],
  ['Koleksi video demo resmi produk Schmalz — dari tube lifter ringan hingga vacuum lifting device berton-ton.', 'A curated library of official Schmalz demos, from lightweight tube lifters to heavy-duty vacuum lifting devices.'],
  ['Buka YouTube', 'Open on YouTube'],
  ['Tutup', 'Close'],
  ['Industri:', 'Industry:'],
  ['Tidak ada video untuk filter ini.', 'No videos found for this filter.'],
  ['Reset filter', 'Reset filter'],
  ['Butuh Demo Langsung?', 'Need a Live Demo?'],
  ['Tim engineer PT Dimensi Quantum Wahyudi siap melakukan demo on-site di fasilitas Anda.', 'Our engineering team is ready to conduct an on-site demo at your facility.'],
  ['Coba Vacuum Calculator', 'Try Vacuum Calculator'],
  ['Belum Ada Artikel', 'No Articles Yet'],
  ['Konten sedang disiapkan. Silakan kembali lagi nanti.', 'Content is currently being prepared. Please check back soon.'],
  ['Mitra terpercaya solusi industrial lifting & handling system di Indonesia. Menggabungkan presisi teknologi Jerman dan inovasi Swedia untuk produktivitas pabrik Anda.', 'Your trusted partner in industrial lifting and handling solutions across Indonesia. We blend German precision with Swedish innovation to boost factory productivity.'],
  ['Sistem otomasi & ejector (Ejector/Pump).', 'Automation and ejector systems (Ejector/Pump).'],
  ['Handling manual ergonomis (Jumbo/VacuMaster).', 'Ergonomic manual handling (Jumbo/VacuMaster).'],
  ['Kondisi area kerja?', 'What is your work environment like?'],
  ['Apa sumber tenaga yang tersedia?', 'What power source is available?'],
  ['Apakah udara tembus melalui benda?', 'Does air pass through the workpiece?'],
  ['Benda berpori memerlukan High Flow Rate, bukan High Vacuum.', 'Porous materials require high flow rate, not high vacuum.'],
  ['Desain tanpa selang angin (hose-free) ideal untuk Cobot.', 'A hose-free design is ideal for cobot integration.'],
  ['Standar industri untuk benda kedap udara dengan efisiensi tinggi.', 'An industry-standard setup for airtight materials with high efficiency.'],
  ['Tentang Kami', 'About Us'],
  ['Layanan Service', 'Service Support'],
  ['Layanan', 'Services'],
  ['Kontak', 'Contact'],
  ['Karir', 'Careers'],
  ['Hubungi Kami', 'Contact Us'],
  ['Hubungi Pusat Layanan', 'Contact Service Center'],
  ['Semua Brand', 'All Brands'],
  ['Lihat semua brand', 'See all brands'],
  ['Minta Penawaran', 'Get a Quote'],
  ['Konsultasi Layanan Servis', 'Service Consultation'],
  ['Chat WhatsApp Teknis', 'WhatsApp Tech Support'],
  ['Konsultasi Kebutuhan Anda', 'Talk to Our Team'],
  ['Lihat Produk', 'View Product'],
  ['Lihat Artikel', 'Read Article'],
  ['Terlihat bagus!', 'Looks good!'],
  ['Silakan hubungi kami langsung via WhatsApp:', 'Please contact us directly via WhatsApp:'],
  ['Data Anda akan dijaga kerahasiaannya untuk keperluan teknis & penawaran resmi.', 'Your data will be kept confidential for technical consultation and official quotations.'],
  ['Spesifikasi Proyek', 'Project Details'],
  ['Request Penawaran & Solusi Terkustomisasi', 'Request a Quote & Custom Solution'],
  ['Kami sedang melakukan peningkatan sistem dan pembaruan layanan untuk memberikan pengalaman yang lebih baik bagi Anda.', 'We are currently upgrading our systems and services to deliver a better experience for you.'],
  ['Email Kami', 'Email Us'],
  ['Hubungi WhatsApp', 'WhatsApp Us'],
  ['Terjadi kesalahan yang tidak terduga. Tim kami sudah diberitahu.', 'An unexpected error occurred. Our team has been notified.'],
  ['Terjadi kesalahan saat memuat data produk. Silakan coba lagi, atau hubungi kami bila masalah berlanjut.', 'There was an error loading product data. Please try again, or contact us if the issue persists.'],
  ['Hubungi Kami', 'Contact Us'],
  ['Kalkulator ROI & Efisiensi Ergonomi', 'ROI & Ergonomics Efficiency Calculator'],
  ['Analisa potensi penghematan biaya kesehatan dan peningkatan produktivitas tim Anda secara otomatis.', 'Analyze potential healthcare cost savings and productivity improvements automatically.'],
  ['Solusi Material Handling', 'Material Handling Solutions'],
  ['Kelas Dunia di Indonesia.', 'for Indonesia.'],
  ['Tingkatkan Efisiensi Produksi Anda', 'Improve Your Production Efficiency'],
  ['Mitra terpercaya solusi industrial lifting & handling system di Indonesia.', 'A trusted partner for industrial lifting and handling solutions in Indonesia.'],
  ['Pilih kategori sistem vakum di bawah ini untuk memulai konfigurasi.', 'Choose a vacuum system category below to start configuration.'],
  ['Menunggu data...', 'Waiting for inputs...'],
  ['Reset Audit', 'Reset Audit'],
  ['Selesai', 'Done'],
  ['LIHAT HASIL', 'SEE RESULTS'],
  ['LANJUTKAN', 'CONTINUE'],
  ['KEMBALI', 'BACK'],
  ['Mulai Audit Lifter', 'Start Lifter Audit'],
  ['Mulai Audit Generator', 'Start Generator Audit'],
  ['Tipe Gerakan', 'Movement Type'],
  ['Frekuensi Angkat', 'Lifting Frequency'],
  ['Berat Maksimal', 'Maximum Weight'],
  ['Berat benda terberat (Safe Working Load).', 'The heaviest item weight (Safe Working Load).'],
  ['Apa yang akan diangkat?', 'What are you lifting?'],
  ['Bagaimana benda dipindahkan?', 'How is the item moved?'],
  ['Berapa kali angkat per menit?', 'How many lifts per minute?'],
  ['Solusi Handling DQW.', 'DQW handling recommendations.'],
  ['Lingkungan', 'Environment'],
  ['Solusi Vakum DQW.', 'DQW vacuum recommendations.'],
  ['Kondisi area kerja?', 'What is the working environment?'],
  ['Integrasi', 'Integration'],
  ['Tipe robot yang digunakan?', 'What robot type are you using?'],
  ['Layanan Darurat Maintenance Tersedia', 'Emergency maintenance support available'],
  ['Engineer kami akan menghubungi Anda dalam 1×24 jam kerja.', 'Our engineers will contact you within 24 business hours.'],
  ['Konsultasi Teknikal & Lifting Gratis', 'Free Technical & Lifting Consultation'],
  ['Pionir Solusi Ergonomi &', 'Pioneering Ergonomics &'],
  ['Otomasi Vakum', 'Vacuum Automation'],
  ['Filosofi Kami', 'Our Philosophy'],
  ['Portofolio Solusi', 'Solution Portfolio'],
  ['Proyek Instalasi', 'Installed Projects'],
];

function replaceInNode(node: Node): void {
  if (node.nodeType === Node.TEXT_NODE) {
    const raw = node.textContent;
    if (!raw) return;

    let next = raw;
    for (const [idText, enText] of REPLACEMENTS) {
      if (next.includes(idText)) {
        next = next.split(idText).join(enText);
      }
    }

    if (next !== raw) {
      node.textContent = next;
    }
    return;
  }

  if (node.nodeType !== Node.ELEMENT_NODE) return;
  const el = node as HTMLElement;

  if (el.tagName === 'SCRIPT' || el.tagName === 'STYLE') return;

  if (el.hasAttribute('placeholder')) {
    const placeholder = el.getAttribute('placeholder') || '';
    let next = placeholder;
    for (const [idText, enText] of REPLACEMENTS) {
      if (next.includes(idText)) {
        next = next.split(idText).join(enText);
      }
    }
    if (next !== placeholder) {
      el.setAttribute('placeholder', next);
    }
  }

  for (const child of Array.from(el.childNodes)) {
    replaceInNode(child);
  }
}

export default function AutoTranslateLayer() {
  const { lang } = useLanguage();

  useEffect(() => {
    if (lang !== 'en') return;

    const run = () => replaceInNode(document.body);
    run();

    const observer = new MutationObserver(() => run());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [lang]);

  return null;
}
