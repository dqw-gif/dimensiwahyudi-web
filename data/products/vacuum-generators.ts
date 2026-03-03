// Schmalz Vacuum Generator Product Family
// Products sourced from: schmalz.com/en/products/.../vacuum-generators-307617
// URL: /products/schmalz/vacuum-generator/[variant]

export interface VacuumGeneratorSpec {
    label: string;
    value: string;
}

export interface VacuumGeneratorVariant {
    slug: string;
    name: string;
    seriesCode: string;
    tagline: string;
    description: string;
    capacity: string;    // e.g. "up to 71 l/min"
    highlight: string;
    badge?: string;
    heroColor: string;
    specs: VacuumGeneratorSpec[];
    features: string[];
    applications: string[];
    // 📷 TODO: Upload foto ke imgur.com → salin direct link → paste di sini
    imageUrl: string;
}

export const vacuumGeneratorVariants: VacuumGeneratorVariant[] = [
    {
        slug: 'scps-compact-ejector',
        name: 'Compact Ejector SCPS',
        seriesCode: 'Schmalz SCPS / SCPSi',
        tagline: 'All-in-one compact ejector — suction, blow-off, filter, vacuum switch dalam satu unit',
        description: 'Compact Ejector SCPS dari Schmalz adalah solusi "all-in-one" yang mengintegrasikan katup hisap, blow-off, filter, dan vacuum switch dalam satu bodi kompak. Dengan suction rate hingga 71 l/min dan vakum maksimal 85%, SCPS optimal untuk pick-and-place kecepatan tinggi di lini otomasi.',
        capacity: 'up to 71 l/min',
        highlight: 'All-in-one: suction + blow-off + filter + vacuum switch',
        heroColor: 'from-blue-600 to-blue-800',
        specs: [
            { label: 'Suction Rate', value: 'Hingga 71 l/min' },
            { label: 'Max Vacuum', value: '85%' },
            { label: 'Bodi', value: 'Plastik (lightweight)' },
            { label: 'Fungsi Terintegrasi', value: 'Suction valve, blow-off, filter, vacuum switch' },
            { label: 'Interface', value: 'Standard (SCPSb) / IO-Link (SCPSi)' },
            { label: 'Sertifikasi', value: 'CE' },
        ],
        features: [
            'Semua komponen terintegrasi — hemat ruang dan biaya instalasi',
            'Suction rate hingga 71 l/min untuk high-speed cycle',
            'Fungsi air saving opsional — hemat 95% udara tekan',
            'Versi IO-Link (SCPSi) untuk monitoring digital real-time',
            'Mounting langsung ke manifold atau valve terminal',
            'Ideal untuk aplikasi pick-and-place frekuensi tinggi',
        ],
        applications: ['Pick-and-place otomasi', 'Palletizing robot', 'Packaging line', 'Semiconductor handling'],
        imageUrl: 'https://media.schmalz.com/MAM_Library/Products/Produktfamilienbilder/0_/046/04637/ef70e26a0b5d_PF_PGE-04637_000.jpg?size=l',
    },
    {
        slug: 'sbp-basic-ejector',
        name: 'Basic Ejector SBP',
        seriesCode: 'Schmalz SBP / SBP-C',
        tagline: 'Compact ejector decentralized — suction rate hingga 215 l/min, bodi plastik',
        description: 'Basic Ejector SBP dari Schmalz adalah vacuum generator compact berkualitas tinggi untuk sistem desentralisasi. Dengan suction rate hingga 215 l/min dari bodi plastik yang ringan, SBP cocok untuk semua aplikasi standar di mana vakum dibutuhkan dekat titik pengangkatan. Versi SBP-C menambahkan fungsi katup terintegrasi.',
        capacity: 'up to 215 l/min',
        highlight: 'Desentralisasi optimal — compact, low-maintenance',
        heroColor: 'from-sky-600 to-cyan-700',
        specs: [
            { label: 'Suction Rate', value: 'Hingga 215 l/min' },
            { label: 'Max Vacuum', value: '85%' },
            { label: 'Bodi', value: 'Plastik — ringan' },
            { label: 'Silencer', value: 'Terintegrasi' },
            { label: 'Varian C', value: 'SBP-C — valve technology terintegrasi' },
            { label: 'Sertifikasi', value: 'CE' },
        ],
        features: [
            'Suction rate besar hingga 215 l/min',
            'Bodi plastik ringan — ideal mounting dekat end-effector',
            'Silencer terintegrasi — operasi senyap',
            'Mudah dipasang secara sentralisasi maupun desentralisasi',
            'Low-maintenance — desain minimal komponen bergerak',
            'SBP-C dengan tambahan katup untuk kontrol yang lebih lengkap',
        ],
        applications: ['Sistem otomasi standar', 'Robot industrial', 'Fixture vakum', 'Conveyor sorting'],
        imageUrl: 'https://media.schmalz.com/MAM_Library/Products/Produktfamilienbilder/0_/032/03270/2ad9e5e943e4_PF_PGE-03270_000.jpg',
    },
    {
        slug: 'sbpl-high-flow-ejector',
        name: 'Basic Ejector SBPL',
        seriesCode: 'Schmalz SBPL',
        tagline: 'High-flow multi-stage ejector — 290 hingga 1.140 l/min untuk benda berpori',
        description: 'Basic Ejector SBPL dari Schmalz menggunakan teknologi multi-stage Venturi untuk menghasilkan flow rate sangat besar (290–1.140 l/min). Dirancang khusus untuk menangani benda kerja berpori seperti kardus, kayu, dan busa yang "bocor" udara. SBPL mempertahankan daya hisap stabil meski ada kebocoran vakum signifikan.',
        capacity: '290 – 1,140 l/min',
        highlight: 'Multi-stage Venturi — high flow untuk benda berpori',
        badge: 'High Flow',
        heroColor: 'from-teal-600 to-emerald-700',
        specs: [
            { label: 'Suction Rate', value: '290 hingga 1.140 l/min' },
            { label: 'Max Vacuum', value: '61% atau 90%' },
            { label: 'Teknologi', value: 'Multi-stage Venturi' },
            { label: 'Bodi', value: 'Plastik' },
            { label: 'Target', value: 'Benda berpori (kardus, kayu, busa)' },
            { label: 'Sertifikasi', value: 'CE' },
        ],
        features: [
            'Multi-stage design — suction rate tertinggi di kelasnya',
            'Kompensasi otomatis kebocoran udara dari benda berpori',
            'Dua level vakum: 61% (flow-optimized) atau 90% (vacuum-optimized)',
            'Bodi plastik ringan dan tahan lama',
            'Ideal untuk palletizing karton dan kayu berkecepatan tinggi',
            'Plug-and-play — instalasi mudah',
        ],
        applications: ['Palletizing kardus', 'Handling panel kayu & MDF', 'Foam & busa handling', 'Karung & sack handling'],
        imageUrl: 'https://media.schmalz.com/MAM_Library/Products/Produktfamilienbilder/0_/050/05050/4172f3101212_PF_PGE-05050_000.jpg',
    },
    {
        slug: 'sxpi-x-pump',
        name: 'X-Pump SXPi',
        seriesCode: 'Schmalz SXPi / SXMPi',
        tagline: 'Intelligent compact ejector — IO-Link Class A, air saving, condition monitoring',
        description: 'X-Pump SXPi adalah generasi terbaru compact ejector Schmalz dengan kecerdasan penuh. Interface IO-Link Class A memungkinkan monitoring kondisi real-time, diagnosis jarak jauh, dan integrasi langsung ke sistem Industry 4.0. Fungsi air saving otomatis mengurangi konsumsi udara tekan hingga 95% tanpa mengorbankan performa.',
        capacity: 'up to 185 l/min',
        highlight: 'IO-Link Class A — smart diagnostics & energy saving',
        badge: 'Smart',
        heroColor: 'from-violet-600 to-purple-700',
        specs: [
            { label: 'Suction Rate', value: 'Hingga 185 l/min' },
            { label: 'Max Vacuum', value: '85%' },
            { label: 'Interface', value: 'IO-Link Class A' },
            { label: 'Air Saving', value: 'Otomatis — hingga 95% penghematan' },
            { label: 'Monitoring', value: 'Condition monitoring real-time' },
            { label: 'Sertifikasi', value: 'CE' },
        ],
        features: [
            'IO-Link Class A — integrasi mudah ke Industry 4.0 / PLC',
            'Air saving function otomatis — hemat energi signifikan',
            'Condition monitoring & predictive maintenance',
            'Diagnosis jarak jauh via IO-Link master',
            'Konfigurasi parameter lewat software tanpa bongkar unit',
            'Optimal untuk sistem otomasi modern yang terkoneksi',
        ],
        applications: ['Smart factory & Industry 4.0', 'Robot collaborative (cobot)', 'Lini produksi cerdas terkoneksi', 'Sistem SCADA / MES terintegrasi'],
        imageUrl: 'https://media.schmalz.com/MAM_Library/Products/Produktfamilienbilder/0_/050/05050/4172f3101212_PF_PGE-05050_000.jpg',
    },
    {
        slug: 'ecbpm-electric-pump',
        name: 'Regulated Vacuum Pump ECBPMi',
        seriesCode: 'Schmalz ECBPMi / ECBPM',
        tagline: 'Electric vacuum pump tanpa kompresor — kontrol digital via IO-Link',
        description: 'ECBPMi adalah vacuum pump elektrik revolusioner dari Schmalz yang beroperasi sepenuhnya tanpa pasokan udara tekan. Cocok untuk fasilitas tanpa kompresor, clean room, atau kendaraan AGV. Kontrolnya via touch display atau IO-Link. Flow rate hingga 35 l/min untuk aplikasi automation compact.',
        capacity: 'up to 35 l/min',
        highlight: 'Tanpa kompresor — murni elektrik, control IO-Link',
        badge: 'Electric',
        heroColor: 'from-amber-500 to-orange-700',
        specs: [
            { label: 'Suction Rate', value: 'Hingga 35 l/min' },
            { label: 'Sumber Daya', value: 'Listrik (24V DC)' },
            { label: 'Kompresor', value: 'TIDAK diperlukan' },
            { label: 'Kontrol', value: 'Touch display / IO-Link' },
            { label: 'Aplikasi', value: 'Automation compact, AGV, clean room' },
            { label: 'Sertifikasi', value: 'CE' },
        ],
        features: [
            'Murni elektrik — bebas dari instalasi kompresor',
            'Kontrol presisi via touch display atau IO-Link',
            'Ideal untuk AGV (Automated Guided Vehicle)',
            'Cocok untuk clean room karena bebas oil & kondensat',
            'Energy efficient pump technology generasi terbaru',
            'Compact form factor — mudah diintegrasikan',
        ],
        applications: ['AGV & mobile robot', 'Clean room handling', 'Sistem tanpa kompresor', 'Collaborative robot (cobot)'],
        imageUrl: 'https://media.schmalz.com/MAM_Library/Products/Produktfamilienbilder/0_/056/05632/739c35833688_PF_PGE-05632_005.jpg',
    },
    {
        slug: 'sbg-vacuum-blower',
        name: 'Vacuum Blower SBG',
        seriesCode: 'Schmalz SBG',
        tagline: 'High flow rate blower — untuk benda berpori porositas tinggi',
        description: 'Vacuum Blower SBG dari Schmalz menggunakan prinsip side-channel blower untuk menghasilkan flow rate sangat tinggi dengan vakum rendah-menengah. Tidak bergantung pada udara tekan — beroperasi dari listrik langsung. Optimal untuk aplikasi dimana benda kerja memiliki porositas sangat tinggi seperti busa tebal atau kain industri.',
        capacity: 'Very high flow rate',
        highlight: 'Side-channel blower — high flow, tanpa udara tekan',
        heroColor: 'from-rose-600 to-red-700',
        specs: [
            { label: 'Teknologi', value: 'Side-channel blower' },
            { label: 'Flow Rate', value: 'Sangat tinggi (high volume)' },
            { label: 'Sumber Daya', value: 'Listrik — tanpa udara tekan' },
            { label: 'Vakum', value: 'Rendah-menengah (low-medium)' },
            { label: 'Opsi', value: 'Frequency regulated / electropneumatic reversing' },
            { label: 'Sertifikasi', value: 'CE' },
        ],
        features: [
            'Flow rate tertinggi — ideal untuk benda sangat berpori',
            'Beroperasi dari listrik — tanpa kompresor',
            'Opsi frequency regulated untuk kontrol flow presisi',
            'Electropneumatic reversing — switching hisap/dorong',
            'Cocok untuk bahan tekstil, busa, dan non-woven',
            'Noise level lebih rendah dibanding ejector pneumatik',
        ],
        applications: ['Handling foam & busa tebal', 'Tekstil & kain industri', 'Non-woven material', 'Woodworking porositas tinggi'],
        imageUrl: 'https://media.schmalz.com/MAM_Library/Products/Produktfamilienbilder/0_/054/05449/b165bafed617_PF_PGE-05449_000.jpg',
    },
];
