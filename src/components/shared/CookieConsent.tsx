'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'cookie-consent';

type ConsentChoice = 'accepted' | 'declined' | 'customized' | null;

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [choice, setChoice] = useState<ConsentChoice>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ConsentChoice | null;
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
    setChoice(stored);
  }, []);

  const dismiss = (value: ConsentChoice) => {
    setChoice(value);
    localStorage.setItem(STORAGE_KEY, value ?? '');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring' as const, damping: 28, stiffness: 260 }}
          className={cn(
            'fixed inset-x-0 bottom-0 z-[80] p-4 sm:p-6',
          )}
        >
          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-[#C8A951]/20 bg-[#0D0D0D]/90 backdrop-blur-2xl shadow-2xl shadow-black/40">
            {/* Gold top accent */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#C8A951]/60 to-transparent" />

            <div className="relative px-6 py-6 sm:px-8 sm:py-7">
              {/* Close (treat as decline) */}
              <button
                onClick={() => dismiss('declined')}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-white/30 transition-colors hover:text-white/70 hover:bg-white/5"
                aria-label="Close"
              >
                <X size={16} />
              </button>

              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
                {/* Icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#C8A951]/10 text-[#C8A951]">
                  <Cookie size={24} />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  <h3 className="font-playfair text-lg font-semibold text-white">
                    We Value Your Privacy
                  </h3>
                  <p className="text-sm leading-relaxed text-white/45">
                    We use cookies and similar technologies to enhance your browsing experience,
                    analyze site traffic, and personalize content. By clicking &quot;Accept All&quot;,
                    you consent to our use of cookies for analytics, marketing, and functional purposes.
                    You may customize your preferences or decline non-essential cookies.
                  </p>

                  {/* Action buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button
                      onClick={() => dismiss('accepted')}
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#C8A951] to-[#B8952F] px-5 py-2.5 text-sm font-semibold text-[#0D0D0D] shadow-lg shadow-[#C8A951]/20 transition-all duration-200 hover:shadow-[#C8A951]/40 hover:scale-105"
                    >
                      Accept All
                    </button>
                    <button
                      onClick={() => dismiss('declined')}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/70 transition-all duration-200 hover:border-white/30 hover:text-white"
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => dismiss('customized')}
                      className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-white/40 transition-colors duration-200 hover:text-white/70"
                    >
                      <Settings size={15} />
                      Customize
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
