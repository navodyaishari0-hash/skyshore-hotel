'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Room, Booking } from '@/types';

interface BookingContextType {
  selectedRoom: Room | null;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;

  addToBooking: (room: Room) => void;
  removeFromBooking: () => void;
  updateBookingDates: (checkIn: string, checkOut: string) => void;
  updateGuests: (guests: number) => void;

  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
  cancelBooking: (bookingId: string) => void;

  wishlist: string[];
  addToWishlist: (roomId: string) => void;
  removeFromWishlist: (roomId: string) => void;
  isInWishlist: (roomId: string) => boolean;

  recentlyViewed: string[];
  addToRecentlyViewed: (roomId: string) => void;

  loyaltyPoints: number;
  addLoyaltyPoints: (points: number) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

function calculateTotal(room: Room, checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return nights > 0 ? room.price * nights : 0;
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [totalPrice, setTotalPrice] = useState(0);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);

  const addToBooking = useCallback((room: Room) => {
    setSelectedRoom(room);
    if (checkIn && checkOut) {
      setTotalPrice(calculateTotal(room, checkIn, checkOut));
    }
  }, [checkIn, checkOut]);

  const removeFromBooking = useCallback(() => {
    setSelectedRoom(null);
    setCheckIn('');
    setCheckOut('');
    setGuests(2);
    setTotalPrice(0);
  }, []);

  const updateBookingDates = useCallback(
    (newCheckIn: string, newCheckOut: string) => {
      setCheckIn(newCheckIn);
      setCheckOut(newCheckOut);
      if (selectedRoom && newCheckIn && newCheckOut) {
        setTotalPrice(calculateTotal(selectedRoom, newCheckIn, newCheckOut));
      }
    },
    [selectedRoom]
  );

  const updateGuests = useCallback((newGuests: number) => {
    setGuests(newGuests);
  }, []);

  const addBooking = useCallback(
    (bookingData: Omit<Booking, 'id' | 'createdAt'>) => {
      const newBooking: Booking = {
        ...bookingData,
        id: `booking-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      setBookings((prev) => [...prev, newBooking]);
      setLoyaltyPoints((prev) => prev + Math.floor(bookingData.totalPrice / 10));
      setSelectedRoom(null);
      setCheckIn('');
      setCheckOut('');
      setGuests(2);
      setTotalPrice(0);
    },
    []
  );

  const cancelBooking = useCallback((bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' as const } : b))
    );
  }, []);

  const addToWishlist = useCallback((roomId: string) => {
    setWishlist((prev) => (prev.includes(roomId) ? prev : [...prev, roomId]));
  }, []);

  const removeFromWishlist = useCallback((roomId: string) => {
    setWishlist((prev) => prev.filter((id) => id !== roomId));
  }, []);

  const isInWishlist = useCallback(
    (roomId: string) => wishlist.includes(roomId),
    [wishlist]
  );

  const addToRecentlyViewed = useCallback((roomId: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== roomId);
      return [roomId, ...filtered].slice(0, 10);
    });
  }, []);

  const addLoyaltyPoints = useCallback((points: number) => {
    setLoyaltyPoints((prev) => prev + points);
  }, []);

  return (
    <BookingContext.Provider
      value={{
        selectedRoom,
        checkIn,
        checkOut,
        guests,
        totalPrice,
        addToBooking,
        removeFromBooking,
        updateBookingDates,
        updateGuests,
        bookings,
        addBooking,
        cancelBooking,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        recentlyViewed,
        addToRecentlyViewed,
        loyaltyPoints,
        addLoyaltyPoints,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
