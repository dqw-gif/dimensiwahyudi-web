import { Metadata } from 'next';
import { SchmalzCatalogView } from '../../../components/products/ProductsViews';

export const metadata: Metadata = {
    title: 'Products Schmalz Indonesia | Vacuum Lifter, VacuMaster, Crane System | PT Dimensi Quantum Wahyudi',
    description: 'Complete Schmalz portfolio: Vacuum Tube Lifters, VacuMaster, Crane Systems, Mobile Lifting Devices, and Suction Cups. Official Schmalz distributor in Indonesia with engineering and genuine parts support.',
    keywords: ['Schmalz Indonesia', 'Schmalz Vacuum Tube Lifter', 'VacuMaster Indonesia', 'JumboFlex', 'Schmalz Crane System', 'Vacuum Lifting Equipment', 'PT Dimensi Quantum Wahyudi Bekasi'],
    alternates: { canonical: 'https://dimensiwahyudi.com/products/schmalz' },
    openGraph: {
        title: 'Products Schmalz Indonesia | Vacuum Lifter & Crane System',
        description: 'Official Schmalz distributor in Indonesia for German-standard vacuum lifters, crane systems, and suction cups with dependable technical support.',
        url: 'https://dimensiwahyudi.com/products/schmalz',
        type: 'website',
        locale: 'en_ID',
        siteName: 'PT Dimensi Quantum Wahyudi',
    },
};

export default function SchmalzCatalogPage() {
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
                name: 'Schmalz',
                item: 'https://dimensiwahyudi.com/products/schmalz',
            },
        ],
    };

    return (
        <main className="min-h-screen bg-slate-50 selection:bg-[#005596] selection:text-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <SchmalzCatalogView />
        </main>
    );
}
