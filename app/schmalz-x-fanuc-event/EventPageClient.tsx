'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import './event.css';

export default function EventPageClient() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    whatsapp: '',
    perusahaan: '',
    jabatan: '',
    jabatanManual: '',
    sektor: '',
    sektorManual: '',
  });

  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Validate fields dynamically
  const validateField = (name: string, value: string): boolean => {
    let isValid = true;
    const cleanValue = value.trim();

    if (!cleanValue) {
      isValid = false;
    } else if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(cleanValue);
    } else if (name === 'whatsapp') {
      const phoneRegex = /^\+?[0-9]{9,15}$/;
      const cleanPhone = cleanValue.replace(/[-\s]/g, '');
      isValid = phoneRegex.test(cleanPhone);
    }

    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    const fieldName = id.replace('sf-', '');

    // Format phone number input dynamically
    let finalValue = value;
    if (fieldName === 'whatsapp') {
      finalValue = value.replace(/[-\s]/g, '');
    }

    setFormData((prev) => ({ ...prev, [fieldName]: finalValue }));

    if (touched[fieldName]) {
      const isValid = validateField(fieldName, finalValue);
      setErrors((prev) => ({ ...prev, [fieldName]: !isValid }));
    }
  };

  const handleBlur = (fieldName: string) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    const isValid = validateField(fieldName, formData[fieldName as keyof typeof formData]);
    setErrors((prev) => ({ ...prev, [fieldName]: !isValid }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, boolean> = {};
    let isFormValid = true;

    const fieldsToValidate = ['nama', 'email', 'whatsapp', 'perusahaan', 'jabatan', 'sektor'];
    
    // Add manual input validation only if dynamic fields are visible
    if (formData.jabatan === 'Lainnya') fieldsToValidate.push('jabatanManual');
    if (formData.sektor === 'Lainnya') fieldsToValidate.push('sektorManual');

    fieldsToValidate.forEach((field) => {
      const value = formData[field as keyof typeof formData];
      const isValid = validateField(field, value);
      if (!isValid) {
        newErrors[field] = true;
        isFormValid = false;
      }
    });

    setErrors(newErrors);
    // Mark all as touched so errors display
    const allTouched = fieldsToValidate.reduce((acc, field) => ({ ...acc, [field]: true }), {});
    setTouched(allTouched);

    return isFormValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    const eventDatePrefix = '260728'; // YYMMDD
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const generatedTicketId = `SF-${eventDatePrefix}-${randomNum}`;

    const payload = {
      id: generatedTicketId,
      nama: formData.nama.trim(),
      email: formData.email.trim(),
      whatsapp: formData.whatsapp.trim(),
      perusahaan: formData.perusahaan.trim(),
      jabatan: formData.jabatan === 'Lainnya' ? formData.jabatanManual.trim() : formData.jabatan,
      sektor: formData.sektor === 'Lainnya' ? formData.sektorManual.trim() : formData.sektor,
    };

    try {
      const response = await fetch('/api/register-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result && result.status === 'success') {
        setIsSuccess(true);
      } else {
        alert(result.message || 'Gagal menyimpan pendaftaran ke database. Silakan coba kembali.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Koneksi gagal atau terjadi error sistem. Silakan hubungi panitia melalui kontak di halaman ini.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      nama: '',
      email: '',
      whatsapp: '',
      perusahaan: '',
      jabatan: '',
      jabatanManual: '',
      sektor: '',
      sektorManual: '',
    });
    setErrors({});
    setTouched({});
    setIsSuccess(false);
  };

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
            <div className="sf-hero-badge">
              Free Registration <span>| Limited Seats</span>
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

          {/* RIGHT COLUMN: FORM OR SUCCESS */}
          <div className="sf-form-column">
            <div className="sf-form-card">
              
              {!isSuccess ? (
                <>
                  {/* Form Header */}
                  <div className="sf-form-header">
                    <span className="sf-form-badge">Free Registration</span>
                    <h2 className="sf-form-title">Daftar Sekarang</h2>
                    <p className="sf-form-desc">Isi form di bawah ini dengan lengkap untuk mengamankan kursi Anda.</p>
                  </div>

                  {/* Pre-Form Warning Info Box */}
                  <div className="sf-info-alert-banner">
                    <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, marginTop: '2px' }}>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                    <span>
                      <strong>Informasi Kuota:</strong> Pendaftaran umum ini masuk dalam daftar tunggu (waiting list). Kuota kursi terbatas dan panitia akan melakukan verifikasi sebelum mengirim undangan tiket resmi.
                    </span>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} noValidate>
                    {/* 1. Nama Lengkap */}
                    <div className="sf-form-group">
                      <label htmlFor="sf-nama" className="sf-form-label">Nama Lengkap <span>*</span></label>
                      <div className="sf-input-wrapper">
                        <span className="sf-input-icon">
                          <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                          </svg>
                        </span>
                        <input 
                          type="text" 
                          id="sf-nama" 
                          className={`sf-form-control ${errors.nama ? 'sf-invalid' : ''}`}
                          placeholder="Nama Lengkap sesuai kartu identitas" 
                          value={formData.nama}
                          onChange={handleInputChange}
                          onBlur={() => handleBlur('nama')}
                          disabled={isLoading}
                        />
                        {errors.nama && <div className="sf-error-message">Nama Lengkap wajib diisi (minimal 3 karakter).</div>}
                      </div>
                    </div>

                    {/* 2. Email Bisnis */}
                    <div className="sf-form-group">
                      <label htmlFor="sf-email" className="sf-form-label">Email Bisnis / Pribadi <span>*</span></label>
                      <div className="sf-input-wrapper">
                        <span className="sf-input-icon">
                          <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 0-2-2H5a2 2 0 0-2 2v10a2 2 0 002 2z"></path>
                          </svg>
                        </span>
                        <input 
                          type="email" 
                          id="sf-email" 
                          className={`sf-form-control ${errors.email ? 'sf-invalid' : ''}`}
                          placeholder="alamat.email@perusahaan.com" 
                          value={formData.email}
                          onChange={handleInputChange}
                          onBlur={() => handleBlur('email')}
                          disabled={isLoading}
                        />
                        {errors.email && <div className="sf-error-message">Format email tidak valid (Contoh: nama@domain.com).</div>}
                      </div>
                    </div>

                    {/* 3. Nomor WhatsApp */}
                    <div className="sf-form-group">
                      <label htmlFor="sf-whatsapp" className="sf-form-label">Nomor WhatsApp <span>*</span></label>
                      <div className="sf-input-wrapper">
                        <span className="sf-input-icon">
                          <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                          </svg>
                        </span>
                        <input 
                          type="tel" 
                          id="sf-whatsapp" 
                          className={`sf-form-control ${errors.whatsapp ? 'sf-invalid' : ''}`}
                          placeholder="Contoh: 08123456789 atau +628123456789" 
                          value={formData.whatsapp}
                          onChange={handleInputChange}
                          onBlur={() => handleBlur('whatsapp')}
                          disabled={isLoading}
                        />
                        {errors.whatsapp && <div className="sf-error-message">Masukkan nomor WhatsApp aktif yang valid (9 s.d. 15 angka).</div>}
                      </div>
                    </div>

                    {/* 4. Nama Perusahaan */}
                    <div className="sf-form-group">
                      <label htmlFor="sf-perusahaan" className="sf-form-label">Nama Perusahaan / Institusi <span>*</span></label>
                      <div className="sf-input-wrapper">
                        <span className="sf-input-icon">
                          <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                          </svg>
                        </span>
                        <input 
                          type="text" 
                          id="sf-perusahaan" 
                          className={`sf-form-control ${errors.perusahaan ? 'sf-invalid' : ''}`}
                          placeholder="PT. Nama Perusahaan Anda" 
                          value={formData.perusahaan}
                          onChange={handleInputChange}
                          onBlur={() => handleBlur('perusahaan')}
                          disabled={isLoading}
                        />
                        {errors.perusahaan && <div className="sf-error-message">Nama Perusahaan / Institusi wajib diisi.</div>}
                      </div>
                    </div>

                    {/* 5. Jabatan */}
                    <div className="sf-form-group">
                      <label htmlFor="sf-jabatan" className="sf-form-label">Jabatan / Posisi <span>*</span></label>
                      <div className="sf-input-wrapper">
                        <span className="sf-input-icon">
                          <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"></path>
                          </svg>
                        </span>
                        <select 
                          id="sf-jabatan" 
                          className={`sf-form-control ${errors.jabatan ? 'sf-invalid' : ''}`}
                          value={formData.jabatan}
                          onChange={handleInputChange}
                          onBlur={() => handleBlur('jabatan')}
                          disabled={isLoading}
                        >
                          <option value="" disabled>Pilih Jabatan / Posisi</option>
                          <option value="Direktur / C-Level">Direktur / C-Level</option>
                          <option value="Manager / Kepala Divisi">Manager / Kepala Divisi</option>
                          <option value="Engineer (Automation/Production/Maintenance)">Engineer (Automation / Production / Maintenance)</option>
                          <option value="Operator / Teknisi">Operator / Teknisi</option>
                          <option value="Purchasing / Procurement">Purchasing / Procurement</option>
                          <option value="Lainnya">Lainnya (Input Manual)</option>
                        </select>
                        {errors.jabatan && <div className="sf-error-message">Silakan pilih Jabatan / Posisi Anda.</div>}
                      </div>
                    </div>

                    {/* 5b. Jabatan Manual */}
                    {formData.jabatan === 'Lainnya' && (
                      <div className="sf-form-group sf-dynamic-group" style={{ marginTop: '10px', marginLeft: '15px', borderLeft: '2px solid var(--sf-primary)', paddingLeft: '15px' }}>
                        <label htmlFor="sf-jabatan-manual" className="sf-form-label">Tulis Jabatan Anda <span>*</span></label>
                        <div className="sf-input-wrapper">
                          <input 
                            type="text" 
                            id="sf-jabatan-manual" 
                            className={`sf-form-control sf-form-control-manual ${errors.jabatanManual ? 'sf-invalid' : ''}`}
                            placeholder="Tulis jabatan spesifik Anda" 
                            value={formData.jabatanManual}
                            onChange={handleInputChange}
                            onBlur={() => handleBlur('jabatanManual')}
                            disabled={isLoading}
                          />
                          {errors.jabatanManual && <div className="sf-error-message">Kolom ini wajib diisi.</div>}
                        </div>
                      </div>
                    )}

                    {/* 6. Sektor Industri */}
                    <div className="sf-form-group">
                      <label htmlFor="sf-sektor" className="sf-form-label">Sektor Industri <span>*</span></label>
                      <div className="sf-input-wrapper">
                        <span className="sf-input-icon">
                          <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path>
                          </svg>
                        </span>
                        <select 
                          id="sf-sektor" 
                          className={`sf-form-control ${errors.sektor ? 'sf-invalid' : ''}`}
                          value={formData.sektor}
                          onChange={handleInputChange}
                          onBlur={() => handleBlur('sektor')}
                          disabled={isLoading}
                        >
                          <option value="" disabled>Pilih Sektor Industri</option>
                          <option value="Automotive">Otomotif & Komponen</option>
                          <option value="Electronics">Elektronik & Semikonduktor</option>
                          <option value="Food & Beverage">Makanan & Minuman (F&B)</option>
                          <option value="Packaging">Pengemasan & Kertas (Packaging)</option>
                          <option value="Metalworking">Pengerjaan Logam (Metalworking)</option>
                          <option value="Logistics">Logistik & Pergudangan</option>
                          <option value="Automation">Sistem Integrator / Otomasi</option>
                          <option value="Lainnya">Lainnya (Input Manual)</option>
                        </select>
                        {errors.sektor && <div className="sf-error-message">Silakan pilih salah satu Sektor Industri.</div>}
                      </div>
                    </div>

                    {/* 6b. Sektor Industri Manual */}
                    {formData.sektor === 'Lainnya' && (
                      <div className="sf-form-group sf-dynamic-group" style={{ marginTop: '10px', marginLeft: '15px', borderLeft: '2px solid var(--sf-primary)', paddingLeft: '15px' }}>
                        <label htmlFor="sf-sektor-manual" className="sf-form-label">Tulis Sektor Industri Anda <span>*</span></label>
                        <div className="sf-input-wrapper">
                          <input 
                            type="text" 
                            id="sf-sektor-manual" 
                            className={`sf-form-control sf-form-control-manual ${errors.sektorManual ? 'sf-invalid' : ''}`}
                            placeholder="Tulis sektor industri spesifik Anda" 
                            value={formData.sektorManual}
                            onChange={handleInputChange}
                            onBlur={() => handleBlur('sektorManual')}
                            disabled={isLoading}
                          />
                          {errors.sektorManual && <div className="sf-error-message">Kolom ini wajib diisi.</div>}
                        </div>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button 
                      type="submit" 
                      className={`sf-btn-submit ${isLoading ? 'sf-loading' : ''}`}
                      disabled={isLoading}
                    >
                      <span className="sf-spinner"></span>
                      <span className="sf-btn-text">Daftar Sekarang (Register Now)</span>
                    </button>
                  </form>
                </>
              ) : (
                /* Success State Container with warning colors and shake animation (Identical to Ads) */
                <div className="sf-success-state sf-shake-animation" style={{ display: 'block' }}>
                  <div className="sf-success-icon-box" style={{ backgroundColor: 'rgba(242, 169, 0, 0.1)', color: 'var(--sf-accent)' }}>
                    <svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                  </div>
                  
                  <h2 className="sf-success-title" style={{ color: 'var(--sf-accent)' }}>Antrean Registrasi Terkirim</h2>
                  
                  {/* Warning Highlight Card */}
                  <div style={{
                    backgroundColor: 'rgba(242, 169, 0, 0.05)',
                    border: '1.5px solid var(--sf-accent)',
                    borderRadius: '8px',
                    padding: '16px',
                    marginBottom: '24px',
                    textAlign: 'left',
                    fontSize: '0.92rem',
                    lineHeight: '1.6',
                    color: '#334155'
                  }}>
                    <strong>⚠️ PENTING: HARAP BACA STATUS ANDA</strong>
                    <p style={{ marginTop: '8px' }}>
                      Data Anda telah kami catat secara aman. Kami akan segera mengirimkan email konfirmasi resmi beserta undangan keikutsertaan Anda apabila kuota/slot peserta masih tersedia. Terima kasih atas ketertarikan Anda.
                    </p>
                  </div>
                  
                  <div className="sf-success-actions">
                    <button 
                      type="button" 
                      className="sf-btn-action sf-btn-reset"
                      onClick={handleReset}
                      style={{ background: 'var(--sf-primary)', color: '#ffffff', border: 'none' }}
                    >
                      Saya Mengerti & Akan Menunggu Konfirmasi
                    </button>
                  </div>
                </div>
              )}

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
