export interface Project {
    id: string;
    client: string;
    industry: string;
    image: string;
    logo: string;
    size: string;
    desc: string;
    color: string;
}

export const projects: Project[] = [
    {
        id: 'fmcg-mayora',
        client: 'PT Mayora Indah',
        industry: 'FMCG & F&B',
        image: '/projects/PT Mayora Indah.jpeg',
        logo: 'https://www.mayoraindah.co.id/assets/frontend/images/logo.png',
        size: 'large',
        desc: 'Optimalisasi lini produksi dan packaging pada barang konsumsi harian. Alur material handling ritme tinggi yang mengurangi tingkat kerusakan produk (product damage).',
        color: 'blue'
    },
    {
        id: 'auto-gt',
        client: 'PT Gajah Tunggal',
        industry: 'Otomotif & Kendaraan',
        image: '/projects/PT Gajah Tunggal.jpg',
        logo: 'https://www.gt-tires.com/wp-content/themes/gajahtunggal/images/corporate_logo.png',
        size: 'tall',
        desc: 'Tire manufacturing handling: Memaksimalkan kecepatan assembly line sembari menihilkan resiko cedera tulang belakang (ergonomi) pada lintasan produksi ban.',
        color: 'red'
    },
    {
        id: 'auto-gt-1',
        client: 'PT Gajah Tunggal',
        industry: 'Otomotif & Kendaraan',
        image: '/projects/PT Gajah Tunggal (1).jpg',
        logo: 'https://www.gt-tires.com/wp-content/themes/gajahtunggal/images/corporate_logo.png',
        size: 'standard',
        desc: 'Penanganan raw material karet mentah pada tahap mixing. Aplikasi hoist khusus untuk lingkungan dengan partikel debu karbon yang pekat.',
        color: 'red'
    },
    {
        id: 'auto-gt-2',
        client: 'PT Gajah Tunggal',
        industry: 'Otomotif & Kendaraan',
        image: '/projects/PT Gajah Tunggal (2).jpg',
        logo: 'https://www.gt-tires.com/wp-content/themes/gajahtunggal/images/corporate_logo.png',
        size: 'standard',
        desc: 'Sistem pengangkat ban dalam proses pematangan (curing pres). Menjaga integritas bentuk ban saat suhu operasional sedang tinggi.',
        color: 'red'
    },
    {
        id: 'aviasi-ap2',
        client: 'PT Angkasa Pura II',
        industry: 'Logistik Udara',
        image: '/projects/PT Angkasa Pura II.jpg',
        logo: 'https://upload.wikimedia.org/wikipedia/id/thumb/a/a6/Angkasa_Pura_II_logo_2014.svg/3840px-Angkasa_Pura_II_logo_2014.svg.png',
        size: 'standard',
        desc: 'Kelancaran operasional tingkat tinggi untuk kargo bandara, berfokus mengurangi beban repetitif (RSI) pada petugas lapangan.',
        color: 'sky'
    },
    {
        id: 'kaca-asahimas',
        client: 'PT Asahimas Flat Glass Tbk',
        industry: 'Kaca & Material Solid',
        image: '/projects/PT Asahimas Flat Glass Tbk.jpeg',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Logo_Asahimas_Flat_Glass_Tbk.png',
        size: 'large',
        desc: 'Solusi pengangkat lembaran kaca masif. Hisapan mendistribusikan beban merata, menjauhkan resiko retak dan goresan mematikan di area perakitan berat.',
        color: 'slate'
    },
    {
        id: 'fmcg-unilever',
        client: 'PT Unilever Indonesia Tbk',
        industry: 'FMCG & F&B',
        image: '/projects/PT Unilever Indonesia Tbk.jpeg',
        logo: 'https://upload.wikimedia.org/wikipedia/id/3/37/Unilever.png',
        size: 'standard',
        desc: 'Sistem handling higienis dan cepat untuk fasilitas produksi modern dengan standar keselamatan operasional global Unilever.',
        color: 'blue'
    },
    {
        id: 'kimia-nikka',
        client: 'PT. Indonesia Nikka Chemicals',
        industry: 'Kimia & Farmasi',
        image: '/projects/PT. Indonesia Nikka Chemicals.jpg',
        logo: 'https://img2.lokercepat.id/files/2023-11-11/pt-indonesia-nikka-chemicals-inkali-382.jpg',
        size: 'tall',
        desc: 'Pemindahan material bahan kimia tekstil. Sistem vakum memastikan grip drum kuat tanpa tumpah, menjaga keselamatan ganda pabrik kimia.',
        color: 'emerald'
    },
    {
        id: 'auto-gs',
        client: 'PT GS Battery',
        industry: 'Otomotif & Kendaraan',
        image: '/projects/PT GS Battery.jpg',
        logo: 'https://www.gs.astra.co.id/media/dzpc02gq/gs-battery-logo.png',
        size: 'standard',
        desc: 'Pengangkatan komponen padat perakitan aki kendaraan dengan presisi, menjaga keamanan arus lini produksi kontinu.',
        color: 'red'
    },
    {
        id: 'fmcg-nestle',
        client: 'PT Nestle Indonesia',
        industry: 'FMCG & F&B',
        image: '/projects/PT NESTLE.jpg',
        logo: 'https://www.nestle.co.id/themes/custom/da_vinci_code/logo.svg',
        size: 'standard',
        desc: 'Bantuan mekanis di fasilitas pengemasan gizi dan nutrisi dengan ketaatan penuh pada zona bersih (clean zone) makanan.',
        color: 'blue'
    },
    {
        id: 'packaging-hokkan',
        client: 'PT Hokkan Indonesia',
        industry: 'Kemasan & Plastik',
        image: '/projects/PT HOKKAN INDONESIA.jpg',
        logo: 'https://www.hokkan.co.id/images/logo.jpg',
        size: 'large',
        desc: 'Penanganan khusus manufaktur kemasan botol PET untuk asupan konveyor High-Speed Filling berkapasitas masif tanpa interupsi.',
        color: 'indigo'
    },
    {
        id: 'kayu-taco',
        client: 'PT Taco Anugrah Corporindo',
        industry: 'Furnitur & Interior',
        image: '/projects/PT Taco Anugrah Corporindo.jpg',
        logo: 'https://manage.taco.co.id/asset-images/logo.svg',
        size: 'tall',
        desc: 'Akselerasi mobilitas lembaran HPL berpori. Handling anti-gesek (non-marking) yang merawat kehalusan hasil produk material arsitektur.',
        color: 'amber'
    },
    {
        id: 'farmasi-otsuka',
        client: 'PT Otsuka Indonesia',
        industry: 'Kimia & Farmasi',
        image: '/projects/PT Otsuka Indonesia.jpeg',
        logo: 'https://www.otsuka.co.id/themes/otsuka/assets/img/otsuka.png',
        size: 'standard',
        desc: 'Alat angkat stainless di area sanitasi tinggi (Cleanroom) untuk menunjang regulasi produksi nutrisi klinis dan farmasi.',
        color: 'teal'
    },
    {
        id: 'kimia-mowilex',
        client: 'PT Mowilex Indonesia',
        industry: 'Kimia & Farmasi',
        image: '/projects/PT Mowilex Indonesia.jpg',
        logo: 'https://mowilex.com/wp-content/themes/movi/images/MowilexPremiumPaints.webp',
        size: 'standard',
        desc: 'Rotasi dan pemindahan cairan pelapis (Cat) ritme tinggi di pabrik tanpa membahayakan fisik operator dari kelelahan punggung.',
        color: 'emerald'
    },
    {
        id: 'fmcg-yakult',
        client: 'PT Yakult Indonesia Persada',
        industry: 'FMCG & F&B',
        image: '/projects/PT Yakult Indonesia Persada.jpg',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Yakult-Logo.svg',
        size: 'standard',
        desc: 'Infrastruktur lifting steril untuk penanganan curah rantai pasok dalam lingkungan pabrik minuman probiotik terdepan.',
        color: 'blue'
    },
    {
        id: 'fmcg-nutrifood',
        client: 'PT Nutrifood Indonesia',
        industry: 'FMCG & F&B',
        image: '/projects/PT Nutrifood Indonesia.jpeg',
        logo: 'https://www.nutrifood.co.id/wp-content/themes/nutrifood/images/logo-nutrifood.png',
        size: 'standard',
        desc: 'Integrasi solusi vacuum ergonomics untuk mendukung mobilitas material di sentra produksi asupan nutrisi kesehatan.',
        color: 'blue'
    },
    {
        id: 'fmcg-nutribev',
        client: 'PT Nutribev Nabati Indonesia',
        industry: 'FMCG & F&B',
        image: '/projects/PT Nutribev Nabati Indonesia.jpg',
        logo: 'https://www.nabatisnack.co.id/assets/icons/ic-nabati.png',
        size: 'large',
        desc: 'Mekanika pengangkatan beban tumpukan kardus dan karung pada sektor makanan ringan (Nabati) super-cepat untuk kejar target output.',
        color: 'blue'
    },
    {
        id: 'kimia-cabot',
        client: 'PT Cabot Indonesia',
        industry: 'Kimia & Farmasi',
        image: '/projects/PT Cabot Indonesia.png',
        logo: 'https://companieslogo.com/img/orig/CBT_BIG-f438266d.png?t=1720244491',
        size: 'standard',
        desc: 'Penanganan raw material bahan dasar kimia sintetik skala besar. Mengamankan rantai pasok dari kebocoran berlebih di area pabrik.',
        color: 'emerald'
    },
    {
        id: 'kayu-permata',
        client: 'PT Kayu Permata',
        industry: 'Furnitur & Interior',
        image: '/projects/PT Kayu Permata.png',
        logo: 'https://www.permatadoor.com/wp-content/themes/permata_door/assets/images/svg/permata_door.svg',
        size: 'standard',
        desc: 'Kemudahan rotasi panel kayu solid. Meringankan beban fisik pekerja dari cidera pada alur produksi pintu dan furnitur premium.',
        color: 'amber'
    },
    {
        id: 'fmcg-multibintang',
        client: 'PT Multi Bintang Indonesia Tbk',
        industry: 'FMCG & F&B',
        image: '/projects/PT Multi Bintang Indonesia Tbk.png',
        logo: 'https://cdn.cookielaw.org/logos/00afdec3-358f-4f2d-8b63-0c71e6f49172/019808a1-d0bd-747f-b424-020636e1ab33/8a3915b9-9563-470f-8efd-2af699d3f08e/multibintang.png',
        size: 'large',
        desc: 'Efisiensi perpindahan multi-krat dan kegs pada jalur produksi minuman cepat saji. Meminimalisir guncangan material dan produk.',
        color: 'blue'
    },
    {
        id: 'farmasi-dsm',
        client: 'PT. DSM Firmenich Aromatics',
        industry: 'Kimia & Farmasi',
        image: '/projects/PT. DSM Firmenich Aromatics.jpg',
        logo: 'https://www.dsm-firmenich.com/content/dam/dsm-firmenich/logos/logo-black.svg',
        size: 'standard',
        desc: 'Lifting drum nutrisi dan perisa (aromatics) secara higienis menggunakan hoist tersertifikasi yang sesuai dengan kriteria kebersihan tinggi.',
        color: 'teal'
    },
    {
        id: 'auto-federal',
        client: 'PT. Federal Karyatama',
        industry: 'Otomotif & Kendaraan',
        image: '/projects/PT. Federal Karyatama.jpg',
        logo: 'https://federaloil.co.id/themes/web/desktop2020/new/assets/collections/default/fo-logo-2.png',
        size: 'tall',
        desc: 'Pemindahan masif drum karton oli Federal. Sistem mekanis ini menjamin kekuatan cengkraman demi nol insiden (Zero Accident).',
        color: 'red'
    },
    {
        id: 'packaging-fukusuke',
        client: 'PT. Fukusuke Kogyo Indonesia',
        industry: 'Kemasan & Plastik',
        image: '/projects/PT. Fukusuke Kogyo Indonesia.png',
        logo: 'https://kemindogroup.id/wp-content/uploads/2020/09/logo-client-kemindo-8.png',
        size: 'standard',
        desc: 'Bantuan angkat roll (gulungan) material film kemasan yang berat pada mesin konversi plastik ekstrusi.',
        color: 'indigo'
    },
    {
        id: 'fmcg-indofood',
        client: 'PT. Indofood CBP Sukses Makmur',
        industry: 'FMCG & F&B',
        image: '/projects/PT. Indofood CBP Sukses.jpg',
        logo: 'https://www.indofoodcbp.com/images/btn/logo-indofoodcbp.png',
        size: 'large',
        desc: 'Standardisasi proses loading/unloading ribuan dus mie instan. Akurasi penempatan logistik dengan efisiensi tenaga kerja manusia.',
        color: 'blue'
    },
    {
        id: 'fmcg-mars',
        client: 'PT. Mars Symbioscience',
        industry: 'FMCG & F&B',
        image: '/projects/PT. Mars Symbiocince.jpg',
        logo: 'https://wikiexport.ai/wp-content/uploads/2022/10/15-1170x600.png',
        size: 'standard',
        desc: 'Inovasi penanganan karung kakao (raw cocoa) volume raksasa untuk line suplai pabrik permen cokelat internasional.',
        color: 'blue'
    },
    {
        id: 'agrikultur-nufarm',
        client: 'PT. Nufarm Indonesia',
        industry: 'Kimia & Farmasi',
        image: '/projects/PT. Nufarm.jpg',
        logo: 'https://nufarm.com/id/wp-content/themes/nufarm/images/site-logo.svg',
        size: 'standard',
        desc: 'Mobilitas pengemasan produk pestisida. Menambahkan kontrol perlindungan operator secara proaktif dari bahan kimia agrikultur beresiko.',
        color: 'emerald'
    },
    {
        id: 'auto-sakae',
        client: 'PT. Sakae Riken Indonesia',
        industry: 'Otomotif & Kendaraan',
        image: '/projects/PT. Sakae Riken Indonesia.jpg',
        logo: 'https://www.sakaeriken.co.jp/assets/img/common/logo/logo-site.png',
        size: 'standard',
        desc: 'Optimalisasi perakitan molding aksesoris resin otomotif, di mana Vacuum Grip mencegah kerusakan (lecet) pada bumper mengilat mobil.',
        color: 'red'
    },
    {
        id: 'fmcg-suntory',
        client: 'PT. Suntory Garuda',
        industry: 'FMCG & F&B',
        image: '/projects/PT. Suntory Garuda.png',
        logo: 'https://www.vhv.rs/dpng/d/73-737965_garudafood-logo-png-transparent-png.png',
        size: 'large',
        desc: 'Kelancaran palletizing krat botol minuman energi/teh ritme massal dengan siklus otomatisasi alat handling yang meminimalisir defect.',
        color: 'blue'
    },
    {
        id: 'pipa-bredero',
        client: 'PT Bredero Shaw Indonesia',
        industry: 'Industri Berat & Otomasi',
        image: '/projects/PT Bredero.jpg',
        logo: 'https://karir-production.nos.jkt-1.neo.id/logos/22/1264222/Bredero_Shaw_Indonesia_01.png',
        size: 'large',
        desc: 'Sistem pengangkatan pipa baja berat (pipe coating) yang memastikan keamanan penuh di area operasional skala masif.',
        color: 'slate'
    },
    {
        id: 'fmcg-delifood',
        client: 'PT Delifood Sentosa Corpindo',
        industry: 'FMCG & F&B',
        image: '/projects/PT Delifood.jpg',
        logo: 'https://cdn0-production-images-kly.akamaized.net/TpRMBHzC6SCc6V4oTvo3-KIt8kE=/2560x1440/smart/filters:quality(75):strip_icc()/kly-media-production/medias/4243444/original/067506700_1669705672-logo_mayora.jpg',
        size: 'standard',
        desc: 'Fasilitas loading bahan baku makanan yang memadukan kecepatan tinggi dengan ergonomi punggung pekerja.',
        color: 'blue'
    },
    {
        id: 'fmcg-diageo',
        client: 'PT Diageo Indonesia',
        industry: 'FMCG & F&B',
        image: '/projects/PT Diageo Indonesia.jpg',
        logo: 'https://cdn.getamigo.io/ggr/rebuild/client-story-imgs/diageo-hero.webp',
        size: 'standard',
        desc: 'Penanganan keg dan krat minuman berat demi akselerasi logistik pergudangan tanpa celah.',
        color: 'blue'
    },
    {
        id: 'auto-elang',
        client: 'PT Elangperdana Tyre Industry',
        industry: 'Otomotif & Kendaraan',
        image: '/projects/PT Elang Perdana Tyre.jpg',
        logo: 'https://admin.zeetex-radial.com/storage/page-contents/February2021/hcwzrhzeJOolozrpB7p5.png',
        size: 'tall',
        desc: 'Mobilitas ban mentah dan matang anti deformasi. Handing akurat menjaga standar keselamatan maksimal pabrik.',
        color: 'red'
    },
    {
        id: 'kimia-hempel',
        client: 'PT Hempel Indonesia',
        industry: 'Bahan Bangunan & Infrastruktur',
        image: '/projects/PT Hempel Indonesia.jpg',
        logo: 'https://image1ws.indotrading.com/s3/webp/co19822/companylogo/w400-h220/logo.jpg',
        size: 'standard',
        desc: 'Keseimbangan dalam distribusi kaleng dan drum cat raksasa dengan grip vakum berpresisi tinggi.',
        color: 'emerald'
    },
    {
        id: 'auto-robotic',
        client: 'PT Industrial Robotic Automation',
        industry: 'Industri Berat & Otomasi',
        image: '/projects/PT Industrial Robotic Automation.jpg',
        logo: 'https://i.imgur.com/7Jpv5Qg.jpeg',
        size: 'standard',
        desc: 'Integrasi lifting pintar tersertifikasi yang sesuai dengan line perakitan otomasi 4.0 tingkat lanjut.',
        color: 'slate'
    },
    {
        id: 'manufaktur-inoac',
        client: 'PT Inoac Polytechno Indonesia',
        industry: 'Kemasan & Plastik',
        image: '/projects/PT Inoac.jpg',
        logo: 'https://www.inoac.co.jp/common/img/logo.svg',
        size: 'large',
        desc: 'Pemindahan blok busa/spons (polyurethane) bervolume ekstra besar tanpa distorsi pada struktur material fabrikasi.',
        color: 'amber'
    },
    {
        id: 'farmasi-kalbe',
        client: 'PT Kalbe Morinaga Indonesia',
        industry: 'Kimia & Farmasi',
        image: '/projects/PT Kalbe Morinaga.jpg',
        logo: 'https://kalbenutritionals.com/images/kalbe-nutritionals-logo.png',
        size: 'standard',
        desc: 'Sistem handling clean room dengan spesifikasi material stainless steel, menjamin sterilisasi area produksi susu formula.',
        color: 'teal'
    },
    {
        id: 'kaca-kian',
        client: 'PT Kian Mulia Manunggal',
        industry: 'Kaca & Material Solid',
        image: '/projects/PT Kian Mulia Manunggal.jpg',
        logo: 'https://www.temposcangroup.com/public/images/LOGO_TEMPO_SCAN_100_INDONESIA.png',
        size: 'tall',
        desc: 'Akurasi handling kaca lembaran rapuh skala proyek infrastruktur, menghilangkan insiden pecah kaca di tapak pabrik.',
        color: 'slate'
    },
    {
        id: 'fmcg-meiji',
        client: 'PT Meiji Food Indonesia',
        industry: 'FMCG & F&B',
        image: '/projects/PT Meiji Food Indonesia.jpg',
        logo: 'https://meiji.co.id/storage/public/generals/eY0Fj5yMvi7ZPSz9zNcI9RSoYvYQIuQb2cMEKCTl.png',
        size: 'standard',
        desc: 'Palletisasi kardus biskuit ritme tinggi yang mengurangi bottleneck di akhir lini produksi makanan ringan.',
        color: 'blue'
    },
    {
        id: 'konstruksi-mortar',
        client: 'PT Cipta Mortar Utama',
        industry: 'Bahan Bangunan & Infrastruktur',
        image: '/projects/PT Mortar Utama.jpg',
        logo: 'https://www.mortarutama.com/wp-content/uploads/2023/12/logo-MU-new-hires-01-1536x635.png',
        size: 'large',
        desc: 'Manipulasi tumpukan sak semen instan (mortar). Perlindungan punggung operator di area berdebu ekstrem.',
        color: 'stone'
    },
    {
        id: 'fmcg-nutrifood2',
        client: 'PT Nutrifood Indonesia',
        industry: 'FMCG & F&B',
        image: '/projects/PT Nutrifood Indonesia.jpg',
        logo: 'https://www.nutrifood.co.id/wp-content/themes/nutrifood/images/logo-nutrifood.png',
        size: 'standard',
        desc: 'Integrasi lini packaging produk minuman serbuk dengan flow material yang higienis serta bebas hambatan.',
        color: 'blue'
    },
    {
        id: 'elektronik-rinnai',
        client: 'PT Rinnai Indonesia',
        industry: 'Elektronik',
        image: '/projects/PT Rinnai.jpg',
        logo: 'https://www.rinnai.co.id/wp-content/uploads/2019/04/logo-395x100.png',
        size: 'standard',
        desc: 'Penanganan partisi logam (pelat) dan perakitan komponen elektronika rumah tangga secara dinamis.',
        color: 'slate'
    },
    {
        id: 'fmcg-sarihusada',
        client: 'PT Sarihusada Generasi Mahardhika',
        industry: 'FMCG & F&B',
        image: '/projects/PT Sarihusada Generasi Mahardhika.jpg',
        logo: 'https://www.sarihusada.co.id/assets/img/logo.png',
        size: 'large',
        desc: 'Handling pasokan bahan baku gizi klinis tingkat tinggi, didesain memenuhi standar sanitasi makanan balita ketat.',
        color: 'blue'
    },
    {
        id: 'karet-sritrang',
        client: 'PT Sri Trang Lingga Indonesia',
        industry: 'Kaca & Material Solid',
        image: '/projects/PT Sri Trang Lingga.jpg',
        logo: 'https://axeoneverest.com/wp-content/uploads/2011/04/sri-trang-group-everest-logo-1.jpg',
        size: 'standard',
        desc: 'Akselerasi pengangkatan blok karet masif baling. Mengurangi penggunaan forklift secara berlebihan.',
        color: 'emerald'
    },
    {
        id: 'auto-sugity',
        client: 'PT Sugity Creatives',
        industry: 'Otomotif & Kendaraan',
        image: '/projects/PT Sugity.jpg',
        logo: 'https://uccareer.id/assets/upload/company/thumbs/thumb300px-20251007-100131-a1262.jpg',
        size: 'standard',
        desc: 'Pemindahan injeksi plastik otomotif berskala besar tanpa goresan (scratch-free) untuk menjaga durabilitas cetakan resin part.',
        color: 'red'
    },
    {
        id: 'auto-summy',
        client: 'PT Sumi Rubber Indonesia',
        industry: 'Otomotif & Kendaraan',
        image: '/projects/PT Summy Rubber.jpg',
        logo: 'https://dunlop.co.id/logo-default.svg',
        size: 'standard',
        desc: 'Lifting ergonomis untuk karet curing di industri ban (Dunlop), mendorong target produksi tercapai tanpa mengorbankan standar safety K3.',
        color: 'red'
    },
    {
        id: 'fmcg-urc',
        client: 'PT URC Indonesia',
        industry: 'FMCG & F&B',
        image: '/projects/PT URC Indonesia.jpg',
        logo: 'https://www.urc.co.id/wp-content/uploads/2021/01/2.jpg',
        size: 'standard',
        desc: 'Ritme paletizing karton snack secara efisien yang mampu menekan frekuensi kelelahan otot (RSI) bagi pekerja gudang.',
        color: 'blue'
    },
    {
        id: 'auto-evoluzione',
        client: 'PT. Evoluzione Tyres',
        industry: 'Otomotif & Kendaraan',
        image: '/projects/PT. Evoluzione Tyre.jpg',
        logo: 'https://csr.subang.go.id/assets/upload/company/pt-evoluzione-tyres-768x576.jpg',
        size: 'tall',
        desc: 'Teknik angkat green-tire dan finished-tire yang tidak merusak tapak kompon karet dari brand kelas dunia (Pirelli).',
        color: 'red'
    },
    {
        id: 'konstruksi-mura',
        client: 'PT. Mura Maha Agung',
        industry: 'Bahan Bangunan & Infrastruktur',
        image: '/projects/PT. Mura Maha Agung.jpg',
        logo: 'https://www.muramaha.com/wp-content/uploads/2017/01/cropped-logo-muramaha3.png',
        size: 'standard',
        desc: 'Menopang pemindahan plat baja maupun struktur besi fabrikasi padat tanpa defleksi berbahaya.',
        color: 'slate'
    },
    {
        id: 'auto-suryaraya',
        client: 'PT Suryaraya Rubberindo Industries',
        industry: 'Otomotif & Kendaraan',
        image: '/projects/PT. Suryaraya Rubberindo.jpg',
        logo: 'https://fdrtire.com/assets/frontend/img/logo.jpg',
        size: 'standard',
        desc: 'Kesinambungan pada lini perakitan ban roda dua, memungkinkan operator melakukan sorting repetitif dengan aman.',
        color: 'red'
    },
    {
        id: 'auto-astra',
        client: 'PT Astra Daihatsu Motor',
        industry: 'Otomotif & Kendaraan',
        image: '/projects/PT Astra Daihatsu Motor.jpg',
        logo: 'https://medias.astra-daihatsu.id/sys-master-media/h70/hc8/8819719208990/astraDaihatsulogo.svg',
        size: 'large',
        desc: 'Pengangkatan plat bodi kendaraan berdimensi masif untuk kelancaran assembly line pabrikan mobil global tanpa cacat.',
        color: 'red'
    },
    {
        id: 'fmcg-garuda',
        client: 'PT Garuda Food',
        industry: 'FMCG & F&B',
        image: '/projects/PT Garuda Food.jpg',
        logo: 'https://www.vhv.rs/dpng/d/73-737965_garudafood-logo-png-transparent-png.png',
        size: 'standard',
        desc: 'Akselerasi ritme akhir pengemasan karton makanan ringan pada area paletizing yang menekan resiko cidera kerja.',
        color: 'blue'
    },
    {
        id: 'konstruksi-ykk',
        client: 'PT YKK AP Indonesia',
        industry: 'Bahan Bangunan & Infrastruktur',
        image: '/projects/PT YKK AP.jpg',
        logo: 'https://www.ykkap.co.id/assets/img/header_logo01.svg',
        size: 'tall',
        desc: 'Sistem handling profil arsitektur aluminium (ekstrusi) berukuran presisi, meminimalisir baret pada permukaan material.',
        color: 'slate'
    },
];
