import { test, expect } from '@playwright/test';

test('homepage renders main navigation and CTA', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 60_000 });
  await expect(page).toHaveTitle(/Vacuum Lifter Indonesia|Dimensi Quantum Wahyudi/i);
  await expect(page.getByRole('link', { name: /contact/i }).first()).toBeVisible();
});

test('contact page renders mandatory form fields', async ({ page }) => {
  await page.goto('/contact');
  await expect(page.getByLabel(/Person in Charge Name/i)).toBeVisible();
  await expect(page.getByLabel(/Corporate Email/i)).toBeVisible();
  await expect(page.getByLabel(/Project Specification/i)).toBeVisible();
});

test('products page exposes product catalog sections', async ({ page }) => {
  await page.goto('/products');
  await expect(page.getByRole('heading', { name: /LIFTING SOLUTIONS/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /View Product Catalog/i }).first()).toBeVisible();
});
