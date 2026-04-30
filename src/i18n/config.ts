export const supportedLocales = ["en", "pt-BR"] as const;
export type Locale = (typeof supportedLocales)[number];

export const defaultLocale: Locale = "en";
export const localeStorageKey = "rennan.locale";
