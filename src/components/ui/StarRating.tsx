'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  onRate?: (rating: number) => void;
  readonly?: boolean;
  size?: number;
  className?: string;
}

export default function StarRating({
  rating,
  maxStars = 5,
  onRate,
  readonly = false,
  size = 20,
  className,
}: StarRatingProps) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {Array.from({ length: maxStars }, (_, i) => {
        const starIndex = i + 1;
        const isFilled = starIndex <= (hovered || rating);

        return (
          <motion.button
            key={i}
            type="button"
            disabled={readonly}
            onClick={() => !readonly && onRate?.(starIndex)}
            onMouseEnter={() => !readonly && setHovered(starIndex)}
            onMouseLeave={() => !readonly && setHovered(0)}
            whileHover={!readonly ? { scale: 1.2 } : undefined}
            whileTap={!readonly ? { scale: 0.9 } : undefined}
            className={cn(
              'transition-colors duration-150',
              readonly ? 'cursor-default' : 'cursor-pointer',
            )}
          >
            <Star
              size={size}
              className={cn(
                'transition-colors duration-150',
                isFilled ? 'fill-primary text-primary' : 'fill-none text-gray-300',
              )}
            />
          </motion.button>
        );
      })}
    </div>
  );
}
