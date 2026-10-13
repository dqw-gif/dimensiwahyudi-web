import fs from 'fs';
import path from 'path';

const files = [
  {
    name: 'area-gripping.pdf',
    id: '1mES1BWGp4H_SuyyIlct3h2zk1J4PUi5k',
  },
  {
    name: 'product-overview.pdf',
    id: '15aVjL02BZ-iSJskQJ18NI1m5SVKKF-Qz',
  },
  {
    name: 'vacuum-automation.pdf',
    id: '1t6vUksBjfLgqh04NBOtD0fXHlYHVH4Ap',
  },
  {
    name: 'ergonomic-vacuum-lifters.pdf',
    id: '1UZjvCkxWEIzFzXUK7KVnVTMK92uDJ5Ur',
  }
];

const destDir = path.resolve('public/brochures');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

async function downloadDriveFile(id, filename) {
  const targetPath = path.join(destDir, filename);
  console.log(`Downloading ${filename} (ID: ${id})...`);
  
  // Try direct usercontent download first
  const urls = [
    `https://drive.usercontent.google.com/download?id=${id}&export=download&confirm=t`,
    `https://drive.google.com/uc?export=download&id=${id}&confirm=t`
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });
      
      if (res.ok) {
        const buffer = Buffer.from(await res.arrayBuffer());
        // verify it's a PDF (magic number %PDF)
        if (buffer.slice(0, 4).toString() === '%PDF') {
          fs.writeFileSync(targetPath, buffer);
          console.log(`✓ Successfully downloaded ${filename} (${(buffer.length / 1024 / 1024).toFixed(2)} MB)`);
          return true;
        } else {
          console.log(`Response is not a PDF (length: ${buffer.length}), trying fallback url...`);
        }
      }
    } catch (e) {
      console.error(`Error with ${url}:`, e.message);
    }
  }

  console.error(`✕ Failed to download ${filename}`);
  return false;
}

async function main() {
  for (const file of files) {
    await downloadDriveFile(file.id, file.name);
  }
}

main();
