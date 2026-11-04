import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Compass, Sparkles } from 'lucide-react';
import { tangalleAttractions, tasteSriLanka } from '@/data/tangalle';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Discover Tangalle',
  description:
    'Explore Tangalle, Sri Lanka through beaches, wildlife, local food and coastal discovery moments.',
  path: '/discover-tangalle',
});

export default function DiscoverTangallePage() {
  return (
    <main className="bg-[#F8F4EC] pb-20 pt-28 text-luxury">
      <section className="relative overflow-hidden bg-[#18392F] text-ivory">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&h=1200&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,20,18,0.8),rgba(10,20,18,0.55),rgba(10,20,18,0.8))]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
          <div className="max-w-3xl">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#D7C49A]">A private tropical escape</p>
            <h1 className="font-playfair text-5xl font-medium md:text-7xl">Discover Tangalle, Sri Lanka.</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/75">
              A slower, softer kind of luxury where private villas, warm ocean air and the southern coast create the rhythm of a truly restorative stay.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/booking" className="inline-flex items-center gap-3 rounded-full bg-[#D7C49A] px-6 py-3 text-sm font-semibold text-[#18392F] hover:bg-[#E8D4A0]">
                Plan your stay <ArrowRight size={16} />
              </Link>
              <Link href="/" className="inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">
                Back home
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-[1.5rem] border border-[#E7E1D5] bg-white p-6 shadow-[0_18px_42px_rgba(32,35,31,0.05)]">
            <Compass className="mb-4 h-8 w-8 text-[#7B9B8E]" />
            <h2 className="font-playfair text-2xl font-medium">South coast character</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              Tangalle blends quiet beaches, lush greenery and genuine island ease with a sense of privacy and calm.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-[#E7E1D5] bg-white p-6 shadow-[0_18px_42px_rgba(32,35,31,0.05)]">
            <MapPin className="mb-4 h-8 w-8 text-[#7B9B8E]" />
            <h2 className="font-playfair text-2xl font-medium">Beautiful local surroundings</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              The destination is shaped by coastline, stone temples, turtle viewing areas and nearby nature escapes.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-[#E7E1D5] bg-white p-6 shadow-[0_18px_42px_rgba(32,35,31,0.05)]">
            <Sparkles className="mb-4 h-8 w-8 text-[#7B9B8E]" />
            <h2 className="font-playfair text-2xl font-medium">Relaxed luxury</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              Everyday rituals here are slower and more personal—poolside mornings, coastal walks and peaceful evenings.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary-dark">Explore around us</p>
            <h2 className="font-playfair text-4xl font-medium md:text-5xl">Places worth discovering</h2>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {tangalleAttractions.map((place) => (
            <div key={place.name} className="overflow-hidden rounded-[1.5rem] border border-[#E7E1D5] bg-white shadow-[0_18px_42px_rgba(32,35,31,0.04)]">
              <div className="relative h-64">
                <Image src={place.image} alt={place.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1916]/80 to-transparent" />
                <div className="absolute bottom-4 left-4 rounded-full border border-white/30 bg-black/15 px-3 py-1 text-[9px] uppercase tracking-[0.18em] text-white/80">
                  {place.category}
                </div>
              </div>
              <div className="space-y-4 p-5">
                <h3 className="font-playfair text-2xl font-medium">{place.name}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{place.description}</p>
                <div className="flex items-center justify-between border-t border-[#E9E4DA] pt-3 text-xs text-gray-500">
                  <span>{place.distance ?? 'Available on request'}</span>
                  <span>{place.travelTime ?? 'On request'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#18392F] py-16 text-ivory">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#D7C49A]">Flavours of the coast</p>
            <h2 className="font-playfair text-4xl font-medium md:text-5xl">Taste Sri Lanka with every meal</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {tasteSriLanka.map((item) => (
              <div key={item.title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                <div className="relative mb-4 h-52 overflow-hidden rounded-[1.2rem]">
                  <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                </div>
                <h3 className="font-playfair text-2xl font-medium">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
