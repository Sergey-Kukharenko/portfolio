// Bakes the app's initial markup into one static page per language — "/" (ru)
// and "/en/" — so the first paint already shows the page instead of an empty
// #root waiting for the JS bundle, and each language has its own <html lang>,
// title, description, share tags and hreflang links. The client then hydrates
// it (see src/main.tsx).
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";

const ssrDir = new URL("../dist-ssr/", import.meta.url);
const dist = new URL("../dist/", import.meta.url);

const { render, head } = await import(new URL("entry-server.js", ssrDir));
const template = await readFile(new URL("index.html", dist), "utf8");

const root = '<div id="root"></div>';
const headRegion = /<!--app-head-->[\s\S]*?<!--\/app-head-->/;
for (const marker of [root, '<html lang="ru">']) {
  if (!template.includes(marker)) throw new Error(`prerender: ${marker} not found in dist/index.html`);
}
if (!headRegion.test(template)) throw new Error("prerender: <!--app-head--> region not found in dist/index.html");

for (const [locale, file] of [["ru", "index.html"], ["en", "en/index.html"]]) {
  const html = template
    .replace('<html lang="ru">', `<html lang="${locale}">`)
    .replace(headRegion, head(locale))
    .replace(root, `<div id="root">${render(locale)}</div>`);
  const out = new URL(file, dist);
  await mkdir(new URL(".", out), { recursive: true });
  await writeFile(out, html);
  console.log(`prerender: dist/${file} ✓`);
}

await rm(ssrDir, { recursive: true, force: true });
