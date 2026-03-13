// Schmalz Vacuum Generator Product Family
// URL: /products/schmalz/vacuum-generator/[variant]

export interface VacuumGeneratorSpec {
    label: string;
    value: string;
}

export interface VacuumGeneratorVariant {
    slug: string;
    name: string;
    seriesCode: string;
    tagline: string;
    description: string;
    capacity: string;
    highlight: string;
    badge?: string;
    heroColor: string;
    specs: VacuumGeneratorSpec[];
    features: string[];
    applications: string[];
    imageUrl: string;
}

export const vacuumGeneratorVariants: VacuumGeneratorVariant[] = [
    {
        slug: 'scps-compact-ejector',
        name: 'Compact Ejector SCPS',
        seriesCode: 'Schmalz SCPS / SCPSi',
        tagline: 'All-in-one compact ejector integrating suction, blow-off, filter, and vacuum switch',
        description: 'Compact Ejector SCPS combines suction valve, blow-off, filter, and vacuum switch in one compact unit. With suction rate up to 71 l/min and maximum vacuum of 85%, it is engineered for high-speed pick-and-place automation.',
        capacity: 'up to 71 l/min',
        highlight: 'All-in-one integration for compact, high-performance automation cells',
        heroColor: 'from-blue-600 to-blue-800',
        specs: [
            { label: 'Suction Rate', value: 'Up to 71 l/min' },
            { label: 'Max Vacuum', value: '85%' },
            { label: 'Body', value: 'Lightweight plastic' },
            { label: 'Integrated Functions', value: 'Suction valve, blow-off, filter, vacuum switch' },
            { label: 'Interface', value: 'Standard (SCPSb) / IO-Link (SCPSi)' },
            { label: 'Certification', value: 'CE' },
        ],
        features: [
            'Integrated architecture reduces footprint and installation effort',
            'Suction performance up to 71 l/min for short cycle times',
            'Optional air-saving mode can reduce compressed-air use significantly',
            'IO-Link version supports real-time digital monitoring',
            'Direct mounting to manifold or valve terminal',
            'Optimized for high-frequency pick-and-place applications',
        ],
        applications: ['Pick-and-place automation', 'Robotic palletizing', 'Packaging lines', 'Semiconductor handling'],
        imageUrl: 'https://media.schmalz.com/MAM_Library/Products/Produktfamilienbilder/0_/046/04637/ef70e26a0b5d_PF_PGE-04637_000.jpg?size=l',
    },
    {
        slug: 'sbp-basic-ejector',
        name: 'Basic Ejector SBP',
        seriesCode: 'Schmalz SBP / SBP-C',
        tagline: 'Decentralized compact ejector with suction rate up to 215 l/min',
        description: 'Basic Ejector SBP is a compact vacuum generator designed for decentralized systems. It delivers up to 215 l/min suction in a lightweight housing and is ideal for standard vacuum tasks close to the pick point. SBP-C adds integrated valve technology.',
        capacity: 'up to 215 l/min',
        highlight: 'Compact decentralized vacuum generation with low-maintenance operation',
        heroColor: 'from-sky-600 to-cyan-700',
        specs: [
            { label: 'Suction Rate', value: 'Up to 215 l/min' },
            { label: 'Max Vacuum', value: '85%' },
            { label: 'Body', value: 'Lightweight plastic' },
            { label: 'Silencer', value: 'Integrated' },
            { label: 'Variant', value: 'SBP-C with integrated valve technology' },
            { label: 'Certification', value: 'CE' },
        ],
        features: [
            'High suction performance up to 215 l/min',
            'Lightweight build ideal for near-end-effector mounting',
            'Integrated silencer for quieter operation',
            'Supports centralized and decentralized layouts',
            'Low-maintenance design with minimal wear points',
            'SBP-C variant extends pneumatic control functionality',
        ],
        applications: ['Standard automation systems', 'Industrial robots', 'Vacuum fixtures', 'Conveyor sorting'],
        imageUrl: 'https://media.schmalz.com/MAM_Library/Products/Produktfamilienbilder/0_/032/03270/2ad9e5e943e4_PF_PGE-03270_000.jpg',
    },
    {
        slug: 'sbpl-high-flow-ejector',
        name: 'Basic Ejector SBPL',
        seriesCode: 'Schmalz SBPL',
        tagline: 'High-flow multi-stage ejector, 290 to 1,140 l/min for porous materials',
        description: 'SBPL uses multi-stage Venturi technology to produce very high flow rates from 290 to 1,140 l/min. It is purpose-built for porous workpieces such as cardboard, wood, and foam where air leakage is substantial.',
        capacity: '290 - 1,140 l/min',
        highlight: 'Multi-stage Venturi performance for high-leak porous materials',
        badge: 'High Flow',
        heroColor: 'from-teal-600 to-emerald-700',
        specs: [
            { label: 'Suction Rate', value: '290 to 1,140 l/min' },
            { label: 'Max Vacuum', value: '61% or 90%' },
            { label: 'Technology', value: 'Multi-stage Venturi' },
            { label: 'Body', value: 'Plastic' },
            { label: 'Target', value: 'Porous workpieces: cardboard, wood, foam' },
            { label: 'Certification', value: 'CE' },
        ],
        features: [
            'Class-leading flow output for porous handling',
            'Automatic compensation of leakage on porous surfaces',
            'Selectable vacuum profiles for flow-optimized or vacuum-optimized operation',
            'Lightweight, durable housing design',
            'Ideal for high-speed carton and wood palletizing',
            'Plug-and-play installation concept',
        ],
        applications: ['Carton palletizing', 'Wood and MDF panel handling', 'Foam handling', 'Bag and sack handling'],
        imageUrl: 'https://media.schmalz.com/MAM_Library/Products/Produktfamilienbilder/0_/050/05050/4172f3101212_PF_PGE-05050_000.jpg',
    },
    {
        slug: 'sxpi-x-pump',
        name: 'X-Pump SXPi',
        seriesCode: 'Schmalz SXPi / SXMPi',
        tagline: 'Intelligent compact ejector with IO-Link Class A and integrated condition monitoring',
        description: 'X-Pump SXPi is Schmalz intelligent compact ejector generation with full connectivity. IO-Link Class A enables real-time condition monitoring, remote diagnostics, and direct Industry 4.0 integration. Automatic air saving reduces compressed-air consumption without compromising performance.',
        capacity: 'up to 185 l/min',
        highlight: 'IO-Link diagnostics and automated energy optimization in one platform',
        badge: 'Smart',
        heroColor: 'from-violet-600 to-purple-700',
        specs: [
            { label: 'Suction Rate', value: 'Up to 185 l/min' },
            { label: 'Max Vacuum', value: '85%' },
            { label: 'Interface', value: 'IO-Link Class A' },
            { label: 'Air Saving', value: 'Automatic compressed-air reduction' },
            { label: 'Monitoring', value: 'Real-time condition monitoring' },
            { label: 'Certification', value: 'CE' },
        ],
        features: [
            'IO-Link Class A for easy PLC and Industry 4.0 integration',
            'Automatic air-saving function for lower energy demand',
            'Condition monitoring with predictive maintenance support',
            'Remote diagnostics through IO-Link infrastructure',
            'Software-based parameter tuning without hardware changes',
            'Well-suited for connected modern automation systems',
        ],
        applications: ['Smart factory and Industry 4.0', 'Collaborative robotics', 'Connected production lines', 'SCADA and MES integrated systems'],
        imageUrl: 'https://media.schmalz.com/MAM_Library/Products/Produktfamilienbilder/0_/050/05050/4172f3101212_PF_PGE-05050_000.jpg',
    },
    {
        slug: 'ecbpm-electric-pump',
        name: 'Regulated Vacuum Pump ECBPMi',
        seriesCode: 'Schmalz ECBPMi / ECBPM',
        tagline: 'Compressor-free electric vacuum pump with digital IO-Link control',
        description: 'ECBPMi is a regulated electric vacuum pump that runs without compressed air. It is ideal for compressor-free facilities, AGV platforms, and clean-room environments. Control is available through touch display or IO-Link.',
        capacity: 'up to 35 l/min',
        highlight: 'Fully electric vacuum generation for compressor-free infrastructure',
        badge: 'Electric',
        heroColor: 'from-amber-500 to-orange-700',
        specs: [
            { label: 'Suction Rate', value: 'Up to 35 l/min' },
            { label: 'Power Supply', value: '24V DC electrical' },
            { label: 'Compressor', value: 'Not required' },
            { label: 'Control', value: 'Touch display / IO-Link' },
            { label: 'Application Focus', value: 'Compact automation, AGV, clean room' },
            { label: 'Certification', value: 'CE' },
        ],
        features: [
            'Fully electric platform with no compressed-air dependency',
            'Precise control via touch display or IO-Link',
            'Suitable for AGV and mobile automation systems',
            'Clean-room friendly operation with minimal contamination risk',
            'Energy-efficient pump technology',
            'Compact form factor for easy machine integration',
        ],
        applications: ['AGV and mobile robots', 'Clean-room handling', 'Compressor-free systems', 'Collaborative robot applications'],
        imageUrl: 'https://media.schmalz.com/MAM_Library/Products/Produktfamilienbilder/0_/056/05632/739c35833688_PF_PGE-05632_005.jpg',
    },
    {
        slug: 'sbg-vacuum-blower',
        name: 'Vacuum Blower SBG',
        seriesCode: 'Schmalz SBG',
        tagline: 'High-volume side-channel blower for highly porous materials',
        description: 'Vacuum Blower SBG uses side-channel blower technology to deliver very high flow with low-to-medium vacuum levels. It runs on electrical supply without compressed air and is ideal for highly porous materials such as foam and industrial textiles.',
        capacity: 'Very high flow rate',
        highlight: 'Side-channel blower architecture for high-volume porous handling',
        heroColor: 'from-rose-600 to-red-700',
        specs: [
            { label: 'Technology', value: 'Side-channel blower' },
            { label: 'Flow Rate', value: 'Very high volume flow' },
            { label: 'Power Supply', value: 'Electrical, no compressed air' },
            { label: 'Vacuum', value: 'Low to medium' },
            { label: 'Options', value: 'Frequency regulation / electropneumatic reversing' },
            { label: 'Certification', value: 'CE' },
        ],
        features: [
            'Very high flow output for highly porous workpieces',
            'Electrical operation without compressor infrastructure',
            'Optional frequency regulation for process control',
            'Electropneumatic reversing for suction/blow switching',
            'Well-suited for textile, foam, and non-woven handling',
            'Lower noise potential versus pneumatic ejector setups',
        ],
        applications: ['Thick foam handling', 'Industrial textile handling', 'Non-woven materials', 'High-porosity woodworking'],
        imageUrl: 'https://media.schmalz.com/MAM_Library/Products/Produktfamilienbilder/0_/054/05449/b165bafed617_PF_PGE-05449_000.jpg',
    },
];
