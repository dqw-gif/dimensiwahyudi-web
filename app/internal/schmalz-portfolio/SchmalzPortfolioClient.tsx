'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search, Filter, ChevronDown, RefreshCw, Edit3, X, Save, Loader2 } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

type Project = {
  company: string;
  industry: string;
  project_desc: string;
  company_logo: string;
  project_image: string;
  row_index: number;
};

type ParsedDescription = {
  Before: string;
  Beban: string;
  Produk: string;
  After: string;
  Plant: string;
};

const GOOGLE_SHEETS_API_URL =
  '/api/internal/schmalz-portfolio';
const CACHE_KEY = 'schmalz_portfolio_cache';
const ITEMS_PER_PAGE = 12;

const INITIAL_DESC: ParsedDescription = {
  Before: '',
  Beban: '',
  Produk: '',
  After: '',
  Plant: '',
};

function escapeHtml(unsafe: string) {
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function fixDriveUrl(url: string) {
  if (!url) return '';

  let fileId: string | null = null;
  const matchId = url.match(/id=([a-zA-Z0-9_-]+)/);
  const matchD = url.match(/\/d\/([a-zA-Z0-9_-]+)/);

  if (matchId) fileId = matchId[1];
  else if (matchD) fileId = matchD[1];

  if (fileId && url.includes('drive.google.com')) {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
  }

  return url;
}

function parseDescription(rawDesc: string): ParsedDescription {
  const parsed: ParsedDescription = { ...INITIAL_DESC };
  let currentKey: keyof ParsedDescription = 'Before';

  if (rawDesc.includes('Before:') || rawDesc.includes('Beban:') || rawDesc.includes('Produk:')) {
    rawDesc.split('\n').forEach((line) => {
      if (line.startsWith('Before:')) {
        currentKey = 'Before';
        parsed[currentKey] = line.slice(7).trim();
      } else if (line.startsWith('Beban:')) {
        currentKey = 'Beban';
        parsed[currentKey] = line.slice(6).trim();
      } else if (line.startsWith('Produk:')) {
        currentKey = 'Produk';
        parsed[currentKey] = line.slice(7).trim();
      } else if (line.startsWith('After:')) {
        currentKey = 'After';
        parsed[currentKey] = line.slice(6).trim();
      } else if (line.startsWith('Plant:')) {
        currentKey = 'Plant';
        parsed[currentKey] = line.slice(6).trim();
      } else {
        parsed[currentKey] += (parsed[currentKey] ? '\n' : '') + line;
      }
    });
  } else {
    parsed.Before = rawDesc;
  }

  return parsed;
}

function formatDescForCard(desc: string) {
  let safe = escapeHtml(desc || '');
  const keys = ['Before:', 'Beban:', 'Produk:', 'After:', 'Plant:'];

  keys.forEach((key) => {
    safe = safe.replace(new RegExp(`(${key})`, 'g'), '<span class="font-bold text-gray-800">$1</span>');
  });

  return safe;
}

function sanitizeHttpUrl(rawUrl: string) {
  if (!rawUrl) return '';

  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return parsed.toString();
    }
    return '';
  } catch {
    return '';
  }
}

export default function SchmalzPortfolioClient() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusText, setStatusText] = useState('MENGHUBUNGKAN DATABASE...');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formProject, setFormProject] = useState<Project | null>(null);
  const [descFields, setDescFields] = useState<ParsedDescription>(INITIAL_DESC);
  const prefersReducedMotion = useReducedMotion();

  const industries = useMemo(() => {
    return ['All', ...new Set(projects.map((p) => p.industry).filter(Boolean))].sort((a, b) => {
      if (a === 'All') return -1;
      if (b === 'All') return 1;
      return a.localeCompare(b);
    });
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return projects.filter((project) => {
      const matchedQuery =
        project.company.toLowerCase().includes(q) || project.project_desc.toLowerCase().includes(q);
      const matchedIndustry = selectedIndustry === 'All' || project.industry === selectedIndustry;
      return matchedQuery && matchedIndustry;
    });
  }, [projects, searchTerm, selectedIndustry]);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / ITEMS_PER_PAGE));
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProjects.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  async function fetchDataFromSheet(isForced = false) {
    if (isForced) {
      setIsRefreshing(true);
      setStatusText('MENGHUBUNGKAN ULANG...');
    }

    if (!isForced) {
      const cached = window.localStorage.getItem(CACHE_KEY);
      if (cached) {
        try {
          const parsed = JSON.parse(cached) as Project[];
          setProjects(parsed);
          setStatusText('DATA INSTAN (MEMORI BROWSER)');
        } catch {
          window.localStorage.removeItem(CACHE_KEY);
        }
      }
    }

    try {
      const response = await fetch(GOOGLE_SHEETS_API_URL, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }

      const json = (await response.json()) as {
        ok?: boolean;
        data?: unknown;
      };

      const rawRows = Array.isArray(json?.data)
        ? json.data
        : Array.isArray((json?.data as { data?: unknown } | undefined)?.data)
          ? ((json.data as { data?: unknown }).data as unknown[])
          : [];

      const mapped: Project[] = rawRows.map((row, index) => {
        const item = (row ?? {}) as Record<string, string>;
        return {
        company: item.company || 'Tanpa Nama',
        industry: item.industry || 'Lainnya',
        project_desc: item.project_desc || '',
        company_logo: sanitizeHttpUrl(item.company_logo || ''),
        project_image: sanitizeHttpUrl(fixDriveUrl(item.project_image || '')),
        row_index: Number(item.row_index) || index + 2,
        };
      });

      setProjects(mapped);
      window.localStorage.setItem(CACHE_KEY, JSON.stringify(mapped));
      setStatusText('DATABASE TERHUBUNG (TERBARU)');
    } catch {
      if (!projects.length) {
        setStatusText('MODE OFFLINE (API GAGAL)');
      }
    } finally {
      setIsRefreshing(false);
    }
  }

  function openEditModal(rowIndex: number) {
    const project = projects.find((p) => p.row_index === rowIndex);
    if (!project) return;

    setFormProject(project);
    setDescFields(parseDescription(project.project_desc || ''));
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setFormProject(null);
    setDescFields(INITIAL_DESC);
  }

  async function saveData() {
    if (!formProject) return;
    setIsSaving(true);

    const lines: string[] = [];
    (Object.keys(descFields) as (keyof ParsedDescription)[]).forEach((key) => {
      const value = descFields[key].trim();
      if (value) lines.push(`${key}: ${value}`);
    });

    const payload = {
      action: 'edit',
      row_index: formProject.row_index,
      company: formProject.company,
      industry: formProject.industry,
      project_desc: lines.join('\n'),
      project_image: formProject.project_image,
      company_logo: formProject.company_logo,
    };

    try {
      await fetch(GOOGLE_SHEETS_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      closeModal();
      await fetchDataFromSheet(true);
    } catch {
      window.alert('Gagal menyimpan data.');
    } finally {
      setIsSaving(false);
    }
  }

  useEffect(() => {
    fetchDataFromSheet();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedIndustry]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-slate-900 px-4 pb-10 pt-28 text-white sm:px-6 lg:px-8">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -left-16 top-8 h-72 w-72 rounded-full bg-blue-500/30 blur-3xl"
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  x: [0, 40, -10, 0],
                  y: [0, -20, 20, 0],
                  scale: [1, 1.08, 0.96, 1],
                }
          }
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl"
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  x: [0, -30, 25, 0],
                  y: [0, 10, -25, 0],
                  scale: [1, 0.94, 1.1, 1],
                }
          }
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="mx-auto max-w-7xl">
          <motion.h1
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl"
          >
            Daftar Manajemen Proyek
          </motion.h1>
          <motion.p
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 8 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="mt-2 text-center text-xs font-bold tracking-wide text-emerald-300"
          >
            {statusText}
          </motion.p>
          <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 14 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-6 flex flex-col gap-3 rounded-2xl border border-white/20 bg-white/10 p-2.5 backdrop-blur-md sm:flex-row"
          >
            <label className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Cari perusahaan atau deskripsi..."
                className="w-full rounded-xl bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <label className="relative w-full sm:w-64">
              <Filter className="absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full appearance-none rounded-xl bg-white py-3 pl-11 pr-10 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
              >
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry === 'All' ? 'Semua Industri' : industry}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            </label>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            Menampilkan <span className="font-bold text-blue-600">{paginatedProjects.length}</span> dari <span className="font-bold text-blue-600">{filteredProjects.length}</span> data
          </h2>
          <button
            onClick={() => fetchDataFromSheet(true)}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh Data
          </button>
        </div>

        <motion.div
          initial={prefersReducedMotion ? undefined : 'hidden'}
          animate={prefersReducedMotion ? undefined : 'show'}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05,
              },
            },
          }}
          className="grid grid-cols-1 gap-4 xl:grid-cols-2"
        >
          {!filteredProjects.length ? (
            <div className="rounded-xl border border-gray-200 bg-white p-10 text-center text-gray-500 xl:col-span-2">Tidak ada data.</div>
          ) : (
            paginatedProjects.map((project) => (
              <motion.article
                key={project.row_index}
                className="group flex flex-col items-start gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md sm:flex-row sm:gap-6"
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.34, ease: 'easeOut' }}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: -4,
                        boxShadow: '0 18px 38px -22px rgba(15, 23, 42, 0.45)',
                      }
                }
              >
                <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-slate-100 sm:h-36 sm:w-48">
                  {project.project_image ? (
                    <img src={project.project_image} alt="Project" className="h-full w-full object-cover" />
                  ) : null}
                  <div className="absolute -bottom-2 -right-2 flex h-14 w-14 items-center justify-center rounded-tl-xl border-l border-t border-gray-100 bg-white p-1.5 shadow-sm">
                    {project.company_logo ? (
                      <img src={project.company_logo} alt="Logo" className="max-h-full max-w-full object-contain" />
                    ) : null}
                  </div>
                </div>

                <div className="min-w-0 flex-1 py-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h3 className="truncate text-lg font-bold text-gray-900">{project.company}</h3>
                    <span className="rounded border border-blue-100 bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-600">
                      {project.industry}
                    </span>
                  </div>
                  <p
                    className="line-clamp-4 whitespace-pre-line text-sm leading-relaxed text-gray-600"
                    dangerouslySetInnerHTML={{ __html: formatDescForCard(project.project_desc) }}
                  />
                </div>

                <div className="w-full shrink-0 border-t border-gray-100 pt-3 sm:w-auto sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
                  <button
                    onClick={() => openEditModal(project.row_index)}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100"
                  >
                    <Edit3 className="h-4 w-4" />
                    Edit
                  </button>
                </div>
              </motion.article>
            ))
          )}
        </motion.div>

        {filteredProjects.length > ITEMS_PER_PAGE ? (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <motion.button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
            >
              Sebelumnya
            </motion.button>

            <span className="px-2 text-sm font-medium text-gray-600">
              Halaman {currentPage} / {totalPages}
            </span>

            <motion.button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
            >
              Berikutnya
            </motion.button>
          </div>
        ) : null}
      </section>

      <AnimatePresence>
        {isModalOpen && formProject ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={prefersReducedMotion ? undefined : { opacity: 0 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={closeModal}
              initial={prefersReducedMotion ? undefined : { opacity: 0 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            />
            <motion.div
              className="relative mx-4 flex max-h-[95vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
              initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.96, y: 24 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.97, y: 10 }}
              transition={{ duration: 0.23, ease: 'easeOut' }}
            >
            <div className="flex shrink-0 items-center justify-between border-b border-gray-100 bg-slate-50 px-6 py-4">
              <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800">
                <Edit3 className="h-5 w-5 text-blue-600" /> Kelola Proyek
              </h3>
              <button onClick={closeModal} className="text-gray-400 transition-colors hover:text-gray-600" aria-label="Close modal">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-5 overflow-y-auto p-6">
              <div className="grid grid-cols-1 gap-4 rounded-xl border border-gray-100 bg-gray-50 p-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-bold tracking-wide text-gray-500">NAMA PERUSAHAAN</label>
                  <input
                    value={formProject.company}
                    readOnly
                    className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-200 px-3 py-2 text-sm text-gray-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold tracking-wide text-gray-500">SEKTOR INDUSTRI</label>
                  <input
                    value={formProject.industry}
                    readOnly
                    className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-200 px-3 py-2 text-sm text-gray-500"
                  />
                </div>
              </div>

              {formProject.project_image ? (
                <div>
                  <label className="mb-2 block text-sm font-bold uppercase tracking-wide text-gray-700">Visual Proyek</label>
                  <img
                    src={formProject.project_image}
                    alt="Preview"
                    className="max-h-[450px] w-full rounded-lg border border-gray-200 bg-slate-200 object-contain shadow-inner"
                  />
                </div>
              ) : null}

              <div className="border-t border-gray-100 pt-4">
                <h4 className="mb-3 text-sm font-bold text-gray-800">Detail Deskripsi (Format Seragam)</h4>
                <div className="space-y-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600">1. Kondisi Sebelum (Before)</label>
                    <textarea
                      rows={2}
                      value={descFields.Before}
                      onChange={(e) => setDescFields((prev) => ({ ...prev, Before: e.target.value }))}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-600">2. Beban Kerja</label>
                      <input
                        value={descFields.Beban}
                        onChange={(e) => setDescFields((prev) => ({ ...prev, Beban: e.target.value }))}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-600">3. Produk Schmalz</label>
                      <input
                        value={descFields.Produk}
                        onChange={(e) => setDescFields((prev) => ({ ...prev, Produk: e.target.value }))}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600">4. Kondisi Sesudah (After)</label>
                    <textarea
                      rows={2}
                      value={descFields.After}
                      onChange={(e) => setDescFields((prev) => ({ ...prev, After: e.target.value }))}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600">5. Plant (Opsional)</label>
                    <input
                      value={descFields.Plant}
                      onChange={(e) => setDescFields((prev) => ({ ...prev, Plant: e.target.value }))}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 justify-end gap-3 border-t border-gray-100 bg-gray-50 px-6 py-4">
              <button
                onClick={closeModal}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={saveData}
                disabled={isSaving}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Simpan Data
              </button>
            </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
