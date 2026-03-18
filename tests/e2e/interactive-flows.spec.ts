import { expect, test, type Page } from '@playwright/test';

async function setRangeValue(page: Page, index: number, value: number) {
  const slider = page.locator('input[type="range"]').nth(index);
  await slider.evaluate((el: HTMLElement, nextValue: number) => {
    const input = el as HTMLInputElement;
    const nativeSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
    nativeSetter?.call(input, String(nextValue));
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }, value);
}

async function fillValidContactForm(page: Page) {
  await page.getByLabel(/Person in Charge Name/i).fill('QA Automation');
  await page.getByLabel(/Corporate Email/i).fill('qa@dimensiwahyudi.com');
  await page
    .getByLabel(/Project Specification/i)
    .fill('Need ergonomic lifting solution for 35kg box with 120 lifts per hour on two shifts.');
}

test('video library filter narrows and resets results', async ({ page }) => {
  await page.goto('/digital-assistant/video-library');

  await expect(page.getByText('21 / 21 videos')).toBeVisible();

  await page.getByRole('button', { name: 'Chemical & Pharmaceutical' }).click();
  await expect(page.getByText('3 / 21 videos')).toBeVisible();
  await expect(page.getByText('PalVac Sprint Hygienic Vacuum Tube Lifter: Precision Handling')).toBeVisible();
  await expect(page.getByText('JumboErgo Simplifies Loading of a CNC Woodworking Machine')).toHaveCount(0);

  await page.getByRole('button', { name: 'All' }).click();
  await expect(page.getByText('21 / 21 videos')).toBeVisible();
  await expect(page.getByText('JumboErgo Simplifies Loading of a CNC Woodworking Machine')).toBeVisible();
});

test('video library supports source badge, search, and sort controls', async ({ page }) => {
  await page.goto('/digital-assistant/video-library');

  await page.getByPlaceholder(/Search use-case, product, industry, or source/i).fill('quick-lift driven 300i');
  await expect(page.getByText('1 / 21 videos')).toBeVisible();
  await expect(page.getByText('Quick-Lift Driven 300i')).toBeVisible();
  await expect(page.locator('section.max-w-6xl span').filter({ hasText: 'Binar' }).first()).toBeVisible();

  await page.getByPlaceholder(/Search use-case, product, industry, or source/i).fill('battery module');
  await expect(page.getByText('1 / 21 videos')).toBeVisible();
  await expect(page.getByText('Battery Module Gripper in Action: Safe Handling for Battery Pack Assembly')).toBeVisible();
  await expect(page.locator('section.max-w-6xl span').filter({ hasText: 'Schmalz' }).first()).toBeVisible();

  await page.getByPlaceholder(/Search use-case, product, industry, or source/i).fill('');
  await page.locator('select').selectOption('title');
  await expect(page.locator('select')).toHaveValue('title');
  await expect(page.getByText('21 / 21 videos')).toBeVisible();
});

test('roi calculator updates workload and safety status', async ({ page }) => {
  await page.goto('/digital-assistant/roi-calculator');

  await expect(page.getByRole('heading', { name: /ROI & Ergonomic Workload Calculator/i })).toBeVisible();
  await expect(page.getByText(/WARNING: ERGONOMIC OVERLOAD/i)).toBeVisible();
  await expect(page.getByText(/40.00/)).toBeVisible();

  await setRangeValue(page, 0, 10);
  await setRangeValue(page, 1, 10);
  await page.locator('input[type="number"]').fill('1');
  await expect(page.getByText(/10\s*kg/i)).toBeVisible();

  await expect(page.getByText(/STATUS: SAFE/i)).toBeVisible();
  await expect(page.getByText(/0.10/)).toBeVisible();
  await expect(page.getByText(/Fastest Solution: SCHMALZ JumboFlex/i)).toBeVisible();
});

test('contact form shows validation errors on invalid submit', async ({ page }) => {
  await page.goto('/contact');

  await page.getByRole('button', { name: /Get Price Quotation/i }).click();

  await expect(page.getByText('Name must be at least 2 characters')).toBeVisible();
  await expect(page.getByText('Invalid email format')).toBeVisible();
  await expect(page.getByText('Description must be at least 20 characters')).toBeVisible();
});

test('contact form submit success flow', async ({ page }) => {
  await page.route('https://formspree.io/f/**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ ok: true }),
    });
  });

  await page.goto('/contact');
  await fillValidContactForm(page);
  await page.getByRole('button', { name: /Get Price Quotation/i }).click();

  await expect(page.getByText(/Request Received!/i)).toBeVisible();
  await expect(page.getByRole('link', { name: /Continue via WhatsApp/i })).toBeVisible();
});

test('contact form submit error state for upstream failure', async ({ page }) => {
  await page.route('https://formspree.io/f/**', async (route) => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'upstream failed' }),
    });
  });

  await page.goto('/contact');
  await fillValidContactForm(page);
  await page.getByRole('button', { name: /Get Price Quotation/i }).click();

  await expect(page.getByText(/Failed to send message/i)).toBeVisible();
  await expect(page.getByRole('button', { name: /Try again/i })).toBeVisible();
});
