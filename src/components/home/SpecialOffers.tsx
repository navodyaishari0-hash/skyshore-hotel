'use client';

import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';

const offers = [
  {
    id: 1,
    title: 'The Serendib Escape',
    description:
      'Two nights in Kabana of your choice with candlelit private dining under the stars, a guided jungle dawn walk, and a gourmet breakfast served on your deck each morning.',
    discount: 20,
    originalPrice: 154000,
    price: 123200,
    duration: '2 Nights',
    image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&h=500&fit=crop',
  },
  {
    id: 2,
    title: 'Honeymoon in the Trees',
    description:
      'A three-night romantic celebration in Kabana 01 — The Woods, with private in-villa dining, a dreamy candlelit bath, champagne on arrival, and a secluded beach picnic for two.',
    discount: 25,
    originalPrice: 224000,
    price: 168000,
    duration: '3 Nights',
    image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&h=500&fit=crop',
  },
  {
    id: 3,
    title: 'The Island Immersion',
    description:
      'Four nights of discovery — split your stay between both kabanas, with a river safari, spice garden tour, and a traditional Sri Lankan cooking class included.',
    discount: 15,
    originalPrice: 295000,
    price: 250750,
    duration: '4 Nights',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const formatPriceLKR = (amount: number) => {
  return `Rs. ${amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
};

export default function SpecialOffers() {
  return (
    <section className="bg-luxury py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold font-playfair text-cream md:text-4xl">
            Curated Experiences
          </h2>
          <p className="mt-3 text-base text-cream/60">
            Thoughtfully designed escapes, each celebrating the private, natural character of Skyshore.
          </p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/60" />
            <div className="h-2 w-2 rotate-45 bg-primary" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/60" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {offers.map((offer, i) => (
            <motion.div
              key={offer.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

                <div className="absolute right-4 top-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/30">
                  <div className="text-center">
                    <span className="block text-lg font-bold leading-none text-luxury">
                      {offer.discount}%
                    </span>
                    <span className="text-[10px] font-semibold uppercase text-luxury/70">
                      Off
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="mb-2 flex items-center gap-2 text-cream/60">
                    <Clock className="h-3.5 w-3.5" />
                    <span className="text-xs">{offer.duration}</span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold font-playfair text-cream">
                    {offer.title}
                  </h3>
                  <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-cream/60">
                    {offer.description}
                  </p>
                  <div className="mb-4 flex items-baseline gap-3">
                    <span className="text-2xl font-bold text-primary">
                      {formatPriceLKR(offer.price)}
                    </span>
                    <span className="text-sm text-cream/40 line-through">
                      {formatPriceLKR(offer.originalPrice)}
                    </span>
                    <span className="text-xs text-cream/40">/ package</span>
                  </div>
                  <Button
                    variant="glass"
                    size="sm"
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                    className="border border-primary/30 text-primary hover:bg-primary/10"
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}