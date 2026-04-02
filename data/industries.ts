import { VTLVariant, vacuumTubeLifterVariants } from './products/vacuum-tube-lifters';

export interface IndustryDef {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  heroColor: string;
  imageUrl: string;
  iconType: 'food' | 'pill' | 'car' | 'box' | 'factory' | 'hard-hat' | 'cpu' | 'flask';
  recommendedProducts: string[]; // references VTLVariant slugs
  painPoints: string[];
}

export const industries: IndustryDef[] = [
  {
    slug: 'food-beverage',
    name: 'Food & Beverage',
    tagline: 'Hygienic material handling that meets strict food-grade standards',
    description: 'The food and beverage industry requires handling systems that are easily washable, resistant to high-pressure cleaning, and compliant with FDA regulations. Manual handling of sacks of raw ingredients or moving delicate finished products can be streamlined using IP69K-rated vacuum tech.',
    heroColor: 'from-blue-700 to-slate-900',
    imageUrl: '/industries/FOOD & BEVERAGE.jpg',
    iconType: 'food',
    painPoints: [
      'Contamination risk from standard lifting equipment',
      'Worker fatigue from manually carrying 25-50 kg ingredient sacks (sugar, flour)',
      'Time loss during sanitation and washdown procedures',
    ],
    recommendedProducts: ['palvac-sprint-hygienic', 'palvac-sprint', 'jumboflex-high-stack'],
  },
  {
    slug: 'pharmaceuticals-chemicals',
    name: 'Pharmaceuticals & Chemicals',
    tagline: 'Precision handling with HEPA filtration and ATEX safety guarantees',
    description: 'In pharmaceutical clean rooms and volatile chemical zones, worker safety is paramount. We provide lifting aids equipped with H14 HEPA filters to prevent contamination, alongside intrinsically safe (ATEX) lifters for hazardous explosive zones.',
    heroColor: 'from-cyan-700 to-blue-900',
    imageUrl: '/industries/PHARMACEUTICALS & CHEMICALS.jpg',
    iconType: 'flask',
    painPoints: [
      'Airborne particle contamination during powder transfer',
      'High explosion risk zones (ATEX Zone 1/21) requiring non-sparking equipment',
      'Stringent clean room compliance (ISO Class 7 and up)',
    ],
    recommendedProducts: ['palvac-sprint-hygienic', 'jumbosprint-ex', 'jumboflex'],
  },
  {
    slug: 'automotive-metal',
    name: 'Automotive & Metal Work',
    tagline: 'Heavy-duty lifting for dense, non-porous metal components and car parts',
    description: 'Moving car chassis components, pressing heavy sheet metal, and unloading engine parts from deep crates takes a massive physical toll. Our ergonomic heavy-lifters provide up to 300kg capacity with optional 90-degree swivel for precise placement in CNC machines or assembly lines.',
    heroColor: 'from-blue-800 to-slate-800',
    imageUrl: '/industries/AUTOMOTIVE & METAL WORK.jpg',
    iconType: 'car',
    painPoints: [
      'High incidence of musculoskeletal injuries among assembly line workers',
      'Difficulty extracting heavy metal parts from deep storage bins',
      'Need for precise, scratch-free orientation (90° tilting) of large flat metal sheets',
    ],
    recommendedProducts: ['jumboergo', 'jumbosprint', 'jumbo-low-stack'],
  },
  {
    slug: 'logistics-ecommerce',
    name: 'Logistics, Warehousing & E-commerce',
    tagline: 'High-speed sorting, palletizing, and order picking automation',
    description: 'Speed is the ultimate metric in logistics. Dealing with un-uniform parcel sizes, rapid high-cycle carton handling, and stacking to tall pallets requires an agile one-hand control lifter. Maximize vertical warehouse space and slash loading time.',
    heroColor: 'from-blue-600 to-cyan-800',
    imageUrl: '/industries/LOGISTICS, WAREHOUSING & E-COMMERCE.jpg',
    iconType: 'box',
    painPoints: [
      'Slow order fulfillment speeds due to manual box picking',
      'Low maximum stacking height by human operators, wasting warehouse vertical space',
      'Handling diverse packaging materials (porous cartons, tape, plastic wrap)',
    ],
    recommendedProducts: ['jumboflex', 'jumboflex-gen1', 'jumboflex-high-stack'],
  },
  {
    slug: 'construction-glass-wood',
    name: 'Construction, Glass & Woodworking',
    tagline: 'Secure vacuum hold for massive, unwieldy architectural materials',
    description: 'Glass panes, marble slabs, and massive wooden doors cannot be dropped. We deploy multi-circuit vacuum safety technology for lifting non-porous (glass) and semi-porous (MDF/wood) panels up to 300kg with 100% confidence and zero surface damage.',
    heroColor: 'from-slate-800 to-blue-950',
    imageUrl: '/industries/CONSTRUCTION, GLASS & WOODWORKING.jpg',
    iconType: 'hard-hat',
    painPoints: [
      'Catastrophic financial and safety risk from dropping glass/marble slabs',
      'Awkward large dimensions requiring 3-4 men to lift a single panel',
      'Surface scratching or marring by traditional mechanical clamps',
    ],
    recommendedProducts: ['jumboergo', 'jumbosprint'],
  },
  {
    slug: 'packaging-printing',
    name: 'Packaging & Printing',
    tagline: 'Gentle handling of paper rolls, foils, and delicate printed media',
    description: 'Swapping heavy paper rolls on printing presses or loading continuous foil packaging machines can paralyze a production line if done manually. Our core-gripping vacuum lifters make loading round, heavy packaging materials a one-person job.',
    heroColor: 'from-cyan-600 to-blue-700',
    imageUrl: '/industries/PACKAGING & PRINTING.jpg',
    iconType: 'factory',
    painPoints: [
      'Production downtime when waiting for staff to mount heavy paper/foil rolls',
      'Telescoping or damaging the core of delicate printed rolls',
      'Intense repetitive strain from lifting bundles of flattened cartons',
    ],
    recommendedProducts: ['jumboflex', 'jumbosprint', 'jumbo-low-stack'],
  },
  {
    slug: 'electronics-semi',
    name: 'Electronics & Semiconductors',
    tagline: 'ESD-safe handling for high-value sensitive components',
    description: 'Static electricity is the enemy of electronics manufacturing. Handing server racks, sensitive displays, or battery modules requires Anti-Static (ESD) compliant equipment to prevent invisible micro-shocks that destroy product value.',
    heroColor: 'from-blue-500 to-slate-800',
    imageUrl: '/industries/ELECTRONICS & SEMICONDUCTORS.jpg',
    iconType: 'cpu',
    painPoints: [
      'Electrostatic discharge (ESD) destroying expensive components during transit',
      'Vibration and harsh drops during manual lowering',
      'Cleanroom particulate generation from standard mechanical hoists',
    ],
    recommendedProducts: ['jumboflex-gen1', 'palvac-sprint-hygienic'],
  },
  {
    slug: 'plastics-rubber',
    name: 'Plastics & Rubber',
    tagline: 'Enduring handling solutions for hot, abrasive, and raw material sacks',
    description: 'Feeding hoppers with 25kg bags of plastic pellets or lifting hot rubber molds demands durable handling tools. Alleviate the brutal physical work of hopper-feeding and mold transportation with heat-resistant vacuum attachments.',
    heroColor: 'from-slate-700 to-blue-800',
    imageUrl: '/industries/PLASTICS & RUBBER.jpg',
    iconType: 'factory',
    painPoints: [
      'Back-breaking repetition of lifting 25kg pellet sacks into tall hoppers',
      'Handling components that are still hot from molding machines',
      'Dusty environments degrading standard lifting equipment',
    ],
    recommendedProducts: ['jumboflex-high-stack', 'jumbosprint-ex', 'jumboergo'],
  }
];

export function getRecommendedProducts(slugs: string[]): VTLVariant[] {
  return vacuumTubeLifterVariants.filter(v => slugs.includes(v.slug));
}
