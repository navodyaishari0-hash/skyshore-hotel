'use client';

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, SlidersHorizontal, X, ChevronRight } from 'lucide-react';
import { rooms } from '@/data';
import { cn } from '@/lib/utils';
import RoomCard from '@/components/rooms/RoomCard';
import RoomFilters, { type FilterState } from '@/components/rooms/RoomFilters';
import RoomSortBar from '@/components/rooms/RoomSortBar';
import Pagination from '@/components/ui/Pagination';
import type { Room } from '@/types';

const ROOMS_PER_PAGE = 6;

const emptyFilters: FilterState = {
  priceMin: 0,
  priceMax: 200000,
  roomTypes: [],
  capacity: '',
  views: [],
  amenities: [],
};

function filterRooms(roomList: Room[], filters: FilterState): Room[] {
  return roomList.filter((room) => {
    const price = room.discountPrice || room.price;
    if (price < filters.priceMin || price > filters.priceMax) return false;

    if (filters.roomTypes.length > 0 && !filters.roomTypes.includes(room.type)) return false;

    if (filters.capacity) {
      if (filters.capacity === '5+' && room.capacity < 5) return false;
      if (filters.capacity === '3-4' && (room.capacity < 3 || room.capacity > 4)) return false;
      if (filters.capacity === '1-2' && room.capacity > 2) return false;
    }

    if (filters.views.length > 0) {
      const roomView = room.view.toLowerCase();
      const hasMatchingView = filters.views.some((v) => roomView.includes(v.toLowerCase()));
      if (!hasMatchingView) return false;
    }

    if (filters.amenities.length > 0) {
      const roomAmenityNames = room.amenities.map((a) => a.name.toLowerCase());
      const hasAllAmenities = filters.amenities.every((am) =>
        roomAmenityNames.some((name) => name.includes(am.toLowerCase()))
      );
      if (!hasAllAmenities) return false;
    }

    return true;
  });
}

function sortRooms(roomList: Room[], sort: string): Room[] {
  const copy = [...roomList];
  switch (sort) {
    case 'price-asc':
      return copy.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    case 'price-desc':
      return copy.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    case 'rating':
      return copy.sort((a, b) => b.rating - a.rating);
    case 'newest':
      return copy.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    case 'popular':
    default:
      return copy.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
  }
}

export default function RoomsPage() {
  const [filters, setFilters] = useState<FilterState>(emptyFilters);
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [compareMode, setCompareMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);

  const filteredRooms = useMemo(() => {
    const filtered = filterRooms(rooms, filters);
    return sortRooms(filtered, sortBy);
  }, [filters, sortBy]);

  const totalPages = Math.ceil(filteredRooms.length / ROOMS_PER_PAGE);
  const paginatedRooms = filteredRooms.slice(
    (currentPage - 1) * ROOMS_PER_PAGE,
    currentPage * ROOMS_PER_PAGE
  );

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  return (
    <main className="bg-cream min-h-screen">
      <div className="relative h-64 sm:h-80 bg-gradient-to-br from-secondary via-luxury to-secondary overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=800&fit=crop)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-luxury/40 via-luxury/20 to-luxury/80" />
        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-white mb-3">
              Our Kabanas & Stays
            </h1>
            <div className="flex items-center gap-2 text-sm text-white/60">
              <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
                <Home className="w-3.5 h-3.5" />
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-primary">Rooms</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <h2 className="font-playfair text-xl font-bold text-luxury">Filter Rooms</h2>
          <button
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-luxury hover:border-primary/40 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </div>

        <div className="flex gap-8">
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-24">
              <RoomFilters
                onFilterChange={handleFilterChange}
                isOpen={filterOpen}
                onClose={() => setFilterOpen(false)}
              />
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <RoomSortBar
              totalResults={filteredRooms.length}
              sortBy={sortBy}
              onSortChange={setSortBy}
              viewMode={viewMode}
              onViewChange={setViewMode}
              onCompareToggle={() => setCompareMode(!compareMode)}
              compareMode={compareMode}
            />

            {paginatedRooms.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-cream flex items-center justify-center">
                  <SlidersHorizontal className="w-8 h-8 text-primary/50" />
                </div>
                <h3 className="font-playfair text-xl font-bold text-luxury mb-2">No rooms found</h3>
                <p className="text-gray-500 text-sm mb-4">
                  Try adjusting your filters to see more results.
                </p>
                <button
                  onClick={() => {
                    setFilters(emptyFilters);
                    setCurrentPage(1);
                  }}
                  className="text-sm text-primary font-semibold hover:text-primary-dark transition-colors"
                >
                  Clear all filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                layout
                className={cn(
                  'mt-4',
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-4'
                )}
              >
                <AnimatePresence mode="popLayout">
                  {paginatedRooms.map((room) => (
                    <motion.div
                      key={room.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      <RoomCard room={room} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center mt-10">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        </div>

        <AnimatePresence>
          {compareMode && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl p-4 z-30"
            >
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Compare mode is active. Select rooms to compare.
                </p>
                <button
                  onClick={() => setCompareMode(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 hover:text-luxury transition-colors"
                >
                  <X className="w-4 h-4" />
                  Close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
