import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { mobileLiftingVariants } from '../../../../../data/products/mobile-lifting';
import { SchmalzVariantDetailView } from '../../../../../components/products/SchmalzSubcategoryViews';

interface Props { params: Promise<{ variant: string }> }

export async function generateStaticParams() {
    return mobileLiftingVariants.map(v => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { variant: slug } = await params;
    const v = mobileLiftingVariants.find(x => x.slug === slug);
    if (!v) return { title: 'Not Found' };
    return { title: `${v.name} | Mobile Lifting Devices Schmalz | PT Dimensi Quantum Wahyudi`, description: v.description.slice(0, 160) };
}

export default async function MobileLiftingVariantPage({ params }: Props) {
    const { variant: slug } = await params;
    const variant = mobileLiftingVariants.find(v => v.slug === slug);
    if (!variant) notFound();

    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: variant.name,
        description: variant.description,
        sku: variant.slug,
        mpn: variant.seriesCode,
        category: 'Mobile Lifting Device',
        url: `https://dimensiwahyudi.com/products/schmalz/mobile-lifting-device/${variant.slug}`,
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
            { '@type': 'ListItem', position: 4, name: 'Mobile Lifting Device', item: 'https://dimensiwahyudi.com/products/schmalz/mobile-lifting-device' },
            { '@type': 'ListItem', position: 5, name: variant.name, item: `https://dimensiwahyudi.com/products/schmalz/mobile-lifting-device/${variant.slug}` },
        ],
    };

    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <SchmalzVariantDetailView
                rawVariant={variant}
                allVariants={mobileLiftingVariants}
                basePath="/products/schmalz/mobile-lifting-device"
                categoryLabel="Mobile Lifting Devices"
                originLabel="Autonomous Operation"
            />
        </main>
    );
}
