import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Gallery',
  description:
    'Browse the Skyshore gallery of villas, tropical gardens, the guest kitchen and coastal moments in Tangalle, Sri Lanka.',
  path: '/gallery',
});

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
