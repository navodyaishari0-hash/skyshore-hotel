'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ChefHat, ShoppingBasket, Coffee } from 'lucide-react';

const highlights = [
  {
    icon: ChefHat,
    title: 'A kitchen for guests',
    description:
      'Skyshore does not prepare or serve meals. Guests can use the kitchen to cook their own breakfast, lunch and dinner.',
  },
  {
    icon: ShoppingBasket,
    title: 'Local ingredients',
    description:
      'Buy fresh fruit, vegetables, fish, eggs and spices from shops and markets around Tangalle.',
  },
  {
    icon: Coffee,
    title: 'Tea & coffee your way',
    description:
      'Make a hot drink whenever you like. Ask the host what equipment is provided in the kitchen.',
  },
];

export default function DiningConcept() {
  return (
    <section className="border-y border-[#E7E1D5] bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="mb-4 inline-block text-sm font-medium uppercase tracking-[0.2em] text-primary">
              Self-catering kitchen
            </span>
            <h2 className="mb-6 text-3xl font-bold font-playfair text-luxury md:text-4xl lg:text-5xl">
              Cook your own meals,{' '}
              <span className="italic text-forest">on island time.</span>
            </h2>
            <p className="mb-6 text-base leading-relaxed text-gray-500">
              Skyshore does not have a restaurant and does not prepare food for
              guests. If you would like to cook, a kitchen is available for you
              to use during your stay.
            </p>
            <p className="mb-8 text-base leading-relaxed text-gray-500">
              Shop for fresh produce and seafood in Tangalle, then make
              breakfast, lunch or dinner whenever it suits you. Ask the host
              about kitchen access and what equipment is provided.
            </p>

            <div className="mb-8 space-y-4">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  className="flex items-start gap-4 border-b border-[#D8D2C5] py-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#D8D2C5] text-forest">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-bold text-luxury">{item.title}</h4>
                    <p className="text-sm leading-relaxed text-gray-500">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link href="/restaurant" className="inline-flex min-h-12 items-center gap-3 bg-secondary px-6 py-3 text-sm font-semibold text-ivory transition-colors hover:bg-forest">
              See the guest kitchen <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative h-[420px] overflow-hidden sm:h-[500px]">
              <Image
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop"
                alt="A kitchen available for guests to cook their own meals"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}