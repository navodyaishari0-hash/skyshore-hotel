'use client';

import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  UtensilsCrossed,
  Coffee,
  Users,
  Leaf,
  Send,
  CheckCircle,
  Phone,
  CalendarDays,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import SectionHeader from '@/components/ui/SectionHeader';
import Badge from '@/components/ui/Badge';

const restaurants = [
  {
    name: 'Dining at Skyshore',
    type: 'Dining enquiry',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&h=700&fit=crop',
    description: 'Ask about Sri Lankan cuisine, fresh tropical fruit, seafood, breakfast, tea, coffee and international options. Current menus and service availability are confirmed by the host.',
  },
];

const menuCategories = ['Appetizers', 'Mains', 'Desserts', 'Drinks'] as const;
type MenuCategory = (typeof menuCategories)[number];

const menuItems: Record<MenuCategory, { name: string; description: string; price: number; dietary: string[] }[]> = {
  Appetizers: [
    { name: 'Seared Foie Gras', description: 'With brioche toast, fig compote, and aged balsamic reduction', price: 38, dietary: [] },
    { name: 'Tuna Tartare', description: 'Sushi-grade tuna, avocado mousse, sesame crisp, wasabi aioli', price: 32, dietary: ['GF'] },
    { name: 'Burrata Caprese', description: 'Heirloom tomatoes, fresh basil, aged balsamic pearls, extra virgin olive oil', price: 26, dietary: ['V', 'GF'] },
    { name: 'Lobster Bisque', description: 'Creamy bisque with cognac foam, lobster claw, and chive oil', price: 28, dietary: [] },
  ],
  Mains: [
    { name: 'Wagyu Ribeye', description: 'A5 Japanese Wagyu, truffle mashed potato, roasted bone marrow, red wine jus', price: 120, dietary: ['GF'] },
    { name: 'Pan-Seared Sea Bass', description: 'Chilean sea bass, saffron risotto, cherry tomatoes, basil pesto', price: 68, dietary: ['GF'] },
    { name: 'Herb-Crusted Rack of Lamb', description: 'New Zealand lamb, rosemary jus, gratin dauphinois, seasonal vegetables', price: 85, dietary: ['GF'] },
    { name: 'Wild Mushroom Risotto', description: 'Arborio rice, porcini, truffle oil, shaved Parmigiano-Reggiano', price: 42, dietary: ['V', 'GF'] },
  ],
  Desserts: [
    { name: 'Chocolate Soufflé', description: 'Grand Marnier chocolate soufflé with vanilla bean ice cream', price: 24, dietary: ['V'] },
    { name: 'Crème Brûlée', description: 'Tahitian vanilla custard with caramelized sugar crust and berries', price: 18, dietary: ['V', 'GF'] },
    { name: 'Tarte Tatin', description: 'Caramelized apple tart, Calvados cream, salted caramel drizzle', price: 22, dietary: ['V'] },
    { name: 'Panna Cotta', description: 'Coconut panna cotta, passion fruit coulis, toasted macadamia', price: 20, dietary: ['V', 'GF'] },
  ],
  Drinks: [
    { name: 'Azure Sunset', description: 'Grey Goose vodka, elderflower, passion fruit, champagne float', price: 22, dietary: [] },
    { name: 'Golden Hour', description: 'Aged rum, turmeric honey, fresh ginger, sparkling water', price: 18, dietary: [] },
    { name: 'Lavender Martini', description: 'Hendricks gin, lavender syrup, fresh lemon, egg white foam', price: 20, dietary: [] },
    { name: 'Mojito Royale', description: 'Bacardi, fresh mint, lime, prosecco, edible gold leaf', price: 19, dietary: [] },
  ],
};

const dietaryLabels: Record<string, { label: string; color: string }> = {
  V: { label: 'Vegetarian', color: 'bg-emerald-100 text-emerald-700' },
  VG: { label: 'Vegan', color: 'bg-green-100 text-green-700' },
  GF: { label: 'Gluten-Free', color: 'bg-amber-100 text-amber-700' },
  DF: { label: 'Dairy-Free', color: 'bg-blue-100 text-blue-700' },
};

const diningNotes = [
  { title: 'Sri Lankan flavours', description: 'Ask about the dishes currently available during your stay.' },
  { title: 'Island ingredients', description: 'Fresh fruit, seafood and local ingredients can be discussed with the host.' },
  { title: 'Your preferences', description: 'Share dietary needs and preferred dining times with your enquiry.' },
];

const timeOptions = [
  { label: 'Confirm with host', value: 'confirm' },
];

const partySizeOptions = [
  { label: '1 Guest', value: '1' },
  { label: '2 Guests', value: '2' },
  { label: '3 Guests', value: '3' },
  { label: '4 Guests', value: '4' },
  { label: '5 Guests', value: '5' },
  { label: '6 Guests', value: '6' },
  { label: '7+ Guests', value: '7' },
];

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop', title: 'Gourmet Plating' },
  { src: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop', title: 'Breakfast Spread' },
  { src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop', title: 'Artisan Pizza' },
  { src: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&h=400&fit=crop', title: 'Fresh Salad' },
  { src: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&h=400&fit=crop', title: 'Pastry Display' },
  { src: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=600&h=400&fit=crop', title: 'Signature Burger' },
  { src: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&h=400&fit=crop', title: 'Pasta Perfection' },
  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop', title: 'Fine Dining' },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const } }),
};

export default function RestaurantPage() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('Appetizers');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', date: '', time: '', party: '', requests: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function validate() {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Invalid email';
    if (!formData.date) errs.date = 'Select a date';
    if (!formData.time) errs.time = 'Select a time';
    if (!formData.party) errs.party = 'Select party size';
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
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=800&fit=crop)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-luxury/60 via-luxury/40 to-luxury/80" />
        <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-primary font-medium tracking-[0.3em] uppercase text-sm mb-4">Sri Lankan dining</p>
            <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-4">A taste of the island</h1>
            <p className="text-cream/80 text-lg max-w-2xl mx-auto mt-4">
              Ask about traditional dishes, tropical fruit, seafood and familiar favourites.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-6" />
          </motion.div>
        </div>
      </section>

      {/* Restaurants */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Dining at Skyshore"
            subtitle="Menu details and dining availability are confirmed directly with your host."
            centered
          />
          <div className="mx-auto max-w-4xl">
            {restaurants.map((r, i) => (
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
                  <img src={r.image} alt="Sri Lankan-inspired dishes and tropical ingredients" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury/80 to-transparent" />
                  <Badge variant="gold" className="absolute top-4 left-4">{r.type}</Badge>
                </div>
                <div className="p-6">
                  <h3 className="font-playfair text-xl font-bold text-luxury mb-2">{r.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{r.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Leaf className="w-4 h-4 text-primary" />
                    <span>Confirm menu and service availability with the host</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Menu */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Menu inspiration"
            subtitle="Example dishes only. Current items, prices and availability must be confirmed with the host."
            centered
          />
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-cream rounded-full p-1.5 gap-1">
              {menuCategories.map((cat) => (
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
              {menuItems[activeCategory].map((item, idx) => (
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
                    {item.dietary.length > 0 && (
                      <div className="flex gap-2 mt-2">
                        {item.dietary.map((d) => (
                          <span key={d} className={`text-xs px-2 py-0.5 rounded-full font-semibold ${dietaryLabels[d]?.color || 'bg-gray-100 text-gray-600'}`}>
                            {dietaryLabels[d]?.label || d}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-primary font-semibold text-xs whitespace-nowrap">Ask host</span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Dining preferences */}
      <section className="py-20 px-4 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="Make it your own" subtitle="Share your preferences and ask what is available during your stay." centered light />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {diningNotes.map((note, i) => (
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
                  {i === 0 ? <UtensilsCrossed className="w-6 h-6 text-primary" /> : i === 1 ? <Leaf className="w-6 h-6 text-primary" /> : <Coffee className="w-6 h-6 text-primary" />}
                </div>
                <h3 className="font-playfair text-xl font-medium text-white mb-2">{note.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{note.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation Form */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionHeader title="Reserve Your Table" subtitle="Secure an unforgettable dining experience" centered />
          <p className="mx-auto mb-6 max-w-xl rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-center text-xs leading-5 text-amber-800">
            Demo form: no reservation is created and no email is sent. Please
            contact the host on WhatsApp at +94 77 396 4515 to book a table.
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
                <p className="text-gray-500">No reservation was created and no email was sent. Please contact the host directly to confirm a table.</p>
                <Button variant="ghost" className="mt-6" onClick={() => { setIsSubmitted(false); setFormData({ name: '', email: '', phone: '', date: '', time: '', party: '', requests: '' }); }}>
                  Make Another Reservation
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
                    label="Date"
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
                    label="Time"
                    error={errors.time}
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <Select
                    options={partySizeOptions}
                    value={formData.party}
                    onChange={(v) => setFormData({ ...formData, party: v })}
                    placeholder="Party size"
                    label="Party Size"
                    error={errors.party}
                  />
                  <div />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-secondary mb-1.5">Special Requests</label>
                  <textarea
                    rows={3}
                    value={formData.requests}
                    onChange={(e) => setFormData({ ...formData, requests: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-luxury outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                    placeholder="Dietary requirements, occasion, seating preference..."
                  />
                </div>
                <Button type="submit" isLoading={isSubmitting} size="lg" fullWidth leftIcon={<UtensilsCrossed className="w-5 h-5" />}>
                  Reserve Table
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Food Gallery */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="Food Gallery" subtitle="A feast for the eyes before the feast for the palate" centered />
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
