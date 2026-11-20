import { createContext, useContext, useMemo, type ReactNode } from "react";
import { ui } from "./ui";
import { plural } from "../lib/plural";

export type Locale = "ru" | "en";

/** A value in every language — data keeps translations side by side. */
export type L<T = string> = Record<Locale, T>;

export const LOCALES: Locale[] = ["ru", "en"];

/** Where each language lives: "/" and "/en/" are both prerendered pages. */
export const PATHS: L = { ru: "/", en: "/en/" };

/** BCP 47 tags for Intl (dates, plurals). */
export const INTL: L = { ru: "ru-RU", en: "en-US" };

export const localeFromPath = (path: string): Locale => (path.startsWith("/en") ? "en" : "ru");

const isLocalized = <T,>(v: T | L<T>): v is L<T> =>
  typeof v === "object" && v !== null && !Array.isArray(v) && "ru" in v && "en" in v;

/** Picks the translation; language-neutral values (names, URLs) pass straight through. */
export const translate = <T,>(value: T | L<T>, locale: Locale): T => (isLocalized(value) ? value[locale] : value);

const LocaleContext = createContext<Locale>("ru");

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

/**
 * Plural forms per language: ru needs three (1 год / 2 года / 5 лет),
 * en two (1 year / 2 years). `count(n, forms)` → the right word for n.
 */
export type Forms = { ru: [string, string, string]; en: [string, string] };

export function pluralize(locale: Locale, n: number, forms: Forms) {
  return locale === "en" ? (n === 1 ? forms.en[0] : forms.en[1]) : plural(n, forms.ru);
}

/** The current language with helpers: `t(field)` picks a translation, `ui` holds interface strings. */
export function useLocale() {
  const locale = useContext(LocaleContext);
  return useMemo(
    () => ({
      locale,
      intl: INTL[locale],
      ui: ui[locale],
      t: <T,>(value: T | L<T>) => translate(value, locale),
      plural: (n: number, forms: Forms) => pluralize(locale, n, forms),
    }),
    [locale]
  );
}
