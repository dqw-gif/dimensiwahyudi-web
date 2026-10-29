import type { Metadata } from 'next';
import HealthRisksClient from './HealthRisksClient';

export const metadata: Metadata = {
  title: 'Health Risks in Manual Handling | Industrial Ergonomics',
  description:
    'Understand major health risks from non-ergonomic manual handling and how engineered lifting support helps reduce operator strain in industrial operations.',
  keywords: [
    'risiko ergonomi kerja',
    'penyakit akibat kerja angkat manual',
    'nyeri punggung operator produksi',
    'msd industri manufaktur indonesia',
    'kelelahan kerja operator',
    'ergonomi handling material',
    'alat bantu angkat pabrik',
    'kesehatan kerja manufaktur',
  ],
  alternates: {
    canonical: 'https://dimensiwahyudi.com/news/ergonomics/health-risks',
  },
};

export default function ErgonomicsHealthRisksPage() {
  return <HealthRisksClient />;
}
