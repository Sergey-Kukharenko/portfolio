import { createRoot, hydrateRoot } from "react-dom/client";
import { inject } from "@vercel/analytics";
import Root from "./Root";
import { localeFromPath } from "./i18n";
// self-hosted variable Inter (weight axis only); unicode-range subsets mean the
// browser fetches just latin + cyrillic — no third-party font requests
import "@fontsource-variable/inter/wght.css";
import "./index.css";

const container = document.getElementById("root")!;

// production HTML is prerendered (scripts/prerender.mjs) — attach to that
// markup instead of re-creating it; the dev server serves an empty shell
const locale = localeFromPath(window.location.pathname);

if (container.firstElementChild) hydrateRoot(container, <Root locale={locale} />);
else createRoot(container).render(<Root locale={locale} />);

// cookieless page-view stats (Vercel Web Analytics): a deferred script, off the
// critical path; it only reports once Analytics is enabled for the project
inject();
