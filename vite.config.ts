import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

// Files the first screen needs but the browser would only discover late:
// - the framer-motion feature chunk is a dynamic import in main.tsx, so it
//   would start downloading only after the entry script has run;
// - the Inter font files are referenced from CSS, so they'd wait for it.
// Preloading them from the HTML lets everything download in parallel.
function preloadCriticalAssets(): Plugin {
  return {
    name: "preload-critical-assets",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler(_, ctx) {
        const files = Object.values(ctx.bundle ?? {});
        const motion = files.find((f) => f.type === "chunk" && f.name === "motionFeatures");
        // only the subsets this (Russian + English) page actually renders
        const fonts = files.filter((f) =>
          /inter-(latin|cyrillic)-wght-normal-.*\.woff2$/.test(f.fileName)
        );
        return [
          ...(motion
            ? [{ rel: "modulepreload", href: `/${motion.fileName}` }]
            : []),
          ...fonts.map((f) => ({
            rel: "preload",
            as: "font",
            type: "font/woff2",
            href: `/${f.fileName}`,
          })),
        ].map((attrs) => ({
          tag: "link",
          attrs: { ...attrs, crossorigin: true },
          injectTo: "head" as const,
        }));
      },
    },
  };
}

export default defineConfig({
  plugins: [react(), preloadCriticalAssets()],
});
