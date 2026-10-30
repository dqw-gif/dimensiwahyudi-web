import type { Metadata } from 'next';
import ErgonomicsHubClient from './ErgonomicsHubClient';

const BASE_URL = 'https://dimensiwahyudi.com';
const PAGE_URL = `${BASE_URL}/news/ergonomics`;

export const metadata: Metadata = {
  title: 'Industrial Ergonomics Hub | Health, Productivity, and Safety Insights',
  description:
    'Panduan praktis ergonomi industri manufaktur Indonesia: pencegahan cedera MSD, peningkatan throughput shift, standar keselamatan K3, dan strategi implementasi alat bantu angkat vakum.',
  keywords: [
    'ergonomi industri indonesia',
    'ergonomi kerja manufaktur',
    'keselamatan kerja angkat manual',
    'MSD manufaktur',
    'peningkatan produktivitas pabrik',
    'alat bantu angkat ergonomis',
    'vacuum lifter ergonomis indonesia',
    'material handling ergonomis',
    'k3 ergonomi pabrik',
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
    title: 'Industrial Ergonomics Hub | PT Dimensi Quantum Wahyudi',
    description:
      'A practical ergonomics knowledge hub for manufacturing leaders: reduce strain, improve productivity, and strengthen safety compliance.',
    url: PAGE_URL,
    type: 'article',
    locale: 'en_ID',
    siteName: 'PT Dimensi Quantum Wahyudi',
    images: [
      {
        url: `${BASE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'Industrial Ergonomics Hub PT Dimensi Quantum Wahyudi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Industrial Ergonomics Hub | PT Dimensi Quantum Wahyudi',
    description: 'Panduan ergonomi industri manufaktur: perlindungan operator dan peningkatan throughput pabrik.',
    images: [`${BASE_URL}/opengraph-image`],
  },
};

export default function ErgonomicsHubPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Beranda',
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Insights',
        item: `${BASE_URL}/news`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Pusat Ergonomi Industri',
        item: PAGE_URL,
      },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Industrial Ergonomics Knowledge Hub',
    description: 'Kumpulan referensi dan panduan teknis penerapan ergonomi di lantai produksi manufaktur Indonesia.',
    url: PAGE_URL,
    publisher: {
      '@type': 'Organization',
      name: 'PT Dimensi Quantum Wahyudi',
      url: BASE_URL,
    },
    hasPart: [
      {
        '@type': 'WebPage',
        name: 'Health Risks & MSD Exposure',
        url: `${BASE_URL}/news/ergonomics/health-risks`,
      },
      {
        '@type': 'WebPage',
        name: 'Productivity Impact & ROI',
        url: `${BASE_URL}/news/ergonomics/productivity`,
      },
      {
        '@type': 'WebPage',
        name: 'Safety & Standards Compliance',
        url: `${BASE_URL}/news/ergonomics/safety-standards`,
      },
      {
        '@type': 'WebPage',
        name: 'Industrial Ergonomics Glossary',
        url: `${BASE_URL}/news/ergonomics/glossary`,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Apa itu ergonomi industri dan mengapa penting di lini manufaktur?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ergonomi industri adalah disiplin rekayasa yang menyesuaikan stasiun kerja, peralatan bantu angkat, dan alur proses dengan kapabilitas fisik manusia. Tujuannya adalah melindungi pekerja dari cedera otot/tulang (MSD), menekan absensi sakit, dan memastikan ritme kerja tetap stabil dan produktif sepanjang shift.',
        },
      },
      {
        '@type': 'Question',
        name: 'Bagaimana solusi penanganan ergonomis meningkatkan throughput pabrik?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Dengan mengeliminasi beban fisik berat melalui alat bantu seperti Vacuum Tube Lifter atau Electric Manipulator, operator tidak lagi mengalami pelambatan ritme akibat kelelahan di jam-jam akhir shift. Kecepatan cycle time meningkat antara 8-22%, risiko kerusakan produk berkurang, dan operasional angkat dapat ditangani oleh satu orang operator secara aman.',
        },
      },
      {
        '@type': 'Question',
        name: 'Alat bantu apa yang efektif untuk intervensi ergonomi angkat beban berat?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Solusi yang terbukti efektif meliputi Vacuum Tube Lifter (Schmalz Jumbo) untuk barang cepat seperti kardus dan karung hingga 300 kg, VacuMaster untuk panel logam atau kayu hingga beberapa ton, serta Binar Quick-Lift untuk perakitan presisi berkecepatan tinggi.',
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ErgonomicsHubClient />
    </>
  );
}
