'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf } from 'lucide-react';
import Button from '@/components/ui/Button';
import { rooms } from '@/data';

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

export default function KabanaShowcase() {
  const kabanas = rooms.filter((r) => r.type === 'kabana');

  return (
    <section id="villas" className="bg-ivory py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid items-end gap-5 md:grid-cols-[1fr_auto] md:mb-16">
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary-dark">A slower kind of stay</p>
            <h2 className="max-w-2xl font-playfair text-4xl font-medium leading-tight text-luxury sm:text-5xl lg:text-6xl">
              Villas made for <span className="italic text-forest">island time.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-[#686B63]">
            Explore the villa collection, shaped by the landscape and the
            architecture of the property.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {kabanas.map((room, i) => (
            <motion.div
              key={room.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="group overflow-hidden border border-[#E5E0D5] bg-white transition-shadow duration-500 hover:shadow-[0_24px_56px_rgba(31,47,36,0.12)]"
            >
              <div className="relative h-[300px] overflow-hidden sm:h-[380px]">
                <Image
                  src={room.thumbnail}
                  alt={`Sri Lankan tropical villa: ${room.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111A14]/75 via-transparent to-transparent" />

                <span className="absolute left-5 top-5 border border-white/50 bg-[#172C22]/35 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.2em] text-white">
                  Sri Lankan villa
                </span>

                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 sm:bottom-7 sm:left-7 sm:right-7">
                  <h3 className="font-playfair text-3xl font-medium text-white sm:text-4xl">
                    Villa {String(i + 1).padStart(2, '0')}
                  </h3>
                  <span className="mb-1 flex h-10 w-10 shrink-0 items-center justify-center border border-white/50 text-white transition-colors group-hover:bg-primary group-hover:text-luxury">
                    <ArrowRight size={17} />
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-7">
                <p className="mb-6 max-w-xl text-sm leading-6 text-[#686B63]">
                  A private A-frame retreat with a strong connection to the
                  tropical garden and the calm of the surrounding landscape.
                </p>

                <div className="mb-6 flex flex-wrap gap-x-6 gap-y-2 border-y border-[#E8E3D8] py-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6E756D]">
                  <span className="flex items-center gap-2"><Leaf size={14} className="text-forest" /> A-frame architecture</span>
                  <span className="flex items-center gap-2"><Leaf size={14} className="text-forest" /> Garden setting</span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-[#77786F]">Rates and villa details on request</span>
                  <div className="flex gap-3">
                  <Link href={`/rooms/${room.id}`} className="flex-1">
                    <Button variant="ghost" size="sm" rightIcon={<ArrowRight size={14} />}>View Villa</Button>
                  </Link>
                  <Link href="/booking">
                    <Button variant="secondary" size="sm">Book Now</Button>
                  </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <Link href="/rooms">
            <Button variant="secondary" size="lg">
              Explore the Villas
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}