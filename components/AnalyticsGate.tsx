'use client';

import { useEffect, useState } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';
import { CONSENT_CHANGE_EVENT, hasAnalyticsConsent, type ConsentChoice } from '@/lib/consent';
import GoogleAnalyticsTracker from './GoogleAnalyticsTracker';

type AnalyticsGateProps = {
  gaId?: string;
};

export default function AnalyticsGate({ gaId }: AnalyticsGateProps) {
  const [enabled, setEnabled] = useState(() => hasAnalyticsConsent());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const onConsentChanged = (event: Event) => {
      const customEvent = event as CustomEvent<ConsentChoice>;
      setEnabled(customEvent.detail === 'accepted');
    };

    window.addEventListener(CONSENT_CHANGE_EVENT, onConsentChanged);
    return () => {
      window.removeEventListener(CONSENT_CHANGE_EVENT, onConsentChanged);
    };
  }, []);

  if (!isMounted || (!gaId && !enabled)) {
    return null;
  }

  const isProduction =
    process.env.NODE_ENV === 'production' &&
    typeof window !== 'undefined' &&
    !window.location.hostname.includes('localhost');

  return (
    <>
      {gaId ? (
        <>
          <GoogleAnalytics gaId={gaId} />
          <GoogleAnalyticsTracker gaId={gaId} />
        </>
      ) : null}
      {enabled && isProduction ? <Analytics /> : null}
    </>
  );
}
