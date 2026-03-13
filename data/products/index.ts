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
        description: 'A global leader in industrial vacuum technology. Schmalz delivers end-to-end solutions for automation, material handling, and vacuum-based clamping.',
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
        description: 'A technology leader in intelligent lift arms. Binar Handling develops advanced manipulator systems that set new benchmarks for performance, safety, and ergonomics.',
        accentColor: 'yellow',
        logoUrl: 'https://www.binarhandling.com/wp-content/uploads/2019/04/binar-handling-logotype.svg',
        origin: 'Sweden',
        founded: '1976',
        websiteUrl: 'https://www.binarhandling.com',
    },
} as const;
