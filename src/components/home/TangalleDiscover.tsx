import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { tangalleAttractions } from '@/data/tangalle';

export default function TangalleDiscover() {
  return (
    <section className="bg-[#F8F4EC] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary-dark">Discover Tangalle</p>
            <h2 className="max-w-2xl font-playfair text-4xl font-medium text-luxury md:text-5xl">
              Beaches, wildlife and culture just beyond your villa.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-gray-500">
            Be surrounded by the colours, food and rhythm of southern Sri Lanka - from quiet beaches to wildlife, heritage and hidden coastal gems.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {tangalleAttractions.map((place) => (
            <div
              key={place.name}
              className="group overflow-hidden rounded-3xl border border-[#E7E1D5] bg-white shadow-[0_18px_44px_rgba(32,35,31,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_22px_52px_rgba(32,35,31,0.12)]"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={place.image}
                  alt={place.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1d18]/80 via-[#0f1d18]/20 to-transparent" />
                <div className="absolute left-4 top-4 inline-flex rounded-full border border-white/40 bg-black/15 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-white">
                  {place.category}
                </div>
              </div>

              <div className="space-y-4 p-5">
                <div>
                  <h3 className="font-playfair text-2xl font-medium text-luxury">{place.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">{place.description}</p>
                </div>

                <div className="flex items-center justify-between border-t border-[#E9E4DA] pt-4 text-xs text-gray-500">
                  <span>{place.distance ?? 'Distance available on request'}</span>
                  <span>{place.travelTime ?? 'Travel time available on request'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/discover-tangalle"
            className="inline-flex items-center gap-3 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-ivory transition-colors hover:bg-forest"
          >
            Explore the full guide <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
