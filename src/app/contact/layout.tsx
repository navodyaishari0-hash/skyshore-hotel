import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Contact Us',
  description:
    'Contact the Skyshore host in Tangalle, Sri Lanka for villa availability, rates, transfers and stay enquiries.',
  path: '/contact',
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
