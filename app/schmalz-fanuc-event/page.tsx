import { Metadata } from 'next';
import EventPageClient from './EventPageClient';

export const metadata: Metadata = {
  title: 'Pendaftaran Seminar Manufaktur Schmalz x Fanuc | PT Dimensi Quantum Wahyudi',
  description: 'Formulir pendaftaran umum Seminar Otomasi Manufaktur Schmalz x Fanuc Cikarang.',
  openGraph: {
    title: 'Daftar Seminar Otomasi Manufaktur Schmalz x Fanuc',
    description: 'Formulir pendaftaran umum Seminar Otomasi Manufaktur Schmalz x Fanuc Cikarang.',
    url: 'https://www.dimensiwahyudi.com/schmalz-fanuc-event',
    siteName: 'PT Dimensi Quantum Wahyudi',
    images: [
      {
        url: 'https://i.imgur.com/zvwgCiy.png',
        width: 1200,
        height: 630,
        alt: 'Seminar Otomasi Schmalz x Fanuc',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daftar Seminar Otomasi Manufaktur Schmalz x Fanuc',
    description: 'Formulir pendaftaran umum Seminar Otomasi Manufaktur Schmalz x Fanuc Cikarang.',
    images: ['https://i.imgur.com/zvwgCiy.png'],
  },
};

export default function Page() {
  return <EventPageClient />;
}
