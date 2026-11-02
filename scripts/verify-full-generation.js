const fs = require('fs');
const path = require('path');

// Read .env.local manually
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const idx = trimmed.indexOf('=');
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim();
      process.env[key] = val;
    }
  }
}

async function main() {
  const { generateFullArticle } = await import('../lib/ai/gemini-service.js');

  console.log('Generating test article with new prompts & multi-images...');
  const result = await generateFullArticle({
    outline: {
      title: 'Solusi Penanganan Sak Semen 50 kg di Lini Paletisasi Industri Bahan Bangunan',
      slug: 'solusi-penanganan-sak-semen-50kg-lini-paletisasi',
      category: 'Ergonomics',
      targetAudience: 'Plant Manager & Tim HSE Pabrik Semen',
      sections: [
        {
          heading: 'Batas Beban Angkat Manual Menurut Permenaker No. 5/2018',
          level: 'h2',
          keyPoints: [
            'Batas aman angkat manual pekerja Indonesia',
            'Risiko cedera tulang belakang (L4-L5)',
          ],
        },
        {
          heading: 'Analisis Risiko Kemasan Sak Robek dan Kerugian Material',
          level: 'h2',
          keyPoints: [
            'Penggunaan kail besi konvensional merusak sak',
            'Tumpahan debu semen di area lantai produksi',
          ],
        },
        {
          heading: 'Solusi Vakum Lifter Schmalz JumboErgo untuk Sak 50 kg',
          level: 'h2',
          keyPoints: [
            'Handle twist grip ergonomis',
            'Bantalan hisap khusus kantong berpori',
            'Sistem rel modular aluminium ringan',
          ],
        },
      ],
    },
    existingArticles: [
      {
        title: 'Atasi Resiko Karung Koyak dan Cedera Operator Palletizing',
        slug: 'atasi-resiko-karung-koyak-dan-cedera-operator',
        category: 'Ergonomics',
      },
      {
        title: 'Mengenal Prinsip Kerja Vacuum Tube Lifter untuk Industri',
        slug: 'mengenal-prinsip-kerja-vacuum-tube-lifter',
        category: 'Products',
      },
    ],
  });

  console.log('--- GENERATION RESULT ---');
  console.log('Title:', result.title);
  console.log('Slug:', result.slug);
  console.log('Image Prompts Count:', result.imagePrompts?.length);
  console.log('Image Prompts detail:');
  result.imagePrompts?.forEach((p, idx) => {
    console.log(`[${idx + 1}] ID: ${p.id} | Label: ${p.label}`);
    console.log(`     Placement: ${p.placement}`);
    console.log(`     Prompt: ${p.prompt.slice(0, 100)}...`);
    console.log(`     Concept: ${p.concept}`);
  });

  console.log('\n--- CONTENT INSPECTION ---');
  const hasKeyTakeaways = result.content.includes('Ringkasan Eksekutif');
  const hasTOC = result.content.includes('Daftar Isi');
  const hasTable = result.content.includes('<table') || result.content.includes('border-collapse');
  const hasInternalLink = result.content.includes('/news/');
  const hasEmDash = result.content.includes('—') || result.content.includes('--');

  console.log('Has Key Takeaways:', hasKeyTakeaways);
  console.log('Has TOC:', hasTOC);
  console.log('Has Data Table:', hasTable);
  console.log('Has Internal Link:', hasInternalLink);
  console.log('Has Em-Dash (Must be false):', hasEmDash);

  if (result.imagePrompts && result.imagePrompts.length >= 3 && hasTOC && hasTable && hasKeyTakeaways) {
    console.log('\n>>> ALL SPECIFICATIONS FULLY SATISFIED! <<<');
  } else {
    console.warn('\nSome specifications need verification.');
  }

  // Save sample output to an artifact file for viewing
  fs.writeFileSync(
    'C:/Users/Acuel/.gemini/antigravity/brain/b0f63d77-552b-4ac7-b0fa-424acb71d9bd/sample_generated_article.json',
    JSON.stringify(result, null, 2),
    'utf8'
  );
  console.log('Saved full result to sample_generated_article.json');
}

main().catch(console.error);
