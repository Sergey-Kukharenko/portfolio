import type { ComponentType, SVGProps } from "react";
import type { L } from "../i18n";
import { BriefcaseIcon, GithubIcon, LinkedinIcon, MailIcon, SendIcon, WhatsappIcon } from "../icons";

export type Contact = {
  id: string;
  label: string;
  /** shown text; a plain string when it reads the same in every language */
  value: string | L;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  gradient: string;
  /** when set, the contact is also offered as a command palette action */
  action?: L;
  /** the value is worth copying as text (an address or a number) */
  copyable?: boolean;
};

export const contacts: Contact[] = [
  {
    id: "telegram",
    label: "Telegram",
    value: "@SergeyKukharenko",
    href: "https://t.me/SergeyKukharenko",
    icon: SendIcon,
    gradient: "from-framer-blue to-framer-teal",
    action: { ru: "Написать в Telegram", en: "Message on Telegram" },
  },
  {
    id: "mail",
    label: "Email",
    value: "iamksergey@mail.ru",
    href: "mailto:iamksergey@mail.ru",
    copyable: true,
    icon: MailIcon,
    gradient: "from-framer-purple to-framer-pink",
    action: { ru: "Написать на почту", en: "Send an email" },
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: "+7 (967) 112-45-92",
    href: "https://wa.me/79671124592",
    copyable: true,
    icon: WhatsappIcon,
    gradient: "from-framer-pink to-framer-red",
  },
  {
    id: "hh",
    label: "hh.ru",
    value: { ru: "Резюме", en: "Resume" },
    href: "https://hh.ru/resume/a8f8cf78ff053af1f60039ed1f76674b57686e",
    icon: BriefcaseIcon,
    gradient: "from-framer-red to-framer-orange",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: { ru: "Профиль", en: "Profile" },
    href: "https://www.linkedin.com/in/%D1%81%D0%B5%D1%80%D0%B3%D0%B5%D0%B9-%D0%BA%D1%83%D1%85%D0%B0%D1%80%D0%B5%D0%BD%D0%BA%D0%BE-51154b350/",
    icon: LinkedinIcon,
    gradient: "from-framer-orange to-framer-teal",
    action: { ru: "Открыть LinkedIn", en: "Open LinkedIn" },
  },
  {
    id: "github",
    label: "GitHub",
    value: "Sergey-Kukharenko",
    href: "https://github.com/Sergey-Kukharenko",
    icon: GithubIcon,
    gradient: "from-framer-teal to-framer-blue",
    action: { ru: "Открыть GitHub", en: "Open GitHub" },
  },
];

export const telegram = contacts.find((c) => c.id === "telegram")!;
