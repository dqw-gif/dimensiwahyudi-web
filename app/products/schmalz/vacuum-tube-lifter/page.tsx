import { Metadata } from 'next';
import { vacuumTubeLifterVariants } from '../../../../data/products/vacuum-tube-lifters';
import { SchmalzSubcategoryIndexView, SubcategoryConfig } from '../../../../components/products/SchmalzSubcategoryViews';

export const metadata: Metadata = {
    title: 'Vacuum Tube Lifters - Jumbo Series | Schmalz - PT Dimensi Quantum Wahyudi',
    description: 'Complete Schmalz vacuum tube lifter lineup: JumboFlex, JumboErgo, JumboSprint, JumboSprint EX (ATEX), PalVac Hygienic, High-Stack, and Low-Stack. Nine variants for diverse handling needs.',
    keywords: [
        'vacuum tube lifter indonesia',
        'jumbo flex indonesia',
        'jumbo ergo schmalz',
        'atex vacuum lifter',
        'ergonomic vacuum handling indonesia',
        'pt dimensi quantum wahyudi',
    ],
    alternates: {
        canonical: 'https://dimensiwahyudi.com/products/schmalz/vacuum-tube-lifter',
    },
    openGraph: {
        title: 'Vacuum Tube Lifters Jumbo Series | Schmalz Indonesia',
        description: 'Browse the Schmalz Jumbo vacuum tube lifter lineup for ergonomic, high-frequency, and ATEX-ready industrial handling.',
        url: 'https://dimensiwahyudi.com/products/schmalz/vacuum-tube-lifter',
        type: 'website',
        locale: 'en_ID',
        siteName: 'PT Dimensi Quantum Wahyudi',
    },
};

const config: SubcategoryConfig = {
    basePath: '/products/schmalz/vacuum-tube-lifter',
    breadcrumbLabel: 'Vacuum Tube Lifters',
    heroImage: '/images/products/schmalz/schmalz-vacuum-tube-lifter.webp',
    heroBadgeEn: '9 Variants | Jumbo Product Family',
    heroBadgeId: '9 Varian | Lini Produk Jumbo',
    titleLine1: 'VACUUM TUBE',
    titleLine2: 'LIFTERS',
    descEn: 'The Schmalz Jumbo series is one of the most complete vacuum tube lifter lines available, from cleanroom handling to ATEX zones and capacities from 50 kg to 300 kg.',
    descId: 'Seri Schmalz Jumbo adalah jajaran Vacuum Tube Lifter terlengkap untuk lini produksi, mulai dari fasilitas Cleanroom hingga zona ATEX dengan kapasitas payload 50 kg hingga 300 kg.',
    primaryCtaEn: 'Consult Variant Selection',
    primaryCtaId: 'Konsultasi Pemilihan Varian',
    secondaryCtaEn: 'Ergonomic ROI Calculator',
    secondaryCtaId: 'Kalkulator ROI Ergonomi',
    secondaryCtaHref: '/digital-assistant/roi-calculator',
    stats: [
        { labelEn: 'Variants', labelId: 'Varian Produk', value: '9' },
        { labelEn: 'Max Capacity', labelId: 'Payload Maks', value: '300 kg' },
        { labelEn: 'Max Stack Height', labelId: 'Tinggi Tumpukan', value: '255 cm' },
    ],
    gridHeaderEn: 'Choose the variant that matches your needs',
    gridHeaderId: 'Pilih varian yang sesuai dengan kebutuhan lini produksi Anda',
    columns: 3,
    showMatrix: true,
    bottomCtaEn: 'Variant Selection Consultation',
    bottomCtaId: 'Konsultasi Pemilihan Varian',
};

export default function VacuumTubeLifterIndexPage() {
    return (
        <main className="min-h-screen bg-white">
            <SchmalzSubcategoryIndexView config={config} variants={vacuumTubeLifterVariants} />
        </main>
    );
}
