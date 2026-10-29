import { Metadata } from 'next';
import EventPageClient from './EventPageClient';

export const metadata: Metadata = {
  title: 'Schmalz x Fanuc Manufacturing Seminar Registration | PT Dimensi Quantum Wahyudi',
  description: 'Registration portal for the Schmalz x Fanuc Automation Seminar in Cikarang.',
  openGraph: {
    title: 'Schmalz x Fanuc Automation Seminar',
    description: 'Registration portal for the Schmalz x Fanuc Automation Seminar in Cikarang.',
    url: 'https://www.dimensiwahyudi.com/schmalz-fanuc-event',
    siteName: 'PT Dimensi Quantum Wahyudi',
    images: [
      {
        url: 'https://dimensiwahyudi.com/images/schmalz-fanuc-event-banner.webp',
        width: 1200,
        height: 630,
        alt: 'Schmalz x Fanuc Automation Seminar',
      },
    ],
    locale: 'en_ID',
    type: 'website',
  },
  alternates: {
    canonical: 'https://dimensiwahyudi.com/schmalz-fanuc-event',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Schmalz x Fanuc Automation Seminar',
    description: 'Registration portal for the Schmalz x Fanuc Automation Seminar in Cikarang.',
    images: ['https://dimensiwahyudi.com/images/schmalz-fanuc-event-banner.webp'],
  },
};

export default function Page() {
  const fanucEventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'Schmalz X Fanuc Event: Improving Precision, Efficiency, and Productivity in Modern Manufacturing',
    description: 'Joint seminar on industrial vacuum automation and robotics hosted by Schmalz and Fanuc in Cikarang.',
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
    image: ['https://dimensiwahyudi.com/images/schmalz-fanuc-event-banner.webp'],
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
