import { m } from "framer-motion";
import { contacts } from "../data/contacts";
import SectionHeading from "./SectionHeading";

export default function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-4xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Контакты"
        title="Готов обсудить проект"
        description="Открыт к предложениям по удалённой работе. Отвечаю быстрее всего в Telegram."
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {contacts.map((c, i) => {
          const Icon = c.icon;
          return (
            <m.a
              key={c.id}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              whileHover={{ y: -5 }}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-7 text-center transition-colors hover:border-white/20"
            >
              <m.span
                whileHover={{ scale: 1.1, rotate: -6 }}
                className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${c.gradient} text-white shadow-glow`}
              >
                <Icon width={18} height={18} />
              </m.span>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500">{c.label}</p>
                <p className="mt-1 text-sm font-medium text-white">{c.value}</p>
              </div>
            </m.a>
          );
        })}
      </div>
    </section>
  );
}
