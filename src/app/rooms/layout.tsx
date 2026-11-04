import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Villas & Rooms',
  description:
    'Explore the private nature kabanas at Skyshore in Tangalle, Sri Lanka, with jungle, creek and garden views.',
  path: '/rooms',
});

export default function RoomsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
