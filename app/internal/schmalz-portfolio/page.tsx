import type { Metadata } from 'next';
import SchmalzPortfolioClient from './SchmalzPortfolioClient';

export const metadata: Metadata = {
  title: 'Internal Schmalz Portfolio Dashboard',
  description: 'Internal dashboard for managing Schmalz client portfolio records.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function InternalSchmalzPortfolioPage() {
  return <SchmalzPortfolioClient />;
}
