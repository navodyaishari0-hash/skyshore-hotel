'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MessageCircle, Phone } from 'lucide-react';
import Button from '@/components/ui/Button';

const WHATSAPP_NUMBER = '94773964515';

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1920&h=900&fit=crop"
          alt="Tropical greenery around a Sri Lankan villa retreat"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-luxury/90 via-luxury/70 to-luxury/90" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mx-auto mb-8 h-px w-24 origin-center bg-gradient-to-r from-transparent via-primary to-transparent"
          />

          <h2 className="mb-6 text-3xl font-bold font-playfair text-cream md:text-5xl lg:text-6xl">
            Your Private Escape{' '}
            <span className="text-gradient-gold">Awaits</span>
          </h2>

          <p className="mx-auto mb-10 max-w-2xl text-base text-cream/60 md:text-lg">
            A private villa escape, shaped by the island.
            Send your dates and the host will confirm the details.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/booking">
              <Button
                variant="primary"
                size="lg"
                className="min-w-[200px]"
              >
                Book Your Stay
              </Button>
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                'Hello Skyshore, I would like to inquire about availability.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="glass"
                size="lg"
                leftIcon={<MessageCircle className="h-4 w-4" />}
                className="min-w-[200px] border border-primary/30 text-primary"
              >
                WhatsApp Us
              </Button>
            </a>
          </div>

          <p className="mt-6 flex items-center justify-center gap-2 text-sm text-cream/50">
            <Phone className="h-4 w-4" />
            +94 77 396 4515 · dishanrandika0@gmail.com
          </p>
        </motion.div>
      </div>
    </section>
  );
}