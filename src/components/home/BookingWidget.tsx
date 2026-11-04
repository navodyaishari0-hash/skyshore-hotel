'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CalendarDays, Users, Search } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';

function formatDateValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function BookingWidget() {
  const router = useRouter();
  const { updateBookingDates, updateGuests } = useBooking();
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [checkIn, setCheckIn] = useState(formatDateValue(today));
  const [checkOut, setCheckOut] = useState(formatDateValue(tomorrow));
  const [guests, setGuests] = useState(2);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updateBookingDates(checkIn, checkOut);
    updateGuests(guests);
    router.push('/booking');
  }

  return (
    <motion.form
      onSubmit={handleSearch}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-1 gap-3 border border-[#DED8CA] bg-ivory p-4 shadow-[0_20px_60px_rgba(27,42,34,0.12)] sm:grid-cols-2 sm:p-6 lg:grid-cols-[1fr_1fr_0.8fr_auto] lg:items-end"
    >
      <label className="block min-w-0 border-b border-[#D8D2C5] px-2 py-2">
        <span className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#73766D]">
          <CalendarDays size={14} className="text-primary-dark" /> Check-in
        </span>
        <input
          type="date"
          required
          value={checkIn}
          min={formatDateValue(today)}
          onChange={(event) => {
            const nextCheckIn = event.target.value;
            setCheckIn(nextCheckIn);
            if (checkOut <= nextCheckIn) {
              const nextCheckOutDate = new Date(`${nextCheckIn}T12:00:00`);
              nextCheckOutDate.setDate(nextCheckOutDate.getDate() + 1);
              setCheckOut(formatDateValue(nextCheckOutDate));
            }
          }}
          className="w-full min-w-0 bg-transparent text-sm text-luxury outline-none"
        />
      </label>

      <label className="block min-w-0 border-b border-[#D8D2C5] px-2 py-2">
        <span className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#73766D]">
          <CalendarDays size={14} className="text-primary-dark" /> Check-out
        </span>
        <input
          type="date"
          required
          value={checkOut}
          min={checkIn}
          onChange={(event) => setCheckOut(event.target.value)}
          className="w-full min-w-0 bg-transparent text-sm text-luxury outline-none"
        />
      </label>

      <label className="block border-b border-[#D8D2C5] px-2 py-2">
        <span className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#73766D]">
          <Users size={14} className="text-primary-dark" /> Guests
        </span>
        <select
          value={guests}
          onChange={(event) => setGuests(Number(event.target.value))}
          className="w-full bg-transparent text-sm text-luxury outline-none"
        >
          {[1, 2, 3, 4, 5, 6].map((count) => (
            <option key={count} value={count}>
              {count} {count === 1 ? 'guest' : 'guests'}
            </option>
          ))}
        </select>
      </label>

      <button
        type="submit"
        className="flex min-h-14 items-center justify-center gap-3 bg-secondary px-7 text-sm font-semibold text-ivory transition-colors hover:bg-forest"
      >
        <Search size={16} /> Check Availability
      </button>
    </motion.form>
  );
}