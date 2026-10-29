'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import Script from 'next/script';
import { useLanguage } from './LanguageProvider';

export type BreadcrumbItem = {
  label: string;
  href: string;
};

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  dark?: boolean;
}

export default function Breadcrumbs({ items, dark = true }: BreadcrumbsProps) {
  const { lang } = useLanguage();
  const isId = lang === 'id';

  const translateBreadcrumbLabel = (label: string) => {
    if (!isId) return label;
    if (label === 'Products') return 'Produk';
    if (label === 'Industries') return 'Industri';
    if (label === 'Digital Assistants') return 'Asisten Digital';
    if (label === 'Our Projects') return 'Proyek Kami';
    if (label === 'Services') return 'Layanan';
    if (label === 'About Us') return 'Tentang Kami';
    if (label === 'Contact') return 'Kontak';
    return label;
  };

  const schemaIdBase = items.map((item) => item.href).join('-').replace(/[^a-zA-Z0-9-]/g, '');
  const schemaId = `breadcrumb-schema-${schemaIdBase || 'root'}`;

  // Generate JSON-LD schema for BreadcrumbList
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://dimensiwahyudi.com/"
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        "item": `https://dimensiwahyudi.com${item.href}`
      }))
    ]
  };

  return (
    <nav aria-label="Breadcrumb" className="w-full mb-6">
      <Script
        id={schemaId}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
      />
      <ol className={`flex items-center flex-wrap gap-2 text-sm font-medium tracking-tight ${dark ? 'text-slate-300' : 'text-slate-500'}`}>
        <li className="flex items-center">
          <Link href="/" className={`${dark ? 'hover:text-white' : 'hover:text-blue-600'} transition-colors flex items-center gap-1.5`} title={isId ? 'Beranda' : 'Home'}>
            <Home size={14} />
            <span className="sr-only">{isId ? 'Beranda' : 'Home'}</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const displayLabel = translateBreadcrumbLabel(item.label);
          return (
            <li key={item.href} className="flex items-center gap-2">
              <ChevronRight size={14} className={dark ? 'text-slate-500' : 'text-slate-300'} />
              {isLast ? (
                <span className={`${dark ? 'text-white' : 'text-slate-900'} font-bold max-w-[200px] md:max-w-none truncate`} aria-current="page">
                  {displayLabel}
                </span>
              ) : (
                <Link href={item.href} className={`${dark ? 'hover:text-white' : 'hover:text-blue-600'} transition-colors max-w-[150px] md:max-w-none truncate`}>
                  {displayLabel}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
