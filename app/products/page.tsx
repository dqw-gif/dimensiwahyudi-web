import { Metadata } from 'next';
import { ProductsHubView } from '../../components/products/ProductsViews';

export const metadata: Metadata = {
    title: 'Products | PT Dimensi Quantum Wahyudi | Official Schmalz & Binar Handling Distributor',
    description: 'Explore premium vacuum lifters, ergonomic lift arms, and gripping solutions from Schmalz (Germany) and Binar Handling (Sweden), officially distributed by PT Dimensi Quantum Wahyudi in Indonesia.',
    keywords: [
        'vacuum lifter indonesia',
        'schmalz indonesia distributor',
        'binar handling indonesia distributor',
        'ergonomic lifting solutions indonesia',
        'industrial material handling indonesia',
        'pt dimensi quantum wahyudi',
    ],
    openGraph: {
        title: 'Products | Official Schmalz & Binar Handling Distributor in Indonesia',
        description: 'Explore premium industrial lifting and vacuum handling products from Schmalz and Binar Handling, officially distributed by PT Dimensi Quantum Wahyudi.',
        url: 'https://dimensiwahyudi.com/products',
        siteName: 'PT Dimensi Quantum Wahyudi',
        locale: 'en_ID',
        type: 'website',
    },
    alternates: { canonical: 'https://dimensiwahyudi.com/products' },
};

export default function ProductsPage() {
    const productsFaqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: 'Do you serve only customers in Indonesia?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes. PT Dimensi Quantum Wahyudi focuses on industrial customers across Indonesia with local engineering support and implementation services.',
                },
            },
            {
                '@type': 'Question',
                name: 'Are Schmalz and Binar products officially distributed by your company?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes. We are the official distributor for Schmalz and Binar Handling in Indonesia, including technical consultation, installation support, and after-sales service.',
                },
            },
            {
                '@type': 'Question',
                name: 'Can I request a product trial before purchasing?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes. Our engineering team can arrange a technical assessment and product trial to validate fit, ergonomics, and operational performance before full deployment.',
                },
            },
        ],
    };

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
        ],
    };

    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productsFaqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <ProductsHubView />
        </main>
    );
}
