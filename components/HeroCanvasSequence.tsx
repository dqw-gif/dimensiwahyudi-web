'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { MotionValue } from 'framer-motion';

interface HeroCanvasSequenceProps {
  progress: MotionValue<number>;
  className?: string;
}

const TOTAL_FRAMES = 60;

export default function HeroCanvasSequence({ progress, className = '' }: HeroCanvasSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const [, setLoadedCount] = useState(0);
  const currentFrameRef = useRef(0);
  const isMobileRef = useRef(false);

  // Render a specific frame onto the canvas
  const renderFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Find requested frame or fallback to nearest loaded frame
    let img = imagesRef.current[frameIdx];
    if (!img || !img.complete) {
      // Find nearest loaded frame
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const lower = frameIdx - offset;
        const upper = frameIdx + offset;
        if (lower >= 0 && imagesRef.current[lower]?.complete) {
          img = imagesRef.current[lower];
          break;
        }
        if (upper < TOTAL_FRAMES && imagesRef.current[upper]?.complete) {
          img = imagesRef.current[upper];
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cWidth = canvas.width;
    const cHeight = canvas.height;
    if (cWidth === 0 || cHeight === 0) return;

    const isMobile = isMobileRef.current;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = cWidth / cHeight;
    let renderW: number;
    let renderH: number;
    let renderX: number;
    let renderY: number;

    if (isMobile) {
      // Dynamic Adaptive Scaling: Ensure the right side of the warehouse background NEVER runs out
      const rightMarginRatio = (1280 - 1002) / 1280; // ~0.2172
      const minRequiredW = ((cWidth / 2) + 20) / rightMarginRatio;

      // Use whichever is larger: required width to cover right edge, or base scale 0.64
      const baseW = (cHeight * 0.64) * imgRatio;
      renderW = Math.max(baseW, minRequiredW);
      renderH = renderW / imgRatio;

      // Mathematical horizontal centering: keeps vacuum & box dead center on screen
      renderX = (cWidth / 2) - (renderW * (1002 / 1280));

      // Mathematical vertical centering: target center at 60% of screen height
      const boxCenterYInImg = renderH * (430 / 720);
      renderY = (cHeight * 0.60) - boxCenterYInImg;
    } else {
      // Desktop: 16:9 full background with lifter on right
      if (canvasRatio > imgRatio) {
        renderW = cWidth;
        renderH = cWidth / imgRatio;
      } else {
        renderH = cHeight;
        renderW = cHeight * imgRatio;
      }
      renderX = (cWidth - renderW) * 0.65;
      renderY = (cHeight - renderH) * 0.50;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.clearRect(0, 0, cWidth, cHeight);
    ctx.drawImage(img, renderX, renderY, renderW, renderH);
    currentFrameRef.current = frameIdx;
  }, []);

  // Resize canvas according to display resolution & DPR
  const updateCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    isMobileRef.current = window.innerWidth < 1024;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);

    renderFrame(currentFrameRef.current);
  }, [renderFrame]);

  // Preload all frames on mount
  useEffect(() => {
    let isCancelled = false;

    // Load Frame 1 immediately
    const firstImg = new Image();
    firstImg.src = '/hero-sequence/frame_001.webp';
    firstImg.onload = () => {
      if (isCancelled) return;
      imagesRef.current[0] = firstImg;
      setLoadedCount((prev) => prev + 1);
      updateCanvasDimensions();
    };

    // Load remaining frames
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i + 1).padStart(3, '0');
      img.src = `/hero-sequence/frame_${frameNum}.webp`;
      img.onload = () => {
        if (isCancelled) return;
        imagesRef.current[i] = img;
        setLoadedCount((prev) => prev + 1);
      };
    }

    return () => {
      isCancelled = true;
    };
  }, [updateCanvasDimensions]);

  // Resize observer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    updateCanvasDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasDimensions();
    });

    resizeObserver.observe(canvas);
    window.addEventListener('resize', updateCanvasDimensions);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateCanvasDimensions);
    };
  }, [updateCanvasDimensions]);

  // Sync scroll progress to canvas frames
  useEffect(() => {
    let animFrameId: number;

    const unsubscribe = progress.on('change', (latestProgress) => {
      cancelAnimationFrame(animFrameId);
      animFrameId = requestAnimationFrame(() => {
        const clamped = Math.max(0, Math.min(1, latestProgress));
        const targetFrame = Math.min(
          TOTAL_FRAMES - 1,
          Math.floor(clamped * (TOTAL_FRAMES - 1))
        );
        renderFrame(targetFrame);
      });
    });

    return () => {
      unsubscribe();
      cancelAnimationFrame(animFrameId);
    };
  }, [progress, renderFrame]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
