'use client';

import React, { useRef, useState } from 'react';

interface MobileSnapCarouselProps {
  children: React.ReactNode;
  desktopGridClassName?: string;
  cardWidthClass?: string;
  swipeLabelId?: string;
  swipeLabelEn?: string;
  isId?: boolean;
  className?: string;
  breakpoint?: 'sm' | 'md' | 'lg';
}

export function MobileSnapCarousel({
  children,
  desktopGridClassName = 'grid-cols-3 gap-4',
  cardWidthClass = 'w-[85vw] max-w-[340px] shrink-0 snap-center',
  swipeLabelId = 'Geser untuk melihat kartu lainnya',
  swipeLabelEn = 'Swipe to view more cards',
  isId = true,
  className = '',
  breakpoint = 'md',
}: MobileSnapCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const childArray = React.Children.toArray(children);
  const count = childArray.length;

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const cardWidth = clientWidth * 0.82;
    const index = Math.round(scrollLeft / (cardWidth > 0 ? cardWidth : 1));
    setActiveIndex(Math.min(Math.max(index, 0), count - 1));
  };

  const scrollTo = (index: number) => {
    if (!scrollRef.current) return;
    const cards = scrollRef.current.children;
    if (cards[index]) {
      (cards[index] as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  };

  const mobileDisplayClass =
    breakpoint === 'lg' ? 'flex lg:hidden' : breakpoint === 'sm' ? 'flex sm:hidden' : 'flex md:hidden';
  const desktopDisplayClass =
    breakpoint === 'lg' ? 'hidden lg:grid' : breakpoint === 'sm' ? 'hidden sm:grid' : 'hidden md:grid';
  const paginationDisplayClass =
    breakpoint === 'lg' ? 'flex lg:hidden' : breakpoint === 'sm' ? 'flex sm:hidden' : 'flex md:hidden';

  return (
    <div className={`relative ${className}`}>
      {/* Mobile Snap Carousel */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className={`${mobileDisplayClass} overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 sm:-mx-6 sm:px-6 pb-2 gap-4`}
      >
        {childArray.map((child, idx) => (
          <div key={idx} className={cardWidthClass}>
            {child}
          </div>
        ))}
      </div>

      {/* Desktop Grid Layout */}
      <div className={`${desktopDisplayClass} ${desktopGridClassName}`}>
        {childArray}
      </div>

      {/* Mobile Dynamic Pagination Dots & Counter */}
      {count > 1 && (
        <div className={`${paginationDisplayClass} flex-col items-center justify-center gap-1.5 mt-3 mb-1`}>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: count }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  activeIndex === idx
                    ? 'w-6 h-1.5 bg-[#005596]'
                    : 'w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
            <span>{isId ? swipeLabelId : swipeLabelEn}</span>
            <span className="text-[#005596] font-bold">{`(${activeIndex + 1} / ${count})`}</span>
          </span>
        </div>
      )}
    </div>
  );
}
