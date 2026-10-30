import type { Metadata } from 'next';
import HealthRisksClient from './HealthRisksClient';

const BASE_URL = 'https://dimensiwahyudi.com';
const PAGE_URL = `${BASE_URL}/news/ergonomics/health-risks`;

export const metadata: Metadata = {
  title: 'Health Risks & MSD Exposure in Manual Handling | Industrial Ergonomics',
  description:
    'Identifikasi pola risiko kesehatan, cedera tulang belakang (MSD), dan kelelahan fisik operator akibat pengangkatan beban manual berulang di lini produksi manufaktur.',
  keywords: [
    'risiko ergonomi kerja',
    'penyakit akibat kerja angkat manual',
    'nyeri punggung operator produksi',
    'msd industri manufaktur indonesia',
    'kelelahan kerja operator',
    'ergonomi handling material',
    'alat bantu angkat pabrik',
    'kesehatan kerja manufaktur',
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
    title: 'Health Risks in Manual Handling | PT Dimensi Quantum Wahyudi',
    description:
      'Understand major health risks from non-ergonomic manual handling and how engineered lifting support reduces operator strain.',
    url: PAGE_URL,
    type: 'article',
    locale: 'en_ID',
    siteName: 'PT Dimensi Quantum Wahyudi',
    images: [
      {
        url: `${BASE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'Ergonomic Health Risks and MSD Prevention',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Health Risks & MSD in Manual Handling | PT Dimensi Quantum Wahyudi',
    description: 'Pencegahan risiko cedera otot-tulang (MSD) dan kelelahan operator di lini manufaktur.',
    images: [`${BASE_URL}/opengraph-image`],
  },
};

export default function ErgonomicsHealthRisksPage() {
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
        name: 'Pusat Ergonomi',
        item: `${BASE_URL}/news/ergonomics`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Risiko Kesehatan & MSD',
        item: PAGE_URL,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Bagian tubuh mana yang paling rentan mengalami cedera akibat angkat manual di pabrik?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Punggung bawah (tulang belakang lumbal L5/S1) adalah zona paling rentan karena menanggung beban tumpuan utama saat membungkuk. Area lain yang berisiko tinggi mencakup bahu, pergelangan tangan, leher, sendi pinggul, dan lutut.',
        },
      },
      {
        '@type': 'Question',
        name: 'Apa itu Musculoskeletal Disorders (MSDs) di lingkungan industri?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'MSD adalah gangguan pada sistem gerak tubuh (otot, tendon, ligamen, sendi, dan saraf) yang berkembang secara kumulatif akibat pengangkatan beban berulang, getaran, serta postur kerja yang janggal tanpa bantuan alat mekanis.',
        },
      },
      {
        '@type': 'Question',
        name: 'Bagaimana dampak kelelahan fisik kumulatif operator terhadap lini produksi?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Kelelahan fisik kumulatif memicu pelambatan ritme kerja hingga 12-25% di akhir shift, peningkatan kesalahan penempatan barang (reject rate), peningkatan angka absensi karena sakit pinggang, dan kenaikan risiko kecelakaan kerja.',
        },
      },
      {
        '@type': 'Question',
        name: 'Bagaimana solusi engineering control mengeliminasi risiko cedera angkat beban?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Engineering control menggantikan beban tenaga manusia dengan sistem hisap vakum atau penyeimbang elektrik (seperti Schmalz Jumbo Tube Lifter atau Binar Quick-Lift). Berat beban 100% ditopang oleh alat, sehingga operator hanya bertugas mengarahkan gerakan tanpa tekanan pada tulang belakang.',
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HealthRisksClient />
    </>
  );
}
