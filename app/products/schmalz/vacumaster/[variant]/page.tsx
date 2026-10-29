import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { vacuMasterVariants } from '../../../../../data/products/vacumaster';
import { SchmalzVariantDetailView } from '../../../../../components/products/SchmalzSubcategoryViews';

interface Props {
    params: Promise<{ variant: string }>;
}

export async function generateStaticParams() {
    return vacuMasterVariants.map(v => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { variant: slug } = await params;
    const variant = vacuMasterVariants.find(v => v.slug === slug);
    if (!variant) return { title: 'Variant Not Found' };
    return {
        title: `${variant.name} | VacuMaster Schmalz | PT Dimensi Quantum Wahyudi`,
        description: variant.description.slice(0, 160),
    };
}

export default async function VacuMasterVariantPage({ params }: Props) {
    const { variant: slug } = await params;
    const variant = vacuMasterVariants.find(v => v.slug === slug);
    if (!variant) notFound();

    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: variant.name,
        description: variant.description,
        sku: variant.slug,
        mpn: variant.seriesCode,
        category: 'VacuMaster',
        url: `https://dimensiwahyudi.com/products/schmalz/vacumaster/${variant.slug}`,
        image: variant.imageUrl ? [variant.imageUrl] : undefined,
        brand: { '@type': 'Brand', name: 'Schmalz' },
        offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            priceCurrency: 'IDR',
            seller: { '@type': 'Organization', name: 'PT Dimensi Quantum Wahyudi' },
            areaServed: 'ID',
        },
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dimensiwahyudi.com/' },
            { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://dimensiwahyudi.com/products' },
            { '@type': 'ListItem', position: 3, name: 'Schmalz', item: 'https://dimensiwahyudi.com/products/schmalz' },
            { '@type': 'ListItem', position: 4, name: 'VacuMaster', item: 'https://dimensiwahyudi.com/products/schmalz/vacumaster' },
            { '@type': 'ListItem', position: 5, name: variant.name, item: `https://dimensiwahyudi.com/products/schmalz/vacumaster/${variant.slug}` },
        ],
    };

    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <SchmalzVariantDetailView
                rawVariant={variant}
                allVariants={vacuMasterVariants}
                basePath="/products/schmalz/vacumaster"
                categoryLabel="VacuMaster"
                originLabel="DIN EN 13155"
            />
        </main>
    );
}
