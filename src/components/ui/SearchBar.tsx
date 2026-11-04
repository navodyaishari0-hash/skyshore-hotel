'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  value?: string;
  className?: string;
}

export default function SearchBar({
  placeholder = 'Search...',
  onSearch,
  onClear,
  value: controlledValue,
  className,
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const value = controlledValue ?? internalValue;

  function handleChange(v: string) {
    if (controlledValue === undefined) setInternalValue(v);
    onSearch?.(v);
  }

  function handleClear() {
    if (controlledValue === undefined) setInternalValue('');
    onClear?.();
    onSearch?.('');
    inputRef.current?.focus();
  }

  return (
    <motion.div
      animate={{ width: focused ? '100%' : '100%' }}
      className={cn(
        'relative flex items-center bg-white border rounded-full transition-all duration-300',
        focused ? 'border-primary ring-2 ring-primary/20 shadow-lg' : 'border-gray-200 shadow-sm',
        className,
      )}
    >
      <Search className="ml-4 h-5 w-5 text-gray-400 shrink-0" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className="flex-1 bg-transparent px-3 py-3 text-sm text-luxury outline-none placeholder:text-gray-400"
      />
      {value && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={handleClear}
          className="mr-3 p-1 rounded-full hover:bg-cream transition-colors cursor-pointer"
        >
          <X className="h-4 w-4 text-gray-400" />
        </motion.button>
      )}
    </motion.div>
  );
}
