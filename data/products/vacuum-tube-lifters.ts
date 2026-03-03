// Sub-variants of the Schmalz Vacuum Tube Lifter (Jumbo series)
// URL: /products/schmalz/vacuum-tube-lifter/[variant]

export interface VTLSpec {
    label: string;
    value: string;
}

export interface VTLVariant {
    slug: string;
    name: string;
    seriesCode: string;
    tagline: string;
    description: string;
    capacity: string;
    highlight: string; // one standout feature for the card
    badge?: string;    // optional badge e.g. "ATEX", "Food Grade"
    heroColor: string;
    specs: VTLSpec[];
    features: string[];
    applications: string[];
    // 📷 TODO: Upload foto ke imgur.com → salin direct link → paste di sini
    imageUrl: string;
}

export const vacuumTubeLifterVariants: VTLVariant[] = [
    {
        slug: 'jumboflex',
        name: 'JumboFlex',
        seriesCode: 'JumboFlex',
        tagline: 'Ergonomic one-hand operation for fast movement sequences',
        description: 'JumboFlex generasi terbaru dari Schmalz menawarkan operasi satu tangan yang paling ergonomis untuk sekuens pergerakan cepat. Kontrol dua tombol intuitif memungkinkan operasi naik/turun dengan sentuhan jari, menjadikannya solusi terdepan untuk productivitas tinggi.',
        capacity: 'up to 50 kg',
        highlight: 'Operasi satu tangan — kontrol 2 tombol intuitif',
        heroColor: 'from-blue-500 to-blue-700',
        specs: [
            { label: 'Kapasitas', value: 'Hingga 50 kg' },
            { label: 'Kontrol', value: 'Two-button (naik/turun)' },
            { label: 'Operasi', value: 'Satu tangan ergonomis' },
            { label: 'Sumber Vakum', value: 'Pneumatik / Elektrik' },
            { label: 'Sertifikasi', value: 'CE, AGR (ergonomik tulang belakang)' },
        ],
        features: [
            'Kontrol dua tombol — intuitif naik/turun',
            'Desain satu tangan untuk sekuens kerja cepat',
            'Komponen dapat dikonfigurasi: tube, handle, gripper, generator',
            'Tersedia juga versi satu tombol (on request)',
            'Kompatibel dengan semua gripper Schmalz',
            'Sertifikasi AGR — proteksi tulang belakang operator',
        ],
        applications: ['Industri manufaktur & assembly', 'Pengemasan & palletizing', 'E-commerce & logistik', 'Industri otomotif'],
        imageUrl: 'https://i.imgur.com/AHRYrMQ.jpeg',
    },
    {
        slug: 'jumboflex-gen1',
        name: 'JumboFlex Generation 1',
        seriesCode: 'JumboFlex G1',
        tagline: 'Classic one/two-finger control for left and right-handed users',
        description: 'JumboFlex Generasi 1 adalah vakum tube lifter dengan proven track record panjang. Mendukung kontrol satu atau dua jari, dirancang untuk pengguna kanan maupun kiri, menjadikannya solusi universal untuk operator dengan preferensi berbeda.',
        capacity: 'up to 50 kg',
        highlight: 'Kontrol satu/dua jari — cocok untuk tangan kiri & kanan',
        heroColor: 'from-blue-600 to-indigo-700',
        specs: [
            { label: 'Kapasitas', value: 'Hingga 50 kg' },
            { label: 'Kontrol', value: 'One-finger / Two-finger' },
            { label: 'Handedness', value: 'Kanan & kiri' },
            { label: 'Sumber Vakum', value: 'Pneumatik / Elektrik' },
            { label: 'Sertifikasi', value: 'CE' },
        ],
        features: [
            'Kontrol satu-jari atau dua-jari (dapat dipilih)',
            'Mendukung operator tangan kanan maupun kiri',
            'Proven design — ribuan unit beroperasi di industri',
            'Komponen modular yang dapat dikonfigurasi',
            'Cocok untuk lingkungan produksi massal',
            'Mudah dirawat dan diperbaiki',
        ],
        applications: ['Lingkungan produksi campur (multi-operator)', 'Packing & packaging', 'Perakitan komponen', 'Distribusi & logistik'],
        imageUrl: 'https://i.imgur.com/YAQ3YEi.jpeg',
    },
    {
        slug: 'jumboergo',
        name: 'JumboErgo',
        seriesCode: 'JumboErgo',
        tagline: 'Dynamic handling of flat workpieces up to 300 kg with 90° swivel',
        description: 'JumboErgo dari Schmalz adalah solusi premium untuk penanganan beban berat dan flat hingga 300 kg. Fitur swivel 90° (opsional dengan JumboErgo PSE) memungkinkan orientasi benda kerja tanpa upaya tambahan — ideal untuk material handling yang dinamis.',
        capacity: 'up to 300 kg',
        highlight: 'Swivel 90° — putar benda kerja tanpa upaya tambahan',
        heroColor: 'from-blue-700 to-slate-800',
        specs: [
            { label: 'Kapasitas', value: 'Hingga 300 kg' },
            { label: 'Swivel', value: '90° (opsional dengan PSE)' },
            { label: 'Target Material', value: 'Flat workpieces' },
            { label: 'Sumber Vakum', value: 'Pneumatik / Elektrik' },
            { label: 'Sertifikasi', value: 'CE, AGR' },
        ],
        features: [
            'Kapasitas angkat berat hingga 300 kg',
            'Swivel 90° — putar benda kerja secara ergonomis',
            'PSE version dengan actuated swivel elektrik',
            'Optimal untuk flat materials: panel, pelat, kaca',
            'Sistem safety berlapis — beban terjamin aman',
            'Modular dan dapat dikonfigurasi',
        ],
        applications: ['Kaca & glazing industry', 'Sheet metal & panel handling', 'Konstruksi & prefab', 'Industri furnitur'],
        imageUrl: 'https://i.imgur.com/gGx7tKR.jpeg',
    },
    {
        slug: 'jumbosprint',
        name: 'JumboSprint',
        seriesCode: 'JumboSprint',
        tagline: 'All-around operator handle for precise handling of compact workpieces',
        description: 'JumboSprint dari Schmalz dirancang khusus untuk penanganan benda kerja compact dengan kapasitas hingga 300 kg. Handle lingkar penuh memberikan pegangan dan kontrol presisi dari semua arah, menjadikannya ideal untuk benda yang memerlukan penempatan akurat.',
        capacity: 'up to 300 kg',
        highlight: 'All-around handle — grip presisi dari segala arah',
        heroColor: 'from-sky-600 to-blue-800',
        specs: [
            { label: 'Kapasitas', value: 'Hingga 300 kg' },
            { label: 'Handle', value: 'All-around (circumferential)' },
            { label: 'Target Material', value: 'Compact workpieces' },
            { label: 'Sumber Vakum', value: 'Pneumatik / Elektrik' },
            { label: 'Sertifikasi', value: 'CE, AGR' },
        ],
        features: [
            'Circumferential (lingkar penuh) operator handle',
            'Kontrol presisi dari semua arah',
            'Kapasitas hingga 300 kg untuk benda compact',
            'Ideal untuk penempatan benda di posisi sulit',
            'Modular design — gripper dapat diganti',
            'Sertifikasi AGR ergonomi',
        ],
        applications: ['Industri batu dan marmer', 'Block & concrete handling', 'Drum & cylinder handling', 'Komponen mesin berat'],
        imageUrl: 'https://i.imgur.com/Sbqq8YO.jpeg',
    },
    {
        slug: 'jumbosprint-ex',
        name: 'JumboSprint EX',
        seriesCode: 'JumboSprint EX',
        tagline: 'ATEX certified — untuk zona berbahaya & ledakan',
        description: 'JumboSprint EX adalah satu-satunya vacuum tube lifter di lini Schmalz yang bersertifikasi ATEX untuk digunakan di zona proteksi ledakan. Didesain untuk lingkungan industri dengan gas atau debu mudah terbakar, tanpa mengorbankan performa dan ergonomi.',
        capacity: 'up to 250 kg',
        highlight: 'ATEX certified — aman di zona ledakan',
        badge: 'ATEX',
        heroColor: 'from-orange-600 to-red-700',
        specs: [
            { label: 'Kapasitas', value: 'Hingga 250 kg' },
            { label: 'Sertifikasi ATEX', value: 'Zone 1/21 & Zone 2/22' },
            { label: 'Handle', value: 'Circumferential untuk presisi' },
            { label: 'Sumber Vakum', value: 'Khusus ATEX-rated' },
            { label: 'Sertifikasi', value: 'CE, ATEX II 2G/D' },
        ],
        features: [
            'Sertifikasi ATEX II 2G/D — zona ledakan Gas & Debu',
            'Semua komponen rated untuk atmosfer mudah terbakar',
            'Anti-static materials di seluruh sistem',
            'Circumferential handle untuk kontrol penuh',
            'Tidak ada percikan listrik — aman 100% di Ex-zones',
            'Performa setara JumboSprint versi standar',
        ],
        applications: ['Industri petrokimia & minyak', 'Pabrik bahan peledak', 'Grain & flour milling (debu)', 'Pharmaceutical production'],
        imageUrl: 'https://i.imgur.com/zL3rswg.jpeg',
    },
    {
        slug: 'palvac-sprint-hygienic',
        name: 'PalVac Sprint Hygienic',
        seriesCode: 'PalVac Sprint H',
        tagline: 'Clean room certified — HEPA filter, FDA materials, washable handle',
        description: 'PalVac Sprint Hygienic adalah solusi Schmalz untuk clean room dan lingkungan higienis paling ketat. Dilengkapi HEPA filter terintegrasi untuk mencegah kontaminasi, material FDA-compliant, dan handle yang dapat dilepas tanpa tools serta dicuci di mesin cuci.',
        capacity: 'Varies',
        highlight: 'HEPA filter + handle washable — untuk clean room',
        badge: 'Food Grade',
        heroColor: 'from-teal-500 to-cyan-700',
        specs: [
            { label: 'Filter', value: 'HEPA integrated — H14 class' },
            { label: 'Material', value: 'FDA-compliant di semua kontak permukaan' },
            { label: 'Handle', value: 'Tool-free removable, machine washable' },
            { label: 'Cleaning', value: 'Wet clean & disinfection ready' },
            { label: 'Sertifikasi', value: 'CE, FDA, Clean Room compatible' },
        ],
        features: [
            'HEPA filter H14 — mencegah partikel kontaminasi',
            'Material FDA-compliant di semua permukaan kontak',
            'Handle dapat dilepas TANPA tools — cuci di mesin cuci',
            'Guide handle tambahan untuk melepas benda kerja mudah',
            'Seluruh permukaan smooth — mudah disanitasi',
            'Kompatibel protokol clean room ISO 7 dan lebih ketat',
        ],
        applications: ['Pharmaceutical manufacturing', 'Medical device assembly', 'Semiconductor & electronics', 'Food packaging clean room'],
        imageUrl: 'https://i.imgur.com/mmOtS8Y.jpeg',
    },
    {
        slug: 'palvac-sprint',
        name: 'PalVac Sprint',
        seriesCode: 'PalVac Sprint',
        tagline: 'Untuk area basah & higienis — tahan semprot high-pressure',
        description: 'PalVac Sprint dari Schmalz dirancang untuk industri makanan dan lingkungan basah/higienis yang membutuhkan pembersihan intensif. Handle permanen dengan quick-change lock dan kemampuan disemprot dengan high-pressure cleaner menjadikannya solusi andal untuk FMCG dan food processing.',
        capacity: 'Varies',
        highlight: 'High-pressure washdown certified — untuk area basah',
        badge: 'IP69K',
        heroColor: 'from-cyan-600 to-blue-700',
        specs: [
            { label: 'Ingress Protection', value: 'IP69K — high-pressure washdown' },
            { label: 'Material', value: 'FDA-compliant, stainless steel' },
            { label: 'Handle', value: 'Permanent, gripper quick-change lock' },
            { label: 'Cleaning', value: 'High-pressure cleaner spray compatible' },
            { label: 'Sertifikasi', value: 'CE, FDA, IP69K' },
        ],
        features: [
            'Tahan semprotan high-pressure cleaner',
            'Material FDA-compliant untuk industri makanan',
            'Permanently installed handle dengan gripper quick-change lock',
            'Semua permukaan tahan korosi — SS 316L dan polimer kelas makanan',
            'Design higienis — tidak ada sudut tersembunyi',
            'Mudah dikonfigurasi untuk berbagai gripper jenis makanan',
        ],
        applications: ['Food processing & FMCG', 'Beverage industry', 'Dairy & meat processing', 'Wet manufacturing environments'],
        imageUrl: 'https://i.imgur.com/a1PkmGC.jpeg',
    },
    {
        slug: 'jumboflex-high-stack',
        name: 'JumboFlex High-Stack',
        seriesCode: 'JumboFlex HS',
        tagline: 'Optimasi ruang vertikal — stacking hingga ketinggian 255 cm',
        description: 'JumboFlex High-Stack dari Schmalz mengatasi tantangan pengangkatan dan penurunan beban di tumpukan tinggi secara ergonomis. Dengan kemampuan stacking height hingga 255 cm, solusi ini mengoptimalkan penggunaan ruang gudang vertikal tanpa risiko cedera operator.',
        capacity: 'up to 50 kg',
        highlight: 'Stacking hingga 255 cm — ergonomis tanpa risiko cedera',
        heroColor: 'from-violet-600 to-purple-800',
        specs: [
            { label: 'Kapasitas', value: 'Hingga 50 kg' },
            { label: 'Stacking Height', value: 'Hingga 255 cm' },
            { label: 'Operasi', value: 'Back-friendly lifting & lowering' },
            { label: 'Sumber Vakum', value: 'Pneumatik / Elektrik' },
            { label: 'Sertifikasi', value: 'CE, AGR' },
        ],
        features: [
            'Jangkauan vertikal hingga 255 cm stacking height',
            'Back-friendly — tidak perlu membungkuk berlebihan',
            'Ergonomis untuk operasi di warehouse dengan rak tinggi',
            'Kontrol intuitif JumboFlex untuk sekuens cepat',
            'Optimal untuk palet dan rak vertikal dalam',
            'Mengoptimalkan penggunaan space gudang secara penuh',
        ],
        applications: ['High-bay warehouse & pallet racking', 'Distribusi center & fulfillment', 'Container stuffing & unstuffing', 'Automotive parts storage'],
        imageUrl: 'https://i.imgur.com/08h0Mcp.jpeg',
    },
    {
        slug: 'jumbo-low-stack',
        name: 'Jumbo Low-Stack',
        seriesCode: 'Jumbo LS',
        tagline: 'Jangkau dalam kontainer rendah — ergonomis tanpa membungkuk',
        description: 'Jumbo Low-Stack dari Schmalz adalah solusi untuk mengambil benda kerja dari posisi rendah atau dalam kontainer yang dalam. Ideal untuk deep container picking, operator tidak perlu membungkuk jauh sehingga mengeliminasi risiko cedera punggung dalam operasi ini.',
        capacity: 'up to 80 kg',
        highlight: 'Deep container reach — jangkau rendah tanpa membungkuk',
        heroColor: 'from-emerald-600 to-teal-700',
        specs: [
            { label: 'Kapasitas', value: 'Hingga 80 kg' },
            { label: 'Reach', value: 'Low & deep container optimized' },
            { label: 'Operasi', value: 'Back-friendly, ergonomic picking' },
            { label: 'Sumber Vakum', value: 'Pneumatik / Elektrik' },
            { label: 'Sertifikasi', value: 'CE, AGR' },
        ],
        features: [
            'Dioptimalkan untuk mengambil dari posisi rendah',
            'Ideal untuk deep containers, bins, dan pallets rendah',
            'Tidak perlu membungkuk — AGR certified untuk punggung',
            'Kapasitas 80 kg — lebih dari JumboFlex standard',
            'Menjangkau sudut bawah kontainer yang sulit',
            'Compact design untuk manuver di area sempit',
        ],
        applications: ['Automotive parts picking dari bin', 'Unloading deep shipping containers', 'Ergonomic order picking', 'Assembly line benda kerja rendah'],
        imageUrl: 'https://i.imgur.com/F9jx4jL.jpeg',
    },
];
