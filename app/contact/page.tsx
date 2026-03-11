'use client';

import { useState } from 'react';

function ContactForm() {
  const [status, setStatus] = useState('');
  const FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || 'xrearydw';
  const FORMSPREE_URL = `https://formspree.io/f/${FORM_ID}`;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const form = e.target as HTMLFormElement;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
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

export default function ContactPage() {
  return (
    <main className="py-16 min-h-screen bg-white">
      <h1 className="text-3xl font-bold text-center mb-8">Hubungi Kami</h1>
      <ContactForm />
    </main>
  );
}