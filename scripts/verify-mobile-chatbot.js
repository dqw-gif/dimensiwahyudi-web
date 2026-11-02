const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });

  // 1. Mobile Viewport (iPhone 14 / modern Android: 390x844)
  console.log('1. Testing Mobile Viewport (390x844)...');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:3000/news/atasi-resiko-karung-koyak-dan-cedera-operator');
  // Wait for 3 seconds so the 2-second teaser timer would have fired if it were active
  await mobilePage.waitForTimeout(3000);

  const mobileScreenshot =
    'C:/Users/Acuel/.gemini/antigravity/brain/b0f63d77-552b-4ac7-b0fa-424acb71d9bd/mobile_view_no_intrusive_bubble.png';
  await mobilePage.screenshot({ path: mobileScreenshot, fullPage: false });
  console.log('Mobile screenshot saved to:', mobileScreenshot);

  // Test opening chat in mobile
  const fabBtn = mobilePage.locator('button[aria-label="Toggle Virtual Assistant"]');
  await fabBtn.click();
  await mobilePage.waitForTimeout(500);

  const mobileModalScreenshot =
    'C:/Users/Acuel/.gemini/antigravity/brain/b0f63d77-552b-4ac7-b0fa-424acb71d9bd/mobile_chat_modal_opened.png';
  await mobilePage.screenshot({ path: mobileModalScreenshot, fullPage: false });
  console.log('Mobile modal screenshot saved to:', mobileModalScreenshot);

  // 2. Desktop Viewport (1440x900)
  console.log('2. Testing Desktop Viewport (1440x900)...');
  const desktopContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto('http://localhost:3000/news/atasi-resiko-karung-koyak-dan-cedera-operator');
  await desktopPage.waitForTimeout(3000);

  const desktopScreenshot =
    'C:/Users/Acuel/.gemini/antigravity/brain/b0f63d77-552b-4ac7-b0fa-424acb71d9bd/desktop_view_with_clean_bubble.png';
  await desktopPage.screenshot({ path: desktopScreenshot, fullPage: false });
  console.log('Desktop screenshot saved to:', desktopScreenshot);

  await browser.close();
  console.log('Finished testing!');
})().catch(console.error);
