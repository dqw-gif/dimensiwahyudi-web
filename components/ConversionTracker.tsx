'use client';

import { useEffect } from 'react';
import { trackEvent } from '../lib/gtag';

function classifyLink(href: string) {
  if (href.includes('wa.me')) return 'whatsapp';
  if (href.includes('/contact')) return 'contact';
  if (href.includes('/products')) return 'product';
  if (href.includes('/services')) return 'service';
  if (href.includes('/news')) return 'insight';
  return 'other';
}

export default function ConversionTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest('a') as HTMLAnchorElement | null;
      if (!anchor || !anchor.href) return;

      const destination = classifyLink(anchor.href);
      if (destination === 'other') return;

      trackEvent('cta_click', {
        destination,
        href: anchor.href,
        text: (anchor.textContent || '').trim().slice(0, 80),
      });

      if (destination === 'whatsapp') {
        trackEvent('generate_lead', {
          method: 'whatsapp',
          source: 'link_click',
        });
      }
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
