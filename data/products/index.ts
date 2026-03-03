export type { Product, ProductSpec } from './schmalz';
export type { BinarProduct } from './binar';
export { schmalzProducts } from './schmalz';
export { binarProducts } from './binar';

export const BRANDS = {
    schmalz: {
        id: 'schmalz',
        name: 'Schmalz',
        fullName: 'J. Schmalz GmbH',
        tagline: 'Vacuum Technology for Automation & Manual Handling',
        description: 'Pemimpin global dalam teknologi vakum industri. Schmalz menyediakan solusi lengkap untuk otomasi, handling, dan clamping berbasis vakum.',
        accentColor: 'blue',
        logoUrl: 'https://www.schmalz.com/fileadmin/user_upload/schmalz/Company/Schmalz_Logo.svg',
        origin: 'Germany',
        founded: '1910',
        websiteUrl: 'https://www.schmalz.com',
    },
    binar: {
        id: 'binar',
        name: 'Binar Handling',
        fullName: 'Binar Handling AB',
        tagline: 'Intelligent Ergonomic Lift Systems — Made in Sweden',
        description: 'Pemimpin teknologi dalam intelligent lift arms. Binar Handling mengembangkan sistem manipulator lengan cerdas yang menetapkan standar baru untuk performa, keamanan, dan ergonomi.',
        accentColor: 'yellow',
        logoUrl: 'https://www.binarhandling.com/wp-content/uploads/2019/04/binar-handling-logotype.svg',
        origin: 'Sweden',
        founded: '1976',
        websiteUrl: 'https://www.binarhandling.com',
    },
} as const;
