import { Metadata } from 'next';
import BentoGallery, { OurProjectsHero } from './BentoGallery';
import PreFooterCTA from '../../components/PreFooterCTA';
import { projects } from '../../data/projects';

export const metadata: Metadata = {
    title: 'Project Portfolio & Plant Case Studies | PT Dimensi Quantum Wahyudi',
    description: 'Explore installation case studies of Schmalz German vacuum lifters and Binar Swedish Quick-Lift manipulators across 50+ leading manufacturing facilities in Indonesia.',
    keywords: [
        'PT Dimensi Quantum Wahyudi portfolio',
        'vacuum lifter projects Indonesia',
        'industrial handling case studies',
        'Schmalz installation Indonesia',
        'Binar Quick-Lift project'
    ],
    openGraph: {
        title: 'Project Portfolio & Plant Case Studies | PT Dimensi Quantum Wahyudi',
        description: 'Verified field implementations of ergonomic vacuum handling systems across 50+ manufacturing lines in Indonesia.',
        url: 'https://dimensiwahyudi.com/our-projects',
        locale: 'en_ID',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Project Portfolio & Plant Case Studies | PT Dimensi Quantum Wahyudi',
        description: 'Verified field implementations of ergonomic vacuum handling systems across 50+ manufacturing lines in Indonesia.',
    },
    alternates: {
        canonical: 'https://dimensiwahyudi.com/our-projects',
        languages: {
            'en-ID': 'https://dimensiwahyudi.com/our-projects',
            'id-ID': 'https://dimensiwahyudi.com/our-projects',
            'x-default': 'https://dimensiwahyudi.com/our-projects',
        },
    },
};

export { projects };

export default async function OurProjectsPage() {
    return (
        <main className="min-h-screen bg-slate-50 selection:bg-blue-100 selection:text-blue-900 font-sans pb-16 relative">
            {/* Engineering Blueprint Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f080_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f080_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10" />

            {/* HERO SECTION */}
            <OurProjectsHero />

            {/* INTERACTIVE PROJECT SHOWCASE */}
            <BentoGallery projects={projects} />

            {/* PRE-FOOTER CTA */}
            <PreFooterCTA />
        </main>
    );
}
