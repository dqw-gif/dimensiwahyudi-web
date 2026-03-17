export type ErgonomicsCase = {
  title: string;
  industry: string;
  summary: string;
  impact: string;
  href: string;
};

// DEV: Ganti semua data dummy ini dengan proyek nyata Indonesia sebelum publikasi final.
export const ergonomicsCasesByTopic: Record<string, ErgonomicsCase[]> = {
  health: [
    {
      title: 'Operator Strain Reduction in Packaging Line',
      industry: 'FMCG Packaging',
      summary: 'Manual lifting points were redesigned using assisted handling for repetitive carton transfer.',
      impact: 'Lower fatigue complaints and more stable end-of-shift output.',
      href: '/contact',
    },
    {
      title: 'Safer Coil Handling Workflow',
      industry: 'Metal Processing',
      summary: 'High-risk lifting stations were mapped and converted to guided ergonomic handling steps.',
      impact: 'Improved movement control and reduced unsafe posture exposure.',
      href: '/contact',
    },
  ],
  productivity: [
    {
      title: 'Cycle-Time Stabilization in Warehouse Flow',
      industry: 'Logistics',
      summary: 'Assisted lifting was integrated into repetitive loading operations with measurable KPI tracking.',
      impact: 'More consistent shift performance and lower micro-interruption rate.',
      href: '/contact',
    },
    {
      title: 'Handling Efficiency Upgrade for Glass Components',
      industry: 'Automotive Supply Chain',
      summary: 'Precision movement steps were standardized to reduce adjustment and rework loops.',
      impact: 'Faster handling rhythm and better process consistency.',
      href: '/contact',
    },
  ],
  safety: [
    {
      title: 'Safety-Critical Handling Mapping Program',
      industry: 'General Manufacturing',
      summary: 'The team prioritized high-risk manual handling points using a structured control hierarchy.',
      impact: 'Clearer SOP alignment and stronger preventive control execution.',
      href: '/contact',
    },
    {
      title: 'Ergonomic Compliance Readiness Improvement',
      industry: 'Industrial Assembly',
      summary: 'Workstations were reviewed for posture, load, and process flow to support safer task execution.',
      impact: 'Better audit readiness and reduced risk variability between shifts.',
      href: '/contact',
    },
  ],
};
