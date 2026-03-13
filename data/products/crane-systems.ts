// Sub-variants of Schmalz Crane Systems and Jib Cranes
// URL: /products/schmalz/crane-system/[variant]

export interface CraneVariant {
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
    // TODO: Upload product image and paste direct URL here
    imageUrl: string;
}

export const craneSystemVariants: CraneVariant[] = [
    {
        slug: 'jib-cranes',
        name: 'Jib Cranes',
        seriesCode: 'Schmalz Jib',
        tagline: 'Column and wall-mounted jib cranes for ergonomic transport up to 1,000 kg',
        description: 'Schmalz Jib Cranes provide the ideal foundation for vacuum handling systems. Available in column-mounted or wall-mounted designs, these premium aluminum cranes deliver flexible workstation coverage up to 1,000 kg. Low-friction mechanics ensure smooth motion and minimal maintenance.',
        capacity: 'up to 1,000 kg',
        highlight: 'Column or wall mounting with flexible workstation reach',
        heroColor: 'from-sky-600 to-blue-800',
        specs: [
            { label: 'Capacity', value: 'Up to 1,000 kg' },
            { label: 'Mounting', value: 'Column or wall' },
            { label: 'Material', value: 'Premium anodized aluminum' },
            { label: 'Reach', value: 'Customizable (typical up to 6 m)' },
            { label: 'Friction', value: 'Ultra-low for smooth operation' },
            { label: 'Certification', value: 'CE, FEM' },
        ],
        features: [
            'Column or wall installation for flexible layouts',
            'Premium anodized aluminum: lightweight, rigid, and corrosion-resistant',
            'Ultra-low friction for smooth, precise movement',
            'Customizable workstation reach',
            'Compatible with all Schmalz vacuum lifters',
            'Available with or without end stop and brake',
        ],
        applications: ['Individual workstation', 'Assembly cell', 'CNC machining area', 'Welding and fabrication station'],
        imageUrl: 'https://media.schmalz.com/MAM_Library/Products/Produktuntergruppenbilder/0_/052/05232/5ec14e22bb7b_PUG_PGE-03791_000.jpg?size=m',
    },
    {
        slug: 'aluminum-bridge-cranes',
        name: 'Aluminum Bridge Cranes',
        seriesCode: 'Schmalz Bridge',
        tagline: 'Modular bridge crane for ceiling or portal mounting, with area-wide coverage up to 1,200 kg',
        description: 'Schmalz Aluminum Bridge Cranes are modular systems configurable for medium to very large work areas. Mounted on the ceiling or a portal structure, they deliver full-area coverage with handling capacity up to 1,200 kg.',
        capacity: 'up to 1,200 kg',
        highlight: 'Modular architecture for full coverage across large work zones',
        heroColor: 'from-blue-600 to-indigo-800',
        specs: [
            { label: 'Capacity', value: 'Up to 1,200 kg' },
            { label: 'Mounting', value: 'Ceiling or portal construction' },
            { label: 'Material', value: 'Modular aluminum' },
            { label: 'Span', value: 'Customizable for large work areas' },
            { label: 'Design', value: 'Modular, flexible, and cost-efficient' },
            { label: 'Certification', value: 'CE, FEM' },
        ],
        features: [
            'Modular system with custom configuration for each facility',
            'Ceiling or portal structure mounting options',
            'Full coverage for large workspaces',
            'Cost-efficient alternative to conventional crane systems',
            'Lightweight aluminum reduces structural building load',
            'Scalable and expandable as operations grow',
        ],
        applications: ['Large manufacturing floors', 'Multi-station assembly halls', 'Warehouse picking areas', 'Full production-line coverage'],
        imageUrl: 'https://media.schmalz.com/MAM_Library/Products/Anwendungsbilder/Handling%20Systems/Applications/Others/08f38e043444_Picture_HS_SRA_JumboFlex_2017.jpg',
    },
    {
        slug: 'kbg-steel-construction',
        name: 'KBG Modular Steel',
        seriesCode: 'KBG Steel',
        tagline: 'Modular steel crane with 30 x 8.5 m workspace and 500 kg capacity',
        description: 'Schmalz KBG Modular Steel Construction is a galvanized modular crane system engineered for large workspaces. With maximum dimensions of 30 x 8.5 x 5.5 m and a 500 kg capacity (workpiece plus lifting device), its 140 x 140 x 4 mm steel profiles deliver long-term durability in demanding industrial environments.',
        capacity: 'up to 500 kg',
        highlight: 'Large-format 30 x 8.5 m coverage with durable galvanized steel',
        badge: 'Heavy Duty',
        heroColor: 'from-zinc-600 to-slate-800',
        specs: [
            { label: 'Capacity', value: 'Up to 500 kg (workpiece + lifter)' },
            { label: 'Max Dimensions', value: '30 x 8.5 x 5.5 m (LxWxH)' },
            { label: 'Material', value: 'Galvanized steel' },
            { label: 'Profile', value: '140 x 140 x 4 mm' },
            { label: 'Design', value: 'Modular with flexible configuration' },
            { label: 'Certification', value: 'CE, FEM' },
        ],
        features: [
            'Galvanized steel resists corrosion and weather exposure',
            'Coverage up to 30 x 8.5 m for large production zones',
            'Modular design configurable to plant layout',
            'Heavy-duty 140 x 140 x 4 mm structural profile',
            'Workspace height up to 5.5 m',
            'Ideal for outdoor and semi-outdoor production operations',
        ],
        applications: ['Large-format production plants', 'Shipyards and offshore yards', 'Large prefab construction', 'Outdoor and semi-outdoor heavy manufacturing'],
        imageUrl: 'https://media.schmalz.com/MAM_Library/Products/Anwendungsbilder/Handling%20Systems/Applications/Plastics/e3b0cd9e2ab1_Picture_HS_KBG_2022_01.jpg?size=l',
    },
    {
        slug: 'chain-hoists',
        name: 'Chain Hoists',
        seriesCode: 'Schmalz Hoist',
        tagline: 'Heavy-duty chain hoist up to 2,500 kg with CSA certification and 3,000 mm standard lift',
        description: 'Schmalz Chain Hoists complement every crane and vacuum lifter system as the vertical lifting component. With load capacity up to 2,500 kg, integrated limit switches, and a standard 3,000 mm lifting height, they are CSA certified for the U.S. and Canadian markets, making them ideal for international projects.',
        capacity: 'up to 2,500 kg',
        highlight: '2,500 kg capacity with CSA certification for U.S. and Canada',
        badge: 'CSA',
        heroColor: 'from-slate-700 to-zinc-900',
        specs: [
            { label: 'Capacity', value: 'Up to 2,500 kg' },
            { label: 'Limit Switch', value: 'Integrated (upper and lower)' },
            { label: 'Lifting Height', value: 'Standard 3,000 mm' },
            { label: 'Certification', value: 'CE, CSA (U.S. and Canada)' },
            { label: 'Duty Class', value: 'Industrial grade' },
            { label: 'Control', value: 'Pendant control' },
        ],
        features: [
            'High capacity up to 2,500 kg',
            'Integrated limit switches for full lifting safety',
            'Standard 3,000 mm lifting height',
            'CSA certified for U.S. and Canadian export projects',
            'Rugged industrial build quality for demanding duty cycles',
            'Compatible with all Schmalz crane systems',
        ],
        applications: ['Heavy lifting on bridge and jib cranes', 'Steel mills and foundries', 'International projects (U.S./Canada markets)', 'Heavy industrial applications'],
        imageUrl: 'https://media.schmalz.com/MAM_Library/Products/Anwendungsbilder/Handling%20Systems/Applications/Logistics/54960822a760_Picture_HS_SRA_VacuMaster%20Basic_Institut%20F%C3%B6rster_2014.jpg',
    },
];