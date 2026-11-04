import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Plan Your Stay',
  description:
    'Plan a stay request at Skyshore in Tangalle, Sri Lanka. Send your dates and the host will confirm availability and rates.',
  path: '/booking',
});

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
