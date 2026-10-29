import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { industries, getRecommendedProducts } from '../../../data/industries';
import { IndustryDetailClient } from '../IndustriesViews';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return industries.map((ind) => ({ slug: ind.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) return { title: 'Industry Not Found' };
  const canonicalUrl = `https://dimensiwahyudi.com/industries/${slug}`;
  const title = `Vacuum Handling Solutions for ${industry.name} | PT Dimensi Quantum Wahyudi`;
  const description = industry.description.slice(0, 160);

  return {
    title,
    description,
    keywords: [
      `${industry.name} vacuum lifting Indonesia`,
      `${industry.name} material handling`,
      'industrial ergonomics Indonesia',
      'Schmalz vacuum lifter',
      'PT Dimensi Quantum Wahyudi',
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-ID': canonicalUrl,
        'id-ID': canonicalUrl,
        'x-default': canonicalUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'PT Dimensi Quantum Wahyudi',
      locale: 'en_ID',
      type: 'website',
      images: industry.imageUrl ? [{ url: industry.imageUrl, width: 1200, height: 630, alt: industry.name }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: industry.imageUrl ? [industry.imageUrl] : undefined,
    },
  };
}

export default async function IndustryDetailPage({ params }: Props) {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);

  if (!industry) notFound();

  const recommendedLifters = getRecommendedProducts(industry.recommendedProducts);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Industrial Handling Solutions for ${industry.name}`,
    description: industry.description,
    provider: {
      '@type': 'Organization',
      name: 'PT Dimensi Quantum Wahyudi',
      url: 'https://dimensiwahyudi.com',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Indonesia',
    },
    category: 'Industrial Material Handling',
    url: `https://dimensiwahyudi.com/industries/${slug}`,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dimensiwahyudi.com/' },
      { '@type': 'ListItem', position: 2, name: 'Industries', item: 'https://dimensiwahyudi.com/industries' },
      { '@type': 'ListItem', position: 3, name: industry.name, item: `https://dimensiwahyudi.com/industries/${slug}` },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50 selection:bg-[#005596] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <IndustryDetailClient industry={industry} recommendedLifters={recommendedLifters} />
    </main>
  );
}
