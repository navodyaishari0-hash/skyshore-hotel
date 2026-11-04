'use client';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

type BadgeVariant = 'gold' | 'success' | 'warning' | 'error' | 'info';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  gold:
    'bg-primary/15 text-primary-dark border border-primary/30',
  success:
    'bg-emerald-500/15 text-emerald-700 border border-emerald-500/30',
  warning:
    'bg-amber-500/15 text-amber-700 border border-amber-500/30',
  error:
    'bg-red-500/15 text-red-700 border border-red-500/30',
  info:
    'bg-blue-500/15 text-blue-700 border border-blue-500/30',
};

export default function Badge({
  variant = 'gold',
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
