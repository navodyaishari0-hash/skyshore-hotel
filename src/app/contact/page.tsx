'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  ChevronDown,
  MessageSquare,
  HelpCircle,
  Globe,
  MessageCircle,
  Camera,
  Play,
  Loader2,
  CheckCircle,
} from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import Accordion from '@/components/ui/Accordion';

const contactInfo = [
  { icon: MapPin, label: 'Location', value: 'Tangalle, Southern Sri Lanka · exact address shared upon confirmation' },
  { icon: Phone, label: 'Phone', value: '+94 77 396 4515' },
  { icon: Mail, label: 'Email', value: 'dishanrandika0@gmail.com' },
  { icon: Clock, label: 'Guest support', value: 'Contact us to confirm availability' },
];

const subjectOptions = [
  { label: 'General Inquiry', value: 'general' },
  { label: 'Villa stay', value: 'reservation' },
  { label: 'Dining enquiry', value: 'dining' },
  { label: 'Experiences & tours', value: 'experiences' },
  { label: 'Partnership', value: 'partnership' },
  { label: 'Feedback', value: 'feedback' },
  { label: 'Press & Media', value: 'press' },
];

const faqItems = [
  { title: 'What are the check-in and check-out times?', content: 'Arrival and departure times are confirmed with the host when your stay is arranged.' },
  { title: 'Can you arrange an airport transfer?', content: 'Transfer availability, pickup details and journey time need to be confirmed with the host. Send your arrival information and we can check options.' },
  { title: 'What dining options are available?', content: 'Dining service, menu and availability are confirmed directly with the host. Ask about Sri Lankan dishes, fresh produce, seafood, breakfast, tea and coffee.' },
  { title: 'Can dietary requirements be accommodated?', content: 'Please share dietary requirements before your stay. The host can confirm which options are available.' },
  { title: 'Can children stay at Skyshore?', content: 'Guest capacity and age-related arrangements are confirmed for each villa. Contact us before booking with your group details.' },
  { title: 'Where is Skyshore located?', content: 'Skyshore is in Tangalle, on the southern coast of Sri Lanka. The exact address and directions are shared when your stay is confirmed.' },
  { title: 'Are wellness services available?', content: 'Wellness services have not been confirmed. Contact the host to ask about current arrangements.' },
  { title: 'How do I make a reservation?', content: 'Send a booking request through the website or contact us by WhatsApp. The host will confirm availability, current rates and booking terms.' },
];

const socialLinks = [
  { icon: Globe, label: 'Facebook', url: '#' },
  { icon: MessageCircle, label: 'Twitter', url: '#' },
  { icon: Camera, label: 'Instagram', url: '#' },
  { icon: Play, label: 'Youtube', url: '#' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email';
    if (!form.subject) errs.subject = 'Please select a subject';
    if (!form.message.trim()) errs.message = 'Message is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  }

  return (
    <main className="bg-cream">
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden bg-secondary flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=800&fit=crop')] bg-cover bg-center opacity-20" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10">
          <p className="text-primary font-medium tracking-[0.3em] uppercase text-sm mb-4">Reach Out</p>
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-4">Get in Touch</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto" />
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <h2 className="font-playfair text-3xl font-bold text-luxury mb-2">Send a Message</h2>
              <p className="text-gray-500 mb-2">We&apos;ll get back to you within 24 hours.</p>
              <p className="mb-8 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-800">
                Demo form: it does not send a message. For a real enquiry, use
                WhatsApp or email the host directly.
              </p>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-emerald-50 border border-emerald-200 rounded-2xl p-12 text-center"
                  >
                    <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                    <h3 className="font-playfair text-2xl font-bold text-luxury mb-2">Demo form complete</h3>
                    <p className="text-gray-600">
                      Your message was not sent. This static demo has no backend.
                      Please contact the host on WhatsApp at +94 77 396 4515 or by
                      email at dishanrandika0@gmail.com.
                    </p>
                    <button onClick={() => setIsSubmitted(false)} className="mt-6 text-primary font-medium hover:underline cursor-pointer">
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Input label="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={errors.name} />
                      <Input label="Email Address" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Input label="Phone (optional)" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                      <Select options={subjectOptions} value={form.subject} onChange={(v) => setForm({ ...form, subject: v })} placeholder="Select subject" label="Subject" error={errors.subject} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-1.5">Message</label>
                      <textarea
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className={`w-full bg-white border rounded-lg px-4 py-3 text-luxury outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none ${errors.message ? 'border-red-500' : 'border-gray-200'}`}
                        placeholder="Tell us how we can help..."
                      />
                      {errors.message && <p className="text-red-500 text-sm mt-1 ml-1">{errors.message}</p>}
                    </div>
                    <Button type="submit" isLoading={isSubmitting} leftIcon={<Send className="w-4 h-4" />} size="lg" fullWidth>
                      Send Message
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-100 luxury-card">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-luxury text-sm">{item.label}</h4>
                      <p className="text-gray-500 text-sm mt-1">{item.value}</p>
                    </div>
                  </div>
                );
              })}

              {/* Map */}
              <div className="rounded-xl overflow-hidden border border-gray-100 h-48">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.8476!2d74.2692!3d4.1755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMTAnMzEuOCJOIDc0wrAxNicwOS4xIkU!5e0!3m2!1sen!2s!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Skyshore Location"
                />
              </div>

              {/* Social */}
              <div>
                <h4 className="font-semibold text-luxury mb-3">Follow Us</h4>
                <div className="flex gap-3">
                  {socialLinks.map((s) => {
                    const Icon = s.icon;
                    return (
                      <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-luxury transition-all duration-300">
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4">FAQ</p>
            <h2 className="font-playfair text-4xl font-bold text-luxury">Common Questions</h2>
          </div>
          <Accordion items={faqItems} />
        </div>
      </section>

      {/* Floating buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <motion.a
          href="https://wa.me/94773964515"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
        >
          <MessageSquare className="w-6 h-6" />
        </motion.a>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
          className="w-14 h-14 rounded-full bg-primary text-luxury flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
        >
          <HelpCircle className="w-6 h-6" />
        </motion.button>
      </div>
    </main>
  );
}
