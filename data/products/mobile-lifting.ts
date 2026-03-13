// Sub-variants of Schmalz Mobile Lifting Devices
// URL: /products/schmalz/mobile-lifting-device/[variant]

export interface MobileVariant {
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

export const mobileLiftingVariants: MobileVariant[] = [
    {
        slug: 'jumboflex-mobile',
        name: 'JumboFlex Mobile',
        seriesCode: 'JumboFlex Mobile',
        tagline: 'Mobile tube lifter with flexible operation from a standard industrial socket',
        description: 'JumboFlex Mobile from Schmalz is a fully mobile and flexible tube lifter solution. Simply plug into a standard industrial power outlet at any location. An electrically adjustable column and compact jib arm with parking position keep transport dimensions to a minimum.',
        capacity: 'up to 50 kg',
        highlight: 'Plug into a standard outlet and deploy immediately',
        badge: 'Mobile',
        heroColor: 'from-cyan-600 to-blue-700',
        specs: [
            { label: 'Capacity', value: 'Up to 50 kg' },
            { label: 'Power', value: 'Standard industrial socket (220V)' },
            { label: 'Column', value: 'Electrically adjustable height' },
            { label: 'Jib', value: 'Articulated arm, compact parking position' },
            { label: 'Mobility', value: 'Free relocation between work areas' },
            { label: 'Certification', value: 'CE, AGR' },
        ],
        features: [
            'Runs from a standard industrial power outlet',
            'Electrically adjustable column height',
            'Articulated jib arm with compact parking position',
            'Minimal transport dimensions for easy relocation',
            'No permanent overhead crane installation required',
            'Ideal for multi-area workshops and flexible production sites',
        ],
        applications: ['Workshops with multiple workstations', 'Maintenance and service areas', 'Small to mid-scale production', 'Areas without permanent overhead cranes'],
        imageUrl: 'https://media.schmalz.com/MAM_Library/Products/Anwendungsbilder/Handling%20Systems/Applications/Logistics/01f071828115_Picture_Anwendungsbilder_HS_JumboFlex%20Mobile_2024_03.jpg?size=l',
    },
    {
        slug: 'jumboflex-picker',
        name: 'JumboFlex Picker',
        seriesCode: 'JumboFlex Picker',
        tagline: 'Forklift-mounted picker with touch display and self-contained power',
        description: 'JumboFlex Picker from Schmalz is a forklift-mounted vacuum tube lifter designed for rapid order-picking operations. Its touch display and semi-automated process flow enable intuitive handling, while integrated power supply allows operation independent of vehicle type.',
        capacity: 'up to 50 kg',
        highlight: 'Fork-mounted design for fast semi-automated picking',
        badge: 'Forklift Mount',
        heroColor: 'from-amber-500 to-orange-700',
        specs: [
            { label: 'Capacity', value: 'Up to 50 kg per pick' },
            { label: 'Mounting', value: 'Forklift forks or floor conveyor' },
            { label: 'Jib Reach', value: 'Long jib reach up to 2 Euro-pallets' },
            { label: 'Control', value: 'Touch display + semi-automated processes' },
            { label: 'Power', value: 'Integrated (vehicle-independent)' },
            { label: 'Certification', value: 'CE, AGR' },
        ],
        features: [
            'Clear touch display for intuitive operation',
            'Semi-automated process for faster picking',
            'Long jib reach covering up to two Euro-pallets',
            'Integrated power supply independent of vehicle type',
            'Simple mounting on standard forklift forks',
            'Reduces operator back strain during picking tasks',
        ],
        applications: ['Warehouse and distribution centers', 'Order picking from pallets', 'E-commerce fulfillment', 'Loading dock pallet handling'],
        imageUrl: 'https://media.schmalz.com/MAM_Library/Products/Anwendungsbilder/Handling%20Systems/Applications/Logistics/313ecaa42a10_Picture_JumboFlex-Picker_003.jpg',
    },
];