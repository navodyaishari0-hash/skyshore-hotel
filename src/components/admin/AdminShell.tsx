'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, CalendarCheck, BedDouble, Users, UserCog,
  UtensilsCrossed, Flower2, PartyPopper, CreditCard, Ticket,
  Star, ImageIcon, FileText, Bell, BarChart3, LineChart,
  Settings, Search, ChevronDown, Menu, X, LogOut, BellRing,
  Shield, MessageSquare
} from 'lucide-react'

const navSections = [
  {
    label: 'MAIN',
    items: [
      { name: 'Dashboard', href: '', icon: LayoutDashboard },
      { name: 'Bookings', href: '/bookings', icon: CalendarCheck },
    ],
  },
  {
    label: 'MANAGEMENT',
    items: [
      { name: 'Rooms', href: '/rooms', icon: BedDouble },
      { name: 'Guests', href: '/guests', icon: Users },
      { name: 'Staff', href: '/staff', icon: UserCog },
    ],
  },
  {
    label: 'SERVICES',
    items: [
      { name: 'Kitchen', href: '/restaurant', icon: UtensilsCrossed },
      { name: 'Spa', href: '/spa', icon: Flower2 },
      { name: 'Events', href: '/events', icon: PartyPopper },
    ],
  },
  {
    label: 'FINANCE',
    items: [
      { name: 'Payments', href: '/payments', icon: CreditCard },
      { name: 'Coupons', href: '/coupons', icon: Ticket },
    ],
  },
  {
    label: 'CONTENT',
    items: [
      { name: 'Reviews', href: '/reviews', icon: Star },
      { name: 'Gallery', href: '/gallery', icon: ImageIcon },
      { name: 'Blog', href: '/blog', icon: FileText },
    ],
  },
  {
    label: 'SYSTEM',
    items: [
      { name: 'Notifications', href: '/notifications', icon: BellRing },
      { name: 'Reports', href: '/reports', icon: BarChart3 },
      { name: 'Analytics', href: '/analytics', icon: LineChart },
      { name: 'Settings', href: '/settings', icon: Settings },
    ],
  },
]

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [profileOpen, setProfileOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  const isActive = (href: string) => pathname === `/admin${href}` || pathname === `/admin${href}/`

  const notifications = [
    { id: 1, text: 'New booking from John Smith', time: '2 min ago', read: false },
    { id: 2, text: 'Room 302 maintenance completed', time: '15 min ago', read: false },
    { id: 3, text: 'Spa appointment cancelled', time: '1 hr ago', read: true },
    { id: 4, text: 'Monthly report ready', time: '3 hrs ago', read: true },
  ]

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="flex h-screen bg-cream overflow-hidden">
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-secondary flex flex-col
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${collapsed ? 'lg:w-20' : 'lg:w-64'}
          transition-all duration-300 ease-in-out`}
      >
        {/* Logo */}
        <div className={`flex items-center h-16 px-4 border-b border-white/10 ${collapsed ? 'justify-center' : 'justify-between'}`}>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                <Shield className="w-5 h-5 text-secondary" />
              </div>
              <span className="text-white font-bold text-lg tracking-wider">Serendib Admin</span>
            </motion.div>
          )}
          {collapsed && (
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
              <Shield className="w-5 h-5 text-secondary" />
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:block text-white/50 hover:text-primary transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/50 hover:text-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-6 scrollbar-thin">
          {navSections.map((section) => (
            <div key={section.label}>
              {!collapsed && (
                <p className="px-3 mb-2 text-[10px] font-semibold tracking-[0.2em] text-white/30 uppercase">
                  {section.label}
                </p>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const active = isActive(item.href)
                  return (
                    <Link
                      key={item.name}
                      href={`/admin${item.href}`}
                      onClick={() => setSidebarOpen(false)}
                      className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                        ${active
                          ? 'bg-primary/10 text-primary'
                          : 'text-white/50 hover:text-white hover:bg-white/5'
                        }
                        ${collapsed ? 'justify-center' : ''}
                      `}
                    >
                      {active && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-primary rounded-r-full"
                          transition={{ type: 'spring' as const, stiffness: 300, damping: 30 }}
                        />
                      )}
                      <item.icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-primary' : ''}`} />
                      {!collapsed && <span>{item.name}</span>}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className={`p-4 border-t border-white/10 ${collapsed ? 'px-2' : ''}`}>
          <Link
            href="/"
            className={`flex items-center gap-3 text-white/40 hover:text-primary transition-colors text-sm
              ${collapsed ? 'justify-center' : ''}
            `}
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && <span>Back to Site</span>}
          </Link>
        </div>
      </motion.aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 flex-shrink-0">
          {/* Left: Menu toggle (mobile) + Search */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-secondary hover:text-primary transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
          </div>

          {/* Right: Notifications + Profile */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => { setNotificationsOpen(!notificationsOpen); setProfileOpen(false) }}
                className="relative p-2 text-gray-500 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                      <h3 className="font-semibold text-secondary">Notifications</h3>
                      <span className="text-xs text-primary font-medium cursor-pointer hover:text-primary-dark">Mark all read</span>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer
                            ${!n.read ? 'bg-primary/5' : ''}`}
                        >
                          <p className="text-sm text-secondary font-medium">{n.text}</p>
                          <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                          {!n.read && <div className="w-2 h-2 bg-primary rounded-full absolute right-4 top-1/2 -translate-y-1/2" />}
                        </div>
                      ))}
                    </div>
                    <Link
                      href="/admin/notifications"
                      onClick={() => setNotificationsOpen(false)}
                      className="block p-3 text-center text-sm text-primary font-medium hover:bg-primary/5 transition-colors"
                    >
                      View All Notifications
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => { setProfileOpen(!profileOpen); setNotificationsOpen(false) }}
                className="flex items-center gap-3 pl-3 pr-2 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-secondary font-bold text-sm">
                  GA
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-secondary leading-tight">Grand Admin</p>
                  <p className="text-[11px] text-gray-400">Super Admin</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-100">
                      <p className="font-semibold text-secondary">Grand Admin</p>
                      <p className="text-xs text-gray-400">admin@grandazure.com</p>
                    </div>
                    <div className="py-2">
                      {['My Profile', 'Settings', 'Help Center'].map((item) => (
                        <Link
                          key={item}
                          href={item === 'Settings' ? '/admin/settings' : '#'}
                          onClick={() => setProfileOpen(false)}
                          className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors"
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-gray-100 py-2">
                      <button className="w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors text-left flex items-center gap-2">
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>

      {/* Click outside to close dropdowns */}
      {(notificationsOpen || profileOpen) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => { setNotificationsOpen(false); setProfileOpen(false) }}
        />
      )}
    </div>
  )
}
