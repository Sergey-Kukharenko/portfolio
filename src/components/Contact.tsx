import { motion } from "framer-motion";
import { BriefcaseIcon, GithubIcon, LinkedinIcon, MailIcon, SendIcon } from "../icons";
import SectionHeading from "./SectionHeading";

const contacts = [
  {
    id: "telegram",
    label: "Telegram",
    value: "@SergeyKukharenko",
    href: "https://t.me/SergeyKukharenko",
    icon: SendIcon,
    gradient: "from-framer-blue to-framer-teal",
  },
  {
    id: "mail",
    label: "Email",
    value: "iamksergey@mail.ru",
    href: "mailto:iamksergey@mail.ru",
    icon: MailIcon,
    gradient: "from-framer-purple to-framer-pink",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: "+7 (967) 112-45-92",
    href: "https://wa.me/79671124592",
    icon: SendIcon,
    gradient: "from-framer-pink to-framer-red",
  },
  {
    id: "hh",
    label: "hh.ru",
    value: "Резюме",
    href: "https://hh.ru/resume/a8f8cf78ff053af1f60039ed1f76674b57686e",
    icon: BriefcaseIcon,
    gradient: "from-framer-red to-framer-orange",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "Профиль",
    href: "https://www.linkedin.com/in/%D1%81%D0%B5%D1%80%D0%B3%D0%B5%D0%B9-%D0%BA%D1%83%D1%85%D0%B0%D1%80%D0%B5%D0%BD%D0%BA%D0%BE-51154b350/",
    icon: LinkedinIcon,
    gradient: "from-framer-orange to-framer-teal",
  },
  {
    id: "github",
    label: "GitHub",
    value: "Sergey-Kukharenko",
    href: "https://github.com/Sergey-Kukharenko",
    icon: GithubIcon,
    gradient: "from-framer-teal to-framer-blue",
  },
];

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
            <motion.a
              key={c.id}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              whileHover={{ y: -5 }}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-7 text-center backdrop-blur-md transition-colors hover:border-white/20"
            >
              <motion.span
                whileHover={{ scale: 1.1, rotate: -6 }}
                className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${c.gradient} text-white shadow-glow`}
              >
                <Icon width={18} height={18} />
              </motion.span>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500">{c.label}</p>
                <p className="mt-1 text-sm font-medium text-white">{c.value}</p>
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
