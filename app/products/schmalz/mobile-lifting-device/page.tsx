import { Metadata } from 'next';
import { mobileLiftingVariants } from '../../../../data/products/mobile-lifting';
import { SchmalzSubcategoryIndexView, SubcategoryConfig } from '../../../../components/products/SchmalzSubcategoryViews';

export const metadata: Metadata = {
    title: 'Mobile Lifting Devices - Full Range | Schmalz - PT Dimensi Quantum Wahyudi',
    description: 'Schmalz JumboFlex Mobile (standard socket power) and JumboFlex Picker (forklift mount with touch display). Mobile vacuum tube lifter solutions without permanent overhead cranes.',
    keywords: [
        'mobile lifting device indonesia',
        'mobile vacuum lifter',
        'jumbo flex mobile',
        'forklift vacuum lifter',
        'schmalz indonesia',
        'pt dimensi quantum wahyudi',
    ],
    alternates: {
        canonical: 'https://dimensiwahyudi.com/products/schmalz/mobile-lifting-device',
    },
    openGraph: {
        title: 'Mobile Lifting Devices | Schmalz Indonesia',
        description: 'Discover fully mobile Schmalz vacuum tube lifter solutions that run without permanent overhead crane installation.',
        url: 'https://dimensiwahyudi.com/products/schmalz/mobile-lifting-device',
        type: 'website',
        locale: 'en_ID',
        siteName: 'PT Dimensi Quantum Wahyudi',
    },
};

const config: SubcategoryConfig = {
    basePath: '/products/schmalz/mobile-lifting-device',
    breadcrumbLabel: 'Mobile Lifting Devices',
    heroImage: '/images/products/schmalz/schmalz-mobile-lifting-device.webp',
    heroBadgeEn: `${mobileLiftingVariants.length} Variants | Fully Autonomous & Mobile`,
    heroBadgeId: `${mobileLiftingVariants.length} Varian | Unit Mobile Otonom`,
    titleLine1: 'MOBILE',
    titleLine2: 'LIFTING DEVICES',
    descEn: 'A fully mobile vacuum tube lifter solution with no need for permanent overhead cranes. Plug into a standard power outlet or mount directly onto a forklift.',
    descId: 'Solusi Vacuum Tube Lifter portabel tanpa memerlukan instalasi Overhead Crane permanen. Cukup hubungkan ke soket listrik standar atau pasang langsung pada garpu Forklift maupun Pallet Jack.',
    primaryCtaEn: 'Mobile Unit Consultation',
    primaryCtaId: 'Konsultasi Mobile Unit',
    secondaryCtaEn: 'Lifting ROI Calculator',
    secondaryCtaId: 'Kalkulator ROI Angkat',
    secondaryCtaHref: '/digital-assistant/roi-calculator',
    stats: [
        { labelEn: 'Variants', labelId: 'Varian Unit', value: String(mobileLiftingVariants.length) },
        { labelEn: 'Max Capacity', labelId: 'Payload Maks', value: '50 kg' },
        { labelEn: 'Mobility', labelId: 'Mobilitas', value: 'Forklift / Crane' },
    ],
    gridHeaderEn: 'Select mobile handling configuration',
    gridHeaderId: 'Pilih konfigurasi unit pengangkat mobile untuk gudang dan logistik',
    columns: 2,
    bottomCtaEn: 'Mobile System Consultation',
    bottomCtaId: 'Konsultasi Sistem Mobile',
};

export default function MobileLiftingIndexPage() {
    return (
        <main className="min-h-screen bg-white">
            <SchmalzSubcategoryIndexView config={config} variants={mobileLiftingVariants} />
        </main>
    );
}
