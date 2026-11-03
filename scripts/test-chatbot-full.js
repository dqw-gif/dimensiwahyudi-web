const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const ARTIFACTS_DIR = 'C:/Users/Acuel/.gemini/antigravity/brain/b0f63d77-552b-4ac7-b0fa-424acb71d9bd';

async function runTest() {
  console.log('🚀 Starting Chatbot & Contact Form E2E Test...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  // 1. Check Contact Page
  console.log('1️⃣ Checking Contact Page...');
  await page.goto('http://localhost:3000/contact', { waitUntil: 'networkidle' });
  
  // Accept cookies if present
  const acceptCookie = await page.$('button:has-text("Accept")');
  if (acceptCookie) {
    console.log('Dismissing cookie banner...');
    await acceptCookie.click();
    await page.waitForTimeout(400);
  }

  await page.evaluate(() => window.scrollTo(0, 500));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'e2e_contact_form.png') });
  console.log('Saved e2e_contact_form.png');

  // 2. Open Chatbot Widget
  console.log('2️⃣ Opening Chatbot Widget...');
  const chatFab = await page.$('button[aria-label="Toggle Virtual Assistant"]');
  if (chatFab) {
    await chatFab.click({ force: true });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'e2e_chatbot_gate.png') });
    console.log('Saved e2e_chatbot_gate.png (Lead Gate Form)');

    // Fill the Lead Gate Form
    console.log('3️⃣ Submitting Lead Gate Form...');
    await page.fill('input[placeholder="Contoh: Budi Santoso"]', 'Ir. Hendra Wijaya');
    await page.fill('input[placeholder="Contoh: PT Manufaktur Nusantara"]', 'PT Indocement Tunggal Perkasa');
    await page.fill('input[placeholder="Contoh: 081234567890"]', '081299887766');
    await page.fill('input[placeholder="email@nama-perusahaan.com"]', 'hendra@indocement.co.id');
    
    // Click Start Chat button inside chatbot window
    const startBtn = await page.$('button:has-text("Mulai Konsultasi Teknis")');
    if (startBtn) {
      await startBtn.click();
      console.log('Waiting for session creation...');
      await page.waitForTimeout(3000);
      await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'e2e_chatbot_active_session.png') });
      console.log('Saved e2e_chatbot_active_session.png');

      // Send technical question
      console.log('4️⃣ Sending technical question to AI...');
      const chatInput = await page.$('input[placeholder*="Tulis pertanyaan teknis"]');
      if (chatInput) {
        await chatInput.fill('Bagaimana solusi vacuum lifter untuk angkat sak semen 50kg sesuai Permenaker K3?');
        const sendBtn = await page.$('button[aria-label="Kirim pesan"]');
        if (sendBtn) {
          await sendBtn.click();
          console.log('Waiting for AI response from Gemini...');
          await page.waitForTimeout(10000);
          await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'e2e_chatbot_ai_reply.png') });
          console.log('Saved e2e_chatbot_ai_reply.png');
        }

        // Test commercial guardrail question
        console.log('4b️⃣ Asking commercial price question to test guardrail...');
        await page.fill('input[placeholder*="Tulis pertanyaan teknis"]', 'Berapa harga unitnya dan apa bisa kirim penawaran PO diskon?');
        const sendBtn2 = await page.$('button[aria-label="Kirim pesan"]');
        if (sendBtn2) {
          await sendBtn2.click();
          console.log('Waiting for commercial guardrail reply...');
          await page.waitForTimeout(10000);
          await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'e2e_chatbot_commercial_guardrail.png') });
          console.log('Saved e2e_chatbot_commercial_guardrail.png');
        }
      }
    }
  } else {
    console.log('Chat FAB button not found!');
  }

  // 5. Check Admin Leads
  console.log('5️⃣ Checking Admin Dashboard Leads & Transcript...');
  await page.goto('http://localhost:3000/admin/leads', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  // If redirected to login, login first
  const pinInput = await page.$('input[type="password"]');
  if (pinInput) {
    console.log('Logging in to Admin with PIN...');
    await pinInput.fill('241353');
    await page.click('button[type="submit"]');
    await page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {});
    await page.waitForTimeout(2000);
  }

  // Accept cookies if present on admin
  const adminCookie = await page.$('button:has-text("Accept")');
  if (adminCookie) {
    await adminCookie.click();
    await page.waitForTimeout(300);
  }

  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'e2e_admin_leads_list.png') });
  console.log('Saved e2e_admin_leads_list.png');

  // Look for "Lihat Chat" button
  const chatTranscriptBtn = await page.$('text=Lihat Chat');
  if (chatTranscriptBtn) {
    console.log('Found transcript button! Clicking it...');
    await chatTranscriptBtn.click({ force: true });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'e2e_admin_transcript_modal.png') });
    console.log('Saved e2e_admin_transcript_modal.png');
  } else {
    console.log('No transcript button found yet.');
  }

  await browser.close();
  console.log('🎉 E2E Test Finished Successfully!');
}

runTest().catch((err) => {
  console.error('Error during E2E test:', err);
  process.exit(1);
});
