/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  Save,
  Send,
  Eye,
  Edit2,
  Image as ImageIcon,
  Link2,
  List,
  ListOrdered,
  Quote,
  Heading2,
  Heading3,
  Bold,
  Italic,
  Sparkles,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Search,
} from 'lucide-react';
import type { ArticleItem } from '@/app/api/admin/articles/route';

const CATEGORIES = ['Produk', 'Tips', 'Ergonomi', 'News', 'Blog'];

export default function EditorClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [isSlugManual, setIsSlugManual] = useState(false);
  const [category, setCategory] = useState('Produk');
  const [featuredImage, setFeaturedImage] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('Tim Teknis PT Dimensi Quantum Wahyudi');
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(Boolean(editId));
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string; slug?: string } | null>(null);

  // Auto-slug generator
  useEffect(() => {
    if (!isSlugManual && !editId) {
      const generated = title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setSlug(generated);
    }
  }, [title, isSlugManual, editId]);

  // Load existing article if editing
  useEffect(() => {
    if (!editId) return;

    const loadArticle = async () => {
      try {
        const res = await fetch('/api/admin/articles');
        if (res.ok) {
          const data = await res.json();
          const target = (data.articles as ArticleItem[])?.find((a) => a.id === editId);
          if (target) {
            setTitle(target.title);
            setSlug(target.slug);
            setIsSlugManual(true);
            setCategory(target.category || 'Produk');
            setFeaturedImage(target.featuredImage || '');
            setExcerpt(target.excerpt || '');
            setContent(target.content || '');
            setAuthor(target.author || 'Tim Teknis PT Dimensi Quantum Wahyudi');
          }
        }
      } catch (err) {
        console.error('Failed to load article:', err);
      } finally {
        setInitialLoading(false);
      }
    };

    loadArticle();
  }, [editId]);

  // Insert formatting snippet at cursor position
  const insertSnippet = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('article-content-editor') as HTMLTextAreaElement | null;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);
    const replacement = `${prefix}${selected || 'teks'}${suffix}`;

    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + replacement.length - suffix.length);
    }, 50);
  };

  const handleSave = async (status: 'published' | 'draft') => {
    if (!title.trim()) {
      setNotification({ type: 'error', message: 'Judul artikel wajib diisi!' });
      return;
    }
    if (!content.trim()) {
      setNotification({ type: 'error', message: 'Konten artikel belum diisi!' });
      return;
    }

    setLoading(true);
    setNotification(null);

    const payload = {
      id: editId || undefined,
      title,
      slug: slug || undefined,
      customSlug: slug || undefined,
      category,
      featuredImage: featuredImage.trim() || undefined,
      excerpt: excerpt.trim() || undefined,
      content,
      author,
      status,
    };

    try {
      const url = '/api/admin/articles';
      const method = editId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const publishedSlug = data.article?.slug || slug;
        setNotification({
          type: 'success',
          message: status === 'published' ? '🎉 Artikel berhasil diterbitkan dan langsung tayang!' : 'Draft artikel tersimpan!',
          slug: publishedSlug,
        });

        if (!editId) {
          setTimeout(() => {
            router.push('/admin');
          }, 1800);
        }
      } else {
        setNotification({ type: 'error', message: data.error || 'Gagal menyimpan artikel' });
      }
    } catch {
      setNotification({ type: 'error', message: 'Terjadi kendala jaringan saat menyimpan artikel.' });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-400">
        <span>Memuat data artikel...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 selection:bg-cyan-500 selection:text-white pb-24">
      {/* Top Action Bar */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Kembali ke Dashboard"
            >
              <ArrowLeft size={16} />
            </Link>
            <div>
              <span className="font-bold text-white text-sm sm:text-base">
                {editId ? 'Edit Artikel' : 'Tulis Artikel Baru'}
              </span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-950 text-cyan-400 border border-cyan-800/50">
                Direct Publisher
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSave('draft')}
              disabled={loading}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              <Save size={14} />
              <span>Simpan Draft</span>
            </button>

            <button
              onClick={() => handleSave('published')}
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-cyan-500/20 transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              <Send size={14} />
              <span>{loading ? 'Menerbitkan...' : 'Publish Sekarang'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Notification Banner */}
        {notification && (
          <div
            className={`mb-6 p-4 rounded-2xl border flex items-center justify-between gap-4 animate-in fade-in ${
              notification.type === 'success'
                ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                : 'bg-red-950/40 border-red-800 text-red-300'
            }`}
          >
            <div className="flex items-center gap-3">
              {notification.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
              <span className="text-sm font-semibold">{notification.message}</span>
            </div>
            {notification.slug && (
              <Link
                href={`/news/${notification.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
              >
                <span>Lihat di Website</span>
                <ExternalLink size={13} />
              </Link>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Form & Content Editor (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title Input */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 shadow-sm">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Judul Artikel (H1) *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Solusi Vacuum Tube Lifter untuk Industri Logam & Manufaktur"
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700/80 rounded-2xl text-white text-base sm:text-lg font-bold placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />

              {/* Slug URL */}
              <div className="mt-3 flex items-center gap-2 text-xs">
                <span className="text-slate-500 font-mono">Permalink: /news/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value);
                    setIsSlugManual(true);
                  }}
                  className="bg-transparent border-b border-dashed border-cyan-500/50 text-cyan-400 font-mono focus:outline-none focus:border-cyan-400 py-0.5 px-1 max-w-sm"
                />
              </div>
            </div>

            {/* Content Editor Box */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-3xl overflow-hidden shadow-sm">
              {/* Tab Switcher & Formatting Toolbar */}
              <div className="bg-slate-950 border-b border-slate-800 p-3 flex flex-wrap items-center justify-between gap-3">
                {/* Mode Tabs */}
                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setActiveTab('editor')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeTab === 'editor' ? 'bg-cyan-500 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Edit2 size={13} />
                    <span>Editor Tulis</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('preview')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeTab === 'preview' ? 'bg-cyan-500 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Eye size={13} />
                    <span>Live Preview</span>
                  </button>
                </div>

                {/* Quick Formatting Buttons */}
                {activeTab === 'editor' && (
                  <div className="flex items-center flex-wrap gap-1 text-slate-300">
                    <button
                      type="button"
                      onClick={() => insertSnippet('## ', '\n')}
                      className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-cyan-400 text-xs font-bold transition-colors"
                      title="Heading 2"
                    >
                      <Heading2 size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertSnippet('### ', '\n')}
                      className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-cyan-400 text-xs font-bold transition-colors"
                      title="Heading 3"
                    >
                      <Heading3 size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertSnippet('**', '**')}
                      className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-cyan-400 text-xs font-bold transition-colors"
                      title="Bold"
                    >
                      <Bold size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertSnippet('*', '*')}
                      className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-cyan-400 text-xs font-bold transition-colors"
                      title="Italic"
                    >
                      <Italic size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertSnippet('- ', '\n')}
                      className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-cyan-400 text-xs font-bold transition-colors"
                      title="Bullet List"
                    >
                      <List size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertSnippet('1. ', '\n')}
                      className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-cyan-400 text-xs font-bold transition-colors"
                      title="Numbered List"
                    >
                      <ListOrdered size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertSnippet('> ', '\n')}
                      className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-cyan-400 text-xs font-bold transition-colors"
                      title="Quote"
                    >
                      <Quote size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertSnippet('[Teks Link](https://', ')')}
                      className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-cyan-400 text-xs font-bold transition-colors"
                      title="Insert Link"
                    >
                      <Link2 size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertSnippet('<img src="', '" alt="Deskripsi gambar" class="rounded-2xl my-6 w-full" />')}
                      className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-cyan-400 text-xs font-bold transition-colors"
                      title="Insert Image"
                    >
                      <ImageIcon size={15} />
                    </button>
                  </div>
                )}
              </div>

              {/* Editor / Preview Area */}
              {activeTab === 'editor' ? (
                <div className="p-4 sm:p-6">
                  <textarea
                    id="article-content-editor"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={18}
                    placeholder="Mulai tulis artikel Anda di sini... (Mendukung Markdown & HTML standar)"
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl p-5 text-slate-100 placeholder-slate-600 text-sm font-sans leading-relaxed focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30"
                  />
                </div>
              ) : (
                <div className="p-6 sm:p-8 bg-white text-slate-900 min-h-[450px] rounded-b-3xl prose prose-slate max-w-none">
                  {featuredImage && (
                    <div className="relative h-64 w-full mb-6 rounded-2xl overflow-hidden bg-slate-100">
                      <img src={featuredImage} alt={title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <h1 className="text-3xl font-extrabold text-slate-900 mb-4">{title || 'Judul Artikel'}</h1>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-8 border-b pb-4">
                    <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 font-bold uppercase tracking-wider">
                      {category}
                    </span>
                    <span>Oleh: {author}</span>
                  </div>
                  <div
                    className="leading-relaxed space-y-4"
                    dangerouslySetInnerHTML={{
                      __html: content
                        .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-slate-900 mt-6 mb-2">$1</h2>')
                        .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-slate-800 mt-4 mb-2">$1</h3>')
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em>$1</em>')
                        .replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-blue-600 pl-4 py-1 italic text-slate-600 bg-slate-50 rounded-r-lg my-4">$1</blockquote>')
                        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 underline font-medium">$1</a>')
                        .replace(/\n\n/g, '<p class="text-slate-700 leading-relaxed my-3"></p>')
                        .replace(/\n/g, '<br />'),
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Metadata, Cover, & Google SERP Preview (1 Col) */}
          <div className="space-y-6">
            {/* Category Selector */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 shadow-sm">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Kategori Artikel
              </label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      category === cat
                        ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Image */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 shadow-sm">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Featured Image URL
              </label>
              <input
                type="text"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                placeholder="https://.../gambar.webp"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 mb-3"
              />

              {featuredImage ? (
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                  <img src={featuredImage} alt="Preview" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="p-6 rounded-xl border border-dashed border-slate-800 text-center text-slate-600 text-xs">
                  <ImageIcon size={24} className="mx-auto mb-1.5 opacity-50" />
                  <span>Masukkan URL gambar untuk pratinjau</span>
                </div>
              )}
            </div>

            {/* SEO Excerpt & Google Preview */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                  Ringkasan Meta (SEO)
                </label>
                <span className={`text-[10px] font-mono ${excerpt.length > 160 ? 'text-amber-400' : 'text-slate-500'}`}>
                  {excerpt.length}/160
                </span>
              </div>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
                placeholder="Deskripsi singkat artikel untuk cuplikan Google Search..."
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 mb-4"
              />

              {/* Google SERP Preview Card */}
              <div className="p-4 rounded-2xl bg-white text-slate-900 text-left shadow-md">
                <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-1">
                  <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px] font-bold">
                    D
                  </span>
                  <span className="font-semibold text-slate-800">dimensiwahyudi.com</span>
                  <span>› news › {slug || 'artikel'}</span>
                </div>
                <div className="text-sm font-bold text-blue-800 hover:underline line-clamp-1 cursor-pointer">
                  {title || 'Judul Artikel Anda di Google'} | Insights Dimensi Wahyudi
                </div>
                <div className="text-xs text-slate-600 mt-1 line-clamp-2">
                  {excerpt || 'Teks ringkasan meta artikel Anda akan muncul di hasil pencarian Google seperti ini.'}
                </div>
              </div>
            </div>

            {/* Author */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 shadow-sm">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Penulis (Author)
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
