'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageCircle, Bot, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import ChatWidget from '@/components/shared/ChatWidget';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.8 },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 260, damping: 20 },
  },
};

export default function FloatingElements() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="fixed bottom-20 left-0 right-0 z-40 pointer-events-none sm:bottom-6"
      >
        <div className="relative mx-auto flex max-w-7xl items-end justify-between px-4 sm:px-6 lg:px-8">
          {/* AI Chat — bottom-left */}
          <motion.div variants={buttonVariants} className="pointer-events-auto hidden sm:block">
            <button
              onClick={() => setChatOpen((prev) => !prev)}
              className={cn(
                'group flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-all duration-300',
                chatOpen
                  ? 'bg-[#C8A951] text-[#0D0D0D] shadow-[#C8A951]/30'
                  : 'bg-[#1A1A2E] text-white border border-white/10 hover:border-[#C8A951]/50 hover:bg-[#1A1A2E]/90'
              )}
              aria-label="AI Concierge"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bot size={22} />
              </motion.div>
            </button>
            <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-[#1A1A2E] px-3 py-1.5 text-xs text-white/70 opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 pointer-events-none border border-white/10">
              AI Concierge
            </span>
          </motion.div>

          {/* Book Now — bottom-center */}
          <motion.div variants={buttonVariants} className="pointer-events-auto">
            <Link href="/booking">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex items-center gap-2 rounded-full bg-gradient-to-r from-[#C8A951] to-[#B8952F] px-6 py-3.5 text-sm font-semibold text-[#0D0D0D] shadow-xl shadow-[#C8A951]/25 transition-shadow duration-300 hover:shadow-[#C8A951]/40"
              >
                {/* Pulse glow ring */}
                <span className="absolute inset-0 rounded-full animate-ping bg-[#C8A951]/20" style={{ animationDuration: '2.5s' }} />
                <span className="absolute -inset-px rounded-full bg-gradient-to-r from-[#C8A951] to-[#B8952F] opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-40" />
                <Calendar size={16} className="relative z-10" />
                <span className="relative z-10">Book Now</span>
              </motion.div>
            </Link>
          </motion.div>

          {/* WhatsApp — bottom-right */}
          <motion.div variants={buttonVariants} className="pointer-events-auto">
            <a
              href="https://wa.me/94773964515"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/25 transition-all duration-300 hover:shadow-[#25D366]/40"
              aria-label="Chat on WhatsApp"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle size={22} />
              </motion.div>
              <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-[#1A1A2E] px-3 py-1.5 text-xs text-white/70 opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 pointer-events-none border border-white/10">
                Chat on WhatsApp
              </span>
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Chat widget */}
      {chatOpen && <ChatWidget isOpen={chatOpen} onClose={() => setChatOpen(false)} />}
    </>
  );
}
