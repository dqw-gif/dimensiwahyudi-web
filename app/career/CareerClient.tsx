'use client';

import { Briefcase, MapPin, Clock, ChevronRight, ArrowRight, Wrench, Target, Users } from 'lucide-react';
import { spacingTokens } from '../../constants/spacingTokens';
import PreFooterCTA from '../../components/PreFooterCTA';
import { useLanguage } from '@/components/LanguageProvider';

export default function CareerClient() {
  const { lang } = useLanguage();
  const isId = lang === 'id';

  const openings = isId
    ? [
        {
          title: 'Technical Sales Engineer',
          type: 'Full Time',
          location: 'Bekasi, Jawa Barat',
          desc: 'Mempresentasikan solusi teknis ke klien manufaktur B2B, menganalisis kebutuhan material handling di lapangan, dan membangun kemitraan jangka panjang.',
          requirements: [
            'S1 Teknik Mesin, Teknik Industri, atau Teknik Elektro',
            'Pengalaman minimal 2 tahun di penjualan teknis industri (B2B)',
            'Kemampuan presentasi dan komunikasi teknis yang kuat',
            'Memiliki kendaraan pribadi dan SIM A/C aktif',
          ],
          icon: Target,
          color: 'blue',
        },
        {
          title: 'Field Service Technician',
          type: 'Full Time',
          location: 'Bekasi (mobilitas ke pabrik klien)',
          desc: 'Menangani instalasi mekanikal/elektrikal, komisioning, serta jadwal preventive maintenance sistem Vacuum Lifter dan Crane di fasilitas klien se-Pulau Jawa.',
          requirements: [
            'D3/S1 Teknik Mesin, Mekatronika, atau Teknik Elektro',
            'Berpengalaman menangani perawatan mesin industri / sistem pneumatik',
            'Bersedia melakukan perjalanan dinas ke lokasi pabrik klien',
            'Memiliki SIM yang masih berlaku',
          ],
          icon: Wrench,
          color: 'amber',
        },
        {
          title: 'Application Engineer',
          type: 'Full Time',
          location: 'Bekasi, Jawa Barat',
          desc: 'Menganalisis spesifikasi beban kerja klien, merancang konfigurasi Vacuum Tube Lifter, VacuMaster, dan Jib Crane yang tepat guna, serta menyusun kalkulasi teknis.',
          requirements: [
            'S1 Teknik Mesin atau Teknik Industri',
            'Mahir menggunakan AutoCAD atau SolidWorks (2D/3D)',
            'Kemampuan analisis mekanika dan pemecahan masalah yang tajam',
            'Pengalaman minimal 1 tahun di bidang engineering manufaktur',
          ],
          icon: Users,
          color: 'emerald',
        },
      ]
    : [
        {
          title: 'Technical Sales Engineer',
          type: 'Full Time',
          location: 'Bekasi, West Java',
          desc: 'Present technical solutions to industrial clients, analyze material handling requirements, and build long-term business relationships.',
          requirements: [
            "Bachelor's degree in Mechanical, Industrial, or Electrical Engineering",
            '2+ years in industrial sales',
            'Strong technical presentation skills',
            'Own transportation preferred',
          ],
          icon: Target,
          color: 'blue',
        },
        {
          title: 'Field Service Technician',
          type: 'Full Time',
          location: 'Bekasi (client-site mobility)',
          desc: 'Handle installation, commissioning, and scheduled maintenance of vacuum and lifting systems at client facilities across Java.',
          requirements: [
            "Diploma or Bachelor's in Mechanical or Electrical Engineering",
            'Experience maintaining industrial equipment',
            'Willing to travel to client sites',
            'Valid driving license',
          ],
          icon: Wrench,
          color: 'amber',
        },
        {
          title: 'Application Engineer',
          type: 'Full Time',
          location: 'Bekasi, West Java',
          desc: 'Analyze client technical requirements, design fit-for-purpose vacuum and lifting systems, and support sales with accurate engineering calculations.',
          requirements: [
            "Bachelor's degree in Mechanical or Industrial Engineering",
            'Familiar with AutoCAD or SolidWorks',
            'Strong analytical and problem-solving skills',
            '1+ year of engineering experience',
          ],
          icon: Users,
          color: 'emerald',
        },
      ];

  const benefits = isId
    ? [
        'Gaji Kompetitif & Skema Insentif Kinerja',
        'Jaminan Kesehatan & BPJS Lengkap',
        'Program Pelatihan Prinsipal (Jerman / Swedia)',
        'Fasilitas Kerja Lengkap (Laptop & Peralatan Teknis)',
        'Budaya Kerja Kolaboratif Berbasis Engineering',
        'Jenjang Karier & Pengembangan Kompetensi Jelas',
      ]
    : [
        'Competitive Salary & Incentive Package',
        'Comprehensive Health Coverage',
        'Principal Training Programs (Germany/Sweden)',
        'Complete Work Equipment (Laptop & Tools)',
        'Innovative and Supportive Work Culture',
        'Structured Career Growth Path',
      ];

  const copy = isId
    ? {
        badge: 'Karier & Peluang Berkembang',
        hero1: 'Bangun Masa Depan',
        hero2: 'Otomasi Industri Indonesia',
        heroDesc:
          'PT Dimensi Quantum Wahyudi mempertemukan talenta teknik terbaik dengan teknologi Vacuum Handling dan Ergonomic Lifter kelas dunia. Mari rancang solusi yang mengubah cara kerja industri manufaktur.',
        benefitsTitle: 'Keunggulan & Fasilitas Kerja',
        openTitle: 'Posisi Tersedia',
        openSubtitle: 'Temukan Peran Terbaik Anda',
        openDesc:
          'Seluruh posisi berbasis di kantor pusat & workshop Bekasi dengan mobilitas kunjungan ke kawasan industri sesuai peran.',
        keyReq: 'Kualifikasi Utama',
        apply: 'Lamar Sekarang',
        ctaBadge: 'BERGABUNG BERSAMA KAMI',
        ctaTitle: 'Belum Menemukan Posisi yang Sesuai?',
        ctaDesc:
          'Kami selalu terbuka bagi engineer dan praktisi industri berbakat. Kirimkan CV terbaru Anda dan ceritakan bagaimana Anda dapat berkontribusi di DQW.',
        primaryBtn: 'Kirim Lamaran Terbuka',
        secondaryBtn: 'Hubungi HR via WhatsApp',
      }
    : {
        badge: 'Careers & Opportunities',
        hero1: 'Shape the Future of',
        hero2: 'Industrial Automation',
        heroDesc:
          'PT Dimensi Quantum Wahyudi is where top engineering talent meets world-class lifting technology. Build ergonomic solutions that transform how industries work.',
        benefitsTitle: 'Benefits & Value',
        openTitle: 'Open Positions',
        openSubtitle: 'Find Your Role',
        openDesc:
          'All positions are based at our Bekasi headquarters with mobility requirements depending on the role.',
        keyReq: 'Key Requirements',
        apply: 'Apply Now',
        ctaBadge: 'JOIN OUR TALENT POOL',
        ctaTitle: 'Still Looking for the Right Role?',
        ctaDesc:
          'We are always looking for great thinkers and problem-solvers. Send your CV and tell us how you can create impact at DQW.',
        primaryBtn: 'Submit Spontaneous Application',
        secondaryBtn: 'Chat with HR via WhatsApp',
      };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-500 selection:text-white">
      {/* HERO SECTION */}
      <section className={`relative ${spacingTokens.hero.tall} bg-white overflow-hidden border-b border-slate-200`}>
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-50 rounded-full blur-[120px] -z-10 opacity-70" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-cyan-50 rounded-full blur-[100px] -z-10 opacity-50" />

        <div className={`${spacingTokens.page.containerMedium} relative text-center z-10`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-xs font-bold uppercase tracking-widest mb-8 shadow-sm">
            <Briefcase size={14} /> {copy.badge}
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight tracking-tight mb-8">
            {copy.hero1} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005596] to-sky-600">
              {copy.hero2}
            </span>
          </h1>

          <p className="text-slate-600 text-xl max-w-3xl mx-auto leading-relaxed font-medium">
            {copy.heroDesc}
          </p>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className={`${spacingTokens.section.spacious} relative overflow-hidden bg-slate-950`}>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-luminosity"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/90 to-slate-950"></div>

        <div className={`${spacingTokens.page.containerNarrow} relative z-10`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{copy.benefitsTitle}</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#005596] to-sky-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="group relative bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-6 hover:bg-slate-800/80 transition-all duration-300 hover:-translate-y-1 hover:border-slate-700"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#005596] to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl"></div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 mt-1">
                    <ChevronRight size={16} className="text-blue-400" />
                  </div>
                  <span className="text-slate-200 text-lg font-medium leading-tight">{b}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOB OPENINGS */}
      <section className={`${spacingTokens.section.spacious} relative`}>
        <div className={`${spacingTokens.page.containerMedium} relative z-10`}>
          <div className="text-center mb-20">
            <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">
              {copy.openTitle}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">{copy.openSubtitle}</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">{copy.openDesc}</p>
          </div>

          <div className="space-y-8">
            {openings.map((job, i) => {
              const Icon = job.icon;
              const colorMap: Record<
                string,
                { bg: string; text: string; border: string; hoverBorder: string; glow: string }
              > = {
                blue: {
                  bg: 'bg-blue-50',
                  text: 'text-blue-600',
                  border: 'border-blue-100',
                  hoverBorder: 'group-hover:border-blue-300',
                  glow: 'shadow-blue-500/20',
                },
                amber: {
                  bg: 'bg-amber-50',
                  text: 'text-amber-600',
                  border: 'border-amber-100',
                  hoverBorder: 'group-hover:border-amber-300',
                  glow: 'shadow-amber-500/20',
                },
                emerald: {
                  bg: 'bg-emerald-50',
                  text: 'text-emerald-600',
                  border: 'border-emerald-100',
                  hoverBorder: 'group-hover:border-emerald-300',
                  glow: 'shadow-emerald-500/20',
                },
              };
              const styling = colorMap[job.color] || colorMap.blue;

              return (
                <div
                  key={i}
                  className="group bg-white rounded-[2rem] border border-slate-200 p-8 md:p-10 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 relative overflow-hidden"
                >
                  <div
                    className={`absolute top-0 left-0 w-2 h-full bg-slate-200 ${styling.bg
                      .replace('bg-', 'bg-')
                      .replace('50', '400')} transition-colors duration-500`}
                  ></div>

                  <div className="pl-6 md:pl-8">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-8">
                      <div className="flex items-start gap-6">
                        <div
                          className={`w-16 h-16 rounded-2xl ${styling.bg} ${styling.text} border ${styling.border} flex items-center justify-center shrink-0 shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3`}
                        >
                          <Icon size={28} />
                        </div>
                        <div>
                          <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                            {job.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-slate-600 text-sm font-bold">
                              <Clock size={14} /> {job.type}
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-slate-600 text-sm font-bold">
                              <MapPin size={14} /> {job.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      <a
                        href={`mailto:marketing@dimensiwahyudi.com?subject=Application: ${job.title}`}
                        className={`hidden lg:flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-xl transition-all duration-300 shadow-xl shadow-slate-900/20 hover:${styling.glow} hover:-translate-y-1 whitespace-nowrap`}
                      >
                        {copy.apply} <ArrowRight size={18} />
                      </a>
                    </div>

                    <p className="text-slate-600 text-lg leading-relaxed mb-8 max-w-4xl">{job.desc}</p>

                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                      <p className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                        {copy.keyReq}
                      </p>
                      <div className="grid md:grid-cols-2 gap-y-3 gap-x-8">
                        {job.requirements.map((req, j) => (
                          <div key={j} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-2" />
                            <span className="text-slate-600 font-medium">{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <a
                      href={`mailto:marketing@dimensiwahyudi.com?subject=Application: ${job.title}`}
                      className="mt-8 flex lg:hidden items-center justify-center gap-2 w-full py-4 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-xl transition-all"
                    >
                      {copy.apply} <ArrowRight size={18} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRE-FOOTER CTA */}
      <PreFooterCTA
        badge={copy.ctaBadge}
        title={copy.ctaTitle}
        description={copy.ctaDesc}
        primaryBtnText={copy.primaryBtn}
        primaryBtnHref="mailto:marketing@dimensiwahyudi.com?subject=Spontaneous%20Application%20-%20PT%20Dimensi%20Quantum%20Wahyudi"
        secondaryBtnText={copy.secondaryBtn}
        secondaryBtnHref="https://wa.me/6281119168752?text=Hello%20DQW,%20I%20would%20like%20to%20inquire%20about%20career%20opportunities%20at%20PT%20Dimensi%20Quantum%20Wahyudi"
      />
    </main>
  );
}
