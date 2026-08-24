"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  Language,
  languages,
  translations,
} from "./i18n";

type TranslationKey = keyof typeof translations.en;

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext =
  createContext<LanguageContextType | null>(null);

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguageState] =
    useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem(
      "aimgod-language"
    ) as Language | null;

    if (saved && translations[saved]) {
      setLanguageState(saved);

      const selected = languages.find(
        (item) => item.code === saved
      );

      document.documentElement.dir =
        selected?.dir || "ltr";

      document.documentElement.lang = saved;
    }
  }, []);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);

    localStorage.setItem(
      "aimgod-language",
      newLanguage
    );

    const selected = languages.find(
      (item) => item.code === newLanguage
    );

    document.documentElement.dir =
      selected?.dir || "ltr";

    document.documentElement.lang =
      newLanguage;
  };

  const t = (key: TranslationKey) => {
    return (
      translations[language][key] ||
      translations.en[key]
    );
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}