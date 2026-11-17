'use client';

import { useEffect, useRef, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

interface GoogleAnalyticsTrackerProps {
  gaId?: string;
}

function TrackerContent({ gaId }: { gaId?: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!gaId) return;

    const search = searchParams?.toString();
    const url = pathname + (search ? `?${search}` : '');

    // Skip the very first render if @next/third-parties GoogleAnalytics already sent the initial hit
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (typeof window !== 'undefined' && typeof (window as unknown as { gtag?: Function }).gtag === 'function') {
      const gtag = (window as unknown as { gtag: Function }).gtag;

      // Update config with the new page path and title
      gtag('config', gaId, {
        page_path: url,
        page_location: window.location.href,
        page_title: document.title,
      });

      // Explicitly trigger a page_view event on client-side route change
      gtag('event', 'page_view', {
        page_path: url,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [pathname, searchParams, gaId]);

  return null;
}

export default function GoogleAnalyticsTracker({ gaId }: GoogleAnalyticsTrackerProps) {
  if (!gaId) return null;

  return (
    <Suspense fallback={null}>
      <TrackerContent gaId={gaId} />
    </Suspense>
  );
}
