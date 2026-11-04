'use client';

import { useState } from 'react';
import { ArrowRight, MessageSquareText, Sparkles } from 'lucide-react';

const quickActions = [
  'Explore Beaches',
  'Turtle Watching',
  'Surfing',
  'Nature & Wildlife',
  'Culture',
  'Sri Lankan Food',
  'Transport',
  'Nearby Attractions',
];

const responses: Record<string, string> = {
  'Explore Beaches': 'Tangalle offers quiet stretches of sand, palm-lined coastlines and striking sunsets. Popular nearby options include Tangalle Beach and Goyambokka Beach.',
  'Turtle Watching': 'Rekawa is one of the best places to look for turtle activity along the southern coast, especially during evening shoreline walks.',
  'Surfing': 'The south coast is known for surf-friendly beach breaks and relaxed coastal charm, with nearby points popular among visitors.',
  'Nature & Wildlife': 'From lagoons and wetlands to coastal wildlife and scenic viewpoints, the southern coast is ideal for slow nature experiences.',
  Culture: 'Mulkirigala Rock Temple and other heritage sites offer a glimpse into Sri Lanka’s cultural and spiritual landscape.',
  'Sri Lankan Food': 'Look for fresh seafood, curries, hoppers, coconut sambol and tropical fruit at local coastal restaurants and village eateries.',
  Transport: 'Airport transfers, private cars and local transport can be arranged in coordination with the host and concierge team.',
  'Nearby Attractions': 'Tangalle is close to beaches, turtle spots, temple visits and wildlife areas that work beautifully for day trips and slow travel.',
};

export default function ConciergeDemo() {
  const [active, setActive] = useState('Explore Beaches');

  return (
    <section className="bg-[#F4F1EA] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-[#E7E1D5] bg-white p-6 shadow-[0_18px_50px_rgba(26,38,31,0.06)] md:p-10">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary-dark">AI Concierge</p>
              <h2 className="font-playfair text-4xl font-medium text-luxury md:text-5xl">Plan your Tangalle stay with local insight</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F4EAD1] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#4B3D20]">
              <Sparkles className="h-3.5 w-3.5" />
              Demo UI ready for API integration
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-3">
              {quickActions.map((action) => (
                <button
                  key={action}
                  type="button"
                  onClick={() => setActive(action)}
                  className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-medium transition-all ${
                    active === action
                      ? 'border-[#C9AE6A] bg-[#F7F0DF] text-luxury shadow-[0_12px_28px_rgba(200,174,106,0.14)]'
                      : 'border-[#E9E3D8] bg-[#F9F7F3] text-gray-600 hover:border-[#D6C19A] hover:bg-[#FBF8F1]'
                  }`}
                >
                  <span>{action}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              ))}
            </div>

            <div className="rounded-[1.5rem] bg-[#18392F] p-6 text-ivory shadow-[0_18px_50px_rgba(24,57,47,0.26)]">
              <div className="mb-5 flex items-center gap-3 text-[#D7C49A]">
                <MessageSquareText className="h-5 w-5" />
                <span className="text-[10px] uppercase tracking-[0.2em]">Concierge answer</span>
              </div>

              <h3 className="mb-3 font-playfair text-3xl font-medium">{active}</h3>
              <p className="text-base leading-relaxed text-white/75">{responses[active]}</p>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                This interface is structured for future API integration while giving guests a rich local planning experience today.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
