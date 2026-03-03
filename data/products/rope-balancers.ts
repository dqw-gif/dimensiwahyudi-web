// Sub-variants of Schmalz Rope Balancers (all Binar Handling brand)
// URL: /products/schmalz/rope-balancer/[variant]

export interface RopeBalancerVariant {
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

export const ropeBalancerVariants: RopeBalancerVariant[] = [
    {
        slug: 'neo-30',
        name: 'NEO 30',
        seriesCode: 'Binar NEO 30',
        tagline: 'Battery operated rope balancer — 30 kg, 500 lifts per charge',
        description: 'Binar Handling NEO 30 adalah rope balancer bertenaga baterai yang paling praktis. Instalasi cepat dan mudah tanpa instalasi daya tetap. Satu kali pengisian baterai memberikan hingga 500 siklus angkat — ideal untuk shift kerja penuh tanpa gangguan.',
        capacity: 'up to 30 kg',
        highlight: '500 angkatan per pengisian — instalasi super cepat',
        badge: 'Battery',
        heroColor: 'from-emerald-500 to-green-700',
        specs: [
            { label: 'Kapasitas', value: 'Hingga 30 kg' },
            { label: 'Daya', value: 'Battery operated (Li-ion)' },
            { label: 'Lifting Strokes', value: 'Hingga 500 per pengisian' },
            { label: 'Instalasi', value: 'Cepat & mudah — no fixed power' },
            { label: 'Brand', value: 'Binar Handling' },
            { label: 'Sertifikasi', value: 'CE' },
        ],
        features: [
            'Battery Li-ion — bebas kabel dan instalasi listrik tetap',
            'Hingga 500 lifting strokes per charge',
            'Instalasi cepat dan mudah di mana saja',
            'Ringan dan compact untuk fleksibilitas tinggi',
            'Ideal untuk area tanpa pasokan listrik overhead',
            'Zero-gravity feel untuk operator',
        ],
        applications: ['Workshop kecil-menengah', 'Area tanpa power supply overhead', 'Picking light parts', 'Maintenance & service workstation'],
        imageUrl: 'https://media.schmalz.com/MAM_Library/Products/Produktfamilienbilder/0_/061/06109/435df26cd954_PF_PGE-06109.jpg?size=l',
    },
    {
        slug: 'quick-lift-arm-qla',
        name: 'Quick-Lift Arm QLA',
        seriesCode: 'Binar QLA',
        tagline: 'Jib arm 360° — presisi tinggi hingga 300 kg',
        description: 'Binar Handling Quick-Lift Arm QLA adalah intelligent lift arm dengan jangkauan jib 360°. Teknologi sensor canggih memungkinkan positioning benda kerja yang sangat sensitif dan presisi, bahkan untuk beban hingga 300 kg. Solusi premium untuk assembly line dan workstation presisi.',
        capacity: 'up to 300 kg',
        highlight: 'Jib 360° — positioning super sensitif & presisi',
        heroColor: 'from-amber-500 to-orange-700',
        specs: [
            { label: 'Kapasitas', value: 'Hingga 300 kg' },
            { label: 'Slewing Range', value: '360°' },
            { label: 'Kontrol', value: 'Intelligent — sensor positioning' },
            { label: 'Presisi', value: 'Sangat tinggi — sub-mm' },
            { label: 'Brand', value: 'Binar Handling' },
            { label: 'Sertifikasi', value: 'CE' },
        ],
        features: [
            'Slewing range jib 360° penuh',
            'Positioning benda kerja sensitif dan presisi tinggi',
            'Intelligent control — zero-gravity feel',
            'Mendukung berbagai jenis gripper dan end-effector',
            'Kapasitas hingga 300 kg',
            'Terintegrasi dengan sistem crane dan rail',
        ],
        applications: ['Assembly line presisi', 'Automotive body assembly', 'Aerospace component handling', 'Workstation ergonomis'],
        imageUrl: 'https://media.schmalz.com/MAM_Library/Products/Artikelbilder/18/1805/180501/18050100015/f3d7075ed069_18.05.01.00015_00.jpg?size=l',
    },
    {
        slug: 'quick-lift-rail-qlr',
        name: 'Quick-Lift Rail QLR',
        seriesCode: 'Binar QLR',
        tagline: 'Rail-mounted lift — 600 kg, integrasi sistem rail baru/existing',
        description: 'Binar Handling Quick-Lift Rail QLR adalah solusi intelligent lift yang dipasang pada sistem rail. Dengan kapasitas hingga 600 kg dan kemampuan integrasi ke sistem rail baru maupun existing, QLR menjadi solusi optimal untuk lini produksi panjang dengan kebutuhan lifting berat.',
        capacity: 'up to 600 kg',
        highlight: 'Rail-mounted — 600 kg, integrasi rail existing',
        heroColor: 'from-orange-600 to-red-700',
        specs: [
            { label: 'Kapasitas', value: 'Hingga 600 kg' },
            { label: 'Mounting', value: 'Rail system (baru atau existing)' },
            { label: 'Kontrol', value: 'Intelligent — sensor positioning' },
            { label: 'Travel', value: 'Linear sepanjang rail' },
            { label: 'Brand', value: 'Binar Handling' },
            { label: 'Sertifikasi', value: 'CE' },
        ],
        features: [
            'Kapasitas besar hingga 600 kg',
            'Integrasi ke sistem rail baru MAUPUN existing',
            'Positioning sensitif dan presisi sepanjang lintasan',
            'Intelligent control system',
            'Optimal untuk lini produksi linear panjang',
            'Customizable rail configuration',
        ],
        applications: ['Lini produksi panjang', 'Heavy assembly line', 'Engine & transmission handling', 'Bridge crane replacement'],
        imageUrl: 'https://media.schmalz.com/MAM_Library/Products/Artikelbilder/18/1805/180502/18050200001/88660d7abfda_18.05.02.00001_00.jpg?size=l',
    },
    {
        slug: 'ergo-glass',
        name: 'Ergo-Glass',
        seriesCode: 'Binar Ergo-Glass',
        tagline: 'Ergonomic glass handling — konfigurasi gripper fleksibel untuk permukaan flat',
        description: 'Binar Handling Ergo-Glass adalah lift system ergonomis yang dirancang khusus untuk penanganan kaca dan material permukaan flat lainnya. Konfigurasi gripper yang fleksibel —standard maupun custom — memastikan grip aman pada berbagai ukuran dan ketebalan kaca.',
        capacity: 'Varies by config',
        highlight: 'Khusus kaca & permukaan flat — gripper fleksibel',
        badge: 'Glass',
        heroColor: 'from-teal-500 to-cyan-700',
        specs: [
            { label: 'Target', value: 'Kaca & material flat surface' },
            { label: 'Gripper', value: 'Standard & custom (fleksibel)' },
            { label: 'Lifting', value: 'Presisi & efisien' },
            { label: 'Keamanan', value: 'Vakum monitoring system' },
            { label: 'Brand', value: 'Binar Handling' },
            { label: 'Sertifikasi', value: 'CE' },
        ],
        features: [
            'Dirancang khusus untuk kaca dan permukaan flat',
            'Gripper konfigurasi standard DAN custom',
            'Lifting presisi dan efisien',
            'Aman — vakum monitoring terintegrasi',
            'Ergonomis untuk operator — mengurangi cidera',
            'Kompatibel dengan sistem crane dan rail Binar',
        ],
        applications: ['Glass processing & fabrication', 'Curtain wall & glazing', 'Solar panel handling', 'Mirror & flat panel installation'],
        imageUrl: 'https://media.schmalz.com/MAM_Library/Products/Artikelbilder/18/1805/180512/18051200002/7f8a3e902583_18.05.12.00002_00.jpg?size=l',
    },
];
