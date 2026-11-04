'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, TreePine, Loader2, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Invalid email address');
      return;
    }
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mb-10 justify-center">
          <TreePine className="w-8 h-8 text-primary" />
          <span className="font-playfair text-2xl font-bold text-luxury">Skyshore</span>
        </Link>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          {isSubmitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-500" />
              </div>
              <h2 className="font-playfair text-2xl font-bold text-luxury mb-2">Demo Reset Request</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                This static demo cannot send emails or reset an account. No reset
                link was sent to <span className="font-medium text-luxury">{email}</span>.
              </p>
              <p className="text-gray-400 text-xs mb-6">For real account help, contact the host directly.</p>
              <div className="space-y-3">
                <button
                  onClick={() => { setIsSubmitted(false); setEmail(''); }}
                  className="w-full bg-gradient-to-r from-primary to-accent text-luxury font-semibold py-3 rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all cursor-pointer"
                >
                  Try Again
                </button>
                <Link href="/login" className="block w-full text-center text-primary font-medium text-sm hover:underline py-2">
                  Back to Login
                </Link>
              </div>
            </motion.div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-7 h-7 text-primary" />
                </div>
                <h2 className="font-playfair text-2xl font-bold text-luxury mb-2">Forgot Password?</h2>
                <p className="text-gray-500 text-sm">No worries. Enter your email and we&apos;ll send you a reset link.</p>
                <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-800">
                  Demo only: this form does not send email. Real password resets
                  require a backend service.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className={`w-full bg-white border rounded-lg pl-12 pr-4 py-3 text-luxury outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20 ${error ? 'border-red-500' : 'border-gray-200'}`}
                    />
                  </div>
                  {error && <p className="text-red-500 text-sm mt-1 ml-1">{error}</p>}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-primary to-accent text-luxury font-semibold py-3.5 rounded-lg shadow-md hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                  {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                </motion.button>
              </form>

              <Link href="/login" className="flex items-center justify-center gap-2 text-primary font-medium text-sm mt-6 hover:underline">
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
