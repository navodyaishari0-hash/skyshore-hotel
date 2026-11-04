'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, UtensilsCrossed, Coffee } from 'lucide-react';

const highlights = [
  {
    icon: Leaf,
    title: 'Sri Lankan flavours',
    description:
      'Ask the host which Sri Lankan dishes can be arranged during your stay.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Fresh island ingredients',
    description:
      'Share your interest in tropical fruit, seafood, breakfast and local produce.',
  },
  {
    icon: Coffee,
    title: 'Tea, coffee & more',
    description:
      'Menus, dining options and dietary requests are confirmed directly with the host.',
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
              A taste of the island
            </span>
            <h2 className="mb-6 text-3xl font-bold font-playfair text-luxury md:text-4xl lg:text-5xl">
              Sri Lankan dining,{' '}
              <span className="italic text-forest">on your terms.</span>
            </h2>
            <p className="mb-6 text-base leading-relaxed text-gray-500">
              Wondering what dining is available? Ask about traditional dishes,
              seasonal ingredients, seafood, breakfast, tea and coffee.
            </p>
            <p className="mb-8 text-base leading-relaxed text-gray-500">
              Menus, service arrangements, prices and dietary options are
              confirmed with the host for your dates.
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
              Plan a dining enquiry <ArrowRight size={16} />
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
                alt="Sri Lankan-inspired ingredients and a prepared meal"
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