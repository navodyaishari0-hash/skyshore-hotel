import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { tasteSriLanka } from '@/data/tangalle';

export default function TasteSriLanka() {
  return (
    <section className="bg-[#18392F] py-20 text-ivory md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#D7C49A]">Taste Sri Lanka</p>
            <h2 className="font-playfair text-4xl font-medium md:text-5xl">Local flavours, cooked your way.</h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-white/70">
            Sri Lankan food is part of the Tangalle experience. With a guest kitchen at Skyshore, you can buy local ingredients and cook island dishes yourself.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {tasteSriLanka.map((item) => (
            <div key={item.title} className="group overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/5">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1915]/85 via-transparent to-transparent" />
              </div>

              <div className="space-y-3 p-5">
                <h3 className="font-playfair text-2xl font-medium text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-white/70">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/restaurant" className="inline-flex items-center gap-3 rounded-full border border-[#D7C49A] px-6 py-3 text-sm font-semibold text-[#D7C49A] transition-colors hover:bg-[#D7C49A] hover:text-[#18392F]">
            See the guest kitchen <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
