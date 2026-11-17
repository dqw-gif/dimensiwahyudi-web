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
        host: 'https://www.dimensiwahyudi.com',
        sitemap: 'https://www.dimensiwahyudi.com/sitemap.xml',
    };
}
