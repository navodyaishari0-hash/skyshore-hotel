'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  Landmark,
  ChevronRight,
  Compass,
  TreePine,
  Waves,
  Ticket,
  ShieldCheck,
  Smartphone,
  Sun,
} from 'lucide-react';
import Badge from '@/components/ui/Badge';
import SectionHeader from '@/components/ui/SectionHeader';

const filterCategories = ['All', 'Beaches', 'Nature', 'Wildlife', 'Culture', 'Tea Country'] as const;
type FilterCategory = (typeof filterCategories)[number];

const experiences = [
  {
    name: 'Sri Lankan beaches',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    category: 'Beaches',
    description: 'Interested in a day by the sea? Ask the host which coastal destinations are practical from the property and how long the journey takes.',
  },
  {
    name: 'Local food & culture',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop',
    category: 'Culture',
    description: 'Discover Sri Lankan flavours and local traditions. Ask what cultural visits or food experiences can be arranged during your dates.',
  },
  {
    name: 'Waterfalls & nature',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
    category: 'Nature',
    description: 'Ask the host about nature spots, seasonal conditions and journey times before planning a day out.',
  },
  {
    name: 'Temples & heritage',
    image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&h=600&fit=crop',
    category: 'Culture',
    description: 'Interested in temples or historical places? Contact the host to check which locations are accessible from the property.',
  },
  {
    name: 'Wildlife & birdlife',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop',
    category: 'Wildlife',
    description: 'Ask about wildlife experiences, conservation rules and current travel options before making plans.',
  },
  {
    name: 'Tea country',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    category: 'Tea Country',
    description: 'Ask whether tea estates or gardens are within reach of the property and confirm journey time with the host.',
  },
  {
    name: 'Village life',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
    category: 'Culture',
    description: 'Ask the host about respectful ways to discover local communities and everyday island life.',
  },
];

const localAttractions = [
  { icon: Landmark, title: 'Heritage', description: 'Ask which cultural and historical sites are accessible from the property.' },
  { icon: TreePine, title: 'Nature', description: 'Check local trail access, conditions and guiding options with the host.' },
  { icon: Waves, title: 'Water', description: 'Ask about nearby coast, rivers or waterfalls and current conditions.' },
  { icon: Compass, title: 'Local life', description: 'Discuss markets and community visits with the host before setting out.' },
];

const travelTips = [
  { icon: Sun, title: 'Seasonal conditions', text: 'Weather and access vary by region. Confirm current conditions before travelling.' },
  { icon: ShieldCheck, title: 'Travel details', text: 'Confirm transport, accessibility and any guide arrangements with the host.' },
  { icon: Smartphone, title: 'Ask ahead', text: 'Share your interests and dates so the host can check what is currently possible.' },
  { icon: Ticket, title: 'Costs & tickets', text: 'Entry fees and tour costs vary. Confirm details before making plans.' },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const } }),
};

export default function ExperiencesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');

  const filtered = activeFilter === 'All' ? experiences : experiences.filter((e) => e.category === activeFilter);

  return (
    <main className="bg-cream">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1920&h=800&fit=crop)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-luxury/60 via-luxury/40 to-luxury/80" />
        <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-primary font-medium tracking-[0.3em] uppercase text-sm mb-4">Discover & Explore</p>
            <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-4">Experience Sri Lanka</h1>
            <p className="text-cream/80 text-lg max-w-2xl mx-auto mt-4">
              Find inspiration for your stay, then confirm destinations and arrangements with your host.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-6" />
          </motion.div>
        </div>
      </section>

      {/* Experiences */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Ideas for island days"
            subtitle="These are destination themes, not confirmed hotel tours. Ask the host about distance, travel time, cost and availability."
            centered
          />

          {/* Filters */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white rounded-full p-1.5 gap-1 shadow-sm border border-gray-100 flex-wrap justify-center">
              {filterCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className="relative px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 cursor-pointer"
                >
                  {activeFilter === cat && (
                    <motion.div
                      layoutId="expTab"
                      className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full"
                      transition={{ type: 'spring' as const, stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 ${activeFilter === cat ? 'text-luxury' : 'text-gray-500'}`}>
                    {cat}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.map((exp, i) => (
                <motion.div
                  key={exp.name}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="bg-white rounded-2xl overflow-hidden luxury-card group"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image src={exp.image} alt={exp.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury/70 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge variant="gold">{exp.category}</Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-playfair text-xl font-bold text-luxury group-hover:text-primary transition-colors">
                        {exp.name}
                      </h3>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{exp.description}</p>
                    <p className="mb-4 text-xs text-gray-500">Distance, travel time and arrangements: confirm with host</p>
                    <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:text-primary-dark">
                      Ask about this experience <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Local Attractions */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Local Attractions"
            subtitle="Explore the wonders that surround our resort"
            centered
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {localAttractions.map((a, i) => {
              const Icon = a.icon;
              return (
                <motion.div
                  key={a.title}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="bg-cream rounded-2xl p-6 text-center group hover:bg-gradient-to-br hover:from-primary/5 hover:to-accent/5 border border-transparent hover:border-primary/20 transition-all duration-500"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4 group-hover:from-primary group-hover:to-accent transition-all duration-500">
                    <Icon className="w-7 h-7 text-primary group-hover:text-luxury transition-colors duration-500" />
                  </div>
                  <h3 className="font-playfair text-lg font-bold text-luxury mb-2">{a.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{a.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Travel Tips */}
      <section className="py-20 px-4 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="Travel Tips" subtitle="Make the most of your stay with our expert advice" centered light />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {travelTips.map((tip, i) => {
              const Icon = tip.icon;
              return (
                <motion.div
                  key={tip.title}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center mb-4 group-hover:bg-primary/25 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-playfair text-lg font-bold text-white mb-2">{tip.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{tip.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
