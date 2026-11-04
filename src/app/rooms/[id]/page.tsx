import type { Metadata } from 'next';
import { rooms } from '@/data';
import { canonicalUrl, SITE_NAME } from '@/lib/site';
import RoomDetailClient from './RoomDetailClient';

export const dynamicParams = false;

export function generateStaticParams() {
  return rooms.map((room) => ({ id: room.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const room = rooms.find((r) => r.id === id);

  if (!room) {
    return {
      title: 'Villa Not Found',
      robots: { index: false, follow: false },
    };
  }

  const url = canonicalUrl(`/rooms/${room.id}`);
  const title = `${room.name} | ${SITE_NAME}`;

  return {
    title: {
      absolute: title,
    },
    description: room.shortDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description: room.shortDescription,
      url,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: room.images[0],
          width: 1200,
          height: 800,
          alt: room.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: room.shortDescription,
      images: [room.images[0]],
    },
  };
}

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <RoomDetailClient roomId={id} />;
}
