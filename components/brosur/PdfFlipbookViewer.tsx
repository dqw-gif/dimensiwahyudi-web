'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    X, 
    ChevronLeft, 
    ChevronRight, 
    Download, 
    Maximize2, 
    Minimize2, 
    ZoomIn, 
    ZoomOut, 
    Loader2, 
    BookOpen,
    Share2,
    Check
} from 'lucide-react';
import type { BrochureItem } from '@/app/brosur/BrochuresClient';

interface PdfFlipbookViewerProps {
    brochure: BrochureItem | null;
    onClose: () => void;
}

// Helper to safely convert base64 payload to Uint8Array
function base64ToUint8Array(base64: string): Uint8Array {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

// Helper to safely load local PDF.js from /public without triggering server-side canvas bundling
function getPdfJs(): Promise<any> {
    if (typeof window === 'undefined') return Promise.reject('SSR');
    if ((window as any).pdfjsLib) {
        return Promise.resolve((window as any).pdfjsLib);
    }

    return new Promise((resolve, reject) => {
        const existing = document.getElementById('pdfjs-dist-script');
        if (existing) {
            existing.addEventListener('load', () => resolve((window as any).pdfjsLib));
            existing.addEventListener('error', reject);
            return;
        }

        const script = document.createElement('script');
        script.id = 'pdfjs-dist-script';
        script.src = '/pdf.min.js';
        script.onload = () => {
            const lib = (window as any).pdfjsLib;
            if (lib) {
                lib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
            }
            resolve(lib);
        };
        script.onerror = (err) => reject(err);
        document.body.appendChild(script);
    });
}

export default function PdfFlipbookViewer({ brochure, onClose }: PdfFlipbookViewerProps) {
    const [numPages, setNumPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [zoom, setZoom] = useState<number>(1);
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
    const [turnDirection, setTurnDirection] = useState<'next' | 'prev'>('next');
    const [copied, setCopied] = useState<boolean>(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pdfDocRef = useRef<any>(null);
    const renderTaskRef = useRef<any>(null);

    // Load PDF Document via locally served pdf.min.js
    useEffect(() => {
        if (!brochure) return;

        let isMounted = true;
        setIsLoading(true);
        setLoadError(null);
        setCurrentPage(1);

        async function loadPdf() {
            try {
                const pdfjsLib = await getPdfJs();
                if (!pdfjsLib) throw new Error('PDF.js library could not be loaded');

                // 1. Fetch document via JSON API route. 
                // The URL has NO .pdf extension and returns application/json, guaranteeing that
                // browser download managers (like IDM) will NEVER intercept it with 204 or empty bytes.
                let pdfBytes: Uint8Array | null = null;
                try {
                    const res = await fetch(`/api/pdf-stream?id=${encodeURIComponent(brochure!.id)}`);
                    if (res.ok) {
                        const json = await res.json();
                        if (json.success && json.data) {
                            pdfBytes = base64ToUint8Array(json.data);
                        }
                    }
                } catch (apiErr) {
                    console.warn('API stream fetch error, falling back:', apiErr);
                }

                // Fallback to direct fetch if API route is unavailable
                if (!pdfBytes || pdfBytes.length === 0) {
                    const fallbackRes = await fetch(`${brochure!.pdfUrl}?view=inline&t=${Date.now()}`);
                    const arrayBuffer = await fallbackRes.arrayBuffer();
                    if (arrayBuffer.byteLength > 0) {
                        pdfBytes = new Uint8Array(arrayBuffer);
                    }
                }

                if (!pdfBytes || pdfBytes.length === 0) {
                    throw new Error('Dokumen PDF kosong atau gagal diunduh.');
                }

                // 2. Load directly from in-memory Uint8Array
                const loadingTask = pdfjsLib.getDocument({
                    data: pdfBytes
                });
                const pdf = await loadingTask.promise;

                if (!isMounted) return;
                pdfDocRef.current = pdf;
                setNumPages(pdf.numPages);
                setIsLoading(false);
            } catch (err: any) {
                if (!isMounted) return;
                console.error('Failed to load PDF for flipbook:', err);
                setLoadError('Gagal memuat dokumen PDF. Anda dapat mengunduh langsung filenya.');
                setIsLoading(false);
            }
        }

        loadPdf();

        return () => {
            isMounted = false;
            if (renderTaskRef.current) {
                try {
                    renderTaskRef.current.cancel();
                } catch {
                    // Ignore cancel error
                }
            }
        };
    }, [brochure]);

    // Render Active Page onto Canvas
    const renderPage = useCallback(async (pageNumber: number) => {
        if (!pdfDocRef.current || !canvasRef.current) return;

        try {
            if (renderTaskRef.current) {
                try {
                    renderTaskRef.current.cancel();
                } catch {
                    // Ignore
                }
            }

            const page = await pdfDocRef.current.getPage(pageNumber);
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            if (!context) return;

            // Target viewport calculation based on window size and zoom
            const baseScale = window.innerWidth < 768 ? 0.9 : 1.35;
            const viewport = page.getViewport({ scale: baseScale * zoom });

            const dpr = window.devicePixelRatio || 1;
            canvas.width = viewport.width * dpr;
            canvas.height = viewport.height * dpr;
            canvas.style.width = `${viewport.width}px`;
            canvas.style.height = `${viewport.height}px`;

            context.scale(dpr, dpr);

            const renderContext = {
                canvasContext: context,
                viewport: viewport,
            };

            const task = page.render(renderContext);
            renderTaskRef.current = task;
            await task.promise;
        } catch (err: any) {
            if (err?.name !== 'RenderingCancelledException') {
                console.warn('Canvas page render warning:', err);
            }
        }
    }, [zoom]);

    useEffect(() => {
        if (!isLoading && numPages > 0) {
            renderPage(currentPage);
        }
    }, [currentPage, isLoading, numPages, renderPage]);

    // Page navigation
    const goToNextPage = useCallback(() => {
        if (currentPage < numPages) {
            setTurnDirection('next');
            setCurrentPage((prev) => prev + 1);
        }
    }, [currentPage, numPages]);

    const goToPrevPage = useCallback(() => {
        if (currentPage > 1) {
            setTurnDirection('prev');
            setCurrentPage((prev) => prev - 1);
        }
    }, [currentPage]);

    // Keyboard navigation (Left/Right arrow, ESC)
    useEffect(() => {
        if (!brochure) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
                e.preventDefault();
                goToNextPage();
            } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
                e.preventDefault();
                goToPrevPage();
            } else if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [brochure, goToNextPage, goToPrevPage, onClose]);

    // Fullscreen toggle
    const toggleFullscreen = () => {
        if (!containerRef.current) return;
        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen().catch(() => {});
            setIsFullscreen(true);
        } else {
            document.exitFullscreen().catch(() => {});
            setIsFullscreen(false);
        }
    };

    // Share link
    const handleShare = () => {
        if (typeof window !== 'undefined' && navigator.clipboard) {
            navigator.clipboard.writeText(window.location.origin + '/brosur');
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (!brochure) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[120] bg-slate-950/90 backdrop-blur-xl flex flex-col items-center justify-between overflow-hidden"
                ref={containerRef}
                role="dialog"
                aria-modal="true"
            >
                {/* 1. TOP HEADER TOOLBAR */}
                <header className="w-full bg-slate-900/90 border-b border-white/10 px-4 sm:px-6 py-3 flex items-center justify-between gap-4 z-20 backdrop-blur-md">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-[#005596] flex items-center justify-center text-white shrink-0 shadow-xs">
                            <BookOpen size={16} />
                        </div>
                        <div className="min-w-0">
                            <h3 className="text-white text-xs sm:text-sm font-bold truncate max-w-xs sm:max-w-md">
                                {brochure.title}
                            </h3>
                            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                                <span>{brochure.categoryLabel}</span>
                                <span>&bull;</span>
                                <span>{brochure.fileSize}</span>
                            </div>
                        </div>
                    </div>

                    {/* Toolbar Controls */}
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        {/* Zoom Controls */}
                        <div className="hidden sm:flex items-center bg-slate-800/80 rounded-xl p-0.5 border border-white/10">
                            <button
                                type="button"
                                onClick={() => setZoom((z) => Math.max(0.75, z - 0.25))}
                                className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-700/60 transition-colors"
                                title="Zoom Out"
                            >
                                <ZoomOut size={15} />
                            </button>
                            <span className="text-[10px] font-mono font-bold text-slate-300 px-2">
                                {Math.round(zoom * 100)}%
                            </span>
                            <button
                                type="button"
                                onClick={() => setZoom((z) => Math.min(2, z + 0.25))}
                                className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-700/60 transition-colors"
                                title="Zoom In"
                            >
                                <ZoomIn size={15} />
                            </button>
                        </div>

                        {/* Fullscreen */}
                        <button
                            type="button"
                            onClick={toggleFullscreen}
                            className="hidden sm:flex p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/10 transition-colors"
                            title={isFullscreen ? 'Keluar Layar Penuh' : 'Layar Penuh'}
                        >
                            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                        </button>

                        {/* Direct Download */}
                        <a
                            href={brochure.pdfUrl}
                            download
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#005596] hover:bg-[#00447a] text-white text-xs font-bold transition-all shadow-xs"
                            title="Download PDF"
                        >
                            <Download size={14} />
                            <span className="hidden sm:inline">Download PDF</span>
                        </a>

                        {/* Close Button */}
                        <button
                            type="button"
                            onClick={onClose}
                            className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-600/90 text-slate-300 hover:text-white border border-white/10 transition-colors"
                            title="Tutup (Esc)"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </header>

                {/* 2. MAIN 3D FLIPBOOK STAGE */}
                <main className="flex-1 w-full flex items-center justify-center p-3 sm:p-6 overflow-hidden relative">
                    {/* Previous Page Floating Button */}
                    <button
                        type="button"
                        onClick={goToPrevPage}
                        disabled={currentPage <= 1 || isLoading}
                        className={`absolute left-4 sm:left-8 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-slate-900/80 hover:bg-[#005596] text-white flex items-center justify-center border border-white/15 shadow-2xl backdrop-blur-md transition-all duration-200 ${
                            currentPage <= 1 || isLoading ? 'opacity-20 cursor-not-allowed' : 'hover:scale-110 cursor-pointer active:scale-95'
                        }`}
                        aria-label="Halaman Sebelumnya"
                        title="Halaman Sebelumnya (Panah Kiri)"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    {/* Next Page Floating Button */}
                    <button
                        type="button"
                        onClick={goToNextPage}
                        disabled={currentPage >= numPages || isLoading}
                        className={`absolute right-4 sm:right-8 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-slate-900/80 hover:bg-[#005596] text-white flex items-center justify-center border border-white/15 shadow-2xl backdrop-blur-md transition-all duration-200 ${
                            currentPage >= numPages || isLoading ? 'opacity-20 cursor-not-allowed' : 'hover:scale-110 cursor-pointer active:scale-95'
                        }`}
                        aria-label="Halaman Selanjutnya"
                        title="Halaman Selanjutnya (Panah Kanan)"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Loading State */}
                    {isLoading && (
                        <div className="flex flex-col items-center justify-center gap-3 text-slate-300">
                            <Loader2 size={36} className="animate-spin text-[#0077c8]" />
                            <span className="text-xs sm:text-sm font-mono tracking-wider">
                                Membuka Lembaran Brosur Digital...
                            </span>
                        </div>
                    )}

                    {/* Error State Fallback */}
                    {loadError && (
                        <div className="max-w-md p-6 bg-slate-900/90 border border-slate-700 rounded-3xl text-center space-y-4 shadow-2xl">
                            <BookOpen size={36} className="mx-auto text-amber-400" />
                            <h4 className="text-white font-bold text-base">Gagal Membuka Viewer Interaktif</h4>
                            <p className="text-xs text-slate-400">{loadError}</p>
                            <a
                                href={brochure.pdfUrl}
                                download
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#005596] text-white text-xs font-bold"
                            >
                                <Download size={14} />
                                <span>Unduh File PDF Langsung</span>
                            </a>
                        </div>
                    )}

                    {/* 3D Book Page Container */}
                    {!isLoading && !loadError && (
                        <div 
                            className="relative flex items-center justify-center"
                            style={{ perspective: '1600px' }}
                        >
                            {/* Realistic Book Spine Shadow behind */}
                            <div className="absolute -inset-4 bg-black/60 rounded-3xl blur-2xl pointer-events-none" />

                            <motion.div
                                key={currentPage}
                                initial={{
                                    rotateY: turnDirection === 'next' ? 24 : -24,
                                    opacity: 0.6,
                                    scale: 0.98,
                                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
                                }}
                                animate={{
                                    rotateY: 0,
                                    opacity: 1,
                                    scale: 1,
                                    boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.8)'
                                }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 280,
                                    damping: 24,
                                }}
                                className="relative bg-white rounded-r-2xl rounded-l-md overflow-hidden border border-slate-200/50 shadow-2xl origin-left"
                            >
                                {/* Subtle Realistic Book Spine Binding Effect on Left Edge */}
                                <div className="absolute top-0 bottom-0 left-0 w-4 bg-gradient-to-r from-slate-900/40 via-slate-700/20 to-transparent z-10 pointer-events-none" />
                                
                                {/* Inner Page Paper Crease Shadow */}
                                <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-transparent pointer-events-none z-10" />

                                {/* High-Res Rendered PDF Canvas */}
                                <canvas
                                    ref={canvasRef}
                                    className="max-h-[75vh] w-auto object-contain block mx-auto bg-white select-none"
                                />
                            </motion.div>
                        </div>
                    )}
                </main>

                {/* 3. BOTTOM FOOTER NAVIGATION DOCK */}
                <footer className="w-full bg-slate-900/90 border-t border-white/10 px-4 sm:px-6 py-3 flex items-center justify-between gap-4 z-20 backdrop-blur-md">
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={handleShare}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-colors border border-white/10"
                        >
                            {copied ? <Check size={13} className="text-emerald-400" /> : <Share2 size={13} />}
                            <span>{copied ? 'Link Tersalin!' : 'Bagikan'}</span>
                        </button>
                    </div>

                    {/* Page Indicator & Slider */}
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={goToPrevPage}
                            disabled={currentPage <= 1}
                            className="p-1 rounded-lg text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 cursor-pointer"
                        >
                            <ChevronLeft size={18} />
                        </button>

                        <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-white bg-slate-800 px-3 py-1 rounded-lg border border-white/10">
                                {currentPage} <span className="text-slate-500 font-normal">/</span> {numPages || '...'}
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={goToNextPage}
                            disabled={currentPage >= numPages}
                            className="p-1 rounded-lg text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 cursor-pointer"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>

                    {/* Keyboard Tip */}
                    <div className="hidden md:flex items-center gap-2 text-[11px] font-mono text-slate-400">
                        <span>Use arrow keys ◄ ► on keyboard to flip pages</span>
                    </div>
                </footer>
            </motion.div>
        </AnimatePresence>
    );
}
