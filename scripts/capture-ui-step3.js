const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const sampleArticle = JSON.parse(
    fs.readFileSync(
      'C:/Users/Acuel/.gemini/antigravity/brain/b0f63d77-552b-4ac7-b0fa-424acb71d9bd/sample_generated_article.json',
      'utf8'
    )
  );

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 950 } });
  const page = await context.newPage();

  console.log('1. Navigating to login...');
  await page.goto('http://localhost:3000/admin/login');
  await page.fill('input[type="password"]', '241353');
  await page.click('button[type="submit"]');
  await page.waitForURL('**/admin');
  console.log('2. Logged in successfully!');

  await page.waitForTimeout(1000);

  // Inject article into AdminDashboard state or trigger modal directly
  // Click "+ Tulis Artikel" -> "Tulis dengan AI"
  await page.click('button:has-text("Tulis Artikel")');
  await page.waitForTimeout(400);
  await page.click('button:has-text("Tulis dengan AI")');
  await page.waitForTimeout(600);

  // Directly set Step 3 state via evaluating on window or component
  await page.evaluate((article) => {
    // Dispatch custom event or set session storage for editor test
    window.sessionStorage.setItem(
      'dqw_ai_article_draft',
      JSON.stringify({
        title: article.title,
        slug: article.slug,
        category: article.category || 'Ergonomics',
        excerpt: article.metaDescription,
        content: article.content,
      })
    );
  }, sampleArticle);

  // Let's test the UI by simulating the state in the modal
  // We can fill Step 1, click next, and mock the /api/admin/ai/article response with this sampleArticle!
  await page.route('**/api/admin/ai/article', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, article: sampleArticle }),
    });
  });

  await page.route('**/api/admin/ai/outline', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        outline: {
          title: sampleArticle.title,
          slug: sampleArticle.slug,
          category: 'Ergonomics',
          targetAudience: 'Plant Manager & HSE',
          sections: [
            { heading: 'Batas Beban Angkat Manual', level: 'h2', keyPoints: ['Regulasi K3', 'Risiko tulang belakang'] },
            { heading: 'Analisis Risiko Kemasan Sak Robek', level: 'h2', keyPoints: ['Kail besi', 'Tumpahan material'] },
            { heading: 'Solusi Vakum Lifter Schmalz JumboErgo', level: 'h2', keyPoints: ['Twist grip', 'Bantalan hisap'] },
          ],
        },
      }),
    });
  });

  // Fill Step 1 topic
  await page.fill('input[placeholder*="Contoh: Solusi Mengangkat"]', sampleArticle.title);
  await page.click('button:has-text("Lanjut: Susun Kerangka AI")');
  await page.waitForTimeout(600);

  // In Step 2, click "Tulis Draft Lengkap dengan AI"
  await page.click('button:has-text("Tulis Draft Lengkap dengan AI")');
  await page.waitForTimeout(1000);

  // Now we are in Step 3!
  console.log('3. In Step 3 with full AI Draft!');

  // Take screenshot of Step 3 showing Gambar 1
  const screenshot1 =
    'C:/Users/Acuel/.gemini/antigravity/brain/b0f63d77-552b-4ac7-b0fa-424acb71d9bd/admin_ai_step3_tab1_cover.png';
  await page.screenshot({ path: screenshot1, fullPage: true });
  console.log('Saved Tab 1 screenshot:', screenshot1);

  // Click Tab "Gambar 2"
  await page.click('button:has-text("Gambar 2")');
  await page.waitForTimeout(400);

  // Copy Prompt 2
  await page.click('button:has-text("Salin Prompt 2")');
  await page.waitForTimeout(400);

  const screenshot2 =
    'C:/Users/Acuel/.gemini/antigravity/brain/b0f63d77-552b-4ac7-b0fa-424acb71d9bd/admin_ai_step3_tab2_detail.png';
  await page.screenshot({ path: screenshot2, fullPage: true });
  console.log('Saved Tab 2 screenshot with copied state:', screenshot2);

  // Click Tab "Gambar 3"
  await page.click('button:has-text("Gambar 3")');
  await page.waitForTimeout(400);

  const screenshot3 =
    'C:/Users/Acuel/.gemini/antigravity/brain/b0f63d77-552b-4ac7-b0fa-424acb71d9bd/admin_ai_step3_tab3_crane.png';
  await page.screenshot({ path: screenshot3, fullPage: true });
  console.log('Saved Tab 3 screenshot:', screenshot3);

  // Click "Buka di Editor Artikel & Siapkan Publikasi"
  await page.click('button:has-text("Buka di Editor Artikel & Siapkan Publikasi")');
  await page.waitForURL('**/admin/editor');
  await page.waitForTimeout(1500);

  const screenshotEditor =
    'C:/Users/Acuel/.gemini/antigravity/brain/b0f63d77-552b-4ac7-b0fa-424acb71d9bd/admin_editor_with_toc_and_table.png';
  await page.screenshot({ path: screenshotEditor, fullPage: true });
  console.log('Saved Editor screenshot:', screenshotEditor);

  await browser.close();
  console.log('ALL SCREENSHOTS CAPTURED SUCCESSFULLY!');
})().catch(console.error);
