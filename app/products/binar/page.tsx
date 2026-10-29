import { Metadata } from 'next';
import { BinarCatalogView } from '../../../components/products/ProductsViews';

export const metadata: Metadata = {
    title: 'Binar Handling Products Indonesia | Intelligent Lift Arms & Grippers | PT Dimensi Quantum Wahyudi',
    description: 'Binar Handling portfolio from Sweden: QLA Quick-Lift Arm, QLD Motorized 300kg, vacuum grippers, and magnetic grippers. Precision ergonomic solutions for Indonesian manufacturing and automotive sectors.',
    keywords: ['Binar Handling Indonesia', 'QLA Lift Arm', 'QLD 300i', 'Intelligent Lift Arm Sweden', 'Industrial Vacuum Gripper', 'Magnetic Gripper', 'PT Dimensi Quantum Wahyudi'],
    alternates: { canonical: 'https://dimensiwahyudi.com/products/binar' },
    openGraph: {
        title: 'Binar Handling Products Indonesia | Intelligent Lift Arms & Grippers',
        description: 'Official Binar Handling distributor in Indonesia, delivering intelligent lift arms and grippers for high-precision manufacturing operations.',
        url: 'https://dimensiwahyudi.com/products/binar',
        type: 'website',
        locale: 'en_ID',
        siteName: 'PT Dimensi Quantum Wahyudi',
    },
};

export default function BinarCatalogPage() {
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://dimensiwahyudi.com/',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Products',
                item: 'https://dimensiwahyudi.com/products',
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: 'Binar Handling',
                item: 'https://dimensiwahyudi.com/products/binar',
            },
        ],
    };

    return (
        <main className="min-h-screen bg-slate-50 selection:bg-red-600 selection:text-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <BinarCatalogView />
        </main>
    );
}
