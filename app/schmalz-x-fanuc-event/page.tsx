import { Metadata } from 'next';
import EventPageClient from './EventPageClient';

export const metadata: Metadata = {
  title: 'Registrasi VIP Event Schmalz x Fanuc | PT Dimensi Quantum Wahyudi',
  description: 'Pendaftaran khusus undangan VIP untuk Seminar Industrial Kolaborasi Schmalz x Fanuc Cikarang.',
  openGraph: {
    title: 'Registrasi VIP Event Schmalz x Fanuc',
    description: 'Pendaftaran khusus undangan VIP untuk Seminar Industrial Kolaborasi Schmalz x Fanuc Cikarang.',
    url: 'https://www.dimensiwahyudi.com/schmalz-x-fanuc-event',
    siteName: 'PT Dimensi Quantum Wahyudi',
    images: [
      {
        url: 'https://i.imgur.com/zvwgCiy.png',
        width: 1200,
        height: 630,
        alt: 'Schmalz X Fanuc Event',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Registrasi VIP Event Schmalz x Fanuc',
    description: 'Pendaftaran khusus undangan VIP untuk Seminar Industrial Kolaborasi Schmalz x Fanuc Cikarang.',
    images: ['https://i.imgur.com/zvwgCiy.png'],
  },
};

export default function Page() {
  return <EventPageClient />;
}
