import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import eventsData from '../../data/events.json';

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
  const eventsSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: eventsData.map((ev, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Event',
        name: ev.title,
        description: ev.description,
        startDate: ev.id === 'fanuc-schmalz-2026' ? '2026-03-12' : ev.id === 'mfg-indo-batam-2026' ? '2026-07-08' : '2026-10-07',
        endDate: ev.id === 'fanuc-schmalz-2026' ? '2026-03-12' : ev.id === 'mfg-indo-batam-2026' ? '2026-07-11' : '2026-10-10',
        eventStatus: ev.status === 'closed' ? 'https://schema.org/EventCancelled' : 'https://schema.org/EventScheduled',
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
    })),
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-cyan-500 selection:text-white relative pt-24 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsSchema) }}
      />
      {/* BACKGROUND GRID ACCENT */}
      <div
        className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-4">
            agenda acara 2026
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Industrial Events &{' '}
            <span className="text-cyan-600 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
              Exhibitions
            </span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Temukan kami dan konsultasikan langsung kebutuhan otomasi sistem vakum, penanganan ergonomis, serta kolaborasi robotik Anda di berbagai acara besar tahun ini.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventsData.map((event) => {
            const isClosed = event.status === 'closed';

            return (
              <div 
                key={event.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden hover:-translate-y-1.5 transition-all duration-300 flex flex-col group"
              >
                {/* Event Image Banner */}
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <Image 
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Status Badge */}
                  <span className={`absolute top-4 right-4 text-xs font-bold px-3 py-1.5 rounded-full shadow-md ${
                    isClosed 
                      ? 'bg-slate-100 text-slate-600' 
                      : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                  }`}>
                    {event.statusLabel}
                  </span>
                </div>

                {/* Event Details */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-cyan-600 transition-colors line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-3 mb-6">
                      {event.description}
                    </p>
                  </div>

                  {/* Meta & Button */}
                  <div>
                    <div className="border-t border-slate-100 pt-4 mb-4 space-y-2">
                      <div className="flex items-center gap-2.5 text-sm text-slate-600">
                        <Calendar size={16} className="text-cyan-600 shrink-0" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-sm text-slate-600">
                        <MapPin size={16} className="text-cyan-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{event.locationCity}</span>
                      </div>
                    </div>

                    <Link 
                      href={event.link}
                      className={`w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${
                        isClosed 
                          ? 'bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100' 
                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/10 hover:shadow-blue-500/30'
                      }`}
                    >
                      <span>{isClosed ? 'Lihat Informasi' : 'Info & Registrasi'}</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </main>
  );
}
