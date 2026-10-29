'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import eventsData from '../../data/events.json';
import { useLanguage } from '@/components/LanguageProvider';

const EVENTS_ID_MAP: Record<
  string,
  {
    dateId: string;
    locationCityId: string;
    descriptionId: string;
    statusLabelId: string;
  }
> = {
  'schmalz-fanuc': {
    dateId: 'Selasa, 28 Juli 2026',
    locationCityId: 'Cikarang, Jawa Barat',
    descriptionId:
      'Meningkatkan Presisi, Efisiensi, dan Produktivitas Manufaktur Modern dengan sistem Vacuum Handling dan integrasi robotika.',
    statusLabelId: 'Pendaftaran Ditutup',
  },
  'manufacturing-batam': {
    dateId: '29 Sept - 1 Okt 2026',
    locationCityId: 'Batam, Kepulauan Riau',
    descriptionId:
      'Pameran industri manufaktur utama di kawasan Batam. Kunjungi booth kami untuk berkonsultasi mengenai sistem Vacuum Tube Lifter dan Jib Crane.',
    statusLabelId: 'Acara Selesai',
  },
  'allpack-jakarta': {
    dateId: '20 - 23 Oktober 2026',
    locationCityId: 'Jakarta (JIExpo Kemayoran)',
    descriptionId:
      'Pameran teknologi pengemasan, pemrosesan, otomasi, dan material handling di Indonesia. Lihat demonstrasi langsung Vacuum Lifter dan komponen vakum Schmalz.',
    statusLabelId: 'Akan Datang',
  },
};

export default function EventsClient() {
  const { lang } = useLanguage();
  const isId = lang === 'id';
  const now = new Date();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-[#005596]/15 shadow-[0_2px_10px_rgba(0,85,150,0.06)] mb-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#005596]">
            {isId ? 'PAMERAN & SEMINAR INDUSTRI 2026' : '2026 INDUSTRIAL EXHIBITIONS & SEMINARS'}
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-4 leading-[1.15]">
          {isId ? 'Agenda Pameran & ' : 'Industrial Events & '}
          <span className="bg-gradient-to-r from-[#005596] to-[#1d4ed8] bg-clip-text text-transparent">
            {isId ? 'Seminar Industri' : 'Exhibitions'}
          </span>
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          {isId
            ? 'Temui langsung tim engineer aplikasi kami untuk mengevaluasi sistem Vacuum Handling, lifter stasiun kerja ergonomis, dan End-of-Arm Tooling robotik di berbagai pameran manufaktur utama.'
            : 'Meet our engineering team to evaluate vacuum handling systems, ergonomic workstation lifters, and robotic tooling at premier manufacturing industry events.'}
        </p>
      </div>

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {eventsData.map((event) => {
          const targetEndDateStr = 'endDateRaw' in event && event.endDateRaw ? event.endDateRaw : event.dateRaw;
          const eventEndDate = new Date(`${targetEndDateStr}T23:59:59+07:00`);
          const isAutoExpired = now > eventEndDate;
          const isClosed = event.status === 'closed' || isAutoExpired;

          const idMeta = EVENTS_ID_MAP[event.id];
          const displayDate = isId && idMeta ? idMeta.dateId : event.date;
          const displayCity = isId && idMeta ? idMeta.locationCityId : event.locationCity;
          const displayDesc = isId && idMeta ? idMeta.descriptionId : event.description;

          const displayLabel = isClosed
            ? event.status === 'closed' && event.statusLabel
              ? isId && idMeta
                ? idMeta.statusLabelId
                : event.statusLabel
              : isId
              ? 'Acara Selesai'
              : 'Event Ended'
            : isId && idMeta
            ? idMeta.statusLabelId
            : event.statusLabel;

          return (
            <div
              key={event.id}
              className="bg-white/85 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_12px_36px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] overflow-hidden hover:-translate-y-1.5 hover:shadow-xl hover:ring-[#005596]/25 transition-all duration-300 flex flex-col group"
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
                <span
                  className={`absolute top-4 right-4 text-xs font-bold px-3 py-1.5 rounded-full shadow-md ${
                    isClosed
                      ? 'bg-slate-900/75 backdrop-blur-md text-slate-200 border border-white/10'
                      : 'bg-[#005596]/90 backdrop-blur-md text-white border border-white/20'
                  }`}
                >
                  {displayLabel}
                </span>
              </div>

              {/* Event Details */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 group-hover:text-[#005596] transition-colors line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-3 mb-6">{displayDesc}</p>
                </div>

                {/* Meta & Button */}
                <div>
                  <div className="border-t border-slate-100 pt-4 mb-4 space-y-2">
                    <div className="flex items-center gap-2.5 text-sm text-slate-600">
                      <Calendar size={16} className="text-[#005596] shrink-0" />
                      <span>{displayDate}</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-sm text-slate-600">
                      <MapPin size={16} className="text-[#005596] shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{displayCity}</span>
                    </div>
                  </div>

                  <Link
                    href={event.link}
                    className={`w-full inline-flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold transition-all ${
                      isClosed
                        ? 'bg-slate-100 border border-slate-200/80 text-slate-600 hover:bg-slate-200'
                        : 'bg-[#005596] hover:bg-[#004276] text-white shadow-[0_4px_16px_rgba(0,85,150,0.25)] hover:shadow-[0_8px_24px_rgba(0,85,150,0.35)]'
                    }`}
                  >
                    <span>
                      {isClosed
                        ? isId
                          ? 'Lihat Detail'
                          : 'View Details'
                        : isId
                        ? 'Detail & Pendaftaran'
                        : 'Details & Registration'}
                    </span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
