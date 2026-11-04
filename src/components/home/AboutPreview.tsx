'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TreePine, Leaf, Flower2 } from 'lucide-react';
import Button from '@/components/ui/Button';

const features = [
  {
    icon: TreePine,
    title: 'A slower pace',
    description: 'Space to step away from the rush and settle into the quiet rhythm of the island.',
  },
  {
    icon: Leaf,
    title: 'Island character',
    description: 'A contemporary villa setting shaped by tropical greenery and warm natural materials.',
  },
  {
    icon: Flower2,
    title: 'Thoughtful comfort',
    description: 'A relaxed, personal stay with Sri Lankan hospitality at its heart.',
  },
];

export default function AboutPreview() {
  return (
    <section className="overflow-hidden border-y border-[#E7E1D5] bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative h-[420px] overflow-hidden sm:h-[520px]">
              <Image
                src="https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&h=600&fit=crop"
                alt="Tropical greenery around a private villa retreat"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 right-4 hidden border border-[#E5DFD1] bg-ivory px-6 py-5 text-luxury shadow-lg md:block">
              <p className="font-playfair text-2xl italic">Ayubowan</p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-[#73766D]">Welcome to Sri Lanka</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="mb-4 inline-block text-[10px] font-semibold uppercase tracking-[0.24em] text-primary-dark">
              A hidden tropical retreat
            </span>
            <h2 className="mb-6 max-w-xl font-playfair text-4xl font-medium leading-tight text-luxury md:text-5xl lg:text-6xl">
              A quieter way to <span className="italic text-forest">feel Sri Lanka.</span>
            </h2>
            <p className="mb-6 text-base leading-relaxed text-gray-500">
              Skyshore is a private villa retreat set among the island’s lush
              landscapes. A-frame architecture, tropical planting and warm
              natural textures give the stay a sense of place without losing
              the ease of modern comfort.
            </p>
            <p className="mb-6 text-base leading-relaxed text-gray-500">
              Make room for slower mornings, generous hospitality and the
              small details that make a tropical escape feel personal. Ask our
              team about current villa details and available experiences.
            </p>

            <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="mb-1 text-sm font-bold text-luxury">
                    {feature.title}
                  </h4>
                  <p className="text-xs leading-relaxed text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <Link href="/about">
              <Button variant="primary" size="lg">
                Our Story
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}