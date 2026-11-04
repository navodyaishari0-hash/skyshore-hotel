import type { Metadata } from 'next';
import { canonicalUrl } from '@/lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { section: 'bookings' },
    { section: 'wishlist' },
    { section: 'settings' },
    { section: 'loyalty' },
    { section: 'recently-viewed' },
  ];
}

export const metadata: Metadata = {
  title: 'My Account',
  description:
    'View your Skyshore bookings, wishlist and loyalty details in this browser-only demo dashboard.',
  alternates: {
    canonical: canonicalUrl('/account'),
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AccountSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
