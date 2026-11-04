import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Account Help',
    description:
      'Request help with your Skyshore account access and password reset.',
    path: '/auth',
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return children;
}
