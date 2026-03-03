
import React from 'react';

// --- CUSTOM VACUUM ENGINEERING ICONS ---
export const CustomIcons = {
  hoseBranch: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 md:w-6 md:h-6" {...props}>
        <path d="M12 3v12" />
        <path d="M12 15l-3 3" />
        <path d="M12 15l3 3" />
        <path d="M12 15v3" />
        <path d="M5 12h14" /> 
        <path d="M5 12v3" />
        <path d="M19 12v3" />
    </svg>
  ),
  HorizontalArrow: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="20" y="32" width="24" height="12" rx="1" stroke="#334155" />
      <path d="M16 38h4v-1h-2c-1 0-2-1-2-2s1-2 2-2h2v-1h-4" stroke="#334155" />
      <path d="M32 46v8m-3-3l3 3 3-3" stroke="#005596" strokeWidth="2" />
      <text x="32" y="60" textAnchor="middle" fontSize="6" fill="#005596" fontWeight="bold">mg</text>
    </svg>
  ),
  VerticalArrow: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
       <rect x="20" y="36" width="24" height="12" rx="1" stroke="#334155" />
       <path d="M32 36v-4m-3 4h6m-6-4c-2 0-3-2-3-4h12c0 2-1 4-3 4" stroke="#334155" />
       <path d="M32 50v8m-3-3l3 3 3-3" stroke="#005596" strokeWidth="2" />
    </svg>
  )
};

export const VacuumIcons = {
  // 1. Num Cups: Menampilkan benda yang diangkat oleh 3 cup
  NumCups: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="15" width="20" height="4" rx="1" />
      <path d="M5 15v-2c0-1.5 1-2 2-2h0c1 0 2 0.5 2 2v2" />
      <path d="M11 15v-2c0-1.5 1-2 2-2h0c1 0 2 0.5 2 2v2" />
      <path d="M17 15v-2c0-1.5 1-2 2-2h0c1 0 2 0.5 2 2v2" />
      <path d="M7 11V7" /><path d="M13 11V7" /><path d="M19 11V7" />
      <path d="M7 7h12" />
      <path d="M13 7V3" />
    </svg>
  ),
  // 2. Diameter: Profil cup dengan garis dimensi
  CupDiameter: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 14c0-3 3-5 6-5s6 2 6 5" />
      <path d="M4 14h16" />
      <path d="M10 9V5h4v4" />
      <path d="M2 18h20" strokeDasharray="2 2" strokeOpacity="0.5" />
      <path d="M2 18l3-3" strokeOpacity="0.5"/><path d="M22 18l-3-3" strokeOpacity="0.5"/>
      <path d="M6 21h12" />
      <path d="M6 21l2-2" /><path d="M6 21l2 2" />
      <path d="M18 21l-2-2" /><path d="M18 21l-2 2" />
    </svg>
  ),
  // 3. Suction Force: Cup mengangkat beban (panah ke atas)
  SuctionForce: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M7 14c0-3 2-4 5-4s5 1 5 4" />
      <path d="M5 14h14" />
      <rect x="6" y="14" width="12" height="6" rx="1" fill="currentColor" fillOpacity="0.1" />
      <path d="M12 10V3" strokeWidth="2" />
      <path d="M9 6l3-3 3 3" strokeWidth="2" />
    </svg>
  ),
  // 4. Holding Force: Jangkar teknis / Beban aman
  HoldingForce: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="6" y="4" width="12" height="12" rx="2" />
      <path d="M12 9v2" />
      <circle cx="12" cy="11" r="5" strokeOpacity="0.3" />
      <path d="M12 16v5" strokeWidth="2" />
      <path d="M9 19l3 3 3-3" strokeWidth="2" />
    </svg>
  ),
  // 5. Hose Dist: Manifold (Satu jalur jadi banyak)
  HoseDist: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2v6" strokeWidth="2" />
      <rect x="4" y="8" width="16" height="4" rx="1" />
      <path d="M6 12v8" /><path d="M12 12v8" /><path d="M18 12v8" />
      <path d="M4 18h4" strokeOpacity="0.2" /><path d="M10 18h4" strokeOpacity="0.2" /><path d="M16 18h4" strokeOpacity="0.2" />
    </svg>
  ),
  // 6. Evac Time: Tangki dengan Jam
  EvacTime: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 7h14v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7z" />
      <path d="M5 7c0-2 2-3 7-3s7 1 7 3" />
      <circle cx="16" cy="17" r="5" fill="white" />
      <path d="M16 17v-2" /><path d="M16 17l1 1" />
    </svg>
  ),
  // 7. Capacity: Simbol Pompa Vakum (Segitiga dalam lingkaran)
  SuctionCap: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7l-4 8h8z" fill="currentColor" fillOpacity="0.1" />
      <path d="M21 12h-9" />
      <path d="M3 12h3" />
    </svg>
  ),
  // 8. Hose Diameter: Potongan melintang selang
  HoseDia: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="8" strokeWidth="2" />
      <circle cx="12" cy="12" r="3" strokeOpacity="0.3" />
      <path d="M4 12h8" strokeDasharray="2 2" />
      <path d="M12 20v-8" strokeDasharray="2 2" />
      <path d="M17 17l-1-1" />
    </svg>
  ),
  // 9. Ambient: Gunung & Gauge
  AmbientPressure: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 20h20" />
      <path d="M5 20l7-12 5 12" />
      <circle cx="18" cy="6" r="3" />
      <path d="M18 6v-1" />
    </svg>
  ),
  // 10. Air Flow: Aliran udara melewati celah
  AirFlow: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 12h18" strokeDasharray="4 2" />
      <path d="M18 9l3 3-3 3" />
      <path d="M2 7h20" strokeWidth="2" />
      <path d="M2 17h20" strokeWidth="2" />
      <path d="M12 7v4" strokeWidth="3" />
      <path d="M12 17v-4" strokeWidth="3" />
    </svg>
  )
};
