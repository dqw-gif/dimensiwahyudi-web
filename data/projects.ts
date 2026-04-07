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
        image: '/projects/PT Mayora Indah.webp',
        logo: 'https://www.mayoraindah.co.id/assets/frontend/images/logo.png',
        size: 'large',
        desc: 'High-volume FMCG production and packaging flow was improved with ergonomic handling support to maintain throughput and reduce product damage across critical transfer stages.',
        color: 'blue'
    },
    {
        id: 'auto-gt',
        client: 'PT Gajah Tunggal',
        industry: 'Automotive & Transportation',
        image: '/projects/PT Gajah Tunggal.webp',
        logo: 'https://www.gt-tires.com/wp-content/themes/gajahtunggal/images/corporate_logo.png',
        size: 'tall',
        desc: 'To improve tire-assembly throughput while reducing lower-back strain risk, sheet rubber loads up to 45 kg were handled using a Binar Handling Pneumatic Lifting Device with vacuum gripper. The setup delivered safer transfer and stable single-operator handling on repetitive cycles.',
        color: 'red'
    },
    {
        id: 'auto-gt-1',
        client: 'PT Gajah Tunggal',
        industry: 'Automotive & Transportation',
        image: '/projects/PT Gajah Tunggal (1).webp',
        logo: 'https://www.gt-tires.com/wp-content/themes/gajahtunggal/images/corporate_logo.png',
        size: 'standard',
        desc: 'In high carbon-dust rubber-mixing areas, rubber bales up to 40 kg were handled with Jumbo Sprint 85 and a crane system to stabilize repetitive transfer. The upgrade improved ergonomic control and reduced lower back-strain exposure during routine handling.',
        color: 'red'
    },
    {
        id: 'auto-gt-2',
        client: 'PT Gajah Tunggal',
        industry: 'Automotive & Transportation',
        image: '/projects/PT Gajah Tunggal (2).webp',
        logo: 'https://www.gt-tires.com/wp-content/themes/gajahtunggal/images/corporate_logo.png',
        size: 'standard',
        desc: 'For curing-press handling under high-temperature conditions, tire rolls up to 200 kg were managed with a Pneumatic Lifting Device and Mechanical Gripper to preserve geometry during transfer. The process delivered stable and safer single-operator handling.',
        color: 'red'
    },
    {
        id: 'aviasi-ap2',
        client: 'PT Angkasa Pura II',
        industry: 'Air Logistics',
        image: '/projects/PT Angkasa Pura II.webp',
        logo: 'https://upload.wikimedia.org/wikipedia/id/thumb/a/a6/Angkasa_Pura_II_logo_2014.svg/3840px-Angkasa_Pura_II_logo_2014.svg.png',
        size: 'standard',
        desc: 'At baggage-handling points where speed and load pressure are both high, bag and suitcase units up to 50 kg were transferred using Jumbo Flex 50 to reduce rough handling risk. The solution improved ergonomic control and enabled safer, damage-free vacuum gripping. Implementation scope covered Plant B.',
        color: 'sky'
    },
    {
        id: 'kaca-asahimas',
        client: 'PT Asahimas Flat Glass Tbk',
        industry: 'Glass & Solid Materials',
        image: '/projects/PT Asahimas Flat Glass Tbk.webp',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Logo_Asahimas_Flat_Glass_Tbk.png',
        size: 'large',
        desc: 'For heavy glass-sheet handling in demanding assembly zones, loads up to 250 kg were managed with Vacumaster Basic 90 500 kg to preserve even load distribution and reduce crack or scratch exposure. The process achieved safer handling with reliable single-operator control.',
        color: 'slate'
    },
    {
        id: 'fmcg-unilever',
        client: 'PT Unilever Indonesia Tbk',
        industry: 'FMCG & F&B',
        image: '/projects/PT Unilever Indonesia Tbk.webp',
        logo: 'https://upload.wikimedia.org/wikipedia/id/3/37/Unilever.png',
        size: 'standard',
        desc: 'To support fast and hygienic handling aligned with modern FMCG safety expectations, sack loads up to 25 kg were transferred using Jumbo Flex 35 with a column-mounted jib crane. This improved handling consistency and helped reduce downtime risk linked to operator strain.',
        color: 'blue'
    },
    {
        id: 'kimia-nikka',
        client: 'PT. Indonesia Nikka Chemicals',
        industry: 'Chemical & Pharma',
        image: '/projects/PT. Indonesia Nikka Chemicals.webp',
        logo: 'https://img2.lokercepat.id/files/2023-11-11/pt-indonesia-nikka-chemicals-inkali-382.jpg',
        size: 'tall',
        desc: 'To support safer transfer of textile chemical materials, sack loads up to 50 kg were handled using Jumbo Sprint 65 A2 with a column-mounted flat jib crane. This reduced spill exposure, improved ergonomic control, and helped increase line throughput.',
        color: 'emerald'
    },
    {
        id: 'auto-gs',
        client: 'PT GS Battery',
        industry: 'Automotive & Transportation',
        image: '/projects/PT GS Battery.webp',
        logo: 'https://www.gs.astra.co.id/media/dzpc02gq/gs-battery-logo.png',
        size: 'standard',
        desc: 'For dense battery-assembly handling, loads up to 34 kg were transferred with Jumbo Flex 50 and a column-mounted jib crane to maintain precise positioning and stable repetitive flow. The setup enabled safer, reliable single-operator handling.',
        color: 'red'
    },
    {
        id: 'fmcg-nestle',
        client: 'PT Nestle Indonesia',
        industry: 'FMCG & F&B',
        image: '/projects/PT NESTLE.webp',
        logo: 'https://www.nestle.co.id/themes/custom/da_vinci_code/logo.svg',
        size: 'standard',
        desc: 'In nutrition-packaging operations with clean-zone requirements, Jumbo Flex 35 with a mobile jib crane was applied to improve lifting consistency and maintain ergonomic material handling performance.',
        color: 'blue'
    },
    {
        id: 'packaging-hokkan',
        client: 'PT Hokkan Indonesia',
        industry: 'Packaging & Plastics',
        image: '/projects/PT HOKKAN INDONESIA.webp',
        logo: 'https://www.hokkan.co.id/images/logo.jpg',
        size: 'large',
        desc: 'In high-speed PET bottle operations, sack loads up to 50 kg were handled with Jumbo Sprint 85 and a crane system to stabilize repetitive transfer and reduce loading-cycle time. The result was smoother handling with stronger productivity performance.',
        color: 'indigo'
    },
    {
        id: 'kayu-taco',
        client: 'PT Taco Anugrah Corporindo',
        industry: 'Furniture & Interior',
        image: '/projects/PT Taco Anugrah Corporindo.webp',
        logo: 'https://manage.taco.co.id/asset-images/logo.svg',
        size: 'tall',
        desc: 'Accelerated handling of porous HPL sheets with non-marking contact that protects premium architectural finishes.',
        color: 'amber'
    },
    {
        id: 'farmasi-otsuka',
        client: 'PT Otsuka Indonesia',
        industry: 'Chemical & Pharma',
        image: '/projects/PT Otsuka Indonesia.webp',
        logo: 'https://www.otsuka.co.id/themes/otsuka/assets/img/otsuka.png',
        size: 'standard',
        desc: 'For high-sanitation cleanroom handling, sack loads up to 50 kg were managed using Jumbo Sprint 65 with a column-mounted jib crane to support ergonomic transfer, process consistency, and clinical nutrition compliance requirements.',
        color: 'teal'
    },
    {
        id: 'kimia-mowilex',
        client: 'PT Mowilex Indonesia',
        industry: 'Chemical & Pharma',
        image: '/projects/PT Mowilex Indonesia.webp',
        logo: 'https://mowilex.com/wp-content/themes/movi/images/MowilexPremiumPaints.webp',
        size: 'standard',
        desc: 'For high-frequency coating-material transfer, sack loads up to 50 kg were handled with Jumbo Sprint 85 and a column-mounted jib crane to keep movement consistent across shifts. This reduced back-fatigue exposure while improving ergonomic handling control.',
        color: 'emerald'
    },
    {
        id: 'fmcg-yakult',
        client: 'PT Yakult Indonesia Persada',
        industry: 'FMCG & F&B',
        image: '/projects/PT Yakult Indonesia Persada.webp',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Yakult-Logo.svg',
        size: 'standard',
        desc: 'Across probiotic beverage bulk-handling operations, sack loads up to 50 kg were handled with Jumbo Sprint 85 and a column-mounted jib crane to maintain hygienic transfer conditions and more consistent ergonomic handling.',
        color: 'blue'
    },
    {
        id: 'fmcg-nutrifood',
        client: 'PT Nutrifood Indonesia',
        industry: 'FMCG & F&B',
        image: '/projects/PT Nutrifood Indonesia.webp',
        logo: 'https://www.nutrifood.co.id/wp-content/themes/nutrifood/images/logo-nutrifood.png',
        size: 'standard',
        desc: 'In health-nutrition production lines, integrated ergonomic vacuum handling was applied for sack loads up to 50 kg using Jumbo Sprint 85 kg with a column-mounted flat jib crane, improving material flow stability and operator handling control.',
        color: 'blue'
    },
    {
        id: 'fmcg-nutribev',
        client: 'PT Nutribev Nabati Indonesia',
        industry: 'FMCG & F&B',
        image: '/projects/PT Nutribev Nabati Indonesia.webp',
        logo: 'https://www.nabatisnack.co.id/assets/icons/ic-nabati.png',
        size: 'large',
        desc: 'To sustain high-output snack manufacturing targets, carton and sack handling up to 50 kg was supported by Jumbo Sprint 85 with a column-mounted jib crane. The system improved repetitive lifting consistency and strengthened ergonomic handling control at line speed.',
        color: 'blue'
    },
    {
        id: 'kimia-cabot',
        client: 'PT Cabot Indonesia',
        industry: 'Chemical & Pharma',
        image: '/projects/PT Cabot Indonesia.webp',
        logo: 'https://companieslogo.com/img/orig/CBT_BIG-f438266d.png?t=1720244491',
        size: 'standard',
        desc: 'For synthetic raw-material transfer at scale, loads up to 25 kg were managed with Jumbo Ergo 45 and a column-mounted jib crane to improve handling consistency and reduce leakage risk during movement. This delivered faster, more controlled handling cycles.',
        color: 'emerald'
    },
    {
        id: 'kayu-permata',
        client: 'PT Kayu Permata',
        industry: 'Furniture & Interior',
        image: '/projects/PT Kayu Permata.webp',
        logo: 'https://www.permatadoor.com/wp-content/themes/permata_door/assets/images/svg/permata_door.svg',
        size: 'standard',
        desc: 'To improve panel rotation in premium door and furniture production, wooden panel loads up to 50 kg were handled with Jumbo Ergo 85 and a mobile jib crane. This reduced physical strain while keeping movement precision consistent across repetitive tasks.',
        color: 'amber'
    },
    {
        id: 'fmcg-multibintang',
        client: 'PT Multi Bintang Indonesia Tbk',
        industry: 'FMCG & F&B',
        image: '/projects/PT Multi Bintang Indonesia Tbk.webp',
        logo: 'https://cdn.cookielaw.org/logos/00afdec3-358f-4f2d-8b63-0c71e6f49172/019808a1-d0bd-747f-b424-020636e1ab33/8a3915b9-9563-470f-8efd-2af699d3f08e/multibintang.png',
        size: 'large',
        desc: 'On high-volume beverage lines, multi-crate and keg transfer up to 40 kg per unit was executed with Jumbo Ergo plus KEG Gripper on a mobile jib crane, reducing impact risk to materials while improving ergonomic handling consistency.',
        color: 'blue'
    },
    {
        id: 'farmasi-dsm',
        client: 'PT. DSM Firmenich Aromatics',
        industry: 'Chemical & Pharma',
        image: '/projects/PT. DSM Firmenich Aromatics.webp',
        logo: 'https://www.dsm-firmenich.com/content/dam/dsm-firmenich/logos/logo-black.svg',
        size: 'standard',
        desc: 'Within high-cleanliness nutrition and aromatics handling, carton loads up to 20 kg were transferred with Jumbo Flex 35 and a crane system to keep movement hygienic and repeatable. The process improved ergonomic control and supported higher throughput.',
        color: 'teal'
    },
    {
        id: 'auto-federal',
        client: 'PT. Federal Karyatama',
        industry: 'Automotive & Transportation',
        image: '/projects/PT. Federal Karyatama.webp',
        logo: 'https://federaloil.co.id/themes/web/desktop2020/new/assets/collections/default/fo-logo-2.png',
        size: 'tall',
        desc: 'High-volume transfer of Federal oil carton drums with secure gripping for zero-incident handling.',
        color: 'red'
    },
    {
        id: 'packaging-fukusuke',
        client: 'PT. Fukusuke Kogyo Indonesia',
        industry: 'Packaging & Plastics',
        image: '/projects/PT. Fukusuke Kogyo Indonesia.webp',
        logo: 'https://kemindogroup.id/wp-content/uploads/2020/09/logo-client-kemindo-8.png',
        size: 'standard',
        desc: 'For packaging-film and conversion handling, carton loads up to 25 kg were supported by Jumbo Flex 35 with a crane system to improve operator ergonomics and transfer consistency. This shortened handling cycles and improved productivity stability.',
        color: 'indigo'
    },
    {
        id: 'fmcg-indofood',
        client: 'PT. Indofood CBP Sukses Makmur',
        industry: 'FMCG & F&B',
        image: '/projects/PT. Indofood CBP Sukses.webp',
        logo: 'https://www.indofoodcbp.com/images/btn/logo-indofoodcbp.png',
        size: 'large',
        desc: 'For large-scale instant-noodle logistics, carton loading and unloading up to 26 kg was standardized using Jumbo Flex 35 with a column-mounted jib crane to improve placement accuracy, labor efficiency, and ergonomic repeatability.',
        color: 'blue'
    },
    {
        id: 'fmcg-mars',
        client: 'PT. Mars Symbioscience',
        industry: 'FMCG & F&B',
        image: '/projects/PT. Mars Symbiocince.webp',
        logo: 'https://wikiexport.ai/wp-content/uploads/2022/10/15-1170x600.png',
        size: 'standard',
        desc: 'In high-volume raw-cocoa handling for chocolate manufacturing lines, carton loads up to 20 kg were managed with Jumbo Flex 35 and a column-mounted jib crane to keep transfer rhythm stable. The setup improved ergonomic control and day-to-day handling consistency.',
        color: 'blue'
    },
    {
        id: 'agrikultur-nufarm',
        client: 'PT. Nufarm Indonesia',
        industry: 'Chemical & Pharma',
        image: '/projects/PT. Nufarm.webp',
        logo: 'https://nufarm.com/id/wp-content/themes/nufarm/images/site-logo.svg',
        size: 'standard',
        desc: 'For pesticide-packaging workflows requiring safer material mobility, sack loads up to 20 kg were handled with Jumbo Flex 35 and a column-mounted jib crane. This improved ergonomic consistency while strengthening operator protection from hazardous agrochemical exposure.',
        color: 'emerald'
    },
    {
        id: 'auto-sakae',
        client: 'PT. Sakae Riken Indonesia',
        industry: 'Automotive & Transportation',
        image: '/projects/PT. Sakae Riken Indonesia.webp',
        logo: 'https://www.sakaeriken.co.jp/assets/img/common/logo/logo-site.png',
        size: 'standard',
        desc: 'In resin-accessory molding for high-gloss bumper components, sack loads up to 25 kg were transferred with Jumbo Flex 35 kg and a column-mounted jib crane. Vacuum-assisted handling helped preserve surface quality while improving ergonomic repeatability.',
        color: 'red'
    },
    {
        id: 'fmcg-suntory',
        client: 'PT. Suntory Garuda',
        industry: 'FMCG & F&B',
        image: '/projects/PT. Suntory Garuda.webp',
        logo: 'https://www.vhv.rs/dpng/d/73-737965_garudafood-logo-png-transparent-png.png',
        size: 'large',
        desc: 'For mass-cycle palletizing of energy-drink and tea bottle crates, sack loads up to 50 kg were handled with Jumbo Ergo 85 to keep repetitive movement stable at high speed. The approach improved ergonomic control and helped reduce handling-related defects.',
        color: 'blue'
    },
    {
        id: 'pipa-bredero',
        client: 'PT Bredero Shaw Indonesia',
        industry: 'Heavy Industry & Automation',
        image: '/projects/PT Bredero.webp',
        logo: 'https://karir-production.nos.jkt-1.neo.id/logos/22/1264222/Bredero_Shaw_Indonesia_01.png',
        size: 'large',
        desc: 'In large-scale coating operations, heavy steel pipe handling was supported by Jumbo Flex 35 with a column-mounted articulated jib crane for safer and more controlled transfer. For sack movement up to 25 kg, the same setup improved throughput while reducing back-strain exposure under repetitive loading.',
        color: 'slate'
    },
    {
        id: 'fmcg-delifood',
        client: 'PT Delifood Sentosa Corpindo',
        industry: 'FMCG & F&B',
        image: '/projects/PT Delifood.webp',
        logo: 'https://cdn0-production-images-kly.akamaized.net/TpRMBHzC6SCc6V4oTvo3-KIt8kE=/2560x1440/smart/filters:quality(75):strip_icc()/kly-media-production/medias/4243444/original/067506700_1669705672-logo_mayora.jpg',
        size: 'standard',
        desc: 'For fast-paced food raw-material loading, box loads up to 50 kg were handled with Jumbo Sprint plus Mechanical Gripper on a column-mounted jib crane to keep transfer speed stable. The system improved ergonomic consistency and reduced lower back-strain exposure during repetitive handling.',
        color: 'blue'
    },
    {
        id: 'fmcg-diageo',
        client: 'PT Diageo Indonesia',
        industry: 'FMCG & F&B',
        image: '/projects/PT Diageo Indonesia.webp',
        logo: 'https://cdn.getamigo.io/ggr/rebuild/client-story-imgs/diageo-hero.webp',
        size: 'standard',
        desc: 'To accelerate keg and beverage-crate logistics without disrupting operations, sack loads up to 50 kg were handled with Jumbo Sprint 65 A2 and a crane system. The setup improved ergonomic handling consistency while contributing to measurable productivity gains.',
        color: 'blue'
    },
    {
        id: 'auto-elang',
        client: 'PT Elangperdana Tyre Industry',
        industry: 'Automotive & Transportation',
        image: '/projects/PT Elang Perdana Tyre.webp',
        logo: 'https://admin.zeetex-radial.com/storage/page-contents/February2021/hcwzrhzeJOolozrpB7p5.png',
        size: 'tall',
        desc: 'For green and cured tire handling where shape integrity is critical, rubber bales up to 35 kg were transferred using Jumbo Sprint 65 with a column-mounted jib crane. This improved movement precision, supported safer handling, and helped smooth cycle time.',
        color: 'red'
    },
    {
        id: 'kimia-hempel',
        client: 'PT Hempel Indonesia',
        industry: 'Building Materials & Infrastructure',
        image: '/projects/PT Hempel Indonesia.webp',
        logo: 'https://image1ws.indotrading.com/s3/webp/co19822/companylogo/w400-h220/logo.jpg',
        size: 'standard',
        desc: 'In paint and coating handling, pail loads up to 40 kg were managed with Jumbo Sprint 65 EX and a wall-mounted flat jib crane to maintain balanced transfer and precise gripping. The operation gained safer handling with lower back-strain exposure for operators.',
        color: 'emerald'
    },
    {
        id: 'auto-robotic',
        client: 'PT Industrial Robotic Automation',
        industry: 'Heavy Industry & Automation',
        image: '/projects/PT Industrial Robotic Automation.webp',
        logo: 'https://i.imgur.com/7Jpv5Qg.jpeg',
        size: 'standard',
        desc: 'On Industry 4.0 automation lines, loads up to 220 kg were managed with Jumbo Sprint 300 kg and a column-mounted jib crane to strengthen safe, repeatable transfer. The integration improved ergonomic handling quality and made daily operation easier for operators.',
        color: 'slate'
    },
    {
        id: 'manufaktur-inoac',
        client: 'PT Inoac Polytechno Indonesia',
        industry: 'Packaging & Plastics',
        image: '/projects/PT Inoac.webp',
        logo: 'https://www.inoac.co.jp/common/img/logo.svg',
        size: 'large',
        desc: 'To protect extra-large polyurethane foam blocks from distortion during fabrication, sack loads up to 25 kg were handled with Jumbo Sprint 45 and a column-mounted jib crane. This improved ergonomic transfer consistency and reduced manual lifting burden during sack-opening tasks.',
        color: 'amber'
    },
    {
        id: 'farmasi-kalbe',
        client: 'PT Kalbe Morinaga Indonesia',
        industry: 'Chemical & Pharma',
        image: '/projects/PT Kalbe Morinaga.webp',
        logo: 'https://kalbenutritionals.com/images/kalbe-nutritionals-logo.png',
        size: 'standard',
        desc: 'Cleanroom handling systems in stainless specification, supporting sterile infant-formula production zones.',
        color: 'teal'
    },
    {
        id: 'kaca-kian',
        client: 'PT Kian Mulia Manunggal',
        industry: 'Glass & Solid Materials',
        image: '/projects/PT Kian Mulia Manunggal.webp',
        logo: 'https://www.temposcangroup.com/public/images/LOGO_TEMPO_SCAN_100_INDONESIA.png',
        size: 'tall',
        desc: 'Accurate handling of fragile glass sheets for infrastructure projects, eliminating breakage incidents on site.',
        color: 'slate'
    },
    {
        id: 'fmcg-meiji',
        client: 'PT Meiji Food Indonesia',
        industry: 'FMCG & F&B',
        image: '/projects/PT Meiji Food Indonesia.webp',
        logo: 'https://meiji.co.id/storage/public/generals/eY0Fj5yMvi7ZPSz9zNcI9RSoYvYQIuQb2cMEKCTl.png',
        size: 'standard',
        desc: 'For high-speed biscuit-carton palletizing at end-of-line stations, sack loads up to 50 kg were handled with Jumbo Sprint 65 and a column-mounted jib crane. The setup reduced bottlenecks while improving ergonomic consistency in repetitive movement.',
        color: 'blue'
    },
    {
        id: 'konstruksi-mortar',
        client: 'PT Cipta Mortar Utama',
        industry: 'Building Materials & Infrastructure',
        image: '/projects/PT Mortar Utama.webp',
        logo: 'https://www.mortarutama.com/wp-content/uploads/2023/12/logo-MU-new-hires-01-1536x635.png',
        size: 'large',
        desc: 'Efficient handling of instant mortar sack stacks with improved back protection in high-dust environments.',
        color: 'stone'
    },
    {
        id: 'fmcg-nutrifood2',
        client: 'PT Nutrifood Indonesia',
        industry: 'FMCG & F&B',
        image: '/projects/PT Nutrifood Indonesia.webp',
        logo: 'https://www.nutrifood.co.id/wp-content/themes/nutrifood/images/logo-nutrifood.png',
        size: 'standard',
        desc: 'In powdered-beverage packaging flow, sack loads up to 50 kg were handled with Jumbo Sprint 85 on a ceiling-mounted crane system to keep movement hygienic and obstruction-free. The arrangement improved ergonomic control and transfer consistency across shifts.',
        color: 'blue'
    },
    {
        id: 'elektronik-rinnai',
        client: 'PT Rinnai Indonesia',
        industry: 'Elektronik',
        image: '/projects/PT Rinnai.webp',
        logo: 'https://www.rinnai.co.id/wp-content/uploads/2019/04/logo-395x100.png',
        size: 'standard',
        desc: 'For sheet-metal partition and home-electronics assembly handling, carton loads up to 22 kg were transferred using Jumbo Flex 35 with a monorail crane. This improved ergonomic handling consistency and supported safer, damage-free vacuum gripping during transfer.',
        color: 'slate'
    },
    {
        id: 'fmcg-sarihusada',
        client: 'PT Sarihusada Generasi Mahardhika',
        industry: 'FMCG & F&B',
        image: '/projects/PT Sarihusada Generasi Mahardhika.webp',
        logo: 'https://www.sarihusada.co.id/assets/img/logo.png',
        size: 'large',
        desc: 'For clinical nutrition production with strict infant-food sanitation standards, sack loads up to 50 kg were handled using Jumbo Sprint 85 to keep transfer clean, stable, and ergonomically controlled.',
        color: 'blue'
    },
    {
        id: 'karet-sritrang',
        client: 'PT Sri Trang Lingga Indonesia',
        industry: 'Glass & Solid Materials',
        image: '/projects/PT Sri Trang Lingga.webp',
        logo: 'https://axeoneverest.com/wp-content/uploads/2011/04/sri-trang-group-everest-logo-1.jpg',
        size: 'standard',
        desc: 'To accelerate large rubber-block lifting while reducing forklift dependency, rubber bales up to 40 kg were transferred with Jumbo Sprint low Stack and a column-mounted jib crane. The setup improved ergonomic control and stabilized repetitive handling flow.',
        color: 'emerald'
    },
    {
        id: 'auto-sugity',
        client: 'PT Sugity Creatives',
        industry: 'Automotive & Transportation',
        image: '/projects/PT Sugity.webp',
        logo: 'https://uccareer.id/assets/upload/company/thumbs/thumb300px-20251007-100131-a1262.jpg',
        size: 'standard',
        desc: 'For scratch-free transfer of large injection-molded automotive parts, sack loads up to 25 kg were handled with Jumbo Sprint 45 and a mobile jib crane. This preserved resin-part finish quality while improving ergonomic repeatability.',
        color: 'red'
    },
    {
        id: 'auto-summy',
        client: 'PT Sumi Rubber Indonesia',
        industry: 'Automotive & Transportation',
        image: '/projects/PT Summy Rubber.webp',
        logo: 'https://dunlop.co.id/logo-default.svg',
        size: 'standard',
        desc: 'In tire-curing rubber operations, sack loads up to 25 kg were managed with Jumbo Sprint 65 and a column-mounted jib crane to support output targets without compromising HSE standards. The process improved ergonomic handling consistency across repetitive cycles.',
        color: 'red'
    },
    {
        id: 'fmcg-urc',
        client: 'PT URC Indonesia',
        industry: 'FMCG & F&B',
        image: '/projects/PT URC Indonesia.webp',
        logo: 'https://www.urc.co.id/wp-content/uploads/2021/01/2.jpg',
        size: 'standard',
        desc: 'To improve snack-carton palletizing rhythm in warehouse operations, sack loads up to 50 kg were handled with Jumbo Sprint 65 and a column-mounted jib crane. This reduced repetitive strain pressure and supported stable single-operator handling.',
        color: 'blue'
    },
    {
        id: 'auto-evoluzione',
        client: 'PT. Evoluzione Tyres',
        industry: 'Automotive & Transportation',
        image: '/projects/PT. Evoluzione Tyre.webp',
        logo: 'https://csr.subang.go.id/assets/upload/company/pt-evoluzione-tyres-768x576.jpg',
        size: 'tall',
        desc: 'In tire-formulation handling, manual sack movement was upgraded with Jumbo Sprint 65 and a 12 x 6 m crane system for loads up to 25 kg. The new workflow delivered faster transfer cycles and improved operator ergonomics in daily operation.',
        color: 'red'
    },
    {
        id: 'konstruksi-mura',
        client: 'PT. Mura Maha Agung',
        industry: 'Building Materials & Infrastructure',
        image: '/projects/PT. Mura Maha Agung.webp',
        logo: 'https://www.muramaha.com/wp-content/uploads/2017/01/cropped-logo-muramaha3.png',
        size: 'standard',
        desc: 'For safer transfer of steel plates and heavy fabricated structures, sack loads up to 50 kg were supported with Jumbo Sprint 85 kg to stabilize movement and reduce deflection risk during handling.',
        color: 'slate'
    },
    {
        id: 'auto-suryaraya',
        client: 'PT Suryaraya Rubberindo Industries',
        industry: 'Automotive & Transportation',
        image: '/projects/PT. Suryaraya Rubberindo.webp',
        logo: 'https://fdrtire.com/assets/frontend/img/logo.jpg',
        size: 'standard',
        desc: 'On two-wheel tire assembly lines, roll loads up to 38 kg were handled using SCH plus Mechanical Gripper with a column-mounted jib crane to keep repetitive sorting safer and more consistent. The setup also helped lower downtime risk linked to operator strain.',
        color: 'red'
    },
    {
        id: 'auto-astra',
        client: 'PT Astra Daihatsu Motor',
        industry: 'Automotive & Transportation',
        image: '/projects/PT Astra Daihatsu Motor.webp',
        logo: 'https://medias.astra-daihatsu.id/sys-master-media/h70/hc8/8819719208990/astraDaihatsulogo.svg',
        size: 'large',
        desc: 'For warehouse raw-material handling, including large barrels, small barrels, and pallets, loads up to 250 kg were managed with SCH-M and an aluminum crane system. Chain-hoist integration improved handling consistency and made daily transfer operations easier. Implementation scope covered West Karawang Plant.',
        color: 'red'
    },
    {
        id: 'fmcg-garuda',
        client: 'PT Garuda Food',
        industry: 'FMCG & F&B',
        image: '/projects/PT Garuda Food.webp',
        logo: 'https://www.vhv.rs/dpng/d/73-737965_garudafood-logo-png-transparent-png.png',
        size: 'standard',
        desc: 'At end-of-line palletizing zones, sack loads up to 50 kg were handled with Mechanical Gripper plus SCH on a column-mounted jib crane to keep snack-carton packaging flow faster and safer. This lowered operator burden during repetitive transfer tasks.',
        color: 'blue'
    },
    {
        id: 'konstruksi-ykk',
        client: 'PT YKK AP Indonesia',
        industry: 'Building Materials & Infrastructure',
        image: '/projects/PT YKK AP.webp',
        logo: 'https://www.ykkap.co.id/assets/img/header_logo01.svg',
        size: 'tall',
        desc: 'For precision handling of extruded architectural aluminum profiles, aluminum rolls up to 38 kg were transferred with SCH plus Scissors Gripper and a column-mounted jib crane. The setup reduced surface-scratch risk while improving ergonomic handling consistency.',
        color: 'slate'
    },
];
