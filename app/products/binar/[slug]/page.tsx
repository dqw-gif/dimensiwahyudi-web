import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { binarProducts } from '../../../../data/products/binar';
import { BinarProductDetailView } from '../../../../components/products/ProductsViews';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return binarProducts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const product = binarProducts.find(p => p.slug === slug);
    if (!product) return { title: 'Product Not Found' };
    const title = `${product.name} (${product.modelCode}) | Binar Handling | PT Dimensi Quantum Wahyudi`;
    const description = product.description.slice(0, 160);
    const url = `https://dimensiwahyudi.com/products/binar/${slug}`;
    return {
        title,
        description,
        keywords: [
            product.name,
            product.modelCode,
            'Binar Handling',
            'PT Dimensi Quantum Wahyudi',
            'Industrial Lift Arm',
            'Intelligent Lifting Sweden',
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

export default async function BinarProductDetail({ params }: Props) {
    const { slug } = await params;
    const product = binarProducts.find(p => p.slug === slug);
    if (!product) notFound();

    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        sku: product.slug,
        mpn: product.modelCode,
        category: product.category,
        url: `https://dimensiwahyudi.com/products/binar/${product.slug}`,
        image: product.imageUrl ? [product.imageUrl] : undefined,
        brand: { '@type': 'Brand', name: 'Binar Handling' },
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
            { '@type': 'ListItem', position: 3, name: 'Binar Handling', item: 'https://dimensiwahyudi.com/products/binar' },
            { '@type': 'ListItem', position: 4, name: product.name, item: `https://dimensiwahyudi.com/products/binar/${product.slug}` },
        ],
    };

    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <BinarProductDetailView rawProduct={product} />
        </main>
    );
}
