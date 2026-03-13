import { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, MapPin, Clock, ChevronRight, Send, ArrowRight, Zap, Target, Users } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Careers | Join PT Dimensi Quantum Wahyudi',
    description: 'Join PT Dimensi Quantum Wahyudi. We are looking for engineers, sales professionals, and technical specialists passionate about industrial material handling and automation.',
    keywords: ['PT Dimensi Quantum Wahyudi careers', 'material handling careers', 'engineering jobs Bekasi', 'industrial automation careers'],
    openGraph: {
        title: 'Careers at PT Dimensi Quantum Wahyudi',
        description: 'Build your career with a team delivering market-leading material handling and automation solutions.',
        url: 'https://dimensiwahyudi.com/career',
    },
    alternates: { canonical: 'https://dimensiwahyudi.com/career' },
};

const openings = [
    {
        title: 'Technical Sales Engineer',
        type: 'Full Time',
        location: 'Bekasi, West Java',
        desc: 'Present technical solutions to industrial clients, analyze material handling requirements, and build long-term business relationships.',
        requirements: ['Bachelor\'s degree in Mechanical, Industrial, or Electrical Engineering', '2+ years in industrial sales', 'Strong technical presentation skills', 'Own transportation preferred'],
        icon: Target,
        color: 'blue'
    },
    {
        title: 'Field Service Technician',
        type: 'Full Time',
        location: 'Bekasi (client-site mobility)',
        desc: 'Handle installation, commissioning, and scheduled maintenance of vacuum and lifting systems at client facilities across Java.',
        requirements: ['Diploma or Bachelor\'s in Mechanical or Electrical Engineering', 'Experience maintaining industrial equipment', 'Willing to travel to client sites', 'Valid driving license'],
        icon: Zap,
        color: 'amber'
    },
    {
        title: 'Application Engineer',
        type: 'Full Time',
        location: 'Bekasi, West Java',
        desc: 'Analyze client technical requirements, design fit-for-purpose vacuum and lifting systems, and support sales with accurate engineering calculations.',
        requirements: ['Bachelor\'s degree in Mechanical or Industrial Engineering', 'Familiar with AutoCAD or SolidWorks', 'Strong analytical and problem-solving skills', '1+ year of engineering experience'],
        icon: Users,
        color: 'emerald'
    },
];

const benefits = [
    'Competitive Salary & Incentive Package',
    'Comprehensive Health Coverage',
    'Principal Training Programs (Germany/Sweden)',
    'Complete Work Equipment (Laptop & Tools)',
    'Innovative and Supportive Work Culture',
    'Structured Career Growth Path',
];

export default async function CareerPage() {
    const copy = {
        badge: 'Careers & Opportunities',
        hero1: 'Shape the Future of',
        hero2: 'Industrial Automation',
        heroDesc: 'PT Dimensi Quantum Wahyudi is where top engineering talent meets world-class lifting technology. Build ergonomic solutions that transform how industries work.',
        benefitsTitle: 'Benefits & Value',
        openTitle: 'Open Positions',
        openSubtitle: 'Find Your Role',
        openDesc: 'All positions are based at our Bekasi headquarters with mobility requirements depending on the role.',
        keyReq: 'Key Requirements',
        apply: 'Apply Now',
        ctaTitle: 'Still Looking for the Right Role?',
        ctaDesc: 'We are always looking for great thinkers and problem-solvers. Send your CV and tell us how you can create impact at DQW.',
    };
    return (
        <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-500 selection:text-white">

            {/* HERO SECTION - Futuristic Light Pattern */}
            <section className="relative pt-40 pb-24 bg-white overflow-hidden border-b border-slate-200">
                {/* Background Tech Grid */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

                {/* Glowing Orbs */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-50 rounded-full blur-[120px] -z-10 opacity-70" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-cyan-50 rounded-full blur-[100px] -z-10 opacity-50" />

                <div className="relative max-w-5xl mx-auto px-6 text-center z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-xs font-bold uppercase tracking-widest mb-8 shadow-sm">
                        <Briefcase size={14} /> {copy.badge}
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight tracking-tight mb-8">
                        {copy.hero1} <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                            {copy.hero2}
                        </span>
                    </h1>

                    <p className="text-slate-600 text-xl max-w-3xl mx-auto leading-relaxed font-medium">
                        {copy.heroDesc}
                    </p>
                </div>
            </section>

            {/* BENEFITS SECTION - Modern Grid */}
            <section className="py-24 relative overflow-hidden bg-slate-950">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-luminosity"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/90 to-slate-950"></div>

                <div className="relative z-10 max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{copy.benefitsTitle}</h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {benefits.map((b, i) => (
                            <div key={i} className="group relative bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-6 hover:bg-slate-800/80 transition-all duration-300 hover:-translate-y-1 hover:border-slate-700">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl"></div>
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 mt-1">
                                        <ChevronRight size={16} className="text-cyan-400" />
                                    </div>
                                    <span className="text-slate-200 text-lg font-medium leading-tight">{b}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* JOB OPENINGS - Advanced Glass Cards */}
            <section className="py-32 relative">
                <div className="max-w-5xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-20">
                        <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">{copy.openTitle}</span>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">{copy.openSubtitle}</h2>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto">{copy.openDesc}</p>
                    </div>

                    <div className="space-y-8">
                        {openings.map((job, i) => {
                            const Icon = job.icon;
                            // Dynamic color mapping for Tailwind class safely
                            const colorMap: Record<string, { bg: string, text: string, border: string, hoverBorder: string, glow: string }> = {
                                blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100', hoverBorder: 'group-hover:border-blue-300', glow: 'shadow-blue-500/20' },
                                amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100', hoverBorder: 'group-hover:border-amber-300', glow: 'shadow-amber-500/20' },
                                emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', hoverBorder: 'group-hover:border-emerald-300', glow: 'shadow-emerald-500/20' },
                            };
                            const styling = colorMap[job.color] || colorMap.blue;

                            return (
                                <div key={i} className={`group bg-white rounded-[2rem] border border-slate-200 p-8 md:p-10 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 relative overflow-hidden`}>

                                    {/* Accent Gradient Line */}
                                    <div className={`absolute top-0 left-0 w-2 h-full bg-slate-200 ${styling.bg.replace('bg-', 'bg-').replace('50', '400')} transition-colors duration-500`}></div>

                                    <div className="pl-6 md:pl-8">
                                        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-8">

                                            {/* Header Left */}
                                            <div className="flex items-start gap-6">
                                                <div className={`w-16 h-16 rounded-2xl ${styling.bg} ${styling.text} border ${styling.border} flex items-center justify-center shrink-0 shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3`}>
                                                    <Icon size={28} />
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{job.title}</h3>
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

                                            {/* Apply Button Desktop */}
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

                                        {/* Apply Button Mobile */}
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

            {/* GENERAL APPLICATION CTA - Modern Box */}
            <section className="py-24 bg-white border-t border-slate-200">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-[3rem] p-10 md:p-16 text-center shadow-2xl shadow-blue-100/50 relative overflow-hidden">

                        {/* Decorative background elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full opacity-50 blur-[80px] -z-10 translate-x-1/2 -translate-y-1/2"></div>

                        <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-blue-100 flex items-center justify-center mx-auto mb-8 relative z-10">
                            <Send size={32} className="text-blue-600" />
                        </div>

                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 relative z-10">{copy.ctaTitle}</h2>
                        <p className="text-slate-600 text-lg mb-10 max-w-2xl mx-auto relative z-10">
                            {copy.ctaDesc}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                            <a
                                href="mailto:marketing@dimensiwahyudi.com?subject=Spontaneous Application — PT Dimensi Quantum Wahyudi"
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-xl shadow-blue-600/30 hover:-translate-y-1"
                            >
                                Submit Spontaneous Application
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
