'use client';

import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';

const newsPosts = [
  {
    id: 'news-1',
    title: 'The Art of Slow Travel: Why Luxury is About Time, Not Things',
    excerpt:
      'In a world obsessed with bucket lists and busy itineraries, true luxury lies in the art of slowing down — and there is no better place to practice than a secluded island villa.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop',
    category: 'Travel Philosophy',
    date: '2026-05-15',
    readTime: 8,
  },
  {
    id: 'news-2',
    title: 'Into the Wild: Our 5 Favourite Sri Lankan Nature Encounters',
    excerpt:
      'From jungle dawn walks to river safaris, discover the unforgettable natural experiences that await just beyond your kabana door.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop',
    category: 'Nature',
    date: '2026-06-08',
    readTime: 10,
  },
  {
    id: 'news-3',
    title: 'A Taste of Serendib: The Flavours of Sri Lankan Cuisine',
    excerpt:
      "Hoppers, rice and curry, fresh seafood — explore the island's culinary traditions and try cooking them yourself in the guest kitchen.",
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=500&fit=crop',
    category: 'Culinary',
    date: '2026-06-20',
    readTime: 7,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function NewsSection() {
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Stories from Serendib"
          subtitle="Tales, insights, and inspiration from our tropical sanctuary."
          centered
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {newsPosts.map((post, i) => (
            <motion.article
              key={post.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="group overflow-hidden rounded-2xl bg-white shadow-lg shadow-black/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-luxury">
                  {post.category}
                </span>
              </div>

              <div className="p-6">
                <div className="mb-3 flex items-center gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(post.date, 'short')}
                  </span>
                  <span>{post.readTime} min read</span>
                </div>

                <h3 className="mb-3 text-lg font-bold font-playfair text-luxury line-clamp-2 group-hover:text-primary-dark transition-colors">
                  {post.title}
                </h3>

                <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-500">
                  {post.excerpt}
                </p>

                <button className="flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-dark">
                  Read More
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}