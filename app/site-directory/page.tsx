import React from 'react';
import { Metadata } from 'next';
import { SiteDirectoryView } from '@/components/LegalAndUtilityViews';

export const metadata: Metadata = {
  title: 'Sitemap | PT Dimensi Quantum Wahyudi',
  description: 'Complete directory of PT Dimensi Quantum Wahyudi website including industrial solutions, insights, tools, and company information.',
};

export default function HTMLSitemapPage() {
  return <SiteDirectoryView />;
}
