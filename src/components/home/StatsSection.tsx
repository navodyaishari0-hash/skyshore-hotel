'use client';

import { motion } from 'framer-motion';
import { TreePine, Users, Heart, CalendarDays } from 'lucide-react';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

const stats = [
  {
    icon: TreePine,
    value: 2,
    suffix: '',
    label: 'Private Kabanas',
  },
  {
    icon: Users,
    value: 4,
    suffix: '',
    label: 'Guests Per Stay',
  },
  {
    icon: Heart,
    value: 512,
    suffix: '+',
    label: 'Happy Guests',
  },
  {
    icon: CalendarDays,
    value: 100,
    suffix: '%',
    label: 'Private Experience',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-secondary py-20 md:py-28">
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(200,169,81,0.4) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold font-playfair text-cream md:text-4xl">
            A Sanctuary of <span className="text-gradient-gold">Privacy</span>
          </h2>
          <p className="mt-3 text-base text-cream/50">
            Intimacy is our greatest luxury — the entire villa is yours alone.
          </p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/40" />
            <div className="h-2 w-2 rotate-45 bg-primary" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/40" />
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="relative text-center"
            >
              {i > 0 && (
                <div className="absolute left-0 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-primary/30 to-transparent md:block" />
              )}

              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                <stat.icon className="h-7 w-7 text-primary" />
              </div>

              <p className="mb-1 text-4xl font-bold font-playfair text-primary md:text-5xl">
                <AnimatedCounter to={stat.value} suffix={stat.suffix} duration={2.5} />
              </p>
              <p className="text-sm font-medium uppercase tracking-wider text-cream/50">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}