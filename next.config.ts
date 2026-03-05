import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent clickjacking — blocks site from being embedded in iframes on other domains
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // Prevent MIME type sniffing
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Control referrer information sent with requests
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Restrict browser feature access
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  // Legacy XSS protection for older browsers
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  // DNS prefetch control
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dimensiwahyudi.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      {
        protocol: 'https',
        hostname: 'imgur.com',
      },
      {
        protocol: 'https',
        hostname: 'www.binarhandling.com',
      },
      {
        protocol: 'https',
        hostname: 'media.schmalz.com',
      },
      {
        protocol: 'https',
        hostname: 'media.schmalz.cn',
      },
      {
        protocol: 'https',
        hostname: 'i0.wp.com',
      },
      {
        protocol: 'https',
        hostname: 'i1.wp.com',
      },
      {
        protocol: 'https',
        hostname: 'i2.wp.com',
      },
      {
        protocol: 'https',
        hostname: 'i3.wp.com',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;