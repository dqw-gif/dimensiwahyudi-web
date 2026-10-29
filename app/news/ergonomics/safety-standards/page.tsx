import type { Metadata } from 'next';
import SafetyStandardsClient from './SafetyStandardsClient';

export const metadata: Metadata = {
  title: 'Occupational Safety and Ergonomics Standards | Industrial Ergonomics',
  description:
    'Practical safety and ergonomics guidance for industrial teams: compliance mindset, preventive controls, and implementation priorities.',
  keywords: [
    'standar keselamatan kerja ergonomi',
    'k3 ergonomi manufaktur',
    'compliance handling material',
    'pengendalian risiko ergonomi',
    'audit keselamatan angkat manual',
    'ergonomic risk assessment indonesia',
    'technical control lifting process',
    'ergonomics and industrial compliance',
  ],
  alternates: {
    canonical: 'https://dimensiwahyudi.com/news/ergonomics/safety-standards',
  },
};

export default function ErgonomicsSafetyStandardsPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Occupational Safety and Ergonomics Standards for Industrial Handling',
    description: 'Practical guide to industrial ergonomics safety standards: Permenaker No. 5/2018, ISO 11228-1, ISO 45001, and German AGR medical certification.',
    author: {
      '@type': 'Organization',
      name: 'PT Dimensi Quantum Wahyudi',
      url: 'https://dimensiwahyudi.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'PT Dimensi Quantum Wahyudi',
      url: 'https://dimensiwahyudi.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://dimensiwahyudi.com/opengraph-image',
      },
    },
    mainEntityOfPage: 'https://dimensiwahyudi.com/news/ergonomics/safety-standards',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dimensiwahyudi.com/' },
      { '@type': 'ListItem', position: 2, name: 'Insights', item: 'https://dimensiwahyudi.com/news' },
      { '@type': 'ListItem', position: 3, name: 'Ergonomics', item: 'https://dimensiwahyudi.com/news/ergonomics' },
      { '@type': 'ListItem', position: 4, name: 'Safety Standards', item: 'https://dimensiwahyudi.com/news/ergonomics/safety-standards' },
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
      <SafetyStandardsClient />
    </>
  );
}
