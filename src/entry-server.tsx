import { renderToString } from "react-dom/server";
import Root from "./Root";
import type { Locale } from "./i18n";

/** Build-time only: the app's initial markup for one language, injected into its index.html. */
export function render(locale: Locale) {
  return renderToString(<Root locale={locale} />);
}

export { head } from "./i18n/head";
