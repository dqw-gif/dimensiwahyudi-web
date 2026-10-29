import { Metadata } from 'next';
import { craneSystemVariants } from '../../../../data/products/crane-systems';
import { SchmalzSubcategoryIndexView, SubcategoryConfig } from '../../../../components/products/SchmalzSubcategoryViews';

export const metadata: Metadata = {
    title: 'Crane Systems & Jib Cranes | Full Range | Schmalz | PT Dimensi Quantum Wahyudi',
    description: 'Schmalz Jib Cranes (1,000kg), Aluminum Bridge Cranes (1,200kg), KBG Modular Steel (30x8.5m), and Chain Hoists (2,500kg). A premium foundation for vacuum handling systems.',
    keywords: [
        'crane system indonesia',
        'jib crane indonesia',
        'chain hoist schmalz',
        'aluminum bridge crane',
        'industrial lifting system indonesia',
        'pt dimensi quantum wahyudi',
    ],
    alternates: {
        canonical: 'https://dimensiwahyudi.com/products/schmalz/crane-system',
    },
    openGraph: {
        title: 'Crane Systems & Jib Cranes | Schmalz Indonesia',
        description: 'Explore Schmalz jib cranes, aluminum bridge cranes, modular steel structures, and chain hoists for industrial lifting systems in Indonesia.',
        url: 'https://dimensiwahyudi.com/products/schmalz/crane-system',
        type: 'website',
        locale: 'en_ID',
        siteName: 'PT Dimensi Quantum Wahyudi',
    },
};

const config: SubcategoryConfig = {
    basePath: '/products/schmalz/crane-system',
    breadcrumbLabel: 'Crane Systems & Jib Cranes',
    heroImage: '/images/products/schmalz/schmalz-crane-system-jib-crane.webp',
    heroBadgeEn: `${craneSystemVariants.length} Systems | Up to 2,500 kg Capacity`,
    heroBadgeId: `${craneSystemVariants.length} Sistem | Kapasitas Payload hingga 2.500 kg`,
    titleLine1: 'CRANE SYSTEMS',
    titleLine2: '& JIB CRANES',
    descEn: 'A reliable handling system foundation, from jib cranes and aluminum bridge cranes to modular KBG steel structures and CSA-certified 2,500 kg chain hoists.',
    descId: 'Fondasi struktur material handling berpresisi tinggi, mulai dari Jib Crane aluminium berfriksi rendah, Overhead Bridge Crane, struktur baja modular KBG, hingga Chain Hoist bersertifikasi CSA kapasitas 2.500 kg.',
    primaryCtaEn: 'Crane & Hoist Consultation',
    primaryCtaId: 'Konsultasi Crane & Hoist',
    secondaryCtaEn: 'Selection Assistant',
    secondaryCtaId: 'Asisten Pemilihan Unit',
    secondaryCtaHref: '/digital-assistant/selection-aids',
    stats: [
        { labelEn: 'Variants', labelId: 'Varian Sistem', value: String(craneSystemVariants.length) },
        { labelEn: 'Max Hoist', labelId: 'Kapasitas Hoist', value: '2,500 kg' },
        { labelEn: 'Max Workspace', labelId: 'Bentangan Area', value: '30 × 8.5 m' },
    ],
    gridHeaderEn: 'Select crane suspension or modular track',
    gridHeaderId: 'Pilih sistem suspensi Jib Crane atau jalur rel Overhead Crane modular',
    columns: 2,
    bottomCtaEn: 'Crane Architecture Consultation',
    bottomCtaId: 'Konsultasi Arsitektur Crane',
};

export default function CraneSystemIndexPage() {
    return (
        <main className="min-h-screen bg-white">
            <SchmalzSubcategoryIndexView config={config} variants={craneSystemVariants} />
        </main>
    );
}
