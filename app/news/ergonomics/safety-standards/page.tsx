import type { Metadata } from 'next';
import SafetyStandardsClient from './SafetyStandardsClient';

const BASE_URL = 'https://dimensiwahyudi.com';
const PAGE_URL = `${BASE_URL}/news/ergonomics/safety-standards`;

export const metadata: Metadata = {
  title: 'Occupational Safety and Ergonomics Standards | Industrial Ergonomics',
  description:
    'Pedoman standar kepatuhan K3 ergonomi industri Indonesia: Permenaker No. 5/2018, ISO 11228-1, sertifikasi medis AGR Jerman, dan strategi eliminasi risiko bahaya fisik di pabrik.',
  keywords: [
    'standar keselamatan kerja ergonomi',
    'k3 ergonomi manufaktur',
    'compliance handling material',
    'pengendalian risiko ergonomi',
    'audit keselamatan angkat manual',
    'ergonomic risk assessment indonesia',
    'technical control lifting process',
    'ergonomics and industrial compliance',
    'permenaker 5 2018 ergonomi',
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
    title: 'Safety & Ergonomics Standards Compliance | PT Dimensi Quantum Wahyudi',
    description:
      'Practical safety and ergonomics guidance for industrial teams: compliance mindset, preventive controls, and implementation priorities.',
    url: PAGE_URL,
    type: 'article',
    locale: 'en_ID',
    siteName: 'PT Dimensi Quantum Wahyudi',
    images: [
      {
        url: `${BASE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'Occupational Safety and Industrial Ergonomics Standards',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Safety & Ergonomics Standards Compliance | PT Dimensi Quantum Wahyudi',
    description: 'Panduan standar keselamatan K3 dan sertifikasi ergonomi untuk lantai produksi manufaktur.',
    images: [`${BASE_URL}/opengraph-image`],
  },
};

export default function ErgonomicsSafetyStandardsPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Occupational Safety and Ergonomics Standards for Industrial Handling',
    description:
      'Practical guide to industrial ergonomics safety standards: Permenaker No. 5/2018, ISO 11228-1, ISO 45001, and German AGR medical certification.',
    author: {
      '@type': 'Organization',
      name: 'PT Dimensi Quantum Wahyudi',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'PT Dimensi Quantum Wahyudi',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/opengraph-image`,
      },
    },
    mainEntityOfPage: PAGE_URL,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Beranda', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Insights', item: `${BASE_URL}/news` },
      { '@type': 'ListItem', position: 3, name: 'Pusat Ergonomi', item: `${BASE_URL}/news/ergonomics` },
      { '@type': 'ListItem', position: 4, name: 'Standar Keselamatan & K3', item: PAGE_URL },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Apa regulasi K3 utama terkait ergonomi dan angkat beban manual di Indonesia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Regulasi utama adalah Peraturan Menteri Ketenagakerjaan (Permenaker) No. 5 Tahun 2018 tentang Keselamatan dan Kesehatan Kerja Lingkungan Kerja, yang mewajibkan perusahaan mengidentifikasi dan mengendalikan faktor ergonomi pada aktivitas angkat angkut manual guna mencegah cedera muskuloskeletal.',
        },
      },
      {
        '@type': 'Question',
        name: 'Bagaimana standar internasional ISO 11228-1 mengatur pengangkatan manual?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ISO 11228-1 memberikan metodologi penilaian risiko untuk mengangkat dan membawa beban manual. Standar ini merekomendasikan batas beban acuan maksimum 25 kg untuk kondisi ideal, dan mewajibkan intervensi alat bantu mekanis saat frekuensi, jarak angkat, atau rotasi tubuh meningkatkan indeks risiko.',
        },
      },
      {
        '@type': 'Question',
        name: 'Mengapa sertifikasi medis AGR Jerman penting untuk alat bantu angkat?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sertifikasi AGR (Aktion Gesunder Rücken e.V.) diberikan oleh asosiasi medis independen Jerman kepada peralatan yang terbukti secara klinis melindungi kesehatan tulang belakang operator. Sistem vacuum lifter Schmalz mengantongi sertifikasi AGR sebagai jaminan perlindungan ergonomi optimal.',
        },
      },
      {
        '@type': 'Question',
        name: 'Bagaimana penerapan alat angkat ergonomis mendukung audit ISO 45001?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Penerapan alat bantu angkat vakum merupakan bentuk nyata dari hierarki pengendalian risiko tingkat "Engineering Control". Ini membuktikan komitmen proaktif perusahaan dalam mengeliminasi bahaya fisik di tempat kerja sesuai klausul 8.1.2 pada standar manajemen K3 ISO 45001.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SafetyStandardsClient />
    </>
  );
}
