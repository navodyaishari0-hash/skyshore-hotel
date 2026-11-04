'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Expand, ZoomIn } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [direction, setDirection] = useState(0);
  const [errors, setErrors] = useState<Record<number, boolean>>({});

  const safeImages = images.length > 0 ? images : [];
  const totalImages = safeImages.length;

  const goTo = useCallback(
    (index: number, dir: number) => {
      setDirection(dir);
      setCurrentIndex(index);
    },
    []
  );

  const goNext = useCallback(() => {
    if (totalImages === 0) return;
    goTo((currentIndex + 1) % totalImages, 1);
  }, [currentIndex, totalImages, goTo]);

  const goPrev = useCallback(() => {
    if (totalImages === 0) return;
    goTo((currentIndex - 1 + totalImages) % totalImages, -1);
  }, [currentIndex, totalImages, goTo]);

  const handleImageError = (index: number) => {
    setErrors((prev) => ({ ...prev, [index]: true }));
  };

  if (totalImages === 0) {
    return (
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-secondary to-luxury flex items-center justify-center">
        <span className="text-primary/50 text-4xl font-playfair">No Images</span>
      </div>
    );
  }

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  function renderImage(imgSrc: string, idx: number, className: string) {
    if (errors[idx]) {
      return (
        <div className={`${className} bg-gradient-to-br from-secondary to-luxury flex items-center justify-center`}>
          <span className="text-primary/50 text-2xl font-playfair">Image {idx + 1}</span>
        </div>
      );
    }
    return (
      <Image
        src={imgSrc}
        alt={`Room image ${idx + 1}`}
        fill
        sizes="(max-width: 768px) 100vw, 80vw"
        onError={() => handleImageError(idx)}
        className={className}
      />
    );
  }

  return (
    <>
      <div className="space-y-3">
        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden group bg-gray-100">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' as const }}
              className="absolute inset-0"
            >
              {renderImage(safeImages[currentIndex], currentIndex, 'w-full h-full object-cover')}
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {totalImages > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-luxury opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white shadow-lg"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-luxury opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white shadow-lg"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <span className="bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
              {currentIndex + 1} / {totalImages}
            </span>
            <button
              onClick={() => setLightboxOpen(true)}
              className="bg-black/60 backdrop-blur-sm text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
              aria-label="Open lightbox"
            >
              <Expand className="w-4 h-4" />
            </button>
          </div>
        </div>

        {totalImages > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {safeImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx, idx > currentIndex ? 1 : -1)}
                className={`relative shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  idx === currentIndex
                    ? 'border-primary shadow-md'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                {renderImage(img, idx, 'w-full h-full object-cover')}
              </button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors z-50"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm flex items-center gap-2 z-50">
              <ZoomIn className="w-4 h-4" />
              <span className="font-medium">
                {currentIndex + 1} / {totalImages}
              </span>
            </div>

            <div className="relative w-full max-w-5xl h-[80vh] px-16" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: 'easeInOut' as const }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {renderImage(
                    safeImages[currentIndex],
                    currentIndex,
                    'max-w-full max-h-full object-contain rounded-lg'
                  )}
                </motion.div>
              </AnimatePresence>

              {totalImages > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goPrev();
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors z-50"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goNext();
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors z-50"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {totalImages > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-50">
                {safeImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      goTo(idx, idx > currentIndex ? 1 : -1);
                    }}
                    className={`w-14 h-10 rounded-md overflow-hidden border-2 transition-all ${
                      idx === currentIndex
                        ? 'border-primary'
                        : 'border-transparent opacity-50 hover:opacity-100'
                    }`}
                  >
                    {renderImage(img, idx, 'w-full h-full object-cover')}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
