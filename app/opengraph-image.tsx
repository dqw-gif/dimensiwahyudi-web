import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'PT Dimensi Quantum Wahyudi — Distributor Resmi Schmalz & Binar Handling Indonesia';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0f172a',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Background gradient blobs */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #1e40af 0%, transparent 70%)',
            opacity: 0.4,
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-80px',
            left: '-80px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #0891b2 0%, transparent 70%)',
            opacity: 0.3,
            display: 'flex',
          }}
        />

        {/* Grid pattern overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            display: 'flex',
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '60px 80px',
            height: '100%',
          }}
        >
          {/* Top: Badge */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: 'rgba(37, 99, 235, 0.2)',
                border: '1px solid rgba(59, 130, 246, 0.4)',
                borderRadius: '100px',
                padding: '10px 24px',
              }}
            >
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#3b82f6',
                  display: 'flex',
                }}
              />
              <span
                style={{
                  color: '#93c5fd',
                  fontSize: '16px',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                Distributor Resmi Schmalz & Binar Handling
              </span>
            </div>
          </div>

          {/* Middle: Main title */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div
              style={{
                fontSize: '72px',
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.0,
                letterSpacing: '-0.02em',
              }}
            >
              PT Dimensi
            </div>
            <div
              style={{
                fontSize: '72px',
                fontWeight: 900,
                color: 'transparent',
                background: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
                backgroundClip: 'text',
                lineHeight: 1.0,
                letterSpacing: '-0.02em',
                WebkitBackgroundClip: 'text',
              }}
            >
              Quantum Wahyudi
            </div>
            <div
              style={{
                fontSize: '24px',
                color: '#94a3b8',
                fontWeight: 500,
                marginTop: '8px',
                maxWidth: '700px',
                lineHeight: 1.5,
              }}
            >
              Solusi Vacuum Lifter & Material Handling Standar Eropa untuk Industri Indonesia
            </div>
          </div>

          {/* Bottom: Stats row */}
          <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-end' }}>
            {[
              { value: '500+', label: 'Proyek Instalasi' },
              { value: '12+', label: 'Tahun Pengalaman' },
              { value: '100+', label: 'Klien Industri' },
            ].map((stat) => (
              <div key={stat.label} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '40px', fontWeight: 900, color: '#f1f5f9', lineHeight: 1 }}>
                  {stat.value}
                </span>
                <span
                  style={{
                    fontSize: '14px',
                    color: '#64748b',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}

            {/* Right chevron brand mark */}
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '18px', color: '#3b82f6', fontWeight: 700 }}>dimensiwahyudi.com</span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
