import { Metadata } from 'next';
import { suctionCupVariants } from '../../../../data/products/suction-cups';
import { SchmalzSubcategoryIndexView, SubcategoryConfig } from '../../../../components/products/SchmalzSubcategoryViews';

export const metadata: Metadata = {
    title: 'Vacuum Suction Cups - Full Range | Schmalz - PT Dimensi Quantum Wahyudi',
    description: 'Explore the complete Schmalz vacuum suction cup range: flat, bellows, oval, and specialized variants for electronics, sheet metal, glass, wood, packaging, and high-temperature applications.',
    keywords: [
        'vacuum suction cup indonesia',
        'schmalz suction cups',
        'vacuum cup for robotics',
        'vacuum cup sheet metal handling',
        'industrial vacuum components indonesia',
        'pt dimensi quantum wahyudi',
    ],
    alternates: {
        canonical: 'https://dimensiwahyudi.com/products/schmalz/vacuum-suction-cups',
    },
    openGraph: {
        title: 'Vacuum Suction Cups Full Range | Schmalz Indonesia',
        description: 'Find Schmalz vacuum suction cups for electronics, packaging, glass, wood, and heavy industrial handling applications.',
        url: 'https://dimensiwahyudi.com/products/schmalz/vacuum-suction-cups',
        type: 'website',
        locale: 'en_ID',
        siteName: 'PT Dimensi Quantum Wahyudi',
    },
};

const config: SubcategoryConfig = {
    basePath: '/products/schmalz/vacuum-suction-cups',
    breadcrumbLabel: 'Vacuum Suction Cups',
    heroImage: '/images/products/schmalz/schmalz-vacuum-suction-cups.webp',
    heroBadgeEn: `${suctionCupVariants.length} Suction Cup Families | Component Lineup`,
    heroBadgeId: `${suctionCupVariants.length} Keluarga Suction Cup | Lini Komponen`,
    titleLine1: 'VACUUM',
    titleLine2: 'SUCTION CUPS',
    descEn: 'Hundreds of variants for every gripping need, from sensitive electronics to heavy sheet metal. Choose from flat, bellows, oval, and engineered specialty designs.',
    descId: 'Ratusan varian Vacuum Suction Cup untuk setiap permukaan benda kerja, mulai dari komponen semikonduktor sensitif hingga plat baja berminyak. Tersedia dalam geometri Flat, Bellows, Oval, dan elastomer khusus.',
    primaryCtaEn: 'Suction Cup Selection Consultation',
    primaryCtaId: 'Konsultasi Pemilihan Suction Cup',
    secondaryCtaEn: 'Selection Assistant',
    secondaryCtaId: 'Asisten Pemilihan Unit',
    secondaryCtaHref: '/digital-assistant/selection-aids',
    materialsPills: ['NBR', 'Silicone', 'Viton', 'PU', 'HT1'],
    stats: [
        { labelEn: 'Cup Families', labelId: 'Keluarga Cup', value: String(suctionCupVariants.length) },
        { labelEn: 'Diameters', labelId: 'Rentang Diameter', value: '0.8 – 600 mm' },
        { labelEn: 'Materials', labelId: 'Material Elastomer', value: '5 Formulations' },
    ],
    gridHeaderEn: 'Browse cup shapes and specialized gripping surfaces',
    gridHeaderId: 'Pilih geometri Suction Cup dan material elastomer sesuai permukaan benda kerja',
    columns: 3,
    bottomCtaEn: 'Suction Cup Application Consultation',
    bottomCtaId: 'Konsultasi Aplikasi Suction Cup',
};

export default function SuctionCupsPage() {
    return (
        <main className="min-h-screen bg-white">
            <SchmalzSubcategoryIndexView config={config} variants={suctionCupVariants} />
        </main>
    );
}
