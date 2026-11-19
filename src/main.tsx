import { createRoot, hydrateRoot } from "react-dom/client";
import Root from "./Root";
// self-hosted variable Inter (weight axis only); unicode-range subsets mean the
// browser fetches just latin + cyrillic — no third-party font requests
import "@fontsource-variable/inter/wght.css";
import "./index.css";

const container = document.getElementById("root")!;

// production HTML is prerendered (scripts/prerender.mjs) — attach to that
// markup instead of re-creating it; the dev server serves an empty shell
if (container.firstElementChild) hydrateRoot(container, <Root />);
else createRoot(container).render(<Root />);
