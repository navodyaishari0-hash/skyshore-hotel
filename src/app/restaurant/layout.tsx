import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Kitchen & Self-Catering',
  description:
    'Skyshore does not run a restaurant or serve meals. Guests have use of a kitchen to cook their own meals during their stay in Tangalle.',
  path: '/restaurant',
});

export default function RestaurantLayout({ children }: { children: React.ReactNode }) {
  return children;
}
