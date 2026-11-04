'use client';

import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  function getPages(): (number | '...')[] {
    const pages: (number | '...')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    pages.push(1);
    if (currentPage > 3) pages.push('...');
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
    return pages;
  }

  return (
    <nav className={cn('flex items-center gap-1', className)}>
      {getPages().map((page, i) =>
        page === '...' ? (
          <span key={`dots-${i}`} className="px-2 text-gray-400">
            ...
          </span>
        ) : (
          <motion.button
            key={page}
            onClick={() => onPageChange(page)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              'relative w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors cursor-pointer',
              page === currentPage
                ? 'text-luxury'
                : 'text-gray-500 hover:bg-cream',
            )}
          >
            {page === currentPage && (
              <motion.div
                layoutId="pagination-active"
                className="absolute inset-0 bg-primary rounded-lg"
                transition={{ type: 'spring' as const, stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10">{page}</span>
          </motion.button>
        ),
      )}
    </nav>
  );
}
