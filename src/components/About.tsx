import { m } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { stats } from "../data/stats";
import { useLocale } from "../i18n";


export default function About() {
  const { ui } = useLocale();
  return (
    <section id="about" className="relative mx-auto max-w-5xl px-4 py-24 sm:px-6">
      <SectionHeading title={ui.about.title} />

      <div className="grid gap-8 md:grid-cols-5">
        <m.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="md:col-span-3"
        >
          {ui.about.paragraphs(stats.years).map((text, i) => (
            <p
              key={i}
              className={`text-base leading-relaxed sm:text-lg ${i === 0 ? "text-gray-300" : "mt-4 text-gray-400"}`}
            >
              {text}
            </p>
          ))}
        </m.div>

        {/* one quiet card of facts instead of four boxes: lighter, and it
            sits level with the text instead of towering over it */}
        <m.dl
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="divide-y divide-white/10 self-start rounded-2xl border border-white/10 bg-white/[0.03] px-5 md:col-span-2"
        >
          {ui.about.facts.map((f) => (
            <div key={f.label} className="flex items-baseline justify-between gap-4 py-3">
              <dt className="text-[11px] uppercase tracking-wider text-gray-500">{f.label}</dt>
              <dd className="text-right text-sm font-semibold text-white">{f.value}</dd>
            </div>
          ))}
        </m.dl>
      </div>
    </section>
  );
}
