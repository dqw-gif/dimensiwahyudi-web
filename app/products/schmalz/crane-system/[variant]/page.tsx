import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { craneSystemVariants } from '../../../../../data/products/crane-systems';
import { SchmalzVariantDetailView } from '../../../../../components/products/SchmalzSubcategoryViews';

interface Props { params: Promise<{ variant: string }> }

export async function generateStaticParams() {
    return craneSystemVariants.map(v => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { variant: slug } = await params;
    const v = craneSystemVariants.find(x => x.slug === slug);
    if (!v) return { title: 'Not Found' };
    return { title: `${v.name} | Crane Systems Schmalz | PT Dimensi Quantum Wahyudi`, description: v.description.slice(0, 160) };
}

export default async function CraneSystemVariantPage({ params }: Props) {
    const { variant: slug } = await params;
    const variant = craneSystemVariants.find(v => v.slug === slug);
    if (!variant) notFound();

    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: variant.name,
        description: variant.description,
        sku: variant.slug,
        mpn: variant.seriesCode,
        category: 'Crane Systems',
        url: `https://dimensiwahyudi.com/products/schmalz/crane-system/${variant.slug}`,
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
            { '@type': 'ListItem', position: 4, name: 'Crane Systems', item: 'https://dimensiwahyudi.com/products/schmalz/crane-system' },
            { '@type': 'ListItem', position: 5, name: variant.name, item: `https://dimensiwahyudi.com/products/schmalz/crane-system/${variant.slug}` },
        ],
    };

    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <SchmalzVariantDetailView
                rawVariant={variant}
                allVariants={craneSystemVariants}
                basePath="/products/schmalz/crane-system"
                categoryLabel="Crane Systems & Jib Cranes"
                originLabel="Modular Track System"
            />
        </main>
    );
}
