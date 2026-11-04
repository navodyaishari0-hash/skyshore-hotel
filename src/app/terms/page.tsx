import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Terms & Conditions',
  description:
    'Terms for using the Skyshore demo website, including booking requests, payments and limitations.',
  path: '/terms',
});

const sections = [
  {
    heading: 'Demo website',
    body: 'This website is a static presentation of Skyshore. It is provided for information and demonstration purposes. Features such as sign-in, dashboards, booking records and the AI concierge are simulated in the browser.',
  },
  {
    heading: 'Booking requests',
    body: 'A completed booking form is a stay request recorded only in your browser. It is not a confirmed reservation. Availability, villa allocation, rates, taxes and cancellation terms must be confirmed directly with the host.',
  },
  {
    heading: 'Rates and availability',
    body: 'Any prices, room names or availability shown on this demo are illustrative and may not reflect current rates. Always confirm the final price and conditions with the host before travelling.',
  },
  {
    heading: 'Payments',
    body: 'This website does not process payments and does not collect card details. Payment arrangements, deposits and refunds are handled directly with the host through an agreed method.',
  },
  {
    heading: 'Acceptable use',
    body: 'Do not attempt to misuse the site, submit unlawful content, or enter sensitive personal data into demo forms. Do not rely on this demo for emergency, medical or time-critical communication.',
  },
  {
    heading: 'Limitation of liability',
    body: 'The site is provided “as is” without warranties. To the extent permitted by law, Skyshore is not liable for losses arising from reliance on demo content, unavailable features or third-party services.',
  },
  {
    heading: 'Governing law',
    body: 'These terms are governed by the laws of Sri Lanka. Any dispute relating to a real stay is subject to the booking terms agreed with the host.',
  },
  {
    heading: 'Contact',
    body: 'Questions about these terms can be sent to dishanrandika0@gmail.com or +94 77 396 4515.',
  },
];

export default function TermsPage() {
  return (
    <main className="bg-cream pb-20 pt-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          Legal
        </p>
        <h1 className="mt-3 font-playfair text-4xl font-bold text-luxury">
          Terms &amp; Conditions
        </h1>
        <p className="mt-4 text-sm leading-7 text-gray-500">
          Last updated: 2 November 2026.
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
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
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
