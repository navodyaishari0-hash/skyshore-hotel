'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  CalendarCheck,
  CreditCard,
  Star,
  Heart,
  ArrowRight,
  TrendingUp,
  Clock,
  MapPin,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useBooking } from '@/context/BookingContext';
import { rooms } from '@/data';
import { formatPrice, formatDate } from '@/lib/utils';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import Badge from '@/components/ui/Badge';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

export default function DashboardPage() {
  const { user } = useAuth();
  const { bookings, wishlist, loyaltyPoints } = useBooking();

  const activeBookings = bookings.filter((b) => b.status === 'confirmed' || b.status === 'pending');
  const totalSpent = bookings.reduce((sum, b) => sum + b.totalPrice, 0);

  const stats = [
    { label: 'Active Bookings', value: activeBookings.length, icon: CalendarCheck, color: 'from-blue-500/20 to-blue-600/10', iconColor: 'text-blue-500' },
    { label: 'Total Spent', value: totalSpent, icon: CreditCard, color: 'from-emerald-500/20 to-emerald-600/10', iconColor: 'text-emerald-500', isCurrency: true },
    { label: 'Loyalty Points', value: loyaltyPoints || user?.loyaltyPoints || 0, icon: Star, color: 'from-primary/20 to-accent/10', iconColor: 'text-primary' },
    { label: 'Wishlist Items', value: wishlist.length, icon: Heart, color: 'from-red-500/20 to-red-600/10', iconColor: 'text-red-500' },
  ];

  const recentActivity = [
    { text: 'Profile updated', time: '2 hours ago', icon: TrendingUp },
    { text: 'Logged in from new device', time: '1 day ago', icon: Clock },
    { text: 'Loyalty points earned: +250', time: '3 days ago', icon: Star },
  ];

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-playfair text-3xl font-bold text-luxury">
          Welcome back, <span className="text-primary">{user?.name?.split(' ')[0] || 'Guest'}</span>
        </h1>
        <p className="text-gray-500 mt-1">Here&apos;s an overview of your account and recent activity.</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-2xl p-6 border border-gray-100 luxury-card"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <div className="text-2xl font-bold text-luxury mt-1">
                {stat.isCurrency ? (
                  formatPrice(stat.value)
                ) : (
                  <AnimatedCounter to={stat.value} />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Upcoming bookings */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-playfair text-xl font-bold text-luxury">Upcoming Bookings</h2>
            <Link href="/account/bookings" className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {activeBookings.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-gray-100">
              <CalendarCheck className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 mb-4">No upcoming bookings</p>
              <Link href="/booking" className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-luxury font-semibold px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all">
                Book a Room <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {activeBookings.slice(0, 3).map((booking, i) => {
                const room = rooms.find((r) => r.id === booking.roomId);
                return (
                  <motion.div
                    key={booking.id}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    className="bg-white rounded-xl p-4 border border-gray-100 flex gap-4 items-center luxury-card"
                  >
                    <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                      <img src={room?.thumbnail || ''} alt={room?.name || ''} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-luxury text-sm truncate">{room?.name || 'Room'}</h3>
                        <Badge variant={booking.status === 'confirmed' ? 'success' : 'warning'}>{booking.status}</Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><CalendarCheck className="w-3 h-3" /> {formatDate(booking.checkIn, 'short')} – {formatDate(booking.checkOut, 'short')}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {booking.guests} guests</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-luxury">{formatPrice(booking.totalPrice)}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick actions + activity */}
        <div className="space-y-6">
          <div>
            <h2 className="font-playfair text-xl font-bold text-luxury mb-5">Quick Actions</h2>
            <div className="space-y-3">
              {[
                { label: 'Book a Room', href: '/booking', icon: CalendarCheck },
                { label: 'View Wishlist', href: '/account/wishlist', icon: Heart },
                { label: 'Edit Profile', href: '/account/settings', icon: Star },
              ].map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-gray-100 hover:border-primary/30 transition-all group luxury-card"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium text-sm text-luxury">{action.label}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400 ml-auto group-hover:text-primary transition-colors" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="font-playfair text-xl font-bold text-luxury mb-5">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-gray-100">
                    <div className="w-8 h-8 rounded-lg bg-cream flex items-center justify-center">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-luxury truncate">{item.text}</p>
                      <p className="text-xs text-gray-400">{item.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
