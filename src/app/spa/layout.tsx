import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Spa & Wellness',
  description:
    'Unwind with spa and wellness rituals at Skyshore, a private villa retreat in Tangalle, Sri Lanka.',
  path: '/spa',
});

export default function SpaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
