'use client';

import { useState, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, id, onFocus, onBlur, ...rest }, ref) => {
    const [focused, setFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
      setFocused(true);
      onFocus?.(e);
    }

    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
      setFocused(false);
      setHasValue(e.target.value.length > 0);
      onBlur?.(e);
    }

    const isActive = focused || hasValue;

    return (
      <div className="w-full">
        <div className="relative">
          {icon && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/60 pointer-events-none z-10">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={cn(
              'peer w-full bg-white border rounded-lg px-4 pt-5 pb-2 text-luxury outline-none transition-all duration-300',
              'placeholder-transparent',
              'focus:border-primary focus:ring-2 focus:ring-primary/20',
              !!icon && 'pl-11',
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                : 'border-gray-200',
              className,
            )}
            placeholder={label || ''}
            {...rest}
          />
          {label && (
            <motion.label
              htmlFor={inputId}
              animate={{
                y: isActive ? -10 : 0,
                scale: isActive ? 0.8 : 1,
                color: focused ? '#C8A951' : error ? '#ef4444' : '#9ca3af',
              }}
              transition={{ type: 'spring' as const, stiffness: 300, damping: 20 }}
              className={cn(
                'absolute origin-left pointer-events-none font-medium',
                icon ? 'left-11' : 'left-4',
                'top-1/2 -translate-y-1/2',
              )}
            >
              {label}
            </motion.label>
          )}
        </div>
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -4, height: 0 }}
              className="text-red-500 text-sm mt-1 ml-1"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  },
);

Input.displayName = 'Input';
export default Input;
