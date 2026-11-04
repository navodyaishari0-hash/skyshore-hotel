import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield, Sparkles } from 'lucide-react';

export const dynamicParams = false;

const sections: Record<string, { name: string; description: string }> = {
  bookings: {
    name: 'Bookings',
    description: 'Review stay requests, confirmations and cancellations.',
  },
  rooms: {
    name: 'Rooms',
    description: 'Manage villa inventory, rates and availability.',
  },
  guests: {
    name: 'Guests',
    description: 'Guest profiles, stay history and preferences.',
  },
  staff: {
    name: 'Staff',
    description: 'Team members, roles and schedules.',
  },
  restaurant: {
    name: 'Restaurant',
    description: 'Dining reservations, menus and service notes.',
  },
  spa: {
    name: 'Spa',
    description: 'Wellness appointments and treatment catalogue.',
  },
  events: {
    name: 'Events',
    description: 'Private celebrations and event enquiries.',
  },
  payments: {
    name: 'Payments',
    description: 'Invoices, deposits and settlement records.',
  },
  coupons: {
    name: 'Coupons',
    description: 'Promotional codes and seasonal offers.',
  },
  reviews: {
    name: 'Reviews',
    description: 'Guest feedback and moderation queue.',
  },
  gallery: {
    name: 'Gallery',
    description: 'Photography library used across the website.',
  },
  blog: {
    name: 'Blog',
    description: 'Editorial stories and destination guides.',
  },
  notifications: {
    name: 'Notifications',
    description: 'Operational alerts and guest messages.',
  },
  reports: {
    name: 'Reports',
    description: 'Occupancy, revenue and performance reports.',
  },
  analytics: {
    name: 'Analytics',
    description: 'Traffic, conversion and booking analytics.',
  },
  settings: {
    name: 'Settings',
    description: 'Property details, taxes and account preferences.',
  },
};

export function generateStaticParams() {
  return Object.keys(sections).map((section) => ({ section }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  const meta = sections[section];

  if (!meta) {
    return {
      title: 'Admin Section',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${meta.name} | Admin Demo`,
    description: `${meta.description} Static demo section for the Skyshore admin dashboard.`,
    robots: { index: false, follow: false },
  };
}

export default async function AdminSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const meta = sections[section] ?? {
    name: 'Admin Section',
    description: 'Demo section of the Skyshore admin dashboard.',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 text-sm text-gray-500">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-primary font-medium hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>
        <span className="text-gray-300">/</span>
        <span>{meta.name}</span>
      </div>

      <header>
        <h1 className="font-playfair text-3xl font-bold text-luxury">{meta.name}</h1>
        <p className="mt-1 text-sm text-gray-500">{meta.description}</p>
      </header>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <div className="flex items-start gap-3">
          <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <div>
            <h2 className="font-semibold text-amber-900">Static demo section</h2>
            <p className="mt-1 text-sm leading-6 text-amber-800">
              This page keeps the admin navigation intact on the free static
              GitHub Pages build. Live records, editing and data changes need a
              backend and database, which are not included in this deployment.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {['Overview', 'Recent activity', 'Pending actions'].map((card) => (
          <div
            key={card}
            className="rounded-2xl border border-gray-100 bg-white p-6"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Shield className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-luxury">{card}</h3>
            <p className="mt-1 text-sm leading-6 text-gray-500">
              Sample content placeholder. Connect a backend to populate this
              panel with real data.
            </p>
            <div className="mt-4 space-y-2">
              <div className="h-2 w-4/5 rounded-full bg-cream" />
              <div className="h-2 w-3/5 rounded-full bg-cream" />
              <div className="h-2 w-2/3 rounded-full bg-cream" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
