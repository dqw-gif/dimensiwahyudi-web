// app/digital-assistant/vacuum-calculator/page.tsx
import VacuumCalculator from '@/components/VacuumCalculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vacuum Calculator | Digital Assistant | PT Dimensi Quantum Wahyudi',
  description:
    'Advanced vacuum engineering calculator for Indonesian manufacturers to estimate suction force, evacuation behavior, and safe handling setup.',
  keywords: [
    'vacuum calculator Indonesia',
    'vacuum suction force calculation',
    'industrial vacuum system sizing',
    'material handling engineering tool',
    'Schmalz vacuum calculator Indonesia',
  ],
  alternates: {
    canonical: 'https://dimensiwahyudi.com/digital-assistant/vacuum-calculator',
  },
  openGraph: {
    title: 'Vacuum Calculator | PT Dimensi Quantum Wahyudi',
    description:
      'Use our engineering calculator to evaluate vacuum handling parameters for industrial applications in Indonesia.',
    url: 'https://dimensiwahyudi.com/digital-assistant/vacuum-calculator',
    siteName: 'PT Dimensi Quantum Wahyudi',
    locale: 'en_ID',
    type: 'website',
  },
};

export default function VacuumCalculatorPage() {
  return (
    <main className="w-full min-h-screen bg-slate-50">
      {/* Panggil komponen kalkulator di sini */}
      <VacuumCalculator />
    </main>
  );
}