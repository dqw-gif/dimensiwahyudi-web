export interface ProductSpec {
    label: string;
    value: string;
}

export interface Product {
    slug: string;
    name: string;
    tagline: string;
    description: string;
    capacity: string;
    category: 'Vacuum Lifter' | 'Crane System' | 'Vacuum Component' | 'Mobile Lifting';
    heroColor: string; // tailwind gradient class
    specs: ProductSpec[];
    features: string[];
    applications: string[];
    imageUrl: string;
}

export const schmalzProducts: Product[] = [
    {
        slug: 'vacuum-tube-lifter',
        name: 'Vacuum Tube Lifter',
        tagline: '9 varian — dari 50 kg hingga 300 kg, dari clean room hingga zona ATEX',
        description: 'Lini Vacuum Tube Lifter Schmalz adalah yang paling komprehensif di industri. Tersedia 9 varian — JumboFlex, JumboErgo, JumboSprint, JumboSprint EX (ATEX), PalVac Hygienic, High-Stack, Low-Stack — masing-masing dioptimalkan untuk aplikasi spesifik. Kapasitas mulai 50 kg hingga 300 kg.',
        capacity: 'up to 300 kg',
        category: 'Vacuum Lifter',
        heroColor: 'from-blue-600 to-blue-800',
        specs: [
            { label: 'Kapasitas Angkat', value: 'Hingga 300 kg' },
            { label: 'Sumber Vakum', value: 'Compressed air / Electric' },
            { label: 'Tingkat Vakum', value: 'Up to 85%' },
            { label: 'Sertifikasi', value: 'CE, AGR' },
            { label: 'Material Tube', value: 'Aluminium anodized' },
            { label: 'Temperatur Operasi', value: '-10°C to +60°C' },
        ],
        features: [
            'Kontrol angkat dan turun intuitif via handle operator',
            'Konfigurasi gripper fleksibel untuk berbagai bentuk benda',
            'Generator vakum terintegrasi (pneumatik atau elektrik)',
            'Sistem safety — beban tidak jatuh saat vakum gagal',
            'Sertifikasi AGR untuk perlindungan tulang belakang operator',
            'Kompatibel dengan semua sistem crane Schmalz',
        ],
        applications: [
            'Industri manufaktur & logistik',
            'Pengangkatan kaca, kayu, dan metal sheet',
            'Packaging dan palletizing',
            'Industri otomotif',
        ],
        // 📷 TODO: Upload foto ke imgur.com → salin direct link → paste di sini
        imageUrl: 'https://media.schmalz.cn/MAM_Library/Products/Produktgruppenbilder/dc087940a162_PG_PGE_00160_000.jpg?size=m',
    },
    {
        slug: 'vacumaster',
        name: 'VacuMaster',
        tagline: '11 varian — dari 100 kg hingga 2.000 kg, kayu, kaca, coil, panel 14m',
        description: 'Lini VacuMaster Schmalz adalah vacuum lifting device paling lengkap. Tersedia 11 varian — Basic, Comfort, Vario (2.000kg), Eco (tanpa listrik), Window, Wood, Coil, Light, Multi, Glass, dan Panel hingga 14 meter. Satu kategori untuk semua industri.',
        capacity: 'up to 2,000 kg',
        category: 'Vacuum Lifter',
        heroColor: 'from-slate-700 to-slate-900',
        specs: [
            { label: 'Kapasitas Angkat', value: 'Hingga beberapa ton' },
            { label: 'Mekanisme Angkat', value: 'Chain hoist' },
            { label: 'Konfigurasi', value: 'Modular — basic module + load beam + suction plate' },
            { label: 'Sertifikasi', value: 'CE, TÜV' },
            { label: 'Material Frame', value: 'Heavy-duty steel' },
            { label: 'Kontrol', value: 'Pendant control / Radio remote' },
        ],
        features: [
            'Modul dasar yang dapat dikonfigurasi secara bebas',
            'Load beam dan suction plate yang dapat disesuaikan',
            'Kontrol pendant atau radio remote',
            'Sistem pengunci vakum berlapis untuk keamanan',
            'Cocok untuk pengangkatan di lingkungan ekstrim',
            'Mudah diintegrasikan dengan overhead crane existing',
        ],
        applications: [
            'Industri baja dan manufaktur berat',
            'Galangan kapal & konstruksi',
            'Pengangkatan pelat baja & beton precast',
            'Industri kertas & percetakan',
        ],
        // 📷 TODO: Upload foto ke imgur.com → salin direct link → paste di sini
        imageUrl: 'https://media.schmalz.cn/MAM_Library/Products/Produktgruppenbilder/44f16805bafb_PG_PGE-00163_000.jpg?size=m',
    },
    {
        slug: 'mobile-lifting-device',
        name: 'Mobile Lifting Device',
        tagline: 'Fleksibel, mobile, siap pakai di mana saja',
        description: 'Mobile Lifting Device dari Schmalz dirancang untuk memberikan fleksibilitas penuh di area kerja yang dinamis. Dengan kapasitas hingga 50 kg dan kemampuan manuver tinggi, unit ini bisa dipasangkan pada berbagai jenis forklift atau digunakan secara mandiri di berbagai lokasi.',
        capacity: 'up to 50 kg',
        category: 'Mobile Lifting',
        heroColor: 'from-cyan-600 to-blue-700',
        specs: [
            { label: 'Kapasitas Angkat', value: 'Hingga 50 kg' },
            { label: 'Tipe', value: 'Mobile / dipasang pada industrial truck' },
            { label: 'Sumber Vakum', value: 'Built-in vacuum generator' },
            { label: 'Sertifikasi', value: 'CE' },
            { label: 'Berat Unit', value: 'Compact & ringan' },
            { label: 'Daya', value: 'Battery / compressed air' },
        ],
        features: [
            'Portabel — berpindah lokasi dengan mudah',
            'Kompatibel dengan forklift dan pallet truck',
            'Operasi baterai — bebas kabel',
            'Setup cepat tanpa instalasi permanen',
            'Gripper vakum yang dapat diganti sesuai kebutuhan',
            'Ideal untuk gudang dan area fleksibel',
        ],
        applications: [
            'Gudang dan distribusi logistik',
            'Loading/unloading truk',
            'Area kerja yang sering berpindah',
            'Fasilitas produksi skala menengah',
        ],
        // 📷 TODO: Upload foto ke imgur.com → salin direct link → paste di sini
        imageUrl: 'https://media.schmalz.cn/MAM_Library/Products/Produktgruppenbilder/0_/063/06394/b73d102d5159_PUG_PGE-06394.jpg?size=m',
    },
    {
        slug: 'vacuum-generator',
        name: 'Vacuum Generators',
        tagline: '6 jenis — dari compact ejector pick-and-place hingga high-flow blower & smart pump IO-Link',
        description: 'Lini Vacuum Generator Schmalz mencakup semua jenis pembangkit vakum: Compact Ejector SCPS (all-in-one), Basic Ejector SBP (desentralisasi), Multi-stage SBPL (high-flow benda berpori), X-Pump SXPi (IO-Link Industry 4.0), Regulated Pump ECBPMi (murni elektrik tanpa kompresor), hingga Vacuum Blower SBG untuk aplikasi porositas tinggi.',
        capacity: 'up to 1,140 l/min',
        category: 'Vacuum Component',
        heroColor: 'from-blue-600 to-blue-800',
        specs: [
            { label: 'Tipe', value: 'Ejector, Pump, Blower' },
            { label: 'Suction Rate', value: 'Hingga 1.140 l/min (SBPL)' },
            { label: 'Max Vakum', value: 'Hingga 91% (UHV-HD)' },
            { label: 'Interface', value: 'Standard / IO-Link Class A' },
            { label: 'Sumber Daya', value: 'Pneumatik & Elektrik' },
            { label: 'Sertifikasi', value: 'CE' },
        ],
        features: [
            'Compact ejector all-in-one — suction, blow-off, filter, vacuum switch',
            'Multi-stage Venturi untuk benda berpori (SBPL)',
            'Smart diagnostics & air saving via IO-Link (SXPi)',
            'Murni elektrik tanpa kompresor (ECBPMi)',
            'High-flow blower untuk tekstil & busa (SBG)',
            'Kompatibel dengan semua cobot & robot industri',
        ],
        applications: [
            'Pick-and-place otomasi & robot',
            'Palletizing kardus & kayu',
            'Smart factory & Industry 4.0',
            'AGV & mobile handling',
        ],
        imageUrl: 'https://media.schmalz.com/MAM_Library/Products/Produktgruppenbilder/ec6bdf60f00a_PG_PGE-00169_000.jpg?size=m',
    },
    {
        slug: 'crane-system',
        name: 'Crane System & Jib Crane',
        tagline: 'Fondasi sistem handling yang handal dan efisien',
        description: 'Crane System dan Jib Crane aluminium dari Schmalz dirancang sebagai infrastruktur yang optimal untuk semua vacuum lifter. Konstruksi aluminium premium menghasilkan bobot yang ringan namun kokoh, dengan friction yang sangat rendah untuk pergerakan yang halus dan efisien.',
        capacity: 'Configured to lifter capacity',
        category: 'Crane System',
        heroColor: 'from-sky-600 to-blue-800',
        specs: [
            { label: 'Material', value: 'Aluminium anodized (premium grade)' },
            { label: 'Friction', value: 'Outstanding low-friction operation' },
            { label: 'Mounting', value: 'Wall / column / ceiling' },
            { label: 'Reach', value: 'Customizable (up to 6+ m)' },
            { label: 'Kompatibilitas', value: 'Semua vacuum lifter Schmalz' },
            { label: 'Sertifikasi', value: 'CE, FEM' },
        ],
        features: [
            'Aluminium konstruksi — ringan, kuat, anti-korosi',
            'Ultra-low friction bearing untuk pergerakan mulus',
            'Desain modular — panjang jib dapat dikonfigurasi',
            'Kompatibel optimal dengan seluruh lini vacuum lifter Schmalz',
            'Instalasi cepat dengan sistem bolt-on',
            'Tersedia wall-mount, column-mount, dan ceiling-mount',
        ],
        applications: [
            'Manufacturing cell dan workstation',
            'Assembly area',
            'Loading/unloading station',
            'Semua industri yang menggunakan vacuum lifter',
        ],
        // 📷 TODO: Upload foto ke imgur.com → salin direct link → paste di sini
        imageUrl: 'https://media.schmalz.cn/MAM_Library/Products/Produktgruppenbilder/c2d1167fab91_PG_PGE-00161_001.jpg?size=m',
    },
    {
        slug: 'vacuum-suction-cups',
        name: 'Vacuum Suction Cups',
        tagline: 'Komponen kritis untuk setiap sistem vakum',
        description: 'Vacuum Suction Cups dari Schmalz adalah komponen inti dalam setiap sistem handling vakum. Tersedia dalam ratusan varian — dari flat hingga bellows, dari NBR hingga silikon FDA — untuk memenuhi kebutuhan setiap aplikasi industri.',
        capacity: 'Per cup rating',
        category: 'Vacuum Component',
        heroColor: 'from-teal-600 to-cyan-700',
        specs: [
            { label: 'Material', value: 'NBR, Silikon, Viton, Polyurethane' },
            { label: 'Bentuk', value: 'Flat, Bellows, Oval, Deep, Special' },
            { label: 'Diameter', value: '10 mm – 250+ mm' },
            { label: 'Temperatur', value: '-20°C to +200°C (tergantung material)' },
            { label: 'Sertifikasi', value: 'CE, FDA (silikon grade), ATEX available' },
            { label: 'Connection', value: 'G1/8 s/d G1/2 BSP' },
        ],
        features: [
            'Ratusan varian untuk semua aplikasi',
            'Material food-grade untuk industri makanan (FDA)',
            'High-temp untuk oven & painting line',
            'Anti-static untuk industri elektronik',
            'Koneksi standar industri — mudah dipasang',
            'Design sesuai standar ISO 9283',
        ],
        applications: [
            'Robot gripping & end-of-arm tooling',
            'CNC machining & glass processing',
            'Packaging industri makanan',
            'Elektronik & semiconductor',
        ],
        // 📷 TODO: Upload foto ke imgur.com → salin direct link → paste di sini
        imageUrl: 'https://media.schmalz.com/MAM_Library/Products/Produktgruppenbilder/ae921bfe87bc_PG_PGE-00171_000.jpg?size=m',
    },
];
