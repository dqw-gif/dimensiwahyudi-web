import type { Metadata } from 'next';
import RoiCalculatorClient from './RoiCalculatorClient';

export const metadata: Metadata = {
  title: 'ROI Calculator for Ergonomics | Digital Assistant',
  description:
    'Estimate ergonomic workload risk and productivity impact with our ROI calculator for manual material handling operations in Indonesia.',
  keywords: [
    'ROI calculator ergonomics Indonesia',
    'manual handling calculator',
    'material handling productivity',
    'ergonomic risk assessment',
    'industrial lifting ROI',
  ],
  alternates: {
    canonical: '/digital-assistant/roi-calculator',
  },
};

export default function RoiCalculatorPage() {
  return <RoiCalculatorClient />;
}
