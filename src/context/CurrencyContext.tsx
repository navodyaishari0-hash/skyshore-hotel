'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { currencyRates, CURRENCY_SYMBOLS } from '@/data/rooms';

export type Currency = 'LKR' | 'USD' | 'EUR' | 'GBP';

interface CurrencyContextType {
  currentCurrency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (amountLKR: number) => string;
  formatPrice: (amountLKR: number) => string;
  formatPriceWithCents: (amountLKR: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currentCurrency, setCurrentCurrency] = useState<Currency>('LKR');

  const setCurrency = useCallback((currency: Currency) => {
    setCurrentCurrency(currency);
    try {
      localStorage.setItem('hotel-currency', currency);
    } catch {
      // localStorage may be unavailable in some environments
    }
  }, []);

  const convertPrice = useCallback(
    (amountLKR: number): string => {
      const rate = currencyRates[currentCurrency] || 1;
      const converted = Math.round(amountLKR * rate * 100) / 100;
      const symbol = CURRENCY_SYMBOLS[currentCurrency] || 'Rs.';
      if (currentCurrency === 'LKR') {
        return `${symbol}${converted.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })}`;
      }
      return `${symbol}${converted.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    },
    [currentCurrency]
  );

  const formatPrice = useCallback(
    (amountLKR: number): string => {
      const rate = currencyRates[currentCurrency] || 1;
      const converted = Math.round(amountLKR * rate * 100) / 100;
      const symbol = CURRENCY_SYMBOLS[currentCurrency] || 'Rs.';
      return `${symbol}${converted.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: currentCurrency === 'LKR' ? 0 : 0,
      })}`;
    },
    [currentCurrency]
  );

  const formatPriceWithCents = useCallback(
    (amountLKR: number): string => {
      const rate = currencyRates[currentCurrency] || 1;
      const converted = Math.round(amountLKR * rate * 100) / 100;
      const symbol = CURRENCY_SYMBOLS[currentCurrency] || 'Rs.';
      return `${symbol}${converted.toLocaleString(undefined, {
        minimumFractionDigits: currentCurrency === 'LKR' ? 0 : 2,
        maximumFractionDigits: currentCurrency === 'LKR' ? 0 : 2,
      })}`;
    },
    [currentCurrency]
  );

  return (
    <CurrencyContext.Provider
      value={{ currentCurrency, setCurrency, convertPrice, formatPrice, formatPriceWithCents }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}