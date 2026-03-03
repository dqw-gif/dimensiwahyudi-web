// Sub-variants of Schmalz Mobile Lifting Devices
// URL: /products/schmalz/mobile-lifting-device/[variant]

export interface MobileVariant {
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

export const mobileLiftingVariants: MobileVariant[] = [
    {
        slug: 'jumboflex-mobile',
        name: 'JumboFlex Mobile',
        seriesCode: 'JumboFlex Mobile',
        tagline: 'Mobile tube lifter — flexible use at various locations via standard socket',
        description: 'JumboFlex Mobile dari Schmalz adalah solusi lift tube yang sepenuhnya mobile dan fleksibel. Cukup colokkan ke stop kontak biasa di lokasi manapun. Kolom adjustable secara elektrik dan jib arm kompak dengan posisi parkir yang ringkas memastikan dimensi transport yang minimal.',
        capacity: 'up to 50 kg',
        highlight: 'Cukup colok ke stop kontak biasa — mobile siap pakai',
        badge: 'Mobile',
        heroColor: 'from-cyan-600 to-blue-700',
        specs: [
            { label: 'Kapasitas', value: 'Hingga 50 kg' },
            { label: 'Daya', value: 'Standard industrial socket (220V)' },
            { label: 'Kolom', value: 'Adjustable height secara elektrik' },
            { label: 'Jib', value: 'Articulated-arm, compact parking position' },
            { label: 'Mobilitas', value: 'Bebas pindah lokasi' },
            { label: 'Sertifikasi', value: 'CE, AGR' },
        ],
        features: [
            'Operasi hanya dengan stop kontak industri biasa',
            'Kolom ketinggian adjustable secara elektrik',
            'Jib arm artikulasi — posisi parkir kompak',
            'Dimensi transport minimal untuk kemudahan mobilisasi',
            'Tidak butuh instalasi crane overhead permanen',
            'Ideal untuk workshop multi-area dan pabrik fleksibel',
        ],
        applications: ['Workshop dengan banyak workstation', 'Maintenance & service area', 'Produksi skala kecil-menengah', 'Area tanpa crane overhead permanen'],
        imageUrl: 'https://media.schmalz.com/MAM_Library/Products/Anwendungsbilder/Handling%20Systems/Applications/Logistics/01f071828115_Picture_Anwendungsbilder_HS_JumboFlex%20Mobile_2024_03.jpg?size=l',
    },
    {
        slug: 'jumboflex-picker',
        name: 'JumboFlex Picker',
        seriesCode: 'JumboFlex Picker',
        tagline: 'Mobile picker untuk forklift — touch display, 2 Euro-pallet, power mandiri',
        description: 'JumboFlex Picker dari Schmalz adalah solusi revolusioner — vacuum tube lifter yang dipasang langsung di garpu forklift. Layar sentuh yang jelas dan proses semi-otomatis memungkinkan picking cepat dan intuitif. Dengan power supply terintegrasi, Picker tidak tergantung jenis kendaraan apapun.',
        capacity: 'up to 50 kg',
        highlight: 'Dipasang di garpu forklift — picking semi-otomatis',
        badge: 'Forklift Mount',
        heroColor: 'from-amber-500 to-orange-700',
        specs: [
            { label: 'Kapasitas', value: 'Hingga 50 kg per pick' },
            { label: 'Mounting', value: 'Pada garpu forklift / floor conveyor' },
            { label: 'Jib Reach', value: 'Long jib — hingga 2 Euro-pallets' },
            { label: 'Kontrol', value: 'Touch display + semi-automated processes' },
            { label: 'Power', value: 'Integrated (vehicle-independent)' },
            { label: 'Sertifikasi', value: 'CE, AGR' },
        ],
        features: [
            'Clear touch display untuk operasi intuitif',
            'Proses semi-otomatis — picking lebih cepat',
            'Jib panjang — cover hingga 2 Euro-pallet sekaligus',
            'Power supply terintegrasi — tidak tergantung jenis kendaraan',
            'Mounting simple di garpu forklift standard',
            'Eliminasi cedera punggung operator picking',
        ],
        applications: ['Warehouse & distribution center', 'Order picking dari palet', 'E-commerce fulfillment', 'Loading dock palet handling'],
        imageUrl: 'https://media.schmalz.com/MAM_Library/Products/Anwendungsbilder/Handling%20Systems/Applications/Logistics/313ecaa42a10_Picture_JumboFlex-Picker_003.jpg',
    },
];
