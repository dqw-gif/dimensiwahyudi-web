import { VTLVariant, vacuumTubeLifterVariants } from './products/vacuum-tube-lifters';

export interface IndustryDef {
  slug: string;
  name: string;
  nameId: string;
  tagline: string;
  taglineId: string;
  description: string;
  descriptionId: string;
  heroColor: string;
  imageUrl: string;
  iconType: 'food' | 'pill' | 'car' | 'box' | 'factory' | 'hard-hat' | 'cpu' | 'flask';
  recommendedProducts: string[]; // references VTLVariant slugs
  painPoints: string[];
  painPointsId: string[];
}

export const industries: IndustryDef[] = [
  {
    slug: 'food-beverage',
    name: 'Food & Beverage',
    nameId: 'Makanan & Minuman (F&B)',
    tagline: 'Hygienic material handling that meets strict food-grade standards',
    taglineId: 'Material handling higienis yang memenuhi standar ketat food-grade',
    description: 'The food and beverage industry requires handling systems that are easily washable, resistant to high-pressure cleaning, and compliant with FDA regulations. Manual handling of sacks of raw ingredients or moving delicate finished products can be streamlined using IP69K-rated vacuum tech.',
    descriptionId: 'Industri makanan dan minuman membutuhkan sistem handling yang mudah dicuci, tahan semprotan air bertekanan tinggi, dan patuh standar FDA/HACCP. Pengangkatan manual karung bahan baku atau pemindahan produk akhir yang sensitif dapat dipercepat menggunakan Vacuum Tube Lifter berstandar IP69K.',
    heroColor: 'from-blue-700 to-slate-900',
    imageUrl: '/industries/FOOD & BEVERAGE.webp',
    iconType: 'food',
    painPoints: [
      'Contamination risk from standard lifting equipment',
      'Worker fatigue from manually carrying 25-50 kg ingredient sacks (sugar, flour)',
      'Time loss during sanitation and washdown procedures',
    ],
    painPointsId: [
      'Risiko kontaminasi silang dari alat angkat mekanis konvensional',
      'Kelelahan fisik operator akibat memanggul karung bahan baku 25-50 kg (gula, tepung)',
      'Waktu henti lini yang lama saat prosedur sanitasi dan pencucian (washdown)',
    ],
    recommendedProducts: ['palvac-sprint-hygienic', 'palvac-sprint', 'jumboflex-high-stack'],
  },
  {
    slug: 'pharmaceuticals-chemicals',
    name: 'Pharmaceuticals & Chemicals',
    nameId: 'Farmasi & Kimia',
    tagline: 'Precision handling with HEPA filtration and ATEX safety guarantees',
    taglineId: 'Handling presisi dengan filtrasi HEPA dan jaminan keamanan zona ATEX',
    description: 'In pharmaceutical clean rooms and volatile chemical zones, worker safety and product sterility are non-negotiable. We provide lifting aids equipped with H14 HEPA filters to prevent contamination, alongside intrinsically safe (ATEX) lifters for hazardous explosive zones.',
    descriptionId: 'Di area cleanroom farmasi dan zona bahan kimia mudah menguap, keselamatan kerja dan sterilitas produk adalah prioritas mutlak. Kami menyediakan Vacuum Tube Lifter dengan filter HEPA H14 untuk mencegah kontaminasi partikel, serta unit berstandar ATEX untuk zona rawan ledakan.',
    heroColor: 'from-cyan-700 to-blue-900',
    imageUrl: '/industries/PHARMACEUTICALS & CHEMICALS.webp',
    iconType: 'flask',
    painPoints: [
      'Airborne particle contamination during powder transfer',
      'High explosion risk zones (ATEX Zone 1/21) requiring non-sparking equipment',
      'Stringent clean room compliance (ISO Class 7 and up)',
    ],
    painPointsId: [
      'Risiko kontaminasi partikel udara saat proses penuangan bubuk bahan aktif',
      'Zona risiko ledakan tinggi (ATEX Zone 1/21) yang mewajibkan peralatan bebas percikan api',
      'Tuntutan kepatuhan standar cleanroom ketat (ISO Class 7 ke atas)',
    ],
    recommendedProducts: ['palvac-sprint-hygienic', 'jumbosprint-ex', 'jumboflex'],
  },
  {
    slug: 'automotive-metal',
    name: 'Automotive & Metal Work',
    nameId: 'Otomotif & Manufaktur Logam',
    tagline: 'Heavy-duty lifting for dense, non-porous metal components and car parts',
    taglineId: 'Pengangkatan heavy-duty untuk komponen logam padat dan suku cadang otomotif',
    description: 'Moving car chassis components, pressing heavy sheet metal, and unloading engine parts from deep crates takes a massive physical toll. Our ergonomic heavy-lifters provide up to 300kg capacity with optional 90-degree swivel for precise placement in CNC machines or assembly lines.',
    descriptionId: 'Memindahkan komponen sasis kendaraan, memuat plat logam berat ke mesin press, dan membongkar komponen mesin dari keranjang dalam menguras tenaga operator. Sistem lifter ergonomis kami mampu mengangkat beban hingga 300 kg dengan fitur putar/tilting 90 derajat untuk penempatan presisi di mesin CNC maupun jalur perakitan.',
    heroColor: 'from-blue-800 to-slate-800',
    imageUrl: '/industries/AUTOMOTIVE & METAL WORK.webp',
    iconType: 'car',
    painPoints: [
      'High incidence of musculoskeletal injuries among assembly line workers',
      'Difficulty extracting heavy metal parts from deep storage bins',
      'Need for precise, scratch-free orientation (90° tilting) of large flat metal sheets',
    ],
    painPointsId: [
      'Tingginya angka cedera otot dan punggung (MSD) pada operator jalur perakitan',
      'Kesulitan mengeluarkan komponen logam berat dari dalam wadah penyimpanan (mesh bin)',
      'Kebutuhan orientasi miring 90° bebas goresan untuk lembaran plat logam berukuran besar',
    ],
    recommendedProducts: ['jumboergo', 'jumbosprint', 'jumbo-low-stack'],
  },
  {
    slug: 'logistics-ecommerce',
    name: 'Logistics, Warehousing & E-commerce',
    nameId: 'Logistik, Pergudangan & E-Commerce',
    tagline: 'High-speed sorting, palletizing, and order picking automation',
    taglineId: 'Penyortiran berkecepatan tinggi, palletizing, dan otomasi order picking',
    description: 'Speed is the ultimate metric in logistics. Dealing with un-uniform parcel sizes, rapid high-cycle carton handling, and stacking to tall pallets requires an agile one-hand control lifter. Maximize vertical warehouse space and slash loading time.',
    descriptionId: 'Kecepatan cycle time adalah tolok ukur utama di pusat logistik. Menangani ukuran paket yang beragam, pemindahan karton berfrekuensi tinggi, serta penumpukan ke palet tinggi membutuhkan Vacuum Tube Lifter satu tangan yang lincah. Maksimalkan ruang vertikal gudang dan pangkas waktu muat barang.',
    heroColor: 'from-blue-600 to-cyan-800',
    imageUrl: '/industries/LOGISTICS, WAREHOUSING & E-COMMERCE.webp',
    iconType: 'box',
    painPoints: [
      'Slow order fulfillment speeds due to manual box picking',
      'Low maximum stacking height by human operators, wasting warehouse vertical space',
      'Handling diverse packaging materials (porous cartons, tape, plastic wrap)',
    ],
    painPointsId: [
      'Lambatnya kecepatan pemenuhan pesanan akibat proses angkat karton manual',
      'Terbatasnya tinggi tumpukan palet oleh tenaga manusia sehingga ruang vertikal gudang terbuang',
      'Keragaman material kemasan (karton berpori, lakban, bungkus plastik shrink-wrap)',
    ],
    recommendedProducts: ['jumboflex', 'jumboflex-gen1', 'jumboflex-high-stack'],
  },
  {
    slug: 'construction-glass-wood',
    name: 'Construction, Glass & Woodworking',
    nameId: 'Konstruksi, Kaca & Pengolahan Kayu',
    tagline: 'Secure vacuum hold for massive, unwieldy architectural materials',
    taglineId: 'Cengkeraman vakum aman untuk material arsitektur, kaca, dan panel kayu besar',
    description: 'Glass panes, marble slabs, and massive wooden doors cannot be dropped. We deploy multi-circuit vacuum safety technology for lifting non-porous (glass) and semi-porous (MDF/wood) panels up to 300kg with 100% confidence and zero surface damage.',
    descriptionId: 'Lembaran kaca arsitektural, papan marmer, dan panel kayu besar tidak boleh tergelincir sedikit pun. Kami menerapkan teknologi pengaman vakum sirkuit ganda untuk mengangkat panel kedap udara (kaca) maupun semi-berpori (MDF/kayu) hingga ratusan kilogram tanpa merusak permukaan.',
    heroColor: 'from-slate-800 to-blue-950',
    imageUrl: '/industries/CONSTRUCTION, GLASS & WOODWORKING.webp',
    iconType: 'hard-hat',
    painPoints: [
      'Catastrophic financial and safety risk from dropping glass/marble slabs',
      'Awkward large dimensions requiring 3-4 men to lift a single panel',
      'Surface scratching or marring by traditional mechanical clamps',
    ],
    painPointsId: [
      'Risiko kerugian finansial dan keselamatan kerja fatal jika lembaran kaca/marmer terjatuh',
      'Dimensi panel besar yang membutuhkan 3-4 pekerja sekaligus untuk satu kali angkat',
      'Cacat goresan pada permukaan material akibat penjepit mekanis tradisional',
    ],
    recommendedProducts: ['jumboergo', 'jumbosprint'],
  },
  {
    slug: 'packaging-printing',
    name: 'Packaging & Printing',
    nameId: 'Kemasan & Percetakan',
    tagline: 'Gentle handling of paper rolls, foils, and delicate printed media',
    taglineId: 'Penanganan presisi gulungan kertas, plastik foil, dan media cetak sensitif',
    description: 'Swapping heavy paper rolls on printing presses or loading continuous foil packaging machines can paralyze a production line if done manually. Our core-gripping vacuum lifters make loading round, heavy packaging materials a one-person job.',
    descriptionId: 'Mengganti gulungan kertas berat pada mesin cetak atau memuat gulungan foil plastik ke mesin pengemasan dapat menghambat lini produksi jika dilakukan secara manual. Sistem Vacuum Lifter kami memungkinkan pemuatan gulungan kemasan berat dilakukan secara aman oleh satu operator saja.',
    heroColor: 'from-cyan-600 to-blue-700',
    imageUrl: '/industries/PACKAGING & PRINTING.webp',
    iconType: 'factory',
    painPoints: [
      'Production downtime when waiting for staff to mount heavy paper/foil rolls',
      'Telescoping or damaging the core of delicate printed rolls',
      'Intense repetitive strain from lifting bundles of flattened cartons',
    ],
    painPointsId: [
      'Downtime mesin produksi saat menunggu beberapa pekerja memasang gulungan kertas/foil berat',
      'Risiko gulungan bergeser (telescoping) atau rusaknya bagian tepi media cetak sensitif',
      'Beban berulang yang berat saat mengangkat ikatan tumpukan karton lipat',
    ],
    recommendedProducts: ['jumboflex', 'jumbosprint', 'jumbo-low-stack'],
  },
  {
    slug: 'electronics-semi',
    name: 'Electronics & Semiconductors',
    nameId: 'Elektronik & Semikonduktor',
    tagline: 'ESD-safe handling for high-value sensitive components',
    taglineId: 'Handling aman berstandar ESD untuk komponen sensitif bernilai tinggi',
    description: 'Static electricity is the enemy of electronics manufacturing. Handing server racks, sensitive displays, or battery modules requires Anti-Static (ESD) compliant equipment to prevent invisible micro-shocks that destroy product value.',
    descriptionId: 'Listrik statis adalah ancaman utama di pabrik manufaktur elektronik. Menangani rak server, panel layar sensitif, maupun modul baterai membutuhkan peralatan berstandar Anti-Statis (ESD) untuk mencegah loncatan muatan mikro yang merusak sirkuit elektronik.',
    heroColor: 'from-blue-500 to-slate-800',
    imageUrl: '/industries/ELECTRONICS & SEMICONDUCTORS.webp',
    iconType: 'cpu',
    painPoints: [
      'Electrostatic discharge (ESD) destroying expensive components during transit',
      'Vibration and harsh drops during manual lowering',
      'Cleanroom particulate generation from standard mechanical hoists',
    ],
    painPointsId: [
      'Pelepasan muatan elektrostatik (ESD) yang merusak komponen mahal saat pemindahan',
      'Getaran dan hentakan kasar saat peletakan komponen secara manual',
      'Timbulnya partikel debu di area cleanroom dari rantai hoist mekanis standar',
    ],
    recommendedProducts: ['jumboflex-gen1', 'palvac-sprint-hygienic'],
  },
  {
    slug: 'plastics-rubber',
    name: 'Plastics & Rubber',
    nameId: 'Plastik & Karet',
    tagline: 'Enduring handling solutions for hot, abrasive, and raw material sacks',
    taglineId: 'Solusi handling tangguh untuk karung biji plastik dan komponen cetakan panas',
    description: 'Feeding hoppers with 25kg bags of plastic pellets or lifting hot rubber molds demands durable handling tools. Alleviate the brutal physical work of hopper-feeding and mold transportation with heat-resistant vacuum attachments.',
    descriptionId: 'Menuang karung biji plastik 25 kg ke dalam hopper mesin ekstrusi atau mengangkat bale karet panas menuntut alat angkat yang tahan banting. Kurangi beban fisik berat operator saat pengisian hopper dan pemindahan cetakan menggunakan Suction Cup tahan panas.',
    heroColor: 'from-slate-700 to-blue-800',
    imageUrl: '/industries/PLASTICS & RUBBER.webp',
    iconType: 'factory',
    painPoints: [
      'Back-breaking repetition of lifting 25kg pellet sacks into tall hoppers',
      'Handling components that are still hot from molding machines',
      'Dusty environments degrading standard lifting equipment',
    ],
    painPointsId: [
      'Gerakan membungkuk berulang saat mengangkat karung biji plastik 25 kg ke hopper tinggi',
      'Penanganan komponen yang masih bersuhu panas langsung dari mesin molding',
      'Lingkungan kerja berdebu yang mempercepat keausan alat angkat standar',
    ],
    recommendedProducts: ['jumboflex-high-stack', 'jumbosprint-ex', 'jumboergo'],
  }
];

export function getRecommendedProducts(slugs: string[]): VTLVariant[] {
  return vacuumTubeLifterVariants.filter(v => slugs.includes(v.slug));
}
