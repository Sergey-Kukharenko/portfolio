import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

// The framer-motion feature chunk is loaded by a dynamic import in main.tsx,
// which normally only starts downloading after the entry script has run.
// Preloading it from the HTML lets both download in parallel, so the first
// entrance animations aren't held back by a request waterfall.
function preloadMotionFeatures(): Plugin {
  return {
    name: "preload-motion-features",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler(_, ctx) {
        const chunk = Object.values(ctx.bundle ?? {}).find(
          (c) => c.type === "chunk" && c.name === "motionFeatures"
        );
        if (!chunk) return;
        return [
          {
            tag: "link",
            attrs: { rel: "modulepreload", crossorigin: true, href: `/${chunk.fileName}` },
            injectTo: "head",
          },
        ];
      },
    },
  };
}

export default defineConfig({
  plugins: [react(), preloadMotionFeatures()],
});
