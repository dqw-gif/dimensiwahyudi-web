const { chromium } = require('playwright');
const path = require('path');

const ARTIFACTS_DIR = 'C:/Users/Acuel/.gemini/antigravity/brain/b0f63d77-552b-4ac7-b0fa-424acb71d9bd';

async function testAdmin() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  await page.goto('http://localhost:3000/admin', { waitUntil: 'networkidle' });

  // Login if needed
  const pinInput = await page.$('input[type="password"]');
  if (pinInput) {
    console.log('Logging in with PIN...');
    await pinInput.fill('241353');
    await page.click('button[type="submit"]');
    await page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {});
    await page.waitForTimeout(1500);
  }

  // Dismiss cookie banner
  const cookieBtn = await page.$('button:has-text("Accept")');
  if (cookieBtn) {
    await cookieBtn.click();
    await page.waitForTimeout(300);
  }

  // Click "Inbox Leads"
  console.log('Clicking Inbox Leads tab...');
  const leadsTab = await page.$('button:has-text("Inbox Leads")');
  if (leadsTab) {
    await leadsTab.click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'admin_leads_tab_view.png') });
    console.log('Saved admin_leads_tab_view.png');

    // Click "Lihat Chat"
    const chatBtn = await page.$('button:has-text("Lihat Chat")');
    if (chatBtn) {
      console.log('Found Lihat Chat button! Opening transcript modal...');
      await chatBtn.click();
      await page.waitForTimeout(800);
      await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'admin_chat_transcript_modal.png') });
      console.log('Saved admin_chat_transcript_modal.png');
    } else {
      console.log('Lihat Chat button not found in leads.');
    }
  }

  await browser.close();
  console.log('Admin verification complete!');
}

testAdmin().catch(console.error);
