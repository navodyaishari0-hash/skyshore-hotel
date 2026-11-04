'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  ArrowRight,
  Home,
  Copy,
  Check,
  Clock3,
} from 'lucide-react';
import { useBooking } from '@/context/BookingContext';
import { rooms } from '@/data';
import { formatDate } from '@/lib/utils';
import Button from '@/components/ui/Button';

export default function BookingConfirmationPage() {
  const { bookings } = useBooking();
  const latestBooking = bookings[bookings.length - 1];
  const room = rooms.find((r) => r.id === latestBooking?.roomId);
  const [copied, setCopied] = useState(false);
  const bookingRef = latestBooking ? `SS-${latestBooking.id.slice(-8).toUpperCase()}` : 'SS-REQUEST';

  function handleCopy() {
    navigator.clipboard.writeText(bookingRef);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cream px-4 py-12">

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' as const }}
        className="w-full max-w-xl"
      >
        <div className="border border-[#E4DED1] bg-ivory p-6 text-center shadow-[0_24px_70px_rgba(24,57,47,0.1)] sm:p-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' as const, stiffness: 200, damping: 15, delay: 0.2 }}
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center bg-[#E7EBDD] text-forest"
          >
            <Clock3 className="h-8 w-8" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-playfair text-3xl font-bold text-luxury mb-2"
          >
            Stay request received
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-gray-500 mb-6"
          >
            This demo has recorded your request in the current session only. The host must confirm availability, villa details, rates and payment separately.
          </motion.p>

          {/* Booking ref */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-cream rounded-xl p-4 mb-6 inline-flex items-center gap-3"
          >
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Request reference</p>
              <p className="font-mono text-lg font-bold text-luxury">{bookingRef}</p>
            </div>
            <button onClick={handleCopy} className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-primary transition-colors cursor-pointer">
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </motion.div>

          {/* Booking summary */}
          {latestBooking && room && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-cream/50 rounded-xl p-5 text-left mb-6 space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden">
                  <Image src={room.thumbnail} alt={room.name} fill sizes="56px" className="object-cover" />
                </div>
                <div>
                  <p className="font-semibold text-luxury text-sm">{room.name}</p>
                  <p className="text-xs text-gray-500">Villa details to be confirmed</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-400 text-xs">Check-in</p>
                  <p className="font-medium text-luxury">{formatDate(latestBooking.checkIn, 'short')}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Check-out</p>
                  <p className="font-medium text-luxury">{formatDate(latestBooking.checkOut, 'short')}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Guests</p>
                  <p className="font-medium text-luxury">{latestBooking.guests}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Rate and taxes</p>
                  <p className="font-medium text-luxury">Confirm with host</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-3"
          >
            <Link href="/account" className="block">
              <Button variant="secondary" fullWidth rightIcon={<ArrowRight className="w-4 h-4" />}>
                View My Account
              </Button>
            </Link>
            <Link href="/" className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors py-2">
              <Home className="w-4 h-4" /> Back to Home
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
