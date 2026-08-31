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
  alternates: {
    canonical: 'https://dimensiwahyudi.com/schmalz-fanuc-event',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daftar Seminar Otomasi Manufaktur Schmalz x Fanuc',
    description: 'Formulir pendaftaran umum Seminar Otomasi Manufaktur Schmalz x Fanuc Cikarang.',
    images: ['https://i.imgur.com/zvwgCiy.png'],
  },
};

export default function Page() {
  const fanucEventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'Schmalz X Fanuc Event: Improving Precision, Efficiency, and Productivity in Modern Manufacturing',
    description: 'Seminar kolaborasi otomasi vakum dan robotik industri oleh Schmalz dan Fanuc di Cikarang.',
    startDate: '2026-03-12T09:00:00+07:00',
    endDate: '2026-03-12T16:00:00+07:00',
    eventStatus: 'https://schema.org/EventCancelled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: 'Fanuc Indonesia Technical Center',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Kawasan Industri Cikarang',
        addressLocality: 'Cikarang, Bekasi',
        addressRegion: 'West Java',
        addressCountry: 'ID',
      },
    },
    image: ['https://i.imgur.com/zvwgCiy.png'],
    organizer: {
      '@type': 'Organization',
      name: 'PT Dimensi Quantum Wahyudi',
      url: 'https://dimensiwahyudi.com',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(fanucEventSchema) }}
      />
      <EventPageClient />
    </>
  );
}
