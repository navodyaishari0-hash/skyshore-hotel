'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import Image from 'next/image';
import { tangalleAttractions } from '@/data/tangalle';

const mapPoints = [
  { name: 'Hotel', category: 'Stay', image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=900&h=700&fit=crop', left: '58%', top: '54%' },
  { name: 'Tangalle Beach', category: 'Beach', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&h=700&fit=crop', left: '70%', top: '36%' },
  { name: 'Goyambokka Beach', category: 'Beach', image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=900&h=700&fit=crop', left: '52%', top: '24%' },
  { name: 'Rekawa', category: 'Wildlife', image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=900&h=700&fit=crop', left: '28%', top: '58%' },
  { name: 'Hummanaya', category: 'Nature', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&h=700&fit=crop', left: '18%', top: '38%' },
  { name: 'Mulkirigala', category: 'Culture', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=900&h=700&fit=crop', left: '80%', top: '62%' },
  { name: 'Kalametiya', category: 'Wildlife', image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=900&h=700&fit=crop', left: '36%', top: '18%' },
  { name: 'Hiriketiya', category: 'Surf', image: 'https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=900&h=700&fit=crop', left: '74%', top: '18%' },
];

export default function TangalleMapSection() {
  const attractionLookup = useMemo(
    () => Object.fromEntries(tangalleAttractions.map((item) => [item.name, item])),
    [],
  );

  const [selected, setSelected] = useState(mapPoints[0]);
  const details = attractionLookup[selected.name] ?? tangalleAttractions[0];

  return (
    <section className="bg-secondary py-20 text-ivory md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#D7C49A]">Explore Around Us</p>
            <h2 className="font-playfair text-4xl font-medium md:text-5xl">Discover the southern coast from Skyshore</h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
            A quiet stay in Tangalle opens the door to beaches, wildlife, heritage and coastal experiences shaped by the rhythm of southern Sri Lanka.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.5fr_0.9fr]">
          <div className="relative h-[440px] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_center,_rgba(94,147,127,0.35),_rgba(12,26,22,0.95)_58%,_rgba(8,17,15,1)_100%)] shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '46px 46px' }} />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#081712] to-transparent" />

            {mapPoints.map((point) => (
              <button
                key={point.name}
                type="button"
                onClick={() => setSelected(point)}
                className={`group absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${selected.name === point.name ? 'scale-110' : 'scale-100'}`}
                style={{ left: point.left, top: point.top }}
              >
                <span className={`flex h-4 w-4 items-center justify-center rounded-full border ${selected.name === point.name ? 'border-[#D7C49A] bg-[#D7C49A]' : 'border-white bg-[#7BA392]'}`} />
                <span className="sr-only">{point.name}</span>
              </button>
            ))}

            <div className="absolute bottom-6 left-6 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-white/75 backdrop-blur-xl">
              Tangalle • Southern Sri Lanka
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-md">
            <div className="relative mb-5 h-44 overflow-hidden rounded-2xl">
              <Image
                src={selected.image}
                alt={selected.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1c18]/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 inline-flex rounded-full border border-white/30 bg-black/20 px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] text-white/80">
                {selected.category}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#D7C49A]">
                <MapPin className="h-4 w-4" />
                <span className="text-[10px] uppercase tracking-[0.2em]">{selected.name}</span>
              </div>

              <h3 className="font-playfair text-3xl font-medium text-white">{selected.name}</h3>
              <p className="text-sm leading-relaxed text-white/70">{details.description}</p>

              <div className="grid grid-cols-2 gap-3 border-y border-white/10 py-3 text-sm text-white/75">
                <div>
                  <p className="mb-1 text-[10px] uppercase tracking-[0.18em] text-white/40">Distance</p>
                  <p>{details.distance ?? 'Available on request'}</p>
                </div>
                <div>
                  <p className="mb-1 text-[10px] uppercase tracking-[0.18em] text-white/40">Travel time</p>
                  <p>{details.travelTime ?? 'On request'}</p>
                </div>
              </div>

              <a
                href={details.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-[#D7C49A] px-4 py-2 text-sm font-semibold text-[#18392F] transition-colors hover:bg-[#E8D4A0]"
              >
                Get Directions <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
