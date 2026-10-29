export interface LocalizedProductContent {
    tagline: string;
    description: string;
    highlight?: string;
    specs?: { label: string; value: string }[];
    features?: string[];
    applications?: string[];
}

export const PRODUCT_TRANSLATIONS_ID: Record<string, LocalizedProductContent> = {
    // ── SCHMALZ MAIN CATEGORIES ──
    'vacuum-tube-lifter': {
        tagline: '9 varian kapasitas 50 kg hingga 300 kg, mulai dari ruang cleanroom hingga zona ATEX',
        description:
            'Lini Vacuum Tube Lifter Schmalz adalah salah satu seri terlengkap di industri manufaktur. Tersedia sembilan varian termasuk JumboFlex, JumboErgo, JumboSprint, JumboSprint EX (ATEX), PalVac Hygienic, High-Stack, dan Low-Stack, masing-masing dirancang khusus sesuai karakteristik workpiece dan ritme kerja pabrik.',
        specs: [
            { label: 'Kapasitas Payload', value: 'Hingga 300 kg' },
            { label: 'Sumber Vakum', value: 'Udara Bertekanan / Elektrik' },
            { label: 'Level Vakum', value: 'Hingga 85%' },
            { label: 'Sertifikasi', value: 'CE, AGR Jerman' },
            { label: 'Material Tabung', value: 'Aluminium Anodized' },
            { label: 'Suhu Operasional', value: '-10°C hingga +60°C' },
        ],
        features: [
            'Kontrol angkat dan turun yang intuitif melalui handle operator ergonomis',
            'Konfigurasi suction cup fleksibel untuk berbagai geometri workpiece',
            'Vacuum generator terintegrasi dalam opsi pneumatik maupun elektrik',
            'Katup pengaman mencegah beban jatuh apabila terjadi penurunan suplai vakum',
            'Ergonomi bersertifikat AGR Jerman untuk melindungi tulang belakang operator',
            'Kompatibel penuh dengan struktur Aluminum Crane System Schmalz',
        ],
        applications: [
            'Manufaktur dan logistik pergudangan',
            'Penanganan kaca, panel kayu, dan plat logam',
            'Lini pengemasan dan palletizing',
            'Perakitan komponen otomotif',
        ],
    },
    'vacumaster': {
        tagline: '11 varian kapasitas 100 kg hingga 2.000 kg untuk kayu, kaca, coil baja, dan panel panjang',
        description:
            'Seri Schmalz VacuMaster melayani beban industri berat melalui 11 varian: Basic, Comfort, Vario, Eco, Window, Wood, Coil, Light, Multi, Glass, dan Panel. Sistem ini diandalkan untuk pemindahan material standar hingga heavy-duty vacuum lifting berskala tonase.',
        specs: [
            { label: 'Kapasitas Payload', value: 'Hingga beberapa ton' },
            { label: 'Mekanisme Angkat', value: 'Chain Hoist terintegrasi' },
            { label: 'Konfigurasi', value: 'Modular: modul dasar + load beam + suction plate' },
            { label: 'Sertifikasi', value: 'CE, TÜV' },
            { label: 'Material Rangka', value: 'Baja konstruksi heavy-duty' },
            { label: 'Kontrol Operasi', value: 'Pendant Control / Radio Remote' },
        ],
        features: [
            'Platform dasar modular yang dapat dikonfigurasi sesuai ukuran beban',
            'Tata letak load beam dan suction plate yang mudah disesuaikan',
            'Pilihan pengoperasian melalui tombol pendant atau radio remote control',
            'Sistem penguncian dan pemantauan vakum berlapis untuk keselamatan kerja',
            'Tangguh untuk lingkungan fabrikasi dan manufaktur berat',
            'Mudah diintegrasikan langsung pada overhead crane yang sudah ada di pabrik',
        ],
        applications: [
            'Fabrikasi baja dan manufaktur alat berat',
            'Galangan kapal dan konstruksi',
            'Penanganan plat baja dan beton pracetak',
            'Industri kertas dan percetakan skala besar',
        ],
    },
    'mobile-lifting-device': {
        tagline: 'Sistem vacuum handling portabel yang fleksibel untuk area kerja dinamis',
        description:
            'Schmalz Mobile Lifting Device dirancang untuk fleksibilitas tinggi di area gudang dan pabrik yang dinamis. Dengan kapasitas hingga 50 kg dan mobilitas tinggi, unit ini dapat dipasang pada forklift/pallet truck atau dipindahkan antar stasiun kerja.',
        specs: [
            { label: 'Kapasitas Payload', value: 'Hingga 50 kg' },
            { label: 'Tipe Unit', value: 'Mobile / terpasang pada forklift atau pallet truck' },
            { label: 'Sumber Vakum', value: 'Vacuum generator terintegrasi' },
            { label: 'Sertifikasi', value: 'CE' },
            { label: 'Bobot Unit', value: 'Ringkas dan mudah dipindahkan' },
            { label: 'Daya Operasional', value: 'Baterai / Udara bertekanan' },
        ],
        features: [
            'Desain portabel untuk pemindahan cepat antar titik kerja',
            'Kompatibel dengan garpu forklift dan pallet truck standar',
            'Opsi daya baterai untuk kerja bebas kabel di area picking',
            'Setup cepat tanpa instalasi struktur crane permanen',
            'Pilihan vacuum gripper yang dapat diganti sesuai jenis barang',
            'Sangat efektif untuk operasional gudang distribusi dan logistik',
        ],
        applications: [
            'Gudang distribusi dan pusat logistik',
            'Bongkar muat armada truk dan kontainer',
            'Stasiun kerja yang sering berpindah lokasi',
            'Fasilitas produksi skala menengah',
        ],
    },
    'vacuum-generator': {
        tagline: '6 tipe generator mulai dari compact ejector hingga high-flow blower dan pompa pintar IO-Link',
        description:
            'Lini Schmalz Vacuum Generator mencakup compact ejector untuk otomasi cepat, generator terdesentralisasi, unit multi-stage berdaya hisap tinggi untuk material berpori, model pintar berfitur IO-Link, pompa vakum elektrik tanpa kompresor, hingga blower berkapasitas besar.',
        specs: [
            { label: 'Tipe Generator', value: 'Ejector, Pump, Blower' },
            { label: 'Kapasitas Hisap', value: 'Hingga 1.140 l/min (SBPL)' },
            { label: 'Vakum Maksimal', value: 'Hingga 91% (UHV-HD)' },
            { label: 'Antarmuka Data', value: 'Standard / IO-Link Class A' },
            { label: 'Sumber Tenaga', value: 'Pneumatik dan Elektrik' },
            { label: 'Sertifikasi', value: 'CE' },
        ],
        features: [
            'Compact ejector all-in-one mencakup katup hisap, blow-off, filter, dan sakelar vakum',
            'Teknologi Venturi multi-tahap untuk mengkompensasi kebocoran pada material berpori',
            'Diagnostik cerdas dan penghematan udara otomatis melalui protokol IO-Link',
            'Pembangkitan vakum elektrik tanpa memerlukan suplai kompresor udara',
            'Opsi blower aliran tinggi untuk penanganan tekstil dan busa industri',
            'Siap diintegrasikan pada lengan cobot maupun robot industri',
        ],
        applications: [
            'Otomasi pick-and-place dan lengan robotik',
            'Palletizing kardus dan panel kayu',
            'Sistem Smart Factory dan Industry 4.0',
            'Platform AGV dan robot mobile',
        ],
    },
    'crane-system': {
        tagline: 'Pondasi struktur crane dan rel aluminium rendah gesekan untuk sistem vacuum handling',
        description:
            'Schmalz Crane System dan Jib Crane aluminium dirancang sebagai infrastruktur penopang utama bagi unit vacuum lifter. Konstruksi profil aluminium anodized memberikan kekakuan struktural tinggi dengan bobot mati yang rendah, sehingga pergerakan horizontal terasa sangat ringan bagi operator.',
        specs: [
            { label: 'Material Profil', value: 'Aluminium anodized grade industri' },
            { label: 'Karakteristik Gesekan', value: 'Sangat rendah untuk pergerakan manual halus' },
            { label: 'Opsi Mounting', value: 'Dinding / Kolom Tiang / Plafon' },
            { label: 'Jangkauan Kerja', value: 'Dapat dikustomisasi (hingga 6+ meter)' },
            { label: 'Kompatibilitas', value: 'Seluruh lini Schmalz Vacuum Lifter' },
            { label: 'Sertifikasi', value: 'CE, FEM' },
        ],
        features: [
            'Profil aluminium ringan, kokoh, dan tahan korosi',
            'Bearing troli berdaya gesek sangat rendah untuk dorongan manual yang enteng',
            'Konsep modular dengan panjang bentang jib yang dapat disesuaikan',
            'Dirancang khusus agar selaras dengan karakteristik ayunan vacuum lifter Schmalz',
            'Sistem perakitan bolt-on yang mempercepat waktu instalasi di pabrik',
            'Tersedia dalam konfigurasi tiang kolom mandiri, dinding, maupun gantung plafon',
        ],
        applications: [
            'Stasiun kerja manufaktur dan sel perakitan',
            'Area pengemasan dan akhir lini produksi',
            'Titik muat dan bongkar barang (loading station)',
            'Seluruh fasilitas industri pengguna teknologi vacuum lifter',
        ],
    },
    'vacuum-suction-cups': {
        tagline: 'Komponen cengkeram vakum presisi untuk setiap karakteristik permukaan workpiece',
        description:
            'Schmalz Vacuum Suction Cups merupakan komponen kontak utama dalam sistem vacuum handling. Tersedia ratusan varian mulai dari tipe datar (flat) hingga bergelombang (bellows), serta material NBR tahan oli hingga silikon berstandar FDA untuk menyesuaikan permukaan benda kerja di pabrik.',
        specs: [
            { label: 'Pilihan Elastomer', value: 'NBR, Silikon, Viton, Polyurethane (PU)' },
            { label: 'Geometri Cup', value: 'Flat, Bellows, Oval, Deep, Spesial' },
            { label: 'Rentang Diameter', value: '10 mm hingga 250+ mm' },
            { label: 'Ketahanan Suhu', value: '-20°C hingga +200°C (tergantung material)' },
            { label: 'Sertifikasi', value: 'CE, FDA (food-grade silicone), opsi ATEX' },
            { label: 'Koneksi Ulir', value: 'G1/8 hingga G1/2 BSP' },
        ],
        features: [
            'Pilihan ukuran dan bentuk sangat lengkap untuk beragam kontur permukaan',
            'Varian material berstandar FDA untuk kontak langsung di industri makanan dan farmasi',
            'Varian tahan suhu tinggi untuk area keluar oven dan lini pengecatan',
            'Opsi material anti-statis (ESD) untuk perakitan komponen elektronik',
            'Fitting ulir standar industri untuk kemudahan penggantian suku cadang',
            'Dirancang mengikuti standar pengujian robotik ISO 9283',
        ],
        applications: [
            'End-of-Arm Tooling (EOAT) pada robot industri',
            'Mesin CNC woodworking dan pemrosesan kaca',
            'Lini pengemasan makanan dan minuman',
            'Penanganan PCB dan semikonduktor',
        ],
    },

    // ── BINAR HANDLING PRODUCTS ──
    'qla-50i-om': {
        tagline: 'Kontrol ujung jari super responsif untuk pemindahan beban ringan berfrekuensi tinggi',
        description:
            'QLA 50i OM adalah manipulator servo Binar Handling yang paling ringkas dan responsif untuk operasi angkat berulang hingga 50 kg. Dipasang menggantung (overhead) guna menghemat ruang lantai pabrik, sistem ini merespons sentuhan ringan tangan operator secara instan untuk perakitan presisi.',
        specs: [
            { label: 'Kapasitas Payload', value: 'Maks 50 kg' },
            { label: 'Radius Kerja', value: '500 - 2.700 mm' },
            { label: 'Panjang Lengan', value: '3 m (standar)' },
            { label: 'Penggerak', value: 'Motor AC Servo' },
            { label: 'Kelistrikan', value: '230V, 50-60Hz, 1-phase, 10A' },
            { label: 'Material Lengan', value: 'Ultra High Strength Steel (UHSS)' },
            { label: 'Tingkat Kebisingan', value: '< 50 dBA' },
            { label: 'Pemasangan', value: 'Overhead (plafon / struktur atas)' },
            { label: 'Sertifikasi', value: 'CE, Made in Sweden' },
        ],
        features: [
            'Respons gerakan instan tanpa memerlukan tenaga tarikan awal yang berat',
            'Mode Autobalance membuat beban terasa melayang tanpa bobot',
            'Swivel mekanis terintegrasi mencegah kabel melilit saat berputar',
            'Desain kompak untuk stasiun kerja dengan ruang terbatas',
            'Konsumsi daya listrik sangat rendah dibanding sistem pneumatik',
            'Platform perangkat lunak iLab untuk penyetelan parameter dan pemantauan',
        ],
        applications: [
            'Perakitan komponen presisi dan pengemasan',
            'Stasiun kerja dengan ruang lantai terbatas',
            'Lini produksi frekuensi tinggi (60+ siklus angkat/jam)',
            'Penanganan komponen elektronik dan sub-assembly otomotif',
        ],
    },
    'qla-100i-om': {
        tagline: 'Platform servo seimbang yang memadukan kecepatan siklus, ergonomi, dan presisi',
        description:
            'QLA 100i OM menggabungkan kecepatan, akurasi posisi, dan kendali ergonomis untuk lini produksi modern. Dengan kapasitas angkat 100 kg dan pemasangan overhead, unit ini menangani komponen kelas menengah dengan beban fisik minimal pada operator.',
        specs: [
            { label: 'Kapasitas Payload', value: 'Maks 100 kg' },
            { label: 'Radius Kerja', value: 'Dapat disesuaikan' },
            { label: 'Penggerak', value: 'Motor AC Servo Presisi' },
            { label: 'Kelistrikan', value: '230V / 400V, 50-60Hz' },
            { label: 'Material Lengan', value: 'Ultra High Strength Steel (UHSS)' },
            { label: 'Tingkat Kebisingan', value: '< 50 dBA' },
            { label: 'Pemasangan', value: 'Overhead (plafon / struktur rel)' },
            { label: 'Sertifikasi', value: 'CE, Made in Sweden' },
        ],
        features: [
            'Penggerak servo canggih untuk pergerakan naik-turun yang halus dan presisi',
            'Fungsi autobalance akurasi tinggi saat merakit komponen',
            'Arsitektur pengaman ganda pada komponen penopang utama',
            'Sensor genggaman pada handle operator untuk mencegah gerakan tidak sengaja',
            'Load cell terintegrasi dengan kontrol beban adaptif',
            'Pemakaian energi listrik yang sangat hemat',
        ],
        applications: [
            'Manufaktur komponen otomotif',
            'Penanganan plat logam dan sub-rangka',
            'Lini perakitan lintas industri',
            'Material handling di lantai produksi utama',
        ],
    },
    'qla-200i-om': {
        tagline: 'Pengangkatan servo cerdas hingga 200 kg untuk komponen industri berat',
        description:
            'QLA 200i OM dirancang untuk menangani beban kelas 200 kg dengan kontrol posisi yang tetap presisi dan ringan. Motor servo torsi tinggi bersama perangkat lunak kendali pintar mengubah pekerjaan angkat berat menjadi operasi satu tangan yang stabil.',
        specs: [
            { label: 'Kapasitas Payload', value: 'Maks 200 kg' },
            { label: 'Penggerak', value: 'Motor AC Servo Torsi Tinggi' },
            { label: 'Kelistrikan', value: '400V, 3-phase' },
            { label: 'Material Lengan', value: 'Ultra High Strength Steel (UHSS)' },
            { label: 'Tingkat Kebisingan', value: '< 50 dBA' },
            { label: 'Pemasangan', value: 'Overhead (struktur baja / crane)' },
            { label: 'Sertifikasi', value: 'CE, Made in Sweden' },
        ],
        features: [
            'Performa servo torsi tinggi untuk siklus kerja industri berat',
            'Kontrol cerdas dengan pemantauan beban secara real-time',
            'Sistem pengaman redundan pada rakitan mekanis kritis',
            'Pengoperasian autobalance yang dapat dikendalikan satu tangan',
            'Sistem iLab 3 untuk pengaturan kecepatan dan batas angkat',
            'Daya angkat besar dengan efisiensi konsumsi listrik tinggi',
        ],
        applications: [
            'Manufaktur dan perakitan alat berat',
            'Fabrikasi baja dan komponen logam',
            'Produksi mesin industri',
            'Penanganan modul otomotif berukuran besar',
        ],
    },
    'qld-300i': {
        tagline: 'Kemudi berbantuan motor 3 arah untuk pemindahan beban 300 kg tanpa menguras tenaga',
        description:
            'QLD 300i adalah platform Binar Handling untuk beban sangat berat hingga 300 kg. Sistem kemudi berbantuan motor di tiga arah memungkinkan operator menggerakkan dan memposisikan massa ratusan kilogram secara ringan dan terkendali.',
        specs: [
            { label: 'Kapasitas Payload', value: 'Maks 300 kg' },
            { label: 'Sistem Kemudi', value: 'Berbantuan motor, 3 arah pergerakan' },
            { label: 'Pemasangan', value: 'Overhead atau struktur tiang mandiri' },
            { label: 'Area Lantai', value: 'Instalasi gantung membebaskan ruang lantai' },
            { label: 'Sertifikasi', value: 'CE, Made in Sweden' },
            { label: 'Kendali', value: 'Control handle paten Binar' },
        ],
        features: [
            'Pergerakan tiga sumbu berbantuan motor elektrik',
            'Pemasangan overhead menjaga area lantai tetap lega bagi forklift',
            'Kompatibel dengan struktur tiang penopang freestanding',
            'Handle kendali paten untuk penempatan posisi milimeter',
            'Sistem proteksi berlapis untuk keamanan operator dan workpiece',
            'Manfaat ergonomi yang diakui standar kesehatan kerja Eropa',
        ],
        applications: [
            'Manufaktur industri berat',
            'Penanganan blok mesin dan transmisi besar',
            'Fabrikasi dan perakitan struktur baja',
            'Logistik komponen berat di dalam pabrik',
        ],
    },
    'qlat-350s': {
        tagline: 'Lengan manipulator bertorsi tinggi untuk profil beban hingga 350 kg',
        description:
            'QLAT 350s merupakan varian berorientasi torsi tertinggi dalam keluarga Quick-Lift Arm, dirancang khusus untuk aplikasi yang menuntut ketahanan momen beban ekstrem dan respons dinamis hingga kapasitas 350 kg.',
        specs: [
            { label: 'Kapasitas Payload', value: 'Maks 350 kg' },
            { label: 'Tipe Sistem', value: 'Torque-optimized (seri QLAT)' },
            { label: 'Material Lengan', value: 'Ultra High Strength Steel (UHSS)' },
            { label: 'Sertifikasi', value: 'CE, Made in Sweden' },
            { label: 'Kendali', value: 'Handle paten Binar + iLab' },
            { label: 'Keamanan', value: 'Redundansi ganda pada titik kritis' },
        ],
        features: [
            'Arsitektur penahan torsi tinggi untuk beban kerja tidak simetris',
            'Kapasitas tertinggi di lini lengan Binar hingga 350 kg',
            'Kompatibel dengan berbagai custom Gripdon Binar',
            'Penyetelan parameter gerak presisi melalui sistem iLab',
            'Keamanan mekanis berlapis untuk operasi beban kritis',
            'Desain swivel terintegrasi bebas kusut kabel',
        ],
        applications: [
            'Manufaktur industri berat dan pertambangan',
            'Fabrikasi baja tebal dan pengecoran logam',
            'Galangan kapal dan konstruksi berat',
            'Perakitan komponen alat berat',
        ],
    },
    'vacuum-end-effector': {
        tagline: 'End-effector vakum serbaguna untuk berbagai bentuk dan permukaan workpiece',
        description:
            'Binar Versatile Vacuum End Effector adalah unit cengkeram vakum fleksibel yang dirancang untuk menangani beragam ukuran dan kontur benda kerja. Sistem quick-connect miliknya memungkinkan pergantian alat cengkeram dalam hitungan detik tanpa kunci perkakas.',
        specs: [
            { label: 'Kapasitas Payload', value: 'Hingga 85 kg' },
            { label: 'Tipe Vakum', value: 'Pneumatik' },
            { label: 'Konektor', value: 'Binar Quick-Connect (tanpa alat)' },
            { label: 'Material Cup', value: 'NBR / Silikon' },
            { label: 'Fungsi Miring (Tilt)', value: 'Tersedia dengan pengunci sudut' },
            { label: 'Kompatibilitas', value: 'Seluruh seri QLA' },
        ],
        features: [
            'Sistem quick-connect untuk pergantian end-effector secara cepat',
            'Bekerja optimal pada permukaan datar, melengkung, maupun bertekstur',
            'Dilengkapi fungsi pengunci kemiringan (tilt-lock) untuk penempatan presisi',
            'Katup pengaman terintegrasi menjaga cengkeraman tetap terkunci',
            'Mudah dibersihkan dan dirawat oleh tim teknisi pabrik',
            'Tersedia opsi cup silikon berstandar food-grade',
        ],
        applications: [
            'Penanganan plat logam dan kaca',
            'Pengemasan dan penyusunan palet (palletizing)',
            'Perakitan komponen multi-bentuk',
            'Industri makanan dengan opsi cup silikon',
        ],
    },
    'magnetic-gripper-110': {
        tagline: 'Pencengkeram magnet elektro-permanen yang aman untuk komponen baja hingga 110 kg',
        description:
            'Binar Magnetic Gripper 110 kg memberikan cengkeraman fail-safe yang kokoh untuk material logam ferro. Tanpa bergantung pada suplai udara kompresor, sistem magnet elektro-permanen ini memastikan beban tetap tertahan aman meskipun terjadi pemadaman listrik.',
        specs: [
            { label: 'Kapasitas Payload', value: '110 kg' },
            { label: 'Tipe Magnet', value: 'Magnet Elektro-Permanen' },
            { label: 'Material Target', value: 'Baja dan logam ferro' },
            { label: 'Konsumsi Daya', value: 'Sangat rendah (hanya saat aktivasi/lepas)' },
            { label: 'Konektor', value: 'Binar Quick-Connect' },
            { label: 'Sistem Keamanan', value: 'Gaya magnet permanen bertahan saat listrik padam' },
        ],
        features: [
            'Desain magnet elektro-permanen dengan daya tahan beban fail-safe',
            'Tidak membutuhkan instalasi selang vakum maupun kompresor udara',
            'Aktivasi dan pelepasan magnet dikendalikan langsung dari handle',
            'Terhubung cepat dengan lengan angkat melalui quick-connect',
            'Sangat efektif untuk benda kerja berlubang atau kasar yang sulit divakum',
            'Minim perawatan karena tidak memiliki komponen karet aus',
        ],
        applications: [
            'Penanganan plat dan lembaran baja',
            'Pemindahan komponen mesin berbahan besi cor',
            'Lini fabrikasi, las, dan stamping logam',
            'Lingkungan kerja berminyak atau basah',
        ],
    },
    'magnetic-gripper-275': {
        tagline: 'Magnetic gripper berkapasitas 275 kg untuk komponen fabrikasi baja berat',
        description:
            'Magnetic Gripper 275 kg merupakan salah satu opsi gripdon magnet terkuat dari Binar Handling. Dengan kapasitas angkat 275 kg, unit ini dirancang untuk memindahkan komponen baja tebal di lingkungan industri berat secara aman.',
        specs: [
            { label: 'Kapasitas Payload', value: '275 kg' },
            { label: 'Tipe Magnet', value: 'Magnet Elektro-Permanen Heavy-Duty' },
            { label: 'Material Target', value: 'Baja tebal dan logam ferro' },
            { label: 'Konektor', value: 'Binar Quick-Connect' },
            { label: 'Sistem Keamanan', value: 'Cengkeraman magnet permanen saat listrik terputus' },
            { label: 'Sertifikasi', value: 'CE' },
        ],
        features: [
            'Konfigurasi unit magnet ganda untuk daya angkat hingga 275 kg',
            'Keamanan fail-safe menahan beban penuh saat suplai daya terputus',
            'Tombol aktivasi dan pelepasan terintegrasi pada handle operator',
            'Antarmuka Binar quick-connect universal',
            'Andal menangani permukaan baja yang tidak rata',
            'Tahan terhadap paparan debu gerinda dan partikel logam pabrik',
        ],
        applications: [
            'Fabrikasi struktur baja berat',
            'Penanganan billet dan komponen cor',
            'Pemindahan cetakan mold dan dies',
            'Manufaktur alat berat konstruksi dan tambang',
        ],
    },
    'vacuum-tilt-gripper': {
        tagline: 'Vacuum gripper dengan pengunci rotasi miring untuk kontrol orientasi presisi',
        description:
            'Vacuum Gripper with Tilt Lock memadukan daya cengkeram vakum yang kuat dengan mekanisme kemiringan yang dapat dikunci. Memiliki kapasitas 85 kg vertikal dan 60 kg horizontal, unit ini sangat ideal untuk membalik atau memiringkan panel selama proses perakitan.',
        specs: [
            { label: 'Kapasitas Vertikal', value: '85 kg' },
            { label: 'Kapasitas Horizontal', value: '60 kg' },
            { label: 'Rentang Kemiringan', value: '0 - 90 derajat' },
            { label: 'Mekanisme Kunci', value: 'Dapat dikunci di berbagai sudut' },
            { label: 'Sistem Vakum', value: 'Pneumatik, terintegrasi sistem Binar' },
            { label: 'Konektor', value: 'Binar Quick-Connect' },
        ],
        features: [
            'Fungsi pengunci kemiringan di sepanjang rentang kerja 0-90 derajat',
            'Mendukung pengangkatan posisi vertikal maupun horizontal dengan aman',
            'Memudahkan operator memutar orientasi panel tanpa beban puntir di pergelangan',
            'Dilengkapi katup pengaman vakum terintegrasi',
            'Pergantian end-effector cepat berkat konektor quick-connect',
            'Tersedia pilihan karet suction cup NBR, silikon, atau Viton',
        ],
        applications: [
            'Pemasangan panel pintu atau bodi dengan perubahan sudut',
            'Penanganan lembaran kaca dan akrilik',
            'Lini perakitan yang memerlukan pembalikan komponen',
            'Manufaktur furnitur dan panel kayu lapis',
        ],
    },

    // ── VACUUM TUBE LIFTER VARIANTS ──
    'jumboflex': {
        tagline: 'Kontrol satu tangan ergonomis untuk siklus pemindahan barang berkecepatan tinggi',
        description:
            'Schmalz JumboFlex terbaru menghadirkan pengoperasian satu tangan yang sangat ergonomis untuk siklus angkat cepat dan berulang. Kendali dua tombol yang intuitif memberikan respons gerak naik-turun presisi hanya dengan sentuhan jari, sangat cocok untuk lini pengemasan dan logistik berkecepatan tinggi.',
        highlight: 'Pengoperasian satu tangan dengan kontrol dua tombol yang intuitif',
    },
    'jumboflex-gen1': {
        tagline: 'Model klasik teruji dengan kontrol satu atau dua jari untuk operator tangan kanan maupun kidal',
        description:
            'JumboFlex Generation 1 adalah platform vacuum tube lifter dengan rekam jejak keandalan panjang di ribuan pabrik. Mendukung kendali satu jari atau dua jari serta dirancang simetris agar nyaman digunakan oleh operator tangan kanan maupun kidal.',
        highlight: 'Kontrol satu atau dua jari untuk pengoperasian ambidextrous',
    },
    'jumboergo': {
        tagline: 'Penanganan dinamis workpiece datar hingga 300 kg dengan opsi putar 90 derajat',
        description:
            'JumboErgo adalah solusi utama Schmalz untuk mengangkat material lembaran dan beban berat hingga 300 kg. Handle putar seperti gas sepeda motor memudahkan kontrol beban besar, ditambah opsi pemutar 90 derajat (PSE) untuk membalik posisi panel tanpa menguras tenaga operator.',
        highlight: 'Opsi swivel 90 derajat untuk memutar orientasi workpiece secara ergonomis',
    },
    'jumbosprint': {
        tagline: 'Handle lingkar 360 derajat untuk penanganan presisi karung dan komponen kompak',
        description:
            'JumboSprint dirancang khusus untuk menangani karung, drum, dan benda kerja kompak dengan kapasitas hingga 300 kg. Handle melingkar di seluruh sisi memungkinkan operator mengarahkan dan menempatkan beban secara akurat dari sudut mana pun.',
        highlight: 'Handle melingkar penuh untuk kendali presisi dari segala arah',
    },
    'jumbosprint-ex': {
        tagline: 'Vacuum tube lifter bersertifikat ATEX untuk area kerja berisiko ledakan gas dan debu',
        description:
            'JumboSprint EX adalah unit vacuum tube lifter Schmalz yang telah tersertifikasi untuk beroperasi di zona proteksi ledakan ATEX. Dirancang khusus bagi pabrik kimia, farmasi, dan penggilingan tepung yang memiliki atmosfer gas atau debu mudah terbakar.',
        highlight: 'Tersertifikasi ATEX II 2G/D untuk operasi aman di zona rawan ledakan',
    },
    'palvac-sprint-hygienic': {
        tagline: 'Desain higienis standar cleanroom dengan filtrasi HEPA dan handle yang dapat dicuci tanpa alat',
        description:
            'PalVac Sprint Hygienic direkayasa untuk memenuhi standar kebersihan ketat di ruang cleanroom makanan dan farmasi. Dilengkapi filter HEPA H14 untuk mencegah kontaminasi, material kontak berstandar FDA, serta handle yang dapat dilepas tanpa alat untuk pencucian menyeluruh.',
        highlight: 'Filtrasi HEPA H14 serta handle lepas-pasang cepat untuk sanitasi ruang bersih',
    },
    'palvac-sprint': {
        tagline: 'Solusi area basah higienis yang tahan pencucian semprot bertekanan tinggi IP69K',
        description:
            'PalVac Sprint dibangun khusus untuk industri pengolahan makanan dan area produksi basah yang rutin menjalani pembersihan intensif. Konstruksi stainless steel dan ketahanan semprot tekanan tinggi IP69K menjadikannya sangat andal di fasilitas FMCG dan pengolahan daging/susu.',
        highlight: 'Ketahanan washdown bertekanan tinggi IP69K untuk zona produksi basah',
    },
    'jumboflex-high-stack': {
        tagline: 'Optimalisasi ruang vertikal dengan jangkauan penyusunan tinggi hingga 255 cm',
        description:
            'JumboFlex High-Stack dirancang untuk mengangkat dan menyusun barang pada tumpukan palet yang tinggi. Dengan jangkauan angkat vertikal hingga 255 cm, unit ini memaksimalkan kapasitas gudang sekaligus menjaga postur punggung dan bahu operator tetap aman.',
        highlight: 'Jangkauan penyusunan vertikal ergonomis hingga ketinggian 255 cm',
    },
    'jumbo-low-stack': {
        tagline: 'Jangkauan rendah ke dalam kontainer untuk pengambilan barang tanpa membungkuk',
        description:
            'Jumbo Low-Stack direkayasa untuk mengambil barang dari posisi rendah atau bagian dasar keranjang/kontainer yang dalam. Batang ekstensi khusus memungkinkan operator menjangkau dasar wadah tanpa harus membungkukkan punggung berulang kali.',
        highlight: 'Akses ke dasar kontainer dalam tanpa postur membungkuk berlebih',
    },

    // ── VACUMASTER VARIANTS ──
    'basic': {
        tagline: 'Kontrol katup geser manual yang tangguh dan andal untuk beban hingga 750 kg',
        description:
            'VacuMaster Basic adalah sistem pengangkat vakum andalan untuk pemindahan plat dan beban industri umum. Katup geser manual yang teruji serta tuas pengaman anti-jepit memberikan kendali stabil dan keamanan tinggi dalam pemakaian harian di pabrik.',
        highlight: 'Konsep katup manual yang tangguh untuk operasi heavy-duty harian',
    },
    'comfort': {
        tagline: 'Kendali lifter dan chain hoist terintegrasi dalam satu handle dengan penghematan energi',
        description:
            'VacuMaster Comfort menyatukan tombol kendali vakum dan chain hoist ke dalam satu handle operator yang ergonomis. Fitur pengaturan vakum otomatis juga menghemat pemakaian udara kompresor/listrik saat beban sedang diangkat.',
        highlight: 'Kontrol terintegrasi satu handle untuk alur kerja yang lebih cepat dan hemat energi',
    },
    'vario': {
        tagline: 'Pengangkatan beban ekstra berat hingga 2.000 kg untuk plat baja tebal dan bilah turbin',
        description:
            'VacuMaster Vario dirancang untuk skenario pengangkatan kelas berat di pabrik fabrikasi. Sangat optimal untuk menangani benda kerja berukuran besar seperti plat baja tebal dan komponen konstruksi dengan konfigurasi beam yang dapat disesuaikan.',
        highlight: 'Platform ultra-heavy hingga 2.000 kg dengan opsi konfigurasi khusus',
    },
    'eco': {
        tagline: 'Pengangkat vakum mandiri tanpa memerlukan suplai listrik maupun udara kompresor eksternal',
        description:
            'VacuMaster Eco dirancang untuk area kerja di mana suplai listrik atau udara bertekanan terbatas. Bekerja secara mekanis memanfaatkan gaya angkat hoist untuk menciptakan vakum pada permukaan benda kerja yang kedap udara.',
        highlight: 'Beroperasi mandiri tanpa kabel listrik maupun selang kompresor udara',
    },
    'window': {
        tagline: 'Dirancang khusus untuk instalasi kaca dan jendela dengan rotasi samping terkendali',
        description:
            'VacuMaster Window dikhususkan untuk penanganan panel jendela, lembaran kaca, dan elemen fasad gedung. Kemampuan rotasi samping hingga 90 derajat memudahkan penempatan kaca secara presisi pada rangka kusen.',
        highlight: 'Akurasi penempatan kaca dan jendela dengan mekanisme rotasi 90 derajat',
    },
    'wood': {
        tagline: 'Dioptimalkan untuk papan kayu berpori dengan kompensasi kebocoran vakum otomatis',
        description:
            'VacuMaster Wood direkayasa khusus untuk industri pengolahan kayu, MDF, dan particle board yang berpori. Generator vakum teregulasi miliknya secara otomatis mengimbangi kebocoran udara melalui pori-pori kayu agar daya angkat tetap stabil.',
        highlight: 'Kompensasi kebocoran udara otomatis untuk permukaan kayu dan MDF berpori',
    },
    'coil': {
        tagline: 'Penanganan slit-coil baja dan aluminium dengan gerakan putar swivel yang presisi',
        description:
            'VacuMaster Coil dirancang khusus untuk memindahkan gulungan slit-coil baja maupun aluminium hingga 1.000 kg. Mekanisme putar kontinu hingga 90 derajat memudahkan pengumpanan coil dari posisi palet datar ke mesin stamping atau roll-forming.',
        highlight: 'Penanganan gulungan coil logam dengan kemampuan ubah posisi 90 derajat',
    },
    'light': {
        tagline: 'Model ringkas dan ringan untuk pemindahan benda kerja kedap udara hingga 100 kg',
        description:
            'VacuMaster Light adalah unit paling kompak dalam keluarga VacuMaster. Bobot matinya yang ringan memudahkan pemasangan pada crane berkapasitas kecil untuk memindahkan plat atau komponen kedap udara hingga 100 kg.',
        highlight: 'Desain kompak dan ringan untuk pemasangan langsung pada hoist standar',
    },
    'multi': {
        tagline: 'Penanganan papan kayu berat dengan opsi transportasi horizontal atau swivel 90 derajat',
        description:
            'VacuMaster Multi merupakan solusi serbaguna untuk mengangkat panel kayu struktural berat hingga 400 kg. Tersedia dalam versi angkat horizontal maupun versi swivel 90 derajat untuk menyesuaikan alur mesin pemrosesan kayu.',
        highlight: 'Kapasitas 400 kg dengan konfigurasi ganda untuk panel kayu struktural',
    },
    'glass': {
        tagline: 'Penanganan kaca proyek indoor dan outdoor dengan fleksibilitas putar dan kemiringan',
        description:
            'VacuMaster Glass dirancang untuk pemasangan kaca arsitektural di dalam pabrik maupun area proyek outdoor hingga 1.000 kg. Kombinasi fungsi swivel 90 derajat dan rotasi 360 derajat memudahkan penyetelan posisi kaca pada fasad gedung.',
        highlight: 'Penanganan kaca skala proyek hingga 1.000 kg untuk area indoor dan outdoor',
    },
    'panel': {
        tagline: 'Penanganan panel ekstra panjang hingga 14 meter dengan desain load beam modular',
        description:
            'VacuMaster Panel direkayasa untuk mengangkat sandwich panel, atap lembaran, dan elemen fasad ekstra panjang hingga 14 meter. Struktur balok modularnya mendistribusikan titik hisap secara merata agar panel panjang tidak melengkung.',
        highlight: 'Arsitektur balok modular untuk menangani panel sepanjang 14 meter dengan aman',
    },

    // ── CRANE SYSTEM VARIANTS ──
    'jib-cranes': {
        tagline: 'Jib crane kolom dan dinding berbahan aluminium ringan untuk kapasitas hingga 1.000 kg',
        description:
            'Schmalz Jib Cranes menyediakan struktur ayun yang ideal bagi sistem vacuum lifter. Tersedia dalam tipe tiang kolom mandiri maupun pasang dinding, lengan profil aluminium anodized ini memberikan pergerakan rotasi yang sangat ringan hingga kapasitas 1.000 kg.',
        highlight: 'Pemasangan kolom atau dinding dengan ayunan lengan aluminium rendah gesekan',
    },
    'aluminum-bridge-cranes': {
        tagline: 'Bridge crane aluminium modular untuk cakupan area kerja luas hingga 1.200 kg',
        description:
            'Schmalz Aluminum Bridge Cranes adalah sistem rel crane modular yang dapat dikonfigurasi untuk area kerja menengah hingga hall produksi besar. Dipasang pada plafon atau struktur portal, sistem ini memberikan pergerakan dua sumbu yang sangat ringan hingga 1.200 kg.',
        highlight: 'Arsitektur rel aluminium modular untuk jangkauan penuh di lantai produksi',
    },
    'kbg-steel-construction': {
        tagline: 'Struktur portal baja modular bentang 30 x 8,5 meter dengan kapasitas 500 kg',
        description:
            'Schmalz KBG Modular Steel Construction adalah struktur penyangga crane berbahan baja galvanis untuk area pabrik yang tidak memiliki konstruksi atap penopang. Mampu mencakup area hingga 30 x 8,5 x 5,5 meter dengan ketahanan jangka panjang.',
        highlight: 'Cakupan bentang luas 30 x 8,5 m dengan konstruksi baja galvanis mandiri',
    },
    'chain-hoists': {
        tagline: 'Chain hoist industri hingga 2.500 kg dengan sertifikasi CSA dan tinggi angkat 3.000 mm',
        description:
            'Schmalz Chain Hoists melengkapi setiap sistem crane dan VacuMaster sebagai penggerak angkat vertikal. Memiliki kapasitas hingga 2.500 kg, limit switch terintegrasi, serta sertifikasi keselamatan internasional CE dan CSA.',
        highlight: 'Kapasitas angkat 2.500 kg dengan limit switch terintegrasi untuk keamanan penuh',
    },

    // ── MOBILE LIFTING VARIANTS ──
    'jumboflex-mobile': {
        tagline: 'Tube lifter mobile yang siap beroperasi langsung dari soket listrik standar industri',
        description:
            'JumboFlex Mobile dari Schmalz adalah solusi vacuum tube lifter yang sepenuhnya dapat dipindahkan antar area kerja. Cukup hubungkan ke stopkontak listrik 220V standar, tiang kolom dapat diatur ketinggiannya secara elektrik dan lengan jib dapat dilipat ringkas saat dipindahkan.',
        highlight: 'Colok ke soket listrik standar 220V dan langsung siap digunakan di berbagai titik',
    },
    'jumboflex-picker': {
        tagline: 'Unit order-picker terpasang di forklift dengan layar sentuh dan daya mandiri',
        description:
            'JumboFlex Picker adalah vacuum tube lifter yang dirancang untuk dipasang langsung pada garpu forklift guna mempercepat proses order picking di gudang. Dilengkapi layar sentuh dan suplai baterai terintegrasi sehingga dapat berpindah lorong rak dengan leluasa.',
        highlight: 'Dipasang pada garpu forklift untuk proses order-picking cepat di lorong gudang',
    },

    // ── ROPE BALANCER VARIANTS ──
    'neo-30': {
        tagline: 'Rope balancer bertenaga baterai dengan kapasitas hingga 500 siklus angkat per pengisian',
        description:
            'Binar Handling NEO 30 adalah rope balancer elektrik praktis bertenaga baterai Li-ion. Dapat dipasang dengan cepat tanpa instalasi kabel daya tetap, dan satu kali pengisian baterai mampu melayani hingga 500 siklus angkat hingga beban 30 kg.',
        highlight: 'Hingga 500 siklus angkat per pengisian baterai dengan instalasi plug-and-play',
    },
    'quick-lift-arm-qla': {
        tagline: 'Lengan jib putar 360 derajat dengan kontrol posisi presisi tinggi hingga 300 kg',
        description:
            'Binar Handling Quick-Lift Arm QLA merupakan lengan manipulator cerdas dengan jangkauan putar 360 derajat penuh. Teknologi sensor servo miliknya memungkinkan penempatan komponen secara akurat hingga level sub-milimeter pada beban hingga 300 kg.',
        highlight: 'Jangkauan jib 360 derajat dengan kontrol posisi servo sub-milimeter',
    },
    'quick-lift-rail-qlr': {
        tagline: 'Sistem angkat cerdas terpasang di rel overhead hingga 600 kg untuk lini produksi panjang',
        description:
            'Binar Handling Quick-Lift Rail QLR dirancang untuk dipasang pada sistem rel overhead baru maupun yang sudah ada di pabrik. Dengan kapasitas hingga 600 kg, QLR sangat ideal untuk lini perakitan memanjang yang membutuhkan akurasi tinggi.',
        highlight: 'Kapasitas rel hingga 600 kg yang kompatibel dengan struktur overhead eksisting',
    },
    'ergo-glass': {
        tagline: 'Sistem angkat ergonomis khusus kaca dan panel permukaan datar dengan konfigurasi fleksibel',
        description:
            'Binar Handling Ergo-Glass dirancang khusus untuk menangani lembaran kaca dan panel berpermukaan datar secara aman. Pilihan konfigurasi gripper standar maupun kustom menjamin cengkeraman stabil untuk berbagai ukuran dan ketebalan kaca.',
        highlight: 'Dirancang khusus untuk lembaran kaca dan panel datar dengan pemantauan vakum terintegrasi',
    },

    // ── VACUUM GENERATOR VARIANTS ──
    'scps-compact-ejector': {
        tagline: 'Compact ejector all-in-one yang menyatukan katup hisap, blow-off, filter, dan sakelar vakum',
        description:
            'Compact Ejector SCPS menggabungkan katup hisap, pelepasan blow-off, filter, dan sakelar pemantau vakum dalam satu modul ringkas. Dengan laju hisap hingga 71 l/min dan vakum maksimal 85%, unit ini dirancang untuk sistem otomasi pick-and-place berkecepatan tinggi.',
        highlight: 'Integrasi all-in-one untuk sel otomasi yang ringkas dan berkecepatan tinggi',
    },
    'sbp-basic-ejector': {
        tagline: 'Compact ejector terdesentralisasi dengan laju hisap hingga 215 l/min',
        description:
            'Basic Ejector SBP adalah vacuum generator ringkas untuk sistem terdesentralisasi. Menghasilkan laju hisap hingga 215 l/min dalam bodi berbobot ringan sehingga dapat dipasang langsung di dekat titik suction cup. Varian SBP-C dilengkapi katup kontrol terintegrasi.',
        highlight: 'Pembangkit vakum terdesentralisasi yang ringan dan minim perawatan',
    },
    'sbpl-high-flow-ejector': {
        tagline: 'Ejector multi-tahap aliran tinggi 290 hingga 1.140 l/min untuk material berpori',
        description:
            'SBPL menggunakan teknologi Venturi multi-tahap untuk menghasilkan aliran hisap sangat besar mulai dari 290 hingga 1.140 l/min. Dirancang khusus untuk menangani benda kerja berpori seperti kardus karton, papan kayu, dan busa.',
        highlight: 'Performa Venturi multi-tahap untuk mengatasi kebocoran pada material berpori',
    },
    'sxpi-x-pump': {
        tagline: 'Compact ejector cerdas dengan antarmuka IO-Link Class A dan pemantauan kondisi real-time',
        description:
            'X-Pump SXPi adalah generasi compact ejector pintar dari Schmalz dengan konektivitas penuh. Antarmuka IO-Link Class A mendukung pemantauan kondisi secara langsung, diagnostik jarak jauh, serta fitur penghematan udara otomatis untuk menekan biaya kompresor.',
        highlight: 'Diagnostik IO-Link dan penghematan udara otomatis dalam satu platform cerdas',
    },
    'ecbpm-electric-pump': {
        tagline: 'Pompa vakum elektrik tanpa kompresor dengan kendali digital IO-Link',
        description:
            'ECBPMi adalah pompa vakum elektrik teregulasi yang bekerja tanpa suplai udara bertekanan. Sangat ideal untuk lengan robot kolaboratif (cobot), platform AGV mobile, serta area cleanroom yang tidak memiliki jalur pipa kompresor.',
        highlight: 'Pembangkitan vakum 100% elektrik untuk lini otomasi tanpa kompresor udara',
    },
    'sbg-vacuum-blower': {
        tagline: 'Side-channel blower berkapasitas aliran tinggi untuk material berpori ekstrem',
        description:
            'Vacuum Blower SBG menggunakan teknologi side-channel blower elektrik untuk menghasilkan volume aliran udara yang sangat besar. Beroperasi dengan tenaga listrik tanpa kompresor, sangat efektif untuk mengangkat busa tebal, karpet, dan tekstil industri.',
        highlight: 'Teknologi side-channel blower elektrik untuk penanganan material berpori tinggi',
    },

    // ── SUCTION CUP VARIANTS ──
    'flat-round': {
        tagline: 'Pencengkeraman cepat dan presisi untuk workpiece berpermukaan rata',
        description:
            'Flat Suction Cups bundar sangat ideal untuk menangani benda kerja berpermukaan rata dan halus yang membutuhkan waktu evakuasi udara singkat. Volume internalnya yang kecil memastikan cengkeraman cepat dan stabil pada siklus otomasi tinggi.',
    },
    'bellows-round': {
        tagline: 'Kompensasi ketinggian otomatis untuk permukaan tidak rata dan melengkung',
        description:
            'Bellows Suction Cups bundar memiliki lipatan bergelombang yang memberikan efek pegas dan kompensasi ketinggian otomatis. Sangat cocok untuk mengangkat benda kerja yang agak melengkung, miring, atau memiliki permukaan sensitif.',
    },
    'flat-oval': {
        tagline: 'Geometri oval ideal untuk benda kerja memanjang dan berpenampang sempit',
        description:
            'Flat Suction Cups oval dirancang khusus untuk menangani benda kerja yang panjang dan sempit seperti profil aluminium, bilah papan, dan rangka kusen, di mana cup bundar tidak memiliki ruang kontak yang cukup.',
    },
    'bellows-oval': {
        tagline: 'Cengkeraman dengan kompensasi ketinggian untuk komponen sempit dan tidak rata',
        description:
            'Bellows Suction Cups oval memadukan tapak cengkeram memanjang dengan lipatan bellows untuk kompensasi ketinggian. Solusi tepat bagi profil sempit atau komponen plastik memanjang yang memiliki variasi kontur permukaan.',
    },
    'sheet-metal': {
        tagline: 'Daya tahan geser lateral dan cengkeraman tinggi khusus lembaran plat logam',
        description:
            'Suction cup ini direkayasa khusus untuk industri sheet metal stamping dan laser cutting. Mampu mencengkeram permukaan plat logam datar maupun agak melengkung yang berminyak dengan gaya tahan vertikal dan lateral yang sangat kuat.',
    },
    'packaging': {
        tagline: 'Penanganan kardus karton, kantong plastik, film kemasan, dan blister pack',
        description:
            'Dibangun khusus untuk mesin pengemasan primer maupun sekunder. Bibir cup yang fleksibel mencengkeram kardus, kantong fleksibel, dan plastik film secara rapat tanpa merusak kemasan, serta tersedia dalam material silikon berstandar FDA.',
    },
    'electronics': {
        tagline: 'Penanganan bebas bekas (mark-free) dengan proteksi ESD untuk komponen elektronik sensitif',
        description:
            'Dirancang untuk industri perakitan PCB dan semikonduktor. Material khusus HT1-ESD dan silikon mencegah pelepasan muatan elektrostatik (ESD) sekaligus memastikan tidak ada bekas noda pada wafer maupun layar komponen.',
    },
    'bag-handling': {
        tagline: 'Cengkeraman andal untuk karung kertas, plastik, dan kantong berpori',
        description:
            'Gripper khusus untuk mengangkat karung kertas, plastik, maupun rajut yang berpori atau tidak terisi penuh. Bibir penyegel ekstra fleksibel dan saluran internalnya menjaga vakum tetap stabil pada permukaan karung yang berkerut.',
    },
    'plastic-film-paper': {
        tagline: 'Bebas bekas dan berstandar FDA untuk penanganan lembaran film plastik dan kertas',
        description:
            'Dilengkapi bibir penyegel datar yang sangat lembut dan struktur penyangga bagian dalam agar lembaran film tipis atau kertas tidak ikut terhisap masuk ke dalam saluran vakum.',
    },
    'suction-cup-wood': {
        tagline: 'Bibir penyegel khusus dan katup sensor untuk papan kayu dan MDF berpori',
        description:
            'Direkayasa untuk mesin CNC woodworking dan pemindahan papan kayu kasar, MDF, maupun particle board. Tersedia opsi katup sensor sentuh yang hanya membuka aliran vakum saat cup menempel pada permukaan kayu.',
    },
    'suction-cup-glass': {
        tagline: 'Gaya cengkeram tinggi dan bebas bekas noda untuk penanganan kaca lembaran',
        description:
            'Dirancang khusus untuk industri pemrosesan kaca lembaran, kaca tempered, dan kaca berlapis (coated glass). Material khusus bebas silikon memastikan tidak ada residu bekas cup yang mengganggu proses pelapisan kaca.',
    },
    'high-temperature': {
        tagline: 'Tahan suhu kerja ekstrem hingga 600°C untuk area keluar oven dan tempa panas',
        description:
            'Direkayasa untuk lingkungan termal ekstrem hingga 600°C menggunakan material Silicone HT, PTFE, dan serat keramik. Sangat ideal untuk mengambil komponen langsung dari oven kaca, lini pengecatan, atau proses hot stamping.',
    },
};

const SPEC_LABEL_MAP_ID: Record<string, string> = {
    'Capacity': 'Kapasitas Payload',
    'Lifting Capacity': 'Kapasitas Payload',
    'Vertical Capacity': 'Kapasitas Vertikal',
    'Horizontal Capacity': 'Kapasitas Horizontal',
    'Control': 'Kontrol Operasi',
    'Operation': 'Pengoperasian',
    'Vacuum Source': 'Sumber Vakum',
    'Certification': 'Sertifikasi',
    'Handedness': 'Orientasi Tangan',
    'Swivel': 'Rotasi Swivel',
    'Target Material': 'Material Target',
    'Target': 'Material Target',
    'Handle': 'Tipe Handle',
    'ATEX Classification': 'Klasifikasi ATEX',
    'Filter': 'Sistem Filter',
    'Material': 'Material',
    'Materials': 'Pilihan Material',
    'Cleaning': 'Metode Pembersihan',
    'Ingress Protection': 'Proteksi IP',
    'Stacking Height': 'Tinggi Penyusunan',
    'Reach': 'Jangkauan Kerja',
    'Safety': 'Sistem Keamanan',
    'Energy': 'Efisiensi Energi',
    'Savings': 'Penghematan Udara',
    'Configuration': 'Konfigurasi',
    'Power Supply': 'Suplai Daya',
    'Power': 'Suplai Daya',
    'Rotation': 'Rotasi',
    'Drive': 'Penggerak',
    'Generator': 'Vacuum Generator',
    'Aluminum Coil': 'Coil Aluminium',
    'Steel Coil': 'Coil Baja',
    'Design': 'Desain',
    'Installation': 'Instalasi',
    'Variants': 'Pilihan Varian',
    'Environment': 'Lingkungan Kerja',
    'Panel Length': 'Panjang Panel',
    'Horizontal Transport': 'Transportasi Horizontal',
    'Vertical Transport': 'Transportasi Vertikal',
    'Mounting': 'Tipe Mounting',
    'Friction': 'Tingkat Gesekan',
    'Span': 'Bentang Kerja',
    'Max Dimensions': 'Dimensi Maksimal',
    'Profile': 'Profil Baja',
    'Limit Switch': 'Limit Switch',
    'Lifting Height': 'Tinggi Angkat',
    'Duty Class': 'Kelas Operasi',
    'Column': 'Tiang Kolom',
    'Jib': 'Lengan Jib',
    'Mobility': 'Mobilitas',
    'Jib Reach': 'Jangkauan Jib',
    'Lifting Strokes': 'Siklus Angkat',
    'Brand': 'Brand',
    'Slewing Range': 'Sudut Putar',
    'Precision': 'Akurasi Posisi',
    'Travel': 'Jalur Gerak',
    'Gripper': 'Tipe Gripper',
    'Lifting': 'Karakteristik Angkat',
    'Suction Rate': 'Kapasitas Hisap',
    'Max Vacuum': 'Vakum Maksimal',
    'Body': 'Material Bodi',
    'Integrated Functions': 'Fungsi Terintegrasi',
    'Interface': 'Antarmuka Data',
    'Silencer': 'Peredam Suara',
    'Variant': 'Varian',
    'Technology': 'Teknologi',
    'Air Saving': 'Penghemat Udara',
    'Monitoring': 'Pemantauan',
    'Compressor': 'Kebutuhan Kompresor',
    'Application Focus': 'Fokus Aplikasi',
    'Flow Rate': 'Laju Aliran',
    'Vacuum': 'Level Vakum',
    'Options': 'Opsi Tambahan',
    'Shape': 'Bentuk Cup',
    'Diameter': 'Rentang Diameter',
    'Dimensions': 'Rentang Dimensi',
    'Temperature': 'Rentang Suhu',
    'Max Temperature': 'Suhu Maksimal',
    'Connection': 'Koneksi Ulir',
    'Standard': 'Standar Industri',
    'Bellows Folds': 'Lipatan Bellows',
    'Workpiece': 'Benda Kerja',
    'Workpiece Types': 'Tipe Benda Kerja',
    'Sector': 'Sektor Aplikasi',
    'ESD': 'Proteksi ESD',
    'Special Feature': 'Fitur Khusus',
    'Special': 'Fitur Khusus',
    'Application': 'Aplikasi Utama',
};

export function localizeProduct<
    T extends {
        slug: string;
        shape?: string;
        tagline: string;
        description: string;
        highlight?: string;
        specs: { label: string; value: string }[];
        features: string[];
        applications: string[];
    }
>(item: T, lang: 'en' | 'id'): T {
    if (lang !== 'id') return item;
    const key =
        item.shape && (item.slug === 'wood' || item.slug === 'glass')
            ? `suction-cup-${item.slug}`
            : item.slug;
    const tr = PRODUCT_TRANSLATIONS_ID[key] || PRODUCT_TRANSLATIONS_ID[item.slug];
    if (!tr) return item;

    return {
        ...item,
        tagline: tr.tagline || item.tagline,
        description: tr.description || item.description,
        highlight: tr.highlight || item.highlight,
        specs: tr.specs
            ? tr.specs
            : item.specs.map((s) => ({
                  label: SPEC_LABEL_MAP_ID[s.label] || s.label,
                  value: s.value,
              })),
        features: tr.features || item.features,
        applications: tr.applications || item.applications,
    };
}
