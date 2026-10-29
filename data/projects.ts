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
        logo: '/images/clients/logo-pt-mayora-indah.webp',
        size: 'large',
        desc: 'High-volume FMCG production and packaging flow was improved with ergonomic handling support to maintain throughput and reduce product damage across critical transfer stages.',
        color: 'blue'
    },
    {
        id: 'auto-gt',
        client: 'PT Gajah Tunggal',
        industry: 'Automotive & Transportation',
        image: '/projects/PT Gajah Tunggal.webp',
        logo: '/images/clients/logo-pt-gajah-tunggal.webp',
        size: 'tall',
        desc: 'To improve tire-assembly throughput while reducing lower-back strain risk, sheet rubber loads up to 45 kg were handled using a Binar Handling Pneumatic Lifting Device with vacuum gripper. The setup delivered safer transfer and stable single-operator handling on repetitive cycles.',
        color: 'red'
    },
    {
        id: 'auto-gt-1',
        client: 'PT Gajah Tunggal',
        industry: 'Automotive & Transportation',
        image: '/projects/PT Gajah Tunggal (1).webp',
        logo: '/images/clients/logo-pt-gajah-tunggal.webp',
        size: 'standard',
        desc: 'In high carbon-dust rubber-mixing areas, rubber bales up to 40 kg were handled with Jumbo Sprint 85 and a crane system to stabilize repetitive transfer. The upgrade improved ergonomic control and reduced lower back-strain exposure during routine handling.',
        color: 'red'
    },
    {
        id: 'auto-gt-2',
        client: 'PT Gajah Tunggal',
        industry: 'Automotive & Transportation',
        image: '/projects/PT Gajah Tunggal (2).webp',
        logo: '/images/clients/logo-pt-gajah-tunggal.webp',
        size: 'standard',
        desc: 'For curing-press handling under high-temperature conditions, tire rolls up to 200 kg were managed with a Pneumatic Lifting Device and Mechanical Gripper to preserve geometry during transfer. The process delivered stable and safer single-operator handling.',
        color: 'red'
    },
    {
        id: 'aviasi-ap2',
        client: 'PT Angkasa Pura II',
        industry: 'Air Logistics',
        image: '/projects/PT Angkasa Pura II.webp',
        logo: '/images/clients/logo-pt-angkasa-pura-ii.webp',
        size: 'standard',
        desc: 'At baggage-handling points where speed and load pressure are both high, bag and suitcase units up to 50 kg were transferred using Jumbo Flex 50 to reduce rough handling risk. The solution improved ergonomic control and enabled safer, damage-free vacuum gripping. Implementation scope covered Plant B.',
        color: 'sky'
    },
    {
        id: 'kaca-asahimas',
        client: 'PT Asahimas Flat Glass Tbk',
        industry: 'Glass & Solid Materials',
        image: '/projects/PT Asahimas Flat Glass Tbk.webp',
        logo: '/images/clients/logo-pt-asahimas-flat-glass-tbk.webp',
        size: 'large',
        desc: 'For heavy glass-sheet handling in demanding assembly zones, loads up to 250 kg were managed with Vacumaster Basic 90 500 kg to preserve even load distribution and reduce crack or scratch exposure. The process achieved safer handling with reliable single-operator control.',
        color: 'slate'
    },
    {
        id: 'fmcg-unilever',
        client: 'PT Unilever Indonesia Tbk',
        industry: 'FMCG & F&B',
        image: '/projects/PT Unilever Indonesia Tbk.webp',
        logo: '/images/clients/logo-pt-unilever-indonesia-tbk.webp',
        size: 'standard',
        desc: 'To support fast and hygienic handling aligned with modern FMCG safety expectations, sack loads up to 25 kg were transferred using Jumbo Flex 35 with a column-mounted jib crane. This improved handling consistency and helped reduce downtime risk linked to operator strain.',
        color: 'blue'
    },
    {
        id: 'kimia-nikka',
        client: 'PT. Indonesia Nikka Chemicals',
        industry: 'Chemical & Pharma',
        image: '/projects/PT. Indonesia Nikka Chemicals.webp',
        logo: '/images/clients/logo-pt-indonesia-nikka-chemicals.webp',
        size: 'tall',
        desc: 'To support safer transfer of textile chemical materials, sack loads up to 50 kg were handled using Jumbo Sprint 65 A2 with a column-mounted flat jib crane. This reduced spill exposure, improved ergonomic control, and helped increase line throughput.',
        color: 'emerald'
    },
    {
        id: 'auto-gs',
        client: 'PT GS Battery',
        industry: 'Automotive & Transportation',
        image: '/projects/PT GS Battery.webp',
        logo: '/images/clients/logo-pt-gs-battery.webp',
        size: 'standard',
        desc: 'For dense battery-assembly handling, loads up to 34 kg were transferred with Jumbo Flex 50 and a column-mounted jib crane to maintain precise positioning and stable repetitive flow. The setup enabled safer, reliable single-operator handling.',
        color: 'red'
    },
    {
        id: 'fmcg-nestle',
        client: 'PT Nestle Indonesia',
        industry: 'FMCG & F&B',
        image: '/projects/PT NESTLE.webp',
        logo: '/images/clients/logo-pt-nestle-indonesia.svg',
        size: 'standard',
        desc: 'In nutrition-packaging operations with clean-zone requirements, Jumbo Flex 35 with a mobile jib crane was applied to improve lifting consistency and maintain ergonomic material handling performance.',
        color: 'blue'
    },
    {
        id: 'packaging-hokkan',
        client: 'PT Hokkan Indonesia',
        industry: 'Packaging & Plastics',
        image: '/projects/PT HOKKAN INDONESIA.webp',
        logo: '/images/clients/logo-pt-hokkan-indonesia.webp',
        size: 'large',
        desc: 'In high-speed PET bottle operations, sack loads up to 50 kg were handled with Jumbo Sprint 85 and a crane system to stabilize repetitive transfer and reduce loading-cycle time. The result was smoother handling with stronger productivity performance.',
        color: 'indigo'
    },
    {
        id: 'kayu-taco',
        client: 'PT Taco Anugrah Corporindo',
        industry: 'Furniture & Interior',
        image: '/projects/PT Taco Anugrah Corporindo.webp',
        logo: '/images/clients/logo-pt-taco-anugrah-corporindo.svg',
        size: 'tall',
        desc: 'Accelerated handling of porous HPL sheets with non-marking contact that protects premium architectural finishes.',
        color: 'amber'
    },
    {
        id: 'farmasi-otsuka',
        client: 'PT Otsuka Indonesia',
        industry: 'Chemical & Pharma',
        image: '/projects/PT Otsuka Indonesia.webp',
        logo: '/images/clients/logo-pt-otsuka-indonesia.webp',
        size: 'standard',
        desc: 'For high-sanitation cleanroom handling, sack loads up to 50 kg were managed using Jumbo Sprint 65 with a column-mounted jib crane to support ergonomic transfer, process consistency, and clinical nutrition compliance requirements.',
        color: 'teal'
    },
    {
        id: 'kimia-mowilex',
        client: 'PT Mowilex Indonesia',
        industry: 'Chemical & Pharma',
        image: '/projects/PT Mowilex Indonesia.webp',
        logo: '/images/clients/logo-pt-mowilex-indonesia.webp',
        size: 'standard',
        desc: 'For high-frequency coating-material transfer, sack loads up to 50 kg were handled with Jumbo Sprint 85 and a column-mounted jib crane to keep movement consistent across shifts. This reduced back-fatigue exposure while improving ergonomic handling control.',
        color: 'emerald'
    },
    {
        id: 'fmcg-yakult',
        client: 'PT Yakult Indonesia Persada',
        industry: 'FMCG & F&B',
        image: '/projects/PT Yakult Indonesia Persada.webp',
        logo: '/images/clients/logo-pt-yakult-indonesia-persada.svg',
        size: 'standard',
        desc: 'Across probiotic beverage bulk-handling operations, sack loads up to 50 kg were handled with Jumbo Sprint 85 and a column-mounted jib crane to maintain hygienic transfer conditions and more consistent ergonomic handling.',
        color: 'blue'
    },
    {
        id: 'fmcg-nutrifood',
        client: 'PT Nutrifood Indonesia',
        industry: 'FMCG & F&B',
        image: '/projects/PT Nutrifood Indonesia.webp',
        logo: '/images/clients/logo-pt-nutrifood-indonesia.webp',
        size: 'standard',
        desc: 'In health-nutrition production lines, integrated ergonomic vacuum handling was applied for sack loads up to 50 kg using Jumbo Sprint 85 kg with a column-mounted flat jib crane, improving material flow stability and operator handling control.',
        color: 'blue'
    },
    {
        id: 'fmcg-nutribev',
        client: 'PT Nutribev Nabati Indonesia',
        industry: 'FMCG & F&B',
        image: '/projects/PT Nutribev Nabati Indonesia.webp',
        logo: '/images/clients/logo-pt-nutribev-nabati-indonesia.webp',
        size: 'large',
        desc: 'To sustain high-output snack manufacturing targets, carton and sack handling up to 50 kg was supported by Jumbo Sprint 85 with a column-mounted jib crane. The system improved repetitive lifting consistency and strengthened ergonomic handling control at line speed.',
        color: 'blue'
    },
    {
        id: 'kimia-cabot',
        client: 'PT Cabot Indonesia',
        industry: 'Chemical & Pharma',
        image: '/projects/PT Cabot Indonesia.webp',
        logo: '/images/clients/logo-pt-cabot-indonesia.webp',
        size: 'standard',
        desc: 'For synthetic raw-material transfer at scale, loads up to 25 kg were managed with Jumbo Ergo 45 and a column-mounted jib crane to improve handling consistency and reduce leakage risk during movement. This delivered faster, more controlled handling cycles.',
        color: 'emerald'
    },
    {
        id: 'kayu-permata',
        client: 'PT Kayu Permata',
        industry: 'Furniture & Interior',
        image: '/projects/PT Kayu Permata.webp',
        logo: '/images/clients/logo-pt-kayu-permata.svg',
        size: 'standard',
        desc: 'To improve panel rotation in premium door and furniture production, wooden panel loads up to 50 kg were handled with Jumbo Ergo 85 and a mobile jib crane. This reduced physical strain while keeping movement precision consistent across repetitive tasks.',
        color: 'amber'
    },
    {
        id: 'fmcg-multibintang',
        client: 'PT Multi Bintang Indonesia Tbk',
        industry: 'FMCG & F&B',
        image: '/projects/PT Multi Bintang Indonesia Tbk.webp',
        logo: '/images/clients/logo-pt-multi-bintang-indonesia-tbk.webp',
        size: 'large',
        desc: 'On high-volume beverage lines, multi-crate and keg transfer up to 40 kg per unit was executed with Jumbo Ergo plus KEG Gripper on a mobile jib crane, reducing impact risk to materials while improving ergonomic handling consistency.',
        color: 'blue'
    },
    {
        id: 'farmasi-dsm',
        client: 'PT. DSM Firmenich Aromatics',
        industry: 'Chemical & Pharma',
        image: '/projects/PT. DSM Firmenich Aromatics.webp',
        logo: '/images/clients/logo-pt-dsm-firmenich-aromatics.svg',
        size: 'standard',
        desc: 'Within high-cleanliness nutrition and aromatics handling, carton loads up to 20 kg were transferred with Jumbo Flex 35 and a crane system to keep movement hygienic and repeatable. The process improved ergonomic control and supported higher throughput.',
        color: 'teal'
    },
    {
        id: 'auto-federal',
        client: 'PT. Federal Karyatama',
        industry: 'Automotive & Transportation',
        image: '/projects/PT. Federal Karyatama.webp',
        logo: '/images/clients/logo-pt-federal-karyatama.webp',
        size: 'tall',
        desc: 'High-volume transfer of Federal oil carton drums with secure gripping for zero-incident handling.',
        color: 'red'
    },
    {
        id: 'packaging-fukusuke',
        client: 'PT. Fukusuke Kogyo Indonesia',
        industry: 'Packaging & Plastics',
        image: '/projects/PT. Fukusuke Kogyo Indonesia.webp',
        logo: '/images/clients/logo-pt-fukusuke-kogyo-indonesia.webp',
        size: 'standard',
        desc: 'For packaging-film and conversion handling, carton loads up to 25 kg were supported by Jumbo Flex 35 with a crane system to improve operator ergonomics and transfer consistency. This shortened handling cycles and improved productivity stability.',
        color: 'indigo'
    },
    {
        id: 'fmcg-indofood',
        client: 'PT. Indofood CBP Sukses Makmur',
        industry: 'FMCG & F&B',
        image: '/projects/PT. Indofood CBP Sukses.webp',
        logo: '/images/clients/logo-pt-indofood-cbp-sukses-makmur.webp',
        size: 'large',
        desc: 'For large-scale instant-noodle logistics, carton loading and unloading up to 26 kg was standardized using Jumbo Flex 35 with a column-mounted jib crane to improve placement accuracy, labor efficiency, and ergonomic repeatability.',
        color: 'blue'
    },
    {
        id: 'fmcg-mars',
        client: 'PT. Mars Symbioscience',
        industry: 'FMCG & F&B',
        image: '/projects/PT. Mars Symbiocince.webp',
        logo: '/images/clients/logo-pt-mars-symbioscience.webp',
        size: 'standard',
        desc: 'In high-volume raw-cocoa handling for chocolate manufacturing lines, carton loads up to 20 kg were managed with Jumbo Flex 35 and a column-mounted jib crane to keep transfer rhythm stable. The setup improved ergonomic control and day-to-day handling consistency.',
        color: 'blue'
    },
    {
        id: 'agrikultur-nufarm',
        client: 'PT. Nufarm Indonesia',
        industry: 'Chemical & Pharma',
        image: '/projects/PT. Nufarm.webp',
        logo: '/images/clients/logo-pt-nufarm-indonesia.svg',
        size: 'standard',
        desc: 'For pesticide-packaging workflows requiring safer material mobility, sack loads up to 20 kg were handled with Jumbo Flex 35 and a column-mounted jib crane. This improved ergonomic consistency while strengthening operator protection from hazardous agrochemical exposure.',
        color: 'emerald'
    },
    {
        id: 'auto-sakae',
        client: 'PT. Sakae Riken Indonesia',
        industry: 'Automotive & Transportation',
        image: '/projects/PT. Sakae Riken Indonesia.webp',
        logo: '/images/clients/logo-pt-sakae-riken-indonesia.webp',
        size: 'standard',
        desc: 'In resin-accessory molding for high-gloss bumper components, sack loads up to 25 kg were transferred with Jumbo Flex 35 kg and a column-mounted jib crane. Vacuum-assisted handling helped preserve surface quality while improving ergonomic repeatability.',
        color: 'red'
    },
    {
        id: 'fmcg-suntory',
        client: 'PT. Suntory Garuda',
        industry: 'FMCG & F&B',
        image: '/projects/PT. Suntory Garuda.webp',
        logo: '/images/clients/logo-pt-suntory-garuda.webp',
        size: 'large',
        desc: 'For mass-cycle palletizing of energy-drink and tea bottle crates, sack loads up to 50 kg were handled with Jumbo Ergo 85 to keep repetitive movement stable at high speed. The approach improved ergonomic control and helped reduce handling-related defects.',
        color: 'blue'
    },
    {
        id: 'pipa-bredero',
        client: 'PT Bredero Shaw Indonesia',
        industry: 'Heavy Industry & Automation',
        image: '/projects/PT Bredero.webp',
        logo: '/images/clients/logo-pt-bredero-shaw-indonesia.webp',
        size: 'large',
        desc: 'In large-scale coating operations, heavy steel pipe handling was supported by Jumbo Flex 35 with a column-mounted articulated jib crane for safer and more controlled transfer. For sack movement up to 25 kg, the same setup improved throughput while reducing back-strain exposure under repetitive loading.',
        color: 'slate'
    },
    {
        id: 'fmcg-delifood',
        client: 'PT Delifood Sentosa Corpindo',
        industry: 'FMCG & F&B',
        image: '/projects/PT Delifood.webp',
        logo: '/images/clients/logo-pt-delifood-sentosa-corpindo.webp',
        size: 'standard',
        desc: 'For fast-paced food raw-material loading, box loads up to 50 kg were handled with Jumbo Sprint plus Mechanical Gripper on a column-mounted jib crane to keep transfer speed stable. The system improved ergonomic consistency and reduced lower back-strain exposure during repetitive handling.',
        color: 'blue'
    },
    {
        id: 'fmcg-diageo',
        client: 'PT Diageo Indonesia',
        industry: 'FMCG & F&B',
        image: '/projects/PT Diageo Indonesia.webp',
        logo: '/images/clients/logo-pt-diageo-indonesia.webp',
        size: 'standard',
        desc: 'To accelerate keg and beverage-crate logistics without disrupting operations, sack loads up to 50 kg were handled with Jumbo Sprint 65 A2 and a crane system. The setup improved ergonomic handling consistency while contributing to measurable productivity gains.',
        color: 'blue'
    },
    {
        id: 'auto-elang',
        client: 'PT Elangperdana Tyre Industry',
        industry: 'Automotive & Transportation',
        image: '/projects/PT Elang Perdana Tyre.webp',
        logo: '/images/clients/logo-pt-elangperdana-tyre-industry.webp',
        size: 'tall',
        desc: 'For green and cured tire handling where shape integrity is critical, rubber bales up to 35 kg were transferred using Jumbo Sprint 65 with a column-mounted jib crane. This improved movement precision, supported safer handling, and helped smooth cycle time.',
        color: 'red'
    },
    {
        id: 'kimia-hempel',
        client: 'PT Hempel Indonesia',
        industry: 'Building Materials & Infrastructure',
        image: '/projects/PT Hempel Indonesia.webp',
        logo: '/images/clients/logo-pt-hempel-indonesia.webp',
        size: 'standard',
        desc: 'In paint and coating handling, pail loads up to 40 kg were managed with Jumbo Sprint 65 EX and a wall-mounted flat jib crane to maintain balanced transfer and precise gripping. The operation gained safer handling with lower back-strain exposure for operators.',
        color: 'emerald'
    },
    {
        id: 'auto-robotic',
        client: 'PT Industrial Robotic Automation',
        industry: 'Heavy Industry & Automation',
        image: '/projects/PT Industrial Robotic Automation.webp',
        logo: '/images/clients/logo-pt-industrial-robotic-automation.webp',
        size: 'standard',
        desc: 'On Industry 4.0 automation lines, loads up to 220 kg were managed with Jumbo Sprint 300 kg and a column-mounted jib crane to strengthen safe, repeatable transfer. The integration improved ergonomic handling quality and made daily operation easier for operators.',
        color: 'slate'
    },
    {
        id: 'manufaktur-inoac',
        client: 'PT Inoac Polytechno Indonesia',
        industry: 'Packaging & Plastics',
        image: '/projects/PT Inoac.webp',
        logo: '/images/clients/logo-pt-inoac-polytechno-indonesia.svg',
        size: 'large',
        desc: 'To protect extra-large polyurethane foam blocks from distortion during fabrication, sack loads up to 25 kg were handled with Jumbo Sprint 45 and a column-mounted jib crane. This improved ergonomic transfer consistency and reduced manual lifting burden during sack-opening tasks.',
        color: 'amber'
    },
    {
        id: 'farmasi-kalbe',
        client: 'PT Kalbe Morinaga Indonesia',
        industry: 'Chemical & Pharma',
        image: '/projects/PT Kalbe Morinaga.webp',
        logo: '/images/clients/logo-pt-kalbe-morinaga-indonesia.webp',
        size: 'standard',
        desc: 'Cleanroom handling systems in stainless specification, supporting sterile infant-formula production zones.',
        color: 'teal'
    },
    {
        id: 'kaca-kian',
        client: 'PT Kian Mulia Manunggal',
        industry: 'Glass & Solid Materials',
        image: '/projects/PT Kian Mulia Manunggal.webp',
        logo: '/images/clients/logo-pt-kian-mulia-manunggal.webp',
        size: 'tall',
        desc: 'Accurate handling of fragile glass sheets for infrastructure projects, eliminating breakage incidents on site.',
        color: 'slate'
    },
    {
        id: 'fmcg-meiji',
        client: 'PT Meiji Food Indonesia',
        industry: 'FMCG & F&B',
        image: '/projects/PT Meiji Food Indonesia.webp',
        logo: '/images/clients/meiji-logo.webp',
        size: 'standard',
        desc: 'For high-speed biscuit-carton palletizing at end-of-line stations, sack loads up to 50 kg were handled with Jumbo Sprint 65 and a column-mounted jib crane. The setup reduced bottlenecks while improving ergonomic consistency in repetitive movement.',
        color: 'blue'
    },
    {
        id: 'konstruksi-mortar',
        client: 'PT Cipta Mortar Utama',
        industry: 'Building Materials & Infrastructure',
        image: '/projects/PT Mortar Utama.webp',
        logo: '/images/clients/logo-pt-cipta-mortar-utama.webp',
        size: 'large',
        desc: 'Efficient handling of instant mortar sack stacks with improved back protection in high-dust environments.',
        color: 'stone'
    },
    {
        id: 'fmcg-nutrifood2',
        client: 'PT Nutrifood Indonesia',
        industry: 'FMCG & F&B',
        image: '/projects/PT Nutrifood Indonesia.webp',
        logo: '/images/clients/logo-pt-nutrifood-indonesia.webp',
        size: 'standard',
        desc: 'In powdered-beverage packaging flow, sack loads up to 50 kg were handled with Jumbo Sprint 85 on a ceiling-mounted crane system to keep movement hygienic and obstruction-free. The arrangement improved ergonomic control and transfer consistency across shifts.',
        color: 'blue'
    },
    {
        id: 'elektronik-rinnai',
        client: 'PT Rinnai Indonesia',
        industry: 'Elektronik',
        image: '/projects/PT Rinnai.webp',
        logo: '/images/clients/logo-pt-rinnai-indonesia.svg',
        size: 'standard',
        desc: 'For sheet-metal partition and home-electronics assembly handling, carton loads up to 22 kg were transferred using Jumbo Flex 35 with a monorail crane. This improved ergonomic handling consistency and supported safer, damage-free vacuum gripping during transfer.',
        color: 'slate'
    },
    {
        id: 'fmcg-sarihusada',
        client: 'PT Sarihusada Generasi Mahardhika',
        industry: 'FMCG & F&B',
        image: '/projects/PT Sarihusada Generasi Mahardhika.webp',
        logo: '/images/clients/logo-pt-sarihusada-generasi-mahardhika.webp',
        size: 'large',
        desc: 'For clinical nutrition production with strict infant-food sanitation standards, sack loads up to 50 kg were handled using Jumbo Sprint 85 to keep transfer clean, stable, and ergonomically controlled.',
        color: 'blue'
    },
    {
        id: 'karet-sritrang',
        client: 'PT Sri Trang Lingga Indonesia',
        industry: 'Glass & Solid Materials',
        image: '/projects/PT Sri Trang Lingga.webp',
        logo: '/images/clients/logo-pt-sri-trang-lingga-indonesia.webp',
        size: 'standard',
        desc: 'To accelerate large rubber-block lifting while reducing forklift dependency, rubber bales up to 40 kg were transferred with Jumbo Sprint low Stack and a column-mounted jib crane. The setup improved ergonomic control and stabilized repetitive handling flow.',
        color: 'emerald'
    },
    {
        id: 'auto-sugity',
        client: 'PT Sugity Creatives',
        industry: 'Automotive & Transportation',
        image: '/projects/PT Sugity.webp',
        logo: '/images/clients/sugity-logo.webp',
        size: 'standard',
        desc: 'For scratch-free transfer of large injection-molded automotive parts, component loads up to 25 kg were handled with Jumbo Sprint 45 and a mobile jib crane. This preserved resin-part finish quality while improving ergonomic repeatability.',
        color: 'red'
    },
    {
        id: 'auto-summy',
        client: 'PT Sumi Rubber Indonesia',
        industry: 'Automotive & Transportation',
        image: '/projects/PT Summy Rubber.webp',
        logo: '/images/clients/logo-pt-sumi-rubber-indonesia.svg',
        size: 'standard',
        desc: 'In tire-curing rubber operations, sack loads up to 25 kg were managed with Jumbo Sprint 65 and a column-mounted jib crane to support output targets without compromising HSE standards. The process improved ergonomic handling consistency across repetitive cycles.',
        color: 'red'
    },
    {
        id: 'fmcg-urc',
        client: 'PT URC Indonesia',
        industry: 'FMCG & F&B',
        image: '/projects/PT URC Indonesia.webp',
        logo: '/images/clients/logo-pt-urc-indonesia.webp',
        size: 'standard',
        desc: 'To improve snack-carton palletizing rhythm in warehouse operations, sack loads up to 50 kg were handled with Jumbo Sprint 65 and a column-mounted jib crane. This reduced repetitive strain pressure and supported stable single-operator handling.',
        color: 'blue'
    },
    {
        id: 'auto-evoluzione',
        client: 'PT. Evoluzione Tyres',
        industry: 'Automotive & Transportation',
        image: '/projects/PT. Evoluzione Tyre.webp',
        logo: '/images/clients/logo-pt-evoluzione-tyres.webp',
        size: 'tall',
        desc: 'In tire-formulation handling, manual sack movement was upgraded with Jumbo Sprint 65 and a 12 x 6 m crane system for loads up to 25 kg. The new workflow delivered faster transfer cycles and improved operator ergonomics in daily operation.',
        color: 'red'
    },
    {
        id: 'konstruksi-mura',
        client: 'PT. Mura Maha Agung',
        industry: 'Building Materials & Infrastructure',
        image: '/projects/PT. Mura Maha Agung.webp',
        logo: '/images/clients/logo-pt-mura-maha-agung.webp',
        size: 'standard',
        desc: 'For safer transfer of steel plates and heavy fabricated structures, sack loads up to 50 kg were supported with Jumbo Sprint 85 kg to stabilize movement and reduce deflection risk during handling.',
        color: 'slate'
    },
    {
        id: 'auto-suryaraya',
        client: 'PT Suryaraya Rubberindo Industries',
        industry: 'Automotive & Transportation',
        image: '/projects/PT. Suryaraya Rubberindo.webp',
        logo: '/images/clients/logo-pt-suryaraya-rubberindo-industries.webp',
        size: 'standard',
        desc: 'On two-wheel tire assembly lines, roll loads up to 38 kg were handled using SCH plus Mechanical Gripper with a column-mounted jib crane to keep repetitive sorting safer and more consistent. The setup also helped lower downtime risk linked to operator strain.',
        color: 'red'
    },
    {
        id: 'auto-astra',
        client: 'PT Astra Daihatsu Motor',
        industry: 'Automotive & Transportation',
        image: '/projects/PT Astra Daihatsu Motor.webp',
        logo: '/images/clients/logo-pt-astra-daihatsu-motor.svg',
        size: 'large',
        desc: 'For warehouse raw-material handling, including large barrels, small barrels, and pallets, loads up to 250 kg were managed with SCH-M and an aluminum crane system. Chain-hoist integration improved handling consistency and made daily transfer operations easier. Implementation scope covered West Karawang Plant.',
        color: 'red'
    },
    {
        id: 'fmcg-garuda',
        client: 'PT Garuda Food',
        industry: 'FMCG & F&B',
        image: '/projects/PT Garuda Food.webp',
        logo: '/images/clients/logo-pt-suntory-garuda.webp',
        size: 'standard',
        desc: 'At end-of-line palletizing zones, sack loads up to 50 kg were handled with Mechanical Gripper plus SCH on a column-mounted jib crane to keep snack-carton packaging flow faster and safer. This lowered operator burden during repetitive transfer tasks.',
        color: 'blue'
    },
    {
        id: 'konstruksi-ykk',
        client: 'PT YKK AP Indonesia',
        industry: 'Building Materials & Infrastructure',
        image: '/projects/PT YKK AP.webp',
        logo: '/images/clients/logo-pt-ykk-ap-indonesia.svg',
        size: 'tall',
        desc: 'For precision handling of extruded architectural aluminum profiles, aluminum rolls up to 38 kg were transferred with SCH plus Scissors Gripper and a column-mounted jib crane. The setup reduced surface-scratch risk while improving ergonomic handling consistency.',
        color: 'slate'
    },
];


export const INDUSTRY_TRANSLATIONS_ID: Record<string, string> = {
    'All': 'Semua Sektor',
    'FMCG & F&B': 'FMCG & Makanan Minuman',
    'Automotive & Transportation': 'Otomotif & Transportasi',
    'Air Logistics': 'Logistik Udara & Bandara',
    'Glass & Solid Materials': 'Kaca & Material Padat',
    'Chemical & Pharma': 'Kimia & Farmasi',
    'Packaging & Plastics': 'Kemasan & Plastik',
    'Furniture & Interior': 'Furnitur & Interior',
    'Heavy Industry & Automation': 'Industri Berat & Otomasi',
    'Building Materials & Infrastructure': 'Material Bangunan & Konstruksi',
    'Elektronik': 'Elektronik & Peralatan Rumah Tangga',
};

export const PROJECT_DESC_ID: Record<string, string> = {
    'fmcg-mayora': 'Alur produksi dan pengemasan FMCG berkapasitas tinggi ditingkatkan menggunakan sistem ergonomic handling untuk menjaga kestabilan throughput serta menekan risiko kerusakan kemasan pada tahapan transfer utama.',
    'auto-gt': 'Untuk meningkatkan throughput perakitan ban sekaligus menekan risiko cedera punggung bawah, lembaran karet dengan payload hingga 45 kg ditangani menggunakan Binar Handling Pneumatic Lifting Device dengan Vacuum Gripper. Sistem ini menghasilkan pemindahan yang lebih aman dan stabil oleh satu operator.',
    'auto-gt-1': 'Di area pencampuran karet dengan tingkat debu karbon tinggi, bal karet hingga 40 kg dipindahkan menggunakan JumboSprint 85 dan Crane System guna menstabilkan siklus angkat berulang serta mengurangi beban pinggang operator.',
    'auto-gt-2': 'Untuk penanganan area curing press bersuhu tinggi, gulungan ban hingga 200 kg dipindahkan menggunakan Pneumatic Lifting Device dan Mechanical Gripper agar bentuk ban tetap terjaga dan aman dikendalikan oleh satu operator.',
    'aviasi-ap2': 'Pada area penanganan bagasi bandara dengan ritme kerja cepat, koper dan tas hingga 50 kg dipindahkan menggunakan JumboFlex 50 untuk mencegah benturan kasar dan melindungi operator. Lingkup instalasi mencakup operasional Plant B.',
    'kaca-asahimas': 'Untuk penanganan lembaran kaca berat di area perakitan, beban hingga 250 kg diangkat menggunakan VacuMaster Basic 90 500 kg guna menjaga distribusi beban merata, mencegah risiko retak atau goresan, serta memudahkan kontrol oleh satu operator.',
    'fmcg-unilever': 'Untuk mendukung pemindahan cepat dan higienis sesuai standar keselamatan FMCG modern, karung bahan baku hingga 25 kg dipindahkan menggunakan JumboFlex 35 dengan Column-Mounted Jib Crane, menjaga konsistensi cycle time dan menekan risiko kelelahan operator.',
    'kimia-nikka': 'Untuk pemindahan bahan kimia tekstil yang lebih aman, karung hingga 50 kg ditangani menggunakan JumboSprint 65 A2 dengan Column-Mounted Flat Jib Crane. Instalasi ini menekan risiko tumpahan bahan dan meningkatkan throughput lini.',
    'auto-gs': 'Pada lini perakitan aki kendaraan, komponen padat hingga 34 kg dipindahkan menggunakan JumboFlex 50 dan Column-Mounted Jib Crane untuk menjaga presisi penempatan dan kestabilan alur kerja satu operator.',
    'fmcg-nestle': 'Di area pengemasan nutrisi dengan standar kebersihan ketat, unit JumboFlex 35 dengan Mobile Jib Crane diterapkan untuk menjaga konsistensi pemindahan beban dan ergonomi kerja operator.',
    'packaging-hokkan': 'Pada lini produksi botol PET berkecepatan tinggi, karung resin hingga 50 kg ditangani menggunakan JumboSprint 85 dan Crane System untuk menstabilkan transfer berulang serta mempercepat cycle time pengisian bahan.',
    'kayu-taco': 'Mempercepat pemindahan lembaran HPL berpori menggunakan suction cup bebas bekas (non-marking) yang menjaga kualitas permukaan produk interior.',
    'farmasi-otsuka': 'Untuk penanganan di ruang cleanroom berstandar sanitasi tinggi, karung bahan baku hingga 50 kg dipindahkan menggunakan JumboSprint 65 dengan Column-Mounted Jib Crane guna mendukung kepatuhan standar nutrisi klinis.',
    'kimia-mowilex': 'Untuk transfer bahan baku cat berfrekuensi tinggi, karung hingga 50 kg ditangani dengan JumboSprint 85 dan Column-Mounted Jib Crane agar ritme pemindahan tetap stabil antar-shift tanpa membebani punggung operator.',
    'fmcg-yakult': 'Pada operasional penanganan bahan baku minuman probiotik, karung hingga 50 kg dipindahkan menggunakan JumboSprint 85 dan Column-Mounted Jib Crane demi menjaga higienitas proses dan ergonomi operator.',
    'fmcg-nutrifood': 'Di lini produksi nutrisi kesehatan, sistem Vacuum Handling terintegrasi diterapkan untuk mengangkat karung hingga 50 kg menggunakan JumboSprint 85 dengan Column-Mounted Flat Jib Crane, meningkatkan stabilitas alur material.',
    'fmcg-nutribev': 'Untuk menjaga target output produksi makanan ringan yang tinggi, pemindahan karton dan karung hingga 50 kg didukung oleh JumboSprint 85 dengan Column-Mounted Jib Crane sehingga cycle time lini tetap terjaga.',
    'kimia-cabot': 'Untuk transfer bahan baku sintetis berskala besar, beban hingga 25 kg ditangani menggunakan JumboErgo 45 dan Column-Mounted Jib Crane guna menekan risiko kebocoran kemasan dan mempercepat siklus kerja.',
    'kayu-permata': 'Untuk mempermudah rotasi panel pada produksi pintu dan furnitur, panel kayu hingga 50 kg ditangani menggunakan JumboErgo 85 dan Mobile Jib Crane, mengurangi beban fisik sekaligus menjaga presisi penempatan.',
    'fmcg-multibintang': 'Pada lini minuman berkapasitas tinggi, pemindahan krat dan keg hingga 40 kg per unit dijalankan menggunakan JumboErgo dengan Keg Gripper pada Mobile Jib Crane, menekan risiko benturan dan meningkatkan ergonomi kerja.',
    'farmasi-dsm': 'Di area produksi nutrisi dan aromatik berstandar kebersihan tinggi, karton hingga 20 kg dipindahkan menggunakan JumboFlex 35 dan Crane System untuk menjaga proses tetap higienis dan mempercepat throughput.',
    'auto-federal': 'Pemindahan karton dan wadah pelumas Federal berkapasitas tinggi dengan cengkeraman vakum stabil untuk operasional bebas insiden.',
    'packaging-fukusuke': 'Pada lini produksi plastik kemasan fleksibel, pemindahan karton hingga 25 kg didukung oleh JumboFlex 35 dengan Crane System untuk mempercepat siklus kerja dan menjaga ergonomi operator.',
    'fmcg-indofood': 'Untuk logistik lini produksi mi instan skala besar, proses muat dan susun karton hingga 26 kg distandarisasi menggunakan JumboFlex 35 dengan Column-Mounted Jib Crane demi akurasi penempatan dan efisiensi tenaga kerja.',
    'fmcg-mars': 'Pada penanganan bahan baku kakao di lini manufaktur cokelat, beban karton hingga 20 kg dikelola menggunakan JumboFlex 35 dan Column-Mounted Jib Crane agar ritme transfer harian tetap stabil dan ergonomis.',
    'agrikultur-nufarm': 'Untuk alur pengemasan produk agrikultur yang menuntut keamanan ekstra, karung hingga 20 kg dipindahkan menggunakan JumboFlex 35 dan Column-Mounted Jib Crane guna melindungi operator dari paparan bahan kimia.',
    'auto-sakae': 'Pada lini cetak injeksi komponen bumper otomotif, karung resin hingga 25 kg dipindahkan menggunakan JumboFlex 35 dan Column-Mounted Jib Crane untuk menjaga kebersihan area produksi dan ergonomi kerja.',
    'fmcg-suntory': 'Untuk proses palletizing krat minuman berkecepatan tinggi, beban hingga 50 kg ditangani menggunakan JumboErgo 85 guna menjaga kestabilan gerakan berulang dan menekan risiko kerusakan kemasan.',
    'pipa-bredero': 'Pada operasional pelapisan pipa skala besar, pemindahan material hingga 25 kg didukung oleh JumboFlex 35 dengan Column-Mounted Articulated Jib Crane untuk meningkatkan throughput dan mengurangi beban punggung operator.',
    'fmcg-delifood': 'Untuk pemuatan bahan baku makanan berkecepatan tinggi, boks hingga 50 kg ditangani menggunakan JumboSprint dan Mechanical Gripper pada Column-Mounted Jib Crane guna menjaga kecepatan transfer tanpa membebani pinggang operator.',
    'fmcg-diageo': 'Untuk mempercepat logistik keg dan krat minuman tanpa menghambat lini, beban hingga 50 kg ditangani menggunakan JumboSprint 65 A2 dan Crane System, menghasilkan peningkatan produktivitas yang terukur.',
    'auto-elang': 'Pada penanganan material ban yang menuntut kestabilan bentuk, bal karet hingga 35 kg dipindahkan menggunakan JumboSprint 65 dengan Column-Mounted Jib Crane untuk menjaga presisi dan kelancaran cycle time.',
    'kimia-hempel': 'Dalam proses pemindahan wadah cat dan pelapis industri, pail hingga 40 kg dikelola menggunakan JumboSprint 65 EX dan Wall-Mounted Flat Jib Crane untuk cengkeraman yang seimbang dan aman di area produksi.',
    'auto-robotic': 'Pada lini otomasi manufaktur, komponen berat hingga 220 kg ditangani menggunakan JumboSprint 300 kg dan Column-Mounted Jib Crane untuk memastikan pemindahan beban berulang berjalan aman dan presisi.',
    'manufaktur-inoac': 'Untuk menjaga kualitas produksi busa poliuretan, karung bahan baku hingga 25 kg dipindahkan menggunakan JumboSprint 45 dan Column-Mounted Jib Crane, mengurangi beban angkat manual saat penuangan bahan.',
    'farmasi-kalbe': 'Sistem handling ruang cleanroom dengan spesifikasi stainless steel untuk mendukung zona produksi susu formula bayi yang steril.',
    'kaca-kian': 'Penanganan lembaran kaca secara presisi untuk proyek konstruksi dan infrastruktur, menghilangkan risiko kaca pecah di lokasi kerja.',
    'fmcg-meiji': 'Untuk proses palletizing karton biskuit di ujung lini kemasan, beban hingga 50 kg ditangani menggunakan JumboSprint 65 dan Column-Mounted Jib Crane, mengatasi hambatan antrean lini dan menjaga ergonomi operator.',
    'konstruksi-mortar': 'Pemindahan tumpukan karung semen mortar instan secara efisien dengan perlindungan punggung operator di lingkungan kerja berdebu tinggi.',
    'fmcg-nutrifood2': 'Pada alur pengemasan minuman serbuk, karung hingga 50 kg dipindahkan menggunakan JumboSprint 85 dengan Ceiling-Mounted Crane System agar lantai produksi tetap lega dan higienis.',
    'elektronik-rinnai': 'Untuk perakitan peralatan elektronik rumah tangga, karton hingga 22 kg dipindahkan menggunakan JumboFlex 35 dengan Monorail Crane guna menjaga keamanan kemasan dan kestabilan ritme kerja operator.',
    'fmcg-sarihusada': 'Pada produksi nutrisi klinis dengan standar sanitasi ketat, karung hingga 50 kg ditangani menggunakan JumboSprint 85 agar proses transfer tetap bersih, stabil, dan ergonomis.',
    'karet-sritrang': 'Untuk mempercepat pengangkatan bal karet sekaligus mengurangi ketergantungan pada forklift, beban hingga 40 kg dipindahkan menggunakan JumboSprint Low Stack dan Column-Mounted Jib Crane.',
    'auto-sugity': 'Untuk pemindahan komponen injeksi otomotif berukuran besar tanpa goresan, beban hingga 25 kg ditangani menggunakan JumboSprint 45 dan Mobile Jib Crane.',
    'auto-summy': 'Pada operasional pengolahan karet ban, karung bahan baku hingga 25 kg dikelola menggunakan JumboSprint 65 dan Column-Mounted Jib Crane untuk mendukung target output sekaligus memenuhi standar K3 pabrik.',
    'fmcg-urc': 'Untuk menjaga ritme palletizing karton makanan ringan di gudang, beban hingga 50 kg ditangani menggunakan JumboSprint 65 dan Column-Mounted Jib Crane oleh satu operator.',
    'auto-evoluzione': 'Pada area formulasi ban, pemindahan karung manual ditingkatkan menggunakan JumboSprint 65 dan Crane System 12 x 6 m untuk beban hingga 25 kg, mempercepat siklus kerja harian operator.',
    'konstruksi-mura': 'Untuk pemindahan plat baja dan komponen struktur fabrikasi, beban hingga 50 kg ditangani menggunakan JumboSprint 85 guna menstabilkan pergerakan material di lini kerja.',
    'auto-suryaraya': 'Pada lini perakitan ban kendaraan roda dua, gulungan material hingga 38 kg ditangani menggunakan sistem SCH dengan Mechanical Gripper dan Column-Mounted Jib Crane agar proses penyortiran lebih aman dan stabil.',
    'auto-astra': 'Untuk penanganan bahan baku di gudang termasuk drum besar, drum kecil, dan palet hingga 250 kg, digunakan sistem SCH-M dengan Aluminum Crane System di fasilitas West Karawang Plant.',
    'fmcg-garuda': 'Di zona palletizing akhir lini kemasan, beban hingga 50 kg ditangani menggunakan Mechanical Gripper dan sistem SCH pada Column-Mounted Jib Crane agar alur pengemasan lebih cepat dan ringan bagi operator.',
    'konstruksi-ykk': 'Untuk penanganan profil aluminium arsitektural secara presisi, gulungan aluminium hingga 38 kg dipindahkan menggunakan sistem SCH dengan Scissors Gripper dan Column-Mounted Jib Crane guna mencegah goresan permukaan.',
};

export function getProjectDesc(project: { id: string; desc: string }, lang: 'en' | 'id'): string {
    if (lang === 'id' && PROJECT_DESC_ID[project.id]) {
        return PROJECT_DESC_ID[project.id];
    }
    return project.desc;
}

export function getProjectIndustry(industry: string, lang: 'en' | 'id'): string {
    if (lang === 'id' && INDUSTRY_TRANSLATIONS_ID[industry]) {
        return INDUSTRY_TRANSLATIONS_ID[industry];
    }
    return industry;
}
