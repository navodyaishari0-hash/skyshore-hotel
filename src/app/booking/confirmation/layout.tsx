import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Stay Request Received',
  description:
    'Your Skyshore stay request has been recorded in this browser session. The host will confirm availability, rates and payment.',
  path: '/booking/confirmation',
});

export default function BookingConfirmationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
