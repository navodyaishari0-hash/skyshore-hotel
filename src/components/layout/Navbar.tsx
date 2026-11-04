'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Calendar,
  Globe,
  ChevronDown,
  Phone,
  TreePalm,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCurrency, type Currency } from '@/context/CurrencyContext';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Villas', href: '/rooms' },
  { name: 'Discover Tangalle', href: '/discover-tangalle' },
  { name: 'Experiences', href: '/experiences' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const currencies: Currency[] = ['LKR', 'USD', 'EUR', 'GBP'];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const { currentCurrency, setCurrency } = useCurrency();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' as const }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-[#18392F]/95 shadow-[0_8px_28px_rgba(15,30,23,0.16)] border-b border-white/10'
            : 'bg-transparent'
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 text-white">
            <TreePalm className="h-6 w-6 text-[#D7C49A]" />
            <span className="flex flex-col leading-none">
              <span className="font-playfair text-[23px] font-medium tracking-wide">Skyshore</span>
              <span className="mt-1 text-[8px] uppercase tracking-[0.25em] text-white/65">Sri Lanka</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'relative px-3 py-2 text-sm font-medium transition-colors duration-300',
                    isActive
                      ? 'text-[#D7C49A]'
                      : 'text-white/70 hover:text-white'
                  )}
                >
                  <motion.span whileHover={{ y: -1 }} className="relative z-10">
                    {link.name}
                  </motion.span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-[#D7C49A] to-[#E0CEA7]"
                      transition={{ type: 'spring' as const, stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span
                    className={cn(
                      'absolute bottom-0 left-3 right-3 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-[#D7C49A] to-[#E0CEA7] transition-transform duration-300',
                      !isActive && 'hover:scale-x-100'
                    )}
                    style={{ transformOrigin: 'left' }}
                  />
                </Link>
              );
            })}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Currency switcher */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setCurrencyOpen((prev) => !prev)}
                className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 hover:border-[#D7C49A]/40 hover:text-white transition-colors"
              >
                <Globe size={13} />
                {currentCurrency}
                <ChevronDown size={12} className={cn('transition-transform', currencyOpen && 'rotate-180')} />
              </button>
              <AnimatePresence>
                {currencyOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setCurrencyOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-xl border border-white/10 bg-[#18392F]/95 p-1.5 shadow-2xl backdrop-blur-xl"
                    >
                      {currencies.map((c) => (
                        <button
                          key={c}
                          onClick={() => {
                            setCurrency(c);
                            setCurrencyOpen(false);
                          }}
                          className={cn(
                            'flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors',
                            c === currentCurrency
                              ? 'bg-[#D7C49A]/15 text-[#D7C49A]'
                              : 'text-white/70 hover:bg-white/5 hover:text-white'
                          )}
                        >
                          {c}
                          {c === currentCurrency && <span className="h-1.5 w-1.5 rounded-full bg-[#D7C49A]" />}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Book Now CTA */}
            <Link
              href="/booking"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D7C49A] to-[#A28A5B] px-5 py-2 text-sm font-semibold text-[#18392F] shadow-lg shadow-[#D7C49A]/20 transition-all duration-300 hover:shadow-[#D7C49A]/40 hover:scale-105"
            >
              <Calendar size={15} />
              Book Now
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="flex lg:hidden items-center justify-center w-9 h-9 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring' as const, damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 z-[70] h-full w-80 max-w-[85vw] bg-[#18392F]/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <span className="flex items-center gap-2 font-playfair text-xl font-bold italic bg-gradient-to-r from-[#D7C49A] to-[#E0CEA7] bg-clip-text text-transparent">
                  <TreePalm className="h-5 w-5 text-[#D7C49A]" />
                  Skyshore
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-9 h-9 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col px-6 py-6 gap-1 overflow-y-auto">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          'block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200',
                          isActive
                            ? 'bg-[#D7C49A]/10 text-[#D7C49A]'
                            : 'text-white/70 hover:text-white hover:bg-white/5'
                        )}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 px-6 py-5 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Globe size={13} className="text-white/50" />
                  {currencies.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c)}
                      className={cn(
                        'rounded-full px-2.5 py-1 text-xs transition-colors',
                        c === currentCurrency
                          ? 'bg-[#D7C49A]/15 text-[#D7C49A]'
                          : 'text-white/50 hover:text-white'
                      )}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm text-white/50">
                  <Phone size={14} />
                  <span>+94 77 396 4515</span>
                </div>
                <Link
                  href="/booking"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full rounded-full bg-gradient-to-r from-[#D7C49A] to-[#A28A5B] px-5 py-3 text-sm font-semibold text-[#18392F] shadow-lg shadow-[#D7C49A]/20"
                >
                  <Calendar size={15} />
                  Book Now
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <div className="fixed inset-x-0 bottom-0 z-[35] border-t border-[#D9D4C7] bg-[#FBF9F2]/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-10px_28px_rgba(24,57,47,0.12)] backdrop-blur-sm sm:hidden">
        <Link
          href="/booking"
          className="flex min-h-12 items-center justify-center gap-2 bg-secondary text-sm font-semibold text-ivory"
        >
          <Calendar size={16} /> Book Your Stay
        </Link>
      </div>
    </>
  );
}