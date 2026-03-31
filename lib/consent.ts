export const CONSENT_STORAGE_KEY = 'dwq-cookie-consent';
export const CONSENT_CHANGE_EVENT = 'dwq-consent-changed';

export type ConsentChoice = 'accepted' | 'rejected';
type ConsentState = 'granted' | 'denied';

function isValidConsentChoice(value: string | null): value is ConsentChoice {
  return value === 'accepted' || value === 'rejected';
}

function toConsentState(choice: ConsentChoice | null): ConsentState {
  return choice === 'accepted' ? 'granted' : 'denied';
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

  const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  return isValidConsentChoice(value) ? value : null;
}

export function hasAnalyticsConsent(): boolean {
  return readConsentChoice() === 'accepted';
}

export function writeConsentChoice(choice: ConsentChoice) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  updateGtagConsent(choice, 'update');
  window.dispatchEvent(new CustomEvent<ConsentChoice>(CONSENT_CHANGE_EVENT, { detail: choice }));
}
