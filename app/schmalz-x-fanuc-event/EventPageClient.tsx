'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './event.css';

export default function EventPageClient() {
  return (
    <div className="sf-wp-event pt-20">
      <div className="sf-lp-container">
        
        {/* LOGO HEADER SECTION */}
        <header className="sf-header-logos">
          <div className="sf-logo-group-left">
            <Image src="/logo.webp" alt="PT Dimensi Quantum Wahyudi" width={180} height={40} className="sf-logo-img sf-logo-dq" style={{ height: 'auto', width: 'auto' }} />
            <div className="sf-logo-separator"></div>
            <Image src="/brands/schmalz.webp" alt="Schmalz" width={110} height={32} className="sf-logo-img sf-logo-schmalz" style={{ height: 'auto', width: 'auto' }} />
          </div>
          <img src="https://i.imgur.com/vk1ayn6.png" alt="Fanuc" className="sf-logo-img sf-logo-fanuc" />
        </header>

        {/* HERO BANNER SECTION */}
        <section className="sf-hero-card">
          <div>
            <div className="sf-hero-badge" style={{ backgroundColor: 'rgba(210, 18, 46, 0.1)', color: 'var(--sf-danger)', border: '1px solid rgba(210, 18, 46, 0.2)' }}>
              Registration Closed <span>| Kuota Penuh</span>
            </div>
            <h1 className="sf-hero-title">Schmalz X Fanuc Event</h1>
            <p className="sf-hero-subtitle">Improving Precision, Efficiency, and Productivity in Modern Manufacturing</p>
          </div>
          
          <div className="sf-hero-meta">
            <div className="sf-hero-meta-item">
              <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span>Selasa, 28 Juli 2026</span>
            </div>
            <div className="sf-hero-meta-item">
              <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>09:00 - 15:00 WIB</span>
            </div>
            <div className="sf-hero-meta-item">
              <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span>PT. Fanuc Indonesia Cikarang Office</span>
            </div>
          </div>
        </section>

        {/* MAIN GRID */}
        <main className="sf-main-grid">
          
          {/* LEFT COLUMN: DETAILS */}
          <div className="sf-details-column">
            
            {/* Map Container */}
            <div className="sf-map-container">
              <div className="sf-map-title">
                <span>Peta Lokasi Fanuc Cikarang</span>
                <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                </svg>
              </div>
              <iframe 
                className="sf-map-iframe" 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.6559387431264!2d107.16853681134257!3d-6.316645793646036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e699b12a89ba55d%3A0xde6a219449b8cf08!2sPT.%20Fanuc%20Indonesia%20Cikarang%20Office!5e0!3m2!1sid!2sid!4v1719660000000!5m2!1sid!2sid" 
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Contact Card */}
            <div className="sf-contact-card">
              <h4 className="sf-contact-title">Butuh Bantuan & Informasi?</h4>
              <div className="sf-contact-links">
                <a href="tel:+6281119168752" className="sf-contact-link">
                  <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <span>+62 811-1916-8752 (WhatsApp/Call)</span>
                </a>
                <a href="mailto:marketing@dimensiwahyudi.com" className="sf-contact-link">
                  <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 0-2-2H5a2 2 0 0-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span>marketing@dimensiwahyudi.com</span>
                </a>
                <a href="https://www.dimensiwahyudi.com" target="_blank" rel="noopener noreferrer" className="sf-contact-link">
                  <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                  </svg>
                  <span>www.dimensiwahyudi.com</span>
                </a>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: REGISTRATION CLOSED CARD */}
          <div className="sf-form-column">
            <div className="sf-form-card" style={{ borderTop: '4px solid var(--sf-danger)' }}>
              
              <div className="sf-success-state" style={{ display: 'block' }}>
                <div className="sf-success-icon-box" style={{ backgroundColor: 'rgba(210, 18, 46, 0.08)', color: 'var(--sf-danger)' }}>
                  <svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"></path>
                  </svg>
                </div>
                
                <h2 className="sf-success-title" style={{ color: 'var(--sf-danger)', fontFamily: 'var(--sf-font-title)' }}>Registrasi Resmi Ditutup</h2>
                
                <div style={{
                  backgroundColor: 'rgba(241, 245, 249, 0.9)',
                  border: '1px solid var(--sf-border)',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '24px',
                  textAlign: 'left',
                  fontSize: '0.94rem',
                  lineHeight: '1.6',
                  color: '#334155'
                }}>
                  <p style={{ marginBottom: '12px' }}>
                    Terima kasih atas antusiasme luar biasa Anda terhadap <strong>Seminar Otomasi Manufaktur Schmalz x Fanuc</strong>.
                  </p>
                  <p style={{ marginBottom: '12px' }}>
                    Saat ini pendaftaran telah resmi ditutup karena batas maksimum kapasitas peserta untuk acara ini telah terpenuhi sepenuhnya.
                  </p>
                  <p>
                    Bagi Anda yang sudah mendaftar dan masuk dalam daftar tunggu sebelumnya, tim panitia sedang memverifikasi data dan akan menghubungi Anda secara mandiri via email apabila terdapat pembatalan slot.
                  </p>
                </div>

                <div className="sf-success-actions">
                  <Link 
                    href="/"
                    className="sf-btn-action sf-btn-reset"
                    style={{ background: 'var(--sf-primary)', color: '#ffffff', border: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    Kembali ke Beranda
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </main>

        {/* FOOTER */}
        <footer className="sf-footer">
          <p>&copy; 2026 PT Dimensi Quantum Wahyudi. All Rights Reserved.</p>
          <p>Hubungi Penyelenggara: <a href="mailto:marketing@dimensiwahyudi.com">marketing@dimensiwahyudi.com</a> | Kunjungi: <a href="https://www.dimensiwahyudi.com" target="_blank" rel="noopener noreferrer">dimensiwahyudi.com</a></p>
        </footer>

      </div>
    </div>
  );
}
