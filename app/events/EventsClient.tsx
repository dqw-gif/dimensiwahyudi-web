'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, ArrowRight, Play, X, ExternalLink, Video } from 'lucide-react';
import eventsData from '../../data/events.json';
import { useLanguage } from '@/components/LanguageProvider';
import PreFooterCTA from '@/components/PreFooterCTA';

interface EventItem {
  id: string;
  title: string;
  date: string;
  dateRaw: string;
  endDateRaw: string;
  location: string;
  locationCity: string;
  description: string;
  status: string;
  statusLabel: string;
  link: string;
  image: string;
  videoLoop?: string;
  videoFull?: string;
  videoPoster?: string;
  instagramUrl?: string;
}

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
    statusLabelId: 'Acara Selesai',
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
    statusLabelId: 'Acara Selesai',
  },
};

export default function EventsClient() {
  const { lang } = useLanguage();
  const isId = lang === 'id';
  const [selectedVideo, setSelectedVideo] = useState<EventItem | null>(null);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-[#005596]/15 shadow-[0_2px_10px_rgba(0,85,150,0.06)] mb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#005596]">
              {isId ? 'KILAS BALIK & DOKUMENTASI ACARA 2026' : '2026 EVENT RECAPS & VIDEO HIGHLIGHTS'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-4 leading-[1.15]">
            {isId ? 'Dokumentasi Pameran & ' : 'Exhibition Highlights & '}
            <span className="bg-gradient-to-r from-[#005596] to-[#1d4ed8] bg-clip-text text-transparent">
              {isId ? 'Seminar Industri' : 'Live Recaps'}
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {isId
              ? 'Tonton kilas balik rekaman pameran dan seminar teknik kami. Lihat demonstrasi langsung sistem Vacuum Handling Schmalz, lifter ergonomis, dan solusi otomasi di berbagai event manufaktur terkemuka.'
              : 'Watch live recaps of our industrial exhibitions and technical seminars. Discover real-world demonstrations of Schmalz vacuum systems, ergonomic lifters, and robotic tooling.'}
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(eventsData as EventItem[]).map((event) => {
            const idMeta = EVENTS_ID_MAP[event.id];
            const displayDate = isId && idMeta ? idMeta.dateId : event.date;
            const displayCity = isId && idMeta ? idMeta.locationCityId : event.locationCity;
            const displayDesc = isId && idMeta ? idMeta.descriptionId : event.description;
            const displayLabel = isId ? 'Acara Selesai' : 'Event Ended';

            return (
              <div
                key={event.id}
                className="bg-white/85 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_12px_36px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] overflow-hidden hover:-translate-y-1.5 hover:shadow-xl hover:ring-[#005596]/25 transition-all duration-300 flex flex-col group"
              >
                {/* Event Video / Thumbnail Banner */}
                <div className="relative h-56 w-full bg-slate-950 overflow-hidden">
                  {event.videoLoop ? (
                    <video
                      src={event.videoLoop}
                      poster={event.videoPoster || event.image}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    // Fallback to static image if videoLoop is unavailable
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}

                  {/* Dark gradient overlay on hover */}
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors duration-300 pointer-events-none" />

                  {/* Center Floating Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <button
                      type="button"
                      onClick={() => setSelectedVideo(event)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 hover:bg-white text-slate-900 shadow-xl backdrop-blur-md border border-white/80 group-hover:scale-105 group-hover:shadow-[0_8px_24px_rgba(0,85,150,0.35)] transition-all duration-300"
                      aria-label={`Tonton video ${event.title}`}
                    >
                      <div className="w-6 h-6 rounded-full bg-[#005596] text-white flex items-center justify-center pl-0.5">
                        <Play size={12} fill="currentColor" />
                      </div>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                        {isId ? 'Tonton Video' : 'Watch Reel'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2.5 group-hover:text-[#005596] transition-colors line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-3 mb-6 leading-relaxed">
                      {displayDesc}
                    </p>
                  </div>

                  {/* Meta & Button */}
                  <div>
                    <div className="border-t border-slate-100 pt-4 mb-4 space-y-2">
                      <div className="flex items-center gap-2.5 text-sm text-slate-600">
                        <Calendar size={16} className="text-[#005596] shrink-0" />
                        <span className="font-medium">{displayDate}</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-sm text-slate-600">
                        <MapPin size={16} className="text-[#005596] shrink-0 mt-0.5" />
                        <span className="line-clamp-1 font-medium">{displayCity}</span>
                      </div>
                    </div>

                    <Link
                      href={event.link}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold transition-all bg-slate-100 border border-slate-200/80 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                    >
                      <span>
                        {isId ? 'Lihat Detail' : 'View Details'}
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

      {/* Video Modal / Lightbox Player */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10 text-white flex flex-col animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/90">
              <div className="pr-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-sky-400">
                  {isId ? 'DOKUMENTASI REEL RESMI' : 'OFFICIAL EVENT REEL'}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white truncate">
                  {selectedVideo.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedVideo(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0"
                aria-label="Tutup"
              >
                <X size={18} />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative bg-black flex items-center justify-center aspect-video sm:max-h-[60vh]">
              <video
                src={selectedVideo.videoFull || selectedVideo.videoLoop}
                poster={selectedVideo.videoPoster}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-white/10 bg-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-slate-400 text-center sm:text-left">
                {selectedVideo.location} · {selectedVideo.date}
              </span>
              <div className="flex items-center gap-2">
                {selectedVideo.instagramUrl && (
                  <a
                    href={selectedVideo.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono font-bold text-[11px] uppercase tracking-wider transition-colors"
                  >
                    <span>Instagram Reel</span>
                    <ExternalLink size={12} />
                  </a>
                )}
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#005596] hover:bg-[#004276] text-white font-bold text-[11px] transition-colors shadow-sm"
                >
                  <span>{isId ? 'Konsultasi Unit' : 'Consult Solution'}</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PreFooterCTA: Standar Penutup Halaman */}
      <PreFooterCTA
        badge={isId ? 'DOKUMENTASI PAMERAN & DEMO AKTUAL' : 'EXHIBITION RECAP & LIVE DEMOS'}
        title={
          isId ? (
            <>
              Tertarik Mencoba Unit Demo yang Tampil di Pameran? <br className="hidden sm:inline" />
              Jadwalkan Sesi Trial Khusus untuk Pabrik Anda.
            </>
          ) : (
            <>
              Interested in the Demo Units Featured at Our Events? <br className="hidden sm:inline" />
              Schedule an Exclusive Trial Session for Your Plant.
            </>
          )
        }
        description={
          isId
            ? 'Seluruh sistem vacuum handling Schmalz dan lifter Binar yang kami demokan di pameran tersedia di technical workshop kami di Cikarang. Anda dapat mengirimkan sampel workpiece untuk uji angkat langsung.'
            : 'All Schmalz vacuum handling systems and Binar lifters showcased at our events are available at our technical workshop in Cikarang. Send your workpiece samples for live testing.'
        }
        primaryBtnText={isId ? 'Jadwalkan Trial Workpiece' : 'Schedule Workpiece Trial'}
        primaryBtnHref="/contact"
        secondaryBtnText={isId ? 'Konsultasi WhatsApp Tim Sales' : 'Chat with Sales Engineers'}
        secondaryBtnHref="https://wa.me/6281119168752?text=Halo%20DQW,%20saya%20melihat%20dokumentasi%20video%20event%20pameran%20dan%20ingin%20jadwalkan%20trial%20demo%20unit"
      />
    </>
  );
}
