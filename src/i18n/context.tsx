'use client';

import React, { createContext, useContext, useState } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import th from './th.json';
import en from './en.json';

export type Language = 'th' | 'en';
export type Dictionary = typeof th;

const dictionaries: Record<Language, Dictionary> = {
  th,
  en,
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'th',
  setLanguage: () => {},
  t: th,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('agnos_lang') as Language;
      if (savedLang === 'th' || savedLang === 'en') {
        return savedLang;
      }
    }
    return 'th';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('agnos_lang', lang);
    }
  };

  const t = dictionaries[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <NextIntlClientProvider locale={language} messages={dictionaries[language]}>
        {children}
      </NextIntlClientProvider>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
