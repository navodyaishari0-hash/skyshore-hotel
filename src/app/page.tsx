import type { Metadata } from 'next';
import { canonicalUrl } from '@/lib/site';
import HeroSection from '@/components/home/HeroSection';
import FeaturedRooms from '@/components/home/FeaturedRooms';
import AboutPreview from '@/components/home/AboutPreview';
import PoolExperience from '@/components/home/PoolExperience';
import TangalleDiscover from '@/components/home/TangalleDiscover';
import ExperiencePreview from '@/components/home/ExperiencePreview';
import TangalleCoastSection from '@/components/home/TangalleCoastSection';
import TasteSriLanka from '@/components/home/TasteSriLanka';
import SpecialOffers from '@/components/home/SpecialOffers';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import TangalleMapSection from '@/components/home/TangalleMapSection';
import ConciergeDemo from '@/components/home/ConciergeDemo';
import CTASection from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: {
    absolute: 'Skyshore | A Private Tropical Escape in Tangalle, Sri Lanka',
  },
  description:
    'Discover a private tropical escape in Tangalle, Sri Lanka with villa living, beachside serenity, local culture and warm southern coast hospitality.',
  alternates: {
    canonical: canonicalUrl('/'),
  },
  keywords: [
    'Tangalle Sri Lanka',
    'private tropical escape tangalle',
    'luxury villa sri lanka',
    'private villa sri lanka',
    'kabana sri lanka',
    'nature chalet',
    'boutique villa',
    'secluded tropical escape',
    'sri lanka luxury accommodation',
    'honeymoon villa sri lanka',
  ],
  openGraph: {
    title: 'Skyshore | A Private Tropical Escape in Tangalle, Sri Lanka',
    description:
      'A private tropical escape in Tangalle, Sri Lanka with a warm southern coast setting and modern luxury villas.',
    url: canonicalUrl('/'),
    siteName: 'Skyshore',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1920&h=1080&fit=crop',
        width: 1920,
        height: 1080,
        alt: 'Skyshore villa retreat in Tangalle, Sri Lanka',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutPreview />
      <FeaturedRooms />
      <PoolExperience />
      <TangalleCoastSection />
      <TangalleDiscover />
      <ExperiencePreview />
      <TasteSriLanka />
      <SpecialOffers />
      <TestimonialsSection />
      <TangalleMapSection />
      <ConciergeDemo />
      <CTASection />
    </main>
  );
}