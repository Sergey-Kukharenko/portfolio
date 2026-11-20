/** Scrolls to a page section by its id — smoothly, unless the OS asks for reduced motion. */
export function scrollToSection(id: string) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

/**
 * Opens an external link from code (not an <a>): new tab with no `window.opener`
 * access for the target page; `mailto:`/`tel:` go to the mail/phone app directly
 * instead of leaving an empty tab behind.
 */
export function openExternal(url: string) {
  if (/^(mailto|tel):/.test(url)) window.location.href = url;
  else window.open(url, "_blank", "noopener,noreferrer");
}
