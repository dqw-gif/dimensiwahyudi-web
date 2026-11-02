const crypto = require('crypto');
const fs = require('fs');

async function run() {
  const token = crypto
    .createHash('sha256')
    .update('241353:dwq-secret-admin-session-salt-2026')
    .digest('hex');

  console.log('Sending request to /api/admin/ai/article...');
  const res = await fetch('http://localhost:3000/api/admin/ai/article', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `dwq_admin_token=${token}`,
    },
    body: JSON.stringify({
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
      additionalNotes: 'Tekankan komparasi data nyata dan kepatuhan standar K3.',
    }),
  });

  console.log('Response status:', res.status);
  const data = await res.json();
  if (!res.ok) {
    console.error('API Error:', data);
    process.exit(1);
  }

  const article = data.article;
  console.log('\n--- SUCCESSFUL GENERATION ---');
  console.log('Title:', article.title);
  console.log('Meta Description:', article.metaDescription);
  console.log('Tags:', article.tags);
  console.log('Image Prompts Count:', article.imagePrompts?.length);
  article.imagePrompts?.forEach((p, idx) => {
    console.log(`\n[Gambar ${idx + 1}] ID: ${p.id} | Label: ${p.label}`);
    console.log(`Placement: ${p.placement}`);
    console.log(`Prompt: ${p.prompt.slice(0, 120)}...`);
    console.log(`Concept: ${p.concept}`);
  });

  console.log('\n--- CONTENT INSPECTION ---');
  console.log('Has Key Takeaways (Ringkasan Eksekutif):', article.content.includes('Ringkasan Eksekutif'));
  console.log('Has TOC (Daftar Isi):', article.content.includes('Daftar Isi'));
  console.log('Has Comparison Table:', article.content.includes('<table') || article.content.includes('border-collapse'));
  console.log('Has Internal Link (/news/):', article.content.includes('/news/'));
  console.log('Has Em-Dash (—):', article.content.includes('—'));

  // Save full article JSON to artifacts
  fs.writeFileSync(
    'C:/Users/Acuel/.gemini/antigravity/brain/b0f63d77-552b-4ac7-b0fa-424acb71d9bd/sample_generated_article.json',
    JSON.stringify(article, null, 2),
    'utf8'
  );
  console.log('\nFull JSON written to sample_generated_article.json');
}

run().catch(console.error);
