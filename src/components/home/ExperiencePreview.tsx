'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { tangalleExperiences } from '@/data/tangalle';

const previewExperiences = tangalleExperiences.filter((experience) => experience.enabled);

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

export default function ExperiencePreview() {
  return (
    <section className="bg-ivory py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Experiences from Skyshore"
          subtitle="Slow days by the coast, turtle walks, nature escapes and beachside moments shaped by Tangalle."
          centered
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {previewExperiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="group relative overflow-hidden"
            >
              <div className="relative h-72 overflow-hidden sm:h-80">
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="mb-2 inline-block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#E0CEA7]">
                    {exp.category}
                  </span>
                  <h3 className="mb-2 font-playfair text-xl font-medium text-white">
                    {exp.title}
                  </h3>
                  <span className="inline-flex items-center gap-2 text-xs text-white/75">Explore possibilities <ArrowRight size={14} /></span>
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
          <Link href="/experiences" className="inline-flex min-h-12 items-center gap-3 bg-secondary px-6 py-3 text-sm font-semibold text-ivory transition-colors hover:bg-forest">
            Ask our concierge <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}