'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import BookingWidget from '@/components/home/BookingWidget';
import { assetUrl } from '@/lib/site';

export default function HeroSection() {
  return (
    <>
      <section className="relative isolate flex min-h-[690px] h-[92svh] max-h-[980px] items-center overflow-hidden bg-secondary">
        <Image
          src={assetUrl('/images/hero/skyshore-hero.jpg')}
          alt="Skyshore villa retreat in Tangalle, Sri Lanka"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,34,27,0.82)_0%,rgba(16,34,27,0.42)_48%,rgba(16,34,27,0.06)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(16,34,27,0.46)_0%,transparent_45%)]" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-10 pt-24 text-ivory sm:px-10 lg:px-14"
        >
          <p className="mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D7C49A]">
            <span className="h-px w-10 bg-[#D7C49A]" />
            Tangalle • Southern Sri Lanka
          </p>
          <h1 className="max-w-3xl font-playfair text-5xl font-medium leading-[0.98] sm:text-6xl lg:text-8xl">
            Your tropical escape in
            <br />
            <span className="italic text-[#E8DFC9]">Tangalle.</span>
          </h1>
          <p className="mt-7 max-w-lg text-base leading-7 text-white/80 sm:text-lg">
            Private villas, tropical serenity and unforgettable experiences in beautiful Tangalle, Sri Lanka.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Link
              href="/booking"
              className="inline-flex min-h-12 items-center gap-3 bg-primary px-6 py-3 text-sm font-semibold text-luxury transition-colors hover:bg-[#C5AE7D]"
            >
              Book Your Stay <ArrowRight size={16} />
            </Link>
            <Link
              href="/discover-tangalle"
              className="inline-flex min-h-12 items-center gap-2 border-b border-white/50 px-1 py-3 text-sm font-medium text-white transition-colors hover:border-white"
            >
              Discover Tangalle
            </Link>
          </div>
          <a
            href="#villas"
            className="absolute bottom-0 right-6 hidden items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-white/70 lg:flex"
          >
            Discover the retreat <ArrowDown size={14} />
          </a>
        </motion.div>
      </section>
      <div className="relative z-20 mx-auto -mt-1 w-full max-w-7xl px-4 sm:px-8 lg:-mt-12 lg:px-12">
        <BookingWidget />
      </div>
    </>
  );
}