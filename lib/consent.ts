export const CONSENT_STORAGE_KEY = 'dwq-cookie-consent';
export const CONSENT_CHANGE_EVENT = 'dwq-consent-changed';
const CONSENT_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export type ConsentChoice = 'accepted' | 'rejected';
type ConsentState = 'granted' | 'denied';

function isValidConsentChoice(value: string | null): value is ConsentChoice {
  return value === 'accepted' || value === 'rejected';
}

function toConsentState(choice: ConsentChoice | null): ConsentState {
  return choice === 'accepted' ? 'granted' : 'denied';
}

function readConsentCookie(): ConsentChoice | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const parts = document.cookie.split('; ').find((entry) => entry.startsWith(`${CONSENT_STORAGE_KEY}=`));
  if (!parts) {
    return null;
  }

  const value = decodeURIComponent(parts.split('=').slice(1).join('='));
  return isValidConsentChoice(value) ? value : null;
}

export function updateGtagConsent(choice: ConsentChoice | null, command: 'default' | 'update' = 'update') {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  const analyticsState = toConsentState(choice);

  window.gtag('consent', command, {
    analytics_storage: analyticsState,
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
}

export function readConsentChoice(): ConsentChoice | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (isValidConsentChoice(value)) {
      return value;
    }
  } catch {
    // Fall back to cookie when storage is blocked.
  }

  return readConsentCookie();
}

export function hasAnalyticsConsent(): boolean {
  return readConsentChoice() === 'accepted';
}

export function writeConsentChoice(choice: ConsentChoice) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // Ignore storage errors and persist with cookie fallback.
  }

  if (typeof document !== 'undefined') {
    document.cookie = `${CONSENT_STORAGE_KEY}=${encodeURIComponent(choice)}; Max-Age=${CONSENT_COOKIE_MAX_AGE_SECONDS}; Path=/; SameSite=Lax`;
  }

  updateGtagConsent(choice, 'update');
  window.dispatchEvent(new CustomEvent<ConsentChoice>(CONSENT_CHANGE_EVENT, { detail: choice }));
}
