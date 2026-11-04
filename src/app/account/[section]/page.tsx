'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowRight,
  CalendarCheck,
  Heart,
  Star,
  Clock,
  Mail,
  Phone,
  User as UserIcon,
  CheckCircle,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useBooking } from '@/context/BookingContext';
import { rooms } from '@/data';
import { formatDate, formatPrice } from '@/lib/utils';
import Badge from '@/components/ui/Badge';

const sectionTitles: Record<string, string> = {
  bookings: 'My Bookings',
  wishlist: 'Wishlist',
  settings: 'Profile & Settings',
  loyalty: 'Loyalty Points',
  'recently-viewed': 'Recently Viewed',
};

function EmptyState({ message, href, label }: { message: string; href: string; label: string }) {
  return (
    <div className="bg-white rounded-2xl p-10 text-center border border-gray-100">
      <CalendarCheck className="w-12 h-12 text-gray-300 mx-auto mb-3" />
      <p className="text-gray-500 mb-4">{message}</p>
      <Link
        href={href}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-luxury font-semibold px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all"
      >
        {label} <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

export default function AccountSectionPage() {
  const params = useParams<{ section: string }>();
  const section = params?.section ?? 'bookings';
  const title = sectionTitles[section] ?? 'My Account';

  const { user, updateProfile } = useAuth();
  const { bookings, wishlist, recentlyViewed, loyaltyPoints } = useBooking();

  const [form, setForm] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
  });
  const [saved, setSaved] = useState(false);

  function handleProfileSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateProfile({ name: form.name, email: form.email, phone: form.phone });
    setSaved(true);
  }

  const wishlistRooms = rooms.filter((room) => wishlist.includes(room.id));
  const recentRooms = recentlyViewed
    .map((id) => rooms.find((room) => room.id === id))
    .filter((room): room is (typeof rooms)[number] => Boolean(room));

  return (
    <div>
      <header className="mb-8">
        <h1 className="font-playfair text-3xl font-bold text-luxury">{title}</h1>
        <p className="mt-2 text-sm text-gray-500">
          This dashboard is a browser-only demo. Records are stored in this
          browser and are not sent to a server or database.
        </p>
      </header>

      {section === 'bookings' && (
        <div className="space-y-4">
          {bookings.length === 0 ? (
            <EmptyState
              message="No booking requests yet."
              href="/booking"
              label="Plan a stay"
            />
          ) : (
            bookings.map((booking) => {
              const room = rooms.find((r) => r.id === booking.roomId);
              return (
                <div
                  key={booking.id}
                  className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5 sm:flex-row sm:items-center"
                >
                  <div className="h-24 w-full overflow-hidden rounded-xl sm:w-32">
                    {room?.thumbnail ? (
                      <img
                        src={room.thumbnail}
                        alt={room.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-cream" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <h2 className="font-semibold text-luxury">{room?.name ?? 'Villa'}</h2>
                      <Badge variant={booking.status === 'confirmed' ? 'success' : 'warning'}>
                        {booking.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">
                      {formatDate(booking.checkIn, 'short')} – {formatDate(booking.checkOut, 'short')}
                      {' · '}
                      {booking.guests} guests
                    </p>
                    <p className="mt-1 text-sm font-semibold text-luxury">
                      {formatPrice(booking.totalPrice)}
                    </p>
                  </div>
                  <Link
                    href="/booking"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Request again
                  </Link>
                </div>
              );
            })
          )}
        </div>
      )}

      {section === 'wishlist' && (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {wishlistRooms.length === 0 ? (
            <div className="sm:col-span-2 xl:col-span-3">
              <EmptyState
                message="Your wishlist is empty."
                href="/rooms"
                label="Browse villas"
              />
            </div>
          ) : (
            wishlistRooms.map((room) => (
              <Link
                key={room.id}
                href={`/rooms/${room.id}`}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white transition-shadow hover:shadow-lg"
              >
                <div className="h-44 overflow-hidden">
                  <img
                    src={room.thumbnail}
                    alt={room.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h2 className="font-semibold text-luxury">{room.name}</h2>
                  <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                    {room.shortDescription}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    View villa <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      )}

      {section === 'settings' && (
        <form
          onSubmit={handleProfileSubmit}
          className="max-w-xl space-y-4 rounded-2xl border border-gray-100 bg-white p-6"
        >
          <label className="block">
            <span className="mb-1.5 flex items-center gap-2 text-sm font-medium text-secondary">
              <UserIcon className="h-4 w-4 text-primary" /> Full name
            </span>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-gray-200 bg-cream px-4 py-2.5 text-sm outline-none focus:border-primary/40"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 flex items-center gap-2 text-sm font-medium text-secondary">
              <Mail className="h-4 w-4 text-primary" /> Email
            </span>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border border-gray-200 bg-cream px-4 py-2.5 text-sm outline-none focus:border-primary/40"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 flex items-center gap-2 text-sm font-medium text-secondary">
              <Phone className="h-4 w-4 text-primary" /> Phone
            </span>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-lg border border-gray-200 bg-cream px-4 py-2.5 text-sm outline-none focus:border-primary/40"
            />
          </label>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="submit"
              className="rounded-lg bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-semibold text-luxury transition-shadow hover:shadow-lg hover:shadow-primary/25"
            >
              Save changes
            </button>
            {saved && (
              <span className="inline-flex items-center gap-1.5 text-sm text-emerald-600">
                <CheckCircle className="h-4 w-4" /> Saved in this browser only
              </span>
            )}
          </div>
          <p className="border-t border-gray-100 pt-4 text-xs leading-5 text-gray-500">
            Demo only. Never enter real passwords, payment card numbers or
            sensitive personal data in this form.
          </p>
        </form>
      )}

      {section === 'loyalty' && (
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 bg-white p-8">
            <Star className="mb-4 h-8 w-8 text-primary" />
            <p className="text-sm text-gray-500">Available points</p>
            <p className="mt-1 text-4xl font-bold text-luxury">{loyaltyPoints.toLocaleString()}</p>
            <p className="mt-3 text-sm text-gray-500">
              Sample loyalty balance for this demo. Points are not linked to real
              stays or payments.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-8">
            <h2 className="font-playfair text-xl font-bold text-luxury">How it works</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-500">
              <li>Earn sample points when a booking request is recorded in this browser.</li>
              <li>Points have no cash value and are not transferable.</li>
              <li>A production loyalty programme would need an authenticated backend.</li>
            </ul>
          </div>
        </div>
      )}

      {section === 'recently-viewed' && (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {recentRooms.length === 0 ? (
            <div className="sm:col-span-2 xl:col-span-3">
              <EmptyState
                message="No recently viewed villas yet."
                href="/rooms"
                label="Browse villas"
              />
            </div>
          ) : (
            recentRooms.map((room) => (
              <Link
                key={room.id}
                href={`/rooms/${room.id}`}
                className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 transition-shadow hover:shadow-lg"
              >
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                  <img
                    src={room.thumbnail}
                    alt={room.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h2 className="truncate font-semibold text-luxury">{room.name}</h2>
                  <p className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="h-3 w-3" /> Viewed in this browser
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
