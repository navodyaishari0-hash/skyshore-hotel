'use client';

import { LayoutGrid, List, ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RoomSortBarProps {
  totalResults: number;
  sortBy: string;
  onSortChange: (sort: string) => void;
  viewMode: 'grid' | 'list';
  onViewChange: (mode: 'grid' | 'list') => void;
  onCompareToggle: () => void;
  compareMode: boolean;
}

const sortOptions = [
  { label: 'Popular', value: 'popular' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Rating', value: 'rating' },
  { label: 'Newest', value: 'newest' },
];

export default function RoomSortBar({
  totalResults,
  sortBy,
  onSortChange,
  viewMode,
  onViewChange,
  onCompareToggle,
  compareMode,
}: RoomSortBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 px-1 border-b border-gray-200">
      <p className="text-sm text-gray-500 font-medium">
        <span className="text-luxury font-semibold">{totalResults}</span>{' '}
        {totalResults === 1 ? 'room' : 'rooms'} found
      </p>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative">
          <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="appearance-none bg-cream border border-gray-200 rounded-lg pl-8 pr-8 py-2 text-sm text-luxury outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="hidden sm:flex items-center bg-cream border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => onViewChange('grid')}
            className={cn(
              'p-2 transition-colors',
              viewMode === 'grid'
                ? 'bg-primary text-luxury'
                : 'text-gray-400 hover:text-luxury'
            )}
            aria-label="Grid view"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewChange('list')}
            className={cn(
              'p-2 transition-colors',
              viewMode === 'list'
                ? 'bg-primary text-luxury'
                : 'text-gray-400 hover:text-luxury'
            )}
            aria-label="List view"
          >
            <List className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={onCompareToggle}
          className={cn(
            'px-3 py-2 text-xs font-medium rounded-lg border transition-all',
            compareMode
              ? 'bg-primary/15 text-primary-dark border-primary/30'
              : 'bg-white text-gray-500 border-gray-200 hover:border-primary/30 hover:text-luxury'
          )}
        >
          Compare
        </button>
      </div>
    </div>
  );
}
