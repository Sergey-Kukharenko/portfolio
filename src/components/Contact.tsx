import { m } from "framer-motion";
import { contacts, telegram } from "../data/contacts";
import SectionHeading from "./SectionHeading";
import { CopyIcon } from "../icons";
import { flash } from "../lib/island";
import { useLocale } from "../i18n";

export default function Contact() {
  const { t, ui } = useLocale();

  const copy = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      flash({ title: ui.copied(label), detail: value });
    } catch {
      flash({ title: ui.copyFailed, detail: value });
    }
  };

  return (
    <section id="contact" className="relative mx-auto max-w-4xl px-4 py-24 sm:px-6">
      <SectionHeading
        title={ui.contact.title}
        description={ui.contact.description}
      />

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {contacts.map((c, i) => {
          const Icon = c.icon;
          // Telegram is where replies come fastest: same size as the rest,
          // but it alone carries the brand gradient
          const primary = c.id === telegram.id;
          return (
            <m.li
              key={c.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="relative"
            >
              <a
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className={`flex h-full items-center gap-3 rounded-xl p-2.5 transition ${c.copyable ? "pr-12" : "pr-4"} ${
                  primary
                    ? "bg-gradient-to-r from-framer-blue via-framer-purple to-framer-pink shadow-glow hover:brightness-110"
                    : "border border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
                }`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white ${
                    primary ? "bg-white/15" : `bg-gradient-to-br ${c.gradient}`
                  }`}
                >
                  <Icon width={15} height={15} />
                </span>
                <span className="min-w-0 text-left leading-tight">
                  <span
                    className={`block text-[11px] uppercase tracking-wider ${primary ? "text-white/75" : "text-gray-500"}`}
                  >
                    {c.label}
                  </span>
                  <span className="block truncate text-sm text-white">{t(c.value)}</span>
                </span>
              </a>
              {/* a sibling, not inside the link: a button nested in <a> is invalid */}
              {c.copyable && (
                <button
                  type="button"
                  onClick={() => copy(c.label, t(c.value))}
                  aria-label={ui.contact.copy(c.label, t(c.value))}
                  className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <CopyIcon width={14} height={14} />
                </button>
              )}
            </m.li>
          );
        })}
      </ul>
    </section>
  );
}
