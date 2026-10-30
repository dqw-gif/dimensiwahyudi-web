import type { Metadata } from 'next';
import ProductivityClient from './ProductivityClient';

const BASE_URL = 'https://dimensiwahyudi.com';
const PAGE_URL = `${BASE_URL}/news/ergonomics/productivity`;

export const metadata: Metadata = {
  title: 'Ergonomics as a Productivity Lever | Industrial Ergonomics',
  description:
    'Pelajari korelasi langsung antara penerapan ergonomi dengan peningkatan throughput pabrik, stabilitas cycle time, penurunan tingkat reject, dan optimalisasi manpower manufaktur.',
  keywords: [
    'ergonomics and plant productivity',
    'peningkatan throughput pabrik',
    'efisiensi handling material',
    'cycle time manufaktur',
    'reduksi error produksi',
    'optimasi tenaga kerja produksi',
    'alat angkat ergonomis indonesia',
    'roi ergonomi industri',
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
    title: 'Ergonomics as a Productivity Lever | PT Dimensi Quantum Wahyudi',
    description:
      'Learn how ergonomics contributes to throughput stability, error reduction, and better manpower utilization in manufacturing operations.',
    url: PAGE_URL,
    type: 'article',
    locale: 'en_ID',
    siteName: 'PT Dimensi Quantum Wahyudi',
    images: [
      {
        url: `${BASE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'Ergonomics Impact on Industrial Productivity and Throughput',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ergonomics as a Productivity Lever | PT Dimensi Quantum Wahyudi',
    description: 'Tingkatkan throughput manufaktur dan efisiensi waktu siklus dengan ergonomi kerja.',
    images: [`${BASE_URL}/opengraph-image`],
  },
};

export default function ErgonomicsProductivityPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Beranda', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Insights', item: `${BASE_URL}/news` },
      { '@type': 'ListItem', position: 3, name: 'Pusat Ergonomi', item: `${BASE_URL}/news/ergonomics` },
      { '@type': 'ListItem', position: 4, name: 'Dampak Produktivitas Pabrik', item: PAGE_URL },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Bagaimana ergonomi dapat secara langsung meningkatkan throughput pabrik?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ketika operator tidak terbebani oleh beban fisik berat, gerakan mengangkat dan memindahkan barang menjadi lebih cepat, stabil, dan presisi. Kelelahan yang biasanya menurunkan ritme kerja di akhir shift dapat dieliminasi, menjaga output tetap konsisten dari awal hingga akhir shift.',
        },
      },
      {
        '@type': 'Question',
        name: 'Berapa persen potensi efisiensi waktu siklus (cycle time) dengan vacuum lifter?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Penerapan Vacuum Tube Lifter atau Electric Manipulator terbukti meningkatkan throughput penanganan material sebesar 8-22% dan memangkas waktu siklus angkat hingga 72% dibandingkan pengangkatan manual murni.',
        },
      },
      {
        '@type': 'Question',
        name: 'Bagaimana cara mengevaluasi Return on Investment (ROI) dari investasi ergonomi?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ROI dihitung dari kombinasi: (1) optimalisasi tenaga kerja (dari 2 orang menjadi 1 orang per stasiun kerja), (2) penurunan biaya cacat/reject produk akibat terjatuh, dan (3) eliminasi biaya medis serta kerugian jam kerja akibat absensi sakit pinggang operator.',
        },
      },
      {
        '@type': 'Question',
        name: 'Mengapa kelelahan di akhir shift (fatigue slowdown) merugikan pabrik?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Pelambatan akibat kelelahan fisik rata-rata mencapai 12-25% di 2-3 jam terakhir shift. Ini menciptakan bottleneck tersembunyi yang menurunkan kapasitas produksi harian secara signifikan tanpa disadari oleh manajemen.',
        },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ProductivityClient />
    </>
  );
}
