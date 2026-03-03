export interface ProductSpec {
    label: string;
    value: string;
}

export interface BinarProduct {
    slug: string;
    name: string;
    modelCode: string;
    tagline: string;
    description: string;
    capacity: string;
    category: 'Lift Arm' | 'Gripper' | 'Accessory';
    heroColor: string;
    specs: ProductSpec[];
    features: string[];
    applications: string[];
    imageUrl: string;
}

export const binarProducts: BinarProduct[] = [
    {
        slug: 'qla-50i-om',
        name: 'Quick-Lift Arm 50i Overhead Mounted',
        modelCode: 'QLA 50i OM',
        tagline: 'Paling responsif — fingertip control untuk beban ringan',
        description: 'QLA 50i OM adalah servo lift paling responsif dan compact dari Binar Handling, dirancang khusus untuk penanganan beban hingga 50 kg dengan frekuensi tinggi. Dipasang di atas workstation untuk memaksimalkan efisiensi luas lantai, unit ini merespons niat terkecil operator dengan akurasi luar biasa.',
        capacity: '50 kg',
        category: 'Lift Arm',
        heroColor: 'from-yellow-500 to-orange-600',
        specs: [
            { label: 'Kapasitas Angkat', value: 'Max 50 kg' },
            { label: 'Jangkauan Kerja', value: '500 – 2.700 mm' },
            { label: 'Panjang Arm', value: '3 m (standard)' },
            { label: 'Motor', value: 'AC Servo motor' },
            { label: 'Daya', value: '230V, 50-60Hz, 1-phase, 10A' },
            { label: 'Material', value: 'Ultra High Strength Steel (UHSS)' },
            { label: 'Noise Level', value: '< 50 dBA' },
            { label: 'Mounting', value: 'Overhead (ceiling/structure)' },
            { label: 'Sertifikasi', value: 'CE, Made in Sweden' },
        ],
        features: [
            'Respons instan — aktivasi dengan gaya 100 gram saja',
            'Autobalance mode — beban terasa tanpa bobot',
            'Built-in mechanical swivel — no cable tangle',
            'Kompak — ideal untuk workstation terbatas',
            'Energi sangat rendah — paling eco-friendly di kelasnya',
            'iLab system untuk setting & monitoring lanjutan',
        ],
        applications: [
            'Assembly presisi dan packing',
            'Workstation dengan ruang terbatas',
            'Produksi frekuensi tinggi (60+ lifts/hour)',
            'Elektronik dan komponen kecil',
        ],
        // 📷 TODO: Upload foto ke imgur.com → salin direct link → paste di sini
        imageUrl: 'https://www.binarhandling.com/wp-content/uploads/2020/02/QLA50i_OM_utsnitt2_Gen3.png',
    },
    {
        slug: 'qla-100i-om',
        name: 'Quick-Lift Arm 100i Overhead Mounted',
        modelCode: 'QLA 100i OM',
        tagline: 'Keseimbangan sempurna antara efisiensi dan ergonomi',
        description: 'QLA 100i OM menawarkan kombinasi ideal antara kecepatan, presisi, dan kapasitas untuk lingkungan produksi modern. Dengan kapasitas 100 kg, unit overhead mounted ini memberi operator kemampuan menangani komponen menengah dengan effort minimal dan produktivitas maksimal.',
        capacity: '100 kg',
        category: 'Lift Arm',
        heroColor: 'from-orange-500 to-red-600',
        specs: [
            { label: 'Kapasitas Angkat', value: 'Max 100 kg' },
            { label: 'Jangkauan Kerja', value: 'Customizable' },
            { label: 'Motor', value: 'AC Servo — advanced model' },
            { label: 'Daya', value: '230V / 400V, 50-60Hz' },
            { label: 'Material', value: 'Ultra High Strength Steel (UHSS)' },
            { label: 'Noise Level', value: '< 50 dBA' },
            { label: 'Mounting', value: 'Overhead (ceiling/structure)' },
            { label: 'Sertifikasi', value: 'CE, Made in Sweden' },
        ],
        features: [
            'Advanced AC servo motor untuk pergerakan halus',
            'Autobalance mode dengan presisi tinggi',
            'Dual safety system pada semua komponen kritis',
            'Handle sensor yang memverifikasi sinyal operator',
            'Load cell dengan built-in autobalance',
            'Green technology — footprint rendah',
        ],
        applications: [
            'Manufaktur komponen otomotif',
            'Industri logam dan sheet metal',
            'Assembly line lintas industri',
            'Material handling di area produksi',
        ],
        // 📷 TODO: Upload foto ke imgur.com → salin direct link → paste di sini
        imageUrl: 'https://www.binarhandling.com/wp-content/uploads/2020/02/QLA_100_v2_Gen3.png',
    },
    {
        slug: 'qla-200i-om',
        name: 'Quick-Lift Arm 200i Overhead Mounted',
        modelCode: 'QLA 200i OM',
        tagline: 'Intelligent servo untuk beban industri berat',
        description: 'QLA 200i OM adalah solusi Binar Handling untuk penanganan beban 200 kg secara presisi dan ergonomis di lingkungan industri berat. Dengan teknologi servo terdepan dan sistem kontrol cerdas, unit ini mentransformasi operasi angkat berat menjadi pengalaman yang smooth dan tidak melelahkan.',
        capacity: '200 kg',
        category: 'Lift Arm',
        heroColor: 'from-red-600 to-rose-800',
        specs: [
            { label: 'Kapasitas Angkat', value: 'Max 200 kg' },
            { label: 'Motor', value: 'High-torque AC Servo' },
            { label: 'Daya', value: '400V, 3-phase' },
            { label: 'Material', value: 'Ultra High Strength Steel (UHSS)' },
            { label: 'Noise Level', value: '< 50 dBA' },
            { label: 'Mounting', value: 'Overhead (ceiling/heavy structure)' },
            { label: 'Sertifikasi', value: 'CE, Made in Sweden' },
        ],
        features: [
            'High-torque servo untuk kapasitas industrial',
            'Intelligent control system dengan software monitoring',
            'Dual safety redundancy pada semua bagian kritis',
            'Autobalance — operator cukup gunakan satu tangan',
            'iLab 3 — parameter setting yang intuitif',
            'Sustainable: konsumsi energi sangat rendah untuk kapasitasnya',
        ],
        applications: [
            'Heavy manufacturing dan heavy assembly',
            'Industri baja dan fabrikasi logam',
            'Manufaktur mesin industrial',
            'Handling komponen besar otomotif',
        ],
        // 📷 TODO: Upload foto ke imgur.com → salin direct link → paste di sini
        imageUrl: 'https://www.binarhandling.com/wp-content/uploads/2020/02/QLA_200_v2_Gen3.png',
    },
    {
        slug: 'qld-300i',
        name: 'Quick-Lift Driven 300i',
        modelCode: 'QLD 300i',
        tagline: 'Gerakkan 300 kg dengan motor-assisted 3-arah',
        description: 'QLD 300i adalah inovasi terbaru Binar Handling untuk penanganan beban sangat berat hingga 300 kg. Motor-assisted steering dalam tiga arah memungkinkan operator menggerakkan beban sebesar itu dengan effort minimal, tanpa risiko cedera tulang belakang.',
        capacity: '300 kg',
        category: 'Lift Arm',
        heroColor: 'from-rose-700 to-red-900',
        specs: [
            { label: 'Kapasitas Angkat', value: 'Max 300 kg' },
            { label: 'Motor Steering', value: 'Motor-assisted, 3-directional' },
            { label: 'Mounting', value: 'Overhead atau freestanding structure' },
            { label: 'Penghematan Lantai', value: 'Overhead mount = zero floor space' },
            { label: 'Sertifikasi', value: 'CE, Made in Sweden' },
            { label: 'Control', value: 'Patented Binar control handle' },
        ],
        features: [
            'Motor-assisted 3-directional steering',
            'Overhead mount — bebaskan area lantai produksi',
            'Dapat dipasang di freestanding structure',
            'Patented Binar control handle — milimeter precision',
            'Sistem keamanan berlapis — proteksi operator penuh',
            'Direkomendasikan oleh AGR untuk ergonomi tulang belakang',
        ],
        applications: [
            'Industri manufaktur berat',
            'Penanganan komponen mesin besar',
            'Fabrikasi dan assembly struktur besar',
            'Logistik industrial heavy-duty',
        ],
        // 📷 TODO: Upload foto ke imgur.com → salin direct link → paste di sini
        imageUrl: 'https://www.binarhandling.com/wp-content/uploads/2020/02/QLA_300_v2_Gen3.png',
    },
    {
        slug: 'qlat-350s',
        name: 'Quick-Lift Arm Torque 350s',
        modelCode: 'QLAT 350s',
        tagline: 'Torque version untuk aplikasi paling demanding',
        description: 'QLAT 350s adalah varian torque dari lini Quick-Lift Arm Binar Handling, dirancang untuk aplikasi yang membutuhkan kecepatan dan torsi tinggi secara bersamaan. Dengan kapasitas 350 kg, ini adalah solusi paling powerful di rangkaian Binar untuk lingkungan industri paling demanding.',
        capacity: '350 kg',
        category: 'Lift Arm',
        heroColor: 'from-slate-800 to-slate-950',
        specs: [
            { label: 'Kapasitas Angkat', value: 'Max 350 kg' },
            { label: 'Tipe', value: 'Torque-optimized (QLAT series)' },
            { label: 'Material', value: 'Ultra High Strength Steel (UHSS)' },
            { label: 'Sertifikasi', value: 'CE, Made in Sweden' },
            { label: 'Control', value: 'Binar patented handle + iLab' },
            { label: 'Safety', value: 'Dual redundancy all critical parts' },
        ],
        features: [
            'Torque-optimized design untuk tugas paling berat',
            'Kapasitas tertinggi di lini Binar (350 kg)',
            'Kompatibel dengan semua gripdon Binar',
            'iLab parameter control untuk fine-tuning',
            'Safety redundancy pada semua komponen kritis',
            'Swivel anti-tangle built-in',
        ],
        applications: [
            'Heavy industrial manufacturing',
            'Steel & heavy metal fabrication',
            'Ship building dan konstruksi berat',
            'Mining equipment handling',
        ],
        // 📷 TODO: Upload foto ke imgur.com → salin direct link → paste di sini
        imageUrl: 'https://www.binarhandling.com/wp-content/uploads/2020/02/QLRt350s_v2_Gen3.png',
    },
    {
        slug: 'vacuum-end-effector',
        name: 'Versatile Vacuum End Effector',
        modelCode: 'VEE Series',
        tagline: 'Gripdon vakum serbaguna untuk semua permukaan',
        description: 'Versatile Vacuum End Effector dari Binar Handling adalah gripdon vakum yang dirancang untuk memiliki fleksibilitas tinggi, mampu menangani berbagai jenis dan bentuk benda kerja. Sistem quick-connect memungkinkan penggantian cepat tanpa tools khusus.',
        capacity: 'up to 85 kg',
        category: 'Gripper',
        heroColor: 'from-blue-600 to-cyan-700',
        specs: [
            { label: 'Kapasitas', value: 'Up to 85 kg' },
            { label: 'Tipe Vakum', value: 'Pneumatic vacuum' },
            { label: 'Koneksi', value: 'Binar quick-connect (tanpa tools)' },
            { label: 'Material Cup', value: 'NBR / Silikon' },
            { label: 'Tilt Function', value: 'Available dengan locking' },
            { label: 'Kompatibilitas', value: 'Semua QLA series' },
        ],
        features: [
            'Quick-connect system — ganti gripper dalam detik',
            'Multi-surface: flat, curved, textured',
            'Tilt lock function untuk penempatan presisi',
            'Safety valve built-in — beban aman saat vakum turun',
            'Mudah dibersihkan dan dirawat',
            'Tersedia dalam varian silikon untuk food-grade',
        ],
        applications: [
            'Handling sheet metal dan kaca',
            'Packaging dan palletizing',
            'Assembly komponen berbagai bentuk',
            'Industri makanan (silikon grade)',
        ],
        // 📷 TODO: Upload foto ke imgur.com → salin direct link → paste di sini
        imageUrl: 'https://www.binarhandling.com/wp-content/uploads/2020/03/Vacuum_Versatile_end_effector_II.jpg',
    },
    {
        slug: 'magnetic-gripper-110',
        name: 'Magnetic Gripper 110 kg',
        modelCode: 'MAG-110',
        tagline: 'Cengkeraman magnetik untuk material ferrous',
        description: 'Magnetic Gripper 110 kg dari Binar Handling memberikan solusi penanganan yang kuat dan andal untuk semua material besi/baja. Tanpa vakum, tanpa udara tekan — hanya kekuatan magnet yang powerful dan aman.',
        capacity: '110 kg',
        category: 'Gripper',
        heroColor: 'from-purple-600 to-indigo-700',
        specs: [
            { label: 'Kapasitas', value: '110 kg' },
            { label: 'Tipe', value: 'Electro-permanent magnet' },
            { label: 'Material Target', value: 'Besi, baja, material ferrous' },
            { label: 'Daya', value: 'Low power consumption' },
            { label: 'Koneksi', value: 'Binar quick-connect' },
            { label: 'Safety', value: 'Permanent magnet — aman saat listrik mati' },
        ],
        features: [
            'Electro-permanent magnet — aman saat power failure',
            'Tidak butuh vakum atau udara tekan',
            'Aktivasi dan deaktivasi elektrik',
            'Quick-connect — mudah pasang/lepas dari arm',
            'Cocok untuk permukaan yang tidak bisa di-vakum',
            'Low maintenance — tanpa seal yang aus',
        ],
        applications: [
            'Sheet metal dan pelat baja',
            'Komponen mesin berbahan besi',
            'Industri fabrikasi dan stamping',
            'Lingkungan basah/berminyak yang tidak cocok untuk vakum',
        ],
        // 📷 TODO: Upload foto ke imgur.com → salin direct link → paste di sini
        imageUrl: 'https://www.binarhandling.com/wp-content/uploads/2020/12/Fixed-Magnetic-End-Effector-110-kg.jpg',
    },
    {
        slug: 'magnetic-gripper-275',
        name: 'Magnetic Gripper 275 kg',
        modelCode: 'MAG-275',
        tagline: 'Kekuatan magnetik untuk tugas benar-benar berat',
        description: 'Magnetic Gripper 275 kg adalah produk Binar terkuat dalam kategori magnet gripper. Dengan kapasitas 275 kg, gripdon ini mampu menangani material ferrous dengan ukuran dan berat yang sangat signifikan dalam lingkungan industri berat.',
        capacity: '275 kg',
        category: 'Gripper',
        heroColor: 'from-violet-700 to-purple-900',
        specs: [
            { label: 'Kapasitas', value: '275 kg' },
            { label: 'Tipe', value: 'Electro-permanent magnet (heavy-duty)' },
            { label: 'Material Target', value: 'Besi, baja, material ferrous' },
            { label: 'Koneksi', value: 'Binar quick-connect' },
            { label: 'Safety', value: 'Permanent magnet — fail-safe' },
            { label: 'Sertifikasi', value: 'CE' },
        ],
        features: [
            'Dual magnet unit untuk kapasitas 275 kg',
            'Fail-safe — magnet permanent menjaga beban saat listrik mati',
            'Aktivasi/deaktivasi via tombol di control handle',
            'Quick-connect universal Binar',
            'Cocok untuk material permukaan tidak rata',
            'Tahan debu dan percikan logam',
        ],
        applications: [
            'Heavy-duty steel fabrication',
            'Penanganan billet dan bloom baja',
            'Mold dan die handling',
            'Industri berat — konstruksi & mining equipment',
        ],
        // 📷 TODO: Upload foto ke imgur.com → salin direct link → paste di sini
        imageUrl: 'https://www.binarhandling.com/wp-content/uploads/2017/06/magnetgripdon_275kg.png',
    },
    {
        slug: 'vacuum-tilt-gripper',
        name: 'Vacuum Gripper with Tilt Lock',
        modelCode: 'VAC-TILT 85/60',
        tagline: 'Vakum dengan tilt lock untuk penempatan presisi',
        description: 'Vacuum Gripper with Tilt Lock adalah solusi premium Binar Handling yang menggabungkan kekuatan vakum dengan kemampuan tilt yang dapat dikunci. Kapasitas 85 kg vertikal / 60 kg horizontal, sempurna untuk operasi placement yang membutuhkan perubahan orientasi beban.',
        capacity: '85 kg (vert) / 60 kg (horiz)',
        category: 'Gripper',
        heroColor: 'from-teal-600 to-emerald-700',
        specs: [
            { label: 'Kapasitas Vertikal', value: '85 kg' },
            { label: 'Kapasitas Horizontal', value: '60 kg' },
            { label: 'Tilt Range', value: '0° – 90°' },
            { label: 'Lock Mechanism', value: 'Lockable tilt — aman di semua sudut' },
            { label: 'Vakum', value: 'Pneumatic, kompatibel semua sistem Binar' },
            { label: 'Koneksi', value: 'Binar quick-connect' },
        ],
        features: [
            'Tilt function lockable di semua posisi sudut',
            'Dual capacity: 85 kg vertikal, 60 kg horizontal',
            'Ideal untuk flipping dan reorienting beban',
            'Vakum safety valve bawaan',
            'Quick-connect untuk penggantian cepat',
            'Semua material cup tersedia (NBR, silikon, Viton)',
        ],
        applications: [
            'Penempatan panel dengan orientasi berbeda',
            'Glass dan material transparan',
            'Assembly yang butuh rotasi benda kerja',
            'Industri furnitur dan kayu lapis',
        ],
        // 📷 TODO: Upload foto ke imgur.com → salin direct link → paste di sini
        imageUrl: 'https://www.binarhandling.com/wp-content/uploads/2017/06/Produkter-med-bakgrund-for-hemsida-2022.jpg',
    },
];
