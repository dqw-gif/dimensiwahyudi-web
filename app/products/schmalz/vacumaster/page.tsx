import { Metadata } from 'next';
import { vacuMasterVariants } from '../../../../data/products/vacumaster';
import { SchmalzSubcategoryIndexView, SubcategoryConfig } from '../../../../components/products/SchmalzSubcategoryViews';

export const metadata: Metadata = {
    title: 'VacuMaster - Full Series | Schmalz - PT Dimensi Quantum Wahyudi',
    description: 'Full Schmalz VacuMaster lineup: Basic, Comfort, Vario (2000kg), Eco (without external power), Window, Wood, Coil, Light, Multi, Glass, and Panel (14m). Eleven variants for multiple industries.',
    keywords: [
        'vacumaster indonesia',
        'heavy vacuum lifter',
        'schmalz vacumaster',
        'glass lifting vacuum system',
        'industrial lifting indonesia',
        'pt dimensi quantum wahyudi',
    ],
    alternates: {
        canonical: 'https://dimensiwahyudi.com/products/schmalz/vacumaster',
    },
    openGraph: {
        title: 'VacuMaster Full Series | Schmalz Indonesia',
        description: 'Explore the complete VacuMaster series for glass, wood, coils, and heavy-duty industrial lifting applications.',
        url: 'https://dimensiwahyudi.com/products/schmalz/vacumaster',
        type: 'website',
        locale: 'en_ID',
        siteName: 'PT Dimensi Quantum Wahyudi',
    },
};

const config: SubcategoryConfig = {
    basePath: '/products/schmalz/vacumaster',
    breadcrumbLabel: 'VacuMaster',
    heroImage: '/images/products/schmalz/schmalz-vacumaster.webp',
    heroBadgeEn: '11 Variants | Heavy-Duty & Multi-Industry',
    heroBadgeId: '11 Varian | Heavy-Duty & Lintas Industri',
    titleLine1: 'VACUMASTER',
    titleLine2: 'LIFTING DEVICES',
    descEn: 'The Schmalz VacuMaster series is a highly versatile vacuum lifting range, from 100 kg to 2,000 kg and from porous wood to glass, steel coils, and 14-meter panels.',
    descId: 'Seri Schmalz VacuMaster dirancang untuk pengangkatan vakum beban berat mulai dari 100 kg hingga 2.000 kg, menangani panel kayu berpori, kaca arsitektural, steel coil, hingga panel konstruksi sepanjang 14 meter.',
    primaryCtaEn: 'Consult Variant Selection',
    primaryCtaId: 'Konsultasi Pemilihan Varian',
    secondaryCtaEn: 'Lifting ROI Calculator',
    secondaryCtaId: 'Kalkulator ROI Angkat',
    secondaryCtaHref: '/digital-assistant/roi-calculator',
    stats: [
        { labelEn: 'Variants', labelId: 'Varian Produk', value: '11' },
        { labelEn: 'Max Capacity', labelId: 'Payload Maks', value: '2,000 kg' },
        { labelEn: 'Max Panel Length', labelId: 'Panjang Panel Maks', value: '14 m' },
    ],
    gridHeaderEn: 'Choose the variant that matches your needs',
    gridHeaderId: 'Pilih varian VacuMaster yang sesuai dengan material benda kerja Anda',
    columns: 3,
    bottomCtaEn: 'Variant Selection Consultation',
    bottomCtaId: 'Konsultasi Pemilihan Varian',
};

export default function VacuMasterIndexPage() {
    return (
        <main className="min-h-screen bg-white">
            <SchmalzSubcategoryIndexView config={config} variants={vacuMasterVariants} />
        </main>
    );
}
