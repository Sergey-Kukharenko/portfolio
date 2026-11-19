/** Smooth-scrolls to a page section by its id. */
export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
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
