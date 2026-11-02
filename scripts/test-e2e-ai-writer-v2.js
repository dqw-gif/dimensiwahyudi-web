const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', (err) => console.error('PAGE ERROR:', err));

  console.log('1. Navigating to login...');
  await page.goto('http://localhost:3000/admin/login');

  // Fill PIN
  await page.fill('input[type="password"]', '241353');
  await page.click('button[type="submit"]');
  await page.waitForURL('**/admin');
  console.log('2. Logged in successfully to admin dashboard!');

  await page.waitForTimeout(1000);

  // Click "+ Tulis Artikel" button
  console.log('3. Opening write article dropdown...');
  await page.click('button:has-text("Tulis Artikel")');
  await page.waitForTimeout(500);

  // Click "Tulis dengan AI"
  console.log('4. Selecting AI Copilot...');
  await page.click('button:has-text("Tulis dengan AI")');
  await page.waitForTimeout(1000);

  // Take screenshot of Step 1 modal
  await page.screenshot({
    path: 'C:/Users/Acuel/.gemini/antigravity/brain/b0f63d77-552b-4ac7-b0fa-424acb71d9bd/debug_step1_modal.png',
  });

  // Check if topic input already has default text or if we need to click "Riset Topik Tren Google"
  const magicWandBtn = page.locator('button:has-text("Riset Topik Tren Google")');
  const count = await magicWandBtn.count();
  console.log('5. Magic wand button count:', count);

  if (count > 0) {
    console.log('5b. Clicking Magic Wand...');
    await magicWandBtn.click();
    console.log('5c. Waiting for network or response...');
    const response = await page.waitForResponse(
      (resp) => resp.url().includes('/api/admin/ai/trending-topics'),
      { timeout: 30000 }
    ).catch(e => console.log('Response wait error:', e.message));

    if (response) {
      console.log('5d. Response status:', response.status());
      const text = await response.text();
      console.log('5e. Response body:', text.slice(0, 300));
    }
  }

  await page.waitForTimeout(3000);
  await page.screenshot({
    path: 'C:/Users/Acuel/.gemini/antigravity/brain/b0f63d77-552b-4ac7-b0fa-424acb71d9bd/debug_step1_after_wand.png',
  });

  await browser.close();
})().catch((err) => {
  console.error('Debug script failed:', err);
  process.exit(1);
});
