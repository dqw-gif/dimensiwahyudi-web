import type { Metadata } from 'next';
import { Custom500View } from '@/components/LegalAndUtilityViews';

export const metadata: Metadata = {
  title: 'Internal Server Error | PT Dimensi Quantum Wahyudi',
  robots: 'noindex, nofollow',
};

export default function Custom500() {
  return <Custom500View />;
}
