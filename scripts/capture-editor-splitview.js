const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1100 } });
  const page = await context.newPage();

  console.log('Navigating to editor...');
  await page.goto('http://localhost:3000/admin/login');
  await page.fill('input[type="password"]', '241353');
  await page.click('button[type="submit"]');
  await page.waitForURL('**/admin');

  // Go to editor where session storage was populated
  await page.goto('http://localhost:3000/admin/editor');
  await page.waitForTimeout(1500);

  // Click "Full Preview" or "Split-View"
  const splitBtn = page.locator('button:has-text("Split-View")');
  if ((await splitBtn.count()) > 0) {
    await splitBtn.click();
    await page.waitForTimeout(800);
  }

  const screenshot =
    'C:/Users/Acuel/.gemini/antigravity/brain/b0f63d77-552b-4ac7-b0fa-424acb71d9bd/editor_split_view_preview.png';
  await page.screenshot({ path: screenshot, fullPage: true });
  console.log('Saved split-view screenshot:', screenshot);

  await browser.close();
})().catch(console.error);
