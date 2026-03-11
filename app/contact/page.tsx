'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState('');

  // Ganti dengan Formspree ID kamu
  const FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || 'xrearydw';
  const FORMSPREE_URL = `https://formspree.io/f/${FORM_ID}`;

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    const form = e.target;
    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };
    const res = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) setStatus('success');
    else setStatus('error');
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <input name="name" required placeholder="Nama" className="input" />
      <input name="email" type="email" required placeholder="Email" className="input" />
      <textarea name="message" required placeholder="Pesan" className="input" />
      <button type="submit" className="btn">Kirim</button>
      {status === 'loading' && <p>Mengirim...</p>}
      {status === 'success' && <p>Email terkirim!</p>}
      {status === 'error' && <p>Gagal mengirim email.</p>}
    </form>
  );
}