'use client';

import { useEffect } from 'react';
import { trackEvent } from '../lib/gtag';

function classifyLink(href: string) {
  if (href.includes('wa.me')) return 'whatsapp';
  if (href.includes('/news/ergonomics')) return 'ergonomics';
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

      const sourcePath = window.location.pathname;
      const fromErgonomics = sourcePath.startsWith('/news/ergonomics');

      trackEvent('cta_click', {
        destination,
        href: anchor.href,
        text: (anchor.textContent || '').trim().slice(0, 80),
        source_path: sourcePath,
      });

      if (destination === 'ergonomics') {
        trackEvent('ergonomics_topic_click', {
          href: anchor.href,
          source_path: sourcePath,
          text: (anchor.textContent || '').trim().slice(0, 80),
        });
      }

      if (destination === 'whatsapp') {
        trackEvent('generate_lead', {
          method: 'whatsapp',
          source: 'link_click',
          source_path: sourcePath,
        });
      }

      if (fromErgonomics && (destination === 'contact' || destination === 'whatsapp')) {
        trackEvent('ergonomics_conversion_intent', {
          destination,
          href: anchor.href,
          source_path: sourcePath,
        });
      }
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
