import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Our Story',
  description:
    'Discover the story, design and island hospitality behind Skyshore, a private villa retreat in Tangalle, Sri Lanka.',
  path: '/about',
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
