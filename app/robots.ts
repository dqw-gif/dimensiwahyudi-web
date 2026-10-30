import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const disallowRules = [
        '/admin/',
        '/api/',
        '/internal/',
        '/maintenance/',
        '/nsg-login/',
        '/private/',
    ];

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: disallowRules,
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: disallowRules,
            },
        ],
        host: 'https://dimensiwahyudi.com',
        sitemap: 'https://dimensiwahyudi.com/sitemap.xml',
    };
}
