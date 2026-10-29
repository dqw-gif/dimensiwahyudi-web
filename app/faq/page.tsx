'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import Script from 'next/script';
import PreFooterCTA from '../../components/PreFooterCTA';
import { useLanguage } from '@/components/LanguageProvider';

const faqsEn = [
  {
    category: 'Technical Specifications',
    questions: [
      {
        q: 'What is the maximum load capacity of your vacuum lifting systems?',
        a: 'Our vacuum lifting systems, primarily from Schmalz, handle a wide range of payloads. The JumboFlex series is ideal for rapid handling up to 50 kg, the JumboErgo lifts up to 300 kg, and heavy-duty VacuMaster systems safely lift metal sheets, glass, or wood panels weighing several tons.',
      },
      {
        q: 'Can vacuum lifters handle porous materials like carton boxes or MDF boards?',
        a: "Yes. For porous materials, we utilize high-flow vacuum blowers designed to compensate for leakage, ensuring a secure grip. We match the specific suction pad material and blower capacity to your product's porosity.",
      },
      {
        q: 'Can your handling systems be integrated into our existing crane infrastructure?',
        a: 'Yes. Our vacuum lifters can be suspended from your existing Overhead Cranes, Jib Cranes, or monorail systems. We also provide complete standalone aluminum or steel crane systems if you require a new workstation.',
      },
      {
        q: 'Are there solutions available for cleanrooms or food-grade environments?',
        a: 'Yes, we offer systems constructed with stainless steel components and FDA-approved Suction Cups specifically engineered for the food, pharmaceutical, and chemical industries.',
      },
      {
        q: 'What happens in the event of a sudden power failure while lifting?',
        a: 'All our specialized vacuum lifters feature integrated safety check valves and a vacuum reservoir. If power fails, the valve closes immediately, holding the vacuum level so the load is lowered slowly and safely without dropping.',
      },
    ],
  },
  {
    category: 'Safety & Ergonomics',
    questions: [
      {
        q: 'How do vacuum lifters prevent workplace injuries?',
        a: "By transferring 100% of the material's weight to the lifter, operators are relieved from the physical strain of manual lifting. This eliminates the risk of spinal injuries, muscle fatigue, and cumulative trauma disorders, ensuring compliance with strict occupational health rules.",
      },
      {
        q: 'Are the handling systems certified by international health boards?',
        a: 'Yes, our Schmalz handling systems are certified by the AGR (Aktion Gesunder Rücken e. V.), an independent German association that tests and verifies products contributing to spinal health.',
      },
      {
        q: 'Is specialized operator training required to use the equipment?',
        a: 'The systems are designed for intuitive operation; however, PT Dimensi Quantum Wahyudi provides on-site operator and safety training upon installation so your team operates safely and efficiently from day one.',
      },
    ],
  },
  {
    category: 'Business & ROI',
    questions: [
      {
        q: 'What is the typical Return on Investment (ROI) timeframe?',
        a: 'Most of our B2B clients achieve full ROI within 8 to 18 months. This is driven by eliminating two-person lifting tasks (reducing labor costs), minimizing product damage during handling, and reducing medical leave due to injury.',
      },
      {
        q: 'How do we request a site assessment or technical audit?',
        a: 'You can use the ROI Calculator on our website, or directly reach out to our engineering team via the Contact page. We offer free initial site audits to map your process flow and propose the most optimal lifting solution.',
      },
      {
        q: 'Does PT Dimensi Quantum Wahyudi provide aftersales service and maintenance contracts?',
        a: 'Yes, we are a full-service partner. We offer preventive maintenance contracts, emergency repair services, and periodic system audits to keep your production line running reliably.',
      },
      {
        q: 'Are spare parts readily available in Indonesia?',
        a: 'We maintain a dedicated inventory of critical spare parts, Suction Cups, and vacuum filters at our Bekasi warehouse for fast turnaround times across Indonesia.',
      },
    ],
  },
  {
    category: 'Procurement & Installation',
    questions: [
      {
        q: 'What is the typical lead time from ordering to installation?',
        a: 'Standard systems typically require 4-8 weeks, while customized heavy-handling solutions may take 10-14 weeks depending on the crane infrastructure required.',
      },
      {
        q: 'Do you offer turnkey installation?',
        a: 'Yes. Our mechanical and electrical engineering teams provide end-to-end turnkey solutions: from structural calculation of your factory ceiling, crane assembly, and vacuum system commissioning to final load testing.',
      },
      {
        q: 'Can we test our materials with your vacuum lifters before purchasing?',
        a: 'Yes. Clients can send workpiece samples to our Bekasi workshop or request a trial onsite unit so we can match the vacuum grippers directly to your product surface.',
      },
    ],
  },
];

const faqsId = [
  {
    category: 'Spesifikasi Teknis',
    questions: [
      {
        q: 'Berapa kapasitas angkat maksimum (SWL) dari sistem Vacuum Lifter Anda?',
        a: 'Sistem pengangkat vakum kami dari Schmalz melayani rentang payload yang luas. Seri JumboFlex ideal untuk pengangkatan cepat hingga 50 kg, JumboErgo mampu mengangkat hingga 300 kg, sedangkan sistem heavy-duty VacuMaster mampu mengangkat lembaran plat logam, kaca, atau panel kayu hingga bobot beberapa ton.',
      },
      {
        q: 'Apakah Vacuum Lifter dapat mengangkat material berpori seperti kardus karton atau papan MDF?',
        a: 'Ya. Untuk material berpori, kami menggunakan Vacuum Generator / blower beraliran tinggi yang dirancang untuk mengompensasi kebocoran udara sehingga cengkeraman tetap rapat. Kami mencocokkan material Suction Cup dan kapasitas pompa sesuai tingkat porositas workpiece Anda.',
      },
      {
        q: 'Bisakah sistem lifter ini dipasang pada konstruksi crane yang sudah ada di pabrik kami?',
        a: 'Bisa. Vacuum Tube Lifter dan VacuMaster kami dapat digantungkan pada Overhead Crane, Jib Crane, atau jalur monorel yang sudah terpasang di pabrik Anda. Kami juga menyediakan paket lengkap Crane Systems aluminium maupun baja jika Anda membutuhkan stasiun kerja baru.',
      },
      {
        q: 'Apakah tersedia solusi untuk ruang cleanroom atau area produksi food-grade?',
        a: 'Ya, kami menyediakan unit PalVac Sprint Hygienic berbahan stainless steel serta Suction Cup bersertifikasi FDA yang dirancang khusus untuk industri makanan, farmasi, dan kimia.',
      },
      {
        q: 'Apa yang terjadi jika listrik pabrik mendadak padam saat sedang mengangkat beban?',
        a: 'Seluruh unit Vacuum Lifter kami dilengkapi katup pengaman satu arah (check valve) dan tangki cadangan vakum terintegrasi. Saat mati listrik, katup menutup seketika untuk menahan vakum sehingga beban dapat diturunkan perlahan dengan aman tanpa terjatuh.',
      },
    ],
  },
  {
    category: 'Keselamatan Kerja & Ergonomi',
    questions: [
      {
        q: 'Bagaimana Vacuum Lifter mencegah cedera kerja pada operator?',
        a: 'Dengan mengalihkan 100% beban material ke tabung vakum atau lengan servo, tulang belakang operator terbebas dari hentakan angkat manual. Hal ini menghilangkan risiko saraf terjepit (LBP), kelelahan otot, dan cedera akumulatif sesuai standar K3 dan ISO 11228-1.',
      },
      {
        q: 'Apakah sistem alat angkat ini memiliki sertifikasi kesehatan internasional?',
        a: 'Ya, lini Schmalz Jumbo dan sistem crane ergonomis kami telah tersertifikasi secara medis oleh AGR (Aktion Gesunder Rücken e. V.) Jerman sebagai peralatan kerja yang menjaga kesehatan tulang belakang.',
      },
      {
        q: 'Apakah diperlukan pelatihan khusus bagi operator untuk mengoperasikan alat ini?',
        a: 'Sistem kami sangat intuitif dioperasikan. Selain itu, tim PT Dimensi Quantum Wahyudi memberikan pelatihan pengoperasian dan keselamatan kerja langsung di lokasi (onsite training) saat komisioning selesai.',
      },
    ],
  },
  {
    category: 'Bisnis & Balik Modal (ROI)',
    questions: [
      {
        q: 'Berapa lama rata-rata waktu balik modal (ROI) investasi alat ini?',
        a: 'Mayoritas klien pabrik B2B kami mencapai ROI penuh dalam waktu 8 hingga 18 bulan. Penghematan ini berasal dari pemangkasan pekerjaan angkat 2-3 orang menjadi 1 operator, penurunan cacat produk akibat terjatuh, serta stabilnya kecepatan cycle time hingga akhir shift.',
      },
      {
        q: 'Bagaimana cara mengajukan survei lokasi atau audit teknis?',
        a: 'Anda dapat mencoba Kalkulator ROI di situs ini atau langsung menghubungi tim engineer kami melalui halaman Kontak. Kami menyediakan survei awal gratis ke pabrik Anda untuk memetakan alur kerja dan merancang sistem yang paling tepat.',
      },
      {
        q: 'Apakah PT Dimensi Quantum Wahyudi menyediakan layanan Aftersales Service dan kontrak Maintenance?',
        a: 'Ya, kami adalah mitra layanan penuh di Indonesia. Kami menyediakan kontrak preventive maintenance berkala, perbaikan darurat, serta audit sistem tahunan agar lini produksi Anda bebas dari downtime mendadak.',
      },
      {
        q: 'Apakah suku cadang (spare parts) tersedia langsung di Indonesia?',
        a: 'Kami menyimpan stok suku cadang penting, beragam ukuran Suction Cup, selang vakum, dan filter pengganti di gudang Bekasi kami untuk menjamin pengiriman cepat bagi pelanggan manufaktur lokal.',
      },
    ],
  },
  {
    category: 'Pengadaan & Instalasi',
    questions: [
      {
        q: 'Berapa lama estimasi waktu tunggu (lead time) dari pemesanan hingga instalasi?',
        a: 'Konfigurasi sistem standar umumnya membutuhkan waktu 4-8 minggu, sedangkan sistem heavy-handling kustom membutuhkan sekitar 10-14 minggu tergantung spesifikasi struktur crane yang diperlukan.',
      },
      {
        q: 'Apakah Anda melayani instalasi terima beres (turnkey installation)?',
        a: 'Ya. Tim teknisi mekanik dan elektrik kami menangani instalasi turnkey secara menyeluruh: mulai dari perhitungan struktur tiang/atap pabrik, perakitan Jib Crane atau Overhead Crane, komisioning sistem vakum, hingga uji beban akhir (load test).',
      },
      {
        q: 'Bisakah kami menguji sampel material produk kami sebelum membeli?',
        a: 'Tentu saja. Anda dapat mengirimkan sampel workpiece ke workshop kami di Bekasi atau menjadwalkan trial onsite di pabrik Anda agar kami dapat mencocokkan tipe Vacuum Gripper yang paling presisi.',
      },
    ],
  },
];

export default function FAQPage() {
  const { lang } = useLanguage();
  const isId = lang === 'id';
  const [openIndex, setOpenIndex] = useState<string | null>('0-0');

  const faqs = isId ? faqsId : faqsEn;

  const toggleFAQ = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  // Construct JSON-LD
  const schemaEntities = faqs.flatMap((cat) => cat.questions).map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  }));

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: schemaEntities,
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-20 selection:bg-[#005596] selection:text-white">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-blue-100/50 rounded-2xl mb-6 shadow-sm border border-blue-100">
            <HelpCircle size={40} className="text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            {isId ? 'Pertanyaan yang Sering ' : 'Frequently Asked '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005596] to-sky-600">
              {isId ? 'Diajukan (FAQ)' : 'Questions'}
            </span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            {isId
              ? 'Jawaban teknis, rincian instalasi, serta informasi bisnis seputar penerapan sistem Vacuum Lifter dan manipulator ergonomis di lini produksi Anda.'
              : 'Technical answers, installation details, and business queries about introducing ergonomic vacuum lifting systems to your production line.'}
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-12">
          {faqs.map((category, catIndex) => (
            <div
              key={catIndex}
              className="animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${catIndex * 100}ms` }}
            >
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-[#005596]"></span>
                {category.category}
              </h2>

              <div className="space-y-4">
                {category.questions.map((faq, qIndex) => {
                  const id = `${catIndex}-${qIndex}`;
                  const isOpen = openIndex === id;

                  return (
                    <div
                      key={qIndex}
                      className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                        isOpen
                          ? 'bg-white border-blue-200 shadow-lg shadow-blue-100/50'
                          : 'bg-white/60 border-slate-200 hover:border-slate-300 hover:bg-white'
                      }`}
                    >
                      <button
                        onClick={() => toggleFAQ(id)}
                        className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl"
                        aria-expanded={isOpen}
                      >
                        <span
                          className={`font-bold text-lg leading-snug transition-colors ${
                            isOpen ? 'text-blue-700' : 'text-slate-800'
                          }`}
                        >
                          {faq.q}
                        </span>
                        <div
                          className={`shrink-0 p-1 mt-1 rounded-full transition-transform duration-300 ${
                            isOpen ? 'bg-blue-100 text-blue-600 rotate-180' : 'bg-slate-100 text-slate-400'
                          }`}
                        >
                          <ChevronDown size={20} />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                          >
                            <div className="px-6 pb-6 pt-2">
                              <div className="h-px w-full bg-slate-100 mb-4"></div>
                              <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PRE-FOOTER CTA */}
      <PreFooterCTA
        badge={isId ? 'KONSULTASI ENGINEERING' : 'ENGINEERING ADVISORY'}
        title={
          isId ? (
            <>
              Punya Pertanyaan Teknis Spesifik? <br className="hidden sm:inline" />
              Tim Engineer Aplikasi Kami Siap Membantu.
            </>
          ) : (
            <>
              Have Specific Handling Questions? <br className="hidden sm:inline" />
              Our Application Engineers Are Ready to Assist.
            </>
          )
        }
        description={
          isId
            ? 'Tim engineer kami siap menghitung parameter angkat secara presisi, merekomendasikan konfigurasi Suction Cup yang sesuai, dan melakukan uji sampel workpiece di workshop Bekasi atau langsung di pabrik Anda.'
            : 'Our engineering team calculates exact lifting parameters, recommends tailored suction systems, and conducts sample workpiece trials at our Cikarang facility or directly on your plant floor.'
        }
        primaryBtnText={isId ? 'Konsultasi dengan Tim Engineer' : 'Consult with Our Engineering Team'}
        primaryBtnHref="/contact"
        secondaryBtnText={isId ? 'Hubungi via WhatsApp' : 'WhatsApp Engineering Support'}
        secondaryBtnHref="https://wa.me/6281119168752?text=Hello%20DQW,%20I%20have%20technical%20questions%20regarding%20vacuum%20handling%20systems"
      />
    </main>
  );
}
