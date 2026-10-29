import { Metadata } from 'next';
import CareerClient from './CareerClient';

export const metadata: Metadata = {
    title: 'Careers | Join PT Dimensi Quantum Wahyudi',
    description: 'Join PT Dimensi Quantum Wahyudi and build your career with a team delivering premium industrial lifting, material handling, and automation solutions across Indonesia.',
    keywords: ['PT Dimensi Quantum Wahyudi careers', 'material handling careers', 'engineering jobs Bekasi', 'industrial automation careers'],
    openGraph: {
        title: 'Careers at PT Dimensi Quantum Wahyudi',
        description: 'Build your career with a team delivering premium material handling and automation solutions for Indonesian industry.',
        url: 'https://dimensiwahyudi.com/career',
    },
    alternates: { canonical: 'https://dimensiwahyudi.com/career' },
};

export default function CareerPage() {
    return <CareerClient />;
}
