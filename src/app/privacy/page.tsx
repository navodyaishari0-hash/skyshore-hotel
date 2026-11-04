import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Privacy Policy',
  description:
    'How the Skyshore demo website handles information, browser storage and booking enquiries.',
  path: '/privacy',
});

const sections = [
  {
    heading: 'About this website',
    body: 'This is a static demonstration website for Skyshore in Tangalle, Sri Lanka. It is hosted on GitHub Pages and does not include a backend, database, payment processor or live booking system.',
  },
  {
    heading: 'Information you enter',
    body: 'Booking, dining, spa and contact forms on this site run entirely in your browser. Submitting a form does not send your details to the host or to any third party, and no reservation or message is created.',
  },
  {
    heading: 'Browser storage',
    body: 'Demo preferences and sample bookings may be saved in your browser localStorage so the interface behaves consistently between pages. This data stays on your device and can be cleared at any time through your browser settings.',
  },
  {
    heading: 'Sensitive information',
    body: 'Do not enter real passwords, payment card numbers, passport details or other sensitive guest information into this demo. No payment is collected by this website.',
  },
  {
    heading: 'Third-party content',
    body: 'Some photography and fonts are loaded from third-party services. Those providers may receive standard technical information such as your IP address when your browser requests those files.',
  },
  {
    heading: 'Contact',
    body: 'For a real booking, rate enquiry or privacy question, please contact the host directly by phone or WhatsApp at +94 77 396 4515, or by email at dishanrandika0@gmail.com.',
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-cream pb-20 pt-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          Legal
        </p>
        <h1 className="mt-3 font-playfair text-4xl font-bold text-luxury">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm leading-7 text-gray-500">
          Last updated: 2 November 2026. This policy describes the static demo
          website only.
        </p>

        <div className="mt-10 space-y-8 rounded-2xl border border-gray-100 bg-white p-6 sm:p-8">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-playfair text-xl font-semibold text-luxury">
                {section.heading}
              </h2>
              <p className="mt-2 text-sm leading-7 text-gray-600">{section.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <Link href="/terms" className="text-primary hover:underline">
            Terms &amp; Conditions
          </Link>
          <Link href="/contact" className="text-primary hover:underline">
            Contact the host
          </Link>
          <Link href="/" className="text-gray-500 hover:text-primary">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
