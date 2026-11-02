const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'app', 'admin', 'editor', 'EditorClient.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const oldStr = `status === 'published'
              ? 'Article published successfully and is live.'
              : 'Article draft saved successfully.'`;

const newStr = `status === 'published'
              ? 'Artikel berhasil diterbitkan dan live! Notifikasi push index (Google Sitemap & IndexNow) otomatis dikirimkan ke mesin pencari.'
              : 'Draft artikel berhasil disimpan.'`;

const normOld = oldStr.replace(/\r\n/g, '\n');
const normContent = content.replace(/\r\n/g, '\n');

if (normContent.includes(normOld)) {
  fs.writeFileSync(filePath, normContent.replace(normOld, newStr), 'utf8');
  console.log('SUCCESS');
} else {
  console.log('NOT_FOUND');
}
