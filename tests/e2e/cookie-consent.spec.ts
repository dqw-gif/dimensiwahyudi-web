import { test, expect } from '@playwright/test';

test('cookie banner closes when user accepts', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  const banner = page.locator('.cookie-consent-banner');
  await expect(banner).toBeVisible();

  await page.getByRole('button', { name: 'Accept' }).click();
  await expect(banner).toBeHidden();

  await expect
    .poll(async () => {
      return page.evaluate(() => document.documentElement.dataset.cookieConsent ?? null);
    })
    .toBe('accepted');
});

test('cookie banner closes on mobile viewport when user accepts', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  const banner = page.locator('.cookie-consent-banner');
  await expect(banner).toBeVisible();

  await page.getByRole('button', { name: 'Accept' }).click();
  await expect(banner).toBeHidden();
});
