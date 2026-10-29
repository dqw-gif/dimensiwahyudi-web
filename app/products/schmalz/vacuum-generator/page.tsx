import { Metadata } from 'next';
import { vacuumGeneratorVariants } from '../../../../data/products/vacuum-generators';
import { SchmalzSubcategoryIndexView, SubcategoryConfig } from '../../../../components/products/SchmalzSubcategoryViews';

export const metadata: Metadata = {
    title: 'Vacuum Generators | Ejector & Pump Schmalz | PT Dimensi Quantum Wahyudi',
    description: 'Schmalz vacuum generator components: Compact Ejector SCPS, Basic Ejector SBP, Multi-stage SBPL, X-Pump SXPi IO-Link, Regulated Pump ECBPM, and Vacuum Blower SBG. Official distributor in Indonesia.',
    keywords: [
        'vacuum generator indonesia',
        'schmalz ejector indonesia',
        'industrial vacuum pump indonesia',
        'compact ejector SCPS',
        'high flow ejector SBPL',
        'pt dimensi quantum wahyudi',
    ],
    alternates: {
        canonical: 'https://dimensiwahyudi.com/products/schmalz/vacuum-generator',
    },
    openGraph: {
        title: 'Vacuum Generators | Ejector & Pump Schmalz',
        description: 'Discover Schmalz ejectors, pumps, and blowers for compact automation, porous materials, and Industry 4.0-ready systems.',
        url: 'https://dimensiwahyudi.com/products/schmalz/vacuum-generator',
        type: 'website',
    },
};

const config: SubcategoryConfig = {
    basePath: '/products/schmalz/vacuum-generator',
    breadcrumbLabel: 'Vacuum Generators',
    heroImage: '/images/products/schmalz/schmalz-vacuum-generators.webp',
    heroBadgeEn: `${vacuumGeneratorVariants.length} Product Types | Vacuum Components`,
    heroBadgeId: `${vacuumGeneratorVariants.length} Tipe Produk | Komponen Vacuum Generator`,
    titleLine1: 'VACUUM',
    titleLine2: 'GENERATORS',
    descEn: 'Explore Schmalz ejectors, pumps, and blowers, from compact pick-and-place ejectors to high-flow blowers for porous materials and Industry 4.0-ready smart pumps with IO-Link.',
    descId: 'Jelajahi rangkaian ejektor pneumatik, pompa elektrik, dan blower vakum Schmalz, mulai dari Compact Ejector untuk aplikasi pick-and-place cepat hingga Smart Ejector berteknologi IO-Link.',
    primaryCtaEn: 'Ejector Component Consultation',
    primaryCtaId: 'Konsultasi Komponen Ejektor',
    secondaryCtaEn: 'Selection Assistant',
    secondaryCtaId: 'Asisten Pemilihan Unit',
    secondaryCtaHref: '/digital-assistant/selection-aids',
    stats: [
        { labelEn: 'Types', labelId: 'Tipe Generator', value: String(vacuumGeneratorVariants.length) },
        { labelEn: 'Max Flow Rate', labelId: 'Laju Aliran Maks', value: '2,800 m³/h' },
        { labelEn: 'Smart Tech', labelId: 'Teknologi Cerdas', value: 'IO-Link 4.0' },
    ],
    gridHeaderEn: 'Choose the generator type for your application',
    gridHeaderId: 'Pilih tipe Vacuum Generator yang sesuai dengan sistem otomasi Anda',
    columns: 3,
    bottomCtaEn: 'Vacuum Component Consultation',
    bottomCtaId: 'Konsultasi Komponen Vakum',
};

export default function VacuumGeneratorIndexPage() {
    return (
        <main className="min-h-screen bg-white">
            <SchmalzSubcategoryIndexView config={config} variants={vacuumGeneratorVariants} />
        </main>
    );
}
