import ArcMark from "./ArcMark";
import { PATHS, useLocale } from "../i18n";

export default function Footer() {
  const { locale, ui } = useLocale();
  const other = locale === "ru" ? "en" : "ru";

  return (
    <footer className="relative border-t border-white/10 px-4 py-8 sm:px-6">
      <div className="mx-auto h-1 max-w-6xl rounded-full bg-gradient-to-r from-framer-blue via-framer-purple via-40% to-framer-pink" />
      <div className="mx-auto mt-6 flex max-w-6xl flex-col items-center gap-3 text-center text-xs text-gray-500 sm:flex-row sm:justify-between sm:text-left">
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
    </footer>
  );
}
