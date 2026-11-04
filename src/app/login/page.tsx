'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TreePine, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const demoAccounts = [
  { label: 'Guest demo', email: 'guest@hotel.com', password: 'password123' },
  { label: 'Admin demo', email: 'admin@hotel.com', password: 'admin123' },
];

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Email and password are required');
      return;
    }

    const ok = await login(email.trim().toLowerCase(), password);
    if (ok) {
      router.push('/account');
      return;
    }

    setError('These demo credentials were not recognised. Use one of the demo accounts below.');
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          <div className="mb-6 text-center">
            <Link href="/" className="mb-4 inline-flex items-center gap-2">
              <TreePine className="h-6 w-6 text-primary" />
              <span className="font-playfair text-xl font-semibold text-luxury">Skyshore</span>
            </Link>
            <h1 className="font-playfair text-3xl font-bold text-luxury">Guest Sign In</h1>
            <p className="mt-2 text-sm text-gray-500">
              Demo account access for the static website.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-secondary">Email</span>
              <input
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-cream px-4 py-2.5 text-sm outline-none focus:border-primary/40"
                placeholder="guest@hotel.com"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-secondary">Password</span>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-cream px-4 py-2.5 text-sm outline-none focus:border-primary/40"
                placeholder="Demo password"
              />
            </label>

            {error && (
              <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-semibold text-luxury transition-shadow hover:shadow-lg hover:shadow-primary/25 disabled:opacity-60"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
              {isLoading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between text-sm">
            <Link href="/auth" className="text-primary hover:underline">
              Forgot password?
            </Link>
            <Link href="/account" className="text-gray-500 hover:text-primary">
              Continue as guest
            </Link>
          </div>

          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-amber-800">
              <ShieldCheck className="h-4 w-4" /> Demo only
            </p>
            <p className="mt-1 text-xs leading-5 text-amber-800">
              Login is simulated in this browser. No real account, password or
              session is created, and no credentials are sent anywhere.
            </p>
            <ul className="mt-3 space-y-1 text-xs text-amber-900">
              {demoAccounts.map((account) => (
                <li key={account.email}>
                  <button
                    type="button"
                    onClick={() => {
                      setEmail(account.email);
                      setPassword(account.password);
                      setError('');
                    }}
                    className="text-left underline decoration-amber-400 underline-offset-2 hover:text-amber-700"
                  >
                    {account.label}: {account.email} / {account.password}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
