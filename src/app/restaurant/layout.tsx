import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Dining',
  description:
    'Discover private dining at Skyshore with Sri Lankan flavours, fresh seafood and tropical garden settings in Tangalle.',
  path: '/restaurant',
});

export default function RestaurantLayout({ children }: { children: React.ReactNode }) {
  return children;
}
