import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Highlight } from "prism-react-renderer";
import { codeSnippets } from "../data/codeSnippets";
import { framerCodeTheme } from "../lib/prismTheme";
import SectionHeading from "./SectionHeading";
import { SegmentedControl } from "./ui/SegmentedControl";

const tabs = codeSnippets.map((s) => ({ value: s.id, label: s.label }));

export default function CodeShowcase() {
  const [activeId, setActiveId] = useState(codeSnippets[0].id);
  const active = codeSnippets.find((s) => s.id === activeId)!;

  return (
    <section id="code" className="relative mx-auto max-w-4xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Framer Motion в деле"
        title="JS, TS, Vue, React, Nuxt, Next — один стиль мышления"
        description="Рекурсия — потому что хорошая архитектура умеет повторять себя. Наведите на блок кода."
      />

      <SegmentedControl
        options={tabs}
        value={activeId}
        onChange={setActiveId}
        layoutId="code-tab-pill"
        className="mx-auto mb-6 w-fit flex-wrap justify-center"
        itemClassName="px-3"
      />

      <div
        data-cursor-label={active.pitch}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B0B0F] shadow-glow"
      >
        <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-framer-red/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-framer-orange/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-framer-teal/70" />
          <span className="ml-3 font-mono text-xs text-gray-500">{active.filename}</span>
        </div>

        <div className="results-scroll overflow-x-auto">
          <AnimatePresence mode="wait">
            <m.div
              key={active.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
            >
              <Highlight theme={framerCodeTheme} code={active.code.trim()} language={active.language}>
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                  <pre
                    className={`${className} min-w-max p-5 text-[13px] leading-relaxed sm:text-sm`}
                    style={style}
                  >
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line })}>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
