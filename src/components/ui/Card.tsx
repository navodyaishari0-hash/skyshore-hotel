'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
  hover3d?: boolean;
  image?: string;
  overlay?: boolean;
  onClick?: () => void;
}

export default function Card({
  children,
  className,
  glass = false,
  hover3d = false,
  image,
  overlay = false,
  onClick,
}: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-150, 150], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-150, 150], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!hover3d || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={hover3d ? { rotateX, rotateY, transformPerspective: 800 } : undefined}
      whileHover={hover3d ? undefined : { y: -6 }}
      transition={{ type: 'spring' as const, stiffness: 300, damping: 20 }}
      className={cn(
        'rounded-2xl overflow-hidden transition-shadow duration-400',
        glass
          ? 'glass-card'
          : 'bg-white shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-primary/10',
        onClick && 'cursor-pointer',
        className,
      )}
    >
      {image && (
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          {overlay && (
            <div className="absolute inset-0 bg-gradient-to-t from-luxury/80 via-luxury/20 to-transparent" />
          )}
        </div>
      )}
      {children}
    </motion.div>
  );
}
