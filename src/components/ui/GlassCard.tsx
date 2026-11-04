'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverGlow?: boolean;
  padding?: string;
}

export default function GlassCard({
  children,
  className,
  hoverGlow = true,
  padding = 'p-6',
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const glowX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const glowY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      whileHover={hoverGlow ? { scale: 1.01 } : undefined}
      transition={{ type: 'spring' as const, stiffness: 300, damping: 20 }}
      className={cn(
        'relative rounded-2xl overflow-hidden',
        'bg-white/60 backdrop-blur-xl backdrop-saturate-[1.8]',
        'border border-primary/15',
        'shadow-[0_8px_32px_rgba(0,0,0,0.06)]',
        'hover:shadow-[0_12px_48px_rgba(200,169,81,0.15)]',
        'transition-shadow duration-500',
        padding,
        className,
      )}
    >
      {hoverGlow && (
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]) =>
                `radial-gradient(400px circle at ${x}px ${y}px, rgba(200,169,81,0.12), transparent 60%)`,
            ),
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
