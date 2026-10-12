'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FileText,
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
} from 'lucide-react';
import type { ArticleItem } from '@/app/api/admin/articles/route';

interface Props {
  initialLegacyCount: number;
}

export default function AdminDashboardClient({ initialLegacyCount }: Props) {
  const router = useRouter();
  const [firestoreArticles, setFirestoreArticles] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [deleteTarget, setDeleteTarget] = useState<ArticleItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/articles');
      if (res.ok) {
        const data = await res.json();
        setFirestoreArticles(data.articles || []);
      }
    } catch (e) {
      console.error('Failed to load articles:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
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

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/articles?id=${deleteTarget.id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setFirestoreArticles((prev) => prev.filter((a) => a.id !== deleteTarget.id));
        setDeleteTarget(null);
      }
    } catch (e) {
      console.error('Delete failed:', e);
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredArticles = firestoreArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || article.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 selection:bg-cyan-500 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-black text-white text-lg shadow-md shadow-cyan-500/20">
              D
            </div>
            <div>
              <span className="font-bold text-white tracking-tight">Dimensi Admin CMS</span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-950 text-cyan-400 border border-cyan-800/50">
                Firestore Connected
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/editor"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-cyan-500/20 transition-all"
            >
              <Plus size={16} />
              <span>Tulis Artikel Baru</span>
            </Link>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              title="Keluar"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Artikel Firebase</span>
              <Sparkles size={18} className="text-cyan-400" />
            </div>
            <div className="text-3xl font-black text-white">{firestoreArticles.length}</div>
            <div className="text-xs text-slate-500 mt-1">Dikelola via Dashboard Langsung</div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Artikel WordPress Lama</span>
              <Layers size={18} className="text-blue-400" />
            </div>
            <div className="text-3xl font-black text-white">{initialLegacyCount}</div>
            <div className="text-xs text-slate-500 mt-1">Terarsip aman & tetap terindeks Google</div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Tayang di Web</span>
              <CheckCircle2 size={18} className="text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-white">
              {initialLegacyCount + firestoreArticles.filter((a) => a.status === 'published').length}
            </div>
            <div className="text-xs text-emerald-400/80 mt-1">100% Aktif di /news</div>
          </div>
        </div>

        {/* Toolbar & Filter */}
        <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari judul, kategori, slug..."
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-700/80">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  statusFilter === 'all' ? 'bg-cyan-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setStatusFilter('published')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  statusFilter === 'published' ? 'bg-cyan-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Published
              </button>
              <button
                onClick={() => setStatusFilter('draft')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  statusFilter === 'draft' ? 'bg-cyan-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Draft
              </button>
            </div>

            <button
              onClick={fetchArticles}
              className="p-2 rounded-xl bg-slate-900 border border-slate-700/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Refresh Data"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {/* Articles Table */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText size={18} className="text-cyan-400" />
              <h2 className="font-bold text-white text-sm">Daftar Artikel Baru (Firestore)</h2>
            </div>
            <span className="text-xs text-slate-500">{filteredArticles.length} artikel ditemukan</span>
          </div>

          {loading ? (
            <div className="p-12 text-center text-slate-500 text-sm">
              <RefreshCw size={24} className="animate-spin mx-auto mb-3 text-cyan-500" />
              <span>Memuat artikel dari Firebase Firestore...</span>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              <FileText size={36} className="mx-auto mb-3 text-slate-600 opacity-50" />
              <p className="text-sm font-semibold text-slate-400">Belum ada artikel di Firestore</p>
              <p className="text-xs text-slate-500 mt-1 mb-4">
                Klik tombol di bawah untuk menulis dan menerbitkan artikel baru pertama Anda.
              </p>
              <Link
                href="/admin/editor"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs"
              >
                <Plus size={16} />
                <span>Tulis Artikel Baru</span>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-900/50 text-slate-400 border-b border-slate-800 text-xs uppercase font-semibold">
                    <th className="py-3.5 px-4">Judul Artikel</th>
                    <th className="py-3.5 px-4">Kategori</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Tanggal</th>
                    <th className="py-3.5 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredArticles.map((article) => {
                    const isPublished = article.status === 'published';
                    return (
                      <tr key={article.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-4 px-4">
                          <div className="font-bold text-white hover:text-cyan-400 transition-colors line-clamp-1">
                            {article.title}
                          </div>
                          <div className="text-xs text-slate-500 font-mono mt-0.5 line-clamp-1">
                            /news/{article.slug}
                          </div>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700/50">
                            {article.category}
                          </span>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                              isPublished
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${isPublished ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                            {isPublished ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-400 font-mono">
                          {new Date(article.publishedAt).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {isPublished && (
                              <Link
                                href={`/news/${article.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 transition-colors"
                                title="Lihat di Web"
                              >
                                <ExternalLink size={15} />
                              </Link>
                            )}
                            <Link
                              href={`/admin/editor?id=${article.id}`}
                              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-blue-400 transition-colors"
                              title="Edit Artikel"
                            >
                              <Edit3 size={15} />
                            </Link>
                            <button
                              onClick={() => setDeleteTarget(article)}
                              className="p-2 rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
                              title="Hapus Artikel"
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
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-3 text-red-400 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                <AlertTriangle size={20} />
              </div>
              <h3 className="font-bold text-white text-base">Hapus Artikel?</h3>
            </div>
            <p className="text-sm text-slate-300 mb-2">
              Anda yakin ingin menghapus artikel:
            </p>
            <p className="text-xs font-semibold text-cyan-400 bg-slate-950 p-3 rounded-xl border border-slate-800 mb-6 font-mono">
              {deleteTarget.title}
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 transition-colors disabled:opacity-50"
              >
                {isDeleting ? 'Menghapus...' : 'Ya, Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
