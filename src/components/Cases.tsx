import { m } from "framer-motion";
import { cases, type Case } from "../data/cases";
import { ExternalLinkIcon } from "../icons";
import SectionHeading from "./SectionHeading";
import { TagList } from "./ui/Tag";
import { useLocale } from "../i18n";

export default function Cases() {
  const { ui } = useLocale();
  return (
    <section id="cases" className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      <SectionHeading
        title={ui.cases.title}
        description={ui.cases.description}
      />

      <div className="flex flex-col gap-5">
        {cases.map((c, i) => (
          <CaseCard key={c.id} item={c} index={i} />
        ))}
      </div>
    </section>
  );
}

function CaseCard({ item, index }: { item: Case; index: number }) {
  const { t, ui } = useLocale();
  return (
    <m.article
      id={`case-${item.id}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="relative scroll-mt-24 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-7"
    >
      {/* brand-colored edge: the one accent per card */}
      <span aria-hidden className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${item.gradient}`} />

      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-500">
            {item.company} · {item.role} · {t(item.period)}
          </p>
          <h3 className="mt-1 text-xl font-semibold text-white sm:text-2xl">{t(item.title)}</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {item.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-sm text-framer-teal hover:underline"
            >
              {l.label}
              <ExternalLinkIcon width={12} height={12} />
            </a>
          ))}
        </div>
      </header>

      <p className="mt-4 text-sm leading-relaxed text-gray-300 sm:text-base">{t(item.task)}</p>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <Column title={ui.cases.solution} items={t(item.solution)} />
        <Column title={ui.cases.result} items={t(item.result)} accent />
      </div>

      <div className="mt-5">
        <TagList items={item.stack} muted />
      </div>
    </m.article>
  );
}

function Column({ title, items, accent = false }: { title: string; items: string[]; accent?: boolean }) {
  return (
    <div>
      <h4 className={`mb-2 text-[11px] uppercase tracking-wider ${accent ? "text-framer-teal" : "text-gray-500"}`}>
        {title}
      </h4>
      <ul className="flex flex-col gap-1.5">
        {items.map((text) => (
          <li key={text} className="flex gap-2 text-sm leading-relaxed text-gray-400">
            <span aria-hidden className={accent ? "text-framer-teal" : "text-gray-600"}>
              {accent ? "✓" : "—"}
            </span>
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}
