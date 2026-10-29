import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { schmalzProducts } from '../../../../data/products/schmalz';
import { SchmalzProductDetailView } from '../../../../components/products/ProductsViews';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return schmalzProducts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const product = schmalzProducts.find(p => p.slug === slug);
    if (!product) return { title: 'Product Not Found' };
    const title = `${product.name} | Schmalz | PT Dimensi Quantum Wahyudi`;
    const description = product.description.slice(0, 160);
    const url = `https://dimensiwahyudi.com/products/schmalz/${slug}`;
    return {
        title,
        description,
        keywords: [
            product.name,
            product.category,
            'Schmalz',
            'PT Dimensi Quantum Wahyudi',
            'Vacuum Lifter Indonesia',
            'Industrial Lifting Equipment',
            'Material Handling Indonesia',
        ],
        alternates: { canonical: url },
        openGraph: {
            title,
            description,
            url,
            type: 'website',
            locale: 'en_ID',
            siteName: 'PT Dimensi Quantum Wahyudi',
        },
    };
}

export default async function SchmalzProductDetail({ params }: Props) {
    const { slug } = await params;
    const product = schmalzProducts.find(p => p.slug === slug);

    if (!product) notFound();

    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product!.name,
        description: product!.description,
        sku: product!.slug,
        category: product!.category,
        url: `https://dimensiwahyudi.com/products/schmalz/${product!.slug}`,
        image: product!.imageUrl ? [product!.imageUrl] : undefined,
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
            { '@type': 'ListItem', position: 4, name: product.name, item: `https://dimensiwahyudi.com/products/schmalz/${product.slug}` },
        ],
    };

    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <SchmalzProductDetailView rawProduct={product} />
        </main>
    );
}
