'use client';

import { useEffect, useState } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';
import { CONSENT_CHANGE_EVENT, hasAnalyticsConsent, type ConsentChoice } from '@/lib/consent';

type AnalyticsGateProps = {
  gaId?: string;
};

export default function AnalyticsGate({ gaId }: AnalyticsGateProps) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(hasAnalyticsConsent());

    const onConsentChanged = (event: Event) => {
      const customEvent = event as CustomEvent<ConsentChoice>;
      setEnabled(customEvent.detail === 'accepted');
    };

    window.addEventListener(CONSENT_CHANGE_EVENT, onConsentChanged);
    return () => {
      window.removeEventListener(CONSENT_CHANGE_EVENT, onConsentChanged);
    };
  }, []);

  if (!gaId && !enabled) {
    return null;
  }

  return (
    <>
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      {enabled ? <Analytics /> : null}
    </>
  );
}
