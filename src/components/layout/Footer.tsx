'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Send,
  Camera,
  Globe,
  MessageCircle,
  Play,
  Clock,
  TreePalm,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Villas', href: '/rooms' },
  { name: 'Experiences', href: '/experiences' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const socialLinks = [
  { name: 'Instagram', icon: Camera, href: '#' },
  { name: 'Facebook', icon: Globe, href: '#' },
  { name: 'WhatsApp', icon: MessageCircle, href: 'https://wa.me/94773964515' },
  { name: 'YouTube', icon: Play, href: '#' },
];

const contactInfo = [
  { icon: MapPin, text: 'Sri Lanka · exact location shared upon confirmation' },
  { icon: Phone, text: '+94 77 396 4515' },
  { icon: Mail, text: 'dishanrandika0@gmail.com' },
  { icon: Clock, text: 'Guest support · contact us for current availability' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <footer
      ref={ref}
      className="relative border-t border-[#D7C49A]/20 bg-[#18392F]"
    >
      {/* Subtle gold gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D7C49A]/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4"
        >
          {/* Column 1 — Brand */}
          <motion.div variants={itemVariants} className="space-y-5">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="flex items-center gap-2 font-playfair text-2xl font-medium text-ivory">
                <TreePalm className="h-5 w-5 text-[#D7C49A]" /> Skyshore
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-white/40">
              A tropical villa retreat shaped by Sri Lankan nature, distinctive
              A-frame architecture and warm island hospitality.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={social.name}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all duration-300 hover:border-[#D7C49A]/50 hover:text-[#D7C49A] hover:bg-[#D7C49A]/5"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Column 2 — Quick Links */}
          <motion.div variants={itemVariants} className="space-y-5">
            <h4 className="font-playfair text-lg font-semibold text-white">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-sm text-white/40 transition-colors duration-300 hover:text-[#D7C49A]"
                  >
                    <span className="mr-0 h-px w-0 bg-[#D7C49A] transition-all duration-300 group-hover:mr-2 group-hover:w-3" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3 — Contact Info */}
          <motion.div variants={itemVariants} className="space-y-5">
            <h4 className="font-playfair text-lg font-semibold text-white">
              Contact Us
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <item.icon
                    size={16}
                    className="mt-0.5 shrink-0 text-[#D7C49A]/60"
                  />
                  <span className="text-sm leading-relaxed text-white/40">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4 — Newsletter */}
          <motion.div variants={itemVariants} className="space-y-5">
            <h4 className="font-playfair text-lg font-semibold text-white">
              Newsletter
            </h4>
            <p className="text-sm text-white/40">
              Subscribe for exclusive offers, seasonal packages, and travel
              inspiration from Sri Lanka.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-3"
            >
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-2.5 pr-11 text-sm text-white placeholder:text-white/30 outline-none transition-colors duration-300 focus:border-[#D7C49A]/50 focus:bg-white/[0.07]"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-r from-[#D7C49A] to-[#9E885A] text-[#18392F] transition-transform duration-200 hover:scale-105"
                  aria-label="Subscribe"
                >
                  <Send size={14} />
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 py-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-white/30">
              &copy; {new Date().getFullYear()} Skyshore. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-white/30">
              <Link
                href="/privacy"
                className="transition-colors duration-300 hover:text-[#D7C49A]"
              >
                Privacy Policy
              </Link>
              <span className="text-white/10">|</span>
              <Link
                href="/terms"
                className="transition-colors duration-300 hover:text-[#D7C49A]"
              >
                Terms &amp; Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}