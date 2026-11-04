'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface Tab {
  label: string;
  value: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export default function Tabs({ tabs, defaultTab, onChange, className }: TabsProps) {
  const [active, setActive] = useState(defaultTab || tabs[0]?.value);

  function handleSelect(value: string) {
    setActive(value);
    onChange?.(value);
  }

  const activeTab = tabs.find((t) => t.value === active);

  return (
    <div className={cn('w-full', className)}>
      <div className="relative flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleSelect(tab.value)}
            className={cn(
              'relative px-5 py-3 text-sm font-medium transition-colors cursor-pointer',
              tab.value === active ? 'text-primary' : 'text-gray-500 hover:text-luxury',
            )}
          >
            {tab.label}
            {tab.value === active && (
              <motion.div
                layoutId="tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                transition={{ type: 'spring' as const, stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
      <div className="pt-6">
        {activeTab && (
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab.content}
          </motion.div>
        )}
      </div>
    </div>
  );
}
