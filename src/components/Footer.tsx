import ArcMark from "./ArcMark";
import { PATHS, useLocale } from "../i18n";

export default function Footer() {
  const { locale, ui } = useLocale();
  const other = locale === "ru" ? "en" : "ru";

  // The page ends in a card, inset from the screen edges like the island up top,
  // but grounded: it scrolls with the page instead of floating over it.
  // rounded-3xl is the outermost radius on the page; no blur, WebKit pays for it
  return (
    <footer className="px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-4 sm:pb-4">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] px-5 py-6 sm:px-8">
        <div className="absolute inset-x-0 top-0 h-px [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)] bg-gradient-to-r from-framer-blue via-framer-purple via-40% to-framer-pink" />
        <div className="flex flex-col items-center gap-3 text-center text-xs text-gray-500 sm:flex-row sm:justify-between sm:text-left">
          <p className="flex items-baseline gap-2">
            <ArcMark className="text-sm" />
            <span className="text-gray-400">The art of structure.</span>
          </p>
          <p className="flex items-center gap-3">
            <span>{ui.footer.line(new Date().getFullYear())}</span>
            <a href={PATHS[other]} hrefLang={other} lang={other} className="text-gray-300 underline-offset-4 hover:text-white hover:underline">
              {ui.switchTo}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
