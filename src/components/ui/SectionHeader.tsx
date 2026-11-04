'use client';

import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  centered = false,
  light = false,
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className={cn(centered && 'text-center', 'mb-12', className)}
    >
      <h2
        className={cn(
          'text-3xl md:text-4xl font-bold font-playfair',
          light ? 'text-cream' : 'text-luxury',
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-3 text-base max-w-2xl',
            centered && 'mx-auto',
            light ? 'text-cream/70' : 'text-gray-500',
          )}
        >
          {subtitle}
        </p>
      )}
      <div
        className={cn(
          'mt-5 flex items-center gap-3',
          centered && 'justify-center',
        )}
      >
        <div
          className={cn(
            'h-px w-12',
            light
              ? 'bg-gradient-to-r from-transparent to-primary/60'
              : 'bg-gradient-to-r from-transparent to-primary',
          )}
        />
        <div className="w-2 h-2 rotate-45 bg-primary" />
        <div
          className={cn(
            'h-px w-12',
            light
              ? 'bg-gradient-to-l from-transparent to-primary/60'
              : 'bg-gradient-to-l from-transparent to-primary',
          )}
        />
      </div>
    </motion.div>
  );
}
