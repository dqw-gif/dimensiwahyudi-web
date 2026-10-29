import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects } from '../page';
import CaseStudyDetailClient from './CaseStudyDetailClient';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return projects.map(p => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const c = projects.find(cs => cs.id === slug);
    if (!c) return {};
    const canonicalUrl = `https://dimensiwahyudi.com/our-projects/${slug}`;
    const description = `${c.desc.slice(0, 155)}${c.desc.length > 155 ? '...' : ''}`;
    return {
        title: `${c.client}: ${c.industry} | Our Projects PT Dimensi Quantum Wahyudi`,
        description,
        keywords: [
            `${c.industry} project Indonesia`,
            'industrial handling case study',
            'vacuum lifting implementation Indonesia',
            'ergonomic material handling project',
            'PT Dimensi Quantum Wahyudi portfolio',
        ],
        openGraph: {
            title: `Our Projects: ${c.client} (${c.industry})`,
            description,
            url: canonicalUrl,
            type: 'article',
            locale: 'en_ID',
            images: [
                {
                    url: c.image,
                    width: 1200,
                    height: 630,
                    alt: `${c.client} project case study`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `Our Projects: ${c.client} (${c.industry})`,
            description,
            images: [c.image],
        },
        alternates: {
            canonical: canonicalUrl,
            languages: {
                'en-ID': canonicalUrl,
                'id-ID': canonicalUrl,
                'x-default': canonicalUrl,
            },
        },
    };
}

export default async function CaseStudyDetailPage({ params }: Props) {
    const { slug } = await params;
    const c = projects.find(cs => cs.id === slug);
    if (!c) notFound();

    const relatedProjects = projects.filter(p => p.id !== slug).slice(0, 3);

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dimensiwahyudi.com/' },
            { '@type': 'ListItem', position: 2, name: 'Our Projects', item: 'https://dimensiwahyudi.com/our-projects' },
            { '@type': 'ListItem', position: 3, name: c.client, item: `https://dimensiwahyudi.com/our-projects/${slug}` },
        ],
    };
    const caseStudySchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: `${c.client} - ${c.industry} Project Case Study`,
        description: c.desc,
        image: c.image,
        inLanguage: 'en-ID',
        datePublished: '2024-01-01',
        dateModified: '2024-01-01',
        mainEntityOfPage: `https://dimensiwahyudi.com/our-projects/${slug}`,
        articleSection: 'Industrial Project Portfolio',
        author: {
            '@type': 'Organization',
            name: 'PT Dimensi Quantum Wahyudi',
        },
        publisher: {
            '@type': 'Organization',
            name: 'PT Dimensi Quantum Wahyudi',
            logo: {
                '@type': 'ImageObject',
                url: 'https://dimensiwahyudi.com/logo.webp',
            },
        },
        about: c.industry,
    };

    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }} />
            <CaseStudyDetailClient project={c} relatedProjects={relatedProjects} />
        </main>
    );
}
