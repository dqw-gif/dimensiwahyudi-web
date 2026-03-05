"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight, Newspaper, Activity, Filter, ChevronRight } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import type { PostSummary } from '../../types/wordpress';

interface NewsGridProps {
    posts: PostSummary[];
}

// Framer Motion Variants
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring" as const,
            stiffness: 100,
            damping: 20
        }
    }
};

export default function NewsGrid({ posts }: NewsGridProps) {
    const [filter, setFilter] = useState('All');

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    // Dynamically extract all unique category names from the given posts
    const FILTER_CATEGORIES = useMemo(() => {
        const categoriesSet = new Set<string>();
        posts.forEach(post => {
            if (post.categories?.nodes) {
                post.categories.nodes.forEach(cat => {
                    if (cat.name) categoriesSet.add(cat.name);
                });
            }
        });
        // Convert to array and sort alphabetically
        const uniqueCategories = Array.from(categoriesSet).sort();
        // Always prepend 'All' at the beginning
        return ['All', ...uniqueCategories];
    }, [posts]);

    // Fix 5: Filter benar-benar berfungsi sekarang
    const filteredPosts = filter === 'All'
        ? posts
        : posts.filter((post) =>
            post.categories?.nodes.some(
                (cat) => cat.name.toLowerCase() === filter.toLowerCase()
            )
        );


    return (
        <>
            {/* Filter Tabs - Pill Style */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-2 mb-16 justify-center bg-white/50 backdrop-blur-sm p-2 rounded-full w-fit mx-auto border border-slate-200/60 shadow-sm"
            >
                {FILTER_CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 relative overflow-hidden
                    ${filter === cat
                                ? 'text-white shadow-lg shadow-blue-500/30'
                                : 'text-slate-500 hover:text-slate-800 hover:bg-white'
                            }`}
                    >
                        {filter === cat && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-blue-600 z-0"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10">{cat}</span>
                    </button>
                ))}
            </motion.div>

            {/* Posts Grid */}
            {filteredPosts.length > 0 ? (
                <motion.div
                    key={filter} // re-mount animation when filter changes
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[minmax(350px,auto)]"
                >
                    {/* Featured Post (Main) - Wide & Immersive */}
                    {filteredPosts[0] && (
                        <motion.article variants={itemVariants} key={filteredPosts[0].id} className="col-span-1 md:col-span-12 lg:col-span-8 bg-white rounded-[2.5rem] overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 group relative flex flex-col md:flex-row min-h-[500px] hover:shadow-[0_30px_60px_-15px_rgba(37,99,235,0.1)] transition-all duration-500">
                            {/* Image Section */}
                            <div className="relative w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
                                {filteredPosts[0].featuredImage ? (
                                    <Image
                                        src={filteredPosts[0].featuredImage.node.sourceUrl}
                                        alt={filteredPosts[0].title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300"><Activity size={64} /></div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>

                            <div className="relative p-8 md:p-12 flex flex-col justify-center w-full md:w-1/2">
                                <div className="flex items-center gap-3 text-blue-600 font-bold text-xs uppercase tracking-widest mb-4">
                                    {filteredPosts[0].categories?.nodes[0] && (
                                        <span className="bg-blue-50 px-3 py-1 rounded-full border border-blue-100 hover:bg-blue-100 transition-colors">
                                            {filteredPosts[0].categories.nodes[0].name}
                                        </span>
                                    )}
                                    <span className="text-slate-400">&bull;</span>
                                    <span className="text-slate-500 font-mono">{formatDate(filteredPosts[0].date)}</span>
                                </div>

                                <Link href={`/news/${filteredPosts[0].slug}`} className="group/title block mb-6">
                                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight group-hover/title:text-blue-600 transition-colors duration-300">
                                        {filteredPosts[0].title}
                                    </h2>
                                </Link>

                                <div className="text-slate-500 text-base leading-relaxed line-clamp-3 mb-8" dangerouslySetInnerHTML={{ __html: filteredPosts[0].excerpt || '' }} />

                                <div>
                                    <Link href={`/news/${filteredPosts[0].slug}`} className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full font-bold text-sm hover:bg-blue-600 transition-colors group/btn shadow-lg shadow-slate-900/20 hover:shadow-blue-600/30">
                                        Read Article <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </motion.article>
                    )}

                    {/* Sidebar / Secondary Posts */}
                    {filteredPosts.length > 1 && (
                        <div className="col-span-1 md:col-span-12 lg:col-span-4 flex flex-col gap-6">
                            {filteredPosts.slice(1, 3).map((post) => (
                                <motion.article variants={itemVariants} key={post.id} className="flex-1 bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:border-blue-100 transition-all duration-300 group flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="text-xs font-bold text-slate-400 font-mono flex items-center gap-2">
                                                <Calendar size={12} /> {formatDate(post.date)}
                                            </div>
                                            {post.categories?.nodes[0] && (
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 bg-blue-50 px-2 py-1 rounded-md">
                                                    {post.categories.nodes[0].name}
                                                </span>
                                            )}
                                        </div>
                                        <Link href={`/news/${post.slug}`}>
                                            <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                                                {post.title}
                                            </h3>
                                        </Link>
                                        <div className="text-slate-500 text-xs line-clamp-2 mb-4" dangerouslySetInnerHTML={{ __html: post.excerpt || '' }} />
                                    </div>
                                    <Link href={`/news/${post.slug}`} className="text-blue-600 text-xs font-bold uppercase tracking-widest flex items-center gap-1 group/link mt-auto">
                                        Read More <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </motion.article>
                            ))}
                        </div>
                    )}

                    {/* Grid Items (Remaining) */}
                    {filteredPosts.slice(3).map((post) => (
                        <motion.article
                            variants={itemVariants}
                            key={post.id}
                            className="col-span-1 md:col-span-6 lg:col-span-4 bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full"
                        >
                            <Link href={`/news/${post.slug}`} className="relative h-56 overflow-hidden block">
                                {post.featuredImage ? (
                                    <Image src={post.featuredImage.node.sourceUrl} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                ) : <div className="w-full h-full bg-slate-50 flex items-center justify-center text-slate-300"><Newspaper size={32} /></div>}
                                <div className="absolute top-4 left-4">
                                    {post.categories?.nodes[0] && (
                                        <span className="bg-white/90 backdrop-blur-sm text-slate-900 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                                            {post.categories.nodes[0].name}
                                        </span>
                                    )}
                                </div>
                            </Link>

                            <div className="p-8 flex flex-col flex-1">
                                <div className="flex items-center gap-2 text-slate-400 text-xs font-mono mb-3">
                                    <Calendar size={12} />{formatDate(post.date)}
                                </div>

                                <Link href={`/news/${post.slug}`} className="block mb-3">
                                    <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                                        {post.title}
                                    </h3>
                                </Link>

                                <div className="text-slate-500 text-sm line-clamp-2 mb-6 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.excerpt || '' }} />

                                <div className="mt-auto pt-6 border-t border-slate-50 flex justify-between items-center w-full">
                                    <Link href={`/news/${post.slug}`} className="text-xs font-bold text-slate-900 uppercase tracking-widest hover:text-blue-600 transition-colors flex items-center gap-2 group/btn">
                                        Read Article <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            ) : (
                <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-200 shadow-sm">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                        <Filter size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">No Articles Found</h3>
                    <p className="text-slate-500 max-w-md mx-auto">
                        Tidak ada artikel dalam kategori &ldquo;{filter}&rdquo;. Coba pilih kategori lain.
                    </p>
                </div>
            )}
        </>
    );
}
