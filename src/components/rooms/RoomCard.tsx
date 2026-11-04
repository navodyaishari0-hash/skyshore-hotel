'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Heart,
  ArrowRight,
} from 'lucide-react';
import { useBooking } from '@/context/BookingContext';
import type { Room } from '@/types';

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useBooking();
  const [imgError, setImgError] = useState(false);
  const inWishlist = isInWishlist(room.id);

  function toggleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(room.id);
    } else {
      addToWishlist(room.id);
    }
  }

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25 }}
      className="group h-full"
    >
      <div className="flex h-full flex-col border border-[#E5E0D5] bg-ivory transition-shadow duration-300 group-hover:shadow-[0_20px_50px_rgba(24,57,47,0.1)]">
        <Link href={`/rooms/${room.id}`} className="block">
          <div className="relative h-64 overflow-hidden sm:h-72">
            {room.thumbnail && !imgError ? (
              <Image
                src={room.thumbnail}
                alt={`Tropical villa exterior: ${room.name}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                onError={() => setImgError(true)}
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-secondary to-luxury flex items-center justify-center">
                <span className="font-playfair text-3xl text-primary">Villa</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-3 left-3 z-10">
              <span className="border border-white/60 bg-[#18392F]/60 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-white">
                A-frame villa
              </span>
            </div>
            <button
              onClick={toggleWishlist}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg"
              aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart
                className={`w-4.5 h-4.5 transition-all duration-300 ${
                  inWishlist ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-500'
                }`}
              />
            </button>
            {room.isNew && (
              <div className="absolute bottom-3 left-3 z-10">
                <span className="bg-primary px-2.5 py-1 text-xs font-semibold text-luxury">
                  NEW
                </span>
              </div>
            )}
          </div>
        </Link>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <Link href={`/rooms/${room.id}`} className="block">
            <h3 className="mb-2 font-playfair text-2xl font-medium text-luxury transition-colors group-hover:text-primary-dark">
              {room.name}
            </h3>
          </Link>
          <p className="mb-5 text-sm leading-6 text-gray-600">A private tropical villa with distinctive A-frame architecture. Confirm the configuration and current amenities with the host.</p>
          <p className="mb-5 border-y border-[#E5E0D5] py-3 text-xs text-gray-500">Capacity · bed details · rate: confirmed on request</p>

          <div className="mt-auto">
            <Link
              href={`/rooms/${room.id}`}
              className="flex min-h-11 w-full items-center justify-between border border-secondary px-4 py-3 text-sm font-semibold text-secondary transition-colors hover:bg-secondary hover:text-ivory"
            >
              View villa <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
