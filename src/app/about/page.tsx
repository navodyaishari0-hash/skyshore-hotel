'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Crown,
  Leaf,
  Lightbulb,
  Heart,
  Award,
  Calendar,
  Users,
  Star,
  MapPin,
  MessageCircle,
  Link2,
  Camera,
  Trophy,
  Gem,
  Globe,
  Target,
} from 'lucide-react';
import { teamMembers } from '@/data';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import type { TeamMember } from '@/types';

const timeline = [
  { year: '2016', title: 'Founded', description: 'Skyshore opens its doors amid the misty highlands of Sri Lanka.' },
  { year: '2019', title: 'Kabana Expansion', description: 'Two exclusive nature kabanas — The Woods & The Creek — are completed.' },
  { year: '2021', title: 'Sustainability Award', description: 'Recognized for regenerative eco-luxury and rainforest guardianship.' },
  { year: '2023', title: 'Guest Kitchen', description: 'The guest kitchen opens for guests who prefer to cook their own meals.' },
  { year: '2024', title: 'AI Concierge', description: 'Launch of a private, AI-powered concierge for every stay.' },
  { year: '2026', title: 'The Serendib Way', description: 'A model of slow, intimate luxury — two kabanas, one unforgettable island.' },
];

const awards = [
  { year: '2024', title: 'Best Private Villa', org: 'World Travel Awards' },
  { year: '2023', title: 'Sustainable Hideaway', org: 'Green Globe' },
  { year: '2023', title: 'Intimate Escapes', org: 'Condé Nast Traveler' },
  { year: '2022', title: 'Island Retreat of the Year', org: 'Travel + Leisure' },
  { year: '2021', title: 'Guardians of the Highlands', org: 'Rainforest Alliance' },
  { year: '2021', title: 'Excellence in Service', org: 'Forbes Travel Guide' },
  { year: '2020', title: 'Hidden Gem of Serendib', org: 'Lonely Planet' },
];

const values = [
  { icon: Crown, title: 'Intimate Luxury', description: 'Just two kabanas — every detail curated for total privacy and stillness.' },
  { icon: Leaf, title: 'Regenerative Living', description: 'Rainforest guardianship, local produce, and zero-waste practices.' },
  { icon: Lightbulb, title: 'Unhurried Innovation', description: 'Private AI concierge and seamless service that fades into the background.' },
  { icon: Heart, title: 'Sri Lankan Warmth', description: 'Genuine hospitality that turns a stay into family.' },
];

const stats = [
  { value: 10, suffix: '+', label: 'Years of Excellence' },
  { value: 98, suffix: '%', label: 'Guest Satisfaction' },
  { value: 2, suffix: '', label: 'Exclusive Nature Kabanas' },
  { value: 120, suffix: '+', label: 'Five-Star Guest Reviews' },
];

const socialIcons: Record<string, React.ElementType> = { twitter: MessageCircle, linkedin: Link2, instagram: Camera };

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const } }),
};

export default function AboutPage() {
  const [activeTimeline, setActiveTimeline] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(timelineRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveTimeline((prev) => {
        if (prev >= timeline.length - 1) { clearInterval(interval); return prev; }
        return prev + 1;
      });
    }, 400);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <main className="bg-cream">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1920&h=800&fit=crop)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-luxury/60 via-luxury/40 to-luxury/80" />
        <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-primary font-medium tracking-[0.3em] uppercase text-sm mb-4">Est. 2016</p>
            <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-4">Our Story</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4"
          >
            The Beginning
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-playfair text-4xl md:text-5xl font-bold text-luxury mb-8"
          >
            A Legacy of Excellence
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 text-lg leading-relaxed mb-6"
          >
            In 2016, tucked into the misty highlands of Sri Lanka — the island of old-world Serendib — Villa
            Serendib was born from a singular vision: to offer two guests-at-a-time a sanctuary where
            rainforest and luxury exist in perfect harmony. What began as a single hand-built dwelling by our
            founding hosts has grown into a pair of exclusive nature kabanas — The Woods and The Creek —
            sharing one horizon over the jungle canopy.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-600 text-lg leading-relaxed"
          >
            Today, Skyshore stands as a beacon of unhurried hospitality — a place where every sunrise
            promises wonder, every guest becomes part of our extended family, and every stay moves at
            your own pace. There is no restaurant, no grand spa and no crowds — only the guest kitchen
            for cooking your own meals, your private deck and the sounds of the forest. Through a decade of
            quiet pursuit of perfection, our heart remains as warm as it was on day one.
          </motion.p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4">Our Journey</p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white">Milestones</h2>
          </div>
          <div ref={timelineRef} className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 hidden md:block" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className={`flex flex-col md:flex-row items-center gap-4 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div
                      className={`inline-block p-6 rounded-xl transition-all duration-500 ${
                        i <= activeTimeline
                          ? 'bg-white/10 border border-primary/30 opacity-100'
                          : 'bg-white/5 border border-white/5 opacity-40'
                      }`}
                    >
                      <span className="text-primary font-bold text-2xl">{item.year}</span>
                      <h3 className="text-white font-semibold text-lg mt-1">{item.title}</h3>
                      <p className="text-white/60 text-sm mt-1">{item.description}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-primary border-4 border-secondary z-10 hidden md:block shrink-0" />
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4">Our People</p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-luxury">Meet the Team</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member: TeamMember, i: number) => (
              <motion.div
                key={member.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden luxury-card group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-playfair text-xl font-bold">{member.name}</h3>
                    <p className="text-primary text-sm font-medium">{member.role}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.bio}</p>
                  <div className="flex gap-3">
                    {Object.entries(member.social).map(([platform, url]) => {
                      const Icon = socialIcons[platform];
                      if (!Icon || !url) return null;
                      return (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-luxury transition-all duration-300"
                        >
                          <Icon className="w-4 h-4" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-20 px-4 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4">Recognition</p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white">Awards & Honors</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((award, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:border-primary/40 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/25 transition-colors">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <p className="text-primary font-bold text-lg">{award.year}</p>
                <h3 className="text-white font-semibold mt-1 text-sm">{award.title}</h3>
                <p className="text-white/50 text-xs mt-2">{award.org}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4">Our Philosophy</p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-luxury">Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-5 group-hover:from-primary group-hover:to-accent transition-all duration-500">
                    <Icon className="w-8 h-8 text-primary group-hover:text-luxury transition-colors duration-500" />
                  </div>
                  <h3 className="font-playfair text-xl font-bold text-luxury mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 bg-gradient-to-br from-luxury to-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-2">
                  <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-white/70 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
