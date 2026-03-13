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
        desc: 'Optimized high-volume production and packaging flows for daily consumer goods, reducing product damage across handling stages.',
        color: 'blue'
    },
    {
        id: 'auto-gt',
        client: 'PT Gajah Tunggal',
        industry: 'Automotive & Transportation',
        image: '/projects/PT Gajah Tunggal.jpg',
        logo: 'https://www.gt-tires.com/wp-content/themes/gajahtunggal/images/corporate_logo.png',
        size: 'tall',
        desc: 'Improved tire assembly throughput while minimizing lower-back injury risk through ergonomic material handling.',
        color: 'red'
    },
    {
        id: 'auto-gt-1',
        client: 'PT Gajah Tunggal',
        industry: 'Automotive & Transportation',
        image: '/projects/PT Gajah Tunggal (1).jpg',
        logo: 'https://www.gt-tires.com/wp-content/themes/gajahtunggal/images/corporate_logo.png',
        size: 'standard',
        desc: 'Safe raw-rubber handling in mixing operations with hoist systems designed for high carbon-dust environments.',
        color: 'red'
    },
    {
        id: 'auto-gt-2',
        client: 'PT Gajah Tunggal',
        industry: 'Automotive & Transportation',
        image: '/projects/PT Gajah Tunggal (2).jpg',
        logo: 'https://www.gt-tires.com/wp-content/themes/gajahtunggal/images/corporate_logo.png',
        size: 'standard',
        desc: 'Tire lifting system for curing press operations that preserves tire geometry under high operating temperatures.',
        color: 'red'
    },
    {
        id: 'aviasi-ap2',
        client: 'PT Angkasa Pura II',
        industry: 'Air Logistics',
        image: '/projects/PT Angkasa Pura II.jpg',
        logo: 'https://upload.wikimedia.org/wikipedia/id/thumb/a/a6/Angkasa_Pura_II_logo_2014.svg/3840px-Angkasa_Pura_II_logo_2014.svg.png',
        size: 'standard',
        desc: 'High-throughput airport cargo handling that reduces repetitive strain injuries for field operators.',
        color: 'sky'
    },
    {
        id: 'kaca-asahimas',
        client: 'PT Asahimas Flat Glass Tbk',
        industry: 'Glass & Solid Materials',
        image: '/projects/PT Asahimas Flat Glass Tbk.jpeg',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Logo_Asahimas_Flat_Glass_Tbk.png',
        size: 'large',
        desc: 'Heavy glass-sheet lifting solution with even load distribution to minimize crack and scratch risk in demanding assembly areas.',
        color: 'slate'
    },
    {
        id: 'fmcg-unilever',
        client: 'PT Unilever Indonesia Tbk',
        industry: 'FMCG & F&B',
        image: '/projects/PT Unilever Indonesia Tbk.jpeg',
        logo: 'https://upload.wikimedia.org/wikipedia/id/3/37/Unilever.png',
        size: 'standard',
        desc: 'Fast, hygienic handling systems for modern production facilities aligned with Unilever global safety standards.',
        color: 'blue'
    },
    {
        id: 'kimia-nikka',
        client: 'PT. Indonesia Nikka Chemicals',
        industry: 'Chemical & Pharma',
        image: '/projects/PT. Indonesia Nikka Chemicals.jpg',
        logo: 'https://img2.lokercepat.id/files/2023-11-11/pt-indonesia-nikka-chemicals-inkali-382.jpg',
        size: 'tall',
        desc: 'Reliable transfer of textile chemical materials, with vacuum drum handling that prevents spills and improves plant safety.',
        color: 'emerald'
    },
    {
        id: 'auto-gs',
        client: 'PT GS Battery',
        industry: 'Automotive & Transportation',
        image: '/projects/PT GS Battery.jpg',
        logo: 'https://www.gs.astra.co.id/media/dzpc02gq/gs-battery-logo.png',
        size: 'standard',
        desc: 'Precision lifting for dense battery-assembly components, supporting stable and safe continuous production flow.',
        color: 'red'
    },
    {
        id: 'fmcg-nestle',
        client: 'PT Nestle Indonesia',
        industry: 'FMCG & F&B',
        image: '/projects/PT NESTLE.jpg',
        logo: 'https://www.nestle.co.id/themes/custom/da_vinci_code/logo.svg',
        size: 'standard',
        desc: 'Mechanical assistance in nutrition packaging operations with full compliance for food clean-zone requirements.',
        color: 'blue'
    },
    {
        id: 'packaging-hokkan',
        client: 'PT Hokkan Indonesia',
        industry: 'Packaging & Plastics',
        image: '/projects/PT HOKKAN INDONESIA.jpg',
        logo: 'https://www.hokkan.co.id/images/logo.jpg',
        size: 'large',
        desc: 'Specialized PET bottle handling for high-speed filling conveyors, enabling uninterrupted high-volume throughput.',
        color: 'indigo'
    },
    {
        id: 'kayu-taco',
        client: 'PT Taco Anugrah Corporindo',
        industry: 'Furniture & Interior',
        image: '/projects/PT Taco Anugrah Corporindo.jpg',
        logo: 'https://manage.taco.co.id/asset-images/logo.svg',
        size: 'tall',
        desc: 'Accelerated handling of porous HPL sheets with non-marking contact that protects premium architectural finishes.',
        color: 'amber'
    },
    {
        id: 'farmasi-otsuka',
        client: 'PT Otsuka Indonesia',
        industry: 'Chemical & Pharma',
        image: '/projects/PT Otsuka Indonesia.jpeg',
        logo: 'https://www.otsuka.co.id/themes/otsuka/assets/img/otsuka.png',
        size: 'standard',
        desc: 'Stainless lifting equipment for high-sanitation cleanroom zones supporting clinical nutrition and pharmaceutical compliance.',
        color: 'teal'
    },
    {
        id: 'kimia-mowilex',
        client: 'PT Mowilex Indonesia',
        industry: 'Chemical & Pharma',
        image: '/projects/PT Mowilex Indonesia.jpg',
        logo: 'https://mowilex.com/wp-content/themes/movi/images/MowilexPremiumPaints.webp',
        size: 'standard',
        desc: 'High-frequency rotation and transfer of coating liquids while reducing operator back-fatigue risk.',
        color: 'emerald'
    },
    {
        id: 'fmcg-yakult',
        client: 'PT Yakult Indonesia Persada',
        industry: 'FMCG & F&B',
        image: '/projects/PT Yakult Indonesia Persada.jpg',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Yakult-Logo.svg',
        size: 'standard',
        desc: 'Sterile lifting infrastructure for bulk handling across probiotic beverage supply operations.',
        color: 'blue'
    },
    {
        id: 'fmcg-nutrifood',
        client: 'PT Nutrifood Indonesia',
        industry: 'FMCG & F&B',
        image: '/projects/PT Nutrifood Indonesia.jpeg',
        logo: 'https://www.nutrifood.co.id/wp-content/themes/nutrifood/images/logo-nutrifood.png',
        size: 'standard',
        desc: 'Integrated ergonomic vacuum systems that improve material flow in health-nutrition production facilities.',
        color: 'blue'
    },
    {
        id: 'fmcg-nutribev',
        client: 'PT Nutribev Nabati Indonesia',
        industry: 'FMCG & F&B',
        image: '/projects/PT Nutribev Nabati Indonesia.jpg',
        logo: 'https://www.nabatisnack.co.id/assets/icons/ic-nabati.png',
        size: 'large',
        desc: 'High-speed lifting of carton and sack stacks in snack manufacturing to sustain aggressive output targets.',
        color: 'blue'
    },
    {
        id: 'kimia-cabot',
        client: 'PT Cabot Indonesia',
        industry: 'Chemical & Pharma',
        image: '/projects/PT Cabot Indonesia.png',
        logo: 'https://companieslogo.com/img/orig/CBT_BIG-f438266d.png?t=1720244491',
        size: 'standard',
        desc: 'Large-scale synthetic raw-material handling that safeguards the supply chain from leakage risks.',
        color: 'emerald'
    },
    {
        id: 'kayu-permata',
        client: 'PT Kayu Permata',
        industry: 'Furniture & Interior',
        image: '/projects/PT Kayu Permata.png',
        logo: 'https://www.permatadoor.com/wp-content/themes/permata_door/assets/images/svg/permata_door.svg',
        size: 'standard',
        desc: 'Efficient rotation of solid wood panels that reduces physical strain in premium door and furniture production.',
        color: 'amber'
    },
    {
        id: 'fmcg-multibintang',
        client: 'PT Multi Bintang Indonesia Tbk',
        industry: 'FMCG & F&B',
        image: '/projects/PT Multi Bintang Indonesia Tbk.png',
        logo: 'https://cdn.cookielaw.org/logos/00afdec3-358f-4f2d-8b63-0c71e6f49172/019808a1-d0bd-747f-b424-020636e1ab33/8a3915b9-9563-470f-8efd-2af699d3f08e/multibintang.png',
        size: 'large',
        desc: 'Efficient transfer of multi-crates and kegs on beverage lines, minimizing shock to materials and finished products.',
        color: 'blue'
    },
    {
        id: 'farmasi-dsm',
        client: 'PT. DSM Firmenich Aromatics',
        industry: 'Chemical & Pharma',
        image: '/projects/PT. DSM Firmenich Aromatics.jpg',
        logo: 'https://www.dsm-firmenich.com/content/dam/dsm-firmenich/logos/logo-black.svg',
        size: 'standard',
        desc: 'Hygienic lifting of nutrition and aromatic drums using certified hoists for high-cleanliness environments.',
        color: 'teal'
    },
    {
        id: 'auto-federal',
        client: 'PT. Federal Karyatama',
        industry: 'Automotive & Transportation',
        image: '/projects/PT. Federal Karyatama.jpg',
        logo: 'https://federaloil.co.id/themes/web/desktop2020/new/assets/collections/default/fo-logo-2.png',
        size: 'tall',
        desc: 'High-volume transfer of Federal oil carton drums with secure gripping for zero-incident handling.',
        color: 'red'
    },
    {
        id: 'packaging-fukusuke',
        client: 'PT. Fukusuke Kogyo Indonesia',
        industry: 'Packaging & Plastics',
        image: '/projects/PT. Fukusuke Kogyo Indonesia.png',
        logo: 'https://kemindogroup.id/wp-content/uploads/2020/09/logo-client-kemindo-8.png',
        size: 'standard',
        desc: 'Assisted lifting of heavy packaging-film rolls on plastic extrusion conversion lines.',
        color: 'indigo'
    },
    {
        id: 'fmcg-indofood',
        client: 'PT. Indofood CBP Sukses Makmur',
        industry: 'FMCG & F&B',
        image: '/projects/PT. Indofood CBP Sukses.jpg',
        logo: 'https://www.indofoodcbp.com/images/btn/logo-indofoodcbp.png',
        size: 'large',
        desc: 'Standardized loading and unloading of thousands of instant-noodle cartons with accurate and labor-efficient logistics placement.',
        color: 'blue'
    },
    {
        id: 'fmcg-mars',
        client: 'PT. Mars Symbioscience',
        industry: 'FMCG & F&B',
        image: '/projects/PT. Mars Symbiocince.jpg',
        logo: 'https://wikiexport.ai/wp-content/uploads/2022/10/15-1170x600.png',
        size: 'standard',
        desc: 'Innovative high-volume raw cocoa sack handling for international chocolate manufacturing supply lines.',
        color: 'blue'
    },
    {
        id: 'agrikultur-nufarm',
        client: 'PT. Nufarm Indonesia',
        industry: 'Chemical & Pharma',
        image: '/projects/PT. Nufarm.jpg',
        logo: 'https://nufarm.com/id/wp-content/themes/nufarm/images/site-logo.svg',
        size: 'standard',
        desc: 'Improved mobility in pesticide packaging while adding proactive operator protection from hazardous agrochemicals.',
        color: 'emerald'
    },
    {
        id: 'auto-sakae',
        client: 'PT. Sakae Riken Indonesia',
        industry: 'Automotive & Transportation',
        image: '/projects/PT. Sakae Riken Indonesia.jpg',
        logo: 'https://www.sakaeriken.co.jp/assets/img/common/logo/logo-site.png',
        size: 'standard',
        desc: 'Optimized resin accessory molding assembly where vacuum gripping prevents scratches on high-gloss automotive bumpers.',
        color: 'red'
    },
    {
        id: 'fmcg-suntory',
        client: 'PT. Suntory Garuda',
        industry: 'FMCG & F&B',
        image: '/projects/PT. Suntory Garuda.png',
        logo: 'https://www.vhv.rs/dpng/d/73-737965_garudafood-logo-png-transparent-png.png',
        size: 'large',
        desc: 'Smooth mass-cycle palletizing of energy-drink and tea bottle crates with automated handling that minimizes defects.',
        color: 'blue'
    },
    {
        id: 'pipa-bredero',
        client: 'PT Bredero Shaw Indonesia',
        industry: 'Heavy Industry & Automation',
        image: '/projects/PT Bredero.jpg',
        logo: 'https://karir-production.nos.jkt-1.neo.id/logos/22/1264222/Bredero_Shaw_Indonesia_01.png',
        size: 'large',
        desc: 'Heavy steel pipe lifting for coating operations with full safety assurance in large-scale operational zones.',
        color: 'slate'
    },
    {
        id: 'fmcg-delifood',
        client: 'PT Delifood Sentosa Corpindo',
        industry: 'FMCG & F&B',
        image: '/projects/PT Delifood.jpg',
        logo: 'https://cdn0-production-images-kly.akamaized.net/TpRMBHzC6SCc6V4oTvo3-KIt8kE=/2560x1440/smart/filters:quality(75):strip_icc()/kly-media-production/medias/4243444/original/067506700_1669705672-logo_mayora.jpg',
        size: 'standard',
        desc: 'Food raw-material loading systems that combine high speed with operator back ergonomics.',
        color: 'blue'
    },
    {
        id: 'fmcg-diageo',
        client: 'PT Diageo Indonesia',
        industry: 'FMCG & F&B',
        image: '/projects/PT Diageo Indonesia.jpg',
        logo: 'https://cdn.getamigo.io/ggr/rebuild/client-story-imgs/diageo-hero.webp',
        size: 'standard',
        desc: 'Heavy keg and beverage-crate handling to accelerate warehouse logistics without operational gaps.',
        color: 'blue'
    },
    {
        id: 'auto-elang',
        client: 'PT Elangperdana Tyre Industry',
        industry: 'Automotive & Transportation',
        image: '/projects/PT Elang Perdana Tyre.jpg',
        logo: 'https://admin.zeetex-radial.com/storage/page-contents/February2021/hcwzrhzeJOolozrpB7p5.png',
        size: 'tall',
        desc: 'Deformation-free handling of green and cured tires with precision movement that supports strict plant safety standards.',
        color: 'red'
    },
    {
        id: 'kimia-hempel',
        client: 'PT Hempel Indonesia',
        industry: 'Building Materials & Infrastructure',
        image: '/projects/PT Hempel Indonesia.jpg',
        logo: 'https://image1ws.indotrading.com/s3/webp/co19822/companylogo/w400-h220/logo.jpg',
        size: 'standard',
        desc: 'Balanced distribution of large paint cans and drums using high-precision vacuum gripping.',
        color: 'emerald'
    },
    {
        id: 'auto-robotic',
        client: 'PT Industrial Robotic Automation',
        industry: 'Heavy Industry & Automation',
        image: '/projects/PT Industrial Robotic Automation.jpg',
        logo: 'https://i.imgur.com/7Jpv5Qg.jpeg',
        size: 'standard',
        desc: 'Integration of certified smart lifting systems for advanced Industry 4.0 automation lines.',
        color: 'slate'
    },
    {
        id: 'manufaktur-inoac',
        client: 'PT Inoac Polytechno Indonesia',
        industry: 'Packaging & Plastics',
        image: '/projects/PT Inoac.jpg',
        logo: 'https://www.inoac.co.jp/common/img/logo.svg',
        size: 'large',
        desc: 'Transfer of extra-large polyurethane foam blocks without structural distortion during fabrication.',
        color: 'amber'
    },
    {
        id: 'farmasi-kalbe',
        client: 'PT Kalbe Morinaga Indonesia',
        industry: 'Chemical & Pharma',
        image: '/projects/PT Kalbe Morinaga.jpg',
        logo: 'https://kalbenutritionals.com/images/kalbe-nutritionals-logo.png',
        size: 'standard',
        desc: 'Cleanroom handling systems in stainless specification, supporting sterile infant-formula production zones.',
        color: 'teal'
    },
    {
        id: 'kaca-kian',
        client: 'PT Kian Mulia Manunggal',
        industry: 'Glass & Solid Materials',
        image: '/projects/PT Kian Mulia Manunggal.jpg',
        logo: 'https://www.temposcangroup.com/public/images/LOGO_TEMPO_SCAN_100_INDONESIA.png',
        size: 'tall',
        desc: 'Accurate handling of fragile glass sheets for infrastructure projects, eliminating breakage incidents on site.',
        color: 'slate'
    },
    {
        id: 'fmcg-meiji',
        client: 'PT Meiji Food Indonesia',
        industry: 'FMCG & F&B',
        image: '/projects/PT Meiji Food Indonesia.jpg',
        logo: 'https://meiji.co.id/storage/public/generals/eY0Fj5yMvi7ZPSz9zNcI9RSoYvYQIuQb2cMEKCTl.png',
        size: 'standard',
        desc: 'High-speed biscuit-carton palletizing that removes bottlenecks at snack line end-of-line operations.',
        color: 'blue'
    },
    {
        id: 'konstruksi-mortar',
        client: 'PT Cipta Mortar Utama',
        industry: 'Building Materials & Infrastructure',
        image: '/projects/PT Mortar Utama.jpg',
        logo: 'https://www.mortarutama.com/wp-content/uploads/2023/12/logo-MU-new-hires-01-1536x635.png',
        size: 'large',
        desc: 'Efficient handling of instant mortar sack stacks with improved back protection in high-dust environments.',
        color: 'stone'
    },
    {
        id: 'fmcg-nutrifood2',
        client: 'PT Nutrifood Indonesia',
        industry: 'FMCG & F&B',
        image: '/projects/PT Nutrifood Indonesia.jpg',
        logo: 'https://www.nutrifood.co.id/wp-content/themes/nutrifood/images/logo-nutrifood.png',
        size: 'standard',
        desc: 'Integrated powdered-beverage packaging flow with hygienic, obstruction-free material movement.',
        color: 'blue'
    },
    {
        id: 'elektronik-rinnai',
        client: 'PT Rinnai Indonesia',
        industry: 'Elektronik',
        image: '/projects/PT Rinnai.jpg',
        logo: 'https://www.rinnai.co.id/wp-content/uploads/2019/04/logo-395x100.png',
        size: 'standard',
        desc: 'Dynamic handling of sheet-metal partitions and home-electronics component assembly.',
        color: 'slate'
    },
    {
        id: 'fmcg-sarihusada',
        client: 'PT Sarihusada Generasi Mahardhika',
        industry: 'FMCG & F&B',
        image: '/projects/PT Sarihusada Generasi Mahardhika.jpg',
        logo: 'https://www.sarihusada.co.id/assets/img/logo.png',
        size: 'large',
        desc: 'High-grade raw-material handling for clinical nutrition, designed to meet strict infant-food sanitation standards.',
        color: 'blue'
    },
    {
        id: 'karet-sritrang',
        client: 'PT Sri Trang Lingga Indonesia',
        industry: 'Glass & Solid Materials',
        image: '/projects/PT Sri Trang Lingga.jpg',
        logo: 'https://axeoneverest.com/wp-content/uploads/2011/04/sri-trang-group-everest-logo-1.jpg',
        size: 'standard',
        desc: 'Accelerated lifting of large rubber blocks while reducing excessive forklift dependency.',
        color: 'emerald'
    },
    {
        id: 'auto-sugity',
        client: 'PT Sugity Creatives',
        industry: 'Automotive & Transportation',
        image: '/projects/PT Sugity.jpg',
        logo: 'https://uccareer.id/assets/upload/company/thumbs/thumb300px-20251007-100131-a1262.jpg',
        size: 'standard',
        desc: 'Scratch-free transfer of large automotive injection-molded parts to preserve resin-part finish quality.',
        color: 'red'
    },
    {
        id: 'auto-summy',
        client: 'PT Sumi Rubber Indonesia',
        industry: 'Automotive & Transportation',
        image: '/projects/PT Summy Rubber.jpg',
        logo: 'https://dunlop.co.id/logo-default.svg',
        size: 'standard',
        desc: 'Ergonomic lifting for tire-curing rubber operations that sustain output targets without compromising HSE standards.',
        color: 'red'
    },
    {
        id: 'fmcg-urc',
        client: 'PT URC Indonesia',
        industry: 'FMCG & F&B',
        image: '/projects/PT URC Indonesia.jpg',
        logo: 'https://www.urc.co.id/wp-content/uploads/2021/01/2.jpg',
        size: 'standard',
        desc: 'Efficient snack-carton palletizing rhythm that lowers repetitive strain frequency for warehouse teams.',
        color: 'blue'
    },
    {
        id: 'auto-evoluzione',
        client: 'PT. Evoluzione Tyres',
        industry: 'Automotive & Transportation',
        image: '/projects/PT. Evoluzione Tyre.jpg',
        logo: 'https://csr.subang.go.id/assets/upload/company/pt-evoluzione-tyres-768x576.jpg',
        size: 'tall',
        desc: 'Non-damaging lifting techniques for green and finished tires that protect premium compound tread surfaces.',
        color: 'red'
    },
    {
        id: 'konstruksi-mura',
        client: 'PT. Mura Maha Agung',
        industry: 'Building Materials & Infrastructure',
        image: '/projects/PT. Mura Maha Agung.jpg',
        logo: 'https://www.muramaha.com/wp-content/uploads/2017/01/cropped-logo-muramaha3.png',
        size: 'standard',
        desc: 'Secure transfer of steel plates and heavy fabricated structures without dangerous deflection.',
        color: 'slate'
    },
    {
        id: 'auto-suryaraya',
        client: 'PT Suryaraya Rubberindo Industries',
        industry: 'Automotive & Transportation',
        image: '/projects/PT. Suryaraya Rubberindo.jpg',
        logo: 'https://fdrtire.com/assets/frontend/img/logo.jpg',
        size: 'standard',
        desc: 'Reliable support for two-wheel tire assembly lines, enabling safe repetitive sorting tasks.',
        color: 'red'
    },
    {
        id: 'auto-astra',
        client: 'PT Astra Daihatsu Motor',
        industry: 'Automotive & Transportation',
        image: '/projects/PT Astra Daihatsu Motor.jpg',
        logo: 'https://medias.astra-daihatsu.id/sys-master-media/h70/hc8/8819719208990/astraDaihatsulogo.svg',
        size: 'large',
        desc: 'Lifting of large vehicle body panels for defect-free flow on global automotive assembly lines.',
        color: 'red'
    },
    {
        id: 'fmcg-garuda',
        client: 'PT Garuda Food',
        industry: 'FMCG & F&B',
        image: '/projects/PT Garuda Food.jpg',
        logo: 'https://www.vhv.rs/dpng/d/73-737965_garudafood-logo-png-transparent-png.png',
        size: 'standard',
        desc: 'Faster end-of-line snack carton packaging in palletizing zones with lower occupational injury risk.',
        color: 'blue'
    },
    {
        id: 'konstruksi-ykk',
        client: 'PT YKK AP Indonesia',
        industry: 'Building Materials & Infrastructure',
        image: '/projects/PT YKK AP.jpg',
        logo: 'https://www.ykkap.co.id/assets/img/header_logo01.svg',
        size: 'tall',
        desc: 'Precision handling of extruded architectural aluminum profiles that minimizes surface scratching.',
        color: 'slate'
    },
];
