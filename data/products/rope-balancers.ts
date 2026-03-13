// Sub-variants of Schmalz Rope Balancers (all Binar Handling brand)
// URL: /products/schmalz/rope-balancer/[variant]

export interface RopeBalancerVariant {
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

export const ropeBalancerVariants: RopeBalancerVariant[] = [
    {
        slug: 'neo-30',
        name: 'NEO 30',
        seriesCode: 'Binar NEO 30',
        tagline: 'Battery-operated rope balancer with up to 500 lifts per charge',
        description: 'Binar Handling NEO 30 is a practical battery-powered rope balancer. It installs quickly without fixed power infrastructure. One full charge can deliver up to 500 lifting cycles, making it ideal for uninterrupted full-shift operation.',
        capacity: 'up to 30 kg',
        highlight: 'Up to 500 lifts per charge with fast installation',
        badge: 'Battery',
        heroColor: 'from-emerald-500 to-green-700',
        specs: [
            { label: 'Capacity', value: 'Up to 30 kg' },
            { label: 'Power', value: 'Battery-operated (Li-ion)' },
            { label: 'Lifting Strokes', value: 'Up to 500 per charge' },
            { label: 'Installation', value: 'Fast and simple, no fixed power' },
            { label: 'Brand', value: 'Binar Handling' },
            { label: 'Certification', value: 'CE' },
        ],
        features: [
            'Li-ion battery operation with no cable drag',
            'Up to 500 lifting strokes per charge',
            'Fast installation at almost any workstation',
            'Lightweight and compact for high flexibility',
            'Ideal for areas without overhead power supply',
            'Near zero-gravity feel for operators',
        ],
        applications: ['Small to mid-sized workshops', 'Areas without overhead power supply', 'Light-parts picking', 'Maintenance and service workstations'],
        imageUrl: 'https://media.schmalz.com/MAM_Library/Products/Produktfamilienbilder/0_/061/06109/435df26cd954_PF_PGE-06109.jpg?size=l',
    },
    {
        slug: 'quick-lift-arm-qla',
        name: 'Quick-Lift Arm QLA',
        seriesCode: 'Binar QLA',
        tagline: '360-degree jib arm with high-precision handling up to 300 kg',
        description: 'Binar Handling Quick-Lift Arm QLA is an intelligent lift arm with full 360-degree jib coverage. Advanced sensor technology enables sensitive and highly accurate positioning, even at loads up to 300 kg.',
        capacity: 'up to 300 kg',
        highlight: '360-degree jib range with ultra-precise positioning control',
        heroColor: 'from-amber-500 to-orange-700',
        specs: [
            { label: 'Capacity', value: 'Up to 300 kg' },
            { label: 'Slewing Range', value: '360-degree' },
            { label: 'Control', value: 'Intelligent sensor-based positioning' },
            { label: 'Precision', value: 'Very high, sub-millimeter' },
            { label: 'Brand', value: 'Binar Handling' },
            { label: 'Certification', value: 'CE' },
        ],
        features: [
            'Full 360-degree slewing jib range',
            'Sensitive high-precision workpiece positioning',
            'Intelligent control with zero-gravity feel',
            'Supports a wide range of grippers and end effectors',
            'Handling capacity up to 300 kg',
            'Integrates with crane and rail systems',
        ],
        applications: ['Precision assembly lines', 'Automotive body assembly', 'Aerospace component handling', 'Ergonomic workstations'],
        imageUrl: 'https://media.schmalz.com/MAM_Library/Products/Artikelbilder/18/1805/180501/18050100015/f3d7075ed069_18.05.01.00015_00.jpg?size=l',
    },
    {
        slug: 'quick-lift-rail-qlr',
        name: 'Quick-Lift Rail QLR',
        seriesCode: 'Binar QLR',
        tagline: 'Rail-mounted intelligent lift up to 600 kg for new or existing rail systems',
        description: 'Binar Handling Quick-Lift Rail QLR is an intelligent lifting solution designed for rail-mounted operation. With capacity up to 600 kg and seamless integration with new or existing rail systems, QLR is optimized for long production lines with heavy lifting requirements.',
        capacity: 'up to 600 kg',
        highlight: 'Rail-mounted performance up to 600 kg with retrofit compatibility',
        heroColor: 'from-orange-600 to-red-700',
        specs: [
            { label: 'Capacity', value: 'Up to 600 kg' },
            { label: 'Mounting', value: 'Rail system (new or existing)' },
            { label: 'Control', value: 'Intelligent sensor-based positioning' },
            { label: 'Travel', value: 'Linear travel along rail' },
            { label: 'Brand', value: 'Binar Handling' },
            { label: 'Certification', value: 'CE' },
        ],
        features: [
            'High lifting capacity up to 600 kg',
            'Integration with both new and existing rail systems',
            'Sensitive, precise positioning along the travel path',
            'Intelligent control system',
            'Optimized for long linear production lines',
            'Customizable rail configuration',
        ],
        applications: ['Long production lines', 'Heavy assembly operations', 'Engine and transmission handling', 'Bridge crane replacement'],
        imageUrl: 'https://media.schmalz.com/MAM_Library/Products/Artikelbilder/18/1805/180502/18050200001/88660d7abfda_18.05.02.00001_00.jpg?size=l',
    },
    {
        slug: 'ergo-glass',
        name: 'Ergo-Glass',
        seriesCode: 'Binar Ergo-Glass',
        tagline: 'Ergonomic glass handling with flexible gripper configuration for flat surfaces',
        description: 'Binar Handling Ergo-Glass is an ergonomic lifting system engineered specifically for glass and other flat-surface materials. Flexible gripper options, in both standard and custom formats, ensure secure handling across a wide range of glass sizes and thicknesses.',
        capacity: 'Varies by config',
        highlight: 'Purpose-built for glass and flat surfaces with flexible gripper options',
        badge: 'Glass',
        heroColor: 'from-teal-500 to-cyan-700',
        specs: [
            { label: 'Target', value: 'Glass and flat-surface materials' },
            { label: 'Gripper', value: 'Standard and custom options' },
            { label: 'Lifting', value: 'Precise and efficient' },
            { label: 'Safety', value: 'Integrated vacuum monitoring system' },
            { label: 'Brand', value: 'Binar Handling' },
            { label: 'Certification', value: 'CE' },
        ],
        features: [
            'Engineered specifically for glass and flat surfaces',
            'Available in standard and custom gripper configurations',
            'Precise and efficient lifting performance',
            'Integrated vacuum monitoring for process safety',
            'Ergonomic operation that reduces operator strain',
            'Compatible with Binar crane and rail systems',
        ],
        applications: ['Glass processing and fabrication', 'Curtain wall and glazing', 'Solar panel handling', 'Mirror and flat panel installation'],
        imageUrl: 'https://media.schmalz.com/MAM_Library/Products/Artikelbilder/18/1805/180512/18051200002/7f8a3e902583_18.05.12.00002_00.jpg?size=l',
    },
];