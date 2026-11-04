'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import StarRating from '@/components/ui/StarRating';
import { testimonials } from '@/data';

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -200 : 200,
      opacity: 0,
    }),
  };

  const t = testimonials[current];

  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="What Our Guests Say"
          subtitle="Hear from discerning travelers who have experienced the magic of Skyshore."
          centered
        />

        <div
          className="relative mx-auto max-w-4xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative overflow-hidden rounded-2xl bg-white/60 p-8 backdrop-blur-xl backdrop-saturate-[180%] border border-primary/10 shadow-[0_8px_32px_rgba(0,0,0,0.06)] md:p-12">
            <Quote className="absolute left-6 top-6 h-12 w-12 text-primary/10 md:left-10 md:top-10 md:h-16 md:w-16" />

            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={t.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 text-center"
              >
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="mx-auto mb-6 h-16 w-16 rounded-full border-2 border-primary/20 object-cover"
                />

                <p className="mb-6 text-base leading-relaxed text-gray-600 italic md:text-lg md:leading-relaxed">
                  &ldquo;{t.content}&rdquo;
                </p>

                <div className="mb-3 flex justify-center">
                  <StarRating rating={t.rating} readonly size={18} />
                </div>

                <h4 className="text-lg font-bold font-playfair text-luxury">
                  {t.name}
                </h4>
                <p className="text-sm text-gray-400">{t.role}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={prev}
            className="absolute left-0 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20 bg-white p-2 shadow-lg transition-all hover:bg-primary hover:text-luxury"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 z-20 -translate-y-1/2 translate-x-1/2 rounded-full border border-primary/20 bg-white p-2 shadow-lg transition-all hover:bg-primary hover:text-luxury"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-gray-300 hover:bg-primary/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
