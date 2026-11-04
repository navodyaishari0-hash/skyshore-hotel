import type { Metadata } from 'next';
import { canonicalUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Guest Sign In',
  description:
    'Demo sign-in for the Skyshore website. Login is simulated in the browser and no real account is created.',
  alternates: {
    canonical: canonicalUrl('/login'),
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
