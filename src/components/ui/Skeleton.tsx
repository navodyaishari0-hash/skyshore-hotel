'use client';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

type SkeletonVariant = 'text' | 'card' | 'image' | 'avatar' | 'button';

interface SkeletonProps {
  variant?: SkeletonVariant;
  className?: string;
  count?: number;
}

const variantStyles: Record<SkeletonVariant, string> = {
  text: 'h-4 w-full rounded',
  card: 'h-48 w-full rounded-2xl',
  image: 'h-64 w-full rounded-2xl',
  avatar: 'h-12 w-12 rounded-full',
  button: 'h-12 w-32 rounded-lg',
};

export default function Skeleton({
  variant = 'text',
  className,
  count = 1,
}: SkeletonProps) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className={cn(
            'relative overflow-hidden bg-gray-200',
            variantStyles[variant],
            className,
          )}
        >
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        </div>
      ))}
    </div>
  );
}
