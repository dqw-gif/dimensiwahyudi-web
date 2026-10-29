"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight, Newspaper, Activity, Filter, ChevronRight, Search, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { sanitizeExcerptHtml } from '@/utils/sanitizeHtml';
import type { PostSummary } from '../../types/wordpress';
import { useLanguage } from '@/components/LanguageProvider';

interface NewsGridProps {
    posts: PostSummary[];
}

export default function NewsGrid({ posts }: NewsGridProps) {
    const { lang } = useLanguage();
    const isId = lang === 'id';

    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [visibleCount, setVisibleCount] = useState(12);

    const sanitizeExcerpt = (html: string) => sanitizeExcerptHtml(html);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString(isId ? 'id-ID' : 'en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    const FILTER_CATEGORIES = useMemo(() => {
        const categoriesSet = new Set<string>();
        posts.forEach((post) => {
            if (post.categories?.nodes) {
                post.categories.nodes.forEach((cat) => {
                    if (cat.name) categoriesSet.add(cat.name);
                });
            }
        });
        const uniqueCategories = Array.from(categoriesSet).sort();
        return ['All', ...uniqueCategories];
    }, [posts]);

    const handleFilterChange = (cat: string) => {
        setFilter(cat);
        setVisibleCount(12);
    };

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
        setVisibleCount(12);
    };

    const filteredPosts = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();

        return posts.filter((post) => {
            const matchesCategory =
                filter === 'All' ||
                post.categories?.nodes.some((cat) => cat.name.toLowerCase() === filter.toLowerCase());

            if (!matchesCategory) return false;
            if (!q) return true;

            const title = (post.title || '').toLowerCase();
            const excerpt = (post.excerpt || '').toLowerCase();
            return title.includes(q) || excerpt.includes(q);
        });
    }, [posts, filter, searchQuery]);

    const displayedPosts = filteredPosts.slice(0, visibleCount);

    const getPostImageUrl = (post: PostSummary): string => {
        if (!post.featuredImage) return '';
        if (typeof post.featuredImage === 'string') return post.featuredImage;
        const node = (post.featuredImage as { node?: { sourceUrl?: string } }).node;
        if (node?.sourceUrl) return node.sourceUrl;
        const direct = post.featuredImage as { sourceUrl?: string; url?: string };
        return direct?.sourceUrl || direct?.url || '';
    };

    const readArticleText = isId ? 'Baca Artikel' : 'Read Article';
    const readMoreText = isId ? 'Selengkapnya' : 'Read More';

    return (
        <>
            {/* Search Bar & Filter Controls */}
            <div className="mb-12 space-y-6">
                {/* Live Search Input */}
                <div className="relative max-w-xl mx-auto">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        placeholder={
                            isId
                                ? 'Cari artikel teknis: vacuum lifter, crane, suction cup, ergonomi...'
                                : 'Search technical articles: vacuum lifters, cranes, suction cups, ergonomics...'
                        }
                        className="w-full pl-11 pr-10 py-3 bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-full text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#005596] focus:ring-4 focus:ring-[#005596]/10 shadow-xs transition-all"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => handleSearchChange('')}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                            title={isId ? 'Hapus pencarian' : 'Clear search'}
                        >
                            <X size={15} />
                        </button>
                    )}
                </div>

                {/* Filter Tabs - Homepage Style Spring Capsule */}
                <div className="w-full overflow-x-auto no-scrollbar pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 flex justify-center">
                    <div className="inline-flex items-center p-1 sm:p-1.5 bg-white/80 backdrop-blur-2xl rounded-full border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_4px_20px_-4px_rgba(0,85,150,0.08)] whitespace-nowrap min-w-max">
                        {FILTER_CATEGORIES.map((cat) => {
                            const isActive = filter === cat;
                            const displayCat = cat === 'All' ? (isId ? 'Semua' : 'All') : cat;
                            return (
                                <button
                                    key={cat}
                                    onClick={() => handleFilterChange(cat)}
                                    type="button"
                                    className={`relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-colors duration-200 cursor-pointer shrink-0 ${
                                        isActive ? 'text-white' : 'text-slate-600 hover:text-[#005596]'
                                    }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeNewsCategoryPill"
                                            transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                                            className="absolute inset-0 bg-gradient-to-r from-[#005596] to-[#1d4ed8] rounded-full shadow-[0_4px_14px_rgba(29,78,216,0.35),inset_0_1px_0_0_rgba(255,255,255,0.25)]"
                                        />
                                    )}
                                    <span className="relative z-10">{displayCat}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Search / Filter Meta Summary */}
                <div className="text-center text-xs text-slate-400 font-semibold">
                    {isId ? (
                        <>
                            Menampilkan {displayedPosts.length} dari {filteredPosts.length} artikel teknis
                            {searchQuery && ` untuk "${searchQuery}"`}
                        </>
                    ) : (
                        <>
                            Showing {displayedPosts.length} of {filteredPosts.length} technical articles
                            {searchQuery && ` for "${searchQuery}"`}
                        </>
                    )}
                </div>
            </div>

            {/* Posts Grid */}
            {displayedPosts.length > 0 ? (
                <>
                    <div
                        key={`${filter}-${searchQuery}`}
                        className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[minmax(350px,auto)]"
                    >
                        {/* Featured Post (Main) - Wide & Immersive */}
                        {displayedPosts[0] && (
                            <motion.article
                                key={displayedPosts[0].slug || displayedPosts[0].id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, ease: 'easeOut' }}
                                className="col-span-1 md:col-span-12 lg:col-span-8 bg-white rounded-[2.5rem] overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 group relative flex flex-col md:flex-row min-h-[500px] hover:shadow-[0_30px_60px_-15px_rgba(0,85,150,0.12)] transition-all duration-500"
                            >
                                {/* Image Section */}
                                <div className="relative w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
                                    {getPostImageUrl(displayedPosts[0]) ? (
                                        <Image
                                            src={getPostImageUrl(displayedPosts[0])}
                                            alt={displayedPosts[0].title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                                            <Activity size={64} />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                </div>

                                <div className="relative p-8 md:p-12 flex flex-col justify-center w-full md:w-1/2">
                                    <div className="flex items-center gap-3 text-[#005596] font-bold text-xs uppercase tracking-widest mb-4">
                                        {displayedPosts[0].categories?.nodes[0] && (
                                            <span className="bg-blue-50 px-3 py-1 rounded-full border border-blue-100 hover:bg-blue-100 transition-colors">
                                                {displayedPosts[0].categories.nodes[0].name}
                                            </span>
                                        )}
                                        <span className="text-slate-400">&bull;</span>
                                        <span className="text-slate-500 font-mono">
                                            {formatDate(displayedPosts[0].date)}
                                        </span>
                                    </div>

                                    <Link href={`/news/${displayedPosts[0].slug}`} className="group/title block mb-6">
                                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight group-hover/title:text-[#005596] transition-colors duration-300">
                                            {displayedPosts[0].title}
                                        </h2>
                                    </Link>

                                    <div
                                        className="text-slate-500 text-base leading-relaxed line-clamp-3 mb-8"
                                        dangerouslySetInnerHTML={{
                                            __html: sanitizeExcerpt(displayedPosts[0].excerpt || ''),
                                        }}
                                    />

                                    <div>
                                        <Link
                                            href={`/news/${displayedPosts[0].slug}`}
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#005596] hover:bg-[#004276] text-white rounded-full font-bold text-sm transition-all group/btn shadow-md shadow-[#005596]/20 hover:shadow-lg hover:shadow-[#005596]/30"
                                        >
                                            {readArticleText}{' '}
                                            <ArrowRight
                                                size={16}
                                                className="group-hover/btn:translate-x-1 transition-transform"
                                            />
                                        </Link>
                                    </div>
                                </div>
                            </motion.article>
                        )}

                        {/* Sidebar / Secondary Posts */}
                        {displayedPosts.length > 1 && (
                            <div className="col-span-1 md:col-span-12 lg:col-span-4 flex flex-col gap-6">
                                {displayedPosts.slice(1, 3).map((post, idx) => (
                                    <motion.article
                                        key={post.slug || post.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: (idx + 1) * 0.1, ease: 'easeOut' }}
                                        className="flex-1 bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:border-[#005596]/20 transition-all duration-300 group flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="text-xs font-bold text-slate-400 font-mono flex items-center gap-2">
                                                    <Calendar size={12} /> {formatDate(post.date)}
                                                </div>
                                                {post.categories?.nodes[0] && (
                                                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#005596] bg-blue-50 px-2 py-1 rounded-md">
                                                        {post.categories.nodes[0].name}
                                                    </span>
                                                )}
                                            </div>
                                            <Link href={`/news/${post.slug}`}>
                                                <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-[#005596] transition-colors line-clamp-2">
                                                    {post.title}
                                                </h3>
                                            </Link>
                                            <div
                                                className="text-slate-500 text-xs line-clamp-2 mb-4"
                                                dangerouslySetInnerHTML={{
                                                    __html: sanitizeExcerpt(post.excerpt || ''),
                                                }}
                                            />
                                        </div>
                                        <Link
                                            href={`/news/${post.slug}`}
                                            className="text-[#005596] text-xs font-bold uppercase tracking-widest flex items-center gap-1 group/link mt-auto"
                                        >
                                            {readMoreText}{' '}
                                            <ChevronRight
                                                size={14}
                                                className="group-hover/link:translate-x-1 transition-transform"
                                            />
                                        </Link>
                                    </motion.article>
                                ))}
                            </div>
                        )}

                        {/* Grid Items (Remaining) */}
                        {displayedPosts.slice(3).map((post) => {
                            const imgUrl = getPostImageUrl(post);
                            return (
                                <motion.article
                                    key={post.slug || post.id}
                                    initial={{ opacity: 1 }}
                                    className="col-span-1 md:col-span-6 lg:col-span-4 bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full"
                                >
                                    <Link href={`/news/${post.slug}`} className="relative h-56 overflow-hidden block">
                                        {imgUrl ? (
                                            <Image
                                                src={imgUrl}
                                                alt={post.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-slate-50 flex items-center justify-center text-slate-300">
                                                <Newspaper size={32} />
                                            </div>
                                        )}
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
                                            <Calendar size={12} />
                                            {formatDate(post.date)}
                                        </div>

                                        <Link href={`/news/${post.slug}`} className="block mb-3">
                                            <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-[#005596] transition-colors">
                                                {post.title}
                                            </h3>
                                        </Link>

                                        <div
                                            className="text-slate-500 text-sm line-clamp-2 mb-6 leading-relaxed"
                                            dangerouslySetInnerHTML={{
                                                __html: sanitizeExcerpt(post.excerpt || ''),
                                            }}
                                        />

                                        <div className="mt-auto pt-6 border-t border-slate-50 flex justify-between items-center w-full">
                                            <Link
                                                href={`/news/${post.slug}`}
                                                className="text-xs font-bold text-slate-900 uppercase tracking-widest hover:text-[#005596] transition-colors flex items-center gap-2 group/btn"
                                            >
                                                {readArticleText}{' '}
                                                <ArrowRight
                                                    size={14}
                                                    className="group-hover/btn:translate-x-1 transition-transform"
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </div>

                    {/* Load More Button */}
                    {visibleCount < filteredPosts.length && (
                        <div className="mt-14 text-center">
                            <button
                                onClick={() => setVisibleCount((prev) => prev + 12)}
                                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white hover:bg-slate-50 text-slate-800 hover:text-[#005596] font-bold text-sm rounded-full border border-slate-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer"
                            >
                                <span>{isId ? 'Muat Lebih Banyak Artikel' : 'Load More Articles'}</span>
                                <span className="text-xs font-mono text-slate-400">
                                    ({displayedPosts.length} / {filteredPosts.length})
                                </span>
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-200 shadow-sm">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                        <Filter size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                        {isId ? 'Artikel Tidak Ditemukan' : 'No Articles Found'}
                    </h3>
                    <p className="text-slate-500 max-w-md mx-auto text-sm">
                        {isId
                            ? 'Tidak ada artikel yang cocok dengan kata kunci atau kategori yang dipilih. Silakan ubah kata kunci atau reset filter.'
                            : 'No articles match the selected search query or category filter. Try refining your keywords or clearing filters.'}
                    </p>
                    <button
                        onClick={() => {
                            setFilter('All');
                            setSearchQuery('');
                            setVisibleCount(12);
                        }}
                        className="mt-4 px-6 py-2.5 rounded-full bg-[#005596] text-white text-xs font-bold transition-all shadow-sm"
                    >
                        {isId ? 'Reset Pencarian' : 'Reset Search'}
                    </button>
                </div>
            )}
        </>
    );
}
