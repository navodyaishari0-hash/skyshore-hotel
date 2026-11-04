'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  SlidersHorizontal,
  DollarSign,
  Bed,
  Users,
  Eye,
  Sparkles,
  Wifi,
  Waves,
  Dumbbell,
  UtensilsCrossed,
  Wine,
  Car,
  ParkingCircle,
  Flower2,
} from 'lucide-react';

export interface FilterState {
  priceMin: number;
  priceMax: number;
  roomTypes: string[];
  capacity: string;
  views: string[];
  amenities: string[];
}

interface RoomFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  isOpen: boolean;
  onClose: () => void;
}

const roomTypeOptions = [
  { label: 'Kabana', value: 'kabana' },
  { label: 'Woods', value: 'woods' },
  { label: 'Creek', value: 'creek' },
];

const capacityOptions = [
  { label: '1-2 Guests', value: '1-2' },
  { label: '3-4 Guests', value: '3-4' },
];

const viewOptions = ['Forest', 'Creek', 'Misty Valley', 'Canopy'];

const amenityOptions = [
  { label: 'WiFi', value: 'WiFi', icon: <Wifi className="w-4 h-4" /> },
  { label: 'Private Veranda', value: 'Veranda', icon: <Waves className="w-4 h-4" /> },
  { label: 'In-Villa Dining', value: 'Private Dining', icon: <UtensilsCrossed className="w-4 h-4" /> },
  { label: 'Tropical Bathroom', value: 'Bathroom', icon: <Flower2 className="w-4 h-4" /> },
  { label: 'Rain Shower', value: 'Rain Shower', icon: <Sparkles className="w-4 h-4" /> },
  { label: 'Parking', value: 'Parking', icon: <ParkingCircle className="w-4 h-4" /> },
];

const PRICE_CEILING = 200000;

const defaultFilters: FilterState = {
  priceMin: 0,
  priceMax: PRICE_CEILING,
  roomTypes: [],
  capacity: '',
  views: [],
  amenities: [],
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h4 className="text-sm font-semibold text-luxury mb-3 uppercase tracking-wider">{title}</h4>
      {children}
    </div>
  );
}

export default function RoomFilters({ onFilterChange, isOpen, onClose }: RoomFiltersProps) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const updateFilters = useCallback(
    (partial: Partial<FilterState>) => {
      const next = { ...filters, ...partial };
      setFilters(next);
      onFilterChange(next);
    },
    [filters, onFilterChange]
  );

  function toggleArrayItem(arr: string[], item: string) {
    return arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
  }

  function clearAll() {
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  }

  const hasActiveFilters =
    filters.priceMin > 0 ||
    filters.priceMax < PRICE_CEILING ||
    filters.roomTypes.length > 0 ||
    filters.capacity !== '' ||
    filters.views.length > 0 ||
    filters.amenities.length > 0;

  const sidebarContent = (
    <div className="space-y-0">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-primary" />
          <h3 className="font-playfair text-lg font-bold text-luxury">Filters</h3>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden w-8 h-8 rounded-full bg-cream flex items-center justify-center text-gray-500 hover:text-luxury transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <FilterSection title="Price Range">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="text-xs text-gray-400 mb-1 block">Min</label>
              <div className="relative">
                <DollarSign className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="number"
                  value={filters.priceMin}
                  onChange={(e) => updateFilters({ priceMin: Number(e.target.value) })}
                  className="w-full bg-cream border border-gray-200 rounded-lg pl-7 pr-3 py-2 text-sm text-luxury outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  min={0}
                  placeholder="0"
                />
              </div>
            </div>
            <span className="text-gray-300 mt-5">—</span>
            <div className="flex-1">
              <label className="text-xs text-gray-400 mb-1 block">Max</label>
              <div className="relative">
                <DollarSign className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="number"
                  value={filters.priceMax}
                  onChange={(e) => updateFilters({ priceMax: Number(e.target.value) })}
                  className="w-full bg-cream border border-gray-200 rounded-lg pl-7 pr-3 py-2 text-sm text-luxury outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  min={0}
                  placeholder={String(PRICE_CEILING)}
                />
              </div>
            </div>
          </div>
          <div className="relative h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute h-full bg-gradient-to-r from-primary to-accent rounded-full"
              style={{
                left: `${(filters.priceMin / PRICE_CEILING) * 100}%`,
                width: `${((filters.priceMax - filters.priceMin) / PRICE_CEILING) * 100}%`,
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>${filters.priceMin}</span>
            <span>${filters.priceMax.toLocaleString()}</span>
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Room Type">
        <div className="space-y-2.5">
          {roomTypeOptions.map((opt) => (
            <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
              <div
                className={cn(
                  'w-4.5 h-4.5 rounded border-2 flex items-center justify-center transition-all duration-200',
                  filters.roomTypes.includes(opt.value)
                    ? 'bg-primary border-primary'
                    : 'border-gray-300 group-hover:border-primary/50'
                )}
              >
                {filters.roomTypes.includes(opt.value) && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <input
                type="checkbox"
                className="sr-only"
                checked={filters.roomTypes.includes(opt.value)}
                onChange={() =>
                  updateFilters({ roomTypes: toggleArrayItem(filters.roomTypes, opt.value) })
                }
              />
              <span className="text-sm text-gray-600 group-hover:text-luxury transition-colors">
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Capacity">
        <div className="space-y-2.5">
          {capacityOptions.map((opt) => (
            <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
              <div
                className={cn(
                  'w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center transition-all duration-200',
                  filters.capacity === opt.value
                    ? 'border-primary'
                    : 'border-gray-300 group-hover:border-primary/50'
                )}
              >
                {filters.capacity === opt.value && (
                  <div className="w-2 h-2 rounded-full bg-primary" />
                )}
              </div>
              <input
                type="radio"
                name="capacity"
                className="sr-only"
                checked={filters.capacity === opt.value}
                onChange={() =>
                  updateFilters({ capacity: filters.capacity === opt.value ? '' : opt.value })
                }
              />
              <span className="text-sm text-gray-600 group-hover:text-luxury transition-colors">
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="View">
        <div className="flex flex-wrap gap-2">
          {viewOptions.map((view) => (
            <button
              key={view}
              onClick={() => updateFilters({ views: toggleArrayItem(filters.views, view) })}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200',
                filters.views.includes(view)
                  ? 'bg-primary/15 text-primary-dark border-primary/30'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-primary/30 hover:text-luxury'
              )}
            >
              {view}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Amenities">
        <div className="space-y-2.5">
          {amenityOptions.map((opt) => (
            <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
              <div
                className={cn(
                  'w-4.5 h-4.5 rounded border-2 flex items-center justify-center transition-all duration-200',
                  filters.amenities.includes(opt.value)
                    ? 'bg-primary border-primary'
                    : 'border-gray-300 group-hover:border-primary/50'
                )}
              >
                {filters.amenities.includes(opt.value) && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <input
                type="checkbox"
                className="sr-only"
                checked={filters.amenities.includes(opt.value)}
                onChange={() =>
                  updateFilters({ amenities: toggleArrayItem(filters.amenities, opt.value) })
                }
              />
              <span className="text-sm text-gray-600 group-hover:text-luxury transition-colors flex items-center gap-2">
                {opt.icon}
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      <div className="space-y-3 pt-4 border-t border-gray-100">
        <button
          onClick={() => updateFilters(defaultFilters)}
          className="w-full py-2.5 text-sm font-medium text-gray-500 hover:text-luxury transition-colors border border-gray-200 rounded-lg hover:bg-cream"
        >
          Clear All
        </button>
        <button
          onClick={onClose}
          className="w-full py-2.5 text-sm font-semibold text-luxury bg-gradient-to-r from-primary to-accent rounded-lg hover:from-primary-dark hover:to-primary transition-all shadow-md hover:shadow-lg hover:shadow-primary/20"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden lg:block">{sidebarContent}</div>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={onClose}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring' as const, stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full w-80 bg-white z-50 p-6 overflow-y-auto shadow-2xl lg:hidden"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
