export interface ProductSpec {
    label: string;
    value: string;
}

export interface Product {
    slug: string;
    name: string;
    tagline: string;
    description: string;
    capacity: string;
    category: 'Vacuum Lifter' | 'Crane System' | 'Vacuum Component' | 'Mobile Lifting';
    heroColor: string;
    specs: ProductSpec[];
    features: string[];
    applications: string[];
    imageUrl: string;
}

export const schmalzProducts: Product[] = [
    {
        slug: 'vacuum-tube-lifter',
        name: 'Vacuum Tube Lifter',
        tagline: '9 variants from 50 kg to 300 kg, from clean room to ATEX zones',
        description: 'The Schmalz Vacuum Tube Lifter line is one of the most comprehensive in the market. Nine variants are available, including JumboFlex, JumboErgo, JumboSprint, JumboSprint EX (ATEX), PalVac Hygienic, High-Stack, and Low-Stack, each optimized for specific handling requirements.',
        capacity: 'up to 300 kg',
        category: 'Vacuum Lifter',
        heroColor: 'from-blue-600 to-blue-800',
        specs: [
            { label: 'Lifting Capacity', value: 'Up to 300 kg' },
            { label: 'Vacuum Source', value: 'Compressed air / Electric' },
            { label: 'Vacuum Level', value: 'Up to 85%' },
            { label: 'Certification', value: 'CE, AGR' },
            { label: 'Tube Material', value: 'Anodized aluminum' },
            { label: 'Operating Temperature', value: '-10C to +60C' },
        ],
        features: [
            'Intuitive lift and lower control through ergonomic operator handles',
            'Flexible gripper configurations for various workpiece geometries',
            'Integrated vacuum generation in pneumatic or electric versions',
            'Safety architecture prevents load drop in vacuum failure scenarios',
            'AGR-certified ergonomics for operator back protection',
            'Fully compatible with Schmalz crane systems',
        ],
        applications: [
            'Manufacturing and logistics',
            'Glass, wood, and sheet metal handling',
            'Packaging and palletizing',
            'Automotive production',
        ],
        imageUrl: 'https://media.schmalz.cn/MAM_Library/Products/Produktgruppenbilder/dc087940a162_PG_PGE_00160_000.jpg?size=m',
    },
    {
        slug: 'vacumaster',
        name: 'VacuMaster',
        tagline: '11 variants from 100 kg to 2,000 kg for wood, glass, coil, and long panels',
        description: 'The Schmalz VacuMaster range delivers broad industrial coverage with 11 variants: Basic, Comfort, Vario, Eco, Window, Wood, Coil, Light, Multi, Glass, and Panel. It supports sectors that demand anything from standard handling up to heavy-duty vacuum lifting.',
        capacity: 'up to 2,000 kg',
        category: 'Vacuum Lifter',
        heroColor: 'from-slate-700 to-slate-900',
        specs: [
            { label: 'Lifting Capacity', value: 'Up to multiple tons' },
            { label: 'Lifting Mechanism', value: 'Chain hoist' },
            { label: 'Configuration', value: 'Modular: basic module + load beam + suction plate' },
            { label: 'Certification', value: 'CE, TUV' },
            { label: 'Frame Material', value: 'Heavy-duty steel' },
            { label: 'Control', value: 'Pendant control / Radio remote' },
        ],
        features: [
            'Freely configurable modular base platform',
            'Adaptable load beams and suction plate layouts',
            'Pendant or radio remote control options',
            'Layered vacuum locking and monitoring for safety',
            'Suitable for demanding industrial environments',
            'Straightforward integration with existing overhead cranes',
        ],
        applications: [
            'Steel and heavy manufacturing',
            'Shipbuilding and construction',
            'Steel plate and precast concrete handling',
            'Paper and print industries',
        ],
        imageUrl: 'https://media.schmalz.cn/MAM_Library/Products/Produktgruppenbilder/44f16805bafb_PG_PGE-00163_000.jpg?size=m',
    },
    {
        slug: 'mobile-lifting-device',
        name: 'Mobile Lifting Device',
        tagline: 'Flexible and mobile vacuum handling for dynamic work zones',
        description: 'Schmalz Mobile Lifting Devices are designed for maximum flexibility in dynamic operations. With capacity up to 50 kg and high maneuverability, they can be mounted on industrial trucks or deployed independently across multiple work areas.',
        capacity: 'up to 50 kg',
        category: 'Mobile Lifting',
        heroColor: 'from-cyan-600 to-blue-700',
        specs: [
            { label: 'Lifting Capacity', value: 'Up to 50 kg' },
            { label: 'Type', value: 'Mobile / mounted on industrial truck' },
            { label: 'Vacuum Source', value: 'Built-in vacuum generator' },
            { label: 'Certification', value: 'CE' },
            { label: 'Unit Weight', value: 'Compact and lightweight' },
            { label: 'Power', value: 'Battery / compressed air' },
        ],
        features: [
            'Portable design for easy relocation',
            'Compatible with forklifts and pallet trucks',
            'Battery operation for cable-free workflows',
            'Fast setup without permanent installation',
            'Interchangeable vacuum grippers by application',
            'Strong fit for flexible warehouse operations',
        ],
        applications: [
            'Warehouse and distribution logistics',
            'Truck loading and unloading',
            'Frequently changing work areas',
            'Mid-scale production facilities',
        ],
        imageUrl: 'https://media.schmalz.cn/MAM_Library/Products/Produktgruppenbilder/0_/063/06394/b73d102d5159_PUG_PGE-06394.jpg?size=m',
    },
    {
        slug: 'vacuum-generator',
        name: 'Vacuum Generators',
        tagline: '6 generator types from compact ejectors to high-flow blowers and smart IO-Link pumps',
        description: 'The Schmalz Vacuum Generator lineup spans compact ejectors, decentralized generators, high-flow multi-stage units for porous materials, smart IO-Link models, compressor-free electric pumps, and high-volume blowers for demanding airflow applications.',
        capacity: 'up to 1,140 l/min',
        category: 'Vacuum Component',
        heroColor: 'from-blue-600 to-blue-800',
        specs: [
            { label: 'Type', value: 'Ejector, Pump, Blower' },
            { label: 'Suction Rate', value: 'Up to 1,140 l/min (SBPL)' },
            { label: 'Max Vacuum', value: 'Up to 91% (UHV-HD)' },
            { label: 'Interface', value: 'Standard / IO-Link Class A' },
            { label: 'Power Source', value: 'Pneumatic and electric' },
            { label: 'Certification', value: 'CE' },
        ],
        features: [
            'All-in-one compact ejector with suction, blow-off, filter, and switch',
            'Multi-stage Venturi solutions for porous materials',
            'Smart diagnostics and air saving via IO-Link',
            'Compressor-free electric vacuum generation',
            'High-flow blower options for textile and foam handling',
            'Compatible with cobots and industrial robots',
        ],
        applications: [
            'Automation and robotic pick-and-place',
            'Carton and wood palletizing',
            'Smart factory and Industry 4.0 systems',
            'AGV and mobile handling platforms',
        ],
        imageUrl: 'https://media.schmalz.com/MAM_Library/Products/Produktgruppenbilder/ec6bdf60f00a_PG_PGE-00169_000.jpg?size=m',
    },
    {
        slug: 'crane-system',
        name: 'Crane System & Jib Crane',
        tagline: 'Reliable and efficient foundation for vacuum handling systems',
        description: 'Schmalz Crane Systems and aluminum jib cranes are engineered as the optimal infrastructure for vacuum lifting equipment. Premium aluminum construction combines low deadweight with high rigidity, while low-friction movement supports smooth and efficient operation.',
        capacity: 'Configured to lifter capacity',
        category: 'Crane System',
        heroColor: 'from-sky-600 to-blue-800',
        specs: [
            { label: 'Material', value: 'Anodized aluminum, premium grade' },
            { label: 'Friction', value: 'Outstanding low-friction operation' },
            { label: 'Mounting', value: 'Wall / column / ceiling' },
            { label: 'Reach', value: 'Customizable (up to 6+ m)' },
            { label: 'Compatibility', value: 'All Schmalz vacuum lifters' },
            { label: 'Certification', value: 'CE, FEM' },
        ],
        features: [
            'Lightweight, high-strength, corrosion-resistant aluminum design',
            'Ultra-low-friction bearings for smooth manual movement',
            'Modular crane concept with configurable jib length',
            'Optimized compatibility across Schmalz vacuum lifter lines',
            'Fast bolt-on installation concept',
            'Available in wall, column, and ceiling mounting versions',
        ],
        applications: [
            'Manufacturing cells and workstations',
            'Assembly areas',
            'Loading and unloading stations',
            'All industries using vacuum lifter technology',
        ],
        imageUrl: 'https://media.schmalz.cn/MAM_Library/Products/Produktgruppenbilder/c2d1167fab91_PG_PGE-00161_001.jpg?size=m',
    },
    {
        slug: 'vacuum-suction-cups',
        name: 'Vacuum Suction Cups',
        tagline: 'Critical gripping components for every vacuum handling system',
        description: 'Schmalz Vacuum Suction Cups are core components in vacuum handling systems. Hundreds of variants are available, from flat to bellows designs and from NBR to FDA-grade silicone, allowing precise matching to each industrial application.',
        capacity: 'Per cup rating',
        category: 'Vacuum Component',
        heroColor: 'from-teal-600 to-cyan-700',
        specs: [
            { label: 'Material', value: 'NBR, Silicone, Viton, Polyurethane' },
            { label: 'Shape', value: 'Flat, Bellows, Oval, Deep, Special' },
            { label: 'Diameter', value: '10 mm to 250+ mm' },
            { label: 'Temperature', value: '-20C to +200C (material dependent)' },
            { label: 'Certification', value: 'CE, FDA (silicone grade), ATEX available' },
            { label: 'Connection', value: 'G1/8 to G1/2 BSP' },
        ],
        features: [
            'Extensive variant portfolio for diverse applications',
            'Food-grade material options for hygienic processing',
            'High-temperature variants for ovens and paint lines',
            'Anti-static options for electronics handling',
            'Industry-standard connections for easy integration',
            'Design options aligned with ISO 9283 practices',
        ],
        applications: [
            'Robot gripping and end-of-arm tooling',
            'CNC machining and glass processing',
            'Food packaging operations',
            'Electronics and semiconductor handling',
        ],
        imageUrl: 'https://media.schmalz.com/MAM_Library/Products/Produktgruppenbilder/ae921bfe87bc_PG_PGE-00171_000.jpg?size=m',
    },
];
