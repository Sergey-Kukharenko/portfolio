// Bakes the app's initial markup into dist/index.html, so the first paint
// already shows the page (nav, hero, sections) instead of an empty #root
// waiting for the JS bundle. The client then hydrates it (see src/main.tsx).
import { readFile, rm, writeFile } from "node:fs/promises";

const ssrDir = new URL("../dist-ssr/", import.meta.url);
const htmlFile = new URL("../dist/index.html", import.meta.url);

const { render } = await import(new URL("entry-server.js", ssrDir));
const html = await readFile(htmlFile, "utf8");

const placeholder = '<div id="root"></div>';
if (!html.includes(placeholder)) throw new Error(`prerender: ${placeholder} not found in dist/index.html`);

await writeFile(htmlFile, html.replace(placeholder, `<div id="root">${render()}</div>`));
await rm(ssrDir, { recursive: true, force: true });
console.log("prerender: dist/index.html ✓");
