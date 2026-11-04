'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  ChevronRight,
  ChevronLeft,
  CreditCard,
  Shield,
} from 'lucide-react';
import { useBooking } from '@/context/BookingContext';
import { rooms } from '@/data';
import { formatDate } from '@/lib/utils';
import Button from '@/components/ui/Button';

const steps = ['Dates', 'Villa', 'Guest details', 'Extras', 'Payment', 'Confirm'];

export default function BookingPage() {
  const router = useRouter();
  const { selectedRoom, checkIn, checkOut, guests, addToBooking, updateBookingDates, updateGuests, addBooking } = useBooking();
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stepError, setStepError] = useState('');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  const [guestDetails, setGuestDetails] = useState({ name: '', email: '', phone: '', specialRequests: '' });
  const room = selectedRoom || rooms[0];
  const nights = checkIn && checkOut ? Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)) : 0;

  function goNext() {
    if (currentStep === 0 && (!checkIn || !checkOut || checkOut <= checkIn)) {
      setStepError('Choose a valid check-in and check-out date.');
      return;
    }
    if (currentStep === 2 && (!guestDetails.name.trim() || !guestDetails.email.trim() || !guestDetails.phone.trim())) {
      setStepError('Add your name, email and phone so the host can follow up.');
      return;
    }
    setStepError('');
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep((s) => s + 1);
    }
  }

  function goBack() {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((s) => s - 1);
    }
  }

  async function handleConfirm() {
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 2000));
    addBooking({
      roomId: room.id,
      userId: 'user-1',
      checkIn,
      checkOut,
      guests,
      totalPrice: 0,
      status: 'pending',
      paymentStatus: 'unpaid',
      specialRequests: [guestDetails.specialRequests, ...selectedExtras].filter(Boolean).join('\n'),
    });
    setIsProcessing(false);
    router.push('/booking/confirmation');
  }

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <main className="min-h-screen bg-cream px-4 py-10 pb-28 sm:py-14 sm:pb-14">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary-dark">A stay made personal</p>
          <h1 className="font-playfair text-4xl font-medium text-luxury sm:text-5xl">Plan your stay</h1>
          <p className="mt-3 text-sm text-gray-500">Your request is confirmed with the host before payment.</p>
        </motion.div>

        {/* Progress */}
        <div className="mx-auto mb-10 flex max-w-3xl items-center justify-between overflow-x-auto px-1 pb-2">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-9 w-9 items-center justify-center text-xs font-semibold transition-colors duration-300 sm:h-10 sm:w-10 ${
                    i < currentStep
                      ? 'bg-primary text-luxury'
                      : i === currentStep
                      ? 'bg-secondary text-white ring-4 ring-primary/20'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {i < currentStep ? <Check className="w-5 h-5" /> : i + 1}
                </div>
                <span className={`mt-2 hidden whitespace-nowrap text-[10px] font-medium sm:block ${i <= currentStep ? 'text-luxury' : 'text-gray-400'}`}>{step}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`mx-1 h-px w-5 transition-colors duration-500 sm:mx-3 sm:w-16 ${i < currentStep ? 'bg-primary' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-8">
          {/* Main content */}
          <div className="min-w-0">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' as const }}
              >
                {/* Step 0: Dates */}
                {currentStep === 0 && (
                  <div className="border border-[#E4DED1] bg-ivory p-5 sm:p-7">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-dark">Step 1</p>
                    <h2 className="mb-6 font-playfair text-3xl font-medium text-luxury">When would you like to stay?</h2>
                    <div className="grid gap-5 sm:grid-cols-3">
                      <label className="text-xs font-semibold text-secondary">
                        Check-in
                        <input type="date" value={checkIn} min={new Date().toISOString().slice(0, 10)} onChange={(event) => updateBookingDates(event.target.value, checkOut)} className="mt-2 w-full border border-[#D8D2C5] bg-white px-3 py-3 text-sm text-luxury outline-none focus:border-primary" />
                      </label>
                      <label className="text-xs font-semibold text-secondary">
                        Check-out
                        <input type="date" value={checkOut} min={checkIn || new Date().toISOString().slice(0, 10)} onChange={(event) => updateBookingDates(checkIn, event.target.value)} className="mt-2 w-full border border-[#D8D2C5] bg-white px-3 py-3 text-sm text-luxury outline-none focus:border-primary" />
                      </label>
                      <label className="text-xs font-semibold text-secondary">
                        Guests
                        <select value={guests} onChange={(event) => updateGuests(Number(event.target.value))} className="mt-2 w-full border border-[#D8D2C5] bg-white px-3 py-3 text-sm text-luxury outline-none focus:border-primary">
                          {[1, 2, 3, 4, 5, 6].map((count) => <option key={count} value={count}>{count} {count === 1 ? 'guest' : 'guests'}</option>)}
                        </select>
                      </label>
                    </div>
                    <p className="mt-5 text-xs text-gray-500">Dates and guest capacity are confirmed by the host before your stay is finalized.</p>
                  </div>
                )}

                {/* Step 1: Villa */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <h2 className="font-playfair text-3xl font-medium text-luxury">Choose a villa</h2>
                    <p className="mb-5 text-xs leading-5 text-gray-500">Villa names and rate figures are demo placeholders. Confirm the actual villa details, capacity and price with the host.</p>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {rooms.map((r) => (
                        <button
                          key={r.id}
                          onClick={() => addToBooking(r)}
                          aria-pressed={room.id === r.id}
                          className={`group overflow-hidden border text-left transition-colors ${
                            room.id === r.id ? 'border-forest ring-1 ring-forest' : 'border-[#E2DDD2] hover:border-primary'
                          }`}
                        >
                          <div className="relative h-40 overflow-hidden">
                            <Image src={r.thumbnail} alt={`Villa option: ${r.name}`} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                          </div>
                          <div className="p-4 sm:p-5">
                            <h3 className="font-playfair text-xl font-medium text-luxury">{r.name}</h3>
                            <p className="mt-2 text-xs leading-5 text-gray-500">Villa configuration and current rate confirmed on request.</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Guest Details */}
                {currentStep === 2 && (
                  <div className="space-y-5">
                    <h2 className="font-playfair text-2xl font-bold text-luxury mb-4">Guest Details</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-secondary mb-1.5">Full Name</label>
                        <input
                          type="text"
                          value={guestDetails.name}
                          onChange={(e) => setGuestDetails({ ...guestDetails, name: e.target.value })}
                          placeholder="Your full name"
                          required
                          className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-luxury outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary mb-1.5">Email</label>
                        <input
                          type="email"
                          value={guestDetails.email}
                          onChange={(e) => setGuestDetails({ ...guestDetails, email: e.target.value })}
                          placeholder="you@example.com"
                          required
                          className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-luxury outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary mb-1.5">Phone</label>
                        <input
                          type="tel"
                          value={guestDetails.phone}
                          onChange={(e) => setGuestDetails({ ...guestDetails, phone: e.target.value })}
                          placeholder="+94 ..."
                          required
                          className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-luxury outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-1.5">Special Requests (optional)</label>
                      <textarea
                        rows={3}
                        value={guestDetails.specialRequests}
                        onChange={(e) => setGuestDetails({ ...guestDetails, specialRequests: e.target.value })}
                        placeholder="Kitchen questions, arrival notes, celebration or accessibility requests..."
                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-luxury outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Extras and requests */}
                {currentStep === 3 && (
                  <div className="border border-[#E4DED1] bg-ivory p-5 sm:p-7">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-dark">Step 4</p>
                    <h2 className="mb-3 font-playfair text-3xl font-medium text-luxury">Anything we should know?</h2>
                    <p className="mb-6 text-sm text-gray-500">These are requests only, not confirmed services. Your host will follow up about availability.</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {['Airport transfer enquiry', 'Honeymoon or celebration', 'Kitchen access & self-catering', 'Wellness options enquiry'].map((request) => (
                        <label key={request} className="flex cursor-pointer items-start gap-3 border border-[#E4DED1] bg-white p-4 text-sm text-luxury">
                          <input
                            type="checkbox"
                            checked={selectedExtras.includes(request)}
                            onChange={(event) => setSelectedExtras((current) => event.target.checked ? [...current, request] : current.filter((item) => item !== request))}
                            className="mt-0.5 accent-[#284B3B]"
                          />
                          {request}
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 4: Payment */}
                {currentStep === 4 && (
                  <div className="border border-[#E4DED1] bg-ivory p-5 sm:p-7">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-dark">Step 5</p>
                    <h2 className="mb-5 font-playfair text-3xl font-medium text-luxury">Payment follows confirmation</h2>
                    <div className="flex gap-4 border border-[#E4DED1] bg-white p-5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-cream text-forest">
                        <CreditCard size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-luxury">No payment details needed now</p>
                        <p className="mt-2 text-sm leading-6 text-gray-500">The host will confirm villa availability, current rates, taxes and secure payment options. This website demo does not process payments.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 5: Confirmation */}
                {currentStep === 5 && (
                  <div className="space-y-5">
                    <h2 className="font-playfair text-2xl font-bold text-luxury mb-4">Review & Confirm</h2>
                    <div className="space-y-4 border border-[#E4DED1] bg-ivory p-5 sm:p-6">
                      <div className="flex items-center gap-4">
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden">
                          <Image src={room.thumbnail} alt={room.name} fill sizes="80px" className="object-cover" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-luxury">{room.name}</h3>
                          <p className="text-sm text-gray-500">{room.type} • {room.bedType}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Check-in</p>
                          <p className="font-medium text-luxury">{checkIn ? formatDate(checkIn) : 'Not selected'}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Check-out</p>
                          <p className="font-medium text-luxury">{checkOut ? formatDate(checkOut) : 'Not selected'}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Guests</p>
                          <p className="font-medium text-luxury">{guests}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Nights</p>
                          <p className="font-medium text-luxury">{nights || '—'}</p>
                        </div>
                      </div>
                      {guestDetails.name && (
                        <div className="text-sm border-t border-gray-100 pt-4">
                          <p className="text-gray-400 mb-1">Guest</p>
                          <p className="font-medium text-luxury">{guestDetails.name}</p>
                          <p className="text-gray-500">{guestDetails.email} {guestDetails.phone && `• ${guestDetails.phone}`}</p>
                        </div>
                      )}
                      {selectedExtras.length > 0 && (
                        <div className="border-t border-[#E4DED1] pt-4 text-sm">
                          <p className="mb-1 text-gray-400">Requests for the host</p>
                          <p className="text-luxury">{selectedExtras.join(', ')}</p>
                        </div>
                      )}
                      <p className="border-t border-[#E4DED1] pt-4 text-xs leading-5 text-gray-500">This is a stay request, not a confirmed reservation. Rates, taxes, availability and payment are confirmed with the host.</p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            {stepError && <p role="alert" className="mt-6 border-l-2 border-[#A85D47] bg-[#A85D47]/5 px-4 py-3 text-sm text-[#7D3E32]">{stepError}</p>}
            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={goBack}
                disabled={currentStep === 0}
                className="flex items-center gap-2 text-gray-500 hover:text-luxury transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer font-medium"
              >
                <ChevronLeft className="w-5 h-5" /> Back
              </button>
              {currentStep < steps.length - 1 ? (
                <Button onClick={goNext} rightIcon={<ChevronRight className="w-5 h-5" />}>
                  Next
                </Button>
              ) : (
                <Button onClick={handleConfirm} isLoading={isProcessing} leftIcon={<Check className="w-5 h-5" />}>
                  Send Stay Request
                </Button>
              )}
            </div>
          </div>

          {/* Sidebar summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 border border-[#E4DED1] bg-ivory p-5 sm:p-6">
              <h3 className="mb-4 font-playfair text-2xl font-medium text-luxury">Stay summary</h3>
              {room && (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative h-14 w-16 shrink-0 overflow-hidden">
                      <Image src={room.thumbnail} alt={room.name} fill sizes="64px" className="object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold text-luxury text-sm">{room.name}</p>
                      <p className="text-xs text-gray-500">Villa details confirmed on request</p>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm border-t border-gray-100 pt-4">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Villa rate</span>
                      <span className="text-right text-luxury">Confirm with host</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Nights</span>
                      <span className="text-luxury">{nights || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Guests</span>
                      <span className="text-luxury">{guests}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Taxes</span>
                      <span className="text-right text-luxury">Included in host quote</span>
                    </div>
                    <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-lg">
                      <span className="text-luxury">Total</span>
                      <span className="text-right text-sm text-primary">Confirmed by host</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
