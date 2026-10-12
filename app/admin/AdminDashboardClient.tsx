/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Search,
  ExternalLink,
  Edit3,
  Trash2,
  LogOut,
  Sparkles,
  Layers,
  CheckCircle2,
  Clock,
  Filter,
  RefreshCw,
  AlertTriangle,
  Download,
  Copy,
  Star,
  Globe,
  Command,
  CheckSquare,
  Square,
  ChevronLeft,
  ChevronRight,
  X,
  FileText,
  SlidersHorizontal,
  BookmarkCheck,
} from 'lucide-react';
import type { ArticleItem } from '@/app/api/admin/articles/route';

interface Props {
  initialLegacyCount: number;
}

const ITEMS_PER_PAGE = 15;
const CATEGORIES = ['Semua', 'Produk', 'Tips', 'Ergonomi', 'News', 'Blog'];

export default function AdminDashboardClient({ initialLegacyCount }: Props) {
  const router = useRouter();
  const [firestoreArticles, setFirestoreArticles] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft' | 'featured'>('all');
  const [categoryFilter, setCategoryFilter] = useState('Semua');
  const [currentPage, setCurrentPage] = useState(1);

  // Bulk actions selection
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBulkProcessing, setIsBulkProcessing] = useState(false);

  // Deletion modal
  const [deleteTarget, setDeleteTarget] = useState<ArticleItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Sync state
  const [isSyncing, setIsSyncing] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  // Command Palette
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [cmdSearch, setCmdSearch] = useState('');

  const showToast = (type: 'success' | 'error' | 'info', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 5000);
  };

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/articles');
      if (res.ok) {
        const data = await res.json();
        setFirestoreArticles(data.articles || []);
      }
    } catch (e) {
      console.error('Failed to load articles:', e);
      showToast('error', 'Gagal memuat artikel dari database.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // Command Palette keyboard shortcut (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCmdOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsCmdOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch {
      router.push('/admin/login');
    }
  };

  // Sync WordPress
  const handleSyncWordPress = async () => {
    if (!confirm('Apakah Anda ingin menarik artikel terbaru dari WordPress dan menyimpannya ke Firebase?')) return;
    setIsSyncing(true);
    try {
      const res = await fetch('/api/admin/sync-wordpress', { method: 'POST' });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast('success', data.message || 'Sinkronisasi berhasil!');
        fetchArticles();
      } else {
        showToast('error', data.error || 'Gagal sinkronisasi');
      }
    } catch {
      showToast('error', 'Terjadi kesalahan koneksi saat sinkronisasi');
    } finally {
      setIsSyncing(false);
    }
  };

  // Quick Toggle Status (Published <-> Draft)
  const handleToggleStatus = async (article: ArticleItem) => {
    const nextStatus = article.status === 'published' ? 'draft' : 'published';
    try {
      const res = await fetch('/api/admin/articles', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: article.id, status: nextStatus }),
      });
      if (res.ok) {
        setFirestoreArticles((prev) =>
          prev.map((a) => (a.id === article.id ? { ...a, status: nextStatus } : a))
        );
        showToast('success', `Status artikel diubah menjadi ${nextStatus.toUpperCase()}`);
      }
    } catch {
      showToast('error', 'Gagal memperbarui status artikel');
    }
  };

  // Quick Toggle Featured Star
  const handleToggleFeatured = async (article: ArticleItem) => {
    const nextFeatured = !article.featured;
    try {
      const res = await fetch('/api/admin/articles', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: article.id, featured: nextFeatured }),
      });
      if (res.ok) {
        setFirestoreArticles((prev) =>
          prev.map((a) => (a.id === article.id ? { ...a, featured: nextFeatured } : a))
        );
        showToast('success', nextFeatured ? 'Artikel ditandai Unggulan ⭐' : 'Tanda Unggulan dicabut');
      }
    } catch {
      showToast('error', 'Gagal memperbarui tanda unggulan');
    }
  };

  // Duplicate Article (Clone as Template)
  const handleDuplicate = async (article: ArticleItem) => {
    const newTitle = `Salinan - ${article.title}`;
    const newSlug = `salinan-${article.slug}-${Date.now().toString().slice(-4)}`;
    try {
      const res = await fetch('/api/admin/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          customSlug: newSlug,
          content: article.content,
          excerpt: article.excerpt,
          category: article.category,
          featuredImage: article.featuredImage,
          author: article.author,
          status: 'draft',
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.article) {
          setFirestoreArticles((prev) => [data.article, ...prev]);
          showToast('success', 'Artikel berhasil diduplikat menjadi draf!');
        }
      }
    } catch {
      showToast('error', 'Gagal menduplikat artikel');
    }
  };

  // Export Data JSON Backup
  const handleExportJson = () => {
    try {
      const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(firestoreArticles, null, 2)
      )}`;
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', jsonString);
      downloadAnchor.setAttribute(
        'download',
        `backup-artikel-dimensiwahyudi-${new Date().toISOString().slice(0, 10)}.json`
      );
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('success', 'Cadangan artikel (JSON) berhasil diunduh!');
    } catch {
      showToast('error', 'Gagal mengekspor data artikel.');
    }
  };

  // Confirm Delete
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/articles?id=${deleteTarget.id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setFirestoreArticles((prev) => prev.filter((a) => a.id !== deleteTarget.id));
        setSelectedIds((prev) => prev.filter((id) => id !== deleteTarget.id));
        setDeleteTarget(null);
        showToast('success', 'Artikel berhasil dihapus permanen.');
      }
    } catch {
      showToast('error', 'Gagal menghapus artikel');
    } finally {
      setIsDeleting(false);
    }
  };

  // Bulk Actions
  const handleBulkStatus = async (status: 'published' | 'draft') => {
    if (selectedIds.length === 0) return;
    setIsBulkProcessing(true);
    try {
      const res = await fetch('/api/admin/articles', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedIds, status }),
      });
      if (res.ok) {
        setFirestoreArticles((prev) =>
          prev.map((a) => (selectedIds.includes(a.id) ? { ...a, status } : a))
        );
        setSelectedIds([]);
        showToast('success', `${selectedIds.length} artikel diubah ke ${status.toUpperCase()}!`);
      }
    } catch {
      showToast('error', 'Gagal memperbarui artikel secara massal.');
    } finally {
      setIsBulkProcessing(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Yakin ingin menghapus ${selectedIds.length} artikel yang dipilih secara permanen?`)) return;
    setIsBulkProcessing(true);
    try {
      const res = await fetch(`/api/admin/articles?id=${selectedIds.join(',')}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setFirestoreArticles((prev) => prev.filter((a) => !selectedIds.includes(a.id)));
        setSelectedIds([]);
        showToast('success', 'Artikel terpilih berhasil dihapus!');
      }
    } catch {
      showToast('error', 'Gagal menghapus artikel terpilih.');
    } finally {
      setIsBulkProcessing(false);
    }
  };

  // Filtered Articles
  const filteredArticles = useMemo(() => {
    return firestoreArticles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.slug.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'all'
          ? true
          : statusFilter === 'featured'
          ? Boolean(article.featured)
          : article.status === statusFilter;

      const matchesCategory = categoryFilter === 'Semua' || article.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [firestoreArticles, searchQuery, statusFilter, categoryFilter]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE) || 1;
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredArticles.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredArticles, currentPage]);

  // Adjust page if query shrinks list
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  // Selection toggles
  const isAllCurrentSelected =
    paginatedArticles.length > 0 &&
    paginatedArticles.every((a) => selectedIds.includes(a.id));

  const toggleSelectAll = () => {
    if (isAllCurrentSelected) {
      const pageIds = paginatedArticles.map((a) => a.id);
      setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      const newIds = paginatedArticles.map((a) => a.id);
      setSelectedIds((prev) => Array.from(new Set([...prev, ...newIds])));
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Metrics
  const publishedCount = firestoreArticles.filter((a) => a.status === 'published').length;
  const draftCount = firestoreArticles.filter((a) => a.status === 'draft').length;
  const featuredCount = firestoreArticles.filter((a) => a.featured).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-cyan-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5">
          <div
            className={`px-4 py-3 rounded-2xl shadow-xl border flex items-center gap-3 text-xs font-bold ${
              toastMessage.type === 'success'
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-emerald-500/20'
                : toastMessage.type === 'error'
                ? 'bg-red-600 text-white border-red-500 shadow-red-500/20'
                : 'bg-slate-800 text-white border-slate-700 shadow-slate-900/20'
            }`}
          >
            <span>{toastMessage.text}</span>
            <button onClick={() => setToastMessage(null)} className="opacity-70 hover:opacity-100">
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Top Navbar (Light Corporate Style) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <Link href="/" className="block relative h-10 w-36 sm:w-44 hover:opacity-85 transition-opacity">
              <Image
                src="/logo.webp"
                alt="PT Dimensi Quantum Wahyudi"
                fill
                className="object-contain object-left"
                priority
                unoptimized
              />
            </Link>
            <div className="hidden md:flex items-center gap-2 pl-3 border-l border-slate-200">
              <span className="font-extrabold text-slate-900 text-sm tracking-tight">Admin CMS</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Firestore Connected
              </span>
            </div>
          </div>

          {/* Quick Actions Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Command Palette Trigger */}
            <button
              onClick={() => setIsCmdOpen(true)}
              className="hidden lg:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-xs border border-slate-200/80 transition-all cursor-pointer"
              title="Buka Command Palette (Ctrl + K)"
            >
              <Command size={13} className="text-slate-500" />
              <span>Cari / Aksi...</span>
              <kbd className="px-1.5 py-0.5 rounded-md bg-white border border-slate-300 text-[10px] text-slate-500 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Sync WP */}
            <button
              onClick={handleSyncWordPress}
              disabled={isSyncing}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 transition-all disabled:opacity-50 cursor-pointer"
              title="Tarik artikel baru dari WordPress"
            >
              <RefreshCw size={13} className={isSyncing ? 'animate-spin text-cyan-600' : 'text-slate-500'} />
              <span className="hidden sm:inline">{isSyncing ? 'Syncing...' : 'Sync WP'}</span>
            </button>

            {/* Export JSON Backup */}
            <button
              onClick={handleExportJson}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 transition-all cursor-pointer"
              title="Export backup database artikel ke format JSON"
            >
              <Download size={13} className="text-slate-500" />
              <span className="hidden md:inline">Backup JSON</span>
            </button>

            {/* Visit Website */}
            <Link
              href="/news"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 transition-all"
              title="Lihat halaman publik berita"
            >
              <Globe size={13} className="text-cyan-600" />
              <span className="hidden md:inline">Lihat Web</span>
            </Link>

            {/* Create Article Button */}
            <Link
              href="/admin/editor"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-cyan-600/20 transition-all"
            >
              <Plus size={15} />
              <span>Tulis Artikel</span>
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-all cursor-pointer"
              title="Keluar dari Admin"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Metric Cards Banner */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Artikel</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 block">
                {firestoreArticles.length}
              </span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center border border-cyan-100">
              <FileText size={20} />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Terbit (Live)</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-1 block">
                {publishedCount}
              </span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <CheckCircle2 size={20} />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Draf / Revisi</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-1 block">
                {draftCount}
              </span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
              <Clock size={20} />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Unggulan (⭐)</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-500 mt-1 block">
                {featuredCount}
              </span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center border border-amber-100">
              <Star size={20} className="fill-amber-400" />
            </div>
          </div>
        </section>

        {/* Filter & Search Bar */}
        <section className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Cari judul artikel, slug, topik..."
                className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Status Filter Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 w-full md:w-auto overflow-x-auto">
              <button
                onClick={() => {
                  setStatusFilter('all');
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  statusFilter === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Semua ({firestoreArticles.length})
              </button>
              <button
                onClick={() => {
                  setStatusFilter('published');
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  statusFilter === 'published'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Published ({publishedCount})
              </button>
              <button
                onClick={() => {
                  setStatusFilter('draft');
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  statusFilter === 'draft'
                    ? 'bg-white text-amber-700 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Draft ({draftCount})
              </button>
              <button
                onClick={() => {
                  setStatusFilter('featured');
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  statusFilter === 'featured'
                    ? 'bg-white text-amber-600 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                ⭐ Featured ({featuredCount})
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <SlidersHorizontal size={12} /> Kategori:
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategoryFilter(cat);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-cyan-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Bulk Action Bar (Appears when rows selected) */}
        {selectedIds.length > 0 && (
          <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-900">
              <CheckSquare size={16} className="text-cyan-600" />
              <span>{selectedIds.length} artikel terpilih</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleBulkStatus('published')}
                disabled={isBulkProcessing}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
              >
                Set Published
              </button>
              <button
                onClick={() => handleBulkStatus('draft')}
                disabled={isBulkProcessing}
                className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
              >
                Set Draft
              </button>
              <button
                onClick={handleBulkDelete}
                disabled={isBulkProcessing}
                className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all disabled:opacity-50 cursor-pointer flex items-center gap-1"
              >
                <Trash2 size={13} />
                <span>Hapus Terpilih</span>
              </button>
              <button
                onClick={() => setSelectedIds([])}
                className="px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-100 cursor-pointer"
              >
                Batal
              </button>
            </div>
          </div>
        )}

        {/* Article Table Container */}
        <section className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
          {loading ? (
            <div className="p-16 text-center text-slate-400">
              <RefreshCw size={24} className="animate-spin mx-auto mb-3 text-cyan-600" />
              <p className="text-sm font-semibold">Memuat database artikel Firestore...</p>
            </div>
          ) : paginatedArticles.length === 0 ? (
            <div className="p-16 text-center text-slate-400">
              <AlertTriangle size={32} className="mx-auto mb-3 text-slate-300" />
              <h3 className="text-slate-700 font-bold text-base">Tidak ada artikel yang cocok</h3>
              <p className="text-xs text-slate-400 mt-1">Coba sesuaikan kata kunci pencarian atau filter status Anda.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 pl-4 pr-2 w-10 text-center">
                      <button onClick={toggleSelectAll} className="cursor-pointer text-slate-400 hover:text-cyan-600">
                        {isAllCurrentSelected ? <CheckSquare size={16} className="text-cyan-600" /> : <Square size={16} />}
                      </button>
                    </th>
                    <th className="py-3.5 px-3 w-8">⭐</th>
                    <th className="py-3.5 px-4 min-w-[280px]">Judul & Slug</th>
                    <th className="py-3.5 px-4">Kategori</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Tanggal</th>
                    <th className="py-3.5 px-4 text-right">Aksi Cepat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedArticles.map((article) => {
                    const isSelected = selectedIds.includes(article.id);
                    return (
                      <tr
                        key={article.id}
                        className={`hover:bg-slate-50/80 transition-colors ${isSelected ? 'bg-cyan-50/40' : ''}`}
                      >
                        {/* Checkbox */}
                        <td className="py-3.5 pl-4 pr-2 text-center">
                          <button
                            onClick={() => toggleSelectRow(article.id)}
                            className="cursor-pointer text-slate-400 hover:text-cyan-600"
                          >
                            {isSelected ? <CheckSquare size={16} className="text-cyan-600" /> : <Square size={16} />}
                          </button>
                        </td>

                        {/* Featured Star */}
                        <td className="py-3.5 px-3">
                          <button
                            onClick={() => handleToggleFeatured(article)}
                            className="cursor-pointer text-slate-300 hover:text-amber-500 transition-colors"
                            title={article.featured ? 'Cabut tanda Featured' : 'Jadikan artikel Featured'}
                          >
                            <Star
                              size={16}
                              className={article.featured ? 'text-amber-500 fill-amber-400' : 'text-slate-300'}
                            />
                          </button>
                        </td>

                        {/* Title & Slug */}
                        <td className="py-3.5 px-4">
                          <Link
                            href={`/admin/editor?id=${article.id}`}
                            className="font-bold text-slate-900 hover:text-cyan-600 text-sm line-clamp-1 transition-colors block"
                          >
                            {article.title}
                          </Link>
                          <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mt-0.5">
                            <span className="font-mono text-slate-500 truncate max-w-xs">/news/{article.slug}</span>
                            <Link
                              href={`/news/${article.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-slate-400 hover:text-cyan-600"
                              title="Buka artikel langsung di website"
                            >
                              <ExternalLink size={12} />
                            </Link>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3.5 px-4">
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                            {article.category || 'News'}
                          </span>
                        </td>

                        {/* Status (Clickable Toggle!) */}
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => handleToggleStatus(article)}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                              article.status === 'published'
                                ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                                : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
                            }`}
                            title="Klik untuk mengubah status"
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                article.status === 'published' ? 'bg-emerald-500' : 'bg-amber-500'
                              }`}
                            />
                            <span>{article.status === 'published' ? 'Published' : 'Draft'}</span>
                          </button>
                        </td>

                        {/* Date */}
                        <td className="py-3.5 px-4 text-slate-500 text-[11px] whitespace-nowrap">
                          {new Date(article.publishedAt || article.updatedAt).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-1">
                            {/* Duplicate / Clone */}
                            <button
                              onClick={() => handleDuplicate(article)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                              title="Duplikat artikel ini sebagai template baru"
                            >
                              <Copy size={15} />
                            </button>

                            {/* Edit */}
                            <Link
                              href={`/admin/editor?id=${article.id}`}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-cyan-600 hover:bg-cyan-50 transition-colors"
                              title="Edit artikel"
                            >
                              <Edit3 size={15} />
                            </Link>

                            {/* Delete */}
                            <button
                              onClick={() => setDeleteTarget(article)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                              title="Hapus artikel"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Footer */}
          {!loading && filteredArticles.length > 0 && (
            <div className="bg-slate-50 border-t border-slate-200 px-4 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
              <div>
                Menampilkan{' '}
                <span className="font-bold text-slate-900">
                  {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filteredArticles.length)}
                </span>{' '}
                sampai{' '}
                <span className="font-bold text-slate-900">
                  {Math.min(currentPage * ITEMS_PER_PAGE, filteredArticles.length)}
                </span>{' '}
                dari <span className="font-bold text-slate-900">{filteredArticles.length}</span> artikel
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
                >
                  <ChevronLeft size={14} />
                </button>

                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pNum = idx + 1;
                  // Show current, first, last, and neighbors
                  if (
                    pNum === 1 ||
                    pNum === totalPages ||
                    (pNum >= currentPage - 1 && pNum <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pNum}
                        onClick={() => setCurrentPage(pNum)}
                        className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          currentPage === pNum
                            ? 'bg-cyan-600 text-white shadow-xs'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {pNum}
                      </button>
                    );
                  }
                  if (pNum === currentPage - 2 || pNum === currentPage + 2) {
                    return <span key={pNum} className="text-slate-400 px-1">...</span>;
                  }
                  return null;
                })}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center border border-red-100">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Hapus Artikel Ini?</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Artikel <span className="font-semibold text-slate-800">"{deleteTarget.title}"</span> akan dihapus permanen dari database Firebase Firestore.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
              >
                {isDeleting ? 'Menghapus...' : 'Ya, Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Universal Command Palette (Ctrl+K Modal) */}
      {isCmdOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-start justify-center pt-20 p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden space-y-2">
            <div className="p-3 border-b border-slate-100 flex items-center gap-3">
              <Search size={18} className="text-slate-400 ml-2" />
              <input
                type="text"
                autoFocus
                value={cmdSearch}
                onChange={(e) => setCmdSearch(e.target.value)}
                placeholder="Ketik judul artikel, atau perintah (tulis, sync, backup)..."
                className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
              />
              <button
                onClick={() => setIsCmdOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400"
              >
                <X size={16} />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2 space-y-1 text-xs">
              {/* Quick Actions */}
              <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Aksi Cepat
              </div>
              <button
                onClick={() => {
                  setIsCmdOpen(false);
                  router.push('/admin/editor');
                }}
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 flex items-center gap-2.5 font-semibold text-slate-700 cursor-pointer"
              >
                <Plus size={15} className="text-cyan-600" />
                <span>Tulis Artikel Baru</span>
              </button>
              <button
                onClick={() => {
                  setIsCmdOpen(false);
                  handleSyncWordPress();
                }}
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 flex items-center gap-2.5 font-semibold text-slate-700 cursor-pointer"
              >
                <RefreshCw size={15} className="text-cyan-600" />
                <span>Sinkronisasi Artikel WordPress</span>
              </button>
              <button
                onClick={() => {
                  setIsCmdOpen(false);
                  handleExportJson();
                }}
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 flex items-center gap-2.5 font-semibold text-slate-700 cursor-pointer"
              >
                <Download size={15} className="text-cyan-600" />
                <span>Download Backup Data (JSON)</span>
              </button>

              {/* Matching Articles */}
              <div className="px-3 pt-3 pb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Artikel
              </div>
              {firestoreArticles
                .filter((a) => a.title.toLowerCase().includes(cmdSearch.toLowerCase()))
                .slice(0, 8)
                .map((a) => (
                  <button
                    key={a.id}
                    onClick={() => {
                      setIsCmdOpen(false);
                      router.push(`/admin/editor?id=${a.id}`);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 flex items-center justify-between font-semibold text-slate-700 cursor-pointer"
                  >
                    <span className="truncate pr-4">{a.title}</span>
                    <span className="text-[10px] text-slate-400 shrink-0 font-mono">/news/{a.slug}</span>
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
