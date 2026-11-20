import { LOCALES, PATHS, type L, type Locale } from ".";

const SITE = "https://sergeykukharenko.vercel.app";
const IMAGE = `${SITE}/og-arc.jpg`;
const OG_LOCALE: L = { ru: "ru_RU", en: "en_US" };

const META: L<{ title: string; description: string; share: string }> = {
  ru: {
    title: "Сергей Кухаренко — Senior Frontend Developer · Arc.",
    description:
      "Сергей Кухаренко — Senior / Lead Frontend Developer. The art of structure: Vue/Nuxt, React, TypeScript. Кейсы, опыт и проекты.",
    share: "Arc. — Сергей Кухаренко, Senior Frontend Developer",
  },
  en: {
    title: "Sergey Kukharenko — Senior Frontend Developer · Arc.",
    description:
      "Sergey Kukharenko — Senior / Lead Frontend Developer. The art of structure: Vue/Nuxt, React, TypeScript. Case studies, experience and projects.",
    share: "Arc. — Sergey Kukharenko, Senior Frontend Developer",
  },
};

/** Per-language <head> tags, baked into each prerendered page (scripts/prerender.mjs). */
export function head(locale: Locale) {
  const { title, description, share } = META[locale];
  const url = SITE + PATHS[locale];
  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${url}" />`,
    // tell search engines the two pages are translations of each other
    ...LOCALES.map((l) => `<link rel="alternate" hreflang="${l}" href="${SITE}${PATHS[l]}" />`),
    `<link rel="alternate" hreflang="x-default" href="${SITE}/" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${share}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:locale" content="${OG_LOCALE[locale]}" />`,
    ...LOCALES.filter((l) => l !== locale).map((l) => `<meta property="og:locale:alternate" content="${OG_LOCALE[l]}" />`),
    `<meta property="og:image" content="${IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${share}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${IMAGE}" />`,
  ].join("\n    ");
}
