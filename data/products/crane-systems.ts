// Sub-variants of Schmalz Crane Systems and Jib Cranes
// URL: /products/schmalz/crane-system/[variant]

export interface CraneVariant {
    slug: string;
    name: string;
    seriesCode: string;
    tagline: string;
    description: string;
    capacity: string;
    highlight: string;
    badge?: string;
    heroColor: string;
    specs: { label: string; value: string }[];
    features: string[];
    applications: string[];
    // 📷 TODO: Upload foto ke imgur.com → salin direct link → paste di sini
    imageUrl: string;
}

export const craneSystemVariants: CraneVariant[] = [
    {
        slug: 'jib-cranes',
        name: 'Jib Cranes',
        seriesCode: 'Schmalz Jib',
        tagline: 'Column & wall-mount jib — ergonomic transport hingga 1.000 kg',
        description: 'Jib Crane dari Schmalz adalah solusi foundasi yang ideal untuk seluruh sistem handling vakum. Dipasang di kolom atau dinding, jib crane aluminium ini menawarkan jangkauan fleksibel di atas workstation dengan kapasitas hingga 1.000 kg. Konstruksi aluminium premium menjamin low friction dan zero maintenance.',
        capacity: 'up to 1,000 kg',
        highlight: 'Column atau wall mount — jangkauan workstation fleksibel',
        heroColor: 'from-sky-600 to-blue-800',
        specs: [
            { label: 'Kapasitas', value: 'Hingga 1.000 kg' },
            { label: 'Mounting', value: 'Column atau wall' },
            { label: 'Material', value: 'Aluminium anodized premium' },
            { label: 'Reach', value: 'Customizable (typical up to 6 m)' },
            { label: 'Friction', value: 'Ultra-low — smooth operation' },
            { label: 'Sertifikasi', value: 'CE, FEM' },
        ],
        features: [
            'Pemasangan di kolom atau dinding — fleksibel',
            'Material aluminium anodized — ringan, kuat, anti-korosi',
            'Ultra-low friction untuk pergerakan mulus',
            'Jangkauan workstation dapat dikustomisasi',
            'Kompatibel dengan semua vacuum lifter Schmalz',
            'Tersedia dengan atau tanpa end-stop & brake',
        ],
        applications: ['Individual workstation', 'Assembly cell', 'CNC machining area', 'Welding & fabrication station'],
        imageUrl: 'https://media.schmalz.com/MAM_Library/Products/Produktuntergruppenbilder/0_/052/05232/5ec14e22bb7b_PUG_PGE-03791_000.jpg?size=m',
    },
    {
        slug: 'aluminum-bridge-cranes',
        name: 'Aluminum Bridge Cranes',
        seriesCode: 'Schmalz Bridge',
        tagline: 'Modular crane — ceiling/portal mount, area luas, hingga 1.200 kg',
        description: 'Aluminum Bridge Crane dari Schmalz adalah sistem crane modular yang dapat dikonfigurasi untuk ruang kerja besar hingga besar sekali. Dipasang di langit-langit atau konstruksi portal, sistem ini sangat cocok untuk ruang kerja luas yang membutuhkan coverage penuh dengan kapasitas hingga 1.200 kg.',
        capacity: 'up to 1,200 kg',
        highlight: 'Modular — coverage full area kerja luas',
        heroColor: 'from-blue-600 to-indigo-800',
        specs: [
            { label: 'Kapasitas', value: 'Hingga 1.200 kg' },
            { label: 'Mounting', value: 'Ceiling atau portal construction' },
            { label: 'Material', value: 'Aluminium modular' },
            { label: 'Span', value: 'Customizable — untuk ruang besar' },
            { label: 'Desain', value: 'Modular — fleksibel & cost-effective' },
            { label: 'Sertifikasi', value: 'CE, FEM' },
        ],
        features: [
            'Sistem modular — konfigurasi custom untuk setiap ruang',
            'Pemasangan di langit-langit atau konstruksi portal',
            'Coverage penuh untuk workspace besar',
            'Solusi cost-effective dibanding crane konvensional',
            'Aluminium — bobot ringan, load ringan di struktur bangunan',
            'Skalabel — bisa diperluas sesuai kebutuhan',
        ],
        applications: ['Manufacturing floor besar', 'Assembly hall multi-station', 'Warehouse picking area', 'Production line coverage penuh'],
        imageUrl: 'https://media.schmalz.com/MAM_Library/Products/Anwendungsbilder/Handling%20Systems/Applications/Others/08f38e043444_Picture_HS_SRA_JumboFlex_2017.jpg',
    },
    {
        slug: 'kbg-steel-construction',
        name: 'KBG Modular Steel',
        seriesCode: 'KBG Steel',
        tagline: 'Modular steel — workspace 30×8.5 m, 500 kg, galvanized',
        description: 'KBG Modular Steel Construction dari Schmalz adalah sistem crane baja galvanis modular untuk workspace besar. Dimensi maksimum hingga 30 × 8.5 × 5.5 m dengan kapasitas 500 kg (benda kerja + lifting device), profil baja 140×140×4 mm yang kuat dan tahan lama untuk lingkungan industri berat.',
        capacity: 'up to 500 kg',
        highlight: 'Workspace 30×8.5 m — baja galvanis tahan lama',
        badge: 'Heavy Duty',
        heroColor: 'from-zinc-600 to-slate-800',
        specs: [
            { label: 'Kapasitas', value: 'Hingga 500 kg (workpiece + lifter)' },
            { label: 'Dimensi Maks', value: '30 × 8.5 × 5.5 m (L×W×H)' },
            { label: 'Material', value: 'Galvanized steel' },
            { label: 'Profil', value: '140 × 140 × 4 mm' },
            { label: 'Desain', value: 'Modular — konfigurasi bebas' },
            { label: 'Sertifikasi', value: 'CE, FEM' },
        ],
        features: [
            'Baja galvanis — tahan korosi dan cuaca',
            'Workspace sangat besar hingga 30 × 8.5 m',
            'Modular — bisa dikonfigurasi sesuai layout pabrik',
            'Profil heavy-duty 140×140×4 mm',
            'Tinggi workspace hingga 5.5 m',
            'Ideal untuk produksi outdoor atau semi-outdoor',
        ],
        applications: ['Pabrik produksi large format', 'Galangan kapal & offshore yard', 'Konstruksi prefab besar', 'Heavy manufacturing outdoor/semi-outdoor'],
        imageUrl: 'https://media.schmalz.com/MAM_Library/Products/Anwendungsbilder/Handling%20Systems/Applications/Plastics/e3b0cd9e2ab1_Picture_HS_KBG_2022_01.jpg?size=l',
    },
    {
        slug: 'chain-hoists',
        name: 'Chain Hoists',
        seriesCode: 'Schmalz Hoist',
        tagline: 'Hoist sturdy hingga 2.500 kg — CSA certified, standard lift 3.000 mm',
        description: 'Chain Hoist dari Schmalz melengkapi setiap sistem crane dan vacuum lifter sebagai komponen pengangkatan vertikal. Dengan kapasitas hingga 2.500 kg, limit switch bawaan, dan standar tinggi angkat 3.000 mm, hoist ini tersertifikasi CSA untuk pasar USA dan Kanada — cocok untuk proyek internasional.',
        capacity: 'up to 2,500 kg',
        highlight: 'Kapasitas 2.500 kg — CSA certified untuk USA & Canada',
        badge: 'CSA',
        heroColor: 'from-slate-700 to-zinc-900',
        specs: [
            { label: 'Kapasitas', value: 'Hingga 2.500 kg' },
            { label: 'Limit Switch', value: 'Bawaan (upper & lower)' },
            { label: 'Lifting Height', value: 'Standard 3.000 mm' },
            { label: 'Sertifikasi', value: 'CE, CSA (USA & Canada)' },
            { label: 'Duty Class', value: 'Industrial grade' },
            { label: 'Kontrol', value: 'Pendant control' },
        ],
        features: [
            'Kapasitas besar hingga 2.500 kg',
            'Limit switch bawaan — keamanan penuh',
            'Standard lifting height 3.000 mm',
            'CSA certified — ekspor USA & Kanada',
            'Build quality sturdy untuk lingkungan industri berat',
            'Kompatibel dengan semua sistem crane Schmalz',
        ],
        applications: ['Heavy lifting pada bridge/jib crane', 'Steel mill & foundry', 'Proyek internasional (USA/Canada market)', 'Semua industri berat'],
        imageUrl: 'https://media.schmalz.com/MAM_Library/Products/Anwendungsbilder/Handling%20Systems/Applications/Logistics/54960822a760_Picture_HS_SRA_VacuMaster%20Basic_Institut%20F%C3%B6rster_2014.jpg',
    },
];
