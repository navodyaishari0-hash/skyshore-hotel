'use client';

import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  ChefHat,
  Coffee,
  Users,
  Leaf,
  Send,
  CheckCircle,
  Phone,
  CalendarDays,
  ShoppingBasket,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import SectionHeader from '@/components/ui/SectionHeader';
import Badge from '@/components/ui/Badge';

const kitchenIntro = [
  {
    name: 'The guest kitchen',
    type: 'Shared kitchen',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&h=700&fit=crop',
    description:
      'Skyshore does not run a restaurant and does not prepare or serve meals. Guests are welcome to use the kitchen to cook their own breakfast, lunch and dinner whenever they like.',
  },
];

const kitchenCategories = ['Cooking', 'Storing', 'Preparing', 'Serving'] as const;
type KitchenCategory = (typeof kitchenCategories)[number];

const kitchenItems: Record<KitchenCategory, { name: string; description: string }[]> = {
  Cooking: [
    { name: 'Cooktop & pans', description: 'A cooking area with basic pots and pans for everyday meals.' },
    { name: 'Kettle', description: 'Boil water for tea, coffee or instant meals.' },
    { name: 'Everyday cooking gear', description: 'Basic utensils for preparing simple breakfasts, curries and pasta.' },
    { name: 'Ask the host', description: 'Exact appliances and equipment are confirmed by the host before your stay.' },
  ],
  Storing: [
    { name: 'Refrigerator space', description: 'Keep fresh produce, drinks and leftovers cool.' },
    { name: 'Cupboard space', description: 'Store dry ingredients, snacks and tea and coffee.' },
    { name: 'Shopping nearby', description: 'Buy fruit, vegetables, fish, eggs, bread and spices in Tangalle.' },
    { name: 'Ask the host', description: 'Ask where to shop for the ingredients you need during your stay.' },
  ],
  Preparing: [
    { name: 'Prep surface', description: 'A clear worktop for chopping fruit and preparing ingredients.' },
    { name: 'Sink & wash-up', description: 'Wash produce, dishes and cooking equipment after use.' },
    { name: 'Crockery & cutlery', description: 'Plates, bowls, cups and cutlery for guests staying at the property.' },
    { name: 'Ask the host', description: 'Confirm what is provided so you know what to bring or buy.' },
  ],
  Serving: [
    { name: 'Dining table', description: 'A simple place to eat together inside the kitchen area.' },
    { name: 'Private deck', description: 'Carry your meal outside and eat in the garden or on your deck.' },
    { name: 'Tea & coffee', description: 'Make a hot drink whenever you like — there are no fixed dining times.' },
    { name: 'Ask the host', description: 'Ask about outdoor seating and the best spots for an evening meal.' },
  ],
};

const selfCateringNotes = [
  {
    icon: ShoppingBasket,
    title: 'Buy local',
    description:
      'Pick up fresh produce, fish, eggs, bread and spices from shops and markets around Tangalle.',
  },
  {
    icon: ChefHat,
    title: 'Cook your way',
    description:
      'Use the guest kitchen to prepare breakfast, lunch, dinner or a late-night snack — there is no set menu.',
  },
  {
    icon: Coffee,
    title: 'Keep it simple',
    description:
      'Tea and coffee can be made in the kitchen. Ask the host where to buy the ingredients you need.',
  },
];

const guestOptions = [
  { label: '1 Guest', value: '1' },
  { label: '2 Guests', value: '2' },
  { label: '3 Guests', value: '3' },
  { label: '4 Guests', value: '4' },
  { label: '5 Guests', value: '5' },
  { label: '6 Guests', value: '6' },
  { label: '7+ Guests', value: '7' },
];

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=400&fit=crop', title: 'Guest Kitchen' },
  { src: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop', title: 'Local Market Produce' },
  { src: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop', title: 'Breakfast You Make' },
  { src: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&h=400&fit=crop', title: 'Fresh Salad' },
  { src: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&h=400&fit=crop', title: 'Local Bakery Finds' },
  { src: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=600&h=400&fit=crop', title: 'Simple Home Cooking' },
  { src: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&h=400&fit=crop', title: 'Pasta Night' },
  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop', title: 'Meal on the Deck' },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const } }),
};

export default function RestaurantPage() {
  const [activeCategory, setActiveCategory] = useState<KitchenCategory>('Cooking');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', date: '', guests: '', requests: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function validate() {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Invalid email';
    if (!formData.date) errs.date = 'Select a date';
    if (!formData.guests) errs.guests = 'Select number of guests';
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
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1920&h=800&fit=crop)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-luxury/60 via-luxury/40 to-luxury/80" />
        <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-primary font-medium tracking-[0.3em] uppercase text-sm mb-4">Self-catering kitchen</p>
            <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-4">Your own kitchen in the tropics</h1>
            <p className="text-cream/80 text-lg max-w-2xl mx-auto mt-4">
              There is no restaurant and no meal service at Skyshore. Guests have use of a kitchen to cook for themselves.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-6" />
          </motion.div>
        </div>
      </section>

      {/* Kitchen intro */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Cook it yourself"
            subtitle="A practical guest kitchen — no restaurant, no set menu and no fixed dining times."
            centered
          />
          <div className="mx-auto max-w-4xl">
            {kitchenIntro.map((r, i) => (
              <motion.div
                key={r.name}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group overflow-hidden border border-[#E5E0D5] bg-white"
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={r.image} alt="A kitchen available for guests to cook their own meals" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury/80 to-transparent" />
                  <Badge variant="gold" className="absolute top-4 left-4">{r.type}</Badge>
                </div>
                <div className="p-6">
                  <h3 className="font-playfair text-xl font-bold text-luxury mb-2">{r.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{r.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Leaf className="w-4 h-4 text-primary" />
                    <span>Ask the host about kitchen access and what is provided</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive kitchen guide */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="What to expect in the kitchen"
            subtitle="A general guide only. Ask the host to confirm the exact equipment before you shop."
            centered
          />
          <div className="flex justify-center mb-12">
            <div className="inline-flex flex-wrap justify-center bg-cream rounded-full p-1.5 gap-1">
              {kitchenCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="relative px-6 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 cursor-pointer"
                >
                  {activeCategory === cat && (
                    <motion.div
                      layoutId="menuIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full"
                      transition={{ type: 'spring' as const, stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 ${activeCategory === cat ? 'text-luxury' : 'text-gray-500'}`}>
                    {cat}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {kitchenItems[activeCategory].map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start justify-between p-5 rounded-xl bg-cream/50 hover:bg-cream border border-transparent hover:border-primary/20 transition-all duration-300 group"
                >
                  <div className="flex-1 mr-4">
                    <h4 className="font-playfair text-lg font-bold text-luxury group-hover:text-primary transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-gray-500 text-sm mt-1 leading-relaxed">{item.description}</p>
                  </div>
                  <span className="text-primary font-semibold text-xs whitespace-nowrap">Ask host</span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Self-catering notes */}
      <section className="py-20 px-4 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="Make it your own" subtitle="Shop locally, cook what you like and eat whenever you are hungry." centered light />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {selfCateringNotes.map((note, i) => (
              <motion.div
                key={note.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-14 h-14 bg-white/5 flex items-center justify-center mx-auto mb-5 border border-primary/30">
                  <note.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-playfair text-xl font-medium text-white mb-2">{note.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{note.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Kitchen enquiry form */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionHeader title="Ask about the kitchen" subtitle="Check access, equipment or shopping nearby before your stay" centered />
          <p className="mx-auto mb-6 max-w-xl rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-center text-xs leading-5 text-amber-800">
            Demo form: no enquiry is sent and no email is created. Please contact
            the host on WhatsApp at +94 77 396 4515 with your kitchen questions.
          </p>
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border border-emerald-200 rounded-2xl p-12 text-center"
              >
                <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                <h3 className="font-playfair text-2xl font-bold text-luxury mb-2">Demo form complete</h3>
                <p className="text-gray-500">No enquiry was sent and no email was created. Please contact the host on WhatsApp to ask about the kitchen.</p>
                <Button variant="ghost" className="mt-6" onClick={() => { setIsSubmitted(false); setFormData({ name: '', email: '', phone: '', date: '', guests: '', requests: '' }); }}>
                  Ask Another Question
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
                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <Input
                    label="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    error={errors.name}
                    icon={<Users className="w-4 h-4" />}
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
                <div className="grid sm:grid-cols-3 gap-5 mb-5">
                  <Input
                    label="Phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    icon={<Phone className="w-4 h-4" />}
                  />
                  <Input
                    label="Arrival Date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    error={errors.date}
                    icon={<CalendarDays className="w-4 h-4" />}
                  />
                  <Select
                    options={guestOptions}
                    value={formData.guests}
                    onChange={(v) => setFormData({ ...formData, guests: v })}
                    placeholder="Select guests"
                    label="Guests"
                    error={errors.guests}
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-secondary mb-1.5">Your Questions</label>
                  <textarea
                    rows={3}
                    value={formData.requests}
                    onChange={(e) => setFormData({ ...formData, requests: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-luxury outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                    placeholder="Kitchen access, equipment, nearby shops, dietary needs..."
                  />
                </div>
                <Button type="submit" isLoading={isSubmitting} size="lg" fullWidth leftIcon={<ChefHat className="w-5 h-5" />}>
                  Send Kitchen Question
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Kitchen gallery */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="Kitchen & Market Gallery" subtitle="Local ingredients, the guest kitchen and meals you make yourself" centered />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative rounded-xl overflow-hidden group cursor-pointer aspect-square"
              >
                <img src={img.src} alt={img.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-luxury/0 group-hover:bg-luxury/50 transition-all duration-500 flex items-end p-4">
                  <p className="text-white font-semibold text-sm opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    {img.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
