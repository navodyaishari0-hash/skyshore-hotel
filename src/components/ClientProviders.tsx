'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { BookingProvider } from '@/context/BookingContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { CurrencyProvider } from '@/context/CurrencyContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingElements from '@/components/layout/FloatingElements';
import CookieConsent from '@/components/shared/CookieConsent';
import BackToTop from '@/components/ui/BackToTop';

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <CurrencyProvider>
          <AuthProvider>
            <BookingProvider>
              <Navbar />
              <div className="flex-1">{children}</div>
              <Footer />
              <FloatingElements />
              <CookieConsent />
              <BackToTop />
            </BookingProvider>
          </AuthProvider>
        </CurrencyProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
