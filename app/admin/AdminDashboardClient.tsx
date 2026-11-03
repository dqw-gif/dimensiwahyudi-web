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
  Building2,
  Inbox,
  Mail,
  Phone,
  MessageSquare,
  Bot,
  ArrowRight,
  ArrowUpRight,
  Eye,
  Check,
  Send,
  Calendar,
  Sparkles,
  Camera,
  Upload,
  ImageIcon,
} from 'lucide-react';
import type { ArticleItem } from '@/app/api/admin/articles/route';
import type { LeadItem } from '@/app/api/admin/leads/route';
import { projects as defaultProjects, type Project } from '@/data/projects';
import { ChatMarkdown } from '@/lib/ai/chat-markdown';

interface Props {
  initialLegacyCount: number;
  initialTab?: 'articles' | 'projects' | 'leads';
}

const ITEMS_PER_PAGE = 15;
const CATEGORIES = ['All', 'Products', 'Tips', 'Ergonomics', 'News', 'Blog'];

export default function AdminDashboardClient({ initialLegacyCount, initialTab = 'articles' }: Props) {
  const router = useRouter();

  // Tab State: 'articles' | 'projects' | 'leads' (Synced with URL slug)
  const [activeTab, setActiveTab] = useState<'articles' | 'projects' | 'leads'>(initialTab);

  const switchTab = (tab: 'articles' | 'projects' | 'leads') => {
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', `/admin/${tab}`);
    }
  };

  // Articles State
  const [firestoreArticles, setFirestoreArticles] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft' | 'featured'>('all');
  const [categoryFilter, setCategoryFilter] = useState('All');
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

  // Projects State (with CRUD capabilities)
  const [projectList, setProjectList] = useState<Project[]>(defaultProjects);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [projectSearch, setProjectSearch] = useState('');
  const [projectIndustryFilter, setProjectIndustryFilter] = useState('All');
  const [selectedProjectPreview, setSelectedProjectPreview] = useState<Project | null>(null);
  
  // Project Editor Modal State
  const [isProjectEditorOpen, setIsProjectEditorOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectFormData, setProjectFormData] = useState<Project>({
    id: '',
    client: '',
    industry: 'Automotive & Transportation',
    image: '/projects/PT Mayora Indah.webp',
    logo: '/images/clients/logo-pt-mayora-indah.webp',
    size: 'standard',
    desc: '',
    color: 'blue',
  });
  const [isSavingProject, setIsSavingProject] = useState(false);

  // Leads State
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [leadSearch, setLeadSearch] = useState('');
  const [leadTypeFilter, setLeadTypeFilter] = useState('All');
  const [selectedLeadForTranscript, setSelectedLeadForTranscript] = useState<LeadItem | null>(null);

  // AI Writer Wizard State
  const [isWriteMenuOpen, setIsWriteMenuOpen] = useState(false);
  const [isAiWriterOpen, setIsAiWriterOpen] = useState(false);
  const [aiWizardStep, setAiWizardStep] = useState<1 | 2 | 3>(1);
  const [aiInput, setAiInput] = useState({
    topic: '',
    industry: 'FMCG & F&B',
    productFocus: 'Schmalz JumboErgo',
    problemTarget: 'Nyeri punggung bawah operator dan bottleneck pemindahan berulang',
    tone: 'Otoritatif Teknikal & Standar K3',
  });
  const [aiOutline, setAiOutline] = useState<any>(null);
  const [aiGeneratedArticle, setAiGeneratedArticle] = useState<any>(null);
  const [isGeneratingOutline, setIsGeneratingOutline] = useState(false);
  const [isGeneratingArticle, setIsGeneratingArticle] = useState(false);
  const [additionalEditorialNotes, setAdditionalEditorialNotes] = useState('');
  const [trendingTopics, setTrendingTopics] = useState<any[]>([]);
  const [isFetchingTrending, setIsFetchingTrending] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [activeImagePromptTab, setActiveImagePromptTab] = useState(0);

  // Media Picker & Direct Photo Upload State
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [mediaPickerTarget, setMediaPickerTarget] = useState<'image' | 'logo'>('image');
  const [quickPhotoProject, setQuickPhotoProject] = useState<Project | null>(null);
  const [mediaLibrary, setMediaLibrary] = useState<{ name: string; url: string }[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);
  const [mediaFilterSearch, setMediaFilterSearch] = useState('');
  const [showManualUrlInput, setShowManualUrlInput] = useState(false);

  const showToast = (type: 'success' | 'error' | 'info', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 5000);
  };

  // Fetch Articles
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

  // Fetch Projects (with Firestore overrides)
  const fetchProjects = useCallback(async () => {
    setLoadingProjects(true);
    try {
      const res = await fetch('/api/admin/projects');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.projects)) {
          setProjectList(data.projects);
        }
      }
    } catch (e) {
      console.error('Failed to load projects:', e);
    } finally {
      setLoadingProjects(false);
    }
  }, []);

  // Fetch Leads
  const fetchLeads = useCallback(async () => {
    setLoadingLeads(true);
    try {
      const res = await fetch('/api/admin/leads');
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
      }
    } catch (e) {
      console.error('Failed to load leads:', e);
    } finally {
      setLoadingLeads(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
    fetchProjects();
    fetchLeads();
  }, [fetchArticles, fetchProjects, fetchLeads]);

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
    if (!confirm('Sinkronisasi artikel terbaru dari WordPress ke database Firestore?')) return;
    setIsSyncing(true);
    try {
      const res = await fetch('/api/admin/sync-wordpress', { method: 'POST' });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast('success', data.message || 'Sinkronisasi berhasil!');
        fetchArticles();
      } else {
        showToast('error', data.error || 'Sync failed');
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
        showToast('success', nextFeatured ? 'Artikel ditandai sebagai Unggulan' : 'Tanda unggulan dilepas');
      }
    } catch {
      showToast('error', 'Gagal memperbarui artikel unggulan');
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
          showToast('success', 'Artikel berhasil disalin sebagai draf baru.');
        }
      }
    } catch {
      showToast('error', 'Gagal menduplikasi artikel');
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
        `backup-articles-dimensiwahyudi-${new Date().toISOString().slice(0, 10)}.json`
      );
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('success', 'Backup database artikel (JSON) berhasil diunduh.');
    } catch {
      showToast('error', 'Gagal mengekspor data artikel.');
    }
  };

  // Confirm Delete Article
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
        showToast('success', `${selectedIds.length} artikel diperbarui ke ${status.toUpperCase()}.`);
      }
    } catch {
      showToast('error', 'Gagal memperbarui artikel secara massal.');
    } finally {
      setIsBulkProcessing(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Hapus permanen ${selectedIds.length} artikel yang dipilih?`)) return;
    setIsBulkProcessing(true);
    try {
      const res = await fetch(`/api/admin/articles?id=${selectedIds.join(',')}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setFirestoreArticles((prev) => prev.filter((a) => !selectedIds.includes(a.id)));
        setSelectedIds([]);
        showToast('success', 'Artikel terpilih berhasil dihapus.');
      }
    } catch {
      showToast('error', 'Gagal menghapus artikel terpilih.');
    } finally {
      setIsBulkProcessing(false);
    }
  };

  // AI Writer Handlers
  // Fetch Trending Topics via Magic Wand
  const handleFetchTrendingTopics = async () => {
    setIsFetchingTrending(true);
    try {
      const res = await fetch('/api/admin/ai/trending-topics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          industry: aiInput.industry,
          topic: aiInput.topic,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success && Array.isArray(data.topics)) {
        setTrendingTopics(data.topics);
        showToast('success', `Ditemukan ${data.topics.length} topik tren Google!`);
      } else {
        showToast('error', data.error || 'Gagal meriset topik tren');
      }
    } catch {
      showToast('error', 'Kendala koneksi ke server riset tren');
    } finally {
      setIsFetchingTrending(false);
    }
  };

  const handleSelectTrendingTopic = (item: any) => {
    setAiInput((prev) => ({
      ...prev,
      topic: item.topic,
      industry: item.industry || prev.industry,
      productFocus: item.recommendedProduct || prev.productFocus,
      problemTarget: item.targetProblem || prev.problemTarget,
    }));
    setTrendingTopics([]);
    showToast('success', 'Topik terpilih diterapkan ke formulir!');
  };

  const handleCopyImagePrompt = (promptText: string, promptId?: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(promptText);
      const id = promptId || 'cover';
      setCopiedPromptId(id);
      setCopiedPrompt(true);
      setTimeout(() => {
        setCopiedPrompt(false);
        setCopiedPromptId(null);
      }, 3000);
      showToast('success', 'Prompt gambar AI berhasil disalin!');
    }
  };

  const handleGenerateOutline = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.topic.trim()) {
      showToast('error', 'Topik artikel wajib diisi');
      return;
    }

    setIsGeneratingOutline(true);
    try {
      const res = await fetch('/api/admin/ai/outline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aiInput),
      });

      const data = await res.json();
      if (res.ok && data.success && data.outline) {
        setAiOutline(data.outline);
        setAiWizardStep(2);
        showToast('success', 'Kerangka artikel berhasil disusun!');
      } else {
        showToast('error', data.error || 'Gagal menyusun kerangka');
      }
    } catch {
      showToast('error', 'Kendala koneksi ke server AI');
    } finally {
      setIsGeneratingOutline(false);
    }
  };

  const handleGenerateFullArticle = async () => {
    if (!aiOutline) return;

    setIsGeneratingArticle(true);
    try {
      const res = await fetch('/api/admin/ai/article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          outline: aiOutline,
          additionalNotes: additionalEditorialNotes,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.article) {
        setAiGeneratedArticle(data.article);
        setAiWizardStep(3);
        showToast('success', 'Draft artikel lengkap berhasil dibuat!');
      } else {
        showToast('error', data.error || 'Gagal menghasilkan artikel');
      }
    } catch {
      showToast('error', 'Kendala koneksi ke server AI');
    } finally {
      setIsGeneratingArticle(false);
    }
  };

  const handleOpenInEditor = () => {
    if (!aiGeneratedArticle) return;

    if (typeof window !== 'undefined') {
      sessionStorage.setItem(
        'dqw_ai_article_draft',
        JSON.stringify({
          title: aiGeneratedArticle.title,
          slug: aiGeneratedArticle.slug,
          category: aiGeneratedArticle.category || 'Ergonomics',
          excerpt: aiGeneratedArticle.metaDescription,
          content: aiGeneratedArticle.content,
        })
      );
    }

    setIsAiWriterOpen(false);
    router.push('/admin/editor');
  };

  // Project Management Actions (CRUD)
  const handleOpenAddProject = () => {
    setEditingProject(null);
    setProjectFormData({
      id: '',
      client: '',
      industry: 'Automotive & Transportation',
      image: '/projects/PT Mayora Indah.webp',
      logo: '/images/clients/logo-pt-mayora-indah.webp',
      size: 'standard',
      desc: '',
      color: 'blue',
    });
    setIsProjectEditorOpen(true);
  };

  const handleOpenEditProject = (project: Project) => {
    setEditingProject(project);
    setProjectFormData({ ...project });
    setIsProjectEditorOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectFormData.client.trim()) {
      showToast('error', 'Nama klien wajib diisi');
      return;
    }

    setIsSavingProject(true);
    try {
      const isEdit = Boolean(editingProject);
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch('/api/admin/projects', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectFormData),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.project) {
          if (isEdit) {
            setProjectList((prev) =>
              prev.map((p) => (p.id === data.project.id ? data.project : p))
            );
            showToast('success', `Proyek ${data.project.client} berhasil diperbarui!`);
          } else {
            setProjectList((prev) => [data.project, ...prev]);
            showToast('success', `Proyek baru ${data.project.client} berhasil ditambahkan!`);
          }
          setIsProjectEditorOpen(false);
        }
      } else {
        showToast('error', 'Gagal menyimpan perubahan proyek');
      }
    } catch {
      showToast('error', 'Kendala koneksi saat menyimpan proyek');
    } finally {
      setIsSavingProject(false);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm('Hapus proyek ini dari portofolio?')) return;
    try {
      const res = await fetch(`/api/admin/projects?id=${projectId}`, { method: 'DELETE' });
      if (res.ok) {
        setProjectList((prev) => prev.filter((p) => p.id !== projectId));
        showToast('success', 'Proyek berhasil dihapus.');
      }
    } catch {
      showToast('error', 'Gagal menghapus proyek');
    }
  };

  // Media Library & Upload Handlers
  const openMediaPicker = async (target: 'image' | 'logo', projectForQuickChange?: Project) => {
    setMediaPickerTarget(target);
    setQuickPhotoProject(projectForQuickChange || null);
    setMediaFilterSearch('');
    setIsMediaPickerOpen(true);
    setLoadingMedia(true);
    try {
      const type = target === 'logo' ? 'clients' : 'projects';
      const res = await fetch(`/api/admin/media-library?type=${type}`);
      if (res.ok) {
        const data = await res.json();
        setMediaLibrary(data.images || []);
      }
    } catch (e) {
      console.error('Failed to load media library:', e);
    } finally {
      setLoadingMedia(false);
    }
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    target: 'image' | 'logo',
    projectForQuickChange?: Project
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingMedia(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', target === 'logo' ? 'clients' : 'projects');

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.url) {
          if (projectForQuickChange) {
            await applyPhotoChangeToProject(projectForQuickChange, data.url, target);
          } else {
            setProjectFormData((prev) => ({ ...prev, [target]: data.url }));
          }
          showToast('success', `Foto berhasil diunggah: ${data.fileName}`);
          setIsMediaPickerOpen(false);
        }
      } else {
        showToast('error', 'Gagal mengunggah foto');
      }
    } catch {
      showToast('error', 'Kendala koneksi saat upload foto');
    } finally {
      setIsUploadingMedia(false);
    }
  };

  const handleSelectMediaFromLibrary = async (imageUrl: string) => {
    if (quickPhotoProject) {
      await applyPhotoChangeToProject(quickPhotoProject, imageUrl, mediaPickerTarget);
    } else {
      setProjectFormData((prev) => ({ ...prev, [mediaPickerTarget]: imageUrl }));
    }
    setIsMediaPickerOpen(false);
  };

  const applyPhotoChangeToProject = async (project: Project, newUrl: string, field: 'image' | 'logo') => {
    const updated: Project = { ...project, [field]: newUrl };
    try {
      const res = await fetch('/api/admin/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      if (res.ok) {
        setProjectList((prev) => prev.map((p) => (p.id === project.id ? updated : p)));
        showToast('success', `Foto untuk ${project.client} berhasil diperbarui!`);
      } else {
        showToast('error', 'Gagal memperbarui foto di database');
      }
    } catch {
      showToast('error', 'Kendala koneksi saat memperbarui foto proyek');
    }
  };

  // Update Lead Status
  const handleUpdateLeadStatus = async (leadId: string, status: LeadItem['status']) => {
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: leadId, status }),
      });
      if (res.ok) {
        setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, status } : l)));
        showToast('success', 'Status prospek berhasil diperbarui.');
      }
    } catch {
      showToast('error', 'Gagal memperbarui status prospek.');
    }
  };

  // Delete Lead
  const handleDeleteLead = async (leadId: string) => {
    if (!confirm('Hapus prospek ini dari riwayat admin?')) return;
    try {
      const res = await fetch(`/api/admin/leads?id=${leadId}`, { method: 'DELETE' });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== leadId));
        showToast('success', 'Prospek berhasil dihapus.');
      }
    } catch {
      showToast('error', 'Gagal menghapus prospek.');
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

      const matchesCategory = categoryFilter === 'All' || article.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [firestoreArticles, searchQuery, statusFilter, categoryFilter]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE) || 1;
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredArticles.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredArticles, currentPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

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

  // Filtered Projects
  const projectIndustries = useMemo(() => {
    const set = new Set(projectList.map((p) => p.industry));
    return ['All', ...Array.from(set)];
  }, [projectList]);

  const filteredProjects = useMemo(() => {
    return projectList.filter((p) => {
      const matchesSearch =
        p.client.toLowerCase().includes(projectSearch.toLowerCase()) ||
        p.industry.toLowerCase().includes(projectSearch.toLowerCase()) ||
        p.desc.toLowerCase().includes(projectSearch.toLowerCase());
      const matchesIndustry = projectIndustryFilter === 'All' || p.industry === projectIndustryFilter;
      return matchesSearch && matchesIndustry;
    });
  }, [projectList, projectSearch, projectIndustryFilter]);

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      const matchesSearch =
        l.name.toLowerCase().includes(leadSearch.toLowerCase()) ||
        l.company.toLowerCase().includes(leadSearch.toLowerCase()) ||
        l.email.toLowerCase().includes(leadSearch.toLowerCase()) ||
        l.message.toLowerCase().includes(leadSearch.toLowerCase());
      const matchesType = leadTypeFilter === 'All' || l.lead_type === leadTypeFilter;
      return matchesSearch && matchesType;
    });
  }, [leads, leadSearch, leadTypeFilter]);

  // Chatbot Monitoring Stats
  const chatbotStats = useMemo(() => {
    const chatbotLeads = leads.filter(
      (l) => l.lead_type === 'AI Chatbot Consultation' || (l.messages && l.messages.length > 0)
    );
    const commercialCount = chatbotLeads.filter((l) =>
      l.messages?.some((m) => m.isCommercial)
    ).length;
    const totalMessages = chatbotLeads.reduce((acc, l) => acc + (l.messages?.length || 0), 0);
    return {
      totalSessions: chatbotLeads.length,
      commercialCount,
      totalMessages,
    };
  }, [leads]);

  // Metrics
  const publishedCount = firestoreArticles.filter((a) => a.status === 'published').length;
  const draftCount = firestoreArticles.filter((a) => a.status === 'draft').length;
  const featuredCount = firestoreArticles.filter((a) => a.featured).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-[#005596] selection:text-white relative overflow-hidden">
      {/* Contained Ambient Refraction (Rule #2 from DESIGN_SYSTEM.md) */}
      <div
        className="absolute top-20 left-1/4 w-[500px] h-[360px] bg-[#005596]/5 rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-96 right-1/4 w-[400px] h-[300px] bg-[#1d4ed8]/5 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5">
          <div
            className={`px-5 py-3.5 rounded-full shadow-xl border flex items-center gap-3 text-xs font-bold ${
              toastMessage.type === 'success'
                ? 'bg-[#005596] text-white border-blue-400 shadow-[0_4px_20px_rgba(0,85,150,0.35)]'
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

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-white/80 ring-1 ring-[#005596]/10 shadow-[0_4px_20px_rgba(0,85,150,0.04)]">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
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
              <span className="font-extrabold text-slate-900 text-sm tracking-tight">Portal CMS</span>
              <span className="px-3 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#005596]/10 text-[#005596] border border-[#005596]/20">
                PRODUKSI
              </span>
            </div>
          </div>

          {/* Quick Actions Bar (Strictly rounded-full according to DESIGN_SYSTEM.md) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Command Palette Trigger */}
            <button
              onClick={() => setIsCmdOpen(true)}
              className="hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs border border-slate-200/80 transition-all cursor-pointer"
              title="Buka Command Palette (Ctrl + K)"
            >
              <Command size={13} className="text-[#005596]" />
              <span>Aksi...</span>
              <kbd className="px-1.5 py-0.5 rounded-full bg-white border border-slate-300 text-[10px] text-slate-500 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Export JSON Backup */}
            <button
              onClick={handleExportJson}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 transition-all cursor-pointer"
              title="Unduh backup database artikel"
            >
              <Download size={13} className="text-slate-500" />
              <span className="hidden md:inline">Backup</span>
            </button>

            {/* Visit Website */}
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-slate-50 text-[#005596] font-bold text-xs border border-[#005596]/20 transition-all shadow-xs"
              title="Buka Website Publik"
            >
              <Globe size={13} className="text-[#005596]" />
              <span className="hidden md:inline">Buka Web</span>
            </Link>

            {/* Create Article Button with Dropdown (Manual vs AI Copilot) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsWriteMenuOpen(!isWriteMenuOpen)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#005596] hover:bg-[#004276] text-white text-xs font-bold rounded-full shadow-[0_4px_16px_rgba(0,85,150,0.25)] hover:shadow-[0_8px_24px_rgba(0,85,150,0.35)] transition-all cursor-pointer"
              >
                <Plus size={15} />
                <span>Tulis Artikel</span>
              </button>

              {isWriteMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl border border-slate-200 shadow-[0_16px_36px_-10px_rgba(0,0,0,0.15)] p-2 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-1">
                  <Link
                    href="/admin/editor"
                    onClick={() => setIsWriteMenuOpen(false)}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-[#005596]/10 text-slate-600 group-hover:text-[#005596] flex items-center justify-center shrink-0 transition-colors">
                      <Edit3 size={15} />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block group-hover:text-[#005596] transition-colors">
                        Tulis Manual
                      </span>
                      <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">
                        Buka kanvas editor kosong untuk menulis artikel sendiri.
                      </span>
                    </div>
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      setIsWriteMenuOpen(false);
                      setAiWizardStep(1);
                      setIsAiWriterOpen(true);
                    }}
                    className="w-full text-left flex items-start gap-3 p-3 rounded-xl hover:bg-[#005596]/5 transition-colors group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#005596]/10 group-hover:bg-[#005596] text-[#005596] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                      <Sparkles size={15} />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#005596] flex items-center gap-1.5">
                        <span>Tulis dengan AI</span>
                        <span className="px-1.5 py-0.5 bg-[#005596]/10 text-[9px] font-mono rounded-full font-bold">
                          Copilot
                        </span>
                      </span>
                      <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">
                        Rancang artikel industri dan standar K3 dalam 3 langkah cerdas.
                      </span>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="p-2.5 rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-all cursor-pointer"
              title="Keluar dari Admin"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative z-10">
        
        {/* Hero Section Banner */}
        <section className="space-y-4">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-[#005596]/15 shadow-[0_2px_10px_rgba(0,85,150,0.06)]">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#005596]">
              PORTAL CMS & KONTEN INDUSTRI
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Pusat Operasional & <span className="bg-gradient-to-r from-[#005596] to-[#1d4ed8] bg-clip-text text-transparent">Konten Industri</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal mt-2 max-w-2xl">
                Kelola artikel wawasan ergonomi, perbarui portofolio studi kasus pabrik klien, dan tindak lanjuti prospek yang masuk secara real-time.
              </p>
            </div>

            {/* 3 Pillars Tabs Navigation (Full Pill Buttons synced with URL slugs) */}
            <div className="inline-flex p-1.5 rounded-full bg-white/90 border border-slate-200/90 shadow-sm backdrop-blur-xl shrink-0 overflow-x-auto">
              <button
                onClick={() => switchTab('articles')}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'articles'
                    ? 'bg-[#005596] text-white shadow-[0_4px_14px_rgba(0,85,150,0.3)]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                }`}
              >
                <FileText size={15} />
                <span>Artikel ({firestoreArticles.length})</span>
              </button>

              <button
                onClick={() => switchTab('projects')}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'projects'
                    ? 'bg-[#005596] text-white shadow-[0_4px_14px_rgba(0,85,150,0.3)]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                }`}
              >
                <Building2 size={15} />
                <span>Portofolio Proyek ({projectList.length})</span>
              </button>

              <button
                onClick={() => switchTab('leads')}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'leads'
                    ? 'bg-[#005596] text-white shadow-[0_4px_14px_rgba(0,85,150,0.3)]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                }`}
              >
                <Inbox size={15} />
                <span>Inbox Leads ({leads.length})</span>
              </button>
            </div>
          </div>
        </section>

        {/* Metric Cards Banner (Standard DQW Glass Card) */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] rounded-2xl sm:rounded-3xl p-5 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">Total Artikel</span>
              <span className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 block">
                {firestoreArticles.length}
              </span>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#005596]/10 text-[#005596] flex items-center justify-center border border-[#005596]/20">
              <FileText size={22} />
            </div>
          </div>

          <div className="bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] rounded-2xl sm:rounded-3xl p-5 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">Artikel Live</span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1 block">
                {publishedCount}
              </span>
            </div>
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <CheckCircle2 size={22} />
            </div>
          </div>

          <div className="bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] rounded-2xl sm:rounded-3xl p-5 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">Proyek Industri</span>
              <span className="text-2xl sm:text-3xl font-black text-[#005596] mt-1 block">
                {projectList.length}
              </span>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#005596]/10 text-[#005596] flex items-center justify-center border border-[#005596]/20">
              <Building2 size={22} />
            </div>
          </div>

          <div className="bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] rounded-2xl sm:rounded-3xl p-5 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">Total Leads Masuk</span>
              <span className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 block">
                {leads.length}
              </span>
            </div>
            <div className="w-12 h-12 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100">
              <Inbox size={22} />
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* TAB 1: ARTIKEL & WAWASAN */}
        {/* ========================================================================= */}
        {activeTab === 'articles' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Filter & Search Bar */}
            <section className="bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] rounded-2xl sm:rounded-3xl p-5 space-y-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="relative w-full md:w-96">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Cari judul artikel, topik, atau slug..."
                    className="w-full pl-11 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#005596] focus:ring-2 focus:ring-[#005596]/15 transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200 w-full md:w-auto overflow-x-auto">
                  <button
                    onClick={() => {
                      setStatusFilter('all');
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
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
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      statusFilter === 'published'
                        ? 'bg-white text-emerald-700 shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Terbit ({publishedCount})
                  </button>
                  <button
                    onClick={() => {
                      setStatusFilter('draft');
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      statusFilter === 'draft'
                        ? 'bg-white text-amber-700 shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Draf ({draftCount})
                  </button>
                  <button
                    onClick={() => {
                      setStatusFilter('featured');
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      statusFilter === 'featured'
                        ? 'bg-white text-amber-600 shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    ⭐ Unggulan ({featuredCount})
                  </button>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pt-1">
                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest shrink-0 flex items-center gap-1">
                  <SlidersHorizontal size={12} /> Kategori:
                </span>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setCategoryFilter(cat);
                      setCurrentPage(1);
                    }}
                    className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      categoryFilter === cat
                        ? 'bg-[#005596] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </section>

            {/* Bulk Action Bar */}
            {selectedIds.length > 0 && (
              <div className="bg-[#005596]/10 border border-[#005596]/20 rounded-full px-5 py-3 flex flex-wrap items-center justify-between gap-3 animate-in fade-in">
                <div className="flex items-center gap-2 text-xs font-bold text-[#005596]">
                  <CheckSquare size={16} className="text-[#005596]" />
                  <span>{selectedIds.length} artikel dipilih</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleBulkStatus('published')}
                    disabled={isBulkProcessing}
                    className="px-4 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
                  >
                    Set Terbit
                  </button>
                  <button
                    onClick={() => handleBulkStatus('draft')}
                    disabled={isBulkProcessing}
                    className="px-4 py-1.5 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
                  >
                    Set Draf
                  </button>
                  <button
                    onClick={handleBulkDelete}
                    disabled={isBulkProcessing}
                    className="px-4 py-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all disabled:opacity-50 cursor-pointer flex items-center gap-1"
                  >
                    <Trash2 size={13} />
                    <span>Hapus</span>
                  </button>
                  <button
                    onClick={() => setSelectedIds([])}
                    className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-100 cursor-pointer"
                  >
                    Batal
                  </button>
                </div>
              </div>
            )}

            {/* Article Table Container */}
            <section className="bg-white/90 backdrop-blur-xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08)] rounded-2xl sm:rounded-3xl overflow-hidden">
              {loading ? (
                <div className="p-16 text-center text-slate-400">
                  <RefreshCw size={24} className="animate-spin mx-auto mb-3 text-[#005596]" />
                  <p className="text-sm font-semibold">Memuat database artikel...</p>
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
                    <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="py-4 pl-5 pr-2 w-10 text-center">
                          <button onClick={toggleSelectAll} className="cursor-pointer text-slate-400 hover:text-[#005596]">
                            {isAllCurrentSelected ? <CheckSquare size={16} className="text-[#005596]" /> : <Square size={16} />}
                          </button>
                        </th>
                        <th className="py-4 px-3 w-8">⭐</th>
                        <th className="py-4 px-4 min-w-[280px]">Judul & Slug</th>
                        <th className="py-4 px-4">Kategori</th>
                        <th className="py-4 px-4">Status</th>
                        <th className="py-4 px-4">Tanggal</th>
                        <th className="py-4 px-5 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {paginatedArticles.map((article) => {
                        const isSelected = selectedIds.includes(article.id);
                        return (
                          <tr
                            key={article.id}
                            className={`hover:bg-slate-50/80 transition-colors ${isSelected ? 'bg-[#005596]/5' : ''}`}
                          >
                            <td className="py-4 pl-5 pr-2 text-center">
                              <button
                                onClick={() => toggleSelectRow(article.id)}
                                className="cursor-pointer text-slate-400 hover:text-[#005596]"
                              >
                                {isSelected ? <CheckSquare size={16} className="text-[#005596]" /> : <Square size={16} />}
                              </button>
                            </td>

                            <td className="py-4 px-3">
                              <button
                                onClick={() => handleToggleFeatured(article)}
                                className="cursor-pointer text-slate-300 hover:text-amber-500 transition-colors"
                                title={article.featured ? 'Hapus tanda unggulan' : 'Jadikan artikel unggulan'}
                              >
                                <Star
                                  size={16}
                                  className={article.featured ? 'text-amber-500 fill-amber-400' : 'text-slate-300'}
                                />
                              </button>
                            </td>

                            <td className="py-4 px-4">
                              <Link
                                href={`/admin/editor?id=${article.id}`}
                                className="font-bold text-slate-900 hover:text-[#005596] text-sm line-clamp-1 transition-colors block"
                              >
                                {article.title}
                              </Link>
                              <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mt-0.5">
                                <span className="font-mono text-slate-500 truncate max-w-xs">/news/{article.slug}</span>
                                <Link
                                  href={`/news/${article.slug}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-slate-400 hover:text-[#005596]"
                                  title="Lihat di web publik"
                                >
                                  <ExternalLink size={12} />
                                </Link>
                              </div>
                            </td>

                            <td className="py-4 px-4">
                              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                                {article.category}
                              </span>
                            </td>

                            <td className="py-4 px-4">
                              <button
                                onClick={() => handleToggleStatus(article)}
                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                                  article.status === 'published'
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                                    : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                                }`}
                                title="Klik untuk mengubah status"
                              >
                                {article.status === 'published' ? (
                                  <>
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <span>Terbit</span>
                                  </>
                                ) : (
                                  <>
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                    <span>Draf</span>
                                  </>
                                )}
                              </button>
                            </td>

                            <td className="py-4 px-4 text-slate-500 whitespace-nowrap">
                              {new Date(article.publishedAt).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </td>

                            <td className="py-4 px-5 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={() => handleDuplicate(article)}
                                  className="p-2 rounded-full text-slate-400 hover:text-[#005596] hover:bg-[#005596]/10 transition-colors"
                                  title="Duplikasi artikel"
                                >
                                  <Copy size={14} />
                                </button>
                                <Link
                                  href={`/admin/editor?id=${article.id}`}
                                  className="p-2 rounded-full text-slate-400 hover:text-[#005596] hover:bg-[#005596]/10 transition-colors"
                                  title="Edit artikel"
                                >
                                  <Edit3 size={14} />
                                </Link>
                                <button
                                  onClick={() => setDeleteTarget(article)}
                                  className="p-2 rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                  title="Hapus artikel"
                                >
                                  <Trash2 size={14} />
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

              {/* Pagination */}
              {!loading && filteredArticles.length > 0 && (
                <div className="bg-slate-50/80 border-t border-slate-200 px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
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
                      className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
                    >
                      <ChevronLeft size={14} />
                    </button>

                    {Array.from({ length: totalPages }).map((_, idx) => {
                      const pNum = idx + 1;
                      if (
                        pNum === 1 ||
                        pNum === totalPages ||
                        (pNum >= currentPage - 1 && pNum <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={pNum}
                            onClick={() => setCurrentPage(pNum)}
                            className={`w-8 h-8 rounded-full text-xs font-bold transition-all cursor-pointer ${
                              currentPage === pNum
                                ? 'bg-[#005596] text-white shadow-xs'
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
                      className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </section>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: PORTOFOLIO PROYEK PABRIK (Dengan Fitur Edit & Tambah Proyek) */}
        {/* ========================================================================= */}
        {activeTab === 'projects' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Filter, Search & Add Project Bar */}
            <section className="bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] rounded-2xl sm:rounded-3xl p-5 space-y-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="relative w-full md:w-96">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={projectSearch}
                    onChange={(e) => setProjectSearch(e.target.value)}
                    placeholder="Cari nama klien (Mayora, Gajah Tunggal...), industri..."
                    className="w-full pl-11 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#005596] focus:ring-2 focus:ring-[#005596]/15 transition-all"
                  />
                  {projectSearch && (
                    <button
                      onClick={() => setProjectSearch('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {/* Button Tambah Proyek Baru */}
                  <button
                    onClick={handleOpenAddProject}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#005596] hover:bg-[#004276] text-white text-xs font-bold shadow-[0_4px_16px_rgba(0,85,150,0.25)] hover:shadow-[0_8px_24px_rgba(0,85,150,0.35)] transition-all cursor-pointer"
                  >
                    <Plus size={14} />
                    <span>Tambah Proyek Baru</span>
                  </button>

                  <Link
                    href="/our-projects"
                    target="_blank"
                    className="inline-flex items-center gap-1 px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
                  >
                    <span>Lihat Halaman Publik</span>
                    <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>

              {/* Industry Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pt-1">
                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest shrink-0 flex items-center gap-1">
                  <Filter size={12} /> Sektor Industri:
                </span>
                {projectIndustries.map((ind) => (
                  <button
                    key={ind}
                    onClick={() => setProjectIndustryFilter(ind)}
                    className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      projectIndustryFilter === ind
                        ? 'bg-[#005596] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {ind}
                  </button>
                ))}
              </div>
            </section>

            {/* Projects Grid View */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] rounded-2xl sm:rounded-3xl p-5 flex flex-col justify-between hover:shadow-xl hover:border-[#005596]/30 transition-all group"
                >
                  <div className="space-y-4">
                    {/* Project Image Container with Quick Photo Change Overlay */}
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 group/img">
                      <Image
                        src={project.image}
                        alt={project.client}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/95 shadow-xs">
                        <span className="text-[10px] font-mono font-bold text-[#005596] uppercase tracking-wider">
                          {project.industry}
                        </span>
                      </div>

                      {/* Quick Action: Hover to Change Photo Directly */}
                      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px] opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center p-3">
                        <button
                          type="button"
                          onClick={() => openMediaPicker('image', project)}
                          className="px-4 py-2 rounded-full bg-[#005596] hover:bg-[#004276] text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-lg transform translate-y-1 group-hover/img:translate-y-0 transition-transform cursor-pointer"
                        >
                          <Camera size={14} />
                          <span>Ganti Foto Instalasi</span>
                        </button>
                      </div>
                    </div>

                    {/* Header: Client & Logo */}
                    <div className="flex items-center gap-3">
                      {project.logo && (
                        <div className="relative w-11 h-11 rounded-xl bg-white border border-slate-200/90 shadow-xs overflow-hidden shrink-0 p-1 flex items-center justify-center">
                          <Image
                            src={project.logo}
                            alt={project.client}
                            width={36}
                            height={36}
                            className="object-contain max-h-9"
                            unoptimized
                          />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <h3 className="font-extrabold text-slate-900 text-base leading-snug truncate group-hover:text-[#005596] transition-colors">
                          {project.client}
                        </h3>
                        <span className="text-[11px] text-slate-400 font-mono block truncate">
                          /our-projects/{project.id}
                        </span>
                      </div>
                    </div>

                    {/* Description: Uniform 2-Line Height */}
                    <p className="text-xs text-slate-600 line-clamp-2 h-9 leading-relaxed">
                      {project.desc}
                    </p>
                  </div>

                  {/* Footer Action Buttons: High-Contrast Clear Hierarchy */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => handleOpenEditProject(project)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#005596] hover:bg-[#004276] text-white text-xs font-bold shadow-[0_4px_12px_rgba(0,85,150,0.18)] hover:shadow-[0_6px_18px_rgba(0,85,150,0.25)] transition-all cursor-pointer"
                      title="Edit seluruh data proyek & ganti foto/logo"
                    >
                      <Edit3 size={13} />
                      <span>Edit Proyek</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <Link
                        href={`/our-projects/${project.id}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 px-3 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all"
                        title="Buka halaman proyek publik"
                      >
                        <span>Web</span>
                        <ArrowUpRight size={13} />
                      </Link>

                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="p-2 rounded-full text-slate-300 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Hapus proyek"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: INBOX LEADS CALON KLIEN */}
        {/* ========================================================================= */}
        {activeTab === 'leads' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Chatbot Monitoring Insight Card */}
            <div className="bg-gradient-to-r from-slate-950 via-[#005596] to-slate-900 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.25)] border border-blue-900/40 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                  <Bot size={24} className="text-sky-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-base sm:text-lg text-white">Monitoring AI Virtual Engineer</h3>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-mono text-emerald-300 uppercase tracking-widest font-bold">Aktif & Real-time</span>
                  </div>
                  <p className="text-xs text-blue-100/80 mt-1 max-w-xl">
                    Pantau interaksi teknis calon klien, identifikasi prospek yang siap penawaran (harga/PO), dan periksa transkrip konsultasi.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 sm:gap-8 self-stretch lg:self-auto justify-between lg:justify-end border-t lg:border-t-0 border-white/15 pt-3.5 lg:pt-0">
                <div className="text-left lg:text-right">
                  <span className="text-[10px] font-mono text-blue-200 uppercase tracking-wider block">Total Sesi Chat</span>
                  <span className="text-xl sm:text-2xl font-black text-white">{chatbotStats.totalSessions} Sesi</span>
                </div>
                <div className="w-px h-8 bg-white/15" />
                <div className="text-left lg:text-right">
                  <span className="text-[10px] font-mono text-amber-300 uppercase tracking-wider block">Tanya Harga / PO</span>
                  <span className="text-xl sm:text-2xl font-black text-amber-300">{chatbotStats.commercialCount} Prospek</span>
                </div>
                <div className="w-px h-8 bg-white/15" />
                <div className="text-left lg:text-right">
                  <span className="text-[10px] font-mono text-blue-200 uppercase tracking-wider block">Total Pesan</span>
                  <span className="text-xl sm:text-2xl font-black text-white">{chatbotStats.totalMessages} Tanya-Jawab</span>
                </div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <section className="bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] rounded-2xl sm:rounded-3xl p-5 space-y-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="relative w-full md:w-96">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={leadSearch}
                    onChange={(e) => setLeadSearch(e.target.value)}
                    placeholder="Cari nama calon klien, perusahaan, email..."
                    className="w-full pl-11 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#005596] focus:ring-2 focus:ring-[#005596]/15 transition-all"
                  />
                  {leadSearch && (
                    <button
                      onClick={() => setLeadSearch('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={fetchLeads}
                    disabled={loadingLeads}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 transition-all cursor-pointer"
                  >
                    <RefreshCw size={13} className={loadingLeads ? 'animate-spin text-[#005596]' : ''} />
                    <span>Refresh Leads</span>
                  </button>
                </div>
              </div>

              {/* Lead Types Filter */}
              <div className="flex items-center gap-2 overflow-x-auto pt-1">
                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest shrink-0 flex items-center gap-1">
                  <Filter size={12} /> Tipe Form:
                </span>
                {['All', 'Contact Form', 'AI Chatbot Consultation', 'ROI Calculator', 'Lead Registered'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setLeadTypeFilter(type)}
                    className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      leadTypeFilter === type
                        ? 'bg-[#005596] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </section>

            {/* Leads List */}
            {loadingLeads ? (
              <div className="p-16 text-center text-slate-400 bg-white/80 rounded-3xl border border-slate-200">
                <RefreshCw size={24} className="animate-spin mx-auto mb-3 text-[#005596]" />
                <p className="text-sm font-semibold">Memuat data leads masuk...</p>
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="p-16 text-center text-slate-400 bg-white/80 rounded-3xl border border-slate-200">
                <Inbox size={32} className="mx-auto mb-3 text-slate-300" />
                <h3 className="text-slate-700 font-bold text-base">Belum ada leads yang cocok</h3>
                <p className="text-xs text-slate-400 mt-1">Setiap form yang dikirim dari web otomatis muncul di sini dan tercatat di Google Sheets.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="bg-white/85 backdrop-blur-2xl border border-white/95 ring-1 ring-[#005596]/12 shadow-[0_16px_40px_-10px_rgba(0,85,150,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] rounded-2xl sm:rounded-3xl p-5 space-y-4"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#005596] bg-[#005596]/10 px-2.5 py-0.5 rounded-full">
                            {lead.lead_type}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {new Date(lead.createdAt).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })} WIB
                          </span>
                        </div>
                        <h3 className="font-extrabold text-slate-900 text-lg mt-2 leading-tight">
                          {lead.name}
                        </h3>
                        <p className="text-xs font-bold text-slate-500 mt-0.5">
                          {lead.company}
                        </p>
                      </div>

                      {/* Status Selector */}
                      <select
                        value={lead.status || 'new'}
                        onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as LeadItem['status'])}
                        className={`text-xs font-bold rounded-full px-3 py-1 border outline-none cursor-pointer ${
                          lead.status === 'contacted'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : lead.status === 'proposal_sent'
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : lead.status === 'closed'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        <option value="new">Baru</option>
                        <option value="contacted">Dihubungi</option>
                        <option value="proposal_sent">Proposal Terkirim</option>
                        <option value="closed">Selesai (Deal)</option>
                      </select>
                    </div>

                    {/* Contact info: Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-2 text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <Mail size={14} className="text-[#005596] shrink-0" />
                        <a href={`mailto:${lead.email}`} className="font-bold hover:underline text-[#005596] truncate">
                          {lead.email}
                        </a>
                      </div>

                      {lead.phone ? (
                        <div className="flex items-center gap-2 text-slate-600 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100">
                          <Phone size={14} className="text-emerald-600 shrink-0" />
                          <a
                            href={`https://wa.me/${lead.phone.replace(/\D/g, '').replace(/^0/, '62')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold hover:underline text-emerald-700 truncate"
                          >
                            {lead.phone}
                          </a>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-slate-400 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px]">
                          <Phone size={14} className="text-slate-300 shrink-0" />
                          <span>Tanpa nomor telepon</span>
                        </div>
                      )}
                    </div>

                    {/* Message Box */}
                    <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/80 text-xs text-slate-700 leading-relaxed font-medium">
                      <span className="font-bold text-slate-400 text-[10px] uppercase tracking-wider block mb-1">
                        Pesan / Konteks Kebutuhan:
                      </span>
                      <p className="whitespace-pre-wrap">{lead.message}</p>
                    </div>

                    {/* Actions */}
                    <div className="pt-2 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <a
                          href={`mailto:${lead.email}?subject=Re: Inquiry PT Dimensi Quantum Wahyudi`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#005596] hover:bg-[#004276] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                        >
                          <Send size={12} />
                          <span>Balas Email</span>
                        </a>

                        <a
                          href={
                            lead.phone
                              ? `https://wa.me/${lead.phone.replace(/\D/g, '').replace(/^0/, '62')}?text=Halo%20${encodeURIComponent(
                                  lead.name
                                )},%20terima%20kasih%20telah%20menghubungi%20PT%20Dimensi%20Quantum%20Wahyudi`
                              : 'https://wa.me/6281119168752'
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                        >
                          <Phone size={12} />
                          <span>Chat WA Lead</span>
                        </a>

                        {lead.messages && lead.messages.length > 0 && (
                          <button
                            type="button"
                            onClick={() => setSelectedLeadForTranscript(lead)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold border border-indigo-200 transition-all cursor-pointer shadow-xs"
                          >
                            <MessageSquare size={12} />
                            <span>Lihat Chat ({lead.messages.length})</span>
                          </button>
                        )}
                      </div>

                      <button
                        onClick={() => handleDeleteLead(lead.id)}
                        className="p-2 rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Hapus lead"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* MODAL EDIT & TAMBAH PROYEK (Full Form Editor) */}
      {/* ========================================================================= */}
      {isProjectEditorOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  {editingProject ? 'Edit Portofolio Proyek' : 'Tambah Proyek Industri Baru'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {editingProject
                    ? `Perbarui informasi instalasi untuk ${editingProject.client}`
                    : 'Tambahkan studi kasus pabrik klien baru ke portofolio /our-projects'}
                </p>
              </div>
              <button
                onClick={() => setIsProjectEditorOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nama Klien */}
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-tight block mb-1.5">
                    Nama Klien / Perusahaan <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={projectFormData.client}
                    onChange={(e) => setProjectFormData({ ...projectFormData, client: e.target.value })}
                    placeholder="Contoh: PT Mayora Indah"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-xs sm:text-sm text-slate-800 focus:bg-white focus:border-[#005596] focus:ring-2 focus:ring-[#005596]/15 outline-none transition-all"
                  />
                </div>

                {/* Slug ID */}
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-tight block mb-1.5">
                    Slug ID / URL Path <span className="text-slate-400 font-normal">(opsional)</span>
                  </label>
                  <input
                    type="text"
                    value={projectFormData.id}
                    onChange={(e) => setProjectFormData({ ...projectFormData, id: e.target.value })}
                    placeholder="auto-dibuat dari nama klien"
                    disabled={Boolean(editingProject)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-xs sm:text-sm text-slate-800 disabled:opacity-60 focus:bg-white focus:border-[#005596] outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Sektor Industri */}
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-tight block mb-1.5">
                    Sektor Industri
                  </label>
                  <input
                    type="text"
                    value={projectFormData.industry}
                    onChange={(e) => setProjectFormData({ ...projectFormData, industry: e.target.value })}
                    placeholder="Contoh: FMCG & F&B, Automotive, Glass"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-xs sm:text-sm text-slate-800 focus:bg-white focus:border-[#005596] outline-none"
                  />
                </div>

                {/* Grid Size */}
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-tight block mb-1.5">
                    Format Tampilan Grid
                  </label>
                  <select
                    value={projectFormData.size}
                    onChange={(e) => setProjectFormData({ ...projectFormData, size: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-xs sm:text-sm text-slate-800 focus:bg-white focus:border-[#005596] outline-none cursor-pointer"
                  >
                    <option value="standard">Standard (Kotak)</option>
                    <option value="large">Large (Lebar)</option>
                    <option value="tall">Tall (Tinggi)</option>
                  </select>
                </div>
              </div>

              {/* Foto Instalasi Pabrik - Interactive Uploader & Picker */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-tight block">
                    Foto Instalasi Pabrik <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowManualUrlInput(!showManualUrlInput)}
                    className="text-[11px] text-[#005596] font-semibold hover:underline cursor-pointer"
                  >
                    {showManualUrlInput ? 'Sembunyikan URL Manual' : 'Input URL / Path Manual'}
                  </button>
                </div>

                {/* Live Image Preview with Action Buttons */}
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 group">
                  {projectFormData.image ? (
                    <Image
                      src={projectFormData.image}
                      alt="Preview Foto Instalasi"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400">
                      <ImageIcon size={32} className="mb-1" />
                      <span className="text-xs font-semibold">Belum ada foto dipilih</span>
                    </div>
                  )}

                  {/* Hover Overlay Controls */}
                  <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2.5 p-3">
                    <label className="px-4 py-2 rounded-full bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold inline-flex items-center gap-1.5 shadow-md cursor-pointer transition-all">
                      <Upload size={13} className="text-[#005596]" />
                      <span>{isUploadingMedia ? 'Mengunggah...' : 'Upload dari File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'image')}
                        disabled={isUploadingMedia}
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => openMediaPicker('image')}
                      className="px-4 py-2 rounded-full bg-[#005596] hover:bg-[#004276] text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
                    >
                      <ImageIcon size={13} />
                      <span>Pilih dari Galeri</span>
                    </button>
                  </div>
                </div>

                {/* Direct Action Buttons Under Preview */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <label className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer transition-all">
                    <Upload size={12} className="text-[#005596]" />
                    <span>Upload Foto Baru</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, 'image')}
                      disabled={isUploadingMedia}
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => openMediaPicker('image')}
                    className="px-3.5 py-1.5 rounded-full bg-[#005596]/10 hover:bg-[#005596]/20 text-[#005596] text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer transition-all"
                  >
                    <ImageIcon size={12} />
                    <span>Pilih dari Galeri Pabrik</span>
                  </button>
                </div>

                {showManualUrlInput && (
                  <div className="pt-2 animate-in fade-in">
                    <input
                      type="text"
                      value={projectFormData.image}
                      onChange={(e) => setProjectFormData({ ...projectFormData, image: e.target.value })}
                      placeholder="/projects/PT Mayora Indah.webp"
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs text-slate-800 font-mono focus:bg-white focus:border-[#005596] outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Logo Perusahaan Klien - Interactive Uploader */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-tight block">
                  Logo Perusahaan Klien
                </label>
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-xs p-1.5 flex items-center justify-center shrink-0 overflow-hidden">
                    {projectFormData.logo ? (
                      <Image
                        src={projectFormData.logo}
                        alt="Logo"
                        width={48}
                        height={48}
                        className="object-contain max-h-11"
                        unoptimized
                      />
                    ) : (
                      <Building2 size={24} className="text-slate-300" />
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <label className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer transition-all">
                      <Upload size={12} className="text-[#005596]" />
                      <span>Upload Logo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'logo')}
                        disabled={isUploadingMedia}
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => openMediaPicker('logo')}
                      className="px-3.5 py-1.5 rounded-full bg-[#005596]/10 hover:bg-[#005596]/20 text-[#005596] text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer transition-all"
                    >
                      <ImageIcon size={12} />
                      <span>Pilih dari Logo Library</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Deskripsi / Solusi Teknik */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-tight block mb-1.5">
                  Ringkasan Solusi Teknik & Hasil Terukur
                </label>
                <textarea
                  rows={4}
                  required
                  value={projectFormData.desc}
                  onChange={(e) => setProjectFormData({ ...projectFormData, desc: e.target.value })}
                  placeholder="Jelaskan jenis vacuum lifter yang dipasang, bobot beban (kg), dan dampak peningkatan ergonomi/efisiensi pabrik..."
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:border-[#005596] outline-none leading-relaxed resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProjectEditorOpen(false)}
                  disabled={isSavingProject}
                  className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSavingProject}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#005596] hover:bg-[#004276] text-white text-xs font-bold shadow-[0_4px_16px_rgba(0,85,150,0.25)] hover:shadow-[0_8px_24px_rgba(0,85,150,0.35)] transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSavingProject ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" />
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <>
                      <Check size={14} />
                      <span>{editingProject ? 'Simpan Perubahan Proyek' : 'Tambahkan Proyek'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Project Detail Preview Modal */}
      {selectedProjectPreview && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#005596] uppercase tracking-widest bg-[#005596]/10 px-3 py-1 rounded-full">
                {selectedProjectPreview.industry}
              </span>
              <button
                onClick={() => setSelectedProjectPreview(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X size={16} />
              </button>
            </div>

            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <Image
                src={selectedProjectPreview.image}
                alt={selectedProjectPreview.client}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            <div>
              <h3 className="text-xl font-black text-slate-900">{selectedProjectPreview.client}</h3>
              <p className="text-xs text-slate-500 font-mono mt-0.5">ID: {selectedProjectPreview.id}</p>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {selectedProjectPreview.desc}
            </p>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  const prj = selectedProjectPreview;
                  setSelectedProjectPreview(null);
                  handleOpenEditProject(prj);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#005596]/10 hover:bg-[#005596]/20 text-[#005596] text-xs font-bold transition-all cursor-pointer"
              >
                <Edit3 size={13} />
                <span>Edit Proyek Ini</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedProjectPreview(null)}
                  className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  Tutup
                </button>
                <Link
                  href={`/our-projects/${selectedProjectPreview.id}`}
                  target="_blank"
                  className="px-5 py-2 rounded-full bg-[#005596] hover:bg-[#004276] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <span>Buka Live</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Article Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center border border-red-100">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">Hapus Artikel Ini?</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Artikel <span className="font-semibold text-slate-800">&ldquo;{deleteTarget.title}&rdquo;</span> akan dihapus permanen dari database.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
              >
                {isDeleting ? 'Menghapus...' : 'Ya, Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Media Library & Photo Picker Modal */}
      {isMediaPickerOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-5 max-h-[88vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 shrink-0">
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  {mediaPickerTarget === 'logo' ? 'Pilih Logo Perusahaan Klien' : 'Pilih Foto Instalasi Pabrik'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {quickPhotoProject
                    ? `Perbarui foto secara langsung untuk: ${quickPhotoProject.client}`
                    : `Pilih aset gambar yang tersedia di server atau unggah file baru`}
                </p>
              </div>
              <button
                onClick={() => setIsMediaPickerOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Filter & Upload Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="relative w-full sm:w-80">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={mediaFilterSearch}
                  onChange={(e) => setMediaFilterSearch(e.target.value)}
                  placeholder="Cari nama file gambar..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs text-slate-800 focus:bg-white focus:border-[#005596] outline-none"
                />
              </div>

              <label className="w-full sm:w-auto px-5 py-2 rounded-full bg-[#005596] hover:bg-[#004276] text-white text-xs font-bold inline-flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(0,85,150,0.25)] cursor-pointer transition-all shrink-0">
                {isUploadingMedia ? (
                  <>
                    <RefreshCw size={13} className="animate-spin" />
                    <span>Mengunggah...</span>
                  </>
                ) : (
                  <>
                    <Upload size={13} />
                    <span>Upload Foto Baru dari Komputer</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, mediaPickerTarget, quickPhotoProject || undefined)}
                  disabled={isUploadingMedia}
                />
              </label>
            </div>

            {/* Images Grid */}
            <div className="flex-1 overflow-y-auto pr-1">
              {loadingMedia ? (
                <div className="py-20 text-center text-slate-400">
                  <RefreshCw size={24} className="animate-spin mx-auto mb-2 text-[#005596]" />
                  <p className="text-xs font-semibold">Memuat aset media...</p>
                </div>
              ) : (
                <div
                  className={`grid gap-3 ${
                    mediaPickerTarget === 'logo'
                      ? 'grid-cols-3 sm:grid-cols-4 md:grid-cols-6'
                      : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-3'
                  }`}
                >
                  {mediaLibrary
                    .filter((img) => img.name.toLowerCase().includes(mediaFilterSearch.toLowerCase()))
                    .map((img) => (
                      <button
                        key={img.url}
                        type="button"
                        onClick={() => handleSelectMediaFromLibrary(img.url)}
                        className={`group relative rounded-2xl overflow-hidden border border-slate-200 hover:border-[#005596] hover:ring-2 hover:ring-[#005596]/30 transition-all text-left bg-slate-50 cursor-pointer flex flex-col ${
                          mediaPickerTarget === 'logo' ? 'p-3 aspect-square items-center justify-center' : ''
                        }`}
                      >
                        {mediaPickerTarget === 'logo' ? (
                          <div className="relative w-full h-full flex items-center justify-center">
                            <Image
                              src={img.url}
                              alt={img.name}
                              width={80}
                              height={80}
                              className="object-contain max-h-16 group-hover:scale-105 transition-transform"
                              unoptimized
                            />
                          </div>
                        ) : (
                          <div className="relative aspect-video w-full bg-slate-200">
                            <Image
                              src={img.url}
                              alt={img.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform"
                              unoptimized
                            />
                          </div>
                        )}
                        <div className="p-2 bg-white/95 border-t border-slate-100 w-full truncate">
                          <span className="text-[11px] font-mono text-slate-600 truncate block group-hover:text-[#005596]">
                            {img.name}
                          </span>
                        </div>
                      </button>
                    ))}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end shrink-0">
              <button
                type="button"
                onClick={() => setIsMediaPickerOpen(false)}
                className="px-5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SMART AI ARTICLE WRITER WIZARD MODAL (3-STEP GUIDED FLOW) */}
      {/* ========================================================================= */}
      {isAiWriterOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] flex flex-col">
            
            {/* Header with 3-Step Progress Indicator */}
            <div className="border-b border-slate-100 pb-5 shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#005596]/10 text-[#005596] flex items-center justify-center">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">
                      Industrial AI Article Copilot
                    </h3>
                    <p className="text-xs text-slate-500">
                      Didukung Google Gemini & Guardrail Standar K3 Manufaktur PT DQW
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAiWriterOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Progress Steps Bar */}
              <div className="flex items-center justify-between gap-2 mt-5 pt-4 border-t border-slate-100">
                <div className={`flex items-center gap-2 text-xs font-bold ${aiWizardStep >= 1 ? 'text-[#005596]' : 'text-slate-400'}`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${aiWizardStep >= 1 ? 'bg-[#005596] text-white' : 'bg-slate-100 text-slate-400'}`}>
                    1
                  </span>
                  <span>Konteks Industri</span>
                </div>
                <div className="flex-1 h-0.5 bg-slate-100 mx-2" />
                <div className={`flex items-center gap-2 text-xs font-bold ${aiWizardStep >= 2 ? 'text-[#005596]' : 'text-slate-400'}`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${aiWizardStep >= 2 ? 'bg-[#005596] text-white' : 'bg-slate-100 text-slate-400'}`}>
                    2
                  </span>
                  <span>Kerangka Outline</span>
                </div>
                <div className="flex-1 h-0.5 bg-slate-100 mx-2" />
                <div className={`flex items-center gap-2 text-xs font-bold ${aiWizardStep >= 3 ? 'text-[#005596]' : 'text-slate-400'}`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${aiWizardStep >= 3 ? 'bg-[#005596] text-white' : 'bg-slate-100 text-slate-400'}`}>
                    3
                  </span>
                  <span>Draft Siap Terbit</span>
                </div>
              </div>
            </div>

            {/* Step 1: Input Konteks Industri */}
            {aiWizardStep === 1 && (
              <form onSubmit={handleGenerateOutline} className="space-y-4 overflow-y-auto pr-1 flex-1">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-tight block">
                      Topik Utama / Ide Artikel <span className="text-red-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleFetchTrendingTopics}
                      disabled={isFetchingTrending}
                      className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-amber-600/15 hover:from-amber-500/25 hover:to-amber-600/25 text-amber-800 border border-amber-300 text-xs font-bold inline-flex items-center gap-1.5 transition-all shadow-xs cursor-pointer disabled:opacity-50"
                      title="Riset topik penelusuran nyata di Google untuk industri ini"
                    >
                      <Sparkles size={13} className={isFetchingTrending ? 'animate-spin text-amber-600' : 'text-amber-600'} />
                      <span>{isFetchingTrending ? 'Mereset Google...' : '🪄 Riset Topik Tren Google'}</span>
                    </button>
                  </div>

                  <input
                    type="text"
                    required
                    value={aiInput.topic}
                    onChange={(e) => setAiInput({ ...aiInput, topic: e.target.value })}
                    placeholder="Contoh: Solusi Mengangkat Sak Semen 50kg di Lini Palletizing"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-xs sm:text-sm text-slate-800 focus:bg-white focus:border-[#005596] outline-none"
                  />

                  {/* Trending Topics Suggestions Popover/Drawer */}
                  {trendingTopics.length > 0 && (
                    <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 space-y-3 animate-in fade-in">
                      <div className="flex items-center justify-between border-b border-amber-200/60 pb-2">
                        <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                          <Sparkles size={14} className="text-amber-600" />
                          <span>Hasil Riset Topik Tren Google (Klik salah satu untuk memilih):</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => setTrendingTopics([])}
                          className="text-[11px] text-amber-800 hover:text-amber-950 font-bold px-2 py-0.5 rounded-md hover:bg-amber-100/60 cursor-pointer"
                        >
                          Tutup
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {trendingTopics.map((item, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSelectTrendingTopic(item)}
                            className="p-3 text-left rounded-xl bg-white border border-amber-200/80 hover:border-[#005596] hover:ring-2 hover:ring-[#005596]/20 transition-all space-y-1.5 group cursor-pointer shadow-xs"
                          >
                            <h5 className="text-xs font-bold text-slate-900 group-hover:text-[#005596] line-clamp-2 leading-snug">
                              {item.topic}
                            </h5>
                            <p className="text-[10px] text-slate-500 line-clamp-2 leading-tight">
                              💡 <strong className="text-slate-700">Tren:</strong> {item.searchRationale}
                            </p>
                            <div className="flex items-center gap-1 text-[9px] font-mono font-bold text-[#005596] bg-sky-50 px-2 py-0.5 rounded-md w-fit">
                              {item.recommendedProduct}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-tight block mb-1.5">
                      Target Sektor Industri
                    </label>
                    <select
                      value={aiInput.industry}
                      onChange={(e) => setAiInput({ ...aiInput, industry: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-xs text-slate-800 focus:bg-white focus:border-[#005596] outline-none cursor-pointer"
                    >
                      <option value="FMCG & F&B">FMCG & Makanan Minuman</option>
                      <option value="Building Materials & Cement">Bahan Bangunan & Semen</option>
                      <option value="Chemical & Pharma">Bahan Kimia & Farmasi</option>
                      <option value="Automotive & Transportation">Otomotif & Komponen</option>
                      <option value="Packaging & Logistics">Gudang & Intralogistik</option>
                      <option value="Glass & Metals">Kaca, Logam & Fabrikasi</option>
                      <option value="Wood & Furniture">Kayu & Furnitur</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-tight block mb-1.5">
                      Fokus Produk Schmalz / Binar
                    </label>
                    <select
                      value={aiInput.productFocus}
                      onChange={(e) => setAiInput({ ...aiInput, productFocus: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-xs text-slate-800 focus:bg-white focus:border-[#005596] outline-none cursor-pointer"
                    >
                      <option value="Schmalz JumboErgo">Schmalz JumboErgo (Sak 25-50kg / Papan Kayu)</option>
                      <option value="Schmalz JumboFlex">Schmalz JumboFlex (Kardus & Paket s/d 50kg)</option>
                      <option value="Schmalz JumboSprint">Schmalz JumboSprint (Karung Porous & Kemasan Longgar)</option>
                      <option value="Schmalz VacuMaster">Schmalz VacuMaster (Pelat Besi / Kaca s/d 2.000kg)</option>
                      <option value="Binar Quick-Lift (Servo)">Binar Quick-Lift (Perakitan Presisi Zero-Gravity)</option>
                      <option value="Schmalz Aluminium Crane Systems">Schmalz Aluminium Crane Systems & Jib Cranes</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-tight block mb-1.5">
                    Tantangan K3 & Masalah Nyata di Pabrik
                  </label>
                  <input
                    type="text"
                    value={aiInput.problemTarget}
                    onChange={(e) => setAiInput({ ...aiInput, problemTarget: e.target.value })}
                    placeholder="Contoh: Sak semen robek saat diangkat manual, keluhan LBP operator, dan tuntutan Permenaker No. 5/2018"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-xs text-slate-800 focus:bg-white focus:border-[#005596] outline-none"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100 flex items-start gap-3">
                  <Sparkles size={16} className="text-[#005596] shrink-0 mt-0.5" />
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    <strong className="text-slate-900 font-bold">Guardrail Ketat Aktif:</strong> AI diarahkan menggunakan terminologi teknis Schmalz/Binar yang nyata, acuan Permenaker No. 5/2018 & NIOSH, serta bebas dari pola tulisan AI (Zero em-dash, tanpa klise, dan gaya bahasa lugas).
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsAiWriterOpen(false)}
                    className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isGeneratingOutline}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#005596] hover:bg-[#004276] text-white text-xs font-bold shadow-[0_4px_16px_rgba(0,85,150,0.25)] hover:shadow-[0_8px_24px_rgba(0,85,150,0.35)] transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isGeneratingOutline ? (
                      <>
                        <RefreshCw size={13} className="animate-spin" />
                        <span>Menyusun Kerangka...</span>
                      </>
                    ) : (
                      <>
                        <span>Lanjut: Susun Kerangka AI</span>
                        <ArrowRight size={13} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Step 2: Review & Edit Outline */}
            {aiWizardStep === 2 && aiOutline && (
              <div className="space-y-4 overflow-y-auto pr-1 flex-1">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-tight block mb-1.5">
                    Judul Usulan Artikel (SEO-Optimized)
                  </label>
                  <input
                    type="text"
                    value={aiOutline.title}
                    onChange={(e) => setAiOutline({ ...aiOutline, title: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-xs sm:text-sm font-bold text-slate-900 focus:bg-white focus:border-[#005596] outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Target Slug URL</span>
                    <span className="font-mono text-slate-700 font-semibold truncate block mt-0.5">/news/{aiOutline.slug}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Target Pembaca</span>
                    <span className="text-slate-700 font-semibold truncate block mt-0.5">{aiOutline.targetAudience}</span>
                  </div>
                </div>

                {/* Sections Outline */}
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-tight block mb-2">
                    Struktur Sub-Heading & Poin Bahasan:
                  </label>
                  <div className="space-y-2.5">
                    {aiOutline.sections.map((sec: any, idx: number) => (
                      <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-[#005596]/10 text-[#005596] text-[10px] font-mono font-bold uppercase">
                            {sec.level}
                          </span>
                          <input
                            type="text"
                            value={sec.heading}
                            onChange={(e) => {
                              const updated = [...aiOutline.sections];
                              updated[idx].heading = e.target.value;
                              setAiOutline({ ...aiOutline, sections: updated });
                            }}
                            className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-800 outline-none focus:border-[#005596]"
                          />
                        </div>
                        <ul className="text-[11px] text-slate-600 space-y-1 pl-4 list-disc">
                          {sec.keyPoints.map((pt: string, pIdx: number) => (
                            <li key={pIdx}>{pt}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-tight block mb-1.5">
                    Catatan Tambahan untuk AI (Opsional)
                  </label>
                  <input
                    type="text"
                    value={additionalEditorialNotes}
                    onChange={(e) => setAdditionalEditorialNotes(e.target.value)}
                    placeholder="Contoh: Tekankan studi kasus pabrik semen di Jawa Barat..."
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs text-slate-800 outline-none focus:bg-white focus:border-[#005596]"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between shrink-0">
                  <button
                    type="button"
                    onClick={() => setAiWizardStep(1)}
                    className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                  >
                    ← Ubah Konteks
                  </button>

                  <button
                    type="button"
                    disabled={isGeneratingArticle}
                    onClick={handleGenerateFullArticle}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#005596] hover:bg-[#004276] text-white text-xs font-bold shadow-[0_4px_16px_rgba(0,85,150,0.25)] hover:shadow-[0_8px_24px_rgba(0,85,150,0.35)] transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isGeneratingArticle ? (
                      <>
                        <RefreshCw size={13} className="animate-spin" />
                        <span>Menulis Artikel Utuh (Guardrail Check)...</span>
                      </>
                    ) : (
                      <>
                        <span>Tulis Draft Lengkap dengan AI</span>
                        <ArrowRight size={13} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Full Draft Ready */}
            {aiWizardStep === 3 && aiGeneratedArticle && (
              <div className="space-y-4 overflow-y-auto pr-1 flex-1">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-emerald-900">
                      Draft Artikel Berhasil Dibuat Sesuai Standar Editorial!
                    </h4>
                    <p className="text-[11px] text-emerald-700 mt-0.5">
                      Semua aturan anti-AI (zero em-dash, tanpa klise) dan fakta Schmalz/Binar telah diverifikasi secara otomatis.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                    Preview Judul & Meta Description
                  </span>
                  <h4 className="font-extrabold text-slate-900 text-base">
                    {aiGeneratedArticle.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {aiGeneratedArticle.metaDescription}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {aiGeneratedArticle.tags?.map((t: string) => (
                      <span key={t} className="px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-[10px] font-bold text-slate-600">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* AI Text-to-Image Prompt Recommendation Box */}
                {(() => {
                  const promptList: Array<{
                    id: string;
                    label: string;
                    placement: string;
                    prompt: string;
                    concept: string;
                  }> =
                    aiGeneratedArticle.imagePrompts && aiGeneratedArticle.imagePrompts.length > 0
                      ? aiGeneratedArticle.imagePrompts
                      : [
                          {
                            id: 'cover',
                            label: 'Gambar 1: Cover Utama (16:9)',
                            placement: 'Header Artikel / Thumbnail Berita',
                            prompt: aiGeneratedArticle.imagePrompt || '',
                            concept: aiGeneratedArticle.imageConcept || '',
                          },
                        ];

                  const currentPrompt = promptList[activeImagePromptTab] || promptList[0];

                  return (
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/90 via-slate-50 to-white border border-indigo-200 shadow-xs space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-100 pb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs shrink-0">
                            <ImageIcon size={15} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="text-xs font-bold text-slate-900">
                                Rekomendasi Prompt Multi-Gambar AI ({promptList.length} Gambar Teknis)
                              </h5>
                              <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-mono font-bold">
                                Photorealistic 8K
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-500 mt-0.5">
                              Prompt teknis untuk Midjourney, DALL-E 3, atau Flux dengan parameter pencahayaan industri akurat.
                            </p>
                          </div>
                        </div>

                        {/* Tab Selector for Images */}
                        <div className="flex items-center gap-1 bg-white/80 p-1 rounded-full border border-indigo-200 shrink-0 self-start sm:self-auto">
                          {promptList.map((item, idx) => (
                            <button
                              key={item.id || idx}
                              type="button"
                              onClick={() => setActiveImagePromptTab(idx)}
                              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                                activeImagePromptTab === idx
                                  ? 'bg-indigo-600 text-white shadow-xs'
                                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                              }`}
                            >
                              Gambar {idx + 1}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Active Prompt Details */}
                      {currentPrompt && (
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-extrabold text-xs text-slate-900">
                                {currentPrompt.label}
                              </span>
                              <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-200/80 text-slate-700 font-mono">
                                📍 Penempatan: {currentPrompt.placement}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleCopyImagePrompt(currentPrompt.prompt, currentPrompt.id)}
                              className="px-3 py-1 rounded-full bg-white hover:bg-slate-50 text-indigo-700 border border-indigo-200 text-xs font-bold inline-flex items-center gap-1.5 shadow-xs transition-all cursor-pointer shrink-0"
                            >
                              {copiedPromptId === currentPrompt.id || (copiedPrompt && promptList.length === 1) ? (
                                <>
                                  <Check size={12} className="text-emerald-600" />
                                  <span className="text-emerald-700">Tersalin!</span>
                                </>
                              ) : (
                                <>
                                  <Copy size={12} />
                                  <span>Salin Prompt {activeImagePromptTab + 1}</span>
                                </>
                              )}
                            </button>
                          </div>

                          {/* Monospace prompt container */}
                          <div className="p-3 bg-slate-900 rounded-xl text-slate-100 font-mono text-[11px] leading-relaxed select-all shadow-inner border border-slate-800">
                            {currentPrompt.prompt}
                          </div>

                          {currentPrompt.concept && (
                            <div className="p-2.5 rounded-xl bg-white border border-indigo-100 text-[11px] text-slate-600 leading-snug">
                              <strong className="text-indigo-900 font-bold">Deskripsi Visual:</strong> {currentPrompt.concept}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Content Preview Box (Including Table of Contents & Internal Links) */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 max-h-72 overflow-y-auto space-y-2 text-xs text-slate-700">
                  <div className="flex items-center justify-between sticky top-0 bg-white pb-2 border-b border-slate-100">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">
                      Pratinjau Isi Konten (Dengan Daftar Isi & Internal Linking):
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      SEO Structure Ready
                    </span>
                  </div>
                  <div
                    className="prose prose-xs max-w-none text-slate-700 pt-2"
                    dangerouslySetInnerHTML={{ __html: aiGeneratedArticle.content }}
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between shrink-0">
                  <button
                    type="button"
                    onClick={() => setAiWizardStep(2)}
                    className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                  >
                    ← Kembali ke Kerangka
                  </button>

                  <button
                    type="button"
                    onClick={handleOpenInEditor}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#005596] hover:bg-[#004276] text-white text-xs font-bold shadow-[0_4px_16px_rgba(0,85,150,0.25)] hover:shadow-[0_8px_24px_rgba(0,85,150,0.35)] transition-all cursor-pointer"
                  >
                    <span>Buka di Editor Artikel & Siapkan Publikasi</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            )}
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
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400"
              >
                <X size={16} />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2 space-y-1 text-xs">
              <div className="px-3 py-1.5 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                Aksi Cepat
              </div>
              <button
                onClick={() => {
                  setIsCmdOpen(false);
                  router.push('/admin/editor');
                }}
                className="w-full text-left px-4 py-2.5 rounded-full hover:bg-slate-100 flex items-center gap-2.5 font-semibold text-slate-700 cursor-pointer"
              >
                <Plus size={15} className="text-[#005596]" />
                <span>Tulis Artikel Baru</span>
              </button>
              <button
                onClick={() => {
                  setIsCmdOpen(false);
                  handleOpenAddProject();
                }}
                className="w-full text-left px-4 py-2.5 rounded-full hover:bg-slate-100 flex items-center gap-2.5 font-semibold text-slate-700 cursor-pointer"
              >
                <Building2 size={15} className="text-[#005596]" />
                <span>Tambah Proyek Baru</span>
              </button>
              <button
                onClick={() => {
                  setIsCmdOpen(false);
                  handleSyncWordPress();
                }}
                className="w-full text-left px-4 py-2.5 rounded-full hover:bg-slate-100 flex items-center gap-2.5 font-semibold text-slate-700 cursor-pointer"
              >
                <RefreshCw size={15} className="text-[#005596]" />
                <span>Sinkronisasi Artikel WordPress</span>
              </button>
              <button
                onClick={() => {
                  setIsCmdOpen(false);
                  handleExportJson();
                }}
                className="w-full text-left px-4 py-2.5 rounded-full hover:bg-slate-100 flex items-center gap-2.5 font-semibold text-slate-700 cursor-pointer"
              >
                <Download size={15} className="text-[#005596]" />
                <span>Unduh Backup JSON</span>
              </button>

              <div className="px-3 pt-3 pb-1.5 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
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
                    className="w-full text-left px-4 py-2.5 rounded-full hover:bg-slate-100 flex items-center justify-between font-semibold text-slate-700 cursor-pointer"
                  >
                    <span className="truncate pr-4">{a.title}</span>
                    <span className="text-[10px] text-slate-400 shrink-0 font-mono">/news/{a.slug}</span>
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}
      {/* ========================================================================= */}
      {/* MODAL TRANSKRIP SESI AI CHATBOT */}
      {/* ========================================================================= */}
      {selectedLeadForTranscript && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-slate-900 to-[#005596] text-white flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest bg-white/20 text-white px-2 py-0.5 rounded-full font-bold">
                    Transkrip Sesi Chatbot
                  </span>
                  <span className="text-xs text-blue-200">
                    {selectedLeadForTranscript.messages?.length || 0} Pesan
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-white mt-1">
                  {selectedLeadForTranscript.name} &bull; {selectedLeadForTranscript.company}
                </h3>
                <p className="text-xs text-blue-100 flex items-center gap-3 mt-0.5">
                  <span>{selectedLeadForTranscript.email}</span>
                  {selectedLeadForTranscript.phone && (
                    <span>&bull; {selectedLeadForTranscript.phone}</span>
                  )}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLeadForTranscript(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
              {(!selectedLeadForTranscript.messages || selectedLeadForTranscript.messages.length === 0) ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  Belum ada riwayat percakapan untuk prospek ini.
                </div>
              ) : (
                selectedLeadForTranscript.messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 px-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {msg.sender === 'user' ? selectedLeadForTranscript.name : 'AI Virtual Engineer'}
                      </span>
                      {msg.timestamp && (
                        <span className="text-[9px] text-slate-400">
                          {new Date(msg.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      )}
                    </div>
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-xs ${
                        msg.sender === 'user'
                          ? 'bg-[#005596] text-white rounded-tr-none'
                          : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
                      }`}
                    >
                      <ChatMarkdown
                        content={msg.text}
                        isUserMessage={msg.sender === 'user'}
                        className="text-xs"
                      />
                      {msg.isCommercial && (
                        <div className="mt-2 pt-2 border-t border-amber-200 text-[10px] font-bold text-amber-700 flex items-center gap-1">
                          <AlertTriangle size={11} /> Terdeteksi Menanyakan Harga / Stok / PO
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-white border-t border-slate-100 flex items-center justify-between gap-3">
              <div className="text-[11px] text-slate-400">
                Waktu Submit: {new Date(selectedLeadForTranscript.createdAt).toLocaleString('id-ID')}
              </div>
              <div className="flex items-center gap-2">
                {selectedLeadForTranscript.phone && (
                  <a
                    href={`https://wa.me/${selectedLeadForTranscript.phone.replace(/\D/g, '').replace(/^0/, '62')}?text=Halo%20${encodeURIComponent(
                      selectedLeadForTranscript.name
                    )},%20kami%20telah%20melihat%20diskusi%20Anda%20dengan%20tim%20teknis%20di%20website%20DQW.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-xs"
                  >
                    <Phone size={11} />
                    <span>Chat WhatsApp</span>
                  </a>
                )}
                <a
                  href={`mailto:${selectedLeadForTranscript.email}?subject=Follow Up Konsultasi: PT Dimensi Quantum Wahyudi`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#005596] hover:bg-[#004276] text-white text-xs font-bold transition-all shadow-xs"
                >
                  <Mail size={11} />
                  <span>Kirim Email</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedLeadForTranscript(null)}
                  className="px-4 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition-colors cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
