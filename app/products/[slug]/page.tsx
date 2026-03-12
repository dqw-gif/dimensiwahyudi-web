import { redirect } from 'next/navigation';

// This is a legacy route — product detail pages are now under /products/schmalz/[slug] or /products/binar/[slug]
// Redirect to the products index page
export default function LegacyProductPage() {
  redirect('/products');
}