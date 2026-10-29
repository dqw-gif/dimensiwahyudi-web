import { Metadata } from 'next';
import { ropeBalancerVariants } from '../../../../data/products/rope-balancers';
import { SchmalzSubcategoryIndexView, SubcategoryConfig } from '../../../../components/products/SchmalzSubcategoryViews';

export const metadata: Metadata = {
    title: 'Rope Balancers & Lift Systems | Full Range | Schmalz | PT Dimensi Quantum Wahyudi',
    description: 'Binar Handling NEO 30 (battery, 30kg), QLA (360 degrees, 300kg), QLR (rail, 600kg), and Ergo-Glass. Intelligent lift systems for precision workstations.',
    keywords: [
        'rope balancer indonesia',
        'lift assist system indonesia',
        'ergonomic lifting system indonesia',
        'binar handling indonesia',
        'industrial lifting solutions',
        'pt dimensi quantum wahyudi',
    ],
    alternates: {
        canonical: 'https://dimensiwahyudi.com/products/schmalz/rope-balancer',
    },
    openGraph: {
        title: 'Rope Balancers & Lift Systems | Full Range | Schmalz',
        description: 'Explore battery, articulated, and rail-based lift systems from Binar Handling and Schmalz for precise industrial lifting.',
        url: 'https://dimensiwahyudi.com/products/schmalz/rope-balancer',
        type: 'website',
    },
};

const config: SubcategoryConfig = {
    basePath: '/products/schmalz/rope-balancer',
    breadcrumbLabel: 'Rope Balancers',
    heroImage: '/images/products/schmalz/schmalz-rope-balancer-binar.webp',
    heroBadgeEn: `${ropeBalancerVariants.length} Systems | Binar Quick-Lift Series`,
    heroBadgeId: `${ropeBalancerVariants.length} Sistem | Seri Binar Quick-Lift`,
    titleLine1: 'ROPE BALANCERS',
    titleLine2: '& LIFT SYSTEMS',
    descEn: 'Intelligent lift systems from Binar Handling with zero-gravity feel and precise positioning, from 30 kg battery-operated units up to 600 kg rail systems.',
    descId: 'Sistem pengangkat servo cerdas dari Binar Handling dengan respons zero-gravity dan penempatan milimetrik, mulai dari unit baterai Neo 30 kapasitas 30 kg hingga sistem rel QLR kapasitas 600 kg.',
    primaryCtaEn: 'Quick-Lift Consultation',
    primaryCtaId: 'Konsultasi Quick-Lift',
    secondaryCtaEn: 'Selection Assistant',
    secondaryCtaId: 'Asisten Pemilihan Unit',
    secondaryCtaHref: '/digital-assistant/selection-aids',
    stats: [
        { labelEn: 'Systems', labelId: 'Varian Sistem', value: String(ropeBalancerVariants.length) },
        { labelEn: 'Max Capacity', labelId: 'Payload Maks', value: '600 kg' },
        { labelEn: 'Drive Tech', labelId: 'Penggerak', value: 'Servo / Battery' },
    ],
    gridHeaderEn: 'Select intelligent rope balancer or lift arm configuration',
    gridHeaderId: 'Pilih konfigurasi Rope Balancer atau sistem lengan angkat servo',
    columns: 2,
    bottomCtaEn: 'Quick-Lift System Consultation',
    bottomCtaId: 'Konsultasi Sistem Quick-Lift',
};

export default function RopeBalancerIndexPage() {
    return (
        <main className="min-h-screen bg-white">
            <SchmalzSubcategoryIndexView config={config} variants={ropeBalancerVariants} />
        </main>
    );
}
