import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Highlight } from "prism-react-renderer";
import { codeSnippets } from "../data/codeSnippets";
import { framerCodeTheme } from "../lib/prismTheme";
import SectionHeading from "./SectionHeading";

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

      <div className="mx-auto mb-6 flex w-fit flex-wrap justify-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1">
        {codeSnippets.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActiveId(s.id)}
            className="relative rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm"
          >
            {activeId === s.id && (
              <motion.span
                layoutId="code-tab-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-framer-blue via-framer-purple to-framer-pink"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className={`relative z-10 ${activeId === s.id ? "text-white" : "text-gray-400"}`}>
              {s.label}
            </span>
          </button>
        ))}
      </div>

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
            <motion.div
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
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
