import type { Metadata } from 'next';
import GlossaryClient from './GlossaryClient';

export const metadata: Metadata = {
  title: 'Industrial Ergonomics Glossary | Key Terms for Manufacturing Teams',
  description:
    'A practical glossary of ergonomics terms for industrial engineers, procurement teams, and plant managers.',
  keywords: [
    'glosarium ergonomi industri',
    'istilah ergonomi manufaktur',
    'definisi msd',
    'manual handling definition',
    'ergonomic risk terms',
    'istilah k3 ergonomi',
    'kamus ergonomi pabrik',
    'ergonomi indonesia',
  ],
  alternates: {
    canonical: 'https://dimensiwahyudi.com/news/ergonomics/glossary',
  },
};

export default function ErgonomicsGlossaryPage() {
  return <GlossaryClient />;
}
