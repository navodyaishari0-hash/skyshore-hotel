import type { Metadata } from 'next';
import AdminShell from '@/components/admin/AdminShell';
import { canonicalUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Admin Demo',
  description:
    'Static, sample-data admin dashboard for the Skyshore luxury hotel website demo.',
  alternates: {
    canonical: canonicalUrl('/admin'),
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
