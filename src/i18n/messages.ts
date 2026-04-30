import type { Locale } from "./config";
import enMessages from "./locales/en.json";
import ptBRMessages from "./locales/pt-BR.json";

type WidenJson<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends null
        ? null
        : T extends readonly (infer Item)[]
          ? WidenJson<Item>[]
          : T extends object
            ? { [Key in keyof T]: WidenJson<T[Key]> }
            : T;

export type Messages = WidenJson<typeof enMessages>;

export const messages = {
  en: enMessages,
  "pt-BR": ptBRMessages,
} as const satisfies Record<Locale, Messages>;
