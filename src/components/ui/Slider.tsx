'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface SliderImage {
  src: string;
  alt?: string;
}

interface SliderProps {
  images: SliderImage[];
  autoplay?: boolean;
  interval?: number;
  className?: string;
  height?: string;
  showArrows?: boolean;
  showDots?: boolean;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
  }),
};

export default function Slider({
  images,
  autoplay = true,
  interval = 5000,
  className,
  height = 'h-[500px]',
  showArrows = true,
  showDots = true,
}: SliderProps) {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = ((page % images.length) + images.length) % images.length;

  const paginate = useCallback(
    (newDirection: number) => {
      setPage([page + newDirection, newDirection]);
    },
    [page],
  );

  useEffect(() => {
    if (!autoplay || images.length <= 1) return;
    const timer = setInterval(() => paginate(1), interval);
    return () => clearInterval(timer);
  }, [autoplay, interval, paginate, images.length]);

  if (images.length === 0) return null;

  return (
    <div className={cn('relative overflow-hidden rounded-2xl', height, className)}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={images[imageIndex].src}
          alt={images[imageIndex].alt || ''}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: 'spring' as const, stiffness: 300, damping: 30 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {showArrows && images.length > 1 && (
        <>
          <button
            onClick={() => paginate(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors cursor-pointer z-10"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors cursor-pointer z-10"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {showDots && images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setPage([i, i > imageIndex ? 1 : -1])}
              className={cn(
                'w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer',
                i === imageIndex
                  ? 'bg-primary w-8'
                  : 'bg-white/50 hover:bg-white/80',
              )}
            />
          ))}
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
    </div>
  );
}
