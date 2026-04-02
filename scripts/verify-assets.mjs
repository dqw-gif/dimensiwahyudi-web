import fs from 'fs';
import path from 'path';

const SEARCH_DIRS = ['app', 'components', 'data'];
const PUBLIC_DIR = path.join(process.cwd(), 'public');

function getSourceFiles(dir, filesList = []) {
  if (!fs.existsSync(dir)) return filesList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const p = path.join(dir, file);
    if (fs.statSync(p).isDirectory()) {
      getSourceFiles(p, filesList);
    } else {
      if (/\.(ts|tsx|js|jsx)$/i.test(p)) {
        filesList.push(p);
      }
    }
  }
  return filesList;
}

let codeFiles = [];
for (const dir of SEARCH_DIRS) {
  codeFiles = getSourceFiles(path.join(process.cwd(), dir), codeFiles);
}

const urlRegex = /['"`](\/[^'"`]+\.(webp|png|jpg|jpeg|svg|mp4|avif))['"`]/gi;
let totalLocalAssetsFound = 0;
let brokenAssets = [];

for (const file of codeFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  let match;
  while ((match = urlRegex.exec(content)) !== null) {
    let relPath = match[1];
    
    // Some might contain query params like ?size=l, though rare for local public assets
    if (relPath.includes('?')) {
        relPath = relPath.split('?')[0];
    }
    
    // Decode URI component because Next.js URLs might be encoded
    const decodedPath = decodeURIComponent(relPath);
    const absPath = path.join(PUBLIC_DIR, decodedPath);
    
    totalLocalAssetsFound++;
    
    if (!fs.existsSync(absPath)) {
      brokenAssets.push({
        file: file.replace(process.cwd(), ''),
        brokenLink: relPath,
        resolvedPath: absPath
      });
    }
  }
}

console.log(`Scanned ${codeFiles.length} source files.`);
console.log(`Found ${totalLocalAssetsFound} local asset references.\n`);

if (brokenAssets.length > 0) {
  console.log(`🛑 FOUND ${brokenAssets.length} BROKEN LINKS:`);
  brokenAssets.forEach((err, i) => {
    console.log(`\n${i+1}. In File: ${err.file}`);
    console.log(`   Broken Path: ${err.brokenLink}`);
  });
  process.exit(1);
} else {
  console.log(`✅ PERFECT! Zero broken local images/assets found in source code.`);
  process.exit(0);
}
