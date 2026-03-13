'use client';

import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
    {
        quote: 'We now use JumboFlex from PT Dimensi Quantum Wahyudi in our receiving process. It has made heavy lifting much safer and easier for our team, with a clear improvement in operator ergonomics. Beyond the equipment itself, DQW delivered excellent technical guidance during the trial and strong after-sales support. We look forward to expanding similar solutions across our operations.',
        name: 'Abdullah Mubarok',
        title: 'Receiving Team',
        company: 'PT Toyota Astra Motor',
        industry: 'Automotive',
        metric: '0 lifting injuries in 3 months',
        photo: 'https://i.imgur.com/kTWFvvP.png',
    },
    {
        quote: 'We adopted Schmalz vacuum lifters based on guidance from our Italian headquarters, and PT Dimensi Quantum Wahyudi has been a highly reliable local partner. Their technical support is clear, responsive, and collaborative. Commercially, the proposal offered strong value, and operationally the solution has improved both safety and ergonomics. Installation was smooth from start to finish.',
        name: 'Anang Wahyudi',
        title: 'Project Procurement',
        company: 'PT Evoluzione Tyres',
        industry: 'Tire & Automotive',
        metric: '+40% handling speed',
        photo: 'https://i.imgur.com/2WEnjnU.png',
    },
    {
        quote: 'The vacuum lifting solution from PT Dimensi Quantum Wahyudi has helped us significantly reduce work-related strain. Our operators used to handle loads between 20 and 100 kg manually every day. With this setup, heavy tasks are now much safer and more manageable. Their team is also very responsive, often supporting us on the same day.',
        name: 'Ibnu Abilbari',
        title: 'Industrial Engineering',
        company: 'PT Gajah Tunggal',
        industry: 'Tire & Automotive',
        metric: 'Installed in 2 weeks',
        photo: 'https://i.imgur.com/9pAhEE5.png',
    },
];

const industries = ['Automotive', 'Packaging', 'FMCG', 'Pharmaceutical', 'Logistics', 'Steel & Metal', 'Electronics', 'Chemical'];

export default function TestimonialsSection() {
    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Subtle grid */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

            {/* Glow top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-blue-500 font-bold tracking-wider text-sm uppercase">Success Stories from the Factory Floor</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-6">Real Results from <span className="text-cyan-400">Automation Transformation</span></h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Hear directly from manufacturing leaders on how our <em>vacuum handling</em> solutions improve productivity while supporting safer, low-risk operations on the production floor.
                    </p>
                </motion.div>

                {/* Testimonial Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.12 }}
                            className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-7 flex flex-col gap-5 hover:bg-white/8 hover:border-blue-500/30 transition-all duration-300"
                        >
                            {/* Stars */}
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, s) => (
                                    <Star key={s} size={14} className="fill-amber-400 text-amber-400" />
                                ))}
                            </div>

                            {/* Quote mark */}
                            <Quote size={28} className="text-blue-400/40" />

                            {/* Quote text */}
                            <p className="text-slate-300 text-sm leading-relaxed flex-1 italic">
                                &ldquo;{t.quote}&rdquo;
                            </p>

                            {/* Metric badge */}
                            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1.5 w-fit">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                                <span className="text-cyan-300 text-xs font-bold">{t.metric}</span>
                            </div>

                            {/* Author */}
                            <div className="border-t border-white/10 pt-5 flex items-center gap-4">
                                {t.photo ? (
                                    <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                                        <Image src={t.photo} alt={t.name} fill className="object-cover" />
                                    </div>
                                ) : (
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-black text-xl shrink-0 border-2 border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                                        {t.name.charAt(0)}
                                    </div>
                                )}
                                <div>
                                    <p className="text-white font-bold text-base md:text-lg">{t.name}</p>
                                    <p className="text-slate-400 text-sm">{t.title}</p>
                                    <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mt-1">{t.company}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Industries served tags */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap justify-center gap-3 mt-12"
                >
                    <span className="text-slate-500 text-xs font-medium uppercase tracking-widest mr-2 self-center">Industries Served:</span>
                    {industries.map((ind) => (
                        <span key={ind} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-slate-400 text-xs">
                            {ind}
                        </span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
