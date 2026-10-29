import { Metadata } from 'next';
import eventsData from '../../data/events.json';
import EventsClient from './EventsClient';

export const metadata: Metadata = {
  title: 'Events & Exhibitions 2026 | PT Dimensi Quantum Wahyudi',
  description: 'Join PT Dimensi Quantum Wahyudi at leading industrial seminars, automation exhibitions, and packaging events across Indonesia in 2026.',
  openGraph: {
    title: 'Events & Exhibitions 2026 | PT Dimensi Quantum Wahyudi',
    description: 'Join PT Dimensi Quantum Wahyudi at leading industrial seminars, automation exhibitions, and packaging events across Indonesia in 2026.',
    url: 'https://dimensiwahyudi.com/events',
    siteName: 'PT Dimensi Quantum Wahyudi',
    locale: 'en_ID',
    type: 'website',
  },
  alternates: { canonical: 'https://dimensiwahyudi.com/events' },
};

export default function EventsPage() {
  const now = new Date();

  const eventsSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: eventsData.map((ev, index) => {
      const targetEndStr = ('endDateRaw' in ev && ev.endDateRaw) ? ev.endDateRaw : ev.dateRaw;
      const isPast = now > new Date(`${targetEndStr}T23:59:59+07:00`);
      const isClosed = ev.status === 'closed' || isPast;

      return {
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Event',
          name: ev.title,
          description: ev.description,
          startDate: ev.dateRaw,
          endDate: targetEndStr,
          eventStatus: isClosed ? 'https://schema.org/EventCancelled' : 'https://schema.org/EventScheduled',
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
          location: {
            '@type': 'Place',
            name: ev.location,
            address: {
              '@type': 'PostalAddress',
              addressLocality: ev.location.split(',')[1]?.trim() || ev.location,
              addressCountry: 'ID',
            },
          },
          image: ev.image.startsWith('http') ? ev.image : `https://dimensiwahyudi.com${ev.image}`,
          organizer: {
            '@type': 'Organization',
            name: 'PT Dimensi Quantum Wahyudi',
            url: 'https://dimensiwahyudi.com',
          },
        },
      };
    }),
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-[#005596] selection:text-white relative overflow-hidden pt-28 md:pt-36 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsSchema) }}
      />
      <div
        className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="absolute top-20 left-1/4 w-[600px] h-[380px] bg-[#005596]/5 rounded-full blur-[150px] pointer-events-none -z-0" aria-hidden="true" />
      <div className="absolute top-[700px] right-1/4 w-[500px] h-[340px] bg-[#005596]/4 rounded-full blur-[140px] pointer-events-none -z-0" aria-hidden="true" />

      <EventsClient />
    </main>
  );
}
