export type ErgonomicsCase = {
  title: string;
  titleId: string;
  industry: string;
  industryId: string;
  summary: string;
  summaryId: string;
  impact: string;
  impactId: string;
  href: string;
};

// Field case studies for Indonesian manufacturing installations.
export const ergonomicsCasesByTopic: Record<string, ErgonomicsCase[]> = {
  health: [
    {
      title: 'Operator Strain Reduction in Packaging Line',
      titleId: 'Penurunan Beban Otot Operator di Lini Packaging',
      industry: 'FMCG Packaging',
      industryId: 'Kemasan FMCG',
      summary: 'Manual lifting points were redesigned using assisted handling for repetitive carton transfer.',
      summaryId: 'Titik angkat manual dirancang ulang menggunakan Vacuum Tube Lifter untuk pemindahan karton berulang.',
      impact: 'Lower fatigue complaints and more stable end-of-shift output.',
      impactId: 'Keluhan kelelahan punggung turun drastis dan output akhir shift jauh lebih stabil.',
      href: '/contact',
    },
    {
      title: 'Safer Coil Handling Workflow',
      titleId: 'Alur Kerja Penanganan Coil Lebih Aman',
      industry: 'Metal Processing',
      industryId: 'Pengolahan Logam',
      summary: 'High-risk lifting stations were mapped and converted to guided ergonomic handling steps.',
      summaryId: 'Stasiun angkat berisiko tinggi dipetakan dan dikonversi menjadi sistem pengangkatan mekanis terpandu.',
      impact: 'Improved movement control and reduced unsafe posture exposure.',
      impactId: 'Kontrol posisi workpiece lebih presisi dan paparan postur bungkuk berbahaya berhasil ditekan.',
      href: '/contact',
    },
  ],
  productivity: [
    {
      title: 'Cycle-Time Stabilization in Warehouse Flow',
      titleId: 'Stabilisasi Cycle Time pada Alur Gudang Logistik',
      industry: 'Logistics',
      industryId: 'Logistik & Distribusi',
      summary: 'Assisted lifting was integrated into repetitive loading operations with measurable KPI tracking.',
      summaryId: 'Alat bantu angkat vakum diintegrasikan ke operasi bongkar-muat berulang dengan pemantauan KPI terukur.',
      impact: 'More consistent shift performance and lower micro-interruption rate.',
      impactId: 'Performa antar-shift lebih konsisten dan jeda istirahat mikro akibat kelelahan berkurang.',
      href: '/contact',
    },
    {
      title: 'Handling Efficiency Upgrade for Glass Components',
      titleId: 'Peningkatan Efisiensi Penanganan Komponen Kaca',
      industry: 'Automotive Supply Chain',
      industryId: 'Rantai Pasok Otomotif',
      summary: 'Precision movement steps were standardized to reduce adjustment and rework loops.',
      summaryId: 'Tahapan pergerakan presisi distandarisasi untuk memangkas waktu penyesuaian posisi dan rework.',
      impact: 'Faster handling rhythm and better process consistency.',
      impactId: 'Ritme pemindahan workpiece lebih cepat dengan tingkat akurasi perakitan yang konsisten.',
      href: '/contact',
    },
  ],
  safety: [
    {
      title: 'Safety-Critical Handling Mapping Program',
      titleId: 'Program Pemetaan Titik Angkat Kritis K3',
      industry: 'General Manufacturing',
      industryId: 'Manufaktur Umum',
      summary: 'The team prioritized high-risk manual handling points using a structured control hierarchy.',
      summaryId: 'Tim engenharia dan HSE memprioritaskan titik angkat manual berisiko tinggi menggunakan hierarki pengendalian teknis.',
      impact: 'Clearer SOP alignment and stronger preventive control execution.',
      impactId: 'Keselarasan SOP K3 lebih jelas dan eksekusi pencegahan cedera di lapangan lebih kuat.',
      href: '/contact',
    },
    {
      title: 'Ergonomic Compliance Readiness Improvement',
      titleId: 'Peningkatan Kesiapan Kepatuhan Standar Ergonomi',
      industry: 'Industrial Assembly',
      industryId: 'Perakitan Industri',
      summary: 'Workstations were reviewed for posture, load, and process flow to support safer task execution.',
      summaryId: 'Stasiun kerja dievaluasi dari sisi postur, payload, dan alur proses untuk mendukung eksekusi kerja yang aman.',
      impact: 'Better audit readiness and reduced risk variability between shifts.',
      impactId: 'Kesiapan audit K3 meningkat dan variasi risiko kecelakaan kerja antar-shift menurun.',
      href: '/contact',
    },
  ],
};
