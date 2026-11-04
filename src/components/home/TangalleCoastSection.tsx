import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function TangalleCoastSection() {
  return (
    <section className="relative overflow-hidden bg-[#EAE3D6] py-20 md:py-28">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-85"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&h=1200&fit=crop')",
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,24,18,0.8)_0%,rgba(14,24,18,0.35)_50%,rgba(14,24,18,0.8)_100%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl rounded-[2rem] border border-white/10 bg-black/12 p-8 backdrop-blur-sm md:p-10">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#D7C49A]">Southern Coast</p>
          <h2 className="font-playfair text-4xl font-medium text-white md:text-5xl">
            Where tropical living meets the Southern Coast.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/75">
            Wake to coconut palms, golden beaches and warm ocean light. Drift between quiet mornings by the pool, slow afternoons in the garden, and evenings shaped by sunset, sea air and island calm.
          </p>

          <div className="mt-8">
            <Link
              href="/discover-tangalle"
              className="inline-flex items-center gap-3 rounded-full bg-[#D7C49A] px-6 py-3 text-sm font-semibold text-[#18392F] transition-colors hover:bg-[#E8D4A0]"
            >
              Discover Tangalle <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
