import { Metadata } from 'next';
import BrochuresClient from './BrochuresClient';

export const metadata: Metadata = {
  title: 'E-Katalog & Brosur Digital Resmi | PT Dimensi Quantum Wahyudi',
  description:
    'Download dan baca langsung e-katalog dan brosur resmi Vacuum Lifters (JumboFlex, JumboErgo, VacuMaster), Crane Systems, Area Gripping Robotik, dan Komponen Otomasi Schmalz Germany & Binar Handling Sweden.',
  keywords: [
    'Katalog Schmalz Indonesia',
    'Brosur Vacuum Lifter',
    'Brosur Crane Systems',
    'Katalog JumboFlex',
    'Katalog JumboErgo',
    'Area Gripping Schmalz',
    'Vacuum Automation Components',
    'PT Dimensi Quantum Wahyudi',
    'Brosur Digital Pameran',
  ],
  alternates: {
    canonical: 'https://dimensiwahyudi.com/brosur',
  },
  openGraph: {
    title: 'E-Katalog & Brosur Digital Resmi | PT Dimensi Quantum Wahyudi',
    description:
      'Akses instan spesifikasi teknis, kapasitas beban, dan panduan integrasi sistem penanganan vakum ergonomis dan komponen otomasi industri Schmalz Germany & Binar Handling.',
    url: 'https://dimensiwahyudi.com/brosur',
    siteName: 'PT Dimensi Quantum Wahyudi',
    images: [
      {
        url: 'https://dimensiwahyudi.com/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Katalog & Brosur Digital PT Dimensi Quantum Wahyudi',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
};

export default function BrosurPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'E-Katalog & Brosur Digital Resmi PT Dimensi Quantum Wahyudi',
    description:
      'Kumpulan brosur digital resmi untuk solusi penanganan vakum ergonomis, robotika area gripping, dan komponen otomasi Schmalz Germany & Binar Handling Sweden di Indonesia.',
    url: 'https://dimensiwahyudi.com/brosur',
    publisher: {
      '@type': 'Organization',
      name: 'PT Dimensi Quantum Wahyudi',
      url: 'https://dimensiwahyudi.com',
      logo: 'https://dimensiwahyudi.com/logo.webp',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+62-21-5596-6124',
        contactType: 'sales',
        areaServed: 'ID',
        availableLanguage: ['Indonesian', 'English'],
      },
    },
    hasPart: [
      {
        '@type': 'DigitalDocument',
        name: 'Ergonomic Vacuum Lifters & Crane Systems',
        encodingFormat: 'application/pdf',
        url: 'https://dimensiwahyudi.com/brochures/ergonomic-vacuum-lifters.pdf',
      },
      {
        '@type': 'DigitalDocument',
        name: 'Schmalz Industrial Handling Product Overview',
        encodingFormat: 'application/pdf',
        url: 'https://dimensiwahyudi.com/brochures/product-overview.pdf',
      },
      {
        '@type': 'DigitalDocument',
        name: 'Large-Area Vacuum Gripping Systems',
        encodingFormat: 'application/pdf',
        url: 'https://dimensiwahyudi.com/brochures/area-gripping.pdf',
      },
      {
        '@type': 'DigitalDocument',
        name: 'Vacuum Automation Components',
        encodingFormat: 'application/pdf',
        url: 'https://dimensiwahyudi.com/brochures/vacuum-automation.pdf',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BrochuresClient />
    </>
  );
}
