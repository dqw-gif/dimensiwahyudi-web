import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const TARGET_DIR = path.join(process.cwd(), 'public');
const SEARCH_DIRS = ['app', 'components', 'data'];

async function main() {
  console.log('Loading dependencies...');
  try {
    await import('sharp');
  } catch (e) {
    console.log('sharp not found. Installing temporarily...');
    execSync('npm install --no-save sharp', { stdio: 'inherit' });
  }
  const sharp = (await import('sharp')).default;

  console.log('Scanning for images in /public...');
  
  function getFiles(dir, filesList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const p = path.join(dir, file);
      if (fs.statSync(p).isDirectory()) {
        getFiles(p, filesList);
      } else {
        if (/\.(png|jpe?g)$/i.test(p)) {
          filesList.push(p);
        }
      }
    }
    return filesList;
  }

  const images = getFiles(TARGET_DIR);
  console.log(`Found ${images.length} images to convert.`);

  let totalSaved = 0;
  const changedPaths = [];

  for (const imgPath of images) {
    const parsed = path.parse(imgPath);
    const webpPath = path.join(parsed.dir, `${parsed.name}.webp`);
    
    // Original relative path from public (e.g. /industries/FOOD.jpg)
    const relUrlOld = imgPath.replace(TARGET_DIR, '').replace(/\\/g, '/');
    const relUrlNew = webpPath.replace(TARGET_DIR, '').replace(/\\/g, '/');
    
    const oldSize = fs.statSync(imgPath).size;

    console.log(`Converting: ${relUrlOld} -> .webp`);
    await sharp(imgPath)
      .webp({ quality: 80 })
      .toFile(webpPath);
      
    const newSize = fs.statSync(webpPath).size;
    const saved = oldSize - newSize;
    if (saved > 0) totalSaved += saved;

    // Delete original
    fs.unlinkSync(imgPath);
    changedPaths.push({ old: relUrlOld, new: relUrlNew });
  }

  console.log(`\nImages converted! Total space saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
  
  // Update References in codebase
  console.log(`\nUpdating references in codebase...`);
  
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

  for (const file of codeFiles) {
    let content = fs.readFileSync(file, 'utf-8');
    let hasChanges = false;
    
    for (const change of changedPaths) {
      // Need to be careful. The URLs could be written as '/industries/file.jpg'
      // Or 'industries/file.jpg'
      const searchString = change.old;
      if (content.includes(searchString)) {
        // use split join to replace all occurrences literally
        content = content.split(searchString).join(change.new);
        hasChanges = true;
      }
    }

    if (hasChanges) {
      fs.writeFileSync(file, content, 'utf-8');
      console.log(`Updated references in: ${file.replace(process.cwd(), '')}`);
    }
  }

  console.log('\nOptimization Complete! All JPG/PNG assets are now WebP.');
}

main().catch(console.error);
