'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function PoolExperience() {
  return (
    <section className="relative isolate min-h-[480px] overflow-hidden bg-secondary sm:min-h-[560px]">
      <Image
        src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=2200&h=1200&fit=crop"
        alt="A garden-side swimming pool in a tropical villa setting"
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,34,27,0.78)_0%,rgba(16,34,27,0.34)_54%,rgba(16,34,27,0.08)_100%)]" />
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.75 }}
        className="relative mx-auto flex min-h-[480px] max-w-7xl flex-col justify-center px-6 py-20 text-ivory sm:min-h-[560px] sm:px-10 lg:px-14"
      >
        <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#D7C49A]">
          The poolside pause
        </p>
        <h2 className="max-w-2xl font-playfair text-5xl font-medium leading-[1.03] sm:text-6xl lg:text-7xl">
          Slow down.
          <br />
          <span className="italic">Swim. Breathe.</span>
        </h2>
        <p className="mt-6 max-w-md text-sm leading-6 text-white/80 sm:text-base">
          Let the day move gently, between the water, the garden and the warmth
          of the island evening.
        </p>
        <Link
          href="/gallery"
          className="mt-8 inline-flex w-fit items-center gap-3 border-b border-white/60 pb-2 text-sm font-medium text-white transition-colors hover:border-[#D7C49A] hover:text-[#E9DCC0]"
        >
          Explore the gallery <ArrowRight size={16} />
        </Link>
      </motion.div>
    </section>
  );
}