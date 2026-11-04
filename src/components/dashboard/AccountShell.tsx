'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TreePine,
  LayoutDashboard,
  CalendarCheck,
  Heart,
  Star,
  User,
  Settings,
  Clock,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  ChevronLeft,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getInitials } from '@/lib/utils';

const navLinks = [
  { href: '/account', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/account/bookings', label: 'My Bookings', icon: CalendarCheck },
  { href: '/account/wishlist', label: 'Wishlist', icon: Heart },
  { href: '/account/loyalty', label: 'Loyalty Points', icon: Star },
  { href: '/account/settings', label: 'Profile', icon: User },
  { href: '/account/settings', label: 'Settings', icon: Settings },
  { href: '/account/recently-viewed', label: 'Recently Viewed', icon: Clock },
];

export default function AccountShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-gradient-to-b from-luxury to-secondary z-50 transition-transform duration-300 flex flex-col ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2">
            <TreePine className="w-7 h-7 text-primary" />
            <span className="font-playfair text-lg font-bold text-white">Skyshore</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/60 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== '/account' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.label + link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary/15 text-primary'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-5 h-5" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* User + Logout */}
        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm">
              {user ? getInitials(user.name) : '?'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{user?.name || 'Guest'}</p>
              <p className="text-white/40 text-xs truncate">{user?.email || ''}</p>
            </div>
          </div>
          <button
            onClick={() => { logout(); router.push('/'); }}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-white/60 hover:text-red-400 hover:bg-white/5 transition-all cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-6 py-4 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-luxury cursor-pointer">
            <Menu className="w-6 h-6" />
          </button>

          {/* Search */}
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search bookings, rooms..."
              className="w-full bg-cream rounded-lg pl-10 pr-4 py-2.5 text-sm text-luxury outline-none border border-transparent focus:border-primary/30 transition-colors"
            />
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Notifications */}
            <button className="relative w-10 h-10 rounded-full bg-cream flex items-center justify-center text-gray-500 hover:text-primary transition-colors cursor-pointer">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-primary rounded-full border-2 border-white" />
            </button>

            {/* Back to site */}
            <Link href="/" className="hidden md:flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors">
              <ChevronLeft className="w-4 h-4" />
              Back to Site
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
