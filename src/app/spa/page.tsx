'use client';

import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  Heart,
  Sparkles,
  Shield,
  Activity,
  Clock,
  Star,
  Send,
  CheckCircle,
  CalendarDays,
  Phone,
  User,
  Leaf,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import SectionHeader from '@/components/ui/SectionHeader';
import Badge from '@/components/ui/Badge';

const benefits = [
  { icon: Heart, title: 'Ayurveda', description: 'Ask the host whether Ayurveda-inspired wellness options are currently available.' },
  { icon: Sparkles, title: 'Massage', description: 'Share the kind of massage you are interested in and confirm current arrangements.' },
  { icon: Shield, title: 'Yoga', description: 'Ask about quiet spaces and any yoga options that may be available during your stay.' },
  { icon: Activity, title: 'Time to unwind', description: 'Let the host know what a restful stay means to you.' },
];

const spaServices = [
  { name: 'Ayurveda enquiry', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&h=600&fit=crop', description: 'Ask the host about Ayurveda-inspired wellness options and what is currently available.' },
  { name: 'Massage enquiry', image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=900&h=600&fit=crop', description: 'Share your preferred style and ask the host to confirm whether a massage can be arranged.' },
  { name: 'Yoga & meditation enquiry', image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=900&h=600&fit=crop', description: 'Ask about quiet spaces and any yoga or meditation arrangements for your dates.' },
];

const timeOptions = [
  { label: 'Confirm with host', value: 'confirm' },
];

const therapistOptions = [
  { label: 'Discuss with host', value: 'confirm' },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const } }),
};

export default function SpaPage() {
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({ date: '', time: '', therapist: '', name: '', phone: '', email: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function validate() {
    const errs: Record<string, string> = {};
    if (!selectedService) errs.service = 'Please select a service';
    if (!formData.date) errs.date = 'Select a date';
    if (!formData.time) errs.time = 'Select a time';
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.phone.trim()) errs.phone = 'Phone is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Invalid email';
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
  }

  return (
    <main className="bg-cream">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=1920&h=800&fit=crop)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-luxury/60 via-luxury/40 to-luxury/80" />
        <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-primary font-medium tracking-[0.3em] uppercase text-sm mb-4">Rest & wellbeing</p>
            <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-4">Wellness, at your pace</h1>
            <p className="text-cream/80 text-lg max-w-2xl mx-auto mt-4">
              Ask the host about wellness options that may be available during your stay.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-6" />
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="A moment for yourself"
            subtitle="Explore wellness themes and ask the host to confirm current arrangements."
            centered
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-5 group-hover:from-primary group-hover:to-accent transition-all duration-500">
                    <Icon className="w-8 h-8 text-primary group-hover:text-luxury transition-colors duration-500" />
                  </div>
                  <h3 className="font-playfair text-xl font-bold text-luxury mb-3">{b.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{b.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Wellness enquiries"
            subtitle="Images are illustrative. Services, availability and prices must be confirmed with the host."
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {spaServices.map((service, i) => (
              <motion.div
                key={service.name}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-cream rounded-2xl overflow-hidden group luxury-card cursor-pointer"
                onClick={() => setSelectedService(service.name)}
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury/70 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <Badge variant="gold">Enquiry</Badge>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="text-white text-xs font-medium">Confirm with host</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-playfair text-xl font-bold text-luxury mb-2 group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Form */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionHeader title="Ask about wellness" subtitle="Send a request and confirm the details directly with your host." centered />
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border border-emerald-200 rounded-2xl p-12 text-center"
              >
                <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                <h3 className="font-playfair text-2xl font-bold text-luxury mb-2">Request noted</h3>
                <p className="text-gray-500">This demo form does not send your enquiry. Contact the host to confirm availability.</p>
                <Button variant="ghost" className="mt-6" onClick={() => { setIsSubmitted(false); setSelectedService(''); setFormData({ date: '', time: '', therapist: '', name: '', phone: '', email: '' }); }}>
                  Book Another Appointment
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-8 md:p-10 border border-gray-100 shadow-lg"
              >
                <div className="mb-5">
                  <Select
                    options={spaServices.map((service) => ({ label: service.name, value: service.name }))}
                    value={selectedService}
                    onChange={(v) => setSelectedService(v)}
                    placeholder="Select a service"
                    label="Service"
                    error={errors.service}
                  />
                </div>
                <div className="grid sm:grid-cols-3 gap-5 mb-5">
                  <Input
                    label="Preferred Date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    error={errors.date}
                    icon={<CalendarDays className="w-4 h-4" />}
                  />
                  <Select
                    options={timeOptions}
                    value={formData.time}
                    onChange={(v) => setFormData({ ...formData, time: v })}
                    placeholder="Select time"
                    label="Preferred Time"
                    error={errors.time}
                  />
                  <Select
                    options={therapistOptions}
                    value={formData.therapist}
                    onChange={(v) => setFormData({ ...formData, therapist: v })}
                    placeholder="Select preference"
                    label="Therapist Preference"
                  />
                </div>
                <div className="grid sm:grid-cols-3 gap-5 mb-5">
                  <Input
                    label="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    error={errors.name}
                    icon={<User className="w-4 h-4" />}
                  />
                  <Input
                    label="Phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    error={errors.phone}
                    icon={<Phone className="w-4 h-4" />}
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    error={errors.email}
                    icon={<Send className="w-4 h-4" />}
                  />
                </div>
                <Button type="submit" isLoading={isSubmitting} size="lg" fullWidth leftIcon={<Sparkles className="w-5 h-5" />}>
                  Book Appointment
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
