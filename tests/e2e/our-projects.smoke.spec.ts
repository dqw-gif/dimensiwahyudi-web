import { expect, test } from '@playwright/test';

test('our-projects page renders gallery and project links', async ({ page }) => {
  await page.goto('/our-projects', { waitUntil: 'domcontentloaded' });

  await expect(page).toHaveURL(/\/our-projects$/i);
  await expect(
    page.getByRole('heading', {
      name: /world-class material handling/i,
    }).first()
  ).toBeVisible();
  await expect(page.getByRole('link', { name: /discuss your requirements/i })).toBeVisible();

  const projectLinks = page.locator('a[href^="/our-projects/"]');
  await expect(projectLinks.first()).toBeVisible();
  const linkCount = await projectLinks.count();
  expect(linkCount).toBeGreaterThan(0);
});
