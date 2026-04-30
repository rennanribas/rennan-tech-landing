import { createContext } from "react";
import { supportedLocales, type Locale } from "./config";
import type { Messages } from "./messages";

export type I18nContextValue = {
  locale: Locale;
  locales: typeof supportedLocales;
  messages: Messages;
  setLocale: (locale: Locale) => void;
};

export const I18nContext = createContext<I18nContextValue | null>(null);
