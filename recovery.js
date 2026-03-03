const fs = require('fs');
const pathStr = 'c:/Users/Acuel/dimensiwahyudi-web/app/our-projects/page.tsx';
let content = fs.readFileSync(pathStr, 'utf8');

function getCategory(id) {
    if (id.startsWith('fmcg-')) return 'FMCG & F&B';
    if (id === 'auto-robotic') return 'Industri Berat & Otomasi';
    if (id.startsWith('auto-')) return 'Otomotif & Kendaraan';
    // kimia-nikka, kimia-cabot, kimia-mowilex -> Kimia & Farmasi
    // kimia-hempel -> Bahan Bangunan
    if (id === 'kimia-hempel') return 'Bahan Bangunan & Infrastruktur';
    if (id.startsWith('kimia-')) return 'Kimia & Farmasi';
    if (id.startsWith('farmasi-')) return 'Kimia & Farmasi';
    if (id.startsWith('agrikultur-')) return 'Kimia & Farmasi';
    if (id.startsWith('konstruksi-')) return 'Bahan Bangunan & Infrastruktur';
    if (id.startsWith('kaca-')) return 'Kaca & Material Solid';
    if (id.startsWith('karet-')) return 'Kaca & Material Solid';
    if (id.startsWith('packaging-')) return 'Kemasan & Plastik';
    if (id === 'manufaktur-inoac') return 'Kemasan & Plastik';
    if (id.startsWith('kayu-')) return 'Furnitur & Interior';
    if (id.startsWith('pipa-')) return 'Industri Berat & Otomasi';
    if (id.startsWith('aviasi-')) return 'Logistik Udara';
    if (id.startsWith('elektronik-')) return 'Elektronik';
    return 'Lainnya'; // Fallback
}

// Replace empty industries
const regStr = /(id:\s*'([^']+)',\s*client:\s*'[^']+',\s*industry:\s*)''/g;
let replacedCount = 0;
content = content.replace(regStr, (match, prefix, id) => {
    replacedCount++;
    const cat = getCategory(id);
    return `${prefix}'${cat}'`;
});

fs.writeFileSync(pathStr, content, 'utf8');
console.log(`Recovery completed! Replaced ${replacedCount} empty industries.`);
