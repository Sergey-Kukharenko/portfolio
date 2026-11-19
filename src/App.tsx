import { lazy, Suspense, useEffect, useState } from "react";
import ScrollProgress from "./components/ScrollProgress";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import type { Project } from "./data/projects";
import { useCanHover } from "./lib/useMediaQuery";

// heavy, below-the-fold or on-demand chunks — kept out of the initial bundle
// so the hero paints as fast as possible (prism alone is a big chunk)
const loadCodeShowcase = () => import("./components/CodeShowcase");
const loadCommandPalette = () => import("./components/CommandPalette");
const CodeShowcase = lazy(loadCodeShowcase);
const CommandPalette = lazy(loadCommandPalette);

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  // mount the palette only after the first open, then keep it mounted so its
  // exit animation still plays
  const [paletteMounted, setPaletteMounted] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  // the code showcase is a hover demo (cursor pitch, hover hints) — pointless
  // on touch screens, so it is neither rendered nor downloaded there
  const canHover = useCanHover();

  useEffect(() => {
    if (searchOpen) setPaletteMounted(true);
  }, [searchOpen]);

  // warm up the lazy chunks once the browser is idle, so scrolling to the code
  // section or pressing ⌘K is instant later
  useEffect(() => {
    const prefetch = () => {
      if (canHover) loadCodeShowcase();
      loadCommandPalette();
    };
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(prefetch, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(prefetch, 2000);
    return () => clearTimeout(t);
  }, [canHover]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <CustomCursor />
      <ScrollProgress />
      <Nav onOpenSearch={() => setSearchOpen(true)} />

      <main>
        <Hero onOpenSearch={() => setSearchOpen(true)} />
        <About />
        <Experience />
        <Skills />
        {/* placeholder keeps the #code anchor and roughly the same height,
            so nav links and scroll position don't jump while the chunk loads */}
        {canHover && (
          <Suspense fallback={<section id="code" className="min-h-[640px]" />}>
            <CodeShowcase />
          </Suspense>
        )}
        <Projects
          selected={selectedProject}
          onSelect={setSelectedProject}
          onClose={() => setSelectedProject(null)}
        />
        <Contact />
      </main>

      <Footer />

      {paletteMounted && (
        <Suspense fallback={null}>
          <CommandPalette
            open={searchOpen}
            onClose={() => setSearchOpen(false)}
            onOpenProject={setSelectedProject}
          />
        </Suspense>
      )}
    </div>
  );
}
