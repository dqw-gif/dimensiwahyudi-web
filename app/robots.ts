import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/private/'],
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: ['/private/'],
            },
        ],
        host: 'https://dimensiwahyudi.com',
        sitemap: 'https://dimensiwahyudi.com/sitemap.xml',
    };
}
