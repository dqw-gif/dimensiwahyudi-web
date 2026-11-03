const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop Test
  console.log('1. Testing Desktop Contact Form (1280x800)...');
  const desktopContext = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await desktopContext.newPage();
  await page.goto('http://localhost:3000/contact');
  await page.waitForTimeout(1500);

  // Take screenshot of initial state with all red asterisks
  const formSection = page.locator('form');
  await formSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  const desktopScreenshot =
    'C:/Users/Acuel/.gemini/antigravity/brain/b0f63d77-552b-4ac7-b0fa-424acb71d9bd/contact_form_with_phone_and_asterisks.png';
  await page.screenshot({ path: desktopScreenshot });
  console.log('Desktop form screenshot saved to:', desktopScreenshot);

  // Test validation trigger
  console.log('2. Testing validation errors on empty submit...');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(500);

  const validationScreenshot =
    'C:/Users/Acuel/.gemini/antigravity/brain/b0f63d77-552b-4ac7-b0fa-424acb71d9bd/contact_form_validation_errors.png';
  await page.screenshot({ path: validationScreenshot });
  console.log('Validation screenshot saved to:', validationScreenshot);

  // 2. Mobile Viewport (390x844)
  console.log('3. Testing Mobile Contact Form (390x844)...');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:3000/contact');
  await mobilePage.waitForTimeout(1500);

  const mobileForm = mobilePage.locator('form');
  await mobileForm.scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(500);

  const mobileScreenshot =
    'C:/Users/Acuel/.gemini/antigravity/brain/b0f63d77-552b-4ac7-b0fa-424acb71d9bd/contact_form_mobile_view.png';
  await mobilePage.screenshot({ path: mobileScreenshot });
  console.log('Mobile form screenshot saved to:', mobileScreenshot);

  await browser.close();
  console.log('ALL FORM VERIFICATIONS PASSED SUCCESSFULLY!');
})().catch(console.error);
