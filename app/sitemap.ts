import { MetadataRoute } from 'next';
import { getAllPosts } from '../services/wordpress';

const BASE_URL = 'https://dimensiwahyudi.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/services`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/news`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/news/ergonomics`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.85,
        },
        {
            url: `${BASE_URL}/news/ergonomics/health-risks`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/news/ergonomics/productivity`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/news/ergonomics/safety-standards`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/news/ergonomics/glossary`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.75,
        },
        {
            url: `${BASE_URL}/contact`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/career`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/our-projects`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.85,
        },
        // Dynamic Our Projects Pages (Sample)
        { url: `${BASE_URL}/our-projects/otomotif-stamping-line`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
        { url: `${BASE_URL}/our-projects/fmcg-packaging-line`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
        { url: `${BASE_URL}/our-projects/farmasi-cleanroom`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
        {
            url: `${BASE_URL}/digital-assistant/vacuum-calculator`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/digital-assistant/roi-calculator`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/digital-assistant/selection-aids`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.85,
        },
        {
            url: `${BASE_URL}/digital-assistant/video-library`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.85,
        },
    ];


    // Static product pages
    const productEntries: MetadataRoute.Sitemap = [
        { url: `${BASE_URL}/products`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
        { url: `${BASE_URL}/products/schmalz`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
        { url: `${BASE_URL}/products/binar`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
        // Schmalz products (top level)
        ...['vacumaster', 'mobile-lifting-device', 'vacuum-generator', 'crane-system']
            .map(slug => ({ url: `${BASE_URL}/products/schmalz/${slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 })),
        // Vacuum Tube Lifter — category + 9 variants
        { url: `${BASE_URL}/products/schmalz/vacuum-tube-lifter`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
        ...['jumboflex', 'jumboflex-gen1', 'jumboergo', 'jumbosprint', 'jumbosprint-ex', 'palvac-sprint-hygienic', 'palvac-sprint', 'jumboflex-high-stack', 'jumbo-low-stack']
            .map(slug => ({ url: `${BASE_URL}/products/schmalz/vacuum-tube-lifter/${slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 })),
        // VacuMaster — category + 11 variants
        { url: `${BASE_URL}/products/schmalz/vacumaster`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
        ...['basic', 'comfort', 'vario', 'eco', 'window', 'wood', 'coil', 'light', 'multi', 'glass', 'panel']
            .map(slug => ({ url: `${BASE_URL}/products/schmalz/vacumaster/${slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 })),
        // Mobile Lifting Devices — category + 2 variants
        { url: `${BASE_URL}/products/schmalz/mobile-lifting-device`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
        ...['jumboflex-mobile', 'jumboflex-picker']
            .map(slug => ({ url: `${BASE_URL}/products/schmalz/mobile-lifting-device/${slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 })),
        // Vacuum Generators — category + 6 variants
        { url: `${BASE_URL}/products/schmalz/vacuum-generator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
        ...['scps-compact-ejector', 'sbp-basic-ejector', 'sbpl-high-flow-ejector', 'sxpi-x-pump', 'ecbpm-electric-pump', 'sbg-vacuum-blower']
            .map(slug => ({ url: `${BASE_URL}/products/schmalz/vacuum-generator/${slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 })),
        // Crane Systems — category + 4 variants
        { url: `${BASE_URL}/products/schmalz/crane-system`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
        ...['jib-cranes', 'aluminum-bridge-cranes', 'kbg-steel-construction', 'chain-hoists']
            .map(slug => ({ url: `${BASE_URL}/products/schmalz/crane-system/${slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 })),
        // Vacuum Suction Cups — category + 12 variants
        { url: `${BASE_URL}/products/schmalz/vacuum-suction-cups`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
        ...['flat-round', 'bellows-round', 'flat-oval', 'bellows-oval', 'sheet-metal', 'packaging', 'electronics', 'bag-handling', 'plastic-film-paper', 'wood', 'glass', 'high-temperature']
            .map(slug => ({ url: `${BASE_URL}/products/schmalz/vacuum-suction-cups/${slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 })),
        // Binar products
        ...['qla-50i-om', 'qla-100i-om', 'qla-200i-om', 'qld-300i', 'qlat-350s', 'vacuum-end-effector', 'magnetic-gripper-110', 'magnetic-gripper-275', 'vacuum-tilt-gripper']
            .map(slug => ({ url: `${BASE_URL}/products/binar/${slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 })),
    ];

    // Dynamic post pages — fetch all articles from WordPress
    let postEntries: MetadataRoute.Sitemap = [];
    try {
        const posts = await getAllPosts();
        postEntries = posts.map((post: { slug: string; date: string }) => ({
            url: `${BASE_URL}/news/${post.slug}`,
            lastModified: new Date(post.date),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }));
    } catch (error) {
        console.error('Sitemap: Failed to fetch posts from WordPress', error);
    }

    return [...staticPages, ...productEntries, ...postEntries];
}
