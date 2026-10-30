import type { Metadata } from 'next';
import GlossaryClient from './GlossaryClient';

const BASE_URL = 'https://dimensiwahyudi.com';
const PAGE_URL = `${BASE_URL}/news/ergonomics/glossary`;

export const metadata: Metadata = {
  title: 'Industrial Ergonomics Glossary | Key Terms for Manufacturing Teams',
  description:
    'Glosarium dan kamus istilah ergonomi industri terlengkap untuk tim engineering, HSE, dan procurement manufaktur: definisi MSD, manual handling, cycle time, hingga ROI alat angkat.',
  keywords: [
    'glosarium ergonomi industri',
    'istilah ergonomi manufaktur',
    'definisi msd',
    'manual handling definition',
    'ergonomic risk terms',
    'istilah k3 ergonomi',
    'kamus ergonomi pabrik',
    'ergonomi indonesia',
    'PT Dimensi Quantum Wahyudi',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'id-ID': PAGE_URL,
      'en-ID': PAGE_URL,
      'x-default': PAGE_URL,
    },
  },
  openGraph: {
    title: 'Industrial Ergonomics Glossary & Terminology | PT Dimensi Quantum Wahyudi',
    description:
      'A practical glossary of ergonomics terms for industrial engineers, procurement teams, and plant managers.',
    url: PAGE_URL,
    type: 'article',
    locale: 'en_ID',
    siteName: 'PT Dimensi Quantum Wahyudi',
    images: [
      {
        url: `${BASE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'Industrial Ergonomics Glossary and Terminology',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Industrial Ergonomics Glossary | PT Dimensi Quantum Wahyudi',
    description: 'Kamus acuan istilah teknis ergonomi industri manufaktur Indonesia.',
    images: [`${BASE_URL}/opengraph-image`],
  },
};

export default function ErgonomicsGlossaryPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Beranda', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Insights', item: `${BASE_URL}/news` },
      { '@type': 'ListItem', position: 3, name: 'Pusat Ergonomi', item: `${BASE_URL}/news/ergonomics` },
      { '@type': 'ListItem', position: 4, name: 'Glosarium Ergonomi Industri', item: PAGE_URL },
    ],
  };

  const definedTermSetSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'Industrial Ergonomics Technical Glossary',
    description: 'Kamus istilah teknis ergonomi industri dan keselamatan material handling manufaktur.',
    url: PAGE_URL,
    hasDefinedTerm: [
      {
        '@type': 'DefinedTerm',
        name: 'Industrial Ergonomics',
        termCode: 'ERG-01',
        description: 'Disiplin rekayasa yang menyesuaikan stasiun kerja, alat bantu angkat, dan alur proses dengan batas kemampuan fisik manusia guna meningkatkan keselamatan dan throughput.',
        inDefinedTermSet: PAGE_URL,
      },
      {
        '@type': 'DefinedTerm',
        name: 'Musculoskeletal Disorders (MSDs)',
        termCode: 'ERG-02',
        description: 'Cedera atau gangguan pada otot, sendi, ligamen, dan tulang belakang yang dipicu oleh pengangkatan beban berulang serta postur kerja membungkuk atau memutar.',
        inDefinedTermSet: PAGE_URL,
      },
      {
        '@type': 'DefinedTerm',
        name: 'Manual Handling',
        termCode: 'ERG-03',
        description: 'Aktivitas mengangkat, menahan, mendorong, menarik, atau memindahkan beban menggunakan tenaga otot manusia dengan risiko cedera fisik sesuai frekuensi dan berat beban.',
        inDefinedTermSet: PAGE_URL,
      },
      {
        '@type': 'DefinedTerm',
        name: 'Repetitive Strain',
        termCode: 'ERG-04',
        description: 'Ketegangan fisik kumulatif akibat mengulang gerakan angkat-pindah yang sama ribuan kali per shift, yang memicu kelelahan otot dan cedera jaringan lunak.',
        inDefinedTermSet: PAGE_URL,
      },
      {
        '@type': 'DefinedTerm',
        name: 'Awkward Posture',
        termCode: 'ERG-05',
        description: 'Posisi tubuh yang menempatkan tulang belakang atau persendian di luar posisi netral (seperti membungkuk ke palet bawah atau menjangkau di atas bahu).',
        inDefinedTermSet: PAGE_URL,
      },
      {
        '@type': 'DefinedTerm',
        name: 'Engineering Control',
        termCode: 'ERG-06',
        description: 'Intervensi teknis yang mengeliminasi bahaya fisik langsung dari sumbernya, seperti penerapan Vacuum Tube Lifter atau Electric Manipulator Arm.',
        inDefinedTermSet: PAGE_URL,
      },
      {
        '@type': 'DefinedTerm',
        name: 'Cycle Time',
        termCode: 'ERG-07',
        description: 'Total waktu (detik) yang dibutuhkan untuk menyelesaikan satu siklus penuh pengambilan, pemindahan, dan penempatan workpiece pada stasiun kerja.',
        inDefinedTermSet: PAGE_URL,
      },
      {
        '@type': 'DefinedTerm',
        name: 'ROI (Return on Investment)',
        termCode: 'ERG-08',
        description: 'Metrik finansial untuk menghitung periode balik modal investasi alat bantu angkat berdasarkan penghematan tenaga kerja, percepatan siklus, dan penurunan biaya medis/absensi.',
        inDefinedTermSet: PAGE_URL,
      },
      {
        '@type': 'DefinedTerm',
        name: 'Workstation Design',
        termCode: 'ERG-09',
        description: 'Tata letak area kerja, jangkauan crane, dan konfigurasi konveyor yang dirancang untuk mendukung postur kerja netral dan gerakan operator yang efisien.',
        inDefinedTermSet: PAGE_URL,
      },
      {
        '@type': 'DefinedTerm',
        name: 'Fatigue Management',
        termCode: 'ERG-10',
        description: 'Strategi operasional dan mekanis untuk menekan kelelahan fisik operator agar ritme produksi di akhir shift tetap sama stabilnya dengan awal shift.',
        inDefinedTermSet: PAGE_URL,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetSchema) }}
      />
      <GlossaryClient />
    </>
  );
}
