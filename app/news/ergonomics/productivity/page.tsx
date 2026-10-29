import type { Metadata } from 'next';
import ProductivityClient from './ProductivityClient';

export const metadata: Metadata = {
  title: 'Ergonomics as a Productivity Lever | Industrial Ergonomics',
  description:
    'Learn how ergonomics contributes to throughput stability, error reduction, and better manpower utilization in manufacturing operations.',
  keywords: [
    'ergonomics and plant productivity',
    'peningkatan throughput pabrik',
    'efisiensi handling material',
    'cycle time manufaktur',
    'reduksi error produksi',
    'optimasi tenaga kerja produksi',
    'alat angkat ergonomis indonesia',
    'roi ergonomi industri',
  ],
  alternates: {
    canonical: 'https://dimensiwahyudi.com/news/ergonomics/productivity',
  },
};

export default function ErgonomicsProductivityPage() {
  return <ProductivityClient />;
}
