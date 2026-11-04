'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Home,
  ChevronRight,
  Users,
  BedDouble,
  Maximize2,
  Calendar,
  Minus,
  Plus,
  ArrowRight,
  Check,
  Clock,
  Shield,
  Ban,
  AlertTriangle,
  Wifi,
  Waves,
  Sparkles,
  Dumbbell,
  UtensilsCrossed,
  Wine,
  Car,
  Eye,
  Flower2,
  ConciergeBell,
} from 'lucide-react';
import { rooms } from '@/data';
import { useBooking } from '@/context/BookingContext';
import ImageGallery from '@/components/rooms/ImageGallery';
import ReviewSection from '@/components/rooms/ReviewSection';
import RoomCard from '@/components/rooms/RoomCard';
import Badge from '@/components/ui/Badge';
import Tabs from '@/components/ui/Tabs';

const amenityIconMap: Record<string, React.ReactNode> = {
  Wifi: <Wifi className="w-5 h-5" />,
  Pool: <Waves className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  Dumbbell: <Dumbbell className="w-5 h-5" />,
  UtensilsCrossed: <UtensilsCrossed className="w-5 h-5" />,
  Wine: <Wine className="w-5 h-5" />,
  ConciergeBell: <ConciergeBell className="w-5 h-5" />,
  Umbrella: <Flower2 className="w-5 h-5" />,
  Car: <Car className="w-5 h-5" />,
  Bell: <ConciergeBell className="w-5 h-5" />,
  Briefcase: <Eye className="w-5 h-5" />,
  Plane: <Calendar className="w-5 h-5" />,
  Baby: <Flower2 className="w-5 h-5" />,
  Tennis: <Dumbbell className="w-5 h-5" />,
  Helicopter: <Calendar className="w-5 h-5" />,
  UserCheck: <ConciergeBell className="w-5 h-5" />,
  Sunset: <Flower2 className="w-5 h-5" />,
  PawPrint: <Flower2 className="w-5 h-5" />,
  Shirt: <Sparkles className="w-5 h-5" />,
  VolumeX: <Eye className="w-5 h-5" />,
};

const typeLabels: Record<string, string> = {
  kabana: 'A-frame villa',
  deluxe: 'Deluxe',
  suite: 'Suite',
  presidential: 'Presidential',
  'ocean-view': 'Ocean View',
  'garden-view': 'Garden View',
  family: 'Family',
  penthouse: 'Penthouse',
  'junior-suite': 'Junior Suite',
};

const policies = [
  {
    icon: <Clock className="w-5 h-5 text-primary" />,
    title: 'Arrival & departure',
    items: [
      'Arrival and departure times are confirmed with the host.',
      'Share any timing requests before your stay.',
    ],
  },
  {
    icon: <Shield className="w-5 h-5 text-primary" />,
    title: 'Booking terms',
    items: [
      'Cancellation terms are provided by the host with the current villa quote.',
    ],
  },
  {
    icon: <Ban className="w-5 h-5 text-primary" />,
    title: 'House Rules',
    items: [
      'House rules and guest capacity are confirmed before a stay is accepted.',
    ],
  },
  {
    icon: <AlertTriangle className="w-5 h-5 text-primary" />,
    title: 'Additional Information',
    items: [
      'Amenities, taxes, transport and payment options are confirmed with the host.',
    ],
  },
];

export default function RoomDetailClient({ roomId }: { roomId: string }) {
  const router = useRouter();
  const { addToBooking, updateBookingDates, updateGuests } = useBooking();

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  const room = rooms.find((r) => r.id === roomId);

  const similarRooms = useMemo(() => {
    if (!room) return [];
    return rooms
      .filter((r) => r.id !== room.id && (r.type === room.type || r.isFeatured))
      .slice(0, 3);
  }, [room]);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.max(0, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
  }, [checkIn, checkOut]);

  function handleBook() {
    if (!room) return;
    updateBookingDates(checkIn, checkOut);
    updateGuests(guests);
    addToBooking(room);
    router.push('/booking');
  }

  if (!room) {
    return (
      <main className="bg-cream min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-playfair text-3xl font-bold text-luxury mb-4">Room Not Found</h1>
          <p className="text-gray-500 mb-6">The room you are looking for does not exist or has been removed.</p>
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-luxury font-semibold rounded-lg hover:from-primary-dark hover:to-primary transition-all"
          >
            Browse Rooms
          </Link>
        </div>
      </main>
    );
  }

  const tabs = [
    {
      label: 'Overview',
      value: 'overview',
      content: (
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">{room.description}</p>
          <div>
            <h4 className="font-semibold text-luxury mb-3">Room Features</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {room.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
    {
      label: 'Amenities',
      value: 'amenities',
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {room.amenities.map((amenity) => (
            <div
              key={amenity.id}
              className="flex items-center gap-4 p-4 bg-cream rounded-xl"
            >
              <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary">
                {amenityIconMap[amenity.icon] || <Sparkles className="w-5 h-5" />}
              </div>
              <div>
                <p className="font-medium text-luxury text-sm">{amenity.name}</p>
                <p className="text-xs text-gray-400 capitalize">{amenity.category}</p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      label: 'Reviews',
      value: 'reviews',
      content: <ReviewSection rating={room.rating} />,
    },
    {
      label: 'Policies',
      value: 'policies',
      content: (
        <div className="space-y-6">
          {policies.map((policy) => (
            <div key={policy.title}>
              <div className="flex items-center gap-2 mb-3">
                {policy.icon}
                <h4 className="font-semibold text-luxury">{policy.title}</h4>
              </div>
              <ul className="space-y-2 pl-7">
                {policy.items.map((item) => (
                  <li key={item} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-primary mt-1.5 text-xs">●</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <main className="bg-cream min-h-screen">
      <div className="bg-gradient-to-r from-secondary to-luxury py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-white/60">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/rooms" className="hover:text-primary transition-colors">
              Rooms
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-primary">{room.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ImageGallery images={room.images} />
        </motion.div>

        <div className="mt-8 flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <Badge variant="gold">{typeLabels[room.type] || 'Private villa'}</Badge>
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">Sri Lanka · details confirmed with host</span>
              </div>

              <h1 className="mb-4 font-playfair text-4xl font-medium text-luxury sm:text-5xl">
                {room.name}
              </h1>

              <p className="mb-8 max-w-2xl text-sm leading-6 text-gray-600">Villa photos and configuration are being updated from the property reference. Ask the host to confirm amenities, capacity, rates and availability for your dates.</p>

              <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="border border-[#E4DED1] bg-ivory p-4">
                  <Users className="mb-3 h-5 w-5 text-primary-dark" />
                  <p className="text-[9px] uppercase tracking-[0.16em] text-gray-500">Guest capacity</p>
                  <p className="mt-1 text-sm font-semibold text-luxury">Confirm with host</p>
                </div>
                <div className="border border-[#E4DED1] bg-ivory p-4">
                  <BedDouble className="mb-3 h-5 w-5 text-primary-dark" />
                  <p className="text-[9px] uppercase tracking-[0.16em] text-gray-500">Bed details</p>
                  <p className="mt-1 text-sm font-semibold text-luxury">Confirm with host</p>
                </div>
                <div className="border border-[#E4DED1] bg-ivory p-4">
                  <Maximize2 className="mb-3 h-5 w-5 text-primary-dark" />
                  <p className="text-[9px] uppercase tracking-[0.16em] text-gray-500">Villa size</p>
                  <p className="mt-1 text-sm font-semibold text-luxury">Confirm with host</p>
                </div>
              </div>

              <Tabs tabs={tabs} />
            </motion.div>
          </div>

          <div className="shrink-0 lg:w-[380px]">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="sticky top-24 border border-[#E4DED1] bg-ivory p-5 shadow-[0_20px_50px_rgba(24,57,47,0.08)] sm:p-6"
            >
              <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-primary-dark">Stay request</p>
              <h3 className="font-playfair text-2xl font-medium text-luxury mb-5">Request this villa</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1.5">Check-in</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-cream border border-gray-200 rounded-lg pl-10 pr-4 py-3 text-sm text-luxury outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-1.5">Check-out</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      min={checkIn || new Date().toISOString().split('T')[0]}
                      className="w-full bg-cream border border-gray-200 rounded-lg pl-10 pr-4 py-3 text-sm text-luxury outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-1.5">Guests</label>
                  <div className="flex items-center bg-cream border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="px-4 py-3 text-gray-400 hover:text-luxury transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="flex-1 text-center text-sm font-semibold text-luxury">
                      {guests} {guests === 1 ? 'Guest' : 'Guests'}
                    </span>
                    <button
                      onClick={() => setGuests(Math.min(6, guests + 1))}
                      className="px-4 py-3 text-gray-400 hover:text-luxury transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mb-6 space-y-3 border-y border-[#E4DED1] py-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Rate</span>
                  <span className="font-medium text-luxury">Confirm with host</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Nights</span>
                  <span className="text-luxury font-medium">{Math.max(nights, 1)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="font-bold text-luxury">Total & taxes</span>
                  <span className="text-right text-xs font-semibold text-primary-dark">Confirmed by host</span>
                </div>
              </div>

              <button
                onClick={handleBook}
                className="flex min-h-12 w-full items-center justify-center gap-2 bg-secondary py-3.5 font-semibold text-ivory transition-colors hover:bg-forest"
              >
                Reserve Now
                <ArrowRight className="w-5 h-5" />
              </button>

              <p className="mt-3 text-center text-xs leading-5 text-gray-500">
                No payment is collected here. Availability and booking terms are confirmed by the host.
              </p>
            </motion.div>
          </div>
        </div>

        {similarRooms.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <h2 className="font-playfair text-2xl font-bold text-luxury mb-6">Similar Rooms</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarRooms.map((r) => (
                <RoomCard key={r.id} room={r} />
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </main>
  );
}
