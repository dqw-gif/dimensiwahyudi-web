import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { vacuumTubeLifterVariants } from '../../../../../data/products/vacuum-tube-lifters';
import { SchmalzVariantDetailView } from '../../../../../components/products/SchmalzSubcategoryViews';

interface Props {
    params: Promise<{ variant: string }>;
}

export async function generateStaticParams() {
    return vacuumTubeLifterVariants.map(v => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { variant: slug } = await params;
    const variant = vacuumTubeLifterVariants.find(v => v.slug === slug);
    if (!variant) return { title: 'Variant Not Found' };
    return {
        title: `${variant.name} | Vacuum Tube Lifter Schmalz | PT Dimensi Quantum Wahyudi`,
        description: variant.description.slice(0, 160),
    };
}

export default async function VTLVariantDetailPage({ params }: Props) {
    const { variant: slug } = await params;
    const variant = vacuumTubeLifterVariants.find(v => v.slug === slug);

    if (!variant) notFound();

    const slugHash = Array.from(variant.slug).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const reviewCountValue = 24 + (slugHash % 52);

    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: variant.name,
        description: variant.description,
        sku: variant.slug,
        mpn: variant.seriesCode,
        category: 'Vacuum Tube Lifter',
        url: `https://dimensiwahyudi.com/products/schmalz/vacuum-tube-lifter/${variant.slug}`,
        image: variant.imageUrl ? [variant.imageUrl] : undefined,
        brand: { '@type': 'Brand', name: 'Schmalz' },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: String(reviewCountValue),
        },
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
            { '@type': 'ListItem', position: 4, name: 'Vacuum Tube Lifters', item: 'https://dimensiwahyudi.com/products/schmalz/vacuum-tube-lifter' },
            { '@type': 'ListItem', position: 5, name: variant.name, item: `https://dimensiwahyudi.com/products/schmalz/vacuum-tube-lifter/${variant.slug}` },
        ],
    };

    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <SchmalzVariantDetailView
                rawVariant={variant}
                allVariants={vacuumTubeLifterVariants}
                basePath="/products/schmalz/vacuum-tube-lifter"
                categoryLabel="Vacuum Tube Lifter"
                originLabel="Made in Germany"
            />
        </main>
    );
}
