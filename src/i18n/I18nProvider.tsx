import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  defaultLocale,
  localeStorageKey,
  supportedLocales,
  type Locale,
} from "./config";
import { I18nContext, type I18nContextValue } from "./context";
import { messages } from "./messages";

function normalizeLocale(value: string | null | undefined): Locale | null {
  if (!value) return null;
  if (value === "pt-BR" || value.toLowerCase().startsWith("pt")) return "pt-BR";
  if (value === "en" || value.toLowerCase().startsWith("en")) return "en";
  return null;
}

function readStoredLocale(): Locale | null {
  try {
    return normalizeLocale(window.localStorage.getItem(localeStorageKey));
  } catch {
    return null;
  }
}

function getInitialLocale(): Locale {
  const storedLocale = readStoredLocale();
  if (storedLocale) return storedLocale;

  const browserLocale = window.navigator.languages
    .map(normalizeLocale)
    .find((locale): locale is Locale => Boolean(locale));

  return browserLocale ?? defaultLocale;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
    try {
      window.localStorage.setItem(localeStorageKey, locale);
    } catch {
      // Ignore storage failures so privacy settings do not break rendering.
    }
  }, [locale]);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      locales: supportedLocales,
      messages: messages[locale],
      setLocale: setLocaleState,
    }),
    [locale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
