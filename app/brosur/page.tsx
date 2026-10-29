import { Metadata } from 'next';
import BrochuresClient from './BrochuresClient';

export const metadata: Metadata = {
  title: 'Official Technical Catalogs & Product Brochures | PT Dimensi Quantum Wahyudi',
  description:
    'Download official technical catalogs and engineering brochures for Vacuum Lifters (JumboFlex, JumboErgo, VacuMaster), Crane Systems, Robotic Area Grippers, and Automation Components from Schmalz Germany and Binar Handling Sweden.',
  keywords: [
    'Schmalz Catalog Indonesia',
    'Vacuum Lifter Brochure',
    'Industrial Crane Systems PDF',
    'JumboFlex Catalog',
    'JumboErgo Technical Specs',
    'Schmalz Area Gripping',
    'Vacuum Automation Components',
    'PT Dimensi Quantum Wahyudi',
  ],
  alternates: {
    canonical: 'https://dimensiwahyudi.com/brosur',
  },
  openGraph: {
    title: 'Official Technical Catalogs & Product Brochures | PT Dimensi Quantum Wahyudi',
    description:
      'Direct access to engineering specifications, lifting capacities, and CAD integration guidelines for Schmalz Germany and Binar Handling Sweden.',
    url: 'https://dimensiwahyudi.com/brosur',
    siteName: 'PT Dimensi Quantum Wahyudi',
    images: [
      {
        url: 'https://dimensiwahyudi.com/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Technical Catalogs & Product Brochures: PT Dimensi Quantum Wahyudi',
      },
    ],
    locale: 'en_ID',
    type: 'website',
  },
};

export default function BrosurPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Official Technical Catalogs & Digital Brochures: PT Dimensi Quantum Wahyudi',
    description:
      'Official technical digital brochures for ergonomic vacuum handling systems, robotic area gripping, and automation components from Schmalz Germany and Binar Handling Sweden in Indonesia.',
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
        availableLanguage: ['English', 'Indonesian'],
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
