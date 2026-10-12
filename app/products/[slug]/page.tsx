import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return [];
}

// This is a legacy route — product detail pages are now under /products/schmalz/[slug] or /products/binar/[slug]
// Redirect to the products index page
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://dimensiwahyudi.com/products',
  },
};

export default function LegacyProductPage() {
  redirect('/products');
}