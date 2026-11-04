'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { translations } from '@/data/translations';

type Language = 'en' | 'ar' | 'fr';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  const setLanguage = useCallback((lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem('hotel-language', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, []);

  const t = useCallback(
    (key: string): string => {
      return translations[currentLanguage]?.[key] || translations['en']?.[key] || key;
    },
    [currentLanguage]
  );

  const dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
