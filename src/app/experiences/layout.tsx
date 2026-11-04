import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Experiences',
  description:
    'Explore curated experiences around Tangalle — beaches, wildlife, culture, local food and slow island days at Skyshore.',
  path: '/experiences',
});

export default function ExperiencesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
