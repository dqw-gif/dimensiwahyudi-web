'use client';

import React, { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

interface TurnstileProps {
  siteKey?: string;
  onSuccess: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  className?: string;
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement | string,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          'error-callback'?: () => void;
          'expired-callback'?: () => void;
          theme?: 'light' | 'dark' | 'auto';
          size?: 'normal' | 'compact' | 'flexible';
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

export default function Turnstile({
  siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA', // Cloudflare official test key (always passes)
  onSuccess,
  onError,
  onExpire,
  className = '',
}: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    if (!isScriptLoaded || !containerRef.current || !window.turnstile) return;

    if (widgetIdRef.current) {
      try {
        window.turnstile.remove(widgetIdRef.current);
      } catch {
        // ignore
      }
    }

    try {
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: (token: string) => onSuccess(token),
        'error-callback': () => onError?.(),
        'expired-callback': () => onExpire?.(),
        theme: 'light',
        size: 'flexible',
      });
    } catch (e) {
      console.warn('Turnstile render warning:', e);
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // ignore
        }
      }
    };
  }, [isScriptLoaded, siteKey, onSuccess, onError, onExpire]);

  return (
    <div className={`turnstile-wrapper my-2 ${className}`}>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="lazyOnload"
        onLoad={() => setIsScriptLoaded(true)}
      />
      <div ref={containerRef} className="min-h-[65px] flex items-center justify-center" />
    </div>
  );
}
