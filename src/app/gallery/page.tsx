'use client';

import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Expand, Play, ChevronDown } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import Lightbox from '@/components/shared/Lightbox';

const categories = ['All', 'Kabanas', 'Dining', 'Nature', 'Experiences'] as const;
type Category = (typeof categories)[number];

const allImages: { src: string; title: string; category: Category; aspect: string }[] = [
  { src: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop', title: 'Kabana 01 — The Woods', category: 'Kabanas', aspect: 'aspect-[4/3]' },
  { src: 'https://images.unsplash.com/photo-1519449556851-5720b33024e7?w=800&h=600&fit=crop', title: 'Kabana 02 — The Creek', category: 'Kabanas', aspect: 'aspect-[4/3]' },
  { src: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=900&fit=crop', title: 'Canopy King Suite', category: 'Kabanas', aspect: 'aspect-[8/9]' },
  { src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop', title: 'Morning Veranda', category: 'Kabanas', aspect: 'aspect-[4/3]' },
  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop', title: 'Private Balcony Dining', category: 'Dining', aspect: 'aspect-[4/3]' },
  { src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=700&fit=crop', title: 'In-Villa Chef Service', category: 'Dining', aspect: 'aspect-[8/7]' },
  { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=500&fit=crop', title: 'Sunset Cocktail Hour', category: 'Dining', aspect: 'aspect-[8/5]' },
  { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop', title: 'Misty Highlands', category: 'Nature', aspect: 'aspect-[8/5]' },
  { src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop', title: 'Rainforest Canopy', category: 'Nature', aspect: 'aspect-[4/3]' },
  { src: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=800&h=900&fit=crop', title: 'Canopy at Dusk', category: 'Nature', aspect: 'aspect-[8/9]' },
  { src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=500&fit=crop', title: 'Jungle Walking Trail', category: 'Experiences', aspect: 'aspect-[8/5]' },
  { src: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop', title: 'Temple Excursion', category: 'Experiences', aspect: 'aspect-[4/3]' },
  { src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop', title: 'Tea Estate Ride', category: 'Experiences', aspect: 'aspect-[4/3]' },
  { src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=500&fit=crop', title: 'River Safari', category: 'Experiences', aspect: 'aspect-[8/5]' },
];

const videos = [
  { thumbnail: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=450&fit=crop', title: 'The Woods Tour', duration: '2:56' },
  { thumbnail: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=450&fit=crop', title: 'Highlands Escape', duration: '3:41' },
  { thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=450&fit=crop', title: 'Dining at Serendib', duration: '2:12' },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.5, ease: 'easeOut' as const } }),
};

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [visibleCount, setVisibleCount] = useState(8);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filtered = activeCategory === 'All' ? allImages : allImages.filter((img) => img.category === activeCategory);
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  function openLightbox(index: number) {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }

  return (
    <main className="bg-cream">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] overflow-hidden bg-secondary flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1920&h=800&fit=crop')] bg-cover bg-center opacity-20" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10">
          <p className="text-primary font-medium tracking-[0.3em] uppercase text-sm mb-4">Our World</p>
          <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-4">Visual Journey</h1>
          <p className="text-cream/70 text-lg max-w-2xl mx-auto mt-4">
            Explore the misty highlands of Skyshore through our curated collection
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-6" />
        </motion.div>
      </section>

      {/* Gallery */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Category Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white rounded-full p-1.5 gap-1 shadow-sm border border-gray-100 flex-wrap justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setVisibleCount(8); }}
                  className="relative px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 cursor-pointer"
                >
                  {activeCategory === cat && (
                    <motion.div
                      layoutId="galleryTab"
                      className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full"
                      transition={{ type: 'spring' as const, stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 ${activeCategory === cat ? 'text-luxury' : 'text-gray-500'}`}>
                    {cat}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Masonry Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="columns-1 sm:columns-2 lg:columns-3 gap-4"
            >
              {visible.map((img, i) => (
                <motion.div
                  key={`${img.title}-${i}`}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className={`relative rounded-xl overflow-hidden group cursor-pointer break-inside-avoid mb-4 ${img.aspect}`}
                  onClick={() => openLightbox(i)}
                >
                  <img src={img.src} alt={img.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-luxury/0 group-hover:bg-luxury/50 transition-all duration-500 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100">
                      <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                        <Expand className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-luxury/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-white font-semibold text-sm">{img.title}</p>
                    <p className="text-white/60 text-xs mt-0.5">{img.category}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Load More */}
          {hasMore && (
            <div className="text-center mt-12">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setVisibleCount((prev) => prev + 6)}
                rightIcon={<ChevronDown className="w-5 h-5" />}
              >
                Load More
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="Video Tours" subtitle="Experience the magic of the highlands through film" centered />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videos.map((video, i) => (
              <motion.div
                key={video.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative rounded-2xl overflow-hidden group cursor-pointer aspect-video"
              >
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-luxury/30 group-hover:bg-luxury/50 transition-all duration-500 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-xl"
                  >
                    <Play className="w-7 h-7 text-luxury ml-1" fill="currentColor" />
                  </motion.div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <p className="text-white font-semibold text-sm drop-shadow-lg">{video.title}</p>
                  <span className="text-white/70 text-xs bg-luxury/40 backdrop-blur-sm rounded-full px-2.5 py-1">{video.duration}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        items={visible.map((img) => ({ image: img.src, title: img.title }))}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </main>
  );
}
