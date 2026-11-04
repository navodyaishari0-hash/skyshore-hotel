'use client';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  currency?: string;
  perNight?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: { current: 'text-lg font-bold', original: 'text-xs' },
  md: { current: 'text-2xl font-bold', original: 'text-sm' },
  lg: { current: 'text-3xl font-bold', original: 'text-base' },
};

export default function PriceDisplay({
  price,
  originalPrice,
  currency = '$',
  perNight = true,
  className,
  size = 'md',
}: PriceDisplayProps) {
  const formatted = price.toLocaleString();
  const formattedOriginal = originalPrice?.toLocaleString();
  const styles = sizeStyles[size];

  return (
    <div className={cn('flex items-baseline gap-2', className)}>
      <span className={cn(styles.current, 'text-primary')}>
        {currency}
        {formatted}
      </span>
      {perNight && (
        <span className="text-sm text-gray-500 font-normal">/night</span>
      )}
      {originalPrice && originalPrice > price && (
        <span className={cn(styles.original, 'text-gray-400 line-through')}>
          {currency}
          {formattedOriginal}
        </span>
      )}
    </div>
  );
}
