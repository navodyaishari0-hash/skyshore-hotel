import type { Metadata } from 'next';
import AccountShell from '@/components/dashboard/AccountShell';
import { canonicalUrl } from '@/lib/site';

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

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <AccountShell>{children}</AccountShell>;
}
