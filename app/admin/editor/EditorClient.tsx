/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  Save,
  Send,
  Eye,
  Edit3,
  Image as ImageIcon,
  Link2,
  List,
  ListOrdered,
  Quote,
  Heading2,
  Heading3,
  Heading4,
  Bold,
  Italic,
  Strikethrough,
  Code,
  Sparkles,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Search,
  Maximize2,
  Minimize2,
  Undo2,
  Redo2,
  Table as TableIcon,
  HelpCircle,
  PhoneCall,
  Video,
  FileDown,
  Columns,
  Monitor,
  Tablet,
  Smartphone,
  CheckSquare,
  Minus,
  Star,
  Copy,
  Printer,
  FileText,
  AlertTriangle,
  Lightbulb,
  Check,
  X,
  Upload,
} from 'lucide-react';
import type { ArticleItem } from '@/app/api/admin/articles/route';

const CATEGORIES = ['Produk', 'Tips', 'Ergonomi', 'News', 'Blog'];

const INTERNAL_PRODUCTS = [
  { name: 'Overhead Crane System', url: '/products/overhead-crane' },
  { name: 'Vacuum Tube Lifter', url: '/products/vacuum-lifter' },
  { name: 'Jib Crane Industrial', url: '/products/jib-crane' },
  { name: 'Gantry Crane Portable', url: '/products/gantry-crane' },
  { name: 'Electric Chain Hoist', url: '/products/electric-hoist' },
];

export default function EditorClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [isSlugManual, setIsSlugManual] = useState(false);
  const [category, setCategory] = useState('Produk');
  const [featuredImage, setFeaturedImage] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('Tim Teknis PT Dimensi Quantum Wahyudi');
  const [isFeatured, setIsFeatured] = useState(false);
  const [focusKeyword, setFocusKeyword] = useState('');

  // UI Modes
  const [viewMode, setViewMode] = useState<'editor' | 'split' | 'preview'>('split');
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isZenMode, setIsZenMode] = useState(false);
  const [activeSerpTab, setActiveSerpTab] = useState<'google' | 'social'>('google');

  // Undo/Redo History Stack
  const [history, setHistory] = useState<string[]>(['']);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Auto-Save & Unsaved indicator
  const [isDirty, setIsDirty] = useState(false);
  const [lastAutoSaved, setLastAutoSaved] = useState<string | null>(null);
  const [hasRecoverableDraft, setHasRecoverableDraft] = useState(false);

  // Modals & Popovers
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkText, setLinkText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');
  const [modalImageAlt, setModalImageAlt] = useState('');

  const [isSlashMenuOpen, setIsSlashMenuOpen] = useState(false);
  const [slashSearch, setSlashSearch] = useState('');
  const [slashPos, setSlashPos] = useState({ top: 0, left: 0 });

  // Floating Bubble Toolbar
  const [bubbleToolbar, setBubbleToolbar] = useState<{ visible: boolean; top: number; left: number }>({
    visible: false,
    top: 0,
    left: 0,
  });

  // Loading & Notifications
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(Boolean(editId));
  const [existingSlugs, setExistingSlugs] = useState<string[]>([]);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
    slug?: string;
  } | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);

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

  // Load existing article and list of slugs for collision check
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const res = await fetch('/api/admin/articles');
        if (res.ok) {
          const data = await res.json();
          const articles: ArticleItem[] = data.articles || [];
          setExistingSlugs(articles.map((a) => a.slug));

          if (editId) {
            const target = articles.find((a) => a.id === editId);
            if (target) {
              setTitle(target.title);
              setSlug(target.slug);
              setIsSlugManual(true);
              setCategory(target.category || 'Produk');
              setFeaturedImage(target.featuredImage || '');
              setExcerpt(target.excerpt || '');
              setContent(target.content || '');
              setAuthor(target.author || 'Tim Teknis PT Dimensi Quantum Wahyudi');
              setIsFeatured(Boolean(target.featured));
              setHistory([target.content || '']);
              setHistoryIndex(0);
            }
          }
        }
      } catch (err) {
        console.error('Failed to load initial data:', err);
      } finally {
        setInitialLoading(false);
      }
    };

    loadInitialData();
  }, [editId]);

  // Check LocalStorage for draft recovery
  useEffect(() => {
    const storageKey = `dwq_draft_${editId || 'new'}`;
    const saved = localStorage.getItem(storageKey);
    if (saved && !editId) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.content && parsed.content !== content) {
          setHasRecoverableDraft(true);
        }
      } catch {}
    }
  }, [editId, content]);

  // Auto-Save to localStorage every 10 seconds
  useEffect(() => {
    if (!title && !content) return;
    const timer = setInterval(() => {
      const storageKey = `dwq_draft_${editId || 'new'}`;
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          title,
          slug,
          category,
          featuredImage,
          excerpt,
          content,
          author,
          timestamp: new Date().toLocaleTimeString('id-ID'),
        })
      );
      setLastAutoSaved(new Date().toLocaleTimeString('id-ID'));
    }, 10000);

    return () => clearInterval(timer);
  }, [title, slug, category, featuredImage, excerpt, content, author, editId]);

  // Unsaved changes warning
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  // Undo / Redo history handler
  const updateContentWithHistory = (newVal: string) => {
    setContent(newVal);
    setIsDirty(true);
    setHistory((prev) => {
      const updated = prev.slice(0, historyIndex + 1);
      return [...updated, newVal];
    });
    setHistoryIndex((prev) => prev + 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      setContent(history[prevIndex]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setContent(history[nextIndex]);
    }
  };

  // Keyboard Shortcuts (Ctrl+S, Ctrl+B, Ctrl+I, Ctrl+K, Undo/Redo)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key.toLowerCase() === 's') {
          e.preventDefault();
          handleSave('published');
        } else if (e.key.toLowerCase() === 'b') {
          e.preventDefault();
          insertSnippet('**', '**');
        } else if (e.key.toLowerCase() === 'i') {
          e.preventDefault();
          insertSnippet('*', '*');
        } else if (e.key.toLowerCase() === 'k') {
          e.preventDefault();
          openLinkModal();
        } else if (e.key.toLowerCase() === 'z') {
          if (e.shiftKey) {
            e.preventDefault();
            handleRedo();
          } else {
            e.preventDefault();
            handleUndo();
          }
        } else if (e.key.toLowerCase() === 'y') {
          e.preventDefault();
          handleRedo();
        }
      }
      if (e.key === 'Escape') {
        setIsSlashMenuOpen(false);
        setIsLinkModalOpen(false);
        setIsImageModalOpen(false);
        setBubbleToolbar({ visible: false, top: 0, left: 0 });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // Restore Draft from LocalStorage
  const restoreDraft = () => {
    const storageKey = `dwq_draft_${editId || 'new'}`;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.title) setTitle(parsed.title);
        if (parsed.slug) setSlug(parsed.slug);
        if (parsed.category) setCategory(parsed.category);
        if (parsed.featuredImage) setFeaturedImage(parsed.featuredImage);
        if (parsed.excerpt) setExcerpt(parsed.excerpt);
        if (parsed.content) setContent(parsed.content);
        if (parsed.author) setAuthor(parsed.author);
        setHasRecoverableDraft(false);
        setNotification({ type: 'success', message: 'Draf lokal berhasil dipulihkan!' });
      } catch {}
    }
  };

  // Insert snippet helper
  const insertSnippet = (prefix: string, suffix: string = '', defaultPlaceholder: string = 'teks') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);
    const replacement = `${prefix}${selected || defaultPlaceholder}${suffix}`;

    const newContent = content.substring(0, start) + replacement + content.substring(end);
    updateContentWithHistory(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + replacement.length - suffix.length);
    }, 50);
  };

  // Modals Handlers
  const openLinkModal = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      const selected = content.substring(textarea.selectionStart, textarea.selectionEnd);
      setLinkText(selected || '');
    }
    setLinkUrl('https://');
    setIsLinkModalOpen(true);
  };

  const confirmInsertLink = () => {
    if (!linkUrl) return;
    insertSnippet(`[${linkText || 'Tautan'}](${linkUrl})`, '');
    setIsLinkModalOpen(false);
    setLinkText('');
    setLinkUrl('');
  };

  const confirmInsertImage = () => {
    if (!modalImageUrl) return;
    const tag = `<figure class="my-6 text-center"><img src="${modalImageUrl}" alt="${modalImageAlt || 'Foto Produk Industri'}" class="rounded-2xl w-full object-cover max-h-[500px] shadow-md border border-slate-200" /><figcaption class="text-xs text-slate-500 mt-2 italic">${modalImageAlt || ''}</figcaption></figure>\n`;
    insertSnippet(tag, '');
    setIsImageModalOpen(false);
    setModalImageUrl('');
    setModalImageAlt('');
  };

  // Industrial Table Generator
  const insertIndustrialTable = () => {
    const tableSnippet = `\n<div class="overflow-x-auto my-6">
  <table class="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden text-sm">
    <thead class="bg-slate-100 text-slate-800">
      <tr>
        <th class="px-4 py-2.5 text-left font-bold">Parameter Spesifikasi</th>
        <th class="px-4 py-2.5 text-left font-bold">Kapasitas / Standar</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-200 bg-white">
      <tr class="hover:bg-slate-50">
        <td class="px-4 py-2 font-medium text-slate-900">Kapasitas Angkat (SWL)</td>
        <td class="px-4 py-2 text-slate-600">500 kg - 5.000 kg</td>
      </tr>
      <tr class="hover:bg-slate-50">
        <td class="px-4 py-2 font-medium text-slate-900">Rentang Bentang (Span)</td>
        <td class="px-4 py-2 text-slate-600">Hingga 24 Meter</td>
      </tr>
      <tr class="hover:bg-slate-50">
        <td class="px-4 py-2 font-medium text-slate-900">Tipe Kontrol</td>
        <td class="px-4 py-2 text-slate-600">Pendant Cable / Wireless Remote</td>
      </tr>
    </tbody>
  </table>
</div>\n`;
    insertSnippet(tableSnippet, '');
  };

  // WhatsApp Sales CTA Box
  const insertWhatsAppCTA = () => {
    const ctaSnippet = `\n<div class="my-8 p-6 bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-2xl text-slate-800 shadow-sm">
  <h3 class="text-xl font-extrabold text-slate-900 mb-2">Konsultasi Teknis & Penawaran Sistem Handling</h3>
  <p class="text-sm text-slate-600 mb-4 leading-relaxed">
    Tingkatkan efisiensi dan keamanan lini produksi pabrik Anda bersama tim engineering PT Dimensi Quantum Wahyudi.
  </p>
  <a href="https://wa.me/6281234567890?text=Halo%20Dimensi%20Wahyudi,%20saya%20ingin%20konsultasi%20sistem%20handling" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all">
    Chat WhatsApp Engineering Resmi
  </a>
</div>\n`;
    insertSnippet(ctaSnippet, '');
  };

  // FAQ Accordion Generator (Schema.org ready)
  const insertFaqAccordion = () => {
    const faqSnippet = `\n<div class="my-8 space-y-3">
  <h3 class="text-lg font-bold text-slate-900 mb-3">Pertanyaan Sering Diajukan (FAQ)</h3>
  <details class="p-4 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer group">
    <summary class="font-bold text-slate-800 group-hover:text-cyan-700">Berapa kapasitas beban maksimal yang dapat ditangani?</summary>
    <p class="mt-2 text-sm text-slate-600 leading-relaxed">
      Sistem ini dapat dikustomisasi mulai dari beban ringan 50 kg hingga beban berat 20 ton sesuai spesifikasi material di pabrik Anda.
    </p>
  </details>
  <details class="p-4 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer group">
    <summary class="font-bold text-slate-800 group-hover:text-cyan-700">Apakah PT Dimensi Quantum Wahyudi menyediakan instalasi dan sertifikasi?</summary>
    <p class="mt-2 text-sm text-slate-600 leading-relaxed">
      Ya, kami menyediakan layanan menyeluruh mulai dari survei lapangan, fabrikasi, instalasi oleh teknisi bersertifikat, hingga uji beban (load test).
    </p>
  </details>
</div>\n`;
    insertSnippet(faqSnippet, '');
  };

  // Callout Box
  const insertCallout = (type: 'tip' | 'warning' | 'note') => {
    if (type === 'tip') {
      insertSnippet(
        `\n<div class="my-6 p-4 rounded-xl bg-cyan-50 border-l-4 border-cyan-500 text-cyan-950 text-sm">💡 <strong>Tips Teknis:</strong> Pastikan ruang bebas vertikal (headroom) di pabrik telah diukur secara akurat sebelum instalasi.</div>\n`,
        ''
      );
    } else if (type === 'warning') {
      insertSnippet(
        `\n<div class="my-6 p-4 rounded-xl bg-amber-50 border-l-4 border-amber-500 text-amber-950 text-sm">⚠️ <strong>Peringatan K3:</strong> Wajib melakukan pemeriksaan berkala pada kawat seling dan sistem rem sebelum pengoperasian harian.</div>\n`,
        ''
      );
    } else {
      insertSnippet(
        `\n<div class="my-6 p-4 rounded-xl bg-blue-50 border-l-4 border-blue-500 text-blue-950 text-sm">📘 <strong>Catatan Rekayasa:</strong> Penggunaan material paduan baja khusus memberikan durabilitas optimal pada lingkungan korosif.</div>\n`,
        ''
      );
    }
  };

  // YouTube Lazy Video Embedder
  const insertYouTubeVideo = () => {
    const url = prompt('Masukkan URL Video YouTube (contoh: https://www.youtube.com/watch?v=dQw4w9WgXcQ):');
    if (!url) return;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    const videoId = match ? match[1] : '';
    if (videoId) {
      const snippet = `\n<div class="my-6 aspect-video rounded-2xl overflow-hidden shadow-md border border-slate-200">
  <iframe class="w-full h-full" src="https://www.youtube-nocookie.com/embed/${videoId}" title="Video Demonstrasi Produk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>\n`;
      insertSnippet(snippet, '');
    } else {
      alert('URL YouTube tidak valid.');
    }
  };

  // Lead Magnet Brochure Download Box
  const insertLeadMagnet = () => {
    const snippet = `\n<div class="my-6 p-5 bg-slate-100 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
  <div class="flex items-center gap-3.5">
    <div class="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg">📄</div>
    <div>
      <div class="font-bold text-slate-900 text-sm">Unduh Brosur & Spesifikasi Teknis (PDF)</div>
      <div class="text-xs text-slate-500">Katalog resmi PT Dimensi Quantum Wahyudi</div>
    </div>
  </div>
  <a href="/contact" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all whitespace-nowrap">
    Minta Katalog PDF
  </a>
</div>\n`;
    insertSnippet(snippet, '');
  };

  // Client-Side Image WebP Compression & Drag-and-Drop file picker
  const handleImageFileSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Mohon pilih file gambar (JPG, PNG, atau WebP).');
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement('img');
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxDimension = 1400;
          let width = img.width;
          let height = img.height;

          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const webpDataUrl = canvas.toDataURL('image/webp', 0.85);
            setFeaturedImage(webpDataUrl);
            setNotification({
              type: 'success',
              message: `✓ Gambar berhasil dikompresi ke WebP (${Math.round(webpDataUrl.length / 1024)} KB)!`,
            });
          }
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    } catch {
      alert('Gagal mengompres gambar.');
    }
  };

  // Auto SEO Excerpt Generator
  const generateAutoExcerpt = () => {
    const cleanText = content
      .replace(/<[^>]+>/g, '')
      .replace(/[#*`_\[\]()>-]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (cleanText) {
      setExcerpt(cleanText.slice(0, 155));
      setNotification({ type: 'success', message: 'Ringkasan SEO berhasil dibuat otomatis dari isi artikel!' });
    }
  };

  // Word & Reading Time stats
  const stats = useMemo(() => {
    const textOnly = content.replace(/<[^>]+>/g, '').replace(/[#*`_\[\]()>-]/g, '');
    const words = textOnly.trim().split(/\s+/).filter(Boolean).length;
    const chars = textOnly.length;
    const readingTime = Math.max(1, Math.ceil(words / 200));
    return { words, chars, readingTime };
  }, [content]);

  // SEO Score calculation
  const seoAudit = useMemo(() => {
    const hasGoodTitle = title.length >= 35 && title.length <= 70;
    const hasExcerpt = excerpt.length >= 60 && excerpt.length <= 160;
    const hasImage = Boolean(featuredImage);
    const hasH2 = content.includes('## ') || content.includes('<h2');
    const hasWordCount = stats.words >= 250;

    let score = 0;
    if (hasGoodTitle) score += 20;
    if (hasExcerpt) score += 20;
    if (hasImage) score += 20;
    if (hasH2) score += 20;
    if (hasWordCount) score += 20;

    return {
      score,
      hasGoodTitle,
      hasExcerpt,
      hasImage,
      hasH2,
      hasWordCount,
    };
  }, [title, excerpt, featuredImage, content, stats.words]);

  // Dynamic Table of Contents (ToC)
  const tableOfContents = useMemo(() => {
    const headings: { text: string; level: number }[] = [];
    const lines = content.split('\n');
    lines.forEach((line) => {
      const match = line.match(/^(#{2,3})\s+(.*)$/);
      if (match) {
        headings.push({
          level: match[1].length,
          text: match[2].trim(),
        });
      }
    });
    return headings;
  }, [content]);

  // Slug Conflict Warning
  const isSlugConflict = useMemo(() => {
    if (!slug) return false;
    return existingSlugs.includes(slug) && slug !== (editId ? slug : '');
  }, [slug, existingSlugs, editId]);

  // Save handler
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
      featured: isFeatured,
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
        setIsDirty(false);
        const publishedSlug = data.article?.slug || slug;
        setNotification({
          type: 'success',
          message:
            status === 'published'
              ? '🎉 Artikel berhasil diterbitkan dan langsung tayang!'
              : '✓ Draf artikel tersimpan rapi!',
          slug: publishedSlug,
        });

        // Clean draft in localStorage
        localStorage.removeItem(`dwq_draft_${editId || 'new'}`);

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

  // Export raw Markdown or HTML
  const downloadSourceFile = (format: 'md' | 'html') => {
    const filename = `${slug || 'artikel'}.${format}`;
    const fileContent =
      format === 'md'
        ? `# ${title}\n\n${content}`
        : `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${title}</title></head><body><h1>${title}</h1>${content}</body></html>`;

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Print official brochure
  const handlePrintBrochure = () => {
    window.print();
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500">
        <div className="flex items-center gap-3 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <Sparkles className="animate-spin text-cyan-600" size={20} />
          <span className="font-semibold text-sm">Memuat editor artikel...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={editorContainerRef}
      className={`min-h-screen bg-slate-50 text-slate-800 selection:bg-cyan-500 selection:text-white ${
        isZenMode ? 'fixed inset-0 z-50 overflow-y-auto bg-white p-6 sm:p-12' : 'pb-24'
      }`}
    >
      {/* Top Action Bar */}
      {!isZenMode && (
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/admin"
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors"
                title="Kembali ke Dashboard"
              >
                <ArrowLeft size={16} />
              </Link>
              <div>
                <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                  {editId ? 'Edit Artikel' : 'Tulis Artikel Baru'}
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] font-semibold text-slate-400">
                    {lastAutoSaved ? `Tersimpan draf lokal pukul ${lastAutoSaved}` : 'Auto-Save Aktif'}
                  </span>
                  {isDirty && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" title="Ada perubahan belum disimpan" />
                  )}
                </div>
              </div>
            </div>

            {/* Center: View Mode Switcher */}
            <div className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setViewMode('editor')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'editor' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Editor Saja
              </button>
              <button
                onClick={() => setViewMode('split')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'split' ? 'bg-white text-cyan-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Split-View
              </button>
              <button
                onClick={() => setViewMode('preview')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'preview' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Full Preview
              </button>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              {/* Zen Fullscreen */}
              <button
                onClick={() => setIsZenMode(true)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                title="Zen Mode / Layar Penuh Bebas Gangguan"
              >
                <Maximize2 size={15} />
              </button>

              {/* Draft Button */}
              <button
                onClick={() => handleSave('draft')}
                disabled={loading}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 transition-colors flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
              >
                <Save size={14} />
                <span className="hidden sm:inline">Simpan Draft</span>
              </button>

              {/* Publish Button */}
              <button
                onClick={() => handleSave('published')}
                disabled={loading}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-cyan-600/20 transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
              >
                <Send size={14} />
                <span>{loading ? 'Menerbitkan...' : 'Publish'}</span>
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Zen Mode Exit Button */}
      {isZenMode && (
        <button
          onClick={() => setIsZenMode(false)}
          className="fixed top-6 right-6 z-50 p-3 rounded-2xl bg-slate-900 text-white shadow-xl hover:bg-slate-800 transition-all flex items-center gap-2 text-xs font-bold"
        >
          <Minimize2 size={16} />
          <span>Keluar Zen Mode</span>
        </button>
      )}

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Recovery Notification */}
        {hasRecoverableDraft && (
          <div className="p-4 rounded-2xl bg-cyan-50 border border-cyan-200 text-cyan-900 flex items-center justify-between gap-4 text-xs font-semibold animate-in fade-in">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-cyan-600" />
              <span>Ditemukan naskah draf otomatis yang belum sempat Anda simpan ke server.</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={restoreDraft}
                className="px-3 py-1.5 rounded-xl bg-cyan-600 text-white font-bold hover:bg-cyan-700 transition-all"
              >
                Pulihkan Draf
              </button>
              <button
                onClick={() => setHasRecoverableDraft(false)}
                className="px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
              >
                Abaikan
              </button>
            </div>
          </div>
        )}

        {/* Status Notification */}
        {notification && (
          <div
            className={`p-4 rounded-2xl border flex items-center justify-between gap-4 animate-in fade-in ${
              notification.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-red-50 border-red-200 text-red-800'
            }`}
          >
            <div className="flex items-center gap-2.5 text-xs font-bold">
              {notification.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
              <span>{notification.message}</span>
            </div>
            {notification.slug && (
              <Link
                href={`/news/${notification.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
              >
                <span>Lihat di Website</span>
                <ExternalLink size={13} />
              </Link>
            )}
          </div>
        )}

        {/* Title & Slug Section */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Judul Artikel (H1) *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setIsDirty(true);
              }}
              placeholder="Contoh: Keunggulan Vacuum Tube Lifter untuk Industri Logam & Manufaktur"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-base sm:text-xl font-extrabold placeholder-slate-400 focus:bg-white focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500/20 transition-all"
            />
          </div>

          {/* Slug & Conflict Warning */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 font-mono text-slate-500">
              <span>Permalink:</span>
              <span className="text-slate-400">/news/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setIsSlugManual(true);
                  setIsDirty(true);
                }}
                className={`bg-slate-50 px-2.5 py-1 rounded-lg border font-mono font-semibold focus:outline-none focus:bg-white ${
                  isSlugConflict
                    ? 'border-red-400 text-red-600'
                    : 'border-slate-200 text-cyan-700 focus:border-cyan-600'
                }`}
              />
            </div>
            {isSlugConflict ? (
              <span className="text-red-600 font-bold flex items-center gap-1">
                <AlertTriangle size={13} /> Slug ini sudah dipakai artikel lain!
              </span>
            ) : (
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <Check size={13} /> Permalink Tersedia
              </span>
            )}
          </div>
        </section>

        {/* Main Grid Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Columns (Editor / Split / Preview) */}
          <div className={`space-y-6 ${viewMode === 'preview' ? 'lg:col-span-3' : 'lg:col-span-2'}`}>
            {/* Editor Workspace Box */}
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
              {/* Comprehensive Toolbar */}
              <div className="bg-slate-50 border-b border-slate-200 p-2.5 flex flex-wrap items-center justify-between gap-2">
                {/* Formatting Tools */}
                <div className="flex items-center flex-wrap gap-1 text-slate-700">
                  {/* Undo / Redo */}
                  <button
                    type="button"
                    onClick={handleUndo}
                    disabled={historyIndex <= 0}
                    className="p-2 rounded-lg hover:bg-slate-200 disabled:opacity-30 cursor-pointer"
                    title="Undo (Ctrl + Z)"
                  >
                    <Undo2 size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={handleRedo}
                    disabled={historyIndex >= history.length - 1}
                    className="p-2 rounded-lg hover:bg-slate-200 disabled:opacity-30 cursor-pointer"
                    title="Redo (Ctrl + Y)"
                  >
                    <Redo2 size={15} />
                  </button>

                  <div className="w-[1px] h-5 bg-slate-200 mx-1" />

                  {/* Headings */}
                  <button
                    type="button"
                    onClick={() => insertSnippet('## ', '\n', 'Subjudul H2')}
                    className="p-2 rounded-lg hover:bg-slate-200 font-bold text-xs cursor-pointer"
                    title="Heading 2"
                  >
                    <Heading2 size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet('### ', '\n', 'Subjudul H3')}
                    className="p-2 rounded-lg hover:bg-slate-200 font-bold text-xs cursor-pointer"
                    title="Heading 3"
                  >
                    <Heading3 size={15} />
                  </button>

                  <div className="w-[1px] h-5 bg-slate-200 mx-1" />

                  {/* Inline Formats */}
                  <button
                    type="button"
                    onClick={() => insertSnippet('**', '**')}
                    className="p-2 rounded-lg hover:bg-slate-200 cursor-pointer"
                    title="Tebal (Ctrl + B)"
                  >
                    <Bold size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet('*', '*')}
                    className="p-2 rounded-lg hover:bg-slate-200 cursor-pointer"
                    title="Miring (Ctrl + I)"
                  >
                    <Italic size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet('~~', '~~')}
                    className="p-2 rounded-lg hover:bg-slate-200 cursor-pointer"
                    title="Coret (Strikethrough)"
                  >
                    <Strikethrough size={15} />
                  </button>

                  <div className="w-[1px] h-5 bg-slate-200 mx-1" />

                  {/* Lists & Quotes */}
                  <button
                    type="button"
                    onClick={() => insertSnippet('- ', '\n')}
                    className="p-2 rounded-lg hover:bg-slate-200 cursor-pointer"
                    title="Bullet List"
                  >
                    <List size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet('1. ', '\n')}
                    className="p-2 rounded-lg hover:bg-slate-200 cursor-pointer"
                    title="Numbered List"
                  >
                    <ListOrdered size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet('> ', '\n')}
                    className="p-2 rounded-lg hover:bg-slate-200 cursor-pointer"
                    title="Kutipan / Blockquote"
                  >
                    <Quote size={15} />
                  </button>

                  <div className="w-[1px] h-5 bg-slate-200 mx-1" />

                  {/* Links & Media Modals */}
                  <button
                    type="button"
                    onClick={openLinkModal}
                    className="p-2 rounded-lg hover:bg-slate-200 text-cyan-700 cursor-pointer"
                    title="Sisipkan Tautan (Ctrl + K)"
                  >
                    <Link2 size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsImageModalOpen(true)}
                    className="p-2 rounded-lg hover:bg-slate-200 text-cyan-700 cursor-pointer"
                    title="Sisipkan Gambar di Dalam Teks"
                  >
                    <ImageIcon size={15} />
                  </button>

                  <div className="w-[1px] h-5 bg-slate-200 mx-1" />

                  {/* Industrial Modules */}
                  <button
                    type="button"
                    onClick={insertIndustrialTable}
                    className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    title="Sisipkan Tabel Spesifikasi Mesin"
                  >
                    <TableIcon size={14} className="text-cyan-600" />
                    <span>Tabel Spek</span>
                  </button>

                  <button
                    type="button"
                    onClick={insertWhatsAppCTA}
                    className="px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    title="Sisipkan Box Konsultasi WhatsApp"
                  >
                    <PhoneCall size={14} className="text-emerald-600" />
                    <span>Box WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={insertFaqAccordion}
                    className="px-2.5 py-1.5 rounded-lg bg-blue-50 border border-blue-200 hover:bg-blue-100 text-blue-800 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    title="Sisipkan Tanya Jawab (FAQ Schema)"
                  >
                    <HelpCircle size={14} className="text-blue-600" />
                    <span>FAQ</span>
                  </button>

                  <button
                    type="button"
                    onClick={insertYouTubeVideo}
                    className="p-2 rounded-lg hover:bg-slate-200 text-red-600 cursor-pointer"
                    title="Sisipkan Video YouTube Demo"
                  >
                    <Video size={15} />
                  </button>

                  <button
                    type="button"
                    onClick={insertLeadMagnet}
                    className="p-2 rounded-lg hover:bg-slate-200 text-blue-600 cursor-pointer"
                    title="Sisipkan Box Unduh Katalog Brosur"
                  >
                    <FileDown size={15} />
                  </button>
                </div>

                {/* Word Stats Badge */}
                <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 bg-white px-2.5 py-1 rounded-xl border border-slate-200">
                  <span>⏱️ {stats.readingTime} mnt baca</span>
                  <span>·</span>
                  <span>{stats.words} kata</span>
                </div>
              </div>

              {/* Editor & Preview Area */}
              <div
                className={`grid ${
                  viewMode === 'split' ? 'grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200' : 'grid-cols-1'
                }`}
              >
                {/* Textarea Editor */}
                {(viewMode === 'editor' || viewMode === 'split') && (
                  <div className="p-4 sm:p-6 bg-white relative">
                    <textarea
                      ref={textareaRef}
                      value={content}
                      onChange={(e) => {
                        updateContentWithHistory(e.target.value);
                      }}
                      rows={22}
                      placeholder="Mulai ketik artikel Anda di sini... (Ketik ## untuk subjudul, atau klik tombol di toolbar atas)"
                      className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-sm font-sans leading-relaxed focus:outline-none resize-y min-h-[480px]"
                    />
                  </div>
                )}

                {/* Live Preview Pane */}
                {(viewMode === 'preview' || viewMode === 'split') && (
                  <div className="p-4 sm:p-6 bg-slate-50/60 overflow-y-auto max-h-[650px]">
                    {/* Device Switcher (Preview Mode) */}
                    {viewMode === 'preview' && (
                      <div className="flex items-center justify-center gap-2 mb-6">
                        <button
                          onClick={() => setDevicePreview('desktop')}
                          className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                            devicePreview === 'desktop'
                              ? 'bg-cyan-600 text-white shadow-xs'
                              : 'bg-white border border-slate-200 text-slate-600'
                          }`}
                        >
                          <Monitor size={14} /> Desktop (100%)
                        </button>
                        <button
                          onClick={() => setDevicePreview('tablet')}
                          className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                            devicePreview === 'tablet'
                              ? 'bg-cyan-600 text-white shadow-xs'
                              : 'bg-white border border-slate-200 text-slate-600'
                          }`}
                        >
                          <Tablet size={14} /> Tablet (768px)
                        </button>
                        <button
                          onClick={() => setDevicePreview('mobile')}
                          className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                            devicePreview === 'mobile'
                              ? 'bg-cyan-600 text-white shadow-xs'
                              : 'bg-white border border-slate-200 text-slate-600'
                          }`}
                        >
                          <Smartphone size={14} /> HP Frame (375px)
                        </button>
                      </div>
                    )}

                    {/* Article Container Preview */}
                    <div
                      className={`mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm transition-all ${
                        devicePreview === 'mobile' && viewMode === 'preview'
                          ? 'max-w-[390px] border-4 border-slate-800 rounded-[40px]'
                          : devicePreview === 'tablet' && viewMode === 'preview'
                          ? 'max-w-[768px]'
                          : 'max-w-none'
                      }`}
                    >
                      {/* Featured Image */}
                      {featuredImage && (
                        <div className="relative aspect-video w-full mb-6 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                          <img src={featuredImage} alt={title} className="w-full h-full object-cover" />
                        </div>
                      )}

                      {/* Title */}
                      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
                        {title || 'Judul Artikel Anda'}
                      </h1>

                      {/* Meta info */}
                      <div className="flex items-center gap-3 text-xs text-slate-500 mb-6 border-b border-slate-100 pb-4">
                        <span className="px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 font-bold uppercase tracking-wider">
                          {category}
                        </span>
                        <span>Oleh: {author}</span>
                        <span>·</span>
                        <span>{stats.readingTime} mnt baca</span>
                      </div>

                      {/* Content Preview Render */}
                      <div
                        className="text-slate-800 leading-relaxed space-y-4 text-sm"
                        dangerouslySetInnerHTML={{
                          __html: content
                            .replace(/^## (.*$)/gim, '<h2 class="text-xl sm:text-2xl font-bold text-slate-900 mt-6 mb-2 tracking-tight">$1</h2>')
                            .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold text-slate-800 mt-4 mb-2 tracking-tight">$1</h3>')
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/\*(.*?)\*/g, '<em>$1</em>')
                            .replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-cyan-500 pl-4 py-1 italic text-slate-600 bg-slate-50 rounded-r-lg my-4">$1</blockquote>')
                            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-cyan-600 underline font-semibold hover:text-cyan-700">$1</a>')
                            .replace(/\n\n/g, '<p class="text-slate-700 leading-relaxed my-3"></p>')
                            .replace(/\n/g, '<br />'),
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Internal Product Links Box */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                🔗 Sisipkan Internal Link Produk Dimensi Wahyudi:
              </span>
              <div className="flex flex-wrap gap-2">
                {INTERNAL_PRODUCTS.map((prod) => (
                  <button
                    key={prod.url}
                    type="button"
                    onClick={() => insertSnippet(`[${prod.name}](${prod.url})`, '')}
                    className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-cyan-50 border border-slate-200 hover:border-cyan-200 text-xs font-semibold text-slate-700 hover:text-cyan-800 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span>+ {prod.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar Settings, Media & SEO (1 Col) */}
          <div className="space-y-6">
            {/* Category & Featured Pin */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Kategori Artikel
                </label>
                <button
                  type="button"
                  onClick={() => setIsFeatured(!isFeatured)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    isFeatured
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                  title="Tandai sebagai artikel Featured di halaman depan"
                >
                  <Star size={13} className={isFeatured ? 'fill-amber-500 text-amber-500' : ''} />
                  <span>{isFeatured ? 'Featured ⭐' : 'Jadikan Featured'}</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setCategory(cat);
                      setIsDirty(true);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      category === cat
                        ? 'bg-cyan-600 text-white shadow-xs'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Image & WebP Compressor */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                Featured Cover Image
              </label>

              {/* Direct Upload / Drag & Drop */}
              <label className="block p-4 rounded-2xl border-2 border-dashed border-slate-200 hover:border-cyan-500 bg-slate-50 hover:bg-cyan-50/50 transition-all text-center cursor-pointer">
                <Upload size={20} className="mx-auto mb-1.5 text-slate-400" />
                <span className="text-xs font-bold text-slate-700 block">Pilih / Drag Foto dari Komputer</span>
                <span className="text-[11px] text-slate-400 block mt-0.5">Otomatis dikonversi & kompres ke WebP ringan</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageFileSelect(file);
                  }}
                  className="hidden"
                />
              </label>

              <div className="relative">
                <input
                  type="text"
                  value={featuredImage}
                  onChange={(e) => {
                    setFeaturedImage(e.target.value);
                    setIsDirty(true);
                  }}
                  placeholder="Atau tempel URL gambar eksternal di sini..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-cyan-600"
                />
              </div>

              {featuredImage ? (
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                  <img src={featuredImage} alt="Cover Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setFeaturedImage('')}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 text-red-600 hover:bg-red-50 text-xs shadow-xs"
                    title="Hapus gambar"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : null}
            </div>

            {/* SEO Excerpt & Google Snippet */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Ringkasan Meta (SEO)
                </label>
                <button
                  type="button"
                  onClick={generateAutoExcerpt}
                  className="text-[11px] font-bold text-cyan-600 hover:text-cyan-700 flex items-center gap-1 cursor-pointer"
                  title="Generate otomatis dari paragraf pertama artikel"
                >
                  <Sparkles size={12} />
                  <span>Auto Generate</span>
                </button>
              </div>

              <textarea
                value={excerpt}
                onChange={(e) => {
                  setExcerpt(e.target.value);
                  setIsDirty(true);
                }}
                rows={3}
                placeholder="Deskripsi singkat artikel untuk cuplikan Google Search..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-cyan-600"
              />

              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Panjang ideal: 120-160 karakter</span>
                <span className={excerpt.length > 160 ? 'text-amber-600 font-bold' : ''}>
                  {excerpt.length}/160
                </span>
              </div>

              {/* SERP Preview */}
              <div className="mt-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <span className="w-4 h-4 rounded-full bg-cyan-600 text-white flex items-center justify-center text-[9px] font-bold">
                    D
                  </span>
                  <span className="font-semibold text-slate-700">dimensiwahyudi.com</span>
                  <span>› news › {slug || 'artikel'}</span>
                </div>
                <div className="text-sm font-bold text-blue-800 line-clamp-1">
                  {title || 'Judul Artikel Anda di Google'} | Insights Dimensi Wahyudi
                </div>
                <div className="text-xs text-slate-600 line-clamp-2">
                  {excerpt || 'Teks ringkasan meta artikel Anda akan muncul di hasil pencarian Google seperti ini.'}
                </div>
              </div>
            </div>

            {/* SEO Auditor Checklist */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Skor Kesiapan SEO
                </label>
                <span
                  className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${
                    seoAudit.score >= 80
                      ? 'bg-emerald-100 text-emerald-800'
                      : seoAudit.score >= 60
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {seoAudit.score}/100
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  {seoAudit.hasGoodTitle ? (
                    <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                  ) : (
                    <AlertCircle size={14} className="text-slate-300 shrink-0" />
                  )}
                  <span className={seoAudit.hasGoodTitle ? 'text-slate-700' : 'text-slate-400'}>
                    Panjang judul ideal (35-70 karakter)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {seoAudit.hasExcerpt ? (
                    <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                  ) : (
                    <AlertCircle size={14} className="text-slate-300 shrink-0" />
                  )}
                  <span className={seoAudit.hasExcerpt ? 'text-slate-700' : 'text-slate-400'}>
                    Ringkasan Meta SEO lengkap
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {seoAudit.hasImage ? (
                    <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                  ) : (
                    <AlertCircle size={14} className="text-slate-300 shrink-0" />
                  )}
                  <span className={seoAudit.hasImage ? 'text-slate-700' : 'text-slate-400'}>
                    Featured Cover Image terpasang
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {seoAudit.hasH2 ? (
                    <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                  ) : (
                    <AlertCircle size={14} className="text-slate-300 shrink-0" />
                  )}
                  <span className={seoAudit.hasH2 ? 'text-slate-700' : 'text-slate-400'}>
                    Memiliki Subjudul (Heading H2)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {seoAudit.hasWordCount ? (
                    <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                  ) : (
                    <AlertCircle size={14} className="text-slate-300 shrink-0" />
                  )}
                  <span className={seoAudit.hasWordCount ? 'text-slate-700' : 'text-slate-400'}>
                    Panjang artikel memadai (&gt; 250 kata)
                  </span>
                </div>
              </div>
            </div>

            {/* Table of Contents Dynamic Preview */}
            {tableOfContents.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Daftar Isi Otomatis
                </label>
                <div className="space-y-1 text-xs">
                  {tableOfContents.map((h, i) => (
                    <div
                      key={i}
                      className={`text-slate-600 line-clamp-1 ${h.level === 3 ? 'pl-4 text-slate-500' : 'font-medium'}`}
                    >
                      • {h.text}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Export & Print Options */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Ekspor & Cetak Brosur
              </label>
              <button
                type="button"
                onClick={handlePrintBrochure}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer size={14} className="text-cyan-600" />
                <span>Cetak Brosur PDF Resmi</span>
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => downloadSourceFile('md')}
                  className="flex-1 py-2 px-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-semibold cursor-pointer"
                >
                  Unduh .MD
                </button>
                <button
                  type="button"
                  onClick={() => downloadSourceFile('html')}
                  className="flex-1 py-2 px-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-semibold cursor-pointer"
                >
                  Unduh .HTML
                </button>
              </div>
            </div>

            {/* Author */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Penulis (Author)
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => {
                  setAuthor(e.target.value);
                  setIsDirty(true);
                }}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-cyan-600"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Link Modal */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Link2 size={18} className="text-cyan-600" />
              <span>Sisipkan Tautan (Link)</span>
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Teks Tautan</label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="Contoh: Kunjungi Katalog Vacuum Lifter"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-cyan-600"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">URL Tujuan</label>
                <input
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://... atau /products/..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-cyan-600 font-mono"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsLinkModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={confirmInsertLink}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold cursor-pointer"
              >
                Sisipkan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ImageIcon size={18} className="text-cyan-600" />
              <span>Sisipkan Gambar dalam Artikel</span>
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">URL Gambar</label>
                <input
                  type="text"
                  value={modalImageUrl}
                  onChange={(e) => setModalImageUrl(e.target.value)}
                  placeholder="https://.../gambar.webp"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-cyan-600 font-mono"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Keterangan / Caption Gambar</label>
                <input
                  type="text"
                  value={modalImageAlt}
                  onChange={(e) => setModalImageAlt(e.target.value)}
                  placeholder="Contoh: Instalasi Overhead Crane 5 Ton di Pabrik Manufaktur"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-cyan-600"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsImageModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={confirmInsertImage}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold cursor-pointer"
              >
                Sisipkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
