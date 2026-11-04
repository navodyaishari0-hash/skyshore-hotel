'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronDown, PenLine } from 'lucide-react';
import type { Review } from '@/types';
import { formatDate, getInitials } from '@/lib/utils';
import StarRating from '@/components/ui/StarRating';

interface ReviewSectionProps {
  reviews?: Review[];
  rating: number;
}

const mockReviews: Review[] = [
  {
    id: 'rev-1',
    userId: 'user-1',
    roomId: 'room-1',
    rating: 5,
    comment:
      'Absolutely stunning room with breathtaking ocean views. The bed was incredibly comfortable, and the marble bathroom was a dream. Staff went above and beyond to make our stay perfect.',
    createdAt: '2026-06-15',
  },
  {
    id: 'rev-2',
    userId: 'user-2',
    roomId: 'room-1',
    rating: 4,
    comment:
      'Beautiful room, great amenities. The only minor issue was a slight delay at check-in, but once settled, everything was impeccable. Will definitely return.',
    createdAt: '2026-05-22',
  },
  {
    id: 'rev-3',
    userId: 'user-3',
    roomId: 'room-1',
    rating: 5,
    comment:
      'We celebrated our anniversary here and it exceeded all expectations. The attention to detail is remarkable — from the flower arrangement to the personalized welcome note. Pure luxury.',
    createdAt: '2026-04-10',
  },
  {
    id: 'rev-4',
    userId: 'user-4',
    roomId: 'room-1',
    rating: 4,
    comment:
      'Elegant room with top-notch facilities. The guest kitchen was clean and easy to use, and the deck was perfect for meals we cooked ourselves. Would love to come back during the off-season for a quieter experience.',
    createdAt: '2026-03-18',
  },
  {
    id: 'rev-5',
    userId: 'user-5',
    roomId: 'room-1',
    rating: 5,
    comment:
      'The best hotel experience of my life. Every single detail has been thoughtfully curated. The setting was heavenly, the guest kitchen made the stay easy, and the staff made us feel like royalty.',
    createdAt: '2026-02-05',
  },
  {
    id: 'rev-6',
    userId: 'user-6',
    roomId: 'room-1',
    rating: 5,
    comment:
      'From the moment we arrived, we were enchanted. The room decor is exquisite, the views are unmatched, and the host support is worth every penny. A true masterpiece of hospitality.',
    createdAt: '2026-01-20',
  },
];

const reviewerNames: Record<string, string> = {
  'user-1': 'Victoria Harrington',
  'user-2': 'James Chen',
  'user-3': 'Sophia Moreau',
  'user-4': 'Alexander Petrov',
  'user-5': 'Priya Sharma',
  'user-6': 'Marcus Thompson',
};

const sortOptions = [
  { label: 'Most Recent', value: 'recent' },
  { label: 'Highest Rated', value: 'highest' },
  { label: 'Lowest Rated', value: 'lowest' },
];

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

function RatingBreakdown({ reviews }: { reviews: Review[] }) {
  const total = reviews.length;
  const counts = [5, 4, 3, 2, 1].map(
    (star) => reviews.filter((r) => r.rating === star).length
  );

  return (
    <div className="space-y-2">
      {[5, 4, 3, 2, 1].map((star, i) => (
        <div key={star} className="flex items-center gap-3">
          <span className="text-xs text-gray-500 w-8">{star}★</span>
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: total > 0 ? `${(counts[i] / total) * 100}%` : '0%' }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            />
          </div>
          <span className="text-xs text-gray-400 w-8 text-right">{counts[i]}</span>
        </div>
      ))}
    </div>
  );
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const name = reviewerNames[review.userId] || `Guest ${review.userId.slice(-1)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-luxury text-sm font-bold shrink-0">
          {getInitials(name)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-luxury text-sm">{name}</h4>
            <span className="text-xs text-gray-400">{formatDate(review.createdAt, 'short')}</span>
          </div>
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={cn(
                  'w-3.5 h-3.5',
                  i < review.rating ? 'fill-primary text-primary' : 'text-gray-200'
                )}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
          {review.reply && (
            <div className="mt-3 pl-3 border-l-2 border-primary/30">
              <p className="text-xs text-gray-400 font-medium mb-1">Hotel Response</p>
              <p className="text-sm text-gray-500">{review.reply}</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ReviewSection({ reviews: propReviews, rating }: ReviewSectionProps) {
  const [sortBy, setSortBy] = useState('recent');

  const allReviews = propReviews && propReviews.length > 0 ? propReviews : mockReviews;

  const sortedReviews = useMemo(() => {
    const copy = [...allReviews];
    switch (sortBy) {
      case 'highest':
        return copy.sort((a, b) => b.rating - a.rating);
      case 'lowest':
        return copy.sort((a, b) => a.rating - b.rating);
      case 'recent':
      default:
        return copy.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  }, [allReviews, sortBy]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 mb-8">
        <div className="flex flex-col items-center justify-center p-6 bg-cream rounded-xl">
          <span className="text-5xl font-playfair font-bold text-luxury">{rating.toFixed(1)}</span>
          <div className="flex items-center gap-1 my-2">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={cn(
                  'w-5 h-5',
                  i < Math.round(rating)
                    ? 'fill-primary text-primary'
                    : 'text-gray-200'
                )}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500">{allReviews.length} reviews</p>
        </div>
        <div>
          <RatingBreakdown reviews={allReviews} />
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h3 className="font-playfair text-lg font-bold text-luxury">Guest Reviews</h3>
        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-sm text-luxury outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {sortedReviews.map((review, i) => (
          <ReviewCard key={review.id} review={review} index={i} />
        ))}
      </div>

      <div className="flex justify-center">
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-luxury font-semibold text-sm rounded-lg hover:from-primary-dark hover:to-primary transition-all shadow-md hover:shadow-lg hover:shadow-primary/20">
          <PenLine className="w-4 h-4" />
          Write a Review
        </button>
      </div>
    </div>
  );
}
