/**
 * Centralized WordPress API type definitions.
 * Import from here instead of redefining in each component.
 */

export interface FeaturedImage {
    node: {
        sourceUrl: string;
    };
}

export interface Category {
    name: string;
    slug: string;
}

export interface Author {
    node: {
        name: string;
    };
}

/** Full post — used in detail page (includes content & author) */
export interface Post {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    featuredImage?: FeaturedImage;
    author?: Author;
    categories?: {
        nodes: Category[];
    };
}

/** Lightweight post — used in listing/grid/related posts (no content) */
export interface PostSummary {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    featuredImage?: FeaturedImage;
    categories?: {
        nodes: Category[];
    };
}
