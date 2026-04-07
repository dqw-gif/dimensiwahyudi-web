import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import Script from 'next/script';

export type BreadcrumbItem = {
  label: string;
  href: string;
};

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
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
      <ol className="flex items-center flex-wrap gap-2 text-sm text-slate-500 font-medium tracking-tight">
        <li className="flex items-center">
          <Link href="/" className="hover:text-blue-600 transition-colors flex items-center gap-1.5" title="Home">
            <Home size={14} />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              <ChevronRight size={14} className="text-slate-300" />
              {isLast ? (
                <span className="text-slate-900 font-bold max-w-[200px] md:max-w-none truncate" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-blue-600 transition-colors max-w-[150px] md:max-w-none truncate">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
