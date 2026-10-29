import type { Metadata } from 'next';
import ErgonomicsHubClient from './ErgonomicsHubClient';

export const metadata: Metadata = {
  title: 'Industrial Ergonomics Hub | Health, Productivity, and Safety Insights',
  description:
    'Explore practical ergonomics guidance for Indonesian manufacturers: health risk prevention, productivity improvement, safety compliance, and implementation strategy.',
  keywords: [
    'ergonomi industri indonesia',
    'ergonomi kerja manufaktur',
    'keselamatan kerja angkat manual',
    'MSD manufaktur',
    'peningkatan produktivitas pabrik',
    'alat bantu angkat ergonomis',
    'vacuum lifter ergonomis indonesia',
    'material handling ergonomis',
    'k3 ergonomi pabrik',
    'PT Dimensi Quantum Wahyudi',
  ],
  alternates: {
    canonical: 'https://dimensiwahyudi.com/news/ergonomics',
  },
  openGraph: {
    title: 'Industrial Ergonomics Hub | PT Dimensi Quantum Wahyudi',
    description:
      'A practical ergonomics knowledge hub for manufacturing leaders: reduce strain, improve productivity, and strengthen safety compliance.',
    url: 'https://dimensiwahyudi.com/news/ergonomics',
    type: 'article',
    locale: 'en_ID',
  },
};

export default function ErgonomicsHubPage() {
  return <ErgonomicsHubClient />;
}
